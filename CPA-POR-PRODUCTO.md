# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-24 04:01 Bogota.** Ventana **2026-10-17 a 2026-10-23** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $659,623 | 1446 | 75 | **$8,795** | $456 | 5.19% | $9,163,000 |
| **Q58** | $632,116 | 1506 | 75 | **$8,428** | $420 | 4.98% | $11,257,000 |
| **RADIO** | $0 | 0 | 0 | **$0** | $0 | 0.00% | $0 |
| **IMPERMEABLE** | $1,089,797 | 2485 | 136 | **$8,013** | $439 | 5.47% | $12,905,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,381,536** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 16 |
| anuncios con pedidos de MAS de un producto | 2 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 68, 'Q58': 1}
- `120249619616140390` -> {'V10': 83, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-17 | $80,209 | 10 | $8,021 | $61,924 | 11 | $5,629 | $0 | 0 | — | $168,757 | 29 | $5,819 |
| 2026-10-18 | $99,086 | 12 | $8,257 | $97,968 | 8 | $12,246 | $0 | 0 | — | $190,236 | 13 | $14,634 |
| 2026-10-19 | $86,200 | 6 | $14,367 | $89,369 | 16 | $5,586 | $0 | 0 | — | $167,897 | 24 | $6,996 |
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $0 | 0 | — | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $0 | 0 | — | $155,630 | 17 | $9,155 |
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,864 | 23 | $6,125 |
| 2026-10-23 | $84,562 | 7 | $12,080 | $84,679 | 11 | $7,698 | $0 | 0 | — | $125,125 | 19 | $6,586 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,736 | **$27,652** | $8,795 | 🟢 3.1x | $1,414,241 |
| **Q58** | $40,530 | **$30,580** | $8,428 | 🟢 3.6x | $1,661,397 |
| **IMPERMEABLE** | $25,821 | **$19,225** | $8,013 | 🟡 2.4x | $1,524,758 |

**Utilidad de la ventana: $4,600,396** ($657,199/dia)

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
