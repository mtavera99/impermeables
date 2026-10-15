/**
 * LOS EJEMPLOS DEL GUION TIENEN QUE CUADRAR CON EL TARIFARIO.
 *
 * POR QUÉ EXISTE (9-oct). Revisando si convenía dar descuento por pago
 * anticipado, encontré que el guion tenía el ejemplo de Cali DOS VECES con el
 * precio viejo:
 *
 *     prompt.js:251  "el envío a Cali son $21.100 ... te llega a $81.000"
 *     prompt.js:612  'el TOTAL ... (ej. Cali → 81000)'
 *
 * Pero la banda C (capitales grandes) ya costaba **$82.000** con envío $22.100.
 * Los ejemplos quedaron viejos cuando se corrigió el tarifario.
 *
 * 🔴 POR QUÉ IMPORTA Y NO ES COSMÉTICO. El guion le dice a la IA "usá EXACTAMENTE
 * el número de la tabla, no calcules" — pero al lado le muestra un ejemplo con
 * OTRO número. Y la lección que ya está documentada en fletes.js es justo esa:
 * *"que el código resuelva bien no sirve si el prompt dice otra cosa"*. El
 * riesgo era cobrar $1.000 de menos en la banda de MÁS volumen (Medellín, Cali,
 * Barranquilla, Cartagena, Pereira, Ibagué…), y encima el segundo ejemplo está
 * en las instrucciones del BLOQUE DEL PEDIDO, que es el número con el que se
 * despacha el recaudo.
 *
 * Ahora los ejemplos se interpolan desde cotizar(), así que no pueden desfasarse.
 * Esta prueba lo verifica.
 *
 *   node test-ejemplos-del-guion-cuadran.js      (sin credenciales, sin red)
 */

const fs = require("fs");
const path = require("path");

const fletes = require("./src/fletes");
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

const guion = String(buildSystemPrompt());
const fmtCO = (n) => Number(n).toLocaleString("es-CO");

// ============================================================================
console.log("\n── 1. El ejemplo de Cali sale del tarifario ──");
// ============================================================================
const cali = fletes.cotizar("CALI", 1);
chequear("el tarifario da un total para Cali", Number.isFinite(cali.total) && cali.total > 0);
chequear(
  `el guion nombra el total real de Cali ($${fmtCO(cali.total)})`,
  guion.includes(`$${fmtCO(cali.total)}`),
  `el guion no menciona $${fmtCO(cali.total)}`
);
chequear(
  `el guion nombra el envío real de Cali ($${fmtCO(cali.flete)})`,
  guion.includes(`$${fmtCO(cali.flete)}`)
);
chequear(
  "el bloque del pedido usa el total real de Cali",
  guion.includes(`Cali → ${cali.total}`),
  "ahí se define el número con el que se despacha el recaudo"
);

console.log("\n   Y el precio viejo ya no aparece en ninguna parte:");
chequear(
  '🔑 el guion ya NO dice "$81.000"',
  !guion.includes("$81.000"),
  "era el total de Cali antes de corregir el tarifario"
);
chequear('el guion ya NO dice "Cali → 81000"', !guion.includes("Cali → 81000"));
chequear('el guion ya NO dice "$21.100" como envío de Cali', !guion.includes("$21.100"));

// ============================================================================
console.log("\n── 2. La suma del ejemplo cierra ──");
// La regla del desglose honesto: producto + envío = total, EXACTO.
// ============================================================================
chequear(
  `producto + envío = total (${fletes.PRECIO_PRODUCTO} + ${cali.flete} = ${cali.total})`,
  fletes.PRECIO_PRODUCTO + cali.flete === cali.total,
  `da ${fletes.PRECIO_PRODUCTO + cali.flete}, no ${cali.total}`
);
chequear(
  "el envío que se MUESTRA no supera el envío real medido",
  cali.flete <= cali.fleteReal,
  `mostrado ${cali.flete} vs real ${cali.fleteReal}`
);

// ============================================================================
console.log("\n── 3. Ningún total de banda quedó escrito a mano y viejo ──");
// Se revisa que no haya en el guion un total que NO exista en el tarifario.
// ============================================================================
const totalesReales = new Set();
for (const ciudad of ["BOGOTA", "TUNJA", "CALI", "PASTO", "QUIBDO"]) {
  const q = fletes.cotizar(ciudad, 1);
  if (q && q.total) totalesReales.add(q.total);
  const dos = fletes.cotizar(ciudad, 2);
  if (dos && dos.total) totalesReales.add(dos.total);
}
console.log(`   (totales válidos del tarifario: ${[...totalesReales].sort((a, b) => a - b).join(", ")})`);

// Los "al recibir" son los que el cliente paga: cada uno tiene que ser un total real.
const alRecibir = [...guion.matchAll(/\$(\d{2,3}\.\d{3}) al recibir/g)].map((m) =>
  Number(m[1].replace(/\./g, ""))
);
console.log(`   (montos "al recibir" en el guion: ${alRecibir.join(", ") || "ninguno"})`);
for (const monto of alRecibir) {
  chequear(
    `$${fmtCO(monto)} "al recibir" existe en el tarifario`,
    totalesReales.has(monto),
    `ese total no lo produce cotizar() para ninguna banda — probablemente quedó viejo`
  );
}

// ============================================================================
console.log("\n── 4. Ningún ENVÍO del guion quedó pegado a mano y viejo ──");
// El tercer caso que encontré: la escalera de objeción de precio decía "el
// envío a TU CIUDAD son $21.100" — un ejemplo genérico con el envío de Cali
// escrito a mano. O sea que invitaba a decirle ese número a un cliente de
// Bogotá, donde el envío es otro.
// ============================================================================
const enviosValidos = new Set();
for (const ciudad of ["BOGOTA", "TUNJA", "CALI", "PASTO", "QUIBDO"]) {
  const q = fletes.cotizar(ciudad, 1);
  if (q && q.flete) enviosValidos.add(q.flete);
}
const enviosEnGuion = [...guion.matchAll(/env[ií]o a (?:tu ciudad|[A-Z][\wáéíóúñ]*) son \$(\d{2}\.\d{3})/g)].map(
  (m) => ({ monto: Number(m[1].replace(/\./g, "")), frase: m[0] })
);
console.log(`   (envíos válidos: ${[...enviosValidos].sort((a, b) => a - b).join(", ")})`);
if (!enviosEnGuion.length) {
  chequear("no hay envíos escritos a mano en el guion", true);
} else {
  for (const e of enviosEnGuion) {
    chequear(
      `"${e.frase}" usa un envío real del tarifario`,
      enviosValidos.has(e.monto),
      `$${fmtCO(e.monto)} no lo produce cotizar() para ninguna banda`
    );
  }
}
chequear(
  '🔑 la escalera de objeción ya NO trae "$21.100" pegado a "tu ciudad"',
  !/tu ciudad son \$21\.100/.test(guion),
  "era el envío viejo de Cali en una frase que habla de cualquier ciudad"
);

// ============================================================================
console.log("\n── 5. Los ejemplos se interpolan, no se escriben ──");
// ============================================================================
const fuente = fs.readFileSync(path.join(__dirname, "src", "prompt.js"), "utf8");
chequear(
  "el ejemplo de Cali se interpola desde cotizar()",
  /cotizar\("CALI", 1\)/.test(fuente),
  "si vuelve a escribirse a mano, se desfasa en el próximo cambio de tarifa"
);
// ⚠️ Acá se mira el GUION ARMADO, no el archivo: el archivo menciona $81.000 a
// propósito en el comentario que explica este bug, y eso es documentación, no
// un precio. Lo que no puede tener el precio viejo es lo que lee la IA.
chequear("el guion armado no tiene ningún precio viejo de Cali", !/\$81\.000|\$21\.100/.test(guion));

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Un ejemplo viejo en el guion se cobra de verdad: ` +
      `la IA copia el ejemplo y el recaudo sale mal.`
  );
}
process.exit(mal ? 1 : 0);
