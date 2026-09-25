// ============================================================================
// 📄 LEER EL EXCEL DE 99 ENVÍOS, SIN DEPENDENCIAS
//
// DE DÓNDE SALE (25-sep). El dueño: "me gustaría que en esta sección dejes la
// posibilidad de poder cargar el Excel que me da 99 envíos, para no tener que
// copiar manualmente lo que está en el Excel sino que sólo sea cargarlo y ya".
//
// Copiar y pegar filas de una tabla en el celular es de las cosas más incómodas
// que hay, y encima se pierden columnas por el camino.
//
// 🔑 POR QUÉ NO SE USA UNA LIBRERÍA (tipo SheetJS): en este entorno no hay salida
// a internet, así que una dependencia nueva NO SE PUEDE PROBAR acá — se subiría a
// producción sin haberla ejecutado nunca. Y esta pantalla toca clientes reales.
//
// Un .xlsx es un ZIP con XML adentro, y Node trae `zlib` de fábrica. Son ~80
// líneas leyendo el formato, todas probadas contra un archivo armado a mano.
//
// LO QUE SE LEE:
//   xl/sharedStrings.xml ..... el diccionario de textos (Excel no repite cadenas)
//   xl/worksheets/sheet1.xml . las celdas, que apuntan a ese diccionario
//
// ⛔ LO QUE NO HACE: fórmulas, formatos, fechas como número de serie, ni varias
// hojas. No hacen falta: de este archivo solo se necesitan las líneas con el
// número de guía y el motivo, que es lo que `novedades.parsear` sabe leer.
// ============================================================================

const zlib = require("zlib");

// ---------------------------------------------------------------------------
// LA PARTE DE ZIP
//
// Se lee por el DIRECTORIO CENTRAL, no escaneando encabezados locales. Los
// encabezados locales pueden venir con el tamaño en cero cuando el archivo se
// generó en streaming (bit 3 de las banderas), y ahí el escaneo se pierde. El
// directorio central siempre trae los tamaños buenos.
// ---------------------------------------------------------------------------
const FIRMA_FIN = 0x06054b50; // PK\x05\x06  fin del directorio central
const FIRMA_CENTRAL = 0x02014b50; // PK\x01\x02  entrada del directorio
const FIRMA_LOCAL = 0x04034b50; // PK\x03\x04  encabezado local

/** Busca el fin del directorio central, que está al final del archivo. */
function buscarFin(buf) {
  // El comentario final puede medir hasta 65.535 bytes, así que se busca hacia
  // atrás desde el final, no desde el principio.
  const desde = Math.max(0, buf.length - 65557);
  for (let i = buf.length - 22; i >= desde; i--) {
    if (buf.readUInt32LE(i) === FIRMA_FIN) return i;
  }
  return -1;
}

/**
 * Devuelve un mapa { nombreDeArchivo: Buffer } con el contenido del ZIP.
 * Solo descomprime las entradas que pide `queres`, para no gastar memoria en
 * las imágenes o los estilos del libro.
 */
function abrirZip(buf, queres) {
  const fin = buscarFin(buf);
  if (fin === -1) throw new Error("No parece un archivo .xlsx (no encontré el índice del ZIP).");

  const cuantas = buf.readUInt16LE(fin + 10);
  let p = buf.readUInt32LE(fin + 16); // dónde arranca el directorio central
  const salida = {};

  for (let i = 0; i < cuantas; i++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== FIRMA_CENTRAL) break;
    const metodo = buf.readUInt16LE(p + 10);
    const compResaco = buf.readUInt32LE(p + 20);
    const largoNombre = buf.readUInt16LE(p + 28);
    const largoExtra = buf.readUInt16LE(p + 30);
    const largoComent = buf.readUInt16LE(p + 32);
    const offsetLocal = buf.readUInt32LE(p + 42);
    const nombre = buf.toString("utf8", p + 46, p + 46 + largoNombre);
    p += 46 + largoNombre + largoExtra + largoComent;

    if (queres && !queres(nombre)) continue;
    if (buf.readUInt32LE(offsetLocal) !== FIRMA_LOCAL) continue;

    // El encabezado local repite el nombre y el extra, con largos propios: hay
    // que leerlos de ahí, no del directorio, porque el extra suele diferir.
    const nombreLocal = buf.readUInt16LE(offsetLocal + 26);
    const extraLocal = buf.readUInt16LE(offsetLocal + 28);
    const inicio = offsetLocal + 30 + nombreLocal + extraLocal;
    const crudo = buf.subarray(inicio, inicio + compResaco);

    try {
      // 0 = sin comprimir, 8 = deflate. Excel usa deflate; algunos generadores
      // guardan archivos chicos sin comprimir.
      salida[nombre] = metodo === 0 ? Buffer.from(crudo) : zlib.inflateRawSync(crudo);
    } catch (e) {
      throw new Error(`No pude descomprimir "${nombre}" del Excel: ${e.message}`);
    }
  }
  return salida;
}

// ---------------------------------------------------------------------------
// LA PARTE DE XML
// ---------------------------------------------------------------------------
const ENTIDADES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};

function desescapar(s) {
  return String(s == null ? "" : s)
    .replace(/&(amp|lt|gt|quot|apos);/g, (m) => ENTIDADES[m])
    // Entidades numéricas: &#233; y &#xe9;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

/**
 * El diccionario de textos.
 * ⚠️ Una celda puede partirse en varios <t> cuando tiene formato mezclado (media
 * palabra en negrita). Se concatenan TODOS los <t> de cada <si>: si se tomara
 * solo el primero, "Interrapidísimo Bello" llegaría como "Interrapid".
 */
function leerTextosCompartidos(xml) {
  if (!xml) return [];
  const textos = [];
  for (const m of String(xml).matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
    const partes = [...m[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((x) => desescapar(x[1]));
    textos.push(partes.join(""));
  }
  return textos;
}

/** La columna de una referencia de celda: "BC12" -> "BC". */
const columnaDe = (ref) => String(ref || "").replace(/\d+/g, "");

/** "A" -> 0, "B" -> 1, "AA" -> 26. Para ubicar la celda en su fila. */
function indiceDeColumna(letras) {
  let n = 0;
  for (const c of String(letras).toUpperCase()) {
    if (c < "A" || c > "Z") continue;
    n = n * 26 + (c.charCodeAt(0) - 64);
  }
  return Math.max(0, n - 1);
}

/** Las filas de la hoja, cada una como arreglo de textos. */
function leerHoja(xml, textos) {
  if (!xml) return [];
  const filas = [];
  for (const mf of String(xml).matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const celdas = [];
    for (const mc of mf[1].matchAll(/<c\b([^>]*)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const atributos = mc[1] || "";
      const cuerpo = mc[2] || "";
      const ref = (atributos.match(/r="([A-Z]+\d+)"/) || [])[1];
      const tipo = (atributos.match(/t="([^"]+)"/) || [])[1] || "n";

      let valor = "";
      if (tipo === "s") {
        // Apunta al diccionario de textos.
        const i = Number((cuerpo.match(/<v>([\s\S]*?)<\/v>/) || [])[1]);
        valor = Number.isFinite(i) && textos[i] != null ? textos[i] : "";
      } else if (tipo === "inlineStr") {
        valor = [...cuerpo.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)]
          .map((x) => desescapar(x[1]))
          .join("");
      } else {
        // Número, fecha o cadena de fórmula: se toma tal cual viene.
        valor = desescapar((cuerpo.match(/<v>([\s\S]*?)<\/v>/) || [])[1] || "");
      }

      const donde = ref ? indiceDeColumna(columnaDe(ref)) : celdas.length;
      celdas[donde] = valor;
    }
    // Las celdas vacías quedan como huecos del arreglo: se rellenan para que la
    // fila no se desarme al unirla.
    filas.push(Array.from(celdas, (v) => (v == null ? "" : String(v))));
  }
  return filas;
}

// ---------------------------------------------------------------------------
// LA ENTRADA PÚBLICA
// ---------------------------------------------------------------------------
/**
 * Lee un .xlsx y devuelve sus filas.
 * @param {Buffer} buffer
 * @returns {Array<Array<string>>}
 */
function leerXlsx(buffer) {
  if (!buffer || !buffer.length) throw new Error("El archivo llegó vacío.");
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  // Un .xlsx siempre empieza con la firma de ZIP. Si no, casi seguro es un .xls
  // viejo (formato binario distinto) y conviene decirlo claro.
  if (buf.readUInt32LE(0) !== FIRMA_LOCAL) {
    throw new Error(
      "Ese archivo no es .xlsx. Si es un .xls viejo, abrilo en Excel y guardalo " +
        'como "Excel (.xlsx)" o como CSV.'
    );
  }

  const partes = abrirZip(buf, (n) => /^xl\/(sharedStrings\.xml|worksheets\/)/.test(n));
  const textos = leerTextosCompartidos(
    partes["xl/sharedStrings.xml"] && partes["xl/sharedStrings.xml"].toString("utf8")
  );

  // La primera hoja por orden de nombre: sheet1 antes que sheet10.
  const hojas = Object.keys(partes)
    .filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n))
    .sort((a, b) => {
      const na = Number(a.match(/(\d+)/)[1]);
      const nb = Number(b.match(/(\d+)/)[1]);
      return na - nb;
    });
  if (!hojas.length) throw new Error("El Excel no tiene ninguna hoja que pueda leer.");

  return leerHoja(partes[hojas[0]].toString("utf8"), textos);
}

/**
 * Lee un CSV simple, respetando las comillas.
 * Se acepta también CSV porque 99 Envíos deja descargarlo, y es el camino de
 * salida cuando un Excel raro no se puede leer.
 */
function leerCsv(texto) {
  const filas = [];
  let fila = [];
  let campo = "";
  let enComillas = false;
  const s = String(texto || "").replace(/\r\n?/g, "\n");

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (enComillas) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          campo += '"';
          i++;
        } else enComillas = false;
      } else campo += c;
      continue;
    }
    if (c === '"') enComillas = true;
    else if (c === "," || c === ";" || c === "\t") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n") {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += c;
  }
  if (campo !== "" || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }
  return filas;
}

/**
 * Convierte las filas en el texto por líneas que espera `novedades.parsear`.
 *
 * Se unen con TABULADOR porque el parser ya limpia los separadores de columna, y
 * un tabulador no aparece dentro del texto de una celda. Las filas sin ningún
 * número largo no se filtran acá: eso lo hace el parser, que sabe distinguir una
 * guía de un celular.
 */
function aLineas(filas) {
  return (filas || [])
    .map((f) => (f || []).map((c) => String(c == null ? "" : c).trim()).join("\t").trim())
    .filter((l) => l && l.replace(/\t/g, "").trim())
    .join("\n");
}

/** Detecta el formato por el contenido y devuelve el texto por líneas. */
function aTextoDeNovedades(buffer, nombre) {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer || "");
  const esZip = buf.length > 4 && buf.readUInt32LE(0) === FIRMA_LOCAL;
  if (esZip) return { texto: aLineas(leerXlsx(buf)), formato: "xlsx" };
  // No es ZIP: se trata como texto. Cubre CSV y también el caso de pegar la tabla.
  const texto = buf.toString("utf8");
  if (/^\s*</.test(texto)) {
    throw new Error("Ese archivo parece XML o HTML, no una tabla. Exportalo como .xlsx o .csv.");
  }
  return { texto: aLineas(leerCsv(texto)), formato: "csv" };
}

module.exports = {
  leerXlsx,
  leerCsv,
  aLineas,
  aTextoDeNovedades,
  // Se exportan para poder probar las piezas por separado.
  abrirZip,
  leerTextosCompartidos,
  leerHoja,
  indiceDeColumna,
  desescapar,
};
