# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-09 11:10 Bogota.** Ventana **2026-10-02 a 2026-10-08** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $531,496 | 1736 | 107 | **$4,967** | $306 | 6.16% | $13,010,000 |
| **IMPERMEABLE** | $1,091,388 | 2545 | 123 | **$8,873** | $429 | 4.83% | $10,850,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,622,884** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 10 |
| anuncios con pedidos de los DOS productos | 0 ✅ |
| pedidos resueltos por su anuncio (V10 de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-10-02 | $63,968 | 11 | $5,815 | $143,504 | 13 | $11,039 |
| 2026-10-03 | $54,276 | 21 | $2,585 | $127,744 | 17 | $7,514 |
| 2026-10-04 | $101,380 | 23 | $4,408 | $188,117 | 20 | $9,406 |
| 2026-10-05 | $92,480 | 18 | $5,138 | $180,451 | 12 | $15,038 |
| 2026-10-06 | $69,845 | 9 | $7,761 | $138,379 | 8 | $17,297 |
| 2026-10-07 | $70,755 | 13 | $5,443 | $161,806 | 27 | $5,993 |
| 2026-10-08 | $78,792 | 12 | $6,566 | $151,387 | 26 | $5,823 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,828 | **$24,634** | $4,967 | 🟢 5.0x | $2,104,360 |
| **IMPERMEABLE** | $25,032 | **$18,616** | $8,873 | 🟡 2.1x | $1,198,387 |

**Utilidad de la ventana: $3,302,747** ($471,821/dia)

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
