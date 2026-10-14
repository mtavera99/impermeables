/**
 * NINGUNA RUTA SE QUEDA SIN CONTESTAR.
 *
 * LA TRAMPA: express 4 no entiende los handlers `async`. Si uno lanza, la promesa
 * queda rechazada, Express no se entera, y la petición se queda abierta PARA
 * SIEMPRE. En el navegador eso no es un error: es un fetch que nunca resuelve ni
 * rechaza, así que el .catch no corre, el .finally no corre, y el botón queda
 * gris hasta recargar la página.
 *
 * Es la misma forma de fallar que el botón Enviar de novedades, que estuvo roto 3
 * días sin que nada lo avisara. Lo que mata no es el error: es el silencio.
 *
 * ⚠️ HONESTIDAD SOBRE DE DÓNDE SALE: el 28-sep el dueño reportó que la pantalla
 * de guías "se queda ahí sin leer nada" y yo diagnostiqué esto. Me corrigió: no
 * estaba colgada, estaba tardando. Así que esto NO arregló ese problema —eso se
 * arregló mostrando el contador de segundos—. Esto es la red por si pasa de
 * verdad, y son 17 rutas async las que podrían hacerlo.
 *
 *   node test-rutas-no-cuelgan.js      (sin credenciales ni IA)
 */

const { proteger, protegerHandler } = require("./src/rutas-protegidas");

// express no está instalado en el sandbox de desarrollo. La parte de abajo que lo
// necesita se salta con un aviso claro, en vez de dar un falso verde; en CI, que
// sí lo tiene, se corre completa.
let express = null;
try {
  express = require("express");
} catch (e) {
  express = null;
}

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

// Se silencia el console.error del módulo: el fallo es esperado en las pruebas.
const errorDeVerdad = console.error;
console.error = () => {};

(async () => {
  // =========================================================================
  console.log("\n── 0. La lógica de envolver, sin depender de express ──");
  // Esto corre en cualquier parte. Es la parte que escribí yo; la integración
  // con express de verdad se prueba más abajo.
  // =========================================================================
  {
    /** Un res falso que anota qué se contestó. */
    const resFalso = () => {
      const r = {
        headersSent: false,
        codigo: null,
        cuerpo: null,
        status(c) { r.codigo = c; return r; },
        json(b) { r.cuerpo = b; r.headersSent = true; return r; },
      };
      return r;
    };
    const reqFalso = { method: "POST", path: "/prueba", get: () => "", is: () => false };

    // Async que explota
    {
      const res = resFalso();
      const envuelto = protegerHandler(async () => { throw new Error("tronó"); });
      await envuelto(reqFalso, res);
      await new Promise((r) => setImmediate(r)); // que corra el .catch
      chequear("🔑 una async que explota termina contestando 500", res.codigo === 500, String(res.codigo));
      chequear("  con ok:false y el motivo adentro", res.cuerpo?.ok === false && /tronó/.test(res.cuerpo?.error || ""), JSON.stringify(res.cuerpo));
      chequear("  y avisando que no se envió nada", /No se envió nada/.test(res.cuerpo?.error || ""), JSON.stringify(res.cuerpo));
    }
    // Sincrónico que explota
    {
      const res = resFalso();
      const envuelto = protegerHandler(() => { throw new Error("tronó sync"); });
      envuelto(reqFalso, res);
      chequear("una sincrónica que explota también contesta 500", res.codigo === 500, String(res.codigo));
    }
    // Si ya contestó, no vuelve a contestar
    {
      const res = resFalso();
      res.headersSent = true;
      const envuelto = protegerHandler(() => { throw new Error("tarde"); });
      envuelto(reqFalso, res);
      chequear("⛔ si ya se había contestado, no contesta dos veces", res.codigo === null, String(res.codigo));
    }
    // Una que anda bien no se toca
    {
      const res = resFalso();
      const envuelto = protegerHandler((req, r) => r.status(200).json({ ok: true, intacto: true }));
      envuelto(reqFalso, res);
      chequear("una que anda bien pasa de largo", res.codigo === 200 && res.cuerpo?.intacto === true, JSON.stringify(res.cuerpo));
    }
    // Los manejadores de error de express (4 parámetros) no se tocan
    {
      const manejadorDeError = (err, req, res, next) => res.status(500).send("x");
      chequear("🔑 un handler de 4 parámetros se devuelve tal cual", protegerHandler(manejadorDeError) === manejadorDeError);
      const normal = (req, res) => res.send("ok");
      chequear("y uno normal sí se envuelve", protegerHandler(normal) !== normal);
      chequear("lo que no es función se devuelve tal cual", protegerHandler("no soy función") === "no soy función");
    }
    // proteger() no explota si al objeto le falta un método
    {
      const falso = { get: () => {} };
      chequear("proteger() aguanta un app al que le faltan métodos", proteger(falso) === falso);
    }
  }

  if (!express) {
    console.error = errorDeVerdad;
    console.log("\n⚠️  express no está instalado acá, así que se saltan las pruebas");
    console.log("   contra un servidor de verdad (secciones 1 a 6). En CI sí corren.");
    console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
    process.exit(mal === 0 ? 0 : 1);
  }

  const app = express();
  app.use(express.json());
  proteger(app); // 👈 lo que se está probando

  // Una ruta async que explota. Sin protección, esto cuelga para siempre.
  app.get("/explota-async", async () => {
    throw new Error("me rompí adentro de un async");
  });

  // Una que explota de forma sincrónica.
  app.get("/explota-sync", () => {
    throw new Error("me rompí sincrónico");
  });

  // Una que explota DESPUÉS de haber empezado a responder.
  app.get("/explota-tarde", async (req, res) => {
    res.status(200).json({ ok: true, parcial: true });
    throw new Error("me rompí después de contestar");
  });

  // Y las normales, que tienen que seguir andando igual.
  app.get("/bien-sync", (req, res) => res.json({ ok: true, como: "sync" }));
  app.get("/bien-async", async (req, res) => res.json({ ok: true, como: "async" }));
  app.post("/bien-post", (req, res) => res.json({ ok: true, recibido: req.body }));

  // Con middleware adelante, como /guias/revisar que usa express.raw.
  app.post("/con-middleware", express.raw({ type: "application/pdf" }), async (req, res) => {
    res.json({ ok: true, bytes: Buffer.isBuffer(req.body) ? req.body.length : 0 });
  });
  app.post("/con-middleware-que-explota", express.raw({ type: "application/pdf" }), async () => {
    throw new Error("exploté después del middleware");
  });

  const servidor = app.listen(0);
  await new Promise((r) => servidor.on("listening", r));
  const base = "http://127.0.0.1:" + servidor.address().port;

  /** Pide una ruta con LÍMITE DE TIEMPO: si cuelga, la prueba falla en vez de
   *  quedarse esperando para siempre (que es justo el bug). */
  async function pedir(ruta, opciones = {}) {
    const abortador = new AbortController();
    const corte = setTimeout(() => abortador.abort(), 4000);
    try {
      const res = await fetch(base + ruta, { ...opciones, signal: abortador.signal });
      const cuerpo = await res.json().catch(() => ({}));
      return { status: res.status, cuerpo, colgo: false };
    } catch (e) {
      return { status: 0, cuerpo: {}, colgo: e.name === "AbortError", error: e.message };
    } finally {
      clearTimeout(corte);
    }
  }

  // =========================================================================
  console.log("\n── 1. Una ruta async que explota CONTESTA, no cuelga ──");
  // =========================================================================
  {
    const r = await pedir("/explota-async");
    chequear("🔑 no se queda colgada (esto es el bug)", !r.colgo, r.error);
    chequear("contesta 500", r.status === 500, `dio ${r.status}`);
    chequear("con ok:false, que es lo que el panel sabe leer", r.cuerpo.ok === false, JSON.stringify(r.cuerpo));
    chequear(
      "🔑 y dice que NO se envió nada, para que el dueño no quede en duda",
      /No se envió nada/.test(r.cuerpo.error || ""),
      JSON.stringify(r.cuerpo)
    );
    chequear(
      "  e incluye el error de verdad, para poder arreglarlo",
      /me rompí adentro de un async/.test(r.cuerpo.error || ""),
      JSON.stringify(r.cuerpo)
    );
  }

  // =========================================================================
  console.log("\n── 2. Y también si explota de forma sincrónica ──");
  // =========================================================================
  {
    const r = await pedir("/explota-sync");
    chequear("no cuelga", !r.colgo);
    chequear("contesta 500 con JSON legible", r.status === 500 && r.cuerpo.ok === false, JSON.stringify(r.cuerpo));
  }

  // =========================================================================
  console.log("\n── 3. Las rutas que funcionan siguen funcionando ──");
  // Una red de seguridad que rompe lo que andaba no sirve de nada.
  // =========================================================================
  {
    const a = await pedir("/bien-sync");
    chequear("una ruta normal sigue igual", a.status === 200 && a.cuerpo.como === "sync", JSON.stringify(a));

    const b = await pedir("/bien-async");
    chequear("una async que anda bien sigue igual", b.status === 200 && b.cuerpo.como === "async", JSON.stringify(b));

    const c = await pedir("/bien-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hola: "mundo" }),
    });
    chequear("un POST con JSON sigue llegando entero", c.cuerpo.recibido?.hola === "mundo", JSON.stringify(c));
  }

  // =========================================================================
  console.log("\n── 4. Con middleware adelante, como el PDF de las guías ──");
  // /guias/revisar usa express.raw antes del handler. Envolver mal el middleware
  // rompería la subida del PDF, que es justo lo que hay que no romper.
  // =========================================================================
  {
    const pdf = Buffer.from("%PDF-1.4 esto es un pdf de mentira");
    const r = await pedir("/con-middleware", {
      method: "POST",
      headers: { "Content-Type": "application/pdf" },
      body: pdf,
    });
    chequear(
      "🔑 el cuerpo crudo llega completo (el PDF no se rompe)",
      r.status === 200 && r.cuerpo.bytes === pdf.length,
      JSON.stringify(r.cuerpo) + " esperaba " + pdf.length
    );

    const r2 = await pedir("/con-middleware-que-explota", {
      method: "POST",
      headers: { "Content-Type": "application/pdf" },
      body: pdf,
    });
    chequear("y si el handler explota después del middleware, contesta igual", !r2.colgo && r2.status === 500, JSON.stringify(r2));
  }

  // =========================================================================
  console.log("\n── 5. Si ya contestó, no intenta contestar dos veces ──");
  // Responder dos veces tira un ERR_HTTP_HEADERS_SENT y ensucia los logs con un
  // error que no es el problema real.
  // =========================================================================
  {
    const r = await pedir("/explota-tarde");
    chequear(
      "la respuesta que alcanzó a salir se respeta",
      r.status === 200 && r.cuerpo.parcial === true,
      JSON.stringify(r)
    );
  }

  // =========================================================================
  console.log("\n── 6. Los manejadores de error de Express no se tocan ──");
  // Tienen 4 parámetros y Express los reconoce por eso. Envolverlos les cambiaría
  // la cantidad de parámetros y dejarían de funcionar como manejadores de error.
  // =========================================================================
  {
    // Con express de verdad: un manejador de error registrado con app.use tiene
    // que seguir atrapando errores.
    let atrapo = false;
    app.get("/para-el-manejador", (req, res, next) => next(new Error("al manejador")));
    app.use((err, req, res, next) => {
      atrapo = true;
      res.status(503).json({ ok: false, porElManejador: true });
    });
    const r = await pedir("/para-el-manejador");
    chequear(
      "🔑 el manejador de errores de express sigue funcionando",
      atrapo && r.status === 503 && r.cuerpo.porElManejador === true,
      JSON.stringify(r)
    );
  }

  servidor.close();
  console.error = errorDeVerdad;
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
