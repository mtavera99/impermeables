/**
 * EL TEXTO DEL PDF DE GUÍAS SE LEE EN UN PROCESO APARTE — 30-sep
 *
 * 🔴 POR QUÉ EXISTE: `pdfjs` no devuelve la memoria que usa. Medido en una
 * máquina limpia, con un PDF de 40 hojas:
 *
 *     solo CARGAR el módulo pdfjs        +41 MB
 *     leer las 40 páginas                +30 MB
 *     después de destroy() + recolector    0 MB devueltos
 *                                        ─────────
 *                                         71 MB que no vuelven NUNCA
 *
 * Node sí libera por dentro (el heap y `external` bajan), pero el sistema
 * operativo no recupera nada. Con el contenedor de 512 MB de Render, unos pocos
 * lotes de guías y el proceso muere. Probado además: `useSystemFonts: false` no
 * cambia nada y `MALLOC_ARENA_MAX=2` lo empeora.
 *
 * Cuando un PROCESO termina, en cambio, el sistema recupera el 100%. Medido con
 * 3 lotes seguidos: +71 MB cada lote adentro del bot, +1 MB en total con el
 * proceso aparte.
 *
 * 🔑 LO QUE ESTA BATERÍA BLINDA es que mover el trabajo de lugar NO cambió lo
 * que se lee. Si el worker devolviera algo distinto —una página menos, las líneas
 * en otro orden, el texto partido de otra forma— el pareo de guías empezaría a
 * fallar y el dueño le mandaría la guía equivocada a un cliente. Por eso se
 * compara carácter por carácter contra el camino de siempre.
 *
 *   node test-pdf-en-proceso-aparte.js      (necesita el pdf-lib real)
 */

const fs = require("fs");
const path = require("path");

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

const guias = require("./src/guias");
const { PDFDocument, StandardFonts } = require("pdf-lib");

/** Un lote de etiquetas parecido a uno de 99 Envíos. Datos inventados. */
async function fabricarLote(hojas) {
  const doc = await PDFDocument.create();
  const fuente = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < hojas; i++) {
    const p = doc.addPage([612, 792]);
    const y = (n) => 740 - n * 20;
    p.drawText(`Guia No 24006160${String(4800 + i).padStart(4, "0")}`, { x: 40, y: y(0), size: 12, font: fuente });
    p.drawText(`DESTINATARIO: CLIENTE NUMERO ${i}`, { x: 40, y: y(1), size: 10, font: fuente });
    p.drawText(`DIRECCION: CALLE ${i} # ${i}-${i} SUR`, { x: 40, y: y(2), size: 10, font: fuente });
    p.drawText(`CIUDAD: BOGOTA`, { x: 40, y: y(3), size: 10, font: fuente });
    p.drawText(`TELEFONO: 30000${String(i).padStart(5, "0")}`, { x: 40, y: y(4), size: 10, font: fuente });
  }
  return Buffer.from(await doc.save());
}

(async () => {
  // ==========================================================================
  console.log("\n── 1. el worker existe y no duplica el parseo ──────────────────");
  // ==========================================================================
  const worker = path.join(__dirname, "src", "leer-pdf-worker.js");
  chequear("el archivo del worker existe", fs.existsSync(worker), worker);

  const fuenteWorker = fs.readFileSync(worker, "utf8");
  chequear("el worker llama a guias.lineasEnEsteProceso y no reimplementa el parseo",
    /lineasEnEsteProceso/.test(fuenteWorker) && !/getTextContent/.test(fuenteWorker),
    "si el parseo se duplicara, una de las dos copias se quedaría vieja");
  chequear("el worker escribe el resultado en un ARCHIVO, no en stdout",
    /writeFileSync/.test(fuenteWorker),
    "por stdout, cualquier console.log de un módulo cargado corrompería el JSON");
  chequear("guias exporta lineasEnEsteProceso (la usa el worker)",
    typeof guias.lineasEnEsteProceso === "function");
  chequear("y sigue exportando lineasPorPagina, que es la que usa el resto del código",
    typeof guias.lineasPorPagina === "function");

  // ==========================================================================
  console.log("\n── 2. el proceso aparte lee EXACTAMENTE lo mismo ───────────────");
  // ==========================================================================
  for (const hojas of [1, 3, 12]) {
    const buffer = await fabricarLote(hojas);
    const aparte = await guias.lineasPorPagina(buffer); // pasa por el worker
    const aqui = await guias.lineasEnEsteProceso(buffer); // el camino de siempre

    chequear(`${hojas} hoja(s): misma cantidad de páginas`,
      aparte.length === aqui.length, `aparte=${aparte.length} aquí=${aqui.length}`);
    chequear(`${hojas} hoja(s): el texto es idéntico, carácter por carácter`,
      JSON.stringify(aparte) === JSON.stringify(aqui),
      `aparte=${JSON.stringify(aparte).slice(0, 200)}\n     aquí=${JSON.stringify(aqui).slice(0, 200)}`);
    chequear(`${hojas} hoja(s): devolvió una página por hoja`, aparte.length === hojas);
  }

  // ==========================================================================
  console.log("\n── 3. lo que se lee sirve para identificar al cliente ──────────");
  // ==========================================================================
  // Que el texto sea idéntico no alcanza: si las dos rutas leyeran mal lo mismo,
  // la prueba pasaría igual. Acá se comprueba que los rótulos llegan enteros.
  const lote = await fabricarLote(3);
  const paginas = await guias.lineasPorPagina(lote);
  const campos = guias.extraerCampos(paginas[0]);

  chequear("sacó el número de guía de la etiqueta", campos.guia === "240061604800",
    `sacó ${JSON.stringify(campos.guia)}`);
  chequear("sacó la ciudad", /BOGOTA/i.test(String(campos.ciudad || "")),
    `sacó ${JSON.stringify(campos.ciudad)}`);
  chequear("sacó el nombre del destinatario",
    /CLIENTE NUMERO 0/i.test(String(campos.nombre || "")), `sacó ${JSON.stringify(campos.nombre)}`);
  chequear("y la página 3 trae la guía de la página 3, no la de la 1",
    guias.extraerCampos(paginas[2]).guia === "240061604802",
    `sacó ${JSON.stringify(guias.extraerCampos(paginas[2]).guia)}`);

  // ==========================================================================
  console.log("\n── 4. procesarPDF completo sigue funcionando ───────────────────");
  // ==========================================================================
  // Es la función que usa el panel de verdad, y ahora su lectura de texto pasa
  // por el worker. Un pedido que debería parear tiene que seguir pareando.
  const pedidos = [
    {
      id: "p0", nombre: "Cliente Numero 0", celular: "3000000000",
      telefono_chat: "573000000000", ciudad: "Bogota", direccion: "Calle 0 # 0-0 Sur",
    },
  ];
  const filas = await guias.procesarPDF(await fabricarLote(2), pedidos);
  chequear("procesarPDF devuelve una fila por hoja", filas.length === 2, `devolvió ${filas.length}`);
  chequear("cada fila trae su hoja en PDF", filas.every((f) => Buffer.isBuffer(f.hoja)));
  chequear("y leyó el número de guía de cada hoja",
    filas[0].guia === "240061604800" && filas[1].guia === "240061604801",
    `leyó ${filas[0].guia} y ${filas[1].guia}`);

  // ==========================================================================
  console.log("\n── 5. si el worker no arranca, las guías igual salen ───────────");
  // ==========================================================================
  // La red de seguridad: `lineasPorPagina` cae al parseo de siempre si el hijo
  // falla. Se prueba invocando directo el camino de respaldo, que es lo que corre
  // en ese caso. Un bot que gasta memoria es mejor que un bot que no puede
  // mandar las guías.
  const respaldo = await guias.lineasEnEsteProceso(await fabricarLote(2));
  chequear("el camino de respaldo lee las 2 páginas por sí solo", respaldo.length === 2);
  chequear("y lee el mismo número de guía", guias.extraerCampos(respaldo[0]).guia === "240061604800");

  const fuenteGuias = fs.readFileSync(path.join(__dirname, "src", "guias.js"), "utf8");
  chequear("lineasPorPagina tiene el try/catch que cae al respaldo",
    /lineasEnProcesoAparte[\s\S]{0,400}catch[\s\S]{0,400}lineasEnEsteProceso/.test(fuenteGuias));
  chequear("y el worker tiene un tope de tiempo, para no dejar al dueño esperando",
    /setTimeout[\s\S]{0,200}kill/.test(fuenteGuias));

  // ==========================================================================
  console.log(`\n${"─".repeat(62)}`);
  console.log(`${ok} bien · ${mal} mal`);
  if (mal > 0) {
    console.log("🔴 HAY FALLAS");
    process.exit(1);
  }
  console.log("🟢 todo bien");
})().catch((e) => {
  console.error("🔴 la batería se cayó:", e && e.stack ? e.stack : e);
  process.exit(1);
});
