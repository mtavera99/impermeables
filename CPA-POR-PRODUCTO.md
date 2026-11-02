# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-02 14:28 Bogota.** Ventana **2026-10-26 a 2026-11-01** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $717,247 | 1411 | 91 | **$7,882** | $508 | 6.45% | $11,089,000 |
| **Q58** | $704,758 | 1822 | 75 | **$9,397** | $387 | 4.12% | $11,390,000 |
| **RADIO** | $728,516 | 665 | 37 | **$19,690** | $1,096 | 5.56% | $5,083,000 |
| **IMPERMEABLE** | $898,348 | 1880 | 83 | **$10,823** | $478 | 4.41% | $7,543,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,048,869** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 6 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619720720390` -> {'V10': 106, 'Q58': 1}
- `120249894780890390` -> {'Q58': 49, 'V10': 1}
- `120250027970510390` -> {'Q58': 25, 'IMPERMEABLE': 1}
- `120249619616140390` -> {'V10': 119, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 92, 'Q58': 3}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-26 | $124,687 | 15 | $8,312 | $120,150 | 16 | $7,509 | $70,267 | 3 | $23,422 | $170,157 | 13 | $13,089 |
| 2026-10-27 | $93,004 | 15 | $6,200 | $89,044 | 10 | $8,904 | $85,964 | 3 | $28,655 | $130,310 | 22 | $5,923 |
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 10 | $8,579 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 4 | $24,560 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 12 | $9,282 | $131,600 | 15 | $8,773 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,166 | **$27,983** | $7,882 | 🟢 3.6x | $1,829,225 |
| **Q58** | $40,826 | **$30,809** | $9,397 | 🟢 3.3x | $1,605,917 |
| **RADIO** | $47,214 | **$35,740** | $19,690 | 🟡 1.8x | $593,881 |
| **IMPERMEABLE** | $25,909 | **$19,293** | $10,823 | 🟡 1.8x | $702,982 |

**Utilidad de la ventana: $4,732,005** ($676,001/dia)

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
