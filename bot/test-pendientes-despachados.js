/**
 * PENDIENTES DE DESPACHAR vs YA DESPACHADOS.
 *
 * DE DÓNDE SALE (22-sep, lo preguntó el dueño): los pedidos se acumulan para
 * siempre —bien, son la contabilidad— pero el panel los mostraba TODOS
 * mezclados. Con 8 se maneja; con 30 al día, en una semana no hay forma de
 * saber cuál ya se mandó. Él lo dijo así: "cómo va a manejar ese orden para no
 * enredarnos con las ventas".
 *
 * El dato ya existía y no se usaba: cuando se le manda la guía a un cliente,
 * queda anotada en su pedido. Con guía = despachado.
 *
 *   node test-pendientes-despachados.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-pendientes";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");

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

const pedido = (nombre, total, extra = {}) => ({
  nombre,
  celular: "300" + String(Math.floor(Math.random() * 9000000) + 1000000),
  ciudad: "Cali",
  direccion: "Cra 1 #2-3",
  talla: "M",
  color: "negro",
  pago: "contraentrega",
  total,
  telefono_chat: "57300" + String(Math.floor(Math.random() * 9000000) + 1000000),
  ...extra,
});

store.saveOrder(pedido("Ana Pendiente", 82000));
store.saveOrder(pedido("Luis Despachado", 73000));
store.saveOrder(pedido("Sin Celular", 83000, { celular: "", telefono_chat: "CO.9999999999999999" }));

// A Luis se le mandó la guía: eso es lo que lo marca como despachado.
const luis = store.todosLosPedidos().find((p) => p.nombre === "Luis Despachado");
store.anotarGuiaEnPedido(luis.fecha, "240099998888");

const html = require("./src/panel").render();
const num = (re) => {
  const m = re.exec(html);
  return m ? Number(m[1]) : null;
};

console.log("\n── 1. Se separan bien ──");

chequear("cuenta 2 pendientes", num(/Pendientes de despachar · (\d+)/) === 2, `dio ${num(/Pendientes de despachar · (\d+)/)}`);
chequear("cuenta 1 despachado", num(/Ya despachados · (\d+)/) === 1);
chequear(
  "el despachado NO aparece en la lista de pendientes",
  html.indexOf("Luis Despachado") > html.indexOf("Ya despachados"),
  "sigue apareciendo como pendiente y se despacharía dos veces"
);
chequear("el despachado muestra su número de guía", html.includes("240099998888"));

console.log("\n── 2. Lo que hace falta para trabajar ──");

chequear("hay tarjeta de pendientes arriba, con los KPIs", /pendientes de despachar<\/span>/.test(html));
chequear("suma cuánta plata hay por recaudar ($82.000 + $83.000)", /165[.,]000/.test(html));
chequear(
  "🔴 marca al que NO tiene celular",
  html.includes("falta celular"),
  "se descubriría con el PDF de guías ya subido, no antes"
);
chequear("y avisa cuántos son", /1 sin celular/.test(html));

console.log("\n── 3. El orden importa: primero lo más viejo ──");
// En una lista de trabajo lo urgente es lo que lleva más tiempo esperando, al
// revés que el resto del panel, donde lo nuevo va arriba.
const zonaPend = html.slice(html.indexOf("Pendientes de despachar"), html.indexOf("Ya despachados"));
chequear(
  "Ana (el más viejo) va antes que Sin Celular (el más nuevo)",
  zonaPend.indexOf("Ana Pendiente") < zonaPend.indexOf("Sin Celular"),
  "los pendientes salen del más nuevo al más viejo: lo urgente queda al final"
);

console.log("\n── 4. Cuando no queda nada pendiente ──");

fs.rmSync(DIR, { recursive: true, force: true });
delete require.cache[require.resolve("./src/store")];
delete require.cache[require.resolve("./src/panel")];
delete require.cache[require.resolve("./src/resumen")];
delete require.cache[require.resolve("./src/embudo")];
const store2 = require("./src/store");
store2.saveOrder(pedido("Todo Listo", 73000));
const p2 = store2.todosLosPedidos()[0];
store2.anotarGuiaEnPedido(p2.fecha, "240011112222");
const html2 = require("./src/panel").render();

chequear("dice que no hay nada pendiente", /No hay nada pendiente/.test(html2));
chequear("y la tarjeta lo confirma", /todo despachado/.test(html2));
chequear("el pedido sigue estando, en despachados", html2.includes("Todo Listo"));

console.log("\n── 5. Nada de esto borra un pedido ──");
chequear("el pedido despachado sigue en el archivo", store2.todosLosPedidos().length === 1);
chequear("y el panel dice que no se borran nunca", /no se borran nunca/.test(html2));

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
