/**
 * SUBIR EL PDF DE UNA GUÍA: SI FALLA, LA PANTALLA TIENE QUE DECIR POR QUÉ.
 *
 * 🔴 EL CASO REAL (3-oct). El dueño: *"estaba cargando las guías de los pedidos
 * y todas cargaron sin problema pero una que no cargó es la de esta persona y no
 * sé por qué me sale este error"*. En la pantalla, entero:
 *
 *     🔴 el servidor respondió 400.
 *
 * Nada más. Ni qué pasó, ni qué hacer. Las otras guías habían cargado bien, así
 * que no había ni por dónde empezar.
 *
 * DOS FALLOS, Y EL PRIMERO ES EL QUE CIEGA:
 *
 * 1. EL PANEL SE COMÍA EL MOTIVO. Los cuatro fetch hacían
 *    `if (!r.ok) throw new Error("el servidor respondió " + r.status)`, tirando
 *    el error ANTES de leer el cuerpo. Y el servidor SÍ manda el motivo, siempre,
 *    en {ok:false,error:"..."} — cada 400 de /guias/revisar trae una frase escrita
 *    para que el dueño sepa qué hacer. Todas se descartaban.
 *
 *    Peor: hacía que dos problemas OPUESTOS se vieran idénticos. "No es un PDF"
 *    y "la subida se cortó" dan los dos 400, y uno se arregla reintentando.
 *
 * 2. SE EXIGÍA `%PDF-` EN EL BYTE 0, EXACTO. Los lectores de PDF aceptan la
 *    cabecera dentro del primer kilobyte, justamente porque es común que queden
 *    bytes de preámbulo cuando el archivo se descarga, se reenvía por WhatsApp o
 *    lo vuelve a guardar una app del celular. O sea que el archivo se abría bien
 *    en el visor —por eso el dueño no entendía nada— y acá se rechazaba.
 *
 * Esta batería levanta el servidor DE VERDAD y le sube PDFs, porque los dos
 * fallos viven en el borde entre el navegador y el endpoint: el parser de PDF
 * ya tenía pruebas y pasaban.
 *
 *   node test-guias-400-con-motivo.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "guias-400-"));
const TOKEN = "clave-de-prueba";
const PUERTO = 3000 + Math.floor(Math.random() * 1000);

process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = TOKEN;
process.env.PORT = String(PUERTO);
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba";
delete process.env.OWNER_PHONE;
// ⚠️ Credenciales FALSAS pero presentes: sin ellas sendPayload corta antes de
// llamar a Meta. Acá no se envía ninguna guía, pero el módulo las quiere al cargar.
process.env.WHATSAPP_TOKEN = "token-falso-de-prueba";
process.env.WHATSAPP_PHONE_NUMBER_ID = "000000000000000";

// ⚠️ realFetch se captura ANTES de tocar global.fetch (trampa conocida del arnés).
const realFetch = global.fetch;

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

// La guía y la clienta del caso real.
const GUIA = "240062298816";

/** Un PDF de una sola etiqueta, como el que descarga de 99 Envíos. */
async function pdfDeUnaGuia() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([420, 595]);
  const lineas = [
    "INTERRAPIDISIMO",
    `GUIA No: ${GUIA}`,
    "DESTINATARIO: MILDONIA DURANGO",
    "DIRECCION: CALLE 14 # 7 - 22",
    "CIUDAD: MONTERIA / CORDOBA",
    "TEL: 3013779312",
    "CONTRAENTREGA: $85.000",
  ];
  let y = 550;
  for (const l of lineas) {
    page.drawText(l, { x: 20, y, size: 9, font });
    y -= 16;
  }
  return Buffer.from(await doc.save());
}

const base = `http://127.0.0.1:${PUERTO}`;

/** Sube un cuerpo crudo a /guias/revisar y devuelve status + cuerpo leído. */
async function subir(cuerpo, tipo) {
  const r = await realFetch(`${base}/guias/revisar?token=${TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": tipo || "application/pdf" },
    body: cuerpo,
  });
  const texto = await r.text();
  let json = null;
  try {
    json = JSON.parse(texto);
  } catch {
    json = null;
  }
  return { status: r.status, json, texto };
}

(async () => {
  // Un pedido guardado que corresponde a la etiqueta, para que el pareo tenga
  // contra qué comparar (sin pedidos, /guias/revisar devuelve otro 400 distinto).
  store.saveOrder({
    nombre: "Mildonia Durango",
    celular: "3013779312",
    telefono_chat: "573013779312",
    ciudad: "Montería",
    direccion: "Calle 14 # 7 - 22",
    talla: "L",
    color: "Negro",
    unidades: 1,
    total: 85000,
    pago: "contraentrega",
  });

  require("./src/server");
  await new Promise((r) => setTimeout(r, 400));

  const pdf = await pdfDeUnaGuia();
  console.log(`\nPDF de prueba: ${pdf.length} bytes, 1 etiqueta (guía ${GUIA})`);

  // =========================================================================
  console.log("\n── 1. El PDF normal sigue cargando (que no se rompa lo que andaba) ──");
  // =========================================================================
  {
    const r = await subir(pdf);
    chequear("responde 200", r.status === 200, `status ${r.status} · ${r.texto.slice(0, 160)}`);
    chequear("y trae la fila de la guía", Boolean(r.json && r.json.filas && r.json.filas.length === 1), JSON.stringify(r.json && r.json.filas));
    chequear(
      "  pareada con la clienta correcta y con certeza alta",
      Boolean(
        r.json &&
          r.json.filas[0].pedido &&
          /Mildonia/i.test(r.json.filas[0].pedido.nombre) &&
          r.json.filas[0].enviar === true
      ),
      JSON.stringify(r.json && r.json.filas[0])
    );
  }

  // =========================================================================
  console.log("\n── 2. 🔑 Un PDF con basura antes de la cabecera YA NO se rechaza ──");
  //
  // Es el caso más probable del reporte: el archivo abre bien en el celular pero
  // tiene bytes de preámbulo. Los lectores aceptan %PDF- dentro del primer
  // kilobyte; este endpoint lo exigía en el byte 0.
  // =========================================================================
  {
    const conBasura = Buffer.concat([Buffer.from("\r\n\r\n", "latin1"), pdf]);
    const r = await subir(conBasura);
    chequear(
      "🔑 con 4 bytes de basura adelante, se recorta y se procesa igual",
      r.status === 200,
      `status ${r.status} · ${r.texto.slice(0, 200)}`
    );
    chequear(
      "  y encuentra la misma guía",
      Boolean(r.json && r.json.filas && r.json.filas[0] && r.json.filas[0].guia === GUIA),
      JSON.stringify(r.json && r.json.filas && r.json.filas[0])
    );
  }

  {
    // Un preámbulo más realista: cabecera HTTP o basura de un proxy.
    const conPreambulo = Buffer.concat([
      Buffer.from("HTTP/1.1 200 OK\r\nContent-Type: application/pdf\r\n\r\n", "latin1"),
      pdf,
    ]);
    const r = await subir(conPreambulo);
    chequear(
      "también con un preámbulo largo (sigue dentro del primer kilobyte)",
      r.status === 200,
      `status ${r.status} · ${r.texto.slice(0, 200)}`
    );
  }

  // =========================================================================
  console.log("\n── 3. Lo que de verdad NO es un PDF se rechaza, pero DICIENDO qué llegó ──");
  // =========================================================================
  {
    const r = await subir(Buffer.from("esto es un archivo de texto, no una guia", "latin1"));
    chequear("responde 400", r.status === 400, `status ${r.status}`);
    chequear("el motivo viene en JSON, no en HTML", Boolean(r.json && r.json.error), r.texto.slice(0, 120));
    chequear(
      "🔑 dice CUÁNTOS BYTES llegaron (así se ve si la subida se cortó)",
      Boolean(r.json && /\d+ bytes/.test(r.json.error)),
      r.json && r.json.error
    );
    chequear(
      "🔑 y muestra los primeros bytes, para saber qué se subió de verdad",
      Boolean(r.json && /esto es un archivo/.test(r.json.error)),
      r.json && r.json.error
    );
    chequear(
      "  y sugiere reintentar, que es el arreglo si fue la conexión",
      Boolean(r.json && /volv[ée] a intentar/i.test(r.json.error)),
      r.json && r.json.error
    );
  }

  {
    // ⛔ Un PDF cuya cabecera está MÁS ALLÁ del primer kilobyte no se acepta: a
    // esa altura ya no es un preámbulo, es otra cosa con un PDF adentro.
    const lejos = Buffer.concat([Buffer.alloc(2000, 0x41), pdf]);
    const r = await subir(lejos);
    chequear(
      "⛔ si la cabecera está más allá del primer kilobyte, se rechaza",
      r.status === 400 && Boolean(r.json && r.json.error),
      `status ${r.status} · ${r.texto.slice(0, 120)}`
    );
  }

  {
    const r = await subir(Buffer.alloc(0));
    chequear(
      "un cuerpo vacío dice que no llegó el archivo",
      r.status === 400 && Boolean(r.json && /No lleg/i.test(r.json.error)),
      `status ${r.status} · ${r.texto.slice(0, 120)}`
    );
  }

  {
    // Si el Content-Type no es application/pdf, express.raw() no parsea y el
    // cuerpo queda vacío. Tiene que decirlo, no reventar.
    const r = await subir(pdf, "application/octet-stream");
    chequear(
      "con el Content-Type equivocado avisa en vez de reventar",
      r.status === 400 && Boolean(r.json && r.json.error),
      `status ${r.status} · ${r.texto.slice(0, 120)}`
    );
  }

  // =========================================================================
  console.log("\n── 4. 🔑 Los errores que NO tira nuestro código también salen en JSON ──");
  //
  // Antes Express los respondía con una PÁGINA HTML. El panel intenta leer el
  // motivo, no lo encuentra, y lo único que puede mostrar es el número. Así una
  // subida cortada y un archivo inválido se ven IGUAL en la pantalla.
  // =========================================================================
  {
    const r = await realFetch(`${base}/novedades/revisar?token=${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{esto no es json valido",
    });
    const texto = await r.text();
    let json = null;
    try {
      json = JSON.parse(texto);
    } catch {
      json = null;
    }
    chequear(
      "🔑 un JSON inválido devuelve JSON con motivo, no una página HTML",
      Boolean(json && json.error),
      `status ${r.status} · ${texto.slice(0, 160)}`
    );
    chequear(
      "  y el motivo está en castellano, no en inglés de la librería",
      Boolean(json && /no se pudo leer|JSON/i.test(json.error)) && !/Unexpected token/i.test(String(json && json.error)),
      json && json.error
    );
  }

  // =========================================================================
  console.log("\n── 5. El navegador LEE el motivo en vez de tirar el código pelado ──");
  //
  // Esto es la reproducción del síntoma: se ejecuta leerRespuesta() del panel
  // igual que corre en el celular del dueño.
  // =========================================================================
  {
    const panelGuias = require("./src/panel-guias");
    const script = panelGuias.render({}).match(/<script>([\s\S]*?)<\/script>/)[1];

    // Un DOM mínimo: el script se engancha a elementos al cargar.
    function nodo() {
      return {
        value: "",
        checked: false,
        disabled: false,
        className: "",
        textContent: "",
        innerHTML: "",
        style: {},
        files: [],
        addEventListener() {},
        getAttribute: () => null,
        appendChild(h) {
          return h;
        },
        querySelectorAll: () => [],
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
      JSON,
      Number,
      Object,
      Error,
      Boolean,
      String,
      encodeURIComponent,
      confirm: () => true,
      fetch: () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) }),
    };
    vm.createContext(contexto);
    vm.runInContext(script, contexto);

    const leer = contexto.leerRespuesta;
    chequear("leerRespuesta existe en el panel", typeof leer === "function");

    /** Una respuesta de mentira, como la que devuelve fetch. */
    function respuesta(status, cuerpo) {
      return {
        ok: status >= 200 && status < 300,
        status,
        text: () => Promise.resolve(cuerpo),
        json: () => Promise.resolve(JSON.parse(cuerpo)),
      };
    }

    /** Corre leerRespuesta y devuelve el mensaje del error, o null si pasó. */
    async function motivoDe(status, cuerpo) {
      try {
        await leer(respuesta(status, cuerpo));
        return null;
      } catch (e) {
        return e.message;
      }
    }

    const elMotivoDelServidor =
      "Ese archivo no parece un PDF: llegaron 318 bytes y no encontré la cabecera";
    chequear(
      "🔑 con un 400 y JSON, muestra el motivo DEL SERVIDOR (antes: «respondió 400.»)",
      (await motivoDe(400, JSON.stringify({ ok: false, error: elMotivoDelServidor }))) === elMotivoDelServidor,
      await motivoDe(400, JSON.stringify({ ok: false, error: elMotivoDelServidor }))
    );

    const conHtml = await motivoDe(400, "<!DOCTYPE html><html><body>Bad Request</body></html>");
    chequear(
      "🔑 con un 400 que vino como HTML, dice que la subida no llegó completa",
      /no lleg[óo] completa/i.test(String(conHtml)) && /conexi[óo]n/i.test(String(conHtml)),
      conHtml
    );
    chequear(
      "  y NO se queda en «el servidor respondió 400.»",
      !/respondi[óo] 400/.test(String(conHtml)),
      conHtml
    );

    const grande = await motivoDe(413, "<html>Payload Too Large</html>");
    chequear(
      "un 413 habla del tope de 40 MB",
      /40 MB/.test(String(grande)),
      grande
    );

    const reiniciando = await motivoDe(502, "<html>Bad Gateway</html>");
    chequear(
      "un 502 dice que el bot se está reiniciando (pasa al desplegar)",
      /reiniciando/i.test(String(reiniciando)),
      reiniciando
    );

    const clave = await motivoDe(403, "Forbidden");
    chequear(
      "un 403 sigue hablando de la clave del panel, no del PDF",
      /clave del panel/i.test(String(clave)),
      clave
    );

    const bien = await leer(respuesta(200, JSON.stringify({ ok: true, filas: [1, 2] })));
    chequear(
      "y una respuesta buena devuelve el JSON parseado, como antes",
      Boolean(bien && bien.ok === true && bien.filas.length === 2),
      JSON.stringify(bien)
    );
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
