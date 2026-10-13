# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-13 11:56 Bogota.** Ventana **2026-10-06 a 2026-10-12** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $533,004 | 1601 | 82 | **$6,500** | $333 | 5.12% | $10,064,000 |
| **IMPERMEABLE** | $1,044,748 | 2554 | 137 | **$7,626** | $409 | 5.36% | $12,228,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$1,577,752** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 11 |
| anuncios con pedidos de los DOS productos | 1 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de los DOS productos

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 43, 'IMPERMEABLE': 1}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|
| 2026-10-06 | $69,845 | 9 | $7,761 | $138,379 | 8 | $17,297 |
| 2026-10-07 | $70,755 | 13 | $5,443 | $161,849 | 27 | $5,994 |
| 2026-10-08 | $78,985 | 12 | $6,582 | $151,678 | 23 | $6,595 |
| 2026-10-09 | $78,333 | 14 | $5,595 | $142,644 | 22 | $6,484 |
| 2026-10-10 | $65,830 | 7 | $9,404 | $119,454 | 17 | $7,027 |
| 2026-10-11 | $83,039 | 14 | $5,931 | $152,706 | 13 | $11,747 |
| 2026-10-12 | $86,217 | 13 | $6,632 | $178,038 | 27 | $6,594 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $32,690 | **$24,528** | $6,500 | 🟢 3.8x | $1,478,303 |
| **IMPERMEABLE** | $25,221 | **$18,762** | $7,626 | 🟡 2.5x | $1,525,619 |

**Utilidad de la ventana: $3,003,921** ($429,132/dia)

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
