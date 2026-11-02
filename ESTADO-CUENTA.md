# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-02 18:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$141,919** |
| gastado hoy (hasta las 18h) | $400,132 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $525,082 |
| saldo proyectado a medianoche | $16,969 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $112,869 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-29 | $335,101 | 637 | **$526** | $3,588 | 6.82 |
| 2026-10-30 | $280,037 | 515 | **$544** | $4,074 | 7.49 |
| 2026-10-31 | $325,769 | 531 | **$614** | $4,314 | 7.03 |
| 2026-11-01 | $304,227 | 536 | **$568** | $4,045 | 7.13 |
| 2026-11-02 **HOY** | $400,132 | 653 | **$613** | $3,021 | 4.93 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($613 vs $568).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   613  =  $ 3,021  ÷  4.93
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,021 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.93 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $34,971 | 87% | 23 | $1,520 | 1.93 |
| RADIO - Moteros | $35,000 | $32,750 | 94% | 17 | $1,926 | 1.85 |
| Domiciliarios VIDEO INTER - API | $36,000 | $30,719 | 85% | 45 | $683 | 4.88 |
| Domiciliarios Q58 - | $25,000 | $29,934 | 120% | 22 | $1,361 | 3.18 |
| Domiciliarios - API | $35,000 | $29,721 | 85% | 51 | $583 | 7.20 |
| Motorizados - Q58 | $29,000 | $28,401 | 98% | 33 | $861 | 2.45 |
| Domiciliarios - Expancion - INTER | $25,000 | $24,935 | 100% | 40 | $623 | 3.61 |
| Domiciliarios - Expancion - API | $30,000 | $24,757 | 83% | 59 | $420 | 10.63 |
| Domiciliarios - Expancion - Q58 | $29,000 | $24,116 | 83% | 104 | $232 | 7.36 |
| Domiciliarios INTER - API | $20,000 | $21,069 | 105% | 59 | $357 | 7.15 |
| RADIO - Fincas | $20,000 | $20,200 | 101% | 22 | $918 | 4.44 |
| Motorizados - INTER | $25,000 | $19,470 | 78% | 38 | $512 | 9.55 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,468 | 78% | 17 | $1,145 | 2.26 |
| Domiciliarios VIDEO - API | $20,000 | $17,819 | 89% | 59 | $302 | 7.08 |
| Motorizados - API | $20,000 | $17,085 | 85% | 30 | $570 | 6.78 |
| TEST Creativos - API | $20,000 | $16,249 | 81% | 30 | $542 | 6.05 |
| RADIO - Broad | $10,000 | $8,468 | 85% | 7 | $1,210 | 4.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $400,132 | 656 | **$610** | $2,402 | **25%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,212**/pedido |
| utilidad estimada de lo que va del día | **$652,915** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $736 | $770 | $1,078 | $833 | $883 | $1,520 | 🔴 |
| RADIO - Moteros | $1,514 | $1,349 | $1,068 | $1,791 | $1,422 | $1,926 | 🔴 |
| Domiciliarios VIDEO INTER - API | $547 | $500 | $702 | $521 | $723 | $683 | 🟢 |
| Domiciliarios Q58 - | $199 | $193 | $183 | $1,927 | $1,379 | $1,361 | 🟡 |
| Domiciliarios - API | $379 | $543 | $452 | $439 | $541 | $583 | 🟡 |
| Motorizados - Q58 | $631 | $633 | $616 | $738 | $628 | $861 | 🔴 |
| Domiciliarios - Expancion - INTER | $643 | $685 | $557 | $1,062 | $810 | $623 | 🟢 |
| Domiciliarios - Expancion - API | $746 | $466 | $657 | $553 | $650 | $420 | 🟢 |
| Domiciliarios - Expancion - Q58 | $326 | $252 | $267 | $268 | $253 | $232 | 🟢 |
| Domiciliarios INTER - API | $322 | $322 | $295 | $462 | $284 | $357 | 🔴 |
| RADIO - Fincas | $752 | $1,545 | $1,153 | $945 | $1,119 | $918 | 🟢 |
| Motorizados - INTER | $547 | $496 | $869 | $539 | $494 | $512 | 🟡 |
| Domiciliarios VIDEO Q58 - | $913 | $733 | $586 | $843 | $678 | $1,145 | 🔴 |
| Domiciliarios VIDEO - API | $355 | $423 | $415 | $340 | $412 | $302 | 🟢 |
| Motorizados - API | $459 | $524 | $566 | $497 | $479 | $570 | 🔴 |
| TEST Creativos - API | $574 | $508 | $726 | $541 | $623 | $542 | 🟢 |
| RADIO - Broad | $1,612 | $1,310 | $1,802 | $1,668 | $1,112 | $1,210 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 6.39 | 6.46 | 4.30 | 6.02 | 5.10 | 1.93 | 🔴 |
| RADIO - Moteros | 2.80 | 3.09 | 3.71 | 2.24 | 3.20 | 1.85 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.47 | 8.21 | 7.31 | 8.48 | 6.37 | 4.88 | 🔴 |
| Domiciliarios Q58 - | 10.83 | 10.39 | 13.30 | 2.99 | 4.94 | 3.18 | 🔴 |
| Domiciliarios - API | 12.74 | 7.95 | 11.25 | 11.52 | 9.95 | 7.20 | 🔴 |
| Motorizados - Q58 | 3.47 | 4.69 | 4.92 | 3.40 | 4.26 | 2.45 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.81 | 4.37 | 6.17 | 2.69 | 3.86 | 3.61 | 🟡 |
| Domiciliarios - Expancion - API | 5.97 | 8.78 | 7.64 | 9.43 | 8.85 | 10.63 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.51 | 9.44 | 10.66 | 10.19 | 9.73 | 7.36 | 🔴 |
| Domiciliarios INTER - API | 9.99 | 10.96 | 13.57 | 8.56 | 12.61 | 7.15 | 🔴 |
| RADIO - Fincas | 4.83 | 2.47 | 3.84 | 4.77 | 4.17 | 4.44 | 🟢 |
| Motorizados - INTER | 11.22 | 10.87 | 8.38 | 13.19 | 14.23 | 9.55 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.28 | 5.08 | 7.07 | 4.16 | 5.10 | 2.26 | 🔴 |
| Domiciliarios VIDEO - API | 10.10 | 7.78 | 8.38 | 9.68 | 7.93 | 7.08 | 🟡 |
| Motorizados - API | 9.23 | 7.42 | 7.66 | 8.55 | 9.33 | 6.78 | 🔴 |
| TEST Creativos - API | 6.05 | 6.13 | 4.34 | 6.22 | 6.27 | 6.05 | 🟡 |
| RADIO - Broad | 3.50 | 5.18 | 4.49 | 4.87 | 6.67 | 4.80 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,080 | 7.02 | $805,851 |

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
