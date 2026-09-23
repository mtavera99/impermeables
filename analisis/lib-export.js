// ============================================================================
// LECTOR DEL EXPORT DEL AGENTE DE META — UNO SOLO, PARA TODOS LOS ANALISIS
//
// 🔴 POR QUE EXISTE ESTE ARCHIVO: el 23-sep escribi el mismo parser tres veces
// (en por-que-no-cierran, en bot-vs-agente y en que-decia-despues-del-total) y
// los tres tenian EL MISMO BUG. Un parser copiado tres veces es un bug copiado
// tres veces.
//
// ── EL BUG ──────────────────────────────────────────────────────────────────
// Cada archivo del export tiene lineas asi:
//
//     Context: {"ctwa":{...,"body":"Te mojas por dentro ... $59.900 + envio
//      a tu ciudad. Pagas al recibir. Escribenos y te damos el total exacto",...}}
//     You: ¡Hola! Quiero más información.
//     Business: ¡Hola! El impermeable Tradicional trae...
//
// El bloque `Context:` trae el TEXTO DEL ANUNCIO, y OCUPA VARIAS LINEAS: el JSON
// viene con saltos de linea adentro. Mi parser saltaba la linea que empieza con
// "Context:" y nada mas, asi que las lineas siguientes —que son publicidad— se
// le pegaban al turno anterior como si el negocio las hubiera dicho.
//
// Consecuencia medida: aparecio un "patron de cierre" usado 149 veces con 0,0%
// de avance. No era una frase del agente: era el copy del anuncio.
//
// ── LA REGLA ────────────────────────────────────────────────────────────────
// Los turnos SIEMPRE empiezan con "You:", "Bot:" o "Business:". Asi que al ver
// un "Context:" se entra en modo salto y se ignora TODO hasta el proximo turno.
// ============================================================================

const fs = require("fs");
const path = require("path");

const RE_TURNO = /^(You|Bot|Business):(.*)$/;

// ============================================================================
// 🔴 LOS MENSAJES CON IMAGEN NO SON TEXTO PLANO
//
// Cuando el agente mandaba una foto con pie de foto, el export NO guarda el
// texto: guarda el JSON del mensaje, y con el texto doble-codificado:
//
//   Business: {"image":{"image_id":"1411768607733577","caption":"\u00c2\u00a1Hola
//   Fernando! Aqu\u00c3\u00ad tienes la gu\u00c3\u00ada de env\u00c3\u00ado..."}}
//
// Son 890 lineas asi. Si no se decodifican pasan dos cosas malas:
//
//  1. El analisis de frases lee '{"image":{"image_id"...' como si fuera una
//     frase de venta. Asi aparecio un "patron de cierre" usado 149 veces con
//     0,0% de avance que en realidad era basura de JSON.
//  2. Se pierde el pie de foto, que SI es un mensaje de venta real — varios
//     traen la oferta de 2 unidades.
//
// LA DOBLE CODIFICACION: "\u00c3\u00ad" son los BYTES C3 AD, que en UTF-8 son
// "í". O sea que cada escape es un byte, no un caracter. Hay que juntar la
// tirada de escapes y decodificarla como UTF-8.
// ============================================================================

// La doble codificacion llega de DOS formas, segun si el texto paso o no por
// JSON.parse antes:
//
//   a) escapes literales ....... "env\u00c3\u00ado"   (texto crudo del archivo)
//   b) caracteres ya sueltos ... "envÃ­o"              (despues de JSON.parse)
//
// Las dos son los mismos bytes C3 AD; solo cambia como estan escritos. Hay que
// arreglar las dos o el texto sale roto en la mitad de los casos.

/** Forma (a): "env\u00c3\u00ado" -> "envío". */
function repararEscapes(s) {
  return String(s).replace(/(?:\\u00[0-9a-fA-F]{2})+/g, (tirada) => {
    const bytes = [...tirada.matchAll(/\\u00([0-9a-fA-F]{2})/g)].map((m) => parseInt(m[1], 16));
    try {
      return new TextDecoder("utf-8", { fatal: false }).decode(Uint8Array.from(bytes));
    } catch {
      return tirada;
    }
  });
}

// La firma de la doble codificacion: una letra del bloque latin-1 alto seguida
// de un caracter de continuacion. "Ã­", "Â¡", "ð" y compañia.
const RE_MOJIBAKE = /[\u00C2-\u00F4][\u0080-\u00BF]/;

/** Forma (b): "envÃ­o" -> "envío". */
function repararMojibake(s) {
  let t = String(s);
  // Puede venir doblemente roto; dos pasadas alcanzan y evitan un bucle infinito.
  for (let i = 0; i < 2; i++) {
    if (!RE_MOJIBAKE.test(t)) break;
    // Solo se puede reinterpretar como bytes si TODO cabe en un byte.
    if ([...t].some((c) => c.charCodeAt(0) > 0xff)) break;
    try {
      const bytes = Uint8Array.from([...t].map((c) => c.charCodeAt(0)));
      const decodificado = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      t = decodificado;
    } catch {
      break; // no era UTF-8 valido: se deja como estaba
    }
  }
  return t;
}

function repararDobleUtf8(s) {
  return repararMojibake(repararEscapes(s));
}

// Las claves del JSON que llevan texto escrito por el negocio.
const CLAVES_TEXTO = new Set(["caption", "body", "text", "title", "footer"]);

function textosDeJSON(valor, salida) {
  if (valor == null) return salida;
  if (typeof valor === "string") return salida;
  if (Array.isArray(valor)) {
    for (const v of valor) textosDeJSON(v, salida);
    return salida;
  }
  if (typeof valor === "object") {
    for (const [k, v] of Object.entries(valor)) {
      if (typeof v === "string") {
        if (CLAVES_TEXTO.has(k) && v.trim()) salida.push(v.trim());
      } else {
        textosDeJSON(v, salida);
      }
    }
  }
  return salida;
}

/**
 * Deja el texto de un turno listo para analizar: si venia como JSON de un
 * mensaje con medios, saca el pie de foto; y arregla la doble codificacion.
 */
function repararTexto(bruto) {
  let t = String(bruto == null ? "" : bruto).trim();
  if (t.startsWith("{") && t.endsWith("}")) {
    try {
      const obj = JSON.parse(t);
      const textos = textosDeJSON(obj, []).map(repararMojibake);
      // Si no hay texto adentro era una foto sin pie: no es un mensaje de venta.
      t = textos.join(" ").trim();
    } catch {
      // JSON partido: al menos que no queden las llaves y las claves sueltas.
      t = t.replace(/[{}"\[\]]/g, " ").replace(/\b(image|image_id|video|audio|document|id)\s*:/g, " ");
    }
  }
  return repararDobleUtf8(t).replace(/[ \t]+/g, " ").trim();
}

/**
 * Convierte un archivo del export en turnos limpios.
 * @returns {{turnos: Array<{quien:"cliente"|"negocio", texto:string}>, adIds:string[]}}
 */
function parsearExport(texto) {
  const turnos = [];
  const adIds = [];
  let ultimo = null;
  let saltando = false;

  for (const linea of String(texto).split("\n")) {
    const m = linea.match(RE_TURNO);

    if (m) {
      // Un turno nuevo siempre corta el modo salto.
      saltando = false;
      ultimo = {
        quien: m[1] === "You" ? "cliente" : "negocio",
        texto: m[2].trim(),
        bruto: m[2].trim(),
      };
      turnos.push(ultimo);
      continue;
    }

    if (linea.startsWith("Context:")) {
      // 🔴 ad_id con regex, NO con JSON.parse: los ad_id de Meta pasan
      // Number.MAX_SAFE_INTEGER y JSON.parse les cambia los ultimos digitos,
      // fusionando anuncios distintos en uno.
      const a = linea.match(/"ad_id"\s*:\s*"?(\d+)"?/);
      if (a) adIds.push(a[1]);
      saltando = true; // 🔑 y sigue saltando hasta el proximo turno
      ultimo = null; // para que nada se le pegue
      continue;
    }

    if (saltando) {
      // Sigue siendo parte del JSON del anuncio. Puede traer el ad_id si el
      // JSON se partio justo ahi.
      const a = linea.match(/"ad_id"\s*:\s*"?(\d+)"?/);
      if (a) adIds.push(a[1]);
      continue;
    }

    // Linea de continuacion de un turno de verdad (los bloques de confirmacion
    // del agente vienen multilinea).
    if (ultimo && linea.trim()) {
      ultimo.bruto += "\n" + linea.trim();
      ultimo.texto = ultimo.bruto;
    }
  }

  // Recien al final se repara: hay que tener el turno completo, porque un JSON
  // partido en varias lineas solo se puede parsear entero.
  for (const t of turnos) t.texto = repararTexto(t.bruto);

  return { turnos, adIds };
}

/** Lee todas las conversaciones del export. */
function leerTodas(dir) {
  const d = dir || path.join(__dirname, "..", "datos-privados", "export", "conversations");
  if (!fs.existsSync(d)) {
    throw new Error(
      `Falta ${d}\nDescomprimi el export en datos-privados/export/ y volve a correr.`
    );
  }
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".txt"))
    .map((f) => parsearExport(fs.readFileSync(path.join(d, f), "utf8")));
}

/** Formato que espera bot/src/embudo.js: { messages: [{role, content}] } */
function aConversacion(turnos) {
  return {
    messages: turnos.map((t) => ({
      role: t.quien === "cliente" ? "user" : "assistant",
      content: t.texto,
    })),
  };
}

function limpiar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// El texto prerrellenado del anuncio: no cuenta como que el cliente hablo.
const RE_PRERRELLENADO = /^¡?hola!?,?\s*(quiero mas informacion|me interesa)\.?$/i;
const RE_BLOQUE_CIERRE = /confirmemos tu pedido/i;
const RE_CONFIRMA =
  /^(si\s*confirmo|si|confirmo|listo|dale|ok|correcto|asi es|todo bien|perfecto|de acuerdo)\b/;

/** ¿El cliente escribio algo propio, o solo mando el texto del anuncio? */
function engancho(turnos) {
  return turnos.some(
    (t) => t.quien === "cliente" && t.texto && !RE_PRERRELLENADO.test(limpiar(t.texto))
  );
}

/** ¿El cliente confirmo el pedido despues de ver el bloque de cierre? */
function confirmo(turnos) {
  let visto = false;
  for (const t of turnos) {
    if (t.quien === "negocio" && RE_BLOQUE_CIERRE.test(t.texto)) visto = true;
    else if (t.quien === "cliente" && visto && RE_CONFIRMA.test(limpiar(t.texto))) return true;
  }
  return false;
}

module.exports = {
  parsearExport,
  leerTodas,
  aConversacion,
  limpiar,
  engancho,
  confirmo,
  RE_PRERRELLENADO,
  RE_BLOQUE_CIERRE,
  RE_CONFIRMA,
};
