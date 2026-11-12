# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-11 21:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$131,717** |
| gastado hoy (hasta las 21h) | $385,463 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $415,582 |
| saldo proyectado a medianoche | $101,598 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $137,740 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-07 | $364,615 | 662 | **$551** | $3,174 | 5.76 |
| 2026-11-08 | $442,683 | 822 | **$539** | $2,782 | 5.17 |
| 2026-11-09 | $444,001 | 702 | **$632** | $3,278 | 5.18 |
| 2026-11-10 | $344,353 | 519 | **$663** | $3,840 | 5.79 |
| 2026-11-11 **HOY** | $385,463 | 588 | **$656** | $3,736 | 5.70 |

🟢 **Hoy va mejor que ayer a la misma hora** ($656 vs $663).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   656  =  $ 3,736  ÷  5.70
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,736 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.70 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $32,316 | 81% | 30 | $1,077 | 3.79 |
| Domiciliarios VIDEO INTER - API | $36,000 | $31,849 | 88% | 41 | $777 | 6.28 |
| Domiciliarios - Expancion - Q58 | $29,000 | $30,622 | 106% | 104 | $294 | 8.03 |
| RADIO - Moteros | $35,000 | $29,514 | 84% | 18 | $1,640 | 3.67 |
| Domiciliarios - API | $35,000 | $27,610 | 79% | 33 | $837 | 5.47 |
| Domiciliarios - Expancion - API | $30,000 | $24,934 | 83% | 25 | $997 | 4.88 |
| Motorizados - Q58 | $29,000 | $24,721 | 85% | 37 | $668 | 3.95 |
| Motorizados - INTER | $25,000 | $23,516 | 94% | 48 | $490 | 11.19 |
| Domiciliarios VIDEO Q58 - | $25,000 | $23,373 | 93% | 39 | $599 | 4.64 |
| Domiciliarios Q58 - | $25,000 | $21,183 | 85% | 28 | $757 | 3.88 |
| RADIO - Fincas | $20,000 | $20,540 | 103% | 17 | $1,208 | 3.83 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,997 | 76% | 29 | $655 | 3.67 |
| TEST Creativos - API | $20,000 | $17,643 | 88% | 26 | $679 | 8.08 |
| Domiciliarios INTER - API | $20,000 | $17,468 | 87% | 64 | $273 | 11.69 |
| Domiciliarios VIDEO - API | $20,000 | $16,615 | 83% | 24 | $692 | 5.93 |
| Motorizados - API | $20,000 | $15,437 | 77% | 17 | $908 | 4.02 |
| RADIO - Broad | $10,000 | $9,125 | 91% | 8 | $1,141 | 7.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $385,463 | 588 | **$656** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,051**/pedido |
| utilidad estimada de lo que va del día | **$558,426** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $976 | $1,003 | $914 | $873 | $1,417 | $1,077 | 🟢 |
| Domiciliarios VIDEO INTER - API | $685 | $528 | $565 | $641 | $600 | $777 | 🔴 |
| Domiciliarios - Expancion - Q58 | $258 | $295 | $265 | $314 | $290 | $294 | 🟡 |
| RADIO - Moteros | $3,195 | $1,572 | $1,178 | $1,702 | $2,245 | $1,640 | 🟢 |
| Domiciliarios - API | $449 | $453 | $430 | $500 | $486 | $837 | 🔴 |
| Domiciliarios - Expancion - API | $536 | $641 | $543 | $550 | $711 | $997 | 🔴 |
| Motorizados - Q58 | $646 | $441 | $683 | $853 | $646 | $668 | 🟡 |
| Motorizados - INTER | $540 | $517 | $460 | $558 | $639 | $490 | 🟢 |
| Domiciliarios VIDEO Q58 - | $619 | $741 | $581 | $697 | $798 | $599 | 🟢 |
| Domiciliarios Q58 - | $919 | $1,059 | $773 | $1,156 | $1,066 | $757 | 🟢 |
| RADIO - Fincas | $1,231 | $752 | $725 | $1,388 | $639 | $1,208 | 🔴 |
| Domiciliarios - Expancion - INTER | $432 | $621 | $512 | $682 | $700 | $655 | 🟢 |
| TEST Creativos - API | $662 | $425 | $629 | $680 | $797 | $679 | 🟢 |
| Domiciliarios INTER - API | $301 | $317 | $288 | $315 | $306 | $273 | 🟢 |
| Domiciliarios VIDEO - API | $327 | $363 | $344 | $411 | $531 | $692 | 🔴 |
| Motorizados - API | $377 | $351 | $390 | $543 | $597 | $908 | 🔴 |
| RADIO - Broad | $942 | $1,435 | $1,184 | $1,465 | — | $1,141 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.19 | 3.41 | 3.05 | 4.26 | 2.80 | 3.79 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.95 | 8.11 | 6.57 | 6.48 | 8.46 | 6.28 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.12 | 7.82 | 7.28 | 6.45 | 8.82 | 8.03 | 🟡 |
| RADIO - Moteros | 1.13 | 2.45 | 2.63 | 2.37 | 2.45 | 3.67 | 🟢 |
| Domiciliarios - API | 8.77 | 8.32 | 8.43 | 7.59 | 8.24 | 5.47 | 🔴 |
| Domiciliarios - Expancion - API | 7.65 | 6.44 | 6.71 | 6.71 | 6.23 | 4.88 | 🔴 |
| Motorizados - Q58 | 2.94 | 4.45 | 2.40 | 2.64 | 4.43 | 3.95 | 🟡 |
| Motorizados - INTER | 10.43 | 9.79 | 8.69 | 8.39 | 8.52 | 11.19 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.63 | 3.43 | 3.96 | 3.27 | 3.70 | 4.64 | 🟢 |
| Domiciliarios Q58 - | 3.03 | 2.54 | 3.14 | 2.67 | 3.41 | 3.88 | 🟢 |
| RADIO - Fincas | 2.79 | 4.91 | 4.90 | 3.22 | 7.62 | 3.83 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.91 | 3.36 | 3.65 | 3.59 | 3.66 | 3.67 | 🟡 |
| TEST Creativos - API | 6.64 | 11.59 | 7.61 | 8.46 | 7.45 | 8.08 | 🟢 |
| Domiciliarios INTER - API | 10.36 | 8.21 | 8.60 | 9.41 | 10.54 | 11.69 | 🟢 |
| Domiciliarios VIDEO - API | 9.47 | 8.74 | 7.31 | 7.66 | 6.74 | 5.93 | 🟡 |
| Motorizados - API | 9.51 | 8.93 | 7.88 | 5.65 | 5.91 | 4.02 | 🔴 |
| RADIO - Broad | 6.44 | 3.79 | 5.20 | 4.47 | — | 7.07 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,084 | 577 | $654 | $3,779 | 5.78 | $549,148 |

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
