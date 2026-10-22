# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-22 09:30 Bogota.** Ventana **2026-10-15 a 2026-10-21** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $633,591 | 1490 | 83 | **$7,634** | $425 | 5.57% | $10,103,000 |
| **Q58** | $578,675 | 1402 | 68 | **$8,510** | $413 | 4.85% | $10,217,000 |
| **IMPERMEABLE** | $1,089,000 | 2460 | 115 | **$9,470** | $443 | 4.67% | $10,589,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,301,266** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 16 |
| anuncios con pedidos de MAS de un producto | 2 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 77, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 65, 'Q58': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-15 | $69,828 | 17 | $4,108 | $22,226 | 0 | — | $124,259 | 13 | $9,558 |
| 2026-10-16 | $79,197 | 8 | $9,900 | $95,427 | 11 | $8,675 | $141,410 | 8 | $17,676 |
| 2026-10-17 | $80,209 | 10 | $8,021 | $61,924 | 11 | $5,629 | $168,757 | 29 | $5,819 |
| 2026-10-18 | $99,086 | 12 | $8,257 | $97,968 | 8 | $12,246 | $190,236 | 13 | $14,634 |
| 2026-10-19 | $86,200 | 6 | $14,367 | $89,369 | 16 | $5,586 | $167,897 | 24 | $6,996 |
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $141,288 | 11 | $12,844 |
| 2026-10-21 | $96,811 | 20 | $4,841 | $90,449 | 12 | $7,537 | $155,153 | 17 | $9,127 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,761 | **$24,583** | $7,634 | 🟢 3.2x | $1,406,793 |
| **Q58** | $36,511 | **$27,477** | $8,510 | 🟢 3.2x | $1,289,782 |
| **IMPERMEABLE** | $25,543 | **$19,010** | $9,470 | 🟡 2.0x | $1,097,155 |

**Utilidad de la ventana: $3,793,730** ($541,961/dia)

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
