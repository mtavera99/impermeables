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
  "el total es $140.000 (bajado por decisión del dueño el 22-sep)",
  mont.total === 140000,
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

console.log("\n── 4. El margen de cada banda, contra su límite ──");

// Banda D está DEBAJO de la meta a propósito: el dueño la bajó a $140.000 el
// 22-sep para ganar volumen, con los números a la vista. Esta prueba no exige
// la meta ahí, pero sí exige el límite que de verdad importa (ver bloque 7):
// que vender DOS siga dejando más que vender UNA.
const BAJO_LA_META_A_PROPOSITO = { D: "bajada a $140.000 por decisión del dueño (22-sep)" };

for (const banda of ["A", "B", "C", "D", "E"]) {
  const q = f.cotizar(CIUDAD[banda], 2);
  const margen = (q.total - 2 * COSTO_PROD - f.ENVIO_REAL_2[banda]) / 2;
  if (BAJO_LA_META_A_PROPOSITO[banda]) {
    console.log(
      `ℹ️  banda ${banda}: margen ${pesos(Math.round(margen))}/ud, ` +
        `${pesos(Math.round(META - margen))} bajo la meta — ${BAJO_LA_META_A_PROPOSITO[banda]}`
    );
    continue;
  }
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

// ===========================================================================
// ===========================================================================
console.log("\n── 6-B. 🔴 EL GANCHO DE 2 UNIDADES (vale $44.007/día) ──");
// ===========================================================================
//
// El 22-sep este gancho se debilitó y el share de pedidos de 2 unidades pasó de
// 26,8% a 0% EN UN DÍA. La causa: se cambió "pagás UN solo envío, te ahorrás
// $13.000" por "se ahorra $5.800 en el producto" — un número 2,2× más chico y
// movido al lugar que el cliente no compara.
//
// El archivo madre ya tenía medido lo que vale: subió el share de 6,8% a 26,8%
// (3,9×) y aporta +$44.007/día, el 72% del valor del guion. Es la línea más
// valiosa de todo el prompt, así que se blinda.

const tabla2 = f.tablaFletesTexto();

chequear(
  "el ahorro se dice contra COMPRAR DOS SUELTOS",
  /Comprados por separado ser[íi]an/.test(tabla2),
  "volvió a la versión débil: el cliente no tiene con qué comparar"
);
chequear(
  "🔑 y la razón que se le da es el ENVÍO compartido",
  /UN SOLO ENV[ÍI]O/.test(tabla2),
  "sin el argumento del envío el ahorro parece un descuento cualquiera"
);
chequear(
  "el desglose sigue disponible, pero como secundario",
  /Si pide el desglose/.test(tabla2),
  "se perdió el desglose honesto que se arregló el 22-sep"
);
chequear(
  "⛔ ya NO usa el ahorro en el producto como titular",
  !/→ se ahorra .* en el producto/.test(tabla2),
  "ese es exactamente el texto que tiró el share a 0%"
);

// El número que se dice tiene que ser el REAL contra dos sueltos, en cada banda.
for (const banda of ["A", "B", "C", "D", "E"]) {
  const uno = f.cotizar(CIUDAD[banda], 1);
  const dos = f.cotizar(CIUDAD[banda], 2);
  const ahorro = 2 * uno.total - dos.total;
  chequear(
    `banda ${banda}: dice el ahorro real de ${pesos(ahorro)}`,
    tabla2.includes(`SE AHORRA ${f.fmt(ahorro)}`),
    `no encontré "SE AHORRA ${f.fmt(ahorro)}" en la tabla`
  );
}

// Y el guion tiene que prohibir explícitamente volver al texto viejo.
const guion = require("./src/prompt").buildSystemPrompt();
chequear(
  "el guion prohíbe decir el ahorro en el producto",
  /NO decir "te ahorras/.test(guion),
  "sin la prohibición explícita, el modelo puede volver al número chico"
);
chequear(
  "el guion NO promete una promo de $110.000 que ya no existe",
  !/2 conjuntos por \$110/.test(guion),
  "se contradice con el desglose, que dice $103.000-115.000 según la banda"
);
chequear(
  "el guion dice el share real de 2 unidades (26,8%)",
  /26,8%/.test(guion),
  "decía 8,3%, y eso le quita importancia al gancho más rentable que hay"
);

// ===========================================================================
console.log("\n── 7. 🔒 EL PISO: vender DOS nunca puede dejar menos que vender UNA ──");
// ===========================================================================
//
// Este es el límite de verdad, y reemplaza a la meta como guardián en las
// bandas con descuento. Si un precio de 2 unidades deja menos plata que vender
// una sola, el descuento dejó de ser una herramienta de venta y se volvió una
// pérdida — y eso no se nota mirando solo el margen por unidad.

for (const banda of ["A", "B", "C", "D", "E"]) {
  const uno = f.cotizar(CIUDAD[banda], 1);
  const dos = f.cotizar(CIUDAD[banda], 2);
  const quedaUno = uno.total - COSTO_PROD - f.ENVIO_REAL_1[banda];
  const quedaDos = dos.total - 2 * COSTO_PROD - f.ENVIO_REAL_2[banda];
  chequear(
    `banda ${banda}: 2 uds dejan ${pesos(quedaDos)} vs ${pesos(quedaUno)} de 1 ud`,
    quedaDos > quedaUno,
    `vender dos deja ${pesos(quedaUno - quedaDos)} MENOS que vender una: el precio está mal`
  );

  // Y lo mismo con el precio de rescate, que es el más bajo que se puede decir.
  if (dos.rescate) {
    const quedaRescate = dos.rescate - 2 * COSTO_PROD - f.ENVIO_REAL_2[banda];
    chequear(
      `banda ${banda}: al rescate (${pesos(dos.rescate)}) quedan ${pesos(quedaRescate)}, sigue sobre el piso`,
      quedaRescate > quedaUno,
      `el rescate deja ${pesos(quedaUno - quedaRescate)} menos que vender una sola unidad`
    );
  }
}

// ===========================================================================
console.log("\n── 8. El precio de rescate y su regla ──");
// ===========================================================================

chequear("Montería (banda D) tiene precio de rescate", mont.rescate === 137000, `es ${mont.rescate}`);
chequear("el rescate es MENOR que la lista", mont.rescate < mont.total);
chequear(
  "una banda sin rescate definido devuelve null",
  f.cotizar(CIUDAD.A, 2).rescate === null,
  "apareció un rescate donde no se decidió ninguno"
);
chequear(
  "el rescate NO aplica a pedidos de 1 unidad",
  f.cotizar(CIUDAD.D, 1).rescate == null,
  "se ofrecería descuento en 1 unidad, que no se decidió"
);

const d137 = f.desgloseDe("D", 2, 137000);
chequear(
  `al rescate el desglose sigue cerrando: ${pesos(d137.producto)} + ${pesos(d137.envio)} = ${pesos(137000)}`,
  d137.producto + d137.envio === 137000
);
chequear(
  "al rescate el envío mostrado sigue sin inflarse",
  d137.envio <= f.ENVIO_REAL_2.D,
  `muestra ${pesos(d137.envio)} contra un real de ${pesos(f.ENVIO_REAL_2.D)}`
);

// 🔑 Lo más importante: que la IA reciba el número CON su condición. Si el
// prompt trae el precio suelto, la IA lo usa de entrada y se vuelve la lista.
const t = f.tablaFletesTexto();
chequear("el prompt trae el bloque del precio de rescate", t.includes("PRECIO DE RESCATE"));
chequear("y dice que es SOLO si ya dijo que está caro", t.includes("SOLO si ya dijo que está caro"));
chequear("y prohíbe ofrecerlo de entrada", t.includes("NUNCA ofrezcas este precio de entrada"));
chequear("y aclara que no se negocia un tercer precio", t.includes("No hay un tercer precio"));

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
