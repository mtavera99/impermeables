/**
 * 💸 El bot no puede inventar datos de pago (caso del 10-nov).
 *   node test-datos-de-pago.js
 *
 * Los números de acá son INVENTADOS a propósito: el repo es público.
 */
const fs = require("fs"), path = require("path");
const dp = require("./src/datos-de-pago");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const LLAVE = "3001112233";
const conLlave = { PAGO_LLAVE: LLAVE };
const sinNada = {};

// El mensaje real del 10-nov, tal cual (con los datos que inventó el modelo).
const caso =
  "¡Entendido, Angie! Te lo dejo en un solo conjunto entonces.\n\n" +
  "Como prefieres el pago anticipado, te comparto los datos para que realices la transferencia y así dejar tu pedido listo para el despacho hoy mismo:\n\n" +
  "**Cuenta de ahorros Bancolombia: 031-000000-00**\n" +
  "**A nombre de: BikerPro**\n" +
  "**Nit: 900.000.000-0**\n\n" +
  "Una vez realices el pago, por favor envíame el comprobante por acá para confirmar y proceder con el envío. ¿Te parece bien? 🏍️✅";

// ── el caso real
const r = dp.revisar(caso, conLlave);
chequear("el caso del 10-nov se detecta", !r.ok);
chequear("marca la cuenta, el titular y el NIT (3 líneas)", r.problemas.length === 3, JSON.stringify(r.problemas));
const c = dp.corregir(caso, conLlave);
chequear("la cuenta inventada desaparece", !c.texto.includes("031-000000-00"));
chequear("el NIT inventado desaparece", !/nit/i.test(c.texto) && !c.texto.includes("900.000.000"));
chequear("el titular inventado desaparece", !/a nombre de/i.test(c.texto));
chequear("y entra la llave real", c.texto.includes(LLAVE));
chequear("se conserva el resto del mensaje", c.texto.includes("Te lo dejo en un solo conjunto"));
chequear("con datos reales NO pasa al dueño", c.sinDatosReales === false);

const s = dp.corregir(caso, sinNada);
chequear("sin nada en Render: se borra igual", !s.texto.includes("031-000000-00"));
chequear("sin nada en Render: dice que un asesor los comparte", /asesor/i.test(s.texto));
chequear("sin nada en Render: el chat pasa al dueño", s.sinDatosReales === true);

// ── lo que SÍ tiene que pasar
const bueno = `Podés pagar por Nequi: ${LLAVE}\nMandame la captura del comprobante 🙌`;
chequear("la llave real pasa", dp.revisar(bueno, conLlave).ok);
chequear("la llave real con espacios pasa", dp.revisar("Nequi: 300 111 2233", conLlave).ok);
chequear("número suelto debajo de 'Nequi:' que es el real pasa", dp.revisar(`Nequi:\n${LLAVE}`, conLlave).ok);
chequear("número suelto debajo de 'Nequi:' inventado NO pasa", !dp.revisar("Nequi:\n3109998877", conLlave).ok);
chequear("el bloque oficial pasa su propio candado", dp.revisar(dp.bloqueOficial(conLlave), conLlave).ok);
chequear("con titular configurado, ese titular pasa",
  dp.revisar("• A nombre de: Juan Pérez", { ...conLlave, PAGO_TITULAR: "Juan Pérez" }).ok);
chequear("y otro titular NO", !dp.revisar("• A nombre de: BikerPro SAS", { ...conLlave, PAGO_TITULAR: "Juan Pérez" }).ok);

// ── falsos positivos que no pueden saltar
const noSonPago = [
  "El total por transferencia es $152.000",
  "Pagás 152.000 pesos por transferencia",
  "Si prefieres pago anticipado, el total es $ 99.000",
  "📋 *Confirmemos tu pedido:*\n• Celular: 3205556677\n• Pago: anticipado\n• Total: $152.000",
  "Tu guía es 240061604892, llega en 1 a 3 días hábiles y pagás al recibir.",
  "¿Prefieres pagar contraentrega o anticipado por transferencia?",
  "La bodega queda en la Calle 62bis #67-12 Sur",
];
for (const t of noSonPago) chequear(`no salta: "${t.split("\n")[0].slice(0, 50)}"`, dp.revisar(t, conLlave).ok, JSON.stringify(dp.revisar(t, conLlave).problemas));

// ── lo que inventa el modelo de otras formas
const inventados = [
  "Daviplata: 3104445566",
  "Llave Bre-B: @bikerpro123456",
  "Consigná a la cuenta corriente 123-456789-01",
  "Transferí al Banco de Bogotá 0012345678",
];
// "@bikerpro123456" tiene 6 dígitos pegados: también tiene que caer.
for (const t of inventados) chequear(`inventado cae: "${t}"`, !dp.revisar(t, conLlave).ok);

// ── está enganchado donde corresponde
const src = fs.readFileSync(path.join(__dirname, "src", "agent.js"), "utf8");
chequear("generateReply corrige ANTES de pausar el chat",
  src.indexOf("datosDePago.corregir(reply)") > 0 &&
  src.indexOf("datosDePago.corregir(reply)") < src.indexOf("if (handoff || revisionHumana) store.setPaused"));
const prompt = fs.readFileSync(path.join(__dirname, "src", "prompt.js"), "utf8");
chequear("el guion prohíbe inventar datos de pago", /NUNCA inventes datos de pago/.test(prompt));
chequear("y ningún número real quedó escrito en el código",
  !/\b3\d{9}\b/.test(fs.readFileSync(path.join(__dirname, "src", "datos-de-pago.js"), "utf8")));

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
