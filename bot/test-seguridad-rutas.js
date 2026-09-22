// ============================================================================
// GUARDIÁN DE LAS RUTAS  —  node test-seguridad-rutas.js
//
// POR QUÉ EXISTE: el 22-sep el panel se cerró con un PANEL_TOKEN nuevo (PR #94)
// porque el valor viejo había quedado publicado en el repo, que es público. Pero
// dos rutas escritas EN PARALELO en otra rama quedaron con `VERIFY_TOKEN`, y al
// mergearse nadie lo vio: cada PR estaba bien por separado.
//
//   /recuperar-cliente             → manda mensajes de WhatsApp como BikerPro
//   /limpiar-conversaciones-rotas  → con aplicar=1 BORRA datos
//
// Las dos quedaron abiertas a internet con una clave publicada. Y de paso
// aparecieron dos más que nunca habían pedido nada:
//
//   /seguimiento          → filtraba estado interno y nombres de plantillas
//   /seguimiento/correr   → 🔴 MANDA MENSAJES A LOS CLIENTES, sin token
//
// Esto no lo encuentra una revisión de código: hay que mirar TODAS las rutas
// juntas, y ningún PR las muestra juntas. Por eso es un test.
// ============================================================================

const fs = require("fs");
const path = require("path");

const SRC = fs.readFileSync(path.join(__dirname, "src", "server.js"), "utf8").split("\n");

// Rutas que NO llevan token, y la razón. Si agregás una ruta abierta, tiene que
// entrar acá con su justificación: obliga a decidirlo a propósito.
const ABIERTAS_A_PROPOSITO = {
  "GET /": "cartel de 'bot activo'. No devuelve ningún dato.",
  "GET /health": "chequeo de salud. Devuelve {ok:true} y nada más.",
  "POST /webhook":
    "la llama Meta y no puede mandar un token nuestro. No expone datos: solo recibe.",
};

// La única que usa VERIFY_TOKEN a propósito: es el handshake de Meta.
const DEL_WEBHOOK = new Set(["GET /webhook"]);

const rutas = [];
SRC.forEach((linea, i) => {
  const m = linea.match(/app\.(get|post|put|delete)\("([^"]+)"/);
  if (m) rutas.push({ clave: `${m[1].toUpperCase()} ${m[2]}`, linea: i + 1 });
});

/**
 * El cuerpo del manejador: desde su línea hasta la ruta siguiente.
 *
 * ⚠️ Primero miraba solo 7 líneas y eso dio un FALSO NEGATIVO real: una ruta que
 * SÍ tenía el token aparecía como desprotegida porque arriba del chequeo había
 * un comentario largo. Un guardián que se equivoca al revés es peor que no
 * tenerlo: enseña a desconfiar de él.
 */
function cuerpoDe(indice) {
  const desde = rutas[indice].linea - 1;
  const hasta = rutas[indice + 1] ? rutas[indice + 1].linea - 1 : SRC.length;
  return SRC.slice(desde, hasta).join(" ");
}

let fallas = 0;
const mal = (msg) => { console.log(`🔴 ${msg}`); fallas++; };

console.log(`Revisando ${rutas.length} rutas de src/server.js\n`);

for (let idx = 0; idx < rutas.length; idx++) {
  const r = rutas[idx];
  const bloque = cuerpoDe(idx);
  const conPanel = /!==\s*PANEL_TOKEN/.test(bloque);
  const conVerify = /!==\s*VERIFY_TOKEN/.test(bloque);
  const esHandshake = /hub\.verify_token/.test(bloque);

  if (DEL_WEBHOOK.has(r.clave)) {
    if (!esHandshake) mal(`${r.clave} debería usar el handshake de Meta (hub.verify_token)`);
    else console.log(`✅ ${r.clave.padEnd(34)} VERIFY_TOKEN (handshake de Meta, correcto)`);
    continue;
  }

  if (conVerify) {
    mal(
      `${r.clave} (línea ${r.linea}) usa VERIFY_TOKEN.\n` +
        `      Tiene que ser PANEL_TOKEN. VERIFY_TOKEN es solo de Meta, y su valor\n` +
        `      viejo ya está publicado en el repo: deja la ruta abierta a internet.`
    );
    continue;
  }

  if (conPanel) {
    console.log(`✅ ${r.clave.padEnd(34)} PANEL_TOKEN`);
    continue;
  }

  if (ABIERTAS_A_PROPOSITO[r.clave]) {
    console.log(`○  ${r.clave.padEnd(34)} abierta a propósito: ${ABIERTAS_A_PROPOSITO[r.clave]}`);
    continue;
  }

  mal(
    `${r.clave} (línea ${r.linea}) NO PIDE NINGÚN TOKEN y no está en la lista de\n` +
      `      excepciones. Si es a propósito, agregala a ABIERTAS_A_PROPOSITO con la razón.\n` +
      `      Si no, ponele:  if (req.query.token !== PANEL_TOKEN) return res.sendStatus(403);`
  );
}

// El valor quemado no puede volver al código como respaldo del panel.
const fuente = SRC.join("\n");
const quemados = ["bikerpro_verify_2026", "biker_panel_1023979300_2026"];
for (const q of quemados) {
  const enSecretosQuemados = new RegExp(`SECRETOS_QUEMADOS[\\s\\S]{0,200}${q}`).test(fuente);
  const suelto = fuente.includes(q) && !enSecretosQuemados;
  if (suelto) {
    mal(`el valor "${q}" aparece en el código fuera de SECRETOS_QUEMADOS. Ya está publicado: no puede usarse como clave.`);
  }
}

console.log();
if (fallas) {
  console.log(`🔴 ${fallas} problema(s) de seguridad en las rutas.`);
  process.exit(1);
}
console.log(`🟢 Las ${rutas.length} rutas están bien: cada una pide PANEL_TOKEN, o está abierta a propósito y justificada.`);
