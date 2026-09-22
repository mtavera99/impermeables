/**
 * UN PEDIDO NO PUEDE PERDERSE EN SILENCIO.
 *
 * DE DÓNDE SALE ESTA PRUEBA (22-sep): el dueño reportó que no entraban ventas.
 * 93 conversaciones ese día y el último pedido guardado era de las 9:38 am. La
 * IA funcionaba (se probó contra Gemini) y el bot contestaba bien.
 *
 * El agujero estaba en cómo se leía el bloque ##ORDER## que la IA pone al final
 * de su respuesta:
 *
 *   1. la respuesta tiene un tope de tokens, y el JSON del pedido va AL FINAL
 *   2. si se cortaba, la expresión que busca {...} no encontraba nada
 *   3. el código borraba el bloque cortado para que el cliente no lo viera
 *   4. y el pedido no quedaba en ninguna parte
 *
 * El cliente recibía una respuesta perfecta, creía que su pedido estaba hecho,
 * y no existía. Sin un log, sin un aviso. Desde afuera era idéntico a "hoy no
 * compró nadie", que es exactamente lo que el dueño estaba viendo.
 *
 *   node test-pedido-no-se-pierde.js      (sin credenciales ni IA)
 */

process.env.DATA_DIR = "/tmp/prueba-pedido-perdido";
require("fs").rmSync("/tmp/prueba-pedido-perdido", { recursive: true, force: true });

const { extractOrder } = require("./src/agent");

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

// Silenciar los console.error que la función emite a propósito, pero
// guardándolos: parte de lo que se prueba es que AVISE.
const errores = [];
const errOriginal = console.error;
console.error = (...a) => errores.push(a.join(" "));

console.log("\n── 1. El caso normal sigue funcionando ──");

const completo = `Listo Juan, tu pedido quedó así 📦

##ORDER## {"nombre":"Juan Perez","celular":"3001234567","ciudad":"Monteria","direccion":"Calle 10 #5-30","color":"negro","talla":"L","pago":"contraentrega","total":83000}`;

const r1 = extractOrder(completo);
chequear("un bloque completo se lee bien", r1.order && r1.order.nombre === "Juan Perez");
chequear("el total se lee como número", r1.order.total === 83000);
chequear("no se marca como rescatado", r1.rescatado === false);
chequear(
  "el bloque NO le llega al cliente",
  !r1.clean.includes("##ORDER##") && !r1.clean.includes("3001234567"),
  `quedó: ${r1.clean}`
);
chequear("el mensaje visible se conserva", r1.clean.includes("tu pedido quedó así"));

console.log("\n── 2. 🔑 EL CASO QUE COSTABA VENTAS: el bloque llega CORTADO ──");

// Esto es exactamente lo que pasa al llegar al tope de tokens: el JSON se corta
// a media palabra y no tiene la llave final.
const cortado = `Listo Juan, tu pedido quedó confirmado 📦

##ORDER## {"nombre":"Maria Fernanda Lopez","celular":"3109876543","ciudad":"Dagua","direccion":"Cra 5 #12-40 Barrio Cent`;

const r2 = extractOrder(cortado);
chequear(
  "el pedido NO se pierde: se rescata del bloque cortado",
  r2.order !== null,
  "el pedido se perdió en silencio, que es justo el bug que se está arreglando"
);
chequear("rescata el nombre", r2.order && r2.order.nombre === "Maria Fernanda Lopez");
chequear("rescata el celular", r2.order && r2.order.celular === "3109876543");
chequear("rescata la ciudad", r2.order && r2.order.ciudad === "Dagua");
chequear("queda marcado como rescatado, para avisarle al dueño", r2.rescatado === true);
chequear(
  "AVISA en el log en vez de callarse",
  errores.some((e) => e.includes("PEDIDO RESCATADO")),
  "se recuperó el pedido pero nadie se enteró de que llegó cortado"
);
chequear(
  "el pedazo de JSON no le llega al cliente",
  !r2.clean.includes("##ORDER##") && !r2.clean.includes("3109876543"),
  `quedó: ${r2.clean}`
);
chequear("el cliente igual recibe su confirmación", r2.clean.includes("pedido quedó confirmado"));

console.log("\n── 3. Cortado tan temprano que no hay nada que rescatar ──");

errores.length = 0;
const basura = `Listo 📦

##ORDER## {"nom`;
const r3 = extractOrder(basura);
chequear(
  "no inventa un pedido con basura",
  r3.order === null,
  "armó un pedido falso, y un pedido falso en el panel es peor que ninguno"
);
chequear(
  "🔴 pero GRITA que se perdió un pedido",
  errores.some((e) => e.includes("PEDIDO PERDIDO")),
  "esto es lo que hacía que el problema fuera invisible por 6 horas"
);

console.log("\n── 4. Sin pedido no pasa nada raro ──");

errores.length = 0;
const sinPedido = "Hola! El conjunto son $83.000 a Monteria, todo incluido 📦 ¿Qué talla usas?";
const r4 = extractOrder(sinPedido);
chequear("una charla normal no genera pedido", r4.order === null);
chequear("ni se marca como rescatado", r4.rescatado === false);
chequear("no ensucia el log con falsas alarmas", errores.length === 0, `avisó: ${errores[0]}`);
chequear("el mensaje queda igual", r4.clean === sinPedido);

console.log("\n── 5. El tope de tokens subió, que es la causa de raíz ──");

const agente = require("fs").readFileSync(__dirname + "/src/agent.js", "utf8");
const gemini = agente.match(/maxOutputTokens:\s*(\d+)/);
const compat = agente.match(/max_tokens:\s*(\d+)/);
chequear(
  `Gemini permite ${gemini && gemini[1]} tokens de respuesta (antes 800)`,
  gemini && Number(gemini[1]) >= 1500,
  "con 800 el bloque del pedido se corta y se pierde la venta"
);
chequear(
  `el proveedor alterno permite ${compat && compat[1]}`,
  compat && Number(compat[1]) >= 1500,
  "cambiar de modelo volvería a traer el bug"
);

console.error = errOriginal;
require("fs").rmSync("/tmp/prueba-pedido-perdido", { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
