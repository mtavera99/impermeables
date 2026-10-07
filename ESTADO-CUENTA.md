# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-06 19:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$128,695** |
| gastado hoy (hasta las 19h) | $149,779 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $198,656 |
| saldo proyectado a medianoche | $79,818 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $77,576 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-02 | $166,659 | 441 | **$378** | $3,447 | 9.12 |
| 2026-10-03 | $162,177 | 472 | **$344** | $3,172 | 9.23 |
| 2026-10-04 | $235,051 | 588 | **$400** | $2,799 | 7.00 |
| 2026-10-05 | $229,606 | 571 | **$402** | $2,625 | 6.53 |
| 2026-10-06 **HOY** | $149,779 | 372 | **$403** | $3,567 | 8.86 |

🟠 Hoy va 0% más caro que ayer a la misma hora ($403 vs $402).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   403  =  $ 3,567  ÷  8.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,567 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $26,914 | 67% | 52 | $518 | 6.78 |
| TEST Creativos - API | $40,000 | $25,149 | 63% | 48 | $524 | 9.95 |
| Domiciliarios - API | $35,000 | $24,309 | 69% | 69 | $352 | 11.48 |
| Motorizados - API | $20,000 | $13,721 | 69% | 23 | $597 | 5.35 |
| Domiciliarios VIDEO - API | $20,000 | $13,357 | 67% | 40 | $334 | 9.90 |
| Motorizados - INTER | $20,000 | $12,574 | 63% | 40 | $314 | 13.28 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,938 | 60% | 23 | $519 | 5.85 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,000 | 55% | 27 | $407 | 7.47 |
| Domiciliarios INTER - API | $20,000 | $10,817 | 54% | 50 | $216 | 10.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $149,779 | 372 | **$403** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,401**/pedido |
| utilidad estimada de lo que va del día | **$447,376** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $444 | $456 | $416 | $479 | $463 | $518 | 🟡 |
| TEST Creativos - API | $679 | $503 | $482 | $478 | $519 | $524 | 🟡 |
| Domiciliarios - API | $390 | $433 | $476 | $463 | $563 | $352 | 🟢 |
| Motorizados - API | $597 | $382 | $276 | $403 | $361 | $597 | 🔴 |
| Domiciliarios VIDEO - API | $400 | $345 | $292 | $322 | $351 | $334 | 🟡 |
| Motorizados - INTER | $292 | $260 | $280 | $339 | $339 | $314 | 🟢 |
| Domiciliarios - Expancion - INTER | $456 | $462 | $295 | $419 | $416 | $519 | 🔴 |
| Domiciliarios VIDEO INTER - API | $512 | $431 | $510 | $343 | $307 | $407 | 🔴 |
| Domiciliarios INTER - API | $178 | $183 | $141 | $223 | $207 | $216 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.72 | 7.83 | 7.84 | 6.35 | 6.29 | 6.78 | 🟢 |
| TEST Creativos - API | 8.36 | 12.02 | 10.41 | 7.92 | 6.93 | 9.95 | 🟢 |
| Domiciliarios - API | 9.23 | 7.98 | 6.51 | 6.42 | 5.33 | 11.48 | 🟢 |
| Motorizados - API | 4.84 | 7.11 | 10.08 | 6.37 | 7.31 | 5.35 | 🔴 |
| Domiciliarios VIDEO - API | 7.77 | 8.25 | 9.14 | 7.11 | 6.43 | 9.90 | 🟢 |
| Motorizados - INTER | 11.18 | 13.45 | 11.38 | 8.04 | 8.50 | 13.28 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.24 | 5.59 | 8.93 | 5.60 | 5.43 | 5.85 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.01 | 7.96 | 6.44 | 8.69 | 8.45 | 7.47 | 🟡 |
| Domiciliarios INTER - API | 12.79 | 12.98 | 14.55 | 7.82 | 8.22 | 10.89 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $657,304 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $631,432 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,915 | 704 | $388 | $2,670 | 6.89 | $857,184 |

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
