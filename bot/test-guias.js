// ============================================================================
// PRUEBAS DEL EMPAREJAMIENTO DE GUÍAS  —  node test-guias.js
//
// Corre SIN clave de IA y SIN credenciales de WhatsApp: fabrica un PDF de
// etiquetas parecido al de la transportadora y verifica el pareo.
//
// Los casos no son inventados: salen de lo que el dueño advirtió por
// experiencia ("a veces dan un número distinto al del WhatsApp") y del patrón
// de duplicados que ya costó plata el 22-sep.
// ============================================================================

const { PDFDocument, StandardFonts } = require("pdf-lib");
const guias = require("./src/guias");

const REMITENTE = "3138615813"; // el WhatsApp del dueño, va impreso como remitente

// --- Los pedidos que "tiene guardados el bot" --------------------------------
const PEDIDOS = [
  {
    nombre: "Jorge Sua Castillo",
    telefono_chat: "573001112233", // su WhatsApp
    celular: "3001112233",
    ciudad: "Bogotá",
    direccion: "Calle 127 # 80 - 45 Apto 302",
    talla: "M", color: "Negro", total: 73000,
  },
  {
    nombre: "Alexander Lara Muñoz",
    telefono_chat: "573204445566",
    celular: "3204445566",
    ciudad: "Bogotá",
    direccion: "Carrera 45 # 12 - 30",
    talla: "XL", color: "Negro", total: 73000,
  },
  {
    nombre: "Pedro Epieyu",
    telefono_chat: "573157778899",
    celular: "3157778899",
    ciudad: "Manaure",
    direccion: "Barrio Centro casa 14",
    talla: "S", color: "Verde", total: 85000,
  },
  // Dos personas DISTINTAS con el mismo nombre: el caso donde equivocarse
  // significa filtrarle la dirección de una al teléfono de la otra.
  {
    nombre: "Carlos Gómez",
    telefono_chat: "573111111111", celular: "3111111111",
    ciudad: "Bogotá", direccion: "Calle 9 # 5 - 5",
    talla: "L", color: "Negro", total: 73000,
  },
  {
    nombre: "Carlos Gómez",
    telefono_chat: "573222222222", celular: "3222222222",
    ciudad: "Bogotá", direccion: "Calle 9 # 5 - 5",
    talla: "M", color: "Verde", total: 73000,
  },
  // El MISMO cliente con dos pedidos (pidió otra talla). Empatan siempre, pero
  // los dos van al mismo teléfono: no hay nada que filtrar.
  {
    nombre: "Luz Marina Perez",
    telefono_chat: "573009998888", celular: "3009998888",
    ciudad: "Cali", direccion: "Avenida 6 # 23 - 41",
    talla: "M", color: "Negro", total: 81000,
  },
  {
    nombre: "Luz Marina Perez",
    telefono_chat: "573009998888", celular: "3009998888",
    ciudad: "Cali", direccion: "Avenida 6 # 23 - 41",
    talla: "L", color: "Blanco", total: 81000,
  },
];

// --- Las etiquetas del PDF ---------------------------------------------------
const ETIQUETAS = [
  {
    caso: "teléfono DISTINTO al del WhatsApp (lo que advirtió el dueño)",
    lineas: [
      "INTERRAPIDISIMO S.A.",
      "GUIA No. 240061604892",
      "REMITENTE: BIKERPRO  Tel: " + REMITENTE,
      "DESTINATARIO: JORGE SUA CASTILLO",
      "DIRECCION: CALLE 127 # 80 - 45 APTO 302",
      "CIUDAD: BOGOTA D.C.  DEPTO: CUNDINAMARCA",
      "TELEFONO: 3109998877",
      "RECAUDO CONTRAENTREGA: $73.000",
    ],
    espera: { enviar: true, pedido: "Jorge Sua Castillo" },
  },
  {
    caso: "todo coincide (el camino normal)",
    lineas: [
      "INTERRAPIDISIMO S.A.",
      "GUIA No. 240061604890",
      "REMITENTE: BIKERPRO  Tel: " + REMITENTE,
      "DESTINATARIO: ALEXANDER LARA MUNOZ",
      "DIRECCION: CARRERA 45 # 12 - 30",
      "CIUDAD: BOGOTA D.C.",
      "TELEFONO: 3204445566",
      "RECAUDO CONTRAENTREGA: $73.000",
    ],
    espera: { enviar: true, pedido: "Alexander Lara Muñoz" },
  },
  {
    caso: "otra transportadora, otro formato de guía (Servientrega, 10 dígitos)",
    lineas: [
      "SERVIENTREGA S.A.",
      "GUIA 2220956331",
      "REMITENTE: BIKERPRO " + REMITENTE,
      "DESTINATARIO: PEDRO EPIEYU",
      "DIRECCION: BARRIO CENTRO CASA 14",
      "CIUDAD: MANAURE  DEPTO: LA GUAJIRA",
      "TELEFONO: 3157778899",
    ],
    espera: { enviar: true, pedido: "Pedro Epieyu", guia: "2220956331" },
  },
  {
    caso: "guía de alguien que NO es cliente",
    lineas: [
      "INTERRAPIDISIMO S.A.",
      "GUIA No. 240061999999",
      "REMITENTE: BIKERPRO  Tel: " + REMITENTE,
      "DESTINATARIO: MARIA RAMIREZ",
      "DIRECCION: CALLE 100 # 7 - 20",
      "CIUDAD: MEDELLIN  DEPTO: ANTIOQUIA",
      "TELEFONO: 3151112222",
    ],
    espera: { enviar: false, motivoContiene: "no corresponde" },
  },
  {
    caso: "la MISMA guía repetida en el PDF (el dueño imprimió dos veces)",
    lineas: [
      "INTERRAPIDISIMO S.A.",
      "GUIA No. 240061604892",
      "REMITENTE: BIKERPRO  Tel: " + REMITENTE,
      "DESTINATARIO: JORGE SUA CASTILLO",
      "DIRECCION: CALLE 127 # 80 - 45 APTO 302",
      "CIUDAD: BOGOTA D.C.",
      "TELEFONO: 3109998877",
    ],
    espera: { enviar: false, motivoContiene: "ya venía en la página" },
  },
  {
    caso: "DOS PERSONAS distintas con el mismo nombre → no se manda",
    lineas: [
      "COORDINADORA",
      "GUIA No. 64532761837",
      "REMITENTE: BIKERPRO " + REMITENTE,
      "DESTINATARIO: CARLOS GOMEZ",
      "CIUDAD: BOGOTA D.C.",
      "TELEFONO: 3175554433",
    ],
    espera: { enviar: false, motivoContiene: "empate" },
  },
  {
    caso: "el MISMO cliente con dos pedidos → sí se manda (mismo teléfono)",
    lineas: [
      "INTERRAPIDISIMO S.A.",
      "GUIA No. 240061700001",
      "REMITENTE: BIKERPRO  Tel: " + REMITENTE,
      "DESTINATARIO: LUZ MARINA PEREZ",
      "DIRECCION: AVENIDA 6 # 23 - 41",
      "CIUDAD: CALI  DEPTO: VALLE",
      "TELEFONO: 3009998888",
    ],
    espera: { enviar: true, pedido: "Luz Marina Perez" },
  },
];

async function armarPDF() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const et of ETIQUETAS) {
    const page = doc.addPage([420, 595]);
    let y = 550;
    for (const linea of et.lineas) {
      page.drawText(linea, { x: 20, y, size: 9, font });
      y -= 16;
    }
  }
  return Buffer.from(await doc.save());
}

(async () => {
  const pdf = await armarPDF();
  console.log(`PDF de prueba: ${ETIQUETAS.length} etiquetas, ${pdf.length} bytes\n`);

  // Simula que la guía 240061604886 ya se había enviado en una corrida anterior
  const YA_ENVIADAS = { "240061604886": { fecha: Date.now() - 3600_000 } };

  const filas = await guias.procesarPDF(pdf, PEDIDOS, {
    telefonoRemitente: REMITENTE,
    yaEnviada: (g) => YA_ENVIADAS[g] || null,
  });

  let fallas = 0;
  for (let i = 0; i < filas.length; i++) {
    const f = filas[i];
    const esp = ETIQUETAS[i].espera;
    const errores = [];

    if (f.enviar !== esp.enviar) errores.push(`enviar=${f.enviar}, esperado ${esp.enviar}`);
    if (esp.pedido && f.pedido?.nombre !== esp.pedido) errores.push(`pedido="${f.pedido?.nombre}", esperado "${esp.pedido}"`);
    if (esp.guia && f.guia !== esp.guia) errores.push(`guia=${f.guia}, esperado ${esp.guia}`);
    if (esp.motivoContiene && !String(f.motivo || "").includes(esp.motivoContiene)) {
      errores.push(`motivo="${f.motivo}" no contiene "${esp.motivoContiene}"`);
    }
    // El teléfono del remitente NUNCA debe leerse como teléfono del cliente
    if (f.etiqueta.telefonos.includes(REMITENTE)) errores.push("tomó el teléfono del REMITENTE como del cliente");

    const marca = errores.length ? "🔴" : f.enviar ? "✅" : "⛔";
    const quien = f.enviar
      ? `→ ${f.pedido.nombre} (${guias.destinoDe(f.pedido)}) · certeza ${f.certeza} · ${f.senales.join(", ")}`
      : `→ NO SE ENVÍA: ${f.motivo}`;
    console.log(`${marca} pág ${f.pagina}  guía ${f.guia || "?"}  [${ETIQUETAS[i].caso}]`);
    console.log(`     ${quien}`);
    for (const e of errores) {
      console.log(`     🔴 ${e}`);
      fallas++;
    }
    console.log();
  }

  // Comprobación aparte: la guía ya enviada se bloquea
  const conYaEnviada = await guias.procesarPDF(pdf, PEDIDOS, {
    telefonoRemitente: REMITENTE,
    yaEnviada: (g) => (g === "240061604892" ? { fecha: Date.now() - 3600_000 } : null),
  });
  if (conYaEnviada[0].enviar || !String(conYaEnviada[0].motivo).includes("ya se le envió")) {
    console.log("🔴 una guía YA ENVIADA no fue bloqueada");
    fallas++;
  } else {
    console.log(`✅ guía ya enviada antes → bloqueada: ${conYaEnviada[0].motivo}\n`);
  }

  const total = ETIQUETAS.length + 1;
  if (fallas) {
    console.log(`🔴 ${fallas} falla(s).`);
    process.exit(1);
  }
  console.log(`🟢 ${total}/${total} casos correctos.`);
})().catch((e) => {
  console.error("🔴 Error corriendo las pruebas:", e);
  process.exit(1);
});
