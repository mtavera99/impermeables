# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-27 10:20 Bogota.** Ventana **2026-10-20 a 2026-10-26** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $728,721 | 1433 | 78 | **$9,343** | $509 | 5.44% | $9,540,000 |
| **Q58** | $689,659 | 1716 | 72 | **$9,579** | $402 | 4.20% | $10,767,000 |
| **RADIO** | $179,393 | 221 | 9 | **$19,933** | $812 | 4.07% | $1,231,000 |
| **IMPERMEABLE** | $1,018,492 | 2314 | 104 | **$9,793** | $440 | 4.49% | $9,765,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,616,265** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 21 |
| anuncios con pedidos de MAS de un producto | 3 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 96, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 79, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $0 | 0 | — | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $0 | 0 | — | $155,630 | 17 | $9,155 |
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,879 | 23 | $6,125 |
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 10 | $8,541 | $0 | 0 | — | $126,349 | 17 | $7,432 |
| 2026-10-24 | $97,013 | 7 | $13,859 | $93,988 | 7 | $13,427 | $56,108 | 1 | $56,108 | $137,755 | 9 | $15,306 |
| 2026-10-25 | $112,119 | 9 | $12,458 | $92,001 | 10 | $9,200 | $53,118 | 5 | $10,624 | $146,575 | 14 | $10,470 |
| 2026-10-26 | $124,597 | 15 | $8,306 | $120,080 | 16 | $7,505 | $70,167 | 3 | $23,389 | $170,016 | 13 | $13,078 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,110 | **$27,940** | $9,343 | 🟡 3.0x | $1,450,599 |
| **Q58** | $40,378 | **$30,463** | $9,579 | 🟢 3.2x | $1,503,671 |
| **RADIO** | $47,114 | **$35,663** | $19,933 | 🟡 1.8x | $141,577 |
| **IMPERMEABLE** | $25,325 | **$18,842** | $9,793 | 🟡 1.9x | $941,085 |

**Utilidad de la ventana: $4,036,931** ($576,704/dia)

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
