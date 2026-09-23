// ============================================================================
// 📉 EL EMBUDO — DÓNDE SE CAEN LOS CLIENTES
//
// POR QUÉ EXISTE: el 22-sep el dueño vio 97 conversaciones y 4 pedidos, y no
// había forma de saber qué pasó en el medio. Un 4% de cierre puede venir de
// tres problemas COMPLETAMENTE distintos, y cada uno se arregla en otro lado:
//
//   · se van sin responder el primer mensaje  -> el problema es el ANUNCIO:
//     está trayendo gente que no quiere el producto
//   · les cotizan y desaparecen               -> el problema es el PRECIO
//   · dan la ciudad y no confirman            -> el problema es el CIERRE
//
// Sin esto, "el cierre bajó" es una sola frase para tres enfermedades, y se
// termina tocando lo que no era. Ya pasó con el CPA.
//
// ⚠️ ESTO ES INFERENCIA, NO INSTRUMENTACIÓN, Y HAY QUE SABERLO.
// Las etapas se deducen leyendo los mensajes que ya están guardados, no de
// marcas que el bot vaya poniendo. La ventaja es enorme: funciona HOY, sobre
// las conversaciones de hoy, sin esperar a acumular datos nuevos. La desventaja
// es que si el guion cambia mucho de palabras, los detectores hay que ajustarlos.
// Por eso cada uno está probado en test-embudo.js contra transcripciones reales.
// ============================================================================

// ============================================================================
// 🔴 COTIZAR NO ES "DECIR UN PRECIO" — ESTA ETAPA ESTABA MIDIENDO MAL
//
// Esto decía:  const RE_TOTAL = /\$\s?\d{2,3}\.\d{3}/
//
// Y esa expresión también engancha el **$59.900 del producto**, que el bot dice
// en su PRIMER mensaje, siempre, antes de saber la ciudad. O sea que casi toda
// conversación con una sola respuesta del bot ya contaba como "cotizada".
//
// Medido sobre el export de 6.317 conversaciones reales (23-sep):
//
//   con la expresión vieja ..... 3.394 cotizados (97,1% de los que engancharon)
//   con el corte correcto ...... 1.895 cotizados (54,2%)
//
// El paso venía inflado en 1.499 conversaciones, y escondía la segunda fuga más
// grande que tiene el negocio: 1.600 personas que hablaron y NUNCA recibieron un
// total. El panel mostraba ese escalón como si estuviera sano.
//
// EL CORTE: un total de verdad incluye el envío y depende de la ciudad. El más
// barato que existe es $73.000 (banda A), y con el precio de rescate de $3.000
// el piso baja a $70.000. El producto solo son $59.900. Así que:
//
//   monto >= $70.000  ->  es un total con envío   (ya cotizó)
//   monto <  $70.000  ->  es el precio del producto, o un descuento
//
// ⚠️ Si algún día sube el precio del producto por encima de $70.000, este corte
// hay que moverlo. Está probado en test-embudo.js contra los dos casos.
// ============================================================================
const PISO_TOTAL = 70000;

// Se deja exportada por compatibilidad: detecta "hay un monto en pesos".
// 🔴 NO la uses para saber si cotizó — para eso está dioTotal().
const RE_TOTAL = /\$\s?\d{2,3}\.\d{3}/;

/** Todos los montos en pesos que aparecen en un texto, como números. */
function montosDe(texto) {
  const out = [];
  for (const m of String(texto == null ? "" : texto).matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+)/g)) {
    out.push(Number(m[1].replace(/[.,]/g, "")));
  }
  return out;
}

/** ¿Este texto contiene un TOTAL con envío (no solo el precio del producto)? */
function dioTotal(texto) {
  return montosDe(texto).some((n) => n >= PISO_TOTAL);
}

// El guion pide la dirección para armar el pedido, y antes de guardar muestra
// un resumen para que el cliente lo confirme. Cualquiera de las dos cosas
// significa que la conversación llegó a la etapa de datos.
const RE_DATOS = /direcci[oó]n|confirmemos|confirmar tu pedido|confirmamos tu pedido/i;

/**
 * En qué etapa quedó UNA conversación.
 * Las etapas son acumulativas: quien confirmó también cotizó.
 *
 * @param {object} conv    la conversación guardada
 * @param {boolean} tienePedido true si hay un pedido guardado para este cliente
 */
function etapaDe(conv, tienePedido) {
  const msgs = (conv && conv.messages) || [];
  const delCliente = msgs.filter((m) => m.role === "user");
  const delBot = msgs.filter((m) => m.role === "assistant");

  // Cerró = hay pedido. Esto NO se infiere de las palabras: es un hecho.
  //
  // Se miran DOS fuentes a propósito: la marca `compro` que pone el bot, y la
  // lista real de pedidos. Si dependiera solo de la marca, un pedido guardado
  // cuya marca falló aparecería como "no cerró" y el embudo mostraría una fuga
  // que no existe — mandando a arreglar lo que no está roto.
  if (tienePedido || (conv && conv.compro === true)) return "cerro";

  const textoBot = delBot.map((m) => String(m.content || "")).join(" \n ");

  if (RE_DATOS.test(textoBot)) return "datos";
  if (dioTotal(textoBot)) return "cotizado";
  // Volvió a escribir después de la primera respuesta del bot: hay interés.
  if (delCliente.length >= 2) return "volvio";
  if (delCliente.length >= 1) return "entro";
  return "vacia";
}

/**
 * El embudo completo. Devuelve los conteos acumulados y dónde está la fuga
 * más grande, que es la única pregunta que importa.
 */
function calcular(conversaciones, pedidos) {
  // Los clientes que SÍ tienen pedido, por la clave con la que se guarda la
  // conversación (el teléfono del chat o el identificador del username).
  const conPedido = new Set();
  for (const p of pedidos || []) {
    if (p && p.telefono_chat) conPedido.add(String(p.telefono_chat));
  }

  const cuenta = { vacia: 0, entro: 0, volvio: 0, cotizado: 0, datos: 0, cerro: 0 };
  for (const k in conversaciones) cuenta[etapaDe(conversaciones[k], conPedido.has(String(k)))]++;

  // Acumulado: cada etapa incluye a las que pasaron de largo.
  const cerro = cuenta.cerro;
  const datos = cuenta.datos + cerro;
  const cotizado = cuenta.cotizado + datos;
  const volvio = cuenta.volvio + cotizado;
  const entro = cuenta.entro + volvio;

  const etapas = [
    { clave: "entro", nombre: "Escribieron", n: entro, que: "llegaron del anuncio" },
    { clave: "volvio", nombre: "Siguieron la charla", n: volvio, que: "contestaron al bot" },
    { clave: "cotizado", nombre: "Recibieron precio", n: cotizado, que: "dieron su ciudad" },
    { clave: "datos", nombre: "Llegaron a los datos", n: datos, que: "dirección y confirmación" },
    { clave: "cerro", nombre: "Cerraron el pedido", n: cerro, que: "pedido guardado" },
  ];

  // La caída de cada paso, en porcentaje de lo que había ANTES.
  for (let i = 1; i < etapas.length; i++) {
    const antes = etapas[i - 1].n;
    const ahora = etapas[i].n;
    etapas[i].perdidos = antes - ahora;
    etapas[i].caida = antes > 0 ? (antes - ahora) / antes : 0;
    etapas[i].pasan = antes > 0 ? ahora / antes : 0;
  }

  // La fuga más grande se mide en CLIENTES PERDIDOS, no en porcentaje: perder
  // el 80% de 5 personas importa menos que perder el 40% de 90.
  let fuga = null;
  for (let i = 1; i < etapas.length; i++) {
    if (!fuga || etapas[i].perdidos > fuga.perdidos) fuga = etapas[i];
  }

  return {
    total: entro,
    cierre: entro > 0 ? cerro / entro : 0,
    etapas,
    fuga,
    // Qué hacer según dónde esté la fuga. Es la traducción de "un número" a
    // "dónde tengo que meter la mano", que es lo que el dueño necesita.
    diagnostico: fuga ? DIAGNOSTICO[fuga.clave] : null,
  };
}

const DIAGNOSTICO = {
  volvio:
    "La mayoría se va sin contestarle al bot. Eso NO es del bot: el anuncio está " +
    "trayendo gente que no quiere el producto, o el primer mensaje no engancha. " +
    "Mirá la tabla de pedidos por anuncio para ver cuál trae curiosos y cuál trae compradores.",
  cotizado:
    "Contestan pero no llegan a darte la ciudad. Se están yendo antes del precio: " +
    "revisá qué está diciendo el bot en los primeros dos mensajes.",
  datos:
    "🔴 Acá duele: les diste el precio y se fueron. El problema es el PRECIO o la " +
    "confianza. Es justo donde el precio de rescate puede salvar la venta.",
  cerro:
    "Llegan hasta los datos y no confirman. El precio ya lo aceptaron: lo que falla " +
    "es el último empujón. Revisá una de esas conversaciones completa.",
};

module.exports = { calcular, etapaDe, dioTotal, montosDe, PISO_TOTAL, RE_TOTAL, RE_DATOS };
