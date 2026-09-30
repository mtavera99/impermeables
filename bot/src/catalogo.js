// ============================================================================
// 🛒 CATÁLOGO DE PRODUCTOS
//
// QUÉ RESUELVE: hasta el 28-sep BikerPro vendía UNA sola cosa, y eso estaba
// asumido en todas partes sin decirlo: el precio del producto venía fusionado
// dentro del total de cada banda del tarifario, el prompt describía impermeables
// y nada más, y un pedido no tenía forma de decir QUÉ se vendió.
//
// Con el segundo producto (el intercomunicador V10 2X) eso ya no alcanza. Este
// módulo es el único lugar donde viven las reglas comerciales de cada producto:
// cómo se lo nombra, cuánto vale por cantidad, qué se puede afirmar de él y qué
// no, y cómo se le suma el envío.
//
// 🔑 DECISIÓN DE DISEÑO CENTRAL: el impermeable NO cambia de camino.
//
// Su precio sigue saliendo de `fletes.cotizar()` exactamente como antes, byte
// por byte. No se "migró" al catálogo nuevo. La razón es simple: el tarifario de
// impermeables se reconstruyó con 79 guías reales, tiene cinco bandas, zonas de
// difícil acceso, promo de 2 con fletes medidos ciudad por ciudad y precios de
// rescate negociados. Reescribir eso para que "encaje" en una abstracción nueva
// es la forma más fácil de romper un negocio que funciona.
//
// Así que hay dos motores de precio declarados, y cada producto dice cuál usa:
//   · "tarifario"          -> el total sale de fletes.cotizar (impermeable)
//   · "producto_mas_envio" -> precio de tabla + envío del destino (V10)
//
// Un producto nuevo mañana declara el suyo y no toca nada de lo anterior.
// ============================================================================

const fletes = require("./fletes");

// ============================================================================
// 📦 LA POLÍTICA DE ENVÍO, DECLARADA POR PRODUCTO
//
// El dueño fue explícito: "no crear un segundo sistema de tarifas, reutilizar
// EXACTAMENTE el motor de envíos que ya usa BikerPro". Así que el cargo de envío
// se deriva del mismo tarifario, no de una tabla inventada:
//
//     envío de la banda = BANDAS[banda].total − PRECIO_PRODUCTO
//
// O sea, literalmente lo que el negocio YA le cobra de envío a un cliente de esa
// banda: A $13.100 · B $18.100 · C $22.100 · D $23.100 · E $25.100.
//
// ----------------------------------------------------------------------------
// 🔒 POR QUÉ ESTO ES UN CANDADO Y NO UN COMENTARIO
//
// El dueño lo pidió con estas palabras: que `intercom_v10_2x` **no herede nunca
// automáticamente reglas de peso/volumen de múltiples impermeables**.
//
// El riesgo es concreto y caro. El tarifario tiene tres constantes pensadas para
// llevar DOS CONJUNTOS IMPERMEABLES, que son voluminosos:
//
//     ENVIO_REAL_2      $23.947 (A) … $45.214 (E)   ← flete medido de 2 conjuntos
//     FLETE_2_OBSERVADO fletes de 2 conjuntos por ciudad
//     PROMO_2_TOTAL     totales de la promo de 2 conjuntos
//
// Si alguna de ésas se le aplicara al combo del V10, el total de banda E pasaría
// de $125.000 a $145.114: un flete de ropa cobrado por un paquete que pesa
// gramos. Y el error sería invisible, porque el número "viene del tarifario" y
// parece legítimo.
//
// Así que la política se DECLARA por producto (`politicaDeEnvio`) y hay una
// función única que la aplica (`envioDe`). Un producto con política
// `paquete_unico` ignora la cantidad a propósito, y `test-v10-intercomunicador.js`
// comprueba que su envío no coincida con ninguno de esos valores.
// ----------------------------------------------------------------------------

/**
 * Políticas de envío disponibles. Cada producto declara la suya.
 *
 * · `por_unidades`  el tarifario decide según la cantidad (impermeable: dos
 *                   conjuntos abultan el doble y el flete sube de verdad).
 * · `paquete_unico` 1 o más unidades caben en el MISMO paquete chico, así que el
 *                   cargo no cambia con la cantidad.
 */
const POLITICAS_DE_ENVIO = { POR_UNIDADES: "por_unidades", PAQUETE_UNICO: "paquete_unico" };

/** El cargo de envío de un paquete individual en esa banda. */
function envioDeUnPaquete(claveBanda) {
  const banda = fletes.BANDAS[claveBanda];
  if (!banda) return null;
  return banda.total - fletes.PRECIO_PRODUCTO;
}

/**
 * El cargo de envío de este producto, para esta banda y esta cantidad.
 *
 * 🔑 ES EL ÚNICO CAMINO. Si mañana alguien agrega un producto y quiere cobrarle
 * el envío, pasa por acá y declara su política; no hay una segunda puerta por
 * donde se pueda colar la tarifa de dos impermeables.
 *
 * @param {string} productoId
 * @param {string} claveBanda A..E
 * @param {number} uds
 */
function envioDe(productoId, claveBanda, uds) {
  const p = de(productoId);
  const politica = (p && p.politicaDeEnvio && p.politicaDeEnvio.tipo) || POLITICAS_DE_ENVIO.POR_UNIDADES;

  if (politica === POLITICAS_DE_ENVIO.PAQUETE_UNICO) {
    // ⛔ `uds` se IGNORA a propósito: es el corazón de esta política. Las unidades
    // viajan juntas en el mismo paquete, así que el cargo no cambia.
    //
    // ⚠️ Y si algún día un producto de esta política supera el tope declarado
    // (`hastaUnidades`), NO se estira la regla en silencio: se devuelve null y
    // quien llama lo trata como "no se puede cotizar solo". Que 2 quepan en un
    // sobre no dice nada de que quepan 8.
    const tope = Number((p.politicaDeEnvio && p.politicaDeEnvio.hastaUnidades) || 0);
    if (tope && Number(uds) > tope) return null;
    return envioDeUnPaquete(claveBanda);
  }

  // El impermeable no pasa por acá: su total sale de `fletes.cotizar`, donde el
  // flete de dos unidades está medido de verdad. Esta rama existe para que un
  // producto futuro pueda pedir ese comportamiento explícitamente.
  const q = fletes.cotizar(claveBanda, uds);
  return q && Number.isFinite(Number(q.flete)) ? Number(q.flete) : envioDeUnPaquete(claveBanda);
}

// Se mantiene el nombre viejo como alias: lo usa la cotización y no hay razón
// para tocar ese llamado.
const envioCobradoDe = envioDeUnPaquete;

// ============================================================================
// LOS PRODUCTOS
// ============================================================================

const PRODUCTOS = {
  // --------------------------------------------------------------------------
  // EL DE SIEMPRE. Está acá para que el sistema pueda NOMBRARLO y mostrarlo en
  // el panel, no para cambiarle nada: su precio sigue saliendo del tarifario.
  // --------------------------------------------------------------------------
  impermeable: {
    id: "impermeable",
    nombre: "Conjunto impermeable",
    nombreCorto: "Impermeable",
    etiquetaPanel: "🧥 Impermeable",
    motorDePrecio: "tarifario",
    costoUnitario: fletes.COSTO_PRODUCTO,
    // Su flete SÍ sube con la cantidad, y está medido: dos conjuntos abultan el
    // doble. Por eso su política es la opuesta a la del V10.
    politicaDeEnvio: {
      tipo: "por_unidades",
      provisional: false,
      porQue: "dos conjuntos abultan el doble; el flete de 2 está medido por ciudad",
    },
    // Campos que SÍ tienen sentido para este producto y que el bot pide.
    pideTalla: true,
    pideColor: true,
    // Es el que se asume cuando no hay ninguna señal de producto, porque es el
    // que lleva meses vendiéndose y el que describe el arranque del anuncio.
    porDefecto: true,
  },

  // --------------------------------------------------------------------------
  // 🆕 EL INTERCOMUNICADOR V10 2X
  // --------------------------------------------------------------------------
  intercom_v10_2x: {
    id: "intercom_v10_2x",
    nombre: "Intercomunicador V10 2X",
    nombreCorto: "V10 2X",
    etiquetaPanel: "🎧 V10 2X",
    motorDePrecio: "producto_mas_envio",
    pideTalla: false,
    pideColor: false,
    porDefecto: false,

    // 💰 PRECIOS CONFIRMADOS POR EL DUEÑO. Ninguno incluye envío.
    //
    // ⛔ Y NO ES UN "2x1". El dueño lo dejó dicho expresamente: la oferta es
    // "2 intercomunicadores por $99.900". Decir 2x1 sería prometer que el
    // segundo es gratis, y no lo es.
    precios: { 1: 59900, 2: 99900 },

    // Costo de compra por unidad, confirmado por el dueño el 28-sep.
    // Sirve para el piso económico que defiende `test-v10-intercomunicador.js`:
    // si alguien bajara el precio de venta, la prueba avisa antes de desplegar.
    costoUnitario: 35000,

    // ------------------------------------------------------------------------
    // 📦 POLÍTICA LOGÍSTICA — REGLA COMERCIAL INICIAL, NO UN COSTO MEDIDO
    //
    // 🔴 LA DISTINCIÓN IMPORTA Y EL DUEÑO LA PIDIÓ EXPLÍCITA: esto NO afirma que
    // conozcamos el costo real de transportadora del V10. **Todavía no hay ni una
    // guía despachada de este producto**, así que no hay histórico con qué
    // comparar.
    //
    // Lo que sí sabemos es lo físico: 1 o 2 intercomunicadores caben en un solo
    // paquete chico. De ahí sale la regla — se cobra el envío de UN paquete
    // individual, el mismo para 1 y para 2 unidades.
    //
    // Es una decisión comercial tomada con información incompleta, y está marcada
    // como tal (`provisional: true`). Cuando salgan las primeras guías se compara
    // lo cobrado contra lo que facturó la transportadora y se ajusta si hace falta.
    // ------------------------------------------------------------------------
    politicaDeEnvio: {
      tipo: "paquete_unico",
      hastaUnidades: 2,
      provisional: true,
      porQue:
        "1 o 2 intercomunicadores caben en un solo paquete pequeño; no representan " +
        "el volumen de dos conjuntos impermeables",
      // ⛔ Las constantes del tarifario que este producto NO puede usar nunca.
      // Están medidas para DOS CONJUNTOS IMPERMEABLES. Hay pruebas que verifican
      // que el envío del V10 no coincida con ninguno de esos valores.
      noHeredar: ["ENVIO_REAL_2", "FLETE_2_OBSERVADO", "PROMO_2_TOTAL", "RECARGO_UNIDAD_EXTRA"],
      revisarCuando: "haya las primeras guías despachadas de este producto",
    },

    // Lo que la publicidad empuja: el combo. Cuando alguien pregunta en general,
    // se presenta esto primero.
    ofertaPrincipal: { unidades: 2, precio: 99900, nombre: "combo x2" },

    // ✅ LO ÚNICO QUE EL BOT PUEDE AFIRMAR. Sale textual de lo que confirmó el
    // dueño. Nada más entra acá sin que él lo confirme.
    funciones: [
      "comunicación de casco a casco",
      "música",
      "indicaciones del GPS",
      "llamadas",
    ],

    // ------------------------------------------------------------------------
    // ✅ DATOS CONFIRMADOS POR EL DUEÑO EL 29-SEP
    //
    // Estos SÍ se pueden afirmar, y por eso salieron de `sinDatoConfirmado`. Cada
    // uno con la respuesta exacta, para que el modelo no tenga que redactarla de
    // cero y no se le vaya la mano.
    //
    // ⚠️ Y CON UN LÍMITE QUE IMPORTA: "resistente al agua" NO es lo mismo que
    // "sumergible" ni que una certificación IP. El dueño confirmó que se puede
    // usar bajo la lluvia, que es la pregunta real del motociclista. Si alguien
    // pregunta si es IP67 o si aguanta sumergido, eso sigue SIN confirmar — ver
    // `sinDatoConfirmado`, donde quedaron esas palabras a propósito.
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // FICHA TÉCNICA AUTORIZADA POR EL DUEÑO (29-sep)
    //
    // Cada dato viene con la respuesta ya escrita. El bot puede adaptarla al tono
    // de la conversación, pero los NÚMEROS no se tocan.
    //
    // ⚠️ Y TODOS LLEVAN "APROXIMADAMENTE" A PROPÓSITO. El dueño lo pidió explícito:
    // "no decir 500 metros garantizados". Un alcance o una autonomía son cifras que
    // dependen del uso y del entorno; presentarlas como garantía es prometer algo
    // que la realidad desmiente el primer día de lluvia con edificios en medio, y
    // eso vuelve como rechazo en la puerta.
    // ------------------------------------------------------------------------
    datosConfirmados: {
      garantia: {
        pregunta: ["garantia", "garantía", "garantizado", "garantizan"],
        respuesta:
          "Sí 👍 Tu V10 2X tiene 1 mes de garantía por defectos de funcionamiento. " +
          "Si te presenta algún inconveniente en ese tiempo, nos escribís y revisamos el caso.",
      },
      agua: {
        // 🔑 "ip67"/"ip68"/"certificación" entran acá y NO en la lista de dudas: si
        // preguntan por una certificación que no es la nuestra, lo honesto es decir
        // la que SÍ tiene (IPX6), no contestar "no sé". La respuesta ya aclara que
        // no se sumerja, así que no promete de más.
        // ⚠️ "resistent" va como RAÍZ y no como palabra completa: el cliente escribe
        // tanto "¿es resistente al agua?" como "¿son resistentes al agua?", y con la
        // forma singular el plural se caía. Lo cazó la prueba.
        // ⚠️ "impermeables?" en plural va aparte y no alcanza con "impermeable?":
        // el match es por substring, y en "son impermeables?" el carácter que sigue
        // a "impermeable" es la s, así que la forma singular NO pega. Sin esta
        // entrada la pregunta más común del producto se contestaba por el modelo
        // en vez de con el dato firme. (30-sep, junto con el arreglo del adjetivo.)
        pregunta: [
          "resistent", "resiste el agua", "se moja", "moja", "mojar",
          "lluvia", "llueve", "impermeable?", "impermeables?",
          "ipx", "ip6", "ip67", "ip68", "certificacion", "certificación",
        ],
        respuesta:
          "Sí 👍 Tiene protección IPX6, así que está diseñado para resistir lluvia y " +
          "salpicaduras en tus recorridos 🌧️🏍️ Lo que no recomendamos es sumergirlo en agua.",
      },
      alcance: {
        pregunta: ["alcance", "metros", "distancia", "rango", "que tan lejos", "qué tan lejos"],
        respuesta:
          "El intercom de casco a casco alcanza aproximadamente 300 a 500 metros en " +
          "condiciones favorables 🏍️↔️🏍️ La distancia puede variar por obstáculos, " +
          "edificios o interferencias.",
      },
      bateria: {
        pregunta: [
          "bateria", "batería", "autonomia", "autonomía", "mah",
          "cuanto dura", "cuánto dura", "cuantas horas", "cuántas horas", "horas dura",
          "carga", "cargar", "cuanto se demora en cargar", "type-c", "type c",
        ],
        respuesta:
          "Tiene batería recargable de aproximadamente 1.500 mAh 🔋, con una autonomía de " +
          "referencia de alrededor de 32 horas según el uso. Se carga por USB Type-C y una " +
          "carga completa toma unas 2,5 horas.",
      },
      standby: {
        pregunta: ["standby", "stand by", "en espera", "reposo", "apagado dura"],
        respuesta:
          "En espera puede alcanzar aproximadamente 720 horas, aunque varía según el uso " +
          "y las condiciones.",
      },
      bluetooth: {
        pregunta: ["bluetooth", "conectividad", "version", "versión"],
        respuesta:
          "Se conecta por Bluetooth 5.3 📱 Sirve para llamadas, música y las indicaciones " +
          "del GPS.",
      },
      celular: {
        pregunta: ["android", "iphone", "ios", "celular", "telefono", "teléfono", "compatible con mi"],
        respuesta:
          "Sí 👍 Se conecta por Bluetooth 5.3 al celular y funciona con Android y iPhone. " +
          "Lo podés usar para llamadas, música e indicaciones del GPS.",
      },
      cascos: {
        pregunta: ["casco abierto", "integral", "modular", "abatible", "cross", "jet", "tipo de casco", "sirve para mi casco", "que cascos"],
        respuesta:
          "Sí 👍 Se puede instalar en casco abierto, y también en integral, modular, cross " +
          "y tipo jet. Lo importante es ubicar bien los parlantes y el micrófono para que " +
          "quede cómodo y se escuche bien.",
      },
      instalacion: {
        pregunta: ["instala", "instalación", "instalacion", "se pone", "se monta", "difícil de poner", "dificil de poner"],
        respuesta:
          "Sí 👍 Es fácil de instalar. La unidad se fija al casco y los parlantes y el " +
          "micrófono van por dentro. No hay que hacerle modificaciones al casco.",
      },
      emparejar: {
        pregunta: ["empareja", "emparejar", "vincular", "conectar entre", "hablar entre", "casco a casco", "entre los dos"],
        respuesta:
          "Sí 👍 Los dos V10 2X se emparejan entre sí para hablar de casco a casco. Una vez " +
          "vinculados, el piloto y el acompañante —o dos motociclistas— se comunican en ruta.",
      },
      ruido: {
        pregunta: ["ruido", "se escucha bien", "viento", "cancelacion", "cancelación"],
        respuesta:
          "Tiene reducción inteligente de ruido, así que la voz se escucha clara mientras " +
          "vas andando 🎧",
      },
      especificaciones: {
        pregunta: ["especificacion", "especificación", "caracteristica", "característica", "ficha tecnica", "ficha técnica", "que trae", "qué trae", "como funciona", "cómo funciona"],
        respuesta:
          "Claro 👍 El V10 2X tiene Bluetooth 5.3, comunicación casco a casco entre 2 " +
          "usuarios, alcance aproximado de 300 a 500 metros, batería de unos 1.500 mAh, " +
          "protección IPX6, reducción inteligente de ruido y carga Type-C.\n\n" +
          "También lo usás para música 🎵, llamadas 📞 e indicaciones del GPS 📍 Es compatible " +
          "con Android y iPhone, y con distintos tipos de casco.",
      },
    },

    // ⛔ LO QUE NO SE PUEDE INVENTAR, Y POR QUÉ ESTÁ ESCRITO ACÁ.
    //
    // El 14-sep el bot le prometió a una clienta una oficina de Servientrega que
    // no presta ese servicio, y la clienta lo leyó. Una especificación inventada
    // de un aparato electrónico es el mismo error con otra ropa: si el bot dice
    // "alcanza 1.000 metros" y alcanza 300, eso es una devolución con motivo.
    //
    // Estas palabras se usan para detectar la pregunta y contestar que se
    // confirma, en vez de dejar que el modelo rellene el hueco.
    // ⚠️ 29-SEP: salieron de acá "garantía" y "resistente al agua", porque el dueño
    // los confirmó. Ver `datosConfirmados`.
    //
    // ⛔ PERO "sumergible", "ip67", "ip65" e "ipx" SE QUEDAN. Que aguante la lluvia
    // —lo que el dueño confirmó— no es lo mismo que aguantar sumergido ni que tener
    // una certificación IP, que es un número medido en laboratorio. Decir "es IP67"
    // sin que nadie lo haya verificado es exactamente la clase de promesa que
    // termina en una devolución con motivo.
    // ⚠️ 29-SEP, SEGUNDA TANDA: el dueño autorizó la ficha técnica completa
    // —Bluetooth 5.3, alcance, batería, IPX6, cascos, instalación, emparejamiento,
    // reducción de ruido, compatibilidad con Android/iPhone—. Todo eso SALIÓ de esta
    // lista y pasó a `datosConfirmados` con su respuesta ya escrita.
    //
    // ⛔ LO QUE QUEDA ES LA LÍNEA QUE EL DUEÑO PIDIÓ NO CRUZAR:
    //
    //   · SUMERGIRLO. IPX6 es resistencia a chorros y lluvia, NO inmersión. El
    //     dueño fue textual: "NO decir que puede sumergirse" y "NO convertir IPX6
    //     en una garantía contra cualquier daño por agua". La lluvia se responde;
    //     meterlo al agua, no.
    //   · CUÁNTOS DISPOSITIVOS a la vez. La ficha dice intercom entre 2 usuarios
    //     —eso sí está en `datosConfirmados`—; cuántos aparatos soporta conectados
    //     en simultáneo es otra cosa y no está medida.
    //   · Marca y potencia en vatios: no vienen en la ficha.
    //
    // ⚠️ Y ACÁ HAY QUE SER PRECISO, NO AMPLIO. Una versión anterior puso "al agua"
    // suelto y se comió "¿es resistente AL AGUA?" —justo la pregunta más frecuente
    // del producto y justo lo que el dueño SÍ confirmó—. Van los verbos de
    // sumergir, no la palabra "agua" a secas.
    sinDatoConfirmado: [
      "sumergible", "sumergir", "sumerge", "inmersion", "inmersión",
      "meter al agua", "meterlo al agua", "meter en agua", "meterlo en agua",
      "bajo el agua", "dentro del agua", "hundir", "hundirlo",
      "lavar", "lavarlo", "piscina", "nadar", "al rio", "al río", "al mar",
      "cuantos dispositivos", "cuántos dispositivos", "cuantos aparatos",
      "cuántos aparatos", "cuantos se conectan", "cuántos se conectan",
      "watts", "vatios", "potencia del parlante",
      "que marca", "qué marca", "homologado", "certificado por",
    ],

    envioIncluido: false,
    contraentrega: true,
  },
};

/** El producto que se asume cuando no hay ninguna señal. */
const PRODUCTO_POR_DEFECTO =
  Object.values(PRODUCTOS).find((p) => p.porDefecto)?.id || "impermeable";

const de = (id) => PRODUCTOS[id] || null;
const esV10 = (id) => id === "intercom_v10_2x";

// ============================================================================
// 🔍 DETECTAR DE QUÉ PRODUCTO HABLA EL CLIENTE
// ============================================================================

/** Minúsculas, sin tildes. Para comparar lo que escribe el cliente. */
function aplanar(s) {
  return String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// ----------------------------------------------------------------------------
// SEÑALES DEL V10
//
// 🔑 SE USAN RAÍCES, NO PALABRAS COMPLETAS. "interco" cubre de una vez
// intercomunicador, intercomunicadores, intercom, intercoms y los errores de
// tipeo que igual empiezan bien ("intercomunicdor", "intercomunciador"). Pedir
// la palabra exacta obligaría a enumerar typos para siempre.
//
// ⛔ LO QUE A PROPÓSITO **NO** ES SEÑAL DE PRODUCTO: "combo" y "combo x2".
//
// El dueño los listó como alias del V10, y por eso conviene explicar por qué no
// entran: el impermeable TAMBIÉN tiene un combo de 2 unidades, y es su gancho
// comercial principal. Si "combo" mandara la conversación al V10, un cliente de
// impermeables que escribe "quiero el combo" —algo que pasa todos los días—
// terminaría recibiendo el precio del intercomunicador. Eso sería una regresión
// del negocio que funciona para acomodar el que arranca.
//
// Dentro de un hilo que YA es de V10, "combo" sí significa 2 unidades: eso lo
// resuelve `unidadesPedidas()` más abajo, que es lo correcto — ahí "combo" habla
// de cantidad, no de producto.
// ----------------------------------------------------------------------------
const SENALES_V10 = [
  // Alta confianza: nombran el producto y no se parecen a nada más del catálogo.
  // 🔑 `interc[ou]` y no `interco`: el typo real que escribió un cliente el 29-sep
  // fue "intercumunicadores", con U. Con la raíz anterior no se detectaba y la frase
  // "Necesito son los intercumunicadores" terminó tomada como su ciudad de envío.
  //
  // ⚠️ Y la clase de caracteres está cerrada a [ou] a propósito, no abierta: así
  // quedan afuera las palabras del español que empiezan igual y no tienen nada que
  // ver — "intercambio" (interca), "intercalar" (interca), "intercesión" (interce).
  { re: /\binterc[ou]/, confianza: "alta", senal: "dijo intercomunicador" },
  { re: /\bv\s*-?\s*10\b/, confianza: "alta", senal: "dijo V10" },
  { re: /\bv10\b/, confianza: "alta", senal: "dijo V10" },
  // "de casco a casco" es exactamente el beneficio del producto.
  { re: /casco\s+a\s+casco/, confianza: "alta", senal: "habló de casco a casco" },
  // Cómo lo nombra la gente que no sabe el nombre técnico. El dueño dio estos
  // dos ejemplos literales: "los de los cascos", "los aparatos para hablar en moto".
  { re: /\b(?:los|las|el|la)\s+(?:de\s+los|para\s+(?:el|los)|de)\s+cascos?\b/, confianza: "media", senal: "los de los cascos" },
  { re: /\bhablar\b[^.]{0,20}\b(?:en|desde|por)\s+(?:la\s+)?mot/, confianza: "media", senal: "hablar en moto" },
  { re: /\bcomunicar\w*\b[^.]{0,25}\bcasco/, confianza: "media", senal: "comunicarse con casco" },
  { re: /\bdiadema\w*\b[^.]{0,15}\bcasco/, confianza: "media", senal: "diadema para casco" },
];

// ----------------------------------------------------------------------------
// ⚠️ "IMPERMEABLE" ES TAMBIÉN UN ADJETIVO, Y ESO ROMPÍA UN PEDIDO REAL
//
// 🔴 EL CASO (30-sep, cliente Fabian Tascon): un hilo de intercomunicadores donde
// el cliente preguntó si eran impermeables. La detección lo leyó como CAMBIO DE
// PRODUCTO al conjunto impermeable, lo congeló para toda la conversación, y el
// pedido se guardó como "impermeable × 1 — $85.000" cuando era un combo de 2
// intercomunicadores. El dueño lo vio en el panel y no cuadraba con el chat.
//
// La asimetría delataba el bug: "son resistentes al agua?" se quedaba en el V10,
// pero "son impermeables?" —la misma pregunta— se iba al otro producto. Y no es
// una pregunta rara: la propia ficha del V10 lista "impermeable?" como pregunta
// esperada en `datosConfirmados.agua` (responde IPX6). O sea que una capa del
// código la trataba como pregunta del V10 y la otra como cambio de producto.
//
// 🔑 LA DISTINCIÓN ES GRAMATICAL: adjetivo vs sustantivo.
//
//     "¿son impermeables?"            -> ADJETIVO. Pregunta por el producto que
//                                        ya estábamos vendiendo. NO cambia nada.
//     "y el impermeable cuánto vale?" -> SUSTANTIVO. Sí es cambio de producto.
//
// Lo que NO se hizo: sacar `impermeabl` de las señales. Eso rompería el cambio de
// vuelta legítimo, que es la razón por la que esas señales existen.
// ----------------------------------------------------------------------------

/** Verbos copulativos: lo que va detrás es una cualidad, no un producto. */
const IMPERMEABLE_ADJETIVO = [
  // "es impermeable", "son impermeables", "vienen impermeables", "quedan impermeables".
  // Los intensificadores van en medio porque el cliente escribe "son bien
  // impermeables?" y "es 100% impermeable?".
  /\b(?:es|son|sera|seran|seria|serian|era|eran|esta|estan|viene|vienen|queda|quedan|resulta|resultan|salen)\s+(?:muy|bien|algo|todo|del\s+todo|100\s*%|totalmente|completamente|realmente|casi|super)?\s*impermeables?\b/,
  // "¿qué tan impermeable es?"
  /\bque\s+tan\s+impermeables?\b/,
  // Pregunta indirecta: "quería saber si son impermeables".
  /\bsi\s+(?:es|son)\s+impermeables?\b/,
  // El mensaje entero ES la pregunta: "impermeable?", "¿impermeables?".
  /^[\s¿]*impermeables?\s*\??\s*$/,
];

/**
 * Si el cliente NOMBRA el producto, gana el sustantivo aunque también haya un
 * verbo copulativo. Cubre "los impermeables son buenos?" y "el conjunto es
 * impermeable?", que sí son del otro producto.
 */
const IMPERMEABLE_SUSTANTIVO = [
  /\b(?:el|los|un|unos|otro|otros|1|2|dos)\s+impermeables?\b/,
  /\b(chaqueta|pantalon|traje\s+de\s+agua|enterizo|capa\s+de\s+agua|conjuntos?)\b/,
];

/**
 * ¿Acá "impermeable" es una CUALIDAD que se pregunta, no el producto?
 *
 * Solo se consulta cuando la señal encontrada fue la del impermeable. Si
 * devuelve true, `productoDelHilo` no lo toma como cambio de producto.
 */
function impermeableEsAdjetivo(t) {
  if (!IMPERMEABLE_ADJETIVO.some((re) => re.test(t))) return false;
  // Nombró el producto -> es sustantivo, sí es cambio.
  if (IMPERMEABLE_SUSTANTIVO.some((re) => re.test(t))) return false;
  return true;
}

/**
 * ¿Este texto nombra algún producto? Devuelve null si no hay señal.
 *
 * ⚠️ Devolver null es un resultado válido y necesario: "quiero información" no
 * nombra nada, y adivinar ahí es justo lo que NO hay que hacer.
 *
 * `adjetivo: true` significa "dijo la palabra impermeable, pero como cualidad".
 * Quien decide qué hacer con eso es `productoDelHilo`.
 *
 * @returns {{producto:string, confianza:"alta"|"media", senal:string, adjetivo:boolean}|null}
 */
function productoEn(texto) {
  const t = aplanar(texto);
  if (!t.trim()) return null;

  for (const s of SENALES_V10) {
    if (s.re.test(t)) {
      return { producto: "intercom_v10_2x", confianza: s.confianza, senal: s.senal, adjetivo: false };
    }
  }

  // Señales del impermeable. Sirven para el CAMBIO DE VUELTA: un cliente que
  // venía preguntando por intercomunicadores y dice "y el impermeable?" tiene que
  // volver al otro flujo.
  if (/\b(impermeabl|chaqueta|pantalon|traje\s+de\s+agua|enterizo|capa\s+de\s+agua)/.test(t)) {
    return {
      producto: "impermeable",
      confianza: "alta",
      senal: "dijo impermeable",
      // 🔑 Ver el bloque de arriba: "¿son impermeables?" es una pregunta sobre el
      // producto del hilo, no un pedido de otro producto.
      adjetivo: impermeableEsAdjetivo(t),
    };
  }

  return null;
}

/**
 * De qué producto habla ESTA conversación.
 *
 * Orden de prioridad, y cada paso tiene su razón:
 *
 *  1. Lo que dijo en ESTE turno. Manda sobre todo lo demás: es el mecanismo del
 *     cambio de producto ("también vi los intercomunicadores").
 *  2. Lo último que se nombró en la conversación reciente. Esto es la PRIORIDAD
 *     DE CONTEXTO que pidió el dueño: después de hablar de V10, un "¿y uno?"
 *     sigue siendo del V10 y no hay que preguntar "¿uno de qué?".
 *  3. El anuncio por el que entró (referral de Meta). Señal ADICIONAL, nunca
 *     única: el cliente puede borrar el mensaje prellenado y escribir otra cosa.
 *  4. Si nada de lo anterior dice nada -> el producto por defecto, o sea
 *     exactamente el comportamiento de hoy. Cero regresión.
 *
 * @param {object} conv conversación del store
 * @param {string} userText el mensaje de este turno
 * @param {{producto?:string}} [opciones] producto deducido del anuncio, si hay
 * @returns {{producto:string, porQue:string, explicito:boolean}}
 */
function productoDelHilo(conv, userText, opciones = {}) {
  // ==========================================================================
  // 1. LO QUE EL CLIENTE DICE EN ESTE TURNO. Gana siempre.
  //
  // Es el mecanismo del cambio de producto en las dos direcciones: un cliente que
  // vino del anuncio del V10 y pregunta "¿y los impermeables cuánto cuestan?"
  // tiene que irse al impermeable, aunque el referral diga V10.
  // ==========================================================================
  // ⛔ SALVO cuando dijo "impermeable" como ADJETIVO ("¿son impermeables?"). Eso no
  // es pedir otro producto: es preguntar por el que ya estábamos vendiendo. Si se
  // tomara como cambio, además quedaría CONGELADO (`explicito: true` hace que
  // agent.js llame a `fijarProductoActivo`) y el pedido se guardaría con el
  // producto y el precio equivocados. Pasó con un pedido real — ver el bloque
  // "IMPERMEABLE ES TAMBIÉN UN ADJETIVO" más arriba.
  //
  // 🔑 No se corta acá: se DEJA SEGUIR a los pasos de abajo. Así el hilo de V10 se
  // queda en V10 (paso 2), y una conversación que no era de nada termina igual que
  // antes en el impermeable (paso 5). Cero regresión en el caso sin contexto.
  const ahora = productoEn(userText);
  if (ahora && !ahora.adjetivo) {
    return { producto: ahora.producto, porQue: ahora.senal, explicito: true };
  }

  // ==========================================================================
  // 2. EL PRODUCTO ACTIVO DE LA CONVERSACIÓN, si quedó fijado con señal fuerte.
  //
  // 🔴 POR QUÉ HACE FALTA PERSISTIRLO Y NO ALCANZA CON RELEER EL HILO (29-sep):
  // el historial se rota —solo se guardan los últimos mensajes— así que en una
  // conversación larga el turno donde se nombró el producto se cae del hilo y la
  // conversación vuelve al impermeable sin que nadie lo haya pedido. El cliente ve
  // que el bot "se olvidó" de qué estaba vendiendo.
  //
  // Se fija cuando hay señal fuerte (lo dijo el cliente, o vino del anuncio) y
  // vive en la conversación, así que sobrevive a la rotación del historial.
  // ==========================================================================
  if (conv && conv.productoActivo && PRODUCTOS[conv.productoActivo]) {
    return {
      producto: conv.productoActivo,
      porQue: "es el producto de esta conversación",
      explicito: false,
    };
  }

  // ==========================================================================
  // 3. EL ANUNCIO POR EL QUE ENTRÓ.
  //
  // 🔑 Va ANTES de las heurísticas de texto, y esto cambió el 29-sep: antes iba
  // después de releer el hilo, y el hilo podía estar contaminado por el arranque
  // del impermeable que el propio bot había mandado por no saber el producto.
  // O sea que el bot se convencía a sí mismo del producto equivocado.
  // ==========================================================================
  if (opciones.producto && PRODUCTOS[opciones.producto]) {
    return { producto: opciones.producto, porQue: "el anuncio por el que entró", explicito: false };
  }

  // ==========================================================================
  // 4. HEURÍSTICA: releer la conversación reciente.
  //
  // Se miran también los mensajes DEL BOT: si el bot ya está hablando del V10, el
  // hilo es del V10 aunque el cliente no lo haya vuelto a nombrar. Es el caso
  // "Info de los intercomunicadores" -> "¿y uno?".
  // ==========================================================================
  const mensajes = (conv && conv.messages) || [];
  const VENTANA = 12; // suficiente para un ida y vuelta largo sin arrastrar de ayer
  for (let i = mensajes.length - 1; i >= Math.max(0, mensajes.length - VENTANA); i--) {
    const m = mensajes[i];
    if (!m || !m.content) continue;
    const hallado = productoEn(m.content);
    if (hallado) {
      return {
        producto: hallado.producto,
        porQue: `el hilo venía hablando de eso (${hallado.senal})`,
        explicito: false,
      };
    }
  }

  // 5. Lo de siempre.
  return { producto: PRODUCTO_POR_DEFECTO, porQue: "no hay señal de producto", explicito: false };
}

/**
 * Traduce el anuncio de Meta a un producto, si se puede.
 *
 * Los ids de anuncio del V10 se configuran por variable de entorno porque los
 * crea el dueño en Meta y cambian: hardcodearlos obligaría a un despliegue por
 * cada campaña nueva. Si no está configurado, esto devuelve null y la detección
 * se apoya en lo que escriba el cliente, que es la señal fuerte de todos modos.
 */
function productoDelAnuncio(atribucion) {
  if (!atribucion) return null;

  // 1. La lista de ids configurada a mano. Es la señal más fuerte cuando existe,
  //    porque la puso una persona mirando la campaña.
  const ids = String(process.env.ANUNCIOS_V10 || "")
    .split(/[\s,]+/)
    .filter(Boolean);
  const id = String(atribucion.source_id || atribucion.anuncio_id || "");
  if (id && ids.includes(id)) return "intercom_v10_2x";

  // 2. El TÍTULO y el TEXTO del anuncio, que Meta manda en el referral.
  //
  // 🔑 ESTA ES LA QUE ARREGLA LA FUGA DEL 29-SEP: un cliente del anuncio del
  // intercomunicador que escribe solo "Hola" no da ninguna pista en el texto, y
  // adivinar por adivinar sería peor. Pero el anuncio del que vino sí lo dice.
  //
  // Funciona sin configurar nada, que es lo que importa: cada campaña nueva del
  // V10 queda cubierta el día que se prende, sin esperar un despliegue ni que
  // alguien se acuerde de agregar el id a una variable de entorno.
  const texto = [atribucion.titulo, atribucion.body, atribucion.source_url]
    .filter(Boolean)
    .join(" ");
  const hallado = texto ? productoEn(texto) : null;
  return hallado ? hallado.producto : null;
}

// ============================================================================
// 💰 PRECIO DEL V10
// ============================================================================

/**
 * Cuántas unidades pide el texto, DENTRO de un hilo de V10.
 *
 * Acá sí cuenta "combo": en un hilo que ya es de intercomunicadores, "quiero el
 * combo" significa las 2 unidades por $99.900.
 *
 * @returns {number|null} null si el texto no habla de cantidad
 */
function unidadesPedidas(texto) {
  const t = aplanar(texto);
  if (!t.trim()) return null;

  // Primero lo que pide DOS, porque "solo uno" y "los dos" pueden convivir en la
  // misma frase ("no quiero los dos, solo uno") y gana la intención más precisa.
  const pideUna =
    /\b(?:solo|solamente|nada\s+mas|unicamente)\s+(?:necesito\s+|quiero\s+|me\s+sirve\s+)?(?:uno|una|1)\b/.test(t) ||
    /\b(?:mejor|prefiero|pensandolo\s+bien)\s+(?:solo\s+)?(?:uno|una|1)\b/.test(t) ||
    /\bsolo\s+(?:uno|una)\b/.test(t) ||
    /\b(?:quiero|necesito|llevo|mandame|mande?me|envieme|envia?me)\s+(?:solo\s+)?(?:uno|una|1)\b/.test(t) ||
    /\bcuanto\s+(?:vale|cuesta|sale)\s+(?:uno|una|1)\b/.test(t) ||
    /\b(?:venden|hay|tienen|se\s+puede\s+comprar)\s+(?:uno|una|1)\b/.test(t) ||
    /^(?:\s*y\s+)?(?:uno|una)\s*\??$/.test(t.trim());

  const pideDos =
    /\bcombo\b/.test(t) ||
    /\b(?:los|las)\s+dos\b/.test(t) ||
    /\b(?:quiero|necesito|llevo|mandame|mande?me|envieme|envia?me|dame)\s+(?:los\s+)?(?:dos|2)\b/.test(t) ||
    /\b(?:mejor|prefiero|pensandolo\s+bien)\s+(?:mandeme\s+|mande\s+|me\s+manda\s+)?(?:los\s+)?(?:dos|2)\b/.test(t) ||
    /\bpar\s+de\s+interco/.test(t) ||
    /\bx\s*2\b/.test(t) ||
    /\b2\s+interco/.test(t) ||
    /\bdos\s+interco/.test(t);

  if (pideUna && !pideDos) return 1;
  if (pideDos && !pideUna) return 2;
  if (pideUna && pideDos) {
    // Ambas señales: gana la que aparece más tarde en la frase, que es la
    // corrección ("quería los dos, mejor uno").
    const iUna = t.search(/\b(?:solo|solamente|mejor|unicamente)\s+(?:necesito\s+|quiero\s+)?(?:uno|una|1)\b/);
    const iDos = t.search(/\b(?:combo|los\s+dos|dos)\b/);
    if (iUna >= 0 && iDos >= 0) return iUna > iDos ? 1 : 2;
    return 1; // en la duda, la cantidad menor: nunca cobrarle de más
  }

  // Un número suelto grande: "quiero 3"
  const m = t.match(/\b(?:quiero|necesito|llevo|mandame|mande?me|son)\s+(\d{1,2})\b/);
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return n;
  }
  return null;
}

/** ¿El cliente pregunta por una sola unidad? Para responder "sí, sí vendemos". */
function preguntaPorUna(texto) {
  return unidadesPedidas(texto) === 1;
}

/** ¿El texto parece una pregunta o un pedido de dato? */
function pareceConsulta(texto) {
  const t = aplanar(texto);
  // Sin esto, "se me descargó la batería del celular" activaría la detección.
  return (
    /\?/.test(texto) ||
    /\b(cuanto|cuantos|cuanta|que|cual|tiene|tienen|trae|traen|es|son|sirve|sirven|funciona|dura|duran|alcanza|viene|vienen|resiste|se\s+moja|aguanta|puedo|se\s+puede)\b/.test(t)
  );
}

/**
 * ¿Está preguntando una especificación técnica que NO tenemos confirmada?
 *
 * Se usa para que el bot diga "te lo confirmo" en vez de inventar un número.
 */
function preguntaSinDatoConfirmado(texto, productoId) {
  const p = de(productoId);
  if (!p || !p.sinDatoConfirmado) return null;
  const t = aplanar(texto);
  if (!t.trim()) return null;
  if (!pareceConsulta(texto)) return null;
  const hallada = p.sinDatoConfirmado.find((s) => t.includes(aplanar(s)));
  return hallada || null;
}

/**
 * ¿Está preguntando algo que SÍ tenemos confirmado? Devuelve la respuesta exacta.
 *
 * 🔑 EL ORDEN IMPORTA, Y ES EL PUNTO DELICADO DE ESTA FUNCIÓN: primero se mira si
 * la pregunta toca un dato SIN confirmar, y si lo toca, gana eso.
 *
 * El caso concreto: el dueño confirmó que el V10 "resiste el agua, se puede usar
 * bajo la lluvia". Pero si alguien pregunta *"¿lo puedo sumergir en agua?"*, esa
 * frase contiene "agua" —confirmado— y "sumergir" —sin confirmar—. Tiene que ganar
 * la duda: aguantar lluvia no es aguantar sumergido, y contestar que sí a eso es
 * prometer algo que nadie verificó.
 *
 * @returns {{clave:string, respuesta:string}|null}
 */
function respuestaConfirmada(texto, productoId) {
  const p = de(productoId);
  if (!p || !p.datosConfirmados) return null;
  if (!pareceConsulta(texto)) return null;

  // ⛔ Si la pregunta toca algo sin confirmar, no se responde con un dato firme.
  if (preguntaSinDatoConfirmado(texto, productoId)) return null;

  const t = aplanar(texto);
  for (const [clave, dato] of Object.entries(p.datosConfirmados)) {
    if ((dato.pregunta || []).some((s) => t.includes(aplanar(s)))) {
      return { clave, respuesta: dato.respuesta };
    }
  }
  return null;
}

/**
 * El precio del producto (sin envío) para esa cantidad.
 *
 * @returns {{precio:number, uds:number, esOfertaPrincipal:boolean}|{fueraDeTabla:true, uds:number}}
 */
function precioDe(productoId, uds) {
  const p = de(productoId);
  if (!p || !p.precios) return null;
  const n = Number(uds) || 1;
  if (p.precios[n] != null) {
    return {
      precio: p.precios[n],
      uds: n,
      esOfertaPrincipal: Boolean(p.ofertaPrincipal && p.ofertaPrincipal.unidades === n),
    };
  }
  // ⛔ CANTIDAD FUERA DE TABLA: NO SE INVENTA UN PRECIO.
  //
  // El dueño fue explícito: "NO inventes descuentos adicionales para 3, 4, 5 o
  // más unidades" y "NO crear silenciosamente una nueva promoción no autorizada".
  //
  // Se podría sumar "el par a $99.900 + el resto a $59.900" —es lo que hace el
  // impermeable— pero eso YA sería decidir una política de mayoreo que nadie
  // autorizó. Se informan los precios que sí existen y lo resuelve una persona.
  return { fueraDeTabla: true, uds: n };
}

module.exports = {
  PRODUCTOS,
  PRODUCTO_POR_DEFECTO,
  POLITICAS_DE_ENVIO,
  de,
  esV10,
  envioDe,
  envioDeUnPaquete,
  envioCobradoDe,
  productoEn,
  productoDelHilo,
  productoDelAnuncio,
  unidadesPedidas,
  preguntaPorUna,
  preguntaSinDatoConfirmado,
  respuestaConfirmada,
  pareceConsulta,
  precioDe,
  aplanar,
};
