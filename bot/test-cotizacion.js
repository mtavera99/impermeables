/**
 * EL PRECIO LO CALCULA EL CÓDIGO, Y NADA LO PUEDE CAMBIAR DESPUÉS.
 *
 * DE DÓNDE SALE ESTA PRUEBA (26-sep). Tres cotizaciones mal dadas el 25-sep:
 *
 *   · Palmira  → dijo envío $23.100 y total $83.100. El tarifario da $22.100 y
 *                $82.000 (banda C). Y $59.900 + $23.100 = $83.000, así que el
 *                $83.100 no cierra ni con su propia suma.
 *   · Cúcuta   → dijo $82.000 (1 ud) y $148.000 (2 uds). El tarifario da $83.000
 *                y $140.000 (banda D). Lo que dijo son los valores de banda C.
 *   · Gachancipá → ofreció $148.000 ANTES de conocer el destino.
 *
 * 🔴 LA CAUSA VERIFICADA: `cotizar()` no se llamaba en la conversación. El precio
 * lo resolvía el modelo leyendo una tabla de 107 ciudades en 5 bandas dentro del
 * guion. El tarifario existía, estaba probado y daba bien — y nadie lo consultaba.
 *
 * ⚠️ LO QUE ESTO NO DEMUESTRA: que los valores coincidan con otras bandas es
 * CONSISTENTE con una confusión de filas, pero no prueba cómo el modelo eligió
 * cada número. La corrección no depende de eso.
 *
 *   node test-cotizacion.js      (sin credenciales, sin red, sin IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-cotizacion";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const c = require("./src/cotizacion");
const f = require("./src/fletes");
const store = require("./src/store");

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

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. REGRESIÓN: los tres casos del 25-sep ──");

// Palmira: banda C reconocida
const palmira = c.calcular("Palmira", "quiero uno para Palmira");
chequear("Palmira cotiza", palmira.ok === true);
chequear("total $82.000", palmira.total === 82000, `dio ${palmira.total}`);
chequear("envío $22.100 (NO los $23.100 de banda D)", palmira.envio === 22100, `dio ${palmira.envio}`);
chequear("producto + envío cierra exacto", palmira.producto + palmira.envio === palmira.total);
chequear("y es tarifa reconocida", palmira.reconocida === true);

// Cúcuta: banda D
const cucuta1 = c.calcular("Cucuta", "uno para Cucuta");
const cucuta2 = c.calcular("Cucuta", "dos conjuntos para Cucuta");
chequear("Cúcuta 1 ud = $83.000 (no $82.000)", cucuta1.total === 83000, `dio ${cucuta1.total}`);
chequear("Cúcuta 2 uds = $140.000 (no $148.000)", cucuta2.total === 140000, `dio ${cucuta2.total}`);
chequear("detectó la cantidad 2", cucuta2.uds === 2);
chequear("el combo cierra exacto", cucuta2.producto + cucuta2.envio === cucuta2.total);
chequear(
  "y calcula el ahorro contra dos sueltos",
  cucuta2.ahorro === cucuta1.total * 2 - cucuta2.total,
  `dio ${cucuta2.ahorro}`
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Gachancipá: tarifa PREDETERMINADA, no reconocida ──");

// 🔑 No se le dice "techo de seguridad": no hay garantía de que ese valor cubra
// el costo logístico de cualquier municipio. El Charco está en difícil acceso
// justamente porque su flete real ($55.563) supera cualquier banda.
const gacha = c.calcular("Gachancipa", "uno para Gachancipa");
chequear("cotiza con la política vigente", gacha.ok === true && gacha.total === 85000);
chequear("🔑 pero marcada como NO reconocida", gacha.reconocida === false);
chequear("el destino lo dice", gacha.destino.estado === "predeterminada", gacha.destino.estado);
const bloqueGacha = c.bloqueDeDatos(gacha);
chequear("el bloque avisa que no está en el tarifario", /NO está en el tarifario/.test(bloqueGacha));
chequear(
  "y NO afirma que el costo esté verificado",
  /no está verificado/.test(bloqueGacha) && !/techo de seguridad/i.test(bloqueGacha)
);
chequear("y pide no prometer plazos", /no prometas plazos/.test(bloqueGacha));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Lo que NO debe producir ningún número ──");

const sinDestino = c.calcular("", "cuánto vale?");
chequear("sin destino no cotiza", sinDestino.ok === false && sinDestino.motivo === "sin_destino");
// ⚠️ Pero SÍ se puede decir el precio base: es lo que pidió el dueño.
const bSin = c.bloqueDeDatos(sinDestino);
chequear("⛔ prohíbe dar total y envío", /NO des ningún total/.test(bSin));
chequear("✅ pero permite el precio base del producto", /SÍ podés decir el precio base/.test(bSin));
chequear("y nombra los $59.900", /59\.900/.test(bSin));

const ambiguo = c.calcular("Riosucio", "soy de Riosucio");
chequear("ciudad ambigua no cotiza", ambiguo.ok === false && ambiguo.motivo === "ambiguo");
chequear(
  "y dice los departamentos posibles",
  (ambiguo.destino.preguntarDepartamento || []).length >= 2,
  JSON.stringify(ambiguo.destino.preguntarDepartamento)
);
chequear("el bloque prohíbe dar números", /NO des ningún número/.test(c.bloqueDeDatos(ambiguo)));

const istmina = c.calcular("Istmina", "uno para Istmina");
chequear("difícil acceso sin tarifa no cotiza", istmina.ok === false && istmina.motivo === "dificil_sin_tarifa");
chequear("y manda escalar", /NINGÚN número/.test(c.bloqueDeDatos(istmina)));

const mayoreo = c.calcular("Cali", "necesito 12 conjuntos para revender");
chequear("12 unidades se escala", mayoreo.ok === false && mayoreo.motivo === "cantidad_escalada");
chequear("y no cotiza", /NO cotices/.test(c.bloqueDeDatos(mayoreo)));

const tado = c.calcular("Tado", "dos conjuntos para Tado");
chequear("difícil acceso no lleva promo de 2", tado.ok === false && tado.motivo === "dificil_sin_promo");

// 🔴 Un total nulo NUNCA puede convertirse en precio: fmt(null) devuelve "$0".
chequear("fmt(null) sigue dando $0 — por eso el guard existe", f.fmt(null) === "$0");
for (const caso of [ambiguo, istmina, sinDestino, mayoreo]) {
  chequear(`el caso "${caso.motivo}" no expone ningún total`, caso.total === undefined || caso.total == null);
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. Dos destinos en un mensaje: se pregunta, no se adivina ──");

const dos = c.calcular("", "cuánto sale a Cali y cuánto a Pasto?");
chequear("no cotiza con dos destinos", dos.ok === false && dos.motivo === "varios_destinos");
chequear("y los lista", (dos.destino.candidatas || []).length >= 2, JSON.stringify(dos.destino.candidatas));
chequear("el bloque pide elegir destino", /Preguntá cuál es el destino/.test(c.bloqueDeDatos(dos)));
chequear(
  "un solo destino NO se confunde con varios",
  c.ciudadesEn("soy de Santa Marta").length === 1,
  JSON.stringify(c.ciudadesEn("soy de Santa Marta"))
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. 🔑 EL CANDADO: la respuesta se revisa antes de salir ──");

const v = (texto, cot, ctx) => c.validarRespuesta(texto, cot, ctx || {});

// Los tres importes mal dados el 25-sep tienen que quedar atrapados.
chequear(
  "🔑 $148.000 en una ciudad de banda D se detecta",
  v("Te quedan los dos en $148.000", cucuta2).ok === false
);
chequear(
  "🔑 $23.100 de envío en una ciudad de banda C se detecta",
  v("El envío a Palmira son $23.100", palmira).ok === false
);
chequear(
  "🔑 la suma que no cierra se detecta",
  v("Son $59.900 + $23.100 = $83.100", palmira).problemas.some((p) => p.tipo === "suma_que_no_cierra"),
  JSON.stringify(v("Son $59.900 + $23.100 = $83.100", palmira).problemas.map((p) => p.tipo))
);
chequear(
  "y el mensaje correcto pasa",
  v("Te queda en $82.000: $59.900 el conjunto + $22.100 de envío", palmira).ok === true,
  JSON.stringify(v("Te queda en $82.000: $59.900 el conjunto + $22.100 de envío", palmira).problemas)
);
chequear("la línea que genera el código pasa su propia validación", v(c.lineaDePrecio(palmira), palmira).ok === true);
chequear("y la del combo también", v(c.lineaDePrecio(cucuta2), cucuta2).ok === true);

// Un total cuando no hay destino.
chequear(
  "un total sin destino se detecta",
  v("Te queda en $85.000 con envío", sinDestino).problemas.some((p) => p.tipo === "total_sin_destino")
);
chequear("pero el precio base sin destino pasa", v("El conjunto vale $59.900 más el envío", sinDestino).ok === true);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Significado, no pertenencia: el rescate tiene condiciones ──");

// 🔑 Un validador que solo revisa pertenencia dejaría pasar el precio de
// negociación ofrecido de entrada — que es regalar plata a quien iba a comprar.
chequear(
  "🔑 el precio de negociación NO se autoriza sin objeción",
  v(`Te lo dejo en ${f.fmt(cucuta2.rescate)}`, cucuta2, { objecionDePrecio: false }).ok === false,
  `rescate=${cucuta2.rescate}`
);
chequear(
  "y SÍ cuando el cliente ya se quejó del precio",
  v(`Te lo dejo en ${f.fmt(cucuta2.rescate)}`, cucuta2, { objecionDePrecio: true }).ok === true
);
chequear(
  "el rescate del combo es el aprobado de su banda",
  cucuta2.rescate === f.PROMO_2_RESCATE[cucuta2.banda],
  `${cucuta2.rescate} vs ${f.PROMO_2_RESCATE[cucuta2.banda]}`
);
chequear(
  "en 1 unidad el máximo aprobado sigue siendo $3.000",
  palmira.total - palmira.rescate === 3000,
  `diferencia ${palmira.total - palmira.rescate}`
);
chequear("y no se habilitó ningún límite nuevo", c.TOPE_DESCUENTO_1_UNIDAD === 3000);

// La detección de objeción.
chequear("detecta 'está muy caro'", c.hayObjecionDePrecio([{ role: "user", content: "uy está muy caro" }]));
chequear("detecta 'me das descuento'", c.hayObjecionDePrecio([{ role: "user", content: "me das descuento?" }]));
chequear("no confunde una pregunta normal", !c.hayObjecionDePrecio([{ role: "user", content: "de qué talla hay?" }]));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Leer dinero sin confundirlo con direcciones ni teléfonos ──");

const imp = (t) => c.extraerImportes(t).map((x) => x.valor);
chequear('"$83.000"', imp("son $83.000").includes(83000));
chequear('"83.000" sin signo', imp("queda en 83.000").includes(83000));
chequear('"83 mil"', imp("son 83 mil").includes(83000));
chequear('"83mil" pegado', imp("son 83mil").includes(83000));
chequear('"$155.000" del combo', imp("los dos en $155.000").includes(155000));
chequear(
  "varios precios en una comparación",
  imp("a Cali $82.000 y a Pasto $85.000").length === 2,
  JSON.stringify(imp("a Cali $82.000 y a Pasto $85.000"))
);
// 🔴 Lo que NO es dinero. Un validador con falsas alarmas se apaga.
chequear(
  "un celular NO es dinero",
  imp("mi celular es 3128716771").length === 0,
  JSON.stringify(imp("mi celular es 3128716771"))
);
chequear(
  "una dirección NO es dinero",
  imp("Cr 20 12328 Barrio ciudadela").length === 0,
  JSON.stringify(imp("Cr 20 12328 Barrio ciudadela"))
);
chequear(
  "'Calle 34 #12-45' NO es dinero",
  imp("Calle 34 #12-45 barrio La Granja").length === 0,
  JSON.stringify(imp("Calle 34 #12-45 barrio La Granja"))
);
chequear("un año no es dinero", imp("desde 2026 trabajamos").length === 0);
chequear("y una talla tampoco", imp("uso talla 2XL").length === 0);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 8. El pedido no puede contradecir la cotización ──");

const pedidoBien = { nombre: "Ana", ciudad: "Palmira", total: 82000 };
chequear("un pedido que cuadra pasa", c.verificarPedido(pedidoBien, palmira).ok === true);

const pedidoMal = { nombre: "Ana", ciudad: "Palmira", total: 83100 };
const chMal = c.verificarPedido(pedidoMal, palmira);
chequear("el $83.100 del caso real se detecta", chMal.ok === false);
chequear("el problema es el total", chMal.problemas.some((p) => p.tipo === "total_distinto"));
chequear("y dice cuál era el esperado", chMal.totalEsperado === 82000);

const otraCiudad = { nombre: "Ana", ciudad: "Cucuta", total: 82000 };
chequear(
  "si el pedido va a otra ciudad se detecta",
  c.verificarPedido(otraCiudad, palmira).problemas.some((p) => p.tipo === "ciudad_distinta")
);

chequear(
  "sin cotización validada, el pedido se marca",
  c.verificarPedido(pedidoBien, sinDestino).problemas.some((p) => p.tipo === "sin_cotizacion_validada")
);
chequear(
  "un total en cero se detecta",
  c.verificarPedido({ ciudad: "Palmira", total: 0 }, palmira).problemas.some((p) => p.tipo === "total_invalido")
);

// El rescate como total del pedido: solo con objeción.
// ⚠️ `unidades: 2` va explícito porque `cucuta2` es una cotización de DOS, y desde
// la revisión del 26-sep `verificarPedido` también compara la cantidad. El fixture
// venía sin declararla: pasaba porque la comprobación no existía, no porque el
// pedido estuviera bien.
const pedidoRescate = { nombre: "Ana", ciudad: "Cucuta", total: cucuta2.rescate, unidades: 2 };
chequear(
  "un pedido al precio de negociación SIN objeción se marca",
  c.verificarPedido(pedidoRescate, cucuta2, { objecionDePrecio: false }).ok === false
);
chequear(
  "y CON objeción pasa",
  c.verificarPedido(pedidoRescate, cucuta2, { objecionDePrecio: true }).ok === true
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 9. La cotización se guarda, y las ofertas previas no se pisan ──");

const TEL = "573001112233";
store.guardarCotizacion(TEL, palmira);
let guardada = store.leerCotizacion(TEL);
chequear("se guarda estructurada", !!guardada && guardada.total === 82000);
chequear("con la versión de la política", guardada.politica === c.POLITICA_VERSION);
chequear("y con destino y cantidad", guardada.ciudad === "Palmira" && guardada.uds === 1);

// Cambia de ciudad: la oferta nueva no borra la anterior.
store.guardarCotizacion(TEL, cucuta2);
const conv = store.getConv(TEL);
chequear("la cotización vigente es la nueva", store.leerCotizacion(TEL).total === 140000);
chequear(
  "🔑 la anterior queda archivada, no pisada",
  (conv.cotizacionesPrevias || []).some((x) => x.total === 82000),
  JSON.stringify((conv.cotizacionesPrevias || []).map((x) => x.total))
);
chequear("y queda marcado que la oferta cambió", conv.cotizacionCambiada === true);

// Sobrevive a un reinicio: el dueño pidió probar retomar una oferta después.
delete require.cache[require.resolve("./src/store")];
const store2 = require("./src/store");
chequear(
  "🔑 la cotización sobrevive al reinicio",
  (store2.leerCotizacion(TEL) || {}).total === 140000,
  "retomar una oferta después de un reinicio tiene que dar el mismo número"
);

// Cambiar de 1 a 2 unidades en la misma ciudad también es oferta nueva.
store2.guardarCotizacion(TEL, c.calcular("Cucuta", "mejor uno solo"));
chequear(
  "pasar de 2 a 1 unidad cambia la oferta",
  store2.leerCotizacion(TEL).uds === 1 && store2.leerCotizacion(TEL).total === 83000
);
chequear(
  "y la de 2 queda archivada",
  (store2.getConv(TEL).cotizacionesPrevias || []).some((x) => x.total === 140000)
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 10. Todas las bandas cierran, y nada se rompió ──");

let cierran = 0;
const ciudades = ["Bogota", "Tunja", "Cali", "Monteria", "Sahagun", "Nilo", "Palmira", "Cucuta"];
for (const ciudad of ciudades) {
  for (const uds of [1, 2]) {
    const q = c.calcular(ciudad, uds === 2 ? "dos conjuntos" : "uno");
    if (!q.ok) continue;
    const cierra = q.producto + q.envio === q.total;
    // ⚠️ La referencia de honestidad NO es solo el promedio de la banda: una
    // ciudad con flete medido propio puede estar por encima de su banda, y ahí el
    // desglose tiene que seguir ESE número. Nilo es el caso: su flete de 2
    // unidades es $36.000 contra $32.597 del promedio de banda B, y mostrar
    // $36.000 es lo correcto — es el que el cliente puede verificar.
    const refBanda = (uds === 2 ? f.ENVIO_REAL_2 : f.ENVIO_REAL_1)[q.banda];
    const refCiudad = uds === 2 ? f.FLETE_2_OBSERVADO[f.normalizar(ciudad)] || 0 : 0;
    const honesto = q.envio <= Math.max(refBanda, refCiudad);
    const validaSola = c.validarRespuesta(c.lineaDePrecio(q), q).ok;
    if (cierra && honesto && validaSola) cierran++;
    else console.log(`     🔴 ${ciudad} x${uds}: cierra=${cierra} honesto=${honesto} valida=${validaSola}`);
  }
}
chequear(
  `las ${ciudades.length * 2} cotizaciones cierran, no inflan el envío y validan su propia línea`,
  cierran === ciudades.length * 2,
  `pasaron ${cierran}`
);

// ============================================================================
// 🔴 LOS CINCO DEFECTOS QUE ENCONTRÓ LA REVISIÓN DEL 26-SEP
//
// Ninguno de estos casos fallaba en el cálculo: fallaban en el encadenamiento de
// turnos o en la validación. Las 83 pruebas de arriba pasaban con los cinco
// defectos presentes, y eso es lo que los hace valiosos como regresión.
// ============================================================================
const u = (t) => ({ role: "user", content: t });
const b = (t) => ({ role: "assistant", content: t });
const pesos = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

console.log("\n── R1. La cantidad se conserva hasta una corrección explícita ──");
{
  chequear('"dos" suelto cuenta como dos', c.resolverCantidad("dos").uds === 2, "era la respuesta natural a «¿uno o dos?» y se leía como UNA");
  chequear('"quiero 2" cuenta como dos', c.resolverCantidad("quiero 2").uds === 2);
  chequear("y queda marcada como explícita", c.resolverCantidad("dos conjuntos").explicita === true);
  chequear(
    "🔑 no decir nada NO es lo mismo que pedir una",
    c.resolverCantidad("Cali").explicita === false,
    "confundir esos dos casos era lo que hacía desaparecer la segunda unidad"
  );
  chequear("sin cantidad previa, el default sigue siendo 1", c.resolverCantidad("Cali").uds === 1);
  chequear("con cantidad previa, se hereda", c.resolverCantidad("Cali", 2).uds === 2);
  chequear("y se marca como heredada", c.resolverCantidad("Cali", 2).heredada === true);

  // 🔑 El recorrido que fallaba: la cantidad sobrevive a ciudad, talla y dirección.
  const conv = { messages: [u("quiero dos conjuntos"), b("¿ciudad?"), u("Cali"), b("ok"), u("talla L"), b("ok"), u("Cra 1 #2-3")] };
  chequear(
    "🔑 «quiero dos conjuntos» sobrevive 3 turnos después",
    c.cantidadDelHilo(conv, "Cra 1 #2-3").uds === 2,
    `dio ${c.cantidadDelHilo(conv, "Cra 1 #2-3").uds}`
  );
  chequear(
    "🔴 y una dirección con un «1» NO la baja a una unidad",
    c.resolverCantidad("Calle 1 #2-3, celular 3001234567").explicita === false,
    "si un dígito suelto contara como «pidió una», una dirección borraría el pedido de dos"
  );
  const conv2 = { messages: [...conv.messages, b("ok"), u("mejor uno solo")] };
  chequear("la corrección explícita sí la baja", c.cantidadDelHilo(conv2, "mejor uno solo").uds === 1);
  chequear("3 o más se sigue escalando", c.resolverCantidad("12 conjuntos").escalar === true);
}

console.log("\n── R2. El destino: departamento y ciudades fuera del tarifario ──");
{
  chequear(
    "🔑 «Mosquera Nariño» no pierde el departamento",
    c.ciudadesEn("Mosquera Nariño").length === 1 && /nari/i.test(c.ciudadesEn("Mosquera Nariño")[0]),
    JSON.stringify(c.ciudadesEn("Mosquera Nariño"))
  );
  const nar = c.resolverDestino("Mosquera Nariño");
  chequear(
    "y se resuelve al Mosquera del Pacífico, sin tarifa medida",
    nar.estado === "dificil_sin_tarifa",
    `dio ${nar.estado}`
  );
  const cun = c.resolverDestino("Mosquera Cundinamarca");
  chequear("mientras el de Cundinamarca es banda A", cun.estado === "reconocida" && cun.banda === "A", `dio ${cun.estado}/${cun.banda}`);
  chequear(
    `y cotiza ${pesos(73000)} de verdad, no $0`,
    c.calcular("Mosquera Cundinamarca", "uno").total === 73000,
    `dio ${pesos(c.calcular("Mosquera Cundinamarca", "uno").total)}`
  );
  chequear("sin departamento sigue preguntando", c.resolverDestino("Mosquera").estado === "ambiguo");

  // 🔑 Gachancipá: el problema nunca fue cotizar, fue DETECTAR.
  chequear(
    "resolverDestino(Gachancipá) siempre funcionó",
    c.resolverDestino("Gachancipá").estado === "predeterminada"
  );
  const convG = { messages: [u("hola"), b("¿Para qué ciudad sería, para darte el total?"), u("Gachancipá")] };
  chequear(
    "🔑 y ahora la extracción real también la ve",
    c.destinoDelHilo(convG, "Gachancipá").ciudad === "Gachancipá",
    JSON.stringify(c.destinoDelHilo(convG, "Gachancipá"))
  );
  chequear("por el contexto de la pregunta", c.destinoDelHilo(convG, "Gachancipá").origen === "respuesta_a_la_pregunta");
  // Conservador: si no es una respuesta a la pregunta, no inventa un destino.
  chequear("🔴 una pregunta no se toma por ciudad", c.ciudadPlausible("cuánto vale?") === "");
  chequear("🔴 ni un agradecimiento", c.ciudadPlausible("gracias") === "");
  chequear("🔴 ni una dirección", c.ciudadPlausible("Cra 1 #2-3") === "");
  chequear("pero sí con relleno adelante", c.ciudadPlausible("soy de Gachancipá") === "Gachancipá");
}

console.log("\n── R3. 🔑 El precio se valida por SIGNIFICADO, no por pertenencia ──");
{
  const cali = c.calcular("Cali", "uno");
  const sinDestino = c.calcular("", "uno");

  // El caso textual de la revisión: los tres números existen y están bien, pero
  // intercambiados de rol.
  const invertido = "El producto vale $22.100 y el envío $59.900. Total $82.000.";
  chequear(
    "🔑 roles invertidos: se rechaza",
    !c.validarRespuesta(invertido, cali, {}).ok,
    "los tres importes pertenecen a la cotización; lo que está mal es qué dice que es cada uno"
  );
  chequear(
    "y el motivo dice cuál es cuál",
    c.validarRespuesta(invertido, cali, {}).problemas.some((p) => p.tipo === "rol_equivocado")
  );
  chequear(
    "🔑 «Total con envío incluido: $59.900» sin destino: se rechaza",
    !c.validarRespuesta("Total con envío incluido: $59.900", sinDestino, {}).ok,
    "$59.900 es el precio base, así que por pertenencia pasaba"
  );
  chequear("el envío presentado como total se rechaza", !c.validarRespuesta("El envío a Cali es $82.000", cali, {}).ok);

  // Y lo que NO debe marcar, que es la otra mitad del trabajo.
  chequear("✅ la línea del código pasa", c.validarRespuesta(c.lineaDePrecio(cali), cali, {}).ok);
  chequear(
    "✅ la del combo también",
    c.validarRespuesta(c.lineaDePrecio(c.calcular("Cali", "dos conjuntos")), c.calcular("Cali", "dos conjuntos"), {}).ok
  );
  chequear(
    "✅ 🔑 «El conjunto cuesta $59.900» NO se marca",
    c.validarRespuesta("El conjunto cuesta $59.900 y el envío depende de tu ciudad", sinDestino, {}).ok,
    "el rol lo da el sujeto («el conjunto»), no el verbo («cuesta»)"
  );
  chequear(
    "✅ el precio base de los dos sin destino tampoco",
    c.validarRespuesta("Los dos conjuntos salen $110.000 más el envío según tu ciudad.", sinDestino, {}).ok
  );
  // Los roles se leen bien en la forma normal del español: etiqueta pegada después.
  const roles = c.rolesEnTexto("$59.900 el conjunto + $22.100 de envío");
  chequear(
    "las etiquetas pegadas después se atribuyen bien",
    roles[0].rol === "producto" && roles[1].rol === "envio",
    JSON.stringify(roles.map((r) => [r.valor, r.rol]))
  );
}

console.log("\n── R4. Tadó: sinPromo2 no tumba la tarifa de una unidad ──");
{
  const una = c.calcular("Tadó", "uno");
  chequear("🔑 una unidad SÍ se cotiza", una.ok === true, `dio ok=${una.ok} motivo=${una.motivo}`);
  chequear(`con el total confirmado ${pesos(93000)}`, una.total === 93000, `dio ${pesos(una.total)}`);
  chequear("y sin inventar el desglose", una.envio === null && una.desgloseDesconocido === true);
  chequear("la línea de precio dice solo el total", !/de envío/.test(c.lineaDePrecio(una)), c.lineaDePrecio(una));
  chequear("🔴 pero un envío inventado ahí se rechaza", !c.validarRespuesta("$59.900 el conjunto + $33.100 de envío", una, {}).ok);
  chequear("dos unidades sigue sin promo", c.calcular("Tadó", "dos conjuntos").motivo === "dificil_sin_promo");
  chequear("y no hay precio de negociación donde el margen no está medido", una.rescate === null);
}

console.log("\n── R5. No se le confirma al cliente lo que no se puede despachar ──");
{
  chequear("se reconoce una afirmación de cierre", c.afirmaCierre("¡Listo! Tu pedido quedó confirmado y te lo despacho hoy"));
  chequear("y una respuesta neutral no lo es", !c.afirmaCierre("Con gusto, ¿me confirmas la talla?"));
  const texto = c.respuestaEnRevision({ nombre: "Ana Gómez", ciudad: "Cali", total: 99000 });
  chequear("el reemplazo saluda por el nombre", /Ana/.test(texto), texto);
  chequear("dice que los datos quedaron", /datos/i.test(texto), texto);
  chequear("🔑 no afirma que esté confirmado", !c.afirmaCierre(texto), texto);
  chequear("y no promete fecha", !/hoy|mañana/i.test(texto), texto);
}

console.log("\n── R6. 🔴 El pedido tiene que cuadrar en CANTIDAD, no solo en total ──");
// Textual de la 2ª revisión: "verificarPedido() acepta una cotización de dos
// conjuntos con un pedido que indica una unidad si total y ciudad coinciden".
{
  const dos = c.calcular("Cali", "dos conjuntos");
  const una = c.calcular("Cali", "uno");
  const base = { nombre: "Ana", celular: "3001234567", ciudad: "Cali", direccion: "Cra 1", color: "rojo", pago: "contraentrega" };
  const problemasDe = (o, cot) => c.verificarPedido(o, cot, {}).problemas.map((p) => p.tipo);

  chequear(
    "🔑 el caso reportado se rechaza: 1 unidad contra cotización de 2",
    problemasDe({ ...base, talla: "L", total: 148000, unidades: 1 }, dos).includes("cantidad_distinta"),
    JSON.stringify(c.verificarPedido({ ...base, talla: "L", total: 148000, unidades: 1 }, dos).problemas)
  );
  chequear(
    "y el motivo dice de cuántas es cada uno",
    /es de 1 unidad/.test(c.verificarPedido({ ...base, talla: "L", total: 148000, unidades: 1 }, dos).problemas.map((p) => p.detalle).join(" "))
  );
  chequear(
    "un pedido de 2 sin declararlo también se rechaza",
    problemasDe({ ...base, talla: "L", total: 148000 }, dos).includes("cantidad_distinta")
  );
  chequear(
    "y al revés: 2 unidades contra cotización de 1",
    problemasDe({ ...base, talla: "L", total: 82000, unidades: 2 }, una).includes("cantidad_distinta")
  );
  chequear(
    "más tallas que unidades es incoherente",
    problemasDe({ ...base, talla: "L, M, XL", total: 148000, unidades: 2 }, dos).includes("tallas_incoherentes")
  );

  // Y lo que NO se puede marcar, que es la otra mitad.
  chequear("✅ 2 declaradas con una sola talla pasa (dos del mismo talle)", c.verificarPedido({ ...base, talla: "L", total: 148000, unidades: 2 }, dos).ok);
  chequear("✅ dos tallas cuentan como dos unidades", c.verificarPedido({ ...base, talla: "L y M", total: 148000 }, dos).ok);
  chequear("✅ un pedido de una unidad normal pasa", c.verificarPedido({ ...base, talla: "L", total: 82000 }, una).ok);

  // 🔴 EL DEFECTO QUE APARECIÓ ARREGLANDO ESTO: la talla no es una cantidad.
  chequear(
    "🔴 una talla 2XL NO son dos unidades",
    c.unidadesDelPedido({ talla: "2XL" }).uds === 1,
    "el criterio heredado miraba `producto + talla` junto y el patrón traía `2x`"
  );
  chequear("🔴 ni una 3XL son tres", c.unidadesDelPedido({ talla: "3XL" }).uds === 1);
  chequear("✅ pero «L y M» siguen siendo dos", c.unidadesDelPedido({ talla: "L y M" }).uds === 2);
  chequear("✅ y el campo unidades manda", c.unidadesDelPedido({ unidades: 2, talla: "L" }).uds === 2);
  chequear(
    "✅ un pedido de talla 2XL pasa la verificación de una unidad",
    c.verificarPedido({ ...base, talla: "2XL", total: 82000 }, una).ok,
    "antes lo habría marcado como cantidad_distinta"
  );

  // Y el mismo criterio en resumen.js, que alimenta el CSV y el KPI de share.
  const resumen = require("./src/resumen");
  chequear(
    "🔑 resumen.unidadesDe tampoco cuenta la talla como cantidad",
    resumen.unidadesDe({ talla: "2XL", total: 82000 }) === 1,
    "inflaba el share de 2 uds, que es el número con el que se justifica el combo"
  );
  chequear("y sigue contando bien las de verdad", resumen.unidadesDe({ talla: "L y M", total: 148000 }) === 2);
}

console.log("\n── R7. 🔢 LA CANTIDAD EXPLÍCITA, DE PUNTA A PUNTA ──");
// Textual de la 3ª revisión: "Un combo válido con talla «2 unidades en talla XL»
// […] se interpreta como una unidad y falla verificarPedido(). El esquema ##ORDER##
// de prompt.js todavía no incluye unidades."
{
  const dos = c.calcular("Cali", "dos conjuntos");
  const una = c.calcular("Cali", "uno");
  const ped = (talla, extra = {}) => ({
    nombre: "Ana", celular: "3001234567", ciudad: "Cali", direccion: "Cra 1",
    color: "rojo", pago: "contraentrega", talla, ...extra,
  });

  // ── 1. El esquema ──────────────────────────────────────────────────────
  const guion = require("./src/prompt").buildSystemPrompt();
  chequear("🔑 el esquema ##ORDER## ya incluye unidades", /"unidades":1/.test(guion), "sin esto el modelo nunca lo emite");
  chequear("y el guion dice que es obligatorio", /"unidades" ES OBLIGATORIO/.test(guion.replace(/\s+/g, " ")));
  chequear(
    "y prohíbe meter la cantidad en la talla",
    /NUNCA metas la cantidad dentro de "talla"/.test(guion.replace(/\s+/g, " "))
  );

  // ── 2. El caso reportado ───────────────────────────────────────────────
  chequear(
    "🔑 «2 unidades en talla XL» son DOS unidades",
    c.unidadesDelPedido(ped("2 unidades en talla XL")).uds === 2,
    JSON.stringify(c.unidadesDelPedido(ped("2 unidades en talla XL")))
  );
  chequear(
    "   y la talla que queda es XL",
    JSON.stringify(c.tallasDelPedido(ped("2 unidades en talla XL"))) === '["XL"]',
    JSON.stringify(c.tallasDelPedido(ped("2 unidades en talla XL")))
  );
  chequear(
    "   así que el combo válido PASA la verificación",
    c.verificarPedido(ped("2 unidades en talla XL", { total: 148000 }), dos, {}).ok,
    JSON.stringify(c.verificarPedido(ped("2 unidades en talla XL", { total: 148000 }), dos, {}).problemas)
  );

  // ── 3. Los tres casos que pidió la revisión ────────────────────────────
  chequear(
    "dos conjuntos de la MISMA talla",
    c.verificarPedido(ped("XL", { total: 148000, unidades: 2 }), dos, {}).ok,
    JSON.stringify(c.verificarPedido(ped("XL", { total: 148000, unidades: 2 }), dos, {}).problemas)
  );
  chequear(
    "dos conjuntos con tallas DISTINTAS",
    c.verificarPedido(ped("L y M", { total: 148000, unidades: 2 }), dos, {}).ok,
    JSON.stringify(c.verificarPedido(ped("L y M", { total: 148000, unidades: 2 }), dos, {}).problemas)
  );
  for (const t of ["2XL", "3XL"]) {
    chequear(
      `una unidad en talla ${t} sigue siendo UNA`,
      c.unidadesDelPedido(ped(t)).uds === 1 && c.verificarPedido(ped(t, { total: 82000, unidades: 1 }), una, {}).ok,
      JSON.stringify(c.unidadesDelPedido(ped(t)))
    );
  }

  // ── 4. Compatibilidad con registros anteriores ─────────────────────────
  // Los pedidos guardados antes de este cambio NO tienen el campo. No pueden
  // empezar a fallar por eso.
  chequear(
    "un registro viejo sin `unidades` se sigue leyendo",
    c.unidadesDelPedido({ talla: "L" }).uds === 1 && c.unidadesDelPedido({ talla: "L y M" }).uds === 2
  );
  chequear(
    "y queda marcado como incierto cuando no se sabe",
    c.unidadesDelPedido({ talla: "L" }).incierta === true,
    "hay que poder distinguir «dice que es una» de «no dice nada»"
  );

  // ── 5. ⛔ La cantidad NO se deduce del precio ───────────────────────────
  const resumen = require("./src/resumen");
  chequear(
    "🔑 cotizacion NO deduce la cantidad del total",
    c.unidadesDelPedido({ talla: "L", total: 148000 }).uds === 1,
    "un total alto sugiere dos, pero sugerir no es saber: si falta, se revisa"
  );
  chequear(
    "y un pedido así se marca, no se aprueba",
    !c.verificarPedido(ped("L", { total: 148000 }), dos, {}).ok
  );
  chequear(
    "resumen: la cantidad declarada manda",
    resumen.cantidadDe({ unidades: 2, talla: "L", total: 148000 }).cierta === true &&
      resumen.cantidadDe({ unidades: 1, talla: "L", total: 148000 }).uds === 1,
    JSON.stringify(resumen.cantidadDe({ unidades: 1, talla: "L", total: 148000 }))
  );
  chequear(
    "resumen: en un registro viejo la deducción por precio queda marcada INCIERTA",
    resumen.cantidadDe({ talla: "L", total: 148000 }).cierta === false,
    JSON.stringify(resumen.cantidadDe({ talla: "L", total: 148000 }))
  );
  chequear(
    "y el motivo lo dice",
    /registro anterior/.test(resumen.cantidadDe({ talla: "L", total: 148000 }).origen)
  );

  // ── 6. El rescate de un bloque cortado también lee la cantidad ─────────
  const { extractOrder } = require("./src/agent");
  const cortado = '##ORDER## {"nombre":"Ana","celular":"3001234567","ciudad":"Cali","direccion":"Cra 1","color":"rojo","talla":"L","unidades":2,"pago":"contraentrega","total":148000';
  const r = extractOrder(cortado);
  chequear(
    "🔑 un bloque CORTADO no pierde la cantidad",
    r.order && Number(r.order.unidades) === 2,
    JSON.stringify(r.order)
  );
  chequear("y se marca como rescatado", r.rescatado === true);
}

console.log("\n── R8. 🔴 EL CASO DEL 26-SEP: dos tallas enumeradas son dos conjuntos ──");
{
  const REAL = "Exactamente, la una talla normal XL y la otra es L normal. Bueno, muchas gracias, me confirma.";
  chequear("🔑 la frase real se lee como DOS unidades", c.resolverCantidad(REAL).uds === 2, JSON.stringify(c.resolverCantidad(REAL)));
  chequear("   y queda como cantidad explícita", c.resolverCantidad(REAL).explicita === true);
  chequear("   con las dos tallas leídas", JSON.stringify(c.resolverCantidad(REAL).tallas) === '["XL","L"]', JSON.stringify(c.resolverCantidad(REAL).tallas));
  chequear(
    "   así que cotiza el total de dos",
    c.calcular("Jamundi", REAL).total === 148000,
    `dio ${pesos(c.calcular("Jamundi", REAL).total)}`
  );

  const DOS = [["XL y L", 2], ["una XL y otra L", 2], ["quiero una talla XL y la otra en L", 2], ["una para mí y la otra para mi esposa", 2]];
  for (const [t, esp] of DOS) chequear(`  dos: "${t}"`, c.resolverCantidad(t).uds === esp, JSON.stringify(c.resolverCantidad(t)));

  // ⛔ Las tres cosas que NO son dos unidades.
  chequear("🔴 «XL o L» es una PREGUNTA: no se cotiza, se pregunta", c.resolverCantidad("¿me sirve XL o L?").ambiguo === true);
  chequear("   y el motivo lo explica", /no se sabe si quiere las dos/.test(String(c.resolverCantidad("¿me sirve XL o L?").motivo)));
  chequear("🔴 «no sé si XL o L» también es ambiguo", c.resolverCantidad("no sé si XL o L").ambiguo === true, JSON.stringify(c.resolverCantidad("no sé si XL o L")));
  for (const t of ["talla 2XL", "3XL", "quiero la 2XL"])
    chequear(`🔴 "${t}" es UNA talla, no dos unidades`, c.resolverCantidad(t).uds === 1 && !c.resolverCantidad(t).ambiguo, JSON.stringify(c.resolverCantidad(t)));
  for (const t of ["no, mejor L", "me equivoqué, cambia a XL", "no es esa talla, la L"])
    chequear(`🔴 "${t}" es una CORRECCIÓN`, c.resolverCantidad(t).uds === 1 && !c.resolverCantidad(t).ambiguo, JSON.stringify(c.resolverCantidad(t)));
  chequear("🔴 una dirección con dígitos no cambia la cantidad", c.resolverCantidad("Calle 1 #2-3, cel 3001234567").explicita === false);

  // Ambigüedad → el bloque le dice al modelo que PREGUNTE, sin dar total.
  const amb = c.calcular("Jamundi", "¿me sirve XL o L?");
  chequear("🔑 con cantidad ambigua NO se cotiza", amb.ok === false && amb.motivo === "cantidad_ambigua", JSON.stringify({ ok: amb.ok, motivo: amb.motivo }));
  const bloque = c.bloqueDeDatos(amb, {});
  chequear("   y el bloque prohíbe dar el total", /NO des ningún total/.test(bloque), bloque);
  chequear("   pero deja decir el precio base", /\$59\.900/.test(bloque), bloque);
  chequear("   y pide confirmar cuántos", /cu[aá]ntos conjuntos/.test(bloque), bloque);
}

console.log("\n── R9. 🔴 No se anuncia una venta que está bloqueada ──");
{
  // Las dos frases reales con las que se le dio la compra por hecha.
  const REALES = [
    "¡Excelente, Petronel! Todo listo. En cuanto la transportadora genere tu número de guía, te lo estaré enviando por aquí.",
    "¡Así es, Petronel! Ya quedó registrado con franja verde y para recoger en la oficina de Terranova. ¡Muchas gracias por tu compra con BikerPro!",
  ];
  for (const t of REALES) chequear(`🔑 se reconoce como cierre: "${t.slice(0, 46)}…"`, c.afirmaCierre(t) === true);
  for (const t of ["Con gusto, ¿me confirmas la talla?", "Te queda en $82.000 en total, pagas al recibir 📦", "¿De qué color prefieres la franja?"])
    chequear(`✅ y NO se marca lo que no es cierre: "${t.slice(0, 40)}…"`, c.afirmaCierre(t) === false);
}

console.log("\n── R10. 🔴 La alerta dice la causa REAL, no un total que sí coincide ──");
{
  const store = require("./src/store");
  // El caso: total correcto, cantidad incoherente. Antes decía "debería ser $82.000"
  // al lado de un pedido de $82.000.
  const pedido = {
    nombre: "X", celular: "3001234567", ciudad: "Jamundi", talla: "XL y L", total: 82000,
    precio_no_cuadra: true, pendiente_revision: true, total_esperado: 82000,
    motivo_precio: "el pedido es de 2 unidades (según las 2 tallas del pedido) y la cotización validada es de 1, por $82.000",
  };
  const texto = store.textoDeRevision(pedido);
  chequear("🔑 el aviso nombra la cantidad", /unidades/.test(texto), texto);
  chequear("🔑 y NO dice «debería ser $82.000» junto a un pedido de $82.000", !/debería ser \$82\.000/.test(texto), texto);
  chequear("la etiqueta ya no habla solo del total", /el pedido no cuadra/.test(texto) || /unidades/.test(texto), texto);
  // Y cuando el total SÍ difiere, el número esperado sigue apareciendo.
  const otro = { ...pedido, total: 99000, total_esperado: 82000, motivo_precio: "" };
  chequear("✅ si el total de verdad difiere, lo dice", /debería ser \$82\.000/.test(store.textoDeRevision(otro)), store.textoDeRevision(otro));
}

console.log("\n── R11. 🔴 Tres casos más de cantidad, reproducidos ──");
{
  const q = (t) => { const r = c.resolverCantidad(t); return r.escalar ? "ESC" : r.ambiguo ? "AMB" : String(r.uds); };

  // El orden de las comprobaciones es el arreglo: primero lo que escala, después
  // lo que el cliente declaró, y solo al final la inferencia por tallas.
  chequear('🔑 CASO OMAR: "Talla M 2 Juegos." son DOS', q("Talla M 2 Juegos.") === "2", q("Talla M 2 Juegos."));
  chequear('   y "2 juegos" suelto también', q("2 juegos") === "2");
  chequear('   igual que "dos pintas"', q("dos pintas") === "2");
  chequear(
    '🔑 "Quiero un impermeable, ¿tienen L y XL?" es UNO',
    q("Quiero un impermeable, ¿tienen L y XL?") === "1",
    q("Quiero un impermeable, ¿tienen L y XL?")
  );
  chequear("   porque lo que el cliente declara gana sobre la inferencia", c.resolverCantidad("un impermeable").uds === 1);
  chequear(
    "   y una pregunta por disponibilidad no enumera unidades",
    c.dosPorTallas("¿tienen L y XL?").dos === false,
    JSON.stringify(c.dosPorTallas("¿tienen L y XL?"))
  );
  chequear('   "hay M y L disponible?" tampoco', q("hay M y L disponible?") === "1");
  chequear(
    '🔑 "tres impermeables: uno XL y otro L y otro M" ESCALA',
    q("Quiero tres impermeables: uno XL y otro L y otro M") === "ESC",
    q("Quiero tres impermeables: uno XL y otro L y otro M")
  );
  chequear('   y tres tallas sin decir "tres" también', q("uno XL y otro L y otro M") === "ESC", q("uno XL y otro L y otro M"));
  chequear("   con el motivo escrito", /3 o m[aá]s/.test(String(c.resolverCantidad("uno XL y otro L y otro M").motivo)));

  // Y nada de lo que ya funcionaba cambió.
  chequear("✅ el caso real de dos sigue dando dos", q("la una talla normal XL y la otra es L") === "2");
  chequear("✅ la alternativa sigue ambigua", q("¿me sirve XL o L?") === "AMB");
  chequear("✅ 2XL sigue siendo una talla", q("talla 2XL") === "1");
  chequear("✅ 12 conjuntos sigue escalando", q("12 conjuntos") === "ESC");
}

console.log("\n── R12. ✂️ Se conserva la parte útil en vez de escalar ──");
{
  const cot = c.calcular("Cali", "uno");
  const salvable = (t) => {
    const d = c.depurarImportes(t, cot, {});
    const palabras = d.texto.split(/\s+/).filter(Boolean).length;
    return { ...d, ok: palabras >= 4 && d.texto.length >= 20 && c.validarRespuesta(d.texto, cot, {}).ok };
  };

  const a = salvable("Las tallas van de S a 3XL y cada conjunto sale en $70.000.");
  chequear("🔑 se conserva la explicación de las tallas", a.ok && /3XL/.test(a.texto), JSON.stringify(a));
  chequear("   y se quita el importe inválido", !/70\.000/.test(a.texto), a.texto);

  const b = salvable("Sí, hay franja verde. El combo de dos sale en $200.000.");
  chequear("🔑 se conserva la respuesta del color", b.ok && /verde/.test(b.texto), JSON.stringify(b));

  const d = salvable("Cada uno sale en $70.000.");
  chequear("🔑 si NO queda nada útil, no se inventa: se escala", d.ok === false, JSON.stringify(d));

  const e = salvable(c.lineaDePrecio(cot));
  chequear("✅ una respuesta válida no se toca", e.ok && e.quitadas.length === 0, JSON.stringify(e.quitadas));
  chequear("✅ y no se parte un $82.000 al separar oraciones", /\$82\.000/.test(e.texto), e.texto);
}

console.log("\n── R13. 🏢 Una oficina sin confirmar no se despacha ──");
{
  const store = require("./src/store");
  const base = { nombre: "X", celular: "3001234567", ciudad: "Jamundi", talla: "L", total: 82000, unidades: 1 };
  const aOficina = { ...base, entrega: "oficina", direccion: "OFICINA Interrapidísimo - Terranova" };
  chequear("🔑 a oficina sin confirmar: NO despachable", store.listoParaDespachar(aOficina) === false);
  chequear(
    "   y el aviso dice qué confirmar",
    /oficina de la transportadora no está confirmada/.test(store.textoDeRevision(aOficina)),
    store.textoDeRevision(aOficina)
  );
  chequear("   con la dirección adentro", /Terranova/.test(store.textoDeRevision(aOficina)));
  chequear(
    "🔑 solo al marcarla verificada queda despachable",
    store.listoParaDespachar({ ...aOficina, oficina_verificada: true }) === true,
    store.textoDeRevision({ ...aOficina, oficina_verificada: true })
  );
  chequear("✅ un pedido a casa no se ve afectado", store.listoParaDespachar({ ...base, direccion: "Cra 1 #2-3" }) === true);
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
