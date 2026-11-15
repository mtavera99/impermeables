# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 18:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$150,139** |
| gastado hoy (hasta las 18h) | $336,706 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $451,088 |
| saldo proyectado a medianoche | $35,756 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $168,075 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $316,232 | 474 | **$667** | $3,833 | 5.75 |
| 2026-11-12 | $295,504 | 387 | **$764** | $3,924 | 5.14 |
| 2026-11-13 | $341,047 | 461 | **$740** | $3,458 | 4.67 |
| 2026-11-14 | $338,024 | 450 | **$751** | $3,260 | 4.34 |
| 2026-11-15 **HOY** | $336,706 | 417 | **$807** | $3,677 | 4.55 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($807 vs $751).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   807  =  $ 3,677  ÷  4.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,677 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.55 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $29,847 | 75% | 23 | $1,298 | 3.14 |
| Domiciliarios VIDEO INTER - API | $36,000 | $28,717 | 80% | 38 | $756 | 6.35 |
| Domiciliarios - API | $35,000 | $26,464 | 76% | 33 | $802 | 6.31 |
| RADIO - Moteros | $35,000 | $25,649 | 73% | 12 | $2,137 | 2.91 |
| Domiciliarios - Expancion - Q58 | $29,000 | $24,004 | 83% | 63 | $381 | 6.29 |
| Domiciliarios - Expancion - API | $30,000 | $22,048 | 73% | 18 | $1,225 | 4.72 |
| Domiciliarios Q58 - | $25,000 | $20,398 | 82% | 17 | $1,200 | 1.95 |
| Motorizados - Q58 | $29,000 | $20,304 | 70% | 27 | $752 | 3.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,562 | 78% | 22 | $889 | 2.93 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,372 | 77% | 22 | $881 | 2.71 |
| Motorizados - INTER | $25,000 | $18,617 | 74% | 27 | $690 | 8.04 |
| TEST Creativos - API | $20,000 | $16,204 | 81% | 18 | $900 | 5.83 |
| Motorizados - API | $20,000 | $14,648 | 73% | 14 | $1,046 | 3.80 |
| RADIO - Fincas | $20,000 | $14,526 | 73% | 20 | $726 | 7.23 |
| Domiciliarios VIDEO - API | $20,000 | $13,931 | 70% | 21 | $663 | 6.00 |
| Domiciliarios INTER - API | $20,000 | $13,713 | 69% | 39 | $352 | 9.31 |
| RADIO - Broad | $10,000 | $8,702 | 87% | 3 | $2,901 | 2.61 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $336,706 | 417 | **$807** | $2,402 | **34%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$14,843**/pedido |
| utilidad estimada de lo que va del día | **$332,685** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,219 | $1,298 | 🟡 |
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $645 | $756 | 🔴 |
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $779 | $802 | 🟡 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,535 | $2,137 | 🔴 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $381 | 🟡 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,193 | $1,225 | 🟡 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $1,200 | 🟢 |
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $752 | 🔴 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $889 | 🔴 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | $881 | 🔴 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $514 | $690 | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $900 | 🔴 |
| Motorizados - API | $597 | $840 | $770 | $793 | $935 | $1,046 | 🟡 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,038 | $726 | 🟢 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $657 | $663 | 🟡 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $295 | $352 | 🔴 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,649 | $2,901 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.71 | 3.14 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.64 | 6.35 | 🟡 |
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.37 | 6.31 | 🟢 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.23 | 2.91 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.75 | 6.29 | 🟢 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.33 | 4.72 | 🟢 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 1.95 | 🟢 |
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 3.00 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.84 | 2.93 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.78 | 2.71 | 🟡 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.72 | 8.04 | 🔴 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 5.83 | 🔴 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.02 | 3.80 | 🟡 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.75 | 7.23 | 🟢 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.31 | 6.00 | 🟢 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.64 | 9.31 | 🟡 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.73 | 2.61 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,932 | 599 | $719 | $3,123 | 4.34 | $530,615 |

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
