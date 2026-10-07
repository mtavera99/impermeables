# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-07 15:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$155,915** |
| gastado hoy (hasta las 15h) | $114,395 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,066 |
| saldo proyectado a medianoche | $56,244 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $85,740 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-03 | $111,744 | 322 | **$347** | $3,309 | 9.54 |
| 2026-10-04 | $149,407 | 359 | **$416** | $2,946 | 7.08 |
| 2026-10-05 | $169,638 | 406 | **$418** | $2,552 | 6.11 |
| 2026-10-06 | $111,881 | 286 | **$391** | $3,660 | 9.36 |
| 2026-10-07 **HOY** | $114,395 | 280 | **$409** | $3,979 | 9.74 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($409 vs $391).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   409  =  $ 3,979  ÷  9.74
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,979 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.74 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $20,340 | 51% | 43 | $473 | 13.33 |
| Domiciliarios - Expancion - API | $40,000 | $19,436 | 49% | 40 | $486 | 8.09 |
| Domiciliarios - API | $35,000 | $18,035 | 52% | 48 | $376 | 11.99 |
| Domiciliarios VIDEO - API | $20,000 | $11,768 | 59% | 30 | $392 | 9.48 |
| Motorizados - API | $20,000 | $10,111 | 51% | 22 | $460 | 8.68 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,942 | 50% | 17 | $585 | 5.34 |
| Domiciliarios INTER - API | $20,000 | $8,782 | 44% | 37 | $237 | 10.71 |
| Motorizados - INTER | $20,000 | $8,400 | 42% | 28 | $300 | 15.83 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,581 | 38% | 15 | $505 | 6.08 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $114,395 | 280 | **$409** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,510**/pedido |
| utilidad estimada de lo que va del día | **$335,076** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $503 | $482 | $478 | $519 | $530 | $473 | 🟢 |
| Domiciliarios - Expancion - API | $456 | $416 | $479 | $463 | $515 | $486 | 🟢 |
| Domiciliarios - API | $433 | $476 | $463 | $563 | $365 | $376 | 🟡 |
| Domiciliarios VIDEO - API | $345 | $292 | $322 | $351 | $365 | $392 | 🟡 |
| Motorizados - API | $382 | $276 | $403 | $361 | $537 | $460 | 🟢 |
| Domiciliarios - Expancion - INTER | $462 | $295 | $419 | $416 | $626 | $585 | 🟢 |
| Domiciliarios INTER - API | $183 | $141 | $223 | $207 | $217 | $237 | 🟡 |
| Motorizados - INTER | $260 | $280 | $339 | $339 | $301 | $300 | 🟡 |
| Domiciliarios VIDEO INTER - API | $431 | $510 | $343 | $307 | $380 | $505 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.02 | 10.41 | 7.92 | 6.93 | 9.35 | 13.33 | 🟢 |
| Domiciliarios - Expancion - API | 7.83 | 7.84 | 6.35 | 6.29 | 6.84 | 8.09 | 🟢 |
| Domiciliarios - API | 7.98 | 6.51 | 6.42 | 5.33 | 10.95 | 11.99 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 9.14 | 7.11 | 6.43 | 9.18 | 9.48 | 🟡 |
| Motorizados - API | 7.11 | 10.08 | 6.37 | 7.31 | 5.96 | 8.68 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.59 | 8.93 | 5.60 | 5.43 | 4.85 | 5.34 | 🟢 |
| Domiciliarios INTER - API | 12.98 | 14.55 | 7.82 | 8.22 | 10.37 | 10.71 | 🟡 |
| Motorizados - INTER | 13.45 | 11.38 | 8.04 | 8.50 | 13.50 | 15.83 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.96 | 6.44 | 8.69 | 8.45 | 7.97 | 6.08 | 🔴 |

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
| 2026-10-06 | $207,930 | 515 | $404 | $3,498 | 8.66 | $618,776 |

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
