require("dotenv").config();
const express = require("express");
const { generateReply } = require("./agent");
const { sendText, sendImage, sendVideo } = require("./whatsapp");
const { MEDIA } = require("./media");
const store = require("./store");

const app = express();
app.use(express.json());

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

// Salud
app.get("/", (_req, res) => res.send("BikerPro bot activo 🏍️"));
app.get("/health", (_req, res) => res.json({ ok: true }));

// Suscripción manual de la WABA (visita esta URL una vez para forzarla)
app.get("/setup-waba", async (_req, res) => {
  await subscribeWaba();
  res.send("Suscripción de WABA ejecutada. Revisa los logs de Render para ver el resultado.");
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

async function handleWebhook(body) {
  const entries = body?.entry || [];
  for (const entry of entries) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      const messages = value.messages || [];
      for (const msg of messages) {
        if (msg.type !== "text") continue; // por ahora solo texto
        const from = msg.from;
        const text = msg.text?.body?.trim();
        if (!text) continue;

        if (store.isPaused(from)) {
          console.log(`(${from}) en modo humano; el bot no responde.`);
          continue;
        }

        console.log(`Cliente ${from}: ${text}`);
        const { reply, order, handoff, media } = await generateReply(from, text);
        if (reply) await sendText(from, reply);

        // Enviar fotos/videos si el bot los solicitó
        for (const key of media || []) {
          const item = MEDIA[key];
          if (!item || !item.url) {
            console.log(`Media '${key}' sin URL configurada (agrega MEDIA_${key.toUpperCase()} en Render)`);
            continue;
          }
          if (item.type === "video") await sendVideo(from, item.url, item.caption);
          else await sendImage(from, item.url, item.caption);
        }

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BikerPro bot escuchando en puerto ${PORT} 🏍️`);
  subscribeWaba(); // auto-suscribe la WABA al arrancar
});
