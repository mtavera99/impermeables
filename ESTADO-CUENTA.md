# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-06 11:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$61,266** |
| gastado hoy (hasta las 11h) | $133,605 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $468,176 |
| saldo proyectado a medianoche | $-273,306 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $460,049 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-02 | $149,331 | 243 | **$615** | $2,885 | 4.69 |
| 2026-11-03 | $151,014 | 250 | **$604** | $2,717 | 4.50 |
| 2026-11-04 | $78,362 | 131 | **$598** | $4,760 | 7.96 |
| 2026-11-05 | $128,355 | 195 | **$658** | $3,824 | 5.81 |
| 2026-11-06 **HOY** | $133,605 | 247 | **$541** | $3,293 | 6.09 |

🟢 **Hoy va mejor que ayer a la misma hora** ($541 vs $658).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   541  =  $ 3,293  ÷  6.09
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,293 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.09 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $13,920 | 40% | 37 | $376 | 11.83 |
| Domiciliarios - Expancion - API | $30,000 | $10,766 | 36% | 15 | $718 | 6.01 |
| RADIO - Seguridad / Negocios | $40,000 | $10,276 | 26% | 14 | $734 | 4.41 |
| Domiciliarios VIDEO INTER - API | $36,000 | $9,928 | 28% | 11 | $903 | 5.53 |
| Domiciliarios Q58 - | $25,000 | $9,479 | 38% | 11 | $862 | 3.52 |
| Motorizados - Q58 | $29,000 | $9,386 | 32% | 11 | $853 | 2.18 |
| RADIO - Moteros | $35,000 | $8,983 | 26% | 4 | $2,246 | 1.65 |
| Domiciliarios - Expancion - INTER | $25,000 | $7,691 | 31% | 17 | $452 | 5.14 |
| Domiciliarios VIDEO - API | $20,000 | $7,259 | 36% | 25 | $290 | 10.20 |
| Motorizados - INTER | $25,000 | $6,995 | 28% | 13 | $538 | 10.42 |
| Motorizados - API | $20,000 | $6,874 | 34% | 22 | $312 | 12.20 |
| TEST Creativos - API | $20,000 | $6,534 | 33% | 10 | $653 | 6.24 |
| Domiciliarios VIDEO Q58 - | $25,000 | $6,481 | 26% | 8 | $810 | 3.77 |
| Domiciliarios - Expancion - Q58 | $29,000 | $5,838 | 20% | 27 | $216 | 8.90 |
| Domiciliarios INTER - API | $20,000 | $5,673 | 28% | 16 | $355 | 9.73 |
| RADIO - Fincas | $20,000 | $5,633 | 28% | 5 | $1,127 | 3.09 |
| RADIO - Broad | $10,000 | $1,889 | 19% | 1 | $1,889 | 2.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $133,605 | 247 | **$541** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,943**/pedido |
| utilidad estimada de lo que va del día | **$262,893** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $541 | $597 | $511 | $426 | $495 | $376 | 🟢 |
| Domiciliarios - Expancion - API | $650 | $503 | $624 | $662 | $554 | $718 | 🔴 |
| RADIO - Seguridad / Negocios | $883 | $1,488 | $888 | $1,325 | $829 | $734 | 🟢 |
| Domiciliarios VIDEO INTER - API | $723 | $667 | $563 | $657 | $699 | $903 | 🔴 |
| Domiciliarios Q58 - | $1,379 | $1,407 | $992 | $1,766 | $974 | $862 | 🟢 |
| Motorizados - Q58 | $628 | $742 | $559 | $621 | $737 | $853 | 🔴 |
| RADIO - Moteros | $1,422 | $2,023 | $1,901 | $1,798 | $1,825 | $2,246 | 🔴 |
| Domiciliarios - Expancion - INTER | $810 | $555 | $496 | $623 | $617 | $452 | 🟢 |
| Domiciliarios VIDEO - API | $412 | $313 | $421 | $375 | $326 | $290 | 🟢 |
| Motorizados - INTER | $494 | $574 | $507 | $629 | $523 | $538 | 🟡 |
| Motorizados - API | $479 | $526 | $390 | $582 | $477 | $312 | 🟢 |
| TEST Creativos - API | $623 | $500 | $559 | $490 | $780 | $653 | 🟢 |
| Domiciliarios VIDEO Q58 - | $678 | $847 | $622 | $1,507 | $701 | $810 | 🔴 |
| Domiciliarios - Expancion - Q58 | $253 | $231 | $253 | $238 | $306 | $216 | 🟢 |
| Domiciliarios INTER - API | $284 | $362 | $290 | $380 | $317 | $355 | 🟡 |
| RADIO - Fincas | $1,119 | $927 | $1,014 | $669 | $797 | $1,127 | 🔴 |
| RADIO - Broad | $1,112 | $1,166 | $916 | $1,342 | $1,974 | $1,889 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.95 | 7.11 | 7.17 | 12.34 | 8.66 | 11.83 | 🟢 |
| Domiciliarios - Expancion - API | 8.85 | 8.73 | 5.79 | 7.44 | 8.01 | 6.01 | 🔴 |
| RADIO - Seguridad / Negocios | 5.10 | 2.02 | 3.19 | 2.96 | 4.34 | 4.41 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.37 | 5.33 | 7.38 | 8.30 | 6.95 | 5.53 | 🔴 |
| Domiciliarios Q58 - | 4.94 | 2.99 | 4.33 | 3.11 | 4.33 | 3.52 | 🔴 |
| Motorizados - Q58 | 4.26 | 2.73 | 3.34 | 3.95 | 3.07 | 2.18 | 🔴 |
| RADIO - Moteros | 3.20 | 1.68 | 1.62 | 2.00 | 1.95 | 1.65 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.86 | 3.83 | 3.85 | 4.77 | 4.11 | 5.14 | 🟢 |
| Domiciliarios VIDEO - API | 7.93 | 7.25 | 6.23 | 9.44 | 9.57 | 10.20 | 🟢 |
| Motorizados - INTER | 14.23 | 8.96 | 11.83 | 11.09 | 11.53 | 10.42 | 🟡 |
| Motorizados - API | 9.32 | 7.22 | 7.69 | 7.75 | 7.87 | 12.20 | 🟢 |
| TEST Creativos - API | 6.27 | 6.74 | 6.72 | 6.70 | 6.18 | 6.24 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.10 | 3.07 | 3.87 | 2.48 | 3.91 | 3.77 | 🟡 |
| Domiciliarios - Expancion - Q58 | 9.72 | 7.74 | 6.90 | 10.09 | 7.58 | 8.90 | 🟢 |
| Domiciliarios INTER - API | 12.61 | 7.07 | 9.66 | 9.56 | 9.69 | 9.73 | 🟡 |
| RADIO - Fincas | 4.17 | 4.36 | 3.29 | 6.60 | 4.93 | 3.09 | 🔴 |
| RADIO - Broad | 6.67 | 5.10 | 7.73 | 5.87 | 3.63 | 2.80 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,198 | 586 | $621 | $3,942 | 6.34 | $576,481 |
| 2026-11-05 | $511,662 | 868 | $589 | $3,498 | 5.93 | $881,699 |

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
