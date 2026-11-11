# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-11 15:43 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$312,797** |
| gastado hoy (hasta las 15h) | $205,485 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $426,582 |
| saldo proyectado a medianoche | $91,700 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $136,638 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-07 | $224,039 | 378 | **$593** | $3,464 | 5.84 |
| 2026-11-08 | $310,480 | 559 | **$555** | $2,910 | 5.24 |
| 2026-11-09 | $250,047 | 407 | **$614** | $3,263 | 5.31 |
| 2026-11-10 | $155,772 | 244 | **$638** | $4,228 | 6.62 |
| 2026-11-11 **HOY** | $205,485 | 312 | **$659** | $3,915 | 5.94 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($659 vs $638).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   659  =  $ 3,915  ÷  5.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,915 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.94 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $18,965 | 53% | 25 | $759 | 6.43 |
| RADIO - Moteros | $35,000 | $16,939 | 48% | 12 | $1,412 | 4.49 |
| Domiciliarios - API | $35,000 | $15,431 | 44% | 18 | $857 | 5.64 |
| Motorizados - Q58 | $29,000 | $14,609 | 50% | 22 | $664 | 4.19 |
| Domiciliarios - Expancion - Q58 | $29,000 | $14,503 | 50% | 52 | $279 | 8.60 |
| Domiciliarios - Expancion - API | $30,000 | $14,490 | 48% | 10 | $1,449 | 3.65 |
| RADIO - Seguridad / Negocios | $40,000 | $14,327 | 36% | 14 | $1,023 | 4.40 |
| Domiciliarios VIDEO Q58 - | $25,000 | $13,401 | 54% | 24 | $558 | 4.76 |
| Motorizados - INTER | $25,000 | $12,256 | 49% | 21 | $584 | 9.43 |
| RADIO - Fincas | $20,000 | $10,538 | 53% | 9 | $1,171 | 4.52 |
| Domiciliarios - Expancion - INTER | $25,000 | $9,768 | 39% | 17 | $575 | 4.61 |
| Domiciliarios VIDEO - API | $20,000 | $9,624 | 48% | 14 | $687 | 6.36 |
| Domiciliarios Q58 - | $25,000 | $9,595 | 38% | 14 | $685 | 4.45 |
| Domiciliarios INTER - API | $20,000 | $9,268 | 46% | 35 | $265 | 12.10 |
| TEST Creativos - API | $20,000 | $9,118 | 46% | 15 | $608 | 8.59 |
| Motorizados - API | $20,000 | $7,966 | 40% | 6 | $1,328 | 2.95 |
| RADIO - Broad | $10,000 | $4,687 | 47% | 4 | $1,172 | 7.37 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $205,485 | 312 | **$659** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,107**/pedido |
| utilidad estimada de lo que va del día | **$295,354** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $685 | $528 | $565 | $641 | $600 | $759 | 🔴 |
| RADIO - Moteros | $3,195 | $1,572 | $1,178 | $1,702 | $2,242 | $1,412 | 🟢 |
| Domiciliarios - API | $449 | $453 | $430 | $500 | $486 | $857 | 🔴 |
| Motorizados - Q58 | $646 | $441 | $683 | $853 | $646 | $664 | 🟡 |
| Domiciliarios - Expancion - Q58 | $258 | $295 | $265 | $314 | $290 | $279 | 🟡 |
| Domiciliarios - Expancion - API | $536 | $641 | $543 | $550 | $707 | $1,449 | 🔴 |
| RADIO - Seguridad / Negocios | $976 | $1,003 | $914 | $873 | $1,409 | $1,023 | 🟢 |
| Domiciliarios VIDEO Q58 - | $619 | $741 | $581 | $697 | $798 | $558 | 🟢 |
| Motorizados - INTER | $540 | $517 | $460 | $558 | $639 | $584 | 🟢 |
| RADIO - Fincas | $1,231 | $752 | $725 | $1,388 | $638 | $1,171 | 🔴 |
| Domiciliarios - Expancion - INTER | $432 | $621 | $512 | $682 | $699 | $575 | 🟢 |
| Domiciliarios VIDEO - API | $327 | $363 | $344 | $411 | $531 | $687 | 🔴 |
| Domiciliarios Q58 - | $919 | $1,059 | $773 | $1,156 | $1,065 | $685 | 🟢 |
| Domiciliarios INTER - API | $301 | $317 | $288 | $315 | $306 | $265 | 🟢 |
| TEST Creativos - API | $662 | $425 | $629 | $680 | $797 | $608 | 🟢 |
| Motorizados - API | $377 | $351 | $390 | $543 | $596 | $1,328 | 🔴 |
| RADIO - Broad | $942 | $1,435 | $1,184 | $1,465 | — | $1,172 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 6.95 | 8.11 | 6.57 | 6.48 | 8.46 | 6.43 | 🔴 |
| RADIO - Moteros | 1.13 | 2.45 | 2.63 | 2.37 | 2.45 | 4.49 | 🟢 |
| Domiciliarios - API | 8.77 | 8.32 | 8.43 | 7.59 | 8.24 | 5.64 | 🔴 |
| Motorizados - Q58 | 2.94 | 4.45 | 2.40 | 2.64 | 4.43 | 4.19 | 🟡 |
| Domiciliarios - Expancion - Q58 | 8.12 | 7.82 | 7.28 | 6.45 | 8.85 | 8.60 | 🟡 |
| Domiciliarios - Expancion - API | 7.65 | 6.44 | 6.71 | 6.71 | 6.24 | 3.65 | 🔴 |
| RADIO - Seguridad / Negocios | 3.19 | 3.41 | 3.05 | 4.26 | 2.81 | 4.40 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.63 | 3.43 | 3.96 | 3.27 | 3.70 | 4.76 | 🟢 |
| Motorizados - INTER | 10.43 | 9.79 | 8.69 | 8.39 | 8.53 | 9.43 | 🟢 |
| RADIO - Fincas | 2.79 | 4.91 | 4.90 | 3.22 | 7.64 | 4.52 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.91 | 3.36 | 3.65 | 3.59 | 3.66 | 4.61 | 🟢 |
| Domiciliarios VIDEO - API | 9.47 | 8.74 | 7.31 | 7.66 | 6.75 | 6.36 | 🟡 |
| Domiciliarios Q58 - | 3.03 | 2.54 | 3.14 | 2.67 | 3.42 | 4.45 | 🟢 |
| Domiciliarios INTER - API | 10.36 | 8.21 | 8.60 | 9.41 | 10.55 | 12.10 | 🟢 |
| TEST Creativos - API | 6.64 | 11.59 | 7.61 | 8.46 | 7.45 | 8.59 | 🟢 |
| Motorizados - API | 9.51 | 8.93 | 7.88 | 5.65 | 5.92 | 2.95 | 🔴 |
| RADIO - Broad | 6.44 | 3.79 | 5.20 | 4.47 | — | 7.37 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,491 | 752 | $627 | $3,268 | 5.21 | $735,660 |
| 2026-11-10 | $376,523 | 577 | $653 | $3,778 | 5.79 | $549,709 |

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
