# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-15 09:09 Bogota.** Ventana **2026-10-08 a 2026-10-14** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $553,439 | 1602 | 80 | **$6,918** | $345 | 4.99% | $9,747,000 |
| **IMPERMEABLE** | $1,063,365 | 2874 | 146 | **$7,283** | $370 | 5.08% | $13,073,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,616,804** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 12 |
| anuncios con pedidos de los DOS productos | 1 ⚠️ |
| pedidos resueltos por su anuncio (V10 de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de los DOS productos

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 44, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-10-08 | $78,985 | 12 | $6,582 | $151,678 | 23 | $6,595 |
| 2026-10-09 | $78,333 | 13 | $6,026 | $142,644 | 20 | $7,132 |
| 2026-10-10 | $65,830 | 7 | $9,404 | $119,454 | 13 | $9,189 |
| 2026-10-11 | $83,039 | 11 | $7,549 | $152,706 | 12 | $12,726 |
| 2026-10-12 | $86,217 | 11 | $7,838 | $178,038 | 24 | $7,418 |
| 2026-10-13 | $74,834 | 12 | $6,236 | $172,071 | 29 | $5,933 |
| 2026-10-14 | $86,201 | 14 | $6,157 | $146,774 | 25 | $5,871 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,794 | **$24,608** | $6,918 | 🟢 3.6x | $1,415,239 |
| **IMPERMEABLE** | $24,981 | **$18,577** | $7,283 | 🟡 2.6x | $1,648,850 |

**Utilidad de la ventana: $3,064,089** ($437,727/dia)

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
