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

// ============================================================================
// 🔴 LAS COLUMNAS SE PERDÍAN, Y CON ELLAS LA OFICINA Y EL PLAZO
//
// LO QUE PASABA (28-sep, reportado con el archivo real en pantalla). El Excel se
// aplanaba a texto y `novedades.parsear` leía cada línea como un chorizo: sacaba
// un número de guía y tomaba TODO el resto como "el motivo". Dos consecuencias:
//
//   1. La guía elegida era el número equivocado. En la fila real había
//      10104874 (número interno, 8 dígitos) y 240062099941 (la guía, 12), y se
//      quedaba con el primero que no pareciera celular — el interno.
//
//   2. La oficina y la fecha límite ESTÁN en el archivo, en sus propias
//      columnas, y se tiraban a la basura. Por eso cada novedad de oficina
//      quedaba bloqueada pidiéndole al dueño que escribiera a mano dos datos que
//      ya venían en el archivo que acababa de subir.
//
// 🔑 AHORA SE LEE EL ENCABEZADO. Las columnas se ubican por su NOMBRE, no por su
// posición: así sirve aunque 99 Envíos reordene o agregue columnas, que es
// exactamente lo que no se puede controlar desde acá.
//
// ⚠️ Y si el encabezado no se reconoce, NO se inventa nada: se cae al
// comportamiento de antes (línea completa como motivo) y el panel muestra qué
// columnas detectó, para que el dueño vea si acertó en vez de enterarse cuando un
// cliente reciba algo raro.
// ============================================================================

// Cada campo con las formas en que lo puede titular la transportadora. Se compara
// sin tildes y en minúscula.
const COLUMNAS_CONOCIDAS = [
  ["guia", /\b(guia|guias|no de guia|numero de guia|n de guia|tracking|remesa|preenvio|pre envio)\b/],
  ["motivo", /\b(novedad|novedades|motivo|causal|observacion|observaciones|detalle|comentario|descripcion|gestion|solucion)\b/],
  ["oficina", /\b(oficina|sucursal|agencia|punto|bodega|centro|lugar de retiro|punto de retiro)\b/],
  ["plazo", /\b(fecha limite|fecha maxima|limite|vence|vencimiento|plazo|hasta|fecha de vencimiento|dias restantes)\b/],
  ["nombre", /\b(destinatario|nombre|nombres|cliente|recibe)\b/],
  ["ciudad", /\b(ciudad|destino|municipio|ciudad destino)\b/],
  ["celular", /\b(celular|telefono|movil|contacto|whatsapp)\b/],
];

const aplanarEncabezado = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Busca la fila de encabezado y devuelve qué columna es cada campo.
 *
 * Se mira solo entre las primeras filas: 99 Envíos a veces pone un título o una
 * fila vacía antes de los encabezados.
 *
 * @returns {{fila:number, indices:Object<string,number>, titulos:Object<string,string>}|null}
 */
function detectarColumnas(filas) {
  const cuantas = Math.min(8, (filas || []).length);
  let mejor = null;

  for (let i = 0; i < cuantas; i++) {
    const celdas = (filas[i] || []).map(aplanarEncabezado);
    if (!celdas.some(Boolean)) continue;

    const indices = {};
    const titulos = {};
    for (const [campo, patron] of COLUMNAS_CONOCIDAS) {
      for (let j = 0; j < celdas.length; j++) {
        if (indices[campo] !== undefined) continue;
        if (celdas[j] && patron.test(celdas[j])) {
          indices[campo] = j;
          titulos[campo] = String((filas[i] || [])[j] || "").trim();
        }
      }
    }
    const cuantosCampos = Object.keys(indices).length;
    // Se exige la GUÍA más al menos otro campo: una fila con un solo acierto
    // suele ser un dato, no un encabezado.
    if (indices.guia === undefined || cuantosCampos < 2) continue;
    if (!mejor || cuantosCampos > mejor.cuantos) {
      mejor = { fila: i, indices, titulos, cuantos: cuantosCampos };
    }
  }
  return mejor ? { fila: mejor.fila, indices: mejor.indices, titulos: mejor.titulos } : null;
}

/** "A" para 0, "B" para 1… solo para mostrárselo al dueño en el panel. */
function letraDeColumna(i) {
  let n = Number(i) + 1;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - r) / 26);
  }
  return s;
}

/**
 * Convierte las filas en líneas usando el encabezado detectado.
 *
 * 🔑 La oficina y el plazo se marcan explícitamente con `[[oficina: …]]` y
 * `[[plazo: …]]`. Dos razones:
 *   · `novedades.parsear` los lee sin tener que conocer el formato del archivo;
 *   · y quedan VISIBLES en el texto que el dueño revisa antes de enviar, así ve
 *     qué se detectó en vez de confiar en que salió bien.
 *
 * El motivo se pone primero para que la clasificación no tenga que competir con
 * la dirección y el nombre, que es lo que hacía que "no se localiza dirección"
 * quedara enterrado entre veinte palabras.
 */
function aLineasConColumnas(filas, mapa) {
  const { fila: filaEncabezado, indices } = mapa;
  const salida = [];

  for (let i = filaEncabezado + 1; i < filas.length; i++) {
    const f = filas[i] || [];
    const celda = (campo) => {
      const j = indices[campo];
      return j === undefined ? "" : String(f[j] == null ? "" : f[j]).trim();
    };

    const guia = celda("guia");
    if (!guia) continue;

    const partes = [guia];
    for (const campo of ["motivo", "nombre", "ciudad", "celular"]) {
      const v = celda(campo);
      if (v) partes.push(v);
    }
    const oficina = celda("oficina");
    const plazo = celda("plazo");
    if (oficina) partes.push(`[[oficina: ${oficina}]]`);
    if (plazo) partes.push(`[[plazo: ${plazo}]]`);

    const linea = partes.join("\t").trim();
    if (linea) salida.push(linea);
  }
  return salida.join("\n");
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

/**
 * Detecta el formato por el contenido y devuelve el texto por líneas.
 *
 * @returns {{texto:string, formato:string, columnas:object|null}}
 *   `columnas` describe qué se detectó, para mostrárselo al dueño. Si es null, el
 *   encabezado no se reconoció y se leyó con el método viejo.
 */
function aTextoDeNovedades(buffer, nombre) {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer || "");
  const esZip = buf.length > 4 && buf.readUInt32LE(0) === FIRMA_LOCAL;

  let filas;
  let formato;
  if (esZip) {
    filas = leerXlsx(buf);
    formato = "xlsx";
  } else {
    const texto = buf.toString("utf8");
    if (/^\s*</.test(texto)) {
      throw new Error("Ese archivo parece XML o HTML, no una tabla. Exportalo como .xlsx o .csv.");
    }
    filas = leerCsv(texto);
    formato = "csv";
  }

  // 🔑 Primero se intenta con el encabezado. Si no se reconoce, se cae al método
  // de antes: nunca se queda sin leer el archivo por no encontrar los títulos.
  const mapa = detectarColumnas(filas);
  if (mapa) {
    const texto = aLineasConColumnas(filas, mapa);
    if (texto.trim()) {
      return {
        texto,
        formato,
        columnas: {
          filaEncabezado: mapa.fila + 1,
          detectadas: Object.fromEntries(
            Object.entries(mapa.indices).map(([campo, i]) => [
              campo,
              { columna: letraDeColumna(i), titulo: mapa.titulos[campo] || "" },
            ])
          ),
          faltantes: COLUMNAS_CONOCIDAS.map(([c]) => c).filter((c) => mapa.indices[c] === undefined),
        },
      };
    }
  }

  return { texto: aLineas(filas), formato, columnas: null };
}

module.exports = {
  leerXlsx,
  leerCsv,
  aLineas,
  aLineasConColumnas,
  detectarColumnas,
  letraDeColumna,
  aTextoDeNovedades,
  // Se exportan para poder probar las piezas por separado.
  abrirZip,
  leerTextosCompartidos,
  leerHoja,
  indiceDeColumna,
  desescapar,
};
