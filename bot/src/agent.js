// Cerebro del bot: arma el historial, llama a Gemini y procesa la respuesta
// (detecta pedidos confirmados y solicitudes de pasar a un humano).
const { buildSystemPrompt } = require("./prompt");
const { respuestaDeArranque } = require("./primer-mensaje");
const { revisarDireccionDePedido } = require("./direccion");
const { revisarConfirmacion } = require("./confirmacion");
const store = require("./store");
const cotizacion = require("./cotizacion");
const promesas = require("./promesas");
const comercial = require("./comercial");

// ============================================================================
// PROVEEDOR DE IA — configurable, para no quedar amarrado a uno
//
// Por qué así: los precios de los modelos se movieron MUCHO en 2026 (Gemini
// Flash pasó de US$0.10 a US$0.75 por millón de tokens de entrada). Amarrar el
// bot a un proveedor obliga a tocar código cada vez que cambia el mercado.
// Acá se cambia con una variable de entorno.
//
//   AI_PROVIDER=gemini          -> Gemini (Google AI Studio)
//   AI_PROVIDER=openai-compat   -> DeepSeek, Groq, OpenAI, Together, etc.
//
// Referencia de costo medido para BikerPro (4.020 conversaciones/mes,
// ver /analisis/comparar-opciones-bot-21sep.py):
//   DeepSeek V4-Flash ........ US$0.14 / US$0.28 por millón  <- el más barato útil
//   GPT-5.6 Luna ............. US$0.20 / US$1.20
//   Gemini 3.1 Flash-Lite .... US$0.25 / US$1.50
//   Gemini 3.8 Flash ......... US$0.75 / US$3.75  <- innecesario para un guion
// ============================================================================
const PROVIDER = (process.env.AI_PROVIDER || "gemini").toLowerCase();

// Gemini
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

// Compatible con OpenAI (DeepSeek, Groq, OpenAI, Together...)
const AI_KEY = process.env.AI_API_KEY;
const AI_BASE = (process.env.AI_BASE_URL || "https://api.deepseek.com").replace(/\/$/, "");
const AI_MODEL = process.env.AI_MODEL || "deepseek-chat";

// ¿Hay alguna credencial usable?
const TIENE_IA = PROVIDER === "gemini" ? !!GEMINI_KEY : !!AI_KEY;

// Cuántos mensajes del historial se mandan. El prompt de sistema ya ocupa
// ~4.300 tokens y viaja en CADA llamada; el historial se suma encima. Mandar
// la conversación completa hace que una charla larga cueste el triple que una
// corta sin mejorar la venta. 8 mensajes = 4 turnos, suficiente para no perder
// el hilo (ciudad, talla, color quedan además en el resumen del pedido).
const MAX_HISTORIAL = Number(process.env.MAX_HISTORIAL || 8);

function recortarHistorial(messages) {
  if (messages.length <= MAX_HISTORIAL) return messages;
  return messages.slice(-MAX_HISTORIAL);
}

const REINTENTABLES = new Set([429, 500, 502, 503, 504]);

// ---- Gemini ----
async function callGemini(systemPrompt, messages, retries = 2) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      // ⚠️ 1600 y no 800. El tope viejo cortaba respuestas por la mitad, y lo
      // que va AL FINAL es el bloque ##ORDER## con el pedido: se perdían ventas
      // enteras sin que nadie se enterara (ver el bloque de extractOrder).
      // Solo se paga lo que se usa, así que un tope más alto no cuesta nada
      // salvo en las respuestas que de verdad lo necesitan.
      generationConfig: { temperature: 0.6, maxOutputTokens: 1600 }
    })
  });

  if (!res.ok) {
    const err = await res.text();
    if (REINTENTABLES.has(res.status) && retries > 0) {
      console.log(`Gemini ${res.status}, reintentando en 2.5s (quedan ${retries})...`);
      await new Promise((r) => setTimeout(r, 2500));
      return callGemini(systemPrompt, messages, retries - 1);
    }
    throw new Error(`Gemini ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  if (!text.trim() && retries > 0) {
    await new Promise((r) => setTimeout(r, 1500));
    return callGemini(systemPrompt, messages, retries - 1);
  }
  return text.trim();
}

// ---- Compatible con OpenAI: DeepSeek, Groq, OpenAI... ----
async function callOpenAICompat(systemPrompt, messages, retries = 2) {
  const res = await fetch(`${AI_BASE}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        }))
      ],
      temperature: 0.6,
      // Mismo motivo que en Gemini: con 800 se cortaba el bloque ##ORDER## del
      // final y el pedido se perdía en silencio.
      max_tokens: 1600
    })
  });

  if (!res.ok) {
    const err = await res.text();
    if (REINTENTABLES.has(res.status) && retries > 0) {
      console.log(`${AI_MODEL} ${res.status}, reintentando en 2.5s (quedan ${retries})...`);
      await new Promise((r) => setTimeout(r, 2500));
      return callOpenAICompat(systemPrompt, messages, retries - 1);
    }
    throw new Error(`${AI_MODEL} ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  if (!text.trim() && retries > 0) {
    await new Promise((r) => setTimeout(r, 1500));
    return callOpenAICompat(systemPrompt, messages, retries - 1);
  }
  return text.trim();
}

// Punto único de entrada: enruta según el proveedor configurado
async function callIA(systemPrompt, messages) {
  const hist = recortarHistorial(messages);
  if (PROVIDER === "gemini") return callGemini(systemPrompt, hist);
  return callOpenAICompat(systemPrompt, hist);
}

// Extrae el bloque ##ORDER## {...} y lo separa del mensaje visible
/**
 * Rescata los campos de un bloque ##ORDER## que llegó CORTADO o mal formado.
 *
 * Se lee campo por campo con expresiones regulares en vez de JSON.parse,
 * porque un JSON al que le falta la llave final no se puede parsear pero sí se
 * puede leer. Mejor un pedido con un campo faltante —que el dueño completa en
 * el panel— que ningún pedido.
 */
function rescatarPedido(fragmento) {
  const txt = (n) => {
    const m = fragmento.match(new RegExp('"' + n + '"\\s*:\\s*"([^"]*)"'));
    return m ? m[1] : undefined;
  };
  const num = (n) => {
    const m = fragmento.match(new RegExp('"' + n + '"\\s*:\\s*(\\d+)'));
    return m ? Number(m[1]) : undefined;
  };
  const o = {
    nombre: txt("nombre"),
    celular: txt("celular"),
    ciudad: txt("ciudad"),
    direccion: txt("direccion"),
    color: txt("color"),
    talla: txt("talla"),
    pago: txt("pago"),
    total: num("total"),
  };
  // Sin nombre NI ciudad no hay nada que rescatar: sería basura disfrazada de
  // pedido, y un pedido falso en el panel es peor que ninguno.
  if (!o.nombre && !o.ciudad) return null;
  return o;
}

// ============================================================================
// 🔴 UN PEDIDO NO PUEDE PERDERSE EN SILENCIO (22-sep)
//
// EL DUEÑO REPORTÓ que no entraban ventas: 93 conversaciones y el último pedido
// guardado de las 9:38 am. La IA funcionaba y el bot contestaba bien.
//
// Acá estaba el agujero: si el bloque ##ORDER## llegaba CORTADO —y se corta,
// porque la respuesta tiene un tope de tokens y el JSON va al final— pasaba
// esto, en este orden:
//
//   1. la expresión que busca {...} NO encontraba nada (falta la llave final)
//   2. order quedaba en null
//   3. la última línea borraba el bloque cortado para que el cliente no lo vea
//   4. y listo: el cliente recibía una respuesta perfecta, creía que su pedido
//      quedó hecho, y EL PEDIDO NO EXISTÍA EN NINGUNA PARTE
//
// Sin un log, sin un aviso, sin nada. Desde afuera era idéntico a "hoy no
// compró nadie".
//
// Ahora: si el bloque estaba y no se pudo leer, se rescata campo por campo, se
// grita en el log y se le avisa al dueño por WhatsApp.
// ============================================================================
function extractOrder(text) {
  let order = null;
  let clean = text;
  let rescatado = false;

  const m = text.match(/##ORDER##\s*(\{[\s\S]*?\})/);
  if (m) {
    try {
      order = JSON.parse(m[1]);
    } catch {
      order = null;
    }
    clean = text.replace(/##ORDER##\s*\{[\s\S]*?\}/, "").trim();
  }

  if (!order && text.includes("##ORDER##")) {
    const fragmento = text.slice(text.indexOf("##ORDER##"));
    order = rescatarPedido(fragmento);
    rescatado = Boolean(order);
    if (rescatado) {
      console.error(
        "🟠 PEDIDO RESCATADO DE UN BLOQUE CORTADO. La IA emitió ##ORDER## pero el " +
          "JSON no se pudo leer (casi siempre porque la respuesta llegó al tope de " +
          "tokens). Se recuperaron los campos legibles: " +
          JSON.stringify(order) +
          " — REVISAR que no falte nada antes de despachar."
      );
    } else {
      console.error(
        "🔴 PEDIDO PERDIDO. La IA emitió ##ORDER## y no se pudo leer NI rescatar " +
          "ningún campo. El cliente cree que su pedido quedó hecho. Bloque recibido: " +
          fragmento.slice(0, 300)
      );
    }
  }

  // Elimina cualquier resto de ##ORDER## aunque esté truncado/malformado (para que no llegue al cliente)
  clean = clean.replace(/##ORDER##[\s\S]*$/, "").trim();
  return { order, clean, rescatado };
}

// Extrae marcadores [[MEDIA:clave]] y los separa del mensaje visible
function extractMedia(text) {
  const keys = [];
  const re = /\[\[MEDIA:(\w+)\]\]/g;
  let m;
  while ((m = re.exec(text)) !== null) keys.push(m[1]);
  const clean = text.replace(/\[\[MEDIA:\w+\]\]/g, "").trim();
  return { keys, clean };
}

// Respaldo: detecta por palabras clave del mensaje del cliente qué foto/video enviar,
// por si la IA no puso el marcador. Así el envío de multimedia es confiable.
function detectMediaIntent(text) {
  const t = (text || "").toLowerCase();
  const has = (arr) => arr.some((w) => t.includes(w));
  const quiereVer = has(["foto", "fotos", "imagen", "imagenes", "imágenes",
    "muestr", "muéstr", "enséñ", "enseñ", "ensename", "mira", "manda", "envia", "envía", " ver "]);
  const keys = [];
  // Colores con foto individual disponible
  const conFoto = [];
  if (has(["rojo", "roja"])) conFoto.push("rojo");
  if (has(["verde"])) conFoto.push("verde");
  if (has(["negro", "negra"])) conFoto.push("negro");
  // Colores sin foto individual (se muestran en el cuadro de colores)
  const pideColorSinFoto = has(["blanco", "blanca", "morado", "morada", "amarillo", "azul", "gris"]);
  const pideColorGenerico = t.includes("color");
  const mencionaColor = conFoto.length > 0 || pideColorSinFoto || pideColorGenerico;

  if (quiereVer && conFoto.length > 0) {
    conFoto.forEach((k) => keys.push(k));        // foto específica del color pedido
  } else if (pideColorGenerico || (quiereVer && pideColorSinFoto)) {
    keys.push("colores");                         // cuadro con todos los colores
  }
  // 📚 Catálogo: el cliente lo pide por nombre. Va primero porque trae foto,
  // descripción y precio, y es mejor que una imagen suelta.
  if (has(["catalogo", "catálogo", "catalogos", "catálogos", "que mas tienen",
           "qué más tienen", "otros productos", "mas productos", "más productos",
           "variedad", "lista de productos"])) keys.push("catalogo");
  // Los otros productos del catálogo, por nombre
  if (has(["colmena", "premium", "gama alta", "forro"])) keys.push("colmena");
  if (has(["reflectiv", "doble faz", "que brille", "se vea de noche"])) keys.push("reflectiva");
  if (has(["guante", "guantes"])) keys.push("guantes");
  if (has(["puesto", "puesta", "modelo", "se ve", "persona"])) keys.push("modelo");
  if (t.includes("video")) keys.push("video");
  // Foto del producto: solo si NO pidió un color específico
  if (quiereVer && !mencionaColor && has(["producto", "conjunto", "impermeable", "piezas", "traje", "articulo", "artículo"])) keys.push("producto");
  if (quiereVer && keys.length === 0) keys.push("producto");
  return keys;
}

// Genera la respuesta para un mensaje entrante
async function generateReply(phone, userText) {
  store.pushMsg(phone, "user", userText);
  const conv = store.getConv(phone);

  // ==========================================================================
  // 🥇 EL ARRANQUE NO SE IMPROVISA
  //
  // Si es el primer contacto y el cliente no pregunto nada (llego con el texto
  // prerrellenado del anuncio o solo saludo), se le manda el arranque fijo: el
  // que responde talla y color de una, que son el 28,1% de las dudas.
  //
  // Va ANTES de la llamada a la IA a proposito: sale instantaneo y gratis, y es
  // el mensaje que mas se repite en toda la operacion. Ver primer-mensaje.js.
  //
  // Cualquier otro caso (pregunta concreta, anuncio del colmena, charla ya
  // empezada) devuelve null y sigue el camino normal.
  // ==========================================================================
  const arranque = respuestaDeArranque(conv.messages, userText);
  if (arranque) {
    store.pushMsg(phone, "assistant", arranque);
    return { reply: arranque, order: null, handoff: false, media: [], pedidoRescatado: false, revisionHumana: null };
  }

  // ==========================================================================
  // 🧾 EL PRECIO SE CALCULA EN CÓDIGO, NO LO RESUELVE EL MODELO (26-sep)
  //
  // Hasta hoy el guion llevaba una tabla de 107 ciudades en 5 bandas y el modelo
  // leía la fila y sumaba. `cotizar()` —probado y correcto— no se llamaba nunca.
  //
  // Ahora: el código resuelve destino y cantidad, calcula, y le pasa al modelo
  // los números ya validados. El modelo pone la explicación comercial.
  // ==========================================================================
  // ⚠️ Destino y cantidad se resuelven contra TODO el hilo, no contra una ventana
  // de dos mensajes. La revisión del 26-sep encontró que la cantidad se perdía:
  // después de "quiero dos conjuntos", la ciudad y la talla la devolvían a una
  // unidad. Las dos funciones viven en cotizacion.js para que las pruebas
  // recorran exactamente este camino y no una versión de laboratorio.
  const previa = store.leerCotizacion(phone);
  const destino = cotizacion.destinoDelHilo(conv, userText);
  const cantidad = cotizacion.cantidadDelHilo(conv, userText, previa && previa.uds);
  const cot = cotizacion.calcular(destino.ciudad, userText, { cantidad });
  if (cot.ok) store.guardarCotizacion(phone, cot);
  const objecionDePrecio = cotizacion.hayObjecionDePrecio(conv.messages);
  const contextoPrecio = { objecionDePrecio };

  let reply;
  let validacion = null;
  // ==========================================================================
  // 🙋 UN SOLO CAMINO PARA MANDAR UN CHAT A UN HUMANO
  //
  // Las entregas 1 y 2 llegaron cada una con su mecanismo: la 1 tenía un
  // `forzarHumano` para el pedido que no cuadra, y la 2 un `revisionHumana` para
  // la promesa sin respaldo. Al juntarlas se unificaron en este, y no por
  // prolijidad: el de la entrega 1 solo pausaba el chat, y una pausa NO AVISA a
  // nadie. Con los dos por el mismo camino, los dos casos le llegan al dueño.
  //
  // Queda distinto de null → el chat se pausa Y se manda el aviso desde server.js.
  // ==========================================================================
  let revisionHumana = null;
  if (!TIENE_IA) {
    reply =
      "¡Hola! 🏍️ Gracias por escribir a BikerPro. (Bot en modo prueba: falta configurar la API de IA). " +
      "El conjunto impermeable de 4 piezas cuesta $59.900 con pago contraentrega 📦";
  } else {
    // ========================================================================
    // ========================================================================
    // 🔑 ETAPA 5: SE REVISA EL MENSAJE ANTES DE QUE SALGA
    //
    // Sin esto, pasarle los números al modelo sigue siendo una instrucción — y
    // este proyecto ya aprendió cinco veces que una instrucción no es un candado.
    //
    // ⚠️ SE VALIDA EL TEXTO LIMPIO, el que ve el cliente: el bloque ##ORDER##
    // lleva el total adentro y validarlo ahí sería revisar el dato contra sí mismo.
    //
    // ⚠️ Y SI SE REGENERA, LO DE LA VUELTA ANTERIOR SE DESCARTA COMPLETO. El
    // pedido se extrae DESPUÉS de aceptar una respuesta: así un intento fallido
    // no puede guardar un pedido ni disparar un efecto duplicado.
    // ========================================================================

    // ========================================================================
    // 🧩 ACÁ SE JUNTAN LAS TRES ENTREGAS, Y ESTE ES EL ÚNICO LUGAR DONDE PASA
    //
    // El prompt de cada turno se arma en tres capas, en este orden:
    //
    //   1. buildSystemPrompt()      el guion de ventas        (~7.555 tokens)
    //   2. cotizacion.bloqueDeDatos los números ya calculados  (entrega 1)
    //   3. comercial.guionConNota   la nota del turno          (entrega 3, apagada
    //                                                          por defecto)
    //
    // 🔑 Y el ORDEN IMPORTA: la nota comercial va ÚLTIMA. Si fuera antes del bloque
    // de precio, el "usá estos números tal cual" quedaría enterrado en el medio del
    // prompt, y lo que no puede fallar es el precio.
    //
    // 📏 El techo de 9.000 tokens se mide sobre el prompt COMPLETO, con las tres
    // capas puestas — no solo sobre el guion. Medirlo sin el bloque de precio era
    // medir otra cosa.
    //
    // 🔗 Y la cotización le PASA datos a la nota: si el destino es de difícil
    // acceso, `comboEncaja` se entera por acá y no tiene que adivinarlo.
    //
    // 🔘 La capa 3 ARRANCA APAGADA: se prende con NOTA_COMERCIAL=1 y se apaga
    // volviéndola a 0, sin desplegar nada. Las capas 1 y 2 van siempre, porque no
    // son una mejora a medir: son el precio, y el precio no puede fallar.
    // ========================================================================
    const guionConPrecio = buildSystemPrompt() + "\n\n" + cotizacion.bloqueDeDatos(cot, contextoPrecio);
    const conNota = comercial.guionConNota(guionConPrecio, conv.messages, userText, {
      sinPromo2: Boolean(
        cot.sinPromo2 || (cot.destino && cot.destino.sinPromo2) || cot.motivo === "dificil_sin_promo"
      ),
      yaConocidos: { ciudad: cot.ok ? cot.ciudad : "" },
    });
    if (conNota.nota && !conNota.cupo) {
      // 🔴 La red de seguridad saltó: la nota está prendida pero no cabe. Se avisa
      // fuerte en vez de apagarla en silencio, porque si esto pasa hay que
      // recortar el guion, no resignarse.
      console.warn(
        `🔴 NOTA COMERCIAL OMITIDA POR TAMAÑO: el prompt completo da ${conNota.tokens} tokens y el ` +
          `techo es ${comercial.TECHO_TOKENS}. La nota está ACTIVA pero no cabe: hay que recortar el guion.`
      );
    }
    const guion = conNota.prompt;

    const MAX_INTENTOS = 2;
    for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
      let candidata;
      try {
        candidata = await callIA(guion, conv.messages);
      } catch (e) {
        console.error("Error IA:", e.message);
        reply =
          "Perdón, se me cruzó la señal un momento 🙏 ¿Me repites lo último, por favor? Con gusto sigo con tu pedido 🏍️";
        validacion = null;
        break;
      }
      // Se valida solo la parte visible: sin marcadores ni bloque de pedido.
      const soloTexto = extractMedia(extractOrder(candidata.replace(/##HANDOFF##/g, "")).clean).clean;
      validacion = cotizacion.validarRespuesta(soloTexto, cot, contextoPrecio);
      reply = candidata;
      if (validacion.ok) break;

      console.warn(
        `⚠️  Respuesta con importes no validados (intento ${intento}/${MAX_INTENTOS}) para ${phone}: ` +
          validacion.problemas.map((p) => p.detalle).join(" · ")
      );
    }

    // Si después del reintento sigue mal, NO sale un precio inventado.
    if (validacion && !validacion.ok) {
      if (cot.ok) {
        reply = cotizacion.lineaDePrecio(cot);
        console.warn(`🔧 Se reemplazó la respuesta por la línea de precio calculada para ${phone}.`);
      } else {
        reply =
          "Dejame confirmarte bien el valor del envío a tu ciudad y te escribo en un momento 📦";
        console.warn(`🔧 Sin cotización válida para ${phone}: se escala en vez de dar un número.`);
      }
    }
  }

  // ==========================================================================
  // 🔴 CANDADO: SIN CELULAR NO HAY DESPACHO
  //
  // El guion ya pedía el celular y ya tenía la regla de quitarle el "57". Pero
  // las dos daban por hecho que el teléfono SIEMPRE llega — y la de quitar el
  // 57 existe precisamente porque se copiaba del número del chat.
  //
  // Eso se rompió: los clientes con username de WhatsApp NO tienen número de
  // chat. Si la IA no pidió el celular, no hay de dónde sacarlo, y un pedido sin
  // teléfono NO SE PUEDE DESPACHAR: la transportadora lo exige para la guía.
  //
  // Y esto va acá, en código, no solo en el prompt. Hoy ya aprendimos que una
  // instrucción al modelo no es un candado: el bloque ##ORDER## se emitía dos
  // veces aunque el prompt dijera que no. Lo que no puede fallar, se blinda.
  // ==========================================================================
  const handoff = reply.includes("##HANDOFF##");
  reply = reply.replace(/##HANDOFF##/g, "").trim();

  const orderRes = extractOrder(reply);
  reply = orderRes.clean;
  const order = orderRes.order;
  // true = el bloque venía cortado y se reconstruyó campo por campo. Puede
  // faltarle algo, así que el aviso al dueño tiene que decirlo.
  const pedidoRescatado = orderRes.rescatado;

  const mediaRes = extractMedia(reply);
  reply = mediaRes.clean;

  // ==========================================================================
  // 🚫 PROMESAS QUE EL BOT NO PUEDE RESPALDAR (26-sep)
  //
  // Cuatro casos reportados: afirmó haber actualizado un pedido, dijo conocer el
  // estado del despacho, prometió despacho "hoy mismo", y garantizó cubrir una
  // maleta sin saber sus medidas. Más un "¡Así es!" a "están en Cali", cuando la
  // bodega está en Bogotá.
  //
  // 🔑 El cliente TOMA DECISIONES con eso: confirma creyendo que el teléfono
  // quedó cambiado, o espera el paquete un día que nadie prometió. La novedad, la
  // queja o la devolución las paga el negocio.
  //
  // ⚠️ NO se reescribe ni se borra la respuesta: un detector que deja al cliente
  // sin contestación es peor. Se manda igual y el chat pasa a modo humano, para
  // que el dueño lo vea y corrija antes de que el cliente actúe sobre eso.
  // ==========================================================================
  // 🔧 Se CORRIGE antes de enviar, frase por frase. La revisión del 26-sep señaló
  // —con razón— que mandar el mensaje falso y pausar después no protege a nadie:
  // el cliente ya lo leyó y actúa sobre eso. Ver promesas.js.
  const chequeoPromesas = promesas.revisar(reply);
  if (!chequeoPromesas.ok) {
    const corregido = promesas.corregir(reply);
    if (corregido.cambios.length) {
      console.warn(
        `🔧 PROMESA SIN RESPALDO de ${phone}: ` +
          corregido.cambios
            .map((c) => `${c.clave} · "${c.antes}" → ${c.despues === null ? `(sin reemplazo: ${c.sinReemplazo})` : `"${c.despues}"`}`)
            .join(" | ")
      );
      reply = corregido.texto;
      revisionHumana = {
        motivo: "promesa_sin_respaldo",
        detalle: corregido.cambios.map((c) => `${c.clave}: "${c.antes}"`).join(" · "),
      };
    } else {
      console.warn(
        `⚠️  PROMESA SIN RESPALDO SIN REEMPLAZO de ${phone}: ${promesas.resumir(chequeoPromesas)}`
      );
      revisionHumana = { motivo: "promesa_sin_respaldo", detalle: promesas.resumir(chequeoPromesas) };
    }
  }

  // ==========================================================================
  // 🔒 RECONCILIACIÓN FINAL: LO QUE SALE TIENE QUE PASAR LAS DOS VALIDACIONES
  //
  // 🔴 DE DÓNDE SALE (revisión 26-sep): corregir una promesa es una TRANSFORMACIÓN
  // DE TEXTO, y una transformación de texto puede romper el precio. El caso
  // reportado partía "$82.000" en dos y dejaba "según la ciudad.000".
  //
  // `promesas.corregir` ya tiene su propio candado de importes, pero acá se revisa
  // el resultado FINAL contra las dos validaciones, después de TODAS las
  // transformaciones del turno. Es el último punto donde se puede mirar lo que el
  // cliente va a leer de verdad.
  //
  // Si algo no cuadra —el precio quedó mal, o la promesa no se pudo aislar del
  // importe— NO se manda eso: sale la línea escrita por el código, que dice el
  // precio correcto y no promete nada. El cliente igual recibe respuesta.
  // ==========================================================================
  {
    const visible = extractMedia(extractOrder(reply).clean).clean;
    const precioFinal = cotizacion.validarRespuesta(visible, cot, contextoPrecio);
    const promesaFinal = promesas.revisar(visible);
    if (!precioFinal.ok || !promesaFinal.ok) {
      const porQue = [
        !precioFinal.ok ? `precio: ${precioFinal.problemas.map((p) => p.detalle).join(" · ")}` : "",
        !promesaFinal.ok ? `promesa: ${promesas.resumir(promesaFinal)}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
      console.warn(`🔒 RESPUESTA FINAL RECHAZADA para ${phone}: ${porQue}`);
      reply = cot.ok
        ? cotizacion.lineaDePrecio(cot)
        : "Dejame confirmarte bien el valor del envío a tu ciudad y te escribo en un momento 📦";
      revisionHumana = { motivo: "respuesta_final_rechazada", detalle: porQue };
    }
  }
  // Combina lo que pidió la IA (marcadores) con la detección por palabras clave del cliente
  const media = Array.from(new Set([...mediaRes.keys, ...detectMediaIntent(userText)]));

  // ==========================================================================
  // 📊 LA CUENTA DE LO COMERCIAL — esto es lo que hace la mejora medible
  //
  // ⚠️ NO bloquea, NO reescribe y NO pausa el chat. Una mejora comercial que deja
  // al cliente esperando no es una mejora: acá lo peor que puede pasar es que el
  // mensaje salga menos bien, y eso no se arregla con silencio.
  //
  // Solo deja un renglón con prefijo estable por cada cosa que no se cumplió, para
  // poder contarlas y saber después si esto sirvió de algo. Sin la cuenta, "mejora
  // comercial" es una opinión.
  // ==========================================================================
  const chequeoComercial = comercial.revisar(reply, { userText, messages: conv.messages });
  if (!chequeoComercial.ok) {
    console.log(`📊 COMERCIAL ${phone}: ${comercial.resumir(chequeoComercial)}`);
  }

  let savedOrder = null;
  if (order) {
    // ========================================================================
    // 🔴 CANDADO CERO: SIN "SÍ CONFIRMO" NO HAY VENTA.
    //
    // El 23-sep quedó guardado como pedido un cliente que había dicho "No
    // confirmo". El modelo emitió el bloque junto con el cuadro, antes de que el
    // cliente contestara. Un pedido así no es un número mal contado: si se
    // despacha por el panel, sale un paquete para alguien que dijo que no.
    //
    // Va ANTES de los otros candados porque si no hay venta, lo demás no importa.
    // ========================================================================
    const conf = revisarConfirmacion(order, store.getConv(phone).messages, reply);
    if (!conf.guardar) {
      console.warn(
        `⏭️  PEDIDO NO GUARDADO (${conf.estado}) de ${phone}: ${conf.motivo}. ` +
          `Cliente: ${order.nombre || "?"} · ${order.ciudad || "?"} · $${order.total || "?"}`
      );
    } else {
      // Dos candados más: el celular y la dirección. Los dos son requisitos de la
      // transportadora, y los dos ya se rompieron en producción porque el guion
      // los pedía y el modelo no siempre obedecía.
      const conTelefono = revisarTelefono(order, phone);
      const conDireccion = revisarDireccionDePedido({ ...conTelefono, telefono_chat: phone });

      // ======================================================================
      // 🧾 ETAPA 6: EL PEDIDO NO PUEDE CONTRADECIR LA COTIZACIÓN
      //
      // Si el total del bloque no es el validado —ni la negociación autorizada—
      // el pedido NO se descarta y NO se confirma como si todo hubiera salido
      // bien: se guarda marcado y fuera del flujo normal de despacho.
      //
      // 🔑 Borrarlo en silencio sería perder una venta real por un número mal
      // escrito. Confirmarlo como bueno sería despachar con el recaudo mal.
      // ======================================================================
      const chequeoPrecio = cotizacion.verificarPedido(conDireccion, cot, contextoPrecio);
      if (!chequeoPrecio.ok) {
        console.warn(
          `🔴 PEDIDO QUE NO CUADRA CON LA COTIZACIÓN (${phone}): ` +
            chequeoPrecio.problemas.map((p) => p.detalle).join(" · ") +
            ". SE GUARDA marcado para revisión, fuera del flujo de despacho."
        );
      }

      savedOrder = store.saveOrder({
        ...conDireccion,
        ...(conf.marcar ? { sin_confirmar: true, motivo_sin_confirmar: conf.motivo } : {}),
        ...(chequeoPrecio.ok
          ? {}
          : {
              precio_no_cuadra: true,
              pendiente_revision: true,
              motivo_precio: chequeoPrecio.problemas.map((p) => p.detalle).join(" · "),
              total_esperado: chequeoPrecio.totalEsperado,
            }),
        ...(cot.ok
          ? { cotizacion_politica: cot.politica, cotizacion_total: cot.total, cotizacion_banda: cot.banda }
          : {}),
      });
      if (conf.marcar) {
        console.warn(
          `⚠️  PEDIDO SIN CONFIRMACIÓN CLARA de ${phone}: ${conf.motivo}. ` +
            "SE GUARDA, pero hay que leer el chat antes de despachar."
        );
      }

      // ======================================================================
      // 🔴 SI EL PEDIDO QUEDÓ EN REVISIÓN, NO SE LE CONFIRMA AL CLIENTE
      //
      // Guardar la marca no alcanza si al cliente ya se le dijo "¡listo, te lo
      // despacho!": queda esperando un paquete a un precio que no podemos
      // sostener. Se reemplaza SOLO la afirmación de cierre —si la hay— por una
      // respuesta que no promete nada y no lo deja sin contestación, y el chat
      // pasa al dueño.
      // ======================================================================
      if (savedOrder && store.requiereRevision(savedOrder) && cotizacion.afirmaCierre(reply)) {
        const motivos = store.textoDeRevision(savedOrder);
        console.warn(
          `🔴 RESPUESTA DE CIERRE REEMPLAZADA (${phone}): el pedido requiere revisión (${motivos}) ` +
            "y el mensaje le confirmaba la venta al cliente. Se manda una respuesta que no promete despacho."
        );
        reply = cotizacion.respuestaEnRevision(savedOrder);
        // 🔑 Avisa, no solo pausa: este caso nacía silencioso en la entrega 1.
        revisionHumana = { motivo: "pedido_en_revision", detalle: motivos };
      }
    }
  }
  // Un pedido en revisión o una promesa corregida mandan el chat a un humano igual
  // que un ##HANDOFF##: el dueño tiene que cerrar esa venta a mano.
  if (handoff || revisionHumana) store.setPaused(phone, true);

  store.pushMsg(phone, "assistant", reply);
  return { reply, order: savedOrder, handoff, media, pedidoRescatado, revisionHumana };
}

// ============================================================================
// 🧭 De dónde salen la ciudad y la cantidad: ver cotizacion.js
//
// `detectarCiudad()` y `textoDelCliente()` vivían acá y se movieron a
// cotizacion.js como `destinoDelHilo()` y `cantidadDelHilo()`.
//
// 🔴 POR QUÉ SE MOVIERON (revisión 26-sep): acá no se podían probar sin levantar
// el bot, y las dos tenían un defecto que ninguna batería veía:
//
//   · `textoDelCliente()` miraba solo los dos últimos mensajes del cliente, así
//     que "quiero dos conjuntos" se perdía en cuanto contestaba ciudad y talla, y
//     el pedido volvía a UNA unidad en silencio.
//   · `detectarCiudad()` solo reconocía ciudades del tarifario, así que
//     "Gachancipá" era invisible y el bot preguntaba la ciudad para siempre.
//
// Ahora las pruebas recorren el mismo camino que este archivo usa.
// ============================================================================

// Identificador de cliente con username (no es un teléfono).
const RE_BSUID_AG = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;

/**
 * Devuelve el celular en el formato que espera la transportadora (10 dígitos
 * que empiezan en 3) o null si no sirve.
 *
 * Acepta que venga con el 57 adelante y lo quita, que era la regla que ya
 * existía en el guion: pasó 8 veces en 4 días y llegaba mal a la transportadora.
 */
function celularValido(c) {
  const d = String(c == null ? "" : c).replace(/\D/g, "");
  const s = d.length > 10 ? d.slice(-10) : d;
  return /^3\d{9}$/.test(s) ? s : null;
}

/**
 * Se asegura de que el pedido tenga un celular usable, y si no lo tiene, lo
 * marca como NO DESPACHABLE en vez de dejarlo pasar en silencio.
 *
 * @param {object} order el pedido que armó la IA
 * @param {string} chatId teléfono del chat, o BSUID si el cliente usa username
 */
function revisarTelefono(order, chatId) {
  const propio = celularValido(order.celular);
  if (propio) return { ...order, celular: propio };

  // No dio celular. Si el chat ES un teléfono, ese sirve: es el número por el
  // que está escribiendo. (Antes esto lo hacía la IA copiándolo, de ahí la
  // regla del "57"; ahora lo hace el código y siempre bien formateado.)
  if (!RE_BSUID_AG.test(String(chatId))) {
    const delChat = celularValido(chatId);
    if (delChat) return { ...order, celular: delChat, celularDelChat: true };
  }

  // No hay teléfono en ninguna parte: cliente con username que no lo dio.
  console.error(
    `🔴 PEDIDO SIN TELÉFONO de ${chatId}: ${order.nombre || "?"} en ${order.ciudad || "?"}. ` +
      "NO SE PUEDE DESPACHAR hasta que dé un celular."
  );
  return { ...order, celular: "", sinTelefono: true, despachable: false };
}

// extractOrder y rescatarPedido se exportan para poder probarlos sin llamar a
// la IA: son el camino por donde se perdían pedidos enteros en silencio.
// callIA se exporta para el extractor de datos del chat (src/extraer.js), que
// necesita hacerle UNA pregunta corta al modelo sin pasar por el guion de ventas
// ni escribirle nada al cliente.
module.exports = { generateReply, revisarTelefono, celularValido, extractOrder, rescatarPedido, callIA };
