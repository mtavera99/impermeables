// ============================================================================
// RESUMEN DEL DÍA — la base del cierre y de los números del panel
//
// Todo se calcula en HORA DE BOGOTÁ (UTC−5). Es un detalle que ya costó errores
// en este proyecto: el servidor corre en UTC y a partir de las 19:00 de Bogotá
// ya es el día siguiente en UTC. Un cierre a las 5 de la tarde que use la fecha
// del servidor mezcla dos días.
// ============================================================================

const store = require("./store");

const TZ = "America/Bogota";

/** Fecha YYYY-MM-DD en Bogotá a partir de un timestamp. */
function diaBogota(ms) {
  return new Date(ms).toLocaleDateString("en-CA", { timeZone: TZ });
}

function hoyBogota() {
  return diaBogota(Date.now());
}

function ayerBogota() {
  return diaBogota(Date.now() - 24 * 60 * 60 * 1000);
}

const fmtCOP = (n) => "$" + Number(n || 0).toLocaleString("es-CO").replace(/,/g, ".");

/** Cuántas unidades tiene un pedido, leyendo el producto. */
function unidadesDe(p) {
  // Si el pedido lo dice, se le cree.
  const explicito = Number(p.unidades);
  if (Number.isFinite(explicito) && explicito > 0) return explicito;

  // ========================================================================
  // 🔴 LA TALLA NO ES UNA CANTIDAD (encontrado el 26-sep)
  //
  // Antes se miraba `producto + talla` junto, y el patrón traía `2x`. Resultado:
  // **una talla "2XL" se contaba como DOS UNIDADES**, y una "3XL" como tres.
  //
  // No es cosmético: `unidadesDe` alimenta la columna `unidades` del CSV y el KPI
  // de "share 2 uds" del panel — el número con el que se justifica el gancho del
  // combo. Cada cliente de talla 2XL o 3XL venía inflando ese share.
  //
  // Ahora la talla se lee como talla, y la cantidad sale del producto.
  // ========================================================================
  const tallas = String(p.talla || "")
    .split(/\s*(?:,|\/|\+|\by\b)\s*/i)
    .map((s) => s.trim())
    .filter((s) => /^(xs|s|m|l|xl|2xl|3xl|xxl|xxxl|\d{1,2})$/i.test(s));
  if (tallas.length > 1) return tallas.length;

  const t = String(p.producto || "").toLowerCase();
  if (/\b3\b|tres/.test(t)) return 3;
  if (/\b2\b|\bdos\b|x2|2x|promo 2|combo/.test(t)) return 2;
  // Si no dice nada, se deduce del total: la promo de 2 arranca en $137.000
  if (Number(p.total) >= 130000) return 2;
  return 1;
}

/**
 * Arma el resumen de un día.
 * @param {string} dia YYYY-MM-DD en Bogotá. Por defecto, hoy.
 */
function delDia(dia = hoyBogota()) {
  const pedidos = store.todosLosPedidos().filter((p) => diaBogota(new Date(p.fecha).getTime()) === dia);
  const convs = store.todasLasConversaciones();

  let conversaciones = 0;
  let esperandoHumano = 0;
  let mensajesCliente = 0;
  const telsDelDia = new Set();

  for (const [tel, c] of Object.entries(convs)) {
    if (tel.startsWith("prueba-")) continue;
    const msgs = c.messages || [];
    const delDia = msgs.filter((m) => diaBogota(m.at) === dia);
    if (delDia.length === 0) continue;
    conversaciones++;
    telsDelDia.add(tel);
    mensajesCliente += delDia.filter((m) => m.role === "user").length;
    if (c.paused) esperandoHumano++;
  }

  const ingresos = pedidos.reduce((s, p) => s + Number(p.total || 0), 0);
  const unidades = pedidos.reduce((s, p) => s + unidadesDe(p), 0);

  // Ciudades, para ver dónde se está vendiendo
  const ciudades = {};
  for (const p of pedidos) {
    const c = (p.ciudad || "sin ciudad").split(",")[0].trim();
    ciudades[c] = (ciudades[c] || 0) + 1;
  }
  const topCiudades = Object.entries(ciudades).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return {
    dia,
    pedidos: pedidos.length,
    ingresos,
    unidades,
    ticketPromedio: pedidos.length ? Math.round(ingresos / pedidos.length) : 0,
    conversaciones,
    mensajesCliente,
    esperandoHumano,
    // El cierre se topa en 100%. Puede pasar que haya más pedidos que
    // conversaciones del día: un cliente que escribió ayer y confirmó hoy
    // cuenta el pedido hoy pero su conversación no. Sin el tope, el panel
    // llegaba a mostrar "150%" — y un número imposible tira abajo la confianza
    // en todos los demás.
    cierre: conversaciones ? Math.min(100, (pedidos.length / conversaciones) * 100) : 0,
    // Se marca cuando pasa, para no esconder la inconsistencia.
    cierreTopado: conversaciones > 0 && pedidos.length > conversaciones,
    share2uds: pedidos.length
      ? (pedidos.filter((p) => unidadesDe(p) >= 2).length / pedidos.length) * 100
      : 0,
    topCiudades,
    detalle: pedidos,
  };
}

/** Texto corto para mandar por WhatsApp. Pensado para leerse en el celular. */
function textoCierre(dia = hoyBogota()) {
  const r = delDia(dia);
  const ayer = delDia(ayerBogota());

  const flecha = (hoy, antes) => {
    if (!antes) return "";
    const d = ((hoy - antes) / antes) * 100;
    if (!isFinite(d) || Math.abs(d) < 1) return " (igual que ayer)";
    return d > 0 ? ` (▲${d.toFixed(0)}% vs ayer)` : ` (▼${Math.abs(d).toFixed(0)}% vs ayer)`;
  };

  const lineas = [
    `*CIERRE DEL DÍA · ${r.dia}* 🏍️`,
    ``,
    `📦 Pedidos: *${r.pedidos}*${flecha(r.pedidos, ayer.pedidos)}`,
    `💰 Recaudo: *${fmtCOP(r.ingresos)}*${flecha(r.ingresos, ayer.ingresos)}`,
    `🎽 Unidades: ${r.unidades}`,
    `🎟️ Ticket promedio: ${fmtCOP(r.ticketPromedio)}`,
    ``,
    `💬 Conversaciones: ${r.conversaciones}`,
    `📊 Cierre: ${r.cierre.toFixed(1)}%`,
    `👥 Share 2 unidades: ${r.share2uds.toFixed(0)}%`,
  ];

  if (r.esperandoHumano > 0) {
    lineas.push(``, `⚠️ *${r.esperandoHumano} chat(s) esperando que respondas vos*`);
  }

  if (r.topCiudades.length) {
    lineas.push(``, `📍 Ciudades: ` + r.topCiudades.map(([c, n]) => `${c} (${n})`).join(", "));
  }

  if (r.detalle.length) {
    lineas.push(``, `*Pedidos de hoy:*`);
    for (const p of r.detalle.slice(0, 15)) {
      lineas.push(
        `• ${p.nombre || "sin nombre"} — ${(p.ciudad || "").split(",")[0]} — ${p.talla || "?"}/${p.color || "?"} — *${fmtCOP(p.total)}*`
      );
    }
    if (r.detalle.length > 15) lineas.push(`…y ${r.detalle.length - 15} más. Miralos en el panel.`);
  } else {
    lineas.push(``, `Todavía no entró ningún pedido hoy.`);
  }

  return lineas.join("\n");
}

/** Pedidos en CSV, para abrir en Excel o guardar como respaldo propio. */
function pedidosCSV() {
  const pedidos = store.todosLosPedidos();
  // Las dos últimas columnas son la atribución: de qué anuncio salió la venta.
  // Con esto el CSV se puede cruzar contra el gasto por anuncio de Meta Ads y
  // sacar el CPA REAL por anuncio — no el costo por conversación, que es lo
  // único que se podía ver hasta ahora.
  // 🚦 `estado` va PRIMERO y no al final, a propósito: este CSV se abre para
  // armar guías, y una fila que se ve igual que las demás se despacha igual que
  // las demás. Si el pedido necesita revisión tiene que verse en la primera
  // columna, antes de leer el nombre.
  //
  // ⚠️ La fila NO se borra: un pedido real con un número mal escrito sigue siendo
  // una venta, y esconderlo sería perderla. Se marca, no se oculta.
  const cab = ["estado", "revisar_porque", "fecha", "dia_bogota", "nombre", "celular", "ciudad", "direccion", "talla", "color", "pago", "unidades", "total", "total_esperado", "anuncio_id", "anuncio_origen"];
  const filas = pedidos.map((p) => {
    const q = (v) => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    const revisar = store.textoDeRevision(p);
    return [
      p.anulado ? "ANULADO" : revisar ? "🔴 REVISAR" : "LISTO",
      revisar,
      p.fecha,
      diaBogota(new Date(p.fecha).getTime()),
      p.nombre,
      p.celular || p.telefono_chat,
      p.ciudad,
      p.direccion,
      p.talla,
      p.color,
      p.pago,
      unidadesDe(p),
      p.total,
      p.total_esperado == null ? "" : p.total_esperado,
      p.anuncio_id || "",
      p.anuncio_origen || "",
    ].map(q).join(",");
  });
  return [cab.join(","), ...filas].join("\n");
}

module.exports = { delDia, textoCierre, pedidosCSV, hoyBogota, ayerBogota, fmtCOP, unidadesDe, diaBogota };
