// ============================================================================
// TRANSCRIPCIÓN DE NOTAS DE VOZ
//
// POR QUÉ IMPORTA (medido en el export de 6.317 conversaciones):
//   · 439 conversaciones (7%) tienen notas de voz
//   · 814 notas de voz mandadas por clientes
//   · Y lo que preguntan por voz es lo que MÁS cierra:
//       "si yo mido uno noventa ¿qué talla me...?"   -> talla, 17,8% de las dudas
//       "si pido dos conjuntos ¿cuánto...?"          -> 2 uds, el pedido que vale doble
//       "qué calibre es"                             -> material
//   La gente que manda audio está comprando, no curioseando.
//
// El agente viejo de Meta las leía (el export trae "Voice Transcription:").
// Nuestro bot las ignoraba en silencio: el cliente mandaba su audio y nadie
// respondía nunca. Eso es el 7% de las conversaciones pagadas, tiradas.
//
// ⚠️ SOLO FUNCIONA CON GEMINI. Los modelos compatibles con OpenAI que usamos
// por `AI_PROVIDER=openai-compat` (DeepSeek) NO aceptan audio. Si algún día se
// cambia de proveedor para ahorrar, se pierde esta capacidad — y hay que
// ponerlo en la cuenta, no solo el precio por token.
// ============================================================================

const GRAPH = "https://graph.facebook.com/v21.0";
const WA_TOKEN = process.env.WHATSAPP_TOKEN;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

// Tope de seguridad: una nota de voz de venta no dura más que esto. Si llega
// algo enorme, no se procesa (protege la cuota y evita cuelgues).
const MAX_BYTES = 8 * 1024 * 1024;

function disponible() {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  return provider === "gemini" && Boolean(GEMINI_KEY) && Boolean(WA_TOKEN);
}

/**
 * Baja un archivo de medios de WhatsApp. Son DOS pasos: primero se pide la URL
 * temporal por el id, y después se descarga esa URL —que también exige el token.
 * @returns {{ok:boolean, buffer?:Buffer, mime?:string, error?:string}}
 */
async function descargarMedia(mediaId) {
  try {
    const meta = await fetch(`${GRAPH}/${mediaId}`, {
      headers: { Authorization: `Bearer ${WA_TOKEN}` },
    });
    const info = await meta.json().catch(() => ({}));
    if (!meta.ok || !info.url) {
      return { ok: false, error: `no se pudo pedir la URL del audio: ${JSON.stringify(info).slice(0, 180)}` };
    }
    if (info.file_size && Number(info.file_size) > MAX_BYTES) {
      return { ok: false, error: `audio demasiado grande (${info.file_size} bytes)` };
    }
    // La URL de descarga TAMBIÉN necesita el token: sin él devuelve 401.
    const bin = await fetch(info.url, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
    if (!bin.ok) return { ok: false, error: `descarga falló con HTTP ${bin.status}` };
    const buffer = Buffer.from(await bin.arrayBuffer());
    if (buffer.length > MAX_BYTES) return { ok: false, error: "audio demasiado grande" };
    return { ok: true, buffer, mime: info.mime_type || "audio/ogg" };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

/**
 * Transcribe con Gemini. Se le pide SOLO la transcripción, sin interpretar ni
 * responder: la respuesta la arma el guion normal después, así el audio entra
 * al mismo flujo que un mensaje escrito y respeta todas las reglas de precio.
 */
async function transcribir(buffer, mime) {
  // WhatsApp manda ogg/opus; Gemini lo acepta, pero el mime a veces trae
  // parámetros extra ("audio/ogg; codecs=opus") que hay que limpiar.
  const mimeLimpio = String(mime || "audio/ogg").split(";")[0].trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Transcribí esta nota de voz al español, tal cual lo que dice, sin agregar " +
                "nada ni responder. Es un cliente preguntando por impermeables para moto en " +
                "Colombia, así que esperá palabras como talla, zapatones, conjunto, envío, " +
                "contraentrega y nombres de ciudades colombianas. Si no se entiende nada, " +
                "respondé exactamente: INAUDIBLE",
            },
            { inline_data: { mime_type: mimeLimpio, data: buffer.toString("base64") } },
          ],
        },
      ],
      generationConfig: { temperature: 0, maxOutputTokens: 400 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: `Gemini ${res.status}: ${err.slice(0, 200)}` };
  }
  const data = await res.json();
  const texto = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || "")
    .join("")
    .trim();
  if (!texto || /^INAUDIBLE$/i.test(texto)) return { ok: false, error: "audio inaudible" };
  return { ok: true, texto };
}

/** Atajo: de un media id de WhatsApp al texto de lo que dijo el cliente. */
async function transcribirNotaDeVoz(mediaId) {
  if (!disponible()) {
    return {
      ok: false,
      error:
        "transcripción no disponible: requiere AI_PROVIDER=gemini con GEMINI_API_KEY y WHATSAPP_TOKEN",
    };
  }
  const media = await descargarMedia(mediaId);
  if (!media.ok) return { ok: false, error: media.error };
  return transcribir(media.buffer, media.mime);
}

module.exports = { transcribirNotaDeVoz, disponible };
