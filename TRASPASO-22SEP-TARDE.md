# 🔄 Traspaso — 22 de septiembre, tarde y noche

> Continúa `TRASPASO-SESION-22SEP.md`, que cubre la mañana. Acá va de las 13:00 en
> adelante. **Todo el código está mergeado y desplegado. Nada pendiente de mergear.**

---

## 🔴 Lo primero de mañana, en orden

| # | qué | por qué |
|---|---|---|
| 1 | 🟠 **Recargar ~$57.400** en Meta Ads, **de día** | Saldo $83.326 (lectura 16:26). Recargar de noche dispara el rebote de 0-AI |
| 2 | 🔴 **Rotar el `PANEL_TOKEN`** | El valor quedó escrito en el chat de hoy. Render → Environment → valor nuevo. **No hay que tocar nada de Meta** |
| 3 | 📦 **Generar las guías de los 4 pedidos de hoy y subir ese PDF** | Es la única prueba que falta del módulo de guías (ver abajo) |
| 4 | 🔴 **Llamar al operador por el 313 861 5813** | Línea caída. Es a la vez el WhatsApp de ventas, la verificación de Meta y el `OWNER_WHATSAPP` |
| 5 | 👀 **Mirar el embudo del panel** | Dice si la fuga está en el anuncio, en el precio o en el cierre |

---

## 🟢 El estado real del bot

| | |
|---|---|
| Número | **+57 322 7545695** ("Biker") · CLOUD_API · calidad **GREEN** |
| Disco persistente | ✅ `/dev/nvme2n1` en `/var/data`, **comprobado** (no supuesto) |
| Conversaciones del día | **97** · esperando respuesta: **0** |
| Pedidos guardados | **4**, todos entre 06:57 y 09:38 |
| Baterías de prueba | **13, todas en verde** |
| Plantillas | 6 subidas en `Spanish (COL)`, **las 6 conectadas** al código |

---

## ⚠️ EL PROBLEMA ABIERTO: el cierre va a la mitad

**4 pedidos sobre 97 conversaciones = 4,1%.** El histórico es **8,4%**.

### Lo que se descartó con evidencia, no con suposiciones

| se sospechó | cómo se descartó |
|---|---|
| La IA está caída | Se probó la clave contra Gemini **desde el contenedor**: responde |
| El bot no contesta | 97 conversaciones y **0 esperando respuesta** |
| No entran los mensajes | Hay actividad hasta las 15:39 |
| No se guardan los pedidos | Los 4 están en el disco |
| El candado del celular los bloquea | No: los guarda marcados como no despachables |
| Fue un despliegue | El último pedido es de 09:38; el primer merge del día fue 10:39 |
| El guion creció demasiado | Creció **7%** (5.903 → 6.344 tokens). Esta mañana, cerrando bien, ya era casi igual |

### Lo que sí quedó como causa probable

1. **El envío inflado.** Hasta las 14:44 el bot decía **$42.000** de envío en 2 unidades cuando el real es $37.832. Un cliente de Montería lo verificó en la plataforma y se fue.
   🔑 **No entró NI UNA venta de 2 unidades en todo el día.** Los 4 pedidos son de 1 unidad. Ese es el síntoma medible.
2. **La audiencia viene 20% peor.** Meta reporta **4,27 conv/mil** contra 5,33 de referencia sana. Eso no es del bot.

### Lo que NO se pudo comprobar

Que el bug del bloque `##ORDER##` cortado (PR #108) haya causado la caída. **El pedido perdido no dejaba rastro**, así que no hay con qué mirar hacia atrás. Lo que sí es seguro: era un camino real de pérdida y ahora cualquier caso queda en el log **y en el WhatsApp del dueño**.

> **Los dos arreglos que más pueden mover la aguja entraron a las 14:44 y 15:00.** Cuando se escribió esto llevaban menos de dos horas. **No se puede juzgar el día con eso.**

---

## ✅ Lo que se hizo (20 PRs mergeados)

### Seguridad
| PR | |
|---|---|
| **#94** | 🔴 El panel estaba **abierto a internet**: su clave estaba publicada en 5 archivos del repo público. Con ella se podía bajar la base de clientes y **escribirle a los clientes como BikerPro**. Se separó `PANEL_TOKEN` del token del webhook |
| **#113** | 🔴 Enviar guías quedó **muerto 4 horas**: la pantalla mandaba el token viejo. Error visible: `Unexpected token 'F'` |

### Que no se pierda plata
| PR | |
|---|---|
| **#104** | El bot **inflaba el envío**, que es el único número que el cliente puede verificar. El margen ahora va en la línea del producto. **El total no cambió** |
| **#106** | Banda D a **$140.000** + **rescate $137.000** (decisión del dueño, documentada con números) |
| **#108** | Los pedidos **se perdían en silencio** si la respuesta de la IA llegaba cortada |
| **#99** | Los pedidos **se podían borrar solos**: escritura no atómica + un archivo corrupto se leía como "no hay pedidos" y se pisaba |
| **#95** | El botón "Enviar como BikerPro" **no funcionaba nunca**, en ningún navegador |

### Para poder decidir
| PR | |
|---|---|
| **#100** | **De qué anuncio viene cada pedido.** Meta lo manda gratis y se tiraba a la basura |
| **#109** | **El embudo**: dónde se caen los clientes, con la fuga señalada y qué hacer |
| **#101** | El panel decía "disco persistente" **sin comprobar ningún disco** |
| **#107** | El panel en el celular, rehecho: **no tenía una sola media query** |

### Operación
| PR | |
|---|---|
| **#110 · #111** | **Novedades de entrega**: se pega el texto de 99 Envíos, empareja por guía y avisa al cliente. Una plantilla por tipo de novedad |
| **#112** | Las 3 plantillas que faltaban + **los botones de seguimiento, que no servían** |
| **#102 · #103 · #105** | Documentación: plantillas, la trampa de los 16×, y la cuenta de bajar a $137.000 |

---

## 📮 Novedades: cómo se usa

`/novedades?token=...` o el botón **📮 Avisar novedades de entrega** del panel.

1. Copiar las filas de novedades de 99 Envíos (**no hace falta CSV**: lee texto pegado)
2. **Revisar** — no envía nada
3. Completar los datos de las de oficina (**dónde** y **hasta cuándo**)
4. **Enviar**

| novedad | qué hace |
|---|---|
| Dirección / ausente | Mensaje o plantilla según la ventana de 24h |
| Oficina | Pide los datos reales. **El bot no los inventa** (error del 14-sep con Servientrega) |
| Rechazado | ⛔ No le escribe. Lo escala |
| Motivo desconocido | ⛔ No adivina |

---

## 📦 Guías: lo único que falta probar

Se probó con **un PDF real** de 99 Envíos y funcionó: leyó la hoja, sacó la guía `64532771291` y el teléfono, y **se negó a enviar** con 20 de 50 puntos porque era una guía del número viejo. **El candado funciona.**

⬜ **Falta probarlo con una guía de un pedido hecho con el bot nuevo.** Ahí el teléfono de la etiqueta coincide con el del pedido → 50 puntos → empareja.

⚠️ En esa etiqueta **no se pudo leer el nombre ni la ciudad**: solo el teléfono y 12 puntos de dirección. Con el teléfono alcanza (vale 50, justo el mínimo) pero **sin margen**. Si en el PDF de los pedidos de hoy las certezas salen justas en 50, hay que mejorar la lectura del nombre **con el formato real de la etiqueta**, no adivinando.

---

## 🔑 Reglas que salieron hoy

1. **El envío es el único número que el cliente puede auditar.** El margen va en la línea del producto. *(#104)*
2. **Un aviso que dice "todo bien" sin verificar es peor que no tenerlo**: enseña a confiar. *(#101)*
3. **El idioma de las plantillas es `es_CO`, no `es`.** Con `es` Meta rechaza el envío aunque la plantilla esté aprobada, **y el error no menciona el idioma**. Apareció **tres veces** en distintos archivos.
4. **Bajar la lista ≠ rescatar una venta.** Con 89 pedidos de 2 uds al mes, cada $1.000 de rebaja general son $89.000/mes. El descuento se ofrece **solo después de la objeción**.
5. **Una excepción al margen meta se registra con su razón**, no se baja la exigencia en silencio. El guardián real es: *vender DOS tiene que dejar más que vender UNA*.
6. **Un guardián que no caza el bug que dice cazar es peor que ninguno.** Se verifica volviendo a meter el bug a propósito.

---

## 📌 Mis errores de esta sesión

| # | error | corrección |
|---|---|---|
| 39 | Migré a `PANEL_TOKEN` y **me salté `panel-guias.js`**. Enviar guías quedó muerto 4 horas | El guardián de rutas no lo agarra: las rutas estaban bien, el token del navegador no. Prueba nueva que **compara las dos mitades** |
| 40 | Arreglé el 403 disfrazado en `/responder` y **no repliqué el arreglo** en las otras pantallas | El mismo bug volvió a aparecer 4 horas después. Ahora las 3 pantallas lo manejan, con prueba |
| 41 | Dije que el panel error del dueño era **"la regla de las 24 horas"** sin verificarlo | Eran dos bugs de código. Me apuré a dar una causa probable en vez de buscar la real |
| 42 | **Leí un teléfono de una captura de pantalla** y me equivoqué en un dígito | Es el error #37, repetido. El comando se reescribió para que **busque el dato solo** |
| 43 | Escribí la plantilla de la guía con 3 variables y en `es` | Quedó sin variables y en `es_CO`. Documenté lo que **de verdad** se subió, no lo que yo propuse |
| 44 | En el embudo, marcaba "cerró" con **una sola bandera** | Si la bandera fallaba, mostraba una fuga inventada en el paso más caro. Ahora cruza dos fuentes |
| 45 | Puse el cuadro de texto de novedades en **15px** | Es justo lo que dispara el zoom de iOS que yo mismo arreglé ese día |
| 46 | Seguí subiendo commits a ramas cuyo PR el dueño **ya había mergeado** | Dos veces. Un PR por cambio, abierto de una |

**El patrón:** los errores más costosos fueron **arreglos a medias** — resolver un problema en un archivo y no buscar el mismo patrón en los demás. El 403 disfrazado y el token viejo son el mismo error cometido dos veces.

---

## 🎯 Después de lo urgente

**Esta semana:** probar guías con un PDF de pedidos nuevos · decidir si **banda C** también baja (hoy Medellín quedó $12.000 más cara que Montería) · prender `SEGUIMIENTO_ACTIVO=1` cuando las plantillas estén en verde · preguntarle a 99 Envíos si tienen **API o webhooks** de novedades

**Después:** recordatorio automático a quien no responde una novedad · base de datos en vez de JSON · mejorar la lectura del nombre en las etiquetas

⛔ **Sigue en pie:** no habilitar cotización de **mayoristas** hasta medir el flete real de 6 y 13 unidades.
