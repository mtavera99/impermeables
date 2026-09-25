/**
 * CARGAR EL EXCEL DE 99 ENVÍOS, SIN COPIAR NADA A MANO.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep). El dueño: "me gustaría que en esta sección
 * dejes la posibilidad de poder cargar el Excel que me da 99 envíos, para no
 * tener que copiar manualmente lo que está en el Excel sino que sólo sea
 * cargarlo y ya".
 *
 * 🔑 POR QUÉ SE LEE EL .XLSX A MANO Y NO CON UNA LIBRERÍA: en el entorno donde se
 * desarrolla esto no hay salida a internet, así que una dependencia nueva no se
 * puede ejecutar ni una vez antes de subirla. Y esta pantalla le escribe a
 * clientes reales. Un .xlsx es un ZIP con XML adentro y Node trae `zlib`, así que
 * se lee con lo que ya hay — y se prueba de verdad.
 *
 * ⚠️ ESTA PRUEBA NO USA UN ARCHIVO DE EJEMPLO: arma un .xlsx VÁLIDO byte a byte
 * (ZIP con deflate y CRC32 reales). Si el lector se rompe, se rompe acá y no con
 * el dueño esperando para avisarle a un cliente.
 *
 *   node test-excel.js      (sin credenciales ni red)
 */

const zlib = require("zlib");
const x = require("./src/excel");
const novedades = require("./src/novedades");

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

// ═══════════════════════════════════════════════════════════════════════════
// UN ESCRITOR DE ZIP MÍNIMO, SOLO PARA LA PRUEBA
//
// Hace falta para generar un .xlsx real. Es la contraparte del lector: si los
// dos estuvieran mal de la misma forma la prueba no serviría, así que este se
// escribió siguiendo la especificación del formato, no el lector.
// ═══════════════════════════════════════════════════════════════════════════
const TABLA_CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ TABLA_CRC[(c ^ buf[i]) & 0xff];
  return (c ^ -1) >>> 0;
}

/**
 * @param {Array<{nombre:string, contenido:string}>} archivos
 * @param {boolean} [sinComprimir] para probar también el método 0
 */
function armarZip(archivos, sinComprimir) {
  const locales = [];
  const centrales = [];
  let offset = 0;

  for (const a of archivos) {
    const datos = Buffer.from(a.contenido, "utf8");
    const comprimido = sinComprimir ? datos : zlib.deflateRawSync(datos);
    const metodo = sinComprimir ? 0 : 8;
    const nombre = Buffer.from(a.nombre, "utf8");
    const crc = crc32(datos);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // versión necesaria
    local.writeUInt16LE(0, 6); // banderas
    local.writeUInt16LE(metodo, 8);
    local.writeUInt16LE(0, 10); // hora
    local.writeUInt16LE(0, 12); // fecha
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comprimido.length, 18);
    local.writeUInt32LE(datos.length, 22);
    local.writeUInt16LE(nombre.length, 26);
    local.writeUInt16LE(0, 28); // extra
    locales.push(local, nombre, comprimido);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // versión con que se creó
    central.writeUInt16LE(20, 6); // versión necesaria
    central.writeUInt16LE(0, 8); // banderas
    central.writeUInt16LE(metodo, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(comprimido.length, 20);
    central.writeUInt32LE(datos.length, 24);
    central.writeUInt16LE(nombre.length, 28);
    central.writeUInt16LE(0, 30); // extra
    central.writeUInt16LE(0, 32); // comentario
    central.writeUInt16LE(0, 34); // disco
    central.writeUInt16LE(0, 36); // atributos internos
    central.writeUInt32LE(0, 38); // atributos externos
    central.writeUInt32LE(offset, 42);
    centrales.push(central, nombre);

    offset += local.length + nombre.length + comprimido.length;
  }

  const cuerpoLocal = Buffer.concat(locales);
  const cuerpoCentral = Buffer.concat(centrales);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(0, 4);
  fin.writeUInt16LE(0, 6);
  fin.writeUInt16LE(archivos.length, 8);
  fin.writeUInt16LE(archivos.length, 10);
  fin.writeUInt32LE(cuerpoCentral.length, 12);
  fin.writeUInt32LE(cuerpoLocal.length, 16);
  fin.writeUInt16LE(0, 20);
  return Buffer.concat([cuerpoLocal, cuerpoCentral, fin]);
}

/** Un .xlsx con las columnas que trae 99 Envíos. */
function xlsxDePrueba(opciones = {}) {
  // Los textos van al diccionario, como hace Excel de verdad.
  const textos = [
    "Guia",
    "Destinatario",
    "Direccion",
    "Celular",
    "Novedad",
    "Ciudad",
    "64532758219",
    "Sonia",
    "Avenida 105280 Barrio Andalucía",
    "3128716771",
    "No se localiza dirección del destinatario",
    "BELLO/BELLO",
    "64532758220",
    "Carlos",
    "Cr 20 12328 Barrio ciudadela de paz",
    "3180204957",
    "Reclame en oficina Interrapidísimo",
    "BARRANQUILLA/BARRANQUILLA",
  ];
  const si = textos
    .map((t) => `<si><t>${t.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</t></si>`)
    .join("");
  const sharedStrings = `<?xml version="1.0" encoding="UTF-8"?><sst count="${textos.length}" uniqueCount="${textos.length}">${si}</sst>`;

  const celda = (ref, i) => `<c r="${ref}" t="s"><v>${i}</v></c>`;
  const filas = [
    `<row r="1">${["A1", "B1", "C1", "D1", "E1", "F1"].map((r, i) => celda(r, i)).join("")}</row>`,
    `<row r="2">${["A2", "B2", "C2", "D2", "E2", "F2"].map((r, i) => celda(r, 6 + i)).join("")}</row>`,
    `<row r="3">${["A3", "B3", "C3", "D3", "E3", "F3"].map((r, i) => celda(r, 12 + i)).join("")}</row>`,
  ];
  if (opciones.filaVacia) filas.push(`<row r="4"><c r="A4" t="s"/></row>`);
  const sheet = `<?xml version="1.0" encoding="UTF-8"?><worksheet><sheetData>${filas.join("")}</sheetData></worksheet>`;

  return armarZip(
    [
      { nombre: "[Content_Types].xml", contenido: "<Types/>" },
      { nombre: "xl/workbook.xml", contenido: "<workbook/>" },
      { nombre: "xl/sharedStrings.xml", contenido: sharedStrings },
      { nombre: "xl/worksheets/sheet1.xml", contenido: sheet },
    ],
    opciones.sinComprimir
  );
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Se lee un .xlsx de verdad ──");

const filas = x.leerXlsx(xlsxDePrueba());
chequear("devuelve 3 filas (encabezado + 2 novedades)", filas.length === 3, `dio ${filas.length}`);
chequear("la primera fila es el encabezado", filas[0][0] === "Guia");
chequear("lee el número de guía", filas[1][0] === "64532758219", filas[1][0]);
chequear("lee el nombre", filas[1][1] === "Sonia");
chequear(
  "lee el motivo completo",
  filas[1][4] === "No se localiza dirección del destinatario",
  filas[1][4]
);
chequear("y respeta las tildes", /Andalucía/.test(filas[1][2]), filas[1][2]);
chequear("lee la segunda novedad", filas[2][0] === "64532758220");
chequear("con su motivo", /oficina Interrapid/.test(filas[2][4]), filas[2][4]);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. También si el ZIP viene sin comprimir ──");

// Algunos generadores guardan los archivos chicos con método 0.
const sinComp = x.leerXlsx(xlsxDePrueba({ sinComprimir: true }));
chequear("se lee igual", sinComp.length === 3 && sinComp[1][0] === "64532758219");

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Lo que sale alimenta al lector de novedades ──");

// 🔑 Esta es la prueba que importa de verdad: que el Excel cargado produzca
// exactamente lo que ya sabe leer `novedades.parsear`. Si esto no cierra, el
// dueño carga el archivo y la pantalla le muestra una lista vacía.
const texto = x.aLineas(filas);
const leidas = novedades.parsear(texto);
chequear("el parser encuentra las 2 novedades", leidas.length === 2, JSON.stringify(leidas.map((n) => n.guia)));
chequear(
  "🔑 y elige la GUÍA, no el celular",
  leidas[0].guia === "64532758219" && leidas[1].guia === "64532758220",
  "el celular tiene 10 dígitos y cae en el mismo filtro que la guía: hay que descartarlo"
);
chequear(
  "el motivo llega limpio, sin los números",
  /No se localiza/.test(leidas[0].motivo) && !/3128716771/.test(leidas[0].motivo),
  leidas[0].motivo
);
chequear(
  "y se clasifica el tipo de novedad",
  novedades.clasificar(leidas[0].motivo).clave === "direccion",
  JSON.stringify(novedades.clasificar(leidas[0].motivo))
);
chequear(
  "la de oficina también",
  novedades.clasificar(leidas[1].motivo).clave === "oficina",
  JSON.stringify(novedades.clasificar(leidas[1].motivo))
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. El CSV también sirve ──");

const csv = x.leerCsv(
  'Guia,Destinatario,Novedad\n64532758219,Sonia,"No se localiza dirección, del destinatario"\n64532758220,Carlos,Reclame en oficina\n'
);
chequear("lee 3 filas", csv.length === 3, `dio ${csv.length}`);
chequear(
  "respeta las comas dentro de comillas",
  csv[1][2] === "No se localiza dirección, del destinatario",
  csv[1][2]
);
chequear("y las comillas escapadas", x.leerCsv('a,"di ""hola""",c')[0][1] === 'di "hola"');
chequear("acepta punto y coma", x.leerCsv("a;b;c")[0].length === 3);
chequear("y tabulador", x.leerCsv("a\tb\tc")[0].length === 3);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Detecta el formato solo ──");

const r1 = x.aTextoDeNovedades(xlsxDePrueba());
chequear("reconoce el xlsx", r1.formato === "xlsx");
chequear("y saca las líneas", novedades.parsear(r1.texto).length === 2);

const r2 = x.aTextoDeNovedades(Buffer.from("Guia,Novedad\n64532758219,No se localiza\n", "utf8"));
chequear("reconoce el csv", r2.formato === "csv");
chequear("y también saca las líneas", novedades.parsear(r2.texto).length === 1);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Los errores explican qué hacer ──");

const falla = (fn) => {
  try {
    fn();
    return "";
  } catch (e) {
    return e.message;
  }
};
chequear("archivo vacío", /vac[íi]o/i.test(falla(() => x.leerXlsx(Buffer.alloc(0)))));
chequear(
  "un .xls viejo dice cómo convertirlo",
  /guardalo como|\.xlsx/i.test(falla(() => x.leerXlsx(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 1, 2, 3, 4])))),
  falla(() => x.leerXlsx(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 1, 2, 3, 4])))
);
chequear(
  "un ZIP que no es Excel avisa",
  /hoja/i.test(falla(() => x.leerXlsx(armarZip([{ nombre: "hola.txt", contenido: "nada" }])))),
  falla(() => x.leerXlsx(armarZip([{ nombre: "hola.txt", contenido: "nada" }])))
);
chequear(
  "un XML/HTML suelto avisa",
  /XML o HTML/i.test(falla(() => x.aTextoDeNovedades(Buffer.from("<html></html>"))))
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Detalles del formato que rompen si se hacen a la ligera ──");

// Una celda con formato mezclado se parte en varios <t>. Si se toma solo el
// primero, "Interrapidísimo Bello" llega como "Interrapid".
chequear(
  "una celda partida en varios <t> se une",
  x.leerTextosCompartidos("<sst><si><r><t>Interrapid</t></r><r><t>ísimo Bello</t></r></si></sst>")[0] ===
    "Interrapidísimo Bello"
);
// Las columnas se ubican por su letra: si una celda viene vacía y se omite, las
// siguientes no se pueden correr un lugar.
const conHueco = x.leerHoja(
  '<worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="C1" t="s"><v>1</v></c></row></sheetData></worksheet>',
  ["primera", "tercera"]
);
chequear("una columna vacía no corre a las demás", conHueco[0][2] === "tercera", JSON.stringify(conHueco[0]));
chequear("y el hueco queda vacío, no undefined", conHueco[0][1] === "");
chequear("letras de columna: A=0, Z=25, AA=26", x.indiceDeColumna("A") === 0 && x.indiceDeColumna("Z") === 25 && x.indiceDeColumna("AA") === 26);
chequear("entidades XML numéricas", x.desescapar("caf&#233; &amp; t&#xe9;") === "café & té");
chequear(
  "las filas totalmente vacías se descartan",
  !/\n\n/.test(x.aLineas([["a"], ["", ""], ["b"]])),
  JSON.stringify(x.aLineas([["a"], ["", ""], ["b"]]))
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
