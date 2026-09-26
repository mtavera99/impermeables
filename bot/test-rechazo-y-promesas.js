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
//
// ⚠️ ESTE BLOQUE CAMBIÓ EN LA 3ª REVISIÓN, y conviene decir por qué. La primera
// versión traía la corrección de COLOR encima del pedido anterior. Eso resultó
// inseguro: un pedido con el mismo total y otra talla/color puede ser una
// corrección o UNA SEGUNDA COMPRA, y desde afuera no se distingue. Fusionarlos
// borraba una venta. Ahora la dirección sí se corrige (no cambia qué se vende) y
// el color NO: se conservan los dos registros para que alguien decida.
{
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
    unidades: 1,
    telefono_chat: "573001117777",
  };
  const mios = (tel) => store7.todosLosPedidos().filter((p) => p.telefono_chat === tel);

  // ── Datos de ENTREGA CON corrección identificable: se corrigen ──────────
  // ⚠️ El segundo argumento es el contexto que arma agent.js. `hayCorreccion`
  // significa que el cliente pidió corregir algo; sin eso, un cambio de dirección
  // podría ser una segunda entrega y NO se fusiona (se prueba más abajo).
  store7.saveOrder({ ...base, sin_confirmar: true, motivo_sin_confirmar: "no hubo un sí claro" });
  store7.saveOrder({ ...base, direccion: "Cra 9 #45-12 barrio Prado" }, { hayCorreccion: true });
  const p = mios(base.telefono_chat)[0];
  chequear("sigue habiendo UN solo pedido", mios(base.telefono_chat).length === 1, `hay ${mios(base.telefono_chat).length}`);
  chequear("🔑 la dirección corregida NO se perdió", /Prado/.test(String(p.direccion)), `quedó "${p.direccion}"`);
  chequear("se le quitó la marca de sin confirmar", !p.sin_confirmar);
  chequear("queda registrado que se confirmó después", Boolean(p.confirmado_despues));
  chequear(
    "🔑 y queda auditable QUÉ se corrigió",
    Array.isArray(p.correcciones_aplicadas) && p.correcciones_aplicadas.some((c) => /direccion/.test(c)),
    JSON.stringify(p.correcciones_aplicadas)
  );
  chequear("🚦 y el pedido queda listo para despachar", store7.listoParaDespachar(p), store7.textoDeRevision(p));

  // ── Un campo vacío NO borra uno bueno ──────────────────────────────────
  const base2 = { ...base, telefono_chat: "573001118888", celular: "3007770002" };
  store7.saveOrder({ ...base2, sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base2, direccion: "" }, { hayCorreccion: true });
  const p2 = mios(base2.telefono_chat)[0];
  chequear("🔴 un campo vacío NO borra la dirección que ya estaba", /Cra 1/.test(String(p2.direccion)), `quedó "${p2.direccion}"`);

  // ── Sin cambios, no se inventan correcciones ────────────────────────────
  const base3 = { ...base, telefono_chat: "573001119999", celular: "3007770003" };
  store7.saveOrder({ ...base3, sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base3 });
  const p3 = mios(base3.telefono_chat)[0];
  chequear("sin cambios, no se reporta ninguna corrección", p3.correcciones_aplicadas === undefined);
  chequear("y la marca igual se levanta", !p3.sin_confirmar);

  // ── 🔴 La MISMA dirección distinta, pero SIN corrección identificable ────
  // Es el caso que destapó la 3ª revisión: sin una señal del cliente, un cambio de
  // dirección puede ser una segunda entrega para otra persona. No se fusiona.
  const base4 = { ...base, telefono_chat: "573001116666", celular: "3007770004" };
  store7.saveOrder({ ...base4, sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base4, direccion: "Cra 3 #3-33 barrio Tres" });
  const cuatro = mios(base4.telefono_chat);
  chequear("🔑 sin señal de corrección, se conservan los DOS", cuatro.length === 2, `hay ${cuatro.length}`);
  chequear(
    "🔑 y ninguno queda despachable",
    cuatro.every((x) => store7.listoParaDespachar(x) === false),
    cuatro.map((x) => store7.textoDeRevision(x)).join(" || ")
  );
  chequear(
    "el motivo dice que nadie pidió corrección",
    cuatro.some((x) => /no pidió ninguna corrección/.test(String(x.motivo_precio))),
    cuatro.map((x) => x.motivo_precio).join(" || ")
  );

  // ── 🔑 Y el destinatario es IDENTIDAD, no un dato de entrega ─────────────
  // El caso textual del reporte: misma tarifa, otro destinatario.
  const base5 = { ...base, telefono_chat: "573001115555", celular: "3007770005" };
  store7.saveOrder({ ...base5, nombre: "Destinataria A", sin_confirmar: true, motivo_sin_confirmar: "x" });
  store7.saveOrder({ ...base5, nombre: "Destinatario B", direccion: "Cra 2 #2-22" }, { hayCorreccion: true });
  const cinco = mios(base5.telefono_chat);
  chequear(
    "🔑 otro destinatario NO sobrescribe, ni con señal de corrección",
    cinco.length === 2,
    `hay ${cinco.length}`
  );
  chequear(
    "🔑 el primer destinatario sigue ahí",
    cinco.some((x) => x.nombre === "Destinataria A"),
    JSON.stringify(cinco.map((x) => x.nombre))
  );
  chequear(
    "y el motivo dice que cambia a quién va dirigido",
    cinco.some((x) => /cambia a QUIÉN va dirigido/.test(String(x.motivo_precio))),
    cinco.map((x) => x.motivo_precio).join(" || ")
  );
}

console.log("\n── R8. 🔴 Corregir una promesa NO puede romper el precio ──");
// Textual: corregir("Sale hoy mismo y el total es $82.000. Pásame la dirección.")
// devolvía "...según la ciudad.000". El separador de miles se tomaba por fin de frase.
{
  chequear(
    "🔑 enFrases NO parte $82.000 por la mitad",
    promesas.enFrases("El total es $82.000. Listo.").length === 2,
    JSON.stringify(promesas.enFrases("El total es $82.000. Listo.").map((f) => f.cuerpo + f.cierre))
  );
  chequear(
    "ni un decimal con coma",
    promesas.enFrases("Mide 1,5 metros. Listo.").length === 2,
    JSON.stringify(promesas.enFrases("Mide 1,5 metros. Listo.").map((f) => f.cuerpo))
  );

  // El caso exacto del reporte.
  const CASO = "Sale hoy mismo y el total es $82.000. Pásame la dirección.";
  const r = promesas.corregir(CASO);
  chequear("🔑 el caso reportado ya no rompe el importe", !/\.000\b/.test(r.texto.replace(/\$\d{1,3}\.\d{3}/g, "")), r.texto);
  chequear("   el $82.000 sigue entero", /\$82\.000/.test(r.texto), r.texto);
  chequear("   la promesa de fecha se fue", promesas.revisar(r.texto).ok, promesas.resumir(promesas.revisar(r.texto)));
  chequear("   y la pedida de dirección se conservó", /dirección/.test(r.texto), r.texto);

  // 🔑 El candado general: ninguna corrección puede alterar los importes.
  const MENSAJES = [
    "Sale hoy mismo y el total es $82.000. Pásame la dirección.",
    "Se despacha hoy mismo con un total de $82.000 puesto en Cali.",
    "Ya actualicé tu pedido. Te llega a $82.000 contraentrega 📦",
    "Tu pedido ya salió, va en camino y el total era $148.000.",
    "Quedan pocas unidades. Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío.",
    "¡Así es! Estamos en Cali y el total es $82.000.",
    "Tranquilo que te cubre la maleta, y son $82.000 al recibir.",
    "Esa talla te queda perfecto. Total $148.000 por los dos.",
  ];
  for (const m of MENSAJES) {
    const c = promesas.corregir(m);
    chequear(
      `🔒 importes intactos: "${m.slice(0, 44)}…"`,
      JSON.stringify(promesas.importesDe(m)) === JSON.stringify(promesas.importesDe(c.texto)),
      `${JSON.stringify(promesas.importesDe(m))} → ${JSON.stringify(promesas.importesDe(c.texto))}\n     ${c.texto}`
    );
  }
}

console.log("\n── R9. 🔴 La confirmación posterior RECONCILIA las validaciones ──");
// Textual: "saveOrder() pierde nuevas alertas en la confirmación posterior […]
// listoParaDespachar() devuelve true". Era el peor de los tres: el mecanismo que
// existe para frenar un despacho lo estaba habilitando.
{
  const st = store;
  const base = (tel) => ({
    nombre: "Ana Gómez",
    celular: tel,
    ciudad: "Cali",
    direccion: "Cra 1 #2-3",
    talla: "L",
    color: "rojo",
    pago: "contraentrega",
    total: 82000,
    telefono_chat: "57" + tel,
  });
  const mios = (tel) => st.todosLosPedidos().filter((p) => p.telefono_chat === "57" + tel);

  // ── A. El caso reportado ────────────────────────────────────────────────
  {
    const t = "3009990001";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "no hubo un sí claro" });
    st.saveOrder({
      ...base(t),
      precio_no_cuadra: true,
      pendiente_revision: true,
      motivo_precio: "el pedido dice $82.000 y la cotización es $73.000",
      total_esperado: 73000,
    });
    const p = mios(t)[0];
    chequear("A· sigue habiendo un solo pedido", mios(t).length === 1, `hay ${mios(t).length}`);
    chequear("A· se levantó la marca de sin confirmar", !p.sin_confirmar);
    chequear("A· 🔑 pero las alertas nuevas NO se perdieron", p.precio_no_cuadra === true && p.pendiente_revision === true, JSON.stringify(p));
    chequear("A· 🔑 y listoParaDespachar da FALSE", st.listoParaDespachar(p) === false, "era el bloqueo reportado");
    chequear("A· con el total esperado guardado", Number(p.total_esperado) === 73000, `${p.total_esperado}`);
  }

  // ── B. Corrección de TALLA: NO se fusiona ───────────────────────────────
  // ⚠️ La 3ª revisión encontró que fusionar acá era el bloqueo: misma ciudad y
  // total con otra talla puede ser corrección O segunda compra, y al fusionar
  // quedaba UN registro listo para despachar. Una de las dos ventas desaparecía.
  {
    const t = "3009990002";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "x" });
    st.saveOrder({ ...base(t), talla: "2XL" });
    chequear("B· 🔑 se conservan los DOS registros", mios(t).length === 2, `hay ${mios(t).length}`);
    chequear(
      "B· 🔑 y NINGUNO queda listo para despachar",
      mios(t).every((p) => st.listoParaDespachar(p) === false),
      mios(t).map((p) => st.textoDeRevision(p)).join(" || ")
    );
    chequear(
      "B· el motivo dice que puede ser corrección o compra nueva",
      mios(t).some((p) => /corrección del pedido anterior o una compra nueva/.test(String(p.motivo_precio))),
      mios(t).map((p) => p.motivo_precio).join(" || ")
    );
    chequear(
      "B· y nombra la talla que difiere",
      mios(t).some((p) => /talla: "L" vs "2XL"/.test(String(p.motivo_precio))),
      mios(t).map((p) => p.motivo_precio).join(" || ")
    );
    chequear(
      "B· el pedido viejo CONSERVA su marca de sin confirmar",
      mios(t).some((p) => p.sin_confirmar === true),
      "si se le quita, queda medio confirmado sin que nadie lo haya decidido"
    );
    chequear(
      "B· y el nuevo apunta a cuál podría corregir",
      mios(t).some((p) => Boolean(p.posible_correccion_de)),
      JSON.stringify(mios(t).map((p) => p.posible_correccion_de))
    );
  }

  // ── C. Cambio de DESTINO: tampoco se fusiona ────────────────────────────
  // La ciudad define lo que se vende (cambia el flete), así que entra por la misma
  // regla: dos registros y ninguno despachable.
  {
    const t = "3009990003";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "x" });
    st.saveOrder({ ...base(t), ciudad: "Pasto", total: 85000 });
    chequear("C· se conservan los dos", mios(t).length === 2, `hay ${mios(t).length}`);
    chequear(
      "C· 🔑 ninguno queda despachable",
      mios(t).every((p) => st.listoParaDespachar(p) === false),
      mios(t).map((p) => st.textoDeRevision(p)).join(" || ")
    );
    chequear(
      "C· y el motivo nombra la ciudad y el total",
      mios(t).some((p) => /ciudad/.test(String(p.motivo_precio)) && /total/.test(String(p.motivo_precio))),
      mios(t).map((p) => p.motivo_precio).join(" || ")
    );
  }

  // ── C2. Ofertas DISTINTAS no se confunden ───────────────────────────────
  // 🏷️ El identificador de oferta: la confirmación de una cotización de 2 unidades
  // no puede reconciliarse contra un pendiente de 1 unidad.
  {
    const t = "3009990007";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "x", cotizacion_id: "P|CALI|1|82000" });
    st.saveOrder({ ...base(t), total: 148000, unidades: 2, cotizacion_id: "P|CALI|2|148000" });
    chequear("C2· 🏷️ dos ofertas distintas → dos registros", mios(t).length === 2, `hay ${mios(t).length}`);
    chequear(
      "C2· y el pendiente de 1 unidad sigue pendiente",
      mios(t).some((p) => p.sin_confirmar === true && Number(p.total) === 82000),
      JSON.stringify(mios(t).map((p) => ({ total: p.total, sin_confirmar: p.sin_confirmar })))
    );
  }

  // ── D. El pedido anterior YA estaba confirmado ──────────────────────────
  {
    const t = "3009990004";
    st.saveOrder({ ...base(t) });
    st.saveOrder({ ...base(t), color: "azul" });
    chequear("D· no se duplica", mios(t).length === 1, `hay ${mios(t).length}`);
    const p = mios(t)[0];
    chequear(
      "D· 🔑 el color viejo NO se sobrescribe solo",
      p.color === "rojo",
      "el pedido ya estaba confirmado y puede estar alistado: no se cambia sin que lo vea una persona"
    );
    chequear(
      "D· 🔑 pero la diferencia NO se pierde en silencio",
      Array.isArray(p.correcciones_sin_aplicar) && p.correcciones_sin_aplicar.length === 1,
      JSON.stringify(p.correcciones_sin_aplicar)
    );
    chequear("D· y queda bloqueado para que alguien decida", st.listoParaDespachar(p) === false, st.textoDeRevision(p));
  }

  // ── E. El pedido anterior ya tiene GUÍA ─────────────────────────────────
  {
    const t = "3009990005";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "x" });
    const prev = mios(t)[0];
    st.anotarGuiaEnPedido(prev.id, "240099998888");
    st.saveOrder({ ...base(t), color: "azul" });
    const todos = mios(t);
    const despachado = todos.find((p) => p.guia);
    const nuevo = todos.find((p) => !p.guia);
    chequear("E· 🔑 el pedido DESPACHADO no se modifica", despachado && despachado.color === "rojo", `quedó "${despachado && despachado.color}"`);
    chequear("E· el nuevo se guarda aparte", Boolean(nuevo), "no se puede perder la corrección");
    chequear("E· marcado para revisión", nuevo && st.listoParaDespachar(nuevo) === false, st.textoDeRevision(nuevo));
    chequear("E· y el motivo nombra la guía", /guía/.test(st.textoDeRevision(nuevo)), st.textoDeRevision(nuevo));
  }

  // ── F. Lo que NO puede pasar: que esto se coma una venta real ───────────
  {
    const t = "3009990006";
    st.saveOrder({ ...base(t), sin_confirmar: true, motivo_sin_confirmar: "x" });
    st.saveOrder({ ...base(t) });
    chequear("F· una confirmación limpia levanta la marca", !mios(t)[0].sin_confirmar);
    chequear("F· y queda despachable", st.listoParaDespachar(mios(t)[0]), st.textoDeRevision(mios(t)[0]));
    chequear("F· sin inventar correcciones", mios(t)[0].correcciones_aplicadas === undefined);
  }
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
