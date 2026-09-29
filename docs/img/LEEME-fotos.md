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

⚠️ **La extensión importa: tienen que terminar en `.jpg`.** Varias de esas fotos son
`.PNG`. Un `.png` renombrado a `.jpg` funciona igual —WhatsApp lee el contenido, no el
nombre— pero el nombre del archivo sí tiene que ser exactamente el de la tabla, porque
es el que busca el bot.

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
