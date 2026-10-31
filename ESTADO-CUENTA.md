# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-31 01:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$219,141** |
| gastado hoy (hasta las 1h) | $7,844 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $424,195 |
| saldo proyectado a medianoche | $-197,210 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $427,935 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-27 | $7,518 | 21 | **$358** | $3,914 | 10.93 |
| 2026-10-28 | $4,034 | 9 | **$448** | $4,030 | 8.99 |
| 2026-10-29 | $5,626 | 12 | **$469** | $3,634 | 7.75 |
| 2026-10-30 | $3,522 | 8 | **$440** | $3,638 | 8.26 |
| 2026-10-31 **HOY** | $7,844 | 21 | **$374** | $4,622 | 12.37 |

🟢 **Hoy va mejor que ayer a la misma hora** ($374 vs $440).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   374  =  $ 4,622  ÷  12.37
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,622 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 12.37 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $967 | 3% | 4 | $242 | 17.32 |
| Motorizados - Q58 | $29,000 | $768 | 3% | 1 | $768 | 5.32 |
| RADIO - Moteros | $35,000 | $744 | 2% | 1 | $744 | 6.17 |
| RADIO - Seguridad / Negocios | $40,000 | $725 | 2% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $712 | 2% | 3 | $237 | 24.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $701 | 3% | 1 | $701 | 5.62 |
| Domiciliarios - Expancion - API | $30,000 | $648 | 2% | 4 | $162 | 41.67 |
| Domiciliarios INTER - API | $20,000 | $528 | 3% | 1 | $528 | 6.58 |
| Motorizados - API | $20,000 | $500 | 2% | 1 | $500 | 9.09 |
| Domiciliarios VIDEO - API | $20,000 | $407 | 2% | 1 | $407 | 9.43 |
| Motorizados - INTER | $25,000 | $268 | 1% | 1 | $268 | 34.48 |
| Domiciliarios VIDEO Q58 - | $25,000 | $250 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $235 | 1% | 3 | $78 | 47.62 |
| TEST Creativos - API | $20,000 | $135 | 1% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $134 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $122 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,844 | 21 | **$374** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,866**/pedido |
| utilidad estimada de lo que va del día | **$25,866** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $519 | $642 | $547 | $500 | $695 | $242 | 🟢 |
| Motorizados - Q58 | $769 | $607 | $631 | $633 | $611 | $768 | 🔴 |
| RADIO - Moteros | $1,068 | $1,162 | $1,514 | $1,349 | $1,048 | $744 | 🟢 |
| RADIO - Seguridad / Negocios | $1,000 | $1,001 | $736 | $770 | $1,059 | — | 🔴 |
| Domiciliarios - API | $459 | $371 | $379 | $543 | $448 | $237 | 🟢 |
| Domiciliarios - Expancion - INTER | $747 | $499 | $643 | $685 | $554 | $701 | 🔴 |
| Domiciliarios - Expancion - API | $576 | $671 | $746 | $466 | $650 | $162 | 🟢 |
| Domiciliarios INTER - API | $332 | $319 | $322 | $322 | $293 | $528 | 🔴 |
| Motorizados - API | $426 | $359 | $459 | $524 | $557 | $500 | 🟢 |
| Domiciliarios VIDEO - API | $389 | $308 | $355 | $423 | $411 | $407 | 🟡 |
| Motorizados - INTER | $543 | $532 | $547 | $496 | $858 | $268 | 🟢 |
| Domiciliarios VIDEO Q58 - | $870 | $691 | $913 | $733 | $582 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | $241 | $250 | $326 | $252 | $263 | $78 | 🟢 |
| TEST Creativos - API | $490 | $387 | $574 | $508 | $724 | — | 🔴 |
| RADIO - Broad | — | $1,440 | $1,612 | $1,309 | $1,780 | — | 🔴 |
| RADIO - Fincas | $707 | $751 | $752 | $1,545 | $1,118 | — | 🟢 |
| Domiciliarios Q58 - | $211 | $202 | $199 | $193 | $181 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 8.12 | 7.83 | 8.47 | 8.21 | 7.40 | 17.32 | 🟢 |
| Motorizados - Q58 | 4.17 | 4.49 | 3.47 | 4.69 | 4.95 | 5.32 | 🟢 |
| RADIO - Moteros | 3.02 | 3.39 | 2.80 | 3.09 | 3.75 | 6.17 | 🟢 |
| RADIO - Seguridad / Negocios | 4.36 | 5.10 | 6.39 | 6.46 | 4.38 | — | 🔴 |
| Domiciliarios - API | 9.11 | 13.28 | 12.74 | 7.95 | 11.38 | 24.00 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.66 | 5.15 | 4.81 | 4.37 | 6.22 | 5.62 | 🟡 |
| Domiciliarios - Expancion - API | 7.03 | 6.89 | 5.97 | 8.78 | 7.73 | 41.67 | 🟢 |
| Domiciliarios INTER - API | 7.76 | 8.52 | 9.99 | 10.96 | 13.66 | 6.58 | 🔴 |
| Motorizados - API | 8.76 | 12.17 | 9.23 | 7.42 | 7.74 | 9.09 | 🟢 |
| Domiciliarios VIDEO - API | 7.54 | 12.62 | 10.10 | 7.78 | 8.49 | 9.43 | 🟢 |
| Motorizados - INTER | 10.17 | 13.22 | 11.22 | 10.87 | 8.50 | 34.48 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.70 | 5.31 | 4.28 | 5.08 | 7.13 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 9.37 | 10.69 | 7.51 | 9.44 | 10.82 | 47.62 | 🟢 |
| TEST Creativos - API | 9.25 | 12.47 | 6.05 | 6.13 | 4.35 | — | 🔴 |
| RADIO - Broad | — | 4.76 | 3.50 | 5.18 | 4.53 | — | 🟡 |
| RADIO - Fincas | 5.16 | 5.51 | 4.83 | 2.47 | 3.96 | — | 🟢 |
| Domiciliarios Q58 - | 9.12 | 10.98 | 10.83 | 10.39 | 13.39 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,718 | 870 | $504 | $3,673 | 7.28 | $957,853 |
| 2026-10-30 | $403,132 | 721 | $559 | $4,175 | 7.47 | $754,256 |

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
