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

module.exports = {
  revisar,
  revisarDireccionDePedido,
  avisoParaElDueno,
  transportadoraDe,
  limpiar,
};
