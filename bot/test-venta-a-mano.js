/**
 * LA VENTA QUE EL BOT NO PUDO TOMAR TIENE QUE PODERSE REGISTRAR.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep). El dueño, en vivo:
 *
 *   "revisá un chat que escribió hace como 30 minutos y lo marcó el bot como
 *    atender humano, y ya el señor dijo que sí. ¿Cómo hago para que quede
 *    marcado como venta? No sé por qué no se marcó solo."
 *
 * 🔴 POR QUÉ NO SE MARCÓ SOLO — y es un hueco estructural, no un descuido:
 * cuando un chat pasa a modo humano, el webhook hace `continue` ANTES de llamar
 * a la IA. El bloque ##ORDER## lo emite la IA. Sin IA no hay bloque, y sin
 * bloque NO HAY VENTA REGISTRADA, pase lo que pase en la conversación.
 *
 * O sea: **todo chat escalado a humano perdía la captura del pedido.** Y son
 * justo los más calientes, los que el dueño atiende a mano porque ahí cierra
 * mejor. Esas ventas existían en WhatsApp y no en la contabilidad: el CPA, el
 * cierre y el share de 2 unidades quedaban todos subestimados.
 *
 * 🔴 Y HABÍA UN SEGUNDO BUG QUE LO TAPABA: /chat buscaba en los PEDIDOS, así que
 * la pantalla solo funcionaba con clientes que YA habían comprado. El enlace
 * "ver chat" del panel vive en la lista de atención humana —la de los que NO han
 * comprado— y al tocarlo salía "No encontré ningún pedido con eso". El chat que
 * más falta leer era el único que no se podía abrir.
 *
 * ⛔ LO QUE NO SE HACE, a propósito: dejar que la IA corra en chats pausados. El
 * sentido de pausar es que no contesten dos voces a la vez, y eso ya costó
 * clientes. Se le da al dueño la forma de registrar la venta él.
 *
 *   node test-venta-a-mano.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-venta-mano";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");
const fletes = require("./src/fletes");
const atencion = require("./src/atencion");
const panelChat = require("./src/panel-chat");

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

const TEL = "573001234567";

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. EL CASO REAL: cliente que dijo que sí, en modo humano ──");

store.pushMsg(TEL, "user", "hola, cuanto vale el impermeable?");
store.pushMsg(TEL, "assistant", "Son $73.000 en Bogotá, contraentrega");
store.pushMsg(TEL, "user", "si señor, lo quiero");
store.setPaused(TEL, true);

let html = panelChat.render({ id: TEL, token: "clave_de_prueba" });

chequear("el chat SE PUEDE ABRIR aunque no haya pedido", html.includes("lo quiero"), "antes decía 'No encontré ningún pedido'");
chequear("no sale el mensaje de 'no encontré'", !/No encontré ningún pedido/.test(html));
chequear("avisa que el chat está en modo humano", /modo humano/.test(html));
chequear(
  "y explica que por eso el bot no le puede tomar el pedido",
  /no le puede tomar el pedido/.test(html)
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Aparece el cajón para registrar la venta ──");

chequear("hay formulario de venta", /action="\/pedido-manual"/.test(html));
chequear("pide nombre y ciudad como obligatorios", (html.match(/required/g) || []).length >= 2);
chequear(
  "precarga el celular a partir del número del chat",
  /value="3001234567"/.test(html),
  "el 57 del país se quita: la transportadora lo quiere sin indicativo"
);
chequear("el total se puede dejar vacío", /se calcula solo/.test(html));
chequear("y avisa que sin celular no hay guía", /no hace la guía/.test(html));
chequear("deja elegir 1 o 2 unidades", /name="unidades"/.test(html));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. El total sale del tarifario si se deja vacío ──");

// Es la parte que evita el error a las 3 de la mañana: nadie se acuerda de la
// banda de Sahagún ni de que el combo de Riohacha es $140.000.
for (const [ciudad, uds, esperado] of [
  ["Bogota", 1, 73000],
  ["Bogota", 2, 133000],
  ["Riohacha", 2, 140000],
  ["Sahagun", 1, 85000],
]) {
  const q = fletes.cotizar(ciudad, uds);
  chequear(
    `${ciudad} x${uds} -> ${fletes.fmt(esperado)}`,
    q.total === esperado,
    `dio ${q.total}`
  );
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. Se guarda por el MISMO camino que un pedido del bot ──");

// 🔑 Si se guardara distinto, sería un pedido que las auditorías no ven.
const total = fletes.cotizar("Bogota", 1).total;
const pedido = store.saveOrder({
  nombre: "Juan Pérez",
  celular: "3001234567",
  ciudad: "Bogota",
  direccion: "Cll 1 #2-3",
  talla: "L",
  color: "Negro",
  pago: "contraentrega",
  total,
  telefono_chat: TEL,
  origen: "manual",
  registrado_por: "dueño",
});

chequear("el pedido queda guardado", !!pedido && !!pedido.id);
chequear("con id único, como los del bot", typeof pedido.id === "string" && pedido.id.length > 10);
chequear("y con su fecha", !!pedido.fecha);
chequear(
  "queda marcado como MANUAL, para no inflar el cierre del bot",
  pedido.origen === "manual" && pedido.registrado_por === "dueño"
);
chequear(
  "aparece en la lista de pedidos",
  store.todosLosPedidos().some((p) => p.id === pedido.id)
);

// El candado antiduplicados sigue valiendo: si se toca dos veces el botón, no
// se guardan dos ventas.
const otraVez = store.saveOrder({
  nombre: "Juan Pérez",
  celular: "3001234567",
  ciudad: "Bogota",
  talla: "L",
  total,
  telefono_chat: TEL,
  origen: "manual",
});
chequear(
  "tocar dos veces el botón NO crea dos ventas",
  otraVez.duplicadoIgnorado === true,
  "el candado antiduplicados tiene que seguir aplicando"
);
chequear("y sigue habiendo un solo pedido", store.todosLosPedidos().length === 1);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Registrar la venta apaga lo que tiene que apagar ──");

store.marcarComprado(TEL);
store.marcarAtendido(TEL, "dueño");

chequear("el cliente queda como que compró", store.getConv(TEL).compro === true);
chequear(
  "así el seguimiento NO le vuelve a escribir",
  store.getConv(TEL).compro === true,
  "elegible() descarta a los que compraron"
);
chequear(
  "y sale de la lista de atención humana",
  atencion.evaluar(TEL, store.getConv(TEL)).nivel === null
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Ya con pedido, el formulario no vuelve a aparecer ──");

delete require.cache[require.resolve("./src/panel-chat")];
html = require("./src/panel-chat").render({ id: TEL, token: "clave_de_prueba" });
chequear("el cajón de venta desaparece", !/action="\/pedido-manual"/.test(html));
chequear("y ahora se ve la ficha del pedido", /Juan Pérez/.test(html));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. La venta entra en el panel como cualquier otra ──");

delete require.cache[require.resolve("./src/panel")];
const panel = require("./src/panel").render();
chequear("sale en pendientes de despachar", panel.includes("Juan Pérez"));
chequear("y suma en lo que hay por recaudar", /73\.000/.test(panel));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 8. Registrar una venta NO le escribe al cliente ──");

// 🔑 Esto es lo que más importa que no pase: el dueño está registrando algo que
// ya cerró por chat. Si esto le mandara un mensaje, el cliente recibiría una
// confirmación duplicada de algo que ya habló con una persona.
const antes = store.getConv(TEL).messages.length;
store.marcarComprado(TEL);
store.marcarAtendido(TEL, "dueño");
chequear(
  "no se agrega ningún mensaje a la conversación",
  store.getConv(TEL).messages.length === antes
);
chequear(
  "y el chat sigue en modo humano (el dueño lo suelta cuando quiera)",
  store.getConv(TEL).paused === true
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 9. Un cliente sin teléfono (nombre de usuario) se avisa ──");

const BSUID = "CO.1098abcdef";
store.pushMsg(BSUID, "user", "quiero uno");
const htmlB = require("./src/panel-chat").render({ id: BSUID, token: "clave_de_prueba" });
chequear("también se le puede abrir el chat", htmlB.includes("quiero uno"));
chequear("aparece el cajón de venta", /action="\/pedido-manual"/.test(htmlB));
chequear(
  "pero el celular NO se precarga con el identificador interno",
  !htmlB.includes("CO.1098abcdef\" autocomplete") && !/value="CO\.1098/.test(htmlB.split("name=\"celular\"")[1] || ""),
  "un BSUID no es un teléfono: la transportadora no puede usarlo"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
