# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-03 03:18 Bogota.** Ventana **2026-10-20 a 2026-11-02** (solo dias cerrados).
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

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $499,918 | 909 | 29 | **$17,239** | 3.2% | $18,031 | 🔴 96% | $14,163 → $24,073 | 3.7% → 2.4% | $524 → $589 |
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $487,563 | 1103 | 44 | **$11,081** | 4.0% | $19,169 | 🟡 58% | $11,253 → $10,909 | 3.8% → 4.3% | $422 → $464 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $343,835 | 694 | 24 | **$14,326** | 3.5% | $19,529 | 🟡 73% | $15,891 → $12,478 | 3.0% → 4.2% | $477 → $526 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $278,229 | 813 | 44 | **$6,323** | 5.4% | $20,245 | 🟢 31% | $5,845 → $6,897 | 5.6% → 5.2% | $328 → $358 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $278,228 | 614 | 29 | **$9,594** | 4.7% | $18,743 | 🟡 51% | $8,292 → $11,439 | 5.2% → 4.2% | $432 → $477 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $350,855 | 455 | 39 | **$8,996** | 8.6% | $31,016 | 🟢 29% | $9,500 → $8,517 | 8.4% → 8.7% | $802 → $741 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $350,173 | 1435 | 41 | **$8,541** | 2.9% | $30,535 | 🟢 28% | $7,199 → $10,637 | 2.7% → 3.2% | $193 → $338 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $348,907 | 532 | 28 | **$12,461** | 5.3% | $30,723 | 🟢 41% | $8,932 → $18,813 | 7.3% → 3.5% | $654 → $658 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $251,588 | 936 | 27 | **$9,318** | 2.9% | $30,493 | 🟢 31% | $10,634 → $8,942 | 2.8% → 2.9% | $300 → $260 |
| Q58 | Domiciliarios - Expancion - Q58 · _COMBO DOS_ | $104,664 | 100 | 3 | **$34,888** | 3.0% | $25,567 | 🔴 136% | $34,888 → — | 3.0% → — | $1,047 → — |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $302,726 | 320 | 18 | **$16,818** | 5.6% | $43,209 | 🟢 39% | $22,268 → $15,728 | 4.3% → 6.0% | $954 → $944 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $253,315 | 194 | 15 | **$16,888** | 7.7% | $26,523 | 🟡 64% | $19,533 → $16,226 | 4.9% → 9.0% | $961 → $1,464 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $208,242 | 143 | 4 | **$52,060** | 2.8% | $28,475 | 🔴 183% | — → $52,060 | — → 2.8% | — → $1,456 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $199,939 | 241 | 7 | **$28,563** | 2.9% | $40,073 | 🟡 71% | $18,030 → $36,462 | 3.3% → 2.6% | $601 → $966 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $410,133 | 678 | 58 | **$7,071** | 8.6% | $28,517 | 🟢 25% | $6,274 → $7,868 | 9.6% → 7.7% | $603 → $607 |
| V10 | Motorizados - INTER · _LA RUTA_ | $353,504 | 617 | 30 | **$11,783** | 4.9% | $27,701 | 🟢 43% | $10,586 → $13,350 | 5.6% → 4.2% | $592 → $554 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $353,134 | 552 | 32 | **$11,035** | 5.8% | $27,696 | 🟢 40% | $12,242 → $9,971 | 5.2% → 6.5% | $635 → $645 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $331,580 | 985 | 36 | **$9,211** | 3.7% | $28,394 | 🟢 32% | $14,098 → $6,448 | 2.4% → 5.1% | $341 → $332 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - Expancion - API | $671 · 1 · $33,541 | $746 · 0 · — | $466 · 1 · $30,270 | $657 · 0 · — | $553 · 0 · — | $650 · 5 · $6,243 | $498 · 2 · $16,670 |
| IMPERMEABLE · Domiciliarios - API | $371 · 3 · $11,752 | $379 · 2 · $15,542 | $543 · 3 · $11,047 | $452 · 4 · $7,802 | $439 · 1 · $32,898 | $541 · 2 · $18,681 | $592 · 7 · $5,579 |
| IMPERMEABLE · TEST Creativos - API | $387 · 4 · $5,413 | $574 · 1 · $18,938 | $508 · 2 · $9,904 | $726 · 0 · — | $541 · 3 · $5,952 | $623 · 0 · — | $499 · 1 · $21,954 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $308 · 6 · $3,236 | $355 · 5 · $3,477 | $423 · 2 · $10,352 | $415 · 1 · $16,610 | $340 · 0 · — | $412 · 2 · $10,084 | $310 · 4 · $5,897 |
| IMPERMEABLE · Motorizados - API | $359 · 5 · $4,089 | $459 · 0 · — | $524 · 1 · $18,847 | $566 · 1 · $18,102 | $497 · 1 · $18,371 | $479 · 3 · $7,019 | $523 · 1 · $23,012 |
| Q58 · Domiciliarios VIDEO Q58 - | $691 · 3 · $7,826 | $913 · 4 · $5,704 | $733 · 4 · $6,410 | $586 · 3 · $7,421 | $843 · 1 · $23,606 | $678 · 3 · $8,820 | $841 · 2 · $13,042 |
| Q58 · Domiciliarios Q58 - | $202 · 2 · $11,824 | $199 · 5 · $4,660 | $193 · 3 · $8,938 | $183 · 0 · — | $1,927 · 1 · $30,833 | $1,379 · 0 · — | $1,398 · 5 · $7,268 |
| Q58 · Motorizados - Q58 | $607 · 2 · $11,228 | $631 · 0 · — | $633 · 1 · $20,878 | $616 · 3 · $8,828 | $738 · 1 · $26,576 | $628 · 1 · $29,523 | $740 · 2 · $18,488 |
| Q58 · Domiciliarios - Expancion - Q58 | $250 · 3 · $6,487 | $326 · 3 · $9,456 | $252 · 3 · $8,386 | $267 · 3 · $7,648 | $268 · 5 · $5,204 | $253 · 2 · $16,686 | $227 · 2 · $16,226 |
| RADIO · RADIO - Seguridad / Negocios | $1,001 · 1 · $21,016 | $736 · 0 · — | $770 · 3 · $8,989 | $1,078 · 2 · $16,177 | $833 · 1 · $35,825 | $883 · 5 · $9,362 | $1,474 · 3 · $15,234 |
| RADIO · RADIO - Moteros | $1,162 · 1 · $13,945 | $1,514 · 1 · $22,712 | $1,349 · 3 · $6,744 | $1,068 · 1 · $29,900 | $1,791 · 2 · $15,224 | $1,422 · 4 · $8,888 | $1,997 · 0 · — |
| RADIO · RADIO - Broad | $1,440 · 1 · $35,992 | $1,612 · 2 · $29,018 | $1,310 · 1 · $49,787 | $1,802 · 0 · — | $1,668 · 0 · — | $1,112 · 0 · — | $1,142 · 0 · — |
| RADIO · RADIO - Fincas | $751 · 0 · — | $752 · 2 · $11,277 | $1,545 · 0 · — | $1,153 · 0 · — | $945 · 0 · — | $1,119 · 2 · $8,393 | $914 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $642 · 3 · $6,847 | $547 · 6 · $5,287 | $500 · 8 · $3,941 | $702 · 4 · $8,421 | $521 · 2 · $15,098 | $723 · 2 · $19,151 | $659 · 4 · $10,550 |
| V10 · Motorizados - INTER | $532 · 2 · $13,023 | $547 · 5 · $4,597 | $496 · 2 · $12,392 | $869 · 0 · — | $539 · 1 · $22,648 | $494 · 1 · $28,634 | $569 · 2 · $13,366 |
| V10 · Domiciliarios - Expancion - INTER | $499 · 3 · $7,825 | $643 · 3 · $6,863 | $685 · 5 · $5,072 | $557 · 3 · $7,239 | $1,062 · 1 · $23,361 | $810 · 1 · $23,486 | $553 · 1 · $31,523 |
| V10 · Domiciliarios INTER - API | $319 · 5 · $4,588 | $322 · 4 · $4,754 | $322 · 3 · $6,770 | $295 · 3 · $6,389 | $462 · 2 · $10,395 | $284 · 3 · $6,521 | $358 · 3 · $8,841 |

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
