# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 22:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$67,349** |
| gastado hoy (hasta las 22h) | $232,552 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $235,548 |
| saldo proyectado a medianoche | $64,354 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $56,149 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $217,209 | 595 | **$365** | $3,148 | 8.62 |
| 2026-10-10 | $185,284 | 495 | **$374** | $3,442 | 9.19 |
| 2026-10-11 | $229,754 | 528 | **$435** | $3,180 | 7.31 |
| 2026-10-12 | $264,255 | 758 | **$349** | $2,947 | 8.45 |
| 2026-10-13 **HOY** | $232,552 | 745 | **$312** | $3,500 | 11.21 |

🟢 **Hoy va mejor que ayer a la misma hora** ($312 vs $349).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   312  =  $ 3,500  ÷  11.21
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,500 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.21 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $42,583 | 106% | 104 | $409 | 14.28 |
| Domiciliarios - Expancion - API | $40,000 | $41,523 | 104% | 121 | $343 | 10.92 |
| Domiciliarios - API | $35,000 | $37,826 | 108% | 154 | $246 | 15.94 |
| Motorizados - API | $20,000 | $21,205 | 106% | 77 | $275 | 13.28 |
| Domiciliarios VIDEO - API | $20,000 | $19,562 | 98% | 78 | $251 | 10.92 |
| Motorizados - INTER | $20,000 | $18,551 | 93% | 44 | $422 | 8.56 |
| Domiciliarios INTER - API | $20,000 | $18,351 | 92% | 102 | $180 | 12.20 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,117 | 86% | 32 | $535 | 6.21 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,834 | 79% | 33 | $480 | 4.84 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $232,552 | 745 | **$312** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,738**/pedido |
| utilidad estimada de lo que va del día | **$963,362** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $409 | 🟢 |
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $343 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $246 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $275 | 🟡 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $251 | 🟢 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $422 | 🟡 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $180 | 🟢 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $535 | 🔴 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $480 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.47 | 14.28 | 🟢 |
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 7.99 | 10.92 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.25 | 15.94 | 🟢 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.48 | 13.28 | 🟢 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.30 | 10.92 | 🟢 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.90 | 8.56 | 🟢 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.32 | 12.20 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.58 | 6.21 | 🔴 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.53 | 4.84 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |

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
