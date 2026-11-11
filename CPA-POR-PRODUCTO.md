# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-11 12:05 Bogota.** Ventana **2026-11-04 a 2026-11-10** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $723,424 | 1431 | 98 | **$7,382** | $506 | 6.85% | $11,914,000 |
| **Q58** | $735,635 | 1399 | 62 | **$11,865** | $526 | 4.43% | $9,307,000 |
| **RADIO** | $703,047 | 606 | 44 | **$15,978** | $1,160 | 7.26% | $6,636,000 |
| **IMPERMEABLE** | $839,109 | 1729 | 108 | **$7,770** | $485 | 6.25% | $9,937,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,001,215** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120250016231990390` -> {'RADIO': 18, 'Q58': 1}
- `120249894780920390` -> {'Q58': 55, 'V10': 1}
- `120249619616140390` -> {'V10': 182, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 120, 'Q58': 4}
- `120249499411810390` -> {'V10': 1, 'IMPERMEABLE': 125}
- `120249894780890390` -> {'Q58': 74, 'V10': 1}
- `120250016232010390` -> {'RADIO': 39, 'Q58': 1}
- `120250027970510390` -> {'Q58': 36, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 116, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,868 | 18 | $7,104 |
| 2026-11-10 | $94,820 | 18 | $5,268 | $94,610 | 7 | $13,516 | $87,315 | 6 | $14,552 | $98,997 | 9 | $11,000 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,805 | **$27,705** | $7,382 | 🟢 3.8x | $1,991,647 |
| **Q58** | $41,099 | **$31,020** | $11,865 | 🟡 2.6x | $1,187,577 |
| **RADIO** | $54,194 | **$41,129** | $15,978 | 🟡 2.6x | $1,106,635 |
| **IMPERMEABLE** | $25,805 | **$19,212** | $7,770 | 🟡 2.5x | $1,235,835 |

**Utilidad de la ventana: $5,521,694** ($788,813/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-04 a 2026-11-07 · mitad 2: 2026-11-08 a 2026-11-10. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $235,912 | 510 | 35 | **$6,740** | 6.9% | $18,191 | 🟢 37% | $6,696 → $6,800 | 6.8% → 6.9% | $459 → $468 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $202,549 | 347 | 14 | **$14,468** | 4.0% | $17,564 | 🔴 82% | $16,503 → $12,433 | 3.6% → 4.7% | $586 → $580 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $135,042 | 298 | 20 | **$6,752** | 6.7% | $18,706 | 🟢 36% | $5,109 → $11,682 | 8.4% → 4.2% | $431 → $487 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $133,099 | 213 | 9 | **$14,789** | 4.2% | $18,902 | 🔴 78% | $14,965 → $14,568 | 3.9% → 4.7% | $585 → $686 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $132,507 | 361 | 24 | **$5,521** | 6.6% | $21,095 | 🟢 26% | $5,105 → $6,214 | 6.7% → 6.5% | $343 → $405 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $193,106 | 299 | 17 | **$11,359** | 5.7% | $30,667 | 🟢 37% | $7,186 → $42,661 | 8.3% → 1.7% | $599 → $717 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $193,015 | 689 | 7 | **$27,574** | 1.0% | $30,521 | 🔴 90% | $21,413 → $42,974 | 1.3% → 0.7% | $275 → $287 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $175,922 | 172 | 11 | **$15,993** | 6.4% | $31,029 | 🟡 52% | $23,853 → $11,502 | 4.5% → 8.4% | $1,072 → $970 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $173,592 | 239 | 19 | **$9,136** | 7.9% | $31,060 | 🟢 29% | $9,610 → $8,610 | 8.1% → 7.8% | $775 → $674 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $268,989 | 269 | 22 | **$12,227** | 8.2% | $44,457 | 🟢 28% | $10,561 → $15,142 | 9.4% → 6.7% | $992 → $1,009 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $234,838 | 134 | 10 | **$23,484** | 7.5% | $27,761 | 🔴 85% | $21,788 → $26,028 | 9.0% → 6.0% | $1,951 → $1,554 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $132,039 | 158 | 10 | **$13,204** | 6.3% | $48,153 | 🟢 27% | $19,022 → $9,325 | 4.3% → 9.2% | $818 → $861 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $67,181 | 45 | 2 | **$33,590** | 4.4% | $22,685 | 🔴 148% | $17,989 → sin pedidos | 7.4% → 0.0% | $1,333 → $1,734 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $246,400 | 396 | 51 | **$4,831** | 12.9% | $28,044 | 🟢 17% | $5,483 → $4,205 | 11.7% → 14.3% | $641 → $601 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $172,838 | 298 | 24 | **$7,202** | 8.1% | $27,674 | 🟢 26% | $6,424 → $8,497 | 8.7% → 7.2% | $557 → $612 |
| V10 | Motorizados - INTER · _LA RUTA_ | $171,458 | 316 | 12 | **$14,288** | 3.8% | $27,590 | 🟡 52% | $11,814 → $19,236 | 4.7% → 2.8% | $550 → $534 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $132,728 | 421 | 6 | **$22,121** | 1.4% | $27,400 | 🔴 81% | $24,827 → $19,416 | 1.3% → 1.6% | $325 → $303 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $426 · 4 · $6,717 | $495 · 9 · $4,680 | $449 · 4 · $8,877 | $453 · 3 · $9,809 | $430 · 3 · $12,615 | $500 · 9 · $3,945 | $485 · 3 · $9,548 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $662 · 2 · $12,243 | $555 · 3 · $11,654 | $536 · 1 · $31,082 | $641 · 1 · $24,990 | $543 · 3 · $11,035 | $550 · 1 · $30,797 | $701 · 3 · $7,709 |
| IMPERMEABLE · Motorizados - API | $582 · 2 · $8,439 | $477 · 3 · $7,640 | $377 · 6 · $3,334 | $351 · 4 · $4,208 | $390 · 3 · $7,029 | $543 · 1 · $20,077 | $595 · 1 · $17,244 |
| IMPERMEABLE · TEST Creativos - API | $490 · 0 · — | $780 · 1 · $24,953 | $662 · 0 · — | $425 · 4 · $4,033 | $629 · 2 · $10,689 | $680 · 2 · $10,876 | $797 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $375 · 3 · $5,123 | $326 · 1 · $23,164 | $327 · 6 · $3,376 | $363 · 5 · $3,557 | $344 · 4 · $5,338 | $411 · 3 · $6,579 | $530 · 2 · $7,420 |
| Q58 · Motorizados - Q58 | $621 · 3 · $7,447 | $738 · 3 · $11,556 | $646 · 4 · $6,297 | $441 · 5 · $5,117 | $683 · 1 · $30,034 | $853 · 1 · $28,151 | $646 · 0 · — |
| Q58 · Domiciliarios - Expancion - Q58 | $238 · 1 · $21,145 | $307 · 1 · $34,111 | $258 · 3 · $9,706 | $295 · 0 · — | $265 · 1 · $32,606 | $314 · 0 · — | $289 · 1 · $22,556 |
| Q58 · Domiciliarios Q58 - | $1,766 · 1 · $19,429 | $975 · 1 · $31,193 | $919 · 1 · $25,734 | $1,059 · 1 · $19,055 | $773 · 2 · $13,522 | $1,156 · 3 · $10,021 | $1,064 · 2 · $11,702 |
| Q58 · Domiciliarios VIDEO Q58 - | $1,507 · 2 · $10,547 | $701 · 4 · $7,188 | $619 · 3 · $8,250 | $741 · 1 · $21,500 | $581 · 3 · $8,909 | $697 · 3 · $9,751 | $797 · 3 · $7,171 |
| RADIO · RADIO - Seguridad / Negocios | $1,325 · 2 · $17,222 | $831 · 2 · $21,614 | $976 · 7 · $5,298 | $1,003 · 3 · $11,031 | $914 · 1 · $43,877 | $873 · 5 · $7,860 | $1,406 · 2 · $18,980 |
| RADIO · RADIO - Moteros | $1,800 · 1 · $28,792 | $1,835 · 1 · $38,542 | $3,195 · 0 · — | $1,572 · 4 · $7,860 | $1,178 · 2 · $18,844 | $1,702 · 1 · $37,435 | $2,230 · 1 · $28,989 |
| RADIO · RADIO - Fincas | $669 · 1 · $19,407 | $801 · 1 · $22,424 | $1,231 · 1 · $18,471 | $752 · 1 · $15,786 | $725 · 3 · $7,007 | $1,388 · 1 · $22,211 | $636 · 2 · $6,360 |
| RADIO · RADIO - Broad | $1,342 · 0 · — | $1,997 · 0 · — | $942 · 0 · — | $1,435 · 2 · $3,588 | $1,184 · 0 · — | $1,465 · 0 · — | sin conv · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $657 · 6 · $4,925 | $701 · 13 · $3,237 | $685 · 4 · $8,567 | $528 · 2 · $15,589 | $565 · 8 · $4,658 | $641 · 7 · $5,496 | $600 · 11 · $3,054 |
| V10 · Domiciliarios - Expancion - INTER | $623 · 2 · $10,894 | $618 · 8 · $3,706 | $432 · 2 · $12,531 | $621 · 3 · $6,622 | $512 · 2 · $14,082 | $682 · 2 · $12,616 | $699 · 5 · $4,615 |
| V10 · Motorizados - INTER | $629 · 4 · $5,822 | $524 · 0 · — | $540 · 2 · $12,160 | $517 · 2 · $9,822 | $460 · 1 · $27,578 | $558 · 2 · $14,784 | $639 · 1 · $19,799 |
| V10 · Domiciliarios INTER - API | $380 · 1 · $16,726 | $319 · 2 · $11,480 | $301 · 0 · — | $317 · 0 · — | $288 · 2 · $9,228 | $315 · 1 · $21,435 | $306 · 0 · — |

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
