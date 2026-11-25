// ============================================================================
// 📋 RESCATE DEL CUADRO DE CONFIRMACIÓN (24-nov)
//
// QUÉ RESUELVE: el cliente ya dio nombre, celular y dirección, el bot le mandó
// el cuadro "Confirmemos tu pedido", y el cliente no contestó. Hasta hoy el
// primer toque le llegaba a las 2 horas, y con un texto genérico de "¿te quedó
// alguna duda?", como si nunca hubiera dado sus datos.
//
// LO QUE SE MIDIÓ (chats reales del 23-24 nov, 988 conversaciones):
//   · 194 vieron el cuadro y 149 confirmaron. Los que confirman lo hacen RÁPIDO:
//     mediana 0,7 min, y el 92% en menos de 15 min.
//   · Entonces, a los 20 min el que iba a confirmar solo ya confirmó. El que sigue
//     callado se distrajo o tiene una duda: es el momento del toque, y todavía
//     está dentro de la ventana gratis de 24 h (texto libre, sin plantilla).
//   ⚠ El "219 con cuadro / 32 confirmaron" de /auditoria contaba cualquier chat
//     activo hoy que alguna vez tuvo un cuadro (clientes de ayer preguntando por
//     su guía). Ver el arreglo en panel-auditoria.js.
//
// LAS REGLAS (todas en `evaluar`, que es pura y se prueba sola):
//   1. el último cuadro del chat no tiene un SÍ ni un NO después;
//   2. el cliente está callado: el último mensaje es del bot, de hace 20 a 100 min
//      (antes de las 2 h, para no cruzarse con el toque 1 del seguimiento);
//   3. el cuadro es de las últimas 6 h (no se rescata un cuadro viejo);
//   4. no hay un pedido CONFIRMADO de este chat desde el cuadro. Un pedido
//      `sin_confirmar` no cuenta como compra: es justo el caso a rescatar, aunque
//      `c.compro` esté prendido (server.js lo prende con cualquier pedido);
//   5. no está pausado (lo tiene un humano) ni pidió no molestar;
//   6. ese cuadro no se rescató antes (una vez por cuadro, reclamado en el store
//      con comparar-y-guardar antes de enviar);
//   7. de 7:00 a 21:59, hora de Bogotá.
//
// Y después: el toque 1 del seguimiento (2 h) se salta si ya se mandó este
// rescate y el cliente no volvió a escribir. Los de 20 h y 44 h siguen igual.
//
// 🔘 Anda con el seguimiento (SEGUIMIENTO_ACTIVO=1). Se apaga solo con
//    RESCATE_CUADRO=0 en Render.
// ============================================================================

const store = require("./store");
const { sendText } = require("./whatsapp");
const { estadoDeConfirmacion } = require("./confirmacion");

const MIN = 60 * 1000;
const H = 60 * MIN;
const DESDE = 20 * MIN;
const HASTA = 100 * MIN;
const CUADRO_MAX = 6 * H;
const HORA_INICIO = 7;
const HORA_FIN = 22; // hasta las 21:59
const CADA = 10 * MIN;

const APAGADO = new Set(["0", "no", "off", "false", "apagado"]);
function activo(env = process.env) {
  return env.SEGUIMIENTO_ACTIVO === "1" && !APAGADO.has(String(env.RESCATE_CUADRO ?? "1").trim().toLowerCase());
}

const RE_CUADRO = /confirmemos tu pedido/i;
// Respuestas del bot después del cuadro que cambian el caso: pide un dato, pasa a
// una persona o promete escribir.
const RE_NO_ES_CIERRE =
  /\b(pasame|pasa me|regalame|me falta|necesito|nombre completo|direccion|celular|asesor|el equipo|te escribo|te escribimos|le paso|te paso con)\b/;

function plano(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function horaBogota(ms) {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", hour: "numeric", hourCycle: "h23" }).format(
      new Date(ms)
    )
  );
}

/** El último cuadro de confirmación del chat: { i, at, texto } o null. */
function ultimoCuadro(messages) {
  const ms = Array.isArray(messages) ? messages : [];
  for (let i = ms.length - 1; i >= 0; i--) {
    const m = ms[i];
    if (m && m.role === "assistant" && RE_CUADRO.test(String(m.content || ""))) {
      return { i, at: Number(m.at) || 0, texto: String(m.content || "") };
    }
  }
  return null;
}

/**
 * ¿A este chat le toca el rescate ahora?
 * @returns {{toca:boolean, motivo:string, cuadroAt?:number}}
 */
function evaluar(phone, c, pedidos, ahora = Date.now()) {
  const no = (motivo) => ({ toca: false, motivo });
  if (!c) return no("sin conversación");
  if (c.paused) return no("pausado: lo tiene un humano");
  if (c.noMolestar) return no("pidió no molestar");
  const ms = Array.isArray(c.messages) ? c.messages : [];
  const cuadro = ultimoCuadro(ms);
  if (!cuadro) return no("no hay cuadro");
  if (!cuadro.at || ahora - cuadro.at > CUADRO_MAX) return no("el cuadro es viejo");

  const estado = estadoDeConfirmacion(ms);
  if (estado === "si") return no("ya dijo que sí");
  if (estado === "no") return no("dijo que no");

  // 🔑 El cuadro tiene que seguir siendo lo pendiente. Se acepta como mucho UNA
  // pregunta del cliente contestada por el bot ("¿cuándo llega?"). Si después del
  // cuadro el bot volvió a pedir datos, pasó el caso a un asesor o la charla
  // siguió, "¿quedó todo bien en el resumen?" ya no tiene sentido.
  const despues = ms.slice(cuadro.i + 1);
  const delCliente = despues.filter((m) => m && m.role === "user");
  const delBot = despues.filter((m) => m && m.role === "assistant");
  if (delCliente.length > 1 || delBot.length > 1) return no("la conversación siguió después del cuadro");
  if (delCliente.length === 1) {
    const q = String(delCliente[0].content || "").trim();
    if (!/[?¿]/.test(q) && !/^(cuando|cuanto|como|donde|que|cual|tiene|viene|trae|sirve|hay|puedo)\b/i.test(plano(q))) {
      return no("después del cuadro el cliente dijo algo que no es una pregunta");
    }
  }
  if (delBot.length === 1 && RE_NO_ES_CIERRE.test(plano(delBot[0].content))) {
    return no("después del cuadro el bot pidió datos o pasó a un asesor");
  }

  const ultimo = ms[ms.length - 1];
  if (!ultimo || ultimo.role !== "assistant") return no("el último mensaje es del cliente: el bot le contesta");
  const silencio = ahora - (Number(ultimo.at) || 0);
  if (silencio < DESDE) return no("todavía es pronto");
  if (silencio > HASTA) return no("se pasó la ventana del rescate (después sigue el seguimiento normal)");

  if (c.rescateCuadro && Number(c.rescateCuadro.cuadroAt) === cuadro.at) return no("este cuadro ya se rescató");

  // 🔑 La compra se mira en los PEDIDOS, no en el texto ni solo en `c.compro`.
  // Un "Okey" o un "está todo muy bien" ya confirman, y el pedido lo prueba.
  const mios = (pedidos || []).filter(
    (p) => p && String(p.telefono_chat || "") === String(phone) && !p.anulado
  );
  const desdeCuadro = mios.filter((p) => (Date.parse(p.fecha) || 0) >= cuadro.at - 5 * MIN);
  if (desdeCuadro.some((p) => !p.sin_confirmar)) return no("ya tiene el pedido confirmado");
  if (c.compro && !desdeCuadro.some((p) => p.sin_confirmar)) return no("ya compró");

  const hora = horaBogota(ahora);
  if (hora < HORA_INICIO || hora >= HORA_FIN) return no("fuera de horario (7:00 a 21:59)");
  return { toca: true, motivo: "cuadro sin respuesta", cuadroAt: cuadro.at };
}

/** El primer nombre que figura en el cuadro, si se puede leer limpio. */
function nombreDelCuadro(texto) {
  const m = String(texto || "").match(/nombre\s*:\s*\**\s*([A-Za-zÁÉÍÓÚÑáéíóúñ]{2,15})/i);
  if (!m) return "";
  const n = m[1];
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}

/**
 * El mensaje. Corto, sin presión y directo al cierre.
 * ⚠ No dice "Confirmemos tu pedido": eso lo convertiría en un cuadro nuevo para
 *   confirmacion.js. Y no promete despacho "hoy": lo prohíbe promesas.js.
 */
function textoDelRescate(cuadroTexto) {
  const nombre = nombreDelCuadro(cuadroTexto);
  const contraentrega = /al recibir|contraentrega|contra entrega/i.test(cuadroTexto) && !/anticipad/i.test(cuadroTexto);
  return (
    `${nombre ? `${nombre}, ¿` : "¿"}quedó todo bien en el resumen de tu pedido? 🙌\n\n` +
    `Si está correcto, respondeme *SÍ CONFIRMO* y lo paso a despacho` +
    (contraentrega ? `, y pagás cuando te llegue 📦` : ` 📦`) +
    `\nSi hay que cambiar algo (dirección, celular o cantidad), decime y lo ajusto.`
  );
}

let corriendo = false;

async function correr(opciones = {}) {
  const env = opciones.env || process.env;
  if (!opciones.forzar && !activo(env)) return { enviados: 0, motivo: "apagado" };
  if (corriendo) return { enviados: 0, motivo: "otra pasada en curso" };
  corriendo = true;
  const ahora = opciones.ahora || Date.now();
  const r = { revisados: 0, candidatos: 0, enviados: 0, saltados: 0 };
  try {
    const todas = store.todasLasConversaciones();
    // Primero lo barato (sin leer pedidos): solo los chats cuyo último mensaje es
    // un mensaje del bot de hace 20-100 min y que tienen un cuadro.
    const previos = [];
    for (const [phone, c] of Object.entries(todas)) {
      r.revisados++;
      const ms = (c && c.messages) || [];
      const u = ms[ms.length - 1];
      if (!u || u.role !== "assistant") continue;
      const s = ahora - (Number(u.at) || 0);
      if (s < DESDE || s > HASTA) continue;
      if (!ultimoCuadro(ms)) continue;
      previos.push([phone, c]);
    }
    if (!previos.length) return r;
    const pedidos = store.todosLosPedidos();
    for (const [phone, c] of previos) {
      const e = evaluar(phone, c, pedidos, ahora);
      if (!e.toca) continue;
      r.candidatos++;
      // 🔒 Se reclama ANTES de mandar: dos pasadas cruzadas no mandan dos veces.
      if (!store.reclamarRescateCuadro(phone, e.cuadroAt)) {
        r.saltados++;
        continue;
      }
      const texto = textoDelRescate(ultimoCuadro(c.messages).texto);
      const env2 = await sendText(phone, texto);
      if (env2 && env2.ok === false) {
        console.error(
          `🔴 [rescate cuadro] ${phone} NO SE ENTREGÓ: ${JSON.stringify(env2.body?.error || env2.body).slice(0, 180)}. ` +
            "El turno ya quedó consumido: no se reintenta, para no mandarlo doble."
        );
        r.saltados++;
        continue;
      }
      // Queda en el historial: el panel lo muestra y el bot lo ve en el próximo turno.
      store.pushMsg(phone, "assistant", texto, { por: "rescate_cuadro" });
      r.enviados++;
      console.log(`📋 [rescate cuadro] ${phone} rescate enviado (${Math.round((ahora - e.cuadroAt) / MIN)} min después del cuadro)`);
    }
  } finally {
    corriendo = false;
  }
  return r;
}

/** ¿Se le mandó el rescate y el cliente no volvió a escribir? Lo usa seguimiento.js. */
function rescatadoSinRespuesta(c) {
  const r = c && c.rescateCuadro;
  if (!r || !r.enviadoAt) return false;
  return !(Number(c.ultimoDelCliente) > Number(r.enviadoAt));
}

/** Cuántos se rescataron y cuántos terminaron con pedido confirmado. Solo lectura. */
function diagnostico() {
  const todas = store.todasLasConversaciones();
  const pedidos = store.todosLosPedidos();
  let enviados = 0, contestaron = 0, confirmaron = 0;
  for (const [phone, c] of Object.entries(todas)) {
    const r = c && c.rescateCuadro;
    if (!r || !r.enviadoAt) continue;
    enviados++;
    if (Number(c.ultimoDelCliente) > Number(r.enviadoAt)) contestaron++;
    if (
      pedidos.some(
        (p) =>
          p && String(p.telefono_chat || "") === String(phone) && !p.anulado && !p.sin_confirmar &&
          (Date.parse(p.fecha) || 0) >= Number(r.enviadoAt)
      )
    )
      confirmaron++;
  }
  return {
    activo: activo(),
    regla: "cuadro sin SÍ, cliente callado 20-100 min, 7:00-21:59, una vez por cuadro",
    enviados,
    contestaron,
    confirmaron,
    tasaConfirmacion: enviados ? Number(((confirmaron / enviados) * 100).toFixed(1)) : null,
  };
}

function arrancar() {
  if (!activo()) {
    console.log("Rescate del cuadro DESACTIVADO (va con SEGUIMIENTO_ACTIVO=1; RESCATE_CUADRO=0 lo apaga)");
    return;
  }
  console.log("Rescate del cuadro ACTIVO ✅ revisando cada 10 min");
  const tick = () =>
    correr()
      .then((r) => {
        if (r.enviados || r.saltados) console.log("[rescate cuadro] resumen:", JSON.stringify(r));
      })
      .catch((e) => console.error("[rescate cuadro] error:", e.message));
  setTimeout(tick, 2 * MIN);
  setInterval(tick, CADA);
}

module.exports = {
  arrancar,
  correr,
  evaluar,
  textoDelRescate,
  nombreDelCuadro,
  rescatadoSinRespuesta,
  diagnostico,
  activo,
  DESDE,
  HASTA,
};
