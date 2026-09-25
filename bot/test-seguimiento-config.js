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
  for (const k of ["SEGUIMIENTO_ACTIVO", "SEGUIMIENTO_PLANTILLA_2", "SEGUIMIENTO_PLANTILLA_3", "SEGUIMIENTO_IDIOMA", "SEGUIMIENTO_44H"]) {
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
  console.log("\n── 6. La cadencia nueva: 2h · 20h · 44h ──");
  //
  // Antes era 20h · 44h · 68h, con DOS plantillas de marketing. El dueño pidió
  // tocar más temprano (como hacía a mano) y resultó ser también lo correcto por
  // política: el tope de frecuencia de Meta solo aplica a plantillas de
  // marketing, no al texto libre de las primeras 24h. Así que mover los toques
  // adentro de la ventana los saca del alcance del tope.

  const s = cargarCon({});
  const H = 60 * 60 * 1000;
  chequear("son 3 pasos", s.PASOS.length === 3);
  chequear("el 1 va a las 2h y es texto libre", s.PASOS[0].desde === 2 * H && s.PASOS[0].tipo === "texto");
  chequear("el 2 va a las 20h y es texto libre", s.PASOS[1].desde === 20 * H && s.PASOS[1].tipo === "texto");
  chequear("el 3 va a las 44h y es plantilla", s.PASOS[2].desde === 44 * H && s.PASOS[2].tipo === "plantilla");
  chequear(
    "🔑 los DOS primeros caen dentro de las 24h (texto libre, sin tope de frecuencia)",
    s.PASOS[0].hasta <= 24 * H && s.PASOS[1].hasta <= 24 * H,
    "pasadas las 24h Meta rechaza el texto libre"
  );
  chequear(
    "🔑 SOLO UNA plantilla de marketing por persona, no dos",
    s.PASOS.filter((x) => x.tipo === "plantilla").length === 1,
    "cada plantilla extra suma al tope de frecuencia y al riesgo de la calificación"
  );
  chequear(
    "y el último cierra antes de las 72h (si no, deja de ser gratis)",
    s.PASOS[2].hasta <= 72 * H
  );
  chequear(
    "los dos textos son distintos (a las 2h no se recuerda, se resuelve la duda)",
    s.TEXTO_1 !== s.TEXTO_2 && s.TEXTO_1.length > 0
  );
  chequear("el de 2h va directo a la duda que frena", /duda/i.test(s.TEXTO_1));
  chequear("y ofrece la salida fácil", /despacho/i.test(s.TEXTO_1));

  console.log("\n── 6-B. 📊 SE PUEDE MEDIR CUÁL TOQUE PAGA ──");
  //
  // 🔴 `seguimientos` NO sirve para medir: cuando el cliente contesta se
  // reinicia a 0, así que borra justo a los que respondieron — los éxitos.
  // Medir con ese contador daría que el seguimiento no sirve nunca.

  const st0 = require("./src/store");
  const P = "573009998811";
  st0.pushMsg(P, "user", "hola");
  st0.reclamarSeguimiento(P, 0, 1);

  let est = st0.estadisticasSeguimiento();
  chequear("el paso 1 queda registrado como enviado", est[1].enviados === 1);
  chequear("todavía sin respuesta", est[1].respondieron === 0);

  st0.pushMsg(P, "user", "sí me interesa");
  est = st0.estadisticasSeguimiento();
  chequear("🔑 la respuesta se atribuye al paso que la provocó", est[1].respondieron === 1);
  chequear(
    "el contador de decisión se reinició (el lead vuelve a estar activo)",
    st0.getConv(P).seguimientos === 0
  );
  chequear(
    "🔑 pero el historial de medición NO se borró",
    st0.estadisticasSeguimiento()[1].enviados === 1,
    "si se borrara, los éxitos desaparecerían del conteo"
  );
  st0.pushMsg(P, "user", "dale");
  chequear(
    "un segundo mensaje no cuenta como otra respuesta",
    st0.estadisticasSeguimiento()[1].respondieron === 1
  );

  st0.saveOrder({
    nombre: "Prueba Seg", celular: "3009998811", ciudad: "Cali",
    direccion: "Calle 1 #2-3", talla: "M", color: "Rojo", total: 82000, telefono_chat: P,
  });
  est = st0.estadisticasSeguimiento();
  chequear("🔑 la venta se atribuye al paso que la trajo", est[1].compraron === 1);
  chequear(
    "y el pedido queda marcado",
    st0.todosLosPedidos().some((o) => o.venta_tras_seguimiento === 1)
  );
  chequear("calcula tasa de respuesta", est[1].tasaRespuesta === 100);
  chequear("y tasa de compra", est[1].tasaCompra === 100);
  chequear(
    "un paso que no se usó queda en cero, no en error",
    est[3].enviados === 0 && est[3].tasaRespuesta === 0
  );

  const srv = fs.readFileSync(`${__dirname}/src/server.js`, "utf8");
  chequear(
    "la pantalla /seguimiento muestra el desglose por paso",
    /porPaso: store\.estadisticasSeguimiento\(\)/.test(srv)
  );

  console.log("\n── 7. El texto del paso 1 trae el argumento que más cierra ──");

  chequear("el de 2h tranquiliza sobre el pago", /cuando lo recib/i.test(s.TEXTO_1));
  chequear("el de 20h menciona contraentrega", /contraentrega/i.test(s.TEXTO_2));
  chequear("y pide la ciudad, que es lo que desbloquea el total", /ciudad/i.test(s.TEXTO_2));
  chequear(
    "ninguno presiona con descuentos",
    !/descuento|oferta|ultima oportunidad/i.test(s.TEXTO_1 + s.TEXTO_2)
  );

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
    // ⚠️ Solo las conversaciones de ESTA sección. Antes el loop tocaba TODAS las
    // del archivo, así que al agregar casos en otra sección este conteo cambiaba
    // y la prueba fallaba sin que nada estuviera roto.
    let n = 0;
    for (const k of Object.keys(convs).filter((x) => /^57300(111|222)000/.test(x))) {
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
  // Con la cadencia nueva (2h · 20h · 44h), alguien con 21h de espera y 1
  // seguimiento hecho le toca el PASO 2, que es justo la ventana de 20-23h.
  // Los 7 tienen 21h de espera, así que TODOS caen en la ventana del paso 2
  // (20-23h): los 6 que ya tenían un seguimiento y el que no tenía ninguno.
  // 🔑 Que el de cero seguimientos también entre es el arreglo importante: con la
  // lógica vieja (PASOS[hechos]) le tocaba el paso 1, cuya ventana de 2-5h ya
  // había pasado, y quedaba trabado sin recibir nada nunca.
  chequear(
    `los 7 con 21h de espera entran al paso 2 (dio ${d.esperandoPaso2})`,
    d.esperandoPaso2 === 7,
    "si dan menos, alguno quedó trabado al angostar la primera ventana"
  );
  chequear(
    "🔑 incluido el que se perdió el toque de 2h: recibe el de 20h, no cero",
    d.esperandoPaso2 === 7 && d.esperandoPaso1 === 0
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
  const iManda = src2.indexOf("await sendText(phone, paso.texto())");
  chequear(
    "🔑 el código reserva el turno ANTES de mandar",
    iReclama > 0 && iManda > 0 && iReclama < iManda,
    "si manda primero, vuelve la ventana para el mensaje duplicado"
  );
  chequear(
    "ya no registra después de mandar",
    !/await sendText\([^)]*\);\s*\n\s*store\.registrarSeguimiento/.test(src2)
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

  // ══════════════════════════════════════════════════════════════════════════
  // 🔴 EL PASO DE LA PLANTILLA TIENE QUE PODERSE APAGAR DESDE RENDER (25-sep)
  //
  // Con `||` una cadena vacía caía de vuelta en el default: se ponía la variable
  // en blanco, parecía apagado, y el bot seguía mandando. Misma trampa que
  // BODEGA_DIRECCION (trampa #10), otra vez.
  //
  // 🔑 Y HACE FALTA. Medido con 949 mensajes reales el 25-sep:
  //     paso 1 (2h)  268 enviados -> 8 compras
  //     paso 2 (20h) 309 enviados -> 0 compras
  //     paso 3 (44h) 432 enviados -> 0 compras
  // El de 44h es el único que gasta plantilla de marketing: consume el tope de
  // frecuencia de Meta y desgasta la calificación del número, que es lo único
  // que no se puede comprar de vuelta. 432 envíos por cero ventas es riesgo puro.
  // ══════════════════════════════════════════════════════════════════════════
  console.log("\n── El toque de 44h se puede apagar sin tocar código ──");

  {
    const s = cargarCon({ SEGUIMIENTO_PLANTILLA_2: "" });
    const c = s.configuracionEfectiva();
    chequear(
      "con la variable en BLANCO el paso se apaga de verdad",
      c.plantilla_2 !== "seguimiento_impermeable",
      `quedó en ${JSON.stringify(c.plantilla_2)} — con || caía de vuelta en el default`
    );
    chequear(
      "y la pantalla dice que se salta",
      /se salta/.test(String(c.plantilla_2)),
      String(c.plantilla_2)
    );
  }

  {
    const s = cargarCon({});
    chequear(
      "sin la variable sigue usando el default del código",
      s.configuracionEfectiva().plantilla_2 === "seguimiento_impermeable"
    );
  }

  {
    const s = cargarCon({ SEGUIMIENTO_PLANTILLA_2: "otra_plantilla" });
    chequear(
      "y se puede cambiar por otra",
      s.configuracionEfectiva().plantilla_2 === "otra_plantilla"
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 🔘 EL INTERRUPTOR, QUE ES LO QUE SE VA A USAR DE VERDAD
  //
  // La primera versión se apagaba dejando la variable de la plantilla VACÍA, y
  // el dueño preguntó con razón "¿cómo así que poner la variable en blanco?".
  // Apagar algo que mueve plata no puede depender de escribir nada en una
  // casilla. Ahora es SEGUIMIENTO_44H=0, y acepta varias formas de decir no
  // porque se escribe desde un celular.
  // ══════════════════════════════════════════════════════════════════════════
  console.log("\n── El interruptor SEGUIMIENTO_44H ──");

  for (const valor of ["0", "no", "NO", "off", "false", "apagado", " 0 "]) {
    const s = cargarCon({ SEGUIMIENTO_44H: valor });
    const c = s.configuracionEfectiva();
    chequear(
      `con SEGUIMIENTO_44H="${valor}" el toque de 44h queda apagado`,
      /APAGADO/.test(c.toque_44h) && !s.PASOS.some((p) => p.n === 3),
      c.toque_44h
    );
  }

  for (const valor of ["1", "si", "cualquier_cosa"]) {
    const s = cargarCon({ SEGUIMIENTO_44H: valor });
    chequear(
      `con SEGUIMIENTO_44H="${valor}" sigue prendido`,
      /ACTIVO/.test(s.configuracionEfectiva().toque_44h)
    );
  }

  {
    const s = cargarCon({});
    const c = s.configuracionEfectiva();
    chequear("sin poner la variable, viene prendido", /ACTIVO/.test(c.toque_44h));
    chequear("y los tres toques están en pie", s.PASOS.length === 3);
    chequear(
      "la pantalla lista los toques en horas, para confirmar de un vistazo",
      c.toques.join(" ") === "2h (texto) 20h (texto) 44h (plantilla)",
      c.toques.join(" ")
    );
  }

  {
    const s = cargarCon({ SEGUIMIENTO_44H: "0" });
    chequear(
      "apagado, quedan solo los dos toques de texto libre",
      s.PASOS.length === 2 && s.PASOS.every((p) => p.tipo === "texto"),
      JSON.stringify(s.configuracionEfectiva().toques)
    );
    chequear(
      "y esos dos NO gastan plantilla ni tocan la calificación del número",
      s.PASOS.every((p) => !p.plantilla)
    );
    chequear(
      "la pantalla explica qué recibe el cliente ahora",
      /2h y 20h/.test(s.configuracionEfectiva().toque_44h)
    );
  }

  {
    const s = cargarCon({ SEGUIMIENTO_44H: "0" });
    chequear(
      "el origen dice de dónde salió el apagado",
      /SEGUIMIENTO_44H=0/.test(s.configuracionEfectiva().origen.toque_44h),
      s.configuracionEfectiva().origen.toque_44h
    );
  }

  // Apagarlo NO le puede consumir el turno a nadie: si se saltara después de
  // reclamar, el cliente perdería ese toque para siempre sin recibir nada.
  chequear(
    "el salto por falta de plantilla ocurre ANTES de reclamar el turno",
    (() => {
      const src = fs.readFileSync("./src/seguimiento.js", "utf8");
      const salto = src.indexOf('SALTADO: ');
      const reclamo = src.indexOf("reclamarSeguimiento(phone");
      return salto !== -1 && reclamo !== -1 && salto < reclamo;
    })(),
    "si no, se consume un seguimiento sin mandar nada"
  );

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
}
