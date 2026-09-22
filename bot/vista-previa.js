// Levanta el panel con datos de mentira para revisar el DISEÑO en el navegador.
// No toca nada real: escribe en /tmp y no se despliega.
//   PANEL_TOKEN=vista DATA_DIR=/tmp/vista PORT=3993 node vista-previa.js
const store = require("./src/store");

store.guardarAtribucion("573001234567", {
  source_id: "120249499375070390",
  source_url: "https://fb.me/bCMk7pKEp",
  source_type: "ad",
});

store.saveOrder({
  nombre: "Jhon Alexander Rodriguez",
  celular: "3001234567",
  ciudad: "Monteria",
  direccion: "Calle 41 #12-55 Barrio La Granja",
  talla: "L",
  color: "negro",
  pago: "contraentrega",
  total: 140000,
  telefono_chat: "573001234567",
});
store.saveOrder({
  nombre: "Maria Fernanda Lopez",
  celular: "3109876543",
  ciudad: "Bogota",
  direccion: "Cra 7 #80-22 Apto 501",
  talla: "M",
  color: "rojo",
  pago: "contraentrega",
  total: 73000,
  telefono_chat: "573109876543",
});

store.pushMsg("573001234567", "user", "Hola! Quiero mas informacion.");
store.pushMsg(
  "573001234567",
  "assistant",
  "Hola! Con gusto 🏍️ El conjunto impermeable de 4 piezas te llega a Monteria en $83.000 al recibir, todo incluido. ¿Que talla usas?"
);
store.pushMsg("573001234567", "user", "Y si llevo dos cuanto me sale?");
store.pushMsg(
  "573001234567",
  "assistant",
  "Llevando dos te quedan en $140.000 los dos: los 2 conjuntos $103.000 + envio $37.000 📦 Te ahorras $26.000 contra comprarlos por separado."
);

store.pushMsg("573109876543", "user", "buenas, es impermeable de verdad? porque compre uno antes y se mojo todo");

store.guardarPerfil("CO.9999999999999999", {
  nombre: "Fernanda",
  username: "FernandaRC.98",
  sinTelefono: true,
});
store.pushMsg("CO.9999999999999999", "user", "hola vi el anuncio, cuanto vale?");

require("./src/server.js");

// Un cliente con guía enviada y ventana cerrada, para ver el caso de oficina.
store.registrarGuiaEnviada({ guia: "240055550000", telefono: "573005550000", nombre: "Luis Ramirez" });
const _c = store.todasLasConversaciones();
_c["573005550000"] = { messages: [{ role: "user", content: "gracias", at: 1 }], ultimoDelCliente: Date.now() - 4 * 86400000 };
require("fs").writeFileSync((process.env.DATA_DIR || ".") + "/conversations.json", JSON.stringify(_c, null, 2));
