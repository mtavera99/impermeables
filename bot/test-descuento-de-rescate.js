/**
 * 💸 Descuento de rescate de intercomunicadores y radios (19-nov).
 *   node test-descuento-de-rescate.js
 *
 * La regla del dueño: un descuento chico SOLO cuando el cliente "literalmente dijo no
 * gracias o ya está muy caído". Q58 combo $5.000 · radios x4/x6 $5.000 · radios x2
 * $3.000 · V10 y Q58 unidad, nada. El impermeable sigue con su política de siempre.
 */
const fs = require("fs"), os = require("os"), path = require("path");
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "rescate-"));
const c = require("./src/cotizacion");
const catalogo = require("./src/catalogo");
let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));
const cot = (p, u, ciudad = "Cali") => c.calcular(ciudad, "", { producto: p, cantidad: { uds: u } });

// ── los montos
const q2 = cot("intercom_q58_max", 2);
chequear("Q58 combo: rescate = total − $5.000", q2.ok && q2.rescate === q2.total - 5000, JSON.stringify([q2.total, q2.rescate]));
chequear("Q58 unidad: sin rescate", cot("intercom_q58_max", 1).rescate === null);
chequear("V10 combo: sin rescate (utilidad baja)", cot("intercom_v10_2x", 2).rescate === null);
chequear("V10 unidad: sin rescate", cot("intercom_v10_2x", 1).rescate === null);
chequear("radios x2: $99.000 → $96.000", cot("radio_bf777s", 1).rescate === 96000);
chequear("radios x4: $169.000 → $164.000", cot("radio_bf777s", 2).rescate === 164000);
chequear("radios x6: $229.000 → $224.000", cot("radio_bf777s", 3).rescate === 224000);
const imp = cot("impermeable", 1);
chequear("impermeable de 1: sigue el tope de $3.000 de siempre", imp.rescate === imp.total - c.TOPE_DESCUENTO_1_UNIDAD);
chequear("los montos viven en catalogo.js", catalogo.de("intercom_q58_max").descuentoDeRescate[2] === 5000 &&
  catalogo.de("radio_bf777s").descuentoDeRescate[1] === 3000 && !catalogo.de("intercom_v10_2x").descuentoDeRescate);

// ── cuándo se puede decir
const msg = `Para no dejarte ir, te hago un descuento de $5.000: te queda en $${(q2.rescate / 1000).toFixed(3)} en total y pagás al recibir. ¿Te lo despacho?`;
const ctx = (extra) => ({ producto: "intercom_q58_max", messages: [], ...extra });
chequear("sin objeción, el validador NO deja pasar el precio rebajado", !c.validarRespuesta(msg, q2, ctx({})).ok);
const conObj = c.validarRespuesta(msg, q2, ctx({ objecionDePrecio: true }));
chequear("con objeción, sí (también el monto de $5.000)", conObj.ok, JSON.stringify(conObj.problemas));
chequear("pero no un descuento de $10.000", !c.validarRespuesta("te hago un descuento de $10.000: te queda en $142.000", q2, ctx({ objecionDePrecio: true })).ok);
const v10 = cot("intercom_v10_2x", 2);
chequear("V10: aunque objete, un precio rebajado no pasa",
  !c.validarRespuesta(`te queda en $${((v10.total - 5000) / 1000).toFixed(3)} en total`, v10, { producto: "intercom_v10_2x", messages: [], objecionDePrecio: true }).ok);

// ── el disparador: "no gracias" o "muy caído"
for (const t of ["No gracias", "no, muchas gracias", "No estoy interesado", "Lo voy a pensar", "lo pienso y te aviso",
  "después te aviso", "te confirmo más tarde", "Voy a esperar", "por ahora no", "ahorita no"]) {
  chequear(`se está yendo: "${t}"`, c.seEstaYendo([{ role: "user", content: t }]));
}
for (const t of ["No gracias, el negro mejor", "Ya lo compré", "Si gracias", "¿cuánto vale el envío?", "Medellín", "no, mejor dos"]) {
  chequear(`NO se está yendo: "${t}"`, !c.seEstaYendo([{ role: "user", content: t }]));
}
chequear("solo cuentan los mensajes del cliente", !c.seEstaYendo([{ role: "assistant", content: "No gracias" }]));

// ── lo que lee el modelo
const conRescate = c.bloqueDeDatos(q2, ctx({ objecionDePrecio: true }));
chequear("con objeción, el bloque autoriza UNA vez el descuento", /ÚLTIMO RECURSO/.test(conRescate) && /UNA sola vez/.test(conRescate) && conRescate.includes("$5.000"));
const sinRescate = c.bloqueDeDatos(q2, ctx({}));
chequear("sin objeción, el bloque lo prohíbe", /NO ofrezcas ni menciones ningún descuento/.test(sinRescate) && !/ÚLTIMO RECURSO/.test(sinRescate));
chequear("V10 con objeción: el bloque dice que no hay descuentos",
  /No hay descuentos para este producto/.test(c.bloqueDeDatos(v10, { producto: "intercom_v10_2x", messages: [], objecionDePrecio: true })));
const r1 = cot("radio_bf777s", 1);
chequear("radios x2 con objeción: autoriza $3.000", c.bloqueDeDatos(r1, { producto: "radio_bf777s", messages: [], objecionDePrecio: true }).includes("$3.000"));

// ── agent.js usa el disparador nuevo
const src = fs.readFileSync(path.join(__dirname, "src", "agent.js"), "utf8");
chequear("agent.js suma seEstaYendo a la objeción de precio", /\|\| cotizacion\.seEstaYendo\(/.test(src));

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
