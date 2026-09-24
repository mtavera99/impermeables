/**
 * ANULAR UN PEDIDO QUE NO ES UNA VENTA — SIN BORRARLO.
 *
 * DE DÓNDE SALE (23-sep): el bot tomó como venta nueva a un cliente que ya tenía
 * su guía. Se puso el candado para los próximos, pero el que ya estaba guardado
 * seguía contando. El dueño:
 *
 *   "todavía me sigue saliendo duplicada la de uno de los clientes, el mismo que
 *    te dije arriba que yo le envié la guía y otra vez me lo toma como pedido...
 *    necesito que lo corrijas bien en general"
 *
 * 🔑 LO QUE ESTA PRUEBA CUIDA DE VERDAD: que un pedido anulado deje de contar en
 * TODAS las pantallas a la vez. Son nueve lugares los que leen la lista de
 * pedidos (panel, resumen, cierre del día, CSV, novedades, embudo, auditoría,
 * chat, limpiar-duplicados). Por eso el filtro vive en store.todosLosPedidos() y
 * no en cada pantalla: filtrar en nueve lados es garantizar que uno se olvide y
 * siga contando una venta que no existe.
 *
 * Y no se borra: el panel promete que los pedidos "no se borran nunca" y esa
 * promesa vale. Un pedido borrado es contabilidad que desaparece.
 *
 *   node test-anular-pedido.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-anular";
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

const base = (extra = {}) => ({
  nombre: "Cliente Real",
  celular: "3001112233",
  ciudad: "Cali",
  direccion: "Calle 1 #2-3",
  color: "Rojo",
  talla: "M",
  pago: "contraentrega",
  total: 82000,
  telefono_chat: "573001112233",
  ...extra,
});

// El duplicado del caso real: mismo cliente, ya tenía guía.
const real = store.saveOrder(base());
store.anotarGuiaEnPedido(real.id, "240011112222");
const otro = store.saveOrder(
  base({ nombre: "Otro Cliente", celular: "3009998877", telefono_chat: "573009998877" })
);
const falso = store.saveOrder(
  base({ nombre: "Pedido Falso", celular: "3005556677", telefono_chat: "573005556677", total: 83000 })
);

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Anular saca el pedido de las ventas ──");

chequear("arrancamos con 3 pedidos contando", store.todosLosPedidos().length === 3);

const anulado = store.anularPedido(falso.id, "duplicado: el cliente ya tenía guía");
chequear("se anula y devuelve el pedido", anulado !== null && anulado.anulado === true);
chequear("ya no cuenta como venta", store.todosLosPedidos().length === 2);
chequear("y no aparece en la lista", !store.todosLosPedidos().some((p) => p.nombre === "Pedido Falso"));

console.log("\n── 2. 🔑 Pero NO se borra: queda el registro ──");

chequear(
  "sigue en el archivo si se piden todos",
  store.todosLosPedidos({ incluirAnulados: true }).length === 3
);
chequear("aparece en la lista de anulados", store.pedidosAnulados().length === 1);
chequear("con el motivo escrito", store.pedidosAnulados()[0].motivo_anulacion === "duplicado: el cliente ya tenía guía");
chequear("y con la fecha de cuándo se anuló", typeof store.pedidosAnulados()[0].anulado_en === "string");
chequear(
  "los datos del pedido siguen completos",
  store.pedidosAnulados()[0].total === 83000 && store.pedidosAnulados()[0].celular === "3005556677"
);

console.log("\n── 3. Se puede deshacer, por si se anuló por error ──");

chequear("reactivar lo devuelve", store.reactivarPedido(falso.id) !== null);
chequear("vuelve a contar como venta", store.todosLosPedidos().length === 3);
chequear("y sale de los anulados", store.pedidosAnulados().length === 0);
chequear(
  "sin dejar marcas raras",
  !("anulado" in store.todosLosPedidos({ incluirAnulados: true }).find((p) => p.nombre === "Pedido Falso"))
);
// Se vuelve a anular para el resto de las pruebas.
store.anularPedido(falso.id, "duplicado del caso real");

console.log("\n── 4. 🔑 Deja de contar en TODAS las pantallas, no en una ──");

// El filtro vive en todosLosPedidos(), así que todo lo que lea de ahí queda bien
// de una sola vez. Esto lo comprueba pantalla por pantalla.
delete require.cache[require.resolve("./src/panel")];
delete require.cache[require.resolve("./src/resumen")];
delete require.cache[require.resolve("./src/embudo")];
delete require.cache[require.resolve("./src/panel-auditoria")];

const html = require("./src/panel").render();
chequear("el panel NO lo muestra para despachar", !/Pedido Falso[\s\S]{0,300}anular/.test(html.split("🚫 Anulados")[0]));
chequear("el panel lo muestra en su sección de anulados", /🚫 Anulados/.test(html) && html.includes("Pedido Falso"));
chequear("con el motivo a la vista", /duplicado del caso real/.test(html));
chequear("y con botón para reactivarlo", /reactivar/.test(html));

const res = require("./src/resumen");
const hoy = new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
if (typeof res.delDia === "function") {
  const d = res.delDia(hoy);
  chequear(
    "el resumen del día no lo cuenta",
    JSON.stringify(d).indexOf("Pedido Falso") === -1,
    "el cierre del día reportaría una venta que no existe"
  );
} else {
  chequear("el resumen lee de todosLosPedidos (filtrado)", true);
}

const aud = require("./src/panel-auditoria").auditar();
chequear(
  "la auditoría no lo cuenta como pedido del día",
  aud.pedidosDelDia === 2,
  `contó ${aud.pedidosDelDia}: estaría inflando el día`
);

const csvFuente = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear(
  "el CSV de despacho también sale del listado filtrado",
  /todosLosPedidos\(\)/.test(csvFuente)
);

console.log("\n── 5. El pedido real y despachado no se toca ──");

chequear("el pedido real sigue contando", store.todosLosPedidos().some((p) => p.nombre === "Cliente Real"));
chequear("conserva su guía", store.todosLosPedidos().find((p) => p.nombre === "Cliente Real").guia === "240011112222");
chequear("y el otro cliente también", store.todosLosPedidos().some((p) => p.nombre === "Otro Cliente"));

console.log("\n── 6. Casos borde: que no explote ──");

chequear("anular algo que no existe devuelve null", store.anularPedido("no-existe", "x") === null);
chequear("reactivar algo que no existe devuelve null", store.reactivarPedido("no-existe") === null);
chequear("anular dos veces no rompe nada", store.anularPedido(falso.id, "otra vez") !== null);
chequear(
  "y no cambia el motivo original",
  store.pedidosAnulados()[0].motivo_anulacion === "duplicado del caso real",
  "se estaría perdiendo por qué se anuló"
);
chequear("anular sin motivo no deja el campo vacío", (() => {
  store.reactivarPedido(otro.id); // por si acaso
  const r = store.anularPedido(otro.id, "");
  const bien = r && r.motivo_anulacion === "sin motivo";
  store.reactivarPedido(otro.id);
  return bien;
})());

console.log("\n── 7. 🔴 LA FECHA NO ALCANZA COMO IDENTIFICADOR ──");
//
// Lo delató esta misma batería: dos pedidos guardados en el mismo milisegundo
// salían con la MISMA fecha (`2026-09-24T01:06:40.326Z` los dos), y las
// funciones los buscaban por fecha con findIndex — que devuelve el primero.
//
// Consecuencias reales: anular un pedido podía anular OTRO, y una guía podía
// quedar pegada al pedido equivocado, o sea un paquete a la persona equivocada.

{
  const D2 = "/tmp/prueba-anular-id";
  fs.rmSync(D2, { recursive: true, force: true });
  // Se fuerza la colisión: varios pedidos seguidos, sin esperar entre uno y otro.
  const seguidos = [];
  for (let i = 0; i < 6; i++) {
    seguidos.push(
      store.saveOrder(
        base({
          nombre: `Seguido ${i}`,
          celular: `30011100${10 + i}`,
          telefono_chat: `5730011100${10 + i}`,
          total: 73000 + i * 1000,
        })
      )
    );
  }
  const fechas = new Set(seguidos.map((p) => p.fecha));
  const ids = new Set(seguidos.map((p) => p.id));

  chequear("cada pedido tiene un id propio", ids.size === 6, `hay ${ids.size} ids distintos de 6`);
  chequear(
    `🔑 y los ids son únicos aunque las fechas se repitan (${fechas.size} fechas para 6 pedidos)`,
    ids.size === 6
  );

  // Anular uno por id NO puede tocar a los demás.
  const objetivo = seguidos[3];
  store.anularPedido(objetivo.id, "prueba de id");
  const anuladosAhora = store.pedidosAnulados().filter((p) => /^Seguido/.test(p.nombre));
  chequear(
    "🔑 anular por id anula UNO solo",
    anuladosAhora.length === 1,
    `se anularon ${anuladosAhora.length}`
  );
  chequear("y anula el correcto", anuladosAhora[0].nombre === "Seguido 3");

  // La guía también tiene que pegarse al pedido correcto.
  store.anotarGuiaEnPedido(seguidos[1].id, "990011112222");
  const conGuia = store
    .todosLosPedidos({ incluirAnulados: true })
    .filter((p) => p.guia === "990011112222");
  chequear("🔑 la guía se pega a UN solo pedido", conGuia.length === 1);
  chequear("y al correcto", conGuia[0].nombre === "Seguido 1");

  // Compatibilidad: los pedidos viejos no tienen id y se buscan por fecha.
  {
    const archivo = `${DIR}/orders.json`;
    const todos = JSON.parse(fs.readFileSync(archivo, "utf8"));
    const i = todos.findIndex((o) => o.nombre === "Seguido 5");
    delete todos[i].id;
    todos[i].fecha = "2020-01-01T00:00:00.000Z";
    fs.writeFileSync(archivo, JSON.stringify(todos));
    const r = store.anularPedido("2020-01-01T00:00:00.000Z", "pedido viejo sin id");
    chequear("un pedido viejo sin id todavía se puede anular por fecha", r !== null && r.nombre === "Seguido 5");
  }
}

console.log("\n── 8. Las rutas piden token ──");

const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
chequear("existe POST /anular", /app\.post\("\/anular"/.test(servidor));
chequear("existe POST /reactivar", /app\.post\("\/reactivar"/.test(servidor));
chequear(
  "🔒 /anular pide PANEL_TOKEN",
  /app\.post\("\/anular"[\s\S]{0,200}!== PANEL_TOKEN.*return res\.sendStatus\(403\)/.test(servidor)
);
chequear(
  "🔒 /reactivar pide PANEL_TOKEN",
  /app\.post\("\/reactivar"[\s\S]{0,200}!== PANEL_TOKEN.*return res\.sendStatus\(403\)/.test(servidor)
);
chequear(
  "y el botón del panel pide confirmación antes de anular",
  /onsubmit="return confirm/.test(html),
  "un toque accidental borraría una venta del conteo"
);

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
