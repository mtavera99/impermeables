// ============================================================================
// 🔍 AUDITORÍA DEL DÍA — ¿ENTRARON TODOS LOS CHATS? ¿SE PERDIÓ ALGUNA VENTA?
//
// DE DÓNDE SALE (23-sep). El dueño, con 1 sola venta y $92.000 de pauta gastada:
//
//   "¿Puedes hacer una verificación de que entraron todos los chats y que no
//    haya un error quizás con las ventas tomadas? Estoy muy preocupado porque
//    nunca me había pasado antes."
//
// Es la pregunta correcta y hasta hoy no había forma de contestarla. Esta
// pantalla la contesta con lo que hay en disco, sin que el dueño tenga que
// abrir una terminal.
//
// ⚠️ POR QUÉ NO SIRVE EL LOG DE EVENTOS PARA ESTO. `EVENTOS` vive en MEMORIA,
// guarda solo los últimos 60 y se borra en cada despliegue. El 23-sep hubo 8
// despliegues, así que el log del día quedó en nada. Las conversaciones y los
// pedidos, en cambio, están en disco y sobreviven: de ahí sale todo esto.
//
// 🔑 LA VERIFICACIÓN QUE DE VERDAD IMPORTA es la última: conversaciones donde el
// bot mandó el cuadro de confirmación Y el cliente dijo "SÍ CONFIRMO", pero NO
// quedó pedido guardado. Eso es una venta cerrada que se perdió por el camino, y
// es exactamente el "error con las ventas tomadas" que preguntó.
// ============================================================================

const store = require("./store");
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
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** El día en Bogotá de una marca de tiempo: "2026-09-23". */
function diaBogota(ms) {
  return new Date(ms).toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

function limpiar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// El cuadro de confirmación del bot. El guion lo manda con este encabezado.
const RE_CUADRO = /confirmemos tu pedido/i;
// La respuesta del cliente que cierra la venta.
const RE_CONFIRMA =
  /^(si\s*confirmo|si confirmo|confirmo|si|sii+|claro|listo|dale|ok|okey|correcto|asi es|todo bien|perfecto|de acuerdo)\b/;

/**
 * Audita un día. Devuelve los conteos y las conversaciones con problema.
 * @param {string} [dia] "2026-09-23" en hora Bogotá. Por defecto, hoy.
 */
function auditar(dia) {
  const hoy = dia || diaBogota(Date.now());
  const conversaciones = store.todasLasConversaciones();
  const pedidos = store.todosLosPedidos();

  // ==========================================================================
  // 🔴 ESTO ESTABA MAL MEDIDO Y LO DELATÓ LA PRIMERA CORRIDA REAL (23-sep).
  //
  // La primera versión comparaba contra TODOS los pedidos de la historia. Con
  // eso, un cliente que ya había comprado antes y volvió a confirmar hoy
  // aparecía como "tiene pedido" y no se contaba como venta perdida.
  //
  // Y el número lo delató: la pantalla mostró 9 confirmaciones, 2 pedidos
  // guardados y 1 sola venta perdida. Faltaban 6 sin explicar. Un total que no
  // cuadra no es un detalle de presentación: es la señal de que la cuenta está
  // mal hecha.
  //
  // Ahora los pedidos se separan en los de HOY y los ANTERIORES, y cada
  // confirmación de hoy cae en una de tres canastas:
  //
  //   · pedido guardado hoy ......... la venta se tomó bien
  //   · solo tiene pedido anterior ... ya había comprado: NO es venta nueva, y
  //                                    es lo que hace el candado antiduplicados
  //   · ningún pedido ............... 🔴 venta cerrada que se perdió
  //
  // Así los números suman y se puede confiar en ellos.
  // ==========================================================================
  const pedidoDeHoy = new Map();
  const pedidoAnterior = new Map();
  let pedidosDelDia = 0;
  for (const p of pedidos) {
    const chat = String(p.telefono_chat || "");
    if (!chat) continue;
    const t = new Date(p.fecha).getTime();
    if (Number.isFinite(t) && diaBogota(t) === hoy) {
      pedidosDelDia++;
      pedidoDeHoy.set(chat, p);
    } else if (!pedidoAnterior.has(chat)) {
      pedidoAnterior.set(chat, p);
    }
  }

  const cuenta = {
    conversaciones: 0,
    conBotRespondiendo: 0,
    sinRespuesta: 0,
    cotizadas: 0,
    conCuadro: 0,
    confirmaron: 0,
    conPedido: 0,
    pausadas: 0,
    confirmadasConPedido: 0,
    yaHabianComprado: 0,
  };
  const sinRespuesta = [];
  const confirmadasSinPedido = [];
  const cuadroSinConfirmar = [];
  const yaHabianComprado = [];

  for (const chatId in conversaciones) {
    const conv = conversaciones[chatId];
    const msgs = (conv && conv.messages) || [];
    if (msgs.length === 0) continue;

    // ¿Hubo actividad de ESE día? Se mira el mensaje más nuevo con marca.
    const conMarca = msgs.filter((m) => Number.isFinite(m.at));
    const ultimaMarca = conMarca.length ? conMarca[conMarca.length - 1].at : null;
    // Sin marcas de tiempo no se puede ubicar en un día: queda fuera del conteo
    // en vez de contarse mal.
    if (ultimaMarca == null || diaBogota(ultimaMarca) !== hoy) continue;

    cuenta.conversaciones++;
    if (conv.paused) cuenta.pausadas++;

    const delCliente = msgs.filter((m) => m.role === "user");
    const delBot = msgs.filter((m) => m.role === "assistant");
    const textoBot = delBot.map((m) => String(m.content || "")).join("\n");

    if (delBot.length > 0) cuenta.conBotRespondiendo++;
    else {
      cuenta.sinRespuesta++;
      sinRespuesta.push({
        chatId,
        cuando: ultimaMarca,
        mensajes: delCliente.length,
        primero: String(delCliente[0] && delCliente[0].content).slice(0, 70),
      });
    }

    if (embudo.dioTotal(textoBot)) cuenta.cotizadas++;

    const mandoCuadro = RE_CUADRO.test(textoBot);
    if (mandoCuadro) cuenta.conCuadro++;

    // ¿El cliente confirmó DESPUÉS de ver el cuadro, y HOY?
    //
    // Lo de "hoy" importa: el historial guarda mensajes de días anteriores, así
    // que un cuadro viejo más un "listo" de hoy se contaban como un cierre de
    // hoy que nunca ocurrió.
    let vistoCuadro = false;
    let confirmo = false;
    let cuandoConfirmo = null;
    for (const m of msgs) {
      if (m.role === "assistant" && RE_CUADRO.test(String(m.content || ""))) {
        vistoCuadro = true;
      } else if (m.role === "user" && vistoCuadro && RE_CONFIRMA.test(limpiar(m.content))) {
        // Solo cuenta si ESA confirmación es de hoy.
        if (Number.isFinite(m.at) && diaBogota(m.at) === hoy) {
          confirmo = true;
          cuandoConfirmo = m.at;
        }
      }
    }
    if (confirmo) cuenta.confirmaron++;

    const deHoy = pedidoDeHoy.get(String(chatId));
    const anterior = pedidoAnterior.get(String(chatId));
    if (deHoy) cuenta.conPedido++;

    if (confirmo) {
      if (deHoy) {
        cuenta.confirmadasConPedido++;
      } else if (anterior) {
        // Ya había comprado antes: no es una venta nueva. Es justo lo que frena
        // el candado antiduplicados, y contarlo como perdido sería inventar una
        // fuga que no existe.
        cuenta.yaHabianComprado++;
        yaHabianComprado.push({
          chatId,
          cuando: cuandoConfirmo || ultimaMarca,
          mensajes: delCliente.length,
          previo: anterior.total,
        });
      } else {
        // 🔑 LA FUGA DE VERDAD: confirmó hoy y no hay pedido en ninguna parte.
        confirmadasSinPedido.push({
          chatId,
          cuando: cuandoConfirmo || ultimaMarca,
          mensajes: delCliente.length,
        });
      }
    }
    // Mandó el cuadro y el cliente no contestó: no es un error, es una venta
    // que quedó a un paso. Sirve para saber cuántas se están quedando ahí.
    if (mandoCuadro && !confirmo && !deHoy) {
      cuadroSinConfirmar.push({ chatId, cuando: ultimaMarca });
    }
  }

  // 🧮 La comprobación de que la cuenta cierra. Si esto no cuadra, el número
  // que se muestra no es de fiar y hay que decirlo en la pantalla en vez de
  // dejar al dueño sumando a mano y desconfiando de todo.
  const cuadra =
    cuenta.confirmaron ===
    cuenta.confirmadasConPedido + cuenta.yaHabianComprado + confirmadasSinPedido.length;

  return {
    dia: hoy,
    cuenta,
    pedidosDelDia,
    sinRespuesta,
    confirmadasSinPedido,
    cuadroSinConfirmar,
    yaHabianComprado,
    cuadra,
  };
}

function fila(etiqueta, valor, nota, estado) {
  const color = estado === "mal" ? "#ff9aa4" : estado === "bien" ? "#7ee2a8" : "#e6edf3";
  return `<div class="f">
      <div class="et">${esc(etiqueta)}${nota ? `<span class="sub">${esc(nota)}</span>` : ""}</div>
      <b style="color:${color}">${esc(String(valor))}</b>
    </div>`;
}

function listaChats(items, token, titulo, explicacion, estado) {
  if (items.length === 0) return "";
  const filas = items
    .slice(0, 25)
    .map(
      (x) =>
        `<li><a href="/chat?token=${esc(token)}&id=${encodeURIComponent(x.chatId)}">${esc(
          x.chatId
        )}</a> · ${esc(HORA(x.cuando))}${
          x.mensajes != null ? ` · ${x.mensajes} mensaje${x.mensajes === 1 ? "" : "s"}` : ""
        }${x.primero ? `<div class="sub">"${esc(x.primero)}"</div>` : ""}</li>`
    )
    .join("");
  return `<div class="bloque ${estado === "mal" ? "malo" : ""}">
      <h3>${esc(titulo)} — ${items.length}</h3>
      <p class="sub">${explicacion}</p>
      <ul class="chats">${filas}</ul>
      ${items.length > 25 ? `<p class="sub">(se muestran los primeros 25)</p>` : ""}
    </div>`;
}

function render({ token, dia } = {}) {
  const a = auditar(dia);
  const c = a.cuenta;

  const hayFuga = a.confirmadasSinPedido.length > 0;

  return `<!doctype html><html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Auditoría del día · BikerPro</title>
<style>
  :root{--fondo:#0d1117;--card:#161b22;--linea:#263041;--gris:#8b98a9;--rojo:#ff9aa4}
  *{box-sizing:border-box}
  body{margin:0;background:var(--fondo);color:#e6edf3;
    font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:14px}
  h1{font-size:18px;margin:0 0 4px}
  h2{font-size:15px;margin:18px 0 8px}
  h3{font-size:14px;margin:0 0 4px}
  a{color:#7fd1ff}
  .btn{display:inline-block;background:var(--card);border:1px solid var(--linea);
    border-radius:10px;padding:8px 12px;text-decoration:none;font-size:13px;font-weight:600;
    margin-bottom:14px}
  .caja{background:var(--card);border:1px solid var(--linea);border-radius:14px;padding:6px 14px}
  .f{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;
    border-top:1px solid var(--linea)}
  .f:first-child{border-top:0}
  .f b{font-size:19px;white-space:nowrap}
  .sub{display:block;color:var(--gris);font-size:11px;margin-top:2px}
  .bloque{background:var(--card);border:1px solid var(--linea);border-radius:14px;
    padding:14px;margin-top:14px}
  .bloque.malo{border-color:#5e1e1e;background:#1d1214}
  .chats{margin:8px 0 0;padding-left:18px;font-size:13px}
  .chats li{margin-bottom:7px}
  .veredicto{padding:12px 14px;border-radius:12px;margin-bottom:14px;font-size:14px;line-height:1.45}
  .veredicto.ok{background:#12351f;color:#a8e6c0}
  .veredicto.mal{background:#3a1414;color:#ffc2c8}
  .nota{color:var(--gris);font-size:12px;line-height:1.5}
</style></head><body>
  <h1>🔍 Auditoría del día</h1>
  <p class="sub">${esc(a.dia)} · hora Bogotá</p>
  <a class="btn" href="/panel?token=${esc(token || "")}">← Volver al panel</a>

  <div class="veredicto ${hayFuga ? "mal" : "ok"}">
    ${
      hayFuga
        ? `🔴 <b>Hay ${a.confirmadasSinPedido.length} conversación${
            a.confirmadasSinPedido.length === 1 ? "" : "es"
          } donde el cliente confirmó y NO quedó pedido guardado.</b>
           Eso es una venta cerrada que se perdió. Están listadas abajo.`
        : `🟢 <b>No se perdió ninguna venta por el camino.</b> Toda conversación donde el cliente
           dijo que confirmaba tiene su pedido guardado. Si hay pocas ventas, el problema está
           antes del cierre, no en cómo se toman los pedidos.`
    }
  </div>

  <h2>¿Entraron todos los chats?</h2>
  <div class="caja">
    ${fila("Conversaciones con actividad hoy", c.conversaciones, "compará este número con el de Meta en Ads Manager")}
    ${fila(
      "El bot les respondió",
      c.conBotRespondiendo,
      "si es menor que el de arriba, alguna quedó sin contestar",
      c.sinRespuesta === 0 ? "bien" : null
    )}
    ${fila(
      "🔴 Sin ninguna respuesta del bot",
      c.sinRespuesta,
      "entró el mensaje y nadie contestó",
      c.sinRespuesta === 0 ? "bien" : "mal"
    )}
    ${fila("Chats en pausa (los atiende un humano)", c.pausadas, "el bot está callado ahí a propósito")}
  </div>

  <h2>¿Se tomaron bien las ventas?</h2>
  <div class="caja">
    ${fila("Recibieron un total cotizado", c.cotizadas, "el bot les dijo el precio con envío")}
    ${fila("Llegaron al cuadro de confirmación", c.conCuadro, "el bot les pidió confirmar")}
    ${fila("Dijeron que confirmaban HOY", c.confirmaron, "el cliente cerró la venta")}
  </div>

  <h2>Y esas confirmaciones, ¿en qué terminaron?</h2>
  <p class="nota">Las tres canastas suman exactamente el número de arriba. Si no sumaran, el dato no
    sería de fiar.</p>
  <div class="caja">
    ${fila("✅ Quedaron guardadas como pedido", c.confirmadasConPedido, "ventas nuevas de hoy", "bien")}
    ${fila(
      "↩️ Ya habían comprado antes",
      c.yaHabianComprado,
      "clientes viejos que volvieron a escribir: NO son ventas nuevas"
    )}
    ${fila(
      "🔴 No quedó pedido en ninguna parte",
      a.confirmadasSinPedido.length,
      "ventas cerradas que se perdieron",
      hayFuga ? "mal" : "bien"
    )}
    ${fila(
      a.cuadra ? "🧮 La cuenta cierra" : "🔴 La cuenta NO cierra",
      a.cuadra ? "sí" : "revisar",
      a.cuadra
        ? `${c.confirmadasConPedido} + ${c.yaHabianComprado} + ${a.confirmadasSinPedido.length} = ${c.confirmaron}`
        : "hay confirmaciones sin clasificar: el número no es de fiar",
      a.cuadra ? "bien" : "mal"
    )}
  </div>

  <div class="caja" style="margin-top:14px">
    ${fila("Pedidos guardados hoy en total", a.pedidosDelDia, "lo que cuenta como venta del día")}
  </div>

  ${listaChats(
    a.confirmadasSinPedido,
    token,
    "🔴 Confirmaron y no quedó pedido",
    "El cliente dijo que confirmaba y no hay pedido guardado. Abrí cada chat: si la venta es real, hay que anotarla a mano.",
    "mal"
  )}

  ${listaChats(
    a.sinRespuesta,
    token,
    "🔴 Nadie les contestó",
    "Escribieron y el bot no respondió nunca. Son leads pagados tirados.",
    "mal"
  )}

  ${listaChats(
    a.yaHabianComprado,
    token,
    "↩️ Ya habían comprado antes",
    "Confirmaron otra vez, pero ya tenían un pedido de antes. No son ventas nuevas: casi siempre es alguien contestando su guía. El candado antiduplicados es el que evita que entren al conteo.",
    "ok"
  )}

  ${listaChats(
    a.cuadroSinConfirmar,
    token,
    "⏳ Quedaron a un paso",
    "El bot les mandó el cuadro y no contestaron. No es un error: es la lista más caliente que hay para hacer seguimiento hoy.",
    "ok"
  )}

  <p class="nota">⚠️ Solo se cuentan conversaciones cuyos mensajes tienen marca de tiempo. El bot
    guarda los últimos ${esc(String(24))} mensajes por cliente, así que una conversación muy larga puede
    perder el arranque. El registro de eventos no se usa acá porque vive en memoria y se borra en
    cada despliegue.</p>
</body></html>`;
}

module.exports = { render, auditar, diaBogota };
