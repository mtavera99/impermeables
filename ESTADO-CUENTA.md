# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-25 21:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$200,698** |
| gastado hoy (hasta las 21h) | $344,151 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $356,950 |
| saldo proyectado a medianoche | $187,898 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $32,851 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-21 | $326,015 | 749 | **$435** | $3,998 | 9.19 |
| 2026-10-22 | $300,785 | 712 | **$422** | $3,724 | 8.81 |
| 2026-10-23 | $278,591 | 580 | **$480** | $3,552 | 7.39 |
| 2026-10-24 | $377,834 | 728 | **$519** | $3,538 | 6.82 |
| 2026-10-25 **HOY** | $344,151 | 759 | **$453** | $3,565 | 7.86 |

🟢 **Hoy va mejor que ayer a la misma hora** ($453 vs $519).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   453  =  $ 3,565  ÷  7.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,565 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $38,321 | 96% | 75 | $511 | 8.78 |
| Domiciliarios - API | $35,000 | $31,868 | 91% | 70 | $455 | 10.04 |
| Domiciliarios - Expancion - Q58 | $20,000 | $27,057 | 135% | 96 | $282 | 8.80 |
| Motorizados - INTER | $25,000 | $24,602 | 98% | 29 | $848 | 6.44 |
| Domiciliarios VIDEO INTER - API | $25,000 | $24,494 | 98% | 35 | $700 | 5.75 |
| Domiciliarios INTER - API | $25,000 | $22,068 | 88% | 58 | $380 | 7.74 |
| Domiciliarios - Expancion - INTER | $25,000 | $21,243 | 85% | 38 | $559 | 5.68 |
| Domiciliarios Q58 - | $25,000 | $20,656 | 83% | 109 | $190 | 11.02 |
| RADIO - Moteros | $20,000 | $19,616 | 98% | 23 | $853 | 4.63 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,566 | 74% | 23 | $807 | 4.96 |
| Motorizados - API | $20,000 | $17,876 | 89% | 41 | $436 | 9.39 |
| TEST Creativos - API | $20,000 | $17,818 | 89% | 37 | $482 | 7.63 |
| Domiciliarios VIDEO - API | $20,000 | $17,528 | 88% | 54 | $325 | 10.42 |
| RADIO - Seguridad / Negocios | $25,000 | $16,326 | 65% | 24 | $680 | 5.97 |
| Motorizados - Q58 | $20,000 | $14,971 | 75% | 20 | $749 | 4.18 |
| RADIO - Fincas | $20,000 | $11,141 | 56% | 27 | $413 | 10.14 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $344,151 | 759 | **$453** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,335**/pedido |
| utilidad estimada de lo que va del día | **$874,237** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $583 | $424 | $444 | $517 | $691 | $511 | 🟢 |
| Domiciliarios - API | $484 | $348 | $370 | $417 | $489 | $455 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,121 | $1,077 | $892 | $1,117 | $876 | $282 | 🟢 |
| Domiciliarios VIDEO INTER - API | $576 | $701 | $742 | $646 | $490 | $704 | 🔴 |
| Motorizados - INTER | $591 | $460 | $545 | $714 | $595 | $848 | 🔴 |
| Domiciliarios INTER - API | $324 | $304 | $314 | $332 | $461 | $380 | 🟢 |
| Domiciliarios - Expancion - INTER | $629 | $604 | $721 | $662 | $594 | $559 | 🟢 |
| Domiciliarios Q58 - | $185 | $197 | $159 | $217 | $204 | $190 | 🟢 |
| RADIO - Moteros | — | — | — | — | $919 | $853 | 🟢 |
| Domiciliarios VIDEO Q58 - | $642 | $995 | $1,091 | $679 | $795 | $807 | 🟡 |
| Motorizados - API | $470 | $446 | $379 | $456 | $436 | $436 | 🟡 |
| TEST Creativos - API | $609 | $535 | $379 | $480 | $395 | $482 | 🔴 |
| Domiciliarios VIDEO - API | $319 | $269 | $292 | $337 | $383 | $325 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | $1,169 | $681 | 🟢 |
| Motorizados - Q58 | $545 | $1,025 | $599 | $514 | $547 | $749 | 🔴 |
| RADIO - Fincas | — | — | — | — | $630 | $413 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.58 | 11.99 | 10.38 | 8.14 | 5.47 | 8.78 | 🟢 |
| Domiciliarios - API | 9.53 | 14.10 | 12.13 | 9.61 | 8.16 | 10.04 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.71 | 3.65 | 4.52 | 3.93 | 4.47 | 8.80 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.46 | 5.98 | 5.52 | 6.43 | 8.56 | 5.72 | 🔴 |
| Motorizados - INTER | 8.76 | 13.59 | 11.01 | 8.00 | 8.89 | 6.44 | 🔴 |
| Domiciliarios INTER - API | 11.02 | 12.17 | 9.39 | 7.57 | 6.56 | 7.74 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.46 | 5.33 | 4.21 | 4.83 | 4.70 | 5.68 | 🟢 |
| Domiciliarios Q58 - | 13.11 | 11.07 | 12.89 | 10.68 | 10.24 | 11.02 | 🟢 |
| RADIO - Moteros | — | — | — | — | 5.63 | 4.63 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.62 | 3.19 | 2.96 | 4.98 | 4.11 | 4.96 | 🟢 |
| Motorizados - API | 8.05 | 9.31 | 10.45 | 8.59 | 8.65 | 9.39 | 🟢 |
| TEST Creativos - API | 8.80 | 11.03 | 14.31 | 8.92 | 8.50 | 7.63 | 🟡 |
| Domiciliarios VIDEO - API | 11.78 | 14.69 | 10.98 | 9.18 | 7.54 | 10.42 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | 4.13 | 5.95 | 🟢 |
| Motorizados - Q58 | 5.75 | 3.32 | 5.14 | 5.82 | 5.28 | 4.18 | 🔴 |
| RADIO - Fincas | — | — | — | — | 8.62 | 10.14 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,835 | 750 | $513 | $3,525 | 6.87 | $819,106 |

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
