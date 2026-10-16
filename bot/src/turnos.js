// ============================================================================
// 🚦 UN CLIENTE, UNA FILA — que dos mensajes seguidos no se atiendan a la vez
//
// 🔴 DE DÓNDE SALE (15-oct, 8:11 y 8:18 p. m., dos casos reales en la misma
//    hora). Un cliente escribió dos mensajes pegados:
//
//      cliente: "No sr"
//      cliente: "Gracias"
//      bot:     "¡Dale, entiendo! Si más adelante te animás... ¡Buenas rutas! 🏍️"
//      bot:     "Entiendo, ¿buscabas una sola unidad entonces? La unidad te sale
//                en $59.900 más el envío..."
//
//    El bot se despidió y DESPUÉS volvió a ofrecer. Los dos mensajes salieron
//    con la misma hora. El otro caso fue idéntico con fotos: pidió fotos, dijo
//    "Gracias", y le llegó DOS VECES la misma foto de los colores con dos
//    textos distintos.
//
//    No es la IA alucinando: es que cada mensaje de WhatsApp llega en un POST
//    propio al webhook, y `app.post("/webhook")` contesta 200 y arranca el
//    procesamiento SIN esperar al anterior. Los dos mensajes se atendieron en
//    paralelo, y cada uno leyó la conversación ANTES de que el otro escribiera
//    su respuesta. O sea: los dos creyeron ser el último mensaje del chat.
//
// 🔑 Y LO GRAVE NO ES LO QUE SE VE. `store` guarda las conversaciones leyendo
//    conversations.json COMPLETO, modificando el objeto en memoria y
//    reescribiéndolo completo. Dos manejadores en paralelo hacen esto:
//
//      A lee el archivo  (no tiene el mensaje de B)
//      B lee el archivo  (no tiene el mensaje de A)
//      A escribe         → queda el mensaje de A
//      B escribe         → PISA el archivo. El mensaje de A desapareció.
//
//    Eso es una actualización perdida, y es silenciosa: no hay error, no hay
//    log, no hay nada. Se puede borrar un mensaje del cliente, una dirección,
//    o los datos de un pedido que se acababan de extraer. Por eso esto se
//    arregla y no se deja pasar como un detalle de estilo: la respuesta rara
//    era solo el síntoma visible de una pérdida de datos.
//
// 🧮 CUÁNTO PASABA. En la hora que se midió, de 60 conversaciones hubo 2 en las
//    que el cliente mandó dos mensajes pegados — y en LAS DOS el bot contestó
//    doble. Dos de dos. Con ~630 conversaciones por día eso son ~20 chats
//    diarios con respuesta incoherente y riesgo de perder el dato.
//
// 💾 Y DE PASO, LA MEMORIA. Atender dos mensajes a la vez significa tener dos
//    copias de conversations.json (15 MB) en memoria al mismo tiempo. El pico
//    medido ese día fue de 261 MB contra un techo de heap de 268 MB. Serializar
//    por cliente no baja el promedio, pero sí recorta los picos que son los que
//    tumban el servicio.
//
// ❌ LO QUE NO SE HIZO: una sola fila global. Arreglaría lo mismo, pero una
//    llamada lenta a la IA de un cliente dejaría esperando a TODOS los demás.
//    Con la pauta al 100% eso es peor que el problema. La fila es por cliente:
//    dos personas distintas se siguen atendiendo en paralelo, como hasta hoy.
// ============================================================================

/**
 * Una fila por clave. `cola` es la promesa del último turno encadenado, y
 * `pendientes` cuántos hay esperando (para poder borrar la entrada cuando se
 * vacía y no dejar el Map creciendo con un registro por cliente histórico).
 * @type {Map<string, { cola: Promise<void>, pendientes: number }>}
 */
const FILAS = new Map();

/**
 * 🩹 RED DE SEGURIDAD. Si una tarea se cuelga (una llamada a la IA que nunca
 * vuelve, un `await` a Meta sin timeout), sin esto la fila de ESE cliente queda
 * trancada para siempre y el bot nunca le vuelve a contestar. Pasado este
 * tiempo la fila sigue adelante con el próximo mensaje. La tarea colgada no se
 * cancela —no se puede en JS—, solo deja de bloquear a las que vienen atrás.
 *
 * 90 s es bastante más que el peor turno observado (transcribir una nota de voz
 * + llamar a la IA + mandar fotos), así que en la práctica nunca se activa.
 */
const LIMITE_MS = Number(process.env.TURNO_LIMITE_MS || 90 * 1000);

/** Contadores para /health: sirven para saber si esto está haciendo algo. */
const METRICAS = {
  turnos: 0,          // cuántos turnos pasaron por acá
  esperaron: 0,       // cuántos encontraron la fila ocupada (= carreras evitadas)
  profundidadMax: 0,  // el mayor número de mensajes encolados de un mismo cliente
  destrabados: 0,     // cuántas veces se activó la red de seguridad
};

function esperar(ms) {
  return new Promise((listo) => {
    const t = setTimeout(listo, ms);
    // Sin unref, un temporizador pendiente puede dejar el proceso vivo al salir.
    if (t.unref) t.unref();
  });
}

/**
 * Corre `tarea` cuando le toque el turno a `clave`, nunca al mismo tiempo que
 * otra tarea de la misma clave.
 *
 * Garantías:
 *   · ORDEN: las tareas de una misma clave corren en el orden en que se pidieron.
 *   · AISLAMIENTO: claves distintas no se esperan entre sí.
 *   · LA FILA NO SE ROMPE: si una tarea lanza, el error le llega a quien llamó
 *     (el `await` de afuera), pero la fila sigue atendiendo a los que están
 *     atrás. Antes de esto un fallo no bloqueaba a nadie; que ahora exista una
 *     fila no debe convertir un error en un cliente sin respuesta.
 *
 * @template T
 * @param {string} clave  normalmente el id del cliente (teléfono o BSUID)
 * @param {() => Promise<T>} tarea
 * @returns {Promise<T>}
 */
function enFila(clave, tarea) {
  const k = String(clave || "sin-clave");
  const fila = FILAS.get(k) || { cola: Promise.resolve(), pendientes: 0 };
  FILAS.set(k, fila);

  fila.pendientes += 1;
  METRICAS.turnos += 1;
  if (fila.pendientes > 1) METRICAS.esperaron += 1;
  if (fila.pendientes > METRICAS.profundidadMax) METRICAS.profundidadMax = fila.pendientes;

  // Bandera para saber si el turno ya cerró. `Promise.race` no dice quién ganó,
  // y sin esto el aviso de "turno colgado" saldría también en los turnos que
  // terminaron bien hace rato. Se declara antes de usarse, aunque la función que
  // la lee corra 90 s después.
  let terminado = false;

  // Lo que ve quien llamó: su tarea, con su resultado y su error.
  const mio = fila.cola.then(() => tarea());

  // Lo que ve el SIGUIENTE de la fila: lo mismo, pero sin poder fallar y con
  // el tope de tiempo. Son dos promesas distintas a propósito.
  fila.cola = Promise.race([
    mio.catch(() => {}),
    esperar(LIMITE_MS).then(() => {
      if (!terminado) {
        METRICAS.destrabados += 1;
        console.error(
          `🔴 TURNO COLGADO de ${k}: pasaron ${Math.round(LIMITE_MS / 1000)} s y no terminó. ` +
            `La fila sigue con el próximo mensaje para no dejar al cliente sin respuesta.`
        );
      }
    }),
  ]);

  return mio.finally(() => {
    terminado = true;
    fila.pendientes -= 1;
    // Cuando no queda nadie esperando, se saca la fila del Map. Si no, el Map
    // acumularía una entrada por cada cliente que escribió desde el arranque
    // (son miles por semana) y sería otra fuga de memoria.
    if (fila.pendientes <= 0 && FILAS.get(k) === fila) FILAS.delete(k);
  });
}

/** Cuántos mensajes de este cliente están esperando turno (sin contar el que corre). */
function esperandoTurno(clave) {
  const fila = FILAS.get(String(clave || "sin-clave"));
  return fila ? Math.max(0, fila.pendientes - 1) : 0;
}

/** Foto del estado, para /health. */
function estado() {
  let enCurso = 0;
  let encolados = 0;
  for (const fila of FILAS.values()) {
    enCurso += 1;
    encolados += Math.max(0, fila.pendientes - 1);
  }
  return {
    clientes_en_curso: enCurso,
    mensajes_esperando: encolados,
    turnos_totales: METRICAS.turnos,
    // Este es EL número que importa: cada uno es una respuesta doble y una
    // posible pérdida de datos que antes pasaba y ahora no.
    carreras_evitadas: METRICAS.esperaron,
    profundidad_max: METRICAS.profundidadMax,
    turnos_destrabados: METRICAS.destrabados,
  };
}

/** Solo para las pruebas: deja el módulo como recién arrancado. */
function _reiniciar() {
  FILAS.clear();
  METRICAS.turnos = 0;
  METRICAS.esperaron = 0;
  METRICAS.profundidadMax = 0;
  METRICAS.destrabados = 0;
}

module.exports = { enFila, esperandoTurno, estado, _reiniciar, LIMITE_MS };
