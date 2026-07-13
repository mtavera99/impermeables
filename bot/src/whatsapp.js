// Envío de mensajes por WhatsApp Cloud API (Meta)
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";

async function sendText(to, body) {
  if (!TOKEN || !PHONE_ID) {
    console.log(`[SIN CREDENCIALES] Responderia a ${to}: ${body}`);
    return;
  }
  try {
    const res = await fetch(`${GRAPH}/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body }
      })
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Error enviando WhatsApp:", res.status, err);
    }
  } catch (e) {
    console.error("Excepción enviando WhatsApp:", e.message);
  }
}

module.exports = { sendText };
