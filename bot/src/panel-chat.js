// ============================================================================
// 💬 VER EL CHAT DE UN CLIENTE, DESDE EL CELULAR
//
// DE DÓNDE SALE (23-sep): el dueño estaba cargando guías y se topó con un pedido
// que traía solo la ciudad, sin dirección. Su pregunta fue textual: *"¿cómo puedo
// ver el chat de él o qué, para verificar si es oficina de Interrapidísimo o
// qué?"*.
//
// La única forma que había era pegar un comando de una línea en el Web Shell de
// Render. Y falló dos veces: el comando era largo y traía emojis y caracteres de
// caja que el shell masticó mal. Pedirle a alguien que está despachando pedidos
// desde el teléfono que abra una terminal y pegue 1.100 caracteres es un diseño
// equivocado.
//
// Los datos ya estaban todos: el pedido guarda `telefono_chat`, que es justo la
// llave con la que se guarda la conversación. Solo faltaba mostrarlo.
//
// 🔒 Protegido con el mismo token del panel. Muestra datos personales de UN
// cliente a la vez, nunca un listado completo.
// ============================================================================

const store = require("./store");

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const HORA = (ms) =>
  new Date(ms).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtCOP = (n) =>
  Number.isFinite(Number(n)) ? "$" + Number(n).toLocaleString("es-CO") : "—";

/** Busca pedidos por nombre (sin tildes, sin mayúsculas) o por id de chat. */
function buscar({ id, q }) {
  const pedidos = store.todosLosPedidos();
  const limpiar = (s) =>
    String(s == null ? "" : s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  if (id) return pedidos.filter((p) => String(p.telefono_chat) === String(id));
  if (q) {
    const t = limpiar(q);
    if (!t) return [];
    return pedidos.filter(
      (p) => limpiar(p.nombre).includes(t) || String(p.celular || "").includes(t)
    );
  }
  return [];
}

function burbuja(m) {
  const mio = m.role === "assistant";
  const cuando = m.at ? HORA(m.at) : "";
  return `<div class="msg ${mio ? "bot" : "cli"}">
      <div class="quien">${mio ? "BikerPro" : "Cliente"}${
    cuando ? ` · <span class="hora">${esc(cuando)}</span>` : ""
  }</div>
      <div class="txt">${esc(m.content)}</div>
    </div>`;
}

function fichaPedido(p) {
  const falta = (v) => !String(v == null ? "" : v).trim();
  const campo = (etiqueta, valor, critico) =>
    `<div class="campo"><span class="et">${esc(etiqueta)}</span>${
      falta(valor)
        ? `<b class="${critico ? "rojo" : "gris"}">${critico ? "🔴 FALTA" : "—"}</b>`
        : `<b>${esc(valor)}</b>`
    }</div>`;

  return `<div class="ficha">
      <h2>${esc(p.nombre || "(sin nombre)")}</h2>
      ${campo("Celular", p.celular, true)}
      ${campo("Ciudad", p.ciudad, true)}
      ${campo("Dirección", p.direccion, true)}
      ${campo("Talla", p.talla, false)}
      ${campo("Color", p.color, false)}
      ${campo("Total", fmtCOP(p.total), false)}
      ${campo("Pago", p.pago, false)}
      ${campo("Guía", p.guia, false)}
      <div class="campo"><span class="et">Pedido</span><b>${esc(
        p.fecha ? HORA(new Date(p.fecha).getTime()) : "—"
      )}</b></div>
    </div>`;
}

/**
 * @param {object} opciones
 * @param {string} [opciones.id]  telefono_chat exacto
 * @param {string} [opciones.q]   nombre o celular a buscar
 * @param {string} opciones.token para armar el enlace de vuelta al panel
 */
function render({ id, q, token } = {}) {
  const encontrados = buscar({ id, q });
  const conversaciones = store.todasLasConversaciones();

  let cuerpo;
  if (!id && !q) {
    cuerpo = `<p class="nota">Buscá por nombre o celular del cliente.</p>`;
  } else if (encontrados.length === 0) {
    // Ayuda concreta en vez de un "no encontrado" seco: los últimos nombres,
    // que es lo que uno necesita cuando escribió el nombre distinto.
    const ultimos = store
      .todosLosPedidos()
      .slice(0, 12)
      .map((p) => `<li>${esc(p.nombre)}</li>`)
      .join("");
    cuerpo = `<p class="nota">No encontré ningún pedido con eso.</p>
      <p class="nota">Los últimos pedidos son:</p><ul class="lista">${ultimos}</ul>`;
  } else {
    cuerpo = encontrados
      .map((p) => {
        const conv = conversaciones[p.telefono_chat];
        const msgs = (conv && conv.messages) || [];
        const chat = msgs.length
          ? msgs.map(burbuja).join("")
          : `<p class="nota">No hay chat guardado para este cliente.
             ${
               p.telefono_chat
                 ? `El bot guarda los últimos mensajes de cada conversación, así que si el
                    pedido es viejo puede haberse rotado.`
                 : ""
             }</p>`;
        return `${fichaPedido(p)}<div class="chat">${chat}</div>`;
      })
      .join('<hr class="sep">');
  }

  return `<!doctype html><html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chat del cliente · BikerPro</title>
<style>
  :root{--fondo:#0d1117;--card:#161b22;--linea:#263041;--gris:#8b98a9;--rojo:#ff9aa4}
  *{box-sizing:border-box}
  body{margin:0;background:var(--fondo);color:#e6edf3;
    font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:14px}
  h1{font-size:18px;margin:0 0 4px}
  h2{font-size:17px;margin:0 0 10px}
  a{color:#7fd1ff}
  .barra{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
  .btn{display:inline-block;background:var(--card);border:1px solid var(--linea);
    border-radius:10px;padding:8px 12px;text-decoration:none;font-size:13px;font-weight:600}
  form{display:flex;gap:8px;margin-bottom:16px}
  input[type=text]{flex:1;min-width:0;background:var(--card);border:1px solid var(--linea);
    color:#e6edf3;border-radius:10px;padding:10px 12px;font-size:15px}
  button{background:#1f6feb;border:0;color:#fff;border-radius:10px;padding:10px 14px;
    font-size:14px;font-weight:700}
  .ficha{background:var(--card);border:1px solid var(--linea);border-radius:14px;
    padding:14px;margin-bottom:14px}
  .campo{display:flex;justify-content:space-between;gap:10px;padding:5px 0;
    border-top:1px solid var(--linea);font-size:14px}
  .campo .et{color:var(--gris)}
  .rojo{color:var(--rojo)}
  .gris{color:var(--gris);font-weight:400}
  .chat{display:flex;flex-direction:column;gap:8px}
  .msg{max-width:88%;padding:8px 11px;border-radius:14px;font-size:14px;white-space:pre-wrap;
    word-break:break-word}
  .msg.cli{align-self:flex-start;background:#1c2530;border:1px solid var(--linea);
    border-bottom-left-radius:4px}
  .msg.bot{align-self:flex-end;background:#123b2a;border:1px solid #1e5e42;
    border-bottom-right-radius:4px}
  .quien{font-size:10px;color:var(--gris);margin-bottom:3px;text-transform:uppercase;
    letter-spacing:.4px}
  .hora{text-transform:none;letter-spacing:0}
  .nota{color:var(--gris);font-size:13px}
  .lista{color:var(--gris);font-size:13px;padding-left:20px}
  .sep{border:0;border-top:1px solid var(--linea);margin:22px 0}
</style></head><body>
  <h1>💬 Chat del cliente</h1>
  <p class="nota">Para verificar una dirección, una oficina de la transportadora, o qué se le prometió.</p>
  <div class="barra">
    <a class="btn" href="/panel?token=${esc(token || "")}">← Volver al panel</a>
  </div>
  <form method="get" action="/chat">
    <input type="hidden" name="token" value="${esc(token || "")}">
    <input type="text" name="q" value="${esc(q || "")}" placeholder="Nombre o celular del cliente"
      autocomplete="off">
    <button type="submit">Buscar</button>
  </form>
  ${cuerpo}
</body></html>`;
}

module.exports = { render, buscar };
