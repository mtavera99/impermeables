# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-10-30 10:55 Bogota.** Ventana **2026-10-23 a 2026-10-29** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $708,330 | 1405 | 88 | **$8,049** | $504 | 6.26% | $10,762,000 |
| **Q58** | $678,569 | 1847 | 78 | **$8,700** | $367 | 4.22% | $11,775,000 |
| **RADIO** | $510,860 | 517 | 24 | **$21,286** | $988 | 4.64% | $3,256,000 |
| **IMPERMEABLE** | $947,634 | 2071 | 92 | **$10,300** | $458 | 4.44% | $8,646,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,845,393** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 22 |
| anuncios con pedidos de MAS de un producto | 5 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780890390` -> {'Q58': 42, 'V10': 1}
- `120250027970510390` -> {'Q58': 16, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 89, 'Q58': 2}
- `120249619616140390` -> {'V10': 111, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 10 | $8,541 | $0 | 0 | — | $126,349 | 16 | $7,897 |
| 2026-10-24 | $97,013 | 7 | $13,859 | $93,988 | 7 | $13,427 | $56,108 | 1 | $56,108 | $137,755 | 8 | $17,219 |
| 2026-10-25 | $112,119 | 9 | $12,458 | $92,001 | 10 | $9,200 | $53,118 | 5 | $10,624 | $146,575 | 14 | $10,470 |
| 2026-10-26 | $124,687 | 15 | $8,312 | $120,150 | 16 | $7,509 | $70,267 | 3 | $23,422 | $170,157 | 13 | $13,089 |
| 2026-10-27 | $93,004 | 15 | $6,200 | $89,044 | 10 | $8,904 | $85,964 | 3 | $28,655 | $130,310 | 22 | $5,923 |
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,769 | 17 | $5,986 | $98,247 | 12 | $8,187 | $114,854 | 7 | $16,408 | $122,539 | 11 | $11,140 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,107 | **$27,938** | $8,049 | 🟢 3.5x | $1,750,184 |
| **Q58** | $40,757 | **$30,756** | $8,700 | 🟢 3.5x | $1,720,392 |
| **RADIO** | $46,093 | **$34,875** | $21,286 | 🟡 1.6x | $326,139 |
| **IMPERMEABLE** | $25,913 | **$19,296** | $10,300 | 🟡 1.9x | $827,590 |

**Utilidad de la ventana: $4,624,304** ($660,615/dia)

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
