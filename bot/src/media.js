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
};

module.exports = { MEDIA };
