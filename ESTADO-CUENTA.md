# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-01 21:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$196,695** |
| gastado hoy (hasta las 21h) | $402,226 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $421,445 |
| saldo proyectado a medianoche | $177,476 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $55,999 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-28 | $405,854 | 739 | **$549** | $3,709 | 6.75 |
| 2026-10-29 | $412,396 | 814 | **$507** | $3,645 | 7.20 |
| 2026-10-30 | $379,712 | 680 | **$558** | $4,153 | 7.44 |
| 2026-10-31 | $412,342 | 671 | **$615** | $4,097 | 6.67 |
| 2026-11-01 **HOY** | $402,226 | 697 | **$577** | $4,096 | 7.10 |

🟢 **Hoy va mejor que ayer a la misma hora** ($577 vs $615).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   577  =  $ 4,096  ÷  7.10
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,096 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.10 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $40,772 | 102% | 47 | $867 | 5.26 |
| Domiciliarios VIDEO INTER - API | $36,000 | $33,889 | 94% | 41 | $827 | 5.67 |
| Domiciliarios - API | $35,000 | $33,190 | 95% | 65 | $511 | 10.67 |
| RADIO - Moteros | $35,000 | $32,036 | 92% | 24 | $1,335 | 3.37 |
| Domiciliarios - Expancion - Q58 | $29,000 | $29,935 | 103% | 118 | $254 | 9.64 |
| Domiciliarios - Expancion - API | $30,000 | $27,131 | 90% | 41 | $662 | 8.80 |
| Motorizados - Q58 | $29,000 | $25,796 | 89% | 42 | $614 | 4.46 |
| Motorizados - INTER | $25,000 | $25,359 | 101% | 54 | $470 | 15.09 |
| Domiciliarios VIDEO Q58 - | $25,000 | $23,335 | 93% | 35 | $667 | 5.29 |
| Domiciliarios - Expancion - INTER | $25,000 | $20,633 | 83% | 26 | $794 | 4.00 |
| TEST Creativos - API | $20,000 | $18,547 | 93% | 30 | $618 | 6.07 |
| Motorizados - API | $20,000 | $18,372 | 92% | 37 | $497 | 8.99 |
| Domiciliarios INTER - API | $20,000 | $17,695 | 88% | 64 | $276 | 12.86 |
| Domiciliarios VIDEO - API | $20,000 | $17,649 | 88% | 40 | $441 | 7.57 |
| RADIO - Fincas | $20,000 | $14,742 | 74% | 15 | $983 | 4.57 |
| Domiciliarios Q58 - | $25,000 | $12,215 | 49% | 9 | $1,357 | 5.27 |
| RADIO - Broad | $10,000 | $10,930 | 109% | 9 | $1,214 | 6.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $402,226 | 697 | **$577** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,608**/pedido |
| utilidad estimada de lo que va del día | **$716,636** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,001 | $736 | $770 | $1,078 | $833 | $867 | 🟡 |
| Domiciliarios VIDEO INTER - API | $642 | $547 | $500 | $702 | $521 | $827 | 🔴 |
| Domiciliarios - API | $371 | $379 | $543 | $452 | $439 | $511 | 🔴 |
| RADIO - Moteros | $1,162 | $1,514 | $1,349 | $1,068 | $1,791 | $1,335 | 🟢 |
| Domiciliarios - Expancion - Q58 | $250 | $326 | $252 | $267 | $268 | $254 | 🟢 |
| Domiciliarios - Expancion - API | $671 | $746 | $466 | $657 | $553 | $662 | 🔴 |
| Motorizados - Q58 | $607 | $631 | $633 | $616 | $738 | $614 | 🟢 |
| Motorizados - INTER | $532 | $547 | $496 | $869 | $539 | $470 | 🟢 |
| Domiciliarios VIDEO Q58 - | $691 | $913 | $733 | $586 | $843 | $667 | 🟢 |
| Domiciliarios - Expancion - INTER | $499 | $643 | $685 | $557 | $1,062 | $794 | 🟢 |
| TEST Creativos - API | $387 | $574 | $508 | $726 | $541 | $618 | 🟡 |
| Motorizados - API | $359 | $459 | $524 | $566 | $497 | $497 | 🟡 |
| Domiciliarios INTER - API | $319 | $322 | $322 | $295 | $462 | $276 | 🟢 |
| Domiciliarios VIDEO - API | $308 | $355 | $423 | $415 | $340 | $441 | 🔴 |
| RADIO - Fincas | $751 | $752 | $1,545 | $1,153 | $945 | $983 | 🟡 |
| Domiciliarios Q58 - | $202 | $199 | $193 | $183 | $1,927 | $1,357 | 🟢 |
| RADIO - Broad | $1,440 | $1,612 | $1,310 | $1,802 | $1,668 | $1,214 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 5.10 | 6.39 | 6.46 | 4.30 | 6.02 | 5.26 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.83 | 8.47 | 8.21 | 7.31 | 8.48 | 5.67 | 🔴 |
| Domiciliarios - API | 13.28 | 12.74 | 7.95 | 11.25 | 11.52 | 10.67 | 🟡 |
| RADIO - Moteros | 3.39 | 2.80 | 3.09 | 3.71 | 2.24 | 3.37 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.69 | 7.51 | 9.44 | 10.66 | 10.19 | 9.64 | 🟡 |
| Domiciliarios - Expancion - API | 6.89 | 5.97 | 8.78 | 7.64 | 9.43 | 8.80 | 🟡 |
| Motorizados - Q58 | 4.49 | 3.47 | 4.69 | 4.92 | 3.40 | 4.46 | 🟢 |
| Motorizados - INTER | 13.22 | 11.22 | 10.87 | 8.38 | 13.19 | 15.09 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.31 | 4.28 | 5.08 | 7.07 | 4.16 | 5.29 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.15 | 4.81 | 4.37 | 6.17 | 2.69 | 4.00 | 🟢 |
| TEST Creativos - API | 12.47 | 6.05 | 6.13 | 4.34 | 6.22 | 6.07 | 🟡 |
| Motorizados - API | 12.17 | 9.23 | 7.42 | 7.66 | 8.55 | 8.99 | 🟢 |
| Domiciliarios INTER - API | 8.52 | 9.99 | 10.96 | 13.57 | 8.56 | 12.86 | 🟢 |
| Domiciliarios VIDEO - API | 12.62 | 10.10 | 7.78 | 8.38 | 9.68 | 7.57 | 🔴 |
| RADIO - Fincas | 5.51 | 4.83 | 2.47 | 3.84 | 4.77 | 4.57 | 🟡 |
| Domiciliarios Q58 - | 10.98 | 10.83 | 10.39 | 13.30 | 2.99 | 5.27 | 🟢 |
| RADIO - Broad | 4.76 | 3.50 | 5.18 | 4.49 | 4.87 | 6.03 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |

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
