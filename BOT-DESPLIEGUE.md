# 🚀 Poner el bot en producción — guía de hoy

> Todo lo de código ya está hecho y probado (**50/50 pruebas**). Lo que queda son
> pasos en Render y en Meta, que necesitan tus credenciales.

---

## 🤖 Qué modelo usar

Recalculé el costo con datos **medidos** del export, no estimados. La cuenta vieja
asumía 10 mensajes por conversación; el export mide **3,43**, así que sobrecontaba
las llamadas **2,9×** y la IA cuesta menos de lo que decíamos.

| modelo | IA/mes | + Render | total |
|---|---|---|---|
| Llama 3.1 8B (Groq) | $20.289 | $28.000 | **$48.289** |
| **DeepSeek V4-Flash** | $57.179 | $28.000 | **$85.179** |
| GPT-5.6 Luna | $86.978 | $28.000 | $114.978 |
| **Gemini 3.1 Flash-Lite** | $108.723 | $28.000 | **$136.723** |

Contra ManyChat ($500.000+), respond.io ($796.000+) o Wati ($1.956.000).

### 👉 Mi recomendación: **arrancar HOY con Gemini, pasar a DeepSeek esta semana**

**Por qué Gemini hoy:** la clave ya existe (**IMPERMEABLE BOT**, 13-jul-2026) y la
facturación Nivel 1 está activa. **Cero fricción** — y hoy lo que importa es que el
bot quede prendido.

**Por qué DeepSeek después:** ahorra **$51.544/mes** ($618.000/año). Pero requiere
crear cuenta y meter medio de pago, y eso no es trabajo para esta noche.

**El cambio es una variable de entorno, no código.** Se hace en 30 segundos:
```
AI_PROVIDER=openai-compat
AI_API_KEY=(la de DeepSeek)
AI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-chat
```

⛔ **Modelos gratuitos: no.** Ya está medido: el rate limit en hora pico cuesta
~$507.662/mes en ventas perdidas contra $120.000 de un modelo pago. Ya lo viviste con Solar.

---

## 1️⃣ Render — arreglar lo que quedó a medias

El servicio quedó creado con **`Language: Python 3`** y **sin `Root Directory`**. Con eso
no arranca nunca, porque el bot es Node y vive en `bot/`.

| campo | valor |
|---|---|
| Name | `bikerpro-bot` |
| **Language** | **`Node`** ⬅️ estaba en Python |
| Branch | `main` |
| **Root Directory** | **`bot`** ⬅️ estaba vacío |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Starter ($7/mes) |

⚠️ **No uses el plan Free.** Se duerme por inactividad y el primer mensaje del cliente
se pierde o llega con 50 segundos de retraso. En un negocio donde el 44,8% de las
conversaciones muere sin respuesta, eso es exactamente lo que no se puede permitir.

### Variables de entorno

```
AI_PROVIDER=gemini
GEMINI_API_KEY=(la de IMPERMEABLE BOT)
GEMINI_MODEL=gemini-3.1-flash-lite
MAX_HISTORIAL=8
WHATSAPP_VERIFY_TOKEN=bikerpro_verify_2026
OWNER_WHATSAPP=573138615813
```

Estas van **después**, cuando tengas la app de Meta:
```
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WABA_ID=2213159576112051
```

---

## 2️⃣ Meta — app de WhatsApp y webhook

1. **developers.facebook.com** → Crear app → tipo **Business**
2. Agregar el producto **WhatsApp**
3. En **API Setup** copiar: `Phone Number ID` y el token temporal
4. **Configurar el webhook:**
   - URL: `https://bikerpro-bot.onrender.com/webhook`
   - Verify token: `bikerpro_verify_2026` (el mismo de la variable)
   - Suscribirse al campo **`messages`**
5. Probar con el **número de prueba** que da Meta, no con el número real todavía

✅ **La verificación del webhook ya está probada localmente:** con el token correcto
devuelve el `challenge`, con uno equivocado responde `Forbidden`. Si Meta falla ahí,
es que la variable no quedó puesta en Render.

---

## 3️⃣ Antes de conectar el número real

🔴 **Desconectar Hermes.** Usa Baileys, que no es oficial, y el riesgo es el **bloqueo
permanente del número por donde entra el 100% de las ventas**. Es el único problema
abierto que puede acabar con el canal completo, no solo costar plata.

🔴 **Verificar coexistence.** Permite tener la Cloud API **sin sacar el número del app**
y sin perder el historial. Existe desde mayo 2025. Eso desbloquea lo anterior sin riesgo.

---

## 4️⃣ Y esto es gratis y no depende de nada

En la configuración del agente de Meta, el campo **Shipping Info** dice hoy:

> Bogotá y alrededores: 10.000 a 12.000. **Resto de Colombia: 15.000 a 20.000.**

**Eso es falso.** El flete real de banda E ronda $26.000 y Tadó llegó a $55.563. Es la
razón por la que el agente cotizó **por debajo del tarifario en el 46,6% de los pedidos**.

Mientras el bot nuevo no esté atendiendo, **cada pedido que entra por el agente viejo
sigue saliendo mal cotizado.** Corregir ese texto es un campo de formulario y es la
fuga viva más grande que queda.

---

## 🟢 ESTADO: EL BOT ESTÁ ARRIBA Y EL GUION PASA 11/11

Servicio en vivo: `https://bikerpro-bot.onrender.com`

| prueba | resultado |
|---|---|
| `GET /` | ✅ `BikerPro bot activo 🏍️` |
| `GET /health` | ✅ `{"ok":true}` |
| webhook con el token correcto | ✅ devuelve el challenge |
| webhook con token equivocado | ✅ `Forbidden` |
| **guion contra el bot real** | ✅ **11/11 en tres pasadas seguidas** |

### Los 11 casos del guion, verificados en producción

| caso | verifica |
|---|---|
| primer mensaje | se adelanta a talla y color (28,1% de las dudas) |
| `Bogotá (Suba)` | $73.000, no $85.000 |
| `Bosa` sin decir Bogotá | $73.000 |
| `Cali` | $82.000 |
| 2 uds a Bogotá | **$137.000 en firme**, sin escalar |
| `Mosquera` | pregunta el departamento |
| `Riosucio` | pregunta el departamento |
| `Tadó` | $93.000 |
| `Guapi` | no da número, escala |
| envío sin ciudad | no da número ni rango |
| 12 unidades | no cotiza, escala |

**Cómo repetirlo** (después de cada cambio del guion, y obligatorio al cambiar de modelo):
```bash
node bot/probar-guion.js https://bikerpro-bot.onrender.com bikerpro_verify_2026
```

⚠️ **Corré la batería DOS veces.** La IA no es determinista: un fallo aislado puede
ser variación, pero el mismo caso fallando dos veces es un problema del guion.

### 🔑 Lo que aprendimos probando en producción

Las 54 pruebas unitarias estaban en verde y el guion **igual falló 2 de 11**.
La causa: **la IA no llama a `cotizar()` — lee la tabla del prompt.**

- `MOSQUERA` estaba como 6º ejemplo de banda A, así que la IA lo cotizaba a
  $73.000 en vez de preguntar el departamento. El código estaba bien; el texto no.
- Tadó y El Charco iban comprimidos en una línea y la IA no los aplicaba: a
  "¿cuánto a Tadó?" respondía con el pitch del producto, sin precio.

**Moraleja: un tarifario correcto en el código no garantiza un precio correcto al
cliente.** Por eso existe `probar-guion.js` y por eso hay que correrlo en producción,
no solo en local.

---

## ✅ Lo que ya quedó listo y probado

| | |
|---|---|
| Tarifario corregido en código | ✅ |
| Reconocimiento de ciudades arreglado | ✅ 47,6% → 36,9% sin reconocer |
| Bug de Mosquera | ✅ ya no se niega a cotizar la sabana |
| Localidades de Bogotá | ✅ $73.000, ya no $85.000 |
| 2 unidades se cotizan en firme | ✅ ya no escala a un asesor |
| Prompt con talla y color al frente | ✅ 28,1% de las dudas |
| Antirrepetición del cuadro de cierre | ✅ el viejo lo repetía 1,83× |
| Antispam de imágenes | ✅ el viejo mandaba 5 por mensaje |
| Pruebas | ✅ **50/50**, corren sin clave de IA |
| Servidor arranca | ✅ verificado |
| Webhook verifica | ✅ verificado con token bueno y malo |

**Correr las pruebas antes de cada despliegue:**
```bash
cd bot && node test-cotizacion.js
```

---

## 🔎 Qué medir la primera semana

1. **Mensajes por conversación.** Hoy son **3,43**. El prompt nuevo responde talla y
   color de entrada, así que debería bajar. Si baja aunque sea 1, el prompt más grande
   ya se pagó solo. **Es una predicción mía, no un dato: hay que verificarla.**
2. **Cuántos pedidos salen bien cotizados.** Hoy el agente viejo acierta el 38,7%.
3. **Share de 2 unidades.** Hoy **8,3%**. Ahora que se cotiza en firme debería subir.
4. **Ciudades que caen al default.** Quedan **62 municipios sin tarifa propia** en
   `CIUDADES_SIN_TARIFA`. Vale pedirle a 99 Envíos el flete real de esos destinos —
   varios son áreas metropolitanas que seguramente son más baratas que la banda E.
