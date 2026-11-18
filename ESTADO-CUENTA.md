# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-17 23:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$99,896** |
| gastado hoy (hasta las 22h) | $336,619 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $343,744 |
| saldo proyectado a medianoche | $92,772 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $218,405 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-13 | $466,931 | 616 | **$758** | $3,311 | 4.37 |
| 2026-11-14 | $427,504 | 595 | **$718** | $3,136 | 4.37 |
| 2026-11-15 | $457,340 | 598 | **$765** | $3,462 | 4.53 |
| 2026-11-16 | $582,641 | 769 | **$758** | $3,463 | 4.57 |
| 2026-11-17 **HOY** | $336,619 | 471 | **$715** | $3,852 | 5.39 |

🟢 **Hoy va mejor que ayer a la misma hora** ($715 vs $758).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   715  =  $ 3,852  ÷  5.39
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,852 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.39 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $29,754 | 74% | 20 | $1,488 | 2.26 |
| RADIO - Moteros | $35,000 | $27,109 | 77% | 14 | $1,936 | 3.46 |
| Domiciliarios VIDEO INTER - API | $36,000 | $25,811 | 72% | 29 | $890 | 5.58 |
| Domiciliarios - API | $35,000 | $25,016 | 71% | 30 | $834 | 5.82 |
| Domiciliarios - Expancion - Q58 | $29,000 | $23,226 | 80% | 72 | $323 | 8.79 |
| Motorizados - INTER | $25,000 | $23,131 | 93% | 44 | $526 | 10.28 |
| Motorizados - Q58 | $29,000 | $21,863 | 75% | 29 | $754 | 3.34 |
| Domiciliarios - Expancion - API | $30,000 | $20,458 | 68% | 24 | $852 | 6.08 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,922 | 80% | 26 | $766 | 3.21 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,060 | 72% | 30 | $602 | 4.48 |
| Domiciliarios Q58 - | $25,000 | $17,986 | 72% | 18 | $999 | 3.24 |
| Domiciliarios INTER - API | $20,000 | $16,447 | 82% | 64 | $257 | 12.84 |
| TEST Creativos - API | $20,000 | $15,411 | 77% | 22 | $700 | 12.10 |
| Domiciliarios VIDEO - API | $20,000 | $14,866 | 74% | 20 | $743 | 5.59 |
| Motorizados - API | $20,000 | $14,592 | 73% | 12 | $1,216 | 3.59 |
| RADIO - Fincas | $20,000 | $13,362 | 67% | 12 | $1,114 | 3.60 |
| RADIO - Broad | $10,000 | $9,605 | 96% | 5 | $1,921 | 3.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $336,619 | 471 | **$715** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,138**/pedido |
| utilidad estimada de lo que va del día | **$419,456** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $937 | $1,073 | $1,219 | $1,185 | $1,584 | $1,488 | 🟢 |
| RADIO - Moteros | $2,042 | $1,314 | $1,535 | $2,037 | $1,611 | $1,936 | 🔴 |
| Domiciliarios VIDEO INTER - API | $875 | $768 | $645 | $706 | $653 | $890 | 🔴 |
| Domiciliarios - API | $757 | $1,151 | $779 | $736 | $895 | $834 | 🟢 |
| Domiciliarios - Expancion - Q58 | $360 | $348 | $372 | $331 | $303 | $323 | 🟡 |
| Motorizados - INTER | $758 | $656 | $514 | $652 | $679 | $526 | 🟢 |
| Motorizados - Q58 | $913 | $612 | $589 | $813 | $849 | $754 | 🟢 |
| Domiciliarios - Expancion - API | $842 | $1,140 | $1,193 | $1,162 | $1,056 | $852 | 🟢 |
| Domiciliarios VIDEO Q58 - | $800 | $880 | $709 | $1,015 | $1,119 | $766 | 🟢 |
| Domiciliarios - Expancion - INTER | $606 | $660 | $652 | $596 | $624 | $602 | 🟡 |
| Domiciliarios Q58 - | $1,051 | $1,039 | $1,913 | $1,204 | $1,195 | $999 | 🟢 |
| Domiciliarios INTER - API | $344 | $361 | $295 | $340 | $391 | $257 | 🟢 |
| TEST Creativos - API | $894 | $661 | $622 | $930 | $824 | $700 | 🟢 |
| Domiciliarios VIDEO - API | $939 | $564 | $657 | $691 | $525 | $743 | 🔴 |
| Motorizados - API | $770 | $793 | $935 | $1,022 | $667 | $1,216 | 🔴 |
| RADIO - Fincas | $939 | $1,359 | $1,038 | $887 | $1,273 | $1,114 | 🟢 |
| RADIO - Broad | $1,617 | $1,916 | $1,649 | $1,970 | $830 | $1,921 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.92 | 2.84 | 2.71 | 3.12 | 2.08 | 2.26 | 🟢 |
| RADIO - Moteros | 2.69 | 3.80 | 4.23 | 2.95 | 3.83 | 3.46 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.43 | 6.46 | 6.64 | 6.78 | 6.76 | 5.58 | 🔴 |
| Domiciliarios - API | 6.19 | 3.74 | 5.36 | 6.47 | 5.41 | 5.82 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.65 | 7.05 | 5.74 | 7.10 | 7.34 | 8.79 | 🟢 |
| Motorizados - INTER | 8.51 | 7.89 | 9.71 | 8.13 | 7.24 | 10.28 | 🟢 |
| Motorizados - Q58 | 2.66 | 3.43 | 2.80 | 2.54 | 2.83 | 3.34 | 🟢 |
| Domiciliarios - Expancion - API | 5.92 | 4.02 | 4.33 | 4.63 | 4.84 | 6.08 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.42 | 2.51 | 2.84 | 2.36 | 1.90 | 3.21 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.71 | 2.96 | 2.78 | 3.72 | 3.56 | 4.48 | 🟢 |
| Domiciliarios Q58 - | 2.21 | 2.20 | 1.05 | 1.78 | 2.17 | 3.24 | 🟢 |
| Domiciliarios INTER - API | 10.69 | 7.88 | 9.64 | 9.01 | 7.19 | 12.84 | 🟢 |
| TEST Creativos - API | 6.24 | 7.75 | 7.73 | 5.05 | 7.68 | 12.10 | 🟢 |
| Domiciliarios VIDEO - API | 3.75 | 5.83 | 5.31 | 5.52 | 7.02 | 5.59 | 🔴 |
| Motorizados - API | 4.98 | 4.55 | 4.02 | 3.61 | 6.39 | 3.59 | 🔴 |
| RADIO - Fincas | 4.56 | 3.20 | 3.75 | 5.55 | 3.18 | 3.60 | 🟢 |
| RADIO - Broad | 4.62 | 3.51 | 3.73 | 3.66 | 9.39 | 3.07 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,036 | 781 | $753 | $3,462 | 4.60 | $665,667 |

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
