/**
 * 🚚 RECORDATORIO PRE-ENTREGA — a quién le toca, por dónde sale, y qué se
 * detecta cuando el cliente contesta.
 *
 *   node test-recordatorio-entrega.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const path = require("path");
const DIR = "/tmp/prueba-recordatorio-entrega";
fs.rmSync(DIR, { recursive: true, force: true });
fs.mkdirSync(DIR, { recursive: true });
process.env.DATA_DIR = DIR;
process.env.RECORDATORIO_ENTREGA_ACTIVO = "1";
process.env.RECORDATORIO_ENTREGA_PLANTILLA = "recordatorio_entrega";

let ok = 0;
let mal = 0;
function chequear(nombre, condicion, detalle) {
  if (condicion) {
    console.log(`✅ ${nombre}`);
    ok++;
  } else {
    console.log(`🔴 ${nombre}${detalle ? `\n     ${detalle}` : ""}`);
    mal++;
  }
}

// 📵 WhatsApp falso: se anota todo lo que se "manda". Va ANTES de cargar el
// módulo, porque recordatorio-entrega.js toma sendText/sendTemplate al cargar.
const wa = require("./src/whatsapp");
let enviados = [];
let respuestaTexto = { ok: true, messageId: "wamid.texto" };
wa.sendText = async (to, body) => {
  enviados.push({ to, via: "texto", body });
  return respuestaTexto;
};
wa.sendTemplate = async (to, nombre, idioma, componentes) => {
  enviados.push({ to, via: "plantilla", nombre, idioma, componentes });
  return { ok: true, messageId: "wamid.plantilla" };
};

const store = require("./src/store");
const rec = require("./src/recordatorio-entrega");

const H = 3600 * 1000;
// Un jueves a las 10:00 hora Colombia (15:00 UTC): dentro del horario.
const AHORA = Date.parse("2026-10-29T15:00:00Z");
const hace = (h) => new Date(AHORA - h * H).toISOString();

function pedido(extra) {
  return {
    id: extra.id,
    fecha: hace(72),
    nombre: "CAROLINA gómez",
    telefono_chat: "573001112233",
    celular: "3001112233",
    ciudad: "Pereira",
    direccion: "Cra 10 # 20-30",
    producto: "impermeable",
    total: 125000,
    pago: "contraentrega",
    guia: "240099887766",
    guiaEnviadaEl: hace(30),
    ...extra,
  };
}

function escribir(orders, convs, guiasEnviadas) {
  fs.writeFileSync(path.join(DIR, "orders.json"), JSON.stringify(orders));
  fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(convs || {}));
  fs.writeFileSync(path.join(DIR, "guias-enviadas.json"), JSON.stringify(guiasEnviadas || {}));
}
const leerPedidos = () => JSON.parse(fs.readFileSync(path.join(DIR, "orders.json"), "utf8"));

(async () => {
  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 1. Quién entra y quién no ──");
  {
    const casos = [
      [pedido({ id: "a" }), true, "contraentrega con guía de hace 30h"],
      [pedido({ id: "b", guiaEnviadaEl: hace(10) }), false, "guía de hace 10h: todavía no"],
      [pedido({ id: "c", guiaEnviadaEl: hace(60) }), false, "guía de hace 60h: ya pasó la ventana"],
      [pedido({ id: "d", guia: "" }), false, "sin guía"],
      [pedido({ id: "e", guia: "SIN-NÚMERO" }), false, "marcado a mano sin número"],
      [pedido({ id: "f", pago: "anticipado" }), false, "pago anticipado: no paga al recibir"],
      [pedido({ id: "g", anulado: true }), false, "anulado"],
      [pedido({ id: "h", recordatorio_entrega: { ok: true } }), false, "ya recibió su recordatorio"],
      [pedido({ id: "i", total: 0 }), false, "sin total"],
    ];
    for (const [p, espera, nombre] of casos) {
      const r = rec.evaluar(p, AHORA);
      chequear(`${nombre} → ${espera ? "le toca" : "no le toca"}`, r.toca === espera, JSON.stringify(r));
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 2. El texto lleva los datos reales del pedido ──");
  {
    escribir([], {}, { "240099887766": { transportadora: "interrapidisimo" } });
    const d = rec.datosDelMensaje(pedido({ id: "a" }));
    const t = rec.textoDelRecordatorio(d);
    chequear("nombre con mayúscula inicial: Carolina", t.startsWith("¡Hola Carolina! 👋"), t.slice(0, 40));
    chequear("valor exacto: *$125.000 COP en efectivo*", t.includes("*$125.000 COP en efectivo*"), t);
    chequear("transportadora leída de la guía enviada", t.includes("de Interrapidísimo"), t);
    chequear("producto del catálogo, no un default", t.includes("BikerPro (Impermeable)"), t);
    chequear("guía y ciudad", t.includes("guía #240099887766") && t.includes("en Pereira"), t);
    chequear("pide dejar el dinero encargado", t.includes("familiar, vecino o en portería"), t);
    const c = rec.componentesDePlantilla(d);
    const params = c[0].parameters.map((x) => x.text);
    chequear(
      "plantilla con 6 variables en orden",
      JSON.stringify(params) ===
        JSON.stringify(["Carolina", "Impermeable", "240099887766", "Interrapidísimo", "Pereira", "$125.000"]),
      JSON.stringify(params)
    );
    const sinDatos = rec.datosDelMensaje(pedido({ id: "z", nombre: "", ciudad: "" }));
    chequear(
      "sin nombre ni ciudad no quedan variables vacías (Meta las rechaza)",
      rec.componentesDePlantilla(sinDatos)[0].parameters.every((x) => x.text.length > 0)
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 3. Ventana cerrada → plantilla; abierta → texto libre ──");
  {
    escribir(
      [
        pedido({ id: "cerrada" }),
        pedido({ id: "abierta", telefono_chat: "573004445566", celular: "3004445566" }),
        pedido({ id: "temprano", telefono_chat: "573007778899", guiaEnviadaEl: hace(5) }),
      ],
      {
        "573001112233": { messages: [], ultimoDelCliente: AHORA - 40 * H },
        "573004445566": { messages: [], ultimoDelCliente: AHORA - 2 * H },
      }
    );
    enviados = [];
    const r = await rec.correr({ ahora: AHORA });
    chequear("salen dos, el de hace 5h espera", r.enviados === 2, JSON.stringify(r));
    const p1 = enviados.find((e) => e.to === "573001112233");
    const p2 = enviados.find((e) => e.to === "573004445566");
    chequear("ventana cerrada → plantilla recordatorio_entrega es_CO", p1 && p1.via === "plantilla" && p1.nombre === "recordatorio_entrega" && p1.idioma === "es_CO");
    chequear("ventana abierta → texto libre", p2 && p2.via === "texto");
    const marcas = leerPedidos();
    chequear(
      "queda anotado en el pedido con la vía",
      marcas.find((p) => p.id === "cerrada").recordatorio_entrega.via === "plantilla" &&
        marcas.find((p) => p.id === "abierta").recordatorio_entrega.ok === true
    );
    const conv = store.getConv("573001112233");
    chequear(
      "el mensaje queda en el historial del chat",
      conv.messages.some((m) => m.tipo === "recordatorio-entrega")
    );

    enviados = [];
    const r2 = await rec.correr({ ahora: AHORA + 30 * 60 * 1000 });
    chequear("la segunda pasada no repite a nadie", r2.enviados === 0 && enviados.length === 0, JSON.stringify(r2));
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 4. Horario y noMolestar ──");
  {
    escribir([pedido({ id: "noche" })], {});
    enviados = [];
    // 02:00 Colombia = 07:00 UTC
    const r = await rec.correr({ ahora: Date.parse("2026-10-29T07:00:00Z") });
    chequear("a las 2 a.m. no manda nada", enviados.length === 0 && /fuera de horario/.test(r.motivo || ""), JSON.stringify(r));
    chequear("8:00 está en horario, 19:00 ya no",
      rec.enHorario(Date.parse("2026-10-29T13:00:00Z")) && !rec.enHorario(Date.parse("2026-10-30T00:00:00Z")));

    escribir([pedido({ id: "nm" })], { "573001112233": { messages: [], noMolestar: true } });
    enviados = [];
    await rec.correr({ ahora: AHORA });
    chequear("al que pidió no ser contactado no se le escribe", enviados.length === 0);
    chequear("y no se le gasta el turno", !leerPedidos()[0].recordatorio_entrega);
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 5. Si la ventana se cerró en el camino (131047), sale por plantilla ──");
  {
    escribir([pedido({ id: "x" })], { "573001112233": { messages: [], ultimoDelCliente: AHORA - 1 * H } });
    enviados = [];
    respuestaTexto = { ok: false, body: { error: { code: 131047 } } };
    const r = await rec.correr({ ahora: AHORA });
    respuestaTexto = { ok: true, messageId: "wamid.texto" };
    chequear("intentó texto y luego plantilla", enviados.map((e) => e.via).join(",") === "texto,plantilla");
    chequear("cuenta como enviado por plantilla", r.porPlantilla === 1 && leerPedidos()[0].recordatorio_entrega.via === "plantilla");
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 6. Qué respuestas son un riesgo de devolución ──");
  {
    const riesgos = [
      ["No tengo la plata todavía", "sin_dinero"],
      ["hasta la quincena tengo el dinero", "sin_dinero"],
      ["no me han pagado, me lo pueden traer el viernes?", "sin_dinero"],
      ["estoy sin efectivo ahorita", "sin_dinero"],
      ["No voy a estar esta semana", "cambio_fecha"],
      ["no hay nadie en la casa hasta el lunes", "cambio_fecha"],
      ["estoy de viaje", "cambio_fecha"],
      ["pueden traerlo la próxima semana?", "cambio_fecha"],
      ["me cambié de dirección", "cambio_direccion"],
      ["ya no vivo ahí, es otra dirección", "cambio_direccion"],
      ["cancelen el pedido por favor", "cancelar"],
      ["ya no lo quiero", "cancelar"],
      ["No lo voy a recibir", "cancelar"],
    ];
    for (const [texto, tipo] of riesgos) {
      const r = rec.clasificarRespuesta(texto);
      chequear(`"${texto}" → ${tipo}`, r && r.tipo === tipo, JSON.stringify(r));
    }
    const tranquilos = [
      "Listo, muchas gracias",
      "ok, tendré el dinero listo",
      "ya tengo la plata lista 👍",
      "perfecto, se lo dejo a mi mamá",
      "sí señor ahí estaré",
      "no hay problema",
      "no estoy segura de la hora pero mi hermana recibe",
      "listo para que no lo devuelvan",
      "gracias, ¿cómo lo rastreo?",
    ];
    for (const texto of tranquilos) {
      const r = rec.clasificarRespuesta(texto);
      chequear(`"${texto}" → sin riesgo`, r === null, JSON.stringify(r));
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 7. La respuesta marca el pedido y avisa una sola vez ──");
  {
    escribir(
      [pedido({ id: "r1", recordatorio_entrega: { ok: true, via: "plantilla", fecha: hace(3) } })],
      {}
    );
    const a = rec.revisarRespuesta("573001112233", "no tengo la plata hasta el viernes", AHORA);
    chequear("detecta y es nuevo", a && a.tipo === "sin_dinero" && a.nuevo === true, JSON.stringify(a && { tipo: a.tipo, nuevo: a.nuevo }));
    chequear("queda en el pedido", leerPedidos()[0].riesgo_entrega[0].tipo === "sin_dinero");
    const b = rec.revisarRespuesta("573001112233", "es que no tengo dinero", AHORA);
    chequear("repetido → no es nuevo (no se avisa dos veces)", b && b.nuevo === false);
    const aviso = rec.avisoParaElDueno("573001112233", "no tengo la plata", a);
    chequear("el aviso trae guía, total y qué hacer", /240099887766/.test(aviso) && /\$125\.000/.test(aviso) && /reprogramar/.test(aviso), aviso);
    chequear("otro teléfono no toca este pedido", rec.revisarRespuesta("573009990000", "no tengo la plata", AHORA) === null);
    chequear("pasadas 72h del recordatorio ya no cuenta", rec.revisarRespuesta("573001112233", "voy a cancelar", AHORA + 80 * H) === null);
  }

  // ──────────────────────────────────────────────────────────────────────────
  console.log("\n── 8. Diagnóstico ──");
  {
    escribir([
      pedido({ id: "d1" }),
      pedido({ id: "d2", guiaEnviadaEl: hace(3) }),
      pedido({ id: "d3", recordatorio_entrega: { ok: true, via: "texto", fecha: hace(20) }, riesgo_entrega: [{ tipo: "cancelar" }] }),
    ]);
    const d = rec.diagnostico(AHORA);
    chequear("1 listo, 1 esperando, 1 enviado, 1 riesgo de cancelar",
      d.listosAhora === 1 && d.esperando === 1 && d.enviados === 1 && d.conRiesgo.cancelar === 1, JSON.stringify(d));
    chequear("los próximos no muestran el teléfono", !JSON.stringify(d.proximos).includes("3001112233"));
  }

  console.log(`\n${ok}/${ok + mal} correctos`);
  process.exit(mal ? 1 : 0);
})();
