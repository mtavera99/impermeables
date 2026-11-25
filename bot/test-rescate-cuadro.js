/**
 * 📋 Rescate del cuadro de confirmación sin responder (24-nov).
 *   node test-rescate-cuadro.js
 *
 * Los números de teléfono son inventados.
 */
const fs = require("fs"), os = require("os"), path = require("path");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "rescate-cuadro-"));
process.env.DATA_DIR = DIR;
process.env.SEGUIMIENTO_ACTIVO = "1";
delete process.env.RESCATE_CUADRO;

// sendText falso: el módulo lo toma al cargar, así que se cambia antes.
const wa = require("./src/whatsapp");
let enviados = [];
wa.sendText = async (to, body) => { enviados.push({ to, body }); return { ok: true }; };
wa.sendTemplate = async () => ({ ok: true });

const store = require("./src/store");
const rc = require("./src/rescate-cuadro");
const promesas = require("./src/promesas");
const { estadoDeConfirmacion } = require("./src/confirmacion");

let ok = 0, mal = 0;
const chequear = (n, x, d) => (x ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const MIN = 60 * 1000;
// Mediodía en Bogotá (17:00 UTC), para no depender de la hora en que corre la prueba.
const AHORA = Date.parse("2026-11-24T17:00:00Z");
const CUADRO =
  "📋 *Confirmemos tu pedido:*\n• Producto: Q58 Max (x 2)\n• Nombre: Ana María Gómez\n• Celular: 3001112233\n" +
  "• Ciudad: Cali\n• Dirección: Cra 1 #2-3\n• Total a pagar al recibir: $152.000\n\n*¿Está todo bien? Respondé SÍ CONFIRMO y lo despacho 🏍*";

function chat(extra = {}, minutosDesdeCuadro = 25, despues = []) {
  const t = AHORA - minutosDesdeCuadro * MIN;
  return {
    paused: false,
    ultimoDelCliente: t - 1 * MIN,
    messages: [
      { role: "user", content: "Ana María Gómez, 3001112233, Cra 1 #2-3 Cali", at: t - 1 * MIN },
      { role: "assistant", content: CUADRO, at: t },
      ...despues,
    ],
    ...extra,
  };
}
const ev = (c, pedidos = [], ahora = AHORA) => rc.evaluar("573001112233", c, pedidos, ahora);

// ── cuándo SÍ
chequear("cuadro sin respuesta hace 25 min → toca", ev(chat()).toca, JSON.stringify(ev(chat())));

// ── cuándo NO
chequear("a los 10 min todavía no (el 92% que confirma lo hace antes de 15)", !ev(chat({}, 10)).toca);
chequear("a las 2 h ya no: sigue el seguimiento normal", !ev(chat({}, 120)).toca);
chequear("pausado (lo tiene un humano) → no", !ev(chat({ paused: true })).toca);
chequear("pidió no molestar → no", !ev(chat({ noMolestar: true })).toca);
chequear("ya dijo SÍ CONFIRMO → no",
  !ev(chat({}, 30, [{ role: "user", content: "Sí confirmo", at: AHORA - 29 * MIN }, { role: "assistant", content: "¡Listo!", at: AHORA - 28 * MIN }])).toca);
chequear("dijo NO CONFIRMO → no",
  !ev(chat({}, 30, [{ role: "user", content: "No confirmo", at: AHORA - 29 * MIN }, { role: "assistant", content: "Entendido", at: AHORA - 28 * MIN }])).toca);
chequear("el último mensaje es del cliente (el bot le está contestando) → no",
  !ev(chat({}, 30, [{ role: "user", content: "¿cuándo llega?", at: AHORA - 1 * MIN }])).toca);
chequear("preguntó algo, el bot contestó y se calló 25 min → sí toca",
  ev(chat({}, 40, [{ role: "user", content: "¿cuándo llega?", at: AHORA - 26 * MIN }, { role: "assistant", content: "De 2 a 4 días hábiles", at: AHORA - 25 * MIN }])).toca);
chequear("este mismo cuadro ya se rescató → no",
  !ev(chat({ rescateCuadro: { cuadroAt: AHORA - 25 * MIN, enviadoAt: AHORA - 1 * MIN } })).toca);
const pedidoOk = { telefono_chat: "573001112233", fecha: new Date(AHORA - 24 * MIN).toISOString() };
chequear("ya hay un pedido confirmado después del cuadro (un 'Okey' que sí confirmó) → no", !ev(chat(), [pedidoOk]).toca);
const pedidoSin = { ...pedidoOk, sin_confirmar: true };
chequear("🔑 solo un pedido SIN CONFIRMAR, aunque c.compro esté prendido → SÍ toca",
  ev(chat({ compro: true }), [pedidoSin]).toca);
chequear("c.compro prendido sin pedidos nuevos (compró antes) → no", !ev(chat({ compro: true }), []).toca);
chequear("un pedido anulado no cuenta como compra", ev(chat(), [{ ...pedidoOk, anulado: true }]).toca);
chequear("el pedido de OTRO teléfono no cuenta", ev(chat(), [{ ...pedidoOk, telefono_chat: "573009998877" }]).toca);
const noche = Date.parse("2026-11-25T04:30:00Z"); // 23:30 en Bogotá
const cNoche = chat(); cNoche.messages.forEach((m) => (m.at += noche - AHORA));
chequear("de noche (23:30 Bogotá) no se manda", !ev(cNoche, [], noche).toca, ev(cNoche, [], noche).motivo);
chequear("sin cuadro → no", !ev({ messages: [{ role: "assistant", content: "hola", at: AHORA - 30 * MIN }] }).toca);

// ── el texto
const t = rc.textoDelRescate(CUADRO);
chequear("usa el primer nombre del cuadro", t.startsWith("Ana, ¿quedó todo bien"), t);
chequear("pide SÍ CONFIRMO y ofrece ajustar datos", /SÍ CONFIRMO/.test(t) && /cambiar algo/.test(t));
chequear("dice que paga al recibir si el cuadro es contraentrega", /pagás cuando te llegue/.test(t));
chequear("no lo dice si el cuadro es pago anticipado",
  !/pagás cuando te llegue/.test(rc.textoDelRescate(CUADRO.replace("Total a pagar al recibir", "Pago anticipado"))));
chequear("sin nombre legible, arranca con la pregunta", rc.textoDelRescate("📋 *Confirmemos tu pedido:*").startsWith("¿quedó"));
chequear("⛔ NO dice 'Confirmemos tu pedido' (sería un cuadro nuevo para confirmacion.js)", !/confirmemos tu pedido/i.test(t));
chequear("⛔ no promete nada que promesas.js prohíba", promesas.revisar(t, {}).ok, JSON.stringify(promesas.revisar(t, {}).hallazgos));
chequear("es corto (menos de 300 caracteres)", t.length < 300, String(t.length));
const conRescate = chat().messages.concat([{ role: "assistant", content: t, at: AHORA }, { role: "user", content: "Sí confirmo", at: AHORA + MIN }]);
chequear("después del rescate, un 'Sí confirmo' sigue confirmando el cuadro", estadoDeConfirmacion(conRescate) === "si");

// ── la pasada completa, con el store de verdad y sin duplicados
(async () => {
  const TEL = "573001112233", OTRO = "573004445566";
  const convs = { [TEL]: chat(), [OTRO]: chat({}, 5) };
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs));
  fs.writeFileSync(path.join(DIR, "orders.json"), "[]");

  const r1 = await rc.correr({ ahora: AHORA });
  chequear("la pasada manda 1 (el de 25 min, no el de 5)", r1.enviados === 1 && enviados.length === 1 && enviados[0].to === TEL, JSON.stringify(r1));
  const c = store.getConv(TEL);
  chequear("queda anotado el rescate de ese cuadro", c.rescateCuadro && c.rescateCuadro.cuadroAt === AHORA - 25 * MIN);
  chequear("el mensaje queda en el historial (el panel y el bot lo ven)",
    c.messages.some((m) => m.role === "assistant" && m.por === "rescate_cuadro"));
  const r2 = await rc.correr({ ahora: AHORA + 10 * MIN });
  chequear("la segunda pasada NO lo repite", r2.enviados === 0 && enviados.length === 1, JSON.stringify(r2));
  chequear("reclamar dos veces el mismo cuadro: la segunda falla", store.reclamarRescateCuadro(TEL, AHORA - 25 * MIN) === false);

  // ── el toque de 2 h del seguimiento se salta
  const seg = require("./src/seguimiento");
  const H = 60 * MIN;
  const rescatado = { ultimoDelCliente: AHORA - 3 * H, rescateCuadro: { cuadroAt: AHORA - 3 * H, enviadoAt: AHORA - 2.6 * H } };
  chequear("rescatado y callado: el toque de 2 h NO sale",
    rc.rescatadoSinRespuesta(rescatado) === true);
  chequear("si contestó después del rescate, vuelve al seguimiento normal",
    rc.rescatadoSinRespuesta({ ...rescatado, ultimoDelCliente: AHORA - 2 * H }) === false);
  const src = fs.readFileSync(path.join(__dirname, "src", "seguimiento.js"), "utf8");
  chequear("seguimiento.js consulta el rescate solo para el paso 1",
    /p\.n === 1 && c && require\("\.\/rescate-cuadro"\)\.rescatadoSinRespuesta\(c\)/.test(src));
  chequear("seg.PASOS sigue teniendo el paso 1 a las 2 h", seg.PASOS[0].n === 1 && seg.PASOS[0].desde === 2 * H);

  // ── interruptores
  chequear("apagado si el seguimiento está apagado", rc.activo({ SEGUIMIENTO_ACTIVO: "0" }) === false);
  chequear("RESCATE_CUADRO=0 lo apaga", rc.activo({ SEGUIMIENTO_ACTIVO: "1", RESCATE_CUADRO: "0" }) === false);
  chequear("prendido por defecto con el seguimiento", rc.activo({ SEGUIMIENTO_ACTIVO: "1" }) === true);

  const d = rc.diagnostico();
  chequear("el diagnóstico cuenta 1 enviado y 0 confirmados", d.enviados === 1 && d.confirmaron === 0, JSON.stringify(d));

  const server = fs.readFileSync(path.join(__dirname, "src", "server.js"), "utf8");
  chequear("server.js arranca el reloj y lo muestra en /seguimiento",
    /rescateCuadro\.arrancar\(\)/.test(server) && /rescate_cuadro: rescateCuadro\.diagnostico\(\)/.test(server));
  const aud = fs.readFileSync(path.join(__dirname, "src", "panel-auditoria.js"), "utf8");
  chequear("/auditoria cuenta solo los cuadros de HOY", /RE_CUADRO\.test\(String\(m\.content \|\| ""\)\) && Number\.isFinite\(m\.at\) && diaBogota\(m\.at\) === hoy/.test(aud));

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal ? 1 : 0);
})();
