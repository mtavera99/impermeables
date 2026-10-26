# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-26 11:06 Bogota.** Ventana **2026-10-19 a 2026-10-25** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $689,922 | 1395 | 70 | **$9,856** | $495 | 5.02% | $8,583,000 |
| **Q58** | $658,754 | 1616 | 73 | **$9,024** | $408 | 4.52% | $10,910,000 |
| **RADIO** | $109,082 | 141 | 6 | **$18,180** | $774 | 4.26% | $864,000 |
| **IMPERMEABLE** | $1,016,158 | 2306 | 120 | **$8,468** | $441 | 5.20% | $11,459,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,473,916** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 21 |
| anuncios con pedidos de MAS de un producto | 3 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 76, 'Q58': 1}
- `120249619616140390` -> {'V10': 91, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-19 | $86,200 | 6 | $14,367 | $89,369 | 16 | $5,586 | $0 | 0 | — | $167,897 | 24 | $6,996 |
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $0 | 0 | — | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $0 | 0 | — | $155,630 | 17 | $9,155 |
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,879 | 23 | $6,125 |
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 11 | $7,765 | $0 | 0 | — | $126,349 | 19 | $6,650 |
| 2026-10-24 | $97,013 | 8 | $12,127 | $93,988 | 7 | $13,427 | $56,100 | 1 | $56,100 | $137,755 | 10 | $13,776 |
| 2026-10-25 | $111,717 | 9 | $12,413 | $91,807 | 10 | $9,181 | $52,982 | 5 | $10,596 | $146,360 | 16 | $9,148 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,675 | **$27,604** | $9,856 | 🟡 2.8x | $1,242,383 |
| **Q58** | $40,401 | **$30,481** | $9,024 | 🟢 3.4x | $1,566,363 |
| **RADIO** | $49,913 | **$37,824** | $18,180 | 🟡 2.1x | $117,861 |
| **IMPERMEABLE** | $25,710 | **$19,140** | $8,468 | 🟡 2.3x | $1,280,590 |

**Utilidad de la ventana: $4,207,197** ($601,028/dia)

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo V10 | $30,000/ud desde el 2026-10-15 (antes $32,000) | `bot/src/catalogo.js` costoUnitario |
| costo Q58 Max | $43,000/ud desde el 2026-10-15 (antes $45,000) | `bot/src/catalogo.js` costoUnitario |
| costo radios BF-777S | $40,000/caja de 2 · envio gratis, se resta el flete real de 1 paquete | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre (su tasa propia madura ~22-oct) y el Q58 el 16-oct (~7-nov). Mientras tanto, sus colchones son los numeros menos firmes de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
