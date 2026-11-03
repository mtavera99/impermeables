# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-02 19:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$112,593** |
| gastado hoy (hasta las 19h) | $428,014 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $513,548 |
| saldo proyectado a medianoche | $27,058 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $114,313 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-29 | $361,415 | 703 | **$514** | $3,605 | 7.01 |
| 2026-10-30 | $318,193 | 577 | **$551** | $4,117 | 7.47 |
| 2026-10-31 | $365,701 | 597 | **$613** | $4,248 | 6.94 |
| 2026-11-01 | $343,126 | 608 | **$564** | $4,061 | 7.20 |
| 2026-11-02 **HOY** | $428,014 | 702 | **$610** | $3,025 | 4.96 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($610 vs $564).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   610  =  $ 3,025  ÷  4.96
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,025 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.96 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $37,321 | 93% | 25 | $1,493 | 1.97 |
| RADIO - Moteros | $35,000 | $35,267 | 101% | 17 | $2,075 | 1.67 |
| Domiciliarios VIDEO INTER - API | $36,000 | $32,861 | 91% | 51 | $644 | 5.27 |
| Domiciliarios - API | $35,000 | $31,968 | 91% | 54 | $592 | 7.07 |
| Domiciliarios Q58 - | $25,000 | $31,393 | 126% | 22 | $1,427 | 3.00 |
| Motorizados - Q58 | $29,000 | $29,644 | 102% | 36 | $823 | 2.53 |
| Domiciliarios - Expancion - API | $30,000 | $27,047 | 90% | 59 | $458 | 9.81 |
| Domiciliarios - Expancion - INTER | $25,000 | $26,022 | 104% | 44 | $591 | 3.75 |
| Domiciliarios - Expancion - Q58 | $29,000 | $26,003 | 90% | 110 | $236 | 7.26 |
| RADIO - Fincas | $20,000 | $22,399 | 112% | 25 | $896 | 4.50 |
| Domiciliarios INTER - API | $20,000 | $22,176 | 111% | 62 | $358 | 7.14 |
| Motorizados - INTER | $25,000 | $20,995 | 84% | 38 | $552 | 8.86 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,898 | 84% | 22 | $950 | 2.73 |
| Domiciliarios VIDEO - API | $20,000 | $18,906 | 95% | 62 | $305 | 7.15 |
| Motorizados - API | $20,000 | $18,380 | 92% | 33 | $557 | 7.00 |
| TEST Creativos - API | $20,000 | $17,606 | 88% | 32 | $550 | 5.96 |
| RADIO - Broad | $10,000 | $9,128 | 91% | 8 | $1,141 | 5.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $428,014 | 700 | **$611** | $2,402 | **25%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,240**/pedido |
| utilidad estimada de lo que va del día | **$695,664** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $736 | $770 | $1,078 | $833 | $883 | $1,493 | 🔴 |
| RADIO - Moteros | $1,514 | $1,349 | $1,068 | $1,791 | $1,422 | $2,075 | 🔴 |
| Domiciliarios VIDEO INTER - API | $547 | $500 | $702 | $521 | $723 | $644 | 🟢 |
| Domiciliarios - API | $379 | $543 | $452 | $439 | $541 | $592 | 🟡 |
| Domiciliarios Q58 - | $199 | $193 | $183 | $1,927 | $1,379 | $1,427 | 🟡 |
| Motorizados - Q58 | $631 | $633 | $616 | $738 | $628 | $823 | 🔴 |
| Domiciliarios - Expancion - API | $746 | $466 | $657 | $553 | $650 | $458 | 🟢 |
| Domiciliarios - Expancion - INTER | $643 | $685 | $557 | $1,062 | $810 | $591 | 🟢 |
| Domiciliarios - Expancion - Q58 | $326 | $252 | $267 | $268 | $253 | $236 | 🟢 |
| RADIO - Fincas | $752 | $1,545 | $1,153 | $945 | $1,119 | $896 | 🟢 |
| Domiciliarios INTER - API | $322 | $322 | $295 | $462 | $284 | $358 | 🔴 |
| Motorizados - INTER | $547 | $496 | $869 | $539 | $494 | $552 | 🟡 |
| Domiciliarios VIDEO Q58 - | $913 | $733 | $586 | $843 | $678 | $950 | 🔴 |
| Domiciliarios VIDEO - API | $355 | $423 | $415 | $340 | $412 | $305 | 🟢 |
| Motorizados - API | $459 | $524 | $566 | $497 | $479 | $557 | 🔴 |
| TEST Creativos - API | $574 | $508 | $726 | $541 | $623 | $550 | 🟢 |
| RADIO - Broad | $1,612 | $1,310 | $1,802 | $1,668 | $1,112 | $1,141 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 6.39 | 6.46 | 4.30 | 6.02 | 5.10 | 1.97 | 🔴 |
| RADIO - Moteros | 2.80 | 3.09 | 3.71 | 2.24 | 3.20 | 1.67 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.47 | 8.21 | 7.31 | 8.48 | 6.37 | 5.27 | 🔴 |
| Domiciliarios - API | 12.74 | 7.95 | 11.25 | 11.52 | 9.95 | 7.07 | 🔴 |
| Domiciliarios Q58 - | 10.83 | 10.39 | 13.30 | 2.99 | 4.94 | 3.00 | 🔴 |
| Motorizados - Q58 | 3.47 | 4.69 | 4.92 | 3.40 | 4.26 | 2.53 | 🔴 |
| Domiciliarios - Expancion - API | 5.97 | 8.78 | 7.64 | 9.43 | 8.85 | 9.81 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.81 | 4.37 | 6.17 | 2.69 | 3.86 | 3.75 | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.51 | 9.44 | 10.66 | 10.19 | 9.72 | 7.26 | 🔴 |
| RADIO - Fincas | 4.83 | 2.47 | 3.84 | 4.77 | 4.17 | 4.50 | 🟢 |
| Domiciliarios INTER - API | 9.99 | 10.96 | 13.57 | 8.56 | 12.61 | 7.14 | 🔴 |
| Motorizados - INTER | 11.22 | 10.87 | 8.38 | 13.19 | 14.23 | 8.86 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.28 | 5.08 | 7.07 | 4.16 | 5.10 | 2.73 | 🔴 |
| Domiciliarios VIDEO - API | 10.10 | 7.78 | 8.38 | 9.68 | 7.93 | 7.15 | 🟡 |
| Motorizados - API | 9.23 | 7.42 | 7.66 | 8.55 | 9.33 | 7.00 | 🔴 |
| TEST Creativos - API | 6.05 | 6.13 | 4.34 | 6.22 | 6.27 | 5.96 | 🟡 |
| RADIO - Broad | 3.50 | 5.18 | 4.49 | 4.87 | 6.67 | 5.05 | 🔴 |

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
