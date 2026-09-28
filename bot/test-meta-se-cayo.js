/**
 * CUANDO EL QUE FALLA ES META, NO NOSOTROS.
 *
 * 🔴 DE DÓNDE SALE (28-sep). El dueño mandó 24 guías. 23 salieron y una quedó en
 * rojo con "(#2) Service temporarily unavailable" — Alejandra. Ese error no tiene
 * nada que ver con el cliente ni con sus datos: es Meta que se cayó medio
 * segundo y el mensaje NO se procesó.
 *
 * Y no había NINGÚN reintento. Un hipo de red dejaba a una clienta sin su guía,
 * y encima el pareo se borraba al enviar, así que para mandarle esa sola guía
 * había que volver a subir el PDF completo.
 *
 * Una guía que no llega termina en devolución, y una devolución cuesta $17.384.
 *
 *   node test-meta-se-cayo.js      (sin credenciales ni IA)
 */

const fs = require("fs");

const DIR = "/tmp/prueba-meta-se-cayo";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
// Hacen falta para que sendPayload no corte antes de llamar a la API.
process.env.WHATSAPP_TOKEN = "token_de_prueba";
process.env.WHATSAPP_PHONE_NUMBER_ID = "123456";

const whatsapp = require("./src/whatsapp");

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

// ===========================================================================
console.log("\n── 1. Qué se reintenta y qué no ──");
// Reintentar lo que NO se va a arreglar solo gasta llamadas y esconde el motivo
// real. Reintentar lo temporal salva la entrega. La lista importa.
// ===========================================================================

const CASOS = [
  ["(#2) Service temporarily unavailable ← el de Alejandra", 500, { error: { code: 2 } }, true],
  ["131000 · algo salió mal del lado de Meta", 500, { error: { code: 131000 } }, true],
  ["4 · demasiadas llamadas", 400, { error: { code: 4 } }, true],
  ["80007 · límite de velocidad", 400, { error: { code: 80007 } }, true],
  ["130429 · límite de la Cloud API", 400, { error: { code: 130429 } }, true],
  ["131056 · muchos mensajes al mismo par", 400, { error: { code: 131056 } }, true],
  ["HTTP 503 · servidor caído", 503, {}, true],
  ["HTTP 500", 500, {}, true],
  ["HTTP 429", 429, {}, true],
  ["excepción de red nuestra (status 0)", 0, {}, true],
  ["131047 · pasaron las 24h ← NO se reintenta", 400, { error: { code: 131047 } }, false],
  ["100 · un parámetro está mal ← NO", 400, { error: { code: 100 } }, false],
  ["132001 · la plantilla no existe ← NO", 400, { error: { code: 132001 } }, false],
  ["190 · el token venció ← NO", 401, { error: { code: 190 } }, false],
  ["470 · ventana cerrada ← NO", 400, { error: { code: 470 } }, false],
];

for (const [nombre, status, body, esperado] of CASOS) {
  chequear(
    (esperado ? "reintenta: " : "no reintenta: ") + nombre,
    whatsapp.esTemporal(status, body) === esperado,
    `esTemporal dio ${whatsapp.esTemporal(status, body)}`
  );
}

// ===========================================================================
console.log("\n── 2. El reintento de verdad, contra una Meta que se cae ──");
// Se reemplaza fetch para simular exactamente lo que pasó: Meta responde el
// error 2 y después se recupera.
// ===========================================================================

const fetchDeVerdad = global.fetch;

/** Simula la API de Meta. `guion` dice qué contesta en cada llamada. */
function metaFalsa(guion) {
  const llamadas = [];
  global.fetch = async (url, opciones) => {
    const i = llamadas.length;
    llamadas.push({ url: String(url), cuerpo: opciones && opciones.body });
    const paso = guion[Math.min(i, guion.length - 1)];
    if (paso === "explota") throw new Error("socket colgado");
    if (paso === "cae") {
      return {
        ok: false,
        status: 500,
        json: async () => ({ error: { code: 2, message: "Service temporarily unavailable" } }),
      };
    }
    if (paso === "ventana") {
      return { ok: false, status: 400, json: async () => ({ error: { code: 131047, message: "closed window" } }) };
    }
    return { ok: true, status: 200, json: async () => ({ messages: [{ id: "wamid.OK" }] }) };
  };
  return llamadas;
}

(async () => {
  {
    // Cae una vez y a la segunda anda. Es el caso de Alejandra.
    const llamadas = metaFalsa(["cae", "bien"]);
    const r = await whatsapp.sendText("573001112222", "hola");
    chequear("🔑 cae una vez y el reintento lo salva", r.ok === true, JSON.stringify(r.body));
    chequear("  hizo 2 llamadas: la que falló y la que salió", llamadas.length === 2, `hizo ${llamadas.length}`);
    chequear("  y deja anotado que hubo 1 reintento", r.reintentos === 1, String(r.reintentos));
  }

  {
    // Cae dos veces y a la tercera anda.
    const llamadas = metaFalsa(["cae", "cae", "bien"]);
    const r = await whatsapp.sendText("573001112222", "hola");
    chequear("cae dos veces y a la tercera sale", r.ok === true && r.reintentos === 2, JSON.stringify(r));
    chequear("  hizo 3 llamadas en total", llamadas.length === 3, `hizo ${llamadas.length}`);
  }

  {
    // Meta caída todo el rato: se rinde, pero avisa que fue temporal.
    const llamadas = metaFalsa(["cae"]);
    const r = await whatsapp.sendText("573001112222", "hola");
    chequear("si Meta no se recupera, se rinde", r.ok === false);
    chequear("  y NO insiste para siempre: 3 llamadas y para", llamadas.length === 3, `hizo ${llamadas.length}`);
    chequear(
      "🔑 pero marca que fue temporal, para poder ofrecer reintentar",
      r.temporal === true,
      JSON.stringify(r)
    );
  }

  {
    // ⛔ Lo que NO es temporal no se reintenta: insistir gasta llamadas y
    // esconde el motivo real, que el dueño necesita ver.
    const llamadas = metaFalsa(["ventana"]);
    const r = await whatsapp.sendText("573001112222", "hola");
    chequear("⛔ la ventana de 24h cerrada NO se reintenta", r.ok === false && llamadas.length === 1, `hizo ${llamadas.length}`);
    chequear("  y no se marca como temporal", !r.temporal, JSON.stringify(r));
  }

  {
    // Una excepción de red también se reintenta: no llegó a Meta.
    const llamadas = metaFalsa(["explota", "bien"]);
    const r = await whatsapp.sendText("573001112222", "hola");
    chequear("una excepción de red se reintenta", r.ok === true, JSON.stringify(r));
    chequear("  hizo 2 llamadas", llamadas.length === 2, `hizo ${llamadas.length}`);
  }

  // =========================================================================
  console.log("\n── 3. La subida del PDF también se reintenta ──");
  // Una guía tiene que subir el archivo ANTES de mandarlo, así que un hipo acá
  // deja al cliente sin su guía igual que un hipo en el envío.
  // =========================================================================

  {
    const llamadas = metaFalsa(["cae", "bien"]);
    // uploadMedia espera body.id, no messages
    global.fetch = async (url, opciones) => {
      const i = llamadas.length;
      llamadas.push({ url: String(url) });
      if (i === 0) {
        return { ok: false, status: 500, json: async () => ({ error: { code: 2, message: "Service temporarily unavailable" } }) };
      }
      return { ok: true, status: 200, json: async () => ({ id: "media-123" }) };
    };
    const r = await whatsapp.uploadMedia(Buffer.from("%PDF-1.4 falso"), "application/pdf", "guia.pdf");
    chequear("🔑 la subida del PDF se reintenta y sale", r.ok === true && r.mediaId === "media-123", JSON.stringify(r));
    chequear("  hizo 2 llamadas", llamadas.length === 2, `hizo ${llamadas.length}`);
  }

  {
    // ⛔ Un token vencido en la subida no se reintenta.
    const llamadas = [];
    global.fetch = async (url) => {
      llamadas.push(String(url));
      return { ok: false, status: 401, json: async () => ({ error: { code: 190, message: "token expired" } }) };
    };
    const r = await whatsapp.uploadMedia(Buffer.from("x"), "application/pdf", "g.pdf");
    chequear("⛔ un token vencido en la subida NO se reintenta", r.ok === false && llamadas.length === 1, `hizo ${llamadas.length}`);
  }

  // =========================================================================
  console.log("\n── 4. El mensaje que ve el dueño ──");
  // "(#2) Service temporarily unavailable" en inglés no dice lo único que
  // importa: que no es culpa del cliente y que se puede reintentar.
  // =========================================================================

  const panelGuias = require("./src/panel-guias");
  const html = panelGuias.render();
  chequear("la pantalla trae el botón de reintentar", /btnReintentar/.test(html));
  chequear(
    "🔑 y dice que NO hace falta subir el PDF de nuevo",
    /No hace falta subir el PDF de nuevo/.test(html),
    ""
  );
  chequear(
    "🔑 y explica que Meta se cayó, no los datos del cliente",
    /Meta se cayó un momento, no por los datos del cliente/.test(html),
    ""
  );

  global.fetch = fetchDeVerdad;
  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
