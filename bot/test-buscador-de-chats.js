/**
 * 🔎 EL BUSCADOR TIENE QUE ENCONTRAR A LOS CLIENTES SIN PEDIDO.
 *
 * POR QUÉ EXISTE (9-oct). Después del caso del comprobante perdido, el dueño fue
 * a buscar el chat de ese cliente y dijo textual: *"No hay un buscador para los
 * chats"*.
 *
 * Tenía razón a medias, y la mitad que faltaba era la importante:
 *   · el panel NO tenía ningún campo de búsqueda (el atajo «💬 Chats» solo
 *     bajaba a la lista de conversaciones recientes),
 *   · el buscador que sí existía estaba escondido DENTRO de /chat —había que
 *     llegar a la pantalla de un cliente para poder buscar otro—,
 *   · y `buscar()` miraba SOLO los PEDIDOS.
 *
 * 🔴 Ese último punto es el grave: el cliente que había que buscar NO TENÍA
 * PEDIDO, porque su chat se cortó antes de cerrarse. O sea que el buscador no
 * encontraba exactamente a quien había que buscar. Los clientes que más falta
 * encontrar son los que pagaron y quedaron a medias.
 *
 *   node test-buscador-de-chats.js      (sin credenciales, sin red, sin IA)
 */

const path = require("path");
const os = require("os");
const fs = require("fs");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "buscador-"));
process.env.DATA_DIR = DIR;

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

// ── Montar el caso real ────────────────────────────────────────────────────
// Wilmer: tiene chat y mandó el comprobante, pero NUNCA se le guardó un pedido.
const SIN_PEDIDO = "573215557305";
store.guardarPerfil(SIN_PEDIDO, { nombre: "Wilmer Patiño" });
store.pushMsg(SIN_PEDIDO, "user", "buenas, quiero el impermeable");
store.pushMsg(SIN_PEDIDO, "user", "[el cliente mandó una imagen: posible comprobante de pago]", {
  comprobante: true,
});
store.marcarComprobanteEnChat(SIN_PEDIDO, { monto: 85000 });

// Otro que sí compró, para que el buscador no se vuelva un listado de todo.
const CON_PEDIDO = "573109998877";
store.pushMsg(CON_PEDIDO, "user", "hola, me interesa");
store.saveOrder({
  nombre: "Juan Pérez",
  celular: "3109998877",
  ciudad: "Medellín",
  total: 85000,
  pago: "contraentrega",
  telefono_chat: CON_PEDIDO,
});

// Un tocayo, para probar el caso de varios resultados.
const TOCAYO = "573001112233";
store.guardarPerfil(TOCAYO, { nombre: "Wilmer Gómez" });
store.pushMsg(TOCAYO, "user", "hola");

// Un chat de prueba, que NO debe salir nunca.
store.pushMsg("prueba-no-soy-cliente", "user", "soy una prueba");

// ============================================================================
console.log("\n── 1. 🔑 ENCUENTRA AL CLIENTE QUE NO TIENE PEDIDO ──");
// Esto es lo que antes era imposible.
// ============================================================================
chequear(
  "buscar() por nombre NO lo encuentra (busca en pedidos)",
  panelChat.buscar({ q: "Wilmer" }).length === 0,
  "esto no es un bug: es el comportamiento de siempre, y por eso hacía falta buscarChats"
);
const porNombre = panelChat.buscarChats({ q: "Wilmer Patiño" });
chequear("buscarChats() por nombre completo SÍ lo encuentra", porNombre.length === 1);
chequear("…y es el chat correcto", porNombre[0] && porNombre[0].tel === SIN_PEDIDO);
chequear("…sin tildes también", panelChat.buscarChats({ q: "wilmer patino" }).length === 1);
chequear("…en minúscula también", panelChat.buscarChats({ q: "WILMER PATIÑO" }).length === 1);
chequear("…por un pedazo del nombre", panelChat.buscarChats({ q: "patiño" }).length === 1);

console.log("\n── 2. Por celular, escrito como lo escribe una persona ──");
for (const forma of ["3215557305", "321 555 7305", "321-555-7305", "573215557305", "+57 321 555 7305"]) {
  const r = panelChat.buscarChats({ q: forma });
  chequear(`"${forma}" lo encuentra`, r.length === 1 && r[0].tel === SIN_PEDIDO, JSON.stringify(r.map((x) => x.tel)));
}
chequear(
  "los últimos 4 dígitos alcanzan",
  panelChat.buscarChats({ q: "7305" }).some((r) => r.tel === SIN_PEDIDO)
);
chequear(
  "pero 3 dígitos no: devolvería media base de clientes",
  panelChat.buscarChats({ q: "305" }).length === 0
);

console.log("\n── 3. Lo que NO debe pasar ──");
chequear("los chats de prueba no salen", panelChat.buscarChats({ q: "prueba" }).length === 0);
chequear("una búsqueda vacía no lista todo", panelChat.buscarChats({ q: "" }).length === 0);
chequear("solo espacios tampoco", panelChat.buscarChats({ q: "   " }).length === 0);
chequear("algo que no existe devuelve vacío", panelChat.buscarChats({ q: "zzzzz" }).length === 0);

console.log("\n── 4. El resultado trae con qué reconocer el chat ──");
const r0 = panelChat.buscarChats({ q: "patiño" })[0];
chequear("trae el nombre", r0 && r0.nombre === "Wilmer Patiño");
chequear("trae cuántos mensajes hay", r0 && r0.mensajes === 2);
chequear("trae un adelanto del último mensaje", Boolean(r0 && r0.adelanto));
chequear("trae cuándo fue", Boolean(r0 && r0.cuando));
chequear(
  "💸 y avisa que este chat mandó comprobante",
  Boolean(r0 && r0.comprobanteRecibidoEl),
  "es la razón por la que uno busca estos chats"
);

console.log("\n── 5. Varios resultados se listan; uno solo se abre directo ──");
const dos = panelChat.render({ q: "wilmer", token: "tk" });
chequear('buscar "wilmer" encuentra a los dos tocayos', panelChat.buscarChats({ q: "wilmer" }).length === 2);
chequear("…y la pantalla los lista", dos.includes('class="resultado"'));
chequear("…con la marca del comprobante a la vista", dos.includes("mandó comprobante"));
chequear("…y cada uno enlaza a su chat", dos.includes(`id=${SIN_PEDIDO}`));

const uno = panelChat.render({ q: "wilmer pat", token: "tk" });
chequear(
  "🔑 si hay UN solo resultado, abre el chat directo",
  uno.includes("quiero el impermeable"),
  "hacer tocar un resultado único es un paso para nada cuando se está despachando del celular"
);
chequear("…y muestra el formulario para cargar la venta", uno.includes("Guardar la venta"));
chequear('…con la opción "anticipado"', uno.includes('value="anticipado"'));
chequear("…y avisa que todavía no hay pedido", /Todav[ií]a no hay pedido/.test(uno));

console.log("\n── 6. No se rompió la búsqueda de siempre ──");
chequear("por nombre de un cliente CON pedido sigue saliendo su ficha", panelChat.buscar({ q: "Juan" }).length === 1);
chequear(
  "la pantalla de un cliente con pedido muestra la ficha",
  panelChat.render({ q: "Juan", token: "tk" }).includes("Juan Pérez")
);
chequear("por id exacto sigue funcionando", panelChat.buscar({ id: CON_PEDIDO }).length === 1);
chequear(
  "sin nada que buscar, pide buscar algo",
  /Busc[aá] por nombre o celular/.test(panelChat.render({ token: "tk" }))
);
chequear(
  "si no hay nada, lo dice y explica cómo buscar",
  /No encontré ningún pedido ni ningún chat/.test(panelChat.render({ q: "zzzzz", token: "tk" }))
);

console.log("\n── 7. El panel ya tiene un campo de búsqueda ──");
const panel = require("./src/panel");
const html = panel.render("");
chequear(
  '🔑 el panel trae el buscador (antes "no hay un buscador para los chats")',
  html.includes('class="buscarChat"'),
  "estaba escondido dentro de /chat: había que llegar al chat de alguien para buscar a otro"
);
chequear("…apunta a /chat", /<form class="buscarChat" method="get" action="\/chat">/.test(html));
chequear("…manda el token", html.includes('name="token"'));
chequear("…y dice que encuentra a los que no tienen pedido", /sin pedido/.test(html));

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Esto protege poder encontrar al cliente que pagó y ` +
      `no tiene pedido: el que se perdió el 8-oct.`
  );
}
process.exit(mal ? 1 : 0);
