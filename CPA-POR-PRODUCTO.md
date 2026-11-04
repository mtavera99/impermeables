# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-04 12:12 Bogota.** Ventana **2026-10-28 a 2026-11-03** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $728,429 | 1421 | 91 | **$8,005** | $513 | 6.40% | $11,101,000 |
| **Q58** | $740,055 | 1713 | 70 | **$10,572** | $432 | 4.09% | $10,542,000 |
| **RADIO** | $804,484 | 692 | 36 | **$22,347** | $1,163 | 5.20% | $4,994,000 |
| **IMPERMEABLE** | $862,883 | 1745 | 74 | **$11,661** | $494 | 4.24% | $6,439,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,135,851** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 6 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 99, 'Q58': 3}
- `120249619616140390` -> {'V10': 135, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 56, 'V10': 1}
- `120249619720720390` -> {'V10': 111, 'Q58': 1}
- `120250027970510390` -> {'Q58': 29, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 9 | $9,532 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 3 | $32,747 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 11 | $10,125 | $131,600 | 12 | $10,967 |
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $100,813 | 20 | $5,041 | $111,574 | 12 | $9,298 | $104,146 | 3 | $34,715 | $122,982 | 13 | $9,460 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,824 | **$27,719** | $8,005 | 🟢 3.5x | $1,794,038 |
| **Q58** | $40,813 | **$30,798** | $10,572 | 🟡 2.9x | $1,415,838 |
| **RADIO** | $48,311 | **$36,587** | $22,347 | 🟡 1.6x | $512,644 |
| **IMPERMEABLE** | $25,314 | **$18,834** | $11,661 | 🟡 1.6x | $530,806 |

**Utilidad de la ventana: $4,253,326** ($607,618/dia)

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
