# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-06 18:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$509,570** |
| gastado hoy (hasta las 18h) | $282,118 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $428,584 |
| saldo proyectado a medianoche | $363,104 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-02 | $421,721 | 673 | **$627** | $3,006 | 4.80 |
| 2026-11-03 | $293,068 | 520 | **$564** | $2,903 | 5.15 |
| 2026-11-04 | $240,778 | 359 | **$671** | $4,218 | 6.29 |
| 2026-11-05 | $343,151 | 520 | **$660** | $3,825 | 5.80 |
| 2026-11-06 **HOY** | $282,118 | 503 | **$561** | $3,288 | 5.86 |

🟢 **Hoy va mejor que ayer a la misma hora** ($561 vs $660).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   561  =  $ 3,288  ÷  5.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,288 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $24,522 | 70% | 54 | $454 | 8.93 |
| RADIO - Seguridad / Negocios | $40,000 | $22,602 | 57% | 24 | $942 | 3.58 |
| Domiciliarios VIDEO INTER - API | $36,000 | $21,730 | 60% | 26 | $836 | 5.96 |
| Domiciliarios - Expancion - API | $30,000 | $21,118 | 70% | 33 | $640 | 6.32 |
| RADIO - Moteros | $35,000 | $19,197 | 55% | 6 | $3,200 | 1.22 |
| Domiciliarios - Expancion - Q58 | $29,000 | $18,631 | 64% | 70 | $266 | 7.73 |
| Domiciliarios Q58 - | $25,000 | $18,426 | 74% | 22 | $838 | 3.55 |
| Motorizados - Q58 | $29,000 | $16,982 | 59% | 20 | $849 | 2.34 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,452 | 66% | 22 | $748 | 3.85 |
| Motorizados - INTER | $25,000 | $16,395 | 66% | 31 | $529 | 10.43 |
| Domiciliarios - Expancion - INTER | $25,000 | $16,016 | 64% | 40 | $400 | 5.56 |
| TEST Creativos - API | $20,000 | $13,641 | 68% | 24 | $568 | 7.96 |
| Domiciliarios VIDEO - API | $20,000 | $13,497 | 67% | 40 | $337 | 9.10 |
| Motorizados - API | $20,000 | $13,285 | 66% | 37 | $359 | 10.75 |
| Domiciliarios INTER - API | $20,000 | $12,303 | 62% | 39 | $315 | 10.33 |
| RADIO - Fincas | $20,000 | $11,706 | 59% | 9 | $1,301 | 2.73 |
| RADIO - Broad | $10,000 | $5,615 | 56% | 4 | $1,404 | 4.46 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $282,118 | 501 | **$563** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,351**/pedido |
| utilidad estimada de lo que va del día | **$522,114** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $541 | $597 | $511 | $426 | $495 | $454 | 🟢 |
| RADIO - Seguridad / Negocios | $883 | $1,488 | $888 | $1,325 | $831 | $942 | 🟡 |
| Domiciliarios VIDEO INTER - API | $723 | $667 | $563 | $657 | $700 | $836 | 🔴 |
| Domiciliarios - Expancion - API | $650 | $503 | $624 | $662 | $554 | $640 | 🔴 |
| RADIO - Moteros | $1,422 | $2,023 | $1,901 | $1,800 | $1,832 | $3,200 | 🔴 |
| Domiciliarios - Expancion - Q58 | $253 | $231 | $253 | $238 | $307 | $266 | 🟢 |
| Domiciliarios Q58 - | $1,379 | $1,407 | $992 | $1,766 | $975 | $838 | 🟢 |
| Motorizados - Q58 | $628 | $742 | $559 | $621 | $738 | $849 | 🔴 |
| Domiciliarios VIDEO Q58 - | $678 | $847 | $622 | $1,507 | $701 | $748 | 🟡 |
| Motorizados - INTER | $494 | $574 | $507 | $629 | $524 | $529 | 🟡 |
| Domiciliarios - Expancion - INTER | $810 | $555 | $496 | $623 | $617 | $400 | 🟢 |
| TEST Creativos - API | $623 | $500 | $559 | $490 | $780 | $568 | 🟢 |
| Domiciliarios VIDEO - API | $412 | $313 | $421 | $375 | $326 | $337 | 🟡 |
| Motorizados - API | $479 | $526 | $390 | $582 | $477 | $359 | 🟢 |
| Domiciliarios INTER - API | $284 | $362 | $290 | $380 | $318 | $315 | 🟡 |
| RADIO - Fincas | $1,119 | $927 | $1,014 | $669 | $800 | $1,301 | 🔴 |
| RADIO - Broad | $1,112 | $1,166 | $916 | $1,342 | $1,996 | $1,404 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.95 | 7.11 | 7.17 | 12.34 | 8.64 | 8.93 | 🟡 |
| RADIO - Seguridad / Negocios | 5.10 | 2.02 | 3.19 | 2.96 | 4.32 | 3.58 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.37 | 5.33 | 7.38 | 8.30 | 6.94 | 5.96 | 🟡 |
| Domiciliarios - Expancion - API | 8.85 | 8.73 | 5.79 | 7.44 | 7.99 | 6.32 | 🔴 |
| RADIO - Moteros | 3.20 | 1.68 | 1.62 | 2.00 | 1.95 | 1.22 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.72 | 7.74 | 6.90 | 10.09 | 7.55 | 7.73 | 🟡 |
| Domiciliarios Q58 - | 4.94 | 2.99 | 4.33 | 3.11 | 4.32 | 3.55 | 🔴 |
| Motorizados - Q58 | 4.26 | 2.73 | 3.34 | 3.95 | 3.07 | 2.34 | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.10 | 3.07 | 3.87 | 2.48 | 3.90 | 3.85 | 🟡 |
| Motorizados - INTER | 14.23 | 8.96 | 11.83 | 11.09 | 11.50 | 10.43 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.86 | 3.83 | 3.85 | 4.77 | 4.10 | 5.56 | 🟢 |
| TEST Creativos - API | 6.27 | 6.74 | 6.72 | 6.70 | 6.18 | 7.96 | 🟢 |
| Domiciliarios VIDEO - API | 7.93 | 7.25 | 6.23 | 9.44 | 9.54 | 9.10 | 🟡 |
| Motorizados - API | 9.32 | 7.22 | 7.69 | 7.75 | 7.86 | 10.75 | 🟢 |
| Domiciliarios INTER - API | 12.61 | 7.07 | 9.66 | 9.56 | 9.66 | 10.33 | 🟢 |
| RADIO - Fincas | 4.17 | 4.36 | 3.29 | 6.60 | 4.90 | 2.73 | 🔴 |
| RADIO - Broad | 6.67 | 5.10 | 7.73 | 5.87 | 3.59 | 4.46 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,635 | 868 | $591 | $3,496 | 5.92 | $880,726 |

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
