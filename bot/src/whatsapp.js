// Envío de mensajes por WhatsApp Cloud API (Meta)
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";

// 🔴 ARREGLADO 21-SEP: antes esta función se COMÍA los errores. Escribía el
// fallo en consola y devolvía undefined, así que si Meta rechazaba la respuesta
// del bot, quien llamaba no se enteraba: ni reintento, ni aviso, ni registro.
// Un bot que "responde" pero cuyos mensajes Meta descarta se ve exactamente
// igual que uno que funciona. Ahora devuelve el resultado.
//
// @returns {{ok:boolean, status:number, body:object, messageId?:string}}
async function sendPayload(payload) {
  if (!TOKEN || !PHONE_ID) {
    console.log(`[SIN CREDENCIALES] Payload:`, JSON.stringify(payload));
    return { ok: false, status: 0, body: { error: "faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID" } };
  }
  try {
    const res = await fetch(`${GRAPH}/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", ...payload })
    });
    const body = await res.json().catch(() => ({}));
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
};
