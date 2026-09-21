/**
 * Análisis del export del Meta Business Agent — 21-sep-2026
 *
 * Lee datos-privados/export/conversations/*.txt (6.317 conversaciones reales) y saca:
 *   1. Inventario: cuántas conversaciones, cuántas vacías, cuántas con anuncio
 *   2. Embudo real: llegó al cierre vs confirmó
 *   3. AUDITORÍA DE PRECIOS: el total que cotizó el agente vs `cotizar()` del bot
 *   4. ATRIBUCIÓN: ad_id → conversaciones → pedidos → cierre por anuncio
 *   5. Objeciones: qué pregunta y qué objeta el cliente, agrupado
 *
 * 🔴 PRIVACIDAD: los archivos de entrada tienen nombres, teléfonos y direcciones
 * de clientes reales. Este script SOLO imprime agregados. Nunca imprime un dato
 * personal. La carpeta datos-privados/ está en .gitignore.
 *
 * ⚠️ El export NO trae timestamps, así que NO se puede hacer serie de tiempo
 * ni casar con un día de pauta. Es una foto acumulada.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * DOS BUGS CORREGIDOS EN ESTE SCRIPT — no repetirlos:
 *
 * 🔴 1. `ad_id` NO SE PUEDE LEER CON JSON.parse.
 *    Los ad_id de Meta (120249427279320390) son > Number.MAX_SAFE_INTEGER
 *    (9007199254740991). JSON.parse los convierte a float y PIERDE PRECISIÓN:
 *    ...390 se vuelve ...380. Eso FUSIONA anuncios distintos en uno.
 *    La primera corrida reportó 51 anuncios; los reales son 54.
 *    → Se extraen con regex, como TEXTO. Nunca como número.
 *
 * 🔴 2. UNA LÍNEA "Nombre:" NO ES UN PEDIDO.
 *    El agente REPITE el bloque de confirmación varias veces en el mismo chat
 *    (597 líneas "Nombre:" en solo 265 conversaciones = 2,25 por chat).
 *    Contar líneas infla las ventas 2,25×.
 *    → Un pedido por conversación: se toma el ÚLTIMO bloque completo.
 *    → Y "llegó al bloque de cierre" ≠ "confirmó". Se miden aparte.
 * ──────────────────────────────────────────────────────────────────────────
 */

const fs = require("fs");
const path = require("path");
const { cotizar } = require("../bot/src/fletes.js");

const DIR = path.join(__dirname, "..", "datos-privados", "export", "conversations");

const fmt = (n) => "$" + Math.round(n).toLocaleString("es-CO").replace(/,/g, ".");
const pct = (a, b) => (b === 0 ? "—" : ((a / b) * 100).toFixed(1) + "%");

// quita markdown de WhatsApp (*negrita*) y espacios sobrantes
const limpiar = (s) => (s || "").replace(/[*_~]/g, "").trim();

// ---------- parseo de una conversación ----------
function parsear(texto) {
  const lineas = texto.split("\n");
  const adIds = [];
  const cliente = [];
  const bloques = []; // todos los bloques de confirmación encontrados
  let actual = null;
  let confirmado = false;

  for (const linea of lineas) {
    if (linea.startsWith("Context:")) {
      // 🔴 regex, NO JSON.parse — ver nota de bugs arriba
      const m = linea.match(/"ad_id"\s*:\s*"?(\d+)"?/);
      if (m) adIds.push(m[1]);
      continue;
    }

    if (linea.startsWith("You:")) {
      const t = linea.slice(4).trim();
      if (t) cliente.push(t);
      // confirmación explícita del cliente, después de ver un bloque
      if (bloques.length > 0 && /^(s[íi]\s*confirmo|s[íi]|si|confirmo|listo|dale|ok|correcto|as[íi] es|todo bien|perfecto)\b/i.test(limpiar(t)))
        confirmado = true;
      continue;
    }

    if (linea.startsWith("Bot:") || linea.startsWith("Business:")) {
      const t = limpiar(linea.replace(/^(Bot|Business):/, ""));
      if (/Confirmemos tu pedido/i.test(t)) actual = {};
      continue;
    }

    if (actual) {
      const l = limpiar(linea);
      let m;
      if ((m = l.match(/^Producto:\s*(.+)$/i))) actual.producto = limpiar(m[1]);
      else if ((m = l.match(/^Ciudad:\s*(.+)$/i))) actual.ciudad = limpiar(m[1]);
      else if ((m = l.match(/^(?:Color \/ talla|Color de la franja|Talla):\s*(.+)$/i)))
        actual.variante = limpiar(m[1]);
      else if ((m = l.match(/^TOTAL[^:]*:\s*\$?\s*([\d.,]+)/i))) {
        actual.total = Number(m[1].replace(/[.,]/g, ""));
        bloques.push(actual);
        actual = null;
      }
    }
  }

  // 🔴 UN pedido por conversación: el último bloque completo
  const pedido = bloques.length ? bloques[bloques.length - 1] : null;
  return { adIds, cliente, pedido, bloques: bloques.length, confirmado };
}

function unidadesDe(pedido) {
  const p = (pedido.producto || "").toLowerCase();
  if (/\b3\b|tres/.test(p)) return 3;
  if (/\b2\b|dos|x2|2x|promo 2|combo|pareja/.test(p)) return 2;
  return 1;
}

const ciudadLimpia = (c) => limpiar((c || "").split(",")[0]);

// ---------- carga ----------
const archivos = fs.readdirSync(DIR).filter((f) => f.endsWith(".txt"));

let convVacias = 0, convConAnuncio = 0, convSinAnuncio = 0;
let totalMsgCliente = 0, llegaronAlCierre = 0, confirmaron = 0, bloquesTotales = 0;
const porAd = new Map();
const pedidos = [];
const objeciones = [];

for (const archivo of archivos) {
  const texto = fs.readFileSync(path.join(DIR, archivo), "utf8");
  const { adIds, cliente, pedido, bloques, confirmado } = parsear(texto);

  const propios = cliente.filter(
    (t) => !/^¡?hola!?,?\s*(quiero más información|me interesa)\.?$/i.test(limpiar(t))
  );
  if (propios.length === 0) convVacias++;
  totalMsgCliente += cliente.length;
  objeciones.push(...propios);
  bloquesTotales += bloques;

  const ad = adIds[0] || null;
  if (ad) convConAnuncio++; else convSinAnuncio++;

  const clave = ad || "(sin anuncio)";
  if (!porAd.has(clave)) porAd.set(clave, { conv: 0, cierre: 0, conf: 0, valor: 0 });
  const acc = porAd.get(clave);
  acc.conv++;

  if (pedido) {
    llegaronAlCierre++;
    acc.cierre++;
    pedido.archivo = archivo;
    pedido.adId = clave;
    pedido.confirmado = confirmado;
    pedidos.push(pedido);
    if (confirmado) { confirmaron++; acc.conf++; acc.valor += pedido.total || 0; }
  }
}

// ==========================================================
console.log("=".repeat(72));
console.log("1. INVENTARIO DEL EXPORT");
console.log("=".repeat(72));
console.log(`conversaciones           ${archivos.length.toLocaleString("es-CO")}`);
console.log(`mensajes del cliente     ${totalMsgCliente.toLocaleString("es-CO")}`);
console.log(`vacías (nunca escribió)  ${convVacias.toLocaleString("es-CO")}  ${pct(convVacias, archivos.length)}`);
console.log(`con ad_id (atribuibles)  ${convConAnuncio.toLocaleString("es-CO")}  ${pct(convConAnuncio, archivos.length)}`);
console.log(`sin ad_id                ${convSinAnuncio.toLocaleString("es-CO")}  ${pct(convSinAnuncio, archivos.length)}`);

console.log("\n" + "=".repeat(72));
console.log("2. EL EMBUDO REAL");
console.log("=".repeat(72));
const conEscritura = archivos.length - convVacias;
console.log(`conversaciones               ${archivos.length.toLocaleString("es-CO")}`);
console.log(`el cliente escribió algo     ${conEscritura.toLocaleString("es-CO")}  ${pct(conEscritura, archivos.length)}`);
console.log(`llegó al bloque de cierre    ${llegaronAlCierre.toLocaleString("es-CO")}  ${pct(llegaronAlCierre, archivos.length)} del total · ${pct(llegaronAlCierre, conEscritura)} de los que escribieron`);
console.log(`confirmó explícitamente      ${confirmaron.toLocaleString("es-CO")}  ${pct(confirmaron, archivos.length)} del total · ${pct(confirmaron, llegaronAlCierre)} de los que llegaron al cierre`);
console.log(`\nbloques de confirmación emitidos: ${bloquesTotales.toLocaleString("es-CO")} para ${llegaronAlCierre} conversaciones`);
console.log(`→ el agente repite el cierre ${(bloquesTotales / Math.max(1, llegaronAlCierre)).toFixed(2)}× por chat`);
console.log(`🔴 contar líneas "Nombre:" habría inflado las ventas ${(bloquesTotales / Math.max(1, llegaronAlCierre)).toFixed(2)}×`);

// ==========================================================
console.log("\n" + "=".repeat(72));
console.log("3. AUDITORÍA DE PRECIOS — lo cotizado vs el tarifario corregido");
console.log("=".repeat(72));

let auditados = 0, correctos = 0, bajos = 0, altos = 0, noReconocida = 0, fugaTotal = 0;
const fugaPorBanda = new Map();
const ejemplos = [];

for (const p of pedidos) {
  if (!p.total || !p.ciudad) continue;
  const uds = unidadesDe(p);
  const c = cotizar(ciudadLimpia(p.ciudad), uds);
  if (!c || !c.reconocida || !c.total) { noReconocida++; continue; }
  auditados++;
  const dif = c.total - p.total;
  if (!fugaPorBanda.has(c.banda)) fugaPorBanda.set(c.banda, { n: 0, fuga: 0, mal: 0 });
  const fb = fugaPorBanda.get(c.banda);
  fb.n++;
  if (dif === 0) correctos++;
  else if (dif > 0) {
    bajos++; fugaTotal += dif; fb.fuga += dif; fb.mal++;
    if (ejemplos.length < 12)
      ejemplos.push({ ciudad: ciudadLimpia(p.ciudad), uds, cotizado: p.total, correcto: c.total, dif, banda: c.banda });
  } else altos++;
}

console.log(`pedidos con ciudad y total  ${auditados + noReconocida}`);
console.log(`ciudad reconocida (auditables) ${auditados}`);
console.log(`ciudad NO reconocida        ${noReconocida}  ${pct(noReconocida, auditados + noReconocida)}`);
console.log(`\n✅ cotizó bien           ${correctos}  ${pct(correctos, auditados)}`);
console.log(`🔴 cotizó POR DEBAJO     ${bajos}  ${pct(bajos, auditados)}`);
console.log(`🟡 cotizó por encima     ${altos}  ${pct(altos, auditados)}`);
console.log(`\n💸 FUGA EN LA MUESTRA AUDITABLE: ${fmt(fugaTotal)} en ${auditados} pedidos`);
if (bajos) console.log(`   promedio por pedido mal cotizado: ${fmt(fugaTotal / bajos)}`);
if (auditados) console.log(`   promedio sobre TODOS los auditados: ${fmt(fugaTotal / auditados)}/pedido`);

console.log("\nbanda | pedidos | mal cotizados | fuga");
for (const [b, v] of [...fugaPorBanda.entries()].sort())
  console.log(`  ${b}   |   ${String(v.n).padStart(4)}  |     ${String(v.mal).padStart(4)}      | ${fmt(v.fuga).padStart(11)}`);

console.log("\nEjemplos (cotizado → correcto):");
for (const e of ejemplos)
  console.log(`  ${e.ciudad.padEnd(18)} ${e.uds}ud  banda ${e.banda}  ${fmt(e.cotizado)} → ${fmt(e.correcto)}   falta ${fmt(e.dif)}`);

// ==========================================================
console.log("\n" + "=".repeat(72));
console.log("4. ATRIBUCIÓN POR ANUNCIO — el dato que no existía");
console.log("=".repeat(72));

const ads = [...porAd.entries()].filter(([k]) => k !== "(sin anuncio)").sort((a, b) => b[1].conv - a[1].conv);
// ⚠️ ATRIBUCIÓN A PRIMER CONTACTO. En el export hay 54 ad_id distintos, pero solo
// 51 aparecen como PRIMER anuncio de un chat. 374 conversaciones traen más de un
// anuncio: son clientes que volvieron entrando por otro creativo. A esos se les
// acredita el primero. Es una decisión, no un dato: con último-contacto cambia.
console.log(`anuncios como primer contacto: ${ads.length}  (ad_id distintos en total: 54)`);
console.log(`374 conversaciones entraron por más de un anuncio → acreditadas al primero\n`);
console.log("ad_id              | conv | cierre | confirm | tasa  | valor");
for (const [id, v] of ads.slice(0, 20))
  console.log(`${id} | ${String(v.conv).padStart(4)} | ${String(v.cierre).padStart(6)} | ${String(v.conf).padStart(7)} | ${pct(v.conf, v.conv).padStart(5)} | ${fmt(v.valor).padStart(12)}`);

const sinAd = porAd.get("(sin anuncio)");
if (sinAd)
  console.log(`\n(sin anuncio)      | ${String(sinAd.conv).padStart(4)} | ${String(sinAd.cierre).padStart(6)} | ${String(sinAd.conf).padStart(7)} | ${pct(sinAd.conf, sinAd.conv).padStart(5)} | ${fmt(sinAd.valor).padStart(12)}`);

const totalConf = ads.reduce((s, [, v]) => s + v.conf, 0);
let acc2 = 0, i = 0;
for (const [, v] of [...ads].sort((a, b) => b[1].conf - a[1].conf)) {
  acc2 += v.conf; i++;
  if (acc2 >= totalConf * 0.8) break;
}
console.log(`\n🔑 ${i} de ${ads.length} anuncios concentran el 80% de los pedidos confirmados.`);

const conVolumen = ads.filter(([, v]) => v.conv >= 50).sort((a, b) => b[1].conf / b[1].conv - a[1].conf / a[1].conv);
console.log(`\nAnuncios con ≥50 conversaciones (muestra usable): ${conVolumen.length}`);
console.log("\nMEJOR cierre:");
for (const [id, v] of conVolumen.slice(0, 6))
  console.log(`  ${id}  ${String(v.conv).padStart(4)} conv → ${String(v.conf).padStart(3)} ped  ${pct(v.conf, v.conv)}`);
console.log("\nPEOR cierre (queman conversaciones):");
for (const [id, v] of conVolumen.slice(-6))
  console.log(`  ${id}  ${String(v.conv).padStart(4)} conv → ${String(v.conf).padStart(3)} ped  ${pct(v.conf, v.conv)}`);

// ==========================================================
console.log("\n" + "=".repeat(72));
console.log("5. MEZCLA DE UNIDADES");
console.log("=".repeat(72));
let u1 = 0, u2 = 0;
const mezcla = new Map();
for (const p of pedidos) {
  const k = (p.producto || "(sin producto)").slice(0, 45);
  mezcla.set(k, (mezcla.get(k) || 0) + 1);
  if (unidadesDe(p) >= 2) u2++; else u1++;
}
for (const [k, n] of [...mezcla.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10))
  console.log(`  ${String(n).padStart(4)}  ${k}`);
console.log(`\nshare de 2+ unidades: ${pct(u2, u1 + u2)}  (${u2} de ${u1 + u2})`);

// ==========================================================
console.log("\n" + "=".repeat(72));
console.log("6. CIUDADES QUE EL BOT NO RECONOCE → cotizaría con el default (banda E)");
console.log("=".repeat(72));
const noRec = new Map();
for (const p of pedidos) {
  if (!p.ciudad) continue;
  const c = cotizar(ciudadLimpia(p.ciudad), unidadesDe(p));
  if (!c || !c.reconocida) {
    const k = ciudadLimpia(p.ciudad);
    noRec.set(k, (noRec.get(k) || 0) + 1);
  }
}
console.log(`ciudades distintas no reconocidas: ${noRec.size}\n`);
for (const [k, n] of [...noRec.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30))
  console.log(`  ${String(n).padStart(3)}  ${k}`);

// ==========================================================
console.log("\n" + "=".repeat(72));
console.log("7. LO QUE PREGUNTA EL CLIENTE");
console.log("=".repeat(72));
const temas = {
  color: /(color|franja|reflectiv|negro|rojo|verde|azul|morado|blanco)/i,
  talla: /(talla|medida|peso|estatura|mido|grande|queda|xl|\bs\b|\bm\b|\bl\b)/i,
  precio: /(precio|cu[áa]nto|vale|valor|cuesta|barato|caro|descuento|rebaja|oferta)/i,
  envio_pago: /(env[íi]o|contraentrega|contra entrega|pago|pagar|efectivo|transferencia|nequi|daviplata|domicilio)/i,
  tiempo: /(cu[áa]ndo llega|demora|tiempo|d[íi]as|hoy|mañana|urgente|gu[íi]a|rastre)/i,
  impermeabilidad: /(impermeable|moja|filtra|agua|lluvia|sirve)/i,
  material: /(material|pvc|calibre|tela|lona|resistente|calidad|se rompe|dura)/i,
  desconfianza: /(estafa|serio|confi|real|verdad|garantiza|seguro que)/i,
  garantia: /(garant[íi]a|cambio|devol|reclamo)/i,
  mayorista: /(mayor|docena|al por mayor|reventa|distribu)/i,
  colmena: /(colmena|premium|gama alta)/i,
};
const cuenta = {};
for (const t of Object.keys(temas)) cuenta[t] = 0;
for (const msg of objeciones)
  for (const [t, re] of Object.entries(temas)) if (re.test(msg)) cuenta[t]++;
console.log(`mensajes propios del cliente: ${objeciones.length.toLocaleString("es-CO")}\n`);
for (const [t, n] of Object.entries(cuenta).sort((a, b) => b[1] - a[1]))
  console.log(`  ${String(n).padStart(5)}  ${pct(n, objeciones.length).padStart(6)}  ${t}`);

console.log("\n" + "=".repeat(72));
console.log("⚠️  El export NO trae timestamps: no hay serie de tiempo ni se puede");
console.log("   casar un pedido con el gasto de un día. Es una foto acumulada.");
console.log("=".repeat(72));
