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

  // 📋 Pendientes de despachar vs ya despachados. Se calcula acá arriba porque
  // la tarjeta de "pendientes" va en los KPIs, antes de las tablas.
  // Un pedido está despachado cuando tiene la guía anotada, que es lo que pasa
  // al mandársela al cliente. Los pendientes van del MÁS VIEJO al más nuevo: en
  // una lista de trabajo lo urgente es lo que lleva más tiempo esperando.
  const pendientes = pedidos.filter((p) => !p.guia).slice().reverse();
  const despachados = pedidos.filter((p) => p.guia);
  const totalPendiente = pendientes.reduce((s, p) => s + Number(p.total || 0), 0);
  const sinCelularCuantos = pendientes.filter((p) => !String(p.celular || "").trim()).length;

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

  // ==========================================================================
  // 📅 AGRUPADO POR DÍA (25-sep), a pedido del dueño:
  //
  //   "deberíamos crear algo en el que el día de hoy me salgan los del día de
  //    hoy y no los de dos o tres días atrás, o sea organizar eso más para que
  //    visualmente sea más fácil y más rápido"
  //
  // Se agrupa por el día del ÚLTIMO MENSAJE DEL CLIENTE, no por cuándo se
  // escaló: lo que importa es desde cuándo está esperando él.
  //
  // ⚠️ El día se calcula en hora de Bogotá con `resumen.diaBogota`. Render corre
  // en UTC, y a partir de las 19:00 de Bogotá un `new Date()` pelado ya dice
  // "mañana": los chats de la tarde saldrían en el grupo equivocado.
  // ==========================================================================
  const HOY = resumen.hoyBogota();
  const AYER = resumen.ayerBogota();
  const chatsPendientes = [...urgentes, ...medios];

  // ==========================================================================
  // 🔘 UN PUNTO QUE SE PRENDE AL TOQUE — UNA SOLA LISTA (25-sep)
  //
  // DE DÓNDE SALE, en palabras del dueño:
  //
  //   "optimizá más lo de los mensajes que ya se van respondiendo, los de
  //    atención humana, porque el sistema para saber que ya se respondieron o no
  //    está muy obsoleto. Ponle algún punto o algo que reaccione rápido, y no
  //    que se vaya a otras listas o cosas más complejas"
  //
  // 🔴 LO QUE ESTABA MAL EN MI PRIMERA VERSIÓN: el ✅ era un formulario que hacía
  // POST, el servidor respondía un redirect y el navegador RECARGABA TODO EL
  // PANEL. En un celular con datos eso es un segundo largo de pantalla en
  // blanco. Y encima el chat desaparecía de la lista y reaparecía en otro bloque
  // más abajo, así que había que buscarlo con el ojo para confirmar que pasó algo.
  //
  // Tres problemas: lento, la fila salta, y la información del mismo chat vivía
  // en dos lugares distintos.
  //
  // 🔑 AHORA: un punto al lado de cada chat, se toca y cambia de color EN EL
  // MOMENTO, sin esperar la red y sin recargar nada. Un solo listado: los
  // respondidos se quedan donde están, apagados. Se lee como una lista de
  // tareas tachadas.
  //
  // ⚠️ La fila NO se reordena al tocarla, y es a propósito: si se moviera, el
  // dedo quedaría sobre otro chat y el siguiente toque marcaría al equivocado.
  // El orden se acomoda en el próximo refresco, cuando ya no hay un dedo encima.
  // ==========================================================================
  const todosAtendidos = atencion.atendidos(convs);
  const atendidoDe = new Map(todosAtendidos.map((a) => [a.tel, a]));

  // Los atendidos siguen en la MISMA lista. Solo se muestran los de hoy y ayer:
  // un chat resuelto anteayer ya no es información, es ruido.
  const atendidosVisibles = todosAtendidos.filter((a) => {
    const d = resumen.diaBogota(a.esperaDesde || a.atendidoAt);
    return d === HOY || d === AYER;
  });

  const diaDe = (x) => {
    const e = prior.get(x.tel) || atendidoDe.get(x.tel);
    return resumen.diaBogota(e?.esperaDesde || x.cuando || e?.atendidoAt);
  };
  const todosLosChats = [...chatsPendientes, ...atendidosVisibles];
  const armarGrupo = (titulo, filtro) => {
    const items = todosLosChats.filter(filtro);
    // Los pendientes primero; los ya respondidos abajo, apagados.
    items.sort((a, b) => {
      const la = atendidoDe.has(a.tel) ? 1 : 0;
      const lb = atendidoDe.has(b.tel) ? 1 : 0;
      if (la !== lb) return la - lb;
      return (prior.get(b.tel)?.puntos || 0) - (prior.get(a.tel)?.puntos || 0);
    });
    return { titulo, items, faltan: items.filter((x) => !atendidoDe.has(x.tel)).length };
  };
  const grupos = [
    armarGrupo("Hoy", (x) => diaDe(x) === HOY),
    armarGrupo("Ayer", (x) => diaDe(x) === AYER),
    armarGrupo("Más viejos", (x) => diaDe(x) !== HOY && diaDe(x) !== AYER),
  ].filter((g) => g.items.length);

  const filaAtencion = (x) => {
    const hecho = atendidoDe.get(x.tel);
    const e = prior.get(x.tel) || hecho;
    const q = comoSeLlama(x.tel, x.c);
    // Si ya se atendió, el renglón dice CÓMO: escribirle queda en el chat,
    // marcarlo pudo ser una llamada. Es el control de lo que se respondió.
    const texto = hecho
      ? hecho.atendidoComo === "marca"
        ? "lo marcaste como resuelto"
        : "le respondiste vos"
      : e.motivos?.[0] || "";
    return `<div class="fila ${hecho ? "hecho" : e.nivel}" data-tel="${esc(x.tel)}" data-listo="${
      hecho ? "1" : "0"
    }">
      <button type="button" class="punto" onclick="marcarChat(this)"
        title="Tocar para marcar que ya lo respondiste"><span></span></button>
      <a class="filaLink" href="#c${esc(x.tel)}">
        <b>${esc(q.texto)}${q.sinTelefono ? " 🕵️" : ""}</b>
        <span class="por">${esc(texto)}</span>
      </a>
      <span class="cuando">${esc(hace(hecho ? hecho.atendidoAt : e.esperaDesde || x.cuando))}</span>
      <a class="vendio" title="Registrar la venta de este cliente"
         href="/chat?token=${esc(panelToken())}&id=${encodeURIComponent(x.tel)}#venta">💰</a>
    </div>`;
  };

  const faltanTotal = chatsPendientes.length;
  const bloqueAtencion = todosLosChats.length
    ? `<div class="atencion">
         <h3><span id="faltan">${faltanTotal}</span> chat(s) esperando respuesta${
           grupos.length > 1
             ? ` · <span class="desglose">${grupos
                 .map((g) => `${g.faltan} ${g.titulo.toLowerCase()}`)
                 .join(" · ")}</span>`
             : ""
         }</h3>
         ${grupos
           .map(
             (g) => `<div class="grupo">
               <h4>${esc(g.titulo)} · ${g.faltan}</h4>
               ${g.items.slice(0, 20).map(filaAtencion).join("")}
               ${
                 g.items.length > 20
                   ? `<p class="nota">…y ${g.items.length - 20} más de ${g.titulo.toLowerCase()}.</p>`
                   : ""
               }
             </div>`
           )
           .join("")}
         <p class="nota">Tocá el punto cuando ya le respondiste. Si el cliente vuelve a escribir, se prende solo.</p>
       </div>`
    : `<div class="atencion ok"><h3>🟢 Ningún chat está esperando respuesta</h3></div>`;

  const totalMsgsCliente = lista.reduce(
    (s, x) => s + x.msgs.filter((m) => m.role === "user").length,
    0
  );
  const conPedido = lista.filter((x) => x.c.compro).length;
  // ⚠️ Antes esto contaba `paused`, y `paused` no se apaga al contestar: el KPI
  // decía "12 esperando humano" cuando los 12 ya estaban respondidos. Ahora
  // cuenta los que de verdad esperan una respuesta.
  const enHumano = chatsPendientes.length;

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
      <!-- Esta tarjeta NO es de hoy: es el trabajo acumulado. Un pedido de
           anteayer sin despachar importa más que uno de hoy, y en un panel
           donde todo lo demás dice "hoy" hay que decirlo explícito. -->
      <div class="kpi ${pendientes.length ? "warn" : "ok"}"><b>${pendientes.length}</b><span>pendientes de despachar</span>
        <span class="d">${pendientes.length ? esc(fmtCOP(totalPendiente)) + " por recaudar" : "todo despachado"}</span>
      </div>
    </div>
    ${hoy.cierreTopado ? `<p class="nota">* Hay más pedidos que conversaciones de hoy: alguien escribió ayer y confirmó hoy. El cierre se topa en 100%.</p>` : ""}
    ${hoy.topCiudades.length ? `<p class="nota">📍 ${hoy.topCiudades.map(([c, n]) => `${esc(c)} <b>${n}</b>`).join(" · ")}</p>` : ""}
    <div class="acciones">
      <a class="btn destacado" href="/guias?token=${esc(panelToken())}">📦 Enviar guías (subir el PDF)</a>
      <a class="btn" href="/auditoria?token=${esc(panelToken())}">🔍 Auditar el día (¿se perdió una venta?)</a>
      <a class="btn" href="/novedades?token=${esc(panelToken())}">📮 Avisar novedades de entrega</a>
      <a class="btn" href="/pedidos.csv?token=${esc(panelToken())}">⬇️ Descargar pedidos (CSV)</a>
      <a class="btn" href="/cierre?token=${esc(panelToken())}&enviar=1">📲 Mandarme el cierre por WhatsApp</a>
      <a class="btn" href="/limpiar-duplicados?token=${esc(panelToken())}">🧹 Revisar pedidos duplicados</a>
    </div>`;

  // ==========================================================================
  // 📋 PENDIENTES DE DESPACHAR vs YA DESPACHADOS
  //
  // POR QUÉ: los pedidos se acumulan para siempre (bien: son la contabilidad),
  // y el panel los mostraba TODOS mezclados. Con 8 se maneja; con 30 al día, en
  // una semana no hay forma de saber cuál ya se mandó. El dueño lo preguntó
  // así: "cómo va a manejar ese orden para no enredarnos con las ventas".
  //
  // El dato ya existía y no se estaba usando: cuando se le manda la guía a un
  // cliente, queda anotada en su pedido (`guia`). Con guía = despachado.
  //
  // Los pendientes van PRIMERO y del MÁS VIEJO al más nuevo, al revés que el
  // resto del panel. Es a propósito: en una lista de trabajo lo urgente es lo
  // que lleva más tiempo esperando, no lo que acaba de entrar.
  // ==========================================================================
  const UN_DIA = 24 * 60 * 60 * 1000;

  const filaPedido = (p, opciones = {}) => {
    const cuando = new Date(p.fecha).getTime();
    const viejo = Date.now() - cuando > UN_DIA;
    // Sin celular no se puede hacer la guía: la transportadora lo exige. Vale
    // marcarlo acá para no descubrirlo con el PDF ya subido.
    const sinCelular = !String(p.celular || "").trim();
    // ========================================================================
    // 🔴 SIN DIRECCIÓN TAMPOCO SE PUEDE DESPACHAR (23-sep)
    //
    // Lo encontró el dueño cargando guías: el pedido de un cliente traía solo
    // la ciudad, sin dirección, y no había forma de saber si era una oficina de
    // Interrapidísimo o si el bot simplemente nunca la pidió.
    //
    // Es el mismo agujero que el del celular, y se marca igual: descubrirlo con
    // el PDF ya subido cuesta una llamada y un despacho trabado.
    // ========================================================================
    const sinDireccion = !String(p.direccion || "").trim();
    // Enlace para leer el chat completo de ese cliente desde el celular, sin
    // tener que entrar al shell de Render.
    const verChat = p.telefono_chat
      ? ` <a class="chatlink" href="/chat?token=${esc(panelToken())}&id=${encodeURIComponent(
          p.telefono_chat
        )}">ver chat</a>`
      : "";
    return `<tr${opciones.anulado ? ' class="anulado"' : ""}>
      <td class="nowrap" data-label="Fecha">${esc(HORA(cuando))}${
      viejo && !opciones.despachado ? ' <span class="tag warn">+1 día</span>' : ""
    }</td>
      <td data-label="Cliente"><b>${esc(p.nombre)}</b>${verChat}${
      // ⚠️ Ya le habíamos vendido antes. Puede ser real o el bot tomando por
      // pedido la respuesta de alguien que ya tiene su guía. No se despacha sin
      // confirmar: eso ya pasó el 23-sep y ensució el conteo de ventas.
      p.posible_duplicado ? ' <span class="tag no">⚠️ ¿REPETIDO?</span>' : ""
    }${
      // 🔴 El cliente no dijo un "sí" reconocible. Puede ser un "hágale" que no
      // entendimos, o puede que no haya comprado. No se despacha sin leer el chat.
      p.sin_confirmar ? ' <span class="tag no">🔴 SIN CONFIRMAR</span>' : ""
    }<div class="sub">${esc(p.celular || p.telefono_chat)}${
      sinCelular ? ' · <b style="color:#ff9aa4">🔴 falta celular</b>' : ""
    }${
      p.posible_duplicado
        ? `<br><b style="color:#ff9aa4">⚠️ ya tenía un pedido de ${esc(
            fmtCOP(p.pedido_previo_total)
          )} — confirmá antes de despachar</b>`
        : ""
    }${
      p.sin_confirmar
        ? '<br><b style="color:#ff9aa4">🔴 no dijo un "sí" claro — leé el chat antes de despachar</b>'
        : ""
    }</div></td>
      <td data-label="Dirección">${esc(p.ciudad)}${
      // 🏢 Entrega en oficina: no va con mensajero a una casa. Verlo de un
      // vistazo evita mandar un domicilio a una recogida y al revés.
      p.entrega === "oficina" ? ' <span class="tag oficina">🏢 OFICINA</span>' : ""
    }<div class="sub">${
      sinDireccion
        ? '<b style="color:#ff9aa4">🔴 falta dirección — abrí el chat</b>'
        : esc(p.direccion) +
          (p.direccion_dudosa
            ? '<br><b style="color:#ff9aa4">🔴 dirección sin confirmar' +
              (p.direccion_falta ? ` — falta ${esc(p.direccion_falta)}` : "") +
              "</b>"
            : "")
    }</div></td>
      <td data-label="Talla / color">${esc(p.talla)} / ${esc(p.color)}</td>
      <td class="nowrap" data-label="Total"><b>${esc(fmtCOP(p.total))}</b><div class="sub">${esc(p.pago)}</div></td>
      <td class="nowrap" data-label="${
        opciones.anulado ? "Motivo" : opciones.despachado ? "Guía" : "Anuncio"
      }">${
      opciones.anulado
        ? `<span class="sub">${esc(p.motivo_anulacion || "sin motivo")}</span>`
        : opciones.despachado
        ? `<code>${esc(p.guia)}</code>`
        : p.anuncio_id
        ? `<span title="${esc(p.anuncio_origen || "")}">…${esc(String(p.anuncio_id).slice(-6))}</span>`
        : `<span class="sub">—</span>`
    }</td>
      <td class="nowrap" data-label="">${
        // 🚫 Anular: para el pedido que el bot tomó de más, o el que el cliente
        // canceló. No borra nada — deja de contar como venta y queda el registro.
        opciones.anulado
          ? `<form method="post" action="/reactivar" class="acc">
               <input type="hidden" name="token" value="${esc(panelToken())}">
               <input type="hidden" name="fecha" value="${esc(p.id || p.fecha)}">
               <button type="submit" class="mini">↩️ reactivar</button>
             </form>`
          : `<form method="post" action="/anular" class="acc"
                 onsubmit="return confirm('¿Anular el pedido de ${esc(
                   String(p.nombre || "").replace(/'/g, "")
                 )}? Deja de contar como venta, pero queda en el registro.')">
               <input type="hidden" name="token" value="${esc(panelToken())}">
               <input type="hidden" name="fecha" value="${esc(p.id || p.fecha)}">
               <input type="hidden" name="motivo" value="anulado desde el panel">
               <button type="submit" class="mini">🚫 anular</button>
             </form>`
      }</td>
    </tr>`;
  };

  const filasPendientes = pendientes.length
    ? pendientes.map((p) => filaPedido(p)).join("")
    : `<tr><td colspan="7" class="vacio">🎉 No hay nada pendiente: todos los pedidos tienen su guía enviada.</td></tr>`;

  const filasDespachados = despachados.length
    ? despachados.slice(0, 60).map((p) => filaPedido(p, { despachado: true })).join("")
    : `<tr><td colspan="7" class="vacio">Todavía no se ha despachado ningún pedido.</td></tr>`;

  // 🚫 Los anulados: quedan a la vista para poder revisarlos y revertir si se
  // anuló uno por error. No cuentan como venta en ninguna parte.
  const anulados = store.pedidosAnulados();
  const bloqueAnulados = anulados.length
    ? `<h2>🚫 Anulados · ${anulados.length}</h2>
       <p class="nota">No cuentan como venta ni aparecen para despachar, pero <b>quedan en el
         registro</b>. Si anulaste uno por error, reactivalo acá.</p>
       <div class="tabla"><table>
         <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th><th>Motivo</th><th></th></tr>
         ${anulados
           .slice(0, 40)
           .map((p) => filaPedido(p, { anulado: true }))
           .join("")}
       </table></div>`
    : "";



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
      // Contra la referencia del agente viejo: 🟢 igual o mejor, 🟡 hasta 20%
      // abajo, 🔴 peor que eso. Sin esto, un "−46%" no dice si está bien o mal.
      let marca = "";
      if (i > 0 && e.indice != null) {
        const icono = e.indice >= 1 ? "🟢" : e.indice >= 0.8 ? "🟡" : "🔴";
        marca = `<span class="ref">${icono} pasa ${pct(e.pasan)} · el agente viejo ${pct(
          e.referencia
        )}</span>`;
      }
      return `<div class="paso${esFuga ? " fuga" : ""}">
          <div class="barra" style="width:${ancho}%"></div>
          <div class="etiq">
            <b>${e.n}</b> ${esc(e.nombre)}
            <span class="sub">${esc(e.que)}</span>
            ${marca}
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
             emb.fuga
               ? `<div class="porque"><b>El escalón más flojo es "${esc(emb.fuga.nombre)}"</b> —
                   pasa ${pct(emb.fuga.pasan)} donde el agente viejo pasaba ${pct(
                   emb.fuga.referencia
                 )}, y se perdieron ${emb.fuga.perdidos} ahí.<br>${esc(emb.diagnostico)}</div>`
               : `<div class="porque">${esc(emb.diagnostico)}</div>`
           }
           <p class="nota">Cierre total: <b>${pct(emb.cierre)}</b> · Cada escalón se compara con lo
             que lograba el <b>agente viejo de Meta</b> sobre 6.317 conversaciones, medido con este
             mismo código. <b>No se señala el escalón que pierde más gente</b> —ese siempre es el
             primero, porque es el más ancho— sino el que está peor <b>contra su referencia</b>.
             ${
               emb.comparable
                 ? ""
                 : "⚠️ Todavía hay pocas conversaciones para comparar: esta lectura es prematura."
             }
             Las etapas se deducen de lo que se habló en cada chat, no de una marca del bot: sirve
             para ver la tendencia y dónde mirar, no como contabilidad exacta.</p>
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
            // ✅ Ya se le contestó después de su último mensaje. Se distingue de
            // "esperando humano", que antes salía igual en los dos casos y era
            // la razón de que la lista pareciera un desorden de cosas sin hacer.
            atendidoDe.get(x.tel)
              ? `<span class="tag ok">✅ respondido</span>`
              : x.c.paused
                ? `<span class="tag warn">esperando humano</span>`
                : "",
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
  .tag.oficina{background:#132c40;color:#7fd1ff}

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
  /* Agrupado por día. */
  .atencion .grupo{margin-bottom:10px}
  .atencion .grupo h4{margin:8px 0 5px;font-size:12px;color:#9aa4b8;text-transform:uppercase;
    letter-spacing:.5px;font-weight:600}
  .atencion .desglose{font-weight:400;color:#9aa4b8;font-size:12px}
  .fila .filaLink{display:flex;gap:8px;align-items:center;flex:1;min-width:0;
    text-decoration:none;color:#e7e9ee}
  .fila .filaLink b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:45%}
  /* 🔘 EL PUNTO. El área de toque es de 34px aunque el círculo mida 15: el dueño
     opera del celular y un blanco de 15px se falla. El círculo chico es solo lo
     que se VE; lo que se toca es el botón entero. */
  .fila .punto{-webkit-appearance:none;appearance:none;background:transparent;border:0;
    padding:0;margin:0;width:34px;height:34px;min-width:34px;display:flex;
    align-items:center;justify-content:center;cursor:pointer;flex:none}
  .fila .punto span{display:block;width:15px;height:15px;border-radius:50%;
    border:2px solid #7d8698;background:transparent;transition:background .12s,border-color .12s}
  .fila.alta .punto span{border-color:#ff6b6b}
  .fila.media .punto span{border-color:#ffb020}
  .fila .punto:active span{transform:scale(.88)}
  /* Respondido: el punto se llena de verde y el renglón se apaga. Se queda en su
     lugar — se lee como una lista de tareas tachadas. */
  .fila.hecho{border-left-color:#2ea043;background:#151a18;opacity:.55}
  .fila.hecho .punto span{background:#2ea043;border-color:#2ea043}
  .fila.hecho .filaLink b{text-decoration:line-through;text-decoration-color:#6b7280}
  /* 💰 Atajo para registrar la venta sin entrar a buscar el formulario. El bot no
     puede tomar el pedido en un chat que atiende un humano, así que este camino
     es el único que existe para esas ventas. */
  .fila .vendio{display:flex;align-items:center;justify-content:center;
    width:34px;height:34px;min-width:34px;flex:none;text-decoration:none;
    border:1px solid #2c3340;border-radius:8px;background:#1f2630;font-size:14px}
  .fila .vendio:hover{background:#16341f;border-color:#2ea043}
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
  .paso .etiq .ref{display:block;font-size:11px;color:#9fb3c8;margin-top:3px}
  .chatlink{font-size:11px;font-weight:600;color:#7fd1ff;text-decoration:none;border:1px solid #2a4a5e;
    border-radius:6px;padding:1px 6px;margin-left:6px;white-space:nowrap}
  .acc{display:inline}
  .mini{background:#2a1a1c;border:1px solid #5e2a2a;color:#ff9aa4;border-radius:7px;
    padding:4px 8px;font-size:11px;font-weight:600}
  tr.anulado{opacity:.55}
  tr.anulado .mini{background:#1a2a1e;border-color:#2a5e3a;color:#7ee2a8}
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
  <h2>📋 Pendientes de despachar${pendientes.length ? ` · ${pendientes.length}` : ""}</h2>
  ${
    pendientes.length
      ? `<p class="nota">Del más viejo al más nuevo: lo de arriba es lo que lleva más tiempo esperando.
         Suman <b>${esc(fmtCOP(totalPendiente))}</b> por recaudar.${
           sinCelularCuantos
             ? ` <b style="color:#ff9aa4">${sinCelularCuantos} sin celular: a esos no les podés hacer la guía todavía.</b>`
             : ""
         }</p>`
      : ""
  }
  <div class="tabla"><table>
    <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th><th>Anuncio</th><th></th></tr>
    ${filasPendientes}
  </table></div>

  ${bloqueAnulados}

  <h2>✅ Ya despachados${despachados.length ? ` · ${despachados.length}` : ""}</h2>
  <p class="nota">Estos ya tienen su guía enviada al cliente. Quedan acá para consultar: <b>no se borran nunca</b>.</p>
  <div class="tabla"><table>
    <tr><th>Fecha</th><th>Cliente</th><th>Dirección</th><th>Talla / color</th><th>Total</th><th>Guía</th><th></th></tr>
    ${filasDespachados}
  </table></div>
  ${bloqueAnuncios}
  <h2>Conversaciones</h2>
  ${bloquesConv}
</main>
<script>
// La clave del panel, para los envíos que van por fetch. No agrega exposición:
// ya viaja en los campos ocultos de cada formulario de esta misma página.
var PANEL_TOKEN_JS = ${JSON.stringify(panelToken())};

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
    // 🔘 Hay un punto guardándose. Si se recargara justo ahora, el panel podría
    // pintarse con el estado viejo y el punto "se desprendería" solo a la vista.
    if (window.__puntosEnVuelo > 0) return true;
    return false;
  }

  setInterval(function () {
    if (!ocupado()) location.reload();
  }, 45000);
})();

// ============================================================================
// 🔘 MARCAR UN CHAT COMO RESPONDIDO, SIN RECARGAR NADA
//
// Antes esto era un formulario: POST → redirect → el navegador recargaba el
// panel entero. En un celular con datos es un segundo largo de pantalla en
// blanco, y el chat además saltaba a otro bloque.
//
// 🔑 AHORA SE PINTA PRIMERO Y SE GUARDA DESPUÉS (respuesta optimista). El punto
// cambia de color en el mismo toque, sin esperar la red. Si el guardado falla,
// se revierte y se avisa: es mejor eso que un dedo esperando a que el servidor
// conteste para saber si el toque sirvió.
// ============================================================================
window.__puntosEnVuelo = 0;
function marcarChat(btn) {
  var fila = btn.closest(".fila");
  if (!fila || fila.dataset.guardando === "1") return;
  var tel = fila.dataset.tel;
  var estaba = fila.dataset.listo === "1";

  // 1) Reacciona YA.
  fila.dataset.listo = estaba ? "0" : "1";
  fila.classList.toggle("hecho", !estaba);
  fila.dataset.guardando = "1";
  window.__puntosEnVuelo++;
  recontarFaltan();

  // 2) Y recién después se guarda.
  var cuerpo =
    "token=" + encodeURIComponent(PANEL_TOKEN_JS) + "&tel=" + encodeURIComponent(tel) + "&json=1";
  if (estaba) cuerpo += "&deshacer=1";

  fetch("/atendido?json=1", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: cuerpo,
  })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
    })
    .catch(function () {
      // Revertir: que la pantalla no diga algo que el servidor no guardó.
      fila.dataset.listo = estaba ? "1" : "0";
      fila.classList.toggle("hecho", estaba);
      recontarFaltan();
      alert("No se pudo guardar. Revisá la conexión y tocá de nuevo.");
    })
    .then(function () {
      fila.dataset.guardando = "0";
      window.__puntosEnVuelo--;
    });
}

/** Mantiene los contadores al día sin ir al servidor. */
function recontarFaltan() {
  var total = 0;
  document.querySelectorAll(".atencion .grupo").forEach(function (g) {
    var faltan = g.querySelectorAll('.fila[data-listo="0"]').length;
    total += faltan;
    var h4 = g.querySelector("h4");
    // ⚠️ Las barras invertidas van DOBLES, y no es un descuido. Este bloque vive
    // dentro de un template literal de JavaScript, y ahí una barra invertida
    // sola se descarta al generar la página: los atajos de la expresión regular
    // llegarían al navegador convertidos en letras sueltas y no coincidirían con
    // nada. Parsea igual, así que no hay error: el contador simplemente no se
    // actualiza nunca. Lo vigila test-atendido-y-orden.js.
    if (h4) h4.textContent = h4.textContent.replace(/·\\s*\\d+\\s*$/, "· " + faltan);
  });
  var etiqueta = document.getElementById("faltan");
  if (etiqueta) etiqueta.textContent = total;
}
</script>
</body></html>`;
}

module.exports = { render };
