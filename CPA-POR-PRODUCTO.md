# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-05 12:22 Bogota.** Ventana **2026-10-29 a 2026-11-04** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $725,658 | 1391 | 84 | **$8,639** | $522 | 6.04% | $10,253,000 |
| **Q58** | $724,341 | 1594 | 66 | **$10,975** | $454 | 4.14% | $9,904,000 |
| **RADIO** | $765,722 | 652 | 33 | **$23,204** | $1,174 | 5.06% | $4,567,000 |
| **IMPERMEABLE** | $845,806 | 1701 | 77 | **$10,984** | $497 | 4.53% | $6,698,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,061,527** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 8 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780890390` -> {'Q58': 60, 'V10': 1}
- `120249619616140390` -> {'V10': 139, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 99, 'Q58': 3}
- `120250016232010390` -> {'RADIO': 19, 'Q58': 1}
- `120250016231990390` -> {'Q58': 1, 'RADIO': 8}
- `120250027970510390` -> {'Q58': 30, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 111, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 9 | $9,532 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 3 | $32,747 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 11 | $10,125 | $131,600 | 12 | $10,967 |
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,281 | 13 | $9,483 |
| 2026-11-04 | $91,220 | 13 | $7,017 | $83,822 | 9 | $9,314 | $91,404 | 2 | $45,702 | $96,573 | 11 | $8,779 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,799 | **$27,700** | $8,639 | 🟢 3.2x | $1,601,171 |
| **Q58** | $40,907 | **$30,871** | $10,975 | 🟡 2.8x | $1,313,170 |
| **RADIO** | $48,432 | **$36,681** | $23,204 | 🟡 1.6x | $444,750 |
| **IMPERMEABLE** | $25,223 | **$18,764** | $10,984 | 🟡 1.7x | $598,990 |

**Utilidad de la ventana: $3,958,081** ($565,440/dia)

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
