# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-24 18:56 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$271,983** |
| gastado hoy (hasta las 18h) | $265,076 |
| presupuesto activo | $483,000/día |
| cierre proyectado del día | $424,713 |
| saldo proyectado a medianoche | $112,346 |
| objetivo (cubrir un día de 143% + colchón) | $710,690 |

### 🟠 Recargar $173,631 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-20 | $265,839 | 362 | **$734** | $3,936 | 5.36 |
| 2026-11-21 | $286,571 | 400 | **$716** | $3,832 | 5.35 |
| 2026-11-22 | $416,086 | 569 | **$731** | $3,606 | 4.93 |
| 2026-11-23 | $431,141 | 584 | **$738** | $3,421 | 4.63 |
| 2026-11-24 **HOY** | $265,076 | 316 | **$839** | $4,360 | 5.20 |

🟠 Hoy va 14% más caro que ayer a la misma hora ($839 vs $738).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   839  =  $ 4,360  ÷  5.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,360 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.20 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $25,461 | 53% | 10 | $2,546 | 1.73 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $24,114 | 50% | 10 | $2,411 | 1.46 |
| Domiciliarios - API | $35,000 | $20,586 | 59% | 25 | $823 | 8.01 |
| Domiciliarios - Expancion - Q58 | $30,000 | $18,063 | 60% | 44 | $411 | 8.90 |
| Domiciliarios VIDEO Q58 - | $30,000 | $18,054 | 60% | 17 | $1,062 | 4.04 |
| RADIO - Moteros | $25,000 | $17,654 | 71% | 10 | $1,765 | 3.48 |
| Motorizados - INTER | $30,000 | $16,578 | 55% | 31 | $535 | 12.20 |
| Domiciliarios Q58 - | $25,000 | $16,172 | 65% | 15 | $1,078 | 3.92 |
| Domiciliarios - Expancion - INTER | $30,000 | $15,419 | 51% | 15 | $1,028 | 2.73 |
| Motorizados - Q58 | $29,000 | $13,572 | 47% | 21 | $646 | 4.79 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $24,000 | $13,466 | 56% | 10 | $1,347 | 3.44 |
| Domiciliarios VIDEO - API | $24,000 | $12,466 | 52% | 16 | $779 | 6.88 |
| Domiciliarios INTER - API | $25,000 | $12,413 | 50% | 34 | $365 | 10.40 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $20,000 | $12,370 | 62% | 30 | $412 | 9.90 |
| Motorizados - API | $20,000 | $10,174 | 51% | 13 | $783 | 7.24 |
| TEST Creativos - API | $20,000 | $9,360 | 47% | 9 | $1,040 | 5.86 |
| RADIO - Fincas | $20,000 | $9,154 | 46% | 6 | $1,526 | 3.08 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $265,076 | 316 | **$839** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$15,420**/pedido |
| utilidad estimada de lo que va del día | **$242,184** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,121 | $2,176 | $1,409 | $1,314 | $1,158 | $2,546 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | $1,296 | $1,461 | $1,586 | $2,411 | 🔴 |
| Domiciliarios - API | $659 | $663 | $830 | $919 | $604 | $823 | 🔴 |
| Domiciliarios - Expancion - Q58 | $326 | $240 | $362 | $346 | $319 | $411 | 🔴 |
| Domiciliarios VIDEO Q58 - | $891 | $1,035 | $949 | $1,017 | $759 | $1,062 | 🔴 |
| RADIO - Moteros | $1,834 | $1,894 | $1,934 | $2,147 | $4,327 | $1,765 | 🟢 |
| Motorizados - INTER | $475 | $515 | $519 | $582 | $627 | $535 | 🟢 |
| Domiciliarios Q58 - | $1,133 | $1,364 | $1,112 | $1,005 | $982 | $1,078 | 🟡 |
| Domiciliarios - Expancion - INTER | $728 | $633 | $661 | $712 | $668 | $1,028 | 🔴 |
| Motorizados - Q58 | $664 | $739 | $784 | $1,124 | $937 | $646 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | $826 | $843 | $830 | $1,347 | 🔴 |
| Domiciliarios VIDEO - API | $680 | $578 | $650 | $400 | $730 | $779 | 🟡 |
| Domiciliarios INTER - API | $339 | $327 | $311 | $365 | $413 | $365 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | $360 | $424 | $417 | $412 | 🟡 |
| Motorizados - API | $697 | $997 | $517 | $647 | $555 | $783 | 🔴 |
| TEST Creativos - API | $716 | $1,259 | $581 | $780 | $647 | $1,040 | 🔴 |
| RADIO - Fincas | $756 | $609 | $1,208 | $1,266 | $1,413 | $1,526 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.81 | 1.60 | 2.48 | 2.74 | 2.85 | 1.73 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | 1.41 | 1.59 | 1.66 | 1.46 | 🟡 |
| Domiciliarios - API | 10.08 | 8.89 | 7.43 | 5.75 | 8.87 | 8.01 | 🟡 |
| Domiciliarios - Expancion - Q58 | 9.76 | 13.35 | 6.40 | 8.62 | 9.06 | 8.90 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.47 | 2.37 | 3.09 | 4.08 | 4.04 | 🟡 |
| RADIO - Moteros | 2.70 | 2.81 | 2.29 | 2.38 | 1.22 | 3.48 | 🟢 |
| Motorizados - INTER | 11.41 | 11.01 | 8.75 | 9.23 | 8.40 | 12.20 | 🟢 |
| Domiciliarios Q58 - | 2.14 | 1.78 | 2.38 | 3.34 | 3.65 | 3.92 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.61 | 3.27 | 2.99 | 3.48 | 3.42 | 2.73 | 🔴 |
| Motorizados - Q58 | 3.74 | 3.51 | 2.76 | 2.29 | 2.72 | 4.79 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | 4.87 | 4.88 | 4.80 | 3.44 | 🔴 |
| Domiciliarios VIDEO - API | 8.19 | 9.22 | 7.40 | 10.25 | 5.61 | 6.88 | 🟢 |
| Domiciliarios INTER - API | 9.66 | 10.56 | 7.01 | 8.15 | 7.24 | 10.40 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | 7.59 | 7.44 | 7.37 | 9.90 | 🟢 |
| Motorizados - API | 8.35 | 5.71 | 10.36 | 7.87 | 8.86 | 7.24 | 🔴 |
| TEST Creativos - API | 9.48 | 4.74 | 9.15 | 8.35 | 8.07 | 5.86 | 🔴 |
| RADIO - Fincas | 5.76 | 7.92 | 2.55 | 3.24 | 2.61 | 3.08 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-18 | $491,703 | 674 | $730 | $3,893 | 5.34 | $590,238 |
| 2026-11-19 | $396,366 | 543 | $730 | $3,642 | 4.99 | $475,287 |
| 2026-11-20 | $404,941 | 543 | $746 | $3,732 | 5.00 | $466,712 |
| 2026-11-21 | $415,924 | 584 | $712 | $3,109 | 4.37 | $521,544 |
| 2026-11-22 | $596,839 | 823 | $725 | $3,464 | 4.78 | $724,285 |
| 2026-11-23 | $569,662 | 780 | $730 | $3,414 | 4.67 | $682,436 |

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
