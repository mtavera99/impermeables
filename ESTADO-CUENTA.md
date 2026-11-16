# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 20:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$285,758** |
| gastado hoy (hasta las 20h) | $402,247 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $447,248 |
| saldo proyectado a medianoche | $240,756 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $392,113 | 585 | **$670** | $3,716 | 5.54 |
| 2026-11-12 | $368,917 | 483 | **$764** | $3,742 | 4.90 |
| 2026-11-13 | $420,048 | 554 | **$758** | $3,390 | 4.47 |
| 2026-11-14 | $397,813 | 547 | **$727** | $3,211 | 4.41 |
| 2026-11-15 **HOY** | $402,247 | 520 | **$774** | $3,551 | 4.59 |

🟠 Hoy va 6% más caro que ayer a la misma hora ($774 vs $727).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   774  =  $ 3,551  ÷  4.59
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,551 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.59 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $34,691 | 87% | 26 | $1,334 | 2.89 |
| Domiciliarios VIDEO INTER - API | $36,000 | $33,458 | 93% | 46 | $727 | 6.65 |
| Domiciliarios - API | $35,000 | $31,107 | 89% | 40 | $778 | 6.29 |
| RADIO - Moteros | $35,000 | $31,054 | 89% | 16 | $1,941 | 3.12 |
| Domiciliarios - Expancion - Q58 | $29,000 | $29,157 | 101% | 90 | $324 | 7.26 |
| Domiciliarios - Expancion - API | $30,000 | $25,961 | 87% | 22 | $1,180 | 4.66 |
| Motorizados - Q58 | $29,000 | $24,492 | 84% | 31 | $790 | 2.77 |
| Domiciliarios Q58 - | $25,000 | $24,435 | 98% | 19 | $1,286 | 1.73 |
| Domiciliarios - Expancion - INTER | $25,000 | $23,158 | 93% | 33 | $702 | 3.33 |
| Domiciliarios VIDEO Q58 - | $25,000 | $23,154 | 93% | 23 | $1,007 | 2.48 |
| Motorizados - INTER | $25,000 | $22,360 | 89% | 30 | $745 | 7.23 |
| TEST Creativos - API | $20,000 | $19,457 | 97% | 20 | $973 | 5.02 |
| RADIO - Fincas | $20,000 | $18,307 | 92% | 23 | $796 | 6.37 |
| Motorizados - API | $20,000 | $17,421 | 87% | 17 | $1,025 | 3.69 |
| Domiciliarios INTER - API | $20,000 | $17,174 | 86% | 53 | $324 | 10.01 |
| Domiciliarios VIDEO - API | $20,000 | $16,549 | 83% | 24 | $690 | 5.58 |
| RADIO - Broad | $10,000 | $10,312 | 103% | 5 | $2,062 | 3.56 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $402,247 | 518 | **$777** | $2,402 | **32%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$14,275**/pedido |
| utilidad estimada de lo que va del día | **$429,275** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,219 | $1,334 | 🟡 |
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $645 | $727 | 🟡 |
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $779 | $778 | 🟡 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,535 | $1,941 | 🔴 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $324 | 🟢 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,193 | $1,180 | 🟡 |
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $790 | 🔴 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $1,286 | 🟢 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | $702 | 🟡 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $1,007 | 🔴 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $514 | $745 | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $973 | 🔴 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,038 | $796 | 🟢 |
| Motorizados - API | $597 | $840 | $770 | $793 | $935 | $1,025 | 🟡 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $295 | $324 | 🟡 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $657 | $690 | 🟡 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,649 | $2,062 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.71 | 2.89 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.64 | 6.65 | 🟡 |
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.36 | 6.29 | 🟢 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.23 | 3.12 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.74 | 7.26 | 🟢 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.33 | 4.66 | 🟢 |
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 2.77 | 🟡 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 1.73 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.78 | 3.33 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.84 | 2.48 | 🟡 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.71 | 7.23 | 🔴 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 5.02 | 🔴 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.75 | 6.37 | 🟢 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.02 | 3.69 | 🟡 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.64 | 10.01 | 🟡 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.31 | 5.58 | 🟡 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.73 | 3.56 | 🟡 |

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
| 2026-11-14 | $430,960 | 599 | $719 | $3,122 | 4.34 | $530,587 |

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
