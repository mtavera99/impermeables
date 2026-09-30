/**
 * AL DARLE ENVIAR, LOS DATOS DE LAS NOVEDADES DE OFICINA NO SE PUEDEN BORRAR.
 *
 * 🔴 EL CASO REAL (30-sep). El dueño intentó avisar sus novedades y TODAS las
 * filas volvieron con el mismo error, aunque las había completado:
 *
 *     🔴 juancarlosgraciaalzate · guía 240062298808
 *     Falta completar en qué oficina está y hasta cuándo tiene para reclamarlo.
 *
 * Y no era la primera vez: pasaba cada vez que lo intentaba.
 *
 * LA CAUSA. Una novedad de "reclame en oficina" necesita dos datos que solo
 * puede dar el dueño (en qué oficina y hasta cuándo) — el bot no los inventa
 * desde el 14-sep, cuando prometió una oficina de Servientrega que no existía y
 * la clienta lo leyó.
 *
 * El envío recalculaba el plan con los datos que mandaba el navegador. Pero el
 * navegador solo puede mandar los campos que están DIBUJADOS, y una fila que ya
 * quedó resuelta deja de dibujarlos (pasa a mostrar el mensaje que se va a
 * enviar). Entonces sus datos no viajaban, el recálculo no los encontraba, y la
 * fila volvía a bloquearse — después de que el dueño la había completado y
 * marcado.
 *
 * Y se agravaba solo: bastaba UNA fila sin resolver para que el recálculo se
 * disparara y borrara los datos de TODAS las que ya estaban listas.
 *
 * EL ARREGLO. Los datos viven en el plan y se ACUMULAN. Lo que llega nuevo manda
 * sobre lo guardado (una corrección a mano tiene que ganar), pero lo que no llega
 * no se borra. Y los vacíos se descartan: un campo vacío no es una corrección.
 *
 * Esta batería levanta el servidor de verdad y le pega a los endpoints, porque el
 * bug no estaba en el parser —que ya tenía pruebas y pasaban— sino en cómo el
 * endpoint de envío rearmaba el plan.
 *
 *   node test-novedades-datos-no-se-borran.js      (sin credenciales ni IA)
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "nov-datos-"));
const TOKEN = "clave-de-prueba";
const PUERTO = 3000 + Math.floor(Math.random() * 1000);

process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = TOKEN;
process.env.PORT = String(PUERTO);
process.env.AI_PROVIDER = "gemini";
process.env.GEMINI_API_KEY = "clave-falsa-de-prueba";
delete process.env.OWNER_PHONE;
// ⚠️ Credenciales FALSAS pero presentes: sin ellas `sendPayload` corta antes de
// llamar a Meta y no se puede comprobar QUÉ se habría enviado. La salida está
// interceptada más abajo, así que no sale nada a la red.
process.env.WHATSAPP_TOKEN = "token-falso-de-prueba";
process.env.WHATSAPP_PHONE_NUMBER_ID = "000000000000000";

// 🎭 Se intercepta la salida a Meta: esta batería NO puede mandar un mensaje.
// Devuelve ok para poder comprobar que una fila SÍ se habría enviado.
//
// ⚠️ El fetch de verdad se guarda ANTES de reemplazarlo. Si se guardara después,
// `realFetch` sería el propio mock y las llamadas al servidor de prueba entrarían
// en recursión infinita.
const realFetch = global.fetch;
const enviados = [];
global.fetch = async (url, opts) => {
  if (String(url).includes("graph.facebook.com")) {
    let cuerpo = {};
    try {
      cuerpo = JSON.parse((opts && opts.body) || "{}");
    } catch {}
    enviados.push(cuerpo);
    return {
      ok: true,
      status: 200,
      async json() {
        return { messages: [{ id: "wamid.prueba" }] };
      },
      async text() {
        return "{}";
      },
    };
  }
  return realFetch(url, opts);
};

const store = require("./src/store");

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

const G1 = "240062298808";
const G2 = "240062298843";
const G3 = "240062298853";

/** Deja un pedido despachado con su guía y la ventana de 24h CERRADA. */
function pedidoConGuia(tel, guia, nombre) {
  store.saveOrder({
    nombre,
    celular: tel.slice(2),
    telefono_chat: tel,
    ciudad: "Montería",
    direccion: "Calle 1 # 2-3",
    talla: "L",
    color: "Negro",
    unidades: 1,
    total: 85000,
    pago: "contraentrega",
  });
  const p = store.todosLosPedidos().find((x) => x.telefono_chat === tel);
  // ⚠️ Por `id` y NO por `fecha`. Tres pedidos creados en el mismo milisegundo
  // comparten `fecha`, y `anotarGuiaEnPedido` busca por fecha como último
  // recurso: las tres guías terminaban escritas en el mismo pedido y dos
  // novedades salían como "no encontré a quién corresponde esta guía".
  store.anotarGuiaEnPedido(p.id, guia);
  store.pushMsg(tel, "user", "hola");
}

function cerrarLasVentanas() {
  const F = path.join(DIR, "conversations.json");
  const c = JSON.parse(fs.readFileSync(F, "utf8"));
  const viejo = Date.now() - 40 * 60 * 60 * 1000; // 40h: la ventana está cerrada
  for (const k of Object.keys(c)) c[k].ultimoDelCliente = viejo;
  fs.writeFileSync(F, JSON.stringify(c));
}

const base = `http://127.0.0.1:${PUERTO}`;
const pedir = async (ruta, cuerpo) => {
  const r = await realFetch(base + ruta, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, ...cuerpo }),
  });
  return { status: r.status, cuerpo: await r.json() };
};

(async () => {
  pedidoConGuia("573001112233", G1, "Juan Carlos Gracia");
  pedidoConGuia("573004445566", G2, "Yeison Ruiz");
  pedidoConGuia("573007778899", G3, "Marcela Bohorquez");
  cerrarLasVentanas();

  require("./src/server"); // arranca a escuchar en PUERTO
  await new Promise((r) => setTimeout(r, 400));

  const TEXTO = [
    `${G1}  Reclame en oficina`,
    `${G2}  Reclame en oficina`,
    `${G3}  Reclame en oficina`,
  ].join("\n");

  // =========================================================================
  console.log("\n── 1. Las tres piden datos: el bot no los inventa ──");
  // =========================================================================
  {
    const { cuerpo } = await pedir("/novedades/revisar", { texto: TEXTO });
    chequear("revisar responde ok", cuerpo.ok !== false, JSON.stringify(cuerpo).slice(0, 120));
    chequear("lee las 3 novedades", cuerpo.filas && cuerpo.filas.length === 3, cuerpo.filas && String(cuerpo.filas.length));
    chequear(
      "🔑 las 3 quedan bloqueadas pidiendo oficina y plazo",
      cuerpo.filas.every((f) => !f.enviar && f.pidoDatos),
      JSON.stringify(cuerpo.filas.map((f) => ({ g: f.guia, e: f.enviar })))
    );
    chequear(
      "  y lo dice con el motivo del dueño, no un error seco",
      cuerpo.filas.every((f) => /oficina/i.test(f.motivoNoEnvio || "")),
      cuerpo.filas[0].motivoNoEnvio
    );
  }

  // =========================================================================
  console.log("\n── 2. EL BUG: completo dos, dejo una, y le doy Enviar ──");
  //
  // Es exactamente lo que hizo el dueño. Antes del arreglo, las dos que había
  // completado volvían con "Falta completar en qué oficina está".
  // =========================================================================
  {
    // Revisar con dos completadas y la tercera sin oficina.
    const datos = {
      [G1]: { oficina: "Interrapidísimo Montería", plazo: "el 5 de octubre" },
      [G2]: { oficina: "Interrapidísimo Cereté", plazo: "el 5 de octubre" },
      [G3]: { oficina: "", plazo: "el 5 de octubre" },
    };
    const rev = await pedir("/novedades/revisar", { texto: TEXTO, datos });
    const listas = rev.cuerpo.filas.filter((f) => f.enviar);
    chequear("las dos completadas quedan listas", listas.length === 2, `quedaron ${listas.length}`);
    chequear("la tercera sigue pidiendo la oficina", rev.cuerpo.filas.filter((f) => f.pidoDatos).length === 1);

    // El navegador solo puede mandar los campos DIBUJADOS: los de la fila 3.
    // Las filas 1 y 2 ya no los dibujan, así que sus datos no viajan.
    const indices = rev.cuerpo.filas.map((f, i) => (f.enviar ? i : -1)).filter((i) => i >= 0);
    const antes = enviados.length;
    const env = await pedir("/novedades/enviar", {
      id: rev.cuerpo.id,
      indices,
      datos: { [G3]: { oficina: "", plazo: "el 5 de octubre" } },
    });

    chequear("enviar responde ok", env.cuerpo.ok === true, JSON.stringify(env.cuerpo).slice(0, 140));
    chequear(
      "🔑 las dos que estaban listas SE ENVIARON",
      env.cuerpo.enviados === 2,
      `enviados=${env.cuerpo.enviados} · fallaron=${env.cuerpo.fallaron} · ` +
        JSON.stringify((env.cuerpo.resultados || []).map((r) => r.error).filter(Boolean))
    );
    chequear(
      "⛔ y NINGUNA volvió con «Falta completar…» (era el bug)",
      !(env.cuerpo.resultados || []).some((r) => /Falta completar/i.test(r.error || "")),
      JSON.stringify(env.cuerpo.resultados)
    );
    chequear("salieron 2 mensajes a Meta", enviados.length - antes === 2, `salieron ${enviados.length - antes}`);
    chequear(
      "  y van por plantilla, que es lo único que Meta entrega con la ventana cerrada",
      enviados.slice(antes).every((m) => m.type === "template"),
      JSON.stringify(enviados.slice(antes).map((m) => m.type))
    );
    chequear(
      "  con la oficina y el plazo de CADA cliente, no mezclados",
      (() => {
        const textos = enviados.slice(antes).map((m) =>
          ((m.template && m.template.components) || [])
            .flatMap((c) => (c.parameters || []).map((p) => p.text))
            .join(" | ")
        );
        return (
          textos.some((t) => /Monter[íi]a/.test(t)) &&
          textos.some((t) => /Ceret[ée]/.test(t)) &&
          textos.every((t) => /5 de octubre/.test(t))
        );
      })(),
      JSON.stringify(enviados.slice(antes).map((m) => m.template && m.template.components))
    );
  }

  // =========================================================================
  console.log("\n── 3. Una corrección a mano SÍ tiene que ganar ──");
  //
  // El arreglo no puede volverse terco: si el dueño corrige un dato, lo nuevo
  // manda sobre lo que estaba guardado en el plan.
  // =========================================================================
  {
    const rev = await pedir("/novedades/revisar", {
      texto: TEXTO,
      datos: { [G1]: { oficina: "Oficina EQUIVOCADA", plazo: "el 1 de enero" } },
    });
    const i = rev.cuerpo.filas.findIndex((f) => f.guia === G1);
    chequear("queda lista con el dato viejo", rev.cuerpo.filas[i].enviar === true);

    const antes = enviados.length;
    await pedir("/novedades/enviar", {
      id: rev.cuerpo.id,
      indices: [i],
      datos: { [G1]: { oficina: "Interrapidísimo Sahagún", plazo: "el 9 de octubre" } },
    });
    const params = (enviados[enviados.length - 1].template.components || [])
      .flatMap((c) => (c.parameters || []).map((p) => p.text))
      .join(" | ");
    chequear("🔑 manda la corrección, no el dato viejo", /Sahag[úu]n/.test(params) && /9 de octubre/.test(params), params);
    chequear("⛔ y NO el que estaba guardado en el plan", !/EQUIVOCADA/.test(params) && !/1 de enero/.test(params), params);
    chequear("salió 1 mensaje", enviados.length - antes === 1);
  }

  // =========================================================================
  console.log("\n── 4. Un campo vacío no borra lo que ya había ──");
  // =========================================================================
  {
    const rev = await pedir("/novedades/revisar", {
      texto: TEXTO,
      datos: { [G2]: { oficina: "Interrapidísimo Lorica", plazo: "el 7 de octubre" } },
    });
    const i = rev.cuerpo.filas.findIndex((f) => f.guia === G2);
    const antes = enviados.length;
    // El navegador manda los dos campos en blanco (fila todavía dibujada en otra
    // pantalla, o el dueño borró el texto sin querer).
    const env = await pedir("/novedades/enviar", {
      id: rev.cuerpo.id,
      indices: [i],
      datos: { [G2]: { oficina: "", plazo: "" } },
    });
    chequear("🔑 se envía igual: el vacío se ignora", env.cuerpo.enviados === 1, JSON.stringify(env.cuerpo.resultados));
    const params = (enviados[enviados.length - 1].template.components || [])
      .flatMap((c) => (c.parameters || []).map((p) => p.text))
      .join(" | ");
    chequear("  y conserva el dato bueno", /Lorica/.test(params) && /7 de octubre/.test(params), params);
    chequear("salió 1 mensaje", enviados.length - antes === 1);
  }

  // =========================================================================
  console.log("\n── 5. Lo que NO se puede aflojar: sin los datos no se manda ──");
  //
  // El 14-sep el bot prometió una oficina de Servientrega que no presta
  // recogida, y la clienta lo leyó. Que el arreglo de arriba no abra la puerta a
  // mandar la plantilla con un hueco.
  // =========================================================================
  {
    const rev = await pedir("/novedades/revisar", { texto: TEXTO, datos: {} });
    const antes = enviados.length;
    // Se fuerza el envío de una fila bloqueada, como si la pantalla estuviera vieja.
    const env = await pedir("/novedades/enviar", { id: rev.cuerpo.id, indices: [0, 1, 2], datos: {} });
    chequear("⛔ no se envía ninguna", env.cuerpo.enviados === 0, JSON.stringify(env.cuerpo.resultados));
    chequear("⛔ y no salió ni un mensaje a Meta", enviados.length === antes, `salieron ${enviados.length - antes}`);
    chequear(
      "  y dice qué falta, para que se pueda arreglar",
      (env.cuerpo.resultados || []).every((r) => /oficina/i.test(r.error || "")),
      JSON.stringify((env.cuerpo.resultados || []).map((r) => r.error))
    );
  }

  // =========================================================================
  console.log("\n── 6. El plan se consume: un segundo clic no reenvía ──");
  // =========================================================================
  {
    const rev = await pedir("/novedades/revisar", {
      texto: TEXTO,
      datos: { [G3]: { oficina: "Interrapidísimo Planeta Rica", plazo: "el 8 de octubre" } },
    });
    const i = rev.cuerpo.filas.findIndex((f) => f.guia === G3);
    const primero = await pedir("/novedades/enviar", { id: rev.cuerpo.id, indices: [i], datos: {} });
    chequear("la primera vez se envía", primero.cuerpo.enviados === 1, JSON.stringify(primero.cuerpo.resultados));
    const antes = enviados.length;
    const segundo = await pedir("/novedades/enviar", { id: rev.cuerpo.id, indices: [i], datos: {} });
    chequear("⛔ el segundo clic no reenvía", segundo.cuerpo.ok === false || segundo.cuerpo.enviados === 0, JSON.stringify(segundo.cuerpo).slice(0, 120));
    chequear("⛔ y no salió otro mensaje", enviados.length === antes);
  }

  fs.rmSync(DIR, { recursive: true, force: true });
  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
