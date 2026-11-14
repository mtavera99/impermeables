# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-14 10:47 Bogota.** Ventana **2026-11-07 a 2026-11-13** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $727,013 | 1394 | 96 | **$7,573** | $522 | 6.89% | $11,614,000 |
| **Q58** | $744,322 | 1378 | 52 | **$14,314** | $540 | 3.77% | $7,888,900 |
| **RADIO** | $725,019 | 611 | 46 | **$15,761** | $1,187 | 7.53% | $7,424,000 |
| **IMPERMEABLE** | $845,353 | 1411 | 86 | **$9,830** | $599 | 6.09% | $8,127,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,041,707** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 194, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780920390` -> {'Q58': 65, 'V10': 1}
- `120250027970510390` -> {'Q58': 41, 'IMPERMEABLE': 1}
- `120250016232010390` -> {'RADIO': 54, 'Q58': 1}
- `120249894780890390` -> {'Q58': 82, 'V10': 1}
- `120249499411810390` -> {'IMPERMEABLE': 130, 'V10': 1}
- `120249619832930390` -> {'V10': 130, 'Q58': 4}
- `120249619720720390` -> {'V10': 120, 'Q58': 1}
- `120250016231990390` -> {'RADIO': 19, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,951 | 4 | $25,738 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,570 | 15 | $7,438 | $107,890 | 4 | $26,972 | $117,295 | 6 | $19,549 | $138,783 | 10 | $13,878 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,876 | **$27,759** | $7,573 | 🟢 3.7x | $1,937,893 |
| **Q58** | $42,108 | **$31,798** | $14,314 | 🟡 2.2x | $909,193 |
| **RADIO** | $58,164 | **$44,194** | $15,761 | 🟡 2.8x | $1,307,882 |
| **IMPERMEABLE** | $26,725 | **$19,923** | $9,830 | 🟡 2.0x | $867,984 |

**Utilidad de la ventana: $5,022,952** ($717,565/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-07 a 2026-11-10 · mitad 2: 2026-11-11 a 2026-11-13. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $236,963 | 399 | 22 | **$10,771** | 5.5% | $18,354 | 🟡 59% | $7,314 → $26,328 | 6.4% → 3.4% | $465 → $908 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $202,599 | 286 | 11 | **$18,418** | 3.8% | $17,551 | 🔴 105% | $14,046 → $30,077 | 4.2% → 3.1% | $595 → $930 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $135,830 | 280 | 19 | **$7,149** | 6.8% | $22,020 | 🟢 32% | $5,270 → $12,411 | 7.5% → 5.4% | $395 → $667 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $135,195 | 243 | 15 | **$9,013** | 6.2% | $19,879 | 🟢 45% | $8,367 → $9,981 | 5.4% → 8.0% | $448 → $799 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $134,766 | 203 | 10 | **$13,477** | 4.9% | $18,818 | 🟡 72% | $9,301 → $30,180 | 6.5% → 2.5% | $605 → $754 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $200,927 | 656 | 6 | **$33,488** | 0.9% | $30,540 | 🔴 110% | $54,368 → $23,048 | 0.5% → 1.4% | $289 → $329 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $200,813 | 305 | 16 | **$12,551** | 5.2% | $33,615 | 🟢 37% | $15,846 → $9,988 | 4.0% → 7.0% | $627 → $702 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $171,577 | 243 | 17 | **$10,093** | 7.0% | $30,881 | 🟢 33% | $9,903 → $10,364 | 6.9% → 7.1% | $688 → $733 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $171,005 | 174 | 10 | **$17,100** | 5.7% | $31,039 | 🟡 55% | $12,450 → $35,700 | 7.9% → 2.7% | $986 → $978 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $276,232 | 270 | 24 | **$11,510** | 8.9% | $48,692 | 🟢 24% | $14,047 → $9,363 | 7.2% → 11.1% | $1,010 → $1,040 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $242,161 | 153 | 9 | **$26,907** | 5.9% | $30,898 | 🔴 87% | $19,394 → $53,202 | 8.0% → 3.0% | $1,560 → $1,612 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $137,976 | 143 | 9 | **$15,331** | 6.3% | $48,924 | 🟢 31% | $10,258 → $33,086 | 8.1% → 3.5% | $835 → $1,161 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $68,650 | 45 | 3 | **$22,883** | 6.7% | $24,656 | 🔴 93% | $19,208 → $30,234 | 8.7% → 4.5% | $1,670 → $1,374 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $246,917 | 378 | 42 | **$5,879** | 11.1% | $28,041 | 🟢 21% | $5,019 → $7,598 | 11.6% → 10.2% | $583 → $776 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $171,913 | 277 | 23 | **$7,474** | 8.3% | $27,650 | 🟢 27% | $8,030 → $6,869 | 7.6% → 9.2% | $614 → $630 |
| V10 | Motorizados - INTER · _LA RUTA_ | $171,887 | 307 | 16 | **$10,743** | 5.2% | $27,625 | 🟢 39% | $16,101 → $7,528 | 3.3% → 8.0% | $531 → $602 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $136,296 | 432 | 7 | **$19,471** | 1.6% | $27,806 | 🟡 70% | $24,605 → $15,620 | 1.2% → 2.1% | $306 → $327 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $453 · 3 · $9,809 | $430 · 3 · $12,615 | $500 · 9 · $3,945 | $489 · 3 · $9,624 | $856 · 1 · $32,509 | $757 · 0 · — | $1,150 · 3 · $13,412 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $641 · 1 · $24,990 | $543 · 3 · $11,035 | $550 · 1 · $30,814 | $711 · 3 · $7,820 | $841 · 3 · $9,816 | $842 · 0 · — | $1,138 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $363 · 5 · $3,557 | $344 · 4 · $5,338 | $411 · 3 · $6,579 | $532 · 2 · $7,450 | $635 · 1 · $19,679 | $939 · 3 · $6,260 | $562 · 1 · $23,593 |
| IMPERMEABLE · Motorizados - API | $351 · 4 · $4,208 | $390 · 3 · $7,029 | $543 · 1 · $20,077 | $597 · 1 · $17,313 | $840 · 1 · $18,490 | $770 · 2 · $9,630 | $791 · 3 · $7,379 |
| IMPERMEABLE · TEST Creativos - API | $425 · 4 · $4,033 | $629 · 2 · $10,689 | $680 · 2 · $10,876 | $797 · 0 · — | $740 · 0 · — | $894 · 1 · $20,555 | $661 · 1 · $19,816 |
| Q58 · Domiciliarios - Expancion - Q58 | $295 · 0 · — | $265 · 1 · $32,606 | $314 · 0 · — | $290 · 1 · $22,652 | $296 · 2 · $17,160 | $360 · 1 · $26,665 | $347 · 1 · $31,205 |
| Q58 · Motorizados - Q58 | $441 · 5 · $5,117 | $683 · 1 · $30,034 | $853 · 1 · $28,151 | $646 · 0 · — | $643 · 5 · $5,785 | $913 · 1 · $31,035 | $611 · 3 · $9,979 |
| Q58 · Domiciliarios VIDEO Q58 - | $741 · 1 · $21,500 | $581 · 3 · $8,909 | $697 · 3 · $9,751 | $798 · 3 · $7,182 | $603 · 7 · $3,788 | $799 · 0 · — | $879 · 0 · — |
| Q58 · Domiciliarios Q58 - | $1,059 · 1 · $19,055 | $773 · 2 · $13,522 | $1,156 · 3 · $10,021 | $1,066 · 2 · $11,720 | $877 · 0 · — | $1,051 · 2 · $11,035 | $1,039 · 0 · — |
| RADIO · RADIO - Seguridad / Negocios | $1,003 · 3 · $11,031 | $914 · 1 · $43,877 | $873 · 5 · $7,860 | $1,417 · 2 · $19,124 | $1,142 · 2 · $18,842 | $937 · 7 · $5,753 | $1,067 · 4 · $10,940 |
| RADIO · RADIO - Moteros | $1,572 · 4 · $7,860 | $1,178 · 2 · $18,844 | $1,702 · 1 · $37,435 | $2,246 · 0 · — | $1,757 · 0 · — | $2,042 · 1 · $32,678 | $1,302 · 1 · $40,349 |
| RADIO · RADIO - Fincas | $752 · 1 · $15,786 | $725 · 3 · $7,007 | $1,388 · 1 · $22,211 | $639 · 2 · $6,393 | $1,254 · 2 · $11,908 | $939 · 0 · — | $1,357 · 0 · — |
| RADIO · RADIO - Broad | $1,435 · 2 · $3,588 | $1,184 · 0 · — | $1,465 · 0 · — | sin conv · 0 · — | $970 · 0 · — | $1,617 · 0 · — | $1,914 · 1 · $11,481 |
| V10 · Domiciliarios VIDEO INTER - API | $528 · 2 · $15,589 | $565 · 8 · $4,658 | $641 · 7 · $5,496 | $601 · 11 · $3,057 | $713 · 6 · $6,182 | $875 · 2 · $16,634 | $766 · 6 · $6,003 |
| V10 · Domiciliarios - Expancion - INTER | $621 · 3 · $6,622 | $512 · 2 · $14,082 | $682 · 2 · $12,616 | $700 · 5 · $4,618 | $623 · 2 · $11,846 | $606 · 4 · $6,212 | $659 · 5 · $5,403 |
| V10 · Motorizados - INTER | $517 · 2 · $9,822 | $460 · 1 · $27,578 | $558 · 2 · $14,784 | $639 · 1 · $19,814 | $484 · 4 · $6,781 | $758 · 3 · $7,330 | $654 · 3 · $8,723 |
| V10 · Domiciliarios INTER - API | $317 · 0 · — | $288 · 2 · $9,228 | $315 · 1 · $21,435 | $306 · 0 · — | $285 · 2 · $10,254 | $344 · 1 · $19,610 | $361 · 1 · $22,364 |

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
