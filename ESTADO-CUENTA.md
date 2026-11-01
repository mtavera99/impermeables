# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-01 04:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$184,185** |
| gastado hoy (hasta las 4h) | $18,152 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $419,900 |
| saldo proyectado a medianoche | $-217,564 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $452,583 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–4:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-28 | $10,929 | 20 | **$546** | $4,194 | 7.67 |
| 2026-10-29 | $17,153 | 28 | **$613** | $3,571 | 5.83 |
| 2026-10-30 | $8,638 | 20 | **$432** | $3,468 | 8.03 |
| 2026-10-31 | $16,366 | 45 | **$364** | $4,429 | 12.18 |
| 2026-11-01 **HOY** | $18,152 | 42 | **$432** | $3,170 | 7.33 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($432 vs $364).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   432  =  $ 3,170  ÷  7.33
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,170 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.33 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $29,000 | $2,041 | 7% | 6 | $340 | 5.18 |
| RADIO - Moteros | $35,000 | $1,883 | 5% | 2 | $942 | 3.12 |
| Domiciliarios - API | $35,000 | $1,539 | 4% | 6 | $256 | 25.97 |
| Domiciliarios - Expancion - API | $30,000 | $1,419 | 5% | 3 | $473 | 13.76 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,357 | 5% | 1 | $1,357 | 1.79 |
| Domiciliarios - Expancion - Q58 | $29,000 | $1,322 | 5% | 7 | $189 | 12.64 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,304 | 4% | 1 | $1,304 | 2.81 |
| Motorizados - API | $20,000 | $1,133 | 6% | 2 | $566 | 7.66 |
| Domiciliarios INTER - API | $20,000 | $1,107 | 6% | 3 | $369 | 9.52 |
| RADIO - Seguridad / Negocios | $40,000 | $1,073 | 3% | 2 | $536 | 6.12 |
| Motorizados - INTER | $25,000 | $1,057 | 4% | 6 | $176 | 29.41 |
| Domiciliarios VIDEO - API | $20,000 | $839 | 4% | 1 | $839 | 3.70 |
| TEST Creativos - API | $20,000 | $769 | 4% | 1 | $769 | 4.63 |
| Domiciliarios VIDEO Q58 - | $25,000 | $568 | 2% | 1 | $568 | 3.91 |
| RADIO - Broad | $10,000 | $401 | 4% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $286 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $54 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $18,152 | 42 | **$432** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,945**/pedido |
| utilidad estimada de lo que va del día | **$49,269** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | $607 | $631 | $633 | $616 | $735 | $340 | 🟢 |
| RADIO - Moteros | $1,162 | $1,514 | $1,349 | $1,068 | $1,770 | $942 | 🟢 |
| Domiciliarios - API | $371 | $379 | $543 | $452 | $439 | $256 | 🟢 |
| Domiciliarios - Expancion - API | $671 | $746 | $466 | $657 | $550 | $473 | 🟢 |
| Domiciliarios - Expancion - INTER | $499 | $643 | $685 | $557 | $1,062 | $1,357 | 🔴 |
| Domiciliarios - Expancion - Q58 | $250 | $326 | $252 | $267 | $265 | $189 | 🟢 |
| Domiciliarios VIDEO INTER - API | $642 | $547 | $500 | $702 | $517 | $1,304 | 🔴 |
| Motorizados - API | $359 | $459 | $524 | $566 | $497 | $566 | 🟡 |
| Domiciliarios INTER - API | $319 | $322 | $322 | $295 | $459 | $369 | 🟢 |
| RADIO - Seguridad / Negocios | $1,001 | $736 | $770 | $1,078 | $819 | $536 | 🟢 |
| Motorizados - INTER | $532 | $547 | $496 | $869 | $539 | $176 | 🟢 |
| Domiciliarios VIDEO - API | $308 | $355 | $423 | $415 | $340 | $839 | 🔴 |
| TEST Creativos - API | $387 | $574 | $508 | $726 | $541 | $769 | 🔴 |
| Domiciliarios VIDEO Q58 - | $691 | $913 | $733 | $586 | $843 | $568 | 🟢 |
| RADIO - Broad | $1,440 | $1,612 | $1,310 | $1,802 | $1,657 | — | 🟢 |
| RADIO - Fincas | $751 | $752 | $1,545 | $1,153 | $943 | — | 🟢 |
| Domiciliarios Q58 - | $202 | $199 | $193 | $183 | $1,927 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-27 | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | 4.49 | 3.47 | 4.69 | 4.92 | 3.41 | 5.18 | 🟢 |
| RADIO - Moteros | 3.39 | 2.80 | 3.09 | 3.71 | 2.27 | 3.12 | 🟢 |
| Domiciliarios - API | 13.28 | 12.74 | 7.95 | 11.25 | 11.61 | 25.97 | 🟢 |
| Domiciliarios - Expancion - API | 6.89 | 5.97 | 8.78 | 7.64 | 9.50 | 13.76 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.15 | 4.81 | 4.37 | 6.17 | 2.70 | 1.79 | 🔴 |
| Domiciliarios - Expancion - Q58 | 10.69 | 7.51 | 9.44 | 10.66 | 10.31 | 12.64 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.83 | 8.47 | 8.21 | 7.31 | 8.54 | 2.81 | 🔴 |
| Motorizados - API | 12.17 | 9.23 | 7.42 | 7.66 | 8.64 | 7.66 | 🟡 |
| Domiciliarios INTER - API | 8.52 | 9.99 | 10.96 | 13.57 | 8.63 | 9.52 | 🟢 |
| RADIO - Seguridad / Negocios | 5.10 | 6.39 | 6.46 | 4.30 | 6.13 | 6.12 | 🟡 |
| Motorizados - INTER | 13.22 | 11.22 | 10.87 | 8.38 | 13.32 | 29.41 | 🟢 |
| Domiciliarios VIDEO - API | 12.62 | 10.10 | 7.78 | 8.38 | 9.74 | 3.70 | 🔴 |
| TEST Creativos - API | 12.47 | 6.05 | 6.13 | 4.34 | 6.22 | 4.63 | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.31 | 4.28 | 5.08 | 7.07 | 4.19 | 3.91 | 🟡 |
| RADIO - Broad | 4.76 | 3.50 | 5.18 | 4.49 | 4.91 | — | 🟢 |
| RADIO - Fincas | 5.51 | 4.83 | 2.47 | 3.84 | 4.90 | — | 🟢 |
| Domiciliarios Q58 - | 10.98 | 10.83 | 10.39 | 13.30 | 3.02 | — | 🔴 |

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
| 2026-10-31 | $420,421 | 694 | $606 | $4,046 | 6.68 | $693,625 |

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
