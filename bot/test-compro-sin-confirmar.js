/**
 * 🛒 Un pedido "sin confirmar" no saca al cliente del seguimiento (24-nov, 0-BW).
 *   node test-compro-sin-confirmar.js
 *
 * server.js prende `c.compro` con cualquier pedido, también con el ##ORDER##
 * prematuro que se guarda `sin_confirmar`. Ese cliente no compró y quedaba fuera
 * de los toques de 2 h, 20 h y 44 h. Teléfonos inventados.
 */
const fs = require("fs"), os = require("os"), path = require("path");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "compro-sin-confirmar-"));
process.env.DATA_DIR = DIR;
process.env.SEGUIMIENTO_ACTIVO = "1";
process.env.RESCATE_CUADRO = "0"; // el reloj del rescate no tiene que meterse acá

const wa = require("./src/whatsapp");
let enviados = [];
wa.sendText = async (to, body) => { enviados.push({ to, body }); return { ok: true }; };
wa.sendTemplate = async (to, nombre) => { enviados.push({ to, plantilla: nombre }); return { ok: true }; };

const seg = require("./src/seguimiento");
let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

// ── la regla, sola
const porTel = seg.resumenDePedidos([
  { telefono_chat: "A", sin_confirmar: true },
  { telefono_chat: "B" },
  { telefono_chat: "C", sin_confirmar: true },
  { telefono_chat: "C" },
  { telefono_chat: "D", sin_confirmar: true, anulado: true },
  { telefono_chat: "E", anulado: true },
]);
const compra = (tel, c) => seg.cuentaComoCompra(tel, c, porTel);
chequear("sin compro → no compró", compra("A", {}) === false);
chequear("🔑 compro + solo pedidos sin confirmar → NO cuenta como compra", compra("A", { compro: true }) === false);
chequear("compro + pedido confirmado → compró", compra("B", { compro: true }) === true);
chequear("compro + uno sin confirmar y otro confirmado → compró", compra("C", { compro: true }) === true);
chequear("compro + sin confirmar pero ANULADO (canceló) → se respeta, no se le insiste", compra("D", { compro: true }) === true);
chequear("compro + pedido anulado → se respeta", compra("E", { compro: true }) === true);
chequear("compro sin ningún pedido a la vista (venta a mano, archivo) → se respeta", compra("Z", { compro: true }) === true);
chequear("sin poder leer pedidos (porTel null) → vuelve la regla de siempre",
  seg.cuentaComoCompra("A", { compro: true }, null) === true);

// ── de punta a punta: correrSeguimientos con el store de verdad
(async () => {
  const H = 60 * 60 * 1000;
  const ahora = Date.now();
  const lead = (extra) => ({
    messages: [{ role: "user", content: "Ana Gómez 3001112233 Cra 1 #2-3", at: ahora - 2.5 * H }],
    ultimoDelCliente: ahora - 2.5 * H,
    seguimientos: 0,
    ...extra,
  });
  const T = {
    sinConfirmar: "573001110001",
    confirmado: "573001110002",
    anulado: "573001110003",
    aMano: "573001110004",
    normal: "573001110005",
    rescatado: "573001110006",
  };
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify({
    [T.sinConfirmar]: lead({ compro: true }),
    [T.confirmado]: lead({ compro: true }),
    [T.anulado]: lead({ compro: true }),
    [T.aMano]: lead({ compro: true }),
    [T.normal]: lead({}),
    [T.rescatado]: lead({ compro: true, rescateCuadro: { cuadroAt: ahora - 2.6 * H, enviadoAt: ahora - 2.2 * H } }),
  }));
  const f = new Date(ahora - 2.5 * H).toISOString();
  fs.writeFileSync(path.join(DIR, "orders.json"), JSON.stringify([
    { id: "1", telefono_chat: T.sinConfirmar, fecha: f, sin_confirmar: true, total: 152000 },
    { id: "2", telefono_chat: T.confirmado, fecha: f, total: 152000 },
    { id: "3", telefono_chat: T.anulado, fecha: f, sin_confirmar: true, anulado: true, total: 152000 },
    { id: "4", telefono_chat: T.rescatado, fecha: f, sin_confirmar: true, total: 152000 },
  ]));

  const r = await seg.correrSeguimientos();
  const a = new Set(enviados.map((e) => e.to));
  chequear("🔑 el del pedido sin confirmar SÍ recibe el toque de 2 h", a.has(T.sinConfirmar), JSON.stringify(enviados));
  chequear("el que no tiene pedido lo recibe igual que siempre", a.has(T.normal));
  chequear("el del pedido confirmado NO", !a.has(T.confirmado));
  chequear("el que canceló (anulado) NO", !a.has(T.anulado));
  chequear("el que compró a mano (sin pedido a la vista) NO", !a.has(T.aMano));
  chequear("el rescatado del cuadro que no contestó NO recibe el de 2 h (lo ve el rescate)", !a.has(T.rescatado));
  chequear("se mandaron exactamente 2", r.enviados === 2 && enviados.length === 2, JSON.stringify(r));

  const r2 = await seg.correrSeguimientos();
  chequear("la segunda pasada no repite", r2.enviados === 0 && enviados.length === 2, JSON.stringify(r2));

  const d = seg.diagnostico();
  chequear("el diagnóstico cuenta como compra solo las de verdad (confirmado, anulado, a mano)", d.compraron === 3, JSON.stringify(d));
  chequear("y muestra los sin confirmar que siguen en el seguimiento", d.sinConfirmarEnSeguimiento === 2, JSON.stringify(d));

  const src = fs.readFileSync(path.join(__dirname, "src", "seguimiento.js"), "utf8");
  chequear("elegible y diagnostico usan la MISMA regla",
    /if \(cuentaComoCompra\(phone, c, porTel\)\) return null/.test(src) &&
    /if \(cuentaComoCompra\(phone, c, porTel\)\) \{ r\.compraron\+\+; continue; \}/.test(src));
  chequear("los pedidos se leen una vez por pasada, con los anulados", (src.match(/= pedidosPorTelefono\(\)/g) || []).length === 2 &&
    /incluirAnulados: true/.test(src));
  chequear("no se toca c.compro (el panel y la atención siguen igual)", !/c\.compro\s*=/.test(src));

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal ? 1 : 0);
})();
