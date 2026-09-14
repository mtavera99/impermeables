# Seguimiento de 72 horas — cómo prenderlo

**Qué hace:** le vuelve a escribir automáticamente a la gente que preguntó y no compró, hasta 3 veces,
**dentro de la ventana gratis de 72 horas** que abren los anuncios Click-to-WhatsApp. Es la práctica
que ya hacías a mano, pero sin que se te quede nadie.

**Cuánto cuesta:** **$0.** Ver sección 0-BC del archivo madre.

---

## Lo primero: no hay nada que "activar" en Meta

La ventana de 72 horas **se abre sola**. Cuando alguien llega de un anuncio Click-to-WhatsApp y el bot
le responde dentro de las primeras 24 horas, Meta ya te dio 72 horas de mensajes gratis para ese
cliente. **Eso ya está pasando hoy.** Lo único que falta es aprovecharla.

---

## Las dos ventanas, que no son la misma

Esto es lo que hace que el paso 1 sea fácil y los pasos 2 y 3 pidan un trámite:

| ventana | cuánto dura | qué permite |
|---|---|---|
| **de servicio** | 24h desde el último mensaje **del cliente** | mandar **texto libre** |
| **gratis del anuncio** | 72h | define si **se cobra o no** |

⚠️ **Pasadas las 24 horas, aunque sea gratis, Meta solo acepta PLANTILLAS APROBADAS.** No texto libre.

| seguimiento | cuándo | qué necesita |
|---|---|---|
| **1º** | ~20 horas después | **nada. Funciona ya.** Está dentro de las 24h |
| 2º | ~44 horas | plantilla aprobada |
| 3º | ~68 horas | plantilla aprobada |

---

## PASO 1 — Prender el primer seguimiento (5 minutos, sin trámites)

En **Render → tu servicio → Environment**, agrega:

```
SEGUIMIENTO_ACTIVO=1
```

Guarda. Render reinicia el bot solo. En los logs vas a ver:

```
Seguimiento de 72h ACTIVO ✅ revisando cada 30 min
```

**Con eso ya está funcionando el primer seguimiento.** A las ~20 horas de que alguien escribió y no
compró, le llega este mensaje:

> Hola 👋 Te escribo por el impermeable que estabas mirando.
>
> Sigue disponible y recuerda que es *contraentrega*: pagas cuando lo tienes en la mano, no antes 🏍️
>
> ¿Te lo despacho? Si quieres dime tu ciudad y te confirmo el total exacto.

*(el texto está en `bot/src/seguimiento.js`, en la constante `TEXTO_1`, por si lo quieres cambiar)*

### Para revisar que está funcionando

Abre en el navegador:

| URL | qué muestra |
|---|---|
| `tu-bot.onrender.com/seguimiento` | cuántos están esperando cada paso, sin mandar nada |
| `tu-bot.onrender.com/seguimiento/correr` | dispara una pasada **ya**, sin esperar los 30 minutos |

El primero te dice, por ejemplo, cuántos ya compraron, cuántos están en pausa, y **cuántos se te
vencieron sin recibir ni un seguimiento** (`sinSeguimientoYVencidos`) — ese número es la plata que se
está yendo.

---

## PASO 2 — Los seguimientos 2 y 3 (piden plantilla aprobada)

1. Entra a **business.facebook.com** → **WhatsApp Manager** → **Plantillas de mensajes** →
   **Crear plantilla**
2. Categoría: **Marketing**. Idioma: **Español**
3. Crea dos, con nombres sencillos y sin espacios. Por ejemplo:

**`bikerpro_seg2`** (segundo día):
```
Hola 👋 Todavía tengo disponible el impermeable que preguntaste.
Es contraentrega: pagas al recibirlo. Si llevas dos van en el mismo
paquete y pagas un solo envío 💡
¿Te lo despacho?
```

**`bikerpro_seg3`** (tercer día, el último):
```
Hola 👋 Última vez que te escribo por el impermeable, para no molestarte más.
Sigue disponible y contraentrega. Si te sirve más adelante, aquí estoy 🏍️
```

4. Cuando Meta las apruebe (suele ser rápido), agrega en Render:

```
SEGUIMIENTO_PLANTILLA_2=bikerpro_seg2
SEGUIMIENTO_PLANTILLA_3=bikerpro_seg3
```

⚠️ **Mientras no estén configuradas, los seguimientos 2 y 3 se saltan solos** y lo dicen en los logs.
No falla nada.

---

## A quién NUNCA le escribe

El bot se salta automáticamente a:

| caso | por qué |
|---|---|
| ya hizo pedido | no tiene sentido |
| dijo que no le escriban | *(detecta "no me escriba", "no molest", "ya no me interesa"…)* y se respeta **para siempre** |
| un humano tomó el chat | no le pisa la conversación |
| ya recibió 3 seguimientos | no se insiste más |
| pasaron más de 72 horas | se cerró la ventana gratis |
| volvió a escribir | el contador se reinicia: ya no es lead frío, está conversando |

---

## ⚠️ Una limitación que hay que saber

El bot guarda el estado en archivos dentro del servidor. **En el plan gratis de Render, el disco se
borra cada vez que el servicio reinicia**, y con él se pierde quién ya recibió seguimiento.

Consecuencia: después de un reinicio, alguien podría recibir un seguimiento repetido, o quedarse sin
recibirlo.

**Para arreglarlo de raíz hace falta una base de datos** (Render tiene Postgres gratis) o un disco
persistente. **No es urgente para arrancar, pero sí antes de dejarlo corriendo solo por semanas.**

---

## Cómo saber si sirvió

A los 7 días, comparar:

| | |
|---|---|
| pedidos por día **antes** de prenderlo | *(el promedio de la semana pasada)* |
| pedidos por día **después** | |
| **conversaciones nuevas** en los dos períodos | para descartar que sea más pauta y no el seguimiento |

Si los pedidos suben **sin que suban las conversaciones**, fue el seguimiento. Esas ventas tienen
**CPA $0**.
