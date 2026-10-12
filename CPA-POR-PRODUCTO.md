# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-12 14:00 Bogota.** Ventana **2026-10-05 a 2026-10-11** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $539,199 | 1644 | 87 | **$6,198** | $328 | 5.29% | $10,677,000 |
| **IMPERMEABLE** | $1,047,043 | 2456 | 122 | **$8,582** | $426 | 4.97% | $10,902,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,586,242** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 11 |
| anuncios con pedidos de los DOS productos | 0 ✅ |
| pedidos que no se pudieron clasificar | 0 ✅ |

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-10-05 | $92,480 | 18 | $5,138 | $180,451 | 12 | $15,038 |
| 2026-10-06 | $69,845 | 9 | $7,761 | $138,379 | 8 | $17,297 |
| 2026-10-07 | $70,755 | 13 | $5,443 | $161,849 | 27 | $5,994 |
| 2026-10-08 | $78,985 | 12 | $6,582 | $151,678 | 23 | $6,595 |
| 2026-10-09 | $78,333 | 14 | $5,595 | $142,644 | 22 | $6,484 |
| 2026-10-10 | $65,830 | 7 | $9,404 | $119,454 | 17 | $7,027 |
| 2026-10-11 | $82,971 | 14 | $5,926 | $152,588 | 13 | $11,738 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,707 | **$24,541** | $6,198 | 🟢 4.0x | $1,595,855 |
| **IMPERMEABLE** | $25,449 | **$18,938** | $8,582 | 🟡 2.2x | $1,263,381 |

**Utilidad de la ventana: $2,859,236** ($408,462/dia)

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
