# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-24 15:08 Bogota.** Ventana **2026-11-17 a 2026-11-23** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $770,410 | 1434 | 85 | **$9,064** | $537 | 5.93% | $10,369,000 |
| **Q58** | $759,566 | 1212 | 46 | **$16,512** | $627 | 3.80% | $6,938,000 |
| **RADIO** | $829,261 | 587 | 48 | **$17,276** | $1,413 | 8.18% | $7,472,000 |
| **IMPERMEABLE** | $869,880 | 1211 | 66 | **$13,180** | $718 | 5.45% | $6,153,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,229,117** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $931 |
| anuncios clasificados por la forma de sus pedidos | 31 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $931 | 0 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249499375070390` -> {'IMPERMEABLE': 243, 'V10': 1}
- `120249499411810390` -> {'IMPERMEABLE': 141, 'V10': 1}
- `120249894780890390` -> {'Q58': 104, 'V10': 3}
- `120250016232010390` -> {'RADIO': 89, 'Q58': 1}
- `120250027970510390` -> {'Q58': 49, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 160, 'Q58': 6}
- `120249619720720390` -> {'V10': 137, 'Q58': 1}
- `120250016231990390` -> {'RADIO': 28, 'Q58': 1}
- `120249894780920390` -> {'Q58': 81, 'V10': 1}
- `120249619616140390` -> {'V10': 229, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,327 | 5 | $18,865 | $110,120 | 7 | $15,731 |
| 2026-11-20 | $108,962 | 9 | $12,107 | $95,116 | 5 | $19,023 | $88,324 | 2 | $44,162 | $112,539 | 8 | $14,067 |
| 2026-11-21 | $103,590 | 10 | $10,359 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,645 | 12 | $11,054 | $134,506 | 7 | $19,215 | $173,775 | 8 | $21,722 | $155,712 | 13 | $11,978 |
| 2026-11-23 | $121,907 | 11 | $11,082 | $136,537 | 9 | $15,171 | $167,778 | 10 | $16,778 | $142,581 | 12 | $11,882 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,768 | **$27,676** | $9,064 | 🟢 3.1x | $1,582,065 |
| **Q58** | $40,989 | **$30,935** | $16,512 | 🟡 1.9x | $663,424 |
| **RADIO** | $55,422 | **$42,077** | $17,276 | 🟡 2.4x | $1,190,417 |
| **IMPERMEABLE** | $24,938 | **$18,543** | $13,180 | 🔴 1.4x | $353,953 |

**Utilidad de la ventana: $3,789,859** ($541,408/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-17 a 2026-11-20 · mitad 2: 2026-11-21 a 2026-11-23. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $249,523 | 331 | 23 | **$10,849** | 6.9% | $17,194 | 🟡 63% | $9,347 → $13,186 | 8.0% → 5.8% | $748 → $761 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $162,726 | 273 | 15 | **$10,848** | 5.5% | $20,089 | 🟡 54% | $13,856 → $8,844 | 4.8% → 6.1% | $660 → $541 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $143,288 | 196 | 10 | **$14,329** | 5.1% | $20,321 | 🟡 71% | $12,107 → $17,662 | 6.7% → 3.8% | $807 → $666 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $142,662 | 211 | 8 | **$17,833** | 3.8% | $18,096 | 🔴 99% | $37,469 → $11,287 | 2.2% → 5.1% | $806 → $574 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $109,013 | 125 | 6 | **$18,169** | 4.8% | $19,234 | 🔴 94% | $19,839 → $9,819 | 4.5% → 7.7% | $886 → $755 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $62,668 | 75 | 2 | **$31,334** | 2.7% | $17,529 | 🔴 179% | — → $31,334 | — → 2.7% | — → $836 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $202,407 | 262 | 12 | **$16,867** | 4.6% | $31,126 | 🟡 54% | $13,413 → $23,775 | 5.0% → 3.9% | $671 → $932 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $198,723 | 217 | 13 | **$15,286** | 6.0% | $30,746 | 🟢 50% | $20,061 → $12,302 | 4.7% → 7.2% | $946 → $887 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $179,627 | 569 | 7 | **$25,661** | 1.2% | $30,547 | 🔴 84% | $44,942 → $17,948 | 0.7% → 1.9% | $296 → $339 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $178,809 | 164 | 11 | **$16,255** | 6.7% | $31,049 | 🟡 52% | $10,321 → $42,961 | 11.2% → 2.4% | $1,161 → $1,023 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $324,181 | 247 | 27 | **$12,007** | 10.9% | $43,847 | 🟢 27% | $14,851 → $10,052 | 9.1% → 12.7% | $1,350 → $1,276 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $205,066 | 103 | 8 | **$25,633** | 7.8% | $31,108 | 🔴 82% | $17,678 → $81,321 | 9.9% → 3.1% | $1,743 → $2,541 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $141,448 | 135 | 6 | **$23,575** | 4.4% | $54,932 | 🟢 43% | $72,626 → $13,764 | 1.2% → 9.4% | $886 → $1,299 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $133,656 | 90 | 4 | **$33,414** | 4.4% | $35,743 | 🔴 93% | — → $33,414 | — → 4.4% | — → $1,485 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $24,910 | 12 | 0 | **sin pedidos** | 0.0% | $42,077 | 🔴 sin pedidos | sin pedidos → — | 0.0% → — | $2,076 → — |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $205,004 | 308 | 23 | **$8,913** | 7.5% | $27,872 | 🟢 32% | $6,813 → $12,851 | 9.6% → 5.3% | $651 → $681 |
| V10 | Motorizados - INTER · _LA RUTA_ | $191,830 | 349 | 16 | **$11,989** | 4.6% | $27,634 | 🟢 43% | $13,280 → $10,986 | 3.9% → 5.3% | $522 → $578 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $161,459 | 173 | 21 | **$7,689** | 12.1% | $27,622 | 🟢 28% | $9,514 → $3,125 | 10.1% → 25.0% | $958 → $781 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $155,478 | 464 | 11 | **$14,134** | 2.4% | $27,881 | 🟡 51% | $8,268 → $40,534 | 3.7% → 0.9% | $309 → $364 |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $56,639 | 140 | 5 | **$11,328** | 3.6% | $27,642 | 🟢 41% | — → $11,328 | — → 3.6% | — → $405 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $455 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $264 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $212 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $663 · 5 · $6,499 | $830 · 1 · $33,196 | $919 · 3 · $15,010 | $604 · 5 · $8,089 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $680 · 0 · — | $578 · 1 · $24,270 | $650 · 2 · $10,726 | $400 · 4 · $7,601 | $730 · 3 · $9,245 |
| IMPERMEABLE · TEST Creativos - API | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 | $780 · 1 · $25,748 | $647 · 1 · $24,575 |
| IMPERMEABLE · Motorizados - API | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,435 | $997 · 0 · — | $517 · 1 · $18,603 | $647 · 3 · $8,622 | $554 · 2 · $11,628 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $859 · 2 · $12,031 | $1,010 · 1 · $19,192 | $755 · 0 · — | — | — |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | — | $826 · 1 · $7,433 | $843 · 1 · $28,666 | $830 · 0 · — |
| Q58 · Motorizados - Q58 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,614 | $784 · 0 · — | $1,124 · 3 · $10,117 | $937 · 1 · $36,541 |
| Q58 · Domiciliarios VIDEO Q58 - | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,035 · 1 · $28,969 | $949 · 2 · $14,230 | $1,017 · 1 · $33,569 | $758 · 5 · $7,278 |
| Q58 · Domiciliarios - Expancion - Q58 | $319 · 0 · — | $298 · 2 · $15,353 | $326 · 0 · — | $240 · 0 · — | $362 · 2 · $9,060 | $346 · 2 · $19,717 | $319 · 1 · $32,187 |
| Q58 · Domiciliarios Q58 - | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 | $1,112 · 0 · — | $1,005 · 1 · $31,151 | $982 · 1 · $31,420 |
| RADIO · RADIO - Seguridad / Negocios | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,176 · 1 · $47,868 | $1,409 · 6 · $7,280 | $1,314 · 5 · $12,091 | $1,157 · 5 · $11,338 |
| RADIO · RADIO - Moteros | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,186 | $1,894 · 0 · — | $1,934 · 0 · — | $2,147 · 0 · — | $4,315 · 1 · $30,203 |
| RADIO · RADIO - Fincas | $1,080 · 0 · — | $1,358 · 1 · $23,094 | $756 · 0 · — | $609 · 0 · — | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,057 | $1,413 · 1 · $25,435 |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | $1,296 · 1 · $16,852 | $1,461 · 1 · $61,352 | $1,584 · 2 · $27,726 |
| RADIO · RADIO - Broad | $1,996 · 0 · — | $1,780 · 0 · — | $4,251 · 0 · — | — | — | — | — |
| V10 · Domiciliarios - Expancion - INTER | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $633 · 4 · $6,804 | $661 · 0 · — | $712 · 3 · $12,110 | $668 · 5 · $7,211 |
| V10 · Motorizados - INTER | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $515 · 1 · $22,124 | $519 · 4 · $6,493 | $582 · 4 · $9,608 | $627 · 1 · $34,467 |
| V10 · Domiciliarios VIDEO INTER - API | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $860 · 3 · $13,762 | $781 · 5 · $3,750 | — | — |
| V10 · Domiciliarios INTER - API | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,333 | $311 · 0 · — | $365 · 1 · $31,374 | $413 · 1 · $28,889 |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | $347 · 1 · $7,634 | $421 · 2 · $13,254 | $409 · 2 · $11,248 |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |

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
