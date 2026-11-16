# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-16 14:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$286,336** |
| gastado hoy (hasta las 14h) | $336,995 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $557,939 |
| saldo proyectado a medianoche | $65,392 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $31,589 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-12 | $186,924 | 262 | **$713** | $4,045 | 5.67 |
| 2026-11-13 | $222,094 | 299 | **$743** | $3,460 | 4.66 |
| 2026-11-14 | $219,828 | 292 | **$753** | $3,370 | 4.48 |
| 2026-11-15 | $234,659 | 265 | **$886** | $3,894 | 4.40 |
| 2026-11-16 **HOY** | $337,466 | 405 | **$833** | $3,423 | 4.11 |

🟢 **Hoy va mejor que ayer a la misma hora** ($833 vs $886).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   833  =  $ 3,423  ÷  4.11
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,423 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.11 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $32,630 | 82% | 18 | $1,813 | 1.82 |
| Domiciliarios VIDEO INTER - API | $36,000 | $30,082 | 84% | 39 | $771 | 5.56 |
| Domiciliarios - API | $35,000 | $27,793 | 79% | 34 | $817 | 6.00 |
| RADIO - Moteros | $35,000 | $25,687 | 73% | 11 | $2,335 | 2.67 |
| Domiciliarios - Expancion - API | $30,000 | $23,724 | 79% | 23 | $1,031 | 4.87 |
| Motorizados - Q58 | $29,000 | $21,293 | 73% | 26 | $819 | 2.88 |
| Domiciliarios - Expancion - Q58 | $29,000 | $20,383 | 70% | 48 | $425 | 5.03 |
| Motorizados - INTER | $25,000 | $20,095 | 80% | 28 | $718 | 6.56 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,997 | 76% | 13 | $1,461 | 1.50 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,248 | 73% | 26 | $702 | 3.10 |
| Domiciliarios Q58 - | $25,000 | $17,449 | 70% | 14 | $1,246 | 2.07 |
| Domiciliarios INTER - API | $20,000 | $16,416 | 82% | 38 | $432 | 6.27 |
| Domiciliarios VIDEO - API | $20,000 | $16,362 | 82% | 27 | $606 | 5.85 |
| Motorizados - API | $20,000 | $15,019 | 75% | 24 | $626 | 6.80 |
| TEST Creativos - API | $20,000 | $14,117 | 71% | 13 | $1,086 | 5.54 |
| RADIO - Fincas | $20,000 | $12,788 | 64% | 15 | $853 | 4.74 |
| RADIO - Broad | $10,000 | $6,594 | 66% | 7 | $942 | 8.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $337,677 | 404 | **$836** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$15,365**/pedido |
| utilidad estimada de lo que va del día | **$310,846** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,142 | $937 | $1,073 | $1,219 | $1,181 | $1,813 | 🔴 |
| Domiciliarios VIDEO INTER - API | $713 | $875 | $768 | $645 | $705 | $771 | 🟡 |
| Domiciliarios - API | $856 | $757 | $1,151 | $779 | $735 | $817 | 🟡 |
| RADIO - Moteros | $1,757 | $2,042 | $1,314 | $1,535 | $2,031 | $2,335 | 🟡 |
| Domiciliarios - Expancion - API | $841 | $842 | $1,140 | $1,193 | $1,160 | $1,031 | 🟢 |
| Motorizados - Q58 | $643 | $913 | $612 | $589 | $813 | $823 | 🟡 |
| Domiciliarios - Expancion - Q58 | $296 | $360 | $348 | $372 | $330 | $425 | 🔴 |
| Motorizados - INTER | $484 | $758 | $656 | $514 | $650 | $718 | 🟡 |
| Domiciliarios VIDEO Q58 - | $603 | $800 | $880 | $709 | $1,015 | $1,461 | 🔴 |
| Domiciliarios - Expancion - INTER | $623 | $606 | $660 | $652 | $596 | $702 | 🔴 |
| Domiciliarios Q58 - | $877 | $1,051 | $1,039 | $1,913 | $1,203 | $1,246 | 🟡 |
| Domiciliarios INTER - API | $285 | $344 | $361 | $295 | $340 | $432 | 🔴 |
| Domiciliarios VIDEO - API | $635 | $939 | $564 | $657 | $689 | $606 | 🟢 |
| Motorizados - API | $840 | $770 | $793 | $935 | $1,016 | $626 | 🟢 |
| TEST Creativos - API | $740 | $894 | $661 | $622 | $930 | $1,086 | 🔴 |
| RADIO - Fincas | $1,254 | $939 | $1,359 | $1,038 | $886 | $853 | 🟡 |
| RADIO - Broad | $970 | $1,617 | $1,916 | $1,649 | $1,968 | $942 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.47 | 3.92 | 2.84 | 2.71 | 3.12 | 1.82 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 5.43 | 6.46 | 6.64 | 6.79 | 5.56 | 🔴 |
| Domiciliarios - API | 5.31 | 6.19 | 3.74 | 5.36 | 6.48 | 6.00 | 🟡 |
| RADIO - Moteros | 3.35 | 2.69 | 3.80 | 4.23 | 2.96 | 2.67 | 🟡 |
| Domiciliarios - Expancion - API | 5.77 | 5.92 | 4.02 | 4.33 | 4.64 | 4.87 | 🟢 |
| Motorizados - Q58 | 4.00 | 2.66 | 3.43 | 2.80 | 2.54 | 2.86 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.99 | 7.65 | 7.05 | 5.74 | 7.12 | 5.03 | 🔴 |
| Motorizados - INTER | 11.33 | 8.51 | 7.89 | 9.71 | 8.15 | 6.56 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.55 | 3.42 | 2.51 | 2.84 | 2.36 | 1.50 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.69 | 3.71 | 2.96 | 2.78 | 3.72 | 3.10 | 🔴 |
| Domiciliarios Q58 - | 3.18 | 2.21 | 2.20 | 1.05 | 1.78 | 2.07 | 🟢 |
| Domiciliarios INTER - API | 11.04 | 10.69 | 7.88 | 9.64 | 9.02 | 6.27 | 🔴 |
| Domiciliarios VIDEO - API | 6.40 | 3.75 | 5.83 | 5.31 | 5.53 | 5.85 | 🟢 |
| Motorizados - API | 4.32 | 4.98 | 4.55 | 4.02 | 3.62 | 6.80 | 🟢 |
| TEST Creativos - API | 7.39 | 6.24 | 7.75 | 7.73 | 5.05 | 5.54 | 🟢 |
| RADIO - Fincas | 3.68 | 4.56 | 3.20 | 3.75 | 5.55 | 4.74 | 🟡 |
| RADIO - Broad | 8.34 | 4.62 | 3.51 | 3.73 | 3.66 | 8.07 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $465,410 | 613 | $759 | $3,442 | 4.53 | $518,611 |

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
