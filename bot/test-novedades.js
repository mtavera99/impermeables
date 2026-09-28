/**
 * NOVEDADES DE ENTREGA: avisarle al cliente para que el pedido no se devuelva.
 *
 * POR QUÉ IMPORTA, MEDIDO: la devolución está en 19% y cuesta $2.464.218/mes.
 * Bajar 3 puntos son $389.962/mes. Y el archivo madre ya dejó dicho que el
 * rechazo bajo (5,0%) NO es suerte: es la gestión diaria de novedades del dueño.
 *
 * Lo delicado acá no es el parser: es NO escribirle la cosa equivocada a un
 * cliente real. Un mensaje enviado no se puede deshacer.
 *
 *   node test-novedades.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-novedades";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;

const novedades = require("./src/novedades");
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

console.log("\n── 1. Lee el texto pegado, venga como venga ──");
// No sabemos si 99 Envíos exporta CSV, así que esto tiene que funcionar con
// cualquier cosa: filas copiadas de la pantalla, CSV, o una lista a mano.

const pegado = [
  "240012345678  INTERRAPIDISIMO  Direccion incompleta, no ubicada",
  "240098765432,COORDINADORA,Destinatario ausente - intento de entrega",
  "240055555555;;Reclame en oficina",
  "240011111111\tRehusado por el cliente",
  "esta linea no tiene guia y hay que ignorarla",
  "",
  "240012345678  la misma guia otra vez",
].join("\n");

const filas = novedades.parsear(pegado);
chequear("saca 4 novedades (ignora la línea sin guía)", filas.length === 4, `sacó ${filas.length}`);
chequear("no procesa la misma guía dos veces", filas.filter((f) => f.guia === "240012345678").length === 1);
chequear("lee con espacios", filas[0].guia === "240012345678");
chequear("lee con comas", filas[1].guia === "240098765432");
chequear("lee con punto y coma", filas[2].guia === "240055555555");
chequear("lee con tabulación", filas[3].guia === "240011111111");
chequear(
  "el motivo queda limpio, sin la guía ni los separadores",
  filas[1].motivo === "COORDINADORA Destinatario ausente - intento de entrega",
  `quedó: "${filas[1].motivo}"`
);
// 🔑 El caso realista y peligroso: la fila trae la guía Y el celular del
// cliente. Si se tomara "el primer número largo", agarraría el celular.
const conCelular = novedades.parsear("3001234567  240033333333  No habia nadie");
chequear(
  "con un celular y una guía en la misma línea, elige la guía",
  conCelular[0].guia === "240033333333",
  `eligió ${conCelular[0].guia}`
);
chequear(
  "y el motivo no se queda con los números pegados",
  conCelular[0].motivo === "No habia nadie",
  `quedó: "${conCelular[0].motivo}"`
);

console.log("\n── 2. Reconoce el motivo, y cuando no lo reconoce lo DICE ──");

const t = (x) => novedades.clasificar(x).clave;
chequear("dirección incompleta", t("Direccion incompleta") === "direccion");
chequear("no reside / no conocen", t("El destinatario no reside en la direccion") === "direccion");
chequear("no había nadie", t("No habia nadie en el domicilio") === "ausente");
chequear("destinatario ausente", t("DESTINATARIO AUSENTE") === "ausente");
chequear("reclame en oficina", t("Reclame en oficina") === "oficina");
chequear("rechazado", t("Rehusado por el cliente") === "rechazado");
chequear(
  "🔑 lo que NO reconoce queda como desconocido, no se adivina",
  t("se cayo un meteorito en la bodega") === "desconocida",
  "adivinó un motivo que no conoce, y con eso le escribiría cualquier cosa al cliente"
);

console.log("\n── 3. 🔴 El mensaje de oficina NO puede inventar transportadora ni dirección ──");
// El 14-sep el bot le prometió a una clienta "la oficina de Servientrega en
// Potosí" y Servientrega NO presta recogida en oficina. La clienta lo leyó.
const msgOficina = novedades.TIPOS.find((x) => x.clave === "oficina").mensaje("Pedro");
chequear("no nombra ninguna transportadora", !/servientrega|interrapid|coordinadora|envia|tcc/i.test(msgOficina), msgOficina);
chequear("no inventa una dirección", !/calle|carrera|cra\.|avenida|#\s?\d/i.test(msgOficina), msgOficina);
chequear("le pide que responda para darle los datos", /respondeme|respondé|respond/i.test(msgOficina));

console.log("\n── 4. Al que rechazó NO se le escribe ──");
chequear(
  "el tipo rechazado no tiene mensaje automático",
  novedades.TIPOS.find((x) => x.clave === "rechazado").mensaje === null,
  "le mandaría un mensaje a alguien que ya dijo que no lo quiere"
);

console.log("\n── 5. Encuentra a quién le corresponde cada guía ──");

// Un cliente que SÍ recibió su guía por WhatsApp (de ahí sale su número).
store.registrarGuiaEnviada({ guia: "240012345678", telefono: "573001112233", nombre: "Pedro Epieyu" });
// Y otro que tiene la guía anotada en el pedido.
store.saveOrder({
  nombre: "Ana Maria Ruiz",
  celular: "3009998877",
  ciudad: "Cali",
  total: 82000,
  telefono_chat: "573009998877",
});
const pedidoAna = store.todosLosPedidos()[0];
store.anotarGuiaEnPedido(pedidoAna.fecha, "240098765432");

// Ventanas: Pedro escribió hace 2 horas (abierta), Ana hace 3 días (cerrada).
store.pushMsg("573001112233", "user", "gracias");
const conv = store.todasLasConversaciones();
conv["573001112233"].ultimoDelCliente = Date.now() - 2 * 3600 * 1000;
conv["573009998877"] = { messages: [{ role: "user", content: "hola", at: 1 }], ultimoDelCliente: Date.now() - 3 * 86400 * 1000 };
fs.writeFileSync(DIR + "/conversations.json", JSON.stringify(conv, null, 2));

const plan = novedades.revisar(
  [
    "240012345678 Direccion incompleta",
    "240098765432 Destinatario ausente",
    "240077777777 No habia nadie",
  ].join("\n"),
  { tienePlantilla: false }
);

const porGuia = (g) => plan.filas.find((f) => f.guia === g);

chequear("encuentra al cliente por la guía que se le envió", porGuia("240012345678").destino === "573001112233");
chequear("y también por la guía anotada en el pedido", porGuia("240098765432").destino === "573009998877");
chequear(
  "una guía que no es de nadie queda bloqueada y lo explica",
  porGuia("240077777777").enviar === false &&
    /no encontr/i.test(porGuia("240077777777").motivoNoEnvio),
  JSON.stringify(porGuia("240077777777"))
);

console.log("\n── 6. 🔑 La ventana de 24h decide CÓMO se le escribe ──");

const pedro = porGuia("240012345678");
const ana = porGuia("240098765432");

chequear("Pedro escribió hace 2h → ventana abierta", pedro.ventanaAbierta === true);
chequear("a Pedro se le manda mensaje normal, no plantilla", pedro.enviar === true && !pedro.porPlantilla);
chequear("y lo saluda por su primer nombre", pedro.texto.includes("Hola Pedro"), pedro.texto.slice(0, 60));
chequear("el mensaje le pide un punto de referencia", /punto de referencia/i.test(pedro.texto));

chequear("Ana escribió hace 3 días → ventana cerrada", ana.ventanaAbierta === false);
chequear("a Ana igual se le puede avisar, por plantilla", ana.enviar === true && ana.porPlantilla === true);
chequear(
  "y usa la plantilla de SU tipo de novedad, no una genérica",
  ana.plantilla === "novedad_ausente",
  `usó: ${ana.plantilla}`
);
chequear(
  "el panel muestra el texto real que va a recibir",
  /no encontramos a nadie/i.test(ana.texto),
  ana.texto
);

console.log("\n── 7. 🔴 La de OFICINA no se manda sin los datos reales ──");
// El 14-sep el bot prometió "la oficina de Servientrega en Potosí" y
// Servientrega no presta recogida en oficina. Esos datos salen de la novedad.

store.registrarGuiaEnviada({ guia: "240055550000", telefono: "573005550000", nombre: "Luis Ramirez" });
const convO = store.todasLasConversaciones();
convO["573005550000"] = { messages: [{ role: "user", content: "ok", at: 1 }], ultimoDelCliente: Date.now() - 5 * 86400 * 1000 };
fs.writeFileSync(DIR + "/conversations.json", JSON.stringify(convO, null, 2));

const sinDatos = novedades.revisar("240055550000 Reclame en oficina").filas[0];
chequear("sin completar, queda bloqueada", sinDatos.enviar === false);
chequear("y pide los dos datos", Array.isArray(sinDatos.pidoDatos) && sinDatos.pidoDatos.length === 2);
chequear(
  "el motivo dice que el bot no los puede inventar",
  /no los puede inventar/i.test(sinDatos.motivoNoEnvio),
  sinDatos.motivoNoEnvio
);

const conDatos = novedades.revisar("240055550000 Reclame en oficina", {
  datos: { "240055550000": { oficina: "Interrapidisimo, Monteria", plazo: "el 27 de septiembre" } },
}).filas[0];
chequear("con los datos completos ya se puede enviar", conDatos.enviar === true);
chequear("usa la plantilla de oficina", conDatos.plantilla === "novedad_oficina");
chequear(
  "los datos van como parámetros de la plantilla, en orden",
  conDatos.parametros[0] === "Interrapidisimo, Monteria" && conDatos.parametros[1] === "el 27 de septiembre",
  JSON.stringify(conDatos.parametros)
);
chequear(
  "y el panel muestra el mensaje ya armado",
  conDatos.texto.includes("Interrapidisimo, Monteria") && conDatos.texto.includes("el 27 de septiembre"),
  conDatos.texto
);
chequear(
  "completar solo la mitad tampoco alcanza",
  novedades.revisar("240055550000 Reclame en oficina", {
    datos: { "240055550000": { oficina: "Interrapidisimo" } },
  }).filas[0].enviar === false,
  "mandaría la plantilla con un parámetro vacío"
);

console.log("\n── 8. El nombre se usa con cabeza ──");
chequear('"Pedro Epieyu" → "Pedro"', novedades.primerNombre("Pedro Epieyu") === "Pedro");
chequear("un nombre vacío no rompe el saludo", novedades.primerNombre("") === "");
chequear(
  "sin nombre el mensaje sigue siendo natural",
  novedades.TIPOS[0].mensaje("").startsWith("Hola 👋"),
  novedades.TIPOS[0].mensaje("").slice(0, 30)
);

console.log("\n── 9. La pantalla se arma y su JavaScript compila ──");
process.env.PANEL_TOKEN = "clave_de_prueba";
const pantalla = require("./src/panel-novedades").render({});
chequear(
  "la pantalla nombra las 3 plantillas, una por tipo de novedad",
  pantalla.includes("novedad_direccion") &&
    pantalla.includes("novedad_ausente") &&
    pantalla.includes("novedad_oficina")
);
chequear(
  "y avisa que la de oficina va a pedir los datos",
  /en qué oficina está y hasta cuándo/i.test(pantalla)
);
chequear(
  "los campos para completar la oficina existen en el JS",
  pantalla.includes('data-campo="oficina"') && pantalla.includes('data-campo="plazo"')
);
chequear("tiene el cuadro para pegar", pantalla.includes("<textarea"));
chequear("el botón de revisar aclara que no envía", /Revisar \(no env/.test(pantalla));
const script = pantalla.match(/<script>([\s\S]*?)<\/script>/);
let compila = false;
try {
  new Function(script[1]);
  compila = true;
} catch (e) {
  compila = e.message;
}
chequear("el JavaScript compila", compila === true, `error: ${compila}`);
chequear("en móvil las filas se vuelven tarjetas", pantalla.includes("content:attr(data-label)"));
chequear("el cuadro de texto no dispara el zoom de iOS", /textarea\{[^}]*font:1[6-9]px/.test(pantalla));

console.log("\n── La guía correcta y los datos de oficina que vienen en el archivo ──");
// 🔴 Dos defectos reproducidos el 28-sep con la fila real:
//   1. la línea traía 10104874 (número interno, 8 dígitos) y 240062099941 (la
//      guía, 12). Se elegía el primero que no pareciera celular — el interno — así
//      que la novedad no cruzaba con ningún pedido.
//   2. la oficina y la fecha límite venían en el archivo y se tiraban, así que
//      TODA novedad de oficina quedaba bloqueada pidiéndolas a mano.
{
  const fila = "10104874\t240062099941\tTelemercadeo\timpermeable\tGustavo Calle 7\t3013335947\tBOGOTÁ\t1";
  const r = novedades.parsear(fila)[0];
  chequear("🔑 gana la guía larga, no el número interno", r.guia === "240062099941", `eligió ${r.guia} de ${JSON.stringify(r.candidatos)}`);
  chequear("  y el celular sigue descartado", r.guia !== "3013335947");

  // Los marcadores que pone el lector de Excel.
  const conDatos =
    "240062099942\tDEJADO EN OFICINA PARA RECLAMAR\tMaria Lopez\tYOPAL\t3001234567" +
    "\t[[oficina: Interrapidisimo Yopal Centro]]\t[[plazo: 2026-10-05]]";
  const f2 = novedades.parsear(conDatos)[0];
  chequear("🔑 la oficina se lee del archivo", f2.oficina === "Interrapidisimo Yopal Centro", JSON.stringify(f2.oficina));
  chequear("🔑 y la fecha límite también", f2.plazo === "2026-10-05", JSON.stringify(f2.plazo));
  chequear("los marcadores NO quedan dentro del motivo", !/\[\[/.test(f2.motivo), f2.motivo);
  chequear("y el motivo sigue clasificando como oficina", novedades.clasificar(f2.motivo).clave === "oficina", novedades.clasificar(f2.motivo).clave);

  // 🔑 Con esos datos, la novedad de oficina YA NO queda bloqueada.
  const tel = "573009995001";
  store.saveOrder({
    nombre: "Maria Lopez", celular: "3001234567", ciudad: "Yopal", direccion: "Calle 5 #4-3",
    color: "negro", talla: "L", unidades: 1, pago: "contraentrega", total: 85000,
    telefono_chat: tel, guia: "240062099942",
  });
  const plan = novedades.revisar(conDatos, { ahora: Date.now() });
  const f = plan.filas[0];
  chequear("🔑 EL CASO: la novedad de oficina ya NO pide datos a mano", f.enviar === true, `motivo: ${f.motivoNoEnvio}`);
  chequear("  con la plantilla de oficina", f.plantilla === novedades.PLANTILLAS.oficina, String(f.plantilla));
  chequear("  y los parámetros que salieron del archivo", JSON.stringify(f.parametros) === JSON.stringify(["Interrapidisimo Yopal Centro", "2026-10-05"]), JSON.stringify(f.parametros));
  chequear("  el texto que verá el cliente trae la oficina", /Interrapidisimo Yopal Centro/.test(f.texto), f.texto);
  chequear("  y la fecha", /2026-10-05/.test(f.texto), f.texto);

  // ⛔ Y si el archivo NO trae esos datos, se sigue bloqueando: no se inventan.
  const sinDatos = "240062099942\tDEJADO EN OFICINA PARA RECLAMAR\tMaria Lopez\tYOPAL";
  const f3 = novedades.revisar(sinDatos, { ahora: Date.now() }).filas[0];
  chequear("🔑 sin los datos en el archivo, se sigue pidiendo", f3.enviar === false && /Falta completar/.test(f3.motivoNoEnvio || ""), JSON.stringify(f3.motivoNoEnvio));

  // ⚠️ Y lo que el dueño escribe a mano manda sobre el archivo.
  const f4 = novedades.revisar(conDatos, {
    ahora: Date.now(),
    datos: { "240062099942": { oficina: "Interrapidisimo Centro Comercial Unicentro", plazo: "2026-10-09" } },
  }).filas[0];
  chequear("🔑 lo que corrige el dueño gana sobre el archivo", /Unicentro/.test(f4.texto) && /2026-10-09/.test(f4.texto), f4.texto);
}

console.log("\n── Los tipos y la oficina del archivo REAL ──");
{
  // Los textos LITERALES de tipo_novedad del Novedades-2026-09-28.
  for (const [texto, esperado] of [
    ["Reclame en oficina", "oficina"],
    ["Intento de entrega", "ausente"],
    ["No se localiza dirección del destinatario", "direccion"],
    ["Reclamo en oficina informado WhatsApp - Recordatorio 24h", "oficina"],
    ["Reclamo en oficina informado WhatsApp - Recordatorio 48h", "oficina"],
    ["Reclamo en oficina informado WhatsApp - Recordatorio 7 días", "oficina"],
    // 🔴 Estos dos caían en "No se reconoció el motivo" con el archivo real.
    ["Telemercadeo", "telemercadeo"],
    ["Pedido cancelado", "rechazado"],
  ]) {
    chequear(`🔑 "${texto}" → ${esperado}`, novedades.clasificar(texto).clave === esperado, novedades.clasificar(texto).clave);
  }
  chequear("a Telemercadeo NO se le manda mensaje automático", novedades.clasificar("Telemercadeo").mensaje == null);
  chequear("ni a Pedido cancelado", novedades.clasificar("Pedido cancelado").mensaje == null);

  // 🔑 La oficina sale de direccion_destinatario, que es donde la pone 99 Envíos.
  const tel = "573009995002";
  store.saveOrder({
    nombre: "Tito Ramirez", celular: "3172168002", ciudad: "Dagua", direccion: "Oficina",
    color: "negro", talla: "L", unidades: 1, pago: "contraentrega", total: 85000,
    telefono_chat: tel, guia: "240062025925",
  });
  const linea =
    "[[guia: 240062025925]]\t240062025925\tReclame en oficina\tTito\tDAGUA/DAGUA\t3172168002" +
    "\t[[direccion: Oficina Interrapidísimo Dagua]]";
  const f = novedades.parsear(linea)[0];
  chequear("🔑 la guía marcada manda sobre cualquier otro número", f.guia === "240062025925", f.guia);
  chequear("la dirección se lee del marcador", f.direccion === "Oficina Interrapidísimo Dagua", JSON.stringify(f.direccion));

  const plan = novedades.revisar(linea, { ahora: Date.now() });
  const fila = plan.filas[0];
  // ⚠️ El archivo NO trae fecha límite, así que la novedad de oficina SIGUE
  // pidiéndola: eso no se inventa. Pero la oficina ya viene resuelta.
  chequear(
    "🔑 sigue pidiendo la fecha límite, que el archivo no trae",
    fila.enviar === false && /Falta completar/.test(fila.motivoNoEnvio || ""),
    JSON.stringify(fila.motivoNoEnvio)
  );
  const conPlazo = novedades.revisar(linea, { ahora: Date.now(), datos: { "240062025925": { plazo: "2026-10-05" } } }).filas[0];
  chequear("🔑 y con SOLO la fecha ya se puede enviar: la oficina salió del archivo", conPlazo.enviar === true, JSON.stringify(conPlazo.motivoNoEnvio));
  chequear("  con la oficina que traía la dirección", /Oficina Interrapidísimo Dagua/.test(conPlazo.texto), conPlazo.texto);

  // ⛔ Y una dirección de casa NO se toma por oficina.
  const casa = "[[guia: 240062099927]]\t240062099927\tReclame en oficina\tPatricia\tLA VEGA\t3125154335\t[[direccion: Calle 8A No364 Barrio Las Palmas]]";
  const fc = novedades.revisar(casa, { ahora: Date.now(), datos: { "240062099927": { plazo: "2026-10-05" } } }).filas[0];
  chequear("🔑 una dirección de casa no se usa como oficina", !/Calle 8A/.test(String(fc.texto || "")), String(fc.texto || fc.motivoNoEnvio));
}

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
