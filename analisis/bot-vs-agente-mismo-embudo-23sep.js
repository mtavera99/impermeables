/**
 * EL BOT CONTRA EL AGENTE VIEJO, MEDIDOS CON LA MISMA REGLA — 23-sep
 *
 * POR QUE: el panel del bot mostro esto en vivo (23-sep, 12:56):
 *
 *     221  Escribieron
 *     119  Siguieron la charla    -102   46%
 *      89  Recibieron precio      - 30   25%
 *      27  Llegaron a los datos   - 62   70%
 *       9  Cerraron el pedido     - 18   67%
 *
 * Y yo tenia el embudo del agente viejo sacado con MIS definiciones en
 * por-que-no-cierran-23sep.js. Comparar los dos seria trampa: las etapas no
 * estan definidas igual. Ejemplo concreto: mi "llego al bloque de cierre" exigia
 * que el agente imprimiera "Confirmemos tu pedido", mientras que la etapa
 * "datos" del bot se activa con solo mencionar la palabra "direccion" — mucho
 * mas facil de alcanzar. Comparar 17,2% contra 30,3% con esas dos reglas no
 * dice nada.
 *
 * LA SOLUCION: pasar las 6.317 conversaciones del export por bot/src/embudo.js,
 * el MISMO codigo que alimenta el panel. Asi las dos columnas usan la misma
 * definicion de cada escalon y la comparacion es legitima.
 *
 * 🔴 PRIVACIDAD: lee datos-privados/ (gitignored). Solo imprime agregados.
 *
 *   node analisis/bot-vs-agente-mismo-embudo-23sep.js
 */

const embudo = require("../bot/src/embudo.js");
const lib = require("./lib-export.js");

const LINEA = "═".repeat(78);
const pct = (a, b) => (b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "—");

console.log("Pasando el export por bot/src/embudo.js...");

// 🔴 El lector vive en lib-export.js y no se copia mas. La primera version de
// este script traia su propio parser, y ese parser le pegaba el TEXTO DEL
// ANUNCIO a los mensajes del negocio (el bloque Context: ocupa varias lineas).
// Contaminaba 173 conversaciones con 52.409 caracteres de publicidad.
const todas = lib.leerTodas();

const cuenta = { vacia: 0, entro: 0, volvio: 0, cotizado: 0, datos: 0, cerro: 0 };
for (const { turnos } of todas) {
  // "cerro" para el agente viejo = el cliente confirmo explicitamente. Es el
  // equivalente mas cercano a "hay un pedido guardado" que tiene el bot.
  cuenta[embudo.etapaDe(lib.aConversacion(turnos), lib.confirmo(turnos))]++;
}

// Acumulado, igual que hace embudo.calcular()
const V = cuenta.cerro;
const D = cuenta.datos + V;
const C = cuenta.cotizado + D;
const S = cuenta.volvio + C;
const E = cuenta.entro + S;

// El panel del bot, leido en vivo el 23-sep 12:56
const BOT = { entro: 221, volvio: 119, cotizado: 89, datos: 27, cerro: 9 };
const VIEJO = { entro: E, volvio: S, cotizado: C, datos: D, cerro: V };

const ETAPAS = [
  ["Escribieron", "entro"],
  ["Siguieron la charla", "volvio"],
  ["Recibieron precio", "cotizado"],
  ["Llegaron a los datos", "datos"],
  ["Cerraron el pedido", "cerro"],
];

console.log("\n" + LINEA);
console.log("EL MISMO EMBUDO, LOS DOS SISTEMAS");
console.log(LINEA);
console.log(`\n  ${"etapa".padEnd(22)}${"BOT".padStart(7)}${"pasan".padStart(8)}   ${"VIEJO".padStart(7)}${"pasan".padStart(8)}   ${"quien gana".padStart(12)}`);
console.log("  " + "─".repeat(70));

const pasos = [];
for (let i = 0; i < ETAPAS.length; i++) {
  const [nombre, k] = ETAPAS[i];
  const nb = BOT[k];
  const nv = VIEJO[k];
  if (i === 0) {
    console.log(`  ${nombre.padEnd(22)}${String(nb).padStart(7)}${"—".padStart(8)}   ${String(nv).padStart(7)}${"—".padStart(8)}`);
    continue;
  }
  const kp = ETAPAS[i - 1][1];
  const pb = nb / BOT[kp];
  const pv = nv / VIEJO[kp];
  const gana = pb > pv ? "el BOT" : pb < pv ? "🔴 el VIEJO" : "empate";
  console.log(
    `  ${nombre.padEnd(22)}${String(nb).padStart(7)}${(pct(nb, BOT[kp])).padStart(8)}   ` +
    `${String(nv).padStart(7)}${(pct(nv, VIEJO[kp])).padStart(8)}   ${gana.padStart(12)}`
  );
  pasos.push({ nombre, pb, pv, ratio: pv > 0 ? pb / pv : null });
}
console.log("  " + "─".repeat(70));
console.log(`  ${"CIERRE TOTAL".padEnd(22)}${"".padStart(7)}${pct(BOT.cerro, BOT.entro).padStart(8)}   ${"".padStart(7)}${pct(VIEJO.cerro, VIEJO.entro).padStart(8)}`);

console.log("\n" + LINEA);
console.log("DONDE ESTA EL PROBLEMA DE VERDAD");
console.log(LINEA);
console.log(`
  El panel dice que la fuga mas grande esta en "Siguieron la charla" porque ahi
  se pierden 102 personas, mas que en ningun otro escalon. Pero ese escalon es
  el mas ANCHO del embudo: siempre va a perder mas gente en numero absoluto.

  Lo que importa es que tan bien pasa cada escalon COMPARADO CON LO NORMAL.
  Aca va cada paso del bot contra el mismo paso del agente viejo:
`);
for (const p of pasos) {
  const señal = p.ratio >= 1 ? "🟢" : p.ratio >= 0.8 ? "🟡" : "🔴";
  const dif = ((p.pb / p.pv - 1) * 100).toFixed(0);
  console.log(`  ${señal} ${p.nombre.padEnd(22)}${(p.pb * 100).toFixed(1).padStart(6)}%  vs ${(p.pv * 100).toFixed(1).padStart(6)}%   ${(dif > 0 ? "+" : "") + dif}%`);
}

const peor = pasos.reduce((a, b) => (a.ratio < b.ratio ? a : b));
console.log(`
  🔑 EL ESCALON ROTO ES "${peor.nombre}": el bot pasa ${(peor.pb * 100).toFixed(1)}% donde el
     agente viejo pasaba ${(peor.pv * 100).toFixed(1)}%. Eso es ${(peor.pv / peor.pb).toFixed(1)} veces peor.

  Y el panel NO lo esta señalando, porque mira el numero absoluto de perdidos en
  vez de comparar cada paso con su referencia. Por eso te mandaba a revisar el
  anuncio y el primer mensaje — justo lo que ya sabemos que esta sano.
`);

// Cuanto vale arreglar solo ese escalon
const MARGEN = 23244;
const CONV_DIA = 168;
const cierreActual = BOT.cerro / BOT.entro;
// Si el peor escalon subiera al nivel del agente viejo, dejando los otros igual
let factor = peor.pv / peor.pb;
const cierreArreglado = cierreActual * factor;
const pedHoy = cierreActual * CONV_DIA;
const pedArreglado = cierreArreglado * CONV_DIA;

console.log(LINEA);
console.log("CUANTO VALE ARREGLAR SOLO ESE ESCALON");
console.log(LINEA);
console.log(`
  Sobre ${CONV_DIA} conversaciones/dia y $${MARGEN.toLocaleString("es-CO")} de margen por unidad:

  hoy ....................... ${pedHoy.toFixed(1)} pedidos/dia    $${Math.round(pedHoy * MARGEN).toLocaleString("es-CO")}
  con ese escalon al nivel
  del agente viejo .......... ${pedArreglado.toFixed(1)} pedidos/dia    $${Math.round(pedArreglado * MARGEN).toLocaleString("es-CO")}

  diferencia ................ +${(pedArreglado - pedHoy).toFixed(1)} pedidos/dia    +$${Math.round((pedArreglado - pedHoy) * MARGEN).toLocaleString("es-CO")}/dia

  Y el cierre total pasaria de ${(cierreActual * 100).toFixed(1)}% a ${(cierreArreglado * 100).toFixed(1)}% sin tocar nada mas.
`);

console.log(`
  ⚠️ CUIDADO CON LA MUESTRA: el bot lleva ${BOT.entro} conversaciones y solo ${BOT.cerro}
     pedidos. Con numeros tan chicos, un dia bueno mueve el porcentaje varios
     puntos. La direccion del hallazgo es solida (la diferencia es grande), pero
     el tamaño exacto hay que confirmarlo con mas dias.
`);
console.log(LINEA + "\n");
