// ============================================================================
// 📋 LEER EL CHAT Y SACAR LOS DATOS DEL PEDIDO
//
// DE DÓNDE SALE (25-sep). El dueño: "ponle algún botón para que copie todos los
// datos del chat a los cajones y no tener que escribir cajón por cajón".
//
// Tiene toda la razón, y no es solo comodidad: transcribir a mano un pedido a
// las 4 de la mañana es como se escriben mal una talla, un color o una
// dirección — y eso se descubre con el paquete ya despachado.
//
// 🔑 CÓMO FUNCIONA, Y POR QUÉ EN DOS CAPAS:
//
//   1. HEURÍSTICA (esta capa) — determinística, gratis, instantánea y probable.
//      Saca lo que se puede sacar con reglas: el celular del propio chat, la
//      talla y el color de las listas del catálogo, la ciudad contra el
//      tarifario, y el total SOLO si coincide con lo que el tarifario dice.
//
//   2. IA (opcional) — lee la conversación y saca lo que ninguna regla saca
//      bien: el nombre completo y la dirección escritos en lenguaje natural.
//
// ⚠️ Y EL ORDEN DE PRECEDENCIA NO ES CAPRICHO: para el celular y el total manda
// la heurística, no la IA. El celular sale del número por el que escribe, que es
// un dato duro; y el total tiene que salir del tarifario, porque una IA que
// "recuerda" un precio de la conversación puede traer el número equivocado y eso
// se cobra contraentrega. La IA aporta texto, no plata.
//
// ⛔ NADA DE ESTO GUARDA NI ENVÍA NADA. Solo devuelve datos para llenar el
// formulario; el dueño los revisa y le da guardar. Es un asistente de tipeo.
// ============================================================================

const fletes = require("./fletes");

// Del catálogo real (ver prompt.js): el impermeable siempre es negro, lo que
// cambia de color es la franja reflectiva.
const TALLAS = ["3XL", "2XL", "XXXL", "XXL", "XL", "S", "M", "L"];
const COLORES = ["blanco", "negro", "rojo", "verde", "morado", "azul"];

// Palabras que delatan una dirección. No se busca un patrón de dirección
// "correcta" a propósito: en Colombia una dirección válida puede ser "finca La
// Esperanza, vereda El Tambo", y un patrón estricto la descartaría.
const PISTAS_DIRECCION =
  /\b(calle|cll|cl|carrera|cra|kra|kr|diagonal|diag|transversal|trans|tv|avenida|av|manzana|mz|casa|apto|apartamento|barrio|vereda|corregimiento|kil[oó]metro|km|torre|interior|bloque|conjunto residencial|urbanizaci[oó]n|etapa|lote|finca)\b/i;

const limpiar = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** Los mensajes del cliente, en orden. */
const delCliente = (msgs) =>
  (msgs || []).filter((m) => m.role === "user").map((m) => String(m.content || ""));

/** Los mensajes del negocio (bot o dueño), en orden. */
const delNegocio = (msgs) =>
  (msgs || []).filter((m) => m.role === "assistant").map((m) => String(m.content || ""));

/**
 * La talla que pidió el cliente. Se recorre de la más larga a la más corta para
 * que "2XL" no se lea como "L", y se exige que esté suelta: "el L" sí, "el
 * pluvial" no.
 */
function tallaDe(textos) {
  const t = " " + limpiar(textos.join(" · ")) + " ";
  for (const talla of TALLAS) {
    const p = limpiar(talla);
    // La talla puede venir pegada a "talla" o sola, pero no dentro de otra palabra.
    if (new RegExp(`(^|[^a-z0-9])${p}([^a-z0-9]|$)`).test(t)) {
      // Se normalizan las formas que escribe la gente a las del catálogo.
      if (p === "xxxl") return "3XL";
      if (p === "xxl") return "2XL";
      return talla;
    }
  }
  return "";
}

/**
 * El color de la franja.
 *
 * ⚠️ TIENE QUE ACEPTAR EL FEMENINO, y no es un detalle: lo que lleva color es la
 * FRANJA, que es femenina, así que la gente escribe "franja roja", "franja
 * blanca", "franja negra". La primera versión buscaba el color pegándole un
 * sufijo al nombre completo ("rojo" + "a" = "rojoa"), así que "roja" no
 * coincidía con nada y el campo quedaba vacío justo en la forma MÁS común.
 *
 * Lo cazó la verificación de punta a punta, no una prueba: el ejemplo que usé al
 * escribir el extractor decía "franja rojo", que nadie escribe.
 *
 * Devuelve siempre el nombre del catálogo (masculino), que es lo que espera el
 * formulario: si el cliente dice "blanca", se guarda "blanco".
 */
function patronDeColor(color) {
  // blanco/blanca/blancos/blancas · negro/negra · rojo/roja · morado/morada
  if (/o$/.test(color)) return color.slice(0, -1) + "[oa]s?";
  if (color === "verde") return "verdes?";
  if (color === "azul") return "azul(?:es)?";
  return color + "s?";
}

function colorDe(textos) {
  const t = limpiar(textos.join(" · "));
  for (const c of COLORES) {
    if (new RegExp(`(^|[^a-z])${patronDeColor(c)}([^a-z]|$)`).test(t)) return c;
  }
  return "";
}

/**
 * La ciudad, validada contra el tarifario.
 *
 * 🔑 Se prueban ventanas de 1 a 3 palabras contra `fletes.bandaDe`, que devuelve
 * null si no la conoce. Así no hace falta una lista de ciudades acá: la única
 * lista buena es la del tarifario, y mantener dos copias termina en que se
 * desincronizan.
 *
 * Solo se miran los mensajes DEL CLIENTE: el bot nombra ciudades cuando explica
 * el tarifario, y tomar esas daría la ciudad equivocada.
 */
function ciudadDe(textosCliente) {
  for (const texto of textosCliente) {
    // Los separadores se parten para no armar ventanas a través de comas.
    for (const trozo of String(texto).split(/[,.;:\n()/|]+/)) {
      const palabras = trozo.trim().split(/\s+/).filter(Boolean);
      // ⚠️ DE LA VENTANA MÁS CORTA A LA MÁS LARGA, y el orden importa mucho.
      //
      // `fletes.bandaDe` reconoce la ciudad AUNQUE venga dentro de una cadena
      // más larga —está hecho para "BOGOTA USAQUEN CODITO"—, así que "estoy en
      // Monteria" también le da banda D. Si se probara de la más larga a la más
      // corta, el campo ciudad quedaría con "estoy en Monteria" adentro.
      //
      // Empezando por una sola palabra se queda con "Monteria". Y las ciudades
      // de dos palabras igual salen, porque su primera palabra sola no coincide:
      // "Santa" no es ninguna ciudad, "Santa Marta" sí.
      for (const n of [1, 2, 3]) {
        for (let i = 0; i + n <= palabras.length; i++) {
          const candidata = palabras.slice(i, i + n).join(" ");
          if (candidata.length < 4) continue;
          // Un número no es una ciudad, y "calle 80" no debe dar "calle".
          if (/\d/.test(candidata)) continue;
          if (fletes.bandaDe(candidata)) return candidata;
        }
      }
    }
  }
  return "";
}

/** La dirección: el trozo más informativo de los que traen pistas de dirección. */
function direccionDe(textosCliente) {
  let mejor = "";
  for (const texto of textosCliente) {
    for (const linea of String(texto).split(/\n+/)) {
      const l = linea.trim();
      if (!PISTAS_DIRECCION.test(l)) continue;
      // Un mensaje entero de 200 caracteres no es una dirección; se prefiere el
      // trozo con pistas, y entre varios el más largo (suele ser el completo).
      if (l.length > mejor.length && l.length <= 160) mejor = l;
    }
  }
  return mejor;
}

/**
 * Cuántas unidades. Se detecta el combo, que es el caso que cambia el precio.
 */
function unidadesDe(textos) {
  const t = limpiar(textos.join(" · "));
  if (/\b(2|dos)\s*(conjuntos?|impermeables?|unidades?|trajes?|kits?)\b/.test(t)) return 2;
  if (/\b(combo|promo(ci[oó]n)?)\s*(de)?\s*(2|dos)\b/.test(t)) return 2;
  if (/\bllevo\s*(2|dos)\b/.test(t)) return 2;
  return 1;
}

/**
 * El celular de despacho.
 *
 * Primero el número por el que escribe (dato duro). Si escribe con nombre de
 * usuario de WhatsApp no hay número, y ahí se busca uno que el cliente haya
 * dictado en el chat — que es justo lo que hay que hacer con esos clientes.
 */
function celularDe(chatId, textosCliente) {
  const id = String(chatId || "");
  if (/^\d{10,}$/.test(id)) return id.replace(/^57/, "");
  for (const texto of textosCliente) {
    const m = String(texto).match(/\b3\d{2}[\s.-]?\d{3}[\s.-]?\d{4}\b/);
    if (m) return m[0].replace(/\D/g, "");
  }
  return "";
}

/**
 * El total, y SOLO si coincide con el tarifario.
 *
 * 🔴 Acá no se copia el número que aparezca en el chat. Se busca si alguno de
 * los montos que se dijeron coincide EXACTAMENTE con lo que el tarifario cobra
 * en esa ciudad, para 1 o para 2 unidades. Si no coincide ninguno, se devuelve
 * vacío y el formulario lo calcula solo.
 *
 * Por qué así: un total mal copiado se cobra contraentrega. Y si en el chat se
 * prometió un precio distinto al del tarifario, es mejor que el dueño lo escriba
 * a mano —viéndolo— que arrastrarlo sin que nadie lo mire.
 */
function totalDe(ciudad, textos) {
  if (!ciudad) return { total: "", unidades: null };
  const montos = new Set();
  for (const t of textos) {
    for (const m of String(t).matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+|\d{5,6})/g)) {
      montos.add(Number(String(m[1]).replace(/[.,]/g, "")));
    }
  }
  for (const uds of [2, 1]) {
    const q = fletes.cotizar(ciudad, uds);
    if (!q || !q.total) continue;
    if (montos.has(q.total)) return { total: q.total, unidades: uds };
    // El precio de rescate también es un total legítimo del combo.
    if (uds === 2 && q.rescate && montos.has(q.rescate)) {
      return { total: q.rescate, unidades: 2 };
    }
  }
  return { total: "", unidades: null };
}

/**
 * La capa determinística. Sin red, sin IA, sin costo.
 * @returns {object} los campos del formulario, con "" en los que no se pudieron sacar
 */
function heuristica({ mensajes, conv, chatId } = {}) {
  const msgs = mensajes || (conv && conv.messages) || [];
  const cliente = delCliente(msgs);
  const todos = cliente.concat(delNegocio(msgs));
  const perfil = (conv && conv.perfil) || {};

  const ciudad = ciudadDe(cliente);
  const t = totalDe(ciudad, todos);
  const unidades = t.unidades || unidadesDe(cliente);

  return {
    // El nombre del perfil de WhatsApp es un punto de partida, no la verdad: la
    // gente pone apodos. La IA, si está, lo mejora con el nombre que dictó.
    nombre: String(perfil.nombre || "").trim(),
    celular: celularDe(chatId, cliente),
    ciudad,
    direccion: direccionDe(cliente),
    talla: tallaDe(cliente),
    color: colorDe(cliente),
    unidades,
    total: t.total,
  };
}

// ============================================================================
// LA CAPA DE IA — para el nombre y la dirección, que ninguna regla saca bien
//
// El prompt es corto a propósito: se paga por token y esto se puede llamar
// muchas veces al día. No se reutiliza el guion de ventas (8.965 tokens) porque
// acá no hay que vender nada, solo leer.
// ============================================================================
const PROMPT_EXTRACCION = `Sos un extractor de datos. Leé la conversación y devolvé SOLO un objeto JSON, sin texto alrededor y sin explicaciones.

Campos: nombre, celular, ciudad, direccion, talla, color, unidades, total.

REGLAS:
- Si un dato NO está en la conversación, poné "" (cadena vacía). NO lo inventes ni lo deduzcas.
- nombre: el nombre completo que dio el cliente para el despacho.
- direccion: la dirección de entrega tal como la escribió, sin la ciudad.
- talla: una de S, M, L, XL, 2XL, 3XL.
- color: el color de la franja: blanco, negro, rojo, verde, morado o azul.
- unidades: 1 o 2, según cuántos impermeables va a comprar.
- total: solo si el cliente ACEPTÓ un total. Si no, "".
- Si el cliente corrigió un dato, vale el último.

Ejemplo de respuesta: {"nombre":"Juan Pérez","celular":"3001234567","ciudad":"Cali","direccion":"Calle 5 #12-34","talla":"L","color":"rojo","unidades":1,"total":""}`;

/** Convierte la conversación en algo corto y legible para el modelo. */
function transcribir(mensajes, tope = 40) {
  return (mensajes || [])
    .slice(-tope)
    .map((m) => `${m.role === "user" ? "CLIENTE" : "NEGOCIO"}: ${String(m.content || "").slice(0, 400)}`)
    .join("\n");
}

/**
 * Lee un JSON aunque venga envuelto en ```json ... ``` o con texto alrededor.
 * Los modelos lo hacen seguido y un JSON.parse pelado falla por eso.
 */
function parsearJson(texto) {
  const s = String(texto == null ? "" : texto);
  const sinCercas = s.replace(/```(?:json)?/gi, "");
  const desde = sinCercas.indexOf("{");
  const hasta = sinCercas.lastIndexOf("}");
  if (desde === -1 || hasta === -1 || hasta < desde) return null;
  try {
    const o = JSON.parse(sinCercas.slice(desde, hasta + 1));
    return o && typeof o === "object" ? o : null;
  } catch (e) {
    return null;
  }
}

/**
 * Junta las dos capas.
 *
 * ⚠️ LAS REGLAS DE PRECEDENCIA SON LO IMPORTANTE DE ESTA FUNCIÓN:
 *   · celular y total → SIEMPRE la heurística. Son los dos datos que, mal
 *     puestos, cuestan plata: sin celular no hay guía, y un total inventado se
 *     cobra contraentrega
 *   · ciudad → la heurística si el tarifario la reconoció; la IA solo si no
 *   · el resto → la IA si trajo algo, y si no la heurística
 */
function combinar(ia, heur) {
  const h = heur || {};
  const a = ia || {};
  const texto = (v) => String(v == null ? "" : v).trim();
  const preferirIA = (campo) => texto(a[campo]) || texto(h[campo]);

  const ciudad = texto(h.ciudad) || texto(a.ciudad);
  return {
    nombre: preferirIA("nombre"),
    // Dato duro: sale del número por el que escribe.
    celular: texto(h.celular) || texto(a.celular),
    ciudad,
    direccion: preferirIA("direccion"),
    talla: texto(h.talla) || texto(a.talla),
    color: texto(h.color) || texto(a.color),
    unidades: Number(h.unidades) || Number(a.unidades) || 1,
    // Solo el que valida contra el tarifario. Vacío = lo calcula el formulario.
    // Se conserva el tipo (número o cadena vacía): convertirlo a texto acá hacía
    // que "83000" no fuera igual a 83000 para quien lo comparara después.
    total: h.total === "" || h.total == null ? "" : Number(h.total),
  };
}

/**
 * El extractor completo.
 *
 * @param {object} opciones
 * @param {Array}  opciones.mensajes
 * @param {object} [opciones.conv]
 * @param {string} [opciones.chatId]
 * @param {function} [opciones.llamarIA] inyectable, para poder probar sin red
 * @returns {Promise<{datos:object, conIA:boolean, aviso:string|null}>}
 */
async function extraer({ mensajes, conv, chatId, llamarIA } = {}) {
  const msgs = mensajes || (conv && conv.messages) || [];
  const heur = heuristica({ mensajes: msgs, conv, chatId });

  if (typeof llamarIA !== "function" || msgs.length === 0) {
    return { datos: heur, conIA: false, aviso: null };
  }

  try {
    const cruda = await llamarIA(PROMPT_EXTRACCION, [
      { role: "user", content: transcribir(msgs) },
    ]);
    const ia = parsearJson(cruda);
    if (!ia) {
      return {
        datos: heur,
        conIA: false,
        aviso: "La IA no devolvió datos legibles; se llenó con lo que se pudo leer del chat.",
      };
    }
    return { datos: combinar(ia, heur), conIA: true, aviso: null };
  } catch (e) {
    // Que falle la IA no puede dejar al dueño sin nada: queda la heurística.
    return {
      datos: heur,
      conIA: false,
      aviso: `No se pudo consultar la IA (${e.message}); se llenó con lo que se pudo leer del chat.`,
    };
  }
}

module.exports = {
  extraer,
  heuristica,
  combinar,
  parsearJson,
  transcribir,
  tallaDe,
  colorDe,
  ciudadDe,
  direccionDe,
  unidadesDe,
  celularDe,
  totalDe,
  TALLAS,
  COLORES,
  PROMPT_EXTRACCION,
};
