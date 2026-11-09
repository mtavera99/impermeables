# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-09 14:46 Bogota.** Ventana **2026-11-02 a 2026-11-08** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $742,971 | 1497 | 95 | **$7,821** | $496 | 6.35% | $11,621,000 |
| **Q58** | $767,367 | 1518 | 70 | **$10,962** | $506 | 4.61% | $10,462,000 |
| **RADIO** | $737,489 | 640 | 38 | **$19,408** | $1,152 | 5.94% | $5,382,000 |
| **IMPERMEABLE** | $877,522 | 1861 | 110 | **$7,977** | $472 | 5.91% | $9,678,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,125,349** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 8 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120250016232010390` -> {'RADIO': 37, 'Q58': 1}
- `120249894780890390` -> {'Q58': 69, 'V10': 1}
- `120249619616140390` -> {'V10': 165, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250016231990390` -> {'RADIO': 15, 'Q58': 1}
- `120249619832930390` -> {'V10': 113, 'Q58': 4}
- `120249619720720390` -> {'V10': 116, 'Q58': 1}
- `120250027970510390` -> {'Q58': 35, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,338 | 14 | $7,953 | $116,327 | 8 | $14,541 | $114,261 | 6 | $19,044 | $134,713 | 16 | $8,420 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,751 | **$27,663** | $7,821 | 🟢 3.5x | $1,884,998 |
| **Q58** | $40,994 | **$30,938** | $10,962 | 🟡 2.8x | $1,398,312 |
| **RADIO** | $49,310 | **$37,358** | $19,408 | 🟡 1.9x | $682,129 |
| **IMPERMEABLE** | $25,157 | **$18,713** | $7,977 | 🟡 2.3x | $1,180,870 |

**Utilidad de la ventana: $5,146,309** ($735,187/dia)

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
