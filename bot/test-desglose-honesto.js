/**
 * LO QUE SE LE DICE AL CLIENTE TIENE QUE CUADRAR, Y NO PUEDE INFLAR EL ENVÍO.
 *
 * DE DÓNDE SALE ESTA PRUEBA (22-sep): a un cliente de Montería el bot le dijo
 * "2 conjuntos $110.000 + envío $42.000 = $152.000". El cliente entró a la
 * plataforma de 99 Envíos, vio que ese envío cuesta ~$37.000, y se fue.
 *
 * 🔑 El envío es el ÚNICO número que el cliente puede verificar por fuera. El
 * precio de "dos conjuntos" no lo puede comparar con nada. Así que inflar el
 * flete es el peor lugar posible para poner el margen.
 *
 * Dos invariantes, y no son negociables:
 *   1. producto + envío === total. Exacto, en toda banda y toda cantidad.
 *   2. el envío que se MUESTRA nunca es mayor que el envío REAL medido.
 *
 * El total y el margen no los toca esta prueba: solo dónde se para el dinero.
 *
 *   node test-desglose-honesto.js      (sin credenciales ni IA)
 */

const f = require("./src/fletes");

const COSTO_PROD = 33000;
const META = 23244;

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
const pesos = (n) => "$" + Number(n).toLocaleString("es-CO");

// Una ciudad representativa por banda.
const CIUDAD = { A: "Bogota", B: "Tunja", C: "Medellin", D: "Monteria", E: "Turbo" };

console.log("\n── 1. El caso que se perdió: Montería, 2 unidades ──");

const mont = f.cotizar("Monteria", 2);
chequear("Montería sigue siendo banda D", mont.banda === "D");
chequear(
  "el total no cambió (el arreglo no toca el precio)",
  mont.total === 152000,
  `quedó en ${pesos(mont.total)}`
);
chequear(
  "el envío que se le muestra ya NO es $42.000",
  mont.flete !== 42000,
  "sigue mostrando el residual inflado"
);
chequear(
  "el envío que se muestra es $37.000, lo que el cliente vio en la plataforma",
  mont.flete === 37000,
  `muestra ${pesos(mont.flete)}`
);
chequear(
  "producto + envío da exactamente el total",
  mont.producto + mont.flete === mont.total,
  `${pesos(mont.producto)} + ${pesos(mont.flete)} = ${pesos(mont.producto + mont.flete)} ≠ ${pesos(mont.total)}`
);
console.log(
  `   → ahora dice: los 2 conjuntos ${pesos(mont.producto)} + envío ${pesos(mont.flete)} = ${pesos(mont.total)}`
);

console.log("\n── 2. La cuenta cierra en TODAS las bandas y cantidades ──");

for (const banda of ["A", "B", "C", "D", "E"]) {
  for (const uds of [1, 2]) {
    const q = f.cotizar(CIUDAD[banda], uds);
    chequear(
      `banda ${banda}, ${uds} ud${uds > 1 ? "s" : ""}: ${pesos(q.producto)} + ${pesos(q.flete)} = ${pesos(q.total)}`,
      q.producto + q.flete === q.total,
      `la suma da ${pesos(q.producto + q.flete)} y el total es ${pesos(q.total)}`
    );
  }
}

console.log("\n── 3. 🔑 El envío mostrado NUNCA por encima del real ──");

for (const banda of ["A", "B", "C", "D", "E"]) {
  for (const uds of [1, 2]) {
    const q = f.cotizar(CIUDAD[banda], uds);
    const real = uds === 1 ? f.ENVIO_REAL_1[banda] : f.ENVIO_REAL_2[banda];
    chequear(
      `banda ${banda}, ${uds} ud${uds > 1 ? "s" : ""}: muestra ${pesos(q.flete)} y el real es ${pesos(real)}`,
      q.flete <= real,
      `INFLA el envío en ${pesos(q.flete - real)} — es el número que el cliente puede auditar`
    );
  }
}

console.log("\n── 4. El margen quedó intacto (esto NO era un descuento) ──");

for (const banda of ["A", "B", "C", "D", "E"]) {
  const q = f.cotizar(CIUDAD[banda], 2);
  const margen = (q.total - 2 * COSTO_PROD - f.ENVIO_REAL_2[banda]) / 2;
  chequear(
    `banda ${banda}, 2 uds: margen ${pesos(Math.round(margen))}/ud (meta ${pesos(META)})`,
    margen >= META - 1,
    `quedó ${pesos(Math.round(META - margen))} bajo la meta`
  );
}

console.log("\n── 5. El argumento de venta sigue en pie ──");

for (const banda of ["A", "B", "C", "D", "E"]) {
  const uno = f.cotizar(CIUDAD[banda], 1);
  const dos = f.cotizar(CIUDAD[banda], 2);
  const ahorroTotal = 2 * uno.total - dos.total;
  const ahorroProducto = 2 * f.PRECIO_PRODUCTO - dos.producto;
  chequear(
    `banda ${banda}: llevando 2 se ahorra ${pesos(ahorroTotal)} en total y ${pesos(ahorroProducto)} en producto`,
    ahorroTotal > 0 && ahorroProducto > 0,
    "el ahorro dejó de ser positivo: el argumento de la promo se cae"
  );
}

console.log("\n── 6. Lo que lee la IA dice los mismos números ──");

const tabla = f.tablaFletesTexto();
chequear(
  "la tabla del prompt trae el desglose de 2 unidades",
  tabla.includes("los 2 conjuntos"),
  "la IA no tiene de dónde leer el desglose y lo va a improvisar"
);
chequear(
  "la tabla NO menciona un envío de $42.000 en ninguna parte",
  !tabla.includes("42.000"),
  "quedó el número inflado en el prompt"
);
chequear("la tabla trae el envío real de Montería ($37.000)", tabla.includes("37.000"));

// La IA lee ESTA tabla, no llama a cotizar(). Si los números de la tabla no
// cierran, el bot le dicta al cliente una cuenta que no suma, aunque el código
// esté bien. Ya pasó con MOSQUERA.
const lineas = tabla.match(/producto \$[\d.]+ \+ envío \$[\d.]+\)/g) || [];
chequear("hay una línea de desglose por cada banda de 1 unidad", lineas.length === 5, `hay ${lineas.length}`);
let cuadran = 0;
for (const l of lineas) {
  const n = l.match(/\$([\d.]+)/g).map((x) => Number(x.replace(/[$.]/g, "")));
  if (n[0] + n[1] > 0) cuadran++;
}
chequear("las 5 líneas tienen los dos números", cuadran === 5);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
