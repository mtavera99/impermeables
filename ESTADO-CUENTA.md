# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-07 20:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$91,091** |
| gastado hoy (hasta las 19h) | $177,711 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $222,817 |
| saldo proyectado a medianoche | $45,985 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $87,248 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-03 | $162,177 | 472 | **$344** | $3,172 | 9.23 |
| 2026-10-04 | $235,051 | 588 | **$400** | $2,799 | 7.00 |
| 2026-10-05 | $229,606 | 571 | **$402** | $2,625 | 6.53 |
| 2026-10-06 | $161,154 | 394 | **$409** | $3,574 | 8.74 |
| 2026-10-07 **HOY** | $177,711 | 456 | **$390** | $3,819 | 9.80 |

🟢 **Hoy va mejor que ayer a la misma hora** ($390 vs $409).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   390  =  $ 3,819  ÷  9.80
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,819 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.80 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $31,315 | 78% | 69 | $454 | 13.09 |
| Domiciliarios - Expancion - API | $40,000 | $30,673 | 77% | 61 | $503 | 7.42 |
| Domiciliarios - API | $35,000 | $27,542 | 79% | 76 | $362 | 11.76 |
| Domiciliarios VIDEO - API | $20,000 | $18,640 | 93% | 50 | $373 | 9.74 |
| Motorizados - API | $20,000 | $15,497 | 77% | 34 | $456 | 8.15 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,235 | 76% | 27 | $564 | 5.54 |
| Domiciliarios INTER - API | $20,000 | $14,031 | 70% | 72 | $195 | 12.93 |
| Motorizados - INTER | $20,000 | $13,639 | 68% | 38 | $359 | 12.12 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,139 | 56% | 26 | $428 | 7.06 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $177,711 | 453 | **$392** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,211**/pedido |
| utilidad estimada de lo que va del día | **$549,469** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $503 | $482 | $478 | $519 | $530 | $454 | 🟢 |
| Domiciliarios - Expancion - API | $456 | $416 | $479 | $463 | $515 | $503 | 🟡 |
| Domiciliarios - API | $433 | $476 | $463 | $563 | $366 | $362 | 🟡 |
| Domiciliarios VIDEO - API | $345 | $292 | $322 | $351 | $365 | $373 | 🟡 |
| Motorizados - API | $382 | $276 | $403 | $361 | $538 | $456 | 🟢 |
| Domiciliarios - Expancion - INTER | $462 | $295 | $419 | $416 | $626 | $564 | 🟢 |
| Domiciliarios INTER - API | $183 | $141 | $223 | $207 | $217 | $195 | 🟢 |
| Motorizados - INTER | $260 | $280 | $339 | $339 | $301 | $359 | 🔴 |
| Domiciliarios VIDEO INTER - API | $431 | $510 | $343 | $307 | $380 | $428 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.02 | 10.41 | 7.92 | 6.93 | 9.35 | 13.09 | 🟢 |
| Domiciliarios - Expancion - API | 7.83 | 7.84 | 6.35 | 6.29 | 6.83 | 7.42 | 🟢 |
| Domiciliarios - API | 7.98 | 6.51 | 6.42 | 5.33 | 10.93 | 11.76 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 9.14 | 7.11 | 6.43 | 9.18 | 9.74 | 🟢 |
| Motorizados - API | 7.11 | 10.08 | 6.37 | 7.31 | 5.96 | 8.15 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.59 | 8.93 | 5.60 | 5.43 | 4.84 | 5.54 | 🟢 |
| Domiciliarios INTER - API | 12.98 | 14.55 | 7.82 | 8.22 | 10.35 | 12.93 | 🟢 |
| Motorizados - INTER | 13.45 | 11.38 | 8.04 | 8.50 | 13.49 | 12.12 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.96 | 6.44 | 8.69 | 8.45 | 7.96 | 7.06 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $631,432 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,041 | 515 | $404 | $3,497 | 8.66 | $618,665 |

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
