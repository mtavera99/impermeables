/**
 * «¿SON IMPERMEABLES?» EN UN HILO DE INTERCOMUNICADORES NO ES UN CAMBIO DE PRODUCTO.
 *
 * 🔴 EL CASO REAL (30-sep, cliente Fabian Tascon). El dueño lo vio en el panel:
 * un pedido que decía "🧥 Impermeable × 1 — $85.000" pero cuyo chat era un combo
 * de DOS intercomunicadores. El pedido no se "nombró mal": se cotizó, se cobró y
 * se guardó como el producto equivocado.
 *
 * QUÉ PASABA. `productoEn()` trata la raíz `impermeabl` como señal de producto,
 * porque hace falta para el cambio de vuelta legítimo ("y el impermeable cuánto
 * vale?"). Pero "impermeable" también es un ADJETIVO, y la pregunta más natural
 * sobre un aparato que se lleva en el casco bajo la lluvia es justamente
 * "¿son impermeables?". Esa pregunta:
 *
 *   1. se leía como cambio de producto al conjunto impermeable,
 *   2. volvía con `explicito: true`, así que `agent.js` la CONGELABA con
 *      `fijarProductoActivo` para el resto de la conversación,
 *   3. y desde ahí el guion, el precio y el pedido eran del producto equivocado.
 *
 * La asimetría era la prueba de que era un bug y no una decisión: "son resistentes
 * al agua?" se quedaba en el V10 y "son impermeables?" no. La misma pregunta.
 * Peor: la propia ficha del V10 lista "impermeable?" en `datosConfirmados.agua`,
 * o sea que una capa del código la trataba como pregunta del producto y la otra
 * como abandono del producto.
 *
 * 💰 POR QUÉ NO ERA COSMÉTICO. El combo de 2 V10 cuesta $70.000 de compra
 * ($35.000 × 2). Cobrado como un impermeable de banda E son $85.000, de los que
 * ~$25.100 se va en flete: quedan ~$59.900 para pagar algo que costó $70.000.
 * Cada vez que pasaba, la venta salía en PÉRDIDA. Esta batería tiene un bloque
 * que defiende justo eso.
 *
 *   node test-impermeable-es-adjetivo.js      (sin credenciales ni IA real)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

// El entorno se prepara ANTES de requerir agent.js: lee las variables al cargarse.
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "adjetivo-"));
process.env.DATA_DIR = DIR;
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba";
delete process.env.OWNER_PHONE;

const ia = { guion: [], prompts: [] };
global.fetch = async (url, opts) => {
  let cuerpo = {};
  try {
    cuerpo = JSON.parse(opts && opts.body ? opts.body : "{}");
  } catch {}
  ia.prompts.push((cuerpo.system_instruction && cuerpo.system_instruction.parts[0].text) || "");
  const texto = ia.guion.length ? ia.guion.shift() : "ok 👍";
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

const V = "intercom_v10_2x";
const IMP = "impermeable";
const ORDER = (o) => `##ORDER## ${JSON.stringify(o)}`;

let tel = 573950000000;
const nuevoTel = () => String(++tel);

/** Conversación ya fijada en un producto, como queda en producción. */
const hilo = (productoActivo, mensajes = []) => ({
  productoActivo,
  messages: mensajes.map((c) => ({ role: "user", content: c })),
});

const guionDelUltimoTurno = () => ia.prompts[ia.prompts.length - 1] || "";
const cualGuion = () => {
  const g = guionDelUltimoTurno();
  return /Intercomunicador V10 2X/.test(g) ? "V10" : /4 PIEZAS/.test(g) ? "impermeable" : "(arranque fijo)";
};

async function recorrer(telefono, turnos) {
  const respuestas = [];
  for (const { cliente, ia: guionIA } of turnos) {
    ia.guion = [].concat(guionIA || []);
    respuestas.push(await agent.generateReply(telefono, cliente));
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

(async () => {
  // =========================================================================
  console.log("\n── 1. EL CASO DE FABIAN TASCON: la pregunta no roba el producto ──");
  //
  // Estas son las formas en que la gente pregunta si un aparato aguanta la lluvia.
  // Ninguna puede sacar la conversación del V10.
  // =========================================================================
  {
    const preguntas = [
      "son impermeables?",
      "¿es impermeable?",
      "es impermeable",
      "son impermeables",
      "son bien impermeables?",
      "es 100% impermeable?",
      "es totalmente impermeable?",
      "queria saber si son impermeables",
      "¿qué tan impermeable es?",
      "vienen impermeables?",
      "quedan impermeables?",
      "impermeables?",
      "impermeable?",
      "¿impermeables?",
      "SON IMPERMEABLES???",
    ];
    for (const p of preguntas) {
      const e = catalogo.productoDelHilo(hilo(V), p, {});
      chequear(`🔑 "${p}" se queda en el V10`, e.producto === V, `se fue a ${e.producto} (${e.porQue})`);
    }
    // Y lo más importante de todo: que no quede congelado.
    for (const p of ["son impermeables?", "¿es impermeable?", "impermeables?"]) {
      const e = catalogo.productoDelHilo(hilo(V), p, {});
      chequear(
        `  y "${p}" NO se marca como señal explícita (no congela el producto)`,
        e.explicito === false,
        "explicito quedó en true: agent.js lo fijaría para toda la conversación"
      );
    }
  }

  // =========================================================================
  console.log("\n── 2. LA ASIMETRÍA QUE DELATÓ EL BUG: las dos formas de preguntar ──");
  //
  // "son resistentes al agua?" nunca estuvo roto. "son impermeables?" sí. Eran la
  // misma pregunta y daban productos opuestos.
  // =========================================================================
  {
    const a = catalogo.productoDelHilo(hilo(V), "son resistentes al agua?", {});
    const b = catalogo.productoDelHilo(hilo(V), "son impermeables?", {});
    chequear("'son resistentes al agua?' sigue en V10 (nunca estuvo roto)", a.producto === V, a.producto);
    chequear("'son impermeables?' ahora también", b.producto === V, b.producto);
    chequear("🔑 y las dos dan el MISMO producto", a.producto === b.producto, `${a.producto} vs ${b.producto}`);
  }

  // =========================================================================
  console.log("\n── 3. EL CAMBIO DE PRODUCTO REAL SIGUE FUNCIONANDO (lo que NO se podía romper) ──");
  //
  // El arreglo fácil habría sido sacar `impermeabl` de las señales. Eso rompería la
  // razón por la que existen: que el cliente pueda irse al otro producto.
  // Acá "impermeable" es SUSTANTIVO y tiene que ganar.
  // =========================================================================
  {
    const cambios = [
      "y el impermeable cuánto vale?",
      "quiero impermeables",
      "cuánto valen los impermeables",
      "me interesa un impermeable",
      "2 impermeables para Cali",
      "precio del conjunto impermeable",
      "tienen traje de agua?",
      "me interesa la chaqueta",
      "y el pantalón?",
      "mejor el enterizo",
      "los impermeables son impermeables de verdad?",
      "el conjunto es impermeable?",
    ];
    for (const c of cambios) {
      const e = catalogo.productoDelHilo(hilo(V), c, {});
      chequear(`"${c}" SÍ cambia al impermeable`, e.producto === IMP, `quedó en ${e.producto}`);
    }
    // Y el cambio de verdad sí tiene que congelarse, como antes.
    const e = catalogo.productoDelHilo(hilo(V), "y el impermeable cuánto vale?", {});
    chequear("  el cambio legítimo sigue siendo explícito (se fija)", e.explicito === true);
  }

  // =========================================================================
  console.log("\n── 4. CERO REGRESIÓN: sin contexto, todo sigue cayendo al impermeable ──");
  //
  // El impermeable paga las cuentas. Si el hilo no es de V10, nada cambia: la
  // pregunta adjetival simplemente deja seguir a los pasos de abajo, y el último
  // es el producto por defecto de siempre.
  // =========================================================================
  {
    for (const f of ["son impermeables?", "¿es impermeable?", "quiero información", "hola", "impermeables?"]) {
      const e = catalogo.productoDelHilo({ messages: [] }, f, {});
      chequear(`sin contexto, "${f}" -> impermeable`, e.producto === IMP, e.producto);
    }
    for (const f of ["son impermeables?", "es impermeable?", "que tan impermeable es?"]) {
      const e = catalogo.productoDelHilo(hilo(IMP, ["quiero un impermeable"]), f, {});
      chequear(`en hilo de impermeable, "${f}" -> impermeable`, e.producto === IMP, e.producto);
    }
    // El salto AL V10 tampoco se toca.
    for (const f of ["también vi los intercomunicadores", "el v10 cuánto sale?", "los de los cascos"]) {
      const e = catalogo.productoDelHilo(hilo(IMP), f, {});
      chequear(`y "${f}" sigue saltando al V10`, e.producto === V, e.producto);
    }
  }

  // =========================================================================
  console.log("\n── 5. La FAQ del agua contesta con el dato firme, también en plural ──");
  //
  // El match de `datosConfirmados` es por substring: en "son impermeables?" el
  // carácter que sigue a "impermeable" es la s, así que la entrada singular
  // "impermeable?" NO pegaba y la pregunta más común del producto se la quedaba
  // el modelo. Se agregó "impermeables?".
  // =========================================================================
  {
    for (const f of ["son impermeables?", "¿es impermeable?", "resisten la lluvia?", "se moja?"]) {
      const r = catalogo.respuestaConfirmada(f, V);
      chequear(`"${f}" -> respuesta confirmada de agua`, r && r.clave === "agua", r ? r.clave : "ninguna");
      chequear("  y dice IPX6, que es lo único autorizado", r && /IPX6/.test(r.respuesta));
    }
    // ⛔ Y no se pasó de rosca: "impermeable" suelto NO es la pregunta del agua.
    const suelto = catalogo.respuestaConfirmada("quiero el impermeable", V);
    chequear("⛔ 'quiero el impermeable' NO dispara la respuesta del agua", !suelto || suelto.clave !== "agua", suelto && suelto.clave);
  }

  // =========================================================================
  console.log("\n── 6. DE PUNTA A PUNTA: el pedido de Fabian Tascon queda bien ──");
  //
  // La conversación completa, con la pregunta venenosa en el medio. Lo que se
  // revisa es el PEDIDO GUARDADO, que es lo que el dueño ve en el panel y lo que
  // termina en la guía.
  // =========================================================================
  {
    const t = nuevoTel();
    const pedido = {
      nombre: "Fabian Tascon", celular: "3182224455", ciudad: "Bogotá",
      direccion: "Carrera 7 # 45-12", unidades: 2, pago: "contraentrega", total: 113000,
    };
    const r = await recorrer(t, [
      { cliente: "hola, info de los intercomunicadores" },
      // 🔴 ACÁ SE ROMPÍA TODO. De este turno en adelante, el bot vendía impermeables.
      { cliente: "son impermeables?", ia: "Sí 👍 Tienen protección IPX6, resisten lluvia y salpicaduras 🌧️" },
      { cliente: "Para Bogotá, quiero el combo", ia: "Los dos quedan en $113.000 🎧 ¿Tu nombre, celular y dirección?" },
      {
        cliente: "Fabian Tascon, 3182224455, Carrera 7 # 45-12",
        ia: "📋 *Confirmemos tu pedido:*\n• Producto: V10 2X (x2)\n• Nombre: Fabian Tascon\n• Celular: 3182224455\n• Ciudad: Bogotá\n• Dirección: Carrera 7 # 45-12\n• Total a pagar al recibir: $113.000\n\n*¿Está todo bien? Respondé SÍ CONFIRMO*",
      },
      { cliente: "sí confirmo", ia: `¡Listo Fabian! Te lo despacho hoy 🎧\n${ORDER(pedido)}` },
    ]);
    chequear("se creó UN pedido", r.pedidos.length === 1, `creó ${r.pedidos.length}`);
    chequear(
      "🔑 el pedido quedó como INTERCOMUNICADOR, no como impermeable",
      r.pedido && r.pedido.producto === V,
      r.pedido && `quedó como "${r.pedido.producto}" — es el bug de Fabian Tascon`
    );
    chequear("  con su nombre comercial", r.pedido && /Intercomunicador V10 2X/.test(r.pedido.producto_nombre || ""), r.pedido && r.pedido.producto_nombre);
    chequear("  cantidad 2 y no 1", r.pedido && Number(r.pedido.unidades) === 2, r.pedido && String(r.pedido.unidades));
    chequear("  total $113.000 (combo + envío de Bogotá)", r.pedido && Number(r.pedido.total) === 113000, r.pedido && String(r.pedido.total));
    chequear(
      "⛔ y NUNCA el $85.000 del impermeable de banda E",
      r.pedido && Number(r.pedido.total) !== 85000,
      "ese número es el síntoma exacto del bug"
    );
  }

  // =========================================================================
  console.log("\n── 7. El guion que ve el modelo no se cambia a mitad de camino ──");
  // =========================================================================
  {
    const t = nuevoTel();
    await recorrer(t, [{ cliente: "info de los intercomunicadores" }]);
    await recorrer(t, [{ cliente: "son impermeables?", ia: "Sí, IPX6 👍" }]);
    chequear("🔑 después de la pregunta, el guion sigue siendo el del V10", cualGuion() === "V10", cualGuion());
    const conv = store.getConv(t);
    chequear("  y el productoActivo de la conversación sigue en V10", conv.productoActivo === V, conv.productoActivo);

    // Y la cotización viva no se recalcula con el tarifario del impermeable.
    await recorrer(t, [{ cliente: "para Medellín", ia: "En Medellín el combo queda en $122.000 🎧" }]);
    const cot = store.leerCotizacion(t);
    chequear("  la cotización es del V10", cot && cot.productoId === V, cot && String(cot.productoId));
    chequear("  con el total del V10 en Medellín ($122.000)", cot && cot.total === 122000, cot && String(cot.total));
    chequear("⛔ y no el $82.000 del impermeable en Medellín", cot && cot.total !== 82000);
  }

  // =========================================================================
  console.log("\n── 8. EL PISO ECONÓMICO: por qué esto costaba plata de verdad ──");
  //
  // No es una prueba de estilo. Si el combo de 2 V10 se cobra como un impermeable,
  // la venta sale en pérdida. Este bloque deja el número escrito para que nadie
  // vuelva a tratar el bug como cosmético.
  // =========================================================================
  {
    const v10 = catalogo.de(V);
    const costoCombo = v10.costoUnitario * 2;
    chequear("el combo de 2 V10 cuesta $70.000 de compra", costoCombo === 70000, String(costoCombo));

    // Lo que habría quedado cobrando $85.000 (banda E del impermeable).
    const fletes = require("./src/fletes");
    const bandaE = fletes.BANDAS.E.total; // 85.000
    const envioE = bandaE - fletes.PRECIO_PRODUCTO; // lo que vale mandar un paquete
    const netoSiSeCobraComoImpermeable = bandaE - envioE;
    chequear("cobrado como impermeable de banda E son $85.000", bandaE === 85000, String(bandaE));
    chequear(
      "🔴 de ahí quedan $59.900 para pagar algo que costó $70.000",
      netoSiSeCobraComoImpermeable === 59900,
      String(netoSiSeCobraComoImpermeable)
    );
    chequear(
      "🔴 o sea PÉRDIDA, no menor ganancia",
      netoSiSeCobraComoImpermeable < costoCombo,
      `${netoSiSeCobraComoImpermeable} vs ${costoCombo}`
    );

    // Y el precio correcto sí cubre el costo, en todas las bandas.
    for (const b of Object.keys(fletes.BANDAS)) {
      const total = catalogo.precioDe(V, 2).precio + (fletes.BANDAS[b].total - fletes.PRECIO_PRODUCTO);
      const neto = total - (fletes.BANDAS[b].total - fletes.PRECIO_PRODUCTO);
      chequear(
        `  banda ${b}: el combo bien cobrado ($${total.toLocaleString("es-CO")}) deja $${neto.toLocaleString("es-CO")} > $70.000`,
        neto > costoCombo,
        `${neto} <= ${costoCombo}`
      );
    }
  }

  // =========================================================================
  console.log("\n── 9. EL PEDIDO REAL, TAL COMO QUEDÓ GUARDADO (auditoría del 30-sep) ──");
  //
  // Se auditaron los 133 pedidos del sistema y apareció UNO solo con el bug. Así
  // quedó, y es la forma exacta que hay que reproducir:
  //
  //     29-sep · Andes · producto impermeable · 1 unidad · $85.000
  //     talla: "Intercomunicador"
  //
  // Andes es banda E, y el combo de V10 en banda E son $125.000 — que es justo
  // lo que el dueño había cotizado bien en el chat. O sea: el chat estuvo
  // correcto y el pedido salió mal.
  // =========================================================================
  {
    const t = nuevoTel();
    const pedido = {
      nombre: "Fabian Tascon", celular: "3182224455", ciudad: "Andes",
      direccion: "Calle 8 # 4-21", unidades: 2, pago: "contraentrega", total: 125000,
    };
    const r = await recorrer(t, [
      { cliente: "hola, quiero la promo de intercomunicadores" },
      { cliente: "para Andes, Antioquia", ia: "El combo de los dos te queda en $125.000 con envío 🎧 ¿Tu nombre, celular y dirección?" },
      // 🔴 El turno que rompía todo, DESPUÉS de haber cotizado bien.
      { cliente: "son impermeables?", ia: "Sí 👍 Tienen protección IPX6, resisten lluvia y salpicaduras 🌧️" },
      {
        cliente: "Fabian Tascon, 3182224455, Calle 8 # 4-21",
        ia: "📋 *Confirmemos tu pedido:*\n• Producto: V10 2X (x2)\n• Nombre: Fabian Tascon\n• Celular: 3182224455\n• Ciudad: Andes\n• Dirección: Calle 8 # 4-21\n• Total a pagar al recibir: $125.000\n\n*¿Está todo bien? Respondé SÍ CONFIRMO*",
      },
      { cliente: "sí confirmo", ia: `¡Listo Fabian! 🎧\n${ORDER(pedido)}` },
    ]);
    chequear("se creó el pedido", r.pedidos.length === 1, `creó ${r.pedidos.length}`);
    chequear("🔑 queda como V10 y no como impermeable", r.pedido && r.pedido.producto === V, r.pedido && r.pedido.producto);
    chequear("  2 unidades", r.pedido && Number(r.pedido.unidades) === 2, r.pedido && String(r.pedido.unidades));
    chequear("  $125.000, el combo en banda E", r.pedido && Number(r.pedido.total) === 125000, r.pedido && String(r.pedido.total));
    chequear("⛔ y NO el $85.000 que quedó en producción", r.pedido && Number(r.pedido.total) !== 85000);
    chequear(
      "⛔ la talla NO lleva el nombre del producto",
      r.pedido && !/interc|v10/i.test(String(r.pedido.talla || "")),
      r.pedido && `talla = "${r.pedido.talla}"`
    );
  }

  // =========================================================================
  console.log("\n── 10. RED DE SEGURIDAD: un pedido que se contradice se marca solo ──");
  //
  // El arreglo de arriba tapa la causa conocida. Esta regla no depende de la
  // causa: mira el pedido YA GUARDADO. Si el producto se pierde por un motivo
  // nuevo, el pedido queda marcado y no se despacha en silencio — que es lo que
  // pasó con el de Fabian, que pasó el despacho sin una sola marca.
  //
  // ⚠️ Lo delicado es no marcar las tallas dobles legítimas. Los 13 casos de
  // abajo salieron de los pedidos reales del sistema.
  // =========================================================================
  {
    const CLAVE = "producto_no_cuadra";
    const marcado = (o) => store.motivosDeRevision(o).some((m) => m.clave === CLAVE);
    const base = { celular: "3001112233", ciudad: "Andes", pago: "contraentrega" };

    // 🔴 Los que SÍ hay que marcar.
    chequear(
      "🔑 el pedido de Fabian, tal como quedó, se marca",
      marcado({ ...base, producto: IMP, talla: "Intercomunicador", color: "", unidades: 1, total: 85000 })
    );
    for (const talla of ["Intercomunicador", "intercomunicadores", "V10", "v10 2x", "intercom"]) {
      chequear(`  talla "${talla}" se marca`, marcado({ ...base, producto: IMP, talla, unidades: 1, total: 85000 }));
    }
    // Y el motivo tiene que ser accionable, no un "revisar" seco.
    const det = store
      .motivosDeRevision({ ...base, producto: IMP, talla: "Intercomunicador", unidades: 1, total: 85000 })
      .find((m) => m.clave === CLAVE);
    chequear("  y dice qué producto era y que el total está mal", det && /V10 2X/.test(det.detalle) && /total/.test(det.detalle), det && det.detalle);

    // ⛔ Los que NO se pueden marcar: tallas dobles reales de 2 impermeables.
    for (const [talla, color] of [
      ["M y XL", "Roja"], ["M y L", "Morado y Azul"], ["2XL y XL", "diferentes"],
      ["XXL y L", "Azul y Rosado"], ["XL y S", "Negro"], ["S y L", "Morado"],
      ["M, M", "1 blanca, 1 azul"], ["2XL y 2XL", "Morado"], ["2 unidades talla XL", "Uno rojo y uno blanco"],
      ["XXL y M", "Negro"], ["XL y 2XL", "Verde"], ["XL y XL", "Morado y Negro"], ["CXXL", "Negro"],
    ]) {
      chequear(
        `⛔ "${talla}" / "${color}" NO se marca (es un impermeable de verdad)`,
        !marcado({ ...base, producto: IMP, talla, color, unidades: 2, total: 155000 })
      );
    }
    // Y las tallas simples, obviamente.
    for (const talla of ["S", "M", "L", "XL", "XXL", "2XL", "3XL"]) {
      chequear(`⛔ talla "${talla}" NO se marca`, !marcado({ ...base, producto: IMP, talla, color: "Negro", unidades: 1, total: 85000 }));
    }
    // ⛔ Un pedido de V10 bien guardado tampoco se toca, aunque no tenga talla.
    chequear(
      "⛔ un V10 bien guardado NO se marca",
      !marcado({ ...base, producto: V, talla: "", color: "", unidades: 2, total: 125000 })
    );
    // ⛔ Y un pedido viejo sin campo `producto` sigue siendo un impermeable legacy.
    chequear(
      "⛔ un pedido viejo sin campo producto NO se marca",
      !marcado({ ...base, talla: "L", color: "Negro", unidades: 1, total: 85000 })
    );
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
