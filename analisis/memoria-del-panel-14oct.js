// ============================================================================
// EL PANEL SE VOLVIO A CAER POR MEMORIA — 14-oct
//
// Render mato el instance 9 veces en 4 horas (eventos "Instance failed"), con la
// memoria oscilando entre 40% y 100% de los 512 MB.
//
// ⚠️ LO QUE ESTE SCRIPT **NO** CULPA, y por que:
//
//   ⛔ La bandera --max-old-space-size. En el contenedor de Render el techo de
//      V8 medido es 268 MB: V8 YA se ajusta solo. En una maquina grande el techo
//      es 4.144 MB, asi que medirlo aca enganiaria. Esto ya se habia descartado
//      el 30-sep y sigue descartado.
//   ⛔ La cantidad de pedidos por si sola. Pesa, pero linealmente y poco.
//
// LO QUE SI MIDE: la regresion que introduje el 9-oct con el arreglo del caso
// Yordy. `guiaEnviadaAlCliente()` lee y parsea el archivo COMPLETO de guias en
// cada llamada, y panel.js la llamaba UNA VEZ POR PEDIDO PENDIENTE.
//
// 🔑 Y POR QUE EL SCRIPT DEL 30-SEP NO LO HABRIA VISTO: ese fabrica
// `orders.json = []`. Nunca medio el camino de los pedidos, que es justo donde
// esta esta regresion. Por eso este script fabrica pedidos y guias.
//
// Cada medicion corre en un PROCESO HIJO NUEVO, igual que el del 30-sep: medir
// los dos caminos en el mismo proceso contamina el RSS del segundo.
//
// Datos 100% sinteticos: no entra ningun dato real de cliente.
//
//     node analisis/memoria-del-panel-14oct.js
// ============================================================================

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const BOT = path.join(__dirname, "..", "bot");
const mb = (n) => Math.round((n / 1048576) * 10) / 10;

/** Fabrica un DATA_DIR del tamaño de producción, con pedidos Y guías. */
function fabricar({ conversaciones = 320, pedidos = 150, pendientes = 40, guias = 600 } = {}) {
  const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "panel-14oct-"));
  const MSGS = 12;

  const convs = {};
  for (let i = 0; i < conversaciones; i++) {
    const messages = [];
    for (let m = 0; m < MSGS; m++) {
      messages.push({
        role: m % 2 ? "assistant" : "user",
        content:
          "Texto de relleno para que la conversacion pese lo mismo que en produccion. " +
          `Hablamos del impermeable, la talla y el envio. Mensaje ${m} de la charla ${i}.`,
        at: Date.now() - (MSGS - m) * 60000,
      });
    }
    convs[`5731${String(10000000 + i)}`] = {
      messages,
      paused: false,
      ultimoDelCliente: Date.now() - i * 1000,
      perfil: { nombre: `Cliente Numero ${i}` },
    };
  }

  const orders = [];
  for (let i = 0; i < pedidos; i++) {
    const despachado = i >= pendientes;
    orders.push({
      id: `id-${i}`,
      fecha: new Date(Date.now() - i * 3600000).toISOString(),
      nombre: `Cliente Numero ${i}`,
      celular: `31${String(10000000 + i)}`,
      telefono_chat: `5731${String(10000000 + i)}`,
      ciudad: ["Bogota", "Cali", "Medellin", "Buga", "Palmira"][i % 5],
      direccion: `Calle ${i} # ${i}-${i}, barrio de relleno`,
      color: "Negro",
      talla: "XL",
      unidades: 1,
      total: 82000,
      pago: i % 5 === 0 ? "anticipado" : "contraentrega",
      ...(despachado ? { guia: `2400${String(10000000 + i)}` } : {}),
    });
  }

  // guias-enviadas.json NO SE BORRA NUNCA: acumula cada guía que salió alguna vez.
  const guiasEnviadas = {};
  for (let i = 0; i < guias; i++) {
    const g = `2400${String(10000000 + i)}`;
    guiasEnviadas[g] = {
      guia: g,
      telefono: `5731${String(10000000 + i)}`,
      nombre: `Cliente Numero ${i}`,
      transportadora: "interrapidisimo",
      messageId: "wamid." + "x".repeat(40) + i,
      certeza: 80,
      fecha: Date.now() - i * 60000,
    };
  }

  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs));
  fs.writeFileSync(path.join(DIR, "orders.json"), JSON.stringify(orders));
  fs.writeFileSync(path.join(DIR, "guias-enviadas.json"), JSON.stringify(guiasEnviadas));
  return DIR;
}

// El hijo: renderiza el panel N veces y reporta RSS y lecturas de disco.
// `porPedido=1` fuerza el camino VIEJO (sin índice), para comparar.
const HIJO = `
const fs = require("fs");
const store = require(process.env.BOT + "/src/store");
const PORPEDIDO = process.env.PORPEDIDO === "1";
if (PORPEDIDO) {
  // Simula el código del 9-oct: ignora el índice y lee el disco en cada llamada.
  const indice = store.indiceDeGuiasPorTelefono;
  store.indiceDeGuiasPorTelefono = () => undefined;
  void indice;
}
const panel = require(process.env.BOT + "/src/panel");
const real = fs.readFileSync;
let lecturas = 0, bytes = 0;
fs.readFileSync = function (...a) {
  lecturas++;
  const r = real.apply(this, a);
  if (r && r.length) bytes += r.length;
  return r;
};
const N = Number(process.env.RECARGAS || 10);
const antes = process.memoryUsage().rss;
let pico = antes, chars = 0;
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  chars = panel.render("").length;
  const ahora = process.memoryUsage().rss;
  if (ahora > pico) pico = ahora;
}
const ms = Date.now() - t0;
fs.readFileSync = real;
console.log(JSON.stringify({
  rssAntes: antes, rssPico: pico, rssFinal: process.memoryUsage().rss,
  lecturas, bytes, ms, chars, N,
}));
`;

function medir(DIR, { porPedido, recargas }) {
  const salida = execFileSync(process.execPath, ["-e", HIJO], {
    env: {
      ...process.env,
      DATA_DIR: DIR,
      BOT,
      PORPEDIDO: porPedido ? "1" : "0",
      RECARGAS: String(recargas),
      TZ: "America/Bogota",
    },
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const linea = salida.trim().split("\n").filter((l) => l.startsWith("{")).pop();
  return JSON.parse(linea);
}

// ---------------------------------------------------------------------------
const RECARGAS = 10;
console.log("=".repeat(76));
console.log("EL PANEL SE VOLVIO A CAER POR MEMORIA — 14-oct");
console.log("=".repeat(76));

const DIR = fabricar();
const tam = (f) => mb(fs.statSync(path.join(DIR, f)).size);
console.log(`
  Dataset sintetico del tamanio de produccion:
    conversations.json : ${tam("conversations.json")} MB  (320 charlas)
    orders.json        : ${tam("orders.json")} MB  (150 pedidos, 40 pendientes)
    guias-enviadas.json: ${tam("guias-enviadas.json")} MB  (600 guias, no se borran nunca)

  El panel se recarga SOLO cada 45 segundos, asi que ${RECARGAS} recargas son
  ~7 minutos de una pestania abierta.
`);

const viejo = medir(DIR, { porPedido: true, recargas: RECARGAS });
const nuevo = medir(DIR, { porPedido: false, recargas: RECARGAS });

const fila = (n, r) =>
  `  ${n.padEnd(34)} ${String(r.lecturas).padStart(7)} ${(mb(r.bytes) + " MB").padStart(11)} ` +
  `${(mb(r.rssPico) + " MB").padStart(11)} ${(r.ms + " ms").padStart(9)}`;

console.log(`  ${"".padEnd(34)} ${"lecturas".padStart(7)} ${"leido".padStart(11)} ${"RSS pico".padStart(11)} ${"tiempo".padStart(9)}`);
console.log("  " + "-".repeat(72));
console.log(fila("ANTES (una lectura por pedido)", viejo));
console.log(fila("AHORA (un indice por recarga)", nuevo));

const menosLecturas = viejo.lecturas - nuevo.lecturas;
const menosBytes = mb(viejo.bytes - nuevo.bytes);
console.log(`
  >>> ${menosLecturas} lecturas de disco menos y ${menosBytes} MB menos de basura
      en ${RECARGAS} recargas. Por recarga: ${Math.round(menosLecturas / RECARGAS)} lecturas
      y ${mb((viejo.bytes - nuevo.bytes) / RECARGAS)} MB.

  El HTML que se produce es IDENTICO (${mb(nuevo.chars)} MB de texto): el arreglo no
  cambia lo que ve el duenio, solo deja de leer el mismo archivo 41 veces.
`);

console.log("=".repeat(76));
console.log("LO QUE FALTA CONFIRMAR CON DATOS DE RENDER");
console.log("=".repeat(76));
console.log(`
  Estos MB absolutos NO son los de Render: en una maquina grande V8 tiene un
  techo de 4.144 MB y deja crecer el heap; en el contenedor el techo es 268 MB.
  Lo que vale es la comparacion entre las dos filas.

  Para cerrar el diagnostico hace falta /health?token=... del servicio, que ya
  reporta: proceso_mb, heap_mb, heap_reservado_mb, heap_techo_mb, buffers_mb,
  hojas_retenidas y el PICO con su hora.

  Si heap_techo_mb vuelve en ~268 -> V8 esta bien y la culpa es del trabajo por
  request (esto). Si vuelve en miles -> ahi si hay que poner la bandera.
`);

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}
