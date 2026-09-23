/**
 * EL CLIENTE QUE YA COMPRÓ NO ESTÁ COMPRANDO OTRA VEZ.
 *
 * DE DÓNDE SALE (23-sep), en palabras del dueño:
 *
 *   "cayó supuestamente otra venta y es una duplicada de una de las guías que
 *    envié, y contestó la persona y la tomó otra vez como pedido, y sigue 1 sola
 *    venta en todo el día"
 *
 * Un cliente que YA había comprado y YA tenía su guía contestó el mensaje, y el
 * bot volvió a emitir el bloque ##ORDER##. El pedido falso entró al conteo.
 *
 * 🔑 Y ESO ES PEOR QUE UN PAQUETE DE MÁS: el dueño decide con esos números
 * —CPA, cierre, cuánto recargar— y un pedido inventado los corrompe todos. Hoy
 * mismo estuvimos a punto de leer el día con 2 ventas cuando había 1.
 *
 * LOS DOS HUECOS QUE TENÍA EL CANDADO:
 *   1. la ventana era de 6 horas, y el pedido original era de antes
 *   2. no miraba si el pedido ya se había despachado (si ya tiene guía, el
 *      cliente está contestando la guía, no comprando)
 *
 *   node test-pedido-duplicado.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-duplicado";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

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
const pesos = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

const DIA = 24 * 60 * 60 * 1000;
const hace = (ms) => new Date(Date.now() - ms).toISOString();

const pedido = (extra = {}) => ({
  nombre: "Cliente Uno",
  celular: "3001112233",
  ciudad: "Sincelejo",
  direccion: "Calle 10 #5-20",
  color: "Rojo",
  talla: "XL",
  pago: "contraentrega",
  total: 83000,
  telefono_chat: "573001112233",
  ...extra,
});

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. 🔑 EL CASO REAL: ya tenía guía y contestó el mensaje ──");

{
  // Un pedido de hace 2 días, YA DESPACHADO (tiene guía).
  const viejo = pedido({ fecha: hace(2 * DIA), guia: "240011112222" });
  const r = store.esPedidoDuplicado([viejo], pedido());
  chequear(
    "el pedido nuevo se reconoce como duplicado",
    r !== null,
    "pasaría como venta nueva y ensuciaría el CPA"
  );
  chequear("y se identifica cuál era el original", r && r.guia === "240011112222");
}

console.log("\n── 2. El hueco de las 6 horas ──");

for (const [dias, esperado] of [
  [0, true],
  [1, true],
  [7, true],
  [29, true],
  [31, false],
]) {
  const viejo = pedido({ fecha: hace(dias * DIA) });
  const r = store.esPedidoDuplicado([viejo], pedido());
  chequear(
    `un pedido idéntico de hace ${dias} día${dias === 1 ? "" : "s"} → ${
      esperado ? "duplicado" : "se acepta"
    }`,
    (r !== null) === esperado
  );
}
chequear(
  "la ventana es de 30 días, no de 6 horas",
  store.VENTANA_PEDIDO_DUPLICADO_MS === 30 * DIA,
  `es ${store.VENTANA_PEDIDO_DUPLICADO_MS / DIA} días`
);
chequear(
  "🔑 y si ya tiene guía, no importa cuánto tiempo pasó",
  store.esPedidoDuplicado([pedido({ fecha: hace(200 * DIA), guia: "999" })], pedido()) !== null,
  "un cliente de hace 200 días con guía contestando no es una venta nueva"
);

console.log("\n── 3. El caso original sigue cubierto: el bloque emitido dos veces ──");

{
  const r = store.esPedidoDuplicado([pedido({ fecha: hace(25 * 1000) })], pedido());
  chequear("dos bloques con 25 segundos de diferencia → duplicado", r !== null);
}

console.log("\n── 4. Los clientes con nombre de usuario (sin teléfono) ──");

{
  const sinTel = { ...pedido({ celular: "" }), telefono_chat: "CO.1098944123092301" };
  const r = store.esPedidoDuplicado([{ ...sinTel, fecha: hace(DIA) }], sinTel);
  chequear("se comparan por el id del chat, que es lo único que hay", r !== null);
}

console.log("\n── 5. ⚠️ Una compra REAL de un cliente repetido NO se tira ──");
//
// Es el otro lado del riesgo: si se descarta a ciegas, se pierde una venta de
// verdad. Un pedido distinto se GUARDA, pero marcado para confirmar.

{
  const viejo = pedido({ fecha: hace(3 * DIA), guia: "240011112222" });
  const nuevo = pedido({ total: 137000, talla: "M" }); // otro producto, otro total
  chequear(
    "un pedido DISTINTO del mismo cliente no se descarta",
    store.esPedidoDuplicado([viejo], nuevo) === null,
    "se estaría tirando una venta real"
  );
  const sosp = store.pedidoSospechoso([viejo], nuevo);
  chequear("pero se detecta que ya había comprado", sosp !== null);
  chequear("y se sabe cuánto fue el anterior", sosp && sosp.total === 83000);
}
chequear(
  "un cliente nuevo no levanta ninguna sospecha",
  store.pedidoSospechoso([pedido({ celular: "3009998877", telefono_chat: "573009998877" })], pedido()) === null
);

console.log("\n── 6. Guardando de verdad: el conteo de ventas no se infla ──");

{
  const primero = store.saveOrder(pedido());
  chequear("el primer pedido se guarda", store.todosLosPedidos().length === 1);
  chequear("y no viene marcado", !primero.posible_duplicado);

  // Se le manda la guía, como en el caso real.
  store.anotarGuiaEnPedido(primero.fecha, "240011112222");

  // El cliente contesta y el bot vuelve a emitir el bloque.
  const segundo = store.saveOrder(pedido());
  chequear(
    "🔑 el pedido repetido NO se guarda",
    store.todosLosPedidos().length === 1,
    `quedaron ${store.todosLosPedidos().length} pedidos: el conteo de ventas quedaría inflado`
  );
  chequear("y se avisa que fue ignorado", segundo.duplicadoIgnorado === true);
  chequear(
    "el que se devuelve es el original, con su guía",
    segundo.guia === "240011112222"
  );
}

console.log("\n── 7. Y una compra nueva de verdad sí entra, marcada ──");

{
  const otro = store.saveOrder(pedido({ total: 137000, talla: "M" }));
  chequear("se guarda", store.todosLosPedidos().length === 2);
  chequear("marcado como posible repetido", otro.posible_duplicado === true);
  chequear("con el total del pedido anterior", otro.pedido_previo_total === 83000);
  chequear("y con la fecha del anterior", typeof otro.pedido_previo_fecha === "string");
}

console.log("\n── 8. El dueño se entera: aviso y panel ──");

const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear(
  "el aviso de WhatsApp advierte el posible repetido",
  /order\.posible_duplicado/.test(servidor)
);
chequear(
  "y le dice que confirme antes de despachar",
  /Confirm[áa] con [ée]l antes de despachar/.test(servidor)
);

delete require.cache[require.resolve("./src/panel")];
const html = require("./src/panel").render();
chequear("el panel lo marca con una etiqueta", /¿REPETIDO\?/.test(html));
chequear("y dice cuánto era el pedido anterior", /ya tenía un pedido de \$83\.000/.test(html));
chequear("pidiendo confirmar antes de despachar", /confirmá antes de despachar/.test(html));

console.log("\n── 9. El guion le enseña a no armar otro pedido ──");

const guion = require("./src/prompt").buildSystemPrompt();
chequear(
  "tiene la regla de que si ya compró no se arma otro pedido",
  /SI EL CLIENTE YA COMPR[ÓO], NO LE ARMES OTRO PEDIDO/.test(guion)
);
chequear(
  "explica que lo que escribe después no es una compra nueva",
  /NO es una compra nueva/.test(guion)
);
chequear(
  "cuenta el caso real para que no se repita",
  /ya ten[íi]a su gu[íi]a enviada contest[óo] el mensaje/.test(guion)
);
chequear("dice cómo atenderlo: posventa", /atendelo como posventa/i.test(guion));
chequear(
  "y deja la puerta abierta a una compra nueva de verdad",
  /Solo arm[áa] un pedido nuevo si el cliente lo pide EXPL[ÍI]CITAMENTE/.test(guion)
);

console.log("\n── 10. Casos borde: que no explote ──");

chequear("sin pedidos previos no hay duplicado", store.esPedidoDuplicado([], pedido()) === null);
chequear(
  "un pedido sin teléfono ni chat no rompe nada",
  store.esPedidoDuplicado([pedido()], { total: 83000, talla: "XL" }) === null
);
chequear(
  "una fecha inválida no cuelga la comparación",
  store.esPedidoDuplicado([pedido({ fecha: "no-es-fecha" })], pedido()) === null
);
chequear(
  "un pedido con guía y fecha inválida igual se detecta",
  store.esPedidoDuplicado([pedido({ fecha: "no-es-fecha", guia: "1" })], pedido()) !== null
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
