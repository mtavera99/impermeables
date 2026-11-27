# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-27 13:56 Bogota.** Ventana **2026-11-20 a 2026-11-26** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $749,380 | 1407 | 76 | **$9,860** | $533 | 5.40% | $9,191,000 |
| **Q58** | $775,302 | 1162 | 49 | **$15,822** | $667 | 4.22% | $7,438,000 |
| **RADIO** | $910,009 | 597 | 52 | **$17,500** | $1,524 | 8.71% | $8,328,000 |
| **IMPERMEABLE** | $841,843 | 1100 | 60 | **$14,031** | $765 | 5.45% | $5,478,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,276,534** (99.9%) |
| gasto de anuncios sin pedidos en la ventana | $1,758 |
| anuncios clasificados por la forma de sus pedidos | 32 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $1,758 | 1 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780920390` -> {'Q58': 88, 'V10': 1}
- `120249894780890390` -> {'Q58': 110, 'V10': 3}
- `120249499375070390` -> {'IMPERMEABLE': 246, 'V10': 1}
- `120249619720720390` -> {'V10': 149, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 145, 'V10': 1}
- `120249619832930390` -> {'V10': 166, 'Q58': 6}
- `120250016232010390` -> {'RADIO': 96, 'Q58': 1}
- `120250027970510390` -> {'Q58': 54, 'IMPERMEABLE': 1}
- `120250016231990390` -> {'RADIO': 30, 'Q58': 1}
- `120249619616140390` -> {'V10': 228, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-20 | $108,962 | 9 | $12,107 | $95,116 | 5 | $19,023 | $88,324 | 2 | $44,162 | $112,539 | 8 | $14,067 |
| 2026-11-21 | $103,590 | 9 | $11,510 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,645 | 12 | $11,054 | $134,506 | 7 | $19,215 | $173,775 | 8 | $21,722 | $155,712 | 13 | $11,978 |
| 2026-11-23 | $122,028 | 11 | $11,093 | $136,682 | 9 | $15,187 | $168,046 | 10 | $16,805 | $142,701 | 12 | $11,892 |
| 2026-11-24 | $104,607 | 8 | $13,076 | $115,618 | 10 | $11,562 | $128,152 | 3 | $42,717 | $110,746 | 6 | $18,458 |
| 2026-11-25 | $68,047 | 10 | $6,805 | $73,945 | 3 | $24,648 | $101,885 | 8 | $12,736 | $89,977 | 5 | $17,995 |
| 2026-11-26 | $109,501 | 17 | $6,441 | $121,294 | 11 | $11,027 | $146,756 | 11 | $13,341 | $119,340 | 8 | $14,918 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,264 | **$28,059** | $9,860 | 🟡 2.8x | $1,383,118 |
| **Q58** | $40,857 | **$30,833** | $15,822 | 🟡 1.9x | $735,492 |
| **RADIO** | $56,539 | **$42,939** | $17,500 | 🟡 2.5x | $1,322,830 |
| **IMPERMEABLE** | $24,798 | **$18,436** | $14,031 | 🔴 1.3x | $264,290 |

**Utilidad de la ventana: $3,705,730** ($529,390/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-20 a 2026-11-23 · mitad 2: 2026-11-24 a 2026-11-26. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $241,511 | 310 | 17 | **$14,207** | 5.5% | $15,962 | 🔴 89% | $10,799 → $30,107 | 6.8% → 2.9% | $738 → $860 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $165,921 | 268 | 15 | **$11,061** | 5.6% | $20,348 | 🟡 54% | $10,388 → $12,409 | 5.3% → 6.3% | $550 → $785 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $139,849 | 173 | 6 | **$23,308** | 3.5% | $21,146 | 🔴 110% | $17,656 → $51,570 | 4.2% → 1.9% | $736 → $973 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $138,541 | 196 | 11 | **$12,595** | 5.6% | $18,901 | 🟡 67% | $14,458 → $10,358 | 4.4% → 8.5% | $633 → $878 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $127,010 | 121 | 4 | **$31,752** | 3.3% | $17,608 | 🔴 180% | $31,336 → $32,169 | 2.7% → 4.3% | $836 → $1,399 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $29,011 | 32 | 2 | **$14,506** | 6.2% | $17,777 | 🔴 82% | $14,506 → — | 6.2% → — | $907 → — |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $208,473 | 223 | 16 | **$13,030** | 7.2% | $31,974 | 🟢 41% | $14,159 → $11,578 | 6.5% → 8.3% | $917 → $965 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $199,777 | 231 | 10 | **$19,978** | 4.3% | $30,854 | 🟡 65% | $24,350 → $15,605 | 3.6% → 5.4% | $882 → $839 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $191,229 | 559 | 10 | **$19,123** | 1.8% | $30,585 | 🟡 63% | $21,232 → $17,014 | 1.5% → 2.2% | $319 → $376 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $175,823 | 149 | 10 | **$17,582** | 6.7% | $31,083 | 🟡 57% | $21,821 → $13,343 | 5.0% → 10.4% | $1,080 → $1,390 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $336,419 | 237 | 26 | **$12,939** | 11.0% | $43,572 | 🟢 30% | $12,281 → $14,182 | 11.5% → 10.1% | $1,411 → $1,434 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $258,791 | 156 | 10 | **$25,879** | 6.4% | $38,237 | 🟡 68% | $33,430 → $20,845 | 4.4% → 9.1% | $1,486 → $1,895 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $175,476 | 79 | 4 | **$43,869** | 5.1% | $22,685 | 🔴 193% | $106,066 → $23,137 | 2.2% → 8.8% | $2,357 → $2,041 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $139,323 | 125 | 7 | **$19,903** | 5.6% | $55,437 | 🟢 36% | $16,930 → $27,336 | 6.3% → 4.3% | $1,072 → $1,189 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $209,985 | 286 | 16 | **$13,124** | 5.6% | $28,005 | 🟢 47% | $10,836 → $19,987 | 6.2% → 4.3% | $670 → $869 |
| V10 | Motorizados - INTER · _LA RUTA_ | $204,000 | 349 | 19 | **$10,737** | 5.4% | $27,738 | 🟢 39% | $12,101 → $9,221 | 4.7% → 6.7% | $565 → $615 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $165,785 | 445 | 13 | **$12,753** | 2.9% | $27,794 | 🟢 46% | $33,156 → $6,632 | 1.1% → 6.0% | $357 → $400 |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $109,571 | 255 | 11 | **$9,961** | 4.3% | $27,635 | 🟢 36% | $11,335 → $8,816 | 3.6% → 5.2% | $405 → $460 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $60,039 | 72 | 8 | **$7,505** | 11.1% | $27,505 | 🟢 27% | $7,505 → — | 11.1% → — | $834 → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $895 | 1 | 0 | **sin pedidos** | 0.0% | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → 0.0% | — → $440 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $508 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $355 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | 11-25 | 11-26 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $663 · 5 · $6,499 | $830 · 1 · $33,196 | $919 · 3 · $15,010 | $604 · 5 · $8,094 | $829 · 1 · $31,487 | $747 · 0 · — | $1,031 · 2 · $15,974 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $578 · 1 · $24,270 | $650 · 2 · $10,726 | $400 · 4 · $7,601 | $730 · 3 · $9,251 | $773 · 0 · — | $719 · 1 · $17,247 | $858 · 4 · $5,791 |
| IMPERMEABLE · TEST Creativos - API | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 | $780 · 1 · $25,748 | $647 · 1 · $24,575 | $1,383 · 0 · — | $1,008 · 1 · $12,094 | $768 · 0 · — |
| IMPERMEABLE · Motorizados - API | $997 · 0 · — | $517 · 1 · $18,603 | $647 · 3 · $8,622 | $556 · 2 · $11,666 | $946 · 4 · $4,495 | $717 · 1 · $15,055 | $987 · 0 · — |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | $826 · 1 · $7,433 | $843 · 1 · $28,666 | $830 · 0 · — | $1,667 · 0 · — | $1,246 · 1 · $18,694 | $1,332 · 1 · $23,975 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,010 · 1 · $19,192 | $755 · 0 · — | — | — | — | — | — |
| Q58 · Domiciliarios VIDEO Q58 - | $1,035 · 1 · $28,969 | $949 · 2 · $14,230 | $1,017 · 1 · $33,569 | $759 · 5 · $7,286 | $937 · 4 · $7,496 | $1,004 · 0 · — | $968 · 3 · $10,329 |
| Q58 · Motorizados - Q58 | $739 · 1 · $26,614 | $784 · 0 · — | $1,124 · 3 · $10,117 | $938 · 1 · $36,576 | $972 · 3 · $9,073 | $758 · 0 · — | $799 · 2 · $15,174 |
| Q58 · Domiciliarios - Expancion - Q58 | $240 · 0 · — | $362 · 2 · $9,060 | $346 · 2 · $19,717 | $319 · 1 · $32,257 | $476 · 1 · $32,373 | $313 · 3 · $6,148 | $346 · 1 · $34,253 |
| Q58 · Domiciliarios Q58 - | $1,364 · 3 · $7,728 | $1,112 · 0 · — | $1,005 · 1 · $31,151 | $982 · 1 · $31,420 | $1,240 · 2 · $13,020 | $1,361 · 0 · — | $1,607 · 3 · $8,569 |
| RADIO · RADIO - Seguridad / Negocios | $2,176 · 1 · $47,868 | $1,409 · 6 · $7,280 | $1,314 · 5 · $12,091 | $1,159 · 5 · $11,355 | $2,019 · 2 · $21,202 | $1,037 · 3 · $12,093 | $1,484 · 4 · $12,240 |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | $1,296 · 1 · $16,852 | $1,461 · 1 · $61,352 | $1,586 · 2 · $27,759 | $2,602 · 0 · — | $1,390 · 2 · $17,374 | $1,947 · 4 · $12,172 |
| RADIO · RADIO - Moteros | $1,894 · 0 · — | $1,934 · 0 · — | $2,147 · 0 · — | $4,331 · 1 · $30,320 | $1,886 · 1 · $26,409 | $3,239 · 0 · — | $1,787 · 2 · $13,404 |
| RADIO · RADIO - Fincas | $609 · 0 · — | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,057 | $1,413 · 1 · $25,435 | $1,475 · 0 · — | $772 · 1 · $14,665 | $1,487 · 1 · $22,304 |
| V10 · Domiciliarios - Expancion - INTER | $633 · 4 · $6,804 | $661 · 0 · — | $712 · 3 · $12,110 | $668 · 5 · $7,212 | $1,413 · 0 · — | $764 · 2 · $9,935 | $692 · 2 · $15,912 |
| V10 · Motorizados - INTER | $515 · 1 · $22,124 | $519 · 4 · $6,493 | $582 · 4 · $9,608 | $627 · 1 · $34,479 | $544 · 1 · $30,451 | $542 · 6 · $3,251 | $768 · 2 · $16,517 |
| V10 · Domiciliarios INTER - API | $327 · 1 · $18,333 | $311 · 0 · — | $365 · 1 · $31,374 | $414 · 1 · $28,956 | $392 · 2 · $12,348 | $467 · 2 · $8,174 | $372 · 6 · $4,212 |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | $347 · 1 · $7,634 | $421 · 2 · $13,254 | $410 · 2 · $11,266 | $424 · 2 · $10,603 | $536 · 0 · — | $461 · 4 · $4,842 |
| V10 · Domiciliarios VIDEO INTER - API | $860 · 3 · $13,762 | $781 · 4 · $4,688 | — | — | — | — | — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | $316 · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |

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
