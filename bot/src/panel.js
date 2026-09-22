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

// La contraseña del panel. Se prefiere PANEL_TOKEN y se cae a
// WHATSAPP_VERIFY_TOKEN solo por compatibilidad: ver la explicación larga en
// server.js (el valor viejo quedó publicado en el repo, que es público).
function panelToken() {
  return process.env.PANEL_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || "";
}

const store = require("./store");
const resumen = require("./resumen");
const atencion = require("./atencion");
const embudo = require("./embudo");

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
// 🔴 Cómo se muestra un cliente SIN TELÉFONO (función username de WhatsApp).
// Su clave de conversación es un BSUID como "CO.1098944123092301". Mostrar
// "+CO.1098944123092301" no le sirve de nada al dueño: no sabe con quién habla
// ni puede llamarlo. Se muestra el nombre del perfil y el @username, y se avisa
// que no hay teléfono — porque para despachar contraentrega hace falta y se lo
// va a tener que pedir en el chat.
const RE_BSUID = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;

function comoSeLlama(tel, conv) {
  if (!RE_BSUID.test(String(tel))) return { texto: "+" + tel, sinTelefono: false };
  const p = conv?.perfil || {};
  const nombre = p.nombre || null;
  const user = p.username ? "@" + String(p.username).replace(/^@/, "") : null;
  const etiqueta = [nombre, user].filter(Boolean).join(" · ") || "cliente sin teléfono";
  return { texto: etiqueta, sinTelefono: true };
}

function numeroDelBot() {
  const n = String(process.env.BOT_WHATSAPP || "").replace(/\D/g, "");
  if (!n) return null;
  const sinPais = n.startsWith("57") && n.length > 10 ? n.slice(2) : n;
  return sinPais.length === 10
    ? `+57 ${sinPais.slice(0, 3)} ${sinPais.slice(3)}`
    : `+${n}`;
}

function render(aviso) {
  const tk = panelToken();
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
           const q = comoSeLlama(x.tel, x.c);
           return `<a class="fila ${e.nivel}" href="#c${esc(x.tel)}">
             <b>${esc(q.texto)}${q.sinTelefono ? " 🕵️" : ""}</b>
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
      <a class="btn destacado" href="/guias?token=${esc(panelToken())}">📦 Enviar guías (subir el PDF)</a>
      <a class="btn" href="/pedidos.csv?token=${esc(panelToken())}">⬇️ Descargar pedidos (CSV)</a>
      <a class="btn" href="/cierre?token=${esc(panelToken())}&enviar=1">📲 Mandarme el cierre por WhatsApp</a>
      <a class="btn" href="/limpiar-duplicados?token=${esc(panelToken())}">🧹 Revisar pedidos duplicados</a>
    </div>`;

  const filasPedidos = pedidos.length
    ? pedidos
        .slice(0, 40)
        .map(
          // data-label alimenta el ::before del CSS móvil: en el celular cada
          // fila se vuelve una tarjeta y cada dato muestra su etiqueta al lado.
          // Así no hay que duplicar los títulos en el HTML.
          (p) => `<tr>
            <td class="nowrap" data-label="Fecha">${esc(HORA(new Date(p.fecha).getTime()))}</td>
            <td data-label="Cliente"><b>${esc(p.nombre)}</b><div class="sub">${esc(p.celular || p.telefono_chat)}</div></td>
            <td data-label="Dirección">${esc(p.ciudad)}<div class="sub">${esc(p.direccion)}</div></td>
            <td data-label="Talla / color">${esc(p.talla)} / ${esc(p.color)}</td>
            <td class="nowrap" data-label="Total"><b>${esc(fmtCOP(p.total))}</b><div class="sub">${esc(p.pago)}</div></td>
            <td class="nowrap" data-label="Anuncio">${
              p.anuncio_id
                ? `<span title="${esc(p.anuncio_origen || "")}">…${esc(String(p.anuncio_id).slice(-6))}</span>`
                : `<span class="sub">—</span>`
            }</td>
          </tr>`
        )
        .join("")
    : `<tr><td colspan="6" class="vacio">Todavía no hay pedidos.</td></tr>`;

  // ==========================================================================
  // 📉 EL EMBUDO — dónde se caen los clientes
  //
  // El dueño vio 97 conversaciones y 4 pedidos sin poder saber qué pasó en el
  // medio. Un 4% de cierre puede venir de tres problemas distintos y cada uno
  // se arregla en otro lado. Esto contesta cuál es.
  // ==========================================================================
  const emb = embudo.calcular(store.todasLasConversaciones(), pedidos);
  const pct = (x) => Math.round(x * 100) + "%";
  const filasEmbudo = emb.etapas
    .map((e, i) => {
      const ancho = emb.total > 0 ? Math.max(4, Math.round((e.n / emb.total) * 100)) : 0;
      const esFuga = emb.fuga && emb.fuga.clave === e.clave;
      return `<div class="paso${esFuga ? " fuga" : ""}">
          <div class="barra" style="width:${ancho}%"></div>
          <div class="etiq">
            <b>${e.n}</b> ${esc(e.nombre)}
            <span class="sub">${esc(e.que)}</span>
          </div>
          ${
            i > 0
              ? `<div class="baja">${e.perdidos > 0 ? `−${e.perdidos}` : "—"}<span class="sub">${
                  e.perdidos > 0 ? pct(e.caida) : ""
                }</span></div>`
              : `<div class="baja"><span class="sub">total</span></div>`
          }
        </div>`;
    })
    .join("");

  const bloqueEmbudo =
    emb.total > 0
      ? `<h2>📉 Dónde se caen los clientes</h2>
         <div class="embudo">
           ${filasEmbudo}
           ${
             emb.diagnostico
               ? `<div class="porque"><b>La fuga más grande está en "${esc(emb.fuga.nombre)}"</b> —
                   se perdieron ${emb.fuga.perdidos} ahí.<br>${esc(emb.diagnostico)}</div>`
               : ""
           }
           <p class="nota">Cierre total: <b>${pct(emb.cierre)}</b> · Las etapas se deducen de lo
             que se habló en cada chat, no de una marca del bot: sirve para ver la tendencia y dónde
             mirar, no como contabilidad exacta.</p>
         </div>`
      : "";

  // ==========================================================================
  // 🎯 VENTAS POR ANUNCIO — la tabla que decide dónde va el presupuesto
  //
  // Hasta hoy Meta solo mostraba el costo por CONVERSACIÓN. Esto muestra qué
  // anuncio deja PEDIDOS. Son cosas distintas: un anuncio puede traer charlas
  // baratas y no vender, y ese es justo el que se venía premiando con más
  // presupuesto.
  //
  // Los pedidos viejos (de antes de este cambio) no tienen anuncio y salen
  // agrupados como "sin dato": no se inventa una atribución que no se midió.
  // ==========================================================================
  const porAnuncio = new Map();
  pedidos.forEach((p) => {
    const k = p.anuncio_id || "(sin dato)";
    const a = porAnuncio.get(k) || { pedidos: 0, total: 0, origen: p.anuncio_origen || "" };
    a.pedidos += 1;
    a.total += Number(p.total) || 0;
    porAnuncio.set(k, a);
  });
  const filasAnuncios = [...porAnuncio.entries()]
    .sort((a, b) => b[1].pedidos - a[1].pedidos)
    .map(
      ([id, a]) => `<tr>
          <td class="nowrap" data-label="Anuncio">${id === "(sin dato)" ? '<span class="sub">(sin dato)</span>' : esc(id)}</td>
          <td data-label="De dónde">${esc(a.origen || "")}</td>
          <td class="nowrap" data-label="Pedidos"><b>${a.pedidos}</b></td>
          <td class="nowrap" data-label="Vendido"><b>${esc(fmtCOP(a.total))}</b></td>
        </tr>`
    )
    .join("");
  const bloqueAnuncios = pedidos.length
    ? `<h2>🎯 Pedidos por anuncio</h2>
       <p class="sub">Cruzá el <b>id</b> con el gasto de ese anuncio en Meta Ads y tenés el costo real por venta.</p>
       <div class="tabla"><table>
         <tr><th>Anuncio</th><th>De dónde</th><th>Pedidos</th><th>Vendido</th></tr>
         ${filasAnuncios}
       </table></div>`
    : "";

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
              <span class="tel">${esc(comoSeLlama(x.tel, x.c).texto)}${
                comoSeLlama(x.tel, x.c).sinTelefono
                  ? ` <b style="color:#ffc857">🕵️ sin teléfono</b>`
                  : ""
              }</span>
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
  // 🔴 Antes esto era `Boolean(process.env.DATA_DIR)`: daba el aviso VERDE con
  // solo existir la variable, sin comprobar que hubiera un disco. Si la ruta
  // del disco no coincidía con DATA_DIR, decía "todo bien" y los datos se
  // borraban igual. Ahora se pregunta al sistema de archivos.
  const disco = store.estadoDelDisco();
  const aguanto = disco.arranques > 1;
  const desdeTxto = disco.desde
    ? new Date(disco.desde).toLocaleDateString("es-CO", { day: "numeric", month: "short" })
    : null;

  let avisoDatos;
  if (!disco.configurado) {
    avisoDatos = `<div class="aviso">
         ⚠️ <b>DATA_DIR no está configurado: estos datos se borran en el próximo despliegue.</b>
         Montá un disco persistente en Render (Settings → Disks, mount <code>/var/data</code>)
         y poné <code>DATA_DIR=/var/data</code>. Mientras tanto, anotá los pedidos aparte —
         aunque cada uno también queda en el log como <code>PEDIDO_JSON</code>.
       </div>`;
  } else if (disco.discoAparte === false) {
    // El caso peligroso que antes salía en verde.
    avisoDatos = `<div class="aviso mal">
         🔴 <b>DATA_DIR apunta a <code>${esc(disco.dir)}</code>, pero ahí NO hay un disco montado:
         es una carpeta del contenedor y se borra en el próximo despliegue.</b>
         En Render → Settings → Disks, revisá que el <i>Mount Path</i> del disco sea
         exactamente <code>${esc(disco.dir)}</code>. Los pedidos igual quedan en el log
         como <code>PEDIDO_JSON</code>.
       </div>`;
  } else if (disco.discoAparte === true) {
    avisoDatos = `<div class="aviso ok">
         💾 <b>Disco persistente comprobado</b> (<code>${esc(disco.dir)}</code>${
      desdeTxto ? `, con datos desde el ${esc(desdeTxto)}` : ""
    }).
         ${
           aguanto
             ? `Ya sobrevivió <b>${disco.arranques} arranques</b> del bot: está probado, no supuesto.`
             : "Primer arranque con el disco: el contador de arranques empieza ahora."
         }
         Cada pedido queda además en el log de Render como <code>PEDIDO_JSON</code>.
       </div>`;
  } else {
    // No se pudo determinar. Se dice, en vez de elegir el mensaje optimista.
    avisoDatos = `<div class="aviso">
         ⚠️ <b>No se pudo comprobar si <code>${esc(disco.dir)}</code> es un disco persistente.</b>
         La variable está puesta, pero la verificación falló, así que no se puede
         afirmar que los datos sobrevivan a un despliegue. Revisá Settings → Disks.
       </div>`;
  }

  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BikerPro · panel del bot</title>
<style>
  /* ==========================================================================
     DISEÑO MÓVIL PRIMERO (rehecho el 22-sep)
     El dueño usa este panel DESDE EL IPHONE y se veía mal. La causa era simple
     y grave: no había UNA SOLA media query. Lo que se arregló y por qué:

       · Las tablas de 6 columnas no caben en 390px: se salían o se aplastaban.
         En móvil cada fila se convierte en una TARJETA, con la etiqueta de cada
         dato al lado (sale de data-label, no de texto duplicado en el HTML).
       · Los cuadros de texto tenían 13px. iOS hace ZOOM automático en cualquier
         input de menos de 16px, y al escribirle a un cliente la página se
         agrandaba sola. Ahora los campos son de 16px: el zoom no se dispara.
       · Los botones medían ~30px de alto. La guía de Apple pide 44px para que
         el dedo acierte. Todos los botones tienen min-height 44px en móvil.
       · Faltaba el área segura del iPhone: el último botón quedaba debajo de la
         barra de gestos. Ahora hay padding con env(safe-area-inset-bottom).
       · touch-action:manipulation quita el retardo de ~300ms del doble toque,
         que es lo que hacía sentir el panel "pesado".
     ========================================================================== */
  :root{
    color-scheme:dark;
    --bg:#0f1115; --card:#161a21; --card2:#1b212b; --linea:#242a35;
    --txt:#e7e9ee; --gris:#8b93a4; --verde:#3ddc84; --amarillo:#ffb020;
    --rojo:#ff6b6b; --azul:#2563eb;
  }
  *{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
  body{
    margin:0;font:16px/1.5 -apple-system,BlinkMacSystemFont,system-ui,"Segoe UI",sans-serif;
    background:var(--bg);color:var(--txt);
    -webkit-font-smoothing:antialiased;
    padding-bottom:calc(24px + env(safe-area-inset-bottom));
    overflow-x:hidden;
  }
  header{
    padding:12px max(16px,env(safe-area-inset-left));
    background:rgba(22,26,33,.92);backdrop-filter:saturate(180%) blur(12px);
    border-bottom:1px solid var(--linea);position:sticky;top:0;z-index:20;
  }
  h1{margin:0;font-size:17px;letter-spacing:-.01em}
  .sub2{color:var(--gris);font-size:12px;margin-top:2px}
  main{padding:16px;max-width:920px;margin:0 auto}
  /* scroll-margin-top deja el título visible cuando se salta a una sección:
     sin esto la cabecera fija (sticky) le tapa la primera línea. */
  h2{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--gris);margin:26px 0 10px;scroll-margin-top:76px}
  .conv{scroll-margin-top:76px}

  /* --- Tarjetas de números --- */
  .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
  .kpi{background:var(--card);border:1px solid var(--linea);border-radius:14px;padding:14px;text-align:center}
  .kpi b{display:block;font-size:24px;letter-spacing:-.02em}
  .kpi span{font-size:11px;color:var(--gris)}
  .kpi.ok b{color:var(--verde)}.kpi.warn b{color:var(--amarillo)}

  /* --- Tablas --- */
  .tabla{background:var(--card);border:1px solid var(--linea);border-radius:14px;overflow:hidden}
  table{width:100%;border-collapse:collapse}
  th,td{padding:11px 12px;text-align:left;border-bottom:1px solid var(--linea);vertical-align:top;font-size:13px}
  tr:last-child td{border-bottom:0}
  th{background:var(--card2);font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--gris)}
  .sub{color:var(--gris);font-size:12px;margin-top:2px}
  .nowrap{white-space:nowrap}
  .vacio{color:var(--gris);text-align:center;padding:26px}

  /* --- Conversaciones --- */
  .conv{background:var(--card);border:1px solid var(--linea);border-radius:14px;margin-bottom:10px;padding:12px 14px}
  .conv[open]{border-color:#2f3947;background:#171c24}
  .conv summary{
    cursor:pointer;display:flex;gap:8px;align-items:center;flex-wrap:wrap;
    list-style:none;min-height:32px;
  }
  .conv summary::-webkit-details-marker{display:none}
  .conv summary::after{
    content:"›";margin-left:auto;color:var(--gris);font-size:22px;line-height:1;
    transition:transform .18s ease;
  }
  .conv[open] summary::after{transform:rotate(90deg)}
  .tel{font-weight:650;letter-spacing:-.01em}
  .meta{color:var(--gris);font-size:12px}
  .tag{font-size:10px;padding:3px 8px;border-radius:99px;background:#2a313d;color:#c8cfdd;white-space:nowrap}
  .tag.ok{background:#12351f;color:var(--verde)}.tag.warn{background:#3a2d0c;color:var(--amarillo)}.tag.no{background:#3a1414;color:var(--rojo)}

  /* --- Burbujas del chat --- */
  .chat{
    margin-top:12px;display:flex;flex-direction:column;gap:7px;
    max-height:58vh;overflow-y:auto;-webkit-overflow-scrolling:touch;
    padding-right:2px;overscroll-behavior:contain;
  }
  .msg{max-width:84%;padding:8px 11px;border-radius:14px;font-size:14px;word-break:break-word}
  .msg.cli{align-self:flex-start;background:#222834;border-bottom-left-radius:5px}
  .msg.bot{align-self:flex-end;background:#12563a;border-bottom-right-radius:5px}
  .hora{font-size:10px;color:var(--gris);margin-top:3px;opacity:.85}

  /* --- Responder --- */
  .resp{margin-top:12px;display:flex;gap:8px;align-items:flex-start}
  .resp textarea{
    flex:1;background:#0f1319;border:1px solid #2d3542;color:var(--txt);
    border-radius:12px;padding:11px;
    /* 16px NO es decorativo: menos que eso hace que iOS agrande la página */
    font:16px/1.45 inherit;resize:vertical;min-height:46px;
    transition:border-color .15s ease;
  }
  .resp textarea:focus{outline:none;border-color:#3b82f6}
  .resp button{
    background:#12693f;border:0;color:#fff;padding:0 16px;min-height:46px;
    border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;
    white-space:nowrap;touch-action:manipulation;transition:background .15s ease,transform .1s ease;
  }
  .resp button:active{transform:scale(.97)}
  .resp button:hover{background:#158a51}
  .envio{margin-top:8px;font-size:13px;min-height:18px}
  .envio.ok{color:var(--verde)}.envio.mal{color:var(--rojo)}.envio.wait{color:#ffd479}
  .resp button:disabled{opacity:.5;cursor:default}
  .pausa{margin-top:8px}
  .pausa button{
    background:#2a313d;border:1px solid #3a4250;color:#c8cfdd;padding:9px 14px;
    border-radius:10px;font-size:13px;cursor:pointer;touch-action:manipulation;min-height:38px;
  }
  .pausa button:active{transform:scale(.97)}
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
  .aviso.mal{background:#3d1418;border-color:#7d2630;color:#ff9aa4}
  code{background:#0b0d11;padding:1px 5px;border-radius:4px;font-size:12px}
  .kpi.big b{font-size:26px}
  .kpi .d{display:block;font-size:11px;font-style:normal;margin-top:3px;color:#8b93a4}
  .kpi .d.up{color:#3ddc84}.kpi .d.dn{color:#ff6b6b}
  .nota{color:#8b93a4;font-size:12px;margin:8px 0 0}
  /* --- Embudo --- */
  .embudo{background:var(--card);border:1px solid var(--linea);border-radius:14px;padding:14px}
  .paso{position:relative;display:flex;align-items:center;gap:12px;padding:10px 12px;margin-bottom:6px;border-radius:10px;overflow:hidden;background:#12161d}
  .paso .barra{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#1d4ed8,#2563eb);opacity:.28}
  .paso.fuga .barra{background:linear-gradient(90deg,#7d2630,#c2410c);opacity:.34}
  .paso .etiq{position:relative;flex:1;font-size:14px}
  .paso .etiq b{font-size:19px;margin-right:6px}
  .paso .etiq .sub{display:block;font-size:11px}
  .paso .baja{position:relative;text-align:right;font-size:14px;color:var(--rojo);font-weight:600;white-space:nowrap}
  .paso .baja .sub{display:block;font-weight:400}
  .paso.fuga{outline:1px solid #7d2630}

  .acciones{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 0}
  .btn{
    background:var(--card2);border:1px solid #2d3542;color:var(--txt);
    padding:0 14px;min-height:44px;display:inline-flex;align-items:center;gap:6px;
    border-radius:12px;text-decoration:none;font-size:14px;font-weight:500;
    touch-action:manipulation;transition:background .15s ease,transform .1s ease;
  }
  .btn:hover{background:#232b36}
  .btn:active{transform:scale(.98)}
  .btn.destacado{background:#1d4ed8;border-color:var(--azul);font-weight:700}
  .btn.destacado:hover{background:var(--azul)}

  /* ==========================================================================
     MÓVIL — hasta 640px. Es la pantalla real de uso.
     ========================================================================== */
  @media (max-width:640px){
    main{padding:12px}
    h1{font-size:16px}
    h2{margin:22px 0 8px}

    /* Dos columnas fijas: el auto-fit metía tres KPIs apretados y se cortaban */
    .kpis{grid-template-columns:1fr 1fr;gap:8px}
    .kpi{padding:12px 10px}
    .kpi b{font-size:21px}
    .kpi.big b{font-size:23px}

    /* --- LA TABLA SE VUELVE TARJETAS ---
       Una tabla de 6 columnas en 390px es ilegible. Cada fila pasa a ser una
       tarjeta y cada celda muestra su etiqueta, que viene de data-label. */
    .tabla{background:transparent;border:0;border-radius:0;overflow:visible}
    .tabla table,.tabla tbody,.tabla tr,.tabla td{display:block;width:100%}
    .tabla tr:first-child{display:none}          /* la fila de encabezados */
    .tabla tr{
      background:var(--card);border:1px solid var(--linea);border-radius:14px;
      padding:10px 12px;margin-bottom:10px;
    }
    /* La etiqueta a la izquierda y el valor a la derecha, y si el valor es
       largo se va solo al renglón siguiente en vez de partirse en pedazos.
       El margin-right:auto de la etiqueta es lo que empuja el valor a la
       derecha sin necesitar un div extra alrededor del valor. */
    .tabla td{
      border:0;padding:6px 0;display:flex;flex-wrap:wrap;
      justify-content:flex-end;align-items:baseline;gap:2px 12px;
      font-size:14px;text-align:right;
    }
    .tabla td::before{
      content:attr(data-label);color:var(--gris);font-size:11px;
      text-transform:uppercase;letter-spacing:.04em;
      margin-right:auto;text-align:left;flex:0 0 auto;max-width:42%;
    }
    /* El dato secundario (teléfono, dirección, forma de pago) baja a su propio
       renglón. Antes quedaba pegado al lado del principal: "Bogota Cra 7 #80". */
    .tabla td .sub{flex:0 0 100%;text-align:right;margin-top:0}
    .tabla td:empty{display:none}
    /* La celda vacía de "todavía no hay pedidos" no debe verse como tarjeta */
    .tabla td.vacio{display:block;text-align:center;padding:20px}
    .tabla td.vacio::before{content:none}

    .conv{padding:12px;border-radius:14px}
    .meta{width:100%;order:3}
    .msg{max-width:90%;font-size:14px}
    .chat{max-height:62vh}

    /* El botón de enviar abajo y a lo ancho: al lado quedaba de 60px y el
       cuadro de texto sin espacio para leer lo que se estaba escribiendo. */
    .resp{flex-direction:column;gap:8px}
    .resp textarea{width:100%;min-height:76px}
    .resp button{width:100%;min-height:48px;font-size:16px}

    .acciones{flex-direction:column}
    .btn{width:100%;justify-content:center}

    .fila{padding:10px;min-height:44px}
    .aviso,.res{font-size:13px;padding:11px 12px;border-radius:12px}
  }

  /* Pantallas muy angostas (iPhone SE y similares) */
  @media (max-width:360px){
    .kpis{grid-template-columns:1fr}
    .tabla td{flex-direction:column;gap:2px}
    .tabla td::before{flex:none}
  }

  /* Respeta a quien pidió menos animación en el sistema */
  @media (prefers-reduced-motion:reduce){
    *{transition:none!important;scroll-behavior:auto!important}
  }
</style></head>
<body>
<header>
  <h1>🏍️ BikerPro · panel del bot</h1>
  <div class="sub2">${esc(numBot || "poné BOT_WHATSAPP en Render para ver acá el número del bot")} · se refresca cada 45 s (nunca mientras escribís)</div>
</header>
<main>
  ${aviso || ""}
  ${avisoDatos}
  ${bloqueAtencion}
  ${tarjetas}
  ${bloqueEmbudo}
  <h2>Pedidos (todos)</h2>
  <div class="tabla"><table>
    <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th><th>Anuncio</th></tr>
    ${filasPedidos}
  </table></div>
  ${bloqueAnuncios}
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
    // ========================================================================
    // 🔴 POR QUÉ ACÁ NO SE USA FormData (bug encontrado el 22-sep, iPhone)
    //
    // Esto era "body: new FormData(f)" y el botón NO FUNCIONABA NUNCA. Dos
    // fallas encimadas, las dos medidas contra el servicio real:
    //
    //  1. El servidor solo parsea JSON y urlencoded (express.urlencoded). Un
    //     cuerpo multipart/form-data le llega VACÍO, así que req.body.token
    //     queda undefined y responde 403.
    //       multipart  -> HTTP 403 Forbidden
    //       urlencoded -> HTTP 200  ✅
    //
    //  2. En el Safari del iPhone el fetch con FormData ni siquiera salía:
    //     tiraba "The string did not match the expected pattern", que este
    //     panel mostraba como "Error de red" — y eso manda a buscar el
    //     problema en la conexión o en Meta, cuando estaba acá.
    //
    // Se arma a mano en vez de "new URLSearchParams(new FormData(f))" para no
    // tocar FormData en absoluto, que es justamente lo que rompe en Safari.
    //
    // ⚠️ OJO al editar: este bloque vive DENTRO de un template literal de
    // JavaScript. Acá NO se pueden usar comillas invertidas, ni el signo de
    // dólar seguido de llave: las dos cosas cortan el texto y dejan el panel
    // con SyntaxError. Ya rompió dos veces, incluso en un comentario.
    // ========================================================================
    var datos = new URLSearchParams();
    Array.prototype.forEach.call(f.elements, function (el) {
      if (el.name) datos.append(el.name, el.value);
    });

    fetch("/responder?json=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: datos.toString()
    })
      .then(function (r) {
        // Un 403 devuelve "Forbidden" en texto plano, no JSON: sin esto
        // r.json() explota y el fallo sale disfrazado de "Error de red".
        if (r.status === 403) {
          throw new Error(
            "la clave del panel no coincide. Volvé a abrir el panel con el token " +
              "correcto (el valor de PANEL_TOKEN en Render)."
          );
        }
        if (!r.ok) throw new Error("el servidor respondió " + r.status + ".");
        return r.json();
      })
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
        estado.textContent = "🔴 No salió: " + e.message + " El mensaje NO se envió, se puede reintentar.";
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
