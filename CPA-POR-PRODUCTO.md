# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-07 11:27 Bogota.** Ventana **2026-09-30 a 2026-10-06** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $545,152 | 1756 | 108 | **$5,048** | $310 | 6.15% | $13,103,000 |
| **IMPERMEABLE** | $1,077,024 | 2392 | 105 | **$10,257** | $450 | 4.39% | $9,432,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,622,176** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 10 |
| anuncios con pedidos de los DOS productos | 0 ✅ |
| pedidos resueltos por su anuncio (V10 de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-09-30 | $91,930 | 12 | $7,661 | $162,550 | 22 | $7,389 |
| 2026-10-01 | $71,550 | 12 | $5,962 | $136,566 | 12 | $11,380 |
| 2026-10-02 | $63,968 | 11 | $5,815 | $143,504 | 13 | $11,039 |
| 2026-10-03 | $54,276 | 21 | $2,585 | $127,744 | 17 | $7,514 |
| 2026-10-04 | $101,380 | 23 | $4,408 | $188,117 | 20 | $9,406 |
| 2026-10-05 | $92,480 | 18 | $5,138 | $180,451 | 12 | $15,038 |
| 2026-10-06 | $69,568 | 11 | $6,324 | $138,092 | 9 | $15,344 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,872 | **$24,668** | $5,048 | 🟢 4.9x | $2,119,006 |
| **IMPERMEABLE** | $25,455 | **$18,942** | $10,257 | 🟡 1.8x | $911,918 |

**Utilidad de la ventana: $3,030,924** ($432,989/dia)

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
