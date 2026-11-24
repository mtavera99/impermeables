// ============================================================================
// 🧠 MONITOR DE SALDO Y CRÉDITOS DE LA API DE IA
//
// Consulta el balance disponible en proveedores compatibles con NewAPI / OpenAI
// (como VNAI Pro) para mostrar en el panel cuánto saldo queda y alertar
// con tiempo antes de que la cuenta se quede en ceros.
// ============================================================================

const CACHE_MS = 10 * 60 * 1000; // 10 minutos de caché en memoria
let cachedData = null;
let lastFetch = 0;
let fetching = false;

async function consultarServidor() {
  const baseUrl = (process.env.GEMINI_BASE_URL || "").replace(/\/$/, "");
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (!baseUrl || !apiKey || baseUrl.includes("generativelanguage.googleapis.com")) {
    return {
      ok: false,
      tipo: "google_directo",
      mensaje: "Facturación directa de Google AI Studio (tarjeta mensual)",
    };
  }

  try {
    // 1. Consultar límite y cuota total contratada
    const resSub = await fetch(`${baseUrl}/v1/dashboard/billing/subscription`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!resSub.ok) {
      return { ok: false, error: `HTTP ${resSub.status}` };
    }
    const dataSub = await resSub.json();
    const hardLimit = Number(dataSub.hard_limit_usd || dataSub.system_hard_limit_usd || 0);
    // En NewAPI hard_limit_usd suele venir en micro-unidades (100000000 = $100.00 USD)
    const totalUsd = hardLimit > 10000 ? hardLimit / 1000000 : hardLimit;

    // 2. Consultar uso en el mes actual
    const hoy = new Date();
    const pDia = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-01`;
    const uDia = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-28`;
    const resUsage = await fetch(
      `${baseUrl}/v1/dashboard/billing/usage?start_date=${pDia}&end_date=${uDia}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    let usadoUsd = 0;
    if (resUsage.ok) {
      const dataUsage = await resUsage.json();
      const rawUsage = Number(dataUsage.total_usage || 0);
      usadoUsd = rawUsage > 1000 ? rawUsage / 1000000 : rawUsage > 0 ? rawUsage / 100 : 0;
    }

    const restanteUsd = Math.max(0, totalUsd - usadoUsd);
    const porcentaje = totalUsd > 0 ? Math.round((restanteUsd / totalUsd) * 100) : 100;

    // Semáforo:
    // 🟢 verde: > $30
    // 🟡 amarillo: $15 a $30 (comprar próxima API con calma)
    // 🔴 rojo: < $15 (alerta inminente)
    const nivel = restanteUsd <= 15 ? "rojo" : restanteUsd <= 30 ? "amarillo" : "verde";
    const alerta = restanteUsd <= 20;

    return {
      ok: true,
      tipo: "proxy_prepago",
      proveedor: "VNAI Pro / NewAPI",
      totalUsd: Number(totalUsd.toFixed(2)),
      usadoUsd: Number(usadoUsd.toFixed(2)),
      restanteUsd: Number(restanteUsd.toFixed(2)),
      porcentaje,
      nivel,
      alerta,
      actualizadoAt: Date.now(),
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function actualizar() {
  if (fetching) return cachedData;
  fetching = true;
  try {
    const res = await consultarServidor();
    if (res && res.ok) {
      cachedData = res;
      lastFetch = Date.now();
    }
  } finally {
    fetching = false;
  }
  return cachedData;
}

function obtener() {
  // Si nunca se ha consultado o ya expiró el caché, disparar consulta en background
  if (!cachedData || Date.now() - lastFetch > CACHE_MS) {
    actualizar().catch(() => {});
  }
  return cachedData;
}

// Disparar una consulta inicial en arranque
actualizar().catch(() => {});

module.exports = {
  obtener,
  actualizar,
  consultarServidor,
};
