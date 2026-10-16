// ============================================================================
// 🎯 POR ANUNCIO: CHARLAS, CLICS MUERTOS Y VENTAS
//
// 🔴 DE DÓNDE SALE (16-oct). El dueño preguntó por qué el Q58 Max llevaba ~30
// conversaciones y cero ventas, y dónde se estaban frenando. La tabla "Pedidos
// por anuncio" del panel no servía para contestarlo: solo contaba PEDIDOS, así
// que los tres anuncios del Q58 —con 0 ventas— no aparecían en ninguna fila.
//
// Al medirlo a mano sobre los chats salió el número que explicaba todo:
//
//     de 28 leads del Q58, 20 (71%) NUNCA escribieron una sola letra
//     en el V10, en la misma ventana, eran 13 de 37 (35%)
//
// Y cero objeciones de precio en los 28. O sea: el guion no era el problema, el
// creativo traía clics que no querían hablar. Son dos problemas distintos y se
// arreglan en lugares distintos, y sin esta columna se confunden.
//
// 🔑 CÓMO SE CUENTA UN CLIC MUERTO: una conversación con UN SOLO mensaje del
// cliente. El primer mensaje de un lead de anuncio es siempre el prellenado que
// WhatsApp manda solo al tocar el botón, así que uno solo significa que nunca
// tecleó nada. Se comprobó contra el texto exacto del prellenado en los tres
// productos y coincidió 20/20, 13/13 y 25/25. Se usa la forma de contar y no el
// texto porque el texto lo cambia el dueño cada vez que edita el anuncio.
// ============================================================================
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const os = require("os");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "anuncios-"));
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "t";
// Los ids reales de los anuncios, para que `productoDelAnuncio` los reconozca.
process.env.ANUNCIOS_Q58 = "120249894780920390,120249894780890390";
process.env.ANUNCIOS_V10 = "120249619947220390";

const store = require("./src/store");
const panel = require("./src/panel");

let ok = 0;
let mal = 0;
function chequear(nombre, cond, detalle) {
  if (cond) {
    console.log(`  ✅ ${nombre}`);
    ok++;
  } else {
    console.log(`  ❌ ${nombre}${detalle ? `\n       ${detalle}` : ""}`);
    mal++;
  }
}

const AD_Q58_A = "120249894780920390";
const AD_Q58_B = "120249894780890390";
const AD_V10 = "120249619947220390";

/**
 * Arma una conversación que vino de un anuncio.
 * @param {number} mensajesDelCliente 1 = tocó el botón y nunca escribió nada más
 */
function lead(tel, adId, mensajesDelCliente) {
  store.guardarAtribucion(tel, { source_id: adId, source_url: "https://instagram.com/p/x" });
  store.pushMsg(tel, "user", "¡Hola! Quiero la promo");
  store.pushMsg(tel, "assistant", "¡Hola! 👋 Claro que sí...");
  for (let i = 1; i < mensajesDelCliente; i++) {
    store.pushMsg(tel, "user", `pregunta ${i}`);
    store.pushMsg(tel, "assistant", `respuesta ${i}`);
  }
}

// El anuncio A del Q58: 10 charlas, 8 clics muertos (80%) — el malo.
for (let i = 0; i < 8; i++) lead(`57300000${i}1`, AD_Q58_A, 1);
for (let i = 0; i < 2; i++) lead(`57300000${i}2`, AD_Q58_A, 4);
// El anuncio B del Q58: 4 charlas, 1 clic muerto (25%) — el sano.
lead("573111000001", AD_Q58_B, 1);
for (let i = 0; i < 3; i++) lead(`57311100000${i + 2}`, AD_Q58_B, 5);
// El V10: 4 charlas, 1 muerto, y además una venta.
lead("573222000001", AD_V10, 1);
for (let i = 0; i < 3; i++) lead(`57322200000${i + 2}`, AD_V10, 6);
store.saveOrder({
  nombre: "Cliente V10",
  // 🔑 `telefono_chat` y no `celular`: es el campo con el que store.saveOrder
  // busca la atribución al anuncio. Con `celular` el pedido se guarda igual pero
  // SIN anuncio, y la fila del creativo queda en 0 ventas aunque haya vendido.
  telefono_chat: "573222000002",
  celular: "573222000002",
  ciudad: "Bogotá",
  direccion: "Cra 1 # 2-3",
  total: 113000,
  unidades: 2,
  pago: "contraentrega",
});

// ⚠️ `render(aviso)` recibe un STRING (el aviso a mostrar arriba), no un objeto
// de opciones. Pasarle `{token}` lo interpola como "[object Object]" en la
// página. La primera versión de esta prueba lo llamaba mal y se acusó sola de
// un bug del panel que no existía.
const html = panel.render();

console.log("\n🎯 TABLA DE ANUNCIOS\n");
console.log("1) La tabla aparece aunque un anuncio no tenga NI UNA venta");

chequear("existe la sección", html.includes("Por anuncio: charlas, clics muertos y ventas"));
chequear(
  "🔴 el anuncio del Q58 con 0 pedidos SÍ aparece (antes era invisible)",
  html.includes(AD_Q58_A),
  "es justo el anuncio que hay que mirar"
);
chequear("el segundo anuncio del Q58 también", html.includes(AD_Q58_B));
chequear("y el del V10", html.includes(AD_V10));

console.log("\n2) La columna que decide: se fueron sin escribir");
// Se extrae la fila de cada anuncio para leer sus celdas.
function fila(adId) {
  const i = html.indexOf(adId);
  if (i < 0) return "";
  const ini = html.lastIndexOf("<tr>", i);
  const fin = html.indexOf("</tr>", i);
  return html.slice(ini, fin);
}
const fA = fila(AD_Q58_A);
const fB = fila(AD_Q58_B);
const fV = fila(AD_V10);

chequear("el anuncio malo del Q58 marca 10 charlas", /Charlas"><b>10<\/b>/.test(fA), fA.slice(0, 400));
chequear("y 8 clics muertos (80%)", fA.includes("<b>8</b>") && fA.includes("(80%)"), fA.slice(0, 500));
chequear("el anuncio sano del Q58 marca 4 charlas y 1 muerto (25%)", /Charlas"><b>4<\/b>/.test(fB) && fB.includes("(25%)"), fB.slice(0, 500));

console.log("\n3) El color hace legible la tabla de un vistazo");
chequear('80% sale en rojo (clase "mal")', /class="nowrap mal"/.test(fA), fA.slice(0, 500));
chequear('25% sale en verde (clase "bien")', /class="nowrap bien"/.test(fB), fB.slice(0, 500));
chequear("el umbral rojo es 60%", html.includes("Arriba del 60%"));
chequear("hay estilo para las tres bandas", html.includes("td.mal{") && html.includes("td.bien{"));

console.log("\n4) Dice de qué producto es cada anuncio");
chequear("reconoce el Q58 por el id del anuncio", fA.includes("Q58 Max"), fA.slice(0, 300));
chequear("reconoce el V10 por el id del anuncio", fV.includes("V10 2X"), fV.slice(0, 300));

console.log("\n5) Los pedidos y el cierre siguen ahí");
chequear("el anuncio del V10 muestra su pedido", /Pedidos"><b>1<\/b>/.test(fV), fV.slice(0, 500));
chequear("los anuncios del Q58 muestran 0 pedidos", /Pedidos"><b>0<\/b>/.test(fA));
chequear("calcula el cierre sobre las charlas", fV.includes("25.0%"), fV.slice(0, 500));
chequear("muestra lo vendido", fV.includes("113.000"), fV.slice(0, 500));

console.log("\n6) Se ordena por charlas, no por pedidos");
// Con un producto nuevo las filas interesantes son las que tienen 0 ventas: si
// se ordenara por pedidos, el anuncio con el problema quedaría al final.
chequear(
  "el anuncio de más charlas va primero, aunque no haya vendido nada",
  html.indexOf(AD_Q58_A) < html.indexOf(AD_V10),
  "el que tiene 10 charlas y 0 ventas tiene que estar arriba"
);

console.log("\n7) Casos borde");
chequear(
  "ninguna fila de la tabla trae basura",
  !/\[object Object\]/.test(html) &&
    ![fA, fB, fV].some((f) => /undefined|null|NaN/.test(f)),
  JSON.stringify([fA, fB, fV].map((f) => (/undefined|null|NaN/.test(f) ? f.slice(0, 600) : "ok")))
);
chequear(
  'render() no interpola objetos en la página',
  !/\[object Object\]/.test(html),
  "render(aviso) recibe un string: si le pasás un objeto, sale literal en el HTML"
);
chequear("no explota si no hay conversaciones ni pedidos", (() => {
  try {
    const vacio = fs.mkdtempSync(path.join(os.tmpdir(), "vacio-"));
    const { execFileSync } = require("child_process");
    execFileSync(
      process.execPath,
      ["-e", 'const p=require("./src/panel");p.render();'],
      { cwd: __dirname, env: { ...process.env, DATA_DIR: vacio }, stdio: "pipe" }
    );
    return true;
  } catch (e) {
    return false;
  }
})());

console.log("\n8) ♻️ No se agregaron lecturas de disco (la regresión del #211)");
{
  // Se cuenta cuántas veces se lee conversations.json en UN render. La tabla
  // nueva se calcula sobre `convs`, que ya está en memoria.
  const real = fs.readFileSync;
  let lecturas = 0;
  fs.readFileSync = function (f, ...r) {
    if (String(f).endsWith("conversations.json")) lecturas++;
    return real.call(this, f, ...r);
  };
  try {
    panel.render();
  } finally {
    fs.readFileSync = real;
  }
  chequear(
    `conversations.json se lee pocas veces por render (fueron ${lecturas})`,
    lecturas <= 3,
    "si esto sube, la tabla está releyendo el disco en vez de usar `convs`"
  );
}

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}

console.log(`\n${"=".repeat(60)}`);
console.log(`${ok} pasaron · ${mal} fallaron`);
console.log("=".repeat(60));
process.exit(mal ? 1 : 0);
