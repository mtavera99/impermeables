#!/usr/bin/env node
/**
 * Prueba el GUION contra el bot desplegado, sin tocar WhatsApp.
 *
 *   node probar-guion.js https://bikerpro-bot.onrender.com bikerpro_verify_2026
 *
 * POR QUÉ EXISTE: `test-cotizacion.js` prueba que `cotizar()` devuelva el número
 * correcto. Esto prueba algo distinto y más difícil: **que la IA use ese número**.
 * Un tarifario perfecto no sirve de nada si el modelo improvisa un precio.
 *
 * Los casos no son inventados: son los que YA costaron plata (documentados en el
 * archivo madre) más los que salieron del export del agente de Meta:
 *   · El Charco: se cobró $59.900 contra un envío real de $55.563  → −$28.663
 *   · Localidades de Bogotá cotizadas como pueblo                  → +$12.000 de sobreprecio
 *   · Rangos de envío ("entre 15.000 y 20.000")                    → 46,6% mal cotizado
 *   · 2 unidades mandadas a un asesor teniendo el número           → cierres perdidos
 *
 * TAMBIÉN SIRVE PARA COMPARAR MOTORES: se corre igual contra Gemini y contra
 * DeepSeek y se ve cuál respeta las reglas. El ahorro de DeepSeek es $51.544/mes,
 * pero UN pedido mal cotizado cuesta $3.249: con 16 errores al mes el ahorro
 * desaparece. Esta es la prueba que decide, no el precio por token.
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const TOKEN = process.argv[3] || process.env.WHATSAPP_VERIFY_TOKEN || "bikerpro_verify_2026";

// debe / noDebe aceptan string (se busca tal cual) o RegExp
const CASOS = [
  {
    nombre: "Primer mensaje: ¿se adelanta a talla y color?",
    porque: "talla (17,8%) + color (10,3%) = 28,1% de las preguntas del export",
    msg: "Hola, quiero más información",
    debe: [/\b(S|s)\b.{0,20}3XL|tallas/i, /color|franja/i],
    noDebe: [],
  },
  {
    nombre: "Bogotá localidad → $73.000 (NO $85.000)",
    porque: "las localidades caían en banda E: $12.000 de sobreprecio",
    msg: "Vivo en Bogotá, barrio Suba. ¿Cuánto me sale todo?",
    debe: ["73.000"],
    noDebe: ["85.000"],
  },
  {
    nombre: "Bosa sin decir Bogotá → $73.000",
    porque: "el cliente escribe la localidad sola",
    msg: "Estoy en Bosa, cuánto vale con envío",
    debe: ["73.000"],
    noDebe: ["85.000"],
  },
  {
    nombre: "Cali → $82.000",
    porque: "banda C, la de más volumen",
    msg: "Para Cali cuánto sale",
    debe: ["82.000"],
    noDebe: ["81.000"],
  },
  {
    nombre: "2 unidades a Bogotá → $137.000 EN FIRME",
    porque: "antes escalaba a un asesor teniendo el número. Share 2uds: 8,3%",
    msg: "Quiero dos conjuntos para Bogotá, cuánto me sale",
    debe: ["137.000"],
    noDebe: [/asesor te (escribe|confirma)/i, /te confirmo el env[íi]o/i],
  },
  {
    nombre: "Mosquera → debe PREGUNTAR el departamento",
    porque: "bug de hoy: está en la sabana y en el Pacífico de Nariño",
    msg: "Soy de Mosquera, cuánto vale",
    debe: [/Cundinamarca/i, /Nari/i],
    noDebe: ["73.000", "85.000"],
  },
  {
    nombre: "Riosucio → debe PREGUNTAR el departamento",
    porque: "Caldas $85.000 vs Chocó fluvial. Ya estaba, no debe romperse",
    msg: "Envían a Riosucio?",
    debe: [/Caldas/i, /Choc/i],
    noDebe: ["85.000"],
  },
  {
    nombre: "Tadó → $93.000",
    porque: "difícil acceso CON dato medido",
    msg: "Cuánto vale el envío a Tadó",
    debe: ["93.000"],
    noDebe: ["85.000"],
  },
  {
    nombre: "Guapi → NO dar número, escalar",
    porque: "difícil acceso SIN dato. El Charco costó −$28.663 por adivinar",
    msg: "Cuánto sale a Guapi, Cauca",
    debe: [/confirmarte|en un momento|te escribo/i],
    noDebe: ["85.000", "73.000", "82.000"],
  },
  {
    nombre: "Envío sin ciudad → NO dar número ni rango",
    porque: "la regla que más plata cuesta romper. El agente viejo daba 15.000-20.000",
    msg: "Cuánto cuesta el envío?",
    debe: [/qu[ée] ciudad|ciudad ser[íi]a|dónde est[áa]s|de d[óo]nde/i],
    noDebe: [/1[0-9]\.000/, /2[0-9]\.000/, /entre .* y .*000/i],
  },
  {
    nombre: "Mayorista → NO cotizar, escalar",
    porque: "el flete de 6 y 13 unidades sigue sin medir",
    msg: "Quiero 12 unidades para revender, qué precio me das",
    debe: [/asesor|propuesta|escrib/i],
    noDebe: [/50\.000/, /47\.000/],
  },
];

const fetchCaso = async (caso, i) => {
  const url = `${BASE}/probar?token=${encodeURIComponent(TOKEN)}&reset=1&id=g${i}&msg=${encodeURIComponent(caso.msg)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${(await res.text()).slice(0, 120)}`);
  return res.json();
};

const cumple = (txt, pat) =>
  pat instanceof RegExp ? pat.test(txt) : txt.includes(pat);

(async () => {
  console.log("=".repeat(72));
  console.log("PRUEBA DEL GUION CONTRA EL BOT DESPLEGADO");
  console.log(`  ${BASE}`);
  console.log("=".repeat(72));

  let ok = 0, mal = 0;
  const fallos = [];

  for (let i = 0; i < CASOS.length; i++) {
    const c = CASOS[i];
    let r;
    try {
      r = await fetchCaso(c, i);
    } catch (e) {
      console.log(`\n🔴 ${c.nombre}\n   ERROR DE RED: ${e.message}`);
      mal++; fallos.push(c.nombre);
      continue;
    }

    const txt = r.respuesta || "";
    const faltan = c.debe.filter((p) => !cumple(txt, p));
    const sobran = c.noDebe.filter((p) => cumple(txt, p));
    const pasa = faltan.length === 0 && sobran.length === 0;

    console.log(`\n${pasa ? "✅" : "🔴"} ${c.nombre}`);
    console.log(`   por qué importa: ${c.porque}`);
    console.log(`   cliente: "${c.msg}"`);
    console.log(`   bot: ${txt.replace(/\n+/g, " ").slice(0, 210)}${txt.length > 210 ? "…" : ""}`);
    if (r.pasarAHumano) console.log(`   → marcó pasar a humano`);
    if (!pasa) {
      if (faltan.length) console.log(`   🔴 FALTA: ${faltan.map(String).join(" · ")}`);
      if (sobran.length) console.log(`   🔴 NO DEBERÍA DECIR: ${sobran.map(String).join(" · ")}`);
      fallos.push(c.nombre);
    }
    pasa ? ok++ : mal++;
  }

  console.log("\n" + "=".repeat(72));
  console.log(`RESULTADO: ${ok} de ${CASOS.length} casos correctos`);
  if (mal) {
    console.log(`\n🔴 ${mal} fallaron:`);
    fallos.forEach((f) => console.log(`   · ${f}`));
    console.log("\nOjo: la IA no es determinista. Un fallo aislado puede ser variación;");
    console.log("dos corridas seguidas fallando el mismo caso es un problema del guion.");
    process.exitCode = 1;
  } else {
    console.log("🟢 El guion respeta el tarifario en todos los casos que ya costaron plata.");
  }
  console.log("=".repeat(72));
})();
