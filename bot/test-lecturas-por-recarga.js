/**
 * EL PANEL NO PUEDE LEER EL DISCO UNA VEZ POR PEDIDO.
 *
 * POR QUÉ EXISTE (14-oct). Render mató el instance 9 veces en 4 horas. Parte de
 * la culpa fue mía: el arreglo del caso Yordy (9-oct) agregó
 * `store.guiaEnviadaAlCliente()`, que leía y parseaba el archivo COMPLETO de
 * guías en CADA llamada — y panel.js la llamaba una vez POR PEDIDO PENDIENTE.
 *
 * Medido con 150 pedidos, 320 conversaciones y 600 guías:
 *     antes de mi cambio :  13 lecturas ·  2,9 MB por recarga
 *     con mi cambio      :  54 lecturas ·  8,8 MB por recarga
 *     con el índice      :  14 lecturas ·  3,1 MB por recarga
 *
 * Y el panel se refresca solo cada 45 segundos, así que eran ~9 MB de basura
 * cada 45 s por cada pestaña abierta.
 *
 * 🔑 LO QUE BLINDA ESTA BATERÍA es que el trabajo por recarga NO crezca con la
 * cantidad de pedidos pendientes. El dueño lo había notado sin saber por qué:
 * *"tenía muchos pedidos, ya los he ido liberando, ¿será que era eso?"*. Sí era
 * eso — cada pedido pendiente costaba una lectura del archivo completo.
 *
 * ⚠️ NO mide MB de RSS a propósito: eso depende del recolector de V8, que en una
 * máquina grande tiene techo de 4 GB y no colecta igual que en el contenedor de
 * 512 MB. Las lecturas de disco son deterministas y se pueden afirmar.
 *
 *   node test-lecturas-por-recarga.js      (sin credenciales, sin red)
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

/** Arma un DATA_DIR con N pedidos pendientes y mide las lecturas de UN render. */
function medirConPendientes(pendientes) {
  const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "lecturas-"));
  const TOTAL = pendientes + 20;
  const orders = [];
  const guias = {};
  const convs = {};
  for (let i = 0; i < TOTAL; i++) {
    const tel = `5731${String(10000000 + i)}`;
    const g = `2400${String(10000000 + i)}`;
    orders.push({
      id: `id-${i}`,
      fecha: new Date(Date.now() - i * 3600000).toISOString(),
      nombre: `Cliente ${i}`,
      celular: `31${String(10000000 + i)}`,
      telefono_chat: tel,
      ciudad: "Cali",
      direccion: `Calle ${i}`,
      color: "Negro",
      talla: "XL",
      total: 82000,
      pago: "contraentrega",
      // Los que pasan de `pendientes` ya salieron.
      ...(i >= pendientes ? { guia: g } : {}),
    });
    // Guías enviadas para TODOS: así los pendientes son "guías huérfanas" y el
    // camino caro se ejercita de verdad.
    guias[g] = { guia: g, telefono: tel, nombre: `Cliente ${i}`, fecha: Date.now() - i * 60000 };
    convs[tel] = {
      messages: [{ role: "user", content: "hola, quiero uno", at: Date.now() - i * 1000 }],
      paused: false,
      ultimoDelCliente: Date.now() - i * 1000,
      perfil: { nombre: `Cliente ${i}` },
    };
  }
  fs.writeFileSync(path.join(DIR, "orders.json"), JSON.stringify(orders));
  fs.writeFileSync(path.join(DIR, "guias-enviadas.json"), JSON.stringify(guias));
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs));

  // Proceso hijo: el store cachea el DATA_DIR al cargarse, así que no se puede
  // cambiar en el mismo proceso.
  const { execFileSync } = require("child_process");
  const hijo = `
    const fs = require("fs");
    const panel = require(${JSON.stringify(path.join(__dirname, "src", "panel"))});
    const real = fs.readFileSync;
    let lecturas = 0, bytes = 0;
    fs.readFileSync = function (...a) {
      lecturas++;
      const r = real.apply(this, a);
      if (r && r.length) bytes += r.length;
      return r;
    };
    const html = panel.render("");
    fs.readFileSync = real;
    console.log(JSON.stringify({ lecturas, bytes, largo: html.length,
      avisa: html.includes("GU\\u00cdA YA ENVIADA") }));
  `;
  const salida = execFileSync(process.execPath, ["-e", hijo], {
    env: { ...process.env, DATA_DIR: DIR, TZ: "America/Bogota" },
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  try {
    fs.rmSync(DIR, { recursive: true, force: true });
  } catch {
    /* es /tmp */
  }
  const linea = salida.trim().split("\n").filter((l) => l.startsWith("{")).pop();
  return JSON.parse(linea);
}

// ============================================================================
console.log("\n── 1. Las lecturas de disco NO crecen con los pedidos pendientes ──");
// ============================================================================
const pocos = medirConPendientes(5);
const muchos = medirConPendientes(60);

console.log(`   5 pendientes  → ${pocos.lecturas} lecturas · ${Math.round(pocos.bytes / 1024)} KB`);
console.log(`  60 pendientes  → ${muchos.lecturas} lecturas · ${Math.round(muchos.bytes / 1024)} KB`);

chequear(
  "con 5 pendientes el panel lee poco (menos de 25 veces)",
  pocos.lecturas < 25,
  `leyó ${pocos.lecturas} veces`
);
chequear(
  "🔑 con 60 pendientes NO lee 12 veces más",
  muchos.lecturas < pocos.lecturas + 15,
  `5 pendientes: ${pocos.lecturas} lecturas · 60 pendientes: ${muchos.lecturas}. ` +
    `Alguien volvió a leer el disco dentro del bucle de los pedidos.`
);
chequear(
  "las lecturas por pedido extra son menos de 0,3",
  (muchos.lecturas - pocos.lecturas) / 55 < 0.3,
  `crecieron ${muchos.lecturas - pocos.lecturas} lecturas por 55 pedidos más`
);

// ============================================================================
console.log("\n── 2. Y el aviso de la guía huérfana sigue funcionando ──");
// El arreglo no sirve si para ser rápido dejó de avisar.
// ============================================================================
chequear("con 5 pendientes avisa que ya hay guía enviada", pocos.avisa === true);
chequear("con 60 pendientes también", muchos.avisa === true);

// ============================================================================
console.log("\n── 3. El índice de guías por teléfono ──");
// ============================================================================
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "indice-"));
process.env.DATA_DIR = DIR;
const store = require("./src/store");

// ⚠️ El archivo se escribe a mano y NO con registrarGuiaEnviada(), porque esa
// función pisa `fecha` con Date.now() —correcto para producción—. Para probar
// "se queda con la más reciente" hacen falta dos fechas distintas de verdad.
fs.writeFileSync(
  path.join(DIR, "guias-enviadas.json"),
  JSON.stringify({
    111: { guia: "111", telefono: "573001112233", nombre: "Ana", fecha: 1000 },
    222: { guia: "222", telefono: "573001112233", nombre: "Ana", fecha: 5000 },
    333: { guia: "333", telefono: "573009998877", nombre: "Beto", fecha: 2000 },
  })
);

const indice = store.indiceDeGuiasPorTelefono();
chequear("es un Map", indice instanceof Map);
chequear("indexa por los últimos 10 dígitos", indice.has("3001112233"));
chequear(
  "con dos guías del mismo teléfono se queda con la MÁS RECIENTE",
  indice.get("3001112233").guia === "222",
  indice.get("3001112233") && indice.get("3001112233").guia
);

const pedidoAna = { celular: "3001112233", telefono_chat: "573001112233" };
chequear(
  "guiaEnviadaAlCliente con índice no toca el disco y encuentra igual",
  store.guiaEnviadaAlCliente(pedidoAna, indice).guia === "222"
);
chequear(
  "y sin índice sigue funcionando (compatibilidad)",
  store.guiaEnviadaAlCliente(pedidoAna).guia === "222"
);
chequear(
  "un pedido sin guía enviada devuelve null",
  store.guiaEnviadaAlCliente({ celular: "3005554444" }, indice) === null
);
chequear("un pedido sin teléfono devuelve null", store.guiaEnviadaAlCliente({}, indice) === null);

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Si el panel vuelve a leer el disco por pedido, ` +
      `Render mata el proceso por memoria: ya pasó el 14-oct.`
  );
}
process.exit(mal ? 1 : 0);
