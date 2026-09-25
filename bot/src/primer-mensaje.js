// ============================================================================
// EL PRIMER MENSAJE NO SE IMPROVISA
// ============================================================================
//
// 🔑 POR QUE ESTO EXISTE
//
// Medido en el export de 6.317 conversaciones del agente viejo: el 44,8% muere
// sin que el cliente escriba NADA propio. Entra del anuncio, lee la primera
// respuesta, y se va. O sea: el primer mensaje no es "el saludo", es LA VENTA
// ENTERA para casi la mitad del trafico pagado.
//
// Y lo que el cliente pregunta cuando si escribe, contado sobre esas 6.317:
//
//   TALLA ............ 17,8%  ← la duda #1
//   COLOR de franja .. 10,3%
//   precio ...........  8,1%
//   envio y pago .....  5,4%
//
// Talla + color = 28,1%, tres veces y media el precio. Un primer mensaje que
// los responde antes de que existan se ahorra 2-3 mensajes por conversacion.
//
// El guion (prompt.js, "FLUJO DE LA VENTA" paso 1) ya dice todo esto y trae el
// ejemplo del arranque. El problema es que lo dice A UN MODELO: cada cliente
// recibia una version distinta, y la instruccion mas importante del guion
// quedaba sujeta a que la IA la siguiera esa vez. Hoy ya aprendimos dos veces
// que una instruccion al modelo NO es un candado (el bloque ##ORDER## se emitia
// doble aunque el prompt lo prohibiera; el gancho de 2 unidades se apago solo).
//
// Lo que no puede fallar, se blinda en codigo. Este mensaje sale IGUAL siempre.
//
// Tres cosas que se ganan de una:
//   1. el contenido esta garantizado (talla, color, precio, contraentrega)
//   2. sale INSTANTANEO: no hay llamada a la IA, y al que llega del anuncio se
//      le contesta antes de que cierre WhatsApp
//   3. no gasta tokens en el mensaje que mas se repite de toda la operacion
//
// ⚠️ SOLO aplica cuando el cliente NO pregunto nada concreto. Si escribio una
// duda real, contesta la IA: un texto fijo encima de una pregunta especifica se
// lee como robot y es peor que improvisar.
// ============================================================================

const { PRECIO_PRODUCTO, fmt } = require("./fletes");

// ----------------------------------------------------------------------------
// EL TEXTO PRERRELLENADO DEL ANUNCIO
//
// Los anuncios Click-to-WhatsApp mandan el mensaje ya escrito:
//   · "¡Hola! Quiero más información."                         ← el tradicional
//   · "Hola, quiero información del impermeable tipo colmena"   ← 🔴 NO aplica
//
// Tambien entra el que solo saluda ("hola", "buenas tardes") o el que pide
// informacion en seco ("info", "mas informacion"): en esos casos el cliente NO
// pregunto nada, asi que el arranque completo es la mejor respuesta posible.
//
// La base de esta expresion es la misma que ya usa
// analisis/export-agente-meta-21sep.js para contar conversaciones vacias, para
// que el codigo y la medicion cuenten lo mismo.
// ----------------------------------------------------------------------------
const RE_SALUDO_GENERICO = new RegExp(
  "^(?:" +
    // saludo suelto, con o sin "quiero mas informacion / me interesa" detras
    "(?:hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal|saludos)" +
    "(?:\\s+(?:quiero|necesito|me gustaria)?\\s*(?:mas\\s+)?informacion(?:\\s+del\\s+impermeable)?" +
    "|\\s+me\\s+interesa" +
    "|\\s+quiero\\s+saber(?:\\s+mas)?" +
    ")?" +
    // o directo al pedido de info, sin saludar
    "|(?:mas\\s+)?informacion(?:\\s+del\\s+impermeable)?" +
    "|info" +
    "|me\\s+interesa" +
    "|quiero\\s+(?:mas\\s+)?informacion" +
    ")$"
);

// ----------------------------------------------------------------------------
// 🔴 LO QUE ANULA EL TEXTO FIJO — CASI METO UN ERROR CARO ACA
//
// El anuncio del COLMENA trae su propio mensaje prerrellenado: "Hola, quiero
// información del impermeable tipo colmena". Eso pasaba el filtro de "saludo
// generico" sin problema... y este arranque describe el TRADICIONAL: dice que va
// de S a 3XL y no menciona forro. El Colmena va de S a 2XL, SI tiene forro (es
// su ventaja principal) y vale distinto.
//
// O sea: al cliente que pidio el premium se le contestaba con los datos del otro
// producto, en el primer mensaje, en frio. Por eso el colmena sale del texto fijo
// y lo atiende la IA, que si tiene el catalogo completo.
//
// Misma logica para cualquier palabra que signifique "pregunto algo concreto":
// si el cliente ya dijo su ciudad, su talla, o pregunto el precio, merece una
// respuesta a ESO y no un folleto.
// ----------------------------------------------------------------------------
const RE_ANULA = new RegExp(
  "\\b(?:" +
    // otros productos del catalogo: el texto fijo no habla de ellos
    "colmena|premium|forro|guante|guantes|reflectiva|doble faz|catalogo" +
    // dudas concretas
    "|talla|tallas|precio|precios|vale|cuesta|cuanto|costo" +
    "|envio|envios|domicilio|flete|contraentrega" +
    "|color|colores|foto|fotos|imagen|video" +
    "|mayor|mayorista|docena|docenas" +
    ")\\b"
);

/**
 * Normaliza para comparar: sin acentos, sin signos, sin dobles espacios.
 * "¡Hola! Quiero más información." -> "hola quiero mas informacion"
 */
function limpiar(texto) {
  return String(texto == null ? "" : texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca los acentos
    .toLowerCase()
    .replace(/[¡!¿?.,;:_*"'()\-–—]/g, " ")
    .replace(/[^\w\sáéíóúñ]/g, " ") // emojis y demas
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * ¿Este texto es "no preguntó nada"?
 *
 * Ojo con el orden: si el mensaje trae UNA palabra que sea una duda concreta
 * (talla, precio, cuanto, envio...), NO es generico aunque empiece con "hola".
 * Ese caso lo contesta la IA.
 */
function esSaludoGenerico(texto) {
  const t = limpiar(texto);
  if (!t) return false;
  // Un mensaje largo nunca es el prerrellenado: algo dijo.
  if (t.split(" ").length > 8) return false;
  // Primero lo que anula: una sola de esas palabras y contesta la IA.
  if (RE_ANULA.test(t)) return false;
  return RE_SALUDO_GENERICO.test(t);
}

/**
 * ¿Es el PRIMER contacto de esta conversacion?
 *
 * Se mira el historial ya guardado: si el bot alguna vez contesto, no es primer
 * contacto y este modulo no se mete. Asi un "hola" a mitad de charla no reinicia
 * la venta con el arranque completo (ese bug ya nos paso con el saludo generico).
 */
function esPrimerContacto(messages) {
  const msgs = Array.isArray(messages) ? messages : [];
  if (msgs.some((m) => m && m.role === "assistant")) return false;
  return msgs.filter((m) => m && m.role === "user").length <= 1;
}

// ----------------------------------------------------------------------------
// EL ARRANQUE
//
// Reglas que cumple, y por que cada una:
//
//  · Dice QUE ES (4 piezas) y de que esta hecho -> material 2,3% + "de verdad
//    no se moja" 3,2%.
//  · Dice las TALLAS y mete la recomendacion de pedir una mas. Es la respuesta
//    que el agente viejo tuvo que dar mas veces en todo el export.
//  · NOMBRA los 6 colores en vez de decir "6 colores". Decir el numero obliga a
//    preguntar cuales: un mensaje de ida y vuelta regalado.
//  · Dice el precio del conjunto y que el envio va aparte, SIN dar cifra de
//    envio: 🚨 nunca un precio de envio sin saber la ciudad, y nunca un rango.
//    Es la regla mas importante del guion.
//  · Termina con UNA sola pregunta, y la mas facil que hay: la ciudad. Es
//    ademas el dato que se necesita para cotizar, asi que la respuesta empuja
//    la venta sola.
//  · NO menciona el gancho de 2 unidades. Ese va con la cotizacion, donde se
//    puede mostrar el ahorro contra comprar dos sueltos. Meterlo aca agrega una
//    segunda decision al mensaje que tiene que pedir UNA cosa.
//
// Mensajes cortos separados por linea en blanco: se lee como un chat, no como
// un folleto.
// ----------------------------------------------------------------------------
function primerMensaje() {
  return [
    "¡Hola! 🏍️ Es el conjunto impermeable de 4 piezas: chaqueta con capota, pantalón, zapatones y bolsa.",
    "PVC siliconado calibre 8 con costura termosellada, así que el agua no se filtra ni por las puntadas 💧",
    "Va de talla S a 3XL — te recomiendo pedir una talla más de la que usas normalmente, porque se pone encima de la ropa.",
    "El impermeable es negro y la franja reflectiva la eliges en blanco, negro, rojo, verde, morado o azul.",
    // ========================================================================
    // 🔴 "MÁS EL ENVÍO" SE ENTIENDE AL REVÉS (25-sep)
    //
    // Lo vio el dueño, y es de los errores más difíciles de detectar: lo
    // escribimos nosotros, así que lo leemos con la intención con que lo
    // escribimos. El cliente no.
    //
    //   "Son $59.900 el conjunto, más el envío"
    //
    // En español "más" hace doble trabajo: puede ser "+ el costo del envío"
    // (lo que queríamos decir) o "y además el envío" = envío incluido (lo que
    // mucha gente entiende). Y el que lo entiende como incluido se lleva una
    // sorpresa cuando le damos el total — justo en el escalón donde más se cae.
    //
    // 🔑 "APARTE" NO TIENE ESA AMBIGÜEDAD. Y se agrega "pagas todo junto", que
    // es la pregunta real detrás de la confusión: cuánto voy a pagar en la
    // puerta. El mensaje siguiente ya promete el total exacto, así que el
    // cliente sabe que falta un número y no lo toma como precio final.
    //
    // ⚠️ Este es el mensaje de MÁS tráfico de toda la operación. Si el cierre se
    // mueve para abajo después de este cambio, el sospechoso es esta línea.
    // ========================================================================
    `Son ${fmt(PRECIO_PRODUCTO)} el conjunto, y aparte el envío según tu ciudad. Pagas todo junto contraentrega cuando lo recibes 📦`,
    "¿Para qué ciudad sería? Así te doy el total exacto.",
  ].join("\n\n");
}

/**
 * La unica funcion que usa el agente.
 * Devuelve el texto fijo, o null si este caso lo tiene que contestar la IA.
 */
function respuestaDeArranque(messages, texto) {
  if (!esPrimerContacto(messages)) return null;
  if (!esSaludoGenerico(texto)) return null;
  return primerMensaje();
}

module.exports = {
  respuestaDeArranque,
  esSaludoGenerico,
  esPrimerContacto,
  primerMensaje,
  limpiar,
};
