// ============================================================================
// ¿CUÁL CHAT TENGO QUE ABRIR?
//
// Con 130 conversaciones al día, revisarlas una por una no es viable. Esto las
// puntúa y dice CUÁL abrir y POR QUÉ.
//
// Las señales no son inventadas: salen de lo medido en el export de 6.317
// conversaciones reales y de las reglas del negocio.
//
// 🔴 ALTA = plata en riesgo AHORA. Si no entrás, se pierde.
// 🟡 MEDIA = oportunidad. Un empujón tuyo cambia el resultado.
// ============================================================================

// Minutos sin respuesta a partir de los cuales un cliente se enfría.
// En contraentrega la decisión es impulsiva: el que espera 15 minutos ya se fue.
const MINUTOS_SIN_RESPUESTA = 12;

// Desconfianza: el 2,5% de los mensajes del export. "¿Es estafa?" es la duda que
// más se resuelve hablando con una persona.
const RE_DESCONFIANZA =
  /\b(estafa|estafad|robo|rob[áa]n|ladr[oó]n|es real|es serio|serios|confiar|conf[íi]o|desconf|verdad que|de verdad|miente|mentira|falso)\b/i;

// Molestia o reclamo: si ya compró y escribe así, es un problema de posventa.
const RE_MOLESTO =
  /\b(reclamo|molest|enojad|bravo|p[eé]simo|malo|horrible|no me ha llegado|no ha llegado|no lleg[oó]|d[oó]nde est[aá] mi|estoy esperando|llevo d[íi]as|demasiado tiempo|cancel[ae]|devolver|devoluci[oó]n|queja)\b/i;

// Objeción de precio: es el momento donde la escalera de descuento aplica, y
// donde el dueño cierra mejor que el bot.
const RE_PRECIO =
  /\b(muy caro|est[aá] caro|caro|carisimo|car[íi]simo|descuento|rebaja|m[aá]s barato|no tengo tanto|no me alcanza|mejor precio|[uú]ltimo precio|promoci[oó]n)\b/i;

// Mayorista: el bot NO cotiza (falta medir el flete de 6 y 13 uds). Siempre humano.
const RE_MAYORISTA = /\b(al por mayor|por mayor|mayorista|docena|revender|reventa|distribu|para mi negocio|cantidad)\b/i;

// Señales de que está listo para comprar: si dio estos datos y no hay pedido,
// se trabó justo antes del cierre. Es la conversación más caliente que existe.
const RE_DATOS_CIERRE = /\b(calle|carrera|cra|diagonal|transversal|avenida|barrio|manzana|casa|apto|apartamento)\b/i;

// ============================================================================
// ✅ ATENDIDO = LE CONTESTAMOS DESPUÉS DE SU ÚLTIMO MENSAJE (25-sep)
//
// DE DÓNDE SALE, en palabras del dueño:
//
//   "hay muchos chats que ya los abrí y yo les respondí... todos los chats que
//    hay que atender por humanos pueden pasar dos días y me siguen saliendo ahí
//    y se ve súper desordenado porque son muchos"
//
// 🔴 LA CAUSA: `c.paused` valía +100 puntos y NUNCA se apagaba solo. O sea que
// en el momento en que el dueño contestaba un chat, ese chat quedaba clavado
// arriba de la lista de urgentes PARA SIEMPRE — precisamente por haberlo
// atendido. La lista se llenaba de trabajo ya hecho y el pendiente de verdad
// quedaba sepultado.
//
// 🔑 EL ARREGLO NO ES UN BOTÓN DE "OCULTAR", ES CAMBIAR LA PREGUNTA. Un chat no
// necesita atención por haber sido escalado alguna vez: la necesita cuando **el
// cliente está esperando respuesta**. Así que se compara la última respuesta
// nuestra contra el último mensaje del cliente:
//
//   · le contestamos después de que escribió  → atendido, fuera de la lista
//   · el cliente escribió después             → vuelve a la lista, solo
//
// Y se apaga solo. No hay que acordarse de limpiar nada.
// ============================================================================

/** Minutos a algo que se lee de un vistazo: "hace 3 h", "hace 2 días". */
function enPalabras(min) {
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(min / 1440);
  return `hace ${d} ${d === 1 ? "día" : "días"}`;
}

/**
 * ¿Cuándo fue la última vez que una PERSONA se hizo cargo de este chat?
 * Toma lo más reciente entre una respuesta escrita desde el panel y un
 * "ya lo atendí" marcado a mano (el dueño resuelve mucho por teléfono).
 */
function atendidoEn(c) {
  const porRespuesta = Number(c && c.ultimaRespuestaHumana) || 0;
  const porMarca = Number(c && c.atendidoAt) || 0;
  // Respaldo para los chats que ya existían antes de que se guardara `por`:
  // se busca en el historial la última respuesta marcada como humana.
  let porHistorial = 0;
  for (const m of (c && c.messages) || []) {
    if (m.por === "humano" && Number(m.at) > porHistorial) porHistorial = Number(m.at);
  }
  return Math.max(porRespuesta, porMarca, porHistorial);
}

/**
 * Evalúa una conversación.
 * @returns {{nivel:"alta"|"media"|null, puntos:number, motivos:string[]}}
 */
function evaluar(tel, c) {
  const msgs = (c && c.messages) || [];
  if (msgs.length === 0) return { nivel: null, puntos: 0, motivos: [] };

  const motivos = [];
  let puntos = 0;

  const ultimo = msgs[msgs.length - 1];
  const delCliente = msgs.filter((m) => m.role === "user");
  const textoCliente = delCliente.map((m) => m.content || "").join(" ");
  const ultimoCliente = delCliente.length ? delCliente[delCliente.length - 1] : null;

  // ---- ✅ ¿YA LO ATENDIMOS DESPUÉS DE SU ÚLTIMO MENSAJE? ----
  const atendido = atendidoEn(c);
  const esperaDesde = ultimoCliente ? Number(ultimoCliente.at) : 0;
  // ⚠️ ESTRICTAMENTE DESPUÉS, y el empate lo gana el cliente. `Date.now()` tiene
  // resolución de milisegundo y ya colisionó antes en este repo (trampa #1: dos
  // pedidos con la misma fecha exacta). Si el mensaje del cliente y nuestra
  // respuesta caen en el mismo milisegundo, no pudimos haber contestado algo que
  // todavía no existía.
  //
  // 🔑 Y LA DIRECCIÓN DEL ERROR NO ES SIMÉTRICA: creer que está atendido cuando
  // no lo está esconde a un cliente que espera, y eso es una venta perdida en
  // silencio. Creer que falta cuando ya se hizo solo cuesta un vistazo.
  const yaAtendido = atendido > 0 && atendido > esperaDesde;

  if (yaAtendido) {
    // Sale de la lista de pendientes, pero NO se borra del mundo: el panel lo
    // muestra en "ya respondiste" para que haya control de lo que se hizo.
    //
    // Y se distingue CÓMO se atendió, porque no es lo mismo: "le contesté" es
    // trabajo hecho y queda escrito en el chat; "lo marqué" puede ser una
    // llamada o un descarte, y de eso no queda rastro en ninguna parte.
    const porMarca = Number(c.atendidoAt) || 0;
    return {
      nivel: null,
      puntos: 0,
      motivos: [],
      atendido: true,
      atendidoAt: atendido,
      atendidoPor: c.atendidoPor || "dueño",
      atendidoComo: porMarca === atendido ? "marca" : "respuesta",
      esperaDesde,
    };
  }

  // ---- 🔴 ALTA ----

  // 1. El bot está callado y el cliente sigue esperando. Acá NADIE le va a
  //    contestar si no entra una persona, así que es lo más urgente que hay.
  //    ⚠️ Antes esto sumaba +100 por el solo hecho de estar pausado, incluso con
  //    la respuesta ya mandada. Ese era el bug que inundaba la lista.
  if (c.paused) {
    puntos += 100;
    motivos.push("el bot está silenciado: espera que contestes vos");
  }

  // 2. El cliente escribió lo último y el bot NO respondió.
  //    Es el peor caso: el cliente está mirando la pantalla.
  if (ultimo.role === "user") {
    const min = Math.floor((Date.now() - ultimo.at) / 60000);
    if (min >= MINUTOS_SIN_RESPUESTA) {
      puntos += 90;
      // "hace 1800 min" no se lee. Con 130 conversaciones al día el dueño
      // necesita entender la antigüedad de un vistazo, no hacer la división.
      motivos.push(`escribió ${enPalabras(min)} y no le respondimos`);
    } else {
      puntos += 25;
      motivos.push("el último mensaje es del cliente");
    }
  }

  // 3. Molestia o reclamo. Si además ya compró, es posventa y urge más.
  if (RE_MOLESTO.test(textoCliente)) {
    puntos += c.compro ? 95 : 70;
    motivos.push(c.compro ? "reclamo de alguien que YA compró" : "cliente molesto o con reclamo");
  }

  // 4. Desconfianza. Se resuelve hablando con una persona.
  if (RE_DESCONFIANZA.test(textoCliente)) {
    puntos += 60;
    motivos.push("desconfía: pregunta si es estafa o si somos serios");
  }

  // 5. Mayorista: el bot no puede cotizar esto.
  if (RE_MAYORISTA.test(textoCliente)) {
    puntos += 65;
    motivos.push("pide precio al por mayor y el bot no lo cotiza");
  }

  // ---- 🟡 MEDIA ----

  // 6. Objeción de precio: acá el dueño cierra mejor que el bot.
  if (RE_PRECIO.test(textoCliente) && !c.compro) {
    puntos += 40;
    motivos.push("objetó el precio");
  }

  // 7. Dio dirección pero no hay pedido: se trabó a un paso del cierre.
  if (!c.compro && RE_DATOS_CIERRE.test(textoCliente)) {
    puntos += 45;
    motivos.push("dio dirección pero no cerró: se trabó antes del final");
  }

  // 8. Conversación larga sin cerrar. Ya invirtió tiempo, está interesado.
  if (!c.compro && delCliente.length >= 6) {
    puntos += 30;
    motivos.push(`${delCliente.length} mensajes y sin pedido`);
  }

  // 9. Pidió que no le escriban: no es urgencia, es para NO tocarlo.
  if (c.noMolestar) {
    return { nivel: null, puntos: 0, motivos: ["pidió no ser contactado"] };
  }

  // Los que ya compraron y no tienen problema no necesitan atención.
  if (c.compro && puntos < 60) return { nivel: null, puntos: 0, motivos: [] };

  const nivel = puntos >= 60 ? "alta" : puntos >= 30 ? "media" : null;
  // `esperaDesde` es la hora del último mensaje del cliente: con eso el panel
  // agrupa por día (hoy / ayer / más viejos) y dice cuánto lleva esperando.
  return { nivel, puntos, motivos, atendido: false, esperaDesde };
}

/** Ordena las conversaciones por urgencia y devuelve las que requieren algo. */
function priorizar(convs) {
  const out = [];
  for (const [tel, c] of Object.entries(convs || {})) {
    if (tel.startsWith("prueba-")) continue;
    const e = evaluar(tel, c);
    if (e.nivel) out.push({ tel, c, ...e });
  }
  return out.sort((a, b) => b.puntos - a.puntos);
}

/**
 * Los chats que una persona ya atendió, del más reciente al más viejo.
 * No son trabajo pendiente: son el registro de lo que se hizo. El dueño lo pidió
 * explícitamente — "para que tenga orden y control de lo que se respondió".
 */
function atendidos(convs) {
  const out = [];
  for (const [tel, c] of Object.entries(convs || {})) {
    if (tel.startsWith("prueba-")) continue;
    const e = evaluar(tel, c);
    if (e.atendido) out.push({ tel, c, ...e });
  }
  return out.sort((a, b) => b.atendidoAt - a.atendidoAt);
}

module.exports = { evaluar, priorizar, atendidos, atendidoEn, MINUTOS_SIN_RESPUESTA };
