# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-19 16:07 Bogota.** Ventana **2026-10-20 a 2026-11-18** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $3,151,862 | 6072 | 385 | **$8,187** | $519 | 6.34% | $46,840,000 |
| **Q58** | $3,141,160 | 6601 | 270 | **$11,634** | $476 | 4.09% | $40,655,900 |
| **RADIO** | $2,649,392 | 2262 | 141 | **$18,790** | $1,171 | 6.23% | $20,699,000 |
| **IMPERMEABLE** | $3,893,291 | 7390 | 386 | **$10,086** | $527 | 5.22% | $35,726,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$12,835,705** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 2 |
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

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-20 | $122,260 | 10 | $12,226 | $121,312 | 10 | $12,131 | $0 | 0 | — | $141,288 | 11 | $12,844 |
| 2026-10-21 | $97,043 | 19 | $5,108 | $90,730 | 11 | $8,248 | $0 | 0 | — | $155,630 | 17 | $9,155 |
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,879 | 23 | $6,125 |
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 10 | $8,541 | $0 | 0 | — | $126,349 | 16 | $7,897 |
| 2026-10-24 | $97,013 | 7 | $13,859 | $93,988 | 7 | $13,427 | $56,108 | 1 | $56,108 | $137,755 | 8 | $17,219 |
| 2026-10-25 | $112,119 | 9 | $12,458 | $92,001 | 10 | $9,200 | $53,118 | 5 | $10,624 | $146,575 | 14 | $10,470 |
| 2026-10-26 | $124,687 | 15 | $8,312 | $120,150 | 16 | $7,509 | $70,267 | 3 | $23,422 | $170,157 | 13 | $13,089 |
| 2026-10-27 | $93,004 | 15 | $6,200 | $89,044 | 10 | $8,904 | $85,964 | 3 | $28,655 | $130,310 | 22 | $5,923 |
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 9 | $9,532 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 3 | $32,747 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 11 | $10,125 | $131,600 | 12 | $10,967 |
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
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
| **V10** | $36,902 | **$27,779** | $8,187 | 🟢 3.4x | $7,543,155 |
| **Q58** | $41,000 | **$30,943** | $11,634 | 🟡 2.7x | $5,213,572 |
| **RADIO** | $51,742 | **$39,236** | $18,790 | 🟡 2.1x | $2,882,875 |
| **IMPERMEABLE** | $25,853 | **$19,250** | $10,086 | 🟡 1.9x | $3,537,018 |

**Utilidad de la ventana: $19,176,620** ($639,221/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-10-20 a 2026-11-03 · mitad 2: 2026-11-04 a 2026-11-18. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $1,049,958 | 2023 | 108 | **$9,722** | 5.3% | $18,899 | 🟡 51% | $11,109 → $8,653 | 4.0% → 7.2% | $446 → $619 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $981,258 | 1556 | 59 | **$16,631** | 3.8% | $18,063 | 🔴 92% | $16,550 → $16,728 | 3.3% → 4.5% | $554 → $753 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $663,169 | 1163 | 43 | **$15,423** | 3.7% | $19,349 | 🔴 80% | $15,213 → $15,687 | 3.3% → 4.4% | $499 → $692 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $599,976 | 1481 | 87 | **$6,896** | 5.9% | $20,710 | 🟢 33% | $6,474 → $7,370 | 5.4% → 6.6% | $347 → $486 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $598,930 | 1167 | 57 | **$10,508** | 4.9% | $18,859 | 🟡 56% | $10,258 → $10,766 | 4.4% → 5.6% | $449 → $598 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $811,185 | 1224 | 64 | **$12,675** | 5.2% | $31,491 | 🟢 40% | $12,584 → $12,755 | 5.1% → 5.3% | $648 → $677 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $754,319 | 1812 | 58 | **$13,006** | 3.2% | $30,691 | 🟢 42% | $9,455 → $20,895 | 2.7% → 5.2% | $259 → $1,078 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $754,276 | 976 | 85 | **$8,874** | 8.7% | $30,973 | 🟢 29% | $8,381 → $9,429 | 9.1% → 8.4% | $759 → $787 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $716,716 | 2489 | 45 | **$15,927** | 1.8% | $30,512 | 🟡 52% | $9,383 → $29,014 | 2.9% → 1.0% | $268 → $303 |
| Q58 | Domiciliarios - Expancion - Q58 · _COMBO DOS_ | $104,664 | 100 | 3 | **$34,888** | 3.0% | $25,567 | 🔴 136% | $34,888 → — | 3.0% → — | $1,047 → — |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $943,538 | 914 | 67 | **$14,083** | 7.3% | $44,118 | 🟢 32% | $19,012 → $12,272 | 4.9% → 8.9% | $940 → $1,093 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $815,218 | 522 | 36 | **$22,645** | 6.9% | $29,768 | 🔴 76% | $19,333 → $25,011 | 7.0% → 6.8% | $1,361 → $1,700 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $520,647 | 567 | 24 | **$21,694** | 4.2% | $45,153 | 🟢 48% | $27,446 → $18,817 | 3.1% → 5.2% | $844 → $981 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $369,989 | 259 | 10 | **$36,999** | 3.9% | $25,874 | 🔴 143% | $54,639 → $25,239 | 2.6% → 5.7% | $1,419 → $1,442 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $989,168 | 1527 | 153 | **$6,465** | 10.0% | $28,158 | 🟢 23% | $6,733 → $6,262 | 8.9% → 11.0% | $602 → $690 |
| V10 | Motorizados - INTER · _LA RUTA_ | $756,532 | 1329 | 60 | **$12,609** | 4.5% | $27,669 | 🟢 46% | $11,473 → $13,998 | 5.0% → 4.1% | $568 → $570 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $754,487 | 1225 | 87 | **$8,672** | 7.1% | $27,669 | 🟢 31% | $10,760 → $7,267 | 5.8% → 8.3% | $629 → $604 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $651,675 | 1991 | 60 | **$10,861** | 3.0% | $28,272 | 🟢 38% | $9,236 → $13,668 | 3.6% → 2.3% | $334 → $320 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $878 · 1 · $26,329 | $833 · 6 · $6,942 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $878 · 1 · $34,233 |
| IMPERMEABLE · TEST Creativos - API | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,915 | $690 · 1 · $23,451 |
| IMPERMEABLE · Motorizados - API | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $693 · 0 · — |
| Q58 · Motorizados - Q58 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,383 |
| Q58 · Domiciliarios Q58 - | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,136 · 2 · $14,204 |
| Q58 · Domiciliarios VIDEO Q58 - | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,100 · 2 · $13,198 |
| Q58 · Domiciliarios - Expancion - Q58 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $297 · 2 · $15,318 |
| RADIO · RADIO - Seguridad / Negocios | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,113 · 4 · $11,128 |
| RADIO · RADIO - Moteros | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,559 · 1 · $38,983 |
| RADIO · RADIO - Fincas | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,355 · 1 · $23,032 |
| RADIO · RADIO - Broad | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,772 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,236 |
| V10 · Motorizados - INTER | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $572 · 2 · $12,016 |
| V10 · Domiciliarios - Expancion - INTER | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,624 |
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
