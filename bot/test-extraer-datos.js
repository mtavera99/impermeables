/**
 * LEER EL CHAT Y LLENAR LOS CAJONES, SIN INVENTAR NADA.
 *
 * DE DÓNDE SALE (25-sep). El dueño: "ponle algún botón para que copie todos los
 * datos del chat a los cajones y no tener que escribir cajón por cajón".
 *
 * No es solo comodidad: transcribir un pedido a mano a las 4 de la mañana es
 * como se escriben mal una talla, un color o una dirección, y eso se descubre
 * con el paquete ya despachado.
 *
 * 🔑 DOS CAPAS, Y EL ORDEN DE PRECEDENCIA ES LO IMPORTANTE:
 *   · heurística → determinística, gratis, y MANDA en celular y total
 *   · IA         → aporta nombre y dirección, que ninguna regla saca bien
 *
 * ⚠️ El celular sale del número por el que escribe (dato duro) y el total TIENE
 * que salir del tarifario. Una IA que "recuerda" un precio de la conversación
 * puede traer el número equivocado, y eso se cobra contraentrega. La IA aporta
 * texto, no plata.
 *
 * Esta prueba NO llama a la IA: se le inyecta una función falsa. Así corre sin
 * credenciales y sin costo.
 *
 *   node test-extraer-datos.js      (sin credenciales ni red)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-extraer";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const x = require("./src/extraer");
const fletes = require("./src/fletes");

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

const cli = (t) => ({ role: "user", content: t, at: Date.now() });
const bot = (t) => ({ role: "assistant", content: t, at: Date.now() });

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Una conversación real, como escribe la gente ──");

const chat1 = [
  cli("buenas, el impermeable cuanto vale?"),
  bot("¡Hola! El conjunto está en $59.900 + envío. ¿De qué ciudad nos escribís?"),
  cli("estoy en Monteria"),
  bot("Para Montería el total es $83.000 al recibir. ¿Qué talla usás?"),
  cli("soy talla 2xl y la franja rojo"),
  bot("¡Listo! ¿Me confirmás nombre, celular y dirección?"),
  cli("Juan Carlos Pérez, calle 34 #12-45 barrio La Granja"),
  cli("si confirmo"),
];

const h1 = x.heuristica({ mensajes: chat1, conv: {}, chatId: "573015557788" });
chequear("saca la ciudad y la valida contra el tarifario", h1.ciudad.toLowerCase() === "monteria", JSON.stringify(h1));
chequear("saca la talla, normalizada al catálogo", h1.talla === "2XL", `dio ${h1.talla}`);
chequear("saca el color de la franja", h1.color === "rojo", `dio ${h1.color}`);
chequear("saca la dirección", /calle 34/i.test(h1.direccion), `dio "${h1.direccion}"`);
chequear(
  "el celular sale del número del chat, sin el 57",
  h1.celular === "3015557788",
  `dio ${h1.celular}`
);
chequear(
  "el total sale del tarifario, no de copiar el número del chat",
  h1.total === fletes.cotizar("Monteria", 1).total,
  `dio ${h1.total}, el tarifario dice ${fletes.cotizar("Monteria", 1).total}`
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. El total NO se copia si no cuadra con el tarifario ──");

// 🔴 Este es el candado que importa. Si en el chat se prometió un precio que el
// tarifario no reconoce, se deja VACÍO para que el formulario lo calcule o el
// dueño lo escriba viéndolo. Un total mal copiado se cobra contraentrega.
const chatRaro = [cli("soy de Monteria"), bot("te lo dejo en $70.000"), cli("dale")];
const hRaro = x.heuristica({ mensajes: chatRaro, conv: {}, chatId: "573015557788" });
chequear("un total que no está en el tarifario NO se copia", hRaro.total === "", `dio ${hRaro.total}`);
chequear("pero la ciudad sí se detecta", hRaro.ciudad.toLowerCase() === "monteria");

// Y el precio de rescate del combo SÍ es un total legítimo.
const chatRescate = [
  cli("estoy en Cali y quiero 2 conjuntos"),
  bot("El combo queda en $138.000"),
  cli("listo"),
];
const hRescate = x.heuristica({ mensajes: chatRescate, conv: {}, chatId: "573001112233" });
chequear(
  "el precio de rescate del combo sí se reconoce",
  hRescate.total === fletes.cotizar("Cali", 2).rescate,
  `dio ${hRescate.total}, rescate=${fletes.cotizar("Cali", 2).rescate}`
);
chequear("y detecta que son 2 unidades", hRescate.unidades === 2);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Las tallas no se confunden entre ellas ──");

for (const [texto, esperada] of [
  ["quiero la 3xl", "3XL"],
  ["talla XXL", "2XL"],
  ["uso XL", "XL"],
  ["la L esta bien", "L"],
  ["talla M", "M"],
  ["soy S", "S"],
]) {
  chequear(`"${texto}" -> ${esperada}`, x.tallaDe([texto]) === esperada, `dio ${x.tallaDe([texto])}`);
}
// 🔑 "L" no puede salir de una palabra cualquiera que tenga una L.
chequear(
  'una palabra con L no da talla L ("el pluvial")',
  x.tallaDe(["el pluvial me sirve"]) === "",
  `dio ${x.tallaDe(["el pluvial me sirve"])}`
);
chequear("si no dice talla, queda vacío", x.tallaDe(["hola, precio?"]) === "");

// ═══════════════════════════════════════════════════════════════════════════
// 🔴 EL COLOR EN FEMENINO — lo que lleva color es la FRANJA
//
// Y eso no es un detalle: la franja es femenina, así que la gente escribe
// "franja roja", "franja blanca", "franja negra". La primera versión de esto le
// pegaba un sufijo al nombre completo ("rojo" + "a" = "rojoa"), así que "roja"
// no coincidía con nada y el campo quedaba vacío justo en la forma MÁS común.
//
// Lo cazó la verificación de punta a punta, no una prueba: el ejemplo que usé al
// escribir el extractor decía "franja rojo", que nadie escribe. Una prueba
// escrita con el mismo supuesto que el código no prueba nada.
// ═══════════════════════════════════════════════════════════════════════════
console.log("\n── 3-B. El color en femenino, que es como se escribe de verdad ──");

for (const [texto, esperado] of [
  ["franja roja", "rojo"],
  ["franja blanca", "blanco"],
  ["franja negra", "negro"],
  ["franja morada", "morado"],
  ["franja azul", "azul"],
  ["franja verde", "verde"],
  ["las rojas", "rojo"],
  ["franjas blancas", "blanco"],
  ["quiero azules", "azul"],
  ["color rojo", "rojo"],
]) {
  chequear(`"${texto}" -> ${esperado}`, x.colorDe([texto]) === esperado, `dio ${JSON.stringify(x.colorDe([texto]))}`);
}
// Y sigue sin confundirse con palabras que contienen el color adentro.
for (const t of ["el negocio", "la verdad", "rojizo", "azulejo"]) {
  chequear(`no confunde "${t}"`, x.colorDe([t]) === "", `dio ${JSON.stringify(x.colorDe([t]))}`);
}
chequear("se devuelve el nombre del catálogo, no lo que escribió el cliente", x.colorDe(["franja blanca"]) === "blanco");

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. La ciudad sale del tarifario, no de una lista aparte ──");

// Mantener una segunda lista de ciudades acá terminaría en que se desincroniza
// del tarifario. Se consulta el tarifario, que es la única lista buena.
chequear("Bogotá", x.ciudadDe(["vivo en Bogota"]).toLowerCase() === "bogota");
chequear("dos palabras: Santa Marta", /santa marta/i.test(x.ciudadDe(["soy de Santa Marta"])));
chequear(
  "no confunde un número con ciudad",
  !/\d/.test(x.ciudadDe(["calle 80 con 30"])),
  `dio "${x.ciudadDe(["calle 80 con 30"])}"`
);
chequear("si la ciudad no existe, queda vacía", x.ciudadDe(["soy de Nomelandia"]) === "");

// 🔑 Solo se miran los mensajes DEL CLIENTE: el bot nombra ciudades cuando
// explica el tarifario, y tomar esas daría la ciudad equivocada.
const chatBotNombra = [
  bot("En Bogotá el envío es $13.100, en Cali $22.000"),
  cli("yo soy de Pereira"),
];
chequear(
  "no toma la ciudad de lo que dijo el bot",
  x.heuristica({ mensajes: chatBotNombra, conv: {}, chatId: "1" }).ciudad.toLowerCase() === "pereira",
  x.heuristica({ mensajes: chatBotNombra, conv: {}, chatId: "1" }).ciudad
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Cliente con nombre de usuario: el celular se busca en el chat ──");

// Los clientes con username de WhatsApp no traen teléfono, y sin celular no hay
// guía. Si lo dictaron en la conversación, hay que encontrarlo.
const hUser = x.heuristica({
  mensajes: [cli("mi celular es 310 555 4433"), cli("soy de Cali")],
  conv: {},
  chatId: "CO.1098abcdef",
});
chequear("encuentra el celular dictado en el chat", hUser.celular === "3105554433", hUser.celular);
chequear(
  "y NO usa el identificador interno como celular",
  !/CO\./.test(hUser.celular),
  "un BSUID no es un teléfono: la transportadora no lo puede usar"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. El nombre del perfil de WhatsApp sirve de punto de partida ──");

const hPerfil = x.heuristica({
  mensajes: [cli("quiero uno")],
  conv: { perfil: { nombre: "Pedro Motos" } },
  chatId: "573001112233",
});
chequear("toma el nombre del perfil", hPerfil.nombre === "Pedro Motos");

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. La IA aporta nombre y dirección, pero NO el total ──");

(async () => {
  // Una IA falsa que devuelve datos, incluido un total inventado y un celular
  // distinto: los dos tienen que ser ignorados.
  const iaFalsa = async () =>
    '```json\n{"nombre":"Juan Carlos Pérez Gómez","celular":"3009999999",' +
    '"ciudad":"Monteria","direccion":"Calle 34 #12-45, barrio La Granja","talla":"2XL",' +
    '"color":"rojo","unidades":1,"total":"999999"}\n```';

  const r = await x.extraer({
    mensajes: chat1,
    conv: {},
    chatId: "573015557788",
    llamarIA: iaFalsa,
  });

  chequear("usó la IA", r.conIA === true);
  chequear(
    "el nombre completo lo puso la IA",
    r.datos.nombre === "Juan Carlos Pérez Gómez",
    r.datos.nombre
  );
  chequear("la dirección la mejoró la IA", /barrio La Granja/.test(r.datos.direccion));
  chequear(
    "🔴 el celular lo pone la heurística, NO la IA",
    r.datos.celular === "3015557788",
    `dio ${r.datos.celular} — la IA decía 3009999999`
  );
  chequear(
    "🔴 el total inventado por la IA se IGNORA",
    r.datos.total === fletes.cotizar("Monteria", 1).total,
    `dio ${r.datos.total} — la IA decía 999999`
  );

  // Lee JSON aunque venga con cercas de código o texto alrededor.
  chequear(
    "parsea JSON envuelto en ```json",
    (x.parsearJson('```json\n{"a":1}\n```') || {}).a === 1
  );
  chequear(
    "y con texto alrededor",
    (x.parsearJson('Acá va: {"a":2} listo') || {}).a === 2
  );
  chequear("si no hay JSON, devuelve null", x.parsearJson("no hay nada") === null);

  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n── 8. Si la IA falla, igual se llena con lo que se pudo leer ──");

  const rFalla = await x.extraer({
    mensajes: chat1,
    conv: {},
    chatId: "573015557788",
    llamarIA: async () => {
      throw new Error("sin cuota");
    },
  });
  chequear("no explota", !!rFalla.datos);
  chequear("avisa que fue sin IA", rFalla.conIA === false);
  chequear("el aviso dice por qué", /sin cuota/.test(rFalla.aviso || ""), rFalla.aviso);
  chequear("y los datos duros siguen ahí", rFalla.datos.talla === "2XL" && rFalla.datos.celular === "3015557788");

  const rBasura = await x.extraer({
    mensajes: chat1,
    conv: {},
    chatId: "573015557788",
    llamarIA: async () => "no entendí la pregunta",
  });
  chequear("si la IA contesta cualquier cosa, tampoco rompe", rBasura.conIA === false);
  chequear("y cae en la heurística", rBasura.datos.ciudad.toLowerCase() === "monteria");

  // Sin IA configurada, funciona igual.
  const rSinIA = await x.extraer({ mensajes: chat1, conv: {}, chatId: "573015557788" });
  chequear("sin IA configurada funciona", rSinIA.conIA === false && rSinIA.datos.talla === "2XL");

  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n── 9. NO inventa: lo que no está, queda vacío ──");

  const rVacio = await x.extraer({
    mensajes: [cli("hola")],
    conv: {},
    chatId: "573001112233",
    llamarIA: async () => '{"nombre":"","ciudad":"","direccion":"","talla":"","color":""}',
  });
  chequear("sin datos en el chat, los campos quedan vacíos", rVacio.datos.nombre === "" && rVacio.datos.ciudad === "");
  chequear("el total queda vacío para que lo calcule el tarifario", rVacio.datos.total === "");
  chequear("unidades cae en 1", rVacio.datos.unidades === 1);
  chequear(
    "y el celular igual se saca del chat",
    rVacio.datos.celular === "3001112233"
  );

  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n── 10. El prompt de la IA es corto y prohíbe inventar ──");

  const p = x.PROMPT_EXTRACCION;
  chequear("prohíbe inventar, explícitamente", /NO lo inventes/.test(p));
  chequear("pide solo JSON", /SOLO un objeto JSON/.test(p));
  chequear("dice las tallas del catálogo", /3XL/.test(p));
  chequear("dice los colores del catálogo", /morado/.test(p));
  chequear(
    "es corto: no arrastra el guion de ventas",
    Math.round(p.length / 4) < 400,
    `va en ${Math.round(p.length / 4)} tokens`
  );

  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
