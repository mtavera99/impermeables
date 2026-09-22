/**
 * Prueba DOS cosas que se perdían en silencio:
 *
 *  B) LOS PEDIDOS NO SE PUEDEN PERDER
 *     Render manda SIGTERM en cada despliegue y el proceso puede morir a mitad
 *     de escribir el JSON. Antes eso dejaba el archivo truncado, la lectura
 *     devolvía [] sin avisar, y la escritura siguiente pisaba todo con la lista
 *     vacía. Los pedidos desaparecían sin una línea de log.
 *
 *  A) DE QUÉ ANUNCIO VINO EL CLIENTE
 *     Meta lo manda gratis en `messages[].referral`, pero SOLO en el primer
 *     mensaje después del clic. El pedido se cierra varios mensajes después, así
 *     que hay que guardarlo en la conversación y recogerlo al cerrar. Si se
 *     leyera del mensaje del pedido, siempre saldría vacío.
 *
 * Los payloads son los REALES de los logs del 22-sep, con los identificadores
 * cambiados (el repo es público y eran clientes reales).
 *
 *   node test-datos-y-atribucion.js      (no necesita credenciales ni IA)
 */

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "data-prueba-atribucion");
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;

const store = require("./src/store");
const resumen = require("./src/resumen");

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

const ORDERS = path.join(DIR, "orders.json");
const CONV = path.join(DIR, "conversations.json");

// ===========================================================================
console.log("\n── B1. La escritura es atómica ──");
// ===========================================================================

store.saveOrder({ nombre: "Ana", celular: "3001112233", total: 77000, talla: "M", telefono_chat: "573001112233" });
chequear("un pedido se guarda y se puede leer", store.todosLosPedidos().length === 1);

// Que no queden temporales tirados: el disco de Render es de 1 GB y se paga.
const basura = fs.readdirSync(DIR).filter((f) => f.endsWith(".tmp"));
chequear("no quedan archivos .tmp de basura", basura.length === 0, `quedaron: ${basura.join(", ")}`);

// ===========================================================================
console.log("\n── B2. Un archivo truncado NO borra los pedidos en silencio ──");
// ===========================================================================

store.saveOrder({ nombre: "Beto", celular: "3002223344", total: 82000, talla: "L", telefono_chat: "573002223344" });
const antes = store.todosLosPedidos().length;
chequear("hay 2 pedidos antes de romper el archivo", antes === 2);

// Simular exactamente el daño real: el proceso murió a mitad de escribir.
const completo = fs.readFileSync(ORDERS, "utf8");
fs.writeFileSync(ORDERS, completo.slice(0, Math.floor(completo.length / 2)));

const errores = [];
const errorOriginal = console.error;
console.error = (...a) => errores.push(a.join(" "));
const leidos = store.todosLosPedidos();
console.error = errorOriginal;

chequear(
  "un archivo corrupto NO se lee como si estuviera vacío sin más",
  errores.some((e) => e.includes("CORRUPTO")),
  "se leyó el archivo roto sin una sola línea de error: eso es la pérdida silenciosa"
);
chequear(
  "queda una copia intacta del archivo roto",
  fs.readdirSync(DIR).some((f) => f.includes(".roto-")),
  "sin la copia, el próximo guardado pisa los pedidos y no hay vuelta atrás"
);
chequear(
  "el aviso dice dónde recuperarlos (PEDIDO_JSON)",
  errores.some((e) => e.includes("PEDIDO_JSON")),
  "un error que no dice qué hacer obliga a leer el código en medio del problema"
);
chequear("el bot sigue funcionando y no se cae", Array.isArray(leidos));

// Y la red de seguridad de verdad: el pedido se loguea ANTES de tocar el disco.
const logs = [];
const logOriginal = console.log;
console.log = (...a) => logs.push(a.join(" "));
store.saveOrder({ nombre: "Caro", celular: "3003334455", total: 137000, talla: "XL", telefono_chat: "573003334455" });
console.log = logOriginal;
chequear(
  "cada pedido queda en el log como PEDIDO_JSON, recuperable a mano",
  logs.some((l) => l.startsWith("PEDIDO_JSON") && l.includes("Caro"))
);

// ===========================================================================
console.log("\n── A1. Se guarda el anuncio que trajo al cliente ──");
// ===========================================================================

fs.rmSync(DIR, { recursive: true, force: true });

// Payload real del 22-sep (identificador cambiado).
const REFERRAL = {
  source_url: "https://fb.me/bCMk7pKEp",
  source_id: "120249499375070390",
  source_type: "ad",
  headline: "api.whatsapp.com",
  media_type: "image",
};

const CLIENTE = "573009998877";

store.guardarAtribucion(CLIENTE, {
  source_id: REFERRAL.source_id,
  source_url: REFERRAL.source_url,
  source_type: REFERRAL.source_type,
  ctwa_clid: null,
});

const atrib = store.atribucionDe(CLIENTE);
chequear("se guarda el id del anuncio", atrib && atrib.source_id === "120249499375070390");
chequear("se guarda de dónde vino", atrib && atrib.source_url === "https://fb.me/bCMk7pKEp");

// ===========================================================================
console.log("\n── A2. 🔑 El pedido hereda el anuncio aunque llegue MUCHO después ──");
// ===========================================================================

// Esto es el corazón del asunto: el referral llegó en el primer mensaje y el
// pedido se cierra ahora, varios mensajes después y SIN referral encima.
store.pushMsg(CLIENTE, "user", "cuánto vale?");
store.pushMsg(CLIENTE, "assistant", "$77.000 con envío incluido");
store.pushMsg(CLIENTE, "user", "lo quiero, soy de Cali");

const pedido = store.saveOrder({
  nombre: "Diego Ruiz",
  celular: "3009998877",
  ciudad: "Cali",
  direccion: "Calle 5 #10-20",
  talla: "M",
  color: "negro",
  pago: "contraentrega",
  total: 82000,
  telefono_chat: CLIENTE,
});

chequear(
  "el pedido quedó atado al anuncio que trajo al cliente",
  pedido.anuncio_id === "120249499375070390",
  `quedó: ${pedido.anuncio_id}`
);
chequear("el pedido guarda de dónde vino", pedido.anuncio_origen === "https://fb.me/bCMk7pKEp");

// ===========================================================================
console.log("\n── A3. Lo que NO se sabe queda vacío, no inventado ──");
// ===========================================================================

const sinAnuncio = store.saveOrder({
  nombre: "Elena",
  celular: "3005556677",
  total: 78000,
  talla: "S",
  telefono_chat: "573005556677",
});
chequear(
  "un cliente que no vino de un anuncio no recibe atribución inventada",
  sinAnuncio.anuncio_id === undefined,
  `le puso: ${sinAnuncio.anuncio_id}`
);

// ===========================================================================
console.log("\n── A4. Si vuelve por otro anuncio, no se pisa el primero ──");
// ===========================================================================

store.guardarAtribucion(CLIENTE, { source_id: "120249499276420390", source_url: "https://www.instagram.com/p/Ddl/" });
const tras = store.atribucionDe(CLIENTE);
chequear(
  "el primer anuncio (el que se pagó) se conserva",
  tras.source_id === "120249499375070390",
  `quedó: ${tras.source_id}`
);
const conv = JSON.parse(fs.readFileSync(CONV, "utf8"))[CLIENTE];
chequear("el segundo anuncio queda aparte, no se pierde", conv.anuncioUltimo?.source_id === "120249499276420390");

// Un referral sin id no puede ensuciar la atribución.
store.guardarAtribucion("573001234567", { source_url: "https://fb.me/x" });
chequear("un referral sin id no se guarda", store.atribucionDe("573001234567") === null);

// ===========================================================================
console.log("\n── A5. El CSV sale con el anuncio, listo para cruzar con Meta ──");
// ===========================================================================

const csv = resumen.pedidosCSV();
const cabecera = csv.split("\n")[0];
chequear("el CSV tiene la columna anuncio_id", cabecera.includes("anuncio_id"));
chequear("el CSV tiene la columna anuncio_origen", cabecera.includes("anuncio_origen"));
chequear("el anuncio aparece en la fila del pedido", csv.includes("120249499375070390"));

const columnas = cabecera.split(",").length;
const filasMal = csv
  .split("\n")
  .slice(1)
  .filter((f) => f.trim() && f.split('","').length !== columnas);
chequear("todas las filas tienen la misma cantidad de columnas", filasMal.length === 0, `${filasMal.length} filas torcidas`);

// ===========================================================================
console.log("\n── A6. El panel muestra los pedidos por anuncio ──");
// ===========================================================================

const panel = require("./src/panel");
process.env.PANEL_TOKEN = "clave_de_prueba";
const html = panel.render();

chequear("el panel tiene la tabla de pedidos por anuncio", html.includes("Pedidos por anuncio"));
chequear("muestra el anuncio real", html.includes("120249499375070390"));
chequear("agrupa los que no tienen dato en vez de esconderlos", html.includes("(sin dato)"));

// Que el JS del panel siga siendo válido: ya se rompió dos veces por escribir
// comillas invertidas o dólar-llave dentro del template literal.
const script = html.match(/<script>([\s\S]*?)<\/script>/);
let compila = false;
try {
  new Function(script[1]);
  compila = true;
} catch (e) {
  compila = e.message;
}
chequear("el JavaScript del panel compila", compila === true, `error: ${compila}`);

// ===========================================================================
fs.rmSync(DIR, { recursive: true, force: true });


// ===========================================================================
// B3. EL AVISO DEL PANEL TIENE QUE DECIR LA VERDAD, NO SUPONERLA
//
// Antes el aviso verde salía con solo existir la variable DATA_DIR. O sea que
// si el disco no estaba montado, o el Mount Path no coincidía, el panel decía
// "los pedidos se guardan en disco persistente" y se borraban igual.
// Un aviso que dice "todo bien" sin comprobarlo enseña a ignorar los avisos.
// ===========================================================================
console.log("\n── B3. El aviso del panel dice la verdad ──");

// Caso real del dueño: DATA_DIR puesto pero apuntando a una carpeta común
// (esto es lo que pasa si el disco no existe o el Mount Path está mal).
const DIR2 = path.join(__dirname, "data-prueba-carpeta");
fs.rmSync(DIR2, { recursive: true, force: true });

// Se recarga el módulo con el DATA_DIR nuevo: DIR se fija al importar.
delete require.cache[require.resolve("./src/store")];
delete require.cache[require.resolve("./src/panel")];
delete require.cache[require.resolve("./src/resumen")];
process.env.DATA_DIR = DIR2;
const store2 = require("./src/store");
const panel2 = require("./src/panel");

const estado = store2.estadoDelDisco();
chequear(
  "detecta que NO es un disco montado, aunque la variable esté puesta",
  estado.configurado === true && estado.discoAparte === false,
  `configurado=${estado.configurado} discoAparte=${estado.discoAparte}`
);

const html2 = panel2.render();
chequear(
  "el panel AVISA en rojo en vez de decir que todo está bien",
  html2.includes("NO hay un disco montado") && !html2.includes("Disco persistente comprobado"),
  "sigue mostrando el aviso optimista sin haber comprobado nada"
);
chequear(
  "el aviso dice dónde arreglarlo (Mount Path)",
  html2.includes("Mount Path"),
  "un aviso que no dice qué hacer obliga a leer el código en plena emergencia"
);

// ---------------------------------------------------------------------------
// Ahora el caso BUENO: un directorio que SÍ está en otro sistema de archivos,
// igual que el disco de Render. Acá se usa /tmp, que en este equipo es otro
// dispositivo; en producción es /var/data sobre /dev/nvme2n1. La comprobación
// es la misma: el número de dispositivo no coincide con el del código.
// ---------------------------------------------------------------------------
const DIR3 = "/tmp/prueba-disco-bikerpro";
fs.rmSync(DIR3, { recursive: true, force: true });

delete require.cache[require.resolve("./src/store")];
delete require.cache[require.resolve("./src/panel")];
delete require.cache[require.resolve("./src/resumen")];
process.env.DATA_DIR = DIR3;
const store3 = require("./src/store");
const panel3 = require("./src/panel");

const bueno = store3.estadoDelDisco();
chequear("reconoce un disco montado de verdad", bueno.discoAparte === true, `discoAparte=${bueno.discoAparte}`);

// El contador de arranques es la evidencia directa de que los datos aguantan.
store3.registrarArranque();
store3.registrarArranque();
const tras3 = store3.estadoDelDisco();
chequear("cuenta los arranques que sobrevivieron los datos", tras3.arranques === 2, `van ${tras3.arranques}`);
chequear("guarda desde cuándo existen los datos", Boolean(tras3.desde));

const html3 = panel3.render();
chequear(
  "con el disco comprobado, el panel lo dice como prueba y no como suposición",
  html3.includes("Disco persistente comprobado") && html3.includes("2 arranques"),
  "no está mostrando la evidencia que ya tiene"
);

fs.rmSync(DIR3, { recursive: true, force: true });

// Sin DATA_DIR: el aviso naranja de siempre, que sigue siendo correcto.
delete require.cache[require.resolve("./src/store")];
delete require.cache[require.resolve("./src/panel")];
delete require.cache[require.resolve("./src/resumen")];
delete process.env.DATA_DIR;
const panel4 = require("./src/panel");
const html4 = panel4.render();
chequear(
  "sin DATA_DIR sigue avisando que los datos se borran",
  html4.includes("DATA_DIR no está configurado"),
  "se perdió el aviso para el caso sin configurar"
);

fs.rmSync(DIR2, { recursive: true, force: true });
fs.rmSync(path.join(__dirname, "data"), { recursive: true, force: true });

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos (con el aviso del disco).\n`);
process.exit(mal === 0 ? 0 : 1);
