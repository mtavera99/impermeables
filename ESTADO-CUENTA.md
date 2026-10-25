# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-25 18:20 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$284,956** |
| gastado hoy (hasta las 18h) | $259,528 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $342,072 |
| saldo proyectado a medianoche | $202,412 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $33,216 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-21 | $266,610 | 598 | **$446** | $3,974 | 8.91 |
| 2026-10-22 | $242,732 | 554 | **$438** | $3,739 | 8.53 |
| 2026-10-23 | $201,286 | 426 | **$473** | $3,575 | 7.57 |
| 2026-10-24 | $315,608 | 579 | **$545** | $3,581 | 6.57 |
| 2026-10-25 **HOY** | $259,528 | 584 | **$444** | $3,562 | 8.02 |

🟢 **Hoy va mejor que ayer a la misma hora** ($444 vs $545).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   444  =  $ 3,562  ÷  8.02
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,562 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.02 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $29,341 | 73% | 61 | $481 | 9.45 |
| Domiciliarios - Expancion - Q58 | $20,000 | $22,885 | 114% | 80 | $286 | 8.49 |
| Domiciliarios - API | $35,000 | $22,470 | 64% | 47 | $478 | 9.73 |
| Domiciliarios VIDEO INTER - API | $25,000 | $18,450 | 74% | 27 | $683 | 6.01 |
| Motorizados - INTER | $25,000 | $17,067 | 68% | 22 | $776 | 7.16 |
| Domiciliarios - Expancion - INTER | $25,000 | $15,588 | 62% | 29 | $538 | 5.94 |
| Domiciliarios Q58 - | $25,000 | $15,379 | 62% | 82 | $188 | 11.09 |
| Domiciliarios INTER - API | $25,000 | $15,246 | 61% | 40 | $381 | 7.61 |
| RADIO - Moteros | $20,000 | $15,109 | 76% | 21 | $719 | 5.42 |
| TEST Creativos - API | $20,000 | $14,546 | 73% | 32 | $455 | 8.14 |
| Domiciliarios VIDEO Q58 - | $25,000 | $14,068 | 56% | 16 | $879 | 4.63 |
| Motorizados - API | $20,000 | $13,341 | 67% | 27 | $494 | 8.60 |
| Domiciliarios VIDEO - API | $20,000 | $12,862 | 64% | 39 | $330 | 10.30 |
| Motorizados - Q58 | $20,000 | $12,024 | 60% | 16 | $752 | 4.22 |
| RADIO - Seguridad / Negocios | $25,000 | $11,637 | 47% | 19 | $612 | 6.65 |
| RADIO - Fincas | $20,000 | $9,515 | 48% | 26 | $366 | 11.76 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $259,528 | 584 | **$444** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,169**/pedido |
| utilidad estimada de lo que va del día | **$677,940** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $583 | $424 | $444 | $517 | $691 | $481 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,121 | $1,077 | $892 | $1,117 | $876 | $286 | 🟢 |
| Domiciliarios - API | $484 | $348 | $370 | $417 | $489 | $478 | 🟡 |
| Domiciliarios VIDEO INTER - API | $576 | $701 | $742 | $646 | $490 | $683 | 🔴 |
| Motorizados - INTER | $591 | $460 | $545 | $714 | $595 | $776 | 🔴 |
| Domiciliarios - Expancion - INTER | $629 | $604 | $721 | $662 | $594 | $538 | 🟢 |
| Domiciliarios Q58 - | $185 | $197 | $159 | $217 | $204 | $188 | 🟢 |
| Domiciliarios INTER - API | $324 | $304 | $314 | $332 | $461 | $381 | 🟢 |
| RADIO - Moteros | — | — | — | — | $919 | $719 | 🟢 |
| TEST Creativos - API | $609 | $535 | $379 | $480 | $395 | $455 | 🔴 |
| Domiciliarios VIDEO Q58 - | $642 | $995 | $1,091 | $679 | $794 | $879 | 🟡 |
| Motorizados - API | $470 | $446 | $379 | $456 | $436 | $494 | 🟡 |
| Domiciliarios VIDEO - API | $319 | $269 | $292 | $337 | $383 | $330 | 🟢 |
| Motorizados - Q58 | $545 | $1,025 | $599 | $514 | $547 | $752 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | $1,169 | $612 | 🟢 |
| RADIO - Fincas | — | — | — | — | $630 | $366 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.58 | 11.99 | 10.38 | 8.14 | 5.47 | 9.45 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.71 | 3.65 | 4.52 | 3.93 | 4.47 | 8.49 | 🟢 |
| Domiciliarios - API | 9.53 | 14.10 | 12.13 | 9.61 | 8.17 | 9.73 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.46 | 5.98 | 5.52 | 6.43 | 8.56 | 6.01 | 🔴 |
| Motorizados - INTER | 8.76 | 13.59 | 11.01 | 8.00 | 8.90 | 7.16 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.46 | 5.33 | 4.21 | 4.83 | 4.70 | 5.94 | 🟢 |
| Domiciliarios Q58 - | 13.11 | 11.07 | 12.89 | 10.68 | 10.25 | 11.09 | 🟢 |
| Domiciliarios INTER - API | 11.02 | 12.17 | 9.39 | 7.57 | 6.56 | 7.61 | 🟢 |
| RADIO - Moteros | — | — | — | — | 5.63 | 5.42 | 🟡 |
| TEST Creativos - API | 8.80 | 11.03 | 14.31 | 8.92 | 8.50 | 8.14 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.62 | 3.19 | 2.96 | 4.98 | 4.11 | 4.63 | 🟢 |
| Motorizados - API | 8.05 | 9.31 | 10.45 | 8.59 | 8.66 | 8.60 | 🟡 |
| Domiciliarios VIDEO - API | 11.78 | 14.69 | 10.98 | 9.18 | 7.54 | 10.30 | 🟢 |
| Motorizados - Q58 | 5.75 | 3.32 | 5.14 | 5.82 | 5.28 | 4.22 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | 4.13 | 6.65 | 🟢 |
| RADIO - Fincas | — | — | — | — | 8.63 | 11.76 | 🟢 |

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
| 2026-10-24 | $384,792 | 750 | $513 | $3,525 | 6.87 | $819,149 |

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
