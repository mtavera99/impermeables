# 💬 Por qué el bot cierra ~5% y dónde se pierden las ventas — 19-nov-2026

> **Fuente:** las conversaciones reales del bot, sacadas con `/chats-de-producto` (cifradas en el Action y
> descifradas fuera del repo). Son **2.423 chats** activos de los cuatro productos. Para medir el cierre se usan
> los **1.501 que empezaron hace entre 24 y 90 horas**: ya tuvieron tiempo de cerrar, y no se cuelan clientes
> viejos que vuelven por posventa.
> Los números de cada paso del seguimiento salen de `/seguimiento`.
> Los scripts están en `analisis/cierre-del-bot-19nov/`. **Este documento no tiene datos de clientes.**

**Cómo se cuenta una venta:** el cliente vio el cuadro de confirmación y contestó que sí ("sí", "confirmo", "ok",
"listo"…). Con esa regla sale **5,3%**, lo mismo que mide `CPA-POR-PRODUCTO.md` cruzando pedidos con Meta (4,1-6,3%
según el producto). El "4%" que se ve es el de la última semana, que fue peor, sobre todo en el Q58.

---

## 1. El embudo

| paso | llegan | de los del paso anterior |
|---|---|---|
| entraron por el anuncio | 1.501 | |
| contestaron después del primer mensaje del bot | 835 (55,6%) | 55,6% |
| recibieron el total con envío | 589 (39,2%) | 70,5% |
| vieron el cuadro de confirmación | 95 (6,3%) | **16%** 🔴 |
| confirmaron | 79 (5,3%) | 83% |

| producto | contestan | reciben el total | ven el cuadro | **confirman** |
|---|---|---|---|---|
| Impermeable | 60% | 48% | 6,7% | **6,1%** |
| V10 | 58% | 45% | 7,9% | **6,0%** |
| Q58 | 54% | 39% | 3,5% | **2,9%** 🔴 |
| Radios | 50% | 18%* | 8,4% | **8,0%** |

\* En radios el total casi no se dice aparte, porque el envío es gratis.

### 🔑 Lo que muestra

1. **La fuga más grande es entre el total y el cuadro.** De 589 personas que ya saben cuánto pagan, solo 95 llegan al
   cuadro: **se pierden 494.** Cuando el cuadro aparece, el 83% confirma, así que el cierre en sí funciona.
2. **El 44% no contesta nunca el primer mensaje.** Escriben con el texto del anuncio ("¡Hola! Quiero la promo…") y no
   vuelven. Es normal en anuncios de clic a WhatsApp. El toque de 2 horas ya los trabaja (sección 3).
3. **La velocidad no es problema:** el bot contesta en 2,5 segundos (mediana) y el 99% en menos de 7.
4. **El Q58 cierra la mitad que los demás.** Una parte es el anuncio: ACOMPAÑANTE - Copia trae mensajes que cierran 1%
   (ver `AUDITORIA-META-19NOV.md`). Arreglar el bot no compensa un anuncio que trae gente sin intención de compra.

---

## 2. Dónde se van los 494 que vieron el total

| qué pasó | chats | % |
|---|---|---|
| **se fueron apenas vieron el total** | 182 | 37% |
| preguntaron algo más y después se fueron | 79 | 16% |
| dijeron que no, que era caro o que lo consiguieron en otro lado | 37 | 7,5% |
| lo aplazaron (pensarlo, quincena, consultarlo) | 28 | 5,7% |
| **dijeron que sí y nunca mandaron los datos** | 29 | 5,9% |
| otros (pidieron fotos, preguntaron por cascos, tiempos de entrega…) | 139 | 28% |

---

## 3. Lo que encontré, ordenado por cuánto puede mover el cierre

### 🥇 A. "¿Te sirve ese total?" invita a frenar

El mensaje del total casi siempre termina con una pregunta de sí o no: *"¿Te sirve ese total?"* Ahí el cliente tiene
que decidir, y si duda, se va.

| cómo termina el mensaje del total | n | el cliente no volvió a escribir |
|---|---|---|
| "¿Te sirve ese total?" | 377 | **33%** |
| pidiendo los datos directamente | 87 | **21%** |

**Propuesta: cierre asumido.** Después del total, pasar directo al siguiente paso con una sola pregunta fácil:
*"Te quedan en $152.000 con envío y pagás al recibir 📦 ¿A nombre de quién te los envío?"*

⚠️ **Esto es una correlación, no una prueba.** Los dos grupos no son iguales. Se confirma con una prueba A/B en el
bot: mitad de los chats con un final, mitad con el otro, durante una semana. Si la diferencia se sostiene (12 puntos
menos de abandono), son **~+0,6 puntos de cierre**, unos **4 pedidos/día** con el mismo gasto.

### 🥈 B. Pedir todos los datos de una vez frena

A **250** clientes se les pidieron los datos. **Solo el 37% mandó alguno** (un celular o una dirección).

- En el impermeable se piden **cinco cosas en un mensaje**: nombre, dirección con barrio, celular, talla y color.
- 29 clientes dijeron "sí" y no mandaron nada.

**Propuesta:** pedir de a una cosa, empezando por lo más fácil.
- Impermeable: primero talla y color, que se contestan con una palabra; después nombre y celular; al final la dirección.
- Intercomunicadores y radios: primero "¿a nombre de quién?" y después lo demás.

Una respuesta corta compromete al cliente, y el siguiente paso cuesta menos. También se prueba con A/B.

### 🥉 C. El bot cotiza envíos a "ciudades" que no existen

Cuando el bot pregunta la ciudad, cualquier respuesta corta se toma como municipio y se cotiza con la banda más cara
(E, $25.100). En 4 días, unos **33 de 392 chats con total (~8%)** recibieron cosas así:

> *"…envío a **Siii**"* · *"…envío gratis a **Presio**"* (el cliente escribió "precio") · *"…a **Muy caros**"* ·
> *"…a **Pagos contraentregas**"* · *"…a **Tamaño**"* · *"…a **Hay otros colorez**"* · *"…a **Maneja addi**"* ·
> *"…a **Y con casco**"* · *"…a **Cantones**"* (el cliente escribió "cansones", o sea "fastidiosos")

En esos casos la pregunta real del cliente queda sin contestar (¿precio?, ¿colores?, ¿Addi?, ¿casco?), y la respuesta
deja ver que habla con una máquina que no entiende. **67 respuestas** contestaron con el total sin tocar lo que el
cliente había preguntado.

**Propuesta:** si la ciudad no está en el tarifario **y** el texto no se parece a un municipio (no tiene mayúscula ni
departamento, o es una palabra de la lista de "no es ciudad"), **no cotizar**. Contestar lo que preguntó y repreguntar:
*"¿Me confirmás el municipio y el departamento?"* Para hacerlo bien hace falta la **lista de los 1.122 municipios del
DANE**, que no está en el repo. Hoy el bot no distingue Teorama, Saravena o Marinilla (reales) de "Siii" (porque
`bandaDe()` devuelve `null` para todos).

📌 **Dato aparte:** **36% de los chats con total** se cotizaron con la banda E por defecto. Incluye municipios grandes
como Girardot, Fusagasugá, Tuluá, Piedecuesta, Cota y Tenjo, que probablemente cuestan menos. Pero esos chats
**cierran 19%** y Bogotá (banda A) **8%**, así que el envío caro no frena la venta en esos pueblos. **No es una
prioridad para el cierre**, pero sí para no cobrar de más.

### D. "Lo pienso / la quincena / la otra semana": el bot suelta la venta

28 chats aplazaron. 9 lo dijeron por plata: *"para la otra semana, que me hacen el pago"*, *"apartarme la promoción
15 a 20 días"*. El bot contesta *"Dale, aquí quedo pendiente, me escribís"* **y no ofrece nada**. Solo en 3 casos
ofreció apartar o programar.

🔑 **Con contraentrega, "no tengo la plata hoy" casi no es una objeción:** el cliente paga cuando llega, en 2 a 4 días.

**Propuesta (necesita OK de Santiago):**
- *"Tranqui, no pagás nada hoy: lo pagás cuando te llega, en 2 a 4 días."*
- Si igual quiere esperar: *"¿Te lo dejo programado para despachar el [día]? Así te llega justo con la quincena."*
  Para eso, el bot tendría que guardar el pedido con una fecha de despacho.

### E. El seguimiento les escribe a los que ya dijeron que no, y se enojan

El toque de 2 horas le llega a quien ya contestó *"no gracias"*. Respuestas textuales:

> *"joda dije que no"* · *"ya dije q no y siguen"* · *"no sean fastidiosos"* · y otras con insultos.

**La causa está en el código:** `rechazo.evaluar()` **no detecta** *"no gracias"*, *"no estoy interesado"*, *"ya lo
compré"*, *"ya lo conseguí"* ni *"ya dije que no"*. Detecta "no me interesa", "no me escriban" y "déjenme en paz", pero no el "no gracias" de todos los días. En 4 días hubo
**42 chats (2,8%)** con una de esas frases y **solo 1** terminó comprando.

**Por qué importa más que las ventas:** cada mensaje que llega después de un "no" es candidato a un **reporte de spam**,
y la calidad del número es lo único de la operación que no se puede comprar de vuelta (0-BE).

**Propuesta:** sumar esas frases a `rechazo.js` (con pruebas, para no cortar a quien dice "no, gracias, el negro mejor").

### F. Los intercomunicadores: el 3% cree que vienen con casco

En los chats de intercomunicadores, **11% habla de cascos** y **3% cree que el casco viene incluido** (*"pensé que eran
cascos"*, *"¿incluye el casco?"*, *"me interesa cascos"*, *"foto del casco"*). De esos 38, compró 1.

La aclaración "no incluye cascos" (#238) está solo en el **cuadro final**. Llega tarde para el cierre, aunque sirve
contra la devolución.

**Propuesta:**
- Una línea en el **primer mensaje**: *"Es el intercomunicador que se instala en tu casco (el casco no viene incluido)"*.
- Revisar qué creativos muestran el casco en primer plano.

Con esto bajan las conversaciones perdidas y las devoluciones, no tanto las ventas.

### G. El bot dice dos ciudades distintas

57 veces dijo que BikerPro está en **Bogotá** y **4 veces en Medellín**. La bodega está en Bogotá. Un cliente que
pregunta *"¿de dónde son?"* está midiendo si confía. Es poco, pero es un dato inventado (como la cuenta de 0-BP).

**Propuesta:** fijar en el guion *"Estamos en Bogotá (bodega en Madelena) y despachamos a todo el país"* y que el
validador final no deje pasar otra ciudad como sede.

### H. El 44% que no contesta: probar la foto en el primer mensaje

Los que piden foto cierran 8,5% y el resto 5,0%. Puede ser que quien pide foto ya esté más interesado, así que **no
prueba nada**. Pero mandar la foto del combo junto al primer mensaje es barato y fácil de probar: A/B de una semana
contra la tasa de respuesta (hoy 55,6%).

---

## 4. El seguimiento: funciona, pero vende poco

De `/seguimiento` (acumulado):

| toque | enviados | respondieron | compraron |
|---|---|---|---|
| 2 h (texto) | 3.264 | 13,5% | **2,6%** |
| 20 h (texto) | 2.464 | 9,8% | 2,1% |
| 44 h (plantilla) | 1.580 | 12,7% | 2,6% |

**178 compras** salieron de los toques. Los tres pagan. El ajuste que más importa acá es el de la sección E:
**dejar de escribirles a los que ya dijeron que no.**

⚠️ Los mensajes del seguimiento **no se guardan en el historial del chat** (`seguimiento.js` no llama a `pushMsg`).
Por eso en el panel no se ve si a un cliente ya le escribieron, y este análisis no los puede separar de las respuestas
normales.

---

## 5. Cuánto se puede subir, sin exagerar

| cambio | esfuerzo | efecto esperado | cómo se confirma |
|---|---|---|---|
| A. cierre asumido después del total | bajo (guion) | +0,5 a +0,8 puntos | A/B una semana |
| B. pedir los datos de a uno | bajo (guion) | +0,3 a +0,6 puntos | A/B una semana |
| C. no cotizar a "Siii" | medio (código + lista DANE) | +0,2 puntos, y menos chats con cara de robot | contar los destinos raros |
| D. programar el despacho para la quincena | medio (código + OK de Santiago) | +0,1 a +0,3 puntos | contar los aplazamientos que cierran |
| E. no insistir después de un "no" | bajo (código + pruebas) | protege el número | contar las quejas |
| F. "no incluye casco" en el primer mensaje | bajo (código) | menos devoluciones | devolución de intercomunicadores |
| G. una sola sede | bajo (guion + validador) | confianza | contar menciones a Medellín |

**Meta realista: de ~5,3% a ~6,5% en 3 a 4 semanas.** Con ~600 conversaciones por día, cada punto de cierre son
**~6 pedidos/día más con el mismo gasto en Meta**. Pasar de 5,3% a 6,5% son **~7 pedidos/día**, sin tocar la pauta.

🔑 **Un cambio por vez, o no se sabe cuál funcionó.** El orden propuesto: E y G primero (protegen, sin riesgo); después
A con A/B; después B; después C, D y F.

---

## 6. ❓ Para Santiago

1. ¿Se puede **programar un despacho** para una fecha (la quincena) y que el bot lo ofrezca?
2. ¿Se puede **abrir el paquete antes de pagar** con 99 Envíos? Aparece como objeción ("si no los puedo destapar antes
   de cancelar, no me interesan").
3. ¿Se puede ofrecer un **descuento de cierre** chico ($3.000, como en 0-U) a quien lo pide? En los chats leídos, el bot lo negó (*"no puedo aplicar descuentos"*). De los 15 que pidieron rebaja, 6 compraron igual.
4. ¿Hay **catálogo**? 18 clientes lo pidieron.

*Solo lectura del bot. No se envió ningún mensaje a clientes.*
