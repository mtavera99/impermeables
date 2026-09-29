// ============================================================================
// 🛒 CATÁLOGO DE PRODUCTOS
//
// QUÉ RESUELVE: hasta el 28-sep BikerPro vendía UNA sola cosa, y eso estaba
// asumido en todas partes sin decirlo: el precio del producto venía fusionado
// dentro del total de cada banda del tarifario, el prompt describía impermeables
// y nada más, y un pedido no tenía forma de decir QUÉ se vendió.
//
// Con el segundo producto (el intercomunicador V10 2X) eso ya no alcanza. Este
// módulo es el único lugar donde viven las reglas comerciales de cada producto:
// cómo se lo nombra, cuánto vale por cantidad, qué se puede afirmar de él y qué
// no, y cómo se le suma el envío.
//
// 🔑 DECISIÓN DE DISEÑO CENTRAL: el impermeable NO cambia de camino.
//
// Su precio sigue saliendo de `fletes.cotizar()` exactamente como antes, byte
// por byte. No se "migró" al catálogo nuevo. La razón es simple: el tarifario de
// impermeables se reconstruyó con 79 guías reales, tiene cinco bandas, zonas de
// difícil acceso, promo de 2 con fletes medidos ciudad por ciudad y precios de
// rescate negociados. Reescribir eso para que "encaje" en una abstracción nueva
// es la forma más fácil de romper un negocio que funciona.
//
// Así que hay dos motores de precio declarados, y cada producto dice cuál usa:
//   · "tarifario"          -> el total sale de fletes.cotizar (impermeable)
//   · "producto_mas_envio" -> precio de tabla + envío del destino (V10)
//
// Un producto nuevo mañana declara el suyo y no toca nada de lo anterior.
// ============================================================================

const fletes = require("./fletes");

// ----------------------------------------------------------------------------
// EL ENVÍO DEL V10: DE DÓNDE SALE Y POR QUÉ NO ES UNA TARIFA NUEVA
//
// El dueño fue explícito: "no crear un segundo sistema de tarifas, reutilizar
// EXACTAMENTE el motor de envíos que ya usa BikerPro". Así que el envío del V10
// se deriva del mismo tarifario, no de una tabla inventada:
//
//     envío de la banda = BANDAS[banda].total − PRECIO_PRODUCTO
//
// O sea, literalmente lo que el negocio YA le cobra de envío a un cliente de esa
// banda: A $13.100 · B $18.100 · C $22.100 · D $23.100 · E $25.100.
//
// ⚠️ SUPUESTO QUE HAY QUE CONFIRMAR (está en el PR): el envío es EL MISMO para 1
// y para 2 intercomunicadores.
//
// Por qué: dos intercomunicadores caben en el mismo paquete chico. NO se usa
// ENVIO_REAL_2 —el flete de dos unidades del tarifario— porque ese número está
// medido para DOS CONJUNTOS IMPERMEABLES, que son voluminosos: va de $23.947 a
// $45.214. Aplicárselo al V10 haría que el combo de banda E saliera $145.114 en
// vez de $125.000, y estaríamos cobrando un flete de ropa por un paquete que
// pesa gramos. Eso no es prudencia, es un error caro.
//
// Y al revés también está cubierto: la tarifa de 1 unidad está calibrada para el
// paquete de un impermeable, que abulta MÁS que un intercomunicador. Así que
// cobrar eso por el V10 deja margen de sobra en el flete, nunca al revés.
// ----------------------------------------------------------------------------
function envioCobradoDe(claveBanda) {
  const banda = fletes.BANDAS[claveBanda];
  if (!banda) return null;
  return banda.total - fletes.PRECIO_PRODUCTO;
}

// ============================================================================
// LOS PRODUCTOS
// ============================================================================

const PRODUCTOS = {
  // --------------------------------------------------------------------------
  // EL DE SIEMPRE. Está acá para que el sistema pueda NOMBRARLO y mostrarlo en
  // el panel, no para cambiarle nada: su precio sigue saliendo del tarifario.
  // --------------------------------------------------------------------------
  impermeable: {
    id: "impermeable",
    nombre: "Conjunto impermeable",
    nombreCorto: "Impermeable",
    etiquetaPanel: "🧥 Impermeable",
    motorDePrecio: "tarifario",
    // Campos que SÍ tienen sentido para este producto y que el bot pide.
    pideTalla: true,
    pideColor: true,
    // Es el que se asume cuando no hay ninguna señal de producto, porque es el
    // que lleva meses vendiéndose y el que describe el arranque del anuncio.
    porDefecto: true,
  },

  // --------------------------------------------------------------------------
  // 🆕 EL INTERCOMUNICADOR V10 2X
  // --------------------------------------------------------------------------
  intercom_v10_2x: {
    id: "intercom_v10_2x",
    nombre: "Intercomunicador V10 2X",
    nombreCorto: "V10 2X",
    etiquetaPanel: "🎧 V10 2X",
    motorDePrecio: "producto_mas_envio",
    pideTalla: false,
    pideColor: false,
    porDefecto: false,

    // 💰 PRECIOS CONFIRMADOS POR EL DUEÑO. Ninguno incluye envío.
    //
    // ⛔ Y NO ES UN "2x1". El dueño lo dejó dicho expresamente: la oferta es
    // "2 intercomunicadores por $99.900". Decir 2x1 sería prometer que el
    // segundo es gratis, y no lo es.
    precios: { 1: 59900, 2: 99900 },

    // Lo que la publicidad empuja: el combo. Cuando alguien pregunta en general,
    // se presenta esto primero.
    ofertaPrincipal: { unidades: 2, precio: 99900, nombre: "combo x2" },

    // ✅ LO ÚNICO QUE EL BOT PUEDE AFIRMAR. Sale textual de lo que confirmó el
    // dueño. Nada más entra acá sin que él lo confirme.
    funciones: [
      "comunicación de casco a casco",
      "música",
      "indicaciones del GPS",
      "llamadas",
    ],

    // ⛔ LO QUE NO SE PUEDE INVENTAR, Y POR QUÉ ESTÁ ESCRITO ACÁ.
    //
    // El 14-sep el bot le prometió a una clienta una oficina de Servientrega que
    // no presta ese servicio, y la clienta lo leyó. Una especificación inventada
    // de un aparato electrónico es el mismo error con otra ropa: si el bot dice
    // "alcanza 1.000 metros" y alcanza 300, eso es una devolución con motivo.
    //
    // Estas palabras se usan para detectar la pregunta y contestar que se
    // confirma, en vez de dejar que el modelo rellene el hueco.
    sinDatoConfirmado: [
      "alcance", "metros", "distancia", "rango",
      "bateria", "batería", "autonomia", "autonomía", "duracion", "duración",
      "cuanto dura", "cuánto dura", "horas",
      "bluetooth", "version", "versión",
      "resistente al agua", "sumergible", "impermeable", "ip67", "ip65", "ipx",
      "certificacion", "certificación", "homologado",
      "cuantos se conectan", "cuántos se conectan", "cuantos dispositivos",
      "cuántos dispositivos", "compatible", "compatibilidad",
      "garantia", "garantía", "marca", "watts", "vatios", "parlante",
    ],

    envioIncluido: false,
    contraentrega: true,
  },
};

/** El producto que se asume cuando no hay ninguna señal. */
const PRODUCTO_POR_DEFECTO =
  Object.values(PRODUCTOS).find((p) => p.porDefecto)?.id || "impermeable";

const de = (id) => PRODUCTOS[id] || null;
const esV10 = (id) => id === "intercom_v10_2x";

// ============================================================================
// 🔍 DETECTAR DE QUÉ PRODUCTO HABLA EL CLIENTE
// ============================================================================

/** Minúsculas, sin tildes. Para comparar lo que escribe el cliente. */
function aplanar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// ----------------------------------------------------------------------------
// SEÑALES DEL V10
//
// 🔑 SE USAN RAÍCES, NO PALABRAS COMPLETAS. "interco" cubre de una vez
// intercomunicador, intercomunicadores, intercom, intercoms y los errores de
// tipeo que igual empiezan bien ("intercomunicdor", "intercomunciador"). Pedir
// la palabra exacta obligaría a enumerar typos para siempre.
//
// ⛔ LO QUE A PROPÓSITO **NO** ES SEÑAL DE PRODUCTO: "combo" y "combo x2".
//
// El dueño los listó como alias del V10, y por eso conviene explicar por qué no
// entran: el impermeable TAMBIÉN tiene un combo de 2 unidades, y es su gancho
// comercial principal. Si "combo" mandara la conversación al V10, un cliente de
// impermeables que escribe "quiero el combo" —algo que pasa todos los días—
// terminaría recibiendo el precio del intercomunicador. Eso sería una regresión
// del negocio que funciona para acomodar el que arranca.
//
// Dentro de un hilo que YA es de V10, "combo" sí significa 2 unidades: eso lo
// resuelve `unidadesPedidas()` más abajo, que es lo correcto — ahí "combo" habla
// de cantidad, no de producto.
// ----------------------------------------------------------------------------
const SENALES_V10 = [
  // Alta confianza: nombran el producto y no se parecen a nada más del catálogo.
  { re: /\binterco/, confianza: "alta", senal: "dijo intercomunicador" },
  { re: /\bv\s*-?\s*10\b/, confianza: "alta", senal: "dijo V10" },
  { re: /\bv10\b/, confianza: "alta", senal: "dijo V10" },
  // "de casco a casco" es exactamente el beneficio del producto.
  { re: /casco\s+a\s+casco/, confianza: "alta", senal: "habló de casco a casco" },
  // Cómo lo nombra la gente que no sabe el nombre técnico. El dueño dio estos
  // dos ejemplos literales: "los de los cascos", "los aparatos para hablar en moto".
  { re: /\b(?:los|las|el|la)\s+(?:de\s+los|para\s+(?:el|los)|de)\s+cascos?\b/, confianza: "media", senal: "los de los cascos" },
  { re: /\bhablar\b[^.]{0,20}\b(?:en|desde|por)\s+(?:la\s+)?mot/, confianza: "media", senal: "hablar en moto" },
  { re: /\bcomunicar\w*\b[^.]{0,25}\bcasco/, confianza: "media", senal: "comunicarse con casco" },
  { re: /\bdiadema\w*\b[^.]{0,15}\bcasco/, confianza: "media", senal: "diadema para casco" },
];

/**
 * ¿Este texto nombra algún producto? Devuelve null si no hay señal.
 *
 * ⚠️ Devolver null es un resultado válido y necesario: "quiero información" no
 * nombra nada, y adivinar ahí es justo lo que NO hay que hacer.
 *
 * @returns {{producto:string, confianza:"alta"|"media", senal:string}|null}
 */
function productoEn(texto) {
  const t = aplanar(texto);
  if (!t.trim()) return null;

  for (const s of SENALES_V10) {
    if (s.re.test(t)) {
      return { producto: "intercom_v10_2x", confianza: s.confianza, senal: s.senal };
    }
  }

  // Señales del impermeable. Sirven para el CAMBIO DE VUELTA: un cliente que
  // venía preguntando por intercomunicadores y dice "y el impermeable?" tiene que
  // volver al otro flujo.
  if (/\b(impermeabl|chaqueta|pantalon|traje\s+de\s+agua|enterizo|capa\s+de\s+agua)/.test(t)) {
    return { producto: "impermeable", confianza: "alta", senal: "dijo impermeable" };
  }

  return null;
}

/**
 * De qué producto habla ESTA conversación.
 *
 * Orden de prioridad, y cada paso tiene su razón:
 *
 *  1. Lo que dijo en ESTE turno. Manda sobre todo lo demás: es el mecanismo del
 *     cambio de producto ("también vi los intercomunicadores").
 *  2. Lo último que se nombró en la conversación reciente. Esto es la PRIORIDAD
 *     DE CONTEXTO que pidió el dueño: después de hablar de V10, un "¿y uno?"
 *     sigue siendo del V10 y no hay que preguntar "¿uno de qué?".
 *  3. El anuncio por el que entró (referral de Meta). Señal ADICIONAL, nunca
 *     única: el cliente puede borrar el mensaje prellenado y escribir otra cosa.
 *  4. Si nada de lo anterior dice nada -> el producto por defecto, o sea
 *     exactamente el comportamiento de hoy. Cero regresión.
 *
 * @param {object} conv conversación del store
 * @param {string} userText el mensaje de este turno
 * @param {{producto?:string}} [opciones] producto deducido del anuncio, si hay
 * @returns {{producto:string, porQue:string, explicito:boolean}}
 */
function productoDelHilo(conv, userText, opciones = {}) {
  // 1. Este turno.
  const ahora = productoEn(userText);
  if (ahora) {
    return { producto: ahora.producto, porQue: ahora.senal, explicito: true };
  }

  // 2. La conversación reciente, del mensaje más nuevo al más viejo.
  //
  // Se miran también los mensajes DEL BOT: si el bot ya está hablando del V10, el
  // hilo es del V10 aunque el cliente no lo haya vuelto a nombrar. Es el caso
  // "Info de los intercomunicadores" -> "¿y uno?".
  const mensajes = (conv && conv.messages) || [];
  const VENTANA = 12; // suficiente para un ida y vuelta largo sin arrastrar de ayer
  for (let i = mensajes.length - 1; i >= Math.max(0, mensajes.length - VENTANA); i--) {
    const m = mensajes[i];
    if (!m || !m.content) continue;
    const hallado = productoEn(m.content);
    if (hallado) {
      return {
        producto: hallado.producto,
        porQue: `el hilo venía hablando de eso (${hallado.senal})`,
        explicito: false,
      };
    }
  }

  // 3. El anuncio de origen.
  if (opciones.producto && PRODUCTOS[opciones.producto]) {
    return { producto: opciones.producto, porQue: "el anuncio por el que entró", explicito: false };
  }

  // 4. Lo de siempre.
  return { producto: PRODUCTO_POR_DEFECTO, porQue: "no hay señal de producto", explicito: false };
}

/**
 * Traduce el anuncio de Meta a un producto, si se puede.
 *
 * Los ids de anuncio del V10 se configuran por variable de entorno porque los
 * crea el dueño en Meta y cambian: hardcodearlos obligaría a un despliegue por
 * cada campaña nueva. Si no está configurado, esto devuelve null y la detección
 * se apoya en lo que escriba el cliente, que es la señal fuerte de todos modos.
 */
function productoDelAnuncio(atribucion) {
  if (!atribucion) return null;
  const ids = String(process.env.ANUNCIOS_V10 || "")
    .split(/[\s,]+/)
    .filter(Boolean);
  const id = String(atribucion.source_id || atribucion.anuncio_id || "");
  if (id && ids.includes(id)) return "intercom_v10_2x";

  // Y como respaldo, el texto del anuncio: el título suele nombrar el producto.
  const texto = [atribucion.source_url, atribucion.titulo, atribucion.body].filter(Boolean).join(" ");
  const hallado = texto ? productoEn(texto) : null;
  return hallado ? hallado.producto : null;
}

// ============================================================================
// 💰 PRECIO DEL V10
// ============================================================================

/**
 * Cuántas unidades pide el texto, DENTRO de un hilo de V10.
 *
 * Acá sí cuenta "combo": en un hilo que ya es de intercomunicadores, "quiero el
 * combo" significa las 2 unidades por $99.900.
 *
 * @returns {number|null} null si el texto no habla de cantidad
 */
function unidadesPedidas(texto) {
  const t = aplanar(texto);
  if (!t.trim()) return null;

  // Primero lo que pide DOS, porque "solo uno" y "los dos" pueden convivir en la
  // misma frase ("no quiero los dos, solo uno") y gana la intención más precisa.
  const pideUna =
    /\b(?:solo|solamente|nada\s+mas|unicamente)\s+(?:necesito\s+|quiero\s+|me\s+sirve\s+)?(?:uno|una|1)\b/.test(t) ||
    /\b(?:mejor|prefiero|pensandolo\s+bien)\s+(?:solo\s+)?(?:uno|una|1)\b/.test(t) ||
    /\bsolo\s+(?:uno|una)\b/.test(t) ||
    /\b(?:quiero|necesito|llevo|mandame|mande?me|envieme|envia?me)\s+(?:solo\s+)?(?:uno|una|1)\b/.test(t) ||
    /\bcuanto\s+(?:vale|cuesta|sale)\s+(?:uno|una|1)\b/.test(t) ||
    /\b(?:venden|hay|tienen|se\s+puede\s+comprar)\s+(?:uno|una|1)\b/.test(t) ||
    /^(?:\s*y\s+)?(?:uno|una)\s*\??$/.test(t.trim());

  const pideDos =
    /\bcombo\b/.test(t) ||
    /\b(?:los|las)\s+dos\b/.test(t) ||
    /\b(?:quiero|necesito|llevo|mandame|mande?me|envieme|envia?me|dame)\s+(?:los\s+)?(?:dos|2)\b/.test(t) ||
    /\b(?:mejor|prefiero|pensandolo\s+bien)\s+(?:mandeme\s+|mande\s+|me\s+manda\s+)?(?:los\s+)?(?:dos|2)\b/.test(t) ||
    /\bpar\s+de\s+interco/.test(t) ||
    /\bx\s*2\b/.test(t) ||
    /\b2\s+interco/.test(t) ||
    /\bdos\s+interco/.test(t);

  if (pideUna && !pideDos) return 1;
  if (pideDos && !pideUna) return 2;
  if (pideUna && pideDos) {
    // Ambas señales: gana la que aparece más tarde en la frase, que es la
    // corrección ("quería los dos, mejor uno").
    const iUna = t.search(/\b(?:solo|solamente|mejor|unicamente)\s+(?:necesito\s+|quiero\s+)?(?:uno|una|1)\b/);
    const iDos = t.search(/\b(?:combo|los\s+dos|dos)\b/);
    if (iUna >= 0 && iDos >= 0) return iUna > iDos ? 1 : 2;
    return 1; // en la duda, la cantidad menor: nunca cobrarle de más
  }

  // Un número suelto grande: "quiero 3"
  const m = t.match(/\b(?:quiero|necesito|llevo|mandame|mande?me|son)\s+(\d{1,2})\b/);
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return n;
  }
  return null;
}

/** ¿El cliente pregunta por una sola unidad? Para responder "sí, sí vendemos". */
function preguntaPorUna(texto) {
  return unidadesPedidas(texto) === 1;
}

/**
 * ¿Está preguntando una especificación técnica que NO tenemos confirmada?
 *
 * Se usa para que el bot diga "te lo confirmo" en vez de inventar un número.
 */
function preguntaSinDatoConfirmado(texto, productoId) {
  const p = de(productoId);
  if (!p || !p.sinDatoConfirmado) return null;
  const t = aplanar(texto);
  if (!t.trim()) return null;
  // Tiene que parecer una pregunta o un pedido de dato; si no, "la batería" en
  // "se me descargó la batería del celular" activaría esto sin sentido.
  const pregunta = /\?/.test(texto) || /\b(cuanto|cuantos|cuanta|que|cual|tiene|trae|es|son|sirve|funciona|dura|alcanza|viene)\b/.test(t);
  if (!pregunta) return null;
  const hallada = p.sinDatoConfirmado.find((s) => t.includes(aplanar(s)));
  return hallada || null;
}

/**
 * El precio del producto (sin envío) para esa cantidad.
 *
 * @returns {{precio:number, uds:number, esOfertaPrincipal:boolean}|{fueraDeTabla:true, uds:number}}
 */
function precioDe(productoId, uds) {
  const p = de(productoId);
  if (!p || !p.precios) return null;
  const n = Number(uds) || 1;
  if (p.precios[n] != null) {
    return {
      precio: p.precios[n],
      uds: n,
      esOfertaPrincipal: Boolean(p.ofertaPrincipal && p.ofertaPrincipal.unidades === n),
    };
  }
  // ⛔ CANTIDAD FUERA DE TABLA: NO SE INVENTA UN PRECIO.
  //
  // El dueño fue explícito: "NO inventes descuentos adicionales para 3, 4, 5 o
  // más unidades" y "NO crear silenciosamente una nueva promoción no autorizada".
  //
  // Se podría sumar "el par a $99.900 + el resto a $59.900" —es lo que hace el
  // impermeable— pero eso YA sería decidir una política de mayoreo que nadie
  // autorizó. Se informan los precios que sí existen y lo resuelve una persona.
  return { fueraDeTabla: true, uds: n };
}

module.exports = {
  PRODUCTOS,
  PRODUCTO_POR_DEFECTO,
  de,
  esV10,
  envioCobradoDe,
  productoEn,
  productoDelHilo,
  productoDelAnuncio,
  unidadesPedidas,
  preguntaPorUna,
  preguntaSinDatoConfirmado,
  precioDe,
  aplanar,
};
