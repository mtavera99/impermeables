/**
 * 🧪 Prueba A/B del cierre después del total (19-nov).
 *   node test-ab-cierre.js
 *
 * A = "¿Te sirve ese total?" (lo de siempre) · B = "¿A nombre de quién te lo envío?"
 * El grupo sale del último dígito del número: par = A, impar = B.
 */
const fs = require("fs"), os = require("os"), path = require("path");
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "ab-cierre-"));
delete process.env.AB_CIERRE_ASUMIDO;
const c = require("./src/cotizacion");
let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

chequear("termina en par → A", c.varianteDeCierre("573001112234") === "A");
chequear("termina en impar → B", c.varianteDeCierre("573001112233") === "B");
chequear("cliente con nombre de usuario (BSUID) → por su último dígito", c.varianteDeCierre("CO.1098944123092301") === "B");
chequear("sin dígito → A", c.varianteDeCierre("") === "A" && c.varianteDeCierre(undefined) === "A");
chequear("es estable: el mismo número da siempre lo mismo", c.varianteDeCierre("573001112233") === c.varianteDeCierre("573001112233"));

// reparto parejo sobre 10.000 números al azar
let b = 0;
for (let i = 0; i < 10000; i++) b += c.varianteDeCierre("57300" + String(Math.floor(Math.random() * 1e7)).padStart(7, "0")) === "B";
chequear("el reparto es parejo (45-55% en B)", b > 4500 && b < 5500, `B = ${b}`);

const q = c.calcular("Cali", "", { producto: "intercom_q58_max", cantidad: { uds: 2 } });
const blq = (phone, extra = {}) => c.bloqueDeDatos(q, { producto: "intercom_q58_max", messages: [], phone, ...extra });
chequear("grupo B: el bloque pide el cierre asumido", /A nombre de quién te lo envío/.test(blq("573001112233")));
chequear("grupo B: y le dice que ignore el microcierre", /NO uses el microcierre/.test(blq("573001112233")));
chequear("grupo A: el bloque no cambia", !/CÓMO TERMINAR EL MENSAJE DEL TOTAL/.test(blq("573001112234")));
const r = c.calcular("Cali", "", { producto: "radio_bf777s", cantidad: { uds: 1 } });
chequear("radios también entran en la prueba", /A nombre de quién/.test(c.bloqueDeDatos(r, { producto: "radio_bf777s", messages: [], phone: "573001112233" })));
const sinCiudad = c.calcular("", "", { producto: "intercom_q58_max", cantidad: { uds: 2 } });
chequear("sin total todavía, no hay instrucción de cierre", !/CÓMO TERMINAR/.test(c.bloqueDeDatos(sinCiudad, { producto: "intercom_q58_max", messages: [], phone: "573001112233" })));
const imp = c.calcular("Cali", "", { producto: "impermeable", cantidad: { uds: 1 } });
chequear("el impermeable NO entra (ya cierra pidiendo los datos)", !/CÓMO TERMINAR/.test(c.bloqueDeDatos(imp, { messages: [], phone: "573001112233" })));
chequear("la instrucción no trae números que el validador rechace",
  c.validarRespuesta("¿A nombre de quién te lo envío?", q, { producto: "intercom_q58_max", messages: [] }).ok);

process.env.AB_CIERRE_ASUMIDO = "0";
chequear("AB_CIERRE_ASUMIDO=0 apaga la prueba (todos en A)", c.varianteDeCierre("573001112233") === "A" && !/CÓMO TERMINAR/.test(blq("573001112233")));
delete process.env.AB_CIERRE_ASUMIDO;

const src = fs.readFileSync(path.join(__dirname, "src", "agent.js"), "utf8");
chequear("agent.js pasa el número en el contexto de precio", /const contextoPrecio = \{[\s\S]{0,200}\bphone,/.test(src));

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
