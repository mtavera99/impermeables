# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-23 14:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$179,510** |
| gastado hoy (hasta las 14h) | $118,501 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $263,424 |
| saldo proyectado a medianoche | $34,586 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🟠 Recargar $201,039 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-19 | $183,909 | 429 | **$429** | $2,828 | 6.60 |
| 2026-10-20 | $161,493 | 323 | **$500** | $3,300 | 6.60 |
| 2026-10-21 | $196,020 | 421 | **$466** | $3,957 | 8.50 |
| 2026-10-22 | $174,445 | 397 | **$439** | $3,773 | 8.59 |
| 2026-10-23 **HOY** | $118,562 | 270 | **$439** | $3,428 | 7.81 |

🟢 **Hoy va mejor que ayer a la misma hora** ($439 vs $439).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   439  =  $ 3,428  ÷  7.81
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,428 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.81 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,264 | 36% | 33 | $432 | 9.88 |
| TEST Creativos - API | $30,000 | $13,210 | 44% | 36 | $367 | 11.73 |
| Domiciliarios - API | $35,000 | $12,614 | 36% | 31 | $407 | 9.88 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,140 | 41% | 18 | $563 | 5.25 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,964 | 40% | 13 | $766 | 4.38 |
| Domiciliarios INTER - API | $25,000 | $8,853 | 35% | 22 | $402 | 5.24 |
| Motorizados - INTER | $25,000 | $7,778 | 31% | 17 | $458 | 10.86 |
| Domiciliarios Q58 - | $25,000 | $7,632 | 31% | 39 | $196 | 11.08 |
| Domiciliarios - Expancion - Q58 | $20,000 | $7,543 | 38% | 9 | $838 | 5.49 |
| Domiciliarios VIDEO INTER - API | $25,000 | $7,413 | 30% | 5 | $1,483 | 2.62 |
| Motorizados - API | $20,000 | $6,778 | 34% | 13 | $521 | 7.38 |
| Motorizados - Q58 | $20,000 | $6,254 | 31% | 20 | $313 | 9.94 |
| Domiciliarios VIDEO - API | $20,000 | $6,133 | 31% | 15 | $409 | 7.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $118,576 | 271 | **$438** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,043**/pedido |
| utilidad estimada de lo que va del día | **$316,448** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $556 | $485 | $583 | $424 | $443 | $433 | 🟡 |
| TEST Creativos - API | $504 | $475 | $609 | $535 | $379 | $367 | 🟡 |
| Domiciliarios - API | $472 | $464 | $484 | $348 | $370 | $408 | 🟡 |
| Domiciliarios - Expancion - INTER | $586 | $536 | $629 | $604 | $720 | $564 | 🟢 |
| Domiciliarios VIDEO Q58 - | $874 | $586 | $642 | $995 | $1,091 | $766 | 🟢 |
| Domiciliarios INTER - API | $284 | $240 | $324 | $304 | $313 | $404 | 🔴 |
| Motorizados - INTER | $521 | $480 | $591 | $460 | $544 | $461 | 🟢 |
| Domiciliarios Q58 - | $186 | $166 | $185 | $197 | $159 | $196 | 🔴 |
| Domiciliarios - Expancion - Q58 | $751 | $1,462 | $1,121 | $1,077 | $891 | $844 | 🟢 |
| Domiciliarios VIDEO INTER - API | $430 | $534 | $576 | $701 | $741 | $1,483 | 🔴 |
| Motorizados - API | $419 | $579 | $470 | $446 | $378 | $522 | 🔴 |
| Motorizados - Q58 | $569 | $732 | $545 | $1,025 | $597 | $313 | 🟢 |
| Domiciliarios VIDEO - API | $357 | $430 | $319 | $269 | $291 | $409 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.92 | 7.80 | 7.58 | 11.99 | 10.39 | 9.84 | 🟡 |
| TEST Creativos - API | 7.79 | 9.85 | 8.80 | 11.03 | 14.32 | 11.73 | 🔴 |
| Domiciliarios - API | 7.52 | 7.58 | 9.53 | 14.10 | 12.14 | 9.85 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.47 | 5.28 | 4.46 | 5.33 | 4.21 | 5.24 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.07 | 5.02 | 3.62 | 3.19 | 2.96 | 4.38 | 🟢 |
| Domiciliarios INTER - API | 9.05 | 6.33 | 11.02 | 12.17 | 9.41 | 5.22 | 🔴 |
| Motorizados - INTER | 8.33 | 8.02 | 8.76 | 13.59 | 11.04 | 10.82 | 🟡 |
| Domiciliarios Q58 - | 13.92 | 13.71 | 13.11 | 11.07 | 12.91 | 11.03 | 🟡 |
| Domiciliarios - Expancion - Q58 | 4.12 | 2.02 | 2.71 | 3.65 | 4.52 | 5.44 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.70 | 6.43 | 7.46 | 5.98 | 5.52 | 2.62 | 🔴 |
| Motorizados - API | 7.49 | 5.69 | 8.05 | 9.31 | 10.46 | 7.35 | 🔴 |
| Motorizados - Q58 | 5.24 | 4.15 | 5.75 | 3.32 | 5.15 | 9.94 | 🟢 |
| Domiciliarios VIDEO - API | 7.95 | 6.55 | 11.78 | 14.69 | 10.99 | 7.36 | 🔴 |

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
| 2026-10-22 | $316,909 | 759 | $418 | $3,709 | 8.88 | $901,479 |

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
