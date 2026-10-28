/**
 * 📨 El botón "Mandar plantilla" del chat (27-oct).
 * Con la ventana de 24h cerrada, el chat ofrece la plantilla de seguimiento DEL
 * PRODUCTO de esa conversación, y nunca la de otro.
 *   node test-boton-plantilla.js
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "boton-plantilla-"));
process.env.DATA_DIR = DIR;
process.env.SEGUIMIENTO_PLANTILLA_RADIO = "seguimiento_radios";
process.env.SEGUIMIENTO_PLANTILLA_V10 = "seguimiento_intercomunicador";
process.env.PANEL_TOKEN = "tk";

let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const VIEJO = Date.now() - 4 * 24 * 3600 * 1000;
const convs = {
  "573000000001": { messages: [{ role: "user", content: "quiero 4 radios", at: VIEJO }], ultimoDelCliente: VIEJO, productoActivo: "radio_bf777s", paused: true },
  "573000000002": { messages: [{ role: "user", content: "el combo", at: VIEJO }], ultimoDelCliente: VIEJO, productoActivo: "intercom_v10_2x", paused: true },
  "573000000003": { messages: [{ role: "user", content: "hola", at: Date.now() - 3600 * 1000 }], ultimoDelCliente: Date.now() - 3600 * 1000, productoActivo: "radio_bf777s" },
};
fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs));
fs.writeFileSync(path.join(DIR, "orders.json"), "[]");

const panelChat = require("./src/panel-chat");
const h1 = panelChat.render({ id: "573000000001", token: "tk" });
chequear("chat de radios con la ventana cerrada: ofrece seguimiento_radios", /Mandar plantilla «seguimiento_radios»/.test(h1));
chequear("y va al endpoint /enviar-plantilla", /action="\/enviar-plantilla"/.test(h1));
chequear("y pide confirmación antes de mandar", /confirm\(/.test(h1));
const h2 = panelChat.render({ id: "573000000002", token: "tk" });
chequear("chat del V10: ofrece la del intercomunicador, NO la de radios", /«seguimiento_intercomunicador»/.test(h2) && !/seguimiento_radios/.test(h2));
const h3 = panelChat.render({ id: "573000000003", token: "tk" });
chequear("con la ventana abierta NO aparece el botón (se escribe libre)", !/Mandar plantilla/.test(h3));

// 🔴 27-oct: abrir un chat leía también el archivo de conversaciones viejas
// (43 MB en producción). Eso, repetido tras cada envío, tumbó el bot.
fs.writeFileSync(path.join(DIR, "conversations-archivo.json"), JSON.stringify({ "573999999999": { messages: [{ role: "user", content: "viejo", at: VIEJO }], ultimoDelCliente: VIEJO } }));
{
  const real = fs.readFileSync;
  let leyoArchivo = 0;
  fs.readFileSync = function (f, ...a) {
    if (String(f).endsWith("conversations-archivo.json")) leyoArchivo++;
    return real.call(this, f, ...a);
  };
  try {
    panelChat.render({ id: "573000000001", token: "tk", resultado: "ok" });
    chequear("🔑 abrir un chat activo NO lee el archivo de conversaciones viejas", leyoArchivo === 0, `lo leyó ${leyoArchivo} veces`);
    leyoArchivo = 0;
    const viejo = panelChat.render({ id: "573999999999", token: "tk" });
    chequear("pero un chat archivado se sigue encontrando", leyoArchivo > 0 && /viejo/.test(viejo));
    leyoArchivo = 0;
    panelChat.render({ q: "0001", token: "tk" });
    chequear("y buscar algo que está en las activas tampoco lo lee", leyoArchivo === 0, `lo leyó ${leyoArchivo} veces`);
  } finally {
    fs.readFileSync = real;
  }
}

const srv = fs.readFileSync(path.join(__dirname, "src", "server.js"), "utf8");
chequear("el endpoint solo acepta plantillas de seguimiento configuradas", /permitidas\.has\(plantilla\)/.test(srv));
chequear("y tiene candado antiduplicado", /esDuplicado\(to, "plantilla:"/.test(srv));

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
