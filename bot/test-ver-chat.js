/**
 * VER EL CHAT DE UN CLIENTE DESDE EL CELULAR.
 *
 * DE DÓNDE SALE (23-sep): el dueño estaba cargando guías de pedidos viejos y se
 * topó con uno que traía solo la ciudad, sin dirección. Preguntó textual:
 *
 *   "El pedido de [un cliente] me sale sin dirección, o sea solo como la ciudad,
 *    ¿cómo puedo ver el chat de él o qué, para verificar si es oficina de
 *    Interrapidísimo o qué?"
 *
 * La única forma que existía era pegar un comando de una línea en el Web Shell de
 * Render. Y le falló DOS veces: el comando tenía 1.100 caracteres con emojis y
 * caracteres de caja, y el shell los masticó mal (SyntaxError).
 *
 * El dato ya estaba guardado: el pedido tiene `telefono_chat`, que es la llave
 * con la que se guarda la conversación. Solo faltaba mostrarlo.
 *
 *   node test-ver-chat.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-ver-chat";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");
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

// ── Datos de prueba ────────────────────────────────────────────────────────
// El caso real: pedido con ciudad pero SIN dirección, y en el chat el cliente
// dijo que lo recibe en una oficina de la transportadora.
const CHAT_SIN_DIR = "573001112233";
const CHAT_COMPLETO = "573004445566";

store.saveOrder({
  nombre: "Cliente Sin Direccion",
  celular: "3001112233",
  ciudad: "Sincelejo",
  direccion: "",
  talla: "XL",
  color: "Rojo",
  pago: "contraentrega",
  total: 83000,
  telefono_chat: CHAT_SIN_DIR,
});
store.saveOrder({
  nombre: "Cliente Completo",
  celular: "3004445566",
  ciudad: "Cali",
  direccion: "Cra 1 #2-3, barrio Centro",
  talla: "M",
  color: "Verde",
  pago: "contraentrega",
  total: 82000,
  telefono_chat: CHAT_COMPLETO,
});

store.pushMsg(CHAT_SIN_DIR, "user", "¡Hola! Quiero más información.");
store.pushMsg(CHAT_SIN_DIR, "assistant", "¡Hola! 🏍️ Es el conjunto de 4 piezas");
store.pushMsg(CHAT_SIN_DIR, "user", "Sincelejo");
store.pushMsg(CHAT_SIN_DIR, "assistant", "Te llega a $83.000, pagas al recibir");
store.pushMsg(
  CHAT_SIN_DIR,
  "user",
  "Lo recibo en la oficina de Interrapidisimo del centro, no tengo direccion fija"
);
store.pushMsg(CHAT_COMPLETO, "user", "hola");
store.pushMsg(CHAT_COMPLETO, "assistant", "¡Hola! ¿Para qué ciudad sería?");

const TK = "clave_de_prueba";

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Buscar por id de chat trae ese pedido y su conversación ──");

const porId = panelChat.render({ id: CHAT_SIN_DIR, token: TK });

chequear("muestra el nombre del cliente", porId.includes("Cliente Sin Direccion"));
chequear("muestra la ciudad", porId.includes("Sincelejo"));
chequear("muestra el total", porId.includes("$83.000"));
chequear("muestra la talla y el color", porId.includes("XL") && porId.includes("Rojo"));
chequear(
  "🔑 muestra el mensaje donde el cliente explica la oficina",
  porId.includes("oficina de Interrapidisimo del centro")
);
chequear("muestra los mensajes del bot también", porId.includes("Te llega a $83.000"));
chequear(
  "distingue quién dijo cada cosa",
  porId.includes("Cliente") && porId.includes("BikerPro")
);
chequear(
  "NO trae el pedido del otro cliente",
  !porId.includes("Cliente Completo"),
  "está filtrando mal: mostraría datos de otra persona"
);

console.log("\n── 2. 🔴 La dirección vacía se marca, no se muestra en blanco ──");

chequear("marca que falta la dirección", /🔴 FALTA/.test(porId));
chequear(
  "y el pedido completo NO sale marcado",
  !/🔴 FALTA/.test(panelChat.render({ id: CHAT_COMPLETO, token: TK }))
);
chequear(
  "el pedido completo muestra su dirección real",
  panelChat.render({ id: CHAT_COMPLETO, token: TK }).includes("Cra 1 #2-3, barrio Centro")
);

console.log("\n── 3. Buscar por nombre, como lo haría el dueño ──");

for (const busqueda of ["Cliente Sin Direccion", "sin direccion", "SIN DIRECCION", "cliente sin"]) {
  const r = panelChat.render({ q: busqueda, token: TK });
  chequear(`"${busqueda}" lo encuentra`, r.includes("oficina de Interrapidisimo"));
}
chequear(
  "también busca por celular",
  panelChat.render({ q: "3001112233", token: TK }).includes("Cliente Sin Direccion")
);

console.log("\n── 4. Cuando no encuentra, ayuda en vez de dejarlo colgado ──");

const nada = panelChat.render({ q: "zzzz-no-existe", token: TK });
chequear("dice que no encontró nada", /No encontr[ée]/.test(nada));
chequear(
  "y lista los últimos pedidos para comparar el nombre",
  nada.includes("Cliente Sin Direccion") && nada.includes("Cliente Completo")
);
chequear(
  "sin búsqueda muestra la instrucción",
  /Buscá por nombre o celular/.test(panelChat.render({ token: TK }))
);

console.log("\n── 5. Un pedido sin chat guardado no rompe la pantalla ──");

store.saveOrder({
  nombre: "Cliente Viejo",
  celular: "3009998877",
  ciudad: "Tunja",
  direccion: "Calle 1",
  total: 78000,
  telefono_chat: "573009998877",
});
const viejo = panelChat.render({ q: "Cliente Viejo", token: TK });
chequear("muestra la ficha del pedido igual", viejo.includes("Cliente Viejo"));
chequear("y avisa que no hay chat", /No hay chat guardado/.test(viejo));

console.log("\n── 6. No se escapa HTML del cliente (nadie inyecta nada) ──");

const CHAT_MALO = "573001234000";
store.saveOrder({
  nombre: '<script>alert(1)</script>',
  celular: "3001234000",
  ciudad: "Cali",
  direccion: "x",
  total: 82000,
  telefono_chat: CHAT_MALO,
});
store.pushMsg(CHAT_MALO, "user", '<img src=x onerror="alert(2)">');
const malo = panelChat.render({ id: CHAT_MALO, token: TK });
chequear("el nombre sale escapado", !malo.includes("<script>alert(1)</script>"));
chequear("el mensaje sale escapado", !malo.includes('<img src=x onerror='));
chequear("pero el texto se sigue viendo", malo.includes("&lt;script&gt;"));

console.log("\n── 7. La pantalla sirve en el celular y vuelve al panel ──");

chequear("tiene viewport para móvil", /name="viewport"/.test(porId));
chequear("tiene botón de volver al panel", /href="\/panel\?token=/.test(porId));
chequear("el formulario de búsqueda lleva el token", /name="token" value="clave_de_prueba"/.test(porId));
chequear("declara UTF-8 (hay tildes y emojis)", /charset="utf-8"/.test(porId));

console.log("\n── 8. El panel enlaza a esta pantalla y marca lo que falta ──");

// Un pedido SIN celular, para comprobar que el marcador que ya existía sigue
// funcionando. (Sin este pedido la prueba pasaba por casualidad: ninguno de los
// otros le falta el celular, así que el marcador no tenía por qué aparecer.)
store.saveOrder({
  nombre: "Cliente Sin Celular",
  celular: "",
  ciudad: "Bogotá",
  direccion: "Calle 100 #10-20",
  total: 73000,
  telefono_chat: "CO.1098944123092301",
});

delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();
chequear("el panel trae enlaces 'ver chat'", html.includes("ver chat"));
chequear(
  "el enlace apunta a /chat con el token y el id",
  /\/chat\?token=clave_de_prueba&id=57300/.test(html),
  "el enlace no lleva los datos que necesita"
);
chequear("el panel marca los pedidos sin dirección", /falta direcci[óo]n/.test(html));
chequear(
  "y sigue marcando los que no tienen celular",
  html.includes("falta celular"),
  "se rompió el marcador que ya existía"
);

console.log("\n── 9. La ruta está protegida con el token del panel ──");

const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear("existe la ruta /chat", /app\.get\("\/chat"/.test(servidor));
chequear(
  "🔒 y pide PANEL_TOKEN antes de mostrar nada",
  /app\.get\("\/chat"[\s\S]{0,220}req\.query\.token !== PANEL_TOKEN/.test(servidor),
  "la ruta mostraría datos de clientes sin token"
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
