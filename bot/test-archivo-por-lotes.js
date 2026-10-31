/**
 * 🔴 1-nov: el histórico se guarda en lotes y el archivo único viejo se parte
 * SIN parsearlo entero. Nada vuelve a leer el histórico completo.
 *   node test-archivo-por-lotes.js
 */
const fs = require("fs"), os = require("os"), path = require("path");
const { spawnSync } = require("child_process");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));
const VIEJO = Date.now() - 30 * 864e5;

// ── 1. Migración exacta, con textos difíciles y formato con sangría (como writeJSON)
{
  const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "lotes-"));
  const raros = {};
  const textos = ['comillas " y \\\\ barra', "llaves { } [ ] adentro", "emoji 📻🏍️ y tildes ñáé", 'json {"a":1}', "salto\nde línea"];
  for (let i = 0; i < 2000; i++) raros["57300" + String(i).padStart(7, "0")] = { messages: [{ role: "user", content: textos[i % 5] + " " + i, at: VIEJO }], ultimoDelCliente: VIEJO, noMolestar: i % 7 === 0, perfil: { nombre: "Nombre \"raro\" " + i } };
  raros["CO.1098944123092301"] = { messages: [], ultimoDelCliente: VIEJO };
  fs.writeFileSync(path.join(DIR, "conversations-archivo.json"), JSON.stringify(raros, null, 2));
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify({ "573111111111": { messages: [{ role: "user", content: "hola", at: Date.now() }], ultimoDelCliente: Date.now() } }));
  fs.writeFileSync(path.join(DIR, "orders.json"), "[]");
  fs.writeFileSync(path.join(DIR, "orig.json"), JSON.stringify(raros));
  const HIJO = `
    const s=require("./src/store"); const fs=require("fs");
    const real=fs.readFileSync; let grande=0;
    fs.readFileSync=function(f,...a){ if(String(f).endsWith("conversations-archivo.json")) grande++; return real.call(this,f,...a) };
    const nuevo=s.getConv("573999999999");
    const original=JSON.parse(real(process.env.ORIG,"utf8"));
    let iguales=0; for(const [t,c] of Object.entries(original)){ if(JSON.stringify(s.leerArchivada(t))===JSON.stringify(c)) iguales++ }
    const vuelve=s.getConv("573000000007");
    const res=s.todasLasConversaciones({incluirArchivo:true});
    console.log(JSON.stringify({grande, nuevoVacio:nuevo.messages.length===0, total:Object.keys(original).length, iguales, vuelveNoMolestar:vuelve.noMolestar===true, enActivas:!!s.todasLasConversaciones()["573000000007"], resumen:Object.keys(res).length, migrado:fs.readdirSync(process.env.DATA_DIR).some(f=>f.includes(".migrado-"))}));
  `;
  const r3 = spawnSync(process.execPath, ["-e", HIJO], { env: { ...process.env, DATA_DIR: DIR, ORIG: path.join(DIR, "orig.json") }, encoding: "utf8", cwd: __dirname });
  const linea = (r3.stdout || "").split("\n").filter((l) => l.startsWith("{")).pop();
  const d = linea ? JSON.parse(linea) : {};
  chequear("migración: las 2.001 conversaciones quedan IDÉNTICAS en los lotes", d.iguales === d.total && d.total === 2001, linea || r3.stderr.slice(0, 300));
  chequear("y el archivo único se lee por pedazos, nunca con readFileSync", d.grande === 0, `readFileSync: ${d.grande}`);
  chequear("un lead nuevo arranca en blanco", d.nuevoVacio === true);
  chequear("un archivado que vuelve se recupera con su noMolestar", d.vuelveNoMolestar === true && d.enActivas === true);
  chequear("el buscador sigue viendo las archivadas (resumen)", d.resumen >= 2001);
  chequear("el archivo original queda como respaldo", d.migrado === true);
}

// ── 2. Memoria: archivo histórico de ~60 MB con el heap de Render (268 MB)
{
  const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "lotes-mem-"));
  const o = {};
  for (let i = 0; i < 26000; i++) {
    const m = [];
    for (let k = 0; k < 12; k++) m.push({ role: k % 2 ? "assistant" : "user", content: "Texto de relleno para que la conversacion pese como en produccion, hablamos de radios e impermeables y del envio y del precio. " + k + " " + i, at: VIEJO });
    o["5731" + String(i).padStart(8, "0")] = { messages: m, ultimoDelCliente: VIEJO, perfil: { nombre: "Cliente " + i } };
  }
  fs.writeFileSync(path.join(DIR, "conversations-archivo.json"), JSON.stringify(o, null, 2));
  const mb = fs.statSync(path.join(DIR, "conversations-archivo.json")).size / 1048576;
  fs.writeFileSync(path.join(DIR, "conversations.json"), "{}");
  fs.writeFileSync(path.join(DIR, "orders.json"), "[]");
  const r = spawnSync(process.execPath, ["--max-old-space-size=268", "-e", `const s=require("./src/store");s.getConv("573999999999");s.archivarConversacionesViejas();console.log("OK "+Math.round(process.memoryUsage().rss/1048576))`], { env: { ...process.env, DATA_DIR: DIR }, encoding: "utf8", cwd: __dirname });
  const okLinea = (r.stdout || "").split("\n").find((l) => l.startsWith("OK "));
  chequear(`🔑 con un histórico de ${Math.round(mb)} MB y el heap de 268 MB NO se cae (RSS ${okLinea ? okLinea.slice(3) : "?"} MB)`, r.status === 0 && Boolean(okLinea), (r.stderr || "").split("\n").filter((l) => /heap|FATAL/.test(l)).join(" | "));
}

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
