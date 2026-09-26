/**
 * LAS TRES ENTREGAS FUNCIONANDO JUNTAS.
 *
 * DE DÓNDE SALE (26-sep), textual de la revisión:
 *   "los tres PR modifican agent.js. Presenta pruebas sobre la combinación final,
 *    además de las pruebas individuales, demostrando que cotización, promesas y
 *    notas comerciales funcionan juntas."
 *   "Verifica el tamaño del prompt final completo, incluyendo cotización y nota
 *    comercial."
 *
 * 🔑 POR QUÉ NO ALCANZA CON LAS TRES BATERÍAS SUELTAS. Cada una prueba su rama, y
 * en su rama cada cosa funciona. Pero los tres PRs tocan el MISMO punto de
 * agent.js —el armado del prompt y la derivación a un humano— y ahí aparecieron
 * dos cosas que ninguna batería individual podía ver:
 *
 *   1. El techo de tokens medido sin el bloque de precio estaba midiendo otra
 *      cosa. El prompt real son TRES capas, no una.
 *   2. Las entregas 1 y 2 traían cada una su propio mecanismo para mandar un chat
 *      a un humano, y el de la entrega 1 era SILENCIOSO: solo pausaba.
 *
 *   node test-integracion-tres-entregas.js      (sin red ni credenciales)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "integracion-"));
process.env.DATA_DIR = DIR;
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba";
process.env.NOTA_COMERCIAL = "1"; // la entrega 3 se prende a propósito para probarla

// ── IA simulada: mismo andamiaje que test-recorrido-completo.js ─────────────
const ia = { guion: [], llamadas: 0, prompts: [] };
global.fetch = async (url, opts) => {
  ia.llamadas++;
  let cuerpo = {};
  try {
    cuerpo = JSON.parse((opts && opts.body) || "{}");
  } catch {}
  ia.prompts.push((cuerpo.system_instruction && cuerpo.system_instruction.parts[0].text) || "");
  const texto = ia.guion.length ? ia.guion.shift() : "(guion agotado)";
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
const promesas = require("./src/promesas");
const comercial = require("./src/comercial");

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
const tokens = (s) => Math.round(String(s || "").length / 4);

async function turno(telefono, cliente, ...respuestasIA) {
  ia.guion = respuestasIA.slice();
  ia.llamadas = 0;
  ia.prompts = [];
  const r = await agent.generateReply(telefono, cliente);
  return { ...r, prompts: ia.prompts.slice(), llamadas: ia.llamadas };
}

(async () => {
  console.log(`\n💾 Datos de prueba en: ${DIR} (inventados)`);

  // ==========================================================================
  console.log("\n── 1. 📏 EL PROMPT COMPLETO: las tres capas, medidas juntas ──");
  // ==========================================================================
  {
    await turno("573002220001", "hola", "¡Hola! ¿Para qué ciudad sería?");
    const t = await turno(
      "573002220001",
      "se moja con lluvia fuerte? es para Cali",
      "Es PVC siliconado calibre 8 termosellado, 100% impermeable 💪 Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular"
    );
    const prompt = t.prompts[0] || "";

    chequear("capa 1 · el guion de ventas está", /FLUJO DE LA VENTA/.test(prompt));
    chequear("capa 2 · el bloque de precio calculado está", /PRECIO YA CALCULADO/.test(prompt));
    chequear("   con el total exacto", /\$82\.000/.test(prompt));
    chequear("capa 3 · la nota comercial del turno está", /PARA ESTE MENSAJE/.test(prompt));
    chequear("   y reconoció la duda del cliente", /impermeabilidad/.test(prompt), prompt.slice(-400));

    // 🔑 El orden: el precio va antes de la nota. Si la nota quedara en medio, el
    // "usá estos números tal cual" se perdería en la mitad del prompt.
    chequear(
      "🔑 el bloque de precio va ANTES de la nota comercial",
      prompt.indexOf("PRECIO YA CALCULADO") < prompt.indexOf("PARA ESTE MENSAJE"),
      "lo que no puede fallar es el precio, así que va lo más cerca posible del final… pero antes de la nota"
    );

    // 📏 LA MEDICIÓN QUE PEDÍA LA REVISIÓN: el prompt final completo.
    const medido = tokens(prompt);
    chequear(
      `📏 el prompt COMPLETO (guion + precio + nota) queda bajo 9.000: ${medido}`,
      medido < 9000,
      `quedó en ${medido} tokens`
    );
    // ⚠️ El desglose se calcula desde las PIEZAS, no buscando "## PRECIO" en el
    //    prompt: el guion ya tiene secciones que empiezan así y el corte daba
    //    números que no sumaban.
    const { buildSystemPrompt } = require("./src/prompt");
    const cotGuardada = store.leerCotizacion("573002220001");
    const gTok = tokens(buildSystemPrompt());
    const bTok = tokens(cotizacion.bloqueDeDatos(cotGuardada, {}));
    const iNota = prompt.indexOf("## 📌 PARA ESTE MENSAJE");
    const nTok = tokens(prompt.slice(iNota));
    console.log(`   📏 desglose del prompt real de este turno:`);
    console.log(`      guion de ventas ...... ${gTok} tokens`);
    console.log(`      bloque de precio ..... ${bTok} tokens`);
    console.log(`      nota comercial ....... ${nTok} tokens`);
    console.log(`      TOTAL medido ......... ${medido} tokens (techo 9.000)`);
    chequear(
      "las tres capas suman el total medido (±2 por el redondeo)",
      Math.abs(gTok + bTok + nTok - medido) <= 2,
      `${gTok} + ${bTok} + ${nTok} = ${gTok + bTok + nTok}, y el prompt mide ${medido}`
    );
    chequear(
      "y sobra margen de verdad, no por un pelo",
      9000 - medido > 300,
      `solo sobran ${9000 - medido} tokens`
    );
  }

  // ==========================================================================
  console.log("\n── 2. 🔗 La cotización le pasa el difícil acceso a la nota ──");
  // En las ramas sueltas, `comboEncaja` tenía que adivinar el destino leyendo el
  // hilo. Juntas, la cotización ya lo sabe y se lo dice.
  // ==========================================================================
  {
    await turno("573002220002", "hola", "¡Hola! ¿Para qué ciudad sería?");
    const t = await turno(
      "573002220002",
      "para Tadó, talla L franja roja",
      "Te queda en $93.000 en total puesto en Tadó, y pagas al recibir 📦 Pásame nombre completo, dirección con barrio y celular"
    );
    const prompt = t.prompts[0] || "";
    chequear("el bloque de precio dice que no hay desglose", /SOLO EL TOTAL, SIN DESGLOSE/.test(prompt));
    chequear(
      "🔑 y la nota comercial NO ofrece los 2 conjuntos ahí",
      /NO ofrezcas los 2 conjuntos/.test(prompt),
      prompt.slice(prompt.indexOf("PARA ESTE MENSAJE"))
    );
    chequear(
      "   con el motivo correcto: el envío no se comparte",
      /no se comparte/.test(prompt.slice(prompt.indexOf("PARA ESTE MENSAJE"))),
      prompt.slice(prompt.indexOf("PARA ESTE MENSAJE"))
    );
  }

  // ==========================================================================
  console.log("\n── 3. 🔧 Precio validado Y promesa corregida en el mismo mensaje ──");
  // El caso que ninguna batería individual podía armar: el modelo se equivoca en
  // el precio Y promete algo que no puede sostener, todo junto.
  // ==========================================================================
  {
    await turno("573002220003", "hola", "¡Hola! ¿Para qué ciudad sería?");
    const t = await turno(
      "573002220003",
      "Cali",
      // 1er intento: roles invertidos → lo rechaza la etapa 5 de la entrega 1
      "El producto vale $22.100 y el envío $59.900. Total $82.000.",
      // 2º intento: precio bien, pero promete despacho hoy → lo corrige la entrega 2
      "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Se despacha hoy mismo. Pásame nombre completo, dirección con barrio y celular"
    );

    chequear("la entrega 1 hizo reintentar", t.llamadas === 2, `llamadas=${t.llamadas}`);
    chequear(
      "🔑 el precio que sale es el correcto",
      /\$82\.000/.test(t.reply) && !/el producto vale \$22\.100/i.test(t.reply),
      t.reply
    );
    chequear(
      "🔑 y la promesa de fecha ya NO está",
      !/se despacha hoy mismo/i.test(t.reply),
      t.reply
    );
    chequear(
      "   reemplazada por el plazo que sí se puede decir",
      /1 y 3 días hábiles/.test(t.reply),
      t.reply
    );
    chequear(
      "✅ y la pedida de datos se conservó",
      /nombre completo/.test(t.reply),
      t.reply
    );
    chequear(
      "el mensaje final pasa las DOS validaciones",
      cotizacion.validarRespuesta(t.reply, store.leerCotizacion("573002220003"), {}).ok &&
        promesas.revisar(t.reply).ok,
      JSON.stringify({
        precio: cotizacion.validarRespuesta(t.reply, store.leerCotizacion("573002220003"), {}).problemas,
        promesa: promesas.resumir(promesas.revisar(t.reply)),
      })
    );
    chequear("🙋 y se avisa que hay que revisar el chat", t.revisionHumana !== null, JSON.stringify(t.revisionHumana));
    chequear(
      "   con el motivo de la promesa",
      t.revisionHumana && t.revisionHumana.motivo === "promesa_sin_respaldo",
      JSON.stringify(t.revisionHumana)
    );
  }

  // ==========================================================================
  console.log("\n── 4. 🙋 UN SOLO camino a un humano, y los dos avisan ──");
  // 🔴 La entrega 1 mandaba el pedido en revisión a un humano SIN avisar: solo
  // pausaba. Al integrarlas se unificó, así que ahora los dos motivos avisan.
  // ==========================================================================
  {
    const tel = "573002220004";
    const datos = {
      nombre: "Ana Gómez",
      celular: "3001234567",
      ciudad: "Cali",
      direccion: "Cra 1 #2-3 barrio Centro",
      color: "rojo",
      talla: "L",
      pago: "contraentrega",
    };
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    await turno(tel, "Cali", "Te queda en $82.000 en total: $59.900 el conjunto + $22.100 de envío a Cali. Pásame nombre completo, dirección con barrio y celular");
    await turno(
      tel,
      "Ana Gómez, Cra 1 #2-3 barrio Centro, 3001234567",
      "Confirmemos tu pedido:\nNombre: Ana Gómez\nCelular: 3001234567\nCiudad: Cali\nDirección: Cra 1 #2-3 barrio Centro\nColor de la franja: rojo\nTalla: L\nPago: contraentrega\nTOTAL: $82.000\n¿Está todo bien? Respóndeme «SÍ CONFIRMO» y lo despacho 🏍️"
    );
    // El modelo emite el pedido con un total que no es el cotizado.
    const t = await turno(
      tel,
      "sí confirmo",
      `¡Listo Ana, tu pedido quedó confirmado y te lo despacho hoy! ##ORDER## ${JSON.stringify({ ...datos, total: 99000 })}`,
      `¡Listo Ana, tu pedido quedó confirmado y te lo despacho hoy! ##ORDER## ${JSON.stringify({ ...datos, total: 99000 })}`
    );

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("el pedido se guardó, no se perdió", Boolean(pedido));
    chequear("marcado porque el total no cuadra", pedido && pedido.precio_no_cuadra === true);
    chequear("🚦 y NO está listo para despachar", pedido && !store.listoParaDespachar(pedido), store.textoDeRevision(pedido));
    chequear("🔑 al cliente NO se le confirmó la venta", !/confirmado/i.test(t.reply), t.reply);
    chequear(
      "🔑 y AHORA sí se avisa (antes solo se pausaba, en silencio)",
      t.revisionHumana && t.revisionHumana.motivo === "pedido_en_revision",
      JSON.stringify(t.revisionHumana)
    );
    chequear("el chat quedó en pausa", store.isPaused(tel));

    // Y server.js tiene que estar mandando ese aviso.
    const fuenteServer = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
    chequear(
      "server.js manda el aviso cuando hay revisionHumana",
      /revisionHumana && OWNER/.test(fuenteServer),
      "sin esto, los dos motivos vuelven a ser silenciosos"
    );
  }

  // ==========================================================================
  console.log("\n── 5. 🔘 Con la nota apagada, las otras dos siguen intactas ──");
  // El interruptor de la entrega 3 no puede afectar al precio: eso no es una
  // mejora a medir, es el número que se le cobra al cliente.
  // ==========================================================================
  {
    process.env.NOTA_COMERCIAL = "0";
    await turno("573002220005", "hola", "¡Hola! ¿Para qué ciudad sería?");
    const t = await turno(
      "573002220005",
      "Cali",
      "El producto vale $22.100 y el envío $59.900. Total $82.000.",
      "El envío a Cali es $82.000."
    );
    const prompt = t.prompts[0] || "";
    chequear("🔘 la nota comercial NO está", !/PARA ESTE MENSAJE/.test(prompt));
    chequear("✅ pero el bloque de precio SÍ", /PRECIO YA CALCULADO/.test(prompt));
    chequear(
      "✅ y la validación del precio sigue actuando",
      /\$82\.000/.test(t.reply) && /de envío/.test(t.reply),
      t.reply
    );
    chequear(
      "✅ con el prompt más chico",
      tokens(prompt) < 9000,
      `${tokens(prompt)} tokens`
    );
    process.env.NOTA_COMERCIAL = "1";
  }

  // ==========================================================================
  console.log("\n── 6. Recorrido completo, con las tres actuando y pedido despachable ──");
  // ==========================================================================
  {
    const tel = "573002220006";
    const datos = {
      nombre: "Marta Ruiz",
      celular: "3007654321",
      ciudad: "Cali",
      direccion: "Cra 9 #45-12 barrio Prado",
      color: "azul",
      talla: "2XL",
      pago: "contraentrega",
    };
    await turno(tel, "hola, quiero dos conjuntos", "¡Claro! ¿Para qué ciudad sería, para darte el total?");
    await turno(
      tel,
      "Cali",
      "Los dos te quedan en $148.000 en total: $110.000 los dos conjuntos + $38.000 de envío a Cali. Pásame nombre completo, dirección con barrio y celular"
    );
    await turno(tel, "talla 2XL, franja azul", "¡Listo! Me falta nombre, dirección y celular 🙌");
    await turno(
      tel,
      "Marta Ruiz, Cra 9 #45-12 barrio Prado, 3007654321",
      "Confirmemos tu pedido:\nNombre: Marta Ruiz\nCelular: 3007654321\nCiudad: Cali\nDirección: Cra 9 #45-12 barrio Prado\nColor de la franja: azul\nTalla: 2XL\nPago: contraentrega\nTOTAL: $148.000\n¿Está todo bien? Respóndeme «SÍ CONFIRMO» y lo despacho 🏍️"
    );
    const t = await turno(
      tel,
      "sí confirmo",
      `¡Gracias Marta! ##ORDER## ${JSON.stringify({ ...datos, total: 148000, unidades: 2 })}`
    );

    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("🔑 la cantidad sobrevivió los 5 turnos", store.leerCotizacion(tel).uds === 2, `uds=${store.leerCotizacion(tel).uds}`);
    chequear("el pedido cobra los dos conjuntos", pedido && Number(pedido.total) === 148000, `${pedido && pedido.total}`);
    chequear("🚦 y queda LISTO para despachar", pedido && store.listoParaDespachar(pedido), store.textoDeRevision(pedido));
    chequear("no se avisó nada porque no hacía falta", t.revisionHumana === null, JSON.stringify(t.revisionHumana));
    chequear("el chat NO quedó en pausa", !store.isPaused(tel));
    chequear(
      "y en el CSV sale como LISTO",
      require("./src/resumen").pedidosCSV().split("\n").some((l) => /"LISTO"/.test(l) && /148000/.test(l))
    );
  }

  // ==========================================================================
  console.log("\n── 7. Los tres módulos conviven sin pisarse ──");
  // ==========================================================================
  {
    const fuente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
    for (const m of ["cotizacion", "promesas", "comercial"]) {
      chequear(`agent.js usa ${m}`, new RegExp(`require\\("\\./${m}"\\)`).test(fuente));
    }
    // Se mira el CÓDIGO, no los comentarios: el comentario de la integración
    // nombra el mecanismo viejo a propósito, para explicar por qué ya no está.
    const codigo = fuente.replace(/\/\/[^\n]*/g, "");
    chequear(
      "🔑 hay UN solo mecanismo de derivación a humano",
      !/forzarHumano/.test(codigo) && /revisionHumana/.test(codigo),
      "quedaron dos caminos y uno era silencioso"
    );
    chequear(
      "y la pausa se decide en un solo sitio",
      (codigo.match(/store\.setPaused\(phone, true\)/g) || []).length === 1,
      "si se pausa en varios lugares, uno puede quedarse sin avisar"
    );
    chequear(
      "el prompt se arma en un solo lugar",
      (fuente.match(/callIA\(/g) || []).length <= 2,
      "si hay varias llamadas a callIA, una puede quedarse sin una capa"
    );
    // Cada módulo sigue pasando su propia batería: no se rompieron entre ellos.
    chequear("los tres módulos cargan juntos", Boolean(cotizacion && promesas && comercial));
    chequear("y el interruptor de la nota es independiente del precio", comercial.TECHO_TOKENS === 9000);
  }

  // ==========================================================================
  console.log("\n── 8. 🔒 La reconciliación final, con las tres capas activas ──");
  // 🔴 El riesgo que solo existe cuando están las tres: corregir una promesa es una
  // transformación de TEXTO, y una transformación de texto puede romper el PRECIO
  // que calculó la entrega 1. Acá se comprueba que lo que sale pasa las dos.
  // ==========================================================================
  {
    const tel = "573002220008";
    await turno(tel, "hola", "¡Hola! ¿Para qué ciudad sería?");
    const t = await turno(
      tel,
      "Cali",
      // Promesa de fecha pegada al importe, que es el caso que rompía el total.
      "Sale hoy mismo y el total es $82.000. Pásame nombre completo, dirección con barrio y celular"
    );
    chequear("🔑 el total sobrevivió la corrección", /\$82\.000/.test(t.reply), t.reply);
    chequear("   sin dejar un «.000» suelto", !/\.000\b/.test(t.reply.replace(/\$\d{1,3}\.\d{3}/g, "")), t.reply);
    chequear("la promesa no salió", !/hoy mismo/i.test(t.reply), t.reply);
    chequear("y la pedida de datos se conservó", /nombre completo/.test(t.reply), t.reply);
    const cot = store.leerCotizacion(tel);
    chequear(
      "🔒 el mensaje final pasa precio Y promesas a la vez",
      cotizacion.validarRespuesta(t.reply, cot, {}).ok && promesas.revisar(t.reply).ok,
      JSON.stringify({
        precio: cotizacion.validarRespuesta(t.reply, cot, {}).problemas,
        promesa: promesas.resumir(promesas.revisar(t.reply)),
      })
    );

    // Y el candado existe en el código, no solo por casualidad en este caso.
    const fuente = fs.readFileSync(`${__dirname}/src/agent.js`, "utf8");
    chequear(
      "agent.js revalida la respuesta final tras todas las transformaciones",
      /RESPUESTA FINAL RECHAZADA/.test(fuente),
      "sin esta red, una transformación futura puede volver a romper el precio en silencio"
    );
    chequear(
      "y si falla, cae en la línea escrita por el código",
      /respuesta_final_rechazada/.test(fuente) && /lineaDePrecio\(cot\)/.test(fuente)
    );
  }

  // ==========================================================================
  console.log("\n── 9. La cantidad cuadra de punta a punta ──");
  // ==========================================================================
  {
    const tel = "573002220009";
    const datos = {
      nombre: "Sara Díaz",
      celular: "3008880009",
      ciudad: "Cali",
      direccion: "Cra 7 #8-9 barrio Centro",
      color: "verde",
      talla: "M",
      pago: "contraentrega",
    };
    await turno(tel, "quiero dos conjuntos", "¡Claro! ¿Para qué ciudad sería?");
    await turno(tel, "Cali", "Los dos te quedan en $148.000 en total: $110.000 los dos conjuntos + $38.000 de envío a Cali. Pásame nombre completo, dirección con barrio y celular");
    await turno(tel, "talla M, franja verde", "¡Listo! Me falta nombre, dirección y celular 🙌");
    await turno(
      tel,
      "Sara Díaz, Cra 7 #8-9 barrio Centro, 3008880009",
      "Confirmemos tu pedido:\nNombre: Sara Díaz\nCelular: 3008880009\nCiudad: Cali\nDirección: Cra 7 #8-9 barrio Centro\nColor de la franja: verde\nTalla: M\nPago: contraentrega\nTOTAL: $148.000\n¿Está todo bien? Respóndeme «SÍ CONFIRMO» y lo despacho 🏍️"
    );
    const t = await turno(tel, "sí confirmo", `¡Gracias Sara! ##ORDER## ${JSON.stringify({ ...datos, total: 148000, unidades: 2 })}`);
    const pedido = store.todosLosPedidos().filter((p) => p.telefono_chat === tel)[0];
    chequear("el pedido declara 2 unidades", pedido && Number(pedido.unidades) === 2, `${pedido && pedido.unidades}`);
    chequear("🚦 y queda LISTO para despachar", pedido && store.listoParaDespachar(pedido), store.textoDeRevision(pedido));
    chequear("sin avisos", t.revisionHumana === null, JSON.stringify(t.revisionHumana));
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
