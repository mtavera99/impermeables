# 💸 Pago anticipado: comprobantes y trazabilidad

**Fecha:** 9-oct · **De dónde sale:** el pedido de Wilmer, que se quedó sin despachar.

---

## Qué pasó

Un cliente eligió **pago anticipado**, transfirió, y mandó la **captura del comprobante** por
el chat **a las 8 de la mañana**. El bot le contestó:

> Recibí tu mensaje 🙌 Todavía no puedo abrir ese tipo de archivo. ¿Me contás por escrito qué necesitás?

Y ahí murió todo. Nadie se enteró, el pedido no se despachó, y **al día siguiente el cliente
escribió por Instagram** —otro canal— preguntando por su guía y mandando las capturas otra vez.
El dueño tuvo que reconstruir el caso a mano.

## Por qué fue grave de verdad

La respuesta fea era lo de menos. **El problema era el `continue`.**

La rama de "tipos no soportados" en `bot/src/server.js` cortaba el turno antes de guardar nada.
O sea que el mensaje del cliente **nunca pasaba por `store.pushMsg`**, y por lo tanto:

| | antes |
|---|---|
| en el historial del chat | ❌ no existía |
| en el panel | ❌ invisible |
| en el embudo (`embudo.js` infiere de los mensajes) | ❌ congelado en la etapa anterior |
| en el puntaje de "este chat necesita atención" (`atencion.js`) | ❌ sin reloj de espera |
| aviso al dueño | ❌ ninguno |

**Un cliente que YA HABÍA PAGADO era invisible para todo el sistema.** Y como no quedaba
rastro, tampoco hay forma de saber cuántos pedidos se perdieron así antes. Eso es exactamente
el problema: no se podía saber.

### Y encima el guion lo pedía

`bot/src/prompt.js` le decía al cliente *"envía el comprobante de pago por este chat. Cuando lo
mande, confirmas y se despacha"*. **El bot pedía justo el único tipo de archivo que era incapaz
de recibir** — y además prometía confirmar un pago que no puede ver.

---

## Qué quedó hecho

### 1. El chat se marca cuando alguien va a pagar por adelantado

Pedido textual del dueño: *"cuando una persona vaya a hacer pago anticipado que también quede
marcado de alguna forma distinta para yo poder estar pendiente"*.

Cuando el cliente escribe algo como "pago por transferencia" o "quiero anticipado":

- el chat queda marcado (`esperaComprobante`),
- llega un aviso **🔖 PAGO ANTICIPADO EN CAMINO** al WhatsApp del dueño,
- y **una sola vez**: si el cliente vuelve a nombrar Nequi tres veces, no llegan tres avisos.
  Un aviso repetido entrena a ignorar los avisos.

### 2. La imagen SÍ se lee

Cuando entra una imagen (o un PDF), el orden es a propósito:

1. **se guarda el mensaje** ← lo primero de todo, nunca más un mensaje invisible
2. se intenta leer la imagen con Gemini (banco, monto, fecha, referencia)
3. se marca el pedido para que **no se pueda despachar**
4. **se le avisa al dueño** — con datos o sin ellos
5. se le contesta al cliente

> ⚠️ **Leer la imagen es un lujo, no el mecanismo.** Si no hay Gemini, si se agotó la cuota o si
> la captura está ilegible, **el aviso sale igual** diciendo "no se pudo leer la imagen, abrí el
> chat y miralá vos". El bot falló porque se calló, no porque no supiera leer.

El aviso al dueño trae el monto leído, el medio, la referencia, el pedido, y **avisa si el monto
del comprobante no cuadra con el total del pedido**.

### 3. Un pedido anticipado NO se despacha sin verificar la plata

Motivo de revisión nuevo: `pago_anticipado_sin_verificar`. Se engancha en la tabla que ya
existía (`store.MOTIVOS_REVISION`), así que el pedido aparece solo en:

- el encabezado rojo del aviso al dueño,
- la tarjeta **🔴 revisar antes de despachar** del panel,
- el CSV de pedidos.

Son **dos estados distintos** y antes se confundían en uno:

| estado | quién lo cierra |
|---|---|
| el cliente mandó el comprobante | el cliente |
| **la plata está en la cuenta** | **solo el dueño, mirando el banco** |

El bot **nunca** marca un pago como verificado. Una captura se puede editar, puede ser de otra
cuenta o de un pago que se reversó.

> ⚠️ Este motivo **sí alcanza a los pedidos anticipados que ya estaban pendientes**, porque se
> calcula sobre el campo `pago` que ya existía. Es deliberado: frenar un pedido cuya plata quizá
> nunca entró es el error barato. Los que ya tienen guía no se tocan.

### 4. El panel: una tarjeta y un botón

- Tarjeta **💸 pagos por verificar**, que distingue "ya mandó comprobante" (urgente: el cliente
  ya pagó y está esperando) de "esperando que paguen".
- Etiquetas en la fila del pedido: `💸 COMPROBANTE SIN VERIFICAR`, `💸 ESPERANDO PAGO`, `💸 PAGADO`.
- Botón **✅ la plata entró** → desbloquea el despacho y queda firmado quién lo verificó.

### 5. "Total al recibir" era mentira en los anticipados

El aviso al dueño decía *"Total al recibir: $X"* **fijo en el código**, también en los pedidos
anticipados. Despachar uno de esos a recaudar es **cobrarle dos veces al cliente**. Ahora dice
`💸 PAGO ANTICIPADO (no se recauda en la entrega)`.

### 6. El guion ya no promete lo que no puede cumplir

Ahora el bot dice que **recibió** el comprobante y que **se está verificando**, y tiene prohibido
decir que el pago quedó confirmado o que el pedido ya salió.

### 7. Ningún mensaje vuelve a ser invisible

Los tipos que el bot todavía no procesa (stickers, videos, ubicaciones) **también se guardan**
en el historial antes de contestar. La respuesta sigue siendo la de siempre, pero el cliente ya
no desaparece del panel ni del embudo.

---

## Cómo se usa, en la práctica

1. Llega el aviso **💸 LLEGÓ UN COMPROBANTE DE PAGO** al WhatsApp del dueño, con el monto leído.
2. Se mira la cuenta (Nequi/Bancolombia) y se compara con lo que dice el aviso.
3. Si la plata entró → en el panel, botón **✅ la plata entró**.
4. El pedido sale de "revisar antes de despachar" y se despacha normal.
5. Si no entró → se le escribe al cliente. El pedido sigue frenado, no se pierde.

---

## Qué hace falta para que funcione en producción

| variable | para qué | si falta |
|---|---|---|
| `OWNER_WHATSAPP` | a quién llegan los avisos | **🔴 el aviso no se manda.** Se grita en el log con el texto completo, pero hay que ponerla |
| `GEMINI_API_KEY` + `AI_PROVIDER=gemini` | leer la imagen | el aviso sale igual, sin los datos del comprobante |
| `WHATSAPP_TOKEN` | bajar la imagen de WhatsApp | ídem |

---

## Pruebas

```
cd bot && node test-comprobante-de-pago.js      # 118 comprobaciones, sin red ni credenciales
```

Cubre lo que dejó pasar el caso: reconocer "ya pagué" sin confundirlo con "¿cómo pago?",
que un pedido anticipado no se pueda despachar sin verificar, y que **el aviso al dueño salga
aunque la imagen no se pueda leer**.

> 🔑 Un detalle que costó tres casos: la expresión de "ya pagué" tenía un `\b` al final y en
> JavaScript `\b` solo entiende `[A-Za-z0-9_]`. Una "é" final cuenta como no-palabra, así que
> **"ya pagué", "ya te pagué" y "ya consigné" no casaban** — justo las frases acentuadas, las que
> de verdad escribe la gente. Está protegido por la prueba.
