/**
 * EL PLAN DE NOVEDADES TIENE QUE SOBREVIVIR A UN REINICIO.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep). El dueño intentó avisar las primeras
 * novedades por el panel y le salió:
 *
 *     "No salió: el servidor respondió 400"
 *
 * LA CAUSA: avisar novedades tiene dos pasos. "Revisar" calcula a quién se le
 * puede escribir y qué, y guarda ese plan. "Enviar" lo manda. El plan vivía en
 * un `new Map()` en memoria, y Render reinicia el proceso por cualquier cosa —
 * sobre todo un despliegue, y ese día hubo varios seguidos. Al reiniciar, el
 * plan desaparecía y el segundo paso respondía 400.
 *
 * 🔑 Y LO PEOR ES QUE EL ERROR NO SE ENTENDÍA. El dueño hizo todo bien: pegó las
 * novedades, revisó, marcó y le dio enviar. El sistema le contestó "400" por algo
 * que pasó por dentro y que él no podía ni ver ni evitar. Un error que culpa al
 * usuario de un problema nuestro es peor que un error que explica qué pasó.
 *
 * Es la misma familia que la trampa #6 (el log de eventos en memoria) y que los
 * fallos de entrega: estado que importa, guardado donde no sobrevive.
 *
 *   node test-plan-sobrevive.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-plan-novedades";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const RUTA = "./src/store";
const store = require(RUTA);

const TTL = 2 * 60 * 60 * 1000;

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

/** Vuelve a cargar el store de cero: es lo que pasa cuando Render reinicia. */
function reiniciar() {
  delete require.cache[require.resolve(RUTA)];
  return require(RUTA);
}

const FILAS = [
  {
    guia: "9712758",
    destino: "573001112233",
    nombre: "Sonia",
    tipo: "oficina",
    enviar: true,
    porPlantilla: true,
    plantilla: "novedad_oficina",
    parametros: ["Interrapidísimo Bello", "5 días"],
    texto: "Tu pedido está en la oficina de Interrapidísimo Bello, tenés 5 días.",
  },
  {
    guia: "64532758219",
    destino: "573009998877",
    nombre: "Carlos",
    tipo: "direccion",
    enviar: false,
    motivoNoEnvio: "No encontré a quién corresponde esta guía",
  },
];

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. EL BUG: el plan se perdía al reiniciar ──");

store.guardarPlan("novedades", "plan-abc", { filas: FILAS, texto: "pegado crudo" });
chequear("el plan se guarda", !!store.leerPlan("novedades", "plan-abc", TTL));

const tras = reiniciar();
const recuperado = tras.leerPlan("novedades", "plan-abc", TTL);
chequear(
  "🔑 SOBREVIVE al reinicio (esto era el 400)",
  !!recuperado,
  "antes vivía solo en memoria y un despliegue lo borraba"
);
chequear("con todas sus filas", recuperado.filas.length === 2);
chequear(
  "y sin perder los parámetros que completó el dueño",
  recuperado.filas[0].parametros[0] === "Interrapidísimo Bello",
  "la oficina y el plazo no se pueden inventar: si se pierden, no se puede mandar"
);
chequear(
  "la plantilla de cada novedad se conserva",
  recuperado.filas[0].plantilla === "novedad_oficina"
);
chequear(
  "y lo que NO se puede enviar sigue marcado como no enviable",
  recuperado.filas[1].enviar === false,
  "si esto se perdiera, se le escribiría a alguien que no corresponde"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Pero un plan viejo no se manda por error ──");

// El límite ya no es por el reinicio (eso está resuelto): es para que un plan de
// hace horas no se mande, porque la ventana de 24h de esos clientes pudo cambiar
// y un texto libre que antes pasaba ahora lo rechaza Meta.
chequear("con el TTL vencido no se devuelve", tras.leerPlan("novedades", "plan-abc", 0) === null);
chequear("sin TTL se devuelve siempre", !!tras.leerPlan("novedades", "plan-abc"));

// ⚠️ `ttlMs != null` y no `ttlMs`: con `if (ttlMs)` un TTL de 0 se saltaba el
// chequeo y devolvía el plan como fresco. Y `>=` en vez de `>` por la trampa #1,
// el milisegundo: guardar y leer en el mismo instante daba edad 0.
chequear(
  "un TTL de 0 vence TODO, no se salta el chequeo",
  tras.leerPlan("novedades", "plan-abc", 0) === null,
  "con `if (ttlMs)` el 0 era falsy y el plan pasaba como fresco"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. Al enviar, el plan se borra ──");

// Para que no se pueda mandar dos veces la misma novedad al mismo cliente.
tras.borrarPlan("novedades", "plan-abc");
chequear("se borra", tras.leerPlan("novedades", "plan-abc", TTL) === null);
chequear("y sigue borrado tras reiniciar", reiniciar().leerPlan("novedades", "plan-abc", TTL) === null);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. El archivo no crece sin control ──");

const s = reiniciar();
s.guardarPlan("novedades", "viejo-1", { filas: [] });
s.guardarPlan("novedades", "viejo-2", { filas: [] });
s.limpiarPlanesGuardados(0);
chequear("la limpieza borra los vencidos", s.leerPlan("novedades", "viejo-1", TTL) === null);
chequear("los dos", s.leerPlan("novedades", "viejo-2", TTL) === null);

s.guardarPlan("novedades", "fresco", { filas: FILAS });
s.limpiarPlanesGuardados(TTL);
chequear(
  "pero NO borra los frescos",
  !!s.leerPlan("novedades", "fresco", TTL),
  "si borrara los frescos, volveríamos al 400 por otro camino"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Dos planes distintos no se pisan ──");

s.guardarPlan("novedades", "uno", { filas: [FILAS[0]] });
s.guardarPlan("novedades", "dos", { filas: FILAS });
chequear("cada uno guarda lo suyo", s.leerPlan("novedades", "uno", TTL).filas.length === 1);
chequear("y el otro también", s.leerPlan("novedades", "dos", TTL).filas.length === 2);
s.borrarPlan("novedades", "uno");
chequear("borrar uno no borra el otro", !!s.leerPlan("novedades", "dos", TTL));

// Y los tipos no se mezclan: un plan de guías con el mismo id es otro plan.
s.guardarPlan("guias", "dos", { filas: [] });
chequear(
  "el tipo separa: guias:dos no es novedades:dos",
  s.leerPlan("novedades", "dos", TTL).filas.length === 2 &&
    s.leerPlan("guias", "dos", TTL).filas.length === 0
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Si el disco falla, no se cae el envío ──");

// El plan sigue en memoria en el flujo normal: que no se pueda guardar en disco
// solo quita la red de seguridad del reinicio, no rompe el aviso.
chequear("un plan que no existe devuelve null, no explota", s.leerPlan("novedades", "no-existe", TTL) === null);
chequear("borrar algo que no existe no explota", (() => { try { s.borrarPlan("novedades", "nada"); return true; } catch (e) { return false; } })());
chequear(
  "guardar devuelve true/false, para poder avisar sin romper",
  typeof s.guardarPlan("novedades", "x", { filas: [] }) === "boolean"
);

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal === 0 ? 0 : 1);
