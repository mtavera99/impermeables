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

    // ⚠️ Esto va ANTES de reclamar el turno. Si se reclama primero y después se
    // descubre que falta la plantilla, se consume un seguimiento sin mandar nada
    // y el cliente pierde ese toque para siempre.
    if (paso.tipo === "plantilla" && !paso.plantilla) {
      saltados++;
      console.log(
        `[seguimiento ${paso.n}] ${phone} (${horas}h) SALTADO: ` +
          `falta configurar SEGUIMIENTO_PLANTILLA_${paso.n}. ` +
          "Pasadas las 24h Meta solo acepta plantillas aprobadas."
      );
      continue;
    }

    // 🔒 Se reserva el turno ANTES de mandar. Si otra corrida ya lo tomó —el
    // reloj automático y un clic manual pueden cruzarse— esta se retira en vez
    // de mandarle al cliente el mismo mensaje dos veces.
    if (!store.reclamarSeguimiento(phone, c.seguimientos || 0)) {
      saltados++;
      console.log(
        `[seguimiento ${paso.n}] ${phone} SALTADO: otra corrida ya le escribió ` +
          "(el reloj y un envío manual se cruzaron)"
      );
      continue;
    }

    if (paso.tipo === "texto") {
      const r = await sendText(phone, TEXTO_1);
      if (r && r.ok === false) {
        console.error(
          `🔴 [seguimiento ${paso.n}] ${phone} NO SE ENTREGÓ: ${JSON.stringify(r.body?.error || r.body).slice(0, 180)}. ` +
            "El turno ya quedó consumido: se pierde este seguimiento, pero no se manda doble."
        );
      }
      enviados++;
      console.log(`[seguimiento ${paso.n}] ${phone} (${horas}h) texto libre enviado`);
    } else {
      const r = await sendTemplate(phone, paso.plantilla, IDIOMA);
      if (r && r.ok === false) {
        // 🔴 Acá es donde se va a ver si la plantilla tiene variables: Meta la
        // rechaza y el error lo dice. Se registra fuerte porque es el estreno.
        console.error(
          `🔴 [seguimiento ${paso.n}] ${phone} PLANTILLA '${paso.plantilla}' RECHAZADA: ` +
            `${JSON.stringify(r.body?.error || r.body).slice(0, 220)}. ` +
            "Si dice que faltan parámetros, la plantilla tiene variables {{1}} y hay que " +
            "mandarla con componentes. Si habla del idioma, revisar que sea es_CO."
        );
      }
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
  // ==========================================================================
  // 🔴 EL DIAGNÓSTICO NO PERMITÍA COMPROBAR SI SE MANDÓ ALGO (24-sep)
  //
  // El dueño prendió el sistema, abrió /seguimiento/correr y le dio
  // `{"revisadas":353,"enviados":0}`. Conclusión natural: "no funcionó".
  //
  // Pero sí había funcionado: `arrancar()` hace la primera pasada 1 MINUTO
  // después de arrancar, y poner la variable en Render reinicia el servicio. O
  // sea que el reloj automático ya había mandado los 6 antes de que él abriera
  // el enlace a mano. Cuando lo abrió, esos 6 ya tenían `seguimientos = 1` y el
  // paso 2 no les toca hasta las 44h.
  //
  // El problema de fondo: los que ya recibieron 1 o 2 mensajes caían en
  // `enEspera`, mezclados con los que no habían recibido nada. Así no había
  // forma de comprobar que el sistema estuviera mandando — y el log de eventos
  // no sirve porque vive en memoria y se borra en cada despliegue.
  //
  // Ahora se cuenta cuántos recibieron cada cantidad. Eso vive en disco (en la
  // conversación), así que es la prueba permanente de que el sistema anda.
  // ==========================================================================
  const r = {
    total: 0, compraron: 0, noMolestar: 0, enPausa: 0,
    ventanaCerrada: 0, yaCon3: 0, esperandoPaso1: 0, esperandoPaso2: 0,
    esperandoPaso3: 0, enEspera: 0, sinSeguimientoYVencidos: 0,
    // 🔑 La prueba de que se mandó: cuántos llevan 1, 2 o 3 seguimientos.
    recibieron1: 0, recibieron2: 0, recibieron3: 0, mensajesEnviados: 0,
  };
  for (const [, c] of Object.entries(todas)) {
    r.total++;
    // 🔑 Se cuenta ACÁ ARRIBA, antes de cualquier `continue`, porque si no los
    // que ya recibieron seguimientos y además compraron (o pidieron no molestar)
    // desaparecerían del conteo — y son justo los que prueban que sirve.
    const recibidos = Math.min(c.seguimientos || 0, 3);
    if (recibidos >= 1) r[`recibieron${recibidos}`]++;
    r.mensajesEnviados += recibidos;

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

// ============================================================================
// 🔴 LA PANTALLA TIENE QUE DECIR LO QUE EL BOT VA A MANDAR DE VERDAD
//
// DE DÓNDE SALE (24-sep): el dueño abrió /seguimiento y leyó
// `plantilla_2: "(sin configurar)"`. Pero eso NO era cierto: la ruta mostraba
// `process.env.SEGUIMIENTO_PLANTILLA_2` directo, y este módulo tiene un valor
// por defecto en el código (`seguimiento_impermeable`). O sea que la pantalla
// decía "no hay plantilla" mientras el bot estaba listo para mandar una.
//
// Y esa diferencia hace tomar decisiones al revés: él podía prenderlo creyendo
// que los pasos 2 y 3 no iban a hacer nada, y se habrían mandado plantillas a
// clientes reales sin que lo supiera. O al contrario: no prenderlo pensando que
// faltaba configurar algo que ya estaba.
//
// Se exporta la CONFIGURACIÓN EFECTIVA para que la pantalla muestre eso, y de
// paso se dice de dónde sale cada valor (variable de entorno o default).
// ============================================================================
function configuracionEfectiva() {
  return {
    activo: ACTIVO,
    idioma: IDIOMA,
    plantilla_2: PLANTILLA_2 || "(ninguna: el paso 2 se salta)",
    plantilla_3: PLANTILLA_3 || "(ninguna: el paso 3 se salta)",
    // De dónde viene cada uno, para no volver a confundirse.
    origen: {
      plantilla_2: process.env.SEGUIMIENTO_PLANTILLA_2 ? "variable de entorno" : "default del código",
      plantilla_3: process.env.SEGUIMIENTO_PLANTILLA_3 ? "variable de entorno" : "default del código",
      idioma: process.env.SEGUIMIENTO_IDIOMA ? "variable de entorno" : "default del código (es_CO)",
    },
  };
}

module.exports = {
  arrancar,
  correrSeguimientos,
  diagnostico,
  configuracionEfectiva,
  TEXTO_1,
  PASOS,
};
