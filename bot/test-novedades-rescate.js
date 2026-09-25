/**
 * LAS NOVEDADES QUE NO SE PUDIERON AVISAR.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep). El dueño cargó tres novedades y:
 *
 *   "si me dejó enviar 1 no más, pero eran creo que 3. Otro salió así pidiendo
 *    detalles, no sé por qué; igual se los puse pero a ese no le envió."
 *
 * DOS PROBLEMAS DISTINTOS, y los dos dejaban clientes sin avisar. Una novedad
 * sin avisar termina en devolución, y una devolución cuesta $17.384.
 *
 * ── 1. Los datos de la oficina no se aplicaban ──────────────────────────────
 * Los campos de "en qué oficina" y "hasta cuándo" se mandaban SOLO en el paso de
 * Revisar. Si se completaban y se le daba Enviar —que es lo natural, porque los
 * campos están ahí mismo en la fila— el plan seguía teniendo esa fila marcada
 * como no enviable y el envío la saltaba en silencio.
 *
 * 🔑 No se arregla con un cartel más grande. Se arregla haciendo que completar
 * los campos y darle Enviar funcione, porque es lo que cualquiera va a hacer.
 *
 * ── 2. Dos guías no cruzaban con nada ───────────────────────────────────────
 * Sus números eran de 8 dígitos (10091647, 10090311) y las guías reales tienen
 * 12 (240061942387): eran números de otra columna del Excel. Esos clientes
 * existen, tienen su pedido y su novedad, y el sistema no podía avisarles nada.
 *
 * Ahora se los busca por NOMBRE Y CIUDAD contra nuestros pedidos — pero marcado
 * como `probable`, porque es una suposición nuestra. Mandarle la novedad de un
 * cliente a otro es peor que no mandar nada.
 *
 *   node test-novedades-rescate.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-nov-rescate";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const store = require("./src/store");
const novedades = require("./src/novedades");

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

const pedido = (nombre, ciudad, tel, guia) => {
  const p = store.saveOrder({
    nombre,
    celular: tel.slice(2),
    ciudad,
    direccion: "Cra 1 #2-3",
    talla: "L",
    color: "negro",
    pago: "contraentrega",
    total: 85000,
    telefono_chat: tel,
  });
  if (guia) {
    store.anotarGuiaEnPedido(p.id, guia);
    store.registrarGuiaEnviada({ guia, telefono: tel, nombre });
  }
  return p;
};

// El caso real: Mauricio con guía conocida, y otros dos sin guía en el sistema.
pedido("Mauricio Cajigas González", "Dagua", "573025396775", "240061942387");
pedido("Jaiber Mauricio Ospina", "Riosucio", "573001110001");
pedido("Samuel Restrepo Díaz", "Talaigua Nuevo", "573001110002");

const LINEA_OFICINA =
  "240061942387 Reclame en oficina impermeable Mauricio Oficina principal Inter Rapidisimo DAGUA/DAGUA 1";

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Sin los datos de la oficina, no se manda (y está bien) ──");

let r = novedades.revisar(LINEA_OFICINA, { datos: {} });
chequear("la fila no es enviable", r.filas[0].enviar === false);
chequear("y dice qué falta", Array.isArray(r.filas[0].pidoDatos) && r.filas[0].pidoDatos.length === 2);
chequear(
  "el bot NO se inventa la oficina",
  /no los puede inventar/.test(r.filas[0].motivoNoEnvio || ""),
  "el 14-sep prometió una oficina de Servientrega que no presta ese servicio"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. EL BUG: completar los datos ahora SÍ alcanza ──");

const DATOS = { "240061942387": { oficina: "Inter Rapidísimo Dagua", plazo: "29 de sep" } };
r = novedades.revisar(LINEA_OFICINA, { datos: DATOS });
const f = r.filas[0];
chequear("🔑 con los datos completos, la fila SÍ se envía", f.enviar === true, JSON.stringify(f.motivoNoEnvio));
chequear("va por la plantilla de oficina", f.plantilla === "novedad_oficina" && f.porPlantilla === true);
chequear(
  "y los dos parámetros viajan en orden: oficina y después plazo",
  f.parametros[0] === "Inter Rapidísimo Dagua" && f.parametros[1] === "29 de sep",
  JSON.stringify(f.parametros)
);
chequear("el destinatario es el correcto", f.destino === "573025396775");
chequear(
  "el mensaje nombra la oficina que puso el dueño",
  /Inter Rapidísimo Dagua/.test(f.texto),
  f.texto
);

// 🔑 Lo que hace que el arreglo funcione: recalcular sobre el MISMO texto da las
// filas en el mismo orden, así que los índices que marcó el dueño siguen
// apuntando al mismo cliente. Si esto no fuera cierto, se le mandaría el mensaje
// de un cliente a otro.
const sinDatos = novedades.revisar(LINEA_OFICINA, { datos: {} });
const conDatos = novedades.revisar(LINEA_OFICINA, { datos: DATOS });
chequear(
  "recalcular no cambia el orden ni la cantidad de filas",
  sinDatos.filas.length === conDatos.filas.length &&
    sinDatos.filas[0].guia === conDatos.filas[0].guia
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Las guías que no cruzan: rescate por nombre ──");

const LINEA_JAIBER =
  "10091647 Reclame en oficina impermeable Jaiber Mauricio Oficina principal Interrapidisimo RIOSUCIO/RIOSUCIO 1";
r = novedades.revisar(LINEA_JAIBER, { datos: {} });
chequear(
  "encuentra al cliente por nombre y ciudad",
  r.filas[0].nombre === "Jaiber Mauricio Ospina",
  r.filas[0].nombre || "(ninguno)"
);
chequear("queda marcado como PROBABLE, no como seguro", !!r.filas[0].probable);
chequear(
  "y explica por qué lo eligió",
  /nombre/.test(r.filas[0].probable.porQue) && /ciudad/.test(r.filas[0].probable.porQue),
  r.filas[0].probable.porQue
);

const LINEA_SAMUEL =
  "10090311 Intento de entrega impermeable Samuel Calle 9 kra 1472 TALAIGUA NUEVO/TALAIGUA NUEVO 1";
r = novedades.revisar(LINEA_SAMUEL, { datos: {} });
chequear("el segundo también", r.filas[0].nombre === "Samuel Restrepo Díaz", r.filas[0].nombre);
chequear("y ese sí se puede enviar (no es de oficina)", r.filas[0].enviar === true);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. ⛔ Y NO adivina cuando no está seguro ──");

// 🔑 Este es el bloque que importa de verdad. Hay dos Mauricios en los pedidos:
// con el nombre de pila solo, y sin ciudad que corrobore, NO se sugiere ninguno.
// Mandarle la novedad de un cliente a otro es peor que no mandar nada.
r = novedades.revisar("10090999 Intento de entrega impermeable Mauricio en alguna parte 1", { datos: {} });
chequear(
  "🔑 con un nombre de pila ambiguo NO sugiere a nadie",
  !r.filas[0].probable && r.filas[0].enviar === false,
  JSON.stringify(r.filas[0].nombre)
);
chequear(
  "y el motivo dice qué números leyó, para poder entenderlo",
  /10090999/.test(r.filas[0].motivoNoEnvio || ""),
  r.filas[0].motivoNoEnvio
);
chequear(
  "y sugiere las dos explicaciones posibles",
  /n[úu]mero anterior/.test(r.filas[0].motivoNoEnvio || "") &&
    /no pas[óo] por el bot/.test(r.filas[0].motivoNoEnvio || "")
);

// Una ciudad sola no alcanza: coincidiría con demasiados pedidos.
r = novedades.revisar("10090998 Intento de entrega en RIOSUCIO/RIOSUCIO 1", { datos: {} });
chequear(
  "la ciudad sola tampoco alcanza para sugerir",
  !r.filas[0].probable,
  JSON.stringify(r.filas[0].nombre)
);

// Un nombre que no está en ningún pedido tampoco inventa nada.
r = novedades.revisar("10090997 Intento de entrega impermeable Wenceslao Pirulero en MARTE 1", { datos: {} });
chequear("un nombre desconocido no sugiere nada", !r.filas[0].probable);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. La guía conocida siempre manda sobre el nombre ──");

// Si la guía cruza, no se usa el rescate: el cruce con nuestros datos es la
// señal fuerte, el nombre es la débil.
r = novedades.revisar(LINEA_OFICINA, { datos: DATOS });
chequear("no se marca probable cuando la guía cruzó", !r.filas[0].probable);
chequear("y el destinatario sale del registro de la guía", r.filas[0].destino === "573025396775");

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. El motivo que 99 Envíos manda de verdad ──");

chequear(
  '"No se localiza dirección del destinatario" se reconoce',
  novedades.clasificar("No se localiza dirección del destinatario").clave === "direccion"
);
chequear(
  '"Reclame en oficina" se reconoce',
  novedades.clasificar("Reclame en oficina Interrapidísimo").clave === "oficina"
);
chequear(
  '"Intento de entrega" se reconoce',
  novedades.clasificar("Intento de entrega").clave === "ausente"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
