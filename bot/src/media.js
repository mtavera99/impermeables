// Catálogo de fotos/videos que el bot puede enviar.
// URLs públicas (GitHub Pages). Se pueden sobreescribir con variables de entorno.
//
// 🔴 ARREGLADO 21-SEP — TODAS LAS FOTOS DABAN 404.
// El BASE apuntaba a `/assets/productos`, que es la carpeta del REPO. Pero
// GitHub Pages publica desde `docs/`, así que la URL pública es `/img/`.
// Ninguna de las 6 imágenes existía en esa ruta.
//
// Cómo se detectó: un cliente escribió "Tienes fotos" y Meta devolvió
//   code 131053 · Media upload error
//   "Downloading media from weblink failed with http code 404"
// Se vio en /eventos, la bitácora del webhook. Antes de tenerla, esto fallaba
// en silencio: el cliente pedía fotos y no pasaba nada.
//
// ⚠️ REGLA: si se agrega una foto nueva, tiene que estar en `docs/img/` —
// no alcanza con subirla a `assets/`. Y hay que verificar la URL con curl.
const BASE = "https://mtavera99.github.io/impermeables/img";

const MEDIA = {
  // Foto de los colores. Se deja vacía por ahora: la cuadrícula subida muestra colores
  // que no coinciden con los disponibles (blanco, negro, rojo, verde, morado), así que el
  // bot los lista en texto. Cuando haya una foto correcta, pon MEDIA_COLORES o colores.jpg.
  colores: {
    type: "image",
    url: process.env.MEDIA_COLORES || `${BASE}/colores.png`,
    caption: "🌈 El impermeable es negro y eliges el color de la franja reflectiva: blanco, negro, rojo, verde, morado o azul. ¿Cuál te gusta?"
  },
  // Foto del conjunto completo (las 4 piezas). ✅ Activa.
  producto: {
    type: "image",
    url: process.env.MEDIA_PRODUCTO || `${BASE}/producto.png`,
    caption: "🏍️ Tu conjunto impermeable de 4 piezas: chaqueta, pantalón, zapatones y bolsa. PVC siliconado calibre 8, termosellado. El impermeable es negro y la franja reflectiva la eliges en color."
  },
  // Fotos individuales por color de franja (recortadas de la cuadrícula).
  rojo: {
    type: "image",
    // .png, no .jpg: en docs/img/ el archivo publicado es rojo.png
    url: process.env.MEDIA_ROJO || `${BASE}/rojo.png`,
    caption: "🔴 Impermeable con franja ROJA (el conjunto es negro). ¿Te gusta este?"
  },
  verde: {
    type: "image",
    url: process.env.MEDIA_VERDE || `${BASE}/verde.png`,
    caption: "🟢 Impermeable con franja VERDE. ¿Te gusta este?"
  },
  negro: {
    type: "image",
    url: process.env.MEDIA_NEGRO || `${BASE}/negro.png`,
    caption: "⚫ Impermeable todo NEGRO. ¿Te gusta este?"
  },
  // Foto del conjunto puesto (modelo). Se envía si piden ver el producto puesto.
  modelo: {
    type: "image",
    url: process.env.MEDIA_MODELO || `${BASE}/modelo.png`,
    caption: "🧍 Así se ve puesto 🏍️"
  },
  video: {
    type: "video",
    url: process.env.MEDIA_VIDEO || "",
    caption: "💧 Míralo en acción."
  }
};

module.exports = { MEDIA };
