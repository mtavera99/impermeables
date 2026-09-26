// ============================================================================
// 🛑 CUÁNDO DEJAR DE ESCRIBIR — y cuándo NO confundirlo con una corrección
//
// DE DÓNDE SALE (26-sep). Se reportaron estas frases de clientes reales:
//
//   "Cuando decida comprarlo yo les escribo. Ahorita no"
//   "Cuando lo vaya a comprar les escribo. Por favor"
//   "Por Dios… Les he respondido varias veces"
//   "Ya les dije que no me interesa"
//
// 🔴 LO QUE LA REVISIÓN ENCONTRÓ EN LA DETECCIÓN QUE HABÍA:
//
//     /\b(no me escrib|no escrib|dejen? de escrib|no molest|ya no me interesa|
//        elimin[ae]me|no quiero)\b/i
//
//   1. DE ESAS CUATRO FRASES, SOLO UNA SE ACERCA. "Ya les dije que no me
//      interesa" no coincide, porque el patrón pide "ya no me interesa" pegado.
//      Las otras tres no tienen ninguna de esas palabras: el cliente pide que lo
//      dejen en paz sin usar el verbo "escribir" en negativo.
//
//   2. 🔴 Y PEOR: `no quiero` genera FALSOS POSITIVOS. "No quiero rojo, quiero
//      azul" marca al cliente como noMolestar y le corta el seguimiento a
//      alguien que está ELIGIENDO EL COLOR. Es decir: la detección apagaba
//      ventas en curso.
//
// 🔑 Por eso este módulo tiene DOS funciones, no una. Detectar el rechazo sin
// distinguirlo de una corrección es peor que no detectarlo: una cosa pierde un
// seguimiento, la otra pierde la venta.
// ============================================================================

const aplanar = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// ---------------------------------------------------------------------------
// LO QUE SÍ ES PEDIR QUE NO LE ESCRIBAN
//
// Cuatro familias, y cada una salió de una frase real:
// ---------------------------------------------------------------------------
const SENALES_RECHAZO = [
  // 1. Pide explícitamente que no le escriban
  /\bno me (escrib|llam|contact|molest|insist)/,
  /\bno (me )?vuelvan? a (escrib|llam|contact)/,
  /\bdej(en|a|ame|enme) de (escrib|llam|molest|insist)/,
  /\bno (me )?molest/,
  //    "me dejan en paz" (pronombre antes del verbo) y "déjenme en paz"
  //    (pronombre pegado al verbo) son la misma petición. La segunda forma es la
  //    más común en imperativo y se estaba escapando.
  /\bme (dejan?|deje) (en paz|tranquil|quiet)/,
  /\bdej(enme|ame|eme|enos|anos|en|a|e) (en paz|tranquil|quiet)/,
  /\bborr(en|ame|enme)|elimin(en|ame|enme)/,
  /\bme quiero (salir|ir)\b|\bdarme de baja\b|\bunsubscribe\b/,

  // 2. "yo les escribo cuando" — la forma más común y la que no se detectaba.
  //    El cliente NO dice "no me escriban": dice que él va a tomar la iniciativa.
  /\b(cuando|si) (lo |la |le )?(decida|quiera|vaya a|pueda|necesite|me decida)[^.]{0,30}\b(les |le )?(escrib|aviso|contacto|busco|llamo)/,
  /\b(yo )?(les |le )?(escrib|aviso|contacto|busco|llamo)\b[^.]{0,20}\bcuando\b/,
  /\bahorita no\b|\bahora no\b(?!.*\bpero\b)/,

  // 3. Ya dijo que no le interesa. OJO: "no me interesa" suelto, no solo
  //    "ya no me interesa" — que era el único que se detectaba.
  /\bno me interesa\b/,
  /\bya (les |le )?dije que no\b/,
  /\bno (lo )?(voy a|pienso) (comprar|llevar)\b/,
  /\bya no (lo )?quiero\b/,

  // 4. Fastidio explícito por la insistencia
  /\b(les |le )?he (respondido|dicho|contestado) (varias|muchas|mil) veces\b/,
  /\bcuantas veces (les |le )?(tengo que|debo)\b/,
  /\bya (basta|es suficiente)\b|\bpor dios\b/,
];

// ---------------------------------------------------------------------------
// LO QUE PARECE RECHAZO Y NO LO ES
//
// 🔑 Estas frases llevan "no" pegado a algo del producto o del pedido. Son
// clientes que están COMPRANDO: eligiendo color, corrigiendo un dato, o diciendo
// que les falta algo. Marcarlos como noMolestar apaga una venta en curso.
// ---------------------------------------------------------------------------
const SENALES_CORRECCION = [
  // Elige entre opciones: "no quiero rojo, quiero azul"
  /\bno (quiero|me gusta|es)\b[^.]{0,25}\b(rojo|roja|azul|verde|negro|negra|blanco|blanca|morado|morada)\b/,
  /\bno\b[^.]{0,15}\b(esa|ese|esta|este) (talla|color|franja)\b/,
  // Le falta un dato, que es lo contrario a no querer que le escriban
  /\bno (tengo|se|recuerdo|me acuerdo)\b[^.]{0,25}\b(direccion|nomenclatura|barrio|numero|celular|cedula)\b/,
  // No es la cantidad/producto que quería
  /\bno\b[^.]{0,12}\b(dos|2|combo|los dos)\b/,
  // Aclara una duda del producto
  /\bno (se moja|se mojan|se filtra|pesa|aprieta|sirve la talla)\b/,
  // Niega haber recibido algo (posventa, NO rechazo comercial)
  /\bno (me )?(ha )?(llegado|lleg[oó]|recibido)\b/,
];

/**
 * ¿Está corrigiendo o aclarando algo del pedido? Si sí, NO es rechazo.
 * Se evalúa primero y manda sobre la detección de rechazo.
 */
function esCorreccion(texto) {
  const t = aplanar(texto);
  return SENALES_CORRECCION.some((re) => re.test(t));
}

/**
 * ¿Pidió que dejen de contactarlo?
 *
 * @returns {{rechaza:boolean, motivo:string|null, esCorreccion:boolean}}
 */
function evaluar(texto) {
  const t = aplanar(texto);
  if (!t) return { rechaza: false, motivo: null, esCorreccion: false };

  // ⚠️ El orden importa: una corrección gana sobre el rechazo. "No quiero rojo"
  // tiene un "no quiero" adentro, y antes eso bastaba para cortarle el
  // seguimiento a alguien que estaba eligiendo el color.
  if (esCorreccion(t)) {
    return { rechaza: false, motivo: null, esCorreccion: true };
  }

  for (const re of SENALES_RECHAZO) {
    if (re.test(t)) {
      return { rechaza: true, motivo: re.source.slice(0, 48), esCorreccion: false };
    }
  }
  return { rechaza: false, motivo: null, esCorreccion: false };
}

/** Atajo booleano, para reemplazar la expresión que había en server.js. */
function esRechazo(texto) {
  return evaluar(texto).rechaza;
}

module.exports = { evaluar, esRechazo, esCorreccion, SENALES_RECHAZO, SENALES_CORRECCION };
