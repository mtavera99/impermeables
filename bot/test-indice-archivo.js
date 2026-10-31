/**
 * 🔴 31-oct: un lead NUEVO no puede leer el archivo histórico completo.
 *   node test-indice-archivo.js
 */
const fs = require("fs"), os = require("os"), path = require("path");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "indice-"));
process.env.DATA_DIR = DIR;
const VIEJO = Date.now() - 30 * 864e5;
fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify({ "573000000001": { messages: [{ role: "user", content: "hola", at: Date.now() }], ultimoDelCliente: Date.now() } }));
fs.writeFileSync(path.join(DIR, "conversations-archivo.json"), JSON.stringify({ "573000000099": { messages: [{ role: "user", content: "viejo", at: VIEJO }], ultimoDelCliente: VIEJO, noMolestar: true } }));
fs.writeFileSync(path.join(DIR, "orders.json"), "[]");
const store = require("./src/store");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

store.archivarConversacionesViejas(); // arma el índice, como al arrancar
chequear("el índice se guarda en disco", fs.existsSync(path.join(DIR, "conversations-archivo-indice.json")));
const real = fs.readFileSync; let lecturas = 0;
fs.readFileSync = function (f, ...a) { if (String(f).endsWith("conversations-archivo.json")) lecturas++; return real.call(this, f, ...a); };
const nuevo = store.getConv("573111222333");
chequear("🔑 un lead nuevo NO lee el archivo histórico", lecturas === 0, `lo leyó ${lecturas} veces`);
chequear("y arranca en blanco", nuevo.messages.length === 0);
store.pushMsg("573111222334", "user", "hola nuevo");
chequear("pushMsg de un lead nuevo tampoco lo lee", lecturas === 0, `lo leyó ${lecturas} veces`);
const vuelve = store.getConv("573000000099");
chequear("un cliente archivado que vuelve se recupera completo (con noMolestar)", vuelve.noMolestar === true && lecturas > 0);
fs.readFileSync = real;
const idx = JSON.parse(real(path.join(DIR, "conversations-archivo-indice.json"), "utf8"));
chequear("y sale del índice", !idx.includes("573000000099"));
console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
