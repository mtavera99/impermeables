# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-31 15:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$226,209** |
| gastado hoy (hasta las 15h) | $195,516 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $380,342 |
| saldo proyectado a medianoche | $41,383 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $233,195 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-27 | $208,400 | 461 | **$452** | $3,772 | 8.34 |
| 2026-10-28 | $216,455 | 396 | **$547** | $3,715 | 6.80 |
| 2026-10-29 | $275,759 | 520 | **$530** | $3,524 | 6.64 |
| 2026-10-30 | $200,831 | 377 | **$533** | $4,022 | 7.55 |
| 2026-10-31 **HOY** | $195,516 | 360 | **$543** | $4,386 | 8.08 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($543 vs $533).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   543  =  $ 4,386  ÷  8.08
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,386 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.08 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $17,790 | 44% | 20 | $890 | 6.14 |
| Domiciliarios - API | $35,000 | $16,659 | 48% | 37 | $450 | 12.47 |
| Domiciliarios - Expancion - API | $30,000 | $15,469 | 52% | 39 | $397 | 13.33 |
| RADIO - Moteros | $35,000 | $14,789 | 42% | 4 | $3,697 | 1.15 |
| Domiciliarios VIDEO INTER - API | $36,000 | $14,569 | 40% | 32 | $455 | 9.70 |
| Domiciliarios - Expancion - Q58 | $29,000 | $12,818 | 44% | 39 | $329 | 8.27 |
| Motorizados - INTER | $25,000 | $12,061 | 48% | 21 | $574 | 12.70 |
| Domiciliarios VIDEO Q58 - | $25,000 | $11,965 | 48% | 16 | $748 | 5.25 |
| RADIO - Fincas | $20,000 | $11,222 | 56% | 9 | $1,247 | 4.03 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,148 | 45% | 17 | $656 | 5.28 |
| Motorizados - Q58 | $29,000 | $10,764 | 37% | 13 | $828 | 3.78 |
| Domiciliarios INTER - API | $20,000 | $10,227 | 51% | 27 | $379 | 10.56 |
| Domiciliarios VIDEO - API | $20,000 | $9,917 | 50% | 33 | $301 | 12.93 |
| TEST Creativos - API | $20,000 | $8,952 | 45% | 20 | $448 | 8.79 |
| Motorizados - API | $20,000 | $8,522 | 43% | 21 | $406 | 11.36 |
| RADIO - Broad | $10,000 | $4,368 | 44% | 4 | $1,092 | 6.97 |
| Domiciliarios Q58 - | $25,000 | $4,276 | 17% | 8 | $534 | 15.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $195,516 | 360 | **$543** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,983**/pedido |
| utilidad estimada de lo que va del día | **$382,375** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,000 | $1,001 | $736 | $770 | $1,075 | $890 | 🟢 |
| Domiciliarios - API | $459 | $371 | $379 | $543 | $452 | $450 | 🟡 |
| Domiciliarios - Expancion - API | $576 | $671 | $746 | $466 | $657 | $397 | 🟢 |
| RADIO - Moteros | $1,068 | $1,162 | $1,514 | $1,349 | $1,060 | $3,697 | 🔴 |
| Domiciliarios VIDEO INTER - API | $519 | $642 | $547 | $500 | $701 | $455 | 🟢 |
| Domiciliarios - Expancion - Q58 | $241 | $250 | $326 | $252 | $266 | $329 | 🔴 |
| Motorizados - INTER | $543 | $532 | $547 | $496 | $868 | $574 | 🟢 |
| Domiciliarios VIDEO Q58 - | $870 | $691 | $913 | $733 | $585 | $748 | 🔴 |
| RADIO - Fincas | $707 | $751 | $752 | $1,545 | $1,150 | $1,247 | 🟡 |
| Domiciliarios - Expancion - INTER | $747 | $499 | $643 | $685 | $557 | $656 | 🔴 |
| Motorizados - Q58 | $769 | $607 | $631 | $633 | $616 | $828 | 🔴 |
| Domiciliarios INTER - API | $332 | $319 | $322 | $322 | $295 | $379 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $308 | $355 | $423 | $415 | $301 | 🟢 |
| TEST Creativos - API | $490 | $387 | $574 | $508 | $726 | $448 | 🟢 |
| Motorizados - API | $426 | $359 | $459 | $524 | $565 | $406 | 🟢 |
| RADIO - Broad | — | $1,440 | $1,612 | $1,310 | $1,800 | $1,092 | 🟢 |
| Domiciliarios Q58 - | $211 | $202 | $199 | $193 | $183 | $534 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 4.36 | 5.10 | 6.39 | 6.46 | 4.31 | 6.14 | 🟢 |
| Domiciliarios - API | 9.11 | 13.28 | 12.74 | 7.95 | 11.27 | 12.47 | 🟢 |
| Domiciliarios - Expancion - API | 7.03 | 6.89 | 5.97 | 8.78 | 7.64 | 13.33 | 🟢 |
| RADIO - Moteros | 3.02 | 3.39 | 2.80 | 3.09 | 3.72 | 1.15 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.12 | 7.83 | 8.47 | 8.21 | 7.31 | 9.70 | 🟢 |
| Domiciliarios - Expancion - Q58 | 9.37 | 10.69 | 7.51 | 9.44 | 10.68 | 8.27 | 🔴 |
| Motorizados - INTER | 10.17 | 13.22 | 11.22 | 10.87 | 8.39 | 12.70 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.70 | 5.31 | 4.28 | 5.08 | 7.07 | 5.25 | 🔴 |
| RADIO - Fincas | 5.16 | 5.51 | 4.83 | 2.47 | 3.85 | 4.03 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.66 | 5.15 | 4.81 | 4.37 | 6.18 | 5.28 | 🟡 |
| Motorizados - Q58 | 4.17 | 4.49 | 3.47 | 4.69 | 4.93 | 3.78 | 🔴 |
| Domiciliarios INTER - API | 7.76 | 8.52 | 9.99 | 10.96 | 13.58 | 10.56 | 🔴 |
| Domiciliarios VIDEO - API | 7.54 | 12.62 | 10.10 | 7.78 | 8.39 | 12.93 | 🟢 |
| TEST Creativos - API | 9.25 | 12.47 | 6.05 | 6.13 | 4.34 | 8.79 | 🟢 |
| Motorizados - API | 8.76 | 12.17 | 9.23 | 7.42 | 7.66 | 11.36 | 🟢 |
| RADIO - Broad | — | 4.76 | 3.50 | 5.18 | 4.50 | 6.97 | 🟢 |
| Domiciliarios Q58 - | 9.12 | 10.98 | 10.83 | 10.39 | 13.30 | 15.07 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $407,467 | 721 | $565 | $4,177 | 7.39 | $749,921 |

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
