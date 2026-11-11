# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-10 21:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$188,402** |
| gastado hoy (hasta las 21h) | $306,473 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $337,404 |
| saldo proyectado a medianoche | $157,472 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $160,045 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-06 | $408,743 | 732 | **$558** | $3,206 | 5.74 |
| 2026-11-07 | $364,615 | 662 | **$551** | $3,174 | 5.76 |
| 2026-11-08 | $442,683 | 822 | **$539** | $2,782 | 5.17 |
| 2026-11-09 | $443,944 | 702 | **$632** | $3,278 | 5.18 |
| 2026-11-10 **HOY** | $306,473 | 464 | **$661** | $3,914 | 5.93 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($661 vs $632).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   661  =  $ 3,914  ÷  5.93
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,914 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.93 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $32,147 | 80% | 23 | $1,398 | 2.88 |
| Domiciliarios VIDEO INTER - API | $36,000 | $25,584 | 71% | 41 | $624 | 8.68 |
| Domiciliarios - API | $35,000 | $23,653 | 68% | 50 | $473 | 8.54 |
| RADIO - Moteros | $35,000 | $23,385 | 67% | 11 | $2,126 | 2.62 |
| Motorizados - Q58 | $29,000 | $21,465 | 74% | 29 | $740 | 4.08 |
| Domiciliarios Q58 - | $25,000 | $19,228 | 77% | 17 | $1,131 | 3.33 |
| Domiciliarios - Expancion - Q58 | $29,000 | $19,144 | 66% | 64 | $299 | 8.76 |
| Domiciliarios - Expancion - API | $30,000 | $18,864 | 63% | 23 | $820 | 5.45 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,214 | 73% | 29 | $628 | 4.29 |
| Domiciliarios VIDEO Q58 - | $25,000 | $17,816 | 71% | 17 | $1,048 | 3.08 |
| Motorizados - INTER | $25,000 | $16,554 | 66% | 30 | $552 | 10.21 |
| Domiciliarios INTER - API | $20,000 | $15,013 | 75% | 52 | $289 | 11.59 |
| Motorizados - API | $20,000 | $14,159 | 71% | 22 | $644 | 5.59 |
| TEST Creativos - API | $20,000 | $12,899 | 64% | 15 | $860 | 7.10 |
| Domiciliarios VIDEO - API | $20,000 | $11,671 | 58% | 25 | $467 | 7.97 |
| RADIO - Fincas | $20,000 | $10,310 | 52% | 16 | $644 | 7.96 |
| RADIO - Broad | $10,000 | $6,367 | 64% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $306,473 | 464 | **$661** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,142**/pedido |
| utilidad estimada de lo que va del día | **$438,365** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $831 | $976 | $1,003 | $914 | $873 | $1,398 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $685 | $528 | $565 | $641 | $624 | 🟡 |
| Domiciliarios - API | $495 | $449 | $453 | $430 | $500 | $473 | 🟢 |
| RADIO - Moteros | $1,835 | $3,195 | $1,572 | $1,178 | $1,701 | $2,126 | 🔴 |
| Motorizados - Q58 | $738 | $646 | $441 | $683 | $853 | $740 | 🟢 |
| Domiciliarios Q58 - | $975 | $919 | $1,059 | $773 | $1,156 | $1,131 | 🟡 |
| Domiciliarios - Expancion - Q58 | $307 | $258 | $295 | $265 | $314 | $299 | 🟡 |
| Domiciliarios - Expancion - API | $555 | $536 | $641 | $543 | $550 | $820 | 🔴 |
| Domiciliarios - Expancion - INTER | $618 | $432 | $621 | $512 | $682 | $628 | 🟢 |
| Domiciliarios VIDEO Q58 - | $701 | $619 | $741 | $581 | $697 | $1,048 | 🔴 |
| Motorizados - INTER | $524 | $540 | $517 | $460 | $558 | $552 | 🟡 |
| Domiciliarios INTER - API | $319 | $301 | $317 | $288 | $315 | $289 | 🟢 |
| Motorizados - API | $477 | $377 | $351 | $390 | $543 | $644 | 🔴 |
| TEST Creativos - API | $780 | $662 | $425 | $629 | $680 | $860 | 🔴 |
| Domiciliarios VIDEO - API | $326 | $327 | $363 | $344 | $411 | $467 | 🟡 |
| RADIO - Fincas | $801 | $1,231 | $752 | $725 | $1,388 | $644 | 🟢 |
| RADIO - Broad | $1,997 | $942 | $1,435 | $1,184 | $1,465 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 4.32 | 3.19 | 3.41 | 3.05 | 4.26 | 2.88 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.93 | 6.95 | 8.11 | 6.57 | 6.48 | 8.68 | 🟢 |
| Domiciliarios - API | 8.64 | 8.77 | 8.32 | 8.43 | 7.59 | 8.54 | 🟢 |
| RADIO - Moteros | 1.94 | 1.13 | 2.45 | 2.63 | 2.37 | 2.62 | 🟢 |
| Motorizados - Q58 | 3.07 | 2.94 | 4.45 | 2.40 | 2.64 | 4.08 | 🟢 |
| Domiciliarios Q58 - | 4.32 | 3.03 | 2.54 | 3.14 | 2.67 | 3.33 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.54 | 8.12 | 7.82 | 7.28 | 6.45 | 8.76 | 🟢 |
| Domiciliarios - Expancion - API | 7.98 | 7.65 | 6.44 | 6.71 | 6.71 | 5.45 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.10 | 4.91 | 3.36 | 3.65 | 3.59 | 4.29 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.90 | 4.63 | 3.43 | 3.96 | 3.27 | 3.08 | 🟡 |
| Motorizados - INTER | 11.50 | 10.43 | 9.79 | 8.69 | 8.39 | 10.21 | 🟢 |
| Domiciliarios INTER - API | 9.65 | 10.36 | 8.21 | 8.60 | 9.41 | 11.59 | 🟢 |
| Motorizados - API | 7.85 | 9.51 | 8.93 | 7.88 | 5.65 | 5.59 | 🟡 |
| TEST Creativos - API | 6.18 | 6.64 | 11.59 | 7.61 | 8.46 | 7.10 | 🔴 |
| Domiciliarios VIDEO - API | 9.54 | 9.47 | 8.74 | 7.31 | 7.66 | 7.97 | 🟡 |
| RADIO - Fincas | 4.89 | 2.79 | 4.91 | 4.90 | 3.22 | 7.96 | 🟢 |
| RADIO - Broad | 3.58 | 6.44 | 3.79 | 5.20 | 4.47 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,425 | 752 | $627 | $3,268 | 5.21 | $735,726 |

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
