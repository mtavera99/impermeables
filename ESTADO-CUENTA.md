# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 18:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$134,845** |
| gastado hoy (hasta las 18h) | $253,790 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $359,296 |
| saldo proyectado a medianoche | $29,338 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $139,015 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $256,249 | 586 | **$437** | $3,185 | 7.28 |
| 2026-10-18 | $248,791 | 535 | **$465** | $3,231 | 6.95 |
| 2026-10-19 | $259,204 | 601 | **$431** | $2,969 | 6.88 |
| 2026-10-20 | $258,037 | 512 | **$504** | $3,470 | 6.88 |
| 2026-10-21 **HOY** | $253,790 | 571 | **$444** | $3,977 | 8.95 |

🟢 **Hoy va mejor que ayer a la misma hora** ($444 vs $504).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   444  =  $ 3,977  ÷  8.95
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,977 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.95 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $32,879 | 82% | 64 | $514 | 9.84 |
| Domiciliarios - API | $35,000 | $27,856 | 80% | 80 | $348 | 14.28 |
| TEST Creativos - API | $40,000 | $21,125 | 53% | 39 | $542 | 10.96 |
| Domiciliarios Q58 - | $25,000 | $20,696 | 83% | 101 | $205 | 10.61 |
| Motorizados - INTER | $25,000 | $19,603 | 78% | 40 | $490 | 12.54 |
| Domiciliarios INTER - API | $25,000 | $19,213 | 77% | 60 | $320 | 11.62 |
| Domiciliarios VIDEO INTER - API | $25,000 | $18,917 | 76% | 26 | $728 | 5.67 |
| Motorizados - Q58 | $25,000 | $16,514 | 66% | 17 | $971 | 3.59 |
| Motorizados - API | $20,000 | $16,482 | 82% | 34 | $485 | 8.61 |
| Domiciliarios VIDEO - API | $20,000 | $16,211 | 81% | 56 | $289 | 14.26 |
| Domiciliarios VIDEO Q58 - | $25,000 | $15,350 | 61% | 18 | $853 | 3.66 |
| Domiciliarios - Expancion - INTER | $25,000 | $14,836 | 59% | 24 | $618 | 5.27 |
| Domiciliarios - Expancion - Q58 | $25,000 | $14,108 | 56% | 12 | $1,176 | 3.34 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $253,790 | 571 | **$444** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,170**/pedido |
| utilidad estimada de lo que va del día | **$662,810** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $583 | $514 | 🟢 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $484 | $348 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $609 | $542 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $185 | $205 | 🟡 |
| Motorizados - INTER | $463 | $529 | $521 | $480 | $591 | $490 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $324 | $320 | 🟡 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $576 | $728 | 🔴 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $545 | $971 | 🔴 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $485 | 🟡 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $319 | $289 | 🟢 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $642 | $853 | 🔴 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $536 | $629 | $618 | 🟡 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,120 | $1,176 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.58 | 9.84 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.53 | 14.28 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.80 | 10.96 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.12 | 10.61 | 🔴 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.76 | 12.54 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.02 | 11.62 | 🟢 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.46 | 5.67 | 🔴 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.75 | 3.59 | 🔴 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.05 | 8.61 | 🟢 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.79 | 14.26 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.66 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.46 | 5.27 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.71 | 3.34 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,788 | 837 | $460 | $3,523 | 7.66 | $958,810 |

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
