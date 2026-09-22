// ============================================================================
// PRUEBAS: CLIENTES SIN TELÉFONO (username de WhatsApp / BSUID)
//   node test-clientes-con-username.js
//
// Reproduce el fallo REAL del 22-sep 17:11, en el que un cliente que venía de un
// anuncio no recibió ninguna respuesta:
//
//   17:11:24  entrante-sin-remitente  "¡Hola! Quiero más información."
//   17:11:26  envio-rechazado  400  "The parameter to is required."  code 100
//
// La ESTRUCTURA del payload es la que mandó Meta de verdad. Los datos están
// cambiados: el nombre, el username y el BSUID eran de un cliente real y este
// repositorio es público.
//
// Corre sin credenciales de WhatsApp y sin clave de IA.
// ============================================================================

const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "data-prueba-username");
fs.rmSync(DATA, { recursive: true, force: true });
fs.mkdirSync(DATA, { recursive: true });
fs.writeFileSync(path.join(DATA, "conversations.json"), "{}");
fs.writeFileSync(path.join(DATA, "orders.json"), "[]");

process.env.DATA_DIR = DATA;
process.env.WHATSAPP_VERIFY_TOKEN = "prueba_token";
process.env.BOT_WHATSAPP = "573227545695";
process.env.PORT = "3998";
delete process.env.WHATSAPP_TOKEN;

const BSUID = "CO.9999999999999999";
const TELEFONO = "573001112233";

// Estructura idéntica a la que manda Meta para un cliente con username:
// NO hay `from` ni `wa_id`. Hay `from_user_id` y `contacts[].user_id`.
const PAYLOAD_SIN_TELEFONO = {
  object: "whatsapp_business_account",
  entry: [{
    id: "2213159576112051",
    changes: [{
      field: "messages",
      value: {
        messaging_product: "whatsapp",
        metadata: { display_phone_number: "573227545695", phone_number_id: "111122223333444" },
        contacts: [{ profile: { name: "Cliente De Prueba", username: "clienteprueba" }, user_id: BSUID }],
        messages: [{
          from_user_id: BSUID,
          id: "wamid.PRUEBA==",
          timestamp: String(Math.floor(Date.now() / 1000)),
          text: { body: "¡Hola! Quiero más información." },
          type: "text",
        }],
      },
    }],
  }],
};

// El caso normal, con teléfono, para confirmar que no se rompió nada.
const PAYLOAD_CON_TELEFONO = {
  object: "whatsapp_business_account",
  entry: [{
    id: "2213159576112051",
    changes: [{
      field: "messages",
      value: {
        messaging_product: "whatsapp",
        metadata: { display_phone_number: "573227545695", phone_number_id: "111122223333444" },
        contacts: [{ profile: { name: "Cliente Con Numero" }, wa_id: TELEFONO }],
        messages: [{
          from: TELEFONO, id: "wamid.PRUEBA2==",
          timestamp: String(Math.floor(Date.now() / 1000)),
          text: { body: "Para Cali" }, type: "text",
        }],
      },
    }],
  }],
};

const BASE = "http://127.0.0.1:3998";
const TK = "prueba_token";
let fallas = 0;
const check = (cond, msg) => { console.log(`${cond ? "✅" : "🔴"} ${msg}`); if (!cond) fallas++; };

(async () => {
  const wa = require("./src/whatsapp");
  const guias = require("./src/guias");

  console.log("── 1. Reconocer el identificador ──");
  check(wa.esBsuid(BSUID), `"${BSUID}" se reconoce como cliente sin teléfono`);
  check(!wa.esBsuid(TELEFONO), `"${TELEFONO}" NO se confunde con un BSUID`);
  check(!wa.esBsuid("1098944123092301"), "un número largo suelto no se toma por BSUID");

  console.log("\n── 2. A quién se le manda ──");
  const dBsuid = wa.destinatario(BSUID);
  check(dBsuid.recipient === BSUID && !dBsuid.to,
    `cliente con username → va en 'recipient' (${JSON.stringify(dBsuid)})`);
  const dTel = wa.destinatario("+57 300 111 2233");
  check(dTel.to === "573001112233" && !dTel.recipient,
    `teléfono → va en 'to' y limpio (${JSON.stringify(dTel)})`);

  console.log("\n── 3. Las guías no le inventan un teléfono ──");
  const pedidoBsuid = { nombre: "X", telefono_chat: BSUID, celular: "3001112233" };
  check(guias.destinoDe(pedidoBsuid) === BSUID,
    `la guía se manda al BSUID, no a "${BSUID.replace(/\D/g, "")}" (que sería un número falso)`);
  const pedidoTel = { nombre: "Y", telefono_chat: TELEFONO, celular: "3009998888" };
  check(guias.destinoDe(pedidoTel) === TELEFONO, "con teléfono sigue igual que antes");

  console.log("\n── 4. El webhook completo ──");
  require("./src/server");
  await new Promise((r) => setTimeout(r, 1200));

  for (const p of [PAYLOAD_SIN_TELEFONO, PAYLOAD_CON_TELEFONO]) {
    await fetch(`${BASE}/webhook`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p),
    });
  }
  await new Promise((r) => setTimeout(r, 2500)); // que termine de procesar

  const ev = await (await fetch(`${BASE}/eventos?token=${TK}`)).json();
  const sinRemitente = ev.eventos.filter((e) => e.tipo === "entrante-sin-remitente");
  const entrantes = ev.eventos.filter((e) => e.tipo === "entrante");

  check(sinRemitente.length === 0,
    `🔑 YA NO se registra "entrante-sin-remitente" (eran ${sinRemitente.length})`);
  check(entrantes.length === 2, `los DOS mensajes se reconocieron (fueron ${entrantes.length})`);

  const elSinTel = entrantes.find((e) => e.de === BSUID);
  check(Boolean(elSinTel), "el cliente con username quedó identificado por su BSUID");
  check(elSinTel?.sinTelefono === true, "queda marcado como cliente sin teléfono");
  check(elSinTel?.username === "clienteprueba", `se guardó el username (${elSinTel?.username})`);

  console.log("\n── 5. Quedó guardado con nombre, no como un código ──");
  const convs = JSON.parse(fs.readFileSync(path.join(DATA, "conversations.json"), "utf8"));
  check(Boolean(convs[BSUID]), "la conversación se guardó bajo el BSUID");
  check(convs[BSUID]?.perfil?.nombre === "Cliente De Prueba",
    `con el nombre del perfil: "${convs[BSUID]?.perfil?.nombre}"`);

  console.log("\n── 6. El panel lo muestra de forma humana ──");
  const panel = require("./src/panel");
  const html = panel.render("");
  check(html.includes("Cliente De Prueba"), "el panel muestra el nombre del cliente");
  check(html.includes("@clienteprueba"), "y su @username");
  check(!html.includes("+" + BSUID), `el panel NO muestra "+${BSUID}"`);
  check(html.includes("sin teléfono"), "y avisa que no tiene teléfono (hace falta para despachar)");
  check(html.includes(BSUID), "pero el BSUID sigue en el formulario para poder responderle");

  fs.rmSync(DATA, { recursive: true, force: true });
  const total = 19;
  console.log(fallas ? `\n🔴 ${fallas} de ${total} falla(s).` : `\n🟢 ${total}/${total} correctos.`);
  process.exit(fallas ? 1 : 0);
})().catch((e) => { console.error("🔴", e); process.exit(1); });
