# 🔄 Traspaso de sesión — 21 de septiembre de 2026

> Documento para retomar sin perder contexto. Lo urgente arriba.

---

## 🔴 Lo urgente, en orden

| # | qué | por qué |
|---|---|---|
| 1 | **Desconectar Hermes del número real** | Usa Baileys (no oficial). Riesgo de bloqueo permanente del número por donde entra el 100% de las ventas. **Preguntado 4 veces, sin respuesta.** |
| 2 | **Recargar la cuenta de Meta Ads** | Última lectura: saldo **$40.688**, cierre proyectado en **−$4.250**. Falta recargar ~$94.153 |
| 3 | **Pegar los 2 mensajes automáticos** en WhatsApp Business | 3 minutos, gratis, baja el 80% del trabajo manual del primer toque. Textos listos, nunca confirmó si los puso |
| 4 | **Verificar coexistence** | Permite conectar la Cloud API **sin sacar el número del app**. Desbloquea desconectar Hermes hoy |

---

## ✅ Lo que quedó resuelto hoy

### Suscripción de Meta — reembolso recuperado
Pagó **$359.900** por Meta One Expert creyendo que desbloqueaba el agente de IA.
Soporte respondió a la 1:00 am: **los límites no se pueden levantar.**
Pidió reembolso dentro de la ventana de 48h de Google Play y **recuperó la plata**.

El agente de Meta que le decía "es un error de sincronización" **no tenía acceso a los
contadores** y lo admitió cuando se le preguntó directo. Todo lo que afirmó sobre el
límite estaba inventado, incluida la frase *"no hay un límite estricto de 48 horas para
reclamar"* — falsa, y la que casi le costó el reembolso.

### Verificación del negocio — enviada, en revisión
- Negocio: **Jairo Andres Tavera Moreno** (persona natural, no SAS)
- Tipo elegido: **Sociedad unipersonal**
- Nombre alternativo: **BikerProCo** (la marca vive ahí, el legal en el campo principal)
- Sitio web: resuelto con la landing publicada
- Estado: **enviada, ~2 días hábiles** (desde el 21-sep)

⚠️ El RUT tiene la actividad principal **5611 (restaurante)** porque **sí tiene un
restaurante activo**. El código de BikerPro (**4791, comercio por internet**) ya está
registrado en "otras actividades". **No hay que tocar el RUT.**

### Tarifario corregido — la fuga más grande del mes
Las 5 bandas de 2 unidades y las bandas B y C de 1 unidad estaban bajo el margen meta
de $23.244/ud. El flete real de 2 uds subió **26%–54%** entre agosto y septiembre y el
bot cotizaba con la tabla vieja.

| | antes | ahora |
|---|---|---|
| 1 ud · banda B | $77.000 | **$78.000** |
| 1 ud · banda C | $81.000 | **$82.000** |
| 2 uds · A | $128.000 | **$137.000** |
| 2 uds · B | $136.000 | **$146.000** |
| 2 uds · C | $138.000 | **$152.000** |
| 2 uds · D | $139.000 | **$152.000** |
| 2 uds · E | $143.000 | **$158.000** |

**Fuga cerrada: $12.314 por pedido de 2 uds = $1.091.682/mes.**
Verificado con `bot/test-cotizacion.js` (21 casos, corre sin clave de IA).

### Sitio web publicado
`docs/index.html` con logo y fotos reales. Resolvió el bloqueo de la verificación
(Meta exige sitio propio, no acepta Instagram, y el campo es obligatorio).

---

## 💰 La decisión de arquitectura

**Elegido: bot propio + Cloud API + Chatwoot.** Comparado con precios verificados:

| opción | COP/mes |
|---|---|
| **Bot propio optimizado** | **$110.000 – $142.000** |
| ManyChat Pro + IA (4.000 contactos) | $500.000 – $572.000 |
| respond.io Growth | $796.000+ |
| Wati real | $1.956.000 |
| Agente de Meta | $128.000–321.000 **por día** |

**Razón:** las plataformas cobran por contacto activo/mes y traen 1.000 incluidos.
Con 4.000 conversaciones, el volumen que hace bueno el negocio es el que las hace caras.

### Modelo de IA — pendiente de elegir
| modelo | COP/mes optimizado |
|---|---|
| Llama 3.1 8B en Groq | $109.515 |
| DeepSeek V4-Flash | $119.984 |
| Gemini 3.1 Flash-Lite | $142.190 |

El bot ya acepta los tres: se cambia con la variable `AI_PROVIDER`.
**Recomendación: arrancar con Gemini** (ya tiene clave y facturación Nivel 1 activa),
cambiar después sin tocar código.

⛔ **Modelos gratuitos descartados con números:** el rate limit en hora pico le costaría
~**$507.662/mes** en ventas perdidas contra $120.000 de un modelo pago.
Ya lo vivió con Solar.

---

## 📋 Estado del despliegue

| paso | estado |
|---|---|
| Código del bot | ✅ en `main`, carga sin errores, 21/21 pruebas de precios |
| Proveedor de IA configurable | ✅ Gemini / DeepSeek / Groq por variable |
| Historial recortado a 4 turnos | ✅ |
| Clave de Gemini | ✅ existe: **IMPERMEABLE BOT** (13 jul 2026) |
| Cuenta de Render | ✅ creada, workspace "Bikerproco" |
| Web Service en Render | ✅ **FUNCIONANDO** (ver aviso abajo) |
| App de WhatsApp en Meta | ✅ |
| Webhook | ✅ suscrito al campo `messages` |
| Chatwoot | ⬜ |

> ## ⛔ ESTE DOCUMENTO QUEDÓ VIEJO — leer antes de actuar
>
> Fue escrito el 21-sep. **El 22-sep se avanzó mucho más y varias cosas de acá ya son
> falsas.** Verificado en vivo el 22-sep a las 12:40 Bogotá:
>
> | lo que dice este doc | la verdad |
> |---|---|
> | Render "a medias", en Python y sin Root Directory | ✅ **anda**: HTTP 200 en 0,04 s |
> | App de WhatsApp y webhook pendientes | ✅ los dos listos y suscritos |
> | Verificación del negocio "en revisión" | ✅ **APROBADA** (`verified`) |
> | Corre en el número de prueba `+1 555...` | ❌ corre en **`+57 322 7545695`**, calidad GREEN |
> | WABA `2213159576112051` | ❌ la real es **`1345319974418244`** |
>
> **La fuente de verdad del despliegue es `ACCESOS-Y-RECUPERACION.md`**, y por encima de
> todo `/setup-waba` contra el servicio real. Este archivo sirve como historia, no como
> instrucción.

### Configuración de Render — solo para recrearlo desde cero
| campo | valor |
|---|---|
| Name | `bikerpro-bot` |
| **Language** | **`Node`** |
| Branch | `main` |
| **Root Directory** | **`bot`** |
| Build Command | `npm install` |
| Start Command | `npm start` |

### Variables de entorno
```
AI_PROVIDER=gemini
GEMINI_API_KEY=(la de IMPERMEABLE BOT)
GEMINI_MODEL=gemini-3.1-flash-lite
MAX_HISTORIAL=8
WHATSAPP_VERIFY_TOKEN=<secreto>
PANEL_TOKEN=<secreto>          🔐 la contraseña del panel
OWNER_WHATSAPP=573138615813
```

🔴 **El valor que este documento tenía escrito acá era el secreto real del panel, y este
repo es público.** Por eso ya no está. Ver `ACCESOS-Y-RECUPERACION.md`.

---

## ⚠️ Pendientes que pueden costar plata

### 1. Mayoristas sin medir
Aparecieron precios de mayorista: **$50.000/u desde 6 uds**, **$47.000/u desde 13**.
Cuenta preliminar:

| | 6 uds a $50.000 | 13 uds a $47.000 |
|---|---|---|
| Bruto antes de flete | $17.000/u | $14.000/u |

Contra la meta de $23.244/u, **y falta restar el flete de 6 y 13 unidades**.
El mayorista no paga pauta (que en retail se lleva ~$11.300/u), así que puede cerrar —
pero **puede quedar por debajo del retail.**

🔴 **No habilitar cotización de mayoristas en el bot hasta medir el flete real de 6 y 13
unidades.** Si no, se repite la fuga de las 2 unidades a mayor escala.

### 2. Hay DOS bots
| | bot de Hermes | bot del repo |
|---|---|---|
| Canal | Baileys ⚠️ riesgo de ban | Cloud API oficial ✅ |
| Pruebas | 63/68 | 21/21 en precios ✅ |
| Tarifario corregido | ? | ✅ |
| Necesita el Mac despierto | Sí | No ✅ |

**Esfuerzo dividido = dos tarifarios que se desincronizan.** Hay que decidir cuál es el
titular. El del repo está más cerca de producción en todo lo que cuesta plata.

### 3. El panel de campañas es público
`index.html` en la raíz del repo muestra gastos, márgenes, CPA y utilidades, y el repo
es **público**. Conviene resolverlo.

---

## 🎯 Lo que sigue

**Inmediato:** desconectar Hermes · recargar Meta Ads · mensajes automáticos ·
terminar Render con la configuración correcta

**Esta semana:** verificar coexistence · Cloud API con número de prueba · las 7 preguntas
del guion · Chatwoot · migrar el número real

**Después:** máquina de estados formal · base de datos · **atribución de Meta Ads**
(lo más rentable del plan: saber qué anuncio da pedidos, no solo conversaciones) ·
seguimientos · remarketing por tandas de 500

**El dueño va a mandar:** el archivo del Meta Business Agent con ~300 chats reales, para
extraer lenguaje de clientes y objeciones. Se cruza contra los datos verificados —
entra como *evidencia de cómo hablan*, **no** como fuente de verdad sobre precios.

---

## 📌 Mis errores de esta sesión, para no repetirlos

| # | error | corrección |
|---|---|---|
| 27 | Conté 2 guías como devueltas | Estados truncados del CSV viejo: eran envíos en curso |
| 28 | Dije que región devuelve más que núcleo | Sesgo de madurez. Invertido: región devuelve **menos** |
| 29 | Reporté CPA +237% peor | Bloques desalineados. No se despacha fin de semana. **El CPA está plano** |
| 30 | "Pagaste el producto equivocado" | Falso. Meta One Expert **sí** incluye el agente. El dueño me corrigió |
| 31 | 4 versiones del costo de IA | $24.000 → $28.759 → $180.000 → $120.000. No verifiqué precios de modelos, que cambiaron mucho en 2026 |
| 32 | "Migrar saca el número del app y pierde el historial" | **Coexistence** existe desde mayo 2025: se puede tener los dos |

**Patrón:** los tres errores más costosos salieron de **no verificar precios vigentes** y
de **comparar cosas de distinta madurez**. Ambos ya están documentados como reglas duras
en el archivo madre.

---

*Scripts de esta sesión en `analisis/`: `comparar-opciones-bot-21sep.py` ·
`costo-real-bot-21sep.py` · `bandas-correctas-por-banda-19sep.py` ·
`verificar-guion-definitivo-19sep.py` · `devoluciones-corregido-18sep.py` ·
`cpa-semanas-alineadas-18sep.py`*
