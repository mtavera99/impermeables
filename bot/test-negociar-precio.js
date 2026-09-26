/**
 * NEGOCIAR EL PRECIO: EN 1 UNIDAD CASI NO SE PUEDE, EN 2 SÍ.
 *
 * DE DÓNDE SALE (23-sep). El dueño lo planteó así, cargando guías a mano:
 *
 *   "yo negociaba mucho el precio... varios de esos pedidos los vendí en 135.000
 *    y creo que solo uno en 140.000 con envío... como yo era flexible con los
 *    precios creo que llegaba a vender un poquito más, no sé si sea intuición
 *    mía o si sea un hecho"
 *
 *   "muchas veces va a ser mejor hacer ese cierre de venta que no represente
 *    [todo el] dinero a que no haya un cierre de venta"
 *
 * Se midió sobre los 6.317 chats (analisis/negociar-el-precio-23sep.js) y tenía
 * razón, pero SOLO en los combos:
 *
 *   de los 22 combos cerrados a mano, 18 (81,8%) fueron bajo la lista, con
 *   rebaja mediana de $9.000, y el margen mediano siguió en $38.053.
 *   De los 113 pedidos leídos, NINGUNO quedó en pérdida.
 *
 * Y la razón que decide no depende de la elasticidad: 🔑 LA 2ª UNIDAD NO PAGA
 * PAUTA. El costo de traer al cliente se paga una vez por PEDIDO. Después de
 * publicidad, 1 unidad deja $3.303–$5.094 y un combo deja $16.168–$23.786.
 * (El piso $16.168 es banda D, que el dueño dejó en $140.000 el 24-sep para
 *  ganar volumen: sigue dejando $12.455 más que vender una sola unidad.)
 *
 * 🔴 LO QUE ESTA PRUEBA CUIDA: el guion decía "🚫 NUNCA [descuento] en pedidos de
 * 2 unidades" — exactamente al revés de lo que dicen los costos. Prohibía
 * descontar donde hay $27.403 de espacio y lo permitía donde hay $3.945.
 *
 *   node test-negociar-precio.js      (sin credenciales ni IA)
 */

const { buildSystemPrompt } = require("./src/prompt");
const f = require("./src/fletes");

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
const pesos = (n) => "$" + Math.round(n).toLocaleString("es-CO");

const guion = buildSystemPrompt();

const COSTO_UD = 33000;
const PAUTA = 20000; // pauta por pedido con cierre al 5%
const TOTAL_1 = { A: 73000, B: 78000, C: 82000, D: 83000, E: 85000 };
const BANDAS = ["A", "B", "C", "D", "E"];

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. 🔴 Ya NO dice 'nunca descuento en 2 unidades' ──");

chequear(
  "se fue la prohibición que estaba al revés",
  !/NUNCA en pedidos de 2 unidades/i.test(guion),
  "volvió la regla que prohibía descontar justo donde sí hay margen"
);
chequear(
  "el tope ahora depende de cuántas unidades sean",
  /tope DEPENDE de cu[áa]ntas unidades/i.test(guion)
);
chequear(
  "explica la razón: la 2ª unidad no paga publicidad",
  /la segunda unidad no paga publicidad/i.test(guion)
);

console.log("\n── 2. En 1 unidad el tope sigue siendo $3.000 ──");

chequear("el tope de 1 unidad es $3.000", /1 UNIDAD — m[áa]ximo \$3\.000/i.test(guion));
chequear(
  "y dice que no se sube por ninguna razón",
  /no se sube por ninguna raz[óo]n/i.test(guion)
);
chequear(
  "con el número que lo justifica: +26% de cierre para empatar",
  /\+26% de cierre/.test(guion)
);

console.log("\n── 3. En 2 unidades manda al precio de rescate ──");

chequear("manda a la tabla de rescate", /2 UNIDADES — us[áa] el precio de rescate/i.test(guion));

// ==========================================================================
// ⚠️ CAMBIÓ DE OBJETO EL 26-SEP. Antes se exigía que el bloque de precios de
// rescate estuviera EN EL GUION. Pero un precio de rescate escrito en el guion
// está disponible en TODOS los turnos — incluido el primero, donde ofrecerlo es
// regalar plata a quien iba a comprar igual.
//
// Ahora el monto lo entrega `cotizacion` SOLO cuando ya se cumplió la condición,
// y el validador de respuestas bloquea el número si aparece antes.
// ==========================================================================
const cotMod = require("./src/cotizacion");
const cotCali = cotMod.calcular("Cali", "dos conjuntos");
chequear(
  "🔑 el precio de rescate NO se le entrega al modelo si el cliente no objetó",
  !cotMod.bloqueDeDatos(cotCali, { objecionDePrecio: false }).includes(
    require("./src/fletes").fmt(cotCali.rescate)
  ),
  "estar en el guion lo hacía ofrecible de entrada"
);
chequear(
  "y SÍ cuando ya se quejó del precio",
  cotMod.bloqueDeDatos(cotCali, { objecionDePrecio: true }).includes(
    require("./src/fletes").fmt(cotCali.rescate)
  )
);
chequear(
  "el monto es el aprobado de su banda, no uno nuevo",
  cotCali.rescate === require("./src/fletes").PROMO_2_RESCATE[cotCali.banda]
);
chequear(
  "una sola oferta, sin encadenar rebajas",
  /UNA sola vez/.test(cotMod.bloqueDeDatos(cotCali, { objecionDePrecio: true }))
);
chequear(
  "y sigue condicionado a que el cliente ya objetó",
  /SOLO si el cliente YA objet[óo] el precio/i.test(guion)
);
chequear("sigue siendo una sola vez", /Una sola vez/i.test(guion));

console.log("\n── 4. 🥇 La jugada de subir de 1 a 2 está escrita ──");

chequear(
  "dice que en vez de bajarle el precio a una, ofrezca dos",
  /EN VEZ DE BAJARLE EL PRECIO A UNA\s*\n?\s*UNIDAD, OFRECELE DOS/i.test(guion.replace(/\s+/g, " ")) ||
    /EN VEZ DE BAJARLE EL PRECIO A UNA UNIDAD, OFRECELE DOS/i.test(guion.replace(/\s+/g, " "))
);
chequear(
  "trae la cuenta que lo respalda",
  /un combo al precio de rescate deja entre/i.test(guion)
);
chequear(
  "y recuerda el argumento del envío compartido",
  /un\s*\n?\s*solo env[íi]o/i.test(guion) || /pag[áa]s un solo env[íi]o/i.test(guion)
);

console.log("\n── 5. Los números del guion coinciden con los de fletes.js ──");

// Si alguien toca la tabla de precios y no el guion, esto lo caza.
const margenes1 = BANDAS.map((b) => TOTAL_1[b] - COSTO_UD - f.ENVIO_REAL_1[b] - PAUTA);
const margenes2 = BANDAS.map((b) => f.PROMO_2_TOTAL[b] - 2 * COSTO_UD - f.ENVIO_REAL_2[b] - PAUTA);
const min1 = Math.min(...margenes1);
const max1 = Math.max(...margenes1);
const min2 = Math.min(...margenes2);
const max2 = Math.max(...margenes2);

chequear(
  `el rango de 1 unidad del guion es el real (${pesos(min1)}–${pesos(max1)})`,
  guion.includes(pesos(min1)) && guion.includes(pesos(max1)),
  `el guion dice otra cosa; recalculado da ${pesos(min1)} a ${pesos(max1)}`
);
chequear(
  `el rango de 2 unidades del guion es el real (${pesos(min2)}–${pesos(max2)})`,
  guion.includes(pesos(min2)) && guion.includes(pesos(max2)),
  `el guion dice otra cosa; recalculado da ${pesos(min2)} a ${pesos(max2)}`
);
chequear(
  "🚨 y el combo deja más que una unidad en TODAS las bandas",
  min2 > max1,
  `el peor combo deja ${pesos(min2)} y la mejor unidad ${pesos(max1)}`
);

console.log("\n── 6. El candado de plata: ningún rescate baja del piso ──");

for (const b of BANDAS) {
  const r = f.PROMO_2_RESCATE[b];
  chequear(`banda ${b} tiene rescate definido`, r > 0);
  if (!r) continue;
  const queda = r - 2 * COSTO_UD - f.ENVIO_REAL_2[b] - PAUTA;
  chequear(
    `banda ${b}: al rescate quedan ${pesos(queda)} después de pauta`,
    queda > 0,
    "ese rescate destruye plata"
  );
  chequear(
    `banda ${b}: el rescate no pasa la lista`,
    r < f.PROMO_2_TOTAL[b],
    "un 'descuento' más caro que el precio normal"
  );
}

console.log("\n── 7. La excepción de banda D queda documentada ──");

// Banda D es la más delgada porque su lista bajó a $140.000. No se descuenta
// más: se sube el precio de lista. Eso tiene que estar escrito en el código.
// Se le quitan los "//" y se junta todo en una línea: si no, una frase partida
// en dos líneas de comentario no matchea y la prueba falla sin haber nada roto.
const fuente = require("fs")
  .readFileSync(`${__dirname}/src/fletes.js`, "utf8")
  .replace(/^\s*\/\/ ?/gm, "")
  .replace(/\s+/g, " ");
chequear(
  "el código explica por qué banda D se queda en $137.000",
  /BANDA D SE QUEDA EN \$137\.000 A PROP[ÓO]SITO/i.test(fuente)
);
chequear(
  "y dice que lo que hay que arreglar es el precio de lista",
  /el problema es el precio de LISTA, no la falta de descuento/i.test(fuente)
);
// 23-sep: con el combo a $110.000 + envío, banda D ya NO es la más delgada —
// era la única desalineada y este cambio la alinea. Ahora las cinco quedan
// parejas, que es justo lo que se quería.
{
  const q = (x) => f.PROMO_2_RESCATE[x] - 2 * COSTO_UD - f.ENVIO_REAL_2[x] - PAUTA;
  const valores = BANDAS.map(q);
  const spread = Math.max(...valores) - Math.min(...valores);
  chequear(
    `las 5 bandas quedan parejas al rescate (se diferencian ${pesos(spread)})`,
    spread < 2000,
    `valores: ${BANDAS.map((b) => b + " " + pesos(q(b))).join(", ")}`
  );
}

console.log("\n── 8. Queda avisado que el piso se mueve con el cierre ──");

chequear(
  "el código avisa que si el cierre baja, el piso sube",
  /ESTOS PISOS SE MUEVEN CON EL CIERRE/i.test(fuente)
);
chequear(
  "con el número: a 4,1% de cierre la pauta por pedido es $24.390",
  /\$24\.390/.test(fuente)
);
chequear(
  "y dice cuándo hay que revisar la tabla",
  /por debajo del 4%, revisar esta tabla/i.test(fuente)
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
