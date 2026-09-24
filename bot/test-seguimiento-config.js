/**
 * LA PANTALLA DEL SEGUIMIENTO TIENE QUE DECIR LO QUE EL BOT VA A MANDAR.
 *
 * DE DÓNDE SALE (24-sep): a las 1:33 am el dueño abrió /seguimiento antes de
 * prender el sistema y leyó:
 *
 *   {"activo":false,"plantilla_2":"(sin configurar)","plantilla_3":"(sin configurar)"}
 *
 * Y NO ERA CIERTO. La ruta mostraba `process.env.SEGUIMIENTO_PLANTILLA_2` directo,
 * pero seguimiento.js tiene un default en el código: `seguimiento_impermeable`.
 * O sea: la pantalla decía "no hay plantilla" mientras el bot estaba listo para
 * mandarla.
 *
 * 🔑 POR QUÉ IMPORTA: esa diferencia hace tomar la decisión al revés. Podía
 * prenderlo creyendo que los pasos 2 y 3 no harían nada, y se habrían mandado
 * plantillas de marketing a clientes reales sin que lo supiera. O al contrario:
 * no prenderlo pensando que faltaba configurar algo que ya estaba listo.
 *
 * Una pantalla de diagnóstico que no refleja el estado real es peor que no
 * tenerla: da confianza falsa justo cuando se va a apretar el botón.
 *
 *   node test-seguimiento-config.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-seg-config";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

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

/** Carga seguimiento.js de cero con las variables de entorno que se le pasen. */
function cargarCon(env) {
  for (const k of ["SEGUIMIENTO_ACTIVO", "SEGUIMIENTO_PLANTILLA_2", "SEGUIMIENTO_PLANTILLA_3", "SEGUIMIENTO_IDIOMA"]) {
    delete process.env[k];
  }
  Object.assign(process.env, env || {});
  delete require.cache[require.resolve("./src/seguimiento")];
  return require("./src/seguimiento");
}

// ────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. 🔑 Sin variables de entorno, dice el default REAL del código ──");

{
  const s = cargarCon({});
  const c = s.configuracionEfectiva();
  chequear(
    "NO dice '(sin configurar)' cuando hay un default",
    !/sin configurar/.test(JSON.stringify(c)),
    "es la mentira que hizo dudar al dueño"
  );
  chequear(
    "dice la plantilla que va a mandar en el paso 2",
    c.plantilla_2 === "seguimiento_impermeable",
    `dijo "${c.plantilla_2}"`
  );
  chequear("y la del paso 3", c.plantilla_3 === "seguimiento_impermeable");
  chequear("avisa que viene del código, no de una variable", c.origen.plantilla_2 === "default del código");
  chequear("el idioma efectivo es es_CO", c.idioma === "es_CO");
  chequear("y dice de dónde sale", /default del c[óo]digo/.test(c.origen.idioma));
}

console.log("\n── 2. Si se configura una variable, se respeta y se dice ──");

{
  const s = cargarCon({ SEGUIMIENTO_PLANTILLA_2: "otra_plantilla" });
  const c = s.configuracionEfectiva();
  chequear("usa la variable de entorno", c.plantilla_2 === "otra_plantilla");
  chequear("y lo declara", c.origen.plantilla_2 === "variable de entorno");
  chequear("la que no se tocó sigue con su default", c.plantilla_3 === "seguimiento_impermeable");
  chequear("y lo declara también", c.origen.plantilla_3 === "default del código");
}

console.log("\n── 3. 🔴 es_CO, no es: con 'es' Meta rechaza aunque esté aprobada ──");

{
  const s = cargarCon({});
  chequear("el default del idioma es es_CO", s.configuracionEfectiva().idioma === "es_CO");
  const s2 = cargarCon({ SEGUIMIENTO_IDIOMA: "es" });
  chequear(
    "si alguien pone 'es' se muestra tal cual, para poder verlo y corregirlo",
    s2.configuracionEfectiva().idioma === "es",
    "esconderlo haría que el fallo sea invisible"
  );
}

console.log("\n── 4. El interruptor se refleja ──");

chequear("apagado por defecto", cargarCon({}).configuracionEfectiva().activo === false);
chequear("prendido con 1", cargarCon({ SEGUIMIENTO_ACTIVO: "1" }).configuracionEfectiva().activo === true);
chequear(
  "cualquier otro valor NO lo prende",
  cargarCon({ SEGUIMIENTO_ACTIVO: "true" }).configuracionEfectiva().activo === false,
  "un 'true' mal puesto no puede mandar mensajes sin querer"
);

console.log("\n── 5. Apagado no manda NADA, aunque haya gente esperando ──");

{
  const s = cargarCon({});
  const r = s.correrSeguimientos();
  return Promise.resolve(r).then((res) => {
    chequear("no envía nada", res.enviados === 0);
    chequear("y explica por qué", /SEGUIMIENTO_ACTIVO no esta en 1/.test(res.motivo));
    seguir();
  });
}

function seguir() {
  console.log("\n── 6. Los tres pasos son los acordados ──");

  const s = cargarCon({});
  const H = 60 * 60 * 1000;
  chequear("son 3 pasos", s.PASOS.length === 3);
  chequear("el 1 va a las 20h y es texto libre", s.PASOS[0].desde === 20 * H && s.PASOS[0].tipo === "texto");
  chequear("el 2 va a las 44h y es plantilla", s.PASOS[1].desde === 44 * H && s.PASOS[1].tipo === "plantilla");
  chequear("el 3 va a las 68h y es plantilla", s.PASOS[2].desde === 68 * H && s.PASOS[2].tipo === "plantilla");
  chequear(
    "🔑 el paso 1 cae DENTRO de las 24h (si no, Meta no deja texto libre)",
    s.PASOS[0].hasta <= 24 * H,
    "pasadas las 24h el texto libre se rechaza"
  );
  chequear(
    "🔑 y el paso 3 cierra ANTES de las 72h (si no, deja de ser gratis)",
    s.PASOS[2].hasta <= 72 * H
  );

  console.log("\n── 7. El texto del paso 1 trae el argumento que más cierra ──");

  chequear("menciona contraentrega", /contraentrega/i.test(s.TEXTO_1));
  chequear("aclara que paga al recibir", /pagas cuando lo/i.test(s.TEXTO_1));
  chequear("y termina pidiendo la ciudad, que es lo que desbloquea el total", /ciudad/i.test(s.TEXTO_1));
  chequear("sin presionar con descuentos", !/descuento|oferta|ultima oportunidad/i.test(s.TEXTO_1));

  console.log("\n── 8. La ruta del panel muestra la config efectiva ──");

  const servidor = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
  chequear(
    "la ruta usa configuracionEfectiva()",
    /seguimiento\.configuracionEfectiva\(\)/.test(servidor)
  );
  chequear(
    "🔴 y ya NO lee las variables de entorno directo",
    !/plantilla_2: process\.env\.SEGUIMIENTO_PLANTILLA_2/.test(servidor),
    "volvió la mentira de '(sin configurar)'"
  );
  chequear("sigue pidiendo el token", /app\.get\("\/seguimiento"[\s\S]{0,200}PANEL_TOKEN/.test(servidor));

  console.log("\n── 9. Quién queda fuera del seguimiento ──");

  const src = fs.readFileSync(`${__dirname}/src/seguimiento.js`, "utf8");
  for (const [que, patron] of [
    ["los que ya compraron", /if \(c\.compro\) return null/],
    ["los que pidieron no molestar", /if \(c\.noMolestar\) return null/],
    ["los chats que tomó un humano", /if \(c\.paused\) return null/],
    ["los que ya recibieron 3", /hechos >= 3/],
    ["los que se salieron de las 72h", /edad > 72 \* H/],
  ]) {
    chequear(`quedan fuera ${que}`, patron.test(src));
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
}
