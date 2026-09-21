// Prueba de humo del tarifario. Corre con: node test-cotizacion.js
// No necesita clave de IA: prueba SOLO la lógica de precios, que es la
// que mueve plata. Si algo acá falla, no se despliega.
const {
  cotizar, bandaDe, zonaDificilDe, departamentosPosibles,
  BANDAS, PROMO_2_TOTAL, PRECIO_PRODUCTO, fmt,
} = require("./src/fletes");

const META_MARGEN = 23244;
const COSTO_PROD = 33000;

// envío REAL medido (flete+seguro) en el export del 18-sep
const ENVIO_1 = { A: 14906, B: 21038, C: 25055, D: 26287, E: 28697 };
const ENVIO_2 = { A: 23947, B: 32597, C: 38784, D: 37832, E: 45214 };

let fallas = 0;
const ok = (cond, msg) => {
  console.log(`  ${cond ? "✅" : "🔴"}  ${msg}`);
  if (!cond) fallas++;
};

console.log("=".repeat(66));
console.log("PRUEBA DEL TARIFARIO");
console.log("=".repeat(66));

console.log("\n### 1. Las bandas dejan el margen meta ($23.244/ud)\n");
for (const b of ["A", "B", "C", "D", "E"]) {
  const m1 = BANDAS[b].total - COSTO_PROD - ENVIO_1[b];
  ok(m1 >= META_MARGEN,
    `banda ${b} · 1 ud · cobra ${fmt(BANDAS[b].total)} → margen ${fmt(Math.round(m1))}`);
}
console.log("");
for (const b of ["A", "B", "C", "D", "E"]) {
  const m2 = (PROMO_2_TOTAL[b] - 2 * COSTO_PROD - ENVIO_2[b]) / 2;
  ok(m2 >= META_MARGEN,
    `banda ${b} · 2 uds · cobra ${fmt(PROMO_2_TOTAL[b])} → margen ${fmt(Math.round(m2))}/ud`);
}

console.log("\n### 2. Llevar dos sigue siendo más barato que dos sueltos\n");
for (const b of ["A", "B", "C", "D", "E"]) {
  const ahorro = 2 * BANDAS[b].total - PROMO_2_TOTAL[b];
  ok(ahorro > 0, `banda ${b} · ahorra ${fmt(ahorro)} llevando dos`);
}

console.log("\n### 3. Las 7 preguntas del guion\n");

const c1 = cotizar("Cali", 1);
ok(c1.total === 82000, `"Para Cali" → ${fmt(c1.total)} (esperado $82.000)`);

const c2 = cotizar("Medellin", 2);
ok(c2.total === 152000, `"2 para Medellín" → ${fmt(c2.total)} (esperado $152.000)`);

const c3 = cotizar("Bogota", 1);
ok(c3.total === 73000, `"Para Bogotá" → ${fmt(c3.total)} (esperado $73.000)`);

const c4 = cotizar("Bogota", 2);
ok(c4.total === 137000, `"2 para Bogotá" → ${fmt(c4.total)} (esperado $137.000)`);

const c5 = cotizar("Tunja", 1);
ok(c5.total === 78000, `"Para Tunja" → ${fmt(c5.total)} (esperado $78.000)`);

const amb = departamentosPosibles("Riosucio");
ok(Array.isArray(amb) && amb.length > 1,
  `"Riosucio" → ambigua, pide departamento (${amb ? amb.join("/") : "nada"})`);

const gu = zonaDificilDe("Guapi");
ok(gu && gu.total === null, `"Guapi" → difícil acceso sin dato, debe escalar`);

console.log("\n### 4. Los destinos que ya nos costaron plata\n");

const ch = zonaDificilDe("El Charco");
ok(ch && ch.total === 115500, `El Charco → ${ch ? fmt(ch.total) : "?"} (no $59.900)`);

const ta = zonaDificilDe("Tado");
ok(ta && ta.total === 93000 && ta.sinPromo2 === true,
  `Tadó → ${ta ? fmt(ta.total) : "?"} y sin promo de 2 (el flete se duplica)`);

const pueblo = cotizar("Un Pueblo Que No Existe", 1);
ok(pueblo.total === 85000,
  `ciudad desconocida → ${fmt(pueblo.total)} (banda E, no un número bajo)`);

console.log("\n" + "=".repeat(66));
if (fallas === 0) {
  console.log("🟢 TODO PASA. El tarifario está listo para desplegar.");
} else {
  console.log(`🔴 ${fallas} FALLA(S). NO desplegar hasta arreglar.`);
  process.exitCode = 1;
}
console.log("=".repeat(66));
