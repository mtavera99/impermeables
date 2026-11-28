# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-28 12:30 Bogota.** Ventana **2026-11-21 a 2026-11-27** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $742,224 | 1389 | 81 | **$9,163** | $534 | 5.83% | $9,709,000 |
| **Q58** | $794,276 | 1182 | 49 | **$16,210** | $672 | 4.15% | $7,425,000 |
| **RADIO** | $961,807 | 617 | 54 | **$17,811** | $1,559 | 8.75% | $8,526,000 |
| **IMPERMEABLE** | $853,352 | 1124 | 58 | **$14,713** | $759 | 5.16% | $5,237,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,351,659** (99.9%) |
| gasto de anuncios sin pedidos en la ventana | $2,107 |
| anuncios clasificados por la forma de sus pedidos | 32 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $2,107 | 1 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780890390` -> {'Q58': 112, 'V10': 3}
- `120250016232010390` -> {'RADIO': 98, 'Q58': 1}
- `120249499375070390` -> {'IMPERMEABLE': 247, 'V10': 1}
- `120250027970510390` -> {'Q58': 56, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 168, 'Q58': 6}
- `120249619720720390` -> {'V10': 150, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 146, 'V10': 1}
- `120249894780920390` -> {'Q58': 88, 'V10': 1}
- `120250016231990390` -> {'RADIO': 30, 'Q58': 1}
- `120249619616140390` -> {'V10': 228, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-21 | $103,590 | 9 | $11,510 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,645 | 12 | $11,054 | $134,506 | 7 | $19,215 | $173,775 | 8 | $21,722 | $155,712 | 13 | $11,978 |
| 2026-11-23 | $122,028 | 11 | $11,093 | $136,682 | 9 | $15,187 | $168,046 | 10 | $16,805 | $142,701 | 12 | $11,892 |
| 2026-11-24 | $104,607 | 8 | $13,076 | $115,618 | 10 | $11,562 | $128,152 | 3 | $42,717 | $110,746 | 6 | $18,458 |
| 2026-11-25 | $68,047 | 10 | $6,805 | $73,945 | 3 | $24,648 | $101,897 | 8 | $12,737 | $89,977 | 5 | $17,995 |
| 2026-11-26 | $109,503 | 17 | $6,441 | $121,304 | 11 | $11,028 | $146,772 | 11 | $13,343 | $119,344 | 8 | $14,918 |
| 2026-11-27 | $101,804 | 14 | $7,272 | $114,080 | 5 | $22,816 | $140,094 | 4 | $35,024 | $124,044 | 6 | $20,674 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $37,210 | **$28,017** | $9,163 | 🟢 3.1x | $1,527,181 |
| **Q58** | $40,881 | **$30,851** | $16,210 | 🟡 1.9x | $717,418 |
| **RADIO** | $55,823 | **$42,386** | $17,811 | 🟡 2.4x | $1,327,049 |
| **IMPERMEABLE** | $25,293 | **$18,817** | $14,713 | 🔴 1.3x | $238,060 |

**Utilidad de la ventana: $3,809,708** ($544,244/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-21 a 2026-11-24 · mitad 2: 2026-11-25 a 2026-11-27. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $244,208 | 308 | 13 | **$18,785** | 4.2% | $17,430 | 🔴 108% | $15,018 → $31,342 | 5.2% → 2.6% | $774 → $825 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $165,937 | 265 | 16 | **$10,371** | 6.0% | $19,254 | 🟡 54% | $11,249 → $9,242 | 5.1% → 7.8% | $579 → $719 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $152,117 | 150 | 5 | **$30,423** | 3.3% | $17,543 | 🔴 173% | $42,170 → $22,592 | 2.3% → 4.8% | $958 → $1,093 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $141,696 | 184 | 5 | **$28,339** | 2.7% | $21,919 | 🔴 129% | $22,156 → $53,071 | 3.4% → 1.5% | $745 → $816 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $139,575 | 204 | 13 | **$10,737** | 6.4% | $19,452 | 🟡 55% | $8,578 → $17,932 | 7.3% → 4.5% | $626 → $803 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $9,819 | 13 | 1 | **$9,819** | 7.7% | $17,777 | 🟡 55% | $9,819 → — | 7.7% → — | $755 → — |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $210,536 | 221 | 17 | **$12,384** | 7.7% | $31,964 | 🟢 39% | $10,704 → $16,418 | 8.4% → 6.4% | $898 → $1,052 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $203,966 | 232 | 11 | **$18,542** | 4.7% | $30,842 | 🟡 60% | $17,479 → $20,403 | 5.4% → 3.9% | $941 → $800 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $202,845 | 578 | 11 | **$18,440** | 1.9% | $30,569 | 🟡 60% | $20,364 → $16,132 | 1.8% → 2.0% | $367 → $329 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $176,929 | 151 | 7 | **$25,276** | 4.6% | $31,257 | 🔴 81% | $27,991 → $21,655 | 3.8% → 6.5% | $1,066 → $1,412 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $336,504 | 246 | 25 | **$13,460** | 10.2% | $43,481 | 🟢 31% | $11,295 → $19,027 | 12.2% → 7.1% | $1,383 → $1,345 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $307,874 | 185 | 13 | **$23,683** | 7.0% | $39,030 | 🟡 61% | $43,840 → $14,724 | 3.8% → 11.4% | $1,654 → $1,677 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $174,729 | 76 | 5 | **$34,946** | 6.6% | $22,685 | 🔴 154% | $53,924 → $22,294 | 4.3% → 10.0% | $2,344 → $2,229 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $142,700 | 110 | 7 | **$20,386** | 6.4% | $55,437 | 🟢 37% | $17,305 → $28,087 | 7.7% → 4.4% | $1,331 → $1,248 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $214,135 | 274 | 16 | **$13,383** | 5.8% | $28,025 | 🟢 48% | $16,384 → $10,383 | 4.7% → 7.8% | $767 → $806 |
| V10 | Motorizados - INTER · _LA RUTA_ | $208,261 | 346 | 20 | **$10,413** | 5.8% | $27,391 | 🟢 38% | $12,934 → $7,892 | 4.4% → 8.4% | $570 → $663 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $172,966 | 444 | 15 | **$11,531** | 3.4% | $27,856 | 🟢 41% | $26,458 → $6,103 | 1.4% → 7.0% | $370 → $425 |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $128,110 | 301 | 14 | **$9,151** | 4.7% | $27,765 | 🟢 33% | $11,126 → $7,176 | 3.7% → 6.3% | $410 → $453 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $18,752 | 24 | 5 | **$3,750** | 20.8% | $27,617 | 🟢 14% | $3,750 → — | 20.8% → — | $781 → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $1,180 | 1 | 0 | **sin pedidos** | 0.0% | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → 0.0% | — → $651 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $509 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $418 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | sin pedidos → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-21 | 11-22 | 11-23 | 11-24 | 11-25 | 11-26 | 11-27 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $830 · 1 · $33,196 | $919 · 3 · $15,010 | $604 · 5 · $8,094 | $829 · 1 · $31,487 | $747 · 0 · — | $1,031 · 2 · $15,974 | $749 · 1 · $35,192 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $650 · 2 · $10,726 | $400 · 4 · $7,601 | $730 · 3 · $9,251 | $773 · 0 · — | $719 · 1 · $17,247 | $858 · 4 · $5,791 | $623 · 2 · $12,143 |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | $826 · 1 · $7,433 | $843 · 1 · $28,666 | $830 · 0 · — | $1,667 · 0 · — | $1,246 · 1 · $18,694 | $1,332 · 1 · $23,975 | $866 · 1 · $25,107 |
| IMPERMEABLE · TEST Creativos - API | $581 · 2 · $10,162 | $780 · 1 · $25,748 | $647 · 1 · $24,575 | $1,383 · 0 · — | $1,008 · 1 · $12,094 | $768 · 0 · — | $779 · 0 · — |
| IMPERMEABLE · Motorizados - API | $517 · 1 · $18,603 | $647 · 3 · $8,622 | $556 · 2 · $11,666 | $946 · 4 · $4,495 | $717 · 1 · $15,055 | $987 · 0 · — | $740 · 2 · $9,990 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $755 · 0 · — | — | — | — | — | — | — |
| Q58 · Domiciliarios VIDEO Q58 - | $949 · 2 · $14,230 | $1,017 · 1 · $33,569 | $759 · 5 · $7,286 | $937 · 4 · $7,496 | $1,004 · 0 · — | $968 · 3 · $10,329 | $1,194 · 2 · $15,516 |
| Q58 · Motorizados - Q58 | $784 · 0 · — | $1,124 · 3 · $10,117 | $938 · 1 · $36,576 | $972 · 3 · $9,073 | $758 · 0 · — | $799 · 2 · $15,174 | $833 · 2 · $15,402 |
| Q58 · Domiciliarios - Expancion - Q58 | $362 · 2 · $9,060 | $346 · 2 · $19,717 | $319 · 1 · $32,257 | $476 · 1 · $32,373 | $313 · 3 · $6,148 | $346 · 1 · $34,263 | $321 · 1 · $27,954 |
| Q58 · Domiciliarios Q58 - | $1,112 · 0 · — | $1,005 · 1 · $31,151 | $982 · 1 · $31,420 | $1,240 · 2 · $13,020 | $1,361 · 0 · — | $1,607 · 3 · $8,569 | $1,278 · 0 · — |
| RADIO · RADIO - Seguridad / Negocios | $1,409 · 6 · $7,280 | $1,314 · 5 · $12,091 | $1,159 · 5 · $11,355 | $2,019 · 2 · $21,202 | $1,037 · 3 · $12,093 | $1,484 · 4 · $12,242 | $1,547 · 0 · — |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | $1,296 · 1 · $16,852 | $1,461 · 1 · $61,352 | $1,586 · 2 · $27,759 | $2,602 · 0 · — | $1,390 · 2 · $17,380 | $1,948 · 4 · $12,172 | $1,692 · 3 · $16,356 |
| RADIO · RADIO - Moteros | $1,934 · 0 · — | $2,147 · 0 · — | $4,331 · 1 · $30,320 | $1,886 · 1 · $26,409 | $3,239 · 0 · — | $1,787 · 2 · $13,405 | $2,388 · 1 · $23,878 |
| RADIO · RADIO - Fincas | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,057 | $1,413 · 1 · $25,435 | $1,475 · 0 · — | $772 · 1 · $14,665 | $1,487 · 1 · $22,304 | $1,746 · 0 · — |
| V10 · Domiciliarios - Expancion - INTER | $661 · 0 · — | $712 · 3 · $12,110 | $668 · 5 · $7,212 | $1,413 · 0 · — | $764 · 2 · $9,935 | $692 · 2 · $15,912 | $1,012 · 4 · $7,842 |
| V10 · Motorizados - INTER | $519 · 4 · $6,493 | $582 · 4 · $9,608 | $627 · 1 · $34,479 | $544 · 1 · $30,451 | $542 · 6 · $3,251 | $768 · 2 · $16,517 | $660 · 2 · $13,192 |
| V10 · Domiciliarios INTER - API | $311 · 0 · — | $365 · 1 · $31,374 | $414 · 1 · $28,956 | $392 · 2 · $12,348 | $467 · 2 · $8,174 | $372 · 6 · $4,212 | $464 · 3 · $8,505 |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | $347 · 1 · $7,634 | $421 · 2 · $13,254 | $410 · 2 · $11,266 | $424 · 2 · $10,603 | $536 · 0 · — | $461 · 4 · $4,843 | $403 · 3 · $6,179 |
| V10 · Domiciliarios VIDEO INTER - API | $781 · 4 · $4,688 | — | — | — | — | — | — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | $316 · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — | sin conv · 0 · — |

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
