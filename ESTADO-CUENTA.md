# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-24 20:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$170,652** |
| gastado hoy (hasta las 20h) | $366,723 |
| presupuesto activo | $483,000/día |
| cierre proyectado del día | $436,789 |
| saldo proyectado a medianoche | $100,586 |
| objetivo (cubrir un día de 143% + colchón) | $710,690 |

### 🟠 Recargar $173,315 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-20 | $346,239 | 457 | **$758** | $3,846 | 5.08 |
| 2026-11-21 | $356,743 | 491 | **$727** | $3,423 | 4.71 |
| 2026-11-22 | $515,499 | 713 | **$723** | $3,568 | 4.94 |
| 2026-11-23 | $510,941 | 676 | **$756** | $3,434 | 4.54 |
| 2026-11-24 **HOY** | $366,723 | 407 | **$901** | $4,218 | 4.68 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($901 vs $756).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   901  =  $ 4,218  ÷  4.68
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,218 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.68 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $34,820 | 73% | 17 | $2,048 | 2.17 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $33,359 | 69% | 10 | $3,336 | 1.05 |
| Domiciliarios - Expancion - Q58 | $30,000 | $27,338 | 91% | 61 | $448 | 7.46 |
| Domiciliarios - API | $35,000 | $25,311 | 72% | 28 | $904 | 6.65 |
| Motorizados - INTER | $30,000 | $23,882 | 80% | 40 | $597 | 10.45 |
| Domiciliarios VIDEO Q58 - | $30,000 | $23,869 | 80% | 22 | $1,085 | 3.81 |
| Domiciliarios Q58 - | $25,000 | $22,262 | 89% | 18 | $1,237 | 3.44 |
| RADIO - Moteros | $25,000 | $21,857 | 87% | 12 | $1,821 | 3.17 |
| Domiciliarios - Expancion - INTER | $30,000 | $20,793 | 69% | 19 | $1,094 | 2.53 |
| Motorizados - Q58 | $29,000 | $19,875 | 69% | 23 | $864 | 3.73 |
| Domiciliarios INTER - API | $25,000 | $18,961 | 76% | 47 | $403 | 8.96 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $24,000 | $18,060 | 75% | 11 | $1,642 | 2.75 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $20,000 | $17,865 | 89% | 45 | $397 | 9.45 |
| Domiciliarios VIDEO - API | $24,000 | $17,409 | 73% | 20 | $870 | 6.17 |
| Motorizados - API | $20,000 | $13,746 | 69% | 17 | $809 | 6.39 |
| TEST Creativos - API | $20,000 | $13,736 | 69% | 10 | $1,374 | 4.68 |
| RADIO - Fincas | $20,000 | $13,580 | 68% | 7 | $1,940 | 2.46 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $366,723 | 407 | **$901** | $2,402 | **38%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$16,563**/pedido |
| utilidad estimada de lo que va del día | **$286,615** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,121 | $2,176 | $1,409 | $1,314 | $1,159 | $2,048 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | $1,296 | $1,461 | $1,586 | $3,336 | 🔴 |
| Domiciliarios - Expancion - Q58 | $326 | $240 | $362 | $346 | $319 | $448 | 🔴 |
| Domiciliarios - API | $659 | $663 | $830 | $919 | $604 | $904 | 🔴 |
| Motorizados - INTER | $475 | $515 | $519 | $582 | $627 | $597 | 🟡 |
| Domiciliarios VIDEO Q58 - | $891 | $1,035 | $949 | $1,017 | $759 | $1,085 | 🔴 |
| Domiciliarios Q58 - | $1,133 | $1,364 | $1,112 | $1,005 | $982 | $1,237 | 🔴 |
| RADIO - Moteros | $1,834 | $1,894 | $1,934 | $2,147 | $4,327 | $1,821 | 🟢 |
| Domiciliarios - Expancion - INTER | $728 | $633 | $661 | $712 | $668 | $1,094 | 🔴 |
| Motorizados - Q58 | $664 | $739 | $784 | $1,124 | $937 | $864 | 🟢 |
| Domiciliarios INTER - API | $339 | $327 | $311 | $365 | $413 | $403 | 🟡 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | $826 | $843 | $830 | $1,642 | 🔴 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | $360 | $424 | $418 | $397 | 🟡 |
| Domiciliarios VIDEO - API | $680 | $578 | $650 | $400 | $730 | $870 | 🔴 |
| Motorizados - API | $697 | $997 | $517 | $647 | $555 | $809 | 🔴 |
| TEST Creativos - API | $716 | $1,259 | $581 | $780 | $647 | $1,374 | 🔴 |
| RADIO - Fincas | $756 | $609 | $1,208 | $1,266 | $1,413 | $1,940 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.81 | 1.60 | 2.48 | 2.74 | 2.85 | 2.17 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | 1.41 | 1.59 | 1.66 | 1.05 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.76 | 13.35 | 6.40 | 8.62 | 9.06 | 7.46 | 🔴 |
| Domiciliarios - API | 10.08 | 8.89 | 7.43 | 5.75 | 8.87 | 6.65 | 🔴 |
| Motorizados - INTER | 11.41 | 11.01 | 8.75 | 9.23 | 8.40 | 10.45 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.47 | 2.37 | 3.09 | 4.08 | 3.81 | 🟡 |
| Domiciliarios Q58 - | 2.14 | 1.78 | 2.38 | 3.34 | 3.65 | 3.44 | 🟡 |
| RADIO - Moteros | 2.70 | 2.81 | 2.29 | 2.38 | 1.22 | 3.17 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.61 | 3.27 | 2.99 | 3.48 | 3.42 | 2.53 | 🔴 |
| Motorizados - Q58 | 3.74 | 3.51 | 2.76 | 2.29 | 2.72 | 3.73 | 🟢 |
| Domiciliarios INTER - API | 9.66 | 10.56 | 7.01 | 8.15 | 7.23 | 8.96 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | 4.87 | 4.88 | 4.80 | 2.75 | 🔴 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | 7.59 | 7.44 | 7.37 | 9.45 | 🟢 |
| Domiciliarios VIDEO - API | 8.19 | 9.22 | 7.40 | 10.25 | 5.60 | 6.17 | 🟢 |
| Motorizados - API | 8.35 | 5.71 | 10.36 | 7.87 | 8.85 | 6.39 | 🔴 |
| TEST Creativos - API | 9.48 | 4.74 | 9.15 | 8.35 | 8.07 | 4.68 | 🔴 |
| RADIO - Fincas | 5.76 | 7.92 | 2.55 | 3.24 | 2.61 | 2.46 | 🟡 |

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
| 2026-11-23 | $569,733 | 780 | $730 | $3,414 | 4.67 | $682,365 |

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
