// Cerebro del bot: arma el historial, llama a Gemini y procesa la respuesta
// (detecta pedidos confirmados y solicitudes de pasar a un humano).
const { buildSystemPrompt } = require("./prompt");
const store = require("./store");

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

// Llama a la API de Gemini con el prompt de sistema + historial
async function callGemini(systemPrompt, messages) {
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
      generationConfig: { temperature: 0.6, maxOutputTokens: 500 }
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  return text.trim();
}

// Extrae el bloque ##ORDER## {...} y lo separa del mensaje visible
function extractOrder(text) {
  const m = text.match(/##ORDER##\s*(\{[\s\S]*?\})/);
  if (!m) return { order: null, clean: text };
  let order = null;
  try { order = JSON.parse(m[1]); } catch { order = null; }
  const clean = text.replace(/##ORDER##\s*\{[\s\S]*?\}/, "").trim();
  return { order, clean };
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
function detectMediaIntent(text) {
  const t = (text || "").toLowerCase();
  const has = (arr) => arr.some((w) => t.includes(w));
  const quiereVer = has(["foto", "fotos", "imagen", "imagen", "imagenes", "imágenes",
    "muestr", "muéstr", "enséñ", "enseñ", "ensename", "mira", "manda", "envia", "envía", " ver "]);
  const keys = [];
  if (t.includes("color")) keys.push("colores");
  if (has(["puesto", "puesta", "modelo", "se ve", "persona"])) keys.push("modelo");
  if (t.includes("video")) keys.push("video");
  if (quiereVer && has(["producto", "conjunto", "impermeable", "piezas", "traje", "articulo", "artículo"])) keys.push("producto");
  if (quiereVer && keys.length === 0) keys.push("producto");
  return keys;
}

// Genera la respuesta para un mensaje entrante
async function generateReply(phone, userText) {
  store.pushMsg(phone, "user", userText);
  const conv = store.getConv(phone);

  let reply;
  if (!GEMINI_KEY) {
    reply =
      "¡Hola! 🏍️ Gracias por escribir a BikerPro. (Bot en modo prueba: falta configurar la API de IA). " +
      "El conjunto impermeable de 4 piezas cuesta $59.900 con pago contraentrega 📦";
  } else {
    try {
      reply = await callGemini(buildSystemPrompt(), conv.messages);
    } catch (e) {
      console.error("Error IA:", e.message);
      reply =
        "¡Hola! 🏍️ Gracias por escribir a BikerPro. Cuéntame color y talla y con gusto te ayudo a pedir tu impermeable 😊 (pago contraentrega 📦)";
    }
  }

  const handoff = reply.includes("##HANDOFF##");
  reply = reply.replace(/##HANDOFF##/g, "").trim();

  const orderRes = extractOrder(reply);
  reply = orderRes.clean;
  const order = orderRes.order;

  const mediaRes = extractMedia(reply);
  reply = mediaRes.clean;
  // Combina lo que pidió la IA (marcadores) con la detección por palabras clave del cliente
  const media = Array.from(new Set([...mediaRes.keys, ...detectMediaIntent(userText)]));

  let savedOrder = null;
  if (order) savedOrder = store.saveOrder({ ...order, telefono_chat: phone });
  if (handoff) store.setPaused(phone, true);

  store.pushMsg(phone, "assistant", reply);
  return { reply, order: savedOrder, handoff, media };
}

module.exports = { generateReply };
