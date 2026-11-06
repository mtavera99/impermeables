# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-06 11:44 Bogota.** Ventana **2026-10-30 a 2026-11-05** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $745,440 | 1410 | 90 | **$8,283** | $529 | 6.38% | $10,979,000 |
| **Q58** | $754,553 | 1518 | 66 | **$11,433** | $497 | 4.35% | $9,922,000 |
| **RADIO** | $764,396 | 658 | 31 | **$24,658** | $1,162 | 4.71% | $4,229,000 |
| **IMPERMEABLE** | $871,215 | 1750 | 83 | **$10,497** | $498 | 4.74% | $7,101,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,135,604** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 8 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 106, 'Q58': 4}
- `120250016232010390` -> {'RADIO': 24, 'Q58': 1}
- `120249619616140390` -> {'V10': 151, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 113, 'Q58': 1}
- `120250016231990390` -> {'RADIO': 9, 'Q58': 1}
- `120249894780890390` -> {'Q58': 61, 'V10': 1}
- `120250027970510390` -> {'Q58': 31, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 9 | $9,532 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 3 | $32,747 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 11 | $10,125 | $131,600 | 12 | $10,967 |
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,009 | 2 | $46,004 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,632 | 23 | $5,288 | $128,517 | 11 | $11,683 | $113,598 | 5 | $22,720 | $147,892 | 17 | $8,700 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,798 | **$27,699** | $8,283 | 🟢 3.3x | $1,747,457 |
| **Q58** | $40,859 | **$30,834** | $11,433 | 🟡 2.7x | $1,280,522 |
| **RADIO** | $47,537 | **$35,990** | $24,658 | 🔴 1.5x | $351,285 |
| **IMPERMEABLE** | $24,704 | **$18,363** | $10,497 | 🟡 1.7x | $652,881 |

**Utilidad de la ventana: $4,032,145** ($576,021/dia)

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
