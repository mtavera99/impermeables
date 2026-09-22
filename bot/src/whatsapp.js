// Envío de mensajes por WhatsApp Cloud API (Meta)
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";

// ============================================================================
// 🔴 CLIENTES SIN NÚMERO DE TELÉFONO (BSUID) — 22-sep
//
// QUÉ PASÓ: un cliente escribió desde un anuncio y el bot NO le contestó nunca.
// Medido en /eventos a las 17:11 del 22-sep:
//
//   17:11:24  entrante-sin-remitente  "¡Hola! Quiero más información."
//   17:11:26  envio-rechazado  400  "The parameter to is required."  code 100
//
// El payload de Meta no traía `from` ni `wa_id`. Traía esto:
//   "contacts":[{"profile":{"name":"...","username":"..."},"user_id":"CO.1098…"}]
//   "messages":[{"from_user_id":"CO.1098…", ...}]
//
// ES LA FUNCIÓN "NOMBRE DE USUARIO" DE WHATSAPP. Cuando un cliente adopta un
// username, Meta le OCULTA el teléfono al negocio y lo identifica con un
// Business-Scoped User ID (BSUID): código de país + punto + alfanuméricos.
// Es estable para nosotros y distinto para cada negocio.
//
// ⚠️ EL COMENTARIO QUE HABÍA ACÁ SE EQUIVOCABA. Decía que probablemente eran
// "los envíos de prueba del panel de Meta". No lo eran: el payload trae nombre
// de perfil real, username real, y el texto es el mensaje prellenado DEL
// ANUNCIO ("¡Hola! Quiero más información."). Una prueba de Meta no trae eso.
// Era un cliente real que pagamos y que se quedó sin respuesta.
//
// CÓMO SE LE RESPONDE: el POST /messages acepta `recipient` con el BSUID en
// lugar de `to`. Si por alguna razón Meta rechazara ese campo, se reintenta con
// `to`: preferimos dos intentos a dejar a un cliente sin respuesta.
// ============================================================================

// Formato del BSUID: dos letras de país, punto, hasta 128 alfanuméricos.
const RE_BSUID = /^[A-Za-z]{2}\.[A-Za-z0-9]{1,128}$/;

/** ¿Este identificador es un BSUID (cliente con username) y no un teléfono? */
function esBsuid(id) {
  return RE_BSUID.test(String(id == null ? "" : id).trim());
}

/**
 * Arma la parte del payload que dice A QUIÉN se le manda.
 * Teléfono → `to`. Cliente con username → `recipient`.
 */
function destinatario(id) {
  const s = String(id == null ? "" : id).trim();
  if (esBsuid(s)) return { recipient: s };
  return { to: s.replace(/\D/g, ""), recipient_type: "individual" };
}

// 🔴 ARREGLADO 21-SEP: antes esta función se COMÍA los errores. Escribía el
// fallo en consola y devolvía undefined, así que si Meta rechazaba la respuesta
// del bot, quien llamaba no se enteraba: ni reintento, ni aviso, ni registro.
// Un bot que "responde" pero cuyos mensajes Meta descarta se ve exactamente
// igual que uno que funciona. Ahora devuelve el resultado.
//
// @returns {{ok:boolean, status:number, body:object, messageId?:string}}
/** Un POST a /messages. Separado para poder reintentar con otro destinatario. */
async function postMensaje(cuerpo) {
  const res = await fetch(`${GRAPH}/${PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messaging_product: "whatsapp", ...cuerpo })
  });
  const body = await res.json().catch(() => ({}));
  return { res, body };
}

async function sendPayload(payload) {
  if (!TOKEN || !PHONE_ID) {
    console.log(`[SIN CREDENCIALES] Payload:`, JSON.stringify(payload));
    return { ok: false, status: 0, body: { error: "faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID" } };
  }

  // El destino se saca de `to` y se traduce: teléfono → `to`, BSUID → `recipient`.
  const { to: destino, ...resto } = payload;
  const bsuid = esBsuid(destino);

  try {
    let { res, body } = await postMensaje({ ...destinatario(destino), ...resto });

    // 🛟 RED PARA EL CLIENTE CON USERNAME: si Meta rechaza `recipient` por un
    // error de parámetro, se reintenta poniendo el BSUID en `to`. Las fuentes
    // no coinciden en cuál de los dos campos espera la API, y esto no se puede
    // probar sin un cliente real con username. Dos intentos cuestan una llamada
    // de más; equivocarse cuesta un cliente sin respuesta, que es lo que ya
    // pasó hoy. El log dice cuál funcionó, así queda medido.
    if (!res.ok && bsuid && body?.error?.code === 100) {
      console.warn(
        `↻ Meta rechazó 'recipient' para el BSUID (${body?.error?.message}). Reintento con 'to'.`
      );
      const segundo = await postMensaje({ to: destino, ...resto });
      if (segundo.res.ok) {
        console.log("✅ El BSUID funciona en el campo 'to', no en 'recipient'. Anotarlo.");
      }
      res = segundo.res;
      body = segundo.body;
    }

    if (!res.ok) {
      console.error("Error enviando WhatsApp:", res.status, JSON.stringify(body));
      return { ok: false, status: res.status, body };
    }
    return { ok: true, status: res.status, body, messageId: body?.messages?.[0]?.id };
  } catch (e) {
    console.error("Excepción enviando WhatsApp:", e.message);
    return { ok: false, status: 0, body: { error: e.message } };
  }
}

async function sendText(to, body) {
  return sendPayload({ to, type: "text", text: { preview_url: false, body } });
}

// ============================================================================
// CATÁLOGO Y PRODUCTOS (agregado 21-sep)
//
// Por qué importa: en el export del agente viejo, 3.280 conversaciones (52%)
// mostraban productos del catálogo, y el más enviado fue "PROMO IMPERMEABLE"
// con 3.763 envíos. Las fotos del catálogo traen descripción y precio, así que
// resuelven mejor las dos dudas más frecuentes: talla (17,8%) y color (10,3%).
//
// ⚠️ La API pide `retailer_id` (el SKU que definió el dueño en el catálogo),
// NO el product_id numérico que aparece en el export. Son distintos.
// ============================================================================

const CATALOG_ID = process.env.CATALOG_ID || "";

/** ¿Está configurado el catálogo? Si no, el bot sigue usando fotos sueltas. */
function catalogoActivo() {
  return Boolean(CATALOG_ID);
}

/**
 * Manda el catálogo completo con un botón "Ver catálogo".
 * Es el más simple: no necesita retailer_id de cada producto, solo el del
 * producto que se usa como portada.
 */
async function sendCatalog(to, body, thumbnailRetailerId, footer) {
  const action = { name: "catalog_message" };
  if (thumbnailRetailerId) {
    action.parameters = { thumbnail_product_retailer_id: thumbnailRetailerId };
  }
  return sendPayload({
    to,
    type: "interactive",
    interactive: {
      type: "catalog_message",
      body: { text: body },
      ...(footer ? { footer: { text: footer } } : {}),
      action,
    },
  });
}

/** Manda UN producto del catálogo, con su foto, descripción y precio. */
async function sendProduct(to, body, retailerId, footer) {
  return sendPayload({
    to,
    type: "interactive",
    interactive: {
      type: "product",
      body: { text: body },
      ...(footer ? { footer: { text: footer } } : {}),
      action: { catalog_id: CATALOG_ID, product_retailer_id: retailerId },
    },
  });
}

/**
 * Manda varios productos agrupados (el "carrusel" que usaba el agente viejo
 * con el texto "Explora nuestros productos aquí:").
 * @param {Array<{titulo:string, retailerIds:string[]}>} secciones
 */
async function sendProductList(to, header, body, secciones, footer) {
  return sendPayload({
    to,
    type: "interactive",
    interactive: {
      type: "product_list",
      header: { type: "text", text: header },
      body: { text: body },
      ...(footer ? { footer: { text: footer } } : {}),
      action: {
        catalog_id: CATALOG_ID,
        sections: secciones.map((s) => ({
          title: s.titulo,
          product_items: s.retailerIds.map((id) => ({ product_retailer_id: id })),
        })),
      },
    },
  });
}

async function sendImage(to, link, caption) {
  return sendPayload({ to, type: "image", image: { link, caption } });
}

// ============================================================================
// DOCUMENTOS (agregado 22-sep para mandarle a cada cliente su GUÍA en PDF)
//
// Por qué se SUBE el archivo en vez de mandar un link: las otras funciones de
// acá usan `link` porque las fotos del producto viven en GitHub Pages, que es
// una URL pública y estable. Las guías no: se generan en el momento, son
// distintas para cada cliente y traen dirección y teléfono impresos.
//
// 🔴 Publicarlas en una URL sería exponer los datos personales de los clientes
// en internet. Y el disco de Render es efímero, así que el link se rompería.
//
// Por eso se sube a Meta y se manda por `id`: el archivo queda en su servidor,
// solo accesible con el token, y no hay URL pública que filtre nada.
// ============================================================================

/**
 * Sube un archivo a Meta y devuelve su media_id (sirve 30 días).
 * @param {Buffer} buffer contenido del archivo
 * @param {string} mime tipo, ej. "application/pdf"
 * @param {string} nombre nombre del archivo
 */
async function uploadMedia(buffer, mime, nombre) {
  if (!TOKEN || !PHONE_ID) {
    return { ok: false, status: 0, body: { error: "faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID" } };
  }
  try {
    const form = new FormData();
    form.append("messaging_product", "whatsapp");
    form.append("type", mime);
    form.append("file", new Blob([buffer], { type: mime }), nombre);

    const res = await fetch(`${GRAPH}/${PHONE_ID}/media`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` }, // el boundary lo pone fetch
      body: form,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body?.id) {
      console.error("Error subiendo archivo a Meta:", res.status, JSON.stringify(body));
      return { ok: false, status: res.status, body };
    }
    return { ok: true, status: res.status, body, mediaId: body.id };
  } catch (e) {
    console.error("Excepción subiendo archivo:", e.message);
    return { ok: false, status: 0, body: { error: e.message } };
  }
}

/** Manda un documento ya subido, por su media_id. */
async function sendDocumentById(to, mediaId, filename, caption) {
  return sendPayload({
    to,
    type: "document",
    document: { id: mediaId, filename, ...(caption ? { caption } : {}) },
  });
}

/**
 * Sube un PDF y lo manda, en un paso.
 * @returns {{ok:boolean, status:number, body:object, messageId?:string, mediaId?:string, etapa?:string}}
 */
async function sendPdf(to, buffer, filename, caption) {
  const subida = await uploadMedia(buffer, "application/pdf", filename);
  // Si falla la subida hay que distinguirlo del fallo de envío: son problemas
  // distintos (token/tamaño vs ventana de 24h) y llevan a arreglos distintos.
  if (!subida.ok) return { ...subida, etapa: "subida" };

  const envio = await sendDocumentById(to, subida.mediaId, filename, caption);
  return { ...envio, mediaId: subida.mediaId, etapa: envio.ok ? "enviado" : "envio" };
}

async function sendVideo(to, link, caption) {
  return sendPayload({ to, type: "video", video: { link, caption } });
}

// Plantilla aprobada. Hace falta pasadas las 24 horas desde el ultimo mensaje
// del cliente: ahi Meta ya no acepta texto libre, solo plantillas. Dentro de la
// ventana gratis de 72h del anuncio Click-to-WhatsApp no se cobra. Ver 0-BC.
async function sendTemplate(to, nombre, idioma = "es", componentes) {
  const template = { name: nombre, language: { code: idioma } };
  if (componentes) template.components = componentes;
  return sendPayload({ to, type: "template", template });
}

module.exports = {
  sendText, sendImage, sendVideo, sendTemplate,
  sendCatalog, sendProduct, sendProductList, catalogoActivo, CATALOG_ID,
  uploadMedia, sendDocumentById, sendPdf,
  esBsuid, destinatario,
};
