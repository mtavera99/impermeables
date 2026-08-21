// Verifica el tarifario de fletes.js contra las guías reales de 99 Envíos.
// Uso: node bot/src/verificar-tarifario.js   (desde la raíz del repo)
//
// Sirve de red de seguridad: si alguien vuelve a tocar la tabla de fletes, esto
// dice al instante cuánto flete se estaría absorbiendo otra vez.

const fs = require("fs");
const path = require("path");
const { cotizar, PRECIO_PRODUCTO, fmt } = require("./fletes");

const ARCHIVOS = ["guias-99envios.csv", "guias-99envios-19ago.csv"];
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
  const guias = [];
  for (const archivo of ARCHIVOS) {
    for (const r of parseCsv(fs.readFileSync(path.join(DIR, archivo), "utf8"))) {
      guias.push({
        ciudad: r.ciudad_destino,
        flete: Number(r.valor_servicio),
        uds: Number(r.unidades),
      });
    }
  }

  const primas = guias.filter((g) => g.flete < UMBRAL_PRIMA);
  const validas = guias.filter((g) => g.flete >= UMBRAL_PRIMA);

  console.log(`Guías leídas: ${guias.length}`);
  console.log(
    `Excluidas por ser prima de devolución: ${primas.length} ` +
      `(${primas.map((p) => `${p.ciudad} ${fmt(Math.round(p.flete))}`).join(", ")})`
  );
  console.log(`Guías evaluadas: ${validas.length}\n`);

  let fuga = 0;
  const noReconocidas = new Set();
  const casos = [];

  for (const g of validas) {
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
  console.log(`(la tabla vieja absorbía $102.148 en las mismas guías)\n`);

  if (casos.length) {
    console.log(`Casos que aún absorben (${casos.length}):`);
    casos.forEach((c) => console.log(c));
  } else {
    console.log("Ninguna guía absorbe flete ✅");
  }

  console.log("\nCiudades no reconocidas (caen al default, banda E):");
  console.log(noReconocidas.size ? "  " + [...noReconocidas].join(", ") : "  ninguna ✅");
}

main();
