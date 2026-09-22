// Cerebro del bot: arma el historial, llama a Gemini y procesa la respuesta
// (detecta pedidos confirmados y solicitudes de pasar a un humano).
const { buildSystemPrompt } = require("./prompt");
const store = require("./store");

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
      generationConfig: { temperature: 0.6, maxOutputTokens: 800 }
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
      max_tokens: 800
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
function extractOrder(text) {
  const m = text.match(/##ORDER##\s*(\{[\s\S]*?\})/);
  let order = null;
  let clean = text;
  if (m) {
    try { order = JSON.parse(m[1]); } catch { order = null; }
    clean = text.replace(/##ORDER##\s*\{[\s\S]*?\}/, "").trim();
  }
  // Elimina cualquier resto de ##ORDER## aunque esté truncado/malformado (para que no llegue al cliente)
  clean = clean.replace(/##ORDER##[\s\S]*$/, "").trim();
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
  const quiereVer = has(["foto", "fotos", "imagen", "imagenes", "imágenes",
    "muestr", "muéstr", "enséñ", "enseñ", "ensename", "mira", "manda", "envia", "envía", " ver "]);
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
  if (has(["puesto", "puesta", "modelo", "se ve", "persona"])) keys.push("modelo");
  if (t.includes("video")) keys.push("video");
  // Foto del producto: solo si NO pidió un color específico
  if (quiereVer && !mencionaColor && has(["producto", "conjunto", "impermeable", "piezas", "traje", "articulo", "artículo"])) keys.push("producto");
  if (quiereVer && keys.length === 0) keys.push("producto");
  return keys;
}

// Genera la respuesta para un mensaje entrante
async function generateReply(phone, userText) {
  store.pushMsg(phone, "user", userText);
  const conv = store.getConv(phone);

  let reply;
  if (!TIENE_IA) {
    reply =
      "¡Hola! 🏍️ Gracias por escribir a BikerPro. (Bot en modo prueba: falta configurar la API de IA). " +
      "El conjunto impermeable de 4 piezas cuesta $59.900 con pago contraentrega 📦";
  } else {
    try {
      reply = await callIA(buildSystemPrompt(), conv.messages);
    } catch (e) {
      console.error("Error IA:", e.message);
      // Respaldo que NO reinicia la conversación (evita el saludo genérico a mitad de charla)
      reply =
        "Perdón, se me cruzó la señal un momento 🙏 ¿Me repites lo último, por favor? Con gusto sigo con tu pedido 🏍️";
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
