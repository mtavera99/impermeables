// ============================================================================
// 🏢 "OFICINA" NO ES UNA DIRECCIÓN
//
// DE DÓNDE SALE (23-sep). El dueño estaba cargando guías y se encontró con un
// pedido que traía solo la ciudad. Abrió el chat y su conclusión fue:
//
//   "Lo voy a mandar a oficina de Interrapidísimo pero, revisando el chat, mucho
//    cuidado porque NO ES CLARO que sea una oficina de Interrapidísimo... dile al
//    bot para que esté pendiente y no vuelva a suceder con el tema de la
//    dirección, dirección o la oficina, para tenerlo muy claro nosotros."
//
// O sea: el bot aceptó "lo recibo en la oficina" como si fuera una dirección, y
// dejó al dueño teniendo que ADIVINAR de qué transportadora y de qué oficina.
// Adivinar un destino es un despacho perdido o una devolución pagada.
//
// 🔑 SON DOS FORMAS DE ENTREGA DISTINTAS Y HAY QUE SABER CUÁL ES:
//
//   A CASA ....... calle/carrera + número + barrio. Va con el mensajero.
//   A OFICINA .... alcanza con la ciudad. La oficina la ubica la transportadora,
//                  y por defecto es Interrapidísimo.
//
// ⛔ Y NO SE LE PIDE LA DIRECCIÓN DE LA OFICINA. Mi primera versión de este
// archivo la exigía, y el dueño la frenó: *"no tienes que ponerle trabas al
// cliente... no le preguntes la dirección porque lo que vas a hacer es que el
// cliente no sepa la dirección. Las direcciones no las necesitamos cuando sea en
// una oficina de la transportadora."* Pedir un dato que el cliente no tiene es
// inventar un obstáculo, y hoy mismo medimos que cada pregunta extra después del
// total baja el cierre.
//
// Lo que el dueño pidió fue CLARIDAD PARA ELLOS —"para tenerlo muy claro
// nosotros"— y eso se resuelve marcando el pedido, no interrogando al cliente.
//
// ⚠️ POR QUÉ ESTO VA EN CÓDIGO Y NO SOLO EN EL GUION. El guion ya decía "nunca
// mandes el cuadro con campos en blanco" y el pedido se guardó igual sin
// dirección. Hoy comprobamos tres veces que una instrucción al modelo NO es un
// candado: el bloque ##ORDER## salía doble aunque el guion lo prohibiera, el
// gancho de 2 unidades se apagó solo, y la regla de descuento estaba al revés.
// Lo que no puede fallar, se blinda acá.
//
// Esto NO bloquea el pedido —una venta guardada a medias siempre es mejor que
// una venta perdida— pero lo MARCA, avisa al dueño y lo pinta en el panel.
// ============================================================================

function limpiar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// ── Señales de que es una dirección de casa de verdad ──────────────────────
// Nomenclatura colombiana. Se pide una de estas Y un número: "calle 45 #12-30".
const RE_VIA =
  /\b(calle|cll|cl|carrera|cra|kra|kr|avenida|av|ave|diagonal|diag|dg|transversal|transv|tv|autopista|circunvalar|manzana|mz|mzna|lote|lt|vereda|kilometro|km|bloque|torre|casa|apto|apartamento|conjunto|urbanizacion|barrio|bario|etapa|sector)\b/;
const RE_NUMERO = /(#|n°|nro\.?|numero|no\.?\s*\d|\d+\s*-\s*\d+|\d{1,4})/;

// ── Señales de que el cliente quiere recibir en una oficina ────────────────
const RE_OFICINA =
  /\b(oficina|oficinas|sucursal|agencia|agencias|punto de (?:entrega|pago|venta)|sede|cede|bodega|lo recojo|la recojo|recojo en|recoger en|reclamo en|reclamar en|retiro en|paso por el|paso a recoger)\b/;

// ── Transportadoras que usamos o nombra el cliente ─────────────────────────
const TRANSPORTADORAS = [
  ["interrapidisimo", /\b(inter ?rapidisimo|interrapidisimo|inter ?rapido|\binter\b)/],
  ["envia", /\benv[ií]a\b/],
  ["coordinadora", /\bcoordinadora\b/],
  ["servientrega", /\bservientrega\b/],
  ["tcc", /\btcc\b/],
  ["domina", /\bdomina\b/],
  ["veloces", /\bveloces\b/],
  ["99minutos", /\b99 ?minutos\b/],
];

/** ¿Qué transportadora se nombra en el texto? null si ninguna. */
function transportadoraDe(texto) {
  const t = limpiar(texto);
  for (const [nombre, re] of TRANSPORTADORAS) if (re.test(t)) return nombre;
  return null;
}

/**
 * Clasifica una dirección.
 *
 * @returns {{
 *   estado: "vacia"|"oficina-incompleta"|"oficina"|"casa"|"dudosa",
 *   entrega: "casa"|"oficina"|null,
 *   transportadora: string|null,
 *   despachable: boolean,
 *   motivo: string,
 *   queFalta: string|null   texto listo para pedirle al cliente
 * }}
 */
function revisar(direccion) {
  const cruda = String(direccion == null ? "" : direccion).trim();
  const t = limpiar(cruda);

  // 🔑 LA ÚNICA PREGUNTA QUE VALE LA PENA HACER, y es fácil de contestar:
  // ¿va a la casa o lo recoge en la oficina? Una sola, cerrada, sin datos que
  // el cliente tenga que averiguar. Si dice oficina, ya está: no se pide más.
  const PREGUNTA_SIMPLE =
    "saber si lo enviamos a su casa (y ahí sí la dirección) o si lo recoge en la " +
    "oficina de Interrapidísimo de su ciudad";

  if (!t) {
    return {
      estado: "vacia",
      entrega: null,
      transportadora: null,
      despachable: false,
      motivo: "el pedido no dice si va a una casa o a una oficina",
      queFalta: PREGUNTA_SIMPLE,
    };
  }

  const transportadora = transportadoraDe(t);
  // Nombrar una transportadora YA es pedir entrega en oficina, aunque no use la
  // palabra: "me lo dejan en Servientrega" es exactamente eso.
  const esOficina = RE_OFICINA.test(t) || transportadora != null;

  if (esOficina) {
    // ────────────────────────────────────────────────────────────────────────
    // 🔴 SI ES OFICINA, NO SE PIDE NINGUNA DIRECCIÓN. Y ESTO YA ME LO CORRIGIÓ
    //    EL DUEÑO UNA VEZ.
    //
    // Mi primera versión exigía la transportadora Y la dirección exacta de la
    // oficina. Él lo frenó con la razón del negocio:
    //
    //   "no tienes que ponerle trabas al cliente... no le preguntes la dirección
    //    porque lo que vas a hacer es que el cliente no sepa la dirección. Las
    //    direcciones no las necesitamos cuando sea en una oficina de la
    //    transportadora."
    //
    // Y tiene toda la razón: la oficina la ubica la transportadora, no el
    // cliente. Pedirle una calle y un número que probablemente no sabe es
    // inventar un obstáculo en el peor momento. Encima contradice lo que medimos
    // hoy mismo: cada pregunta extra después del total baja el cierre.
    //
    // 🔑 CON LA CIUDAD ALCANZA. Por defecto es Interrapidísimo, que es la que se
    // usa; si el cliente nombra otra, se respeta la que dijo.
    //
    // Lo que el dueño SÍ pidió es claridad para ELLOS —"para tenerlo muy claro
    // nosotros"— y eso se resuelve marcando el pedido, no interrogando al
    // cliente.
    // ────────────────────────────────────────────────────────────────────────
    return {
      estado: "oficina",
      entrega: "oficina",
      transportadora: transportadora || "interrapidisimo",
      transportadora_supuesta: !transportadora,
      despachable: true,
      motivo: `recoge en oficina de ${transportadora || "interrapidisimo"}`,
      queFalta: null,
    };
  }

  // No habló de oficina: tiene que ser una dirección de casa con nomenclatura.
  if (RE_VIA.test(t) && RE_NUMERO.test(t)) {
    return {
      estado: "casa",
      entrega: "casa",
      transportadora: null,
      despachable: true,
      motivo: "dirección de entrega a domicilio",
      queFalta: null,
    };
  }

  return {
    estado: "dudosa",
    entrega: null,
    transportadora: null,
    despachable: false,
    motivo:
      "no se sabe si va a una casa o a una oficina: no hay calle ni número, y tampoco dijo oficina",
    queFalta: PREGUNTA_SIMPLE,
  };
}

/**
 * Le pega a un pedido lo que sabemos de su dirección, igual que revisarTelefono
 * hace con el celular. NO tumba el pedido: lo marca.
 */
function revisarDireccionDePedido(order) {
  const r = revisar(order && order.direccion);
  const marcado = {
    ...order,
    entrega: r.entrega,
    direccion_estado: r.estado,
    ...(r.transportadora ? { transportadora: r.transportadora } : {}),
  };
  if (!r.despachable) {
    marcado.direccion_dudosa = true;
    marcado.direccion_falta = r.queFalta;
    console.error(
      `🔴 PEDIDO CON DIRECCIÓN INCOMPLETA de ${order?.telefono_chat || "?"}: ` +
        `${order?.nombre || "?"} en ${order?.ciudad || "?"} — ${r.motivo}. ` +
        `Dice: "${String(order?.direccion || "").slice(0, 80)}"`
    );
  }
  return marcado;
}

/** Aviso corto para el mensaje de WhatsApp al dueño. "" si está todo bien. */
function avisoParaElDueno(order) {
  if (!order || !order.direccion_dudosa) {
    return order && order.entrega === "oficina"
      ? `\n🏢 ENTREGA EN OFICINA${order.transportadora ? ` de ${order.transportadora}` : ""}`
      : "";
  }
  return (
    `\n🔴 OJO CON LA DIRECCIÓN: ${
      order.direccion_estado === "vacia" ? "no dio ninguna" : "no está clara"
    }.` + `\nFalta ${order.direccion_falta}. Abrí el chat antes de despachar.`
  );
}

// ============================================================================
// 🏢 «LA OFICINA QUE ASIGNE LA TRANSPORTADORA» vs «QUIERO ESTA SEDE»
//
// CÓMO FUNCIONA LA OPERACIÓN DE VERDAD (aclarado por el dueño el 26-sep):
//
//   "Registramos la ciudad y entrega en oficina de Interrapidísimo. La
//    transportadora asigna la oficina de recogida; nosotros no seleccionamos ni
//    garantizamos una sede específica."
//
// 🔴 POR ESO SE RETIRÓ UN BLOQUEO QUE YO HABÍA PUESTO. Después del caso del
// 26-sep marqué TODOS los pedidos a oficina como "sin verificar" y los saqué del
// despacho hasta que alguien los confirmara. Eso estaba mal por dos razones:
//   · pedía verificar algo que no elegimos nosotros
//   · y frenaba pedidos que estaban perfectos, incluidos los ya guardados
//
// Lo que sí hay que distinguir son dos situaciones distintas:
//
//   ✅ "mándalo a oficina de Interrapidísimo"  → es el flujo normal. Sigue.
//   ⚠️ "mándalo a la oficina de Terranova"     → el cliente pide una SEDE. Eso no
//      lo podemos prometer. Se conserva su preferencia y se pide aclaración; no se
//      le cambia el pedido en silencio ni se le promete esa sede.
//
// 🔑 Y "Terranova" no es una ciudad: es una REFERENCIA dentro de Jamundí. El
// tarifario general no se toca por esto, y no hay nada que verificar sobre ella:
// para una entrega normal a oficina basta la ciudad.
// ============================================================================

// Las transportadoras. Nombrarlas NO es pedir una sede: es decir con quién se manda.
const RE_NOMBRE_TRANSPORTADORA =
  /^(interrapidisimo|inter ?rapidisimo|servientrega|coordinadora|envia|env[ií]a|tcc|deprisa|99 ?envios|saferbo|rapidisimo)$/i;

// Palabras que aparecen alrededor de una entrega en oficina y no son un lugar.
const NO_ES_SEDE = new Set(
  ("oficina oficinas sucursal agencia agencias sede cede punto puntos entrega recogida recoger " +
    "reclamar retiro principal centro ciudad municipio direccion transportadora envio envios " +
    "para en de del la el los las mi su una uno favor gracias bueno listo")
    .split(/\s+/)
);

const aplanarSede = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * ¿La dirección nombra una SEDE concreta, más allá de la transportadora y la ciudad?
 *
 * "OFICINA Interrapidísimo - Terranova" → "Terranova"
 * "OFICINA Interrapidísimo"             → ""   (flujo normal)
 * "OFICINA Interrapidísimo Jamundí"     → ""   (es la ciudad, no una sede)
 *
 * @returns {string} el nombre de la sede pedida, o "" si no pidió ninguna
 */
function sedeEspecificaEn(direccionTexto, ciudad) {
  const crudo = String(direccionTexto == null ? "" : direccionTexto);
  if (!crudo.trim()) return "";
  if (!RE_OFICINA.test(aplanarSede(crudo))) return "";

  const ciudadPlana = aplanarSede(ciudad);
  const trozos = crudo
    .replace(/[-–—,.;:()/]+/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  for (const palabra of trozos) {
    const plana = aplanarSede(palabra);
    if (plana.length < 4) continue;
    if (NO_ES_SEDE.has(plana)) continue;
    if (RE_NOMBRE_TRANSPORTADORA.test(plana)) continue;
    // La ciudad no es una sede: es el destino.
    if (ciudadPlana && (plana === ciudadPlana || ciudadPlana.includes(plana) || plana.includes(ciudadPlana))) continue;
    // Un número no nombra una sede.
    if (/\d/.test(plana)) continue;
    return palabra;
  }
  return "";
}

// ============================================================================
// 🙋 ¿EXIGE ESA SEDE, O SOLO LA NOMBRÓ COMO REFERENCIA?
//
// 🔴 DOS CORRECCIONES ENCADENADAS, Y LAS DOS FUERON MÍAS.
//
// Primero bloqueé cualquier pedido que nombrara una sede. El dueño lo ajustó: la
// mayoría nombra un barrio como REFERENCIA de su zona y con eso el pedido sigue
// normal; solo hay que aclarar cuando lo exige en exclusiva.
//
// Después la exigencia la busqué con un "solo" suelto, y eso marcaba esto:
//
//     "Solo quiero un impermeable"     → es la CANTIDAD
//     "¿Solo pago cuando llegue?"      → es el PAGO
//     "Solo la talla L"                → es la TALLA
//
// Encima `agent.js` lo buscaba en CUALQUIER mensaje del historial, así que un
// "solo" dicho sobre la talla veinte mensajes antes frenaba el pedido si la
// dirección nombraba Terranova.
//
// 🔑 LA EXIGENCIA TIENE QUE SER SOBRE EL LUGAR DE RECOGIDA. Se exige, en la MISMA
// oración: una marca de exclusividad Y una referencia al lugar. Y si la marca está
// gobernando la cantidad, el pago o la talla, no cuenta.
// ============================================================================

// ⚠️ SIN `\b` pegado a letras acentuadas: en JavaScript `\b` se define sobre `\w`,
// que es ASCII, así que `\búnicamente` NUNCA coincide. Ya me pasó una vez.
const RE_EXCLUSIVIDAD =
  /\bsolo\b|s[oó]lo\b|\bsolamente\b|[uú]nicamente|nada m[aá]s|exclusivamente|tiene que ser|debe ser|obligatoriamente|no me sirve|ninguna otra|no puede ser otra|si no es ah[ií]|si no es en/i;

// El lugar de recogida: la palabra, o un demostrativo que lo señale.
// ⚠️ TERCERA VEZ que los acentos me rompen un patrón en este trabajo: `ah[ií]\b`
// NO coincide con "ahí", porque `\b` se define sobre `\w` (ASCII) y `í` no cuenta
// como letra. Se usa un lookahead de letras en vez del límite de palabra.
const LETRA = "a-záéíóúñ";
const RE_LUGAR_RECOGIDA = new RegExp(
  `oficina|sucursal|agencia|sede|cede|punto|bodega|ah[ií](?![${LETRA}])|all[ií](?![${LETRA}])|` +
    `ese lugar|esa parte|por all[aá]|ese barrio`,
  "i"
);

// Lo que un "solo" puede estar gobernando y NO es el lugar.
const RE_OTRA_COSA =
  /\b(quiero|necesito|pido|pedir|me interesa|llevo|pago|pagar|pagu|abono|consigno|talla|tallas|color|colores|franja|uno|una|1\b|dos|2\b|impermeable|conjunto|juego|unidad|efectivo|contraentrega|transferencia)/i;

/** Las oraciones del texto, para no mezclar un "solo" de una con el lugar de otra. */
function enOracionesSede(texto) {
  return String(texto == null ? "" : texto)
    .split(/[.!?;\n]+/)
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * ¿El cliente EXIGE un lugar de recogida concreto?
 *
 * Solo cuenta si la exclusividad y el lugar están en la MISMA oración, y si esa
 * exclusividad no está gobernando la cantidad, el pago o la talla.
 *
 * @param {string} texto
 * @param {string} [sede] el nombre que nombró, si se conoce ("Terranova")
 */
function exigeSedeUnica(texto, sede) {
  const nombre = String(sede || "").trim();
  const reSede = nombre
    ? new RegExp(nombre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
    : null;

  for (const oracion of enOracionesSede(texto)) {
    const marca = oracion.match(RE_EXCLUSIVIDAD);
    if (!marca) continue;

    const hablaDelLugar = RE_LUGAR_RECOGIDA.test(oracion) || (reSede && reSede.test(oracion));
    if (!hablaDelLugar) continue; // "Solo la talla L" no habla del lugar

    // ¿La exclusividad gobierna otra cosa? Se mira lo que viene DESPUÉS de la
    // marca: si aparece cantidad/pago/talla antes que el lugar, es de eso.
    const despues = oracion.slice(marca.index + marca[0].length);
    const iOtra = despues.search(RE_OTRA_COSA);
    const iLugar = (() => {
      const m = despues.match(RE_LUGAR_RECOGIDA);
      const mS = reSede ? despues.match(reSede) : null;
      const pos = [m ? m.index : -1, mS ? mS.index : -1].filter((x) => x >= 0);
      return pos.length ? Math.min(...pos) : -1;
    })();

    // La marca puede venir DESPUÉS del lugar ("otra oficina no me sirve"): ahí no
    // hay nada después que mirar y la oración ya habla del lugar.
    if (iLugar === -1 && iOtra === -1) return true;
    if (iLugar === -1 && iOtra >= 0) continue; // gobierna otra cosa
    if (iOtra >= 0 && iOtra < iLugar) continue; // la otra cosa va primero
    return true;
  }
  return false;
}

// ============================================================================
// ✅ Y SI DESPUÉS ACEPTA LA OFICINA QUE ASIGNEN, LA EXIGENCIA QUEDA RESUELTA
//
// El cliente exige una sede, se le explica que la asigna la transportadora, y
// contesta "bueno, la que sea". Si la exigencia quedara marcada para siempre, el
// pedido seguiría frenado por algo que el propio cliente ya resolvió.
// ============================================================================
const RE_ACEPTA_ASIGNADA =
  /\b(cualquier(a)? (oficina|sede|punto)|la que (asignen|asigne|manden|quede|sea|pongan)|donde (sea|asignen|la manden|quede)|no importa (la oficina|cu[aá]l|donde)|como (sea|ustedes digan)|est[aá] bien (as[ií]|cualquiera|la que)|dale as[ií]|listo as[ií]|me sirve cualquiera|la que me toque)/i;

function aceptaOficinaAsignada(texto) {
  return RE_ACEPTA_ASIGNADA.test(String(texto == null ? "" : texto));
}

/**
 * 🔎 El estado de la sede a lo largo de la conversación: gana la ÚLTIMA señal.
 *
 * Así una exigencia vieja no pesa más que una aceptación nueva, y tampoco al revés.
 *
 * @returns {{exige:boolean, acepto:boolean, sede:string}}
 */
function estadoDeLaSede(messages, sede) {
  let ultima = null;
  for (const m of Array.isArray(messages) ? messages : []) {
    if (!m || m.role !== "user") continue;
    const texto = String(m.content || "");
    if (aceptaOficinaAsignada(texto)) ultima = "acepto";
    else if (exigeSedeUnica(texto, sede)) ultima = "exige";
  }
  return { exige: ultima === "exige", acepto: ultima === "acepto", sede: String(sede || "") };
}

module.exports = {
  sedeEspecificaEn,
  exigeSedeUnica,
  aceptaOficinaAsignada,
  estadoDeLaSede,
  revisar,
  revisarDireccionDePedido,
  avisoParaElDueno,
  transportadoraDe,
  limpiar,
};
