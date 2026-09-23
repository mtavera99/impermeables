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
//   A OFICINA .... hay que saber DE QUÉ TRANSPORTADORA y CUÁL oficina. Sin las
//                  dos cosas no existe un destino: "oficina" solo no es nada.
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

  if (!t) {
    return {
      estado: "vacia",
      entrega: null,
      transportadora: null,
      despachable: false,
      motivo: "el pedido no tiene dirección",
      queFalta:
        "la dirección completa con calle, número y barrio — o, si lo va a recoger, " +
        "de qué transportadora es la oficina y en qué dirección queda",
    };
  }

  const transportadora = transportadoraDe(t);
  // Nombrar una transportadora YA es pedir entrega en oficina, aunque no use la
  // palabra: "me lo dejan en Servientrega" es exactamente eso.
  const esOficina = RE_OFICINA.test(t) || transportadora != null;

  if (esOficina) {
    // ────────────────────────────────────────────────────────────────────────
    // Para despachar a una oficina hacen falta DOS cosas: la transportadora Y
    // la DIRECCIÓN de esa oficina.
    //
    // 🔴 LA PRIMERA VERSIÓN DE ESTO ACEPTABA UN NOMBRE SUELTO ("oficina de
    // Interrapidísimo del centro") y eso es EXACTAMENTE el caso que reportó el
    // dueño: *"mucho cuidado porque no es claro que sea una oficina de
    // Interrapidísimo"*. "Del centro" puede ser cualquiera de varias, y la guía
    // se hace con una dirección, no con una descripción.
    //
    // Así que se exige nomenclatura de verdad: vía + número. Si el cliente solo
    // dice "la del centro", se marca y se le pregunta. Marcar de más cuesta
    // abrir un chat; adivinar un destino cuesta un despacho.
    // ────────────────────────────────────────────────────────────────────────
    const ubicable = RE_VIA.test(t) && RE_NUMERO.test(t);

    if (transportadora && ubicable) {
      return {
        estado: "oficina",
        entrega: "oficina",
        transportadora,
        despachable: true,
        motivo: `entrega en oficina de ${transportadora}`,
        queFalta: null,
      };
    }

    const falta = [];
    if (!transportadora) falta.push("de qué transportadora es la oficina");
    if (!ubicable) falta.push("la dirección exacta de esa oficina (calle y número)");
    return {
      estado: "oficina-incompleta",
      entrega: "oficina",
      transportadora,
      despachable: false,
      motivo: "dice oficina pero no se sabe " + falta.join(" ni "),
      queFalta: falta.join(" y "),
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
    motivo: "la dirección no tiene calle ni número: la transportadora no la va a encontrar",
    queFalta:
      "la dirección completa con calle, número y barrio — o, si lo va a recoger en una " +
      "oficina, de qué transportadora es y dónde queda",
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
