// ============================================================================
// 💸 DATOS DE PAGO: EL BOT NO PUEDE INVENTAR UNA CUENTA
//
// EL CASO (10-nov, clienta Angie). Eligió pago anticipado y el bot le contestó:
//
//     Cuenta de ahorros Bancolombia: 031-000000-00
//     A nombre de: BikerPro
//     Nit: 900.000.000-0
//
// Las tres cosas eran INVENTADAS. Ninguna está en el guion ni en Render. El
// único medio real es UN número que sirve de llave Bre-B, Nequi y Daviplata.
//
// 🔴 Por qué esto es lo más grave que puede decir el bot: un precio mal dicho se
// corrige en el chat. Una transferencia a una cuenta inventada no vuelve: si el
// número existe, la plata le llega a un tercero; si no existe, el cliente queda
// creyendo que pagó, o se va pensando que es una estafa.
//
// Y ya sabemos que una instrucción al modelo no es un candado (el ##ORDER## doble
// del 22-sep, la oficina de Servientrega que no existía). Por eso esto va en
// código, sobre el texto FINAL que lee el cliente:
//
//   · cualquier número de 6+ dígitos en una línea que hable de pagos (cuenta,
//     Nequi, Daviplata, llave, NIT, banco, transferencia…) tiene que ser
//     EXACTAMENTE uno de los configurados en Render. Si no, la línea se borra;
//   · "a nombre de / titular" solo pasa si coincide con PAGO_TITULAR;
//   · si se borró algo, se agregan los datos reales escritos por el código. Si
//     no hay ninguno configurado, se dice que un asesor los comparte y el chat
//     pasa al dueño.
//
// ⚠️ Los números reales NO van en este archivo: el repo es público. Viven en
// Render (PAGO_LLAVE, PAGO_NEQUI, PAGO_BANCOLOMBIA, PAGO_DAVIPLATA, PAGO_BREB).
// ============================================================================

// Palabras que hacen de una línea "una línea de datos de pago".
const RE_LINEA_DE_PAGO =
  /\b(cuenta|ahorros?|corriente|nit|nequi|daviplata|dale|bre-?b|llave|bancolombia|davivienda|bbva|banco|transfer\w*|consign\w*|titular|a nombre de|pagos? anticipados?|numero para (el )?pago)\b/;

// Un número "de cuenta": 6 o más dígitos, con separadores - . o espacio en el
// medio. No toma montos: los que van pegados a "$" se descartan aparte.
const RE_NUMERO = /(\$\s?)?\d(?:[\d.\- ]*\d)?/g;

function plano(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function soloDigitos(s) {
  return String(s || "").replace(/\D/g, "");
}

/** Los medios de pago configurados en Render, en el orden en que se muestran. */
function mediosConfigurados(env = process.env) {
  const m = [];
  const v = (k) => String(env[k] || "").trim();
  if (v("PAGO_LLAVE")) m.push({ etiqueta: "Llave Bre-B, Nequi o Daviplata (es el mismo número)", valor: v("PAGO_LLAVE") });
  if (v("PAGO_NEQUI")) m.push({ etiqueta: "Nequi", valor: v("PAGO_NEQUI") });
  if (v("PAGO_DAVIPLATA")) m.push({ etiqueta: "Daviplata", valor: v("PAGO_DAVIPLATA") });
  if (v("PAGO_BREB")) m.push({ etiqueta: "Llave Bre-B", valor: v("PAGO_BREB") });
  if (v("PAGO_BANCOLOMBIA")) m.push({ etiqueta: "Bancolombia", valor: v("PAGO_BANCOLOMBIA") });
  return m;
}

function titularConfigurado(env = process.env) {
  return String(env.PAGO_TITULAR || "").trim();
}

/** Los dígitos de todos los medios reales. Un número de pago tiene que ser uno de estos. */
function digitosPermitidos(env = process.env) {
  const s = new Set();
  for (const m of mediosConfigurados(env)) {
    const d = soloDigitos(m.valor);
    if (d) s.add(d);
  }
  return s;
}

/** El bloque con los datos reales, escrito por el código. */
function bloqueOficial(env = process.env) {
  const medios = mediosConfigurados(env);
  if (!medios.length) return "";
  const t = titularConfigurado(env);
  return (
    "Estos son los datos para el pago anticipado:\n" +
    medios.map((m) => `• ${m.etiqueta}: *${m.valor}*`).join("\n") +
    (t ? `\n• A nombre de: ${t}` : "") +
    "\n\nCuando hagas el pago, mandame por acá la captura del comprobante y el equipo verifica que haya entrado para despachar tu pedido 🏍️"
  );
}

/**
 * Revisa un texto que va a leer el cliente.
 * Devuelve { ok, problemas: [{linea, motivo}] }.
 */
function revisar(texto, env = process.env) {
  const permitidos = digitosPermitidos(env);
  const titular = plano(titularConfigurado(env));
  const lineas = String(texto || "").split("\n");
  const problemas = [];

  lineas.forEach((linea, i) => {
    const p = plano(linea);
    const previa = i > 0 ? plano(lineas[i - 1]) : "";
    // La línea habla de pagos, o es un número suelto justo debajo de una que sí
    // ("Nequi:\n300 123 4567").
    const esDePago =
      RE_LINEA_DE_PAGO.test(p) ||
      (RE_LINEA_DE_PAGO.test(previa) && /^[\s*•\-_:]*[\d.\- ]{6,}[\s*_]*$/.test(linea));
    if (!esDePago) return;

    for (const m of linea.matchAll(RE_NUMERO)) {
      if (m[1]) continue; // "$110.000" es un monto, no una cuenta
      // "152.000 pesos", "152.000 COP", "152 mil": también es un monto.
      const despues = plano(linea.slice(m.index + m[0].length, m.index + m[0].length + 8));
      if (/^\s*(pesos|cop|mil)\b/.test(despues)) continue;
      const d = soloDigitos(m[0]);
      if (d.length < 6) continue;
      if (!permitidos.has(d)) {
        problemas.push({ linea: linea.trim(), motivo: `número de pago que no está configurado (${d.length} dígitos)` });
        return;
      }
    }

    if (/\b(a nombre de|titular)\b/.test(p)) {
      if (!titular || !p.includes(titular)) {
        problemas.push({ linea: linea.trim(), motivo: "titular de la cuenta que no está configurado" });
        return;
      }
    }
    // "NIT" sin número también es inventado: no hay NIT configurado en ningún lado.
    if (/\bnit\b/.test(p)) {
      problemas.push({ linea: linea.trim(), motivo: "NIT inventado" });
    }
  });

  // Un mismo renglón puede quedar dos veces (número y NIT): una sola entrada.
  const vistos = new Set();
  const unicos = problemas.filter((x) => (vistos.has(x.linea) ? false : vistos.add(x.linea)));
  return { ok: unicos.length === 0, problemas: unicos };
}

/**
 * Si el texto trae datos de pago inventados, los saca y pone los reales.
 * Devuelve { texto, corregido, sinDatosReales, problemas }.
 *   · sinDatosReales = true → no hay ningún medio en Render y el chat tiene que
 *     pasar al dueño, que es quien comparte los datos.
 */
function corregir(texto, env = process.env) {
  const r = revisar(texto, env);
  if (r.ok) return { texto, corregido: false, sinDatosReales: false, problemas: [] };

  const malas = new Set(r.problemas.map((x) => x.linea));
  const limpio = String(texto)
    .split("\n")
    .filter((l) => !malas.has(l.trim()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const oficial = bloqueOficial(env);
  if (oficial) {
    return {
      texto: `${limpio}\n\n${oficial}`.trim(),
      corregido: true,
      sinDatosReales: false,
      problemas: r.problemas,
    };
  }
  return {
    texto: `${limpio}\n\nUn asesor te comparte los datos de pago enseguida por este chat 🙌`.trim(),
    corregido: true,
    sinDatosReales: true,
    problemas: r.problemas,
  };
}

module.exports = {
  mediosConfigurados,
  bloqueOficial,
  revisar,
  corregir,
  digitosPermitidos,
};
