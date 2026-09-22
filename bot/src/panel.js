// ============================================================================
// PANEL WEB PARA VER LAS CONVERSACIONES Y LOS PEDIDOS
//
// POR QUÉ EXISTE: el dueño preguntó "¿dónde veo los mensajes que van a entrar?"
// y la respuesta era: en ningún lado. Solo había /eventos, que es JSON técnico
// y se borra en cada despliegue. Iba a recibir clientes pagados sin poder verlos.
//
// 🔴 DOS LIMITACIONES QUE HAY QUE SABER, Y SON IMPORTANTES:
//
// 1. LOS DATOS SE BORRAN EN CADA DESPLIEGUE. El store escribe en un archivo del
//    disco de Render, que es efímero. Cada vez que se sube código, se pierden
//    las conversaciones Y LOS PEDIDOS. Para una operación real hace falta una
//    base de datos: es el pendiente más urgente que queda.
//
// 2. EL AVISO DE PEDIDO AL DUEÑO PUEDE NO LLEGAR. Un mensaje que inicia el
//    negocio (no una respuesta) solo se entrega dentro de la ventana de 24h o
//    con plantilla aprobada. Ya se comprobó: Meta aceptó un mensaje al número
//    del dueño (ok:true, con wamid) y nunca se entregó.
//    → Mientras no haya plantilla, ESTE PANEL es la forma confiable de ver los
//      pedidos. No confiar en el WhatsApp del dueño.
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
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtCOP = (n) =>
  "$" + Number(n || 0).toLocaleString("es-CO").replace(/,/g, ".");

// Tiempo transcurrido en palabras, para saber qué está caliente
function hace(ms) {
  const min = Math.floor((Date.now() - ms) / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}

function render() {
  const convs = store.todasLasConversaciones();
  const pedidos = store.todosLosPedidos();

  // Ordenar por el último mensaje del cliente: lo más reciente arriba
  const lista = Object.entries(convs)
    .filter(([tel]) => !tel.startsWith("prueba-"))
    .map(([tel, c]) => {
      const msgs = c.messages || [];
      const ultimo = msgs.length ? msgs[msgs.length - 1] : null;
      return {
        tel,
        c,
        msgs,
        cuando: c.ultimoDelCliente || (ultimo && ultimo.at) || 0,
      };
    })
    .sort((a, b) => b.cuando - a.cuando);

  const totalMsgsCliente = lista.reduce(
    (s, x) => s + x.msgs.filter((m) => m.role === "user").length,
    0
  );
  const conPedido = lista.filter((x) => x.c.compro).length;
  const enHumano = lista.filter((x) => x.c.paused).length;

  const tarjetas = `
    <div class="kpis">
      <div class="kpi"><b>${lista.length}</b><span>conversaciones</span></div>
      <div class="kpi"><b>${totalMsgsCliente}</b><span>mensajes del cliente</span></div>
      <div class="kpi ok"><b>${pedidos.length}</b><span>pedidos</span></div>
      <div class="kpi ${enHumano ? "warn" : ""}"><b>${enHumano}</b><span>esperando humano</span></div>
      <div class="kpi"><b>${conPedido ? ((conPedido / lista.length) * 100).toFixed(1) + "%" : "—"}</b><span>cierre</span></div>
    </div>`;

  const filasPedidos = pedidos.length
    ? pedidos
        .slice(0, 40)
        .map(
          (p) => `<tr>
            <td class="nowrap">${esc(HORA(new Date(p.fecha).getTime()))}</td>
            <td><b>${esc(p.nombre)}</b><div class="sub">${esc(p.celular || p.telefono_chat)}</div></td>
            <td>${esc(p.ciudad)}<div class="sub">${esc(p.direccion)}</div></td>
            <td>${esc(p.talla)} / ${esc(p.color)}</td>
            <td class="nowrap"><b>${esc(fmtCOP(p.total))}</b><div class="sub">${esc(p.pago)}</div></td>
          </tr>`
        )
        .join("")
    : `<tr><td colspan="5" class="vacio">Todavía no hay pedidos.</td></tr>`;

  const bloquesConv = lista.length
    ? lista
        .slice(0, 60)
        .map((x) => {
          const etiquetas = [
            x.c.compro ? `<span class="tag ok">compró</span>` : "",
            x.c.paused ? `<span class="tag warn">esperando humano</span>` : "",
            x.c.noMolestar ? `<span class="tag no">no molestar</span>` : "",
          ].join("");
          const burbujas = x.msgs
            .slice(-14)
            .map(
              (m) =>
                `<div class="msg ${m.role === "user" ? "cli" : "bot"}">
                   <div class="txt">${esc(m.content).replace(/\n/g, "<br>")}</div>
                   <div class="hora">${esc(HORA(m.at))}</div>
                 </div>`
            )
            .join("");
          return `<details class="conv">
            <summary>
              <span class="tel">+${esc(x.tel)}</span>
              ${etiquetas}
              <span class="meta">${x.msgs.filter((m) => m.role === "user").length} msg · ${esc(hace(x.cuando))}</span>
            </summary>
            <div class="chat">${burbujas}</div>
            <a class="wa" target="_blank" href="https://wa.me/${esc(x.tel)}">Abrir en WhatsApp para responder →</a>
          </details>`;
        })
        .join("")
    : `<p class="vacio">Todavía no ha escrito nadie. Cuando entre el primer cliente aparece acá.</p>`;

  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BikerPro · panel del bot</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font:15px/1.45 -apple-system,system-ui,sans-serif;background:#0f1115;color:#e7e9ee}
  header{padding:14px 16px;background:#161a21;border-bottom:1px solid #242a35;position:sticky;top:0;z-index:5}
  h1{margin:0;font-size:17px}
  .sub2{color:#8b93a4;font-size:12px;margin-top:3px}
  main{padding:16px;max-width:900px;margin:0 auto}
  h2{font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:#8b93a4;margin:24px 0 10px}
  .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px}
  .kpi{background:#161a21;border:1px solid #242a35;border-radius:10px;padding:12px;text-align:center}
  .kpi b{display:block;font-size:22px}
  .kpi span{font-size:11px;color:#8b93a4}
  .kpi.ok b{color:#3ddc84}.kpi.warn b{color:#ffb020}
  table{width:100%;border-collapse:collapse;background:#161a21;border:1px solid #242a35;border-radius:10px;overflow:hidden}
  th,td{padding:9px 10px;text-align:left;border-bottom:1px solid #242a35;vertical-align:top;font-size:13px}
  th{background:#1b212b;font-size:11px;text-transform:uppercase;color:#8b93a4}
  .sub{color:#8b93a4;font-size:11px}
  .nowrap{white-space:nowrap}
  .vacio{color:#8b93a4;text-align:center;padding:22px}
  .conv{background:#161a21;border:1px solid #242a35;border-radius:10px;margin-bottom:8px;padding:10px 12px}
  .conv summary{cursor:pointer;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  .tel{font-weight:600}
  .meta{color:#8b93a4;font-size:12px;margin-left:auto}
  .tag{font-size:10px;padding:2px 7px;border-radius:99px;background:#2a313d;color:#c8cfdd}
  .tag.ok{background:#12351f;color:#3ddc84}.tag.warn{background:#3a2d0c;color:#ffb020}.tag.no{background:#3a1414;color:#ff6b6b}
  .chat{margin-top:10px;display:flex;flex-direction:column;gap:6px}
  .msg{max-width:82%;padding:7px 10px;border-radius:12px;font-size:13px}
  .msg.cli{align-self:flex-start;background:#222834}
  .msg.bot{align-self:flex-end;background:#124b33}
  .hora{font-size:10px;color:#8b93a4;margin-top:3px}
  .wa{display:inline-block;margin-top:10px;font-size:13px;color:#3ddc84;text-decoration:none}
  .aviso{background:#3a2d0c;border:1px solid #6b5416;color:#ffd479;padding:11px 13px;border-radius:10px;font-size:13px;margin-bottom:14px}
</style></head>
<body>
<header>
  <h1>🏍️ BikerPro · panel del bot</h1>
  <div class="sub2">+57 322 7545695 · se refresca cada 30 segundos</div>
</header>
<main>
  <div class="aviso">
    ⚠️ <b>Estos datos se borran en cada despliegue del bot.</b> Se guardan en el disco de
    Render, que es temporal. Si hay pedidos importantes, anotalos aparte hasta que
    conectemos una base de datos.
  </div>
  ${tarjetas}
  <h2>Pedidos</h2>
  <table>
    <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th></tr>
    ${filasPedidos}
  </table>
  <h2>Conversaciones</h2>
  ${bloquesConv}
</main>
<script>setTimeout(function(){location.reload()},30000)</script>
</body></html>`;
}

module.exports = { render };
