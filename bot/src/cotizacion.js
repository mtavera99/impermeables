// ============================================================================
// 🧾 EL RECORRIDO DE COTIZACIÓN — el precio lo calcula el código, no el modelo
//
// DE DÓNDE SALE (26-sep). Se reportaron tres cotizaciones mal dadas el 25-sep:
//
//   · Palmira  → el bot dijo envío $23.100 y total $83.100. El tarifario da
//                $22.100 y $82.000 (banda C). Además $59.900 + $23.100 = $83.000,
//                así que el $83.100 no cierra ni con su propia suma.
//   · Cúcuta   → el bot dijo $82.000 (1 ud) y $148.000 (2 uds). El tarifario da
//                $83.000 y $140.000 (banda D). Los valores que dijo son los de
//                banda C.
//   · Gachancipá → ofreció $148.000 antes de conocer el destino.
//
// 🔴 LO QUE LA REVISIÓN ENCONTRÓ: `cotizar()` NO se llamaba en la conversación.
// El precio lo resolvía el modelo leyendo una tabla de texto con 107 ciudades en
// 5 bandas, metida dentro del guion. El tarifario existía, estaba probado y daba
// bien — y nadie lo consultaba.
//
// ⚠️ SOBRE LO QUE ESTO SÍ Y NO DEMUESTRA: es un mecanismo que hace POSIBLE esa
// clase de error, y los valores dichos coinciden con otras bandas. Eso es
// consistente con una confusión de filas, pero NO demuestra cómo el modelo
// eligió cada número. La corrección no depende de esa distinción: pedirle a un
// modelo que lea bien una tabla de 107 filas y sume, para decidir cuánto se
// cobra contraentrega, es la arquitectura equivocada en cualquier caso.
//
// ── LAS SIETE ETAPAS ───────────────────────────────────────────────────────
//   1. resolverDestino   ·  cinco salidas distintas, no una
//   2. resolverCantidad  ·  1, 2, o escalar
//   3. calcular          ·  cotizar() + estructura persistible
//   4. bloqueDeDatos     ·  los números exactos para ese turno
//   5. validarRespuesta  ·  🔑 revisar el mensaje ANTES de que salga
//   6. verificarPedido   ·  el ##ORDER## no puede contradecir la cotización
//   7. (descuentos)      ·  se conservan los aprobados; no se habilitan nuevos
//
// 🔑 LA ETAPA 5 ES LA QUE HACE LA DIFERENCIA. Sin ella, la 4 sigue siendo una
// instrucción al modelo — y este proyecto ya aprendió cinco veces que una
// instrucción no es un candado.
// ============================================================================

const fletes = require("./fletes");

// Versión de la política. Va pegada a cada cotización guardada: si mañana cambia
// un precio o un tope de descuento, se puede saber con qué reglas se cotizó.
const POLITICA_VERSION = "2026-09-26.1";

// Los topes de descuento APROBADOS hoy. No se habilitan nuevos acá: este módulo
// los lee, no los decide.
const TOPE_DESCUENTO_1_UNIDAD = 3000;

// ---------------------------------------------------------------------------
// ETAPA 1 — RESOLVER EL DESTINO
//
// Cinco salidas, y cada una lleva a una conducta distinta. Antes todo esto
// colapsaba en "banda E $85.000", que borra la diferencia entre una tarifa
// medida y una ciudad de la que no sabemos nada.
// ---------------------------------------------------------------------------
/**
 * "Mosquera Nariño" → el Mosquera de Nariño, no "Mosquera" a secas.
 *
 * Devuelve null si el texto no trae una ciudad ambigua acompañada de uno de sus
 * departamentos posibles: en ese caso manda la lógica normal.
 */
function resolverConDepartamento(nombre) {
  const norm = fletes.normalizar(nombre);
  for (const [ciudadAmbigua, deptos] of Object.entries(fletes.CIUDADES_AMBIGUAS || {})) {
    const cNorm = fletes.normalizar(ciudadAmbigua);
    if (!norm.includes(cNorm)) continue;

    const depto = (deptos || []).find((d) => norm.includes(fletes.normalizar(d)));
    if (!depto) continue; // nombró la ciudad pero no el departamento → sigue ambigua

    // 1. ¿El tarifario tiene esa combinación? Es el caso de Mosquera/Cundinamarca.
    const banda = fletes.bandaDe(`${ciudadAmbigua} ${depto}`);
    if (banda) {
      return {
        estado: "reconocida",
        ciudad: `${ciudadAmbigua} (${depto})`,
        // ⚠️ La cadena CON el departamento, que es la que el tarifario resuelve
        // bien: cotizar("MOSQUERA") sola devuelve preguntarDepartamento y total
        // null, y un total null que llegue a un mensaje dice "$0".
        ciudadTarifario: `${ciudadAmbigua} ${depto}`,
        banda,
        departamento: depto,
        desambiguada: true,
      };
    }

    // 2. ¿Es la variante de difícil acceso? Es el caso de Mosquera/Nariño.
    const dificil = fletes.zonaDificilDe(ciudadAmbigua);
    if (dificil) {
      if (dificil.total === null) {
        return {
          estado: "dificil_sin_tarifa",
          ciudad: `${ciudadAmbigua} (${depto})`,
          departamento: depto,
          escalar: true,
          desambiguada: true,
          nota: dificil.nota || `variante de ${depto}, sin tarifa medida`,
        };
      }
      return {
        estado: "dificil_con_tarifa",
        ciudad: `${ciudadAmbigua} (${depto})`,
        departamento: depto,
        totalConfirmado: dificil.total,
        sinPromo2: dificil.sinPromo2 === true,
        desambiguada: true,
        nota: dificil.nota,
      };
    }

    // 3. Ni tarifa propia ni difícil acceso conocido: se cotiza con la
    //    predeterminada y queda marcado como no verificado, igual que cualquier
    //    municipio fuera del tarifario.
    return {
      estado: "predeterminada",
      ciudad: `${ciudadAmbigua} (${depto})`,
      departamento: depto,
      banda: fletes.BANDA_POR_DEFECTO,
      desambiguada: true,
    };
  }
  return null;
}

/**
 * @param {string} ciudad
 * @returns {{estado:string, ciudad:string, ...}}
 *   estado: "sin_destino" | "ambiguo" | "dificil_sin_tarifa" | "dificil_con_tarifa"
 *         | "reconocida" | "predeterminada"
 */
function resolverDestino(ciudad) {
  const nombre = String(ciudad == null ? "" : ciudad).trim();
  if (!nombre) return { estado: "sin_destino", ciudad: "" };

  // ========================================================================
  // 🔴 SI EL CLIENTE YA DIJO EL DEPARTAMENTO, NO SE LE PREGUNTA OTRA VEZ
  //
  // LO QUE SE ENCONTRÓ (revisión 26-sep): con "Mosquera Nariño" el recorrido
  // devolvía solo "Mosquera" y volvía a preguntar el departamento que el cliente
  // ACABABA de dar. Y es el peor caso posible para equivocarse: Mosquera de
  // Cundinamarca es banda A (sabana de Bogotá, $73.000) y Mosquera de Nariño es
  // Pacífico sin tarifa medida. Entre las dos hay un abismo de flete.
  //
  // Verificado contra el tarifario: bandaDe("Mosquera Cundinamarca") = A, y
  // Mosquera está en ZONA_DIFICIL_ACCESO con total null, que es el de Nariño.
  // ========================================================================
  const conDepto = resolverConDepartamento(nombre);
  if (conDepto) return conDepto;

  // Nombre que existe en varios departamentos: NO se cotiza, se pregunta. Hay un
  // Mosquera en la sabana de Bogotá y otro en el Pacífico de Nariño.
  const deptos = fletes.departamentosPosibles(nombre);
  if (deptos) {
    return { estado: "ambiguo", ciudad: nombre, preguntarDepartamento: deptos };
  }

  const dificil = fletes.zonaDificilDe(nombre);
  if (dificil) {
    if (dificil.total === null) {
      return { estado: "dificil_sin_tarifa", ciudad: nombre, escalar: true, nota: dificil.nota };
    }
    return {
      estado: "dificil_con_tarifa",
      ciudad: nombre,
      totalConfirmado: dificil.total,
      sinPromo2: dificil.sinPromo2 === true,
      nota: dificil.nota,
    };
  }

  const clave = fletes.bandaDe(nombre);
  if (clave) {
    return { estado: "reconocida", ciudad: nombre, banda: clave };
  }

  // ========================================================================
  // ⚠️ TARIFA PREDETERMINADA — Y NO SE LE DICE "TECHO DE SEGURIDAD"
  //
  // La ciudad no está en el tarifario. `cotizar()` devuelve los números de la
  // banda por defecto y marca `reconocida: false`.
  //
  // 🔑 LLAMARLO "TECHO" SERÍA AFIRMAR ALGO QUE NO ESTÁ VERIFICADO: no hay
  // garantía de que ese valor cubra el costo logístico de CUALQUIER municipio.
  // El Charco está en la lista de difícil acceso justamente porque su flete real
  // ($55.563) supera de largo cualquier banda. Lo único cierto es que es una
  // tarifa predeterminada y que el costo específico de esa ciudad no se verificó.
  //
  // La política vigente se conserva (se cotiza con el predeterminado), pero
  // queda marcado para que el panel y el guion puedan tratarlo distinto.
  // ========================================================================
  return { estado: "predeterminada", ciudad: nombre, banda: fletes.BANDA_POR_DEFECTO };
}

// ---------------------------------------------------------------------------
// ETAPA 2 — RESOLVER LA CANTIDAD
// ---------------------------------------------------------------------------
// ============================================================================
// 🔴 LA CANTIDAD SE CONSERVA HASTA QUE EL CLIENTE LA CORRIJA (revisión 26-sep)
//
// LO QUE SE ENCONTRÓ: después de "quiero dos conjuntos", el recorrido volvía a
// UNA unidad en cuanto el cliente contestaba la ciudad y la talla. Dos causas
// que se sumaban:
//
//   1. `textoDelCliente()` miraba solo los dos últimos mensajes, así que a los
//      tres turnos la palabra "dos" ya no estaba en la ventana.
//   2. `resolverCantidad()` devolvía `uds:1` tanto cuando el cliente pedía una
//      como cuando NO DECÍA NADA. Esos dos casos no son lo mismo y confundirlos
//      es lo que hacía desaparecer la segunda unidad en silencio.
//
// 🔑 Y cotizar de menos no es un error inofensivo: el cliente que pidió dos
// recibe el total de uno, y si el pedido se despacha así, la diferencia la paga
// el negocio o se descubre en la puerta del cliente.
//
// Ahora la cantidad es un ESTADO que se arrastra, y solo cambia con una
// corrección explícita. `explicita` distingue "el cliente lo dijo" de "se
// heredó", que es lo que permite arrastrarla sin pisar una corrección.
// ============================================================================

// "dos" pegado a un sustantivo, o como respuesta suelta, o después de un verbo
// de querer. Antes solo existía la primera forma, así que "quiero 2" y un "dos"
// suelto —la respuesta más natural a "¿uno o dos?"— se leían como UNA unidad.
const RE_DOS =
  /\b(2|dos)\s*(conjuntos?|impermeables?|unidades?|trajes?|kits?|pares?)\b|\bcombo\b|\bpromo(?:ci[oó]n)?\s*(?:de\s*)?(?:2|dos)\b|\b(quiero|llevo|me llevo|dame|deme|necesito|ser[ií]an?|son|van|pongame|p[oó]ngame|mande|env[ií]eme)\s*(?:los\s*)?(2|dos)\b|\b(los|las)\s+dos\b|\bambos\b|\bel combo de (2|dos)\b/i;

const RE_TRES_O_MAS =
  /\b([3-9]|1\d+|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|veinte)\s*(conjuntos?|impermeables?|unidades?|trajes?|kits?)\b|\b(al por mayor|por mayor|mayorista|docena|docenas)\b/i;

// 🔑 UNA unidad, dicho de verdad. NO alcanza con que aparezca un "1" suelto: una
// dirección ("Calle 1 #2-3") o un celular traen dígitos, y si eso contara como
// "pidió una", una dirección borraría el pedido de dos que el cliente ya hizo.
const RE_UNO =
  /\b(1|un|uno|una)\s*(conjunto|impermeable|unidad|traje|kit)\b|\b(solo|solamente|nada m[aá]s|[uú]nicamente|apenas)\s*(1|un|uno|una)\b|\b(1|uno|una)\s*(solo|sola|nada m[aá]s)\b|\bmejor (1|uno|una)\b|\bcon (1|uno|una) (basta|me basta|est[aá] bien)\b/i;
const RE_SOLO_UN_NUMERO = /^\s*(1|uno|una)\s*$/i;
const RE_SOLO_DOS = /^\s*(2|dos)\s*$/i;

/**
 * @param {string} texto    lo que dijo el cliente (este turno o la ventana)
 * @param {number} [previa] la cantidad que ya venía de la conversación
 * @returns {{uds:number, escalar:boolean, explicita:boolean, heredada:boolean, motivo?:string}}
 */
function resolverCantidad(texto, previa) {
  const t = String(texto == null ? "" : texto);
  const heredable = Number.isFinite(Number(previa)) && Number(previa) >= 1 ? Number(previa) : 0;

  // 3+ se escala SIEMPRE: el flete de 6 o 12 unidades no está medido y cotizar a
  // ojo ya costó plata. Se revisa antes que el 2 para que "12 conjuntos" no se
  // lea como "2".
  if (RE_TRES_O_MAS.test(t)) {
    return {
      uds: 0,
      escalar: true,
      explicita: true,
      heredada: false,
      motivo: "cantidad de 3 o más: el flete no está medido",
    };
  }
  // El "uno" explícito va ANTES del dos: es la corrección ("mejor uno solo") y
  // tiene que poder deshacer un dos que venía arrastrado.
  if (RE_UNO.test(t) || RE_SOLO_UN_NUMERO.test(t)) {
    return { uds: 1, escalar: false, explicita: true, heredada: false };
  }
  if (RE_DOS.test(t) || RE_SOLO_DOS.test(t)) {
    return { uds: 2, escalar: false, explicita: true, heredada: false };
  }
  // No dijo nada de cantidad: se conserva la que ya había.
  if (heredable) {
    return { uds: heredable, escalar: false, explicita: false, heredada: true };
  }
  return { uds: 1, escalar: false, explicita: false, heredada: false };
}

// ---------------------------------------------------------------------------
// ETAPA 3 — CALCULAR
// ---------------------------------------------------------------------------
/**
 * La cotización estructurada. Es lo que se guarda y lo que valida todo lo demás.
 *
 * @returns {{
 *   ok:boolean, motivo?:string, destino:object,
 *   uds:number, producto:number, envio:number, total:number,
 *   ahorro:number|null, rescate:number|null, reconocida:boolean,
 *   politica:string, creado:number
 * }}
 */
/**
 * Todas las ciudades RECONOCIBLES que aparecen en un texto.
 *
 * Hace falta para el caso que pidió el dueño probar: el cliente que compara dos
 * destinos ("¿cuánto a Cali y cuánto a Pasto?"). Ahí no se puede elegir una por
 * él —cualquiera de las dos sería adivinar— así que se pregunta.
 *
 * Se prueban ventanas de 1 a 3 palabras, de la MÁS CORTA a la más larga:
 * `bandaDe` reconoce la ciudad dentro de una cadena más larga, así que empezando
 * por la ventana larga "para Cali" también daría positivo y arrastraría basura.
 */
function ciudadesEn(texto) {
  const salida = [];
  const vistas = new Set();
  const crudo = String(texto == null ? "" : texto);

  // ⚠️ PRIMERO las combinaciones "ciudad + departamento", y no por gusto: si se
  // deja que gane la ventana de una palabra, "Mosquera Nariño" se reduce a
  // "Mosquera" y el departamento que el cliente acababa de dar se tira a la
  // basura. Al agregarlas antes, la regla de contención descarta la corta.
  {
    const norm = fletes.normalizar(crudo);
    for (const [ciudadAmbigua, deptos] of Object.entries(fletes.CIUDADES_AMBIGUAS || {})) {
      const cNorm = fletes.normalizar(ciudadAmbigua);
      if (!norm.includes(cNorm)) continue;
      const depto = (deptos || []).find((d) => norm.includes(fletes.normalizar(d)));
      if (!depto) continue;
      const clave = fletes.normalizar(`${ciudadAmbigua} ${depto}`);
      if (vistas.has(clave)) continue;
      vistas.add(clave);
      salida.push(`${ciudadAmbigua} ${depto}`);
    }
  }

  for (const trozo of crudo.split(/[,.;:\n()/|?¿!¡]+/)) {
    const palabras = trozo.trim().split(/\s+/).filter(Boolean);
    for (const n of [1, 2, 3]) {
      for (let i = 0; i + n <= palabras.length; i++) {
        const cand = palabras.slice(i, i + n).join(" ");
        if (cand.length < 4 || /\d/.test(cand)) continue;
        if (!fletes.bandaDe(cand) && !fletes.departamentosPosibles(cand) && !fletes.zonaDificilDe(cand)) {
          continue;
        }
        const clave = fletes.normalizar(cand);
        // "Santa" y "Santa Marta" no cuentan como dos: se queda la primera que
        // coincide (la más corta), y las que la contienen se descartan. Lo mismo
        // descarta "Mosquera" cuando ya se registró "Mosquera Nariño".
        if ([...vistas].some((v) => clave.includes(v) || v.includes(clave))) continue;
        vistas.add(clave);
        salida.push(cand);
      }
    }
  }
  return salida;
}

// ============================================================================
// 🔴 LA CIUDAD QUE NO ESTÁ EN EL TARIFARIO TAMBIÉN ES UNA CIUDAD
//
// LO QUE SE ENCONTRÓ (revisión 26-sep): ciudadesEn("Gachancipá") devolvía [].
// `ciudadesEn` solo reconoce lo que está en el tarifario, así que un municipio
// fuera de la lista era INVISIBLE: el recorrido quedaba en `sin_destino` y el bot
// volvía a preguntar la ciudad una y otra vez sobre una ciudad ya dada.
//
// 🔑 Y lo absurdo es que `resolverDestino("Gachancipá")` funciona perfecto:
// devuelve `predeterminada`. El problema nunca fue cotizar, fue DETECTAR.
//
// La señal que faltaba usar es la conversación: si el bot acaba de preguntar la
// ciudad, la respuesta corta del cliente ES la ciudad. No hace falta tener la
// lista completa de los 1.100 municipios de Colombia para darse cuenta.
// ============================================================================

const RE_BOT_PIDIO_CIUDAD =
  /\b(para qu[eé] ciudad|a qu[eé] ciudad|de qu[eé] ciudad|en qu[eé] ciudad|qu[eé] ciudad|cu[aá]l ciudad|tu ciudad|su ciudad|qu[eé] municipio|cu[aá]l municipio|d[oó]nde (te |le )?(lo )?(enviamos|env[ií]o|despachamos|mandamos))\b/i;

// Palabras que aparecen en respuestas cortas y NO son municipios. Sin esta lista,
// "no sé", "gracias" o "cuánto vale" se convertirían en ciudades y el bot
// cotizaría un destino inventado.
const NO_ES_CIUDAD = new Set(
  ("si no ok okay listo bueno buenas hola gracias claro dale vale nada nose se " +
    "cuanto cuando como donde porque quien cual que talla tallas color colores precio " +
    "envio total pago pagar contraentrega barato caro descuento producto conjunto " +
    "impermeable traje foto fotos video catalogo hoy manana ahora despues luego " +
    "aqui alli casa apartamento barrio direccion celular numero nombre cedula " +
    "uno dos tres una negro azul rojo verde amarillo naranja blanco gris morado " +
    "grande pequeno mediano espere esperen momento senor senora amigo")
    .split(/\s+/)
);

const RE_RELLENO_CIUDAD =
  /^\s*(?:es\s+)?(?:para|en|de|desde|hacia|soy\s+de|vivo\s+en|estoy\s+en|seria\s+para|ser[ií]a\s+en|ac[aá]\s+en|aqu[ií]\s+en|mi\s+ciudad\s+es|la\s+ciudad\s+es)\s+/i;

/**
 * Un nombre de municipio plausible dentro de una respuesta corta.
 *
 * Conservador a propósito: si no está razonablemente seguro devuelve "". Inventar
 * un destino es peor que volver a preguntar, porque de un destino sale un precio.
 *
 * @returns {string} el candidato, o "" si no hay
 */
function ciudadPlausible(texto) {
  let t = String(texto == null ? "" : texto).trim();
  if (!t) return "";
  // Una pregunta no es una respuesta con la ciudad.
  if (/[?¿]/.test(t)) return "";
  if (/\d/.test(t)) return ""; // direcciones y teléfonos no son ciudades
  t = t.replace(RE_RELLENO_CIUDAD, "").trim();
  // Se queda solo con letras y espacios (quita emojis y signos).
  t = t.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return "";

  const palabras = t.split(" ").filter(Boolean);
  // Una ciudad se contesta corto. Más de 4 palabras es una frase, no un destino.
  if (palabras.length === 0 || palabras.length > 4) return "";
  if (palabras.some((p) => NO_ES_CIUDAD.has(fletes.normalizar(p).toLowerCase()))) return "";
  if (palabras.some((p) => p.length < 3)) {
    // Se permiten conectores internos de nombres compuestos ("San Juan de Pasto").
    const permitidos = new Set(["de", "del", "la", "el", "los", "las", "y"]);
    if (!palabras.every((p) => p.length >= 3 || permitidos.has(p.toLowerCase()))) return "";
  }
  const cand = palabras.join(" ");
  return cand.length >= 4 ? cand : "";
}

/** ¿El último mensaje del bot le preguntó la ciudad al cliente? */
function botPidioCiudad(messages) {
  const delBot = (messages || []).filter((m) => m && m.role === "assistant");
  const ultimo = delBot[delBot.length - 1];
  return Boolean(ultimo && RE_BOT_PIDIO_CIUDAD.test(String(ultimo.content || "")));
}

/**
 * 🧭 DE DÓNDE SALE LA CIUDAD PARA COTIZAR — el camino real, en un solo lugar.
 *
 * Esto vivía dentro de agent.js, donde no se podía probar sin levantar el bot.
 * Se movió acá para que las pruebas recorran exactamente lo que usa
 * generateReply(), y no una versión de laboratorio con la ciudad ya escrita bien.
 *
 * Prioridad, y cada paso tiene su razón:
 *   1. lo nombrado EN ESTE TURNO manda: si cambió de ciudad, la oferta cambia
 *   2. si el bot acababa de preguntar la ciudad, la respuesta ES la ciudad
 *      (acá entran los municipios que no están en el tarifario)
 *   3. la de la cotización vigente
 *   4. hacia atrás, lo último reconocible que dijo el cliente
 *
 * @returns {{ciudad:string, varias:string[], origen:string}}
 */
function destinoDelHilo(conv, userText) {
  const messages = (conv && conv.messages) || [];
  const enEsteTurno = ciudadesEn(userText || "");
  if (enEsteTurno.length > 1) {
    return { ciudad: "", varias: enEsteTurno, origen: "varios_en_el_turno" };
  }
  if (enEsteTurno.length === 1) {
    return { ciudad: enEsteTurno[0], varias: [], origen: "este_turno" };
  }

  // 🔑 El paso que faltaba. Ojo: `messages` ya puede traer el mensaje de este
  // turno, así que se mira el último del BOT, que siempre es anterior.
  if (botPidioCiudad(messages)) {
    const cand = ciudadPlausible(userText);
    if (cand) return { ciudad: cand, varias: [], origen: "respuesta_a_la_pregunta" };
  }

  const guardada = (conv && conv.cotizacion && conv.cotizacion.ciudad) || "";
  if (guardada) return { ciudad: guardada, varias: [], origen: "cotizacion_guardada" };

  const delCliente = messages.filter((m) => m && m.role === "user");
  for (let i = delCliente.length - 1; i >= 0; i--) {
    const c = ciudadesEn(String(delCliente[i].content || ""));
    if (c.length === 1) return { ciudad: c[0], varias: [], origen: "historial" };
  }
  return { ciudad: "", varias: [], origen: "no_hay" };
}

/**
 * 🔢 LA CANTIDAD, LEÍDA DE TODO EL HILO Y NO DE UNA VENTANA DE DOS MENSAJES.
 *
 * Se recorre del mensaje más nuevo al más viejo y gana la ÚLTIMA vez que el
 * cliente dijo una cantidad explícitamente. Así "quiero dos" sobrevive a la
 * ciudad, la talla y la dirección, y "mejor uno solo" la corrige de inmediato.
 *
 * @returns {{uds:number, escalar:boolean, explicita:boolean, heredada:boolean, motivo?:string}}
 */
function cantidadDelHilo(conv, userText, previa) {
  const enEsteTurno = resolverCantidad(userText || "");
  if (enEsteTurno.explicita) return enEsteTurno;

  const delCliente = ((conv && conv.messages) || []).filter((m) => m && m.role === "user");
  for (let i = delCliente.length - 1; i >= 0; i--) {
    const r = resolverCantidad(String(delCliente[i].content || ""));
    if (r.explicita) return { ...r, explicita: false, heredada: true };
  }
  return resolverCantidad("", previa);
}

function calcular(ciudad, texto, opciones = {}) {
  // Si en el texto del turno hay más de un destino reconocible, no se cotiza: se
  // pregunta cuál es. Elegir una sería adivinar sobre el número que se cobra.
  const varias = ciudadesEn(texto || "");
  if (varias.length > 1) {
    return {
      ok: false,
      motivo: "varios_destinos",
      destino: { estado: "varios_destinos", ciudad: "", candidatas: varias },
      uds: resolverCantidad(texto || "", opciones.udsPrevias).uds,
    };
  }

  const destino = resolverDestino(ciudad);
  // Quien llama puede pasar la cantidad ya resuelta contra todo el hilo
  // (`cantidadDelHilo`). Si no, se lee del texto de este turno heredando la
  // previa. Se acepta la de afuera para que una escalada por cantidad de 3+ no se
  // pierda cuando el cliente la dijo hace varios mensajes.
  const cantidad =
    opciones.cantidad && Number.isFinite(Number(opciones.cantidad.uds))
      ? opciones.cantidad
      : resolverCantidad(texto || "", opciones.udsPrevias);

  if (destino.estado === "sin_destino") {
    return { ok: false, motivo: "sin_destino", destino, uds: cantidad.uds };
  }
  if (destino.estado === "ambiguo") {
    return { ok: false, motivo: "ambiguo", destino, uds: cantidad.uds };
  }
  if (destino.estado === "dificil_sin_tarifa") {
    return { ok: false, motivo: "dificil_sin_tarifa", destino, uds: cantidad.uds };
  }
  if (cantidad.escalar) {
    return { ok: false, motivo: "cantidad_escalada", destino, uds: 0, detalle: cantidad.motivo };
  }
  // ========================================================================
  // 🔴 `sinPromo2` NO PUEDE TUMBAR LA TARIFA DE UNA UNIDAD
  //
  // LO QUE SE ENCONTRÓ (revisión 26-sep): calcular("Tadó", "uno") devolvía
  // `dificil_sin_promo` y el bot se quedaba sin poder cotizar NADA en Tadó —
  // teniendo el total de una unidad confirmado por el dueño en $93.000.
  //
  // La condición mezclaba dos cosas distintas: `sinPromo2` significa "el envío no
  // se comparte al llevar DOS", no "acá no se vende". Se perdía la venta de una
  // unidad en un destino con tarifa buena y confirmada.
  //
  // ⚠️ Pero el desglose sí es desconocido: cotizar("Tadó",1) devuelve
  // `flete: null` y sin `producto`. Se cotiza el TOTAL y se marca que no hay
  // desglose, porque inventar el envío para que la resta cuadre es justo lo que
  // costó la venta de $158.000 el 22-sep.
  // ========================================================================
  if (destino.estado === "dificil_con_tarifa") {
    if (cantidad.uds > 1) {
      return { ok: false, motivo: "dificil_sin_promo", destino, uds: cantidad.uds };
    }
    const total = Number(destino.totalConfirmado);
    if (!Number.isFinite(total) || total <= 0) {
      return { ok: false, motivo: "sin_total", destino, uds: 1 };
    }
    return {
      ok: true,
      destino,
      ciudad: destino.ciudad,
      banda: "F",
      reconocida: true,
      uds: 1,
      // 🔑 null y no un número inventado. `bloqueDeDatos` prohíbe dar desglose y
      // `validarRespuesta` no autoriza ningún envío suelto en este caso.
      producto: null,
      envio: null,
      desgloseDesconocido: true,
      total,
      ahorro: null,
      // Sin desglose no hay precio de negociación: el margen de este destino no
      // está medido, así que rebajar acá es a ciegas.
      rescate: null,
      dificilAcceso: true,
      sinPromo2: destino.sinPromo2 === true,
      nota: destino.nota || null,
      politica: POLITICA_VERSION,
      creado: Date.now(),
    };
  }

  const uds = cantidad.uds;
  const paraTarifario = destino.ciudadTarifario || destino.ciudad;
  const q = fletes.cotizar(paraTarifario, uds);

  // ⚠️ GUARD: un total nulo NUNCA puede convertirse en un precio.
  // `fletes.fmt(null)` devuelve "$0", así que un total nulo que llegue a un
  // mensaje le diría al cliente que su pedido vale cero.
  if (!q || q.total == null || !Number.isFinite(Number(q.total)) || Number(q.total) <= 0) {
    return { ok: false, motivo: "sin_total", destino, uds };
  }

  // El ahorro del combo se calcula contra comprar dos sueltos, que es la
  // comparación que el cliente puede hacer.
  let ahorro = null;
  if (uds === 2) {
    const una = fletes.cotizar(paraTarifario, 1);
    if (una && Number.isFinite(Number(una.total))) ahorro = una.total * 2 - q.total;
  }

  return {
    ok: true,
    destino,
    ciudad: destino.ciudad,
    banda: q.banda,
    reconocida: q.reconocida === true,
    uds,
    producto: q.producto,
    envio: q.flete,
    total: q.total,
    ahorro,
    // El rescate es el precio de negociación YA APROBADO para 2 unidades. Para 1
    // unidad el tope aprobado es $3.000 y se calcula aparte: no hay "precio de
    // rescate" de una unidad en la política vigente.
    rescate: uds === 2 ? q.rescate || null : q.total - TOPE_DESCUENTO_1_UNIDAD,
    politica: POLITICA_VERSION,
    creado: Date.now(),
  };
}

// ---------------------------------------------------------------------------
// ETAPA 4 — EL BLOQUE PARA EL MODELO
//
// Se genera en CÓDIGO. El modelo no calcula: recibe los números ya resueltos y
// su trabajo es la explicación comercial.
// ---------------------------------------------------------------------------
const fmt = fletes.fmt;

/** La línea de precio, escrita por el código. Es la que debería salir tal cual. */
function lineaDePrecio(cot) {
  if (!cot || !cot.ok) return "";
  // Difícil acceso: hay total confirmado pero NO hay desglose. Se dice el total y
  // nada más — inventar el envío para que la resta cuadre es lo que costó la
  // venta de $158.000 el 22-sep.
  if (cot.desgloseDesconocido) {
    return `Te queda en ${fmt(cot.total)} en total puesto en ${cot.ciudad}, y pagas al recibir 📦`;
  }
  if (cot.uds === 2) {
    return (
      `Dos conjuntos te quedan en ${fmt(cot.total)} en total: ${fmt(cot.producto)} los dos conjuntos ` +
      `+ ${fmt(cot.envio)} de envío a ${cot.ciudad}` +
      (cot.ahorro ? `. Te ahorrás ${fmt(cot.ahorro)} contra llevarlos por separado` : "") +
      `, y pagas todo junto al recibir 📦`
    );
  }
  return (
    `Te queda en ${fmt(cot.total)} en total: ${fmt(cot.producto)} el conjunto ` +
    `+ ${fmt(cot.envio)} de envío a ${cot.ciudad}, y pagas todo junto al recibir 📦`
  );
}

/** El bloque de datos duros que se le inyecta al modelo para ESE turno. */
function bloqueDeDatos(cot, contexto = {}) {
  if (!cot) return "";

  if (!cot.ok) {
    const d = cot.destino || {};
    if (cot.motivo === "sin_destino") {
      return (
        `## PRECIO — TODAVÍA NO HAY DESTINO\n` +
        `⛔ NO des ningún total ni ningún valor de envío: no sabés a dónde va.\n` +
        `✅ SÍ podés decir el precio base del producto: ${fmt(fletes.PRECIO_PRODUCTO)} el conjunto ` +
        `(y ${fmt(fletes.PROMO_2_UNIDADES)} los dos), aclarando que el envío se suma aparte según la ciudad.\n` +
        `→ Preguntá la ciudad para dar el total exacto.`
      );
    }
    if (cot.motivo === "varios_destinos") {
      return (
        `## PRECIO — EL CLIENTE NOMBRÓ VARIOS DESTINOS\n` +
        `Nombró: ${(d.candidatas || []).join(", ")}.\n` +
        `⛔ NO des un total: no se sabe a cuál va el pedido. Preguntá cuál es el destino.\n` +
        `✅ Sí podés decir el precio base: ${fmt(fletes.PRECIO_PRODUCTO)} el conjunto, y que el envío ` +
        `depende de la ciudad.`
      );
    }
    if (cot.motivo === "ambiguo") {
      return (
        `## PRECIO — NOMBRE DE CIUDAD REPETIDO\n` +
        `"${d.ciudad}" existe en: ${(d.preguntarDepartamento || []).join(", ")}.\n` +
        `⛔ NO des ningún número. Preguntá de qué departamento es: el envío cambia mucho.`
      );
    }
    if (cot.motivo === "dificil_sin_tarifa") {
      return (
        `## PRECIO — DESTINO SIN TARIFA MEDIDA\n` +
        `${d.ciudad} es zona de difícil acceso y NO tiene tarifa confirmada.\n` +
        `⛔ NO des NINGÚN número, ni el de pueblos. Decí que confirmás el envío y escribís en un momento.`
      );
    }
    if (cot.motivo === "dificil_sin_promo") {
      return (
        `## PRECIO — DIFÍCIL ACCESO, SIN PROMO DE 2\n` +
        `En ${d.ciudad} el envío NO se comparte al llevar dos. ⛔ No ofrezcas la promo de 2 unidades.\n` +
        `Para una unidad el total confirmado es ${fmt(d.totalConfirmado)}.`
      );
    }
    if (cot.motivo === "cantidad_escalada") {
      return (
        `## PRECIO — CANTIDAD AL POR MAYOR\n` +
        `⛔ NO cotices. El flete de esas cantidades no está medido.\n` +
        `Decí que para esas cantidades hay precio especial y que lo pasás con un asesor.`
      );
    }
    return `## PRECIO — NO SE PUEDE COTIZAR\n⛔ No des números. Escalá al dueño.`;
  }

  // ⚠️ Acá se distingue tarifa reconocida de predeterminada, SIN afirmar que el
  // costo específico esté verificado.
  const aviso = cot.reconocida
    ? ""
    : `\n⚠️ ${cot.ciudad} NO está en el tarifario: este total sale de la tarifa predeterminada y ` +
      `su costo de envío específico no está verificado. Si el cliente pregunta, no prometas plazos ` +
      `de entrega; y si algo no cuadra, pasalo al dueño antes de confirmar.`;

  // ⚠️ Difícil acceso con tarifa: el total está confirmado pero el desglose NO se
  // conoce. Se le prohíbe explícitamente inventar el envío, porque "para que la
  // suma cuadre" es exactamente cómo se perdió la venta de $158.000 el 22-sep.
  if (cot.desgloseDesconocido) {
    return (
      `## PRECIO YA CALCULADO — SOLO EL TOTAL, SIN DESGLOSE\n` +
      `Destino: ${cot.ciudad} (difícil acceso) · cantidad: ${cot.uds}\n` +
      `TOTAL A COBRAR: ${fmt(cot.total)}\n` +
      `\n⛔ NO des desglose: en este destino el envío NO está desglosado y NO se puede calcular.\n` +
      `⛔ NO digas ningún otro valor de dinero, ni el precio del conjunto suelto, ni un envío.\n` +
      `⛔ NO ofrezcas la promo de 2 unidades acá: el envío no se comparte.\n` +
      `✅ Si pide el desglose, decí que en su municipio el envío se cotiza individual y que el ` +
      `total ya incluye todo.` +
      aviso
    );
  }

  return (
    `## PRECIO YA CALCULADO — USÁ ESTOS NÚMEROS TAL CUAL\n` +
    `Destino: ${cot.ciudad} · cantidad: ${cot.uds}\n` +
    `Producto: ${fmt(cot.producto)}\n` +
    `Envío: ${fmt(cot.envio)}\n` +
    `TOTAL A COBRAR: ${fmt(cot.total)}\n` +
    (cot.ahorro ? `Ahorro contra llevar dos sueltos: ${fmt(cot.ahorro)}\n` : "") +
    `\n⛔ NO sumes, NO redondees, NO calcules nada. Estos números ya están validados.\n` +
    `⛔ NO menciones ningún otro valor de dinero que no esté en esta lista.\n` +
    // El precio de negociación se NOMBRA solo cuando ya se cumplió su condición.
    // Antes vivía en una tabla que el modelo leía siempre: ahí podía ofrecerlo de
    // entrada, que es regalar plata a quien iba a comprar igual.
    (contexto.objecionDePrecio && cot.rescate
      ? `\n💬 El cliente YA se quejó del precio, así que podés ofrecer UNA sola vez ` +
        `${fmt(cot.rescate)} como precio final, condicionado a cerrar ahora. ` +
        `No negocies un tercer precio ni encadenes rebajas.`
      : `⛔ NO ofrezcas ni menciones ningún descuento: el cliente no se ha quejado del precio.`) +
    aviso
  );
}

// ---------------------------------------------------------------------------
// ETAPA 5 — VALIDAR LA RESPUESTA ANTES DE QUE SALGA
// ---------------------------------------------------------------------------

// ⚠️ EXTRAER DINERO SIN CONFUNDIRLO CON DIRECCIONES NI TELÉFONOS.
//
// Una dirección colombiana está llena de números ("Cr 20 12328", "Calle 34
// #12-45") y un celular tiene 10 dígitos. Si el validador los toma por precios,
// bloquea mensajes buenos — y un validador que da falsas alarmas se apaga.
//
// Se reconoce dinero por SEÑAL EXPLÍCITA:
//   · con signo:        $83.000 · $ 83000
//   · con "mil":        83 mil · 83mil · $83 mil
//   · miles separados:  83.000 · 155.000  (el punto de millar es señal fuerte)
// Y se descartan los que vienen con marca de dirección o de teléfono.
const RE_DIRECCION_CERCA = /(?:calle|cll|cl|carrera|cra|kra|kr|diagonal|diag|transversal|tv|avenida|av|manzana|mz|casa|apto|apartamento|torre|bloque|interior|lote|km|kil[oó]metro)\s*\.?\s*$/i;

function extraerImportes(texto) {
  const t = String(texto == null ? "" : texto);
  const encontrados = [];

  const agregar = (valor, crudo, indice) => {
    if (!Number.isFinite(valor)) return;
    // Un precio de esta operación vive entre $10.000 y $500.000. Fuera de ese
    // rango es un número que no es dinero de una cotización.
    if (valor < 10000 || valor > 500000) return;
    encontrados.push({ valor, crudo, indice });
  };

  // 1) "83 mil" / "$83 mil" / "83mil"
  for (const m of t.matchAll(/\$?\s?(\d{1,3})\s*mil\b/gi)) {
    agregar(Number(m[1]) * 1000, m[0], m.index);
  }

  // 2) con signo de pesos, con o sin separadores
  for (const m of t.matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+|\d{4,6})/g)) {
    agregar(Number(String(m[1]).replace(/[.,]/g, "")), m[0], m.index);
  }

  // 3) miles con separador, sin signo ("queda en 83.000")
  for (const m of t.matchAll(/(?<![\d.,$])(\d{1,3}(?:[.,]\d{3})+)(?![\d.,])/g)) {
    const antes = t.slice(Math.max(0, m.index - 24), m.index);
    // "Calle 34.000" no existe, pero una dirección puede traer separadores raros.
    if (RE_DIRECCION_CERCA.test(antes)) continue;
    agregar(Number(String(m[1]).replace(/[.,]/g, "")), m[0], m.index);
  }

  // Se quitan duplicados por posición (los patrones se solapan a propósito).
  const vistos = new Set();
  return encontrados.filter((e) => {
    const k = e.indice + ":" + e.valor;
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

/**
 * Los importes autorizados para ESTE turno, CON su significado.
 *
 * 🔑 No es una lista suelta de números: cada uno tiene un rol, y el rescate solo
 * entra si se cumplen sus condiciones. Un validador que solo revisa pertenencia
 * dejaría pasar el precio de rescate ofrecido de entrada, que es exactamente
 * regalar plata a quien iba a comprar igual.
 *
 * @param {object} cot
 * @param {{objecionDePrecio?:boolean}} contexto
 */
function importesAutorizados(cot, contexto = {}) {
  const mapa = new Map();
  const poner = (valor, rol) => {
    if (Number.isFinite(Number(valor)) && Number(valor) > 0) mapa.set(Number(valor), rol);
  };

  // El precio base del producto se puede decir siempre: no depende del destino.
  poner(fletes.PRECIO_PRODUCTO, "precio base del conjunto");
  poner(fletes.PROMO_2_UNIDADES, "precio base de dos conjuntos");

  if (cot && cot.ok) {
    poner(cot.producto, "producto de la cotización");
    poner(cot.envio, "envío de la cotización");
    poner(cot.total, "total de la cotización");
    if (cot.ahorro) poner(cot.ahorro, "ahorro del combo");
    // ⚠️ El rescate SOLO si el cliente ya objetó el precio. Es la condición de
    // la política vigente, y acá es donde se hace cumplir.
    if (contexto.objecionDePrecio && cot.rescate) {
      poner(cot.rescate, "precio de negociación autorizado");
    }
  } else if (cot && cot.motivo === "dificil_con_tarifa" && cot.destino) {
    poner(cot.destino.totalConfirmado, "total confirmado de difícil acceso");
  }

  return mapa;
}

// ============================================================================
// 🔴 VALIDAR EL SIGNIFICADO, NO LA PERTENENCIA (revisión 26-sep)
//
// LO QUE SE ENCONTRÓ: `validarRespuesta` daba ok:true a esto, para Cali:
//
//     "El producto vale $22.100 y el envío $59.900. Total $82.000."
//
// Los tres números son los correctos. Están los tres en el mapa de autorizados.
// Y el mensaje es un disparate: dice que el producto cuesta $22.100 y que el
// envío cuesta $59.900, o sea el envío casi triplicando el producto.
//
// También pasaba esto, sin destino ninguno:
//
//     "Total con envío incluido: $59.900"
//
// $59.900 es el precio base del producto, así que "pertenecía". Pero la frase
// afirma que ESE es el total CON envío, que es falso en todo el país y le dice al
// cliente que el envío es gratis.
//
// 🔑 El mapa de autorizados YA guardaba el rol de cada importe ("producto de la
// cotización", "envío de la cotización"). La validación simplemente no lo usaba:
// preguntaba "¿está este número en la lista?" en vez de "¿está haciendo de lo que
// dice que hace?". Eso es lo que se corrige acá.
// ============================================================================

// Minúsculas y sin tildes CONSERVANDO LA LONGITUD: los índices tienen que seguir
// apuntando al mismo lugar del texto original. `normalize("NFD")` no sirve acá
// porque cambia el largo y desalinea todas las posiciones.
const aplanarIgualLargo = (s) =>
  String(s == null ? "" : s)
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/ñ/g, "n");

// ── ETIQUETAS FUERTES: sustantivos. Nombran el rol sin ambigüedad ──────────
const ETIQUETAS_ROL = [
  { rol: "envio", patron: /envio|flete|domicilio|transportadora|despacho|mensajeria/g },
  {
    rol: "producto",
    patron: /producto|conjuntos?|trajes?|impermeables?|prenda|cada uno|c\/u|precio base/g,
  },
  { rol: "total", patron: /total|todo junto|a pagar/g },
  { rol: "ahorro", patron: /ahorr\w*/g },
  {
    rol: "descuento",
    patron: /descuento|rebaja|precio final|te lo dejo|se lo dejo|ultimo precio|lo dejamos en/g,
  },
];

// ── ETIQUETAS DÉBILES: verbos ─────────────────────────────────────────────
//
// 🔑 "vale", "cuesta" y "queda" NO nombran un rol: lo nombra su sujeto. En "El
// conjunto cuesta $59.900" el rol es PRODUCTO, y el verbo solo está más cerca del
// número. Tomarlos como "total" marcaba en falso una frase perfectamente correcta.
//
// Por eso un sustantivo en la misma ventana SIEMPRE le gana a un verbo, aunque
// quede más lejos. El verbo solo decide cuando no hay ningún sustantivo.
const ETIQUETAS_DEBILES = [
  { rol: "total", patron: /vale|valen|cuesta|cuestan|queda|quedan|sale|salen|pagas|pagarias|pagaria/g },
];

// Después del número, la etiqueta solo "cuenta" si viene pegada por un conector:
// "$22.100 de envío" o "$59.900 el conjunto". Sin esto, "$22.100 y el envío
// $59.900" le colgaría la etiqueta "envío" al primer número, que es del otro.
const RE_CONECTOR_POSTERIOR = /^\s*(?:de|del|el|la|los|las|en|por|para)\s+/;

/**
 * Qué dice el texto que ES cada importe.
 *
 * @returns {Array<{valor:number, crudo:string, indice:number, rol:string|null, etiqueta:string|null}>}
 */
function rolesEnTexto(texto, importes) {
  const plano = aplanarIgualLargo(texto);
  const lista = importes || extraerImportes(texto);

  return lista.map((imp) => {
    const fin = imp.indice + String(imp.crudo).length;

    // ── 1) La etiqueta pegada DESPUÉS del número gana ─────────────────────
    //
    // 🔑 Es la forma normal de decir un desglose en español: "$110.000 los dos
    // conjuntos + $38.000 de envío". Una etiqueta anterior puede pertenecer al
    // número anterior ("...en total: $59.900 el conjunto"), así que la de después
    // —cuando viene pegada por un conector— es la confiable.
    //
    // Condición: entre el número y la etiqueta no puede haber OTRO importe. Si
    // hay dígitos en medio, la etiqueta ya es de otro número.
    const despues = plano.slice(fin, fin + 34);
    const conector = despues.match(RE_CONECTOR_POSTERIOR);
    if (conector) {
      const resto = despues.slice(conector[0].length);
      let post = null;
      for (const { rol, patron } of ETIQUETAS_ROL) {
        patron.lastIndex = 0;
        const m = patron.exec(resto);
        if (!m) continue;
        if (/\d/.test(resto.slice(0, m.index))) continue; // hay otro importe en medio
        const distancia = conector[0].length + m.index;
        if (!post || distancia < post.distancia) post = { rol, etiqueta: m[0], distancia };
      }
      // "$110.000 los dos" — el conector se comió el artículo y queda "dos". En
      // este negocio "los dos" son los dos conjuntos, así que es el PRODUCTO.
      // Sin este caso, la etiqueta anterior ("...en total:") se le colgaba al
      // número equivocado y marcaba en falso el desglose del combo.
      if (!post && /^(?:dos|2)\b/.test(resto) && /^\s*(?:el|la|los|las)\s+/.test(despues)) {
        post = { rol: "producto", etiqueta: "los dos", distancia: conector[0].length };
      }
      if (post) return { ...imp, rol: post.rol, etiqueta: post.etiqueta };
    }

    // ── 2) Si no hay etiqueta posterior, la de antes ───────────────────────
    const antes = plano.slice(Math.max(0, imp.indice - 45), imp.indice);
    const buscarEnAntes = (tablas) => {
      let mejor = null;
      for (const { rol, patron } of tablas) {
        patron.lastIndex = 0;
        let m, ultima = null;
        while ((m = patron.exec(antes)) !== null) ultima = m;
        if (!ultima) continue;
        const distancia = antes.length - (ultima.index + ultima[0].length);
        if (!mejor || distancia < mejor.distancia) mejor = { rol, etiqueta: ultima[0], distancia };
      }
      return mejor;
    };
    // El sustantivo manda sobre el verbo, esté más cerca o más lejos.
    const mejor = buscarEnAntes(ETIQUETAS_ROL) || buscarEnAntes(ETIQUETAS_DEBILES);

    return { ...imp, rol: mejor ? mejor.rol : null, etiqueta: mejor ? mejor.etiqueta : null };
  });
}

/**
 * Qué valores puede tomar cada rol en ESTE turno.
 *
 * Un rol sin valores posibles (por ejemplo "envío" en un destino de difícil
 * acceso, donde el desglose no se conoce) significa que ese rol NO se puede
 * mencionar con ningún número.
 *
 * @returns {Map<string, Set<number>>}
 */
function valoresPorRol(cot, contexto = {}) {
  const mapa = new Map([
    ["producto", new Set([fletes.PRECIO_PRODUCTO, fletes.PROMO_2_UNIDADES])],
    ["envio", new Set()],
    ["total", new Set()],
    ["ahorro", new Set()],
    ["descuento", new Set()],
  ]);
  if (!cot || !cot.ok) return mapa;

  if (Number.isFinite(Number(cot.producto))) mapa.get("producto").add(Number(cot.producto));
  // ⚠️ Si el desglose no se conoce, `envio` queda VACÍO a propósito: cualquier
  // número presentado como envío en ese destino es inventado.
  if (!cot.desgloseDesconocido && Number.isFinite(Number(cot.envio))) {
    mapa.get("envio").add(Number(cot.envio));
  }
  if (Number.isFinite(Number(cot.total))) mapa.get("total").add(Number(cot.total));
  if (Number.isFinite(Number(cot.ahorro)) && cot.ahorro) mapa.get("ahorro").add(Number(cot.ahorro));
  if (contexto.objecionDePrecio && cot.rescate) {
    mapa.get("descuento").add(Number(cot.rescate));
    // Un precio de negociación también se dice como total ("te queda en X").
    mapa.get("total").add(Number(cot.rescate));
  }
  return mapa;
}

const NOMBRE_ROL = {
  envio: "el envío",
  producto: "el producto",
  total: "el total",
  ahorro: "el ahorro",
  descuento: "el descuento",
};

/**
 * Revisa el mensaje que produjo el modelo ANTES de enviarlo.
 *
 * Comprueba cuatro cosas distintas:
 *   1. que todo importe mencionado esté autorizado
 *   2. 🔑 que cada importe esté haciendo DE LO QUE EL TEXTO DICE que hace
 *   3. que las sumas que afirme el texto cuadren (A + B = C)
 *   4. que no aparezca un total ni un envío cuando no hay destino
 *
 * @returns {{ok:boolean, problemas:Array<{tipo:string, detalle:string}>, importes:Array}}
 */
function validarRespuesta(texto, cot, contexto = {}) {
  const problemas = [];
  const importes = rolesEnTexto(texto, extraerImportes(texto));
  const autorizados = importesAutorizados(cot, contexto);
  const porRol = valoresPorRol(cot, contexto);

  // ========================================================================
  // 🔑 LA COMPROBACIÓN DE SIGNIFICADO
  //
  // Acá es donde "El producto vale $22.100 y el envío $59.900" deja de pasar:
  // los dos números existen, pero están intercambiados de rol.
  // ========================================================================
  for (const imp of importes) {
    if (!imp.rol) continue;
    const posibles = porRol.get(imp.rol);
    if (!posibles) continue;

    if (posibles.size === 0) {
      // El rol no tiene ningún valor posible en este turno.
      problemas.push({
        tipo: cot && cot.ok && cot.desgloseDesconocido && imp.rol === "envio"
          ? "desglose_inventado"
          : "rol_sin_valor",
        valor: imp.valor,
        detalle:
          `presenta ${fmt(imp.valor)} como ${NOMBRE_ROL[imp.rol] || imp.rol} ("${imp.etiqueta}") y en ` +
          `este turno no hay ningún valor válido para eso` +
          (cot && cot.ok && cot.desgloseDesconocido
            ? `: en ${cot.ciudad} solo está confirmado el TOTAL (${fmt(cot.total)}), el desglose no se conoce`
            : ""),
      });
      continue;
    }

    if (!posibles.has(imp.valor)) {
      problemas.push({
        tipo: "rol_equivocado",
        valor: imp.valor,
        detalle:
          `dice que ${fmt(imp.valor)} es ${NOMBRE_ROL[imp.rol] || imp.rol} ("${imp.etiqueta}"), y ` +
          `${NOMBRE_ROL[imp.rol] || imp.rol} es ${[...posibles].map((v) => fmt(v)).join(" o ")}`,
      });
    }
  }

  for (const imp of importes) {
    if (!autorizados.has(imp.valor)) {
      problemas.push({
        tipo: "importe_no_autorizado",
        valor: imp.valor,
        detalle:
          `dijo ${fmt(imp.valor)} ("${imp.crudo}") y no es ninguno de los valores validados` +
          (autorizados.size
            ? `: ${[...autorizados.entries()].map(([v, r]) => `${fmt(v)} (${r})`).join(", ")}`
            : " (no hay cotización válida para este turno)"),
      });
    }
  }

  // ========================================================================
  // Sin destino no puede aparecer un total ni un envío. El precio base sí.
  //
  // 🔑 Y acá el rol es decisivo, no el número: "Total con envío incluido:
  // $59.900" usa el precio base del producto, así que por PERTENENCIA pasaba.
  // Lo que está mal no es el número, es lo que afirma que ese número es.
  // ========================================================================
  if (cot && !cot.ok && (cot.motivo === "sin_destino" || cot.motivo === "varios_destinos")) {
    for (const imp of importes) {
      const esPrecioBase = imp.valor === fletes.PRECIO_PRODUCTO || imp.valor === fletes.PROMO_2_UNIDADES;
      const rolProhibido = imp.rol === "total" || imp.rol === "envio";
      if (!esPrecioBase || rolProhibido) {
        problemas.push({
          tipo: "total_sin_destino",
          valor: imp.valor,
          detalle: rolProhibido
            ? `presenta ${fmt(imp.valor)} como ${NOMBRE_ROL[imp.rol]} ("${imp.etiqueta}") sin saber a dónde ` +
              `se despacha: el envío todavía no se puede sumar`
            : `dio ${fmt(imp.valor)} sin saber a dónde se despacha`,
        });
      }
    }
  }

  // Las sumas que el texto afirme tienen que cuadrar. Es lo que falló en Palmira:
  // $59.900 + $23.100 = $83.000, y el mensaje decía $83.100.
  for (const m of String(texto || "").matchAll(
    /(\$?\s?\d{1,3}(?:[.,]\d{3})+)\s*(?:\+|más|mas)\s*(\$?\s?\d{1,3}(?:[.,]\d{3})+)\s*(?:=|son|da|queda en|quedan en|total)\s*(\$?\s?\d{1,3}(?:[.,]\d{3})+)/gi
  )) {
    const n = (s) => Number(String(s).replace(/[^\d]/g, ""));
    const a = n(m[1]), b = n(m[2]), c = n(m[3]);
    if (a + b !== c) {
      problemas.push({
        tipo: "suma_que_no_cierra",
        detalle: `dijo ${fmt(a)} + ${fmt(b)} = ${fmt(c)}, y da ${fmt(a + b)}`,
      });
    }
  }

  return { ok: problemas.length === 0, problemas, importes };
}

// ---------------------------------------------------------------------------
// ETAPA 6 — EL PEDIDO NO PUEDE CONTRADECIR LA COTIZACIÓN
// ---------------------------------------------------------------------------
// ============================================================================
// 🔴 LA CANTIDAD TAMBIÉN TIENE QUE CUADRAR (revisión 26-sep)
//
// LO QUE SE ENCONTRÓ: `verificarPedido` daba ok:true a una cotización de DOS
// conjuntos con un pedido que decía `unidades: 1`, porque el total y la ciudad
// coincidían. Solo comparaba esas dos cosas.
//
// 🔑 Y es un error que se paga dos veces: si el pedido dice una unidad y el
// cliente pagó dos, se despacha UN conjunto contra un recaudo de dos —el cliente
// reclama en la puerta— y además el inventario queda mal contado. Que el total
// coincida no significa que el pedido sea el mismo pedido.
// ============================================================================

/** Las tallas que nombra el pedido. "L y M" son dos; "L" es una. */
function tallasDelPedido(order) {
  const crudo = String((order && order.talla) || "").trim();
  if (!crudo) return [];
  return crudo
    .split(/\s*(?:,|\/|\+|\by\b|\be\b)\s*/i)
    .map((s) => s.trim())
    .filter((s) => /^(xs|s|m|l|xl|2xl|3xl|xxl|xxxl|\d{1,2})$/i.test(s));
}

/**
 * Cuántas unidades dice el pedido.
 *
 * Se respeta el campo `unidades` si viene; si no, se deduce del texto igual que
 * `resumen.unidadesDe`, para no tener dos criterios distintos en el mismo repo.
 *
 * @returns {{uds:number, origen:string}}
 */
function unidadesDelPedido(order) {
  const explicito = Number(order && order.unidades);
  if (Number.isFinite(explicito) && explicito > 0) {
    return { uds: explicito, origen: "el campo unidades del pedido" };
  }
  const tallas = tallasDelPedido(order);
  if (tallas.length > 1) return { uds: tallas.length, origen: `las ${tallas.length} tallas del pedido` };

  // ⚠️ El texto que se mira es el del PRODUCTO, no el de la talla. Una talla
  // "2XL" contiene "2x" y el criterio heredado la contaba como DOS UNIDADES: un
  // cliente que pide una talla 2XL quedaba registrado como una venta de dos.
  const t = String((order && order.producto) || "").toLowerCase();
  if (/\b3\b|tres/.test(t)) return { uds: 3, origen: "el texto del producto" };
  if (/\b2\b|\bdos\b|x2|2x|promo 2|combo/.test(t)) return { uds: 2, origen: "el texto del producto" };
  return { uds: 1, origen: "no lo dice, así que se asume una" };
}

/**
 * @returns {{ok:boolean, problemas:Array, totalEsperado:number|null}}
 */
function verificarPedido(order, cot, contexto = {}) {
  const problemas = [];
  if (!order) return { ok: true, problemas, totalEsperado: null };

  const total = Number(order.total);
  if (!Number.isFinite(total) || total <= 0) {
    problemas.push({ tipo: "total_invalido", detalle: `el pedido trae total ${JSON.stringify(order.total)}` });
    return { ok: false, problemas, totalEsperado: cot && cot.ok ? cot.total : null };
  }

  if (!cot || !cot.ok) {
    problemas.push({
      tipo: "sin_cotizacion_validada",
      detalle:
        `el pedido se guardó por ${fmt(total)} pero no hay una cotización validada para este chat` +
        (cot && cot.motivo ? ` (${cot.motivo})` : ""),
    });
    return { ok: false, problemas, totalEsperado: null };
  }

  // La ciudad del pedido tiene que ser la de la cotización: si el cliente la
  // cambió, hay que re-cotizar, no despachar con el total viejo.
  const mismaCiudad =
    fletes.normalizar(String(order.ciudad || "")) === fletes.normalizar(String(cot.ciudad || ""));
  if (!mismaCiudad) {
    problemas.push({
      tipo: "ciudad_distinta",
      detalle: `el pedido va a "${order.ciudad}" y la cotización era para "${cot.ciudad}"`,
    });
  }

  // ========================================================================
  // La cantidad del pedido tiene que ser la cotizada, y las tallas tienen que
  // poder corresponder a esa cantidad.
  // ========================================================================
  const cantidadPedido = unidadesDelPedido(order);
  if (Number.isFinite(Number(cot.uds)) && cantidadPedido.uds !== Number(cot.uds)) {
    problemas.push({
      tipo: "cantidad_distinta",
      detalle:
        `el pedido es de ${cantidadPedido.uds} ${cantidadPedido.uds === 1 ? "unidad" : "unidades"} ` +
        `(según ${cantidadPedido.origen}) y la cotización validada es de ${cot.uds}, por ${fmt(cot.total)}`,
    });
  }

  // Más tallas que unidades no puede ser. Al revés SÍ: dos conjuntos de la misma
  // talla es un pedido perfectamente normal.
  const tallas = tallasDelPedido(order);
  if (tallas.length > cantidadPedido.uds) {
    problemas.push({
      tipo: "tallas_incoherentes",
      detalle:
        `el pedido nombra ${tallas.length} tallas (${tallas.join(", ")}) pero ` +
        `${cantidadPedido.uds} ${cantidadPedido.uds === 1 ? "unidad" : "unidades"}`,
    });
  }

  // El total aceptado es el de lista, o el de negociación SI estaba autorizado.
  const aceptados = [cot.total];
  if (contexto.objecionDePrecio && cot.rescate) aceptados.push(cot.rescate);
  if (!aceptados.includes(total)) {
    problemas.push({
      tipo: "total_distinto",
      detalle:
        `el pedido dice ${fmt(total)} y la cotización validada es ${fmt(cot.total)}` +
        (cot.rescate
          ? ` (negociación autorizada: ${fmt(cot.rescate)}${contexto.objecionDePrecio ? "" : ", pero el cliente no objetó el precio"})`
          : ""),
    });
  }

  return { ok: problemas.length === 0, problemas, totalEsperado: cot.total };
}

// ============================================================================
// 🔴 NO SE LE CONFIRMA AL CLIENTE UNA VENTA QUE NO SE PUEDE DESPACHAR
//
// LO QUE FALTABA (revisión 26-sep): cuando el total del pedido no cuadraba con la
// cotización, el pedido se guardaba marcado… y al cliente se le contestaba
// "¡Listo, confirmado, te lo despacho!" igual que siempre.
//
// 🔑 Eso es lo peor de los dos mundos: el cliente queda esperando un paquete a un
// precio que no podemos sostener, y el dueño tiene que llamarlo para corregirlo o
// comerse la diferencia. La marca interna no sirve de nada si al cliente ya se le
// prometió.
//
// ⚠️ Y NO se resuelve con silencio: el cliente dio sus datos y merece respuesta.
// Se reemplaza la AFIRMACIÓN de cierre por una respuesta que conserva lo que sí
// es cierto (tenemos sus datos) sin afirmar lo que no (que ya está despachado), y
// el chat pasa a manos del dueño.
// ============================================================================

const RE_AFIRMA_CIERRE =
  /\b(confirmad[oa]|ya (qued[oó]|est[aá] listo|lo despach|te lo despach)|lo despacho|te lo despacho|sale hoy|se despacha|pedido confirmado|queda confirmado|listo tu pedido|tu pedido qued|ya lo tengo listo|en camino)\b/i;

/** ¿La respuesta le AFIRMA al cliente que la venta quedó cerrada? */
function afirmaCierre(texto) {
  return RE_AFIRMA_CIERRE.test(String(texto == null ? "" : texto));
}

/**
 * Lo que se le dice al cliente cuando el pedido quedó en revisión.
 *
 * Conserva la información útil (tenemos los datos), no promete fecha ni despacho,
 * y no lo deja sin respuesta.
 */
function respuestaEnRevision(order) {
  const nombre = String((order && order.nombre) || "").trim().split(/\s+/)[0];
  const ciudad = String((order && order.ciudad) || "").trim();
  return (
    `${nombre ? `¡Gracias ${nombre}! ` : "¡Gracias! "}Ya tengo tus datos anotados ✅ ` +
    `Antes de despachar estoy confirmando el valor final${ciudad ? ` del envío a ${ciudad}` : ""} ` +
    `con el equipo, para no darte un número equivocado. Te escribo en un rato con la confirmación 🙌`
  );
}

// ---------------------------------------------------------------------------
// ¿El cliente objetó el precio? Condición para liberar el precio de negociación.
// ---------------------------------------------------------------------------
const RE_OBJECION_PRECIO =
  /\b(muy caro|est[aá] caro|car[oa]s?|car[ií]simo|descuento|rebaja|m[aá]s barato|no tengo tanto|no me alcanza|mejor precio|[uú]ltimo precio|se puede menos|me lo deja|baja[rs]?|econ[oó]mico)\b/i;

function hayObjecionDePrecio(mensajes) {
  return (mensajes || [])
    .filter((m) => m.role === "user")
    .some((m) => RE_OBJECION_PRECIO.test(String(m.content || "")));
}

module.exports = {
  POLITICA_VERSION,
  TOPE_DESCUENTO_1_UNIDAD,
  resolverDestino,
  resolverConDepartamento,
  resolverCantidad,
  cantidadDelHilo,
  destinoDelHilo,
  ciudadPlausible,
  botPidioCiudad,
  calcular,
  lineaDePrecio,
  bloqueDeDatos,
  ciudadesEn,
  extraerImportes,
  importesAutorizados,
  rolesEnTexto,
  valoresPorRol,
  validarRespuesta,
  verificarPedido,
  unidadesDelPedido,
  tallasDelPedido,
  afirmaCierre,
  respuestaEnRevision,
  hayObjecionDePrecio,
};
