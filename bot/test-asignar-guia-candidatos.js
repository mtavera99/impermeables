/**
 * ASIGNAR UNA GUÍA A MANO: EL CLIENTE TIENE QUE ESTAR EN LA LISTA.
 *
 * 🔴 EL CASO REAL (5-oct). El dueño, con la guía 240062816786 en rojo y el
 * desplegable de "elegí el cliente" abierto:
 *
 *     "este cliente no me sale para enviarle la guía y es este
 *      Henrry Danilo Castillo, solucionalo"
 *
 * O sea: el panel SÍ le ofrecía asignarla a mano —la red del 28-sep funcionaba—
 * pero la persona no estaba entre las opciones. Sin lista no hay forma de
 * mandarla, y el cliente se queda sin su guía.
 *
 * DOS FILTROS, Y LOS DOS ESCONDÍAN GENTE:
 *
 * 1. `.slice(0, 60)` — se mandaban los 60 pedidos MÁS NUEVOS sin guía
 *    (todosLosPedidos devuelve del más nuevo al más viejo). Con el volumen real
 *    —43 pedidos el 4-oct, 38 el 3-oct— esos 60 no alcanzan ni para día y medio.
 *    La guía de un pedido de hace dos días era IMPOSIBLE de asignar. Y era
 *    silencioso: la lista se veía llena.
 *
 * 2. `filter(p => !p.guia)` — esconder los que ya tienen guía parecía prudente,
 *    pero el candado de verdad está en /guias/asignar, que rechaza la guía que YA
 *    SE ENVIÓ. Ese candado protege lo que importa y no depende de esta lista. Lo
 *    único que lograba el filtro era que un pedido con la guía mal anotada
 *    quedara sin arreglo posible, sin decir por qué.
 *
 *   node test-asignar-guia-candidatos.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "asignar-guia-"));
const TOKEN = "clave-de-prueba";
const PUERTO = 3000 + Math.floor(Math.random() * 1000);

process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = TOKEN;
process.env.PORT = String(PUERTO);
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba";
delete process.env.OWNER_PHONE;
process.env.WHATSAPP_TOKEN = "token-falso-de-prueba";
process.env.WHATSAPP_PHONE_NUMBER_ID = "000000000000000";

// ⚠️ realFetch ANTES de que nadie toque global.fetch.
const realFetch = global.fetch;

// 🎭 Se intercepta SOLO lo que va a Meta: esta batería no puede mandar un
// WhatsApp, pero sí tiene que pegarle de verdad a nuestro propio servidor, así
// que todo lo que no sea graph.facebook.com pasa derecho al fetch real.
const enviados = [];
global.fetch = async (url, opciones) => {
  const u = String(url);
  if (u.indexOf("graph.facebook.com") === -1) return realFetch(url, opciones);
  enviados.push({ url: u });
  // La subida del archivo devuelve un media id; el envío, un mensaje.
  if (u.indexOf("/media") !== -1) {
    return { ok: true, status: 200, json: async () => ({ id: "MEDIA-999" }) };
  }
  return { ok: true, status: 200, json: async () => ({ messages: [{ id: "wamid.PRUEBA" }] }) };
};

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

const HENRRY = "Henrry Danilo Castillo";
const CON_GUIA = "Pedido Que Ya Despache";
const GUIA_VIEJA = "240011112222";

function pedido(nombre, tel, ciudad) {
  store.saveOrder({
    nombre,
    celular: tel.slice(2),
    telefono_chat: tel,
    ciudad: ciudad || "Medellín",
    direccion: "Calle 1 # 2 - 3",
    talla: "L",
    color: "Negro",
    unidades: 1,
    total: 85000,
    pago: "contraentrega",
  });
  return store.todosLosPedidos().find((p) => p.telefono_chat === tel);
}

/** Una etiqueta que NO se parece a ningún pedido: así la fila queda asignable. */
async function pdfQueNoPareaConNadie() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([420, 595]);
  const lineas = [
    "INTERRAPIDISIMO",
    "GUIA No: 240062816786",
    "DESTINATARIO: JEFFERSON TABORDA ALVAREZ",
    "DIRECCION: CRA 34 6502 VILLA HERMOSA",
    "CIUDAD: MEDELLIN / ANTIOQUIA",
    "TEL: 3027191382",
  ];
  let y = 550;
  for (const l of lineas) {
    page.drawText(l, { x: 20, y, size: 9, font });
    y -= 16;
  }
  return Buffer.from(await doc.save());
}

const base = `http://127.0.0.1:${PUERTO}`;

(async () => {
  // 🔑 Henrry va PRIMERO, o sea que es el MÁS VIEJO. Con `todosLosPedidos`
  // devolviendo del más nuevo al más viejo, un tope de 60 lo deja afuera.
  const elDeHenrry = pedido(HENRRY, "573001110001", "Medellín");

  // Un pedido que YA tiene guía anotada, para comprobar que se ofrece marcado.
  const elQueYaTieneGuia = pedido(CON_GUIA, "573001110002", "Cali");
  store.anotarGuiaEnPedido(elQueYaTieneGuia.id, GUIA_VIEJA);

  // Y 65 pedidos más nuevos, para pasar holgadamente el tope de 60.
  for (let i = 0; i < 65; i++) {
    pedido(`Cliente Relleno ${i}`, `5730022${String(i).padStart(5, "0")}`);
  }

  const total = store.todosLosPedidos().length;
  console.log(`\nPedidos guardados: ${total} (Henrry es el más viejo de todos)`);

  require("./src/server");
  await new Promise((r) => setTimeout(r, 400));

  const pdf = await pdfQueNoPareaConNadie();
  const r = await realFetch(`${base}/guias/revisar?token=${TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/pdf" },
    body: pdf,
  });
  const d = await r.json();

  // =========================================================================
  console.log("\n── 1. La fila queda en rojo pero asignable (la red del 28-sep) ──");
  // =========================================================================
  chequear("revisar responde ok", r.status === 200 && d.ok === true, JSON.stringify(d).slice(0, 140));
  chequear("leyó la hoja", Boolean(d.filas && d.filas.length === 1), JSON.stringify(d.filas));
  chequear(
    "no se envía sola (ningún pedido llega a 50 puntos)",
    d.filas[0].enviar === false,
    JSON.stringify(d.filas[0].motivo)
  );
  chequear("pero se puede asignar a mano", d.filas[0].asignable === true, JSON.stringify(d.filas[0]));

  // =========================================================================
  console.log("\n── 2. 🔑 TODOS los pedidos están en la lista, no los 60 más nuevos ──");
  // =========================================================================
  const nombres = (d.candidatos || []).map((c) => c.nombre);
  chequear(
    `🔑 Henrry Danilo Castillo está en la lista (es el pedido más viejo de ${total})`,
    nombres.indexOf(HENRRY) !== -1,
    `la lista trae ${nombres.length} de ${total} pedidos; Henrry ${nombres.indexOf(HENRRY) !== -1 ? "sí" : "NO"} está`
  );
  chequear(
    "🔑 no hay tope de 60: vienen todos los pedidos",
    (d.candidatos || []).length === total,
    `llegaron ${(d.candidatos || []).length}, hay ${total}`
  );
  chequear(
    "y su id sirve para asignar (es el mismo que guarda el servidor)",
    Boolean((d.candidatos || []).find((c) => c.nombre === HENRRY && c.id === String(elDeHenrry.id))),
    JSON.stringify((d.candidatos || []).find((c) => c.nombre === HENRRY))
  );

  // =========================================================================
  console.log("\n── 3. El que ya tiene guía se OFRECE MARCADO, no se esconde ──");
  //
  // Esconderlo dejaba sin arreglo posible a un pedido con la guía mal anotada.
  // El candado real está en /guias/asignar, que rechaza la guía ya enviada.
  // =========================================================================
  {
    const c = (d.candidatos || []).find((x) => x.nombre === CON_GUIA);
    chequear("🔑 el pedido que ya tiene guía aparece en la lista", Boolean(c), JSON.stringify(nombres.slice(0, 5)));
    chequear(
      "  y viene con la guía que ya tenía, para poder avisar",
      Boolean(c && c.guia === GUIA_VIEJA),
      JSON.stringify(c)
    );
  }
  chequear(
    "cada candidato trae el día del pedido (sirve para elegir entre homónimos)",
    (d.candidatos || []).every((c) => /^\d{4}-\d{2}-\d{2}$/.test(String(c.dia || ""))),
    JSON.stringify((d.candidatos || [])[0])
  );
  chequear(
    "⛔ y NO viaja el teléfono completo: solo los últimos 4",
    (d.candidatos || []).every((c) => String(c.cel || "").length <= 4),
    JSON.stringify((d.candidatos || [])[0])
  );

  // =========================================================================
  console.log("\n── 4. Asignarla a mano a Henrry funciona de punta a punta ──");
  // =========================================================================
  {
    const env = await realFetch(`${base}/guias/asignar?token=${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: d.id, pagina: 1, pedidoId: String(elDeHenrry.id) }),
    });
    const res = await env.json();
    chequear(
      "🔑 se le puede asignar la guía al pedido más viejo",
      res.ok === true,
      JSON.stringify(res).slice(0, 200)
    );
    chequear("  y confirma a quién se le mandó", /Henrry/i.test(String(res.nombre || "")), JSON.stringify(res));
    chequear(
      "  y de verdad salió un mensaje (subida del PDF + envío)",
      enviados.length >= 2,
      `llamadas a Meta: ${enviados.length}`
    );
  }

  // =========================================================================
  console.log("\n── 5. La pantalla: tres grupos y buscador ──");
  // =========================================================================
  {
    const panelGuias = require("./src/panel-guias");
    const script = panelGuias.render({}).match(/<script>([\s\S]*?)<\/script>/)[1];

    function nodo() {
      return {
        value: "",
        className: "",
        textContent: "",
        innerHTML: "",
        style: {},
        files: [],
        options: [],
        selectedIndex: 0,
        addEventListener() {},
        getAttribute: () => null,
        closest: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        appendChild(h) { return h; },
      };
    }
    const contexto = {
      document: {
        getElementById: () => nodo(),
        querySelector: () => nodo(),
        querySelectorAll: () => [],
        createElement: () => nodo(),
      },
      console: { log() {}, error() {} },
      JSON, Number, Object, Error, Boolean, String, Array, RegExp,
      encodeURIComponent,
      confirm: () => true,
      fetch: () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) }),
    };
    vm.createContext(contexto);
    vm.runInContext(script, contexto);

    chequear("opcionesDeAsignar existe", typeof contexto.opcionesDeAsignar === "function");

    contexto.CANDIDATOS = [
      { id: "a", nombre: "Jefferson Taborda Alvarez", ciudad: "Medellín", cel: "6806", total: "$85.000", dia: "2026-10-04", guia: "" },
      { id: "b", nombre: HENRRY, ciudad: "Medellín", cel: "0001", total: "$85.000", dia: "2026-10-01", guia: "" },
      { id: "c", nombre: CON_GUIA, ciudad: "Cali", cel: "0002", total: "$85.000", dia: "2026-10-02", guia: GUIA_VIEJA },
    ];
    contexto.MEJORES_POR_PAGINA = { 1: [{ pedidoId: "a", puntos: 30 }] };

    const todas = contexto.opcionesDeAsignar(1, "");
    chequear(
      "el parecido va primero, con su puntaje",
      /★ Jefferson Taborda Alvarez[\s\S]*\(30 pts\)/.test(todas),
      todas.slice(0, 300)
    );
    chequear(
      "🔑 Henrry sale en el grupo de pedidos sin guía",
      /Pedidos sin gu[ií]a \(1\)/.test(todas) && todas.indexOf(HENRRY) !== -1,
      todas.slice(0, 500)
    );
    chequear(
      "🔑 el que ya tiene guía va en su propio grupo, avisando",
      /Ya tienen una gu[ií]a anotada \(1\)/.test(todas) && todas.indexOf("ya tiene la guía " + GUIA_VIEJA) !== -1,
      todas.slice(0, 600)
    );
    chequear(
      "y el día sale en cada opción",
      todas.indexOf("2026-10-01") !== -1,
      todas.slice(0, 400)
    );

    const buscado = contexto.opcionesDeAsignar(1, "henrry");
    chequear(
      "🔑 el buscador deja solo lo que coincide",
      buscado.indexOf(HENRRY) !== -1 && buscado.indexOf("Jefferson") === -1 && buscado.indexOf(CON_GUIA) === -1,
      buscado
    );
    const porCelular = contexto.opcionesDeAsignar(1, "0002");
    chequear(
      "  y también busca por los últimos 4 del celular",
      porCelular.indexOf(CON_GUIA) !== -1 && porCelular.indexOf(HENRRY) === -1,
      porCelular
    );
    const sinNada = contexto.opcionesDeAsignar(1, "zzzzz");
    chequear(
      "si nada coincide, lo dice en vez de quedar vacío",
      /ning[uú]n pedido coincide/i.test(sinNada),
      sinNada
    );
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
