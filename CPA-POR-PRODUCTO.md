# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-19 11:26 Bogota.** Ventana **2026-10-12 a 2026-10-18** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $853,241 | 2188 | 120 | **$7,110** | $390 | 5.48% | $15,494,000 |
| **IMPERMEABLE** | $1,121,979 | 2924 | 148 | **$7,581** | $384 | 5.06% | $13,331,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,975,220** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 16 |
| anuncios con pedidos de los DOS productos | 1 ⚠️ |
| pedidos resueltos por su anuncio (V10 de 1 unidad) | 4 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de los DOS productos

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 63, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-10-12 | $86,217 | 11 | $7,838 | $178,038 | 24 | $7,418 |
| 2026-10-13 | $74,834 | 12 | $6,236 | $172,071 | 29 | $5,933 |
| 2026-10-14 | $86,407 | 14 | $6,172 | $147,271 | 24 | $6,136 |
| 2026-10-15 | $92,054 | 17 | $5,415 | $124,259 | 13 | $9,558 |
| 2026-10-16 | $174,624 | 19 | $9,191 | $141,410 | 9 | $15,712 |
| 2026-10-17 | $142,133 | 22 | $6,461 | $168,757 | 34 | $4,963 |
| 2026-10-18 | $196,972 | 25 | $7,879 | $190,173 | 15 | $12,678 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $40,129 | **$30,271** | $7,110 | 🟢 4.3x | $2,779,264 |
| **IMPERMEABLE** | $24,784 | **$18,425** | $7,581 | 🟡 2.4x | $1,604,847 |

**Utilidad de la ventana: $4,384,111** ($626,302/dia)

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo intercomunicador | $32,000/ud | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre, asi que su tasa propia no madura hasta ~22-oct. Mientras tanto, su colchon es el numero menos firme de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
