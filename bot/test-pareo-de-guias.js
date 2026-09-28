/**
 * EL PAREO DE GUÍAS: por qué una guía no cruza, y cómo mandarla igual.
 *
 * 🔴 DE DÓNDE SALE (28-sep). El dueño subió el PDF con 24 guías. 23 salieron y
 * UNA quedó en rojo: "no corresponde a ningún pedido (mejor coincidencia 45 de
 * 50 necesarios)", la de Henry Mendoza. Él preguntó dos cosas, las dos justas:
 *   1. por qué pasa y cómo evitar que vuelva a pasar
 *   2. si no hay forma de mandarla individual, porque en el chat no lo deja
 *
 * Reproducido: 45 puntos es EXACTAMENTE "el nombre completo y nada más". Y se
 * llegaba a ese número por dos defectos que se arreglan acá.
 *
 * ⚠️ Esta batería NO toca PDF a propósito: prueba las funciones de pareo
 * directo, así corre en cualquier parte y es rápida. Lo del PDF está en
 * test-guias.js.
 *
 *   node test-pareo-de-guias.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const vm = require("vm");

const DIR = "/tmp/prueba-pareo-guias";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;

const g = require("./src/guias");

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

const pedidoDe = (extra) => ({
  id: "p-henry",
  nombre: "Henry Mendoza",
  celular: "3155551234",
  telefono_chat: "573155551234",
  ciudad: "Piendamó",
  direccion: "",
  total: 82000,
  ...extra,
});

/** Una etiqueta como la imprime Interrapidísimo. */
const etiqueta = (lineas) => g.extraerCampos(lineas, { telefonoRemitente: "3046630407" });

// ===========================================================================
console.log("\n── 1. La ciudad se compara por TODAS sus palabras ──");
// 🔴 EL DEFECTO: se usaba solo la PRIMERA palabra de la ciudad, y solo si tenía
// 4 letras o más. En "La Playa" la primera palabra es "LA": 2 letras. La ciudad
// no se comparaba nunca y se perdían sus 10 puntos, que son justo los que
// separan 45 de 55.
// ===========================================================================

// Municipios colombianos de verdad que empiezan con artículo o palabra corta.
const MUNICIPIOS = [
  "La Playa", "El Cerrito", "La Dorada", "Los Patios",
  "La Unión", "El Bagre", "San Gil", "La Virginia", "La Ceja", "El Peñol",
];

for (const municipio of MUNICIPIOS) {
  const campos = etiqueta([
    "INTER RAPIDISIMO",
    "GUIA No. 240062298845",
    "DESTINATARIO: HENRY MENDOZA",
    "CIUDAD: " + municipio.toUpperCase(),
  ]);
  const p = g.puntuar(campos, pedidoDe({ ciudad: municipio }));
  chequear(
    `${municipio}: la ciudad suma (antes daba 45 y no se enviaba)`,
    p.senales.includes("ciudad") && p.puntos >= g.MINIMO,
    `dio ${p.puntos} pts · ${JSON.stringify(p.senales)}`
  );
}

chequear(
  "🔑 palabrasCiudad saca la palabra útil, no el artículo",
  JSON.stringify(g.palabrasCiudad("La Playa")) === '["PLAYA"]' &&
    JSON.stringify(g.palabrasCiudad("Los Patios")) === '["PATIOS"]',
  JSON.stringify(g.palabrasCiudad("La Playa")) + " / " + JSON.stringify(g.palabrasCiudad("Los Patios"))
);
chequear(
  "y separa la ciudad del departamento cuando vienen juntos",
  g.palabrasCiudad("Piendamó, Cauca").join(",") === "PIENDAMO,CAUCA",
  JSON.stringify(g.palabrasCiudad("Piendamó, Cauca"))
);

// ⛔ Una ciudad que NO está en la etiqueta no puede sumar. Si sumara, la señal
// no valdría nada.
{
  const campos = etiqueta(["INTER RAPIDISIMO", "GUIA No. 240062298845", "CIUDAD: MEDELLIN ANTIOQUIA"]);
  const p = g.puntuar(campos, pedidoDe({ ciudad: "La Playa", nombre: "Zzz Yyy" }));
  chequear("⛔ una ciudad que no aparece en la etiqueta NO suma", !p.senales.includes("ciudad"), JSON.stringify(p.senales));
}

// ===========================================================================
console.log("\n── 2. El teléfono, que vale 50 puntos, en los formatos reales ──");
// 🔴 EL SEGUNDO DEFECTO: solo se buscaba /\b(3\d{9})\b/ sobre un texto que
// CONSERVA espacios y guiones. Tres formatos que las transportadoras imprimen
// todo el tiempo se perdían — y un teléfono solo alcanza el mínimo de 50.
// ===========================================================================

const FORMATOS = [
  ["pegado", "3155551234"],
  ["con espacios", "315 555 1234"],
  ["con guiones", "315-555-1234"],
  ["con el 57 adelante", "573155551234"],
  ["con +57 y espacios", "+57 315 555 1234"],
  ["cortado 4-6", "3155 551234"],
  ["cortado 3-7", "315 5551234"],
];

for (const [como, impreso] of FORMATOS) {
  const campos = etiqueta([
    "INTER RAPIDISIMO",
    "GUIA No. 240062298845",
    "DESTINATARIO: HENRY MENDOZA",
    "TELEFONO: " + impreso,
  ]);
  chequear(
    `lee el celular ${como} (${impreso})`,
    campos.telefonos.includes("3155551234"),
    JSON.stringify(campos.telefonos)
  );
}

// ⛔ Lo que NO es un celular no debe entrar: si entrara basura, podría coincidir
// por casualidad con el teléfono de otro cliente y mandarle la guía equivocada.
{
  const campos = etiqueta([
    "INTER RAPIDISIMO",
    "GUIA No. 240062298845",
    "VALOR A RECAUDAR: $385.000",
    "TELEFONO FIJO: 6028834455",
    "CALLE 35 07 CENTRO",
    "KRA 171721 BARRIO VILLAMAR",
  ]);
  chequear(
    "⛔ no toma por celular el valor a recaudar, un fijo ni los números de la dirección",
    campos.telefonos.length === 0,
    JSON.stringify(campos.telefonos)
  );
}
{
  // El del remitente se sigue descartando.
  const campos = etiqueta([
    "REMITENTE BIKERPRO TEL 304 663 0407",
    "DESTINATARIO: HENRY MENDOZA TEL 315 555 1234",
  ]);
  chequear(
    "🔑 sigue descartando el teléfono del remitente, también con espacios",
    campos.telefonos.includes("3155551234") && !campos.telefonos.includes("3046630407"),
    JSON.stringify(campos.telefonos)
  );
}

// ===========================================================================
console.log("\n── 3. El candado de 50 puntos NO se debilitó ──");
// Esto es lo que hay que cuidar: el mínimo existe porque la etiqueta lleva
// dirección y teléfono impresos. Mandársela al cliente equivocado le filtra
// datos personales a un desconocido, y no se puede deshacer.
// ===========================================================================

{
  // Nombre completo y nada más: 45. Sigue sin enviarse solo.
  const campos = etiqueta([
    "INTER RAPIDISIMO",
    "GUIA No. 240062298845",
    "DESTINATARIO: HENRY MENDOZA",
    "TELEFONO FIJO: 6028834455",
    "CIUDAD: MEDELLIN",
  ]);
  const pedido = pedidoDe({});
  const p = g.puntuar(campos, pedido);
  const r = g.emparejar(campos, [pedido]);
  chequear("el nombre solo sigue dando 45", p.puntos === 45, `dio ${p.puntos}`);
  chequear("⛔ y con 45 NO se envía solo", r.pedido === null && r.enviar !== true);
  chequear("la certeza queda en 45", r.certeza === 45, String(r.certeza));
}
{
  // El empate entre dos personas distintas sigue bloqueado.
  const a = { id: "a", nombre: "Carlos Perez", celular: "3001112222", telefono_chat: "573001112222", ciudad: "Cali", direccion: "CALLE 80 12" };
  const b = { id: "b", nombre: "Carlos Perez", celular: "3009998888", telefono_chat: "573009998888", ciudad: "Cali", direccion: "CALLE 80 12" };
  const campos = etiqueta(["DESTINATARIO: CARLOS PEREZ", "CIUDAD: CALI", "DIRECCION: CALLE 80 12"]);
  const r = g.emparejar(campos, [a, b]);
  chequear("⛔ el empate entre dos personas distintas sigue bloqueado", r.pedido === null, r.motivo);
  chequear("  y el motivo sigue explicando que es por datos personales", /datos personales/.test(r.motivo || ""), r.motivo);
}

// ===========================================================================
console.log("\n── 4. El motivo dice contra QUIÉN y QUÉ faltó ──");
// Antes decía "mejor coincidencia 45 de 50 necesarios" y nada más. Con eso no se
// puede hacer nada: no se sabe de quién se sospecha ni qué dato arreglar.
// ===========================================================================

{
  const campos = etiqueta([
    "INTER RAPIDISIMO",
    "GUIA No. 240062298845",
    "DESTINATARIO: HENRY MENDOZA",
    "TELEFONO FIJO: 6028834455",
    "CIUDAD: MEDELLIN",
  ]);
  const r = g.emparejar(campos, [pedidoDe({})]);
  chequear("nombra al cliente más parecido", /Henry Mendoza/.test(r.motivo), r.motivo);
  chequear("dice el puntaje y el mínimo", /45 de 50/.test(r.motivo), r.motivo);
  chequear(
    "🔑 dice que no se pudo leer el celular en la etiqueta",
    /no se pudo leer ningún celular/.test(r.motivo),
    r.motivo
  );
  chequear(
    "🔑 dice que el pedido no tiene dirección (normal si va a oficina)",
    /no tiene dirección guardada/.test(r.motivo),
    r.motivo
  );
  chequear("🔑 dice qué ciudad esperaba", /Piendamó/.test(r.motivo), r.motivo);
  chequear("y le dice al dueño que puede asignarla", /asignala abajo/i.test(r.motivo), r.motivo);
}
{
  // Cuando el teléfono de la etiqueta SÍ se leyó pero es otro, lo dice.
  const campos = etiqueta(["DESTINATARIO: HENRY MENDOZA", "TEL: 320 111 2222", "CIUDAD: MEDELLIN"]);
  const r = g.emparejar(campos, [pedidoDe({})]);
  chequear(
    "🔑 si leyó un teléfono pero es otro, muestra los dos",
    /3201112222/.test(r.motivo) && /3155551234/.test(r.motivo),
    r.motivo
  );
}
{
  // ⛔ Con 0 puntos NO se nombra a nadie. "El más parecido es Jorge" cuando Jorge
  // no coincide en NADA manda al dueño a mirar un pedido que no tiene relación
  // con la etiqueta. Es una invitación a asignarla mal.
  const campos = etiqueta(["GUIA No. 240061999999", "DESTINATARIO: MARIA RAMIREZ", "CIUDAD: MEDELLIN", "TELEFONO: 3151112222"]);
  const r = g.emparejar(campos, [pedidoDe({})]);
  chequear(
    "⛔ con 0 puntos NO nombra a un candidato inventado",
    !/Henry Mendoza/.test(r.motivo) && /no se parece a ningún pedido/.test(r.motivo),
    r.motivo
  );
  chequear(
    "  y tampoco ofrece candidatos con estrella",
    r.mejores.length === 0,
    JSON.stringify(r.mejores)
  );
  chequear(
    "  pero SÍ deja asignarla a mano igual",
    /asignala abajo/i.test(r.motivo),
    r.motivo
  );
}

// ===========================================================================
console.log("\n── 5. Los candidatos para asignar a mano ──");
// ===========================================================================

{
  const henry = pedidoDe({});
  const otro = { id: "p2", nombre: "Iris Gonzalez", celular: "3013779312", telefono_chat: "573013779312", ciudad: "Cali", direccion: "CRA 2 5639" };
  const campos = etiqueta(["DESTINATARIO: HENRY MENDOZA", "TELEFONO FIJO: 6028834455", "CIUDAD: MEDELLIN"]);
  const r = g.emparejar(campos, [henry, otro]);
  chequear("devuelve los más parecidos para poder elegir", Array.isArray(r.mejores) && r.mejores.length >= 1, JSON.stringify(r.mejores));
  chequear("🔑 el primero es el correcto, con su puntaje", r.mejores[0].pedidoId === "p-henry" && r.mejores[0].puntos === 45, JSON.stringify(r.mejores));
  chequear("y trae las señales para que se vea por qué se sugiere", r.mejores[0].senales.includes("nombre"), JSON.stringify(r.mejores[0]));
}

// ===========================================================================
console.log("\n── 6. El botón de asignar en la pantalla ──");
// Se ejecuta el JavaScript del panel con un navegador de mentira, igual que
// test-javascript-de-los-paneles.js: el JS del celular no lo prueba nada más.
// ===========================================================================

const panelGuias = require("./src/panel-guias");
const html = panelGuias.render();

chequear("la pantalla trae el cajón de asignar", /btnAsignar/.test(html) && /selPedido/.test(html));
chequear("y el estilo para que el select se vea en el celular", /\.asignar select/.test(html));
chequear(
  "🔑 el select usa 16px, si no iOS agranda la página al tocarlo",
  /\.asignar select\{[^}]*font-size:16px/.test(html),
  (html.match(/\.asignar select\{[^}]*\}/) || [""])[0]
);

{
  // Se arma el DOM falso y se toca el botón de asignar.
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const llamadas = [];
  const listeners = {};

  function nodo(id, extra = {}) {
    const n = {
      id, value: "", disabled: false, className: "", textContent: "", innerHTML: "",
      style: {}, files: [], options: [], selectedIndex: 0,
      addEventListener(ev, fn) { listeners[id + ":" + ev] = fn; },
      getAttribute: (a) => (extra.attrs || {})[a] || null,
      appendChild() {}, querySelector: () => null, querySelectorAll: () => [],
      closest: () => null,
      ...extra,
    };
    return n;
  }

  const selPedido = nodo("sel", {
    value: "p-henry",
    options: [{ textContent: "— elegí —" }, { textContent: "★ Henry Mendoza · Piendamó · ....1234 · $82.000  (45 pts)" }],
    selectedIndex: 1,
  });
  const msgAsignar = nodo("msg");
  const btnAsignar = nodo("btnAsignar", { attrs: { "data-pagina": "21" } });
  const cajaAsignar = nodo("caja", {
    querySelector: (sel) => (sel === ".asignarMsg" ? msgAsignar : sel === ".selPedido" ? selPedido : null),
  });
  btnAsignar.closest = (sel) => (sel === ".asignar" ? cajaAsignar : null);

  const nodos = {};
  for (const id of ["archivo", "btnRevisar", "btnEnviar", "estadoRevisar", "estadoEnviar", "aviso", "zonaPareo", "zonaReporte", "tablaPareo"]) {
    nodos[id] = nodo(id);
  }

  const contexto = {
    document: {
      getElementById: (id) => nodos[id] || nodo(id),
      querySelector: () => nodo("tbody"),
      querySelectorAll: () => [],
      createElement: () => nodo("tr"),
    },
    console: { log() {}, error() {} },
    JSON, Number, String, Object, Error, RegExp, Array,
    encodeURIComponent,
    confirm: (texto) => { llamadas.push({ confirm: texto }); return true; },
    fetch: (url, opciones) => {
      llamadas.push({ url, cuerpo: opciones && opciones.body ? JSON.parse(opciones.body) : null });
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true, nombre: "Henry Mendoza", telefono: "573155551234" }) });
    },
  };
  vm.createContext(contexto);
  vm.runInContext(script, contexto);

  const alClic = listeners["tablaPareo:click"];
  chequear("la tabla tiene el oyente de clic para asignar", typeof alClic === "function");

  contexto.plan = { id: "plan-1" };
  let exploto = null;
  try {
    alClic({ target: { closest: (sel) => (sel === ".btnAsignar" ? btnAsignar : null) } });
  } catch (e) {
    exploto = e;
  }
  chequear("tocar «Es este cliente» no revienta", !exploto, exploto && `${exploto.constructor.name}: ${exploto.message}`);

  const confirmacion = llamadas.find((l) => l.confirm);
  chequear(
    "🔒 pide confirmación con el NOMBRE adentro antes de mandar",
    Boolean(confirmacion) && /Henry Mendoza/.test(confirmacion.confirm),
    JSON.stringify(confirmacion)
  );

  const envio = llamadas.find((l) => l.url);
  chequear(
    "🔑 llama a /guias/asignar con la hoja y el pedido elegido",
    Boolean(envio) && /\/guias\/asignar/.test(envio.url) && envio.cuerpo.pagina === 21 && envio.cuerpo.pedidoId === "p-henry",
    JSON.stringify(envio)
  );
}

{
  // Sin elegir cliente, avisa y no manda nada.
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const llamadas = [];
  const listeners = {};
  const selVacio = { value: "", options: [], selectedIndex: -1 };
  const msg = { className: "", textContent: "" };
  const caja = { querySelector: (s) => (s === ".asignarMsg" ? msg : selVacio) };
  const btn = { disabled: false, getAttribute: () => "21", closest: () => caja };
  const nodoSimple = (id) => ({
    id, value: "", disabled: false, className: "", textContent: "", innerHTML: "", style: {}, files: [],
    addEventListener(ev, fn) { listeners[id + ":" + ev] = fn; },
    appendChild() {}, querySelector: () => null, querySelectorAll: () => [],
  });
  const nodos = {};
  for (const id of ["archivo", "btnRevisar", "btnEnviar", "estadoRevisar", "estadoEnviar", "aviso", "zonaPareo", "zonaReporte", "tablaPareo"]) {
    nodos[id] = nodoSimple(id);
  }
  const contexto = {
    document: { getElementById: (id) => nodos[id] || nodoSimple(id), querySelector: () => nodoSimple("t"), querySelectorAll: () => [], createElement: () => nodoSimple("tr") },
    console: { log() {}, error() {} },
    JSON, Number, String, Object, Error, RegExp, Array, encodeURIComponent,
    confirm: () => true,
    fetch: (url) => { llamadas.push(url); return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) }); },
  };
  vm.createContext(contexto);
  vm.runInContext(script, contexto);
  contexto.plan = { id: "plan-1" };
  listeners["tablaPareo:click"]({ target: { closest: (s) => (s === ".btnAsignar" ? btn : null) } });
  chequear(
    "⛔ sin elegir cliente avisa y NO llama al servidor",
    llamadas.length === 0 && /Elegí primero/i.test(msg.textContent),
    JSON.stringify(msg.textContent)
  );
}

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
