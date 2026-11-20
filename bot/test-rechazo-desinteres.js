/**
 * 🛑 "No gracias" corta el seguimiento, y el bot no dice que estamos en Medellín (19-nov).
 *   node test-rechazo-desinteres.js
 *
 * De dónde salen los casos: ANALISIS-CIERRE-BOT-19NOV.md (1.501 chats reales). El toque
 * de 2 horas le llegaba a quien ya había dicho "no gracias", y contestaban con insultos.
 * Todas las frases de abajo son textuales de clientes, sin datos personales.
 */
const fs = require("fs"), path = require("path");
const r = require("./src/rechazo");
const promesas = require("./src/promesas");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));

const lead = { compro: false, ultimoDelBot: "Los dos V10 2X te quedan en $122.000 en total. ¿Te sirve ese total?" };

// ── tienen que cortar el seguimiento
const cortan = [
  "No gracias",
  "No, gracias",
  "nooo, gracias",
  "Noo Muchas gracias",
  "No gracias muy amable",
  "No gracias no estoy interesado",
  "no estoy interesado gracias",
  "Buenos no estoy interesado gracias",
  "No me interesan ya que son de poco alcance",
  "Ya los compré mil gracias",
  "ya lo compre gracias",
  "No muchas gracias ya los compre aquí en bogotá.",
  "Gracias, ya lo conseguí",
  "Gracias ya les dije q no",
  "joda dije que no",
  "Ustedes son muy aburridos ya dije q no y siguen lo mismo",
  "No sean fastidiosos",
  "No joda",
];
for (const t of cortan) {
  const e = r.evaluar(t, lead);
  chequear(`corta: "${t}"`, e.rechaza, JSON.stringify(e));
}

// ── NO pueden cortar: están comprando, preguntando o poniendo una condición
const siguen = [
  "No gracias, el negro mejor",
  "no, gracias a ti",
  "Si gracias",
  "Gracias",
  "No, ¿cuánto vale el envío?",
  "No quiero rojo, quiero azul",
  "No tengo la dirección exacta",
  "Ya los conseguí, muchas gracias, pero sí estoy necesitando otro para mi esposa",
  "si no los puedo destapar antes de cancelar no me interesan muchas gracias",
  "Ya compré, ¿cuándo llega?",
  "Ya los compré pero no he podido interconectarlos",
  "Ya compré un Q58 y se quedó bloqueado",
  "No, mejor dos",
];
for (const t of siguen) {
  const e = r.evaluar(t, lead);
  chequear(`sigue: "${t}"`, !e.rechaza, JSON.stringify(e));
}

// ── las guardas del contexto
chequear('"No gracias" a una oferta extra NO corta',
  !r.evaluar("No gracias", { compro: false, ultimoDelBot: "¿Te gustaría agregar otro conjunto por $50.100 más?" }).rechaza);
chequear('pero "no estoy interesado" a la oferta extra sí',
  r.evaluar("No gracias, no estoy interesado", { compro: false, ultimoDelBot: "Si querés llevar otro par, te sale más barato" }).rechaza);
chequear('si ya compró, "No gracias" NO corta (apagaría el recordatorio pre-entrega)',
  !r.evaluar("No gracias", { compro: true, ultimoDelBot: "" }).rechaza);
chequear('si ya compró, "ya lo compré" NO corta', !r.evaluar("ya lo compre gracias", { compro: true }).rechaza);
chequear('pero un "no me escriban más" corta aunque haya comprado (las familias de siempre)',
  r.evaluar("no me escriban más", { compro: true }).rechaza);
chequear("sin contexto se trata como un lead", r.evaluar("No gracias").rechaza);

// ── contextoDe lee la conversación bien
const ctx = r.contextoDe({
  compro: false,
  messages: [
    { role: "user", content: "hola" },
    { role: "assistant", content: "¿Querés agregar otro?" },
    { role: "user", content: "No gracias" },
  ],
});
chequear("contextoDe toma el último mensaje del BOT, no el del cliente", ctx.ultimoDelBot === "¿Querés agregar otro?");
chequear("contextoDe sin conversación no revienta", r.contextoDe(null).compro === false);

// ── las familias de siempre siguen igual
chequear("sigue cortando 'Cuando decida comprarlo yo les escribo'", r.evaluar("Cuando decida comprarlo yo les escribo. Ahorita no").rechaza);
chequear("sigue cortando 'no me interesa'", r.evaluar("No me interesa").rechaza);

// ── server.js lo usa con contexto y no marca a quien tiene pedido
const srv = fs.readFileSync(path.join(__dirname, "src", "server.js"), "utf8");
chequear("server.js le pasa el contexto del chat", /rechazo\.evaluar\(text, ctxRechazo\)/.test(srv));
chequear("server.js no marca noMolestar a quien tiene un pedido", /tienePedido[\s\S]{0,400}rechaza: false/.test(srv));

// ── un caso de posventa no desaparece del panel aunque tenga noMolestar
const at = fs.readFileSync(path.join(__dirname, "src", "atencion.js"), "utf8");
chequear("atencion: noMolestar no tapa un caso de posventa", /c\.noMolestar && !soporte\.necesita/.test(at));

// ── sede: "Estamos ubicados en Medellín" (4 veces en 4 días)
const medellin = "Estamos ubicados en Medellín, desde donde despachamos todos nuestros pedidos a nivel nacional 📦\n\n¿Te parece bien el total de $152.000?";
chequear("revisar ve 'Estamos ubicados en Medellín'",
  promesas.revisar(medellin, {}).hallazgos.some((h) => h.clave === "ubicacion_equivocada"));
const corr = promesas.corregir(medellin, {});
chequear("corregir la cambia por Bogotá", /Bogot/.test(corr.texto) && !/Medell/.test(corr.texto), corr.texto);
chequear("y conserva el precio", corr.texto.includes("$152.000"));
chequear("ve 'Despachamos desde Cali'", promesas.revisar("Despachamos desde Cali a todo el país", {}).ok === false);
chequear("ve 'Nuestra tienda queda en Barranquilla'", promesas.revisar("Nuestra tienda queda en Barranquilla", {}).ok === false);
for (const t of [
  "Estamos en Bogotá, pero hacemos envíos a todo el país",
  "Estamos en contacto por acá",
  "Somos de confianza, pagás al recibir",
  "Estamos en todo el país con envío",
  "Nuestra bodega está ubicada en la Calle 62bis #67-12 Sur, barrio Madelena, Bogotá",
]) chequear(`sede: no salta "${t.slice(0, 45)}"`, promesas.revisar(t, {}).ok);

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
