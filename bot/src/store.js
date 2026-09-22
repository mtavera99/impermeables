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
  console.log(`💾 Datos en disco persistente: ${DIR}`);
}
const CONV_FILE = path.join(DIR, "conversations.json");
const ORDERS_FILE = path.join(DIR, "orders.json");

const MAX_MSGS = 24; // historial máximo por cliente que enviamos a la IA

function ensure() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  if (!fs.existsSync(CONV_FILE)) fs.writeFileSync(CONV_FILE, "{}");
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]");
}
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getConv(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  return all[phone] || { messages: [], paused: false };
}
function pushMsg(phone, role, content) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.messages.push({ role, content, at: Date.now() });
  if (c.messages.length > MAX_MSGS) c.messages = c.messages.slice(-MAX_MSGS);
  // Marca de tiempo del ULTIMO mensaje DEL CLIENTE. De aqui salen las dos ventanas:
  //   - 24h: mientras este abierta se puede escribir texto libre
  //   - 72h: la ventana gratis que abre el anuncio Click-to-WhatsApp
  if (role === "user") {
    c.ultimoDelCliente = Date.now();
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

/** Devuelve todos los pedidos guardados, del más nuevo al más viejo. */
function todosLosPedidos() {
  ensure();
  const orders = readJSON(ORDERS_FILE, []);
  return [...orders].reverse();
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
function saveOrder(order) {
  const record = { ...order, fecha: new Date().toISOString() };

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

module.exports = {
  getConv, pushMsg, isPaused, setPaused, saveOrder, borrarConversacion,
  marcarComprado, registrarSeguimiento, marcarNoMolestar, todasLasConversaciones,
  todosLosPedidos
};
