# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-22 18:15 Bogota.** Ventana **2026-10-15 a 2026-10-21** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $633,807 | 1490 | 82 | **$7,729** | $425 | 5.50% | $9,981,000 |
| **Q58** | $578,945 | 1402 | 67 | **$8,641** | $413 | 4.78% | $10,062,000 |
| **IMPERMEABLE** | $1,089,399 | 2460 | 115 | **$9,473** | $443 | 4.67% | $10,589,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,302,151** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 16 |
| anuncios con pedidos de MAS de un producto | 2 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 66, 'Q58': 1}
- `120249619616140390` -> {'V10': 83, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-15 | $69,828 | 17 | $4,108 | $22,226 | 0 | — | $124,259 | 13 | $9,558 |
| 2026-10-16 | $79,197 | 8 | $9,900 | $95,427 | 11 | $8,675 | $141,410 | 8 | $17,676 |
| 2026-10-17 | $80,209 | 10 | $8,021 | $61,924 | 11 | $5,629 | $168,757 | 29 | $5,819 |
| 2026-10-18 | $99,086 | 12 | $8,257 | $97,968 | 8 | $12,246 | $190,236 | 13 | $14,634 |
| 2026-10-19 | $86,200 | 6 | $14,367 | $89,369 | 16 | $5,586 | $167,897 | 24 | $6,996 |
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,027 | 19 | $5,107 | $90,719 | 11 | $8,247 | $155,552 | 17 | $9,150 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,735 | **$27,650** | $7,729 | 🟢 3.6x | $1,633,524 |
| **Q58** | $40,454 | **$30,522** | $8,641 | 🟢 3.5x | $1,466,003 |
| **IMPERMEABLE** | $25,543 | **$19,010** | $9,473 | 🟡 2.0x | $1,096,756 |

**Utilidad de la ventana: $4,196,283** ($599,469/dia)

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo V10 | $30,000/ud desde el 2026-10-15 (antes $32,000) | `bot/src/catalogo.js` costoUnitario |
| costo Q58 Max | $43,000/ud desde el 2026-10-15 (antes $45,000) | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre (su tasa propia madura ~22-oct) y el Q58 el 16-oct (~7-nov). Mientras tanto, sus colchones son los numeros menos firmes de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
