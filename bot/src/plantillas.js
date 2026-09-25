// ============================================================================
// 🔴 QUÉ PLANTILLAS EXISTEN DE VERDAD, Y CUÁLES VAN A FALLAR
//
// DE DÓNDE SALE (25-sep). El dueño: "no llegaron ni los resúmenes".
//
// El cierre del día se mandó DOS noches seguidas por la plantilla
// `cierre_del_dia`. Meta respondió 200 y devolvió un id de mensaje las dos
// veces. El log del Action decía "Envío a WhatsApp: OK". **Y nunca llegó.**
//
// 🔑 ESO ES LO PEOR QUE PUEDE PASAR, y no es una exageración: un envío que
// falla con error se arregla, porque el error dice qué pasa. Un envío que Meta
// ACEPTA y después descarta se ve idéntico a uno que funcionó. Llevábamos dos
// días creyendo que el aviso del cierre funcionaba.
//
// ⚠️ Y NO SE PUEDE ADIVINAR DESDE EL CÓDIGO. Que el bot mande bien el payload
// no dice nada sobre si la plantilla existe, si está aprobada, en qué idioma
// quedó, cuántas variables tiene o en qué categoría la puso Meta. Todo eso vive
// en la cuenta de Meta y hay que ir a preguntarlo.
//
// Este módulo hace exactamente eso: le pide a Meta la lista real y la compara
// contra lo que el bot manda. Separa el diagnóstico en dos preguntas que se
// confundían:
//
//   1. ¿la plantilla está bien configurada?  -> esta comparación
//   2. ¿el mensaje llegó?                    -> los estados de entrega, que
//      llegan por webhook y ahora se guardan en disco (store.fallosDeEntrega)
// ============================================================================

const GRAPH = "https://graph.facebook.com/v21.0";

// ============================================================================
// EL CATÁLOGO DE LO QUE EL BOT MANDA
//
// Se declara acá, en un solo lugar, y a propósito: si alguien agrega un envío
// por plantilla y no lo anota, la prueba `test-plantillas.js` lo caza. Antes
// esta información estaba repartida en server.js, novedades.js y
// seguimiento.js, y no había forma de saber cuántas plantillas usa el bot sin
// leer los tres archivos.
// ============================================================================
function usadas() {
  const idioma = process.env.PLANTILLA_IDIOMA || "es_CO";
  const idiomaSeg = process.env.SEGUIMIENTO_IDIOMA || "es_CO";
  return [
    {
      nombre: process.env.PLANTILLA_CIERRE || "cierre_del_dia",
      idioma,
      variables: 1, // el resumen corto: "18 pedidos, 23 unidades, $1.607.000"
      para: "vos",
      queHace: "el resumen de ventas del día",
      cuando: "todas las noches, si tu ventana de 24h está cerrada",
    },
    {
      nombre: process.env.SEGUIMIENTO_PLANTILLA_2 || "seguimiento_impermeable",
      idioma: idiomaSeg,
      variables: 0,
      para: "el cliente",
      queHace: "el toque de seguimiento de las 44h",
      cuando: "a las 44h de que el cliente dejó de responder",
    },
    {
      nombre: process.env.PLANTILLA_GUIA || "guia_de_envio",
      idioma,
      variables: 0,
      encabezado: "DOCUMENT", // el PDF de la guía va en el encabezado
      para: "el cliente",
      queHace: "mandarle la guía en PDF",
      cuando: "al despachar, si su ventana está cerrada",
    },
    {
      nombre: process.env.PLANTILLA_NOVEDAD_DIRECCION || "novedad_direccion",
      idioma,
      variables: 0,
      para: "el cliente",
      queHace: "avisar que la dirección está mal",
      cuando: "cuando la transportadora reporta la novedad",
    },
    {
      nombre: process.env.PLANTILLA_NOVEDAD_AUSENTE || "novedad_ausente",
      idioma,
      variables: 0,
      para: "el cliente",
      queHace: "avisar que no estaba para recibir",
      cuando: "cuando la transportadora reporta la novedad",
    },
    {
      nombre: process.env.PLANTILLA_NOVEDAD_OFICINA || "novedad_oficina",
      idioma,
      variables: 2, // en qué oficina, y hasta cuándo
      para: "el cliente",
      queHace: "avisar que lo reclame en una oficina",
      cuando: "cuando la transportadora reporta la novedad",
    },
  ];
}

/**
 * Cuántas variables {{n}} tiene el cuerpo de una plantilla de Meta.
 * Se cuenta el número MÁS ALTO, no cuántas veces aparecen: una plantilla que
 * usa {{1}} dos veces necesita un solo parámetro.
 */
function variablesDelCuerpo(componentes) {
  const cuerpo = (componentes || []).find((c) => String(c.type).toUpperCase() === "BODY");
  if (!cuerpo || !cuerpo.text) return 0;
  const nums = [...String(cuerpo.text).matchAll(/\{\{\s*(\d+)\s*\}\}/g)].map((m) => Number(m[1]));
  return nums.length ? Math.max(...nums) : 0;
}

/** El tipo de encabezado de una plantilla de Meta, o null si no tiene. */
function encabezadoDe(componentes) {
  const h = (componentes || []).find((c) => String(c.type).toUpperCase() === "HEADER");
  if (!h) return null;
  return String(h.format || h.type || "").toUpperCase() || null;
}

// ============================================================================
// LA COMPARACIÓN — es pura, sin red, para poder probarla
// ============================================================================
/**
 * @param {Array} esperadas  lo que el bot manda (usadas())
 * @param {Array} deMeta     lo que devolvió la API de Meta
 * @returns {Array} un veredicto por plantilla
 */
function comparar(esperadas, deMeta) {
  const porNombre = new Map();
  for (const t of deMeta || []) {
    // Una misma plantilla puede existir en varios idiomas: se guardan todas.
    const lista = porNombre.get(t.name) || [];
    lista.push(t);
    porNombre.set(t.name, lista);
  }

  return (esperadas || []).map((e) => {
    const base = {
      nombre: e.nombre,
      para: e.para,
      queHace: e.queHace,
      cuando: e.cuando,
      esperaIdioma: e.idioma,
      esperaVariables: e.variables,
    };
    const versiones = porNombre.get(e.nombre) || [];

    // ---- 1. No existe en la cuenta ----
    if (versiones.length === 0) {
      return {
        ...base,
        estado: "falta",
        nivel: "rojo",
        problema: `No existe ninguna plantilla llamada "${e.nombre}" en la cuenta.`,
        arreglo:
          `Crearla en Meta (WhatsApp Manager → Plantillas de mensajes) con el nombre exacto ` +
          `"${e.nombre}", idioma Spanish (COL) y ${
            e.variables === 0 ? "SIN variables" : `${e.variables} variable(s) {{1}}${e.variables > 1 ? "…{{2}}" : ""}`
          }. O apuntar el bot a la que ya exista con una variable de entorno.`,
      };
    }

    // ---- 2. Existe, pero no en el idioma que el bot pide ----
    const enIdioma = versiones.find((v) => v.language === e.idioma);
    if (!enIdioma) {
      const otros = versiones.map((v) => v.language).join(", ");
      return {
        ...base,
        estado: "idioma",
        nivel: "rojo",
        idiomasQueHay: versiones.map((v) => v.language),
        problema:
          `La plantilla existe en ${otros}, pero el bot la pide en "${e.idioma}" y Meta ` +
          `RECHAZA el envío si el idioma no coincide exactamente.`,
        arreglo:
          `O crear la versión en ${e.idioma}, o poner el idioma que ya existe en la variable ` +
          `de entorno correspondiente. Ojo: "es" y "es_CO" NO son lo mismo para Meta.`,
      };
    }

    const estadoMeta = String(enIdioma.status || "").toUpperCase();
    const categoria = String(enIdioma.category || "").toUpperCase();
    const vars = variablesDelCuerpo(enIdioma.components);
    const encabezado = encabezadoDe(enIdioma.components);
    const detalle = {
      ...base,
      estadoEnMeta: estadoMeta,
      categoria,
      idioma: enIdioma.language,
      variablesEnMeta: vars,
      encabezadoEnMeta: encabezado,
    };

    // ---- 3. No está aprobada ----
    if (estadoMeta !== "APPROVED") {
      const porQue = {
        PENDING: "Todavía la está revisando Meta. Puede tardar horas.",
        REJECTED: "Meta la rechazó. Hay que corregir el texto y volver a enviarla.",
        PAUSED:
          "Meta la PAUSÓ por mala calificación (la gente la reportó o la bloqueó). " +
          "Se reactiva sola con el tiempo, pero conviene revisar el texto.",
        DISABLED: "Meta la deshabilitó definitivamente. Hay que crear otra.",
      };
      return {
        ...detalle,
        estado: "no_aprobada",
        nivel: "rojo",
        problema: `Su estado en Meta es ${estadoMeta}, no APPROVED. Los envíos van a fallar.`,
        arreglo: porQue[estadoMeta] || "Revisarla en WhatsApp Manager → Plantillas de mensajes.",
      };
    }

    // ---- 4. La cantidad de variables no coincide ----
    //
    // 🔑 ESTE ES EL QUE MÁS CUESTA ENCONTRAR A MANO. Si la plantilla tiene {{1}}
    // y el bot no manda parámetros, Meta devuelve error 132000. Y al revés
    // también falla. Ya estaba anotado como riesgo para la del seguimiento de
    // 44h: "si la plantilla tiene {{1}}, falla".
    if (vars !== e.variables) {
      return {
        ...detalle,
        estado: "variables",
        nivel: "rojo",
        problema:
          `La plantilla en Meta tiene ${vars} variable(s) y el bot manda ${e.variables}. ` +
          `Meta rechaza el envío por cantidad de parámetros (error 132000).`,
        arreglo:
          vars > e.variables
            ? `Quitarle las variables a la plantilla en Meta y dejar el texto fijo, o hacer que el bot mande ${vars}.`
            : `La plantilla no tiene dónde poner el dato. Agregarle {{1}} en Meta, o dejar el bot sin parámetros.`,
      };
    }

    // ---- 5. El encabezado no es el que hace falta ----
    if (e.encabezado && encabezado !== e.encabezado) {
      return {
        ...detalle,
        estado: "encabezado",
        nivel: "rojo",
        problema:
          `Esta plantilla tiene que llevar el archivo en el encabezado (${e.encabezado}) y en Meta ` +
          `está como ${encabezado || "sin encabezado"}. El PDF de la guía no tiene dónde ir.`,
        arreglo: `Editarla en Meta y poner el encabezado de tipo Documento.`,
      };
    }

    // ---- 6. Aprobada y bien armada, pero de MARKETING ----
    //
    // 🔴 ACÁ ESTÁ LA EXPLICACIÓN MÁS PROBABLE DE "Meta dijo OK y nunca llegó".
    //
    // Las plantillas de MARKETING no se entregan siempre, aunque la API
    // responda 200 con un id de mensaje:
    //   · Meta le pone un tope de plantillas de marketing por persona y por día,
    //     contando las de TODAS las marcas que le escriben, no solo las nuestras
    //   · y si la persona alguna vez tocó "dejar de recibir promociones" de este
    //     negocio, las de marketing se descartan en silencio para siempre
    //
    // Las de UTILITY no tienen ninguno de esos dos límites. Un resumen de ventas
    // para el dueño y el aviso de una guía son utility de manual: no son
    // publicidad, son información de una operación en curso.
    if (categoria === "MARKETING") {
      return {
        ...detalle,
        estado: "marketing",
        nivel: "amarillo",
        problema:
          `Está aprobada y bien armada, pero Meta la categorizó como MARKETING. Las de marketing ` +
          `Meta las puede ACEPTAR (200 y con id) y después NO entregarlas: hay un tope por persona ` +
          `y por día que cuenta todas las marcas, y si la persona alguna vez tocó "dejar de recibir ` +
          `promociones" quedan descartadas en silencio. Es la explicación más probable de que el ` +
          `resumen del cierre no llegara.`,
        arreglo:
          `Cambiarla a UTILITY en WhatsApp Manager → Plantillas de mensajes → editar → Categoría. ` +
          `${e.para === "vos" ? "Un resumen de tus propias ventas" : "El aviso de una entrega en curso"} ` +
          `no es publicidad: es información de una operación en curso, y como UTILITY no tiene tope ` +
          `ni se puede desactivar por promociones.`,
      };
    }

    return {
      ...detalle,
      estado: "ok",
      nivel: "verde",
      problema: null,
      arreglo: null,
    };
  });
}

/** Un resumen de una línea para no tener que leer los seis veredictos. */
function resumir(veredictos) {
  const rojos = veredictos.filter((v) => v.nivel === "rojo");
  const amarillos = veredictos.filter((v) => v.nivel === "amarillo");
  const verdes = veredictos.filter((v) => v.nivel === "verde");
  let titular;
  if (rojos.length) {
    titular =
      `🔴 ${rojos.length} de ${veredictos.length} plantillas NO van a funcionar: ` +
      rojos.map((v) => v.nombre).join(", ");
  } else if (amarillos.length) {
    titular =
      `🟡 Las ${veredictos.length} están aprobadas, pero ${amarillos.length} son de MARKETING y ` +
      `Meta puede aceptarlas sin entregarlas: ` + amarillos.map((v) => v.nombre).join(", ");
  } else {
    titular = `🟢 Las ${veredictos.length} plantillas están aprobadas y bien configuradas.`;
  }
  return {
    titular,
    rojas: rojos.length,
    amarillas: amarillos.length,
    verdes: verdes.length,
    total: veredictos.length,
  };
}

// ============================================================================
// LA CONSULTA A META
// ============================================================================
/**
 * Pide a Meta la lista real de plantillas de la cuenta.
 * @returns {Promise<{ok:boolean, plantillas?:Array, error?:string}>}
 */
async function traerDeMeta() {
  const TOKEN = process.env.WHATSAPP_TOKEN;
  const WABA = process.env.WHATSAPP_WABA_ID;
  if (!TOKEN) return { ok: false, error: "Falta WHATSAPP_TOKEN en Render." };
  if (!WABA) {
    return {
      ok: false,
      error:
        "Falta WHATSAPP_WABA_ID en Render. Es el ID de la cuenta de WhatsApp Business; " +
        "sale en /setup-waba o en Meta → API Setup.",
    };
  }

  const url =
    `${GRAPH}/${WABA}/message_templates` +
    `?fields=name,status,category,language,components&limit=100`;
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const e = body.error || {};
      // El token de mensajes puede no tener permiso para LEER plantillas: es un
      // permiso distinto. Conviene decirlo, porque el síntoma (lista vacía) se
      // confunde con "no hay plantillas".
      return {
        ok: false,
        http: res.status,
        error: `${e.message || "Meta rechazó la consulta"}${e.code ? ` (code ${e.code})` : ""}`,
        pista:
          e.code === 200 || e.code === 190
            ? "El token no tiene permiso para leer plantillas (hace falta whatsapp_business_management) o venció."
            : null,
      };
    }
    return { ok: true, plantillas: body.data || [] };
  } catch (err) {
    return { ok: false, error: `No se pudo hablar con Meta: ${err.message}` };
  }
}

/** El diagnóstico completo, listo para mostrar. */
async function diagnosticar() {
  const esperadas = usadas();
  const r = await traerDeMeta();
  if (!r.ok) {
    return {
      ok: false,
      error: r.error,
      pista: r.pista || null,
      queEsperaElBot: esperadas,
    };
  }
  const veredictos = comparar(esperadas, r.plantillas);
  return {
    ok: true,
    resumen: resumir(veredictos),
    plantillas: veredictos,
    // La lista cruda, por si hay una plantilla en la cuenta que el bot no usa.
    enLaCuenta: r.plantillas.map((t) => ({
      nombre: t.name,
      idioma: t.language,
      estado: t.status,
      categoria: t.category,
      variables: variablesDelCuerpo(t.components),
    })),
  };
}

module.exports = {
  usadas,
  comparar,
  resumir,
  variablesDelCuerpo,
  encabezadoDe,
  traerDeMeta,
  diagnosticar,
};
