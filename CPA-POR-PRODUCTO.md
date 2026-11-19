# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-19 16:07 Bogota.** Ventana **2026-11-05 a 2026-11-18** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $1,509,943 | 2857 | 190 | **$7,947** | $529 | 6.65% | $23,018,000 |
| **Q58** | $1,538,135 | 2756 | 109 | **$14,111** | $558 | 3.96% | $16,502,900 |
| **RADIO** | $1,487,030 | 1193 | 91 | **$16,341** | $1,246 | 7.63% | $13,779,000 |
| **IMPERMEABLE** | $1,784,305 | 2813 | 177 | **$10,081** | $634 | 6.29% | $16,622,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$6,319,413** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249894780920390` -> {'Q58': 75, 'V10': 1}
- `120249619616140390` -> {'V10': 218, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250016232010390` -> {'RADIO': 71, 'Q58': 1}
- `120249619832930390` -> {'V10': 150, 'Q58': 5}
- `120249499375070390` -> {'V10': 1, 'IMPERMEABLE': 226}
- `120249894780890390` -> {'Q58': 95, 'V10': 1}
- `120250016231990390` -> {'RADIO': 23, 'Q58': 1}
- `120250027970510390` -> {'Q58': 44, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 132, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 132, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,559 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,047 | 10 | $9,505 |
| 2026-11-18 | $113,304 | 15 | $7,554 | $117,824 | 7 | $16,832 | $117,161 | 6 | $19,527 | $142,760 | 9 | $15,862 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,878 | **$27,761** | $7,947 | 🟢 3.5x | $3,764,643 |
| **Q58** | $41,496 | **$31,326** | $14,111 | 🟡 2.2x | $1,876,402 |
| **RADIO** | $53,856 | **$40,868** | $16,341 | 🟡 2.5x | $2,231,955 |
| **IMPERMEABLE** | $26,263 | **$19,566** | $10,081 | 🟡 1.9x | $1,678,955 |

**Utilidad de la ventana: $9,551,955** ($682,283/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-05 a 2026-11-11 · mitad 2: 2026-11-12 a 2026-11-18. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $500,949 | 790 | 57 | **$8,789** | 7.2% | $18,778 | 🟢 47% | $7,556 → $10,367 | 6.6% → 8.2% | $499 → $850 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $427,161 | 563 | 25 | **$17,086** | 4.4% | $18,204 | 🔴 94% | $13,857 → $21,930 | 4.3% → 4.6% | $602 → $1,006 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $286,803 | 581 | 38 | **$7,547** | 6.5% | $21,635 | 🟢 35% | $6,222 → $9,370 | 6.3% → 7.0% | $390 → $652 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $284,831 | 404 | 19 | **$14,991** | 4.7% | $19,122 | 🔴 78% | $15,540 → $14,497 | 4.2% → 5.2% | $657 → $759 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $284,561 | 475 | 26 | **$10,945** | 5.5% | $19,096 | 🟡 57% | $7,196 → $21,120 | 6.5% → 3.8% | $470 → $803 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $414,072 | 1348 | 14 | **$29,577** | 1.0% | $30,521 | 🔴 97% | $25,786 → $34,631 | 1.1% → 0.9% | $288 → $329 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $411,327 | 605 | 31 | **$13,269** | 5.1% | $32,283 | 🟢 41% | $10,510 → $17,636 | 6.2% → 4.0% | $648 → $713 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $356,686 | 338 | 17 | **$20,982** | 5.0% | $31,037 | 🟡 68% | $18,196 → $24,960 | 5.3% → 4.7% | $958 → $1,181 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $356,050 | 465 | 38 | **$9,370** | 8.2% | $30,959 | 🟢 30% | $7,460 → $12,643 | 8.9% → 7.1% | $666 → $903 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $566,881 | 524 | 47 | **$12,061** | 9.0% | $44,788 | 🟢 27% | $12,387 → $11,775 | 8.0% → 10.1% | $987 → $1,187 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $496,438 | 293 | 20 | **$24,822** | 6.8% | $30,767 | 🔴 81% | $29,954 → $21,401 | 5.8% → 7.7% | $1,749 → $1,646 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $281,671 | 278 | 15 | **$18,778** | 5.4% | $49,097 | 🟢 38% | $12,410 → $36,289 | 7.4% → 3.1% | $922 → $1,117 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $142,040 | 98 | 6 | **$23,673** | 6.1% | $24,139 | 🔴 98% | $34,244 → $18,388 | 4.1% → 8.2% | $1,398 → $1,501 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $515,213 | 744 | 81 | **$6,361** | 10.9% | $28,010 | 🟢 23% | $4,980 → $8,708 | 12.7% → 8.8% | $630 → $766 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $356,104 | 591 | 50 | **$7,122** | 8.5% | $27,670 | 🟢 26% | $7,282 → $6,975 | 8.0% → 9.0% | $581 → $625 |
| V10 | Motorizados - INTER · _LA RUTA_ | $354,647 | 626 | 23 | **$15,419** | 3.7% | $27,673 | 🟡 56% | $14,609 → $16,304 | 3.6% → 3.8% | $523 → $616 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $283,979 | 896 | 21 | **$13,523** | 2.3% | $27,823 | 🟢 49% | $19,505 → $10,532 | 1.6% → 3.1% | $304 → $330 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $878 · 1 · $26,329 | $833 · 6 · $6,942 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $878 · 1 · $34,233 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,915 | $690 · 1 · $23,451 |
| IMPERMEABLE · TEST Creativos - API | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 |
| IMPERMEABLE · Motorizados - API | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $693 · 0 · — |
| Q58 · Domiciliarios - Expancion - Q58 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $297 · 2 · $15,318 |
| Q58 · Motorizados - Q58 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,383 |
| Q58 · Domiciliarios Q58 - | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,136 · 2 · $14,204 |
| Q58 · Domiciliarios VIDEO Q58 - | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,100 · 2 · $13,198 |
| RADIO · RADIO - Seguridad / Negocios | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,113 · 4 · $11,128 |
| RADIO · RADIO - Moteros | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,559 · 1 · $38,983 |
| RADIO · RADIO - Fincas | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,355 · 1 · $23,032 |
| RADIO · RADIO - Broad | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,772 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,236 |
| V10 · Domiciliarios - Expancion - INTER | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,624 |
| V10 · Motorizados - INTER | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $572 · 2 · $12,016 |
| V10 · Domiciliarios INTER - API | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,777 | $311 · 3 · $7,149 |

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
