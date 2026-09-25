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

// ============================================================================
// ✍️ ESCRIBIRLE AL CLIENTE DESDE ACÁ
//
// DE DÓNDE SALE (23-sep): el dueño fue a despachar un pedido y el envío a esa
// ciudad solo estaba disponible por Coordinadora, a $51.000. Sus palabras:
//
//   "quiero que así mismo como me dejas ahora ver los chats también me dejes
//    mandar un mensaje, porque en este caso necesitamos preguntarle al usuario
//    si va a pagar los 51.000 —que lo más probable es que no— o si cancelamos
//    su pedido"
//
// Un pedido que no se puede despachar al precio cotizado no se puede dejar
// quieto: o el cliente acepta el sobrecosto, o se cancela. Las dos salidas
// requieren preguntarle, y no había forma de hacerlo desde acá.
//
// 🔴 LA VENTANA DE 24 HORAS MANDA. WhatsApp solo permite texto libre dentro de
// las 24h del ÚLTIMO mensaje del cliente. Pasado eso, Meta rechaza el envío con
// el error 131047 y solo se puede mandar una plantilla aprobada. Por eso la
// pantalla calcula la ventana y AVISA ANTES de que el dueño escriba: descubrirlo
// después de redactar un mensaje largo es perder el trabajo dos veces.
// ============================================================================

const VENTANA_MS = 24 * 60 * 60 * 1000;

/** Estado de la ventana de 24h para poder escribir texto libre. */
function ventanaDe(conv) {
  const ultimo = conv && conv.ultimoDelCliente;
  if (!ultimo) return { abierta: false, motivo: "no hay registro del último mensaje del cliente" };
  const pasado = Date.now() - ultimo;
  if (pasado >= VENTANA_MS) {
    const dias = Math.floor(pasado / (24 * 60 * 60 * 1000));
    return {
      abierta: false,
      motivo:
        `el cliente escribió hace ${dias >= 1 ? `${dias} día${dias > 1 ? "s" : ""}` : "más de 24 h"}` +
        ", así que Meta NO permite texto libre",
    };
  }
  const horas = Math.floor((VENTANA_MS - pasado) / (60 * 60 * 1000));
  const minutos = Math.floor(((VENTANA_MS - pasado) % (60 * 60 * 1000)) / 60000);
  return {
    abierta: true,
    restante: horas >= 1 ? `${horas} h` : `${minutos} min`,
  };
}

// Mensajes que se repiten y hay que escribir bien, no improvisar con el cliente
// esperando. Rellenan el cuadro y se pueden editar antes de enviar.
const RAPIDOS = [
  {
    etiqueta: "💸 El envío subió",
    // El caso de hoy: el envío real no alcanza para el total cotizado.
    texto:
      "¡Hola! 🏍️ Te escribo por tu pedido. Cuando fuimos a despacharlo nos encontramos con que " +
      "a tu ciudad la única transportadora disponible cobra $51.000 de envío, bastante más de lo " +
      "que te cotizamos.\n\nNo queremos cobrarte algo que no acordamos, así que te pregunto " +
      "directo: ¿querés que lo despachemos pagando ese envío, o preferís que te cancelemos el " +
      "pedido sin ningún costo? Lo que decidas está bien 🙌",
  },
  {
    // ⛔ Esto ANTES preguntaba la dirección de la oficina. El dueño lo frenó:
    // "no tienes que ponerle trabas al cliente... no le preguntes la dirección
    // porque el cliente no la sabe. Las direcciones no las necesitamos cuando
    // sea en una oficina de la transportadora."
    // Ahora es UNA pregunta cerrada de dos opciones, sin nada que averiguar.
    etiqueta: "🏠🏢 ¿Casa u oficina?",
    texto:
      "¡Hola! 🏍️ Para generar tu guía me falta un solo dato: ¿te lo enviamos a tu casa, o " +
      "preferís recogerlo en la oficina de Interrapidísimo de tu ciudad? 📦",
  },
  {
    etiqueta: "📍 Falta la dirección",
    texto:
      "¡Hola! 🏍️ Ya tengo tu pedido listo, solo me falta la dirección para despacharlo: calle, " +
      "número y barrio. O si preferís, lo dejamos en la oficina de Interrapidísimo de tu ciudad y " +
      "lo recogés ahí — lo que te quede más fácil 📦",
  },
  {
    etiqueta: "❌ Cancelar",
    texto:
      "Listo, cancelamos tu pedido sin ningún costo 🙌 Si más adelante lo querés, escribinos y " +
      "te lo armamos de nuevo. ¡Gracias por avisarnos!",
  },
];

/** El cuadro para escribirle, con el estado de la ventana de 24h. */
function cajonDeEnvio(p, conv, token) {
  if (!p.telefono_chat) return "";
  const v = ventanaDe(conv);

  const botones = RAPIDOS.map(
    (r, i) =>
      `<button type="button" class="rapido" data-i="${i}">${esc(r.etiqueta)}</button>`
  ).join("");

  const aviso = v.abierta
    ? `<div class="ventana ok">🟢 Podés escribirle libre. La ventana de 24 h cierra en <b>${esc(
        v.restante
      )}</b>.</div>`
    : `<div class="ventana mal">🔴 <b>No se puede mandar texto libre:</b> ${esc(v.motivo)}.
         <br>Si lo intentás, Meta lo rechaza. Para reabrir la conversación hay que mandarle una
         <b>plantilla aprobada</b> (la de seguimiento trae botones, y cuando el cliente toca uno
         se reabren las 24 h y ahí sí le podés escribir).</div>`;

  return `<div class="enviar">
      <h3>✍️ Escribirle a ${esc(p.nombre || "este cliente")}</h3>
      ${aviso}
      <div class="rapidos">${botones}</div>
      <form method="post" action="/responder">
        <input type="hidden" name="token" value="${esc(token || "")}">
        <input type="hidden" name="to" value="${esc(p.telefono_chat)}">
        <input type="hidden" name="volver" value="chat">
        <textarea name="texto" rows="6" placeholder="Escribile acá..."
          ${v.abierta ? "" : ""}></textarea>
        <button type="submit" class="enviarbtn">Enviar por WhatsApp</button>
      </form>
      <p class="nota">Al enviar, <b>el bot se calla en este chat</b> para que no contesten dos
        voces a la vez. Cuando termines, devolvéselo con el botón del panel.</p>
      <script>
        var RAPIDOS = ${JSON.stringify(RAPIDOS.map((r) => r.texto))};
        document.querySelectorAll(".rapido").forEach(function (b) {
          b.addEventListener("click", function () {
            var ta = b.closest(".enviar").querySelector("textarea");
            ta.value = RAPIDOS[Number(b.dataset.i)];
            ta.focus();
          });
        });
      </script>
    </div>`;
}

// ============================================================================
// 🟢 REGISTRAR LA VENTA A MANO
//
// DE DÓNDE SALE (25-sep). El dueño: "ya el señor dijo que sí, ¿cómo hago para
// que quede marcado como venta? No sé por qué no se marcó solo."
//
// 🔴 NO SE MARCÓ SOLO PORQUE EL CHAT ESTABA EN MODO HUMANO. El webhook hace
// `continue` antes de llamar a la IA cuando un chat está pausado, y el bloque
// del pedido lo emite la IA. Sin IA no hay bloque, y sin bloque no hay venta.
//
// O sea que TODO chat que se escala a humano pierde la captura automática — y
// son justo los más calientes, los que el dueño cierra a mano porque ahí cierra
// mejor. Esas ventas vivían en WhatsApp y no en la contabilidad.
//
// El total es OPCIONAL: si se deja vacío lo calcula el tarifario con la ciudad.
// A las 3 de la mañana nadie se acuerda de la banda de Sahagún.
// ============================================================================
function cajonDeVenta(p, token, yaTienePedido) {
  if (yaTienePedido) return "";
  const tel = String(p.telefono_chat || "");
  // Si escribe desde un teléfono, ese mismo sirve de celular de despacho. Si usa
  // nombre de usuario de WhatsApp (BSUID) no hay número y hay que pedírselo.
  const celular = /^\d+$/.test(tel) ? tel.replace(/^57/, "") : "";
  return `<div class="venta">
      <h3>🟢 Registrar la venta</h3>
      <p class="nota">El bot no la pudo tomar porque este chat está en modo humano:
        cuando vos contestás, el bot se calla, y el pedido lo arma él. Cargala acá y
        entra igual que las otras (guía, cierre, CPA).</p>
      <form method="post" action="/pedido-manual">
        <input type="hidden" name="token" value="${esc(token || "")}">
        <input type="hidden" name="telefono_chat" value="${esc(tel)}">
        <label>Nombre completo
          <input name="nombre" required value="${esc(p.nombre || "")}" autocomplete="off"></label>
        <label>Celular
          <input name="celular" inputmode="numeric" value="${esc(celular)}" autocomplete="off">
          <small>Sin celular la transportadora no hace la guía.</small></label>
        <label>Ciudad
          <input name="ciudad" required value="${esc(p.ciudad || "")}" autocomplete="off"></label>
        <label>Dirección
          <input name="direccion" value="${esc(p.direccion || "")}" autocomplete="off"></label>
        <div class="dos">
          <label>Talla
            <input name="talla" value="${esc(p.talla || "")}" autocomplete="off"></label>
          <label>Color
            <input name="color" value="${esc(p.color || "")}" autocomplete="off"></label>
        </div>
        <div class="dos">
          <label>Unidades
            <select name="unidades"><option value="1">1</option><option value="2">2</option></select></label>
          <label>Total
            <input name="total" inputmode="numeric" placeholder="se calcula solo">
            <small>Dejalo vacío y lo saca del tarifario.</small></label>
        </div>
        <label>Pago
          <select name="pago">
            <option value="contraentrega">Contraentrega</option>
            <option value="anticipado">Anticipado</option>
          </select></label>
        <button type="submit" class="ventabtn">Guardar la venta</button>
      </form>
    </div>`;
}

/**
 * @param {object} opciones
 * @param {string} [opciones.id]  telefono_chat exacto
 * @param {string} [opciones.q]   nombre o celular a buscar
 * @param {string} opciones.token para armar el enlace de vuelta al panel
 * @param {string} [opciones.resultado] "ok" o el motivo del fallo del último envío
 */
function render({ id, q, token, resultado, venta } = {}) {
  const encontrados = buscar({ id, q });
  const conversaciones = store.todasLasConversaciones();

  let cuerpo;
  if (!id && !q) {
    cuerpo = `<p class="nota">Buscá por nombre o celular del cliente.</p>`;
  } else if (encontrados.length === 0 && id && conversaciones[id]) {
    // ======================================================================
    // 🔴 EL CHAT DE UN CLIENTE QUE TODAVÍA NO COMPRÓ (25-sep)
    //
    // `buscar()` busca en los PEDIDOS, así que esta pantalla solo funcionaba
    // con gente que ya había comprado. Pero el enlace "ver chat" del panel
    // aparece en la lista de atención humana, que es justamente la de los que
    // NO han comprado: al tocarlo salía "No encontré ningún pedido con eso".
    //
    // O sea que el chat que más falta leer —el del cliente que está esperando
    // respuesta— era el único que no se podía abrir. Y es la pantalla con la
    // que se cazaron casi todos los bugs de la sesión del 23-24.
    // ======================================================================
    const conv = conversaciones[id];
    const msgs = (conv && conv.messages) || [];
    const perfil = (conv && conv.perfil) || {};
    const p = {
      telefono_chat: id,
      nombre: perfil.nombre || perfil.username || "",
      ciudad: "",
      direccion: "",
      talla: "",
      color: "",
    };
    const quien = p.nombre ? `${esc(p.nombre)} · ${esc(id)}` : esc(id);
    cuerpo =
      `<div class="prospecto">
         <h2>${quien}</h2>
         <p class="nota">Todavía no hay pedido de este cliente.${
           conv && conv.paused
             ? " <b>El chat está en modo humano:</b> el bot no le contesta, y por eso " +
               "no le puede tomar el pedido tampoco."
             : ""
         }</p>
       </div>` +
      `<div class="chat">${
        msgs.length ? msgs.map(burbuja).join("") : `<p class="nota">No hay mensajes guardados.</p>`
      }</div>` +
      cajonDeEnvio(p, conv, token) +
      cajonDeVenta(p, token, false);
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
        return `${fichaPedido(p)}<div class="chat">${chat}</div>${cajonDeEnvio(p, conv, token)}`;
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
  .res{padding:10px 12px;border-radius:10px;margin-bottom:14px;font-size:14px}
  .res.ok{background:#12351f;color:#7ee2a8}
  .res.mal{background:#3a1414;color:var(--rojo)}
  .enviar{background:var(--card);border:1px solid var(--linea);border-radius:14px;
    padding:14px;margin-top:16px}
  .enviar h3{font-size:15px;margin:0 0 10px}
  /* 🟢 El cajón de la venta a mano. Verde para que no se confunda con el de
     escribirle: uno manda un mensaje, el otro registra plata. */
  .venta{background:#111a14;border:1px solid #1f3328;border-radius:14px;
    padding:14px;margin-top:14px}
  .venta h3{font-size:15px;margin:0 0 8px;color:#8ff0b5}
  .venta label{display:block;margin:10px 0 0;font-size:13px;color:var(--gris)}
  .venta input,.venta select{width:100%;margin-top:4px;background:#0f141b;
    border:1px solid var(--linea);color:#e6edf3;border-radius:9px;padding:11px 10px;
    font-size:16px}
  .venta small{display:block;margin-top:3px;font-size:11px;color:var(--gris)}
  .venta .dos{display:flex;gap:10px}
  .venta .dos label{flex:1;min-width:0}
  .ventabtn{width:100%;margin-top:14px;background:#2ea043;border:0;color:#fff;
    border-radius:10px;padding:14px;font-size:16px;font-weight:600;cursor:pointer}
  .prospecto h2{font-size:17px;margin:0 0 4px}
  .ventana{font-size:13px;padding:9px 11px;border-radius:10px;margin-bottom:12px;line-height:1.4}
  .ventana.ok{background:#12351f;color:#7ee2a8}
  .ventana.mal{background:#3a1414;color:#ffc2c8}
  .rapidos{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
  .rapido{background:#1c2530;border:1px solid var(--linea);color:#cfe3f5;border-radius:99px;
    padding:6px 11px;font-size:12px;font-weight:600}
  .enviar form{display:block}
  textarea{width:100%;background:#0f141b;border:1px solid var(--linea);color:#e6edf3;
    border-radius:10px;padding:10px 12px;font-size:15px;font-family:inherit;resize:vertical}
  .enviarbtn{width:100%;margin-top:10px;background:#1f6feb;border:0;color:#fff;border-radius:10px;
    padding:12px;font-size:15px;font-weight:700}
</style></head><body>
  <h1>💬 Chat del cliente</h1>
  <p class="nota">Para verificar una dirección, una oficina de la transportadora, o qué se le prometió — y escribirle.</p>
  ${
    resultado
      ? resultado === "ok"
        ? '<div class="res ok">✅ Mensaje enviado. El bot quedó en pausa en este chat.</div>'
        : `<div class="res mal">🔴 No se envió: ${esc(resultado)}</div>`
      : ""
  }
  ${
    venta === "ok"
      ? '<div class="res ok">🟢 Venta registrada. Ya cuenta en el cierre y en el CPA, ' +
        'y se le cortó el seguimiento. Aparece en “Pendientes de despachar” del panel.</div>'
      : ""
  }
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
