// Catálogo de fotos/videos que el bot puede enviar.
// URLs públicas (GitHub Pages). Se pueden sobreescribir con variables de entorno.
//
// 🔴 ARREGLO 1 (21-sep) — TODAS LAS FOTOS DABAN 404.
// El BASE apuntaba a `/assets/productos`, que es la carpeta del REPO. Pero
// GitHub Pages publica desde `docs/`, así que la URL pública es `/img/`.
// Se detectó porque un cliente escribió "Tienes fotos" y Meta respondió
// `code 131053 · Media upload error · http code 404`.
//
// 🔴 ARREGLO 2 (21-sep) — LAS FOTOS ERAN GENERADAS POR IA.
// `producto.png`, `modelo.png`, `colores.png`, `rojo.png`, `verde.png` y
// `negro.png` son imágenes de IA (`Gemini_Generated_Image_*`), no fotos del
// producto real. El dueño lo vio en el chat: pidió "Fotos" y le llegó un
// render. Se corrigió el catálogo de Commerce Manager pero NO este archivo,
// así que el bot siguió mandando los renders un rato más.
// 🔑 LECCIÓN: el catálogo de WhatsApp y estas fotos sueltas son DOS sistemas
// distintos. Arreglar uno no arregla el otro. Si se cambian las fotos, hay que
// tocar los dos.
//
// ⚠️ REGLA: una foto nueva va en `docs/img/` (no alcanza `assets/`) y hay que
// verificar la URL con curl antes de confiar en ella.
const BASE = "https://mtavera99.github.io/impermeables/img";

const MEDIA = {
  // 🌈 LOS COLORES DE LA FRANJA — la foto real de las 6 variantes.
  // Color es el 10,3% de las preguntas del export: la segunda duda más
  // frecuente después de la talla. Esta foto la responde de una.
  colores: {
    type: "image",
    url: process.env.MEDIA_COLORES || `${BASE}/franjas-colores.jpg`,
    caption:
      "🌈 El impermeable es negro y eliges el color de la franja reflectiva: blanco, negro, rojo, verde, morado o azul. ¿Cuál te gusta?",
  },

  // El conjunto puesto, en la calle. Foto real, con la franja roja.
  producto: {
    type: "image",
    url: process.env.MEDIA_PRODUCTO || `${BASE}/conjunto-calle.jpg`,
    caption:
      "🏍️ Tu conjunto impermeable de 4 piezas: chaqueta con capota, pantalón, zapatones y bolsa. PVC siliconado calibre 8, termosellado. El impermeable es negro y la franja reflectiva la eliges en color.",
  },

  // Así se ve puesto (espalda, se aprecia la franja reflectiva).
  modelo: {
    type: "image",
    url: process.env.MEDIA_MODELO || `${BASE}/conjunto-espalda.jpg`,
    caption: "🧍 Así se ve puesto, y así te ven de noche los carros 🏍️",
  },

  // ⚠️ NO hay foto real individual de cada color: la única toma por color es la
  // cuadrícula. Antes existían rojo.png / verde.png / negro.png, pero eran
  // recortes de la imagen de IA. Se prefiere mandar la foto real de las 6
  // variantes que un render del color exacto.
  rojo: {
    type: "image",
    url: process.env.MEDIA_ROJO || `${BASE}/conjunto-calle.jpg`,
    caption: "🔴 Este es con la franja ROJA (el conjunto es negro). ¿Te gusta este?",
  },
  verde: {
    type: "image",
    url: process.env.MEDIA_VERDE || `${BASE}/franjas-colores.jpg`,
    caption: "🟢 Acá están los 6 colores de franja, el verde es uno de ellos. ¿Cuál preferís?",
  },
  negro: {
    type: "image",
    url: process.env.MEDIA_NEGRO || `${BASE}/franjas-colores.jpg`,
    caption: "⚫ Acá están los 6 colores de franja, incluido el negro sobre negro. ¿Cuál preferís?",
  },

  // ---- Los otros productos del catálogo ----
  colmena: {
    type: "image",
    url: process.env.MEDIA_COLMENA || `${BASE}/colmena-estudio.jpg`,
    caption:
      "✨ El Colmena Premium: lleva FORRO INTERNO, que es su diferencia con el tradicional. La tela tiene la textura tipo colmena y el pantalón trae cierre en el tobillo. Sale $149.900 con el envío YA incluido.",
  },
  reflectiva: {
    type: "image",
    url: process.env.MEDIA_REFLECTIVA || `${BASE}/reflectiva-noche.jpg`,
    caption:
      "🌟 La chaqueta reflectiva doble faz, así se ve de noche cuando le pega la luz de un carro. $119.900 + envío.",
  },
  guantes: {
    type: "image",
    url: process.env.MEDIA_GUANTES || `${BASE}/guantes-city.jpg`,
    caption:
      "🧤 Guantes CITY, $49.900 + envío. Si los llevas con el impermeable van en el mismo paquete y pagas un solo envío.",
  },

  video: {
    type: "video",
    url: process.env.MEDIA_VIDEO || "",
    caption: "💧 Míralo en acción.",
  },

  // ==========================================================================
  // 🎧 INTERCOMUNICADOR V10 2X
  //
  // 🔴 POR QUÉ ESTO ERA URGENTE (28-sep, campaña ya encendida). Lo reproduje: un
  // cliente que venía del anuncio del intercomunicador escribía "¿me manda
  // fotos?" y recibía **la foto del conjunto impermeable**, con el caption del
  // impermeable ("4 piezas, chaqueta con capota, pantalón, zapatones…").
  //
  // La causa: `detectMediaIntent` no sabía de productos. Su última regla es "si
  // pidió ver algo y no reconocí qué, mandá la foto del producto", y "el
  // producto" era siempre el impermeable.
  //
  // 🔑 Y LO IMPORTANTE: mientras no haya archivos de verdad, estas entradas NO se
  // ofrecen. Ver `disponible()` más abajo. Es mejor que el bot diga "te la
  // comparto enseguida" que mandar la foto de otro producto: lo segundo confunde
  // al cliente y hace que desconfíe de todo lo demás que le dijimos.
  // ==========================================================================
  v10: {
    type: "image",
    base: "v10-producto",
    env: "MEDIA_V10",
    caption:
      "🎧 El intercomunicador V10 2X. Se monta en el casco y te sirve para hablar de casco a casco " +
      "con tu acompañante, escuchar música, las indicaciones del GPS y contestar llamadas.",
  },
  v10_puesto: {
    type: "image",
    base: "v10-puesto",
    env: "MEDIA_V10_PUESTO",
    caption: "🪖 Así queda montado en el casco 🏍️",
  },
  v10_combo: {
    type: "image",
    base: "v10-combo",
    env: "MEDIA_V10_COMBO",
    caption: "🎧🎧 El combo de 2, que es el de la promoción: uno para ti y uno para tu acompañante.",
  },
  v10_contenido: {
    type: "image",
    base: "v10-contenido",
    env: "MEDIA_V10_CONTENIDO",
    caption: "📦 Esto es lo que viene en la caja.",
  },
  // La caja cerrada. Sirve cuando preguntan por el modelo o si es original: se ve
  // el nombre del producto impreso. Es una de las cuatro fotos que mandó el dueño.
  v10_caja: {
    type: "image",
    base: "v10-caja",
    env: "MEDIA_V10_CAJA",
    caption: "📦 Así viene presentado, es el modelo V10 2X.",
  },
};

// ============================================================================
// 📸 ¿ESTA FOTO EXISTE DE VERDAD?
//
// 🔴 DE DÓNDE SALE LA NECESIDAD. El 21-sep TODAS las fotos daban 404 durante un
// rato: el BASE apuntaba a la carpeta del repo y GitHub Pages publica desde
// `docs/`. Un cliente pedía "Tienes fotos" y Meta respondía
// `code 131053 · Media upload error · http code 404`. El cliente no recibía nada
// y nadie se enteraba.
//
// 🔑 Para las fotos nuevas eso no puede volver a pasar, así que se comprueba que
// el ARCHIVO EXISTA en `docs/img/` antes de ofrecer la foto. Como GitHub Pages
// publica esa carpeta tal cual, si el archivo está en el repo la URL funciona.
//
// Y si la foto no está todavía, la clave simplemente no se ofrece: el bot no
// manda nada en vez de mandar la de otro producto. Es exactamente el caso de hoy
// —la campaña arrancó antes de que estén las fotos— y así el error más caro
// (mandarle un impermeable a quien pregunta por un intercomunicador) no puede
// ocurrir.
//
// ⚠️ Una URL puesta por variable de entorno se acepta sin comprobar: si alguien
// la configuró a mano, es porque sabe dónde está la imagen (puede estar en otro
// servidor). Lo que se comprueba es el archivo del repo.
// ============================================================================
const fs = require("fs");
const path = require("path");

// docs/img visto desde bot/src → ../../docs/img
const CARPETA_IMG = path.join(__dirname, "..", "..", "docs", "img");

// ----------------------------------------------------------------------------
// 🔴 LA EXTENSIÓN DEL ARCHIVO NO PUEDE ROMPER EL ENVÍO (29-sep)
//
// LO QUE PASÓ. El dueño subió las 5 fotos del intercomunicador renombrándolas
// como le pedí, y llegaron así:
//
//     v10-producto.jpg.PNG      ← extensión doble
//     v10-combo.jpg.png
//     v10-puesto.jpg.PNG
//
// Al renombrar en el Finder, el sistema conserva la extensión original y queda
// pegada al nombre nuevo. El bot buscaba `v10-producto.jpg` EXACTO, no lo
// encontraba, y no ofrecía ninguna foto. Las fotos estaban en el repo y el bot
// seguía diciendo "no tengo la foto a mano".
//
// 🔑 Y ESTO VA A VOLVER A PASAR. El dueño no es técnico y no tiene por qué pelear
// con extensiones: ".PNG" en mayúscula, ".jpeg" en vez de ".jpg", una extensión
// doble. Así que el catálogo declara el nombre SIN extensión y acá se busca el
// archivo que empiece con ese nombre y sea una imagen. El que esté, sirve.
//
// La URL se arma con el nombre REAL encontrado, que es lo que importa: si el
// archivo se llama `v10-puesto.png`, la URL tiene que decir `.png` o Meta recibe
// un 404 — el error del 21-sep, cuando todas las fotos fallaban en silencio.
// ----------------------------------------------------------------------------
const EXTENSIONES_DE_IMAGEN = [".jpg", ".jpeg", ".png", ".webp"];

const cacheArchivo = new Map();

/** El archivo real que corresponde a un nombre base, o null si no hay ninguno. */
function archivoReal(nombreBase) {
  if (!nombreBase) return null;
  if (cacheArchivo.has(nombreBase)) return cacheArchivo.get(nombreBase);

  let hallado = null;
  try {
    const archivos = fs.readdirSync(CARPETA_IMG);
    const base = String(nombreBase).toLowerCase();
    // Se prefiere la coincidencia exacta con una extensión limpia; si no hay, se
    // acepta cualquier cosa que empiece con el nombre base y termine en imagen
    // (ahí entran las extensiones dobles tipo "v10-puesto.jpg.PNG").
    hallado =
      archivos.find((a) => {
        const l = a.toLowerCase();
        return EXTENSIONES_DE_IMAGEN.some((e) => l === base + e);
      }) ||
      archivos.find((a) => {
        const l = a.toLowerCase();
        return l.startsWith(base + ".") && EXTENSIONES_DE_IMAGEN.some((e) => l.endsWith(e));
      }) ||
      null;
  } catch {
    hallado = null;
  }

  cacheArchivo.set(nombreBase, hallado);
  return hallado;
}

function disponible(clave) {
  const m = MEDIA[clave];
  if (!m) return false;

  // Si hay URL puesta a mano por variable de entorno, se confía: quien la
  // configuró sabe dónde está la imagen y puede estar en otro servidor.
  if (m.env && process.env[m.env]) return true;

  // Sin nombre base declarado = foto vieja del impermeable, ya comprobada en
  // producción. No se toca: cambiarles el comportamiento sería arriesgar lo que
  // funciona.
  if (!m.base) return Boolean(m.url);

  const archivo = archivoReal(m.base);
  if (!archivo) {
    console.warn(
      `📸 No hay ninguna foto "${m.base}.*" en docs/img/, así que "${clave}" NO se va a ofrecer. ` +
        `Subí el archivo (cualquier extensión de imagen sirve) y aparece sola.`
    );
    return false;
  }
  return true;
}

/**
 * La foto lista para enviar: type, url REAL y caption.
 *
 * 🔑 Es el único lugar donde se decide la URL. Sin esto, cada quien armaba la
 * suya y una diferencia de extensión se convertía en un 404 silencioso.
 */
function resolver(clave) {
  const m = MEDIA[clave];
  if (!m) return null;
  if (m.env && process.env[m.env]) {
    return { type: m.type, url: process.env[m.env], caption: m.caption };
  }
  if (!m.base) return m.url ? { type: m.type, url: m.url, caption: m.caption } : null;

  const archivo = archivoReal(m.base);
  if (!archivo) return null;
  return { type: m.type, url: `${BASE}/${archivo}`, caption: m.caption };
}

/** Filtra una lista de claves dejando solo las que tienen foto de verdad. */
function soloDisponibles(claves) {
  return (claves || []).filter((k) => disponible(k));
}

/** Las fotos que faltan, para poder avisarlo en el panel o en un log. */
function fotosFaltantes() {
  return Object.entries(MEDIA)
    .filter(([clave, m]) => m.base && !disponible(clave))
    .map(([clave, m]) => ({ clave, base: m.base }));
}

/** Se usa en las pruebas, que crean y borran archivos. */
function olvidarCache() {
  cacheArchivo.clear();
}

module.exports = {
  MEDIA,
  disponible,
  resolver,
  soloDisponibles,
  fotosFaltantes,
  archivoReal,
  olvidarCache,
  CARPETA_IMG,
  EXTENSIONES_DE_IMAGEN,
};
