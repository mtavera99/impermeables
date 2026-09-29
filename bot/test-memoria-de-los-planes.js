/**
 * 🧠 QUE UN PDF DE GUÍAS NO SE QUEDE EN MEMORIA PARA SIEMPRE.
 *
 * 🔴 POR QUÉ EXISTE: el 30-sep Render mandó "Web Service bikerpro-bot exceeded
 * its memory limit" y reinició la instancia sola.
 *
 * LO QUE SE ENCONTRÓ, y no era una fuga clásica:
 *
 *   1. Cada hoja de un PDF de guías es un PDF COMPLETO de una página, y el plan
 *      las guarda TODAS en memoria mientras el dueño revisa antes de enviar.
 *   2. El TTL de 2 horas se mide desde `creado`, y cuando una guía falla el
 *      código REFRESCA `creado` para poder reintentar sin volver a subir el PDF.
 *      Cada reintento regalaba otras 2 horas.
 *   3. Y el barrido SOLO corría al subir un PDF nuevo. Un plan con una guía que
 *      falló y que no se terminó de reintentar se quedaba con todas sus hojas
 *      hasta el próximo PDF, que puede ser al otro día.
 *
 * Lo que se prueba acá es la lógica de vencimiento, sin pdf-lib: los Buffers se
 * fabrican a mano, que es exactamente lo que ocupa la memoria.
 *
 *   node test-memoria-de-los-planes.js      (sin credenciales ni IA)
 */

const DOS_HORAS = 2 * 60 * 60 * 1000;
const SEIS_HORAS = 6 * 60 * 60 * 1000;

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

// ---------------------------------------------------------------------------
// Las dos funciones del server, replicadas acá con el MISMO criterio. No se
// importa server.js porque arrastra express y las credenciales; lo que importa
// es que la regla de vencimiento sea la que se afirma.
// ---------------------------------------------------------------------------
function hacerPlan(hojas, tamanoKb, creado, nacio) {
  return {
    creado,
    nacio: nacio == null ? creado : nacio,
    filas: Array.from({ length: hojas }, (_, i) => ({
      pagina: i + 1,
      hoja: Buffer.alloc(tamanoKb * 1024),
    })),
  };
}

function barrer(planes, ahora) {
  let liberadas = 0;
  for (const [id, p] of planes) {
    const vencido = ahora - p.creado > DOS_HORAS;
    const demasiadoViejo = ahora - (p.nacio || p.creado) > SEIS_HORAS;
    if (vencido || demasiadoViejo) {
      liberadas += p.filas.filter((f) => f && f.hoja).length;
      planes.delete(id);
    }
  }
  return liberadas;
}

function mbRetenidos(planes) {
  let bytes = 0;
  let hojas = 0;
  for (const p of planes.values()) {
    for (const f of p.filas || []) {
      if (f && f.hoja && f.hoja.length) {
        bytes += f.hoja.length;
        hojas++;
      }
    }
  }
  return { mb: Math.round((bytes / 1048576) * 10) / 10, hojas, planes: planes.size };
}

// ===========================================================================
console.log("\n── 1. Cuánta memoria retiene un PDF de guías de verdad ──");
// Un despacho normal del dueño son 20-40 guías. Cada hoja que pdf-lib genera
// arrastra los recursos compartidos del original (fuentes, logos), así que pesa
// bastante más que "una página".
// ===========================================================================

{
  const planes = new Map();
  planes.set("a", hacerPlan(40, 300, Date.now())); // 40 hojas de 300 KB
  const r = mbRetenidos(planes);
  chequear(
    `40 hojas de 300 KB retienen ${r.mb} MB (y se quedan mientras el dueño revisa)`,
    r.mb >= 11 && r.hojas === 40,
    JSON.stringify(r)
  );
}

{
  // Tres PDFs de un día de trabajo, ninguno terminado de enviar.
  const planes = new Map();
  planes.set("a", hacerPlan(40, 300, Date.now()));
  planes.set("b", hacerPlan(35, 300, Date.now()));
  planes.set("c", hacerPlan(30, 300, Date.now()));
  const r = mbRetenidos(planes);
  chequear(
    `🔴 tres PDFs sin terminar acumulan ${r.mb} MB — esto es lo que tira la instancia`,
    r.mb >= 30,
    JSON.stringify(r)
  );
}

// ===========================================================================
console.log("\n── 2. El plan vence a las 2 horas ──");
// ===========================================================================

{
  const planes = new Map();
  planes.set("fresco", hacerPlan(5, 100, Date.now()));
  chequear("un plan recién hecho NO se borra", barrer(planes, Date.now()) === 0 && planes.size === 1);
}

{
  const planes = new Map();
  const hace3h = Date.now() - 3 * 60 * 60 * 1000;
  planes.set("viejo", hacerPlan(5, 100, hace3h));
  const liberadas = barrer(planes, Date.now());
  chequear("uno de 3 horas se borra", planes.size === 0 && liberadas === 5, `liberadas: ${liberadas}`);
  chequear("  y se reporta cuántas hojas se liberaron", liberadas === 5, String(liberadas));
}

// ===========================================================================
console.log("\n── 3. 🔴 Y no se puede renovar para siempre ──");
// Esto es lo que lo convertía en una fuga de hecho: cada guía que falla refresca
// `creado`, así que reintentando cada rato el plan nunca vencía.
// ===========================================================================

{
  const planes = new Map();
  const nacio = Date.now() - 8 * 60 * 60 * 1000; // nació hace 8 horas
  // Se reintentó hace 5 minutos, así que `creado` está fresquísimo.
  planes.set("renovado", hacerPlan(40, 300, Date.now() - 5 * 60 * 1000, nacio));

  chequear(
    "🔑 un plan renovado sin parar SÍ se libera al pasar el techo de 6 horas",
    barrer(planes, Date.now()) === 40 && planes.size === 0,
    "sin el techo, este plan vivía indefinidamente reintentando"
  );
}

{
  // Pero dentro del techo, renovar tiene que seguir funcionando: es lo que
  // permite reintentar sin volver a subir el PDF.
  const planes = new Map();
  const nacio = Date.now() - 3 * 60 * 60 * 1000; // 3 horas: dentro del techo
  planes.set("renovado", hacerPlan(10, 100, Date.now() - 60 * 1000, nacio));
  chequear(
    "⛔ pero dentro de las 6 horas el reintento sigue vivo (no se rompe el flujo)",
    barrer(planes, Date.now()) === 0 && planes.size === 1,
    "se borró un plan que el dueño todavía podía reintentar"
  );
}

{
  // Un plan viejo SIN `nacio` (los que ya estaban en memoria antes del cambio)
  // no puede reventar el barrido.
  const planes = new Map();
  const p = hacerPlan(3, 50, Date.now() - 7 * 60 * 60 * 1000);
  delete p.nacio;
  planes.set("sin-nacio", p);
  chequear(
    "un plan sin fecha de nacimiento usa `creado` y se limpia igual",
    barrer(planes, Date.now()) === 3 && planes.size === 0
  );
}

// ===========================================================================
console.log("\n── 4. El contador de memoria no miente ──");
// Es el número que va a /health y al log. Si estuviera mal, el próximo correo de
// Render volvería a ser una adivinanza.
// ===========================================================================

{
  chequear("sin planes, 0 MB", mbRetenidos(new Map()).mb === 0);
}

{
  const planes = new Map();
  // 10 hojas de 1 MB exacto.
  planes.set("a", hacerPlan(10, 1024, Date.now()));
  const r = mbRetenidos(planes);
  chequear("10 hojas de 1 MB dan 10 MB", r.mb === 10, JSON.stringify(r));
  chequear("  y cuenta las hojas y los planes", r.hojas === 10 && r.planes === 1, JSON.stringify(r));
}

{
  // Las filas sin hoja (guías repetidas o ya enviadas) no se cuentan como
  // memoria: si se contaran, el número daría falsas alarmas.
  const planes = new Map();
  const p = hacerPlan(4, 1024, Date.now());
  delete p.filas[0].hoja;
  delete p.filas[1].hoja;
  planes.set("a", p);
  const r = mbRetenidos(planes);
  chequear("las filas sin hoja no suman memoria", r.mb === 2 && r.hojas === 2, JSON.stringify(r));
}

// ===========================================================================
// 📈 5. EL PICO DE MEMORIA Y CUÁNDO FUE — 30-sep
//
// DE DÓNDE SALE: la primera lectura de /health del dueño dio proceso 467 MB,
// heap usado 34 MB, buffers 5 MB y 0 hojas retenidas... 80 SEGUNDOS DESPUÉS DE
// ARRANCAR. O sea 467 MB de proceso contra 39 MB de uso real, sin haber hecho
// nada.
//
// 🔑 Y CON UNA SOLA FOTO NO SE PUEDE DECIDIR NADA. Esos 467 MB pueden ser:
//   · el proceso arrancó ya usando eso -> es cómo V8 se dimensiona solo
//   · se infló procesando algo y no devolvió las páginas -> otra causa distinta
// Son arreglos distintos. Por eso se guarda el máximo CON SU HORA y cuánto
// usaba recién arrancado.
//
// Se prueba la lógica del seguidor, que es lo único que puede estar mal acá.
// ===========================================================================
console.log("\n── 5. El pico de memoria y cuándo fue ──");

/** El mismo seguidor del server, para poder probar la regla sin levantarlo. */
function hacerSeguidor() {
  const PICO = { rssMb: 0, heapMb: 0, cuando: null, alArrancarMb: null };
  return {
    PICO,
    medir(rssMb, heapMb, ahora) {
      if (PICO.alArrancarMb === null) PICO.alArrancarMb = rssMb;
      if (rssMb > PICO.rssMb) {
        PICO.rssMb = rssMb;
        PICO.heapMb = heapMb;
        PICO.cuando = ahora;
      }
    },
  };
}

{
  const s = hacerSeguidor();
  s.medir(60, 20, 1000);
  chequear(
    "la primera medición queda como 'al arrancar'",
    s.PICO.alArrancarMb === 60,
    String(s.PICO.alArrancarMb)
  );
  s.medir(467, 400, 2000);
  chequear("y el pico se actualiza al subir", s.PICO.rssMb === 467 && s.PICO.cuando === 2000, JSON.stringify(s.PICO));
  chequear(
    "🔑 'al arrancar' NO se sobreescribe: es lo que distingue las dos causas",
    s.PICO.alArrancarMb === 60,
    `quedó en ${s.PICO.alArrancarMb}, y con eso se pierde la diferencia entre ` +
      `"arrancó gordo" y "se infló procesando algo"`
  );
}

{
  const s = hacerSeguidor();
  s.medir(467, 400, 1000);
  s.medir(120, 90, 2000); // bajó: el pico tiene que quedarse en 467
  chequear(
    "si la memoria baja, el pico se conserva",
    s.PICO.rssMb === 467 && s.PICO.cuando === 1000,
    JSON.stringify(s.PICO)
  );
}

{
  // El caso que hay que poder reconocer: arrancó chico y se infló con un PDF.
  const s = hacerSeguidor();
  s.medir(55, 30, 1000); // arranque
  s.medir(60, 32, 2000);
  s.medir(430, 380, 3000); // subió un PDF
  chequear(
    "🔑 se distingue 'arrancó en 55 y se infló a 430' de 'arrancó en 430'",
    s.PICO.alArrancarMb === 55 && s.PICO.rssMb === 430,
    JSON.stringify(s.PICO)
  );
}

{
  // Y el opuesto: arrancó ya gordo. Acá el arreglo es la bandera de V8, no el PDF.
  const s = hacerSeguidor();
  s.medir(467, 420, 1000);
  s.medir(467, 420, 2000);
  chequear(
    "🔑 y se reconoce 'arrancó ya en 467 y no se movió' (eso apunta a V8, no al PDF)",
    s.PICO.alArrancarMb === 467 && s.PICO.rssMb === 467,
    JSON.stringify(s.PICO)
  );
}

console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos (con el seguidor de memoria).\n`);
process.exit(mal === 0 ? 0 : 1);
