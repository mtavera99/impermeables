// ============================================================================
// 📦 POSVENTA — PREGUNTAR POR UN PEDIDO NO ES COMPRAR OTRO
//
// 🔴 DE DÓNDE SALE ESTE MÓDULO: el caso Heber (25 → 27 de septiembre).
//
// Heber confirmó el 25: 2 unidades XL, rojo + blanco, San Martín (Cesar),
// $155.000. El 27 escribió UNA sola línea:
//
//     "si mandaron el pedido gracias"
//
// Eso es una pregunta de estado. Apareció un SEGUNDO pedido del 27 por los mismos
// $155.000.
//
// 🔎 LA CAUSA, reproducida y distinta de la que se suponía. No fue solo que el
// modelo emitiera otro ##ORDER## por error: **el propio candado de confirmación
// leyó la pregunta como una aceptación de compra**.
//
//     RE_SI.test("si mandaron el pedido gracias")  →  true
//
// El patrón del "sí" está anclado al principio y empieza por `si\b`. En español el
// "si" sin tilde es CONDICIONAL —"si mandaron…", "si pido dos…"— y el "sí" con
// tilde es la afirmación; pero el texto se normaliza sin tildes antes de
// compararlo, así que las dos formas llegan iguales. La frase entraba como un
// "sí, confirmo" y pasaba el candado.
//
//     RE_SI.test("ok")  →  true   (el mismo problema con una cortesía suelta)
//
// 🔑 LAS DOS DEFENSAS QUE FALTABAN:
//
//   1. INTENCIÓN: si ya hay un pedido confirmado y el cliente pregunta por su
//      estado o solo agradece, el turno es POSVENTA. Aunque el modelo emita un
//      ##ORDER##, no puede nacer una venta de ahí.
//
//   2. ESTADO REAL: la respuesta de posventa se arma con lo que el pedido de
//      verdad tiene. A Heber se le dijo "ya fue procesado y está en manos de la
//      transportadora" cuando no había ninguna guía registrada. Eso no se puede
//      afirmar por intuición.
//
// ⚠️ Y lo que este módulo NO puede hacer es matar una compra real. Si el cliente
// dice "quiero otros dos para mi hermano", eso es intención nueva explícita y
// tiene que poder existir como segundo pedido.
// ============================================================================

// Se compara sin tildes y en minúscula: así "cuándo" y "cuando" son lo mismo.
const plano = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// ── 1. Preguntas por el ESTADO de un pedido que ya existe ───────────────────
const RE_PREGUNTA_ESTADO = new RegExp(
  [
    // ¿ya lo mandaron?
    "\\b(ya\\s+)?(mandaron|mandaste|mandaron ya|enviaron|enviaste|despacharon|despachaste|despacho|salio|lo tienen|lo enviaron|la enviaron)\\b",
    // ¿cuándo llega?
    "\\bcuando\\s+(llega|llegara|me llega|lo recibo|la recibo|lo entregan|me lo entregan)\\b",
    "\\b(en cuanto|en cuantos dias|cuantos dias)\\b.{0,20}\\b(llega|llegara|demora)\\b",
    // guía / rastreo
    "\\b(tiene|hay|tienen|tienes|me das|me pasas|cual es)\\b.{0,16}\\b(guia|numero de guia|rastreo|seguimiento)\\b",
    "\\b(guia|rastreo)\\b",
    // ¿dónde va?
    "\\bdonde\\s+(va|esta|anda|quedo)\\b",
    "\\b(va|viene)\\s+en camino\\b",
    // el pedido, en general
    "\\b(que paso|que ha pasado|novedad|noticias)\\b.{0,20}\\b(pedido|envio|paquete)\\b",
    "\\b(sigo|estoy)\\s+esperando\\b",
  ].join("|")
);

// ============================================================================
// 🔴 «MI PEDIDO» NO ES UNA PREGUNTA DE ESTADO
//
// Acá había una alternativa `\b(mi|el)\s+(pedido|envio|paquete)\b` que capturaba
// cualquier frase que nombrara el pedido. Reproducido: las cinco caían en posventa
// y se les contestaba con el estado del envío.
//
//   "quiero cambiar mi pedido a talla XL"       → respuesta de tracking 🔴
//   "quiero corregir la dirección de mi pedido" → respuesta de tracking 🔴
//   "mi pedido lo quiero con franja roja"       → respuesta de tracking 🔴
//   "quiero cambiar la ciudad de mi pedido"     → respuesta de tracking 🔴
//   "quiero cancelar mi pedido"                 → respuesta de tracking 🔴
//
// 🔑 Nombrar el pedido no dice qué quiere hacer con él. Lo que decide es el VERBO:
// preguntar dónde está es posventa; cambiar algo es una modificación; cancelar es
// otra cosa. Así que "mi pedido" solo cuenta como consulta de estado si viene con
// una palabra de estado, y nunca si viene con una de cambio.
// ============================================================================

// Querer CAMBIAR algo del pedido. Esto gana sobre cualquier lectura de estado.
const RE_QUIERE_MODIFICAR = new RegExp(
  [
    "\\b(cambiar|cambiale|cambia|corregir|corrige|corrijo|modificar|modifica|arreglar|ajustar|actualizar)\\b",
    "\\b(en vez de|en lugar de|mejor que sea|que sea mejor|equivoque|equivoco|esta mal|estaba mal)\\b",
    "\\b(agregar|agregale|quitar|quitale|sumar|restar)\\b.{0,20}\\b(talla|color|unidad|conjunto)\\b",
    // "mi pedido lo quiero con franja roja" — el pedido + un atributo deseado.
    "\\b(mi|el|ese|este)\\s+(pedido|envio|paquete)\\b.{0,30}\\b(lo quiero|la quiero|con|en)\\s+\\b(talla|color|franja|rojo|roja|azul|negro|negra|verde|blanco|blanca|amarillo|naranja|gris|xs|s|m|l|xl|2xl|3xl)\\b",
  ].join("|")
);

// Querer CANCELAR. Tampoco es una consulta de estado.
const RE_QUIERE_CANCELAR =
  /\b(cancelar|cancela|cancelalo|cancelen|anular|anula|anulen|devolver|devolucion|ya no lo quiero|ya no quiero|no lo quiero|desistir)\b/;

// ============================================================================
// 🛟 SOPORTE DE POSVENTA: GARANTÍA, CAMBIO, O ALGO QUE LLEGÓ MAL — 30-sep
//
// DE DÓNDE SALE, pedido del dueño: "cuando un cliente escriba para cambios,
// garantías, o que ya compró y necesita algún tipo de soporte o ayuda, ponle una
// nueva categoría o color para diferenciarlo y darle atención a ese tipo de caso".
//
// 🔴 POR QUÉ HOY SE PIERDEN. `atencion.evaluar()` tiene esta línea:
//
//     if (c.compro && puntos < 60) return { nivel: null, puntos: 0, motivos: [] };
//
// O sea: un cliente que YA COMPRÓ y no llega a 60 puntos desaparece del panel.
// La idea era sana —"el que ya compró y no tiene problema no necesita atención"—
// pero "me llegó la talla equivocada" no matchea ninguna de las señales que dan
// puntos, así que suma 25 y se va a cero. Y si el bot ya le contestó (tiene una
// respuesta armada para "¿tiene garantía?"), suma 0 y NO APARECE NUNCA.
//
// Resultado: el caso más caro de todos —un cliente con el producto en la mano y
// un problema— es justo el que el panel esconde.
//
// 🔑 ESTAS SEÑALES NO DEPENDEN DE `c.compro`. Ese flag solo se prende si el
// pedido pasó por el bot, y hay ventas tomadas a mano y del agente anterior. Si
// alguien escribe "me llegó roto", compró: no hace falta que nuestro flag lo
// sepa. Pedir las dos cosas dejaría afuera justo a los clientes viejos.
// ============================================================================

// ── Algo que ya tiene en la mano y salió mal ────────────────────────────────
// Sin tildes: `plano()` las quita, así que "dañado" acá se escribe "danad".
const RE_LLEGO_MAL = new RegExp(
  [
    // "me llegó roto", "vino incompleto", "llegó otra talla"
    // ⚠️ SIN \b AL FINAL. Estos son PREFIJOS: "danad" tiene que casar con
    // "danado" y "danada". Con el \b de cierre no casaba con ninguno de los dos,
    // y "el pedido llegó dañado" —el reclamo más común que existe— no se
    // detectaba. Ese \b de más me costó cuatro casos de esta batería.
    "\\b(llego|llegaron|me llego|recibi|vino|venia|trajeron)\\b.{0,30}\\b(rot[oa]|danad|mal\\b|mal[oa]|defectuos|incomplet|partid|rajad|rayad|sucio|usad|otra talla|otro color|equivocad|distint|diferent|cambiad)",
    // "se rompió", "se descosió", "se despegó la costura"
    "\\b(se\\s+)?(rompio|revento|descosio|despego|rajo|partio|dano)\\b",
    // "está roto", "salió defectuoso"
    "\\b(esta|estaba|salio|vino)\\s+(rot[oa]|danad|defectuos|mal[oa]|incomplet)",
    // "le falta una pieza", "vino sin el cargador"
    "\\b(le falta|me falta|falta el|falta la|falta una|vino sin|llego sin|no venia|no trajo)\\b",
    // La talla: el motivo de cambio más común en ropa.
    "\\b(me queda|quedo|me quedo|queda)\\s+(grande|pequen|chic[oa]|apretad|corto|corta|anch[oa]|holgad)",
    "\\b(talla|color)\\s+(equivocad|errad|cambiad|distint|diferent|incorrect)",
    "\\b(no es la talla|no es el color|no era la talla|no era el color)\\b",
    // "el color es diferente al que pedí", "la talla está cambiada"
    "\\b(talla|color)\\b.{0,15}\\b(es|esta|era|vino|llego)\\b.{0,12}(distint|diferent|otr[oa]\\b|equivocad|cambiad|errad)",
  ].join("|")
);

// ── No funciona ─────────────────────────────────────────────────────────────
// Sobre todo para el V10: "no carga", "no empareja", "no prende".
const RE_NO_FUNCIONA = new RegExp(
  [
    "\\bno\\s+(me\\s+)?(funciona|sirve|anda|enciende|prende|carga|conecta|empareja|emparej|pega|reconoce|responde)\\b",
    "\\b(dejo de|deja de)\\s+(funcionar|servir|cargar|prender|encender|conectar)\\b",
    "\\b(no da|no hay)\\s+(sonido|audio|senal|bateria)\\b",
  ].join("|")
);

// ⛔ "No funciona" también se dice de cosas que NO son el producto. Sin esto, un
// cliente que todavía no compró y escribe "no me funciona el link" entraría como
// posventa, y ensuciar la categoría nueva es la forma más rápida de que el dueño
// deje de confiar en ella.
const RE_NO_ES_EL_PRODUCTO =
  /\b(link|enlace|pagina|web|whatsapp|numero|telefono|formulario|codigo|cupon|descuento|promocion|boton|catalogo|foto|imagen|video|audio que mande)\b/;

// ── Garantía ────────────────────────────────────────────────────────────────
// 🔑 "¿Tiene garantía?" ANTES de comprar es una pregunta informativa, y el bot ya
// la responde solo. Lo que es posventa es querer USARLA. Se separan a propósito:
// meter la pregunta previa acá llenaría la categoría de gente que solo averigua.
const RE_USAR_LA_GARANTIA = new RegExp(
  [
    "\\b(hacer|hago|haga|aplicar|aplico|reclamar|reclamo|usar|uso|cobrar)\\s+(efectiva\\s+)?(la\\s+)?garantia\\b",
    "\\bgarantia\\b.{0,20}\\b(efectiva|reclam|aplic|cubre esto|me cubre|sirve para esto)\\b",
    "\\b(esta|entra|aplica|cubre)\\s+(en|con|la)?\\s*garantia\\b",
    "\\bpor\\s+garantia\\b",
  ].join("|")
);

// La palabra sola. Solo cuenta si hay otra señal de que ya lo tiene.
const RE_MENCIONA_GARANTIA = /\bgarantia\b/;

// ── Cambio de producto ──────────────────────────────────────────────────────
// ⚠️ Ojo con RE_QUIERE_MODIFICAR: eso es cambiar el PEDIDO antes de que salga.
// Esto es cambiar algo que el cliente YA TIENE. Se distinguen por las palabras
// de recibido ("me llegó", "me queda"), no por adivinar.
const RE_QUIERE_CAMBIARLO = new RegExp(
  [
    "\\b(cambio|cambiar|cambiarlo|cambiarla|cambien|camben)\\b.{0,30}\\b(por otra talla|por otro color|por uno nuevo|por otra|por otro)\\b",
    "\\b(cambio|cambiar)\\s+de\\s+(talla|color)\\b",
    "\\b(quiero|necesito|puedo|podria|como hago para)\\b.{0,20}\\bcambiar(lo|la)?\\b",
  ].join("|")
);

// ── Pedir ayuda habiendo comprado ───────────────────────────────────────────
const RE_PIDE_AYUDA =
  /\b(ayuda|ayudenme|ayudeme|ayudar|soporte|asesor|reclamo|queja|problema|inconveniente)\b/;

/**
 * ¿Es un caso de soporte de posventa —garantía, cambio, o algo que llegó mal?
 *
 * @param {string} texto lo que escribió el cliente
 * @param {{compro?: boolean}} [opciones] `compro` es solo una señal de APOYO:
 *   las señales fuertes valen por sí solas, porque hay ventas que no pasaron por
 *   el bot y ese flag no las conoce.
 * @returns {{necesita: boolean, motivo: string}}
 */
function necesitaSoporte(texto, opciones = {}) {
  const t = plano(texto);
  if (!t) return { necesita: false, motivo: "" };
  const compro = Boolean(opciones.compro);

  // --- Señales fuertes: valen solas ---
  if (RE_LLEGO_MAL.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: dice que lo que recibió llegó mal o se dañó" };
  }
  if (RE_NO_FUNCIONA.test(t) && !RE_NO_ES_EL_PRODUCTO.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: dice que no le funciona" };
  }
  if (RE_USAR_LA_GARANTIA.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: quiere usar la garantía" };
  }
  if (RE_QUIERE_CAMBIARLO.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: quiere cambiar el producto" };
  }

  // --- Señales que necesitan que ya haya comprado ---
  // Solas serían ambiguas: "garantía" a secas es una pregunta de alguien que
  // está averiguando, y "ayuda" lo dice cualquiera.
  if (compro && RE_MENCIONA_GARANTIA.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: ya compró y pregunta por la garantía" };
  }
  if (compro && RE_PIDE_AYUDA.test(t)) {
    return { necesita: true, motivo: "🛟 posventa: ya compró y pide ayuda o tiene un reclamo" };
  }

  return { necesita: false, motivo: "" };
}

// Y "mi pedido" SÍ cuenta como consulta cuando viene con una palabra de estado.
const RE_PEDIDO_CON_ESTADO =
  /\b(mi|el|ese|este)\s+(pedido|envio|paquete)\b/;
const RE_PALABRA_DE_ESTADO =
  /\b(donde|dónde|cuando|cuándo|llega|llegara|estado|gu[ií]a|guia|rastreo|seguimiento|mandaron|enviaron|despacharon|despacho|camino|demora|falta|salio|sali[oó]|recibo|entregan|ya)\b/;

// ── 2. Cortesías que no piden nada nuevo ────────────────────────────────────
// ⚠️ Corta a propósito: solo el mensaje ENTERO. "gracias, quiero otro" no entra.
const RE_SOLO_CORTESIA =
  /^(?:muchas\s+)?(?:gracias|grax|ok|oka?y|listo|bueno|vale|perfecto|excelente|bien|de acuerdo|entendido|esta bien|dale|mil gracias|muy amable|bendiciones|feliz dia|buen dia)[\s.!,🙏👍😊❤️]*$/;

// ── 3. Intención EXPLÍCITA de otra compra ───────────────────────────────────
// Esto es lo que salva la venta real: no se puede bloquear a quien quiere más.
const RE_OTRA_COMPRA = new RegExp(
  [
    "\\b(quiero|necesito|deme|dame|mandeme|mandame|envieme|enviame|pideme|agregame|sumame)\\b" +
      ".{0,24}\\b(otro|otra|otros|otras|uno mas|una mas|dos mas|adicional|adicionales|mas)\\b",
    "\\b(otro|otra|otros|otras)\\s+(conjunto|impermeable|traje|kit|juego|pedido|par)\\b",
    "\\b(quiero|voy a|me gustaria)\\s+(comprar|pedir|llevar|encargar)\\b.{0,24}\\b(otro|otra|otros|mas|adicional|de nuevo|nuevamente)\\b",
    "\\b(uno|una|dos|otro|otra)\\s+(mas|adicional)\\b",
    // 🔴 ACÁ ESTABA "para mi hermano" A SECAS, y alcanzaba por sí solo.
    // Reproducido: "ese pedido es para mi hermano" y "el impermeable es para mi
    // hermano" entraban como compra_adicional — que además queda EXENTA del
    // anti-duplicados, así que era el peor lugar para equivocarse.
    //
    // 🔑 Un destinatario no es una intención de comprar. El pariente solo cuenta si
    // viene con una señal real de ADICIÓN: "otro para mi hermano", "uno más para mi
    // esposa". Lo que quedó fuera —"lo puede recibir mi hermano", "la dirección es
    // de mi hermano"— es contexto de entrega, no una venta nueva.
    "\\b(otro|otra|otros|otras|uno mas|una mas|dos mas|adicional)\\b\\s*(?:conjunto|impermeable|traje|kit|juego|pedido|par)?\\s*\\bpara\\s+(mi|un|una|el|la)\\b",
    "\\b(hacer|haria|hago)\\s+otro\\s+pedido\\b",
    "\\bpedido\\s+(nuevo|adicional)\\b",
    "\\bcomprar\\s+(otro|otra|otros|mas)\\b",
  ].join("|")
);

/** ¿Quiere cambiar algo de su pedido? */
function quiereModificar(texto) {
  return RE_QUIERE_MODIFICAR.test(plano(texto));
}

/** ¿Quiere cancelar? */
function quiereCancelar(texto) {
  return RE_QUIERE_CANCELAR.test(plano(texto));
}

/** ¿Está preguntando por el estado de su pedido? */
function esPreguntaDeEstado(texto) {
  const t = plano(texto);
  // Cambiar o cancelar nunca es consultar el estado, aunque nombre el pedido.
  if (RE_QUIERE_MODIFICAR.test(t) || RE_QUIERE_CANCELAR.test(t)) return false;
  if (RE_PREGUNTA_ESTADO.test(t)) return true;
  // "mi pedido" solo cuenta con una palabra de estado al lado.
  return RE_PEDIDO_CON_ESTADO.test(t) && RE_PALABRA_DE_ESTADO.test(t);
}

/**
 * ¿El mensaje nombra a OTRO destinatario?
 *
 * 🔑 Se usa para no heredar la ciudad del pedido anterior: que el comprador viva en
 * San Martín no dice nada de dónde vive su hermano.
 */
const RE_OTRO_DESTINATARIO =
  /\b(?:para|de|a)\s+(?:mi|el|la|un|una)\s+(esposa|esposo|hermano|hermana|hijo|hija|mama|papa|mam[aá]|pap[aá]|abuelo|abuela|amigo|amiga|primo|prima|socio|compa|vecino|vecina|cu[nñ]ado|cu[nñ]ada|sobrino|sobrina|suegra|suegro|jefe|novio|novia)\b/;
function mencionaOtroDestinatario(texto) {
  return RE_OTRO_DESTINATARIO.test(plano(texto));
}

/**
 * ¿Nombró a otro destinatario en los últimos turnos?
 *
 * 🔑 Hay que mirar hacia atrás, y lo descubrí probándolo: el cliente dice "quiero
 * otros dos para mi hermano" en un turno y el pedido se crea recién en el turno del
 * "sí confirmo", donde ya no hay ninguna palabra sobre el hermano. Con la guarda
 * mirando solo el turno actual, la ciudad del pedido viejo se heredaba igual y la
 * compra adicional salía despachada a una ciudad prestada.
 */
function mencionoOtroDestinatarioReciente(messages, cuantos = 6) {
  return (messages || [])
    .filter((m) => m && m.role === "user")
    .slice(-cuantos)
    .some((m) => mencionaOtroDestinatario(m.content));
}

/** ¿El mensaje es solo una cortesía, sin pedir nada? */
function esSoloCortesia(texto) {
  return RE_SOLO_CORTESIA.test(plano(texto));
}

/** ¿Está pidiendo explícitamente OTRA compra? */
function pideOtraCompra(texto) {
  return RE_OTRA_COMPRA.test(plano(texto));
}

/**
 * ¿Pidió otra compra en los últimos turnos?
 *
 * 🔑 Hace falta mirar hacia atrás y no solo el turno actual. Lo encontré probando el
 * caso Heber: él pide "quiero otros dos para mi hermano" en un turno, y la
 * confirmación llega en el SIGUIENTE ("sí confirmo"). Si la intención solo se leyera
 * del turno actual, el pedido adicional llegaría a `saveOrder` sin la marca y el
 * anti-duplicados se lo comería, porque es el mismo producto y el mismo total.
 *
 * ⚠️ Con ventana corta a propósito: una petición de hace veinte mensajes no autoriza
 * un pedido nuevo hoy.
 */
function pidioOtraCompraReciente(messages, cuantos = 6) {
  return (messages || [])
    .filter((m) => m && m.role === "user")
    .slice(-cuantos)
    .some((m) => pideOtraCompra(m.content));
}

/**
 * Qué está haciendo el cliente en este turno.
 *
 * @param {string} texto
 * @param {{tienePedidoConfirmado:boolean, botPidioConfirmacion:boolean}} ctx
 *   `botPidioConfirmacion` es decisivo: si el bot ACABA de mandar un cuadro, un
 *   "listo" contesta ese cuadro y no es posventa. Sin esta condición, una compra
 *   adicional legítima no se podría confirmar nunca.
 * @returns {{intencion:"posventa"|"compra_adicional"|"normal", motivo:string}}
 */
function intencionDelTurno(texto, ctx = {}) {
  if (pideOtraCompra(texto)) {
    return { intencion: "compra_adicional", motivo: "pidió otra compra explícitamente" };
  }
  if (!ctx.tienePedidoConfirmado) return { intencion: "normal", motivo: "no hay pedido confirmado" };
  if (ctx.botPidioConfirmacion) {
    return { intencion: "normal", motivo: "el bot acaba de pedir una confirmación" };
  }
  // 🔑 Cambiar o cancelar van ANTES que la consulta de estado: nombran el pedido,
  // pero no están preguntando dónde está.
  if (quiereCancelar(texto)) {
    return { intencion: "cancelacion", motivo: "quiere cancelar su pedido" };
  }
  if (quiereModificar(texto)) {
    return { intencion: "modificacion", motivo: "quiere cambiar algo de su pedido" };
  }
  if (esPreguntaDeEstado(texto)) {
    return { intencion: "posventa", motivo: "pregunta por el estado de su pedido" };
  }
  if (esSoloCortesia(texto)) {
    return { intencion: "posventa", motivo: "solo cortesía sobre un pedido que ya existe" };
  }
  return { intencion: "normal", motivo: "no parece posventa ni compra nueva" };
}

// ============================================================================
// 📍 EL ESTADO REAL DEL PEDIDO — NADA DE INTUICIÓN
//
// A Heber se le dijo que su pedido "está en manos de la transportadora" sin que
// hubiera guía registrada. Lo único que el sistema sabe de verdad es:
//
//   · pedido guardado y sin guía   → confirmado, pendiente de despacho
//   · con guía                     → despachado, y se puede dar el número
//   · marcado para revisión        → todavía no se despacha, se está confirmando
//   · anulado                      → no hay pedido activo
//
// No hay campo de "entregado" en el sistema, así que no se afirma una entrega.
// ============================================================================

/**
 * @returns {{clave:string, frase:string, guia:string}}
 */
function estadoDelPedido(order) {
  if (!order) return { clave: "sin_pedido", frase: "", guia: "" };
  const guia = String(order.guia || "").trim();
  if (order.anulado) {
    return { clave: "anulado", frase: "ese pedido quedó anulado", guia: "" };
  }
  if (guia) {
    return {
      clave: "despachado",
      frase: `ya está despachado y viaja con la transportadora (guía ${guia})`,
      guia,
    };
  }
  if (order.pendiente_revision || order.precio_no_cuadra || order.sin_confirmar) {
    return {
      clave: "en_revision",
      frase: "lo estamos confirmando internamente antes de despacharlo",
      guia: "",
    };
  }
  return {
    clave: "pendiente_de_despacho",
    frase: "ya está registrado y en fila para despacho",
    guia: "",
  };
}

/**
 * La respuesta de posventa, armada con el estado real.
 *
 * ⚠️ La escribe el CÓDIGO, no el modelo. Es la única forma de garantizar que no
 * se invente una guía ni una fecha: el modelo ya lo hizo una vez.
 */
function respuestaDeEstado(order) {
  const nombre = String((order && order.nombre) || "").trim().split(/\s+/)[0];
  const hola = nombre ? `¡Hola ${nombre}! ` : "¡Hola! ";
  const est = estadoDelPedido(order);

  if (est.clave === "sin_pedido") {
    return `${hola}Cuéntame con qué te ayudo y lo reviso 🙌`;
  }
  if (est.clave === "anulado") {
    return `${hola}Ese pedido quedó anulado. Si querés retomarlo me decís y lo armamos de nuevo 🏍️`;
  }
  if (est.clave === "despachado") {
    return (
      `${hola}Tu pedido ${est.frase}. ` +
      `Con ese número podés seguirlo, y el pago es contraentrega cuando lo recibas 📦`
    );
  }
  if (est.clave === "en_revision") {
    return (
      `${hola}Tu pedido está registrado y ${est.frase}. ` +
      `En cuanto tengamos la guía te la comparto por acá 📦`
    );
  }
  // pendiente_de_despacho — lo más común, y donde antes se inventaba el estado.
  return (
    `${hola}Tu pedido ${est.frase}. ` +
    `Todavía no tengo el número de guía; en cuanto la transportadora la genere te la comparto por acá 📦`
  );
}

module.exports = {
  RE_PREGUNTA_ESTADO,
  RE_SOLO_CORTESIA,
  RE_OTRA_COMPRA,
  esPreguntaDeEstado,
  quiereModificar,
  quiereCancelar,
  necesitaSoporte,
  mencionaOtroDestinatario,
  mencionoOtroDestinatarioReciente,
  esSoloCortesia,
  pideOtraCompra,
  pidioOtraCompraReciente,
  intencionDelTurno,
  estadoDelPedido,
  respuestaDeEstado,
};
