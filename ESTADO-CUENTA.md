# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-01 11:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$81,991** |
| gastado hoy (hasta las 11h) | $118,886 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $405,294 |
| saldo proyectado a medianoche | $-204,418 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $454,043 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-28 | $132,284 | 245 | **$540** | $3,723 | 6.89 |
| 2026-10-29 | $180,883 | 335 | **$540** | $3,437 | 6.37 |
| 2026-10-30 | $119,324 | 217 | **$550** | $4,001 | 7.28 |
| 2026-10-31 | $137,715 | 251 | **$549** | $4,381 | 7.99 |
| 2026-11-01 **HOY** | $118,886 | 216 | **$550** | $3,940 | 7.16 |

🟠 Hoy va 0% más caro que ayer a la misma hora ($550 vs $549).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   550  =  $ 3,940  ÷  7.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,940 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.16 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $11,451 | 29% | 15 | $763 | 5.91 |
| Domiciliarios - API | $35,000 | $10,532 | 30% | 26 | $405 | 14.93 |
| Domiciliarios VIDEO INTER - API | $36,000 | $10,226 | 28% | 6 | $1,704 | 2.64 |
| Motorizados - Q58 | $29,000 | $10,034 | 35% | 18 | $557 | 4.85 |
| RADIO - Moteros | $35,000 | $9,520 | 27% | 11 | $865 | 4.42 |
| Domiciliarios - Expancion - Q58 | $29,000 | $9,265 | 32% | 38 | $244 | 9.98 |
| Domiciliarios - Expancion - API | $30,000 | $8,161 | 27% | 13 | $628 | 10.21 |
| Motorizados - INTER | $25,000 | $6,619 | 26% | 18 | $368 | 18.27 |
| Domiciliarios - Expancion - INTER | $25,000 | $6,388 | 26% | 11 | $581 | 5.23 |
| Domiciliarios INTER - API | $20,000 | $5,817 | 29% | 17 | $342 | 10.44 |
| Motorizados - API | $20,000 | $5,814 | 29% | 14 | $415 | 11.00 |
| Domiciliarios VIDEO - API | $20,000 | $5,757 | 29% | 8 | $720 | 4.42 |
| Domiciliarios VIDEO Q58 - | $25,000 | $5,701 | 23% | 9 | $633 | 5.61 |
| TEST Creativos - API | $20,000 | $4,376 | 22% | 10 | $438 | 8.58 |
| RADIO - Fincas | $20,000 | $4,124 | 21% | 1 | $4,124 | 1.09 |
| RADIO - Broad | $10,000 | $3,291 | 33% | 1 | $3,291 | 1.71 |
| Domiciliarios Q58 - | $25,000 | $1,810 | 7% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $118,886 | 216 | **$550** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,118**/pedido |
| utilidad estimada de lo que va del día | **$227,849** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,001 | $736 | $770 | $1,078 | $828 | $763 | 🟢 |
| Domiciliarios - API | $371 | $379 | $543 | $452 | $439 | $405 | 🟢 |
| Domiciliarios VIDEO INTER - API | $642 | $547 | $500 | $702 | $520 | $1,704 | 🔴 |
| Motorizados - Q58 | $607 | $631 | $633 | $616 | $738 | $557 | 🟢 |
| RADIO - Moteros | $1,162 | $1,514 | $1,349 | $1,068 | $1,783 | $865 | 🟢 |
| Domiciliarios - Expancion - Q58 | $250 | $326 | $252 | $267 | $267 | $244 | 🟢 |
| Domiciliarios - Expancion - API | $671 | $746 | $466 | $657 | $552 | $628 | 🟡 |
| Motorizados - INTER | $532 | $547 | $496 | $869 | $539 | $368 | 🟢 |
| Domiciliarios - Expancion - INTER | $499 | $643 | $685 | $557 | $1,062 | $581 | 🟢 |
| Domiciliarios INTER - API | $319 | $322 | $322 | $295 | $461 | $342 | 🟢 |
| Motorizados - API | $359 | $459 | $524 | $566 | $497 | $415 | 🟢 |
| Domiciliarios VIDEO - API | $308 | $355 | $423 | $415 | $340 | $720 | 🔴 |
| Domiciliarios VIDEO Q58 - | $691 | $913 | $733 | $586 | $843 | $633 | 🟢 |
| TEST Creativos - API | $387 | $574 | $508 | $726 | $541 | $438 | 🟢 |
| RADIO - Fincas | $751 | $752 | $1,545 | $1,153 | $945 | $4,124 | 🔴 |
| RADIO - Broad | $1,440 | $1,612 | $1,310 | $1,802 | $1,660 | $3,291 | 🔴 |
| Domiciliarios Q58 - | $202 | $199 | $193 | $183 | $1,927 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 5.10 | 6.39 | 6.46 | 4.30 | 6.05 | 5.91 | 🟡 |
| Domiciliarios - API | 13.28 | 12.74 | 7.95 | 11.25 | 11.55 | 14.93 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.83 | 8.47 | 8.21 | 7.31 | 8.50 | 2.64 | 🔴 |
| Motorizados - Q58 | 4.49 | 3.47 | 4.69 | 4.92 | 3.40 | 4.85 | 🟢 |
| RADIO - Moteros | 3.39 | 2.80 | 3.09 | 3.71 | 2.25 | 4.42 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.69 | 7.51 | 9.44 | 10.66 | 10.22 | 9.98 | 🟡 |
| Domiciliarios - Expancion - API | 6.89 | 5.97 | 8.78 | 7.64 | 9.45 | 10.21 | 🟢 |
| Motorizados - INTER | 13.22 | 11.22 | 10.87 | 8.38 | 13.20 | 18.27 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.15 | 4.81 | 4.37 | 6.17 | 2.69 | 5.23 | 🟢 |
| Domiciliarios INTER - API | 8.52 | 9.99 | 10.96 | 13.57 | 8.58 | 10.44 | 🟢 |
| Motorizados - API | 12.17 | 9.23 | 7.42 | 7.66 | 8.58 | 11.00 | 🟢 |
| Domiciliarios VIDEO - API | 12.62 | 10.10 | 7.78 | 8.38 | 9.71 | 4.42 | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.31 | 4.28 | 5.08 | 7.07 | 4.17 | 5.61 | 🟢 |
| TEST Creativos - API | 12.47 | 6.05 | 6.13 | 4.34 | 6.22 | 8.58 | 🟢 |
| RADIO - Fincas | 5.51 | 4.83 | 2.47 | 3.84 | 4.80 | 1.09 | 🔴 |
| RADIO - Broad | 4.76 | 3.50 | 5.18 | 4.49 | 4.89 | 1.71 | 🔴 |
| Domiciliarios Q58 - | 10.98 | 10.83 | 10.39 | 13.30 | 3.00 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $421,776 | 694 | $608 | $4,033 | 6.64 | $692,270 |

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
