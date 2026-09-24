/**
 * AUDITORÍA DEL DÍA: ¿ENTRARON TODOS LOS CHATS? ¿SE PERDIÓ UNA VENTA?
 *
 * DE DÓNDE SALE (23-sep). El dueño, con 1 sola venta y $92.000 de pauta gastada:
 *
 *   "¿Puedes hacer una verificación de que entraron todos los chats y que no haya
 *    un error quizás con las ventas tomadas? Estoy muy preocupado porque nunca me
 *    había pasado antes."
 *
 * Era la pregunta correcta y no había forma de contestarla. El log de eventos no
 * servía: vive en MEMORIA, guarda 60 y se borra en cada despliegue — y ese día
 * hubo 8 despliegues.
 *
 * 🔑 LO QUE DE VERDAD IMPORTA MEDIR: conversaciones donde el bot mandó el cuadro
 * de confirmación Y el cliente dijo "SÍ CONFIRMO", pero NO quedó pedido guardado.
 * Eso es una venta cerrada que se perdió, y es justo el "error con las ventas
 * tomadas" por el que preguntó.
 *
 *   node test-auditoria.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-auditoria";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");
const auditoria = require("./src/panel-auditoria");

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

const CUADRO =
  "Confirmemos tu pedido ✅\nNombre: Juan\nCelular: 3001112233\nCiudad: Cali\n" +
  "Dirección: Calle 1 #2-3\nColor de la franja: Rojo\nTalla: XL\nPago: contraentrega\n" +
  "TOTAL a pagar al recibir: $82.000\n¿Está todo bien? Respóndeme \"SÍ CONFIRMO\" y lo despacho 🏍️";

const HOY = auditoria.diaBogota(Date.now());

// Arma una conversación con mensajes fechados hoy.
function conversacion(chatId, turnos) {
  for (const [rol, texto] of turnos) store.pushMsg(chatId, rol, texto);
}

// ── Los casos ──────────────────────────────────────────────────────────────

// 1. Venta normal: confirmó y quedó pedido. No debe aparecer como problema.
conversacion("573001110001", [
  ["user", "hola"],
  ["assistant", "¡Hola! Es el conjunto de 4 piezas"],
  ["user", "Cali"],
  ["assistant", "Te llega a $82.000"],
  ["assistant", CUADRO],
  ["user", "SÍ CONFIRMO"],
]);
store.saveOrder({
  nombre: "Venta Buena",
  celular: "3001110001",
  ciudad: "Cali",
  direccion: "Calle 1 #2-3",
  talla: "XL",
  color: "Rojo",
  total: 82000,
  telefono_chat: "573001110001",
});

// 2. 🔑 EL CASO GRAVE: confirmó y NO hay pedido.
conversacion("573001110002", [
  ["user", "hola"],
  ["assistant", "Te llega a $83.000"],
  ["assistant", CUADRO],
  ["user", "si confirmo"],
]);

// 3. Nadie le contestó: escribió y el bot nunca respondió.
conversacion("573001110003", [
  ["user", "¡Hola! Quiero más información."],
  ["user", "hola?"],
]);

// 4. Le mandaron el cuadro y no contestó. A un paso, no es un error.
conversacion("573001110004", [
  ["user", "hola"],
  ["assistant", "Te llega a $85.000"],
  ["assistant", CUADRO],
]);

// 5. Cotizado y se fue antes del cuadro.
conversacion("573001110005", [
  ["user", "hola"],
  ["assistant", "Te llega a $73.000 al recibir"],
  ["user", "ah ok"],
]);

const a = auditoria.auditar();

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Cuenta bien lo que entró ──");

chequear(`cuenta las 5 conversaciones de hoy (dio ${a.cuenta.conversaciones})`, a.cuenta.conversaciones === 5);
chequear("4 recibieron respuesta del bot", a.cuenta.conBotRespondiendo === 4);
chequear("1 quedó sin ninguna respuesta", a.cuenta.sinRespuesta === 1);
chequear("y la identifica", a.sinRespuesta.length === 1 && a.sinRespuesta[0].chatId === "573001110003");
chequear(
  "guarda con qué escribió, para poder juzgarla",
  /Quiero m[áa]s informaci[óo]n/.test(a.sinRespuesta[0].primero)
);
chequear("dice cuántos mensajes mandó sin respuesta", a.sinRespuesta[0].mensajes === 2);

console.log("\n── 2. Sigue el embudo hasta el cierre ──");

chequear(`4 recibieron un total (dio ${a.cuenta.cotizadas})`, a.cuenta.cotizadas === 4);
chequear(`3 llegaron al cuadro (dio ${a.cuenta.conCuadro})`, a.cuenta.conCuadro === 3);
chequear(`2 confirmaron (dio ${a.cuenta.confirmaron})`, a.cuenta.confirmaron === 2);
chequear(`1 pedido guardado hoy (dio ${a.pedidosDelDia})`, a.pedidosDelDia === 1);

console.log("\n── 3. 🔑 LA VERIFICACIÓN QUE PIDIÓ EL DUEÑO ──");

chequear(
  "🔑 caza la venta confirmada que no quedó guardada",
  a.confirmadasSinPedido.length === 1,
  `encontró ${a.confirmadasSinPedido.length}`
);
chequear(
  "y dice cuál chat es, para poder abrirlo",
  a.confirmadasSinPedido[0].chatId === "573001110002"
);
chequear(
  "la venta que SÍ quedó guardada no aparece como problema",
  !a.confirmadasSinPedido.some((x) => x.chatId === "573001110001")
);
chequear(
  "el que no contestó el cuadro tampoco: no es un error",
  !a.confirmadasSinPedido.some((x) => x.chatId === "573001110004")
);

console.log("\n── 4. Separa 'quedó a un paso' de 'se perdió' ──");

chequear(
  "el del cuadro sin contestar sale en la lista caliente",
  a.cuadroSinConfirmar.length === 1 && a.cuadroSinConfirmar[0].chatId === "573001110004"
);
chequear(
  "y NO se cuenta como venta perdida",
  a.confirmadasSinPedido.length === 1,
  "confundir las dos cosas haría buscar un bug donde no hay"
);

console.log("\n── 5. La pantalla dice el veredicto en una línea ──");

const html = auditoria.render({ token: "clave_de_prueba" });
chequear("avisa en rojo que hay una venta perdida", /Hay 1 conversación donde el cliente confirmó/.test(html));
chequear("muestra el total de conversaciones", />5</.test(html));
chequear("invita a comparar con Meta", /compar[áa] este número con el de Meta/.test(html));
chequear(
  "enlaza cada chat con problema",
  /\/chat\?token=clave_de_prueba&id=573001110002/.test(html)
);
chequear("y el de la lista caliente también", /id=573001110004/.test(html));
chequear("explica que el log de eventos no sirve para esto", /vive en memoria/.test(html));
chequear("tiene botón de volver al panel", /href="\/panel\?token=/.test(html));
chequear("sirve en el celular", /name="viewport"/.test(html));

console.log("\n── 5-B. 🧮 LA CUENTA TIENE QUE CERRAR ──");
//
// 🔴 ESTO LO DELATÓ LA PRIMERA CORRIDA REAL. La pantalla mostró 9
// confirmaciones, 2 pedidos guardados y 1 venta perdida: faltaban 6 sin
// explicar. La causa era que se comparaba contra TODOS los pedidos de la
// historia, así que un cliente viejo que volvió a confirmar hoy parecía estar
// bien y no caía en ninguna canasta visible.
//
// Un total que no cuadra no es un detalle de presentación: es la señal de que la
// cuenta está mal hecha. Ahora cada confirmación de hoy cae en exactamente una
// de tres canastas, y se verifica que sumen.

// Un cliente que YA había comprado antes de hoy y hoy vuelve a confirmar.
{
  const VIEJO = "573001110006";
  // El pedido anterior se guarda con fecha de hace 3 días.
  const previo = store.saveOrder({
    nombre: "Cliente Viejo",
    celular: "3001110006",
    ciudad: "Cali",
    direccion: "Calle 7 #8-9",
    talla: "L",
    color: "Azul",
    total: 82000,
    telefono_chat: VIEJO,
  });
  // Se envejece a mano, que es lo que pasa en la vida real.
  {
    const archivo = `${DIR}/orders.json`;
    const todos = JSON.parse(fs.readFileSync(archivo, "utf8"));
    const i = todos.findIndex((o) => o.fecha === previo.fecha);
    todos[i].fecha = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    fs.writeFileSync(archivo, JSON.stringify(todos));
  }
  conversacion(VIEJO, [
    ["user", "hola, ya me llego la guia"],
    ["assistant", CUADRO],
    ["user", "listo"],
  ]);
}

const c = auditoria.auditar();
chequear(
  `las 3 canastas suman las confirmaciones (${c.cuenta.confirmadasConPedido} + ${c.cuenta.yaHabianComprado} + ${c.confirmadasSinPedido.length} = ${c.cuenta.confirmaron})`,
  c.cuadra === true,
  "hay confirmaciones sin clasificar"
);
chequear(
  "el cliente viejo NO se cuenta como venta perdida",
  !c.confirmadasSinPedido.some((x) => x.chatId === "573001110006"),
  "se inventaría una fuga que no existe"
);
chequear(
  "se clasifica como 'ya había comprado'",
  c.cuenta.yaHabianComprado === 1 && c.yaHabianComprado[0].chatId === "573001110006"
);
chequear("y se muestra cuánto fue su pedido anterior", c.yaHabianComprado[0].previo === 82000);
chequear("la venta perdida de verdad sigue siendo 1", c.confirmadasSinPedido.length === 1);

const htmlC = auditoria.render({ token: "clave_de_prueba" });
chequear("la pantalla dice que la cuenta cierra", /La cuenta cierra/.test(htmlC));
chequear("y muestra la suma explícita", /1 \+ 1 \+ 1 = 3/.test(htmlC));
chequear(
  "lista aparte a los que ya habían comprado",
  /Ya habían comprado antes/.test(htmlC)
);
chequear(
  "explicando que no son ventas nuevas",
  /No son ventas nuevas/.test(htmlC)
);

console.log("\n── 5-C. Un cuadro viejo con un 'ok' de hoy no es un cierre de hoy ──");

{
  // El cuadro se mandó ANTES de hoy; hoy solo dijo "ok". No debe contar.
  const CHAT = "573001110007";
  store.pushMsg(CHAT, "assistant", CUADRO);
  store.pushMsg(CHAT, "user", "ok");
  const archivo = `${DIR}/conversations.json`;
  const todas = JSON.parse(fs.readFileSync(archivo, "utf8"));
  // Se envejecen los dos mensajes a anteayer.
  const anteayer = Date.now() - 2 * 24 * 60 * 60 * 1000;
  todas[CHAT].messages.forEach((m) => (m.at = anteayer));
  todas[CHAT].ultimoDelCliente = anteayer;
  fs.writeFileSync(archivo, JSON.stringify(todas));

  const d = auditoria.auditar();
  chequear(
    "una conversación de anteayer no entra en el día de hoy",
    !d.confirmadasSinPedido.some((x) => x.chatId === CHAT) &&
      !d.yaHabianComprado.some((x) => x.chatId === CHAT)
  );
}

console.log("\n── 6. Cuando todo está bien, lo dice claro ──");

// Se guarda el pedido que faltaba: la fuga desaparece.
store.saveOrder({
  nombre: "Venta Rescatada",
  celular: "3001110002",
  ciudad: "Cali",
  direccion: "Calle 9 #8-7",
  talla: "M",
  color: "Verde",
  total: 83000,
  telefono_chat: "573001110002",
});
const b = auditoria.auditar();
chequear("ya no hay ventas perdidas", b.confirmadasSinPedido.length === 0);
const html2 = auditoria.render({ token: "clave_de_prueba" });
chequear("y el veredicto pasa a verde", /No se perdió ninguna venta por el camino/.test(html2));
chequear(
  "diciendo dónde buscar entonces",
  /el problema está\s+antes del cierre/.test(html2.replace(/\s+/g, " ")) ||
    /problema está antes del cierre/.test(html2.replace(/\s+/g, " "))
);

console.log("\n── 7. Otro día no se mezcla ──");

// 🔴 Acá había una prueba que dependía de la fecha: pedía el día "2026-09-22" y
// más arriba esta misma batería envejece una conversación "a anteayer". Cuando el
// reloj pasó la medianoche, anteayer CAYÓ en el 22-sep y la prueba falló sin que
// nada estuviera roto. Se usa una fecha que no puede colisionar con nada.
const vacio = auditoria.auditar("2019-03-15");
chequear("un día sin actividad da cero conversaciones", vacio.cuenta.conversaciones === 0);
chequear("y ninguna venta perdida", vacio.confirmadasSinPedido.length === 0);
chequear("el render de un día vacío no explota", typeof auditoria.render({ token: "x", dia: "2026-01-01" }) === "string");

console.log("\n── 8. La ruta está protegida ──");

const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear("existe la ruta /auditoria", /app\.get\("\/auditoria"/.test(servidor));
chequear(
  "🔒 y pide PANEL_TOKEN antes de mostrar nada",
  /app\.get\("\/auditoria"[\s\S]{0,240}req\.query\.token !== PANEL_TOKEN/.test(servidor)
);
delete require.cache[require.resolve("./src/panel")];
chequear(
  "el panel tiene el botón para entrar",
  /\/auditoria\?token=/.test(require("./src/panel").render())
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
