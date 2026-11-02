# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-02 09:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$0** |
| gastado hoy (hasta las 8h) | $141,644 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $500,668 |
| saldo proyectado a medianoche | $-359,024 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $513,276 — entra en zona de freno a las 9:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-29 | $114,782 | 211 | **$544** | $3,281 | 6.03 |
| 2026-10-30 | $63,005 | 129 | **$488** | $4,008 | 8.21 |
| 2026-10-31 | $82,040 | 168 | **$488** | $4,334 | 8.88 |
| 2026-11-01 | $79,809 | 135 | **$591** | $3,743 | 6.33 |
| 2026-11-02 **HOY** | $141,644 | 222 | **$638** | $3,111 | 4.88 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($638 vs $591).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   638  =  $ 3,111  ÷  4.88
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,111 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.88 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $14,254 | 36% | 8 | $1,782 | 1.63 |
| Domiciliarios VIDEO INTER - API | $36,000 | $13,685 | 38% | 16 | $855 | 3.83 |
| RADIO - Moteros | $35,000 | $12,082 | 35% | 8 | $1,510 | 2.56 |
| Domiciliarios - API | $35,000 | $11,557 | 33% | 22 | $525 | 8.12 |
| Motorizados - Q58 | $29,000 | $10,194 | 35% | 13 | $784 | 3.00 |
| Domiciliarios INTER - API | $20,000 | $10,119 | 51% | 24 | $422 | 6.20 |
| Domiciliarios Q58 - | $25,000 | $8,998 | 36% | 5 | $1,800 | 2.58 |
| Domiciliarios - Expancion - API | $30,000 | $8,744 | 29% | 16 | $546 | 8.13 |
| Domiciliarios VIDEO - API | $20,000 | $8,686 | 43% | 27 | $322 | 6.94 |
| Domiciliarios - Expancion - Q58 | $29,000 | $7,966 | 27% | 34 | $234 | 7.16 |
| Domiciliarios - Expancion - INTER | $25,000 | $7,394 | 30% | 6 | $1,232 | 2.16 |
| Motorizados - API | $20,000 | $6,409 | 32% | 12 | $534 | 7.67 |
| TEST Creativos - API | $20,000 | $5,860 | 29% | 15 | $391 | 9.29 |
| RADIO - Fincas | $20,000 | $4,610 | 23% | 2 | $2,305 | 1.89 |
| Motorizados - INTER | $25,000 | $4,455 | 18% | 8 | $557 | 9.29 |
| RADIO - Broad | $10,000 | $3,502 | 35% | 4 | $876 | 6.56 |
| Domiciliarios VIDEO Q58 - | $25,000 | $3,129 | 13% | 5 | $626 | 3.69 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $141,644 | 225 | **$630** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,572**/pedido |
| utilidad estimada de lo que va del día | **$219,538** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $736 | $770 | $1,078 | $833 | $883 | $1,782 | 🔴 |
| Domiciliarios VIDEO INTER - API | $547 | $500 | $702 | $521 | $723 | $855 | 🔴 |
| RADIO - Moteros | $1,514 | $1,349 | $1,068 | $1,791 | $1,422 | $1,510 | 🟡 |
| Domiciliarios - API | $379 | $543 | $452 | $439 | $541 | $525 | 🟡 |
| Motorizados - Q58 | $631 | $633 | $616 | $738 | $628 | $784 | 🔴 |
| Domiciliarios INTER - API | $322 | $322 | $295 | $462 | $284 | $422 | 🔴 |
| Domiciliarios Q58 - | $199 | $193 | $183 | $1,927 | $1,379 | $1,800 | 🔴 |
| Domiciliarios - Expancion - API | $746 | $466 | $657 | $553 | $650 | $546 | 🟢 |
| Domiciliarios VIDEO - API | $355 | $423 | $415 | $340 | $412 | $322 | 🟢 |
| Domiciliarios - Expancion - Q58 | $326 | $252 | $267 | $268 | $253 | $234 | 🟢 |
| Domiciliarios - Expancion - INTER | $643 | $685 | $557 | $1,062 | $810 | $1,232 | 🔴 |
| Motorizados - API | $459 | $524 | $566 | $497 | $479 | $534 | 🟡 |
| TEST Creativos - API | $574 | $508 | $726 | $541 | $623 | $391 | 🟢 |
| RADIO - Fincas | $752 | $1,545 | $1,153 | $945 | $1,119 | $2,305 | 🔴 |
| Motorizados - INTER | $547 | $496 | $869 | $539 | $494 | $557 | 🟡 |
| RADIO - Broad | $1,612 | $1,310 | $1,802 | $1,668 | $1,112 | $876 | 🟢 |
| Domiciliarios VIDEO Q58 - | $913 | $733 | $586 | $843 | $678 | $626 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 6.39 | 6.46 | 4.30 | 6.02 | 5.15 | 1.63 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.47 | 8.21 | 7.31 | 8.48 | 6.41 | 3.83 | 🔴 |
| RADIO - Moteros | 2.80 | 3.09 | 3.71 | 2.24 | 3.22 | 2.56 | 🔴 |
| Domiciliarios - API | 12.74 | 7.95 | 11.25 | 11.52 | 10.01 | 8.12 | 🔴 |
| Motorizados - Q58 | 3.47 | 4.69 | 4.92 | 3.40 | 4.28 | 3.00 | 🔴 |
| Domiciliarios INTER - API | 9.99 | 10.96 | 13.57 | 8.56 | 12.66 | 6.20 | 🔴 |
| Domiciliarios Q58 - | 10.83 | 10.39 | 13.30 | 2.99 | 4.96 | 2.58 | 🔴 |
| Domiciliarios - Expancion - API | 5.97 | 8.78 | 7.64 | 9.43 | 8.90 | 8.13 | 🟡 |
| Domiciliarios VIDEO - API | 10.10 | 7.78 | 8.38 | 9.68 | 7.96 | 6.94 | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.51 | 9.44 | 10.66 | 10.19 | 9.80 | 7.16 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.81 | 4.37 | 6.17 | 2.69 | 3.87 | 2.16 | 🔴 |
| Motorizados - API | 9.23 | 7.42 | 7.66 | 8.55 | 9.37 | 7.67 | 🔴 |
| TEST Creativos - API | 6.05 | 6.13 | 4.34 | 6.22 | 6.27 | 9.29 | 🟢 |
| RADIO - Fincas | 4.83 | 2.47 | 3.84 | 4.77 | 4.22 | 1.89 | 🔴 |
| Motorizados - INTER | 11.22 | 10.87 | 8.38 | 13.19 | 14.32 | 9.29 | 🔴 |
| RADIO - Broad | 3.50 | 5.18 | 4.49 | 4.87 | 6.72 | 6.56 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.28 | 5.08 | 7.07 | 4.16 | 5.14 | 3.69 | 🔴 |

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
| 2026-11-01 | $457,484 | 787 | $581 | $4,104 | 7.06 | $805,851 |

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
