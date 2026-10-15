# 🎧 Intercomunicador Q58 Max — ficha para aprobar y plan

**Fecha:** 15-oct · **Estado:** 🟡 investigación lista, **pendiente tu aprobación**. Todavía no toqué código.

---

## 1. 🔴 Lo urgente: el riesgo que cuesta $30.000 por venta

Hoy el bot tiene **una sola señal** para detectar intercomunicadores: la palabra `interc...`. Y esa señal apunta **siempre al V10**.

Peor: la señal del mensaje **le gana al anuncio**. Entonces, si el lead entra por el anuncio del Q58 y escribe el texto prellenado típico —*"Hola, quiero más información de la promoción de intercomunicadores"*— el bot:

1. detecta "intercomunicadores" → lo marca como **V10**
2. **congela** ese producto en la conversación
3. y le cotiza **$99.900** en vez de **$129.900**

**$30.000 menos por venta**, y encima despacharías el producto equivocado.

### La solución, y por eso te pregunto ahora

El bot ya sabe enrutar por **ID de anuncio** (variable `ANUNCIOS_V10`). Si los anuncios del Q58 son nuevos y me pasás sus IDs, el enrutamiento queda exacto desde el primer mensaje: anuncio Q58 → producto Q58, sin depender de lo que escriba el cliente.

**Necesito los IDs de los anuncios del Q58 cuando los tengas.** Van en una variable `ANUNCIOS_Q58` en Render, no en el código.

---

## 2. 💰 Los números con tus datos

Usando tus cifras (combo $129.900 · unidad $80.000 · costo $45.000/u) y la **misma tabla de envíos del V10**:

### Lo que paga el cliente

| Banda | Envío | **Combo x2** | **Unidad** |
|---|---|---|---|
| A · Bogotá y sabana | 13.100 | **$143.000** | $93.100 |
| B · Boyacá, Casanare | 18.100 | **$148.000** | $98.100 |
| C · Cali, Medellín, capitales | 22.100 | **$152.000** | $102.100 |
| D · intermedias | 23.100 | **$153.000** | $103.100 |
| E · pueblos (por defecto) | 25.100 | **$155.000** | $105.100 |

### Lo que te queda (ya descontando producto y flete real)

| Banda | Combo x2 | Unidad | diferencia |
|---|---|---|---|
| A | $38.094 | $33.194 | +$4.900 |
| C | $36.945 | $32.045 | +$4.900 |
| E | $36.303 | $31.403 | +$4.900 |

*(falta restar el CPA, que todavía no conocés porque la campaña no arrancó)*

### 🔑 Dos cosas que saltan de esta cuenta

**1. El combo te deja solo $4.900 más que vender una sola.**

Con costo de $45.000, el combo a $129.900 implica un descuento del **19%** (dos unidades sueltas serían $160.000). Tu margen por unidad cae de $35.000 a $19.950.

Vender **una sola unidad a $80.000 te deja $32.045** en Cali. El combo te deja $36.945. Casi lo mismo, pero con **el doble de inventario y el doble de plata inmovilizada**.

Comparalo con el V10, donde el combo sí marca diferencia (+$8.000 sobre la unidad).

**Esto no significa que el combo esté mal** — sirve para subir el ticket y para que el anuncio tenga gancho. Pero vale que lo sepas: si el combo no levanta la conversión bastante, la unidad suelta es un negocio parecido con menos riesgo. Y si querés más aire, el combo a **$139.900** te dejaría ~$47.000 sin dejar de verse como oferta.

**2. Te sugiero la unidad a $79.900 en vez de $80.000.**

Son $100 de diferencia y los totales quedan redondos, igual que con el V10:

| | con $80.000 | con $79.900 |
|---|---|---|
| Bogotá | $93.100 | **$93.000** |
| Cali | $102.100 | **$102.000** |
| pueblos | $105.100 | **$105.000** |

Tu producto principal ya funciona así ($59.900 + envío = totales redondos). Un total redondo se dice y se recuerda mejor en WhatsApp.

**Vos decidís**: con cualquiera de los dos lo dejo andando.

---

## 3. 📋 Ficha técnica — para que apruebes dato por dato

> ⚠️ **Esto todavía NO está en el bot, y es a propósito.**
>
> La regla de este repo es que el bot **solo afirma lo que vos confirmás**, porque una especificación inventada vuelve como devolución. Lo que sigue salió de **vendedores y del fabricante**, no de tu proveedor. Necesito que lo revises y me digas qué entra.
>
> *Contenido reformulado por restricciones de licencia de las fuentes.*

### ✅ Coinciden en varias fuentes independientes — mi recomendación: aprobar

| Dato | Lo que dicen | Fuentes |
|---|---|---|
| **Bluetooth** | 5.3 | [Extreme Freedom](https://ex-freedom.com/es/products/q58-max) |
| **Batería** | 1.000 mAh, hasta ~25 h de uso, carga ~2 h, Type-C | [Amazon](https://www.amazon.com/Docooler-Cancellation-Capabilities-Personalized-Communication/dp/B0CZLLDYWH) · [Walmart](https://business.walmart.com/ip/Uteam-Max-Q58-Wireless-Motorcycle-Intercom-Headset-with-Noise-Cancellation-for-Dual-Riders-500M-Range/5517964705) |
| **Intercom casco a casco** | 2 personas, ~500 m | [Amazon](https://www.amazon.com/Docooler-Cancellation-Capabilities-Personalized-Communication/dp/B0CZLLDYWH) · [AliExpress](https://it.aliexpress.com/s/video-ssr/detail/5000284440498) |
| **Cancelación de ruido** | CVC + doble DSP | [Amazon](https://www.amazon.com/Docooler-Cancellation-Capabilities-Personalized-Communication/dp/B0CZLLDYWH) |
| **Ecualizador** | 6 efectos de sonido | [Amazon](https://www.amazon.com/Docooler-Cancellation-Capabilities-Personalized-Communication/dp/B0CZLLDYWH) |
| **Radio FM** | sí | [Extreme Freedom](https://ex-freedom.com/es/products/q58-max) · [BYTESTORE](https://www.bytestorehn.com/products/intercomunicador-q58-max) |
| **Micro SD** | música independiente del celular · **tarjeta no incluida** | [Extreme Freedom](https://ex-freedom.com/es/products/q58-max) |
| **Pantalla** | LCD / display digital | [BYTESTORE](https://www.bytestorehn.com/products/intercomunicador-q58-max) · [megahobbies](https://www.megahobbies.co/productos/intercomunicador-para-casco-de-motocicleta-q58-max-bxnco/) |
| **Luz LED** | integrada | [Extreme Freedom](https://ex-freedom.com/es/products/q58-max) · [Daiscom](https://www.daiscom.com.co/inicio/81153-intercomunicador-bluetooth-q58-max-moto-auricular-casco-radio-782062293490.html) |
| **Compartir música** | sí (reportan ~12 h) | [Made-in-China](https://fr.made-in-china.com/video-channel/kelly19951009_ltipBHDGuIUJ_Q58-Max-Motorcycle-Helmet-Intercom-with-Music-Player-Speaker-Custom-Logo-Helmet-Bluetooth-Intercom-Headset-for-Motorcycle.html) |
| **Modo dual** | atiende llamadas mientras usás el intercom | [Amazon](https://www.amazon.com/Docooler-Cancellation-Capabilities-Personalized-Communication/dp/B0CZLLDYWH) · [TuCarro](https://articulo.tucarro.com.co/MCO-1480761207-intercomunicador-q58-max-bluetooth-radio-fm-_JM) |

**Ventaja de venta real frente al V10:** radio FM, micro SD, pantalla y luz LED. El V10 no los tiene. Eso justifica los $30.000 de diferencia en el combo.

### 🔴 NO los pondría sin que los confirmes vos

| Dato | El problema |
|---|---|
| **Alcance** | Hay conflicto: Amazon/Walmart/AliExpress dicen **500 m**; vendedores locales dicen **1.000 m**. El V10 lo dice como *"aproximadamente 300 a 500 metros"* y eso te ha funcionado. **Propongo lo mismo** y nunca "garantizados". |
| **Resistencia al agua** | Todos dicen "waterproof" pero **ninguno da certificación IP**. El V10 dice IPX6 porque vos lo confirmaste. Acá no hay número. **Propongo**: "resistente a lluvia y salpicaduras, no sumergible", sin mencionar IP. |
| **iPhone** | ⚠️ Un vendedor ([smartjoys](https://smartjoys.co/producto/intercomunicador-para-casco-de-moto-q58-max/)) dice que el comportamiento **cambia según el sistema operativo**, y que en Android las llamadas funcionan sin problema — sugiriendo límites en iPhone. **No pude confirmar el detalle.** Esto es importante: si el bot promete que funciona igual en iPhone y no, es devolución. **Probalo con un iPhone antes de prender la campaña.** |
| **Garantía** | Es tu política, no del producto. El V10 tiene **1 mes por defectos**. ¿El Q58 igual? |
| **Standby** | Nadie lo reporta. Lo dejaría sin confirmar. |

---

## 4. 🛠️ Lo que hay que hacer en el código

El catálogo **fue diseñado para esto** — el comentario dice textual: *"Un producto nuevo mañana declara el suyo y no toca nada de lo anterior"*. El motor de precios y la red anti-cruce de precios **ya son multi-producto**.

**Pero hay 12 lugares donde el código pregunta "¿es V10?" en vez de "¿qué necesita este producto?".** Si no se arreglan, el Q58 hereda el guion del impermeable: tallas, colores, $59.900 y la escalera de descuentos.

| # | Dónde | Qué pasaría sin arreglarlo |
|---|---|---|
| 1 | detección (`catalogo.js`) | **todo el tráfico Q58 se vende como V10** |
| 2 | guion (`prompt.js`) | recibe el guion del impermeable, con tallas y colores |
| 3 | bloque de precio (`cotizacion.js`) | **le dice $59.900 / $110.000 en una charla de Q58** |
| 4 | cantidad (`agent.js`) | cuenta unidades leyendo tallas, y pierde el default "combo de 2" |
| 5 | fotos (`agent.js`, `media.js`) | **le manda la foto del impermeable** |
| 6 | primer mensaje | folleto equivocado |
| 7 | seguimiento | **le manda la plantilla de impermeables** a un lead de Q58 |
| 8 | panel | sale del mismo color que el V10, no se distinguen |
| 9 | CPA por producto | clasifica el Q58 como V10 y **contamina el CPA de los dos** |
| 10-12 | defaults a V10 en 3 puntos | si la ficha no resuelve, imprime precios del V10 |

**Lo que NO se toca:** `fletes.js` (ni una línea), el motor de precios, y la validación que ya bloquea cruces de precio. El impermeable y el V10 quedan intactos — y hay 6 baterías de pruebas que lo verifican.

---

## 5. ❓ Lo que necesito de vos para dejarlo andando

| # | Pregunta | Para qué |
|---|---|---|
| 1 | **¿El V10 se sigue vendiendo, o el Q58 lo reemplaza?** | Si lo reemplaza, esto es mucho más simple y sin riesgo de cruce |
| 2 | **IDs de los anuncios del Q58** (cuando los tengas) | Enrutamiento exacto desde el primer mensaje. Es el arreglo del riesgo nº1 |
| 3 | **¿Qué datos de la ficha apruebo?** (sección 3) | El bot solo afirma lo confirmado |
| 4 | **¿Garantía?** ¿1 mes como el V10? | Es la pregunta más frecuente |
| 5 | **¿Tenés fotos del Q58?** | Sin fotos, el bot tiene prohibido prometerlas (y no puede mandar las del impermeable) |
| 6 | **¿Plantilla de WhatsApp aprobada para seguimiento?** | Si no, un lead de Q58 recibe la plantilla de impermeables |
| 7 | **¿Unidad a $79.900 o $80.000?** | Totales redondos (sección 2) |
| 8 | **¿Probaste con iPhone?** | El punto de devolución más probable |

---

**Con las respuestas 1, 3, 4 y 7 ya puedo dejarlo vendiendo.** Las demás (anuncios, fotos, plantilla) se pueden agregar después sin tocar nada de lo que ya funcione.
