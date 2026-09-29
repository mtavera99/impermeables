/**
 * 🛟 LOS CASOS DE POSVENTA: GARANTÍA, CAMBIO, O ALGO QUE LLEGÓ MAL.
 *
 * Pedido del dueño: "cuando un cliente escriba para cambios, garantías, o que ya
 * compró y necesita algún tipo de soporte o ayuda, ponle una nueva categoría o
 * color para diferenciarlo y darle atención a ese tipo de caso".
 *
 * 🔴 Y HACÍA FALTA MÁS QUE UN COLOR: estos chats DESAPARECÍAN del panel.
 * `atencion.evaluar()` tiene `if (c.compro && puntos < 60) return {nivel:null}`,
 * que esconde a todo el que ya compró y no llega a 60 puntos. "Me llegó la talla
 * equivocada" no matcheaba ninguna otra señal: sumaba 25 y se iba a cero. Y si el
 * bot ya le había contestado, sumaba 0 y no aparecía nunca.
 *
 * El caso más caro que existe —cliente con el producto en la mano y un problema—
 * era justo el que el panel tapaba. La sección 3 lo reproduce.
 *
 * Lo que se prueba acá:
 *   1. las señales de posventa se reconocen
 *   2. ⛔ y NO se dispara con quien todavía está averiguando (esto es lo que
 *      decide si la categoría sirve o se vuelve ruido)
 *   3. el chat aparece en el panel con nivel alta y su color
 *   4. la categoría se persiste y sobrevive a que el mensaje se caiga del hilo
 *
 *   node test-posventa-soporte.js      (sin credenciales ni IA)
 */

const fs = require("fs");

const DIR = "/tmp/prueba-posventa-soporte";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const posventa = require("./src/posventa");
const atencion = require("./src/atencion");
const store = require("./src/store");
const panel = require("./src/panel");

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

const esSoporte = (t, compro = false) => posventa.necesitaSoporte(t, { compro }).necesita;

// ===========================================================================
console.log("\n── 1. Se reconocen los casos de posventa ──");
// ===========================================================================

// Señales fuertes: valen SIN que nuestro flag `compro` esté prendido, porque hay
// ventas tomadas a mano y del agente anterior que el bot no registró.
const fuertes = [
  "me llegó roto el impermeable",
  "el pedido llegó dañado",
  "llegó incompleto, falta el pantalón",
  "vino sin el cargador",
  "se rompió la costura a los dos días",
  "se descosió todo",
  "me llegó otra talla",
  "me llegó la talla equivocada",
  "el color es diferente al que pedí",
  "me queda grande, necesito la L",
  "me quedó pequeño",
  "está roto",
  "no me funciona el intercomunicador",
  "no carga",
  "no enciende",
  "no empareja con el celular",
  "dejó de funcionar",
  "quiero hacer efectiva la garantía",
  "cómo aplico la garantía",
  "esto entra en garantía?",
  "lo quiero devolver por garantía",
  "quiero cambiarlo por otra talla",
  "necesito un cambio de talla",
  "cómo hago para cambiarlo",
];
for (const t of fuertes) {
  chequear(`"${t}"`, esSoporte(t), "no se reconoció como posventa");
}

// Señales que necesitan que ya haya comprado: solas son ambiguas.
const conCompra = [
  "tiene garantía?",
  "necesito ayuda",
  "tengo un problema",
  "quiero poner un reclamo",
];
for (const t of conCompra) {
  chequear(`"${t}" + ya compró`, esSoporte(t, true), "no se reconoció con compro=true");
  chequear(`  ⛔ "${t}" SIN haber comprado no es posventa`, !esSoporte(t, false), "falso positivo");
}

// ===========================================================================
console.log("\n── 2. ⛔ Lo que NO puede entrar (si entra, la categoría es ruido) ──");
// 🔑 Esta sección vale más que la anterior. Una categoría nueva que se prende
// con cualquier cosa hace que el dueño deje de mirarla, y entonces no sirvió de
// nada haberla hecho.
// ===========================================================================

const noSonPosventa = [
  // Preguntas de alguien que todavía está averiguando.
  "tiene garantía el impermeable?",
  "cuánto cuesta?",
  "hay talla XL?",
  "de qué color viene?",
  "es resistente al agua?",
  "cuántas horas dura la batería?",
  "hacen envíos a Pitalito?",
  "es contraentrega?",
  // "No funciona" de algo que NO es el producto.
  "no me funciona el link",
  "no funciona la página",
  "el número no funciona",
  "no me funciona el código de descuento",
  // Cosas del cliente, no nuestras.
  "se me descargó la batería del celular",
  // Compra normal.
  "quiero dos impermeables para Pitalito Huila",
  "lo quiero, cómo hago?",
  "mándame el combo de dos",
  // Cortesía.
  "gracias",
  "listo, perfecto",
  // Consulta de estado: ya la maneja el flujo de posventa existente y NO es un
  // caso de soporte. Meterla acá llenaría la categoría de "¿dónde está?".
  "ya mandaron mi pedido?",
  "cuándo llega?",
  "me das el número de guía?",
];
for (const t of noSonPosventa) {
  chequear(`⛔ "${t}"`, !esSoporte(t, false), "FALSO POSITIVO: entró como posventa");
}

// Y tampoco con el flag de compra prendido: una pregunta de talla de alguien que
// ya compró sigue sin ser un reclamo.
for (const t of ["hay talla XL?", "cuánto cuesta el otro?", "cuándo llega?"]) {
  chequear(`⛔ "${t}" incluso habiendo comprado`, !esSoporte(t, true), "FALSO POSITIVO con compro=true");
}

// ===========================================================================
console.log("\n── 3. 🔴 El caso que el panel escondía ──");
// Reproducción del agujero: un cliente que YA COMPRÓ y escribe por un cambio.
// ===========================================================================

{
  // El bot ya le contestó, así que el último mensaje NO es del cliente: por esa
  // vía no suma ni un punto. Antes esto devolvía nivel null y no salía en ningún
  // lado.
  const conv = {
    compro: true,
    paused: false,
    messages: [
      { role: "user", content: "me llegó la talla equivocada, necesito cambiarla", at: Date.now() - 60000 },
      { role: "assistant", content: "Con gusto te ayudo 😊", at: Date.now() - 30000 },
    ],
  };
  const e = atencion.evaluar("573001112233", conv);
  chequear(
    "🔑 un cliente que ya compró y pide un cambio AHORA aparece en el panel",
    e.nivel !== null,
    `nivel: ${e.nivel}, puntos: ${e.puntos} — antes de este arreglo era null`
  );
  chequear("  y sale como alta, no como media", e.nivel === "alta", `nivel: ${e.nivel}`);
  chequear("  marcado como posventa", Boolean(e.posventa), JSON.stringify(e.posventa));
  chequear(
    "  y el motivo de posventa va PRIMERO (es lo que el renglón muestra)",
    /posventa/i.test(e.motivos[0] || ""),
    JSON.stringify(e.motivos)
  );
}

{
  // Control: el mismo cliente sin problema NO tiene que aparecer. Si apareciera,
  // habríamos cambiado un agujero por una inundación.
  const conv = {
    compro: true,
    paused: false,
    messages: [
      { role: "user", content: "muchas gracias!", at: Date.now() - 60000 },
      { role: "assistant", content: "¡Con gusto! 😊", at: Date.now() - 30000 },
    ],
  };
  const e = atencion.evaluar("573001112244", conv);
  chequear(
    "⛔ y el que ya compró y NO tiene problema sigue sin aparecer",
    e.nivel === null,
    `nivel: ${e.nivel}, puntos: ${e.puntos}, motivos: ${JSON.stringify(e.motivos)}`
  );
}

{
  // Quien pidió no ser contactado manda sobre todo lo demás.
  const conv = {
    compro: true,
    noMolestar: true,
    messages: [{ role: "user", content: "me llegó roto", at: Date.now() }],
  };
  chequear(
    "⛔ 'no molestar' le gana a posventa: no se lo saca a la lista igual",
    atencion.evaluar("573001112255", conv).nivel === null,
    JSON.stringify(atencion.evaluar("573001112255", conv))
  );
}

// ===========================================================================
console.log("\n── 4. La categoría se guarda y sobrevive al hilo ──");
// `messages` se rota: sin persistir, el caso se borraría del panel mientras el
// problema sigue abierto.
// ===========================================================================

{
  store.fijarCategoria("573001112266", "posventa", "🛟 posventa: se le rompió la costura");
  const c = store.getConv("573001112266");
  chequear("queda guardada en la conversación", c.categoria === "posventa", JSON.stringify(c.categoria));
  chequear("con su fecha", typeof c.categoriaDesde === "number" && c.categoriaDesde > 0, JSON.stringify(c.categoriaDesde));
  chequear("y con el motivo, para mostrarlo después", /costura/.test(c.categoriaPorQue || ""), c.categoriaPorQue);
}

{
  // 🔑 El mensaje original ya NO está en el hilo (se rotó), y el caso tiene que
  // seguir saliendo.
  const conv = {
    compro: true,
    categoria: "posventa",
    categoriaPorQue: "🛟 posventa: se le rompió la costura",
    messages: [
      { role: "user", content: "ok", at: Date.now() - 20000 },
      { role: "assistant", content: "👍", at: Date.now() - 10000 },
    ],
  };
  const e = atencion.evaluar("573001112266", conv);
  chequear(
    "🔑 sin el mensaje original en el hilo, el caso sigue marcado",
    Boolean(e.posventa) && e.nivel === "alta",
    `nivel: ${e.nivel}, posventa: ${JSON.stringify(e.posventa)}`
  );
  chequear(
    "  y conserva el motivo que se guardó",
    /costura/.test(e.posventa || ""),
    e.posventa
  );
}

{
  // No reescribe el archivo si ya estaba: mismo criterio que fijarProductoActivo.
  store.fijarCategoria("573001112277", "posventa", "primera");
  const antes = store.getConv("573001112277").categoriaDesde;
  store.fijarCategoria("573001112277", "posventa", "segunda");
  chequear(
    "llamarla dos veces con lo mismo no cambia la fecha",
    store.getConv("573001112277").categoriaDesde === antes,
    "se reescribió de gusto"
  );
}

// ===========================================================================
console.log("\n── 5. Se VE en el panel: color, etiqueta y atajo ──");
// De nada sirve detectarlo si el dueño no lo distingue en el celular.
// ===========================================================================

{
  store.pushMsg("573009998877", "user", "me llegó roto, quiero hacer efectiva la garantía");
  store.marcarComprado("573009998877");
  const html = panel.render();

  chequear("el CSS del borde violeta está en la página", /\.fila\.posventa\{/.test(html));
  chequear("el CSS de la etiqueta también", /\.tag\.posventa\{/.test(html));
  chequear(
    "🔑 el borde de posventa es más grueso que el de los otros (se ve al sol)",
    /\.fila\.posventa\{[^}]*border-left-width:5px/.test(html),
    "sin el grosor, el color solo no alcanza en un celular"
  );
  chequear("la etiqueta 🛟 posventa sale en el chat", /tag posventa">🛟 posventa/.test(html));
  chequear("la fila sale con la clase de posventa", /class="fila alta posventa"/.test(html), "no se pintó el renglón");
  chequear("el atajo de arriba aparece con el conteo", /🛟 Posventa \(1\)/.test(html), "no salió el atajo");
  chequear(
    "🔑 y las clases .tag.alta/.tag.media, que se usaban sin estar definidas, ya existen",
    /\.tag\.alta\{/.test(html) && /\.tag\.media\{/.test(html)
  );
}

{
  // Sin casos de posventa el atajo NO aparece: un atajo que lleva a nada vacío
  // es peor que ninguno.
  fs.rmSync(DIR, { recursive: true, force: true });
  store.pushMsg("573005554433", "user", "hola, cuánto cuesta?");
  const html = panel.render();
  chequear("⛔ sin casos de posventa el atajo no aparece", !/🛟 Posventa \(/.test(html));
}

fs.rmSync(DIR, { recursive: true, force: true });
console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
