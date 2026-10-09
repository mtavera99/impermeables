# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 21:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,467** |
| gastado hoy (hasta las 21h) | $204,171 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $219,908 |
| saldo proyectado a medianoche | $117,730 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $18,412 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $273,460 | 705 | **$388** | $2,750 | 7.09 |
| 2026-10-05 | $259,873 | 662 | **$393** | $2,653 | 6.76 |
| 2026-10-06 | $191,260 | 474 | **$404** | $3,521 | 8.73 |
| 2026-10-07 | $218,022 | 570 | **$382** | $3,649 | 9.54 |
| 2026-10-08 **HOY** | $204,171 | 562 | **$363** | $3,809 | 10.49 |

🟢 **Hoy va mejor que ayer a la misma hora** ($363 vs $382).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   363  =  $ 3,809  ÷  10.49
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,809 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.49 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $35,319 | 88% | 59 | $599 | 6.15 |
| TEST Creativos - API | $40,000 | $35,275 | 88% | 84 | $420 | 14.70 |
| Domiciliarios - API | $35,000 | $30,684 | 88% | 82 | $374 | 11.52 |
| Motorizados - API | $20,000 | $17,779 | 89% | 55 | $323 | 12.16 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,631 | 88% | 42 | $420 | 8.07 |
| Motorizados - INTER | $20,000 | $17,192 | 86% | 57 | $302 | 12.54 |
| Domiciliarios INTER - API | $20,000 | $16,988 | 85% | 79 | $215 | 11.50 |
| Domiciliarios VIDEO - API | $20,000 | $16,855 | 84% | 61 | $276 | 13.74 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,448 | 82% | 40 | $411 | 7.16 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $204,171 | 559 | **$365** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,714**/pedido |
| utilidad estimada de lo que va del día | **$693,166** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $541 | $599 | 🟡 |
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $420 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $374 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $323 | 🟢 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $390 | $420 | 🟡 |
| Motorizados - INTER | $280 | $339 | $339 | $303 | $344 | $302 | 🟢 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $215 | 🟡 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $276 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $411 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.61 | 6.15 | 🟡 |
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.97 | 14.70 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.81 | 11.52 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.67 | 12.16 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.63 | 8.07 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.48 | 11.75 | 12.54 | 🟢 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.63 | 11.50 | 🟡 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.65 | 13.74 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.48 | 7.16 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,533 | 600 | $388 | $3,641 | 9.39 | $730,619 |

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
