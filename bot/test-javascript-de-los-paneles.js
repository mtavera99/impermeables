/**
 * EL JAVASCRIPT QUE CORRE EN EL CELULAR DEL DUEÑO.
 *
 * 🔴 POR QUÉ EXISTE ESTA BATERÍA, Y ES LA MÁS BARATA DE TODAS: las otras 36
 * prueban el servidor. NINGUNA ejecutaba el JavaScript que va dentro del HTML de
 * los paneles. El 25-sep renombré una función y dejé la llamada con el nombre
 * viejo en el botón "Enviar" de la pantalla de novedades.
 *
 * Consecuencia: durante 3 días ese botón NO envió un solo mensaje. El navegador
 * reventaba antes de llamar al servidor, la pantalla se quedaba clavada en
 * "Enviando 4 mensaje(s)..." y no había ninguna señal de error. Yo leí esa
 * pantalla como "se enviaron 4" y le dije al dueño que los mensajes habían
 * salido. No había salido ninguno. Él lo reportó tres veces antes de que lo
 * encontrara — y mientras tanto, clientes con el paquete en la oficina no
 * recibieron el aviso. Una devolución cuesta $17.384.
 *
 * Lo que se prueba acá:
 *   1. ningún panel llama a una función que no existe
 *   2. el botón Enviar de novedades de verdad llama al servidor
 *   3. y le manda los datos de oficina/plazo que el dueño escribió en la fila
 *   4. si algo revienta, se VE en pantalla y el botón revive
 *
 *   node test-javascript-de-los-paneles.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = "/tmp/prueba-js-paneles";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;

const revisor = require("./src/revisar-js-del-navegador");

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

// ===========================================================================
console.log("\n── 1. Ningún panel llama a una función que no existe ──");
// Se revisa el CÓDIGO FUENTE, no el HTML armado: así entran también los
// <script> que viven dentro de un if y solo aparecen con ciertos datos, y no
// hace falta tener instaladas las dependencias de cada módulo.
// ===========================================================================

const paneles = fs
  .readdirSync(path.join(__dirname, "src"))
  .filter((n) => /^panel.*\.js$/.test(n))
  .sort();

chequear("encuentra los paneles para revisar", paneles.length >= 5, `encontró ${paneles.length}`);

let scriptsRevisados = 0;
for (const archivo of paneles) {
  const r = revisor.revisarArchivo(path.join(__dirname, "src", archivo));
  scriptsRevisados += r.scripts;
  chequear(
    `${archivo}: ${r.scripts} script(s), ninguna llamada a una función inexistente`,
    r.problemas.length === 0,
    r.problemas.map((p) => `${p.nombre}()  ->  ${p.contexto}`).join("\n     ")
  );
}

// 🔑 Si esto da 0, la batería estaría "pasando" sin mirar nada. Ya me pasó al
// escribirla: llamaba a render({}) y dos paneles devolvían cero scripts.
chequear(
  "🔑 y de verdad revisó código (si fuera 0, esta batería no probaría nada)",
  scriptsRevisados >= 5,
  `revisó ${scriptsRevisados} bloques de script`
);

// ===========================================================================
console.log("\n── 2. El revisor detecta el error de verdad (si no, no sirve) ──");
// Una revisión que nunca encuentra nada da una falsa tranquilidad peor que no
// tenerla. Se le da el error exacto del 25-sep y tiene que encontrarlo.
// ===========================================================================

const conError = `<script>
  function datosCompletados() { return {}; }
  document.getElementById("x").addEventListener("click", function () {
    fetch("/algo", { body: JSON.stringify({ datos: juntarDatos() }) });
  });
</script>`;
const hallados = revisor.llamadasSinDefinir(conError);
chequear(
  "encuentra la llamada a una función que no existe",
  hallados.length === 1 && hallados[0].nombre === "juntarDatos",
  JSON.stringify(hallados)
);

const sinError = `<script>
  function datosCompletados() { return {}; }
  var t = fetch("/algo", { body: JSON.stringify({ datos: datosCompletados() }) });
  setTimeout(function () { console.log(encodeURIComponent("a")); }, 10);
</script>`;
chequear(
  "y NO se queja de lo que sí está declarado ni de lo del navegador",
  revisor.llamadasSinDefinir(sinError).length === 0,
  JSON.stringify(revisor.llamadasSinDefinir(sinError))
);

// Lo que va dentro de una cadena no es una llamada: los paneles arman HTML con
// texto y contarlo daría avisos falsos a montones.
const enCadena = `<script>
  var fila = "<div onclick=\\"noExiste()\\">hola</div>";
  var otra = '<span>tampocoExiste()</span>';
</script>`;
chequear(
  "no confunde el HTML que se arma con texto con código de verdad",
  revisor.llamadasSinDefinir(enCadena).length === 0,
  JSON.stringify(revisor.llamadasSinDefinir(enCadena))
);

// ===========================================================================
console.log("\n── 3. El botón Enviar de novedades de verdad llama al servidor ──");
// Esto es la reproducción del fallo: se ejecuta el script del panel con un DOM
// de mentira y se toca el botón, igual que lo hace el dueño en el celular.
// ===========================================================================

const panelNovedades = require("./src/panel-novedades");

/** Arma un DOM mínimo y ejecuta el script del panel. Devuelve el contexto. */
function abrirPanelDeNovedades() {
  const html = panelNovedades.render({ hayPlantilla: true });
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

  const listeners = {};
  const llamadas = [];

  function nodo(id, extra = {}) {
    return {
      id,
      value: "",
      checked: false,
      disabled: false,
      className: "",
      textContent: "",
      innerHTML: "",
      style: {},
      files: [],
      addEventListener(ev, fn) {
        listeners[id + ":" + ev] = fn;
      },
      getAttribute(a) {
        return (extra.attrs || {})[a] || null;
      },
      appendChild() {},
      querySelectorAll: () => [],
      ...extra,
    };
  }

  const nodos = {};
  for (const id of ["res", "pegado", "btnRevisar", "btnEnviar", "zona", "tabla", "archivo", "archivoMsg"]) {
    nodos[id] = nodo(id);
  }

  const checkbox = nodo("chk", { checked: true, attrs: { "data-i": "0" } });
  const campoOficina = nodo("i1", {
    value: "Oficina Interrapidisimo Dagua",
    attrs: { "data-guia": "240062099941", "data-campo": "oficina" },
  });
  const campoPlazo = nodo("i2", {
    value: "el 3 de octubre",
    attrs: { "data-guia": "240062099941", "data-campo": "plazo" },
  });

  const documentoFalso = {
    getElementById: (id) => nodos[id] || nodo(id),
    querySelector: () => nodo("tbody"),
    querySelectorAll: (sel) => {
      if (sel === "input.dato") return [campoOficina, campoPlazo];
      if (sel.indexOf("type=checkbox") !== -1) return [checkbox];
      return [];
    },
    createElement: () => nodo("tr"),
  };

  const contexto = {
    document: documentoFalso,
    console: { log() {}, error() {} },
    JSON,
    Number,
    Object,
    Error,
    encodeURIComponent,
    fetch: (url, opciones) => {
      llamadas.push({ url, cuerpo: opciones && opciones.body ? JSON.parse(opciones.body) : null });
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ ok: true, enviados: 1, intentados: 1, fallaron: 0 }),
      });
    },
  };
  vm.createContext(contexto);
  vm.runInContext(script, contexto);

  return { contexto, listeners, llamadas, nodos, checkbox };
}

{
  const p = abrirPanelDeNovedades();
  // El dueño ya le dio a Revisar y tiene el plan en pantalla.
  p.contexto.PLAN = { id: "plan-1", filas: [{ guia: "240062099941", enviar: true }] };

  let exploto = null;
  try {
    p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);
  } catch (e) {
    exploto = e;
  }

  chequear("tocar Enviar no revienta", !exploto, exploto && `${exploto.constructor.name}: ${exploto.message}`);
  chequear(
    "🔑 y de verdad llama a /novedades/enviar (esto es lo que estuvo roto 3 días)",
    p.llamadas.length === 1 && p.llamadas[0].url === "/novedades/enviar",
    `llamadas: ${JSON.stringify(p.llamadas.map((l) => l.url))}`
  );

  const cuerpo = p.llamadas[0] && p.llamadas[0].cuerpo;
  chequear("manda el id del plan y la fila marcada", Boolean(cuerpo) && cuerpo.id === "plan-1" && cuerpo.indices[0] === 0, JSON.stringify(cuerpo));
  chequear(
    "🔑 y manda la oficina y la fecha que el dueño escribió en la fila",
    Boolean(cuerpo) &&
      cuerpo.datos &&
      cuerpo.datos["240062099941"] &&
      cuerpo.datos["240062099941"].oficina === "Oficina Interrapidisimo Dagua" &&
      cuerpo.datos["240062099941"].plazo === "el 3 de octubre",
    JSON.stringify(cuerpo && cuerpo.datos)
  );
}

// ===========================================================================
console.log("\n── 4. Un fallo se VE en pantalla, no deja el botón muerto ──");
// Esa fue la parte cara: el error existía desde el 25-sep pero no se veía. Si
// mañana se rompe otra cosa, tiene que aparecer el primer día.
// ===========================================================================

{
  const p = abrirPanelDeNovedades();
  // Sin haber revisado: antes esto hacía `return` calladito y el dueño no sabía
  // por qué no pasaba nada.
  p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);
  chequear(
    "si no revisó primero, se lo dice en vez de quedarse mudo",
    /Revisar/i.test(p.nodos.res.textContent),
    JSON.stringify(p.nodos.res.textContent)
  );
  chequear("y no llama al servidor", p.llamadas.length === 0);
}

{
  const p = abrirPanelDeNovedades();
  // Se rompe el fetch a propósito, que es lo más parecido a lo que pasó.
  p.contexto.PLAN = { id: "plan-1", filas: [] };
  p.contexto.fetch = () => {
    throw new Error("prueba: algo se rompió");
  };
  let exploto = null;
  try {
    p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);
  } catch (e) {
    exploto = e;
  }
  chequear("el error no se escapa del manejador", !exploto, exploto && exploto.message);
  chequear(
    "🔑 el error sale en pantalla, con el texto para reportarlo",
    /se rompió/i.test(p.nodos.res.textContent) && /No se envió nada/i.test(p.nodos.res.textContent),
    JSON.stringify(p.nodos.res.textContent)
  );
  chequear("🔑 y el botón vuelve a funcionar (antes quedaba muerto)", p.nodos.btnEnviar.disabled === false);
}

// ===========================================================================
console.log("\n── 4b. Una sola fecha límite para todas las de oficina ──");
// El Excel de 99 Envíos NO trae la fecha límite: solo cuándo se registró la
// novedad. Ese dato lo pone el dueño, y la transportadora da el mismo plazo para
// todas las del día. Escribirlo 7 veces desde el celular es lo que hace que la
// gestión se abandone a la mitad.
// ===========================================================================

/** Como abrirPanelDeNovedades, pero con varias filas de oficina sin fecha. */
function panelConVariasSinFecha(plazoGeneral) {
  const p = abrirPanelDeNovedades();
  const guias = ["240062099941", "240062025925", "240062099927"];

  const campos = [];
  for (const g of guias) {
    campos.push({
      value: "Oficina Interrapidisimo " + g.slice(-3),
      getAttribute: (a) => ({ "data-guia": g, "data-campo": "oficina" })[a] || null,
    });
    campos.push({
      value: "", // 👈 vacío: es justo lo que el archivo no trae
      getAttribute: (a) => ({ "data-guia": g, "data-campo": "plazo" })[a] || null,
    });
  }

  p.contexto.document.querySelectorAll = (sel) => {
    if (sel === "input.dato") return campos;
    if (sel.indexOf("type=checkbox") !== -1) return [p.checkbox];
    return [];
  };
  p.nodos.plazoParaTodas = {
    id: "plazoParaTodas",
    value: plazoGeneral,
    style: {},
    addEventListener() {},
    getAttribute: () => null,
  };
  const anterior = p.contexto.document.getElementById;
  p.contexto.document.getElementById = (id) =>
    id === "plazoParaTodas" ? p.nodos.plazoParaTodas : anterior(id);

  return { p, guias, campos };
}

{
  const { p, guias } = panelConVariasSinFecha("el 3 de octubre");
  p.contexto.PLAN = { id: "plan-1", filas: [{ guia: guias[0], enviar: true }] };
  p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);

  const datos = p.llamadas[0] && p.llamadas[0].cuerpo.datos;
  chequear(
    "🔑 la fecha escrita una vez llega para las TRES novedades de oficina",
    Boolean(datos) && guias.every((g) => datos[g] && datos[g].plazo === "el 3 de octubre"),
    JSON.stringify(datos)
  );
  chequear(
    "y cada una conserva SU oficina, que no es la misma",
    Boolean(datos) && datos[guias[0]].oficina !== datos[guias[1]].oficina,
    JSON.stringify(datos)
  );
}

{
  // La fecha de una fila manda sobre la general: si escribió una distinta abajo
  // es porque esa novedad tiene otro plazo.
  const { p, guias, campos } = panelConVariasSinFecha("el 3 de octubre");
  campos[3].value = "el 10 de octubre"; // el plazo de la segunda guía
  p.contexto.PLAN = { id: "plan-1", filas: [{ guia: guias[0], enviar: true }] };
  p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);

  const datos = p.llamadas[0].cuerpo.datos;
  chequear(
    "🔑 la fecha propia de una fila le gana a la general",
    datos[guias[1]].plazo === "el 10 de octubre" && datos[guias[0]].plazo === "el 3 de octubre",
    JSON.stringify(datos)
  );
}

{
  // ⛔ Sin fecha general, no se inventa ninguna. Ese es el error del 14-sep:
  // prometerle a una clienta una oficina y un plazo que nadie confirmó.
  const { p, guias } = panelConVariasSinFecha("");
  p.contexto.PLAN = { id: "plan-1", filas: [{ guia: guias[0], enviar: true }] };
  p.listeners["btnEnviar:click"].call(p.nodos.btnEnviar);
  const datos = p.llamadas[0].cuerpo.datos;
  chequear(
    "⛔ si no escribió ninguna fecha, no se inventa una",
    guias.every((g) => !datos[g].plazo),
    JSON.stringify(datos)
  );
}

{
  // El botón avisa en vez de revisar de gusto.
  const { p } = panelConVariasSinFecha("   ");
  p.listeners["btnAplicarPlazo:click"].call(p.nodos.btnEnviar);
  chequear(
    "el botón de aplicar avisa si el campo está vacío y no llama al servidor",
    p.llamadas.length === 0 && /Escribí primero/i.test(p.nodos.res.textContent),
    JSON.stringify(p.nodos.res.textContent)
  );
}

{
  const { p } = panelConVariasSinFecha("el 3 de octubre");
  p.nodos.pegado.value = "240062099941  Reclame en oficina";
  p.listeners["btnAplicarPlazo:click"].call(p.nodos.btnEnviar);
  chequear(
    "🔑 y con la fecha puesta vuelve a revisar, que es lo que destraba las filas",
    p.llamadas.length === 1 && p.llamadas[0].url === "/novedades/revisar",
    JSON.stringify(p.llamadas.map((l) => l.url))
  );
  chequear(
    "  mandándole la fecha al servidor",
    p.llamadas[0].cuerpo.datos["240062099941"].plazo === "el 3 de octubre",
    JSON.stringify(p.llamadas[0].cuerpo.datos)
  );
}

// ===========================================================================
console.log("\n── 5. El botón Revisar sigue andando ──");
// ===========================================================================

{
  const p = abrirPanelDeNovedades();
  p.nodos.pegado.value = "240062099941  Reclame en oficina";
  let exploto = null;
  try {
    p.listeners["btnRevisar:click"].call(p.nodos.btnRevisar);
  } catch (e) {
    exploto = e;
  }
  chequear("tocar Revisar no revienta", !exploto, exploto && exploto.message);
  chequear(
    "llama a /novedades/revisar",
    p.llamadas.length === 1 && p.llamadas[0].url === "/novedades/revisar",
    JSON.stringify(p.llamadas.map((l) => l.url))
  );
  chequear(
    "y le manda lo que el dueño ya había completado",
    Boolean(p.llamadas[0]) && Boolean(p.llamadas[0].cuerpo.datos["240062099941"]),
    JSON.stringify(p.llamadas[0] && p.llamadas[0].cuerpo.datos)
  );
}

{
  const p = abrirPanelDeNovedades();
  p.nodos.pegado.value = "";
  p.listeners["btnRevisar:click"].call(p.nodos.btnRevisar);
  chequear(
    "con el cuadro vacío avisa y no llama al servidor",
    p.llamadas.length === 0 && /Pegá/i.test(p.nodos.res.textContent),
    JSON.stringify(p.nodos.res.textContent)
  );
}

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
