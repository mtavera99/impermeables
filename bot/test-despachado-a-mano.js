/**
 * UN PEDIDO CUYA GUÍA YA SE ENVIÓ TIENE QUE PODER SALIR DE LA COLA.
 *
 * POR QUÉ EXISTE (9-oct), textual del dueño:
 *   *"a Yordy ya se le envió la guía y sigue saliendo en despachar, ¿por qué?"*
 *
 * 🔴 PORQUE NO HABÍA FORMA DE DECÍRSELO AL SISTEMA. El campo `guia` de un pedido
 * se escribía en UN solo lugar: mandarHojaDeGuia(), o sea cuando el BOT manda la
 * guía desde el panel. Si la guía salió por fuera —el dueño la manda por su
 * WhatsApp, o el pareo del PDF se la pegó a otro registro— el pedido se quedaba
 * en "pendientes de despachar" para siempre.
 *
 * Y no es cosmético: esa cola es la lista de trabajo, el contador de pendientes
 * y el total "por recaudar". Un pedido fantasma ahí hace que los tres números
 * mientan, y manda al dueño a buscar algo que ya hizo.
 *
 *   node test-despachado-a-mano.js      (sin credenciales, sin red)
 */

const path = require("path");
const os = require("os");
const fs = require("fs");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "despachado-"));
process.env.DATA_DIR = DIR;

const store = require("./src/store");
const panel = require("./src/panel");

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

const pendientes = () => store.todosLosPedidos().filter((p) => !p.guia);

// El caso real, con los datos cambiados.
const TEL = "573105163335";
store.saveOrder({
  nombre: "Yordy Esteban",
  celular: "3105163335",
  ciudad: "Viterbo",
  direccion: "Calle 6 # 6-75",
  color: "Blanco",
  talla: "XL",
  total: 85000,
  pago: "contraentrega",
  telefono_chat: TEL,
});
const pedido = store.pedidoAbiertoDe(TEL);
const REF = pedido.id || pedido.fecha;

// ============================================================================
console.log("\n── 1. El pedido arranca en la cola de despacho ──");
// ============================================================================
chequear("está pendiente", pendientes().some((p) => p.telefono_chat === TEL));
chequear("no tiene guía", !pedido.guia);
chequear("el panel ofrece marcarlo como ya enviado", panel.render("").includes("ya la envié"));

// ============================================================================
console.log("\n── 2. 🔑 Marcarlo lo saca de la cola ──");
// ============================================================================
const marcado = store.marcarDespachadoAMano(REF, "240012345678");
chequear("devuelve el pedido", Boolean(marcado));
chequear("queda la guía", marcado && marcado.guia === "240012345678");
chequear("queda la fecha de despacho", Boolean(marcado && marcado.guiaEnviadaEl));
chequear(
  "🖐️ queda anotado que lo marcó una persona",
  marcado && marcado.guia_a_mano === true,
  "hay que poder distinguir 'el bot la mandó' de 'alguien dijo que la mandó'"
);
chequear("YA NO está pendiente", !pendientes().some((p) => p.telefono_chat === TEL));

const html = panel.render("");
chequear("el panel lo muestra en despachados", html.includes("240012345678"));
chequear("…con la marca de que fue a mano", html.includes("marcada a mano"));
chequear("…y ofrece deshacerlo", html.includes("sigue pendiente"));

// ============================================================================
console.log("\n── 3. Sin número de guía también sirve ──");
// Lo que el dueño necesita es sacarlo de la cola. Pero no se inventa un número.
// ============================================================================
store.saveOrder({
  nombre: "Sin Numero",
  celular: "3001112299",
  ciudad: "Buga",
  total: 85000,
  pago: "contraentrega",
  telefono_chat: "573001112299",
});
const p2 = store.pedidoAbiertoDe("573001112299");
const m2 = store.marcarDespachadoAMano(p2.id || p2.fecha, "");
chequear("se marca igual", Boolean(m2 && m2.guia));
chequear(
  'y dice "SIN-NÚMERO" en vez de inventar uno',
  m2 && m2.guia === "SIN-NÚMERO",
  m2 && m2.guia
);
chequear("salió de la cola", !pendientes().some((p) => p.nombre === "Sin Numero"));

// ============================================================================
console.log("\n── 4. ↩️ Se puede deshacer (marcar de más es el error caro) ──");
// Un pedido marcado por equivocación desaparece de la cola y nadie lo vuelve a
// mirar. Eso es un paquete que no se manda nunca.
// ============================================================================
const vuelto = store.desmarcarDespachado(REF);
chequear("devuelve el pedido", Boolean(vuelto));
chequear("le quita la guía", vuelto && !vuelto.guia);
chequear("le quita la marca de a mano", vuelto && !vuelto.guia_a_mano);
chequear("vuelve a estar pendiente", pendientes().some((p) => p.telefono_chat === TEL));

// ============================================================================
console.log("\n── 5. Lo que NO se puede hacer ──");
// ============================================================================
store.saveOrder({
  nombre: "Guia Del Bot",
  celular: "3001114444",
  ciudad: "Cali",
  total: 82000,
  pago: "contraentrega",
  telefono_chat: "573001114444",
});
const p3 = store.pedidoAbiertoDe("573001114444");
store.anotarGuiaEnPedido(p3.id || p3.fecha, "777000111");
chequear(
  "una guía que mandó el BOT no se puede deshacer",
  store.desmarcarDespachado(p3.id || p3.fecha) === null,
  "el cliente ya tiene el PDF: eso no se 'desenvía'"
);
chequear(
  "un pedido que ya tenía guía no se re-marca ni se le pisa el número",
  store.marcarDespachadoAMano(p3.id || p3.fecha, "999").guia === "777000111"
);
chequear("un pedido que no existe devuelve null", store.marcarDespachadoAMano("no-existe", "1") === null);

// ============================================================================
console.log("\n── 6. Los contadores del panel vuelven a decir la verdad ──");
// Era el daño real: el pedido fantasma inflaba los tres números.
// ============================================================================
const antesCuantos = pendientes().length;
const antesPlata = pendientes().reduce((s, p) => s + Number(p.total || 0), 0);
store.marcarDespachadoAMano(REF, "240012345678");
const despuesCuantos = pendientes().length;
const despuesPlata = pendientes().reduce((s, p) => s + Number(p.total || 0), 0);
chequear(`la cuenta de pendientes baja (${antesCuantos} → ${despuesCuantos})`, despuesCuantos === antesCuantos - 1);
chequear(
  `el total por recaudar baja $85.000 (${antesPlata} → ${despuesPlata})`,
  antesPlata - despuesPlata === 85000
);

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Sin esto, un pedido ya despachado se queda en la cola ` +
      `para siempre y los contadores del panel mienten.`
  );
}
process.exit(mal ? 1 : 0);
