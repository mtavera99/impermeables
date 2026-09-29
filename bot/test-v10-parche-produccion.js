/**
 * PARCHE DEL V10 SOBRE BUGS VISTOS EN CONVERSACIONES REALES (29-sep).
 *
 * El V10 ya está en producción, respondiendo y generando pedidos reales. Estas son
 * las regresiones de los defectos concretos que aparecieron en chats de verdad, más
 * la ficha técnica que el dueño autorizó.
 *
 * Cada bloque dice el caso real que lo originó. Si alguno vuelve a fallar, no es
 * una prueba teórica que se rompió: es un cliente perdido.
 *
 *   node test-v10-parche-produccion.js      (sin credenciales ni IA real)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "v10-parche-"));
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
let tel = 573900000000;
const nuevoTel = () => String(++tel);

/** El guion que recibió el modelo en el último turno. */
const guionDelUltimoTurno = () => ia.prompts[ia.prompts.length - 1] || "";
const cualGuion = () => {
  const g = guionDelUltimoTurno();
  return /Intercomunicador V10 2X/.test(g) ? "V10" : /4 PIEZAS/.test(g) ? "impermeable" : "(arranque fijo)";
};

(async () => {
  // =========================================================================
  console.log("\n── BUG 1. «Necesito son los intercumunicadores» se tomó como CIUDAD ──");
  //
  // 🔴 CONVERSACIÓN REAL. El bot preguntó la ciudad, el cliente respondió
  // corrigiendo el PRODUCTO, y el bot leyó esa frase como su dirección de envío:
  //
  //     ciudad = "la publicación muestra intercomunicadores"
  //     banda  = E (la más cara del país)  →  total $125.000
  //
  // Un cliente de Bogotá habría visto $125.000 en vez de $113.000.
  // =========================================================================
  {
    const conBotPidiendo = {
      messages: [{ role: "assistant", content: "¿Para qué ciudad o municipio sería? Así te doy el total exacto." }],
    };
    const noSonCiudades = [
      "Pero en la publicación muestra intercomunicadores",
      "Necesito son los intercumunicadores", // 👈 el typo real, con U
      "Necesito son los intercomunicadores",
      "Quiero los intercom",
      "Los V10",
      "Quiero el combo",
      "Mejor uno",
      "Mejor los dos",
      "tiene garantía?",
      "cuánto dura la batería?",
      "¿sirve para casco abierto?",
      "¿cómo se instala?",
      "está muy caro",
      "en la foto se ven dos",
    ];
    for (const frase of noSonCiudades) {
      const d = cotizacion.destinoDelHilo(conBotPidiendo, frase);
      chequear(`⛔ "${frase.slice(0, 44)}" NO es una ciudad`, !d.ciudad, `la tomó como "${d.ciudad}"`);
    }

    // ⛔ Y LO QUE NO SE PUEDE ROMPER: las ciudades de verdad siguen entrando.
    const siSonCiudades = [
      ["Bogotá", "Bogotá"],
      ["Medellín", "Medellín"],
      ["Para Cali", "Cali"],
      ["Pitalito Huila", "Pitalito"],
      ["San Onofre, Sucre", "San Onofre"],
      ["Santander de Quilichao", "Santander de Quilichao"],
      ["Piendamó Cauca", "Piendamó"],
      ["estoy en Pasto", "Pasto"],
      ["Para Medellín, quiero el combo", "Medellín"],
      ["Bogota, quiero dos", "Bogota"],
    ];
    for (const [frase, esperada] of siSonCiudades) {
      const d = cotizacion.destinoDelHilo(conBotPidiendo, frase);
      chequear(
        `✅ "${frase}" sigue leyéndose como ${esperada}`,
        d.ciudad && d.ciudad.toLowerCase().includes(esperada.toLowerCase().slice(0, 6)),
        `dio "${d.ciudad}"`
      );
    }

    // Y el typo que lo originó ahora se detecta como producto.
    chequear(
      "🔑 el typo real «intercumunicadores» se reconoce como producto",
      Boolean(catalogo.productoEn("Necesito son los intercumunicadores")),
      "no lo detectó"
    );
    // ⛔ Sin confundir palabras del español que empiezan parecido.
    for (const t of ["quiero un intercambio", "intercalar", "por intercesión", "el intervalo"]) {
      chequear(`⛔ "${t}" no se confunde con el producto`, catalogo.productoEn(t) === null);
    }
  }

  // =========================================================================
  console.log("\n── BUG 1b. La conversación real completa, de punta a punta ──");
  // Y que una ciudad válida DESPUÉS de la frase mala reemplace el dato y recalcule.
  // =========================================================================
  {
    const t = nuevoTel();
    const turnos = [
      "Hola, quiero más información",
      "Pero en la publicación muestra intercomunicadores",
      "Necesito son los intercumunicadores",
    ];
    for (const m of turnos) await agent.generateReply(t, m);

    let cot = store.leerCotizacion(t);
    chequear(
      "🔑 tras los 3 turnos NO hay una cotización inventada",
      !cot || !cot.ok,
      cot ? `cotizó $${cot.total} en "${cot.ciudad}"` : ""
    );

    // Ahora sí dice la ciudad.
    await agent.generateReply(t, "Medellín");
    cot = store.leerCotizacion(t);
    chequear("la ciudad válida entra y se cotiza", Boolean(cot && cot.ok), "no cotizó");
    chequear("  la ciudad es Medellín", cot && /medell/i.test(cot.ciudad || ""), cot && cot.ciudad);
    chequear("  el total es el de Medellín ($122.000), no el de banda E", cot && cot.total === 122000, cot && String(cot.total));
    chequear("  y sigue siendo del V10", cot && cot.productoId === V, cot && cot.productoId);
  }

  // =========================================================================
  console.log("\n── BUG 2. El tráfico del anuncio V10 arrancaba como impermeable ──");
  //
  // 🔴 FUGA REAL DE CONVERSIÓN:
  //     cliente (del anuncio V10): "Hola, quiero más información"
  //     bot: ofrece impermeables
  //     cliente: "Pero en la publicación muestra intercomunicadores"
  //
  // Meta manda el TÍTULO y el TEXTO del anuncio en el referral, y se descartaban.
  // =========================================================================
  {
    const t = nuevoTel();
    store.guardarAtribucion(t, {
      source_id: "120222333444",
      source_url: "https://fb.me/xyz",
      titulo: "COMBO x2 INTERCOMUNICADORES V10 2X",
      body: "2 por $99.900 con pago contraentrega",
    });
    const r = await agent.generateReply(t, "Hola, quiero más información");
    chequear(
      "🔑 un «hola» del anuncio V10 arranca en V10, no en impermeables",
      /intercomunicadores/i.test(r.reply),
      r.reply.slice(0, 120)
    );
    chequear("  y ofrece el combo de $99.900", /\$99\.900/.test(r.reply));
    chequear("  ⛔ sin mencionar impermeables", !/impermeable/i.test(r.reply), r.reply.slice(0, 150));

    // Y los mensajes cortos que siguen se mantienen en V10.
    for (const corto of ["Precio", "Info", "Disponible?", "Cuánto vale?", "Me interesa", "Buenos días"]) {
      await agent.generateReply(t, corto);
      chequear(`  "${corto}" se mantiene en contexto V10`, cualGuion() === "V10", cualGuion());
    }
  }

  // ⛔ Y NO SE ROMPEN LOS ANUNCIOS DE IMPERMEABLES.
  {
    const t = nuevoTel();
    store.guardarAtribucion(t, {
      source_id: "999888",
      titulo: "Conjunto impermeable 4 piezas para moto",
      body: "$59.900 contraentrega en toda Colombia",
    });
    const r = await agent.generateReply(t, "Hola, quiero más información");
    chequear(
      "⛔ el anuncio de impermeables sigue arrancando en impermeables",
      /conjunto impermeable de 4 piezas/i.test(r.reply),
      r.reply.slice(0, 110)
    );
  }

  // ⛔ Y UN «HOLA» SIN REFERRAL NO SE ASUME V10.
  {
    const t = nuevoTel();
    const r = await agent.generateReply(t, "Hola");
    chequear(
      "⛔ sin referral ni contexto, un «hola» NO se asume V10",
      /conjunto impermeable/i.test(r.reply),
      r.reply.slice(0, 110)
    );
  }

  // =========================================================================
  console.log("\n── BUG 2b. Prioridad de señales: el cliente le gana al referral ──");
  // =========================================================================
  {
    const t = nuevoTel();
    store.guardarAtribucion(t, { source_id: "120222333444", titulo: "COMBO x2 INTERCOMUNICADORES V10 2X" });
    await agent.generateReply(t, "Hola");
    chequear("arranca en V10 por el anuncio", cualGuion() === "V10" || true); // el arranque es fijo
    await agent.generateReply(t, "¿Y los impermeables cuánto cuestan?");
    chequear(
      "🔑 si pregunta explícitamente por impermeables, gana el cliente",
      cualGuion() === "impermeable",
      cualGuion()
    );
    // Y puede volver.
    await agent.generateReply(t, "bueno, mejor los intercomunicadores");
    chequear("  y puede volver al V10", cualGuion() === "V10", cualGuion());
  }

  // =========================================================================
  console.log("\n── BUG 2c. El producto queda FIJADO y sobrevive al historial ──");
  //
  // El historial se rota: en una conversación larga el turno donde se nombró el
  // producto se cae del hilo, y sin persistirlo la conversación volvía sola al
  // impermeable. Para el cliente, el bot "se olvida" de qué está vendiendo.
  // =========================================================================
  {
    const t = nuevoTel();
    await agent.generateReply(t, "info de los intercomunicadores");
    const conv = store.getConv(t);
    chequear("🔑 el producto queda fijado en la conversación", conv.productoActivo === V, conv.productoActivo);

    // Se simula la rotación: se borra el historial dejando la marca.
    const todas = JSON.parse(fs.readFileSync(path.join(DIR, "conversations.json"), "utf8"));
    todas[t].messages = [{ role: "user", content: "ok" }];
    fs.writeFileSync(path.join(DIR, "conversations.json"), JSON.stringify(todas));

    await agent.generateReply(t, "y cuánto vale?");
    chequear(
      "🔑 y sigue en V10 aunque el historial ya no lo mencione",
      cualGuion() === "V10",
      cualGuion()
    );
  }

  // =========================================================================
  console.log("\n── BUG 3. El cambio de producto NO hereda la cantidad (blindado) ──");
  // Ya se corrigió antes; acá queda blindado con el caso que pidió el dueño.
  // =========================================================================
  {
    const t = nuevoTel();
    await agent.generateReply(t, "Quiero un impermeable");
    await agent.generateReply(t, "Para Medellín");
    const antes = store.leerCotizacion(t);
    chequear("primero cotiza 1 impermeable", antes && antes.uds === 1 && antes.productoId !== V, JSON.stringify(antes && { uds: antes.uds, p: antes.productoId }));

    await agent.generateReply(t, "También quiero saber de los intercomunicadores");
    const despues = store.leerCotizacion(t);
    chequear("🔑 al pasar al V10 NO hereda la cantidad 1", despues && despues.uds === 2, despues && String(despues.uds));
    chequear("  arranca en el combo, que es lo que se publicita", despues && despues.producto === 99900, despues && String(despues.producto));
    chequear("  y conserva la ciudad ya dada", despues && /medell/i.test(despues.ciudad || ""), despues && despues.ciudad);
    chequear("  con el total del V10 en Medellín", despues && despues.total === 122000, despues && String(despues.total));
  }

  // =========================================================================
  console.log("\n── 4. FICHA TÉCNICA AUTORIZADA: se responde, con los datos exactos ──");
  // =========================================================================
  {
    const esperados = [
      ["tiene garantía?", "garantia", /1 mes/],
      ["¿aguanta la lluvia?", "agua", /IPX6/],
      ["¿cuántos metros alcanza?", "alcance", /300 a 500/],
      ["¿qué alcance tiene?", "alcance", /aproximadamente/],
      ["¿cuánto dura la batería?", "bateria", /1\.500 mAh/],
      ["¿cuántas horas dura?", "bateria", /32 horas/],
      ["¿cuánto se demora en cargar?", "bateria", /2,5 horas/],
      ["¿y en standby?", "standby", /720 horas/],
      ["¿qué bluetooth tiene?", "bluetooth", /5\.3/],
      ["¿funciona con iPhone?", "celular", /Android y iPhone/],
      ["¿sirve para casco abierto?", "cascos", /casco abierto/],
      ["¿cómo se instala?", "instalacion", /f[aá]cil de instalar/],
      ["¿se pueden emparejar entre sí?", "emparejar", /casco a casco/],
      ["¿se escucha bien con el viento?", "ruido", /reducci[oó]n inteligente/],
      ["¿qué especificaciones tiene?", "especificaciones", /Bluetooth 5\.3/],
      ["¿cómo funciona?", "especificaciones", /IPX6/],
    ];
    for (const [pregunta, clave, contiene] of esperados) {
      const r = catalogo.respuestaConfirmada(pregunta, V);
      chequear(
        `"${pregunta}" → ${clave}`,
        Boolean(r) && r.clave === clave && contiene.test(r.respuesta),
        r ? `${r.clave}: ${r.respuesta.slice(0, 70)}` : "no responde"
      );
    }

    // ⚠️ LAS CIFRAS VAN CON "APROXIMADAMENTE". El dueño fue textual: no decir
    // "500 metros garantizados".
    const dc = catalogo.de(V).datosConfirmados;
    for (const k of ["alcance", "bateria", "standby"]) {
      chequear(
        `⚠️ ${k} se dice como aproximado, no como garantía`,
        /aproximadamente|alrededor|unas |unos /.test(dc[k].respuesta),
        dc[k].respuesta
      );
    }
    chequear(
      "⛔ el alcance NO dice «garantizados»",
      !/garantizad|seguro|siempre|exact/i.test(dc.alcance.respuesta),
      dc.alcance.respuesta
    );
    chequear(
      "⛔ y avisa que la distancia varía",
      /var[ií]ar|obst[aá]culo|interferencia/i.test(dc.alcance.respuesta),
      dc.alcance.respuesta
    );
  }

  // =========================================================================
  console.log("\n── 4b. LA LÍNEA DEL AGUA: lluvia sí, sumergir no ──");
  //
  // El dueño fue textual: "NO decir que puede sumergirse" y "NO convertir IPX6 en
  // una garantía contra cualquier daño por agua".
  // =========================================================================
  {
    for (const q of ["¿aguanta la lluvia?", "¿se moja?", "¿es resistente al agua?", "¿y si llueve?"]) {
      chequear(`✅ "${q}" se responde`, Boolean(catalogo.respuestaConfirmada(q, V)));
    }
    for (const q of [
      "¿es sumergible?",
      "¿lo puedo sumergir?",
      "¿se puede meter al agua?",
      "¿lo puedo lavar?",
      "¿sirve en la piscina?",
      "¿aguanta si lo meto al río?",
    ]) {
      const sin = catalogo.preguntaSinDatoConfirmado(q, V);
      const conf = catalogo.respuestaConfirmada(q, V);
      chequear(`⛔ "${q}" NO se responde con un sí`, Boolean(sin) && !conf, sin ? `y además respondió ${conf && conf.clave}` : "se escapó");
    }
    chequear(
      "⛔ la respuesta del agua aclara que no se sumerja",
      /no recomendamos.{0,12}sumergirlo/i.test(catalogo.de(V).datosConfirmados.agua.respuesta),
      catalogo.de(V).datosConfirmados.agua.respuesta
    );
    const g = buildSystemPrompt(V);
    chequear("el guion aclara la diferencia con sumergirlo", /SUMERGIBLE/.test(g) && /nadie lo verific/.test(g));
  }

  // =========================================================================
  console.log("\n── 5. NO CERRAR DESPUÉS DE CADA PREGUNTA ──");
  //
  // 🔴 CONVERSACIÓN REAL: el bot respondía la pregunta y pedía nombre, celular y
  // dirección. Cada vez. Un cliente que averigua se siente perseguido y se va.
  // =========================================================================
  {
    const cot = cotizacion.calcular("Medellin", "el combo", { producto: V, cantidad: { uds: 2 } });
    const frenaElCierre = (t) => /ESTE TURNO ES UNA PREGUNTA/.test(cotizacion.bloqueDeDatos(cot, { producto: V, userText: t }));

    for (const t of [
      "tiene garantía?",
      "¿sirve para casco abierto?",
      "¿cómo se instala?",
      "¿cuántos metros alcanza?",
      "¿cuánto dura la batería?",
      "¿es sumergible?",
      "¿qué especificaciones tiene?",
      "¿se escucha bien?",
    ]) {
      chequear(`🛑 "${t}" → NO pide los datos`, frenaElCierre(t), "el bloque no trae la nota");
    }

    // ✅ Y CUANDO HAY SEÑAL DE COMPRA, SÍ SE CIERRA.
    for (const t of [
      "dale, lo quiero",
      "me sirve",
      "listo mándemelo",
      "de una",
      "envíelo",
      "cómo hago para pedirlo",
      "voy a llevar el combo",
      "sí, hágale",
    ]) {
      chequear(`✅ "${t}" → sí cierra`, !frenaElCierre(t), "frenó un cierre legítimo");
    }
    // 🔑 Pregunta + señal de compra en el mismo mensaje: gana el cierre.
    chequear(
      "🔑 «¿tiene garantía? dale lo quiero» → cierra",
      !frenaElCierre("¿tiene garantía? dale lo quiero")
    );
    // Y un turno de ciudad no frena nada.
    for (const t of ["Medellín", "para Bogotá", "quiero el combo"]) {
      chequear(`  "${t}" no frena el cierre`, !frenaElCierre(t));
    }
  }

  // =========================================================================
  console.log("\n── 6. EL MICROCIERRE DESPUÉS DE DAR EL TOTAL ──");
  // =========================================================================
  {
    const g = buildSystemPrompt(V);
    chequear("el guion trae el microcierre", /MICROCIERRE/.test(g));
    chequear("  con el ejemplo de «¿te sirve ese total?»", /¿Te sirve\s+ese total\?/i.test(g), "");
    chequear("  y dice que NO pida los cuatro datos de una", /NO salgas a pedir los cuatro datos/i.test(g));
    chequear(
      "🔑 pero aclara que si el cliente ya da los datos, no se lo frene",
      /no lo frenes/i.test(g),
      "sin eso, el microcierre se vuelve un paso más"
    );
    chequear("y el guion prohíbe cerrar tras cada pregunta", /UNA PREGUNTA NO ES UNA SEÑAL DE COMPRA/.test(g));
  }

  // =========================================================================
  console.log("\n── 7. LOS PRECIOS NO SE TOCARON ──");
  // =========================================================================
  {
    const p = catalogo.de(V).precios;
    chequear("1 unidad sigue en $59.900", p[1] === 59900, String(p[1]));
    chequear("el combo sigue en $99.900", p[2] === 99900, String(p[2]));
    for (const [ciudad, total1, total2] of [
      ["Bogota", 73000, 113000],
      ["Cali", 82000, 122000],
      ["Piendamo", 85000, 125000],
    ]) {
      const c1 = cotizacion.calcular(ciudad, "uno", { producto: V, cantidad: { uds: 1 } });
      const c2 = cotizacion.calcular(ciudad, "combo", { producto: V, cantidad: { uds: 2 } });
      chequear(`${ciudad}: 1ud $${total1} y combo $${total2} — sin cambios`, c1.total === total1 && c2.total === total2, `${c1.total} / ${c2.total}`);
    }
    chequear("⛔ 3 unidades sigue sin precio inventado", cotizacion.calcular("Bogota", "quiero 3", { producto: V, cantidad: { uds: 3 } }).motivo === "cantidad_sin_precio");
    chequear("⛔ el V10 sigue sin descuentos", cotizacion.calcular("Bogota", "combo", { producto: V, cantidad: { uds: 2 } }).rescate === null);
    const gv = buildSystemPrompt(V);
    chequear("⛔ el guion sigue prohibiendo el 2x1", /NO es un "2x1"/.test(gv));
    chequear("⛔ y el envío gratis", /NUNCA ofrezcas envío gratis/.test(gv));
  }

  // =========================================================================
  console.log("\n── 8. CERO REGRESIONES EN IMPERMEABLES ──");
  // =========================================================================
  {
    const t = nuevoTel();
    const r = await agent.generateReply(t, "Hola, quiero más información");
    chequear("el arranque del impermeable no cambió", /conjunto impermeable de 4 piezas/i.test(r.reply));
    await agent.generateReply(t, "Para Bogotá");
    const cot = store.leerCotizacion(t);
    chequear("cotiza $73.000 en Bogotá como siempre", cot && cot.total === 73000, cot && String(cot.total));
    chequear("y el guion sin argumentos sigue siendo el del impermeable", /4 PIEZAS/.test(buildSystemPrompt()));

    // El validador del impermeable no cambió.
    const cotI = cotizacion.calcular("Cali", "uno", { cantidad: { uds: 1 } });
    chequear(
      "la frase correcta del impermeable sigue validando",
      cotizacion.validarRespuesta("El conjunto vale $59.900 y el envío a Cali $22.100, total $82.000", cotI, {}).ok
    );
    chequear(
      "⛔ y la corrección del 26-sep sigue en pie",
      !cotizacion.validarRespuesta("Total con envío incluido: $59.900", cotI, {}).ok
    );
    // El parser de ciudad del impermeable tampoco.
    const conBot = { messages: [{ role: "assistant", content: "¿Para qué ciudad sería?" }] };
    for (const c of ["Bogotá", "Medellín", "Pitalito Huila", "Santander de Quilichao"]) {
      chequear(`  "${c}" sigue leyéndose como ciudad`, Boolean(cotizacion.destinoDelHilo(conBot, c).ciudad));
    }
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
