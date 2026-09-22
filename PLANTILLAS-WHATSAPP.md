# 📝 Las plantillas de WhatsApp — qué pegar y dónde

> Para que Meta **no las rechace** y sobre todo para que **no te las cobre 16 veces más**.
> Reglas verificadas el 22-sep-2026. *Contenido reformulado por restricciones de licencia.*

---

## 🔴 La trampa que importa más (y es nueva)

Desde **abril de 2025**, si mandás una plantilla como **Utilidad** pero el texto tiene
lenguaje de venta, Meta **no la rechaza: la reclasifica sola a Marketing y te cobra como
Marketing.** Sin avisar.

| categoría | lo que cuesta un mensaje |
|---|---|
| **Utilidad** | **$0,0009 USD** |
| **Marketing** | **$0,0144 USD** |

**Son 16 veces.** Y la reclasificación la decide un clasificador automático que se fija en
el lenguaje promocional y en los botones de llamada a la acción.

> 🔑 **La regla práctica:** en las plantillas de Utilidad, **cero amabilidad de más.**
> Nada de *"gracias por preferirnos"*, *"aprovecha"*, *"no te lo pierdas"*, ni ofrecer otro
> producto. Solo el hecho: qué pasó con el pedido.

Fuentes: [voltade](https://voltade.com/learn/whatsapp/template-message-best-practices) ·
[360dialog](https://360dialog.com/blog/why-your-whatsapp-templates-keep-getting-rejected/) ·
[whapi](https://whapi.cloud/blog/why-meta-rejects-whatsapp-templates)

---

## 🚫 Por qué se rechazan (las 5 causas reales)

| # | causa | cómo evitarla |
|---|---|---|
| 1 | **Categoría equivocada** | Utilidad = algo que pasó con un pedido. Marketing = todo lo que busca vender |
| 2 | **Variables mal puestas** | Que el texto **no empiece ni termine** con `{{1}}`, y nunca dos variables pegadas |
| 3 | **Falta el ejemplo** | Hay un botón **"Agregar ejemplo"**. Sin llenarlo, sube el riesgo de rechazo |
| 4 | **Texto vago** | Un *"Hola, tenemos novedades"* parece spam. Tiene que decir de qué se trata |
| 5 | **Enlaces prohibidos** | ⛔ Nada de `wa.me`, ni acortadores (`bit.ly`, `fb.me`) |

**El nombre de la plantilla** solo acepta minúsculas, números y guión bajo: `guia_de_envio`.

**Cuánto tarda:** las de Utilidad, minutos. Las de Marketing, hasta 24 horas.

---

## 📍 Dónde se crean

1. Entrá a **business.facebook.com**
2. Buscá **WhatsApp Manager**
3. **Plantillas de mensajes** → botón **Crear plantilla**
4. Elegís **categoría**, **nombre** e **idioma**: **Español**
5. Pegás el cuerpo, llenás **Agregar ejemplo**, y **Enviar**

⚠️ **Idioma: `Spanish (COL)`** — es el que ya se usó en la primera plantilla. **Todas las
demás tienen que ir en el mismo**, porque en el código el idioma es `es_CO` y si una
plantilla está en otro idioma el envío falla aunque esté aprobada.

🔗 **El enlace que funciona** (el que abrió el dueño):
`business.facebook.com/latest/whatsapp_manager/message_templates?business_id=1271452296042859`

---

# Las 3 plantillas

## 1️⃣ La guía de envío — la más importante

Es la que te deja mandarle la guía a un cliente que escribió hace más de un día.

## ✅ ESTA YA SE ENVIÓ — así quedó de verdad (22-sep, 14:30)

Lo de abajo **no es la propuesta: es lo que está en revisión en Meta.** Importa que quede
exacto, porque el código tiene que coincidir con la plantilla o el envío falla.

| campo | valor real |
|---|---|
| **Categoría** | **Utilidad** |
| **Nombre** | `guia_de_envio` |
| **Idioma** | **Spanish (COL)** → en la API es **`es_CO`**, no `es` |
| **Encabezado** | **Documento** (con un PDF de muestra subido) |
| **Variables** | **NINGUNA** |
| **Pie / Botones** | vacíos |

**Cuerpo, textual:**

```
Tu pedido de BikerPro ya fue despachado. Adjuntamos la guia de envio en PDF. Llega en 1 a 3 dias habiles y pagas al recibir.
```

### 🔑 Por qué quedó SIN variables

La primera versión llevaba `{{1}}` nombre, `{{2}}` guía y `{{3}}` transportadora. Se
quitaron las tres, y fue una mejora, no una renuncia:

- **El número de guía y la transportadora ya van impresos dentro del PDF** que se adjunta.
  Repetirlos en el texto no agrega información.
- **Cada variable es un motivo más de rechazo.** Meta tiene una regla de proporción
  (demasiadas variables para el largo del texto) que se disparó con 3 en una frase corta.
- Sin variables **no hay que llenar las "Muestras de variables"**, que es el paso que más se
  salta y otra causa común de rechazo.
- Y para el código es más simple: se manda **solo el documento**, sin parámetros de cuerpo.

**Lo único que pierde es el saludo por el nombre.** No importa: el cliente acaba de recibir
su propio PDF, y en cuanto responda cualquier cosa se abre la ventana de 24 h y el bot le
habla normal.

### ⚠️ Dos trampas de la interfaz, para no repetirlas

1. **El botón `Agregar variable` mete el `{{1}}` donde está el cursor.** Quedó al principio
   del cuerpo (`{{1}}Hello`) y Meta lo rechaza: *las variables no pueden estar al principio
   ni al final*. Si se usan variables, hay que escribir el texto completo primero.
2. **Si elegís `Documento` en "Muestra de contenido multimedia", HAY QUE SUBIR un PDF de
   muestra.** Sin eso el botón *Enviar para revisión* queda gris y el aviso de error no dice
   cuál es el campo que falta. Ese PDF es solo para el revisor: no se le manda a nadie.

> ✅ **Por qué pasa como Utilidad:** solo informa el estado de un pedido que ya existe.
> No saluda de más, no agradece, no ofrece nada.
>
> ⛔ **No le agregues** *"gracias por tu compra"* ni *"cualquier cosa nos escribes"*. Eso es
> justo lo que dispara la reclasificación a Marketing (16× más caro).

---

## 2️⃣ El seguimiento a los que no compraron

Para los ~2.372 que preguntaron y no cerraron. **Esta sí es Marketing, y está bien que lo
sea** — dentro de las 72 horas del clic en el anuncio, Meta **no te la cobra**.

| campo | valor |
|---|---|
| **Categoría** | **Marketing** |
| **Nombre** | `seguimiento_impermeable` |
| **Idioma** | **Spanish (COL)** — el mismo que la primera |
| **Encabezado** | **ninguno** (dejar *Muestra de contenido multimedia* en `Ninguna`) |
| **Variables** | **ninguna**, por lo mismo que la primera |

**Cuerpo:**

```
Te escribimos de BikerPro por el conjunto impermeable de 4 piezas que consultaste. Sigue disponible en $59.900 con pago contraentrega. Si quieres, te confirmamos el envio a tu ciudad.
```

> ⚠️ **Esta plantilla tiene el precio adentro.** Si algún día cambia el precio del anuncio,
> hay que **editarla y volver a mandarla a aprobación**. No se puede cambiar sobre la marcha.

**Botones** → *Respuesta rápida* (agregá estos dos):

| botón |
|---|
| `Si, me interesa` |
| `No, gracias` |

> 🔑 **Los botones no son adorno: son lo que arregla el problema de raíz.** Cuando el
> cliente toca cualquiera de los dos, **eso cuenta como que él escribió** y se te abre la
> ventana de 24 horas. Ahí ya le podés escribir libre, sin plantilla.
>
> Y el *"No, gracias"* te sirve para marcarlo y no volver a molestarlo.

---

## 3️⃣ El cierre diario (este es para vos, no para clientes)

El reporte de la noche hoy no te llega si no le escribiste al bot en el día.

| campo | valor |
|---|---|
| **Categoría** | **Utilidad** |
| **Nombre** | `cierre_del_dia` |
| **Idioma** | **Spanish (COL)** |
| **Encabezado** | ninguno |
| **Variables** | **1 sola** — acá sí hace falta, porque los números cambian cada día |

**Cuerpo:**

```
Ya esta listo el cierre del dia en tu panel de BikerPro. Resumen: {{1}}
```

**Muestra de la variable:** `{{1}}` → `7 pedidos por $574.000`

> 🔑 **Por qué una sola variable y al final del texto no rompe la regla:** la regla es que no
> puede estar **al principio ni al final** — y acá el cuerpo **termina** en `{{1}}`. Así que
> hay que dejarle algo después. Usá este cuerpo en su lugar:
>
> ```
> Ya esta listo el cierre del dia en tu panel de BikerPro. Resumen: {{1}}. Entra al panel para ver el detalle.
> ```
>
> Y si igual te la rechaza, mandala como **Marketing**: es **un mensaje al día**, ~$1,70 COP.

> Si te la rechazan por ser un aviso interno, volvé a subirla como **Marketing**. Es **un
> mensaje al día**: te costaría ~$1,70 COP diarios. No vale la pena pelearla.

---

## 4️⃣ Y aparte: aprobar el nombre "Biker"

Hoy tu número aparece sin nombre verificado (`name_status: NON_EXISTS`). Por eso el cliente
ve un número pelado en vez de tu marca.

**WhatsApp Manager** → **Configuración de la cuenta** → tu número **+57 322 7545695** →
**Perfil / Nombre para mostrar** → cambialo a **`BikerPro`** y enviá a aprobación.

> ⚠️ Poné **BikerPro**, no "Biker". El nombre para mostrar tiene que **parecerse al negocio
> verificado** y a la marca que usás en los anuncios. "Biker" suelto es genérico y es más
> fácil que lo rechacen.

---

## ✅ Qué pasa después de que las aprueben

**Avisame cuando estén en verde** (`Activa`). Yo tengo que hacer la otra mitad: hoy el bot
manda texto libre, y para usar una plantilla hay que llamar a la API de otra forma. Eso es
código y lo hago yo.

**El orden que conviene:**

1. Subí la **1** (guía). Es Utilidad, se aprueba en minutos, y es la que más falta hace
2. Subí la **2** (seguimiento). Es Marketing, puede tardar hasta 24 h
3. La **3** (cierre) y el **nombre**, cuando tengas un rato

---

## ❓ Una cosa que NO se puede, para que no la busques

**No existe una plantilla para "escribirle lo que yo quiera" a un chat viejo.** Una
plantilla con una variable que acepte cualquier texto es exactamente lo que Meta rechaza.

El camino es el de la plantilla **2**: le mandás el seguimiento, el cliente toca un botón o
responde, y **ahí** se abre la ventana de 24 horas y le escribís libre desde el panel.
