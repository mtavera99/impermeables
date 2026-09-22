// ---------------------------------------------------------------------------
// SEGUIMIENTO A LOS QUE NO COMPRARON — la ventana gratis de 72 horas
// Ver seccion 0-BC del archivo madre.
//
// POR QUE ESTO ES GRATIS
// Cuando un cliente llega por un anuncio Click-to-WhatsApp y el negocio le
// responde dentro de las primeras 24h, Meta abre una "free entry point window"
// de 72 HORAS. Dentro de esa ventana, TODO lo que se le mande no se cobra,
// incluidas las plantillas de marketing. Todo el trafico de BikerPro entra por
// Click-to-WhatsApp, asi que estos seguimientos cuestan $0.
//
// LAS DOS VENTANAS, QUE NO SON LA MISMA (esto es lo que casi nadie separa)
//   ventana de SERVICIO (24h desde el ultimo mensaje DEL CLIENTE):
//       mientras esta abierta se puede mandar TEXTO LIBRE.
//   ventana GRATIS del anuncio (72h):
//       define si se COBRA o no. Pero pasadas las 24h de servicio,
//       aunque sea gratis, Meta SOLO permite PLANTILLAS APROBADAS.
//
// CONSECUENCIA PRACTICA:
//   Seguimiento 1 (~20h)  -> dentro de las 24h -> texto libre. FUNCIONA HOY, SIN NADA.
//   Seguimiento 2 (~44h)  -> fuera de las 24h  -> necesita PLANTILLA aprobada.
//   Seguimiento 3 (~68h)  -> fuera de las 24h  -> necesita PLANTILLA aprobada.
//
// Por eso el paso 1 se puede prender ya, y los pasos 2 y 3 quedan listos en el
// codigo pero solo se activan cuando existan las plantillas.
// ---------------------------------------------------------------------------

const store = require("./store");
const { sendText, sendTemplate } = require("./whatsapp");

const H = 60 * 60 * 1000;

// Interruptor general. Sin esta variable en 1, no manda NADA.
const ACTIVO = process.env.SEGUIMIENTO_ACTIVO === "1";

// Nombres de las plantillas aprobadas en Meta. Si estan vacias, ese
// seguimiento se salta en silencio en vez de fallar.
// Nombres de las plantillas aprobadas en Meta. El dueño subio
// `seguimiento_impermeable` el 22-sep y sirve para los dos pasos: es el mismo
// mensaje, mandado un dia despues. Si algun dia quiere textos distintos, se
// cambian por variable de entorno sin tocar codigo.
const PLANTILLA_2 = process.env.SEGUIMIENTO_PLANTILLA_2 || "seguimiento_impermeable";
const PLANTILLA_3 = process.env.SEGUIMIENTO_PLANTILLA_3 || "seguimiento_impermeable";

// 🔴 es_CO, NO es. Las plantillas se subieron en "Spanish (COL)", que en la API
// es es_CO. Con "es" Meta RECHAZA el envio aunque la plantilla este aprobada, y
// el error no menciona el idioma: se buscaria el problema en cualquier otra
// parte. Este default ya estaba en "es" y habria hecho fallar los pasos 2 y 3
// en silencio el dia que se prendieran.
const IDIOMA = process.env.SEGUIMIENTO_IDIOMA || "es_CO";

// Los tres momentos. Se dejan con margen para no rozar los limites:
//   20h  -> comodo dentro de las 24h de servicio
//   44h  -> segundo dia
//   68h  -> tercero, antes de que se cierre la ventana de 72h
const PASOS = [
  { n: 1, desde: 20 * H, hasta: 23 * H, tipo: "texto" },
  { n: 2, desde: 44 * H, hasta: 47 * H, tipo: "plantilla", plantilla: PLANTILLA_2 },
  { n: 3, desde: 68 * H, hasta: 71 * H, tipo: "plantilla", plantilla: PLANTILLA_3 }
];

// El texto del seguimiento 1. Va sin presion y le devuelve el argumento que
// mas cierra en el guion: contraentrega, no paga nada por adelantado.
const TEXTO_1 =
  "Hola 👋 Te escribo por el impermeable que estabas mirando.\n\n" +
  "Sigue disponible y recuerda que es *contraentrega*: pagas cuando lo " +
  "tienes en la mano, no antes 🏍️\n\n" +
  "¿Te lo despacho? Si quieres dime tu ciudad y te confirmo el total exacto.";

/** Un cliente entra al seguimiento solo si cumple TODO esto. */
function elegible(phone, c, ahora) {
  if (c.compro) return null;                       // ya compro
  if (c.noMolestar) return null;                   // pidio que no le escriban
  if (c.paused) return null;                       // un humano tomo el chat
  if (!c.ultimoDelCliente) return null;            // nunca escribio
  const hechos = c.seguimientos || 0;
  if (hechos >= 3) return null;                    // ya se le escribio 3 veces

  const edad = ahora - c.ultimoDelCliente;
  if (edad > 72 * H) return null;                  // se cerro la ventana gratis

  const paso = PASOS[hechos];                      // el siguiente que le toca
  if (!paso) return null;
  if (edad < paso.desde || edad > paso.hasta) return null;  // todavia no, o ya paso
  return paso;
}

/** Revisa todas las conversaciones y manda los seguimientos que corresponden. */
async function correrSeguimientos() {
  if (!ACTIVO) return { revisadas: 0, enviados: 0, motivo: "SEGUIMIENTO_ACTIVO no esta en 1" };

  const todas = store.todasLasConversaciones();
  const ahora = Date.now();
  let enviados = 0, saltados = 0;

  for (const [phone, c] of Object.entries(todas)) {
    const paso = elegible(phone, c, ahora);
    if (!paso) continue;

    const horas = ((ahora - c.ultimoDelCliente) / H).toFixed(1);

    if (paso.tipo === "texto") {
      await sendText(phone, TEXTO_1);
      store.registrarSeguimiento(phone);
      enviados++;
      console.log(`[seguimiento ${paso.n}] ${phone} (${horas}h) texto libre enviado`);
    } else {
      if (!paso.plantilla) {
        saltados++;
        console.log(
          `[seguimiento ${paso.n}] ${phone} (${horas}h) SALTADO: ` +
          `falta configurar SEGUIMIENTO_PLANTILLA_${paso.n}. ` +
          `Pasadas las 24h Meta solo acepta plantillas aprobadas.`
        );
        continue;
      }
      await sendTemplate(phone, paso.plantilla, IDIOMA);
      store.registrarSeguimiento(phone);
      enviados++;
      console.log(`[seguimiento ${paso.n}] ${phone} (${horas}h) plantilla '${paso.plantilla}' enviada`);
    }
  }
  return { revisadas: Object.keys(todas).length, enviados, saltados };
}

/** Cuenta cuantos estan esperando cada paso, sin mandar nada. Para diagnostico. */
function diagnostico() {
  const todas = store.todasLasConversaciones();
  const ahora = Date.now();
  const r = {
    total: 0, compraron: 0, noMolestar: 0, enPausa: 0,
    ventanaCerrada: 0, yaCon3: 0, esperandoPaso1: 0, esperandoPaso2: 0,
    esperandoPaso3: 0, enEspera: 0, sinSeguimientoYVencidos: 0
  };
  for (const [, c] of Object.entries(todas)) {
    r.total++;
    if (c.compro) { r.compraron++; continue; }
    if (c.noMolestar) { r.noMolestar++; continue; }
    if (c.paused) { r.enPausa++; continue; }
    if (!c.ultimoDelCliente) continue;
    const edad = ahora - c.ultimoDelCliente;
    const hechos = c.seguimientos || 0;
    if (hechos >= 3) { r.yaCon3++; continue; }
    if (edad > 72 * H) {
      r.ventanaCerrada++;
      if (hechos === 0) r.sinSeguimientoYVencidos++;
      continue;
    }
    const paso = PASOS[hechos];
    if (edad >= paso.desde && edad <= paso.hasta) r[`esperandoPaso${paso.n}`]++;
    else r.enEspera++;
  }
  return r;
}

/** Arranca el reloj. Revisa cada 30 minutos: suficiente para ventanas de horas. */
function arrancar() {
  if (!ACTIVO) {
    console.log("Seguimiento de 72h DESACTIVADO (pon SEGUIMIENTO_ACTIVO=1 para prenderlo)");
    return;
  }
  console.log("Seguimiento de 72h ACTIVO ✅ revisando cada 30 min");
  const tick = () =>
    correrSeguimientos()
      .then((r) => {
        if (r.enviados || r.saltados) console.log("[seguimiento] resumen:", JSON.stringify(r));
      })
      .catch((e) => console.error("[seguimiento] error:", e.message));
  setTimeout(tick, 60 * 1000);          // primera pasada 1 min despues de arrancar
  setInterval(tick, 30 * 60 * 1000);    // y luego cada 30 min
}

module.exports = { arrancar, correrSeguimientos, diagnostico, TEXTO_1 };
