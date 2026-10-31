/**
 * 🔴 31-oct: tope GLOBAL de turnos simultáneos (el bot caía por memoria cuando
 * llegaba una avalancha de mensajes de clientes distintos al reiniciar).
 *   node test-tope-de-turnos.js
 */
const turnos = require("./src/turnos");
let ok = 0, mal = 0;
const chequear = (n, c, d) => (c ? (console.log(`✅ ${n}`), ok++) : (console.log(`🔴 ${n}${d ? `\n     ${d}` : ""}`), mal++));
(async () => {
  let ahora = 0, pico = 0;
  const orden = [];
  const tarea = (id) => async () => {
    ahora++; pico = Math.max(pico, ahora);
    await new Promise((r) => setTimeout(r, 30));
    orden.push(id); ahora--; return id;
  };
  const res = await Promise.all(Array.from({ length: 10 }, (_, i) => turnos.enFila("cli" + i, tarea(i))));
  chequear(`10 clientes distintos a la vez: nunca más de ${turnos.SIMULTANEOS} en paralelo`, pico <= turnos.SIMULTANEOS, `pico ${pico}`);
  chequear("y se atienden los 10", res.length === 10 && orden.length === 10);
  orden.length = 0;
  await Promise.all([1, 2, 3].map((n) => turnos.enFila("mismo", async () => { await new Promise((r) => setTimeout(r, 10 * (4 - n))); orden.push(n); })));
  chequear("un mismo cliente conserva su orden", orden.join(",") === "1,2,3", orden.join(","));
  await turnos.enFila("x", async () => { throw new Error("falla"); }).catch(() => {});
  const despues = await turnos.enFila("y", async () => "sigue");
  chequear("un turno que falla libera su cupo", despues === "sigue" && turnos._cupos().enCurso === 0, JSON.stringify(turnos._cupos()));
  console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal ? 1 : 0);
})();
