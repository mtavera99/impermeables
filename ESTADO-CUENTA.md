# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-14 18:33 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$214,024** |
| gastado hoy (hasta las 18h) | $306,029 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $437,789 |
| saldo proyectado a medianoche | $82,264 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $134,867 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-10 | $239,876 | 362 | **$663** | $4,062 | 6.13 |
| 2026-11-11 | $316,232 | 474 | **$667** | $3,833 | 5.75 |
| 2026-11-12 | $295,504 | 387 | **$764** | $3,924 | 5.14 |
| 2026-11-13 | $341,005 | 461 | **$740** | $3,458 | 4.67 |
| 2026-11-14 **HOY** | $306,029 | 416 | **$736** | $3,322 | 4.52 |

🟢 **Hoy va mejor que ayer a la misma hora** ($736 vs $740).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   736  =  $ 3,322  ÷  4.52
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,322 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.52 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $27,206 | 78% | 33 | $824 | 5.06 |
| RADIO - Seguridad / Negocios | $40,000 | $25,298 | 63% | 18 | $1,405 | 2.64 |
| RADIO - Moteros | $35,000 | $24,756 | 71% | 16 | $1,547 | 4.47 |
| Domiciliarios VIDEO INTER - API | $36,000 | $24,358 | 68% | 41 | $594 | 7.36 |
| Domiciliarios - Expancion - API | $30,000 | $23,304 | 78% | 16 | $1,456 | 3.54 |
| Domiciliarios - Expancion - Q58 | $29,000 | $18,897 | 65% | 54 | $350 | 6.16 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,161 | 73% | 26 | $698 | 2.96 |
| Motorizados - Q58 | $29,000 | $17,482 | 60% | 32 | $546 | 3.37 |
| Motorizados - INTER | $25,000 | $17,228 | 69% | 32 | $538 | 10.04 |
| Domiciliarios Q58 - | $25,000 | $16,442 | 66% | 7 | $2,349 | 0.94 |
| TEST Creativos - API | $20,000 | $16,244 | 81% | 24 | $677 | 7.74 |
| Domiciliarios - Expancion - INTER | $25,000 | $15,160 | 61% | 19 | $798 | 2.55 |
| Motorizados - API | $20,000 | $15,067 | 75% | 19 | $793 | 4.79 |
| Domiciliarios VIDEO - API | $20,000 | $14,789 | 74% | 25 | $592 | 5.79 |
| Domiciliarios INTER - API | $20,000 | $13,789 | 69% | 43 | $321 | 8.87 |
| RADIO - Fincas | $20,000 | $11,715 | 59% | 8 | $1,464 | 2.93 |
| RADIO - Broad | $10,000 | $6,133 | 61% | 5 | $1,227 | 5.27 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $306,029 | 418 | **$732** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,458**/pedido |
| utilidad estimada de lo que va del día | **$364,967** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $500 | $489 | $856 | $757 | $1,151 | $824 | 🟢 |
| RADIO - Seguridad / Negocios | $873 | $1,417 | $1,142 | $937 | $1,072 | $1,405 | 🔴 |
| RADIO - Moteros | $1,702 | $2,246 | $1,757 | $2,042 | $1,312 | $1,547 | 🔴 |
| Domiciliarios VIDEO INTER - API | $641 | $601 | $713 | $875 | $767 | $594 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $711 | $841 | $842 | $1,140 | $1,456 | 🔴 |
| Domiciliarios - Expancion - Q58 | $314 | $290 | $296 | $360 | $348 | $350 | 🟡 |
| Domiciliarios VIDEO Q58 - | $697 | $798 | $603 | $800 | $880 | $698 | 🟢 |
| Motorizados - Q58 | $853 | $646 | $643 | $913 | $612 | $546 | 🟢 |
| Motorizados - INTER | $558 | $639 | $484 | $758 | $655 | $538 | 🟢 |
| Domiciliarios Q58 - | $1,156 | $1,066 | $877 | $1,051 | $1,039 | $2,349 | 🔴 |
| TEST Creativos - API | $680 | $797 | $740 | $894 | $661 | $677 | 🟡 |
| Domiciliarios - Expancion - INTER | $682 | $700 | $623 | $606 | $660 | $798 | 🔴 |
| Motorizados - API | $543 | $597 | $840 | $770 | $792 | $793 | 🟡 |
| Domiciliarios VIDEO - API | $411 | $532 | $635 | $939 | $564 | $592 | 🟡 |
| Domiciliarios INTER - API | $315 | $306 | $285 | $344 | $361 | $321 | 🟢 |
| RADIO - Fincas | $1,388 | $639 | $1,254 | $939 | $1,359 | $1,464 | 🟡 |
| RADIO - Broad | $1,465 | — | $970 | $1,617 | $1,915 | $1,227 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.59 | 8.23 | 5.31 | 6.19 | 3.74 | 5.06 | 🟢 |
| RADIO - Seguridad / Negocios | 4.26 | 2.80 | 3.47 | 3.92 | 2.84 | 2.64 | 🟡 |
| RADIO - Moteros | 2.37 | 2.45 | 3.35 | 2.69 | 3.80 | 4.47 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 8.46 | 6.64 | 5.43 | 6.46 | 7.36 | 🟢 |
| Domiciliarios - Expancion - API | 6.71 | 6.23 | 5.77 | 5.92 | 4.02 | 3.54 | 🟡 |
| Domiciliarios - Expancion - Q58 | 6.45 | 8.82 | 7.99 | 7.65 | 7.05 | 6.16 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.27 | 3.69 | 4.55 | 3.42 | 2.51 | 2.96 | 🟢 |
| Motorizados - Q58 | 2.64 | 4.43 | 4.00 | 2.66 | 3.43 | 3.37 | 🟡 |
| Motorizados - INTER | 8.39 | 8.52 | 11.33 | 8.51 | 7.90 | 10.04 | 🟢 |
| Domiciliarios Q58 - | 2.67 | 3.41 | 3.18 | 2.21 | 2.20 | 0.94 | 🔴 |
| TEST Creativos - API | 8.46 | 7.45 | 7.39 | 6.24 | 7.75 | 7.74 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.59 | 3.66 | 3.69 | 3.71 | 2.96 | 2.55 | 🟡 |
| Motorizados - API | 5.65 | 5.91 | 4.32 | 4.98 | 4.55 | 4.79 | 🟢 |
| Domiciliarios VIDEO - API | 7.66 | 6.74 | 6.40 | 3.75 | 5.83 | 5.79 | 🟡 |
| Domiciliarios INTER - API | 9.41 | 10.54 | 11.04 | 10.69 | 7.88 | 8.87 | 🟢 |
| RADIO - Fincas | 3.22 | 7.62 | 3.68 | 4.56 | 3.20 | 2.93 | 🟡 |
| RADIO - Broad | 4.47 | — | 8.34 | 4.62 | 3.51 | 5.27 | 🟢 |

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
| 2026-11-13 | $476,713 | 636 | $750 | $3,288 | 4.39 | $544,229 |

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
