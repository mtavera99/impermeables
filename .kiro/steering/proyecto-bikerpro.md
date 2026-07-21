# Proyecto BikerPro — Plan Maestro y Contexto (RESPALDO COMPLETO)

> **IMPORTANTE (para cualquier sesión de Kiro):** Este archivo es la MEMORIA COMPLETA del proyecto.
> Léelo entero antes de trabajar. Si se pierde un chat, aquí está TODO para continuar sin empezar de cero.
> Cada vez que haya avances, actualízalo y súbelo a GitHub.

Última actualización: 2026-07-13 (noche)

---

## 0. ⭐ DÓNDE QUEDAMOS HOY (lo más importante)

**Resumen en una línea:** El bot de ventas con IA está CONSTRUIDO y FUNCIONANDO en el número
de PRUEBA de Meta. Estamos en proceso de (a) estabilizarlo y (b) pasarlo al número real.

**Estado por frente:**
1. 🤖 **Bot de WhatsApp:** construido, desplegado en Render, responde con IA, envía fotos
   (producto/colores/modelo/rojo/verde/negro), maneja 2 formas de pago y captura pedidos.
2. 🔴 **BLOQUEO #1 — Facturación de Gemini:** el bot falla de forma intermitente (manda un
   respaldo genérico) porque las llamadas a Gemini topan el límite del plan GRATIS (20/día).
   El usuario "metió saldo" a Gemini, PERO el bot sigue fallando → hay que CONFIRMAR que la
   facturación quedó activa en el MISMO proyecto de la API key. Revisar logs de Render: si sale
   error `quota`/`FreeTier`, el saldo no está en el proyecto correcto.
3. 🟡 **Migración al número real (313 861 5813):** EN PAUSA / con trabas:
   - Verificación del negocio: ENVIADA, estado "Pending review" (WABA "BikerProCo").
   - Al registrar el número en Cloud API, el SMS de verificación se bloqueó
     ("requested code too many times"). Esperó 1h+ y seguía bloqueado.
   - DECISIÓN DEL USUARIO: reactivar el número en la **app WhatsApp Business** para atender
     clientes MANUALMENTE mientras tanto (no perder ventas). El bot sigue en el número de prueba.
4. 🟢 **Anuncios Meta:** corriendo (ver sección 3).

**Próximo paso lógico:** arreglar la facturación de Gemini (que el bot deje de fallar) →
probar venta completa en número de prueba → cuando el negocio esté verificado + pase el bloqueo
del SMS, migrar el número real con calma.

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
- Costo ~$34.000 · empaque ~$1.500 · margen bruto ~$25.900 · meta CPA $8.000–$10.000 · equilibrio CPA $24.400.

> ⚠️ **INCONSISTENCIA PENDIENTE:** la app (`index.html`) y anuncios dicen "6 colores (fucsia,
> amarillo)". Los reales son 5 (blanco, negro, rojo, verde, morado). Falta actualizar la app/anuncios.

---

## 3. Redes y campaña Meta

- [x] Facebook creado · [x] Instagram @bikerproco con logo + posts + destacados diseñados.
- [x] **Campaña Meta corriendo** (lanzada 2026-07-11): "Impermeables · Prospección Motociclistas".
  - Objetivo: Mensajes/Conversaciones de WhatsApp. Presupuesto por conjunto (ABO), $18.000/día c/u.
  - Conjuntos: **Motociclistas** (Yamaha, Bajaj, AKT, Suzuki, Honda, cascos; ciudades grandes; 20–55)
    y **Domiciliarios** (Rappi, DiDi, iFood, mensajería). Puja: volumen más alto. Ubicaciones Advantage+.
- **Día 1:** 35 conversaciones, 0 ventas — al inicio se pidió "anticipo no reembolsable" (error grave
  que espantó clientes). Corregido: cierre 100% contraentrega.

---

## 4. Cuentas, IDs y accesos (REFERENCIA TÉCNICA)

- **Repo GitHub:** `mtavera99/impermeables` · GitHub Pages: https://mtavera99.github.io/impermeables/
- **Meta Business ID:** `1271452296042859`
- **App Meta "BikerPro Bot":** App ID `1338086151301765`
- **WABA del bot (número de prueba):** ID `2213159576112051` · Phone Number ID (prueba) `1257126177474870`
- **WABA "BikerProCo" (para número real):** ID `1523356755909234` (verificación Pending review)
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

## 7. Cierre por WhatsApp y logística (aprendizajes)

- **NUNCA pedir "anticipo no reembolsable"** (mató ventas el día 1). En contraentrega el cliente NO
  paga nada por adelantado.
- **2 formas de pago que maneja el bot:** (A) contraentrega (paga al recibir) — recomendada;
  (B) pago anticipado (Nequi/Bancolombia/Daviplata/Bre-B, envía comprobante, luego se despacha).
- Responder < 5 min, cerrar con pregunta, exigir "SÍ CONFIRMO" antes de despachar (baja rechazos).
- **Transportadoras:** Interrapidísimo (mejor cobertura pueblos, barato), Mi Paquete (agregador),
  Coordinadora (premium). En rechazo, el vendedor paga flete de retorno (el producto se devuelve).

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

## 9. Pendientes priorizados (checklist para retomar)

1. [ ] 🔴 **Confirmar facturación de Gemini** en el proyecto correcto (que el bot deje de fallar). #1.
2. [ ] 🔀 **Mergear PRs abiertos** en GitHub y hacer **Manual Deploy** en Render (revisar cuáles quedan sin merge).
3. [ ] 🧪 Probar una **venta completa** en el número de prueba, sin fallos.
4. [ ] 🏢 **Verificación del negocio** (enviada, esperar aprobación).
5. [ ] 📱 **Migrar número real 313 861 5813** a Cloud API (cuando pase el bloqueo del SMS + negocio verificado
   + Gemini estable). Ojo: sale de la app WhatsApp Business; para chatear manual se usa una bandeja/inbox.
6. [ ] 💳 Agregar **método de pago de WhatsApp/Meta** (distinto al de Gemini).
7. [ ] 📸 Fotos reales de **blanco** y **morado** (subir a `/assets/productos/` como `blanco.jpg`/`morado.jpg`).
8. [ ] 🎬 Subir **video** (< 15 MB) → activar en el bot.
9. [ ] 🎨 Actualizar la **app/anuncios** a los 5 colores reales (quitar fucsia/amarillo, aclarar franja).
10. [ ] 🧹 Limpiar archivos con nombres raros en `/assets/productos/` (`*.heic`, `Gemini_*`, `rojo3.png.JPG`, etc.).

---

## 10. Cómo subir cambios (flujo)

- Los archivos del bot y la app viven en el repo `mtavera99/impermeables`.
- Cambios de código → PR → merge a `main` → Render redespliega solo (o Manual Deploy) y GitHub Pages actualiza.
- Fotos/video del bot → subir a `/assets/productos/` (GitHub Pages les da URL pública) → el bot las usa.
- Datos sensibles (tokens, claves, números de pago) → SIEMPRE en variables de entorno de Render, NUNCA en el repo.
