/**
 * 🧠 Lectura del saldo de IA en NewAPI / VNAI Pro (25-nov).
 *   node test-saldo-ia.js
 *
 * El panel mostraba "$100 restantes de $100" fijo. Las respuestas de abajo imitan
 * controller/billing.go de new-api: hard_limit_usd en USD (o 100000000 si la clave
 * es ilimitada) y total_usage en centavos de USD.
 */
process.env.GEMINI_BASE_URL = "https://proxy.ejemplo";
process.env.GEMINI_API_KEY = "sk-prueba";
let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

function falsoFetch(limite, usoCentavos) {
  global.fetch = async (url) => ({
    ok: true,
    json: async () => (String(url).includes("subscription") ? { hard_limit_usd: limite } : { total_usage: usoCentavos }),
  });
}

(async () => {
  falsoFetch(100000000, 0);
  const saldo = require("./src/saldo-ia");

  falsoFetch(100, 3550); // $100 de cuota, $35,50 gastados
  let r = await saldo.consultarServidor();
  chequear("$100 de cuota y $35,50 usados → quedan $64,50", r.totalUsd === 100 && r.usadoUsd === 35.5 && r.restanteUsd === 64.5, JSON.stringify(r));
  chequear("el porcentaje es 65%", r.porcentaje === 65);

  falsoFetch(100, 850); // menos de $10 gastados: ya andaba bien
  r = await saldo.consultarServidor();
  chequear("$8,50 usados → quedan $91,50", r.restanteUsd === 91.5, JSON.stringify(r));

  falsoFetch(100, 9000);
  r = await saldo.consultarServidor();
  chequear("$90 usados → $10, en rojo y con alerta", r.restanteUsd === 10 && r.nivel === "rojo" && r.alerta, JSON.stringify(r));

  falsoFetch(100000000, 4200); // clave ilimitada
  r = await saldo.consultarServidor();
  chequear("clave ilimitada: NO inventa '$100 de $100'", r.ilimitada === true && r.totalUsd === undefined, JSON.stringify(r));
  chequear("clave ilimitada: igual dice cuánto se usó ($42)", r.usadoUsd === 42);

  const panel = require("fs").readFileSync(require("path").join(__dirname, "src", "panel.js"), "utf8");
  chequear("el panel muestra el caso de clave sin cuota", /saldo\.ilimitada/.test(panel) && /no se puede leer/.test(panel));

  console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal ? 1 : 0);
})();
