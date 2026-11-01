# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-01 09:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$116,646** |
| gastado hoy (hasta las 9h) | $84,515 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $409,018 |
| saldo proyectado a medianoche | $-207,858 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $453,759 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-28 | $91,984 | 181 | **$508** | $3,689 | 7.26 |
| 2026-10-29 | $138,210 | 254 | **$544** | $3,344 | 6.14 |
| 2026-10-30 | $80,198 | 162 | **$495** | $3,990 | 8.06 |
| 2026-10-31 | $100,338 | 200 | **$502** | $4,340 | 8.65 |
| 2026-11-01 **HOY** | $84,515 | 145 | **$583** | $3,783 | 6.49 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($583 vs $502).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   583  =  $ 3,783  ÷  6.49
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,783 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.49 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $29,000 | $7,904 | 27% | 13 | $608 | 4.38 |
| RADIO - Seguridad / Negocios | $40,000 | $7,744 | 19% | 10 | $774 | 5.53 |
| Domiciliarios - API | $35,000 | $7,522 | 21% | 15 | $501 | 11.57 |
| Domiciliarios VIDEO INTER - API | $36,000 | $7,382 | 21% | 3 | $2,461 | 1.72 |
| Domiciliarios - Expancion - Q58 | $29,000 | $6,726 | 23% | 28 | $240 | 10.03 |
| Domiciliarios - Expancion - API | $30,000 | $6,310 | 21% | 9 | $701 | 9.14 |
| RADIO - Moteros | $35,000 | $6,273 | 18% | 6 | $1,046 | 3.10 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,688 | 19% | 6 | $781 | 3.91 |
| Domiciliarios INTER - API | $20,000 | $4,616 | 23% | 15 | $308 | 11.79 |
| Domiciliarios VIDEO - API | $20,000 | $4,544 | 23% | 7 | $649 | 4.95 |
| Motorizados - INTER | $25,000 | $4,466 | 18% | 11 | $406 | 15.92 |
| Motorizados - API | $20,000 | $4,244 | 21% | 9 | $472 | 9.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $3,246 | 13% | 5 | $649 | 5.34 |
| RADIO - Broad | $10,000 | $2,820 | 28% | 1 | $2,820 | 1.99 |
| RADIO - Fincas | $20,000 | $2,772 | 14% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $2,566 | 13% | 6 | $428 | 9.20 |
| Domiciliarios Q58 - | $25,000 | $692 | 3% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $84,515 | 144 | **$587** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,789**/pedido |
| utilidad estimada de lo que va del día | **$146,642** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | $607 | $631 | $633 | $616 | $737 | $608 | 🟢 |
| RADIO - Seguridad / Negocios | $1,001 | $736 | $770 | $1,078 | $826 | $774 | 🟢 |
| Domiciliarios - API | $371 | $379 | $543 | $452 | $439 | $501 | 🟡 |
| Domiciliarios VIDEO INTER - API | $642 | $547 | $500 | $702 | $520 | $2,461 | 🔴 |
| Domiciliarios - Expancion - Q58 | $250 | $326 | $252 | $267 | $267 | $240 | 🟢 |
| Domiciliarios - Expancion - API | $671 | $746 | $466 | $657 | $551 | $701 | 🔴 |
| RADIO - Moteros | $1,162 | $1,514 | $1,349 | $1,068 | $1,781 | $1,046 | 🟢 |
| Domiciliarios - Expancion - INTER | $499 | $643 | $685 | $557 | $1,062 | $781 | 🟢 |
| Domiciliarios INTER - API | $319 | $322 | $322 | $295 | $460 | $308 | 🟢 |
| Domiciliarios VIDEO - API | $308 | $355 | $423 | $415 | $340 | $649 | 🔴 |
| Motorizados - INTER | $532 | $547 | $496 | $869 | $539 | $406 | 🟢 |
| Motorizados - API | $359 | $459 | $524 | $566 | $497 | $472 | 🟢 |
| Domiciliarios VIDEO Q58 - | $691 | $913 | $733 | $586 | $843 | $649 | 🟢 |
| RADIO - Broad | $1,440 | $1,612 | $1,310 | $1,802 | $1,659 | $2,820 | 🔴 |
| RADIO - Fincas | $751 | $752 | $1,545 | $1,153 | $945 | — | 🟢 |
| TEST Creativos - API | $387 | $574 | $508 | $726 | $541 | $428 | 🟢 |
| Domiciliarios Q58 - | $202 | $199 | $193 | $183 | $1,927 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | 4.49 | 3.47 | 4.69 | 4.92 | 3.40 | 4.38 | 🟢 |
| RADIO - Seguridad / Negocios | 5.10 | 6.39 | 6.46 | 4.30 | 6.06 | 5.53 | 🟡 |
| Domiciliarios - API | 13.28 | 12.74 | 7.95 | 11.25 | 11.57 | 11.57 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.83 | 8.47 | 8.21 | 7.31 | 8.51 | 1.72 | 🔴 |
| Domiciliarios - Expancion - Q58 | 10.69 | 7.51 | 9.44 | 10.66 | 10.24 | 10.03 | 🟡 |
| Domiciliarios - Expancion - API | 6.89 | 5.97 | 8.78 | 7.64 | 9.47 | 9.14 | 🟡 |
| RADIO - Moteros | 3.39 | 2.80 | 3.09 | 3.71 | 2.25 | 3.10 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.15 | 4.81 | 4.37 | 6.17 | 2.69 | 3.91 | 🟢 |
| Domiciliarios INTER - API | 8.52 | 9.99 | 10.96 | 13.57 | 8.59 | 11.79 | 🟢 |
| Domiciliarios VIDEO - API | 12.62 | 10.10 | 7.78 | 8.38 | 9.72 | 4.95 | 🔴 |
| Motorizados - INTER | 13.22 | 11.22 | 10.87 | 8.38 | 13.22 | 15.92 | 🟢 |
| Motorizados - API | 12.17 | 9.23 | 7.42 | 7.66 | 8.59 | 9.00 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.31 | 4.28 | 5.08 | 7.07 | 4.17 | 5.34 | 🟢 |
| RADIO - Broad | 4.76 | 3.50 | 5.18 | 4.49 | 4.89 | 1.99 | 🔴 |
| RADIO - Fincas | 5.51 | 4.83 | 2.47 | 3.84 | 4.82 | — | 🟢 |
| TEST Creativos - API | 12.47 | 6.05 | 6.13 | 4.34 | 6.22 | 9.20 | 🟢 |
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
| 2026-10-31 | $421,463 | 694 | $607 | $4,036 | 6.65 | $692,583 |

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
