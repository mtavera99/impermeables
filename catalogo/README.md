# 📚 Catálogo de WhatsApp — cómo montarlo

> El catálogo viejo **no se puede recuperar**: se creó dentro de la app de WhatsApp
> Business del número anterior, y esos catálogos quedan atados a ese número. No
> aparecen como activo del portafolio comercial ni se pueden mover.
> Verificado el 21-sep: Commerce Manager del portafolio `1271452296042859` está vacío
> y `Agregar activos → Catálogos` dice *"No se encontró ningún activo comercial"*.

**No se pierde nada importante:** las fotos ya están publicadas en el sitio y las
descripciones se rehacen mejor, porque ahora sabemos qué pregunta la gente.

---

## Por qué vale la pena

En el export del agente anterior, **3.280 conversaciones (52%)** mostraban productos
del catálogo. El más enviado fue "PROMO IMPERMEABLE" con **3.763 envíos**.

Y el catálogo manda **foto + descripción + precio** en un solo mensaje, así que
ataca de frente las dos dudas más frecuentes del cliente:

| duda | % de los mensajes |
|---|---|
| talla | **17,8%** |
| color | **10,3%** |

Por eso las descripciones del CSV **empiezan por talla y color**, no por el material.

---

## Paso 1 — Crear el catálogo

En Commerce Manager: https://business.facebook.com/commerce/?business_id=1271452296042859

1. **Agregar productos** → **Crear catálogo**
2. Tipo: **Productos**
3. Nombre: `BikerPro`
4. Propietario: el portafolio **BikerPro** (`1271452296042859`)

⚠️ **Tiene que quedar en ese portafolio**, el mismo de la cuenta publicitaria y de la
WABA `biker`. Si queda en otro, el bot no lo va a poder usar y vamos a perder rato
buscando por qué.

## Paso 2 — Subir los productos

Catálogo → **Artículos** → **Agregar artículos** → **Subir archivo** →
subir **`catalogo-bikerpro.csv`** (está en esta carpeta).

Trae 3 productos:

| id (retailer_id) | producto | precio |
|---|---|---|
| `BP-TRAD-001` | Conjunto Tradicional 4 piezas | $59.900 + envío |
| `BP-TRAD-2X` | Promo 2 Conjuntos | $110.000 + envío |
| `BP-COLMENA-001` | Colmena Premium (con forro) | $149.900 **envío incluido** |

🔑 **Esos `id` son los `retailer_id`** que usa la API para mandar productos. Los elegí
legibles a propósito. **No los cambies** sin avisar: están puestos en el código del bot.

⛔ **No incluí la "Chaqueta Reflectiva DOBLE FAZ"** que aparecía en el export (55 envíos).
No tengo su precio confirmado y **no se inventa un precio en un catálogo**: lo que dice
el catálogo es lo que el cliente espera pagar. Cuando lo tengas, se agrega una fila.

## Paso 3 — Vincular el catálogo a la WABA

https://business.facebook.com/latest/whatsapp_manager/catalog/?business_id=1271452296042859&asset_id=1345319974418244

Sin este paso el catálogo existe pero WhatsApp no lo puede mostrar.

## Paso 4 — Permisos del token

El usuario de sistema `BikerPro Bot` necesita:

- **Agregar activos** → pestaña **Catálogos** → el catálogo `BikerPro` → **Control total**
- **Generar token** con **cuatro** permisos:
  `whatsapp_business_messaging` · `whatsapp_business_management` ·
  `business_management` · `catalog_management`

Meta fue explícita al respecto: `(#200) Requires business_management permission`.

## Paso 5 — Variables en Render

```
CATALOG_ID=(el id del catálogo, sale en Commerce Manager)
CATALOG_THUMBNAIL=BP-TRAD-001
```

`CATALOG_THUMBNAIL` es el producto que se usa como portada cuando el bot manda el
catálogo completo. Va el tradicional porque es el 98% de los envíos.

## Paso 6 — Verificar

```
https://bikerpro-bot.onrender.com/catalogos?token=bikerpro_verify_2026
```

Tiene que listar los 3 productos con su `retailer_id`. Si los lista, el bot ya puede
mandarlos.

---

## ⚠️ Dos cosas que conviene saber

**1. El Colmena no está en `cotizar()`.** El tarifario del bot calcula precios del
conjunto tradicional. El Colmena va a $149.900 con envío incluido, que es un modelo
de precio distinto. Si el bot empieza a vender Colmena en volumen, hay que meterlo
en el código — hoy el guion lo menciona pero el precio no está automatizado.

**2. El precio del catálogo es el del PRODUCTO, no el total.** El cliente va a ver
$59.900 y el envío se cobra aparte, igual que en los anuncios. La regla del guion
sigue mandando: **el bot cotiza el TOTAL de la banda del cliente**, nunca el producto
suelto. El catálogo no cambia eso, pero sí crea una expectativa — por eso cada
descripción dice explícitamente *"+ envío según tu ciudad"*.
