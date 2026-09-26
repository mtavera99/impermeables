// Almacenamiento simple en archivos JSON (suficiente para el MVP).
// Guarda conversaciones, pedidos y estado de "pausa" (cuando un humano toma el chat).
const fs = require("fs");
const path = require("path");

// ============================================================================
// 🔴 DÓNDE SE GUARDAN LOS DATOS — LO MÁS IMPORTANTE DE ESTE ARCHIVO
//
// Por defecto esto escribe en `bot/data`, que en Render vive en el disco del
// contenedor y es EFÍMERO: cada despliegue lo borra. Con eso se perdían las
// conversaciones Y LOS PEDIDOS.
//
// ✅ LA SOLUCIÓN: un DISCO PERSISTENTE de Render montado en /var/data, y
//    DATA_DIR=/var/data en las variables de entorno. El disco sobrevive a los
//    despliegues, los reinicios y los cambios de código.
//
// Cómo se configura (una sola vez):
//   Render → el servicio → Settings → Disks → Add Disk
//     Name: datos · Mount Path: /var/data · Size: 1 GB
//   Y en Environment: DATA_DIR=/var/data
//
// ⚠️ Si DATA_DIR no está puesto, el bot arranca igual pero AVISA en el log que
//    los datos son temporales. No falla en silencio.
// ============================================================================
const DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");

if (!process.env.DATA_DIR) {
  console.warn(
    "⚠️  DATA_DIR no está configurado: los pedidos se guardan en disco EFÍMERO y " +
      "se borran en el próximo despliegue. Montá un disco persistente en Render y " +
      "poné DATA_DIR=/var/data."
  );
} else {
  // Neutral a propósito: acá todavía no se sabe si hay un disco montado, solo
  // que la variable está puesta. La comprobación de verdad la hace
  // estadoDelDisco() al arrancar. Antes esta línea decía "disco persistente" y
  // era la misma mentira que el aviso del panel.
  console.log(`💾 Datos en: ${DIR} (sin comprobar todavía si es un disco montado)`);
}
const CONV_FILE = path.join(DIR, "conversations.json");
const ORDERS_FILE = path.join(DIR, "orders.json");
const GUIAS_FILE = path.join(DIR, "guias-enviadas.json");
const FALLOS_FILE = path.join(DIR, "fallos-entrega.json");
const PLANES_FILE = path.join(DIR, "planes.json");
const MARCADOR_FILE = path.join(DIR, "marcador-disco.json");

const MAX_MSGS = 24; // historial máximo por cliente que enviamos a la IA

function ensure() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  if (!fs.existsSync(CONV_FILE)) fs.writeFileSync(CONV_FILE, "{}");
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]");
  if (!fs.existsSync(GUIAS_FILE)) fs.writeFileSync(GUIAS_FILE, "{}");
}
// ============================================================================
// 🔴 POR QUÉ LA LECTURA Y LA ESCRITURA SON MÁS LARGAS DE LO QUE PARECE
//
// Estas dos funciones eran una línea cada una, y entre las dos había un camino
// que borraba los pedidos SIN UNA SOLA LÍNEA DE LOG. Los dos bugs son
// independientes del disco de Render: pasan igual con el disco montado.
//
//   1. writeFileSync NO es atómico. Render manda SIGTERM en cada despliegue y
//      el proceso puede morir A MITAD de escribir. El archivo queda TRUNCADO.
//   2. Un JSON truncado no parsea, y readJSON devolvía el fallback EN SILENCIO
//      (un [] vacío). El bot seguía como si no hubiera pedidos, y el siguiente
//      writeJSON PISABA el archivo con esa lista vacía.
//
// O sea: los datos se perdían dos veces, y la segunda era la definitiva.
// Se arregla de los dos lados: rename atómico al escribir, y al leer nunca
// tirar a la basura un archivo que existe pero no se entiende.
// ============================================================================

function readJSON(file, fallback) {
  let crudo;
  try {
    crudo = fs.readFileSync(file, "utf8");
  } catch {
    // No existe todavía: es lo normal la primera vez. No hay nada que avisar.
    return fallback;
  }
  try {
    return JSON.parse(crudo);
  } catch (e) {
    // El archivo EXISTE pero está corrupto (truncado a mitad de escritura, casi
    // siempre). Antes esto devolvía el fallback calladito. Ahora se guarda una
    // copia intacta ANTES de que el próximo writeJSON la pise, y se grita.
    const roto = `${file}.roto-${Date.now()}`;
    try {
      fs.copyFileSync(file, roto);
    } catch (e2) {
      console.error(`🔴 Tampoco se pudo respaldar el archivo corrupto: ${e2.message}`);
    }
    console.error(
      `🔴 ${path.basename(file)} ESTÁ CORRUPTO y no se pudo leer (${e.message}).\n` +
        `   Copia sin tocar en: ${roto}\n` +
        "   Los pedidos también están en el log como PEDIDO_JSON: se recuperan de ahí.\n" +
        "   ⚠️ El bot sigue atendiendo, pero arranca con la lista vacía."
    );
    return fallback;
  }
}

function writeJSON(file, data) {
  // Escritura ATÓMICA: se escribe completo en un temporal y después se cambia
  // el nombre. rename() dentro del mismo sistema de archivos es atómico, así
  // que el archivo final NUNCA existe a medias. Si el proceso muere a mitad, lo
  // que queda incompleto es el .tmp, y el bueno sigue intacto.
  const tmp = `${file}.tmp`;
  const texto = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(tmp, texto);
    fs.renameSync(tmp, file);
  } catch (e) {
    // Si falla el rename, limpiar el temporal para no dejar basura acumulándose
    // en el disco (que es de 1 GB y pago).
    try { fs.unlinkSync(tmp); } catch {}
    throw e;
  }
}

function getConv(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  return all[phone] || { messages: [], paused: false };
}
// ============================================================================
// 👤 QUIÉN CONTESTÓ: EL BOT O EL DUEÑO (25-sep)
//
// DE DÓNDE SALE, en palabras del dueño:
//
//   "hay muchos chats que ya los abrí y yo les respondí, entonces debería haber
//    un sistema para saber qué he hecho yo, ya entré, y tu intervención también"
//
// 🔴 EL PROBLEMA ERA QUE NO SE PODÍA SABER. `/responder` guardaba la respuesta
// del dueño con `role: "assistant"`, exactamente igual que las del bot, así que
// en el historial las dos son indistinguibles. Sin eso no hay forma de calcular
// "este chat ya lo atendí" ni de mostrar quién hizo qué.
//
// 🔑 POR QUÉ NO SE CAMBIA EL `role`: ese campo va tal cual a la IA, y los roles
// válidos son "user" y "assistant". Meter un "human" rompería la llamada al
// modelo. Así que el rol NO se toca y la marca va en un campo aparte, `por`.
// Para la IA sigue siendo el negocio hablando, que es lo correcto: el bot tiene
// que ver lo que dijo el dueño para no repetirlo ni contradecirlo.
// ============================================================================
function pushMsg(phone, role, content, extra) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.messages.push({ role, content, at: Date.now(), ...(extra || null) });
  // Si contestó una persona, se anota aparte del historial de mensajes: ese
  // historial está topeado en MAX_MSGS y se va recortando, y la marca de "ya lo
  // atendí" no puede desaparecer porque el cliente escribió 24 mensajes.
  if (extra && extra.por === "humano") {
    c.ultimaRespuestaHumana = Date.now();
  }
  if (c.messages.length > MAX_MSGS) c.messages = c.messages.slice(-MAX_MSGS);
  // Marca de tiempo del ULTIMO mensaje DEL CLIENTE. De aqui salen las dos ventanas:
  //   - 24h: mientras este abierta se puede escribir texto libre
  //   - 72h: la ventana gratis que abre el anuncio Click-to-WhatsApp
  if (role === "user") {
    c.ultimoDelCliente = Date.now();
    // 📊 ANTES de reiniciar el contador: si había un seguimiento esperando
    // respuesta, ESTE mensaje es la respuesta. Se anota en el historial
    // acumulativo (que no se borra) y se cierra la espera para no contarlo dos
    // veces si el cliente manda varios mensajes seguidos.
    if (c.segEsperaRta) {
      c.segRespondio = c.segRespondio || {};
      c.segRespondio[c.segEsperaRta] = (c.segRespondio[c.segEsperaRta] || 0) + 1;
      delete c.segEsperaRta;
    }
    // si el cliente vuelve a escribir, el contador de seguimientos se reinicia:
    // ya no es un lead frio, esta conversando otra vez
    c.seguimientos = 0;
  }
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

/**
 * Borra una conversación. La usa el endpoint /probar para arrancar un caso de
 * prueba desde cero sin arrastrar el historial de la prueba anterior.
 * ⚠️ Solo se invoca con teléfonos ficticios ("prueba-*"): no se usa para
 * borrar clientes reales.
 */
function borrarConversacion(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  delete all[phone];
  writeJSON(CONV_FILE, all);
}

// ---------------------------------------------------------------------------
// SEGUIMIENTO DE LOS QUE NO COMPRARON (ventana gratis de 72h · seccion 0-BC)
// ---------------------------------------------------------------------------

/** Marca que este cliente ya hizo pedido: no se le vuelve a escribir. */
function marcarComprado(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.compro = true;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

/** Registra que se le mandó un seguimiento (para no repetir ni pasarse de 3). */
function registrarSeguimiento(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.seguimientos = (c.seguimientos || 0) + 1;
  c.ultimoSeguimiento = Date.now();
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

// ============================================================================
// 🔴 RECLAMAR EL TURNO ANTES DE MANDAR, NO DESPUÉS
//
// DE DÓNDE SALE (24-sep): el seguimiento mandaba primero y registraba después:
//
//     await sendText(phone, TEXTO_1);      // ~1 segundo de red
//     store.registrarSeguimiento(phone);   // recién acá queda anotado
//
// Durante ese segundo, el cliente sigue apareciendo como "no le hemos escrito".
// Si otra corrida entra en esa ventana, le manda el MISMO mensaje otra vez.
//
// Y no es hipotético: el dueño abrió /seguimiento/correr a mano mientras el reloj
// automático corre cada 30 minutos, y en los logs de esa noche aparecieron dos
// identificadores de instancia distintos. Con dos procesos leyendo el mismo disco,
// los dos ven `seguimientos: 0` y los dos mandan.
//
// Un cliente que recibe el mismo mensaje de marketing dos veces es una queja y un
// golpe a la calificación del número — que es lo único que no se puede comprar de
// vuelta.
//
// LA SOLUCIÓN: comparar-y-guardar. Se exige que el contador esté EXACTAMENTE en
// el valor esperado; si otra corrida ya lo subió, esta se retira sin mandar.
//
// ⚠️ No es un candado perfecto (no hay bloqueo de archivo), pero reduce la ventana
// de riesgo de ~1 segundo de red a unos milisegundos de disco.
//
// ⚠️ Y SE RECLAMA ANTES DE MANDAR A PROPÓSITO: si el envío falla después, se
// pierde UN seguimiento. Eso es mucho más barato que mandarlo dos veces.
// ============================================================================

/**
 * Reserva el turno de seguimiento si nadie más lo tomó.
 * @param {string} phone
 * @param {number} esperados cuántos seguimientos creíamos que tenía
 * @returns {boolean} true si quedó reservado para nosotros
 */
function reclamarSeguimiento(phone, esperados, paso) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone];
  if (!c) return false;
  if ((c.seguimientos || 0) !== esperados) return false; // otra corrida se adelantó
  c.seguimientos = esperados + 1;
  c.ultimoSeguimiento = Date.now();

  // ==========================================================================
  // 📊 EL REGISTRO PARA MEDIR — SEPARADO DEL CONTADOR, Y NO SE BORRA
  //
  // `seguimientos` NO sirve para medir: cuando el cliente contesta se reinicia a
  // 0 (ver pushMsg), porque deja de ser un lead frío. Eso está bien para decidir
  // a quién escribirle, pero para medir es al revés: borra justo a los que SÍ
  // respondieron, o sea los éxitos. Medir con ese contador daría que el
  // seguimiento no sirve nunca.
  //
  // Así que el historial va aparte y es acumulativo:
  //   segPorPaso ....... cuántas veces se mandó cada paso
  //   segPasoReciente .. el último paso que se le mandó (para atribuir la venta)
  //   segEsperaRta ..... paso pendiente de saber si contestó (pushMsg lo resuelve)
  // ==========================================================================
  const n = Number(paso) || 0;
  if (n >= 1) {
    c.segPorPaso = c.segPorPaso || {};
    c.segPorPaso[n] = (c.segPorPaso[n] || 0) + 1;
    c.segPasoReciente = n;
    c.segEsperaRta = n;
  }

  all[phone] = c;
  writeJSON(CONV_FILE, all);
  return true;
}

/** Anota que este cliente compró después del paso N de seguimiento. */
function marcarCompraDeSeguimiento(phone, paso) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone];
  if (!c) return;
  c.segCompro = c.segCompro || {};
  c.segCompro[paso] = (c.segCompro[paso] || 0) + 1;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

/**
 * Cuenta, sumando todas las conversaciones, qué pasó con cada paso.
 * Es la respuesta a "¿sirve el seguimiento, y cuál de los toques sirve?".
 */
function estadisticasSeguimiento() {
  ensure();
  const todas = readJSON(CONV_FILE, {});
  const r = {};
  for (const n of [1, 2, 3]) r[n] = { enviados: 0, respondieron: 0, compraron: 0 };
  for (const k in todas) {
    const c = todas[k] || {};
    const porPaso = c.segPorPaso || {};
    for (const n of [1, 2, 3]) {
      if (porPaso[n]) r[n].enviados += porPaso[n];
      if (c.segRespondio && c.segRespondio[n]) r[n].respondieron += c.segRespondio[n];
      if (c.segCompro && c.segCompro[n]) r[n].compraron += c.segCompro[n];
    }
  }
  for (const n of [1, 2, 3]) {
    const p = r[n];
    p.tasaRespuesta = p.enviados ? Math.round((p.respondieron / p.enviados) * 1000) / 10 : 0;
    p.tasaCompra = p.enviados ? Math.round((p.compraron / p.enviados) * 1000) / 10 : 0;
  }
  return r;
}

/**
 * Guarda el nombre y el username del cliente.
 *
 * 🔑 Importa sobre todo para los clientes con username (sin teléfono): su clave
 * de conversación es un BSUID como "CO.1098944123092301". Sin el nombre, el
 * panel le muestra eso al dueño y no hay forma de saber con quién habla.
 */
function guardarPerfil(phone, perfil) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.perfil = { ...(c.perfil || {}), ...perfil };
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

// ============================================================================
// 🎯 DE QUÉ ANUNCIO VINO EL CLIENTE (atribución de Meta Ads)
//
// Meta ya manda esto GRATIS en el webhook, en `messages[].referral`, y hasta hoy
// se tiraba a la basura. Con esto se pasa de "este anuncio trae conversaciones
// baratas" a "este anuncio trae VENTAS", que es la única pregunta que decide
// dónde poner el presupuesto.
//
// 🔑 EL DETALLE QUE HACE FALTA ENTENDER: el referral llega SOLO en el primer
// mensaje después del clic en el anuncio. Los siguientes mensajes del mismo
// cliente NO lo traen. Y el pedido se cierra varios mensajes después. Por eso
// hay que guardarlo en la CONVERSACIÓN cuando llega, y copiarlo al pedido
// cuando se cierra: si se leyera del mensaje que trae el pedido, siempre
// vendría vacío.
//
// Se guarda el PRIMERO (el anuncio que trajo al cliente, que es lo que se
// paga) y aparte el ÚLTIMO si después entra por otro anuncio distinto. Los dos
// sirven para cosas distintas y no se pisan.
// ============================================================================
function guardarAtribucion(phone, anuncio) {
  if (!phone || !anuncio || !anuncio.source_id) return;
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  const registro = { ...anuncio, visto: Date.now() };

  if (!c.anuncio) {
    c.anuncio = registro; // primer toque: el que trajo al cliente
  } else if (c.anuncio.source_id !== anuncio.source_id) {
    // Volvió por otro anuncio. No se pisa el primero: el cliente se paga una
    // vez, pero saber que volvió a hacer clic también dice algo.
    c.anuncioUltimo = registro;
  }

  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

/** El anuncio que trajo a este cliente, o null. Lo usa saveOrder. */
function atribucionDe(phone) {
  if (!phone) return null;
  const c = getConv(phone);
  return c.anuncio || null;
}

/** Marca que el cliente pidió que no le escriban más. Se respeta para siempre. */
function marcarNoMolestar(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.noMolestar = true;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}

/** Devuelve todas las conversaciones, para que el seguimiento las revise. */
function todasLasConversaciones() {
  ensure();
  return readJSON(CONV_FILE, {});
}

/**
 * Reescribe la lista completa de pedidos. La usa /limpiar-duplicados para sacar
 * los que quedaron guardados antes de que existiera el candado.
 * ⚠️ Deja copia de respaldo del archivo anterior antes de tocar nada: borrar
 * pedidos sin red es exactamente el tipo de operación que no se puede deshacer.
 */
function reemplazarPedidos(lista) {
  try {
    ensure();
    const previo = readJSON(ORDERS_FILE, []);
    const respaldo = ORDERS_FILE.replace(/\.json$/, `-respaldo-${Date.now()}.json`);
    writeJSON(respaldo, previo);
    console.log(`💾 Respaldo de pedidos en ${respaldo} (${previo.length} registros)`);
    // Se guarda del más viejo al más nuevo, como estaba
    writeJSON(ORDERS_FILE, lista);
    return true;
  } catch (e) {
    console.error("🔴 No se pudo reescribir los pedidos:", e.message);
    return false;
  }
}

// ============================================================================
// 🚫 ANULAR UN PEDIDO — SIN BORRARLO
//
// DE DÓNDE SALE (23-sep): el bot tomó como venta nueva a un cliente que ya tenía
// su guía. El candado nuevo evita los próximos, pero el que ya estaba guardado
// seguía apareciendo. El dueño: *"todavía me sigue saliendo duplicada la de uno
// de los clientes... necesito que lo corrijas bien en general"*.
//
// Y también sirve para lo que pasa de verdad todos los días: un cliente que
// cancela, o uno que no se puede despachar.
//
// 🔑 SE ANULA, NO SE BORRA. El panel promete que los pedidos "no se borran
// nunca" y esa promesa vale: un pedido borrado es contabilidad que desaparece.
// Un pedido anulado queda en el archivo con el motivo y la fecha, y deja de
// contar en TODAS partes a la vez.
//
// Por eso el filtro va acá, en `todosLosPedidos()`, y no en cada pantalla: son
// nueve lugares los que leen esta lista (panel, resumen, cierre del día, CSV,
// novedades, embudo, auditoría, chat, limpiar-duplicados). Filtrar en cada uno
// es garantizar que alguno se olvide y siga contando una venta que no existe.
// ============================================================================

/**
 * Todos los pedidos guardados, del más nuevo al más viejo.
 * Por defecto SIN los anulados: son los que cuentan como venta.
 * @param {{incluirAnulados?: boolean}} [opciones]
 */
function todosLosPedidos(opciones) {
  ensure();
  const orders = readJSON(ORDERS_FILE, []);
  const todos = [...orders].reverse();
  if (opciones && opciones.incluirAnulados) return todos;
  return todos.filter((p) => !p.anulado);
}

/** Solo los anulados, para poder revisarlos y revertir si hizo falta. */
function pedidosAnulados() {
  return todosLosPedidos({ incluirAnulados: true }).filter((p) => p.anulado);
}

/**
 * Marca un pedido como anulado. Se identifica por `fecha`, que es única.
 * @param {string} fechaPedido  el ISO con el que se guardó
 * @param {string} motivo       por qué se anula (queda en el registro)
 * @returns {object|null} el pedido anulado, o null si no se encontró
 */
function anularPedido(fechaPedido, motivo) {
  try {
    ensure();
    const orders = readJSON(ORDERS_FILE, []);
    const i = indiceDePedido(orders, fechaPedido);
    if (i === -1) return null;
    if (orders[i].anulado) return orders[i]; // ya estaba, no se toca
    orders[i] = {
      ...orders[i],
      anulado: true,
      motivo_anulacion: String(motivo || "sin motivo"),
      anulado_en: new Date().toISOString(),
    };
    writeJSON(ORDERS_FILE, orders);
    console.warn(
      `🚫 PEDIDO ANULADO: ${orders[i].nombre || "?"} (${orders[i].celular || orders[i].telefono_chat}) ` +
        `por $${orders[i].total} — motivo: ${orders[i].motivo_anulacion}`
    );
    return orders[i];
  } catch (e) {
    console.error(`🔴 No se pudo anular el pedido: ${e.message}`);
    return null;
  }
}

/** Deshace una anulación, por si se anuló por error. */
function reactivarPedido(fechaPedido) {
  try {
    ensure();
    const orders = readJSON(ORDERS_FILE, []);
    const i = indiceDePedido(orders, fechaPedido);
    if (i === -1) return null;
    const { anulado, motivo_anulacion, anulado_en, ...limpio } = orders[i];
    orders[i] = limpio;
    writeJSON(ORDERS_FILE, orders);
    console.log(`↩️  Pedido reactivado: ${limpio.nombre || "?"} por $${limpio.total}`);
    return orders[i];
  } catch (e) {
    console.error(`🔴 No se pudo reactivar el pedido: ${e.message}`);
    return null;
  }
}
// ============================================================================
// ✅ "YA LO ATENDÍ" — PARA LO QUE NO PASA POR EL PANEL (25-sep)
//
// `ultimaRespuestaHumana` cubre las respuestas escritas desde `/chat`, pero el
// dueño resuelve muchas cosas POR FUERA: llama por teléfono (es así como
// mantiene el rechazo en 5,0%, ver 0-AF) o lo arregla y no hace falta escribir.
// Sin una forma de decir "esto ya está", esos chats se quedan en la lista para
// siempre — que es justo la queja: "pueden pasar dos días y me siguen saliendo".
//
// Se guarda CUÁNDO se atendió, no un simple `true`. La diferencia es todo: si el
// cliente vuelve a escribir después, el chat tiene que volver a la lista solo.
// Un booleano lo dejaría enterrado para siempre.
// ============================================================================
function marcarAtendido(phone, quien) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.atendidoAt = Date.now();
  c.atendidoPor = quien || "dueño";
  all[phone] = c;
  writeJSON(CONV_FILE, all);
  console.log(`✅ Chat marcado como atendido: ${phone} (${c.atendidoPor})`);
  return c;
}

/** Deshace el "ya lo atendí": el chat vuelve a la lista de pendientes. */
function desmarcarAtendido(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone];
  if (!c) return null;
  delete c.atendidoAt;
  delete c.atendidoPor;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
  return c;
}

function isPaused(phone) {
  return !!getConv(phone).paused;
}
function setPaused(phone, val) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.paused = val;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}
// 🔴 ANTIDUPLICADOS DE PEDIDOS (22-sep). El bot emitió el bloque ##ORDER## dos
// veces para el mismo cliente, con 18 a 30 segundos de diferencia. Medido con
// datos reales: 7 registros para 4 clientes. Si el dueño despacha por el
// archivo, manda 3 paquetes de mas: ~$99.000 de producto mas 3 fletes tirados.
//
// El prompt ya le pide a la IA no repetir el cuadro de confirmación, pero eso
// es una instrucción y esto es un candado. La instrucción falló; el candado no
// depende de que el modelo se porte bien.
// ============================================================================
// 🔴 LOS DOS HUECOS QUE TENÍA ESTE CANDADO (23-sep)
//
// LO QUE PASÓ, en palabras del dueño: *"cayó supuestamente otra venta y es una
// duplicada de una de las guías que envié, y contestó la persona y la tomó otra
// vez como pedido"*. O sea: un cliente que YA había comprado y YA tenía su guía
// contestó el mensaje, y el bot volvió a emitir el bloque ##ORDER##.
//
// El pedido falso entró al conteo. Y eso es peor que un pedido de más: el dueño
// está decidiendo con esos números —CPA, cierre, cuánto recargar— y un pedido
// inventado los corrompe todos.
//
// HUECO 1 — LA VENTANA ERA DE 6 HORAS.
//   Se puso así porque el caso original era el bloque emitido dos veces con 18 a
//   30 segundos de diferencia. Pero acá el pedido original era de ANTES (ya tenía
//   guía enviada), así que el candado ni lo miró. La ventana pasa a 30 días.
//
// HUECO 2 — NO MIRABA SI EL PEDIDO YA SE HABÍA DESPACHADO.
//   Si un pedido ya tiene guía, el cliente que escribe NO está comprando otra
//   vez: está contestando la guía. Eso ahora se descarta siempre, sin importar
//   cuánto tiempo pasó.
//
// ⚠️ Y EL CASO QUE NO SE PUEDE DESCARTAR A CIEGAS: un cliente de verdad puede
// comprar otra vez. Si el pedido nuevo NO es idéntico al anterior, se GUARDA
// —una venta real no se tira nunca— pero se marca `posible_duplicado` para que
// el dueño la confirme antes de despachar, en vez de descubrirlo con el paquete
// enviado.
// ============================================================================
const VENTANA_PEDIDO_DUPLICADO_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

/** Todos los pedidos anteriores de este mismo cliente, del más nuevo al más viejo. */
function pedidosDelMismoCliente(orders, nuevo) {
  const tel = String(nuevo.celular || nuevo.telefono_chat || "").replace(/\D/g, "");
  const chat = String(nuevo.telefono_chat || "");
  if (!tel && !chat) return [];
  return orders
    .filter((o) => {
      const telO = String(o.celular || o.telefono_chat || "").replace(/\D/g, "");
      // Se compara por teléfono Y por id de chat: los clientes con nombre de
      // usuario de WhatsApp no tienen teléfono, y ahí el chat es lo único que hay.
      return (tel && telO === tel) || (chat && String(o.telefono_chat || "") === chat);
    })
    .reverse();
}

const mismoPedido = (a, b) =>
  Number(a.total) === Number(b.total) && String(a.talla || "") === String(b.talla || "");

function esPedidoDuplicado(orders, nuevo) {
  const ahora = Date.now();
  for (const o of pedidosDelMismoCliente(orders, nuevo)) {
    if (!mismoPedido(o, nuevo)) continue;

    // Ya se despachó: el cliente está contestando la guía, no comprando de nuevo.
    if (o.guia) return o;

    const cuando = new Date(o.fecha).getTime();
    if (Number.isFinite(cuando) && ahora - cuando <= VENTANA_PEDIDO_DUPLICADO_MS) return o;
  }
  return null;
}

/**
 * El cliente ya compró antes, pero este pedido NO es idéntico. Puede ser una
 * compra de verdad o el bot confundiéndose: se guarda y se marca.
 */
function pedidoSospechoso(orders, nuevo) {
  const previos = pedidosDelMismoCliente(orders, nuevo);
  if (previos.length === 0) return null;
  return previos[0];
}

// ============================================================================
// 🔴 LA FECHA NO ES UN IDENTIFICADOR ÚNICO (23-sep)
//
// Los pedidos se identificaban por `fecha` para pegarles la guía y para
// anularlos, y el comentario decía "el ISO del momento en que se guardó, único".
// NO ES ÚNICO: `toISOString()` tiene resolución de milisegundo, y dos pedidos
// guardados en el mismo milisegundo salen con la misma fecha.
//
// Lo delató una prueba: dos pedidos distintos quedaron con
// `2026-09-24T01:06:40.326Z` los dos. Y `findIndex` devuelve el primero que
// coincide, así que:
//
//   · anular un pedido podía anular OTRO
//   · una guía podía quedar pegada al pedido equivocado → paquete a otra persona
//
// En producción los pedidos entran separados por segundos, así que la colisión
// es poco probable — pero "poco probable" sobre el despacho de un paquete no es
// una garantía. Ahora cada pedido lleva `id` propio y las búsquedas lo usan,
// cayendo a `fecha` solo para los pedidos viejos que ya están guardados sin id.
// ============================================================================
const { randomUUID } = require("crypto");

/** Encuentra el índice de un pedido por id (o por fecha, si es uno viejo). */
function indiceDePedido(orders, ref) {
  const r = String(ref || "");
  if (!r) return -1;
  const porId = orders.findIndex((o) => o.id && String(o.id) === r);
  if (porId !== -1) return porId;
  return orders.findIndex((o) => o.fecha === r);
}

function saveOrder(order) {
  const record = { ...order, id: randomUUID(), fecha: new Date().toISOString() };

  // 🎯 Pegarle el anuncio que trajo al cliente. Va ACÁ, en el store, y no en
  // quien llama, para que ningún camino nuevo se olvide de hacerlo.
  //
  // ⚠️ Envuelto en try/catch y ANTES del log de abajo por una razón concreta:
  // esto lee del disco, y si el disco falla no puede tumbar el guardado del
  // pedido. La atribución es información valiosa; el pedido es la venta.
  try {
    const anuncio = atribucionDe(record.telefono_chat);
    if (anuncio) {
      record.anuncio_id = anuncio.source_id;
      record.anuncio_origen = anuncio.source_url || null;
      record.anuncio_tipo = anuncio.source_type || null;
    }
  } catch (e) {
    console.error(`⚠️  No se pudo leer la atribución del anuncio: ${e.message}`);
  }

  // 📊 ¿ESTA VENTA VINO DE UN SEGUIMIENTO? Si al cliente se le había mandado un
  // toque, se anota cuál fue el último. Es lo único que permite contestar si el
  // seguimiento paga o solo hace ruido.
  try {
    const conv = getConv(record.telefono_chat);
    if (conv && conv.segPasoReciente) {
      record.venta_tras_seguimiento = conv.segPasoReciente;
      marcarCompraDeSeguimiento(record.telefono_chat, conv.segPasoReciente);
    }
  } catch (e) {
    console.error(`⚠️  No se pudo atribuir la venta al seguimiento: ${e.message}`);
  }

  // 🛟 RED DE SEGURIDAD — ESTO VA PRIMERO, ANTES DE TOCAR EL DISCO.
  // El pedido se escribe COMPLETO en el log antes de cualquier operación que
  // pueda fallar. Los logs de Render sobreviven a los despliegues, así que si
  // el disco falla o no está montado, el pedido se recupera buscando
  // "PEDIDO_JSON" en los logs. Un pedido perdido es una venta perdida.
  //
  // ⚠️ El orden importa y ya me equivoqué una vez: tenía `ensure()` arriba, y
  // si ensure() lanzaba excepción el log NUNCA se escribía — justo en el caso
  // en que más se necesita. La red de seguridad va antes del riesgo.
  console.log("PEDIDO_JSON " + JSON.stringify(record));

  try {
    ensure();
    const orders = readJSON(ORDERS_FILE, []);

    const repetido = esPedidoDuplicado(orders, record);

    // ======================================================================
    // ✅ LA CONFIRMACIÓN QUE LLEGA DESPUÉS COMPLETA EL PEDIDO, NO CREA OTRO
    //
    // DE DÓNDE SALE (26-sep): un pedido seguía marcado `sin_confirmar` después
    // de un "Sí" explícito del cliente.
    //
    // La secuencia era ésta: el bot muestra el cuadro y emite el bloque antes de
    // que el cliente conteste → el pedido se guarda marcado `sin_confirmar`
    // (candado del 23-sep, correcto). El cliente dice "Sí". El bot vuelve a
    // emitir el bloque → el candado antiduplicados lo descarta, y hace bien.
    //
    // 🔴 PERO EL PRIMERO SE QUEDABA MARCADO PARA SIEMPRE. El dueño veía
    // "🔴 SIN CONFIRMAR" en un pedido que el cliente sí había confirmado, y la
    // regla del panel es no despachar esos sin leer el chat. O sea: una venta
    // confirmada frenada por una marca vieja.
    //
    // Ahora, si llega un duplicado que YA viene confirmado y el original estaba
    // marcado, se le levanta la marca al original en vez de descartar y olvidar.
    // No se crea un pedido nuevo: se completa el que ya existe.
    // ======================================================================
    if (repetido && repetido.sin_confirmar && !record.sin_confirmar) {
      const i = indiceDePedido(orders, repetido.id || repetido.fecha);
      if (i !== -1) {
        // ==================================================================
        // 🔴 QUITAR LA MARCA NO ALCANZA SI EL REGISTRO QUEDÓ VIEJO
        //
        // LO QUE SEÑALÓ LA REVISIÓN (26-sep), y es exacto: `mismoPedido` compara
        // SOLO el total y la talla:
        //
        //     Number(a.total) === Number(b.total) && a.talla === b.talla
        //
        // Así que si el cliente CORRIGIÓ el color o la dirección, el pedido nuevo
        // sigue contando como duplicado —mismo total, misma talla— y la versión
        // guardada conserva el color viejo. Levantarle la marca ahí es peor que
        // dejarla puesta: el pedido queda "confirmado" con el dato equivocado y
        // se despacha una franja roja a quien la cambió a azul.
        //
        // 🔑 Ahora ANTES de quitar la marca se traen las correcciones. El dato más
        // nuevo gana, pero solo si viene con contenido: un campo vacío en el
        // pedido nuevo NO borra uno bueno del anterior.
        // ==================================================================
        const CAMPOS_VIGENTES = ["nombre", "celular", "ciudad", "direccion", "color", "talla", "pago"];
        const correcciones = [];
        const traidos = {};
        for (const campo of CAMPOS_VIGENTES) {
          const nuevo = String(record[campo] == null ? "" : record[campo]).trim();
          const viejo = String(orders[i][campo] == null ? "" : orders[i][campo]).trim();
          if (!nuevo) continue; // vacío no corrige nada
          if (nuevo.toLowerCase() === viejo.toLowerCase()) continue;
          traidos[campo] = record[campo];
          correcciones.push(`${campo}: "${viejo || "(vacío)"}" → "${nuevo}"`);
        }

        const { sin_confirmar, motivo_sin_confirmar, ...limpio } = orders[i];
        orders[i] = {
          ...limpio,
          ...traidos,
          confirmado_despues: new Date().toISOString(),
          ...(correcciones.length ? { correcciones_aplicadas: correcciones } : {}),
        };
        writeJSON(ORDERS_FILE, orders);
        console.log(
          `✅ CONFIRMACIÓN POSTERIOR: el pedido de ${orders[i].nombre || "?"} por $${orders[i].total} ` +
            "ya tenía el 'sí' del cliente. Se le quitó la marca de sin confirmar (no se duplicó)." +
            (correcciones.length
              ? `\n   🔧 Y se trajeron las correcciones del cliente: ${correcciones.join(" · ")}`
              : "")
        );
        return {
          ...orders[i],
          duplicadoIgnorado: true,
          confirmadoDespues: true,
          correccionesAplicadas: correcciones,
        };
      }
    }

    if (repetido) {
      console.warn(
        `⏭️  PEDIDO DUPLICADO NO GUARDADO: ${record.nombre || "?"} (${record.celular || record.telefono_chat}) ` +
          `por $${record.total}. Ya existe uno igual de ${repetido.fecha}` +
          (repetido.guia ? ` y YA SE DESPACHÓ (guía ${repetido.guia})` : "") +
          ". El bot volvió a emitir el bloque."
      );
      return { ...repetido, duplicadoIgnorado: true };
    }

    // Compró antes, pero este pedido es distinto. Puede ser real: se guarda,
    // marcado, para que el dueño lo confirme antes de despachar.
    const previo = pedidoSospechoso(orders, record);
    if (previo) {
      record.posible_duplicado = true;
      record.pedido_previo_fecha = previo.fecha;
      record.pedido_previo_total = previo.total;
      console.warn(
        `⚠️  POSIBLE PEDIDO REPETIDO: ${record.nombre || "?"} (${record.celular || record.telefono_chat}) ` +
          `ya tenía un pedido de $${previo.total} del ${previo.fecha}` +
          (previo.guia ? ` (guía ${previo.guia})` : "") +
          `. El nuevo es por $${record.total}. SE GUARDA, pero hay que confirmarlo.`
      );
    }

    orders.push(record);
    writeJSON(ORDERS_FILE, orders);
  } catch (e) {
    // Si no se pudo escribir, que quede clarísimo en el log. El pedido ya está
    // arriba en formato recuperable, así que no se pierde.
    console.error(
      `🔴 NO SE PUDO GUARDAR EL PEDIDO EN DISCO (${e.message}). ` +
        "Está en el log de arriba como PEDIDO_JSON — recuperalo de ahí."
    );
  }
  return record;
}

// ============================================================================
// GUÍAS YA ENVIADAS — el candado para no mandarle dos veces la misma guía
//
// Se guarda en disco, no en memoria, y la razón importa: Render reinicia el
// proceso por cualquier cosa (despliegue, inactividad del plan gratis, ajuste
// de variables). Si esto viviera en memoria, el reinicio borraría el registro y
// el dueño que sube el PDF otra vez le mandaría la guía repetida a todo el
// mundo. Es exactamente el fallo que ya pasó dos veces hoy con otra forma.
// ============================================================================

// ============================================================================
// 🔴 LOS FALLOS DE ENTREGA, EN DISCO (25-sep)
//
// DE DÓNDE SALE: el cierre del día se mandó dos noches seguidas por plantilla,
// Meta respondió 200 con id de mensaje las dos veces, y NUNCA LLEGÓ.
//
// El motivo sí venía: Meta lo manda por webhook como un evento `statuses` con
// `status: "failed"` y un código de error. El bot ya lo escuchaba… y lo guardaba
// en un array en MEMORIA (los últimos 60), que se borra en cada reinicio. Render
// reinicia por cualquier cosa, así que cuando se fue a buscar la explicación ya
// no estaba. Está anotado como trampa #6 del proyecto.
//
// 🔑 Por eso esto va a DISCO. Un envío que Meta acepta y después descarta se ve
// idéntico a uno que funcionó: el registro del fallo es la ÚNICA forma de
// distinguirlos, y no puede depender de que nadie haya reiniciado el servicio.
//
// Se guardan solo los FALLOS, no todos los estados. Cada mensaje genera varios
// eventos (sent, delivered, read) y escribirlos todos en disco sería mucho ruido
// y mucha escritura; lo que hace falta para diagnosticar es lo que se rompió.
// ============================================================================
const MAX_FALLOS = 200;

/** Anota que Meta descartó un mensaje, con el motivo que ella misma dio. */
function anotarFalloEntrega(datos) {
  // 🛟 Al log primero, igual que con los pedidos: si el disco falla, el motivo
  // no se pierde. Es justamente el dato que nunca hay cuando se necesita.
  console.error("FALLO_ENTREGA_JSON " + JSON.stringify(datos));
  try {
    ensure();
    const todos = readJSON(FALLOS_FILE, []);
    todos.push({ ...datos, cuando: new Date().toISOString() });
    writeJSON(FALLOS_FILE, todos.slice(-MAX_FALLOS));
    return true;
  } catch (e) {
    console.error(`⚠️  No se pudo guardar el fallo de entrega: ${e.message}`);
    return false;
  }
}

/** Los fallos de entrega guardados, del más nuevo al más viejo. */
function fallosDeEntrega(limite = 50) {
  try {
    ensure();
    return readJSON(FALLOS_FILE, []).slice(-limite).reverse();
  } catch (e) {
    return [];
  }
}

// ============================================================================
// 🔴 LOS PLANES PENDIENTES DE CONFIRMAR, EN DISCO (25-sep)
//
// DE DÓNDE SALE. El dueño intentó avisar las primeras novedades y el panel le
// devolvió "No salió: el servidor respondió 400".
//
// LA CAUSA: entre "Revisar" y "Enviar" hay dos pasos. El primero calcula a quién
// se le puede escribir y qué, y guarda ese plan; el segundo lo manda. El plan
// vivía en un `new Map()` en memoria, y Render reinicia el proceso por cualquier
// cosa — sobre todo un despliegue, y ese día hubo varios seguidos. Al reiniciar,
// el plan desaparecía y el segundo paso respondía 400.
//
// 🔑 Y LO QUE LO HACE PEOR ES QUE EL ERROR NO SE ENTIENDE. El dueño hizo todo
// bien: pegó las novedades, revisó, marcó y le dio enviar. El sistema le dijo
// "400" por algo que pasó por dentro y que él no podía ni ver ni evitar.
//
// Es la misma familia que la trampa #6 (el log de eventos en memoria) y que los
// fallos de entrega: estado que importa, guardado donde no sobrevive.
//
// ⚠️ ACÁ NO SE GUARDAN LOS PLANES DE GUÍAS, y es a propósito: esos llevan las
// páginas del PDF como Buffer, y volcarlas a disco en cada subida es pesado. Ese
// caso tiene el mismo bug y se arregla distinto (guardando el PDF una vez).
// ============================================================================
function guardarPlan(tipo, id, datos) {
  try {
    ensure();
    const todos = readJSON(PLANES_FILE, {});
    todos[`${tipo}:${id}`] = { tipo, id, creado: Date.now(), ...datos };
    writeJSON(PLANES_FILE, todos);
    return true;
  } catch (e) {
    // Que no se pueda guardar en disco no puede impedir el envío: el plan sigue
    // en memoria y el flujo normal (sin reinicio en medio) funciona igual.
    console.error(`⚠️  No se pudo guardar el plan ${tipo}:${id}: ${e.message}`);
    return false;
  }
}

/** Devuelve el plan guardado, o null si no está o ya venció. */
function leerPlan(tipo, id, ttlMs) {
  try {
    ensure();
    const p = readJSON(PLANES_FILE, {})[`${tipo}:${id}`];
    if (!p) return null;
    // ⚠️ `ttlMs != null` y no `ttlMs`: con `if (ttlMs)` un TTL de 0 se saltaba el
    // chequeo y devolvía el plan como si estuviera fresco. Y `>=` en vez de `>`
    // por la trampa #1: `Date.now()` tiene resolución de milisegundo, así que un
    // plan guardado y leído en el mismo milisegundo daba edad 0.
    if (ttlMs != null && Date.now() - Number(p.creado || 0) >= ttlMs) return null;
    return p;
  } catch (e) {
    return null;
  }
}

function borrarPlan(tipo, id) {
  try {
    ensure();
    const todos = readJSON(PLANES_FILE, {});
    delete todos[`${tipo}:${id}`];
    writeJSON(PLANES_FILE, todos);
  } catch (e) {
    /* si no se puede borrar, el TTL lo limpia */
  }
}

/** Borra los planes vencidos, para que el archivo no crezca sin control. */
function limpiarPlanesGuardados(ttlMs) {
  try {
    ensure();
    const todos = readJSON(PLANES_FILE, {});
    const ahora = Date.now();
    let cambio = false;
    for (const [k, p] of Object.entries(todos)) {
      // `>=` por lo mismo que en leerPlan: si no, un TTL de 0 no limpia nada.
      if (ahora - Number(p.creado || 0) >= ttlMs) {
        delete todos[k];
        cambio = true;
      }
    }
    if (cambio) writeJSON(PLANES_FILE, todos);
  } catch (e) {
    /* no es crítico */
  }
}

/** ¿Esta guía ya se le envió? Devuelve el registro o null. */
function guiaYaEnviada(guia) {
  if (!guia) return null;
  ensure();
  const todas = readJSON(GUIAS_FILE, {});
  return todas[String(guia)] || null;
}

/** Anota que una guía se envió, para que no se repita. */
function registrarGuiaEnviada(datos) {
  const guia = String(datos.guia || "").trim();
  if (!guia) return null;
  // 🛟 Igual que con los pedidos: al log ANTES de tocar el disco, así queda
  // recuperable aunque la escritura falle.
  console.log("GUIA_ENVIADA_JSON " + JSON.stringify(datos));
  try {
    ensure();
    const todas = readJSON(GUIAS_FILE, {});
    todas[guia] = { ...datos, fecha: Date.now() };
    writeJSON(GUIAS_FILE, todas);
    return todas[guia];
  } catch (e) {
    console.error(`🔴 No se pudo registrar la guía ${guia}: ${e.message}`);
    return null;
  }
}

/** Todas las guías enviadas, para el panel. */
function todasLasGuiasEnviadas() {
  ensure();
  return readJSON(GUIAS_FILE, {});
}

/**
 * Le pega el número de guía al pedido, para que el CSV de despacho salga
 * completo y se pueda cruzar contra el export de la transportadora.
 * ⚠️ Se identifica por `id`. El comentario que había acá decía "por `fecha` (el
 * ISO del momento en que se guardó, único)" y ERA FALSO: `toISOString()` tiene
 * resolución de milisegundo y dos pedidos del mismo instante comparten fecha.
 * Ese comentario es el que hizo que la guía pudiera quedar pegada al pedido
 * equivocado — un paquete a otra persona. Se acepta `fecha` solo para los
 * pedidos viejos que se guardaron sin id.
 */
function anotarGuiaEnPedido(refPedido, guia) {
  const fechaPedido = refPedido;
  try {
    ensure();
    const orders = readJSON(ORDERS_FILE, []);
    const i = indiceDePedido(orders, fechaPedido);
    if (i === -1) return false;
    orders[i] = { ...orders[i], guia: String(guia), guiaEnviadaEl: new Date().toISOString() };
    writeJSON(ORDERS_FILE, orders);
    return true;
  } catch (e) {
    console.error(`🔴 No se pudo anotar la guía en el pedido: ${e.message}`);
    return false;
  }
}

// ============================================================================
// 💾 ¿LOS DATOS SE GUARDAN DE VERDAD? — COMPROBARLO, NO SUPONERLO
//
// El panel decía "los pedidos se guardan en disco persistente" con solo mirar
// si la variable DATA_DIR existía. Eso es una suposición disfrazada de dato:
// la variable dice DÓNDE guardar, no si hay un disco ahí. Si DATA_DIR apunta a
// una carpeta del contenedor (por tener mal la ruta del disco, o por no haber
// creado el disco), el aviso salía IGUAL de verde y los datos se borraban.
//
// Un aviso que dice "todo bien" sin haberlo verificado es peor que no tenerlo:
// enseña a confiar. Acá se comprueba con dos evidencias independientes:
//
//  1. ¿Es OTRO sistema de archivos? Un disco montado tiene un número de
//     dispositivo distinto al del código. Si DATA_DIR cae en el mismo
//     dispositivo que /src, NO es un disco montado: es una carpeta y punto.
//
//  2. ¿Sobrevivió a reinicios? Se cuenta cada arranque en un archivo del propio
//     disco. Si el contador va en 5, esos datos aguantaron 5 arranques — y eso
//     es prueba directa, no inferencia.
// ============================================================================

/** Suma uno al contador de arranques. Se llama una vez al iniciar el bot. */
function registrarArranque() {
  try {
    ensure();
    const m = readJSON(MARCADOR_FILE, null) || { desde: new Date().toISOString(), arranques: 0 };
    m.arranques = (m.arranques || 0) + 1;
    m.ultimoArranque = new Date().toISOString();
    writeJSON(MARCADOR_FILE, m);
    return m;
  } catch (e) {
    console.error(`⚠️  No se pudo registrar el arranque: ${e.message}`);
    return null;
  }
}

/**
 * Estado real del almacenamiento, para que el panel diga la verdad.
 * Nunca lanza: si algo falla, lo reporta como desconocido en vez de mentir.
 */
function estadoDelDisco() {
  const out = {
    dir: DIR,
    configurado: Boolean(process.env.DATA_DIR),
    discoAparte: null, // null = no se pudo determinar
    desde: null,
    arranques: 0,
  };

  try {
    ensure();
    // Comparar el dispositivo de DATA_DIR con el del código. Distinto =
    // sistema de archivos montado aparte = disco de verdad.
    const dev = fs.statSync(DIR).dev;
    const devCodigo = fs.statSync(__dirname).dev;
    out.discoAparte = dev !== devCodigo;
  } catch (e) {
    console.error(`⚠️  No se pudo comprobar el disco: ${e.message}`);
  }

  try {
    const m = readJSON(MARCADOR_FILE, null);
    if (m) {
      out.desde = m.desde || null;
      out.arranques = m.arranques || 0;
    }
  } catch {}

  return out;
}

module.exports = {
  getConv, pushMsg, isPaused, setPaused, saveOrder, borrarConversacion,
  marcarAtendido, desmarcarAtendido,
  anotarFalloEntrega, fallosDeEntrega,
  guardarPlan, leerPlan, borrarPlan, limpiarPlanesGuardados,
  registrarArranque, estadoDelDisco,
  marcarComprado, registrarSeguimiento, reclamarSeguimiento,
  estadisticasSeguimiento, marcarCompraDeSeguimiento, marcarNoMolestar, todasLasConversaciones,
  guardarPerfil, guardarAtribucion, atribucionDe,
  reemplazarPedidos,
  todosLosPedidos,
  pedidosAnulados,
  anularPedido,
  reactivarPedido,
  // Se exportan para poder probar el candado antiduplicados sin tocar el disco:
  // es el que decide si una venta es real, y de eso dependen el CPA y el cierre.
  esPedidoDuplicado,
  pedidoSospechoso,
  VENTANA_PEDIDO_DUPLICADO_MS,
  guiaYaEnviada, registrarGuiaEnviada, todasLasGuiasEnviadas, anotarGuiaEnPedido,
};
