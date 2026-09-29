// Cerebro del bot: arma el historial, llama a Gemini y procesa la respuesta
// (detecta pedidos confirmados y solicitudes de pasar a un humano).
const { buildSystemPrompt } = require("./prompt");
const { respuestaDeArranque } = require("./primer-mensaje");
const { revisarDireccionDePedido, sedeEspecificaEn, estadoDeLaSede } = require("./direccion");
const { revisarConfirmacion } = require("./confirmacion");
const store = require("./store");
const cotizacion = require("./cotizacion");
const promesas = require("./promesas");
const comercial = require("./comercial");
const posventa = require("./posventa");
const catalogo = require("./catalogo");
const mediaCatalogo = require("./media");

// ============================================================================
// PROVEEDOR DE IA — configurable, para no quedar amarrado a uno
//
// Por qué así: los precios de los modelos se movieron MUCHO en 2026 (Gemini
// Flash pasó de US$0.10 a US$0.75 por millón de tokens de entrada). Amarrar el
// bot a un proveedor obliga a tocar código cada vez que cambia el mercado.
// Acá se cambia con una variable de entorno.
//
//   AI_PROVIDER=gemini          -> Gemini (Google AI Studio)
//   AI_PROVIDER=openai-compat   -> DeepSeek, Groq, OpenAI, Together, etc.
//
// Referencia de costo medido para BikerPro (4.020 conversaciones/mes,
// ver /analisis/comparar-opciones-bot-21sep.py):
//   DeepSeek V4-Flash ........ US$0.14 / US$0.28 por millón  <- el más barato útil
//   GPT-5.6 Luna ............. US$0.20 / US$1.20
//   Gemini 3.1 Flash-Lite .... US$0.25 / US$1.50
//   Gemini 3.8 Flash ......... US$0.75 / US$3.75  <- innecesario para un guion
// ============================================================================
const PROVIDER = (process.env.AI_PROVIDER || "gemini").toLowerCase();

// Gemini
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

// Compatible con OpenAI (DeepSeek, Groq, OpenAI, Together...)
const AI_KEY = process.env.AI_API_KEY;
const AI_BASE = (process.env.AI_BASE_URL || "https://api.deepseek.com").replace(/\/$/, "");
const AI_MODEL = process.env.AI_MODEL || "deepseek-chat";

// ¿Hay alguna credencial usable?
const TIENE_IA = PROVIDER === "gemini" ? !!GEMINI_KEY : !!AI_KEY;

// Cuántos mensajes del historial se mandan. El prompt de sistema ya ocupa
// ~4.300 tokens y viaja en CADA llamada; el historial se suma encima. Mandar
// la conversación completa hace que una charla larga cueste el triple que una
// corta sin mejorar la venta. 8 mensajes = 4 turnos, suficiente para no perder
// el hilo (ciudad, talla, color quedan además en el resumen del pedido).
const MAX_HISTORIAL = Number(process.env.MAX_HISTORIAL || 8);

function recortarHistorial(messages) {
  if (messages.length <= MAX_HISTORIAL) return messages;
  return messages.slice(-MAX_HISTORIAL);
}

const REINTENTABLES = new Set([429, 500, 502, 503, 504]);

// ---- Gemini ----
async function callGemini(systemPrompt, messages, retries = 2) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      // ⚠️ 1600 y no 800. El tope viejo cortaba respuestas por la mitad, y lo
      // que va AL FINAL es el bloque ##ORDER## con el pedido: se perdían ventas
      // enteras sin que nadie se enterara (ver el bloque de extractOrder).
      // Solo se paga lo que se usa, así que un tope más alto no cuesta nada
      // salvo en las respuestas que de verdad lo necesitan.
      generationConfig: { temperature: 0.6, maxOutputTokens: 1600 }
    })
  });

  if (!res.ok) {
    const err = await res.text();
    if (REINTENTABLES.has(res.status) && retries > 0) {
      console.log(`Gemini ${res.status}, reintentando en 2.5s (quedan ${retries})...`);
      await new Promise((r) => setTimeout(r, 2500));
      return callGemini(systemPrompt, messages, retries - 1);
    }
    throw new Error(`Gemini ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  if (!text.trim() && retries > 0) {
    await new Promise((r) => setTimeout(r, 1500));
    return callGemini(systemPrompt, messages, retries - 1);
  }
  return text.trim();
}

// ---- Compatible con OpenAI: DeepSeek, Groq, OpenAI... ----
async function callOpenAICompat(systemPrompt, messages, retries = 2) {
  const res = await fetch(`${AI_BASE}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        }))
      ],
      temperature: 0.6,
      // Mismo motivo que en Gemini: con 800 se cortaba el bloque ##ORDER## del
      // final y el pedido se perdía en silencio.
      max_tokens: 1600
    })
  });

  if (!res.ok) {
    const err = await res.text();
    if (REINTENTABLES.has(res.status) && retries > 0) {
      console.log(`${AI_MODEL} ${res.status}, reintentando en 2.5s (quedan ${retries})...`);
      await new Promise((r) => setTimeout(r, 2500));
      return callOpenAICompat(systemPrompt, messages, retries - 1);
    }
    throw new Error(`${AI_MODEL} ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  if (!text.trim() && retries > 0) {
    await new Promise((r) => setTimeout(r, 1500));
    return callOpenAICompat(systemPrompt, messages, retries - 1);
  }
  return text.trim();
}

// Punto único de entrada: enruta según el proveedor configurado
async function callIA(systemPrompt, messages) {
  const hist = recortarHistorial(messages);
  if (PROVIDER === "gemini") return callGemini(systemPrompt, hist);
  return callOpenAICompat(systemPrompt, hist);
}

// Extrae el bloque ##ORDER## {...} y lo separa del mensaje visible
/**
 * Rescata los campos de un bloque ##ORDER## que llegó CORTADO o mal formado.
 *
 * Se lee campo por campo con expresiones regulares en vez de JSON.parse,
 * porque un JSON al que le falta la llave final no se puede parsear pero sí se
 * puede leer. Mejor un pedido con un campo faltante —que el dueño completa en
 * el panel— que ningún pedido.
 */
function rescatarPedido(fragmento) {
  const txt = (n) => {
    const m = fragmento.match(new RegExp('"' + n + '"\\s*:\\s*"([^"]*)"'));
    return m ? m[1] : undefined;
  };
  const num = (n) => {
    const m = fragmento.match(new RegExp('"' + n + '"\\s*:\\s*(\\d+)'));
    return m ? Number(m[1]) : undefined;
  };
  const o = {
    nombre: txt("nombre"),
    celular: txt("celular"),
    ciudad: txt("ciudad"),
    direccion: txt("direccion"),
    color: txt("color"),
    talla: txt("talla"),
    // ⚠️ `unidades` se rescata igual que los demás: si el bloque llegó cortado
    // justo después de la talla, un pedido de dos conjuntos se reconstruiría como
    // de uno y se despacharía de menos contra un recaudo de dos.
    unidades: num("unidades"),
    pago: txt("pago"),
    total: num("total"),
  };
  // Sin nombre NI ciudad no hay nada que rescatar: sería basura disfrazada de
  // pedido, y un pedido falso en el panel es peor que ninguno.
  if (!o.nombre && !o.ciudad) return null;
  return o;
}

// ============================================================================
// 🔴 UN PEDIDO NO PUEDE PERDERSE EN SILENCIO (22-sep)
//
// EL DUEÑO REPORTÓ que no entraban ventas: 93 conversaciones y el último pedido
// guardado de las 9:38 am. La IA funcionaba y el bot contestaba bien.
//
// Acá estaba el agujero: si el bloque ##ORDER## llegaba CORTADO —y se corta,
// porque la respuesta tiene un tope de tokens y el JSON va al final— pasaba
// esto, en este orden:
//
//   1. la expresión que busca {...} NO encontraba nada (falta la llave final)
//   2. order quedaba en null
//   3. la última línea borraba el bloque cortado para que el cliente no lo vea
//   4. y listo: el cliente recibía una respuesta perfecta, creía que su pedido
//      quedó hecho, y EL PEDIDO NO EXISTÍA EN NINGUNA PARTE
//
// Sin un log, sin un aviso, sin nada. Desde afuera era idéntico a "hoy no
// compró nadie".
//
// Ahora: si el bloque estaba y no se pudo leer, se rescata campo por campo, se
// grita en el log y se le avisa al dueño por WhatsApp.
// ============================================================================
function extractOrder(text) {
  let order = null;
  let clean = text;
  let rescatado = false;

  const m = text.match(/##ORDER##\s*(\{[\s\S]*?\})/);
  if (m) {
    try {
      order = JSON.parse(m[1]);
    } catch {
      order = null;
    }
    clean = text.replace(/##ORDER##\s*\{[\s\S]*?\}/, "").trim();
  }

  if (!order && text.includes("##ORDER##")) {
    const fragmento = text.slice(text.indexOf("##ORDER##"));
    order = rescatarPedido(fragmento);
    rescatado = Boolean(order);
    if (rescatado) {
      console.error(
        "🟠 PEDIDO RESCATADO DE UN BLOQUE CORTADO. La IA emitió ##ORDER## pero el " +
          "JSON no se pudo leer (casi siempre porque la respuesta llegó al tope de " +
          "tokens). Se recuperaron los campos legibles: " +
          JSON.stringify(order) +
          " — REVISAR que no falte nada antes de despachar."
      );
    } else {
      console.error(
        "🔴 PEDIDO PERDIDO. La IA emitió ##ORDER## y no se pudo leer NI rescatar " +
          "ningún campo. El cliente cree que su pedido quedó hecho. Bloque recibido: " +
          fragmento.slice(0, 300)
      );
    }
  }

  // Elimina cualquier resto de ##ORDER## aunque esté truncado/malformado (para que no llegue al cliente)
  clean = clean.replace(/##ORDER##[\s\S]*$/, "").trim();
  return { order, clean, rescatado };
}

// Extrae marcadores [[MEDIA:clave]] y los separa del mensaje visible
function extractMedia(text) {
  const keys = [];
  const re = /\[\[MEDIA:(\w+)\]\]/g;
  let m;
  while ((m = re.exec(text)) !== null) keys.push(m[1]);
  const clean = text.replace(/\[\[MEDIA:\w+\]\]/g, "").trim();
  return { keys, clean };
}

// Respaldo: detecta por palabras clave del mensaje del cliente qué foto/video enviar,
// por si la IA no puso el marcador. Así el envío de multimedia es confiable.
// ============================================================================
// 📸 SOLO LAS FOTOS QUE EXISTEN DE VERDAD
//
// Dos razones, las dos aprendidas a los golpes:
//
//  1. El 21-sep TODAS las fotos daban 404 (el BASE apuntaba a la carpeta del repo
//     y GitHub Pages publica desde `docs/`). El cliente pedía fotos, Meta
//     respondía `131053 Media upload error 404`, y no llegaba nada. Nadie se
//     enteraba.
//  2. Hoy, con la campaña del V10 encendida antes de tener sus fotos, la
//     alternativa a "no mandar nada" era mandar la del impermeable. Eso es peor:
//     el cliente ve otro producto y desconfía de todo lo demás.
// ============================================================================
function mediaDisponible(claves) {
  const disponibles = mediaCatalogo.soloDisponibles(claves);
  const faltan = (claves || []).filter((k) => !disponibles.includes(k));
  if (faltan.length) {
    console.warn(
      `📸 Se pidieron fotos que todavía no están subidas (${faltan.join(", ")}). ` +
        "NO se manda ninguna en su lugar: el bot lo dice con palabras."
    );
  }
  return disponibles;
}

function detectMediaIntent(text, productoId) {
  const t = (text || "").toLowerCase();
  const has = (arr) => arr.some((w) => t.includes(w));
  const quiereVer = has(["foto", "fotos", "imagen", "imagenes", "imágenes",
    "muestr", "muéstr", "enséñ", "enseñ", "ensename", "mira", "manda", "envia", "envía", " ver "]);

  // ==========================================================================
  // 🎧 LAS FOTOS DEL INTERCOMUNICADOR
  //
  // 🔴 REPRODUCIDO EL 28-SEP, CON LA CAMPAÑA YA ENCENDIDA: un cliente que venía
  // del anuncio del V10 escribía "¿me manda fotos?" y recibía **la foto del
  // conjunto impermeable**, con su caption de 4 piezas y PVC siliconado.
  //
  // La causa está al final de esta función: "si pidió ver algo y no reconocí qué,
  // mandá la foto del producto" — y "el producto" era siempre el impermeable.
  //
  // 🔑 Esta rama va PRIMERO y sale con `return`: en un hilo de intercomunicadores,
  // ninguna palabra del impermeable puede colarse. Un cliente del V10 que escribe
  // "cómo se ve puesto" quiere ver el intercomunicador en el casco, no un
  // impermeable puesto.
  //
  // ⚠️ Lo que devuelve pasa después por `media.soloDisponibles`, así que mientras
  // no estén los archivos no se manda nada — en vez de mandar lo de otro producto.
  // ==========================================================================
  if (catalogo.esV10(productoId)) {
    const delV10 = [];
    // Lo específico primero.
    if (has(["puesto", "puesta", "en el casco", "montado", "instalado", "como se ve", "cómo se ve", "se ve"])) {
      delV10.push("v10_puesto");
    }
    if (has(["combo", "los dos", "las dos", "ambos", "pareja", "x2"])) delV10.push("v10_combo");
    if (has(["incluye", "trae", "contenido", "viene con", "que viene", "adentro"])) delV10.push("v10_contenido");
    // La caja cerrada responde "¿qué modelo es?" y "¿es original?", que son las dos
    // preguntas donde ver el empaque con el nombre impreso vale más que un texto.
    if (has(["caja", "empaque", "modelo", "original", "marca", "presentacion", "presentación"])) delV10.push("v10_caja");
    // Y si pidió ver algo sin decir qué, la foto principal del producto.
    if (quiereVer && delV10.length === 0) delV10.push("v10");
    // Si nombró el producto y quiere verlo, también la principal.
    if (quiereVer && has(["interco", "v10"]) && !delV10.includes("v10")) delV10.push("v10");
    if (t.includes("video")) delV10.push("video");
    // 🔑 UNA SOLA FOTO POR MENSAJE. El dueño fue explícito con el tono: "no
    // bombardear con características", "mensajes relativamente cortos". Tres fotos
    // seguidas por una pregunta se leen como spam, no como un vendedor.
    //
    // Se queda la PRIMERA, que es la más específica: las condiciones están
    // ordenadas de lo más preciso ("puesto en el casco") a lo más genérico ("una
    // foto cualquiera"). Ejemplo real: "¿qué trae la caja?" activaba el contenido Y
    // la caja cerrada; gana el contenido, que es lo que preguntó.
    return delV10.slice(0, 1);
  }

  const keys = [];
  // Colores con foto individual disponible
  const conFoto = [];
  if (has(["rojo", "roja"])) conFoto.push("rojo");
  if (has(["verde"])) conFoto.push("verde");
  if (has(["negro", "negra"])) conFoto.push("negro");
  // Colores sin foto individual (se muestran en el cuadro de colores)
  const pideColorSinFoto = has(["blanco", "blanca", "morado", "morada", "amarillo", "azul", "gris"]);
  const pideColorGenerico = t.includes("color");
  const mencionaColor = conFoto.length > 0 || pideColorSinFoto || pideColorGenerico;

  if (quiereVer && conFoto.length > 0) {
    conFoto.forEach((k) => keys.push(k));        // foto específica del color pedido
  } else if (pideColorGenerico || (quiereVer && pideColorSinFoto)) {
    keys.push("colores");                         // cuadro con todos los colores
  }
  // 📚 Catálogo: el cliente lo pide por nombre. Va primero porque trae foto,
  // descripción y precio, y es mejor que una imagen suelta.
  if (has(["catalogo", "catálogo", "catalogos", "catálogos", "que mas tienen",
           "qué más tienen", "otros productos", "mas productos", "más productos",
           "variedad", "lista de productos"])) keys.push("catalogo");
  // Los otros productos del catálogo, por nombre
  if (has(["colmena", "premium", "gama alta", "forro"])) keys.push("colmena");
  if (has(["reflectiv", "doble faz", "que brille", "se vea de noche"])) keys.push("reflectiva");
  if (has(["guante", "guantes"])) keys.push("guantes");
  if (has(["puesto", "puesta", "modelo", "se ve", "persona"])) keys.push("modelo");
  if (t.includes("video")) keys.push("video");
  // Foto del producto: solo si NO pidió un color específico
  if (quiereVer && !mencionaColor && has(["producto", "conjunto", "impermeable", "piezas", "traje", "articulo", "artículo"])) keys.push("producto");
  if (quiereVer && keys.length === 0) keys.push("producto");
  return keys;
}

// Genera la respuesta para un mensaje entrante
// ============================================================================
// 🔢 CUÁNTAS UNIDADES, SEGÚN EL PRODUCTO
//
// El impermeable cuenta las unidades leyendo TALLAS: "una S y una XL" son dos
// conjuntos, y esa lógica lleva varias correcciones encima (el 2XL que contaba
// como dos, la cantidad que se perdía al tercer mensaje). No se toca.
//
// El intercomunicador no tiene tallas, así que su cantidad sale de las palabras
// de cantidad: "solo uno", "el combo", "los dos". Ver catalogo.unidadesPedidas.
//
// 🔑 Y RECORRE TODO EL HILO, no solo este turno. Es el requisito de "no perder el
// contexto": si el cliente dijo "quiero el combo" y tres mensajes después escribe
// su dirección, las 2 unidades tienen que seguir en pie. Ese defecto exacto —la
// cantidad que se perdía al mensaje siguiente— ya se pagó una vez en impermeables.
// ============================================================================
function cantidadDelProducto(productoId, conv, userText, previa) {
  if (!catalogo.esV10(productoId)) {
    return cotizacion.cantidadDelHilo(conv, userText, previa && previa.uds);
  }

  // 1. Lo que dice ESTE turno manda: es el mecanismo del cambio de cantidad
  //    ("mejor uno", "mejor mándeme los dos").
  const deAhora = catalogo.unidadesPedidas(userText);
  if (deAhora != null) return { uds: deAhora, origen: "este turno" };

  // 2. Si no, lo último que pidió el CLIENTE en el hilo (lo que el bot ofrezca no
  //    es una decisión del cliente).
  const mensajes = (conv && conv.messages) || [];
  for (let i = mensajes.length - 1; i >= Math.max(0, mensajes.length - 12); i--) {
    const m = mensajes[i];
    if (!m || m.role !== "user" || !m.content) continue;
    const n = catalogo.unidadesPedidas(m.content);
    if (n != null) return { uds: n, origen: "lo que pidió antes en el hilo" };
  }

  // 3. La cantidad de la cotización vigente, para no perderla entre turnos.
  //
  // 🔴 PERO SOLO SI ES DEL MISMO PRODUCTO, y esto lo encontró la prueba del cambio
  // de producto: un cliente venía cotizando UN conjunto impermeable en Medellín y
  // preguntó "también vi los intercomunicadores, ¿cuánto cuestan?". La cantidad se
  // heredaba de la cotización del impermeable —1 unidad— así que se le mostraba
  // $82.000 (un intercomunicador) en vez del combo de $122.000 que es lo que se
  // publicita y lo que estaba preguntando.
  //
  // La cantidad de un producto no dice nada de la del otro. Son decisiones
  // distintas: querer un impermeable no significa querer un intercomunicador.
  if (
    previa &&
    previa.productoId === productoId &&
    Number.isFinite(Number(previa.uds)) &&
    Number(previa.uds) > 0
  ) {
    return { uds: Number(previa.uds), origen: "la cotización vigente de este producto" };
  }

  // 4. 🔑 POR DEFECTO, EL COMBO DE DOS.
  //
  // Y no es un capricho: la publicidad del V10 empuja el combo x2 por $99.900, así
  // que alguien que llega preguntando "info de la promoción" está preguntando por
  // ESO. Arrancar en una unidad le mostraría un precio que no es el del anuncio.
  //
  // Vender una sola sigue disponible en cualquier momento: basta que lo pida
  // ("solo uno", "¿cuánto vale uno?") y el paso 1 lo detecta.
  return { uds: 2, origen: "el combo del anuncio, que es lo que se publicita" };
}

async function generateReply(phone, userText) {
  store.pushMsg(phone, "user", userText);
  const conv = store.getConv(phone);

  // ==========================================================================
  // 🥇 EL ARRANQUE NO SE IMPROVISA
  //
  // Si es el primer contacto y el cliente no pregunto nada (llego con el texto
  // prerrellenado del anuncio o solo saludo), se le manda el arranque fijo: el
  // que responde talla y color de una, que son el 28,1% de las dudas.
  //
  // Va ANTES de la llamada a la IA a proposito: sale instantaneo y gratis, y es
  // el mensaje que mas se repite en toda la operacion. Ver primer-mensaje.js.
  //
  // Cualquier otro caso (pregunta concreta, anuncio del colmena, charla ya
  // empezada) devuelve null y sigue el camino normal.
  // ==========================================================================
  // ==========================================================================
  // 🛒 DE QUÉ PRODUCTO ESTAMOS HABLANDO
  //
  // Desde el 28-sep BikerPro vende dos cosas: el conjunto impermeable y el
  // intercomunicador V10 2X. Esto se resuelve ACÁ ARRIBA, antes del arranque fijo,
  // y el orden importa: el arranque contesta SIN llamar a la IA, así que si se
  // resolviera después, un cliente que llega del anuncio del intercomunicador y
  // escribe "hola" recibiría el folleto completo del impermeable.
  //
  // 🔑 Decide en este orden: lo que dijo en este turno > lo que venía diciendo el
  // hilo > el anuncio por el que entró > el de siempre. Ver catalogo.productoDelHilo.
  //
  // ⚠️ SI NO HAY NINGUNA SEÑAL, EL RESULTADO ES EL IMPERMEABLE, o sea exactamente
  // el comportamiento de antes. Un "quiero información" pelado no puede empezar a
  // vender intercomunicadores por su cuenta.
  // ==========================================================================
  const delAnuncio = catalogo.productoDelAnuncio(store.atribucionDe(phone));
  const eleccion = catalogo.productoDelHilo(conv, userText, { producto: delAnuncio });
  const productoId = eleccion.producto;
  const ficha = catalogo.de(productoId);
  if (catalogo.esV10(productoId)) {
    console.log(`🎧 ${phone}: la conversación es del ${ficha.nombreCorto} (${eleccion.porQue}).`);
  }
  // 🔒 Se FIJA el producto cuando la señal es fuerte: lo dijo el cliente en este
  // turno, o vino del anuncio. Así sobrevive a la rotación del historial — sin
  // esto, en una conversación larga el bot se olvidaba de qué estaba vendiendo.
  //
  // ⛔ Con una heurística NO se fija: un error de lectura quedaría congelado para
  // toda la conversación en vez de corregirse al turno siguiente.
  if (eleccion.explicito || (delAnuncio && delAnuncio === productoId)) {
    store.fijarProductoActivo(phone, productoId, eleccion.porQue);
    conv.productoActivo = productoId; // el objeto en memoria de este turno
  }

  const arranque = respuestaDeArranque(conv.messages, userText, productoId);
  if (arranque) {
    store.pushMsg(phone, "assistant", arranque);
    return { reply: arranque, order: null, handoff: false, media: [], pedidoRescatado: false, revisionHumana: null };
  }

  // ==========================================================================
  // 🧾 EL PRECIO SE CALCULA EN CÓDIGO, NO LO RESUELVE EL MODELO (26-sep)
  //
  // Hasta hoy el guion llevaba una tabla de 107 ciudades en 5 bandas y el modelo
  // leía la fila y sumaba. `cotizar()` —probado y correcto— no se llamaba nunca.
  //
  // Ahora: el código resuelve destino y cantidad, calcula, y le pasa al modelo
  // los números ya validados. El modelo pone la explicación comercial.
  // ==========================================================================
  // ⚠️ Destino y cantidad se resuelven contra TODO el hilo, no contra una ventana
  // de dos mensajes. La revisión del 26-sep encontró que la cantidad se perdía:
  // después de "quiero dos conjuntos", la ciudad y la talla la devolvían a una
  // unidad. Las dos funciones viven en cotizacion.js para que las pruebas
  // recorran exactamente este camino y no una versión de laboratorio.
  const previa = store.leerCotizacion(phone);

  let destino = cotizacion.destinoDelHilo(conv, userText);
  // La cantidad se lee distinto según el producto: la del impermeable cuenta
  // tallas ("una S y una XL" son dos conjuntos), y el V10 no tiene tallas. Ver
  // `cantidadDelProducto`.
  const cantidad = cantidadDelProducto(productoId, conv, userText, previa);
  // ==========================================================================
  // 🔴 A QUIEN YA COMPRÓ NO SE LE VUELVE A PEDIR LA CIUDAD
  //
  // Lo encontré probando la compra adicional de Heber: pidió "quiero otros dos para
  // mi hermano" y el sistema no tenía destino —su ciudad estaba en el PEDIDO de dos
  // días antes, no en los mensajes recientes—, así que no se podía cotizar y la
  // venta adicional no se podía cerrar.
  //
  // 🔑 El pedido confirmado anterior sirve como CONTEXTO del destino: es donde el
  // cliente pidió que le llegara la vez pasada. Volver a preguntarle la ciudad a
  // quien ya compró es empezar la venta de cero.
  //
  // ⚠️ CORRECCIÓN A LO QUE DECÍA ESTE COMENTARIO. Antes afirmaba que era "evidencia
  // fuerte porque ya se le despachó ahí", y eso el código NO lo garantiza: el filtro
  // toma pedidos confirmados sin exigir guía ni despacho. Puede no haberse
  // despachado nunca. Es un default razonable, no una entrega comprobada.
  //
  // ⚠️ Y NO se hereda cuando el turno nombra a OTRO destinatario. Que el comprador
  // viva en San Martín no dice nada de dónde vive su hermano, y heredar la ciudad
  // ahí sería despachar una compra adicional a una ciudad prestada. En ese caso se
  // deja sin destino y el bot pregunta —que desde #168 es preguntar, no escalar—.
  //
  // ⚠️ Solo cuando NO hay destino (`no_hay`). Si la lectura es ambigua —varias
  // ciudades, o duda entre el dato y el destino— se sigue preguntando.
  // ==========================================================================
  if (!destino.ciudad && destino.origen === "no_hay") {
    const paraOtro =
      posventa.mencionaOtroDestinatario(userText) ||
      posventa.mencionoOtroDestinatarioReciente(conv.messages);
    const conCiudad = store
      .todosLosPedidos()
      .filter((p) => p && p.telefono_chat === phone && !p.anulado && !p.sin_confirmar && p.ciudad);
    const ultimo = conCiudad[conCiudad.length - 1];
    if (ultimo && !paraOtro) {
      destino = { ciudad: String(ultimo.ciudad), varias: [], origen: "ciudad_de_su_pedido_anterior" };
      console.log(
        `🏠 ${phone} ya había comprado: se usa la ciudad de su pedido anterior ` +
          `("${ultimo.ciudad}") como destino de contexto en vez de volver a preguntársela.`
      );
    } else if (ultimo && paraOtro) {
      console.log(
        `🙋 ${phone} nombra a otro destinatario: NO se hereda la ciudad de su pedido ` +
          `anterior ("${ultimo.ciudad}"). Se le pregunta a dónde va este envío.`
      );
    }
  }

  // 🎯 Si el cliente retrocedió de dos a una por precio, la cotización conserva el
  // combo de dos al precio autorizado para poder ofrecerlo UNA vez. Ver el caso
  // Jorge en `comboDeRescateDe`.
  const retrocedio = cotizacion.retrocedioDeDosAUno(previa && previa.uds, userText);
  let cot = cotizacion.calcular(destino.ciudad, userText, {
    cantidad,
    ofrecerComboDeRescate: retrocedio,
    producto: productoId,
  });
  // 🏷️ La cotización guardada es la que trae `oferta_id`: un identificador que
  // PERSISTE mientras las condiciones no cambien, en vez de nacer en cada mensaje.
  if (cot.ok) cot = store.guardarCotizacion(phone, cot);
  // 🔑 La objeción de precio ahora también se detecta por CONTEXTO: si el cliente
  // venía por dos y retrocedió a una después de ver el total, eso es una objeción
  // aunque no use ninguna palabra de la lista. Es el caso de Jorge (27-sep), donde
  // el rescate del combo existía y nunca se ofreció. Ver `retrocedioDeDosAUno`.
  const objecionDePrecio = cotizacion.hayObjecionDePrecio(conv.messages, {
    previaUds: previa && previa.uds,
    userText,
  });
  // ⚠️ `messages` viaja en el contexto porque `verificarPedido` necesita el hilo
  // para resolver el destino cuando la conversación ya estableció que dos
  // escrituras son el mismo sitio (typo corregido, corregimiento). Ver
  // `elHiloResolvioElDestino`.
  // ⚠️ UNA SOLA VEZ: si el bot ya dijo ese número en el hilo, el rescate deja de
  // estar autorizado. El dueño lo pidió explícito: no se regatea en bucle.
  const rescateYaOfrecido =
    Boolean(cot.comboDeRescate) &&
    cotizacion.yaSeOfrecioElRescate(conv.messages, cot.comboDeRescate.rescate);
  const contextoPrecio = {
    objecionDePrecio,
    messages: conv.messages,
    rescateYaOfrecido,
    // 🔑 El producto viaja en el contexto y no solo en la cotización, porque el
    // validador lo necesita incluso cuando NO hay cotización: el primer mensaje del
    // anuncio dice "$99.900 + envío" antes de saber la ciudad, y sin esto el
    // validador borraría ese precio por no estar autorizado.
    producto: productoId,
    // El texto del turno, para que el bloque de datos pueda distinguir una pregunta
    // informativa de una señal de compra. Ver `notaDelTurnoV10`.
    userText,
  };
  if (cot.comboDeRescate && objecionDePrecio && !rescateYaOfrecido) {
    console.log(
      `🎯 RESCATE DEL COMBO autorizado para ${phone}: venía por 2, volvió a 1 por precio. ` +
        `Se ofrece UNA vez los dos por $${cot.comboDeRescate.rescate} en ${cot.ciudad}.`
    );
  }

  let reply;
  let validacion = null;
  // ==========================================================================
  // 🙋 UN SOLO CAMINO PARA MANDAR UN CHAT A UN HUMANO
  //
  // Las entregas 1 y 2 llegaron cada una con su mecanismo: la 1 tenía un
  // `forzarHumano` para el pedido que no cuadra, y la 2 un `revisionHumana` para
  // la promesa sin respaldo. Al juntarlas se unificaron en este, y no por
  // prolijidad: el de la entrega 1 solo pausaba el chat, y una pausa NO AVISA a
  // nadie. Con los dos por el mismo camino, los dos casos le llegan al dueño.
  //
  // Queda distinto de null → el chat se pausa Y se manda el aviso desde server.js.
  // ==========================================================================
  let revisionHumana = null;
  if (!TIENE_IA) {
    reply =
      "¡Hola! 🏍️ Gracias por escribir a BikerPro. (Bot en modo prueba: falta configurar la API de IA). " +
      "El conjunto impermeable de 4 piezas cuesta $59.900 con pago contraentrega 📦";
  } else {
    // ========================================================================
    // ========================================================================
    // 🔑 ETAPA 5: SE REVISA EL MENSAJE ANTES DE QUE SALGA
    //
    // Sin esto, pasarle los números al modelo sigue siendo una instrucción — y
    // este proyecto ya aprendió cinco veces que una instrucción no es un candado.
    //
    // ⚠️ SE VALIDA EL TEXTO LIMPIO, el que ve el cliente: el bloque ##ORDER##
    // lleva el total adentro y validarlo ahí sería revisar el dato contra sí mismo.
    //
    // ⚠️ Y SI SE REGENERA, LO DE LA VUELTA ANTERIOR SE DESCARTA COMPLETO. El
    // pedido se extrae DESPUÉS de aceptar una respuesta: así un intento fallido
    // no puede guardar un pedido ni disparar un efecto duplicado.
    // ========================================================================

    // ========================================================================
    // 🧩 ACÁ SE JUNTAN LAS TRES ENTREGAS, Y ESTE ES EL ÚNICO LUGAR DONDE PASA
    //
    // El prompt de cada turno se arma en tres capas, en este orden:
    //
    //   1. buildSystemPrompt()      el guion de ventas        (~7.555 tokens)
    //   2. cotizacion.bloqueDeDatos los números ya calculados  (entrega 1)
    //   3. comercial.guionConNota   la nota del turno          (entrega 3, apagada
    //                                                          por defecto)
    //
    // 🔑 Y el ORDEN IMPORTA: la nota comercial va ÚLTIMA. Si fuera antes del bloque
    // de precio, el "usá estos números tal cual" quedaría enterrado en el medio del
    // prompt, y lo que no puede fallar es el precio.
    //
    // 📏 El techo de 9.000 tokens se mide sobre el prompt COMPLETO, con las tres
    // capas puestas — no solo sobre el guion. Medirlo sin el bloque de precio era
    // medir otra cosa.
    //
    // 🔗 Y la cotización le PASA datos a la nota: si el destino es de difícil
    // acceso, `comboEncaja` se entera por acá y no tiene que adivinarlo.
    //
    // 🔘 La capa 3 ARRANCA APAGADA: se prende con NOTA_COMERCIAL=1 y se apaga
    // volviéndola a 0, sin desplegar nada. Las capas 1 y 2 van siempre, porque no
    // son una mejora a medir: son el precio, y el precio no puede fallar.
    // ========================================================================
    const guionConPrecio =
      buildSystemPrompt(productoId) + "\n\n" + cotizacion.bloqueDeDatos(cot, contextoPrecio);
    const conNota = comercial.guionConNota(guionConPrecio, conv.messages, userText, {
      sinPromo2: Boolean(
        cot.sinPromo2 || (cot.destino && cot.destino.sinPromo2) || cot.motivo === "dificil_sin_promo"
      ),
      yaConocidos: { ciudad: cot.ok ? cot.ciudad : "" },
    });
    if (conNota.nota && !conNota.cupo) {
      // 🔴 La red de seguridad saltó: la nota está prendida pero no cabe. Se avisa
      // fuerte en vez de apagarla en silencio, porque si esto pasa hay que
      // recortar el guion, no resignarse.
      console.warn(
        `🔴 NOTA COMERCIAL OMITIDA POR TAMAÑO: el prompt completo da ${conNota.tokens} tokens y el ` +
          `techo es ${comercial.TECHO_TOKENS}. La nota está ACTIVA pero no cabe: hay que recortar el guion.`
      );
    }
    const guion = conNota.prompt;

    const MAX_INTENTOS = 2;
    for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
      let candidata;
      try {
        candidata = await callIA(guion, conv.messages);
      } catch (e) {
        console.error("Error IA:", e.message);
        reply =
          "Perdón, se me cruzó la señal un momento 🙏 ¿Me repites lo último, por favor? Con gusto sigo con tu pedido 🏍️";
        validacion = null;
        break;
      }
      // Se valida solo la parte visible: sin marcadores ni bloque de pedido.
      const soloTexto = extractMedia(extractOrder(candidata.replace(/##HANDOFF##/g, "")).clean).clean;
      validacion = cotizacion.validarRespuesta(soloTexto, cot, contextoPrecio);
      reply = candidata;
      if (validacion.ok) break;

      console.warn(
        `⚠️  Respuesta con importes no validados (intento ${intento}/${MAX_INTENTOS}) para ${phone}: ` +
          validacion.problemas.map((p) => p.detalle).join(" · ")
      );
    }

    // ========================================================================
    // 🔴 EL CANDADO SE QUEDA, PERO NO PUEDE DEJAR AL CLIENTE ATRAPADO
    //
    // LO QUE PASÓ EL 26-SEP: el cliente pidió dos conjuntos enumerando tallas, el
    // código leyó uno, y cada vez que el modelo intentaba cotizar los dos la
    // etapa 5 le rechazaba la respuesta. Resultado: **la misma línea de precio de
    // UNA unidad salió cuatro veces**, contra cuatro preguntas distintas — cómo
    // son las tallas, la oficina, el teléfono, la talla otra vez. El cliente
    // preguntaba una cosa y recibía un precio.
    //
    // 🔑 El candado hizo su trabajo: evitó que saliera un número mal. El error fue
    // el reemplazo: contestar con un PRECIO a quien no preguntó por el precio, y
    // repetirlo. Ahora:
    //
    //   · si el cliente no preguntó por precio → no se le contesta con un precio
    //   · si la misma línea ya salió en el turno anterior → NO se repite: se
    //     escala a un humano, porque el bot está en un bucle que no va a resolver
    // ========================================================================
    if (validacion && !validacion.ok) {
      const ultimaDelBot =
        [...conv.messages].reverse().find((m) => m && m.role === "assistant")?.content || "";
      const lineaCalculada = cot.ok ? cotizacion.lineaDePrecio(cot) : "";
      const yaSalioEstaLinea = Boolean(lineaCalculada) && String(ultimaDelBot).trim() === lineaCalculada.trim();
      // ⚠️ "Esperar un precio" no es solo preguntarlo con palabras. Cuando el
      // cliente contesta la CIUDAD está pidiendo el total: es el paso siguiente del
      // flujo. Sin esto, la respuesta correcta —la línea de precio— se cambiaba por
      // un "dame un momento" justo en el turno donde el precio es lo que toca.
      const preguntoPorPrecio =
        cotizacion.hayObjecionDePrecio([{ role: "user", content: userText }]) ||
        /\b(precio|vale|cuesta|cu[aá]nto|total|env[ií]o|domicilio)\b/i.test(String(userText || ""));
      const contestoLaCiudad =
        cotizacion.ciudadesEn(String(userText || "")).length > 0 ||
        cotizacion.botPidioCiudad(conv.messages);
      const esperaUnPrecio = preguntoPorPrecio || contestoLaCiudad;

      // ======================================================================
      // ✂️ PRIMERO SE INTENTA SALVAR LA RESPUESTA, no reemplazarla
      //
      // Casi siempre el problema es UNA frase con un número mal, y el resto del
      // mensaje contesta bien lo que el cliente preguntó. Se quita esa parte y se
      // conserva lo demás; si hacía falta un precio, se le pega el calculado.
      //
      // 🔑 Y no se escala: la conversación queda resuelta. Mandar a un humano cada
      // vez que aparece un número mal deja al cliente esperando por algo que el
      // propio texto ya contestaba.
      // ======================================================================
      const depurado = cot.ok ? cotizacion.depurarImportes(reply, cot, contextoPrecio) : { texto: "" };
      // ⚠️ El umbral estaba en 40 caracteres y tiraba respuestas útiles: "Las tallas
      // van de S a 3XL." son 26 y contesta perfecto la pregunta. Se pide que quede
      // una frase de verdad (4 palabras), no una longitud arbitraria.
      const palabrasQueQuedan = depurado.texto.split(/\s+/).filter(Boolean).length;
      const seSalva =
        palabrasQueQuedan >= 4 &&
        depurado.texto.length >= 20 &&
        cotizacion.validarRespuesta(depurado.texto, cot, contextoPrecio).ok;

      // ======================================================================
      // 🔴 UN RESUMEN QUE PIDE CONFIRMAR NO PUEDE SALIR SIN EL TOTAL
      //
      // DEL CASO 26-SEP 13:16: al cliente le llegó el cuadro con sus datos, con
      // "TOTAL a pagar al recibir" SIN cifra, y pidiéndole «SÍ CONFIRMO». El
      // rescate por depuración le había arrancado el importe a la línea del total
      // y el resto del cuadro volvía a validar, porque ya no quedaba ningún número
      // que contradecir.
      //
      // 🔑 Acá se corta antes: si el mensaje pide confirmar y no hay cotización
      // válida, se le dice QUÉ falta. Si la hay, se manda la línea de precio
      // calculada, que sí trae el total. Lo que no puede pasar es pedirle a alguien
      // que confirme un pedido sin decirle cuánto paga.
      // ======================================================================
      // ⚠️ Y NO alcanza con mirar si la depuración "se salva": probándolo salió que
      // `depurarImportes` le quitaba al cuadro el encabezado y el «SÍ CONFIRMO»
      // —porque son las partes que no validan— y dejaba pasar el resto: una lista
      // de datos del cliente terminada en "TOTAL a pagar al recibir", sin monto y
      // sin total en ninguna parte. Ya no pedía confirmar, pero seguía sin decirle
      // cuánto paga.
      //
      // 🔑 Un cuadro no se arregla por pedazos. Si el mensaje pedía confirmar y lo
      // depurado ya no pide confirmar —o sea, la depuración lo desarmó— se reemplaza
      // completo. Solo se conserva la depuración cuando lo que queda SIGUE siendo un
      // cuadro válido, que es el caso de un número suelto mal en otra frase.
      const pediaConfirmar = cotizacion.pideConfirmacion(reply);
      const laDepuracionLoDesarmo = !(seSalva && cotizacion.pideConfirmacion(depurado.texto));
      if (pediaConfirmar && laDepuracionLoDesarmo) {
        if (!cot.ok) {
          reply = cotizacion.faltaParaConfirmar(cot);
          console.warn(
            `🧾 Se pedía confirmar sin cotización válida para ${phone} (${cot.motivo}): se aclara ` +
              "lo que falta en vez de mandar el cuadro sin total."
          );
        } else {
          reply =
            `${lineaCalculada}\n\n¿Te parece bien y lo despacho? Confírmame y seguimos 🏍️`;
          console.warn(
            `🧾 El cuadro iba a salir sin el total para ${phone}: se reemplaza por la línea de ` +
              "precio calculada, que sí lo trae."
          );
        }
      } else if (seSalva) {
        reply = esperaUnPrecio ? `${depurado.texto}\n\n${lineaCalculada}` : depurado.texto;
        console.log(
          `✂️  RESPUESTA DEPURADA para ${phone}: se quitó ${JSON.stringify(depurado.quitadas)} y se ` +
            "conservó el resto. No se escala: la conversación sigue."
        );
      } else if (!cot.ok) {
        // ====================================================================
        // 🔴 FALTAR LA CIUDAD NO ES ALGO QUE UN HUMANO TENGA QUE VERIFICAR
        //
        // DEL CASO DEL 26-SEP: el cliente preguntó el precio, el código no tenía
        // destino, y salió "déjame confirmar el envío" + chat a un humano. Dos
        // horas y media después volvió a preguntar y recibió exactamente lo mismo.
        //
        // 🔑 Si lo único que falta es la ciudad, el bot la PREGUNTA. Mandar el chat
        // a una persona por un dato que el propio bot puede pedir es dejar al
        // cliente esperando por nada. Se escala solo lo que de verdad necesita a
        // alguien: un destino sin tarifa medida, o un total que no se pudo calcular.
        // ====================================================================
        const soloFaltaLaCiudad = cot.motivo === "sin_destino" || cot.motivo === "varios_destinos";
        if (soloFaltaLaCiudad) {
          reply =
            cot.motivo === "varios_destinos"
              ? "Para darte el total exacto, ¿a cuál de esas ciudades sería el envío? 📦"
              : "¡Con gusto te doy el total! ¿Para qué ciudad sería el envío? 📦";
          console.log(
            `📍 Sin destino para ${phone} (${cot.motivo}): se PREGUNTA la ciudad en vez de escalar.`
          );
        } else {
          reply = "Dejame confirmarte bien el valor del envío a tu ciudad y te escribo en un momento 📦";
          console.warn(`🔧 Sin cotización válida para ${phone} (${cot.motivo}): se escala.`);
          revisionHumana = { motivo: "sin_cotizacion", detalle: String(cot.motivo || "") };
        }
      } else if (yaSalioEstaLinea) {
        // 🔁 Segunda vez seguida: el bot no está avanzando. Se corta el bucle.
        reply =
          "Dejame revisarlo bien para no darte un dato equivocado 🙏 Te escribo en unos minutos con " +
          "la confirmación.";
        console.warn(
          `🔁 BUCLE CORTADO para ${phone}: la línea de precio ya había salido en el turno anterior. ` +
            "Se escala a un humano en vez de repetirla."
        );
        revisionHumana = {
          motivo: "bucle_de_precio",
          detalle:
            "la misma línea de precio se iba a repetir. El modelo no logra una respuesta válida: " +
            (validacion.problemas || []).map((p) => p.detalle).join(" · "),
        };
      } else if (esperaUnPrecio) {
        reply = lineaCalculada;
        console.warn(`🔧 Se reemplazó la respuesta por la línea de precio calculada para ${phone}.`);
      } else {
        // 🔑 Preguntó otra cosa: no se le contesta con un precio.
        reply =
          "Con gusto te confirmo eso 🙌 Dame un momento para revisarlo y te escribo enseguida.";
        console.warn(
          `🔧 Respuesta no validada para ${phone} y el cliente NO preguntó por precio: ` +
            "se escala en vez de contestarle con la línea de precio."
        );
        revisionHumana = {
          motivo: "respuesta_no_validada",
          detalle: (validacion.problemas || []).map((p) => p.detalle).join(" · "),
        };
      }
    }
  }

  // ==========================================================================
  // 🔴 CANDADO: SIN CELULAR NO HAY DESPACHO
  //
  // El guion ya pedía el celular y ya tenía la regla de quitarle el "57". Pero
  // las dos daban por hecho que el teléfono SIEMPRE llega — y la de quitar el
  // 57 existe precisamente porque se copiaba del número del chat.
  //
  // Eso se rompió: los clientes con username de WhatsApp NO tienen número de
  // chat. Si la IA no pidió el celular, no hay de dónde sacarlo, y un pedido sin
  // teléfono NO SE PUEDE DESPACHAR: la transportadora lo exige para la guía.
  //
  // Y esto va acá, en código, no solo en el prompt. Hoy ya aprendimos que una
  // instrucción al modelo no es un candado: el bloque ##ORDER## se emitía dos
  // veces aunque el prompt dijera que no. Lo que no puede fallar, se blinda.
  // ==========================================================================
  const handoff = reply.includes("##HANDOFF##");
  reply = reply.replace(/##HANDOFF##/g, "").trim();

  const orderRes = extractOrder(reply);
  reply = orderRes.clean;
  let order = orderRes.order;
  // true = el bloque venía cortado y se reconstruyó campo por campo. Puede
  // faltarle algo, así que el aviso al dueño tiene que decirlo.
  const pedidoRescatado = orderRes.rescatado;

  // ==========================================================================
  // 📦 ¿QUÉ ESTÁ HACIENDO EL CLIENTE EN ESTE TURNO?
  //
  // Del caso Heber: con un pedido confirmado, "si mandaron el pedido gracias" se
  // leyó como una confirmación de compra y nació un segundo pedido. Acá se decide
  // primero la INTENCIÓN, y más abajo esa decisión frena el pedido.
  //
  // ⚠️ `botPidioConfirmacion` mira el último mensaje del bot ANTES de este turno:
  // si el bot acaba de mandar un cuadro, un "listo" contesta ese cuadro y el turno
  // NO es posventa. Sin esto, una compra adicional no se podría confirmar nunca.
  // ==========================================================================
  const pedidosDelCliente = store
    .todosLosPedidos()
    .filter((p) => p && p.telefono_chat === phone && !p.anulado && !p.sin_confirmar);
  const ultimaDelBotAntes =
    [...conv.messages].reverse().find((m) => m && m.role === "assistant")?.content || "";
  const intencion = posventa.intencionDelTurno(userText, {
    tienePedidoConfirmado: pedidosDelCliente.length > 0,
    botPidioConfirmacion: cotizacion.pideConfirmacion(ultimaDelBotAntes),
  });

  // ==========================================================================
  // 🛟 SOPORTE DE POSVENTA: SE MARCA LA CONVERSACIÓN — 30-sep
  //
  // Pedido del dueño: que los casos de garantía, cambio, o "ya compré y necesito
  // ayuda" se distingan con su propia categoría para atenderlos aparte.
  //
  // 🔑 SE MARCA ACÁ, NO SOLO EN EL PANEL. El panel también lo detecta leyendo el
  // texto, pero `messages` se rota: sin esta marca el caso se borraría de la
  // pantalla cuando el cliente mande unos cuantos mensajes más, estando el
  // problema todavía sin resolver.
  //
  // ⚠️ ESTO NO CAMBIA LO QUE EL BOT RESPONDE. Es a propósito: marcar es seguro,
  // y cambiarle la respuesta a un cliente con un reclamo en curso es una decisión
  // del dueño, no mía. Lo único que hace es que el caso se VEA.
  // ==========================================================================
  const soportePosventa = posventa.necesitaSoporte(userText, {
    compro: Boolean(conv.compro) || pedidosDelCliente.length > 0,
  });
  if (soportePosventa.necesita) {
    store.fijarCategoria(phone, "posventa", soportePosventa.motivo);
  }

  // ==========================================================================
  // 🔴 EL ESTADO LOGÍSTICO NO SE INVENTA (caso Heber)
  //
  // El bot le contestó "tu pedido ya fue procesado y está en manos de la
  // transportadora" cuando NO había ninguna guía registrada. Eso no se puede
  // afirmar por intuición: o hay guía, o no la hay.
  //
  // 🔑 En un turno de posventa la respuesta la escribe el CÓDIGO con el estado real
  // del pedido. Es la única forma de garantizar que no se invente una guía ni una
  // fecha, porque el modelo ya lo hizo una vez.
  // ==========================================================================
  if (intencion.intencion === "posventa" && pedidosDelCliente.length > 0) {
    const elMasNuevo = pedidosDelCliente[pedidosDelCliente.length - 1];
    const estado = posventa.estadoDelPedido(elMasNuevo);
    reply = posventa.respuestaDeEstado(elMasNuevo);
    console.log(
      `📦 POSVENTA de ${phone}: se responde con el estado REAL del pedido (${estado.clave}` +
        `${estado.guia ? `, guía ${estado.guia}` : ", sin guía"}), no con lo que escribió el modelo.`
    );
  }

  const mediaRes = extractMedia(reply);
  reply = mediaRes.clean;

  // ==========================================================================
  // 🚫 PROMESAS QUE EL BOT NO PUEDE RESPALDAR (26-sep)
  //
  // Cuatro casos reportados: afirmó haber actualizado un pedido, dijo conocer el
  // estado del despacho, prometió despacho "hoy mismo", y garantizó cubrir una
  // maleta sin saber sus medidas. Más un "¡Así es!" a "están en Cali", cuando la
  // bodega está en Bogotá.
  //
  // 🔑 El cliente TOMA DECISIONES con eso: confirma creyendo que el teléfono
  // quedó cambiado, o espera el paquete un día que nadie prometió. La novedad, la
  // queja o la devolución las paga el negocio.
  //
  // ⚠️ NO se reescribe ni se borra la respuesta: un detector que deja al cliente
  // sin contestación es peor. Se manda igual y el chat pasa a modo humano, para
  // que el dueño lo vea y corrija antes de que el cliente actúe sobre eso.
  // ==========================================================================
  // 🔧 Se CORRIGE antes de enviar, frase por frase. La revisión del 26-sep señaló
  // —con razón— que mandar el mensaje falso y pausar después no protege a nadie:
  // el cliente ya lo leyó y actúa sobre eso. Ver promesas.js.
  // La ciudad y la referencia del cliente hacen falta para distinguir "oficina de
  // Interrapidísimo en Jamundí" (correcto) de prometer una sede concreta.
  const ctxPromesas = {
    ciudad: cot.ok ? cot.ciudad : "",
    referencia: sedeEspecificaEn(userText, cot.ok ? cot.ciudad : ""),
  };
  const chequeoPromesas = promesas.revisar(reply, ctxPromesas);
  if (!chequeoPromesas.ok) {
    const corregido = promesas.corregir(reply, ctxPromesas);
    if (corregido.cambios.length) {
      console.warn(
        `🔧 PROMESA SIN RESPALDO de ${phone}: ` +
          corregido.cambios
            .map((c) => `${c.clave} · "${c.antes}" → ${c.despues === null ? `(sin reemplazo: ${c.sinReemplazo})` : `"${c.despues}"`}`)
            .join(" | ")
      );
      reply = corregido.texto;
      revisionHumana = {
        motivo: "promesa_sin_respaldo",
        detalle: corregido.cambios.map((c) => `${c.clave}: "${c.antes}"`).join(" · "),
      };
    } else {
      console.warn(
        `⚠️  PROMESA SIN RESPALDO SIN REEMPLAZO de ${phone}: ${promesas.resumir(chequeoPromesas)}`
      );
      revisionHumana = { motivo: "promesa_sin_respaldo", detalle: promesas.resumir(chequeoPromesas) };
    }
  }

  // ==========================================================================
  // 🔒 RECONCILIACIÓN FINAL: LO QUE SALE TIENE QUE PASAR LAS DOS VALIDACIONES
  //
  // 🔴 DE DÓNDE SALE (revisión 26-sep): corregir una promesa es una TRANSFORMACIÓN
  // DE TEXTO, y una transformación de texto puede romper el precio. El caso
  // reportado partía "$82.000" en dos y dejaba "según la ciudad.000".
  //
  // `promesas.corregir` ya tiene su propio candado de importes, pero acá se revisa
  // el resultado FINAL contra las dos validaciones, después de TODAS las
  // transformaciones del turno. Es el último punto donde se puede mirar lo que el
  // cliente va a leer de verdad.
  //
  // Si algo no cuadra —el precio quedó mal, o la promesa no se pudo aislar del
  // importe— NO se manda eso: sale la línea escrita por el código, que dice el
  // precio correcto y no promete nada. El cliente igual recibe respuesta.
  // ==========================================================================
  {
    const visible = extractMedia(extractOrder(reply).clean).clean;
    const precioFinal = cotizacion.validarRespuesta(visible, cot, contextoPrecio);
    const promesaFinal = promesas.revisar(visible, ctxPromesas);
    if (!precioFinal.ok || !promesaFinal.ok) {
      const porQue = [
        !precioFinal.ok ? `precio: ${precioFinal.problemas.map((p) => p.detalle).join(" · ")}` : "",
        !promesaFinal.ok ? `promesa: ${promesas.resumir(promesaFinal)}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
      console.warn(`🔒 RESPUESTA FINAL RECHAZADA para ${phone}: ${porQue}`);
      reply = cot.ok
        ? cotizacion.lineaDePrecio(cot)
        : "Dejame confirmarte bien el valor del envío a tu ciudad y te escribo en un momento 📦";
      revisionHumana = { motivo: "respuesta_final_rechazada", detalle: porQue };
    }
  }
  // Combina lo que pidió la IA (marcadores) con la detección por palabras clave del cliente
  // 📸 Las fotos del producto de ESTE hilo, y solo las que existen de verdad.
  //
  // `soloDisponibles` es la red que evita el error del 21-sep (todas las fotos
  // daban 404 y nadie se enteraba) y el de hoy (mandar la foto de otro producto
  // porque la del correcto no está subida todavía).
  const media = mediaDisponible(
    Array.from(new Set([...mediaRes.keys, ...detectMediaIntent(userText, productoId)]))
  );

  // ==========================================================================
  // 📊 LA CUENTA DE LO COMERCIAL — esto es lo que hace la mejora medible
  //
  // ⚠️ NO bloquea, NO reescribe y NO pausa el chat. Una mejora comercial que deja
  // al cliente esperando no es una mejora: acá lo peor que puede pasar es que el
  // mensaje salga menos bien, y eso no se arregla con silencio.
  //
  // Solo deja un renglón con prefijo estable por cada cosa que no se cumplió, para
  // poder contarlas y saber después si esto sirvió de algo. Sin la cuenta, "mejora
  // comercial" es una opinión.
  // ==========================================================================
  const chequeoComercial = comercial.revisar(reply, { userText, messages: conv.messages });
  if (!chequeoComercial.ok) {
    console.log(`📊 COMERCIAL ${phone}: ${comercial.resumir(chequeoComercial)}`);
  }

  let savedOrder = null;
  if (order) {
    // ========================================================================
    // 🔴 CANDADO CERO: SIN "SÍ CONFIRMO" NO HAY VENTA.
    //
    // El 23-sep quedó guardado como pedido un cliente que había dicho "No
    // confirmo". El modelo emitió el bloque junto con el cuadro, antes de que el
    // cliente contestara. Un pedido así no es un número mal contado: si se
    // despacha por el panel, sale un paquete para alguien que dijo que no.
    //
    // Va ANTES de los otros candados porque si no hay venta, lo demás no importa.
    // ========================================================================
    // ========================================================================
    // 🔴 CANDADO DE POSVENTA — PREGUNTAR POR UN PEDIDO NO ES COMPRAR OTRO
    //
    // Caso Heber (27-sep): con un pedido confirmado dos días antes, escribió "si
    // mandaron el pedido gracias" y apareció otro pedido por los mismos $155.000.
    //
    // 🔑 Va ANTES que todo lo demás: si el turno es posventa, de acá no puede
    // nacer una venta, aunque el modelo haya emitido el bloque. Ver posventa.js.
    //
    // ⚠️ Y NO bloquea una compra real: `intencionDelTurno` devuelve
    // `compra_adicional` en cuanto el cliente lo pide explícitamente, y si el bot
    // acaba de mandar un cuadro el turno se trata como normal para que la segunda
    // compra se pueda confirmar.
    // ========================================================================
    if (intencion.intencion === "posventa") {
      console.warn(
        `📦 POSVENTA de ${phone} (${intencion.motivo}): se DESCARTA el pedido que emitió el ` +
          `modelo ($${order.total || "?"}). Ya tiene un pedido confirmado; esto no es una venta nueva.`
      );
      order = null;
    }

    const conf = order ? revisarConfirmacion(order, store.getConv(phone).messages, reply) : null;

    // ========================================================================
    // 🔴 MODIFICAR UN PEDIDO CONFIRMADO NO CREA UN PEDIDO FANTASMA
    //
    // Caso Jorge (27-sep). Tenía 1 unidad confirmada en Cali ($82.000). Preguntó
    // por la promo de dos, el bot cotizó $155.000, y él contestó:
    //
    //   "Pensé que era un solo envio doble no entonces si haci como estamos solo 1"
    //
    // O sea: RECHAZÓ el cambio y se quedó con su pedido de una. Igual apareció un
    // segundo registro de 2 unidades por $155.000, sin ciudad ni datos completos.
    //
    // 🔎 CAUSA: esa frase no la clasifica ni como "sí" ni como "no", así que queda
    // en `no-se-sabe` → `guardar:true, marcar:true`. El pedido se guardaba marcado,
    // y eso es justamente el fantasma.
    //
    // 🔑 REGLA TRANSACCIONAL: si ya hay un pedido confirmado y llega uno que cambia
    // la cantidad o el total, eso es una MODIFICACIÓN. Una modificación no existe
    // hasta que el cliente vea el resumen nuevo y lo confirme. Sin ese "sí":
    //   · no se guarda nada, y
    //   · el pedido original queda exactamente como estaba.
    //
    // ⚠️ Con el "sí" sí se guarda, y queda VINCULADA al pedido que reemplaza
    // (`modifica_a`), para que no parezca un duplicado misterioso.
    //
    // ⚠️ Y esto no toca la compra ADICIONAL: si el cliente la pidió explícitamente,
    // `intencion` ya dijo `compra_adicional` y son dos pedidos distintos.
    // ========================================================================
    const confirmadoPrevio = pedidosDelCliente[pedidosDelCliente.length - 1] || null;
    let modificaA = "";
    if (order && confirmadoPrevio && intencion.intencion !== "compra_adicional") {
      const cambiaLaOferta =
        Number(order.total) !== Number(confirmadoPrevio.total) ||
        cotizacion.unidadesDelPedido(order).uds !==
          cotizacion.unidadesDelPedido(confirmadoPrevio).uds;
      if (cambiaLaOferta) {
        // ⚠️ El estado confirmado se llama "confirmado", no "si". Lo comprobé al
        // revés: con la comparación equivocada, la modificación de Johana —que ella
        // SÍ había confirmado sobre el cuadro nuevo— se descartaba. Se usa además
        // `guardar && !marcar`, que es la condición real de "el candado está
        // satisfecho", para no depender de una cadena.
        if (conf.estado === "confirmado" || (conf.guardar && !conf.marcar)) {
          modificaA = String(confirmadoPrevio.id || confirmadoPrevio.fecha || "");
          console.log(
            `🔁 MODIFICACIÓN CONFIRMADA de ${phone}: ${confirmadoPrevio.total} → ${order.total}. ` +
              `Queda vinculada al pedido anterior (${modificaA}).`
          );
        } else {
          console.warn(
            `🚫 MODIFICACIÓN NO CONFIRMADA de ${phone}: el modelo emitió un pedido de ` +
              `$${order.total} (${cotizacion.unidadesDelPedido(order).uds} uds) contra uno ya ` +
              `confirmado de $${confirmadoPrevio.total}, y el cliente NO lo confirmó ` +
              `(${conf.estado}). NO se guarda: el pedido original se conserva igual.`
          );
          order = null;
        }
      }
    }

    if (!order) {
      // ya se avisó arriba: posventa o modificación sin confirmar
    } else if (!conf.guardar) {
      console.warn(
        `⏭️  PEDIDO NO GUARDADO (${conf.estado}) de ${phone}: ${conf.motivo}. ` +
          `Cliente: ${order.nombre || "?"} · ${order.ciudad || "?"} · $${order.total || "?"}`
      );
    } else {
      // Dos candados más: el celular y la dirección. Los dos son requisitos de la
      // transportadora, y los dos ya se rompieron en producción porque el guion
      // los pedía y el modelo no siempre obedecía.
      const conTelefono = revisarTelefono(order, phone);
      const conDireccion = revisarDireccionDePedido({ ...conTelefono, telefono_chat: phone });

      // 🏢 ¿Pidió una SEDE concreta? Se conserva su preferencia tal como la dijo y
      // se marca para aclarársela. La oficina la asigna la transportadora, así que
      // prometerle una sede sería prometer algo que no controlamos — y cambiarle la
      // preferencia en silencio sería peor. Ver direccion.js.
      const sedeNombrada =
        conDireccion.entrega === "oficina"
          ? sedeEspecificaEn(conDireccion.direccion, conDireccion.ciudad)
          : "";
      if (sedeNombrada) {
        // ======================================================================
        // 🔑 Nombrar un punto NO frena el pedido: casi siempre es la REFERENCIA de
        // la zona del cliente. Solo se pide aclaración si lo EXIGE de forma
        // excluyente, porque esa sede no se la podemos prometer.
        //
        // 🔴 Y la exigencia tiene que ser SOBRE EL LUGAR. Antes se buscaba un "solo"
        // en cualquier mensaje del historial, así que "Solo la talla L" dicho veinte
        // mensajes antes frenaba el pedido. Ahora lo resuelve `estadoDeLaSede`, que
        // ata la exclusividad al lugar y deja ganar la ÚLTIMA señal: si después el
        // cliente acepta la oficina que asignen, la exigencia queda resuelta.
        // ======================================================================
        const estadoSede = estadoDeLaSede(conv.messages, sedeNombrada);
        if (estadoSede.exige) {
          conDireccion.sede_pedida = sedeNombrada;
          console.warn(
            `🏢 EXIGE UNA SEDE por ${phone}: "${sedeNombrada}". Se conserva su preferencia y se marca ` +
              "para aclarar: la oficina de recogida la asigna la transportadora."
          );
        } else {
          conDireccion.sede_referencia = sedeNombrada;
          // Si antes la exigió y después aceptó la que asignen, queda resuelta: el
          // pedido no puede seguir frenado por algo que el cliente ya resolvió.
          if (estadoSede.acepto) conDireccion.sede_resuelta = true;
          console.log(
            `🏢 Referencia de zona de ${phone}: "${sedeNombrada}". El pedido sigue normal; se usa como ` +
              `referencia, no como sede prometida.${estadoSede.acepto ? " El cliente aceptó la oficina que asignen." : ""}`
          );
        }
      }

      // ======================================================================
      // 🧾 ETAPA 6: EL PEDIDO NO PUEDE CONTRADECIR LA COTIZACIÓN
      //
      // Si el total del bloque no es el validado —ni la negociación autorizada—
      // el pedido NO se descarta y NO se confirma como si todo hubiera salido
      // bien: se guarda marcado y fuera del flujo normal de despacho.
      //
      // 🔑 Borrarlo en silencio sería perder una venta real por un número mal
      // escrito. Confirmarlo como bueno sería despachar con el recaudo mal.
      // ======================================================================
      const chequeoPrecio = cotizacion.verificarPedido(conDireccion, cot, contextoPrecio);
      if (!chequeoPrecio.ok) {
        console.warn(
          `🔴 PEDIDO QUE NO CUADRA CON LA COTIZACIÓN (${phone}): ` +
            chequeoPrecio.problemas.map((p) => p.detalle).join(" · ") +
            ". SE GUARDA marcado para revisión, fuera del flujo de despacho."
        );
      }

      // ======================================================================
      // 🔗 EL VÍNCULO CON EL PEDIDO PENDIENTE CONCRETO
      //
      // No alcanza con "hay un pendiente de este cliente": eso emparejó el pedido
      // de un destinatario con el de otro. Acá se le dice a `saveOrder` CUÁL es el
      // pendiente de ESTA oferta, y si el cliente pidió una corrección.
      // ======================================================================
      const contextoPedido = {
        pedidoPendienteId: store.pedidoPendienteDeOferta(phone, cot.oferta_id),
        hayCorreccion: pidioUnaCorreccion(userText),
      };
      savedOrder = store.saveOrder({
        ...conDireccion,
        // ====================================================================
        // 🛒 QUÉ SE VENDIÓ — LO PONE EL CÓDIGO, NO EL MODELO
        //
        // 🔑 DECISIÓN IMPORTANTE: el campo `producto` NO se le pide a la IA en el
        // bloque ##ORDER##. Se escribe acá, desde la misma detección que ya eligió
        // el guion y calculó el precio de este turno.
        //
        // Por dos razones:
        //   1. Este proyecto tiene escrito en cinco lugares que "una instrucción
        //      al modelo no es un candado". El bloque ##ORDER## salía duplicado
        //      aunque el guion lo prohibiera. Si el producto lo dijera el modelo,
        //      un pedido podría quedar registrado como el producto equivocado — y
        //      eso se despacha mal.
        //   2. El guion del impermeable está a 11 tokens de su techo de 9.000.
        //      Agregarle un campo al esquema del pedido lo pasaría.
        //
        // Así que el dato es determinista y no cuesta un solo token.
        // ====================================================================
        producto: productoId,
        producto_nombre: ficha ? ficha.nombre : "",
        ...(modificaA ? { modifica_a: modificaA } : {}),
        // ⚠️ Se mira la conversación reciente y no solo este turno: el cliente pide
        // "quiero otros dos para mi hermano" en un turno y confirma en el siguiente.
        ...(intencion.intencion === "compra_adicional" ||
        posventa.pidioOtraCompraReciente(conv.messages)
          ? { compra_adicional: true }
          : {}),
        ...(conf.marcar ? { sin_confirmar: true, motivo_sin_confirmar: conf.motivo } : {}),
        ...(chequeoPrecio.ok
          ? {}
          : {
              precio_no_cuadra: true,
              pendiente_revision: true,
              motivo_precio: chequeoPrecio.problemas.map((p) => p.detalle).join(" · "),
              total_esperado: chequeoPrecio.totalEsperado,
            }),
        ...(cot.ok
          ? {
              cotizacion_politica: cot.politica,
              cotizacion_total: cot.total,
              cotizacion_banda: cot.banda,
              // 🏷️ Identifica la OFERTA que el cliente confirmó. Es lo que permite
              // saber si un pedido posterior es la confirmación de ésta o algo
              // distinto, en vez de adivinarlo por el total.
              // 🏷️ La IDENTIDAD de la oferta (persiste durante la compra) y la
              // FIRMA de sus condiciones (describe la tarifa). Son dos cosas
              // distintas: la firma se repite entre compras, el id no.
              oferta_id: cot.oferta_id || "",
              condiciones_firma: cot.firma || cotizacion.firmaDeCondiciones(cot),
              // La cantidad cotizada, para poder compararla con la del bloque.
              unidades_cotizadas: cot.uds,
            }
          : {}),
      }, contextoPedido);
      if (conf.marcar) {
        console.warn(
          `⚠️  PEDIDO SIN CONFIRMACIÓN CLARA de ${phone}: ${conf.motivo}. ` +
            "SE GUARDA, pero hay que leer el chat antes de despachar."
        );
      }

      // ======================================================================
      // 🔴 SI EL PEDIDO QUEDÓ EN REVISIÓN, NO SE LE CONFIRMA AL CLIENTE
      //
      // Guardar la marca no alcanza si al cliente ya se le dijo "¡listo, te lo
      // despacho!": queda esperando un paquete a un precio que no podemos
      // sostener. Se reemplaza SOLO la afirmación de cierre —si la hay— por una
      // respuesta que no promete nada y no lo deja sin contestación, y el chat
      // pasa al dueño.
      // ======================================================================
      if (savedOrder && store.requiereRevision(savedOrder) && cotizacion.afirmaCierre(reply)) {
        const motivos = store.textoDeRevision(savedOrder);
        console.warn(
          `🔴 RESPUESTA DE CIERRE REEMPLAZADA (${phone}): el pedido requiere revisión (${motivos}) ` +
            "y el mensaje le confirmaba la venta al cliente. Se manda una respuesta que no promete despacho."
        );
        reply = cotizacion.respuestaEnRevision(savedOrder);
        // 🔑 Avisa, no solo pausa: este caso nacía silencioso en la entrega 1.
        revisionHumana = { motivo: "pedido_en_revision", detalle: motivos };
      }
    }
  }
  // ==========================================================================
  // 🔴 NO SE ANUNCIA UNA VENTA LISTA SI HAY UN PEDIDO EN REVISIÓN
  //
  // Esto corre AUNQUE EN ESTE TURNO NO SE HAYA EMITIDO UN PEDIDO, que es el hueco
  // del caso del 26-sep: el pedido se guardó bloqueado a las 08:08, y a las 08:09
  // —sin ##ORDER## de por medio— el bot le dijo "ya quedó registrado, gracias por
  // tu compra". El candado existía pero solo mirába los turnos con pedido.
  // ==========================================================================
  if (!savedOrder && cotizacion.afirmaCierre(reply)) {
    const bloqueado = store.pedidoEnRevisionDe(phone);
    if (bloqueado) {
      const motivos = store.textoDeRevision(bloqueado);
      console.warn(
        `🔴 CIERRE ANUNCIADO SOBRE UN PEDIDO EN REVISIÓN (${phone}): ${motivos}. ` +
          "Se reemplaza el mensaje: el cliente no puede quedar creyendo que su compra está hecha."
      );
      reply = cotizacion.respuestaEnRevision(bloqueado);
      revisionHumana = { motivo: "cierre_sobre_pedido_en_revision", detalle: motivos };
    }
  }

  // Un pedido en revisión o una promesa corregida mandan el chat a un humano igual
  // que un ##HANDOFF##: el dueño tiene que cerrar esa venta a mano.
  if (handoff || revisionHumana) store.setPaused(phone, true);

  store.pushMsg(phone, "assistant", reply);
  // 🛟 `posventaSoporte` sale para que server.js pueda avisarle al dueño. NO entra
  // en la condición de `setPaused` de arriba: marcar el caso es seguro, callar al
  // bot en medio de un reclamo es una decisión del dueño.
  return {
    reply,
    order: savedOrder,
    handoff,
    media,
    pedidoRescatado,
    revisionHumana,
    posventaSoporte: soportePosventa.necesita ? soportePosventa.motivo : null,
  };
}

// ============================================================================
// 🧭 De dónde salen la ciudad y la cantidad: ver cotizacion.js
//
// `detectarCiudad()` y `textoDelCliente()` vivían acá y se movieron a
// cotizacion.js como `destinoDelHilo()` y `cantidadDelHilo()`.
//
// 🔴 POR QUÉ SE MOVIERON (revisión 26-sep): acá no se podían probar sin levantar
// el bot, y las dos tenían un defecto que ninguna batería veía:
//
//   · `textoDelCliente()` miraba solo los dos últimos mensajes del cliente, así
//     que "quiero dos conjuntos" se perdía en cuanto contestaba ciudad y talla, y
//     el pedido volvía a UNA unidad en silencio.
//   · `detectarCiudad()` solo reconocía ciudades del tarifario, así que
//     "Gachancipá" era invisible y el bot preguntaba la ciudad para siempre.
//
// Ahora las pruebas recorren el mismo camino que este archivo usa.
// ============================================================================

// ============================================================================
// 🔧 ¿EL CLIENTE PIDIÓ UNA CORRECCIÓN?
//
// 🔴 POR QUÉ HACE FALTA (revisión 26-sep): la versión anterior daba por corrección
// cualquier diferencia en los datos de entrega. La reproducción mostró que eso
// también puede ser una SEGUNDA COMPRA para otra persona — y el pedido del primer
// destinatario se perdía.
//
// Así que ahora una actualización necesita respaldo: algo en el mensaje del cliente
// que diga que está corrigiendo. Si no lo hay, no hay nada que corregir y los dos
// pedidos se conservan para revisión.
//
// ⚠️ Deliberadamente conservador: ante la duda devuelve false, y eso lleva a
// conservar los dos registros. Marcar de más cuesta una revisión; marcar de menos
// cuesta una venta.
// ============================================================================
const RE_PIDE_CORRECCION =
  /\b(corrij|correcci[oó]n|correg|me equivoqu|est[aá] mal|no es (esa|ese|esa la|la)|en realidad|mejor (a|en|la|el)\b|c[aá]mbi|cambia[rl]|actualiz|anot[aá]|apunt[aá]|ojo|perd[oó]n|disculp|la direcci[oó]n es|mi direcci[oó]n es|es en la|olvid[eé])/i;

function pidioUnaCorreccion(texto) {
  return RE_PIDE_CORRECCION.test(String(texto == null ? "" : texto));
}

// Identificador de cliente con username (no es un teléfono).
const RE_BSUID_AG = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;

/**
 * Devuelve el celular en el formato que espera la transportadora (10 dígitos
 * que empiezan en 3) o null si no sirve.
 *
 * Acepta que venga con el 57 adelante y lo quita, que era la regla que ya
 * existía en el guion: pasó 8 veces en 4 días y llegaba mal a la transportadora.
 */
function celularValido(c) {
  const d = String(c == null ? "" : c).replace(/\D/g, "");
  const s = d.length > 10 ? d.slice(-10) : d;
  return /^3\d{9}$/.test(s) ? s : null;
}

/**
 * Se asegura de que el pedido tenga un celular usable, y si no lo tiene, lo
 * marca como NO DESPACHABLE en vez de dejarlo pasar en silencio.
 *
 * @param {object} order el pedido que armó la IA
 * @param {string} chatId teléfono del chat, o BSUID si el cliente usa username
 */
function revisarTelefono(order, chatId) {
  const propio = celularValido(order.celular);
  if (propio) return { ...order, celular: propio };

  // No dio celular. Si el chat ES un teléfono, ese sirve: es el número por el
  // que está escribiendo. (Antes esto lo hacía la IA copiándolo, de ahí la
  // regla del "57"; ahora lo hace el código y siempre bien formateado.)
  if (!RE_BSUID_AG.test(String(chatId))) {
    const delChat = celularValido(chatId);
    if (delChat) return { ...order, celular: delChat, celularDelChat: true };
  }

  // No hay teléfono en ninguna parte: cliente con username que no lo dio.
  console.error(
    `🔴 PEDIDO SIN TELÉFONO de ${chatId}: ${order.nombre || "?"} en ${order.ciudad || "?"}. ` +
      "NO SE PUEDE DESPACHAR hasta que dé un celular."
  );
  return { ...order, celular: "", sinTelefono: true, despachable: false };
}

// extractOrder y rescatarPedido se exportan para poder probarlos sin llamar a
// la IA: son el camino por donde se perdían pedidos enteros en silencio.
// callIA se exporta para el extractor de datos del chat (src/extraer.js), que
// necesita hacerle UNA pregunta corta al modelo sin pasar por el guion de ventas
// ni escribirle nada al cliente.
module.exports = { generateReply, pidioUnaCorreccion, revisarTelefono, celularValido, extractOrder, rescatarPedido, callIA };
