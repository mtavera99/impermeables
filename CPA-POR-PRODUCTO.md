# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-12 12:34 Bogota.** Ventana **2026-11-05 a 2026-11-11** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $740,223 | 1488 | 100 | **$7,402** | $497 | 6.72% | $12,108,000 |
| **Q58** | $766,783 | 1483 | 67 | **$11,445** | $517 | 4.52% | $10,100,000 |
| **RADIO** | $716,523 | 610 | 47 | **$15,245** | $1,175 | 7.70% | $7,063,000 |
| **IMPERMEABLE** | $862,655 | 1685 | 103 | **$8,375** | $512 | 6.11% | $9,577,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,086,184** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 124, 'Q58': 4}
- `120250016232010390` -> {'RADIO': 43, 'Q58': 1}
- `120249619616140390` -> {'V10': 187, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249499411810390` -> {'IMPERMEABLE': 126, 'V10': 1}
- `120250027970510390` -> {'Q58': 39, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 118, 'Q58': 1}
- `120249894780920390` -> {'Q58': 59, 'V10': 1}
- `120249894780890390` -> {'Q58': 81, 'V10': 1}
- `120250016231990390` -> {'RADIO': 19, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 6 | $14,652 | $99,671 | 9 | $11,075 |
| 2026-11-11 | $108,053 | 15 | $7,204 | $114,979 | 14 | $8,213 | $104,916 | 5 | $20,983 | $119,682 | 6 | $19,947 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,858 | **$27,746** | $7,402 | 🟢 3.7x | $2,034,363 |
| **Q58** | $40,989 | **$30,934** | $11,445 | 🟡 2.7x | $1,305,817 |
| **RADIO** | $53,733 | **$40,773** | $15,245 | 🟡 2.7x | $1,199,814 |
| **IMPERMEABLE** | $26,054 | **$19,405** | $8,375 | 🟡 2.3x | $1,136,038 |

**Utilidad de la ventana: $5,676,031** ($810,862/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-05 a 2026-11-08 · mitad 2: 2026-11-09 a 2026-11-11. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $241,681 | 485 | 32 | **$7,553** | 6.6% | $18,267 | 🟢 41% | $7,626 → $7,445 | 6.0% → 7.7% | $457 → $576 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $207,758 | 345 | 15 | **$13,851** | 4.3% | $17,545 | 🔴 79% | $15,517 → $11,946 | 3.6% → 5.6% | $562 → $674 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $139,829 | 213 | 9 | **$15,537** | 4.2% | $18,902 | 🔴 82% | $11,854 → $28,426 | 5.2% → 2.6% | $615 → $729 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $136,796 | 351 | 22 | **$6,218** | 6.3% | $21,459 | 🟢 29% | $5,160 → $9,039 | 6.6% → 5.6% | $338 → $507 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $136,591 | 291 | 19 | **$7,189** | 6.5% | $19,292 | 🟢 37% | $5,053 → $18,583 | 7.9% → 3.4% | $398 → $634 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $206,108 | 716 | 8 | **$25,764** | 1.1% | $30,507 | 🔴 84% | $23,706 → $29,193 | 1.2% → 1.0% | $280 → $300 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $199,685 | 308 | 19 | **$10,510** | 6.2% | $30,811 | 🟢 34% | $8,883 → $14,034 | 6.9% → 5.0% | $614 → $702 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $181,953 | 190 | 10 | **$18,195** | 5.3% | $31,041 | 🟡 59% | $20,605 → $15,785 | 4.4% → 6.5% | $912 → $1,025 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $179,037 | 269 | 24 | **$7,460** | 8.9% | $30,977 | 🟢 24% | $9,248 → $5,947 | 7.1% → 11.5% | $652 → $684 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $272,289 | 276 | 22 | **$12,377** | 8.0% | $44,293 | 🟢 28% | $12,099 → $12,778 | 7.6% → 8.6% | $920 → $1,095 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $239,332 | 137 | 10 | **$23,933** | 7.3% | $27,761 | 🔴 86% | $19,946 → $33,237 | 8.4% → 5.6% | $1,682 → $1,846 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $136,445 | 148 | 11 | **$12,404** | 7.4% | $47,662 | 🟢 26% | $12,950 → $11,749 | 6.5% → 9.1% | $835 → $1,068 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $68,457 | 49 | 2 | **$34,228** | 4.1% | $22,685 | 🔴 151% | $19,212 → sin pedidos | 6.7% → 0.0% | $1,281 → $1,581 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $253,884 | 403 | 51 | **$4,978** | 12.7% | $28,051 | 🟢 18% | $5,363 → $4,546 | 11.5% → 14.3% | $616 → $649 |
| V10 | Motorizados - INTER · _LA RUTA_ | $175,133 | 335 | 12 | **$14,594** | 3.6% | $27,659 | 🟡 53% | $19,760 → $10,904 | 2.6% → 5.0% | $507 → $545 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $174,737 | 301 | 24 | **$7,281** | 8.0% | $27,708 | 🟢 26% | $6,849 → $7,999 | 7.8% → 8.3% | $532 → $667 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $136,469 | 449 | 7 | **$19,496** | 1.6% | $27,806 | 🟡 70% | $19,052 → $20,086 | 1.6% → 1.5% | $306 → $301 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $495 · 9 · $4,680 | $449 · 4 · $8,877 | $453 · 3 · $9,809 | $430 · 3 · $12,615 | $500 · 9 · $3,945 | $489 · 3 · $9,624 | $853 · 1 · $32,408 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $555 · 3 · $11,654 | $536 · 1 · $31,082 | $641 · 1 · $24,990 | $543 · 3 · $11,035 | $550 · 1 · $30,814 | $711 · 3 · $7,820 | $838 · 3 · $9,782 |
| IMPERMEABLE · TEST Creativos - API | $780 · 1 · $24,953 | $662 · 0 · — | $425 · 4 · $4,033 | $629 · 2 · $10,689 | $680 · 2 · $10,876 | $797 · 0 · — | $739 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $326 · 1 · $23,164 | $327 · 6 · $3,376 | $363 · 5 · $3,557 | $344 · 4 · $5,338 | $411 · 3 · $6,579 | $532 · 2 · $7,442 | $633 · 1 · $19,614 |
| IMPERMEABLE · Motorizados - API | $477 · 3 · $7,640 | $377 · 6 · $3,334 | $351 · 4 · $4,208 | $390 · 3 · $7,029 | $543 · 1 · $20,077 | $597 · 1 · $17,313 | $834 · 1 · $18,358 |
| Q58 · Domiciliarios - Expancion - Q58 | $307 · 1 · $34,111 | $258 · 3 · $9,706 | $295 · 0 · — | $265 · 1 · $32,606 | $314 · 0 · — | $290 · 1 · $22,652 | $294 · 2 · $17,071 |
| Q58 · Motorizados - Q58 | $738 · 3 · $11,556 | $646 · 4 · $6,297 | $441 · 5 · $5,117 | $683 · 1 · $30,034 | $853 · 1 · $28,151 | $646 · 0 · — | $642 · 5 · $5,782 |
| Q58 · Domiciliarios Q58 - | $975 · 1 · $31,193 | $919 · 1 · $25,734 | $1,059 · 1 · $19,055 | $773 · 2 · $13,522 | $1,156 · 3 · $10,021 | $1,066 · 2 · $11,720 | $877 · 0 · — |
| Q58 · Domiciliarios VIDEO Q58 - | $701 · 4 · $7,188 | $619 · 3 · $8,250 | $741 · 1 · $21,500 | $581 · 3 · $8,909 | $697 · 3 · $9,751 | $798 · 3 · $7,182 | $602 · 7 · $3,787 |
| RADIO · RADIO - Seguridad / Negocios | $831 · 2 · $21,614 | $976 · 7 · $5,298 | $1,003 · 3 · $11,031 | $914 · 1 · $43,877 | $873 · 5 · $7,860 | $1,417 · 2 · $19,124 | $1,135 · 2 · $18,728 |
| RADIO · RADIO - Moteros | $1,835 · 1 · $38,542 | $3,195 · 0 · — | $1,572 · 4 · $7,860 | $1,178 · 2 · $18,844 | $1,702 · 1 · $37,435 | $2,246 · 1 · $29,196 | $1,741 · 1 · $33,079 |
| RADIO · RADIO - Fincas | $801 · 1 · $22,424 | $1,231 · 1 · $18,471 | $752 · 1 · $15,786 | $725 · 3 · $7,007 | $1,388 · 1 · $22,211 | $639 · 2 · $6,393 | $1,250 · 2 · $11,874 |
| RADIO · RADIO - Broad | $1,997 · 0 · — | $942 · 0 · — | $1,435 · 2 · $3,588 | $1,184 · 0 · — | $1,465 · 0 · — | sin conv · 0 · — | $967 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $701 · 13 · $3,237 | $685 · 4 · $8,567 | $528 · 2 · $15,589 | $565 · 8 · $4,658 | $641 · 7 · $5,496 | $601 · 11 · $3,057 | $711 · 6 · $6,166 |
| V10 · Motorizados - INTER | $524 · 0 · — | $540 · 2 · $12,160 | $517 · 2 · $9,822 | $460 · 1 · $27,578 | $558 · 2 · $14,784 | $639 · 1 · $19,814 | $481 · 4 · $6,738 |
| V10 · Domiciliarios - Expancion - INTER | $618 · 8 · $3,706 | $432 · 2 · $12,531 | $621 · 3 · $6,622 | $512 · 2 · $14,082 | $682 · 2 · $12,616 | $700 · 5 · $4,618 | $623 · 2 · $11,835 |
| V10 · Domiciliarios INTER - API | $319 · 2 · $11,480 | $301 · 0 · — | $317 · 0 · — | $288 · 2 · $9,228 | $315 · 1 · $21,435 | $306 · 0 · — | $284 · 2 · $10,220 |

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
