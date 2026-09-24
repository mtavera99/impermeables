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

  console.log("\n── 10. 🔑 SE PUEDE COMPROBAR QUE MANDÓ (lo que faltaba) ──");
  //
  // DE DÓNDE SALE: el dueño prendió el sistema, abrió /seguimiento/correr y leyó
  // `{"revisadas":353,"enviados":0}`. Conclusión natural: "no funcionó". Pero sí
  // había funcionado — `arrancar()` hace la primera pasada 1 minuto después de
  // arrancar, y poner la variable en Render reinicia el servicio, así que el
  // reloj ya había mandado los 6 antes de que él abriera el enlace.
  //
  // El problema era que no había forma de comprobarlo: los que ya recibieron 1 o
  // 2 mensajes caían en `enEspera`, mezclados con los que no recibieron nada. Y
  // el log de eventos no sirve porque vive en memoria y se borra en cada deploy.

  const store2 = require("./src/store");
  const H2 = 60 * 60 * 1000;
  const ahora2 = Date.now();
  for (let i = 0; i < 6; i++) store2.pushMsg("57300111000" + i, "user", "hola");
  for (let i = 0; i < 2; i++) store2.pushMsg("57300222000" + i, "user", "hola");
  {
    const archivo = `${DIR}/conversations.json`;
    const convs = JSON.parse(fs.readFileSync(archivo, "utf8"));
    let n = 0;
    for (const k in convs) {
      convs[k].ultimoDelCliente = ahora2 - 21 * H2;
      convs[k].seguimientos = 1;
      if (n >= 6) convs[k].compro = true; // recibieron seguimiento Y compraron
      n++;
    }
    // Uno que no recibió nada y le toca ahora.
    convs["573009999999"] = {
      messages: [{ role: "user", content: "hola", at: ahora2 }],
      ultimoDelCliente: ahora2 - 21 * H2,
    };
    fs.writeFileSync(archivo, JSON.stringify(convs));
  }
  const s2 = cargarCon({});
  const d = s2.diagnostico();

  chequear(
    `cuenta los que ya recibieron 1 seguimiento (dio ${d.recibieron1})`,
    d.recibieron1 === 8,
    "sin esto no hay forma de saber si el sistema mandó algo"
  );
  chequear(`cuenta el total de mensajes enviados (dio ${d.mensajesEnviados})`, d.mensajesEnviados === 8);
  chequear(
    "🔑 los que recibieron seguimiento Y compraron SIGUEN contando",
    d.compraron === 2 && d.recibieron1 === 8,
    "son justo los que prueban que el seguimiento sirve: se contaban en cero"
  );
  chequear(
    `el que no recibió nada aparece esperando el paso 1 (dio ${d.esperandoPaso1})`,
    d.esperandoPaso1 === 1
  );
  chequear(
    `los que ya tienen 1 quedan esperando las 44h, no en el paso 1 (dio ${d.enEspera})`,
    d.enEspera === 6
  );
  chequear("los contadores arrancan en cero cuando no hay nada", (() => {
    const vacio = { recibieron1: 0, recibieron2: 0, recibieron3: 0 };
    return Object.keys(vacio).every((k) => typeof d[k] === "number");
  })());

  console.log("\n── 11. 🔒 NO SE MANDA DOS VECES AL MISMO CLIENTE ──");
  //
  // DE DÓNDE SALE (24-sep): el seguimiento mandaba primero y registraba después.
  // Durante ese segundo de red el cliente seguía apareciendo como "no le hemos
  // escrito", así que otra corrida podía mandarle lo mismo otra vez.
  //
  // Y no era hipotético: el dueño abrió /seguimiento/correr a mano mientras el
  // reloj automático corre cada 30 min, y en los logs de esa noche aparecieron
  // DOS identificadores de instancia distintos. Con dos procesos sobre el mismo
  // disco, los dos ven seguimientos:0 y los dos mandan.
  //
  // Un cliente que recibe el mismo mensaje de marketing dos veces es una queja y
  // un golpe a la calificación del número, que es lo único que no se compra.

  const st = require("./src/store");
  st.pushMsg("573001112299", "user", "hola");

  chequear(
    "la primera corrida reserva el turno",
    st.reclamarSeguimiento("573001112299", 0) === true
  );
  chequear(
    "🔑 la segunda NO puede reservarlo: no se manda doble",
    st.reclamarSeguimiento("573001112299", 0) === false,
    "el cliente recibiría el mismo mensaje dos veces"
  );
  chequear(
    "el contador quedó en 1, no en 2",
    st.getConv("573001112299").seguimientos === 1
  );
  chequear(
    "el paso siguiente sí se reserva, con el valor correcto",
    st.reclamarSeguimiento("573001112299", 1) === true
  );
  chequear(
    "una conversación que no existe no se puede reservar",
    st.reclamarSeguimiento("573000000000", 0) === false
  );

  const src2 = fs.readFileSync(`${__dirname}/src/seguimiento.js`, "utf8");
  const iReclama = src2.indexOf("reclamarSeguimiento(phone");
  const iManda = src2.indexOf("await sendText(phone, TEXTO_1)");
  chequear(
    "🔑 el código reserva el turno ANTES de mandar",
    iReclama > 0 && iManda > 0 && iReclama < iManda,
    "si manda primero, vuelve la ventana para el mensaje duplicado"
  );
  chequear(
    "ya no registra después de mandar",
    !/await sendText\(phone, TEXTO_1\);\s*\n\s*store\.registrarSeguimiento/.test(src2)
  );
  chequear(
    "⚠️ y la falta de plantilla se revisa ANTES de reservar (si no, se gasta un turno sin mandar)",
    src2.indexOf("falta configurar SEGUIMIENTO_PLANTILLA_") < iReclama
  );
  chequear(
    "un envío rechazado se registra fuerte en el log",
    /NO SE ENTREG[ÓO]|PLANTILLA .* RECHAZADA/.test(src2)
  );
  chequear(
    "y el mensaje de error explica qué mirar si la plantilla tiene variables",
    /variables \{\{1\}\}/.test(src2)
  );

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
}
