/**
 * EL PRIMER MENSAJE NO SE IMPROVISA.
 *
 * DE DÓNDE SALE (23-sep, lo pidió el dueño): "analiza con los datos en la página
 * porque se caen porque no compran al final cómo podríamos mejorar esa conversión
 * para que el bot tenga un 10%".
 *
 * El dato que manda: en el export de 6.317 conversaciones, el 44,8% murió sin
 * que el cliente escribiera nada propio. Para casi la mitad del tráfico pagado,
 * el primer mensaje ES la venta entera. Y las dudas medidas dicen que talla
 * (17,8%) + color (10,3%) = 28,1%, tres veces y media el precio (8,1%).
 *
 * El guion ya lo decía. Pero se lo decía A UN MODELO, así que cada cliente
 * recibía una versión distinta. Acá queda blindado en código.
 *
 * 🔴 LO QUE ESTA PRUEBA CUIDA DE VERDAD: que el anuncio del COLMENA no reciba el
 * arranque del tradicional. Ese error ya estaba escrito y esta batería es la que
 * lo habría cazado — el texto fijo dice "S a 3XL" y "sin forro", y el Colmena va
 * de S a 2XL y su ventaja principal ES el forro.
 *
 *   node test-primer-mensaje.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-primer-mensaje";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;

const {
  respuestaDeArranque,
  esSaludoGenerico,
  esPrimerContacto,
  primerMensaje,
} = require("./src/primer-mensaje");
const { PRECIO_PRODUCTO, fmt } = require("./src/fletes");

let ok = 0;
let mal = 0;
function chequear(nombre, condicion, detalle) {
  if (condicion) {
    console.log(`✅ ${nombre}`);
    ok++;
  } else {
    console.log(`🔴 ${nombre}${detalle ? `\n     ${detalle}` : ""}`);
    mal++;
  }
}

const nuevo = [{ role: "user", content: "hola" }];
const arranque = primerMensaje();

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. El texto prerrellenado del anuncio SÍ dispara el arranque ──");

const prerrellenados = [
  "¡Hola! Quiero más información.",
  "Hola, quiero más información",
  "¡Hola! Quiero más información",
  "hola quiero mas informacion",
  "Hola, me interesa",
  "Me interesa",
  "Hola",
  "hola!",
  "Buenas",
  "Buenas tardes",
  "buenos dias",
  "Información",
  "info",
  "Quiero información",
];
for (const t of prerrellenados) {
  chequear(`"${t}" → arranque fijo`, respuestaDeArranque(nuevo, t) === arranque);
}

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 2. 🔴 El anuncio del COLMENA NO recibe el arranque del tradicional ──");

const delColmena = [
  "Hola, quiero información del impermeable tipo colmena",
  "hola quiero informacion del impermeable tipo colmena",
  "Hola, me interesa el colmena",
  "info colmena",
];
for (const t of delColmena) {
  chequear(`"${t}" → lo contesta la IA`, respuestaDeArranque(nuevo, t) === null);
}
chequear(
  "y el arranque fijo nunca menciona el colmena",
  !/colmena/i.test(arranque)
);
chequear(
  "ni promete forro (el tradicional NO lo tiene)",
  !/forro/i.test(arranque)
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Si preguntó algo concreto, contesta la IA ──");

const preguntasReales = [
  "Hola, cuánto vale?",
  "hola que precio tiene",
  "Buenas, hay talla XL?",
  "hola, el envío a Cali cuánto es",
  "Hola, tienen en rojo?",
  "me manda foto",
  "hola, precio al por mayor",
  "Buenas, cuánto cuesta el envío a Medellín?",
  "hola tienen catalogo",
  "y viene con guantes?",
];
for (const t of preguntasReales) {
  chequear(`"${t}" → lo contesta la IA`, respuestaDeArranque(nuevo, t) === null);
}

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 4. A mitad de charla NO se reinicia la venta ──");

const yaHablamos = [
  { role: "user", content: "¡Hola! Quiero más información." },
  { role: "assistant", content: arranque },
  { role: "user", content: "Bogotá" },
];
chequear(
  "un 'hola' después de que el bot ya contestó → lo maneja la IA",
  respuestaDeArranque(yaHablamos, "hola") === null
);
chequear(
  "el segundo mensaje del cliente tampoco dispara el arranque",
  respuestaDeArranque(yaHablamos, "quiero mas informacion") === null
);
chequear(
  "esPrimerContacto es false si el bot ya habló",
  esPrimerContacto(yaHablamos) === false
);
chequear(
  "esPrimerContacto es true con un solo mensaje del cliente",
  esPrimerContacto(nuevo) === true
);
chequear(
  "esPrimerContacto es true con el historial vacío",
  esPrimerContacto([]) === true
);
chequear("aguanta que no le pasen historial", esPrimerContacto(undefined) === true);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 5. El arranque responde las dudas medidas ──");

chequear("dice las tallas (duda #1, 17,8%)", /S a 3XL/.test(arranque));
chequear(
  "trae la recomendación de pedir una talla más",
  /una talla m[áa]s/i.test(arranque)
);
chequear(
  "explica POR QUÉ una talla más (va encima de la ropa)",
  /encima de la ropa/i.test(arranque)
);
chequear("dice que el impermeable es negro", /negro/i.test(arranque));
chequear(
  "NOMBRA los 6 colores de la franja (10,3%), no dice 'seis colores'",
  ["blanco", "negro", "rojo", "verde", "morado", "azul"].every((c) =>
    arranque.toLowerCase().includes(c)
  )
);
chequear(
  "no ofrece amarillo, que está agotado",
  !/amarillo/i.test(arranque)
);
chequear("dice el precio del conjunto", arranque.includes(fmt(PRECIO_PRODUCTO)));
chequear("dice que son 4 piezas", /4 piezas/.test(arranque));
chequear(
  "nombra las 4 piezas",
  ["chaqueta", "pantalón", "zapatones", "bolsa"].every((p) =>
    arranque.toLowerCase().includes(p)
  )
);
chequear("menciona la capota", /capota/i.test(arranque));
chequear("dice el material y el calibre", /PVC.*calibre 8/i.test(arranque));
chequear("dice que es termosellado", /termosellad/i.test(arranque));
chequear("dice que paga contraentrega", /contraentrega/i.test(arranque));

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 6. 🚨 La regla más importante: ni un precio de envío sin ciudad ──");

chequear(
  "dice que el envío va aparte",
  /m[áa]s el env[íi]o|\+ env[íi]o/i.test(arranque)
);
chequear(
  "NO da ninguna cifra de envío ni un total",
  !/(73|78|82|83|85|137|146|152|140|158)[.,]?000/.test(arranque)
);
chequear(
  "el único precio que aparece es el del conjunto",
  (arranque.match(/\$[\d.,]+/g) || []).length === 1
);
chequear("no da rangos ('desde', 'entre')", !/desde \$|entre \$/i.test(arranque));

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Pide UNA sola cosa, y es la ciudad ──");

const preguntas = (arranque.match(/\?/g) || []).length;
chequear(`tiene UNA sola pregunta (tiene ${preguntas})`, preguntas === 1);
chequear("y la pregunta es la ciudad", /qu[ée] ciudad/i.test(arranque));
chequear(
  "no pide talla, color y ciudad todo junto",
  !/¿.*talla.*\?.*¿/is.test(arranque)
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 8. No mete el gancho de 2 unidades acá ──");

chequear(
  "no habla de 2 conjuntos (eso va con la cotización, con el ahorro real)",
  !/2 conjuntos|dos conjuntos|segunda unidad|110[.,]?000/i.test(arranque)
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 9. Se lee como un chat, no como un folleto ──");

chequear("son mensajes cortos separados", arranque.includes("\n\n"));
const lineas = arranque.split("\n\n");
chequear(`no son más de 6 bloques (son ${lineas.length})`, lineas.length <= 6);
const masLarga = Math.max(...lineas.map((l) => l.length));
chequear(
  `ningún bloque pasa de 160 caracteres (el mayor tiene ${masLarga})`,
  masLarga <= 160
);
chequear(
  "cabe en un mensaje de WhatsApp (menos de 1024 caracteres)",
  arranque.length < 1024
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 10. Casos borde: que no explote ni se dispare de más ──");

chequear("texto vacío → IA", respuestaDeArranque(nuevo, "") === null);
chequear("solo espacios → IA", respuestaDeArranque(nuevo, "   ") === null);
chequear("null → IA", respuestaDeArranque(nuevo, null) === null);
chequear("undefined → IA", respuestaDeArranque(nuevo, undefined) === null);
chequear("solo emojis → IA", respuestaDeArranque(nuevo, "🏍️🏍️") === null);
chequear(
  "un párrafo largo que empieza con hola → IA",
  respuestaDeArranque(
    nuevo,
    "hola buenas tardes le escribo porque vi el anuncio y queria saber si todavia tienen disponible"
  ) === null
);
chequear(
  "esSaludoGenerico no se traga una frase larga",
  esSaludoGenerico("hola hola hola hola hola hola hola hola hola") === false
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 11. El agente lo usa de verdad (no quedó cableado a medias) ──");

const agente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
chequear(
  "agent.js importa el módulo",
  /require\(["']\.\/primer-mensaje["']\)/.test(agente)
);
chequear("agent.js llama a respuestaDeArranque", agente.includes("respuestaDeArranque("));
const iPrimero = agente.indexOf("respuestaDeArranque(");
const iIA = agente.indexOf("await callIA(");
chequear(
  "y lo llama ANTES de la IA (así sale instantáneo y gratis)",
  iPrimero > 0 && iIA > 0 && iPrimero < iIA,
  `arranque en ${iPrimero}, callIA en ${iIA}`
);
chequear(
  "guarda la respuesta en el historial (si no, la IA pierde el hilo)",
  /store\.pushMsg\(phone, "assistant", arranque\)/.test(agente)
);
chequear(
  "devuelve la misma forma que el camino normal",
  /reply: arranque, order: null, handoff: false, media: \[\], pedidoRescatado: false/.test(
    agente
  )
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
console.log(arranque);
console.log("");
process.exit(mal === 0 ? 0 : 1);
