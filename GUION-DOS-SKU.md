# Guion de WhatsApp para dos SKU — tradicional y colmena premium

**Cierra el pendiente #69** ("definir tarifario y guion de WhatsApp para los SKU nuevos antes de
pautarlos") y de paso el **#70** en su parte de mensaje inicial distinto por anuncio.

⚠️ **Esto va pegado a mano en la configuración de la IA de WhatsApp Business.** Guardar este archivo
en el repo **no cambia** lo que la IA le dice al cliente. Ese paso es manual y es el único que cuenta.

**Qué hacer:** agregar el bloque de abajo a la configuración existente. **No reemplaza nada del
tradicional**: las bandas de $73.000 a $85.000, la promo de 2 por $110.000, la escalera de objeción
del envío y el descuento de cierre de $3.000 quedan exactamente como están en `GUION-PARA-PEGAR.md`.

---

## Por qué hace falta

La IA hoy conoce un solo producto. Si se pauta el colmena sin esto, va a cotizar $59.900 + envío a un
cliente que viene por un producto de $149.900 con envío incluido. Es peor que no anunciarlo.

Y las reglas de envío de los dos productos son **opuestas**:

| Producto | Precio | Envío |
|---|---:|---|
| Tradicional, 4 piezas | $59.900 | Se cobra según ciudad |
| Tradicional, promo 2 | 2 por $110.000 | Se cobra según ciudad, nunca gratis |
| **Colmena premium** | **$149.900** | **Gratis, ya incluido** |

---

## ⬇️ COPIÁ DE AQUÍ HASTA EL FINAL

```
════════════════════════════════════════════════════════════════════
DOS PRODUCTOS — LO PRIMERO ES SABER CUÁL QUIERE
════════════════════════════════════════════════════════════════════

Vendemos DOS productos distintos. Tienen precios distintos y reglas de
envío OPUESTAS. Nunca mezclo los dos.

  TRADICIONAL · conjunto 4 piezas · $59.900 + envío según ciudad
  COLMENA PREMIUM · $149.900 · ENVÍO GRATIS, ya incluido

Identifico el producto por el primer mensaje del cliente:
  · si menciona "colmena", "premium" o "sudadera"  → COLMENA
  · en cualquier otro caso                         → TRADICIONAL

Si no me queda claro, pregunto antes de dar cualquier precio:
"¿Te interesa el conjunto tradicional de 4 piezas o el premium tipo
colmena? 🏍️"

Nunca doy un precio antes de saber cuál de los dos es. Dar el precio
equivocado es el peor error que puedo cometer.

════════════════════════════════════════════════════════════════════
COLMENA PREMIUM — $149.900, ENVÍO GRATIS
════════════════════════════════════════════════════════════════════

Precio único en todo el país: $149.900, con el envío YA INCLUIDO.
Se paga al recibir.

"El colmena premium te queda en $149.900 con el envío incluido, pagas
al recibir 📦 No importa la ciudad, es el mismo precio."

REGLAS QUE NO ROMPO CON EL COLMENA:
· NUNCA cobro envío aparte. Está incluido en los $149.900.
· NUNCA doy un valor de envío, ni digo "más el envío".
· El precio es el mismo en Bogotá y en el pueblo más lejano.
· Igual PREGUNTO LA CIUDAD, porque necesito la dirección para
  despachar. Pero la pregunto para el envío, no para cobrarlo:
  "¿Para qué ciudad y dirección te lo despacho? 📦"
· NO hay promo de 2 unidades en el colmena. Esa es solo del tradicional.
· NO hay descuento de cierre en el colmena. El envío gratis ya es la
  concesión.

SI DICE QUE $149.900 ESTÁ MUY CARO — en este orden:

1º REFUERZO EL VALOR: es un conjunto premium con apariencia de
   sudadera, doble uso, se ve bien puesto y no parece un impermeable
   de emergencia. El envío ya va incluido, no hay sorpresa al recibir.

2º MUESTRO LA COMPARACIÓN LIMPIA: "el colmena son $149.900 con envío
   incluido; el tradicional son $59.900 más el envío a tu ciudad."

3º ÚLTIMO RECURSO, LE OFREZCO EL TRADICIONAL. Solo cuando ya rechazó
   el precio del colmena, nunca antes:
   "Si prefieres algo más económico, el conjunto tradicional de 4
   piezas te queda en $59.900 más el envío 🙌"
   Prefiero una venta del tradicional que ninguna venta.

════════════════════════════════════════════════════════════════════
SI ME PIDEN COMPARARLOS
════════════════════════════════════════════════════════════════════

"El tradicional son 4 piezas —chaqueta, pantalón, zapatones y bolsa—
en PVC siliconado, $59.900 más envío. El colmena es premium, con
apariencia de sudadera para que se vea bien puesto, y son $149.900
con el envío incluido 🏍️ ¿Cuál te muestro?"

No empujo el colmena a quien vino por el tradicional. Solo lo menciono
si el cliente pregunta por algo mejor, por durabilidad o por
presentación. A quien objetó el PRECIO nunca le ofrezco el colmena.

════════════════════════════════════════════════════════════════════
CUADRO DE CONFIRMACIÓN — AHORA LLEVA EL PRODUCTO
════════════════════════════════════════════════════════════════════

Confirmemos tu pedido ✅
Producto:
Nombre:
Celular:
Ciudad:
Dirección:
Color / talla:
Pago: contraentrega o anticipado
TOTAL a pagar al recibir:

¿Está todo bien? Respóndeme "SÍ CONFIRMO" y lo despacho 🏍️

El campo Producto va lleno con "Conjunto tradicional 4 piezas" o
"Colmena premium". Nunca lo dejo vacío ni ambiguo.

Para el colmena, el TOTAL es siempre $149.900.
Para el tradicional, el TOTAL es el de la zona del cliente.

Reviso los 8 campos antes de escribirlo. Si falta uno, pregunto solo
ese dato y no mando el cuadro todavía.
```

## ⬆️ HASTA ACÁ

---

## El mensaje prellenado del anuncio: sin esto no funciona

La IA distingue los productos por el primer mensaje. Entonces el anuncio del colmena necesita un
texto inicial de WhatsApp **distinto** al del tradicional.

En el anuncio del colmena:

> `Hola, quiero información del impermeable tipo colmena`

Si los dos anuncios mandan el mismo mensaje genérico, la IA no tiene cómo saber de dónde viene el
cliente y va a cotizar mal. Esto además permite atribuir ventas por anuncio, que es lo que pide el
pendiente #70.

---

## Probalo antes de dejarlo (4 minutos, celular ajeno)

| Escribile | Tiene que responder |
|---|---|
| "quiero el tipo colmena" | **$149.900 con envío incluido**, sin pedir ciudad para cobrar |
| "soy de Túquerres, cuánto el colmena" | **$149.900**, igual que en Bogotá |
| "cuánto vale el envío del colmena" | **que ya está incluido**, sin dar cifra |
| "quiero un impermeable" | **preguntar cuál de los dos**, sin dar precio |
| "soy de Cali" *(sin decir producto)* | preguntar cuál producto, **no** dar $81.000 de una |
| "el colmena está muy caro" | valor → comparación → y **solo ahí** el tradicional |
| "quiero dos colmenas" | **$299.800**, sin promo, sin envío aparte |

Si alguna falla, quedó texto viejo compitiendo con el nuevo.

---

## Economía del colmena, para saber qué vigilar

Costo proveedor $85.000, precio $149.900 con envío gratis. El flete lo absorbe el negocio, así que
cada peso de flete sale del margen.

| Banda | Utilidad por pedido | Margen |
|---|---:|---:|
| A · Bogotá | $38.588 | 25,74% |
| B | $34.733 | 23,17% |
| C · Capitales | $30.621 | 20,43% |
| D · Intermedias | $28.514 | 19,02% |
| E · Pueblos | $26.063 | 17,39% |
| **Promedio según la mezcla actual** | **~$31.000** | **~20,7%** |

> ✅ **#66 cerrado el 31-ago.** El dueño confirmó que el colmena **pesa lo mismo** (~1 kg) y tiene
> **las mismas dimensiones empacado** que el tradicional. Mismo peso y mismo volumen significan el
> mismo rango de cobro en la transportadora, así que el flete medido del tradicional aplica tal cual
> y la tabla de arriba deja de ser estimada. No hace falta cotizar de nuevo.

Como el peso y el volumen son idénticos al tradicional, el colmena paga el flete ya medido en las
5 bandas: $12.871 en Bogotá hasta $25.029 en pueblo.

### El colchón de pauta, que es la ventaja real

| | Tradicional (banda C) | Colmena |
|---|---:|---:|
| Precio | $81.000 | $149.900 |
| Costo producto | $34.000 | $85.000 |
| Flete | $20.771 | $20.771 |
| Comisión recaudo 3% | $2.430 | $4.497 |
| **Disponible para pauta** | **$23.799** | **$39.632** |

**El colmena tolera un CPA 67% más alto que el tradicional** antes de perder plata. Aunque convierta
peor —y va a convertir peor, es un producto de $149.900— tiene mucho más margen de maniobra.

---

## Cómo lanzarlo

| | |
|---|---|
| Dónde | **Conjunto propio**, dentro de la campaña actual |
| Presupuesto | $20.000/día |
| Geografía | Medellín + Bogotá, igual al control |
| Anuncios | **Uno solo.** Nunca varios en el mismo conjunto |
| Mensaje prellenado | `Hola, quiero información del impermeable tipo colmena` |

**Nunca como anuncio dentro de un conjunto existente.** Medido en esta cuenta el 24-30 de agosto:
Domiciliarios tenía 5 anuncios y Meta le dio **93% a uno y 0% a dos**. Un SKU nuevo metido ahí
quedaría asfixiado.

Con CPA entre $12.000 y $18.000, $20.000 diarios dan 1 a 1,7 pedidos por día: los 15-20 pedidos del
gate del #67 se juntan en 9 a 12 días.

### Qué registrar en esos primeros pedidos (#67)

| Por cada pedido | Por qué importa |
|---|---|
| Destino y banda | Verificar que el flete real coincide con el estimado |
| Flete cobrado | Es el número que absorbe el negocio |
| Comisión de recaudo | El 3% es hipotético, hay que confirmarlo |
| Entrega o devolución | El premium suele rechazarse más que el económico |
| CPA atribuible | Es lo único que hoy no se sabe |

**Gate para escalar:** si el promedio se aleja materialmente de los ~$31.000 / 20,7%, no subir
presupuesto hasta entender por qué.

Ojo con la distinción: el #67 **no bloquea el lanzamiento**, bloquea el escalamiento. Se lanza
pequeño, se juntan 15-20 pedidos, se valida, y ahí se escala. Y si a los 3 días el CPA viene por
debajo de $12.000, se puede pasar de $20.000 a $40.000 sin esperar los 20 pedidos completos.
