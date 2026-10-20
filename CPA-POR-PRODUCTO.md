# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-19 19:40 Bogota.** Ventana **2026-10-12 a 2026-10-18** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $575,778 | 1516 | 84 | **$6,854** | $380 | 5.54% | $10,149,000 |
| **Q58** | $277,545 | 672 | 30 | **$9,252** | $413 | 4.46% | $4,491,000 |
| **IMPERMEABLE** | $1,122,042 | 2924 | 141 | **$7,958** | $384 | 4.82% | $12,769,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,975,365** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 16 |
| anuncios con pedidos de MAS de un producto | 2 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 4 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'Q58': 1, 'V10': 62}
- `120249619616140390` -> {'V10': 64, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-12 | $86,217 | 11 | $7,838 | $0 | 0 | — | $178,038 | 24 | $7,418 |
| 2026-10-13 | $74,834 | 12 | $6,236 | $0 | 0 | — | $172,071 | 29 | $5,933 |
| 2026-10-14 | $86,407 | 14 | $6,172 | $0 | 0 | — | $147,271 | 24 | $6,136 |
| 2026-10-15 | $69,828 | 17 | $4,108 | $22,226 | 0 | — | $124,259 | 13 | $9,558 |
| 2026-10-16 | $79,197 | 8 | $9,900 | $95,427 | 11 | $8,675 | $141,410 | 8 | $17,676 |
| 2026-10-17 | $80,209 | 10 | $8,021 | $61,924 | 11 | $5,629 | $168,757 | 30 | $5,625 |
| 2026-10-18 | $99,086 | 12 | $8,257 | $97,968 | 8 | $12,246 | $190,236 | 13 | $14,634 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,879 | **$24,673** | $6,854 | 🟢 3.6x | $1,496,790 |
| **Q58** | $36,337 | **$27,343** | $9,252 | 🟡 3.0x | $542,751 |
| **IMPERMEABLE** | $24,819 | **$18,451** | $7,958 | 🟡 2.3x | $1,479,564 |

**Utilidad de la ventana: $3,519,105** ($502,729/dia)

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo V10 | $32,000/ud | `bot/src/catalogo.js` costoUnitario |
| costo Q58 Max | $45,000/ud | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre (su tasa propia madura ~22-oct) y el Q58 el 16-oct (~7-nov). Mientras tanto, sus colchones son los numeros menos firmes de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
