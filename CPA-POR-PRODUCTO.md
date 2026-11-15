# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-15 11:19 Bogota.** Ventana **2026-11-08 a 2026-11-14** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $741,751 | 1416 | 102 | **$7,272** | $524 | 7.20% | $12,306,000 |
| **Q58** | $755,714 | 1356 | 55 | **$13,740** | $557 | 4.06% | $8,348,900 |
| **RADIO** | $734,380 | 606 | 42 | **$17,485** | $1,212 | 6.93% | $6,908,000 |
| **IMPERMEABLE** | $874,348 | 1337 | 78 | **$11,210** | $654 | 5.83% | $7,548,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,106,193** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 24 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780920390` -> {'Q58': 68, 'V10': 1}
- `120249619616140390` -> {'V10': 201, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 86, 'V10': 1}
- `120249619832930390` -> {'V10': 134, 'Q58': 4}
- `120249619720720390` -> {'V10': 121, 'Q58': 1}
- `120250027970510390` -> {'Q58': 41, 'IMPERMEABLE': 1}
- `120250016232010390` -> {'RADIO': 54, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 130, 'V10': 1}
- `120250016231990390` -> {'RADIO': 19, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,760 | 14 | $7,197 | $100,030 | 11 | $9,094 | $96,166 | 6 | $16,028 | $133,874 | 12 | $11,156 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,941 | **$27,809** | $7,272 | 🟢 3.8x | $2,094,812 |
| **Q58** | $42,028 | **$31,737** | $13,740 | 🟡 2.3x | $989,828 |
| **RADIO** | $59,818 | **$45,471** | $17,485 | 🟡 2.6x | $1,175,392 |
| **IMPERMEABLE** | $27,051 | **$20,174** | $11,210 | 🟡 1.8x | $699,241 |

**Utilidad de la ventana: $4,959,273** ($708,468/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-08 a 2026-11-11 · mitad 2: 2026-11-12 a 2026-11-14. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $244,968 | 382 | 22 | **$11,135** | 5.8% | $18,742 | 🟡 59% | $8,421 → $18,373 | 6.2% → 4.8% | $526 → $875 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $209,883 | 274 | 11 | **$19,080** | 4.0% | $17,596 | 🔴 108% | $11,683 → $93,056 | 5.4% → 1.1% | $631 → $1,046 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $139,912 | 218 | 11 | **$12,719** | 5.0% | $20,643 | 🟡 62% | $12,828 → $12,589 | 4.2% → 6.6% | $542 → $828 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $139,800 | 199 | 8 | **$17,475** | 4.0% | $19,118 | 🔴 91% | $19,566 → $15,384 | 3.6% → 4.6% | $699 → $707 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $139,785 | 264 | 18 | **$7,766** | 6.8% | $23,079 | 🟢 34% | $7,567 → $8,014 | 5.9% → 8.4% | $448 → $675 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $202,947 | 294 | 15 | **$13,530** | 5.1% | $33,808 | 🟢 40% | $16,322 → $11,086 | 4.3% → 6.2% | $697 → $682 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $202,910 | 645 | 7 | **$28,987** | 1.1% | $30,566 | 🔴 95% | $30,091 → $27,515 | 1.0% → 1.3% | $290 → $359 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $174,946 | 249 | 20 | **$8,747** | 8.0% | $30,834 | 🟢 28% | $6,503 → $17,726 | 10.1% → 4.4% | $654 → $788 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $174,911 | 168 | 10 | **$17,491** | 6.0% | $31,071 | 🟡 56% | $15,140 → $22,976 | 6.2% → 5.4% | $946 → $1,231 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $279,938 | 267 | 23 | **$12,171** | 8.6% | $48,526 | 🟢 25% | $15,911 → $9,295 | 6.5% → 11.4% | $1,040 → $1,060 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $244,877 | 155 | 7 | **$34,982** | 4.5% | $38,391 | 🔴 91% | $45,899 → $26,795 | 3.5% → 5.8% | $1,601 → $1,553 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $139,845 | 139 | 8 | **$17,481** | 5.8% | $47,027 | 🟢 37% | $9,979 → sin pedidos | 9.5% → 0.0% | $950 → $1,091 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $69,720 | 45 | 3 | **$23,240** | 6.7% | $25,593 | 🔴 91% | sin pedidos → $9,272 | 0.0% → 18.8% | $1,445 → $1,738 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $251,942 | 375 | 47 | **$5,360** | 12.5% | $28,062 | 🟢 19% | $4,577 → $7,033 | 13.7% → 10.6% | $626 → $748 |
| V10 | Motorizados - INTER · _LA RUTA_ | $174,915 | 313 | 15 | **$11,661** | 4.8% | $27,678 | 🟢 42% | $13,010 → $10,119 | 4.0% → 6.2% | $520 → $627 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $174,914 | 280 | 23 | **$7,605** | 8.2% | $27,706 | 🟢 27% | $9,107 → $6,228 | 6.7% → 10.3% | $615 → $639 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $139,980 | 448 | 8 | **$17,498** | 1.8% | $27,807 | 🟡 63% | $15,756 → $20,399 | 1.9% → 1.6% | $298 → $333 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $430 · 3 · $12,615 | $500 · 9 · $3,945 | $489 · 3 · $9,624 | $856 · 1 · $32,509 | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $543 · 3 · $11,035 | $550 · 1 · $30,814 | $711 · 3 · $7,820 | $841 · 3 · $9,816 | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,203 |
| IMPERMEABLE · Motorizados - API | $390 · 3 · $7,029 | $543 · 1 · $20,077 | $597 · 1 · $17,313 | $840 · 1 · $18,490 | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $934 · 0 · — |
| IMPERMEABLE · TEST Creativos - API | $629 · 2 · $10,689 | $680 · 2 · $10,876 | $797 · 0 · — | $740 · 0 · — | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $344 · 4 · $5,338 | $411 · 3 · $6,579 | $532 · 2 · $7,450 | $635 · 1 · $19,679 | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $656 · 4 · $5,414 |
| Q58 · Motorizados - Q58 | $683 · 1 · $30,034 | $853 · 1 · $28,151 | $646 · 0 · — | $643 · 5 · $5,785 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 4 · $6,920 |
| Q58 · Domiciliarios - Expancion - Q58 | $265 · 1 · $32,606 | $314 · 0 · — | $290 · 1 · $22,652 | $296 · 2 · $17,160 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 1 · $24,562 |
| Q58 · Domiciliarios VIDEO Q58 - | $581 · 3 · $8,909 | $697 · 3 · $9,751 | $798 · 3 · $7,182 | $603 · 7 · $3,788 | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 |
| Q58 · Domiciliarios Q58 - | $773 · 2 · $13,522 | $1,156 · 3 · $10,021 | $1,066 · 2 · $11,720 | $877 · 0 · — | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 1 · $22,958 |
| RADIO · RADIO - Seguridad / Negocios | $914 · 1 · $43,877 | $873 · 5 · $7,860 | $1,417 · 2 · $19,124 | $1,142 · 2 · $18,842 | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 |
| RADIO · RADIO - Moteros | $1,178 · 2 · $18,844 | $1,702 · 1 · $37,435 | $2,246 · 0 · — | $1,757 · 0 · — | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,534 · 2 · $16,878 |
| RADIO · RADIO - Fincas | $725 · 3 · $7,007 | $1,388 · 1 · $22,211 | $639 · 2 · $6,393 | $1,254 · 2 · $11,908 | $939 · 0 · — | $1,359 · 0 · — | $1,036 · 0 · — |
| RADIO · RADIO - Broad | $1,184 · 0 · — | $1,465 · 0 · — | sin conv · 0 · — | $970 · 0 · — | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,647 · 2 · $4,118 |
| V10 · Domiciliarios VIDEO INTER - API | $565 · 8 · $4,658 | $641 · 7 · $5,496 | $601 · 11 · $3,057 | $713 · 6 · $6,182 | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 7 · $5,162 |
| V10 · Motorizados - INTER | $460 · 1 · $27,578 | $558 · 2 · $14,784 | $639 · 1 · $19,814 | $484 · 4 · $6,781 | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,620 |
| V10 · Domiciliarios - Expancion - INTER | $512 · 2 · $14,082 | $682 · 2 · $12,616 | $700 · 5 · $4,618 | $623 · 2 · $11,846 | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 |
| V10 · Domiciliarios INTER - API | $288 · 2 · $9,228 | $315 · 1 · $21,435 | $306 · 0 · — | $285 · 2 · $10,254 | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,184 |

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
