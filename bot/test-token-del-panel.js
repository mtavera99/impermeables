/**
 * CADA PANTALLA TIENE QUE MANDAR LA MISMA CLAVE QUE EL SERVIDOR VALIDA.
 *
 * DE DÓNDE SALE ESTA PRUEBA (22-sep, lo encontró el dueño despachando):
 * al migrar todo a PANEL_TOKEN me salté `panel-guias.js`, que siguió usando
 * WHATSAPP_VERIFY_TOKEN. El servidor ya validaba PANEL_TOKEN, así que la
 * pantalla mandaba una clave que el servidor rechazaba:
 *
 *     🔴 Unexpected token 'F', "Forbidden" is not valid JSON
 *
 * Enviar guías quedó MUERTO ~4 horas, y el error no mencionaba ninguna clave.
 *
 * 🔑 POR QUÉ EL GUARDIÁN DE RUTAS NO LO AGARRÓ, Y ESTA PRUEBA SÍ:
 * las rutas estaban bien protegidas — el guardián las revisa y pasaban. Lo que
 * estaba mal era el token que el NAVEGADOR enviaba. Son dos mitades del mismo
 * candado y hay que compararlas entre sí; ninguna prueba que mire una sola de
 * las dos puede encontrar esto.
 *
 *   node test-token-del-panel.js      (sin credenciales ni IA)
 */

const fs = require("fs");

// Dos valores DISTINTOS a propósito: si una pantalla usa el viejo, se nota.
const CLAVE_NUEVA = "clave_panel_nueva_9988";
const CLAVE_VIEJA = "verify_token_viejo_1122";
process.env.PANEL_TOKEN = CLAVE_NUEVA;
process.env.WHATSAPP_VERIFY_TOKEN = CLAVE_VIEJA;
process.env.DATA_DIR = "/tmp/prueba-token-panel";
fs.rmSync("/tmp/prueba-token-panel", { recursive: true, force: true });

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

const PANTALLAS = [
  { nombre: "panel", modulo: "./src/panel" },
  { nombre: "guías", modulo: "./src/panel-guias" },
  { nombre: "novedades", modulo: "./src/panel-novedades" },
];

console.log("\n── 1. Ninguna pantalla manda la clave vieja ──");

for (const p of PANTALLAS) {
  const html = require(p.modulo).render({});
  chequear(
    `${p.nombre}: usa la clave que valida el servidor`,
    html.includes(CLAVE_NUEVA),
    "no aparece PANEL_TOKEN en la pantalla: sus botones van a dar 403"
  );
  chequear(
    `${p.nombre}: NO usa la clave vieja`,
    !html.includes(CLAVE_VIEJA),
    "manda WHATSAPP_VERIFY_TOKEN, que el servidor ya no acepta — esto es el bug del 22-sep"
  );
}

console.log("\n── 2. El servidor valida PANEL_TOKEN y nada más ──");
// Si alguna ruta de administración volviera a comparar contra VERIFY_TOKEN,
// pasaría lo contrario: la pantalla manda bien y el servidor rechaza.
const srv = fs.readFileSync(__dirname + "/src/server.js", "utf8");
const comparaciones = srv.match(/(?:!==|===)\s*VERIFY_TOKEN/g) || [];
chequear(
  "solo el webhook compara contra VERIFY_TOKEN (es lo que Meta manda)",
  comparaciones.length === 1,
  `hay ${comparaciones.length} comparaciones: alguna ruta del panel quedó con el token viejo`
);

console.log("\n── 3. Un 403 tiene que explicarse, no reventar ──");
// Un 403 devuelve el texto "Forbidden", no JSON. Si la pantalla hace r.json()
// sin mirar el estado, el dueño ve "Unexpected token 'F'" y se va a buscar el
// problema donde no está. Pasó dos veces: en /responder y en /guias.
for (const p of PANTALLAS) {
  const html = require(p.modulo).render({});
  const script = (html.match(/<script>([\s\S]*?)<\/script>/) || [])[1] || "";
  const fetches = (script.match(/fetch\(/g) || []).length;
  if (fetches === 0) {
    console.log(`ℹ️  ${p.nombre}: no hace peticiones, no aplica`);
    continue;
  }
  const manejados = (script.match(/status === 403/g) || []).length;
  chequear(
    `${p.nombre}: sus ${fetches} petición(es) manejan el 403 (${manejados})`,
    manejados >= fetches,
    "un 403 va a salir como 'Unexpected token F' en vez de decir que es la clave"
  );
  chequear(
    `${p.nombre}: y el mensaje del 403 habla de la clave`,
    /clave del panel/i.test(script),
    "el error no le dice al dueño qué tiene que arreglar"
  );
}

fs.rmSync("/tmp/prueba-token-panel", { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
