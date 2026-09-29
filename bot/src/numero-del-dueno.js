// ============================================================================
// 📱 EL NÚMERO DEL DUEÑO, ESCRITO COMO SEA — 30-sep
//
// DE DÓNDE SALE: el dueño movió sus avisos a su número personal y lo escribió
// "3001112233", sin el 57. Así como estaba el código, ese valor se le pasaba a
// Meta TAL CUAL: `sendText(OWNER, ...)` nunca lo normalizó. Meta no entrega un
// número sin indicativo, así que TODOS sus avisos —pedidos que necesitan
// revisión, clientes que piden un asesor— se habrían perdido.
//
// 🔑 Y SE HABRÍAN PERDIDO EN SILENCIO, que es lo peor: el bot sigue atendiendo
// normal, los pedidos se siguen guardando, y lo único que falta son los avisos.
// Nada en pantalla se ve distinto. Exactamente la clase de fallo que ya costó
// tres días con el botón de novedades.
//
// El número se escribe UNA vez en Render, desde el celular, y nadie recuerda si
// va con 57, con +57 o con espacios. Que las cuatro formas funcionen no es un
// lujo: es lo que evita que un tipeo apague los avisos.
//
// POR QUÉ ES SU PROPIO MÓDULO: para poder probarlo sin levantar el servidor.
// server.js arrastra express y el resto de las dependencias, así que una función
// metida ahí adentro no se puede probar sola — y esta es justamente la que no
// puede fallar en silencio.
// ============================================================================

// Un BSUID es el identificador de un cliente que no tiene teléfono visible
// ("CO.1098944123092301"). No es un número: limpiarlo lo convertiría en un
// teléfono inventado. Se deja tal cual, igual que hace idDestino en server.js.
const RE_BSUID = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;

/**
 * Deja el número del dueño como lo quiere Meta: 57 + los 10 dígitos.
 *
 * Acepta "3001112233", "573001112233", "+57 300 111 2233", "300-111-2233".
 * Lo que no reconoce lo devuelve limpio pero SIN inventarle indicativo, y avisa.
 *
 * @param {string} valor lo que venga en OWNER_WHATSAPP
 * @param {(msg: string) => void} [avisar] a dónde va la advertencia
 * @returns {string} el número listo para Meta, o "" si no había nada
 */
function numeroDelDueno(valor, avisar) {
  const s = String(valor == null ? "" : valor).trim();
  if (!s) return "";
  if (RE_BSUID.test(s)) return s;

  const d = s.replace(/\D/g, ""); // se come el +, los espacios y los guiones

  // Celular colombiano suelto: 10 dígitos que empiezan con 3.
  if (/^3\d{9}$/.test(d)) return "57" + d;
  // Ya viene con el 57 de Colombia adelante.
  if (/^573\d{9}$/.test(d)) return d;

  // 🔑 NO SE INVENTA UN INDICATIVO. Si el número es de otro país, ponerle 57 lo
  // mandaría a un tercero: un aviso con datos de un cliente al teléfono
  // equivocado. Es el mismo criterio de "no adivinar" del resto del bot.
  const aviso =
    `⚠️  OWNER_WHATSAPP="${s}" no parece un celular colombiano (57 + 10 dígitos ` +
    `empezando por 3). Se usa tal cual, pero si los avisos no te llegan, es esto.`;
  if (typeof avisar === "function") avisar(aviso);
  else console.warn(aviso);
  return d;
}

module.exports = { numeroDelDueno };
