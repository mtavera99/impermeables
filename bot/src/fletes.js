// ============================================================================
// TARIFARIO REAL — 99 ENVÍOS
// Construido con las 79 guías auditadas del 10 al 19 de agosto de 2026.
// Script de origen: /analisis/tarifario-real.py (correr de nuevo si cambian tarifas).
//
// ⚠️ ESTE ARCHIVO REEMPLAZA UNA TABLA INVENTADA. La versión anterior decía
// Cali $13.000 (real $20.771), Cartagena $15.000 (real $20.771) y ponía $18.000
// como estimado para "otra ciudad" cuando los pueblos cuestan $25.029.
// Esa tabla es la causa documentada de la fuga de flete de la sección 0-H del
// archivo madre: se absorbían $3.900-4.900 por venta en destinos caros.
//
// 🔑 REGLA DE ORO: al cliente se le cotiza el TOTAL de su banda, nunca un rango
// de flete. Prometer "$15.000 a $20.000" fue el defecto (a) del pendiente #38.
// ============================================================================

const PRECIO_PRODUCTO = 59900;

// Los fletes de 99 Envíos NO son un continuo: caen en 5 escalones nítidos.
// `flete` = lo que cobra 99 Envíos (flete modal observado en la banda).
// `total` = lo que hay que cobrarle al cliente (producto + flete, redondeado
//           al millar hacia arriba). Cobrar esto deja la absorción en ~$0.
const BANDAS = {
  A: {
    // ⚠️ VIGILAR: el flete subió de $12.871 a $12.956 el 24-ago, así que el
    // colchón quedó en solo +$144. Sigue positivo, y subir $1.000 al 27% del
    // volumen (que además es el cliente más sensible al precio) para proteger
    // $144 no vale la pena todavía.
    // 🔔 GATILLO: si el flete pasa de $13.100, subir esta banda a $74.000.
    nombre: "Bogotá y sabana",
    flete: 12956,
    total: 73000,
    ciudades: ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA", "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"],
  },
  B: {
    // ⚠️ 19-SEP: sube de $77.000 a $78.000. El envío real de septiembre
    // (flete+seguro) es $21.038 y el total viejo dejaba el margen en $22.962,
    // o sea $282 bajo la meta de $23.244. Medido sobre 5 guías del export.
    nombre: "Boyacá, Casanare y Meta cercano",
    flete: 16843,
    total: 78000,
    ciudades: ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO", "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS", "CUCUNUBA", "UBATE", "CHOCONTA", "VILLA DE LEYVA"],
  },
  C: {
    // ⚠️ 19-SEP: sube de $81.000 a $82.000. El envío real de septiembre
    // (flete+seguro) es $25.055 y el total viejo dejaba el margen en $22.945,
    // o sea $299 bajo la meta. Es la banda con 27 guías en el export: el
    // hueco chico multiplicado por volumen alto.
    nombre: "Capitales grandes",
    flete: 20771,
    total: 82000,
    ciudades: ["MEDELLIN", "CALI", "BARRANQUILLA", "SOLEDAD", "CARTAGENA", "CARTAGENA DE INDIAS", "PEREIRA", "DOSQUEBRADAS", "MANIZALES", "BARRANCABERMEJA", "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA", "ITAGUI", "ENVIGADO", "SABANETA", "PALMIRA", "JAMUNDI", "YUMBO", "COPACABANA", "BUENAVENTURA", "PUERTO BERRIO", "OCANA"],
  },
  D: {
    nombre: "Ciudades intermedias",
    flete: 22870,
    total: 83000,
    ciudades: ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES", "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS", "SAMACA", "CUCUTA", "SAN JOSE DE CUCUTA", "PASTO", "VALLEDUPAR", "SINCELEJO", "QUIBDO", "RIOHACHA", "EL CERRITO"],
  },
  E: {
    // ⚠️ SE QUEDA EN $85.000 POR DECISIÓN DEL DUEÑO (24-ago), aunque el flete
    // subió de $25.029 a $25.481 y el colchón quedó en −$381 por venta.
    // Banda E es el 43% del volumen, así que absorber esos $381 cuesta
    // ~$2.262/día. La cartera lo tapa: con el tarifario completo la cuenta
    // queda en +$5.956 sobre 30 guías, porque el colchón de la banda D
    // (+$1.182 por guía) subsidia el hueco de la E.
    // Es una decisión de negocio válida: el dueño prefiere no arriesgar
    // conversión por $1.000. Ver /analisis/banda-e-85-vs-86.py.
    //
    // 🔔 GATILLO: si el flete de banda E pasa de $26.000, hay que subir el
    // precio o cambiar de transportadora. A $900 de absorción por venta son
    // ~$5.343/día y ahí la cartera ya NO lo tapa.
    nombre: "Pueblos y zona extendida",
    flete: 25481,
    total: 85000,
    // GUACHUCAL agregado el 11-sep: cobró $85.511 por no estar en ninguna lista
    // (solo $511 de más, pero era "no reconocida" y podía caer a un default peor).
    ciudades: ["GUACHENE", "GOMEZ PLATA", "ALGECIRAS", "REMEDIOS", "TUQUERRES", "TURBO", "PUERTO GAITAN", "ANSERMA", "LA UNION", "EL SANTUARIO", "LLORENTE", "SAN CARLOS DE GUAROA", "BUENAVISTA", "SAN GIL", "INZA", "MALAGA", "CAUCASIA", "SANTA ROSA DE CABAL", "RIOSUCIO", "MACEO", "PARATEBUENO", "SANTIAGO DE TOLU", "SAN ANDRES DE SOTAVENTO", "HISPANIA", "GUACARI", "SAN ESTANISLAO", "ACEVEDO", "PUERTO ASIS", "FUNES", "MAGANGUE", "SANTA ROSA DE OSOS", "DIBULLA", "URIBE", "EL TAMBO", "GUARNE", "LA MONTANITA", "GUACHUCAL"],
  },
};

// ============================================================================
// 🔴 BANDA F — DIFÍCIL ACCESO: NO SE COTIZA SOLO (agregado 2026-09-11, #97)
//
// LA FUGA QUE ORIGINA ESTO: la guía de EL CHARCO (Nariño, se llega por río)
// se cobró en $59.900 —el precio SIN envío— contra un flete real de $55.563.
// Pérdida: −$28.663 en UNA guía = el margen de 1,3 pedidos buenos.
//
// 🔑 LA CAUSA NO ERA LA TARIFA, ERA EL DEFAULT. Con `BANDA_POR_DEFECTO = "E"`
// cualquier destino desconocido se cotizaba a $85.000 (flete $25.481). Para un
// pueblo de carretera eso está bien y es el 43% del volumen. Pero para un
// destino fluvial, aéreo o insular el flete real es 2-3× ese número, y el
// default lo convertía en una venta a pérdida SIN QUE NADIE SE ENTERARA.
//
// LA REGLA: estos municipios NO usan la banda por defecto. O tienen un total
// MEDIDO, o se escalan al dueño. La IA no improvisa donde no tiene dato.
//
// Criterio de la lista: Pacífico fluvial (Chocó, Nariño, Cauca), Amazonía,
// Orinoquía profunda e insular. NO incluye los puertos y capitales con vía
// terrestre, que ya están tarifados: Buenaventura ($81.000), Quibdó ($83.000),
// Puerto Asís y Puerto Gaitán (banda E).
// ============================================================================
const ZONA_DIFICIL_ACCESO = {
  // ---- CON TOTAL MEDIDO: se puede cotizar, y es el número que va ----
  // TADÓ: confirmado por el dueño. Y ojo, es el único destino del país donde el
  // flete se DUPLICA con 2 unidades en vez de compartirse (2,20× vs 1,4-1,6×).
  TADO: { total: 93000, nota: "confirmado por el dueño", sinPromo2: true },
  // EL CHARCO: flete observado $55.563 en la guía del 10-sep (n=1).
  // 59.900 + 55.563 = 115.463 → se redondea hacia arriba, nunca hacia abajo.
  "EL CHARCO": { total: 115500, nota: "flete medido $55.563, n=1", sinPromo2: true },

  // ---- SIN DATO: total = null → NO SE COTIZA, SE ESCALA AL DUEÑO ----
  // Chocó fluvial
  ISTMINA: { total: null }, CONDOTO: { total: null }, NUQUI: { total: null },
  "BAHIA SOLANO": { total: null }, ACANDI: { total: null }, UNGUIA: { total: null },
  "EL CARMEN DE ATRATO": { total: null }, BOJAYA: { total: null },
  // Nariño fluvial / Pacífico
  TUMACO: { total: null }, BARBACOAS: { total: null }, "MAGUI PAYAN": { total: null },
  "ROBERTO PAYAN": { total: null }, "OLAYA HERRERA": { total: null },
  "BOCAS DE SATINGA": { total: null }, MOSQUERA: { total: null }, "LA TOLA": { total: null },
  "SANTA BARBARA DE ISCUANDE": { total: null }, "FRANCISCO PIZARRO": { total: null },
  // Cauca Pacífico
  GUAPI: { total: null }, TIMBIQUI: { total: null }, "LOPEZ DE MICAY": { total: null },
  // Antioquia fluvial (Atrato medio)
  "VIGIA DEL FUERTE": { total: null }, MURINDO: { total: null },
  // Amazonía
  LETICIA: { total: null }, "PUERTO NARINO": { total: null },
  "PUERTO LEGUIZAMO": { total: null }, MITU: { total: null },
  // Orinoquía profunda
  INIRIDA: { total: null }, "PUERTO CARRENO": { total: null },
  "LA PRIMAVERA": { total: null }, CUMARIBO: { total: null },
  // Insular
  "SAN ANDRES": { total: null }, PROVIDENCIA: { total: null },
};

// ============================================================================
// ⚠️ NOMBRES QUE SE REPITEN EN VARIOS DEPARTAMENTOS — HAY QUE PREGUNTAR
//
// Trampa real: RIOSUCIO está en banda E ($85.000) por Riosucio, CALDAS. Pero
// existe Riosucio, CHOCÓ, que es fluvial y cuesta mucho más. Si el cliente
// dice solo "Riosucio" y se asume Caldas, se repite exactamente el error de
// El Charco. Lo mismo con La Unión y El Tambo.
// ============================================================================
const CIUDADES_AMBIGUAS = {
  RIOSUCIO: ["Caldas", "Chocó"],
  "LA UNION": ["Nariño", "Valle", "Antioquia", "Sucre"],
  "EL TAMBO": ["Cauca", "Nariño"],
  "SANTA BARBARA": ["Antioquia", "Nariño", "Santander"],
  "SAN CARLOS": ["Antioquia", "Córdoba"],
  ARGELIA: ["Cauca", "Antioquia", "Valle"],
  // 🔴 AGREGADO 21-SEP — BUG QUE COSTABA VENTAS EN BANDA A.
  // MOSQUERA estaba en BANDAS.A (Mosquera, Cundinamarca, sabana de Bogotá,
  // $73.000) y AL MISMO TIEMPO en ZONA_DIFICIL_ACCESO (Mosquera, Nariño,
  // fluvial). Como difícil acceso se evalúa ANTES que la banda, "Mosquera"
  // devolvía banda F con `escalar: true`: el bot se NEGABA a cotizar un
  // municipio del área metropolitana de Bogotá y lo mandaba al dueño.
  // Banda A es el 27% del volumen. Ahora pregunta el departamento, que es
  // la conducta correcta y la misma que ya tenía Riosucio.
  MOSQUERA: ["Cundinamarca", "Nariño"],
};

// ============================================================================
// RESOLUCIÓN DE NOMBRES DE CIUDAD (agregado 21-sep tras el export del agente)
//
// EL PROBLEMA MEDIDO: en el export del Meta Business Agent, el 47,6% de los
// pedidos traía una ciudad que `cotizar()` NO reconocía → caía al default
// (banda E, $85.000). 124 variantes de nombre distintas.
//
// Y el caso más caro son las LOCALIDADES DE BOGOTÁ: "Bogotá (Suba)",
// "Bogotá - Fontibón", "Bosa", "Bogotá - Usaquén - Codito" cotizaban $85.000
// cuando Bogotá es banda A = $73.000. Son **$12.000 de sobreprecio** en el
// 27% del volumen y en el cliente más sensible al precio que tenemos.
//
// 🔑 LO QUE ESTO HACE Y LO QUE NO HACE:
//   ✅ Reconoce ciudades que YA ESTÁN en la tabla, escritas de otra forma:
//      con departamento ("Cartagena Bolívar"), con barrio ("Madrid (Barrio
//      San José)"), con localidad ("Bogotá - Fontibón"), con separadores
//      ("San Cristóbal - Medellín", "Buenaventura / Barrio Cascajal").
//   ⛔ NO le inventa banda a una ciudad que no esté tarifada. Eso sería
//      repetir el error 0-N (la tabla vieja era inventada). Las ciudades
//      genuinamente nuevas siguen cayendo al default y quedan listadas en
//      CIUDADES_SIN_TARIFA para que el dueño las mida.
// ============================================================================

const DEPARTAMENTOS = [
  "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ATLANTICO", "BOLIVAR", "BOYACA",
  "CALDAS", "CAQUETA", "CASANARE", "CAUCA", "CESAR", "CHOCO", "CORDOBA",
  "CUNDINAMARCA", "GUAINIA", "GUAVIARE", "HUILA", "LA GUAJIRA", "GUAJIRA",
  "MAGDALENA", "META", "NARINO", "NORTE DE SANTANDER", "PUTUMAYO", "QUINDIO",
  "RISARALDA", "SANTANDER", "SUCRE", "TOLIMA", "VALLE DEL CAUCA", "VALLE",
  "VAUPES", "VICHADA",
];

// Las 20 localidades de Bogotá. Si el cliente nombra una, ES Bogotá → banda A.
// ⚠️ Solo se usan como coincidencia EXACTA del nombre completo, o cuando la
// cadena dice "BOGOTA". Si no, "El Carmelo (Candelaria)" —que es Valle—
// caería en La Candelaria de Bogotá y cotizaría mal.
const LOCALIDADES_BOGOTA = [
  "USAQUEN", "CHAPINERO", "SANTA FE", "SAN CRISTOBAL", "USME", "TUNJUELITO",
  "BOSA", "KENNEDY", "FONTIBON", "ENGATIVA", "SUBA", "BARRIOS UNIDOS",
  "TEUSAQUILLO", "LOS MARTIRES", "ANTONIO NARINO", "PUENTE ARANDA",
  "LA CANDELARIA", "RAFAEL URIBE URIBE", "CIUDAD BOLIVAR", "SUMAPAZ",
];

// Municipios que aparecieron en el export y NO están tarifados. Hoy cotizan
// al default (banda E, $85.000). Varios son áreas metropolitanas que
// probablemente son más baratas, pero NO se les asigna banda sin medir.
// 🔔 PENDIENTE: pedir a 99 Envíos el flete real de estos destinos.
const CIUDADES_SIN_TARIFA = [
  "FLORIDABLANCA", "GIRON", "PIEDECUESTA", // área metro de Bucaramanga (banda D)
  "TULUA", "CARTAGO", "GINEBRA", "FLORIDA", "CANDELARIA", // Valle
  "PITALITO", "TERUEL", "VILLAVIEJA", "PALERMO", "SALADOBLANCO", // Huila
  "APARTADO", "LA CEJA", "FRONTINO", "EL BAGRE", "EL PENOL", "CONCORDIA",
  "COPACABANA", "SAN PEDRO DE LOS MILAGROS", "CALDAS", "CAMPAMENTO",
  "TOLEDO", "SAN PEDRO DE URABA", "EL CARMEN DE VIBORAL", // Antioquia
  "COROZAL", "SAMPUES", "MAJAGUAL", "SAN JUAN DE BETULIA", "SAN BENITO ABAD",
  "SAN LUIS", // Sucre
  "MONTELIBANO", "CANALETE", "COTORRA", "PLANETA RICA", // Córdoba
  "GALAPA", "SABANAGRANDE", "PUERTO COLOMBIA", "BARANOA", "PALMAR DE VARELA", // Atlántico
  "ARJONA", "TURBANA", "CALAMAR", "CARMEN DE BOLIVAR", "TALAIGUA NUEVO",
  "SAN ESTANISLAO DE KOSTKA", // Bolívar
  "EL COPEY", "SAN ALBERTO", "SANDIEGO", "CHIRIGUANA", // Cesar
  "CIENAGA", "ALGARROBO", "PLATO", // Magdalena
  "NEMOCON", "MEDINA", "GUTIERREZ", "SESQUILE", "SAN FRANCISCO", "ARCABUCO", // Cundi/Boyacá
  "SALAMINA", "PACORA", // Caldas
  "MONTENEGRO", // Quindío
  "CHITA", "IZA", // Boyacá
  "TAME", "ARAUQUITA", // Arauca
  "TRINIDAD", "MONTERREY", // Casanare
  "GRANADA", "BARRANCA DE UPIA", "PACHAQUIARO", // Meta
  "CHACHAGUI", "LEIVA", "CUMBAL", // Nariño
  "ROSAS", "PUERTO TEJADA", "PAEZ", "BELALCAZAR", // Cauca
  "EL CARMEN", "CHITAGA", // Norte de Santander
  "ALBANIA", // Santander
  "LA HORMIGA", "VALLE DEL GUAMUEZ", "COLON", // Putumayo
  "SAN JOSE DEL GUAVIARE", "EL RETORNO", // Guaviare
  "SAN VICENTE DEL CAGUAN", // Caquetá
  "BARRANCAS", // La Guajira
  "SAN JOSE DE LA MONTANA",
];

// Si la ciudad no está en ninguna lista, se asume la banda MÁS CARA.
// Antes el default era $18.000 y se quedaba corto en todos los pueblos, que son
// justo los destinos que no aparecen en ninguna lista. Errar hacia arriba cuesta
// una objeción de precio; errar hacia abajo cuesta $4.900 de margen por venta.
//
// ⚠️ 11-sep: este default es correcto SOLO para pueblos de carretera. Los
// destinos fluviales/aéreos/insulares se atajan antes en ZONA_DIFICIL_ACCESO,
// porque para ellos $85.000 es una venta a pérdida (ver El Charco).
const BANDA_POR_DEFECTO = "E";

// ============================================================================
// 🔑 EL FLETE NO ES UN SORTEO: EL DUEÑO ELIGE LA TRANSPORTADORA
//
// 99 Envíos reparte entre interrapidísimo, servientrega y coordinadora, y cada
// una cobra distinto por el MISMO destino. El dueño SÍ puede elegir, y elige por
// eficiencia y por costo según la ubicación.
//
//   Bogotá:    coordinadora $11.880 · interrapidísimo $12.871 · servientrega $14.674
//   Cartagena: servientrega $20.771 · interrapidísimo $22.793
//   Bello:     coordinadora $20.710 · interrapidísimo $22.714
//
// CONSECUENCIA PARA ESTE ARCHIVO: los totales de abajo son alcanzables SI se
// elige bien la transportadora. Las dos reglas que hacen que el precio cierre:
//   · Bogotá y sabana → coordinadora o interrapidísimo. NO servientrega
//     (a $14.674 el total de $73.000 se queda corto $1.574).
//   · Cartagena → servientrega ($20.771). Con interrapidísimo faltan $1.693.
//     ⚠️ Excepto que se prefiera pagar por confiabilidad: Cartagena es la ciudad
//     que más rechaza, y una devolución cuesta mucho más que $2.022.
// ============================================================================

// Promo vigente: 2 conjuntos por $110.000 (el envío se cobra ADEMÁS).
// ⚠️ El flete de 2 unidades NO se predice desde el de 1: los aumentos observados
// van de +$3.008 a +$15.089 porque 2 unidades cruzan escalones de peso distintos
// según la transportadora. Por eso `cotizar()` nunca da un total firme de 2
// unidades: marca `requiereConfirmacion` para que se mire el panel.
const PROMO_2_UNIDADES = 110000;

// Fletes de 2 unidades REALMENTE observados, para cotizar rápido lo conocido.
const FLETE_2_OBSERVADO = {
  "BOGOTA": 17658,
  PEREIRA: 27608,
  MEDELLIN: 27891,
  SOLEDAD: 27758,
  COPACABANA: 27758,
  MANIZALES: 26915,
  PALMIRA: 26915,
  VILLAVICENCIO: 25445,
  "CARTAGENA DE INDIAS": 35860,
  CARTAGENA: 35860,
  CAUCASIA: 28037,
  "SANTA ROSA DE CABAL": 28014,
  HISPANIA: 34112,
  "EL TAMBO": 31774,
  GUARNE: 31774,
  "LA MONTANITA": 32458,
};

// Total de la promo de 2 unidades POR BANDA.
// ⚠️ CORRECCIÓN DEL 24-AGO: se estaba cobrando un $138.000 PLANO para todo el
// país, y el flete de 2 unidades va de $17.658 a $32.458. Eso sobrecobraba
// $10.342 en Bogotá (riesgo de perder la venta) y absorbía $3.774 en los
// destinos caros. La promo tiene que seguir las bandas, igual que 1 unidad.
// ⚠️ CORRECCIÓN DEL 19-SEP: las 5 bandas estaban por debajo del margen.
// Medido sobre las 226 guías del export del 18-sep, el envío REAL de 2 unidades
// subió entre 26% y 54% desde agosto (Bogotá $17.658 → $23.947). Con los totales
// viejos el margen quedaba entre $15.893 y $19.026/ud contra una meta de $23.244:
// se dejaban de cobrar $12.314 por cada pedido de 2 unidades = $1.091.682/mes.
//
// Los nuevos totales salen de: 2×costo_producto + envío_real_2uds + 2×$23.244,
// redondeado hacia ARRIBA al millar. Verificado en
// /analisis/verificar-guion-definitivo-19sep.py (las 5 quedan sobre la meta).
//
// El cliente sigue ahorrando llevando dos: entre $9.000 (banda A) y $14.000
// (banda D) contra comprar dos sueltos, así que el argumento de venta se mantiene.
//
// 🔔 GATILLO: si el envío de 2 uds de la banda E pasa de $47.000, revisar otra vez.
// ⚠️ BANDA D BAJÓ DE $152.000 A $140.000 POR DECISIÓN DEL DUEÑO (22-sep).
// No es un cálculo: es una decisión de negocio, tomada con los números a la
// vista, y queda escrita para que nadie la "corrija" pensando que es un error.
//
// EL CASO QUE LA ORIGINA: un cliente de Montería (banda D) vio $152.000 y se
// fue del chat. El dueño le escribió a mano ofreciéndole $137.000.
//
// LA CUENTA, con el envío real de 2 uds en banda D ($37.832):
//   a $152.000 → $24.084/ud antes de pauta  (+$840 sobre la meta)
//   a $140.000 → $18.084/ud antes de pauta  (−$5.160 bajo la meta)
//   a $137.000 → $16.584/ud antes de pauta  (−$6.660 bajo la meta)
//
// POR QUÉ ES DEFENDIBLE: la alternativa real casi nunca es "paga $152.000".
// Es "se lleva UNA sola a $83.000", que deja $23.713 en total. Vender DOS a
// $140.000 deja $36.168: son $12.455 MÁS que vender una. El dueño prefiere
// volumen a margen por unidad en esta banda, y con estos números cierra.
//
// ⚠️ LO QUE ESTO CUESTA, para que esté dicho: son $12.000 menos por pedido de
// 2 unidades en banda D, incluido el cliente que hubiera pagado $152.000 sin
// chistar. Ver /analisis/bajar-a-137-22sep.py.
//
// 🔔 GATILLO: si el envío de 2 uds de banda D pasa de $44.000, a $140.000 el
// margen cae bajo $15.000/ud y hay que volver a mirarlo.
const PROMO_2_TOTAL = { A: 137000, B: 146000, C: 152000, D: 140000, E: 158000 };

// ============================================================================
// 💬 PRECIO DE RESCATE — el descuento que NO se regala
//
// Existe por una distinción que cuesta plata confundir: bajar la LISTA se lo
// regala a todos, incluidos los que pagaban sin chistar. Medido: 89 pedidos de
// 2 unidades al mes, así que cada $1.000 de rebaja general son $89.000/mes.
//
// El precio de rescate se usa SOLO cuando el cliente ya puso la objeción de
// precio o se está yendo. Ahí el descuento no regala nada, porque la
// alternativa es perder la venta o vender una sola unidad.
//
// ⛔ LA REGLA QUE LO SOSTIENE, y está en el prompt: el bot NO lo ofrece de
// entrada. Si lo ofreciera de entrada se convierte en la lista nueva y
// volvemos al regalo.
//
// 🔒 PISO ABSOLUTO: por debajo de $127.545 en banda D, vender DOS deja menos
// que vender UNA a $83.000. Ese límite no se cruza, y hay una prueba que lo
// verifica en test-desglose-honesto.js.
// ============================================================================
// ============================================================================
// 💬 PRECIO DE RESCATE DE 2 UNIDADES — TODAS LAS BANDAS (23-sep)
//
// ANTES: solo banda D, porque su lista bajó a $140.000 y quedó desalineada.
//
// POR QUÉ SE ABRIÓ A TODAS. El dueño lo planteó así: *"yo negociaba mucho el
// precio... varios de esos pedidos los vendí en 135.000... como yo era flexible
// creo que llegaba a vender un poquito más"*. Se midió sobre los 6.317 chats
// (ver analisis/negociar-el-precio-23sep.js) y tenía razón, pero SOLO en combos:
//
//   de los 22 combos cerrados a mano, 18 (81,8%) fueron por debajo de la lista,
//   con rebaja mediana de $9.000 — y el margen mediano siguió en $38.053.
//   NINGUNO de los 113 pedidos quedó en pérdida.
//
// Y la razón económica es la que decide, porque no depende de la elasticidad:
//
//   🔑 LA SEGUNDA UNIDAD NO PAGA PAUTA. El costo de traer al cliente se paga una
//      vez por PEDIDO, no por unidad. Con cierre al 5% son ~$20.000 por pedido.
//
//   margen DESPUÉS de pauta:   1 unidad ....... $3.303 a $5.094
//                              2 unidades ..... $16.168 a $27.403
//
//   O sea que un combo con $10.000 de descuento deja entre 3,3 y 5,1 VECES más
//   que una unidad a precio full. El descuento no sirve para salvar una venta de
//   1 unidad (ahí no hay de dónde): sirve para convertir una de 1 en una de 2.
//
// ⚠️ BANDA D SE QUEDA EN $137.000 A PROPÓSITO. Su lista ($140.000) ya está baja
// y su combo deja $16.168 después de pauta contra ~$27.000 de las demás. Ahí el
// problema es el precio de LISTA, no la falta de descuento: hay que subirlo a
// ~$145.000, no descontarlo más. Bajarla a $135.000 dejaría $11.168.
//
// ⚠️ Y ESTOS PISOS SE MUEVEN CON EL CIERRE. Si el cierre baja, la pauta por
// pedido sube y el margen real se encoge: a 4,1% son $24.390 por pedido en vez
// de $20.000. Descontar cuando el cierre está bajo es justo cuando menos se
// puede. Si el cierre se queda por debajo del 4%, revisar esta tabla.
// ============================================================================
const PROMO_2_RESCATE = { A: 127000, B: 136000, C: 142000, D: 137000, E: 148000 };

// ============================================================================
// 🔴 EL ENVÍO QUE SE LE MUESTRA AL CLIENTE (agregado 22-sep por una venta perdida)
//
// LO QUE PASÓ: a un cliente de Montería (banda D) el bot le desglosó
// "2 conjuntos $110.000 + envío $42.000 = $152.000". El cliente entró a la
// plataforma de 99 Envíos, vio que ese envío cuesta ~$37.000, y se fue.
//
// 🔑 EL ENVÍO ES EL ÚNICO NÚMERO QUE EL CLIENTE PUEDE VERIFICAR POR FUERA.
// El precio de "dos conjuntos" no lo puede comparar con nada; el flete sí.
// Entonces inflar el flete es justo el peor lugar donde poner el margen.
//
// Y no era solo Montería: el desglose NO CERRABA EN NINGUNA BANDA, porque el
// `flete` cargado y el `total` salen de fuentes distintas. Medido:
//   1 ud:  producto + flete quedaba entre $144 y $1.329 POR DEBAJO del total
//          (y en banda E daba $381 POR ENCIMA, o sea la suma contradecía el total)
//   2 uds: el residual inflaba el envío entre $2.786 y $4.168 en TODAS las bandas
//
// LA REGLA QUE QUEDA, y está blindada con pruebas:
//   1. producto + envío tiene que dar EXACTAMENTE el total. Siempre.
//   2. el envío que se muestra NUNCA puede ser mayor que el envío real medido.
//   3. el margen va en la línea del producto, que es la que no se puede auditar.
//
// El total NO cambia y el margen NO cambia: es solo dónde se para el dinero.
// Ver /analisis/monteria-2uds-22sep.py.
// ============================================================================

// Envío REAL (flete + seguro) medido sobre las 226 guías del export del 18-sep.
// Es la referencia contra la que se compara lo que se muestra. No se cobra esto:
// se usa para no pasarse.
const ENVIO_REAL_1 = { A: 14906, B: 21038, C: 25055, D: 26287, E: 28697 };
const ENVIO_REAL_2 = { A: 23947, B: 32597, C: 38784, D: 37832, E: 45214 };

// Se redondea HACIA ABAJO al millar: así el número que se dice queda siempre
// por debajo del real, nunca por encima. Con banda D da $37.000, que es
// exactamente lo que el cliente de Montería vio en la plataforma.
function alMillarAbajo(n) {
  return Math.floor(n / 1000) * 1000;
}

/**
 * El precio de rescate de una banda, o null si esa banda no tiene.
 * Solo aplica a pedidos de 2 unidades.
 */
function rescateDe(claveBanda, uds) {
  if (uds !== 2) return null;
  const r = PROMO_2_RESCATE[claveBanda];
  if (!r) return null;
  // Nunca por encima de la lista: sería un "descuento" más caro.
  if (r >= PROMO_2_TOTAL[claveBanda]) return null;
  return r;
}

/**
 * Cómo se le presenta el precio al cliente: producto + envío = total, cerrado.
 *
 * @param {string} claveBanda  A..E
 * @param {number} uds
 * @param {number} total       el total firme que ya se decidió cobrar
 * @param {number} [fleteCiudad] flete real medido de ESA ciudad, si existe
 */
function desgloseDe(claveBanda, uds, total, fleteCiudad) {
  if (uds === 1) {
    // El producto es el precio del anuncio y no se toca: el envío es el resto.
    // Da entre $13.100 y $25.100 según la banda, siempre por debajo del real.
    return { producto: PRECIO_PRODUCTO, envio: total - PRECIO_PRODUCTO };
  }

  if (uds === 2) {
    // ⚠️ SE USA EL MAYOR ENTRE LA BANDA Y LA CIUDAD, y el orden importa.
    //
    // La primera versión de esto confiaba en el flete medido de la ciudad
    // (FLETE_2_OBSERVADO) por parecer "más preciso". Salió mal y lo cazó la
    // prueba: en Bogotá mostraba un envío de $17.000, y como el total es
    // $137.000, el producto quedaba en $120.000 — MÁS que comprar dos sueltos
    // ($119.800). El bot le habría ofrecido una "promo" más cara que el precio
    // normal, que es peor que el problema que vinimos a arreglar.
    //
    // 🔑 LA CAUSA: FLETE_2_OBSERVADO es de AGOSTO y quedó viejo. El envío de 2
    // unidades subió entre 26% y 54% en septiembre (Bogotá $17.658 → $23.947,
    // ver la corrección del 19-sep). Los totales de PROMO_2_TOTAL se calcularon
    // con los números de septiembre, así que el desglose tiene que usar los
    // mismos o no cierra con la realidad.
    //
    // Se toma el mayor para cubrir el caso de una ciudad que sí esté por encima
    // de su banda: ahí el total también sube y el desglose lo tiene que seguir.
    const base = Math.max(ENVIO_REAL_2[claveBanda] ?? ENVIO_REAL_2.E, fleteCiudad ?? 0);
    let envio = alMillarAbajo(base);
    // Salvavidas: si el total no alcanzara a cubrir ese envío, se muestra el
    // resto y no un producto negativo. No debería pasar, y hay prueba.
    if (envio >= total) envio = total - PROMO_2_UNIDADES;
    return { producto: total - envio, envio };
  }

  // 3+ unidades: el par va a precio de promo y el resto a precio lleno.
  const producto = PROMO_2_UNIDADES + (uds - 2) * PRECIO_PRODUCTO;
  return { producto, envio: total - producto };
}

// Recargo de flete por unidad adicional en el mismo pedido.
// Observado en 6 pedidos de 2 unidades: el flete NO se duplica, sube entre
// $6.838 y $15.089 (mediana ~$7.100).
//
// ⚠️ ES UNA ESTIMACIÓN, NO UNA TARIFA. Y además el PRECIO del producto para 2
// unidades no está definido: los pedidos reales se cobraron entre $54.058 y
// $59.991 por unidad, o sea que cada cierre improvisó (pendiente #44).
// Por eso `cotizar()` marca `requiereConfirmacion` en cualquier pedido de 2+ y
// el guion tiene instrucción explícita de NO inventar el total: pasa a humano.
const RECARGO_UNIDAD_EXTRA = 7100;

function fmt(n) {
  return "$" + Number(n || 0).toLocaleString("es-CO");
}

// Quita tildes y normaliza para que "Bogotá D.C.", "bogota" y "BOGOTÁ" caigan igual.
// Los separadores (coma, guion, barra, paréntesis) quedan como espacios, así
// "Madrid (Barrio San José)" → "MADRID BARRIO SAN JOSE".
function normalizar(ciudad) {
  return String(ciudad || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\bD\.?\s?C\.?\b/g, "")
    .replace(/[^A-Z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Departamentos donde un nombre repetido puede ser un destino fluvial, aéreo o
// insular. Si el cliente nombra uno de estos con una ciudad ambigua, NO se
// cotiza: se escala. Es la lección de El Charco (−$28.663 en una sola guía).
const DEPTOS_RIESGO = new Set([
  "CHOCO", "NARINO", "CAUCA", "AMAZONAS", "GUAINIA", "VAUPES", "VICHADA", "GUAVIARE",
]);

// ¿`nombre` aparece en `n` como palabra/secuencia completa?
// Evita que "PLATO" haga match dentro de "PLATOS" o "LA PLATA".
function contiene(n, nombre) {
  return new RegExp(`(^| )${nombre}( |$)`).test(n);
}

// Departamento mencionado en la cadena (el más largo, para que
// "NORTE DE SANTANDER" gane sobre "SANTANDER").
function deptoEnCadena(n) {
  let mejor = null;
  for (const d of DEPARTAMENTOS) {
    if (contiene(n, d) && (!mejor || d.length > mejor.length)) mejor = d;
  }
  return mejor;
}

// Variantes de la cadena a probar, de la más específica a la más general:
// tal cual, y sin el departamento.
function candidatosDe(n) {
  const out = [n];
  const d = deptoEnCadena(n);
  if (d) {
    const sinDepto = n.replace(new RegExp(`(^| )${d}( |$)`), " ").replace(/\s+/g, " ").trim();
    if (sinDepto && !out.includes(sinDepto)) out.push(sinDepto);
  }
  return out;
}

// Busca el nombre MÁS LARGO de `lista` contenido en `n`.
// El más largo gana para que "CARTAGENA DE INDIAS" no se resuelva como
// "CARTAGENA", y para que "SAN CRISTOBAL - MEDELLIN" encuentre MEDELLIN.
function mejorCoincidencia(n, lista) {
  let mejor = null;
  for (const nombre of lista) {
    if (contiene(n, nombre) && (!mejor || nombre.length > mejor.length)) mejor = nombre;
  }
  return mejor;
}

/**
 * Ciudad ambigua CON departamento indicado → se resuelve sin preguntar.
 *
 * Regla, y es deliberadamente asimétrica:
 *   - departamento de riesgo (Chocó, Nariño, Cauca, Amazonía…) → NO se cotiza,
 *     se escala. Ahí es donde el flete real es 2-3× el default.
 *   - cualquier otro departamento → si el nombre pelado ya está tarifado, se
 *     usa esa banda.
 * Errar hacia escalar cuesta un mensaje. Errar hacia cotizar barato costó
 * $28.663 en una guía.
 *
 * @returns {{banda?:string, escalar?:boolean}|null}
 */
function resolverAmbigua(n) {
  const depto = deptoEnCadena(n);
  if (!depto) return null;
  const sinDepto = candidatosDe(n)[1];
  if (!sinDepto || !CIUDADES_AMBIGUAS[sinDepto]) return null;
  if (DEPTOS_RIESGO.has(depto)) return { escalar: true };
  for (const [clave, banda] of Object.entries(BANDAS)) {
    if (banda.ciudades.includes(sinDepto)) return { banda: clave };
  }
  return null;
}

// Devuelve la banda de una ciudad, o null si no la reconoce.
function bandaDe(ciudad) {
  const n = normalizar(ciudad);
  if (!n) return null;

  // 0. Ciudad ambigua con departamento ya indicado
  const res = resolverAmbigua(n);
  if (res) return res.banda || null;

  // 1. Coincidencia exacta (con y sin departamento)
  for (const c of candidatosDe(n)) {
    for (const [clave, banda] of Object.entries(BANDAS)) {
      if (banda.ciudades.includes(c)) return clave;
    }
  }

  // 2. La ciudad nombrada dentro de una cadena más larga:
  //    "SAN CRISTOBAL MEDELLIN", "BARRANQUILLA VILLA SAN PEDRO ETAPA",
  //    "BUENAVENTURA BARRIO CASCAJAL", "BOGOTA USAQUEN CODITO".
  //    ⚠️ Difícil acceso se revisa ANTES en cotizar(), así que si acá hay una
  //    coincidencia de banda es porque no es un destino fluvial.
  let mejorClave = null, mejorNombre = null;
  for (const [clave, banda] of Object.entries(BANDAS)) {
    const m = mejorCoincidencia(n, banda.ciudades);
    if (m && (!mejorNombre || m.length > mejorNombre.length)) {
      mejorNombre = m;
      mejorClave = clave;
    }
  }
  if (mejorClave) return mejorClave;

  // 3. Localidad de Bogotá → Bogotá, banda A.
  //    Solo si la cadena dice BOGOTA, o si ES exactamente el nombre de la
  //    localidad. Si no, "EL CARMELO CANDELARIA" (Valle) caería en Bogotá.
  if (contiene(n, "BOGOTA")) return "A";
  if (LOCALIDADES_BOGOTA.includes(n)) return "A";

  return null;
}

/**
 * ¿Es un destino de difícil acceso? (#97)
 * @returns {{total:number|null, nota?:string, sinPromo2?:boolean}|null}
 */
function zonaDificilDe(ciudad) {
  const n = normalizar(ciudad);
  if (!n) return null;

  // Ambigua ya resuelta: si cayó en una banda NO es difícil acceso.
  // Este es el atajo que arregla "Mosquera, Cundinamarca" ($73.000) contra
  // "Mosquera, Nariño" (fluvial, se escala).
  const res = resolverAmbigua(n);
  if (res) return res.escalar ? { total: null } : null;

  // Si la cadena nombra Bogotá o una capital tarifada, no es difícil acceso.
  // Protege casos como "Bogotá - San Cristóbal".
  if (contiene(n, "BOGOTA")) return null;

  for (const c of candidatosDe(n)) {
    if (ZONA_DIFICIL_ACCESO[c]) return ZONA_DIFICIL_ACCESO[c];
  }
  const m = mejorCoincidencia(n, Object.keys(ZONA_DIFICIL_ACCESO));
  return m ? ZONA_DIFICIL_ACCESO[m] : null;
}

/**
 * ¿El nombre de la ciudad existe en varios departamentos? (#97)
 * Si devuelve algo, HAY QUE PREGUNTAR el departamento antes de cotizar.
 * Si el cliente YA dijo el departamento, no se pregunta: se resuelve.
 * @returns {string[]|null} departamentos posibles
 */
function departamentosPosibles(ciudad) {
  const n = normalizar(ciudad);
  if (!n) return null;
  if (resolverAmbigua(n)) return null; // ya lo dijo, no se pregunta de nuevo
  for (const c of candidatosDe(n)) {
    if (CIUDADES_AMBIGUAS[c]) return CIUDADES_AMBIGUAS[c];
  }
  return null;
}

/**
 * Cotiza un pedido. Es la única función que debe usarse para dar precios.
 * @param {string} ciudad
 * @param {number} unidades
 * @returns {{banda:string, nombreBanda:string, flete:number, total:number,
 *            unidades:number, reconocida:boolean}}
 */
function cotizar(ciudad, unidades = 1) {
  const uds = Math.max(1, Number(unidades) || 1);

  // ---- ATAJO #97: nombre ambiguo → no se cotiza, se pregunta el departamento ----
  const deptos = departamentosPosibles(ciudad);
  if (deptos) {
    return {
      banda: null,
      nombreBanda: "Nombre repetido en varios departamentos",
      flete: null,
      total: null,
      unidades: uds,
      reconocida: false,
      preguntarDepartamento: deptos,
      requiereConfirmacion: true,
    };
  }

  // ---- ATAJO #97: difícil acceso → total medido, o se ESCALA al dueño ----
  const dificil = zonaDificilDe(ciudad);
  if (dificil) {
    return {
      banda: "F",
      nombreBanda: "Difícil acceso — cotización individual",
      flete: null,
      // null = la IA NO tiene permiso de dar un número. Se escala.
      total: dificil.total,
      unidades: uds,
      reconocida: true,
      dificilAcceso: true,
      // En estos destinos el flete NO se comparte al llevar 2 (Tadó lo duplica),
      // así que la promo de 2 unidades no aplica hasta cotizar a mano.
      sinPromo2: dificil.sinPromo2 === true || uds > 1,
      escalar: dificil.total === null || uds > 1,
      nota: dificil.nota,
      requiereConfirmacion: true,
    };
  }

  const clave = bandaDe(ciudad);
  const reconocida = clave !== null;
  const banda = BANDAS[clave || BANDA_POR_DEFECTO];

  if (uds === 1) {
    const d = desgloseDe(clave || BANDA_POR_DEFECTO, 1, banda.total);
    return {
      banda: clave || BANDA_POR_DEFECTO,
      nombreBanda: banda.nombre,
      // `flete` es lo que se le MUESTRA al cliente y cierra la cuenta con el
      // total. El costo real de la banda sigue disponible en `fleteReal`.
      flete: d.envio,
      producto: d.producto,
      fleteReal: ENVIO_REAL_1[clave || BANDA_POR_DEFECTO] ?? banda.flete,
      total: banda.total,
      unidades: 1,
      reconocida,
      requiereConfirmacion: false,
    };
  }

  // ---- 2 o más unidades: precio de promo por banda ----
  const c = normalizar(ciudad);
  const claveBanda = clave || BANDA_POR_DEFECTO;
  const fleteObservado = uds === 2 ? FLETE_2_OBSERVADO[c] : undefined;
  // Sin dato real se estima con el peor aumento visto, para no absorber.
  const flete = fleteObservado ?? banda.flete + (uds - 1) * RECARGO_UNIDAD_EXTRA;

  let total;
  if (uds === 2) {
    // El total de la promo lo fija la BANDA, no una tarifa plana nacional.
    // Si además hay flete medido para esa ciudad, se usa el mayor de los dos:
    // así nunca se cobra por debajo del costo real.
    total = Math.max(
      PROMO_2_TOTAL[claveBanda],
      Math.ceil((PROMO_2_UNIDADES + flete) / 1000) * 1000
    );
  } else {
    // 3+ unidades: la promo aplica al par y el resto va a precio lleno.
    const producto = PROMO_2_UNIDADES + (uds - 2) * PRECIO_PRODUCTO;
    total = Math.ceil((producto + flete) / 1000) * 1000;
  }

  const d = desgloseDe(claveBanda, uds, total, fleteObservado);

  return {
    banda: clave || BANDA_POR_DEFECTO,
    nombreBanda: banda.nombre,
    // Lo que se le dice al cliente: producto + flete = total, exacto, y el
    // flete nunca por encima del real. Antes acá iba el flete estimado, que
    // no cerraba con el total y hacía que el residual inflara el envío.
    flete: d.envio,
    producto: d.producto,
    fleteReal: flete,
    total,
    // Precio de rescate: SOLO para usar si el cliente ya dijo que está caro.
    // null si esta banda no tiene uno definido.
    rescate: rescateDe(claveBanda, uds),
    unidades: uds,
    reconocida,
    promo: uds === 2,
    // true = el flete de este total es estimado, no medido. Hay que verificarlo
    // en el panel de 99 Envíos antes de prometerlo.
    requiereConfirmacion: fleteObservado === undefined,
  };
}

// Texto que se inyecta en el prompt de la IA. Da TOTALES por banda, no fletes
// sueltos: la IA no debe hacer aritmética ni improvisar un rango.
function tablaFletesTexto() {
  const bandas = Object.entries(BANDAS)
    .map(([clave, b]) => {
      // 🔴 SE EXCLUYEN LOS NOMBRES AMBIGUOS DE LOS EJEMPLOS.
      // Medido el 21-sep con probar-guion.js contra el bot desplegado:
      // MOSQUERA era el 6º ejemplo de banda A y la IA cotizó "Mosquera" a
      // $73.000 leyéndolo de acá, en vez de preguntar el departamento.
      // 🔑 LA LECCIÓN: la IA NO llama a cotizar(). Lee ESTA tabla. Que el
      // código resuelva bien no sirve si el prompt dice otra cosa.
      const ejemplos = b.ciudades
        .filter((c) => !CIUDADES_AMBIGUAS[c])
        .slice(0, 6)
        .join(", ");
      // ⚠️ El desglose sale de desgloseDe(), NO de b.flete. Con b.flete la
      // cuenta no cerraba (ver el bloque del 22-sep) y la IA le dictaba al
      // cliente un producto + envío que no sumaba el total.
      const d = desgloseDe(clave, 1, b.total);
      return `- ${b.nombre} (${ejemplos}...): TOTAL ${fmt(b.total)} al recibir (producto ${fmt(d.producto)} + envío ${fmt(d.envio)})`;
    })
    .join("\n");

  // Totales firmes de 2 unidades por banda. Desde el 19-sep están corregidos y
  // por encima del margen meta, así que la IA SÍ puede cotizarlos sin escalar.
  // ==========================================================================
  // 🔴 EL GANCHO DE 2 UNIDADES: EL AHORRO VA CONTRA COMPRAR DOS SUELTOS
  //
  // ESTO SE ROMPIÓ EL 22-SEP Y COSTÓ CARO. Al arreglar el desglose cambié el
  // texto del gancho por "se ahorra $5.800 en el producto". Dos errores juntos:
  //
  //   a) el número es 2,2× más chico que el que funcionaba ($13.000)
  //   b) movió el ahorro del ENVÍO al PRODUCTO, y el del envío es el que el
  //      cliente entiende de una: "pago un solo envío en vez de dos"
  //
  // Ese mismo día el share de pedidos de 2 unidades pasó de 26,8% (histórico) a
  // 0%. El archivo madre ya tenía medido lo que vale ese gancho: subió el share
  // de 6,8% a 26,8% (3,9×) y aporta +$44.007/día, el 72% del valor del guion.
  //
  // 🔑 LA REGLA: el ahorro se dice contra COMPRAR DOS SUELTOS, que es el número
  // más grande de los tres posibles y además el único que el cliente puede
  // comparar solo (sabe cuánto le costó uno). El desglose queda disponible por
  // si lo pide, pero no es el titular.
  // Ver /analisis/donde-esta-la-fuga-23sep.py
  // ==========================================================================
  const promo2 = Object.entries(BANDAS)
    .map(([clave, b]) => {
      const total2 = PROMO_2_TOTAL[clave];
      const dosSueltos = 2 * b.total;
      const ahorro = dosSueltos - total2;
      const d = desgloseDe(clave, 2, total2);
      return (
        `- ${b.nombre}: TOTAL ${fmt(total2)} los dos. Comprados por separado serían ` +
        `${fmt(dosSueltos)}, así que SE AHORRA ${fmt(ahorro)} porque van en el mismo ` +
        `paquete y paga UN SOLO ENVÍO. Si pide el desglose: ${fmt(d.producto)} los dos ` +
        `conjuntos + ${fmt(d.envio)} de envío.`
      );
    })
    .join("\n");

  // Una línea POR destino, no todos comprimidos en una sola.
  // Medido el 21-sep: cuando iban juntos ("TADO $93.000 · EL CHARCO $115.500")
  // la IA no los aplicaba y a "¿cuánto a Tadó?" respondía con el pitch genérico
  // del producto, sin el precio. Separados y con la orden al lado, sí los usa.
  const conDato = Object.entries(ZONA_DIFICIL_ACCESO)
    .filter(([, v]) => v.total !== null)
    .map(([c, v]) => `  · ${c}: el TOTAL es ${fmt(v.total)} al recibir. Ese número y no otro.${v.sinPromo2 ? " NO ofrezcas promo de 2 acá." : ""}`)
    .join("\n");
  // ⚠️ Se excluyen los nombres que además son ambiguos (MOSQUERA está en la
  // sabana de Bogotá Y en el Pacífico de Nariño). Si apareciera en las dos
  // listas, el prompt se contradiría y la IA elegiría al azar. Van abajo, en
  // la lista de "preguntá el departamento", que es la conducta correcta.
  const sinDato = Object.entries(ZONA_DIFICIL_ACCESO)
    .filter(([c, v]) => v.total === null && !CIUDADES_AMBIGUAS[c])
    .map(([c]) => c)
    .join(", ");
  const ambiguas = Object.entries(CIUDADES_AMBIGUAS)
    .map(([c, d]) => `${c} (${d.join(" / ")})`)
    .join(" · ");

  // Los precios de rescate, con la regla de uso PEGADA a cada uno. Van juntos
  // a propósito: cuando el número y su condición aparecen separados en el
  // prompt, la IA usa el número e ignora la condición (ya pasó con Tadó).
  const rescates = Object.entries(BANDAS)
    .filter(([clave]) => PROMO_2_RESCATE[clave])
    .map(([clave, b]) => {
      const r = PROMO_2_RESCATE[clave];
      const d = desgloseDe(clave, 2, r);
      return (
        `- ${b.nombre}: podés bajar de ${fmt(PROMO_2_TOTAL[clave])} a ${fmt(r)} ` +
        `(los 2 conjuntos ${fmt(d.producto)} + envío ${fmt(d.envio)}), ` +
        `PERO SOLO si ya dijo que está caro.`
      );
    })
    .join("\n");

  const bloqueRescate = rescates
    ? `

## 💬 PRECIO DE RESCATE — SOLO SI EL CLIENTE YA DIJO QUE ESTÁ CARO
${rescates}

⛔ REGLAS, y son estrictas:
- NUNCA ofrezcas este precio de entrada. Primero cotizás el total normal.
- Solo lo usás si el cliente YA puso la objeción: "está caro", "muy costoso",
  "lo voy a pensar", "por ahora no", o si dijo que se va.
- Es para no perder la venta, no para vender más barato. Si lo ofrecés sin que
  te lo pida, le estás regalando plata a alguien que ya iba a comprar.
- Se ofrece UNA vez y no se negocia más abajo. No hay un tercer precio.
- Presentalo como un esfuerzo puntual, no como el precio de siempre:
  *"Te lo puedo dejar en $137.000 los dos para que lo aproveches hoy 🙌"*`
    : "";

  return `${bandas}

## 2 CONJUNTOS — TOTALES FIRMES POR BANDA (corregidos el 19-sep)
Estos totales YA incluyen el envío de las 2 unidades. Son firmes: se cotizan
igual que los de 1 unidad, sin escalar a un asesor.
${promo2}${bloqueRescate}
⛔ EXCEPCIÓN: en los destinos de difícil acceso de abajo NO se ofrece la promo
de 2 (en Tadó el envío se DUPLICA en vez de compartirse). Ahí se cotiza a mano.

⚠️⚠️ ANTES DE COTIZAR CON LA TABLA DE ARRIBA, REVISÁ ESTAS DOS LISTAS.
MANDAN SOBRE LA TABLA. Si la ciudad está acá, la tabla de arriba NO aplica.

🔴 LISTA 1 — NOMBRES QUE EXISTEN EN VARIOS DEPARTAMENTOS: PREGUNTÁ, NO COTICES
Si el cliente nombra una de estas, **NO le des ningún precio todavía**, ni
aunque el nombre te suene a una ciudad conocida. Preguntá el departamento:
${ambiguas
  .split(" · ")
  .map((a) => `  · ${a}`)
  .join("\n")}
→ Así: "¿Riosucio de Caldas o de Chocó? Es que el envío cambia bastante 🙂"
🔑 POR QUÉ: hay un Mosquera en la sabana de Bogotá ($73.000) y otro en el
Pacífico de Nariño, al que se llega por río y cuesta 3× más. Si asumís el
barato y era el caro, la venta sale a pérdida.

🔴 LISTA 2 — DIFÍCIL ACCESO: TAMPOCO SE COTIZAN CON LA TABLA DE ARRIBA
Se llega por río, avión o barco y el envío cuesta 2-3× lo de un pueblo normal.

CON PRECIO YA CONFIRMADO — usá EXACTAMENTE este total, no el de la tabla:
${conDato}

SIN PRECIO CONFIRMADO — ${sinDato}
  → ⛔ NO des NINGÚN número, ni el de pueblos. Respondé exactamente:
    "Dejame confirmarte el envío a tu ciudad y te escribo en un momento 📦"
    y avisá al dueño.
  🔑 POR QUÉ: en El Charco se cobró $59.900 contra un envío real de $55.563.
    Una sola guía se comió $28.663, el margen de 1,3 pedidos buenos. Y cobrar
    los $85.000 de pueblos tampoco alcanzaba. Donde no hay dato, se escala.`;
}

module.exports = {
  BANDAS,
  BANDA_POR_DEFECTO,
  CIUDADES_AMBIGUAS,
  ENVIO_REAL_1,
  ENVIO_REAL_2,
  PROMO_2_RESCATE,
  desgloseDe,
  rescateDe,
  FLETE_2_OBSERVADO,
  PRECIO_PRODUCTO,
  PROMO_2_TOTAL,
  PROMO_2_UNIDADES,
  RECARGO_UNIDAD_EXTRA,
  ZONA_DIFICIL_ACCESO,
  bandaDe,
  cotizar,
  departamentosPosibles,
  fmt,
  normalizar,
  tablaFletesTexto,
  zonaDificilDe,
};
