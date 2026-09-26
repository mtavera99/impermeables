// ============================================================================
// 🧾 EL RECORRIDO DE COTIZACIÓN — el precio lo calcula el código, no el modelo
//
// DE DÓNDE SALE (26-sep). Se reportaron tres cotizaciones mal dadas el 25-sep:
//
//   · Palmira  → el bot dijo envío $23.100 y total $83.100. El tarifario da
//                $22.100 y $82.000 (banda C). Además $59.900 + $23.100 = $83.000,
//                así que el $83.100 no cierra ni con su propia suma.
//   · Cúcuta   → el bot dijo $82.000 (1 ud) y $148.000 (2 uds). El tarifario da
//                $83.000 y $140.000 (banda D). Los valores que dijo son los de
//                banda C.
//   · Gachancipá → ofreció $148.000 antes de conocer el destino.
//
// 🔴 LO QUE LA REVISIÓN ENCONTRÓ: `cotizar()` NO se llamaba en la conversación.
// El precio lo resolvía el modelo leyendo una tabla de texto con 107 ciudades en
// 5 bandas, metida dentro del guion. El tarifario existía, estaba probado y daba
// bien — y nadie lo consultaba.
//
// ⚠️ SOBRE LO QUE ESTO SÍ Y NO DEMUESTRA: es un mecanismo que hace POSIBLE esa
// clase de error, y los valores dichos coinciden con otras bandas. Eso es
// consistente con una confusión de filas, pero NO demuestra cómo el modelo
// eligió cada número. La corrección no depende de esa distinción: pedirle a un
// modelo que lea bien una tabla de 107 filas y sume, para decidir cuánto se
// cobra contraentrega, es la arquitectura equivocada en cualquier caso.
//
// ── LAS SIETE ETAPAS ───────────────────────────────────────────────────────
//   1. resolverDestino   ·  cinco salidas distintas, no una
//   2. resolverCantidad  ·  1, 2, o escalar
//   3. calcular          ·  cotizar() + estructura persistible
//   4. bloqueDeDatos     ·  los números exactos para ese turno
//   5. validarRespuesta  ·  🔑 revisar el mensaje ANTES de que salga
//   6. verificarPedido   ·  el ##ORDER## no puede contradecir la cotización
//   7. (descuentos)      ·  se conservan los aprobados; no se habilitan nuevos
//
// 🔑 LA ETAPA 5 ES LA QUE HACE LA DIFERENCIA. Sin ella, la 4 sigue siendo una
// instrucción al modelo — y este proyecto ya aprendió cinco veces que una
// instrucción no es un candado.
// ============================================================================

const fletes = require("./fletes");

// Versión de la política. Va pegada a cada cotización guardada: si mañana cambia
// un precio o un tope de descuento, se puede saber con qué reglas se cotizó.
const POLITICA_VERSION = "2026-09-26.1";

// Los topes de descuento APROBADOS hoy. No se habilitan nuevos acá: este módulo
// los lee, no los decide.
const TOPE_DESCUENTO_1_UNIDAD = 3000;

// ---------------------------------------------------------------------------
// ETAPA 1 — RESOLVER EL DESTINO
//
// Cinco salidas, y cada una lleva a una conducta distinta. Antes todo esto
// colapsaba en "banda E $85.000", que borra la diferencia entre una tarifa
// medida y una ciudad de la que no sabemos nada.
// ---------------------------------------------------------------------------
/**
 * @param {string} ciudad
 * @returns {{estado:string, ciudad:string, ...}}
 *   estado: "sin_destino" | "ambiguo" | "dificil_sin_tarifa" | "dificil_con_tarifa"
 *         | "reconocida" | "predeterminada"
 */
function resolverDestino(ciudad) {
  const nombre = String(ciudad == null ? "" : ciudad).trim();
  if (!nombre) return { estado: "sin_destino", ciudad: "" };

  // Nombre que existe en varios departamentos: NO se cotiza, se pregunta. Hay un
  // Mosquera en la sabana de Bogotá y otro en el Pacífico de Nariño.
  const deptos = fletes.departamentosPosibles(nombre);
  if (deptos) {
    return { estado: "ambiguo", ciudad: nombre, preguntarDepartamento: deptos };
  }

  const dificil = fletes.zonaDificilDe(nombre);
  if (dificil) {
    if (dificil.total === null) {
      return { estado: "dificil_sin_tarifa", ciudad: nombre, escalar: true, nota: dificil.nota };
    }
    return {
      estado: "dificil_con_tarifa",
      ciudad: nombre,
      totalConfirmado: dificil.total,
      sinPromo2: dificil.sinPromo2 === true,
      nota: dificil.nota,
    };
  }

  const clave = fletes.bandaDe(nombre);
  if (clave) {
    return { estado: "reconocida", ciudad: nombre, banda: clave };
  }

  // ========================================================================
  // ⚠️ TARIFA PREDETERMINADA — Y NO SE LE DICE "TECHO DE SEGURIDAD"
  //
  // La ciudad no está en el tarifario. `cotizar()` devuelve los números de la
  // banda por defecto y marca `reconocida: false`.
  //
  // 🔑 LLAMARLO "TECHO" SERÍA AFIRMAR ALGO QUE NO ESTÁ VERIFICADO: no hay
  // garantía de que ese valor cubra el costo logístico de CUALQUIER municipio.
  // El Charco está en la lista de difícil acceso justamente porque su flete real
  // ($55.563) supera de largo cualquier banda. Lo único cierto es que es una
  // tarifa predeterminada y que el costo específico de esa ciudad no se verificó.
  //
  // La política vigente se conserva (se cotiza con el predeterminado), pero
  // queda marcado para que el panel y el guion puedan tratarlo distinto.
  // ========================================================================
  return { estado: "predeterminada", ciudad: nombre, banda: fletes.BANDA_POR_DEFECTO };
}

// ---------------------------------------------------------------------------
// ETAPA 2 — RESOLVER LA CANTIDAD
// ---------------------------------------------------------------------------
const RE_DOS = /\b(2|dos)\s*(conjuntos?|impermeables?|unidades?|trajes?|kits?|pares?)\b|\bcombo\b|\bpromo(?:ci[oó]n)?\s*(?:de\s*)?(?:2|dos)\b|\bllevo\s*(?:2|dos)\b/i;
const RE_TRES_O_MAS = /\b([3-9]|1\d+|tres|cuatro|cinco|seis|diez|doce)\s*(conjuntos?|impermeables?|unidades?|trajes?|kits?)\b|\b(al por mayor|por mayor|mayorista|docena)\b/i;

/**
 * @returns {{uds:number, escalar:boolean, motivo?:string}}
 */
function resolverCantidad(texto) {
  const t = String(texto == null ? "" : texto);
  // 3+ se escala SIEMPRE: el flete de 6 o 12 unidades no está medido y cotizar a
  // ojo ya costó plata. Se revisa antes que el 2 para que "12 conjuntos" no se
  // lea como "2".
  if (RE_TRES_O_MAS.test(t)) {
    return { uds: 0, escalar: true, motivo: "cantidad de 3 o más: el flete no está medido" };
  }
  if (RE_DOS.test(t)) return { uds: 2, escalar: false };
  return { uds: 1, escalar: false };
}

// ---------------------------------------------------------------------------
// ETAPA 3 — CALCULAR
// ---------------------------------------------------------------------------
/**
 * La cotización estructurada. Es lo que se guarda y lo que valida todo lo demás.
 *
 * @returns {{
 *   ok:boolean, motivo?:string, destino:object,
 *   uds:number, producto:number, envio:number, total:number,
 *   ahorro:number|null, rescate:number|null, reconocida:boolean,
 *   politica:string, creado:number
 * }}
 */
/**
 * Todas las ciudades RECONOCIBLES que aparecen en un texto.
 *
 * Hace falta para el caso que pidió el dueño probar: el cliente que compara dos
 * destinos ("¿cuánto a Cali y cuánto a Pasto?"). Ahí no se puede elegir una por
 * él —cualquiera de las dos sería adivinar— así que se pregunta.
 *
 * Se prueban ventanas de 1 a 3 palabras, de la MÁS CORTA a la más larga:
 * `bandaDe` reconoce la ciudad dentro de una cadena más larga, así que empezando
 * por la ventana larga "para Cali" también daría positivo y arrastraría basura.
 */
function ciudadesEn(texto) {
  const salida = [];
  const vistas = new Set();
  for (const trozo of String(texto == null ? "" : texto).split(/[,.;:\n()/|?¿!¡]+/)) {
    const palabras = trozo.trim().split(/\s+/).filter(Boolean);
    for (const n of [1, 2, 3]) {
      for (let i = 0; i + n <= palabras.length; i++) {
        const cand = palabras.slice(i, i + n).join(" ");
        if (cand.length < 4 || /\d/.test(cand)) continue;
        if (!fletes.bandaDe(cand) && !fletes.departamentosPosibles(cand) && !fletes.zonaDificilDe(cand)) {
          continue;
        }
        const clave = fletes.normalizar(cand);
        // "Santa" y "Santa Marta" no cuentan como dos: se queda la primera que
        // coincide (la más corta), y las que la contienen se descartan.
        if ([...vistas].some((v) => clave.includes(v) || v.includes(clave))) continue;
        vistas.add(clave);
        salida.push(cand);
      }
    }
  }
  return salida;
}

function calcular(ciudad, texto) {
  // Si en el texto del turno hay más de un destino reconocible, no se cotiza: se
  // pregunta cuál es. Elegir una sería adivinar sobre el número que se cobra.
  const varias = ciudadesEn(texto || "");
  if (varias.length > 1) {
    return {
      ok: false,
      motivo: "varios_destinos",
      destino: { estado: "varios_destinos", ciudad: "", candidatas: varias },
      uds: resolverCantidad(texto || "").uds,
    };
  }

  const destino = resolverDestino(ciudad);
  const cantidad = resolverCantidad(texto || "");

  if (destino.estado === "sin_destino") {
    return { ok: false, motivo: "sin_destino", destino, uds: cantidad.uds };
  }
  if (destino.estado === "ambiguo") {
    return { ok: false, motivo: "ambiguo", destino, uds: cantidad.uds };
  }
  if (destino.estado === "dificil_sin_tarifa") {
    return { ok: false, motivo: "dificil_sin_tarifa", destino, uds: cantidad.uds };
  }
  if (cantidad.escalar) {
    return { ok: false, motivo: "cantidad_escalada", destino, uds: 0, detalle: cantidad.motivo };
  }
  // Difícil acceso con tarifa: solo 1 unidad, y el total es el confirmado.
  if (destino.estado === "dificil_con_tarifa" && (cantidad.uds > 1 || destino.sinPromo2)) {
    return { ok: false, motivo: "dificil_sin_promo", destino, uds: cantidad.uds };
  }

  const uds = cantidad.uds;
  const q = fletes.cotizar(destino.ciudad, uds);

  // ⚠️ GUARD: un total nulo NUNCA puede convertirse en un precio.
  // `fletes.fmt(null)` devuelve "$0", así que un total nulo que llegue a un
  // mensaje le diría al cliente que su pedido vale cero.
  if (!q || q.total == null || !Number.isFinite(Number(q.total)) || Number(q.total) <= 0) {
    return { ok: false, motivo: "sin_total", destino, uds };
  }

  // El ahorro del combo se calcula contra comprar dos sueltos, que es la
  // comparación que el cliente puede hacer.
  let ahorro = null;
  if (uds === 2) {
    const una = fletes.cotizar(destino.ciudad, 1);
    if (una && Number.isFinite(Number(una.total))) ahorro = una.total * 2 - q.total;
  }

  return {
    ok: true,
    destino,
    ciudad: destino.ciudad,
    banda: q.banda,
    reconocida: q.reconocida === true,
    uds,
    producto: q.producto,
    envio: q.flete,
    total: q.total,
    ahorro,
    // El rescate es el precio de negociación YA APROBADO para 2 unidades. Para 1
    // unidad el tope aprobado es $3.000 y se calcula aparte: no hay "precio de
    // rescate" de una unidad en la política vigente.
    rescate: uds === 2 ? q.rescate || null : q.total - TOPE_DESCUENTO_1_UNIDAD,
    politica: POLITICA_VERSION,
    creado: Date.now(),
  };
}

// ---------------------------------------------------------------------------
// ETAPA 4 — EL BLOQUE PARA EL MODELO
//
// Se genera en CÓDIGO. El modelo no calcula: recibe los números ya resueltos y
// su trabajo es la explicación comercial.
// ---------------------------------------------------------------------------
const fmt = fletes.fmt;

/** La línea de precio, escrita por el código. Es la que debería salir tal cual. */
function lineaDePrecio(cot) {
  if (!cot || !cot.ok) return "";
  if (cot.uds === 2) {
    return (
      `Dos conjuntos te quedan en ${fmt(cot.total)} en total: ${fmt(cot.producto)} los dos ` +
      `+ ${fmt(cot.envio)} de envío a ${cot.ciudad}` +
      (cot.ahorro ? `. Te ahorrás ${fmt(cot.ahorro)} contra llevarlos por separado` : "") +
      `, y pagas todo junto al recibir 📦`
    );
  }
  return (
    `Te queda en ${fmt(cot.total)} en total: ${fmt(cot.producto)} el conjunto ` +
    `+ ${fmt(cot.envio)} de envío a ${cot.ciudad}, y pagas todo junto al recibir 📦`
  );
}

/** El bloque de datos duros que se le inyecta al modelo para ESE turno. */
function bloqueDeDatos(cot, contexto = {}) {
  if (!cot) return "";

  if (!cot.ok) {
    const d = cot.destino || {};
    if (cot.motivo === "sin_destino") {
      return (
        `## PRECIO — TODAVÍA NO HAY DESTINO\n` +
        `⛔ NO des ningún total ni ningún valor de envío: no sabés a dónde va.\n` +
        `✅ SÍ podés decir el precio base del producto: ${fmt(fletes.PRECIO_PRODUCTO)} el conjunto ` +
        `(y ${fmt(fletes.PROMO_2_UNIDADES)} los dos), aclarando que el envío se suma aparte según la ciudad.\n` +
        `→ Preguntá la ciudad para dar el total exacto.`
      );
    }
    if (cot.motivo === "varios_destinos") {
      return (
        `## PRECIO — EL CLIENTE NOMBRÓ VARIOS DESTINOS\n` +
        `Nombró: ${(d.candidatas || []).join(", ")}.\n` +
        `⛔ NO des un total: no se sabe a cuál va el pedido. Preguntá cuál es el destino.\n` +
        `✅ Sí podés decir el precio base: ${fmt(fletes.PRECIO_PRODUCTO)} el conjunto, y que el envío ` +
        `depende de la ciudad.`
      );
    }
    if (cot.motivo === "ambiguo") {
      return (
        `## PRECIO — NOMBRE DE CIUDAD REPETIDO\n` +
        `"${d.ciudad}" existe en: ${(d.preguntarDepartamento || []).join(", ")}.\n` +
        `⛔ NO des ningún número. Preguntá de qué departamento es: el envío cambia mucho.`
      );
    }
    if (cot.motivo === "dificil_sin_tarifa") {
      return (
        `## PRECIO — DESTINO SIN TARIFA MEDIDA\n` +
        `${d.ciudad} es zona de difícil acceso y NO tiene tarifa confirmada.\n` +
        `⛔ NO des NINGÚN número, ni el de pueblos. Decí que confirmás el envío y escribís en un momento.`
      );
    }
    if (cot.motivo === "dificil_sin_promo") {
      return (
        `## PRECIO — DIFÍCIL ACCESO, SIN PROMO DE 2\n` +
        `En ${d.ciudad} el envío NO se comparte al llevar dos. ⛔ No ofrezcas la promo de 2 unidades.\n` +
        `Para una unidad el total confirmado es ${fmt(d.totalConfirmado)}.`
      );
    }
    if (cot.motivo === "cantidad_escalada") {
      return (
        `## PRECIO — CANTIDAD AL POR MAYOR\n` +
        `⛔ NO cotices. El flete de esas cantidades no está medido.\n` +
        `Decí que para esas cantidades hay precio especial y que lo pasás con un asesor.`
      );
    }
    return `## PRECIO — NO SE PUEDE COTIZAR\n⛔ No des números. Escalá al dueño.`;
  }

  // ⚠️ Acá se distingue tarifa reconocida de predeterminada, SIN afirmar que el
  // costo específico esté verificado.
  const aviso = cot.reconocida
    ? ""
    : `\n⚠️ ${cot.ciudad} NO está en el tarifario: este total sale de la tarifa predeterminada y ` +
      `su costo de envío específico no está verificado. Si el cliente pregunta, no prometas plazos ` +
      `de entrega; y si algo no cuadra, pasalo al dueño antes de confirmar.`;

  return (
    `## PRECIO YA CALCULADO — USÁ ESTOS NÚMEROS TAL CUAL\n` +
    `Destino: ${cot.ciudad} · cantidad: ${cot.uds}\n` +
    `Producto: ${fmt(cot.producto)}\n` +
    `Envío: ${fmt(cot.envio)}\n` +
    `TOTAL A COBRAR: ${fmt(cot.total)}\n` +
    (cot.ahorro ? `Ahorro contra llevar dos sueltos: ${fmt(cot.ahorro)}\n` : "") +
    `\n⛔ NO sumes, NO redondees, NO calcules nada. Estos números ya están validados.\n` +
    `⛔ NO menciones ningún otro valor de dinero que no esté en esta lista.\n` +
    // El precio de negociación se NOMBRA solo cuando ya se cumplió su condición.
    // Antes vivía en una tabla que el modelo leía siempre: ahí podía ofrecerlo de
    // entrada, que es regalar plata a quien iba a comprar igual.
    (contexto.objecionDePrecio && cot.rescate
      ? `\n💬 El cliente YA se quejó del precio, así que podés ofrecer UNA sola vez ` +
        `${fmt(cot.rescate)} como precio final, condicionado a cerrar ahora. ` +
        `No negocies un tercer precio ni encadenes rebajas.`
      : `⛔ NO ofrezcas ni menciones ningún descuento: el cliente no se ha quejado del precio.`) +
    aviso
  );
}

// ---------------------------------------------------------------------------
// ETAPA 5 — VALIDAR LA RESPUESTA ANTES DE QUE SALGA
// ---------------------------------------------------------------------------

// ⚠️ EXTRAER DINERO SIN CONFUNDIRLO CON DIRECCIONES NI TELÉFONOS.
//
// Una dirección colombiana está llena de números ("Cr 20 12328", "Calle 34
// #12-45") y un celular tiene 10 dígitos. Si el validador los toma por precios,
// bloquea mensajes buenos — y un validador que da falsas alarmas se apaga.
//
// Se reconoce dinero por SEÑAL EXPLÍCITA:
//   · con signo:        $83.000 · $ 83000
//   · con "mil":        83 mil · 83mil · $83 mil
//   · miles separados:  83.000 · 155.000  (el punto de millar es señal fuerte)
// Y se descartan los que vienen con marca de dirección o de teléfono.
const RE_DIRECCION_CERCA = /(?:calle|cll|cl|carrera|cra|kra|kr|diagonal|diag|transversal|tv|avenida|av|manzana|mz|casa|apto|apartamento|torre|bloque|interior|lote|km|kil[oó]metro)\s*\.?\s*$/i;

function extraerImportes(texto) {
  const t = String(texto == null ? "" : texto);
  const encontrados = [];

  const agregar = (valor, crudo, indice) => {
    if (!Number.isFinite(valor)) return;
    // Un precio de esta operación vive entre $10.000 y $500.000. Fuera de ese
    // rango es un número que no es dinero de una cotización.
    if (valor < 10000 || valor > 500000) return;
    encontrados.push({ valor, crudo, indice });
  };

  // 1) "83 mil" / "$83 mil" / "83mil"
  for (const m of t.matchAll(/\$?\s?(\d{1,3})\s*mil\b/gi)) {
    agregar(Number(m[1]) * 1000, m[0], m.index);
  }

  // 2) con signo de pesos, con o sin separadores
  for (const m of t.matchAll(/\$\s?(\d{1,3}(?:[.,]\d{3})+|\d{4,6})/g)) {
    agregar(Number(String(m[1]).replace(/[.,]/g, "")), m[0], m.index);
  }

  // 3) miles con separador, sin signo ("queda en 83.000")
  for (const m of t.matchAll(/(?<![\d.,$])(\d{1,3}(?:[.,]\d{3})+)(?![\d.,])/g)) {
    const antes = t.slice(Math.max(0, m.index - 24), m.index);
    // "Calle 34.000" no existe, pero una dirección puede traer separadores raros.
    if (RE_DIRECCION_CERCA.test(antes)) continue;
    agregar(Number(String(m[1]).replace(/[.,]/g, "")), m[0], m.index);
  }

  // Se quitan duplicados por posición (los patrones se solapan a propósito).
  const vistos = new Set();
  return encontrados.filter((e) => {
    const k = e.indice + ":" + e.valor;
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

/**
 * Los importes autorizados para ESTE turno, CON su significado.
 *
 * 🔑 No es una lista suelta de números: cada uno tiene un rol, y el rescate solo
 * entra si se cumplen sus condiciones. Un validador que solo revisa pertenencia
 * dejaría pasar el precio de rescate ofrecido de entrada, que es exactamente
 * regalar plata a quien iba a comprar igual.
 *
 * @param {object} cot
 * @param {{objecionDePrecio?:boolean}} contexto
 */
function importesAutorizados(cot, contexto = {}) {
  const mapa = new Map();
  const poner = (valor, rol) => {
    if (Number.isFinite(Number(valor)) && Number(valor) > 0) mapa.set(Number(valor), rol);
  };

  // El precio base del producto se puede decir siempre: no depende del destino.
  poner(fletes.PRECIO_PRODUCTO, "precio base del conjunto");
  poner(fletes.PROMO_2_UNIDADES, "precio base de dos conjuntos");

  if (cot && cot.ok) {
    poner(cot.producto, "producto de la cotización");
    poner(cot.envio, "envío de la cotización");
    poner(cot.total, "total de la cotización");
    if (cot.ahorro) poner(cot.ahorro, "ahorro del combo");
    // ⚠️ El rescate SOLO si el cliente ya objetó el precio. Es la condición de
    // la política vigente, y acá es donde se hace cumplir.
    if (contexto.objecionDePrecio && cot.rescate) {
      poner(cot.rescate, "precio de negociación autorizado");
    }
  } else if (cot && cot.motivo === "dificil_con_tarifa" && cot.destino) {
    poner(cot.destino.totalConfirmado, "total confirmado de difícil acceso");
  }

  return mapa;
}

/**
 * Revisa el mensaje que produjo el modelo ANTES de enviarlo.
 *
 * Comprueba tres cosas distintas:
 *   1. que todo importe mencionado esté autorizado Y con rol válido
 *   2. que las sumas que afirme el texto cuadren (A + B = C)
 *   3. que no aparezca un total cuando no hay destino
 *
 * @returns {{ok:boolean, problemas:Array<{tipo:string, detalle:string}>, importes:Array}}
 */
function validarRespuesta(texto, cot, contexto = {}) {
  const problemas = [];
  const importes = extraerImportes(texto);
  const autorizados = importesAutorizados(cot, contexto);

  for (const imp of importes) {
    if (!autorizados.has(imp.valor)) {
      problemas.push({
        tipo: "importe_no_autorizado",
        valor: imp.valor,
        detalle:
          `dijo ${fmt(imp.valor)} ("${imp.crudo}") y no es ninguno de los valores validados` +
          (autorizados.size
            ? `: ${[...autorizados.entries()].map(([v, r]) => `${fmt(v)} (${r})`).join(", ")}`
            : " (no hay cotización válida para este turno)"),
      });
    }
  }

  // Sin destino no puede aparecer un total con envío. El precio base sí.
  if (cot && !cot.ok && (cot.motivo === "sin_destino" || cot.motivo === "varios_destinos")) {
    for (const imp of importes) {
      if (imp.valor !== fletes.PRECIO_PRODUCTO && imp.valor !== fletes.PROMO_2_UNIDADES) {
        problemas.push({
          tipo: "total_sin_destino",
          valor: imp.valor,
          detalle: `dio ${fmt(imp.valor)} sin saber a dónde se despacha`,
        });
      }
    }
  }

  // Las sumas que el texto afirme tienen que cuadrar. Es lo que falló en Palmira:
  // $59.900 + $23.100 = $83.000, y el mensaje decía $83.100.
  for (const m of String(texto || "").matchAll(
    /(\$?\s?\d{1,3}(?:[.,]\d{3})+)\s*(?:\+|más|mas)\s*(\$?\s?\d{1,3}(?:[.,]\d{3})+)\s*(?:=|son|da|queda en|quedan en|total)\s*(\$?\s?\d{1,3}(?:[.,]\d{3})+)/gi
  )) {
    const n = (s) => Number(String(s).replace(/[^\d]/g, ""));
    const a = n(m[1]), b = n(m[2]), c = n(m[3]);
    if (a + b !== c) {
      problemas.push({
        tipo: "suma_que_no_cierra",
        detalle: `dijo ${fmt(a)} + ${fmt(b)} = ${fmt(c)}, y da ${fmt(a + b)}`,
      });
    }
  }

  return { ok: problemas.length === 0, problemas, importes };
}

// ---------------------------------------------------------------------------
// ETAPA 6 — EL PEDIDO NO PUEDE CONTRADECIR LA COTIZACIÓN
// ---------------------------------------------------------------------------
/**
 * @returns {{ok:boolean, problemas:Array, totalEsperado:number|null}}
 */
function verificarPedido(order, cot, contexto = {}) {
  const problemas = [];
  if (!order) return { ok: true, problemas, totalEsperado: null };

  const total = Number(order.total);
  if (!Number.isFinite(total) || total <= 0) {
    problemas.push({ tipo: "total_invalido", detalle: `el pedido trae total ${JSON.stringify(order.total)}` });
    return { ok: false, problemas, totalEsperado: cot && cot.ok ? cot.total : null };
  }

  if (!cot || !cot.ok) {
    problemas.push({
      tipo: "sin_cotizacion_validada",
      detalle:
        `el pedido se guardó por ${fmt(total)} pero no hay una cotización validada para este chat` +
        (cot && cot.motivo ? ` (${cot.motivo})` : ""),
    });
    return { ok: false, problemas, totalEsperado: null };
  }

  // La ciudad del pedido tiene que ser la de la cotización: si el cliente la
  // cambió, hay que re-cotizar, no despachar con el total viejo.
  const mismaCiudad =
    fletes.normalizar(String(order.ciudad || "")) === fletes.normalizar(String(cot.ciudad || ""));
  if (!mismaCiudad) {
    problemas.push({
      tipo: "ciudad_distinta",
      detalle: `el pedido va a "${order.ciudad}" y la cotización era para "${cot.ciudad}"`,
    });
  }

  // El total aceptado es el de lista, o el de negociación SI estaba autorizado.
  const aceptados = [cot.total];
  if (contexto.objecionDePrecio && cot.rescate) aceptados.push(cot.rescate);
  if (!aceptados.includes(total)) {
    problemas.push({
      tipo: "total_distinto",
      detalle:
        `el pedido dice ${fmt(total)} y la cotización validada es ${fmt(cot.total)}` +
        (cot.rescate
          ? ` (negociación autorizada: ${fmt(cot.rescate)}${contexto.objecionDePrecio ? "" : ", pero el cliente no objetó el precio"})`
          : ""),
    });
  }

  return { ok: problemas.length === 0, problemas, totalEsperado: cot.total };
}

// ---------------------------------------------------------------------------
// ¿El cliente objetó el precio? Condición para liberar el precio de negociación.
// ---------------------------------------------------------------------------
const RE_OBJECION_PRECIO =
  /\b(muy caro|est[aá] caro|car[oa]s?|car[ií]simo|descuento|rebaja|m[aá]s barato|no tengo tanto|no me alcanza|mejor precio|[uú]ltimo precio|se puede menos|me lo deja|baja[rs]?|econ[oó]mico)\b/i;

function hayObjecionDePrecio(mensajes) {
  return (mensajes || [])
    .filter((m) => m.role === "user")
    .some((m) => RE_OBJECION_PRECIO.test(String(m.content || "")));
}

module.exports = {
  POLITICA_VERSION,
  TOPE_DESCUENTO_1_UNIDAD,
  resolverDestino,
  resolverCantidad,
  calcular,
  lineaDePrecio,
  bloqueDeDatos,
  ciudadesEn,
  extraerImportes,
  importesAutorizados,
  validarRespuesta,
  verificarPedido,
  hayObjecionDePrecio,
};
