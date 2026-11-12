# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-11 23:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$283,521** |
| gastado hoy (hasta las 23h) | $434,836 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $434,836 |
| saldo proyectado a medianoche | $283,521 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-07 | $367,724 | 678 | **$542** | $3,153 | 5.81 |
| 2026-11-08 | $477,063 | 911 | **$524** | $2,764 | 5.28 |
| 2026-11-09 | $471,508 | 752 | **$627** | $3,268 | 5.21 |
| 2026-11-10 | $377,102 | 577 | **$654** | $3,779 | 5.78 |
| 2026-11-11 **HOY** | $434,836 | 673 | **$646** | $3,679 | 5.69 |

🟢 **Hoy va mejor que ayer a la misma hora** ($646 vs $654).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   646  =  $ 3,679  ÷  5.69
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,679 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.69 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $36,066 | 90% | 33 | $1,093 | 3.66 |
| Domiciliarios VIDEO INTER - API | $36,000 | $35,632 | 99% | 49 | $727 | 6.58 |
| Domiciliarios - Expancion - Q58 | $29,000 | $33,358 | 115% | 114 | $293 | 8.09 |
| RADIO - Moteros | $35,000 | $32,005 | 91% | 19 | $1,684 | 3.47 |
| Domiciliarios - API | $35,000 | $31,244 | 89% | 38 | $822 | 5.51 |
| Domiciliarios - Expancion - API | $30,000 | $28,680 | 96% | 35 | $819 | 5.94 |
| Motorizados - Q58 | $29,000 | $27,819 | 96% | 45 | $618 | 4.17 |
| Motorizados - INTER | $25,000 | $26,326 | 105% | 55 | $479 | 11.52 |
| Domiciliarios VIDEO Q58 - | $25,000 | $25,728 | 103% | 44 | $585 | 4.71 |
| Domiciliarios Q58 - | $25,000 | $24,898 | 100% | 29 | $859 | 3.30 |
| RADIO - Fincas | $20,000 | $23,107 | 116% | 18 | $1,284 | 3.61 |
| Domiciliarios - Expancion - INTER | $25,000 | $22,964 | 92% | 37 | $621 | 3.76 |
| Domiciliarios INTER - API | $20,000 | $19,907 | 100% | 70 | $284 | 11.07 |
| TEST Creativos - API | $20,000 | $19,743 | 99% | 27 | $731 | 7.51 |
| Domiciliarios VIDEO - API | $20,000 | $19,012 | 95% | 29 | $656 | 6.21 |
| Motorizados - API | $20,000 | $17,848 | 89% | 20 | $892 | 4.04 |
| RADIO - Broad | $10,000 | $10,499 | 105% | 11 | $954 | 8.53 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $434,836 | 673 | **$646** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,877**/pedido |
| utilidad estimada de lo que va del día | **$645,500** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $976 | $1,003 | $914 | $873 | $1,417 | $1,093 | 🟢 |
| Domiciliarios VIDEO INTER - API | $685 | $528 | $565 | $641 | $601 | $727 | 🔴 |
| Domiciliarios - Expancion - Q58 | $258 | $295 | $265 | $314 | $290 | $293 | 🟡 |
| RADIO - Moteros | $3,195 | $1,572 | $1,178 | $1,702 | $2,245 | $1,684 | 🟢 |
| Domiciliarios - API | $449 | $453 | $430 | $500 | $486 | $822 | 🔴 |
| Domiciliarios - Expancion - API | $536 | $641 | $543 | $550 | $711 | $819 | 🔴 |
| Motorizados - Q58 | $646 | $441 | $683 | $853 | $646 | $618 | 🟡 |
| Motorizados - INTER | $540 | $517 | $460 | $558 | $639 | $479 | 🟢 |
| Domiciliarios VIDEO Q58 - | $619 | $741 | $581 | $697 | $798 | $585 | 🟢 |
| Domiciliarios Q58 - | $919 | $1,059 | $773 | $1,156 | $1,066 | $859 | 🟢 |
| RADIO - Fincas | $1,231 | $752 | $725 | $1,388 | $639 | $1,284 | 🔴 |
| Domiciliarios - Expancion - INTER | $432 | $621 | $512 | $682 | $700 | $621 | 🟢 |
| Domiciliarios INTER - API | $301 | $317 | $288 | $315 | $306 | $284 | 🟢 |
| TEST Creativos - API | $662 | $425 | $629 | $680 | $797 | $731 | 🟢 |
| Domiciliarios VIDEO - API | $327 | $363 | $344 | $411 | $531 | $656 | 🔴 |
| Motorizados - API | $377 | $351 | $390 | $543 | $597 | $892 | 🔴 |
| RADIO - Broad | $942 | $1,435 | $1,184 | $1,465 | — | $954 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.19 | 3.41 | 3.05 | 4.26 | 2.80 | 3.66 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.95 | 8.11 | 6.57 | 6.48 | 8.46 | 6.58 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.12 | 7.82 | 7.28 | 6.45 | 8.82 | 8.09 | 🟡 |
| RADIO - Moteros | 1.13 | 2.45 | 2.63 | 2.37 | 2.45 | 3.47 | 🟢 |
| Domiciliarios - API | 8.77 | 8.32 | 8.43 | 7.59 | 8.23 | 5.51 | 🔴 |
| Domiciliarios - Expancion - API | 7.65 | 6.44 | 6.71 | 6.71 | 6.23 | 5.94 | 🟡 |
| Motorizados - Q58 | 2.94 | 4.45 | 2.40 | 2.64 | 4.43 | 4.17 | 🟡 |
| Motorizados - INTER | 10.43 | 9.79 | 8.69 | 8.39 | 8.52 | 11.52 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.63 | 3.43 | 3.96 | 3.27 | 3.70 | 4.71 | 🟢 |
| Domiciliarios Q58 - | 3.03 | 2.54 | 3.14 | 2.67 | 3.41 | 3.30 | 🟡 |
| RADIO - Fincas | 2.79 | 4.91 | 4.90 | 3.22 | 7.62 | 3.61 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.91 | 3.36 | 3.65 | 3.59 | 3.66 | 3.76 | 🟡 |
| Domiciliarios INTER - API | 10.36 | 8.21 | 8.60 | 9.41 | 10.54 | 11.07 | 🟡 |
| TEST Creativos - API | 6.64 | 11.59 | 7.61 | 8.46 | 7.45 | 7.51 | 🟡 |
| Domiciliarios VIDEO - API | 9.47 | 8.74 | 7.31 | 7.66 | 6.74 | 6.21 | 🟡 |
| Motorizados - API | 9.51 | 8.93 | 7.88 | 5.65 | 5.91 | 4.04 | 🔴 |
| RADIO - Broad | 6.44 | 3.79 | 5.20 | 4.47 | — | 8.53 | 🟢 |

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
| 2026-11-10 | $377,102 | 577 | $654 | $3,779 | 5.78 | $549,130 |

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
