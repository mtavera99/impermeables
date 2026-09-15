// Envío de mensajes por WhatsApp Cloud API (Meta)
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";

async function sendPayload(payload) {
  if (!TOKEN || !PHONE_ID) {
    console.log(`[SIN CREDENCIALES] Payload:`, JSON.stringify(payload));
    return;
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
    if (!res.ok) {
      const err = await res.text();
      console.error("Error enviando WhatsApp:", res.status, err);
    }
  } catch (e) {
    console.error("Excepción enviando WhatsApp:", e.message);
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
