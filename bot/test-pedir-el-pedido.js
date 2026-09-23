/**
 * DESPUÉS DEL TOTAL, SE PIDE EL PEDIDO.
 *
 * DE DÓNDE SALE (23-sep): midiendo el bot y el agente viejo con el MISMO embudo,
 * el único escalón roto es "recibieron precio → llegaron a los datos":
 *
 *     bot 30,3%   ·   agente viejo 49,2%   ·   índice 0,62
 *
 * Y sobre 1.815 cotizaciones reales del export, con qué cerraba el agente el
 * mensaje del total y cuántos avanzaron:
 *
 *     pidió los DATOS ............  473 veces   50,7%  ← el mejor
 *     ofreció 2 conjuntos .........  148 veces   45,3%
 *     pidió confirmar .............  154 veces   40,9%
 *     preguntó algo abierto .......   87 veces   25,3%
 *     preguntó TALLA o COLOR ...... 1192 veces   24,8%  ← el peor, y el más usado
 *
 * O sea: lo que más se hacía era lo que peor funcionaba, y pedir los datos
 * funcionaba el doble.
 *
 * 🔴 POR QUÉ ESTA PRUEBA EXISTE: el gancho de 2 unidades ya se apagó solo una
 * vez —lo debilité el 22-sep y el share cayó de 26,8% a 0% en un día— y nadie
 * se dio cuenta hasta que se midió la plata. Una instrucción en el guion no se
 * defiende sola. Esta batería es el candado.
 *
 *   node test-pedir-el-pedido.js      (sin credenciales ni IA)
 */

const { buildSystemPrompt } = require("./src/prompt");

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

const guion = buildSystemPrompt();

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. La regla está en el guion ──");

chequear("existe la sección del escalón que más se cae", /DESPU[ÉE]S DEL TOTAL, PED[ÍI] EL PEDIDO/.test(guion));
chequear(
  "dice que el mensaje del total termina pidiendo los datos",
  /mensaje donde das el total TERMINA PIDIENDO LOS DATOS/i.test(guion)
);
chequear(
  "nombra los tres datos del despacho",
  /nombre completo/i.test(guion) && /direcci[óo]n con barrio/i.test(guion) && /celular/i.test(guion)
);
chequear(
  "los pide TODOS JUNTOS en un solo mensaje",
  /Todo junto, en una sola pedida/i.test(guion)
);

console.log("\n── 2. Prohíbe lo que se midió que no funciona ──");

chequear(
  "prohíbe cerrar el total con una pregunta abierta",
  /NUNCA cierres el mensaje del total con una pregunta abierta/i.test(guion)
);
chequear(
  "nombra las preguntas abiertas concretas que hay que evitar",
  /¿Qu[ée] te parece\?/.test(guion) && /¿Te sirve\?/.test(guion)
);
chequear(
  "avisa que preguntar la talla después del total es retroceder",
  /volver a preguntarlo es retroceder/i.test(guion)
);

console.log("\n── 3. Pero no rompe lo que sí hace falta ──");

chequear(
  "si falta talla o color, se piden EN EL MISMO mensaje, no en vez de los datos",
  /pedilos EN ESE MISMO MENSAJE, junto con los datos/i.test(guion)
);
chequear(
  "y lo dice explícito: NO en vez de los datos",
  /NO en vez de los datos/i.test(guion)
);

console.log("\n── 4. No contradice el resto del guion ──");

chequear(
  "el gancho de 2 unidades sigue vivo (ya se apagó una vez)",
  /2 CONJUNTOS/.test(guion) && /SE OFRECE SIEMPRE/.test(guion)
);
chequear(
  "sigue prohibido decir el ahorro 'en el producto'",
  /NO decir "te ahorras X en el producto"/i.test(guion)
);
chequear(
  "la regla de nunca cotizar sin ciudad sigue en pie",
  /Nunca digas un precio de env[íi]o sin saber la ciudad/i.test(guion)
);
chequear(
  "el total se da en firme, con la ciudad ya sabida",
  /D[áa] el total en firme, con la ciudad ya sabida/i.test(guion)
);
chequear(
  "el arranque fijo sigue anunciado (para que la IA no lo repita)",
  /primer-mensaje\.js/.test(guion)
);

console.log("\n── 5. Manda a NO adelantarse con el descuento ──");

chequear(
  "dice que no se adelante a la escalera de precio",
  /No te adelantes/i.test(guion)
);
chequear(
  "con el dato que lo justifica: solo 14 de 1.574 hablaron de precio",
  /solo 14 mencionaron el precio/i.test(guion)
);
chequear(
  "el tope del descuento sigue en $3.000",
  /M[áa]ximo \$3\.000/.test(guion)
);

console.log("\n── 6. Los números medidos quedan escritos, no de memoria ──");

for (const n of ["30,3%", "49,2%", "50,7%", "24,8%", "1.815", "1.192"]) {
  chequear(`el guion cita ${n}`, guion.includes(n));
}
chequear(
  "dice cuántos no volvieron a escribir nunca (688 de 1.255)",
  /688 de 1\.255/.test(guion)
);

console.log("\n── 7. El guion no se infló de más ──");

// Cada token del guion se paga en CADA mensaje de CADA conversación. A 4.020
// conversaciones/mes con ~10 mensajes cada una, 1.000 tokens extra se notan.
const tokens = Math.round(guion.length / 4);
chequear(`el guion cabe en 9.000 tokens (va en ~${tokens})`, tokens < 9000);
chequear("y no está vacío ni a medio armar", guion.length > 20000);
chequear(
  "no quedaron marcadores de plantilla sin reemplazar",
  !/\$\{/.test(guion),
  "quedó un ${...} sin interpolar"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
