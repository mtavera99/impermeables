# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-29 22:08 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$162,780** |
| gastado hoy (hasta las 22h) | $404,227 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $413,353 |
| saldo proyectado a medianoche | $153,654 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🟠 Recargar $65,033 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-25 | $392,941 | 852 | **$461** | $3,555 | 7.71 |
| 2026-10-26 | $478,058 | 998 | **$479** | $3,296 | 6.88 |
| 2026-10-27 | $391,568 | 850 | **$461** | $3,871 | 8.40 |
| 2026-10-28 | $426,988 | 790 | **$540** | $3,714 | 6.87 |
| 2026-10-29 **HOY** | $404,752 | 812 | **$498** | $3,637 | 7.30 |

🟢 **Hoy va mejor que ayer a la misma hora** ($498 vs $540).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   498  =  $ 3,637  ÷  7.30
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,637 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.30 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $43,876 | 110% | 37 | $1,186 | 5.61 |
| Domiciliarios - API | $35,000 | $30,782 | 88% | 54 | $570 | 7.46 |
| Domiciliarios VIDEO INTER - API | $30,000 | $28,792 | 96% | 55 | $523 | 7.83 |
| Domiciliarios - Expancion - API | $30,000 | $27,893 | 93% | 60 | $465 | 8.63 |
| Domiciliarios Q58 - | $25,000 | $25,584 | 102% | 134 | $191 | 10.43 |
| RADIO - Seguridad / Negocios | $25,000 | $25,307 | 101% | 34 | $744 | 6.60 |
| Domiciliarios VIDEO Q58 - | $25,000 | $24,364 | 97% | 35 | $696 | 5.33 |
| Domiciliarios - Expancion - Q58 | $24,000 | $23,876 | 99% | 95 | $251 | 9.36 |
| Motorizados - INTER | $25,000 | $23,634 | 95% | 47 | $503 | 10.70 |
| Domiciliarios - Expancion - INTER | $25,000 | $23,142 | 93% | 34 | $681 | 4.43 |
| Domiciliarios VIDEO - API | $20,000 | $19,042 | 95% | 45 | $423 | 7.71 |
| TEST Creativos - API | $20,000 | $18,810 | 94% | 38 | $495 | 6.35 |
| Domiciliarios INTER - API | $20,000 | $18,715 | 94% | 57 | $328 | 10.68 |
| RADIO - Moteros | $20,000 | $18,351 | 92% | 15 | $1,223 | 3.43 |
| Motorizados - Q58 | $24,000 | $18,054 | 75% | 29 | $623 | 4.75 |
| Motorizados - API | $20,000 | $17,387 | 87% | 34 | $511 | 7.59 |
| RADIO - Fincas | $20,000 | $17,111 | 86% | 10 | $1,711 | 2.19 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $404,720 | 813 | **$498** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,151**/pedido |
| utilidad estimada de lo que va del día | **$900,352** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | $1,440 | $1,612 | $1,186 | 🟢 |
| Domiciliarios - API | $489 | $434 | $459 | $371 | $379 | $572 | 🔴 |
| Domiciliarios VIDEO INTER - API | $490 | $661 | $519 | $642 | $547 | $523 | 🟡 |
| Domiciliarios - Expancion - API | $691 | $518 | $576 | $671 | $746 | $465 | 🟢 |
| Domiciliarios Q58 - | $204 | $185 | $211 | $202 | $199 | $191 | 🟡 |
| RADIO - Seguridad / Negocios | $1,170 | $750 | $1,000 | $1,001 | $736 | $744 | 🟡 |
| Domiciliarios VIDEO Q58 - | $795 | $829 | $870 | $691 | $913 | $696 | 🟢 |
| Domiciliarios - Expancion - Q58 | $876 | $286 | $241 | $250 | $326 | $251 | 🟢 |
| Motorizados - INTER | $595 | $838 | $543 | $532 | $547 | $503 | 🟢 |
| Domiciliarios - Expancion - INTER | $594 | $526 | $747 | $499 | $643 | $681 | 🟡 |
| Domiciliarios VIDEO - API | $383 | $332 | $389 | $308 | $355 | $423 | 🔴 |
| TEST Creativos - API | $395 | $526 | $490 | $387 | $574 | $496 | 🟢 |
| Domiciliarios INTER - API | $462 | $366 | $332 | $319 | $322 | $328 | 🟡 |
| RADIO - Moteros | $919 | $926 | $1,068 | $1,162 | $1,514 | $1,223 | 🟢 |
| Motorizados - Q58 | $547 | $836 | $769 | $607 | $631 | $627 | 🟡 |
| Motorizados - API | $436 | $431 | $426 | $359 | $459 | $512 | 🟡 |
| RADIO - Fincas | $630 | $434 | $707 | $751 | $751 | $1,711 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | 4.76 | 3.50 | 5.61 | 🟢 |
| Domiciliarios - API | 8.16 | 10.50 | 9.11 | 13.28 | 12.74 | 7.44 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.56 | 6.02 | 8.12 | 7.83 | 8.47 | 7.83 | 🟡 |
| Domiciliarios - Expancion - API | 5.47 | 8.50 | 7.03 | 6.89 | 5.97 | 8.63 | 🟢 |
| Domiciliarios Q58 - | 10.24 | 11.43 | 9.12 | 10.98 | 10.83 | 10.43 | 🟡 |
| RADIO - Seguridad / Negocios | 4.13 | 5.50 | 4.36 | 5.10 | 6.39 | 6.60 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.11 | 4.81 | 3.70 | 5.31 | 4.28 | 5.33 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.47 | 8.73 | 9.37 | 10.69 | 7.51 | 9.36 | 🟢 |
| Motorizados - INTER | 8.89 | 6.52 | 10.17 | 13.22 | 11.22 | 10.70 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.70 | 5.97 | 3.66 | 5.15 | 4.81 | 4.43 | 🟡 |
| Domiciliarios VIDEO - API | 7.54 | 9.93 | 7.54 | 12.62 | 10.10 | 7.71 | 🔴 |
| TEST Creativos - API | 8.50 | 6.95 | 9.25 | 12.47 | 6.05 | 6.33 | 🟡 |
| Domiciliarios INTER - API | 6.56 | 8.11 | 7.76 | 8.52 | 9.99 | 10.68 | 🟢 |
| RADIO - Moteros | 5.63 | 4.15 | 3.02 | 3.39 | 2.80 | 3.43 | 🟢 |
| Motorizados - Q58 | 5.28 | 3.66 | 4.17 | 4.49 | 3.47 | 4.72 | 🟢 |
| Motorizados - API | 8.65 | 9.54 | 8.76 | 12.17 | 9.23 | 7.56 | 🔴 |
| RADIO - Fincas | 8.62 | 9.35 | 5.16 | 5.51 | 4.84 | 2.19 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,486 | 819 | $535 | $3,719 | 6.95 | $876,217 |

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
