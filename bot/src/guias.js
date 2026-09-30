// ============================================================================
// GUÍAS DE LA TRANSPORTADORA — partir el PDF y mandarle a cada cliente la suya
//
// QUÉ HACE: el dueño genera las guías en 99 Envíos y le entregan UN PDF con
// todas las etiquetas. Este módulo lo parte en una hoja por guía, averigua a
// qué pedido corresponde cada hoja, y devuelve el pareo para que el panel lo
// muestre ANTES de enviar nada.
//
// ============================================================================
// 🔴 POR QUÉ EL EMPAREJAMIENTO NO ES SOLO POR TELÉFONO
//
// Lo dijo el dueño por experiencia: **el cliente a veces da en la guía un
// número distinto al de su WhatsApp** (el del marido, el de la mamá, el del
// vecino que recibe). Si emparejáramos solo por teléfono, esas guías no se
// podrían mandar, o peor: se mandarían mal.
//
// Y equivocarse acá no es un error cosmético. La etiqueta lleva DIRECCIÓN Y
// TELÉFONO impresos: mandarle a un cliente la guía de otro es filtrarle datos
// personales a un desconocido. Es de las pocas cosas de este bot que no se
// puede arreglar pidiendo perdón.
//
// POR ESO: varias señales, un puntaje, y dos candados. Si no hay certeza, NO SE
// ENVÍA y se reporta. Preferimos que el dueño mande 2 guías a mano que mandar
// 1 al cliente equivocado.
// ============================================================================

const { PDFDocument } = require("pdf-lib");

// --- Pesos de cada señal -----------------------------------------------------
// El celular vale más que el nombre porque es único; el nombre se repite
// (hay dos "Jorge" en la misma semana) y la ciudad se repite muchísimo
// (Bogotá es ~30% de los pedidos), así que sola no dice nada.
const PESOS = {
  celularPedido: 50,   // el teléfono que el cliente dio para la entrega
  celularWhatsapp: 50, // el número desde el que escribe por WhatsApp
  nombre: 45,          // repartido entre las palabras del nombre
  direccion: 40,       // los números de la dirección (calle, carrera, placa)
  ciudad: 10,
};

// --- Los dos candados --------------------------------------------------------
// MÍNIMO: por debajo de 50 no se envía. 50 = un teléfono exacto, o bien el
//   nombre completo más algo. Menos que eso es adivinar.
// MARGEN: el mejor candidato tiene que superar al segundo por 20 puntos. Si dos
//   pedidos quedan parecidos (dos hermanos en la misma casa, dos pedidos de la
//   misma cuadra), NO se manda: el empate es justo el caso donde el error es
//   más probable y más caro.
const MINIMO = 50;
const MARGEN = 20;

// Palabras que aparecen en toda etiqueta y no distinguen a nadie. Sin esto,
// "DE" o "LA" dentro de un nombre sumarían puntos contra cualquier pedido.
const RUIDO = new Set([
  "DE", "DEL", "LA", "LAS", "LOS", "EL", "Y", "SAN", "SANTA",
  "SEÑOR", "SENOR", "SRA", "SR", "DR", "DRA",
]);

const digitos = (s) => String(s == null ? "" : s).replace(/\D/g, "");

// 🔴 Clientes con username de WhatsApp: su identificador no es un teléfono sino
// un BSUID ("CO.1098944123092301"). Hay que detectarlo porque quitarle los
// símbolos da "1098944123092301", que parece un teléfono y NO lo es. Si eso
// entrara al emparejamiento podría coincidir por casualidad con los números de
// una etiqueta y mandarle la guía de otra persona.
const RE_BSUID = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;
const esBsuid = (s) => RE_BSUID.test(String(s == null ? "" : s).trim());

/** Colombia: se comparan los últimos 10 dígitos, así "573001112233",
 *  "+57 300 111 2233" y "3001112233" son el mismo número. */
function tel10(s) {
  const d = digitos(s);
  return d.length > 10 ? d.slice(-10) : d;
}

/** Mayúsculas, sin acentos y sin puntuación: para comparar texto de PDF
 *  (que viene en mayúsculas y sin tildes) contra lo que guardó el bot. */
function normalizar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Los números "de dirección": 1 a 5 dígitos (calle 127, placa 80-45, apto 302).
 *  Se excluyen los largos porque esos son guías, teléfonos o el recaudo. */
function numerosDireccion(texto) {
  const out = new Set();
  for (const m of normalizar(texto).matchAll(/\b(\d{1,5})\b/g)) {
    const n = m[1];
    // "0" y los de un dígito sueltos generan falsos positivos: casi toda
    // etiqueta tiene un 1 o un 2 en alguna parte.
    if (n.length >= 2) out.add(String(Number(n)));
  }
  return out;
}

/** Palabras útiles de un nombre (descarta ruido y palabras de 1-2 letras). */
function palabrasNombre(nombre) {
  return normalizar(nombre)
    .split(" ")
    .filter((p) => p.length >= 3 && !RUIDO.has(p));
}

/**
 * Las palabras con las que se puede reconocer un municipio.
 *
 * 🔴 28-SEP, Y ESTO DEJÓ UNA GUÍA SIN ENVIAR. Antes se usaba SOLO la primera
 * palabra de la ciudad, y solo si tenía 4 letras o más:
 *
 *     const ciudadPedido = normalizar(pedido.ciudad).split(" ")[0];
 *     if (ciudadPedido && ciudadPedido.length >= 4)
 *
 * En "La Playa" la primera palabra es "LA": 2 letras. La ciudad NO se comparaba
 * nunca y se perdían sus 10 puntos. Reproducido con 8 municipios reales —La
 * Playa, El Cerrito, La Dorada, Los Patios, La Unión, El Bagre, San Gil, La
 * Virginia—: los 8 se quedaban en 45 puntos, justo abajo del mínimo de 50, que
 * es EXACTAMENTE el número que reportó el dueño.
 *
 * Colombia tiene decenas de municipios así. Ahora se miran todas las palabras
 * del nombre y alcanza con que una coincida.
 *
 * ⚠️ Se aceptan palabras de 3 letras (para "San GIL", "La CEJA") pero se buscan
 * con límite de palabra exacto. La ciudad vale 10 puntos y por sí sola nunca
 * llega al mínimo de 50, así que un acierto de casualidad no manda nada.
 */
function palabrasCiudad(ciudad) {
  return normalizar(ciudad)
    .split(/[\s,]+/)
    .filter((p) => p.length >= 3 && !RUIDO.has(p));
}

// ============================================================================
// LEER EL PDF
// ============================================================================

/**
 * Texto del PDF agrupado por página y por línea.
 *
 * ⚠️ Por qué por LÍNEA y no todo junto: la etiqueta se lee por sus rótulos
 * ("DESTINATARIO:", "DIRECCION:", "GUIA No."). Si se junta todo en un solo
 * chorro de texto, el nombre del destinatario se pega con el del remitente y
 * el parseo empieza a adivinar. Se agrupa por la coordenada Y de cada pedazo.
 */
// ============================================================================
// 🧠 ESTO CORRE EN UN PROCESO APARTE — 30-sep
//
// EL PROBLEMA, medido: `pdfjs` NO devuelve la memoria que usa. Ni con
// `page.cleanup()`, ni con `doc.destroy()`, ni forzando el recolector:
//
//     solo CARGAR el módulo pdfjs        +41 MB
//     leer 40 páginas                    +30 MB
//     después de destroy() + recolector    0 MB devueltos
//                                        ─────────
//                                         71 MB que no vuelven NUNCA
//
// Node SÍ libera por dentro (el heap y `external` bajan a lo normal), pero el
// sistema operativo nunca recupera esos 71 MB. Con el contenedor de 512 MB de
// Render, dos o tres lotes de guías y el proceso muere. Probado también:
// `useSystemFonts: false` no cambia nada, y `MALLOC_ARENA_MAX=2` lo empeora.
//
// 🔑 LA SALIDA: cuando un PROCESO termina, el sistema recupera el 100% de lo que
// tenía, incluido todo lo que una librería nativa se negó a soltar. Así que el
// parseo se hace en un proceso hijo que se muere al terminar, y el bot recibe
// solo el texto ya extraído. Medido, 3 lotes seguidos:
//
//     pdfjs dentro del bot:   +71 MB cada lote
//     en un proceso aparte:    +1 MB en total
//
// El costo es ~300 ms de arranque del hijo, una vez por PDF subido. El dueño
// sube PDFs a mano unas veces al día: no se nota.
//
// ⚠️ Si el hijo no puede arrancar, se cae con gracia al parseo de siempre y se
// avisa en el log. Es mejor un bot que gasta memoria que un bot que no puede
// mandar las guías.
// ============================================================================
async function lineasPorPagina(buffer) {
  try {
    return await lineasEnProcesoAparte(buffer);
  } catch (e) {
    console.error(
      `⚠️ No se pudo leer el PDF en un proceso aparte (${e.message}). ` +
        "Se lee en el proceso del bot, que deja ~71 MB sin devolver al sistema."
    );
    return await lineasEnEsteProceso(buffer);
  }
}

/**
 * Lanza el worker, le pasa el PDF por un archivo temporal y lee el resultado de
 * otro archivo temporal.
 *
 * ⚠️ POR QUÉ ARCHIVOS Y NO stdout: cualquier `console.log` de un módulo que el
 * worker cargue —hoy o dentro de tres meses— se mezclaría con el JSON y lo
 * volvería ilegible. Con un archivo de salida, lo que el worker imprima es
 * irrelevante. Es la misma clase de trampa que el parser del export, donde un
 * bloque multilínea se pegaba a los mensajes.
 */
function lineasEnProcesoAparte(buffer) {
  const { fork } = require("child_process");
  const fs = require("fs");
  const os = require("os");
  const path = require("path");

  const base = fs.mkdtempSync(path.join(os.tmpdir(), "guias-"));
  const entrada = path.join(base, "entrada.pdf");
  const salida = path.join(base, "salida.json");
  fs.writeFileSync(entrada, buffer);

  const limpiar = () => {
    try {
      fs.rmSync(base, { recursive: true, force: true });
    } catch {}
  };

  return new Promise((resolve, reject) => {
    const hijo = fork(path.join(__dirname, "leer-pdf-worker.js"), [entrada, salida], {
      silent: true,
    });
    let error = "";
    if (hijo.stderr) hijo.stderr.on("data", (d) => (error += d));

    // Un PDF corrupto podría dejar a pdfjs dando vueltas para siempre, y el
    // dueño se quedaría mirando una pantalla que no responde. Con el tope, a los
    // 2 minutos cae al camino de siempre y las guías igual salen.
    const reloj = setTimeout(() => {
      hijo.kill("SIGKILL");
      reject(new Error("el worker del PDF tardó más de 2 minutos"));
    }, 120000);

    hijo.on("error", (e) => {
      clearTimeout(reloj);
      limpiar();
      reject(e);
    });

    hijo.on("close", (code) => {
      clearTimeout(reloj);
      if (code !== 0) {
        limpiar();
        return reject(new Error(`el worker salió con código ${code}: ${error.slice(0, 300)}`));
      }
      try {
        const paginas = JSON.parse(fs.readFileSync(salida, "utf8"));
        limpiar();
        resolve(paginas);
      } catch (e) {
        limpiar();
        reject(new Error(`no se pudo leer la salida del worker: ${e.message}`));
      }
    });
  });
}

/** El parseo de siempre, tal cual. Lo usa el worker, y es la red de seguridad
 *  si el worker no puede arrancar. */
async function lineasEnEsteProceso(buffer) {
  // Import dinámico: pdfjs es ESM y este proyecto es CommonJS. Además así el
  // bot arranca aunque nadie vaya a usar las guías en esa ejecución.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
    isEvalSupported: false, // no ejecutar nada que venga dentro del PDF
  }).promise;

  const paginas = [];
  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const contenido = await page.getTextContent();
      const filas = new Map(); // Y redondeada -> pedazos de texto
      for (const item of contenido.items) {
        if (!item.str || !item.str.trim()) continue;
        const y = Math.round((item.transform?.[5] ?? 0) / 3) * 3; // tolerancia
        if (!filas.has(y)) filas.set(y, []);
        filas.get(y).push({ x: item.transform?.[4] ?? 0, str: item.str });
      }
      const lineas = [...filas.entries()]
        .sort((a, b) => b[0] - a[0]) // de arriba hacia abajo
        .map(([, pedazos]) =>
          pedazos.sort((a, b) => a.x - b.x).map((p) => p.str).join(" ").replace(/\s+/g, " ").trim()
        )
        .filter(Boolean);
      paginas.push(lineas);
      page.cleanup();
    }
  } finally {
    await doc.destroy();
  }
  return paginas;
}

/** Parte el PDF en un PDF de una sola hoja por cada página. */
async function partirHojas(buffer) {
  const origen = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const hojas = [];
  for (let i = 0; i < origen.getPageCount(); i++) {
    const nuevo = await PDFDocument.create();
    const [pagina] = await nuevo.copyPages(origen, [i]);
    nuevo.addPage(pagina);
    hojas.push(Buffer.from(await nuevo.save()));
  }
  return hojas;
}

/**
 * Saca de una etiqueta los datos con los que se puede identificar al cliente.
 *
 * Funciona con Interrapidísimo, Servientrega y Coordinadora porque no depende
 * del formato exacto: busca rótulos y, si no los encuentra, usa el texto
 * completo como red.
 */
// ============================================================================
// 📮 EL REMITENTE PUEDEN SER VARIOS NÚMEROS — 30-sep
//
// DE DÓNDE SALE: el dueño movió los avisos del bot a su celular personal. Y acá
// se usaba ESA MISMA variable (OWNER_WHATSAPP) para otra cosa completamente
// distinta: saber qué teléfono va impreso como remitente en la etiqueta, para NO
// confundirlo con el del cliente.
//
// 🔑 SON DOS COSAS QUE NO TIENEN POR QUÉ SER EL MISMO NÚMERO. Si el aviso va al
// personal pero la etiqueta sigue impresa con el de BikerPro, el filtro deja de
// reconocerlo y el número de BikerPro entra como si fuera un teléfono del
// destinatario. Eso ensucia el pareo de guías: es el mismo terreno del
// "mejor coincidencia 45 de 50", donde un teléfono vale 50 puntos.
//
// Así que se aceptan VARIOS, separados por coma. Excluir un número propio de más
// no cuesta nada —nunca va a ser el de un cliente—, y olvidarse de uno sí cuesta.
// ============================================================================

/** Los teléfonos propios que van impresos en la etiqueta, como set de 10 dígitos. */
function telefonosRemitente(valor) {
  const lista = Array.isArray(valor) ? valor : String(valor == null ? "" : valor).split(/[,;]/);
  const set = new Set();
  for (const v of lista) {
    const t = tel10(v);
    if (t) set.add(t);
  }
  return set;
}

function extraerCampos(lineas, opciones = {}) {
  const remitentes = telefonosRemitente(opciones.telefonoRemitente);
  const texto = lineas.join(" \n ");
  const plano = normalizar(texto);

  // --- Número de guía ---
  // Primero por rótulo. Los formatos vistos en los exports:
  //   interrapidisimo 240061604892 (12) · coordinadora 64532761837 (11)
  //   servientrega 2220956331 (10, arranca en 2 así que no choca con celulares)
  let guia = null;
  const porRotulo = plano.match(/GU[IÍ]A\s*(?:NO|N|NRO|NUM(?:ERO)?|#)?\s*\.?\s*:?\s*(\d{9,14})/);
  if (porRotulo) {
    guia = porRotulo[1];
  } else {
    // Red: el número largo más probable, descartando celulares (10 dígitos que
    // empiezan en 3) y el teléfono del remitente.
    const candidatos = [...plano.matchAll(/\b(\d{9,14})\b/g)]
      .map((m) => m[1])
      .filter((n) => !(n.length === 10 && n.startsWith("3")))
      .filter((n) => !remitentes.has(tel10(n)));
    guia = candidatos.sort((a, b) => b.length - a.length)[0] || null;
  }

  // --- Teléfonos del destinatario ---
  // Todos los celulares colombianos de la etiqueta MENOS el del remitente
  // (BikerPro va impreso como remitente y es un 10 dígitos igual que el resto).
  //
  // 🔴 28-SEP: ANTES SOLO SE BUSCABA /\b(3\d{9})\b/, Y ESO PIERDE EL TELÉFONO EN
  // TRES FORMATOS QUE LAS TRANSPORTADORAS IMPRIMEN TODO EL TIEMPO.
  //
  // Reproducido, las tres se quedaban sin teléfono:
  //   "315 555 1234"   normalizar() CONSERVA los espacios, así que no matchea
  //   "315-555-1234"   y también conserva los guiones
  //   "573155551234"   el \b de adelante lo rompe el "57" pegado
  //
  // Y un teléfono vale 50 puntos: es la señal que por sí sola alcanza el mínimo.
  // Perderlo es la diferencia entre enviar la guía y dejar al cliente esperando.
  const telefonos = new Set();
  const agregarTel = (crudo) => {
    const t = tel10(crudo);
    // 10 dígitos que empiezan en 3: un celular colombiano. Nada más entra.
    if (!/^3\d{9}$/.test(t)) return;
    if (remitentes.has(t)) return;
    telefonos.add(t);
  };
  // 1) Pegado, con o sin indicativo: 3155551234 · 573155551234 · 5713155551234
  for (const m of plano.matchAll(/\b(?:57)?(3\d{9})\b/g)) agregarTel(m[1]);
  // 2) Partido con espacios o guiones, en los cortes que se ven en las etiquetas:
  //    315 555 1234 · 315-555-1234 · 3155 551234 · 315 5551234
  for (const m of plano.matchAll(/(?:^|[^0-9])(?:57[\s-]?)?(3\d{2}[\s-]\d{3}[\s-]?\d{4}|3\d{2}[\s-]\d{7}|3\d{3}[\s-]\d{6})(?![0-9])/g)) {
    agregarTel(m[1]);
  }

  // --- Nombre del destinatario ---
  // Del rótulo si está; si no, queda null y el emparejamiento se apoya en que
  // el nombre del pedido aparezca en cualquier parte del texto.
  let nombre = null;
  const mNombre =
    texto.match(/DESTINATARIO\s*:?\s*([^\n]+)/i) ||
    texto.match(/(?:SE[ÑN]OR(?:A)?|RECIBE|CLIENTE)\s*:?\s*([^\n]+)/i);
  if (mNombre) {
    nombre = normalizar(mNombre[1]).replace(/\b(DIRECCION|TEL(?:EFONO)?|CIUDAD).*$/, "").trim() || null;
  }

  // --- Dirección ---
  let direccion = null;
  const mDir = texto.match(/DIRECCI[OÓ]N\s*:?\s*([^\n]+)/i);
  if (mDir) direccion = normalizar(mDir[1]).replace(/\b(CIUDAD|TEL(?:EFONO)?|DEPTO).*$/, "").trim() || null;

  // --- Ciudad ---
  let ciudad = null;
  const mCiudad = texto.match(/(?:CIUDAD|DESTINO)\s*:?\s*([^\n]+)/i);
  if (mCiudad) ciudad = normalizar(mCiudad[1]).replace(/\b(DEPTO|DEPARTAMENTO|TEL(?:EFONO)?).*$/, "").trim() || null;

  return {
    guia,
    telefonos: [...telefonos],
    nombre,
    direccion,
    ciudad,
    // Los números de la dirección si la encontramos; si no, de toda la etiqueta.
    numeros: numerosDireccion(direccion || plano),
    plano,
  };
}

// ============================================================================
// EMPAREJAR UNA ETIQUETA CON UN PEDIDO
// ============================================================================

/**
 * Puntúa qué tan seguro es que esta etiqueta sea de este pedido.
 * @returns {{puntos:number, senales:string[]}}
 */
function puntuar(campos, pedido) {
  let puntos = 0;
  const senales = [];

  // --- Teléfonos (50 cada uno) ---
  const telPedido = tel10(pedido.celular);
  // Si el chat es un BSUID no hay teléfono que comparar: se ignora en vez de
  // convertirlo en dígitos, que sería un número falso.
  const telChat = esBsuid(pedido.telefono_chat) ? "" : tel10(pedido.telefono_chat);
  const enEtiqueta = (t) => t && campos.telefonos.includes(t);

  if (enEtiqueta(telPedido)) {
    puntos += PESOS.celularPedido;
    senales.push("celular del pedido");
  }
  // Solo suma si es OTRO número: si el cliente dio su mismo WhatsApp, es una
  // sola señal, no dos. Contarla doble infla la certeza sin más evidencia.
  if (enEtiqueta(telChat) && telChat !== telPedido) {
    puntos += PESOS.celularWhatsapp;
    senales.push("número de WhatsApp");
  }

  // --- Nombre (hasta 45, repartido entre sus palabras) ---
  // Se busca en TODA la etiqueta, no solo en el rótulo del destinatario: hay
  // formatos donde el nombre aparece en el remitente de la contraentrega.
  const palabras = palabrasNombre(pedido.nombre);
  if (palabras.length) {
    const donde = campos.nombre ? normalizar(campos.nombre) + " " + campos.plano : campos.plano;
    const halladas = palabras.filter((p) => new RegExp(`\\b${p}\\b`).test(donde));
    if (halladas.length) {
      puntos += Math.round((PESOS.nombre * halladas.length) / palabras.length);
      senales.push(
        halladas.length === palabras.length
          ? "nombre"
          : `nombre parcial (${halladas.length}/${palabras.length})`
      );
    }
  }

  // --- Números de la dirección (hasta 40) ---
  const numsPedido = numerosDireccion(pedido.direccion);
  if (numsPedido.size) {
    const coinciden = [...numsPedido].filter((n) => campos.numeros.has(n));
    if (coinciden.length) {
      // ⚠️ Un solo número que coincide vale la mitad: "calle 80" coincide con
      // cualquier dirección que tenga un 80 en cualquier parte. Dos o más ya
      // es una dirección, no una casualidad.
      const proporcion = coinciden.length / numsPedido.size;
      const bruto = PESOS.direccion * proporcion;
      puntos += Math.round(coinciden.length === 1 ? Math.min(bruto, PESOS.direccion / 2) : bruto);
      senales.push(`dirección ${coinciden.join("-")}`);
    }
  }

  // --- Ciudad (10) ---
  // Vale poco a propósito: Bogotá es ~30% de los pedidos, así que coincidir en
  // ciudad casi no informa. Sirve de desempate, no de prueba.
  //
  // 🔑 TODAS las palabras del municipio, no solo la primera: ver palabrasCiudad.
  // Con solo la primera, "La Playa" no se comparaba nunca porque "LA" tiene 2
  // letras, y eso dejó la guía de un cliente real en 45 de 50.
  const palabrasDeCiudad = palabrasCiudad(pedido.ciudad);
  if (palabrasDeCiudad.length) {
    // Se busca en el rótulo de ciudad si existe, y también en toda la etiqueta:
    // hay formatos donde el municipio va pegado al departamento o a la oficina.
    const donde = campos.ciudad ? normalizar(campos.ciudad) + " " + campos.plano : campos.plano;
    const cual = palabrasDeCiudad.find((p) => new RegExp(`\\b${p}\\b`).test(donde));
    if (cual) {
      puntos += PESOS.ciudad;
      senales.push("ciudad");
    }
  }

  return { puntos, senales };
}

/**
 * Explica QUÉ señal faltó para llegar al mínimo.
 *
 * 🔴 POR QUÉ EXISTE (28-sep). El mensaje era "no corresponde a ningún pedido
 * (mejor coincidencia 45 de 50 necesarios)". El dueño lo leyó y preguntó, con
 * razón: "no sé por qué, como que no la reconoce". Ese texto no dice CONTRA
 * QUIÉN casi coincidió ni QUÉ le faltó, así que no hay nada que hacer con él.
 *
 * Ahora dice las dos cosas, y con eso se arregla el dato en el pedido y la
 * próxima vez cruza solo.
 */
function porQueNoAlcanzo(campos, mejor) {
  if (!mejor || !mejor.pedido) return "";
  const p = mejor.pedido;
  const faltas = [];
  const tiene = (s) => (mejor.senales || []).some((x) => x.startsWith(s));

  if (!tiene("celular del pedido") && !tiene("número de WhatsApp")) {
    const suyos = [tel10(p.celular), esBsuid(p.telefono_chat) ? "" : tel10(p.telefono_chat)]
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
    faltas.push(
      campos.telefonos.length
        ? `el teléfono de la etiqueta (${campos.telefonos.join(", ")}) no es el del pedido (${suyos.join(" ni ") || "el pedido no tiene teléfono"})`
        : "en la etiqueta no se pudo leer ningún celular"
    );
  }
  if (!tiene("nombre")) faltas.push("el nombre del pedido no aparece en la etiqueta");
  else if (tiene("nombre parcial")) faltas.push("el nombre coincide solo en parte");

  if (!tiene("dirección")) {
    faltas.push(
      numerosDireccion(p.direccion).size
        ? "los números de la dirección no coinciden"
        : "el pedido no tiene dirección guardada (normal si va a una oficina)"
    );
  }
  if (!tiene("ciudad")) {
    faltas.push(
      palabrasCiudad(p.ciudad).length
        ? `la ciudad del pedido (${p.ciudad}) no aparece en la etiqueta`
        : "el pedido no tiene ciudad guardada"
    );
  }
  return faltas.length ? ". Le faltó: " + faltas.join("; ") : "";
}

/**
 * Elige el pedido de esta etiqueta, o explica por qué no se puede.
 * @returns {{pedido:object|null, certeza:number, senales:string[], motivo:string|null, segundo:number, mejores:Array}}
 */
function emparejar(campos, pedidos) {
  const puntajes = pedidos
    .map((pedido) => ({ pedido, ...puntuar(campos, pedido) }))
    .sort((a, b) => b.puntos - a.puntos);

  const mejor = puntajes[0];
  const segundo = puntajes[1]?.puntos || 0;

  // Los 3 más parecidos, para que el panel pueda ofrecerlos y el dueño elija a
  // mano cuando el pareo automático no alcanza. Sin esto, una guía que no cruza
  // no tiene ninguna salida: es lo que le pasó con la de Henry Mendoza.
  const mejores = puntajes
    .filter((p) => p.puntos > 0)
    .slice(0, 3)
    .map((p) => ({ pedidoId: p.pedido.id || p.pedido.fecha, puntos: p.puntos, senales: p.senales }));

  if (!mejor || mejor.puntos < MINIMO) {
    return {
      pedido: null,
      certeza: mejor ? Math.min(100, mejor.puntos) : 0,
      senales: mejor?.senales || [],
      segundo,
      mejores,
      motivo: !pedidos.length
        ? "no hay pedidos guardados contra los que comparar"
        : // 🔑 Con 0 puntos NO se nombra a nadie. Decir "el más parecido es Jorge"
          // cuando Jorge no coincide en nada es peor que no decir nada: manda al
          // dueño a mirar un pedido que no tiene relación con esta etiqueta.
          !mejor || mejor.puntos === 0
          ? "Esta etiqueta no se parece a ningún pedido guardado: ni el nombre, ni el " +
            "teléfono, ni la ciudad. Puede ser un despacho que no pasó por el bot. " +
            "Si sabés de quién es, asignala abajo."
          : `El más parecido es ${mejor.pedido?.nombre || "?"} con ${mejor.puntos} de ` +
            `${MINIMO} puntos, así que no se envía solo` +
            porQueNoAlcanzo(campos, mejor) +
            ". Si sabés de quién es, asignala abajo.",
    };
  }

  if (mejor.puntos - segundo < MARGEN) {
    // Los que quedaron empatados con el mejor.
    const enEmpate = puntajes.filter((p) => p.puntos >= MINIMO && mejor.puntos - p.puntos < MARGEN);

    // ⚠️ MATIZ QUE EVITA BLOQUEOS INÚTILES: el empate es peligroso cuando son
    // PERSONAS DISTINTAS. Si el mismo cliente hizo dos pedidos (pidió otra
    // talla, o uno para un amigo), sus dos pedidos empatan siempre — y ahí
    // mandar la guía al único teléfono que tienen los dos no filtra nada a
    // nadie: es la misma persona. Se permite, y se deja anotado.
    const destinos = new Set(enEmpate.map((p) => tel10(destinoDe(p.pedido))).filter(Boolean));
    if (destinos.size === 1) {
      return {
        pedido: mejor.pedido,
        certeza: Math.min(100, mejor.puntos),
        senales: [...mejor.senales, `empate con otro pedido del mismo cliente (${enEmpate.length})`],
        segundo,
        motivo: null,
      };
    }

    const empatados = enEmpate.slice(0, 3).map((p) => p.pedido.nombre || p.pedido.celular).join(" / ");
    return {
      pedido: null,
      certeza: Math.min(100, mejor.puntos),
      senales: mejor.senales,
      segundo,
      mejores,
      motivo:
        `empate entre ${empatados} (${mejor.puntos} vs ${segundo}). ` +
        "No se envía solo: mandarle a un cliente la dirección y el teléfono de otro es filtrar " +
        "datos personales. Si sabés cuál es, asignala abajo.",
    };
  }

  return {
    pedido: mejor.pedido,
    certeza: Math.min(100, mejor.puntos),
    senales: mejor.senales,
    segundo,
    mejores,
    motivo: null,
  };
}

// ============================================================================
// PROCESAR EL PDF COMPLETO
// ============================================================================

/**
 * Parte el PDF, empareja cada hoja y devuelve el plan de envío SIN ENVIAR NADA.
 * El panel lo muestra para que el dueño lo revise antes de confirmar.
 *
 * @param {Buffer} buffer PDF con todas las etiquetas
 * @param {Array<object>} pedidos los pedidos guardados
 * @param {{telefonoRemitente?:string, yaEnviada?:(guia:string)=>object|null}} opciones
 */
async function procesarPDF(buffer, pedidos, opciones = {}) {
  // ==========================================================================
  // 🧠 UNA COSA A LA VEZ, NO LAS DOS — 30-sep (correo de Render: "exceeded its
  // memory limit")
  //
  // Acá había un Promise.all. Las dos funciones cargan el PDF ENTERO en memoria
  // —`lineasPorPagina` para leer el texto y `partirHojas` para cortarlo— y con
  // Promise.all los dos árboles de objetos de pdf-lib viven AL MISMO TIEMPO.
  //
  // 🔑 Y NO SE GANABA NADA. Node es de un solo hilo y esto es trabajo de CPU, no
  // de red: Promise.all no lo hace más rápido, solo hace que el pico de memoria
  // sea el doble. Secuencial, el primero se libera antes de que arranque el
  // segundo.
  //
  // Un PDF de 40 hojas con fotos pesa decenas de MB, y pdf-lib en memoria ocupa
  // varias veces lo que el archivo. Ese pico es lo que tira la instancia.
  // ==========================================================================
  const paginas = await lineasPorPagina(buffer);
  const hojas = await partirHojas(buffer);

  const filas = [];
  const guiasVistas = new Map();

  for (let i = 0; i < hojas.length; i++) {
    const lineas = paginas[i] || [];
    const campos = extraerCampos(lineas, opciones);
    const fila = {
      pagina: i + 1,
      guia: campos.guia,
      transportadora: transportadoraDe(campos.plano),
      etiqueta: {
        nombre: campos.nombre,
        direccion: campos.direccion,
        ciudad: campos.ciudad,
        telefonos: campos.telefonos,
      },
      hoja: hojas[i],
      pedido: null,
      certeza: 0,
      senales: [],
      motivo: null,
      enviar: false,
    };

    // Guía repetida DENTRO del mismo PDF (el dueño imprimió dos veces la misma
    // etiqueta). Mismo patrón que los pedidos duplicados del 22-sep.
    if (campos.guia && guiasVistas.has(campos.guia)) {
      fila.motivo = `la guía ${campos.guia} ya venía en la página ${guiasVistas.get(campos.guia)} de este mismo PDF`;
      // ⛔ No se ofrece asignarla a mano: es la MISMA guía de otra hoja, así que
      // asignarla sería mandarle dos veces lo mismo a alguien.
      fila.asignable = false;
      filas.push(fila);
      continue;
    }
    if (campos.guia) guiasVistas.set(campos.guia, i + 1);

    // Guía ya avisada en una corrida anterior: no se repite el mensaje.
    const previa = campos.guia && opciones.yaEnviada ? opciones.yaEnviada(campos.guia) : null;
    if (previa) {
      fila.motivo =
        `ya se le envió a ${previa.nombre || "un cliente"} el ` +
        new Date(previa.fecha).toLocaleString("es-CO", { timeZone: "America/Bogota" });
      fila.yaEnviada = previa;
      // ⛔ Tampoco: ya salió. Reenviarla confunde al cliente.
      fila.asignable = false;
      filas.push(fila);
      continue;
    }

    const r = emparejar(campos, pedidos);
    fila.pedido = r.pedido;
    fila.certeza = r.certeza;
    fila.senales = r.senales;
    fila.motivo = r.motivo;
    fila.enviar = Boolean(r.pedido);
    // Los más parecidos viajan al panel para poder asignar a mano cuando el
    // puntaje no alcanza.
    fila.mejores = r.mejores || [];
    // Se puede asignar a mano solo si NO se pudo parear sola. Las que ya tienen
    // dueño no necesitan que nadie elija.
    fila.asignable = !fila.enviar;
    filas.push(fila);
  }

  return filas;
}

/** A qué número se le manda: SIEMPRE al WhatsApp con el que habló el bot.
 *  El teléfono impreso en la etiqueta puede ser de otra persona (el que
 *  recibe), y ahí el mensaje no llegaría o llegaría a un desconocido. */
function destinoDe(pedido) {
  const chat = String(pedido.telefono_chat == null ? "" : pedido.telefono_chat).trim();
  // Cliente con username: se le responde por su BSUID, tal cual.
  if (esBsuid(chat)) return chat;
  return tel10(chat) ? digitos(chat) : digitos(pedido.celular);
}

// ============================================================================
// TRANSPORTADORA Y RASTREO
//
// ⚠️ Las tres URLs están COMPROBADAS (HTTP 200) el 22-sep-2026. Importa porque
// esto va en un mensaje a un cliente real: un link roto justo cuando está
// esperando su pedido genera una llamada al dueño, no una queja silenciosa.
//
// Interrapidísimo NO tiene página propia de rastreo: el formulario "Sigue tu
// envío" está en su home (probé /sigue-tu-envio, /rastreo, /seguimiento y otras
// seis rutas: todas 404). Por eso se manda el home y se le dice al cliente
// dónde pegar el número, en vez de inventar una ruta que devuelva 404.
// ============================================================================
const TRANSPORTADORAS = {
  interrapidisimo: {
    nombre: "Interrapidísimo",
    patron: /INTER\s*RAPIDISIMO/,
    rastreo: "https://www.interrapidisimo.com/",
    comoRastrear: 'pegá el número en "Sigue tu envío"',
  },
  servientrega: {
    nombre: "Servientrega",
    patron: /SERVIENTREGA/,
    rastreo: "https://www.servientrega.com/wps/portal/rastreo-envio",
    comoRastrear: null,
  },
  coordinadora: {
    nombre: "Coordinadora",
    patron: /COORDINADORA/,
    rastreo: "https://coordinadora.com/rastreo/rastreo-de-guia/",
    comoRastrear: null,
  },
};

/** Qué transportadora es, leído de la etiqueta. */
function transportadoraDe(plano) {
  for (const [clave, t] of Object.entries(TRANSPORTADORAS)) {
    if (t.patron.test(plano || "")) return { clave, ...t };
  }
  return null;
}

const fmtCOP = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

/**
 * El mensaje que acompaña al PDF de la guía.
 *
 * Va en el caption del documento y no en un mensaje aparte: así el cliente
 * recibe UNA notificación con todo, en vez de dos mensajes sueltos donde el
 * segundo puede llegar primero.
 */
function textoParaCliente(pedido, guia, transportadora) {
  const lineas = ["🏍️ *BikerPro* — tu pedido ya va en camino", ""];

  if (guia) lineas.push(`📦 Guía: *${guia}*`);
  if (transportadora) {
    lineas.push(`🚚 ${transportadora.nombre}`);
    lineas.push(
      `🔎 Rastrealo acá: ${transportadora.rastreo}` +
        (transportadora.comoRastrear ? ` (${transportadora.comoRastrear})` : "")
    );
  }
  lineas.push("");

  // El recaudo es lo que más consultan al recibir, y decirlo acá evita la
  // discusión con el mensajero en la puerta.
  if (String(pedido.pago || "").toLowerCase().startsWith("contra")) {
    lineas.push(`💰 Pagás *${fmtCOP(pedido.total)}* en efectivo al recibir.`);
  } else {
    lineas.push(`✅ Tu pedido de ${fmtCOP(pedido.total)} ya está pago. No tenés que pagar nada al recibir.`);
  }

  const destino = [pedido.direccion, pedido.ciudad].filter(Boolean).join(", ");
  if (destino) lineas.push(`📍 Va a: ${destino}`);

  lineas.push("", "Cualquier cosa me escribís por acá. ¡Gracias por tu compra! 🙌");
  return lineas.join("\n");
}

/** Nombre del archivo que ve el cliente en WhatsApp. */
function nombreArchivo(guia) {
  return `guia-${guia || "envio"}-bikerpro.pdf`;
}

module.exports = {
  PESOS, MINIMO, MARGEN, TRANSPORTADORAS,
  normalizar, tel10, numerosDireccion, palabrasNombre, palabrasCiudad,
  porQueNoAlcanzo, lineasPorPagina, partirHojas, extraerCampos, telefonosRemitente,
  // Exportada SOLO para que `leer-pdf-worker.js` la invoque. El resto del código
  // usa `lineasPorPagina`, que es la que manda el trabajo al proceso aparte.
  lineasEnEsteProceso,
  puntuar, emparejar, procesarPDF, destinoDe,
  transportadoraDe, textoParaCliente, nombreArchivo,
};
