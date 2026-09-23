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
  ["Sincelejo", "dudosa", "una ciudad sola no dice casa ni oficina"],
  ["centro", "dudosa", "un barrio suelto tampoco"],
  ["no tengo direccion fija", "dudosa", "lo dice explícito"],
  ["la de la 80", "dudosa", "una referencia no dice casa ni oficina"],
];
for (const [texto, estado, por] of noSirve) {
  const r = d.revisar(texto);
  chequear(
    `"${texto || "(vacío)"}" → ${estado} · ${por}`,
    r.estado === estado && r.despachable === false,
    `dio estado "${r.estado}" y despachable=${r.despachable}`
  );
}

console.log("\n── 2. ⛔ SI DICE OFICINA, ALCANZA: NO SE LE PIDE LA DIRECCIÓN ──");
//
// 🔴 ESTA SECCIÓN ESTABA AL REVÉS Y EL DUEÑO LA CORRIGIÓ. La primera versión
// exigía la transportadora Y la dirección exacta de la oficina, y marcaba como
// "incompleto" un pedido que decía "oficina de Interrapidísimo del centro".
//
// Él lo frenó con la razón del negocio: *"no tienes que ponerle trabas al
// cliente... no le preguntes la dirección porque lo que vas a hacer es que el
// cliente no sepa la dirección. Las direcciones no las necesitamos cuando sea en
// una oficina de la transportadora."*
//
// La oficina la ubica la transportadora, no el cliente. Y encima contradecía lo
// que medimos el mismo día: cada pregunta extra después del total baja el cierre.

const oficinaAlcanza = [
  ["oficina", "sin más detalle, alcanza"],
  ["lo recibo en la oficina", "🔑 el caso que se guardó mal"],
  ["en la oficina de Interrapidisimo", "no hace falta la calle"],
  ["oficina de Interrapidisimo del centro", "🔑 EL CASO REAL del dueño"],
  ["la recojo en la oficina", "otra forma de decirlo"],
  ["paso por el punto de Coordinadora", "nombra otra transportadora"],
  ["me lo dejan en Servientrega", "nombrar transportadora ya es oficina"],
];
for (const [texto, por] of oficinaAlcanza) {
  const r = d.revisar(texto);
  chequear(
    `"${texto}" → despachable · ${por}`,
    r.estado === "oficina" && r.despachable === true && r.queFalta === null,
    `dio estado "${r.estado}", despachable=${r.despachable}, falta="${r.queFalta}"`
  );
}
chequear(
  "🔑 y NUNCA pide la dirección de la oficina",
  oficinaAlcanza.every(([t]) => d.revisar(t).queFalta === null),
  "volvió la traba que el dueño frenó"
);
chequear(
  "por defecto asume Interrapidísimo, que es la que se usa",
  d.revisar("lo recibo en la oficina").transportadora === "interrapidisimo"
);
chequear(
  "y marca que la supuso, no que el cliente la dijo",
  d.revisar("lo recibo en la oficina").transportadora_supuesta === true
);
chequear(
  "si el cliente nombra otra, se respeta la que dijo",
  d.revisar("me lo dejan en Servientrega").transportadora === "servientrega" &&
    d.revisar("me lo dejan en Servientrega").transportadora_supuesta === false
);

console.log("\n── 3. Una dirección de casa sí necesita calle y número ──");

const siSirve = [
  ["Calle 45 #12-30 barrio Centro", "casa"],
  ["Cra 50 # 80-12 apto 301", "casa"],
  ["Av 68 No 45-12 torre 3", "casa"],
  ["Diagonal 22 #8-40, barrio La Esperanza", "casa"],
];
for (const [texto, estado] of siSirve) {
  const r = d.revisar(texto);
  chequear(`"${texto}" → ${estado}`, r.estado === estado && r.despachable === true, `dio "${r.estado}"`);
}

console.log("\n── 4. Distingue casa de oficina, que es lo que pidió el dueño ──");

chequear("una casa se marca como entrega a casa", d.revisar("Calle 45 #12-30 barrio X").entrega === "casa");
chequear(
  "una oficina se marca como entrega en oficina",
  d.revisar("lo recibo en la oficina").entrega === "oficina"
);
for (const [texto, esperada] of [
  ["me lo dejan en Servientrega", "servientrega"],
  ["paso por Coordinadora", "coordinadora"],
  ["oficina de Envia", "envia"],
  ["lo recojo en TCC", "tcc"],
]) {
  chequear(`reconoce ${esperada}`, d.transportadoraDe(texto) === esperada);
}
chequear("no inventa transportadora donde no hay", d.transportadoraDe("Calle 45 #12-30") === null);

console.log("\n── 5. Cuando no está claro, la pregunta es UNA y es fácil ──");

for (const texto of ["", "Sincelejo", "no tengo direccion fija"]) {
  const r = d.revisar(texto);
  chequear(
    `"${texto || "(vacío)"}" pregunta casa o oficina`,
    /a su casa/.test(r.queFalta) && /oficina de Interrapid[íi]simo/.test(r.queFalta),
    `pregunta: "${r.queFalta}"`
  );
  chequear(
    `"${texto || "(vacío)"}" NO le pide la dirección de la oficina`,
    !/direcci[óo]n exacta de esa oficina/.test(r.queFalta) &&
      !/de qu[ée] transportadora/.test(r.queFalta),
    "es la traba que el dueño frenó"
  );
}

console.log("\n── 6. El pedido queda marcado, pero NO se pierde ──");

const marcado = d.revisarDireccionDePedido({
  nombre: "Cliente Prueba",
  ciudad: "Sincelejo",
  direccion: "Sincelejo",
  total: 83000,
  telefono_chat: "573001112233",
});
chequear("se marca como dudosa", marcado.direccion_dudosa === true);
chequear("guarda el estado", marcado.direccion_estado === "dudosa");
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

// 🔴 ESTAS TRES PRUEBAS ESTABAN AL REVÉS. Verificaban que el guion PIDIERA la
// transportadora y la dirección de la oficina — la traba que el dueño frenó.
// Ahora verifican lo contrario: que NO la pida.
chequear(
  "⛔ prohíbe pedirle la dirección de la oficina",
  /NO LE PIDAS LA DIRECCI[ÓO]N DE LA OFICINA/.test(guion)
);
chequear(
  "y explica por qué: el cliente no la sabe y es una traba",
  /lo m[áa]s probable es que no sepa la calle/i.test(guion) && /traba/i.test(guion)
);
chequear(
  "dice que con la ciudad alcanza",
  /la ciudad alcanza y sobra/i.test(guion)
);
chequear(
  "Interrapidísimo es el valor por defecto y no se pregunta",
  /Por defecto es Interrapid[íi]simo/.test(guion) && /No hace falta preguntarlo/i.test(guion)
);
chequear(
  "avisa que nombrar transportadora ya significa oficina",
  /YA significa que recoge en oficina/i.test(guion)
);
chequear(
  "🔑 trae la ÚNICA pregunta que sí hay que hacer, cerrada y de dos opciones",
  /¿Te lo enviamos a tu casa o prefer[íi]s recogerlo en la oficina/.test(guion)
);
chequear(
  "manda escribir OFICINA en el cuadro de confirmación",
  /OFICINA Interrapid[íi]simo/.test(guion)
);
chequear("dice que una ciudad sola no sirve para entrega a casa", /no es una direcci[óo]n/i.test(guion));

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
chequear(
  "trae el mensaje que pregunta casa u oficina, sin pedir dirección de oficina",
  /te lo enviamos a tu casa, o preferís recogerlo en la oficina/.test(pantalla)
);
chequear(
  "⛔ y ninguna plantilla rápida pide la dirección de la oficina",
  !/en qué dirección queda \(calle y número\)/.test(pantalla),
  "volvió la traba en los mensajes rápidos"
);
chequear("trae el mensaje para pedir la dirección de la casa", /calle, número y barrio/.test(pantalla));
chequear(
  "y ese mensaje ofrece la oficina como alternativa fácil",
  /lo dejamos en la oficina de Interrapidísimo de tu ciudad/.test(pantalla)
);
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

// Un pedido de oficina: se despacha bien, solo hay que VERLO como oficina.
store.saveOrder(
  d.revisarDireccionDePedido({
    nombre: "Cliente Oficina",
    celular: "3001110000",
    ciudad: "Sincelejo",
    direccion: "lo recibo en la oficina",
    total: 83000,
    telefono_chat: "573001110000",
  })
);
// Y uno que de verdad quedó ambiguo: no se sabe si casa u oficina.
store.saveOrder(
  d.revisarDireccionDePedido({
    nombre: "Cliente Ambiguo",
    celular: "3002220000",
    ciudad: "Cali",
    direccion: "Cali",
    total: 82000,
    telefono_chat: "573002220000",
  })
);
delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();
chequear("el panel muestra la etiqueta OFICINA", /🏢 OFICINA/.test(html));
chequear(
  "🔑 el pedido de oficina NO sale marcado como problema",
  !/Cliente Oficina[\s\S]{0,400}direcci[óo]n sin confirmar/.test(html),
  "estaría marcando como incompleto algo que se despacha bien"
);
chequear("el ambiguo sí sale marcado", /direcci[óo]n sin confirmar/.test(html));
chequear(
  "y lo que falta es la pregunta simple, no la dirección de la oficina",
  /falta saber si lo enviamos a su casa/.test(html),
  "volvió la traba al panel"
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
