# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-31 22:12 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$215,393** |
| gastado hoy (hasta las 22h) | $406,564 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $416,299 |
| saldo proyectado a medianoche | $205,658 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $32,963 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-27 | $391,568 | 850 | **$461** | $3,871 | 8.40 |
| 2026-10-28 | $427,030 | 790 | **$541** | $3,714 | 6.87 |
| 2026-10-29 | $430,577 | 850 | **$507** | $3,663 | 7.23 |
| 2026-10-30 | $396,808 | 706 | **$562** | $4,161 | 7.40 |
| 2026-10-31 **HOY** | $407,166 | 673 | **$605** | $4,152 | 6.86 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($605 vs $562).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   605  =  $ 4,152  ÷  6.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,152 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $34,448 | 86% | 43 | $801 | 6.25 |
| Domiciliarios - API | $35,000 | $32,467 | 93% | 72 | $451 | 11.41 |
| Domiciliarios - Expancion - API | $30,000 | $30,124 | 100% | 56 | $538 | 9.72 |
| RADIO - Moteros | $35,000 | $29,636 | 85% | 16 | $1,852 | 2.18 |
| Domiciliarios VIDEO INTER - API | $36,000 | $29,061 | 81% | 55 | $528 | 8.39 |
| Domiciliarios Q58 - | $25,000 | $27,730 | 111% | 15 | $1,849 | 3.74 |
| Domiciliarios - Expancion - Q58 | $29,000 | $25,447 | 88% | 97 | $262 | 10.41 |
| Motorizados - Q58 | $29,000 | $25,241 | 87% | 34 | $742 | 3.49 |
| Domiciliarios VIDEO Q58 - | $25,000 | $22,917 | 92% | 26 | $881 | 4.18 |
| RADIO - Fincas | $20,000 | $22,783 | 114% | 24 | $949 | 4.91 |
| Domiciliarios - Expancion - INTER | $25,000 | $22,210 | 89% | 22 | $1,010 | 3.08 |
| Motorizados - INTER | $25,000 | $21,982 | 88% | 39 | $564 | 13.20 |
| Domiciliarios INTER - API | $20,000 | $20,283 | 101% | 44 | $461 | 8.57 |
| Domiciliarios VIDEO - API | $20,000 | $19,254 | 96% | 56 | $344 | 9.99 |
| Motorizados - API | $20,000 | $18,066 | 90% | 37 | $488 | 8.87 |
| TEST Creativos - API | $20,000 | $17,582 | 88% | 33 | $533 | 6.53 |
| RADIO - Broad | $10,000 | $7,999 | 80% | 4 | $2,000 | 4.11 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $407,230 | 673 | **$605** | $2,402 | **25%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,123**/pedido |
| utilidad estimada de lo que va del día | **$673,106** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,000 | $1,001 | $736 | $770 | $1,078 | $801 | 🟢 |
| Domiciliarios - API | $459 | $371 | $379 | $543 | $452 | $451 | 🟡 |
| Domiciliarios - Expancion - API | $576 | $671 | $746 | $466 | $657 | $538 | 🟢 |
| RADIO - Moteros | $1,068 | $1,162 | $1,514 | $1,349 | $1,068 | $1,852 | 🔴 |
| Domiciliarios VIDEO INTER - API | $519 | $642 | $547 | $500 | $702 | $528 | 🟢 |
| Domiciliarios Q58 - | $211 | $202 | $199 | $193 | $183 | $1,849 | 🔴 |
| Domiciliarios - Expancion - Q58 | $241 | $250 | $326 | $252 | $267 | $262 | 🟡 |
| Motorizados - Q58 | $769 | $607 | $631 | $633 | $616 | $742 | 🔴 |
| Domiciliarios VIDEO Q58 - | $870 | $691 | $913 | $733 | $586 | $881 | 🔴 |
| RADIO - Fincas | $707 | $751 | $752 | $1,545 | $1,153 | $950 | 🟢 |
| Domiciliarios - Expancion - INTER | $747 | $499 | $643 | $685 | $557 | $1,010 | 🔴 |
| Motorizados - INTER | $543 | $532 | $547 | $496 | $869 | $564 | 🟢 |
| Domiciliarios INTER - API | $332 | $319 | $322 | $322 | $295 | $461 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $308 | $355 | $423 | $415 | $344 | 🟢 |
| Motorizados - API | $426 | $359 | $459 | $524 | $566 | $488 | 🟢 |
| TEST Creativos - API | $490 | $387 | $574 | $508 | $726 | $533 | 🟢 |
| RADIO - Broad | — | $1,440 | $1,612 | $1,310 | $1,802 | $2,000 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 4.36 | 5.10 | 6.39 | 6.46 | 4.30 | 6.25 | 🟢 |
| Domiciliarios - API | 9.11 | 13.28 | 12.74 | 7.95 | 11.25 | 11.41 | 🟡 |
| Domiciliarios - Expancion - API | 7.03 | 6.89 | 5.97 | 8.78 | 7.64 | 9.72 | 🟢 |
| RADIO - Moteros | 3.02 | 3.39 | 2.80 | 3.09 | 3.71 | 2.18 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.12 | 7.83 | 8.47 | 8.21 | 7.31 | 8.39 | 🟢 |
| Domiciliarios Q58 - | 9.12 | 10.98 | 10.83 | 10.39 | 13.30 | 3.74 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.37 | 10.69 | 7.51 | 9.44 | 10.66 | 10.41 | 🟡 |
| Motorizados - Q58 | 4.17 | 4.49 | 3.47 | 4.69 | 4.92 | 3.49 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.70 | 5.31 | 4.28 | 5.08 | 7.07 | 4.18 | 🔴 |
| RADIO - Fincas | 5.16 | 5.51 | 4.83 | 2.47 | 3.84 | 4.90 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.66 | 5.15 | 4.81 | 4.37 | 6.17 | 3.08 | 🔴 |
| Motorizados - INTER | 10.17 | 13.22 | 11.22 | 10.87 | 8.38 | 13.20 | 🟢 |
| Domiciliarios INTER - API | 7.76 | 8.52 | 9.99 | 10.96 | 13.57 | 8.57 | 🔴 |
| Domiciliarios VIDEO - API | 7.54 | 12.62 | 10.10 | 7.78 | 8.38 | 9.99 | 🟢 |
| Motorizados - API | 8.76 | 12.17 | 9.23 | 7.42 | 7.66 | 8.87 | 🟢 |
| TEST Creativos - API | 9.25 | 12.47 | 6.05 | 6.13 | 4.34 | 6.52 | 🟢 |
| RADIO - Broad | — | 4.76 | 3.50 | 5.18 | 4.49 | 4.11 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |

---

## 🔢 Con qué números se calculó lo de arriba

*(Van impresos a propósito: el 5-oct tres de estos estaban viejos y este informe sobreestimaba la utilidad del día en un 78% sin que se notara.)*

| supuesto | valor | medido en |
|---|---|---|
| cierre (pedidos / conversaciones) | **5.44%** | 188 pedidos / 3.454 conv · 6 días cerrados al 4-oct |
| tasa de devolución | **22.8%** | 386 guías, corte 30-sep (IC 16,8–30,2%) |
| costo de una devolución | **$3,109** | solo la prima del seguro — regla 0-AY |
| margen por unidad | $23,244 | 39 unidades (0-AX) |
| unidades por pedido | 1.3 | |

⚠️ **El margen y las unidades son los del impermeable.** Con dos productos vendiendo mitad y mitad, un solo margen promedia cosas distintas: el CPA y la utilidad de cada producto están en [`CPA-POR-PRODUCTO.md`](CPA-POR-PRODUCTO.md), que cruza el gasto **por anuncio** contra los pedidos y no estima nada.

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
