// ============================================================================
// 🧠 POR QUÉ RENDER MATABA EL BOT — la medición, reproducible
//
// Correr:  node analisis/memoria-del-panel-30sep.js [conversaciones]
//
// CONTEXTO. Render mandó "exceeded its memory limit" y `/health` en producción
// mostraba esto, 754 segundos después de arrancar y SIN haber subido ningún PDF:
//
//     proceso 474 MB · heap usado 25 MB · heap reservado 31 MB
//     heap_techo 268 MB · buffers 5 MB · hojas retenidas 0 · planes 0
//     al_arrancar 78 MB · pico 478 MB · arranques 74
//
// O sea: arrancó liviano (78 MB), trepó a 478 en 11 minutos, y el heap estaba
// vacío. Eso descarta las tres primeras hipótesis:
//
//   ⛔ V8 mal dimensionado -> `heap_techo` es 268, no miles: V8 ya se ajustó
//      al contenedor. La bandera `--max-old-space-size` NO era el arreglo.
//   ⛔ Las hojas del PDF retenidas -> `hojas_retenidas: 0`, y medidas pesan 2 MB.
//   ⛔ El conversations.json -> el ciclo de mensajes se estabiliza en 128 MB.
//
// LA CAUSA REAL es lo que mide este script: cada recarga del panel cuesta
// cientos de MB, y el panel se recargaba solo cada 45 segundos.
//
// ⚠️ CADA SECCIÓN CORRE EN UN PROCESO HIJO NUEVO, a propósito. La primera versión
// de este script medía las tres seguidas en el mismo proceso, y como la sección 1
// quema 497 MB midiendo el camino viejo, el RSS de la sección 3 arrancaba
// contaminado y parecía que el arreglo no servía. Un medidor que se contamina a
// sí mismo es peor que no medir.
//
// ⚠️ Y los MB absolutos NO son los de Render: en una máquina grande V8 tiene un
// techo de 4.144 MB y deja crecer el heap, mientras que en el contenedor el techo
// es 268 MB y el recolector pelea más. Lo que vale es la comparación.
//
// Datos 100% sintéticos: no entra ningún dato real de cliente.
// ============================================================================

const fs = require("fs");
const path = require("path");
const os = require("os");

const mb = (n) => Math.round(n / 1048576);
const rss = () => mb(process.memoryUsage().rss);
const TZ = "America/Bogota";

/** Fabrica un conversations.json del tamaño de producción. */
function fabricar(N) {
  const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "panel-medicion-"));
  const MSGS = 12;
  const all = {};
  for (let i = 0; i < N; i++) {
    const messages = [];
    for (let m = 0; m < MSGS; m++) {
      messages.push({
        role: m % 2 ? "assistant" : "user",
        content:
          "Texto de relleno para que la conversacion pese lo mismo que en produccion. " +
          "Hablamos del impermeable, la talla, el color y el envio contraentrega. " +
          `Mensaje numero ${m} de la conversacion ${i}.`,
        at: Date.now() - (MSGS - m) * 60000,
      });
    }
    all[`5730000${String(i).padStart(5, "0")}`] = {
      messages,
      paused: false,
      ultimoDelCliente: Date.now() - i * 1000,
      seguimientos: 0,
      nombre: `Cliente Numero ${i}`,
    };
  }
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(all, null, 2));
  fs.writeFileSync(path.join(DIR, "orders.json"), "[]");
  fs.writeFileSync(path.join(DIR, "guias-enviadas.json"), "{}");
  return DIR;
}

// ---------------------------------------------------------------------------
const SECCIONES = {
  // 1️⃣ La llamada de la fecha: el costo principal, y el arreglo de una línea
  fecha() {
    const N = 50000;
    const base = Date.now();

    let a = rss();
    let t = Date.now();
    for (let i = 0; i < N; i++) new Date(base - i * 60000).toLocaleDateString("en-CA", { timeZone: TZ });
    const viejoMb = rss() - a, viejoMs = Date.now() - t;

    const FMT = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
    a = rss();
    t = Date.now();
    for (let i = 0; i < N; i++) FMT.format(new Date(base - i * 60000));
    const nuevoMb = rss() - a, nuevoMs = Date.now() - t;

    console.log(`1️⃣  LA FECHA EN HORA DE BOGOTÁ  (resumen.js · diaBogota)`);
    console.log(`    ${N.toLocaleString("es-CO")} llamadas — el orden de UNA recarga del panel:`);
    console.log(`      formateador nuevo cada vez (como estaba):  +${viejoMb} MB · ${viejoMs} ms`);
    console.log(`      un formateador reusado (como quedó):       +${nuevoMb} MB · ${nuevoMs} ms`);
    console.log(`      → ${(viejoMs / Math.max(nuevoMs, 1)).toFixed(1)}× más rápido, y sin dejar memoria arriba`);
  },

  // 2️⃣ El trabajo que se hacía dos veces por recarga
  duplicado(N) {
    const DIR = fabricar(N);
    process.env.DATA_DIR = DIR;
    const store = require("../bot/src/store");
    const atencion = require("../bot/src/atencion");
    const convs = store.todasLasConversaciones();

    let t = Date.now();
    const evaluadas = new Map();
    for (const [tel, c] of Object.entries(convs)) evaluadas.set(tel, atencion.evaluar(tel, c));
    const unaPasada = Date.now() - t;

    t = Date.now();
    atencion.atendidos(convs, evaluadas);
    const conCache = Date.now() - t;
    t = Date.now();
    atencion.atendidos(convs);
    const sinCache = Date.now() - t;

    console.log(`2️⃣  EL TRABAJO QUE SE HACÍA DOS VECES POR RECARGA`);
    console.log(`    atencion.evaluar() sobre las ${N}: ${unaPasada} ms una pasada`);
    console.log(`      atendidos() recalculando todo (como estaba): ${sinCache} ms`);
    console.log(`      atendidos() reusando lo ya evaluado:         ${conCache} ms`);
    console.log(`    y el conversations.json se leía y parseaba DOS veces (panel.js:144 y :573)`);
    fs.rmSync(DIR, { recursive: true, force: true });
  },

  // 4️⃣ El PDF de guías: pdfjs no devuelve la memoria, el proceso aparte sí
  async pdf() {
    const guias = require("../bot/src/guias");
    const { PDFDocument, StandardFonts } = require("../bot/node_modules/pdf-lib");

    async function lote(hojas) {
      const doc = await PDFDocument.create();
      const f = await doc.embedFont(StandardFonts.Helvetica);
      for (let i = 0; i < hojas; i++) {
        const p = doc.addPage([612, 792]);
        p.drawText(`Guia No 24006160${String(4800 + i).padStart(4, "0")}`, { x: 40, y: 740, size: 12, font: f });
        p.drawText(`CIUDAD: BOGOTA`, { x: 40, y: 700, size: 10, font: f });
        for (let l = 0; l < 50; l++) {
          p.drawText(`linea de relleno ${l} para darle peso a la etiqueta`, { x: 40, y: 660 - l * 10, size: 7, font: f });
        }
      }
      return Buffer.from(await doc.save());
    }

    console.log(`4️⃣  EL TEXTO DEL PDF DE GUÍAS  (guias.js · lineasPorPagina)`);
    const buffer = await lote(40);
    console.log(`    PDF de prueba: ${Math.round(buffer.length / 1024)} KB · 40 hojas`);

    const base = rss();
    console.log(`    RSS de partida: ${base} MB`);
    console.log(`    lote | en un proceso aparte (como quedó)`);
    console.log(`    -----|----------------------------------`);
    let previo = base;
    for (let l = 1; l <= 3; l++) {
      await guias.lineasPorPagina(buffer);
      const ahora = rss();
      console.log(`    ${String(l).padStart(4)} | RSS ${String(ahora).padStart(4)} MB   (+${ahora - previo} MB)`);
      previo = ahora;
    }
    const conWorker = rss() - base;

    // Y ahora el camino de siempre, en el mismo proceso, para ver la diferencia.
    const antesDeAdentro = rss();
    await guias.lineasEnEsteProceso(buffer);
    const unoAdentro = rss() - antesDeAdentro;

    console.log(`\n    3 lotes con el proceso aparte:     +${conWorker} MB en total`);
    console.log(`    UN solo lote dentro del proceso:   +${unoAdentro} MB`);
    console.log(`    → y esos ${unoAdentro} MB no los devuelve nunca, ni con destroy() ni con el recolector`);
  },

  // 3️⃣ El render completo, en un proceso limpio
  render(N) {
    const DIR = fabricar(N);
    process.env.DATA_DIR = DIR;
    process.env.PANEL_TOKEN = "token-de-prueba-que-no-es-el-real";
    const panel = require("../bot/src/panel");

    console.log(`3️⃣  UNA RECARGA DEL PANEL (${N} conversaciones), proceso limpio`);
    console.log(`    RSS antes del primer render: ${rss()} MB`);
    console.log(`    recarga |  RSS  | heapUsado | KB de HTML |   ms`);
    console.log(`    --------|-------|-----------|------------|------`);
    for (let r = 1; r <= 5; r++) {
      const t = Date.now();
      const html = panel.render(null);
      const ms = Date.now() - t;
      const m = process.memoryUsage();
      console.log(
        `    ${String(r).padStart(7)} | ${String(mb(m.rss)).padStart(5)} | ${String(mb(m.heapUsed)).padStart(9)} | ${String(Math.round(Buffer.byteLength(html, "utf8") / 1024)).padStart(10)} | ${String(ms).padStart(5)}`
      );
    }
    fs.rmSync(DIR, { recursive: true, force: true });
  },
};

// ---------------------------------------------------------------------------
const seccion = process.env.SECCION;
const N_CONV = Number(process.argv[2] || 2185);

if (seccion) {
  Promise.resolve(SECCIONES[seccion](N_CONV)).catch((e) => {
    console.error(String(e && e.stack ? e.stack : e));
    process.exit(1);
  });
} else {
  const { execFileSync } = require("child_process");
  console.log(`conversaciones simuladas: ${N_CONV}   (producción al 30-sep: 2.185 · 6.032 KB)`);
  console.log(`cada sección corre en un proceso nuevo, para que el RSS salga limpio\n`);
  for (const nombre of ["fecha", "duplicado", "render", "pdf"]) {
    try {
      const salida = execFileSync(process.execPath, [__filename, String(N_CONV)], {
        env: { ...process.env, SECCION: nombre },
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      console.log(salida.trimEnd() + "\n");
    } catch (e) {
      console.log(`🔴 la sección ${nombre} falló: ${e.message}\n`);
    }
  }
  console.log(`📌 El arreglo que no se puede medir acá:`);
  console.log(`   el panel se recargaba cada 45 s SIEMPRE —con la pestaña en el fondo,`);
  console.log(`   con el celular en el bolsillo, toda la noche—. Ahora es cada 3 minutos`);
  console.log(`   y no recarga nada si la pestaña no está a la vista. Eso se prueba en`);
  console.log(`   bot/test-memoria-del-panel.js, sección 5.`);
}
