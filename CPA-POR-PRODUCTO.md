# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-10 12:00 Bogota.** Ventana **2026-11-03 a 2026-11-09** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $729,469 | 1473 | 98 | **$7,444** | $495 | 6.65% | $11,978,000 |
| **Q58** | $752,519 | 1467 | 67 | **$11,232** | $513 | 4.57% | $10,079,000 |
| **RADIO** | $719,572 | 639 | 41 | **$17,551** | $1,126 | 6.42% | $5,949,000 |
| **IMPERMEABLE** | $863,094 | 1808 | 112 | **$7,706** | $477 | 6.19% | $10,029,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,064,654** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 9 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120250027970510390` -> {'Q58': 36, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 72, 'V10': 1}
- `120249619616140390` -> {'V10': 174, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 116, 'Q58': 4}
- `120250016232010390` -> {'RADIO': 38, 'Q58': 1}
- `120249894780920390` -> {'V10': 1, 'Q58': 54}
- `120250016231990390` -> {'RADIO': 15, 'Q58': 1}
- `120249619720720390` -> {'V10': 116, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,402 | 6 | $19,067 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,438 | 13 | $8,803 | $117,985 | 7 | $16,855 | $109,995 | 7 | $15,714 | $127,535 | 18 | $7,085 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,768 | **$27,676** | $7,444 | 🟢 3.7x | $1,982,783 |
| **Q58** | $41,049 | **$30,981** | $11,232 | 🟡 2.8x | $1,323,214 |
| **RADIO** | $51,452 | **$39,012** | $17,551 | 🟡 2.2x | $879,938 |
| **IMPERMEABLE** | $25,363 | **$18,871** | $7,706 | 🟡 2.4x | $1,250,507 |

**Utilidad de la ventana: $5,436,442** ($776,635/dia)

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
