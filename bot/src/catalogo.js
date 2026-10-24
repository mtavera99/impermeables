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
// · `gratis`        el precio YA incluye el envío (radios BF-777S, 23-oct). El
//                   cargo al cliente es $0; el flete real lo paga el negocio y
//                   lo resta el informe de CPA.
const POLITICAS_DE_ENVIO = { POR_UNIDADES: "por_unidades", PAQUETE_UNICO: "paquete_unico", GRATIS: "gratis" };

/** ¿Este producto se vende con el envío incluido en el precio? */
function envioEsGratis(productoId) {
  const p = PRODUCTOS[productoId];
  return Boolean(p && p.politicaDeEnvio && p.politicaDeEnvio.tipo === POLITICAS_DE_ENVIO.GRATIS);
}

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

  if (politica === POLITICAS_DE_ENVIO.GRATIS) {
    // Mismo tope que el paquete único: que 3 cajas quepan en 1 kg no dice nada
    // de que quepan 8. Fuera del tope, null = "no se cotiza solo".
    const tope = Number((p.politicaDeEnvio && p.politicaDeEnvio.hastaUnidades) || 0);
    if (tope && Number(uds) > tope) return null;
    return 0;
  }

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
    // 🏷️ Categoría: con DOS intercomunicadores en catálogo, la palabra
    // "intercomunicador" ya no identifica el producto. Ver SENALES_DE_CATEGORIA.
    categoria: "intercomunicador",
    // 🥇 El que se asume cuando el cliente dice "intercomunicador" a secas y no
    // hay ni anuncio ni historial. Es el V10 porque es el que ya estaba: así el
    // comportamiento de hoy no cambia en ningún caso existente.
    porDefectoDeCategoria: true,
    // 🎯 Ids de anuncio de Meta de este producto (variable de entorno).
    anunciosEnv: "ANUNCIOS_V10",
    // 📸 Prefijo de sus fotos en media.js (v10, v10_puesto, v10_combo...).
    mediaPrefijo: "v10",
    // 📨 Plantilla de WhatsApp para el seguimiento pasadas las 24h.
    seguimientoPlantillaEnv: "SEGUIMIENTO_PLANTILLA_V10",
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

    // Costo de compra por unidad. Sirve para el piso económico que defiende
    // `test-v10-intercomunicador.js`: si alguien bajara el precio de venta, la
    // prueba avisa antes de desplegar.
    //
    // 💰 BAJÓ DE $35.000 A $32.000 (5-oct). El dueño: *"el costo del
    // Intercomunicador sí es de 32.000, lo que pasa es que al inicio lo consiguió
    // en 35 pero ya pude bajar el precio a 32.000"*. O sea que los $35.000 eran
    // el costo de arranque y ya no son el de hoy.
    //
    // 🔑 POR QUÉ IMPORTA TENERLO AL DÍA, aunque el bot no lo use para cotizar:
    // con este número se calcula si el producto se vende con ganancia. Con
    // $35.000 la utilidad de los 6 días cerrados al 4-oct daba $2.331.065; con
    // $32.000 da $2.768.789. La diferencia —$437.724 en 6 días— es exactamente
    // el tamaño del error que se comete al decidir con un costo viejo.
    //
    // 💰 BAJÓ OTRA VEZ, DE $32.000 A $30.000, A PARTIR DEL 15-OCT (el día que se
    // prendió el Q58 Max): el proveedor mejoró el precio de los dos
    // intercomunicadores. `analisis/cpa-por-producto.py` usa $32.000 para los
    // pedidos anteriores al 15-oct y $30.000 desde ese día.
    costoUnitario: 30000,

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

  // ==========================================================================
  // 🎧 INTERCOMUNICADOR Q58 MAX — tercer producto, 15-oct
  //
  // El dueño lo pidió así: *"el V10 sigue vendiéndose como estaba, pero ahora
  // también vamos a vender el Q58 Max (individual y también en combo)"*.
  //
  // 🔴 LOS DOS SON INTERCOMUNICADORES, Y AHÍ ESTÁ EL RIESGO. Hasta hoy la palabra
  // "intercomunicador" alcanzaba para saber qué vender, porque había uno solo.
  // Con dos, esa palabra ya NO identifica el producto: identifica la CATEGORÍA.
  // Ver el bloque de señales más abajo, que es donde se resolvió.
  //
  // ⚠️ EL ID NO LLEVA "2x" NI "combo" A PROPÓSITO. `resumen.js` deduce la
  // cantidad leyendo el TEXTO del campo `producto` cuando el pedido no trae
  // `unidades` (ventas cargadas a mano, históricos): busca /2|dos|x2|2x|combo/.
  // El id del V10 (`intercom_v10_2x`) ya cae en esa trampa; este no la repite.
  // ==========================================================================
  intercom_q58_max: {
    id: "intercom_q58_max",
    nombre: "Intercomunicador Q58 Max",
    nombreCorto: "Q58 Max",
    etiquetaPanel: "🎧 Q58 Max",
    categoria: "intercomunicador",
    motorDePrecio: "producto_mas_envio",
    pideTalla: false,
    pideColor: false,
    porDefecto: false,

    // 💰 PRECIOS CONFIRMADOS POR EL DUEÑO (15-oct). Ninguno incluye envío.
    //
    // 🔑 LA UNIDAD QUEDÓ EN $79.900 Y NO EN $80.000 por decisión del dueño sobre
    // una observación de la cuenta: con $79.900 los totales por banda salen
    // redondos ($93.000 Bogotá · $102.000 Cali · $105.000 pueblos), igual que en
    // el impermeable. Son $100 y un total redondo se dice y se recuerda mejor.
    //
    // ⛔ Y NO ES UN "2x1": el combo son DOS unidades por $129.900, no una gratis.
    precios: { 1: 79900, 2: 129900 },

    // Costo de compra por unidad. El dueño confirmó $45.000 el 15-oct y dijo que
    // iba a intentar bajarlo: lo logró. 💰 El proveedor lo dejó en $43.000 A
    // PARTIR DEL 15-OCT (o sea, desde el primer día de venta del Q58), junto con
    // la baja del V10 a $30.000. Ningún pedido del Q58 se pagó a $45.000.
    //
    // 🔑 Con este costo, el combo deja ~$7.000 MÁS que vender una sola unidad
    // (en el V10 la diferencia es ~$10.000). No cambia nada del código: queda
    // anotado porque es la clase de dato con el que se decide dónde poner la
    // pauta, y sin esto no se ve.
    costoUnitario: 43000,

    // Misma política que el V10, y por la misma razón física: 1 o 2
    // intercomunicadores caben en un paquete chico. El dueño lo pidió explícito:
    // *"el envío es lo mismo que en el caso de los otros intercomunicadores"*.
    politicaDeEnvio: {
      tipo: "paquete_unico",
      hastaUnidades: 2,
      provisional: true,
      porQue:
        "1 o 2 intercomunicadores caben en un solo paquete pequeño; el dueño pidió " +
        "la misma tabla de envíos que el V10",
      noHeredar: ["ENVIO_REAL_2", "FLETE_2_OBSERVADO", "PROMO_2_TOTAL", "RECARGO_UNIDAD_EXTRA"],
      revisarCuando: "haya las primeras guías despachadas de este producto",
    },

    // La publicidad empuja el combo, igual que en el V10.
    ofertaPrincipal: { unidades: 2, precio: 129900, nombre: "combo x2" },

    // ------------------------------------------------------------------------
    // 💬 LA LÍNEA QUE JUSTIFICA LOS $30.000 (16-oct) — la usa `primerMensajeV10`
    //
    // El V10 NO tiene este campo, y por eso su primer mensaje queda exactamente
    // como estaba. Acá existe porque el Q58 arrancó la pauta pidiendo $129.900
    // con la misma descripción del V10 de $99.900: casco a casco, música, GPS y
    // llamadas. Nada que explicara la diferencia.
    //
    // Medido en la primera hora: de las 8 conversaciones del Q58 con más de 20
    // minutos, 7 se murieron en el primer turno; las del V10 en la misma
    // ventana siguieron hablando 6 de 9. Y cero pedidos del Q58.
    //
    // Son las cuatro funciones de `funciones` que el V10 no tiene, dichas en
    // una sola línea y en el orden en que pesan para un motociclista: lo que se
    // ve (pantalla), lo que ya conoce (radio), lo que le resuelve un problema
    // (música sin gastar el celular) y lo visible de noche (LED).
    //
    // ⚠️ Es texto COMERCIAL. Si el dueño prefiere otra redacción, se cambia acá
    // y no hay que tocar ni el guion ni el código.
    // ------------------------------------------------------------------------
    lineaQueJustificaElPrecio:
      "Este trae además pantalla, radio FM, luz LED y ranura de memoria, " +
      "para música sin gastar la batería del celular ✨",

    // 🎯 Ids de anuncio de Meta de ESTE producto. Ver `productoDelAnuncio`.
    // Se configuran en Render, no en el código: los anuncios los crea el dueño y
    // cambian con cada campaña.
    anunciosEnv: "ANUNCIOS_Q58",
    // 📸 Prefijo de sus fotos. ⚠️ TODAVÍA NO HAY ARCHIVOS q58*: por eso el bot
    // no manda ninguna foto en estas conversaciones, en vez de mandar las del
    // V10 —que es otro producto— o las del impermeable.
    mediaPrefijo: "q58",
    // 📨 Su propia plantilla. Si no está configurada, el seguimiento de las 24h
    // se SALTA en vez de mandarle la de otro producto.
    seguimientoPlantillaEnv: "SEGUIMIENTO_PLANTILLA_Q58",

    // ✅ Lo que el producto hace. Las cuatro primeras son las del V10; las otras
    // cuatro son lo que el Q58 tiene DE MÁS, y son el argumento de los $30.000
    // de diferencia en el combo.
    funciones: [
      "comunicación de casco a casco",
      "música",
      "indicaciones del GPS",
      "llamadas",
      "radio FM",
      "música por memoria micro SD, sin depender del celular",
      "pantalla",
      "luz LED",
    ],

    // ------------------------------------------------------------------------
    // ✅ FICHA DEL Q58 MAX
    //
    // 🔑 DE DÓNDE SALE CADA COSA, porque acá la regla del repo es estricta: el
    // bot solo afirma lo confirmado.
    //
    //   · GARANTÍA (1 mes) y ALCANCE (500 m): los confirmó el dueño el 15-oct.
    //   · Lo demás (Bluetooth 5.3, batería 1.000 mAh / ~25 h / carga ~2 h
    //     Type-C, CVC + doble DSP, 6 ecualizadores, radio FM, micro SD, pantalla
    //     LCD, luz LED, compartir música, modo dual) coincide en fuentes
    //     INDEPENDIENTES entre sí: el fabricante (Extreme Freedom), Amazon
    //     (Docooler Q58Max), Walmart (Uteam Max Q58) y AliExpress.
    //
    // ⚠️ TODO LLEVA "APROXIMADAMENTE", igual que en el V10 y por el mismo pedido
    // del dueño: un alcance o una autonomía dependen del uso. Prometerlos como
    // garantía es lo que vuelve como rechazo en la puerta.
    // ------------------------------------------------------------------------
    datosConfirmados: {
      garantia: {
        pregunta: ["garantia", "garantía", "garantizado", "garantizan"],
        respuesta:
          "Sí 👍 Tu Q58 Max tiene 1 mes de garantía por defectos de funcionamiento. " +
          "Si te presenta algún inconveniente en ese tiempo, nos escribís y revisamos el caso.",
      },
      agua: {
        // ========================================================================
        // 🔴 ACÁ NO VA NINGÚN NÚMERO DE CERTIFICACIÓN, Y ES UNA DECISIÓN
        //
        // El dueño pidió buscar la certificación en internet. Se buscó, y las
        // fuentes SE CONTRADICEN:
        //    IPX6 -> Walmart (Uteam Max Q58), Tecnología Juli, Baratico
        //    IP65 -> Agaval, Megahobbies, Expresscompra
        //
        // Las dos significan lo mismo en la práctica —aguanta chorros y lluvia,
        // no inmersión— pero son números distintos, y el bot no puede afirmar
        // uno cuando la mitad del mercado dice el otro. En el V10 SÍ se dice
        // IPX6 porque el dueño lo confirmó; acá nadie lo confirmó.
        //
        // Así que se responde lo FUNCIONAL, que es lo que el motociclista
        // pregunta de verdad ("¿se moja?"), sin inventar un número de laboratorio.
        //
        // 🔑 Y las palabras "ip65", "ipx6", "certificacion" SÍ están en la lista
        // de preguntas: si alguien pregunta por la certificación, contesta esto
        // —honesto y útil— en vez de dejar que el modelo rellene el hueco con un
        // número. Cuando el proveedor confirme cuál es, se agrega acá.
        // ========================================================================
        pregunta: [
          "resistent", "resiste el agua", "se moja", "moja", "mojar",
          "lluvia", "llueve", "impermeable?", "impermeables?",
          "ipx", "ip6", "ip65", "ip67", "ip68", "certificacion", "certificación",
        ],
        // ✅ 15-OCT, SEGUNDA TANDA: "y al polvo" se agregó porque lo dice LA CAJA
        // DEL PRODUCTO. Las fotos que mandó el dueño muestran el empaque con el
        // texto impreso: *"Intercom mixing, Waterproof and dustproof, Intelligent
        // noise reduction"*. Eso es el fabricante afirmándolo en su propio
        // empaque, que es mejor fuente que cualquier vendedor.
        //
        // 🔑 Y sigue SIN número de certificación: la caja tampoco lo dice. Pero
        // "dustproof" explica por qué media Colombia publica IP65 (el 6 es
        // justamente polvo) y la otra mitad IPX6 (que no certifica polvo).
        respuesta:
          "Sí 👍 Está diseñado para resistir lluvia, salpicaduras y polvo en tus recorridos 🌧️🏍️ " +
          "Lo que no recomendamos es sumergirlo en agua.",
      },
      alcance: {
        pregunta: ["alcance", "metros", "distancia", "rango", "que tan lejos", "qué tan lejos"],
        respuesta:
          "El intercom de casco a casco alcanza aproximadamente hasta 500 metros en " +
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
          "Tiene batería recargable de aproximadamente 1.000 mAh 🔋, con una autonomía de " +
          "referencia de alrededor de 25 horas de uso según cómo lo uses. Se carga por USB " +
          "Type-C y una carga completa toma unas 2 horas.",
      },
      bluetooth: {
        pregunta: ["bluetooth", "conectividad", "version", "versión"],
        respuesta:
          "Se conecta por Bluetooth 5.3 📱 Sirve para llamadas, música y las indicaciones " +
          "del GPS.",
      },
      celular: {
        // ⚠️ PENDIENTE DE VERIFICAR CON UN iPHONE (15-oct). Un vendedor colombiano
        // (smartjoys.co) dice que el comportamiento cambia según el sistema
        // operativo y que en Android las llamadas entran sin problema —lo que
        // sugiere algún límite en iPhone—. NO se pudo confirmar el detalle, y
        // ninguna otra fuente (fabricante, Amazon, Walmart) lo menciona.
        //
        // Esta respuesta dice lo que afirman el fabricante y todas las demás
        // fuentes. Si la prueba del dueño con un iPhone muestra una limitación,
        // ESTA es la línea que hay que cambiar, y hay que cambiarla antes que
        // nada: prometer que las llamadas funcionan y que no funcionen es una
        // devolución con motivo.
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
          "Sí 👍 Los dos Q58 Max se emparejan entre sí para hablar de casco a casco. Una vez " +
          "vinculados, el piloto y el acompañante —o dos motociclistas— se comunican en ruta.",
      },
      ruido: {
        pregunta: ["ruido", "se escucha bien", "viento", "cancelacion", "cancelación"],
        respuesta:
          "Tiene cancelación de ruido CVC y doble procesador de audio, así que la voz se " +
          "escucha clara mientras vas andando 🎧",
      },
      // ----------------------------------------------------------------------
      // 👇 LO QUE EL Q58 TIENE Y EL V10 NO. Es el argumento del precio.
      // ----------------------------------------------------------------------
      radio: {
        pregunta: ["radio", "fm", "emisora", "emisoras", "dial"],
        respuesta:
          "Sí 👍 Trae radio FM incorporada 📻 Podés escuchar tus emisoras sin usar el celular.",
      },
      memoria: {
        pregunta: ["memoria", "micro sd", "microsd", "sd", "usb", "mp3", "sin celular", "sin internet", "sin datos"],
        respuesta:
          "Sí 👍 Tiene entrada para memoria micro SD, así que podés llevar tu música dentro " +
          "del equipo y escucharla sin depender del celular 🎵 (la memoria no viene incluida).",
      },
      pantalla: {
        pregunta: ["pantalla", "display", "visor", "se ve", "digital"],
        respuesta:
          "Sí 👍 Tiene pantalla, así que ves el estado del equipo, el volumen y la emisora " +
          "sin tener que adivinar 📺",
      },
      luz: {
        pregunta: ["luz", "led", "linterna", "ilumina", "de noche"],
        respuesta: "Sí 👍 Trae una luz LED integrada, útil de noche y para que te vean 💡",
      },
      compartirMusica: {
        pregunta: ["compartir musica", "compartir música", "misma musica", "misma música", "escuchar lo mismo"],
        respuesta:
          "Sí 👍 Los dos equipos pueden compartir la música, así que el piloto y el " +
          "acompañante escuchan lo mismo 🎶",
      },
      especificaciones: {
        pregunta: ["especificacion", "especificación", "caracteristica", "característica", "ficha tecnica", "ficha técnica", "que trae", "qué trae", "como funciona", "cómo funciona"],
        respuesta:
          "Claro 👍 El Q58 Max tiene Bluetooth 5.3, comunicación casco a casco entre 2 " +
          "usuarios con alcance aproximado de hasta 500 metros, batería de unos 1.000 mAh " +
          "con cerca de 25 horas de uso, cancelación de ruido CVC y carga Type-C.\n\n" +
          "Además trae radio FM 📻, entrada para memoria micro SD para llevar tu música sin " +
          "celular 🎵, pantalla y luz LED 💡 Lo usás también para llamadas 📞 e indicaciones " +
          "del GPS 📍, y es resistente a la lluvia.",
      },
    },

    // ⛔ LO QUE NO SE INVENTA. Misma línea que el V10 y por la misma razón: una
    // especificación inventada de un aparato electrónico es una devolución con
    // motivo.
    //
    // 🔑 Acá se suma algo que el V10 no tiene: el NÚMERO de certificación. Como
    // las fuentes se contradicen (IPX6 vs IP65), si alguien insiste en que le
    // confirmen la certificación exacta, se escala en vez de elegir una.
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

  // ==========================================================================
  // 📻 RADIOS BAOFENG BF-777S — cuarto producto, 23-oct
  //
  // El dueño (Santiago) lo pidió para probarlo desde BikerPro mientras se
  // resuelve la otra cuenta publicitaria. Se vende por CAJA: cada caja trae
  // DOS radios.
  //
  // 🔴 TRES COSAS QUE LO HACEN DISTINTO DE LOS INTERCOMUNICADORES:
  //
  //   1. ENVÍO GRATIS. El precio YA es el total que paga el cliente. Por eso
  //      `politicaDeEnvio.tipo` es "gratis" y `envioIncluido: true`: así el
  //      validador de cotizacion.js no le borra al bot la frase "envío gratis",
  //      que en el V10 y el Q58 sí es mentira.
  //   2. LA UNIDAD ES LA CAJA, NO EL RADIO. `unidades: 1` = 1 caja = 2 radios.
  //      El anuncio dice "COMBO X 2", "X 4" y "X 6", o sea que el cliente cuenta
  //      RADIOS. `unidadesPedidas` lo traduce (ver `cajasDeRadios`). Si se
  //      confundiera, se despacharía el doble o la mitad.
  //   3. TRES PRECIOS, no dos. Ningún código de este repo puede asumir que un
  //      producto tiene solo 1 y 2 unidades (ver `preciosDe`).
  //
  // ⚠️ "radio" ya existía como palabra en el bot: el Q58 vende RADIO FM como
  // función. Por eso las señales de este producto NO incluyen "radio" suelto en
  // singular: piden plural ("los radios"), walkie, Baofeng o el uso ("radios
  // para la finca"). Ver SENALES_DE_MODELO.
  //
  // ⚠️ El id no lleva "2", "3", "x2" ni "combo": `unidadesDelPedido` y
  // `resumen.cantidadDe` leen el texto del producto buscando esos números.
  // ==========================================================================
  radio_bf777s: {
    id: "radio_bf777s",
    nombre: "Radios Baofeng BF-777S",
    nombreCorto: "BF-777S",
    etiquetaPanel: "📻 Radios BF-777S",
    categoria: "radio",
    porDefectoDeCategoria: true,
    motorDePrecio: "producto_mas_envio",
    pideTalla: false,
    pideColor: false,
    porDefecto: false,

    // 💰 PRECIOS CONFIRMADOS POR EL DUEÑO (23-oct). YA INCLUYEN EL ENVÍO.
    //   1 caja  (2 radios) $99.000  -> el gancho de la publicidad
    //   2 cajas (4 radios) $169.000 -> ahorra $29.000 contra 2 cajas sueltas
    //   3 cajas (6 radios) $229.000 -> ahorra $68.000, para fincas y seguridad
    // ⛔ No hay precio para 4 cajas o más: `precioDe` lo marca fuera de tabla y
    // el bot lo pasa a un asesor en vez de inventar un descuento.
    precios: { 1: 99000, 2: 169000, 3: 229000 },
    // Nombre de cada opción, como lo dice la publicidad.
    nombresDeCombo: { 1: "combo x2 radios", 2: "combo x4 radios", 3: "megacombo x6 radios" },
    // Cuántas piezas trae cada "unidad". Lo usa el guion y el cuadro de pedido.
    radiosPorUnidad: 2,

    // Costo de compra por CAJA (el par), confirmado por el dueño el 23-oct.
    costoUnitario: 40000,

    // 📦 ENVÍO GRATIS, y 1, 2 o 3 cajas van en el MISMO paquete de 1 kg (lo
    // confirmó el dueño: "las tres opciones las puedo empacar en un paquete de
    // 1 kg"). El flete lo paga el negocio, y el informe de CPA lo resta con el
    // costo real de un paquete de su banda (`ENVIO_REAL_1`).
    politicaDeEnvio: {
      tipo: "gratis",
      hastaUnidades: 3,
      provisional: true,
      porQue:
        "precio con envío incluido; 1, 2 o 3 cajas van en un solo paquete de 1 kg (confirmado " +
        "por el dueño el 23-oct)",
      noHeredar: ["ENVIO_REAL_2", "FLETE_2_OBSERVADO", "PROMO_2_TOTAL", "RECARGO_UNIDAD_EXTRA"],
      revisarCuando: "haya las primeras guías despachadas de este producto",
    },

    // La publicidad masiva empuja la caja de 2 radios a $99.000.
    ofertaPrincipal: { unidades: 1, precio: 99000, nombre: "combo x2 radios" },

    anunciosEnv: "ANUNCIOS_RADIO",
    mediaPrefijo: "radio",
    seguimientoPlantillaEnv: "SEGUIMIENTO_PLANTILLA_RADIO",

    funciones: [
      "comunicación por radio entre los dos equipos, sin señal de celular ni minutos",
      "16 canales listos para usar desde que salen de la caja",
      "batería recargable de litio de 1.500 mAh",
      "base de carga individual para cada radio, con luz indicadora",
      "linterna LED integrada",
      // ✅ 24-oct: lo dice la caja ("FM Radio") y lo confirmó el dueño.
      "radio FM para escuchar emisoras",
      "audífono manos libres con micrófono de solapa",
      "clip para el cinturón",
    ],

    // Para qué lo compra la gente, según la investigación del dueño. El guion lo
    // usa para hablarle a cada uno de lo suyo.
    usos: [
      "fincas y haciendas sin señal de celular (el mayordomo, los trabajadores)",
      "seguridad privada, porterías y conjuntos residenciales",
      "bodegas, restaurantes, parqueaderos, logística y eventos",
      "caravanas y rodadas en moto",
    ],

    // ------------------------------------------------------------------------
    // ✅ FICHA DEL BF-777S — la dio el dueño el 23-oct
    //
    // ⚠️ El alcance va como lo pidió el dueño: "aproximadamente 2 a 5 km en
    // campo abierto", y diciendo que entre edificios o montaña es menos.
    // Prometer un alcance como garantía es lo que vuelve como rechazo.
    // ⚠️ La batería NO tiene horas confirmadas. Si preguntan cuánto dura, va a
    // `sinDatoConfirmado`.
    // ------------------------------------------------------------------------
    datosConfirmados: {
      garantia: {
        pregunta: ["garantia", "garantía", "garantizado", "garantizan", "si sale malo", "si se daña", "si se dana"],
        respuesta:
          "Sí 👍 Tienen 1 mes de garantía directa por defectos de fábrica. Si te presentan algún " +
          "problema en ese tiempo, nos escribes y lo revisamos.",
      },
      alcance: {
        pregunta: ["alcance", "kilometro", "kilómetro", "km", "metros", "distancia", "rango", "que tan lejos", "qué tan lejos", "hasta donde", "hasta dónde", "cuanto alcanza", "cuánto alcanza"],
        respuesta:
          "En campo abierto, como una finca, alcanzan aproximadamente de 2 a 5 km 📡 Entre " +
          "edificios, paredes o montaña la distancia es menor, porque los obstáculos frenan la señal.",
      },
      ciudad: {
        pregunta: ["en la ciudad", "edificio", "conjunto residencial", "porteria", "portería", "torre", "bodega", "dentro de", "paredes"],
        respuesta:
          "Sí 👍 Funcionan muy bien en conjuntos, porterías, bodegas y negocios. Ahí la distancia es " +
          "menor que en campo abierto por las paredes y los edificios, pero para comunicarse dentro " +
          "del lugar van perfectos.",
      },
      senal: {
        pregunta: ["sin señal", "sin senal", "señal de celular", "senal de celular", "minutos", "plan de datos", "internet", "simcard", "sim card", "chip", "recarga"],
        respuesta:
          "No necesitan señal de celular, ni internet, ni minutos 👍 Se comunican directo de radio a " +
          "radio, por eso sirven en fincas y lugares donde el celular no entra.",
      },
      bateria: {
        pregunta: ["bateria", "batería", "mah", "carga", "cargar", "cargador", "base"],
        respuesta:
          "Cada radio trae batería recargable de litio de 1.500 mAh 🔋 y su propia base de carga " +
          "con luz que te indica cuándo está cargando y cuándo ya está lista.",
      },
      contenido: {
        pregunta: ["que trae", "qué trae", "que incluye", "qué incluye", "que viene", "qué viene", "contenido", "incluye", "viene con", "audifono", "audífono", "manos libres", "microfono", "micrófono"],
        // ✅ 24-oct: verificado en la foto de la caja abierta (radio-contenido.jpg):
        // además se ven las correas de mano, el adaptador de corriente y el manual.
        respuesta:
          "Cada caja trae 2 radios, 2 bases de carga con su adaptador de corriente, 2 audífonos " +
          "manos libres con micrófono de solapa, los clips para el cinturón, las correas de mano y " +
          "el manual 📦 Y cada radio tiene linterna LED."
      },
      canales: {
        pregunta: ["canal", "canales", "frecuencia", "frecuencias", "uhf", "programar", "configurar", "configuracion", "configuración"],
        respuesta:
          "Traen 16 canales y vienen listos para usar de caja: los prendes, los pones en el mismo " +
          "canal y ya se comunican 👍 Trabajan en UHF (400-470 MHz).",
      },
      licencia: {
        // ✅ El dueño (23-oct): "Sí tenemos la licencia que hablas del gobierno,
        // entonces la puedes ofrecer sin ningún tipo de problema". Es TEXTO
        // COMERCIAL: si el dueño quiere otra redacción, se cambia solo acá.
        pregunta: ["licencia", "permiso", "mintic", "legal", "legales", "homologado", "homologados", "ministerio", "es ilegal", "me pueden multar", "multa"],
        respuesta:
          "Sí, tranquilo 👍 Nuestros radios cuentan con su licencia, así que los puedes usar sin " +
          "problema.",
      },
      compatibilidad: {
        pregunta: ["otra marca", "otras marcas", "otros radios", "compatible", "compatibles", "con los que ya tengo", "motorola", "kenwood"],
        respuesta:
          "Entre ellos se comunican sin problema. Con radios de otras marcas puede funcionar si " +
          "quedan en la misma frecuencia, pero eso no te lo puedo garantizar 🙌",
      },
      radioFm: {
        // ✅ 24-oct: lo dice la caja y lo confirmó el dueño.
        // ⚠️ Sin la palabra "radio" en la lista: en esta conversación TODO es "radio"
        // y esta respuesta saldría a cualquier pregunta.
        pregunta: ["fm", "emisora", "emisoras", "musica", "música", "escuchar radio", "noticias", "partido"],
        respuesta: "Sí 👍 También traen radio FM, así que puedes escuchar tus emisoras desde el mismo radio 📻",
      },
      linterna: {
        pregunta: ["linterna", "luz", "led", "de noche", "oscuro"],
        respuesta: "Sí 👍 Cada radio trae una linterna LED integrada, muy útil de noche o en una emergencia 🔦",
      },
      moto: {
        pregunta: ["moto", "casco", "caravana", "rodada", "motociclista", "motero"],
        respuesta:
          "Sí 👍 Para caravanas y rodadas funcionan muy bien con el audífono manos libres. Si lo " +
          "que buscas es hablar de casco a casco con tu acompañante mientras manejas, para eso " +
          "tenemos intercomunicadores para casco.",
      },
      especificaciones: {
        pregunta: ["especificacion", "especificación", "caracteristica", "característica", "ficha tecnica", "ficha técnica", "potencia", "watts", "vatios", "como funciona", "cómo funciona"],
        respuesta:
          "Claro 👍 Son los Baofeng BF-777S: 16 canales en UHF, potencia de unos 2 W, alcance " +
          "aproximado de 2 a 5 km en campo abierto, batería de litio de 1.500 mAh con base de " +
          "carga individual, linterna LED, radio FM y audífono manos libres. No necesitan señal de celular.",
      },
    },

    // ⛔ LO QUE NO SE INVENTA. Una promesa de agua o de horas de batería que no
    // se cumple es una devolución con motivo.
    sinDatoConfirmado: [
      "agua", "lluvia", "llueve", "moja", "mojar", "sumergible", "impermeable", "ip54", "ip67", "ipx",
      "cuantas horas", "cuántas horas", "cuanto dura la bateria", "cuánto dura la batería",
      "cuanto le dura", "cuánto le dura", "horas de uso", "autonomia", "autonomía",
      "10 km", "10km", "20 km", "militar", "irrompible", "a prueba de golpes", "se cae",
      "repetidora", "pantalla", "display",
    ],

    // 🔑 El envío SÍ está incluido. Con esto el validador de cotizacion.js deja
    // decir "envío gratis", que es la oferta del anuncio.
    envioIncluido: true,
    contraentrega: true,
  },
};

/** El producto que se asume cuando no hay ninguna señal. */
const PRODUCTO_POR_DEFECTO =
  Object.values(PRODUCTOS).find((p) => p.porDefecto)?.id || "impermeable";

const de = (id) => PRODUCTOS[id] || null;
const esV10 = (id) => id === "intercom_v10_2x";

// ============================================================================
// 🔑 PREGUNTAR POR CAPACIDAD, NO POR NOMBRE — 15-oct
//
// 🔴 POR QUÉ EXISTEN ESTAS DOS FUNCIONES. Hasta hoy había 10 lugares en el
// código que preguntaban `esV10(id)` para decidir cosas que NO tienen nada que
// ver con el V10 en particular:
//
//     ¿qué guion uso?            ¿cuántas unidades pidió?
//     ¿qué bloque de precio?     ¿qué fotos mando?
//     ¿qué plantilla de seguimiento?
//
// Todas esas preguntas son en realidad *"¿este producto es del tipo simple
// precio+envío, o es el impermeable con tallas y colores?"*. Mientras hubo un
// solo intercomunicador, preguntar por el nombre daba la misma respuesta. Con
// el Q58 Max adentro, el Q58 contestaba "no soy V10" y heredaba TODO lo del
// impermeable: el guion con tallas, el bloque con $59.900, la foto del conjunto
// y la plantilla de seguimiento de impermeables.
//
// Se deja `esV10` exportado porque lo usan pruebas que comprueban cosas
// específicas del V10, pero ya no decide nada.
// ============================================================================

/**
 * ¿Este producto se cotiza como "precio de tabla + envío del destino"?
 * Es lo contrario del impermeable, cuyo total sale fusionado del tarifario.
 */
const esProductoSimple = (id) => {
  const f = PRODUCTOS[id];
  return Boolean(f && f.motorDePrecio === "producto_mas_envio");
};

/** ¿Es un radio de comunicación? (hoy el BF-777S) */
const esRadio = (id) => {
  const f = PRODUCTOS[id];
  return Boolean(f && f.categoria === "radio");
};

/** ¿Es un intercomunicador? (hoy el V10 2X y el Q58 Max) */
const esIntercom = (id) => {
  const f = PRODUCTOS[id];
  return Boolean(f && f.categoria === "intercomunicador");
};

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
// ============================================================================
// 🏷️ SEÑALES DE MODELO vs SEÑALES DE CATEGORÍA — 15-oct
//
// 🔴 EL PROBLEMA QUE RESUELVE ESTA SEPARACIÓN. Hasta el 15-oct había UN solo
// intercomunicador, así que la palabra "intercomunicador" alcanzaba para saber
// qué vender. Con el Q58 Max entrando al catálogo, esa palabra ya NO identifica
// el producto: identifica la categoría. Y si se dejara como estaba, TODO el
// tráfico del anuncio del Q58 se habría vendido como V10.
//
// El caso concreto: el texto prellenado de un anuncio de Meta es algo como
// "Hola, quiero más información de la promoción de intercomunicadores". Con la
// lógica anterior eso detectaba V10 con confianza ALTA, lo congelaba para toda
// la conversación con `fijarProductoActivo`, y cotizaba $99.900 en vez de
// $129.900 — además de mandar a despachar el producto equivocado.
//
// 🔑 LA SEPARACIÓN:
//
//   SENALES_DE_MODELO     -> nombran el modelo ("V10", "Q58"). Deciden solas.
//   SENALES_DE_CATEGORIA  -> dicen la categoría ("intercomunicador", "casco a
//                            casco"). NO deciden solas: las resuelve
//                            `productoDelHilo` mirando el producto activo, el
//                            anuncio y, en último lugar, el default de categoría.
//
// ⚠️ Y EL DEFAULT DE CATEGORÍA ES EL V10 A PROPÓSITO. Es el producto que ya
// estaba, así que cualquier conversación que antes terminaba en V10 sigue
// terminando en V10. Cero regresión: lo nuevo solo agrega caminos.
// ============================================================================

/** Señales que nombran un MODELO concreto. Deciden el producto por sí solas. */
const SENALES_DE_MODELO = [
  { producto: "intercom_v10_2x", re: /\bv\s*-?\s*10\b/, confianza: "alta", senal: "dijo V10" },
  { producto: "intercom_v10_2x", re: /\bv10\b/, confianza: "alta", senal: "dijo V10" },
  // 🎧 Q58 Max. Las formas que escribe la gente: "q58", "q 58", "q-58", "q58 max".
  // ⚠️ El `\b` del final NO va pegado al 58 en la primera: "q58max" junto es una
  // escritura real y con `\b58\b` no pegaba.
  { producto: "intercom_q58_max", re: /\bq\s*-?\s*58/, confianza: "alta", senal: "dijo Q58" },
  { producto: "intercom_q58_max", re: /\bq\s*-?\s*58\s*-?\s*max\b/, confianza: "alta", senal: "dijo Q58 Max" },

  // 📻 RADIOS BF-777S (23-oct). Hay un solo producto en la categoría, así que
  // estas señales deciden solas.
  //
  // ⛔ "radio" SUELTO EN SINGULAR NO ES SEÑAL, a propósito: el Q58 vende "radio
  // FM" y un cliente del Q58 que pregunta "¿tiene radio?" no puede terminar
  // cotizando walkie-talkies. Lo que sí cuenta es lo que solo dice alguien que
  // busca radios de comunicación: el plural ("los radios"), walkie, Baofeng, el
  // modelo, o el uso ("radio para la finca").
  { producto: "radio_bf777s", re: /\bbao\s*-?\s*feng\b/, confianza: "alta", senal: "dijo Baofeng" },
  { producto: "radio_bf777s", re: /\bbf\s*-?\s*777|\b777\s*-?\s*s\b/, confianza: "alta", senal: "dijo BF-777S" },
  { producto: "radio_bf777s", re: /\bwalk[iy]e?s?\b|\bwalkie\s*-?\s*talkies?\b|\bwok[iy]\s*-?\s*tok[iy]s?\b|\bboki\s*-?\s*tokis?\b|\bwalki\s*-?\s*talki/, confianza: "alta", senal: "dijo walkie-talkie" },
  { producto: "radio_bf777s", re: /\bradio\s*-?\s*telefonos?\b/, confianza: "alta", senal: "dijo radioteléfono" },
  { producto: "radio_bf777s", re: /\bradios?\s+(?:de\s+)?comunicaci/, confianza: "alta", senal: "dijo radios de comunicación" },
  { producto: "radio_bf777s", re: /\bradios?\s+(?:para|pa)\s+(?:la\s+|el\s+|mi\s+|los\s+|una\s+|un\s+)?(?:finca|hacienda|seguridad|vigilan|celad|porteria|bodega|trabajo|empresa|negocio|restaurante|parqueadero|evento|obra|caravana|hablar|comunicar)/, confianza: "alta", senal: "radios para un uso de trabajo" },
  // El plural, que es como se nombra el producto ("los radios", "6 radios").
  // ⚠️ Sin "fm" ni "emisoras" detrás: "radios fm" sigue siendo del Q58.
  { producto: "radio_bf777s", re: /\bradios\b(?!\s*(?:fm|am)\b)/, confianza: "alta", senal: "dijo radios" },
];

/**
 * Señales de la CATEGORÍA intercomunicador. Dicen de qué tipo de producto se
 * habla, pero no de cuál de los dos.
 */
const SENALES_DE_CATEGORIA = [
  // 🔑 `interc[ou]` y no `interco`: el typo real que escribió un cliente el 29-sep
  // fue "intercumunicadores", con U. Con la raíz anterior no se detectaba y la frase
  // "Necesito son los intercumunicadores" terminó tomada como su ciudad de envío.
  //
  // ⚠️ Y la clase de caracteres está cerrada a [ou] a propósito, no abierta: así
  // quedan afuera las palabras del español que empiezan igual y no tienen nada que
  // ver — "intercambio" (interca), "intercalar" (interca), "intercesión" (interce).
  { categoria: "intercomunicador", re: /\binterc[ou]/, confianza: "alta", senal: "dijo intercomunicador" },
  // "de casco a casco" es exactamente el beneficio de la categoría.
  { categoria: "intercomunicador", re: /casco\s+a\s+casco/, confianza: "alta", senal: "habló de casco a casco" },
  // Cómo lo nombra la gente que no sabe el nombre técnico. El dueño dio estos
  // dos ejemplos literales: "los de los cascos", "los aparatos para hablar en moto".
  { categoria: "intercomunicador", re: /\b(?:los|las|el|la)\s+(?:de\s+los|para\s+(?:el|los)|de)\s+cascos?\b/, confianza: "media", senal: "los de los cascos" },
  { categoria: "intercomunicador", re: /\bhablar\b[^.]{0,20}\b(?:en|desde|por)\s+(?:la\s+)?mot/, confianza: "media", senal: "hablar en moto" },
  { categoria: "intercomunicador", re: /\bcomunicar\w*\b[^.]{0,25}\bcasco/, confianza: "media", senal: "comunicarse con casco" },
  { categoria: "intercomunicador", re: /\bdiadema\w*\b[^.]{0,15}\bcasco/, confianza: "media", senal: "diadema para casco" },
];

/** El producto que se asume para una categoría cuando no hay más señales. */
function productoPorDefectoDe(categoria) {
  const ficha = Object.values(PRODUCTOS).find(
    (p) => p.categoria === categoria && p.porDefectoDeCategoria
  );
  return ficha ? ficha.id : null;
}

// ⚠️ Compatibilidad: `SENALES_V10` existía y lo usan pruebas viejas. Se reconstruye
// con las dos listas para que siga significando "lo que suena a intercomunicador".
const SENALES_V10 = [
  ...SENALES_DE_CATEGORIA.filter((s) => s.categoria === "intercomunicador"),
  ...SENALES_DE_MODELO.filter((s) => s.producto === "intercom_v10_2x"),
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

  // ==========================================================================
  // 1. ¿NOMBRÓ UN MODELO? Eso decide solo, y va PRIMERO.
  //
  // "quiero el Q58" no puede resolverse por categoría: el cliente ya dijo cuál.
  // Por eso los modelos se miran antes que la categoría, aunque la frase traiga
  // las dos cosas ("intercomunicador Q58 Max" las trae).
  // ==========================================================================
  for (const s of SENALES_DE_MODELO) {
    if (s.re.test(t)) {
      return {
        producto: s.producto,
        confianza: s.confianza,
        senal: s.senal,
        adjetivo: false,
        categoria: (PRODUCTOS[s.producto] || {}).categoria || null,
        // Dijo el modelo: no hay nada que resolver.
        generico: false,
      };
    }
  }

  // ==========================================================================
  // 2. ¿NOMBRÓ LA CATEGORÍA? Entonces NO se decide acá.
  //
  // 🔴 ESTE `generico: true` ES EL ARREGLO DEL 15-OCT. Se devuelve un producto
  // —el default de la categoría— para no romper a ningún llamador que espere
  // `.producto`, pero marcado como genérico para que `productoDelHilo` sepa que
  // NO tiene que congelarlo ni pisarle el anuncio por el que entró el cliente.
  //
  // Sin esta marca, un lead del anuncio del Q58 que escribe "info de los
  // intercomunicadores" se vendía como V10: $30.000 menos y el producto
  // equivocado en la guía.
  // ==========================================================================
  for (const s of SENALES_DE_CATEGORIA) {
    if (s.re.test(t)) {
      const porDefecto = productoPorDefectoDe(s.categoria);
      if (!porDefecto) continue;
      return {
        producto: porDefecto,
        confianza: s.confianza,
        senal: s.senal,
        adjetivo: false,
        categoria: s.categoria,
        generico: true,
      };
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
  // ⛔ Y SALVO cuando la señal es solo de CATEGORÍA (15-oct). "Intercomunicador"
  // con dos intercomunicadores en catálogo no dice CUÁL, así que no puede
  // decidir ni congelar nada: se deja seguir a los pasos de abajo, que saben
  // mirar el producto activo y el anuncio por el que entró.
  if (ahora && !ahora.adjetivo && !ahora.generico) {
    return { producto: ahora.producto, porQue: ahora.senal, explicito: true };
  }

  // ==========================================================================
  // 1-BIS. DIJO LA CATEGORÍA, PERO NO EL MODELO.
  //
  // Se resuelve con lo que ya se sabe del cliente, en este orden:
  //   a) el producto de la conversación, si es de ESA categoría
  //   b) el anuncio por el que entró, si es de ESA categoría
  //
  // 🔑 El filtro por categoría importa: si el hilo venía de impermeables y el
  // cliente ahora pregunta por intercomunicadores, el productoActivo
  // (impermeable) NO puede resolver una pregunta de intercomunicadores. En ese
  // caso cae al default de la categoría, que es lo correcto.
  //
  // Si no hay ninguna de las dos, sigue hacia abajo y termina en el default de
  // categoría que ya trae `ahora.producto`.
  // ==========================================================================
  if (ahora && ahora.generico && ahora.categoria) {
    const activo = conv && conv.productoActivo && PRODUCTOS[conv.productoActivo];
    if (activo && activo.categoria === ahora.categoria) {
      return {
        producto: activo.id,
        porQue: `es el ${activo.nombreCorto} de esta conversación`,
        explicito: false,
      };
    }
    const delAnuncio = opciones.producto && PRODUCTOS[opciones.producto];
    if (delAnuncio && delAnuncio.categoria === ahora.categoria) {
      return {
        producto: delAnuncio.id,
        porQue: `el anuncio por el que entró era de ${delAnuncio.nombreCorto}`,
        explicito: false,
      };
    }
    // ========================================================================
    // c) NI PRODUCTO ACTIVO NI ANUNCIO: el default de la categoría.
    //
    // 🔴 ESTE RETURN EVITA UNA REGRESIÓN QUE INTRODUJE Y QUE CAZÓ LA PRUEBA.
    // Sin él, "info de los intercomunicadores" sin anuncio ni historial se caía
    // hasta el paso 5 y terminaba en el IMPERMEABLE — cuando antes del cambio
    // devolvía V10. O sea que arreglando el Q58 habría roto el V10.
    //
    // Y va con `explicito: true` a propósito, igual que antes: así el producto
    // queda fijado en la conversación y no se va al impermeable tres mensajes
    // después. Si el cliente nombra un modelo, la señal de modelo le gana a esto
    // y cambia sin problema.
    // ========================================================================
    return {
      producto: ahora.producto,
      porQue: `${ahora.senal} (sin anuncio: se asume ${(PRODUCTOS[ahora.producto] || {}).nombreCorto})`,
      explicito: true,
    };
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
/**
 * Los ids de anuncio configurados para un producto, leyendo su variable de
 * entorno. Acepta separados por coma, espacio o salto de línea.
 */
function idsDeAnuncioDe(productoId) {
  const ficha = PRODUCTOS[productoId];
  if (!ficha || !ficha.anunciosEnv) return [];
  return String(process.env[ficha.anunciosEnv] || "")
    .split(/[\s,]+/)
    .filter(Boolean);
}

/**
 * 🎯 EL MAPA DE ANUNCIOS → PRODUCTO, para revisarlo sin desplegar.
 *
 * DE DÓNDE SALE (15-oct), pedido del dueño: *"crea un sistema para poder
 * diferenciar los anuncios que van a llegar por su ID de anuncio, de modo que el
 * bot sepa si el lead viene del anuncio del V10 o del Q58 Max"*.
 *
 * 🔑 Un enrutamiento que no se puede verificar no sirve: si el dueño pega un id
 * con un espacio de más o se le queda viejo, se entera vendiendo el producto
 * equivocado. Esto lo expone en `/health?token=...` para poder mirarlo.
 *
 * @returns {Array<{producto:string, nombreCorto:string, variable:string, ids:string[], configurado:boolean}>}
 */
function anunciosConfigurados() {
  return Object.values(PRODUCTOS)
    .filter((p) => p.anunciosEnv)
    .map((p) => {
      const ids = idsDeAnuncioDe(p.id);
      return {
        producto: p.id,
        nombreCorto: p.nombreCorto,
        variable: p.anunciosEnv,
        ids,
        configurado: ids.length > 0,
      };
    });
}

function productoDelAnuncio(atribucion) {
  if (!atribucion) return null;

  // ==========================================================================
  // 1. LA LISTA DE IDS POR PRODUCTO. La señal más fuerte que existe.
  //
  // 🔴 ERA EL ÚNICO ARREGLO POSIBLE PARA EL RIESGO DEL Q58 (15-oct). Con dos
  // intercomunicadores, el TEXTO del anuncio no alcanza: los dos anuncios dicen
  // "intercomunicador", así que el paso 2 resolvería los dos al mismo producto.
  // El id del anuncio es el único dato que los separa sin ambigüedad.
  //
  // Antes esto leía una sola variable (`ANUNCIOS_V10`) y devolvía el V10
  // hardcodeado. Ahora cada producto declara la suya en su ficha
  // (`anunciosEnv`), así que agregar un producto no toca esta función.
  // ==========================================================================
  const id = String(atribucion.source_id || atribucion.anuncio_id || "");
  if (id) {
    for (const ficha of Object.values(PRODUCTOS)) {
      if (!ficha.anunciosEnv) continue;
      if (idsDeAnuncioDe(ficha.id).includes(id)) return ficha.id;
    }
  }

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
  if (!hallado) return null;

  // ==========================================================================
  // 🔴 EL CASO QUE NO PUEDE PASAR EN SILENCIO (15-oct)
  //
  // Si el texto del anuncio solo dice la CATEGORÍA ("intercomunicadores") y hay
  // DOS productos en ella, este camino resuelve al default —el V10— sin forma de
  // saber si el anuncio era del Q58. Es exactamente la fuga de $30.000 por venta
  // que motivó todo este bloque.
  //
  // No se puede "adivinar mejor": el dato que falta es el id en la variable de
  // entorno. Lo que sí se puede es NO FALLAR CALLADO, para que el dueño lo vea
  // en el log el primer día en vez de descubrirlo en un pedido mal despachado.
  // ==========================================================================
  if (hallado.generico && hallado.categoria) {
    const enLaCategoria = Object.values(PRODUCTOS).filter((p) => p.categoria === hallado.categoria);
    if (enLaCategoria.length > 1) {
      const variables = enLaCategoria
        .filter((p) => p.anunciosEnv)
        .map((p) => `${p.anunciosEnv} (${p.nombreCorto})`)
        .join(" · ");
      console.warn(
        `⚠️ ANUNCIO SIN MAPEAR: el anuncio ${id || "(sin id)"} habla de ` +
          `${hallado.categoria} pero su id no está en ninguna variable, así que se asumió ` +
          `${(PRODUCTOS[hallado.producto] || {}).nombreCorto || hallado.producto}. ` +
          `Si ese anuncio es del otro producto, se está cotizando el precio equivocado. ` +
          `Agregá el id a la variable que corresponda: ${variables}`
      );
    }
  }
  return hallado.producto;
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
function unidadesPedidas(texto, productoId) {
  // 📻 Los radios se cuentan en CAJAS, y el cliente habla en RADIOS. Tiene su
  // propio lector: "quiero 4 radios" son 2 cajas, no 4.
  if (productoId && esRadio(productoId)) return cajasDeRadios(texto);

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

// ============================================================================
// 📻 CUÁNTAS CAJAS DE RADIOS PIDE EL CLIENTE — 23-oct
//
// 🔴 EL RIESGO: la publicidad habla en RADIOS ("COMBO X 2", "X 4", "X 6") y el
// pedido se guarda en CAJAS (1 caja = 2 radios). Un cliente que escribe
// "quiero 4 radios" pide 2 cajas. Si se leyera "4" como 4 unidades, se le
// cotizaría una cantidad que no existe o se le despacharía el doble.
//
// Reglas, en este orden:
//   · "N cajas"                         -> N
//   · "N radios", "x N", "combo de N"   -> N / 2 si N es par
//   · el precio de una opción ($99, $169, $229) -> esa opción
//   · "megacombo", "el de 6", "el de 4"  -> 3 / 2
//   · "un radio", "3 radios", N impar    -> null: los radios vienen por par, y
//     eso lo explica el guion. Redondear sería elegir por el cliente.
//   · "quiero 2" pelado                  -> null: puede ser 2 radios o 2 cajas.
//     Preguntar cuesta un mensaje; adivinar cuesta un despacho mal hecho.
//
// Si hay varias menciones, gana la ÚLTIMA: es la corrección ("quería 6, mejor 4").
// ============================================================================
const PALABRAS_NUMERO = {
  un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6,
  siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12,
};

function numeroDe(s) {
  const n = Number(s);
  if (Number.isFinite(n)) return n;
  return PALABRAS_NUMERO[s] || null;
}

function cajasDeRadios(texto) {
  const t = aplanar(texto);
  if (!t.trim()) return null;
  const NUM = "(\\d{1,2}|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce)";
  const hallados = []; // { i, cajas, tipo }  (cajas null = impar: no se decide)
  const anotar = (re, aCajas, tipo = "otro") => {
    const r = new RegExp(re, "g");
    let m;
    while ((m = r.exec(t))) {
      const c = aCajas(m);
      if (c !== undefined) hallados.push({ i: m.index, cajas: c, tipo });
    }
  };
  const desdeRadios = (n) => (n && n % 2 === 0 ? n / 2 : null);

  // "2 cajas", "una caja", "tres cajitas"
  anotar(`\\b${NUM}\\s+(?:cajas?|cajitas?|kits?)\\b`, (m) => numeroDe(m[1]) || undefined, "cajas");
  // "4 radios", "seis radios", "2 walkies"
  anotar(`\\b${NUM}\\s+(?:radios?|walk[iy]e?s?|equipos?|aparatos?)\\b`, (m) => desdeRadios(numeroDe(m[1])));
  // "x4", "x 6", "combo de 4", "combo por 6", "el de 6", "los de 4", "pack de 2"
  anotar(`(?:\\bx\\s*|\\bcombo\\s+(?:de\\s+|por\\s+|x\\s*)?|\\bpack\\s+(?:de\\s+)?|\\b(?:el|los)\\s+de\\s+)(2|4|6|dos|cuatro|seis)\\b(?!\\s*(?:mil|000|\\.000))`, (m) =>
    desdeRadios(numeroDe(m[1]))
  );
  // "un par", "el par", "una pareja"
  anotar(`\\b(?:un|el|una|la)\\s+(?:par|pareja)\\b(?!\\s+de\\s+(?:cajas|combos))`, () => 1);
  // "megacombo"
  anotar(`\\bmega\\s*-?\\s*combo\\b`, () => 3);
  // El precio de la opción: "el de 99", "169 mil", "$229.000". ⚠️ Exige "mil",
  // ".000" o "el de": un "99" suelto puede ser la "calle 99" de la dirección.
  const PRECIO_A_CAJAS = { 99: 1, 169: 2, 229: 3 };
  anotar(`\\b(?:el|la|los)\\s+de\\s+(99|169|229)\\b|\\b(99|169|229)(?:[.\\s]000|\\s*mil)\\b`, (m) =>
    PRECIO_A_CAJAS[m[1] || m[2]]
  );
  // "solo uno", "solo una": una sola pieza. No existe: queda sin decidir.
  anotar(`\\bsolo\\s+(?:uno|una|1)\\b`, () => null);
  // 🔴 24-oct (chat real, Quibdó): el bot pregunta "¿Cuántos radios necesitás?"
  // y el cliente contesta "4", "Los 4", "unos 12", "6 para Ráquira". Ese número
  // son RADIOS. No se leía y el bot quedó cotizando 1 caja ($99.000) mientras el
  // cliente pedía 4; repitió el mismo mensaje cuatro veces.
  // Solo cuenta si el número va al PRINCIPIO del mensaje (lo que contesta la
  // pregunta) y no es una dirección, un teléfono ni un precio.
  {
    const m = new RegExp(
      `^\\s*(?:(?:los|las|unos|unas|son|serian|necesito|quiero|como|mas\\s+o\\s+menos)\\s+)*${NUM}\\b(?!\\s*(?:mil|000|\\.\\d|cajas?|cajitas?|kits?|#|-|de\\s+(?:la|el)\\s+calle))`
    ).exec(t);
    if (m && !/\\b(calle|carrera|cra|cl|kr|avenida|av|barrio|mz|manzana|casa|apto|celular|cel|tel)\\b/.test(t)) {
      const n = numeroDe(m[1]);
      if (n && n <= 20) hallados.push({ i: m.index, cajas: desdeRadios(n), tipo: "respuesta" });
    }
  }

  if (!hallados.length) return null;
  // 🔑 Si el cliente nombró CAJAS, eso manda: en "dos cajas de 2 radios" el "2
  // radios" describe la caja, no es otra cantidad.
  const deCajas = hallados.filter((h) => h.tipo === "cajas");
  const validos = deCajas.length ? deCajas : hallados;
  validos.sort((a, b) => a.i - b.i);
  return validos[validos.length - 1].cajas;
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
  // 🎯 Enrutamiento de anuncios por producto (15-oct, para el Q58 Max).
  esProductoSimple,
  esIntercom,
  esRadio,
  envioEsGratis,
  cajasDeRadios,
  anunciosConfigurados,
  idsDeAnuncioDe,
  productoPorDefectoDe,
  SENALES_DE_MODELO,
  SENALES_DE_CATEGORIA,
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
