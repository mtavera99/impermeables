/**
 * EL TELÉFONO PROPIO IMPRESO EN LA ETIQUETA.
 *
 * 🔴 POR QUÉ EXISTE: el 30-sep el dueño movió los avisos del bot a su celular
 * personal. Y `OWNER_WHATSAPP` se usaba para DOS cosas distintas:
 *
 *   1. a dónde le llegan los avisos
 *   2. qué teléfono va impreso como remitente en la etiqueta de la guía
 *
 * El (2) existe para NO confundir el teléfono propio con el del cliente al leer
 * la etiqueta. Con el (1) apuntando a otro número, el de BikerPro deja de
 * reconocerse.
 *
 * LAS DOS CONSECUENCIAS, las dos reproducidas acá abajo:
 *
 *   · el teléfono propio entra como si fuera del destinatario. Un teléfono vale
 *     50 puntos en el pareo, y es la señal que por sí sola alcanza el mínimo.
 *   · peor: escrito con el 57 adelante son 12 dígitos, los mismos que una guía de
 *     Interrapidísimo. En una etiqueta sin el rótulo "Guía No" se lo puede llevar
 *     como NÚMERO DE GUÍA, y entonces al cliente le llega un número que no
 *     existe.
 *
 * Por eso ahora son dos variables (`TELEFONO_REMITENTE` acepta varias separadas
 * por coma) y no una.
 *
 * ⚠️ Los números de acá son INVENTADOS: este repo es público.
 *
 *   node test-remitente-de-las-guias.js      (sin credenciales ni IA)
 */

const guias = require("./src/guias");

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

// El de BikerPro, que va IMPRESO en la etiqueta.
const IMPRESO = "573001112233";
// El personal del dueño, al que ahora llegan los avisos. NO está en la etiqueta.
const AVISOS = "573109998877";
// El del cliente.
const CLIENTE = "3155551234";

// ===========================================================================
console.log("\n── 1. Se aceptan varios teléfonos propios ──");
// ===========================================================================

chequear(
  "uno solo",
  [...guias.telefonosRemitente(IMPRESO)].join() === "3001112233",
  JSON.stringify([...guias.telefonosRemitente(IMPRESO)])
);
chequear(
  "dos separados por coma",
  [...guias.telefonosRemitente(`${IMPRESO},${AVISOS}`)].join() === "3001112233,3109998877",
  JSON.stringify([...guias.telefonosRemitente(`${IMPRESO},${AVISOS}`)])
);
chequear(
  "con espacios de sobra y escritos de formas distintas",
  [...guias.telefonosRemitente(" 573001112233 , 3109998877 ")].join() === "3001112233,3109998877",
  JSON.stringify([...guias.telefonosRemitente(" 573001112233 , 3109998877 ")])
);
for (const vacio of ["", "   ", ",,", null, undefined]) {
  chequear(
    `${JSON.stringify(vacio)} -> ninguno (no se excluye nada de gusto)`,
    guias.telefonosRemitente(vacio).size === 0,
    JSON.stringify([...guias.telefonosRemitente(vacio)])
  );
}

// ===========================================================================
console.log("\n── 2. 🔴 El teléfono propio no puede pasar por el del cliente ──");
// ===========================================================================

const etiqueta = [
  "INTERRAPIDISIMO",
  "Guia No: 240061604892",
  `REMITENTE: BIKERPRO  Tel ${IMPRESO}`,
  "DESTINATARIO: HENRY MENDOZA",
  "Cel: 315 555 1234",
  "Direccion: CALLE 5 # 10-20",
  "Ciudad: PITALITO HUILA",
];

{
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: IMPRESO });
  chequear(
    "con el remitente bien configurado, solo queda el teléfono del cliente",
    c.telefonos.length === 1 && c.telefonos[0] === CLIENTE,
    JSON.stringify(c.telefonos)
  );
}

{
  // 🔴 ESTE ES EL BUG: los avisos se movieron y esta variable se quedó atrás.
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: AVISOS });
  chequear(
    "🔑 reproducido: si solo se cambia el número de avisos, el propio se cuela",
    c.telefonos.includes("3001112233"),
    `telefonos: ${JSON.stringify(c.telefonos)} — si esto falla, el bug ya no se puede reproducir`
  );
}

{
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: `${IMPRESO},${AVISOS}` });
  chequear(
    "🔑 con los dos declarados, vuelve a quedar solo el del cliente",
    c.telefonos.length === 1 && c.telefonos[0] === CLIENTE,
    JSON.stringify(c.telefonos)
  );
}

// ===========================================================================
console.log("\n── 3. 🔴🔴 Y no puede pasar por el NÚMERO DE GUÍA ──");
// Con el 57 adelante son 12 dígitos: los mismos que una guía de Interrapidísimo.
// En una etiqueta sin el rótulo "Guía No" se elige "el número largo más
// probable", y si el remitente está impreso ANTES, gana él.
//
// Lo que le llegaría al cliente: un número de guía que no existe.
// ===========================================================================

const sinRotulo = [
  `REMITENTE BIKERPRO ${IMPRESO}`,
  "INTERRAPIDISIMO",
  "240061604892",
  "DESTINATARIO HENRY MENDOZA",
  `Cel ${CLIENTE}`,
];

chequear(
  "con el remitente bien configurado, la guía es la guía",
  guias.extraerCampos(sinRotulo, { telefonoRemitente: IMPRESO }).guia === "240061604892",
  guias.extraerCampos(sinRotulo, { telefonoRemitente: IMPRESO }).guia
);

{
  // 🔴 Reproducción del daño peor.
  const c = guias.extraerCampos(sinRotulo, { telefonoRemitente: AVISOS });
  chequear(
    "🔑 reproducido: sin declararlo, el teléfono propio se toma como la guía",
    c.guia === "3001112233" || c.guia === IMPRESO,
    `guia: ${c.guia} — si esto falla, el bug ya no se puede reproducir`
  );
}

chequear(
  "🔑 con los dos declarados, la guía vuelve a ser la correcta",
  guias.extraerCampos(sinRotulo, { telefonoRemitente: `${IMPRESO},${AVISOS}` }).guia === "240061604892",
  guias.extraerCampos(sinRotulo, { telefonoRemitente: `${IMPRESO},${AVISOS}` }).guia
);

// ===========================================================================
console.log("\n── 4. Nada cambia para quien no toque la variable nueva ──");
// El comportamiento de siempre —un solo número— tiene que dar exactamente lo
// mismo que antes. Esta es la parte que no puede regresionar.
// ===========================================================================

{
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: IMPRESO });
  chequear("la guía sale igual", c.guia === "240061604892", c.guia);
  chequear("el nombre sale igual", c.nombre === "HENRY MENDOZA", c.nombre);
  chequear("la ciudad sale igual", c.ciudad === "PITALITO HUILA", c.ciudad);
  chequear("la dirección sale igual", c.direccion === "CALLE 5 # 10-20", c.direccion);
}

{
  // Sin remitente configurado no se excluye nada: es el comportamiento que había
  // cuando la variable venía vacía.
  const c = guias.extraerCampos(etiqueta, {});
  chequear(
    "sin remitente configurado, entran los dos teléfonos (como antes)",
    c.telefonos.length === 2,
    JSON.stringify(c.telefonos)
  );
}

// ===========================================================================
console.log("\n── 5. Y el pareo mejora de verdad, no solo los campos ──");
// Esto es lo que importa: que el teléfono colado no le sume 50 puntos al pedido
// equivocado. Pasa de verdad si el dueño alguna vez hizo un pedido de prueba con
// su propio número, porque entonces ese pedido cruza con TODAS las etiquetas.
// ===========================================================================

const pedidoDePrueba = {
  nombre: "PRUEBA BIKERPRO",
  celular: "3001112233", // 👈 el dueño probando con su propio número
  telefono_chat: "573001112233",
  ciudad: "BOGOTA",
  direccion: "OFICINA",
};
const pedidoReal = {
  nombre: "HENRY MENDOZA",
  celular: CLIENTE,
  telefono_chat: "57" + CLIENTE,
  ciudad: "PITALITO HUILA",
  direccion: "CALLE 5 # 10-20",
};

{
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: AVISOS }); // el bug
  const p = guias.puntuar(c, pedidoDePrueba);
  chequear(
    "🔑 reproducido: al pedido de prueba le suman los 50 puntos del teléfono",
    p.senales.some((s) => /celular/i.test(s)),
    `señales: ${JSON.stringify(p.senales)} — si esto falla, el bug ya no se puede reproducir`
  );
  // 🔴 Y ESTO ES LO QUE LO HACE PELIGROSO: con el teléfono colado pasa el mínimo,
  // o sea que es ELEGIBLE. Si el pedido verdadero no estuviera en la lista —una
  // guía de un despacho que no pasó por el bot— la guía se le mandaría a él.
  chequear(
    `🔴 y con eso pasa el mínimo de ${guias.MINIMO}: queda elegible`,
    p.puntos >= guias.MINIMO,
    `puntos: ${p.puntos}`
  );
  const r = guias.emparejar(c, [pedidoDePrueba, pedidoReal]);
  chequear(
    "  (con el pedido real en la lista igual gana el real)",
    r.pedido === pedidoReal,
    `gano: ${r.pedido && r.pedido.nombre}`
  );
}

{
  const c = guias.extraerCampos(etiqueta, { telefonoRemitente: `${IMPRESO},${AVISOS}` });
  const p = guias.puntuar(c, pedidoDePrueba);
  chequear(
    "🔑 declarado el remitente, el teléfono ya no le suma nada",
    !p.senales.some((s) => /celular/i.test(s)),
    `señales: ${JSON.stringify(p.senales)}`
  );
  // Le quedan los puntos del nombre, porque "BIKERPRO" está impreso en la
  // etiqueta como remitente. Lo que importa es que YA NO ALCANZA el mínimo.
  chequear(
    `🔑 y se queda por debajo del mínimo de ${guias.MINIMO}: deja de ser elegible`,
    p.puntos < guias.MINIMO,
    `puntos: ${p.puntos}, señales: ${JSON.stringify(p.senales)}`
  );
  chequear(
    "  son exactamente los 50 del teléfono los que se dejan de sumar",
    guias.puntuar(guias.extraerCampos(etiqueta, { telefonoRemitente: AVISOS }), pedidoDePrueba).puntos -
      p.puntos ===
      guias.PESOS.celularPedido,
    `diferencia: ${guias.puntuar(guias.extraerCampos(etiqueta, { telefonoRemitente: AVISOS }), pedidoDePrueba).puntos - p.puntos}`
  );
  const r = guias.emparejar(c, [pedidoDePrueba, pedidoReal]);
  chequear("  y el pedido real sigue ganando", r.pedido === pedidoReal, r.pedido && r.pedido.nombre);
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
