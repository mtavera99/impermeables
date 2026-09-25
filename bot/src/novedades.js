// ============================================================================
// 📮 NOVEDADES DE ENTREGA
//
// QUÉ RESUELVE: cuando la transportadora no logra entregar (no encontraron la
// dirección, no había nadie, quedó para reclamar en oficina), el dueño lo veía
// en 99 Envíos y le escribía a cada cliente A MANO desde WhatsApp Business.
//
// 🔑 POR QUÉ ESTO VALE PLATA, MEDIDO: la devolución está en 19% y cuesta
// $2.464.218/mes. Bajar 3 puntos son $389.962/mes. Y el archivo madre ya dejó
// dicho que el rechazo bajo (5,0%) NO es suerte: es la gestión diaria de
// novedades del dueño. Si se afloja, sube. Esto es para que no se afloje.
//
// ⚠️ LO QUE CAMBIÓ CON LA API, Y ES EL PROBLEMA DE FONDO: una novedad aparece
// 1 a 3 días después del pedido, así que la ventana de 24h de WhatsApp ya está
// cerrada y NO se puede mandar texto libre. Por eso acá se mira, cliente por
// cliente, si su ventana está abierta:
//   · abierta  -> se le escribe normal
//   · cerrada  -> hace falta una plantilla aprobada, y mientras no exista se
//                 marca como bloqueado EN VEZ de intentar y fallar en silencio
//
// POR QUÉ SE PEGA TEXTO Y NO SOLO UN ARCHIVO: no sabemos todavía si la
// plataforma exporta CSV. Pegar lo que se ve en pantalla funciona igual, hoy,
// sin depender de eso. Si mañana hay export, el mismo parser lo lee.
// ============================================================================

const store = require("./store");

// Las guías son números largos. 8+ dígitos deja fuera los totales y las fechas,
// pero NO los celulares: uno colombiano tiene 10 dígitos y empieza en 3. Esa
// ambigüedad se resuelve más abajo, no acá.
const RE_GUIA = /\b\d{8,}\b/g;

/** Un celular colombiano: 10 dígitos que empiezan en 3. */
function esCelular(n) {
  return /^3\d{9}$/.test(String(n));
}

// ----------------------------------------------------------------------------
// TIPOS DE NOVEDAD
//
// Las palabras salen de cómo las escriben las transportadoras colombianas. NO
// se adivina: si el texto no cae en ninguna familia conocida, se marca como
// desconocida y se escala al dueño. Preferimos no escribir antes que escribir
// una cosa equivocada.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 🔑 UNA PLANTILLA POR TIPO DE NOVEDAD, Y POR QUÉ
//
// La primera versión usaba UNA plantilla genérica ("tu pedido tuvo una novedad,
// responde"). El dueño la vio y señaló el problema real: el cliente recibe algo
// vago y TIENE QUE PREGUNTAR qué pasó. Eso pierde gente justo cuando el paquete
// está a días de devolverse.
//
// Con una plantilla por caso, al cliente le llega exactamente lo que necesita
// saber sin preguntar nada: "está en la oficina de X, tienes hasta el Y".
//
// Los nombres son los que el dueño ya subió a Meta el 22-sep, en Spanish (COL).
// Quedan como variables de entorno por si alguna se renombra o se rechaza.
// ----------------------------------------------------------------------------
const PLANTILLAS = {
  direccion: process.env.PLANTILLA_NOVEDAD_DIRECCION || "novedad_direccion",
  ausente: process.env.PLANTILLA_NOVEDAD_AUSENTE || "novedad_ausente",
  oficina: process.env.PLANTILLA_NOVEDAD_OFICINA || "novedad_oficina",
};

// El texto EXACTO de cada plantilla aprobada, solo para mostrarle al dueño en el
// panel qué va a recibir el cliente antes de enviar. No se manda desde acá: lo
// arma Meta con la plantilla y los parámetros. Si se edita la plantilla en Meta,
// hay que actualizar esto o el panel mostraría algo que no es.
const TEXTO_PLANTILLA = {
  direccion:
    "Salimos a entregarte tu pedido de BikerPro y no logramos dar con la direccion. " +
    "Responde este mensaje con la direccion completa y un punto de referencia, y lo intentamos de nuevo.",
  ausente:
    "Pasamos a entregarte tu pedido de BikerPro y no encontramos a nadie. " +
    "Responde este mensaje y coordinamos un dia y una hora para volver a intentarlo.",
  oficina:
    "Tu pedido de BikerPro esta en la oficina de {{1}} para que lo reclames. " +
    "Tienes hasta {{2}} para recogerlo, despues se devuelve. Responde por aqui si necesitas ayuda.",
};

const TIPOS = [
  {
    clave: "direccion",
    nombre: "No dieron con la dirección",
    señales: [
      "direccion incompleta", "dirección incompleta", "direccion errada", "dirección errada",
      "no reside", "no conocen", "no existe la direccion", "no existe la dirección",
      "direccion no encontrada", "dirección no encontrada", "no ubicada", "sin nomenclatura",
      // 🔴 AGREGADO EL 25-SEP, Y ERA EL MÁS COMÚN DE TODOS.
      //
      // "No se localiza dirección del destinatario" es el texto LITERAL que
      // manda 99 Envíos, y no estaba en la lista: esas novedades caían en
      // "No se reconoció el motivo" y no se le avisaba al cliente.
      //
      // Lo encontré comparando la lista con la pantalla real del dueño. Las
      // señales se escribieron a mano, adivinando cómo redacta la
      // transportadora, y este es el precio de adivinar: el caso más frecuente
      // quedó afuera sin que nada lo avisara.
      //
      // Cubre también "no se localiza el destinatario": en los dos casos lo que
      // desatasca el reparto es pedirle la dirección completa y un punto de
      // referencia, que es justo lo que dice el mensaje de este tipo.
      "no se localiza",
    ],
    // Pide un punto de referencia. Es lo que de verdad desatasca el reparto.
    mensaje: (n) =>
      `Hola${n ? " " + n : ""} 👋 Te escribo de BikerPro. La transportadora salió a entregarte tu ` +
      `pedido pero no logró dar con la dirección 📦\n\n` +
      `¿Me confirmás la dirección completa y algún punto de referencia? Por ejemplo un negocio o ` +
      `una esquina cerca. Con eso lo vuelven a intentar y te llega sin problema 🙌`,
  },
  {
    clave: "ausente",
    nombre: "Fueron y no había nadie",
    señales: [
      "no habia nadie", "no había nadie", "destinatario ausente", "cerrado", "ausente",
      "intento de entrega", "no contesta", "no responde", "no atienden",
    ],
    mensaje: (n) =>
      `Hola${n ? " " + n : ""} 👋 Te escribo de BikerPro. Pasaron a entregarte tu pedido y no ` +
      `encontraron a nadie 📦\n\n` +
      `¿Qué día y en qué horario te queda bien para que vuelvan? O si preferís, decime y vemos si ` +
      `te lo pueden dejar en una oficina cerca 🙌`,
  },
  {
    clave: "oficina",
    nombre: "Quedó para reclamar en oficina",
    señales: ["reclame en oficina", "reclamar en oficina", "en oficina", "para recoger", "disponible para retiro"],
    // 🔴 ESTE MENSAJE NO DICE NI LA TRANSPORTADORA NI LA DIRECCIÓN DE LA OFICINA.
    // El 14-sep el bot le prometió a una clienta "la oficina de Servientrega en
    // Potosí" y Servientrega NO presta recogida en oficina. La clienta lo leyó.
    // Ese dato solo puede venir de la novedad, nunca de nosotros: si no viene,
    // se le pide al cliente que espere y el dueño lo completa a mano.
    mensaje: (n) =>
      `Hola${n ? " " + n : ""} 👋 Te escribo de BikerPro. Tu pedido llegó a tu ciudad y quedó ` +
      `disponible para que lo reclames en una oficina de la transportadora 📦\n\n` +
      `Respondeme por acá y te paso los datos exactos de la oficina y hasta cuándo tenés para ` +
      `reclamarlo 🙌`,
  },
  {
    clave: "rechazado",
    nombre: "El cliente lo rechazó",
    señales: ["rehusado", "rechazado", "no lo quiso", "no acepta", "devolucion", "devolución", "reexpedicion"],
    // No se le escribe: si rechazó, un mensaje automático molesta. Va al dueño.
    mensaje: null,
  },
];

/** Clasifica el texto de una novedad. Nunca adivina: si no reconoce, lo dice. */
function clasificar(texto) {
  const t = String(texto || "").toLowerCase();
  for (const tipo of TIPOS) {
    if (tipo.señales.some((s) => t.includes(s))) return tipo;
  }
  return {
    clave: "desconocida",
    nombre: "No se reconoció el motivo",
    mensaje: null,
  };
}

/**
 * Saca las novedades de un texto pegado o de un CSV.
 *
 * Trabaja LÍNEA POR LÍNEA: en cada una busca un número de guía y toma el resto
 * como el motivo. Sirve igual para un CSV con comas, para un pegado de la
 * pantalla con tabulaciones, o para una lista escrita a mano.
 */
function parsear(texto) {
  const filas = [];
  const vistas = new Set();

  for (const linea of String(texto || "").split(/\r?\n/)) {
    const limpia = linea.trim();
    if (!limpia) continue;

    const candidatos = limpia.match(RE_GUIA);
    if (!candidatos) continue;

    // 🔑 UNA LÍNEA PUEDE TRAER VARIOS NÚMEROS LARGOS: la guía, el celular del
    // cliente, el valor a recaudar. Elegir "el primero" es adivinar, y un
    // celular colombiano tiene 10 dígitos, así que cae en el mismo filtro.
    //
    // Se descartan los que parecen celular (10 dígitos que empiezan en 3)
    // SIEMPRE QUE haya otro candidato. Y quien decide de verdad es revisar(),
    // que se queda con el candidato que coincida con una guía que ya conocemos:
    // eso no es una suposición, es una coincidencia con nuestros datos.
    const noCelulares = candidatos.filter((n) => !esCelular(n));
    const guia = (noCelulares.length ? noCelulares : candidatos)[0];
    if (vistas.has(guia)) continue; // la misma guía dos veces no se procesa dos veces
    vistas.add(guia);

    // El motivo es la línea sin los números, sin separadores de columna.
    let motivo = limpia;
    for (const n of candidatos) motivo = motivo.replace(n, " ");
    motivo = motivo.replace(/[;,\t|]+/g, " ").replace(/\s+/g, " ").trim();

    filas.push({ guia, candidatos, motivo });
  }
  return filas;
}

const VENTANA_24H = 24 * 60 * 60 * 1000;

/**
 * Cruza las novedades con los pedidos y arma el plan de envío.
 *
 * Devuelve, por cada novedad: a quién le corresponde, qué se le diría, si su
 * ventana de 24h está abierta, y si se puede enviar o por qué no.
 */
/** Quita tildes y pasa a minúsculas, para comparar nombres y ciudades. */
const aplanar = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/**
 * Busca el pedido que corresponde a una novedad cuando la GUÍA no cruza.
 *
 * Se exige coincidencia FUERTE y GANADOR ÚNICO:
 *   · al menos 2 palabras del nombre del cliente (con "Mauricio" solo no alcanza:
 *     hay varios, y mandarle la novedad al Mauricio equivocado es peor que nada)
 *   · o 1 palabra del nombre MÁS la ciudad, que es corroboración independiente
 *   · y si dos pedidos empatan en el mejor puntaje, no se sugiere ninguno
 *
 * @returns {{pedido:object, porQue:string}|null}
 */
function buscarPorNombre(motivo, pedidos) {
  const texto = " " + aplanar(motivo).replace(/[^a-z0-9ñ]+/g, " ") + " ";
  const suelta = (p) => new RegExp(`(^|[^a-z0-9])${p}([^a-z0-9]|$)`).test(texto);

  let mejor = null;
  let empate = false;

  for (const p of pedidos) {
    // Un pedido ya despachado y entregado no tiene novedades pendientes, pero no
    // se filtra por eso acá: el estado de entrega no lo sabemos con certeza.
    const palabras = aplanar(p.nombre)
      .split(/[^a-z0-9ñ]+/)
      .filter((w) => w.length >= 4);
    if (!palabras.length) continue;

    const coinciden = palabras.filter(suelta);
    const ciudad = aplanar(p.ciudad).split(/[^a-z0-9ñ]+/).filter((w) => w.length >= 4);
    const ciudadCoincide = ciudad.length > 0 && ciudad.some(suelta);

    // El puntaje pondera la ciudad como una palabra más, pero exige nombre:
    // una ciudad sola coincide con demasiados pedidos.
    if (coinciden.length === 0) continue;
    const fuerte = coinciden.length >= 2 || (coinciden.length >= 1 && ciudadCoincide);
    if (!fuerte) continue;

    const puntos = coinciden.length + (ciudadCoincide ? 1 : 0);
    if (!mejor || puntos > mejor.puntos) {
      mejor = { pedido: p, puntos, coinciden, ciudadCoincide };
      empate = false;
    } else if (puntos === mejor.puntos && mejor.pedido.id !== p.id) {
      empate = true;
    }
  }

  // Empate = no hay ganador claro. Mejor no sugerir que sugerir el equivocado.
  if (!mejor || empate) return null;

  return {
    pedido: mejor.pedido,
    porQue:
      `coincide por nombre (${mejor.coinciden.join(", ")})` +
      (mejor.ciudadCoincide ? ` y por la ciudad (${mejor.pedido.ciudad})` : ""),
  };
}

function revisar(texto, opciones = {}) {
  const ahora = opciones.ahora || Date.now();
  const pedidos = store.todosLosPedidos();
  const guiasEnviadas = store.todasLasGuiasEnviadas();

  const filas = parsear(texto).map((n0) => {
    // 🔑 De todos los números largos de la línea, gana el que COINCIDA con una
    // guía que ya conocemos. Eso no es adivinar por largo ni por posición: es
    // cruzar contra nuestros propios datos, que es la señal más fuerte que hay.
    const conocida = (n0.candidatos || [n0.guia]).find(
      (c) => guiasEnviadas[c] || pedidos.some((p) => String(p.guia || "") === String(c))
    );
    const n = conocida ? { ...n0, guia: conocida } : n0;

    const tipo = clasificar(n.motivo);

    // A quién es. Dos fuentes, por orden de confianza:
    //  1. el registro de la guía que YA le mandamos (ahí quedó su WhatsApp)
    //  2. el pedido que tenga esa guía anotada
    const registro = guiasEnviadas[n.guia] || null;
    const pedido = pedidos.find((p) => String(p.guia || "") === String(n.guia)) || null;

    let destino = registro ? String(registro.telefono) : pedido ? String(pedido.telefono_chat || "") : "";
    let nombre = (registro && registro.nombre) || (pedido && pedido.nombre) || "";
    let porNombre = null;

    // ======================================================================
    // 🕵️ RESCATE POR NOMBRE (25-sep)
    //
    // DE DÓNDE SALE: de tres novedades, dos salieron "No encontré a quién
    // corresponde esta guía". Sus números eran de 8 dígitos (10091647,
    // 10090311) mientras que las guías reales tienen 12 (240061942387): eran
    // números de otra columna del Excel, no la guía.
    //
    // 🔑 Y LA CONSECUENCIA ERA LA PEOR POSIBLE: esos clientes existen, tienen su
    // pedido y su novedad, y el sistema no podía avisarles nada. Una novedad sin
    // avisar termina en devolución, y una devolución cuesta $17.384.
    //
    // Así que si la guía no cruza, se busca por NOMBRE Y CIUDAD contra nuestros
    // propios pedidos. El texto de la novedad trae las dos cosas.
    //
    // ⛔ Y NO SE MANDA SOLO. Se devuelve marcado `probable`, para que el panel lo
    // muestre distinto y el dueño confirme. Mandarle la novedad de un cliente a
    // otro es peor que no mandar nada: el que recibe se confunde y el que
    // esperaba sigue esperando.
    // ======================================================================
    if (!destino) {
      porNombre = buscarPorNombre(n.motivo, pedidos);
      if (porNombre) {
        destino = String(porNombre.pedido.telefono_chat || "");
        nombre = porNombre.pedido.nombre || "";
      }
    }

    const base = {
      ...n,
      tipo: tipo.clave,
      tipoNombre: tipo.nombre,
      destino,
      nombre,
      pedido: pedido || (porNombre && porNombre.pedido) || null,
      // El panel lo usa para pintarlo distinto y pedir confirmación.
      probable: porNombre ? { porQue: porNombre.porQue, guiaDelPedido: porNombre.pedido.guia || null } : null,
    };

    if (!destino) {
      return {
        ...base,
        enviar: false,
        motivoNoEnvio:
          `No encontré a quién corresponde esta guía. Los números que leí en la línea fueron ` +
          `${(n.candidatos || []).join(", ") || "ninguno"}, y ninguno coincide con una guía nuestra. ` +
          `Puede ser un pedido del número anterior, o un despacho que no pasó por el bot.`,
      };
    }

    // ¿Su ventana de 24h está abierta? Sale del último mensaje DEL CLIENTE.
    const conv = store.getConv(destino);
    const ultimo = (conv && conv.ultimoDelCliente) || 0;
    const ventanaAbierta = ultimo > 0 && ahora - ultimo < VENTANA_24H;

    if (!tipo.mensaje) {
      return {
        ...base,
        ventanaAbierta,
        enviar: false,
        motivoNoEnvio:
          tipo.clave === "rechazado"
            ? "El cliente rechazó el pedido: esto lo maneja el dueño, no un mensaje automático"
            : "No se reconoció el motivo, así que no se inventa un mensaje",
      };
    }

    // ------------------------------------------------------------------------
    // VENTANA ABIERTA: texto libre, que es más completo y más humano.
    // ------------------------------------------------------------------------
    if (ventanaAbierta) {
      return { ...base, ventanaAbierta, texto: tipo.mensaje(primerNombre(nombre)), enviar: true };
    }

    // ------------------------------------------------------------------------
    // VENTANA CERRADA: solo pasa una plantilla aprobada, y cada tipo tiene la
    // suya para que el cliente no reciba un mensaje vago.
    // ------------------------------------------------------------------------
    const plantilla = PLANTILLAS[tipo.clave];
    if (!plantilla) {
      return {
        ...base,
        ventanaAbierta,
        enviar: false,
        motivoNoEnvio:
          "Hace más de 24h que no escribe y este tipo de novedad no tiene plantilla configurada",
      };
    }

    // 🔴 La de oficina necesita DÓNDE y HASTA CUÁNDO, y eso NO se puede
    // inventar: es exactamente el error del 14-sep con Servientrega en Potosí.
    // Sale de la novedad, y lo completa el dueño en el panel.
    if (tipo.clave === "oficina") {
      const datos = (opciones.datos && opciones.datos[n.guia]) || {};
      const oficina = String(datos.oficina || "").trim();
      const plazo = String(datos.plazo || "").trim();
      if (!oficina || !plazo) {
        return {
          ...base,
          ventanaAbierta,
          plantilla,
          pidoDatos: ["oficina", "plazo"],
          enviar: false,
          motivoNoEnvio:
            "Falta completar en qué oficina está y hasta cuándo tiene para reclamarlo. " +
            "Esos datos salen de la novedad: el bot no los puede inventar.",
        };
      }
      return {
        ...base,
        ventanaAbierta,
        plantilla,
        parametros: [oficina, plazo],
        texto: TEXTO_PLANTILLA.oficina.replace("{{1}}", oficina).replace("{{2}}", plazo),
        enviar: true,
        porPlantilla: true,
      };
    }

    return {
      ...base,
      ventanaAbierta,
      plantilla,
      parametros: [],
      texto: TEXTO_PLANTILLA[tipo.clave] || tipo.mensaje(primerNombre(nombre)),
      enviar: true,
      porPlantilla: true,
    };
  });

  return {
    filas,
    listas: filas.filter((f) => f.enviar).length,
    bloqueadas: filas.filter((f) => !f.enviar).length,
  };
}

/** "Pedro Epieyu" -> "Pedro". Escribirle con el nombre completo suena a robot. */
function primerNombre(nombre) {
  const p = String(nombre || "").trim().split(/\s+/)[0];
  return p && p.length > 1 ? p : "";
}

module.exports = { parsear, clasificar, revisar, primerNombre, TIPOS, VENTANA_24H, PLANTILLAS, TEXTO_PLANTILLA };
