// ============================================================================
// 📦 POSVENTA — PREGUNTAR POR UN PEDIDO NO ES COMPRAR OTRO
//
// 🔴 DE DÓNDE SALE ESTE MÓDULO: el caso Heber (25 → 27 de septiembre).
//
// Heber confirmó el 25: 2 unidades XL, rojo + blanco, San Martín (Cesar),
// $155.000. El 27 escribió UNA sola línea:
//
//     "si mandaron el pedido gracias"
//
// Eso es una pregunta de estado. Apareció un SEGUNDO pedido del 27 por los mismos
// $155.000.
//
// 🔎 LA CAUSA, reproducida y distinta de la que se suponía. No fue solo que el
// modelo emitiera otro ##ORDER## por error: **el propio candado de confirmación
// leyó la pregunta como una aceptación de compra**.
//
//     RE_SI.test("si mandaron el pedido gracias")  →  true
//
// El patrón del "sí" está anclado al principio y empieza por `si\b`. En español el
// "si" sin tilde es CONDICIONAL —"si mandaron…", "si pido dos…"— y el "sí" con
// tilde es la afirmación; pero el texto se normaliza sin tildes antes de
// compararlo, así que las dos formas llegan iguales. La frase entraba como un
// "sí, confirmo" y pasaba el candado.
//
//     RE_SI.test("ok")  →  true   (el mismo problema con una cortesía suelta)
//
// 🔑 LAS DOS DEFENSAS QUE FALTABAN:
//
//   1. INTENCIÓN: si ya hay un pedido confirmado y el cliente pregunta por su
//      estado o solo agradece, el turno es POSVENTA. Aunque el modelo emita un
//      ##ORDER##, no puede nacer una venta de ahí.
//
//   2. ESTADO REAL: la respuesta de posventa se arma con lo que el pedido de
//      verdad tiene. A Heber se le dijo "ya fue procesado y está en manos de la
//      transportadora" cuando no había ninguna guía registrada. Eso no se puede
//      afirmar por intuición.
//
// ⚠️ Y lo que este módulo NO puede hacer es matar una compra real. Si el cliente
// dice "quiero otros dos para mi hermano", eso es intención nueva explícita y
// tiene que poder existir como segundo pedido.
// ============================================================================

// Se compara sin tildes y en minúscula: así "cuándo" y "cuando" son lo mismo.
const plano = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// ── 1. Preguntas por el ESTADO de un pedido que ya existe ───────────────────
const RE_PREGUNTA_ESTADO = new RegExp(
  [
    // ¿ya lo mandaron?
    "\\b(ya\\s+)?(mandaron|mandaste|mandaron ya|enviaron|enviaste|despacharon|despachaste|despacho|salio|lo tienen|lo enviaron|la enviaron)\\b",
    // ¿cuándo llega?
    "\\bcuando\\s+(llega|llegara|me llega|lo recibo|la recibo|lo entregan|me lo entregan)\\b",
    "\\b(en cuanto|en cuantos dias|cuantos dias)\\b.{0,20}\\b(llega|llegara|demora)\\b",
    // guía / rastreo
    "\\b(tiene|hay|tienen|tienes|me das|me pasas|cual es)\\b.{0,16}\\b(guia|numero de guia|rastreo|seguimiento)\\b",
    "\\b(guia|rastreo)\\b",
    // ¿dónde va?
    "\\bdonde\\s+(va|esta|anda|quedo)\\b",
    "\\b(va|viene)\\s+en camino\\b",
    // el pedido, en general
    "\\b(que paso|que ha pasado|novedad|noticias)\\b.{0,20}\\b(pedido|envio|paquete)\\b",
    "\\b(mi|el)\\s+(pedido|envio|paquete)\\b",
    "\\b(sigo|estoy)\\s+esperando\\b",
  ].join("|")
);

// ── 2. Cortesías que no piden nada nuevo ────────────────────────────────────
// ⚠️ Corta a propósito: solo el mensaje ENTERO. "gracias, quiero otro" no entra.
const RE_SOLO_CORTESIA =
  /^(?:muchas\s+)?(?:gracias|grax|ok|oka?y|listo|bueno|vale|perfecto|excelente|bien|de acuerdo|entendido|esta bien|dale|mil gracias|muy amable|bendiciones|feliz dia|buen dia)[\s.!,🙏👍😊❤️]*$/;

// ── 3. Intención EXPLÍCITA de otra compra ───────────────────────────────────
// Esto es lo que salva la venta real: no se puede bloquear a quien quiere más.
const RE_OTRA_COMPRA = new RegExp(
  [
    "\\b(quiero|necesito|deme|dame|mandeme|mandame|envieme|enviame|pideme|agregame|sumame)\\b" +
      ".{0,24}\\b(otro|otra|otros|otras|uno mas|una mas|dos mas|adicional|adicionales|mas)\\b",
    "\\b(otro|otra|otros|otras)\\s+(conjunto|impermeable|traje|kit|juego|pedido|par)\\b",
    "\\b(quiero|voy a|me gustaria)\\s+(comprar|pedir|llevar|encargar)\\b.{0,24}\\b(otro|otra|otros|mas|adicional|de nuevo|nuevamente)\\b",
    "\\b(uno|una|dos|otro|otra)\\s+(mas|adicional)\\b",
    "\\bpara\\s+(mi|un|una)\\s+(esposa|esposo|hermano|hermana|hijo|hija|mama|papa|amigo|amiga|primo|prima|socio|compa|vecino)\\b",
    "\\b(hacer|haria|hago)\\s+otro\\s+pedido\\b",
    "\\bpedido\\s+(nuevo|adicional)\\b",
    "\\bcomprar\\s+(otro|otra|otros|mas)\\b",
  ].join("|")
);

/** ¿Está preguntando por el estado de su pedido? */
function esPreguntaDeEstado(texto) {
  return RE_PREGUNTA_ESTADO.test(plano(texto));
}

/** ¿El mensaje es solo una cortesía, sin pedir nada? */
function esSoloCortesia(texto) {
  return RE_SOLO_CORTESIA.test(plano(texto));
}

/** ¿Está pidiendo explícitamente OTRA compra? */
function pideOtraCompra(texto) {
  return RE_OTRA_COMPRA.test(plano(texto));
}

/**
 * ¿Pidió otra compra en los últimos turnos?
 *
 * 🔑 Hace falta mirar hacia atrás y no solo el turno actual. Lo encontré probando el
 * caso Heber: él pide "quiero otros dos para mi hermano" en un turno, y la
 * confirmación llega en el SIGUIENTE ("sí confirmo"). Si la intención solo se leyera
 * del turno actual, el pedido adicional llegaría a `saveOrder` sin la marca y el
 * anti-duplicados se lo comería, porque es el mismo producto y el mismo total.
 *
 * ⚠️ Con ventana corta a propósito: una petición de hace veinte mensajes no autoriza
 * un pedido nuevo hoy.
 */
function pidioOtraCompraReciente(messages, cuantos = 6) {
  return (messages || [])
    .filter((m) => m && m.role === "user")
    .slice(-cuantos)
    .some((m) => pideOtraCompra(m.content));
}

/**
 * Qué está haciendo el cliente en este turno.
 *
 * @param {string} texto
 * @param {{tienePedidoConfirmado:boolean, botPidioConfirmacion:boolean}} ctx
 *   `botPidioConfirmacion` es decisivo: si el bot ACABA de mandar un cuadro, un
 *   "listo" contesta ese cuadro y no es posventa. Sin esta condición, una compra
 *   adicional legítima no se podría confirmar nunca.
 * @returns {{intencion:"posventa"|"compra_adicional"|"normal", motivo:string}}
 */
function intencionDelTurno(texto, ctx = {}) {
  if (pideOtraCompra(texto)) {
    return { intencion: "compra_adicional", motivo: "pidió otra compra explícitamente" };
  }
  if (!ctx.tienePedidoConfirmado) return { intencion: "normal", motivo: "no hay pedido confirmado" };
  if (ctx.botPidioConfirmacion) {
    return { intencion: "normal", motivo: "el bot acaba de pedir una confirmación" };
  }
  if (esPreguntaDeEstado(texto)) {
    return { intencion: "posventa", motivo: "pregunta por el estado de su pedido" };
  }
  if (esSoloCortesia(texto)) {
    return { intencion: "posventa", motivo: "solo cortesía sobre un pedido que ya existe" };
  }
  return { intencion: "normal", motivo: "no parece posventa ni compra nueva" };
}

// ============================================================================
// 📍 EL ESTADO REAL DEL PEDIDO — NADA DE INTUICIÓN
//
// A Heber se le dijo que su pedido "está en manos de la transportadora" sin que
// hubiera guía registrada. Lo único que el sistema sabe de verdad es:
//
//   · pedido guardado y sin guía   → confirmado, pendiente de despacho
//   · con guía                     → despachado, y se puede dar el número
//   · marcado para revisión        → todavía no se despacha, se está confirmando
//   · anulado                      → no hay pedido activo
//
// No hay campo de "entregado" en el sistema, así que no se afirma una entrega.
// ============================================================================

/**
 * @returns {{clave:string, frase:string, guia:string}}
 */
function estadoDelPedido(order) {
  if (!order) return { clave: "sin_pedido", frase: "", guia: "" };
  const guia = String(order.guia || "").trim();
  if (order.anulado) {
    return { clave: "anulado", frase: "ese pedido quedó anulado", guia: "" };
  }
  if (guia) {
    return {
      clave: "despachado",
      frase: `ya está despachado y viaja con la transportadora (guía ${guia})`,
      guia,
    };
  }
  if (order.pendiente_revision || order.precio_no_cuadra || order.sin_confirmar) {
    return {
      clave: "en_revision",
      frase: "lo estamos confirmando internamente antes de despacharlo",
      guia: "",
    };
  }
  return {
    clave: "pendiente_de_despacho",
    frase: "ya está registrado y en fila para despacho",
    guia: "",
  };
}

/**
 * La respuesta de posventa, armada con el estado real.
 *
 * ⚠️ La escribe el CÓDIGO, no el modelo. Es la única forma de garantizar que no
 * se invente una guía ni una fecha: el modelo ya lo hizo una vez.
 */
function respuestaDeEstado(order) {
  const nombre = String((order && order.nombre) || "").trim().split(/\s+/)[0];
  const hola = nombre ? `¡Hola ${nombre}! ` : "¡Hola! ";
  const est = estadoDelPedido(order);

  if (est.clave === "sin_pedido") {
    return `${hola}Cuéntame con qué te ayudo y lo reviso 🙌`;
  }
  if (est.clave === "anulado") {
    return `${hola}Ese pedido quedó anulado. Si querés retomarlo me decís y lo armamos de nuevo 🏍️`;
  }
  if (est.clave === "despachado") {
    return (
      `${hola}Tu pedido ${est.frase}. ` +
      `Con ese número podés seguirlo, y el pago es contraentrega cuando lo recibas 📦`
    );
  }
  if (est.clave === "en_revision") {
    return (
      `${hola}Tu pedido está registrado y ${est.frase}. ` +
      `En cuanto tengamos la guía te la comparto por acá 📦`
    );
  }
  // pendiente_de_despacho — lo más común, y donde antes se inventaba el estado.
  return (
    `${hola}Tu pedido ${est.frase}. ` +
    `Todavía no tengo el número de guía; en cuanto la transportadora la genere te la comparto por acá 📦`
  );
}

module.exports = {
  RE_PREGUNTA_ESTADO,
  RE_SOLO_CORTESIA,
  RE_OTRA_COMPRA,
  esPreguntaDeEstado,
  esSoloCortesia,
  pideOtraCompra,
  pidioOtraCompraReciente,
  intencionDelTurno,
  estadoDelPedido,
  respuestaDeEstado,
};
