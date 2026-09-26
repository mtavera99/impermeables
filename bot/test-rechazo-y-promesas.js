/**
 * DEJAR DE ESCRIBIR CUANDO LO PIDEN — Y NO PROMETER LO QUE NO SE PUEDE.
 *
 * DE DÓNDE SALEN ESTAS PRUEBAS (26-sep). Tres grupos de casos reportados:
 *
 * ── RECHAZO ────────────────────────────────────────────────────────────────
 *   "Cuando decida comprarlo yo les escribo. Ahorita no"
 *   "Cuando lo vaya a comprar les escribo. Por favor"
 *   "Por Dios… Les he respondido varias veces"
 *   "Ya les dije que no me interesa"
 *
 * 🔴 La detección que había tenía DOS problemas medidos:
 *   1. de esas cuatro frases detectaba UNA (pedía "ya no me interesa" pegado)
 *   2. `no quiero` marcaba como noMolestar a quien decía "no quiero rojo, quiero
 *      azul" — le cortaba el seguimiento a un cliente ELIGIENDO EL COLOR
 *
 * ── PROMESAS ───────────────────────────────────────────────────────────────
 *   afirmó haber actualizado un pedido · dijo conocer el estado del despacho ·
 *   prometió despacho "hoy mismo" · garantizó cubrir una maleta · dijo que
 *   estamos en Cali cuando la bodega está en Bogotá
 *
 * ── CONFIRMACIÓN POSTERIOR ─────────────────────────────────────────────────
 *   un pedido seguía marcado "sin confirmar" después de un "Sí" explícito
 *
 *   node test-rechazo-y-promesas.js      (sin credenciales ni red)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-rechazo";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const rechazo = require("./src/rechazo");
const promesas = require("./src/promesas");
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

// La expresión que había antes, para comparar contra ella.
const VIEJA = /\b(no me escrib|no escrib|dejen? de escrib|no molest|ya no me interesa|elimin[ae]me|no quiero)\b/i;

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Las cuatro frases REALES de rechazo ──");

const REALES = [
  "Cuando decida comprarlo yo les escribo. Ahorita no",
  "Cuando lo vaya a comprar les escribo. Por favor",
  "Por Dios… Les he respondido varias veces",
  "Ya les dije que no me interesa",
];
let detectabaAntes = 0;
for (const frase of REALES) {
  if (VIEJA.test(frase)) detectabaAntes++;
  chequear(`se detecta: "${frase.slice(0, 44)}…"`, rechazo.esRechazo(frase) === true);
}
chequear(
  `🔑 la detección vieja solo agarraba ${detectabaAntes} de 4`,
  detectabaAntes <= 1,
  `agarraba ${detectabaAntes}`
);

// Otras formas del mismo pedido.
for (const frase of [
  "no me escriban más por favor",
  "dejen de escribirme",
  "bórrenme de la lista",
  "no me vuelvan a llamar",
  "déjenme en paz",
  "ya basta",
  "no lo voy a comprar",
  "cuántas veces les tengo que decir",
]) {
  chequear(`también: "${frase}"`, rechazo.esRechazo(frase) === true);
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. 🔑 Lo que PARECE rechazo y es una venta en curso ──");

// Este es el bloque que más importa: un falso positivo acá apaga una venta.
const CORRECCIONES = [
  ["no quiero rojo, quiero azul", "está eligiendo el color"],
  ["no quiero dos, uno solo", "está eligiendo la cantidad"],
  ["no me gusta el verde, mejor negro", "está eligiendo el color"],
  ["no tengo la dirección a mano", "le falta un dato"],
  ["no sé la nomenclatura del barrio", "le falta un dato"],
  ["no me ha llegado el pedido", "es posventa, no rechazo"],
  ["no es esa talla, la 2XL", "está corrigiendo la talla"],
];
for (const [frase, porQue] of CORRECCIONES) {
  chequear(`NO es rechazo (${porQue}): "${frase}"`, rechazo.esRechazo(frase) === false);
}
chequear(
  "🔑 y dos de esas SÍ las cortaba la versión vieja",
  VIEJA.test("no quiero rojo, quiero azul") && VIEJA.test("no quiero dos, uno solo"),
  "por eso el falso positivo importaba: cortaba seguimientos de clientes comprando"
);
chequear(
  "la corrección se reporta como tal, no como silencio",
  rechazo.evaluar("no quiero rojo, quiero azul").esCorreccion === true
);

// Una pregunta normal no es ni una cosa ni la otra.
for (const frase of ["de qué talla hay?", "cuánto cuesta el envío?", "sí, lo quiero"]) {
  const e = rechazo.evaluar(frase);
  chequear(`neutral: "${frase}"`, e.rechaza === false && e.esCorreccion === false);
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. El rechazo tiene que ser persistente ──");

const TEL = "573001112233";
store.pushMsg(TEL, "user", "ya les dije que no me interesa");
store.marcarNoMolestar(TEL);
chequear("queda marcado noMolestar", store.getConv(TEL).noMolestar === true);

delete require.cache[require.resolve("./src/store")];
const store2 = require("./src/store");
chequear(
  "🔑 y sobrevive al reinicio",
  store2.getConv(TEL).noMolestar === true,
  "si se perdiera, el seguimiento le volvería a escribir"
);
// El seguimiento tiene que excluirlo.
const seg = require("./src/seguimiento");
chequear(
  "el seguimiento lo excluye",
  /noMolestar/.test(fs.readFileSync("./src/seguimiento.js", "utf8")),
  "elegible() descarta a los noMolestar"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. Promesas que el bot no puede respaldar ──");

const CASOS_PROMESA = [
  ["Ya actualicé tu pedido con el teléfono nuevo", "operacion_ya_hecha"],
  ["Ya cambié tu dirección en el sistema", "operacion_ya_hecha"],
  ["Tu pedido ya salió, va en camino", "conoce_el_despacho"],
  ["Se despacha hoy mismo", "promesa_de_fecha"],
  ["Te llega mañana sin problema", "promesa_de_fecha"],
  ["Tranquilo que te cubre la maleta", "garantia_de_medida"],
  ["Esa talla te queda perfecto", "ajuste_de_talla"],
  ["Quedan pocas unidades, se agota hoy", "escasez_inventada"],
];
for (const [texto, clave] of CASOS_PROMESA) {
  const r = promesas.revisar(texto);
  chequear(
    `${clave}: "${texto.slice(0, 40)}…"`,
    r.ok === false && r.hallazgos.some((h) => h.clave === clave),
    JSON.stringify(r.hallazgos.map((h) => h.clave))
  );
}

// La bodega: el caso del "¡Así es!" a "están en Cali".
const cali = promesas.revisar("Sí, estamos en Cali");
chequear("dice una ciudad que no es la de la bodega", cali.ok === false);
chequear(
  "y el motivo nombra la bodega real",
  cali.hallazgos.some((h) => h.clave === "ubicacion_equivocada" && /bogota/i.test(h.porQue)),
  JSON.stringify(cali.hallazgos)
);
chequear("la ciudad correcta NO se marca", promesas.revisar("Estamos en Bogotá").ok === true);

// Cada hallazgo dice qué hacer en lugar de eso: sirve para corregir, no solo para regañar.
chequear(
  "cada hallazgo propone la alternativa",
  promesas.revisar("Se despacha hoy mismo").hallazgos.every((h) => h.queHacerEnLugar && h.queHacerEnLugar.length > 20)
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Y lo que SÍ puede decir, no se bloquea ──");

// 🔑 Un detector con falsas alarmas se apaga. Estas frases son correctas.
const PERMITIDAS = [
  "El conjunto es negro y la franja la eliges en rojo, verde, azul, blanco, negro o morado",
  "Normalmente la transportadora entrega entre 1 y 3 días hábiles",
  "Te recomiendo pedir una talla más de la que usas normalmente",
  "Pagas contraentrega cuando lo recibes",
  "Tenemos bodega en Bogotá y puedes pasar a recogerlo",
  "Le paso tu solicitud para que ajusten el teléfono del pedido",
  "Dejame confirmarte el envío a tu ciudad y te escribo",
  "Es PVC siliconado calibre 8 con costura termosellada",
];
for (const frase of PERMITIDAS) {
  const r = promesas.revisar(frase);
  chequear(`pasa: "${frase.slice(0, 46)}…"`, r.ok === true, promesas.resumir(r));
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. La confirmación posterior completa el pedido, no lo duplica ──");

const T2 = "573009998877";
const base = {
  nombre: "Ana Pérez",
  celular: "3009998877",
  ciudad: "Cali",
  direccion: "Cra 1 #2-3",
  talla: "L",
  color: "rojo",
  pago: "contraentrega",
  total: 82000,
  telefono_chat: T2,
};

// El bot emite el bloque ANTES de que el cliente conteste: se guarda marcado.
const primero = store2.saveOrder({ ...base, sin_confirmar: true, motivo_sin_confirmar: "no hubo un sí claro" });
chequear("el pedido entra marcado sin confirmar", primero.sin_confirmar === true);

// El cliente dice "Sí" y el bot vuelve a emitir el bloque, ya sin la marca.
const segundo = store2.saveOrder({ ...base });
chequear("no se crea un pedido nuevo", segundo.duplicadoIgnorado === true);
chequear("🔑 y se reconoce como confirmación posterior", segundo.confirmadoDespues === true);

const vivos = store2.todosLosPedidos().filter((p) => p.telefono_chat === T2);
chequear("sigue habiendo UN solo pedido", vivos.length === 1, `hay ${vivos.length}`);
chequear(
  "🔑 y ya NO está marcado sin confirmar",
  !vivos[0].sin_confirmar,
  "el dueño veía 'SIN CONFIRMAR' en un pedido que el cliente sí confirmó, y la regla es no despacharlo"
);
chequear("queda registrado cuándo se confirmó", !!vivos[0].confirmado_despues);

// Y si el duplicado también viene sin confirmar, NO se levanta la marca sola.
const T3 = "573005554433";
store2.saveOrder({ ...base, telefono_chat: T3, celular: "3005554433", sin_confirmar: true, motivo_sin_confirmar: "x" });
store2.saveOrder({ ...base, telefono_chat: T3, celular: "3005554433", sin_confirmar: true, motivo_sin_confirmar: "x" });
const t3 = store2.todosLosPedidos().filter((p) => p.telefono_chat === T3);
chequear(
  "sin un sí de verdad, la marca se queda",
  t3.length === 1 && t3[0].sin_confirmar === true,
  JSON.stringify(t3.map((p) => p.sin_confirmar))
);

// ============================================================================
// 🔴 LO QUE SEÑALÓ LA REVISIÓN DEL 26-SEP
// ============================================================================

console.log("\n── R6. 🔧 La promesa se CORRIGE antes de enviarla, no después ──");
// Textual de la revisión: "#164 envía expresamente el mensaje detectado como
// falso y luego pausa el chat. Eso no cumple el requisito."
// Tenía razón: el cliente ya lo había leído, y la pausa no le avisa a nadie.
{
  const CASOS = [
    [
      "operacion_ya_hecha",
      "¡Hola Ana! Ya actualicé tu pedido con el teléfono nuevo. Te llega a $82.000 contraentrega 📦",
      /\$82\.000/, // lo que hay que CONSERVAR
    ],
    ["conoce_el_despacho", "Tu pedido ya salió, va en camino. Cualquier cosa me escribís 🙌", /me escrib/],
    ["promesa_de_fecha", "Se despacha hoy mismo. El conjunto es negro y la franja la eliges en 6 colores.", /6 colores/],
    ["garantia_de_medida", "Tranquilo que te cubre la maleta sin problema. Es PVC calibre 8.", /calibre 8/],
    ["escasez_inventada", "Quedan pocas unidades, se agota hoy. Pásame nombre completo, dirección y celular.", /nombre completo/],
    ["ubicacion_equivocada", "¡Así es! Estamos en Cali. ¿Para qué ciudad sería el envío?", /qué ciudad/],
  ];
  for (const [clave, texto, conservar] of CASOS) {
    const r = promesas.corregir(texto);
    chequear(`${clave}: se corrige`, r.cambios.some((c) => c.clave === clave), JSON.stringify(r.cambios));
    chequear(
      `  🔑 y la corregida ya NO tiene la promesa`,
      promesas.revisar(r.texto).ok,
      promesas.resumir(promesas.revisar(r.texto))
    );
    chequear(`  ✅ conservando el resto del mensaje`, conservar.test(r.texto), r.texto);
  }

  // 🔑 Lo que NO se puede perder: un mensaje limpio tiene que salir idéntico.
  const limpio = "El conjunto es negro y la franja la eliges en 6 colores 🌈 ¿Para qué ciudad sería?";
  chequear("🔑 un mensaje sin promesas sale idéntico", promesas.corregir(limpio).texto === limpio, promesas.corregir(limpio).texto);
  chequear("y no reporta cambios", promesas.corregir(limpio).cambios.length === 0);

  // Cada regla tiene que tener su reemplazo escrito: una regla que detecta y no
  // sabe con qué reemplazar vuelve al problema de solo llevar la cuenta.
  for (const r of promesas.REGLAS) {
    chequear(`  la regla ${r.clave} tiene reemplazo`, typeof promesas.REEMPLAZOS[r.clave] === "string" && promesas.REEMPLAZOS[r.clave].length > 15);
  }
  chequear(
    "y el reemplazo de la ubicación también",
    typeof promesas.REEMPLAZOS.ubicacion_equivocada === "string"
  );
  // Ningún reemplazo puede traer una promesa nueva adentro.
  for (const [clave, texto] of Object.entries(promesas.REEMPLAZOS)) {
    chequear(`  el reemplazo de ${clave} no promete nada`, promesas.revisar(texto).ok, promesas.resumir(promesas.revisar(texto)));
  }
}

console.log("\n── R6b. 🙋 La derivación a un humano AVISA ──");
// `store.setPaused` no manda ninguna alerta: el chat quedaba en pausa y el dueño
// se enteraba solo si lo abría por casualidad.
{
  const fuenteAgente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
  chequear("agent.js corrige el texto antes de devolverlo", /promesas\.corregir\(/.test(fuenteAgente));
  chequear(
    "🔑 y ya NO manda el mensaje tal como vino",
    !/El mensaje sale igual/.test(fuenteAgente),
    "quedó el comentario de la versión que mandaba la promesa"
  );
  chequear("devuelve revisionHumana para poder avisar", /revisionHumana/.test(fuenteAgente));
  const fuenteServer = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
  chequear(
    "🔑 server.js le avisa al dueño cuando hay revisión",
    /revisionHumana && OWNER/.test(fuenteServer),
    "sin esto la pausa es silenciosa"
  );
  chequear(
    "y el aviso dice qué se cambió",
    /Lo que se cambió/.test(fuenteServer),
    "un aviso sin el detalle obliga a leer todo el chat"
  );
}

console.log("\n── R7. 🔴 La confirmación posterior sobre los datos VIGENTES ──");
// Textual: "quitar sin_confirmar no basta si el registro conserva un color o
// dirección anterior". Es exacto: mismoPedido() compara solo total y talla.
{
  // ⚠️ Se usa el mismo `store` que el resto de la batería: `require` está cacheado,
  // así que cambiar DATA_DIR acá no tendría ningún efecto. Y los datos son únicos
  // a propósito — `pedidosDelMismoCliente` empareja por CELULAR, y reutilizar uno
  // de otra sección hacía que este pedido se tomara por duplicado de aquel.
  const store7 = store;

  const base = {
    nombre: "Marta Ruiz",
    celular: "3007770001",
    ciudad: "Cali",
    direccion: "Cra 1 #2-3",
    talla: "L",
    color: "rojo",
    pago: "contraentrega",
    total: 82000,
    telefono_chat: "573001117777",
  };

  // 1) El bot emite el bloque antes del "sí": queda sin confirmar, color rojo.
  store7.saveOrder({ ...base, sin_confirmar: true, motivo_sin_confirmar: "no hubo un sí claro" });
  // 2) El cliente CORRIGE color y dirección, y ahí sí confirma.
  const r = store7.saveOrder({ ...base, color: "azul", direccion: "Cra 9 #45-12 barrio Prado" });

  const mios = store7.todosLosPedidos().filter((p) => p.telefono_chat === base.telefono_chat);
  chequear("sigue habiendo UN solo pedido", mios.length === 1, `hay ${mios.length}`);
  const p = mios[0];
  chequear("🔑 el color corregido NO se perdió", p.color === "azul", `quedó "${p.color}"`);
  chequear("🔑 ni la dirección corregida", /Prado/.test(String(p.direccion)), `quedó "${p.direccion}"`);
  chequear("se le quitó la marca de sin confirmar", !p.sin_confirmar);
  chequear("queda registrado que se confirmó después", Boolean(p.confirmado_despues));
  chequear(
    "🔑 y queda auditable QUÉ se corrigió",
    Array.isArray(p.correcciones_aplicadas) && p.correcciones_aplicadas.length === 2,
    JSON.stringify(p.correcciones_aplicadas)
  );
  chequear("el detalle nombra el color", /color/.test(String(p.correcciones_aplicadas)), JSON.stringify(p.correcciones_aplicadas));
  chequear("🚦 y el pedido queda listo para despachar", store7.listoParaDespachar ? store7.listoParaDespachar(p) : !p.sin_confirmar);

  // ⚠️ Un campo vacío en el pedido nuevo NO puede borrar uno bueno del anterior.
  const base2 = { ...base, telefono_chat: "573001118888", celular: "3007770002" };
  store7.saveOrder({ ...base2, sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base2, color: "", direccion: "" });
  const p2 = store7.todosLosPedidos().filter((x) => x.telefono_chat === base2.telefono_chat)[0];
  chequear("🔴 un campo vacío NO borra el color que ya estaba", p2.color === "rojo", `quedó "${p2.color}"`);
  chequear("ni la dirección", /Cra 1/.test(String(p2.direccion)), `quedó "${p2.direccion}"`);

  // Y si nada cambió, no se inventan correcciones.
  const base3 = { ...base, telefono_chat: "573001119999", celular: "3007770003" };
  store7.saveOrder({ ...base3, sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base3 });
  const p3 = store7.todosLosPedidos().filter((x) => x.telefono_chat === base3.telefono_chat)[0];
  chequear("sin cambios, no se reporta ninguna corrección", p3.correcciones_aplicadas === undefined);
  chequear("y la marca igual se levanta", !p3.sin_confirmar);
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
