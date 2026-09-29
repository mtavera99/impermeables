/**
 * EL NÚMERO AL QUE LE LLEGAN LOS AVISOS AL DUEÑO.
 *
 * 🔴 POR QUÉ EXISTE: el 30-sep el dueño movió sus avisos a otro celular y lo
 * escribió como lo escribiría cualquiera, sin el 57 adelante. Hasta ese momento
 * `sendText(OWNER, ...)` le pasaba a Meta el valor TAL CUAL, sin normalizarlo.
 * Meta no entrega un número sin indicativo.
 *
 * Consecuencia si no se arreglaba: TODOS sus avisos —los pedidos que necesitan
 * revisión, los clientes que piden hablar con un asesor— dejaban de llegarle. Y
 * en silencio: el bot sigue atendiendo, los pedidos se siguen guardando, no hay
 * nada en pantalla que se vea distinto. La misma forma del fallo que ya costó
 * tres días con el botón de novedades.
 *
 * ⚠️ Los números de acá son INVENTADOS. Este repo es público y el celular del
 * dueño no se escribe en ningún archivo: vive solo en las variables de Render.
 *
 * Lo que se prueba acá:
 *   1. las formas en que un humano escribe su propio celular funcionan todas
 *   2. ⛔ y a lo que NO se reconoce no se le inventa un indicativo, porque eso
 *      mandaría los datos de un cliente al teléfono de un tercero
 *
 *   node test-numero-del-dueno.js      (sin credenciales ni IA)
 */

const { numeroDelDueno } = require("./src/numero-del-dueno");

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

/** Corre la función guardándose la advertencia en vez de imprimirla. */
function normalizar(valor) {
  const avisos = [];
  const salida = numeroDelDueno(valor, (m) => avisos.push(m));
  return { salida, avisos };
}

// ===========================================================================
console.log("\n── 1. Las formas en que un humano escribe su propio celular ──");
// El número se escribe UNA vez, en Render, desde el celular. Nadie recuerda si
// va con 57, con +57 o con espacios.
// ===========================================================================

const ESPERADO = "573001112233";

// 🔑 ESTE ES EL CASO QUE ROMPÍA: diez dígitos, sin indicativo. Es como lo
// escribió el dueño y como lo escribiría cualquiera.
chequear(
  "🔑 diez dígitos sin el 57 (el caso que rompía) -> se le pone el 57",
  normalizar("3001112233").salida === ESPERADO,
  normalizar("3001112233").salida
);

for (const escrito of [
  "573001112233",
  "+573001112233",
  "+57 300 111 2233",
  "57 300 111 2233",
  "300 111 2233",
  "300-111-2233",
  "(300) 111 2233",
  "  3001112233  ",
]) {
  const { salida } = normalizar(escrito);
  chequear(`"${escrito}" -> ${ESPERADO}`, salida === ESPERADO, `dio ${salida}`);
}

// Cualquier celular colombiano, no solo el de la prueba: si el dueño vuelve a
// cambiar de número no puede encontrarse con otro problema.
chequear(
  "cualquier celular colombiano con el 57 queda igual",
  normalizar("573109998877").salida === "573109998877",
  normalizar("573109998877").salida
);
chequear(
  "  y el mismo sin el 57 llega al mismo lugar",
  normalizar("3109998877").salida === "573109998877",
  normalizar("3109998877").salida
);

// ===========================================================================
console.log("\n── 2. Nada configurado: no se manda a ningún lado ──");
// `if (!OWNER) return;` es lo que hace que el bot no intente avisar. Si esto
// devolviera algo con contenido, se llamaría a Meta con basura.
// ===========================================================================

for (const vacio of ["", "   ", null, undefined]) {
  const { salida } = normalizar(vacio);
  chequear(
    `${JSON.stringify(vacio)} -> "" (falsy, así el bot no intenta avisar)`,
    salida === "",
    JSON.stringify(salida)
  );
}

// ===========================================================================
console.log("\n── 3. ⛔ A lo que no se reconoce NO se le inventa indicativo ──");
// Esto es lo más importante de la batería. Ponerle 57 a un número que no es
// colombiano lo convierte en OTRO número que sí existe, y ahí se le mandarían
// los datos de un cliente a un desconocido.
// ===========================================================================

{
  // 🌎 El caso real del 29-sep: en los datos había un número que empezaba por
  // 55 (Brasil) y Meta lo rechazó con el error 130497.
  const { salida, avisos } = normalizar("5511999998888");
  chequear(
    "⛔ un número de otro país NO recibe un 57 adelante",
    salida === "5511999998888" && !salida.startsWith("57"),
    `dio ${salida}`
  );
  chequear("  y avisa que no lo reconoce", avisos.length === 1, JSON.stringify(avisos));
}

{
  // Un dígito de más: el error de tipeo más común desde el celular.
  const { salida, avisos } = normalizar("30011122334");
  chequear(
    "⛔ con un dígito de más no se inventa nada",
    salida === "30011122334" && salida !== ESPERADO,
    `dio ${salida}`
  );
  chequear("  y avisa", avisos.length === 1, JSON.stringify(avisos));
}

{
  // Un fijo de Bogotá no empieza por 3 y no es un celular.
  const { salida, avisos } = normalizar("6015551234");
  chequear("⛔ un fijo no se toma por celular", salida === "6015551234", `dio ${salida}`);
  chequear("  y avisa", avisos.length === 1, JSON.stringify(avisos));
}

{
  // Lo que sí se reconoce NO tiene que avisar: una advertencia que salta siempre
  // se vuelve ruido y deja de leerse.
  chequear(
    "🔑 lo que sí se reconoce no larga advertencias",
    normalizar("3001112233").avisos.length === 0 && normalizar("573001112233").avisos.length === 0
  );
}

{
  // Un BSUID es el id de un cliente sin teléfono visible. Limpiarlo daría un
  // número inventado: el mismo criterio que idDestino en server.js.
  const { salida } = normalizar("CO.1098944123092301");
  chequear(
    "⛔ un BSUID se deja tal cual, no se convierte en teléfono",
    salida === "CO.1098944123092301",
    salida
  );
}

// ===========================================================================
console.log("\n── 4. La advertencia dice qué revisar ──");
// Un aviso que no dice qué hacer no sirve de nada.
// ===========================================================================

{
  const { avisos } = normalizar("5511999998888");
  const texto = avisos[0] || "";
  chequear("nombra la variable que hay que corregir", /OWNER_WHATSAPP/.test(texto), texto);
  chequear("muestra el valor que se leyó", /5511999998888/.test(texto), texto);
  chequear("y dice que los avisos pueden no llegar", /avisos no te llegan/i.test(texto), texto);
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
