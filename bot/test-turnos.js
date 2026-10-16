// ============================================================================
// 🚦 PRUEBAS DE LA FILA POR CLIENTE (bot/src/turnos.js)
//
// Lo que se prueba es el caso real del 15-oct: un cliente mandó "No sr" y
// "Gracias" pegados, los dos mensajes se atendieron en paralelo, el bot se
// despidió y después le volvió a ofrecer el producto. Y lo invisible: los dos
// leyeron conversations.json antes de que el otro escribiera, así que el
// segundo en guardar pisó el mensaje del primero.
//
// La prueba #5 reproduce esa pérdida de datos con un "archivo" de juguete que
// se lee completo y se escribe completo, igual que hace store.js. Sin la fila
// se pierde un mensaje; con la fila no se pierde ninguno. Es la prueba que
// justifica todo el módulo.
// ============================================================================
const assert = require("assert");
const turnos = require("./src/turnos");

let ok = 0;
let fallos = 0;
function prueba(nombre, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      ok += 1;
      console.log(`  ✅ ${nombre}`);
    })
    .catch((e) => {
      fallos += 1;
      console.error(`  ❌ ${nombre}\n     ${e.message}`);
    });
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log("\n🚦 FILA POR CLIENTE — turnos.js\n");

  // --------------------------------------------------------------------------
  console.log("1) No corren dos tareas del mismo cliente a la vez");
  // --------------------------------------------------------------------------
  await prueba("dos tareas del mismo cliente nunca se solapan", async () => {
    turnos._reiniciar();
    let corriendo = 0;
    let solapes = 0;
    const tarea = async () => {
      corriendo += 1;
      if (corriendo > 1) solapes += 1;
      await dormir(20);
      corriendo -= 1;
    };
    await Promise.all([
      turnos.enFila("573001112233", tarea),
      turnos.enFila("573001112233", tarea),
      turnos.enFila("573001112233", tarea),
    ]);
    assert.strictEqual(solapes, 0, `hubo ${solapes} solapes`);
  });

  await prueba("se respeta el orden de llegada", async () => {
    turnos._reiniciar();
    const orden = [];
    await Promise.all([
      turnos.enFila("cli", async () => {
        await dormir(30);
        orden.push("No sr");
      }),
      turnos.enFila("cli", async () => {
        await dormir(1);
        orden.push("Gracias");
      }),
    ]);
    // Sin fila, "Gracias" (1 ms) terminaría ANTES que "No sr" (30 ms) y el bot
    // contestaría al revés. Con fila, el orden es el de llegada.
    assert.deepStrictEqual(orden, ["No sr", "Gracias"]);
  });

  await prueba("el segundo mensaje VE lo que escribió el primero", async () => {
    turnos._reiniciar();
    // Esto es el corazón del bug: cada mensaje creía ser el último del chat.
    const historial = [];
    const vioElPrimero = [];
    const atender = (texto) => async () => {
      const copia = historial.slice(); // lo que la IA tendría como contexto
      vioElPrimero.push(copia.length);
      await dormir(10);
      historial.push(texto);
    };
    await Promise.all([
      turnos.enFila("cli", atender("respuesta a No sr")),
      turnos.enFila("cli", atender("respuesta a Gracias")),
    ]);
    assert.deepStrictEqual(vioElPrimero, [0, 1], "el segundo no vio la respuesta del primero");
  });

  // --------------------------------------------------------------------------
  console.log("\n2) Clientes distintos NO se esperan entre sí");
  // --------------------------------------------------------------------------
  await prueba("dos clientes se atienden en paralelo", async () => {
    turnos._reiniciar();
    const t0 = Date.now();
    await Promise.all([
      turnos.enFila("cliente-A", () => dormir(60)),
      turnos.enFila("cliente-B", () => dormir(60)),
    ]);
    const ms = Date.now() - t0;
    // En serie serían ~120 ms. En paralelo ~60. Se deja margen amplio para no
    // tener una prueba que falle sola en una máquina cargada.
    assert.ok(ms < 110, `tardó ${ms} ms: parece que se esperaron`);
  });

  await prueba("un cliente trancado no demora a los demás", async () => {
    turnos._reiniciar();
    let listoB = false;
    const lento = turnos.enFila("A", () => dormir(80));
    await turnos.enFila("B", async () => {
      listoB = true;
    });
    assert.strictEqual(listoB, true, "B tuvo que esperar a A");
    await lento;
  });

  // --------------------------------------------------------------------------
  console.log("\n3) Un error no rompe la fila");
  // --------------------------------------------------------------------------
  await prueba("el error le llega a quien llamó", async () => {
    turnos._reiniciar();
    await assert.rejects(
      () => turnos.enFila("cli", async () => { throw new Error("la IA falló"); }),
      /la IA falló/
    );
  });

  await prueba("el que viene atrás se sigue atendiendo", async () => {
    turnos._reiniciar();
    let atendido = false;
    const roto = turnos.enFila("cli", async () => { throw new Error("boom"); });
    const bueno = turnos.enFila("cli", async () => { atendido = true; });
    await roto.catch(() => {});
    await bueno;
    assert.strictEqual(atendido, true, "un fallo dejó al cliente siguiente sin respuesta");
  });

  // --------------------------------------------------------------------------
  console.log("\n4) No se queda guardando filas de clientes viejos");
  // --------------------------------------------------------------------------
  await prueba("la fila se borra cuando se vacía (no es una fuga)", async () => {
    turnos._reiniciar();
    for (let i = 0; i < 50; i++) await turnos.enFila(`cliente-${i}`, async () => {});
    const e = turnos.estado();
    assert.strictEqual(e.clientes_en_curso, 0, `quedaron ${e.clientes_en_curso} filas vivas`);
    assert.strictEqual(e.turnos_totales, 50);
  });

  await prueba("cuenta las carreras evitadas y la profundidad", async () => {
    turnos._reiniciar();
    await Promise.all([
      turnos.enFila("cli", () => dormir(15)),
      turnos.enFila("cli", () => dormir(1)),
      turnos.enFila("cli", () => dormir(1)),
    ]);
    const e = turnos.estado();
    assert.strictEqual(e.turnos_totales, 3);
    // Dos mensajes llegaron con la fila ocupada: dos respuestas dobles evitadas.
    assert.strictEqual(e.carreras_evitadas, 2);
    assert.strictEqual(e.profundidad_max, 3);
  });

  await prueba("sin clave no explota (mensaje sin remitente)", async () => {
    turnos._reiniciar();
    let corrio = false;
    await turnos.enFila(undefined, async () => { corrio = true; });
    assert.strictEqual(corrio, true);
  });

  await prueba("devuelve el valor de la tarea", async () => {
    turnos._reiniciar();
    const r = await turnos.enFila("cli", async () => 42);
    assert.strictEqual(r, 42);
  });

  // --------------------------------------------------------------------------
  console.log("\n5) 🔴 LA PÉRDIDA DE DATOS — lo que de verdad arregla esto");
  // --------------------------------------------------------------------------
  // Se imita lo que hace store.js: leer el archivo COMPLETO, modificar el
  // objeto, escribirlo COMPLETO. Con dos manejadores en paralelo, el segundo en
  // escribir pisa lo que escribió el primero.
  function archivoDeJuguete() {
    let disco = JSON.stringify({ cli: { messages: [] } });
    return {
      leer: () => JSON.parse(disco),
      escribir: (obj) => { disco = JSON.stringify(obj); },
      mensajes: () => JSON.parse(disco).cli.messages,
    };
  }

  await prueba("SIN fila se pierde un mensaje (reproduce el bug)", async () => {
    const f = archivoDeJuguete();
    const guardar = async (texto) => {
      const todo = f.leer();          // los dos leen antes de que el otro escriba
      await dormir(10);               // la llamada a la IA
      todo.cli.messages.push(texto);
      f.escribir(todo);
    };
    await Promise.all([guardar("No sr"), guardar("Gracias")]);
    assert.strictEqual(f.mensajes().length, 1, "esperábamos reproducir la pérdida");
  });

  await prueba("CON fila no se pierde ninguno", async () => {
    turnos._reiniciar();
    const f = archivoDeJuguete();
    const guardar = async (texto) => {
      const todo = f.leer();
      await dormir(10);
      todo.cli.messages.push(texto);
      f.escribir(todo);
    };
    await Promise.all([
      turnos.enFila("cli", () => guardar("No sr")),
      turnos.enFila("cli", () => guardar("Gracias")),
    ]);
    assert.deepStrictEqual(f.mensajes(), ["No sr", "Gracias"]);
  });

  await prueba("10 mensajes seguidos del mismo cliente: no se pierde ninguno", async () => {
    turnos._reiniciar();
    const f = archivoDeJuguete();
    const guardar = async (texto) => {
      const todo = f.leer();
      await dormir(3);
      todo.cli.messages.push(texto);
      f.escribir(todo);
    };
    const esperados = [];
    const todos = [];
    for (let i = 0; i < 10; i++) {
      esperados.push(`m${i}`);
      todos.push(turnos.enFila("cli", () => guardar(`m${i}`)));
    }
    await Promise.all(todos);
    assert.deepStrictEqual(f.mensajes(), esperados);
  });

  // --------------------------------------------------------------------------
  console.log("\n6) Red de seguridad: una tarea colgada no tranca al cliente");
  // --------------------------------------------------------------------------
  await prueba("pasado el límite, la fila sigue con el próximo", async () => {
    turnos._reiniciar();
    // Se vuelve a cargar el módulo con un límite corto, porque LIMITE_MS se lee
    // una sola vez al arrancar.
    delete require.cache[require.resolve("./src/turnos")];
    process.env.TURNO_LIMITE_MS = "40";
    const t = require("./src/turnos");
    let atendido = false;
    const colgada = t.enFila("cli", () => dormir(5000)); // nunca vuelve a tiempo
    const siguiente = t.enFila("cli", async () => { atendido = true; });
    await dormir(120);
    assert.strictEqual(atendido, true, "la fila quedó trancada para siempre");
    assert.strictEqual(t.estado().turnos_destrabados, 1);
    // Se limpia para no dejar el módulo con el límite de prueba.
    delete process.env.TURNO_LIMITE_MS;
    delete require.cache[require.resolve("./src/turnos")];
    colgada.catch(() => {});
    siguiente.catch(() => {});
  });

  // --------------------------------------------------------------------------
  console.log("\n7) El webhook de verdad usa la fila");
  // --------------------------------------------------------------------------
  await prueba("server.js encola cada mensaje por cliente", async () => {
    const fs = require("fs");
    const src = fs.readFileSync(require("path").join(__dirname, "src/server.js"), "utf8");
    assert.ok(src.includes('require("./turnos")'), "server.js no requiere turnos");
    assert.ok(
      /for \(const msg of messages\) \{[\s\S]{0,2000}?turnos\.enFila\(/.test(src),
      "el bucle de mensajes no está encolado"
    );
    assert.ok(src.includes("turnos: turnos.estado()"), "/health no muestra la fila");
  });

  await prueba("no quedó ningún `continue` suelto fuera del bucle de medios", async () => {
    const fs = require("fs");
    const src = fs.readFileSync(require("path").join(__dirname, "src/server.js"), "utf8");
    const desde = src.indexOf("for (const msg of messages)");
    const cuerpo = src.slice(desde);
    const finDelCuerpo = cuerpo.indexOf("}); // 🚦 fin del turno");
    assert.ok(finDelCuerpo > 0, "no se encontró el cierre del turno");
    const dentro = cuerpo.slice(0, finDelCuerpo);
    // Los únicos `continue` válidos son los del bucle de medios. Se cuentan los
    // que hay DESPUÉS de que arranca ese bucle.
    const arrancaMedios = dentro.indexOf("for (const key of media");
    const antesDeMedios = dentro.slice(0, arrancaMedios);
    const sueltos = (antesDeMedios.match(/\bcontinue\s*;/g) || []).length;
    assert.strictEqual(sueltos, 0, `hay ${sueltos} continue fuera de un bucle (serían SyntaxError)`);
  });

  await prueba("server.js sigue siendo JavaScript válido", async () => {
    const { execFileSync } = require("child_process");
    execFileSync(process.execPath, ["--check", require("path").join(__dirname, "src/server.js")]);
  });

  console.log(`\n${"=".repeat(60)}`);
  console.log(`${ok} pasaron · ${fallos} fallaron`);
  console.log("=".repeat(60));
  if (fallos) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
