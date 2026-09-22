// Envío de mensajes por WhatsApp Cloud API (Meta)
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";

// 🔴 ARREGLADO 21-SEP: antes esta función se COMÍA los errores. Escribía el
// fallo en consola y devolvía undefined, así que si Meta rechazaba la respuesta
// del bot, quien llamaba no se enteraba: ni reintento, ni aviso, ni registro.
// Un bot que "responde" pero cuyos mensajes Meta descarta se ve exactamente
// igual que uno que funciona. Ahora devuelve el resultado.
//
// @returns {{ok:boolean, status:number, body:object, messageId?:string}}
async function sendPayload(payload) {
  if (!TOKEN || !PHONE_ID) {
    console.log(`[SIN CREDENCIALES] Payload:`, JSON.stringify(payload));
    return { ok: false, status: 0, body: { error: "faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID" } };
  }
  try {
    const res = await fetch(`${GRAPH}/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", ...payload })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Error enviando WhatsApp:", res.status, JSON.stringify(body));
      return { ok: false, status: res.status, body };
    }
    return { ok: true, status: res.status, body, messageId: body?.messages?.[0]?.id };
  } catch (e) {
    console.error("Excepción enviando WhatsApp:", e.message);
    return { ok: false, status: 0, body: { error: e.message } };
  }
}

async function sendText(to, body) {
  return sendPayload({ to, type: "text", text: { preview_url: false, body } });
}

async function sendImage(to, link, caption) {
  return sendPayload({ to, type: "image", image: { link, caption } });
}

async function sendVideo(to, link, caption) {
  return sendPayload({ to, type: "video", video: { link, caption } });
}

// Plantilla aprobada. Hace falta pasadas las 24 horas desde el ultimo mensaje
// del cliente: ahi Meta ya no acepta texto libre, solo plantillas. Dentro de la
// ventana gratis de 72h del anuncio Click-to-WhatsApp no se cobra. Ver 0-BC.
async function sendTemplate(to, nombre, idioma = "es", componentes) {
  const template = { name: nombre, language: { code: idioma } };
  if (componentes) template.components = componentes;
  return sendPayload({ to, type: "template", template });
}

module.exports = { sendText, sendImage, sendVideo, sendTemplate };
