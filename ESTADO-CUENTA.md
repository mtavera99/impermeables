# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-04 01:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$270,800** |
| gastado hoy (hasta las 1h) | $5,004 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $477,130 |
| saldo proyectado a medianoche | $-201,326 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $379,116 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-31 | $8,832 | 23 | **$384** | $4,666 | 12.15 |
| 2026-11-01 | $11,511 | 27 | **$426** | $3,214 | 7.54 |
| 2026-11-02 | $13,791 | 21 | **$657** | $3,882 | 5.91 |
| 2026-11-03 | $8,441 | 16 | **$528** | $2,924 | 5.54 |
| 2026-11-04 **HOY** | $5,004 | 9 | **$556** | $4,405 | 7.92 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($556 vs $528).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   556  =  $ 4,405  ÷  7.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,405 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.92 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $25,000 | $495 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $36,000 | $483 | 1% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $454 | 2% | 1 | $454 | 27.03 |
| Domiciliarios INTER - API | $20,000 | $445 | 2% | 1 | $445 | 10.00 |
| RADIO - Seguridad / Negocios | $40,000 | $422 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $393 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $30,000 | $377 | 1% | 3 | $126 | 36.59 |
| Domiciliarios - Expancion - Q58 | $29,000 | $256 | 1% | 1 | $256 | 11.11 |
| Motorizados - Q58 | $29,000 | $249 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $246 | 1% | 1 | $246 | 17.24 |
| Motorizados - API | $20,000 | $235 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $223 | 1% | 1 | $223 | 28.57 |
| Domiciliarios VIDEO - API | $20,000 | $179 | 1% | 1 | $179 | 18.18 |
| Domiciliarios - Expancion - INTER | $25,000 | $172 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $145 | 1% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $128 | 1% | 0 | — | 0.00 |
| RADIO - Moteros | $35,000 | $102 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $5,004 | 9 | **$556** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,221**/pedido |
| utilidad estimada de lo que va del día | **$9,443** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-30 | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $183 | $1,927 | $1,379 | $1,407 | $991 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | $702 | $521 | $723 | $667 | $557 | — | 🟢 |
| Motorizados - INTER | $869 | $539 | $494 | $574 | $499 | $454 | 🟢 |
| Domiciliarios INTER - API | $295 | $462 | $284 | $362 | $287 | $445 | 🔴 |
| RADIO - Seguridad / Negocios | $1,078 | $833 | $883 | $1,488 | $875 | — | 🟢 |
| Domiciliarios - API | $452 | $439 | $541 | $597 | $504 | — | 🟢 |
| Domiciliarios - Expancion - API | $657 | $553 | $650 | $503 | $618 | $126 | 🟢 |
| Domiciliarios - Expancion - Q58 | $267 | $268 | $253 | $231 | $248 | $256 | 🟡 |
| Motorizados - Q58 | $616 | $738 | $628 | $742 | $557 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $843 | $678 | $847 | $617 | $246 | 🟢 |
| Motorizados - API | $566 | $497 | $479 | $526 | $387 | — | 🟢 |
| RADIO - Fincas | $1,153 | $945 | $1,119 | $926 | $989 | $223 | 🟢 |
| Domiciliarios VIDEO - API | $415 | $340 | $412 | $313 | $412 | $179 | 🟢 |
| Domiciliarios - Expancion - INTER | $557 | $1,062 | $810 | $555 | $492 | — | 🟢 |
| TEST Creativos - API | $726 | $541 | $623 | $500 | $558 | — | 🟡 |
| RADIO - Broad | $1,802 | $1,668 | $1,112 | $1,166 | $893 | — | 🟢 |
| RADIO - Moteros | $1,068 | $1,791 | $1,422 | $2,022 | $1,879 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-30 | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | 13.30 | 2.99 | 4.94 | 2.99 | 4.34 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.31 | 8.48 | 6.37 | 5.33 | 7.48 | — | 🟢 |
| Motorizados - INTER | 8.38 | 13.19 | 14.23 | 8.96 | 12.01 | 27.03 | 🟢 |
| Domiciliarios INTER - API | 13.57 | 8.56 | 12.61 | 7.07 | 9.80 | 10.00 | 🟡 |
| RADIO - Seguridad / Negocios | 4.30 | 6.02 | 5.10 | 2.02 | 3.24 | — | 🟢 |
| Domiciliarios - API | 11.25 | 11.52 | 9.95 | 7.11 | 7.27 | — | 🟡 |
| Domiciliarios - Expancion - API | 7.64 | 9.43 | 8.85 | 8.73 | 5.86 | 36.59 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.66 | 10.19 | 9.72 | 7.74 | 7.05 | 11.11 | 🟢 |
| Motorizados - Q58 | 4.92 | 3.40 | 4.26 | 2.73 | 3.35 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.07 | 4.16 | 5.10 | 3.07 | 3.91 | 17.24 | 🟢 |
| Motorizados - API | 7.66 | 8.55 | 9.32 | 7.22 | 7.78 | — | 🟢 |
| RADIO - Fincas | 3.84 | 4.77 | 4.17 | 4.36 | 3.37 | 28.57 | 🟢 |
| Domiciliarios VIDEO - API | 8.38 | 9.68 | 7.93 | 7.25 | 6.39 | 18.18 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.17 | 2.69 | 3.86 | 3.83 | 3.86 | — | 🟡 |
| TEST Creativos - API | 4.34 | 6.22 | 6.27 | 6.74 | 6.72 | — | 🟡 |
| RADIO - Broad | 4.49 | 4.87 | 6.67 | 5.10 | 7.90 | — | 🟢 |
| RADIO - Moteros | 3.71 | 2.24 | 3.20 | 1.68 | 1.64 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,014 | 881 | $603 | $3,035 | 5.04 | $883,215 |
| 2026-11-03 | $435,469 | 799 | $545 | $2,933 | 5.38 | $847,129 |

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
