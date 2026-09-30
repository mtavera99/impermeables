# 🔄 Traspaso de sesión — 29 de septiembre de 2026

Todo lo de esta sesión está **fusionado en `main`**. Se verificó commit por commit contra
`origin/main`: no quedó nada afuera. PRs de la sesión: **#184, #185, #186, #187**.

---

## 🔴 LO PRIMERO: tres cosas pendientes del dueño

### 1. ⚠️ Las variables de Render — SIN CONFIRMAR que se hayan puesto

El dueño pidió mover los avisos del bot a su celular personal. El código ya lo soporta,
**pero las variables de entorno las tiene que cambiar él en Render** y no confirmó haberlo
hecho. En Render → el servicio → **Environment**:

```
OWNER_WHATSAPP=<el celular personal del dueño>
TELEFONO_REMITENTE=<el nº de BikerPro impreso en las guías>,<el personal>
```

**Los dos valores son necesarios.** `TELEFONO_REMITENTE` es nueva y si falta pasan dos
cosas malas, las dos medidas y con prueba puesta:

1. el teléfono propio entra como si fuera del **destinatario** (vale 50 puntos en el pareo
   de guías, suficiente para pasar el mínimo);
2. con el `57` adelante son 12 dígitos — los mismos que una guía de Interrapidísimo — así
   que en una etiqueta sin el rótulo "Guía No" **se lo lleva como número de guía**. Medido:
   la guía sale `573001112233` en vez de `240061604892`. Al cliente le llegaría un número
   que no existe.

> 🔐 El número real **no está escrito en ningún archivo del repo, a propósito**: el repo es
> público. Vive solo en las variables de Render. Los ejemplos de la documentación usan
> números inventados.

### 2. 🧠 La investigación de memoria está a mitad de camino

Render mandó *"exceeded its memory limit"*. La parte encontrada ya está arreglada, pero
**falta el dato que cierra el diagnóstico**. Ver la sección "🧠 Memoria" más abajo: es el
tema más importante que queda abierto.

### 3. Dos preguntas que el dueño no contestó

- **¿Proteger los avisos al dueño con plantilla cuando la ventana de 24h está cerrada?**
  Hay 2 avisos que salen como texto libre (`server.js`: `avisarSinAtribuir` y el handoff
  "🙋 El cliente pidió hablar con un asesor"). Con la ventana cerrada Meta los rechaza
  (131047) o —peor— los acepta y no los entrega. El cierre diario **sí** está protegido y
  sirve de modelo. El dueño dijo que él le responde al bot para mantener la ventana abierta;
  eso reduce el riesgo pero no lo elimina: el primer aviso después de un día callado se
  pierde igual, y es circular (no puede responder a lo que no le llegó).
- **¿En un caso de posventa el bot debe callarse?** Hoy se marca el caso y se avisa, pero el
  bot sigue activo y el chat NO se pausa. Se dejó así a propósito: cambiarle la respuesta a
  un cliente con un reclamo en curso es decisión del dueño.

---

## 🧠 MEMORIA — el tema abierto más importante

### Lo que se encontró y ya está arreglado (#186)

No era una fuga clásica: los acumuladores están todos acotados (`EVENTOS` tope 60, el mapa
de duplicados se purga, el caché de media es del tamaño del catálogo). Era el **PDF de
guías**, tres cosas:

1. **`procesarPDF` cargaba el PDF dos veces a la vez.** Hacía
   `Promise.all([lineasPorPagina, partirHojas])` y las dos cargan el PDF entero, así que los
   dos árboles de pdf-lib vivían simultáneamente. **Y no se ganaba nada**: Node es de un solo
   hilo y esto es CPU, no red — `Promise.all` no lo hacía más rápido, solo duplicaba el pico.
   Ahora es secuencial.
2. **Cada hoja del plan es un PDF completo de una página**, y el plan las guarda todas
   mientras el dueño revisa. Medido: 40 hojas de 300 KB = **11,7 MB**; tres PDFs sin terminar
   = **30,8 MB** retenidos.
3. **Lo que lo volvía una fuga de hecho:** el TTL se mide desde `creado`, y cuando una guía
   falla el código **refresca `creado`** para poder reintentar sin subir el PDF de nuevo —
   cada reintento regalaba otras 2 horas. Y el barrido **solo corría al subir un PDF nuevo**.
   Un plan con una guía que falló y no se terminó de reintentar se quedaba con todas sus
   hojas hasta el próximo PDF, que puede ser al otro día.

   Ahora hay `nacio` (no se refresca nunca, techo de 6 h) y un barrido cada 10 minutos que
   corre solo. **Dentro de las 6 horas el reintento sigue funcionando igual** — hay prueba.

### 🔴 Lo que falta: los 467 MB sin explicar

Primera lectura de `/health?token=...` en producción, con `855709f` desplegado:

```
proceso:        467 MB          heap usado:   34 MB
buffers:          5 MB          hojas PDF:     0 MB (0 hojas, 0 planes)
conversaciones: 5.535 KB (5,4 MB) · 2.019 conversaciones · aviso: null
arrancado hace:  80 segundos    arranques: 71
```

**467 MB de proceso contra 39 MB de uso real, 80 segundos después de arrancar, sin haber
hecho nada.** Render mata el proceso a los 512 MB: está al **91% estando quieto**. Los 71
arranques son eso.

**Descartado:** el archivo de conversaciones (5,4 MB es chico, `aviso: null`) y las hojas de
PDF retenidas (0). **No hay que archivar conversaciones ni cambiar la persistencia.**

### La sospecha principal (sin confirmar)

Node no sabe que corre en un contenedor. **Sin la bandera `--max-old-space-size`, V8 calcula
su techo a partir de la RAM de la MÁQUINA, no del límite del servicio.** Medido en una
máquina de 31 GB: **V8 se pone un techo de 4.144 MB él solo.**

Si en Render pasa lo mismo, V8 cree que tiene gigabytes, **no siente ninguna presión para
liberar**, deja crecer el heap tranquilo, y Render lo mata a los 512 MB.

**Si se confirma, el arreglo es una línea en el comando de arranque. Sin tocar código y sin
pagar más instancia.**

### El siguiente paso, concreto

`#187` agregó lo que faltaba en `/health?token=...`: `heap_reservado_mb` (heapTotal),
**`heap_techo_mb`** (`v8.getHeapStatistics().heap_size_limit`), `array_buffers_mb`, y un
**seguidor del pico** (máximo con su hora + cuánto usaba recién arrancado, muestreo cada 30 s).

**Pedirle al dueño dos lecturas: una antes y una después de subir un PDF de guías.** Con eso
se separan las dos causas posibles:

| Lo que muestre | Qué significa | Arreglo |
|---|---|---|
| `al_arrancar_mb` ya alto (~467) y no se mueve | es cómo V8 se dimensiona | bandera `--max-old-space-size`, sin tocar código |
| arrancó bajo (~55) y el pico saltó con el PDF | se infla procesando y no devuelve páginas | otra cosa: liberar las hojas a disco |

Y **preguntarle el plan de Render** (Starter / Standard). Sin saber el tamaño real de la
instancia, elegir el tope de V8 es adivinar: **si queda corto, un PDF de 40 guías revienta**,
y eso es peor que un reinicio ocasional. Por eso la bandera **no se tocó todavía**.

---

## ✅ Lo que se resolvió en esta sesión

### #184 — El panel de novedades escondía el motivo de cada fallo

El dueño reportó *"Enviados 0 de 5. 5 fallaron."* y **nada más en la pantalla**.

**El servidor SIEMPRE mandó el motivo de cada una.** `/novedades/enviar` responde un
resultado por novedad, y cada fallo trae su motivo ya escrito y accionable. El JavaScript del
panel leía `enviados`/`intentados`/`fallaron` y **tiraba la lista entera a la basura**.

🔑 Esto importa porque **de los motivos posibles, cuatro los decide nuestro código ANTES de
llamar a Meta** (falta la oficina y el plazo / no se encontró a quién corresponde la guía /
ese tipo de novedad no tiene plantilla / el cliente rechazó el pedido). Un "5 fallaron" puede
ser Meta rechazando los mensajes **o** cinco filas que nunca se intentaron mandar: se
arreglan de formas opuestas. Y las traducciones de errores de Meta del día anterior **eran
invisibles en esa pantalla**.

⚠️ **Error propio a no repetir:** le pedí al dueño la columna "Estado" de la tabla de
resultados. **Esa columna no existía.** La confundí con la del panel de guías, que sí muestra
motivos. Antes de pedirle un dato, verificar en el código que la pantalla lo muestre.

También: **error 130497 traducido** (apareció contra un número que empezaba por 55 — Brasil;
es un celular mal cargado, no una sanción de la cuenta, que es lo que sugiere el texto de Meta).

### #184 — El número del dueño sin el 57 apagaba todos los avisos

`sendText(OWNER, ...)` le pasaba a Meta el valor de `OWNER_WHATSAPP` **tal cual**, sin
normalizar. Escrito con 10 dígitos (como lo escribiría cualquiera) **Meta no entrega nada** y
todos los avisos se habrían perdido **en silencio**: el bot sigue atendiendo, los pedidos se
siguen guardando, nada en pantalla cambia.

Nuevo módulo `bot/src/numero-del-dueno.js` con `numeroDelDueno()`. Acepta `3001112233`,
`573001112233`, `+57 300 111 2233`, con espacios o guiones. **No le inventa indicativo a un
número que no reconoce** — un número de otro país con un `57` pegado adelante es *otro*
número que sí existe, y ahí se le mandarían los datos de un cliente a un desconocido. En ese
caso avisa en el log al arrancar.

> Va en su propio módulo para poder probarlo **sin levantar el servidor**: una función metida
> en `server.js` arrastra express y no se puede probar sola, y ésta es justo la que no puede
> fallar en silencio. `bot/test-numero-del-dueno.js`, 26 aserciones.

### #185 — Categoría de posventa (garantía, cambio, algo que llegó mal)

Pedido del dueño: *"cuando un cliente escriba para cambios, garantías, o que ya compró y
necesita algún tipo de soporte o ayuda, ponle una nueva categoría o color para diferenciarlo"*.

🔴 **Y hacía falta más que un color: esos chats DESAPARECÍAN del panel.** `atencion.evaluar()`
tiene `if (c.compro && puntos < 60) return { nivel: null, ... }`. La idea era sana, pero *"me
llegó la talla equivocada"* no matchea ninguna señal que dé puntos: suma 25 y se va a cero. Y
si el bot ya le contestó, suma **0** y no aparece nunca. **El caso más caro que existe —
cliente con el producto en la mano y un problema — era justo el que el panel tapaba.**

- `posventa.js`: `necesitaSoporte()`. Las señales fuertes (llegó roto, no funciona, se rompió,
  me queda grande, usar la garantía, cambiar el producto) valen **sin depender de `c.compro`**,
  porque ese flag solo se prende si el pedido pasó por el bot y hay ventas tomadas a mano.
  Las ambiguas ("garantía" a secas, "ayuda") solo cuentan si ya compró.
- `atencion.js`: suma 100 puntos y devuelve `posventa` **separado de `nivel`**. Un nivel nuevo
  no habría entrado en las listas del panel (que se arman con `nivel === "alta"` y
  `=== "media"`) y el chat se habría caído de la pantalla.
- `panel.js`: borde violeta **más grueso** (en un celular al sol el color solo no alcanza),
  etiqueta `🛟 posventa`, y atajo `🛟 Posventa (N)` arriba. De paso quedaron definidas
  `.tag.alta` y `.tag.media`, **que se usaban desde siempre sin existir en el CSS**.
- `store.js`: `fijarCategoria()`, clonada de `fijarProductoActivo`. Se persiste porque
  `messages` se rota: sin eso el caso se borraría del panel con el problema abierto.
- Aviso al dueño al momento.

**76 aserciones, y 27 son falsos positivos que NO pueden entrar** — *"¿tiene garantía el
impermeable?"* de alguien que averigua, *"no me funciona el link"*, *"se me descargó la
batería del celular"*. Una categoría que se prende con cualquier cosa hace que el dueño deje
de mirarla.

### #186 / #187 — Memoria (ver la sección de arriba)

---

## 🔧 Baterías nuevas de esta sesión

| Archivo | Aserciones | Qué protege |
|---|---|---|
| `bot/test-posventa-soporte.js` | 76 | las señales de posventa y sobre todo los falsos positivos |
| `bot/test-numero-del-dueno.js` | 26 | el número del dueño escrito de cualquier forma |
| `bot/test-remitente-de-las-guias.js` | 26 | que el teléfono propio no pase por el del cliente ni por la guía |
| `bot/test-memoria-de-los-planes.js` | 18 | el vencimiento de los planes y el seguidor del pico |
| `bot/test-javascript-de-los-paneles.js` | 45 (era 30) | el motivo de cada novedad fallida se ve en pantalla |

Estado en CI: **45 baterías · 0 fallan · 3.210 aserciones.**

---

## 📌 Reglas de trabajo que salieron de esta sesión

### Un PR se anuncia UNA vez, y ya completo

Está escrito en `.kiro/steering/como-no-perder-commits.md`. **Seis veces** pasó lo mismo
(#175, #176, #179, #183, #185): se abre un PR, se le siguen agregando commits, y el dueño lo
fusiona en el medio. Lo que llegó después queda afuera de `main` y **nadie se entera**, porque
el PR aparece fusionado y verde.

**La causa no es que el dueño fusione mal.** Un PR abierto al que se le siguen agregando
commits es una **carrera**: él ve el PR listo y lo fusiona, con razón, mientras del otro lado
todavía se está subiendo algo. Opera del celular y fusiona cuando puede; el flujo tiene que
aguantar eso.

Lo que cambia: **el trabajo que aparece después de anunciar un PR va en un PR NUEVO desde
`main`**, aunque sea del mismo tema. Más comprobar el estado del PR antes de cada push, y
verificar los sha contra `origin/main` después de fusionar.

### Verificar antes de pedirle un dato

Le pedí una columna que no existía. Si se le va a pedir al dueño que mire algo en una
pantalla, confirmar primero en el código que esa pantalla lo muestre.

---

## 🧨 Trampas del repo (cuestan horas si se olvidan)

- **Los paneles son template literals.** Un backtick dentro de un comentario de CSS o de JS
  **rompe el archivo entero**. Pasó dos veces en esta sesión (`` `.tag` `` y
  `` `resultados[].error` ``). Escribir los comentarios sin backticks.
- **`\b` de JavaScript es ASCII.** Con acentos falla. `posventa.js` normaliza con `plano()`
  (NFD sin tildes), así que las regex se escriben **sin tildes**: `danad`, no `dañad`.
- **Un `\b` al final de un PREFIJO no casa nada.** `\bdanad\b` no matchea "danado". Costó
  cuatro casos: *"el pedido llegó dañado"* —el reclamo más común— no se detectaba.
- **`gh pr create` NO funciona** en este entorno (es GraphQL). Usar
  `gh api repos/.../pulls -f title=... -f head=... -f base=main -F body=@archivo`.
- Merge: `gh api -X PUT .../merge -f merge_method=merge` **sin** `-f sha=` (con sha da 422).
- **Un `workflow_dispatch` solo se lanza desde `main`**, no desde una rama.
- `conf.estado` es `"confirmado"`, no `"si"`.
- **El repo es PÚBLICO.** Nunca escribir teléfonos reales, tokens, ni datos de clientes en
  archivos. `/health` es pública (Render la usa para el chequeo de vida): el detalle de
  memoria y tamaños va detrás de `?token=`, porque es volumen de negocio.

---

## 🖥️ El entorno de trabajo (sandbox)

Repetir en cada comando:

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"; unset NODE_OPTIONS; export TZ=America/Bogota
```

- **Sin internet** (`INTEGRATIONS_ONLY`): solo `git` y `gh`. No se puede instalar nada ni
  bajar un archivo de un link. Si el dueño manda un link de Drive, **no sirve**: tiene que
  adjuntar los archivos al chat.
- `/tmp` se borra entre comandos: descargar y leer en **un solo** comando.
- **`bot/node_modules` está vacío** (los directorios existen pero sin contenido). Hay stubs
  locales gitignored de `pdf-lib` y `dotenv` para que carguen los módulos.
- **Estado local sano: 42 baterías pasan · 0 fallan · 3 no arrancan.** Las 3 que no arrancan
  son del sandbox, no fallos: `test-botones-y-plantillas.js` y `test-clientes-con-username.js`
  necesitan `express`, y `test-guias.js` necesita el `pdf-lib` real. **CI sí las corre.**
- Borrar `bot/data-prueba-username` después de correr la suite.
- ⚠️ **No lanzar nada que vuelque `fallosDeEntrega` ni conversaciones al repo**: tienen
  teléfonos y direcciones de clientes reales.
- ⚠️ Los comandos y las escrituras de archivo del mismo turno **pueden correr en paralelo**:
  si un comando lee un archivo que se acaba de escribir, ponerlos en turnos separados.

---

## 📦 Contexto del producto (para no re-preguntar)

**Dos productos, dos motores de precio, y no se unifican.** El impermeable va por
`fletes.cotizar` (el precio del producto viene **fusionado con el flete** en
`BANDAS[x].total`); el V10 va por `producto_mas_envio`. Unificarlos era la forma más fácil de
romper el negocio que funciona.

**Intercomunicador V10 2X** — costo $35.000/u. Precios: **1 ud $59.900**, **combo x2
$99.900**, los dos **+ envío**. NO 2x1, NO envío gratis. 3+ unidades **no se cotizan**
(`cantidad_sin_precio`: informa los precios conocidos y escala).

Envío del V10 = `BANDAS[b].total − PRECIO_PRODUCTO`, **igual para 1 y 2 unidades**
(`politicaDeEnvio: {tipo:"paquete_unico", hastaUnidades:2, provisional:true}`). ⛔ **Prohibido
usar `ENVIO_REAL_2`** (está medido para dos impermeables voluminosos: la banda E daría
$145.114 en vez de $125.000). Hay un candado con prueba que falla si alguien pone
`provisional` en `false`, porque todavía no hay guías despachadas del V10 y no se puede
afirmar conocer su costo real de transportadora.

**Ficha técnica autorizada:** Bluetooth 5.3 · alcance 300-500 m (*no* decir "500 metros
garantizados") · batería 1.500 mAh · 32 h de uso · 720 h en espera · carga 2,5 h · USB Type-C
· IPX6 (**NO** decir que se puede sumergir, **NO** convertirlo en garantía contra cualquier
daño por agua) · reducción de ruido · Android/iPhone · cascos integral, modular, abierto,
cross y jet · **garantía 30 días**. Si preguntan por IP67 se responde con **IPX6**, que es la
certificación real.

**Prioridad para decidir el producto de una conversación:** turno del cliente >
`conv.productoActivo` persistido > referral del anuncio > heurística del hilo > default. El
producto **se persiste solo con señal fuerte** (cliente explícito o anuncio), nunca con
heurística: un error quedaría congelado. Y **"combo" no es señal de producto** — el
impermeable también tiene combo de 2.

**Pendiente del dueño:** no tiene foto real del combo de dos del V10 (la actual es un
screenshot). Si la toma, reemplazar `docs/img/v10-combo.png`. Ojo: Meta rechaza imágenes de
más de 5 MB, y hay un compresor en `analisis/aligerar-png.py` (Python puro con `zlib`, porque
no hay ImageMagick ni Pillow ni sharp).

---

## 🎯 Lo que sigue, en orden

1. **Confirmar con el dueño que puso `OWNER_WHATSAPP` y `TELEFONO_REMITENTE` en Render.**
   Sin `TELEFONO_REMITENTE` el pareo de guías se ensucia.
2. **Cerrar la memoria:** pedirle dos lecturas de `/health?token=...` (una antes y una después
   de subir un PDF de guías) y el plan de Render. Con `heap_techo_mb` y `al_arrancar_mb` se
   decide entre la bandera de V8 y bajar las hojas a disco. **No pagar el upgrade antes de
   tener ese dato.**
3. **Que suba un PDF de guías** para confirmar que el cambio de `procesarPDF` (secuencial en
   vez de `Promise.all`) no rompió nada. No se pudo probar en el sandbox, solo en CI.
4. **Sus dos decisiones:** plantilla para los avisos con la ventana cerrada, y si el bot debe
   callarse en un caso de posventa.
5. Cuando entre el primer caso de posventa real, verificar con él que la categoría acierta y
   que no le está marcando cosas que no son.
