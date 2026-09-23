/**
 * EL EMBUDO: DÓNDE SE CAEN LOS CLIENTES.
 *
 * POR QUÉ EXISTE (22-sep): el dueño vio 97 conversaciones y 4 pedidos y no
 * había forma de saber qué pasó en el medio. Un 4% de cierre puede venir de
 * tres problemas distintos, y cada uno se arregla en otro lado:
 *   se van sin contestar  -> el ANUNCIO trae gente equivocada
 *   les cotizan y se van  -> el PRECIO
 *   dan datos y no cierran -> el CIERRE
 *
 * Las etapas se DEDUCEN de los mensajes guardados, así que los detectores son
 * lo frágil de todo esto: si el guion cambia de palabras, hay que ajustarlos.
 * Por eso se prueban contra transcripciones reales del bot en producción.
 *
 *   node test-embudo.js      (sin credenciales ni IA)
 */

const embudo = require("./src/embudo");

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
const u = (t) => ({ role: "user", content: t });
const b = (t) => ({ role: "assistant", content: t });

console.log("\n── 1. Cada etapa se reconoce ──");

chequear("escribió una vez y nada más → entró", embudo.etapaDe({ messages: [u("hola")] }) === "entro");
chequear(
  "contestó al bot → siguió la charla",
  embudo.etapaDe({ messages: [u("hola"), b("¿Qué talla usás?"), u("M")] }) === "volvio"
);
chequear(
  "el bot le dio un total → recibió precio",
  embudo.etapaDe({ messages: [u("cuánto a Cali"), b("Te llega a $82.000 al recibir 📦")] }) === "cotizado"
);
chequear(
  "el bot le pidió la dirección → llegó a los datos",
  embudo.etapaDe({ messages: [u("dale"), b("Perfecto, ¿cuál es tu dirección?")] }) === "datos"
);
chequear("una conversación vacía no cuenta", embudo.etapaDe({ messages: [] }) === "vacia");

console.log("\n── 2. 🔑 La transcripción REAL del pedido de Pedro (que sí cerró) ──");
// Sale del chat de producción del 22-sep, con los datos cambiados. Si el embudo
// no reconoce ESTA conversación como cerrada, no sirve para nada.
const pedro = {
  compro: true,
  messages: [
    u("Hola! Quiero mas informacion."),
    b("¡Hola! El conjunto impermeable de 4 piezas... ¿para qué ciudad sería el envío? 📦"),
    u("Oficina interrapidisimo"),
    b("¡Perfecto! Ya tenemos casi todo. Para confirmar, ¿en qué ciudad está esa oficina de Interrapidísimo?"),
    u("Manaure la guajira"),
    b("¡Listo! Para Manaure, Guajira, el envío entra en nuestra zona de pueblos. Confirmemos tu pedido ✅ Nombre: Pedro"),
    u("Talla s"),
    b("¡Perfecto, Pedro! Ya quedó ajustado. Confirmemos tu pedido ✅ Nombre: Pedro Epieyu Dirección: Oficina Interrapidisimo"),
    u("Confirmado"),
    b("¡Recibido, Pedro! Pedido confirmado ✅ Tu conjunto BikerPro va en camino."),
  ],
};
chequear("la conversación de Pedro cuenta como CERRADA", embudo.etapaDe(pedro, false) === "cerro");

console.log("\n── 3. No depende de una sola bandera ──");
// Si la marca `compro` fallara, el pedido igual existe. El embudo mira las dos
// fuentes: si dependiera solo de la marca, mostraría una fuga inventada y
// mandaría a arreglar lo que no está roto.
const sinMarca = { messages: [u("dale"), b("Confirmemos tu pedido ✅")] };
chequear(
  "sin la marca pero CON pedido guardado → cerró",
  embudo.etapaDe(sinMarca, true) === "cerro",
  "el embudo mostraría una fuga que no existe"
);
chequear("sin la marca y sin pedido → se queda en datos", embudo.etapaDe(sinMarca, false) === "datos");

const r = embudo.calcular(
  { "573001112233": sinMarca },
  [{ telefono_chat: "573001112233", nombre: "Ana", total: 83000 }]
);
chequear("calcular() también cruza contra la lista de pedidos", r.etapas[4].n === 1, `cerraron: ${r.etapas[4].n}`);

console.log("\n── 4. Las cuentas del embudo cierran ──");

const conv = {
  a: { messages: [u("hola")] },
  b: { messages: [u("hola")] },
  c: { messages: [u("hola"), b("¿talla?"), u("M")] },
  d: { messages: [u("a Cali?"), b("Son $82.000 al recibir")] },
  e: { messages: [u("dale"), b("¿tu dirección?")] },
  f: { compro: true, messages: [u("confirmo"), b("Pedido confirmado")] },
};
const e2 = embudo.calcular(conv, []);
chequear("el total son las 6 conversaciones", e2.total === 6, `dio ${e2.total}`);
chequear("las etapas van de mayor a menor", e2.etapas.every((x, i, a) => i === 0 || x.n <= a[i - 1].n));
chequear("cerró 1", e2.etapas[4].n === 1);
chequear("el cierre es 1 de 6", Math.abs(e2.cierre - 1 / 6) < 0.001, `dio ${e2.cierre}`);
chequear(
  "los perdidos de cada paso cuadran con la resta",
  e2.etapas.slice(1).every((x, i) => x.perdidos === e2.etapas[i].n - x.n)
);

console.log("\n── 5. La fuga se mide en CLIENTES, no en porcentaje ──");
// Perder el 80% de 5 personas importa menos que perder el 40% de 90. Si se
// eligiera por porcentaje, el panel señalaría el paso equivocado.
const muchos = {};
for (let i = 0; i < 90; i++) muchos["x" + i] = { messages: [u("hola")] };
for (let i = 0; i < 10; i++) muchos["y" + i] = { messages: [u("hola"), b("$82.000")] };
muchos.z = { compro: true, messages: [u("ok"), b("Pedido confirmado")] };

const e3 = embudo.calcular(muchos, []);
chequear(
  "la fuga apunta al paso donde se perdieron más personas",
  e3.fuga.clave === "volvio",
  `apuntó a "${e3.fuga.clave}" con ${e3.fuga.perdidos} perdidos`
);
chequear("y trae el diagnóstico de qué hacer", Boolean(e3.diagnostico) && e3.diagnostico.includes("anuncio"));

console.log("\n── 6. Nada de esto rompe el panel ──");
process.env.PANEL_TOKEN = "x";
process.env.DATA_DIR = "/tmp/prueba-embudo";
require("fs").rmSync("/tmp/prueba-embudo", { recursive: true, force: true });
const panel = require("./src/panel");
const html = panel.render();
chequear("el panel muestra el bloque del embudo o lo omite si no hay datos", typeof html === "string" && html.length > 500);
const script = html.match(/<script>([\s\S]*?)<\/script>/);
let compila = false;
try {
  new Function(script[1]);
  compila = true;
} catch (e) {
  compila = e.message;
}
chequear("el JavaScript del panel sigue compilando", compila === true, `error: ${compila}`);

// ══════════════════════════════════════════════════════════════════════════
console.log("\n── 🔴 EL PRECIO DEL PRODUCTO NO ES UNA COTIZACIÓN ──");
//
// El bug: la etapa "cotizado" se detectaba con /\$\s?\d{2,3}\.\d{3}/, y esa
// expresión engancha el $59.900 del producto — que el bot dice en su PRIMER
// mensaje, antes de saber la ciudad. Medido sobre el export de 6.317
// conversaciones: inflaba el escalón de 1.895 a 3.394 cotizados (54,2% → 97,1%)
// y escondía 1.600 personas que hablaron y nunca recibieron un total.

chequear(
  "decir el precio del producto NO es cotizar",
  embudo.dioTotal("Son $59.900 el conjunto, más el envío") === false
);
chequear(
  "el arranque completo del bot NO cuenta como cotización",
  embudo.etapaDe({
    messages: [u("¡Hola! Quiero más información."), b("Son $59.900 el conjunto, más el envío 📦 ¿Para qué ciudad sería?")],
  }) === "entro"
);
chequear("un total con envío SÍ es cotizar", embudo.dioTotal("Te llega a $82.000") === true);
chequear("el más barato que existe ($73.000) cuenta", embudo.dioTotal("Son $73.000 en total") === true);
chequear("el de 2 unidades cuenta", embudo.dioTotal("Los dos te salen en $137.000") === true);
chequear(
  "el precio de rescate más bajo ($70.000) cuenta",
  embudo.dioTotal("Te lo dejo en $70.000") === true
);
chequear(
  "un descuento de $3.000 NO se confunde con un total",
  embudo.dioTotal("Te ayudo con $3.000 si lo cerramos hoy") === false
);
chequear(
  "si el bot dice producto Y total, cuenta como cotizado",
  embudo.dioTotal("El conjunto son $59.900 y con envío a Cali queda en $82.000") === true
);
chequear("sin ningún monto no cotiza", embudo.dioTotal("¿Para qué ciudad sería?") === false);
chequear("aguanta texto vacío", embudo.dioTotal("") === false);
chequear("aguanta null", embudo.dioTotal(null) === false);
chequear(
  "lee los montos con coma igual que con punto",
  embudo.montosDe("$82,000 y $59,900").join(",") === "82000,59900"
);
chequear("el piso está en $70.000", embudo.PISO_TOTAL === 70000);
chequear(
  "🚨 el piso queda por ENCIMA del precio del producto",
  embudo.PISO_TOTAL > require("./src/fletes").PRECIO_PRODUCTO,
  `piso ${embudo.PISO_TOTAL} vs producto ${require("./src/fletes").PRECIO_PRODUCTO} — si el producto sube de $70.000 hay que mover el corte`
);
chequear(
  "🚨 y por DEBAJO del total más barato que existe",
  embudo.PISO_TOTAL <= 73000
);

// ══════════════════════════════════════════════════════════════════════════
console.log("\n── 🔑 LA FUGA SE ELIGE CONTRA LA REFERENCIA, NO POR EL BULTO ──");
//
// El criterio viejo era "el escalón donde se pierden más clientes". Ese criterio
// SIEMPRE señala el primer escalón, porque es el más ancho del embudo.
//
// Caso real, panel en vivo del 23-sep con 221 conversaciones:
//   221 → 119 → 89 → 27 → 9
// El panel marcaba "Siguieron la charla" (−102) y mandaba a revisar el anuncio y
// el primer mensaje, que es justo lo único que ya sabíamos que estaba SANO.
// El escalón roto era "Llegaron a los datos": 30,3% contra 49,1% del agente viejo.

const RECETAS = {
  entro: () => ({ messages: [u("hola")] }),
  volvio: () => ({ messages: [u("hola"), b("¿Qué talla usás?"), u("M")] }),
  cotizado: () => ({ messages: [u("Cali"), b("Te llega a $82.000 al recibir 📦")] }),
  datos: () => ({ messages: [u("dale"), b("Perfecto, ¿cuál es tu dirección?")] }),
  cerro: () => ({ messages: [u("sí confirmo"), b("Listo, se despacha 📦")], compro: true }),
};

function armar(cuentas) {
  const convs = {};
  let i = 0;
  for (const [etapa, n] of Object.entries(cuentas)) {
    for (let k = 0; k < n; k++) convs["57300" + String(i++).padStart(7, "0")] = RECETAS[etapa]();
  }
  return convs;
}

// Los números exactos del panel del 23-sep, desarmados en conteos por etapa.
const r23 = embudo.calcular(
  armar({ entro: 102, volvio: 30, cotizado: 62, datos: 18, cerro: 9 }),
  []
);
const etapa23 = (clave) => r23.etapas.find((e) => e.clave === clave);

chequear("reproduce los 221 que escribieron", etapa23("entro").n === 221);
chequear("reproduce los 119 que siguieron", etapa23("volvio").n === 119);
chequear("reproduce los 89 cotizados", etapa23("cotizado").n === 89);
chequear("reproduce los 27 que llegaron a datos", etapa23("datos").n === 27);
chequear("reproduce los 9 que cerraron", etapa23("cerro").n === 9);

chequear(
  "🔑 señala 'datos' como el escalón flojo, NO 'volvio'",
  r23.fuga && r23.fuga.clave === "datos",
  `señaló: ${r23.fuga ? r23.fuga.clave : "ninguno"}`
);
chequear(
  "y 'volvio' pierde MÁS gente en bruto (por eso el criterio viejo erraba)",
  etapa23("volvio").perdidos > etapa23("datos").perdidos,
  `volvio −${etapa23("volvio").perdidos} vs datos −${etapa23("datos").perdidos}`
);
chequear(
  "el diagnóstico de 'datos' aclara que NO es el precio",
  /no es el precio/i.test(r23.diagnostico)
);
chequear("dice que hay datos para comparar", r23.comparable === true);

console.log("\n── Cada escalón trae su referencia y su índice ──");
for (const clave of ["volvio", "cotizado", "datos", "cerro"]) {
  const e = etapa23(clave);
  chequear(
    `${clave}: referencia ${(e.referencia * 100).toFixed(1)}%, índice ${e.indice.toFixed(2)}`,
    e.referencia === embudo.REFERENCIA[clave] && typeof e.indice === "number"
  );
}
chequear(
  "'datos' tiene el índice más bajo de los cuatro",
  ["volvio", "cotizado", "cerro"].every((k) => etapa23("datos").indice < etapa23(k).indice)
);

console.log("\n── Si todo está a la altura, no se inventa un culpable ──");
const sano = embudo.calcular(
  armar({ entro: 20, volvio: 20, cotizado: 20, datos: 20, cerro: 40 }),
  []
);
chequear("no marca ninguna fuga", sano.fuga === null);
chequear(
  "y dice que el problema es de volumen, no de conversación",
  /más volumen o mejores anuncios/.test(sano.diagnostico)
);

console.log("\n── Con pocos datos avisa en vez de opinar ──");
const chico = embudo.calcular(armar({ entro: 3, volvio: 2, cotizado: 1 }), []);
chequear("dice que todavía no es comparable", chico.comparable === false);
chequear("aun así no explota", typeof chico.cierre === "number");
chequear("un embudo vacío no explota", embudo.calcular({}, []).total === 0);

console.log("\n── La referencia es la medida sobre las 6.317 del export ──");
chequear("volvio = 59,1%", embudo.REFERENCIA.volvio === 0.591);
chequear("cotizado = 67,9%", embudo.REFERENCIA.cotizado === 0.679);
chequear("datos = 49,1%", embudo.REFERENCIA.datos === 0.491);
chequear("cerro = 23,0%", embudo.REFERENCIA.cerro === 0.23);
chequear(
  "las cuatro son proporciones, no porcentajes",
  Object.values(embudo.REFERENCIA).every((v) => v > 0 && v < 1)
);

require("fs").rmSync("/tmp/prueba-embudo", { recursive: true, force: true });

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
