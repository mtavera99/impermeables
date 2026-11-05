# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-05 18:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$197,336** |
| gastado hoy (hasta las 18h) | $306,935 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $442,406 |
| saldo proyectado a medianoche | $61,866 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $150,649 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-01 | $304,227 | 536 | **$568** | $4,045 | 7.13 |
| 2026-11-02 | $421,721 | 673 | **$627** | $3,006 | 4.80 |
| 2026-11-03 | $293,068 | 520 | **$564** | $2,903 | 5.15 |
| 2026-11-04 | $240,723 | 359 | **$671** | $4,218 | 6.29 |
| 2026-11-05 **HOY** | $306,935 | 481 | **$638** | $3,880 | 6.08 |

🟢 **Hoy va mejor que ayer a la misma hora** ($638 vs $671).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   638  =  $ 3,880  ÷  6.08
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,880 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.08 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $25,870 | 74% | 46 | $562 | 8.57 |
| Domiciliarios VIDEO INTER - API | $36,000 | $24,872 | 69% | 35 | $711 | 7.24 |
| RADIO - Seguridad / Negocios | $40,000 | $22,852 | 57% | 30 | $762 | 5.54 |
| Domiciliarios Q58 - | $25,000 | $22,784 | 91% | 20 | $1,139 | 4.06 |
| Motorizados - Q58 | $29,000 | $21,515 | 74% | 24 | $896 | 2.81 |
| Domiciliarios - Expancion - API | $30,000 | $19,759 | 66% | 29 | $681 | 7.33 |
| RADIO - Moteros | $35,000 | $19,651 | 56% | 14 | $1,404 | 2.72 |
| Domiciliarios - Expancion - Q58 | $29,000 | $18,552 | 64% | 46 | $403 | 6.18 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,463 | 74% | 27 | $684 | 4.50 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,230 | 73% | 27 | $675 | 4.16 |
| TEST Creativos - API | $20,000 | $18,001 | 90% | 22 | $818 | 6.23 |
| Motorizados - INTER | $25,000 | $17,472 | 70% | 35 | $499 | 13.41 |
| Domiciliarios VIDEO - API | $20,000 | $14,446 | 72% | 40 | $361 | 9.43 |
| RADIO - Fincas | $20,000 | $13,885 | 69% | 17 | $817 | 5.28 |
| Domiciliarios INTER - API | $20,000 | $13,420 | 67% | 43 | $312 | 11.63 |
| Motorizados - API | $20,000 | $12,707 | 64% | 25 | $508 | 8.12 |
| RADIO - Broad | $10,000 | $4,456 | 45% | 1 | $4,456 | 1.63 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $306,935 | 481 | **$638** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,730**/pedido |
| utilidad estimada de lo que va del día | **$465,192** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $439 | $541 | $597 | $511 | $426 | $562 | 🔴 |
| Domiciliarios VIDEO INTER - API | $521 | $723 | $667 | $563 | $656 | $711 | 🟡 |
| RADIO - Seguridad / Negocios | $833 | $883 | $1,488 | $888 | $1,324 | $762 | 🟢 |
| Domiciliarios Q58 - | $1,927 | $1,379 | $1,407 | $992 | $1,766 | $1,139 | 🟢 |
| Motorizados - Q58 | $738 | $628 | $742 | $559 | $621 | $896 | 🔴 |
| Domiciliarios - Expancion - API | $553 | $650 | $503 | $624 | $662 | $681 | 🟡 |
| RADIO - Moteros | $1,791 | $1,422 | $2,023 | $1,901 | $1,795 | $1,404 | 🟢 |
| Domiciliarios - Expancion - Q58 | $268 | $253 | $231 | $253 | $238 | $403 | 🔴 |
| Domiciliarios VIDEO Q58 - | $843 | $678 | $847 | $622 | $1,507 | $684 | 🟢 |
| Domiciliarios - Expancion - INTER | $1,062 | $810 | $555 | $496 | $623 | $675 | 🟡 |
| TEST Creativos - API | $541 | $623 | $500 | $559 | $490 | $818 | 🔴 |
| Motorizados - INTER | $539 | $494 | $574 | $507 | $629 | $499 | 🟢 |
| Domiciliarios VIDEO - API | $340 | $412 | $313 | $421 | $375 | $361 | 🟡 |
| RADIO - Fincas | $945 | $1,119 | $927 | $1,014 | $666 | $817 | 🔴 |
| Domiciliarios INTER - API | $462 | $284 | $362 | $290 | $380 | $312 | 🟢 |
| Motorizados - API | $497 | $479 | $526 | $390 | $582 | $508 | 🟢 |
| RADIO - Broad | $1,668 | $1,112 | $1,166 | $916 | $1,342 | $4,456 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 11.52 | 9.95 | 7.11 | 7.17 | 12.35 | 8.57 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.48 | 6.37 | 5.33 | 7.38 | 8.30 | 7.24 | 🟡 |
| RADIO - Seguridad / Negocios | 6.02 | 5.10 | 2.02 | 3.19 | 2.97 | 5.54 | 🟢 |
| Domiciliarios Q58 - | 2.99 | 4.94 | 2.99 | 4.33 | 3.11 | 4.06 | 🟢 |
| Motorizados - Q58 | 3.40 | 4.26 | 2.73 | 3.34 | 3.95 | 2.81 | 🔴 |
| Domiciliarios - Expancion - API | 9.43 | 8.85 | 8.73 | 5.79 | 7.44 | 7.33 | 🟡 |
| RADIO - Moteros | 2.24 | 3.20 | 1.68 | 1.62 | 2.00 | 2.72 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.19 | 9.72 | 7.74 | 6.90 | 10.09 | 6.18 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.16 | 5.10 | 3.07 | 3.87 | 2.48 | 4.50 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.69 | 3.86 | 3.83 | 3.85 | 4.77 | 4.16 | 🟡 |
| TEST Creativos - API | 6.22 | 6.27 | 6.74 | 6.72 | 6.70 | 6.23 | 🟡 |
| Motorizados - INTER | 13.19 | 14.23 | 8.96 | 11.83 | 11.10 | 13.41 | 🟢 |
| Domiciliarios VIDEO - API | 9.68 | 7.93 | 7.25 | 6.23 | 9.44 | 9.43 | 🟡 |
| RADIO - Fincas | 4.77 | 4.17 | 4.36 | 3.29 | 6.61 | 5.28 | 🔴 |
| Domiciliarios INTER - API | 8.56 | 12.61 | 7.07 | 9.66 | 9.56 | 11.63 | 🟢 |
| Motorizados - API | 8.55 | 9.32 | 7.22 | 7.69 | 7.76 | 8.12 | 🟡 |
| RADIO - Broad | 4.87 | 6.67 | 5.10 | 7.73 | 5.87 | 1.63 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $363,991 | 586 | $621 | $3,942 | 6.35 | $576,688 |

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
