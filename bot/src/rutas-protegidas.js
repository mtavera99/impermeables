// ============================================================================
// 🛟 QUE NINGUNA RUTA SE QUEDE SIN CONTESTAR
//
// LA TRAMPA DE EXPRESS 4: este proyecto usa express 4.19, y esa versión NO
// entiende los handlers `async`. Si uno lanza una excepción, la promesa queda
// rechazada y Express **no se entera**: nadie llama a res.json() ni a
// res.status(), así que la petición se queda abierta PARA SIEMPRE.
//
// 🔴 Y EN EL NAVEGADOR ESO NO ES UN ERROR. Es un fetch que nunca resuelve ni
// rechaza: el .catch no corre, el .finally no corre, y el botón queda gris hasta
// recargar la página. Es exactamente la misma forma de fallo que el botón Enviar
// de novedades, que estuvo roto 3 días sin que nada lo avisara: el problema no es
// que se rompa, es que se rompe EN SILENCIO.
//
// Hay 17 rutas `async` en server.js. Se envuelve el REGISTRO de rutas en vez de
// las 17 a mano, porque a mano se olvida la 18.
//
// ⚠️ Esto NO fue la causa del "se queda ahí sin leer nada" que reportó el dueño
// el 28-sep — eso era el PDF tardando, y se arregló mostrando el contador de
// segundos en la pantalla. Esto es la red por si algún día pasa de verdad.
// ============================================================================

/** Contesta un 500 con algo que se pueda leer, y lo deja en los logs. */
function responderError(req, res, e) {
  console.error(`🔴 Se rompió ${req.method} ${req.path}:`, e && e.stack ? e.stack : e);
  // Si ya se empezó a responder no se puede hacer nada más sin romper la
  // respuesta a medio camino.
  if (res.headersSent) return;
  const mensaje =
    "Se rompió el servidor procesando esto: " +
    ((e && e.message) || "error desconocido") +
    ". No se envió nada. Pasame este mensaje y lo arreglo.";
  // Siempre JSON: todas las pantallas del panel leen la respuesta con fetch y
  // esperan JSON. Devolver texto plano les hace mostrar "Unexpected token" en vez
  // del motivo real, que es justo lo que hay que ver.
  res.status(500).json({ ok: false, error: mensaje });
}

/**
 * Envuelve un handler para que un fallo CONTESTE en vez de colgar.
 *
 * Cubre las dos formas de fallar:
 *   · `throw` sincrónico  -> lo agarra el try/catch
 *   · promesa rechazada   -> lo agarra el .catch
 */
function protegerHandler(handler) {
  if (typeof handler !== "function") return handler;
  // Los manejadores de error de Express tienen 4 parámetros y se registran con
  // app.use, no con app.get/app.post. Envolverlos les cambiaría la aridad y
  // Express dejaría de reconocerlos como manejadores de error.
  if (handler.length >= 4) return handler;

  return function (req, res, next) {
    let resultado;
    try {
      resultado = handler.call(this, req, res, next);
    } catch (e) {
      responderError(req, res, e);
      return undefined;
    }
    // Solo las async devuelven algo con .catch. Las normales pasan de largo.
    //
    // 🔑 SE DEVUELVE LA PROMESA YA MANEJADA, NO LA ORIGINAL. Mi primera versión
    // adjuntaba el .catch pero devolvía `resultado`, que seguía rechazado: quien
    // hiciera `await` sobre el handler recibía la excepción igual y Node la
    // reportaba como "promesa rechazada que nadie atrapó". Express ignora el
    // valor de retorno, así que en producción no se notaba — pero dejaba una
    // promesa rechazada suelta, que es exactamente lo que esto viene a evitar.
    // Lo encontró la prueba al hacerle await.
    if (resultado && typeof resultado.catch === "function") {
      return resultado.catch((e) => responderError(req, res, e));
    }
    return resultado;
  };
}

/**
 * Aplica la protección a app.get/post/put/delete/patch/all.
 *
 * Hay que llamarlo ANTES de registrar cualquier ruta.
 */
function proteger(app, metodos = ["get", "post", "put", "delete", "patch", "all"]) {
  for (const metodo of metodos) {
    if (typeof app[metodo] !== "function") continue;
    const original = app[metodo].bind(app);
    app[metodo] = function (ruta, ...handlers) {
      return original(ruta, ...handlers.map(protegerHandler));
    };
  }
  return app;
}

module.exports = { proteger, protegerHandler, responderError };
