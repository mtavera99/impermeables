/**
 * LA BODEGA EXISTE, Y EL BOT TIENE QUE SABER DÓNDE ES — PERO NO A QUÉ HORA.
 *
 * DE DÓNDE SALE: en chats reales el bot dijo que NO había tienda física. Es
 * falso y es la venta más rentable que hay: el que recoge no paga envío, así
 * que deja $26.900 de margen contra $23.303-25.094 de un despacho.
 *
 * El agente viejo daba la dirección en 281 conversaciones, y la dirección ya
 * está en el perfil público de WhatsApp Business. Por eso el default va en el
 * código: no expone nada nuevo y evita que el bot vuelva a negar la bodega.
 *
 * 🔴 PERO EL HORARIO NO. El perfil de Meta dice "Abierto las 24 horas todos los
 * días": ese es el horario de ATENCIÓN POR WHATSAPP, no el de una bodega
 * física. Un cliente parado en la puerta a las 3 de la mañana porque el bot se
 * lo prometió es peor que no haber dicho nada. Hasta que el dueño confirme el
 * horario real, el bot da la dirección y pide coordinar la hora.
 *
 * Esta batería también cierra un candado aparte: los totales de 2 unidades que
 * el guion cita en prosa tienen que salir de la tabla de fletes. Estaban
 * desfasados ($137.000 Bogotá cuando la tabla dice $133.000) porque eran texto
 * escrito a mano que nadie volvió a tocar al corregir la tabla.
 *
 *   node test-bodega.js      (sin credenciales ni IA)
 */

const { PROMO_2_TOTAL, PROMO_2_UNIDADES, PRECIO_PRODUCTO, fmt } = require("./src/fletes");

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

// El guion lee process.env en cada llamada, así que hay que recargar el módulo
// para que cada escenario arranque limpio.
function guionCon(env) {
  const previos = {};
  const claves = ["BODEGA_DIRECCION", "BODEGA_CIUDAD", "BODEGA_HORARIO"];
  for (const k of claves) {
    previos[k] = process.env[k];
    if (env && k in env) {
      if (env[k] === undefined) delete process.env[k];
      else process.env[k] = env[k];
    } else {
      delete process.env[k];
    }
  }
  delete require.cache[require.resolve("./src/prompt")];
  const { buildSystemPrompt } = require("./src/prompt");
  const texto = buildSystemPrompt();
  for (const k of claves) {
    if (previos[k] === undefined) delete process.env[k];
    else process.env[k] = previos[k];
  }
  return texto;
}

// Saca solo la sección de la bodega, para no confundirse con el resto del guion.
function seccionBodega(guion) {
  const i = guion.indexOf("## 🏪");
  if (i < 0) return "";
  const j = guion.indexOf("\n## ", i + 4);
  return guion.slice(i, j < 0 ? undefined : j);
}

console.log("\n── 1. La bodega existe y el bot no la puede negar ──");

const porDefecto = guionCon({});
const bodega = seccionBodega(porDefecto);

chequear("hay una sección de tienda física / recoger", bodega.length > 200);
chequear("dice que SÍ SE PUEDE recoger", /SÍ SE PUEDE/.test(bodega));
chequear(
  "prohíbe decir que solo trabajamos online",
  /NUNCA digas que solo/.test(bodega)
);
chequear(
  "es honesto en que es bodega de despacho, no local con vitrina",
  /bodega de despacho/.test(bodega)
);

console.log("\n── 2. La dirección real viene por defecto ──");

chequear("trae la calle sin necesidad de variable de entorno", /62bis #67-12 Sur/.test(bodega));
chequear("trae el barrio", /Madelena/.test(bodega));
chequear("trae la ciudad", /Bogotá/.test(bodega));
chequear(
  "NO cae en el camino de 'no tengo la dirección cargada'",
  !/NO la inventes/.test(bodega)
);
chequear(
  "y por lo tanto NO escala a un asesor solo para dar la dirección",
  !/dirección\."\* \+ ##HANDOFF##/.test(bodega)
);

const otra = seccionBodega(
  guionCon({ BODEGA_DIRECCION: "Carrera 1 #2-3", BODEGA_CIUDAD: "Medellín" })
);
chequear("la variable de entorno manda sobre el default", /Carrera 1 #2-3/.test(otra));
chequear("y cambia la ciudad", /Medellín/.test(otra) && !/Bogotá/.test(otra));

console.log("\n── 3. El horario: 24/7, confirmado por el dueño el 24-sep ──");

chequear(
  "el bot da el horario sin necesidad de variable de entorno",
  /24 horas, todos los días/.test(bodega)
);
chequear(
  "va en su propia línea, no pegado a la dirección",
  /\n- Horario: /.test(bodega)
);
chequear(
  "pide que avise antes de salir (para no hacer el viaje en vano)",
  /avise antes de salir/.test(bodega)
);
chequear(
  "NO queda el aviso de horario sin confirmar",
  !/no hay horario confirmado/i.test(bodega)
);

const otroHorario = seccionBodega(
  guionCon({ BODEGA_HORARIO: "Lunes a viernes 8am a 5pm" })
);
chequear(
  "si el horario cambia, la variable de entorno manda",
  /Lunes a viernes 8am a 5pm/.test(otroHorario)
);
chequear(
  "y el 24 horas desaparece (no se quedan los dos)",
  !/24 horas/.test(otroHorario)
);

// 🔴 ESTE ES EL CANDADO IMPORTANTE. Si algún día deja de ser 24/7 y todavía no
// se sabe el horario nuevo, dejar BODEGA_HORARIO vacía tiene que hacer que el
// bot COORDINE en vez de prometer. Un cliente parado a las 3am en una bodega
// cerrada porque el bot se lo prometió es peor que no haber dicho nada.
const sinHorario = seccionBodega(guionCon({ BODEGA_HORARIO: "" }));
chequear(
  "con la variable vacía, avisa que no hay horario confirmado",
  /no hay horario confirmado/i.test(sinHorario)
);
chequear(
  "y prohíbe explícitamente decir '24 horas'",
  /no inventes uno.*24 horas/is.test(sinHorario)
);
chequear(
  "y pide coordinar el día y la hora",
  /Te confirmo la hora/.test(sinHorario)
);
chequear(
  "y NO se le escapa el horario por otro lado",
  !/- Horario:/.test(sinHorario)
);
chequear(
  "nunca dice 'cuando quieras' ni 'a cualquier hora'",
  !/cuando quieras|a cualquier hora/i.test(porDefecto)
);

console.log("\n── 4. Recoger se ofrece como ventaja, con el precio correcto ──");

chequear(
  "dice que recogiendo NO paga envío",
  /NO paga envío/.test(bodega)
);
chequear(
  `recogiendo, uno vale ${fmt(PRECIO_PRODUCTO)}`,
  bodega.includes(fmt(PRECIO_PRODUCTO))
);
chequear(
  `recogiendo, los dos valen ${fmt(PROMO_2_UNIDADES)}`,
  bodega.includes(fmt(PROMO_2_UNIDADES))
);
chequear(
  "manda poner RECOGE EN BODEGA en el cuadro (si no, el pedido sale sin dirección)",
  /RECOGE EN BODEGA/.test(bodega)
);

console.log("\n── 5. Si algún día no hay dirección, no se la inventa ──");

const sinDireccion = seccionBodega(guionCon({ BODEGA_DIRECCION: "" }));
chequear("avisa que no la invente", /NO la inventes/.test(sinDireccion));
chequear("y escala a un humano", /##HANDOFF##/.test(sinDireccion));
chequear(
  "pero AÚN ASÍ confirma que sí se puede recoger",
  /SÍ SE PUEDE/.test(sinDireccion)
);
chequear(
  "y no filtra la dirección por otro lado",
  !/62bis/.test(sinDireccion)
);

console.log("\n── 6. Al por mayor: sí se maneja ──");

chequear(
  "prohíbe decir que no vendemos al por mayor",
  /NUNCA digas "no vendemos al por mayor"/.test(porDefecto)
);
chequear(
  "ofrece precio especial y pasa a un asesor",
  /precio especial.*##HANDOFF##/s.test(porDefecto)
);
chequear(
  "pero no deja que el bot invente un número de mayorista",
  /no des un número/.test(porDefecto)
);

console.log("\n── 7. Los totales de 2 unidades que cita el guion salen de la tabla ──");

// Esta es la que cazó el desfase: el guion decía "$137.000 Bogotá … $158.000
// pueblos" en prosa cuando la tabla ya estaba en $133.000 y $155.000.
chequear(
  `la banda A citada en prosa es la de la tabla (${fmt(PROMO_2_TOTAL.A)})`,
  porDefecto.includes(`(${fmt(PROMO_2_TOTAL.A)} Bogotá`)
);
chequear(
  `la banda E citada en prosa es la de la tabla (${fmt(PROMO_2_TOTAL.E)})`,
  porDefecto.includes(`${fmt(PROMO_2_TOTAL.E)} pueblos)`)
);
// ==========================================================================
// ⚠️ ESTA COMPROBACIÓN CAMBIÓ DE OBJETO EL 26-SEP, Y A PROPÓSITO.
//
// Antes exigía que los totales de 2 unidades ESTUVIERAN EN EL GUION, porque el
// modelo los leía de una tabla de 107 ciudades. Eso es justamente lo que se
// corrigió: el 25-sep dio un combo de banda C en una ciudad de banda D.
//
// Ahora el total lo calcula `cotizacion.calcular()` y llega al modelo en el
// bloque de precio del turno. Así que lo que hay que cuidar ya no es que el
// número esté en el guion —no debe estar— sino que **llegue correcto por el
// bloque, para una ciudad real de cada banda**.
// ==========================================================================
const cotizacionMod = require("./src/cotizacion");
const CIUDAD_DE_BANDA = { A: "Bogota", B: "Tunja", C: "Cali", D: "Monteria", E: "Sahagun" };
for (const [banda, total] of Object.entries(PROMO_2_TOTAL)) {
  const cot = cotizacionMod.calcular(CIUDAD_DE_BANDA[banda], "dos conjuntos");
  chequear(
    `el total de 2 unidades de la banda ${banda} (${fmt(total)}) llega por el bloque de precio`,
    cot.ok && cot.total === total && cotizacionMod.bloqueDeDatos(cot).includes(fmt(total)),
    `${CIUDAD_DE_BANDA[banda]} dio ${cot.ok ? fmt(cot.total) : cot.motivo}`
  );
}
chequear(
  "🔑 y la tabla de 107 ciudades ya NO está en el guion",
  !/BOGOTA, SOACHA, ZIPAQUIRA/.test(porDefecto),
  "el modelo no debe tener de dónde leer un total: lo recibe calculado"
);
chequear(
  "no quedó ningún total viejo de 2 unidades como número a cotizar",
  !/te salen los dos en \$1(37|58)\.000/.test(porDefecto)
);

console.log("\n── 8. Nada de esto infló el guion ──");

const tokens = Math.round(porDefecto.length / 4);
chequear(`el guion sigue cabiendo en 9.000 tokens (va en ~${tokens})`, tokens < 9000);
chequear(
  "no quedaron marcadores de plantilla sin reemplazar",
  !/\$\{/.test(porDefecto),
  "quedó un ${...} sin interpolar"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
