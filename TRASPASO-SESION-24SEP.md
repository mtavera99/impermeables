# 🔄 Traspaso de sesión — 23 y 24 de septiembre de 2026

> Documento para retomar sin perder contexto. Lo urgente arriba.
> Sesión larga (de la tarde del 23 hasta las ~3 am del 24). **23 PRs mergeados, del #118 al #143.**

---

## ⏱️ SI TENÉS 2 MINUTOS, LEÉ ESTO

**El bot está vivo y atendiendo** en `https://bikerpro-bot.onrender.com` (⚠️ NO `impermeables-bot`).
Reemplazó al Meta Business Agent. El guion vive en `bot/src/prompt.js` y los precios en
`bot/src/fletes.js`.

**Lo que se hizo esta sesión no fue subir el cierre: fue dejar de corromper los números.**
Leyendo chats reales aparecieron pedidos duplicados, pedidos que el cliente nunca confirmó, el bot
cotizando 2 unidades a precio lleno, el bot negando que exista tienda física y negando que se venda
al por mayor. Todo eso ensuciaba el CPA y el cierre con los que el dueño decide.

**La lección que se repitió CINCO veces, y es la más importante de la sesión:**

> 🔑 **Una instrucción al modelo NO es un candado. Lo que toca plata va en código, con una prueba.**

---

## 🔴 PENDIENTES DEL DUEÑO — en orden

| # | qué | por qué / cómo |
|---|---|---|
| 1 | **ROTAR `PANEL_TOKEN`** | Se expuso **4 veces** en el chat de esta sesión. Hay que cambiarlo **en Render Y en el secreto de GitHub al mismo tiempo**, si no se rompen los workflows |
| 2 | **Anular el pedido de Lorenzo** (`573116093103`) | Dijo *"No confirmo"* y se guardó igual. Se anula desde el panel, botón **Anular** (no se borra: queda marcado) |
| 3 | **Recargar Meta Ads** | Lectura del 24-sep 03:02: saldo **$160.599**, entra en zona de freno a las **20:00**. Falta ~$78.429. Ver `ESTADO-CUENTA.md` (se actualiza cada hora) |
| 4 | **Mirar el estreno de la plantilla del paso 44h** | Hoy en la tarde manda por primera vez. **Si la plantilla tiene `{{1}}`, falla** — el log lo dice explícito |
| 5 | **Cerrar el PR #134**, quedó abierto y en conflicto | Lo reemplazó el #135. Ya no aplica |

### ✅ Ya resuelto por el dueño en esta sesión
- **Dirección de la bodega:** Barrio Madelena, **Calle 62bis #67-12 Sur, Bogotá** (yo dudaba de
  ponerla en el repo; él tenía razón, ya es pública: está en el perfil de WhatsApp Business y el
  agente viejo la dio en **281 conversaciones**)
- **Horario del punto físico:** **24 horas, los 7 días** (confirmado el 24-sep → PR #142)
- **Banda D del combo:** se queda en **$140.000** (decisión suya, PR #143)

---

## 🧭 CÓMO VERIFICAR QUE TODO ESTÁ BIEN, SIN ENTRAR A META

El bot ya tiene el token de WhatsApp, así que **él mismo dice su calificación de calidad**:

```
https://bikerpro-bot.onrender.com/setup-waba?token=EL_TOKEN
```

Devuelve el número conectado, `platform_type`, `code_verification_status` y **`quality_rating`**,
más un diagnóstico en español. **No hay que pelear con la interfaz de Meta.**

⚠️ El link de WhatsApp Manager que le pasé (`business.facebook.com/wa/manage/phone-numbers/`)
**falló**: esa URL necesita el `business_id` al final, y además el navegador estaba en el perfil
personal ("Erie"), que puede no tener acceso al portafolio. El camino que sí sirve:
`business.facebook.com` → **elegir el portafolio de BikerPro** → ☰ → WhatsApp Manager → Números.

### Rutas del panel que más se usan
| ruta | para qué |
|---|---|
| `/panel?token=` | pedidos, el tablero principal |
| `/chat?token=&id=57...` | **ver la conversación real de un cliente** (así se cazaron casi todos los bugs) |
| `/auditoria?token=` | cuadrar conversaciones vs pedidos vs ventas |
| `/seguimiento?token=` | estado de la cadencia y contadores por paso |
| `/seguimiento/correr?token=` | disparar el seguimiento a mano |
| `/cierre?token=` | cierre del día |
| `/setup-waba?token=` | diagnóstico de conexión + calidad del número |

---

## 🛠️ ENTORNO Y COMANDOS (para la sesión nueva)

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
cd bot

# Correr TODAS las baterías (son 25) y ver solo las que fallan
for f in test-*.js; do node "$f" >/dev/null 2>&1 || echo "FALLO $f"; done

# Ver el tamaño del guion — TECHO DURO: 9.000 tokens
node -e 'const p=require("./src/prompt").buildSystemPrompt();console.log(Math.round(p.length/4))'

# Ver qué cotiza una ciudad
node -e 'const f=require("./src/fletes");console.log(f.cotizar("Monteria",2))'
```

⚠️ **El guion está en 8.976 tokens y el techo son 9.000.** Cada 1.000 tokens cuestan ~**$3.720
COP/día** con Gemini. **Antes de agregar texto al guion, hay que sacar otro.** La prueba que lo
vigila está en `test-pedir-el-pedido.js` y en `test-bodega.js`.

⚠️ El sandbox corre en **UTC**. Para fechas usar `TZ=America/Bogota`, si no marca el día siguiente.

---

## ✅ LO QUE SE ARREGLÓ, PR POR PR

| PR | qué | por qué importaba |
|---|---|---|
| **#118** | Revivir el gancho de 2 unidades | Un cambio mío del 22-sep lo apagó y **el share cayó de 26,8% a 0% en un día** |
| #119 | Auditoría de lo que hacía bien el agente viejo | El dueño pidió "la versión de las cosas buenas del agente viejo + lo que yo hacía a mano" |
| #120 | Primer mensaje **determinístico** (en código, no IA) | Instantáneo, gratis, garantiza talla+color. **Se midió después: NO era la fuga** |
| #121 | Corrección de mi propia hipótesis | El dato del dueño (48% escribe una vez) **coincidía con el agente viejo (44,8%) = ruido** |
| **#122** | `embudo.js` contaba `$59.900` como cotización | El regex `/\$\s?\d{2,3}\.\d{3}/` enganchaba el precio del producto. Los escalones estaban mal medidos |
| #124 | Comparar el bot contra el agente viejo con **la misma regla** | Sin eso, el criterio "el escalón que más gente pierde" siempre señala el primero, que es el sano |
| **#125** | Después del total, **pedir el pedido** | El único escalón roto: `datos` 30,3% vs 49,2% del agente (índice **0,62**) |
| #126 | Negociar el combo (precio de rescate en todas las bandas) | El dueño: *"como yo era flexible con los precios creo que vendía un poquito más"* — **tenía razón, pero solo en combos** |
| #127 | Ver el chat real desde el panel (`/chat`) | Herramienta que después sirvió para cazar casi todo lo demás |
| **#128** | "Oficina" no es una dirección | Y el dueño me frenó: **con la ciudad alcanza, no pedir la dirección de la oficina** (sería una traba) |
| **#129** | Pedidos duplicados | *"cayó supuestamente otra venta y es una duplicada de una de las guías que envié"* |
| #130 / #131 | Auditoría de conversaciones vs ventas | Mi propia cuenta no cuadraba: faltaban 6 |
| **#132** | Anular pedidos + **`id` único** | `fecha` no era identificador: `toISOString()` colisiona en el mismo milisegundo → **anular uno anulaba otro** |
| **#133** | Sin "SÍ CONFIRMO" no hay venta | Un cliente escribió **"No confirmo"** y el pedido se guardó igual |
| #135 | El combo es **$110.000 + envío**, no 2 × $59.900 | El bot cotizaba *"$119.800 + $38.200 = $158.000"*: precio lleno, promo sin aplicar, y flete inflado para que cuadrara |
| #136 | `/seguimiento` decía `"(sin configurar)"` y era mentira | La pantalla mentía sobre su propio estado |
| #137 / #138 | Contadores del seguimiento + no duplicar | Había **2 IDs de instancia** (`[srmpb]`, `[xrs4k]`): las dos podían mandar el mismo mensaje |
| **#139** | El bot negaba tienda física y precio mayorista | Las dos cosas son falsas. **Recoger en bodega deja $26.900** vs $23.303-25.094 despachado |
| #140 | Cadencia **2h · 20h · 44h** con medición por paso | Antes era 20h·44h·68h. Las pruebas cazaron que **313 clientes quedaban trabados** |
| #141 | Dirección de bodega por defecto | Antes escalaba a un asesor solo para dar una dirección pública |
| #142 | Horario **24/7** confirmado | Con el candado: `BODEGA_HORARIO` vacía vuelve a "coordinemos la hora" |
| #143 | Banda D en **$140.000** | Y el arreglo que traía: el guion decía "el combo SIEMPRE es $110.000 + envío" y en banda D es **$103.000** |

---

## 💰 PRECIOS VIGENTES (al cierre del 24-sep)

**1 unidad** — `PRECIO_PRODUCTO = 59900`, `COSTO = 33000`, `META_UD = 23244`

| banda | zona | total 1 ud | envío real 1 ud |
|---|---|---|---|
| A | Bogotá y sabana | $73.000 | $14.906 |
| B | Boyacá, Casanare, Meta cercano | $78.000 | $21.038 |
| C | Capitales grandes | $82.000 | $25.055 |
| D | Ciudades intermedias | $83.000 | $26.287 |
| E | Pueblos y zona extendida | $85.000 | $28.697 |

**2 unidades (combo)** — `PROMO_2_UNIDADES = 110000`

| banda | total | desglose que ve el cliente | envío real | rescate | ahorro vs 2 sueltos |
|---|---|---|---|---|---|
| A | $133.000 | $110.000 + $23.000 | $23.947 | $123.000 | $13.000 |
| B | $142.000 | $110.000 + $32.000 | $32.597 | $132.000 | $14.000 |
| C | $148.000 | $110.000 + $38.000 | $38.784 | $138.000 | $16.000 |
| **D** | **$140.000** | **$103.000 + $37.000** | $37.832 | $137.000 | **$26.000** |
| E | $155.000 | $110.000 + $45.000 | $45.214 | $145.000 | $15.000 |

🔑 **Las 3 reglas del desglose, y están blindadas con pruebas:**
1. producto + envío tiene que dar **exactamente** el total
2. el envío que se muestra **nunca** puede ser mayor que el envío real medido
3. el margen va en la línea del producto, que es la que el cliente **no** puede auditar

⚠️ **Banda D es la única que no da $110.000.** Es la decisión del dueño (*"dejarla en 140.000 para
que se venda más"*), tomada **dos veces**. Cuesta $7.000 por combo, y banda D es el 15,9% del
volumen. Sigue dejando **$36.168**, que son **$12.455 más que vender una sola** a $83.000.
Y en banda D **solo quedan $3.000 para negociar** (el rescate es $137.000): su lista ya está rebajada.

**Descuentos:** 1 unidad **máximo $3.000**. 2 unidades: el precio de rescate de la tabla, y
**SOLO si el cliente ya dijo que está caro**. Después de pauta: 1 ud deja $3.303-5.094, combo
$16.168-23.786, combo con rescate $13.053-13.786.

🔒 **El piso real** (lo vigila el bloque 7 de `test-desglose-honesto.js`): **vender DOS nunca puede
dejar menos que vender UNA.** Ese es el límite, no la meta por unidad.

---

## 📊 NÚMEROS MEDIDOS — NO VOLVER A MEDIRLOS

### El export del agente viejo
- **6.317 conversaciones.** Embudo: 6.095 → 3.600 (volvió) → 2.444 (cotizado) → 1.202 (datos) → 278 (cerró)
- Referencia por escalón: `volvió 59,1%` · `cotizado 67,9%` · `datos 49,1%` · `cerró 23,0%`

### El bot, mismo embudo (23-sep, panel en vivo)
- 124 conversaciones → 54 cotizados → **10 llegaron al cuadro** → 9 confirmaron → 2-3 pedidos
- **El único escalón roto: `datos` 30,3% vs 49,2% → índice 0,62.** Del cuadro al sí, el bot es MEJOR
  (90% vs 85,2%)

### Qué decía el agente viejo al cotizar (1.815 casos) y cuántos avanzaron
| qué hacía | veces | avanzaron |
|---|---|---|
| **pidió los DATOS** | 473 | **50,7%** ← el mejor |
| ofreció 2 conjuntos | 148 | 45,3% |
| pidió confirmar | 154 | 40,9% |
| preguntó algo abierto | 87 | 25,3% |
| **preguntó TALLA o COLOR** | **1.192** | **24,8%** ← el peor, y el más usado |

> Lo que más se hacía era lo que peor funcionaba.

### Lo que la gente pregunta de verdad
TALLA **17,8%** · COLOR **10,3%** · precio 8,1% · envío/pago 5,4% · ¿cuándo llega? 5,2% ·
¿no se moja? 3,2% · ¿es estafa? 2,5% · material 2,3%
🔑 **Talla + color = 28,1%, tres veces y media el precio.**

### Sobre el precio y el combo
- **El precio NO es la objeción declarada:** apareció en **9 de 482** combos perdidos (**1,9%**)
- **Ofrecer el combo cierra 3× mejor:** el bot lo ofrece → **16,8%** · el cliente pregunta → 12,5% ·
  nunca se menciona → **5,6%**
  ⛔ **Por eso NO se implementó la regla "no ofrecer el combo si no lo piden"** que pidió el dueño.
  Se midió primero y los datos dijeron lo contrario.
- **Combos cerrados a mano por el dueño:** 22, de los cuales **18 (81,8%) bajo lista**, rebaja
  mediana **$9.000**, margen mediano **$38.053**, **ninguno en pérdida**
- Volumen por banda: A 32,7% · B 7,1% · C 31,9% · D 15,9% · E 12,4%
- Recoger en bodega deja **$26.900**; es la venta más rentable que hay

### Seguimiento (al cierre del 24-sep)
353 conversaciones revisadas · 14 compraron · 1 noMolestar · 5 en pausa · **313 en ventana de 72h** ·
8 enviados en el paso 1 (a las 20,0-21,4h, con la cadencia vieja)

---

## ⏰ LA CADENCIA DEL SEGUIMIENTO, Y LA EVIDENCIA DETRÁS

**Vigente: 2h · 20h · 44h**, con una sola plantilla (el paso de 44h).

**Aviso de honestidad para la sesión nueva: el 2h NO salió de nuestros datos.** El export **no trae
la hora de cada mensaje**, así que con lo nuestro no se puede medir el momento óptimo. Salió de
referencias de la industria:

| fuente | qué dice |
|---|---|
| Secuencia estándar de carrito abandonado | **1h / 24h / 72h** |
| [Barilliance](https://www.barilliance.com/cart-abandonment-rate-statistics/) | pasadas las 24h la recuperación cae fuerte; las conversiones **se reducen a la mitad** |
| [Rejoiner](https://rejoiner.com/resources/abandoned-cart-email-timing/) | su óptimo medido es **30 min**; la ventana más valiosa son los primeros 3 días |
| [Klaviyo](https://www.klaviyo.com/blog/abandoned-cart-email) | primer toque entre **2 y 4 horas** |
| [MIT / InsideSales](https://www.leadresponsemanagement.org/) (15.000 leads) | responder en 5 min = **21× más probable** calificar que en 30 min |

**Conclusión:** 2h está dentro de la banda recomendada; **las 20h de antes caían en la zona donde las
conversiones ya se partieron a la mitad.** El óptimo real podría estar en **1h**, pero a 30-60 min el
cliente a veces todavía está escribiendo y el seguimiento se siente como acoso.

**→ QUÉ HACER:** dejarlo 2 semanas y leer los contadores por paso (`segPorPaso` / `segRespondio` /
`segCompro`, instalados en el #140). Si el paso de 2h es el que más compra, **probar 1h y comparar**.
Un cambio por vez. Dentro de la ventana de 72h de un anuncio (CTWA) **los mensajes son gratis**, así
que equivocarse en el timing no cuesta plata, solo cuesta la venta.

---

## 📜 POLÍTICAS DE META VERIFICADAS (con fuente)

- **Tope de frecuencia de plantillas de marketing:** ~2/día por usuario, **contando todas las marcas**.
  Error **131049**. Meta no publica el número exacto
- 🔑 **Ese tope NO aplica al texto libre dentro de la ventana de 24h.** Por eso la cadencia de 3
  toques con **una sola plantilla** es segura
- **Calificación en rojo** → límite congelado, plantillas restringidas, y **puede suspender el número**
- Sin verificar el negocio: **250** conversaciones business-initiated / 24h. Verificado: ~1.000+
- **Ventana FEP de 72h (CTWA):** mensajes ilimitados **gratis**, plantillas incluidas

---

## 🧪 LAS 25 BATERÍAS

Todas verdes al cierre. Las que nacieron en esta sesión:

| batería | casos | qué blinda |
|---|---|---|
| `test-primer-mensaje.js` | 73 | el primer mensaje determinístico |
| `test-desglose-honesto.js` | **99** | las 3 reglas del desglose + el piso "dos deja más que una" |
| `test-direccion-y-oficina.js` | 84 | oficina de transportadora sin pedir dirección |
| `test-seguimiento-config.js` | 67 | cadencia, ventana y configuración efectiva |
| `test-sin-confirmar-no-hay-venta.js` | 64 | sin "SÍ CONFIRMO" no se guarda |
| `test-bodega.js` | **43** | dirección por defecto, horario, mayoristas, combo vs tabla |
| `test-auditoria.js` | 43 | cuadrar conversaciones vs ventas |
| `test-anular-pedido.js` | 40 | anular sin borrar, con `id` único |
| `test-pedido-duplicado.js` | 38 | no guardar el mismo pedido dos veces |
| `test-negociar-precio.js` | 37 | los topes de descuento y el piso |
| `test-ver-chat.js` | 34 | la pantalla de conversación |
| `test-pedir-el-pedido.js` | 28 | pedir los datos + **el techo de 9.000 tokens** |

---

## 🪤 TRAMPAS QUE YA COSTARON TIEMPO — no volver a caer

1. **`fecha` no es identificador.** `toISOString()` colisiona dentro del mismo milisegundo. Se usa
   `randomUUID()` + `indiceDePedido()`
2. **Los pedidos anulados se filtran en `store.todosLosPedidos()`, un solo lugar.** Hay **9**
   consumidores: filtrar en cada pantalla garantiza que alguien se olvide de uno
3. **Los pedidos se ANULAN, no se borran.** El panel promete "no se borran nunca", y un pedido
   borrado es contabilidad que desaparece
4. **Buscar un número por substring no sirve.** `!tabla.includes("42.000")` enganchaba dentro de
   `$142.000`. Comparar contra la constante, no contra el texto
5. **No escribir pruebas que dependan de la fecha de hoy.** Una decía "anteayer" y cayó justo en el
   día que otra esperaba vacío
6. **El log de eventos vive en memoria y se borra en cada deploy.** No sirve como contabilidad
7. **El parser del export:** el bloque `Context:` es multilínea y pegaba publicidad a los mensajes
   (173 conversaciones, 52.409 caracteres). Los mensajes con foto llegan como JSON con doble-UTF8
   (`env\u00c3\u00ado`) → `repararTexto()`
8. **Los masivos de reenganche traen un total y se contaban como cotizaciones** (149 casos, 0,0% de
   cierre). Hay que excluirlos
9. **Dos instancias del bot pueden mandar el mismo seguimiento.** El turno se **reclama antes** de
   mandar, no después. Perder 1 seguimiento es más barato que mandar un duplicado
10. **`BODEGA_DIRECCION` y `BODEGA_HORARIO` usan `??`, no `||`.** Con `||` la cadena vacía caía de
    vuelta en el default, y si se mudan no se podría apagar la dirección vieja sin un deploy

---

## 🎯 QUÉ MEDIR EN LA SESIÓN SIGUIENTE

1. **El escalón "llegaron a los datos"** con un día completo (el 23-sep dio 18,5% sobre cotizados).
   Es el único escalón roto y el #125 fue para arreglarlo: hay que ver si movió
2. **Los contadores del seguimiento por paso** — ¿cuál de los tres toques trae las compras?
3. **El share de pedidos de 2 unidades** — tiene que volver a ~26,8% después del #118
4. **Si banda D a $140.000 vende más.** Es la apuesta del dueño y ahora se puede medir contra las
   otras cuatro bandas, que quedaron con la estructura pareja
5. **La calidad del número** después del estreno de la plantilla (`/setup-waba`)

## ❓ LO QUE QUEDÓ SIN RESPUESTA

- **No se puede medir el timing óptimo con datos propios**: el export no trae timestamps
- **El upsell del colmena sigue sin medir**
- **Nunca se midió si la lluvia mueve las ventas**
- No tengo `PANEL_TOKEN` propio (y está bien que sea así)
- No puedo mergear cambios en `.github/workflows/`

---

## 📌 CÓMO TRABAJAR CON EL DUEÑO (para la sesión nueva)

- **Opera desde el celular y no es técnico.** Explicaciones cortas, sin jerga. No hay IDE: lo que
  quiera ver, va en el chat o en un PR de GitHub
- **Mergea muy rápido**, a veces antes de que termine de subir los commits. → **Un PR por cambio,
  abierto de inmediato**
- **Varias veces me corrigió y tenía razón**: la regla de la oficina (no pedir dirección), el combo
  (el bot sí estaba cotizando 2 × $59.900), la dirección de la bodega (ya era pública). **Cuando
  contradice un análisis mío, primero verificar si el dato está en los archivos.**
- **Cuando pide una regla, medir antes de implementarla.** Pasó con "no ofrecer el combo si no lo
  piden": los datos decían que ofrecerlo cierra 3× mejor, y no se implementó
- **Decirle lo que cuestan las decisiones, en pesos, sin discutírselas.** Banda D a $140.000 cuesta
  $7.000 por combo: se implementó y se dejó escrito el número
