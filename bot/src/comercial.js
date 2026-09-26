// ============================================================================
// 💼 TRES MEJORAS COMERCIALES, COMO REGLAS QUE SE PUEDEN MEDIR
//
// Este módulo NO agrega texto al guion. Dos razones:
//
//   1. 📏 NO CABE. `buildSystemPrompt()` está en ~8.989 tokens y la prueba
//      test-pedir-el-pedido.js defiende un techo de 9.000. Quedan 11 tokens.
//   2. 🔑 Y aunque cupiera: este proyecto ya aprendió que una instrucción al
//      modelo no es un candado. El bloque ##ORDER## salía dos veces aunque el
//      guion lo prohibiera; el precio se leía mal de la tabla cinco veces.
//
// Así que acá viven funciones puras: miran la conversación y contestan
// preguntas concretas con un sí/no y un motivo escrito. Eso se puede probar sin
// llamar a la IA, y es lo que hace que estas mejoras sean MEDIBLES y no opiniones.
//
// ----------------------------------------------------------------------------
// ⚠️ QUÉ PRUEBAN LAS PRUEBAS DE ESTE MÓDULO, Y QUÉ NO
//
// Prueban que el código clasifica bien la conversación y que la nota del turno
// dice lo que corresponde. **NO prueban que esto venda más.** Eso sería una
// afirmación causal y no hay con qué sostenerla todavía: haría falta comparar
// conversiones antes/después sobre un periodo con volumen parecido.
//
// Los números que sí están medidos —y de dónde salen— van citados uno por uno
// más abajo. Son del embudo del agente viejo sobre 1.815 cotizaciones reales, y
// están escritos en prompt.js. Son OBSERVACIONALES: distintos clientes
// recibieron distintos cierres, así que muestran correlación, no causa.
// ============================================================================

const fletes = require("./fletes");

const aplanar = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const textosDe = (messages, rol) =>
  (Array.isArray(messages) ? messages : [])
    .filter((m) => m && m.role === rol && typeof m.content === "string")
    .map((m) => aplanar(m.content));

// ============================================================================
// 1️⃣ RESOLVER LA DUDA ANTES DE PEDIR LOS DATOS
//
// El guion tiene dos reglas que, juntas, se pisan:
//
//   · "SIEMPRE termina con una pregunta que avanza la venta" (prompt.js:131)
//   · "NUNCA cierres el mensaje del total con una pregunta abierta" (prompt.js:323)
//
// Y una tercera que no está escrita en ninguna parte: qué hacer cuando el
// cliente PREGUNTA algo mientras se le piden los datos. Hoy no hay nada, ni en
// el guion ni en código, que distinga "el cliente preguntó" de "el cliente
// contestó lo que le pedí". El modelo queda eligiendo entre resolver la duda o
// avanzar, cuando lo correcto es HACER LAS DOS COSAS EN EL MISMO MENSAJE.
//
// 🔑 Y hay un orden que importa: primero la respuesta, después la pedida. Pedir
// los datos sin haber contestado se lee como no haber escuchado.
//
// 📊 Lo medido (prompt.js:290-300, 1.815 cotizaciones del agente viejo):
//    pedir los DATOS al cerrar → 50,7% avanzó (n=473)
//    preguntar talla o color   → 24,8% avanzó (n=1.192)
//    pregunta abierta          → 25,3% avanzó (n=87)
// O sea: avanzar importa. Lo que este módulo agrega es que avanzar no se haga
// A COSTA de contestar.
// ============================================================================

const DUDAS = [
  {
    clave: "talla",
    // 28,1% de las dudas son talla y color juntas (prompt.js:338-340)
    pregunta: /\b(que talla|cual talla|tallas|hay talla|tienen talla|mi talla|me queda|que tal me queda|soy talla|uso talla)\b/,
    respuesta: /\b(talla|tallas|3xl|2xl|xl\b|\bs a |de s a|una talla mas|encima de la ropa)\b/,
    comoResolver: "decí el rango S a 3XL y que se pide una talla más porque va encima de la ropa",
  },
  {
    clave: "color",
    pregunta: /\b(que colores|cuales colores|hay colores|tienen colores|que color|de que color|la franja)\b/,
    respuesta: /\b(color|colores|franja|reflectiv|negro|azul|rojo|verde|amarillo|naranja)\b/,
    comoResolver: "el conjunto es negro y la franja reflectiva se elige en 6 colores",
  },
  {
    clave: "impermeabilidad",
    pregunta: /\b(se moja|se mojan|es impermeable|de verdad impermeable|aguanta (la lluvia|el agua)|resiste|se filtra|pasa el agua|se pasa el agua|se cala)\b/,
    respuesta: /\b(impermeable|termosellad|no se moja|no se filtra|pvc|calibre|costura)\b/,
    comoResolver: "PVC siliconado calibre 8 con costura termosellada, 100% impermeable",
  },
  {
    clave: "material",
    pregunta: /\b(de que (material|tela|esta hecho)|que material|es de tela|es de plastico|el grosor|que calibre|cuantas piezas|que trae|que incluye)\b/,
    respuesta: /\b(pvc|siliconad|calibre|termosellad|4 piezas|cuatro piezas|chaqueta|pantalon|zapatones|bolsa)\b/,
    comoResolver: "4 piezas (chaqueta con capota, pantalón, zapatones y bolsa) en PVC siliconado calibre 8",
  },
  {
    clave: "tiempo_de_entrega",
    pregunta: /\b(cuanto (tarda|demora|se demora)|cuando (llega|me llega)|en cuanto(s)? (llega|dias)|cuantos dias|para cuando|demora mucho)\b/,
    respuesta: /\b(dias habiles|1 a 3|entre 1 y 3|uno a tres|transportadora)\b/,
    comoResolver: "plazo aproximado de la transportadora, 1 a 3 días hábiles, sin prometer un día exacto",
  },
  {
    clave: "forma_de_pago",
    pregunta: /\b(como (pago|se paga|es el pago)|forma de pago|contraentrega|pago (al recibir|contra entrega)|toca pagar antes|hay que consignar|puedo pagar (con|por)|transferencia|nequi|daviplata|tarjeta)\b/,
    respuesta: /\b(contraentrega|al recibir|cuando lo recib|pagas cuando|no pagas nada antes|anticipad)\b/,
    comoResolver: "paga contraentrega, cuando lo recibe; no adelanta nada",
  },
  {
    clave: "confianza",
    // 🔑 La mejor respuesta a la desconfianza ya existe y es el contraentrega:
    // el cliente no arriesga plata. Está en las objeciones del guion.
    pregunta: /\b(es seguro|son seguros|son confiables|es confiable|es una estafa|no es estafa|son reales|es real|me da (miedo|desconfianza)|como se que|tienen (reseñas|resenas|comentarios)|ya han vendido)\b/,
    respuesta: /\b(contraentrega|al recibir|pagas cuando|no pagas nada antes|revisa(lo|s)? (antes|cuando)|no arriesgas)\b/,
    comoResolver: "que paga contraentrega y puede revisarlo antes de pagar: no arriesga plata",
  },
  {
    clave: "devolucion",
    pregunta: /\b(si no me (queda|sirve|gusta)|puedo (cambiar|devolver)|hay (cambio|devolucion)|cambio de talla|que tal si no)\b/,
    respuesta: /\b(cambi|devol)\w*/,
    comoResolver: "lo que la política real permita, sin inventar plazos",
  },
  {
    clave: "recogida",
    pregunta: /\b(puedo (pasar|recoger|ir)|tienen (local|tienda|bodega|sede|punto)|donde (estan|quedan)|hay (local|tienda|punto) fisico)\b/,
    respuesta: /\b(bodega|madelena|recoger|pasar por|calle 62)\b/,
    comoResolver: "sí hay bodega en Bogotá y se puede recoger, sin inventar horarios",
  },
  {
    clave: "mayorista",
    pregunta: /\b(al por mayor|por mayor|precio mayorista|docena|docenas|para revender|soy distribuidor|cantidades)\b/,
    respuesta: /\b(precio especial|asesor|por mayor)\b/,
    comoResolver: "sí se maneja, pero lo cotiza un asesor: no des número",
  },
];

/** Marcas de que el bot está pidiendo los datos del despacho. */
const RE_PIDE_DATOS =
  /\b(nombre completo|direccion con barrio|tus datos|datos para (el )?despach|pasame(los)? (tu|el)? ?(nombre|numero|celular)|me (pasas|confirmas) (tu|el) (nombre|celular|direccion))\b/;

/** Marcas de que la respuesta avanza la venta (no la deja en el aire). */
const RE_AVANZA =
  /\b(nombre completo|direccion con barrio|tus datos|para que ciudad|que ciudad|confirmemos tu pedido|si confirmo|lo despacho|te lo despacho)\b/;

/**
 * Preguntar la talla o el color también avanza… pero SOLO antes del total.
 *
 * 📊 Es el dato más contundente del embudo (prompt.js:290-300): cerrar el
 * mensaje del total preguntando TALLA o COLOR fue **el peor cierre (24,8%,
 * n=1.192) y el más usado**, dos de cada tres veces. Antes del total es
 * necesario; después es retroceder, porque el primer mensaje ya dijo las tallas.
 */
const RE_ELIGE_TALLA_COLOR = /\b(cual|que) (talla|color)\b|\b(talla|color) prefier/;
const RE_YA_DIO_TOTAL = /\btotal\b|te llega a \$|te sale en \$|te queda en \$|\$\d{2}\.\d{3}/;

/**
 * ¿Qué preguntó el cliente en este mensaje?
 * @returns {Array<{clave:string, comoResolver:string}>}
 */
function dudasDe(texto) {
  const t = aplanar(texto);
  if (!t) return [];
  return DUDAS.filter((d) => d.pregunta.test(t)).map((d) => ({
    clave: d.clave,
    comoResolver: d.comoResolver,
  }));
}

/** ¿La respuesta del bot toca el tema de esa duda? */
function dudaResuelta(respuesta, clave) {
  const d = DUDAS.find((x) => x.clave === clave);
  if (!d) return false;
  return d.respuesta.test(aplanar(respuesta));
}

/**
 * 🔑 EL ORDEN: ¿contestó la duda ANTES de pedir los datos?
 *
 * Se mide por posición en el texto. Si la señal de la respuesta aparece después
 * de la pedida de datos, el cliente lee primero "pasame tus datos" y después la
 * respuesta a lo que preguntó. Es la misma información en el orden que se lee
 * como no haber escuchado.
 *
 * Si no pide datos, no hay orden que revisar y devuelve true.
 */
function resolvioAntesDePedir(respuesta, clave) {
  const r = aplanar(respuesta);
  const d = DUDAS.find((x) => x.clave === clave);
  if (!d) return false;
  const mResp = r.match(d.respuesta);
  const mDatos = r.match(RE_PIDE_DATOS);
  if (!mResp) return false;
  if (!mDatos) return true;
  return mResp.index < mDatos.index;
}

// ============================================================================
// 2️⃣ EL CIERRE QUE ENCAJA CON LO QUE EL CLIENTE MOSTRÓ
//
// Hoy el cierre es un texto fijo: *"¿Está todo bien? Respóndeme «SÍ CONFIRMO»"*
// (prompt.js:414). No hay ninguna rama según lo que el cliente venía diciendo.
//
// 📊 Y hay un dato del repo que dice que el cierre no es indiferente
// (prompt.js:290-300): pedir los datos rindió 50,7% y preguntar talla/color
// 24,8%. Dos formas de cerrar el mismo mensaje, el doble de diferencia.
//
// ⚠️ PERO CUIDADO CON LEER DE MÁS AHÍ. Esos son promedios sobre clientes
// distintos, no el mismo cliente con dos cierres. Que adaptar el cierre a la
// intención venda más es una **hipótesis**, no un hecho medido. Lo que este
// código garantiza es solo que el cierre propuesto corresponda a la intención
// detectada — y eso sí se puede probar sin la IA.
//
// 🔑 El dato que más manda acá es otro, y es el que justifica no empujar el
// cierre a todo el mundo: de 1.574 conversaciones perdidas después del total,
// **solo 14 mencionaron el precio** (prompt.js:334-336). El problema dominante
// no es la objeción: es el silencio. A quien se queda callado no hay que
// rebatirle nada, hay que darle algo concreto que hacer.
// ============================================================================

const INTENCIONES = [
  {
    // Va PRIMERO: si desconfía, ningún cierre funciona hasta resolver eso.
    clave: "desconfianza",
    patron: /\b(es seguro|son seguros|son confiables|es confiable|estafa|son reales|es real|me da (miedo|desconfianza)|como se que|no me fio|tienen (reseñas|resenas))\b/,
    cierre: "el contraentrega ES la respuesta: no paga nada hasta tenerlo en la mano y revisarlo",
    evitar: "no empujes «SÍ CONFIRMO» antes de bajarle la desconfianza",
  },
  {
    clave: "objecion_de_precio",
    // ⚠️ Acá NO va un `mucho` suelto: "demora mucho?" es una pregunta por el
    // tiempo de entrega, y clasificarla como objeción de precio hacía que el bot
    // le rebatiera el precio a quien preguntó cuándo le llega.
    patron: /\b(muy caro|esta caro|es caro|carisimo|es mucho|mucha plata|no me alcanza|rebaja|descuento|mas barato|precio especial|no tengo tanto)\b/,
    cierre: "aplicá la escalera del guion en orden, y ofrecé 2 conjuntos ANTES de tocar el precio",
    evitar: "no bajes el precio de entrada ni regales el envío",
  },
  {
    clave: "comparando",
    patron: /\b(en otro lado|vi (uno|otro)|mas barato en|lo estoy pensando|lo voy a pensar|lo pienso|despues (te|le) (escribo|aviso)|cuando (pueda|cobre|me paguen))\b/,
    cierre: "dejá algo concreto y sin costo de decidir: contraentrega, y que no paga hasta recibirlo",
    evitar: "no insistas con el mismo mensaje ni lo apures con urgencia inventada",
  },
  {
    clave: "listo_para_cerrar",
    patron: /\b(lo quiero|los quiero|me lo llevo|lo llevo|como pago|donde (pago|consigno)|mandalo|enviamelo|despachalo|lo compro|si confirmo|apartame|separame|dale pues)\b/,
    cierre: "pedí los datos que falten y mostrá el cuadro. Sin rodeos y sin volver a vender",
    evitar: "no vuelvas a explicar el producto ni ofrezcas nada nuevo: ya dijo que sí",
  },
  {
    clave: "duda_de_producto",
    // Se llena desde dudasDe(): no tiene patrón propio.
    patron: null,
    cierre: "contestá la duda y en el MISMO mensaje pedí lo que falte para despachar",
    evitar: "no pidas los datos sin haber contestado",
  },
  {
    clave: "frio",
    patron: null,
    cierre: "dale el siguiente paso concreto: la ciudad si no la sabés, los datos si ya diste el total",
    evitar: "no cierres con «¿alguna otra duda?» ni «¿qué te parece?»",
  },
];

/**
 * ¿En qué está el cliente? Devuelve UNA intención principal, por prioridad.
 *
 * El orden de la lista es la prioridad, y está pensado: desconfianza y precio
 * van antes que "listo para cerrar" porque un "lo quiero, pero es seguro?"
 * necesita que primero le bajes la desconfianza.
 *
 * @returns {{clave:string, cierre:string, evitar:string}}
 */
/**
 * 🔑 EL CRUCE ENTRE "ESTÁ CARO" Y "LO VI MÁS BARATO EN OTRO LADO".
 *
 * Las dos frases hablan de precio, pero piden cosas distintas y la diferencia es
 * plata:
 *
 *   · "está muy caro" sin alternativa → la escalera del guion, en orden.
 *   · "lo vi más barato en otro lado" → si le bajás el precio, entrás en una
 *     carrera contra un competidor cuyo número no conocés. Lo que sí tenés y el
 *     otro quizá no es el contraentrega: no arriesga plata.
 *
 * Por eso mencionar a otro vendedor manda sobre la objeción de precio, y se
 * resuelve acá y explícito en vez de depender del orden de la lista.
 */
const RE_COMPARA_CON_OTRO =
  /\b(en otro lado|en otra (parte|pagina|tienda|cuenta)|vi (uno|otro|otra)|otra pagina|otro vendedor|la competencia|mas barato en)\b/;

function intencion(texto) {
  const t = aplanar(texto);
  if (RE_COMPARA_CON_OTRO.test(t)) {
    const i = INTENCIONES.find((x) => x.clave === "comparando");
    return { clave: i.clave, cierre: i.cierre, evitar: i.evitar };
  }
  for (const i of INTENCIONES) {
    if (i.patron && i.patron.test(t)) return { clave: i.clave, cierre: i.cierre, evitar: i.evitar };
  }
  const dudas = dudasDe(t);
  const clave = dudas.length > 0 ? "duda_de_producto" : "frio";
  const i = INTENCIONES.find((x) => x.clave === clave);
  return { clave, cierre: i.cierre, evitar: i.evitar };
}

// ============================================================================
// 3️⃣ LOS 2 CONJUNTOS: SOLO CUANDO ENCAJA
//
// Hoy el guion dice **"SE OFRECE SIEMPRE"** (prompt.js:230) con una sola
// excepción, el difícil acceso (prompt.js:200, fletes.js `sinPromo2`).
//
// 📊 El combo está bien medido y es la venta más rentable: el share subió de
// 6,8% a 26,8% cuando se empezó a decir el ahorro contra comprar dos sueltos
// (prompt.js:232-233). Eso NO se toca. Nada acá reduce cuándo se puede ofrecer
// por debajo de lo que el guion ya permite en el momento correcto.
//
// 🔑 Lo que sí dice el mismo embudo (prompt.js:290-300) es que **cerrar el
// mensaje del total ofreciendo los 2 conjuntos rindió 45,3% (n=148) y pedir los
// datos rindió 50,7% (n=473)**. Las dos cosas están arriba del promedio (30,9%),
// pero el combo quedó por debajo de pedir los datos. Con n=148 y sin asignación
// al azar eso NO alcanza para decir que el combo estorbe; alcanza para decir que
// **no hay evidencia de que convenga ofrecerlo en vez de pedir los datos**, que
// es distinto. Por eso acá no se prohíbe: se ordena.
//
// Cada "no" de esta función tiene su motivo escrito, y ninguno es una corazonada:
// son situaciones donde el combo pisa algo que ya está medido o decidido.
// ============================================================================

const RE_TALLA_ELEGIDA = /\b(talla )?(xs|s|m|l|xl|2xl|3xl|xxl|xxxl)\b|\btalla \d{1,2}\b/;
const RE_COLOR_ELEGIDO =
  /\b(negro|negra|azul|rojo|roja|verde|amarillo|amarilla|naranja|blanco|blanca|morado|gris)\b/;
const RE_COMBO_OFRECIDO = /\b(los dos|2 conjuntos|dos conjuntos|segundo conjunto|llevando dos|si llevas dos)\b/;
const RE_NO_AL_COMBO =
  /\b(solo (uno|1)|uno solo|nada mas uno|solo el mio|con uno (basta|esta bien)|no quiero dos|no necesito dos|solo necesito uno)\b/;
const RE_SEGUNDA_PERSONA =
  /\b(mi (esposo|esposa|marido|mujer|novio|novia|hijo|hija|hermano|hermana|pareja|socio|compa[nñ]ero)|para (los )?dos|somos dos|con mi |y (mi|para mi) (esposo|esposa|hijo|hija|hermano|novia|novio)|un amigo|mi parcero)\b/;
const RE_CUADRO_MOSTRADO = /confirmemos tu pedido/i;

/**
 * ¿La conversación nombra un destino donde el envío NO se comparte?
 *
 * Se lee de fletes.ZONA_DIFICIL_ACCESO para que la lista viva en un solo lado:
 * si mañana se agrega un municipio fluvial allá, esto lo respeta sin tocarse.
 *
 * ⚠️ Con límites de palabra y no con `includes`: "tado" está dentro de "contado"
 * y "de contado" habría apagado el combo en media Colombia.
 */
function destinoSinPromo2(messages) {
  const todo = textosDe(messages, "user").join(" | ");
  if (!todo) return false;
  for (const [ciudad, datos] of Object.entries(fletes.ZONA_DIFICIL_ACCESO || {})) {
    if (!datos || datos.sinPromo2 !== true) continue;
    const nombre = aplanar(ciudad).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\b${nombre}\\b`).test(todo)) return true;
  }
  return false;
}

/**
 * ¿Tiene sentido ofrecer los 2 conjuntos AHORA?
 *
 * @param {Array} messages   historial de la conversación
 * @param {object} [contexto]
 * @param {boolean} [contexto.sinPromo2]  destino donde el envío no se comparte
 * @returns {{encaja:boolean, motivo:string, senalFuerte:boolean}}
 */
function comboEncaja(messages, contexto = {}) {
  const delCliente = textosDe(messages, "user");
  const delBot = textosDe(messages, "assistant");
  const todoCliente = delCliente.join(" | ");
  const no = (clave, motivo) => ({ encaja: false, clave, motivo, senalFuerte: false });

  // 1. Difícil acceso: no es una preferencia, es que el flete no se comparte.
  //    En Tadó el envío se duplica (prompt.js:200, fletes.js sinPromo2).
  //    Si quien llama no lo pasó, se busca el destino en el hilo: así esta regla
  //    funciona sin depender de que otro módulo detecte la ciudad primero.
  const sinPromo2 =
    contexto.sinPromo2 !== undefined ? Boolean(contexto.sinPromo2) : destinoSinPromo2(messages);
  if (sinPromo2) {
    return no("dificil_acceso", "destino de difícil acceso: el envío no se comparte, así que el ahorro no existe");
  }

  // 2. La venta ya está cerrada. Un upsell después del cuadro reabre algo que
  //    ya estaba decidido, y el guion prohíbe mandar cosas junto al cuadro
  //    porque ahí lo único que importa es el total (prompt.js:335).
  if (delBot.some((t) => RE_CUADRO_MOSTRADO.test(t))) {
    return no("venta_cerrada", "el cuadro de confirmación ya se mostró: acá se cierra, no se vende de nuevo");
  }

  // 3. Ya lo ofreciste y dijo que quiere uno. Repetirlo es insistencia, y la
  //    insistencia es exactamente lo que generó las cuatro frases de rechazo
  //    reales ("les he respondido varias veces").
  if (delBot.some((t) => RE_COMBO_OFRECIDO.test(t)) && RE_NO_AL_COMBO.test(todoCliente)) {
    return no("ya_dijo_uno", "ya se ofreció y dijo que quiere uno solo: repetirlo se lee como insistencia");
  }

  // 4. Tiene una pregunta sin contestar. Ofrecer algo más cuando todavía no sabe
  //    si el producto le sirve agrega ruido, no valor.
  const ultimoCliente = delCliente[delCliente.length - 1] || "";
  const dudas = dudasDe(ultimoCliente);
  if (dudas.length > 0 && !dudas.every((d) => dudaResuelta(delBot[delBot.length - 1] || "", d.clave))) {
    return no("duda_pendiente", `primero hay que resolver la duda de ${dudas.map((d) => d.clave).join(", ")}`);
  }

  // 5. La regla que YA estaba en el guion: cuando ya eligió talla y color, antes
  //    de cerrar. No de entrada, porque de entrada se lee como descuento
  //    (prompt.js:242-243).
  const eligioTalla = delCliente.some((t) => RE_TALLA_ELEGIDA.test(t));
  const eligioColor = delCliente.some((t) => RE_COLOR_ELEGIDO.test(t));
  if (!eligioTalla || !eligioColor) {
    const falta = [!eligioTalla && "talla", !eligioColor && "color"].filter(Boolean).join(" y ");
    return no("falta_elegir", `todavía no eligió ${falta}: de entrada el combo se lee como un descuento`);
  }

  // 6. 🔑 Señal fuerte: nombró a otra persona. Acá el combo no es un upsell,
  //    es la respuesta a algo que el cliente ya dijo que necesita.
  if (RE_SEGUNDA_PERSONA.test(todoCliente)) {
    return {
      encaja: true,
      clave: "segunda_persona",
      motivo: "mencionó a otra persona: el combo contesta algo que el cliente ya dijo que necesita",
      senalFuerte: true,
    };
  }

  return {
    encaja: true,
    clave: "momento_correcto",
    motivo: "ya eligió talla y color y todavía no se cerró: es el momento que el guion pide",
    senalFuerte: false,
  };
}

// ============================================================================
// 📋 QUÉ DATOS FALTAN — para volver a pedir solo lo que falta
//
// ⚠️ ALCANCE, PARA NO PROMETER DE MÁS: esto LEE el hilo para saber qué ya dijo
// el cliente, y sirve para no volver a preguntar lo que ya contestó. **No
// arregla** que el bloque ##ORDER## conserve el color o la talla que el cliente
// dijo hace diez mensajes: eso es otro trabajo, sobre cómo se arma el pedido, y
// sigue pendiente.
// ============================================================================

const CAMPOS = [
  { clave: "ciudad", como: "la ciudad" },
  { clave: "talla", como: "la talla" },
  { clave: "color", como: "el color de la franja" },
  { clave: "nombre", como: "el nombre completo" },
  { clave: "direccion", como: "la dirección con barrio" },
  { clave: "celular", como: "el celular" },
];

/**
 * Qué campos del pedido el cliente todavía no dijo, leyendo TODO el hilo.
 * @returns {Array<{clave:string, como:string}>}
 */
function datosQueFaltan(messages, yaConocidos = {}) {
  const delCliente = textosDe(messages, "user");
  const todo = delCliente.join(" | ");
  const tiene = {
    // La ciudad la detecta el flujo por otro lado; acá solo se mira si se nombró.
    ciudad: Boolean(yaConocidos.ciudad),
    talla: Boolean(yaConocidos.talla) || delCliente.some((t) => RE_TALLA_ELEGIDA.test(t)),
    color: Boolean(yaConocidos.color) || delCliente.some((t) => RE_COLOR_ELEGIDO.test(t)),
    nombre: Boolean(yaConocidos.nombre),
    direccion:
      Boolean(yaConocidos.direccion) ||
      /\b(calle|carrera|cra|cl\b|avenida|av\b|diagonal|transversal|manzana|barrio|vereda|kilometro|#)\b/.test(todo),
    celular: Boolean(yaConocidos.celular) || /\b3\d{9}\b/.test(todo.replace(/[\s-]/g, "")),
  };
  return CAMPOS.filter((c) => !tiene[c.clave]);
}

// ============================================================================
// 📝 LA NOTA DEL TURNO
//
// Se pega al final del guion SOLO en el turno donde hace falta, y se va. No
// queda en el historial ni en buildSystemPrompt(): así el techo de 9.000 tokens
// del guion base no se toca, y los turnos donde no aplica nada no pagan nada.
//
// 🔒 Tiene un tope propio (TOPE_NOTA) para que no crezca sin control. La prueba
// lo verifica con el caso más cargado que se pueda armar.
// ============================================================================

const TOPE_NOTA = 700;

// El mismo techo que defiende test-pedir-el-pedido.js para el guion. Acá se
// aplica al guion YA con la nota pegada, que es lo que de verdad se le manda.
const TECHO_TOKENS = 9000;
const tokensDe = (s) => Math.round(String(s || "").length / 4);

/**
 * Construye la nota para este turno. Devuelve "" si no hay nada que decir.
 *
 * @param {Array} messages  historial YA con el mensaje del cliente adentro
 * @param {string} userText el mensaje del cliente de este turno
 * @param {object} [contexto] { sinPromo2, yaConocidos }
 */
function notaDeTurno(messages, userText, contexto = {}) {
  const lineas = [];
  const dudas = dudasDe(userText);

  if (dudas.length > 0) {
    const lista = dudas.map((d) => `${d.clave} (${d.comoResolver})`).join("; ");
    lineas.push(
      `El cliente PREGUNTÓ: ${lista}. Contestá eso PRIMERO, en la primera línea, ` +
        "y recién después pedí lo que falte. No pidas los datos sin contestar."
    );
  }

  const inten = intencion(userText);
  if (inten.clave !== "frio" && inten.clave !== "duda_de_producto") {
    lineas.push(`Cierre que encaja (${inten.clave}): ${inten.cierre}. ${inten.evitar}.`);
  }

  // ⚠️ `falta_elegir` NO se dice acá a propósito. El guion ya trae esa regla
  // ("ofrecelo cuando ya eligió talla y color"), y repetirla en cada turno
  // temprano llenaría la nota de ruido en los mensajes donde nada va mal. La
  // nota es para lo que el guion NO cubre.
  const combo = comboEncaja(messages, contexto);
  if (combo.encaja && combo.senalFuerte) {
    lineas.push(`Ofrecé los 2 conjuntos: ${combo.motivo}. Decí el ahorro contra comprar dos sueltos.`);
  } else if (!combo.encaja && combo.clave !== "falta_elegir") {
    lineas.push(`NO ofrezcas los 2 conjuntos en este mensaje: ${combo.motivo}.`);
  }

  const faltan = datosQueFaltan(messages, contexto.yaConocidos);
  if (faltan.length > 0 && faltan.length < CAMPOS.length) {
    lineas.push(`Falta por saber: ${faltan.map((f) => f.como).join(", ")}. No vuelvas a preguntar el resto.`);
  }

  if (lineas.length === 0) return "";
  const nota = `\n\n## 📌 PARA ESTE MENSAJE\n${lineas.map((l) => `- ${l}`).join("\n")}\n`;
  if (nota.length <= TOPE_NOTA) return nota;
  // Se corta por línea entera, no a mitad de palabra: media instrucción confunde
  // más que ninguna.
  let cortada = "\n\n## 📌 PARA ESTE MENSAJE\n";
  for (const l of lineas) {
    const linea = `- ${l}\n`;
    if (cortada.length + linea.length > TOPE_NOTA) break;
    cortada += linea;
  }
  return cortada;
}

// ============================================================================
// 🔘 EL INTERRUPTOR DE LA NOTA COMERCIAL —  NOTA_COMERCIAL=1  la prende
//
// 🔴 LO QUE CORRIGIÓ LA REVISIÓN (26-sep), y es una corrección de fondo: la
// primera versión usaba el ESPACIO DISPONIBLE del prompt como mecanismo de
// activación. Si la nota cabía bajo el techo, se mandaba; si no, no.
//
// Eso está mal por tres razones, y ninguna es teórica:
//
//   1. El comportamiento del bot quedaba atado a cuánto mide el guion. Alguien
//      agrega dos párrafos al guion por otro motivo y las notas se apagan solas,
//      en silencio, sin que nadie lo haya decidido.
//   2. No se puede desactivar. Si la nota resulta contraproducente, no hay nada
//      que apagar: habría que recortar el guion para que deje de caber.
//   3. Y al revés: no se puede activar a voluntad para medirla.
//
// 🔑 Una mejora que se quiere MEDIR necesita poder prenderse y apagarse a
// propósito. Si no, no hay con qué comparar.
//
// Ahora son dos cosas separadas, como debe ser:
//   · el INTERRUPTOR decide si la nota se usa           → NOTA_COMERCIAL
//   · el TECHO es una red de seguridad, no un interruptor → nunca desborda el prompt
//
// Se sigue la misma convención que SEGUIMIENTO_44H en seguimiento.js.
// ============================================================================

/**
 * ¿Está activa la nota comercial?
 *
 * Apagada por defecto: es una mejora a medir, no una corrección de algo roto, y
 * el dueño decide cuándo prenderla. Se lee en cada llamada (no al cargar el
 * módulo) para que se pueda cambiar sin reiniciar y para poder probar las dos
 * ramas.
 */
function notaActiva(contexto = {}) {
  if (contexto.activa !== undefined) return Boolean(contexto.activa);
  return String(process.env.NOTA_COMERCIAL ?? "0").trim().toLowerCase() === "1";
}

/**
 * Pega la nota al guion, si está activada y si cabe.
 *
 * @returns {{prompt:string, nota:string, activa:boolean, cupo:boolean, tokens:number}}
 */
function guionConNota(guion, messages, userText, contexto = {}) {
  const activa = notaActiva(contexto);
  if (!activa) {
    // Apagada: el bot queda exactamente como sin este módulo. Ni se construye la
    // nota, así que no cuesta nada.
    return { prompt: guion, nota: "", activa: false, cupo: true, tokens: tokensDe(guion) };
  }

  const nota = notaDeTurno(messages, userText, contexto);
  if (!nota) return { prompt: guion, nota: "", activa: true, cupo: true, tokens: tokensDe(guion) };

  // 📏 RED DE SEGURIDAD, NO INTERRUPTOR. Con la entrega 1 mergeada el guion baja
  // a ~7.555 tokens y la nota más cargada son ~150: sobra espacio. Esto existe
  // para que un guion que crezca por otro motivo no desborde el prompt en
  // silencio, y cuando salta LO DICE, para que se pueda arreglar.
  const tokens = tokensDe(guion + nota);
  if (tokens >= TECHO_TOKENS) {
    return { prompt: guion, nota, activa: true, cupo: false, tokens };
  }
  return { prompt: guion + nota, nota, activa: true, cupo: true, tokens };
}

// ============================================================================
// 🔍 LA REVISIÓN DE LO QUE SALIÓ — esto es lo que hace la mejora medible
//
// ⚠️ NO bloquea, NO reescribe y NO pausa el chat. Una mejora comercial que deja
// al cliente esperando no es una mejora. Solo deja constancia contable: un
// renglón con prefijo estable por cada cosa que no se cumplió, para poder
// contarlas después y saber si esto sirvió de algo.
// ============================================================================

function revisar(respuesta, { userText = "", messages = [], contexto = {} } = {}) {
  const hallazgos = [];
  const r = aplanar(respuesta);

  for (const d of dudasDe(userText)) {
    if (!dudaResuelta(respuesta, d.clave)) {
      hallazgos.push({ clave: "duda_sin_contestar", detalle: `preguntó por ${d.clave} y la respuesta no lo toca` });
    } else if (!resolvioAntesDePedir(respuesta, d.clave)) {
      hallazgos.push({ clave: "pidio_datos_antes_de_contestar", detalle: `la respuesta a ${d.clave} va después de la pedida de datos` });
    }
  }

  const combo = comboEncaja(messages, contexto);
  if (!combo.encaja && RE_COMBO_OFRECIDO.test(r)) {
    hallazgos.push({ clave: "combo_fuera_de_lugar", detalle: combo.motivo });
  }

  // ¿La respuesta deja al cliente con algo concreto que hacer?
  //
  // 🔑 Preguntar la talla o el color cuenta como avanzar ANTES del total y NO
  // después. No es una sutileza: cerrar el mensaje del total preguntando talla o
  // color fue el peor cierre medido (24,8%, n=1.192) y a la vez el más usado,
  // porque el primer mensaje ya había dicho las tallas. Antes del total, en
  // cambio, es la pregunta que toca.
  const yaDioTotal = textosDe(messages, "assistant").some((t) => RE_YA_DIO_TOTAL.test(t));
  const avanza = RE_AVANZA.test(r) || (!yaDioTotal && RE_ELIGE_TALLA_COLOR.test(r));
  if (!avanza) {
    hallazgos.push({
      clave: "no_avanza",
      detalle: yaDioTotal
        ? "después del total no pide los datos: 688 de 1.255 clientes caídos tras el total no volvieron a escribir nunca"
        : "no deja nada concreto que hacer (ni la ciudad, ni la talla, ni los datos)",
    });
  }

  return { ok: hallazgos.length === 0, hallazgos };
}

/** Un renglón contable para el log. Prefijo estable, para poder contarlos. */
function resumir(resultado) {
  if (!resultado || resultado.ok) return "";
  return resultado.hallazgos.map((h) => `${h.clave} (${h.detalle})`).join(" · ");
}

module.exports = {
  dudasDe,
  dudaResuelta,
  resolvioAntesDePedir,
  intencion,
  comboEncaja,
  destinoSinPromo2,
  datosQueFaltan,
  notaDeTurno,
  guionConNota,
  revisar,
  resumir,
  DUDAS,
  INTENCIONES,
  CAMPOS,
  TOPE_NOTA,
  TECHO_TOKENS,
};
