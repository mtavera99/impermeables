# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-26 13:58 Bogota.** Ventana **2026-11-19 a 2026-11-25** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $741,120 | 1376 | 74 | **$10,015** | $539 | 5.38% | $8,971,000 |
| **Q58** | $744,306 | 1119 | 47 | **$15,836** | $665 | 4.20% | $7,114,000 |
| **RADIO** | $856,958 | 588 | 46 | **$18,630** | $1,457 | 7.82% | $7,394,000 |
| **IMPERMEABLE** | $832,434 | 1131 | 59 | **$14,109** | $736 | 5.22% | $5,458,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,174,818** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $1,148 |
| anuncios clasificados por la forma de sus pedidos | 32 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $1,148 | 0 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619720720390` -> {'V10': 144, 'Q58': 1}
- `120250027970510390` -> {'Q58': 54, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 109, 'V10': 3}
- `120249499375070390` -> {'IMPERMEABLE': 245, 'V10': 1}
- `120250016232010390` -> {'RADIO': 93, 'Q58': 1}
- `120249619832930390` -> {'V10': 164, 'Q58': 6}
- `120250016231990390` -> {'RADIO': 30, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 144, 'V10': 1}
- `120249894780920390` -> {'Q58': 84, 'V10': 1}
- `120249619616140390` -> {'V10': 229, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,327 | 5 | $18,865 | $110,120 | 7 | $15,731 |
| 2026-11-20 | $108,962 | 9 | $12,107 | $95,116 | 5 | $19,023 | $88,324 | 2 | $44,162 | $112,539 | 8 | $14,067 |
| 2026-11-21 | $103,590 | 10 | $10,359 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,645 | 12 | $11,054 | $134,506 | 7 | $19,215 | $173,775 | 8 | $21,722 | $155,712 | 13 | $11,978 |
| 2026-11-23 | $122,028 | 11 | $11,093 | $136,682 | 9 | $15,187 | $168,046 | 10 | $16,805 | $142,701 | 12 | $11,892 |
| 2026-11-24 | $104,607 | 8 | $13,076 | $115,612 | 11 | $10,510 | $128,146 | 3 | $42,715 | $110,746 | 6 | $18,458 |
| 2026-11-25 | $67,893 | 10 | $6,789 | $73,725 | 3 | $24,575 | $101,269 | 8 | $12,659 | $89,788 | 5 | $17,958 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,257 | **$28,053** | $10,015 | 🟡 2.8x | $1,334,821 |
| **Q58** | $40,912 | **$30,875** | $15,836 | 🟡 1.9x | $706,819 |
| **RADIO** | $56,697 | **$43,061** | $18,630 | 🟡 2.3x | $1,123,856 |
| **IMPERMEABLE** | $25,025 | **$18,610** | $14,109 | 🔴 1.3x | $265,579 |

**Utilidad de la ventana: $3,431,075** ($490,154/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-19 a 2026-11-22 · mitad 2: 2026-11-23 a 2026-11-25. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $239,849 | 325 | 18 | **$13,325** | 5.5% | $16,053 | 🔴 83% | $11,751 → $16,472 | 6.5% → 4.3% | $766 → $701 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $162,431 | 270 | 11 | **$14,766** | 4.1% | $21,257 | 🟡 69% | $13,692 → $16,647 | 3.9% → 4.4% | $532 → $740 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $137,171 | 202 | 12 | **$11,431** | 5.9% | $18,881 | 🟡 61% | $16,171 → $8,045 | 4.2% → 8.5% | $674 → $687 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $136,935 | 171 | 7 | **$19,562** | 4.1% | $20,639 | 🔴 95% | $16,463 → $27,310 | 4.6% → 3.2% | $762 → $867 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $102,975 | 103 | 3 | **$34,325** | 2.9% | $17,552 | 🔴 196% | $18,050 → $66,876 | 4.7% → 1.7% | $840 → $1,115 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $53,073 | 60 | 4 | **$13,268** | 6.7% | $20,131 | 🟡 66% | $13,268 → — | 6.7% → — | $885 → — |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $201,499 | 218 | 13 | **$15,500** | 6.0% | $32,260 | 🟢 48% | $28,764 → $9,605 | 3.4% → 9.0% | $975 → $864 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $194,575 | 231 | 13 | **$14,967** | 5.6% | $31,085 | 🟢 48% | $12,268 → $21,042 | 6.6% → 4.3% | $806 → $895 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $175,465 | 517 | 9 | **$19,496** | 1.7% | $30,550 | 🟡 64% | $23,117 → $16,599 | 1.4% → 2.2% | $320 → $364 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $172,767 | 153 | 10 | **$17,277** | 6.5% | $30,943 | 🟡 56% | $16,726 → $18,103 | 6.7% → 6.2% | $1,128 → $1,131 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $326,520 | 239 | 26 | **$12,558** | 10.9% | $42,681 | 🟢 29% | $11,952 → $13,529 | 11.9% → 9.5% | $1,427 → $1,288 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $209,983 | 131 | 6 | **$34,997** | 4.6% | $35,251 | 🔴 99% | $39,102 → $32,945 | 3.6% → 5.3% | $1,422 → $1,734 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $179,569 | 81 | 3 | **$59,856** | 3.7% | $31,342 | 🔴 191% | $106,932 → $36,318 | 1.8% → 7.7% | $1,944 → $2,794 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $136,635 | 136 | 6 | **$22,772** | 4.4% | $54,463 | 🟢 42% | $19,720 → $28,878 | 4.6% → 4.1% | $907 → $1,179 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $4,251 | 1 | 0 | **sin pedidos** | 0.0% | $43,061 | 🔴 sin pedidos | sin pedidos → — | 0.0% → — | $4,251 → — |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $205,761 | 278 | 17 | **$12,104** | 6.1% | $27,980 | 🟢 43% | $12,163 → $12,019 | 5.6% → 7.0% | $683 → $841 |
| V10 | Motorizados - INTER · _LA RUTA_ | $193,264 | 353 | 19 | **$10,172** | 5.4% | $27,738 | 🟢 37% | $9,896 → $10,551 | 5.3% → 5.4% | $528 → $574 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $157,747 | 428 | 9 | **$17,527** | 2.1% | $27,796 | 🟡 63% | $21,948 → $13,991 | 1.5% → 3.0% | $338 → $416 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $94,170 | 104 | 14 | **$6,726** | 13.5% | $27,630 | 🟢 24% | $7,244 → $0 | 12.5% → — | $905 → — |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $90,178 | 213 | 7 | **$12,883** | 3.3% | $27,747 | 🟢 46% | $11,381 → $14,009 | 3.5% → 3.1% | $402 → $438 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $579 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $296 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $273 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | 11-25 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $659 · 3 · $10,098 | $663 · 5 · $6,499 | $830 · 1 · $33,196 | $919 · 3 · $15,010 | $604 · 5 · $8,094 | $829 · 1 · $31,487 | $747 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $680 · 0 · — | $578 · 1 · $24,270 | $650 · 2 · $10,726 | $400 · 4 · $7,601 | $730 · 3 · $9,251 | $773 · 0 · — | $717 · 1 · $17,204 |
| IMPERMEABLE · Motorizados - API | $697 · 1 · $17,435 | $997 · 0 · — | $517 · 1 · $18,603 | $647 · 3 · $8,622 | $556 · 2 · $11,666 | $946 · 4 · $4,495 | $715 · 1 · $15,006 |
| IMPERMEABLE · TEST Creativos - API | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 | $780 · 1 · $25,748 | $647 · 1 · $24,575 | $1,383 · 0 · — | $1,006 · 1 · $12,067 |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | $826 · 1 · $7,433 | $843 · 1 · $28,666 | $830 · 0 · — | $1,667 · 0 · — | $1,242 · 1 · $18,634 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $859 · 2 · $12,031 | $1,010 · 1 · $19,192 | $755 · 0 · — | — | — | — | — |
| Q58 · Domiciliarios VIDEO Q58 - | $891 · 0 · — | $1,035 · 1 · $28,969 | $949 · 2 · $14,230 | $1,017 · 1 · $33,569 | $759 · 5 · $7,286 | $937 · 4 · $7,496 | $1,001 · 0 · — |
| Q58 · Motorizados - Q58 | $664 · 5 · $5,047 | $739 · 1 · $26,614 | $784 · 0 · — | $1,124 · 3 · $10,117 | $938 · 1 · $36,576 | $972 · 3 · $9,073 | $755 · 0 · — |
| Q58 · Domiciliarios - Expancion - Q58 | $326 · 0 · — | $240 · 0 · — | $362 · 2 · $9,060 | $346 · 2 · $19,717 | $319 · 1 · $32,257 | $476 · 1 · $32,367 | $311 · 3 · $6,124 |
| Q58 · Domiciliarios Q58 - | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 | $1,112 · 0 · — | $1,005 · 1 · $31,151 | $982 · 1 · $31,420 | $1,240 · 3 · $8,680 | $1,359 · 0 · — |
| RADIO · RADIO - Seguridad / Negocios | $1,121 · 4 · $9,806 | $2,176 · 1 · $47,868 | $1,409 · 6 · $7,280 | $1,314 · 5 · $12,091 | $1,159 · 5 · $11,355 | $2,019 · 2 · $21,198 | $1,032 · 3 · $12,040 |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | — | $1,296 · 1 · $16,852 | $1,461 · 1 · $61,352 | $1,586 · 2 · $27,759 | $2,602 · 0 · — | $1,385 · 2 · $17,312 |
| RADIO · RADIO - Moteros | $1,834 · 1 · $31,186 | $1,894 · 0 · — | $1,934 · 0 · — | $2,147 · 0 · — | $4,331 · 1 · $30,320 | $1,886 · 1 · $26,409 | $3,182 · 0 · — |
| RADIO · RADIO - Fincas | $756 · 0 · — | $609 · 0 · — | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,057 | $1,413 · 1 · $25,435 | $1,475 · 0 · — | $769 · 1 · $14,617 |
| RADIO · RADIO - Broad | $4,251 · 0 · — | — | — | — | — | — | — |
| V10 · Domiciliarios - Expancion - INTER | $728 · 3 · $9,218 | $633 · 4 · $6,804 | $661 · 0 · — | $712 · 3 · $12,110 | $668 · 5 · $7,212 | $1,413 · 0 · — | $762 · 2 · $9,909 |
| V10 · Motorizados - INTER | $475 · 2 · $11,164 | $515 · 1 · $22,124 | $519 · 4 · $6,493 | $582 · 4 · $9,608 | $627 · 1 · $34,479 | $544 · 1 · $30,451 | $541 · 6 · $3,246 |
| V10 · Domiciliarios INTER - API | $339 · 2 · $8,642 | $327 · 1 · $18,333 | $311 · 0 · — | $365 · 1 · $31,374 | $414 · 1 · $28,956 | $392 · 2 · $12,348 | $466 · 2 · $8,150 |
| V10 · Domiciliarios VIDEO INTER - API | $1,067 · 5 · $6,826 | $860 · 3 · $13,762 | $781 · 5 · $3,750 | — | — | — | — |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | $347 · 1 · $7,634 | $421 · 2 · $13,254 | $410 · 2 · $11,266 | $424 · 2 · $10,603 | $535 · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | — |

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
