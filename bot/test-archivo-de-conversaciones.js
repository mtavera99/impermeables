/**
 * ARCHIVAR CONVERSACIONES VIEJAS SIN PERDER NADA.
 *
 * POR QUÉ EXISTE (14-oct). Render mató el proceso 9 veces en 4 horas. Con los
 * datos reales —11.000 conversaciones, 32 MB— un SOLO mensaje que entra costaba
 * 290 ms y 164 MB de RSS, porque `pushMsg` lee el archivo completo, lo parsea,
 * agrega una línea y lo reescribe completo. Con el techo de heap en 268 MB, dos
 * mensajes a la vez matan el proceso.
 *
 * El arreglo mueve las conversaciones sin actividad a un segundo archivo. La
 * pregunta del dueño fue la correcta: *"¿pero no se pierden los datos ni los
 * chats? ¿no me afecta?"*. Esta batería existe para contestarla con hechos.
 *
 * 🔴 LO QUE NO SE PUEDE PERDER, en orden de gravedad:
 *   1. `noMolestar` — le prometimos no escribirle más. Si un archivado vuelve a
 *      escribir y la marca no viaja, el bot le vende a alguien que dijo que no.
 *   2. El historial y la atribución al anuncio.
 *   3. Que el buscador siga encontrando a un cliente de hace un mes.
 *   4. Los pedidos: viven en otro archivo y no se tocan.
 *
 *   node test-archivo-de-conversaciones.js      (sin credenciales, sin red)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "archivo-conv-"));
process.env.DATA_DIR = DIR;
process.env.DIAS_CONVERSACIONES_ACTIVAS = "7";

const store = require("./src/store");
const panelChat = require("./src/panel-chat");

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

const DIA = 24 * 60 * 60 * 1000;
const activas = () => Object.keys(store.todasLasConversaciones()).length;
const archivoCrudo = () => {
  try {
    return JSON.parse(fs.readFileSync(path.join(DIR, "conversations-archivo.json"), "utf8"));
  } catch {
    return {};
  }
};

// ── Montar el escenario ────────────────────────────────────────────────────
const VIEJO = "573001110001";       // 30 días sin escribir
const VIEJO_NO_MOLESTAR = "573001110002"; // 30 días Y pidió que no le escriban
const RECIENTE = "573001110003";    // escribió hoy
const AYER = "573001110004";        // ayer

store.pushMsg(VIEJO, "user", "hola, cuanto vale el impermeable");
store.pushMsg(VIEJO, "assistant", "El conjunto es $59.900 y aparte el envío");
store.guardarPerfil(VIEJO, { nombre: "Cliente Viejo" });
store.guardarAtribucion(VIEJO, { source_id: "anuncio-123", source_url: "http://x" });

store.pushMsg(VIEJO_NO_MOLESTAR, "user", "no gracias");
store.marcarNoMolestar(VIEJO_NO_MOLESTAR);

store.pushMsg(RECIENTE, "user", "quiero dos");
store.pushMsg(AYER, "user", "me interesa");

// Envejecer a mano los dos primeros (y el de ayer, un día).
const convFile = path.join(DIR, "conversations.json");
const todas = JSON.parse(fs.readFileSync(convFile, "utf8"));
const envejecer = (tel, dias) => {
  const c = todas[tel];
  c.ultimoDelCliente = Date.now() - dias * DIA;
  (c.messages || []).forEach((m) => (m.at = Date.now() - dias * DIA));
};
envejecer(VIEJO, 30);
envejecer(VIEJO_NO_MOLESTAR, 30);
envejecer(AYER, 1);
fs.writeFileSync(convFile, JSON.stringify(todas));

// ============================================================================
console.log("\n── 1. Antes de archivar, están todas ──");
// ============================================================================
chequear("hay 4 conversaciones activas", activas() === 4, `hay ${activas()}`);
chequear("el archivo viejo está vacío", Object.keys(archivoCrudo()).length === 0);

// ============================================================================
console.log("\n── 2. Archivar mueve solo las viejas ──");
// ============================================================================
const r = store.archivarConversacionesViejas(7);
chequear("movió 2 (las de 30 días)", r.movidas === 2, `movió ${r.movidas}`);
chequear("quedan 2 activas", activas() === 2, `quedan ${activas()}`);
chequear("la de hoy sigue activa", Boolean(store.todasLasConversaciones()[RECIENTE]));
chequear("la de ayer también (está dentro de los 7 días)", Boolean(store.todasLasConversaciones()[AYER]));

console.log("\n   Y las viejas están en el archivo, NO borradas:");
const arch = archivoCrudo();
chequear("la vieja está en el archivo", Boolean(arch[VIEJO]));
chequear("con sus mensajes completos", (arch[VIEJO].messages || []).length === 2);
chequear("con su perfil", arch[VIEJO].perfil && arch[VIEJO].perfil.nombre === "Cliente Viejo");
chequear(
  "y con su atribución al anuncio (guardarAtribucion la pone en `anuncio`)",
  arch[VIEJO].anuncio && arch[VIEJO].anuncio.source_id === "anuncio-123",
  JSON.stringify(arch[VIEJO].anuncio)
);

// ============================================================================
console.log("\n── 3. 🔑 SI VUELVE A ESCRIBIR, SE RECUPERA COMPLETA ──");
// ============================================================================
const antes = store.getConv(VIEJO);
chequear(
  "getConv la trae de vuelta con su historial",
  (antes.messages || []).length === 2,
  `trajo ${(antes.messages || []).length} mensajes`
);
chequear("y queda otra vez activa", Boolean(store.todasLasConversaciones()[VIEJO]));
chequear("ya no está duplicada en el archivo", !archivoCrudo()[VIEJO]);

console.log("\n   Y por el camino de un mensaje entrante (pushMsg):");
store.pushMsg(VIEJO_NO_MOLESTAR, "user", "bueno, me lo pensé mejor");
const vuelta = store.getConv(VIEJO_NO_MOLESTAR);
chequear(
  "🔴 NO arrancó una conversación en blanco",
  (vuelta.messages || []).length === 2,
  `tiene ${(vuelta.messages || []).length} mensajes; si fuera 1, se perdió el historial`
);
chequear(
  "🔴🔴 Y LA MARCA DE 'NO MOLESTAR' VIAJÓ CON ÉL",
  vuelta.noMolestar === true,
  "sin esto el bot le vuelve a vender a alguien que pidió que no le escribieran"
);

// ============================================================================
console.log("\n── 4. El buscador sigue encontrando a los archivados ──");
// Es lo que el dueño pidió explícitamente el 9-oct.
// ============================================================================
const LEJANO = "573009998888";
store.pushMsg(LEJANO, "user", "hola");
store.guardarPerfil(LEJANO, { nombre: "Marcela Lejana" });
const t2 = JSON.parse(fs.readFileSync(convFile, "utf8"));
t2[LEJANO].ultimoDelCliente = Date.now() - 40 * DIA;
(t2[LEJANO].messages || []).forEach((m) => (m.at = Date.now() - 40 * DIA));
fs.writeFileSync(convFile, JSON.stringify(t2));
store.archivarConversacionesViejas(7);

chequear("quedó archivada", !store.todasLasConversaciones()[LEJANO]);
chequear(
  "🔑 pero el buscador la encuentra igual",
  panelChat.buscarChats({ q: "Marcela" }).some((x) => x.tel === LEJANO),
  "el buscador lee todasLasConversaciones({ incluirArchivo: true })"
);
chequear(
  "y se puede abrir su chat",
  panelChat.render({ id: LEJANO, token: "tk" }).includes("hola"),
  "la pantalla de /chat también incluye el archivo"
);

// ============================================================================
console.log("\n── 5. Los pedidos NO se tocan ──");
// ============================================================================
store.saveOrder({
  nombre: "Comprador",
  celular: "3001114444",
  ciudad: "Cali",
  total: 82000,
  pago: "contraentrega",
  telefono_chat: "573001114444",
});
const pedidosAntes = store.todosLosPedidos().length;
store.archivarConversacionesViejas(7);
chequear("la cantidad de pedidos no cambió", store.todosLasPedidos === undefined && store.todosLosPedidos().length === pedidosAntes);
chequear("el pedido sigue completo", store.todosLosPedidos()[0].total === 82000);

// ============================================================================
console.log("\n── 6. Lo que NO se archiva ──");
// ============================================================================
const SIN_FECHA = "573005550000";
const t3 = store.todasLasConversaciones();
t3[SIN_FECHA] = { messages: [], paused: false };
fs.writeFileSync(convFile, JSON.stringify(t3));
store.archivarConversacionesViejas(7);
chequear(
  "una conversación sin marca de tiempo NO se archiva",
  Boolean(store.todasLasConversaciones()[SIN_FECHA]),
  "podría ser un registro recién creado; archivar algo activo es el error caro"
);
chequear(
  "archivar dos veces seguidas no mueve nada nuevo",
  store.archivarConversacionesViejas(7).movidas === 0
);

// ============================================================================
console.log("\n── 7. ultimaActividad mira todas las señales ──");
// ============================================================================
chequear("usa ultimoDelCliente", store.ultimaActividad({ ultimoDelCliente: 5000 }) === 5000);
chequear(
  "usa la respuesta humana si es más nueva",
  store.ultimaActividad({ ultimoDelCliente: 1000, ultimaRespuestaHumana: 9000 }) === 9000
);
chequear(
  "usa el último mensaje si es el más nuevo",
  store.ultimaActividad({ ultimoDelCliente: 1000, messages: [{ at: 7000 }] }) === 7000
);
chequear("una vacía da 0", store.ultimaActividad({}) === 0);
chequear("null no explota", store.ultimaActividad(null) === 0);

try {
  fs.rmSync(DIR, { recursive: true, force: true });
} catch {
  /* es /tmp */
}

console.log(`\n${ok}/${ok + mal} correctos`);
if (mal) {
  console.log(
    `\n🔴 ${mal} fallaron. Esto protege el historial de los clientes: archivar ` +
      `NO puede perder un chat, ni la marca de "no molestar".`
  );
}
process.exit(mal ? 1 : 0);
