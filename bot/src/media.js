// Catálogo de fotos/videos que el bot puede enviar.
// Las URLs deben ser públicas (https). Por defecto apuntan a tu GitHub Pages:
//   https://mtavera99.github.io/impermeables/assets/productos/<archivo>
// Sube las imágenes con esos nombres a assets/productos/ (o sobreescribe con variables de entorno).
const BASE = "https://mtavera99.github.io/impermeables/assets/productos";

const MEDIA = {
  colores: {
    type: "image",
    url: process.env.MEDIA_COLORES || "", // pon aquí colores.jpg cuando la tengas
    caption: "🌈 Colores disponibles: negro, blanco, rojo, verde y morado. ¿Cuál te gusta?"
  },
  producto: {
    type: "image",
    url: process.env.MEDIA_PRODUCTO || `${BASE}/producto.jpg`,
    caption: "🏍️ Tu conjunto impermeable de 4 piezas: chaqueta, pantalón, zapatones y bolsa. Material PVC siliconado calibre 8, termosellado."
  },
  video: {
    type: "video",
    url: process.env.MEDIA_VIDEO || "", // pon aquí video.mp4 cuando lo tengas
    caption: "💧 Míralo en acción."
  }
};

module.exports = { MEDIA };
