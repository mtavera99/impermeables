/**
 * 🎧 EL Q58 MAX SE VENDE SOLO, SIN TOCAR LO QUE YA FUNCIONA.
 *
 * POR QUÉ EXISTE (15-oct). El dueño lanza un TERCER producto y fue explícito:
 * *"no quiero que dañemos nada de todo lo que llevamos hasta el momento en
 * BikerPro, ninguno de los productos"*. Y: *"el V10 sigue vendiéndose como
 * estaba, pero ahora también vamos a vender el Q58 Max"*.
 *
 * 🔴 EL RIESGO QUE ESTA BATERÍA EXISTE PARA IMPEDIR. Hasta hoy la palabra
 * "intercomunicador" alcanzaba para saber qué vender, porque había uno solo. Con
 * dos, el texto prellenado de un anuncio —"quiero información de la promoción de
 * intercomunicadores"— detectaba V10 con confianza ALTA, lo CONGELABA para toda
 * la conversación y cotizaba $99.900 en vez de $129.900: $30.000 menos por venta
 * y el producto equivocado en la guía.
 *
 * Y detrás de eso había 10 lugares más que preguntaban `esV10(id)` para decidir
 * cosas que no tienen nada que ver con el V10 en particular (qué guion, qué
 * bloque de precio, cuántas unidades, qué fotos, qué plantilla). El Q58
 * contestaba "no soy V10" y heredaba TODO lo del impermeable.
 *
 *   node test-q58-max.js      (sin credenciales, sin red, sin IA)
 */

const catalogo = require("./src/catalogo");
const fletes = require("./src/fletes");
const cotizacion = require("./src/cotizacion");
const prompt = require("./src/prompt");
const seguimiento = require("./src/seguimiento");
const media = require("./src/media");

const Q = "intercom_q58_max";
const V = "intercom_v10_2x";
const I = "impermeable";

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
const plata = (n) => "$" + Number(n).toLocaleString("es-CO");

// ============================================================================
console.log("\n── 1. La ficha, con los números que confirmó el dueño ──");
// ============================================================================
const q = catalogo.de(Q);
chequear("el producto existe en el catálogo", Boolean(q));
chequear("combo de 2 a $129.900", q.precios[2] === 129900, plata(q.precios[2]));
chequear(
  "unidad a $79.900 (el dueño eligió este sobre $80.000 por los totales redondos)",
  q.precios[1] === 79900,
  plata(q.precios[1])
);
// 💰 $43.000 desde el 15-oct (el dueño lo confirmó en $45.000 y el proveedor lo
// mejoró desde el primer día de venta).
chequear("costo $43.000 por unidad", q.costoUnitario === 43000, plata(q.costoUnitario));
chequear("se cotiza precio + envío", q.motorDePrecio === "producto_mas_envio");
chequear("no pide talla ni color", q.pideTalla === false && q.pideColor === false);
chequear("NO es el producto por defecto del sistema", q.porDefecto !== true);
chequear("es de la categoría intercomunicador", q.categoria === "intercomunicador");
chequear(
  "🔑 el id NO contiene 2x/combo",
  !/2x|x2|combo|dos/i.test(Q),
  "resumen.js deduce la cantidad leyendo el TEXTO del campo producto cuando no hay `unidades`"
);
chequear(
  "paga el envío de UN paquete hasta 2 unidades",
  q.politicaDeEnvio.tipo === "paquete_unico" && q.politicaDeEnvio.hastaUnidades === 2
);
chequear(
  "⛔ declara que NO hereda los fletes del impermeable",
  (q.politicaDeEnvio.noHeredar || []).includes("PROMO_2_TOTAL") &&
    (q.politicaDeEnvio.noHeredar || []).includes("ENVIO_REAL_2")
);

// ============================================================================
console.log("\n── 2. 🔑 'INTERCOMUNICADOR' YA NO DECIDE SOLO ──");
// Es el arreglo del riesgo de $30.000.
// ============================================================================
const porModelo = [
  ["quiero el q58", Q],
  ["el q58 max cuanto vale", Q],
  ["q 58", Q],
  ["q58max", Q],
  ["me interesa el v10", V],
  ["v 10", V],
];
for (const [texto, esperado] of porModelo) {
  const r = catalogo.productoEn(texto);
  chequear(
    `"${texto}" → nombra el modelo, decide solo`,
    r && r.producto === esperado && r.generico === false,
    r ? `dio ${r.producto} (generico ${r.generico})` : "no detectó nada"
  );
}

console.log("\n   Y la categoría queda marcada como genérica:");
for (const texto of ["info de los intercomunicadores", "los de los cascos", "casco a casco"]) {
  const r = catalogo.productoEn(texto);
  chequear(
    `"${texto}" → genérico, no decide`,
    r && r.generico === true && r.categoria === "intercomunicador",
    r ? JSON.stringify({ generico: r.generico, categoria: r.categoria }) : "no detectó"
  );
}

// ============================================================================
console.log("\n── 3. El caso que costaba $30.000 por venta ──");
// ============================================================================
const PRELLENADO = "Hola, quiero mas informacion de la promocion de intercomunicadores";
const delQ58 = catalogo.productoDelHilo({ messages: [] }, PRELLENADO, { producto: Q });
chequear(
  "🔑 lead del anuncio Q58 + texto genérico → Q58",
  delQ58.producto === Q,
  `dio ${delQ58.producto} (${delQ58.porQue})`
);
const delV10 = catalogo.productoDelHilo({ messages: [] }, PRELLENADO, { producto: V });
chequear("lead del anuncio V10 + mismo texto → V10", delV10.producto === V, delV10.producto);

console.log("\n   Y sin anuncio sigue siendo V10, como antes del cambio:");
const sinAnuncio = catalogo.productoDelHilo({ messages: [] }, PRELLENADO, {});
chequear(
  "🔑 cero regresión: genérico sin anuncio → V10",
  sinAnuncio.producto === V,
  `dio ${sinAnuncio.producto}. Si esto da "impermeable", se rompió el V10 arreglando el Q58`
);
chequear(
  "…y queda fijado para que no derive al impermeable después",
  sinAnuncio.explicito === true
);

console.log("\n   El producto del hilo manda sobre lo genérico:");
chequear(
  "hilo de Q58 + pregunta genérica → sigue Q58",
  catalogo.productoDelHilo({ productoActivo: Q, messages: [] }, "trae garantia?", {}).producto === Q
);
chequear(
  "hilo de Q58 + dice V10 → cambia a V10",
  catalogo.productoDelHilo({ productoActivo: Q, messages: [] }, "mejor el v10", {}).producto === V
);
chequear(
  "hilo de V10 + dice Q58 → cambia a Q58",
  catalogo.productoDelHilo({ productoActivo: V, messages: [] }, "y el q58?", {}).producto === Q
);
chequear(
  "hilo de impermeable + pregunta por intercom → va al default de la categoría",
  catalogo.productoDelHilo({ productoActivo: I, messages: [] }, "tienen intercomunicadores?", {})
    .producto === V
);
chequear(
  '"¿son impermeables?" en un hilo de Q58 NO cambia de producto',
  catalogo.productoDelHilo({ productoActivo: Q, messages: [] }, "son impermeables?", {}).producto === Q,
  "es un adjetivo: pregunta por el producto del hilo"
);

// ============================================================================
console.log("\n── 4. 🎯 Enrutamiento por ID de anuncio (lo que pidió el dueño) ──");
// ============================================================================
const antesV = process.env.ANUNCIOS_V10;
const antesQ = process.env.ANUNCIOS_Q58;
process.env.ANUNCIOS_V10 = "120001, 120002";
process.env.ANUNCIOS_Q58 = "990001 990002";

chequear("anuncio del V10 → V10", catalogo.productoDelAnuncio({ source_id: "120001" }) === V);
chequear("anuncio del Q58 → Q58", catalogo.productoDelAnuncio({ source_id: "990001" }) === Q);
chequear("acepta separados por espacio", catalogo.productoDelAnuncio({ source_id: "990002" }) === Q);
chequear("acepta separados por coma", catalogo.productoDelAnuncio({ source_id: "120002" }) === V);
chequear(
  "un id desconocido no inventa producto por id",
  catalogo.productoDelAnuncio({ source_id: "777" }) === null,
  "sin texto del anuncio no hay de dónde sacarlo"
);

console.log("\n   Y el mapa se puede revisar sin desplegar:");
const mapa = catalogo.anunciosConfigurados();
chequear("lista los dos productos con anuncios", mapa.length === 2);
chequear(
  "dice qué variable usa cada uno",
  mapa.some((m) => m.variable === "ANUNCIOS_Q58") && mapa.some((m) => m.variable === "ANUNCIOS_V10")
);
chequear("y si está configurado", mapa.every((m) => m.configurado === true));

console.log("\n   Si el anuncio del Q58 no está mapeado, no falla callado:");
process.env.ANUNCIOS_Q58 = "";
const avisos = [];
const warnOriginal = console.warn;
console.warn = (m) => avisos.push(String(m));
catalogo.productoDelAnuncio({ source_id: "990001", titulo: "Promo de intercomunicadores" });
console.warn = warnOriginal;
chequear(
  "🔑 avisa en el log que hay un anuncio sin mapear",
  avisos.some((a) => /SIN MAPEAR/i.test(a)),
  "sin este aviso, el error se descubre en un pedido mal despachado"
);
chequear(
  "…y nombra la variable que hay que llenar",
  avisos.some((a) => a.includes("ANUNCIOS_Q58"))
);
if (antesV === undefined) delete process.env.ANUNCIOS_V10;
else process.env.ANUNCIOS_V10 = antesV;
if (antesQ === undefined) delete process.env.ANUNCIOS_Q58;
else process.env.ANUNCIOS_Q58 = antesQ;

// ============================================================================
console.log("\n── 5. 🔴 CERO CRUCE DE PRECIOS (lo que no puede pasar) ──");
// ============================================================================
const guionQ = prompt.buildSystemPrompt(Q);
const guionV = prompt.buildSystemPrompt(V);
const guionI = prompt.buildSystemPrompt(I);

chequear("el guion del Q58 lo nombra", guionQ.includes("Q58 Max"));
chequear("trae SUS precios", guionQ.includes("129.900") && guionQ.includes("79.900"));
chequear("🔑 NO menciona los $99.900 del V10", !guionQ.includes("99.900"));
chequear("🔑 NO menciona los $59.900 del impermeable", !guionQ.includes("59.900"));
chequear("🔑 NO menciona los $110.000 del impermeable", !guionQ.includes("110.000"));
chequear("dice que no tiene talla ni color", /no tiene talla/i.test(guionQ));
chequear("incluye sus funciones nuevas (radio FM)", /radio FM/i.test(guionQ));
chequear("y la memoria micro SD", /micro SD/i.test(guionQ));

console.log("\n   Los otros dos guiones, intactos:");
chequear("el del V10 sigue con $99.900", guionV.includes("99.900"));
chequear("…y no se contaminó con el Q58", !guionV.includes("129.900") && !guionV.includes("Q58"));
chequear("el del impermeable sigue con $59.900", guionI.includes("59.900"));
chequear("…y no se contaminó", !guionI.includes("129.900") && !guionI.includes("Q58"));

// ============================================================================
console.log("\n── 6. El precio por ciudad, y que el envío no se herede ──");
// ============================================================================
const esperados = {
  A: { combo: 143000, uno: 93000 },
  B: { combo: 148000, uno: 98000 },
  C: { combo: 152000, uno: 102000 },
  D: { combo: 153000, uno: 103000 },
  E: { combo: 155000, uno: 105000 },
};
for (const [banda, esp] of Object.entries(esperados)) {
  const envio = catalogo.envioDe(Q, banda, 2);
  chequear(
    `banda ${banda}: combo ${plata(esp.combo)} · unidad ${plata(esp.uno)}`,
    129900 + envio === esp.combo && 79900 + envio === esp.uno,
    `envío ${plata(envio)} → combo ${plata(129900 + envio)}, unidad ${plata(79900 + envio)}`
  );
}
console.log("\n   🔑 Y los totales salen REDONDOS, que era el punto de los $79.900:");
chequear(
  "todos los totales terminan en 000",
  Object.values(esperados).every((e) => e.combo % 1000 === 0 && e.uno % 1000 === 0)
);

console.log("\n   ⛔ El envío NO coincide con ninguna constante de DOS impermeables:");
for (const banda of ["A", "C", "E"]) {
  const envio = catalogo.envioDe(Q, banda, 2);
  chequear(
    `banda ${banda}: no usa ENVIO_REAL_2 (${plata(fletes.ENVIO_REAL_2[banda])})`,
    envio !== fletes.ENVIO_REAL_2[banda]
  );
}

console.log("\n   Y cotizar de verdad, por ciudad:");
const cotCombo = cotizacion.calcular("Cali", "quiero el combo", { producto: Q, unidades: 2 });
chequear("Cali combo → $152.000", cotCombo.total === 152000, plata(cotCombo.total));
const cotUno = cotizacion.calcular("Bogota", "quiero uno", { producto: Q, unidades: 1 });
chequear("Bogotá unidad → $93.000", cotUno.total === 93000, plata(cotUno.total));
chequear(
  "el V10 en Cali sigue en $122.000",
  cotizacion.calcular("Cali", "el combo", { producto: V, unidades: 2 }).total === 122000
);

console.log("\n   El bloque de precio que ve la IA:");
const bloqueQ = cotizacion.bloqueDeDatos(cotCombo, { producto: Q });
chequear("trae el precio del Q58", bloqueQ.includes("129.900"));
chequear("🔑 no filtra el del impermeable", !bloqueQ.includes("59.900") && !bloqueQ.includes("110.000"));
chequear("🔑 no filtra el del V10", !bloqueQ.includes("99.900"));

// ============================================================================
console.log("\n── 7. El piso económico: que no se venda en pérdida ──");
// ============================================================================
for (const banda of ["A", "B", "C", "D", "E"]) {
  const envioCobrado = catalogo.envioDe(Q, banda, 2);
  const envioReal = fletes.ENVIO_REAL_1[banda];
  const contribucion = 129900 + envioCobrado - 2 * q.costoUnitario - envioReal;
  chequear(
    `banda ${banda}: el combo deja ${plata(contribucion)}`,
    contribucion > 0,
    "con este costo y este flete el combo perdería plata"
  );
}
const contribUno = 79900 + catalogo.envioDe(Q, "E", 1) - q.costoUnitario - fletes.ENVIO_REAL_1.E;
chequear(
  `la unidad sola en la banda más cara deja ${plata(contribUno)}`,
  contribUno > 0
);

// ============================================================================
console.log("\n── 8. Fotos y seguimiento: nada de otro producto ──");
// ============================================================================
// ⚠️ ACTUALIZADO EL 15-OCT (segunda tanda): el dueño subió las fotos, así que
// las dos primeras comprobaciones cambiaron de signo. Antes verificaban que SIN
// archivos el bot no prometiera fotos; ahora que existen, verifican que las
// ofrezca — y que siga sin ofrecer las que faltan.
chequear(
  "🔑 la foto principal del Q58 ya está disponible",
  media.disponible("q58"),
  "debería resolver a q58-producto.jpg"
);
chequear(
  "…y el guion la ofrece con su marcador",
  guionQ.includes("[[MEDIA:q58]]") && !/TODAVÍA NO TENEMOS FOTOS/i.test(guionQ)
);
chequear("…y le prohíbe mandar las del impermeable", /NUNCA mandes.*impermeable/is.test(guionQ));
chequear(
  "🔑 y NUNCA ofrece las del V10",
  !guionQ.includes("[[MEDIA:v10"),
  "sería mandarle la foto del producto equivocado"
);

console.log("\n   Las que faltan NO se ofrecen (en vez de mandar otra):");
chequear(
  "falta la del casco y no se ofrece",
  !media.disponible("q58_puesto") && !guionQ.includes("[[MEDIA:q58_puesto]]")
);
chequear(
  "falta la del combo y no se ofrece",
  !media.disponible("q58_combo") && !guionQ.includes("[[MEDIA:q58_combo]]")
);

console.log("\n   Y las que sí están, resuelven a un archivo real:");
for (const [clave, archivo] of [
  ["q58", "q58-producto.jpg"],
  ["q58_pantalla", "q58-pantalla.jpg"],
  ["q58_caja", "q58-caja.jpg"],
  ["q58_contenido", "q58-contenido.jpg"],
]) {
  const r = media.resolver(clave);
  chequear(
    `"${clave}" → ${archivo}`,
    Boolean(r && r.url && r.url.endsWith(archivo)),
    r ? r.url : "no resuelve"
  );
  chequear(
    `   …y es JPG, no HEIC (WhatsApp rechaza HEIC)`,
    Boolean(r && /\.(jpg|jpeg|png|webp)$/i.test(r.url))
  );
}
chequear("el Q58 declara su propio prefijo de fotos", q.mediaPrefijo === "q58");
chequear("el V10 mantiene el suyo", catalogo.de(V).mediaPrefijo === "v10");

const plantillaQ = seguimiento.plantillaDe(Q, "seguimiento_impermeable");
chequear(
  "🔑 el Q58 NO recibe la plantilla de impermeables",
  plantillaQ !== "seguimiento_impermeable",
  `devolvió "${plantillaQ}" — mandarle la del impermeable sería el producto equivocado por WhatsApp`
);
chequear("declara su propia variable de plantilla", q.seguimientoPlantillaEnv === "SEGUIMIENTO_PLANTILLA_Q58");

// ============================================================================
console.log("\n── 9. Lo que ya funcionaba, sigue igual ──");
// ============================================================================
chequear("el impermeable sigue siendo el producto por defecto", catalogo.PRODUCTO_POR_DEFECTO === I);
chequear("el V10 sigue existiendo con sus precios", catalogo.de(V).precios[2] === 99900);
chequear("el impermeable sigue sin lista de precios propia", !catalogo.de(I).precios);
chequear("el costo del V10 sigue en su valor vigente ($30.000 desde el 15-oct)", catalogo.de(V).costoUnitario === 30000);
chequear("esV10 sigue respondiendo solo por el V10", catalogo.esV10(V) && !catalogo.esV10(Q));
chequear("esProductoSimple cubre a los dos intercomunicadores", catalogo.esProductoSimple(V) && catalogo.esProductoSimple(Q));
chequear("…y NO al impermeable", !catalogo.esProductoSimple(I));
chequear("esIntercom distingue la categoría", catalogo.esIntercom(Q) && catalogo.esIntercom(V) && !catalogo.esIntercom(I));
chequear(
  "el impermeable cotiza igual que siempre (Cali 1 ud = $82.000)",
  cotizacion.calcular("Cali", "uno", { producto: I, unidades: 1 }).total === 82000
);

// ============================================================================
console.log("\n── 10. 📸 Las fotos del Q58 quedan cableadas ──");
// El dueño ya tiene las fotos; esto verifica que al subirlas funcionen solas.
// ============================================================================
const CLAVES_Q58 = ["q58", "q58_puesto", "q58_combo", "q58_contenido", "q58_caja", "q58_pantalla"];
for (const clave of CLAVES_Q58) {
  chequear(`existe la entrada "${clave}"`, Boolean(media.MEDIA[clave]), "sin esto la foto no se ofrece nunca");
}
chequear(
  "la principal busca el archivo q58-producto",
  media.MEDIA.q58.base === "q58-producto",
  media.MEDIA.q58.base
);
chequear(
  "🔑 ninguna clave del Q58 apunta a un archivo del V10",
  CLAVES_Q58.every((k) => !String(media.MEDIA[k].base).includes("v10")),
  "sería mandarle al cliente del Q58 la foto del otro producto"
);
chequear(
  "los textos de las fotos del Q58 no nombran al V10",
  CLAVES_Q58.every((k) => !/V10/i.test(media.MEDIA[k].caption || ""))
);
chequear(
  "la principal menciona lo que lo diferencia (radio FM)",
  /radio FM/i.test(media.MEDIA.q58.caption)
);

console.log("\n   Y una variable de entorno puede reemplazar el archivo:");
const antesMedia = process.env.MEDIA_Q58;
process.env.MEDIA_Q58 = "https://example.com/q58-producto.jpg";
chequear("con MEDIA_Q58 puesta sigue disponible (gana la variable)", media.disponible("q58") === true);
const resuelta = media.resolver("q58");
chequear("…y resuelve a esa URL", resuelta && resuelta.url === "https://example.com/q58-producto.jpg");
chequear("…con su texto propio", resuelta && /Q58 Max/.test(resuelta.caption));

console.log("\n   Y entonces el guion SÍ la ofrece:");
const guionConFoto = prompt.buildSystemPrompt(Q);
chequear(
  "el guion ofrece el marcador [[MEDIA:q58]]",
  guionConFoto.includes("[[MEDIA:q58]]"),
  "es lo que el bot escribe para que se mande la foto"
);
chequear(
  "🔑 y NUNCA el del V10",
  !guionConFoto.includes("[[MEDIA:v10]]"),
  "mandaría la foto del producto equivocado"
);
if (antesMedia === undefined) delete process.env.MEDIA_Q58;
else process.env.MEDIA_Q58 = antesMedia;

chequear(
  "las fotos del V10 siguen intactas",
  media.MEDIA.v10.base === "v10-producto" && media.MEDIA.v10_caja.base === "v10-caja"
);

// ============================================================================
console.log("\n── 11. 🔑 PEDIR UNA FOTO QUE NO TENEMOS NO PUEDE DEJARLO SIN NADA ──");
//
// El dueño decidió lanzar con 4 fotos (equipo, pantalla, caja, contenido) y SIN
// la del casco ni la del combo: *"sin la del casco, sin la foto de dos, con las
// otras tenemos"*.
//
// 🔴 Y ahí había un agujero: la selección se quedaba con la primera de la lista
// y recién después se filtraba por si existía. Un cliente que preguntaba *"¿cómo
// se ve en el casco?"* —la pregunta que precede a la compra— se quedaba SIN
// NINGUNA FOTO, teniendo cuatro buenas cargadas.
// ============================================================================
const { detectMediaIntent } = require("./src/agent");

console.log("   Pide las que faltan → recibe la principal:");
for (const texto of [
  "como se ve en el casco?",
  "me mandas una foto puesto?",
  "como queda montado",
  "tienes foto del combo de dos?",
  "foto de los dos",
]) {
  const r = detectMediaIntent(texto, Q);
  chequear(
    `"${texto}" → manda la principal`,
    r.length === 1 && r[0] === "q58",
    `dio ${JSON.stringify(r)}. Si da [], el cliente se queda sin ninguna foto`
  );
}

console.log("\n   Las que sí tenemos se mandan exactas:");
for (const [texto, esperada] of [
  ["mandame una foto", "q58"],
  ["que trae la caja?", "q58_contenido"],
  ["que modelo es?", "q58_caja"],
  ["es original?", "q58_caja"],
  ["tiene pantalla? mandame foto", "q58_pantalla"],
]) {
  chequear(`"${texto}" → ${esperada}`, detectMediaIntent(texto, Q)[0] === esperada);
}

console.log("\n   🔑 Y NUNCA una de otro producto:");
for (const texto of ["como se ve en el casco?", "foto del combo", "mandame foto", "es original?"]) {
  chequear(
    `"${texto}" solo devuelve claves q58*`,
    detectMediaIntent(texto, Q).every((k) => k.startsWith("q58")),
    "mandar la del V10 o la del impermeable sería el producto equivocado"
  );
}

console.log("\n   El V10 no cambió (tiene todas sus fotos):");
for (const [texto, esperada] of [
  ["como se ve puesto", "v10_puesto"],
  ["foto del combo", "v10_combo"],
  ["mandame una foto", "v10"],
  ["que trae la caja", "v10_contenido"],
]) {
  chequear(`V10: "${texto}" → ${esperada}`, detectMediaIntent(texto, V)[0] === esperada);
}

console.log("\n   Y si no pidió ver nada, no manda nada:");
for (const texto of ["cuanto vale el envio a cali", "tiene garantia?", "cuanto dura la bateria"]) {
  chequear(`"${texto}" → ninguna foto`, detectMediaIntent(texto, Q).length === 0);
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Lo más grave sería un cruce de precios: cotizar el Q58 ` +
      `con el precio del V10 son $30.000 por venta.`
  );
}
process.exit(mal ? 1 : 0);
