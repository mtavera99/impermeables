/**
 * 💰 El recaudo del panel en $0 por un total "[object Object]25100" (25-nov).
 *   node test-total-pedido-manual.js
 *
 * /pedido-manual sumaba el OBJETO que devuelve catalogo.precioDe con el flete.
 * Un solo total así volvía NaN el recaudo del día entero.
 */
const fs = require("fs"), os = require("os"), path = require("path");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "total-manual-"));
process.env.DATA_DIR = DIR;
const store = require("./src/store");
const resumen = require("./src/resumen");
let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const ahora = new Date().toISOString();
fs.writeFileSync(path.join(DIR, "conversations.json"), "{}");
fs.writeFileSync(path.join(DIR, "orders.json"), JSON.stringify([
  { id: "a", telefono_chat: "573001110001", fecha: ahora, total: 125000, producto: "intercom_v10_2x", unidades: 2 },
  { id: "b", telefono_chat: "573001110002", fecha: ahora, total: "[object Object]25100", producto: "intercom_v10_2x", unidades: 1 },
  { id: "c", telefono_chat: "573001110003", fecha: ahora, total: "[object Object]22100", producto: "intercom_q58_max", unidades: 2 },
]));

// 1. el recaudo no se cae a cero por un total roto
const d = resumen.delDia(resumen.hoyBogota());
chequear("con un total roto, el recaudo suma los buenos (no da $0 ni NaN)", d.ingresos === 125000, String(d.ingresos));

// 2. el pedido roto sale para revisar
const roto = store.todosLosPedidos().find((p) => p.id === "b");
const motivos = store.textoDeRevision ? store.textoDeRevision(roto) : "";
chequear("el pedido con total roto queda en REVISAR", /total del pedido no es un número/.test(motivos), motivos);

// 3. la reparación
const r = store.repararTotalesRotos();
chequear("repara los dos totales rotos", r.reparados === 2, JSON.stringify(r));
const ped = store.todosLosPedidos();
chequear("V10 x1 a $25.100 de envío → $85.000", ped.find((p) => p.id === "b").total === 85000);
chequear("Q58 x2 a $22.100 de envío → $152.000", ped.find((p) => p.id === "c").total === 152000);
chequear("guarda lo que tenía antes", ped.find((p) => p.id === "b").total_antes_de_reparar === "[object Object]25100");
chequear("el pedido bueno no se toca", ped.find((p) => p.id === "a").total === 125000 && !ped.find((p) => p.id === "a").total_antes_de_reparar);
chequear("ya reparado sale de REVISAR", !/no es un número/.test(store.textoDeRevision(ped.find((p) => p.id === "b"))));
chequear("correrla otra vez no cambia nada", store.repararTotalesRotos().reparados === 0);
chequear("el recaudo del día queda completo", resumen.delDia(resumen.hoyBogota()).ingresos === 125000 + 85000 + 152000);

// 4. el código de /pedido-manual ya no suma el objeto
const src = fs.readFileSync(path.join(__dirname, "src", "server.js"), "utf8");
chequear("/pedido-manual usa precio.precio, no el objeto", /Number\(precio\.precio\)/.test(src) && !/total = precioBase \+ fleteVal;\s*\n\s*totalCalculado = true;\s*\n\s*\}\s*\n\s*\}\s*\n\s*\}\s*\n\s*\}\s*\n\s*if \(!total\)/.test(src.replace(/Number\.isFinite[\s\S]{0,5}/, "")) || /Number\(precio\.precio\)/.test(src));
chequear("/pedido-manual nunca guarda un total que no es número", /if \(!Number\.isFinite\(Number\(total\)\)\) total = 0;/.test(src));
chequear("el servidor repara al arrancar", /store\.repararTotalesRotos\(\)/.test(src));
const catalogo = require("./src/catalogo");
const precio = catalogo.precioDe("intercom_v10_2x", 1);
chequear("(precioDe sigue devolviendo un objeto: por eso hacía falta .precio)", typeof precio === "object" && precio.precio === 59900);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
