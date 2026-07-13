// Fletes estimados por ciudad (COD, paquete ~1-1.5 kg). Ajusta con tus tarifas reales.
const FLETES = {
  "Bogotá": 12000, "Soacha": 12000, "Medellín": 13000, "Cali": 13000,
  "Barranquilla": 15000, "Cartagena": 15000, "Bucaramanga": 13000, "Cúcuta": 15000,
  "Pereira": 13000, "Manizales": 13000, "Armenia": 13000, "Ibagué": 13000,
  "Villavicencio": 13000, "Santa Marta": 16000, "Pasto": 16000, "Neiva": 14000,
  "Montería": 16000, "Sincelejo": 16000, "Corozal": 16000, "Valledupar": 16000,
  "Popayán": 15000, "Tunja": 13000, "Yopal": 15000, "Riohacha": 18000,
  "Florencia": 18000, "Quibdó": 20000
};

const PRECIO_PRODUCTO = 59900;
const FLETE_OTRA_CIUDAD = 18000; // estimado por defecto si no está en la lista

function fmt(n) {
  return "$" + Number(n || 0).toLocaleString("es-CO");
}

// Texto para inyectar en el prompt de la IA
function tablaFletesTexto() {
  return Object.entries(FLETES)
    .map(([c, v]) => `- ${c}: ${fmt(v)} (total al recibir: ${fmt(PRECIO_PRODUCTO + v)})`)
    .join("\n");
}

module.exports = { FLETES, PRECIO_PRODUCTO, FLETE_OTRA_CIUDAD, fmt, tablaFletesTexto };
