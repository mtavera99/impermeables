/**
 * EL EMBUDO: DÓNDE SE CAEN LOS CLIENTES.
 *
 * POR QUÉ EXISTE (22-sep): el dueño vio 97 conversaciones y 4 pedidos y no
 * había forma de saber qué pasó en el medio. Un 4% de cierre puede venir de
 * tres problemas distintos, y cada uno se arregla en otro lado:
 *   se van sin contestar  -> el ANUNCIO trae gente equivocada
 *   les cotizan y se van  -> el PRECIO
 *   dan datos y no cierran -> el CIERRE
 *
 * Las etapas se DEDUCEN de los mensajes guardados, así que los detectores son
 * lo frágil de todo esto: si el guion cambia de palabras, hay que ajustarlos.
 * Por eso se prueban contra transcripciones reales del bot en producción.
 *
 *   node test-embudo.js      (sin credenciales ni IA)
 */

const embudo = require("./src/embudo");

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
const u = (t) => ({ role: "user", content: t });
const b = (t) => ({ role: "assistant", content: t });

console.log("\n── 1. Cada etapa se reconoce ──");

chequear("escribió una vez y nada más → entró", embudo.etapaDe({ messages: [u("hola")] }) === "entro");
chequear(
  "contestó al bot → siguió la charla",
  embudo.etapaDe({ messages: [u("hola"), b("¿Qué talla usás?"), u("M")] }) === "volvio"
);
chequear(
  "el bot le dio un total → recibió precio",
  embudo.etapaDe({ messages: [u("cuánto a Cali"), b("Te llega a $82.000 al recibir 📦")] }) === "cotizado"
);
chequear(
  "el bot le pidió la dirección → llegó a los datos",
  embudo.etapaDe({ messages: [u("dale"), b("Perfecto, ¿cuál es tu dirección?")] }) === "datos"
);
chequear("una conversación vacía no cuenta", embudo.etapaDe({ messages: [] }) === "vacia");

console.log("\n── 2. 🔑 La transcripción REAL del pedido de Pedro (que sí cerró) ──");
// Sale del chat de producción del 22-sep, con los datos cambiados. Si el embudo
// no reconoce ESTA conversación como cerrada, no sirve para nada.
const pedro = {
  compro: true,
  messages: [
    u("Hola! Quiero mas informacion."),
    b("¡Hola! El conjunto impermeable de 4 piezas... ¿para qué ciudad sería el envío? 📦"),
    u("Oficina interrapidisimo"),
    b("¡Perfecto! Ya tenemos casi todo. Para confirmar, ¿en qué ciudad está esa oficina de Interrapidísimo?"),
    u("Manaure la guajira"),
    b("¡Listo! Para Manaure, Guajira, el envío entra en nuestra zona de pueblos. Confirmemos tu pedido ✅ Nombre: Pedro"),
    u("Talla s"),
    b("¡Perfecto, Pedro! Ya quedó ajustado. Confirmemos tu pedido ✅ Nombre: Pedro Epieyu Dirección: Oficina Interrapidisimo"),
    u("Confirmado"),
    b("¡Recibido, Pedro! Pedido confirmado ✅ Tu conjunto BikerPro va en camino."),
  ],
};
chequear("la conversación de Pedro cuenta como CERRADA", embudo.etapaDe(pedro, false) === "cerro");

console.log("\n── 3. No depende de una sola bandera ──");
// Si la marca `compro` fallara, el pedido igual existe. El embudo mira las dos
// fuentes: si dependiera solo de la marca, mostraría una fuga inventada y
// mandaría a arreglar lo que no está roto.
const sinMarca = { messages: [u("dale"), b("Confirmemos tu pedido ✅")] };
chequear(
  "sin la marca pero CON pedido guardado → cerró",
  embudo.etapaDe(sinMarca, true) === "cerro",
  "el embudo mostraría una fuga que no existe"
);
chequear("sin la marca y sin pedido → se queda en datos", embudo.etapaDe(sinMarca, false) === "datos");

const r = embudo.calcular(
  { "573001112233": sinMarca },
  [{ telefono_chat: "573001112233", nombre: "Ana", total: 83000 }]
);
chequear("calcular() también cruza contra la lista de pedidos", r.etapas[4].n === 1, `cerraron: ${r.etapas[4].n}`);

console.log("\n── 4. Las cuentas del embudo cierran ──");

const conv = {
  a: { messages: [u("hola")] },
  b: { messages: [u("hola")] },
  c: { messages: [u("hola"), b("¿talla?"), u("M")] },
  d: { messages: [u("a Cali?"), b("Son $82.000 al recibir")] },
  e: { messages: [u("dale"), b("¿tu dirección?")] },
  f: { compro: true, messages: [u("confirmo"), b("Pedido confirmado")] },
};
const e2 = embudo.calcular(conv, []);
chequear("el total son las 6 conversaciones", e2.total === 6, `dio ${e2.total}`);
chequear("las etapas van de mayor a menor", e2.etapas.every((x, i, a) => i === 0 || x.n <= a[i - 1].n));
chequear("cerró 1", e2.etapas[4].n === 1);
chequear("el cierre es 1 de 6", Math.abs(e2.cierre - 1 / 6) < 0.001, `dio ${e2.cierre}`);
chequear(
  "los perdidos de cada paso cuadran con la resta",
  e2.etapas.slice(1).every((x, i) => x.perdidos === e2.etapas[i].n - x.n)
);

console.log("\n── 5. La fuga se mide en CLIENTES, no en porcentaje ──");
// Perder el 80% de 5 personas importa menos que perder el 40% de 90. Si se
// eligiera por porcentaje, el panel señalaría el paso equivocado.
const muchos = {};
for (let i = 0; i < 90; i++) muchos["x" + i] = { messages: [u("hola")] };
for (let i = 0; i < 10; i++) muchos["y" + i] = { messages: [u("hola"), b("$82.000")] };
muchos.z = { compro: true, messages: [u("ok"), b("Pedido confirmado")] };

const e3 = embudo.calcular(muchos, []);
chequear(
  "la fuga apunta al paso donde se perdieron más personas",
  e3.fuga.clave === "volvio",
  `apuntó a "${e3.fuga.clave}" con ${e3.fuga.perdidos} perdidos`
);
chequear("y trae el diagnóstico de qué hacer", Boolean(e3.diagnostico) && e3.diagnostico.includes("anuncio"));

console.log("\n── 6. Nada de esto rompe el panel ──");
process.env.PANEL_TOKEN = "x";
process.env.DATA_DIR = "/tmp/prueba-embudo";
require("fs").rmSync("/tmp/prueba-embudo", { recursive: true, force: true });
const panel = require("./src/panel");
const html = panel.render();
chequear("el panel muestra el bloque del embudo o lo omite si no hay datos", typeof html === "string" && html.length > 500);
const script = html.match(/<script>([\s\S]*?)<\/script>/);
let compila = false;
try {
  new Function(script[1]);
  compila = true;
} catch (e) {
  compila = e.message;
}
chequear("el JavaScript del panel sigue compilando", compila === true, `error: ${compila}`);
require("fs").rmSync("/tmp/prueba-embudo", { recursive: true, force: true });

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
