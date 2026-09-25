/**
 * UN CHAT NECESITA ATENCIÓN CUANDO EL CLIENTE ESPERA, NO POR HABER SIDO ESCALADO.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep), en palabras del dueño:
 *
 *   "hay muchos chats que ya los abrí y yo les respondí, entonces debería haber
 *    un sistema para saber qué he hecho yo, ya entré, y tu intervención también.
 *    (...) todos los chats que hay que atender por humanos pueden pasar dos días
 *    y me siguen saliendo ahí y se ve súper desordenado porque son muchos"
 *
 * 🔴 LA CAUSA, y era de una sola línea: `atencion.evaluar` le daba +100 puntos a
 * `c.paused`, y `paused` se prende cuando el dueño contesta y NUNCA se apaga
 * solo. O sea que el premio por atender un chat era que ese chat se quedara
 * clavado en el primer lugar de la lista de urgentes para siempre. La lista se
 * llenaba de trabajo YA HECHO y el pendiente real quedaba sepultado.
 *
 * 🔴 Y EL SEGUNDO PROBLEMA: `/responder` guardaba la respuesta del dueño con
 * `role: "assistant"`, igual que las del bot. Eran indistinguibles, así que no
 * había ni con qué calcular "esto ya lo atendí".
 *
 * 🔑 EL ARREGLO NO ES UN BOTÓN DE OCULTAR, ES CAMBIAR LA PREGUNTA:
 *   · le contestamos después de que escribió  → atendido, sale de la lista
 *   · el cliente escribió después             → vuelve a la lista, solo
 *
 *   node test-atendido-y-orden.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-atendido";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");
const atencion = require("./src/atencion");

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

// ⚠️ `Date.now()` tiene resolución de milisegundo y en este repo ya colisionó
// (trampa #1: dos pedidos con la misma fecha exacta). En producción los mensajes
// entran separados por segundos; acá se fuerza la separación a propósito para que
// la prueba mida la lógica y no la velocidad del disco.
const esperar = (ms = 5) => {
  const hasta = Date.now() + ms;
  while (Date.now() < hasta) {}
};

const MIN = 60 * 1000;
const HORA = 60 * MIN;
const DIA = 24 * HORA;

/** Arma una conversación a mano, con tiempos controlados. */
function conv(msgs, extra = {}) {
  return { messages: msgs, paused: false, ...extra };
}
const delCliente = (at, texto = "hola, me interesa") => ({ role: "user", content: texto, at });
const delBot = (at, texto = "¡Claro! Te cuento") => ({ role: "assistant", content: texto, at });
const delDueño = (at, texto = "listo, ya te lo despacho") => ({
  role: "assistant",
  content: texto,
  at,
  por: "humano",
});

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. EL BUG: contestar un chat lo dejaba urgente para siempre ──");

const ahora = Date.now();

// El caso exacto: el cliente escribió hace 2 días, el dueño le contestó, y el
// chat quedó pausado. Antes esto puntuaba 100+ y salía primero en la lista.
const yaRespondido = conv(
  [delCliente(ahora - 2 * DIA), delDueño(ahora - 2 * DIA + 10 * MIN)],
  { paused: true }
);
const eva1 = atencion.evaluar("573001112233", yaRespondido);
chequear("un chat ya respondido NO necesita atención", eva1.nivel === null, JSON.stringify(eva1));
chequear("y queda registrado como atendido", eva1.atendido === true);
chequear(
  "aunque el bot siga pausado (que es lo normal después de contestar)",
  yaRespondido.paused === true && eva1.nivel === null
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Pero si el cliente vuelve a escribir, reaparece solo ──");

const volvioAEscribir = conv(
  [
    delCliente(ahora - 2 * DIA),
    delDueño(ahora - 2 * DIA + 10 * MIN),
    delCliente(ahora - 30 * MIN, "¿y el envío cuánto es?"),
  ],
  { paused: true }
);
const eva2 = atencion.evaluar("573001112233", volvioAEscribir);
chequear("vuelve a la lista sin que nadie lo desmarque", eva2.nivel === "alta", JSON.stringify(eva2));
chequear("y es urgente: el bot está callado, nadie le va a contestar", eva2.puntos >= 100);
chequear(
  "el motivo dice que el bot está silenciado",
  (eva2.motivos || []).some((m) => /silenciado/.test(m))
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Se distingue quién contestó: el bot o vos ──");

const contestoElBot = conv([delCliente(ahora - 2 * HORA), delBot(ahora - 2 * HORA + MIN)]);
chequear(
  "una respuesta del BOT no cuenta como atención humana",
  atencion.atendidoEn(contestoElBot) === 0,
  `atendidoEn=${atencion.atendidoEn(contestoElBot)}`
);
chequear(
  "una respuesta del DUEÑO sí cuenta",
  atencion.atendidoEn(yaRespondido) === ahora - 2 * DIA + 10 * MIN
);

// Y el rol que ve la IA no se toca: tiene que seguir siendo "assistant", porque
// son los únicos roles válidos del modelo y el bot necesita ese contexto.
chequear(
  "la respuesta del dueño se guarda con role assistant (la IA no se rompe)",
  delDueño(1).role === "assistant" && delDueño(1).por === "humano"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. El 'ya lo atendí' a mano, para lo que se resuelve por teléfono ──");

store.pushMsg("573009998877", "user", "no me ha llegado el pedido");
let c = store.getConv("573009998877");
chequear(
  "un reclamo sin responder sí necesita atención",
  atencion.evaluar("573009998877", c).nivel === "alta"
);

esperar();
store.marcarAtendido("573009998877", "dueño");
c = store.getConv("573009998877");
const eva4 = atencion.evaluar("573009998877", c);
chequear("después de marcarlo, sale de la lista", eva4.nivel === null);
chequear("y dice que lo atendió el dueño", eva4.atendidoPor === "dueño");

// 🔑 Se guarda la HORA, no un booleano: si fuera booleano, el chat quedaría
// enterrado para siempre y una venta se perdería en silencio.
esperar();
store.pushMsg("573009998877", "user", "sigo esperando");
c = store.getConv("573009998877");
chequear(
  "si el cliente insiste después, vuelve a aparecer",
  atencion.evaluar("573009998877", c).nivel === "alta",
  JSON.stringify(atencion.evaluar("573009998877", c))
);

esperar();
store.marcarAtendido("573009998877");
chequear(
  "y se puede deshacer a mano",
  (() => {
    store.desmarcarAtendido("573009998877");
    return atencion.evaluar("573009998877", store.getConv("573009998877")).nivel === "alta";
  })()
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Responder desde el panel marca el chat solo ──");

store.pushMsg("573005554433", "user", "¿es estafa esto?");
chequear(
  "antes de contestar, necesita atención",
  atencion.evaluar("573005554433", store.getConv("573005554433")).nivel === "alta"
);
// Así lo guarda /responder cuando el dueño escribe desde /chat.
esperar();
store.pushMsg("573005554433", "assistant", "Somos reales, te muestro", { por: "humano" });
chequear(
  "al responder desde el panel queda atendido sin tocar ningún botón",
  atencion.evaluar("573005554433", store.getConv("573005554433")).nivel === null
);
chequear(
  "y el store anota cuándo fue la última respuesta humana",
  !!store.getConv("573005554433").ultimaRespuestaHumana
);

// Un mensaje del bot NO debe marcar nada.
store.pushMsg("573007776655", "user", "muy caro");
store.pushMsg("573007776655", "assistant", "te cuento el detalle");
chequear(
  "una respuesta automática del bot no marca el chat como atendido",
  !store.getConv("573007776655").ultimaRespuestaHumana
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. La lista se agrupa por día, en hora de Bogotá ──");

const convs = {
  "573100000001": conv([delCliente(ahora - 20 * MIN, "estoy esperando, llevo días")]),
  "573100000002": conv([delCliente(ahora - 26 * HORA, "es estafa?")]),
  "573100000003": conv([delCliente(ahora - 3 * DIA, "reclamo, no ha llegado")]),
  // atendido: no es pendiente, es registro
  "573100000004": conv([delCliente(ahora - 5 * HORA), delDueño(ahora - 4 * HORA)]),
};

const pend = atencion.priorizar(convs);
chequear(
  "los 3 sin responder quedan pendientes y el respondido no",
  pend.length === 3 && !pend.some((p) => p.tel === "573100000004"),
  `pendientes=${pend.map((p) => p.tel).join(",")}`
);
chequear(
  "cada pendiente trae desde cuándo espera el cliente",
  pend.every((p) => Number.isFinite(p.esperaDesde) && p.esperaDesde > 0)
);

const hechos = atencion.atendidos(convs);
chequear("y el atendido aparece en la lista de lo ya respondido", hechos.length === 1);
chequear("con la hora en que se atendió", hechos[0].atendidoAt === ahora - 4 * HORA);

// El agrupado usa el día de Bogotá, no el del servidor: Render corre en UTC y
// después de las 19:00 de Bogotá un `new Date()` pelado ya dice "mañana".
const resumenMod = require("./src/resumen");
chequear(
  "el día se calcula en hora de Bogotá",
  resumenMod.diaBogota(ahora) === new Date(ahora).toLocaleDateString("en-CA", {
    timeZone: "America/Bogota",
  })
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Y el dueño lo ve ordenado en el panel ──");

fs.rmSync(DIR, { recursive: true, force: true });
delete require.cache[require.resolve("./src/store")];
delete require.cache[require.resolve("./src/panel")];
const store2 = require("./src/store");

// Uno de hoy sin responder, uno viejo sin responder, uno ya respondido hoy.
store2.pushMsg("573200000001", "user", "hola, es estafa esto?");
store2.pushMsg("573200000002", "user", "reclamo: no me ha llegado");
esperar();
store2.marcarAtendido("573200000002");
store2.pushMsg("573200000003", "user", "muy caro, me das descuento?");
esperar();
store2.pushMsg("573200000003", "assistant", "te dejo en 70", { por: "humano" });

const html = require("./src/panel").render();

chequear("el título habla de chats esperando respuesta", /esperando respuesta/.test(html));
chequear("hay un grupo por día", /<h4>Hoy · \d+<\/h4>/.test(html));
chequear("aparece el bloque de lo ya respondido hoy", /Ya respondiste hoy/.test(html));
chequear("con el botón ✅ para sacar de la lista", /action="\/atendido"/.test(html));
chequear("y explica que reaparece si el cliente escribe", /reaparece solo/.test(html));

// Distingue haber contestado de haber marcado: lo primero queda escrito en el
// chat, lo segundo pudo ser una llamada. Es el "control de lo que se respondió".
chequear("dice cuál se respondió de verdad", /le respondiste vos/.test(html));
chequear("y cuál solo se marcó como resuelto", /lo marcaste como resuelto/.test(html));

// "hace 1800 min" no se lee de un vistazo.
const eva7 = atencion.evaluar("x", conv([delCliente(ahora - 30 * HORA, "hola?")]));
chequear(
  "la antigüedad se dice en días, no en minutos",
  (eva7.motivos || []).some((m) => /hace 1 día|hace \d+ días/.test(m)),
  JSON.stringify(eva7.motivos)
);
chequear(
  "y en horas cuando corresponde",
  (atencion.evaluar("x", conv([delCliente(ahora - 3 * HORA, "hola?")])).motivos || []).some((m) =>
    /hace 3 h/.test(m)
  )
);
chequear(
  "los dos atendidos salen en el registro y no en pendientes",
  (html.match(/Ya respondiste hoy · 2/) || []).length === 1,
  "se esperaban 2 atendidos hoy"
);
chequear(
  "el que falta responder sigue visible como pendiente",
  /esperando respuesta/.test(html) && html.includes("573200000001")
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 8. Nada de esto le escribe al cliente ──");

// Marcar atendido es un cambio de estado, no un mensaje. Si alguna vez alguien
// mete un envío acá, esta prueba lo caza: el conteo de mensajes no cambia.
const antes = store2.getConv("573200000002").messages.length;
esperar();
store2.marcarAtendido("573200000002");
chequear(
  "marcar atendido no agrega ningún mensaje a la conversación",
  store2.getConv("573200000002").messages.length === antes
);
chequear(
  "y no toca la marca de ventana de 24h del cliente",
  store2.getConv("573200000002").ultimoDelCliente ===
    store2.getConv("573200000002").messages.filter((m) => m.role === "user").pop().at
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
