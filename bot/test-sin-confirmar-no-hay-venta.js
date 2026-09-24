/**
 * SIN "SÍ CONFIRMO" NO HAY VENTA.
 *
 * DE DÓNDE SALE (23-sep). El dueño encontró en el panel un pedido de un cliente
 * que había dicho, textual, **"No confirmo"**. Esta es la conversación real
 * (chat 573116093103, San Juan de Urabá):
 *
 *   BOT     : Confirmemos tu pedido ✅ ... Respóndeme "SÍ CONFIRMO" y lo despacho
 *   CLIENTE : Digites 58.900 por 2. Cuanto te da
 *   BOT     : (le explica la cuenta) ¿Te parece bien si procedemos?
 *   CLIENTE : No confirmo
 *   CLIENTE : Gracias
 *
 * Y el pedido quedó guardado igual.
 *
 * 🔑 ESTO ES PEOR QUE UN NÚMERO MAL CONTADO: si el dueño despacha por el panel,
 * le manda un paquete a alguien que dijo que no. Producto y flete tirados, y un
 * cliente molesto.
 *
 * LA CAUSA: el modelo emitió el bloque ##ORDER## junto con el cuadro de
 * confirmación, antes de que el cliente contestara. El guion dice que el bloque
 * va AL CONFIRMAR — pero eso es una instrucción, y hoy van cuatro veces que
 * comprobamos que una instrucción al modelo no es un candado.
 *
 *   node test-sin-confirmar-no-hay-venta.js      (sin credenciales ni IA)
 */

const { revisarConfirmacion, estadoDeConfirmacion } = require("./src/confirmacion");

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

const CUADRO =
  'Confirmemos tu pedido ✅\n\nNombre: Lorenzo Leal Sanmartin\nCelular: 3116093103\n' +
  "Ciudad: San Juan de Urabá\nDirección: Barrio Dos de Abril, frente al CDI\n" +
  "Color de la franja: Rojas\nTalla: L y XXL\nPago: contraentrega\n" +
  'TOTAL a pagar al recibir: $158.000\n\n¿Está todo bien? Respóndeme "SÍ CONFIRMO" y lo despacho 🏍️';

const pedido = { nombre: "Lorenzo Leal Sanmartin", ciudad: "San Juan de Urabá", total: 158000 };

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. 🔑 LA CONVERSACIÓN REAL DE LORENZO ──");

const chatReal = [
  u("¡Hola! Quiero más información."),
  b("¡Hola! 🏍️ Es el conjunto impermeable de 4 piezas..."),
  u("Los dos valen cuanto"),
  b("Si llevas dos van en el mismo paquete y pagas un solo envío..."),
  u("San juan de uraba"),
  b("Para San Juan de Urabá, el total por los dos conjuntos es de $158.000..."),
  u("LORENZO LEAL SANMARTIN CEL 3116093103. BARRIO DOS DE ABRIL. FRENTE AL CDI. TALLA L TALLA XXL FRANJA ROJAS"),
  b(CUADRO),
  u("Digites 58.900 por 2. Cuanto te da"),
  b("El valor del conjunto es $59.900 cada uno... ¿Te parece bien si procedemos con el despacho así?"),
  u("No confirmo"),
];

chequear(
  '🔑 "No confirmo" se lee como un NO',
  estadoDeConfirmacion(chatReal) === "no",
  `dio "${estadoDeConfirmacion(chatReal)}"`
);

const r = revisarConfirmacion(pedido, chatReal, "Entiendo perfectamente. ¿Hay algo que te haga dudar?");
chequear("🔑 el pedido NO se guarda", r.guardar === false);
chequear("y el motivo queda claro", /dijo que NO/i.test(r.motivo));
chequear("el estado es 'rechazado'", r.estado === "rechazado");

// Y con el "Gracias" que mandó después, tampoco.
chequear(
  'el "Gracias" posterior no lo convierte en venta',
  revisarConfirmacion(pedido, [...chatReal, u("Gracias")], "¡Con gusto!").guardar === false
);

console.log("\n── 2. 🔑 EL BLOQUE JUNTO CON EL CUADRO ES PREMATURO ──");
//
// Esta es la causa de raíz: el modelo manda el cuadro Y el bloque del pedido en
// el mismo mensaje. El cuadro acaba de preguntar "¿está todo bien?", así que el
// cliente no tuvo oportunidad de contestar.

{
  const historia = [u("hola"), b("Te llega a $158.000"), u("mis datos son...")];
  const res = revisarConfirmacion(pedido, historia, CUADRO);
  chequear("🔑 no se guarda si el bloque viene con el cuadro", res.guardar === false);
  chequear("el estado es 'prematuro'", res.estado === "prematuro");
  chequear("y lo explica", /MISMO mensaje que el cuadro/.test(res.motivo));
}

console.log("\n── 3. Una venta de verdad SÍ se guarda ──");

for (const si of [
  "SÍ CONFIRMO",
  "si confirmo",
  "Si",
  "sii",
  "confirmo",
  "listo",
  "dale",
  "ok",
  "perfecto",
  "claro",
  "de una",
  "hágale",
  "mándalo",
  "correcto",
  "todo bien",
  "de acuerdo",
  "acepto",
  "adelante",
]) {
  const h = [b(CUADRO), u(si)];
  chequear(`"${si}" → es una venta`, revisarConfirmacion(pedido, h, "¡Listo! Se despacha 📦").guardar === true);
}

console.log("\n── 4. Los NO, en todas sus formas ──");

for (const no of [
  "no",
  "No confirmo",
  "no gracias",
  "nop",
  "todavía no",
  "aún no",
  "por ahora no",
  "más tarde",
  "lo voy a pensar",
  "déjame pensar",
  "espera",
  "cancelar",
  "mejor no",
  "ya no",
  "muy caro",
  "no me alcanza",
]) {
  const h = [b(CUADRO), u(no)];
  chequear(`"${no}" → NO es una venta`, revisarConfirmacion(pedido, h, "Entiendo").guardar === false);
}

console.log("\n── 5. ⚠️ Lo dudoso NO se tira: se guarda marcado ──");
//
// El riesgo del otro lado. Si el cliente confirma de una forma que no
// reconocemos, perder la venta es peor que marcarla para revisar.

{
  const h = [b(CUADRO), u("y cuánto tarda en llegar")];
  const res = revisarConfirmacion(pedido, h, "¡Listo!");
  chequear("una respuesta rara se guarda", res.guardar === true);
  chequear("pero queda marcada", res.marcar === true);
  chequear("con estado 'sin-confirmar'", res.estado === "sin-confirmar");
  chequear("y con el motivo", /no se reconoce/.test(res.motivo));
}

console.log("\n── 6. Manda lo ÚLTIMO que dijo el cliente ──");

chequear(
  'dijo "no" y después "sí" → es venta',
  revisarConfirmacion(pedido, [b(CUADRO), u("no"), u("ah espera, sí confirmo entonces")], "Listo").guardar === true
);
chequear(
  'dijo "sí" y después "no" → NO es venta',
  revisarConfirmacion(pedido, [b(CUADRO), u("si"), u("no, cancelalo")], "Ok").guardar === false
);

console.log("\n── 7. Sin cuadro no hay nada que confirmar ──");

chequear(
  "si nunca se mandó el cuadro, no se guarda",
  revisarConfirmacion(pedido, [u("hola"), b("Te llega a $158.000"), u("ok")], "Listo").guardar === false
);
chequear(
  "si el cuadro es lo último y el cliente no contestó, no se guarda",
  revisarConfirmacion(pedido, [u("mis datos"), b(CUADRO)], "Algo más").guardar === false
);
chequear("estado 'sin-cuadro'", estadoDeConfirmacion([u("hola"), b("hola")]) === "sin-cuadro");

console.log("\n── 8. Casos borde: que no explote ──");

chequear("historial vacío", revisarConfirmacion(pedido, [], "x").guardar === false);
chequear("historial nulo", revisarConfirmacion(pedido, null, "x").guardar === false);
chequear("respuesta del bot vacía", typeof revisarConfirmacion(pedido, [b(CUADRO), u("si")], "").guardar === "boolean");
chequear(
  "un mensaje del cliente vacío se ignora y sigue mirando atrás",
  revisarConfirmacion(pedido, [b(CUADRO), u("si confirmo"), u("")], "Listo").guardar === true
);

console.log("\n── 9. El agente lo aplica antes de guardar ──");

const fs = require("fs");
const agente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
chequear("agent.js importa el módulo", /require\(["']\.\/confirmacion["']\)/.test(agente));
chequear("llama a revisarConfirmacion", /revisarConfirmacion\(order,/.test(agente));
chequear(
  "🔑 y lo hace ANTES de revisar teléfono y dirección",
  agente.indexOf("revisarConfirmacion(order,") < agente.indexOf("revisarTelefono(order"),
  "si no hay venta, lo demás no importa"
);
chequear(
  "le pasa la respuesta del bot, para cazar el caso prematuro",
  /revisarConfirmacion\(order, store\.getConv\(phone\)\.messages, reply\)/.test(agente)
);
chequear("marca el pedido dudoso", /sin_confirmar: true/.test(agente));

const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear("el aviso al dueño lo advierte", /order\.sin_confirmar/.test(servidor));
chequear(
  "y le dice que lea el chat antes de despachar",
  /Le[éí] el chat antes de despachar/.test(servidor)
);

console.log("\n── 10. El panel lo marca ──");

const DIR = "/tmp/prueba-sin-confirmar";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";
const store = require("./src/store");
store.saveOrder({
  nombre: "Dudoso",
  celular: "3001112233",
  ciudad: "Cali",
  direccion: "Calle 1 #2-3",
  talla: "M",
  color: "Rojo",
  total: 82000,
  telefono_chat: "573001112233",
  sin_confirmar: true,
  motivo_sin_confirmar: "el cliente contestó algo que no se reconoce",
});
delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();
chequear("el panel lo marca con etiqueta", /SIN CONFIRMAR/.test(html));
chequear("y avisa que hay que leer el chat", /no dijo un "s[íi]" claro/.test(html));
fs.rmSync(DIR, { recursive: true, force: true });

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
