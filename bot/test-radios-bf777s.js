/**
 * 📻 RADIOS BAOFENG BF-777S — el cuarto producto (23-oct).
 *
 * Lo que esta batería defiende, en orden de lo que más plata cuesta si falla:
 *
 *   1. CERO CRUCE DE PRODUCTOS. Un cliente del Q58 que pregunta "¿tiene radio?"
 *      no puede terminar cotizando walkie-talkies, y un lead de radios no puede
 *      caer en el impermeable (que es el producto por defecto).
 *   2. CAJAS, NO RADIOS. "Quiero 4 radios" son 2 cajas. Si se leyera 4, se
 *      despacharía el doble.
 *   3. PRECIO CERRADO CON ENVÍO GRATIS. $99.000 / $169.000 / $229.000 son el total,
 *      y el validador tiene que DEJAR decir "envío gratis" acá (en el V10 lo borra).
 *   4. EL INFORME DE CPA no los confunde con el Q58 (sus totales caen en el mismo
 *      rango): se clasifican por la columna `producto` del CSV.
 *
 *   node test-radios-bf777s.js      (sin credenciales ni IA)
 */

const { execFileSync } = require("child_process");
const path = require("path");

const catalogo = require("./src/catalogo");
const cotizacion = require("./src/cotizacion");
const prompt = require("./src/prompt");
const primer = require("./src/primer-mensaje");
const fletes = require("./src/fletes");

const R = "radio_bf777s";
const Q = "intercom_q58_max";
const V = "intercom_v10_2x";
const I = "impermeable";

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
const conv = (productoActivo, messages = []) => ({ productoActivo, messages });

// ============================================================================
console.log("\n── 1. La ficha ──");
// ============================================================================
const r = catalogo.de(R);
chequear("el producto existe", Boolean(r));
chequear("precios $99.000 / $169.000 / $229.000", r.precios[1] === 99000 && r.precios[2] === 169000 && r.precios[3] === 229000, JSON.stringify(r.precios));
chequear("costo $40.000 por caja", r.costoUnitario === 40000);
chequear("cada caja son 2 radios", r.radiosPorUnidad === 2);
chequear("es producto simple (sin talla ni color)", catalogo.esProductoSimple(R) && !r.pideTalla && !r.pideColor);
chequear("es de la categoría radio, NO intercomunicador", catalogo.esRadio(R) && !catalogo.esIntercom(R));
chequear("el envío es gratis", catalogo.envioEsGratis(R) && r.envioIncluido === true);
chequear("el V10 y el Q58 siguen SIN envío gratis", !catalogo.envioEsGratis(V) && !catalogo.envioEsGratis(Q));
chequear("el impermeable sigue siendo el producto por defecto", catalogo.PRODUCTO_POR_DEFECTO === I);
chequear("la oferta del anuncio es 1 caja (el par)", r.ofertaPrincipal.unidades === 1);
chequear(
  "el id no tiene números que lean como cantidad (resumen.js busca 2, 3, x2, combo)",
  !/\b2\b|\b3\b|x2|2x|combo|dos|tres/.test(R)
);

// ============================================================================
console.log("\n── 2. 🔴 Cero cruce de productos ──");
// ============================================================================
const radioDe = (t) => (catalogo.productoEn(t) || {}).producto;
for (const t of [
  "Hola, quiero información de los radios",
  "cuanto valen los walkie talkie",
  "tienen walkies?",
  "info del baofeng",
  "el bf-777s",
  "necesito radios para la finca",
  "radio de comunicación para seguridad",
  "quiero 6 radios",
]) {
  chequear(`"${t}" → radios`, radioDe(t) === R, String(radioDe(t)));
}
for (const t of ["tiene radio?", "trae radio FM?", "la radio funciona sin celular?", "escucha emisoras de radio"]) {
  chequear(`"${t}" NO es de radios (es la radio FM del Q58)`, radioDe(t) !== R, String(radioDe(t)));
}
const enQ58 = catalogo.productoDelHilo(conv(Q), "y tiene radio fm?");
chequear("en un hilo del Q58, 'tiene radio fm?' se queda en el Q58", enQ58.producto === Q, JSON.stringify(enQ58));
const enRadio = catalogo.productoDelHilo(conv(R), "cuánto alcanzan?");
chequear("en un hilo de radios, una pregunta suelta se queda en radios", enRadio.producto === R);
const cambio = catalogo.productoDelHilo(conv(R), "y los intercomunicadores cuánto valen?");
chequear("desde radios, preguntar por intercomunicadores SÍ cambia de producto", catalogo.esIntercom(cambio.producto));
const adj = catalogo.productoDelHilo(conv(R), "son impermeables?");
chequear("'¿son impermeables?' en un hilo de radios NO lo manda al impermeable", adj.producto === R, JSON.stringify(adj));

console.log("\n   El anuncio:");
process.env.ANUNCIOS_RADIO = "120250000000000001";
chequear("el id configurado en ANUNCIOS_RADIO enruta a radios", catalogo.productoDelAnuncio({ source_id: "120250000000000001" }) === R);
chequear(
  "sin el id configurado, el TEXTO del anuncio también enruta",
  catalogo.productoDelAnuncio({ source_id: "999", titulo: "COMBO X 2 RADIOS a $99.000 envío gratis" }) === R
);
chequear(
  "el mapa de anuncios incluye ANUNCIOS_RADIO",
  catalogo.anunciosConfigurados().some((m) => m.variable === "ANUNCIOS_RADIO" && m.configurado)
);
const delAnuncio = catalogo.productoDelHilo(conv(null), "Hola", { producto: R });
chequear("un 'Hola' que viene del anuncio de radios es de radios", delAnuncio.producto === R);
process.env.ANUNCIOS_RADIO = "";

// ============================================================================
console.log("\n── 3. 🔴 Cajas, no radios ──");
// ============================================================================
const casos = [
  ["quiero 2 radios", 1],
  ["el par", 1],
  ["el combo x2", 1],
  ["quiero 4 radios", 2],
  ["cuatro radios por favor", 2],
  ["el combo x4", 2],
  ["el de 169 mil", 2],
  ["2 cajas", 2],
  ["dos cajas de 2 radios", 2],
  ["necesito 6 radios para la finca", 3],
  ["el megacombo", 3],
  ["el de 229.000", 3],
  ["3 cajas", 3],
  ["quería 6 pero mejor 4 radios", 2],
  ["8 radios", 4],
  ["un radio", null],
  ["3 radios", null],
  // 24-oct: el bot pregunta "¿cuántos RADIOS?", así que un número al principio son radios.
  ["quiero 2", 1],
  ["4", 2],
  ["Los 4", 2],
  ["6 para ráquira boyacá", 3],
  ["unos 12", 6],
  ["5", null],
  ["3001234567", null],
  ["calle 4 # 5-20", null],
  ["vivo en la calle 99 # 12-30", null],
  ["mi celular es 3001234567", null],
];
for (const [t, esperado] of casos) {
  const n = catalogo.unidadesPedidas(t, R);
  chequear(`"${t}" → ${esperado === null ? "sin decidir" : esperado + " caja(s)"}`, n === esperado, String(n));
}
chequear("y el V10 sigue leyendo 'combo' como 2 unidades", catalogo.unidadesPedidas("quiero el combo", V) === 2);
chequear("y el V10 sin producto también", catalogo.unidadesPedidas("quiero el combo") === 2);
chequear("4 cajas no tienen precio (se pasa a un asesor)", catalogo.precioDe(R, 4).fueraDeTabla === true);

// ============================================================================
console.log("\n── 4. Precio cerrado con envío gratis ──");
// ============================================================================
const cot = (ciudad, uds) => cotizacion.calcular(ciudad, "", { producto: R, cantidad: { uds } });
for (const [ciudad, uds, total] of [
  ["Bogota", 1, 99000],
  ["Cali", 2, 169000],
  ["Pasto", 3, 229000],
  ["Medellin", 1, 99000],
]) {
  const c = cot(ciudad, uds);
  chequear(`${uds} caja(s) a ${ciudad}: ${fletes.fmt(total)} y $0 de envío`, c.ok && c.total === total && c.envio === 0, JSON.stringify({ ok: c.ok, total: c.total, envio: c.envio, motivo: c.motivo }));
}
const c2 = cot("Cali", 2);
chequear("el ahorro de 2 cajas es $29.000 (lo que dijo el dueño)", c2.ahorro === 29000, String(c2.ahorro));
chequear("el ahorro de 3 cajas es $68.000", cot("Cali", 3).ahorro === 68000);
const c4 = cot("Cali", 4);
chequear("4 cajas: no se cotiza solo", !c4.ok && c4.motivo === "cantidad_sin_precio", c4.motivo);
chequear("y el V10 sigue cobrando envío aparte", cotizacion.calcular("Cali", "", { producto: V, cantidad: { uds: 2 } }).total === 122000);

const bloque = cotizacion.bloqueDeDatos(cot("Cali", 2), { producto: R });
chequear("el bloque dice el total y que el envío es gratis", /169\.000/.test(bloque) && /GRATIS/i.test(bloque), bloque);
chequear("el bloque traduce cajas a radios", /2 cajas/.test(bloque) && /4 radios/.test(bloque));
chequear("el bloque NO dice 'el envío va aparte'", !/va aparte|NO es gratis/.test(bloque));
const sinCiudad = cotizacion.bloqueDeDatos(cotizacion.calcular("", "hola", { producto: R, cantidad: { uds: 1 } }), { producto: R });
chequear("sin ciudad, el bloque igual da las tres opciones", /99\.000/.test(sinCiudad) && /169\.000/.test(sinCiudad) && /229\.000/.test(sinCiudad), sinCiudad);
chequear("y NO trae ningún precio de impermeable ni de intercomunicador", !/59\.900|110\.000|99\.900|129\.900/.test(bloque + sinCiudad));
const linea = cotizacion.lineaDePrecio(cot("Cali", 3));
chequear("la línea de precio nombra el megacombo, 3 cajas y 6 radios", /megacombo/.test(linea) && /3 cajas/.test(linea) && /6 radios/.test(linea), linea);
chequear("y no dice '+ $0 de envío'", !/\$0/.test(linea), linea);

console.log("\n   El validador:");
const ctx = { producto: R, messages: [] };
const v1 = cotizacion.validarRespuesta(
  "El combo x4 radios te queda en $169.000 con envío gratis a Cali, y pagás cuando lo recibís 📦",
  cot("Cali", 2),
  ctx
);
chequear("deja decir '$169.000 con envío gratis'", v1.ok, JSON.stringify(v1.problemas));
const v2 = cotizacion.validarRespuesta(
  "Tenemos el par a $99.000, 4 radios a $169.000 o 6 radios a $229.000, todos con envío gratis",
  cotizacion.calcular("", "hola", { producto: R, cantidad: { uds: 1 } }),
  ctx
);
chequear("sin ciudad, deja decir las tres opciones", v2.ok, JSON.stringify(v2.problemas));
const v3 = cotizacion.validarRespuesta("El par te queda en $85.000 con envío gratis", cot("Cali", 1), ctx);
chequear("pero NO un precio inventado", !v3.ok);
const v4 = cotizacion.validarRespuesta("El combo de 2 intercomunicadores sale $99.900 con envío gratis", cotizacion.calcular("Cali", "", { producto: V, cantidad: { uds: 2 } }), { producto: V, messages: [] });
chequear("y en el V10 'envío gratis' SIGUE prohibido", !v4.ok);

console.log("\n   El pedido:");
const ped = cotizacion.verificarPedido({ ciudad: "Cali", total: 169000, unidades: 2 }, cot("Cali", 2), { messages: [] });
chequear("un pedido de 2 cajas a $169.000 cuadra con la cotización", ped.ok, JSON.stringify(ped.problemas));
const pedMal = cotizacion.verificarPedido({ ciudad: "Cali", total: 169000, unidades: 4 }, cot("Cali", 2), { messages: [] });
chequear("si el modelo anota 4 (radios) en vez de 2 (cajas), el pedido queda en revisión", !pedMal.ok);

// ============================================================================
console.log("\n── 5. El guion, el primer mensaje y el seguimiento ──");
// ============================================================================
const g = prompt.buildSystemPrompt(R);
chequear("el guion es de radios", /BF-777S/.test(g) && /radios/.test(g));
chequear("dice que el envío es gratis", /GRATIS/.test(g));
chequear("enseña que unidades = cajas", /"unidades" ES EL NÚMERO DE CAJAS/.test(g));
chequear("trae la respuesta de la licencia", /licencia/.test(g));
chequear("no habla de tallas ni de casco a casco como función", !/talla de|colores de franja/.test(g) && !/- comunicación de casco a casco/.test(g));
chequear("prohíbe prometer 10 km y resistencia al agua", /10 km/.test(g) && /resistente al agua/.test(g));
chequear("el guion del V10 no cambió de producto", /V10 2X/.test(prompt.buildSystemPrompt(V)));
chequear("el del impermeable tampoco", !/BF-777S/.test(prompt.buildSystemPrompt(I)));

const arranque = primer.respuestaDeArranque([{ role: "user", content: "Hola" }], "Hola", R);
chequear("el 'Hola' del anuncio recibe el primer mensaje de radios", arranque && /BF-777S/.test(arranque) && /envío gratis/.test(arranque), String(arranque));
const arranque2 = primer.respuestaDeArranque(
  [{ role: "user", content: "Hola, quiero más información de los radios" }],
  "Hola, quiero más información de los radios",
  R
);
chequear("el prerrellenado del anuncio también", arranque2 && /99\.000/.test(arranque2) && /229\.000/.test(arranque2));
chequear("y el primer mensaje no dice tallas ni casco", arranque && !/talla|casco/i.test(arranque));

const seg = require("./src/seguimiento");
// textoDe no se exporta: se lee la tabla desde el archivo, igual que test-seguimiento-del-q58.
const fs = require("fs");
const segSrc = fs.readFileSync(path.join(__dirname, "src", "seguimiento.js"), "utf8");
chequear("el seguimiento tiene texto propio de radios", /radio_bf777s:\s*\{/.test(segSrc));
chequear("y respaldo por categoría radio", /radio:\s*TEXTOS_POR_PRODUCTO\.radio_bf777s/.test(segSrc));
chequear("y su plantilla es la suya (si falta, se salta)", r.seguimientoPlantillaEnv === "SEGUIMIENTO_PLANTILLA_RADIO");
void seg;

// ============================================================================
console.log("\n── 6. 🔑 El CSV y el informe de CPA ──");
// ============================================================================
const resumen = require("./src/resumen");
const store = require("./src/store");
const antes = store.getOrders ? store.getOrders : null;
const cab = resumen.pedidosCSV().split("\n")[0];
chequear("el CSV trae la columna producto", cab.includes('"producto"') || /,producto,|,producto$/.test(cab), cab);
chequear("y la columna banda, al final", /banda$/.test(cab.trim()), cab);
void antes;

// El clasificador del informe, corrido de verdad en Python.
const py = path.join(__dirname, "..", "analisis", "cpa-por-producto.py");
const script = `
import importlib.util, sys, types, json
src = open(${JSON.stringify(py)}).read().replace("_spec.loader.exec_module(lector)", "pass")
m = types.ModuleType("c"); m.__file__ = ${JSON.stringify(py)}
exec(compile(src, "c", "exec"), m.__dict__)
casos = [
  {"producto": "radio_bf777s", "total": "99000", "unidades": "1", "banda": "C", "dia_bogota": "2026-10-24"},
  {"producto": "radio_bf777s", "total": "229000", "unidades": "3", "banda": "", "dia_bogota": "2026-10-24"},
  {"producto": "intercom_q58_max", "total": "152000", "unidades": "2", "banda": "C", "dia_bogota": "2026-10-24"},
  {"producto": "", "total": "152000", "unidades": "2", "talla": "", "color": "", "dia_bogota": "2026-10-24"},
]
out = []
for p in casos:
    prod = m.producto_del_pedido(p)
    out.append([prod, m.contribucion(p, prod)])
print(json.dumps(out))
`;
let res = null;
try {
  res = JSON.parse(execFileSync("python3", ["-c", script], { encoding: "utf8" }));
} catch (e) {
  chequear("el clasificador de Python corre", false, String(e.message).slice(0, 300));
}
if (res) {
  chequear("un pedido de radios de $99.000 se clasifica RADIO, no Q58", res[0][0] === "RADIO", JSON.stringify(res[0]));
  chequear(
    "y deja $99.000 − $40.000 − flete real de banda C",
    res[0][1] === 99000 - 40000 - fletes.ENVIO_REAL_1.C,
    String(res[0][1])
  );
  chequear(
    "sin banda, el flete es el de la E (nunca se sobreestima la utilidad)",
    res[1][0] === "RADIO" && res[1][1] === 229000 - 3 * 40000 - fletes.ENVIO_REAL_1.E,
    JSON.stringify(res[1])
  );
  chequear("un Q58 con su id sigue siendo Q58", res[2][0] === "Q58");
  chequear("y un pedido viejo sin id se sigue clasificando por la forma", res[3][0] === "Q58");
}

// ============================================================================
console.log("\n── 7. Fotos reales y radio FM (24-oct) ──");
// ============================================================================
const mediaR = require("./src/media");
mediaR.olvidarCache && mediaR.olvidarCache();
for (const k of ["radio", "radio_contenido", "radio_caja"]) {
  chequear(`la foto ${k} existe y se ofrece`, mediaR.disponible(k));
}
chequear("el guion ya no dice que faltan fotos", !/TODAVÍA NO TENEMOS FOTOS/.test(prompt.buildSystemPrompt(R)));
chequear("y nombra el marcador de la foto principal", /\[\[MEDIA:radio\]\]/.test(prompt.buildSystemPrompt(R)));
const fm = catalogo.respuestaConfirmada("¿tienen radio fm?", R);
chequear("'¿tienen radio fm?' en radios contesta que sí trae FM", fm && fm.clave === "radioFm", JSON.stringify(fm));
const alc = catalogo.respuestaConfirmada("¿qué alcance tienen los radios?", R);
chequear("y una pregunta cualquiera con 'radios' NO cae en la respuesta del FM", alc && alc.clave === "alcance", JSON.stringify(alc));
const cont = catalogo.respuestaConfirmada("¿qué trae la caja?", R);
chequear("lo que trae la caja incluye correas y adaptador (se ve en la foto)", cont && /correas/.test(cont.respuesta) && /adaptador/.test(cont.respuesta));

// 🔴 24-oct: la primera venta de radios quedó en REVISAR por una tilde.
chequear(
  "'Oficina Interrapidisimo' y 'Oficina Interrapidísimo' son la misma dirección",
  require("./src/store").mismoValorDeCampo("direccion", "Oficina Interrapidisimo", "Oficina Interrapidísimo")
);
const srcStore = require("fs").readFileSync(require("path").join(__dirname, "src", "store.js"), "utf8");
chequear(
  "y el detector de correcciones usa esa comparación (no solo minúsculas)",
  /mismoValorDeCampo\(campo, nuevo, viejo\)/.test(srcStore)
);

// 🔴 24-oct: "para el lunes" se tomó como el municipio de destino.
for (const t of ["Me los puedes mandar para el lunes", "Tienes radios", "para mañana temprano"]) {
  chequear(`"${t}" no es un municipio`, cotizacion.ciudadPlausible(t) === "", cotizacion.ciudadPlausible(t));
}
chequear("y 'Tierralta' sí", cotizacion.ciudadPlausible("Tierralta") === "Tierralta");
const srcAgent = require("fs").readFileSync(require("path").join(__dirname, "src", "agent.js"), "utf8");
chequear("el reemplazo del cuadro detecta su propio bucle", /BUCLE CORTADO \(cuadro\)/.test(srcAgent));
chequear("y un 'te escribo en un momento' sin salida pasa al dueño", /loPuedePreguntar/.test(srcAgent));

// 🔴 27-oct: pedidos de radios en REVISAR porque la cotización tomó "enviar unpar" como ciudad.
{
  const cotRaro = { ...cot("Cali", 1), ciudad: "enviar unpar" };
  const v = cotizacion.verificarPedido({ ciudad: "Fundación, Magdalena", total: 99000, unidades: 1 }, cotRaro, { messages: [] });
  chequear("radios: ciudad distinta con el total correcto NO va a revisión (el envío es gratis)", v.ok, JSON.stringify(v.problemas));
  const vMal = cotizacion.verificarPedido({ ciudad: "Fundación, Magdalena", total: 85000, unidades: 1 }, cotRaro, { messages: [] });
  chequear("pero un total equivocado sí", !vMal.ok);
  const vDif = cotizacion.verificarPedido({ ciudad: "Mitú", total: 99000, unidades: 1 }, cotRaro, { messages: [] });
  chequear("y un destino de difícil acceso sí, para confirmar cobertura", !vDif.ok && vDif.problemas.some((p) => p.tipo === "destino_dificil"), JSON.stringify(vDif.problemas));
  const vV10 = cotizacion.verificarPedido({ ciudad: "Pasto", total: 122000, unidades: 2 }, cotizacion.calcular("Cali", "", { producto: V, cantidad: { uds: 2 } }), { messages: [] });
  chequear("en el V10 una ciudad distinta SIGUE yendo a revisión (el envío cambia el total)", !vV10.ok);
}

console.log(`\n${mal ? "🔴" : "🟢"} ${ok}/${ok + mal} correctos.\n`);
process.exit(mal ? 1 : 0);
