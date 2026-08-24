// ============================================================================
// TARIFARIO REAL — 99 ENVÍOS
// Construido con las 79 guías auditadas del 10 al 19 de agosto de 2026.
// Script de origen: /analisis/tarifario-real.py (correr de nuevo si cambian tarifas).
//
// ⚠️ ESTE ARCHIVO REEMPLAZA UNA TABLA INVENTADA. La versión anterior decía
// Cali $13.000 (real $20.771), Cartagena $15.000 (real $20.771) y ponía $18.000
// como estimado para "otra ciudad" cuando los pueblos cuestan $25.029.
// Esa tabla es la causa documentada de la fuga de flete de la sección 0-H del
// archivo madre: se absorbían $3.900-4.900 por venta en destinos caros.
//
// 🔑 REGLA DE ORO: al cliente se le cotiza el TOTAL de su banda, nunca un rango
// de flete. Prometer "$15.000 a $20.000" fue el defecto (a) del pendiente #38.
// ============================================================================

const PRECIO_PRODUCTO = 59900;

// Los fletes de 99 Envíos NO son un continuo: caen en 5 escalones nítidos.
// `flete` = lo que cobra 99 Envíos (flete modal observado en la banda).
// `total` = lo que hay que cobrarle al cliente (producto + flete, redondeado
//           al millar hacia arriba). Cobrar esto deja la absorción en ~$0.
const BANDAS = {
  A: {
    // ⚠️ VIGILAR: el flete subió de $12.871 a $12.956 el 24-ago, así que el
    // colchón quedó en solo +$144. Sigue positivo, y subir $1.000 al 27% del
    // volumen (que además es el cliente más sensible al precio) para proteger
    // $144 no vale la pena todavía.
    // 🔔 GATILLO: si el flete pasa de $13.100, subir esta banda a $74.000.
    nombre: "Bogotá y sabana",
    flete: 12956,
    total: 73000,
    ciudades: ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA", "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"],
  },
  B: {
    nombre: "Boyacá, Casanare y Meta cercano",
    flete: 16843,
    total: 77000,
    ciudades: ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO", "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS", "CUCUNUBA", "UBATE", "CHOCONTA", "VILLA DE LEYVA"],
  },
  C: {
    nombre: "Capitales grandes",
    flete: 20771,
    total: 81000,
    ciudades: ["MEDELLIN", "CALI", "BARRANQUILLA", "SOLEDAD", "CARTAGENA", "CARTAGENA DE INDIAS", "PEREIRA", "DOSQUEBRADAS", "MANIZALES", "BARRANCABERMEJA", "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA", "ITAGUI", "ENVIGADO", "SABANETA", "PALMIRA", "JAMUNDI", "YUMBO", "COPACABANA", "BUENAVENTURA", "PUERTO BERRIO", "OCANA"],
  },
  D: {
    nombre: "Ciudades intermedias",
    flete: 22870,
    total: 83000,
    ciudades: ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES", "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS", "SAMACA", "CUCUTA", "SAN JOSE DE CUCUTA", "PASTO", "VALLEDUPAR", "SINCELEJO", "QUIBDO", "RIOHACHA", "EL CERRITO"],
  },
  E: {
    // ⚠️ SUBIÓ DE $85.000 A $86.000 EL 24-AGO. 99 Envíos movió la tarifa: el
    // flete de esta banda pasó de $25.029 a $25.481, y con $85.000 el colchón
    // quedó en −$381, o sea que CADA venta de banda E absorbía. Y es la banda
    // de mayor volumen: 13 de 30 guías (43%) del export del 24-ago.
    nombre: "Pueblos y zona extendida",
    flete: 25481,
    total: 86000,
    ciudades: ["GUACHENE", "GOMEZ PLATA", "ALGECIRAS", "REMEDIOS", "TUQUERRES", "TURBO", "PUERTO GAITAN", "ANSERMA", "LA UNION", "EL SANTUARIO", "LLORENTE", "SAN CARLOS DE GUAROA", "BUENAVISTA", "SAN GIL", "INZA", "MALAGA", "CAUCASIA", "SANTA ROSA DE CABAL", "RIOSUCIO", "MACEO", "PARATEBUENO", "SANTIAGO DE TOLU", "SAN ANDRES DE SOTAVENTO", "HISPANIA", "GUACARI", "SAN ESTANISLAO", "ACEVEDO", "PUERTO ASIS", "FUNES", "MAGANGUE", "SANTA ROSA DE OSOS", "DIBULLA", "URIBE", "EL TAMBO", "GUARNE", "LA MONTANITA"],
  },
};

// Si la ciudad no está en ninguna lista, se asume la banda MÁS CARA.
// Antes el default era $18.000 y se quedaba corto en todos los pueblos, que son
// justo los destinos que no aparecen en ninguna lista. Errar hacia arriba cuesta
// una objeción de precio; errar hacia abajo cuesta $4.900 de margen por venta.
const BANDA_POR_DEFECTO = "E";

// ============================================================================
// 🔑 EL FLETE NO ES UN SORTEO: EL DUEÑO ELIGE LA TRANSPORTADORA
//
// 99 Envíos reparte entre interrapidísimo, servientrega y coordinadora, y cada
// una cobra distinto por el MISMO destino. El dueño SÍ puede elegir, y elige por
// eficiencia y por costo según la ubicación.
//
//   Bogotá:    coordinadora $11.880 · interrapidísimo $12.871 · servientrega $14.674
//   Cartagena: servientrega $20.771 · interrapidísimo $22.793
//   Bello:     coordinadora $20.710 · interrapidísimo $22.714
//
// CONSECUENCIA PARA ESTE ARCHIVO: los totales de abajo son alcanzables SI se
// elige bien la transportadora. Las dos reglas que hacen que el precio cierre:
//   · Bogotá y sabana → coordinadora o interrapidísimo. NO servientrega
//     (a $14.674 el total de $73.000 se queda corto $1.574).
//   · Cartagena → servientrega ($20.771). Con interrapidísimo faltan $1.693.
//     ⚠️ Excepto que se prefiera pagar por confiabilidad: Cartagena es la ciudad
//     que más rechaza, y una devolución cuesta mucho más que $2.022.
// ============================================================================

// Promo vigente: 2 conjuntos por $110.000 (el envío se cobra ADEMÁS).
// ⚠️ El flete de 2 unidades NO se predice desde el de 1: los aumentos observados
// van de +$3.008 a +$15.089 porque 2 unidades cruzan escalones de peso distintos
// según la transportadora. Por eso `cotizar()` nunca da un total firme de 2
// unidades: marca `requiereConfirmacion` para que se mire el panel.
const PROMO_2_UNIDADES = 110000;

// Fletes de 2 unidades REALMENTE observados, para cotizar rápido lo conocido.
const FLETE_2_OBSERVADO = {
  "BOGOTA": 17658,
  PEREIRA: 27608,
  MEDELLIN: 27891,
  SOLEDAD: 27758,
  COPACABANA: 27758,
  MANIZALES: 26915,
  PALMIRA: 26915,
  VILLAVICENCIO: 25445,
  "CARTAGENA DE INDIAS": 35860,
  CARTAGENA: 35860,
  CAUCASIA: 28037,
  "SANTA ROSA DE CABAL": 28014,
  HISPANIA: 34112,
  "EL TAMBO": 31774,
  GUARNE: 31774,
  "LA MONTANITA": 32458,
};

// Total de la promo de 2 unidades POR BANDA.
// ⚠️ CORRECCIÓN DEL 24-AGO: se estaba cobrando un $138.000 PLANO para todo el
// país, y el flete de 2 unidades va de $17.658 a $32.458. Eso sobrecobraba
// $10.342 en Bogotá (riesgo de perder la venta) y absorbía $3.774 en los
// destinos caros. La promo tiene que seguir las bandas, igual que 1 unidad.
const PROMO_2_TOTAL = { A: 128000, B: 136000, C: 138000, D: 139000, E: 143000 };

// Recargo de flete por unidad adicional en el mismo pedido.
// Observado en 6 pedidos de 2 unidades: el flete NO se duplica, sube entre
// $6.838 y $15.089 (mediana ~$7.100).
//
// ⚠️ ES UNA ESTIMACIÓN, NO UNA TARIFA. Y además el PRECIO del producto para 2
// unidades no está definido: los pedidos reales se cobraron entre $54.058 y
// $59.991 por unidad, o sea que cada cierre improvisó (pendiente #44).
// Por eso `cotizar()` marca `requiereConfirmacion` en cualquier pedido de 2+ y
// el guion tiene instrucción explícita de NO inventar el total: pasa a humano.
const RECARGO_UNIDAD_EXTRA = 7100;

function fmt(n) {
  return "$" + Number(n || 0).toLocaleString("es-CO");
}

// Quita tildes y normaliza para que "Bogotá D.C.", "bogota" y "BOGOTÁ" caigan igual.
function normalizar(ciudad) {
  return String(ciudad || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\bD\.?\s?C\.?\b/g, "")
    .replace(/[^A-Z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Devuelve la banda de una ciudad, o null si no la reconoce.
function bandaDe(ciudad) {
  const c = normalizar(ciudad);
  if (!c) return null;
  for (const [clave, banda] of Object.entries(BANDAS)) {
    if (banda.ciudades.includes(c)) return clave;
  }
  return null;
}

/**
 * Cotiza un pedido. Es la única función que debe usarse para dar precios.
 * @param {string} ciudad
 * @param {number} unidades
 * @returns {{banda:string, nombreBanda:string, flete:number, total:number,
 *            unidades:number, reconocida:boolean}}
 */
function cotizar(ciudad, unidades = 1) {
  const uds = Math.max(1, Number(unidades) || 1);
  const clave = bandaDe(ciudad);
  const reconocida = clave !== null;
  const banda = BANDAS[clave || BANDA_POR_DEFECTO];

  if (uds === 1) {
    return {
      banda: clave || BANDA_POR_DEFECTO,
      nombreBanda: banda.nombre,
      flete: banda.flete,
      total: banda.total,
      unidades: 1,
      reconocida,
      requiereConfirmacion: false,
    };
  }

  // ---- 2 o más unidades: precio de promo por banda ----
  const c = normalizar(ciudad);
  const claveBanda = clave || BANDA_POR_DEFECTO;
  const fleteObservado = uds === 2 ? FLETE_2_OBSERVADO[c] : undefined;
  // Sin dato real se estima con el peor aumento visto, para no absorber.
  const flete = fleteObservado ?? banda.flete + (uds - 1) * RECARGO_UNIDAD_EXTRA;

  let total;
  if (uds === 2) {
    // El total de la promo lo fija la BANDA, no una tarifa plana nacional.
    // Si además hay flete medido para esa ciudad, se usa el mayor de los dos:
    // así nunca se cobra por debajo del costo real.
    total = Math.max(
      PROMO_2_TOTAL[claveBanda],
      Math.ceil((PROMO_2_UNIDADES + flete) / 1000) * 1000
    );
  } else {
    // 3+ unidades: la promo aplica al par y el resto va a precio lleno.
    const producto = PROMO_2_UNIDADES + (uds - 2) * PRECIO_PRODUCTO;
    total = Math.ceil((producto + flete) / 1000) * 1000;
  }

  return {
    banda: clave || BANDA_POR_DEFECTO,
    nombreBanda: banda.nombre,
    flete,
    total,
    unidades: uds,
    reconocida,
    promo: uds === 2,
    // true = el flete de este total es estimado, no medido. Hay que verificarlo
    // en el panel de 99 Envíos antes de prometerlo.
    requiereConfirmacion: fleteObservado === undefined,
  };
}

// Texto que se inyecta en el prompt de la IA. Da TOTALES por banda, no fletes
// sueltos: la IA no debe hacer aritmética ni improvisar un rango.
function tablaFletesTexto() {
  return Object.entries(BANDAS)
    .map(([clave, b]) => {
      const ejemplos = b.ciudades.slice(0, 6).join(", ");
      return `- ${b.nombre} (${ejemplos}...): TOTAL ${fmt(b.total)} al recibir (producto ${fmt(PRECIO_PRODUCTO)} + envío ${fmt(b.flete)})`;
    })
    .join("\n");
}

module.exports = {
  BANDAS,
  BANDA_POR_DEFECTO,
  FLETE_2_OBSERVADO,
  PRECIO_PRODUCTO,
  PROMO_2_TOTAL,
  PROMO_2_UNIDADES,
  RECARGO_UNIDAD_EXTRA,
  bandaDe,
  cotizar,
  fmt,
  normalizar,
  tablaFletesTexto,
};
