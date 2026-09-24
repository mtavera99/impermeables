// ============================================================================
// 🔴 UN PEDIDO SIN "SÍ CONFIRMO" NO ES UNA VENTA
//
// DE DÓNDE SALE (23-sep). El dueño encontró en el panel un pedido de un cliente
// que había dicho, textual, **"No confirmo"**. La conversación real fue así:
//
//   BOT     : Confirmemos tu pedido ✅ ... ¿Está todo bien? Respóndeme "SÍ CONFIRMO"
//   CLIENTE : Digites 58.900 por 2. Cuanto te da
//   BOT     : (le explica la cuenta) ¿Te parece bien si procedemos?
//   CLIENTE : No confirmo
//   CLIENTE : Gracias
//
// Y el pedido quedó guardado igual. Eso NO es un duplicado: es una venta que
// nunca existió. Y es peor que un número mal contado, porque si el dueño despacha
// por el panel le manda un paquete a alguien que dijo que no: producto y flete
// tirados, y un cliente molesto.
//
// LA CAUSA: el modelo emitió el bloque ##ORDER## junto con el cuadro de
// confirmación, antes de que el cliente contestara. El guion dice que el bloque
// se emite AL CONFIRMAR, pero eso es una instrucción — y hoy ya van cuatro veces
// que comprobamos que una instrucción al modelo no es un candado.
//
// LAS DOS REGLAS, las dos en código:
//
//   1. Si el ##ORDER## viene en el MISMO mensaje que el cuadro de confirmación,
//      es prematuro por definición: el cuadro acaba de preguntar "¿está todo
//      bien?" y el cliente todavía no dijo nada. No se guarda.
//
//   2. Si después del cuadro el cliente dijo algo que es un NO, no se guarda.
//
// ⚠️ Y EL RIESGO DEL OTRO LADO, que importa igual: si el cliente confirma de una
// forma que no reconocemos ("hágale", "mándelo pues"), NO se puede tirar la
// venta. En ese caso el pedido SE GUARDA marcado `sin_confirmar`, para que el
// dueño lo revise antes de despachar en vez de perderlo.
// ============================================================================

function limpiar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[¡!¿?.,;:*"'()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// El encabezado del cuadro de confirmación que manda el bot.
const RE_CUADRO = /confirmemos tu pedido/i;

// ── Un NO claro ────────────────────────────────────────────────────────────
// Va PRIMERO que el sí: "no confirmo" empieza con "no" y contiene "confirmo",
// así que el orden decide. Este fue exactamente el caso real.
const RE_NO = new RegExp(
  "^(?:" +
    "no\\b" + // "no", "no confirmo", "no gracias", "no por ahora"
    "|nop\\b|nope\\b" +
    "|todavia no|aun no|por ahora no|mas tarde|mas adelante|despues" +
    "|lo pienso|lo voy a pensar|voy a pensar|dejame pensar" +
    "|espera|esperame|aguanta|todavia" +
    "|cancelar|cancela|cancelalo|ya no|mejor no|olvidalo|dejalo asi" +
    "|muy caro|esta caro|no me alcanza|no tengo" +
    ")"
);

// ── Un SÍ claro ────────────────────────────────────────────────────────────
// Ancho a propósito: en Colombia se confirma de muchas formas, y perder una
// venta real por no reconocer "hágale" es peor que marcarla para revisar.
const RE_SI = new RegExp(
  "^(?:" +
    "si\\b|sii+|sip\\b|claro|obvio|por supuesto|de una|dale|vale\\b|bueno\\b" +
    "|ok\\b|okey|oki|listo|perfecto|correcto|exacto|asi es|todo bien|de acuerdo" +
    "|confirmo|confirmado|confirmamos|lo confirmo" +
    "|hagale|hagalo|hazlo|mandalo|mandame|enviamelo|enviame|despachalo|despachame" +
    "|quiero|lo quiero|los quiero|acepto|procede|procedamos|adelante" +
    ")"
);

/**
 * ¿El cliente confirmó el pedido?
 *
 * Mira los mensajes DESPUÉS del último cuadro de confirmación.
 *
 * @param {Array<{role:string, content:string}>} messages historial de la conversación
 * @returns {"si"|"no"|"sin-cuadro"|"no-se-sabe"}
 *   si ........... dijo que sí: la venta es real
 *   no ........... dijo que no: NO se guarda
 *   sin-cuadro ... nunca se mandó el cuadro, o se mandó en este mismo mensaje y
 *                  el cliente no ha tenido oportunidad de contestar
 *   no-se-sabe ... contestó algo que no se reconoce: se guarda marcado
 */
function estadoDeConfirmacion(messages) {
  const msgs = Array.isArray(messages) ? messages : [];

  // El último cuadro que mandó el bot.
  let iCuadro = -1;
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i];
    if (m && m.role === "assistant" && RE_CUADRO.test(String(m.content || ""))) {
      iCuadro = i;
      break;
    }
  }
  if (iCuadro === -1) return "sin-cuadro";

  // Lo que dijo el cliente después del cuadro.
  const despues = msgs.slice(iCuadro + 1).filter((m) => m && m.role === "user");
  if (despues.length === 0) return "sin-cuadro"; // el cuadro es lo último: no contestó

  // Se recorren del más nuevo al más viejo: manda lo último que dijo.
  for (let i = despues.length - 1; i >= 0; i--) {
    const c = clasificar(limpiar(despues[i].content));
    if (c) return c;
  }
  return "no-se-sabe";
}

// ── Frases inconfundibles, en CUALQUIER parte del mensaje ───────────────────
//
// 🔴 Las expresiones de arriba están ancladas al principio, y eso dejaba pasar
// casos reales: "ah espera, sí confirmo" no empieza con "si", así que no se
// reconocía, se seguía mirando hacia atrás y se encontraba un "no" anterior. O
// sea: una venta real se habría tirado.
//
// Estas miran el mensaje completo. El NO va primero porque "no confirmo"
// contiene "confirmo".
const RE_NO_ADENTRO = /\b(?:no confirmo|no gracias|no quiero|no lo quiero|cancela|cancelalo|cancelar)\b/;
const RE_SI_ADENTRO = /\b(?:si confirmo|confirmo|confirmado|hagale|hagalo|mandalo|despachalo|lo quiero)\b/;

/** "no" | "si" | null si no se puede decidir con este mensaje. */
function clasificar(t) {
  if (!t) return null;
  if (RE_NO.test(t) || RE_NO_ADENTRO.test(t)) return "no";
  if (RE_SI.test(t) || RE_SI_ADENTRO.test(t)) return "si";
  return null;
}

/**
 * Decide qué hacer con un pedido que la IA acaba de emitir.
 *
 * @param {object} order          el pedido extraído del bloque ##ORDER##
 * @param {Array}  messages       historial, con el mensaje del bot ya incluido
 * @param {string} respuestaDelBot el texto que el bot está por mandar
 * @returns {{guardar:boolean, marcar:boolean, estado:string, motivo:string}}
 */
function revisarConfirmacion(order, messages, respuestaDelBot) {
  // REGLA 1: el bloque llegó junto con el cuadro. Prematuro por definición.
  if (RE_CUADRO.test(String(respuestaDelBot || ""))) {
    return {
      guardar: false,
      marcar: false,
      estado: "prematuro",
      motivo:
        "el bloque del pedido vino en el MISMO mensaje que el cuadro de confirmación: " +
        "el cliente todavía no había contestado",
    };
  }

  const estado = estadoDeConfirmacion(messages);

  if (estado === "no") {
    return {
      guardar: false,
      marcar: false,
      estado: "rechazado",
      motivo: "después del cuadro, el cliente dijo que NO",
    };
  }

  if (estado === "sin-cuadro") {
    return {
      guardar: false,
      marcar: false,
      estado: "sin-cuadro",
      motivo: "nunca se mandó el cuadro de confirmación, o el cliente no lo contestó todavía",
    };
  }

  if (estado === "no-se-sabe") {
    // ⚠️ Acá NO se tira la venta: puede ser un "hágale" que no reconocemos.
    return {
      guardar: true,
      marcar: true,
      estado: "sin-confirmar",
      motivo: "el cliente contestó algo que no se reconoce como sí ni como no",
    };
  }

  return { guardar: true, marcar: false, estado: "confirmado", motivo: "" };
}

module.exports = { revisarConfirmacion, estadoDeConfirmacion, limpiar, RE_SI, RE_NO };
