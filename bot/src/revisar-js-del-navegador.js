// ============================================================================
// 🔍 REVISOR DEL JAVASCRIPT QUE CORRE EN EL CELULAR
//
// QUÉ RESUELVE, Y POR QUÉ EXISTE: las 36 baterías prueban el servidor. NINGUNA
// ejecuta el JavaScript que va dentro del HTML de los paneles. Así que una
// llamada a una función que no existe no la ve nada: el servidor arranca bien,
// todas las pruebas pasan, y el botón está muerto.
//
// 🔴 PASÓ DE VERDAD, Y COSTÓ 3 DÍAS: el 25-sep renombré una función y dejé una
// llamada con el nombre viejo en el botón "Enviar" de novedades. Desde ese día
// el botón NUNCA envió un mensaje: la pantalla se quedaba en "Enviando 4
// mensaje(s)..." y no llamaba al servidor. Yo lo leí como "los mensajes
// salieron". El dueño lo reportó tres veces ("sigue saliendo igual") antes de
// que lo encontrara.
//
// Esto no reemplaza un navegador. Encuentra UNA clase de error, que es la que
// se nos escapó: llamar a algo que no está declarado en ninguna parte.
// ============================================================================

// Lo que el navegador ya trae. Si falta algo acá, el revisor lo reporta como
// desconocido; se agrega y listo. Preferimos un falso aviso que un botón muerto.
const DEL_NAVEGADOR = new Set([
  // globales del lenguaje
  "Array", "Boolean", "Date", "Error", "Function", "JSON", "Map", "Math", "Number",
  "Object", "Promise", "RegExp", "Set", "String", "Symbol", "BigInt", "Proxy",
  "parseInt", "parseFloat", "isNaN", "isFinite", "encodeURIComponent",
  "decodeURIComponent", "encodeURI", "decodeURI", "escape", "unescape", "eval",
  // del navegador
  "alert", "confirm", "prompt", "fetch", "setTimeout", "setInterval",
  "clearTimeout", "clearInterval", "requestAnimationFrame", "console",
  "document", "window", "location", "navigator", "localStorage",
  "sessionStorage", "history", "FormData", "FileReader", "Blob", "URL",
  "URLSearchParams", "XMLHttpRequest", "EventSource", "WebSocket",
  "AbortController", "TextDecoder", "TextEncoder", "atob", "btoa",
  "structuredClone", "queueMicrotask", "reportError", "getComputedStyle",
  "matchMedia", "scrollTo", "open", "close", "print", "focus", "blur",
  // palabras clave que la lectura por texto ve como si fueran llamadas
  "if", "for", "while", "switch", "catch", "return", "typeof", "new", "delete",
  "function", "do", "else", "in", "of", "void", "instanceof", "throw", "case",
  "with", "super", "this", "await", "yield", "async",
]);

/** Saca el contenido de cada <script> sin src del HTML. */
function scriptsDe(html) {
  const encontrados = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(String(html || "")))) encontrados.push(m[1]);
  return encontrados;
}

/**
 * Quita las interpolaciones `${...}` del servidor.
 *
 * POR QUÉ: se revisa el CÓDIGO FUENTE del panel, no el HTML ya armado. Eso es a
 * propósito — así se revisan también los <script> que viven dentro de un `if`
 * y solo aparecen con ciertos datos (el de vender a mano, por ejemplo), y no
 * hace falta acertarle a los parámetros de render() ni tener instaladas las
 * dependencias del módulo. Lo que está dentro de `${}` lo resuelve el servidor
 * antes de que el navegador vea nada, así que para esta revisión no es código.
 */
function sinInterpolaciones(js) {
  let fuera = "";
  const s = String(js || "");
  let i = 0;
  while (i < s.length) {
    if (s[i] === "$" && s[i + 1] === "{") {
      let nivel = 1;
      i += 2;
      while (i < s.length && nivel > 0) {
        if (s[i] === "{") nivel++;
        else if (s[i] === "}") nivel--;
        i++;
      }
      fuera += "null"; // deja algo válido donde iba el valor
      continue;
    }
    fuera += s[i];
    i++;
  }
  return fuera;
}

/**
 * Borra cadenas, plantillas, expresiones regulares y comentarios.
 *
 * Hace falta: dentro de una cadena puede haber `algo(` que no es una llamada
 * —el panel arma HTML con texto—, y contarlo daría avisos falsos a montones.
 */
function soloCodigo(js) {
  let fuera = "";
  let i = 0;
  const s = String(js || "");
  while (i < s.length) {
    const c = s[i];
    const dos = s.slice(i, i + 2);
    if (dos === "//") {
      const fin = s.indexOf("\n", i);
      i = fin === -1 ? s.length : fin;
      continue;
    }
    if (dos === "/*") {
      const fin = s.indexOf("*/", i + 2);
      i = fin === -1 ? s.length : fin + 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      i++;
      while (i < s.length && s[i] !== c) {
        if (s[i] === "\\") i++;
        i++;
      }
      i++;
      fuera += '""';
      continue;
    }
    fuera += c;
    i++;
  }
  return fuera;
}

/** Los nombres que el script declara: funciones, variables y parámetros. */
function declaradosEn(codigo) {
  const nombres = new Set();
  const agregar = (n) => {
    if (n && /^[A-Za-z_$][\w$]*$/.test(n)) nombres.add(n);
  };

  // function nombre(a, b)  ·  y también sus parámetros
  for (const m of codigo.matchAll(/function\s*([A-Za-z_$][\w$]*)?\s*\(([^)]*)\)/g)) {
    agregar(m[1]);
    for (const p of m[2].split(",")) agregar(p.trim().split(/[=\s]/)[0]);
  }
  // var / let / const nombre
  for (const m of codigo.matchAll(/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)/g)) agregar(m[1]);
  // class Nombre
  for (const m of codigo.matchAll(/\bclass\s+([A-Za-z_$][\w$]*)/g)) agregar(m[1]);
  // (a, b) => ...   y   a => ...
  for (const m of codigo.matchAll(/\(([^()]*)\)\s*=>/g)) {
    for (const p of m[2 - 1].split(",")) agregar(p.trim().split(/[=\s]/)[0]);
  }
  for (const m of codigo.matchAll(/([A-Za-z_$][\w$]*)\s*=>/g)) agregar(m[1]);
  // catch (e)
  for (const m of codigo.matchAll(/catch\s*\(\s*([A-Za-z_$][\w$]*)/g)) agregar(m[1]);
  return nombres;
}

/**
 * Busca llamadas a funciones que no están declaradas en ninguna parte.
 *
 * @param {string} html el HTML completo del panel
 * @returns {Array<{nombre:string, linea:number, contexto:string}>}
 */
function llamadasSinDefinir(html) {
  const problemas = [];
  for (const js of scriptsDe(html)) {
    const codigo = soloCodigo(sinInterpolaciones(js));
    const declarados = declaradosEn(codigo);
    const lineas = codigo.split("\n");

    lineas.forEach((linea, idx) => {
      // `nombre(` que NO viene después de un punto (eso sería un método) ni
      // después de la palabra function (eso sería una declaración).
      for (const m of linea.matchAll(/(^|[^\w$.])([A-Za-z_$][\w$]*)\s*\(/g)) {
        const nombre = m[2];
        if (DEL_NAVEGADOR.has(nombre)) continue;
        if (declarados.has(nombre)) continue;
        // Mayúscula inicial: casi siempre un constructor del navegador que no
        // listamos. No se reporta para no llenar de ruido.
        if (/^[A-Z]/.test(nombre)) continue;
        problemas.push({
          nombre,
          linea: idx + 1,
          contexto: linea.trim().slice(0, 120),
        });
      }
    });
  }
  return problemas;
}

/** Revisa el código fuente de un panel (la ruta del archivo .js). */
function revisarArchivo(ruta) {
  const fuente = require("fs").readFileSync(ruta, "utf8");
  return { scripts: scriptsDe(fuente).length, problemas: llamadasSinDefinir(fuente) };
}

module.exports = {
  llamadasSinDefinir,
  revisarArchivo,
  scriptsDe,
  soloCodigo,
  sinInterpolaciones,
  declaradosEn,
  DEL_NAVEGADOR,
};
