// ============================================================================
// 🚚 RECORDATORIO PRE-ENTREGA — bajar las devoluciones de contraentrega (29-oct)
//
// DE DÓNDE SALE. Las devoluciones están en 25,8% y la meta es 12-14%. La
// mayoría de los paquetes vuelven por dos motivos que se pueden prevenir:
// el cliente no estaba cuando pasó el mensajero, o no tenía el efectivo.
//
// QUÉ HACE. Entre 24 y 48 horas después de que el pedido recibe su guía, le
// escribe UNA vez al cliente para:
//   1. recordarle que el paquete ya está cerca,
//   2. decirle el valor exacto a pagar en efectivo,
//   3. pedirle que deje el dinero encargado si no va a estar,
// y si el cliente contesta "no tengo la plata", "no voy a estar", "me cambié de
// dirección" o "cancelen", el pedido queda marcado y el dueño recibe un aviso
// por WhatsApp para gestionarlo ese mismo día (ver `revisarRespuesta`).
//
// 🔑 EL DISPARADOR ES `guiaEnviadaEl`, NO UN EVENTO. Ese campo lo escriben los
// tres caminos que le ponen guía a un pedido: el envío desde /guias
// (anotarGuiaEnPedido), "esa guía ya la mandé yo" (marcarDespachadoAMano) y la
// conciliación. Mirar el campo cubre los tres, y además sobrevive a un reinicio
// de Render: si el servicio se cae a la hora del envío, la siguiente pasada lo
// manda igual, porque la ventana es de 24 horas.
//
// ⚠️ LA VENTANA DE 24H DE META. Para cuando toca el recordatorio, a casi todos
// los clientes ya se les cerró la ventana de servicio (la guía se mandó hace un
// día). Entonces:
//   · ventana abierta (el cliente escribió hace < 24h) → texto libre, gratis.
//   · ventana cerrada → PLANTILLA aprobada en Meta, categoría UTILIDAD, con el
//     nombre en RECORDATORIO_ENTREGA_PLANTILLA.
//   · ventana cerrada y sin plantilla → SE SALTA sin gastarle el turno. Mandar
//     texto libre ahí lo rechaza Meta (131047) y el cliente no recibe nada.
//
// 🔘 APAGADO POR DEFECTO. Se prende con RECORDATORIO_ENTREGA_ACTIVO=1 en Render.
// Sin eso no manda nada, y /recordatorio-entrega dice qué haría.
// ============================================================================

const store = require("./store");
const catalogo = require("./catalogo");
const guias = require("./guias");
const { nombreDePlantilla } = require("./seguimiento");
const { sendText, sendTemplate } = require("./whatsapp");

const H = 60 * 60 * 1000;

const ACTIVO = process.env.RECORDATORIO_ENTREGA_ACTIVO === "1";
const PLANTILLA = nombreDePlantilla(
  process.env.RECORDATORIO_ENTREGA_PLANTILLA ?? "",
  "RECORDATORIO_ENTREGA_PLANTILLA"
);
// es_CO y no "es": con "es" Meta rechaza una plantilla subida en Spanish (COL).
const IDIOMA = process.env.RECORDATORIO_ENTREGA_IDIOMA || "es_CO";

// Cuándo se manda, contado desde que el pedido recibió la guía.
const DESDE = 24 * H;
const HASTA = 48 * H;

// Solo en horario decente, hora Colombia. Con una ventana de 24h siempre cae al
// menos una franja de día adentro, así que nadie se queda sin su recordatorio.
const HORA_INICIO = 8;
const HORA_FIN = 19; // hasta las 18:59

// Cuánto tiempo después del recordatorio se lee la respuesta del cliente como
// respuesta AL RECORDATORIO. Pasado esto ya es otra conversación.
const VENTANA_RESPUESTA = 72 * H;

const fmtCOP = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

function horaBogota(ms) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Bogota",
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date(ms))
  );
}

function enHorario(ms) {
  const h = horaBogota(ms);
  return h >= HORA_INICIO && h < HORA_FIN;
}

const esContraentrega = (p) => String((p && p.pago) || "").toLowerCase().startsWith("contra");

/** El número de guía real del pedido, o "" si no tiene (o la marcaron sin número). */
function guiaDe(p) {
  const g = String((p && p.guia) || "").trim();
  return g && g !== "SIN-NÚMERO" ? g : "";
}

function primerNombre(nombre) {
  const w = String(nombre || "").trim().split(/\s+/)[0] || "";
  if (!w) return "";
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

function nombreDelProducto(p) {
  try {
    const ficha = catalogo.de(p.producto);
    if (ficha && ficha.nombreCorto) return ficha.nombreCorto;
  } catch {
    /* sigue con el respaldo */
  }
  return String(p.producto_nombre || "").trim() || "tu compra";
}

function transportadoraDe(guia) {
  try {
    const reg = store.guiaYaEnviada(guia);
    const t = reg && reg.transportadora && guias.TRANSPORTADORAS[reg.transportadora];
    if (t) return t.nombre;
  } catch {
    /* sigue con el respaldo */
  }
  return "la transportadora";
}

/** Los seis datos del mensaje, en el orden de las variables {{1}}..{{6}} de la plantilla. */
function datosDelMensaje(p) {
  const guia = guiaDe(p);
  return {
    nombre: primerNombre(p.nombre) || "cliente",
    producto: nombreDelProducto(p),
    guia,
    transportadora: transportadoraDe(guia),
    ciudad: String(p.ciudad || "").trim() || "tu ciudad",
    valor: fmtCOP(p.total),
  };
}

/** El texto libre (ventana abierta). Es el que se usa también para el historial del chat. */
function textoDelRecordatorio(d) {
  return (
    `¡Hola ${d.nombre}! 👋 Tu pedido BikerPro (${d.producto}) con guía #${d.guia} de ` +
    `${d.transportadora} ya está muy cerca de tu dirección en ${d.ciudad}. 🚚📦\n\n` +
    `⚠️ Te recordamos tener listo el valor exacto de *${d.valor} COP en efectivo* para ` +
    `entregárselo al mensajero cuando llegue a tu puerta.\n\n` +
    `👉 Si no vas a estar en casa en estos días, por favor déjale el dinero encargado a un ` +
    `familiar, vecino o en portería para recibir tu paquete sin contratiempos. ¡Muchas gracias!`
  );
}

// Meta rechaza parámetros con saltos de línea, tabuladores o más de 4 espacios seguidos.
const limpiarParametro = (s) => String(s).replace(/[\n\r\t]+/g, " ").replace(/ {2,}/g, " ").trim();

function componentesDePlantilla(d) {
  return [
    {
      type: "body",
      parameters: [d.nombre, d.producto, d.guia, d.transportadora, d.ciudad, d.valor].map((t) => ({
        type: "text",
        text: limpiarParametro(t),
      })),
    },
  ];
}

/**
 * ¿A este pedido le toca el recordatorio AHORA?
 * @returns {{toca:boolean, motivo:string}} el motivo alimenta el diagnóstico.
 */
function evaluar(p, ahora) {
  if (!p) return { toca: false, motivo: "sin_pedido" };
  if (p.anulado) return { toca: false, motivo: "anulado" };
  if (p.recordatorio_entrega) return { toca: false, motivo: "ya_enviado" };
  if (!guiaDe(p)) return { toca: false, motivo: "sin_guia" };
  if (p.sin_confirmar) return { toca: false, motivo: "sin_confirmar" };
  // Un pedido pagado por adelantado no paga nada al recibir: decirle "tené el
  // efectivo listo" lo confunde y puede hacer que pague dos veces.
  if (!esContraentrega(p)) return { toca: false, motivo: "no_es_contraentrega" };
  if (!(Number(p.total) > 0)) return { toca: false, motivo: "sin_total" };
  const desde = Date.parse(p.guiaEnviadaEl || "");
  if (!Number.isFinite(desde)) return { toca: false, motivo: "sin_fecha_de_guia" };
  const edad = ahora - desde;
  if (edad < DESDE) return { toca: false, motivo: "esperando" };
  if (edad > HASTA) return { toca: false, motivo: "ventana_vencida" };
  if (!guias.destinoDe(p)) return { toca: false, motivo: "sin_destino" };
  return { toca: true, motivo: "listo" };
}

/** Una pasada: manda los recordatorios que tocan. */
async function correr(opciones = {}) {
  const ahora = opciones.ahora || Date.now();
  if (!ACTIVO) return { enviados: 0, motivo: "RECORDATORIO_ENTREGA_ACTIVO no está en 1" };
  if (!opciones.ignorarHorario && !enHorario(ahora)) {
    return { enviados: 0, motivo: `fuera de horario (${HORA_INICIO}:00-${HORA_FIN}:00 Colombia)` };
  }

  const r = { revisados: 0, enviados: 0, porTexto: 0, porPlantilla: 0, fallidos: 0, saltados: 0 };
  for (const p of store.todosLosPedidos()) {
    r.revisados++;
    if (!evaluar(p, ahora).toca) continue;

    const to = guias.destinoDe(p);
    const conv = store.getConv(to);
    // 🛑 Si pidió que no le escriban, se respeta también acá.
    if (conv && conv.noMolestar) {
      r.saltados++;
      continue;
    }
    const ultimo = (conv && conv.ultimoDelCliente) || 0;
    const ventanaAbierta = ultimo > 0 && ahora - ultimo < 24 * H;

    // ⚠️ ANTES de reclamar: sin ventana y sin plantilla no hay forma de que le
    // llegue. Se salta sin gastarle el turno, y le toca en la próxima pasada si
    // el cliente escribe o se configura la plantilla.
    if (!ventanaAbierta && !PLANTILLA) {
      r.saltados++;
      console.log(
        `[recordatorio-entrega] ${p.nombre || "?"} guía ${guiaDe(p)} SALTADO: su ventana de 24h ` +
          "está cerrada y falta RECORDATORIO_ENTREGA_PLANTILLA."
      );
      continue;
    }

    const ref = p.id || p.fecha;
    if (!store.reclamarRecordatorioEntrega(ref)) {
      r.saltados++; // otra pasada ya lo tomó
      continue;
    }

    const d = datosDelMensaje(p);
    const texto = textoDelRecordatorio(d);
    let via = ventanaAbierta ? "texto" : "plantilla";
    let envio = ventanaAbierta
      ? await sendText(to, texto)
      : await sendTemplate(to, PLANTILLA, IDIOMA, componentesDePlantilla(d));

    // Si la ventana se cerró justo entre la lectura y el envío, Meta devuelve
    // 131047. Con plantilla configurada se intenta por ahí: sigue siendo UN
    // mensaje para el cliente, porque el primero no salió.
    if (envio && envio.ok === false && via === "texto" && PLANTILLA && envio.body?.error?.code === 131047) {
      via = "plantilla";
      envio = await sendTemplate(to, PLANTILLA, IDIOMA, componentesDePlantilla(d));
    }

    const ok = Boolean(envio && envio.ok);
    store.anotarRecordatorioEntrega(ref, {
      fecha: new Date(ahora).toISOString(),
      via,
      ok,
      messageId: (envio && envio.messageId) || null,
      ...(ok ? {} : { error: JSON.stringify(envio?.body?.error || envio?.body || "").slice(0, 200) }),
    });

    if (ok) {
      r.enviados++;
      r[via === "texto" ? "porTexto" : "porPlantilla"]++;
      // Al historial, para que el panel lo muestre y la IA sepa de qué habla el
      // cliente si contesta.
      store.pushMsg(to, "assistant", texto, { tipo: "recordatorio-entrega" });
      console.log(`🚚 [recordatorio-entrega] ${p.nombre || "?"} (${to}) guía ${d.guia} por ${via}`);
    } else {
      r.fallidos++;
      console.error(
        `🔴 [recordatorio-entrega] ${p.nombre || "?"} (${to}) guía ${d.guia} NO SALIÓ por ${via}: ` +
          `${JSON.stringify(envio?.body?.error || envio?.body).slice(0, 220)}. ` +
          "El turno queda gastado para no mandarle doble."
      );
    }
  }
  return r;
}

// ============================================================================
// 🗣️ LA RESPUESTA DEL CLIENTE — objetivo 4: detectar el problema el día 1
//
// Se compara sin tildes y en minúscula. El orden importa: cancelar gana sobre
// todo, después la plata, la dirección y por último la fecha.
//
// ⚠️ Esto NO cambia lo que el bot contesta ni pausa el chat: solo marca el
// pedido y avisa al dueño. Qué hacer con un cliente que no tiene la plata es
// decisión del dueño, no del bot.
// ============================================================================
const plano = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const DIAS = "(lunes|martes|miercoles|jueves|viernes|sabado|domingo)";

const REGLAS_RIESGO = [
  {
    tipo: "cancelar",
    etiqueta: "quiere cancelar o no recibir el pedido",
    patron: new RegExp(
      [
        "\\b(cancelar|cancelo|cancelen|cancelalo|cancelenlo|anular|anulen|anulenlo|desisto)\\b",
        "\\bya no (lo |la |los |las )?(quiero|necesito)\\b",
        "\\bno (lo |la |los |las )?(voy a |vamos a )?recibir\\b",
        "\\bno (lo |la |los |las )?recibo\\b",
        "\\b(devuelvanlo|devuelvanla|devuelvanlos)\\b",
      ].join("|")
    ),
  },
  {
    tipo: "sin_dinero",
    etiqueta: "dice que no tiene el dinero",
    patron: new RegExp(
      [
        "\\bno (tengo|tendre|tenemos|tendremos|cuento con|voy a tener|alcanzo a tener|he reunido|tengo todavia|tengo aun)\\b.{0,25}\\b(plata|platica|dinero|efectivo|pesos|con que pagar|para pagar)",
        "\\b(no me han pagado|cuando me paguen|hasta que me paguen)\\b",
        "\\bhasta (la |el )?(quincena|fin de mes|pago|dia de pago)\\b",
        "\\b(estoy|ando|quede) (corto|corta|pelado|pelada|sin plata|sin dinero|sin un peso|sin efectivo)\\b",
        "\\bme falta (plata|dinero|efectivo)\\b",
      ].join("|")
    ),
  },
  {
    tipo: "cambio_direccion",
    etiqueta: "pide cambiar la dirección de entrega",
    patron: new RegExp(
      [
        "\\bcambi\\w* (la |de |mi )?direccion\\b",
        "\\b(otra|nueva) direccion\\b",
        "\\b(me mude|me cambie de casa|me trastee|ya no vivo)\\b",
        "\\bdireccion (esta |quedo |esta )?(mal|equivocada|errada)\\b",
      ].join("|")
    ),
  },
  {
    tipo: "cambio_fecha",
    etiqueta: "no va a estar o pide otra fecha",
    patron: new RegExp(
      [
        // "no estoy segura" o "no estoy de acuerdo" no son ausencias.
        "\\bno (voy a |vamos a )?(estar|estare|estoy|estamos|estaremos|me encuentro|me encontrare)\\b(?! (segur|de acuerdo|interesad|conforme))",
        "\\bno (hay|habra|va a haber) nadie\\b",
        "\\b(estoy|estare|voy a estar|ando|me voy) (de viaje|viajando|fuera|por fuera|afuera)\\b",
        "\\b(viajo|me voy de viaje)\\b",
        "\\bno (lo |la |los )?(puedo|podre|podemos) recibir\\b",
        "\\b(otro dia|la (otra|proxima) semana|cambiar (la )?fecha|mas adelante)\\b",
        `\\b(hasta|desde|para) el ${DIAS}\\b`,
        `\\b(el|este|el otro|el proximo) ${DIAS} (que viene|mejor|si|puedo|estoy)\\b`,
        "\\btrabajo todo el dia\\b",
      ].join("|")
    ),
  },
];

/** @returns {{tipo:string, etiqueta:string}|null} */
function clasificarRespuesta(texto) {
  const t = plano(texto);
  if (!t) return null;
  for (const r of REGLAS_RIESGO) {
    if (r.patron.test(t)) return { tipo: r.tipo, etiqueta: r.etiqueta };
  }
  return null;
}

/**
 * Lo llama el webhook con cada mensaje del cliente. Si contesta un recordatorio
 * reciente con un riesgo, marca el pedido.
 *
 * @returns {null | {pedido:object, tipo:string, etiqueta:string, nuevo:boolean}}
 *   `nuevo` = primera vez que aparece ese riesgo en ese pedido → avisar al dueño.
 */
function revisarRespuesta(phone, texto, ahora = Date.now()) {
  if (!phone || !texto) return null;
  const riesgo = clasificarRespuesta(texto);
  if (!riesgo) return null;

  // El pedido más nuevo de este chat con un recordatorio entregado hace poco.
  const pedido = store.todosLosPedidos().find((p) => {
    const rec = p && p.recordatorio_entrega;
    if (!rec || !rec.ok || p.telefono_chat !== phone) return false;
    const cuando = Date.parse(rec.fecha || "");
    return Number.isFinite(cuando) && ahora - cuando >= 0 && ahora - cuando <= VENTANA_RESPUESTA;
  });
  if (!pedido) return null;

  const nuevo = store.marcarRiesgoDeEntrega(pedido.id || pedido.fecha, {
    tipo: riesgo.tipo,
    texto: String(texto).slice(0, 300),
  });
  return { pedido, ...riesgo, nuevo };
}

const QUE_HACER = {
  cancelar: "Llamalo hoy antes de que el paquete llegue: si de verdad no lo quiere, pedile a la transportadora que lo retenga.",
  sin_dinero: "Preguntale qué día tiene la plata y pedí a la transportadora reprogramar la entrega para ese día.",
  cambio_direccion: "Pedile la dirección nueva completa y solicitá el cambio a la transportadora hoy mismo.",
  cambio_fecha: "Pedile qué día y quién puede recibir, y reprogramá con la transportadora.",
};

/** El aviso al dueño. */
function avisoParaElDueno(phone, texto, hallazgo) {
  const p = hallazgo.pedido;
  return (
    `⚠️ RIESGO DE DEVOLUCIÓN: ${p.nombre || "?"} (${phone})\n` +
    `Guía ${guiaDe(p) || "?"} · ${p.ciudad || "?"} · ${fmtCOP(p.total)}\n\n` +
    `Contestó el recordatorio de entrega:\n"${String(texto).slice(0, 200)}"\n\n` +
    `Motivo: ${hallazgo.etiqueta}.\n👉 ${QUE_HACER[hallazgo.tipo] || "Revisalo hoy."}`
  );
}

/** Cuenta, sin mandar nada. Para /recordatorio-entrega. */
function diagnostico(ahora = Date.now()) {
  const r = {
    ahora_en_horario: enHorario(ahora),
    listosAhora: 0,
    esperando: 0,
    enviados: 0,
    porTexto: 0,
    porPlantilla: 0,
    fallidos: 0,
    conRiesgo: { cancelar: 0, sin_dinero: 0, cambio_direccion: 0, cambio_fecha: 0 },
    noAplica: {},
    // Los que tocan ahora, sin teléfono: alcanza para reconocerlos.
    proximos: [],
  };
  for (const p of store.todosLosPedidos()) {
    const rec = p.recordatorio_entrega;
    if (rec) {
      if (rec.ok) {
        r.enviados++;
        r[rec.via === "texto" ? "porTexto" : "porPlantilla"]++;
      } else if (rec.fecha) {
        r.fallidos++;
      }
    }
    for (const x of Array.isArray(p.riesgo_entrega) ? p.riesgo_entrega : []) {
      if (x && r.conRiesgo[x.tipo] != null) r.conRiesgo[x.tipo]++;
    }
    const e = evaluar(p, ahora);
    if (e.toca) {
      r.listosAhora++;
      if (r.proximos.length < 30) {
        r.proximos.push({ nombre: p.nombre || "?", guia: guiaDe(p), ciudad: p.ciudad || "", total: fmtCOP(p.total) });
      }
    } else if (e.motivo === "esperando") {
      r.esperando++;
    } else if (e.motivo !== "ya_enviado") {
      r.noAplica[e.motivo] = (r.noAplica[e.motivo] || 0) + 1;
    }
  }
  return r;
}

function configuracionEfectiva() {
  return {
    activo: ACTIVO
      ? "🟢 ACTIVO"
      : "🔴 APAGADO — poné RECORDATORIO_ENTREGA_ACTIVO=1 en Render para prenderlo",
    plantilla: PLANTILLA
      ? `🟢 "${PLANTILLA}" (${IDIOMA}) para los clientes con la ventana de 24h cerrada`
      : process.env.RECORDATORIO_ENTREGA_PLANTILLA
        ? `🔴 RECORDATORIO_ENTREGA_PLANTILLA="${process.env.RECORDATORIO_ENTREGA_PLANTILLA}" no es un nombre ` +
          "de plantilla válido (solo minúsculas, números y guión bajo): se ignora"
        : "🟡 sin plantilla — solo les llega a los que escribieron en las últimas 24h. " +
          "Creá la plantilla en Meta y poné RECORDATORIO_ENTREGA_PLANTILLA",
    cuando: `entre ${DESDE / H}h y ${HASTA / H}h después de cargar la guía, de ${HORA_INICIO}:00 a ${HORA_FIN}:00 (Colombia)`,
  };
}

function arrancar() {
  if (!ACTIVO) {
    console.log("Recordatorio pre-entrega DESACTIVADO (pon RECORDATORIO_ENTREGA_ACTIVO=1 para prenderlo)");
    return;
  }
  console.log(
    `Recordatorio pre-entrega ACTIVO ✅ revisando cada 30 min · plantilla: ${PLANTILLA || "(ninguna)"}`
  );
  const tick = () =>
    correr()
      .then((r) => {
        if (r.enviados || r.fallidos || r.saltados) console.log("[recordatorio-entrega] resumen:", JSON.stringify(r));
      })
      .catch((e) => console.error("[recordatorio-entrega] error:", e.message));
  setTimeout(tick, 2 * 60 * 1000);
  setInterval(tick, 30 * 60 * 1000);
}

module.exports = {
  arrancar,
  correr,
  evaluar,
  diagnostico,
  configuracionEfectiva,
  clasificarRespuesta,
  revisarRespuesta,
  avisoParaElDueno,
  datosDelMensaje,
  textoDelRecordatorio,
  componentesDePlantilla,
  enHorario,
};
