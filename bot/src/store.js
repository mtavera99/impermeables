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
const GUIAS_FILE = path.join(DIR, "guias-enviadas.json");

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
// 🔴 ANTIDUPLICADOS DE PEDIDOS (22-sep). El bot emitió el bloque ##ORDER## dos
// veces para el mismo cliente, con 18 a 30 segundos de diferencia. Medido con
// datos reales: 7 registros para 4 clientes. Si el dueño despacha por el
// archivo, manda 3 paquetes de mas: ~$99.000 de producto mas 3 fletes tirados.
//
// El prompt ya le pide a la IA no repetir el cuadro de confirmación, pero eso
// es una instrucción y esto es un candado. La instrucción falló; el candado no
// depende de que el modelo se porte bien.
const VENTANA_PEDIDO_DUPLICADO_MS = 6 * 60 * 60 * 1000; // 6 horas

function esPedidoDuplicado(orders, nuevo) {
  const tel = String(nuevo.celular || nuevo.telefono_chat || "").replace(/\D/g, "");
  if (!tel) return null;
  const ahora = Date.now();
  for (let i = orders.length - 1; i >= 0; i--) {
    const o = orders[i];
    const telO = String(o.celular || o.telefono_chat || "").replace(/\D/g, "");
    if (telO !== tel) continue;
    const cuando = new Date(o.fecha).getTime();
    if (ahora - cuando > VENTANA_PEDIDO_DUPLICADO_MS) break;
    // Mismo cliente, mismo total y misma talla dentro de la ventana = repetido
    if (Number(o.total) === Number(nuevo.total) && String(o.talla || "") === String(nuevo.talla || "")) {
      return o;
    }
  }
  return null;
}

function saveOrder(order) {
  const record = { ...order, fecha: new Date().toISOString() };

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
    if (repetido) {
      console.warn(
        `⏭️  PEDIDO DUPLICADO NO GUARDADO: ${record.nombre || "?"} (${record.celular || record.telefono_chat}) ` +
          `por $${record.total}. Ya existe uno igual de ${repetido.fecha}. ` +
          "El bot emitió el bloque dos veces."
      );
      return { ...repetido, duplicadoIgnorado: true };
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
 * Se identifica por `fecha` (el ISO del momento en que se guardó, único).
 */
function anotarGuiaEnPedido(fechaPedido, guia) {
  try {
    ensure();
    const orders = readJSON(ORDERS_FILE, []);
    const i = orders.findIndex((o) => o.fecha === fechaPedido);
    if (i === -1) return false;
    orders[i] = { ...orders[i], guia: String(guia), guiaEnviadaEl: new Date().toISOString() };
    writeJSON(ORDERS_FILE, orders);
    return true;
  } catch (e) {
    console.error(`🔴 No se pudo anotar la guía en el pedido: ${e.message}`);
    return false;
  }
}

module.exports = {
  getConv, pushMsg, isPaused, setPaused, saveOrder, borrarConversacion,
  marcarComprado, registrarSeguimiento, marcarNoMolestar, todasLasConversaciones,
  guardarPerfil, guardarAtribucion, atribucionDe,
  reemplazarPedidos,
  todosLosPedidos,
  guiaYaEnviada, registrarGuiaEnviada, todasLasGuiasEnviadas, anotarGuiaEnPedido,
};
