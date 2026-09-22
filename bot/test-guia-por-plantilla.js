/**
 * LA GUÍA TIENE QUE LLEGAR AUNQUE EL CLIENTE NO HAYA ESCRITO HOY.
 *
 * EL PROBLEMA: una guía se despacha al día siguiente del pedido. A esa altura
 * la ventana de 24h de WhatsApp ya está cerrada para la mayoría, y un documento
 * como mensaje libre NO pasa: Meta lo rechaza con 131047. El cliente se queda
 * sin su guía y el dueño creyendo que la mandó.
 *
 * La solución es mandar el PDF DENTRO de la plantilla aprobada (guia_de_envio),
 * que lo lleva en el encabezado. Acá se verifica que el payload que se le manda
 * a Meta sea exactamente el que esa plantilla espera, sin tocar la red.
 *
 *   node test-guia-por-plantilla.js      (sin credenciales ni red)
 */

process.env.WHATSAPP_TOKEN = "token-de-prueba";
process.env.WHATSAPP_PHONE_NUMBER_ID = "1234567890";

const llamadas = [];
const fetchOriginal = global.fetch;
global.fetch = async (url, opciones) => {
  llamadas.push({ url: String(url), opciones });
  // La subida del archivo devuelve un media id; el envío, un mensaje.
  if (String(url).includes("/media")) {
    return { ok: true, status: 200, json: async () => ({ id: "MEDIA-999" }) };
  }
  return { ok: true, status: 200, json: async () => ({ messages: [{ id: "wamid.PRUEBA" }] }) };
};

const wa = require("./src/whatsapp");

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

(async () => {
  console.log("\n── 1. El PDF viaja dentro de la plantilla ──");

  const r = await wa.sendPdfPorPlantilla(
    "573001112233",
    Buffer.from("%PDF-1.4 falso"),
    "guia-240012345678.pdf",
    "guia_de_envio",
    "es_CO"
  );

  chequear("el envío sale bien", r.ok === true, JSON.stringify(r).slice(0, 200));
  chequear("queda marcado que fue por plantilla", r.porPlantilla === true);
  chequear("primero sube el archivo y después envía", llamadas.length === 2, `hizo ${llamadas.length} llamadas`);
  chequear("la primera llamada es la subida del archivo", llamadas[0].url.includes("/media"));

  const cuerpo = JSON.parse(llamadas[1].opciones.body);

  console.log("\n── 2. El payload es el que espera esa plantilla ──");

  chequear("va como tipo plantilla", cuerpo.type === "template");
  chequear("con el nombre correcto", cuerpo.template.name === "guia_de_envio");
  chequear(
    "🔑 y en es_CO, NO en es",
    cuerpo.template.language.code === "es_CO",
    `mandó "${cuerpo.template.language.code}" — con "es" Meta rechaza el envío aunque la plantilla esté aprobada`
  );

  const header = (cuerpo.template.components || []).find((c) => c.type === "header");
  chequear("lleva un componente de encabezado", Boolean(header));
  chequear("el encabezado es un documento", header.parameters[0].type === "document");
  chequear(
    "y apunta al archivo que se acabó de subir",
    header.parameters[0].document.id === "MEDIA-999",
    JSON.stringify(header.parameters[0])
  );
  chequear(
    "con nombre de archivo, para que el cliente vea de qué es",
    header.parameters[0].document.filename === "guia-240012345678.pdf"
  );
  chequear("va al cliente correcto", cuerpo.to === "573001112233");

  console.log("\n── 3. Si la subida falla, NO se manda nada ──");
  // Distinguir las dos etapas importa: "no se pudo subir" es token o tamaño,
  // "no se pudo enviar" es la plantilla o la ventana. Son arreglos distintos.
  llamadas.length = 0;
  global.fetch = async (url) => {
    llamadas.push({ url: String(url) });
    return { ok: false, status: 400, json: async () => ({ error: { message: "archivo muy grande" } }) };
  };

  const r2 = await wa.sendPdfPorPlantilla("573001112233", Buffer.from("x"), "g.pdf", "guia_de_envio", "es_CO");
  chequear("reporta que falló", r2.ok === false);
  chequear("y dice que falló EN LA SUBIDA, no en el envío", r2.etapa === "subida", `dijo: ${r2.etapa}`);
  chequear("no intentó enviar el mensaje", llamadas.length === 1, `hizo ${llamadas.length} llamadas`);

  global.fetch = fetchOriginal;
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
