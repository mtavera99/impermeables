/**
 * ¿NEGOCIAR EL PRECIO VENDE MAS? — 23-sep
 *
 * LO QUE PLANTEO EL DUEÑO, con sus palabras:
 *
 *   "yo negociaba mucho el precio... varios de esos pedidos los vendi en 135.000
 *    y creo que solo uno en 140.000 con envio... como yo era flexible con los
 *    precios creo que llegaba a vender un poquito mas, no se si sea intuicion
 *    mia o si sea un hecho"
 *
 *   "muchas veces va a ser mejor hacer ese cierre de venta que no represente
 *    [todo el] dinero a que no haya un cierre de venta"
 *
 * Esa segunda frase es economicamente CORRECTA y hay que decirlo: la pauta ya
 * se gasto. Una venta con menos margen es plata; una venta que no pasa es cero.
 *
 * Pero la primera frase es una HIPOTESIS, y tiene un numero exacto que la hace
 * verdadera o falsa: cuanto tiene que subir el cierre para compensar la rebaja.
 * Este script lo calcula, y despues mira en los 6.317 chats si eso pasaba.
 *
 * 🔴 PRIVACIDAD: lee datos-privados/ (gitignored). Solo agregados.
 *
 *   node analisis/negociar-el-precio-23sep.js
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

// ───────────────────────────────────────────────────────────────────────────
// LA ESTRUCTURA DE COSTOS REAL
// ───────────────────────────────────────────────────────────────────────────
const COSTO = 33000; // costo del conjunto
const ENVIO_1 = { A: 14906, B: 21038, C: 25055, D: 26287, E: 28697 };
const ENVIO_2 = { A: 23947, B: 32597, C: 38784, D: 37832, E: 45214 };
const LISTA_1 = { A: 73000, B: 78000, C: 82000, D: 83000, E: 85000 };
const LISTA_2 = { A: 137000, B: 146000, C: 152000, D: 140000, E: 158000 };

/** Margen ANTES de pauta. */
function margen(total, unidades, banda) {
  const envio = unidades >= 2 ? ENVIO_2[banda] : ENVIO_1[banda];
  if (envio == null) return null;
  return total - unidades * COSTO - envio;
}

// ───────────────────────────────────────────────────────────────────────────
// Lectura de los bloques de confirmacion
// ───────────────────────────────────────────────────────────────────────────
const RE_BLOQUE = /confirmemos tu pedido/i;

/** Del bloque de confirmacion saca ciudad, total y cuantas unidades. */
function datosDelBloque(texto) {
  const ciudad = (texto.match(/\*?Ciudad:?\*?:?\s*([^\n*]+)/i) || [])[1];
  const totalTxt = (texto.match(/TOTAL[^:\n]*:?\*?:?\s*\$?\s*([\d.,]+)/i) || [])[1];
  const producto = (texto.match(/\*?Producto:?\*?:?\s*([^\n]+)/i) || [])[1] || "";
  if (!ciudad || !totalTxt) return null;
  const total = Number(String(totalTxt).replace(/[.,]/g, ""));
  if (!Number.isFinite(total) || total < 50000) return null;
  // Dos unidades: lo dice el producto, o el total esta en rango de combo.
  const dosPorTexto = /\b(2|dos)\b|combo|x\s*2|pareja/i.test(producto);
  const unidades = dosPorTexto || total >= 110000 ? 2 : 1;
  return { ciudad: ciudad.trim(), total, unidades };
}

console.log("Leyendo el export...");
const conversaciones = lib.leerTodas();

const cerrados = [];
let sinBanda = 0;

for (const { turnos } of conversaciones) {
  if (!lib.confirmo(turnos)) continue;
  // El ULTIMO bloque es el precio que de verdad se acordo (el agente repetia el
  // bloque; contar todos infla las ventas 2,25x — bug ya conocido).
  let ultimo = null;
  for (const t of turnos) {
    if (t.quien === "negocio" && RE_BLOQUE.test(t.texto)) {
      const d = datosDelBloque(t.texto);
      if (d) ultimo = d;
    }
  }
  if (!ultimo) continue;
  const banda = fletes.bandaDe(ultimo.ciudad);
  if (!banda) {
    sinBanda++;
    continue;
  }
  const m = margen(ultimo.total, ultimo.unidades, banda);
  const lista = ultimo.unidades >= 2 ? LISTA_2[banda] : LISTA_1[banda];
  cerrados.push({ ...ultimo, banda, margen: m, lista, rebaja: lista - ultimo.total });
}

console.log(`\npedidos confirmados con ciudad y total legibles: ${cerrados.length}`);
if (sinBanda) console.log(`(${sinBanda} quedaron fuera: la ciudad no se pudo mapear a una banda)`);

const de2 = cerrados.filter((c) => c.unidades === 2);
const de1 = cerrados.filter((c) => c.unidades === 1);
console.log(`  de 1 unidad: ${de1.length}   ·   de 2 unidades: ${de2.length} (${pct(de2.length, cerrados.length)})`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("1. ¿CUANTO REBAJABAS DE VERDAD? (contra la lista de hoy)");

console.log(`
  ⚠️ La lista cambio en el tiempo y el export NO trae fechas, asi que "rebaja"
  aca significa "contra la lista de HOY". Parte de lo que se ve como rebaja es
  en realidad un precio viejo. Sirve para ver el RANGO en que se vendia, no para
  acusar de descuento a cada pedido.
`);

function resumenRebaja(grupo, nombre) {
  if (!grupo.length) return;
  const rebajas = grupo.map((c) => c.rebaja).sort((a, b) => a - b);
  const med = rebajas[Math.floor(rebajas.length / 2)];
  const prom = rebajas.reduce((s, x) => s + x, 0) / rebajas.length;
  const bajoLista = grupo.filter((c) => c.rebaja > 0).length;
  console.log(`  ${nombre} — ${grupo.length} pedidos`);
  console.log(`    por debajo de la lista de hoy: ${bajoLista} (${pct(bajoLista, grupo.length)})`);
  console.log(`    rebaja mediana ${$(med)} · promedio ${$(prom)} · maxima ${$(rebajas[rebajas.length - 1])}`);
  const m = grupo.map((c) => c.margen).sort((a, b) => a - b);
  console.log(`    margen ANTES de pauta: mediana ${$(m[Math.floor(m.length / 2)])} · minimo ${$(m[0])} · maximo ${$(m[m.length - 1])}`);
  const enPerdida = grupo.filter((c) => c.margen <= 0).length;
  console.log(`    pedidos con margen NEGATIVO: ${enPerdida} (${pct(enPerdida, grupo.length)})`);
}

resumenRebaja(de1, "1 unidad");
console.log("");
resumenRebaja(de2, "2 unidades");

// ═══════════════════════════════════════════════════════════════════════════
titulo("2. LOS PRECIOS A LOS QUE DE VERDAD SE CERRO");

function tablaPrecios(grupo, nombre) {
  if (!grupo.length) return;
  console.log(`\n  ${nombre}:\n`);
  const cuenta = new Map();
  for (const c of grupo) cuenta.set(c.total, (cuenta.get(c.total) || 0) + 1);
  const filas = [...cuenta.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  console.log(`  ${"precio".padStart(12)}${"pedidos".padStart(9)}${"margen medio".padStart(14)}`);
  console.log("  " + "─".repeat(36));
  for (const [precio, n] of filas) {
    const g = grupo.filter((c) => c.total === precio);
    const mm = g.reduce((s, c) => s + c.margen, 0) / g.length;
    console.log(`  ${$(precio).padStart(12)}${String(n).padStart(9)}${$(mm).padStart(14)}`);
  }
}
tablaPrecios(de1, "1 unidad");
tablaPrecios(de2, "2 unidades");

// ═══════════════════════════════════════════════════════════════════════════
titulo("3. 🔑 EL NUMERO QUE DECIDE: CUANTO TIENE QUE SUBIR EL CIERRE");

console.log(`
  Rebajar cambia DOS cosas a la vez: gana mas clientes y gana menos por cliente.
  Compensa solo si el cierre sube mas que lo que cae el margen.

  Si el margen pasa de M a M-R, el cierre tiene que subir un factor M/(M-R).
`);

for (const [uds, lista, envio] of [[1, LISTA_1, ENVIO_1], [2, LISTA_2, ENVIO_2]]) {
  console.log(`\n  ── ${uds} unidad${uds > 1 ? "es" : ""} ──`);
  console.log(`  ${"banda".padEnd(7)}${"lista".padStart(10)}${"margen".padStart(10)}${"  rebaja $5k".padStart(14)}${"rebaja $10k".padStart(13)}`);
  console.log("  " + "─".repeat(54));
  for (const b of ["A", "B", "C", "D", "E"]) {
    const M = lista[b] - uds * COSTO - envio[b];
    const f5 = M > 5000 ? `+${(((M / (M - 5000)) - 1) * 100).toFixed(0)}%` : "imposible";
    const f10 = M > 10000 ? `+${(((M / (M - 10000)) - 1) * 100).toFixed(0)}%` : "imposible";
    console.log(`  ${b.padEnd(7)}${$(lista[b]).padStart(10)}${$(M).padStart(10)}${f5.padStart(14)}${f10.padStart(13)}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
titulo("4. LO QUE CAMBIA TODO: LA 2ª UNIDAD NO PAGA PAUTA");

// Costo de adquisicion real: lo que cuesta traer UN pedido.
const COSTO_CONV = 1000; // ~$/conversacion medido estos dias
for (const cierre of [0.041, 0.05, 0.084, 0.1]) {
  const cac = COSTO_CONV / cierre;
  console.log(`  cierre ${(cierre * 100).toFixed(1)}%  ->  cada pedido cuesta ${$(cac)} de pauta`);
}
console.log(`
  🔑 Ese costo se paga UNA vez por pedido, no por unidad. En un pedido de 2
  conjuntos la segunda unidad NO paga pauta: entra gratis.

  Margen DESPUES de pauta (con cierre al 5%, o sea ${$(COSTO_CONV / 0.05)} por pedido):
`);
console.log(`  ${"banda".padEnd(7)}${"1 ud".padStart(12)}${"2 uds".padStart(12)}${"  la 2ª ud deja".padStart(16)}`);
console.log("  " + "─".repeat(47));
const cac5 = COSTO_CONV / 0.05;
for (const b of ["A", "B", "C", "D", "E"]) {
  const m1 = LISTA_1[b] - COSTO - ENVIO_1[b] - cac5;
  const m2 = LISTA_2[b] - 2 * COSTO - ENVIO_2[b] - cac5;
  console.log(`  ${b.padEnd(7)}${$(m1).padStart(12)}${$(m2).padStart(12)}${$(m2 - m1).padStart(16)}`);
}

console.log(`
  Por eso en un pedido de 2 unidades hay MUCHO mas espacio para negociar que en
  uno de 1: el mismo descuento se come una porcion mas chica de un margen mas
  grande, y la pauta ya esta pagada una sola vez.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("5. HASTA DONDE SE PUEDE BAJAR SIN PERDER PLATA");

console.log(`
  El piso NO es el costo: es el costo + la pauta que ya se gasto para traer a
  ese cliente. Por debajo de eso la venta destruye plata en vez de crearla.

  Con cierre al 5% (${$(cac5)} de pauta por pedido):
`);
console.log(`  ${"banda".padEnd(7)}${"lista 2 uds".padStart(13)}${"piso real".padStart(12)}${"margen p/negociar".padStart(19)}`);
console.log("  " + "─".repeat(51));
for (const b of ["A", "B", "C", "D", "E"]) {
  const piso = 2 * COSTO + ENVIO_2[b] + cac5;
  console.log(
    `  ${b.padEnd(7)}${$(LISTA_2[b]).padStart(13)}${$(piso).padStart(12)}${$(LISTA_2[b] - piso).padStart(19)}`
  );
}

console.log(`\n  Y para 1 unidad:\n`);
console.log(`  ${"banda".padEnd(7)}${"lista 1 ud".padStart(13)}${"piso real".padStart(12)}${"margen p/negociar".padStart(19)}`);
console.log("  " + "─".repeat(51));
for (const b of ["A", "B", "C", "D", "E"]) {
  const piso = COSTO + ENVIO_1[b] + cac5;
  console.log(
    `  ${b.padEnd(7)}${$(LISTA_1[b]).padStart(13)}${$(piso).padStart(12)}${$(LISTA_1[b] - piso).padStart(19)}`
  );
}

// ═══════════════════════════════════════════════════════════════════════════
titulo("6. 🔑 EL MOVIMIENTO MAS RENTABLE QUE HAY EN TODO EL NEGOCIO");

console.log(`
  Mira las dos tablas de arriba juntas. En 1 unidad, despues de pauta, quedan
  entre $3.303 y $5.094. En 2 unidades quedan entre $16.168 y $27.403.

  Eso significa algo que cambia la estrategia entera:

  🔑 UN COMBO CON $10.000 DE DESCUENTO DEJA MUCHO MAS QUE UNA UNIDAD A PRECIO
     FULL. No un poco mas: varias veces mas.

  Asi que el descuento NO sirve para salvar una venta de 1 unidad (ahi no hay de
  donde: solo $3.900 de espacio). Sirve para CONVERTIR una venta de 1 en una de 2.
`);

console.log(`  ${"banda".padEnd(7)}${"1 ud full".padStart(12)}${"2 uds -$10k".padStart(13)}${"2 uds -$15k".padStart(13)}${"  cuanto mejor".padStart(15)}`);
console.log("  " + "─".repeat(60));
for (const b of ["A", "B", "C", "D", "E"]) {
  const m1 = LISTA_1[b] - COSTO - ENVIO_1[b] - cac5;
  const m2d10 = LISTA_2[b] - 10000 - 2 * COSTO - ENVIO_2[b] - cac5;
  const m2d15 = LISTA_2[b] - 15000 - 2 * COSTO - ENVIO_2[b] - cac5;
  console.log(
    `  ${b.padEnd(7)}${$(m1).padStart(12)}${$(m2d10).padStart(13)}${$(m2d15).padStart(13)}` +
    `${(m2d10 / m1).toFixed(1) + "x"}`.padStart(15)
  );
}

console.log(`
  O sea: ofrecerle $10.000 de descuento en el combo a alguien que venia por UNA
  unidad es el mejor negocio del dia, incluso si el descuento es grande. Y es
  exactamente lo que vos hacias a mano: rebaja mediana de $9.000 en los combos,
  con $38.053 de margen.

  ⚠️ LO QUE ESTO NO PRUEBA: que rebajar haga cerrar mas. No hay experimento en el
  export —no se puede saber que habria pasado sin la rebaja— y los 22 combos son
  pocos. Pero la conclusion NO depende de eso: SI una rebaja convierte un "no" en
  un "si", en 2 unidades vale la pena hasta ${$(27000)}, y en 1 unidad casi nada.
  Eso es aritmetica de costos, no elasticidad.
`);

// ═══════════════════════════════════════════════════════════════════════════
titulo("7. LA ESTRATEGIA QUE SALE DE LOS NUMEROS");

console.log(`
  1. EN 1 UNIDAD, EL TOPE DE $3.000 SE QUEDA COMO ESTA.
     Despues de pauta quedan entre $3.303 y $5.094. Un descuento de $5.000 ya
     deja la venta en cero o en perdida, y exige +26% de cierre para empatar.
     No hay margen para negociar y no hay que inventarlo.

  2. EN 2 UNIDADES, EL TOPE PUEDE SER $10.000.
     Exige solo +12% de cierre con $5.000 y +27% con $10.000, sobre un margen
     de ${$(47000)}. Es donde vive la flexibilidad que vos usabas a mano.

  3. EL DESCUENTO SE USA PARA SUBIR DE 1 A 2, NO PARA SALVAR UNA DE 1.
     Es el movimiento de la tabla de arriba. En vez de "te bajo $3.000 y te
     llevas uno", es "por $X mas te llevas dos y te ahorras el segundo envio".

  4. BANDA D ES LA EXCEPCION Y HAY QUE ARREGLARLA, NO NEGOCIARLA.
     Su combo deja ${$(16168)} despues de pauta contra ${$(27000)} de las demas,
     porque el total esta en $140.000 cuando deberia estar cerca de $145.000.
     Ahi NO hay que dar descuento: hay que subir el precio de lista.

  5. EL PISO NUNCA SE CRUZA.
     Cada banda tiene su piso real (costo + envio + pauta). Por debajo de eso la
     venta destruye plata. Con cierre al 5% el piso del combo va de
     ${$(109947)} (Bogota) a ${$(131214)} (pueblos).

  ⚠️ Y OJO CON ESTO, QUE ES IMPORTANTE: el piso depende del cierre. Si el cierre
  baja, la pauta por pedido sube y el piso SUBE con ella. A 4,1% de cierre la
  pauta por pedido es ${$(COSTO_CONV / 0.041)} en vez de ${$(cac5)}: el espacio para
  negociar se encoge ${$(COSTO_CONV / 0.041 - cac5)} por pedido. Descontar cuando el cierre
  esta bajo es justo cuando menos se puede.
`);

console.log(LINEA + "\n");
