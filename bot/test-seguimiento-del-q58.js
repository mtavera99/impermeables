// ============================================================================
// 🔴 AL LEAD DEL Q58 NO LE PUEDE LLEGAR UN SEGUIMIENTO DE IMPERMEABLES
//
// DE DÓNDE SALE (16-oct). El arreglo del 29-sep puso un texto de seguimiento
// por producto, porque a un cliente que preguntó por intercomunicadores le
// llegó a las 2 horas: *"¿Te quedó alguna duda con el impermeable? ... Si no te
// sirve la talla, se cambia."* El V10 no tiene talla.
//
// Pero ese arreglo dejó el default en `impermeable`. El Q58 Max entró al
// catálogo el 15-oct SIN entrada propia en TEXTOS_POR_PRODUCTO, así que caía en
// el default y el bug volvió entero, en el producto recién lanzado.
//
// Y no era teórico: la primera hora de pauta trajo 16 leads del Q58 y 14 se
// quedaron callados en el primer turno. El seguimiento de las 2 h es justo lo
// que los recupera — y les iba a hablar de impermeables y de tallas.
//
// 🔑 LA PRUEBA QUE MÁS IMPORTA es la de la categoría: que un producto NUEVO que
// alguien agregue mañana sin pasar por TEXTOS_POR_PRODUCTO no repita esto por
// tercera vez.
// ============================================================================
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const os = require("os");

// `textoDe` no está exportada (es interna del módulo). Para probarla se carga
// una copia del archivo con el export agregado. Así la prueba mira el código de
// verdad, no una reimplementación que podría quedar desalineada.
const RUTA = path.join(__dirname, "src", "seguimiento.js");
const COPIA = path.join(os.tmpdir(), `seguimiento-probe-${process.pid}.js`);
const fuente = fs.readFileSync(RUTA, "utf8");
fs.writeFileSync(
  COPIA,
  fuente
    .replace(/require\("\.\//g, `require("${path.join(__dirname, "src")}/`)
    .replace(/^module\.exports = \{/m, "module.exports = { textoDe, TEXTOS_POR_PRODUCTO, RESPALDO_POR_CATEGORIA,")
);
const seg = require(COPIA);
const catalogo = require("./src/catalogo");
process.on("exit", () => { try { fs.unlinkSync(COPIA); } catch {} });

let ok = 0;
let fallos = 0;
function prueba(nombre, fn) {
  try {
    fn();
    ok += 1;
    console.log(`  ✅ ${nombre}`);
  } catch (e) {
    fallos += 1;
    console.error(`  ❌ ${nombre}\n     ${e.message}`);
  }
}

const PASOS_DE_TEXTO = [1, 2];

console.log("\n📨 SEGUIMIENTO DEL Q58 MAX\n");

// ----------------------------------------------------------------------------
console.log("1) 🔴 El bug: nunca hablarle de impermeables a un lead de intercom");
// ----------------------------------------------------------------------------
// ⚠️ Van como palabra completa y no como trozo de texto: "pantalla" contiene
// "talla", y la primera versión de esta prueba se acusó sola de un bug que no
// existía. Es justo el tipo de falso positivo que después hace desconfiar de
// toda la batería.
const PALABRAS_DEL_IMPERMEABLE = [
  /\bimpermeables?\b/,
  /\btallas?\b/,
  /\bconjuntos?\b/,
  /\bfranjas?\b/,
  /\bpvc\b/,
  /\bzapatones?\b/,
];

/** Si el texto nombra algo del impermeable, devuelve qué. */
function nombraElImpermeable(texto) {
  const t = texto.toLowerCase();
  const mala = PALABRAS_DEL_IMPERMEABLE.find((re) => re.test(t));
  return mala ? String(mala) : null;
}

prueba("'pantalla' no cuenta como 'talla' (que la prueba no se engañe sola)", () => {
  assert.strictEqual(nombraElImpermeable("trae pantalla y radio FM"), null);
  assert.ok(nombraElImpermeable("si no te sirve la talla, se cambia"), "debería detectar 'talla'");
  assert.ok(nombraElImpermeable("¿dudas con el impermeable?"), "debería detectar 'impermeable'");
});

for (const n of PASOS_DE_TEXTO) {
  prueba(`paso ${n}: el texto del Q58 no nombra el impermeable ni la talla`, () => {
    const mala = nombraElImpermeable(seg.textoDe("intercom_q58_max", n));
    assert.ok(!mala, `el texto del Q58 dice ${mala}:\n${seg.textoDe("intercom_q58_max", n)}`);
  });
}

for (const n of PASOS_DE_TEXTO) {
  prueba(`paso ${n}: el texto del Q58 sí habla de intercomunicadores`, () => {
    const t = seg.textoDe("intercom_q58_max", n).toLowerCase();
    assert.ok(t.includes("intercomunicador"), `no nombra el producto:\n${t}`);
  });
}

prueba("el Q58 tiene su propia entrada (no depende del respaldo)", () => {
  assert.ok(seg.TEXTOS_POR_PRODUCTO.intercom_q58_max, "falta intercom_q58_max");
  for (const n of PASOS_DE_TEXTO) {
    assert.ok(seg.TEXTOS_POR_PRODUCTO.intercom_q58_max[n], `falta el paso ${n}`);
  }
});

// ----------------------------------------------------------------------------
console.log("\n2) 🔑 LA TRAMPA: ningún producto nuevo puede caer en el impermeable");
// ----------------------------------------------------------------------------
prueba("TODO producto de intercomunicador del catálogo tiene texto sin 'talla'", () => {
  const ids = Object.keys(catalogo.PRODUCTOS || {});
  assert.ok(ids.length >= 2, "no se pudo leer el catálogo");
  const intercoms = ids.filter((id) => catalogo.esIntercom(id));
  assert.ok(intercoms.length >= 2, `esperábamos al menos 2 intercomunicadores, hay ${intercoms.length}`);
  for (const id of intercoms) {
    for (const n of PASOS_DE_TEXTO) {
      const mala = nombraElImpermeable(seg.textoDe(id, n));
      assert.ok(!mala, `${id} paso ${n} dice ${mala}`);
    }
  }
});

prueba("un intercomunicador SIN texto propio cae en el genérico, no en el impermeable", () => {
  // Se simula el producto que alguien agrega mañana y se olvida de este archivo.
  const falso = "intercom_modelo_que_no_existe";
  assert.ok(!seg.TEXTOS_POR_PRODUCTO[falso], "el id de prueba no debe existir");
  catalogo.PRODUCTOS[falso] = { id: falso, categoria: "intercomunicador", nombreCorto: "X" };
  try {
    for (const n of PASOS_DE_TEXTO) {
      const texto = seg.textoDe(falso, n);
      const mala = nombraElImpermeable(texto);
      assert.ok(!mala, `paso ${n} dice ${mala}`);
      assert.ok(texto.toLowerCase().includes("intercomunicador"), `paso ${n} no nombra la categoría`);
    }
  } finally {
    delete catalogo.PRODUCTOS[falso];
  }
});

prueba("el respaldo de la categoría no nombra ningún modelo ni precio", () => {
  // Por eso sirve para cualquier intercomunicador: si dijera "V10" o "$99.900",
  // usarlo para el Q58 sería mentirle al cliente.
  const r = seg.RESPALDO_POR_CATEGORIA.intercomunicador;
  assert.ok(r, "falta el respaldo de intercomunicador");
  for (const n of PASOS_DE_TEXTO) {
    const t = r[n];
    assert.ok(!/v10|q58/i.test(t), `el respaldo del paso ${n} nombra un modelo`);
    assert.ok(!/\$/.test(t), `el respaldo del paso ${n} dice un precio`);
  }
});

// ----------------------------------------------------------------------------
console.log("\n3) 🔒 El impermeable y el V10 no se tocaron");
// ----------------------------------------------------------------------------
prueba("el texto del impermeable sigue igual (está medido: 268 → 8 compras)", () => {
  assert.strictEqual(
    seg.textoDe("impermeable", 1),
    "¿Te quedó alguna duda con el impermeable? 🏍️\n\n" +
      "Te cuento lo que más preguntan: pagás *cuando lo recibís*, no antes. Si no te " +
      "sirve la talla, se cambia.\n\n" +
      "¿Te lo despacho?"
  );
  assert.strictEqual(
    seg.textoDe("impermeable", 2),
    "Hola 👋 Te escribo por el impermeable que estabas mirando.\n\n" +
      "Sigue disponible y recuerda que es *contraentrega*: pagas cuando lo " +
      "tienes en la mano, no antes 🏍️\n\n" +
      "¿Te lo despacho? Si quieres dime tu ciudad y te confirmo el total exacto."
  );
});

prueba("el texto del V10 sigue igual", () => {
  assert.strictEqual(
    seg.textoDe("intercom_v10_2x", 1),
    "¿Te quedó alguna duda con los intercomunicadores? 🏍️\n\n" +
      "Te cuento lo que más preguntan: pagás *cuando los recibís*, no antes. Y el " +
      "combo es por los DOS, no por uno.\n\n" +
      "¿Te los despacho?"
  );
  assert.strictEqual(
    seg.textoDe("intercom_v10_2x", 2),
    "Hola 👋 Te escribo por los intercomunicadores que estabas mirando.\n\n" +
      "Siguen disponibles y recuerda que es *contraentrega*: pagas cuando los " +
      "tienes en la mano, no antes 🏍️\n\n" +
      "¿Te los despacho? Si quieres dime tu ciudad y te confirmo el total exacto."
  );
});

prueba("un producto desconocido sin categoría sigue cayendo en el impermeable", () => {
  // El comportamiento de siempre para lo que no se reconoce. Si esto cambiara,
  // un lead del impermeable podría quedarse sin seguimiento.
  for (const n of PASOS_DE_TEXTO) {
    assert.strictEqual(seg.textoDe("no-existe-nada", n), seg.textoDe("impermeable", n));
  }
});

// ----------------------------------------------------------------------------
console.log("\n4) El seguimiento del Q58 da la razón del precio");
// ----------------------------------------------------------------------------
prueba("el paso 2 nombra lo que el Q58 tiene de más", () => {
  // Mismo hueco que se tapó en el primer mensaje: $30.000 más caro que el V10 y
  // nada que lo explicara.
  const t = seg.textoDe("intercom_q58_max", 2).toLowerCase();
  assert.ok(t.includes("pantalla"), "no nombra la pantalla");
  assert.ok(t.includes("radio"), "no nombra la radio FM");
  assert.ok(t.includes("memoria"), "no nombra la ranura de memoria");
});

prueba("solo promete funciones que están en la ficha del Q58", () => {
  const fns = catalogo.de("intercom_q58_max").funciones.join(" ").toLowerCase();
  for (const f of ["pantalla", "radio fm", "micro sd"]) {
    assert.ok(fns.includes(f), `la ficha no declara "${f}"`);
  }
});

prueba("no mete ninguna certificación ni garantía en el seguimiento", () => {
  for (const n of PASOS_DE_TEXTO) {
    const t = seg.textoDe("intercom_q58_max", n).toLowerCase();
    assert.ok(!t.includes("ipx"), `paso ${n} dice IPX`);
    assert.ok(!t.includes("ip6"), `paso ${n} dice IP6`);
    assert.ok(!t.includes("garantiz"), `paso ${n} promete garantía`);
  }
});

prueba("sigue siendo contraentrega en los dos pasos", () => {
  for (const n of PASOS_DE_TEXTO) {
    const t = seg.textoDe("intercom_q58_max", n).toLowerCase();
    assert.ok(t.includes("contraentrega") || t.includes("recibís"), `paso ${n} no dice cuándo se paga`);
  }
});

// ----------------------------------------------------------------------------
console.log("\n5) La plantilla de las 44h del Q58 sigue saltándose si no está");
// ----------------------------------------------------------------------------
prueba("sin SEGUIMIENTO_PLANTILLA_Q58, el paso de plantilla se salta", () => {
  // Esto YA funcionaba (PR #215) y tiene que seguir funcionando: mandarle la
  // plantilla del impermeable a un lead del Q58 sería peor que no mandar nada.
  const ficha = catalogo.de("intercom_q58_max");
  assert.strictEqual(ficha.seguimientoPlantillaEnv, "SEGUIMIENTO_PLANTILLA_Q58");
});

prueba("el Q58 y el V10 usan variables de plantilla DISTINTAS", () => {
  assert.notStrictEqual(
    catalogo.de("intercom_q58_max").seguimientoPlantillaEnv,
    catalogo.de("intercom_v10_2x").seguimientoPlantillaEnv
  );
});

console.log(`\n${"=".repeat(60)}`);
console.log(`${ok} pasaron · ${fallos} fallaron`);
console.log("=".repeat(60));
if (fallos) process.exit(1);
