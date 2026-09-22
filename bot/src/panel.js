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
const resumen = require("./resumen");

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

  // ---- Números del día, en hora de Bogotá, comparados contra ayer ----
  const hoy = resumen.delDia(resumen.hoyBogota());
  const ayer = resumen.delDia(resumen.ayerBogota());

  const delta = (a, b) => {
    if (!b) return "";
    const d = ((a - b) / b) * 100;
    if (!isFinite(d) || Math.abs(d) < 1) return `<i class="d">= ayer</i>`;
    return d > 0
      ? `<i class="d up">▲ ${d.toFixed(0)}%</i>`
      : `<i class="d dn">▼ ${Math.abs(d).toFixed(0)}%</i>`;
  };

  const tarjetas = `
    <div class="kpis">
      <div class="kpi big ok"><b>${hoy.pedidos}</b><span>pedidos hoy</span>${delta(hoy.pedidos, ayer.pedidos)}</div>
      <div class="kpi big ok"><b>${resumen.fmtCOP(hoy.ingresos)}</b><span>recaudo hoy</span>${delta(hoy.ingresos, ayer.ingresos)}</div>
      <div class="kpi"><b>${hoy.unidades}</b><span>unidades</span></div>
      <div class="kpi"><b>${resumen.fmtCOP(hoy.ticketPromedio)}</b><span>ticket promedio</span></div>
      <div class="kpi"><b>${hoy.conversaciones}</b><span>conversaciones hoy</span>${delta(hoy.conversaciones, ayer.conversaciones)}</div>
      <div class="kpi"><b>${hoy.cierre.toFixed(1)}%${hoy.cierreTopado ? "*" : ""}</b><span>cierre</span></div>
      <div class="kpi"><b>${hoy.share2uds.toFixed(0)}%</b><span>share 2 uds</span></div>
      <div class="kpi ${hoy.esperandoHumano ? "warn" : ""}"><b>${hoy.esperandoHumano}</b><span>esperando humano</span></div>
    </div>
    ${hoy.cierreTopado ? `<p class="nota">* Hay más pedidos que conversaciones de hoy: alguien escribió ayer y confirmó hoy. El cierre se topa en 100%.</p>` : ""}
    ${hoy.topCiudades.length ? `<p class="nota">📍 ${hoy.topCiudades.map(([c, n]) => `${esc(c)} <b>${n}</b>`).join(" · ")}</p>` : ""}
    <div class="acciones">
      <a class="btn" href="/pedidos.csv?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}">⬇️ Descargar pedidos (CSV)</a>
      <a class="btn" href="/cierre?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}&enviar=1">📲 Mandarme el cierre por WhatsApp</a>
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

  // Estado de la persistencia. Antes esta advertencia era FIJA, y una vez
  // montado el disco pasó a ser falsa — peor que no avisar, porque enseña a
  // ignorar los avisos. Ahora refleja la realidad y sirve para verificar de un
  // vistazo que el disco quedó bien configurado.
  const persistente = Boolean(process.env.DATA_DIR);
  const avisoDatos = persistente
    ? `<div class="aviso ok">
         💾 <b>Los pedidos se guardan en disco persistente</b> (<code>${esc(process.env.DATA_DIR)}</code>).
         Sobreviven a los despliegues y reinicios. Además cada pedido queda en el log
         de Render como <code>PEDIDO_JSON</code>, por si acaso.
       </div>`
    : `<div class="aviso">
         ⚠️ <b>DATA_DIR no está configurado: estos datos se borran en el próximo despliegue.</b>
         Montá un disco persistente en Render (Settings → Disks, mount <code>/var/data</code>)
         y poné <code>DATA_DIR=/var/data</code>. Mientras tanto, anotá los pedidos aparte —
         aunque cada uno también queda en el log como <code>PEDIDO_JSON</code>.
       </div>`;

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
  .aviso.ok{background:#12351f;border-color:#1d6b3d;color:#8ff0b5}
  code{background:#0b0d11;padding:1px 5px;border-radius:4px;font-size:12px}
  .kpi.big b{font-size:26px}
  .kpi .d{display:block;font-size:11px;font-style:normal;margin-top:3px;color:#8b93a4}
  .kpi .d.up{color:#3ddc84}.kpi .d.dn{color:#ff6b6b}
  .nota{color:#8b93a4;font-size:12px;margin:8px 0 0}
  .acciones{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 0}
  .btn{background:#1b212b;border:1px solid #2d3542;color:#e7e9ee;padding:8px 12px;border-radius:8px;text-decoration:none;font-size:13px}
  .btn:hover{background:#232b36}
</style></head>
<body>
<header>
  <h1>🏍️ BikerPro · panel del bot</h1>
  <div class="sub2">+57 322 7545695 · se refresca cada 30 segundos</div>
</header>
<main>
  ${avisoDatos}
  ${tarjetas}
  <h2>Pedidos (todos)</h2>
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
