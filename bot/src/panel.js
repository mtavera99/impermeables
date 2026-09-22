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
const atencion = require("./atencion");

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

// ============================================================================
// El número del bot NO va escrito a mano.
//
// Estaba puesto a mano en dos lugares ("+57 322 7545695"). El día que el número
// cambia —y ya pasó— hay que editar el código y volver a desplegar para algo
// que es pura configuración. Peor: el panel seguiría diciendo el número viejo,
// que es justo donde el dueño va a mirar para confirmar cuál está usando.
//
// Ahora sale de BOT_WHATSAPP (en Render). Si no está, se dice "el número del
// bot" en vez de afirmar uno que puede estar equivocado.
// ============================================================================
function numeroDelBot() {
  const n = String(process.env.BOT_WHATSAPP || "").replace(/\D/g, "");
  if (!n) return null;
  const sinPais = n.startsWith("57") && n.length > 10 ? n.slice(2) : n;
  return sinPais.length === 10
    ? `+57 ${sinPais.slice(0, 3)} ${sinPais.slice(3)}`
    : `+${n}`;
}

function render(aviso) {
  const tk = process.env.WHATSAPP_VERIFY_TOKEN || "";
  const numBot = numeroDelBot();
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

  // ---- Prioridad de atención: quién necesita que entres vos ----
  const prior = new Map();
  for (const x of lista) {
    const e = atencion.evaluar(x.tel, x.c);
    if (e.nivel) prior.set(x.tel, e);
  }
  // Los que requieren atención van primero, y entre ellos el más urgente arriba
  lista.sort((a, b) => {
    const pa = prior.get(a.tel), pb = prior.get(b.tel);
    if (pa && pb) return pb.puntos - pa.puntos;
    if (pa) return -1;
    if (pb) return 1;
    return b.cuando - a.cuando;
  });
  const urgentes = lista.filter((x) => prior.get(x.tel)?.nivel === "alta");
  const medios = lista.filter((x) => prior.get(x.tel)?.nivel === "media");

  const bloqueAtencion = (urgentes.length || medios.length)
    ? `<div class="atencion">
         <h3>${urgentes.length ? "🔴" : "🟡"} ${urgentes.length + medios.length} chat(s) necesitan que entres vos</h3>
         ${[...urgentes, ...medios].slice(0, 12).map((x) => {
           const e = prior.get(x.tel);
           return `<a class="fila ${e.nivel}" href="#c${esc(x.tel)}">
             <b>+${esc(x.tel)}</b>
             <span class="por">${esc(e.motivos[0] || "")}</span>
             <span class="cuando">${esc(hace(x.cuando))}</span>
           </a>`;
         }).join("")}
       </div>`
    : `<div class="atencion ok"><h3>🟢 Ningún chat necesita atención humana</h3></div>`;

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
      <a class="btn destacado" href="/guias?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}">📦 Enviar guías (subir el PDF)</a>
      <a class="btn" href="/pedidos.csv?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}">⬇️ Descargar pedidos (CSV)</a>
      <a class="btn" href="/cierre?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}&enviar=1">📲 Mandarme el cierre por WhatsApp</a>
      <a class="btn" href="/limpiar-duplicados?token=${esc(process.env.WHATSAPP_VERIFY_TOKEN || "")}">🧹 Revisar pedidos duplicados</a>
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
          const e = prior.get(x.tel);
          const etiquetaAtencion = e
            ? `<span class="tag ${e.nivel === "alta" ? "alta" : "media"}">${e.nivel === "alta" ? "🔴 atender" : "🟡 revisar"}</span>`
            : "";
          const porQue = e && e.motivos.length
            ? `<div class="porque">${e.nivel === "alta" ? "🔴" : "🟡"} ${e.motivos.map(esc).join(" · ")}</div>`
            : "";
          const etiquetas = [
            etiquetaAtencion,
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
          return `<details class="conv" id="c${esc(x.tel)}">
            <summary>
              <span class="tel">+${esc(x.tel)}</span>
              ${etiquetas}
              <span class="meta">${x.msgs.filter((m) => m.role === "user").length} msg · ${esc(hace(x.cuando))}</span>
            </summary>
            ${porQue}
            <div class="chat">${burbujas}</div>
            <form class="resp" method="POST" action="/responder" data-tel="${esc(x.tel)}">
              <input type="hidden" name="token" value="${esc(tk)}">
              <input type="hidden" name="to" value="${esc(x.tel)}">
              <textarea name="texto" rows="2" placeholder="Escribile como BikerPro… (sale ${esc(numBot ? "del " + numBot : "del número del bot")}, no de tu WhatsApp)"></textarea>
              <button type="submit">Enviar como BikerPro</button>
            </form>
            <div class="envio"></div>
            <form class="pausa" method="POST" action="/pausar">
              <input type="hidden" name="token" value="${esc(tk)}">
              <input type="hidden" name="tel" value="${esc(x.tel)}">
              <input type="hidden" name="valor" value="${x.c.paused ? "0" : "1"}">
              <button type="submit" class="${x.c.paused ? "verde" : ""}">${
                x.c.paused
                  ? "▶️ Devolverle el chat al bot"
                  : "⏸️ Silenciar el bot en este chat"
              }</button>
            </form>
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
  .resp{margin-top:10px;display:flex;gap:6px;align-items:flex-start}
  .resp textarea{flex:1;background:#0f1319;border:1px solid #2d3542;color:#e7e9ee;border-radius:8px;padding:8px;font:13px/1.4 inherit;resize:vertical}
  .resp button{background:#12693f;border:0;color:#fff;padding:9px 12px;border-radius:8px;font-size:13px;cursor:pointer;white-space:nowrap}
  .envio{margin-top:6px;font-size:12px;min-height:16px}
  .envio.ok{color:#3ddc84}.envio.mal{color:#ff6b6b}.envio.wait{color:#ffd479}
  .resp button:disabled{opacity:.5;cursor:default}
  .pausa{margin-top:6px}
  .pausa button{background:#2a313d;border:1px solid #3a4250;color:#c8cfdd;padding:6px 10px;border-radius:8px;font-size:12px;cursor:pointer}
  .pausa button.verde{background:#12351f;border-color:#1d6b3d;color:#8ff0b5}
  .res{padding:10px 13px;border-radius:10px;margin-bottom:12px;font-size:13px}
  .res.ok{background:#12351f;border:1px solid #1d6b3d;color:#8ff0b5}
  .atencion{background:#161a21;border:1px solid #242a35;border-radius:10px;padding:12px;margin:14px 0}
  .atencion h3{margin:0 0 8px;font-size:14px}
  .atencion.ok h3{margin:0;color:#8ff0b5}
  .fila{display:flex;gap:8px;align-items:center;padding:7px 9px;border-radius:8px;margin-bottom:5px;text-decoration:none;color:#e7e9ee;background:#1b212b;border-left:3px solid #6b5416}
  .fila.alta{border-left-color:#ff6b6b;background:#241417}
  .fila.media{border-left-color:#ffb020;background:#241f14}
  .fila:hover{background:#232b36}
  .fila .por{font-size:12px;color:#c8cfdd;flex:1}
  .fila .cuando{font-size:11px;color:#8b93a4}
  .tag.alta{background:#3a1414;color:#ff9b9b}
  .tag.media{background:#3a2d0c;color:#ffd479}
  .porque{margin-top:8px;font-size:12px;color:#ffd479;background:#241f14;padding:7px 9px;border-radius:8px}
  .res.mal{background:#3a1414;border:1px solid #6b1616;color:#ffb3b3}
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
  .btn.destacado{background:#1d4ed8;border-color:#2563eb;font-weight:700}
  .btn.destacado:hover{background:#2563eb}
</style></head>
<body>
<header>
  <h1>🏍️ BikerPro · panel del bot</h1>
  <div class="sub2">${esc(numBot || "poné BOT_WHATSAPP en Render para ver acá el número del bot")} · se refresca cada 30 segundos</div>
</header>
<main>
  ${aviso || ""}
  ${avisoDatos}
  ${bloqueAtencion}
  ${tarjetas}
  <h2>Pedidos (todos)</h2>
  <table>
    <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th></tr>
    ${filasPedidos}
  </table>
  <h2>Conversaciones</h2>
  ${bloquesConv}
</main>
<script>
// ── ENVIAR SIN RECARGAR ──────────────────────────────────────────────────────
// Antes el formulario hacía POST normal y el navegador recargaba la página.
// Eso cerraba la conversación abierta y no dejaba ver si el mensaje salió, así
// que el dueño le daba enviar 2-3 veces y el cliente recibía duplicados.
document.querySelectorAll("form.resp").forEach(function (f) {
  var estado = f.parentElement.querySelector(".envio");
  var btn = f.querySelector("button");
  var ta = f.querySelector("textarea");
  f.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var texto = ta.value.trim();
    if (!texto) return;
    btn.disabled = true;                       // candado contra el doble clic
    estado.className = "envio wait";
    estado.textContent = "Enviando…";
    fetch("/responder?json=1", { method: "POST", body: new FormData(f) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.duplicado) {
          estado.className = "envio wait";
          estado.textContent = "⏭️ " + d.aviso;
          ta.value = "";
          return;
        }
        if (d.ok) {
          estado.className = "envio ok";
          estado.textContent = "✅ Enviado como BikerPro a las " + (d.hora || "");
          // Pintar la burbuja de una, sin esperar a recargar
          var chat = f.parentElement.querySelector(".chat");
          if (chat) {
            var b = document.createElement("div");
            b.className = "msg bot";
            b.innerHTML = '<div class="txt"></div><div class="hora">' + (d.hora || "") + " · vos</div>";
            b.querySelector(".txt").textContent = texto;
            chat.appendChild(b);
            chat.scrollTop = chat.scrollHeight;
          }
          ta.value = "";
        } else {
          estado.className = "envio mal";
          estado.textContent = "🔴 " + (d.error || "No se pudo enviar.");
        }
      })
      .catch(function (e) {
        estado.className = "envio mal";
        estado.textContent = "🔴 Error de red: " + e.message + ". Revisá /eventos antes de reintentar.";
      })
      .finally(function () { btn.disabled = false; });
  });
});

// ── REFRESCO QUE NO INTERRUMPE ───────────────────────────────────────────────
// El refresco fijo cada 30s cerraba la conversación abierta: parecía que la
// ventana "se cerraba sola". Ahora espera a que no estés ocupado, y recuerda
// cuál conversación tenías abierta.
(function () {
  var CLAVE = "bikerpro_chat_abierto";

  // Al cargar, volver a abrir la conversación que estaba abierta
  try {
    var abierto = localStorage.getItem(CLAVE);
    if (abierto) {
      var d = document.getElementById(abierto);
      if (d) { d.open = true; d.scrollIntoView({ block: "center" }); }
    }
  } catch (e) {}

  document.querySelectorAll("details.conv").forEach(function (d) {
    d.addEventListener("toggle", function () {
      try {
        if (d.open) localStorage.setItem(CLAVE, d.id);
        else if (localStorage.getItem(CLAVE) === d.id) localStorage.removeItem(CLAVE);
      } catch (e) {}
    });
  });

  function ocupado() {
    var a = document.activeElement;
    // Escribiendo en un cuadro de texto
    if (a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT")) return true;
    // Hay texto sin enviar en algún cuadro
    var hayTexto = false;
    document.querySelectorAll("form.resp textarea").forEach(function (t) {
      if (t.value.trim()) hayTexto = true;
    });
    if (hayTexto) return true;
    // Hay un mensaje enviándose
    if (document.querySelector(".envio.wait")) return true;
    return false;
  }

  setInterval(function () {
    if (!ocupado()) location.reload();
  }, 45000);
})();
</script>
</body></html>`;
}

module.exports = { render };
