/**
 * 🪖 La aclaración "no incluye cascos" en el cuadro de confirmación (28-oct).
 *   node test-aclaracion-cascos.js
 */
const fs = require("fs"), os = require("os"), path = require("path");
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "cascos-"));
const { conAclaracionDeCascos, ACLARACION_CASCOS } = require("./src/agent");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const cuadro =
  "📋 *Confirmemos tu pedido:*\n• Producto: Q58 Max (x 2)\n• Nombre: Ana\n• Total a pagar al recibir: $152.000\n\n" +
  "*¿Está todo bien? Respondé SÍ CONFIRMO y lo despacho 🏍️*";

const q = conAclaracionDeCascos(cuadro, "intercom_q58_max", 2);
chequear("Q58 combo: lleva el texto exacto del dueño", q.includes(ACLARACION_CASCOS[2]));
chequear("y va ANTES de la línea de SÍ CONFIRMO", q.indexOf("no incluye cascos") < q.indexOf("SÍ CONFIRMO"));
chequear("V10 combo también", conAclaracionDeCascos(cuadro, "intercom_v10_2x", 2).includes(ACLARACION_CASCOS[2]));
const uno = conAclaracionDeCascos(cuadro, "intercom_v10_2x", 1);
chequear("V10 de UNA unidad: no dice '2 dispositivos'", uno.includes(ACLARACION_CASCOS[1]) && !uno.includes("los 2 dispositivos"));
chequear("no se repite si ya está", conAclaracionDeCascos(q, "intercom_q58_max", 2).split("no incluye cascos").length === 2);
chequear("radios: NO se agrega", !conAclaracionDeCascos(cuadro, "radio_bf777s", 1).includes("cascos"));
chequear("impermeable: NO se agrega", !conAclaracionDeCascos(cuadro, "impermeable", 1).includes("cascos"));
const pregunta = "Los dos Q58 Max te quedan en $152.000. ¿Para qué ciudad sería?";
chequear("una respuesta que NO es el cuadro final queda intacta", conAclaracionDeCascos(pregunta, "intercom_q58_max", 2) === pregunta);
const cot = require("./src/cotizacion");
const v = cot.validarRespuesta(ACLARACION_CASCOS[2], cot.calcular("Cali", "", { producto: "intercom_q58_max", cantidad: { uds: 2 } }), { producto: "intercom_q58_max", messages: [] });
chequear("el texto no dispara el validador de precio", v.ok, JSON.stringify(v.problemas));
const src = fs.readFileSync(path.join(__dirname, "src", "agent.js"), "utf8");
chequear("generateReply la aplica justo antes de guardar y enviar", /reply = conAclaracionDeCascos\(reply, productoId, cot && cot\.uds\);\s*\n\s*store\.pushMsg\(phone, "assistant", reply\);/.test(src));

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
