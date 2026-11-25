# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-25 14:13 Bogota.** Ventana **2026-11-18 a 2026-11-24** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $786,397 | 1452 | 79 | **$9,954** | $542 | 5.44% | $9,578,000 |
| **Q58** | $788,265 | 1209 | 51 | **$15,456** | $652 | 4.22% | $7,706,000 |
| **RADIO** | $872,443 | 592 | 44 | **$19,828** | $1,474 | 7.43% | $7,006,000 |
| **IMPERMEABLE** | $885,428 | 1206 | 62 | **$14,281** | $734 | 5.14% | $5,769,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,332,533** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $1,080 |
| anuncios clasificados por la forma de sus pedidos | 31 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $1,080 | 0 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619720720390` -> {'V10': 141, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 91, 'Q58': 1}
- `120250027970510390` -> {'Q58': 51, 'IMPERMEABLE': 1}
- `120249894780920390` -> {'Q58': 84, 'V10': 1}
- `120249499411810390` -> {'IMPERMEABLE': 143, 'V10': 1}
- `120249894780890390` -> {'Q58': 106, 'V10': 3}
- `120249499375070390` -> {'IMPERMEABLE': 243, 'V10': 1}
- `120249619832930390` -> {'V10': 160, 'Q58': 6}
- `120250016231990390` -> {'RADIO': 28, 'Q58': 1}
- `120249619616140390` -> {'V10': 229, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,327 | 5 | $18,865 | $110,120 | 7 | $15,731 |
| 2026-11-20 | $108,962 | 9 | $12,107 | $95,116 | 5 | $19,023 | $88,324 | 2 | $44,162 | $112,539 | 8 | $14,067 |
| 2026-11-21 | $103,590 | 10 | $10,359 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,645 | 12 | $11,054 | $134,506 | 7 | $19,215 | $173,775 | 8 | $21,722 | $155,712 | 13 | $11,978 |
| 2026-11-23 | $122,028 | 11 | $11,093 | $136,671 | 9 | $15,186 | $168,046 | 10 | $16,805 | $142,701 | 12 | $11,892 |
| 2026-11-24 | $104,435 | 8 | $13,054 | $115,381 | 11 | $10,489 | $127,467 | 3 | $42,489 | $110,526 | 6 | $18,421 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,235 | **$28,037** | $9,954 | 🟡 2.8x | $1,428,503 |
| **Q58** | $40,950 | **$30,905** | $15,456 | 🟡 2.0x | $787,879 |
| **RADIO** | $56,821 | **$43,157** | $19,828 | 🟡 2.2x | $1,026,471 |
| **IMPERMEABLE** | $25,237 | **$18,774** | $14,281 | 🔴 1.3x | $278,563 |

**Utilidad de la ventana: $3,521,416** ($503,059/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-18 a 2026-11-21 · mitad 2: 2026-11-22 a 2026-11-24. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $254,634 | 339 | 23 | **$11,071** | 6.8% | $17,215 | 🟡 64% | $9,834 → $12,995 | 7.6% → 5.8% | $744 → $759 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $168,682 | 280 | 11 | **$15,335** | 3.9% | $21,172 | 🟡 72% | $22,230 → $11,395 | 2.9% → 4.9% | $644 → $562 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $145,423 | 186 | 8 | **$18,178** | 4.3% | $20,957 | 🔴 87% | $12,855 → $34,147 | 5.9% → 2.4% | $756 → $813 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $145,114 | 214 | 11 | **$13,192** | 5.1% | $18,901 | 🟡 70% | $38,998 → $7,458 | 1.8% → 8.9% | $690 → $665 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $87,338 | 99 | 5 | **$17,468** | 5.1% | $19,624 | 🔴 89% | $21,834 → $0 | 4.0% → — | $882 → — |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $84,237 | 88 | 2 | **$42,118** | 2.3% | $17,529 | 🔴 240% | $7,433 → $76,804 | 11.1% → 1.3% | $826 → $972 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $207,869 | 222 | 15 | **$13,858** | 6.8% | $32,105 | 🟢 43% | $21,581 → $9,996 | 4.6% → 8.8% | $990 → $885 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $206,536 | 259 | 14 | **$14,753** | 5.4% | $31,135 | 🟢 47% | $16,064 → $13,441 | 4.2% → 7.4% | $681 → $1,001 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $187,642 | 561 | 8 | **$23,455** | 1.4% | $30,569 | 🔴 77% | $20,935 → $25,976 | 1.4% → 1.4% | $301 → $367 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $186,218 | 167 | 12 | **$15,518** | 7.2% | $30,906 | 🟡 50% | $13,945 → $17,720 | 8.4% → 6.0% | $1,176 → $1,055 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $334,796 | 244 | 27 | **$12,400** | 11.1% | $42,839 | 🟢 29% | $11,688 → $13,290 | 11.7% → 10.3% | $1,370 → $1,375 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $202,612 | 101 | 4 | **$50,653** | 4.0% | $38,828 | 🔴 130% | $59,067 → $42,239 | 3.0% → 5.9% | $1,763 → $2,485 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $175,094 | 106 | 4 | **$43,774** | 3.8% | $35,743 | 🔴 122% | $16,852 → $52,747 | 7.7% → 3.2% | $1,296 → $1,702 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $145,010 | 134 | 6 | **$24,168** | 4.5% | $54,932 | 🟢 44% | $19,479 → $33,547 | 4.7% → 4.1% | $917 → $1,369 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $14,931 | 7 | 0 | **sin pedidos** | 0.0% | $43,157 | 🔴 sin pedidos | sin pedidos → — | 0.0% → — | $2,133 → — |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $214,035 | 298 | 20 | **$10,702** | 6.7% | $27,930 | 🟢 38% | $9,452 → $12,576 | 6.9% → 6.4% | $656 → $805 |
| V10 | Motorizados - INTER · _LA RUTA_ | $197,796 | 359 | 15 | **$13,186** | 4.2% | $27,655 | 🟢 48% | $10,497 → $17,221 | 4.9% → 3.4% | $519 → $584 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $162,846 | 462 | 10 | **$16,285** | 2.2% | $28,041 | 🟡 58% | $12,979 → $21,243 | 2.5% → 1.8% | $320 → $388 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $133,884 | 143 | 17 | **$7,876** | 11.9% | $27,656 | 🟢 28% | $8,368 → $0 | 11.2% → — | $936 → — |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $77,836 | 190 | 7 | **$11,119** | 3.7% | $27,747 | 🟢 40% | $7,634 → $11,700 | 4.5% → 3.6% | $347 → $418 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $529 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $278 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $273 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-18 | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $663 · 5 · $6,499 | $830 · 1 · $33,196 | $919 · 3 · $15,010 | $604 · 5 · $8,094 | $828 · 1 · $31,459 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $691 · 1 · $23,480 | $680 · 0 · — | $578 · 1 · $24,270 | $650 · 2 · $10,726 | $400 · 4 · $7,601 | $730 · 3 · $9,251 | $772 · 0 · — |
| IMPERMEABLE · TEST Creativos - API | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 | $780 · 1 · $25,748 | $647 · 1 · $24,575 | $1,382 · 0 · — |
| IMPERMEABLE · Motorizados - API | $697 · 0 · — | $697 · 1 · $17,435 | $997 · 0 · — | $517 · 1 · $18,603 | $647 · 3 · $8,622 | $556 · 2 · $11,666 | $943 · 4 · $4,481 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $879 · 1 · $34,265 | $859 · 2 · $12,031 | $1,010 · 1 · $19,192 | $755 · 0 · — | — | — | — |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | $826 · 1 · $7,433 | $843 · 1 · $28,666 | $830 · 0 · — | $1,659 · 0 · — |
| Q58 · Domiciliarios VIDEO Q58 - | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,035 · 1 · $28,969 | $949 · 2 · $14,230 | $1,017 · 1 · $33,569 | $759 · 5 · $7,286 | $936 · 4 · $7,492 |
| Q58 · Motorizados - Q58 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,614 | $784 · 0 · — | $1,124 · 3 · $10,117 | $938 · 1 · $36,565 | $970 · 3 · $9,057 |
| Q58 · Domiciliarios - Expancion - Q58 | $298 · 2 · $15,353 | $326 · 0 · — | $240 · 0 · — | $362 · 2 · $9,060 | $346 · 2 · $19,717 | $319 · 1 · $32,257 | $474 · 1 · $32,211 |
| Q58 · Domiciliarios Q58 - | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 | $1,112 · 0 · — | $1,005 · 1 · $31,151 | $982 · 1 · $31,420 | $1,240 · 3 · $8,677 |
| RADIO · RADIO - Seguridad / Negocios | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,176 · 1 · $47,868 | $1,409 · 6 · $7,280 | $1,314 · 5 · $12,091 | $1,159 · 5 · $11,355 | $2,012 · 2 · $21,124 |
| RADIO · RADIO - Moteros | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,186 | $1,894 · 0 · — | $1,934 · 0 · — | $2,147 · 0 · — | $4,331 · 1 · $30,320 | $1,875 · 1 · $26,246 |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | $1,296 · 1 · $16,852 | $1,461 · 1 · $61,352 | $1,586 · 2 · $27,759 | $2,586 · 0 · — |
| RADIO · RADIO - Fincas | $1,358 · 1 · $23,094 | $756 · 0 · — | $609 · 0 · — | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,057 | $1,413 · 1 · $25,435 | $1,467 · 0 · — |
| RADIO · RADIO - Broad | $1,780 · 0 · — | $4,251 · 0 · — | — | — | — | — | — |
| V10 · Domiciliarios - Expancion - INTER | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $633 · 4 · $6,804 | $661 · 0 · — | $712 · 3 · $12,110 | $668 · 5 · $7,212 | $1,411 · 0 · — |
| V10 · Motorizados - INTER | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $515 · 1 · $22,124 | $519 · 4 · $6,493 | $582 · 4 · $9,608 | $627 · 1 · $34,479 | $543 · 1 · $30,413 |
| V10 · Domiciliarios INTER - API | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,333 | $311 · 0 · — | $365 · 1 · $31,374 | $414 · 1 · $28,956 | $391 · 2 · $12,320 |
| V10 · Domiciliarios VIDEO INTER - API | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $860 · 3 · $13,762 | $781 · 5 · $3,750 | — | — | — |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | $347 · 1 · $7,634 | $421 · 2 · $13,254 | $410 · 2 · $11,266 | $423 · 2 · $10,582 |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |

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
