# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-13 17:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$316,238** |
| gastado hoy (hasta las 17h) | $279,785 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $447,479 |
| saldo proyectado a medianoche | $148,544 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $58,897 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-09 | $307,558 | 489 | **$629** | $3,268 | 5.20 |
| 2026-11-10 | $204,781 | 318 | **$644** | $4,150 | 6.44 |
| 2026-11-11 | $277,746 | 419 | **$663** | $3,893 | 5.87 |
| 2026-11-12 | $259,221 | 347 | **$747** | $3,979 | 5.33 |
| 2026-11-13 **HOY** | $279,785 | 385 | **$727** | $3,470 | 4.77 |

🟢 **Hoy va mejor que ayer a la misma hora** ($727 vs $747).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   727  =  $ 3,470  ÷  4.77
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,470 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.77 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $25,369 | 63% | 31 | $818 | 3.81 |
| Domiciliarios VIDEO INTER - API | $36,000 | $23,182 | 64% | 31 | $748 | 6.73 |
| RADIO - Moteros | $35,000 | $22,870 | 65% | 22 | $1,040 | 5.03 |
| Domiciliarios - API | $35,000 | $22,088 | 63% | 22 | $1,004 | 4.65 |
| Domiciliarios - Expancion - API | $30,000 | $18,935 | 63% | 15 | $1,262 | 4.14 |
| Motorizados - Q58 | $29,000 | $18,440 | 64% | 31 | $595 | 3.94 |
| Domiciliarios - Expancion - INTER | $25,000 | $17,593 | 70% | 29 | $607 | 3.43 |
| Domiciliarios - Expancion - Q58 | $29,000 | $17,252 | 59% | 52 | $332 | 7.64 |
| Motorizados - INTER | $25,000 | $17,021 | 68% | 24 | $709 | 7.91 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,004 | 64% | 16 | $1,000 | 2.43 |
| Domiciliarios Q58 - | $25,000 | $15,638 | 63% | 9 | $1,738 | 1.41 |
| Domiciliarios INTER - API | $20,000 | $12,855 | 64% | 34 | $378 | 8.10 |
| Domiciliarios VIDEO - API | $20,000 | $12,360 | 62% | 24 | $515 | 6.96 |
| TEST Creativos - API | $20,000 | $11,354 | 57% | 18 | $631 | 8.53 |
| Motorizados - API | $20,000 | $11,349 | 57% | 15 | $757 | 5.04 |
| RADIO - Fincas | $20,000 | $10,349 | 52% | 9 | $1,150 | 3.95 |
| RADIO - Broad | $10,000 | $7,126 | 71% | 3 | $2,375 | 2.94 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $279,785 | 385 | **$727** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,359**/pedido |
| utilidad estimada de lo que va del día | **$338,238** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $914 | $873 | $1,417 | $1,142 | $936 | $818 | 🟢 |
| Domiciliarios VIDEO INTER - API | $565 | $641 | $601 | $713 | $875 | $748 | 🟢 |
| RADIO - Moteros | $1,178 | $1,702 | $2,246 | $1,757 | $2,041 | $1,040 | 🟢 |
| Domiciliarios - API | $430 | $500 | $489 | $856 | $757 | $1,004 | 🔴 |
| Domiciliarios - Expancion - API | $543 | $550 | $711 | $841 | $841 | $1,262 | 🔴 |
| Motorizados - Q58 | $683 | $853 | $646 | $643 | $913 | $595 | 🟢 |
| Domiciliarios - Expancion - INTER | $512 | $682 | $700 | $623 | $606 | $607 | 🟡 |
| Domiciliarios - Expancion - Q58 | $265 | $314 | $290 | $296 | $360 | $332 | 🟢 |
| Motorizados - INTER | $460 | $558 | $639 | $484 | $758 | $709 | 🟢 |
| Domiciliarios VIDEO Q58 - | $581 | $697 | $798 | $603 | $799 | $1,000 | 🔴 |
| Domiciliarios Q58 - | $773 | $1,156 | $1,066 | $877 | $1,051 | $1,738 | 🔴 |
| Domiciliarios INTER - API | $288 | $315 | $306 | $285 | $344 | $378 | 🟡 |
| Domiciliarios VIDEO - API | $344 | $411 | $532 | $635 | $939 | $515 | 🟢 |
| TEST Creativos - API | $629 | $680 | $797 | $740 | $893 | $631 | 🟢 |
| Motorizados - API | $390 | $543 | $597 | $840 | $770 | $757 | 🟡 |
| RADIO - Fincas | $725 | $1,388 | $639 | $1,254 | $939 | $1,150 | 🔴 |
| RADIO - Broad | $1,184 | $1,465 | — | $970 | $1,617 | $2,375 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.05 | 4.26 | 2.80 | 3.47 | 3.92 | 3.81 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.57 | 6.48 | 8.46 | 6.64 | 5.44 | 6.73 | 🟢 |
| RADIO - Moteros | 2.63 | 2.37 | 2.45 | 3.35 | 2.69 | 5.03 | 🟢 |
| Domiciliarios - API | 8.43 | 7.59 | 8.23 | 5.31 | 6.19 | 4.65 | 🔴 |
| Domiciliarios - Expancion - API | 6.71 | 6.71 | 6.23 | 5.77 | 5.93 | 4.14 | 🔴 |
| Motorizados - Q58 | 2.40 | 2.64 | 4.43 | 4.00 | 2.66 | 3.94 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.65 | 3.59 | 3.66 | 3.69 | 3.71 | 3.43 | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.28 | 6.45 | 8.82 | 7.99 | 7.66 | 7.64 | 🟡 |
| Motorizados - INTER | 8.69 | 8.39 | 8.52 | 11.33 | 8.51 | 7.91 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.96 | 3.27 | 3.69 | 4.55 | 3.42 | 2.43 | 🔴 |
| Domiciliarios Q58 - | 3.14 | 2.67 | 3.41 | 3.18 | 2.21 | 1.41 | 🔴 |
| Domiciliarios INTER - API | 8.60 | 9.41 | 10.54 | 11.04 | 10.69 | 8.10 | 🔴 |
| Domiciliarios VIDEO - API | 7.31 | 7.66 | 6.74 | 6.40 | 3.75 | 6.96 | 🟢 |
| TEST Creativos - API | 7.61 | 8.46 | 7.45 | 7.39 | 6.24 | 8.53 | 🟢 |
| Motorizados - API | 7.88 | 5.65 | 5.91 | 4.32 | 4.98 | 5.04 | 🟡 |
| RADIO - Fincas | 4.90 | 3.22 | 7.62 | 3.68 | 4.56 | 3.95 | 🟡 |
| RADIO - Broad | 5.20 | 4.47 | — | 8.34 | 4.62 | 2.94 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,090 | 553 | $765 | $3,631 | 4.75 | $464,616 |

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
