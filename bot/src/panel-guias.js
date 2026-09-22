// ============================================================================
// PANTALLA "ENVIAR GUÍAS"  —  el dueño sube el PDF y el bot le manda a cada
// cliente la suya.
//
// EL FLUJO TIENE DOS PASOS A PROPÓSITO:
//   1. REVISAR  → se parte el PDF y se muestra el pareo. NO SE ENVÍA NADA.
//   2. ENVIAR   → solo lo que el dueño dejó marcado.
//
// Por qué no un solo botón: la etiqueta lleva dirección y teléfono impresos.
// Un envío al cliente equivocado es filtrarle datos personales a un
// desconocido, y no se puede deshacer. El paso de revisión cuesta 20 segundos
// y es la diferencia entre un error recuperable y uno que no.
//
// Y el botón dice "Revisar", no "Enviar", para que quede claro antes de tocarlo.
// ============================================================================

const store = require("./store");
const guias = require("./guias");

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fmtCOP = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

function render() {
  // 🔴 ESTE ARCHIVO SE QUEDÓ ATRÁS EN LA MIGRACIÓN A PANEL_TOKEN (22-sep).
  //
  // Decía `process.env.WHATSAPP_VERIFY_TOKEN`, el secreto VIEJO. El servidor ya
  // validaba PANEL_TOKEN, así que esta pantalla mandaba una clave que el
  // servidor rechazaba: TODA la función de enviar guías quedó muerta con un
  // 403, y el error que se veía era "Unexpected token 'F', Forbidden is not
  // valid JSON" — que no dice nada de una clave.
  //
  // Estuvo roto ~4 horas y lo encontró el dueño al intentar despachar. El
  // guardián de rutas no lo agarra porque las rutas SÍ estaban protegidas: lo
  // que estaba mal era el token que el navegador enviaba. Por eso ahora hay una
  // prueba que compara las dos cosas (test-token-del-panel.js).
  const tk = process.env.PANEL_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || "";
  const enviadas = store.todasLasGuiasEnviadas();
  const historial = Object.entries(enviadas)
    .sort((a, b) => (b[1].fecha || 0) - (a[1].fecha || 0))
    .slice(0, 30);

  const filasHistorial = historial.length
    ? historial
        .map(
          ([g, d]) => `<tr>
            <td data-label="Guía"><code>${esc(g)}</code></td>
            <td data-label="Cliente">${esc(d.nombre || "")}</td>
            <td data-label="WhatsApp">+${esc(d.telefono || "")}</td>
            <td data-label="Cuándo">${esc(new Date(d.fecha).toLocaleString("es-CO", { timeZone: "America/Bogota" }))}</td>
          </tr>`
        )
        .join("")
    : `<tr><td colspan="4" class="vacio">Todavía no se ha enviado ninguna guía.</td></tr>`;

  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Enviar guías · BikerPro</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#0f1319;color:#e7e9ee;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  header{padding:18px 20px;background:#151a22;border-bottom:1px solid #222a35}
  h1{margin:0;font-size:19px}
  .sub2{color:#8b93a4;font-size:13px;margin-top:4px}
  main{padding:20px;max-width:1100px;margin:0 auto}
  h2{font-size:16px;margin:26px 0 10px;padding-bottom:6px;border-bottom:1px solid #222a35}
  .caja{background:#151a22;border:1px solid #222a35;border-radius:10px;padding:16px;margin:0 0 16px}
  .como{color:#aab2c0;font-size:13px;margin:0 0 14px}
  .como b{color:#e7e9ee}
  .como ol{margin:8px 0 0;padding-left:20px}
  .como li{margin:4px 0}
  input[type=file]{background:#0f1319;border:1px dashed #39424f;border-radius:8px;padding:14px;width:100%;color:#aab2c0;cursor:pointer}
  .btn{background:#1b212b;border:1px solid #2d3542;color:#e7e9ee;padding:10px 16px;border-radius:8px;font-size:14px;cursor:pointer;text-decoration:none;display:inline-block}
  .btn:hover:not(:disabled){background:#232b36}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .btn.azul{background:#1d4ed8;border-color:#2563eb;font-weight:700}
  .btn.azul:hover:not(:disabled){background:#2563eb}
  .btn.verde{background:#12693f;border-color:#18854f;font-weight:700}
  .btn.verde:hover:not(:disabled){background:#18854f}
  .acciones{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}
  table{width:100%;border-collapse:collapse;font-size:13px;background:#151a22;border-radius:10px;overflow:hidden}
  th,td{padding:9px 10px;text-align:left;border-bottom:1px solid #222a35;vertical-align:top}
  th{background:#1b212b;color:#aab2c0;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.3px}
  tr:last-child td{border-bottom:0}
  tr.no td{opacity:.62;background:#17131a}
  code{background:#0f1319;padding:1px 5px;border-radius:4px;font-size:12px}
  .sub{color:#8b93a4;font-size:11.5px;display:block;margin-top:2px}
  .cert{font-weight:700}
  .cert.alta{color:#3ddc84}.cert.media{color:#ffc857}.cert.baja{color:#ff6b6b}
  .motivo{color:#ff9f9f;font-size:12px}
  .vacio{color:#8b93a4;text-align:center;padding:18px}
  .res{padding:12px 14px;border-radius:8px;margin:0 0 14px;font-size:14px;display:none}
  .res.ok{background:#12291c;border:1px solid #1f6b3f;color:#9be8b8}
  .res.mal{background:#2b1518;border:1px solid #7a2b33;color:#ffb3ba}
  .res.info{background:#14202e;border:1px solid #2b5480;color:#a9cdf5}
  .aviso{background:#241c10;border:1px solid #6b5220;color:#f5d9a0;padding:12px 14px;border-radius:8px;font-size:13px;margin:0 0 16px}
  .cargando{color:#8b93a4;font-size:13px}
  .reglas{color:#8b93a4;font-size:12px;margin:10px 0 0}

  /* ==========================================================================
     MÓVIL (agregado 22-sep). Esta pantalla tampoco tenía media queries, y acá
     el problema era peor que en el panel: la tabla de pareo tiene SIETE
     columnas y en 390px no se podía leer nada. Es la pantalla con la que se
     despacha, así que tiene que funcionar en el teléfono.
     ========================================================================== */
  html{-webkit-text-size-adjust:100%}
  body{padding-bottom:calc(20px + env(safe-area-inset-bottom))}
  .btn{touch-action:manipulation;min-height:44px;align-items:center}
  /* 16px o más: menos que eso hace que iOS agrande la página al tocar el campo */
  input[type=file]{font-size:16px}

  @media (max-width:640px){
    header{padding:14px 16px}
    h1{font-size:17px}
    main{padding:14px}
    h2{font-size:15px;margin:22px 0 8px}
    .caja{padding:13px;border-radius:14px}

    /* Cada fila pasa a ser una tarjeta */
    table{background:transparent;border-radius:0}
    table,tbody,tr,td{display:block;width:100%}
    thead{display:none}
    tbody tr{
      background:#151a22;border:1px solid #222a35;border-radius:14px;
      padding:10px 12px;margin-bottom:10px;
    }
    tbody td{
      border:0;padding:6px 0;display:flex;flex-wrap:wrap;gap:2px 12px;
      justify-content:flex-end;align-items:baseline;text-align:right;font-size:14px;
    }
    tbody td::before{
      content:attr(data-label);color:#8b93a4;font-size:11px;text-transform:uppercase;
      letter-spacing:.04em;margin-right:auto;text-align:left;flex:0 0 auto;max-width:42%;
    }
    tbody td .sub{flex:0 0 100%;text-align:right}
    tbody td.vacio{display:block;text-align:center}
    tbody td.vacio::before{content:none}
    /* La casilla de "enviar" grande y arriba: es la que se toca */
    tbody td[data-label="Enviar"] input[type=checkbox]{width:22px;height:22px}

    .acciones{flex-direction:column;align-items:stretch}
    .btn{width:100%;justify-content:center;text-align:center;min-height:48px;font-size:15px}
  }
</style></head>
<body>
<header>
  <h1>📦 Enviar guías</h1>
  <div class="sub2"><a class="sub2" href="/panel?token=${esc(tk)}" style="color:#6ea8fe">← volver al panel</a></div>
</header>
<main>

  <div class="caja">
    <p class="como">
      <b>Cómo funciona:</b>
      <ol>
        <li>Generás las guías en 99 Envíos como siempre y descargás el PDF con todas.</li>
        <li>Lo subís acá y le das <b>Revisar</b>. Se parte en una hoja por guía y se muestra a quién le corresponde cada una. <b>Todavía no se envía nada.</b></li>
        <li>Revisás el pareo, destildás lo que no quieras, y le das <b>Enviar</b>.</li>
        <li>Cada cliente recibe <b>su hoja en PDF</b> con el número de guía y el enlace para rastrear.</li>
      </ol>
    </p>

    <input type="file" id="archivo" accept="application/pdf,.pdf">
    <div class="acciones">
      <button class="btn azul" id="btnRevisar" disabled>🔍 Revisar (no envía nada)</button>
      <span class="cargando" id="estadoRevisar"></span>
    </div>
    <p class="reglas">
      Una guía solo se envía si se puede identificar al cliente con certeza (mínimo
      ${guias.MINIMO} puntos y ${guias.MARGEN} de diferencia sobre el segundo candidato).
      Si hay duda, no se envía y aparece el motivo: mandarle a un cliente la
      dirección y el teléfono de otro es filtrar datos personales.
    </p>
  </div>

  <div class="res" id="aviso"></div>

  <div id="zonaPareo" style="display:none">
    <h2>Pareo propuesto</h2>
    <table id="tablaPareo">
      <thead><tr>
        <th style="width:34px"></th><th>Pág</th><th>Guía</th><th>Dice la etiqueta</th>
        <th>Le corresponde a</th><th>Certeza</th><th>Por qué</th>
      </tr></thead>
      <tbody></tbody>
    </table>
    <div class="acciones">
      <button class="btn verde" id="btnEnviar">📲 Enviar las guías marcadas</button>
      <span class="cargando" id="estadoEnviar"></span>
    </div>
  </div>

  <div id="zonaReporte" style="display:none">
    <h2>Resultado del envío</h2>
    <table id="tablaReporte">
      <thead><tr><th>Guía</th><th>Cliente</th><th>Estado</th></tr></thead>
      <tbody></tbody>
    </table>
  </div>

  <h2>Guías ya enviadas</h2>
  <table>
    <thead><tr><th>Guía</th><th>Cliente</th><th>WhatsApp</th><th>Cuándo</th></tr></thead>
    <tbody>${filasHistorial}</tbody>
  </table>
  <p class="reglas">Si una guía ya está en esta lista, no se vuelve a enviar aunque el PDF se suba de nuevo.</p>

</main>
<script>
var TOKEN = ${JSON.stringify(tk)};
var plan = null;

var archivo = document.getElementById("archivo");
var btnRevisar = document.getElementById("btnRevisar");
var btnEnviar = document.getElementById("btnEnviar");
var estadoRevisar = document.getElementById("estadoRevisar");
var estadoEnviar = document.getElementById("estadoEnviar");
var aviso = document.getElementById("aviso");

function mostrar(clase, texto) {
  aviso.className = "res " + clase;
  aviso.textContent = texto;
  aviso.style.display = "block";
}

archivo.addEventListener("change", function () {
  btnRevisar.disabled = !archivo.files.length;
  document.getElementById("zonaPareo").style.display = "none";
  document.getElementById("zonaReporte").style.display = "none";
  aviso.style.display = "none";
});

// ── PASO 1: REVISAR ─────────────────────────────────────────────────────────
// El PDF se manda como cuerpo crudo (application/pdf), no como formulario:
// así el servidor lo recibe con express.raw() y no hace falta una librería de
// multipart. Menos dependencias, menos cosas que se rompan en Render.
btnRevisar.addEventListener("click", function () {
  var f = archivo.files[0];
  if (!f) return;
  btnRevisar.disabled = true;
  estadoRevisar.textContent = "Partiendo el PDF y buscando a quién corresponde cada guía...";
  aviso.style.display = "none";

  fetch("/guias/revisar?token=" + encodeURIComponent(TOKEN), {
    method: "POST",
    headers: { "Content-Type": "application/pdf" },
    body: f
  })
    .then(function (r) {
      // Un 403 devuelve el texto "Forbidden", no JSON. Sin esto, r.json()
      // explota con "Unexpected token 'F'" y el dueño ve un error que no tiene
      // nada que ver con el problema real, que es la clave del panel.
      if (r.status === 403) {
        throw new Error("la clave del panel no coincide. Volvé a abrir el panel y entrá de nuevo a Guías.");
      }
      if (!r.ok) throw new Error("el servidor respondió " + r.status + ".");
      return r.json();
    })
    .then(function (d) {
      if (!d.ok) { mostrar("mal", "🔴 " + (d.error || "No se pudo leer el PDF.")); return; }
      plan = d;
      pintarPareo(d);
    })
    .catch(function (e) { mostrar("mal", "🔴 " + e.message); })
    .finally(function () {
      btnRevisar.disabled = false;
      estadoRevisar.textContent = "";
    });
});

function claseCert(c) { return c >= 90 ? "alta" : c >= 70 ? "media" : "baja"; }

function pintarPareo(d) {
  var tb = document.querySelector("#tablaPareo tbody");
  tb.innerHTML = "";
  d.filas.forEach(function (f) {
    var tr = document.createElement("tr");
    if (!f.enviar) tr.className = "no";

    var chk = f.enviar
      ? '<input type="checkbox" class="sel" value="' + f.pagina + '" checked>'
      : "";
    var etiqueta = (f.etiqueta.nombre || "—") +
      '<span class="sub">' + [f.etiqueta.ciudad, (f.etiqueta.telefonos || []).join(" / ")].filter(Boolean).join(" · ") + "</span>";
    var destino = f.pedido
      ? "<b>" + f.pedido.nombre + "</b><span class=\\"sub\\">→ manda a +" + f.destino + " · " + f.pedido.total + "</span>"
      : '<span class="motivo">' + (f.motivo || "sin determinar") + "</span>";
    var cert = f.enviar
      ? '<span class="cert ' + claseCert(f.certeza) + '">' + f.certeza + "</span>"
      : "—";

    // data-label alimenta el ::before del CSS móvil: en el celular esta tabla
    // de 7 columnas se vuelve una tarjeta por hoja, con la etiqueta de cada
    // dato al lado. En 390px la tabla era ilegible.
    tr.innerHTML =
      '<td data-label="Enviar">' + chk + "</td>" +
      '<td data-label="Pág">' + f.pagina + "</td>" +
      '<td data-label="Guía"><code>' + (f.guia || "?") + "</code>" +
        (f.transportadora ? '<span class="sub">' + f.transportadora + "</span>" : "") + "</td>" +
      '<td data-label="Dice la etiqueta">' + etiqueta + "</td>" +
      '<td data-label="Le corresponde a">' + destino + "</td>" +
      '<td data-label="Certeza">' + cert + "</td>" +
      '<td data-label="Por qué"><span class="sub">' + (f.senales || []).join(", ") + "</span></td>";
    tb.appendChild(tr);
  });

  document.getElementById("zonaPareo").style.display = "block";
  document.getElementById("zonaReporte").style.display = "none";

  var listas = d.filas.filter(function (f) { return f.enviar; }).length;
  var fuera = d.filas.length - listas;
  mostrar(
    fuera ? "info" : "ok",
    "Se leyeron " + d.filas.length + " hoja(s): " + listas + " lista(s) para enviar" +
      (fuera ? " y " + fuera + " que NO se van a enviar (mirá el motivo en la tabla)." : ".") +
      " Todavía no se envió nada."
  );
  btnEnviar.disabled = listas === 0;
}

// ── PASO 2: ENVIAR ──────────────────────────────────────────────────────────
btnEnviar.addEventListener("click", function () {
  if (!plan) return;
  var paginas = [].slice.call(document.querySelectorAll(".sel:checked")).map(function (c) { return Number(c.value); });
  if (!paginas.length) { mostrar("mal", "No hay ninguna guía marcada."); return; }
  if (!confirm("Se le va a enviar la guía a " + paginas.length + " cliente(s). ¿Seguimos?")) return;

  btnEnviar.disabled = true;                    // candado contra el doble clic
  estadoEnviar.textContent = "Enviando...";

  fetch("/guias/enviar?token=" + encodeURIComponent(TOKEN), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: plan.id, paginas: paginas })
  })
    .then(function (r) {
      if (r.status === 403) {
        throw new Error("la clave del panel no coincide. Volvé a abrir el panel y entrá de nuevo a Guías.");
      }
      if (!r.ok) throw new Error("el servidor respondió " + r.status + ".");
      return r.json();
    })
    .then(function (d) {
      if (!d.ok) { mostrar("mal", "🔴 " + (d.error || "No se pudo enviar.")); return; }
      var tb = document.querySelector("#tablaReporte tbody");
      tb.innerHTML = "";
      d.resultados.forEach(function (r) {
        var tr = document.createElement("tr");
        if (!r.ok) tr.className = "no";
        tr.innerHTML =
          '<td data-label="Guía"><code>' + (r.guia || "?") + "</code></td>" +
          '<td data-label="Cliente">' + (r.nombre || "") + '<span class="sub">+' + (r.telefono || "") + "</span></td>" +
          '<td data-label="Estado">' + (r.ok ? "✅ enviada" : '<span class="motivo">🔴 ' + (r.error || "falló") + "</span>") + "</td>";
        tb.appendChild(tr);
      });
      document.getElementById("zonaReporte").style.display = "block";
      mostrar(d.fallaron ? "info" : "ok",
        "Enviadas " + d.enviadas + " de " + d.intentadas + "." +
        (d.fallaron ? " " + d.fallaron + " fallaron: mirá el motivo abajo." : ""));
      // El pareo ya se consumió: evita que se reenvíe con otro clic.
      document.getElementById("zonaPareo").style.display = "none";
      plan = null;
    })
    .catch(function (e) { mostrar("mal", "🔴 " + e.message); })
    .finally(function () {
      btnEnviar.disabled = false;
      estadoEnviar.textContent = "";
    });
});
</script>
</body></html>`;
}

module.exports = { render, esc, fmtCOP };
