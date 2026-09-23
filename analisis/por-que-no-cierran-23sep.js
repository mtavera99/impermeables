/**
 * POR QUE NO CIERRAN — 23-sep-2026
 *
 * DE DONDE SALE: el 23-sep medimos que el bot engancha IGUAL que el agente viejo
 * (48% se va sin volver a escribir, contra 44,8% del viejo: la misma cosa) pero
 * de los que enganchan cierra 1,7 veces menos. O sea: la fuga esta DESPUES del
 * saludo, en la cotizacion y en el cierre. Vale ~$204.547/dia.
 *
 * Lo que el dueño pidio desde el principio y nunca se habia podido hacer:
 *   "todas las cosas que funcionaban que tu encontraste como un patron algo
 *    que funciona para vender todo eso lo trajeramos al nuevo"
 *
 * Este script contesta UNA pregunta: en las conversaciones que SI cerraron,
 * ¿que se hizo distinto que en las que no?
 *
 * 🔴 PRIVACIDAD: lee datos-privados/export/ que tiene nombres, telefonos y
 * direcciones reales. SOLO imprime agregados y frases del NEGOCIO (nunca del
 * cliente, nunca un dato personal). datos-privados/ esta en .gitignore.
 *
 * ⚠️ El export no trae timestamps: no se puede medir tiempo de respuesta.
 * "Se cayo aca" significa "la conversacion termina aca", no "espero X minutos".
 *
 *   node analisis/por-que-no-cierran-23sep.js
 */

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "datos-privados", "export", "conversations");
if (!fs.existsSync(DIR)) {
  console.error("🔴 No existe " + DIR);
  console.error("   Descomprimi el export en datos-privados/export/ y volve a correr.");
  process.exit(1);
}

const LINEA = "═".repeat(78);
const titulo = (t) => {
  console.log("\n" + LINEA);
  console.log(t);
  console.log(LINEA);
};
const pct = (a, b) => (b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "—");

function limpiar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// El texto prerrellenado del anuncio: no cuenta como que el cliente hablo.
const RE_PRERRELLENADO = /^¡?hola!?,?\s*(quiero mas informacion|me interesa)\.?$/i;

// ───────────────────────────────────────────────────────────────────────────
// 🔴 COTIZAR NO ES "DECIR UN PRECIO" — ESTE ERROR YA ESTABA MEDIDO MAL
//
// La primera version de este script (y bot/src/embudo.js) detectaban cotizacion
// con /\$\s?\d{2,3}\.\d{3}/. Esa expresion tambien engancha el "$59.900" del
// PRODUCTO, que el agente dice en su PRIMER mensaje, siempre, antes de saber la
// ciudad. Resultado: el 97,1% aparecia como "cotizado" y el precio parecia
// llegar en el mensaje 1. Los dos numeros eran falsos.
//
// Un TOTAL de verdad incluye el envio y depende de la ciudad. El mas barato que
// existe es $73.000 (banda A), y con el precio de rescate de $3.000 el piso
// baja a $70.000. El producto solo son $59.900. Asi que el corte esta en
// $70.000: arriba es total con envio, abajo es el precio del producto.
// ───────────────────────────────────────────────────────────────────────────
const PISO_TOTAL = 70000;

function montos(texto) {
  const out = [];
  for (const m of String(texto).matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+)/g)) {
    out.push(Number(m[1].replace(/[.,]/g, "")));
  }
  return out;
}

const dioTotal = (texto) => montos(texto).some((n) => n >= PISO_TOTAL);

const RE_BLOQUE = /confirmemos tu pedido/i;
const RE_CONFIRMA = /^(si\s*confirmo|si|confirmo|listo|dale|ok|correcto|asi es|todo bien|perfecto|de acuerdo)\b/;

// ───────────────────────────────────────────────────────────────────────────
// Parseo: cada archivo es una conversacion, con turnos etiquetados.
// ───────────────────────────────────────────────────────────────────────────
function parsear(texto) {
  const turnos = [];
  const adIds = [];
  let ultimo = null;

  for (const linea of texto.split("\n")) {
    if (linea.startsWith("Context:")) {
      // 🔴 regex, NO JSON.parse: los ad_id pasan MAX_SAFE_INTEGER y se corrompen
      const m = linea.match(/"ad_id"\s*:\s*"?(\d+)"?/);
      if (m) adIds.push(m[1]);
      continue;
    }
    if (linea.startsWith("You:")) {
      ultimo = { quien: "cliente", texto: linea.slice(4).trim() };
      turnos.push(ultimo);
      continue;
    }
    const mb = linea.match(/^(?:Bot|Business):(.*)$/);
    if (mb) {
      ultimo = { quien: "negocio", texto: mb[1].trim() };
      turnos.push(ultimo);
      continue;
    }
    // Linea de continuacion del turno anterior (los bloques van multilinea)
    if (ultimo && linea.trim()) ultimo.texto += "\n" + linea.trim();
  }
  return { turnos, adIds };
}

function analizar(texto) {
  const { turnos, adIds } = parsear(texto);
  const cliente = turnos.filter((t) => t.quien === "cliente");
  const negocio = turnos.filter((t) => t.quien === "negocio");

  const propios = cliente.filter((t) => !RE_PRERRELLENADO.test(limpiar(t.texto)));
  const textoNegocio = negocio.map((t) => t.texto).join("\n");

  const cotizo = dioTotal(textoNegocio);
  const llegoBloque = RE_BLOQUE.test(textoNegocio);

  // Confirmo = despues de ver el bloque, el cliente dijo que si.
  let confirmo = false;
  let vistoBloque = false;
  for (const t of turnos) {
    if (t.quien === "negocio" && RE_BLOQUE.test(t.texto)) vistoBloque = true;
    else if (t.quien === "cliente" && vistoBloque && RE_CONFIRMA.test(limpiar(t.texto)))
      confirmo = true;
  }

  return {
    turnos,
    cliente,
    negocio,
    propios,
    engancho: propios.length > 0,
    cotizo,
    llegoBloque,
    confirmo,
    // 🔑 ¿quien hablo al final? Si termina hablando el CLIENTE, el negocio
    // NUNCA LE CONTESTO: es un lead que se dejo colgado, no uno que se fue.
    ultimoTurno: turnos.length ? turnos[turnos.length - 1].quien : null,
    ultimoDelNegocio: negocio.length ? negocio[negocio.length - 1].texto : "",
    ultimoDelCliente: cliente.length ? cliente[cliente.length - 1].texto : "",
    adIds,
  };
}

// ───────────────────────────────────────────────────────────────────────────
console.log("Leyendo el export...");
const archivos = fs.readdirSync(DIR).filter((f) => f.endsWith(".txt"));
const convs = archivos.map((f) => analizar(fs.readFileSync(path.join(DIR, f), "utf8")));
console.log(`${convs.length} conversaciones leidas.`);

const engancharon = convs.filter((c) => c.engancho);
const cotizados = engancharon.filter((c) => c.cotizo);
const conBloque = engancharon.filter((c) => c.llegoBloque);
const cerraron = engancharon.filter((c) => c.confirmo);

// ═══════════════════════════════════════════════════════════════════════════
titulo("1. EL EMBUDO REAL DEL AGENTE VIEJO");

const filas = [
  ["Entraron del anuncio", convs.length, null],
  ["Escribieron algo propio", engancharon.length, convs.length],
  ["Recibieron un total (cotizados)", cotizados.length, engancharon.length],
  ["Llegaron al bloque de cierre", conBloque.length, cotizados.length],
  ["Confirmaron el pedido", cerraron.length, conBloque.length],
];
console.log(`\n  ${"etapa".padEnd(34)}${"n".padStart(7)}${"pasan".padStart(9)}${"se caen".padStart(10)}`);
console.log("  " + "─".repeat(60));
for (const [nombre, n, base] of filas) {
  const pasan = base ? pct(n, base) : "—";
  const caen = base ? String(base - n) : "—";
  console.log(`  ${nombre.padEnd(34)}${String(n).padStart(7)}${pasan.padStart(9)}${caen.padStart(10)}`);
}
console.log("  " + "─".repeat(60));
console.log(`\n  cierre sobre TODAS las conversaciones: ${pct(cerraron.length, convs.length)}`);
console.log(`  cierre sobre las que engancharon:      ${pct(cerraron.length, engancharon.length)}`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("2. 🔴 CUANTOS LEADS SE DEJARON COLGADOS (nadie les contesto)");

const colgados = engancharon.filter((c) => c.ultimoTurno === "cliente");
const colgadosCotizados = colgados.filter((c) => c.cotizo);

console.log(`
  Si la conversacion TERMINA con el cliente hablando, es que nadie le respondio.
  Eso no es un cliente que se fue: es una venta que se dejo caer.
`);
console.log(`  conversaciones que terminan hablando el CLIENTE:  ${colgados.length}  (${pct(colgados.length, engancharon.length)} de las que engancharon)`);
console.log(`  ...y de esas, ya habian recibido el precio:       ${colgadosCotizados.length}  (${pct(colgadosCotizados.length, colgados.length)})`);
console.log(`  conversaciones que terminan hablando el NEGOCIO:  ${engancharon.length - colgados.length}  (el cliente se quedo callado)`);

const MARGEN_UD = 23244;
console.log(`
  🔑 Los ${colgadosCotizados.length} que ya tenian el precio y quedaron sin respuesta son la
     lista mas caliente que existe. Si 1 de cada 5 hubiera cerrado:
     ${Math.round(colgadosCotizados.length * 0.2)} pedidos = $${(Math.round(colgadosCotizados.length * 0.2) * MARGEN_UD).toLocaleString("es-CO")} que ya estaban pagados en pauta.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("3. QUE DIJO EL CLIENTE JUSTO ANTES DE IRSE (los que NO cerraron)");

// Categorias de lo ULTIMO que dijo el cliente. El orden IMPORTA: se toma la
// primera que coincide, asi que lo mas especifico va arriba.
const CATS = [
  // 🔑 Esta categoria es la mas importante y en la primera version faltaba:
  // el que alcanzo a dar direccion o nombre YA estaba comprando. Si se cayo
  // ahi, no es una objecion: es que el cierre se rompio.
  ["dio datos (cerrando)", /(calle|carrera|\bcra\b|\bcl\b|avenida|\bav\b|barrio|manzana|\bmz\b|conjunto residencial|apto|apartamento|casa |#\s?\d|nro|numero \d|cedula|\bcc\b|mi nombre|me llamo)/],
  ["dijo una ciudad", /(bogota|medellin|cali|barranquilla|cartagena|cucuta|bucaramanga|pereira|manizales|ibague|santa marta|villavicencio|pasto|monteria|neiva|armenia|popayan|sincelejo|valledupar|tunja|riohacha|quibdo|florencia|yopal|utopia|soledad|soacha|envigado|itagui|bello|palmira|tulua|buenaventura|girardot|apartado|arjona|la ceja)/],
  ["talla", /(talla|tallas|medida|estatura|mido|kilos|\bpeso\b|\bxl\b|\bxxl\b|\b3xl\b|\bsm\b)/],
  ["color", /(color|colores|franja|reflectiv|rojo|verde|azul|negro|blanco|morado|amarillo)/],
  ["foto / catalogo", /(foto|fotos|imagen|imagenes|video|catalogo|ver mas|muestrame|mandame)/],
  ["envio / demora", /(cuanto llega|cuando llega|demora|cuanto tarda|\bdias\b|envio|flete|domicilio|transportadora|guia|rastreo)/],
  ["precio / caro", /(muy caro|esta caro|\bcaro\b|rebaja|descuento|mas barato|no me alcanza|economico|ultimo precio|precio final)/],
  ["pago", /(pago|pagar|contraentrega|contra entrega|nequi|transferencia|efectivo|tarjeta|daviplata|bancolombia)/],
  ["desconfianza", /(estafa|estafar|seguro|confiar|confianza|de verdad|es real|garantia|devolucion|reembolso|cambio de talla)/],
  ["lo voy a pensar", /(lo pienso|voy a pensar|pensarlo|mas tarde|luego te|te escribo|te aviso|te confirmo|manana|la proxima|despues)/],
  ["mayorista", /(por mayor|mayorista|docena|revender|para vender|cantidad)/],
  ["dijo que si", /^(si|sii+|claro|listo|dale|ok|okey|bueno|vale|de acuerdo|correcto|perfecto|asi es|confirmo)\b/],
  ["solo gracias", /^(gracias|muchas gracias|mil gracias|ok gracias|listo gracias)\b/],
];

function categoria(texto) {
  const t = limpiar(texto);
  if (!t) return "(vacio)";
  const cat = CATS.find(([, re]) => re.test(t));
  return cat ? cat[0] : "(otra cosa)";
}

function tabla(grupo, titulo) {
  console.log(`\n  ${titulo} — ${grupo.length} conversaciones\n`);
  const conteo = new Map();
  let preguntas = 0;
  for (const c of grupo) {
    const k = categoria(c.ultimoDelCliente);
    conteo.set(k, (conteo.get(k) || 0) + 1);
    if (c.ultimoDelCliente.includes("?")) preguntas++;
  }
  const orden = [...conteo.entries()].sort((a, b) => b[1] - a[1]);
  for (const [nombre, n] of orden) {
    const barra = "█".repeat(Math.round((n / grupo.length) * 50));
    console.log(`  ${nombre.padEnd(22)}${String(n).padStart(6)} ${pct(n, grupo.length).padStart(7)}  ${barra}`);
  }
  console.log(`\n  🔑 de esas, el ultimo mensaje del cliente era una PREGUNTA: ${preguntas} (${pct(preguntas, grupo.length)})`);
  return preguntas;
}

const perdidos = engancharon.filter((c) => !c.confirmo);

// La fuga mas grande del embudo: recibieron el total y nunca llegaron al cierre.
const perdidosPostPrecio = cotizados.filter((c) => !c.llegoBloque);
// La segunda: engancharon y nunca les dieron un total.
const perdidosSinPrecio = engancharon.filter((c) => !c.cotizo);

tabla(perdidosPostPrecio, "🔴 LA FUGA GRANDE: recibieron el total y NO llegaron al cierre");
tabla(perdidosSinPrecio, "LA SEGUNDA: engancharon y nunca recibieron un total");

// ═══════════════════════════════════════════════════════════════════════════
titulo("4. LARGO DE LA CONVERSACION: ¿cerrar toma mas o menos mensajes?");

const prom = (arr, f) => (arr.length ? arr.reduce((s, x) => s + f(x), 0) / arr.length : 0);

console.log(`\n  ${"grupo".padEnd(28)}${"msg cliente".padStart(13)}${"msg negocio".padStart(13)}`);
console.log("  " + "─".repeat(54));
const grupos = [
  ["cerraron", cerraron],
  ["cotizados que no cerraron", cotizados.filter((c) => !c.confirmo)],
  ["engancharon, sin cotizar", engancharon.filter((c) => !c.cotizo)],
];
for (const [nombre, g] of grupos) {
  console.log(
    `  ${nombre.padEnd(28)}${prom(g, (c) => c.cliente.length).toFixed(1).padStart(13)}${prom(g, (c) => c.negocio.length).toFixed(1).padStart(13)}`
  );
}

// ═══════════════════════════════════════════════════════════════════════════
titulo("5. ¿EN QUE MENSAJE APARECE EL PRECIO? (cerraron vs no)");

function turnoDelPrecio(c) {
  let i = 0;
  for (const t of c.turnos) {
    if (t.quien === "negocio") {
      i++;
      if (dioTotal(t.texto)) return i;
    }
  }
  return null;
}

const tpCerraron = cerraron.map(turnoDelPrecio).filter((x) => x);
const tpPerdidos = cotizados.filter((c) => !c.confirmo).map(turnoDelPrecio).filter((x) => x);
const mediana = (a) => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
};

console.log(`
  En que mensaje del NEGOCIO aparecio el total por primera vez:
`);
console.log(`  cerraron .................. promedio ${prom(tpCerraron, (x) => x).toFixed(1)}   mediana ${mediana(tpCerraron)}`);
console.log(`  cotizados que no cerraron . promedio ${prom(tpPerdidos, (x) => x).toFixed(1)}   mediana ${mediana(tpPerdidos)}`);
console.log(`
  ⚠️⚠️ NO SE PUEDE CONCLUIR NADA DE ESTAS DOS LINEAS, Y HAY QUE DECIRLO.

  Los que cierran hablan mucho mas (14,8 mensajes contra 5,3). En una charla
  larga el precio cae mas tarde POR ARITMETICA, no por estrategia. Comparar el
  numero de turno crudo es comparar conversaciones de distinto largo.

  Abajo va la version que si se puede leer: el cierre segun en que turno cayo
  el precio. Igual sigue siendo correlacion — el cliente interesado pregunta
  mas antes de llegar al precio — pero al menos no esta contaminada por el largo.
`);

// Cierre segun el turno en que aparecio el precio. Se mira sobre los COTIZADOS,
// que son los unicos que tienen turno de precio.
const baldes = [
  ["turno 1-2", (x) => x <= 2],
  ["turno 3-4", (x) => x >= 3 && x <= 4],
  ["turno 5-6", (x) => x >= 5 && x <= 6],
  ["turno 7-9", (x) => x >= 7 && x <= 9],
  ["turno 10+", (x) => x >= 10],
];
console.log(`  ${"precio llego en".padEnd(18)}${"conv".padStart(7)}${"cerraron".padStart(10)}${"cierre".padStart(9)}`);
console.log("  " + "─".repeat(44));
for (const [nombre, test] of baldes) {
  const g = cotizados.filter((c) => {
    const t = turnoDelPrecio(c);
    return t && test(t);
  });
  const cc = g.filter((c) => c.confirmo).length;
  console.log(`  ${nombre.padEnd(18)}${String(g.length).padStart(7)}${String(cc).padStart(10)}${pct(cc, g.length).padStart(9)}`);
}

// ═══════════════════════════════════════════════════════════════════════════
titulo("5-B. QUE HAY EN EL '(OTRA COSA)' — las palabras que mas se repiten");

console.log(`
  El 45% de los ultimos mensajes no cae en ninguna categoria. En vez de
  inventar mas categorias a ciegas, se cuentan las palabras.

  🔒 Para no exponer datos de nadie: solo se muestran palabras que aparecen en
  20 conversaciones DISTINTAS o mas. Un nombre o una direccion no llega a eso.
`);

const STOP = new Set(("de la el en y a los las un una que es por para con no me te se lo " +
  "mi su al del si ya pero como mas o e u si esta este esa ese estoy soy son " +
  "hay muy tu usted le nos va voy vas ir")
  .split(" "));

const frec = new Map();
for (const c of perdidosPostPrecio) {
  if (categoria(c.ultimoDelCliente) !== "(otra cosa)") continue;
  const vistas = new Set();
  for (const w of limpiar(c.ultimoDelCliente).split(/[^a-zñ]+/)) {
    if (w.length < 3 || STOP.has(w) || vistas.has(w)) continue;
    vistas.add(w);
    frec.set(w, (frec.get(w) || 0) + 1);
  }
}
const top = [...frec.entries()].filter(([, n]) => n >= 20).sort((a, b) => b[1] - a[1]).slice(0, 25);
console.log(`  ${"palabra".padEnd(16)}${"conversaciones".padStart(16)}`);
console.log("  " + "─".repeat(32));
for (const [w, n] of top) console.log(`  ${w.padEnd(16)}${String(n).padStart(16)}`);
if (top.length === 0) console.log("  (ninguna palabra llega a 20 conversaciones)");

// ═══════════════════════════════════════════════════════════════════════════
titulo("6. EL GANCHO DE 2 UNIDADES EN EL EXPORT");

const RE_DOS = /(2 conjuntos|dos conjuntos|segunda unidad|llevando 2|llevas 2|2 unidades|110\.000|\$110)/i;
const ofrecieron2 = engancharon.filter((c) => RE_DOS.test(c.negocio.map((t) => t.texto).join("\n")));
const cerraronCon2 = ofrecieron2.filter((c) => c.confirmo);
const sinOferta = engancharon.filter((c) => !RE_DOS.test(c.negocio.map((t) => t.texto).join("\n")));
const cerraronSin2 = sinOferta.filter((c) => c.confirmo);

console.log(`\n  ${"".padEnd(26)}${"conv".padStart(8)}${"cerraron".padStart(10)}${"cierre".padStart(9)}`);
console.log("  " + "─".repeat(53));
console.log(`  ${"le ofrecieron 2 uds".padEnd(26)}${String(ofrecieron2.length).padStart(8)}${String(cerraronCon2.length).padStart(10)}${pct(cerraronCon2.length, ofrecieron2.length).padStart(9)}`);
console.log(`  ${"NO se lo ofrecieron".padEnd(26)}${String(sinOferta.length).padStart(8)}${String(cerraronSin2.length).padStart(10)}${pct(cerraronSin2.length, sinOferta.length).padStart(9)}`);
console.log(`
  ⚠️ OJO: esto NO prueba que ofrecer 2 haga cerrar. Es al revés tambien: al que
  ya venia interesado se le ofrecia mas. Correlacion, no causa. Sirve para saber
  cuantas veces se uso, no para concluir que funciona.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("7. PREGUNTAS DEL NEGOCIO: ¿los que cerraron recibieron mas preguntas?");

const preguntas = (c) => c.negocio.filter((t) => t.texto.includes("?")).length;
console.log(`
  El guion del bot nuevo dice "SIEMPRE termina con una pregunta que avanza la
  venta". Esto mide si el agente viejo lo hacia, y si se relaciona con cerrar.
`);
console.log(`  cerraron .................. ${prom(cerraron, preguntas).toFixed(1)} mensajes con pregunta`);
console.log(`  cotizados que no cerraron . ${prom(cotizados.filter((c) => !c.confirmo), preguntas).toFixed(1)}`);
console.log(`  engancharon, sin cotizar .. ${prom(engancharon.filter((c) => !c.cotizo), preguntas).toFixed(1)}`);

const sinNinguna = engancharon.filter((c) => preguntas(c) === 0);
console.log(`\n  🔴 conversaciones donde el negocio NUNCA hizo una pregunta: ${sinNinguna.length} (${pct(sinNinguna.length, engancharon.length)})`);
console.log(`     de esas cerraron: ${sinNinguna.filter((c) => c.confirmo).length}`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("8. LO QUE ESTO DICE, Y LO QUE NO");

const MARGEN = 23244;
const valorFuga = (n) => "$" + (n * MARGEN).toLocaleString("es-CO");

console.log(`
  LAS DOS FUGAS, EN ORDEN DE TAMAÑO:

  1. ${perdidosPostPrecio.length} recibieron el total y no llegaron al cierre.
     De esos, ${perdidosPostPrecio.filter((c) => categoria(c.ultimoDelCliente) === "dijo una ciudad").length} tienen como ULTIMO mensaje su ciudad: dijeron donde
     viven, recibieron el total, y no volvieron a escribir nunca. Ese es el
     momento exacto en que se pierde la venta.

  2. ${perdidosSinPrecio.length} hablaron y NUNCA recibieron un total.
     ${perdidosSinPrecio.filter((c) => categoria(c.ultimoDelCliente) === "dijo una ciudad").length} de ellos dijeron una ciudad y aun asi no les cotizaron.
     Esos no son una objecion: es trabajo sin terminar.

  LO QUE SI SE PUEDE AFIRMAR:

  · El cierre del agente SOLO, contando confirmacion explicita, fue
    ${pct(cerraron.length, convs.length)} sobre todas las conversaciones y ${pct(cerraron.length, engancharon.length)} sobre las que engancharon.
  · Cuando se llega al bloque de cierre, ${pct(cerraron.length, conBloque.length)} confirma. El cuadro de
    confirmacion NO es el problema: el problema es llegar hasta el.
  · ${colgados.length} conversaciones terminan hablando el cliente, o sea que nadie le
    contesto. ${colgadosCotizados.length} de esas ya tenian el precio encima.

  LO QUE NO SE PUEDE AFIRMAR — Y NO HAY QUE ACTUAR COMO SI SE PUDIERA:

  ⚠️ Que ofrecer 2 unidades haga cerrar. Los que recibieron la oferta cierran
     18,3% contra 6,8%, pero al cliente que ya venia caliente se le ofrecia mas.
     Es correlacion al revés, no causa.
  ⚠️ Que cotizar tarde haga cerrar. El cierre sube del 10,2% al 21,0% segun el
     turno del precio, pero el cliente interesado naturalmente pregunta mas
     antes de llegar al precio. Mismo problema.
  ⚠️ Que el precio sea la objecion principal. Solo ${perdidosPostPrecio.filter((c) => categoria(c.ultimoDelCliente) === "precio / caro").length} de ${perdidosPostPrecio.length} de los que se
     cayeron despues del total mencionaron que estaba caro. El silencio no dice
     "esta caro": dice "no me diste razon para seguir".

  LO UNICO QUE FALTA PARA CERRAR EL DIAGNOSTICO:

  El export no trae timestamps, asi que no se puede medir cuanto tardaba la
  respuesta. El bot nuevo SI puede medirlo. Esa es la unica pregunta que este
  analisis no puede contestar y que importa.
`);

console.log(LINEA);
console.log("Fin. Ningun dato personal salio de datos-privados/.");
console.log(LINEA + "\n");
