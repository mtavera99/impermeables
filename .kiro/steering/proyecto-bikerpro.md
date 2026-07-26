# Proyecto BikerPro — Plan Maestro y Contexto (RESPALDO COMPLETO)

> **IMPORTANTE (para cualquier sesión de Kiro):** Este archivo es la MEMORIA COMPLETA del proyecto.
> Léelo entero antes de trabajar. Si se pierde un chat, aquí está TODO para continuar sin empezar de cero.
> Cada vez que haya avances, actualízalo y súbelo a GitHub.

Última actualización: 2026-07-26 — RONDA 2: 14 ventas, CAC $6.429, escalamiento a $36.000/día

---

## 0. ⭐ DÓNDE QUEDAMOS HOY (lo más importante)

**Resumen en una línea:** 🔥 EL NEGOCIO YA ES RENTABLE. La ronda 2 (3 días, $90.000) dio **14 ventas**
con **CAC de $6.429** (meta era $8-10k) y la tasa de cierre subió de 2,84% a **7%**. Se escaló el
presupuesto a **$36.000/día** (2026-07-26). El bot sigue SIN conectar (todo manual) y el cuello de
botella ya es el TIEMPO del dueño + inventario + flujo de caja.

**🚀 HITO 2026-07-26 — RONDA 2 DE CAMPAÑA (3 días, tras optimizar creativos):**

| Métrica | Ronda 1 | Ronda 2 | Cambio |
|---|---|---|---|
| Gasto | $120.000 | $90.000 (3 días) | — |
| Conversaciones | 176 | 200 | ⬆️ |
| Costo/conversación | $682 | **$450** | −34% |
| CTR | 1,97% | 2,27% | ⬆️ |
| CPC | $361 | $242 | −33% |
| Clic→chat | 53% | 53,8% | estable |
| **Ventas** | 5 | **14** | 🔥 |
| **Tasa de cierre** | 2,84% | **7,0%** | 2,5× |
| **CAC (pub/venta)** | $24.000 | **$6.429** | −73% |

- **Ventas ronda 2:** 14 (1 PAGO ANTICIPADO — el primero de la historia, señal de confianza; 13 contraentrega
  en tránsito, resultado de entregas PENDIENTE).
- **Utilidad proyectada:** ~+$251.600 si rechazo 0% · +$133.400 si rechazo 20% · **se necesitarían ~7
  rechazos de 13 (54%) para no ganar nada** → rentable en casi cualquier escenario.
- **Acumulado (1–26 jul):** 376 conversaciones · $210.000 gastados · **19 ventas** · CAC acumulado $11.052
  · cierre acumulado 5,05% · alcance 18.362 · frecuencia 1,81 (sana).
- **¿Por qué mejoró?** (a) cortar los creativos malos bajó el costo/conversación 34%; (b) el cierre subió
  por el flujo nuevo (ciudad primero) + "SÍ CONFIRMO" + experiencia del dueño vendiendo.

**📈 ESCALAMIENTO (2026-07-26):** presupuesto subido de $30.000 → **$36.000/día** (+20%, escalamiento
moderado correcto). ⚠️ REGLA: solo se tocó el PRESUPUESTO (no creativos, ni públicos, ni copies).
Nunca duplicar de golpe (reinicia aprendizaje y dispara costos). Esperar 3-4 días, verificar que el CAC
siga bajo $10.000, y recién entonces subir otro 20-30%.

**⚠️ LOS 3 FRENOS REALES (ya no son Meta, son la operación):**
1. 📦 **Inventario:** 19 conjuntos vendidos. Escalar sin stock = anuncios prendidos sin producto.
2. 💵 **Flujo de caja (el más crítico):** en contraentrega se paga primero (producto $34.000 + anuncio) y
   se cobra después (Interrapidísimo demora días). Escalar solo hasta donde aguante la caja.
3. ⏰ **Tiempo del dueño:** ~4,7 ventas/día atendiendo A MANO + empaque + despacho. Aquí el bot pasa de
   "bonito de tener" a NECESARIO.

**🎉 HITO 2026-07-25 — ENTREGAS: 5 de 5 entregadas y pagadas.**
- **Rechazo = 0%** (muy por debajo del break-even de ~25%) → CONTRAENTREGA es el modelo ganador,
  NO hace falta pedir prepago casi a nadie. El instinto del dueño era correcto.
- **Cuenta real:** 5 × $24.400 margen = $122.000 ingreso; publicidad −$120.000; rechazos −$0 →
  neto ≈ **+$2.000 (break-even)**. LO IMPORTANTE: llegó a break-even con TODO en contra (bot sin
  conectar, cierre bajo 2,84%, sin reseñas, campaña sin optimizar). Al arreglar eso, se vuelve rentable.
- **Activo desbloqueado:** 5 clientes felices → pedirles foto + testimonio YA (prueba social sube el cierre).

**📣 CAMPAÑA RELANZADA (2026-07-25):** el dueño reactivó tras confirmar las entregas. Presupuesto
**$30.000 TOTAL/día** (~$15.000 por conjunto, MISMO nivel de siempre — NO escaló). Pausó los creativos
malos ("Peluca video" y "Peluca fondo negro" en Motorizados), dejó el ganador "Fondo azul sin personaje".
**INSTRUCCIÓN: dejarla correr ~4 días SIN tocar** (no editar, no subir presupuesto, no pausar) para que
Meta salga de la fase de aprendizaje. Evaluar con datos nuevos a los 4 días.

**Contexto previo (sigue vigente):** El bot está CONSTRUIDO pero NO conectado a WhatsApp. Las 176
conversaciones y 5 ventas se hicieron A MANO. El anuncio funciona muy bien; la fuga está en el
CIERRE (2,84%), que es la mayor palanca de mejora.

**Estado por frente:**
1. 🤖 **Bot de WhatsApp:** CONSTRUIDO y desplegado en Render, responde bien en pruebas (Gemini con
   saldo responde perfecto). ⚠️ **NO ESTÁ CONECTADO a WhatsApp** → hoy NO atiende clientes reales.
   Las 176 conversaciones y las 5 ventas se hicieron A MANO por el dueño. El bot es la mayor palanca
   de crecimiento pendiente (atender al instante, 24/7, subir el % de cierre).
2. 🟢 **Gemini:** ya NO es el bloqueo #1. El bot no estuvo en la jugada durante la campaña, así que
   el bug de Gemini NO afectó estas ventas. Cuando se conecte el bot, confirmar que la facturación
   siga activa en el proyecto correcto de la API key.
3. 🟡 **Migración al número real (313 861 5813):** EN PAUSA / con trabas:
   - Verificación del negocio: ENVIADA, sigue en **"Pending review"** — LLEVA VARIOS DÍAS TRABADA
     (el usuario la intentó/reintentó y a 2026-07-24 aún NO la aprueban). Este es el bloqueo real
     para migrar: mientras el negocio no esté verificado, Meta deja en GRIS "Registrar" y
     "Suscribir webhooks" (mensaje: "Number registration and webhook subscription are unavailable
     for this account now").
   - **✅ LIMPIEZA HECHA (2026-07-24):** el número estaba DUPLICADO en dos WABAs ("biker"
     `1345319974418244` y "BikerProCo" `1523356755909234`). Se ELIMINÓ el número de la WABA
     "biker" (quedó vacía). El número quedó SOLO en **BikerProCo**, estado **"No verificado"**.
     Ya no hay conflicto de número duplicado.
   - Pendiente cuando el negocio quede verificado: verificar el número (usar código por LLAMADA,
     no SMS, porque el SMS ya se bloqueó antes con "requested code too many times") → Registrar en
     Cloud API → suscribir webhooks → cambiar `WHATSAPP_PHONE_NUMBER_ID` en Render.
   - ⚠️ El número de PRUEBA de Meta NO sirve para vender al público (solo habla con hasta 5 números
     agregados a mano; es solo para que el dueño pruebe el bot). Los clientes de los anuncios llegan
     al número REAL.
   - DECISIÓN DEL USUARIO (vigente a 2026-07-24): mientras Meta aprueba la verificación, **atiende
     las ventas MANUALMENTE por WhatsApp** en el número real (no perder ventas). El bot solo se
     prueba en el número de prueba.
4. 🔴 **Anuncios Meta:** APAGADOS por falta de saldo/fondos de prepago (`not_delivering`, presupuesto 0).
   Cada día apagados = ~44 conversaciones baratas que se dejan de recibir. Ver embudo en sección 3.
5. 🎨 **Web (`index.html`) — CORREGIDA HOY:** colores actualizados a 5 franjas reales (PR #18 FUSIONADO)
   y flujo de WhatsApp arreglado para preguntar la CIUDAD primero (PR #19 — ⚠️ FALTA FUSIONARLO).

**Próximo paso lógico (orden correcto):**
1. Fusionar el **PR #19** (arreglo del flujo de WhatsApp).
2. Ver **entregas de Interrapidísimo** (dato #1: de las 5 ventas, ¿cuántas se entregan y pagan?).
   Ese número dice si el rechazo está bajo el break-even de ~25% (ver sección 7).
3. NO escalar la campaña todavía — primero subir el % de cierre (2,84% tiene techo enorme) y
   conectar el bot. Recargar poco para no quedar a oscuras, pero el gran gasto va después.

---

## 1. La marca

- **Nombre:** BikerPro · **Instagram:** @bikerproco · **Facebook:** Página "BikerPro" (Accesorios)
- **WhatsApp de ventas (número real):** 313 861 5813 (+57 313 861 5813)
  - Link: `https://wa.me/573138615813?text=Hola%20BikerPro%20quiero%20info%20de%20los%20impermeables`
- **Ciudad base:** Bogotá
- **Visión:** empezar con impermeables y crecer a tienda de accesorios de moto (por eso "BikerPro").
- **Colores de marca:** Azul `#0B3D91` · Azul oscuro `#061A3F` · Negro `#1A1A1A` · Amarillo `#FFC300` · Blanco `#FFFFFF`
- **Logo:** águila dorada + "BikerPro" (generado con Nano Banana). Respaldos (casco) en `/assets/marca/`.

---

## 2. El producto (DATOS CORRECTOS Y ACTUALIZADOS)

- **Producto:** conjunto impermeable de moto de **4 PIEZAS**: chaqueta, pantalón, zapatones
  (cubrebotas) y bolsa.
- **Material:** **PVC siliconado calibre 8**, costura **TERMOSELLADA** (no se filtra agua).
- **COLOR (modelo de franja):** el impermeable SIEMPRE es NEGRO; lo que va en color es la
  **FRANJA REFLECTIVA**. Colores de franja disponibles: **blanco, negro, rojo, verde, morado**.
  - ⚠️ El **amarillo está AGOTADO** (si lo piden, avisar y ofrecer otro).
- **Capota:** sí. **Bolsillos:** NO (a propósito, para no filtrar agua). **Reflectivo:** sí (las
  franjas de color). **Pantalón:** bota recta. **Tallas:** S, M, L, XL, 2XL.
- **Precio:** **$59.900 SIN envío** (el cliente paga el envío según ciudad).
- **Pago:** contraentrega O pago anticipado (ambos; ver sección 8).
- Costo ~$34.000 · empaque ~$1.500 · margen bruto ~$24.400 · meta CPA $8.000–$10.000 · equilibrio CPA $24.400.

> ✅ **INCONSISTENCIA DE COLORES: CORREGIDA (2026-07-24).** La web (`index.html`) ya dice
> "franja reflectiva en 5 colores" (blanco, negro, rojo, verde, morado), sin fucsia ni amarillo.
> (PR #18, fusionado.) Los anuncios de Meta viejos aún pueden mencionar colores mal → al relanzar,
> usar copy corregido ("El producto lo pagas al recibir; envío según ciudad"), NO prometer
> "contraentrega en toda Colombia" (ata a un modelo antes de saber la ciudad — ver sección 7).

---

## 3. Redes y campaña Meta

- [x] Facebook creado · [x] Instagram @bikerproco con logo + posts + destacados diseñados.
- [x] **Campaña Meta corriendo** (lanzada 2026-07-11): "Impermeables · Prospección Motociclistas".
  - Objetivo: Mensajes/Conversaciones de WhatsApp. Presupuesto por conjunto (ABO), $18.000/día c/u.
  - Conjuntos: **Motociclistas** (Yamaha, Bajaj, AKT, Suzuki, Honda, cascos; ciudades grandes; 20–55)
    y **Domiciliarios** (Rappi, DiDi, iFood, mensajería). Puja: volumen más alto. Ubicaciones Advantage+.
- **Día 1:** 35 conversaciones, 0 ventas — al inicio se pidió "anticipo no reembolsable" (error grave
  que espantó clientes). Corregido: cierre 100% contraentrega.

### 📊 RESULTADOS CAMPAÑA (1–24 jul 2026) — EMBUDO COMPLETO
Datos del export de Meta (campaña "Impermeables · Prospección Motociclistas", `not_delivering`):

| Escalón | Número | Conversión | Lectura |
|---|---|---|---|
| Alcance | 9.613 personas | — | — |
| Impresiones | 16.868 | frecuencia 1,75 | ✓ sana |
| Clics al enlace | ~332 | CTR 1,97% · CPC $361 | ✓ decente |
| Conversaciones | **176** | **53% de los clics** | ✅ excelente |
| Ventas (cerradas) | **5** | **2,84% de conversaciones** | 🔴 aquí se rompe |

- Gasto: **$120.000** · Costo/conversación: **$682** (barato) · CPM ~$7.113 (barato).
- **DIAGNÓSTICO CLAVE:** el embudo está sano en TODOS los escalones (anuncio, clic, clic→chat 53%)
  **hasta la conversación**. La fuga está SOLO en el CIERRE (2,84%). El problema NO es el anuncio ni
  el público → es el cierre, que además fue 100% MANUAL. Subir el cierre a 6% ≈ 11 ventas con el
  MISMO gasto. Palanca de crecimiento = cerrar mejor, NO gastar más.
- **Por creativo (ambos públicos):** 🏆 **"Fondo azul sin personaje"** = ganador (120 conv, 68% del
  total, ~$650 c/u). "Peluca fondo negro" = mixto (51 conv): bien en Domiciliarios ($667), MAL en
  Motorizados ($1.152). "Peluca video" = muerto (Meta casi no lo entregó, 0 conv en Motorizados).
- **Por público:** Motorizados y Domiciliarios rinden IGUAL (~$681/conv) → la palanca es el CREATIVO,
  no la audiencia.
- **Al relanzar (optimización, mismo presupuesto):** escalar "Fondo azul sin personaje" en ambos
  públicos · mantener "Peluca fondo negro" SOLO en Domiciliarios · apagar "Peluca fondo negro" en
  Motorizados y "Peluca video" · producir más creativos estilo "Fondo azul" (limpio, producto directo).

### 📣 RELANZAMIENTO DE CAMPAÑA (2026-07-25)
- El dueño RELANZÓ la campaña tras confirmar las 5 entregas. Aplicó la optimización recomendada:
  pausó los creativos malos, dejó activo el ganador "Fondo azul sin personaje".
- Presupuesto: **$30.000 TOTAL/día** (~$15.000 por conjunto — MISMO nivel de siempre, NO escaló).
- ⏳ **REGLA: dejarla correr ~4 días SIN tocar** (no editar/pausar/subir presupuesto) para que Meta
  salga de la fase de aprendizaje (~50 conversaciones o 3-4 días). Los primeros 1-2 días se ven más
  caros → es normal, NO apagar. Evaluar con datos nuevos a los 4 días.
- NO escalar presupuesto hasta confirmar que baja el CAC por venta (hoy ~$24.000).

### 💰 VENTAS REALES — ✅ ENTREGAS CONFIRMADAS (2026-07-25)
- **5 pedidos** cerrados de las 176 conversaciones. **0 pago anticipado, 5 contraentrega (100%).**
- Despachados por **Interrapidísimo (contraentrega)**. **RESULTADO: las 5 se ENTREGARON Y PAGARON.**
  **Tasa de rechazo = 0%** → muy por debajo del break-even de ~25% → CONTRAENTREGA CONFIRMADA como
  modelo ganador. NO hace falta pedir prepago casi a nadie (dejar prepago solo para alto riesgo real).
- Cuenta real: 5 × $24.400 = $122.000 margen; publicidad −$120.000; rechazos −$0 → neto ≈ +$2.000
  (break-even). Llegó a equilibrio con el bot sin conectar y cierre bajo (2,84%) → margen de mejora enorme.
- CAC: $24.000/venta. Baja fuerte si sube el cierre (2,84% → 6% ≈ el doble de ventas, mismo gasto).
- 🌟 ACCIÓN EN CURSO: pedir foto + testimonio a los 5 clientes (prueba social para subir el cierre).

---

## 4. Cuentas, IDs y accesos (REFERENCIA TÉCNICA)

- **Repo GitHub:** `mtavera99/impermeables` · GitHub Pages: https://mtavera99.github.io/impermeables/
- **Meta Business ID:** `1271452296042859`
- **App Meta "BikerPro Bot":** App ID `1338086151301765`
- **WABA del bot (número de prueba):** ID `2213159576112051` · Phone Number ID (prueba) `1257126177474870`
- **WABA "BikerProCo" (para número real):** ID `1523356755909234` (verificación Pending review).
  ✅ 2026-07-24: es la ÚNICA WABA con el número real (313 861 5813), estado "No verificado".
- **WABA "biker" (`1345319974418244`):** ERA una WABA duplicada que tenía el MISMO número real.
  El 2026-07-24 se le QUITÓ el número (quedó vacía) para eliminar el conflicto. Se puede borrar por
  completo desde Configuración del negocio → Cuentas de WhatsApp. NO usar esta WABA.
- **Render:** servicio `impermeables` (srv-d9alleurnols73d95bf0) → https://impermeables.onrender.com
  - Env logs: https://dashboard.render.com/web/srv-d9alleurnols73d95bf0/env
  - Plan GRATIS: se duerme tras 15 min de inactividad (retrasa 1ª respuesta ~50s). Conviene keep-alive/plan pago.
- **Variables de entorno en Render (NO están en el repo, son privadas):**
  `WHATSAPP_TOKEN` (permanente, System User), `WHATSAPP_PHONE_NUMBER_ID` (hoy = número de prueba),
  `WHATSAPP_VERIFY_TOKEN` = `bikerpro_verify_123`, `WHATSAPP_WABA_ID` = `2213159576112051`,
  `GEMINI_API_KEY`, `GEMINI_MODEL` = `gemini-3.5-flash`, `OWNER_WHATSAPP` = `573138615813`,
  `PAGO_NEQUI` / `PAGO_BANCOLOMBIA` / `PAGO_DAVIPLATA` / `PAGO_BREB` (datos de pago).
- **Gemini:** API key de Google AI Studio. ⚠️ Verificar que la facturación esté activa en el
  proyecto de esa key (plan gratis = 20 req/día → el bot falla).

---

## 5. El bot de IA (`/bot`) — DETALLE COMPLETO

- **Stack:** Node.js + Express (webhook) + WhatsApp Cloud API + Google Gemini (`gemini-3.5-flash`).
- **Archivos:**
  - `src/prompt.js` — cerebro: producto, material, colores (franja), 2 formas de pago, objeciones,
    marcadores de multimedia y de pedido. NUNCA pide anticipo en contraentrega.
  - `src/fletes.js` — fletes estimados por ciudad.
  - `src/agent.js` — llama a Gemini (con REINTENTOS ante 429/500/503 y respuesta vacía),
    detecta pedido `##ORDER##`, handoff `##HANDOFF##`, y multimedia por marcador `[[MEDIA:..]]`
    + por PALABRAS CLAVE (`detectMediaIntent`: rojo/verde/negro → foto de ese color; blanco/morado
    o "colores" → cuadro de colores; "producto" → 4 piezas; "puesto/modelo" → modelo; "video").
  - `src/whatsapp.js` — envía texto, imagen y video por Cloud API.
  - `src/media.js` — catálogo de fotos/videos (URLs en GitHub Pages `/assets/productos/`).
  - `src/store.js` — guarda conversaciones y pedidos en JSON (`data/`), maneja pausa (handoff).
  - `src/server.js` — webhook (verificación + recepción), auto-suscribe la WABA al arrancar
    (`subscribeWaba`), endpoint `/setup-waba`, `/health`.
  - `src/simulate.js` — probar por consola sin WhatsApp (`npm run chat`).
- **Fotos configuradas (en `/assets/productos/`, servidas por GitHub Pages):**
  - `producto.png` (4 piezas) · `colores.png` (cuadro generado con los 5 colores) · `modelo.png`
  - `rojo.jpg` (FOTO REAL) · `verde.png` y `negro.png` (recortes de la cuadrícula)
  - ❌ Faltan fotos individuales de **blanco** y **morado** (por ahora esos mandan el cuadro de colores).
  - ❌ Falta **video** (debe pesar < 15 MB; WhatsApp no envía video > 16 MB).
- **Robustez ya implementada:** reintentos ante fallos de Gemini, respaldo que NO reinicia la
  conversación ("se me cruzó la señal, ¿me repites?"), limpieza de bloques `##ORDER##` malformados,
  maxOutputTokens 800.

### Errores conocidos y sus causas (para no repetir diagnóstico)
- **"El bot repite el saludo genérico a mitad de charla" / respuestas raras ("000..."):**
  causa = Gemini falla (cupo/límite). Arreglo real = facturación de Gemini en el proyecto correcto.
- **Mensajes reales no llegaban al bot:** faltaba suscribir la WABA (ya resuelto con `subscribeWaba`).
- **Error 401/#131005 al responder:** token vencido → ya se usa TOKEN PERMANENTE (System User).
- **Modelo `gemini-2.5-flash` da 404:** descontinuado → usar `gemini-3.5-flash`.

---

## 6. La app dashboard (`index.html`)

- Dashboard de una página (HTML/CSS/JS puro), en GitHub Pages: https://mtavera99.github.io/impermeables/
- Secciones: Resumen, Calculadora de ganancia, Estructura de campaña, Audiencias, Copies, Creativos,
  Revisión, Video, **Cierre por WhatsApp** (guiones Modelo A y B), **Costos de envío** (calculadora de
  flete por ciudad, editable, en localStorage `bp_fletes`), Escalamiento, Checklist.
- `privacidad.html` — política de privacidad (usada para verificación/publicación en Meta).

---

## 7. Cierre por WhatsApp y logística (aprendizajes) — ACTUALIZADO 2026-07-24

- **NUNCA pedir "anticipo no reembolsable"** (mató ventas el día 1). En contraentrega el cliente NO
  paga nada por adelantado.
- **APRENDIZAJE DEL DUEÑO:** cuando pidió el flete por adelantado a todos, **se le caían muchas
  ventas** → por eso pasó a 100% contraentrega. Esa decisión fue RACIONAL.

### 🎯 ESTRATEGIA DE PAGO (marco de decisión — el análisis grande de hoy)
- **El modelo de pago NO es el problema; la TASA DE RECHAZO es la que decide qué modelo conviene.**
- **Break-even ≈ 25% de rechazo** (con margen $24.400 y pérdida por rechazo = UN flete ~$15.000,
  que es lo que cobra Interrapidísimo, NO ida y vuelta; y caída del ~40% al pedir prepago):
  - Rechazo **< 25%** → gana **CONTRAENTREGA** (más ventas netas aunque haya rechazos).
  - Rechazo **> 25%** → gana **PREPAGO del flete**.
  - Con "SÍ CONFIRMO" el rechazo baja a ~10% → contraentrega gana CLARO. Ese es el objetivo.
- **Descartado: "envío gratis por pago anticipado"** → NO alcanza el margen ($24.400; el flete
  ~$12–15k se comería casi toda la ganancia).
- **JUGADA GANADORA = Contraentrega default + obsesión por bajar el rechazo + PREPAGO SELECTIVO**
  (solo pedir flete anticipado a pedidos de ALTO RIESGO: pueblos/veredas y clientes evasivos que no
  confirman datos; a ciudad grande + cliente que confirma rápido, dejarlo contraentrega).

### 🔒 CÓMO BAJAR EL RECHAZO (3 momentos)
- ANTES de despachar: exigir **"SÍ CONFIRMO"**, dejar claro el **TOTAL exacto** a pagar, verificar
  **dirección completa + celular**. Banderas rojas (→ pedir flete): dirección vaga, cliente evasivo,
  pueblo/vereda.
- EN TRÁNSITO: mandar la **guía/rastreo** (genera confianza y compromiso).
- DÍA DE ENTREGA: **recordatorio** ("hoy llega, ten listos los $___ en efectivo").
- MEDIR el motivo de cada rechazo para atacar la causa real.

### 💬 FLUJO DE WhatsApp CORREGIDO (2026-07-24, PR #19)
- **ERROR detectado:** el 1er mensaje prometía "contraentrega, pagas todo al recibir" ANTES de saber
  la ciudad → si el cliente era de pueblo, ya te habías comprometido y no podías pedir prepago.
- **ARREGLO:** bienvenida NEUTRAL que pregunta **CIUDAD primero** + color + talla, diciendo solo
  "el producto lo pagas al recibir" (verdad en ambos modelos, no te ata). Ya con la ciudad se decide
  la rama: ciudad grande → contraentrega (Modelo A); pueblo/vereda → flete anticipado (Modelo B).

- **2 formas de pago:** (A) contraentrega (paga al recibir) — default; (B) pago anticipado del flete
  (Nequi/Bancolombia/Daviplata/Bre-B) — solo para alto riesgo.
- Responder **rápido** (aquí entra el BOT, que hoy no está conectado), cerrar con pregunta, seguimiento.
- **Confianza (para poder empujar prepago):** reseñas/fotos de los primeros 5 clientes, garantía
  explícita ("si llega con falla, cambio/devuelvo"), cuenta a nombre del negocio.
- **Transportadoras:** Interrapidísimo (mejor cobertura pueblos, barato; cobra UN flete en devolución),
  Mi Paquete (agregador), Coordinadora (premium).

---

## 8. Textos de marca (Instagram)

- **Nombre buscable:** `BikerPro | Impermeables de Moto`
- **Bio:**
  ```
  🏍️ Impermeables de moto 4 piezas + termosellado
  💧 Colores | Calidad real
  📦 Pago contraentrega en toda Colombia 🇨🇴
  👇 Pídelo por WhatsApp
  ```
- **Destacados:** 🏍️ Productos · 💧 Calidad · 📦 Comprar · ⭐ Opiniones · ❓ Preguntas

---

## 9. Pendientes priorizados (checklist para retomar) — ACTUALIZADO 2026-07-25

1. [x] ✅ **PR #18 (colores) y PR #19 (flujo WhatsApp ciudad primero) FUSIONADOS.** Web actualizada.
2. [x] ✅ **Entregas de Interrapidísimo: 5/5 entregadas y pagadas (rechazo 0%).** Contraentrega confirmada.
3. [x] ✅ **Campaña relanzada optimizada (2026-07-25)** → RONDA 2 exitosa: 14 ventas, CAC $6.429, cierre 7%.
4. [x] ✅ **Escalado a $36.000/día (2026-07-26)**, +20%. Solo presupuesto, nada más.
   → ⏳ AHORA: **dejarla correr 3-4 días SIN tocar** y evaluar (¿CAC sigue bajo $10.000?).
5. [ ] 📦 **Resultado de entregas de los 13 contraentrega** de la ronda 2 (¿cuántos rechazos?).
6. [ ] 📦💵 **Verificar INVENTARIO y FLUJO DE CAJA** antes del próximo escalamiento (frenos reales).
7. [ ] 🌟 **Conseguir testimonios/fotos** — ya hay **19 clientes** (mucho más material que antes).
8. [ ] 🔌 **Conectar el bot a WhatsApp** — ya es NECESARIO (el cuello de botella es el tiempo del dueño).
   Bloqueo = número real trancado en Meta (verificación Pending review). Al conectar, confirmar Gemini.
9. [ ] 🎯 **A los 3-4 días: evaluar y escalar otro 20-30%** si el CAC sigue bajo $10.000.
8. [ ] 🏢 **Verificación del negocio** en Meta (enviada, Pending review varios días — revisar Centro de
   seguridad por si piden documento; nombre/dirección deben coincidir exactos).
9. [ ] 📱 **Migrar número real 313 861 5813** a Cloud API (cuando el negocio esté verificado; verificar el
   número con código por LLAMADA, no SMS). El número NO debe estar logueado en la app de WhatsApp.
10. [ ] 💳 Agregar **método de pago de WhatsApp/Meta** · 📸 Fotos reales de **blanco** y **morado** ·
   🎬 subir **video** (< 15 MB) → activar en el bot.
11. [ ] 🧹 Limpiar/eliminar la WABA vacía "biker" · limpiar archivos raros en `/assets/productos/`.

**Notas de proceso:** al trabajar varias cosas seguidas, NO fusionar PRs hasta que Kiro diga "subí todo"
(el 2026-07-24 se fusionó el PR #18 a mitad de camino y el arreglo de WhatsApp quedó fuera → hubo que
abrir el PR #19 aparte).

---

## 10. Cómo subir cambios (flujo)

- Los archivos del bot y la app viven en el repo `mtavera99/impermeables`.
- Cambios de código → PR → merge a `main` → Render redespliega solo (o Manual Deploy) y GitHub Pages actualiza.
- Fotos/video del bot → subir a `/assets/productos/` (GitHub Pages les da URL pública) → el bot las usa.
- Datos sensibles (tokens, claves, números de pago) → SIEMPRE en variables de entorno de Render, NUNCA en el repo.
