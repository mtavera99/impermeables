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

module.exports = { sendText, sendImage, sendVideo };
