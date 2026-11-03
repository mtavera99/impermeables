# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-03 03:16 Bogota.** Ventana **2026-10-20 a 2026-11-02** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $1,448,351 | 2832 | 165 | **$8,778** | $511 | 5.83% | $20,137,000 |
| **Q58** | $1,406,187 | 3458 | 142 | **$9,903** | $407 | 4.11% | $21,308,000 |
| **RADIO** | $964,222 | 898 | 49 | **$19,678** | $1,074 | 5.46% | $6,751,000 |
| **IMPERMEABLE** | $1,887,773 | 4133 | 190 | **$9,936** | $457 | 4.60% | $17,576,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$5,706,533** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 6 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 94, 'Q58': 3}
- `120249619616140390` -> {'V10': 123, 'IMPERMEABLE': 1}
- `120250027970510390` -> {'Q58': 26, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'RADIO': 1, 'V10': 107, 'Q58': 1}
- `120249894780890390` -> {'Q58': 49, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $0 | 0 | — | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $0 | 0 | — | $155,630 | 17 | $9,155 |
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,879 | 23 | $6,125 |
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 10 | $8,541 | $0 | 0 | — | $126,349 | 16 | $7,897 |
| 2026-10-24 | $97,013 | 7 | $13,859 | $93,988 | 7 | $13,427 | $56,108 | 1 | $56,108 | $137,755 | 8 | $17,219 |
| 2026-10-25 | $112,119 | 9 | $12,458 | $92,001 | 10 | $9,200 | $53,118 | 5 | $10,624 | $146,575 | 14 | $10,470 |
| 2026-10-26 | $124,687 | 15 | $8,312 | $120,150 | 16 | $7,509 | $70,267 | 3 | $23,422 | $170,157 | 13 | $13,089 |
| 2026-10-27 | $93,004 | 15 | $6,200 | $89,044 | 10 | $8,904 | $85,964 | 3 | $28,655 | $130,310 | 22 | $5,923 |
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 10 | $8,579 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 4 | $24,560 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 12 | $9,282 | $131,600 | 15 | $8,773 |
| 2026-11-02 | $126,980 | 11 | $11,544 | $131,850 | 11 | $11,986 | $126,480 | 6 | $21,080 | $140,949 | 18 | $7,830 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,972 | **$27,834** | $8,778 | 🟢 3.2x | $3,144,243 |
| **Q58** | $40,588 | **$30,625** | $9,903 | 🟢 3.1x | $2,942,553 |
| **RADIO** | $47,690 | **$36,108** | $19,678 | 🟡 1.8x | $805,076 |
| **IMPERMEABLE** | $25,653 | **$19,095** | $9,936 | 🟡 1.9x | $1,740,265 |

**Utilidad de la ventana: $8,632,137** ($616,581/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-10-20 a 2026-10-26 · mitad 2: 2026-10-27 a 2026-11-02. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - Expancion - API | $499,918 | 909 | 29 | **$17,239** | 3.2% | 🔴 90% | $14,163 → $24,073 | 3.7% → 2.4% | $524 → $589 |
| IMPERMEABLE | Domiciliarios - API | $487,563 | 1103 | 44 | **$11,081** | 4.0% | 🟡 58% | $11,253 → $10,909 | 3.8% → 4.3% | $422 → $464 |
| IMPERMEABLE | TEST Creativos - API | $343,835 | 694 | 24 | **$14,326** | 3.5% | 🔴 75% | $15,891 → $12,478 | 3.0% → 4.2% | $477 → $526 |
| IMPERMEABLE | Domiciliarios VIDEO - API | $278,229 | 813 | 44 | **$6,323** | 5.4% | 🟢 33% | $5,845 → $6,897 | 5.6% → 5.2% | $328 → $358 |
| IMPERMEABLE | Motorizados - API | $278,228 | 614 | 29 | **$9,594** | 4.7% | 🟡 50% | $8,292 → $11,439 | 5.2% → 4.2% | $432 → $477 |
| Q58 | Domiciliarios VIDEO Q58 - | $350,855 | 455 | 39 | **$8,996** | 8.6% | 🟢 29% | $9,500 → $8,517 | 8.4% → 8.7% | $802 → $741 |
| Q58 | Domiciliarios Q58 - | $350,173 | 1435 | 41 | **$8,541** | 2.9% | 🟢 28% | $7,199 → $10,637 | 2.7% → 3.2% | $193 → $338 |
| Q58 | Motorizados - Q58 | $348,907 | 532 | 28 | **$12,461** | 5.3% | 🟢 41% | $8,932 → $18,813 | 7.3% → 3.5% | $654 → $658 |
| Q58 | Domiciliarios - Expancion - Q58 | $251,588 | 936 | 27 | **$9,318** | 2.9% | 🟢 30% | $10,634 → $8,942 | 2.8% → 2.9% | $300 → $260 |
| Q58 | Domiciliarios - Expancion - Q58 | $104,664 | 100 | 3 | **$34,888** | 3.0% | 🔴 114% | $34,888 → — | 3.0% → — | $1,047 → — |
| RADIO | RADIO - Seguridad / Negocios | $302,726 | 320 | 18 | **$16,818** | 5.6% | 🟢 47% | $22,268 → $15,728 | 4.3% → 6.0% | $954 → $944 |
| RADIO | RADIO - Moteros | $253,315 | 194 | 15 | **$16,888** | 7.7% | 🟢 47% | $19,533 → $16,226 | 4.9% → 9.0% | $961 → $1,464 |
| RADIO | RADIO - Broad | $208,242 | 143 | 4 | **$52,060** | 2.8% | 🔴 144% | — → $52,060 | — → 2.8% | — → $1,456 |
| RADIO | RADIO - Fincas | $199,939 | 241 | 7 | **$28,563** | 2.9% | 🔴 79% | $18,030 → $36,462 | 3.3% → 2.6% | $601 → $966 |
| V10 | Domiciliarios VIDEO INTER - API | $410,133 | 678 | 58 | **$7,071** | 8.6% | 🟢 25% | $6,274 → $7,868 | 9.6% → 7.7% | $603 → $607 |
| V10 | Motorizados - INTER | $353,504 | 617 | 30 | **$11,783** | 4.9% | 🟢 42% | $10,586 → $13,350 | 5.6% → 4.2% | $592 → $554 |
| V10 | Domiciliarios - Expancion - INTER | $353,134 | 552 | 32 | **$11,035** | 5.8% | 🟢 40% | $12,242 → $9,971 | 5.2% → 6.5% | $635 → $645 |
| V10 | Domiciliarios INTER - API | $331,580 | 985 | 36 | **$9,211** | 3.7% | 🟢 33% | $14,098 → $6,448 | 2.4% → 5.1% | $341 → $332 |

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
