# 🤖 BikerPro Bot — Agente de ventas con IA para WhatsApp

Responde automáticamente a los clientes que llegan de los anuncios, vende con el guion
correcto (100% contraentrega, **nunca pide adelantos**), cotiza el envío por ciudad,
**captura el pedido** y te avisa a ti. Pasa a un humano cuando hace falta.

---

## 🧩 Qué necesitas (3 cosas gratis)

1. **Clave de IA (Google Gemini)** — gratis en https://aistudio.google.com/apikey
2. **App de WhatsApp en Meta** con un **número de prueba gratis** — en https://developers.facebook.com
3. **Un lugar donde correr el bot 24/7** — cuenta gratis en https://render.com (o Railway)

> 🛡️ **Sin riesgo:** primero se prueba con el NÚMERO DE PRUEBA de Meta. Tu número real
> y tu campaña NO se tocan hasta que todo funcione.

---

## 🚀 Instalación paso a paso

### Paso 1 — Clave de Gemini (2 min)
1. Entra a https://aistudio.google.com/apikey e inicia sesión con tu Google.
2. Clic en **"Create API key"** y copia la clave.

### Paso 2 — App de WhatsApp en Meta (10 min)
1. Entra a https://developers.facebook.com → **My Apps** → **Create App** → tipo **Business**.
2. Agrega el producto **WhatsApp**.
3. En **API Setup** verás:
   - Un **número de prueba** (test number) y su **Phone number ID** → cópialo.
   - Un **Temporary access token** → cópialo (dura 24h; luego se genera uno permanente).
4. Agrega tu propio celular como **destinatario de prueba** para poder probar.

### Paso 3 — Publicar el bot en Render (10 min)
1. Entra a https://render.com → **New** → **Web Service** → conecta tu GitHub y elige el repo `impermeables`.
2. Configura:
   - **Root Directory:** `bot`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. En **Environment** agrega estas variables (ver `.env.example`):
   - `WHATSAPP_TOKEN` = el token de Meta
   - `WHATSAPP_PHONE_NUMBER_ID` = el Phone number ID
   - `WHATSAPP_VERIFY_TOKEN` = `bikerpro_verify_123` (o el que quieras)
   - `GEMINI_API_KEY` = tu clave de Gemini
   - `OWNER_WHATSAPP` = `573138615813` (para recibir aviso de cada pedido)
4. Despliega. Render te dará una URL, ej: `https://bikerpro-bot.onrender.com`

### Paso 4 — Conectar el webhook en Meta (5 min)
1. En Meta → WhatsApp → **Configuration** → **Webhook** → **Edit**.
2. **Callback URL:** `https://TU-URL-DE-RENDER.onrender.com/webhook`
3. **Verify token:** el mismo de `WHATSAPP_VERIFY_TOKEN`.
4. Guarda (debe decir verificado ✅) y **suscríbete al campo `messages`**.

### Paso 5 — ¡Probar! 🎉
Escríbele al número de prueba desde tu celular. El bot debe responder solo.
Cuando cierres un pedido de prueba, llegará el aviso a tu WhatsApp (`OWNER_WHATSAPP`).

### Paso 6 — Pasar a tu número real (cuando funcione)
En Meta → WhatsApp → **API Setup** → **Add phone number**, registra tu número
`313 861 5813` y verifícalo. (Ese número saldrá de la app WhatsApp Business y pasará a la
API; para chatear manualmente usarás la bandeja de Meta o una herramienta de inbox).

---

## 🧪 Probar la IA sin WhatsApp (opcional, en tu computador)
```bash
cd bot
cp .env.example .env      # y pon tu GEMINI_API_KEY
npm install
npm run chat              # conversa con el bot por consola
```

---

## 📦 ¿Dónde quedan los pedidos?
- Se guardan en `bot/data/orders.json` y se te **avisan por WhatsApp** al instante.
- Las conversaciones quedan en `bot/data/conversations.json`.

---

## 📦 Mandarle a cada cliente su guía (pantalla "Enviar guías")

Después de despachar, en vez de mandar las guías una por una:

1. Generás las guías en 99 Envíos y descargás **el PDF con todas**.
2. Entrás a `/guias?token=TU_WHATSAPP_VERIFY_TOKEN` (o al botón **📦 Enviar guías** del panel).
3. Subís el PDF y le das **Revisar**. Se parte en una hoja por guía y se muestra a quién
   le corresponde cada una, con un puntaje de certeza. **Todavía no se envía nada.**
4. Destildás lo que no quieras y le das **Enviar**. Cada cliente recibe **su hoja en PDF**
   con el número de guía, la transportadora y el enlace para rastrear.

### Cómo sabe de quién es cada guía

No solo por el teléfono, porque **el cliente a veces da en la guía un número distinto al de
su WhatsApp** (el del marido, el del vecino que recibe). Se usan varias señales:

| señal | puntos |
|---|---|
| celular del pedido | 50 |
| número de WhatsApp | 50 |
| nombre (repartido entre sus palabras) | hasta 45 |
| números de la dirección | hasta 40 |
| ciudad | 10 |

Y **dos candados**: mínimo **50** puntos, y el mejor candidato tiene que superarle al
segundo por **20**. Si hay empate entre dos personas distintas, **no se envía** y se
reporta — mandarle a un cliente la dirección y el teléfono de otro es filtrarle datos
personales a un desconocido.

La guía se manda **siempre al WhatsApp con el que habló el bot**, nunca al teléfono
impreso en la etiqueta.

### Lo que no se puede repetir
Una guía ya enviada queda anotada en `bot/data/guias-enviadas.json` y **no se reenvía**
aunque el PDF se suba otra vez. También se bloquea la misma guía repetida dentro del
mismo PDF.

### Probarlo sin credenciales
```bash
cd bot && node test-guias.js     # 8 casos: teléfono distinto, empates, guía ajena, repetidas
```

> ⚠️ **La ventana de 24 horas de Meta aplica.** Si despachás el mismo día, la mayoría de
> los clientes la tiene abierta y la guía llega sin problema. Al que escribió hace más de
> 24h **no le llega** un mensaje libre: para esos hace falta una **plantilla aprobada**
> (y ya son tres cosas que la necesitan: guías, cierre diario y seguimiento de 72h).

---

## 🕵️ Clientes SIN número de teléfono (username de WhatsApp)

WhatsApp dejó que los clientes usen un **nombre de usuario** y le **oculten el teléfono**
al negocio. Cuando eso pasa, Meta no manda el número: manda un identificador
(`CO.1098944123092301`), distinto para cada negocio, del que **no se puede sacar el
teléfono**.

El bot les responde igual, sin que tengas que hacer nada. En el panel aparecen con su
**nombre y @username**, y con el aviso **🕵️ sin teléfono**.

### ⚠️ Lo que tenés que saber para despachar

**Contraentrega necesita un teléfono** — la transportadora lo pide para la guía. Con
estos clientes el teléfono **no viene en el chat**: el bot se lo pide dentro de la
conversación (va en el pedido, campo `celular`), y **ese** es el que hay que usar para la
guía.

🔴 **Si ves un pedido de un cliente marcado "sin teléfono" y el campo celular está vacío,
no lo despaches sin pedírselo antes.** La guía se rechaza o se pierde el paquete.

Y ojo: el número que te dé para la entrega **puede no ser suyo** (el del que recibe). El
bot le manda la guía por WhatsApp, que es donde sí lo podés alcanzar.

---

## ⚙️ Cómo cambiar lo que dice el bot
- Todo el "cerebro" (precios, reglas, tono, objeciones) está en **`src/prompt.js`**.
- Los fletes por ciudad están en **`src/fletes.js`**.

## ⚠️ Notas
- El plan gratis de Render "se duerme" tras inactividad (la 1ª respuesta puede tardar ~1 min).
  Para uso real conviene un plan que no duerma (~$7/mes) o Railway.
- El bot solo responde a mensajes de texto (por ahora). Audios/imágenes: pasa a humano.
- Cuando el bot pasa un chat a humano, queda en pausa para ese cliente (no vuelve a responder
  ese chat hasta reiniciar el bot o quitar la pausa).
