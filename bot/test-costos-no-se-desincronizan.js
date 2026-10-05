/**
 * LOS COSTOS DEL ANALISIS NO PUEDEN QUEDARSE VIEJOS CUANDO CAMBIAN EN EL BOT.
 *
 * 🔴 EL CASO REAL (5-oct). El costo del intercomunicador bajó de $35.000 a
 * $32.000 por unidad. El dueño lo sabía y lo dijo de pasada; el código seguía en
 * $35.000. Con ese número viejo, la utilidad de 6 días daba $2.331.065 cuando la
 * real era $2.768.789:
 *
 *     $437.724 de diferencia, invisible.
 *
 * No fue un bug: fue una COPIA que se quedó atrás. Y el análisis que decide
 * cuánto presupuesto ponerle a cada producto vive en Python
 * (`analisis/cpa-por-producto.py`), mientras los costos de verdad viven en
 * JavaScript (`bot/src/`). Dos lenguajes, el mismo número escrito dos veces.
 *
 * 🔑 LA DEUDA ES CONSCIENTE, PERO NO PUEDE SER SILENCIOSA. Esta batería compara
 * las dos puntas y FALLA si alguien cambia una y no la otra. Es barata y evita
 * exactamente la clase de error que ya costó plata una vez.
 *
 * ⚠️ NO comprueba que el número sea CORRECTO —eso lo sabe el dueño, no una
 * prueba—. Comprueba que las dos copias digan lo mismo.
 *
 *   node test-costos-no-se-desincronizan.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const path = require("path");

const fletes = require("./src/fletes");
const catalogo = require("./src/catalogo");

let ok = 0;
let mal = 0;
function chequear(nombre, condicion, detalle) {
  if (condicion) {
    console.log(`✅ ${nombre}`);
    ok++;
  } else {
    console.log(`🔴 ${nombre}${detalle ? `\n     ${detalle}` : ""}`);
    mal++;
  }
}

const ANALISIS = path.join(__dirname, "..", "analisis", "cpa-por-producto.py");

console.log("\n── 1. El archivo de análisis existe y se puede leer ──");
chequear("analisis/cpa-por-producto.py está en su lugar", fs.existsSync(ANALISIS), ANALISIS);
if (!fs.existsSync(ANALISIS)) {
  console.log(`\n🔴 ${ok}/${ok + mal} correctos.\n`);
  process.exit(1);
}
const py = fs.readFileSync(ANALISIS, "utf8");

/** Lee una constante entera del script de Python. null si no está. */
function constantePython(nombre) {
  const m = new RegExp(`^${nombre}\\s*=\\s*([0-9]+)`, "m").exec(py);
  return m ? Number(m[1]) : null;
}
/** Lee una constante decimal (una tasa) del script de Python. */
function tasaPython(nombre) {
  const m = new RegExp(`^${nombre}\\s*=\\s*([0-9.]+)`, "m").exec(py);
  return m ? Number(m[1]) : null;
}

console.log("\n── 2. 🔑 Los costos dicen lo mismo en los dos lados ──");

const costoImperPy = constantePython("COSTO_IMPERMEABLE");
chequear(
  "el costo del impermeable está declarado en el análisis",
  costoImperPy !== null,
  "no encontré COSTO_IMPERMEABLE en el .py"
);
chequear(
  `🔑 impermeable: fletes.js dice $${fletes.COSTO_PRODUCTO.toLocaleString("es-CO")} y el análisis $${(costoImperPy || 0).toLocaleString("es-CO")}`,
  costoImperPy === fletes.COSTO_PRODUCTO,
  "cambió uno y no el otro: actualizá COSTO_IMPERMEABLE en analisis/cpa-por-producto.py"
);

const v10 = catalogo.de("intercom_v10_2x");
const costoV10Py = constantePython("COSTO_V10_UNIDAD");
chequear(
  "el costo del intercomunicador está declarado en el análisis",
  costoV10Py !== null,
  "no encontré COSTO_V10_UNIDAD en el .py"
);
chequear(
  `🔑 V10: catalogo.js dice $${v10.costoUnitario.toLocaleString("es-CO")} y el análisis $${(costoV10Py || 0).toLocaleString("es-CO")}`,
  costoV10Py === v10.costoUnitario,
  "cambió uno y no el otro: actualizá COSTO_V10_UNIDAD en analisis/cpa-por-producto.py"
);

console.log("\n── 2b. 🔑 Y las tablas de flete REAL también ──");
//
// 🔴 El envío es el que más fácil se olvida, y es el error que cometió el dueño
// calculando a mano: "59.900 − 33.000 − 9.000 = 17.900". Falta que en banda C se
// le cobran $22.100 de envío y el envío cuesta $25.055. Son $2.955 por pedido que
// el negocio absorbe, y a 188 pedidos son $555.540.
//
// Si estas tablas se desincronizan, el informe calcula la utilidad con el flete
// de otra época y nadie se entera.
for (const [nombre, tabla] of [["ENVIO_REAL_1", fletes.ENVIO_REAL_1], ["ENVIO_REAL_2", fletes.ENVIO_REAL_2]]) {
  const m = new RegExp(`^${nombre}\\s*=\\s*\\{([^}]*)\\}`, "m").exec(py);
  chequear(`${nombre} está declarado en el análisis`, Boolean(m), `no encontré ${nombre} en el .py`);
  if (!m) continue;
  const enPy = {};
  for (const par of m[1].split(",")) {
    const q = /"([A-E])"\s*:\s*([0-9]+)/.exec(par);
    if (q) enPy[q[1]] = Number(q[2]);
  }
  const bandas = Object.keys(tabla).sort();
  chequear(
    `  ${nombre}: están las ${bandas.length} bandas`,
    bandas.every((b) => enPy[b] !== undefined),
    `en el .py: ${JSON.stringify(enPy)}`
  );
  const distintas = bandas.filter((b) => enPy[b] !== tabla[b]);
  chequear(
    `  🔑 ${nombre}: las ${bandas.length} bandas coinciden con fletes.js`,
    distintas.length === 0,
    distintas.map((b) => `banda ${b}: fletes.js=${tabla[b]} vs .py=${enPy[b]}`).join(" · ") +
      " → actualizá la tabla en analisis/cpa-por-producto.py"
  );
}

// Y los totales por banda, que son los que le deducen la banda a cada pedido.
{
  const m = /TOTAL_POR_BANDA\s*=\s*\{([\s\S]*?)\n\}/.exec(py);
  chequear("TOTAL_POR_BANDA está declarado", Boolean(m));
  if (m) {
    const imper = /"IMPERMEABLE":\s*\{([^}]*)\}/.exec(m[1]);
    const enPy = {};
    if (imper) {
      for (const par of imper[1].split(",")) {
        const q = /"([A-E])"\s*:\s*([0-9]+)/.exec(par);
        if (q) enPy[q[1]] = Number(q[2]);
      }
    }
    const malas = Object.keys(fletes.BANDAS).filter((b) => enPy[b] !== fletes.BANDAS[b].total);
    chequear(
      "🔑 los totales del impermeable por banda coinciden con fletes.js",
      malas.length === 0,
      malas.map((b) => `banda ${b}: fletes.js=${fletes.BANDAS[b].total} vs .py=${enPy[b]}`).join(" · ")
    );
  }
}

console.log("\n── 3. Los supuestos de devolución son los medidos, no los viejos ──");
//
// 🔴 `analisis/estado-cuenta.py` tenía COSTO_DEV = $33.648 — DIEZ VECES el costo
// real de una devolución liquidada. Por la regla 0-AY nunca cobran flete de
// retorno: solo la prima del seguro, y el producto vuelve y se revende. Con el
// número viejo, el informe horario sobreestimaba la utilidad del 4-oct en un 78%.

const costoDevPy = constantePython("COSTO_DEVOLUCION");
chequear(
  "el costo de una devolución está declarado",
  costoDevPy !== null,
  "no encontré COSTO_DEVOLUCION en el .py"
);
chequear(
  "⛔ y NO es el $33.648 viejo (era 10x el real: cobraba un flete que nunca existió)",
  costoDevPy !== 33648,
  `dice $${(costoDevPy || 0).toLocaleString("es-CO")}`
);
chequear(
  "es el $3.109 medido sobre 54 devoluciones reales",
  costoDevPy === 3109,
  `dice $${(costoDevPy || 0).toLocaleString("es-CO")}`
);

const tasaPy = tasaPython("TASA_DEVOLUCION");
chequear(
  "la tasa de devolución está declarada",
  tasaPy !== null,
  "no encontré TASA_DEVOLUCION en el .py"
);
chequear(
  "⛔ y NO es el 5% inmaduro del 10-sep (3 de 60 resueltas)",
  tasaPy === null || tasaPy > 0.1,
  `dice ${((tasaPy || 0) * 100).toFixed(1)}%`
);
chequear(
  "está dentro del intervalo medido (16,8% a 30,2%)",
  tasaPy !== null && tasaPy >= 0.168 && tasaPy <= 0.302,
  `dice ${((tasaPy || 0) * 100).toFixed(1)}%`
);

console.log("\n── 3b. Y los DOS informes usan los mismos supuestos ──");
//
// Hay dos archivos de análisis que calculan utilidad: estado-cuenta.py (cada
// hora, vigila el saldo) y cpa-por-producto.py (una vez al día, mide el CPA de
// cada producto). Si usan tasas distintas, dan dos utilidades distintas para el
// mismo día y no hay forma de saber cuál creer.
{
  const ESTADO = path.join(__dirname, "..", "analisis", "estado-cuenta.py");
  chequear("analisis/estado-cuenta.py está en su lugar", fs.existsSync(ESTADO), ESTADO);
  if (fs.existsSync(ESTADO)) {
    const est = fs.readFileSync(ESTADO, "utf8");
    const leer = (txt, nombre) => {
      const m = new RegExp(`^${nombre}\\s*=\\s*([0-9.]+)`, "m").exec(txt);
      return m ? Number(m[1]) : null;
    };
    const paresIguales = [
      ["TASA_DEV", "TASA_DEVOLUCION", "la tasa de devolución"],
      ["COSTO_DEV", "COSTO_DEVOLUCION", "el costo de una devolución"],
    ];
    for (const [enEstado, enCpa, que] of paresIguales) {
      const a = leer(est, enEstado);
      const b = leer(py, enCpa);
      chequear(
        `🔑 ${que}: estado-cuenta dice ${a} y cpa-por-producto ${b}`,
        a !== null && b !== null && a === b,
        "los dos informes calcularían utilidades distintas para el mismo día"
      );
    }
    // ⛔ Y el que era 10x: que no vuelva por la puerta de atrás.
    chequear(
      "⛔ estado-cuenta.py ya NO usa el COSTO_DEV de $33.648",
      leer(est, "COSTO_DEV") !== 33648,
      "ese número cobraba un flete de devolución que la regla 0-AY desmintió"
    );
    chequear(
      "⛔ y su cierre ya NO es el 8,4% viejo (estimaba 63 pedidos cuando fueron 43)",
      leer(est, "CIERRE") !== 0.084,
      `dice ${leer(est, "CIERRE")}`
    );
    // 🔑 Lo que de verdad evita que esto se repita: que el informe IMPRIMA sus
    // supuestos. Si solo sale el resultado, una constante vieja no se ve.
    chequear(
      "🔑 estado-cuenta.py imprime sus supuestos en el informe",
      /Con qué números se calculó/.test(est),
      "sin eso, la próxima constante vieja tampoco se va a notar"
    );
    chequear(
      "🔑 y cpa-por-producto.py también",
      /Con que numeros se calculo/.test(py),
      "sin eso, la próxima constante vieja tampoco se va a notar"
    );
  }
}

console.log("\n── 4. El análisis no puede escribir, solo leer (regla 4-B) ──");
//
// El token de Meta de este repo no tiene `ads_management`, pero la regla es que
// el candado sea TÉCNICO y no de disciplina: si el script no sabe hacer POST, no
// puede mover un presupuesto ni con un error de código.
for (const prohibido of ['method="POST"', 'method="PUT"', 'method="DELETE"', "urlopen(req, data"]) {
  chequear(
    `⛔ no contiene ${prohibido}`,
    !py.includes(prohibido),
    "este script tiene que ser de solo lectura"
  );
}
chequear(
  "y reusa el lector de solo lectura en vez de abrir su propia conexión a Meta",
  /meta-api-lectura\.py/.test(py),
  "debería cargar meta-api-lectura.py, cuya única función de red es un GET"
);

console.log("\n── 5. 🔒 No carga datos personales de los clientes ──");
//
// /pedidos.csv trae nombre, celular y dirección. El informe que genera este
// script se commitea a un repositorio PÚBLICO.
chequear(
  "declara explícitamente qué columnas carga",
  /^COLUMNAS\s*=/m.test(py),
  "debería tener una lista blanca de columnas"
);
const mCols = /^COLUMNAS\s*=\s*\[(.*?)\]/ms.exec(py);
const cols = mCols ? mCols[1].split(",").map((s) => s.trim().replace(/['"]/g, "")) : [];
for (const pii of ["nombre", "celular", "direccion", "telefono_chat"]) {
  chequear(`⛔ ${pii} NO está en las columnas que carga`, !cols.includes(pii), `columnas: ${cols.join(", ")}`);
}
chequear(
  "y sí carga las que necesita el cruce",
  ["dia_bogota", "total", "anuncio_id"].every((c) => cols.includes(c)),
  `columnas: ${cols.join(", ")}`
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
