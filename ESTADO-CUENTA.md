# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 22:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$120,274** |
| gastado hoy (hasta las 22h) | $216,662 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $221,814 |
| saldo proyectado a medianoche | $115,122 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $19,114 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $283,840 | 734 | **$387** | $2,741 | 7.09 |
| 2026-10-05 | $268,560 | 691 | **$389** | $2,662 | 6.85 |
| 2026-10-06 | $202,182 | 502 | **$403** | $3,508 | 8.71 |
| 2026-10-07 | $228,295 | 593 | **$385** | $3,644 | 9.47 |
| 2026-10-08 **HOY** | $216,662 | 585 | **$370** | $3,766 | 10.17 |

🟢 **Hoy va mejor que ayer a la misma hora** ($370 vs $385).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   370  =  $ 3,766  ÷  10.17
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,766 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.17 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $37,107 | 93% | 61 | $608 | 6.01 |
| TEST Creativos - API | $40,000 | $37,010 | 93% | 89 | $416 | 14.61 |
| Domiciliarios - API | $35,000 | $32,431 | 93% | 87 | $373 | 11.55 |
| Domiciliarios VIDEO INTER - API | $20,000 | $18,873 | 94% | 45 | $419 | 8.08 |
| Motorizados - API | $20,000 | $18,818 | 94% | 56 | $336 | 11.65 |
| Domiciliarios INTER - API | $20,000 | $18,559 | 93% | 84 | $221 | 11.11 |
| Motorizados - INTER | $20,000 | $18,473 | 92% | 61 | $303 | 12.27 |
| Domiciliarios VIDEO - API | $20,000 | $17,986 | 90% | 62 | $290 | 12.85 |
| Domiciliarios - Expancion - INTER | $20,000 | $17,405 | 87% | 40 | $435 | 6.66 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $216,662 | 585 | **$370** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,808**/pedido |
| utilidad estimada de lo que va del día | **$722,412** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $541 | $608 | 🟡 |
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $416 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $373 | 🟡 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $390 | $419 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $336 | 🟢 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $221 | 🔴 |
| Motorizados - INTER | $280 | $339 | $339 | $303 | $344 | $303 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $290 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $435 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.61 | 6.01 | 🟡 |
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.97 | 14.61 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.81 | 11.55 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.63 | 8.08 | 🟢 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.67 | 11.65 | 🟢 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.63 | 11.11 | 🟡 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.48 | 11.75 | 12.27 | 🟡 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.65 | 12.85 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.48 | 6.66 | 🟢 |

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
| 2026-10-07 | $232,556 | 600 | $388 | $3,641 | 9.39 | $730,596 |

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
