// Catálogo de fotos/videos que el bot puede enviar.
// Las URLs deben ser públicas (https). Se configuran por variables de entorno.
// Puedes subir las imágenes/videos a tu repo (GitHub Pages) y usar sus URLs, por ejemplo:
//   https://mtavera99.github.io/impermeables/assets/productos/colores.jpg
const MEDIA = {
  colores: {
    type: "image",
    url: process.env.MEDIA_COLORES || "",
    caption: "🌈 Estos son los colores disponibles: negro, blanco, rojo, verde y morado. ¿Cuál te gusta?"
  },
  producto: {
    type: "image",
    url: process.env.MEDIA_PRODUCTO || "",
    caption: "🏍️ Tu conjunto impermeable de 4 piezas: chaqueta, pantalón, zapatones y bolsa."
  },
  video: {
    type: "video",
    url: process.env.MEDIA_VIDEO || "",
    caption: "💧 Míralo en acción."
  }
};

module.exports = { MEDIA };
