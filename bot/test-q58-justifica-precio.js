// ============================================================================
// 💬 EL PRIMER MENSAJE DEL Q58 TIENE QUE JUSTIFICAR LOS $30.000
//
// 🔴 DE DÓNDE SALE (16-oct, medido en los chats de la primera hora de pauta).
// De 60 conversaciones, 16 venían del anuncio del Q58. De las 8 que ya tenían
// más de 20 minutos, **7 se murieron en el primer turno**. Las del V10 en la
// misma ventana: 6 de 9 siguieron hablando. Pedidos del Q58: cero.
//
// El bot no falló —contestó en el mismo minuto en los 16 casos—. Falló lo que
// decía: el primer mensaje se compartía con el V10 cambiando solo el nombre y
// el precio, así que el cliente leía "$129.900" con la MISMA lista de
// beneficios del V10 de "$99.900". Nada justificaba la diferencia, y la
// pantalla, la radio FM, la luz LED y la memoria SD —que son justamente la
// razón, y ya estaban en la ficha— no aparecían.
//
// 🔑 LA PRUEBA QUE IMPORTA ES LA PRIMERA: el mensaje del V10 tiene que seguir
// siendo IDÉNTICO carácter por carácter. Es el mensaje de más tráfico de la
// operación y lleva semanas vendiendo. Si esta prueba falla, hay una regresión
// en el producto que sí funciona.
// ============================================================================
const assert = require("assert");
const { primerMensajeV10 } = require("./src/primer-mensaje");
const catalogo = require("./src/catalogo");

let ok = 0;
let fallos = 0;
function prueba(nombre, fn) {
  try {
    fn();
    ok += 1;
    console.log(`  ✅ ${nombre}`);
  } catch (e) {
    fallos += 1;
    console.error(`  ❌ ${nombre}\n     ${e.message}`);
  }
}

const v10 = catalogo.de("intercom_v10_2x");
const q58 = catalogo.de("intercom_q58_max");

console.log("\n💬 PRIMER MENSAJE: QUE EL Q58 EXPLIQUE POR QUÉ CUESTA MÁS\n");

// ----------------------------------------------------------------------------
console.log("1) 🔒 EL V10 NO SE TOCA (cero regresión en el que ya vende)");
// ----------------------------------------------------------------------------
const V10_ESPERADO = [
  "¡Hola! 👋 Claro que sí. Tenemos el combo de 2 intercomunicadores V10 2X por $99.900 🏍️",
  "Sirven para hablar de casco a casco con tu acompañante, y también los usás para música, las indicaciones del GPS y llamadas 🎧",
  "Ese precio es por los dos, y aparte el envío según tu ciudad. Pagás todo junto contraentrega cuando lo recibís 📦",
  "¿Para qué ciudad o municipio sería? Así te doy el total exacto.",
].join("\n\n");

prueba("el mensaje del V10 es idéntico carácter por carácter", () => {
  assert.strictEqual(primerMensajeV10(v10), V10_ESPERADO);
});

prueba("sin ficha (el comportamiento de siempre) también da el del V10", () => {
  assert.strictEqual(primerMensajeV10(), V10_ESPERADO);
});

prueba("el V10 sigue teniendo 4 párrafos, no 5", () => {
  assert.strictEqual(primerMensajeV10(v10).split("\n\n").length, 4);
});

prueba("la ficha del V10 NO declara la línea extra", () => {
  assert.ok(!v10.lineaQueJustificaElPrecio, "el V10 no debe tener este campo");
});

// ----------------------------------------------------------------------------
console.log("\n2) El Q58 sí dice qué tiene de más");
// ----------------------------------------------------------------------------
const msgQ58 = primerMensajeV10(q58);

prueba("nombra las cuatro funciones que el V10 no tiene", () => {
  const texto = msgQ58.toLowerCase();
  for (const f of ["pantalla", "radio fm", "luz led", "memoria"]) {
    assert.ok(texto.includes(f), `falta "${f}" en el primer mensaje del Q58`);
  }
});

prueba("son funciones que de verdad están en la ficha (no inventadas)", () => {
  const fns = q58.funciones.join(" ").toLowerCase();
  for (const f of ["pantalla", "radio fm", "luz led", "micro sd"]) {
    assert.ok(fns.includes(f), `la ficha del Q58 no declara "${f}"`);
  }
});

prueba("ninguna de esas cuatro está en la ficha del V10", () => {
  const fns = (v10.funciones || []).join(" ").toLowerCase();
  for (const f of ["pantalla", "radio fm", "luz led", "micro sd"]) {
    assert.ok(!fns.includes(f), `el V10 también tiene "${f}": ya no es un diferencial`);
  }
});

prueba("la línea extra va ANTES del precio del envío y de la pregunta", () => {
  const partes = msgQ58.split("\n\n");
  const iExtra = partes.findIndex((p) => p.includes("pantalla"));
  const iEnvio = partes.findIndex((p) => p.includes("aparte el envío"));
  const iPregunta = partes.findIndex((p) => p.includes("¿Para qué ciudad"));
  assert.ok(iExtra > 0, "la línea extra no aparece");
  assert.ok(iExtra < iEnvio, "la razón del precio tiene que leerse antes de hablar de plata");
  assert.ok(iEnvio < iPregunta, "la pregunta va al final");
});

// ----------------------------------------------------------------------------
console.log("\n3) Las reglas del primer mensaje se siguen cumpliendo");
// ----------------------------------------------------------------------------
prueba("termina con UNA sola pregunta", () => {
  const preguntas = (msgQ58.match(/\?/g) || []).length;
  assert.strictEqual(preguntas, 1, `tiene ${preguntas} signos de pregunta`);
  assert.ok(msgQ58.trimEnd().endsWith("te doy el total exacto."), "la pregunta no cierra el mensaje");
});

prueba("dice el precio del combo y que el envío va APARTE", () => {
  assert.ok(msgQ58.includes("$129.900"), "no dice el precio del combo");
  assert.ok(msgQ58.includes("aparte el envío"), "no aclara que el envío va aparte");
  // "más el envío" se entiende como incluido: es la corrección del 25-sep.
  assert.ok(!msgQ58.includes("más el envío"), 'volvió el "más el envío"');
});

prueba("no da ninguna cifra de envío (todavía no se sabe la ciudad)", () => {
  const cifras = msgQ58.match(/\$[\d.]+/g) || [];
  assert.deepStrictEqual(cifras, ["$129.900"], `aparecen cifras de más: ${cifras.join(", ")}`);
});

prueba("no promete 2x1 ni nada que no tengamos", () => {
  const t = msgQ58.toLowerCase();
  for (const prohibido of ["2x1", "2 x 1", "gratis", "regalo", "impermeable", "garantizado"]) {
    assert.ok(!t.includes(prohibido), `dice "${prohibido}"`);
  }
});

prueba("no mete ningún número de certificación (IPX6 / IP65 no están confirmados)", () => {
  const t = msgQ58.toLowerCase();
  assert.ok(!t.includes("ipx"), "dice IPX");
  assert.ok(!t.includes("ip6"), "dice IP6");
});

prueba("no nombra al V10 en el mensaje del Q58 (son productos distintos)", () => {
  assert.ok(!msgQ58.includes("V10"), "el mensaje del Q58 nombra al V10");
});

prueba("sigue siendo corto: una línea más, no un folleto", () => {
  const partes = msgQ58.split("\n\n");
  assert.strictEqual(partes.length, 5, `tiene ${partes.length} párrafos, esperábamos 5`);
  // El tope es RELATIVO al mensaje del V10 a propósito: lo que se quiere evitar
  // es que esta línea se vaya convirtiendo en la ficha técnica completa a punta
  // de agregados. Una línea de más está bien; el doble de largo, no.
  const extra = msgQ58.length - V10_ESPERADO.length;
  assert.ok(
    extra <= 130,
    `el mensaje del Q58 tiene ${extra} caracteres más que el del V10: ya es un folleto`
  );
});

// ----------------------------------------------------------------------------
console.log("\n4) El precio del mensaje sale de la ficha, no de un número pegado");
// ----------------------------------------------------------------------------
prueba("si cambia el precio del combo, cambia el mensaje", () => {
  const falso = { ...q58, precios: { 1: 79900, 2: 139900 } };
  assert.ok(primerMensajeV10(falso).includes("$139.900"));
});

prueba("si se le quita la línea extra, queda igual que el formato del V10", () => {
  const sinLinea = { ...q58, lineaQueJustificaElPrecio: null };
  const m = primerMensajeV10(sinLinea);
  assert.strictEqual(m.split("\n\n").length, 4);
  assert.ok(!m.includes("pantalla"));
});

console.log(`\n${"=".repeat(60)}`);
console.log(`${ok} pasaron · ${fallos} fallaron`);
console.log("=".repeat(60));
if (fallos) process.exit(1);
