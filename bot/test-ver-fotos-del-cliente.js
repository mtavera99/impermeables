/**
 * VER LA FOTO QUE MANDÓ UN CLIENTE, SIN CARGARLAS TODAS.
 *
 * POR QUÉ EXISTE (15-oct), textual del dueño: *"cuando una persona manda una
 * foto normalmente dice 'envío una foto' pero yo no la puedo ver... no sé si eso
 * afecte la cantidad de memoria y nos vaya a afectar el panel, pero no sé si
 * podamos poner un botón para que cuando yo necesite ver esa imagen en el panel
 * yo la pueda ver sin necesidad de que carguen todas... porque puede que sea un
 * comprobante, puede que sea algún dato importante"*.
 *
 * 🔑 LA PREGUNTA DE LA MEMORIA ERA LA CORRECTA, y marca todo el diseño. Después
 * del 14-oct —cuando conversations.json de 32 MB tumbó el servicio nueve veces
 * en cuatro horas— guardar las fotos en el historial habría repetido el mismo
 * problema. Así que:
 *
 *   · en el historial solo queda el `mediaId`, un texto corto
 *   · la imagen vive en los servidores de Meta
 *   · y el HTML del chat NO trae ningún <img src>: la imagen nace cuando se
 *     toca el botón. Si viniera en el HTML, el navegador se bajaría TODAS las
 *     fotos del chat al abrirlo, que es justo lo que se pidió evitar.
 *
 * Esta batería protege esas tres cosas.
 *
 *   node test-ver-fotos-del-cliente.js      (sin credenciales, sin red)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "ver-fotos-"));
process.env.DATA_DIR = DIR;

const store = require("./src/store");
const panelChat = require("./src/panel-chat");
const audio = require("./src/audio");

let ok = 0;
let mal = 0;
function chequear(nombre, condicion, detalle) {
  if (condicion) {
    console.log(`✅ ${nombre}`);
    ok++;
  } else {
    console.log(`🔴 ${nombre}${detalle ? `\n     ${detalle}` : ""}`);
    mal++;
  }
}

// ── El escenario: un chat con una foto, un video y mensajes normales ───────
const TEL = "573001112233";
store.pushMsg(TEL, "user", "hola, quiero uno");
store.pushMsg(TEL, "user", "[el cliente mandó una imagen: posible comprobante de pago]", {
  tipo: "image",
  mediaId: "MEDIA_ABC123",
  comprobante: true,
});
store.pushMsg(TEL, "assistant", "¡Recibido! Ya le pasé tu comprobante al equipo");
store.pushMsg(TEL, "user", "[el cliente mandó un video, que el bot no puede abrir]", {
  tipo: "video",
  mediaId: "MEDIA_VIDEO9",
});
store.pushMsg(TEL, "user", "[el cliente mandó un document, que el bot no puede abrir]", {
  tipo: "document",
  mediaId: "MEDIA_PDF7",
});

const html = panelChat.render({ id: TEL, token: "tk123" });

// ============================================================================
console.log("\n── 1. El botón aparece, con el nombre de cada tipo ──");
// ============================================================================
chequear("la foto ofrece «Ver la foto»", html.includes("📷 Ver la foto"));
chequear("el video ofrece «Ver el video»", html.includes("🎬 Ver el video"));
chequear("el documento ofrece «Ver el archivo»", html.includes("📄 Ver el archivo"));
chequear(
  "💸 la foto marcada por el bot dice «posible comprobante»",
  html.includes("posible comprobante"),
  "es el caso por el que más se abre una foto"
);
chequear("hay un enlace para abrirla aparte", html.includes("abrir aparte"));

console.log("\n   Y solo en los mensajes que traen archivo:");
const burbujas = (html.match(/class="msg /g) || []).length;
const botones = (html.match(/<details class="vermedia"/g) || []).length;
console.log(`   burbujas: ${burbujas} · botones: ${botones}`);
chequear("5 burbujas", burbujas === 5, `hay ${burbujas}`);
chequear("3 botones (foto, video y documento)", botones === 3, `hay ${botones}`);

// ============================================================================
console.log("\n── 2. 🔑 NADA SE PRECARGA (la pregunta de la memoria) ──");
// ============================================================================
chequear(
  "NO hay ningún <img src=> en el HTML",
  !/<img[^>]*\ssrc=/i.test(html),
  "si lo hubiera, el navegador bajaría TODAS las fotos al abrir el chat"
);
chequear("NO hay ningún <video src=>", !/<video[^>]*\ssrc=/i.test(html));
chequear("NO hay <iframe>", !/<iframe/i.test(html));
chequear("la dirección viaja en data-url", html.includes("data-url="));
chequear("y el tipo en data-tipo", html.includes("data-tipo="));
chequear(
  "el visor arranca vacío",
  html.includes('<div class="visor"></div>'),
  "lo llena el script al tocar el botón"
);

// ============================================================================
console.log("\n── 3. La dirección lleva lo que hace falta ──");
// ============================================================================
chequear("apunta a /media", html.includes("/media?token="));
chequear("lleva el mediaId de la foto", html.includes("id=MEDIA_ABC123"));
chequear("lleva el del video", html.includes("id=MEDIA_VIDEO9"));
chequear("lleva el token del panel", html.includes("token=tk123"));

console.log("\n   Y un mediaId raro no rompe la página:");
const TEL2 = "573009998877";
store.pushMsg(TEL2, "user", '[imagen]', {
  tipo: "image",
  mediaId: 'ABC"><script>alert(1)</script>',
});
const html2 = panelChat.render({ id: TEL2, token: "tk123" });
chequear(
  "no se puede inyectar un <script> por el mediaId",
  !html2.includes("<script>alert(1)</script>"),
  "encodeURIComponent + esc() lo neutralizan"
);
chequear("y la página se sigue armando", html2.includes("Ver la foto"));

// ============================================================================
console.log("\n── 4. Un chat sin fotos queda igual que antes ──");
// ============================================================================
const TEL3 = "573005554444";
store.pushMsg(TEL3, "user", "cuanto vale");
store.pushMsg(TEL3, "assistant", "El conjunto es $59.900");
const html3 = panelChat.render({ id: TEL3, token: "tk123" });
// ⚠️ Se busca el ELEMENTO, no la palabra: "vermedia" también está en el CSS y
// en el script, que van en toda página. Mi primera versión de esta prueba
// buscaba la palabra y fallaba por eso.
chequear("no aparece ningún botón de ver", !html3.includes('<details class="vermedia"'));
chequear("y los mensajes se ven normal", html3.includes("cuanto vale"));

// ============================================================================
console.log("\n── 5. urlDeMedia falla limpio, sin tirar el proceso ──");
// Solo los caminos que no tocan la red: lo demás se probó contra el bot vivo.
// ============================================================================
(async () => {
  const sinId = await audio.urlDeMedia("");
  chequear("sin id devuelve ok:false", sinId.ok === false);
  chequear("y dice el motivo", /no hay id|WHATSAPP_TOKEN/.test(String(sinId.error)), sinId.error);

  const guardado = process.env.WHATSAPP_TOKEN;
  delete process.env.WHATSAPP_TOKEN;
  // El módulo ya leyó el token al cargarse, así que esto solo confirma que la
  // función no explota con un id cualquiera y sin red.
  const r = await audio.urlDeMedia("MEDIA_QUE_NO_EXISTE");
  chequear("con un id inexistente devuelve ok:false y no lanza", r.ok === false);
  if (guardado) process.env.WHATSAPP_TOKEN = guardado;

  chequear("urlDeMedia está exportada", typeof audio.urlDeMedia === "function");
  chequear("descargarMedia sigue exportada (la usa el comprobante)", typeof audio.descargarMedia === "function");

  try {
    fs.rmSync(DIR, { recursive: true, force: true });
  } catch {
    /* es /tmp */
  }

  console.log(`\n${ok}/${ok + mal} correctos`);
  if (mal) {
    console.log(
      `\n🔴 ${mal} fallaron. Lo más grave sería que las fotos vuelvan al HTML: ` +
        `ahí el navegador las baja todas y volvemos al problema del 14-oct.`
    );
  }
  process.exit(mal ? 1 : 0);
})();
