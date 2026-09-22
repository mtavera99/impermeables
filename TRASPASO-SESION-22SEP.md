# 🔄 Traspaso de sesión — 22 de septiembre de 2026

> **Para retomar en una sesión nueva.** Hoy fue el **primer día de operación real del bot**,
> y casi todo lo que se hizo salió de fallas encontradas con clientes reales, no en pruebas.
>
> Estado del código: **todo mergeado en `main` y desplegado.** Nada pendiente de mergear.

---

## 🔴 Lo urgente, en orden

| # | qué | por qué |
|---|---|---|
| 1 | **Recargar Meta Ads: ~$58.000** | Última lectura 12h: saldo **$113.057**, gasto $70.711, cierre proyectado $128.892. ⛔ Recargar **en la mañana**: recargar de noche dispara el rebote de 0-AI |
| 2 | **Rotar el `PANEL_TOKEN`** | El valor actual quedó pegado en el chat de hoy. Render → Environment → valor nuevo y largo. **No hay que tocar nada de Meta** (por eso están separados) |
| 3 | **Pedir la plantilla aprobada de Meta** | Ya van **4 cosas** que la necesitan: guías, cierre diario, seguimiento 72h, y responder desde el panel a un chat viejo. Hoy zafamos de casualidad |
| 4 | **Desconectar Hermes del número real** | Sigue abierto desde el 21-sep. Baileys = riesgo de ban del número |
| 5 | 🔴 **La línea del 313 861 5813 está CAÍDA** | Ver sección de accesos. Es un punto único de falla con dos amenazas encima |

---

## ✅ Lo que se resolvió hoy (8 PRs mergeados)

| PR | qué |
|---|---|
| **#89** | El bot guardaba cada pedido **dos veces** (7 registros para 4 clientes) |
| **#90** | 📦 **Enviar guías**: se sube el PDF de la transportadora y cada cliente recibe la suya |
| **#91** | 🔴 Clientes con **username de WhatsApp**: el bot no les contestaba |
| **#92** | Regla **sin celular no hay despacho** + limpiar la conversación `undefined` |
| **#93** | Recuperar los leads perdidos (`/recuperar-cliente`) |
| **#94** | 🔴 El panel estaba **abierto a internet** con una clave publicada → `PANEL_TOKEN` |
| **#95** | El botón "Enviar como BikerPro" **no funcionaba nunca** |
| **#96** | 🔴 **Cuatro rutas abiertas a internet** + guardián de rutas |
| **#97** | Si el bot no sabe quién escribió, ahora **AVISA** |

---

## 🎯 El hallazgo del día: clientes sin número de teléfono

WhatsApp lanzó los **nombres de usuario**. Cuando un cliente adopta uno, Meta **le oculta el
teléfono al negocio** y lo identifica con un **BSUID** (`CO.1098944123092301`), del que **no se
puede derivar el teléfono**. El payload trae `from_user_id`, no `from`.

El bot leía solo `msg.from` → `undefined` → enviaba sin destino → `400 The parameter to is
required`. **Y peor: todos caían en la misma conversación**, así que le contestaba a un cliente
nuevo con el historial de otro (*"ya te he dado todos los detalles…"* en su primer mensaje).

**Impacto medido: 17 clientes de anuncios (~$17.850 de pauta) sin respuesta durante ~3 horas.**

### Los 17 se recuperaron ✅
Sus identificadores estaban en los **logs de Render** (que sobreviven a los despliegues).
Se les escribió a todos y Meta confirmó `sent → delivered → read`. **Cero fallos.**

### 🔑 El dueño también tiene username (`@jirotavera`)
Por eso sus mensajes de prueba de anoche (23:55 y 23:57) nunca recibieron respuesta.
**No era la ventana de 24h: era el mismo bug.**

### Y quedó cerrado el hueco de detección
El bot **sabía** que fallaba y lo escribía en el log. Nadie mira los logs, así que nos
enteramos de casualidad en 3 horas. Ahora **avisa por WhatsApp** al dueño (tope 1 cada 30 min
con el acumulado). No se puede prevenir un formato que Meta no inventó todavía; sí se puede
hacer que el fallo grite.

---

## 🔐 Dónde vive cada secreto (son cuatro, no confundirlos)

| secreto | para qué | dónde va |
|---|---|---|
| `META_ADS_TOKEN` | leer la pauta (`ads_read`) | **Kiro Secrets** + GitHub Actions |
| `PANEL_TOKEN` | contraseña del panel y de todo lo que escribe | **Render** |
| `WHATSAPP_VERIFY_TOKEN` | solo el handshake del webhook de Meta | **Render** (y el mismo valor en Meta) |
| `WHATSAPP_TOKEN` | que el bot mande mensajes | **Render** |

⚠️ **`META_ADS_TOKEN` en Kiro Secrets solo se propaga a sesiones NUEVAS**, no en caliente.
Verificar con `python3 analisis/meta-api-lectura.py cuentas` → debe devolver
`act_4330882710457791 · COP · BikerPro`. Si falta, **decirlo, no inventar métricas.**

📌 El token de Meta Ads **también vive como secreto de GitHub Actions**, y por eso
`ESTADO-CUENTA.md` se actualiza solo cada hora. **Eso da acceso a los números del día sin
ninguna credencial en Kiro** — alcanza con leer el archivo.

---

## 🔴 El problema de acceso a Meta (sin resolver)

**La línea del 313 861 5813 está caída:** no recibe SMS y las llamadas no entran. Eso es del
**operador**, no de Meta ni de WhatsApp (un baneo de WhatsApp nunca apaga la línea).

Ese número es, al mismo tiempo: el WhatsApp por donde entra el 100% de las ventas, la
verificación de la cuenta de Meta, y el `OWNER_WHATSAPP`.

| riesgo | |
|---|---|
| WhatsApp hoy funciona con el SIM muerto | pero **no se puede re-verificar** si hay que recuperarlo |
| Si el número se recicla | quien lo reciba puede pedir códigos de la cuenta de Meta |

**Y el 2FA de Meta no se pudo cambiar:** bloquea el cambio con *"un dispositivo que no usás
habitualmente"* aunque sea su equipo de siempre (la confianza va por **perfil de navegador**,
no por máquina).

**Camino que funciona para el token sin resolver el 2FA:**
`developers.facebook.com/tools/explorer/` → app **Kiro** → User Token → solo **`ads_read`** →
Generate. Dura 1-2 horas. El permanente sale de
`business.facebook.com/settings/system-users?business_id=1271452296042859` (usuario
`Kiro Lectura`, rol **Analista**, nunca Anunciante).

---

## 📦 Guías: ya está en producción y sin probar con un PDF real

`/guias?token=...` (o el botón del panel). Se sube el PDF, se da **Revisar** (no envía nada),
se ve el pareo con su certeza, y se confirma.

**Cómo sabe de quién es cada guía** — porque el cliente a veces da un teléfono distinto al de
su WhatsApp:

| señal | puntos |
|---|---|
| celular del pedido | 50 |
| número de WhatsApp | 50 |
| nombre (por palabra) | hasta 45 |
| números de la dirección | hasta 40 |
| ciudad | 10 |

Candados: **mínimo 50** y el mejor debe superar al segundo por **20**. Empate entre personas
distintas → no se envía. Empate entre dos pedidos del **mismo** cliente → sí (mismo teléfono,
nada que filtrar). La guía sale **siempre al WhatsApp del chat**, nunca al teléfono impreso.

⬜ **Falta probarlo con un PDF real de 99 Envíos.** Si el formato de la etiqueta no parsea
bien, mejor saberlo antes de despachar 30 guías.

---

## 💰 La oportunidad que quedó sin tomar

Cada payload del webhook trae **de qué anuncio viene el cliente** (`referral.source_id`,
`source_url`). Hoy se descarta.

Medido en los 17 de hoy: `120249499375070390` (7 clientes) · `120249499276420390` (4) ·
`120249498751580390` (2) · `120249499411810390` (1) · `120249499667390390` (1). Dos entraron
por **Instagram**.

**Eso es la atribución de Meta Ads** — lo que el traspaso del 21-sep marcó como *"lo más
rentable del plan: saber qué anuncio da pedidos, no solo conversaciones"*. Está llegando
gratis. Guardarlo junto al pedido es la diferencia entre *"este anuncio trae conversaciones
baratas"* y *"este anuncio trae ventas"*.

---

## 🧪 Los tests que corren sin credenciales

```bash
cd bot
node test-cotizacion.js              # 21 casos del tarifario
node test-guias.js                   # 8 casos de emparejamiento de guías
node test-clientes-con-username.js   # 43 casos de clientes sin teléfono
node test-seguridad-rutas.js         # las 24 rutas: ninguna abierta sin justificar
```

🔑 **`test-seguridad-rutas.js` existe por una razón que conviene entender:** dos PRs
correctos por separado se sumaron en algo incorrecto (cuatro rutas quedaron abiertas). Eso no
lo encuentra una revisión de código, porque **hay que ver todas las rutas juntas y ningún PR
las muestra juntas.**

---

## 📌 Mis errores de esta sesión, para no repetirlos

| # | error | corrección |
|---|---|---|
| 33 | Conté **7** clientes perdidos | Eran **17**. El historial se corta en 24 mensajes y los viejos ya se habían borrado. El log de Render no se corta |
| 34 | Dejé el módulo de guías sin commitear en una sesión anterior | Se perdió entero y hubo que reescribirlo. **Commitear en cuanto pasa las pruebas**, antes de seguir |
| 35 | Di URLs de endpoints que aún no estaban desplegados | `Cannot GET`. Verificar el deploy antes de mandar un link |
| 36 | Escribí dos rutas con `VERIFY_TOKEN` mientras otra rama migraba todo a `PANEL_TOKEN` | Las dejé abiertas a internet con una clave publicada. De ahí el guardián |
| 37 | Leí identificadores de una captura de pantalla | 2 de 4 fallaron por un dígito. **Pedir el texto, no interpretar imágenes** |
| 38 | Mi primer guardián de rutas dio un falso negativo | Miraba 7 líneas y un comentario largo tapaba el chequeo. Un guardián que se equivoca al revés enseña a desconfiar de él |

**Patrón:** los errores más costosos salieron de **medir sobre una fuente truncada** (el
historial de 24 mensajes, una captura de pantalla) en vez de ir a la fuente completa.

---

## 🎯 Lo que sigue

**Inmediato:** recargar Meta Ads · rotar el `PANEL_TOKEN` · pedir la plantilla aprobada ·
llamar al operador por el 313

**Esta semana:** probar las guías con un PDF real · guardar la atribución del anuncio en cada
pedido · resolver el 2FA de Meta con app de autenticación · decidir qué pasa con Hermes

**Después:** base de datos en vez de JSON · máquina de estados formal · remarketing por tandas

*Y ver si alguno de los 17 recuperados contesta: es la prueba de que el bot retoma bien una
conversación con el contexto que se le dejó.*
