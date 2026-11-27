// ============================================================================
// 📣 META CONVERSIONS API (CAPI) PARA CLICK-TO-WHATSAPP — BikerPro
//
// Envía el evento `Purchase` con valor real en COP y `ctwa_clid` cuando un
// pedido queda despachado (guía enviada / conciliada / marcada a mano),
// evitando contar curiosos, duplicados o pedidos anulados antes de despacho.
// ============================================================================
const crypto = require("crypto");

function getConfig() {
  return {
    datasetId: String(process.env.META_CAPI_DATASET_ID || "").trim(),
    accessToken: String(process.env.META_CAPI_ACCESS_TOKEN || "").trim(),
    testEventCode: String(process.env.META_CAPI_TEST_EVENT_CODE || "").trim(),
    version: String(process.env.META_CAPI_VERSION || "v21.0").trim(),
    pageId: String(process.env.META_CAPI_PAGE_ID || "").trim(),
  };
}

function estaActivo() {
  const cfg = getConfig();
  return Boolean(cfg.datasetId && cfg.accessToken);
}

function normalizarTelefonoCo(tel) {
  const s = String(tel == null ? "" : tel).trim();
  if (!s || /^[A-Za-z]{2}\./.test(s)) return "";
  const d = s.replace(/\D/g, "");
  if (/^3\d{9}$/.test(d)) return "57" + d;
  if (/^573\d{9}$/.test(d)) return d;
  return d.length >= 10 ? d : "";
}

function hashSha256(val) {
  const clean = String(val == null ? "" : val).trim().toLowerCase();
  if (!clean) return "";
  return crypto.createHash("sha256").update(clean).digest("hex");
}

function construirPayloadPurchase(pedido, ctwaClid, cfg = getConfig()) {
  if (!pedido || pedido.anulado) return null;
  const clid = String(ctwaClid || pedido.ctwa_clid || "").trim();
  const total = Number(pedido.total);
  if (!clid || !(total > 0)) return null;

  const tel = normalizarTelefonoCo(pedido.celular || pedido.telefono_chat);
  const phHash = hashSha256(tel);
  const eventId = String(pedido.id || pedido.fecha || `${clid}-${total}`);

  const userData = { ctwa_clid: clid };
  if (phHash) userData.ph = [phHash];
  if (cfg.pageId) userData.page_id = cfg.pageId;

  const customData = {
    currency: "COP",
    value: total,
  };
  if (pedido.producto) customData.content_name = String(pedido.producto);
  if (pedido.guia) customData.order_id = String(pedido.guia);

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "business_messaging",
        messaging_channel: "whatsapp",
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (cfg.testEventCode) payload.test_event_code = cfg.testEventCode;
  return payload;
}

async function enviarPurchase(pedido, { ctwaClid, fetchFn = fetch, onResult } = {}) {
  if (!pedido) return { ok: false, skipped: true, reason: "sin_pedido" };
  if (pedido.capiEnviado) return { ok: true, skipped: true, reason: "ya_enviado" };

  const cfg = getConfig();
  if (!cfg.datasetId || !cfg.accessToken) {
    return { ok: false, skipped: true, reason: "sin_config" };
  }

  const payload = construirPayloadPurchase(pedido, ctwaClid, cfg);
  if (!payload) {
    return { ok: false, skipped: true, reason: "sin_ctwa_clid_o_total" };
  }

  const eventId = payload.data[0].event_id;
  const url = `https://graph.facebook.com/${encodeURIComponent(cfg.version)}/${encodeURIComponent(cfg.datasetId)}/events?access_token=${encodeURIComponent(cfg.accessToken)}`;

  try {
    const resp = await fetchFn(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined,
    });
    const body = await resp.json().catch(() => ({}));
    const ok = Boolean(resp.ok && Number(body.events_received || 0) >= 1);
    const out = ok
      ? { ok: true, eventId, eventsReceived: Number(body.events_received || 0) }
      : { ok: false, eventId, status: resp.status, error: body?.error?.message || `HTTP ${resp.status}` };

    if (ok) {
      console.log(`📣 Meta CAPI Purchase enviado: ${pedido.nombre || "?"} · $${pedido.total} COP · event_id=${eventId}`);
    } else {
      console.warn(`⚠️  Meta CAPI Purchase falló (${pedido.nombre || "?"}): ${out.error}`);
    }
    if (typeof onResult === "function") {
      try { await onResult(out); } catch {}
    }
    return out;
  } catch (e) {
    const out = { ok: false, eventId, error: e.message || String(e) };
    console.warn(`⚠️  Meta CAPI Purchase error de red (${pedido.nombre || "?"}): ${out.error}`);
    if (typeof onResult === "function") {
      try { await onResult(out); } catch {}
    }
    return out;
  }
}

module.exports = {
  getConfig,
  estaActivo,
  normalizarTelefonoCo,
  hashSha256,
  construirPayloadPurchase,
  enviarPurchase,
};
