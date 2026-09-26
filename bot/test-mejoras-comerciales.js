/**
 * TRES MEJORAS COMERCIALES, PROBADAS UNA POR UNA.
 *
 * DE DÓNDE SALE (26-sep), textual del dueño:
 *   "mejoras comerciales como pruebas medibles — resolver dudas antes de pedir
 *    datos, adaptar cierre a la intención, ofrecer 2 unidades solo cuando encaje"
 *   "Mantén los límites actuales de descuento."
 *
 * 🔑 QUÉ PRUEBA ESTA BATERÍA: que el código clasifica bien la conversación y que
 * la nota del turno dice lo que corresponde en cada caso.
 *
 * ⛔ QUÉ NO PRUEBA: que esto venda más. Eso es una afirmación causal y no hay con
 * qué sostenerla todavía. Haría falta comparar conversión antes/después sobre
 * periodos con volumen parecido. Acá no se afirma en ninguna parte.
 *
 *   node test-mejoras-comerciales.js      (sin credenciales ni IA)
 */

const comercial = require("./src/comercial");
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

const u = (t) => ({ role: "user", content: t });
const b = (t) => ({ role: "assistant", content: t });
const corto = (s, n = 46) => (s.length > n ? s.slice(0, n) + "…" : s);

// ============================================================================
console.log("\n── 1. Las dudas reales del cliente se reconocen ──");
// ============================================================================
// Las 10 familias de duda, cada una con una frase como la escribe un cliente.
const DUDAS_REALES = [
  ["de qué talla hay?", "talla"],
  ["cuál es mi talla, uso M normalmente?", "talla"],
  ["qué colores tienen?", "color"],
  ["se moja con lluvia fuerte?", "impermeabilidad"],
  ["de verdad impermeable o se filtra?", "impermeabilidad"],
  ["de qué material es?", "material"],
  ["qué trae el conjunto?", "material"],
  ["cuánto tarda en llegar?", "tiempo_de_entrega"],
  ["cuándo me llega?", "tiempo_de_entrega"],
  ["cómo pago?", "forma_de_pago"],
  ["puedo pagar con Nequi?", "forma_de_pago"],
  ["es seguro comprar así?", "confianza"],
  ["esto no es una estafa?", "confianza"],
  ["y si no me queda, puedo cambiarlo?", "devolucion"],
  ["puedo pasar a recoger?", "recogida"],
  ["tienen local físico?", "recogida"],
  ["manejan al por mayor?", "mayorista"],
];
for (const [frase, esperada] of DUDAS_REALES) {
  const claves = comercial.dudasDe(frase).map((d) => d.clave);
  chequear(
    `${esperada}: "${corto(frase)}"`,
    claves.includes(esperada),
    `detectó [${claves.join(", ") || "nada"}]`
  );
}

// 🔑 Y lo que NO es una pregunta no puede marcarse como duda: si todo es duda,
// la nota se dispara siempre y deja de significar algo.
const NO_SON_DUDAS = [
  "Ana Pérez, Cra 1 #2-3 barrio Centro, 3001234567",
  "Bogotá",
  "talla L y franja roja",
  "sí, lo quiero",
  "listo, confirmo",
];
for (const frase of NO_SON_DUDAS) {
  const claves = comercial.dudasDe(frase).map((d) => d.clave);
  chequear(`NO es duda: "${corto(frase)}"`, claves.length === 0, `marcó [${claves.join(", ")}]`);
}

// 🔴 El falso positivo que se encontró armando esto: "demora mucho?" pregunta por
// el TIEMPO, y un `mucho` suelto en el patrón de precio hacía que el bot le
// rebatiera el precio a quien preguntó cuándo le llega.
chequear(
  '🔑 "demora mucho?" es tiempo de entrega, NO objeción de precio',
  comercial.intencion("demora mucho?").clave !== "objecion_de_precio" &&
    comercial.dudasDe("demora mucho?").some((d) => d.clave === "tiempo_de_entrega"),
  `clasificó como ${comercial.intencion("demora mucho?").clave}`
);

// ============================================================================
console.log("\n── 2. 🔑 Contestar la duda ANTES de pedir los datos ──");
// ============================================================================
// El guion obliga a cerrar pidiendo los datos (50,7% avanzó, n=473) y prohíbe la
// pregunta abierta (25,3%, n=87). Lo que no dice es qué hacer si el cliente
// preguntó algo. Lo correcto es LAS DOS COSAS, en este orden.

const BIEN =
  "Te recomiendo una talla más de la que usas porque va encima de la ropa 🏍️ " +
  "Pásame nombre completo, dirección con barrio y celular y te lo despacho.";
chequear("contesta y después pide: se acepta", comercial.dudaResuelta(BIEN, "talla"));
chequear(
  "🔑 y el orden es el correcto",
  comercial.resolvioAntesDePedir(BIEN, "talla"),
  "la respuesta a la talla debería ir antes de la pedida de datos"
);
{
  const r = comercial.revisar(BIEN, { userText: "de qué talla hay?", messages: [u("de qué talla hay?")] });
  chequear("sin hallazgos", r.ok, comercial.resumir(r));
}

const AL_REVES =
  "Pásame nombre completo, dirección con barrio y celular para despacharlo. " +
  "Ah, y te recomiendo una talla más de la que usas.";
chequear(
  "🔴 pedir primero y contestar después SÍ se marca",
  !comercial.resolvioAntesDePedir(AL_REVES, "talla"),
  "el cliente lee «pasame tus datos» antes de la respuesta a lo que preguntó"
);
{
  const r = comercial.revisar(AL_REVES, { userText: "de qué talla hay?", messages: [u("de qué talla hay?")] });
  chequear(
    "y el hallazgo lo nombra",
    r.hallazgos.some((h) => h.clave === "pidio_datos_antes_de_contestar"),
    comercial.resumir(r)
  );
}

const SIN_CONTESTAR =
  "¡Claro que sí! Pásame nombre completo, dirección con barrio y celular 🙌";
{
  const r = comercial.revisar(SIN_CONTESTAR, {
    userText: "se moja con lluvia fuerte?",
    messages: [u("se moja con lluvia fuerte?")],
  });
  chequear(
    "🔴 ignorar la duda del todo se marca",
    r.hallazgos.some((h) => h.clave === "duda_sin_contestar"),
    comercial.resumir(r)
  );
}

// Y el caso que el embudo señala como el peor: la respuesta que no pide nada.
// 688 de 1.255 clientes caídos después del total no volvieron a escribir nunca.
{
  const r = comercial.revisar("Sí, es 100% impermeable, PVC termosellado. ¿Alguna otra duda?", {
    userText: "se moja?",
    messages: [u("se moja?")],
  });
  chequear(
    '🔴 "¿alguna otra duda?" se marca como que no avanza',
    r.hallazgos.some((h) => h.clave === "no_avanza"),
    comercial.resumir(r)
  );
}

// 📊 Y la distinción que el embudo obliga a hacer: preguntar la talla es lo que
// toca ANTES del total, y es el PEOR cierre después (24,8%, n=1.192, el más usado).
{
  const antes = comercial.revisar("Va de talla S a 3XL 🏍️ ¿Qué talla prefieres?", {
    userText: "de qué talla hay?",
    messages: [u("de qué talla hay?")],
  });
  chequear("antes del total, preguntar la talla SÍ avanza", antes.ok, comercial.resumir(antes));

  const despues = comercial.revisar("Va de talla S a 3XL 🏍️ ¿Qué talla prefieres?", {
    userText: "de qué talla hay?",
    messages: [u("Bogotá"), b("Te llega a $82.000, pagas al recibir 📦"), u("de qué talla hay?")],
  });
  chequear(
    "🔑 pero después del total se marca: es el peor cierre medido",
    despues.hallazgos.some((h) => h.clave === "no_avanza"),
    comercial.resumir(despues)
  );
}

// ============================================================================
console.log("\n── 3. El cierre que encaja con la intención ──");
// ============================================================================
const INTENCIONES_REALES = [
  ["el envío está muy caro", "objecion_de_precio"],
  ["no me alcanza ahorita", "objecion_de_precio"],
  ["es seguro? me da desconfianza", "desconfianza"],
  ["lo voy a pensar", "comparando"],
  ["vi uno más barato en otro lado", "comparando"],
  ["listo, lo quiero", "listo_para_cerrar"],
  ["cómo pago? lo llevo", "listo_para_cerrar"],
  ["de qué talla hay?", "duda_de_producto"],
  ["hola", "frio"],
  ["buenas", "frio"],
];
for (const [frase, esperada] of INTENCIONES_REALES) {
  const i = comercial.intencion(frase);
  chequear(`${esperada}: "${corto(frase)}"`, i.clave === esperada, `dio ${i.clave}`);
}

// 🔑 La prioridad importa y está pensada: quien desconfía no cierra aunque diga
// "lo quiero". Primero se le baja la desconfianza.
chequear(
  '🔑 "lo quiero pero es seguro?" → primero la desconfianza',
  comercial.intencion("lo quiero pero es seguro?").clave === "desconfianza",
  `dio ${comercial.intencion("lo quiero pero es seguro?").clave}`
);

// Cada intención tiene que traer qué hacer Y qué evitar: un cierre sin el "qué
// evitar" es media instrucción.
for (const i of comercial.INTENCIONES) {
  chequear(
    `${i.clave} trae cierre y qué evitar`,
    typeof i.cierre === "string" && i.cierre.length > 10 && typeof i.evitar === "string" && i.evitar.length > 10
  );
}

// El cierre de quien ya dijo que sí no puede ser "volver a vender".
chequear(
  "🔑 a quien ya dijo que sí no se le vuelve a vender",
  /no vuelvas a explicar|ya dijo que si/i.test(
    comercial.intencion("listo, lo quiero").evitar.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  ),
  comercial.intencion("listo, lo quiero").evitar
);

// Y a quien objeta el precio, el combo va ANTES de tocar el precio: eso mantiene
// los límites de descuento actuales, que el dueño pidió no mover.
chequear(
  "🔑 en objeción de precio, los 2 conjuntos van antes del descuento",
  /2 conjuntos|dos conjuntos/i.test(comercial.intencion("está muy caro").cierre),
  comercial.intencion("está muy caro").cierre
);

// ============================================================================
console.log("\n── 4. Los 2 conjuntos: SOLO cuando encaja ──");
// ============================================================================
// El combo está medido y es la venta más rentable (share 6,8% → 26,8%). Nada de
// esto lo restringe en el momento que el guion ya autoriza. Lo que se agrega son
// las situaciones donde pisa algo que ya está decidido.

const YA_ELIGIO = [u("Bogotá"), b("Te llega a $82.000 📦"), u("talla L, franja roja")];

{
  const c = comercial.comboEncaja(YA_ELIGIO);
  chequear("✅ ya eligió talla y color y no se cerró → encaja", c.encaja, c.motivo);
  chequear("y no como señal fuerte, sino como el momento normal", c.clave === "momento_correcto", c.clave);
}

{
  const c = comercial.comboEncaja(YA_ELIGIO, { sinPromo2: true });
  chequear("⛔ difícil acceso → no encaja", !c.encaja && c.clave === "dificil_acceso", c.motivo);
  chequear("y el motivo dice que el envío no se comparte", /no se comparte/.test(c.motivo), c.motivo);
}
{
  // 🔑 Y lo detecta solo, leyendo el destino del hilo: no necesita que otro
  // módulo detecte la ciudad primero.
  const aTado = [u("Tadó Chocó"), b("Te llega a $93.000 📦"), u("talla L, franja roja")];
  const c = comercial.comboEncaja(aTado);
  chequear(
    "🔑 y lo detecta solo si el cliente nombró Tadó",
    !c.encaja && c.clave === "dificil_acceso",
    `dio ${c.clave}: ${c.motivo}`
  );
  chequear("El Charco también", comercial.destinoSinPromo2([u("es para El Charco, Nariño")]));
  // 🔴 El falso positivo que casi se colaba: "tado" está dentro de "contado".
  chequear(
    '🔴 pero "pago de contado" NO es Tadó',
    !comercial.destinoSinPromo2([u("puedo pagar de contado?")]),
    "un includes() en vez de límites de palabra apagaba el combo en media Colombia"
  );
  chequear(
    '🔴 ni "el resultado" ni "apartado"',
    !comercial.destinoSinPromo2([u("cuál fue el resultado del apartado?")])
  );
}

{
  const cerrada = [...YA_ELIGIO, b("Confirmemos tu pedido:\nTOTAL: $82.000\n¿Está todo bien?")];
  const c = comercial.comboEncaja(cerrada);
  chequear("⛔ el cuadro ya se mostró → no se vende de nuevo", !c.encaja && c.clave === "venta_cerrada", c.motivo);
}

{
  const insistiendo = [
    u("talla L, franja roja"),
    b("¿Te cuento? Los dos conjuntos te salen en $148.000 📦"),
    u("solo uno gracias"),
  ];
  const c = comercial.comboEncaja(insistiendo);
  chequear(
    "⛔ 🔑 ya lo ofreciste y dijo uno solo → no insistir",
    !c.encaja && c.clave === "ya_dijo_uno",
    c.motivo
  );
  chequear("y el motivo nombra la insistencia", /insistencia/.test(c.motivo), c.motivo);
}

{
  const conDuda = [u("talla L, franja roja"), b("¡Perfecto!"), u("se moja con lluvia fuerte?")];
  const c = comercial.comboEncaja(conDuda);
  chequear("⛔ hay una duda sin contestar → primero la duda", !c.encaja && c.clave === "duda_pendiente", c.motivo);
  chequear("y el motivo nombra la duda", /impermeabilidad/.test(c.motivo), c.motivo);
}

{
  const temprano = [u("Bogotá"), b("Te llega a $82.000, pásame nombre completo 🙌")];
  const c = comercial.comboEncaja(temprano);
  chequear(
    "⛔ todavía no eligió talla ni color → de entrada se lee como descuento",
    !c.encaja && c.clave === "falta_elegir",
    c.motivo
  );
}

{
  const dosPersonas = [
    u("Bogotá"),
    b("Te llega a $82.000 📦"),
    u("somos dos, para mi esposo también. Talla L y M, franja negra"),
  ];
  const c = comercial.comboEncaja(dosPersonas);
  chequear("✅ 🔑 mencionó a otra persona → señal fuerte", c.encaja && c.senalFuerte, c.motivo);
  chequear("y el motivo dice que el cliente ya lo pidió", /ya dijo que necesita/.test(c.motivo), c.motivo);
}

// La revisión posterior marca el combo ofrecido fuera de lugar.
{
  const r = comercial.revisar("Los dos conjuntos te salen en $148.000. Pásame nombre completo 🙌", {
    userText: "se moja?",
    messages: [u("talla L, franja roja"), b("¡Perfecto!"), u("se moja?")],
  });
  chequear(
    "🔴 combo ofrecido con una duda abierta se marca",
    r.hallazgos.some((h) => h.clave === "combo_fuera_de_lugar"),
    comercial.resumir(r)
  );
}

// ============================================================================
console.log("\n── 5. No volver a preguntar lo que el cliente ya dijo ──");
// ============================================================================
{
  const faltan = comercial
    .datosQueFaltan([u("Bogotá")], { ciudad: "Bogotá" })
    .map((f) => f.clave);
  chequear("con solo la ciudad, faltan los otros cinco", faltan.length === 5, `faltan [${faltan.join(", ")}]`);
  chequear("y la ciudad NO se vuelve a pedir", !faltan.includes("ciudad"), `faltan [${faltan.join(", ")}]`);
}
{
  const hilo = [u("Cali"), b("Te llega a $82.000"), u("talla L, franja roja"), u("Ana Pérez, Cra 1 #2-3 barrio Centro, 3001234567")];
  const faltan = comercial.datosQueFaltan(hilo, { ciudad: "Cali", nombre: "Ana Pérez" }).map((f) => f.clave);
  chequear("🔑 con el hilo completo no falta nada", faltan.length === 0, `faltan [${faltan.join(", ")}]`);
}
{
  // El caso que motivó esto: la talla la dijo hace diez mensajes y se volvía a preguntar.
  const hilo = [u("talla 2XL"), b("Listo"), u("Bogotá"), b("Te llega a $82.000")];
  const faltan = comercial.datosQueFaltan(hilo, { ciudad: "Bogotá" }).map((f) => f.clave);
  chequear("🔑 la talla dicha al principio se conserva", !faltan.includes("talla"), `faltan [${faltan.join(", ")}]`);
}

// ============================================================================
console.log("\n── 6. 📏 La nota del turno NO toca el guion base ──");
// ============================================================================
// Esta es la parte arquitectónica y es la razón de que todo esto viva en código.
const guion = buildSystemPrompt();
const tokensGuion = Math.round(guion.length / 4);
chequear(
  `el guion base sigue bajo el techo de 9.000 (${tokensGuion})`,
  tokensGuion < 9000,
  `el guion quedó en ${tokensGuion} tokens`
);
chequear(
  "🔑 y este módulo no le agregó nada: no aparece en el guion",
  !/PARA ESTE MENSAJE/.test(guion),
  "la nota del turno no puede estar dentro de buildSystemPrompt()"
);

// Turnos donde no hay nada que decir no pagan tokens.
chequear(
  'un "hola" no genera nota',
  comercial.notaDeTurno([u("hola")], "hola") === "",
  JSON.stringify(comercial.notaDeTurno([u("hola")], "hola"))
);
chequear(
  "dar los datos tampoco genera nota de duda",
  !/PREGUNTÓ/.test(
    comercial.notaDeTurno(
      [u("Cali"), u("talla L, franja roja"), u("Ana Pérez, Cra 1 #2-3, 3001234567")],
      "Ana Pérez, Cra 1 #2-3, 3001234567",
      { yaConocidos: { ciudad: "Cali", nombre: "Ana Pérez" } }
    )
  )
);

// Y cuando sí hay algo que decir, lo dice.
{
  const nota = comercial.notaDeTurno(
    [u("Bogotá"), b("Te llega a $82.000"), u("se moja con lluvia fuerte?")],
    "se moja con lluvia fuerte?",
    { yaConocidos: { ciudad: "Bogotá" } }
  );
  chequear("la duda entra en la nota", /PREGUNTÓ/.test(nota) && /impermeabilidad/.test(nota), nota);
  chequear("con el cómo resolverla", /termosellada/.test(nota), nota);
  chequear("y con lo que falta por saber", /Falta por saber/.test(nota), nota);
}
{
  const nota = comercial.notaDeTurno(
    [u("talla L, franja roja"), b("Los dos conjuntos te salen en $148.000"), u("solo uno gracias")],
    "solo uno gracias"
  );
  chequear("el «no insistas con el combo» entra en la nota", /NO ofrezcas los 2 conjuntos/.test(nota), nota);
}
{
  // ⚠️ falta_elegir NO va en la nota a propósito: ya está en el guion y
  // repetirlo en cada turno temprano la llenaría de ruido.
  const nota = comercial.notaDeTurno([u("Bogotá")], "Bogotá", { yaConocidos: { ciudad: "Bogotá" } });
  chequear(
    "pero lo que YA dice el guion no se repite en la nota",
    !/NO ofrezcas los 2 conjuntos/.test(nota),
    nota
  );
}

// 🔒 El tope: con el caso más cargado que se pueda armar, la nota no se desborda.
const CARGADO_TXT =
  "solo uno. está muy caro, de qué material es, cuánto tarda, cómo pago, es seguro, puedo pasar a recoger?";
const CARGADO = [
  u("talla L, franja roja"),
  b("Los dos conjuntos te salen en $148.000"),
  u(CARGADO_TXT),
];
{
  const nota = comercial.notaDeTurno(CARGADO, CARGADO_TXT, { yaConocidos: { ciudad: "Bogotá" } });
  chequear(
    `🔒 la nota más cargada respeta el tope de ${comercial.TOPE_NOTA} (${nota.length})`,
    nota.length <= comercial.TOPE_NOTA,
    `la nota quedó en ${nota.length} caracteres`
  );
  chequear(
    "y se corta por línea entera, sin dejar media instrucción",
    nota.endsWith("\n") && !/- [^\n]*$/.test(nota),
    JSON.stringify(nota.slice(-60))
  );
}

// ============================================================================
console.log("\n── 6b. 🔘 El interruptor es explícito, no el espacio del prompt ──");
// 🔴 La revisión corrigió el diseño: usar el margen del prompt como mecanismo de
// activación ataba el comportamiento del bot a cuánto mide el guion, y no dejaba
// ni prenderla ni apagarla a propósito.
{
  const previo = process.env.NOTA_COMERCIAL;

  // Apagada por defecto: es una mejora a medir, no el arreglo de algo roto.
  delete process.env.NOTA_COMERCIAL;
  const apagada = comercial.guionConNota(guion, CARGADO, CARGADO_TXT, { yaConocidos: { ciudad: "Bogotá" } });
  chequear(
    "🔘 sin la variable, la nota está APAGADA",
    apagada.activa === false && apagada.nota === "" && apagada.prompt === guion,
    `activa=${apagada.activa}, nota=${apagada.nota.length} chars`
  );
  chequear("y el guion sale intacto", apagada.prompt.length === guion.length);

  process.env.NOTA_COMERCIAL = "0";
  chequear("con 0 también está apagada", comercial.guionConNota(guion, CARGADO, CARGADO_TXT).activa === false);

  // 🔑 Y se puede prender a voluntad, que es lo que permite medirla.
  process.env.NOTA_COMERCIAL = "1";
  const prendida = comercial.guionConNota(
    guion.slice(0, 4000 * 4),
    CARGADO,
    CARGADO_TXT,
    { yaConocidos: { ciudad: "Bogotá" } }
  );
  chequear(
    "🔘 con NOTA_COMERCIAL=1 se prende",
    prendida.activa === true && /PARA ESTE MENSAJE/.test(prendida.prompt),
    `activa=${prendida.activa}`
  );
  chequear("y sigue bajo el techo", prendida.tokens < comercial.TECHO_TOKENS, `${prendida.tokens} tokens`);

  // 🔑 El interruptor manda sobre el espacio: prendida y con espacio, entra.
  //    Prendida y SIN espacio, la red de seguridad avisa — pero eso NO es el
  //    interruptor, es una protección.
  // ⚠️ Se fabrica un guion pasado de tamaño a propósito, en vez de usar el real:
  //    cuánto mide el guion depende de qué otras ramas estén mergeadas, y una
  //    prueba que cambia de resultado según eso no prueba nada.
  const guionEnorme = "x".repeat(comercial.TECHO_TOKENS * 4);
  const sinEspacio = comercial.guionConNota(guionEnorme, CARGADO, CARGADO_TXT, { yaConocidos: { ciudad: "Bogotá" } });
  chequear(
    "📏 la red de seguridad sigue existiendo: si no cabe, no desborda",
    sinEspacio.activa === true && sinEspacio.cupo === false && sinEspacio.prompt === guionEnorme,
    `activa=${sinEspacio.activa} cupo=${sinEspacio.cupo} tokens=${sinEspacio.tokens}`
  );
  chequear(
    "🔑 y se distingue «apagada» de «no cupo»",
    apagada.activa === false && sinEspacio.activa === true,
    "son dos situaciones distintas y el log tiene que poder decir cuál es"
  );

  // El contexto puede forzarlo, para poder probar las dos ramas sin tocar el entorno.
  chequear("se puede forzar por contexto", comercial.guionConNota(guion, [u("hola")], "hola", { activa: false }).activa === false);

  if (previo === undefined) delete process.env.NOTA_COMERCIAL;
  else process.env.NOTA_COMERCIAL = previo;
}

{
  // Un turno sin nada que decir nunca gasta un token, prendida o apagada.
  const res = comercial.guionConNota(guion, [u("hola")], "hola", { activa: true });
  chequear("un turno sin nota no gasta nada", res.nota === "" && res.prompt === guion);
}

console.log("\n── 7. Lo que ya funciona no se marca ──");
// ============================================================================
// Si la revisión marcara respuestas buenas, el renglón del log deja de servir
// para medir nada.
const RESPUESTAS_BUENAS = [
  [
    "El conjunto es negro y la franja la eliges en 6 colores 🌈 ¿Cuál color prefieres y para qué ciudad sería?",
    "qué colores tienen?",
  ],
  [
    "Es PVC siliconado calibre 8 con costura termosellada, 100% impermeable 💪 ¿Para qué ciudad sería, para darte el total?",
    "de verdad impermeable?",
  ],
  [
    "Normalmente la transportadora entrega entre 1 y 3 días hábiles 📦 Pásame nombre completo, dirección con barrio y celular y te lo despacho.",
    "cuánto tarda en llegar?",
  ],
  [
    "Pagas contraentrega, cuando lo recibes en tu casa 🙌 Pásame nombre completo, dirección con barrio y celular.",
    "cómo pago?",
  ],
  [
    "Tranquilo, pagas contraentrega: no pagas nada antes y lo revisas cuando llega 📦 Pásame nombre completo, dirección con barrio y celular.",
    "es seguro? me da desconfianza",
  ],
  [
    "Va de talla S a 3XL y te recomiendo una talla más porque va encima de la ropa 🏍️ ¿Qué talla prefieres?",
    "de qué talla hay?",
  ],
];
for (const [respuesta, pregunta] of RESPUESTAS_BUENAS) {
  const r = comercial.revisar(respuesta, { userText: pregunta, messages: [u(pregunta)] });
  chequear(`pasa: "${corto(respuesta, 52)}"`, r.ok, comercial.resumir(r));
}

// ============================================================================
console.log("\n── 8. Está enganchado, y NO pausa el chat ──");
// ============================================================================
const fuenteAgente = require("fs").readFileSync(`${__dirname}/src/agent.js`, "utf8");
chequear("agent.js usa el módulo", /require\("\.\/comercial"\)/.test(fuenteAgente));
chequear(
  "🔘 y el interruptor está documentado donde se engancha",
  /NOTA_COMERCIAL=1/.test(fuenteAgente),
  "quien lea agent.js tiene que saber cómo prenderla"
);
chequear(
  "🔑 el prompt que se manda sale de guionConNota, no de buildSystemPrompt() suelto",
  /guionConNota\(/.test(fuenteAgente) &&
    /callIA\((?:conNota\.prompt|guion)\b/.test(fuenteAgente) &&
    !/callIA\(buildSystemPrompt\(\)/.test(fuenteAgente),
  "si se manda buildSystemPrompt() directo, la nota nunca llega"
);
chequear(
  "la revisión se registra para poder contarla",
  /COMERCIAL \$\{phone\}/.test(fuenteAgente) || /📊 COMERCIAL/.test(fuenteAgente)
);
{
  // ⚠️ La diferencia con el candado de promesas: ahí una promesa sin respaldo
  // manda el chat a modo humano. Acá NO. Un mensaje comercialmente flojo no
  // justifica dejar al cliente esperando a que alguien lea el chat.
  const trozo = fuenteAgente.slice(
    fuenteAgente.indexOf("LA CUENTA DE LO COMERCIAL"),
    fuenteAgente.indexOf("LA CUENTA DE LO COMERCIAL") + 1400
  );
  chequear(
    "🔑 y NO pausa el chat ni reescribe la respuesta",
    !/setPaused/.test(trozo) && !/reply\s*=/.test(trozo),
    "lo comercial solo se cuenta; pausar por esto dejaría al cliente esperando"
  );
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
