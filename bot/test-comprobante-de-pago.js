/**
 * 💸 EL COMPROBANTE DE PAGO NO SE PUEDE PERDER.
 *
 * POR QUÉ EXISTE (8-oct, caso Wilmer): un cliente eligió pago anticipado,
 * transfirió y mandó la captura del comprobante por el chat a las 8 de la
 * mañana. El bot le contestó "todavía no puedo abrir ese tipo de archivo" y
 * cortó el turno ahí mismo: el mensaje NI SE GUARDÓ. No quedó rastro en el
 * panel, ni en el embudo, ni en el puntaje de atención. El pedido no se
 * despachó y el cliente apareció al día siguiente POR INSTAGRAM preguntando por
 * su guía. Nadie sabe cuántos pedidos se perdieron así antes, y eso es
 * exactamente el problema: no había forma de saberlo.
 *
 * Esta prueba cubre las tres cosas que lo dejaron pasar:
 *   1. reconocer por texto quién va a pagar anticipado y quién dice que ya pagó
 *   2. que un pedido anticipado NO se pueda despachar sin verificar la plata
 *   3. que el aviso al dueño salga IGUAL aunque la imagen no se pueda leer
 *
 *   node test-comprobante-de-pago.js      (sin credenciales, sin red, sin IA)
 */

const path = require("path");
const os = require("os");
const fs = require("fs");

// El store escribe en disco: se le da un directorio temporal para no tocar los
// datos reales. Tiene que ir ANTES del require.
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "comprobante-"));
process.env.DATA_DIR = DIR;

const comprobante = require("./src/comprobante");
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

// ============================================================================
console.log("\n── 1. Se reconoce a quien VA A PAGAR por adelantado ──");
// Esto es lo que el dueño pidió marcar distinto para estar pendiente.
// ============================================================================
for (const frase of [
  "quiero pagar anticipado",
  "prefiero pago anticipado",
  "pago por transferencia",
  "te transfiero ahora",
  "pago por nequi",
  "lo pago adelantado mejor",
  "puedo pagar por daviplata?",
]) {
  chequear(`"${frase}" → elige anticipado`, comprobante.eligePagoAnticipado(frase) === true);
}

console.log("\n   …y NO se confunde con contraentrega ni con una duda:");
for (const frase of [
  "pago contraentrega",
  "quiero pagar contra entrega",
  "es contraentrega cierto?",
  "hola, cuánto vale el impermeable",
  "qué tallas tienen",
  "me sirve la L",
]) {
  chequear(`"${frase}" → NO es elegir anticipado`, comprobante.eligePagoAnticipado(frase) === false);
}

// ============================================================================
console.log("\n── 2. Se reconoce a quien dice que YA PAGÓ ──");
// Acá hay plata que ya se movió. Es el aviso que nunca llegó el 8-oct.
// ============================================================================
for (const frase of [
  "ya pagué",
  "ya te pagué",
  "ya hice el pago",
  "ya hice la transferencia",
  "acabo de transferir",
  "ya consigné",
  "hice el pago, ahí te mando el comprobante",
  "te mandé el comprobante",
  "ahí te va el comprobante",
  "ya le envié el soporte",
  "pago realizado",
  "ya quedó el pago",
]) {
  chequear(`"${frase}" → declara pago hecho`, comprobante.declaraPagoHecho(frase) === true);
}

console.log("\n   …y NO lo confunde con una pregunta o un plan (eso mandaría al dueño a buscar");
console.log("      una plata que nadie mandó, y un aviso falso entrena a ignorar los avisos):");
for (const frase of [
  "cómo pago?",
  "cómo hago el pago",
  "cuándo tengo que pagar",
  "voy a pagar mañana",
  "puedo pagar con tarjeta?",
  "pago contraentrega",
  "dónde pago",
  "quiero dos impermeables talla L",
]) {
  chequear(`"${frase}" → NO es un pago hecho`, comprobante.declaraPagoHecho(frase) === false);
}

// ============================================================================
console.log("\n── 3. Qué mensajes se tratan como posible comprobante ──");
// ============================================================================
chequear("una imagen sí", comprobante.puedeSerComprobante({ type: "image", image: { id: "1" } }) === true);
chequear(
  "un PDF sí (hay bancos que mandan el soporte así)",
  comprobante.puedeSerComprobante({ type: "document", document: { id: "2", mime_type: "application/pdf" } }) === true
);
chequear(
  "un documento que es imagen sí",
  comprobante.puedeSerComprobante({ type: "document", document: { id: "3", mime_type: "image/png" } }) === true
);
chequear("un texto no", comprobante.puedeSerComprobante({ type: "text" }) === false);
chequear("un sticker no", comprobante.puedeSerComprobante({ type: "sticker" }) === false);
chequear("una ubicación no", comprobante.puedeSerComprobante({ type: "location" }) === false);
chequear("el id de medios se saca de la imagen", comprobante.mediaIdDe({ type: "image", image: { id: "abc" } }) === "abc");
chequear(
  "el id de medios se saca del documento",
  comprobante.mediaIdDe({ type: "document", document: { id: "xyz" } }) === "xyz"
);

// ============================================================================
console.log("\n── 4. Leer la respuesta del modelo sin creerle de más ──");
// ============================================================================
chequear(
  "saca el JSON aunque venga envuelto en ```",
  (comprobante.parsearJSON('```json\n{"es_comprobante": true, "monto": "85.000"}\n```') || {}).es_comprobante === true
);
chequear("si no hay JSON devuelve null", comprobante.parsearJSON("no pude leer la imagen") === null);
chequear('el monto "$ 85.000" se vuelve 85000', comprobante.montoANumero("$ 85.000") === 85000);
chequear("un monto vacío queda en null", comprobante.montoANumero("") === null);
chequear("un monto que no es número queda en null", comprobante.montoANumero("no se ve") === null);
chequear(
  "el mime se limpia de parámetros extra",
  comprobante.mimeLimpio("image/jpeg; qualidade=alta", "image/jpeg") === "image/jpeg"
);

const normal = comprobante.normalizar({ es_comprobante: true, banco: "Nequi", monto: "85000", fecha: "8 oct" });
chequear("normalizar deja el monto como número", normal.monto === 85000);
chequear("normalizar marca esComprobante", normal.esComprobante === true);
chequear(
  "lo que no venía queda en cadena vacía, no en undefined",
  normal.referencia === "" && normal.destino === ""
);
chequear(
  "si el modelo no dice es_comprobante, NO se asume que lo es",
  comprobante.normalizar({ banco: "Nequi" }).esComprobante === false
);

// ============================================================================
console.log("\n── 5. 🔑 UN PEDIDO ANTICIPADO NO SE DESPACHA SIN VERIFICAR LA PLATA ──");
// El candado de fondo. Sin esto, todo lo demás es solo un aviso más.
// ============================================================================
const base = { nombre: "Prueba", celular: "3001112233", ciudad: "Bogotá", direccion: "cll 1", total: 85000 };

const anticipado = { ...base, pago: "anticipado" };
chequear("un pedido anticipado requiere revisión", store.requiereRevision(anticipado) === true);
chequear("…y NO está listo para despachar", store.listoParaDespachar(anticipado) === false);
chequear(
  "…y el motivo es el del pago",
  store.motivosDeRevision(anticipado).some((m) => m.clave === "pago_anticipado_sin_verificar"),
  JSON.stringify(store.motivosDeRevision(anticipado))
);
chequear(
  "…y el motivo dice que todavía no mandó el comprobante",
  /todavía no mandó el comprobante/.test(store.textoDeRevision(anticipado)),
  store.textoDeRevision(anticipado)
);

chequear(
  "un pedido contraentrega NO queda frenado por esto",
  store.listoParaDespachar({ ...base, pago: "contraentrega" }) === true
);
chequear(
  "un pedido sin medio de pago tampoco",
  store.listoParaDespachar({ ...base, pago: "" }) === true
);

console.log("\n   El campo `pago` es texto libre, así que no alcanza con comparar con 'anticipado':");
for (const forma of ["anticipado", "Anticipado", "pago anticipado", "transferencia", "nequi", "adelantado", "consignación"]) {
  chequear(`"${forma}" se lee como anticipado`, store.esPagoAnticipado({ pago: forma }) === true);
}
for (const forma of ["contraentrega", "contra entrega", "Contraentrega", ""]) {
  chequear(`"${forma}" NO se lee como anticipado`, store.esPagoAnticipado({ pago: forma }) === false);
}

console.log("\n   Y una vez verificado, se despacha normal:");
chequear(
  "con el pago verificado queda listo",
  store.listoParaDespachar({ ...anticipado, pago_verificado: true }) === true
);
chequear(
  "haber mandado el comprobante NO alcanza para despachar",
  store.listoParaDespachar({ ...anticipado, comprobante_recibido: true }) === false,
  "una captura no es la plata en la cuenta: eso solo lo cierra el dueño mirando el banco"
);
chequear(
  "un comprobante en un pedido CONTRAENTREGA también frena el despacho",
  store.listoParaDespachar({ ...base, pago: "contraentrega", comprobante_recibido: true }) === false,
  "si mandó captura de pago, el campo `pago` está mal: despacharlo a recaudar le cobra dos veces"
);

// ============================================================================
console.log("\n── 6. El comprobante queda anotado en el pedido (TRAZABILIDAD) ──");
// Esto es lo que literalmente no existía: el rastro.
// ============================================================================
const TEL = "prueba-comprobante-1";
store.saveOrder({ ...base, nombre: "Cliente Anticipado", telefono_chat: TEL, pago: "anticipado" });

chequear("el pedido abierto del chat se encuentra", Boolean(store.pedidoAbiertoDe(TEL)));

const marcado = store.marcarComprobanteRecibido(TEL, { monto: 85000, banco: "Nequi", referencia: "M123" });
chequear("marcar el comprobante devuelve el pedido", Boolean(marcado));
chequear("queda comprobante_recibido en el pedido", marcado && marcado.comprobante_recibido === true);
chequear("queda el monto leído", marcado && marcado.comprobante_monto === 85000);
chequear("queda el medio de pago", marcado && marcado.comprobante_banco === "Nequi");
chequear("queda la fecha en que llegó", Boolean(marcado && marcado.comprobante_recibido_el));
chequear(
  "🔑 NO se marca como pago verificado: el bot no puede confirmar un pago",
  marcado && marcado.pago_verificado !== true
);
chequear(
  "el motivo ahora dice que ya mandó el comprobante",
  /ya mandó el comprobante/.test(store.textoDeRevision(marcado)),
  store.textoDeRevision(marcado)
);
chequear("y sigue sin poder despacharse", store.listoParaDespachar(marcado) === false);

console.log("\n   El dueño mira la cuenta y confirma:");
const verificado = store.marcarPagoVerificado(marcado.id || marcado.fecha, "el dueño");
chequear("marcar verificado devuelve el pedido", Boolean(verificado));
chequear("queda pago_verificado", verificado && verificado.pago_verificado === true);
chequear("queda firmado quién lo verificó", verificado && verificado.pago_verificado_por === "el dueño");
chequear("AHORA SÍ se puede despachar", store.listoParaDespachar(verificado) === true);

console.log("\n   La cola de pagos por verificar:");
const TEL2 = "prueba-comprobante-2";
store.saveOrder({ ...base, nombre: "Otro Anticipado", telefono_chat: TEL2, pago: "transferencia", total: 90000 });
const cola = store.pedidosConPagoPorVerificar();
chequear(
  "el pedido ya verificado NO está en la cola",
  !cola.some((p) => p.telefono_chat === TEL),
  cola.map((p) => p.nombre).join(", ")
);
chequear("el que falta verificar SÍ está en la cola", cola.some((p) => p.telefono_chat === TEL2));

console.log("\n   Si el chat no tiene pedido, marcar no explota (el cliente puede pagar antes de cerrar):");
chequear(
  "sin pedido devuelve null en vez de fallar",
  store.marcarComprobanteRecibido("prueba-sin-pedido", { monto: 1000 }) === null
);

// ============================================================================
console.log("\n── 7. El chat queda marcado para estar pendiente ──");
// ============================================================================
const TEL3 = "prueba-marca-chat";
chequear("la primera vez marca el chat", store.marcarPagoAnticipadoEsperado(TEL3) === true);
chequear("el chat queda esperando comprobante", store.getConv(TEL3).esperaComprobante === true);
chequear(
  "la segunda vez NO repite el aviso",
  store.marcarPagoAnticipadoEsperado(TEL3) === false,
  "si avisa cada vez que el cliente nombra Nequi, el dueño aprende a ignorar el aviso"
);
store.marcarComprobanteEnChat(TEL3, { monto: 85000 });
chequear("al llegar el comprobante se cierra la espera", !store.getConv(TEL3).esperaComprobante);
chequear("y queda anotado cuándo llegó", Boolean(store.getConv(TEL3).comprobanteRecibidoEl));

console.log("\n   El freno de los avisos repetidos de 'ya pagué':");
const TEL4 = "prueba-debounce";
chequear("el primer aviso se manda", store.debeAvisarPagoDeclarado(TEL4) === true);
chequear(
  "el segundo seguido NO",
  store.debeAvisarPagoDeclarado(TEL4) === false,
  "tres mensajes nerviosos en dos minutos no son tres pagos"
);
chequear("pero pasada la ventana sí vuelve a avisar", store.debeAvisarPagoDeclarado(TEL4, 0) === true);

// ============================================================================
console.log("\n── 8. 🔑 EL AVISO AL DUEÑO SALE SIEMPRE ──");
// La lección del caso: el bot falló porque se calló, no porque no supiera leer.
// Leer la imagen es un lujo; avisar es el mecanismo.
// ============================================================================
const pedidoDemo = { nombre: "Wilmer", ciudad: "Cali", total: 85000 };

const avisoOk = comprobante.avisoParaDueno({
  de: "57300",
  datos: comprobante.normalizar({ es_comprobante: true, monto: "85000", banco: "Nequi", fecha: "8 oct" }),
  pedido: pedidoDemo,
});
chequear("el aviso con datos dice que llegó un comprobante", /LLEGÓ UN COMPROBANTE/.test(avisoOk));
chequear("…trae el monto leído", /85\.000/.test(avisoOk), avisoOk);
chequear("…trae el medio", /Nequi/.test(avisoOk));
chequear("…y dice que NO se despache hasta verificar", /NO SE DESPACHA/.test(avisoOk), avisoOk);
chequear(
  "…y NUNCA dice que el pago está confirmado",
  !/pago confirmado|ya pagó confirmado|plata confirmada/i.test(avisoOk),
  avisoOk
);

const avisoSinLeer = comprobante.avisoParaDueno({
  de: "57300",
  datos: null,
  error: "Gemini 429: cuota agotada",
  pedido: pedidoDemo,
});
chequear(
  "🔑 si la imagen NO se pudo leer, el aviso SE MANDA IGUAL",
  avisoSinLeer.length > 40 && /No se pudo leer la imagen/.test(avisoSinLeer),
  avisoSinLeer
);
chequear("…y dice el motivo real", /cuota agotada/.test(avisoSinLeer));
chequear("…y manda a abrir el chat", /Abrí el chat/.test(avisoSinLeer));
chequear("…y también frena el despacho", /NO SE DESPACHA/.test(avisoSinLeer));

const avisoSinPedido = comprobante.avisoParaDueno({ de: "57300", datos: null, error: "x", pedido: null });
chequear(
  "si no hay pedido guardado, el aviso lo dice",
  /NO tiene un pedido guardado/.test(avisoSinPedido),
  avisoSinPedido
);

const avisoNoEsComprobante = comprobante.avisoParaDueno({
  de: "57300",
  datos: comprobante.normalizar({ es_comprobante: false, que_es: "foto de un casco" }),
  pedido: pedidoDemo,
});
chequear(
  "si la imagen no parece comprobante, lo dice sin descartarla",
  /no parece un comprobante/.test(avisoNoEsComprobante) && /foto de un casco/.test(avisoNoEsComprobante),
  avisoNoEsComprobante
);

console.log("\n   Y si el monto del comprobante no cuadra con el pedido, se avisa:");
const avisoDescuadre = comprobante.avisoParaDueno({
  de: "57300",
  datos: comprobante.normalizar({ es_comprobante: true, monto: "50000" }),
  pedido: pedidoDemo,
});
chequear(
  "el descuadre de monto se dice en el aviso",
  /EL MONTO NO CUADRA/.test(avisoDescuadre),
  avisoDescuadre
);
chequear("…con los dos números", /50\.000/.test(avisoDescuadre) && /85\.000/.test(avisoDescuadre));

// ============================================================================
console.log("\n── 9. 🔴 LO QUE SE LE CONTESTA AL CLIENTE QUE YA PAGÓ ──");
// Esta es la frase exacta que recibió el cliente del 8-oct y que no puede volver.
// ============================================================================
const RTA_VIEJA = /no puedo abrir ese tipo de archivo/i;

const rtaComprobante = comprobante.respuestaAlCliente(
  comprobante.normalizar({ es_comprobante: true, monto: "85000" })
);
chequear("nunca más 'no puedo abrir ese tipo de archivo'", !RTA_VIEJA.test(rtaComprobante), rtaComprobante);
chequear("se le dice que se recibió", /recibid/i.test(rtaComprobante), rtaComprobante);
chequear("…que se está verificando", /verificar/i.test(rtaComprobante));
chequear("…y que le llega la guía", /gu[ií]a/i.test(rtaComprobante));
chequear(
  "🔑 NO se le promete que el pago ya quedó confirmado",
  !/pago confirmado|ya qued[óo] confirmado|pago aprobado/i.test(rtaComprobante),
  rtaComprobante
);

const rtaSinLeer = comprobante.respuestaAlCliente(null);
chequear("si no se pudo leer, igual se le responde algo útil", rtaSinLeer.length > 30 && !RTA_VIEJA.test(rtaSinLeer));
chequear("…y se le dice que alguien la va a revisar", /revisando|registrada/i.test(rtaSinLeer), rtaSinLeer);

// ============================================================================
console.log("\n── 10. El guion ya no promete lo que no puede cumplir ──");
// ============================================================================
process.env.PAGO_NEQUI = "300 000 0000";
// Se recarga el módulo para que lea la variable recién puesta.
delete require.cache[require.resolve("./src/prompt")];
const prompt = require("./src/prompt");
const guion = typeof prompt.pagoAnticipadoInfo === "function" ? prompt.pagoAnticipadoInfo() : "";
if (!guion) {
  console.log("   (pagoAnticipadoInfo no está exportado: se revisa el texto del archivo)");
  const fuente = fs.readFileSync(path.join(__dirname, "src", "prompt.js"), "utf8");
  chequear(
    'el guion ya NO dice "confirmas y se despacha"',
    !/Cuando lo mande, confirmas y se despacha/.test(fuente),
    "esa frase ponía al bot a confirmar un pago que no puede ver"
  );
  chequear("…y ahora habla de verificar", /est[áa] verificando que el pago entr/.test(fuente));
  chequear(
    "…y le prohíbe decir que el pago quedó confirmado",
    /NUNCA le digas que el pago ya qued[óo] confirmado/.test(fuente)
  );
} else {
  chequear('el guion ya NO dice "confirmas y se despacha"', !/confirmas y se despacha/.test(guion), guion);
  chequear("…y ahora habla de verificar que el pago entró", /verificando que el pago entr/.test(guion), guion);
  chequear(
    "…y le prohíbe confirmar el pago",
    /NUNCA le digas que el pago ya qued[óo] confirmado/.test(guion),
    guion
  );
  chequear("…y sigue compartiendo el medio de pago", /300 000 0000/.test(guion));
}

// ============================================================================
// Limpieza del directorio temporal.
try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* da igual: es /tmp */
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Esto protege el caso del 8-oct: un cliente que YA PAGÓ ` +
      `no puede quedar invisible para el sistema.`
  );
}
process.exit(mal ? 1 : 0);
