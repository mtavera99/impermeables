/**
 * EL PANEL TIENE QUE SERVIR EN EL CELULAR.
 *
 * El dueño usa este panel desde el iPhone y dijo que se veía mal. La causa era
 * medible: NO había una sola media query en todo el archivo.
 *
 * Los estilos son lo más fácil de romper sin que nadie se entere, porque nada
 * falla: simplemente queda feo o inusable. Estas pruebas fijan las decisiones
 * que tienen una razón concreta detrás, no el gusto.
 *
 *   node test-panel-movil.js      (sin credenciales ni IA)
 */

process.env.PANEL_TOKEN = process.env.PANEL_TOKEN || "clave_de_prueba";
process.env.DATA_DIR = process.env.DATA_DIR || "/tmp/panel-movil-prueba";

const panel = require("./src/panel");
const store = require("./src/store");

// Un pedido de mentira para que las tablas tengan contenido que revisar.
store.saveOrder({
  nombre: "Cliente De Prueba",
  celular: "3001234567",
  ciudad: "Monteria",
  direccion: "Calle 10 #5-30",
  talla: "L",
  color: "negro",
  pago: "contraentrega",
  total: 140000,
  telefono_chat: "573001234567",
});

const html = panel.render();

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

console.log("\n── 1. Lo básico que hace que un sitio sea usable en el celular ──");

chequear(
  "tiene la etiqueta viewport (sin esto el móvil finge ser un escritorio)",
  /<meta name="viewport"[^>]*width=device-width/.test(html)
);
chequear(
  "hay media queries para móvil",
  /@media \(max-width:\s*640px\)/.test(html),
  "sin esto el diseño de escritorio se aplasta en la pantalla del teléfono"
);
chequear(
  "hay un corte extra para pantallas muy angostas (iPhone SE)",
  /@media \(max-width:\s*360px\)/.test(html)
);
chequear(
  "respeta el área segura del iPhone (barra de gestos)",
  html.includes("env(safe-area-inset-bottom)"),
  "el último botón queda tapado por la barra de gestos"
);
chequear(
  "evita que el navegador reescale el texto solo",
  html.includes("-webkit-text-size-adjust:100%")
);

console.log("\n── 2. 🔑 El cuadro de texto no puede disparar el zoom de iOS ──");
// iOS agranda la página automáticamente al enfocar un input de menos de 16px.
// Pasaba justo al escribirle a un cliente: la página saltaba y había que
// pellizcar para volver. Es el detalle que más hacía sentir el panel "roto".
const textarea = html.match(/\.resp textarea\{[^}]*\}/);
chequear("existe el estilo del cuadro de respuesta", Boolean(textarea));
chequear(
  "el cuadro de texto es de 16px o más",
  textarea && /font:1[6-9]px/.test(textarea[0]),
  `quedó: ${textarea ? textarea[0].match(/font:[^;]*/) : "?"} — menos de 16px hace zoom en iOS`
);

console.log("\n── 3. Los botones se pueden tocar con el dedo ──");
// La guía de Apple pide 44px de alto mínimo. Los botones tenían ~30px.
const btn = html.match(/\.btn\{[^}]*\}/);
chequear("el botón principal mide 44px de alto o más", btn && /min-height:4[4-9]px/.test(btn[0]), btn && btn[0]);
chequear(
  "los botones quitan el retardo del doble toque",
  (html.match(/touch-action:manipulation/g) || []).length >= 3,
  "sin esto el navegador espera ~300ms antes de responder y se siente pesado"
);
chequear(
  "en móvil el botón de enviar ocupa todo el ancho",
  /\.resp button\{width:100%/.test(html.replace(/\s+/g, " ").replace(/ \{/g, "{")) ||
    /\.resp button\{[^}]*width:100%/.test(html),
  "al lado del texto quedaba de ~60px de ancho"
);

console.log("\n── 4. Las tablas no se aplastan: se vuelven tarjetas ──");

chequear("las tablas van dentro de un contenedor .tabla", (html.match(/class="tabla"/g) || []).length >= 2);
chequear(
  "en móvil las filas se muestran como bloques",
  /\.tabla tr\{[\s\S]*?display:block|\.tabla table,\.tabla tbody,\.tabla tr,\.tabla td\{display:block/.test(html)
);
chequear("se esconde la fila de encabezados en móvil", html.includes(".tabla tr:first-child{display:none}"));
chequear(
  "cada dato muestra su etiqueta desde data-label",
  html.includes("content:attr(data-label)"),
  "sin esto, en la tarjeta se ven números sueltos sin saber qué son"
);

// Y que el HTML realmente traiga las etiquetas, no solo el CSS que las usa.
const tds = html.match(/<td[^>]*>/g) || [];
const conEtiqueta = tds.filter((t) => t.includes("data-label")).length;
const sinEtiqueta = tds.filter((t) => !t.includes("data-label") && !t.includes("vacio"));
chequear(
  `las celdas traen data-label (${conEtiqueta} de ${tds.length})`,
  sinEtiqueta.length === 0,
  `quedaron sin etiqueta: ${sinEtiqueta.slice(0, 3).join(" ")}`
);

console.log("\n── 5. El chat es navegable y no eterno ──");
chequear(
  "el chat tiene alto máximo y scroll propio",
  /\.chat\{[^}]*max-height:\d+vh/.test(html),
  "una conversación de 24 mensajes obliga a scrollear medio kilómetro para llegar al cuadro de respuesta"
);
chequear("el scroll del chat no arrastra la página", html.includes("overscroll-behavior:contain"));
chequear("scroll suave en iOS", html.includes("-webkit-overflow-scrolling:touch"));

console.log("\n── 6. Nada de lo anterior rompió el panel ──");

const script = html.match(/<script>([\s\S]*?)<\/script>/);
let compila = false;
try {
  new Function(script[1]);
  compila = true;
} catch (e) {
  compila = e.message;
}
chequear("el JavaScript del panel sigue compilando", compila === true, `error: ${compila}`);
chequear("el formulario sigue mandando urlencoded (el arreglo del botón)", html.includes("x-www-form-urlencoded"));
chequear("el pedido de prueba aparece en la tabla", html.includes("Cliente De Prueba"));
chequear("sigue el aviso del disco", /Disco persistente comprobado|DATA_DIR|disco/i.test(html));
chequear(
  "se respeta a quien pidió menos animación",
  html.includes("prefers-reduced-motion")
);

console.log("\n── 7. La pantalla de guías también, que es con la que se despacha ──");
// Acá el problema era peor: la tabla de pareo tiene SIETE columnas. En 390px no
// se leía nada, y es la pantalla que se usa con el celular en la mano.
const guias = require("./src/panel-guias").render();

chequear("tiene media queries para móvil", /@media \(max-width:\s*640px\)/.test(guias));
chequear(
  "la tabla de 7 columnas se vuelve tarjetas",
  guias.includes("content:attr(data-label)") && /table,tbody,tr,td\{display:block/.test(guias.replace(/\s+/g, ""))
);
chequear("esconde los encabezados en móvil", /thead\{display:none\}/.test(guias));
chequear(
  "el campo del PDF es de 16px (no dispara el zoom de iOS)",
  /input\[type=file\]\{font-size:16px\}/.test(guias)
);
chequear("los botones llegan a 44px", /\.btn\{[^}]*min-height:44px/.test(guias));
chequear("respeta el área segura del iPhone", guias.includes("env(safe-area-inset-bottom)"));
chequear(
  "la casilla de enviar es grande para el dedo",
  /input\[type=checkbox\]\{width:22px/.test(guias)
);

// Las filas de esta pantalla se arman en JavaScript, así que las etiquetas
// tienen que estar en ESE código, no solo en el HTML del servidor.
const scriptGuias = guias.match(/<script>([\s\S]*?)<\/script>/);
chequear(
  "las filas que arma el navegador traen data-label",
  (scriptGuias[1].match(/data-label=/g) || []).length >= 9,
  `encontré ${(scriptGuias[1].match(/data-label=/g) || []).length}`
);
let compilaGuias = false;
try {
  new Function(scriptGuias[1]);
  compilaGuias = true;
} catch (e) {
  compilaGuias = e.message;
}
chequear("el JavaScript de la pantalla de guías compila", compilaGuias === true, `error: ${compilaGuias}`);

require("fs").rmSync("/tmp/panel-movil-prueba", { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
