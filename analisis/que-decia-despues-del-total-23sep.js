/**
 * QUE DECIA EL AGENTE JUSTO DESPUES DE DAR EL TOTAL — 23-sep
 *
 * POR QUE: medido con el mismo embudo en los dos sistemas, el escalon
 * "Recibieron precio -> Llegaron a los datos" es el unico roto:
 *
 *     bot 30,3%   ·   agente viejo 49,1%   ·   indice 0,62
 *
 * O sea que el agente viejo era 1,6 veces mejor en ESE salto. Antes de inventar
 * yo una frase, hay que ver que decia el agente cuando lo lograba. Es literal lo
 * que pidio el dueño: "todas las cosas que funcionaban que encontraste como un
 * patron, traerlas al nuevo".
 *
 * COMO SE MIDE: se busca el mensaje del negocio donde aparece el primer TOTAL
 * (>= $70.000, ver bot/src/embudo.js) y se mira con que PREGUNTA cierra ese
 * mensaje. Despues se compara la frecuencia de cada pregunta entre:
 *
 *   · las conversaciones que AVANZARON a dar datos
 *   · las que se quedaron ahi
 *
 * 🔴 PRIVACIDAD: solo se imprimen frases del NEGOCIO, nunca del cliente. Se les
 * quitan los numeros y se exige que aparezcan en 15 conversaciones distintas
 * para mostrarse, asi no puede salir algo personal pegado a una frase.
 *
 *   node analisis/que-decia-despues-del-total-23sep.js
 */

const embudo = require("../bot/src/embudo.js");
const lib = require("./lib-export.js");

const LINEA = "═".repeat(78);
const pct = (a, b) => (b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "—");

function normalizar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // 🔒 fuera los numeros: precios, telefonos, direcciones, cedulas
    .replace(/\d+/g, "#")
    .replace(/[^\w\s?¿#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 🔴 El lector vive en lib-export.js. La primera version de este script traia su
// propio parser y le pegaba el TEXTO DEL ANUNCIO a los mensajes del negocio,
// porque el bloque Context: ocupa varias lineas. Eso invento un "patron de
// cierre" usado 149 veces con 0,0% de avance que no era del agente: era el copy
// del anuncio, que justo habla de "un solo envio".

/**
 * El mensaje del negocio donde aparece el PRIMER total.
 *
 * 🔴 Y SOLO SI ES UNA RESPUESTA A ALGO QUE DIJO EL CLIENTE.
 *
 * Por que este filtro: el agente mandaba TAMBIEN mensajes masivos de reenganche
 * a gente ya fria ("Mañana es Amor y Amistad, hoy alcanzo a despachar los dos
 * juntos. Los dos en $134.000, un solo envio. ¿Te los mando?"). Esos traen un
 * total, asi que entraban al analisis como si fueran una cotizacion.
 *
 * Y arruinaban el resultado: aparecian 149 veces con 0,0% de avance, no porque
 * la frase fuera mala sino porque son el ULTIMO mensaje de la conversacion y
 * nadie contesto nunca. Estaba midiendo un mensaje masivo como si fuera una
 * charla de venta.
 *
 * Una cotizacion de verdad siempre viene despues de que el cliente dijo algo
 * (la ciudad, como minimo). Los masivos no cumplen eso.
 */
function mensajeDelTotal(turnos) {
  for (let i = 0; i < turnos.length; i++) {
    const t = turnos[i];
    if (t.quien !== "negocio" || !embudo.dioTotal(t.texto)) continue;
    const esRespuesta = i > 0 && turnos[i - 1].quien === "cliente";
    return { i, texto: t.texto, esRespuesta };
  }
  return null;
}

/** ¿Despues de cotizar, el negocio llego a pedir datos? (mismo criterio del bot) */
function llegoADatos(turnos, desde) {
  for (let i = desde; i < turnos.length; i++) {
    const t = turnos[i];
    if (t.quien === "negocio" && embudo.RE_DATOS.test(t.texto)) return true;
  }
  return false;
}

/** ¿Contesto el cliente DESPUES de recibir el total? */
function contestoDespues(turnos, desde) {
  for (let i = desde + 1; i < turnos.length; i++) if (turnos[i].quien === "cliente") return true;
  return false;
}

/** Las preguntas con que cierra un mensaje (frases que terminan en ?). */
function preguntasDe(texto) {
  const n = normalizar(texto);
  const out = [];
  for (const m of n.matchAll(/([^?.!]{8,90})\?/g)) {
    let q = m[1].trim();
    // se queda con las ultimas 9 palabras: el nucleo de la pregunta
    const w = q.split(" ");
    if (w.length > 9) q = w.slice(-9).join(" ");
    out.push(q + "?");
  }
  return out;
}

console.log("Leyendo el export...");
const conversaciones = lib.leerTodas();

const avanzaron = [];
const sequedaron = [];
let sinContestar = 0;

// Los masivos se cuentan aparte: no son cotizaciones, pero lo que les pasa
// tambien es un dato.
let masivos = 0;
let masivosQueMovieron = 0;

for (const { turnos } of conversaciones) {
  const mt = mensajeDelTotal(turnos);
  if (!mt) continue;

  if (!mt.esRespuesta) {
    masivos++;
    if (contestoDespues(turnos, mt.i)) masivosQueMovieron++;
    continue;
  }

  const grupo = llegoADatos(turnos, mt.i + 1) ? avanzaron : sequedaron;
  grupo.push(mt.texto);
  if (grupo === sequedaron && !contestoDespues(turnos, mt.i)) sinContestar++;
}

const totalCotizados = avanzaron.length + sequedaron.length;
console.log(`\ncotizaciones de verdad (el total fue respuesta al cliente): ${totalCotizados}`);
console.log(`  avanzaron a dar datos: ${avanzaron.length}  (${pct(avanzaron.length, totalCotizados)})`);
console.log(`  se quedaron ahi:       ${sequedaron.length}`);
console.log(`  ...y de esos, ${sinContestar} NUNCA volvieron a escribir (${pct(sinContestar, sequedaron.length)})`);

console.log(`\n🔴 aparte: ${masivos} mensajes MASIVOS con un total adentro (reenganche a gente fria,`);
console.log(`   no son respuesta a nadie). De esos, ${masivosQueMovieron} lograron que el cliente`);
console.log(`   volviera a escribir: ${pct(masivosQueMovieron, masivos)}.`);
console.log(`   Quedan FUERA del analisis de abajo: meterlos hacia parecer que una frase de`);
console.log(`   venta tenia 0% de efecto, cuando lo que no funcionaba era el envio masivo.`);

// ═══════════════════════════════════════════════════════════════════════════
console.log("\n" + LINEA);
console.log("LA PREGUNTA CON QUE CIERRA EL MENSAJE DEL TOTAL");
console.log(LINEA);

function contar(grupo) {
  const m = new Map();
  for (const texto of grupo) {
    const vistas = new Set(preguntasDe(texto));
    for (const q of vistas) m.set(q, (m.get(q) || 0) + 1);
  }
  return m;
}

const cA = contar(avanzaron);
const cQ = contar(sequedaron);

// Se juntan las dos listas y se compara la tasa de avance de cada pregunta.
const todas = new Set([...cA.keys(), ...cQ.keys()]);
const filas = [];
for (const q of todas) {
  const a = cA.get(q) || 0;
  const s = cQ.get(q) || 0;
  const n = a + s;
  if (n < 15) continue; // 🔒 piso de privacidad y de significancia
  filas.push({ q, n, a, tasa: a / n });
}

filas.sort((x, y) => y.tasa - x.tasa);

console.log(`
  Cada fila es una pregunta que el agente usaba para cerrar el mensaje del total.
  "avanzan" = de las veces que uso esa pregunta, cuantas siguieron a dar datos.
  Solo preguntas usadas en 15 conversaciones o mas.
`);
console.log(`  ${"veces".padStart(6)}${"avanzan".padStart(9)}   pregunta`);
console.log("  " + "─".repeat(74));
for (const f of filas.slice(0, 18)) {
  console.log(`  ${String(f.n).padStart(6)}${pct(f.a, f.n).padStart(9)}   ${f.q.slice(0, 58)}`);
}

if (filas.length > 18) {
  console.log("\n  ── las que PEOR funcionan ──");
  for (const f of filas.slice(-6)) {
    console.log(`  ${String(f.n).padStart(6)}${pct(f.a, f.n).padStart(9)}   ${f.q.slice(0, 58)}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
console.log("\n" + LINEA);
console.log("PATRONES: PEDIR EL PEDIDO vs PREGUNTAR QUE LE PARECE");
console.log(LINEA);

// Dos familias de cierre, que es lo que de verdad se quiere comparar.
const PATRONES = [
  ["pide los DATOS (nombre/direccion/celular)", /(nombre completo|tu nombre|direccion|celular|telefono|datos para|para el envio|donde te lo enviamos|a nombre de)/],
  ["pide CONFIRMAR / despachar", /(confirmo|confirmas|confirmamos|lo despacho|te lo despacho|lo enviamos|hacemos el pedido|separo|aparto|procedo)/],
  ["ofrece 2 unidades", /(dos conjuntos|# conjuntos|llevas #|segunda unidad|promo)/],
  ["pregunta TALLA o COLOR", /(que talla|cual talla|tu talla|que color|cual color|de la franja)/],
  ["pregunta abierta ('que te parece')", /(te parece|te sirve|quedamos|te animas|te interesa|alguna otra pregunta|algo mas|dudas)/],
];

console.log(`\n  ${"veces".padStart(7)}${"avanzan".padStart(9)}   patron de cierre`);
console.log("  " + "─".repeat(74));
const resultados = [];
for (const [nombre, re] of PATRONES) {
  let a = 0;
  let s = 0;
  for (const t of avanzaron) if (re.test(normalizar(t))) a++;
  for (const t of sequedaron) if (re.test(normalizar(t))) s++;
  const n = a + s;
  resultados.push({ nombre, n, a, tasa: n > 0 ? a / n : 0 });
}
resultados.sort((x, y) => y.tasa - x.tasa);
for (const r of resultados) {
  console.log(`  ${String(r.n).padStart(7)}${pct(r.a, r.n).padStart(9)}   ${r.nombre}`);
}

const base = avanzaron.length / (avanzaron.length + sequedaron.length);
console.log(`\n  Para comparar, el promedio de TODOS los cotizados: ${pct(avanzaron.length, avanzaron.length + sequedaron.length)}`);

const mejor = resultados[0];
const peor = resultados[resultados.length - 1];
console.log(`
  🔑 El mejor patron es "${mejor.nombre}" con ${pct(mejor.a, mejor.n)}.
     El peor es "${peor.nombre}" con ${pct(peor.a, peor.n)}.
     Diferencia: ${(mejor.tasa / (peor.tasa || 1)).toFixed(1)} veces.

  ⚠️ SIGUE SIENDO CORRELACION. El agente elegia que preguntar segun como venia
     la charla: al cliente que ya sonaba decidido le pedia los datos, y al que
     dudaba le preguntaba que le parecia. Asi que parte de la diferencia es el
     cliente, no la frase.

     Pero hay algo que SI es causa y no depende de eso: si el mensaje del total
     no pide NADA concreto, el cliente no tiene siguiente paso que dar. Y eso es
     justo lo que le falta al guion del bot hoy — dice "da el TOTAL" y no dice
     que pedir despues.
`);
console.log(LINEA + "\n");
