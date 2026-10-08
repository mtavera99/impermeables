# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 16:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$202,492** |
| gastado hoy (hasta las 16h) | $135,959 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $229,456 |
| saldo proyectado a medianoche | $108,995 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $17,599 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $165,912 | 406 | **$409** | $2,929 | 7.17 |
| 2026-10-05 | $182,030 | 437 | **$417** | $2,580 | 6.19 |
| 2026-10-06 | $122,131 | 303 | **$403** | $3,659 | 9.08 |
| 2026-10-07 | $131,460 | 331 | **$397** | $3,997 | 10.06 |
| 2026-10-08 **HOY** | $135,655 | 362 | **$375** | $4,027 | 10.75 |

🟢 **Hoy va mejor que ayer a la misma hora** ($375 vs $397).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   375  =  $ 4,027  ÷  10.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,027 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $23,769 | 59% | 36 | $660 | 5.80 |
| TEST Creativos - API | $40,000 | $23,706 | 59% | 54 | $439 | 14.91 |
| Domiciliarios - API | $35,000 | $21,684 | 62% | 54 | $402 | 11.28 |
| Motorizados - API | $20,000 | $12,174 | 61% | 38 | $320 | 13.21 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,968 | 60% | 29 | $413 | 8.23 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,427 | 57% | 26 | $440 | 6.96 |
| Domiciliarios VIDEO - API | $20,000 | $10,964 | 55% | 46 | $238 | 16.60 |
| Motorizados - INTER | $20,000 | $10,950 | 55% | 31 | $353 | 11.32 |
| Domiciliarios INTER - API | $20,000 | $9,145 | 46% | 48 | $191 | 13.91 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $135,787 | 362 | **$375** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,895**/pedido |
| utilidad estimada de lo que va del día | **$445,315** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $541 | $660 | 🔴 |
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $439 | 🟡 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $402 | 🔴 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $320 | 🟢 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $389 | $413 | 🟡 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $440 | 🟢 |
| Motorizados - INTER | $280 | $339 | $339 | $303 | $343 | $355 | 🟡 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $238 | 🟢 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $191 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.62 | 5.80 | 🟡 |
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.97 | 14.91 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.83 | 11.28 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.68 | 13.21 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.63 | 8.23 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.49 | 6.96 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.48 | 11.75 | 11.25 | 🟡 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.66 | 16.60 | 🟢 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.64 | 13.91 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,209 | 515 | $404 | $3,499 | 8.65 | $618,497 |
| 2026-10-07 | $232,376 | 600 | $387 | $3,641 | 9.40 | $730,776 |

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
