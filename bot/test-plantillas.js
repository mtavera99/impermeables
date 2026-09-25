/**
 * NINGUNA PLANTILLA SE DA POR BUENA SIN PREGUNTARLE A META.
 *
 * DE DÓNDE SALE ESTA PRUEBA (25-sep). El dueño: "no llegaron ni los resúmenes".
 *
 * El cierre del día se mandó DOS noches seguidas por la plantilla
 * `cierre_del_dia`. Meta respondió 200 y devolvió un id de mensaje las dos
 * veces. El log del Action decía "Envío a WhatsApp: OK". Y nunca llegó.
 *
 * 🔑 ESO ES LO PEOR QUE PUEDE PASAR: un envío que falla con error se arregla,
 * porque el error dice qué pasa. Un envío que Meta ACEPTA y después descarta se
 * ve idéntico a uno que funcionó. Llevábamos dos días creyendo que funcionaba.
 *
 * ⚠️ Y NO SE PUEDE SABER DESDE EL CÓDIGO. Que el bot arme bien el payload no
 * dice nada sobre si la plantilla existe, si está aprobada, en qué idioma quedó,
 * cuántas variables tiene o en qué categoría la puso Meta.
 *
 * Esta prueba no habla con Meta: verifica la COMPARACIÓN, que es la parte que
 * decide si algo está mal y qué hay que hacer. Con respuestas de Meta armadas a
 * mano, incluidas las que ya nos costaron plata.
 *
 *   node test-plantillas.js      (sin credenciales ni red)
 */

const fs = require("fs");
const DIR = "/tmp/prueba-plantillas";
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DATA_DIR = DIR;
process.env.PANEL_TOKEN = "clave_de_prueba";

const p = require("./src/plantillas");
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

/** Una plantilla como la devuelve Meta. */
const deMeta = (nombre, extra = {}) => ({
  name: nombre,
  language: "es_CO",
  status: "APPROVED",
  category: "UTILITY",
  components: [{ type: "BODY", text: "Hola, te contamos sobre tu pedido." }],
  ...extra,
});

const buscar = (vs, nombre) => vs.find((v) => v.nombre === nombre);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 1. El catálogo: las 6 plantillas que el bot usa ──");

const usadas = p.usadas();
chequear("el bot usa 6 plantillas", usadas.length === 6, `encontré ${usadas.length}`);
for (const n of [
  "cierre_del_dia",
  "seguimiento_impermeable",
  "guia_de_envio",
  "novedad_direccion",
  "novedad_ausente",
  "novedad_oficina",
]) {
  chequear(`  está declarada "${n}"`, usadas.some((u) => u.nombre === n));
}
chequear(
  "todas piden es_CO, no es",
  usadas.every((u) => u.idioma === "es_CO"),
  'con "es" Meta rechaza el envío aunque la plantilla esté aprobada'
);
chequear(
  "el cierre espera 1 variable (el resumen del día)",
  buscar(usadas, "cierre_del_dia").variables === 1
);
chequear(
  "la de oficina espera 2 (dónde y hasta cuándo)",
  buscar(usadas, "novedad_oficina").variables === 2
);
chequear(
  "la de la guía espera el PDF en el encabezado",
  buscar(usadas, "guia_de_envio").encabezado === "DOCUMENT"
);
chequear(
  "cada una explica qué hace y cuándo, en español",
  usadas.every((u) => u.queHace && u.cuando && u.para)
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Cuando todo está bien, no se inventa un problema ──");

const todoBien = p.comparar(
  usadas,
  usadas.map((u) =>
    deMeta(u.nombre, {
      components: [
        ...(u.encabezado ? [{ type: "HEADER", format: u.encabezado }] : []),
        {
          type: "BODY",
          text:
            u.variables === 0
              ? "Texto fijo sin variables."
              : u.variables === 1
                ? "Resumen: {{1}}"
                : "Está en {{1}} y tenés hasta {{2}}.",
        },
      ],
    })
  )
);
chequear("las 6 salen en verde", todoBien.every((v) => v.nivel === "verde"), JSON.stringify(todoBien.filter((v) => v.nivel !== "verde").map((v) => [v.nombre, v.estado])));
chequear("y el resumen lo dice", /🟢/.test(p.resumir(todoBien).titular), p.resumir(todoBien).titular);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 3. EL CASO REAL: aprobada, bien armada, pero de MARKETING ──");

// 🔴 Esta es la explicación más probable de que el cierre no llegara: Meta
// acepta la de marketing (200 + id) y después la descarta. Hay un tope por
// persona y por día que cuenta TODAS las marcas, y si la persona alguna vez
// tocó "dejar de recibir promociones" quedan descartadas en silencio.
const marketing = p.comparar(
  [buscar(usadas, "cierre_del_dia")],
  [deMeta("cierre_del_dia", { category: "MARKETING", components: [{ type: "BODY", text: "Resumen: {{1}}" }] })]
);
chequear("se marca en amarillo, no en verde", marketing[0].nivel === "amarillo");
chequear("el estado lo nombra", marketing[0].estado === "marketing");
chequear(
  "explica que Meta puede aceptarla y no entregarla",
  /acepta|ACEPTAR/i.test(marketing[0].problema) && /no entregar/i.test(marketing[0].problema)
);
chequear(
  "y dice exactamente qué cambiar: pasarla a UTILITY",
  /UTILITY/.test(marketing[0].arreglo)
);
chequear(
  "el resumen no la deja pasar como si todo estuviera bien",
  /🟡/.test(p.resumir(marketing).titular),
  p.resumir(marketing).titular
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 4. La plantilla que no existe ──");

const falta = p.comparar([buscar(usadas, "seguimiento_impermeable")], []);
chequear("se marca en rojo", falta[0].nivel === "rojo");
chequear("dice que no existe", falta[0].estado === "falta");
chequear("y dice cómo crearla, con el nombre exacto", /seguimiento_impermeable/.test(falta[0].arreglo));
chequear(
  "avisa que va SIN variables",
  /SIN variables/.test(falta[0].arreglo),
  "si se crea con {{1}} el envío va a fallar"
);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 5. El idioma: 'es' y 'es_CO' NO son lo mismo ──");

// Ya estaba anotado en el código: con "es" Meta rechaza el envío aunque la
// plantilla esté aprobada, y el error no menciona el idioma.
const idioma = p.comparar(
  [buscar(usadas, "novedad_ausente")],
  [deMeta("novedad_ausente", { language: "es" })]
);
chequear("se marca en rojo", idioma[0].nivel === "rojo");
chequear("el estado es de idioma", idioma[0].estado === "idioma");
chequear("dice en qué idioma sí existe", (idioma[0].idiomasQueHay || []).includes("es"));
chequear("y avisa que es y es_CO no son lo mismo", /"es" y "es_CO" NO son lo mismo/.test(idioma[0].arreglo));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Las variables: el riesgo que ya estaba anotado ──");

// El traspaso del 24-sep lo decía textual sobre la del paso 44h:
// "Si la plantilla tiene {{1}}, falla".
const conVariable = p.comparar(
  [buscar(usadas, "seguimiento_impermeable")],
  [deMeta("seguimiento_impermeable", { components: [{ type: "BODY", text: "Hola {{1}}, seguís interesado?" }] })]
);
chequear("una plantilla con {{1}} donde el bot no manda nada se marca", conVariable[0].nivel === "rojo");
chequear("el estado es de variables", conVariable[0].estado === "variables");
chequear("nombra el error 132000", /132000/.test(conVariable[0].problema));
chequear(
  "y cuenta bien: 1 en Meta contra 0 del bot",
  conVariable[0].variablesEnMeta === 1 && conVariable[0].esperaVariables === 0
);

// Y al revés: el cierre necesita 1 y la plantilla no tiene ninguna.
const sinVariable = p.comparar(
  [buscar(usadas, "cierre_del_dia")],
  [deMeta("cierre_del_dia", { components: [{ type: "BODY", text: "Ya está tu resumen." }] })]
);
chequear("y el caso opuesto también se marca", sinVariable[0].estado === "variables");
chequear(
  "avisa que no hay dónde poner el dato",
  /no tiene dónde poner el dato/.test(sinVariable[0].arreglo)
);

// Se cuenta el número MÁS ALTO, no las apariciones: {{1}} dos veces es 1 solo dato.
chequear(
  "una variable repetida cuenta como una sola",
  p.variablesDelCuerpo([{ type: "BODY", text: "Hola {{1}}, te repito: {{1}}" }]) === 1
);
chequear(
  "y {{2}} sin {{1}} cuenta como dos",
  p.variablesDelCuerpo([{ type: "BODY", text: "Está en {{2}}" }]) === 2
);
chequear("sin cuerpo, cero variables", p.variablesDelCuerpo([]) === 0);

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Los estados que no son APPROVED ──");

for (const [estado, pista] of [
  ["PENDING", /revisando/i],
  ["REJECTED", /rechaz/i],
  ["PAUSED", /PAUSÓ|calificación/i],
  ["DISABLED", /deshabilit/i],
]) {
  const v = p.comparar(
    [buscar(usadas, "novedad_direccion")],
    [deMeta("novedad_direccion", { status: estado })]
  );
  chequear(`${estado} se marca en rojo`, v[0].nivel === "rojo" && v[0].estado === "no_aprobada");
  chequear(`  y explica qué significa ${estado}`, pista.test(v[0].arreglo), v[0].arreglo);
}

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 8. El encabezado de la guía: sin él el PDF no tiene dónde ir ──");

const sinEncabezado = p.comparar(
  [buscar(usadas, "guia_de_envio")],
  [deMeta("guia_de_envio", { components: [{ type: "BODY", text: "Acá va tu guía." }] })]
);
chequear("se marca en rojo", sinEncabezado[0].nivel === "rojo");
chequear("el estado es de encabezado", sinEncabezado[0].estado === "encabezado");
chequear("y dice que hay que ponerle encabezado de Documento", /Documento/.test(sinEncabezado[0].arreglo));

const conEncabezado = p.comparar(
  [buscar(usadas, "guia_de_envio")],
  [
    deMeta("guia_de_envio", {
      components: [{ type: "HEADER", format: "DOCUMENT" }, { type: "BODY", text: "Acá va tu guía." }],
    }),
  ]
);
chequear("con el encabezado correcto pasa", conEncabezado[0].nivel === "verde");

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 9. El resumen prioriza: una roja tapa a las amarillas ──");

const mezcla = p.comparar(
  [buscar(usadas, "cierre_del_dia"), buscar(usadas, "novedad_ausente")],
  [
    deMeta("cierre_del_dia", { category: "MARKETING", components: [{ type: "BODY", text: "Resumen: {{1}}" }] }),
    // esta falta
  ]
);
const res = p.resumir(mezcla);
chequear("el titular arranca en rojo", /🔴/.test(res.titular), res.titular);
chequear("cuenta 1 roja y 1 amarilla", res.rojas === 1 && res.amarillas === 1);
chequear("y nombra la que no va a funcionar", /novedad_ausente/.test(res.titular));

// ───────────────────────────────────────────────────────────────────────────
console.log("\n── 10. Sin credenciales, el diagnóstico avisa en vez de mentir ──");

(async () => {
  const sinToken = { ...process.env };
  delete process.env.WHATSAPP_TOKEN;
  delete process.env.WHATSAPP_WABA_ID;
  const d1 = await p.diagnosticar();
  chequear("sin WHATSAPP_TOKEN no dice que todo está bien", d1.ok === false);
  chequear("y nombra la variable que falta", /WHATSAPP_TOKEN/.test(d1.error), d1.error);
  chequear(
    "pero igual muestra qué espera el bot, para poder crearlas a mano",
    Array.isArray(d1.queEsperaElBot) && d1.queEsperaElBot.length === 6
  );

  process.env.WHATSAPP_TOKEN = "token_falso";
  const d2 = await p.diagnosticar();
  chequear("con token pero sin WABA_ID también avisa", d2.ok === false && /WABA_ID/.test(d2.error));
  Object.assign(process.env, sinToken);

  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n── 11. Los fallos de entrega sobreviven al reinicio ──");

  // 🔑 Esto es lo que faltaba el 25-sep: el motivo del fallo llegaba por webhook
  // y se guardaba en memoria, así que el reinicio lo borraba. Cuando se fue a
  // buscar por qué no llegaba el cierre, la explicación ya no existía.
  store.anotarFalloEntrega({
    para: "573138615813",
    errores: [{ code: 131049, title: "No se entregó por límite de frecuencia" }],
    mensaje: "wamid.PRUEBA",
    categoria: "marketing",
  });

  let fallos = store.fallosDeEntrega();
  chequear("el fallo queda guardado", fallos.length === 1, JSON.stringify(fallos));
  chequear("con el motivo que dio Meta", fallos[0].errores[0].code === 131049);
  chequear("y con la hora", !!fallos[0].cuando);

  // Se relee desde disco, como después de un reinicio.
  delete require.cache[require.resolve("./src/store")];
  const store2 = require("./src/store");
  chequear(
    "sigue ahí después de recargar el módulo (el reinicio ya no lo borra)",
    store2.fallosDeEntrega().length === 1
  );

  // No crece sin límite: se quedan los últimos 200.
  for (let i = 0; i < 230; i++) {
    store2.anotarFalloEntrega({ para: "57300000" + i, errores: [] });
  }
  chequear(
    "no crece sin límite: se guardan los últimos 200",
    store2.fallosDeEntrega(500).length === 200,
    `quedaron ${store2.fallosDeEntrega(500).length}`
  );
  chequear(
    "y el más nuevo va primero",
    store2.fallosDeEntrega(1)[0].para === "57300000229"
  );

  console.log(`\n${mal === 0 ? "🟢" : "🔴"} ${ok}/${ok + mal} correctos.\n`);
  process.exit(mal === 0 ? 0 : 1);
})();
