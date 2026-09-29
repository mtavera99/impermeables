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
    url: process.env.MEDIA_V10 || `${BASE}/v10-producto.jpg`,
    archivo: "v10-producto.jpg",
    caption:
      "🎧 El intercomunicador V10 2X. Se monta en el casco y te sirve para hablar de casco a casco " +
      "con tu acompañante, escuchar música, las indicaciones del GPS y contestar llamadas.",
  },
  v10_puesto: {
    type: "image",
    url: process.env.MEDIA_V10_PUESTO || `${BASE}/v10-puesto.jpg`,
    archivo: "v10-puesto.jpg",
    caption: "🪖 Así queda montado en el casco 🏍️",
  },
  v10_combo: {
    type: "image",
    url: process.env.MEDIA_V10_COMBO || `${BASE}/v10-combo.jpg`,
    archivo: "v10-combo.jpg",
    caption: "🎧🎧 El combo de 2, que es el de la promoción: uno para ti y uno para tu acompañante.",
  },
  v10_contenido: {
    type: "image",
    url: process.env.MEDIA_V10_CONTENIDO || `${BASE}/v10-contenido.jpg`,
    archivo: "v10-contenido.jpg",
    caption: "📦 Esto es lo que viene en la caja.",
  },
  // La caja cerrada. Sirve cuando preguntan por el modelo o si es original: se ve
  // el nombre del producto impreso. Es una de las cuatro fotos que mandó el dueño.
  v10_caja: {
    type: "image",
    url: process.env.MEDIA_V10_CAJA || `${BASE}/v10-caja.jpg`,
    archivo: "v10-caja.jpg",
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

const cacheDisponible = new Map();

function disponible(clave) {
  const m = MEDIA[clave];
  if (!m) return false;
  if (!m.url) return false; // el video sin configurar, por ejemplo

  // Sin nombre de archivo declarado = foto vieja, ya comprobada en producción.
  // No se toca: cambiarles el comportamiento sería arriesgar lo que funciona.
  if (!m.archivo) return true;

  // Si la URL vino de una variable de entorno, se confía.
  const envs = ["MEDIA_V10", "MEDIA_V10_PUESTO", "MEDIA_V10_COMBO", "MEDIA_V10_CONTENIDO"];
  if (envs.some((e) => process.env[e] && m.url === process.env[e])) return true;

  if (cacheDisponible.has(clave)) return cacheDisponible.get(clave);
  let existe = false;
  try {
    existe = fs.existsSync(path.join(CARPETA_IMG, m.archivo));
  } catch {
    existe = false;
  }
  cacheDisponible.set(clave, existe);
  if (!existe) {
    console.warn(
      `📸 Falta la foto "${m.archivo}" en docs/img/, así que la clave "${clave}" NO se va a ofrecer. ` +
        `Subí el archivo con ese nombre exacto (o configurá la URL por variable de entorno) y aparece sola.`
    );
  }
  return existe;
}

/** Filtra una lista de claves dejando solo las que tienen foto de verdad. */
function soloDisponibles(claves) {
  return (claves || []).filter((k) => disponible(k));
}

/** Las fotos que faltan, para poder avisarlo en el panel o en un log. */
function fotosFaltantes() {
  return Object.entries(MEDIA)
    .filter(([clave, m]) => m.archivo && !disponible(clave))
    .map(([clave, m]) => ({ clave, archivo: m.archivo }));
}

module.exports = { MEDIA, disponible, soloDisponibles, fotosFaltantes, CARPETA_IMG };
