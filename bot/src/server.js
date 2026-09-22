require("dotenv").config();
const express = require("express");
const { generateReply } = require("./agent");
const { sendText, sendImage, sendVideo } = require("./whatsapp");
const { MEDIA } = require("./media");
const store = require("./store");
const seguimiento = require("./seguimiento");

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
