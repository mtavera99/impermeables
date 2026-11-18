# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-18 13:01 Bogota.** Ventana **2026-11-11 a 2026-11-17** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $764,344 | 1391 | 90 | **$8,493** | $549 | 6.47% | $10,897,000 |
| **Q58** | $768,396 | 1300 | 49 | **$15,682** | $591 | 3.77% | $7,471,900 |
| **RADIO** | $757,902 | 577 | 44 | **$17,225** | $1,314 | 7.63% | $6,386,000 |
| **IMPERMEABLE** | $898,298 | 1098 | 71 | **$12,652** | $818 | 6.47% | $6,651,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,188,940** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 213, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 143, 'Q58': 4}
- `120250016232010390` -> {'RADIO': 63, 'Q58': 1}
- `120249894780890390` -> {'Q58': 93, 'V10': 1}
- `120249619720720390` -> {'V10': 129, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 132, 'V10': 1}
- `120249894780920390` -> {'Q58': 70, 'V10': 1}
- `120250016231990390` -> {'RADIO': 22, 'Q58': 1}
- `120250027970510390` -> {'Q58': 42, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,434 | 14 | $6,317 | $86,705 | 6 | $14,451 | $84,193 | 7 | $12,028 | $94,789 | 10 | $9,479 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,921 | **$27,794** | $8,493 | 🟢 3.3x | $1,737,115 |
| **Q58** | $42,090 | **$31,784** | $15,682 | 🟡 2.0x | $789,035 |
| **RADIO** | $50,462 | **$38,248** | $17,225 | 🟡 2.2x | $925,015 |
| **IMPERMEABLE** | $26,174 | **$19,498** | $12,652 | 🟡 1.5x | $486,041 |

**Utilidad de la ventana: $3,937,205** ($562,458/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-11 a 2026-11-14 · mitad 2: 2026-11-15 a 2026-11-17. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $249,963 | 293 | 20 | **$12,498** | 6.8% | $18,218 | 🟡 69% | $20,392 → $8,247 | 4.3% → 10.1% | $870 → $831 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $214,418 | 214 | 12 | **$17,868** | 5.6% | $18,888 | 🔴 95% | $30,628 → $11,488 | 3.2% → 8.9% | $988 → $1,021 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $146,123 | 227 | 16 | **$9,133** | 7.0% | $22,023 | 🟢 41% | $9,315 → $8,898 | 7.1% → 6.9% | $665 → $617 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $144,397 | 191 | 8 | **$18,050** | 4.2% | $17,790 | 🔴 101% | $20,382 → $15,718 | 3.5% → 5.2% | $715 → $817 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $143,397 | 173 | 8 | **$17,925** | 4.6% | $19,658 | 🔴 91% | $13,576 → $30,969 | 6.1% → 2.7% | $831 → $826 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $211,376 | 645 | 6 | **$35,229** | 0.9% | $30,540 | 🔴 115% | $29,216 → $47,255 | 1.2% → 0.7% | $338 → $316 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $208,157 | 287 | 16 | **$13,010** | 5.6% | $33,741 | 🟢 39% | $9,801 → $22,636 | 6.9% → 3.6% | $672 → $808 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $177,118 | 216 | 19 | **$9,322** | 8.8% | $30,813 | 🟢 30% | $8,856 → $9,962 | 8.2% → 9.8% | $727 → $972 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $171,745 | 152 | 5 | **$34,349** | 3.3% | $31,156 | 🔴 110% | $47,181 → $25,794 | 2.4% → 4.5% | $1,110 → $1,155 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $287,423 | 241 | 23 | **$12,497** | 9.5% | $43,778 | 🟢 29% | $10,568 → $16,114 | 10.2% → 8.5% | $1,078 → $1,371 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $251,076 | 150 | 11 | **$22,825** | 7.3% | $29,257 | 🔴 78% | $35,142 → $15,787 | 4.5% → 11.3% | $1,597 → $1,782 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $145,874 | 132 | 5 | **$29,175** | 3.8% | $46,407 | 🟡 63% | $41,928 → $20,672 | 2.7% → 5.2% | $1,133 → $1,069 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $73,529 | 54 | 4 | **$18,382** | 7.4% | $24,866 | 🟡 74% | $12,830 → $35,040 | 11.1% → 3.7% | $1,426 → $1,298 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $258,568 | 354 | 33 | **$7,835** | 9.3% | $27,925 | 🟢 28% | $7,129 → $8,922 | 10.4% → 8.1% | $739 → $720 |
| V10 | Motorizados - INTER · _LA RUTA_ | $182,415 | 305 | 13 | **$14,032** | 4.3% | $27,695 | 🟡 51% | $8,906 → $42,223 | 6.5% → 1.5% | $580 → $621 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $176,905 | 282 | 23 | **$7,692** | 8.2% | $27,646 | 🟢 28% | $7,030 → $8,720 | 9.0% → 7.1% | $635 → $618 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $146,456 | 450 | 13 | **$11,266** | 2.9% | $27,870 | 🟢 40% | $16,341 → $8,094 | 2.0% → 4.1% | $319 → $334 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $856 · 1 · $32,509 | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $876 · 1 · $26,266 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $841 · 3 · $9,816 | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $830 · 1 · $21,577 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $635 · 1 · $19,679 | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $744 · 4 · $3,908 |
| IMPERMEABLE · TEST Creativos - API | $740 · 0 · — | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 |
| IMPERMEABLE · Motorizados - API | $840 · 1 · $18,490 | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $968 · 1 · $15,480 |
| Q58 · Domiciliarios - Expancion - Q58 | $296 · 2 · $17,160 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $318 · 0 · — |
| Q58 · Motorizados - Q58 | $643 · 5 · $5,785 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,056 |
| Q58 · Domiciliarios VIDEO Q58 - | $603 · 7 · $3,788 | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $772 · 2 · $10,428 |
| Q58 · Domiciliarios Q58 - | $877 · 0 · — | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,034 · 2 · $9,310 |
| RADIO · RADIO - Seguridad / Negocios | $1,142 · 2 · $18,842 | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,317 · 2 · $15,802 |
| RADIO · RADIO - Moteros | $1,757 · 0 · — | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,793 · 5 · $5,738 |
| RADIO · RADIO - Fincas | $1,254 · 2 · $11,908 | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,075 · 0 · — |
| RADIO · RADIO - Broad | $970 · 0 · — | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,985 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $713 · 6 · $6,182 | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $918 · 4 · $6,882 |
| V10 · Motorizados - INTER | $484 · 4 · $6,781 | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $531 · 2 · $12,220 |
| V10 · Domiciliarios - Expancion - INTER | $623 · 2 · $11,846 | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $639 · 3 · $6,394 |
| V10 · Domiciliarios INTER - API | $285 · 2 · $10,254 | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $266 · 3 · $5,761 |

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
