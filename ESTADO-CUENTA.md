# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-07 01:09 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$170,065** |
| gastado hoy (hasta las 1h) | $2,189 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $236,352 |
| saldo proyectado a medianoche | $-64,098 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $183,796 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-03 | $3,375 | 8 | **$422** | $3,027 | 7.17 |
| 2026-10-04 | $5,732 | 14 | **$409** | $2,843 | 6.94 |
| 2026-10-05 | $5,899 | 17 | **$347** | $2,602 | 7.50 |
| 2026-10-06 | $4,782 | 16 | **$299** | $3,662 | 12.25 |
| 2026-10-07 **HOY** | $2,189 | 7 | **$313** | $3,742 | 11.97 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($313 vs $299).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   313  =  $ 3,742  ÷  11.97
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,742 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.97 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $385 | 1% | 1 | $385 | 10.31 |
| TEST Creativos - API | $40,000 | $351 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $294 | 1% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $248 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $237 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $191 | 1% | 1 | $191 | 20.83 |
| Domiciliarios INTER - API | $20,000 | $175 | 1% | 4 | $44 | 63.49 |
| Domiciliarios - API | $35,000 | $168 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $140 | 1% | 1 | $140 | 29.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,189 | 7 | **$313** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,748**/pedido |
| utilidad estimada de lo que va del día | **$9,048** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $456 | $416 | $479 | $463 | $510 | $385 | 🟢 |
| TEST Creativos - API | $503 | $482 | $478 | $519 | $526 | — | 🟡 |
| Domiciliarios VIDEO INTER - API | $431 | $510 | $343 | $307 | $375 | — | 🔴 |
| Motorizados - INTER | $260 | $280 | $339 | $339 | $297 | — | 🟢 |
| Domiciliarios - Expancion - INTER | $462 | $295 | $419 | $416 | $622 | — | 🔴 |
| Motorizados - API | $382 | $276 | $403 | $361 | $533 | $191 | 🟢 |
| Domiciliarios INTER - API | $183 | $141 | $223 | $207 | $215 | $44 | 🟢 |
| Domiciliarios - API | $433 | $476 | $463 | $563 | $363 | — | 🟢 |
| Domiciliarios VIDEO - API | $345 | $292 | $322 | $351 | $363 | $140 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.83 | 7.84 | 6.35 | 6.29 | 6.89 | 10.31 | 🟢 |
| TEST Creativos - API | 12.02 | 10.41 | 7.92 | 6.93 | 9.39 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.96 | 6.44 | 8.69 | 8.45 | 8.07 | — | 🟡 |
| Motorizados - INTER | 13.45 | 11.38 | 8.04 | 8.50 | 13.66 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 5.59 | 8.93 | 5.60 | 5.43 | 4.88 | — | 🟡 |
| Motorizados - API | 7.11 | 10.08 | 6.37 | 7.31 | 5.99 | 20.83 | 🟢 |
| Domiciliarios INTER - API | 12.98 | 14.55 | 7.82 | 8.22 | 10.50 | 63.49 | 🟢 |
| Domiciliarios - API | 7.98 | 6.51 | 6.42 | 5.33 | 11.03 | — | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 9.14 | 7.11 | 6.43 | 9.27 | 29.41 | 🟢 |

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
| 2026-10-06 | $206,076 | 515 | $400 | $3,497 | 8.74 | $620,630 |

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
