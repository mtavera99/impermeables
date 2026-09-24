/**
 * ¿EL PRECIO DEL COMBO ESTÁ FRENANDO VENTAS? — 23-sep
 *
 * LO QUE PLANTEÓ EL DUEÑO, viendo chats reales:
 *
 *   "me fijé en otros chats que hacías paquetes de 158.000, o sea envíos de 2 U,
 *    súper carísimo. Creo que es tener una regla que dice que no ofrezca el combo
 *    de 110.000 si el cliente no está hablando del combo. Pero analiza muy bien,
 *    porque si no, mejor dar cuando una persona pida el combo de dos un buen
 *    precio de 110.000 y el valor del envío, y quizás podamos vender más...
 *    ¿el precio de venta es el limitante ahorita, cierto?"
 *
 * Son TRES preguntas distintas y hay que separarlas, porque tienen respuestas
 * distintas:
 *
 *   1. ¿Ofrecer el combo sin que lo pidan espanta al cliente?
 *   2. ¿El total del combo (hasta $158.000) frena el cierre?
 *   3. ¿El precio es EL limitante hoy?
 *
 * 🔴 PRIVACIDAD: lee datos-privados/ (gitignored). Solo imprime agregados.
 *
 *   node analisis/el-combo-asusta-23sep.js
 */

const embudo = require("../bot/src/embudo.js");
const fletes = require("../bot/src/fletes.js");
const lib = require("./lib-export.js");

const LINEA = "═".repeat(78);
const titulo = (t) => {
  console.log("\n" + LINEA);
  console.log(t);
  console.log(LINEA);
};
const pct = (a, b) => (b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "—");
const $ = (n) => "$" + Math.round(n).toLocaleString("es-CO");

// ── Quién habló primero de llevar dos ──────────────────────────────────────
// Del CLIENTE: pregunta por dos, o por el combo.
const RE_DOS_CLIENTE =
  /\b(los dos|las dos|el combo|combo|dos conjuntos|2 conjuntos|dos unidades|2 unidades|dos trajes|2 trajes|llevar dos|llevar 2|dos completos|una pareja|para mi esposa|para mi esposo|para los dos)\b/;
// Del NEGOCIO: el gancho del envío compartido.
const RE_DOS_NEGOCIO =
  /\b(si llevas dos|si llevas 2|llevando dos|llevando 2|dos conjuntos|2 conjuntos|un solo envio|mismo paquete|segunda unidad|promo de dos|promo de 2)\b/;

// Montos: 1 unidad va de 70.000 a 100.000; el combo, arriba de 110.000.
const PISO_1 = 70000;
const PISO_2 = 110000;

function montos(texto) {
  const out = [];
  for (const m of String(texto).matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+)/g)) {
    out.push(Number(m[1].replace(/[.,]/g, "")));
  }
  return out;
}

console.log("Leyendo el export...");
const conversaciones = lib.leerTodas();

const datos = [];
for (const { turnos } of conversaciones) {
  if (!lib.engancho(turnos)) continue;

  let quienPrimero = null; // "cliente" | "negocio" | null
  let totalCombo = null;
  let total1 = null;
  let ultimoCliente = "";

  for (const t of turnos) {
    const limpio = lib.limpiar(t.texto);
    if (!quienPrimero) {
      if (t.quien === "cliente" && RE_DOS_CLIENTE.test(limpio)) quienPrimero = "cliente";
      else if (t.quien === "negocio" && RE_DOS_NEGOCIO.test(limpio)) quienPrimero = "negocio";
    }
    if (t.quien === "negocio") {
      for (const m of montos(t.texto)) {
        if (m >= PISO_2 && totalCombo == null) totalCombo = m;
        else if (m >= PISO_1 && m < PISO_2 && total1 == null) total1 = m;
      }
    }
    if (t.quien === "cliente" && t.texto.trim()) ultimoCliente = t.texto;
  }

  datos.push({
    quienPrimero,
    totalCombo,
    total1,
    cerro: lib.confirmo(turnos),
    ultimoCliente,
    mensajesCliente: turnos.filter((t) => t.quien === "cliente").length,
  });
}

console.log(`${datos.length} conversaciones con cliente que escribió algo propio.`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("1. ¿OFRECER EL COMBO SIN QUE LO PIDAN ESPANTA AL CLIENTE?");

const grupos = [
  ["el CLIENTE preguntó por dos", datos.filter((d) => d.quienPrimero === "cliente")],
  ["el BOT lo ofreció primero", datos.filter((d) => d.quienPrimero === "negocio")],
  ["nunca se habló de dos", datos.filter((d) => d.quienPrimero === null)],
];

console.log(`\n  ${"quién sacó el tema".padEnd(30)}${"conv".padStart(7)}${"cerraron".padStart(10)}${"cierre".padStart(9)}`);
console.log("  " + "─".repeat(56));
for (const [nombre, g] of grupos) {
  const c = g.filter((d) => d.cerro).length;
  console.log(`  ${nombre.padEnd(30)}${String(g.length).padStart(7)}${String(c).padStart(10)}${pct(c, g.length).padStart(9)}`);
}

const cli = grupos[0][1];
const bot = grupos[1][1];
const nada = grupos[2][1];
const cCli = cli.filter((d) => d.cerro).length;
const cBot = bot.filter((d) => d.cerro).length;
const cNada = nada.filter((d) => d.cerro).length;

console.log(`
  🔑 LA RESPUESTA A TU PRIMERA PREGUNTA:

  Cuando el BOT saca el tema de los dos, cierra ${pct(cBot, bot.length)}.
  Cuando NO se habla de dos, cierra ${pct(cNada, nada.length)}.

  ${
    cBot / Math.max(bot.length, 1) > cNada / Math.max(nada.length, 1)
      ? "→ Ofrecerlo NO espanta: cierra MEJOR que no mencionarlo.\n     Poner la regla de 'no ofrecer si no lo piden' costaría ventas."
      : "→ Ofrecerlo cierra PEOR que no mencionarlo: tu instinto acierta."
  }

  Y cuando el CLIENTE es el que pregunta por dos, cierra ${pct(cCli, cli.length)} — ${(
  cCli / Math.max(cli.length, 1) / Math.max(cNada / Math.max(nada.length, 1), 0.0001)
).toFixed(1)} veces
  más que el promedio de los que no hablan de dos. Ese cliente viene caliente.

  ⚠️ CORRELACIÓN, NO CAUSA: al cliente interesado se le ofrecía más. Pero sirve
  para lo que preguntaste: NO hay señal de que ofrecerlo haga daño.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("2. ¿EL TOTAL DEL COMBO FRENA EL CIERRE? (por monto cotizado)");

const conCombo = datos.filter((d) => d.totalCombo != null);
console.log(`\n  ${conCombo.length} conversaciones recibieron un total de combo.\n`);

const baldes = [
  ["hasta $130.000", (x) => x <= 130000],
  ["$131.000 a $140.000", (x) => x > 130000 && x <= 140000],
  ["$141.000 a $150.000", (x) => x > 140000 && x <= 150000],
  ["$151.000 a $160.000", (x) => x > 150000 && x <= 160000],
  ["más de $160.000", (x) => x > 160000],
];
console.log(`  ${"total del combo".padEnd(24)}${"conv".padStart(7)}${"cerraron".padStart(10)}${"cierre".padStart(9)}`);
console.log("  " + "─".repeat(50));
for (const [nombre, test] of baldes) {
  const g = conCombo.filter((d) => test(d.totalCombo));
  if (g.length === 0) continue;
  const c = g.filter((d) => d.cerro).length;
  console.log(`  ${nombre.padEnd(24)}${String(g.length).padStart(7)}${String(c).padStart(10)}${pct(c, g.length).padStart(9)}`);
}

console.log(`
  ⚠️ OJO CON LEER ESTA TABLA COMO SI FUERA ELASTICIDAD. El total del combo
  depende de la CIUDAD, no de una decisión comercial: $158.000 es un pueblo
  lejano y $137.000 es Bogotá. Así que esta tabla mezcla "precio alto" con
  "destino difícil", y los destinos difíciles cierran peor por muchas razones
  además del precio (desconfianza, menos costumbre de comprar en línea).
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("3. ¿QUÉ DIJO EL CLIENTE DESPUÉS DE RECIBIR EL TOTAL DEL COMBO?");

const RE_CARO = /(muy caro|esta caro|carisimo|caro|no me alcanza|mucha plata|muy costoso|rebaja|descuento|mas barato|ultimo precio)/;
const perdidosCombo = conCombo.filter((d) => !d.cerro);
const quejaronPrecio = perdidosCombo.filter((d) => RE_CARO.test(lib.limpiar(d.ultimoCliente)));

console.log(`
  De ${perdidosCombo.length} conversaciones que recibieron total de combo y NO cerraron:

    mencionaron que estaba caro .... ${quejaronPrecio.length}  (${pct(quejaronPrecio.length, perdidosCombo.length)})
    se fueron sin hablar de precio . ${perdidosCombo.length - quejaronPrecio.length}  (${pct(perdidosCombo.length - quejaronPrecio.length, perdidosCombo.length)})
`);

// Comparación: lo mismo en los de 1 unidad
const soloUno = datos.filter((d) => d.total1 != null && d.totalCombo == null);
const perdidosUno = soloUno.filter((d) => !d.cerro);
const quejaronUno = perdidosUno.filter((d) => RE_CARO.test(lib.limpiar(d.ultimoCliente)));
console.log(`  Para comparar, en los de 1 unidad: ${pct(quejaronUno.length, perdidosUno.length)} mencionó el precio.`);

console.log(`
  🔑 LA RESPUESTA A TU TERCERA PREGUNTA — ¿el precio es EL limitante?

  ${
    quejaronPrecio.length / Math.max(perdidosCombo.length, 1) > 0.2
      ? "SÍ: el precio aparece en más de 1 de cada 5 conversaciones perdidas."
      : "NO, o al menos no como objeción declarada: el precio aparece en menos de\n  1 de cada 5 conversaciones perdidas del combo."
  }

  ⚠️ Y ACÁ HAY QUE SER HONESTO CON LO QUE ESTE DATO NO PUEDE VER: el que se va
  en silencio no dice por qué. Medir "cuántos se quejaron del precio" NO mide
  "a cuántos les pareció caro". Subestima el efecto del precio, y no hay forma
  de corregirlo con este export.

  Lo único que lo mediría de verdad es probar dos precios a la vez y comparar.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("4. TU IDEA: $110.000 LOS DOS + ENVÍO. ¿QUÉ CAMBIA?");

const COSTO = 33000;
const ENVIO_2 = { A: 23947, B: 32597, C: 38784, D: 37832, E: 45214 };

console.log(`
  🔎 PRIMERO, UN DATO QUE CAMBIA LA PREGUNTA: así ya está armado el precio.
  El combo se cotiza como $110.000 los dos conjuntos MÁS el envío de la ciudad.
  Lo que ve el cliente es la suma. Acá va lo que el bot dice hoy, por banda:
`);
console.log(`  ${"banda".padEnd(7)}${"total hoy".padStart(11)}${"producto".padStart(11)}${"envío".padStart(10)}${"envío real".padStart(12)}${"margen".padStart(11)}`);
console.log("  " + "─".repeat(62));
for (const b of ["A", "B", "C", "D", "E"]) {
  const total = fletes.PROMO_2_TOTAL[b];
  const d = fletes.desgloseDe(b, 2, total);
  const margen = total - 2 * COSTO - ENVIO_2[b];
  console.log(
    `  ${b.padEnd(7)}${$(total).padStart(11)}${$(d.producto).padStart(11)}${$(d.envio).padStart(10)}${$(ENVIO_2[b]).padStart(12)}${$(margen).padStart(11)}`
  );
}

console.log(`
  O sea: el "$110.000 los dos + envío" que propones ES la estructura actual.
  Lo que hace grande el número de banda E no es el producto: es que el envío de
  2 unidades a un pueblo cuesta ${$(ENVIO_2.E)} de verdad. No es margen inflado.

  🔑 LO QUE SÍ SE PUEDE HACER, y es distinto: DECIRLE EL DESGLOSE.
  "Los dos conjuntos $110.000 + $48.000 de envío" se lee muy distinto a
  "$158.000". El precio es el mismo; lo que cambia es dónde pone el cliente la
  culpa del número. Y eso no cuesta un peso de margen.
`);

console.log(`  Y si igual quisieras bajar el combo, esto es lo que exige:\n`);
console.log(`  ${"banda".padEnd(7)}${"hoy".padStart(10)}${"margen".padStart(10)}${"  bajando $10k".padStart(15)}${"bajando $20k".padStart(14)}`);
console.log("  " + "─".repeat(56));
for (const b of ["A", "B", "C", "D", "E"]) {
  const total = fletes.PROMO_2_TOTAL[b];
  const M = total - 2 * COSTO - ENVIO_2[b];
  const f = (r) => (M > r ? `+${(((M / (M - r)) - 1) * 100).toFixed(0)}% cierre` : "imposible");
  console.log(`  ${b.padEnd(7)}${$(total).padStart(10)}${$(M).padStart(10)}${f(10000).padStart(15)}${f(20000).padStart(14)}`);
}

console.log(`
  Banda E bajando $20.000 (de ${$(fletes.PROMO_2_TOTAL.E)} a ${$(fletes.PROMO_2_TOTAL.E - 20000)}) exige +75% de cierre
  solo para empatar. Bajando $10.000, +27%.

  ⚠️ Y hay algo que NO se puede olvidar: el precio de rescate ya existe y hace
  justo esto, pero SOLO cuando el cliente objeta. Banda E ya puede bajar a
  ${$(fletes.PROMO_2_RESCATE.E)}. Bajar la lista para todos regala ese descuento también a
  quien iba a comprar al precio lleno — y esos son la mayoría.
`);

console.log(LINEA);
console.log("Fin. Ningún dato personal salió de datos-privados/.");
console.log(LINEA + "\n");
