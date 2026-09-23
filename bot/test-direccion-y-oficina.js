/**
 * "OFICINA" NO ES UNA DIRECCIÓN, Y ESCRIBIRLE AL CLIENTE DESDE EL CHAT.
 *
 * DE DÓNDE SALE (23-sep), dos pedidos del dueño el mismo día:
 *
 * 1) Cargando guías se topó con un pedido que traía solo la ciudad:
 *    "Lo voy a mandar a oficina de Interrapidísimo pero, revisando el chat, mucho
 *     cuidado porque NO ES CLARO que sea una oficina de Interrapidísimo... dile al
 *     bot para que esté pendiente y no vuelva a suceder con el tema de la
 *     dirección, dirección o la oficina, para tenerlo muy claro nosotros."
 *
 * 2) Otro pedido no se podía despachar al precio cotizado:
 *    "el envío solamente está disponible por Coordinadora y está por 51.000...
 *     quiero que así mismo como me dejas ver los chats también me dejes mandar un
 *     mensaje, porque necesitamos preguntarle al usuario si va a pagar los 51.000
 *     o si cancelamos su pedido"
 *
 * 🔴 POR QUÉ VA EN CÓDIGO Y NO SOLO EN EL GUION: el guion ya decía "nunca mandes
 * el cuadro con campos en blanco" y el pedido se guardó igual sin dirección. Hoy
 * comprobamos tres veces que una instrucción al modelo no es un candado.
 *
 *   node test-direccion-y-oficina.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-direccion";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const d = require("./src/direccion");
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

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Lo que NO se puede despachar queda marcado ──");

const noSirve = [
  ["", "vacia", "no dio nada"],
  ["   ", "vacia", "solo espacios"],
  ["Sincelejo", "dudosa", "una ciudad no es una dirección"],
  ["centro", "dudosa", "un barrio suelto tampoco"],
  ["no tengo direccion fija", "dudosa", "lo dice explícito"],
  ["lo recibo en la oficina", "oficina-incompleta", "¿cuál oficina, de quién?"],
  ["en la oficina de Interrapidisimo", "oficina-incompleta", "falta la dirección"],
  ["oficina de Interrapidisimo del centro", "oficina-incompleta", "🔑 EL CASO REAL"],
  ["la de la 80", "dudosa", "una referencia no es una dirección"],
  ["me lo dejan en Servientrega", "oficina-incompleta", "nombrar transportadora ya es oficina"],
];
for (const [texto, estado, por] of noSirve) {
  const r = d.revisar(texto);
  chequear(
    `"${texto || "(vacío)"}" → ${estado} · ${por}`,
    r.estado === estado && r.despachable === false,
    `dio estado "${r.estado}" y despachable=${r.despachable}`
  );
}

console.log("\n── 2. Lo que SÍ se puede despachar pasa ──");

const siSirve = [
  ["Calle 45 #12-30 barrio Centro", "casa"],
  ["Cra 50 # 80-12 apto 301", "casa"],
  ["Av 68 No 45-12 torre 3", "casa"],
  ["Diagonal 22 #8-40, barrio La Esperanza", "casa"],
  ["oficina Interrapidisimo calle 38 #20-15", "oficina"],
  ["Interrapidisimo Cra 20 #15-40 Sincelejo", "oficina"],
  ["Servientrega calle 10 # 5-20", "oficina"],
];
for (const [texto, estado] of siSirve) {
  const r = d.revisar(texto);
  chequear(`"${texto}" → ${estado}`, r.estado === estado && r.despachable === true, `dio "${r.estado}"`);
}

console.log("\n── 3. Distingue casa de oficina, que es lo que pidió el dueño ──");

chequear("una casa se marca como entrega a casa", d.revisar("Calle 45 #12-30 barrio X").entrega === "casa");
chequear(
  "una oficina se marca como entrega en oficina",
  d.revisar("oficina Interrapidisimo calle 38 #20-15").entrega === "oficina"
);
chequear(
  "y guarda CUÁL transportadora",
  d.revisar("oficina Interrapidisimo calle 38 #20-15").transportadora === "interrapidisimo"
);
for (const [texto, esperada] of [
  ["Servientrega calle 10 # 5-20", "servientrega"],
  ["Coordinadora cra 8 #10-20", "coordinadora"],
  ["oficina de Envia calle 3 #4-5", "envia"],
  ["TCC calle 1 #2-3", "tcc"],
]) {
  chequear(`reconoce ${esperada}`, d.transportadoraDe(texto) === esperada);
}
chequear("no inventa transportadora donde no hay", d.transportadoraDe("Calle 45 #12-30") === null);

console.log("\n── 4. Dice QUÉ falta, en palabras que se le pueden repetir al cliente ──");

const inc = d.revisar("oficina de Interrapidisimo del centro");
chequear("pide la dirección exacta de la oficina", /direcci[óo]n exacta de esa oficina/.test(inc.queFalta));
chequear("y menciona calle y número", /calle y n[úu]mero/.test(inc.queFalta));
const sinTrans = d.revisar("lo recibo en la oficina");
chequear("si no dijo transportadora, la pide", /de qu[ée] transportadora/.test(sinTrans.queFalta));
chequear("y pide las dos cosas cuando faltan las dos", / y /.test(sinTrans.queFalta));

console.log("\n── 5. El pedido queda marcado, pero NO se pierde ──");

const marcado = d.revisarDireccionDePedido({
  nombre: "Cliente Prueba",
  ciudad: "Sincelejo",
  direccion: "lo recibo en la oficina",
  total: 83000,
  telefono_chat: "573001112233",
});
chequear("se marca como dudosa", marcado.direccion_dudosa === true);
chequear("guarda el estado", marcado.direccion_estado === "oficina-incompleta");
chequear("guarda qué falta", typeof marcado.direccion_falta === "string");
chequear("🔑 y el pedido NO se descarta: siguen todos sus datos", marcado.nombre === "Cliente Prueba" && marcado.total === 83000);
const bueno = d.revisarDireccionDePedido({ direccion: "Calle 45 #12-30 barrio Centro" });
chequear("una dirección buena no se marca", !bueno.direccion_dudosa);
chequear("y queda como entrega a casa", bueno.entrega === "casa");

console.log("\n── 6. El aviso al dueño por WhatsApp dice lo que importa ──");

chequear(
  "avisa cuando la dirección no está clara",
  /OJO CON LA DIRECCI[ÓO]N/.test(d.avisoParaElDueno(marcado))
);
chequear("y le dice que abra el chat", /Abr[íi] el chat/.test(d.avisoParaElDueno(marcado)));
chequear(
  "avisa cuando es entrega en oficina, aunque esté completa",
  /ENTREGA EN OFICINA/.test(
    d.avisoParaElDueno(d.revisarDireccionDePedido({ direccion: "Interrapidisimo calle 38 #20-15" }))
  )
);
chequear(
  "no molesta cuando es una casa normal",
  d.avisoParaElDueno(bueno) === "",
  "estaría avisando de algo que está bien"
);

console.log("\n── 7. El agente aplica el candado antes de guardar ──");

const agente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
chequear("agent.js importa el módulo", /require\(["']\.\/direccion["']\)/.test(agente));
chequear("lo aplica al guardar el pedido", /revisarDirecci[oó]nDePedido\(/.test(agente));
chequear(
  "y después de revisar el teléfono (los dos candados)",
  agente.indexOf("revisarTelefono(order") < agente.indexOf("revisarDireccionDePedido(")
);
const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear("el aviso al dueño incluye lo de la dirección", /avisoDireccion\(order\)/.test(servidor));
chequear(
  "y la dirección vacía sale como FALTA en el aviso",
  /order\.direccion \|\| "🔴 FALTA"/.test(servidor)
);

console.log("\n── 8. El guion le enseña a preguntar ──");

const guion = require("./src/prompt").buildSystemPrompt();
chequear('tiene la sección "OFICINA no es una dirección"', /"OFICINA" NO ES UNA DIRECCI[ÓO]N/.test(guion));
chequear("explica que hay DOS formas de entrega", /DOS formas de entrega/i.test(guion));
chequear("pide la transportadora", /de qu[ée] transportadora/i.test(guion));
chequear("pide la dirección exacta de la oficina", /direcci[óo]n exacta de esa oficina/i.test(guion));
chequear(
  '🔑 prohíbe aceptar "la oficina del centro"',
  /NO alcanza con "la oficina del centro"/i.test(guion)
);
chequear(
  "avisa que nombrar transportadora ya es oficina",
  /Si nombra una transportadora, eso YA es entrega en oficina/i.test(guion)
);
chequear(
  "manda escribir OFICINA en el cuadro de confirmación",
  /OFICINA Interrapid[íi]simo/.test(guion)
);
chequear("dice que una ciudad sola no sirve", /no es una direcci[óo]n/i.test(guion));

console.log("\n── 9. Escribirle al cliente desde el chat (el pedido de hoy) ──");

const CHAT = "573004445566";
store.saveOrder({
  nombre: "Cliente Coordinadora",
  celular: "3004445566",
  ciudad: "Tadó",
  direccion: "Calle 3 #4-5",
  total: 83000,
  telefono_chat: CHAT,
});
store.pushMsg(CHAT, "user", "hola quiero uno");
store.pushMsg(CHAT, "assistant", "Te llega a $83.000");

const pantalla = panelChat.render({ id: CHAT, token: "clave_de_prueba" });
chequear("hay un cuadro para escribirle", /Escribirle a Cliente Coordinadora/.test(pantalla));
chequear("el formulario manda a /responder", /action="\/responder"/.test(pantalla));
chequear("lleva el token", /name="token" value="clave_de_prueba"/.test(pantalla));
chequear("lleva a quién escribirle", new RegExp(`name="to" value="${CHAT}"`).test(pantalla));
chequear("y pide volver al chat, no al panel", /name="volver" value="chat"/.test(pantalla));
chequear(
  "🔑 trae el mensaje listo del envío que subió",
  /la única transportadora disponible cobra \$51\.000/.test(pantalla)
);
chequear(
  "que ofrece las dos salidas: pagar o cancelar",
  /preferís que te cancelemos el pedido sin ningún costo/.test(pantalla)
);
chequear("trae el mensaje para preguntar cuál oficina", /de qué transportadora es la oficina/.test(pantalla));
chequear("trae el mensaje para pedir la dirección", /calle, número y barrio/.test(pantalla));
chequear("trae el mensaje de cancelación", /cancelamos tu pedido sin ningún costo/.test(pantalla));
chequear("avisa que el bot se calla al escribir", /el bot se calla en este chat/.test(pantalla));

console.log("\n── 10. 🔴 La ventana de 24 h se avisa ANTES de escribir ──");

chequear("con mensaje reciente, dice que se puede escribir", /Podés escribirle libre/.test(pantalla));
chequear("y dice cuánto falta para que cierre", /La ventana de 24 h cierra en/.test(pantalla));

// Cliente que escribió hace 3 días: Meta ya no permite texto libre.
const VIEJO = "573009998877";
store.saveOrder({
  nombre: "Cliente Viejo",
  celular: "3009998877",
  ciudad: "Cali",
  direccion: "Calle 1 #2-3",
  total: 82000,
  telefono_chat: VIEJO,
});
store.pushMsg(VIEJO, "user", "hola");
{
  // Se envejece el último mensaje del cliente a mano.
  const archivo = `${DIR}/conversations.json`;
  const todas = JSON.parse(fs.readFileSync(archivo, "utf8"));
  todas[VIEJO].ultimoDelCliente = Date.now() - 3 * 24 * 60 * 60 * 1000;
  fs.writeFileSync(archivo, JSON.stringify(todas));
}
const vieja = panelChat.render({ id: VIEJO, token: "clave_de_prueba" });
chequear("🔴 avisa que NO se puede mandar texto libre", /No se puede mandar texto libre/.test(vieja));
chequear("dice hace cuánto escribió", /hace 3 días/.test(vieja));
chequear("y explica la salida: una plantilla aprobada", /plantilla aprobada/.test(vieja));
chequear("no dice que la ventana está abierta", !/Podés escribirle libre/.test(vieja));

console.log("\n── 11. El resultado del envío se muestra ──");

chequear(
  "cuando sale bien",
  /Mensaje enviado/.test(panelChat.render({ id: CHAT, token: "clave_de_prueba", resultado: "ok" }))
);
const falla = panelChat.render({
  id: CHAT,
  token: "clave_de_prueba",
  resultado: "Pasaron más de 24h desde el último mensaje del cliente.",
});
chequear("y cuando falla, con el motivo", /No se envió: Pasaron más de 24h/.test(falla));

console.log("\n── 12. El panel marca la oficina y lo dudoso ──");

store.saveOrder({
  nombre: "Cliente Oficina",
  celular: "3001110000",
  ciudad: "Sincelejo",
  direccion: "oficina de Interrapidisimo del centro",
  total: 83000,
  telefono_chat: "573001110000",
  ...d.revisarDireccionDePedido({ direccion: "oficina de Interrapidisimo del centro" }),
});
delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();
chequear("el panel muestra la etiqueta OFICINA", /🏢 OFICINA/.test(html));
chequear("y marca la dirección sin confirmar", /direcci[óo]n sin confirmar/.test(html));
chequear("diciendo qué falta", /falta la direcci[óo]n exacta/.test(html));

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
