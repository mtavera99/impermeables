# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-02 17:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$171,430** |
| gastado hoy (hasta las 17h) | $369,688 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $532,290 |
| saldo proyectado a medianoche | $8,828 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $113,802 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-29 | $309,771 | 584 | **$530** | $3,568 | 6.73 |
| 2026-10-30 | $249,914 | 457 | **$547** | $4,055 | 7.41 |
| 2026-10-31 | $284,785 | 474 | **$601** | $4,367 | 7.27 |
| 2026-11-01 | $269,906 | 478 | **$565** | $4,020 | 7.12 |
| 2026-11-02 **HOY** | $369,688 | 599 | **$617** | $3,027 | 4.90 |

🟠 Hoy va 9% más caro que ayer a la misma hora ($617 vs $565).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   617  =  $ 3,027  ÷  4.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,027 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.90 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $32,468 | 81% | 23 | $1,412 | 2.08 |
| RADIO - Moteros | $35,000 | $29,319 | 84% | 17 | $1,725 | 2.13 |
| Domiciliarios VIDEO INTER - API | $36,000 | $28,899 | 80% | 39 | $741 | 4.44 |
| Domiciliarios - API | $35,000 | $28,043 | 80% | 48 | $584 | 7.24 |
| Domiciliarios Q58 - | $25,000 | $27,732 | 111% | 20 | $1,387 | 3.13 |
| Motorizados - Q58 | $29,000 | $26,690 | 92% | 30 | $890 | 2.43 |
| Domiciliarios - Expancion - INTER | $25,000 | $23,109 | 92% | 35 | $660 | 3.48 |
| Domiciliarios - Expancion - API | $30,000 | $22,995 | 77% | 55 | $418 | 10.65 |
| Domiciliarios - Expancion - Q58 | $29,000 | $22,463 | 77% | 96 | $234 | 7.27 |
| Domiciliarios INTER - API | $20,000 | $19,931 | 100% | 54 | $369 | 6.91 |
| Motorizados - INTER | $25,000 | $17,747 | 71% | 34 | $522 | 9.38 |
| Domiciliarios VIDEO Q58 - | $25,000 | $17,543 | 70% | 12 | $1,462 | 1.78 |
| RADIO - Fincas | $20,000 | $17,535 | 88% | 20 | $877 | 4.73 |
| Domiciliarios VIDEO - API | $20,000 | $16,898 | 84% | 57 | $296 | 7.11 |
| Motorizados - API | $20,000 | $15,544 | 78% | 24 | $648 | 5.87 |
| TEST Creativos - API | $20,000 | $15,265 | 76% | 30 | $509 | 6.46 |
| RADIO - Broad | $10,000 | $7,507 | 75% | 5 | $1,501 | 3.76 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $369,688 | 599 | **$617** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,345**/pedido |
| utilidad estimada de lo que va del día | **$591,859** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $736 | $770 | $1,078 | $833 | $883 | $1,412 | 🔴 |
| RADIO - Moteros | $1,514 | $1,349 | $1,068 | $1,791 | $1,422 | $1,725 | 🔴 |
| Domiciliarios VIDEO INTER - API | $547 | $500 | $702 | $521 | $723 | $741 | 🟡 |
| Domiciliarios - API | $379 | $543 | $452 | $439 | $541 | $584 | 🟡 |
| Domiciliarios Q58 - | $199 | $193 | $183 | $1,927 | $1,379 | $1,387 | 🟡 |
| Motorizados - Q58 | $631 | $633 | $616 | $738 | $628 | $890 | 🔴 |
| Domiciliarios - Expancion - INTER | $643 | $685 | $557 | $1,062 | $810 | $660 | 🟢 |
| Domiciliarios - Expancion - API | $746 | $466 | $657 | $553 | $650 | $418 | 🟢 |
| Domiciliarios - Expancion - Q58 | $326 | $252 | $267 | $268 | $253 | $234 | 🟢 |
| Domiciliarios INTER - API | $322 | $322 | $295 | $462 | $284 | $369 | 🔴 |
| Motorizados - INTER | $547 | $496 | $869 | $539 | $494 | $522 | 🟡 |
| Domiciliarios VIDEO Q58 - | $913 | $733 | $586 | $843 | $678 | $1,462 | 🔴 |
| RADIO - Fincas | $752 | $1,545 | $1,153 | $945 | $1,119 | $877 | 🟢 |
| Domiciliarios VIDEO - API | $355 | $423 | $415 | $340 | $412 | $296 | 🟢 |
| Motorizados - API | $459 | $524 | $566 | $497 | $479 | $648 | 🔴 |
| TEST Creativos - API | $574 | $508 | $726 | $541 | $623 | $509 | 🟢 |
| RADIO - Broad | $1,612 | $1,310 | $1,802 | $1,668 | $1,112 | $1,501 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-28 | 10-29 | 10-30 | 10-31 | 11-01 | 11-02 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 6.39 | 6.46 | 4.30 | 6.02 | 5.11 | 2.08 | 🔴 |
| RADIO - Moteros | 2.80 | 3.09 | 3.71 | 2.24 | 3.20 | 2.13 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.47 | 8.21 | 7.31 | 8.48 | 6.37 | 4.44 | 🔴 |
| Domiciliarios - API | 12.74 | 7.95 | 11.25 | 11.52 | 9.95 | 7.24 | 🔴 |
| Domiciliarios Q58 - | 10.83 | 10.39 | 13.30 | 2.99 | 4.94 | 3.13 | 🔴 |
| Motorizados - Q58 | 3.47 | 4.69 | 4.92 | 3.40 | 4.26 | 2.43 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.81 | 4.37 | 6.17 | 2.69 | 3.86 | 3.48 | 🟡 |
| Domiciliarios - Expancion - API | 5.97 | 8.78 | 7.64 | 9.43 | 8.85 | 10.65 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.51 | 9.44 | 10.66 | 10.19 | 9.73 | 7.27 | 🔴 |
| Domiciliarios INTER - API | 9.99 | 10.96 | 13.57 | 8.56 | 12.62 | 6.91 | 🔴 |
| Motorizados - INTER | 11.22 | 10.87 | 8.38 | 13.19 | 14.23 | 9.38 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.28 | 5.08 | 7.07 | 4.16 | 5.10 | 1.78 | 🔴 |
| RADIO - Fincas | 4.83 | 2.47 | 3.84 | 4.77 | 4.17 | 4.73 | 🟢 |
| Domiciliarios VIDEO - API | 10.10 | 7.78 | 8.38 | 9.68 | 7.93 | 7.11 | 🟡 |
| Motorizados - API | 9.23 | 7.42 | 7.66 | 8.55 | 9.33 | 5.87 | 🔴 |
| TEST Creativos - API | 6.05 | 6.13 | 4.34 | 6.22 | 6.27 | 6.46 | 🟡 |
| RADIO - Broad | 3.50 | 5.18 | 4.49 | 4.87 | 6.67 | 3.76 | 🔴 |

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
| 2026-11-01 | $457,484 | 787 | $581 | $4,082 | 7.02 | $805,851 |

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
