# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-14 19:33 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$176,779** |
| gastado hoy (hasta las 19h) | $342,793 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $434,442 |
| saldo proyectado a medianoche | $85,130 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $135,348 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-10 | $276,763 | 409 | **$677** | $3,964 | 5.86 |
| 2026-11-11 | $356,141 | 534 | **$667** | $3,760 | 5.64 |
| 2026-11-12 | $335,473 | 430 | **$780** | $3,813 | 4.89 |
| 2026-11-13 | $381,307 | 509 | **$749** | $3,422 | 4.57 |
| 2026-11-14 **HOY** | $342,793 | 463 | **$740** | $3,313 | 4.47 |

🟢 **Hoy va mejor que ayer a la misma hora** ($740 vs $749).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   740  =  $ 3,313  ÷  4.47
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,313 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.47 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $30,024 | 86% | 36 | $834 | 5.02 |
| RADIO - Moteros | $35,000 | $28,925 | 83% | 19 | $1,522 | 4.58 |
| RADIO - Seguridad / Negocios | $40,000 | $28,552 | 71% | 19 | $1,503 | 2.38 |
| Domiciliarios VIDEO INTER - API | $36,000 | $27,452 | 76% | 43 | $638 | 6.84 |
| Domiciliarios - Expancion - API | $30,000 | $26,409 | 88% | 18 | $1,467 | 3.58 |
| Domiciliarios - Expancion - Q58 | $29,000 | $21,007 | 72% | 57 | $369 | 5.89 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,944 | 80% | 30 | $665 | 3.12 |
| Motorizados - Q58 | $29,000 | $19,794 | 68% | 36 | $550 | 3.30 |
| Motorizados - INTER | $25,000 | $18,816 | 75% | 35 | $538 | 10.04 |
| Domiciliarios Q58 - | $25,000 | $18,138 | 73% | 9 | $2,015 | 1.07 |
| TEST Creativos - API | $20,000 | $17,544 | 88% | 29 | $605 | 8.51 |
| Motorizados - API | $20,000 | $17,111 | 86% | 19 | $901 | 4.20 |
| Domiciliarios - Expancion - INTER | $25,000 | $16,781 | 67% | 23 | $730 | 2.74 |
| Domiciliarios VIDEO - API | $20,000 | $16,692 | 83% | 27 | $618 | 5.59 |
| Domiciliarios INTER - API | $20,000 | $15,506 | 78% | 51 | $304 | 9.51 |
| RADIO - Fincas | $20,000 | $13,493 | 67% | 9 | $1,499 | 2.81 |
| RADIO - Broad | $10,000 | $6,605 | 66% | 5 | $1,321 | 4.85 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $342,793 | 465 | **$737** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,551**/pedido |
| utilidad estimada de lo que va del día | **$403,650** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $500 | $489 | $856 | $757 | $1,151 | $834 | 🟢 |
| RADIO - Moteros | $1,702 | $2,246 | $1,757 | $2,042 | $1,312 | $1,522 | 🔴 |
| RADIO - Seguridad / Negocios | $873 | $1,417 | $1,142 | $937 | $1,073 | $1,503 | 🔴 |
| Domiciliarios VIDEO INTER - API | $641 | $601 | $713 | $875 | $767 | $638 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $711 | $841 | $842 | $1,140 | $1,467 | 🔴 |
| Domiciliarios - Expancion - Q58 | $314 | $290 | $296 | $360 | $348 | $369 | 🟡 |
| Domiciliarios VIDEO Q58 - | $697 | $798 | $603 | $800 | $880 | $665 | 🟢 |
| Motorizados - Q58 | $853 | $646 | $643 | $913 | $612 | $550 | 🟢 |
| Motorizados - INTER | $558 | $639 | $484 | $758 | $655 | $538 | 🟢 |
| Domiciliarios Q58 - | $1,156 | $1,066 | $877 | $1,051 | $1,039 | $2,015 | 🔴 |
| TEST Creativos - API | $680 | $797 | $740 | $894 | $661 | $605 | 🟢 |
| Motorizados - API | $543 | $597 | $840 | $770 | $792 | $901 | 🟡 |
| Domiciliarios - Expancion - INTER | $682 | $700 | $623 | $606 | $660 | $730 | 🟡 |
| Domiciliarios VIDEO - API | $411 | $532 | $635 | $939 | $564 | $618 | 🟡 |
| Domiciliarios INTER - API | $315 | $306 | $285 | $344 | $361 | $304 | 🟢 |
| RADIO - Fincas | $1,388 | $639 | $1,254 | $939 | $1,359 | $1,499 | 🟡 |
| RADIO - Broad | $1,465 | — | $970 | $1,617 | $1,915 | $1,321 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.59 | 8.23 | 5.31 | 6.19 | 3.74 | 5.02 | 🟢 |
| RADIO - Moteros | 2.37 | 2.45 | 3.35 | 2.69 | 3.80 | 4.58 | 🟢 |
| RADIO - Seguridad / Negocios | 4.26 | 2.80 | 3.47 | 3.92 | 2.84 | 2.38 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.48 | 8.46 | 6.64 | 5.43 | 6.46 | 6.84 | 🟢 |
| Domiciliarios - Expancion - API | 6.71 | 6.23 | 5.77 | 5.92 | 4.02 | 3.58 | 🟡 |
| Domiciliarios - Expancion - Q58 | 6.45 | 8.82 | 7.99 | 7.65 | 7.05 | 5.89 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.27 | 3.69 | 4.55 | 3.42 | 2.51 | 3.12 | 🟢 |
| Motorizados - Q58 | 2.64 | 4.43 | 4.00 | 2.66 | 3.43 | 3.30 | 🟡 |
| Motorizados - INTER | 8.39 | 8.52 | 11.33 | 8.51 | 7.90 | 10.04 | 🟢 |
| Domiciliarios Q58 - | 2.67 | 3.41 | 3.18 | 2.21 | 2.20 | 1.07 | 🔴 |
| TEST Creativos - API | 8.46 | 7.45 | 7.39 | 6.24 | 7.75 | 8.51 | 🟢 |
| Motorizados - API | 5.65 | 5.91 | 4.32 | 4.98 | 4.55 | 4.20 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.59 | 3.66 | 3.69 | 3.71 | 2.96 | 2.74 | 🟡 |
| Domiciliarios VIDEO - API | 7.66 | 6.74 | 6.40 | 3.75 | 5.83 | 5.59 | 🟡 |
| Domiciliarios INTER - API | 9.41 | 10.54 | 11.04 | 10.69 | 7.88 | 9.51 | 🟢 |
| RADIO - Fincas | 3.22 | 7.62 | 3.68 | 4.56 | 3.20 | 2.81 | 🟡 |
| RADIO - Broad | 4.47 | — | 8.34 | 4.62 | 3.51 | 4.85 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,761 | 636 | $750 | $3,288 | 4.39 | $544,181 |

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
