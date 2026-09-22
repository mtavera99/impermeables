require("dotenv").config();
const express = require("express");
const { generateReply } = require("./agent");
const { sendText, sendImage, sendVideo, sendCatalog, catalogoActivo } = require("./whatsapp");
const { MEDIA } = require("./media");
const store = require("./store");
const seguimiento = require("./seguimiento");
const panel = require("./panel");
const audio = require("./audio");
const resumen = require("./resumen");
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const app = express();
app.use(express.json());
// Para los formularios del panel (responder a mano, pausar el bot)
app.use(express.urlencoded({ extended: true }));

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "bikerpro_verify_123";
const OWNER = process.env.OWNER_WHATSAPP;
const WABA_ID = process.env.WHATSAPP_WABA_ID || "2213159576112051";
const WA_TOKEN = process.env.WHATSAPP_TOKEN;

// Suscribe la cuenta de WhatsApp (WABA) a esta app para que Meta entregue
// los mensajes entrantes al webhook. Es idempotente: repetirlo no causa daño.
async function subscribeWaba() {
  if (!WA_TOKEN || !WABA_ID) {
    console.log("subscribeWaba: falta WHATSAPP_TOKEN o WHATSAPP_WABA_ID");
    return;
  }
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${WABA_ID}/subscribed_apps`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WA_TOKEN}` }
    });
    const body = await res.text();
    console.log(`subscribeWaba (${res.status}): ${body}`);
  } catch (e) {
    console.error("subscribeWaba error:", e.message);
  }
}

// ============================================================================
// GET /panel?token=...  — las conversaciones y los pedidos, en una página
//
// El dueño preguntó dónde ve los mensajes que van a entrar. No había dónde:
// /eventos es JSON técnico y se borra en cada despliegue. Esto muestra las
// conversaciones completas, los pedidos cerrados y quién está esperando a un
// humano, con un enlace directo a WhatsApp para responder.
// ============================================================================
app.get("/panel", (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) {
    return res
      .status(403)
      .send("<h3>Falta el token.</h3><p>Usá /panel?token=TU_WHATSAPP_VERIFY_TOKEN</p>");
  }
  try {
    // Resultado de una respuesta manual, si viene de vuelta del redirect
    let aviso = "";
    if (req.query.r === "ok") {
      aviso = `<div class="res ok">✅ Mensaje enviado como BikerPro. El bot quedó silenciado en ese chat: cuando termines, devolvéselo con el botón.</div>`;
    } else if (req.query.r) {
      aviso = `<div class="res mal">🔴 No se pudo enviar: ${esc(req.query.r)}</div>`;
    }
    res.set("Content-Type", "text/html; charset=utf-8").send(panel.render(aviso));
  } catch (e) {
    res.status(500).send("Error armando el panel: " + esc(e.message));
  }
});

// ============================================================================
// GET /cierre?token=...[&enviar=1][&dia=YYYY-MM-DD][&to=57...]
//
// El resumen de ventas del día. Con `enviar=1` lo manda por WhatsApp.
//
// 🔴 LÍMITE DE META, YA COMPROBADO: un mensaje que INICIA el negocio solo se
// entrega si hay una ventana de 24h abierta (o con plantilla aprobada). Hoy se
// probó: Meta aceptó un mensaje al dueño (ok:true con wamid) y NUNCA se entregó.
//   → Si el dueño le escribió algo al bot ese día, la ventana está abierta y el
//     cierre llega perfecto.
//   → Si no, Meta lo acepta y lo descarta. Por eso la respuesta SIEMPRE incluye
//     el texto completo: aunque el envío falle, el cierre se lee acá y el
//     GitHub Action lo deja en su registro.
// ============================================================================
app.get("/cierre", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);

  const dia = (req.query.dia || "").match(/^\d{4}-\d{2}-\d{2}$/)
    ? req.query.dia
    : resumen.hoyBogota();

  let datos, texto;
  try {
    datos = resumen.delDia(dia);
    texto = resumen.textoCierre(dia);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

  const out = { dia, resumen: { ...datos, detalle: undefined }, texto };

  if (req.query.enviar === "1") {
    const to = (req.query.to || OWNER || "").toString().replace(/\D/g, "");
    if (!to) {
      out.envio = { ok: false, motivo: "no hay número destino (falta OWNER_WHATSAPP o ?to=)" };
    } else {
      const r = await sendText(to, texto);
      out.envio = {
        ok: r.ok,
        para: `+${to}`,
        http: r.status,
        detalle: r.ok
          ? `entregado a Meta (id ${r.messageId})`
          : JSON.stringify(r.body?.error || r.body).slice(0, 220),
        nota: r.ok
          ? "Meta lo aceptó. Si no te llega, es porque la ventana de 24h está cerrada: escribile algo al bot y volvé a pedir el cierre."
          : "No se pudo enviar. El texto completo está igual en este mismo resultado.",
      };
      anotarEvento({ tipo: "cierre-enviado", para: to, ok: r.ok, pedidos: datos.pedidos });
    }
  }

  res.json(out);
});

// Pedidos en CSV, para tener una copia propia fuera de Render
app.get("/pedidos.csv", (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);
  try {
    res
      .set("Content-Type", "text/csv; charset=utf-8")
      .set("Content-Disposition", `attachment; filename="pedidos-bikerpro-${resumen.hoyBogota()}.csv"`)
      .send("\uFEFF" + resumen.pedidosCSV()); // BOM para que Excel lea los acentos
  } catch (e) {
    res.status(500).send("Error: " + esc(e.message));
  }
});

// ============================================================================
// POST /responder  — contestarle a un cliente DESDE EL NÚMERO DEL BOT
//
// POR QUÉ EXISTE: el panel tenía un enlace `wa.me` para "responder por WhatsApp",
// y estaba MAL. El número del bot vive en la Cloud API, no en la app del
// celular del dueño, así que ese enlace abría SU WhatsApp personal y le habría
// escrito al cliente desde otro número — el cliente vería un desconocido en vez
// de BikerPro.
//
// Para hablar como el negocio, el mensaje tiene que salir por la Cloud API.
// Este endpoint hace eso, y además PAUSA el bot en ese chat para que no le
// conteste encima al humano.
// ============================================================================
app.post("/responder", async (req, res) => {
  if (req.body?.token !== VERIFY_TOKEN && req.query.token !== VERIFY_TOKEN) {
    return res.sendStatus(403);
  }
  const to = String(req.body?.to || "").replace(/\D/g, "");
  const texto = String(req.body?.texto || "").trim();
  if (!to || !texto) return res.status(400).send("Falta el número o el texto.");

  const envio = await sendText(to, texto);

  if (envio.ok) {
    // Queda en el historial como mensaje del negocio, así el bot lo ve como
    // contexto y no repite lo que ya dijo el humano.
    store.pushMsg(to, "assistant", texto);
    // Y el bot se calla en ese chat: dos voces contestando confunden al cliente.
    store.setPaused(to, true);
    anotarEvento({ tipo: "respuesta-humana", para: to, texto: texto.slice(0, 80) });
    console.log(`👤 Respuesta manual a ${to}: "${texto.slice(0, 80)}"`);
  } else {
    anotarEvento({
      tipo: "respuesta-humana-fallida",
      para: to,
      error: JSON.stringify(envio.body?.error || envio.body).slice(0, 180),
    });
  }

  // Volver al panel con el resultado a la vista
  const msg = envio.ok
    ? "ok"
    : encodeURIComponent(
        (envio.body?.error?.code === 131047 || envio.body?.error?.code === 470)
          ? "Pasaron más de 24h desde el último mensaje del cliente. Meta no permite texto libre; solo plantilla aprobada."
          : envio.body?.error?.message || "No se pudo enviar."
      );
  res.redirect(`/panel?token=${encodeURIComponent(VERIFY_TOKEN)}&r=${msg}#c${to}`);
});

// POST /pausar — prender o apagar el bot en UN chat
// Sirve para retomar: cuando el humano termina, devuelve el chat al bot.
app.post("/pausar", (req, res) => {
  if (req.body?.token !== VERIFY_TOKEN) return res.sendStatus(403);
  const tel = String(req.body?.tel || "").replace(/\D/g, "");
  const valor = String(req.body?.valor) === "1";
  if (!tel) return res.status(400).send("Falta el número.");
  store.setPaused(tel, valor);
  anotarEvento({ tipo: valor ? "bot-pausado" : "bot-reactivado", para: tel });
  res.redirect(`/panel?token=${encodeURIComponent(VERIFY_TOKEN)}#c${tel}`);
});

// Salud
app.get("/", (_req, res) => res.send("BikerPro bot activo 🏍️"));
app.get("/health", (_req, res) => res.json({ ok: true }));

// ============================================================================
// PROBAR EL BOT SIN WHATSAPP  —  GET /probar?token=...&msg=...
//
// POR QUÉ EXISTE: el webhook manda la respuesta por WhatsApp y NO la escribe en
// el log. Sin esto, la única forma de saber si la IA cotiza bien es mandarle un
// mensaje real desde un celular, y eso no se puede repetir 20 veces ni automatizar.
//
// PARA QUÉ SIRVE:
//   1. Verificar en cada despliegue que el guion cotiza con el tarifario vigente
//      (los casos que ya costaron plata: Bogotá Suba, Mosquera, Tadó, 2 unidades).
//   2. Comparar proveedores de IA con los MISMOS casos antes de cambiar de motor
//      (Gemini vs DeepSeek): cuál respeta las reglas de precio.
//
// 🔒 PROTEGIDO con WHATSAPP_VERIFY_TOKEN. Sin el token correcto responde 403.
//    Si quedara abierto, cualquiera podría quemar la cuota de IA a costa nuestra.
//
// ⚠️ Usa un teléfono ficticio ("prueba-*"), así no se mezcla con conversaciones
//    de clientes reales ni dispara seguimientos. `&reset=1` arranca de cero.
// ============================================================================
app.get("/probar", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);

  const msg = (req.query.msg || "").toString().trim();
  if (!msg) return res.status(400).json({ error: "falta ?msg=" });

  const phone = `prueba-${(req.query.id || "default").toString().slice(0, 20)}`;

  try {
    if (req.query.reset === "1") store.borrarConversacion(phone);
    const t0 = Date.now();
    const { reply, order, handoff, media } = await generateReply(phone, msg);
    res.json({
      pregunta: msg,
      respuesta: reply,
      pedido: order || null,
      pasarAHumano: handoff,
      medios: media || [],
      ms: Date.now() - t0,
      modelo: process.env.AI_PROVIDER === "openai-compat"
        ? (process.env.AI_MODEL || "deepseek-chat")
        : (process.env.GEMINI_MODEL || "gemini-3.1-flash-lite"),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Suscripción manual de la WABA (visita esta URL una vez para forzarla)
// ============================================================================
// GET /setup-waba?token=...  — suscribe la WABA y DIAGNOSTICA la conexión
//
// Antes solo escribía el resultado en el log de Render, así que para saber si
// el token servía había que entrar a mirar los logs a mano. Ahora devuelve el
// diagnóstico completo en la respuesta:
//   · si el token es válido y tiene los permisos
//   · QUÉ número quedó conectado (para no confundir el de prueba con el real)
//   · el estado de calidad del número
//
// 🔒 Protegido con WHATSAPP_VERIFY_TOKEN porque hace una ESCRITURA (suscribe la
//    app a la WABA). No debe quedar abierto.
// 🔑 NUNCA devuelve el token, solo si funciona o no.
// ============================================================================
app.get("/setup-waba", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);

  const out = {
    variables: {
      WHATSAPP_TOKEN: WA_TOKEN ? `configurado (${WA_TOKEN.length} caracteres)` : "🔴 FALTA",
      WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || "🔴 FALTA",
      WHATSAPP_WABA_ID: WABA_ID || "🔴 FALTA",
    },
  };

  if (!WA_TOKEN) {
    out.diagnostico = "Falta WHATSAPP_TOKEN en Render. Sin eso el bot no puede responder.";
    return res.json(out);
  }

  // 1. ¿Qué número está conectado? Confirma que el Phone Number ID es el correcto.
  const pnid = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (pnid) {
    try {
      const r = await fetch(
        `https://graph.facebook.com/v21.0/${pnid}?fields=display_phone_number,verified_name,quality_rating,platform_type,code_verification_status,status,name_status`,
        { headers: { Authorization: `Bearer ${WA_TOKEN}` } }
      );
      out.numero = { http: r.status, ...(await r.json()) };
    } catch (e) {
      out.numero = { error: e.message };
    }
  }

  // 2. Suscribir la app a la WABA para que Meta entregue los mensajes al webhook.
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${WABA_ID}/subscribed_apps`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WA_TOKEN}` },
    });
    out.suscripcion = { http: r.status, ...(await r.json().catch(() => ({}))) };
  } catch (e) {
    out.suscripcion = { error: e.message };
  }

  const numeroOk = out.numero && out.numero.http === 200;
  const subOk = out.suscripcion && out.suscripcion.success === true;

  // 🔴 CORRECCIÓN 21-SEP: esto antes decía 🟢 con solo ver http 200 y success.
  // Pasó con el +57 322 7545695: token bien, cuenta bien, webhook suscrito...
  // y el número NO tenía WhatsApp. Agregar un número a la WABA y REGISTRARLO en
  // la Cloud API son dos pasos distintos, y el diagnóstico no miraba el segundo.
  // `platform_type` lo delata: CLOUD_API = registrado · NOT_APPLICABLE = no.
  const registrado = numeroOk && out.numero.platform_type === "CLOUD_API";

  if (!numeroOk || !subOk) {
    out.diagnostico =
      "🔴 Falló la conexión. Error 190 = token vencido o mal copiado. " +
      "Error 100 = el Phone Number ID o el WABA ID no corresponden a este token.";
  } else if (!registrado) {
    out.diagnostico =
      `🟡 CASI. El token y la cuenta están bien, y el número ${out.numero.display_phone_number} ` +
      `existe en la WABA — pero platform_type es "${out.numero.platform_type}", no "CLOUD_API". ` +
      "Eso significa que el número NO está registrado en la Cloud API: no tiene WhatsApp activo, " +
      "no recibe ni envía. Falta registrarlo con un PIN de 6 dígitos: llamá a " +
      "/registrar-numero?token=...&pin=XXXXXX";
    if (out.numero.code_verification_status && out.numero.code_verification_status !== "VERIFIED") {
      out.diagnostico +=
        ` ⚠️ Y además code_verification_status es "${out.numero.code_verification_status}": ` +
        "primero hay que verificar la propiedad del número con el código que manda Meta por SMS o llamada.";
    }
  } else {
    out.diagnostico =
      `🟢 LISTO. Número conectado y registrado en Cloud API: ` +
      `${out.numero.display_phone_number} (${out.numero.verified_name}). ` +
      `Calidad: ${out.numero.quality_rating}. Los mensajes ya llegan al webhook.`;
  }

  res.json(out);
});

// ============================================================================
// GET /catalogos?token=...
//
// POR QUÉ: en el export del agente viejo, 3.280 conversaciones (52%) mostraban
// productos de un catálogo. Ese catálogo vive en el PORTAFOLIO COMERCIAL, no en
// el número, así que sobrevivió al cambio de número y se puede reutilizar.
//
// Lo que hace falta para que el bot mande productos:
//   1. el `catalog_id` del catálogo
//   2. el `retailer_id` (SKU) de cada producto — ⚠️ NO es el product_id numérico
//      que aparece en el export; la API pide el retailer_id que definiste vos
//   3. que el catálogo esté CONECTADO a la WABA
//
// Esto averigua las tres cosas y avisa si al token le falta permiso.
// ============================================================================
app.get("/catalogos", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);
  if (!WA_TOKEN) return res.status(400).json({ error: "Falta WHATSAPP_TOKEN." });

  const g = async (path) => {
    try {
      const r = await fetch(`https://graph.facebook.com/v21.0/${path}`, {
        headers: { Authorization: `Bearer ${WA_TOKEN}` },
      });
      return { http: r.status, ...(await r.json().catch(() => ({}))) };
    } catch (e) {
      return { error: e.message };
    }
  };

  const out = {};

  // ¿Hay un catálogo ya conectado a la WABA? Es lo que permite mandar productos.
  out.catalogoConectadoALaWaba = await g(`${WABA_ID}/product_catalogs`);

  // ---- BUSCAR CATÁLOGOS EN *TODAS* LAS WABAs DEL NEGOCIO ----
  // Por qué: el catálogo bueno (con las fotos y descripciones que ya funcionaban)
  // estaba en el NÚMERO ANTERIOR. Los catálogos de la app de WhatsApp Business
  // quedan atados a su WABA, así que hay que recorrer las otras WABAs para
  // encontrarlo. Si aparece, se pueden leer sus productos con image_url y
  // description y migrarlos al catálogo nuevo sin rehacerlos a mano.
  if (req.query.buscar_viejo === "1") {
    const bizId2 = process.env.META_BUSINESS_ID || "1271452296042859";
    const wabas = await g(`${bizId2}/owned_whatsapp_business_accounts?fields=id,name&limit=25`);
    out.todasLasWabas = wabas;
    out.catalogosPorWaba = [];
    for (const w of wabas?.data || []) {
      const cats = await g(`${w.id}/product_catalogs?fields=id,name,product_count`);
      const entrada = { waba: w.name, wabaId: w.id, catalogos: cats?.data || [], error: cats?.error?.message };
      // Si esa WABA tiene un catálogo distinto al nuevo, leer sus productos
      for (const c of entrada.catalogos) {
        if (c.id === "1444910067541151") continue; // el nuevo, ya lo conocemos
        c.productos = await g(
          `${c.id}/products?fields=retailer_id,name,description,price,image_url,availability&limit=30`
        );
      }
      out.catalogosPorWaba.push(entrada);
    }
  }

  // Catálogos del portafolio comercial (donde deberían estar los viejos)
  const bizId = process.env.META_BUSINESS_ID || "1271452296042859";
  out.catalogosDelNegocio = await g(`${bizId}/owned_product_catalogs?fields=id,name,product_count`);

  // Si encontramos un catálogo, traemos sus productos CON el retailer_id
  const cat =
    out.catalogoConectadoALaWaba?.data?.[0]?.id ||
    out.catalogosDelNegocio?.data?.[0]?.id ||
    req.query.catalog_id;
  if (cat) {
    out.catalogoUsado = cat;
    out.productos = await g(
      `${cat}/products?fields=retailer_id,name,price,availability,image_url&limit=25`
    );
  }

  const permisoFalta =
    out.catalogosDelNegocio?.error?.code === 200 ||
    out.catalogosDelNegocio?.error?.type === "OAuthException";
  out.diagnostico = permisoFalta
    ? "🟡 El token no tiene permiso para leer catálogos. Hay que agregarle 'catalog_management' (y darle el activo del catálogo al usuario de sistema 'BikerPro Bot')."
    : out.productos?.data?.length
    ? `🟢 Catálogo ${cat} con ${out.productos.data.length} productos legibles. Los 'retailer_id' de abajo son los que usa la API para mandar productos.`
    : "🟡 No se encontró catálogo conectado. Hay que vincularlo a la WABA en el Administrador de WhatsApp.";

  res.json(out);
});

// ============================================================================
// GET /producto?token=...&ids=123,456
//
// Lee productos del catálogo POR ID, directo del grafo de Meta.
//
// POR QUÉ: el catálogo viejo (con las buenas tomas y descripciones) no aparece
// en `product_catalogs` de ninguna WABA — se creó en la app del celular y no
// quedó expuesto como catálogo de Commerce Manager. Pero los enlaces que
// comparte la app, `wa.me/p/{PRODUCT_ID}/{TELEFONO}`, SÍ traen el ID del
// producto. Y un producto es un objeto direccionable del grafo.
//
// Así se recuperan foto, descripción y precio sin que el dueño tenga que bajar
// nada del celular ni reescribir las fichas.
// ============================================================================
app.get("/producto", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);
  if (!WA_TOKEN) return res.status(400).json({ error: "Falta WHATSAPP_TOKEN." });

  const ids = (req.query.ids || "")
    .toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!ids.length) {
    return res.status(400).json({
      error: "Falta ?ids=",
      ejemplo: "/producto?token=...&ids=27892272213763991,27607874028892677",
      nota: "Los IDs salen de los enlaces wa.me/p/{ID}/{telefono} que comparte la app de WhatsApp Business.",
    });
  }

  const campos = "id,retailer_id,name,description,price,currency,image_url,additional_image_urls,availability,url,category,brand";
  const resultados = [];
  for (const id of ids.slice(0, 20)) {
    try {
      const r = await fetch(`https://graph.facebook.com/v21.0/${id}?fields=${campos}`, {
        headers: { Authorization: `Bearer ${WA_TOKEN}` },
      });
      resultados.push({ idPedido: id, http: r.status, ...(await r.json().catch(() => ({}))) });
    } catch (e) {
      resultados.push({ idPedido: id, error: e.message });
    }
  }

  const leidos = resultados.filter((r) => r.http === 200).length;
  res.json({
    pedidos: ids.length,
    leidos,
    diagnostico: leidos
      ? `🟢 ${leidos} de ${ids.length} productos leídos. Con image_url y description se reconstruye el catálogo sin trabajo manual.`
      : "🔴 Ninguno se pudo leer. Si el error es 100/33, el token no tiene acceso a ese catálogo: hay que asignarle el activo del catálogo viejo al usuario de sistema.",
    productos: resultados,
  });
});

// ============================================================================
// GET /enviar-prueba?token=...&to=573138615813[&msg=...]
//
// POR QUÉ EXISTE: hasta acá lo único que teníamos era Meta diciendo que el
// número estaba "CONNECTED". Eso es Meta hablando de sí misma, no evidencia de
// que un mensaje viaje. Esto intenta un envío REAL y devuelve la respuesta
// cruda de Meta, sin interpretarla.
//
// 🔑 CÓMO LEER EL RESULTADO:
//   · ok:true + messageId  → el camino de SALIDA funciona de punta a punta.
//   · error 131030         → el destinatario no está en la lista de permitidos
//                            (pasa con números de prueba, no con producción).
//   · error 131047 / 470   → fuera de la ventana de 24h: solo se puede mandar
//                            plantilla. ⚠️ ESTO ES BUENA NOTICIA: significa que
//                            el token y el número SÍ sirven, y que lo único que
//                            falta es que el cliente escriba primero.
//   · error 190            → token vencido o mal copiado.
//   · error 133010         → el número no está registrado en Cloud API.
//
// 🔒 Protegido con WHATSAPP_VERIFY_TOKEN: manda mensajes reales.
// ============================================================================
app.get("/enviar-prueba", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);

  const to = (req.query.to || OWNER || "").toString().replace(/\D/g, "");
  if (!to) {
    return res.status(400).json({
      error: "Falta ?to= con el número destino (con código de país, sin + ni espacios).",
      ejemplo: "/enviar-prueba?token=...&to=573138615813",
    });
  }

  const msg =
    (req.query.msg || "").toString().trim() ||
    "Prueba del bot de BikerPro 🏍️ Si recibiste esto, el envío por Cloud API funciona.";

  const r = await sendText(to, msg);

  let lectura;
  if (r.ok) {
    lectura = `🟢 ENVIADO de verdad. Meta aceptó el mensaje (id ${r.messageId}). El camino de SALIDA funciona. Revisá el WhatsApp de +${to}.`;
  } else {
    const code = r.body?.error?.code;
    const sub = r.body?.error?.error_subcode;
    if (code === 131047 || code === 470) {
      lectura =
        "🟡 Fuera de la ventana de 24h: Meta solo acepta plantillas hasta que el cliente escriba primero. " +
        "PERO esto CONFIRMA que el token y el número funcionan. Lo único que falta es un mensaje entrante.";
    } else if (code === 131030) {
      lectura = "🟡 El destinatario no está en la lista de permitidos. Pasa con números de prueba, no con producción.";
    } else if (code === 190) {
      lectura = "🔴 Token vencido o mal copiado. Hay que regenerarlo.";
    } else if (code === 133010) {
      lectura = "🔴 El número no está registrado en Cloud API. Usá /registrar-numero con el PIN.";
    } else {
      lectura = `🔴 Meta rechazó el envío (código ${code}${sub ? `, subcódigo ${sub}` : ""}). El detalle está en 'respuesta'.`;
    }
  }

  res.json({ destino: `+${to}`, http: r.status, ok: r.ok, respuesta: r.body, lectura });
});

// ============================================================================
// GET /registrar-numero?token=...&pin=XXXXXX
//
// Registra el número en la Cloud API. ES UN PASO APARTE de agregarlo a la WABA,
// y es el que hace que el número tenga WhatsApp de verdad y pueda enviar/recibir.
//
// El PIN son 6 dígitos y es la verificación en dos pasos del número. Hay que
// guardarlo: se pide de nuevo si el número se re-registra en otra plataforma.
//
// 🔒 Protegido con WHATSAPP_VERIFY_TOKEN: registra un número, es una escritura.
// ============================================================================
app.get("/registrar-numero", async (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);

  const pin = (req.query.pin || "").toString().trim();
  if (!/^\d{6}$/.test(pin)) {
    return res.status(400).json({
      error: "El PIN debe ser exactamente 6 dígitos. Ejemplo: /registrar-numero?token=...&pin=123456",
      consejo: "Elegí uno que puedas recordar y guardalo en el gestor de contraseñas: Meta lo pide de nuevo si hay que re-registrar el número.",
    });
  }

  const pnid = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!WA_TOKEN || !pnid) {
    return res.status(400).json({ error: "Faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID en Render." });
  }

  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${pnid}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${WA_TOKEN}` },
      body: JSON.stringify({ messaging_product: "whatsapp", pin }),
    });
    const body = await r.json().catch(() => ({}));
    const ok = r.status === 200 && body.success === true;
    res.json({
      http: r.status,
      respuesta: body,
      diagnostico: ok
        ? "🟢 Número registrado en Cloud API. Esperá ~1 minuto y probá /setup-waba: platform_type debe pasar a CLOUD_API. Después escribile por WhatsApp."
        : "🔴 No se registró. Errores típicos: 133005 = el PIN no coincide con uno anterior · " +
          "133010 = el número no está verificado todavía (falta el código por SMS o llamada) · " +
          "133006 = hay que verificar la propiedad del número primero · " +
          "100 = el token no tiene permiso sobre este número.",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Verificación del webhook (Meta)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado ✅");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Recepción de mensajes (Meta)
app.post("/webhook", (req, res) => {
  res.sendStatus(200); // responder rápido a Meta y procesar aparte
  handleWebhook(req.body).catch((e) => console.error("handleWebhook:", e.message));
});

// ============================================================================
// BITÁCORA DE EVENTOS DEL WEBHOOK (últimos 60, en memoria)
//
// POR QUÉ: el 21-sep Meta aceptó un mensaje (200 + wamid) y NUNCA lo entregó.
// El motivo del fallo viene en eventos `statuses`, que este webhook estaba
// IGNORANDO: solo miraba `value.messages`. O sea que Meta nos explicaba el
// problema y nosotros tirábamos la explicación a la basura.
//
// También sirve para la pregunta opuesta: si un mensaje entrante NO aparece
// acá, Meta no está llegando al webhook y el problema es de configuración, no
// del bot. Sin esto, "el bot no contesta" es indistinguible de "Meta no avisa".
// ============================================================================
const EVENTOS = [];
function anotarEvento(e) {
  EVENTOS.push({ cuando: new Date().toISOString(), ...e });
  if (EVENTOS.length > 60) EVENTOS.shift();
}

app.get("/eventos", (req, res) => {
  if (req.query.token !== VERIFY_TOKEN) return res.sendStatus(403);
  res.json({
    total: EVENTOS.length,
    nota: EVENTOS.length === 0
      ? "🔴 VACÍO: Meta no ha llamado al webhook desde el último reinicio. Si ya escribiste al número, el problema es la suscripción del campo 'messages' en la cuenta correcta (la de 'biker'), no el bot."
      : "Del más viejo al más nuevo. 'status: failed' trae el motivo en 'errores'.",
    eventos: EVENTOS,
  });
});

async function handleWebhook(body) {
  const entries = body?.entry || [];
  for (const entry of entries) {
    for (const change of entry.changes || []) {
      const value = change.value || {};

      // 🔴 ESTADOS DE ENTREGA — acá viene el motivo cuando un mensaje no llega.
      for (const st of value.statuses || []) {
        const errores = (st.errors || []).map((e) => ({
          code: e.code,
          title: e.title,
          details: e.error_data?.details || e.details,
        }));
        anotarEvento({
          tipo: "estado",
          para: st.recipient_id,
          status: st.status, // sent · delivered · read · failed
          errores,
        });
        if (st.status === "failed") {
          console.error(`🔴 ENVÍO FALLIDO a ${st.recipient_id}: ${JSON.stringify(errores)}`);
        } else {
          console.log(`· estado ${st.status} para ${st.recipient_id}`);
        }
      }

      const messages = value.messages || [];
      for (const m of messages) {
        // 🔴 21-SEP: llegaron dos mensajes SIN `from`. Sin remitente el bot no
        // tiene a dónde responder, y quedaban como "el bot no contestó" sin
        // explicación. Guardamos el payload crudo para poder diagnosticarlo.
        // Sospecha principal: son los envíos de prueba del panel de Meta
        // ("Revisa los webhooks de prueba"), que usan un payload de ejemplo.
        if (!m.from) {
          anotarEvento({
            tipo: "entrante-sin-remitente",
            clase: m.type,
            texto: m.text?.body?.slice(0, 80),
            crudo: JSON.stringify({ value }).slice(0, 700),
          });
          console.error("🔴 Mensaje entrante SIN 'from'. No hay a dónde responder. Payload:", JSON.stringify(value).slice(0, 500));
          continue;
        }
        anotarEvento({ tipo: "entrante", de: m.from, clase: m.type, texto: m.text?.body?.slice(0, 80) });
      }
      for (const msg of messages) {
        const from = msg.from;
        let text = msg.text?.body?.trim();

        // 🎙️ NOTAS DE VOZ — medido en el export: 439 conversaciones (7%) las usan
        // y 814 las mandó un cliente. Y preguntan justo lo que cierra: talla, 2
        // unidades, material. Antes se ignoraban en silencio y el cliente quedaba
        // esperando para siempre. Se transcriben y entran al MISMO flujo que un
        // mensaje escrito, así respetan todas las reglas de precio del guion.
        if ((msg.type === "audio" || msg.type === "voice") && from) {
          const mediaId = msg.audio?.id || msg.voice?.id;
          const t0 = Date.now();
          const r = mediaId
            ? await audio.transcribirNotaDeVoz(mediaId)
            : { ok: false, error: "el mensaje de audio no trae id de medios" };

          if (r.ok) {
            text = r.texto;
            anotarEvento({ tipo: "audio-transcrito", de: from, texto: text.slice(0, 120), ms: Date.now() - t0 });
            console.log(`🎙️ Audio de ${from} transcrito en ${Date.now() - t0}ms: "${text.slice(0, 90)}"`);
          } else {
            anotarEvento({ tipo: "audio-fallido", de: from, error: String(r.error).slice(0, 160) });
            console.error(`🔴 No se pudo transcribir el audio de ${from}: ${r.error}`);
            // Nunca dejar al cliente sin respuesta: se le pide por escrito.
            await sendText(
              from,
              "Te escuché a medias, se me cortó el audio 🙈 ¿Me lo escribís? Así te respondo bien y no te hago repetir."
            );
            continue;
          }
        }

        // Imágenes y otros tipos: el bot no los procesa todavía, pero ya no se
        // ignoran en silencio. Antes el cliente mandaba una foto y nadie contestaba.
        if (!text && from && msg.type !== "text") {
          anotarEvento({ tipo: "no-soportado", de: from, clase: msg.type });
          console.log(`(${from}) mandó un ${msg.type}, que el bot todavía no procesa.`);
          await sendText(
            from,
            "Recibí tu mensaje 🙌 Todavía no puedo abrir ese tipo de archivo. ¿Me contás por escrito qué necesitás?"
          );
          continue;
        }

        if (!text) continue;

        // Si pide que no le escriban mas, se respeta para siempre y se saca
        // del seguimiento. Esto va ANTES de la pausa: aunque un humano tenga el
        // chat, la peticion se registra igual.
        if (/\b(no me escrib|no escrib|dejen? de escrib|no molest|ya no me interesa|elimin[ae]me|no quiero)\b/i.test(text)) {
          store.marcarNoMolestar(from);
          console.log(`(${from}) pidio no ser contactado. Marcado como noMolestar.`);
        }

        if (store.isPaused(from)) {
          console.log(`(${from}) en modo humano; el bot no responde.`);
          continue;
        }

        console.log(`Cliente ${from}: ${text}`);
        const { reply, order, handoff, media } = await generateReply(from, text);
        if (reply) {
          // 🔴 Registrar el RESULTADO del envío, no solo el intento. Si Meta
          // rechaza el mensaje, esto es lo único que lo delata en los logs.
          const envio = await sendText(from, reply);
          if (envio && envio.ok) {
            console.log(`→ Respondido a ${from} (id ${envio.messageId})`);
          } else {
            // Un rechazo en el POST /messages NUNCA genera evento `statuses`,
            // porque Meta no creó el mensaje. Si no lo anotamos acá, el fallo
            // solo existe en el log de Render y desde fuera es invisible.
            anotarEvento({
              tipo: "envio-rechazado",
              para: from,
              http: envio?.status,
              error: envio?.body?.error?.message || JSON.stringify(envio?.body).slice(0, 200),
              code: envio?.body?.error?.code,
            });
            console.error(
              `🔴 MENSAJE NO ENTREGADO a ${from}. Meta respondió ${envio?.status}: ` +
                JSON.stringify(envio?.body)
            );
          }
        }

        // Enviar fotos/videos si el bot los solicitó
        for (const key of media || []) {
          // 📚 CATÁLOGO: si está configurado, es mejor que una foto suelta
          // porque trae descripción y precio. Si NO está configurado, se cae
          // al cuadro de colores para no dejar al cliente sin nada.
          if (key === "catalogo") {
            if (catalogoActivo()) {
              const envio = await sendCatalog(
                from,
                "Acá podés ver todo nuestro catálogo con fotos y detalles 🏍️",
                process.env.CATALOG_THUMBNAIL || undefined,
                "Pago contraentrega en toda Colombia"
              );
              if (!envio.ok) {
                anotarEvento({ tipo: "envio-rechazado", para: from, http: envio.status, error: "catálogo: " + JSON.stringify(envio.body?.error || envio.body).slice(0, 200), code: envio.body?.error?.code });
                console.error("🔴 Catálogo no enviado:", JSON.stringify(envio.body));
                // Respaldo: mandar la foto de colores para no dejarlo sin nada
                const alt = MEDIA.colores;
                if (alt?.url) await sendImage(from, alt.url, alt.caption);
              }
            } else {
              console.log("Catálogo pedido pero CATALOG_ID no está configurado; mando la foto de colores.");
              const alt = MEDIA.colores;
              if (alt?.url) await sendImage(from, alt.url, alt.caption);
            }
            continue;
          }

          const item = MEDIA[key];
          if (!item || !item.url) {
            console.log(`Media '${key}' sin URL configurada (agrega MEDIA_${key.toUpperCase()} en Render)`);
            continue;
          }
          if (item.type === "video") await sendVideo(from, item.url, item.caption);
          else await sendImage(from, item.url, item.caption);
        }

        // Cerro pedido: no se le manda ningun seguimiento mas.
        if (order) store.marcarComprado(from);

        if (order && OWNER) {
          await sendText(
            OWNER,
            `🟢 NUEVO PEDIDO BikerPro\n` +
              `Nombre: ${order.nombre}\nCel: ${order.celular}\n` +
              `Ciudad: ${order.ciudad}\nDir: ${order.direccion}\n` +
              `Color: ${order.color} · Talla: ${order.talla}\n` +
              `Total al recibir: $${Number(order.total).toLocaleString("es-CO")}\n` +
              `Chat: ${order.telefono_chat}`
          );
        }
        if (handoff && OWNER) {
          await sendText(OWNER, `🙋 El cliente ${from} pidió hablar con un asesor. El bot quedó en pausa para ese chat.`);
        }
      }
    }
  }
}

// Diagnostico del seguimiento de 72h: cuantos estan esperando cada paso.
// No manda nada, solo cuenta. Visitar /seguimiento para ver el estado.
app.get("/seguimiento", (_req, res) => {
  res.json({
    activo: process.env.SEGUIMIENTO_ACTIVO === "1",
    plantilla_2: process.env.SEGUIMIENTO_PLANTILLA_2 || "(sin configurar)",
    plantilla_3: process.env.SEGUIMIENTO_PLANTILLA_3 || "(sin configurar)",
    estado: seguimiento.diagnostico()
  });
});

// Dispara una pasada de seguimiento AHORA, sin esperar los 30 min.
// Sirve para probar. Respeta todas las reglas (no manda a quien no toca).
app.get("/seguimiento/correr", async (_req, res) => {
  try {
    res.json(await seguimiento.correrSeguimientos());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BikerPro bot escuchando en puerto ${PORT} 🏍️`);
  subscribeWaba();      // auto-suscribe la WABA al arrancar
  seguimiento.arrancar(); // reloj del seguimiento de 72h (solo si esta activo)
});
