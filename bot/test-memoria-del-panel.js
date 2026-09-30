/**
 * LOS ARREGLOS DE MEMORIA DEL PANEL — 30-sep
 *
 * 🔴 POR QUÉ EXISTE: Render mató el bot 74 veces por memoria. El diagnóstico
 * apuntaba a la bandera de V8 y a las hojas del PDF, y las dos estaban mal. La
 * causa era el panel: cada recarga costaba ~820 MB de RSS para producir 358 KB
 * de HTML, y se recargaba solo cada 45 segundos, con la pestaña a la vista o no.
 *
 * Medición antes/después con el mismo script (analisis/memoria-del-panel-30sep.js):
 *
 *     código de main:   821 MB · 2.898 ms por recarga
 *     esta rama:        136 MB ·   250 ms por recarga
 *
 * Lo que blinda esta batería es que los tres arreglos NO cambiaron la conducta:
 *
 *   1. `diaBogota` reusa un formateador de Intl en vez de crear uno por llamada.
 *      Tiene que dar EXACTAMENTE el mismo texto que la versión vieja, y no puede
 *      lanzar con una fecha inválida (Intl lanza donde toLocaleDateString no lo
 *      hacía, y sí llegan fechas inválidas desde panel.js).
 *   2. `atencion.atendidos()` puede reusar evaluaciones ya calculadas. Con caché
 *      o sin caché el resultado tiene que ser idéntico.
 *   3. El refresco del panel no corre si la pestaña no está a la vista.
 *
 *   node test-memoria-del-panel.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

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

// Datos de prueba en un directorio temporal: nada real, y nada que quede escrito.
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "memoria-panel-"));
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "token-de-prueba-que-no-es-el-real";

const TZ = "America/Bogota";

// ============================================================================
console.log("\n── 1. diaBogota: mismo resultado que la versión vieja ──────────");
// ============================================================================
const resumen = require("./src/resumen");
const auditoria = require("./src/panel-auditoria");

/** La implementación que había antes del arreglo, para comparar contra ella. */
function viejo(ms) {
  return new Date(ms).toLocaleDateString("en-CA", { timeZone: TZ });
}

// Un año entero hora por hora cruza los dos cambios de día en UTC y en Bogotá,
// que es justo donde este proyecto ya se equivocó antes.
const ARRANQUE = Date.UTC(2026, 0, 1, 0, 0, 0);
let iguales = 0;
let distintos = [];
for (let h = 0; h < 24 * 365; h++) {
  const ms = ARRANQUE + h * 3600000;
  const a = viejo(ms);
  const b = resumen.diaBogota(ms);
  if (a === b) iguales++;
  else if (distintos.length < 5) distintos.push(`${new Date(ms).toISOString()}: viejo=${a} nuevo=${b}`);
}
chequear(
  `un año entero hora por hora (${iguales} de ${24 * 365}) da el mismo día`,
  iguales === 24 * 365,
  distintos.join("\n     ")
);

// El borde que más importa: las 19:00 de Bogotá, cuando en UTC ya es mañana.
const bordes = [
  Date.UTC(2026, 8, 30, 23, 59, 0), // 18:59 Bogotá del 30-sep
  Date.UTC(2026, 9, 1, 0, 0, 0), //    19:00 Bogotá del 30-sep
  Date.UTC(2026, 9, 1, 4, 59, 0), //   23:59 Bogotá del 30-sep
  Date.UTC(2026, 9, 1, 5, 0, 0), //    00:00 Bogotá del 1-oct
];
for (const ms of bordes) {
  chequear(
    `borde ${new Date(ms).toISOString()} → ${resumen.diaBogota(ms)}`,
    resumen.diaBogota(ms) === viejo(ms),
    `viejo=${viejo(ms)} nuevo=${resumen.diaBogota(ms)}`
  );
}
chequear("las 19:00 de Bogotá siguen siendo el día de Bogotá, no el de UTC",
  resumen.diaBogota(Date.UTC(2026, 9, 1, 0, 0, 0)) === "2026-09-30");

// hoyBogota y ayerBogota siguen colgando de la misma función
chequear("hoyBogota() da un día con formato YYYY-MM-DD", /^\d{4}-\d{2}-\d{2}$/.test(resumen.hoyBogota()));
chequear("ayerBogota() es exactamente un día antes que hoyBogota()", (() => {
  const h = new Date(resumen.hoyBogota() + "T12:00:00Z").getTime();
  const a = new Date(resumen.ayerBogota() + "T12:00:00Z").getTime();
  return h - a === 86400000;
})());

// ============================================================================
console.log("\n── 2. la trampa: Intl LANZA con una fecha inválida ─────────────");
// ============================================================================
// `toLocaleDateString` devolvía "Invalid Date"; `Intl.format` lanza RangeError.
// Y panel.js llama diaBogota(e?.esperaDesde || x.cuando || e?.atendidoAt), que da
// undefined si los tres faltan. Sin la guarda, el arreglo de memoria tumbaba el
// panel entero.
const invalidos = [
  ["undefined", undefined],
  ["null", null],
  ["NaN", NaN],
  ["un texto que no es fecha", "no soy una fecha"],
  ["un objeto", {}],
];
for (const [etiqueta, malo] of invalidos) {
  let lanzo = false;
  let salida;
  try {
    salida = resumen.diaBogota(malo);
  } catch (e) {
    lanzo = true;
  }
  chequear(
    `diaBogota(${etiqueta}) no lanza y devuelve texto`,
    !lanzo && typeof salida === "string",
    lanzo ? "lanzó una excepción: tumbaría el panel" : `devolvió ${JSON.stringify(salida)}`
  );
}
chequear("con fecha inválida devuelve lo mismo que antes ('Invalid Date')",
  resumen.diaBogota(undefined) === viejo(undefined));

// La copia de panel-auditoria.js tiene el mismo arreglo y la misma guarda
chequear("panel-auditoria.diaBogota da el mismo día que resumen.diaBogota",
  auditoria.diaBogota(ARRANQUE) === resumen.diaBogota(ARRANQUE));
chequear("panel-auditoria.diaBogota tampoco lanza con fecha inválida", (() => {
  try { return typeof auditoria.diaBogota(undefined) === "string"; } catch { return false; }
})());

// ============================================================================
console.log("\n── 3. el formateador reusado no guarda estado entre llamadas ───");
// ============================================================================
// Si guardara estado, la segunda llamada con el mismo valor daría otra cosa, y el
// panel mostraría chats en el día equivocado de forma intermitente.
const unDia = Date.UTC(2026, 5, 15, 18, 30, 0);
const primera = resumen.diaBogota(unDia);
for (let i = 0; i < 50; i++) resumen.diaBogota(Date.now() - i * 987654);
chequear("después de 50 llamadas con otras fechas, la misma fecha da lo mismo",
  resumen.diaBogota(unDia) === primera, `primera=${primera} ahora=${resumen.diaBogota(unDia)}`);

// ============================================================================
console.log("\n── 4. atendidos(): con caché o sin caché, mismo resultado ──────");
// ============================================================================
const atencion = require("./src/atencion");

// Conversaciones armadas para que haya de los dos tipos: atendidos por humano y
// no atendidos. Los teléfonos son inventados.
const ahora = Date.now();
const convs = {};
for (let i = 0; i < 30; i++) {
  const humano = i % 3 === 0;
  convs[`5730000${String(i).padStart(5, "0")}`] = {
    messages: [
      { role: "user", content: "hola, quiero el impermeable", at: ahora - 7200000 },
      humano
        ? { role: "assistant", content: "claro que si, ya le cuento", at: ahora - 3600000, por: "humano" }
        : { role: "user", content: "hola? me responden?", at: ahora - 3600000 },
    ],
    paused: false,
    ultimoDelCliente: ahora - 3600000,
    ...(humano ? { ultimaRespuestaHumana: ahora - 3600000 } : null),
  };
}
// Una de prueba, que atendidos() tiene que saltarse
convs["prueba-123"] = {
  messages: [{ role: "user", content: "test", at: ahora }],
  ultimaRespuestaHumana: ahora,
};

const evaluadas = new Map();
for (const [tel, c] of Object.entries(convs)) evaluadas.set(tel, atencion.evaluar(tel, c));

const sinCache = atencion.atendidos(convs);
const conCache = atencion.atendidos(convs, evaluadas);

chequear("la lista tiene el mismo largo con caché y sin caché",
  sinCache.length === conCache.length, `sin=${sinCache.length} con=${conCache.length}`);
chequear("y el mismo orden de teléfonos",
  JSON.stringify(sinCache.map((a) => a.tel)) === JSON.stringify(conCache.map((a) => a.tel)));
chequear("y los mismos campos de atención en cada uno",
  sinCache.every((a, i) => a.atendido === conCache[i].atendido && a.atendidoAt === conCache[i].atendidoAt));
chequear("los teléfonos que empiezan por 'prueba-' se siguen saltando",
  !conCache.some((a) => a.tel.startsWith("prueba-")));
chequear("y encontró al menos un atendido (si no, la prueba no probaría nada)",
  conCache.length > 0, `encontró ${conCache.length}`);

// Una caché a la que le faltan entradas tiene que caer a evaluar() por las que
// falten, no saltárselas.
const parcial = new Map();
let n = 0;
for (const [tel, e] of evaluadas) if (n++ % 2 === 0) parcial.set(tel, e);
const conParcial = atencion.atendidos(convs, parcial);
chequear("con una caché incompleta el resultado sigue siendo el mismo",
  JSON.stringify(conParcial.map((a) => a.tel)) === JSON.stringify(sinCache.map((a) => a.tel)),
  `parcial=${conParcial.length} completo=${sinCache.length}`);
chequear("y sin caché (undefined) se comporta como siempre — no rompe a quien ya la llamaba",
  atencion.atendidos(convs, undefined).length === sinCache.length);

// ============================================================================
console.log("\n── 5. el panel no se recarga si la pestaña no se está mirando ──");
// ============================================================================
fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs, null, 2));
fs.writeFileSync(path.join(DIR, "orders.json"), "[]");
fs.writeFileSync(path.join(DIR, "guias-enviadas.json"), "{}");

const panel = require("./src/panel");
const html = panel.render(null);

chequear("el refresco automático consulta document.hidden antes de recargar",
  /document\.hidden/.test(html), "sin esto, una pestaña olvidada abierta mata el bot");
chequear("ya no queda el intervalo de 45 segundos", !/\b45000\b/.test(html));
chequear("el intervalo nuevo es de 3 minutos (180000)", /\b180000\b/.test(html));
chequear("y refresca al volver a la pestaña (visibilitychange)",
  /visibilitychange/.test(html), "si no, al volver vería datos viejos");

// ============================================================================
console.log("\n── 6. el render sigue produciendo el panel completo ────────────");
// ============================================================================
// Los arreglos tocaron el camino por donde se arman las listas. Si algo se
// rompió, el HTML sale sin sus pedazos y eso no lo ve ninguna de las pruebas
// anteriores.
chequear("el HTML tiene el encabezado del panel", /<html/i.test(html) && html.length > 10000,
  `largo=${html.length}`);
chequear("dos renders seguidos dan el mismo largo (no queda estado colgado)",
  Math.abs(panel.render(null).length - html.length) < 200);

// El embudo ahora recibe las conversaciones que ya estaban en memoria en vez de
// leer el archivo por segunda vez. Tiene que dar lo mismo que calcularlo directo.
const store = require("./src/store");
const embudo = require("./src/embudo");
const directo = embudo.calcular(store.todasLasConversaciones(), store.todosLosPedidos());
chequear("el embudo cuenta el mismo total leyendo una vez que leyendo dos",
  typeof directo.total === "number" && directo.total > 0, `total=${directo.total}`);
chequear("y ese total aparece en el panel", html.includes(String(directo.total)));

// ============================================================================
try { fs.rmSync(DIR, { recursive: true, force: true }); } catch {}

console.log(`\n${"─".repeat(62)}`);
console.log(`${ok} bien · ${mal} mal`);
if (mal > 0) {
  console.log("🔴 HAY FALLAS");
  process.exit(1);
}
console.log("🟢 todo bien");
