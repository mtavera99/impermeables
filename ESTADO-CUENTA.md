# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-24 19:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$217,028** |
| gastado hoy (hasta las 19h) | $318,802 |
| presupuesto activo | $483,000/día |
| cierre proyectado del día | $431,016 |
| saldo proyectado a medianoche | $104,814 |
| objetivo (cubrir un día de 143% + colchón) | $710,690 |

### 🟠 Recargar $174,860 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-20 | $306,117 | 405 | **$756** | $3,875 | 5.13 |
| 2026-11-21 | $322,096 | 439 | **$734** | $3,675 | 5.01 |
| 2026-11-22 | $469,141 | 632 | **$742** | $3,585 | 4.83 |
| 2026-11-23 | $472,978 | 629 | **$752** | $3,438 | 4.57 |
| 2026-11-24 **HOY** | $318,802 | 365 | **$873** | $4,293 | 4.91 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($873 vs $752).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   873  =  $ 4,293  ÷  4.91
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,293 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.91 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $30,704 | 64% | 13 | $2,362 | 1.91 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $29,093 | 61% | 10 | $2,909 | 1.23 |
| Domiciliarios - Expancion - Q58 | $30,000 | $23,296 | 78% | 52 | $448 | 7.67 |
| Domiciliarios - API | $35,000 | $22,941 | 66% | 28 | $819 | 7.74 |
| Domiciliarios VIDEO Q58 - | $30,000 | $20,884 | 70% | 20 | $1,044 | 4.02 |
| RADIO - Moteros | $25,000 | $20,079 | 80% | 12 | $1,673 | 3.58 |
| Motorizados - INTER | $30,000 | $19,847 | 66% | 37 | $536 | 11.71 |
| Domiciliarios Q58 - | $25,000 | $19,521 | 78% | 18 | $1,084 | 3.94 |
| Domiciliarios - Expancion - INTER | $30,000 | $18,068 | 60% | 17 | $1,063 | 2.63 |
| Motorizados - Q58 | $29,000 | $16,271 | 56% | 22 | $740 | 4.24 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $24,000 | $15,995 | 67% | 11 | $1,454 | 3.15 |
| Domiciliarios INTER - API | $25,000 | $15,861 | 63% | 38 | $417 | 8.89 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $20,000 | $15,465 | 77% | 38 | $407 | 9.48 |
| Domiciliarios VIDEO - API | $24,000 | $15,137 | 63% | 18 | $841 | 6.42 |
| Motorizados - API | $20,000 | $12,189 | 61% | 15 | $813 | 6.55 |
| TEST Creativos - API | $20,000 | $11,901 | 60% | 9 | $1,322 | 4.80 |
| RADIO - Fincas | $20,000 | $11,550 | 58% | 7 | $1,650 | 2.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $318,802 | 365 | **$873** | $2,402 | **36%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$16,056**/pedido |
| utilidad estimada de lo que va del día | **$267,116** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,121 | $2,176 | $1,409 | $1,314 | $1,159 | $2,362 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | $1,296 | $1,461 | $1,586 | $2,909 | 🔴 |
| Domiciliarios - Expancion - Q58 | $326 | $240 | $362 | $346 | $319 | $448 | 🔴 |
| Domiciliarios - API | $659 | $663 | $830 | $919 | $604 | $819 | 🔴 |
| Domiciliarios VIDEO Q58 - | $891 | $1,035 | $949 | $1,017 | $759 | $1,044 | 🔴 |
| RADIO - Moteros | $1,834 | $1,894 | $1,934 | $2,147 | $4,327 | $1,673 | 🟢 |
| Motorizados - INTER | $475 | $515 | $519 | $582 | $627 | $536 | 🟢 |
| Domiciliarios Q58 - | $1,133 | $1,364 | $1,112 | $1,005 | $982 | $1,084 | 🟡 |
| Domiciliarios - Expancion - INTER | $728 | $633 | $661 | $712 | $668 | $1,063 | 🔴 |
| Motorizados - Q58 | $664 | $739 | $784 | $1,124 | $937 | $740 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | $826 | $843 | $830 | $1,454 | 🔴 |
| Domiciliarios INTER - API | $339 | $327 | $311 | $365 | $413 | $417 | 🟡 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | $360 | $424 | $417 | $407 | 🟡 |
| Domiciliarios VIDEO - API | $680 | $578 | $650 | $400 | $730 | $841 | 🔴 |
| Motorizados - API | $697 | $997 | $517 | $647 | $555 | $813 | 🔴 |
| TEST Creativos - API | $716 | $1,259 | $581 | $780 | $647 | $1,322 | 🔴 |
| RADIO - Fincas | $756 | $609 | $1,208 | $1,266 | $1,413 | $1,650 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-19 | 11-20 | 11-21 | 11-22 | 11-23 | 11-24 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.81 | 1.60 | 2.48 | 2.74 | 2.85 | 1.91 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | 1.41 | 1.59 | 1.66 | 1.23 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.76 | 13.35 | 6.40 | 8.62 | 9.06 | 7.67 | 🔴 |
| Domiciliarios - API | 10.08 | 8.89 | 7.43 | 5.75 | 8.87 | 7.74 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.47 | 2.37 | 3.09 | 4.08 | 4.02 | 🟡 |
| RADIO - Moteros | 2.70 | 2.81 | 2.29 | 2.38 | 1.22 | 3.58 | 🟢 |
| Motorizados - INTER | 11.41 | 11.01 | 8.75 | 9.23 | 8.40 | 11.71 | 🟢 |
| Domiciliarios Q58 - | 2.14 | 1.78 | 2.38 | 3.34 | 3.65 | 3.94 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.61 | 3.27 | 2.99 | 3.48 | 3.42 | 2.63 | 🔴 |
| Motorizados - Q58 | 3.74 | 3.51 | 2.76 | 2.29 | 2.72 | 4.24 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | 4.87 | 4.88 | 4.80 | 3.15 | 🔴 |
| Domiciliarios INTER - API | 9.66 | 10.56 | 7.01 | 8.15 | 7.23 | 8.89 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | 7.59 | 7.44 | 7.37 | 9.48 | 🟢 |
| Domiciliarios VIDEO - API | 8.19 | 9.22 | 7.40 | 10.25 | 5.61 | 6.42 | 🟢 |
| Motorizados - API | 8.35 | 5.71 | 10.36 | 7.87 | 8.85 | 6.55 | 🔴 |
| TEST Creativos - API | 9.48 | 4.74 | 9.15 | 8.35 | 8.07 | 4.80 | 🔴 |
| RADIO - Fincas | 5.76 | 7.92 | 2.55 | 3.24 | 2.61 | 2.89 | 🟢 |

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
| 2026-11-23 | $569,708 | 780 | $730 | $3,414 | 4.67 | $682,390 |

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
