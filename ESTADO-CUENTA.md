# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-31 20:11 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$264,505** |
| gastado hoy (hasta las 20h) | $356,027 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $408,251 |
| saldo proyectado a medianoche | $212,281 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $34,388 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-27 | $355,301 | 760 | **$468** | $3,885 | 8.31 |
| 2026-10-28 | $378,212 | 678 | **$558** | $3,709 | 6.65 |
| 2026-10-29 | $387,593 | 759 | **$511** | $3,629 | 7.11 |
| 2026-10-30 | $354,617 | 637 | **$557** | $4,140 | 7.44 |
| 2026-10-31 **HOY** | $356,027 | 596 | **$597** | $4,299 | 7.20 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($597 vs $557).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   597  =  $ 4,299  ÷  7.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,299 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.20 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $31,010 | 78% | 39 | $795 | 6.38 |
| Domiciliarios - API | $35,000 | $28,669 | 82% | 61 | $470 | 11.08 |
| Domiciliarios - Expancion - API | $30,000 | $26,422 | 88% | 53 | $499 | 10.54 |
| RADIO - Moteros | $35,000 | $25,893 | 74% | 13 | $1,992 | 2.09 |
| Domiciliarios - Expancion - Q58 | $29,000 | $24,223 | 84% | 87 | $278 | 9.86 |
| Domiciliarios VIDEO INTER - API | $36,000 | $24,206 | 67% | 45 | $538 | 8.26 |
| Domiciliarios Q58 - | $25,000 | $22,269 | 89% | 11 | $2,024 | 3.81 |
| Motorizados - Q58 | $29,000 | $20,606 | 71% | 26 | $793 | 3.57 |
| RADIO - Fincas | $20,000 | $20,525 | 103% | 21 | $977 | 4.83 |
| Motorizados - INTER | $25,000 | $20,252 | 81% | 39 | $519 | 14.57 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,143 | 81% | 25 | $806 | 4.86 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,657 | 75% | 20 | $933 | 3.68 |
| Domiciliarios INTER - API | $20,000 | $17,790 | 89% | 39 | $456 | 8.68 |
| Domiciliarios VIDEO - API | $20,000 | $16,395 | 82% | 50 | $328 | 10.87 |
| TEST Creativos - API | $20,000 | $16,002 | 80% | 30 | $533 | 6.88 |
| Motorizados - API | $20,000 | $15,482 | 77% | 33 | $469 | 9.33 |
| RADIO - Broad | $10,000 | $7,483 | 75% | 4 | $1,871 | 4.46 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $356,027 | 596 | **$597** | $2,402 | **25%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,981**/pedido |
| utilidad estimada de lo que va del día | **$600,704** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,000 | $1,001 | $736 | $770 | $1,078 | $795 | 🟢 |
| Domiciliarios - API | $459 | $371 | $379 | $543 | $452 | $470 | 🟡 |
| Domiciliarios - Expancion - API | $576 | $671 | $746 | $466 | $657 | $499 | 🟢 |
| RADIO - Moteros | $1,068 | $1,162 | $1,514 | $1,349 | $1,062 | $1,992 | 🔴 |
| Domiciliarios - Expancion - Q58 | $241 | $250 | $326 | $252 | $267 | $278 | 🟡 |
| Domiciliarios VIDEO INTER - API | $519 | $642 | $547 | $500 | $702 | $538 | 🟢 |
| Domiciliarios Q58 - | $211 | $202 | $199 | $193 | $183 | $2,024 | 🔴 |
| Motorizados - Q58 | $769 | $607 | $631 | $633 | $616 | $793 | 🔴 |
| RADIO - Fincas | $707 | $751 | $752 | $1,545 | $1,152 | $977 | 🟢 |
| Motorizados - INTER | $543 | $532 | $547 | $496 | $869 | $519 | 🟢 |
| Domiciliarios VIDEO Q58 - | $870 | $691 | $913 | $733 | $586 | $806 | 🔴 |
| Domiciliarios - Expancion - INTER | $747 | $499 | $643 | $685 | $557 | $933 | 🔴 |
| Domiciliarios INTER - API | $332 | $319 | $322 | $322 | $295 | $456 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $308 | $355 | $423 | $415 | $328 | 🟢 |
| TEST Creativos - API | $490 | $387 | $574 | $508 | $726 | $533 | 🟢 |
| Motorizados - API | $426 | $359 | $459 | $524 | $566 | $469 | 🟢 |
| RADIO - Broad | — | $1,440 | $1,612 | $1,310 | $1,802 | $1,871 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 4.36 | 5.10 | 6.39 | 6.46 | 4.30 | 6.38 | 🟢 |
| Domiciliarios - API | 9.11 | 13.28 | 12.74 | 7.95 | 11.25 | 11.08 | 🟡 |
| Domiciliarios - Expancion - API | 7.03 | 6.89 | 5.97 | 8.78 | 7.64 | 10.54 | 🟢 |
| RADIO - Moteros | 3.02 | 3.39 | 2.80 | 3.09 | 3.71 | 2.09 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.37 | 10.69 | 7.51 | 9.44 | 10.66 | 9.86 | 🟡 |
| Domiciliarios VIDEO INTER - API | 8.12 | 7.83 | 8.47 | 8.21 | 7.31 | 8.26 | 🟢 |
| Domiciliarios Q58 - | 9.12 | 10.98 | 10.83 | 10.39 | 13.30 | 3.81 | 🔴 |
| Motorizados - Q58 | 4.17 | 4.49 | 3.47 | 4.69 | 4.92 | 3.57 | 🔴 |
| RADIO - Fincas | 5.16 | 5.51 | 4.83 | 2.47 | 3.84 | 4.83 | 🟢 |
| Motorizados - INTER | 10.17 | 13.22 | 11.22 | 10.87 | 8.38 | 14.57 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.70 | 5.31 | 4.28 | 5.08 | 7.07 | 4.86 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.66 | 5.15 | 4.81 | 4.37 | 6.17 | 3.68 | 🔴 |
| Domiciliarios INTER - API | 7.76 | 8.52 | 9.99 | 10.96 | 13.57 | 8.68 | 🔴 |
| Domiciliarios VIDEO - API | 7.54 | 12.62 | 10.10 | 7.78 | 8.38 | 10.87 | 🟢 |
| TEST Creativos - API | 9.25 | 12.47 | 6.05 | 6.13 | 4.34 | 6.88 | 🟢 |
| Motorizados - API | 8.76 | 12.17 | 9.23 | 7.42 | 7.66 | 9.33 | 🟢 |
| RADIO - Broad | — | 4.76 | 3.50 | 5.18 | 4.49 | 4.46 | 🟡 |

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
| 2026-10-30 | $407,883 | 721 | $566 | $4,177 | 7.38 | $749,505 |

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
