/**
 * NINGÚN PEDIDO SE DESPACHA POR DEBAJO DEL PISO DE SU CIUDAD.
 *
 * DE DÓNDE SALE ESTA PRUEBA (24-sep): el cierre del día trajo dos pedidos a
 * **La Vega** por **$73.000** cada uno. La Vega no está en el tarifario, así que
 * su piso de seguridad es la banda E: **$85.000**. El bot le puso el precio de
 * Bogotá — probablemente porque el nombre le sonó a sabana.
 *
 * 🔑 LO QUE LO VUELVE UN BUG Y NO UN DESCUIDO: ese MISMO día entraron Sahagún,
 * Caloto y Dagua, las tres igual de desconocidas para el tarifario, y las tres
 * cobraron los $85.000 correctos. El piso del guion funciona… casi siempre.
 * Y "casi siempre" sobre el precio es una fuga que no se ve en ningún tablero.
 *
 *   > una instrucción al modelo NO es un candado.
 *   > lo que toca plata va en código, con una prueba.
 *
 * Ya había cobrado antes con otra cara: en El Charco se cobró $59.900 contra un
 * envío real de $55.563 y una sola guía se comió $28.663.
 *
 * ⛔ LO QUE ESTA PRUEBA EXIGE QUE **NO** PASE: que el chequeo tire una venta.
 * El pedido se guarda SIEMPRE y se marca. El cliente ya tiene un precio
 * prometido; corregirlo es decisión del dueño, no del bot.
 *
 *   node test-piso-de-precio.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-piso-precio";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const f = require("./src/fletes");
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

const pedido = (ciudad, total) => f.revisarTotal({ ciudad, total });

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. EL CASO REAL DEL 24-SEP: La Vega a $73.000 ──");

const laVega = pedido("La Vega", 73000);
chequear("La Vega por $73.000 se marca", laVega.ok === false, JSON.stringify(laVega));
chequear(
  "y cae en banda E, que es el piso de las ciudades que no están en el tarifario",
  laVega.banda === "E" && laVega.reconocida === false
);
chequear(
  "dice que faltan $9.000 (piso $82.000 = $85.000 − el tope de descuento)",
  laVega.faltante === 9000 && laVega.piso === 82000,
  `faltante=${laVega.faltante} piso=${laVega.piso}`
);
chequear(
  "y deduce que era una sola unidad",
  laVega.unidadesProbables === 1,
  `dedujo ${laVega.unidadesProbables}`
);
chequear(
  "calcula el margen que quedó, para que se vea la plata",
  laVega.margen === 73000 - 33000 - f.ENVIO_REAL_1.E,
  `margen=${laVega.margen}`
);
chequear("y explica el problema en español, sin jerga", /faltan/.test(laVega.detalle || ""));

// 🔑 El contraste que delató el bug: las otras tres ciudades desconocidas del
// mismo día sí cobraron bien, y NO se pueden marcar (serían falsas alarmas).
console.log("\n── 2. Y las otras tres desconocidas del mismo día NO se marcan ──");
for (const ciudad of ["Sahagún", "Caloto", "Dagua"]) {
  const r = pedido(ciudad, 85000);
  chequear(
    `${ciudad} por $85.000 pasa limpio (así entró de verdad el 24-sep)`,
    r.ok === true,
    JSON.stringify(r)
  );
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. El descuento de cierre sigue permitido ──");

chequear("Bogotá a $73.000 (lista) pasa", pedido("Bogota", 73000).ok === true);
chequear("Bogotá a $70.000 (tope de descuento, $3.000) pasa", pedido("Bogota", 70000).ok === true);
chequear("Bogotá a $69.000 (un peso más de descuento) se marca", pedido("Bogota", 69000).ok === false);
chequear(
  "y el faltante es exacto: $1.000",
  pedido("Bogota", 69000).faltante === 1000,
  `faltante=${pedido("Bogota", 69000).faltante}`
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. El combo: el piso es el precio de rescate, no la lista ──");

// Riohacha es banda D, la única banda que no da $110.000 (decisión del dueño).
chequear("Riohacha a $140.000 (el combo de banda D) pasa", pedido("Riohacha", 140000).ok === true);
chequear("Riohacha a $137.000 (el rescate) pasa", pedido("Riohacha", 137000).ok === true);
chequear("Riohacha a $136.000 se marca", pedido("Riohacha", 136000).ok === false);
chequear(
  "y entiende que eran 2 unidades, no una",
  pedido("Riohacha", 136000).unidadesProbables === 2
);

for (const b of ["A", "B", "C", "D", "E"]) {
  chequear(
    `banda ${b}: el piso del combo es su rescate (${f.fmt(f.PROMO_2_RESCATE[b])})`,
    f.pisoDe(b, 2) === f.PROMO_2_RESCATE[b]
  );
  chequear(
    `banda ${b}: el piso de 1 unidad es su total menos $3.000`,
    f.pisoDe(b, 1) === f.BANDAS[b].total - 3000
  );
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Difícil acceso: el caso que ya costó $28.663 ──");

// Este es EL bug de El Charco, reproducido: se cobró $59.900 contra un envío
// real de $55.563. El Charco sí tiene tarifa medida ($115.500), así que el
// candado puede decir exactamente cuánto faltó.
const charco = pedido("El Charco", 59900);
chequear("El Charco a $59.900 se marca", charco.ok === false);
chequear("el motivo es que quedó bajo su tarifa medida", charco.motivo === "bajo_dificil_acceso", charco.motivo);
chequear(
  "y dice el número exacto: faltaban $55.600",
  charco.faltante === 55600,
  `faltante=${charco.faltante}`
);
chequear("El Charco a su total confirmado ($115.500) pasa", pedido("El Charco", 115500).ok === true);

// Y donde NO hay tarifa medida, cualquier total es sospechoso: no hay con qué
// comparar, así que se escala en vez de adivinar.
const istmina = pedido("Istmina", 85000);
chequear("Istmina (sin tarifa medida) se marca a cualquier precio", istmina.ok === false);
chequear("y el motivo lo dice", istmina.motivo === "dificil_sin_tarifa", istmina.motivo);
chequear("y el detalle nombra los $28.663 que costó no hacer esto", /28\.663/.test(istmina.detalle || ""));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Cobrar el producto sin envío: bodega o error, pero se revisa ──");

const soloProducto = pedido("Bogota", 59900);
chequear("$59.900 en Bogotá se marca", soloProducto.ok === false);
chequear("y se reconoce que puede ser retiro en bodega", soloProducto.pareceBodega === true);
chequear("el motivo lo dice", soloProducto.motivo === "sin_envio", soloProducto.motivo);
chequear(
  "y el texto aclara que está bien SOLO si recoge",
  /recoge en la bodega/.test(soloProducto.detalle || "")
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Los nombres repetidos no se cotizan, se preguntan ──");

const mosquera = pedido("Mosquera", 73000);
chequear("Mosquera se marca aunque el total parezca sano", mosquera.ok === false);
chequear("porque existe en varios departamentos", mosquera.motivo === "ciudad_ambigua", mosquera.motivo);
chequear("y dice cuáles son", Array.isArray(mosquera.preguntarDepartamento));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 8. Sin falsas alarmas: lo que el tarifario cotiza, pasa ──");

// 🔑 Este bloque es el que protege al dueño de que le marquemos todo en rojo.
// Si la cotización oficial del bot no aguanta su propio piso, el bug es nuestro.
const ciudades = ["Bogota", "Medellin", "Cali", "Cartagena", "Monteria", "Pereira", "Riohacha"];
let sanas = 0;
for (const c of ciudades) {
  for (const uds of [1, 2]) {
    const q = f.cotizar(c, uds);
    if (!q || q.total === null) continue;
    const r = pedido(c, q.total);
    if (r.ok === true) sanas++;
    else console.log(`     🔴 ${c} x${uds} = ${q.total} quedó marcado: ${r.detalle}`);
  }
}
chequear(
  `las ${ciudades.length * 2} cotizaciones oficiales pasan limpias`,
  sanas === ciudades.length * 2,
  `pasaron ${sanas}`
);

// Un pedido de 3 unidades cae muy por encima de la lista del combo: no se marca.
chequear("un pedido de 3 unidades no dispara falsa alarma", pedido("Bogota", 190000).ok === true);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 9. LO MÁS IMPORTANTE: el chequeo NUNCA tira una venta ──");

const guardado = store.saveOrder({
  nombre: "Patricia Cárdenas",
  celular: "3001112233",
  ciudad: "La Vega",
  direccion: "Cra 1 #2-3",
  talla: "XXXL",
  color: "Blanca",
  pago: "contraentrega",
  total: 73000,
  telefono_chat: "573001112233",
});

chequear("el pedido con precio bajo SE GUARDA", !!guardado && !!guardado.id);
chequear("queda marcado", guardado.precio_bajo_lista === true);
chequear("y trae el detalle para el panel", !!(guardado.precio_revision || {}).detalle);
chequear(
  "sigue estando en el archivo, no se descartó",
  store.todosLosPedidos().some((p) => p.id === guardado.id)
);

const bueno = store.saveOrder({
  nombre: "Néstor Rodelo",
  celular: "3004445566",
  ciudad: "Bogota",
  direccion: "Cll 5 #6-7",
  talla: "M",
  color: "Blanco",
  pago: "contraentrega",
  total: 73000,
  telefono_chat: "573004445566",
});
chequear("y un pedido con precio correcto NO queda marcado", !bueno.precio_bajo_lista);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 10. El dueño lo ve en el panel, sin entrar a los logs ──");

delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();

chequear("el panel muestra la etiqueta de precio bajo", html.includes("PRECIO BAJO"));
chequear("avisa cuántos son arriba, en la lista de trabajo", /con precio bajo el piso/.test(html));
chequear("y dice cuánta plata falta", /faltan/.test(html));
chequear(
  "el pedido bueno no aparece marcado",
  (html.match(/PRECIO BAJO/g) || []).length === 1,
  `apareció ${(html.match(/PRECIO BAJO/g) || []).length} veces`
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 11. El guion sigue bajo el techo de tokens ──");

const guion = require("./src/prompt").buildSystemPrompt();
const tokens = Math.round(guion.length / 4);
chequear(
  `el guion sigue bajo 9.000 tokens (va en ${tokens.toLocaleString("es-CO")})`,
  tokens <= 9000,
  "cada 1.000 tokens cuestan ~$3.720 COP/día: antes de agregar texto hay que sacar otro"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
