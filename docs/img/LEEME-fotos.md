# Las fotos que manda el bot

Esta carpeta es la que publica GitHub Pages. Un archivo que esté acá queda accesible en:

```
https://mtavera99.github.io/impermeables/img/NOMBRE-DEL-ARCHIVO
```

**Esa es la URL que el bot le manda a WhatsApp.** Por eso el archivo tiene que estar en
`docs/img/` y no en otra carpeta: en septiembre las fotos apuntaban a `assets/` —que es una
carpeta del repo pero no se publica— y **todas daban 404**. El cliente pedía fotos, Meta
respondía `131053 Media upload error`, y no llegaba nada sin que nadie se enterara.

---

## Para agregar las fotos del intercomunicador V10 2X

Subí los archivos a esta carpeta **con estos nombres exactos**:

| Archivo | Para qué la usa el bot |
|---|---|
| `v10-producto.jpg` | La principal. Es la que manda cuando alguien pide "fotos" sin decir más. |
| `v10-puesto.jpg` | Cuando preguntan cómo se ve montado en el casco. |
| `v10-combo.jpg` | Cuando preguntan por el combo de dos. |
| `v10-contenido.jpg` | Cuando preguntan qué viene en la caja. |
| `v10-caja.jpg` | Cuando preguntan qué modelo es o si es original. |

### Cómo se llaman hoy en el Drive de BikerPro (carpeta `Bikerpro`)

Para no equivocarse al renombrar, éste es el mapeo de las fotos que tomó el dueño
el 29-sep:

| En el Drive se llama | Qué se ve | Renombrala a |
|---|---|---|
| `0A71E85E-B3F0-4AF1-…` | el intercomunicador solo, sobre fondo gris | `v10-producto.jpg` |
| `IMG_3423.PNG` | el casco azul y amarillo con el aparato montado | `v10-puesto.jpg` |
| `Screenshot 2026-09-29…` | las dos unidades del combo | `v10-combo.jpg` |
| `A9C0B776-5226-479B-…` | la caja abierta, con el aparato adentro | `v10-contenido.jpg` |
| `812D0989-7511-43B0-…` | la caja cerrada, se lee "HELMET WIRELESS EARPHONE V10" | `v10-caja.jpg` |

✅ **La extensión ya no importa.** Antes el bot buscaba el nombre con `.jpg` exacto, y
cuando el dueño subió las fotos llegaron como `v10-producto.jpg.PNG` —al renombrar en el
Finder, el sistema deja pegada la extensión original— así que el bot no las encontraba:
las fotos estaban en el repo y seguía diciendo "no tengo la foto a mano".

Ahora **alcanza con que el nombre empiece por el de la tabla** y sea una imagen. Todas
estas funcionan igual:

```
v10-producto.jpg      v10-producto.png      v10-producto.PNG
v10-producto.jpeg     v10-producto.webp     v10-producto.jpg.PNG
```

Lo que sí tiene que coincidir es **la parte de adelante** (`v10-producto`), porque es la
que busca el bot.

⚠️ **Y ojo con las fotos del impermeable.** En esa misma carpeta hay tomas de una persona
con chaqueta y franja reflectiva (`IMG_3267` a `IMG_3271`): **ésas son del impermeable**, no
del intercomunicador. Si alguna se subiera como `v10-*.jpg`, el bot le mandaría un
impermeable a quien pregunta por un intercomunicador — que es exactamente el error que se
corrigió el 28-sep.

**No hay que tocar código ni desplegar nada.** En cuanto el archivo está acá, el bot lo empieza
a ofrecer solo.

### Con una sola alcanza para arrancar

La única imprescindible es `v10-producto.jpg`. Las otras tres son mejoras: si no están, el bot
simplemente no las ofrece.

### Mientras no haya ninguna

El bot **no manda nada** y lo dice con palabras ("ahora mismo no tengo la foto a mano") en vez de
mandar la foto de otro producto. Eso es a propósito: mandarle un impermeable a alguien que
pregunta por un intercomunicador confunde al cliente y lo hace desconfiar de todo lo demás que
le dijimos.

---

## Requisitos de las fotos

- **Formato:** `.jpg` (los nombres de arriba terminan en `.jpg`).
- **Peso:** por debajo de 5 MB. WhatsApp rechaza las más grandes.
  Las que ya están en esta carpeta pesan entre 50 KB y 175 KB, que es el rango cómodo.
  ⚠️ Hay dos archivos viejos de 1,6 MB (`producto.png`, `modelo.png`) que son imágenes generadas
  por IA y **no se usan**: quedaron de antes y conviene no imitarlas.
- **Que sean fotos reales del producto.** En septiembre el bot mandó renders hechos con IA y el
  dueño lo vio en un chat: el cliente pidió "Fotos" y recibió un dibujo.

## Si preferís no subir archivos al repo

Cada foto se puede apuntar a cualquier URL pública con una variable de entorno en Render:

```
MEDIA_V10            → la principal
MEDIA_V10_PUESTO     → puesta en el casco
MEDIA_V10_COMBO      → el combo de dos
MEDIA_V10_CONTENIDO  → el contenido de la caja
```

Si la variable está configurada, el bot usa esa URL y no busca el archivo acá.

---

## ⚠️ El catálogo de WhatsApp es OTRO sistema

Las fotos de esta carpeta y el catálogo de Commerce Manager son **dos cosas distintas**.
Cambiar uno no cambia el otro. Ya pasó una vez: se corrigió el catálogo de Commerce Manager y el
bot siguió mandando las fotos viejas un rato más, porque nadie tocó esta carpeta.

Si cambian las fotos del producto, hay que actualizar **los dos**.

---

## 🎧 Para agregar las fotos del intercomunicador Q58 Max (15-oct)

Subí los archivos a **esta misma carpeta** (`docs/img/`) con estos nombres exactos:

| Archivo | Cuándo la manda el bot | ¿Obligatoria? |
|---|---|---|
| `q58-producto.jpg` | La principal: cuando piden "fotos" sin decir más | ⭐ **Sí, la más importante** |
| `q58-puesto.jpg` | Cuando preguntan cómo se ve montado en el casco | muy recomendada |
| `q58-combo.jpg` | Cuando preguntan por el combo de dos | muy recomendada |
| `q58-contenido.jpg` | Cuando preguntan qué viene en la caja | opcional |
| `q58-caja.jpg` | Cuando preguntan qué modelo es o si es original | opcional |
| `q58-pantalla.jpg` | Cuando preguntan por la pantalla (es una diferencia con el V10) | opcional |

### Tres cosas que importan

**1. La extensión da igual.** `.jpg`, `.jpeg`, `.png`, `.webp` — el bot busca el archivo por
el nombre base y encuentra cualquiera de esas. Lo que **no** puede cambiar es la parte de
antes del punto: tiene que ser exactamente `q58-producto`, `q58-puesto`, etc.

**2. Con subir una sola ya sirve.** Las que falten simplemente no se ofrecen. Si no está
`q58-combo.jpg`, el bot no la menciona y sigue vendiendo con texto; **no manda la del V10
en su lugar**, que sería el producto equivocado.

**3. Si no hay ninguna, el bot NO promete fotos.** El guion se lo prohíbe explícitamente:
dice la verdad ("no tengo la foto a mano acá") y sigue hacia la ciudad. Eso es a propósito
—prometer una foto que no llega deja al cliente esperando—.

### Para verificar que quedaron bien

Una vez subidas, cada archivo tiene que abrir en el navegador en esta dirección:

```
https://mtavera99.github.io/impermeables/img/q58-producto.jpg
```

Si da 404, el bot tampoco la va a poder mandar: **esa misma URL es la que le pasa a
WhatsApp**. (En septiembre todas las fotos daban 404 porque apuntaban a `assets/`, que es
una carpeta del repo pero no se publica. El cliente pedía fotos y no llegaba nada sin que
nadie se enterara.)

### Alternativa sin subir archivos

Si las fotos ya están publicadas en otro lado, se pueden poner por variable de entorno en
Render y el bot usa esa URL tal cual, sin tocar el repo:

```
MEDIA_Q58           = https://.../q58-producto.jpg
MEDIA_Q58_PUESTO    = https://.../q58-puesto.jpg
MEDIA_Q58_COMBO     = https://.../q58-combo.jpg
MEDIA_Q58_CONTENIDO = https://.../q58-contenido.jpg
MEDIA_Q58_CAJA      = https://.../q58-caja.jpg
MEDIA_Q58_PANTALLA  = https://.../q58-pantalla.jpg
```

### ✅ Estado de las fotos del Q58 (15-oct)

El dueño las subió desde el iPhone como `IMG_3842.heic` … `IMG_3847.heic`. Se renombraron y
**se convirtieron a JPG**, porque **WhatsApp no acepta HEIC**: aunque el nombre fuera
correcto, Meta habría rechazado el envío con `131053 Media upload error` y el cliente no
habría recibido nada.

| Archivo final | Era | Qué se ve |
|---|---|---|
| `q58-producto.jpg` | `IMG_3844` | el equipo solo sobre fondo blanco — la principal |
| `q58-pantalla.jpg` | `IMG_3845` | la pantalla encendida y el aro RGB iluminado |
| `q58-caja.jpg` | `IMG_3842` | la caja cerrada, se lee **Q58-Max** |
| `q58-contenido.jpg` | `IMG_3843` | la caja abierta, con el equipo y el manual |

`IMG_3846` e `IMG_3847` **no se usaron**: son casi la misma foto (el equipo sobre el manual)
y el manual está en chino, así que como foto de venta resta más de lo que suma. Quedan en el
historial de git por si se quieren recuperar.

#### 🔴 Faltan las dos que más venden

| Falta | Por qué importa |
|---|---|
| `q58-puesto.jpg` | **la más pedida.** *"¿Cómo se ve en el casco?"* es la pregunta que precede a la compra |
| `q58-combo.jpg` | el anuncio empuja el combo de dos, y no hay ninguna foto que lo muestre |

Mientras falten, el bot simplemente no las ofrece — **nunca manda las del V10 en su lugar**.

### 📻 Radios Baofeng BF-777S (23-oct)

Todavía no hay ninguna. El bot **no promete fotos** hasta que existan. En **JPG** (WhatsApp no acepta HEIC):

| Archivo | Qué tiene que mostrar |
|---|---|
| `radio-producto.jpg` | el par de radios, la principal |
| `radio-puesto.jpg` | un radio en uso, en la mano o el cinturón con el audífono |
| `radio-combo.jpg` | los combos de 4 y 6 radios |
| `radio-contenido.jpg` | lo que trae la caja: 2 radios, 2 bases, 2 audífonos, clip |
| `radio-caja.jpg` | la caja cerrada, donde se lea BF-777S |
