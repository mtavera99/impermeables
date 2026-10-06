# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-06 10:55 Bogota.** Ventana **2026-09-29 a 2026-10-05** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $587,716 | 1849 | 113 | **$5,201** | $318 | 6.11% | $13,677,000 |
| **IMPERMEABLE** | $1,060,743 | 2309 | 104 | **$10,199** | $459 | 4.50% | $9,305,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,648,459** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 10 |
| anuncios con pedidos de los DOS productos | 0 ✅ |
| pedidos resueltos por su anuncio (V10 de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

🔴 **1 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-09-29 | $112,336 | 16 | $7,021 | $122,114 | 8 | $15,264 |
| 2026-09-30 | $91,930 | 12 | $7,661 | $162,550 | 22 | $7,389 |
| 2026-10-01 | $71,550 | 12 | $5,962 | $136,566 | 12 | $11,380 |
| 2026-10-02 | $63,968 | 11 | $5,815 | $143,504 | 13 | $11,039 |
| 2026-10-03 | $54,276 | 21 | $2,585 | $127,744 | 17 | $7,514 |
| 2026-10-04 | $101,380 | 23 | $4,408 | $188,117 | 20 | $9,406 |
| 2026-10-05 | $92,276 | 18 | $5,126 | $180,148 | 12 | $15,012 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,909 | **$24,697** | $5,201 | 🟢 4.7x | $2,202,994 |
| **IMPERMEABLE** | $25,318 | **$18,836** | $10,199 | 🟡 1.8x | $898,239 |

**Utilidad de la ventana: $3,101,233** ($443,033/dia)

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo intercomunicador | $32,000/ud | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre, asi que su tasa propia no madura hasta ~22-oct. Mientras tanto, su colchon es el numero menos firme de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
