/**
 * EL SEGUNDO PRODUCTO: INTERCOMUNICADOR V10 2X.
 *
 * BikerPro vendió UN solo producto durante meses, y eso estaba asumido en todas
 * partes sin decirlo: el precio venía fusionado dentro del total de cada banda del
 * tarifario, el guion describía impermeables, y un pedido no tenía forma de decir
 * QUÉ se vendió.
 *
 * Esta batería cubre los 22 casos que pidió el dueño, y sobre todo los dos riesgos
 * que de verdad importan:
 *
 *   1. 🔴 QUE NO SE REGRESIONE EL NEGOCIO QUE FUNCIONA. Los impermeables pagan las
 *      cuentas. Cualquier cosa que los rompa es peor que no tener el V10.
 *   2. 🔴 QUE NO SE INVENTE NADA. Ni una especificación del aparato, ni un
 *      descuento por cantidad, ni un envío gratis. Una promesa falsa sobre un
 *      aparato electrónico es una devolución con motivo, y una devolución cuesta
 *      $17.384.
 *
 *   node test-v10-intercomunicador.js      (sin credenciales ni IA real)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

// El entorno se prepara ANTES de requerir agent.js: lee las variables al cargarse.
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "v10-"));
process.env.DATA_DIR = DIR;
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba"; // solo para que TIENE_IA sea true
delete process.env.OWNER_PHONE;

// 🎭 La IA simulada: devuelve en orden las respuestas del guion y guarda los
// prompts que recibió, para poder aseverar QUÉ guion vio el modelo.
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
const catalogo = require("./src/catalogo");
const cotizacion = require("./src/cotizacion");
const { buildSystemPrompt } = require("./src/prompt");

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
const ORDER = (o) => `##ORDER## ${JSON.stringify(o)}`;

/** Corre una conversación entera. */
async function recorrer(telefono, turnos) {
  const respuestas = [];
  for (const { cliente, ia: guionIA } of turnos) {
    ia.poner(...[].concat(guionIA || []));
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

let tel = 573100000000;
const nuevoTel = () => String(++tel); // un teléfono por caso: el store empareja por celular

(async () => {
  // =========================================================================
  console.log("\n── 1. El mensaje del anuncio: reconoce V10, ofrece el combo, NO crea pedido ──");
  // =========================================================================
  {
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "Hola, quiero más información de la promoción de intercomunicadores" },
    ]);
    const texto = r.ultima.reply;
    chequear("reconoce que es del V10", /intercomunicador/i.test(texto), texto.slice(0, 140));
    chequear("ofrece el combo de 2 por $99.900", /\$99\.900/.test(texto), texto.slice(0, 200));
    chequear("dice que el envío va aparte", /aparte el envío|según tu ciudad|según el destino/i.test(texto), texto.slice(0, 220));
    chequear("pregunta la ciudad", /ciudad|municipio/i.test(texto));
    chequear("🔴 NO crea ningún pedido (es un lead, no una compra)", r.pedidos.length === 0, `creó ${r.pedidos.length}`);
    chequear("⛔ no dice que sea un 2x1", !/2x1|2 x 1|dos por uno/i.test(texto), texto);
    chequear("⛔ no promete envío gratis", !/gratis/i.test(texto), texto);
    chequear("⛔ no menciona impermeables ni tallas", !/impermeable|talla/i.test(texto), texto.slice(0, 200));
  }

  // =========================================================================
  console.log("\n── 2 y 12. «¿cuánto vale uno?» y «precio» dentro del contexto V10 ──");
  // El dueño lo pidió explícito: después de hablar de V10, un mensaje corto NO
  // puede perder el contexto y volver al impermeable.
  // =========================================================================
  {
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "info de los intercomunicadores" },
      { cliente: "¿cuánto vale uno?", ia: "Uno queda en $59.900 y aparte el envío según tu ciudad 🎧 ¿Para qué ciudad sería?" },
    ]);
    const prompt = ia.prompts[ia.prompts.length - 1] || "";
    chequear("🔑 el guion que recibió el modelo es el del V10", /Intercomunicador V10 2X/.test(prompt) && !/4 PIEZAS/.test(prompt));
    chequear("el bloque de precio dice el precio de 1 unidad", /59\.900/.test(prompt));
    chequear("no crea pedido por preguntar el precio", r.pedidos.length === 0);
  }
  {
    // "precio" pelado, en contexto V10 → sigue siendo del V10.
    const t = nuevoTel();
    await recorrer(t, [{ cliente: "quiero los intercom" }]);
    const r = await recorrer(t, [{ cliente: "precio", ia: "El combo de 2 queda en $99.900 y aparte el envío 📦 ¿Para qué ciudad?" }]);
    const prompt = ia.prompts[ia.prompts.length - 1] || "";
    chequear("🔑 «precio» en contexto V10 NO se va al impermeable", /Intercomunicador V10 2X/.test(prompt), prompt.slice(0, 80));
    chequear("y no crea pedido", r.pedidos.length === 0);
  }

  // =========================================================================
  console.log("\n── 3, 4 y 5. Cantidades: «solo uno», «los dos», «el combo» ──");
  // =========================================================================
  {
    const casos = [
      ["solo necesito uno", 1, 59900],
      ["quiero los dos", 2, 99900],
      ["quiero el combo", 2, 99900],
      ["¿venden uno solo?", 1, 59900],
      ["solo uno por favor", 1, 59900],
      ["mándeme los 2", 2, 99900],
    ];
    for (const [frase, udsEsperadas, subtotalEsperado] of casos) {
      const t = nuevoTel();
      const r = await recorrer(t, [
        { cliente: "info intercomunicadores" },
        { cliente: `Para Bogotá. ${frase}`, ia: "Listo, te confirmo 🎧" },
      ]);
      const c = r.cotizacion;
      chequear(
        `"${frase}" → ${udsEsperadas} ud, producto ${subtotalEsperado}`,
        c && c.uds === udsEsperadas && c.producto === subtotalEsperado,
        c ? `dio uds=${c.uds} producto=${c.producto}` : "no hay cotización"
      );
    }
  }

  // =========================================================================
  console.log("\n── 6 y 7. Cambiar de cantidad NO duplica el pedido ni pierde datos ──");
  // =========================================================================
  {
    // Empieza con 2 y se pasa a 1.
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "info de los intercomunicadores" },
      { cliente: "Para Bogotá, quiero el combo", ia: "Los dos te quedan en $113.000 🎧 ¿Me das tu nombre y dirección?" },
      { cliente: "mejor uno", ia: "Listo, uno queda en $73.000 puesto en Bogotá 🎧" },
    ]);
    const c = r.cotizacion;
    chequear("🔑 «mejor uno» pasa la cantidad a 1", c && c.uds === 1, c ? `uds=${c.uds}` : "sin cotización");
    chequear("  el subtotal baja a $59.900", c && c.producto === 59900, c && String(c.producto));
    chequear("  y el total se recalcula a $73.000", c && c.total === 73000, c && String(c.total));
    chequear("  ⛔ NO quedó en $99.900 por accidente", c && c.producto !== 99900);
    chequear("  conserva la ciudad ya dada", c && /bogot/i.test(c.ciudad || ""), c && c.ciudad);
    chequear("  y no creó ningún pedido todavía", r.pedidos.length === 0);
  }
  {
    // Empieza con 1 y se pasa a 2.
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "cuanto vale un intercomunicador" },
      { cliente: "Para Cali, solo uno", ia: "Uno te queda en $82.000 puesto en Cali 🎧" },
      { cliente: "mejor mándeme los dos", ia: "Perfecto, los dos quedan en $122.000 🎧" },
    ]);
    const c = r.cotizacion;
    chequear("🔑 «mejor mándeme los dos» pasa la cantidad a 2", c && c.uds === 2, c ? `uds=${c.uds}` : "sin cotización");
    chequear("  el subtotal sube a $99.900", c && c.producto === 99900, c && String(c.producto));
    chequear("  total $122.000 en Cali", c && c.total === 122000, c && String(c.total));
    chequear("  conserva la ciudad", c && /cali/i.test(c.ciudad || ""));
  }

  // =========================================================================
  console.log("\n── 8 y 9. El envío NO está incluido y NO es gratis ──");
  // Son las dos frases que el dueño prohibió en mayúsculas. Y no alcanza con
  // pedírselo al modelo: acá se comprueba que el VALIDADOR las frena.
  // =========================================================================
  {
    const cot = cotizacion.calcular("Bogota", "el combo", { producto: V, cantidad: { uds: 2 } });
    const ctx = { producto: V };
    const frena = (t) => !cotizacion.validarRespuesta(t, cot, ctx).ok;

    chequear("🔴 frena «el envío es gratis»", frena("Son $99.900 y el envío es gratis"));
    chequear("🔴 frena «envío gratis» en otra forma", frena("Te va con envío gratis a Bogotá, $113.000"));
    chequear("🔴 frena «$99.900 con envío incluido»", frena("El combo sale $99.900 con envío incluido"));
    chequear("🔴 frena «no pagas envío»", frena("Son $113.000 y no pagas envío"));
    chequear("✅ pero SÍ permite decirlo del total real", cotizacion.validarRespuesta("Total $113.000 con envío incluido", cot, ctx).ok);
    chequear(
      "✅ y permite la frase correcta: producto + envío aparte",
      cotizacion.validarRespuesta("Los dos intercomunicadores $99.900 + $13.100 de envío a Bogotá, total $113.000", cot, ctx).ok
    );
    // Y el guion se lo dice al modelo, además de frenarlo.
    const g = buildSystemPrompt(V);
    chequear("el guion del V10 prohíbe el envío gratis", /NUNCA ofrezcas envío gratis/i.test(g));
    chequear("y aclara que el precio no incluye envío", /El envío NO está incluido/i.test(g));
  }

  // =========================================================================
  console.log("\n── 10. Contraentrega ──");
  // =========================================================================
  {
    const g = buildSystemPrompt(V);
    chequear("el guion dice que el pago es contraentrega", /contraentrega/i.test(g));
    chequear("y que se envía a toda Colombia", /toda Colombia/i.test(g));
    chequear("la ficha del producto lo declara", catalogo.de(V).contraentrega === true);
  }

  // =========================================================================
  console.log("\n── 11. Especificaciones técnicas: NO se inventan ──");
  // ⛔ Lo más delicado del producto. Si el bot dice "alcanza 1.000 metros" y
  // alcanza 300, el cliente lo rechaza en la puerta y pagamos el flete redondo.
  // =========================================================================
  {
    const preguntas = [
      "¿cuántos metros alcanza?",
      "¿cuánto le dura la batería?",
      "¿cuántas horas de autonomía tiene?",
      "¿qué versión de bluetooth es?",
      "¿es resistente al agua?",
      "¿cuántos dispositivos se conectan?",
      "¿tiene garantía?",
      "¿qué alcance tiene en carretera?",
    ];
    for (const p of preguntas) {
      const hallada = catalogo.preguntaSinDatoConfirmado(p, V);
      chequear(`detecta que "${p}" es un dato que NO tenemos`, Boolean(hallada), `devolvió ${hallada}`);
    }
    // Y el guion se lo dice con nombre y apellido.
    const g = buildSystemPrompt(V);
    chequear("🔑 el guion lista lo que NO se puede inventar", /alcance en metros/.test(g) && /autonomía u horas de batería/.test(g));
    chequear("  y da la salida correcta: confirmarlo", /prefiero confirmártelo/i.test(g));
    // ⛔ Lo que sí sabemos no debe caer en la lista.
    chequear(
      "⛔ NO marca como desconocido lo que sí está confirmado",
      !catalogo.preguntaSinDatoConfirmado("¿sirve para hablar de casco a casco?", V) &&
        !catalogo.preguntaSinDatoConfirmado("¿se puede escuchar música?", V)
    );
  }

  // =========================================================================
  console.log("\n── 13. CERO REGRESIONES: la conversación de impermeable es idéntica ──");
  // =========================================================================
  {
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "Hola, quiero más información" },
      { cliente: "Para Bogotá", ia: "Te queda en $73.000 en total: $59.900 el conjunto + $13.100 de envío a Bogotá 📦 ¿Qué talla?" },
    ]);
    const prompt = ia.prompts[ia.prompts.length - 1] || "";
    chequear("🔑 recibe el guion del IMPERMEABLE", /4 PIEZAS/.test(prompt) && !/Intercomunicador/.test(prompt));
    chequear("el arranque sigue siendo el del impermeable", /conjunto impermeable de 4 piezas/i.test(r.respuestas[0].reply));
    chequear("y cotiza $73.000 en Bogotá como siempre", r.cotizacion && r.cotizacion.total === 73000, r.cotizacion && String(r.cotizacion.total));
    chequear("el guion sin argumentos sigue siendo el del impermeable", /4 PIEZAS/.test(buildSystemPrompt()));
  }

  // =========================================================================
  console.log("\n── 14. Cambio de producto a mitad de la conversación ──");
  // =========================================================================
  {
    const t = nuevoTel();
    const r = await recorrer(t, [
      { cliente: "Hola, quiero información" },
      { cliente: "Para Medellín", ia: "Te queda en $82.000 en total 📦 ¿Qué talla usás?" },
      { cliente: "también vi los intercomunicadores, ¿cuánto cuestan?", ia: "El combo de 2 queda en $122.000 puesto en Medellín 🎧" },
    ]);
    const prompt = ia.prompts[ia.prompts.length - 1] || "";
    chequear("🔑 cambia al guion del V10", /Intercomunicador V10 2X/.test(prompt), prompt.slice(0, 90));
    chequear("  conserva la ciudad que ya había dado", r.cotizacion && /medell/i.test(r.cotizacion.ciudad || ""));
    chequear("  y cotiza el V10, no el impermeable", r.cotizacion && r.cotizacion.productoId === V, r.cotizacion && r.cotizacion.productoId);
    chequear("  con el total del V10 en Medellín ($122.000)", r.cotizacion && r.cotizacion.total === 122000, r.cotizacion && String(r.cotizacion.total));
  }
  {
    // Y el camino de vuelta: de V10 a impermeable.
    const t = nuevoTel();
    await recorrer(t, [{ cliente: "info de los intercomunicadores" }]);
    const r = await recorrer(t, [
      { cliente: "y el impermeable cuánto vale?", ia: "El conjunto cuesta $59.900 y aparte el envío 📦 ¿Para qué ciudad?" },
    ]);
    const prompt = ia.prompts[ia.prompts.length - 1] || "";
    chequear("🔑 y vuelve al guion del impermeable si lo nombra", /4 PIEZAS/.test(prompt));
  }

  // =========================================================================
  console.log("\n── 15 y 16. Después de confirmar, «gracias» NO crea otro pedido ──");
  // =========================================================================
  {
    const t = nuevoTel();
    const pedidoV10 = {
      nombre: "Andrés Mora", celular: "3155551234", ciudad: "Bogotá",
      direccion: "Calle 100 # 20-30", unidades: 2, pago: "contraentrega", total: 113000,
    };
    const r = await recorrer(t, [
      { cliente: "info de los intercomunicadores" },
      { cliente: "Para Bogotá, quiero el combo", ia: "Los dos quedan en $113.000 🎧 ¿Tu nombre, celular y dirección?" },
      {
        cliente: "Andrés Mora, 3155551234, Calle 100 # 20-30",
        ia: "📋 *Confirmemos tu pedido:*\n• Producto: V10 2X (x2)\n• Nombre: Andrés Mora\n• Celular: 3155551234\n• Ciudad: Bogotá\n• Dirección: Calle 100 # 20-30\n• Total a pagar al recibir: $113.000\n\n*¿Está todo bien? Respondé SÍ CONFIRMO*",
      },
      { cliente: "sí confirmo", ia: `¡Listo Andrés! Te lo despacho hoy 🎧\n${ORDER(pedidoV10)}` },
    ]);
    chequear("se creó UN pedido del V10", r.pedidos.length === 1, `creó ${r.pedidos.length}`);
    chequear("🔑 queda identificado como V10", r.pedido && r.pedido.producto === V, r.pedido && r.pedido.producto);
    chequear("  con su nombre comercial", r.pedido && /Intercomunicador V10 2X/.test(r.pedido.producto_nombre || ""));
    chequear("  cantidad 2", r.pedido && Number(r.pedido.unidades) === 2);
    chequear("  total $113.000 (producto + envío)", r.pedido && Number(r.pedido.total) === 113000);
    chequear("  y no quedó marcado para revisión", r.pedido && !r.pedido.pendiente_revision, r.pedido && r.pedido.motivo_precio);

    // Ahora los mensajes de después.
    for (const frase of ["gracias", "listo", "perfecto", "si mandaron el pedido gracias", "ya quedó?", "me confirma"]) {
      const antes = store.todosLosPedidos().filter((p) => p.telefono_chat === t).length;
      await recorrer(t, [{ cliente: frase, ia: "¡Con gusto! Cualquier cosa me escribís 🙌" }]);
      const despues = store.todosLosPedidos().filter((p) => p.telefono_chat === t).length;
      chequear(`⛔ "${frase}" NO crea otro pedido`, despues === antes, `pasó de ${antes} a ${despues}`);
    }
  }

  // =========================================================================
  console.log("\n── 17 y 18. El panel distingue los dos productos ──");
  // =========================================================================
  {
    const html = require("./src/panel").render();
    chequear("el encabezado dice «Producto»", /<th>Producto<\/th>/.test(html));
    chequear("ya no dice «Talla / color»", !/<th>Talla \/ color<\/th>/.test(html));
    chequear("🔑 el pedido de V10 se ve como V10 2X", /🎧 V10 2X × 2/.test(html), "");
    chequear("  con su propio color (clase prodB)", /class="prod prodB"/.test(html));

    // Y un impermeable tiene que seguir viéndose como impermeable.
    store.saveOrder({
      nombre: "Cliente Impermeable", celular: "3009998877", telefono_chat: "573009998877",
      ciudad: "Cali", direccion: "Cra 5 # 10-20", talla: "XL", color: "rojo",
      unidades: 1, pago: "contraentrega", total: 82000, producto: "impermeable",
      producto_nombre: "Conjunto impermeable",
    });
    const html2 = require("./src/panel").render();
    chequear("🔑 el impermeable se ve como impermeable", /🧥 Impermeable × 1/.test(html2));
    chequear("  con su talla y color debajo", /XL \/ rojo/.test(html2));
    chequear("  y con otro color (clase prodA)", /class="prod prodA"/.test(html2));

    // ⚠️ Y LOS PEDIDOS VIEJOS, que no tienen el campo `producto`.
    store.saveOrder({
      nombre: "Pedido Historico", celular: "3004443333", telefono_chat: "573004443333",
      ciudad: "Pasto", direccion: "Calle 8", talla: "M", color: "azul",
      unidades: 1, pago: "contraentrega", total: 83000,
    });
    const html3 = require("./src/panel").render();
    chequear(
      "🔑 un pedido guardado ANTES de este cambio se sigue viendo como impermeable",
      /🧥 Impermeable × 1/.test(html3) && /M \/ azul/.test(html3)
    );
    chequear("  y NO aparece como desconocido", !/📦 undefined/.test(html3) && !/📦 \?/.test(html3));
  }

  // =========================================================================
  console.log("\n── 19. Los destinos conservan sus protecciones ──");
  // No se toca el motor de destinos: el V10 lo hereda tal cual, con los
  // homónimos y las zonas difíciles que costaron semanas.
  // =========================================================================
  {
    // Madrid existe en Cundinamarca y en España; Riosucio en Caldas y Chocó.
    const amb = cotizacion.calcular("Riosucio", "el combo", { producto: V, cantidad: { uds: 2 } });
    chequear("🔑 una ciudad homónima NO se cotiza a ciegas", !amb.ok && amb.motivo === "ambiguo", amb.motivo);

    const dificil = cotizacion.calcular("Tado", "uno", { producto: V, cantidad: { uds: 1 } });
    chequear(
      "🔑 zona de difícil acceso: el V10 no se cotiza solo",
      !dificil.ok && dificil.motivo === "producto_en_zona_dificil",
      dificil.motivo
    );
    chequear("  y el motivo lo explica", /difícil acceso/i.test(dificil.detalle || ""), dificil.detalle);

    // Un municipio desconocido cae en la banda más cara, igual que el impermeable.
    const desconocida = cotizacion.calcular("Villa Nueva del Río", "el combo", { producto: V, cantidad: { uds: 2 } });
    chequear(
      "un municipio desconocido usa la banda por defecto (la más cara)",
      desconocida.ok && desconocida.banda === "E" && desconocida.total === 125000,
      JSON.stringify({ banda: desconocida.banda, total: desconocida.total })
    );
    // ⛔ Y las protecciones del impermeable siguen intactas.
    //
    // ⚠️ NOTA HONESTA: la primera versión de esta prueba afirmaba que "Madrid" era
    // ambigua para el impermeable. Es falso y la prueba lo cazó: Madrid se resuelve
    // a banda A. Lo que costó una corrección el 27-sep fue algo distinto —que
    // Madrid y Mosquera comparten la banda A, así que un pedido no puede darse por
    // equivalente al otro solo porque la tarifa coincida—. La ciudad que de verdad
    // queda ambigua es Riosucio (Caldas y Chocó).
    const riosucioImper = cotizacion.calcular("Riosucio", "uno", { cantidad: { uds: 1 } });
    chequear(
      "⛔ Riosucio sigue siendo ambigua para el impermeable",
      !riosucioImper.ok && riosucioImper.motivo === "ambiguo",
      riosucioImper.motivo
    );
    const madrid = cotizacion.calcular("Madrid", "uno", { cantidad: { uds: 1 } });
    chequear("y Madrid sigue cotizando en banda A como antes", madrid.ok && madrid.banda === "A", JSON.stringify({ ok: madrid.ok, banda: madrid.banda }));
  }

  // =========================================================================
  console.log("\n── 20. Errores de tipeo y formas cortas ──");
  // =========================================================================
  {
    const variantes = [
      "intercomunicador", "intercomunicadores", "intercom", "intercoms",
      "intercomunicdor", "intercomunciador", "INTERCOMUNICADOR",
      "v10", "V10 2X", "v 10", "el v10",
      "quiero los intercom", "promo intercomunicadores",
      "comunicación de casco a casco", "los de los cascos",
      "los aparatos para hablar en moto",
    ];
    for (const v of variantes) {
      const d = catalogo.productoEn(v);
      chequear(`detecta "${v}"`, Boolean(d) && d.producto === V, d ? d.producto : "no detectó");
    }
  }

  // =========================================================================
  console.log("\n── 21. Sin señal de producto NO se adivina ──");
  // =========================================================================
  {
    for (const v of ["quiero información", "hola", "precio", "info", "buenas tardes", "me interesa", "hacen envíos"]) {
      chequear(`⛔ "${v}" NO se toma como señal de V10`, catalogo.productoEn(v) === null, JSON.stringify(catalogo.productoEn(v)));
    }
    // Y en una conversación nueva, sin contexto, va al impermeable.
    const t = nuevoTel();
    const r = await recorrer(t, [{ cliente: "quiero información" }]);
    chequear(
      "🔑 una conversación sin señal arranca como impermeable (como siempre)",
      /conjunto impermeable/i.test(r.ultima.reply),
      r.ultima.reply.slice(0, 120)
    );
    // ⛔ Y "combo" solo NO puede mandar la conversación al V10: el impermeable
    // también tiene combo de 2, y es su gancho principal.
    chequear("⛔ «quiero el combo» solo NO cambia de producto", catalogo.productoEn("quiero el combo") === null);
    chequear("⛔ «combo x2» tampoco", catalogo.productoEn("combo x2") === null);
  }

  // =========================================================================
  console.log("\n── 22. Más de 2 unidades: NO se inventa un descuento ──");
  // =========================================================================
  {
    for (const n of [3, 4, 5, 10]) {
      const r = cotizacion.calcular("Bogota", `quiero ${n}`, { producto: V, cantidad: { uds: n } });
      chequear(`⛔ ${n} unidades NO se cotiza con un precio inventado`, !r.ok && r.motivo === "cantidad_sin_precio", r.motivo);
    }
    const r3 = cotizacion.calcular("Bogota", "quiero 3", { producto: V, cantidad: { uds: 3 } });
    chequear("  y el motivo informa los precios que SÍ existen", /59\.900/.test(r3.detalle || "") && /99\.900/.test(r3.detalle || ""), r3.detalle);
    const bloque = cotizacion.bloqueDeDatos(r3, { producto: V });
    chequear("  el bloque le prohíbe al modelo inventar el precio", /NO inventes un precio ni un descuento/i.test(bloque));
    chequear("  y le dice que lo pase a un humano", /HANDOFF/.test(bloque));
    // El catálogo mismo no tiene precio para 3.
    chequear("  el catálogo declara la cantidad como fuera de tabla", catalogo.precioDe(V, 3).fueraDeTabla === true);
    chequear("  ⛔ y NO hay descuentos de rescate para el V10", cotizacion.calcular("Bogota", "el combo", { producto: V, cantidad: { uds: 2 } }).rescate === null);
  }

  // =========================================================================
  console.log("\n── Extra: producto + envío suman exacto en TODAS las bandas ──");
  // «Nunca comunicar $99.900 como total final si todavía falta sumar un envío».
  // La forma de garantizarlo es que las tres cifras existan por separado y cierren.
  // =========================================================================
  {
    // ⚠️ Las ciudades salen del tarifario real, comprobadas una por una. La
    // primera versión de esta prueba puso Bucaramanga en la banda B de memoria y
    // está en la D: la prueba lo cazó. Mejor que se caiga acá que en producción.
    const ciudades = [["Bogota", "A"], ["Tunja", "B"], ["Cali", "C"], ["Pasto", "D"], ["Piendamo", "E"]];
    for (const [ciudad, bandaEsperada] of ciudades) {
      for (const uds of [1, 2]) {
        const c = cotizacion.calcular(ciudad, "x", { producto: V, cantidad: { uds } });
        chequear(
          `${ciudad} (${bandaEsperada}) ${uds}ud: ${c.producto} + ${c.envio} = ${c.total}`,
          c.ok && c.banda === bandaEsperada && c.producto + c.envio === c.total,
          JSON.stringify({ banda: c.banda, producto: c.producto, envio: c.envio, total: c.total })
        );
      }
    }
    // El precio del producto es SIEMPRE el de catálogo, no varía por ciudad.
    const bog = cotizacion.calcular("Bogota", "x", { producto: V, cantidad: { uds: 2 } });
    const pas = cotizacion.calcular("Pasto", "x", { producto: V, cantidad: { uds: 2 } });
    chequear("🔑 el precio del producto no cambia con la ciudad, solo el envío", bog.producto === pas.producto && bog.envio !== pas.envio);
    chequear("  y el ahorro del combo es $19.900 (2×59.900 − 99.900)", bog.ahorro === 19900, String(bog.ahorro));
  }

  // =========================================================================
  console.log("\n── Extra: la frase que propone el CÓDIGO tiene que pasar su propio validador ──");
  //
  // 🔴 ESTO NO ES UNA PRUEBA DE ADORNO. Al recorrer la conversación a mano encontré
  // que `lineaDePrecioV10` generaba "…$99.900 el combo + $13.100 de envío…" y el
  // validador la RECHAZABA: leía el "en total:" de más atrás y concluía que $99.900
  // pretendía ser el total.
  //
  // O sea: el código proponía como correcta una frase que su propio candado borraba.
  // Cuando eso pasa, el cliente se queda sin el desglose y el bot parece tonto.
  // Se comprueba para los DOS productos y en todas las bandas.
  // =========================================================================
  {
    for (const [ciudad, prod] of [
      ["Bogota", V], ["Tunja", V], ["Cali", V], ["Pasto", V], ["Piendamo", V],
      ["Bogota", null], ["Cali", null], ["Piendamo", null],
    ]) {
      for (const uds of [1, 2]) {
        const opciones = { cantidad: { uds } };
        if (prod) opciones.producto = prod;
        const cot = cotizacion.calcular(ciudad, "x", opciones);
        if (!cot.ok) continue;
        const linea = cotizacion.lineaDePrecio(cot);
        const v = cotizacion.validarRespuesta(linea, cot, prod ? { producto: prod } : {});
        chequear(
          `${prod ? "V10" : "impermeable"} ${ciudad} ${uds}ud: su propia línea de precio valida`,
          v.ok,
          `"${linea}"\n     → ${v.problemas.map((p) => p.detalle).join(" · ")}`
        );
      }
    }
  }

  // =========================================================================
  console.log("\n── Extra: un impermeable y un V10 del mismo total no se pisan ──");
  // 🔴 El riesgo más concreto del segundo producto: en Bogotá un impermeable
  // cuesta $73.000 y UN intercomunicador cuesta $73.000. Mismo total, misma
  // cantidad, y el V10 no tiene talla que los distinga.
  // =========================================================================
  {
    const t = nuevoTel();
    const comun = { nombre: "Doble Compra", celular: "3012223344", telefono_chat: t, ciudad: "Bogotá", direccion: "Av 1 # 2-3", pago: "contraentrega" };
    store.saveOrder({ ...comun, talla: "L", color: "negro", unidades: 1, total: 73000, producto: "impermeable" });
    store.saveOrder({ ...comun, unidades: 1, total: 73000, producto: V, producto_nombre: "Intercomunicador V10 2X" });
    const suyos = store.todosLosPedidos().filter((p) => p.telefono_chat === t);
    chequear("🔑 se guardan los DOS pedidos", suyos.length === 2, `guardó ${suyos.length}`);
    chequear("  uno de cada producto", new Set(suyos.map((p) => p.producto)).size === 2);
    chequear(
      "  y el segundo NO se marca como repetido (es otro producto, no un duplicado)",
      suyos.every((p) => !p.posible_duplicado),
      JSON.stringify(suyos.map((p) => ({ prod: p.producto, dup: p.posible_duplicado })))
    );
    // ⛔ Pero el duplicado de verdad sigue bloqueado.
    const antes = store.todosLosPedidos().filter((p) => p.telefono_chat === t).length;
    store.saveOrder({ ...comun, unidades: 1, total: 73000, producto: V, producto_nombre: "Intercomunicador V10 2X" });
    const despues = store.todosLosPedidos().filter((p) => p.telefono_chat === t).length;
    chequear("⛔ el mismo pedido del MISMO producto sigue siendo duplicado", despues === antes, `${antes} → ${despues}`);
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
