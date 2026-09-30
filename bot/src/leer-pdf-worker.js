// ============================================================================
// 📄 WORKER DE UN SOLO USO: LEE EL TEXTO DE UN PDF Y SE MUERE — 30-sep
//
// Existe por una razón concreta y medida: `pdfjs` no devuelve la memoria que usa
// (~71 MB por PDF, ver el comentario largo en `guias.js`). Un proceso que termina
// sí la devuelve toda, porque la recupera el sistema operativo.
//
// Se invoca así, desde `guias.js`:
//     fork("leer-pdf-worker.js", [rutaDelPdf, rutaDeSalida])
//
// El resultado se escribe en un ARCHIVO, no en stdout: cualquier `console.log`
// de un módulo que se cargue acá corrompería un JSON que viaje por stdout.
//
// ⚠️ NO agregar lógica de parseo en este archivo. El parseo vive en
// `guias.lineasEnEsteProceso`, y este worker solo lo invoca. Si se duplicara,
// habría dos versiones del lector de etiquetas y una se quedaría vieja.
// ============================================================================
const fs = require("fs");

(async () => {
  const [, , entrada, salida] = process.argv;
  if (!entrada || !salida) throw new Error("uso: leer-pdf-worker.js <entrada.pdf> <salida.json>");

  const guias = require("./guias");
  const buffer = fs.readFileSync(entrada);
  const paginas = await guias.lineasEnEsteProceso(buffer);

  fs.writeFileSync(salida, JSON.stringify(paginas));
  // Salida explícita: pdfjs puede dejar temporizadores vivos y el proceso se
  // quedaría abierto sin hacer nada, justo lo que se quería evitar.
  process.exit(0);
})().catch((e) => {
  process.stderr.write(String(e && e.stack ? e.stack : e));
  process.exit(1);
});
