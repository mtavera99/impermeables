require("dotenv").config();
const express = require("express");
const { generateReply } = require("./agent");
const {
  sendText, sendImage, sendVideo, sendCatalog, catalogoActivo,
  sendPdf, sendPdfPorPlantilla, sendTemplate, esBsuid,
} = require("./whatsapp");
const { MEDIA } = require("./media");
const store = require("./store");
const seguimiento = require("./seguimiento");
const panel = require("./panel");
const panelGuias = require("./panel-guias");
const guias = require("./guias");
const panelNovedades = require("./panel-novedades");
const novedades = require("./novedades");
const audio = require("./audio");
const resumen = require("./resumen");
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 🔴 Normalizar un destinatario SIN romper a los clientes con username.
// Los formularios del panel hacían `.replace(/\D/g,"")` para limpiar el
// teléfono. Con un BSUID ("CO.1098944123092301") eso deja "1098944123092301":
// un número inventado. El dueño le daría enviar y el mensaje se iría al vacío,
// o peor, a un tercero. Un BSUID se deja tal cual.
const idDestino = (v) => {
  const s = String(v == null ? "" : v).trim();
  return esBsuid(s) ? s : s.replace(/\D/g, "");
};

const app = express();
app.use(express.json());
// Para los formularios del panel (responder a mano, pausar el bot)
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// 🔐 DOS SECRETOS DISTINTOS, Y POR QUÉ NO PUEDEN SER EL MISMO
//
//   WHATSAPP_VERIFY_TOKEN -> lo usa SOLO Meta, para verificar el webhook.
//   PANEL_TOKEN           -> la CONTRASEÑA del panel y de todo lo que escribe.
//
// Antes era UN SOLO valor para las dos cosas, y eso tuvo una consecuencia real:
// terminó escrito en 5 archivos del repo, que es PÚBLICO. Con ese valor,
// cualquiera en internet podía abrir /panel (nombres, direcciones y teléfonos
// de TODOS los clientes), bajarse /pedidos.csv, y sobre todo usar /responder
// para escribirle a un cliente HACIÉNDOSE PASAR por BikerPro.
//
// Separarlos importa por algo concreto: la contraseña del panel hay que poder
// cambiarla en cualquier momento, mientras que el token del webhook está
// alineado con la configuración de Meta y si se desalinea DEJA DE ENTRAR el
// 100% de los mensajes. Con un valor compartido, rotar lo barato obligaba a
// tocar lo caro.
//
// ⚠️ Y cambiar el valor no alcanzaba por sí solo: el viejo ya quedó en el
// historial de Git, que es público para siempre. Por eso el secreto nuevo
// vive SOLO como variable de entorno en Render, y nunca en el repo.
// ============================================================================
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "bikerpro_verify_123";

// Si PANEL_TOKEN todavía no está puesto, se cae a VERIFY_TOKEN a propósito: es
// preferible avisar a gritos que dejar al dueño AFUERA de su propio panel en
// media jornada, porque es la pantalla con la que despacha.
const PANEL_TOKEN = process.env.PANEL_TOKEN || VERIFY_TOKEN;

// Valores que ya se publicaron en el repo: dejaron de ser secretos el día que
// se subieron. Si el panel está usando uno de estos, está abierto a internet.
const SECRETOS_QUEMADOS = new Set(["bikerpro_verify_123", "bikerpro_verify_2026"]);

if (SECRETOS_QUEMADOS.has(PANEL_TOKEN)) {
  console.warn(
    "\n🔴🔴 EL PANEL ESTÁ ABIERTO A INTERNET 🔴🔴\n" +
      "   La contraseña del panel es un valor que YA ESTÁ PUBLICADO en el repo.\n" +
      "   Cualquiera puede abrir /panel y ver los datos de todos los clientes,\n" +
      "   y usar /responder para escribirles como si fuera BikerPro.\n" +
      "   ARREGLO (2 minutos): en Render → Environment → agregar PANEL_TOKEN\n" +
      "   con un valor nuevo y largo. No hay que tocar nada de Meta.\n"
  );
} else if (!process.env.PANEL_TOKEN) {
  console.warn(
    "⚠️  PANEL_TOKEN no está definido: el panel está usando WHATSAPP_VERIFY_TOKEN.\n" +
      "   Conviene separarlos para poder cambiar la clave del panel sin tocar Meta."
  );
}

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
  if (req.query.token !== PANEL_TOKEN) {
    return res
      .status(403)
      .send("<h3>Falta el token.</h3><p>Usá /panel?token=TU_PANEL_TOKEN</p>");
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
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

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

// ============================================================================
// GET /limpiar-duplicados?token=...[&aplicar=1]
//
// Los pedidos duplicados que YA quedaron guardados antes del candado. Sin
// `aplicar=1` solo muestra qué haría (para poder revisarlo antes de borrar).
// Se queda con el PRIMER registro de cada cliente, que es el original.
// ============================================================================
app.get("/limpiar-duplicados", (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const todos = store.todosLosPedidos().slice().reverse(); // del más viejo al más nuevo
  const vistos = new Map();
  const conservar = [];
  const descartar = [];

  for (const o of todos) {
    const tel = String(o.celular || o.telefono_chat || "").replace(/\D/g, "");
    const clave = `${tel}|${o.total}|${o.talla || ""}`;
    if (vistos.has(clave)) {
      descartar.push(o);
    } else {
      vistos.set(clave, true);
      conservar.push(o);
    }
  }

  const resumen = {
    registros: todos.length,
    clientesReales: conservar.length,
    duplicados: descartar.length,
    recaudoReal: conservar.reduce((s, o) => s + Number(o.total || 0), 0),
    recaudoConDuplicados: todos.reduce((s, o) => s + Number(o.total || 0), 0),
    aDespachar: conservar.map((o) => ({
      nombre: o.nombre,
      celular: o.celular || o.telefono_chat,
      ciudad: o.ciudad,
      talla: o.talla,
      color: o.color,
      total: o.total,
      pago: o.pago,
    })),
    duplicadosDetalle: descartar.map((o) => ({ nombre: o.nombre, celular: o.celular, fecha: o.fecha, total: o.total })),
  };

  if (req.query.aplicar === "1") {
    const ok = store.reemplazarPedidos(conservar);
    resumen.aplicado = ok;
    resumen.nota = ok
      ? `🟢 Listo: quedaron ${conservar.length} pedidos y se eliminaron ${descartar.length} duplicados.`
      : "🔴 No se pudo escribir el archivo. Nada se borró.";
  } else {
    resumen.nota =
      "Esto es solo una PREVISUALIZACIÓN, no se borró nada. " +
      "Para aplicarlo agregá &aplicar=1 a la URL.";
  }

  res.json(resumen);
});

// ============================================================================
// ENVIAR LAS GUÍAS DE LA TRANSPORTADORA  —  GET /guias · POST /guias/revisar
//                                          POST /guias/enviar
//
// El dueño sube el PDF con todas las etiquetas y cada cliente recibe LA SUYA.
//
// 🔴 DOS PASOS, Y NO ES BUROCRACIA: la etiqueta lleva dirección y teléfono
// impresos. Mandarle a un cliente la guía de otro le filtra datos personales a
// un desconocido y no se puede deshacer. Primero se muestra el pareo, después
// se envía solo lo aprobado.
// ============================================================================

// El pareo se guarda en memoria entre "revisar" y "enviar" para no obligar a
// subir el PDF dos veces. Es a propósito efímero: son 30 minutos y un reinicio
// de Render solo obliga a subirlo de nuevo, que es el lado seguro del error.
const PLANES_GUIAS = new Map(); // id -> { filas, creado }
const PLAN_TTL_MS = 30 * 60 * 1000;

function limpiarPlanesViejos() {
  const ahora = Date.now();
  for (const [id, p] of PLANES_GUIAS) {
    if (ahora - p.creado > PLAN_TTL_MS) PLANES_GUIAS.delete(id);
  }
  for (const [id, p] of PLANES_NOVEDADES) {
    if (ahora - p.creado > PLAN_TTL_MS) PLANES_NOVEDADES.delete(id);
  }
}

// Mismo mecanismo que las guías: el plan vive entre "revisar" y "enviar" para
// no obligar a pegar el texto dos veces, y se muere en 30 minutos.
const PLANES_NOVEDADES = new Map(); // id -> { filas, creado }

// El nombre de la plantilla aprobada para novedades. Mientras no exista, los
// clientes con la ventana cerrada quedan bloqueados en vez de intentar y fallar.
const PLANTILLA_NOVEDAD = process.env.PLANTILLA_NOVEDAD || "";

// 🔴 EL IDIOMA DE LA PLANTILLA NO ES "es", ES "es_CO".
// La primera plantilla se subió en "Spanish (COL)", que en la API es es_CO. Si
// se manda "es", Meta rechaza el envío AUNQUE la plantilla esté aprobada, y el
// error (132001) no dice que el problema sea el idioma. `sendTemplate` tiene
// "es" por defecto, así que acá se pasa explícito y queda configurable por si
// alguna plantilla se sube en otro idioma.
const PLANTILLA_IDIOMA = process.env.PLANTILLA_IDIOMA || "es_CO";

// La plantilla con la que viaja el PDF de la guía cuando la ventana del cliente
// ya se cerró. Es la que el dueño subió el 22-sep, sin variables: el número de
// guía y la transportadora ya van impresos dentro del PDF.
const PLANTILLA_GUIA = process.env.PLANTILLA_GUIA || "guia_de_envio";

// ============================================================================
// 📮 NOVEDADES DE ENTREGA
//
// POR QUÉ EXISTE: el dueño veía las novedades en 99 Envíos y le escribía a cada
// cliente A MANO. Es el trabajo manual que más plata sostiene: el archivo madre
// deja dicho que el rechazo bajo (5,0%) NO es suerte, es esa gestión diaria.
// La devolución está en 19% y cuesta $2.464.218/mes; bajar 3 puntos son
// $389.962/mes.
//
// Se pega el texto de la plataforma en vez de subir un archivo porque todavía
// no sabemos si 99 Envíos exporta CSV. El mismo parser lee las dos cosas.
//
// 🔒 REVISAR ANTES DE ENVIAR, igual que las guías: un mensaje a un cliente real
// no se puede deshacer.
// ============================================================================
app.get("/novedades", (req, res) => {
  if (req.query.token !== PANEL_TOKEN) {
    return res.status(403).send("<h3>Falta el token.</h3><p>Usá /novedades?token=TU_PANEL_TOKEN</p>");
  }
  try {
    res
      .set("Content-Type", "text/html; charset=utf-8")
      .send(panelNovedades.render({ hayPlantilla: Boolean(PLANTILLA_NOVEDAD) }));
  } catch (e) {
    res.status(500).send("Error armando la pantalla: " + esc(e.message));
  }
});

app.post("/novedades/revisar", (req, res) => {
  if (req.body?.token !== PANEL_TOKEN && req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const texto = String(req.body?.texto || "");
  if (!texto.trim()) return res.status(400).json({ ok: false, error: "No llegó nada para revisar." });

  try {
    limpiarPlanesViejos();
    // `datos` trae lo que el dueño completó para las novedades de oficina
    // (dónde está y hasta cuándo). Va indexado por número de guía.
    const plan = novedades.revisar(texto, { datos: req.body?.datos || {} });
    const id = Math.random().toString(36).slice(2, 10);
    PLANES_NOVEDADES.set(id, { filas: plan.filas, creado: Date.now(), texto });

    anotarEvento({
      tipo: "novedades-revisadas",
      cuantas: plan.filas.length,
      listas: plan.listas,
      bloqueadas: plan.bloqueadas,
    });

    res.json({
      ok: true,
      id,
      listas: plan.listas,
      bloqueadas: plan.bloqueadas,
      // Se manda solo lo que la pantalla necesita mostrar, no el pedido entero.
      filas: plan.filas.map((f) => ({
        guia: f.guia,
        motivo: f.motivo,
        tipo: f.tipo,
        tipoNombre: f.tipoNombre,
        nombre: f.nombre,
        destino: f.destino,
        ventanaAbierta: Boolean(f.ventanaAbierta),
        texto: f.texto || "",
        enviar: Boolean(f.enviar),
        motivoNoEnvio: f.motivoNoEnvio || "",
        porPlantilla: Boolean(f.porPlantilla),
        plantilla: f.plantilla || "",
        // Cuando viene, la pantalla muestra los campos para completarlos.
        pidoDatos: f.pidoDatos || null,
      })),
    });
  } catch (e) {
    console.error("🔴 /novedades/revisar:", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/novedades/enviar", async (req, res) => {
  if (req.body?.token !== PANEL_TOKEN && req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const plan = PLANES_NOVEDADES.get(String(req.body?.id || ""));
  if (!plan) {
    return res.status(400).json({
      ok: false,
      error: "El plan venció o el bot se reinició. Pegá las novedades otra vez y volvé a revisar.",
    });
  }

  const indices = Array.isArray(req.body?.indices) ? req.body.indices : [];
  const resultados = [];

  for (const i of indices) {
    const f = plan.filas[i];
    // No se manda nada que la revisión haya marcado como no enviable, aunque
    // llegue en la lista: la pantalla puede estar vieja.
    if (!f || !f.enviar || !f.destino || !f.texto) {
      resultados.push({ guia: f ? f.guia : "?", ok: false, error: "quedó marcada como no enviable" });
      continue;
    }

    // ⚠️ CON LA VENTANA CERRADA NO SE PUEDE MANDAR TEXTO LIBRE.
    // Meta lo rechaza (131047), o peor: lo acepta y nunca lo entrega — ya pasó
    // el 21-sep con un mensaje al dueño. Ahí va la plantilla, cuyo único
    // trabajo es que el cliente responda: en cuanto responde se abre la ventana
    // de 24h y el bot le habla normal, con el mensaje específico de su novedad.
    // Cada tipo de novedad tiene SU plantilla, para que el cliente reciba lo
    // que necesita saber y no un "tu pedido tuvo una novedad, responde".
    // Los parámetros (la oficina y el plazo) los completó el dueño: no se
    // inventan.
    const componentes = (f.parametros || []).length
      ? [{ type: "body", parameters: f.parametros.map((t) => ({ type: "text", text: String(t) })) }]
      : undefined;

    const envio = f.porPlantilla
      ? await sendTemplate(f.destino, f.plantilla, PLANTILLA_IDIOMA, componentes)
      : await sendText(f.destino, f.texto);

    if (envio && envio.ok) {
      // Queda en el historial del chat para que el bot no repita la información
      // cuando el cliente responda. Si fue por plantilla se anota lo que de
      // verdad se le mandó, no el mensaje largo que todavía no vio.
      store.pushMsg(f.destino, "assistant", f.texto);
      anotarEvento({
        tipo: "novedad-avisada",
        para: f.destino,
        guia: f.guia,
        novedad: f.tipo,
        porPlantilla: Boolean(f.porPlantilla),
      });
      console.log(`📮 Novedad ${f.tipo} avisada a ${f.nombre || f.destino} (guía ${f.guia})`);
      resultados.push({ guia: f.guia, nombre: f.nombre, ok: true });
    } else {
      const motivo = motivoDeEnvio(envio);
      anotarEvento({ tipo: "novedad-fallida", para: f.destino, guia: f.guia, error: motivo.slice(0, 180) });
      console.error(`🔴 Novedad de la guía ${f.guia} NO se avisó a ${f.destino}: ${motivo}`);
      resultados.push({ guia: f.guia, nombre: f.nombre, ok: false, error: motivo });
    }
  }

  // El plan se consume: un segundo clic no puede reenviar lo mismo.
  PLANES_NOVEDADES.delete(String(req.body.id));

  const enviados = resultados.filter((r) => r.ok).length;
  res.json({
    ok: true,
    intentados: resultados.length,
    enviados,
    fallaron: resultados.length - enviados,
    resultados,
  });
});

/** Traduce el error de Meta a algo que el dueño pueda accionar. */
function motivoDeEnvio(envio) {
  const code = envio.body?.error?.code;
  if (code === 131047 || code === 470) {
    return "pasaron más de 24h desde su último mensaje: Meta no permite mandarle nada que no sea una plantilla aprobada";
  }
  if (envio.etapa === "subida") {
    return "no se pudo subir el PDF a WhatsApp: " + (envio.body?.error?.message || "revisá el WHATSAPP_TOKEN");
  }
  return envio.body?.error?.message || "no se pudo enviar";
}

app.get("/guias", (req, res) => {
  if (req.query.token !== PANEL_TOKEN) {
    return res.status(403).send("<h3>Falta el token.</h3><p>Usá /guias?token=TU_PANEL_TOKEN</p>");
  }
  try {
    res.set("Content-Type", "text/html; charset=utf-8").send(panelGuias.render());
  } catch (e) {
    res.status(500).send("Error armando la pantalla: " + esc(e.message));
  }
});

// El PDF llega como cuerpo crudo (no multipart): así no hace falta multer ni
// busboy. Una dependencia menos que pueda romperse en el despliegue.
app.post("/guias/revisar", express.raw({ type: "application/pdf", limit: "40mb" }), async (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const buf = req.body;
  if (!Buffer.isBuffer(buf) || !buf.length) {
    return res.status(400).json({ ok: false, error: "No llegó ningún archivo. Elegí el PDF y volvé a intentar." });
  }
  if (buf.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return res.status(400).json({
      ok: false,
      error: "Ese archivo no es un PDF. Si la transportadora te lo dio como foto o ZIP, subí el PDF original.",
    });
  }

  const pedidos = store.todosLosPedidos();
  if (!pedidos.length) {
    return res.status(400).json({
      ok: false,
      error: "No hay pedidos guardados contra los que comparar, así que no se puede saber de quién es cada guía.",
    });
  }

  let filas;
  try {
    filas = await guias.procesarPDF(buf, pedidos, {
      telefonoRemitente: OWNER,
      yaEnviada: (g) => store.guiaYaEnviada(g),
    });
  } catch (e) {
    console.error("🔴 Error procesando el PDF de guías:", e);
    return res.status(500).json({ ok: false, error: "No se pudo leer el PDF: " + e.message });
  }

  limpiarPlanesViejos();
  const id = require("crypto").randomUUID();
  PLANES_GUIAS.set(id, { filas, creado: Date.now() });

  anotarEvento({
    tipo: "guias-revisadas",
    hojas: filas.length,
    listas: filas.filter((f) => f.enviar).length,
  });

  // ⚠️ Se devuelve TODO menos las hojas: los PDF se quedan en el servidor. No
  // hay razón para que el navegador reciba las etiquetas de todos los clientes.
  res.json({
    ok: true,
    id,
    filas: filas.map((f) => ({
      pagina: f.pagina,
      guia: f.guia,
      transportadora: f.transportadora?.nombre || null,
      etiqueta: f.etiqueta,
      pedido: f.pedido
        ? { nombre: f.pedido.nombre, ciudad: f.pedido.ciudad, total: "$" + Number(f.pedido.total || 0).toLocaleString("es-CO") }
        : null,
      destino: f.pedido ? guias.destinoDe(f.pedido) : null,
      certeza: f.certeza,
      senales: f.senales,
      motivo: f.motivo,
      enviar: f.enviar,
    })),
  });
});

app.post("/guias/enviar", async (req, res) => {
  if (req.query.token !== PANEL_TOKEN && req.body?.token !== PANEL_TOKEN) return res.sendStatus(403);

  const plan = PLANES_GUIAS.get(String(req.body?.id || ""));
  if (!plan) {
    return res.status(400).json({
      ok: false,
      error: "El pareo ya se usó o expiró (dura 30 minutos). Subí el PDF otra vez.",
    });
  }
  const pedidas = new Set((req.body?.paginas || []).map(Number));
  if (!pedidas.size) return res.status(400).json({ ok: false, error: "No marcaste ninguna guía." });

  const resultados = [];
  for (const fila of plan.filas) {
    if (!pedidas.has(fila.pagina)) continue;

    const base = { guia: fila.guia, pagina: fila.pagina };

    // El navegador no decide qué es enviable: se vuelve a verificar acá. Si el
    // pareo decía que no, no se manda aunque llegue marcado.
    if (!fila.enviar || !fila.pedido) {
      resultados.push({ ...base, ok: false, error: fila.motivo || "no se pudo identificar al cliente" });
      continue;
    }

    // Segunda verificación del candado: entre "revisar" y "enviar" pudo pasar
    // otra corrida (dos pestañas abiertas, por ejemplo).
    const previa = store.guiaYaEnviada(fila.guia);
    if (previa) {
      resultados.push({ ...base, nombre: fila.pedido.nombre, ok: false, error: "ya se le había enviado" });
      continue;
    }

    const to = guias.destinoDe(fila.pedido);
    const caption = guias.textoParaCliente(fila.pedido, fila.guia, fila.transportadora);

    // ========================================================================
    // 🔴 LA GUÍA SE DESPACHA AL DÍA SIGUIENTE, ASÍ QUE LA VENTANA YA ESTÁ
    //    CERRADA PARA MUCHOS CLIENTES.
    //
    // Un documento como mensaje libre solo pasa dentro de las 24h desde el
    // último mensaje del cliente. Pasado eso Meta lo rechaza (131047) y el
    // cliente se queda sin su guía — y el dueño creyendo que la mandó.
    //
    // Con la ventana cerrada el PDF viaja DENTRO de la plantilla aprobada
    // (guia_de_envio), que lleva el documento en el encabezado. El cliente
    // recibe el archivo igual, sin haber escrito antes.
    // ========================================================================
    const conv = store.getConv(to);
    const ultimo = (conv && conv.ultimoDelCliente) || 0;
    const ventanaAbierta = ultimo > 0 && Date.now() - ultimo < 24 * 60 * 60 * 1000;

    const envio = ventanaAbierta
      ? await sendPdf(to, fila.hoja, guias.nombreArchivo(fila.guia), caption)
      : await sendPdfPorPlantilla(
          to,
          fila.hoja,
          guias.nombreArchivo(fila.guia),
          PLANTILLA_GUIA,
          PLANTILLA_IDIOMA
        );

    if (envio.ok) {
      store.registrarGuiaEnviada({
        guia: fila.guia,
        telefono: to,
        nombre: fila.pedido.nombre,
        certeza: fila.certeza,
        transportadora: fila.transportadora?.clave || null,
        messageId: envio.messageId,
        // Queda anotado el camino: si mañana una guía no llegó, saber si salió
        // por plantilla o como mensaje libre es la primera pista.
        porPlantilla: Boolean(envio.porPlantilla),
      });
      // El número de guía queda pegado al pedido: así el CSV de despacho sale
      // completo y se puede cruzar contra el export de la transportadora.
      if (fila.pedido.fecha) store.anotarGuiaEnPedido(fila.pedido.fecha, fila.guia);
      // Queda en el historial del chat para que el bot no repita la información.
      store.pushMsg(to, "assistant", caption);
      anotarEvento({ tipo: "guia-enviada", para: to, guia: fila.guia, certeza: fila.certeza });
      console.log(
        `📦 Guía ${fila.guia} enviada a ${fila.pedido.nombre} (${to}), certeza ${fila.certeza}` +
          (envio.porPlantilla ? ` [por plantilla ${PLANTILLA_GUIA}, su ventana estaba cerrada]` : " [mensaje libre]")
      );
      resultados.push({ ...base, nombre: fila.pedido.nombre, telefono: to, ok: true });
    } else {
      const motivo = motivoDeEnvio(envio);
      anotarEvento({ tipo: "guia-fallida", para: to, guia: fila.guia, error: motivo.slice(0, 180) });
      console.error(`🔴 Guía ${fila.guia} NO se envió a ${to}: ${motivo}`);
      resultados.push({ ...base, nombre: fila.pedido.nombre, telefono: to, ok: false, error: motivo });
    }
  }

  // El plan se consume: un segundo clic no puede reenviar lo mismo.
  PLANES_GUIAS.delete(String(req.body.id));

  const enviadas = resultados.filter((r) => r.ok).length;
  res.json({
    ok: true,
    intentadas: resultados.length,
    enviadas,
    fallaron: resultados.length - enviadas,
    resultados,
  });
});

// ============================================================================
// GET /recuperar-cliente?token=...&id=CO.xxxx[&msg=...]
//
// 🎯 RECUPERAR LOS LEADS QUE SE PERDIERON POR EL BUG DE LOS CLIENTES SIN TELÉFONO
//
// Medido en producción: 7 clientes distintos escribieron entre las 09:59 y las
// 12:11 del 22-sep y ninguno recibió una respuesta útil. Todos venían de un
// anuncio, así que ya están pagados (~$1.050 cada conversación).
//
// 🔑 SE PUEDEN RECUPERAR, y esto es lo importante: su identificador NO se perdió.
// Quedó escrito en los logs de Render, que sobreviven a los despliegues:
//
//     buscar en los logs de Render:  SIN 'from'
//     y copiar el "user_id":"CO.…" de cada payload
//
// ⏰ TIENE RELOJ: la ventana de 24h de Meta se cuenta desde el último mensaje del
// cliente. Los suyos son de las 09:59-12:11, así que se cierra a esa misma hora
// del día siguiente. Pasado eso solo se les puede escribir con plantilla aprobada.
//
// A diferencia de /enviar-prueba, esto GUARDA el mensaje en el historial de la
// conversación: así, cuando el cliente conteste, el bot sabe qué se le dijo y
// sigue la charla en vez de arrancar de cero.
// ============================================================================
app.get("/recuperar-cliente", async (req, res) => {
  // 🔴 PANEL_TOKEN, no VERIFY_TOKEN. Esta ruta ESCRIBE: manda mensajes de
  // WhatsApp como BikerPro. Quedó con VERIFY_TOKEN por un cruce de ramas y eso
  // la dejó abierta a internet con un valor que está publicado en el repo.
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const id = idDestino(req.query.id || "");
  if (!id) {
    return res.status(400).json({
      error: "Falta ?id= con el identificador del cliente.",
      comoObtenerlo:
        "En los logs de Render, buscá  SIN 'from'  y copiá el valor de \"user_id\" de cada payload.",
      ejemplo: "/recuperar-cliente?token=...&id=CO.1098944123092301",
    });
  }

  // El texto arranca la conversación de nuevo sin echarle la culpa al cliente ni
  // dar explicaciones técnicas que no le importan.
  const msg =
    (req.query.msg || "").toString().trim() ||
    "¡Hola! 🏍️ Te escribo de *BikerPro*. Vi que nos habías escrito y se nos cayó la " +
      "conversación por un problema nuestro, mil disculpas 🙏\n\n" +
      "El conjunto impermeable de 4 piezas es PVC siliconado calibre 8 con costura " +
      "termosellada, y el pago es *contraentrega*: pagás cuando lo tenés en las manos.\n\n" +
      "¿Para qué ciudad sería? Te cotizo el envío ya mismo 📦";

  const envio = await sendText(id, msg);

  if (envio.ok) {
    // Queda en el historial para que el bot retome con contexto.
    store.pushMsg(id, "assistant", msg);
    anotarEvento({ tipo: "cliente-recuperado", para: id, messageId: envio.messageId });
    console.log(`🎯 Mensaje de recuperación enviado a ${id} (id ${envio.messageId})`);
  } else {
    anotarEvento({
      tipo: "recuperacion-fallida",
      para: id,
      error: JSON.stringify(envio.body?.error || envio.body).slice(0, 180),
    });
  }

  const code = envio.body?.error?.code;
  res.json({
    para: id,
    esClienteSinTelefono: esBsuid(id),
    ok: envio.ok,
    messageId: envio.messageId,
    lectura: envio.ok
      ? "🟢 Enviado. Cuando conteste, el bot retoma la conversación con contexto y ya aparece bien en el panel."
      : code === 131047 || code === 470
      ? "🔴 Se cerró la ventana de 24h: ya no se le puede escribir texto libre, solo plantilla aprobada. Este lead se perdió."
      : "🔴 No se pudo enviar. El detalle crudo de Meta va abajo.",
    metaDijo: envio.ok ? undefined : envio.body?.error || envio.body,
  });
});

// ============================================================================
// GET /limpiar-conversaciones-rotas?token=...[&aplicar=1]
//
// 🔴 LIMPIA LA BASURA QUE DEJÓ EL BUG DE LOS CLIENTES SIN TELÉFONO.
//
// Antes del arreglo, un cliente con username entraba sin `from`, y el bot
// guardaba su conversación bajo la clave literal `undefined`. Medido en
// producción el 22-sep: UNA conversación llamada "undefined" con 12 mensajes.
//
// Y el daño no era solo cosmético: TODOS esos clientes caían en la MISMA
// conversación, así que el bot leía el historial de uno y le contestaba a otro.
// Se ve en los mensajes reales: al segundo cliente que escribió "Hola, quiero
// más información" le respondió "Ya te he dado todos los detalles técnicos y el
// catálogo, para no dar más vueltas...". A un cliente nuevo. Su primer mensaje.
//
// Sin `aplicar=1` solo muestra qué haría.
// ============================================================================
app.get("/limpiar-conversaciones-rotas", (req, res) => {
  // 🔴 PANEL_TOKEN, no VERIFY_TOKEN: con `aplicar=1` esta ruta BORRA datos.
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  const todas = store.todasLasConversaciones();
  // Claves que no son ni un teléfono ni un BSUID: basura del bug.
  const rotas = Object.keys(todas).filter(
    (k) => k === "undefined" || k === "null" || k === "" || k === "false"
  );

  const detalle = rotas.map((k) => ({
    clave: k,
    mensajes: (todas[k]?.messages || []).length,
    primero: todas[k]?.messages?.[0]?.content?.slice(0, 60),
  }));

  const out = {
    conversacionesTotales: Object.keys(todas).length,
    rotasEncontradas: rotas.length,
    detalle,
    porQue:
      "Estas conversaciones son de clientes con nombre de usuario de WhatsApp que entraron " +
      "antes del arreglo. Todos quedaron mezclados en la misma, así que el bot le contestaba " +
      "a uno con el historial de otro. Ya no se puede saber quién era cada uno: el identificador " +
      "se perdió. Borrarlas evita que el bot siga arrastrando ese historial.",
  };

  if (req.query.aplicar === "1") {
    for (const k of rotas) store.borrarConversacion(k);
    out.aplicado = true;
    out.nota = `🟢 Borradas ${rotas.length} conversación(es) rota(s).`;
    anotarEvento({ tipo: "conversaciones-rotas-borradas", cuantas: rotas.length });
  } else {
    out.nota = rotas.length
      ? "PREVISUALIZACIÓN: no se borró nada. Para aplicarlo agregá &aplicar=1 a la URL."
      : "🟢 No hay conversaciones rotas. Nada que limpiar.";
  }

  res.json(out);
});

// Pedidos en CSV, para tener una copia propia fuera de Render
app.get("/pedidos.csv", (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
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
// 🔴 ANTIDUPLICADOS (22-sep). El dueño mandó su Nequi y el panel no le confirmó
// nada, así que le dio enviar 2-3 veces. Resultado medido en /eventos: dos
// mensajes idénticos al MISMO SEGUNDO, los dos entregados y leídos. El cliente
// recibió los datos de pago dos veces.
// Esto es un candado del lado del servidor: aunque el navegador mande el
// formulario dos veces, el cliente recibe UNO.
const ENVIOS_RECIENTES = new Map(); // "tel|texto" -> timestamp
const VENTANA_DUPLICADO_MS = 90 * 1000;

function esDuplicado(to, texto) {
  const clave = `${to}|${texto}`;
  const ahora = Date.now();
  // Limpieza de entradas viejas para que el mapa no crezca sin control
  for (const [k, t] of ENVIOS_RECIENTES) {
    if (ahora - t > VENTANA_DUPLICADO_MS) ENVIOS_RECIENTES.delete(k);
  }
  if (ENVIOS_RECIENTES.has(clave)) return true;
  ENVIOS_RECIENTES.set(clave, ahora);
  return false;
}

app.post("/responder", async (req, res) => {
  if (req.body?.token !== PANEL_TOKEN && req.query.token !== PANEL_TOKEN) {
    return res.sendStatus(403);
  }
  const to = idDestino(req.body?.to);
  const texto = String(req.body?.texto || "").trim();
  const comoJson = req.query.json === "1" || req.body?.json === "1";
  if (!to || !texto) {
    return comoJson
      ? res.status(400).json({ ok: false, error: "Falta el número o el texto." })
      : res.status(400).send("Falta el número o el texto.");
  }

  if (esDuplicado(to, texto)) {
    console.log(`⏭️  Duplicado bloqueado a ${to}: "${texto.slice(0, 60)}"`);
    anotarEvento({ tipo: "duplicado-bloqueado", para: to, texto: texto.slice(0, 60) });
    const aviso = "Ese mismo mensaje ya se envió hace unos segundos. No se envió de nuevo.";
    return comoJson
      ? res.json({ ok: true, duplicado: true, aviso })
      : res.redirect(`/panel?token=${encodeURIComponent(PANEL_TOKEN)}&r=${encodeURIComponent(aviso)}#c${to}`);
  }

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

  const motivo = envio.ok
    ? ""
    : (envio.body?.error?.code === 131047 || envio.body?.error?.code === 470)
    ? "Pasaron más de 24h desde el último mensaje del cliente. Meta no permite texto libre; solo plantilla aprobada."
    : envio.body?.error?.message || "No se pudo enviar.";

  // Si el panel lo pidió por fetch, responder JSON: así NO se recarga la página
  // y la conversación abierta no se cierra.
  if (comoJson) {
    return res.json({
      ok: envio.ok,
      error: motivo || undefined,
      messageId: envio.messageId,
      hora: new Date().toLocaleTimeString("es-CO", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit" }),
    });
  }

  res.redirect(
    `/panel?token=${encodeURIComponent(PANEL_TOKEN)}&r=${envio.ok ? "ok" : encodeURIComponent(motivo)}#c${to}`
  );
});

// POST /pausar — prender o apagar el bot en UN chat
// Sirve para retomar: cuando el humano termina, devuelve el chat al bot.
app.post("/pausar", (req, res) => {
  if (req.body?.token !== PANEL_TOKEN) return res.sendStatus(403);
  const tel = idDestino(req.body?.tel);
  const valor = String(req.body?.valor) === "1";
  if (!tel) return res.status(400).send("Falta el número.");
  store.setPaused(tel, valor);
  anotarEvento({ tipo: valor ? "bot-pausado" : "bot-reactivado", para: tel });
  res.redirect(`/panel?token=${encodeURIComponent(PANEL_TOKEN)}#c${tel}`);
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
// 🔒 PROTEGIDO con PANEL_TOKEN. Sin el token correcto responde 403.
//    Si quedara abierto, cualquiera podría quemar la cuota de IA a costa nuestra.
//
// ⚠️ Usa un teléfono ficticio ("prueba-*"), así no se mezcla con conversaciones
//    de clientes reales ni dispara seguimientos. `&reset=1` arranca de cero.
// ============================================================================
app.get("/probar", async (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

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
// 🔒 Protegido con PANEL_TOKEN porque hace una ESCRITURA (suscribe la
//    app a la WABA). No debe quedar abierto.
// 🔑 NUNCA devuelve el token, solo si funciona o no.
// ============================================================================
app.get("/setup-waba", async (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

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
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
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
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
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
// 🔒 Protegido con PANEL_TOKEN: manda mensajes reales.
// ============================================================================
app.get("/enviar-prueba", async (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

  // Antes esto hacía .replace(/\D/g,"") y por lo tanto NO se le podía mandar
  // nada a un cliente con username: su BSUID quedaba convertido en un número
  // inventado. Justo los clientes que hay que recuperar.
  const to = idDestino(req.query.to || OWNER || "");
  if (!to) {
    return res.status(400).json({
      error: "Falta ?to= con el número destino (con código de país, sin + ni espacios) o el identificador del cliente.",
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
// 🔒 Protegido con PANEL_TOKEN: registra un número, es una escritura.
// ============================================================================
app.get("/registrar-numero", async (req, res) => {
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);

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
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
  res.json({
    total: EVENTOS.length,
    nota: EVENTOS.length === 0
      ? "🔴 VACÍO: Meta no ha llamado al webhook desde el último reinicio. Si ya escribiste al número, el problema es la suscripción del campo 'messages' en la cuenta correcta (la de 'biker'), no el bot."
      : "Del más viejo al más nuevo. 'status: failed' trae el motivo en 'errores'.",
    eventos: EVENTOS,
  });
});

// ============================================================================
// QUIÉN ESCRIBIÓ  —  y por qué no alcanza con leer `from`
//
// 🔴 El 22-sep a las 17:11 un cliente que venía de un anuncio NO recibió
// respuesta. El payload no traía `from` ni `wa_id`: traía `from_user_id` y
// `contacts[].user_id` con un BSUID, porque ese cliente usa la función
// "nombre de usuario" de WhatsApp y Meta le oculta el teléfono al negocio.
//
// El código leía solo `msg.from` → undefined → intentaba enviar sin destino →
// Meta respondía 400 "The parameter to is required." Resultado: silencio. El
// lead estaba pagado.
//
// Se lee en este orden: el teléfono si está, y si no el BSUID. El resto del bot
// no cambia: el identificador que devuelve esta función se usa igual como clave
// de la conversación y como destino de la respuesta.
// ============================================================================
// ============================================================================
// 🔔 AVISO CUANDO EL BOT NO PUEDE IDENTIFICAR A QUIEN ESCRIBE
//
// POR QUÉ EXISTE, con el número exacto: el 22-sep WhatsApp empezó a mandar
// clientes sin teléfono (función "nombre de usuario") y el bot no supo a dónde
// responderles. Escribió el fallo en el log de Render y siguió. Resultado:
//
//   17 clientes que venían de anuncios (~$17.850 de pauta) quedaron sin
//   respuesta durante ~3 horas, y el problema se descubrió DE CASUALIDAD
//   porque el dueño vio "un mensaje raro" en el panel.
//
// El arreglo de fondo ya está: hoy se leen los dos formatos de identidad. Pero
// si Meta introduce un formato NUEVO, vuelve a pasar — y sin esto, otra vez nos
// enteraríamos tarde. No se puede prevenir un formato que todavía no existe;
// sí se puede hacer que el fallo GRITE en vez de susurrar.
//
// Se limita a un aviso cada 30 minutos con el acumulado, para que un problema
// masivo no se convierta en 200 mensajes al dueño.
// ============================================================================
const SIN_ATRIBUIR = { cuantos: 0, ultimoAviso: 0 };
const ESPERA_ENTRE_AVISOS_MS = 30 * 60 * 1000;

async function avisarSinAtribuir(value, msg) {
  SIN_ATRIBUIR.cuantos++;
  if (!OWNER) return;

  const ahora = Date.now();
  if (ahora - SIN_ATRIBUIR.ultimoAviso < ESPERA_ENTRE_AVISOS_MS) return;
  SIN_ATRIBUIR.ultimoAviso = ahora;

  // El perfil suele venir aunque el identificador no se pueda leer: sirve para
  // saber de quién estamos hablando sin entrar a los logs.
  const perfil = (value?.contacts || [])[0]?.profile || {};
  const quien = [perfil.name, perfil.username ? "@" + perfil.username : null].filter(Boolean).join(" ");
  const texto = msg?.text?.body ? `"${String(msg.text.body).slice(0, 70)}"` : `un ${msg?.type || "mensaje"}`;

  const aviso =
    `🔴 UN CLIENTE ESCRIBIÓ Y EL BOT NO SUPO QUIÉN ES\n\n` +
    `Mandó: ${texto}\n` +
    (quien ? `Perfil: ${quien}\n` : "") +
    `\nWhatsApp no mandó su número ni un identificador que el bot reconozca, así que NO se le pudo responder.\n\n` +
    (SIN_ATRIBUIR.cuantos > 1 ? `⚠️ Van ${SIN_ATRIBUIR.cuantos} casos desde el último reinicio.\n\n` : "") +
    `QUÉ HACER: en Render → Logs buscá  user_id  y copiá el identificador. ` +
    `Con eso se le puede escribir desde /recuperar-cliente.\n\n` +
    `⏰ Hay 24 horas desde su mensaje para contestarle sin plantilla.`;

  const r = await sendText(OWNER, aviso);
  anotarEvento({
    tipo: "aviso-sin-atribuir",
    acumulado: SIN_ATRIBUIR.cuantos,
    avisado: Boolean(r && r.ok),
    perfil: quien || undefined,
  });
  console.log(`🔔 Avisado al dueño: ${SIN_ATRIBUIR.cuantos} mensaje(s) sin atribuir (envío ok: ${r && r.ok})`);
}

function quienEscribe(msg, value) {
  const contacto = (value?.contacts || [])[0] || {};
  const telefono = msg?.from || contacto.wa_id || null;
  const bsuid = msg?.from_user_id || contacto.user_id || null;
  const id = telefono || bsuid || null;
  return {
    id,
    esBsuid: Boolean(!telefono && bsuid),
    nombre: contacto.profile?.name || null,
    username: contacto.profile?.username || null,
  };
}

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
        const quien = quienEscribe(m, value);
        // Sin NINGÚN identificador no hay a dónde responder. Ahora sí es raro:
        // antes esto se disparaba con los clientes que tienen username, que sí
        // se pueden contestar (ver quienEscribe).
        if (!quien.id) {
          anotarEvento({
            tipo: "entrante-sin-remitente",
            clase: m.type,
            texto: m.text?.body?.slice(0, 80),
            crudo: JSON.stringify({ value }).slice(0, 700),
          });
          console.error("🔴 Mensaje entrante sin remitente NI username. Payload:", JSON.stringify(value).slice(0, 500));
          // 🔔 Y AHORA SE AVISA. Esto es lo que faltó el 22-sep: el bot ya
          // escribía el fallo en el log, pero nadie mira los logs, así que 17
          // clientes pagados se quedaron sin respuesta durante ~3 horas y el
          // problema se descubrió de casualidad, por "un mensaje raro" en el
          // panel. Un fallo que no avisa se mide en horas de ventas perdidas.
          avisarSinAtribuir(value, m).catch((e) => console.error("aviso:", e.message));
          continue;
        }
        anotarEvento({
          tipo: "entrante",
          de: quien.id,
          ...(quien.esBsuid ? { sinTelefono: true, perfil: quien.nombre, username: quien.username } : {}),
          clase: m.type,
          texto: m.text?.body?.slice(0, 80),
        });
      }
      for (const msg of messages) {
        const quien = quienEscribe(msg, value);
        const from = quien.id;
        // El nombre y el username son lo único humano que tenemos de un cliente
        // sin teléfono: sin esto el panel muestra "CO.1098944123092301".
        if (from && (quien.nombre || quien.username)) {
          store.guardarPerfil(from, { nombre: quien.nombre, username: quien.username, sinTelefono: quien.esBsuid });
        }

        // ====================================================================
        // 🎯 DE QUÉ ANUNCIO VINO (atribución de Meta Ads, gratis en el webhook)
        //
        // Meta manda esto en `msg.referral` y hasta hoy se descartaba. Medido
        // en los logs del 22-sep: los 17 clientes perdidos traían el anuncio,
        // y un solo anuncio explicaba 7 de ellos.
        //
        // Llega SOLO en el primer mensaje después del clic, así que se guarda
        // en la conversación apenas aparece. El pedido lo recoge de ahí varios
        // mensajes después (ver store.saveOrder).
        // ====================================================================
        const ref = msg.referral;
        if (from && ref && ref.source_id) {
          store.guardarAtribucion(from, {
            source_id: String(ref.source_id),
            source_url: ref.source_url || null,
            source_type: ref.source_type || null,
            // El identificador del clic. Meta lo pide para medir conversiones
            // de vuelta; si algún día se hace, sin esto no se puede.
            ctwa_clid: ref.ctwa_clid || null,
          });
          anotarEvento({
            tipo: "anuncio-detectado",
            de: from,
            anuncio: String(ref.source_id),
            origen: ref.source_url || null,
          });
          console.log(`🎯 ${from} viene del anuncio ${ref.source_id} (${ref.source_url || "sin url"})`);
        }
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
        const { reply, order, handoff, media, pedidoRescatado } = await generateReply(from, text);
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
          // 🟠 Si el pedido hubo que RECONSTRUIRLO porque el bloque llegó
          // cortado, el aviso lo dice primero: puede faltarle un campo y el
          // dueño tiene que revisarlo antes de despachar. Antes este pedido
          // simplemente no existía.
          const avisoRescate = pedidoRescatado
            ? `🟠 ESTE PEDIDO SE RECONSTRUYÓ\n` +
              `La respuesta de la IA llegó cortada y el pedido se armó con los datos que se pudieron leer.\n` +
              `⚠️ REVISÁ que no falte ningún dato antes de despachar.\n\n`
            : "";
          // 🔴 Si el pedido no tiene celular, el aviso lo dice PRIMERO y fuerte.
          // Un pedido sin teléfono no se puede despachar: la transportadora lo
          // exige para la guía. Si esto va al final o en letra chica, el dueño
          // lo despacha igual y el paquete se pierde o la guía se rechaza.
          const alerta = order.sinTelefono
            ? `🔴🔴 OJO: ESTE PEDIDO NO TIENE CELULAR\n` +
              `El cliente usa nombre de usuario de WhatsApp, así que no tenemos su número.\n` +
              `⛔ NO LO DESPACHES: pedile el celular por el chat primero.\n\n`
            : "";
          await sendText(
            OWNER,
            avisoRescate +
              alerta +
              `🟢 NUEVO PEDIDO BikerPro\n` +
              `Nombre: ${order.nombre}\nCel: ${order.celular || "🔴 FALTA"}\n` +
              `Ciudad: ${order.ciudad}\nDir: ${order.direccion}\n` +
              `Color: ${order.color} · Talla: ${order.talla}\n` +
              `Total al recibir: $${Number(order.total).toLocaleString("es-CO")}\n` +
              `Chat: ${order.telefono_chat}` +
              (order.celularDelChat ? `\n(el celular se tomó del número por el que escribe)` : "")
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
app.get("/seguimiento", (req, res) => {
  // Filtraba los nombres de las plantillas y el estado interno sin pedir nada.
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
  res.json({
    activo: process.env.SEGUIMIENTO_ACTIVO === "1",
    plantilla_2: process.env.SEGUIMIENTO_PLANTILLA_2 || "(sin configurar)",
    plantilla_3: process.env.SEGUIMIENTO_PLANTILLA_3 || "(sin configurar)",
    estado: seguimiento.diagnostico()
  });
});

// Dispara una pasada de seguimiento AHORA, sin esperar los 30 min.
// Sirve para probar. Respeta todas las reglas (no manda a quien no toca).
app.get("/seguimiento/correr", async (req, res) => {
  // 🔴🔴 ESTA ERA LA PEOR: no pedía NADA y manda mensajes de WhatsApp a los
  // clientes (`sendText` y `sendTemplate` dentro de correrSeguimientos).
  // Cualquiera en internet podía dispararla, todas las veces que quisiera, y
  // hacer que BikerPro les escriba a sus propios clientes.
  //
  // Hoy estaba inerte solo porque SEGUIMIENTO_ACTIVO no está en "1". Esa no es
  // una protección: es una casualidad que se cae el día que se active.
  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);
  try {
    res.json(await seguimiento.correrSeguimientos());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BikerPro bot escuchando en puerto ${PORT} 🏍️`);

  // 💾 Contar este arranque en el propio disco. Es la evidencia de que los
  // datos sobreviven: si el contador va en 5, aguantaron 5 arranques. El panel
  // lo muestra en vez de suponer que el disco está bien solo porque existe la
  // variable DATA_DIR (que fue exactamente el aviso falso que teníamos).
  const marca = store.registrarArranque();
  const disco = store.estadoDelDisco();
  if (disco.discoAparte === true) {
    console.log(
      `💾 Disco persistente COMPROBADO en ${disco.dir} · arranque #${marca?.arranques || "?"}` +
        (disco.desde ? ` · datos desde ${disco.desde}` : "")
    );
  } else if (disco.configurado && disco.discoAparte === false) {
    console.warn(
      `🔴 DATA_DIR=${disco.dir} NO es un disco montado: es una carpeta del contenedor y se ` +
        "borra en el próximo despliegue. Revisá el Mount Path en Render → Settings → Disks."
    );
  }

  subscribeWaba();      // auto-suscribe la WABA al arrancar
  seguimiento.arrancar(); // reloj del seguimiento de 72h (solo si esta activo)
});
