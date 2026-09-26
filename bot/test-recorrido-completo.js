/**
 * RECORRIDOS COMPLETOS, DE MENSAJE A MENSAJE, CON IA SIMULADA.
 *
 * DE DÓNDE SALE (26-sep), textual de la revisión:
 *   "Añade regresiones que recorran mensajes sucesivos y comprueben la respuesta
 *    final, el pedido persistido y su elegibilidad para despacho, usando IA
 *    simulada y datos ficticios, sin red."
 *
 * 🔑 POR QUÉ HACÍA FALTA. Las baterías que ya había prueban funciones sueltas:
 * le pasan a `calcular()` la ciudad ya escrita bien y comprueban el número. Los
 * cinco defectos que encontró la revisión NO se veían así, porque ninguno está en
 * el cálculo: están en cómo se ENCADENAN los turnos.
 *
 *   · la cantidad se perdía al tercer mensaje, no en `calcular()`
 *   · "Gachancipá" nunca llegaba a `calcular()`, que la resuelve bien
 *   · el pedido con el total mal se guardaba marcado… y se confirmaba al cliente
 *
 * Acá se llama a `generateReply()` de verdad, con `global.fetch` sustituido por un
 * guion de respuestas. Sin red, sin credenciales, con datos inventados.
 *
 *   node test-recorrido-completo.js
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

// ── El entorno se prepara ANTES de requerir agent.js ────────────────────────
// agent.js lee las variables al cargarse, así que esto tiene que ir primero.
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "recorrido-"));
process.env.DATA_DIR = DIR;
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba"; // solo para que TIENE_IA sea true
delete process.env.OWNER_PHONE;

// ============================================================================
// 🎭 LA IA SIMULADA
//
// Sustituye `global.fetch` y devuelve, en orden, las respuestas del guion. Así
// cada recorrido define exactamente qué "contesta el modelo" en cada turno, y se
// puede probar el caso incómodo (el modelo que se equivoca) sin esperar a que
// ocurra en producción.
//
// ⚠️ Cuenta las llamadas, porque el reintento de la etapa 5 hace DOS llamadas en
// el mismo turno: si eso no se ve, una prueba puede pasar por accidente.
// ============================================================================
const ia = {
  guion: [],
  llamadas: 0,
  prompts: [],
  poner(...respuestas) {
    this.guion = respuestas.slice();
    this.llamadas = 0;
    this.prompts = [];
  },
};

global.fetch = async (url, opts) => {
  ia.llamadas++;
  let cuerpo = {};
  try {
    cuerpo = JSON.parse(opts && opts.body ? opts.body : "{}");
  } catch {}
  ia.prompts.push((cuerpo.system_instruction && cuerpo.system_instruction.parts[0].text) || "");
  const texto = ia.guion.length ? ia.guion.shift() : "(el guion de la IA simulada se quedó sin respuestas)";
  return {
    ok: true,
    status: 200,
    async json() {
      return { candidates: [{ content: { parts: [{ text: texto }] } }] };
    },
    async text() {
      return texto;
    },
  };
};

const store = require("./src/store");
const agent = require("./src/agent");
const cotizacion = require("./src/cotizacion");

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

const pesos = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

/** Corre una conversación entera y devuelve lo que quedó. */
async function recorrer(telefono, turnos) {
  const respuestas = [];
  for (const { cliente, ia: guionIA } of turnos) {
    ia.poner(...[].concat(guionIA));
    const r = await agent.generateReply(telefono, cliente);
    respuestas.push(r);
  }
  const pedidos = store.todosLosPedidos().filter((p) => p.telefono_chat === telefono);
  return {
    respuestas,
    ultima: respuestas[respuestas.length - 1],
    pedidos,
    pedido: pedidos[0] || null,
    cotizacion: store.leerCotizacion(telefono),
  };
}

// El bloque del pedido tal como lo emite el modelo.
const ORDER = (o) => `##ORDER## ${JSON.stringify(o)}`;
const CUADRO = (total) =>
  `Confirmemos tu pedido:\nNombre: Ana Gómez\nCelular: 3001234567\nCiudad: Cali\n` +
  `Dirección: Cra 1 #2-3 barrio Centro\nColor de la franja: rojo\nTalla: L\n` +
  `Pago: contraentrega\nTOTAL: ${pesos(total)}\n¿Está todo bien? Respóndeme «SÍ CONFIRMO» y lo despacho 🏍️`;

const datosBase = {
  nombre: "Ana Gómez",
  celular: "3001234567",
  ciudad: "Cali",
  direccion: "Cra 1 #2-3 barrio Centro",
  color: "rojo",
  talla: "L",
  pago: "contraentrega",
};

(async () => {
  console.log(`\n💾 Datos de prueba en: ${DIR} (inventados, no hay nada de producción)`);

  // ==========================================================================
  console.log("\n── 1. 🔑 RECORRIDO: dos conjuntos sobreviven hasta el pedido ──");
  // El defecto que encontró la revisión: después de "quiero dos conjuntos", la
  // ciudad y la talla devolvían el recorrido a UNA unidad.
  // ==========================================================================
  {
    const r = await recorrer("573001110001", [
      { cliente: "hola, quiero dos conjuntos", ia: "¡Claro! ¿Para qué ciudad sería, para darte el total?" },
      { cliente: "Cali", ia: "Los dos te quedan en $148.000 en total 📦 Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "talla L y M, franja roja", ia: "¡Listo! Me falta el nombre, la dirección y el celular 🙌" },
      { cliente: "Ana Gómez, Cra 1 #2-3 barrio Centro, 3001234567", ia: CUADRO(148000) },
      { cliente: "sí confirmo", ia: `¡Gracias Ana! ${ORDER({ ...datosBase, total: 148000, unidades: 2 })}` },
    ]);

    chequear(
      "🔑 la cotización guardada sigue en 2 unidades al final del recorrido",
      r.cotizacion && r.cotizacion.uds === 2,
      `quedó en uds=${r.cotizacion && r.cotizacion.uds}`
    );
    chequear(
      `y el total sigue siendo el de dos (${pesos(148000)})`,
      r.cotizacion && r.cotizacion.total === 148000,
      `quedó en ${pesos(r.cotizacion && r.cotizacion.total)}`
    );
    chequear("se guardó exactamente un pedido", r.pedidos.length === 1, `se guardaron ${r.pedidos.length}`);
    chequear(
      "el pedido persistido cobra los dos conjuntos",
      r.pedido && Number(r.pedido.total) === 148000,
      `el pedido dice ${pesos(r.pedido && r.pedido.total)}`
    );
    chequear(
      "🚦 y queda LISTO para despachar",
      r.pedido && store.listoParaDespachar(r.pedido),
      store.textoDeRevision(r.pedido)
    );
    chequear(
      "no quedó marcado para revisión",
      r.pedido && !r.pedido.precio_no_cuadra && !r.pedido.sin_confirmar,
      JSON.stringify({ precio: r.pedido && r.pedido.precio_no_cuadra, sinConf: r.pedido && r.pedido.sin_confirmar })
    );
  }

  // ==========================================================================
  console.log("\n── 2. Y una corrección explícita vuelve a una unidad ──");
  // ==========================================================================
  {
    const r = await recorrer("573001110002", [
      { cliente: "quiero dos conjuntos", ia: "¡Claro! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Los dos te quedan en $148.000 en total 📦 Pásame tus datos" },
      { cliente: "mejor uno solo", ia: "Sin problema, uno solo. Te queda en $82.000 en total 📦 Pásame nombre completo, dirección con barrio y celular" },
    ]);
    chequear(
      "🔑 la corrección baja la cotización a 1 unidad",
      r.cotizacion && r.cotizacion.uds === 1,
      `quedó en uds=${r.cotizacion && r.cotizacion.uds}`
    );
    chequear(
      `y el total vuelve a ${pesos(82000)}`,
      r.cotizacion && r.cotizacion.total === 82000,
      `quedó en ${pesos(r.cotizacion && r.cotizacion.total)}`
    );
  }

  // ==========================================================================
  console.log("\n── 3. 🔑 RECORRIDO: una ciudad que NO está en el tarifario ──");
  // "Gachancipá" no la reconocía la extracción, así que el recorrido quedaba en
  // `sin_destino` y el bot preguntaba la ciudad para siempre.
  // ==========================================================================
  {
    const r = await recorrer("573001110003", [
      { cliente: "hola, cuánto vale?", ia: "Son $59.900 el conjunto + envío. ¿Para qué ciudad sería, para darte el total?" },
      { cliente: "Gachancipá", ia: "Te queda en $85.000 en total 📦 Pásame nombre completo, dirección con barrio y celular" },
    ]);
    chequear(
      "🔑 la ciudad de la respuesta se reconoce aunque no esté en el tarifario",
      r.cotizacion && /gachancip/i.test(String(r.cotizacion.ciudad)),
      `la cotización quedó con ciudad=${JSON.stringify(r.cotizacion && r.cotizacion.ciudad)}`
    );
    chequear(
      `y se cotiza con la tarifa predeterminada (${pesos(85000)})`,
      r.cotizacion && r.cotizacion.total === 85000,
      `quedó en ${pesos(r.cotizacion && r.cotizacion.total)}`
    );
    chequear(
      "marcada como NO reconocida, que es lo que habilita el aviso al dueño",
      r.cotizacion && r.cotizacion.reconocida === false,
      `reconocida=${r.cotizacion && r.cotizacion.reconocida}`
    );
  }

  // ==========================================================================
  console.log("\n── 4. 🔑 RECORRIDO: el modelo se equivoca y se corrige antes de salir ──");
  // La etapa 5 tiene que atrapar los roles invertidos y regenerar. Si el segundo
  // intento tampoco sirve, sale la línea escrita por el código.
  // ==========================================================================
  {
    const r = await recorrer("573001110004", [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      {
        cliente: "Cali",
        // 1er intento: roles invertidos. 2º intento: sigue mal. → línea del código.
        ia: [
          "El producto vale $22.100 y el envío $59.900. Total $82.000.",
          "El envío a Cali es $82.000 y el producto $22.100.",
        ],
      },
    ]);
    chequear("hubo reintento: se llamó a la IA dos veces en el turno", ia.llamadas === 2, `llamadas=${ia.llamadas}`);
    const texto = r.ultima.reply;
    chequear(
      "🔑 el mensaje que sale NO es el que invertía los roles",
      !/el producto vale \$22\.100/i.test(texto) && !/el envío a Cali es \$82\.000/i.test(texto),
      `salió: ${texto}`
    );
    chequear(
      "sale la línea de precio escrita por el código",
      texto.includes("$82.000") && /de envío/.test(texto),
      `salió: ${texto}`
    );
    chequear(
      "y esa línea pasa su propia validación",
      cotizacion.validarRespuesta(texto, r.cotizacion, {}).ok,
      JSON.stringify(cotizacion.validarRespuesta(texto, r.cotizacion, {}).problemas)
    );
  }

  // ==========================================================================
  console.log("\n── 5. 🔑 RECORRIDO: el pedido con el total mal NO se confirma ──");
  // Lo que la revisión señaló: guardar la marca no alcanza. Si al cliente se le
  // dijo "confirmado, te lo despacho", el daño ya está hecho.
  // ==========================================================================
  {
    const r = await recorrer("573001110005", [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total 📦 Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Ana Gómez, Cra 1 #2-3 barrio Centro, 3001234567", ia: CUADRO(82000) },
      {
        cliente: "sí confirmo",
        // El modelo emite el pedido con un total que NO es el cotizado.
        ia: `¡Listo Ana, tu pedido quedó confirmado y te lo despacho hoy! ${ORDER({ ...datosBase, total: 99000 })}`,
      },
    ]);

    chequear("el pedido NO se perdió: se guardó igual", r.pedidos.length === 1, `se guardaron ${r.pedidos.length}`);
    chequear(
      "quedó marcado precio_no_cuadra",
      r.pedido && r.pedido.precio_no_cuadra === true,
      JSON.stringify(r.pedido && { total: r.pedido.total, precio_no_cuadra: r.pedido.precio_no_cuadra })
    );
    chequear(
      `y guarda cuál era el total esperado (${pesos(82000)})`,
      r.pedido && Number(r.pedido.total_esperado) === 82000,
      `total_esperado=${r.pedido && r.pedido.total_esperado}`
    );
    chequear(
      "🚦 NO está listo para despachar",
      r.pedido && !store.listoParaDespachar(r.pedido),
      "un pedido con el total mal no puede contar como listo"
    );
    chequear(
      "y el motivo se puede leer",
      /no cuadra/.test(store.textoDeRevision(r.pedido)),
      store.textoDeRevision(r.pedido)
    );

    // 🔑 Lo que ve el cliente.
    const texto = r.ultima.reply;
    chequear(
      "🔑 al cliente NO se le confirma la venta",
      !/confirmado/i.test(texto) && !/te lo despacho hoy/i.test(texto),
      `salió: ${texto}`
    );
    chequear(
      "pero tampoco se queda sin respuesta",
      texto.trim().length > 40,
      `salió: ${JSON.stringify(texto)}`
    );
    chequear(
      "la respuesta conserva lo que sí es cierto (tenemos sus datos)",
      /datos/i.test(texto),
      `salió: ${texto}`
    );
    chequear(
      "no promete fecha de despacho",
      !/hoy mismo|mañana|en \d+ d[ií]as/i.test(texto),
      `salió: ${texto}`
    );
    chequear("🙋 y el chat pasa a un humano", store.isPaused("573001110005"));
  }

  // ==========================================================================
  console.log("\n── 6. RECORRIDO: Tadó vende una unidad, sin inventar el desglose ──");
  // ==========================================================================
  {
    const r = await recorrer("573001110006", [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Tadó", ia: "Te queda en $93.000 en total puesto en Tadó, y pagas al recibir 📦 Pásame nombre completo, dirección con barrio y celular" },
    ]);
    chequear(
      "🔑 en Tadó SÍ se cotiza una unidad",
      r.cotizacion && r.cotizacion.ok && r.cotizacion.total === 93000,
      JSON.stringify(r.cotizacion && { ok: r.cotizacion.ok, total: r.cotizacion.total })
    );
    chequear(
      "y se marca que el desglose no se conoce",
      r.cotizacion && r.cotizacion.desgloseDesconocido === true,
      `desgloseDesconocido=${r.cotizacion && r.cotizacion.desgloseDesconocido}`
    );
    chequear(
      "el bloque que recibe el modelo le prohíbe dar desglose",
      /NO des desglose/.test(cotizacion.bloqueDeDatos(r.cotizacion, {})),
      cotizacion.bloqueDeDatos(r.cotizacion, {}).slice(0, 200)
    );
  }

  // ==========================================================================
  console.log("\n── 7. RECORRIDO: sin el «sí» del cliente no hay venta lista ──");
  // ==========================================================================
  {
    const r = await recorrer("573001110007", [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total 📦 Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Ana Gómez, Cra 1 #2-3 barrio Centro, 3001234567", ia: CUADRO(82000) },
      { cliente: "mmm déjame ver", ia: `Con gusto. ${ORDER({ ...datosBase, total: 82000 })}` },
    ]);
    chequear(
      "el pedido se guarda marcado sin_confirmar",
      r.pedido && r.pedido.sin_confirmar === true,
      JSON.stringify(r.pedido && { sin_confirmar: r.pedido.sin_confirmar })
    );
    chequear(
      "🚦 y NO cuenta como listo para despachar",
      r.pedido && !store.listoParaDespachar(r.pedido),
      store.textoDeRevision(r.pedido)
    );
  }

  // ==========================================================================
  console.log("\n── 8. 🚦 Efecto real en el CSV y en el panel ──");
  // La revisión encontró que precio_no_cuadra se guardaba y NADIE lo leía.
  // ==========================================================================
  {
    const csv = require("./src/resumen").pedidosCSV();
    const cab = csv.split("\n")[0];
    // La primera columna, para que se vea antes de leer el nombre.
    chequear("el CSV tiene el estado como PRIMERA columna", /^estado,/.test(cab), cab);
    chequear("y columna con el motivo", /revisar_porque/.test(cab), cab);
    chequear(
      "🔑 el pedido con el total mal sale marcado REVISAR en el CSV",
      /🔴 REVISAR/.test(csv) && /no cuadra con la cotización/.test(csv),
      csv.split("\n").find((l) => /99000/.test(l)) || "(no se encontró la fila)"
    );
    chequear(
      "y el que está bien sale como LISTO",
      csv.split("\n").some((l) => /"LISTO"/.test(l) && /148000/.test(l)),
      csv.split("\n").find((l) => /148000/.test(l)) || "(no se encontró la fila)"
    );

    const html = require("./src/panel").render();
    chequear("el panel muestra la etiqueta PRECIO NO CUADRA", /PRECIO NO CUADRA/.test(html));
    chequear("dice cuál debería ser el total", /debería ser/.test(html), "hace falta el número esperado");
    chequear(
      "y hay una tarjeta que cuenta los que hay que revisar",
      /revisar antes de despachar/.test(html),
      "sin la tarjeta, el dato sigue sin estar en ninguna parte"
    );
    // ⚠️ Lo que NO se cambió: el orden y la plata por recaudar siguen como estaban.
    chequear(
      "⚠️ y NO se rompió la tarjeta de pendientes que ya existía",
      /pendientes de despachar<\/span>/.test(html),
      "test-pendientes-despachados.js protege esa tarjeta"
    );
  }

  // ==========================================================================
  console.log("\n── 9. El guion que recibe el modelo trae los números, no la tabla ──");
  // ==========================================================================
  {
    ia.poner("¡Hola! ¿Para qué ciudad sería?");
    await agent.generateReply("573001110009", "Cali");
    const prompt = ia.prompts[0] || "";
    chequear("el prompt trae el bloque de precio calculado", /PRECIO YA CALCULADO/.test(prompt));
    chequear("con el total exacto", /\$82\.000/.test(prompt), "sin el número, el modelo lo inventa");
    chequear(
      "y prohíbe descuentos porque el cliente no se quejó del precio",
      /NO ofrezcas ni menciones ning[uú]n descuento/.test(prompt)
    );
    chequear(
      "📏 el prompt completo se mide y queda bajo 9.000 tokens",
      Math.round(prompt.length / 4) < 9000,
      `quedó en ${Math.round(prompt.length / 4)} tokens`
    );
    console.log(`   📏 prompt final del turno: ${Math.round(prompt.length / 4)} tokens`);
  }

  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  try {
    fs.rmSync(DIR, { recursive: true, force: true });
  } catch {}
  process.exit(mal === 0 ? 0 : 1);
})().catch((e) => {
  console.error("🔴 La batería se cayó:", e);
  process.exit(1);
});
