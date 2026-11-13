# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-12 23:56 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$254,765** |
| gastado hoy (hasta las 23h) | $415,944 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $415,944 |
| saldo proyectado a medianoche | $254,765 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-08 | $477,063 | 911 | **$524** | $2,764 | 5.28 |
| 2026-11-09 | $471,508 | 752 | **$627** | $3,268 | 5.21 |
| 2026-11-10 | $377,307 | 577 | **$654** | $3,781 | 5.78 |
| 2026-11-11 | $449,143 | 687 | **$654** | $3,663 | 5.60 |
| 2026-11-12 **HOY** | $415,944 | 551 | **$755** | $3,640 | 4.82 |

🟠 Hoy va 15% más caro que ayer a la misma hora ($755 vs $654).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   755  =  $ 3,640  ÷  4.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,640 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $39,332 | 98% | 43 | $915 | 4.04 |
| Domiciliarios VIDEO INTER - API | $36,000 | $32,545 | 90% | 37 | $880 | 5.42 |
| Domiciliarios - API | $35,000 | $32,116 | 92% | 43 | $747 | 6.30 |
| RADIO - Moteros | $35,000 | $31,937 | 91% | 16 | $1,996 | 2.77 |
| Motorizados - Q58 | $29,000 | $30,716 | 106% | 34 | $903 | 2.70 |
| Domiciliarios - Expancion - API | $30,000 | $27,379 | 91% | 33 | $830 | 6.01 |
| Domiciliarios - Expancion - Q58 | $29,000 | $26,163 | 90% | 74 | $354 | 7.85 |
| Domiciliarios - Expancion - INTER | $25,000 | $24,516 | 98% | 41 | $598 | 3.77 |
| Domiciliarios VIDEO Q58 - | $25,000 | $22,773 | 91% | 29 | $785 | 3.50 |
| Domiciliarios Q58 - | $25,000 | $21,835 | 87% | 21 | $1,040 | 2.24 |
| Motorizados - INTER | $25,000 | $21,515 | 86% | 29 | $742 | 8.74 |
| TEST Creativos - API | $20,000 | $20,274 | 101% | 23 | $881 | 6.29 |
| RADIO - Fincas | $20,000 | $20,265 | 101% | 22 | $921 | 4.66 |
| Domiciliarios INTER - API | $20,000 | $19,236 | 96% | 57 | $337 | 10.91 |
| Motorizados - API | $20,000 | $18,986 | 95% | 24 | $791 | 4.86 |
| Domiciliarios VIDEO - API | $20,000 | $18,435 | 92% | 20 | $922 | 3.82 |
| RADIO - Broad | $10,000 | $7,917 | 79% | 5 | $1,583 | 4.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $415,940 | 551 | **$755** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,877**/pedido |
| utilidad estimada de lo que va del día | **$468,555** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,003 | $914 | $873 | $1,417 | $1,141 | $915 | 🟢 |
| Domiciliarios VIDEO INTER - API | $528 | $565 | $641 | $601 | $713 | $880 | 🔴 |
| Domiciliarios - API | $453 | $430 | $500 | $489 | $856 | $747 | 🟢 |
| RADIO - Moteros | $1,572 | $1,178 | $1,702 | $2,246 | $1,757 | $1,996 | 🟡 |
| Motorizados - Q58 | $441 | $683 | $853 | $646 | $643 | $903 | 🔴 |
| Domiciliarios - Expancion - API | $641 | $543 | $550 | $711 | $841 | $830 | 🟡 |
| Domiciliarios - Expancion - Q58 | $295 | $265 | $314 | $290 | $296 | $354 | 🔴 |
| Domiciliarios - Expancion - INTER | $621 | $512 | $682 | $700 | $623 | $598 | 🟡 |
| Domiciliarios VIDEO Q58 - | $741 | $581 | $697 | $798 | $603 | $785 | 🔴 |
| Domiciliarios Q58 - | $1,059 | $773 | $1,156 | $1,066 | $877 | $1,040 | 🔴 |
| Motorizados - INTER | $517 | $460 | $558 | $639 | $484 | $742 | 🔴 |
| TEST Creativos - API | $425 | $629 | $680 | $797 | $740 | $881 | 🔴 |
| RADIO - Fincas | $752 | $725 | $1,388 | $639 | $1,253 | $921 | 🟢 |
| Domiciliarios INTER - API | $317 | $288 | $315 | $306 | $285 | $337 | 🔴 |
| Motorizados - API | $351 | $390 | $543 | $597 | $840 | $791 | 🟢 |
| Domiciliarios VIDEO - API | $363 | $344 | $411 | $532 | $635 | $922 | 🔴 |
| RADIO - Broad | $1,435 | $1,184 | $1,465 | — | $969 | $1,583 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.41 | 3.05 | 4.26 | 2.80 | 3.48 | 4.04 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.11 | 6.57 | 6.48 | 8.46 | 6.64 | 5.42 | 🔴 |
| Domiciliarios - API | 8.32 | 8.43 | 7.59 | 8.23 | 5.31 | 6.30 | 🟢 |
| RADIO - Moteros | 2.45 | 2.63 | 2.37 | 2.45 | 3.35 | 2.77 | 🔴 |
| Motorizados - Q58 | 4.45 | 2.40 | 2.64 | 4.43 | 4.00 | 2.70 | 🔴 |
| Domiciliarios - Expancion - API | 6.44 | 6.71 | 6.71 | 6.23 | 5.77 | 6.01 | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.82 | 7.28 | 6.45 | 8.82 | 7.99 | 7.85 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.36 | 3.65 | 3.59 | 3.66 | 3.69 | 3.77 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.43 | 3.96 | 3.27 | 3.69 | 4.55 | 3.50 | 🔴 |
| Domiciliarios Q58 - | 2.54 | 3.14 | 2.67 | 3.41 | 3.18 | 2.24 | 🔴 |
| Motorizados - INTER | 9.79 | 8.69 | 8.39 | 8.52 | 11.33 | 8.74 | 🔴 |
| TEST Creativos - API | 11.59 | 7.61 | 8.46 | 7.45 | 7.39 | 6.29 | 🟡 |
| RADIO - Fincas | 4.91 | 4.90 | 3.22 | 7.62 | 3.68 | 4.66 | 🟢 |
| Domiciliarios INTER - API | 8.21 | 8.60 | 9.41 | 10.54 | 11.04 | 10.91 | 🟡 |
| Motorizados - API | 8.93 | 7.88 | 5.65 | 5.91 | 4.32 | 4.86 | 🟢 |
| Domiciliarios VIDEO - API | 8.74 | 7.31 | 7.66 | 6.74 | 6.40 | 3.82 | 🔴 |
| RADIO - Broad | 3.79 | 5.20 | 4.47 | — | 8.35 | 4.75 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,143 | 687 | $654 | $3,663 | 5.60 | $653,667 |

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
