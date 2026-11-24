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
    // ========================================================================
    // 🔴 25-nov: el panel mostraba "$100 restantes de $100 (100%)" fijo. Dos
    // errores de lectura, confirmados contra controller/billing.go de new-api:
    //
    //  1. hard_limit_usd = 100000000 NO es "$100 en micro-unidades": es la marca
    //     que pone NewAPI cuando la clave tiene CUOTA ILIMITADA. Con eso no se
    //     puede saber el saldo: hay que darle a la clave una cuota en el panel
    //     del proveedor (o leer el saldo de la cuenta allá).
    //  2. total_usage viene SIEMPRE en centavos de USD (uso × 100). El código
    //     dividía por un millón todo lo que pasara de 1.000 (o sea, más de $10
    //     gastados), así que el uso daba $0,00.
    //
    // Y el uso es el acumulado de la clave, no el del mes: NewAPI ignora las
    // fechas. Como el límite también es acumulado (restante + usado), la resta
    // da el saldo correcto.
    // ========================================================================
    const hardLimit = Number(dataSub.hard_limit_usd ?? dataSub.system_hard_limit_usd ?? 0);
    const resUsage = await fetch(`${baseUrl}/v1/dashboard/billing/usage`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    let usadoUsd = 0;
    if (resUsage.ok) {
      const dataUsage = await resUsage.json();
      usadoUsd = Number(dataUsage.total_usage || 0) / 100;
    }
    if (hardLimit >= 100000000) {
      return {
        ok: true,
        tipo: "proxy_prepago",
        ilimitada: true,
        proveedor: "VNAI Pro / NewAPI",
        usadoUsd: Number(usadoUsd.toFixed(2)),
        nivel: "amarillo",
        alerta: false,
        actualizadoAt: Date.now(),
      };
    }
    const totalUsd = hardLimit;

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
