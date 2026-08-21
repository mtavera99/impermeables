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
    nombre: "Bogotá y sabana",
    flete: 12871,
    total: 73000,
    ciudades: ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA", "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"],
  },
  B: {
    nombre: "Boyacá, Casanare y Meta cercano",
    flete: 16843,
    total: 77000,
    ciudades: ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO", "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS"],
  },
  C: {
    nombre: "Capitales grandes",
    flete: 20771,
    total: 81000,
    ciudades: ["MEDELLIN", "CALI", "BARRANQUILLA", "SOLEDAD", "CARTAGENA", "CARTAGENA DE INDIAS", "PEREIRA", "MANIZALES", "BARRANCABERMEJA", "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA"],
  },
  D: {
    nombre: "Ciudades intermedias",
    flete: 22870,
    total: 83000,
    ciudades: ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES", "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS", "SAMACA", "CUCUTA", "PASTO", "VALLEDUPAR", "SINCELEJO", "QUIBDO", "RIOHACHA"],
  },
  E: {
    nombre: "Pueblos y zona extendida",
    flete: 25029,
    total: 85000,
    ciudades: ["GUACHENE", "GOMEZ PLATA", "ALGECIRAS", "REMEDIOS", "TUQUERRES", "TURBO", "PUERTO GAITAN", "ANSERMA", "LA UNION", "EL SANTUARIO", "LLORENTE", "SAN CARLOS DE GUAROA", "BUENAVISTA", "SAN GIL", "INZA", "MALAGA", "CAUCASIA", "SANTA ROSA DE CABAL"],
  },
};

// Si la ciudad no está en ninguna lista, se asume la banda MÁS CARA.
// Antes el default era $18.000 y se quedaba corto en todos los pueblos, que son
// justo los destinos que no aparecen en ninguna lista. Errar hacia arriba cuesta
// una objeción de precio; errar hacia abajo cuesta $4.900 de margen por venta.
const BANDA_POR_DEFECTO = "E";

// Recargo de flete por unidad adicional en el mismo pedido.
// Observado en 5 pedidos de 2 unidades: el flete NO se duplica, sube entre
// $6.838 y $15.089. Se usa el techo observado para no volver a absorber.
// ⚠️ Estimado con 5 guías: revisar cuando haya más pedidos multi-unidad.
const RECARGO_UNIDAD_EXTRA = 15100;

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

  const flete = banda.flete + (uds - 1) * RECARGO_UNIDAD_EXTRA;
  // Para 1 unidad se usa el total ya redondeado de la banda. Para más unidades
  // se recalcula y se redondea al millar hacia arriba.
  const total =
    uds === 1
      ? banda.total
      : Math.ceil((PRECIO_PRODUCTO * uds + flete) / 1000) * 1000;

  return {
    banda: clave || BANDA_POR_DEFECTO,
    nombreBanda: banda.nombre,
    flete,
    total,
    unidades: uds,
    reconocida,
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
  PRECIO_PRODUCTO,
  RECARGO_UNIDAD_EXTRA,
  bandaDe,
  cotizar,
  fmt,
  normalizar,
  tablaFletesTexto,
};
