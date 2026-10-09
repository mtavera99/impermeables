// ============================================================================
// 💸 PAGO ANTICIPADO: EL COMPROBANTE Y SU RASTRO
//
// EL CASO REAL (8-oct, cliente Wilmer). Un cliente eligió pago anticipado,
// transfirió, y mandó la CAPTURA del comprobante por el chat a las 8 de la
// mañana. El bot le contestó:
//
//     "Recibí tu mensaje 🙌 Todavía no puedo abrir ese tipo de archivo.
//      ¿Me contás por escrito qué necesitás?"
//
// Y ahí murió. Nadie se enteró, el pedido no se despachó, y el cliente apareció
// un día después por INSTAGRAM —otro canal— preguntando por su guía y mandando
// las capturas otra vez. El dueño tuvo que reconstruir todo a mano.
//
// 🔴 LO GRAVE NO ERA LA RESPUESTA, ERA EL `continue`. La rama de tipos no
// soportados en server.js cortaba el turno: el mensaje del cliente NO se
// guardaba en el historial, así que no existía ni en el panel, ni en el embudo,
// ni en el puntaje de "este chat necesita atención". Un cliente que YA PAGÓ
// quedaba invisible para todo el sistema. No se sabe cuántos pedidos se
// perdieron así, y eso es justamente el problema: no hay forma de saberlo.
//
// 🔑 Y la contradicción de fondo: prompt.js le DICE al cliente "envía el
// comprobante de pago por este chat". El bot pedía exactamente el único tipo de
// archivo que era incapaz de recibir.
//
// QUÉ HACE ESTE MÓDULO
//   1. Reconoce por texto cuándo alguien ANUNCIA que va a pagar anticipado
//      (para marcar el chat y estar pendiente) y cuándo dice que YA PAGÓ.
//   2. Baja la imagen de WhatsApp y la lee con Gemini para sacar banco, monto,
//      fecha y referencia. Así el aviso al dueño llega con los datos puestos y
//      él solo tiene que mirar si la plata entró.
//
// ⚠️ LEER LA IMAGEN ES UN LUJO, NO EL MECANISMO. Si no hay Gemini, si la cuota
// se agotó o si la captura está ilegible, el aviso al dueño SE MANDA IGUAL con
// lo que haya. El valor está en enterarse, no en el OCR. Esa es la lección del
// caso: el bot falló porque se calló, no porque no supiera leer.
// ============================================================================

const audio = require("./audio");

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

// Una captura de pantalla de Nequi o Bancolombia no pesa más que esto. El tope
// protege la cuota y evita que una imagen enorme cuelgue el webhook.
const MAX_BYTES = 8 * 1024 * 1024;

/** Mimes de imagen que Gemini acepta tal cual. */
const MIMES_IMAGEN = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];

// ============================================================================
// 1. DETECCIÓN POR TEXTO
// ============================================================================

// 🔑 "VOY A PAGAR ANTICIPADO" — esto es lo que el dueño pidió marcar distinto:
// "me gustaría que cuando una persona vaya a hacer pago anticipado que también
// quede marcado de alguna forma distinta para yo poder estar pendiente".
//
// Son intenciones a futuro: el cliente ELIGE el medio. Todavía no pagó.
const RE_ELIGE_ANTICIPADO =
  /\b(pago|pagar|pagarlo|cancelar|abonar)\s+(por\s+)?(anticipado|adelantado|antes|transferencia|nequi|daviplata|bancolombia)\b|\b(anticipado|adelantado)\b\s*(por favor|mejor|entonces)?$|\b(te|le)\s+(transfiero|consigno|hago\s+la\s+transferencia)\b|\b(quiero|prefiero|puedo)\s+(pagar|cancelar)\s+(por\s+)?(anticipado|adelantado|transferencia|nequi|daviplata)\b|\bpor\s+(nequi|daviplata|transferencia|bancolombia)\b/i;

// 🔴 "YA PAGUÉ" — esto es dinero que YA se movió. Pasado, no futuro.
//
// ⚠️ OJO CON LOS FALSOS POSITIVOS. Acá solo entra el PASADO declarado. Un
// "¿cómo pago?" o un "pago contraentrega" NO son esto, y confundirlos manda al
// dueño a buscar una plata que nadie mandó. Por eso cada alternativa exige un
// verbo en pasado o un "ya"/"acabo de".
//
// 🔴 Y NO LLEVA `\b` AL FINAL, a propósito. Lo tenía y se comió los tres casos
// más comunes de todos: "ya pagué", "ya te pagué" y "ya consigné". En
// JavaScript `\b` solo entiende [A-Za-z0-9_], así que una "é" final cuenta como
// NO-palabra y al lado del fin de cadena no hay frontera que cruzar: la
// expresión no casaba. Justo las frases acentuadas —las que de verdad escribe
// la gente— quedaban afuera.
const RE_YA_PAGO =
  /\b(ya\s+(te\s+|le\s+|les\s+)?(pagu[eé]|consign[eé]|transfer[ií]|pagamos)|ya\s+(hice|qued[oó]|est[aá]|realic[eé])\s+(el\s+|la\s+)?(pago|transferencia|consignaci[oó]n)|acabo\s+de\s+(pagar|transferir|consignar|hacer\s+(el\s+pago|la\s+transferencia))|(hice|realic[eé]|efectu[eé])\s+(el\s+pago|la\s+transferencia|la\s+consignaci[oó]n)|pago\s+(ya\s+)?(realizado|hecho|efectuado)|(ya\s+)?(te\s+|le\s+)?(mand[eé]|envi[eé]|adjunt[oé]|paso|pas[eé])\s+(el\s+|la\s+)?(comprobante|soporte|captura|pantallazo|recibo|pago)|ah[ií]\s+(te|le)\s+(va|mando|dejo|envi[oó])\s+(el\s+|la\s+)?(comprobante|soporte|captura|pantallazo|pago))/i;

// Lo que invalida un "ya pagué": que en realidad sea una pregunta o un plan.
const RE_NO_ES_PAGO_HECHO =
  /\b(c[oó]mo|cu[aá]ndo|d[oó]nde|cu[aá]l|qu[eé]|si\s+(yo\s+)?)\b[^.?!]{0,30}\b(pago|pagar|transferencia)\b|\b(voy\s+a|puedo|podr[ií]a|ten[dr][ií]a\s+que|cuando)\s+(pagar|transferir|consignar)\b|\bcontra\s?entrega\b/i;

/**
 * ¿El cliente está ELIGIENDO pagar por anticipado? (todavía no pagó)
 * Sirve para marcar el chat y quedar pendiente del comprobante.
 */
function eligePagoAnticipado(texto) {
  const t = String(texto || "");
  if (!t.trim()) return false;
  // "pago contraentrega" gana siempre: es el otro medio.
  if (/\bcontra\s?entrega\b/i.test(t) && !/\b(anticipado|adelantado|transferencia)\b/i.test(t)) return false;
  return RE_ELIGE_ANTICIPADO.test(t);
}

/**
 * ¿El cliente está diciendo que YA PAGÓ o que ya mandó el comprobante?
 * Esto es plata que ya se movió: el dueño tiene que enterarse.
 */
function declaraPagoHecho(texto) {
  const t = String(texto || "");
  if (!t.trim()) return false;
  if (!RE_YA_PAGO.test(t)) return false;
  // Una pregunta o un plan a futuro no es un pago hecho.
  if (RE_NO_ES_PAGO_HECHO.test(t) && !/\b(ya|acabo\s+de)\b/i.test(t)) return false;
  return true;
}

/** ¿Es un tipo de archivo que podría ser un comprobante? */
function puedeSerComprobante(msg) {
  if (!msg) return false;
  if (msg.type === "image") return true;
  if (msg.type === "document") {
    const mime = String(msg.document?.mime_type || "").toLowerCase();
    return mime.includes("pdf") || mime.startsWith("image/");
  }
  return false;
}

/** El id de medios del mensaje, sea imagen o documento. */
function mediaIdDe(msg) {
  return msg?.image?.id || msg?.document?.id || null;
}

// ============================================================================
// 2. LEER LA IMAGEN
// ============================================================================

function disponible() {
  // Se apoya en la misma puerta que el audio: solo Gemini acepta imágenes por
  // `inline_data`, y hace falta el token de WhatsApp para bajar el archivo.
  return audio.disponible();
}

const PROMPT_COMPROBANTE =
  "Mirá esta imagen. Decime si es un COMPROBANTE DE PAGO colombiano (Nequi, Daviplata, " +
  "Bancolombia, Bre-B, transferencia, consignación o recibo) y extraé los datos.\n\n" +
  "Respondé SOLO un JSON, sin explicar nada y sin ```:\n" +
  '{"es_comprobante": true|false, "banco": "", "monto": "", "fecha": "", "referencia": "", ' +
  '"destino": "", "remitente": "", "estado": "", "que_es": ""}\n\n' +
  "Reglas:\n" +
  '- "monto": solo los dígitos, sin puntos ni $ (ejemplo: 85000).\n' +
  '- "destino": a qué número o cuenta se le pagó, si aparece.\n' +
  '- "remitente": quién pagó, si aparece.\n' +
  '- "estado": si dice si fue exitoso, pendiente o rechazado.\n' +
  '- "que_es": si NO es un comprobante, describí en pocas palabras qué se ve ' +
  "(por ejemplo: foto del producto, cédula, captura de una conversación).\n" +
  '- Lo que no se vea en la imagen, dejalo en "". NO inventes ningún dato.';

/** Limpia el mime: WhatsApp a veces manda "image/jpeg; something". */
function mimeLimpio(mime, porDefecto) {
  return String(mime || porDefecto).split(";")[0].trim().toLowerCase();
}

/** Saca el JSON de la respuesta del modelo, aunque venga envuelto en ```. */
function parsearJSON(texto) {
  const t = String(texto || "").trim();
  const sinCercas = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const desde = sinCercas.indexOf("{");
  const hasta = sinCercas.lastIndexOf("}");
  if (desde === -1 || hasta === -1 || hasta <= desde) return null;
  try {
    return JSON.parse(sinCercas.slice(desde, hasta + 1));
  } catch {
    return null;
  }
}

/** Normaliza el monto a número: "$ 85.000" -> 85000 */
function montoANumero(valor) {
  const digitos = String(valor == null ? "" : valor).replace(/[^\d]/g, "");
  if (!digitos) return null;
  const n = Number(digitos);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Deja los datos del comprobante en una forma estable y sin sorpresas. */
function normalizar(crudo) {
  const d = crudo && typeof crudo === "object" ? crudo : {};
  const texto = (v) => String(v == null ? "" : v).trim().slice(0, 80);
  return {
    esComprobante: d.es_comprobante === true,
    banco: texto(d.banco),
    monto: montoANumero(d.monto),
    fecha: texto(d.fecha),
    referencia: texto(d.referencia),
    destino: texto(d.destino),
    remitente: texto(d.remitente),
    estado: texto(d.estado),
    queEs: texto(d.que_es),
  };
}

/**
 * Lee una imagen con Gemini y devuelve los datos del comprobante.
 * @returns {{ok:boolean, datos?:object, error?:string}}
 */
async function leerImagen(buffer, mime) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, error: "falta GEMINI_API_KEY" };
  if (!buffer || !buffer.length) return { ok: false, error: "imagen vacía" };
  if (buffer.length > MAX_BYTES) return { ok: false, error: "imagen demasiado grande" };

  const limpio = mimeLimpio(mime, "image/jpeg");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: PROMPT_COMPROBANTE },
              { inline_data: { mime_type: limpio, data: buffer.toString("base64") } },
            ],
          },
        ],
        // Temperatura 0: acá no se quiere creatividad, se quiere lo que dice la
        // captura. Un monto inventado es peor que un monto vacío.
        generationConfig: { temperature: 0, maxOutputTokens: 400 },
      }),
    });
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      return { ok: false, error: `Gemini ${res.status}: ${String(err).slice(0, 200)}` };
    }
    const data = await res.json();
    const texto = (data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
    const crudo = parsearJSON(texto);
    if (!crudo) return { ok: false, error: `no se pudo leer la respuesta: ${texto.slice(0, 120)}` };
    return { ok: true, datos: normalizar(crudo) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

/**
 * Atajo: de un media id de WhatsApp a los datos del comprobante.
 *
 * ⚠️ Un PDF no se intenta leer: Gemini por `inline_data` acá se usa para
 * imágenes. Devuelve `ok:false` con un motivo claro, y server.js igual avisa al
 * dueño —que es lo que importa—.
 */
async function leerDeMedia(mediaId, mimeDeclarado) {
  if (!mediaId) return { ok: false, error: "el mensaje no trae id de medios" };
  if (!disponible()) {
    return { ok: false, error: "lectura de imágenes no disponible (requiere AI_PROVIDER=gemini con GEMINI_API_KEY)" };
  }
  const media = await audio.descargarMedia(mediaId);
  if (!media.ok) return { ok: false, error: media.error };
  const mime = mimeLimpio(media.mime || mimeDeclarado, "image/jpeg");
  if (!MIMES_IMAGEN.includes(mime)) {
    return { ok: false, error: `no se puede leer un archivo ${mime} todavía` };
  }
  return leerImagen(media.buffer, mime);
}

/**
 * Las líneas con los datos del comprobante, para pegarlas en el aviso al dueño.
 * Solo salen los campos que de verdad se leyeron: una línea "Monto: " vacía
 * hace dudar de todo el aviso.
 */
function lineasDeDatos(datos) {
  if (!datos) return [];
  const fuera = [];
  if (datos.monto) fuera.push(`Monto leído: $${datos.monto.toLocaleString("es-CO")}`);
  if (datos.banco) fuera.push(`Medio: ${datos.banco}`);
  if (datos.fecha) fuera.push(`Fecha en el comprobante: ${datos.fecha}`);
  if (datos.referencia) fuera.push(`Referencia: ${datos.referencia}`);
  if (datos.destino) fuera.push(`Pagó a: ${datos.destino}`);
  if (datos.remitente) fuera.push(`De: ${datos.remitente}`);
  if (datos.estado) fuera.push(`Estado: ${datos.estado}`);
  return fuera;
}

/**
 * El aviso que recibe el dueño cuando entra un comprobante.
 *
 * 🔑 LO QUE NUNCA PUEDE DECIR ESTE AVISO ES "PAGO CONFIRMADO". El bot leyó una
 * imagen; eso no es la plata en la cuenta. Una captura se puede editar, puede
 * ser de otra cuenta o de un pago que se reversó. El aviso pide VERIFICAR, y el
 * pedido queda frenado hasta que el dueño diga que entró.
 *
 * @param {object} opciones
 * @param {string} opciones.de        teléfono del chat
 * @param {object|null} opciones.datos  lo que se pudo leer de la imagen
 * @param {string} opciones.error     por qué no se pudo leer, si pasó
 * @param {object|null} opciones.pedido  el pedido de ese chat, si existe
 * @param {string} opciones.panel     link al chat en el panel, si hay
 */
function avisoParaDueno({ de, datos, error, pedido, panel } = {}) {
  const partes = [];
  const dudoso = datos && !datos.esComprobante;

  partes.push(
    dudoso
      ? `📎 IMAGEN EN UN CHAT CON PAGO ANTICIPADO: ${de}`
      : `💸 LLEGÓ UN COMPROBANTE DE PAGO: ${de}`
  );
  partes.push("");

  if (dudoso) {
    partes.push(
      `El cliente mandó una imagen y no parece un comprobante${datos.queEs ? ` (se ve: ${datos.queEs})` : ""}.`
    );
    partes.push(`Miralo vos en el chat antes de descartarlo.`);
  } else if (datos) {
    const lineas = lineasDeDatos(datos);
    if (lineas.length) partes.push(...lineas);
    else partes.push(`La imagen parece un comprobante pero no se le pudo sacar ningún dato.`);
  } else {
    // 🔴 El camino degradado. Esto es lo que ANTES no existía: el bot no podía
    // leer la imagen y entonces no hacía nada. Ahora no saber qué dice la
    // captura no impide avisar que llegó.
    partes.push(`⚠️ No se pudo leer la imagen (${error || "motivo desconocido"}).`);
    partes.push(`Abrí el chat y miralá vos: el cliente mandó algo y está esperando.`);
  }

  partes.push("");
  if (pedido) {
    partes.push(
      `Pedido: ${pedido.nombre || "?"} · ${pedido.ciudad || "?"} · ` +
        `$${Number(pedido.total || 0).toLocaleString("es-CO")}`
    );
    const monto = datos && datos.monto;
    const total = Number(pedido.total || 0);
    // Si los dos números existen y no coinciden, se dice. Que el dueño lo
    // descubra después de despachar cuesta la diferencia.
    if (monto && total && monto !== total) {
      partes.push(
        `🔴 EL MONTO NO CUADRA: el comprobante dice $${monto.toLocaleString("es-CO")} ` +
          `y el pedido es de $${total.toLocaleString("es-CO")}.`
      );
    }
  } else {
    partes.push(`⚠️ Este chat NO tiene un pedido guardado. Puede que falte cerrarlo.`);
  }

  partes.push("");
  partes.push(`⛔ NO SE DESPACHA hasta que confirmes que la plata entró.`);
  partes.push(`Revisá la cuenta y, si entró, marcá el pago en el panel y despachá.`);
  if (panel) partes.push(panel);

  return partes.join("\n");
}

/** Lo que se le contesta al cliente. Nunca más un "no puedo abrir ese archivo". */
function respuestaAlCliente(datos) {
  if (datos && datos.esComprobante) {
    const monto = datos.monto ? ` por $${datos.monto.toLocaleString("es-CO")}` : "";
    return (
      `¡Recibido${monto}! 🙌 Ya le pasé tu comprobante al equipo para verificar que el pago entró. ` +
      `Te confirmo por acá y te mando el número de guía en cuanto despachemos 📦`
    );
  }
  // No se sabe si es un comprobante (o no se pudo leer). Igual se le dice la
  // verdad: alguien lo va a mirar. Eso es lo que el cliente necesitaba oír.
  return (
    `¡Recibí tu imagen! 🙌 Ya quedó registrada y el equipo la está revisando. ` +
    `Si es tu comprobante de pago, te confirmamos y te mandamos la guía por acá 📦`
  );
}

module.exports = {
  eligePagoAnticipado,
  declaraPagoHecho,
  puedeSerComprobante,
  mediaIdDe,
  disponible,
  leerImagen,
  leerDeMedia,
  avisoParaDueno,
  respuestaAlCliente,
  lineasDeDatos,
  // Se exportan para poder probarlos sin red ni credenciales.
  parsearJSON,
  montoANumero,
  normalizar,
  mimeLimpio,
  MIMES_IMAGEN,
  MAX_BYTES,
};
