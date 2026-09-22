/**
 * LOS BOTONES DE LA PLANTILLA DE SEGUIMIENTO TIENEN QUE FUNCIONAR.
 *
 * POR QUE IMPORTA: la plantilla `seguimiento_impermeable` lleva dos botones
 * ("Si, me interesa" / "No, gracias"), y esos botones SON el mecanismo completo:
 * cuando el cliente toca uno, para WhatsApp eso cuenta como que escribio y se
 * reabre la ventana de 24h para poder hablarle libre.
 *
 * 🔴 EL BUG QUE ESTO CUBRE: el bot solo leia mensajes de tipo "text". La
 * respuesta a un boton NO es de ese tipo, asi que caia en la rama de "tipos no
 * soportados" y al cliente que acababa de levantar la mano se le contestaba
 * "Todavia no puedo abrir ese tipo de archivo". La plantilla no servia de nada.
 *
 *   node test-botones-y-plantillas.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-botones";
fs.rmSync(DIR, { recursive: true, force: true });

process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";
process.env.WHATSAPP_VERIFY_TOKEN = "verify_de_prueba";
process.env.PORT = "3897";

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

console.log("\n── 1. El idioma de las plantillas: es_CO, no es ──");
// Este default estaba en "es" y habria hecho fallar los seguimientos 2 y 3 en
// silencio el dia que se prendieran: Meta rechaza el envio aunque la plantilla
// este aprobada, y el error no menciona el idioma.
const seg = fs.readFileSync(__dirname + "/src/seguimiento.js", "utf8");
chequear(
  "el seguimiento usa es_CO por defecto",
  /SEGUIMIENTO_IDIOMA \|\| "es_CO"/.test(seg),
  "quedo en 'es' y los pasos 2 y 3 fallarian sin decir por que"
);
chequear(
  "los pasos 2 y 3 apuntan a la plantilla que el dueño subio",
  (seg.match(/seguimiento_impermeable/g) || []).length >= 2
);
const srv = fs.readFileSync(__dirname + "/src/server.js", "utf8");
chequear("el resto del bot también usa es_CO", /PLANTILLA_IDIOMA \|\| "es_CO"/.test(srv));

console.log("\n── 2. El bot lee las respuestas de los botones ──");

const store = require("./src/store");
require("./src/server");

const CLIENTE_SI = "573001110001";
const CLIENTE_NO = "573001110002";

function payloadBoton(de, titulo, tipo) {
  const msg =
    tipo === "interactive"
      ? { type: "interactive", interactive: { type: "button_reply", button_reply: { id: "b1", title: titulo } } }
      : { type: "button", button: { text: titulo, payload: titulo } };
  return {
    entry: [
      {
        changes: [
          {
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "573227545695", phone_number_id: "1" },
              contacts: [{ profile: { name: "Cliente" }, wa_id: de }],
              messages: [{ from: de, id: "wamid." + Math.random(), timestamp: "1", ...msg }],
            },
          },
        ],
      },
    ],
  };
}

async function mandar(cuerpo) {
  const r = await fetch("http://localhost:3897/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  // El webhook responde 200 de una y procesa aparte: hay que darle un momento.
  await new Promise((s) => setTimeout(s, 700));
  return r.status;
}

(async () => {
  await new Promise((s) => setTimeout(s, 600));

  // --- El que dice SÍ: su mensaje tiene que entrar al flujo normal ---
  await mandar(payloadBoton(CLIENTE_SI, "Si, me interesa", "button"));
  const convSi = store.getConv(CLIENTE_SI);
  const suyos = (convSi.messages || []).filter((m) => m.role === "user");

  chequear(
    "el toque del botón se guarda como un mensaje del cliente",
    suyos.length >= 1,
    "no quedó registrado, así que la conversación no existe para el bot"
  );
  chequear(
    'y con el texto del botón ("Si, me interesa")',
    suyos.some((m) => /me interesa/i.test(m.content)),
    JSON.stringify(suyos.map((m) => m.content))
  );
  chequear(
    "🔑 NO le respondió el mensaje de archivo no soportado",
    !(convSi.messages || []).some((m) => /no puedo abrir ese tipo/i.test(m.content)),
    "al cliente que levantó la mano se le contestó una confusión"
  );
  chequear("y NO quedó marcado como no molestar", convSi.noMolestar !== true);

  // --- El que dice NO: se respeta y no se le insiste ---
  await mandar(payloadBoton(CLIENTE_NO, "No, gracias", "interactive"));
  const convNo = store.getConv(CLIENTE_NO);

  chequear(
    "un NO por botón lo marca como no molestar",
    convNo.noMolestar === true,
    "le seguiría llegando seguimiento a alguien que dijo que no"
  );
  chequear(
    "y le suma seguimientos para que no entre otra vez a la cola",
    (convNo.seguimientos || 0) > 0,
    `seguimientos: ${convNo.seguimientos}`
  );
  chequear(
    "se le contesta con una despedida, no con el pitch",
    (convNo.messages || []).some((m) => m.role === "assistant" && /no te escribo más/i.test(m.content)) ||
      // el envío real falla sin credenciales; alcanza con que NO haya intentado vender
      !(convNo.messages || []).some((m) => m.role === "assistant" && /\$/.test(m.content)),
    JSON.stringify((convNo.messages || []).map((m) => m.role + ": " + String(m.content).slice(0, 40)))
  );

  console.log("\n── 3. También funciona el otro formato que manda Meta ──");
  // Meta usa "button" para las respuestas rápidas de plantilla y "interactive"
  // para los botones de un mensaje interactivo. Se miran los dos.
  chequear("formato button (plantilla)", suyos.some((m) => /me interesa/i.test(m.content)));
  chequear("formato interactive (botón de mensaje)", convNo.noMolestar === true);

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
