# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-06 04:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$183,501** |
| gastado hoy (hasta las 4h) | $15,334 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $442,414 |
| saldo proyectado a medianoche | $-243,579 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $456,085 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–4:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-02 | $33,215 | 46 | **$722** | $3,615 | 5.01 |
| 2026-11-03 | $29,414 | 47 | **$626** | $2,451 | 3.92 |
| 2026-11-04 | $9,055 | 19 | **$477** | $4,585 | 9.62 |
| 2026-11-05 | $8,993 | 22 | **$409** | $3,300 | 8.07 |
| 2026-11-06 **HOY** | $15,334 | 34 | **$451** | $3,693 | 8.19 |

🟠 Hoy va 10% más caro que ayer a la misma hora ($451 vs $409).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   451  =  $ 3,693  ÷  8.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,693 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.19 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $2,256 | 6% | 9 | $251 | 21.18 |
| Motorizados - Q58 | $29,000 | $1,483 | 5% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $30,000 | $1,380 | 5% | 0 | — | 0.00 |
| RADIO - Moteros | $35,000 | $1,281 | 4% | 1 | $1,281 | 2.86 |
| Motorizados - API | $20,000 | $1,152 | 6% | 5 | $230 | 22.03 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,151 | 3% | 1 | $1,151 | 4.76 |
| RADIO - Seguridad / Negocios | $40,000 | $1,061 | 3% | 5 | $212 | 18.73 |
| Domiciliarios INTER - API | $20,000 | $1,004 | 5% | 1 | $1,004 | 5.49 |
| Domiciliarios VIDEO - API | $20,000 | $940 | 5% | 4 | $235 | 15.81 |
| Domiciliarios - Expancion - INTER | $25,000 | $844 | 3% | 1 | $844 | 3.13 |
| Domiciliarios Q58 - | $25,000 | $708 | 3% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $586 | 3% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $472 | 2% | 3 | $157 | 30.61 |
| Domiciliarios - Expancion - Q58 | $29,000 | $334 | 1% | 2 | $167 | 11.56 |
| Domiciliarios VIDEO Q58 - | $25,000 | $316 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $278 | 1% | 1 | $278 | 11.49 |
| RADIO - Broad | $10,000 | $88 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $15,334 | 33 | **$465** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,542**/pedido |
| utilidad estimada de lo que va del día | **$37,639** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $541 | $597 | $511 | $426 | $491 | $251 | 🟢 |
| Motorizados - Q58 | $628 | $742 | $559 | $621 | $736 | — | 🔴 |
| Domiciliarios - Expancion - API | $650 | $503 | $624 | $662 | $551 | — | 🟢 |
| RADIO - Moteros | $1,422 | $2,023 | $1,901 | $1,797 | $1,805 | $1,281 | 🟢 |
| Motorizados - API | $479 | $526 | $390 | $582 | $474 | $230 | 🟢 |
| Domiciliarios VIDEO INTER - API | $723 | $667 | $563 | $657 | $694 | $1,151 | 🔴 |
| RADIO - Seguridad / Negocios | $883 | $1,488 | $888 | $1,325 | $819 | $212 | 🟢 |
| Domiciliarios INTER - API | $284 | $362 | $290 | $380 | $314 | $1,004 | 🔴 |
| Domiciliarios VIDEO - API | $412 | $313 | $421 | $375 | $324 | $235 | 🟢 |
| Domiciliarios - Expancion - INTER | $810 | $555 | $496 | $623 | $615 | $844 | 🔴 |
| Domiciliarios Q58 - | $1,379 | $1,407 | $992 | $1,766 | $973 | — | 🟢 |
| RADIO - Fincas | $1,119 | $927 | $1,014 | $667 | $789 | — | 🔴 |
| Motorizados - INTER | $494 | $574 | $507 | $629 | $520 | $157 | 🟢 |
| Domiciliarios - Expancion - Q58 | $253 | $231 | $253 | $238 | $301 | $167 | 🟢 |
| Domiciliarios VIDEO Q58 - | $678 | $847 | $622 | $1,507 | $695 | — | 🟢 |
| TEST Creativos - API | $623 | $500 | $559 | $490 | $780 | $278 | 🟢 |
| RADIO - Broad | $1,112 | $1,166 | $916 | $1,342 | $1,956 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.95 | 7.11 | 7.17 | 12.34 | 8.75 | 21.18 | 🟢 |
| Motorizados - Q58 | 4.26 | 2.73 | 3.34 | 3.95 | 3.08 | — | 🔴 |
| Domiciliarios - Expancion - API | 8.85 | 8.73 | 5.79 | 7.44 | 8.07 | — | 🟢 |
| RADIO - Moteros | 3.20 | 1.68 | 1.62 | 2.00 | 1.97 | 2.86 | 🟢 |
| Motorizados - API | 9.32 | 7.22 | 7.69 | 7.75 | 7.92 | 22.03 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.37 | 5.33 | 7.38 | 8.30 | 7.00 | 4.76 | 🔴 |
| RADIO - Seguridad / Negocios | 5.10 | 2.02 | 3.19 | 2.96 | 4.41 | 18.73 | 🟢 |
| Domiciliarios INTER - API | 12.61 | 7.07 | 9.66 | 9.56 | 9.75 | 5.49 | 🔴 |
| Domiciliarios VIDEO - API | 7.93 | 7.25 | 6.23 | 9.44 | 9.66 | 15.81 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.86 | 3.83 | 3.85 | 4.77 | 4.11 | 3.13 | 🔴 |
| Domiciliarios Q58 - | 4.94 | 2.99 | 4.33 | 3.11 | 4.33 | — | 🟢 |
| RADIO - Fincas | 4.17 | 4.36 | 3.29 | 6.60 | 5.03 | — | 🔴 |
| Motorizados - INTER | 14.23 | 8.96 | 11.83 | 11.09 | 11.65 | 30.61 | 🟢 |
| Domiciliarios - Expancion - Q58 | 9.72 | 7.74 | 6.90 | 10.09 | 7.70 | 11.56 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.10 | 3.07 | 3.87 | 2.48 | 3.93 | — | 🟢 |
| TEST Creativos - API | 6.27 | 6.74 | 6.72 | 6.70 | 6.19 | 11.49 | 🟢 |
| RADIO - Broad | 6.67 | 5.10 | 7.73 | 5.87 | 3.70 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,140 | 586 | $621 | $3,942 | 6.34 | $576,539 |
| 2026-11-05 | $508,068 | 868 | $585 | $3,502 | 5.98 | $885,293 |

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
