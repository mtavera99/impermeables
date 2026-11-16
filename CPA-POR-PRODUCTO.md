# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-16 14:34 Bogota.** Ventana **2026-11-09 a 2026-11-15** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $741,944 | 1370 | 95 | **$7,810** | $542 | 6.93% | $11,449,000 |
| **Q58** | $755,915 | 1294 | 55 | **$13,744** | $584 | 4.25% | $8,359,900 |
| **RADIO** | $729,786 | 569 | 39 | **$18,712** | $1,283 | 6.85% | $6,351,000 |
| **IMPERMEABLE** | $867,023 | 1184 | 73 | **$11,877** | $732 | 6.17% | $7,093,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,094,668** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 24 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 139, 'Q58': 4}
- `120249894780920390` -> {'Q58': 71, 'V10': 1}
- `120250016231990390` -> {'RADIO': 21, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 58, 'Q58': 1}
- `120249894780890390` -> {'Q58': 89, 'V10': 1}
- `120249619720720390` -> {'V10': 125, 'Q58': 1}
- `120249619616140390` -> {'V10': 206, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250027970510390` -> {'Q58': 42, 'IMPERMEABLE': 1}
- `120249499411810390` -> {'IMPERMEABLE': 130, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 14 | $7,198 | $100,030 | 11 | $9,094 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,632 | 7 | $15,947 | $116,612 | 8 | $14,576 | $109,783 | 3 | $36,594 | $127,374 | 11 | $11,579 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,955 | **$27,821** | $7,810 | 🟢 3.6x | $1,901,026 |
| **Q58** | $42,000 | **$31,715** | $13,744 | 🟡 2.3x | $988,424 |
| **RADIO** | $59,588 | **$45,293** | $18,712 | 🟡 2.4x | $1,036,633 |
| **IMPERMEABLE** | $27,164 | **$20,262** | $11,877 | 🟡 1.7x | $612,074 |

**Utilidad de la ventana: $4,538,156** ($648,308/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-09 a 2026-11-12 · mitad 2: 2026-11-13 a 2026-11-15. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $242,411 | 342 | 24 | **$10,100** | 7.0% | $18,657 | 🟡 54% | $9,958 → $10,269 | 6.2% → 8.4% | $614 → $862 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $206,954 | 239 | 9 | **$22,995** | 3.8% | $17,611 | 🔴 131% | $15,929 → $47,726 | 4.5% → 2.4% | $710 → $1,164 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $140,739 | 189 | 8 | **$17,592** | 4.2% | $19,030 | 🔴 92% | $25,813 → $12,660 | 3.0% → 5.7% | $767 → $719 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $139,161 | 184 | 8 | **$17,395** | 4.3% | $20,430 | 🔴 85% | $15,028 → $21,340 | 4.4% → 4.2% | $665 → $902 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $137,758 | 230 | 17 | **$8,103** | 7.4% | $24,587 | 🟢 33% | $8,122 → $8,083 | 7.1% → 7.8% | $576 → $628 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $203,580 | 623 | 7 | **$29,083** | 1.1% | $30,566 | 🔴 95% | $28,606 → $29,719 | 1.1% → 1.2% | $313 → $347 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $202,174 | 286 | 16 | **$12,636** | 5.6% | $33,626 | 🟢 38% | $16,465 → $9,658 | 4.5% → 6.8% | $748 → $658 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $175,540 | 156 | 9 | **$19,504** | 5.8% | $30,893 | 🟡 63% | $14,430 → $37,266 | 7.1% → 3.4% | $1,031 → $1,285 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $174,621 | 229 | 20 | **$8,731** | 8.7% | $30,932 | 🟢 28% | $7,732 → $10,587 | 9.2% → 8.0% | $708 → $852 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $276,212 | 253 | 24 | **$11,509** | 9.5% | $48,649 | 🟢 24% | $9,719 → $15,089 | 10.8% → 7.6% | $1,051 → $1,150 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $243,761 | 141 | 5 | **$48,752** | 3.5% | $36,953 | 🔴 132% | $66,343 → $37,025 | 2.9% → 4.2% | $1,896 → $1,564 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $140,115 | 134 | 5 | **$28,023** | 3.7% | $48,537 | 🟡 58% | $15,893 → sin pedidos | 6.5% → 0.0% | $1,032 → $1,064 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $69,698 | 41 | 4 | **$17,424** | 9.8% | $24,866 | 🟡 70% | sin pedidos → $7,886 | 0.0% → 23.5% | $1,590 → $1,856 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $253,447 | 364 | 40 | **$6,336** | 11.0% | $28,021 | 🟢 23% | $5,479 → $7,928 | 12.6% → 8.9% | $692 → $702 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $173,557 | 270 | 25 | **$6,942** | 9.3% | $27,695 | 🟢 25% | $7,451 → $6,391 | 8.7% → 9.9% | $650 → $634 |
| V10 | Motorizados - INTER · _LA RUTA_ | $173,350 | 293 | 15 | **$11,557** | 5.1% | $27,678 | 🟢 42% | $9,849 → $14,971 | 5.9% → 4.0% | $583 → $604 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $141,590 | 443 | 7 | **$20,227** | 1.6% | $27,948 | 🟡 72% | $19,984 → $20,551 | 1.6% → 1.6% | $311 → $331 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $500 · 9 · $3,945 | $489 · 3 · $9,624 | $856 · 1 · $32,509 | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $735 · 5 · $7,058 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $550 · 1 · $30,814 | $711 · 3 · $7,820 | $841 · 3 · $9,816 | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,160 · 1 · $30,169 |
| IMPERMEABLE · TEST Creativos - API | $680 · 2 · $10,876 | $797 · 0 · — | $740 · 0 · — | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 |
| IMPERMEABLE · Motorizados - API | $543 · 1 · $20,077 | $597 · 1 · $17,313 | $840 · 1 · $18,490 | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,016 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $411 · 3 · $6,579 | $532 · 2 · $7,450 | $635 · 1 · $19,679 | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $689 · 3 · $6,429 |
| Q58 · Domiciliarios - Expancion - Q58 | $314 · 0 · — | $290 · 1 · $22,652 | $296 · 2 · $17,160 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 1 · $24,562 | $329 · 1 · $33,276 |
| Q58 · Motorizados - Q58 | $853 · 1 · $28,151 | $646 · 0 · — | $643 · 5 · $5,785 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 4 · $6,920 | $813 · 2 · $14,630 |
| Q58 · Domiciliarios Q58 - | $1,156 · 3 · $10,021 | $1,066 · 2 · $11,720 | $877 · 0 · — | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 1 · $22,958 | $1,203 · 1 · $27,674 |
| Q58 · Domiciliarios VIDEO Q58 - | $697 · 3 · $9,751 | $798 · 3 · $7,182 | $603 · 7 · $3,788 | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 |
| RADIO · RADIO - Seguridad / Negocios | $873 · 5 · $7,860 | $1,417 · 2 · $19,124 | $1,142 · 2 · $18,842 | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,181 · 2 · $20,076 |
| RADIO · RADIO - Moteros | $1,702 · 1 · $37,435 | $2,246 · 0 · — | $1,757 · 0 · — | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,031 · 0 · — |
| RADIO · RADIO - Fincas | $1,388 · 1 · $22,211 | $639 · 2 · $6,393 | $1,254 · 2 · $11,908 | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $886 · 0 · — |
| RADIO · RADIO - Broad | $1,465 · 0 · — | sin conv · 0 · — | $970 · 0 · — | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,968 · 1 · $11,809 |
| V10 · Domiciliarios VIDEO INTER - API | $641 · 7 · $5,496 | $601 · 11 · $3,057 | $713 · 6 · $6,182 | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 7 · $5,163 | $705 · 1 · $38,762 |
| V10 · Domiciliarios - Expancion - INTER | $682 · 2 · $12,616 | $700 · 5 · $4,618 | $623 · 2 · $11,846 | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,702 |
| V10 · Motorizados - INTER | $558 · 2 · $14,784 | $639 · 1 · $19,814 | $484 · 4 · $6,781 | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $650 · 1 · $26,000 |
| V10 · Domiciliarios INTER - API | $315 · 1 · $21,435 | $306 · 0 · — | $285 · 2 · $10,254 | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,064 |

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
