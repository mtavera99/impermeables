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

/** Un solo turno, devolviendo también lo que la IA recibió. Útil para mirar un
 *  mensaje concreto en vez de toda la conversación. */
async function turno(telefono, cliente, ...respuestasIA) {
  ia.poner(...respuestasIA);
  const r = await agent.generateReply(telefono, cliente);
  return { ...r, prompts: ia.prompts.slice(), llamadas: ia.llamadas };
}

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

  // ==========================================================================
  console.log("\n── 10. 🔑 RECORRIDO: el pedido de 1 unidad al precio de 2 se frena ──");
  // Pedido de la 2ª revisión: "Añade una prueba completa mediante generateReply()".
  // El defecto: verificarPedido solo comparaba total y ciudad, así que un pedido
  // que decía UNA unidad con el total de DOS pasaba como bueno. Se despacharía un
  // conjunto contra un recaudo de dos.
  // ==========================================================================
  {
    const tel = "573001110010";
    // ⚠️ Cliente propio: `pedidosDelMismoCliente` empareja por CELULAR, así que
    // reusar el de otra sección hace que este pedido se reconcilie con aquel.
    const otroCliente = { ...datosBase, nombre: "Lucía Peña", celular: "3005550010" };
    const CUADRO10 = CUADRO(148000).replace("Ana Gómez", "Lucía Peña").replace("3001234567", "3005550010");
    const r = await recorrer(tel, [
      { cliente: "hola, quiero dos conjuntos", ia: "¡Claro! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Los dos te quedan en $148.000 en total: $110.000 los dos conjuntos + $38.000 de envío a Cali. Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Lucía Peña, Cra 1 #2-3 barrio Centro, 3005550010", ia: CUADRO10 },
      {
        cliente: "sí confirmo",
        // 🔴 El bloque sale con UNA unidad, al total de DOS.
        ia: `¡Gracias Lucía! ${ORDER({ ...otroCliente, total: 148000, unidades: 1 })}`,
      },
    ]);

    chequear("la cotización era de 2 unidades", r.cotizacion && r.cotizacion.uds === 2, `uds=${r.cotizacion && r.cotizacion.uds}`);
    chequear("el pedido NO se perdió", r.pedidos.length === 1, `se guardaron ${r.pedidos.length}`);
    chequear(
      "🔑 quedó marcado porque la cantidad no cuadra",
      r.pedido && r.pedido.precio_no_cuadra === true,
      JSON.stringify(r.pedido && { unidades: r.pedido.unidades, total: r.pedido.total, precio_no_cuadra: r.pedido.precio_no_cuadra })
    );
    chequear(
      "y el motivo nombra la cantidad",
      /unidad/.test(String(r.pedido && r.pedido.motivo_precio)),
      String(r.pedido && r.pedido.motivo_precio)
    );
    chequear("🚦 NO está listo para despachar", r.pedido && !store.listoParaDespachar(r.pedido), store.textoDeRevision(r.pedido));
    chequear(
      "🔑 y al cliente no se le confirmó la venta",
      !/confirmad/i.test(r.ultima.reply),
      r.ultima.reply
    );
  }

  // ==========================================================================
  console.log("\n── 11. 🔒 La respuesta final se revalida tras TODAS las transformaciones ──");
  // Corregir una promesa es una transformación de texto, y una transformación de
  // texto puede romper el precio. Este es el último punto donde se revisa lo que
  // el cliente va a leer de verdad.
  // ==========================================================================
  {
    const tel = "573001110011";
    const r = await recorrer(tel, [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      {
        cliente: "Cali",
        ia: "Sale hoy mismo y el total es $82.000. Pásame nombre completo, dirección con barrio y celular",
      },
    ]);
    const texto = r.ultima.reply;
    chequear("🔑 el total sigue entero, sin partirse", /\$82\.000/.test(texto), texto);
    chequear("   y no quedó un «.000» huérfano", !/\.000\b/.test(texto.replace(/\$\d{1,3}\.\d{3}/g, "")), texto);
    chequear("la promesa de fecha no salió", !/hoy mismo/i.test(texto), texto);
    chequear(
      "y el mensaje final pasa la validación de precio",
      cotizacion.validarRespuesta(texto, r.cotizacion, {}).ok,
      JSON.stringify(cotizacion.validarRespuesta(texto, r.cotizacion, {}).problemas)
    );
  }

  // ==========================================================================
  console.log("\n── 12. 🔗 RECORRIDO: corrección vs compra adicional vs ambigüedad ──");
  // De la revisión: cotizacion_id era `política|ciudad|unidades|total`, o sea una
  // TARIFA. Dos compras distintas del mismo producto daban el mismo id, así que el
  // pedido de un destinatario se escribía encima del de otro y quedaba despachable.
  //
  // Los cuatro recorridos que pidió la revisión, de mensaje a mensaje.
  // ==========================================================================

  /** Arma el cuadro de confirmación con los datos que se le pasen. */
  const cuadroDe = (d) =>
    `Confirmemos tu pedido:\nNombre: ${d.nombre}\nCelular: ${d.celular}\nCiudad: ${d.ciudad}\n` +
    `Dirección: ${d.direccion}\nColor de la franja: ${d.color}\nTalla: ${d.talla}\n` +
    `Pago: contraentrega\nTOTAL: ${pesos(d.total)}\n¿Está todo bien? Respóndeme «SÍ CONFIRMO» y lo despacho 🏍️`;

  const A = {
    nombre: "Ana Restrepo", celular: "3004440001", ciudad: "Cali",
    direccion: "Cra 1 #1-11 barrio Uno", color: "rojo", talla: "M",
    pago: "contraentrega", total: 82000, unidades: 1,
  };

  // ── 12a. Corrección EXPLÍCITA de la dirección del pedido pendiente ──────
  {
    const tel = "573004440001";
    const r = await recorrer(tel, [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Ana Restrepo, Cra 1 #1-11 barrio Uno, 3004440001, talla M roja", ia: cuadroDe(A) },
      // El bot emite el bloque antes del sí → queda sin confirmar.
      { cliente: "mmm dame un segundo", ia: `Con gusto. ${ORDER(A)}` },
      // 🔧 Y AHORA el cliente CORRIGE la dirección y confirma.
      {
        cliente: "ojo, me equivoqué: la dirección es Cra 9 #45-12 barrio Prado. Sí confirmo",
        ia: `¡Listo Ana! ${ORDER({ ...A, direccion: "Cra 9 #45-12 barrio Prado" })}`,
      },
    ]);
    chequear("12a· 🔑 la corrección NO duplica la venta", r.pedidos.length === 1, `hay ${r.pedidos.length}`);
    chequear("12a· la dirección corregida quedó", /Prado/.test(String(r.pedido.direccion)), r.pedido.direccion);
    chequear("12a· el destinatario no cambió", r.pedido.nombre === "Ana Restrepo", r.pedido.nombre);
    chequear("12a· se levantó la marca de sin confirmar", !r.pedido.sin_confirmar);
    chequear("12a· 🚦 y queda LISTO para despachar", store.listoParaDespachar(r.pedido), store.textoDeRevision(r.pedido));
    chequear(
      "12a· con la corrección registrada",
      Array.isArray(r.pedido.correcciones_aplicadas) && /direccion/.test(String(r.pedido.correcciones_aplicadas)),
      JSON.stringify(r.pedido.correcciones_aplicadas)
    );
  }

  // ── 12b. COMPRA ADICIONAL del mismo producto para OTRO destinatario ──────
  {
    const tel = "573004440002";
    const B1 = { ...A, nombre: "Clara Ruiz", celular: "3004440002", direccion: "Cra 1 #1-11 barrio Uno" };
    const B2 = { ...B1, nombre: "Diego Ruiz", direccion: "Cra 2 #2-22 barrio Dos" };
    const r = await recorrer(tel, [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Clara Ruiz, Cra 1 #1-11 barrio Uno, 3004440002, talla M roja", ia: cuadroDe(B1) },
      // ⚠️ "espera" NO sirve acá: confirmacion.js lo lee como un NO y el pedido no
      // se guarda. Hace falta algo que caiga en "no se sabe" para que quede pendiente.
      { cliente: "dame un segundo", ia: `Con gusto. ${ORDER(B1)}` },
      // 🔑 Segunda compra, MISMO producto y MISMA tarifa, OTRO destinatario.
      // No dice que se equivocó: dice que quiere otro para otra persona.
      {
        cliente: "sí confirmo. Y quiero otro igual para Diego Ruiz, Cra 2 #2-22 barrio Dos",
        ia: `¡Listo! ${ORDER(B2)}`,
      },
    ]);
    chequear("12b· 🔑 se conservan LOS DOS pedidos", r.pedidos.length === 2, `hay ${r.pedidos.length}`);
    chequear(
      "12b· 🔑 el de Clara NO se sobrescribió",
      r.pedidos.some((p) => p.nombre === "Clara Ruiz" && /barrio Uno/.test(String(p.direccion))),
      JSON.stringify(r.pedidos.map((p) => ({ nombre: p.nombre, dir: p.direccion })))
    );
    chequear(
      "12b· y el de Diego también está",
      r.pedidos.some((p) => p.nombre === "Diego Ruiz"),
      JSON.stringify(r.pedidos.map((p) => p.nombre))
    );
    chequear(
      "12b· 🚦 NINGUNO queda listo para despachar",
      r.pedidos.every((p) => store.listoParaDespachar(p) === false),
      r.pedidos.map((p) => store.textoDeRevision(p)).join(" || ")
    );
    chequear(
      "12b· y el motivo dice que cambia a quién va dirigido",
      r.pedidos.some((p) => /cambia a QUIÉN va dirigido/.test(String(p.motivo_precio))),
      r.pedidos.map((p) => p.motivo_precio).join(" || ")
    );
  }

  // ── 12c. CASO AMBIGUO: cambia la dirección y NADIE pidió corregir ────────
  {
    const tel = "573004440003";
    const C1 = { ...A, nombre: "Elena Mora", celular: "3004440003", direccion: "Cra 1 #1-11 barrio Uno" };
    const C2 = { ...C1, direccion: "Cra 3 #3-33 barrio Tres" };
    const r = await recorrer(tel, [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Elena Mora, Cra 1 #1-11 barrio Uno, 3004440003, talla M roja", ia: cuadroDe(C1) },
      { cliente: "ya te digo", ia: `Con gusto. ${ORDER(C1)}` },
      // 🔑 Otra dirección, sin ninguna señal de corrección. No se puede saber si se
      // equivocó, si es otra entrega, o si el modelo se confundió.
      { cliente: "sí confirmo", ia: `¡Listo Elena! ${ORDER(C2)}` },
    ]);
    chequear("12c· 🔑 ante la duda se conservan los dos", r.pedidos.length === 2, `hay ${r.pedidos.length}`);
    chequear(
      "12c· 🔑 la dirección original NO se perdió",
      r.pedidos.some((p) => /barrio Uno/.test(String(p.direccion))),
      JSON.stringify(r.pedidos.map((p) => p.direccion))
    );
    chequear(
      "12c· 🚦 ninguno despachable",
      r.pedidos.every((p) => store.listoParaDespachar(p) === false),
      r.pedidos.map((p) => store.textoDeRevision(p)).join(" || ")
    );
    chequear(
      "12c· y el motivo dice que nadie pidió corrección",
      r.pedidos.some((p) => /no pidió ninguna corrección/.test(String(p.motivo_precio))),
      r.pedidos.map((p) => p.motivo_precio).join(" || ")
    );
  }

  // ── 12d. El MISMO mensaje repetido NO duplica la venta ───────────────────
  {
    const tel = "573004440004";
    const D = { ...A, nombre: "Fabio Lara", celular: "3004440004" };
    const r = await recorrer(tel, [
      { cliente: "hola", ia: "¡Hola! ¿Para qué ciudad sería?" },
      { cliente: "Cali", ia: "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular" },
      { cliente: "Fabio Lara, Cra 1 #1-11 barrio Uno, 3004440004, talla M roja", ia: cuadroDe(D) },
      { cliente: "un momento", ia: `Con gusto. ${ORDER(D)}` },
      // El cliente confirma y el bot vuelve a emitir EL MISMO bloque.
      { cliente: "sí confirmo", ia: `¡Listo Fabio! ${ORDER(D)}` },
      // Y lo emite otra vez, idéntico.
      { cliente: "gracias", ia: `Con gusto 🙌 ${ORDER(D)}` },
    ]);
    chequear("12d· 🔑 UNA sola venta", r.pedidos.length === 1, `hay ${r.pedidos.length}`);
    chequear("12d· sin marca de sin confirmar", !r.pedido.sin_confirmar);
    chequear("12d· 🚦 y LISTO para despachar", store.listoParaDespachar(r.pedido), store.textoDeRevision(r.pedido));
    chequear("12d· sin correcciones inventadas", r.pedido.correcciones_aplicadas === undefined, JSON.stringify(r.pedido.correcciones_aplicadas));
  }

  // ── 12e. 🏷️ El identificador de oferta PERSISTE durante la compra ────────
  {
    const tel = "573004440005";
    const ids = [];
    for (const m of ["hola", "Cali", "talla M", "franja roja", "Gabriel Soto, Cra 1 #1-11, 3004440005"]) {
      ia.poner("Listo, seguimos 🙌");
      await agent.generateReply(tel, m);
      const c = store.leerCotizacion(tel);
      if (c && c.oferta_id) ids.push(c.oferta_id);
    }
    const unicos = [...new Set(ids)];
    chequear(
      "12e· 🔑 el mismo id de oferta en todos los mensajes de la compra",
      unicos.length === 1,
      `hubo ${unicos.length} ids distintos: ${JSON.stringify(unicos)}`
    );
    chequear("12e· y no es la firma de la tarifa", !/^2026/.test(unicos[0] || ""), unicos[0]);
    // Y si cambian las condiciones, la oferta es otra.
    ia.poner("Los dos te quedan en $148.000 en total 📦");
    await agent.generateReply(tel, "mejor quiero dos conjuntos");
    const despues = store.leerCotizacion(tel);
    chequear(
      "12e· 🔑 pero al cambiar la cantidad, es OTRA oferta",
      despues.oferta_id !== unicos[0],
      `antes ${unicos[0]}, después ${despues.oferta_id}`
    );
  }

  // ==========================================================================
  console.log("\n── 13. 🔴 EL CASO DEL 26-SEP, recorrido completo ──");
  // Caso real (datos cambiados). El cliente pidió DOS conjuntos enumerando tallas,
  // por notas de voz, y salió mal en cascada:
  //   · la cantidad se leyó como UNA
  //   · el modelo intentaba cotizar los dos → la etapa 5 lo rechazaba → salía la
  //     línea de precio de UNA unidad, cuatro veces, contra preguntas distintas
  //   · el pedido quedó bloqueado, y al cliente se le dio las gracias por su compra
  // ==========================================================================
  {
    const tel = "573005550013";
    const FRASE_TALLAS = "Exactamente, la una talla normal XL y la otra es L normal. Bueno, muchas gracias, me confirma.";

    // 1) Ciudad → total de UNA (todavía no dijo cuántos)
    let t = await turno(tel, "hola, cuánto vale?", "Son $59.900 el conjunto + envío. ¿Para qué ciudad sería?");
    t = await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí, y pagas todo junto al recibir 📦");
    chequear("13· con una unidad, el total es el de una", store.leerCotizacion(tel).total === 82000, `${store.leerCotizacion(tel).total}`);

    // 2) 🔑 Y ACÁ dice que son DOS, enumerando las tallas.
    t = await turno(
      tel,
      FRASE_TALLAS,
      // El modelo cotiza los dos, que ahora ES lo correcto.
      "¡Listo! Los dos te quedan en $148.000 en total: $110.000 los dos conjuntos + $38.000 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular"
    );
    const cot = store.leerCotizacion(tel);
    chequear("13· 🔑 la cantidad se reconoce: DOS conjuntos", cot.uds === 2, `uds=${cot.uds}`);
    chequear("13· y el total pasa al de dos", cot.total === 148000, `${cot.total}`);
    chequear(
      "13· 🔑 la respuesta del modelo YA NO se rechaza",
      /\$148\.000/.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear(
      "13· 🔑 y NO salió la línea de precio de una unidad",
      !/^Te queda en \$82\.000/.test(t.reply.trim()),
      `salió: ${t.reply}`
    );

    // 3) La oficina: no se asegura, y no se promete lo que hará la transportadora.
    t = await turno(
      tel,
      "me lo manda a la oficina de Terranova que me queda más cerca",
      "¡Excelente decisión! Te lo enviamos a la oficina de Interrapidísimo en Terranova, Jamundí. Ellos te enviarán un mensaje de texto cuando esté listo para reclamar."
    );
    chequear(
      "13· 🔑 no asegura esa oficina como verificada",
      !/oficina de Interrapidísimo en Terranova/i.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear(
      "13· y no promete lo que hará la transportadora",
      !/ellos te enviar/i.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear(
      "13· pero SÍ conserva que se puede enviar a oficina",
      /oficina/i.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear("13· 🙋 y avisa para revisar el chat", t.revisionHumana !== null, JSON.stringify(t.revisionHumana));

    // ==========================================================================
    // 4) 🔴 LA PAUSA ES REAL: el bot deja de contestar
    //
    // ⚠️ ESTA PRUEBA ESTABA MAL. La versión anterior seguía llamando a
    // generateReply() después de la pausa y terminaba declarando el pedido
    // despachable. Pero `generateReply` NO mira la pausa —el que la mira es
    // server.js antes de llamarlo— así que la prueba pasaba por un camino que en
    // producción no existe: el bot callado no habría armado ese pedido.
    // ==========================================================================
    chequear("13· 🔑 el chat quedó en pausa de verdad", store.isPaused(tel) === true);

    const fuenteServer = require("fs").readFileSync(`${__dirname}/src/server.js`, "utf8");
    chequear(
      "13· y server.js NO llama al bot cuando está en pausa",
      /if \(store\.isPaused\(from\)\)/.test(fuenteServer),
      "sin ese guardia la pausa no sirve de nada"
    );

    // Así que se simula el guardia real: mientras esté en pausa, no se contesta.
    const comoEnProduccion = async (texto) => {
      if (store.isPaused(tel)) return { reply: null, pausado: true };
      return turno(tel, texto, "(el bot no debería llegar acá)");
    };
    const r1 = await comoEnProduccion("¿y cuándo me llega?");
    chequear("13· 🔑 el cliente escribe y el bot NO contesta", r1.pausado === true && r1.reply === null);
    chequear(
      "13· y NO se creó ningún pedido mientras estaba en pausa",
      store.todosLosPedidos().filter((p) => p.telefono_chat === tel).length === 0,
      "el bot callado no puede estar armando pedidos"
    );

    // ==========================================================================
    // 5) 🔑 LA REVISIÓN DE LA OFICINA SE RESUELVE EXPLÍCITAMENTE, O NO SE DESPACHA
    // ==========================================================================
    // El dueño verifica y devuelve el chat al bot (el botón del panel).
    store.setPaused(tel, false);
    const datos = {
      nombre: "Petra Vargas", celular: "3005550013", ciudad: "Jamundí",
      direccion: "OFICINA Interrapidísimo - Terranova", color: "verde",
      talla: "XL y L", unidades: 2, pago: "contraentrega", total: 148000,
    };
    await turno(tel, "Petra Vargas, 3005550013", CUADRO(148000).replace("Ana Gómez", "Petra Vargas").replace("3001234567", "3005550013").replace("Cali", "Jamundí"));
    await turno(tel, "sí confirmo", `¡Listo Petra! ${ORDER(datos)}`);

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("13· el pedido se guarda con 2 unidades", pedido && Number(pedido.unidades) === 2, `${pedido && pedido.unidades}`);
    chequear("13· cobrando los dos", pedido && Number(pedido.total) === 148000, `${pedido && pedido.total}`);
    chequear(
      "13· 🔑 la cantidad ya NO lo bloquea",
      pedido && !pedido.precio_no_cuadra,
      String(pedido && pedido.motivo_precio)
    );
    // 🔑 Y ACÁ ESTÁ LA CORRECCIÓN: el cliente nombró Terranova como REFERENCIA de su
    // zona, no la exigió. Así que el pedido sigue normal — la transportadora asigna
    // la oficina. Bloquearlo era convertir un dato útil en una traba.
    chequear(
      "13· 🔑 el pedido a oficina NO se bloquea",
      pedido && store.listoParaDespachar(pedido) === true,
      store.textoDeRevision(pedido)
    );
    chequear(
      "13· y la referencia del cliente se conserva",
      pedido && (pedido.sede_referencia === "Terranova" || /Terranova/.test(String(pedido.direccion))),
      JSON.stringify({ ref: pedido && pedido.sede_referencia, dir: pedido && pedido.direccion })
    );
    chequear(
      "13· sin marcarla como sede pedida",
      pedido && !pedido.sede_pedida,
      `sede_pedida=${pedido && pedido.sede_pedida}`
    );
  }

  // ==========================================================================
  console.log("\n── 14. 🔁 El candado no deja al cliente atrapado ──");
  // Lo que el cliente vivió: preguntó por las tallas y recibió un precio. Cuatro veces.
  // ==========================================================================
  {
    const tel = "573005550014";
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Cali", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular");

    // El cliente pregunta por las TALLAS y el modelo contesta con un importe inválido.
    const t1 = await turno(
      tel,
      "una preguntica, quiero que me explique cómo son las tallas",
      "Las tallas van de S a 3XL y cada conjunto sale en $70.000.",
      "Las tallas van de S a 3XL y cada conjunto sale en $70.000."
    );
    chequear(
      "14· 🔑 preguntó por TALLAS y NO se le contesta con un precio",
      !/\$82\.000/.test(t1.reply),
      `salió: ${t1.reply}`
    );
    chequear("14· se le contesta algo, no silencio", t1.reply.trim().length > 20, JSON.stringify(t1.reply));
    // 🔑 Y lo importante: se CONSERVA la parte que contestaba la pregunta. Antes se
    // tiraba la respuesta entera y se escalaba; eso dejaba al cliente esperando a
    // una persona por algo que el propio texto ya explicaba.
    chequear(
      "14· 🔑 se conserva la explicación de las tallas",
      /3XL/.test(t1.reply),
      `salió: ${t1.reply}`
    );
    chequear("14· y se quitó el importe inválido", !/\$70\.000/.test(t1.reply), `salió: ${t1.reply}`);
    chequear(
      "14· 🙋 y NO hace falta un humano: la conversación quedó resuelta",
      t1.revisionHumana === null,
      JSON.stringify(t1.revisionHumana)
    );

    // Pero si NO queda nada que salvar, ahí sí se escala.
    const tel3 = "573005550016";
    await turno(tel3, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel3, "Cali", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame tus datos");
    const t2 = await turno(tel3, "y cómo son las tallas?", "Cada uno sale en $70.000.", "Cada uno sale en $70.000.");
    chequear("14· 🔑 si no hay nada que salvar, SÍ se escala", t2.revisionHumana !== null, JSON.stringify(t2.revisionHumana));
    chequear("14· y no sale el importe inválido", !/\$70\.000/.test(t2.reply), `salió: ${t2.reply}`);

    // Y si el turno siguiente vuelve a fallar, no se repite la misma línea.
    const tel2 = "573005550015";
    await turno(tel2, "hola", "¡Hola! ¿Para qué ciudad sería?");
    const p1 = await turno(tel2, "Cali", "El envío a Cali es $82.000.", "El envío a Cali es $82.000.");
    chequear("14· contestar la ciudad SÍ da el precio calculado", /\$82\.000/.test(p1.reply) && /de envío/.test(p1.reply), p1.reply);
    const p2 = await turno(tel2, "y a Palmira?", "El envío a Palmira es $82.000.", "El envío a Palmira es $82.000.");
    chequear(
      "14· 🔑 pero NO se repite la misma línea dos turnos seguidos",
      p2.reply.trim() !== p1.reply.trim(),
      `las dos veces salió: ${p2.reply}`
    );
  }

  // ==========================================================================
  console.log("\n── 15. 🏢 Los DOS recorridos de entrega en oficina ──");
  // Operación real: se registra ciudad + entrega en oficina de Interrapidísimo, y la
  // SEDE de recogida la asigna la transportadora.
  //   · nombrarla como referencia  → el pedido sigue normal
  //   · exigirla en exclusiva      → se conserva y se pide aclaración
  // ==========================================================================

  // ── 15a. La nombra como REFERENCIA → sigue normal ────────────────────────
  {
    const tel = "573006660015";
    const datos = {
      nombre: "Rosa Lara", celular: "3006660015", ciudad: "Jamundí",
      direccion: "OFICINA Interrapidísimo - Terranova", color: "negro",
      talla: "L", unidades: 1, pago: "contraentrega", total: 82000,
    };
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular");
    const t = await turno(
      tel,
      "me lo manda a Terranova que me queda más cerca",
      "¡Claro! Te lo enviamos a la oficina de Interrapidísimo en Terranova, Jamundí."
    );
    chequear(
      "15a· 🔑 el mensaje NO promete la sede",
      !/oficina de Interrapidísimo en Terranova/i.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear(
      "15a· y usa Terranova como REFERENCIA de su zona",
      /referencia de tu zona/.test(t.reply) && /Terranova/.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear(
      "15a· prometiendo solo lo que sí controlamos",
      /te compartimos la oficina asignada/.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear("15a· corto y sin advertencias", !/no puedo|no podemos|lamentablemente/i.test(t.reply), t.reply);

    store.setPaused(tel, false);
    await turno(tel, "Rosa Lara, 3006660015, talla L negra", CUADRO(82000).replace("Ana Gómez", "Rosa Lara").replace("3001234567", "3006660015").replace("Cali", "Jamundí"));
    await turno(tel, "sí confirmo", `¡Listo Rosa! ${ORDER(datos)}`);
    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear(
      "15a· 🔑 el pedido a oficina queda DESPACHABLE",
      pedido && store.listoParaDespachar(pedido) === true,
      store.textoDeRevision(pedido)
    );
    chequear("15a· con la referencia guardada", pedido && pedido.sede_referencia === "Terranova", `${pedido && pedido.sede_referencia}`);
    chequear("15a· y sin marca de sede pedida", pedido && !pedido.sede_pedida);
  }

  // ── 15b. La EXIGE en exclusiva → se conserva y se pide aclaración ─────────
  {
    const tel = "573006660016";
    const datos = {
      nombre: "Iván Soto", celular: "3006660016", ciudad: "Jamundí",
      direccion: "OFICINA Interrapidísimo - Terranova", color: "negro",
      talla: "L", unidades: 1, pago: "contraentrega", total: 82000,
    };
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular");
    await turno(tel, "tiene que ser en la oficina de Terranova, si no es ahí no me sirve", "Entendido, lo registro así.");
    store.setPaused(tel, false);
    await turno(tel, "Iván Soto, 3006660016, talla L negra", CUADRO(82000).replace("Ana Gómez", "Iván Soto").replace("3001234567", "3006660016").replace("Cali", "Jamundí"));
    await turno(tel, "sí confirmo", `¡Listo Iván! ${ORDER(datos)}`);

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("15b· 🔑 exigir la sede SÍ frena el despacho", pedido && store.listoParaDespachar(pedido) === false, store.textoDeRevision(pedido));
    chequear("15b· y queda anotada como sede pedida", pedido && pedido.sede_pedida === "Terranova", `${pedido && pedido.sede_pedida}`);
    chequear(
      "15b· 🔑 sin cambiarle la dirección en silencio",
      pedido && /Terranova/.test(String(pedido.direccion)),
      `${pedido && pedido.direccion}`
    );
    chequear(
      "15b· el aviso explica que la asigna la transportadora",
      /la oficina la asigna la transportadora/.test(store.textoDeRevision(pedido)),
      store.textoDeRevision(pedido)
    );
    chequear(
      "15b· y al resolverlo queda despachable",
      store.listoParaDespachar({ ...pedido, sede_resuelta: true }) === true
    );
  }

  // ==========================================================================
  console.log("\n── 16. 🙋 «Solo» tiene que hablar del LUGAR, no de otra cosa ──");
  // 🔴 Reproducido: exigeSedeUnica() daba true para "Solo quiero un impermeable",
  // "¿Solo pago cuando llegue?" y "Solo la talla L". Y agent.js lo buscaba en
  // CUALQUIER mensaje del historial, así que un "solo" sobre la talla frenaba el
  // pedido si la dirección nombraba Terranova.
  // ==========================================================================

  const pedidoOficina = (nombre, cel) => ({
    nombre, celular: cel, ciudad: "Jamundí",
    direccion: "OFICINA Interrapidísimo - Terranova", color: "negro",
    talla: "L", unidades: 1, pago: "contraentrega", total: 82000,
  });
  const cuadroJamundi = (nombre, cel) =>
    CUADRO(82000).replace("Ana Gómez", nombre).replace("3001234567", cel).replace("Cali", "Jamundí");

  // ── 16a. Los tres «solo» que NO son del lugar ────────────────────────────
  {
    const tel = "573007770016";
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular");
    // Los tres falsos positivos, dichos de verdad en la conversación.
    await turno(tel, "Solo quiero un impermeable", "¡Perfecto, uno entonces!");
    await turno(tel, "¿Solo pago cuando llegue?", "Así es, pagas contraentrega cuando lo recibes 📦");
    await turno(tel, "Solo la talla L", "¡Listo, talla L!");
    // Y nombra Terranova como referencia, sin exigirla.
    await turno(tel, "me lo manda a Terranova que me queda cerca", "¡Claro! Te lo enviamos a oficina de Interrapidísimo en Jamundí.");
    store.setPaused(tel, false);
    await turno(tel, "Hugo Prieto, 3007770016", cuadroJamundi("Hugo Prieto", "3007770016"));
    await turno(tel, "sí confirmo", `¡Listo Hugo! ${ORDER(pedidoOficina("Hugo Prieto", "3007770016"))}`);

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear(
      "16a· 🔑 tres «solo» sobre cantidad, pago y talla NO frenan la sede",
      pedido && store.listoParaDespachar(pedido) === true,
      store.textoDeRevision(pedido)
    );
    chequear("16a· y no se marcó sede pedida", pedido && !pedido.sede_pedida, `sede_pedida=${pedido && pedido.sede_pedida}`);
    chequear("16a· la referencia sí se guarda", pedido && pedido.sede_referencia === "Terranova", `${pedido && pedido.sede_referencia}`);
  }

  // ── 16b. 🔑 El caso positivo: lo exige de verdad ──────────────────────────
  {
    const tel = "573007770017";
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular");
    await turno(tel, "únicamente en Terranova; otra oficina no me sirve", "Entendido, lo anoto así.");
    store.setPaused(tel, false);
    await turno(tel, "Nora Quintero, 3007770017", cuadroJamundi("Nora Quintero", "3007770017"));
    await turno(tel, "sí confirmo", `¡Listo Nora! ${ORDER(pedidoOficina("Nora Quintero", "3007770017"))}`);

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("16b· 🔑 la exigencia SÍ frena el despacho", pedido && store.listoParaDespachar(pedido) === false, store.textoDeRevision(pedido));
    chequear("16b· con la sede anotada", pedido && pedido.sede_pedida === "Terranova", `${pedido && pedido.sede_pedida}`);
    chequear("16b· y la dirección intacta", pedido && /Terranova/.test(String(pedido.direccion)), `${pedido && pedido.direccion}`);
    chequear(
      "16b· el aviso explica quién asigna la oficina",
      /la oficina la asigna la transportadora/.test(store.textoDeRevision(pedido)),
      store.textoDeRevision(pedido)
    );
  }

  // ── 16c. 🔑 Y si DESPUÉS acepta la que asignen, queda resuelta ────────────
  {
    const tel = "573007770018";
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Jamundí", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Jamundí. Pásame nombre completo, dirección con barrio y celular");
    // Primero la exige…
    await turno(tel, "tiene que ser en la oficina de Terranova", "Entendido.");
    store.setPaused(tel, false);
    // …se le explica, y la acepta.
    await turno(tel, "ah bueno, la que asignen está bien entonces", "¡Perfecto! Te compartimos la oficina asignada cuando tengamos la guía.");
    store.setPaused(tel, false);
    await turno(tel, "Omar Cifuentes, 3007770018", cuadroJamundi("Omar Cifuentes", "3007770018"));
    await turno(tel, "sí confirmo", `¡Listo Omar! ${ORDER(pedidoOficina("Omar Cifuentes", "3007770018"))}`);

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear(
      "16c· 🔑 la exigencia anterior queda RESUELTA y se puede despachar",
      pedido && store.listoParaDespachar(pedido) === true,
      store.textoDeRevision(pedido)
    );
    chequear("16c· gana la última señal, no la primera", pedido && !pedido.sede_pedida, `sede_pedida=${pedido && pedido.sede_pedida}`);
    chequear("16c· y queda constancia de que la aceptó", pedido && pedido.sede_resuelta === true, `sede_resuelta=${pedido && pedido.sede_resuelta}`);
  }

  // ==========================================================================
  console.log("\n── 17. 📍 El municipio dicho en el saludo NO se pierde ──");
  // Caso real del 26-sep (datos cambiados). El cliente abrió con
  // "Hola buenos días, Pitalito Huila" — ahí ya había dicho su municipio— y el
  // recorrido lo perdió. Dos horas y media después preguntó "Cuánto es el precio" y
  // volvió a recibir "déjame confirmar el envío", con el chat mandado a un humano.
  // ==========================================================================
  {
    const tel = "573008880017";

    // 1️⃣ El saludo con el municipio adentro.
    const t1 = await turno(
      tel,
      "Hola buenos días, Pitalito Huila",
      "¡Hola! 🏍️ Es el conjunto de 4 piezas. Te queda en $85.000 en total puesto en Pitalito, y pagas al recibir 📦"
    );
    const cot1 = store.leerCotizacion(tel);
    chequear("17· 🔑 el municipio se identifica desde el saludo", Boolean(cot1) && /pitalito/i.test(String(cot1.ciudad)), JSON.stringify(cot1 && cot1.ciudad));
    chequear("17· con la tarifa predeterminada", cot1 && cot1.total === 85000, `${cot1 && cot1.total}`);
    chequear(
      "17· 🔑 y marcada reconocida:false — no se presenta como flete medido",
      cot1 && cot1.reconocida === false,
      `reconocida=${cot1 && cot1.reconocida}`
    );
    chequear("17· el prompt avisa que no está en el tarifario", /NO está en el tarifario/.test(t1.prompts[0] || ""), "sin el aviso el modelo lo dice como si fuera medido");
    chequear("17· y NO se derivó a un humano", t1.revisionHumana === null, JSON.stringify(t1.revisionHumana));

    // 2️⃣ "Gracias" — un mensaje que no dice nada del destino.
    await turno(tel, "Gracias", "¡Con gusto! ¿Te ayudo con la talla?");
    const cot2 = store.leerCotizacion(tel);
    chequear("17· «Gracias» no borra el destino", cot2 && /pitalito/i.test(String(cot2.ciudad)), JSON.stringify(cot2 && cot2.ciudad));

    // 3️⃣ Y horas después vuelve a preguntar el precio.
    const t3 = await turno(
      tel,
      "Cuánto es el precio",
      "Te queda en $85.000 en total puesto en Pitalito, y pagas al recibir 📦"
    );
    chequear(
      "17· 🔑 la pregunta posterior SÍ recibe el precio",
      /\$85\.000/.test(t3.reply),
      `salió: ${t3.reply}`
    );
    chequear(
      "17· 🔑 y NO vuelve a salir «déjame confirmar el envío»",
      !/confirmarte bien el valor del envío/i.test(t3.reply),
      `salió: ${t3.reply}`
    );
    chequear("17· 🔑 ni se deriva a un humano", t3.revisionHumana === null, JSON.stringify(t3.revisionHumana));
    chequear("17· el chat NO quedó en pausa", !store.isPaused(tel));
  }

  // ==========================================================================
  console.log("\n── 18. 📍 Sin ciudad se PREGUNTA, no se escala ──");
  // La otra mitad del caso: cuando de verdad no hay destino, el bot pide la ciudad.
  // Mandarlo a una persona por un dato que el bot puede pedir deja al cliente
  // esperando por nada.
  // ==========================================================================
  {
    const tel = "573008880018";
    const t = await turno(
      tel,
      "buenas, cuánto vale?",
      // El modelo intenta un total sin destino: la etapa 5 lo rechaza dos veces.
      "Te queda en $82.000 en total.",
      "Te queda en $82.000 en total."
    );
    chequear("18· 🔑 se le PREGUNTA la ciudad", /qu[eé] ciudad/i.test(t.reply), `salió: ${t.reply}`);
    chequear("18· 🔑 y NO se deriva a un humano", t.revisionHumana === null, JSON.stringify(t.revisionHumana));
    chequear("18· el chat sigue con el bot", !store.isPaused(tel));

    // Y varios destinos siguen pidiendo aclaración, sin elegir uno.
    const tel2 = "573008880019";
    const t2 = await turno(
      tel2,
      "cuánto a Cali y cuánto a Pasto?",
      "Te queda en $82.000 en total.",
      "Te queda en $82.000 en total."
    );
    chequear("18· 🔑 con varios destinos pregunta cuál", /cu[aá]l de esas ciudades/i.test(t2.reply), `salió: ${t2.reply}`);
    chequear("18· sin elegir uno por su cuenta", !/\$82\.000|\$85\.000/.test(t2.reply), `salió: ${t2.reply}`);
    chequear("18· y tampoco escala", t2.revisionHumana === null, JSON.stringify(t2.revisionHumana));
  }

  // ==========================================================================
  console.log("\n── 19. 🛡️ «estoy en el trabajo» NO es un municipio cotizable ──");
  // Reportado sobre f213031: `destinoDelHilo({messages:[]}, "estoy en el trabajo")`
  // devolvía ciudad:"el trabajo" y `calcular()` autorizaba $85.000. Un lugar donde
  // el cliente ESTÁ no es un destino de despacho: hay que pedirle la ciudad,
  // conservando el reconocimiento de los municipios válidos.
  // ==========================================================================
  {
    const tel = "573008880020";
    const t = await turno(
      tel,
      "estoy en el trabajo",
      // El modelo intenta cotizar: la etapa 5 lo rechaza las dos veces.
      "Te queda en $85.000 en total puesto en el trabajo.",
      "Te queda en $85.000 en total puesto en el trabajo."
    );
    chequear("19· 🔑 no sale ningún precio sobre un lugar genérico", !/\$85\.000|\$82\.000/.test(t.reply), `salió: ${t.reply}`);
    chequear("19· 🔑 se le PREGUNTA la ciudad", /qu[eé] ciudad/i.test(t.reply), `salió: ${t.reply}`);
    chequear(
      "19· 🔑 y NO se guardó una cotización de «el trabajo»",
      store.leerCotizacion(tel) === null || !/trabajo/i.test(String((store.leerCotizacion(tel) || {}).ciudad)),
      JSON.stringify(store.leerCotizacion(tel))
    );
    chequear("19· sin derivar a un humano", t.revisionHumana === null, JSON.stringify(t.revisionHumana));
    chequear("19· el chat sigue con el bot", !store.isPaused(tel));

    // 🔑 Y en el turno siguiente, cuando SÍ dice el municipio, se cotiza normal.
    const t2 = await turno(
      tel,
      "ah perdón, estoy en Pitalito Huila",
      "Te queda en $85.000 en total puesto en Pitalito, y pagas al recibir 📦"
    );
    const cot = store.leerCotizacion(tel);
    chequear("19· 🔑 el municipio de verdad sí se reconoce", Boolean(cot) && /pitalito/i.test(String(cot.ciudad)), JSON.stringify(cot && cot.ciudad));
    chequear("19· con la tarifa predeterminada", cot && cot.total === 85000, `${cot && cot.total}`);
    chequear("19· y el precio llega al cliente", /\$85\.000/.test(t2.reply), `salió: ${t2.reply}`);
  }

  // ==========================================================================
  console.log("\n── 20. 🔁 El destino se recupera del historial, sin cotización guardada ──");
  // Reportado sobre f213031: con el historial de Padrino ya en el disco —el bot
  // pregunta la ciudad, el cliente contesta "Hola buenos días, Pitalito Huila", el
  // bot responde con esperas, el cliente dice "Gracias"— y SIN cotización guardada,
  // el turno "Cuánto es el precio" seguía devolviendo `no_hay`.
  //
  // 🔑 El historial se siembra a mano a propósito: así son AHORA los chats que ya
  // están en producción, abiertos por la versión que perdía el municipio. Si la
  // recuperación solo funcionara en chats nuevos, esos clientes seguirían colgados.
  // ==========================================================================
  {
    const tel = "573008880021";
    store.pushMsg(tel, "user", "Buenas");
    store.pushMsg(tel, "assistant", "¡Hola! 🏍️ ¿Para qué ciudad sería el envío?");
    store.pushMsg(tel, "user", "Hola buenos días, Pitalito Huila");
    store.pushMsg(tel, "assistant", "Permíteme confirmarte bien el valor del envío.");
    store.pushMsg(tel, "user", "Gracias");
    store.pushMsg(tel, "assistant", "Con gusto, ya te confirmo.");
    chequear("20· el chat arranca SIN cotización guardada", store.leerCotizacion(tel) === null, JSON.stringify(store.leerCotizacion(tel)));

    const t = await turno(
      tel,
      "Cuánto es el precio",
      "Te queda en $85.000 en total puesto en Pitalito, y pagas al recibir 📦"
    );
    chequear("20· 🔑 el destino se recupera y el precio sale", /\$85\.000/.test(t.reply), `salió: ${t.reply}`);
    chequear(
      "20· 🔑 NO se repite «déjame confirmar el envío»",
      !/confirmarte bien el valor del env[ií]o/i.test(t.reply),
      `salió: ${t.reply}`
    );
    chequear("20· 🔑 ni se deriva a un humano", t.revisionHumana === null, JSON.stringify(t.revisionHumana));
    chequear("20· el chat sigue con el bot", !store.isPaused(tel));
    const cot = store.leerCotizacion(tel);
    chequear("20· la cotización queda sobre Pitalito", Boolean(cot) && /pitalito/i.test(String(cot.ciudad)), JSON.stringify(cot && cot.ciudad));
    chequear("20· con la tarifa predeterminada", cot && cot.total === 85000, `${cot && cot.total}`);
    chequear("20· y marcada reconocida:false", cot && cot.reconocida === false, `reconocida=${cot && cot.reconocida}`);

    // 🔑 Una corrección posterior manda sobre lo que dijo antes.
    const tel2 = "573008880022";
    store.pushMsg(tel2, "user", "Buenas");
    store.pushMsg(tel2, "assistant", "¡Hola! 🏍️ ¿Para qué ciudad sería el envío?");
    store.pushMsg(tel2, "user", "Pitalito Huila");
    store.pushMsg(tel2, "assistant", "Permíteme confirmarte el envío.");
    store.pushMsg(tel2, "user", "no, mejor para Garzón Huila");
    store.pushMsg(tel2, "assistant", "Anotado.");
    const t2 = await turno(tel2, "cuánto queda", "Te queda en $85.000 en total puesto en Garzón, y pagas al recibir 📦");
    const cot2 = store.leerCotizacion(tel2);
    chequear("20· 🔑 gana la corrección posterior, no la primera ciudad", Boolean(cot2) && /garz[oó]n/i.test(String(cot2.ciudad)), JSON.stringify(cot2 && cot2.ciudad));
    chequear("20· y el precio sale sobre esa", /\$85\.000/.test(t2.reply), `salió: ${t2.reply}`);

    // 🔑 Un historial donde el cliente nunca dijo un municipio NO se rellena a dedo.
    const tel3 = "573008880023";
    store.pushMsg(tel3, "user", "Buenas");
    store.pushMsg(tel3, "assistant", "¡Hola! 🏍️ ¿Para qué ciudad sería el envío?");
    store.pushMsg(tel3, "user", "estoy en el trabajo, después te digo");
    store.pushMsg(tel3, "assistant", "Claro, cuando puedas me dices.");
    const t3 = await turno(
      tel3,
      "cuánto es",
      "Te queda en $85.000 en total.",
      "Te queda en $85.000 en total."
    );
    chequear("20· 🔑 sin municipio en el historial se PREGUNTA", /qu[eé] ciudad/i.test(t3.reply), `salió: ${t3.reply}`);
    chequear("20· sin inventar un precio", !/\$85\.000|\$82\.000/.test(t3.reply), `salió: ${t3.reply}`);
    chequear("20· y sin escalar", t3.revisionHumana === null, JSON.stringify(t3.revisionHumana));
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
