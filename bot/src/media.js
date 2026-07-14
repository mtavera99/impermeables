// Catálogo de fotos/videos que el bot puede enviar.
// URLs públicas (GitHub Pages). Se pueden sobreescribir con variables de entorno.
const BASE = "https://mtavera99.github.io/impermeables/assets/productos";

const MEDIA = {
  // Foto de los colores. Se deja vacía por ahora: la cuadrícula subida muestra colores
  // que no coinciden con los disponibles (blanco, negro, rojo, verde, morado), así que el
  // bot los lista en texto. Cuando haya una foto correcta, pon MEDIA_COLORES o colores.jpg.
  colores: {
    type: "image",
    url: process.env.MEDIA_COLORES || `${BASE}/colores.png`,
    caption: "🌈 El impermeable es negro y eliges el color de la franja reflectiva: blanco, negro, rojo, verde o morado. ¿Cuál te gusta?"
  },
  // Foto del conjunto completo (las 4 piezas). ✅ Activa.
  producto: {
    type: "image",
    url: process.env.MEDIA_PRODUCTO || `${BASE}/producto.png`,
    caption: "🏍️ Tu conjunto impermeable de 4 piezas: chaqueta, pantalón, zapatones y bolsa. PVC siliconado calibre 8, termosellado. El impermeable es negro y la franja reflectiva la eliges en color."
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
