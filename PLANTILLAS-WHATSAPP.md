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

⚠️ **Idioma:** elegí **Español** (o *Español (Colombia)* si aparece). Tiene que ser **el
mismo idioma** que después use el bot, o el envío falla aunque la plantilla esté aprobada.

---

# Las 3 plantillas

## 1️⃣ La guía de envío — la más importante

Es la que te deja mandarle la guía a un cliente que escribió hace más de un día.

| campo | valor |
|---|---|
| **Categoría** | **Utilidad** |
| **Nombre** | `guia_de_envio` |
| **Idioma** | Español |
| **Encabezado** | **Documento** *(acá va el PDF de la guía)* |

**Cuerpo** — pegá esto tal cual:

```
Hola {{1}}, tu pedido de BikerPro ya fue despachado. Guia {{2}} con {{3}}. Llega en 1 a 3 dias habiles y pagas al recibir. Adjuntamos la guia en PDF.
```

**Ejemplos** (para el botón *Agregar ejemplo*):

| variable | ejemplo |
|---|---|
| `{{1}}` | `Juan Perez` |
| `{{2}}` | `240012345678` |
| `{{3}}` | `Interrapidisimo` |

> ✅ **Por qué esta pasa como Utilidad:** solo informa el estado de un pedido que ya existe.
> No saluda de más, no agradece, no ofrece nada.
>
> ⛔ **No le agregues** *"gracias por tu compra"* ni *"cualquier cosa nos escribes"*. Eso es
> justo lo que dispara la reclasificación a Marketing.

---

## 2️⃣ El seguimiento a los que no compraron

Para los ~2.372 que preguntaron y no cerraron. **Esta sí es Marketing, y está bien que lo
sea** — dentro de las 72 horas del clic en el anuncio, Meta **no te la cobra**.

| campo | valor |
|---|---|
| **Categoría** | **Marketing** |
| **Nombre** | `seguimiento_impermeable` |
| **Idioma** | Español |
| **Encabezado** | *(ninguno)* |

**Cuerpo:**

```
Hola {{1}}, te escribimos de BikerPro por el conjunto impermeable de 4 piezas que consultaste. Sigue disponible en $59.900 con pago contraentrega. Si quieres, te confirmamos el envio a tu ciudad.
```

**Ejemplo:** `{{1}}` → `Juan Perez`

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
| **Idioma** | Español |

**Cuerpo:**

```
Cierre del dia {{1}}: {{2}} pedidos por un total de {{3}}. El detalle completo esta en el panel.
```

**Ejemplos:** `{{1}}` → `22 de septiembre` · `{{2}}` → `7` · `{{3}}` → `$574.000`

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
