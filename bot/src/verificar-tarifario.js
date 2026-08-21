// Verifica el tarifario de fletes.js contra las guías reales de 99 Envíos.
// Uso: node bot/src/verificar-tarifario.js   (desde la raíz del repo)
//
// Sirve de red de seguridad: si alguien vuelve a tocar la tabla de fletes, esto
// dice al instante cuánto flete se estaría absorbiendo otra vez.

const fs = require("fs");
const path = require("path");
const { cotizar, PRECIO_PRODUCTO, PROMO_2_UNIDADES, fmt } = require("./fletes");

const ARCHIVOS = [
  "guias-99envios.csv",
  "guias-99envios-19ago.csv",
  "guias-99envios-21ago.csv",
];
const DIR = path.join(__dirname, "..", "..", "analisis");

// En una devolución el valor_servicio es la PRIMA del seguro, no un flete.
const UMBRAL_PRIMA = 8000;

// Parser de CSV que respeta los campos entrecomillados. Hace falta porque
// ciudad_destino viene como "BOGOTÁ, D.C." — con coma adentro. Partir por comas
// a lo bruto corrompe 10 filas y da un resultado falso.
function parseCsv(texto) {
  const filas = [];
  let campo = "";
  let fila = [];
  let enComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const ch = texto[i];
    if (enComillas) {
      if (ch === '"') {
        if (texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          enComillas = false;
        }
      } else {
        campo += ch;
      }
    } else if (ch === '"') {
      enComillas = true;
    } else if (ch === ",") {
      fila.push(campo);
      campo = "";
    } else if (ch === "\n" || ch === "\r") {
      if (campo !== "" || fila.length) {
        fila.push(campo);
        filas.push(fila);
        fila = [];
        campo = "";
      }
    } else {
      campo += ch;
    }
  }
  if (campo !== "" || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }

  const [cabecera, ...resto] = filas;
  return resto.map((r) => Object.fromEntries(cabecera.map((h, i) => [h, r[i]])));
}

function main() {
  // Los exports se solapan entre sí, así que hay que deduplicar por número de
  // guía. El más reciente manda (trae el estado actualizado).
  const porGuia = new Map();
  for (const archivo of ARCHIVOS) {
    for (const r of parseCsv(fs.readFileSync(path.join(DIR, archivo), "utf8"))) {
      porGuia.set(r.numero_de_guia.trim(), {
        ciudad: r.ciudad_destino,
        flete: Number(r.valor_servicio),
        cobrado: Number(r.valor_comercial),
        // El export del 21-ago no trae columna de unidades: se infiere del recaudo.
        uds: r.unidades ? Number(r.unidades) : Number(r.valor_comercial) > 100000 ? 2 : 1,
      });
    }
  }
  const guias = [...porGuia.values()];

  const primas = guias.filter((g) => g.flete < UMBRAL_PRIMA);
  const validas = guias.filter((g) => g.flete >= UMBRAL_PRIMA);

  console.log(`Guías leídas: ${guias.length}`);
  console.log(
    `Excluidas por ser prima de devolución: ${primas.length} ` +
      `(${primas.map((p) => `${p.ciudad} ${fmt(Math.round(p.flete))}`).join(", ")})`
  );
  console.log(`Guías evaluadas: ${validas.length}\n`);

  // La auditoría de bandas aplica a pedidos de 1 unidad. Los de 2 se auditan
  // aparte, contra la promo de $110.000 + flete.
  const unaUnidad = validas.filter((g) => g.uds === 1);
  const multi = validas.filter((g) => g.uds > 1);
  console.log(`De esas, ${unaUnidad.length} son de 1 unidad (las que tienen tarifa firme) `
    + `y ${multi.length} son de 2+\n`);

  let fuga = 0;
  const noReconocidas = new Set();
  const casos = [];

  for (const g of unaUnidad) {
    const q = cotizar(g.ciudad, g.uds);
    if (!q.reconocida) noReconocidas.add(g.ciudad);
    const necesario = PRECIO_PRODUCTO * g.uds + g.flete;
    const falta = necesario - q.total;
    if (falta > 0) {
      fuga += falta;
      casos.push(
        `  ${g.ciudad} (${g.uds} ud, banda ${q.banda}): necesita ${fmt(Math.round(necesario))}, ` +
          `cobra ${fmt(q.total)} → absorbe ${fmt(Math.round(falta))}`
      );
    }
  }

  console.log(`ABSORCIÓN TOTAL con el tarifario actual: ${fmt(Math.round(fuga))}`);
  console.log(`Absorción que habría con la tabla vieja:  $154.107\n`);

  if (casos.length) {
    console.log(`Casos que aún absorben (${casos.length}):`);
    casos.forEach((c) => console.log(c));
  } else {
    console.log("Ninguna guía absorbe flete ✅");
  }

  console.log("\nCiudades no reconocidas (caen al default, banda E):");
  console.log(noReconocidas.size ? "  " + [...noReconocidas].join(", ") : "  ninguna ✅");

  // El otro lado del error: cobrar MÁS de lo necesario espanta la venta.
  console.log("\n" + "-".repeat(70));
  console.log("SOBRECOBRO — dónde el tarifario pide más de lo que cuesta");
  const sobra = [];
  for (const g of unaUnidad) {
    const q = cotizar(g.ciudad, g.uds);
    const necesario = PRECIO_PRODUCTO * g.uds + g.flete;
    const dif = q.total - necesario;
    if (dif > 2500) sobra.push(`  ${g.ciudad} (banda ${q.banda}): +${fmt(Math.round(dif))}`);
  }
  if (sobra.length) {
    [...new Set(sobra)].forEach((s) => console.log(s));
    console.log(
      "\n  ⚠️ Estos casos son DELIBERADOS: el flete de un mismo destino cambia según\n" +
        "  la transportadora que asigne 99 Envíos (Bogotá: $11.880 coordinadora,\n" +
        "  $12.871 interrapidísimo, $14.674 servientrega). Como no se sabe de antemano\n" +
        "  cuál va a tocar, el precio de la banda cubre la transportadora MÁS CARA.\n" +
        "  Cobrar de menos es pérdida segura; cobrar de más solo cuesta en los casos\n" +
        "  en que toca la transportadora barata."
    );
  } else {
    console.log("  ninguno");
  }

  reportarMultiUnidad(multi);
}


// Audita los pedidos de 2 unidades contra la promo vigente (2 x $110.000 + flete).
// El precio SÍ existe; lo que falla es la aplicación.
function reportarMultiUnidad(multi) {
  if (!multi.length) return;
  console.log("\n" + "-".repeat(70));
  console.log(`PEDIDOS DE 2 UNIDADES (${multi.length}) — CONTRA LA PROMO DE ${fmt(PROMO_2_UNIDADES)}`);
  console.log("  (la regla correcta es: promo + flete real, el flete NUNCA se absorbe)");
  console.log("-".repeat(70));

  let absorbido = 0;
  let cobradoDeMas = 0;
  for (const g of [...multi].sort((a, b) => a.cobrado - a.flete - (b.cobrado - b.flete))) {
    const debia = PROMO_2_UNIDADES + g.flete;
    const dif = g.cobrado - debia;
    let nota = "";
    if (dif < -500) {
      absorbido += -dif;
      nota = " 🔴 absorbió flete";
    } else if (dif > 500) {
      cobradoDeMas += dif;
      nota = " (cobró por encima de la promo)";
    } else {
      nota = " ✅";
    }
    console.log(
      `  ${g.ciudad.padEnd(24)} debía ${fmt(Math.round(debia))} · ` +
        `cobró ${fmt(Math.round(g.cobrado))} · ${dif >= 0 ? "+" : ""}${fmt(Math.round(dif))}${nota}`
    );
  }
  console.log(`\n  Flete absorbido en pedidos de 2 unidades: ${fmt(Math.round(absorbido))}`);
  console.log(`  Cobrado por encima de la promo:           ${fmt(Math.round(cobradoDeMas))}`);
  console.log(
    "\n  ⚠️ Que se desvíe en AMBOS sentidos confirma que la promo no se está\n" +
      "  aplicando con una regla, sino a criterio de cada cierre. Cobrar por\n" +
      "  encima no es un error grave (hay clientes que pagan las 2 completas),\n" +
      "  pero absorber flete sí: es margen regalado."
  );
}


main();
