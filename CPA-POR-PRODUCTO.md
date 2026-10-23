# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-23 09:13 Bogota.** Ventana **2026-10-16 a 2026-10-22** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $653,947 | 1466 | 76 | **$8,605** | $446 | 5.18% | $9,283,000 |
| **Q58** | $642,541 | 1556 | 76 | **$8,454** | $413 | 4.88% | $11,357,000 |
| **IMPERMEABLE** | $1,105,517 | 2528 | 125 | **$8,844** | $437 | 4.94% | $11,802,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,402,005** (100.0%) |
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
| 2026-10-16 | $79,197 | 8 | $9,900 | $95,427 | 11 | $8,675 | $141,410 | 8 | $17,676 |
| 2026-10-17 | $80,209 | 10 | $8,021 | $61,924 | 11 | $5,629 | $168,757 | 29 | $5,819 |
| 2026-10-18 | $99,086 | 12 | $8,257 | $97,968 | 8 | $12,246 | $190,236 | 13 | $14,634 |
| 2026-10-19 | $86,200 | 6 | $14,367 | $89,369 | 16 | $5,586 | $167,897 | 24 | $6,996 |
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $155,630 | 17 | $9,155 |
| 2026-10-22 | $89,952 | 11 | $8,177 | $85,811 | 9 | $9,535 | $140,299 | 23 | $6,100 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,744 | **$27,658** | $8,605 | 🟢 3.2x | $1,448,046 |
| **Q58** | $40,294 | **$30,398** | $8,454 | 🟢 3.6x | $1,667,710 |
| **IMPERMEABLE** | $25,910 | **$19,293** | $8,844 | 🟡 2.2x | $1,306,144 |

**Utilidad de la ventana: $4,421,899** ($631,700/dia)

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
