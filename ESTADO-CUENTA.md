# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-23 16:30 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$154,089** |
| gastado hoy (hasta las 16h) | $143,600 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $257,816 |
| saldo proyectado a medianoche | $39,872 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🟠 Recargar $201,361 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-19 | $218,336 | 516 | **$423** | $2,897 | 6.85 |
| 2026-10-20 | $200,758 | 396 | **$507** | $3,333 | 6.57 |
| 2026-10-21 | $226,709 | 486 | **$466** | $3,967 | 8.50 |
| 2026-10-22 | $205,312 | 469 | **$438** | $3,753 | 8.57 |
| 2026-10-23 **HOY** | $143,902 | 323 | **$446** | $3,523 | 7.91 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($446 vs $438).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   446  =  $ 3,523  ÷  7.91
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,523 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.91 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $17,496 | 44% | 38 | $460 | 9.60 |
| TEST Creativos - API | $30,000 | $15,285 | 51% | 39 | $392 | 11.05 |
| Domiciliarios - API | $35,000 | $14,934 | 43% | 37 | $404 | 10.06 |
| Domiciliarios VIDEO Q58 - | $25,000 | $12,490 | 50% | 15 | $833 | 4.08 |
| Domiciliarios - Expancion - INTER | $25,000 | $12,228 | 49% | 20 | $611 | 5.04 |
| Domiciliarios INTER - API | $25,000 | $10,674 | 43% | 28 | $381 | 5.68 |
| Motorizados - INTER | $25,000 | $9,857 | 39% | 21 | $469 | 11.19 |
| Domiciliarios - Expancion - Q58 | $20,000 | $9,526 | 48% | 10 | $953 | 4.91 |
| Domiciliarios Q58 - | $25,000 | $9,223 | 37% | 45 | $205 | 10.90 |
| Domiciliarios VIDEO INTER - API | $25,000 | $8,952 | 36% | 9 | $995 | 3.99 |
| Motorizados - API | $20,000 | $8,150 | 41% | 20 | $408 | 9.73 |
| Motorizados - Q58 | $20,000 | $7,811 | 39% | 22 | $355 | 9.15 |
| Domiciliarios VIDEO - API | $20,000 | $7,245 | 36% | 19 | $381 | 8.10 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $143,871 | 323 | **$445** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,188**/pedido |
| utilidad estimada de lo que va del día | **$374,626** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $556 | $485 | $583 | $424 | $443 | $460 | 🟡 |
| TEST Creativos - API | $504 | $475 | $609 | $535 | $379 | $394 | 🟡 |
| Domiciliarios - API | $472 | $464 | $484 | $348 | $370 | $404 | 🟡 |
| Domiciliarios VIDEO Q58 - | $874 | $586 | $642 | $995 | $1,091 | $833 | 🟢 |
| Domiciliarios - Expancion - INTER | $586 | $536 | $629 | $604 | $720 | $611 | 🟢 |
| Domiciliarios INTER - API | $284 | $240 | $324 | $304 | $313 | $381 | 🔴 |
| Motorizados - INTER | $521 | $480 | $591 | $460 | $544 | $469 | 🟢 |
| Domiciliarios - Expancion - Q58 | $751 | $1,462 | $1,121 | $1,077 | $892 | $953 | 🟡 |
| Domiciliarios Q58 - | $186 | $166 | $185 | $197 | $159 | $205 | 🔴 |
| Domiciliarios VIDEO INTER - API | $430 | $534 | $576 | $701 | $741 | $995 | 🔴 |
| Motorizados - API | $419 | $579 | $470 | $446 | $378 | $408 | 🟡 |
| Motorizados - Q58 | $569 | $732 | $545 | $1,025 | $599 | $356 | 🟢 |
| Domiciliarios VIDEO - API | $357 | $430 | $319 | $269 | $291 | $383 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.92 | 7.80 | 7.58 | 11.99 | 10.39 | 9.60 | 🟡 |
| TEST Creativos - API | 7.79 | 9.85 | 8.80 | 11.03 | 14.31 | 11.01 | 🔴 |
| Domiciliarios - API | 7.52 | 7.58 | 9.53 | 14.10 | 12.13 | 10.06 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.07 | 5.02 | 3.62 | 3.19 | 2.96 | 4.08 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.47 | 5.28 | 4.46 | 5.33 | 4.21 | 5.04 | 🟢 |
| Domiciliarios INTER - API | 9.05 | 6.33 | 11.02 | 12.17 | 9.41 | 5.68 | 🔴 |
| Motorizados - INTER | 8.33 | 8.02 | 8.76 | 13.59 | 11.02 | 11.19 | 🟡 |
| Domiciliarios - Expancion - Q58 | 4.12 | 2.02 | 2.71 | 3.65 | 4.52 | 4.91 | 🟢 |
| Domiciliarios Q58 - | 13.92 | 13.71 | 13.11 | 11.07 | 12.90 | 10.90 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.70 | 6.43 | 7.46 | 5.98 | 5.52 | 3.99 | 🔴 |
| Motorizados - API | 7.49 | 5.69 | 8.05 | 9.31 | 10.45 | 9.73 | 🟡 |
| Motorizados - Q58 | 5.24 | 4.15 | 5.75 | 3.32 | 5.14 | 9.09 | 🟢 |
| Domiciliarios VIDEO - API | 7.95 | 6.55 | 11.78 | 14.69 | 10.99 | 8.05 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,051 | 759 | $418 | $3,709 | 8.88 | $901,337 |

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
