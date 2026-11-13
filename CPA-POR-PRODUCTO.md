# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-13 12:11 Bogota.** Ventana **2026-11-06 a 2026-11-12** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $718,159 | 1421 | 90 | **$7,980** | $505 | 6.33% | $10,881,000 |
| **Q58** | $741,137 | 1410 | 60 | **$12,352** | $526 | 4.26% | $9,040,000 |
| **RADIO** | $704,365 | 590 | 50 | **$14,087** | $1,194 | 8.47% | $8,030,000 |
| **IMPERMEABLE** | $833,778 | 1530 | 94 | **$8,870** | $545 | 6.14% | $8,836,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$2,997,439** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 127, 'Q58': 4}
- `120250016232010390` -> {'RADIO': 51, 'Q58': 1}
- `120249619616140390` -> {'V10': 189, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 120, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 127, 'V10': 1}
- `120249894780920390` -> {'Q58': 60, 'V10': 1}
- `120250027970510390` -> {'Q58': 39, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 81, 'V10': 1}
- `120250016231990390` -> {'RADIO': 19, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 6 | $14,652 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,406 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,533 | 5 | $21,107 | $120,087 | 6 | $20,014 |
| 2026-11-12 | $99,533 | 13 | $7,656 | $102,864 | 4 | $25,716 | $101,401 | 8 | $12,675 | $118,816 | 8 | $14,852 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,882 | **$27,764** | $7,980 | 🟢 3.5x | $1,780,608 |
| **Q58** | $41,006 | **$30,948** | $12,352 | 🟡 2.5x | $1,115,744 |
| **RADIO** | $57,800 | **$43,913** | $14,087 | 🟢 3.1x | $1,491,279 |
| **IMPERMEABLE** | $26,452 | **$19,712** | $8,870 | 🟡 2.2x | $1,019,148 |

**Utilidad de la ventana: $5,406,779** ($772,397/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-06 a 2026-11-09 · mitad 2: 2026-11-10 a 2026-11-12. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $232,176 | 443 | 23 | **$10,095** | 5.2% | $18,316 | 🟡 55% | $7,278 → $23,473 | 6.3% → 2.9% | $456 → $671 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $200,631 | 315 | 12 | **$16,719** | 3.8% | $17,529 | 🔴 95% | $19,998 → $13,440 | 2.8% → 5.9% | $561 → $798 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $135,451 | 204 | 9 | **$15,050** | 4.4% | $18,989 | 🔴 79% | $9,972 → $55,674 | 5.9% → 1.4% | $591 → $807 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $133,049 | 268 | 18 | **$7,392** | 6.7% | $19,454 | 🟢 38% | $5,572 → $13,762 | 7.3% → 5.3% | $406 → $724 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $132,471 | 300 | 25 | **$5,299** | 8.3% | $20,998 | 🟢 25% | $4,396 → $7,619 | 8.1% → 8.9% | $358 → $675 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $198,762 | 679 | 8 | **$24,845** | 1.2% | $30,467 | 🔴 82% | $28,801 → $20,890 | 1.0% → 1.5% | $280 → $312 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $196,065 | 295 | 17 | **$11,533** | 5.8% | $30,848 | 🟢 37% | $9,905 → $14,518 | 6.3% → 5.0% | $626 → $720 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $173,468 | 257 | 20 | **$8,673** | 7.8% | $30,972 | 🟢 28% | $10,223 → $7,124 | 6.4% → 10.0% | $651 → $712 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $172,842 | 179 | 11 | **$15,713** | 6.1% | $31,028 | 🟡 51% | $14,557 → $17,736 | 6.5% → 5.6% | $952 → $985 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $269,460 | 267 | 27 | **$9,980** | 10.1% | $47,258 | 🟢 21% | $9,585 → $10,555 | 9.8% → 10.7% | $935 → $1,127 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $233,625 | 132 | 10 | **$23,362** | 7.6% | $30,077 | 🔴 78% | $19,788 → $31,703 | 8.3% → 6.2% | $1,649 → $1,981 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $134,716 | 142 | 10 | **$13,472** | 7.0% | $50,160 | 🟢 27% | $12,915 → $14,307 | 7.4% → 6.6% | $957 → $938 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $66,564 | 49 | 2 | **$33,282** | 4.1% | $22,685 | 🔴 147% | $20,079 → sin pedidos | 6.1% → 0.0% | $1,217 → $1,650 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $245,067 | 381 | 40 | **$6,127** | 10.5% | $28,086 | 🟢 22% | $6,723 → $5,468 | 8.9% → 13.0% | $601 → $712 |
| V10 | Motorizados - INTER · _LA RUTA_ | $169,994 | 312 | 15 | **$11,333** | 4.8% | $27,738 | 🟢 41% | $14,444 → $8,610 | 3.6% → 6.9% | $516 → $594 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $169,956 | 294 | 20 | **$8,498** | 6.8% | $27,632 | 🟢 31% | $10,925 → $6,512 | 4.9% → 9.8% | $540 → $640 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $133,142 | 434 | 6 | **$22,190** | 1.4% | $27,887 | 🔴 80% | $24,895 → $19,486 | 1.2% → 1.6% | $305 → $309 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $449 · 4 · $8,877 | $453 · 3 · $9,809 | $430 · 3 · $12,615 | $500 · 9 · $3,945 | $489 · 3 · $9,624 | $856 · 1 · $32,509 | $756 · 0 · — |
| IMPERMEABLE · Domiciliarios - Expancion - API | $536 · 1 · $31,082 | $641 · 1 · $24,990 | $543 · 3 · $11,035 | $550 · 1 · $30,814 | $711 · 3 · $7,820 | $841 · 3 · $9,807 | $841 · 0 · — |
| IMPERMEABLE · TEST Creativos - API | $662 · 0 · — | $425 · 4 · $4,033 | $629 · 2 · $10,689 | $680 · 2 · $10,876 | $797 · 0 · — | $740 · 0 · — | $893 · 1 · $20,543 |
| IMPERMEABLE · Motorizados - API | $377 · 6 · $3,334 | $351 · 4 · $4,208 | $390 · 3 · $7,029 | $543 · 1 · $20,077 | $597 · 1 · $17,313 | $840 · 1 · $18,490 | $770 · 2 · $9,622 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $327 · 6 · $3,376 | $363 · 5 · $3,557 | $344 · 4 · $5,338 | $411 · 3 · $6,579 | $532 · 2 · $7,450 | $635 · 1 · $19,679 | $938 · 4 · $4,690 |
| Q58 · Domiciliarios - Expancion - Q58 | $258 · 3 · $9,706 | $295 · 0 · — | $265 · 1 · $32,606 | $314 · 0 · — | $290 · 1 · $22,652 | $296 · 2 · $17,160 | $359 · 1 · $26,586 |
| Q58 · Motorizados - Q58 | $646 · 4 · $6,297 | $441 · 5 · $5,117 | $683 · 1 · $30,034 | $853 · 1 · $28,151 | $646 · 0 · — | $643 · 5 · $5,785 | $913 · 1 · $31,035 |
| Q58 · Domiciliarios VIDEO Q58 - | $619 · 3 · $8,250 | $741 · 1 · $21,500 | $581 · 3 · $8,909 | $697 · 3 · $9,751 | $798 · 3 · $7,182 | $603 · 7 · $3,788 | $799 · 0 · — |
| Q58 · Domiciliarios Q58 - | $919 · 1 · $25,734 | $1,059 · 1 · $19,055 | $773 · 2 · $13,522 | $1,156 · 3 · $10,021 | $1,066 · 2 · $11,720 | $877 · 0 · — | $1,051 · 2 · $11,035 |
| RADIO · RADIO - Seguridad / Negocios | $976 · 7 · $5,298 | $1,003 · 3 · $11,031 | $914 · 1 · $43,877 | $873 · 5 · $7,860 | $1,417 · 2 · $19,124 | $1,142 · 2 · $18,836 | $934 · 7 · $5,740 |
| RADIO · RADIO - Moteros | $3,195 · 0 · — | $1,572 · 4 · $7,860 | $1,178 · 2 · $18,844 | $1,702 · 1 · $37,435 | $2,246 · 1 · $29,196 | $1,757 · 1 · $33,377 | $2,034 · 1 · $32,537 |
| RADIO · RADIO - Fincas | $1,231 · 1 · $18,471 | $752 · 1 · $15,786 | $725 · 3 · $7,007 | $1,388 · 1 · $22,211 | $639 · 2 · $6,393 | $1,254 · 2 · $11,908 | $938 · 0 · — |
| RADIO · RADIO - Broad | $942 · 0 · — | $1,435 · 2 · $3,588 | $1,184 · 0 · — | $1,465 · 0 · — | sin conv · 0 · — | $970 · 0 · — | $1,612 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $685 · 4 · $8,567 | $528 · 2 · $15,589 | $565 · 8 · $4,658 | $641 · 7 · $5,496 | $601 · 11 · $3,057 | $713 · 6 · $6,181 | $873 · 2 · $16,586 |
| V10 · Motorizados - INTER | $540 · 2 · $12,160 | $517 · 2 · $9,822 | $460 · 1 · $27,578 | $558 · 2 · $14,784 | $639 · 1 · $19,814 | $484 · 4 · $6,781 | $757 · 3 · $7,315 |
| V10 · Domiciliarios - Expancion - INTER | $432 · 2 · $12,531 | $621 · 3 · $6,622 | $512 · 2 · $14,082 | $682 · 2 · $12,616 | $700 · 5 · $4,618 | $623 · 2 · $11,846 | $606 · 4 · $6,212 |
| V10 · Domiciliarios INTER - API | $301 · 0 · — | $317 · 0 · — | $288 · 2 · $9,228 | $315 · 1 · $21,435 | $306 · 0 · — | $285 · 2 · $10,254 | $343 · 1 · $19,566 |

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
