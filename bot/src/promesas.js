// ============================================================================
// 🚫 PROMESAS QUE EL BOT NO PUEDE CUMPLIR
//
// DE DÓNDE SALE (26-sep). Cuatro casos reportados:
//
//   · Cambio de teléfono (19:16–19:18): afirmó HABER ACTUALIZADO el pedido y
//     conocer el estado del despacho. El bot no puede hacer ninguna de las dos.
//   · Respondió "¡Así es!" a "Están en Cali, verdad" — la bodega documentada
//     está en Bogotá (Madelena, Calle 62bis #67-12 Sur).
//   · Prometió despacho "hoy mismo" sin comprobar nada.
//   · Garantizó que el impermeable cubre una maleta, sin conocer sus medidas.
//
// 🔑 LO QUE TIENEN EN COMÚN, y es lo que hace que importen más que un error de
// redacción: **el cliente toma decisiones con eso.** Confirma un pedido creyendo
// que el teléfono quedó cambiado, espera el paquete un día que nadie prometió, o
// compra pensando que le cubre una maleta que no le va a cubrir. Después la
// novedad, la queja o la devolución las paga el negocio.
//
// ⛔ Y NO SE ARREGLA PIDIÉNDOLE AL MODELO QUE NO PROMETA. Este proyecto ya
// aprendió que una instrucción no es un candado: se revisa el texto antes de
// enviarlo, igual que con los importes.
//
// ⚠️ ESTO NO REESCRIBE LA RESPUESTA. Devuelve los hallazgos para que quien llama
// decida: reintentar, escalar a un humano, o dejar constancia. Un detector que
// bloquea de más deja al cliente sin respuesta, que es peor.
// ============================================================================

const aplanar = (s) =>
  String(s == null ? "" : s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// La ciudad donde SÍ está la bodega, confirmada por el dueño el 24-sep.
const CIUDAD_BODEGA = "bogota";

const REGLAS = [
  {
    clave: "operacion_ya_hecha",
    // "ya actualicé tu pedido", "ya cambié el teléfono", "ya lo modifiqué"
    patron:
      /\bya (lo |la |le |te )?(actualic|cambi|modific|corregi|corrig|edit|ajust|reemplac|guard)\w*\b|\b(actualizado|cambiado|modificado|corregido) (tu|el|su) (pedido|telefono|numero|direccion|orden)\b/,
    porQue:
      "afirma haber ejecutado una operación sobre el pedido. El bot no puede modificar pedidos: " +
      "eso lo hace el dueño desde el panel.",
    queHacerEnLugar:
      "recoger la solicitud y decir que la pasa para que la ajusten, sin afirmar que ya está hecha.",
  },
  {
    clave: "conoce_el_despacho",
    // "tu pedido ya salió", "va en camino", "está en reparto"
    patron:
      /\b(tu|su|el) (pedido|paquete|envio|guia) (ya )?(sali[oó]|est[aá] en (camino|reparto|ruta)|va en camino|fue despachado|se despach[oó])\b/,
    porQue:
      "afirma conocer el estado del despacho. El bot no consulta la transportadora: no tiene de " +
      "dónde saberlo.",
    queHacerEnLugar: "decir que lo confirma y avisa, o pasarlo al dueño.",
  },
  {
    clave: "promesa_de_fecha",
    // "se despacha hoy mismo", "te llega mañana", "llega en 2 días"
    patron:
      /\b(se despacha|sale|lo despachamos|lo enviamos|te llega|llega|lo tienes)\b[^.]{0,18}\b(hoy|hoy mismo|ma[nñ]ana|esta tarde|en la tarde|en \d+ dias?|el lunes|el martes|el miercoles|el jueves|el viernes|el sabado)\b/,
    porQue:
      "promete una fecha de despacho o de entrega. Eso depende de la transportadora y de la hora " +
      "de corte, y el bot no lo verifica.",
    queHacerEnLugar:
      'hablar en plazos aproximados de la transportadora sin comprometer un día: "normalmente entre 1 y 3 días hábiles".',
  },
  {
    clave: "garantia_de_medida",
    // "te cubre la maleta", "te tapa el bolso", "le sirve a tu moto"
    patron:
      /\b(te |le )?(cubre|tapa|alcanza para|le sirve a|entra)\b[^.]{0,22}\b(maleta|maletas|bolso|morral|top case|baul|cajon|parrilla)\b/,
    porQue:
      "garantiza que cubre un objeto sin conocer sus medidas. El catálogo no tiene esa medición.",
    queHacerEnLugar:
      "describir lo que sí se sabe (tallas, que se pone encima de la ropa) y sugerir una talla más.",
  },
  {
    clave: "ajuste_de_talla",
    // "te queda perfecto", "es tu talla exacta"
    patron: /\b(te queda|le queda) (perfecto|exacto|ideal|justo)\b|\bes tu talla exacta\b/,
    porQue: "garantiza el ajuste sin conocer las medidas del cliente.",
    queHacerEnLugar: 'dar la recomendación que sí está medida: "pedí una talla más de la que usás".',
  },
  {
    clave: "escasez_inventada",
    // "quedan pocos", "últimas unidades", "se agota hoy"
    patron:
      /\b(quedan (pocos|pocas|solo|muy pocos)|ultim(as|os) (unidades|disponibles)|se (agota|agotan|acaba)|stock limitado|ultimo dia)\b/,
    porQue:
      "inventa escasez o vencimiento. El inventario son 5.000 unidades en consignación: es falso, " +
      "y si el cliente vuelve y sigue disponible, queda en evidencia.",
    queHacerEnLugar: "cerrar por el valor del producto, no por una urgencia inventada.",
  },
];

/**
 * ¿La respuesta afirma algo que el bot no puede respaldar?
 *
 * @param {string} texto  la respuesta que el modelo quiere enviar
 * @param {object} [contexto]
 * @param {string} [contexto.ciudadBodega]  por si algún día se muda
 * @returns {{ok:boolean, hallazgos:Array<{clave,porQue,queHacerEnLugar,fragmento}>}}
 */
function revisar(texto, contexto = {}) {
  const t = aplanar(texto);
  const hallazgos = [];
  if (!t) return { ok: true, hallazgos };

  for (const r of REGLAS) {
    const m = t.match(r.patron);
    if (m) {
      hallazgos.push({
        clave: r.clave,
        porQue: r.porQue,
        queHacerEnLugar: r.queHacerEnLugar,
        fragmento: m[0].slice(0, 70),
      });
    }
  }

  // ========================================================================
  // 🏠 DÓNDE ESTÁ LA BODEGA — se revisa aparte porque depende de un dato
  //
  // El caso real fue un "¡Así es!" a "Están en Cali, verdad". Un asentimiento no
  // se puede detectar solo: hace falta mirar qué preguntó el cliente. Pero sí se
  // puede detectar que la respuesta AFIRME una ciudad que no es la de la bodega.
  // ========================================================================
  const bodega = aplanar(contexto.ciudadBodega || CIUDAD_BODEGA);
  const afirmaCiudad = t.match(
    /\b(estamos|quedamos|nuestra bodega esta|la bodega esta|somos) (en|de) ([a-z ]{3,22})\b/
  );
  if (afirmaCiudad) {
    const dicha = aplanar(afirmaCiudad[3]).split(/\s+/)[0];
    if (dicha && dicha.length >= 4 && !bodega.includes(dicha) && !dicha.includes(bodega)) {
      hallazgos.push({
        clave: "ubicacion_equivocada",
        porQue: `dice que estamos en "${dicha}" y la bodega documentada está en ${bodega}.`,
        queHacerEnLugar: `decir la ciudad real de la bodega, o no afirmar ninguna.`,
        fragmento: afirmaCiudad[0].slice(0, 70),
      });
    }
  }

  return { ok: hallazgos.length === 0, hallazgos };
}

// ============================================================================
// 🔧 CORREGIR LA AFIRMACIÓN ANTES DE ENVIARLA (revisión 26-sep)
//
// 🔴 LO QUE LA REVISIÓN SEÑALÓ, y tenía razón: la primera versión de este módulo
// DETECTABA la promesa, MANDABA el mensaje igual, y después pausaba el chat. Eso
// no protege a nadie:
//
//   · el cliente ya leyó "ya cambié tu dirección" y actúa como si fuera cierto
//   · la pausa no le avisa a nadie: `store.setPaused` no manda ninguna alerta
//   · el dueño se enteraba solo si abría ese chat por casualidad
//
// O sea que el daño ocurría completo y el aviso no existía. Detectar sin corregir
// es llevar la cuenta de los accidentes.
//
// 🔑 AHORA SE CORRIGE FRASE POR FRASE, no se descarta el mensaje. La frase que
// afirma algo sin respaldo se reemplaza por la versión que sí se puede sostener, y
// TODO EL RESTO DEL MENSAJE SE CONSERVA: el saludo, el precio, la talla, lo que el
// cliente preguntó. Borrar el mensaje entero perdería información buena para
// arreglar una frase mala.
// ============================================================================

// Con qué se reemplaza cada afirmación. No es "no puedo ayudarte": es lo mismo
// que se quería decir, dicho sin prometer lo que no se puede sostener.
const REEMPLAZOS = {
  operacion_ya_hecha:
    "Ya le paso tu solicitud al equipo para que la ajusten y te confirmo en un momento",
  conoce_el_despacho: "Déjame confirmar cómo va tu envío y te escribo enseguida",
  promesa_de_fecha:
    "La transportadora normalmente entrega entre 1 y 3 días hábiles según la ciudad",
  garantia_de_medida:
    "El conjunto va encima de la ropa y la bolsa es amplia; si querés te confirmo las medidas exactas antes de que lo pidas",
  ajuste_de_talla:
    "Te recomiendo pedir una talla más de la que usás normalmente, porque va encima de la ropa",
  escasez_inventada: "Hay disponibilidad, así que podés pedirlo con calma",
  ubicacion_equivocada: "Nuestra bodega está en Bogotá",
};

/**
 * Parte el texto en frases CONSERVANDO los separadores, para poder reemplazar una
 * sola frase y volver a armar el mensaje igual que estaba.
 */
function enFrases(texto) {
  const partes = String(texto == null ? "" : texto).split(/([.!?\n]+)/);
  const frases = [];
  for (let i = 0; i < partes.length; i += 2) {
    const cuerpo = partes[i];
    const cierre = partes[i + 1] || "";
    if (cuerpo === "" && cierre === "") continue;
    frases.push({ cuerpo, cierre });
  }
  return frases;
}

/**
 * Reemplaza las afirmaciones sin respaldo y devuelve el mensaje corregido.
 *
 * @returns {{texto:string, cambios:Array<{clave,antes,despues}>, ok:boolean}}
 */
function corregir(texto, contexto = {}) {
  const frases = enFrases(texto);
  const cambios = [];
  const bodega = aplanar(contexto.ciudadBodega || CIUDAD_BODEGA);

  const salida = frases.map(({ cuerpo, cierre }) => {
    const plano = aplanar(cuerpo);
    if (!plano) return cuerpo + cierre;

    for (const r of REGLAS) {
      if (!r.patron.test(plano)) continue;
      const reemplazo = REEMPLAZOS[r.clave];
      if (!reemplazo) continue;
      cambios.push({ clave: r.clave, antes: cuerpo.trim(), despues: reemplazo });
      // Se conserva el espacio de adelante para no pegar la frase a la anterior.
      const sangria = cuerpo.match(/^\s*/)[0];
      return sangria + reemplazo + (cierre || ".");
    }

    // La ciudad equivocada se revisa aparte, igual que en `revisar`.
    const afirma = plano.match(
      /\b(estamos|quedamos|nuestra bodega esta|la bodega esta|somos) (en|de) ([a-z ]{3,22})\b/
    );
    if (afirma) {
      const dicha = aplanar(afirma[3]).split(/\s+/)[0];
      if (dicha && dicha.length >= 4 && !bodega.includes(dicha) && !dicha.includes(bodega)) {
        cambios.push({
          clave: "ubicacion_equivocada",
          antes: cuerpo.trim(),
          despues: REEMPLAZOS.ubicacion_equivocada,
        });
        const sangria = cuerpo.match(/^\s*/)[0];
        return sangria + REEMPLAZOS.ubicacion_equivocada + (cierre || ".");
      }
    }

    return cuerpo + cierre;
  });

  return { texto: salida.join("").trim(), cambios, ok: cambios.length === 0 };
}

/** Un resumen de una línea para el log. */
function resumir(resultado) {
  if (!resultado || resultado.ok) return "";
  return resultado.hallazgos.map((h) => `${h.clave} ("${h.fragmento}")`).join(" · ");
}

module.exports = { revisar, corregir, resumir, enFrases, REGLAS, REEMPLAZOS, CIUDAD_BODEGA };
