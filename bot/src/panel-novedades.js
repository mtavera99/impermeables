// ============================================================================
// PANTALLA DE NOVEDADES
//
// Mismo patrón que la de guías, y a propósito: REVISAR primero, ENVIAR después.
// Nunca se manda nada sin que el dueño vea a quién le va a llegar qué. Con
// mensajes a clientes reales, un "enviar" directo no se puede deshacer.
//
// Se pega texto en vez de subir un archivo porque todavía no sabemos si 99
// Envíos exporta CSV. Copiar lo que se ve en pantalla funciona hoy, y el mismo
// parser lee un CSV cuando lo haya.
// ============================================================================

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function render(opciones = {}) {
  const tk = process.env.PANEL_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || "";
  const hayPlantilla = Boolean(opciones.hayPlantilla);

  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BikerPro · Novedades</title>
<style>
  :root{color-scheme:dark}
  *{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%}
  body{margin:0;background:#0f1319;color:#e7e9ee;font:16px/1.5 -apple-system,BlinkMacSystemFont,system-ui,sans-serif;
       padding-bottom:calc(24px + env(safe-area-inset-bottom))}
  header{padding:14px 16px;background:#151a22;border-bottom:1px solid #222a35;position:sticky;top:0;z-index:10}
  h1{margin:0;font-size:17px}
  .sub2{color:#8b93a4;font-size:13px;margin-top:3px}
  main{padding:16px;max-width:1000px;margin:0 auto}
  h2{font-size:15px;margin:24px 0 10px;padding-bottom:6px;border-bottom:1px solid #222a35}
  .caja{background:#151a22;border:1px solid #222a35;border-radius:14px;padding:14px;margin:0 0 14px}
  .como{color:#aab2c0;font-size:14px;margin:0 0 12px}
  .como ol{margin:8px 0 0;padding-left:20px}.como li{margin:5px 0}
  /* 16px y no menos: iOS agranda la página sola en cualquier campo de menos de
     16px, y acá se pega texto largo desde el celular. Ya nos pasó en el panel. */
  textarea{width:100%;min-height:150px;background:#0f1319;border:1px solid #39424f;border-radius:12px;
           padding:12px;color:#e7e9ee;font:16px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
  textarea:focus{outline:none;border-color:#3b82f6}
  .btn{background:#1b212b;border:1px solid #2d3542;color:#e7e9ee;padding:0 16px;min-height:46px;
       border-radius:12px;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;
       touch-action:manipulation;font-weight:500}
  .btn:hover:not(:disabled){background:#232b36}
  .btn:active{transform:scale(.98)}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .btn.azul{background:#1d4ed8;border-color:#2563eb;font-weight:700}
  .btn.verde{background:#12693f;border-color:#18854f;font-weight:700}
  .acciones{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px}
  table{width:100%;border-collapse:collapse;font-size:14px;background:#151a22;border-radius:14px;overflow:hidden}
  th,td{padding:10px 11px;text-align:left;border-bottom:1px solid #222a35;vertical-align:top}
  th{background:#1b212b;color:#aab2c0;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
  tr:last-child td{border-bottom:0}
  tr.no td{opacity:.66;background:#17131a}
  .sub{color:#8b93a4;font-size:12px;display:block;margin-top:2px}
  code{background:#0f1319;padding:1px 5px;border-radius:4px;font-size:13px}
  .res{padding:12px 14px;border-radius:12px;margin:0 0 14px;font-size:14px;display:none}
  .res.ok{background:#12291c;border:1px solid #1f6b3f;color:#9be8b8}
  .res.mal{background:#2b1518;border:1px solid #7a2b33;color:#ffb3ba}
  .res.info{background:#14202e;border:1px solid #2b5480;color:#a9cdf5}
  .aviso{background:#241c10;border:1px solid #6b5220;color:#f5d9a0;padding:12px 14px;border-radius:12px;font-size:14px;margin:0 0 14px}
  .tag{font-size:10px;padding:3px 8px;border-radius:99px;background:#2a313d;color:#c8cfdd;white-space:nowrap}
  .tag.abierta{background:#12351f;color:#8ff0b5}
  .tag.cerrada{background:#3a2d0c;color:#ffd479}
  .motivo{color:#ff9f9f;font-size:13px}
  .vacio{color:#8b93a4;text-align:center;padding:20px}
  .msg{background:#0f1319;border-left:2px solid #2b5480;padding:7px 10px;border-radius:8px;
       font-size:13px;color:#c8cfdd;margin-top:6px;white-space:pre-wrap}

  @media (max-width:640px){
    main{padding:13px}
    table{background:transparent}
    table,tbody,tr,td{display:block;width:100%}
    thead{display:none}
    tbody tr{background:#151a22;border:1px solid #222a35;border-radius:14px;padding:10px 12px;margin-bottom:10px}
    tbody td{border:0;padding:6px 0;display:flex;flex-wrap:wrap;gap:2px 12px;justify-content:flex-end;
             align-items:baseline;text-align:right}
    tbody td::before{content:attr(data-label);color:#8b93a4;font-size:11px;text-transform:uppercase;
                     letter-spacing:.04em;margin-right:auto;text-align:left;flex:0 0 auto;max-width:42%}
    tbody td .sub,tbody td .msg{flex:0 0 100%;text-align:left}
    tbody td.vacio{display:block;text-align:center}
    tbody td.vacio::before{content:none}
    .acciones{flex-direction:column;align-items:stretch}
    .btn{width:100%;justify-content:center;min-height:48px}
  }
</style></head>
<body>
<header>
  <h1>📮 Novedades de entrega</h1>
  <div class="sub2">Avisarle al cliente para que el pedido no se devuelva</div>
</header>
<main>
  <div id="res" class="res"></div>

  ${
    hayPlantilla
      ? ""
      : `<div class="aviso">
           ⚠️ <b>Todavía no hay plantilla aprobada para novedades.</b> A los clientes que
           escribieron hace <b>más de 24 horas</b> WhatsApp no deja mandarles texto libre, así que
           esos van a aparecer <b>bloqueados</b>. Subí la plantilla <code>novedad_entrega</code> y
           poné <code>PLANTILLA_NOVEDAD=novedad_entrega</code> en Render para desbloquearlos.
         </div>`
  }

  <div class="caja">
    <div class="como">
      <b>Cómo se usa</b>
      <ol>
        <li>Entrá a 99 Envíos, a la lista de novedades</li>
        <li><b>Seleccioná y copiá</b> las filas (o pegá el CSV si lo podés descargar)</li>
        <li>Pegalo acá abajo y dale <b>Revisar</b> — eso <b>no envía nada</b></li>
        <li>Mirás a quién le va a llegar qué, y recién ahí <b>Enviar</b></li>
      </ol>
      No importa el formato: busca los números de guía en cada línea y el resto lo toma como motivo.
    </div>
    <textarea id="pegado" placeholder="Pegá acá las novedades. Por ejemplo:&#10;240012345678  INTERRAPIDISIMO  Direccion incompleta&#10;240098765432  Destinatario ausente"></textarea>
    <div class="acciones">
      <button class="btn azul" id="btnRevisar">🔍 Revisar (no envía nada)</button>
      <a class="btn" href="/panel?token=${esc(tk)}">← Volver al panel</a>
    </div>
  </div>

  <div id="zona" style="display:none">
    <h2>A quién le va a llegar</h2>
    <table id="tabla">
      <thead><tr>
        <th style="width:30px"></th><th>Guía</th><th>Cliente</th><th>Novedad</th>
        <th>Ventana</th><th>Mensaje</th>
      </tr></thead>
      <tbody></tbody>
    </table>
    <div class="acciones">
      <button class="btn verde" id="btnEnviar">📲 Enviar los mensajes marcados</button>
    </div>
  </div>
</main>
<script>
var TOKEN = ${JSON.stringify(tk)};
var PLAN = null;
var res = document.getElementById("res");

function mostrar(clase, texto) {
  res.className = "res " + clase;
  res.textContent = texto;
  res.style.display = "block";
}

document.getElementById("btnRevisar").addEventListener("click", function () {
  var txt = document.getElementById("pegado").value.trim();
  if (!txt) { mostrar("mal", "Pegá primero las novedades."); return; }
  var btn = this;
  btn.disabled = true;
  mostrar("info", "Buscando a quién corresponde cada guía...");

  fetch("/novedades/revisar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, texto: txt })
  })
    .then(function (r) {
      if (r.status === 403) throw new Error("la clave del panel no coincide. Abrí el panel de nuevo.");
      if (!r.ok) throw new Error("el servidor respondió " + r.status);
      return r.json();
    })
    .then(function (d) {
      if (!d.ok) { mostrar("mal", "🔴 " + (d.error || "no se pudo revisar")); return; }
      PLAN = d;
      var tb = document.querySelector("#tabla tbody");
      tb.innerHTML = "";
      if (d.filas.length === 0) {
        tb.innerHTML = '<tr><td class="vacio" colspan="6">No encontré ningún número de guía en lo que pegaste.</td></tr>';
      }
      d.filas.forEach(function (f, i) {
        var tr = document.createElement("tr");
        if (!f.enviar) tr.className = "no";
        var chk = f.enviar
          ? '<input type="checkbox" data-i="' + i + '" checked style="width:22px;height:22px">'
          : "";
        var ventana = f.destino
          ? (f.ventanaAbierta
              ? '<span class="tag abierta">abierta</span>'
              : '<span class="tag cerrada">cerrada +24h</span>')
          : "";
        var cuerpo = f.enviar
          ? '<div class="msg">' + f.texto + "</div>"
          : '<span class="motivo">' + (f.motivoNoEnvio || "") + "</span>";
        tr.innerHTML =
          '<td data-label="Enviar">' + chk + "</td>" +
          '<td data-label="Guía"><code>' + f.guia + "</code></td>" +
          '<td data-label="Cliente">' + (f.nombre || "—") +
            '<span class="sub">' + (f.destino ? "+" + f.destino : "sin destinatario") + "</span></td>" +
          '<td data-label="Novedad">' + f.tipoNombre + '<span class="sub">' + f.motivo + "</span></td>" +
          '<td data-label="Ventana">' + ventana + "</td>" +
          '<td data-label="Mensaje">' + cuerpo + "</td>";
        tb.appendChild(tr);
      });
      document.getElementById("zona").style.display = "block";
      mostrar(
        d.bloqueadas ? "info" : "ok",
        "Se leyeron " + d.filas.length + " novedad(es): " + d.listas + " lista(s) para avisar" +
          (d.bloqueadas ? " y " + d.bloqueadas + " que NO se pueden enviar (mirá el motivo)." : ".") +
          " Todavía no se envió nada."
      );
    })
    .catch(function (e) { mostrar("mal", "🔴 No salió: " + e.message + " No se envió nada."); })
    .finally(function () { btn.disabled = false; });
});

document.getElementById("btnEnviar").addEventListener("click", function () {
  if (!PLAN) return;
  var marcados = [].slice.call(document.querySelectorAll("#tabla input[type=checkbox]:checked"))
    .map(function (c) { return Number(c.getAttribute("data-i")); });
  if (marcados.length === 0) { mostrar("mal", "No hay ninguna marcada."); return; }
  var btn = this;
  btn.disabled = true;
  mostrar("info", "Enviando " + marcados.length + " mensaje(s)...");

  fetch("/novedades/enviar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, id: PLAN.id, indices: marcados })
  })
    .then(function (r) {
      if (r.status === 403) throw new Error("la clave del panel no coincide.");
      if (!r.ok) throw new Error("el servidor respondió " + r.status);
      return r.json();
    })
    .then(function (d) {
      if (!d.ok) { mostrar("mal", "🔴 " + (d.error || "no se pudo enviar")); return; }
      mostrar(d.fallaron ? "info" : "ok",
        "Enviados " + d.enviados + " de " + d.intentados + "." +
        (d.fallaron ? " " + d.fallaron + " fallaron." : ""));
      document.querySelectorAll("#tabla input[type=checkbox]").forEach(function (c) { c.checked = false; });
    })
    .catch(function (e) { mostrar("mal", "🔴 No salió: " + e.message); })
    .finally(function () { btn.disabled = false; });
});
</script>
</body></html>`;
}

module.exports = { render };
