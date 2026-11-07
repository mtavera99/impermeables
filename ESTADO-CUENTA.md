# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-06 20:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$445,463** |
| gastado hoy (hasta las 20h) | $347,301 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $403,886 |
| saldo proyectado a medianoche | $388,878 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-02 | $476,969 | 786 | **$607** | $3,039 | 5.01 |
| 2026-11-03 | $375,673 | 665 | **$565** | $2,917 | 5.16 |
| 2026-11-04 | $307,954 | 475 | **$648** | $4,038 | 6.23 |
| 2026-11-05 | $455,898 | 711 | **$641** | $3,569 | 5.57 |
| 2026-11-06 **HOY** | $347,301 | 625 | **$556** | $3,261 | 5.87 |

🟢 **Hoy va mejor que ayer a la misma hora** ($556 vs $641).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   556  =  $ 3,261  ÷  5.87
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,261 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.87 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $29,557 | 84% | 63 | $469 | 8.49 |
| RADIO - Seguridad / Negocios | $40,000 | $28,369 | 71% | 30 | $946 | 3.50 |
| Domiciliarios - Expancion - API | $30,000 | $26,313 | 88% | 47 | $560 | 7.31 |
| Domiciliarios VIDEO INTER - API | $36,000 | $25,931 | 72% | 32 | $810 | 5.92 |
| RADIO - Moteros | $35,000 | $24,653 | 70% | 7 | $3,522 | 1.06 |
| Domiciliarios - Expancion - Q58 | $29,000 | $23,759 | 82% | 91 | $261 | 7.97 |
| Domiciliarios Q58 - | $25,000 | $22,401 | 90% | 25 | $896 | 3.27 |
| Motorizados - INTER | $25,000 | $20,257 | 81% | 38 | $533 | 10.63 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,693 | 79% | 28 | $703 | 4.12 |
| Motorizados - Q58 | $29,000 | $19,669 | 68% | 30 | $656 | 2.99 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,284 | 77% | 49 | $394 | 5.55 |
| TEST Creativos - API | $20,000 | $16,802 | 84% | 27 | $622 | 7.14 |
| Domiciliarios VIDEO - API | $20,000 | $16,549 | 83% | 49 | $338 | 9.21 |
| Motorizados - API | $20,000 | $16,337 | 82% | 43 | $380 | 9.85 |
| Domiciliarios INTER - API | $20,000 | $15,577 | 78% | 50 | $312 | 10.17 |
| RADIO - Fincas | $20,000 | $15,016 | 75% | 11 | $1,365 | 2.60 |
| RADIO - Broad | $10,000 | $7,134 | 71% | 6 | $1,189 | 5.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $347,301 | 626 | **$555** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,198**/pedido |
| utilidad estimada de lo que va del día | **$657,588** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $541 | $597 | $511 | $426 | $495 | $469 | 🟢 |
| RADIO - Seguridad / Negocios | $883 | $1,488 | $888 | $1,325 | $831 | $946 | 🟡 |
| Domiciliarios - Expancion - API | $650 | $503 | $624 | $662 | $555 | $560 | 🟡 |
| Domiciliarios VIDEO INTER - API | $723 | $667 | $563 | $657 | $700 | $810 | 🔴 |
| RADIO - Moteros | $1,422 | $2,023 | $1,901 | $1,800 | $1,835 | $3,522 | 🔴 |
| Domiciliarios - Expancion - Q58 | $253 | $231 | $253 | $238 | $307 | $261 | 🟢 |
| Domiciliarios Q58 - | $1,379 | $1,407 | $992 | $1,766 | $975 | $896 | 🟢 |
| Motorizados - INTER | $494 | $574 | $507 | $629 | $524 | $533 | 🟡 |
| Domiciliarios VIDEO Q58 - | $678 | $847 | $622 | $1,507 | $701 | $703 | 🟡 |
| Motorizados - Q58 | $628 | $742 | $559 | $621 | $738 | $656 | 🟢 |
| Domiciliarios - Expancion - INTER | $810 | $555 | $496 | $623 | $617 | $394 | 🟢 |
| TEST Creativos - API | $623 | $500 | $559 | $490 | $780 | $622 | 🟢 |
| Domiciliarios VIDEO - API | $412 | $313 | $421 | $375 | $326 | $338 | 🟡 |
| Motorizados - API | $479 | $526 | $390 | $582 | $477 | $380 | 🟢 |
| Domiciliarios INTER - API | $284 | $362 | $290 | $380 | $319 | $312 | 🟡 |
| RADIO - Fincas | $1,119 | $927 | $1,014 | $669 | $800 | $1,365 | 🔴 |
| RADIO - Broad | $1,112 | $1,166 | $916 | $1,342 | $1,997 | $1,189 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.95 | 7.11 | 7.17 | 12.34 | 8.64 | 8.49 | 🟡 |
| RADIO - Seguridad / Negocios | 5.10 | 2.02 | 3.19 | 2.96 | 4.32 | 3.50 | 🔴 |
| Domiciliarios - Expancion - API | 8.85 | 8.73 | 5.79 | 7.44 | 7.99 | 7.31 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.37 | 5.33 | 7.38 | 8.30 | 6.93 | 5.92 | 🟡 |
| RADIO - Moteros | 3.20 | 1.68 | 1.62 | 2.00 | 1.94 | 1.06 | 🔴 |
| Domiciliarios - Expancion - Q58 | 9.72 | 7.74 | 6.90 | 10.09 | 7.54 | 7.97 | 🟢 |
| Domiciliarios Q58 - | 4.94 | 2.99 | 4.33 | 3.11 | 4.32 | 3.27 | 🔴 |
| Motorizados - INTER | 14.23 | 8.96 | 11.83 | 11.09 | 11.50 | 10.63 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.10 | 3.07 | 3.87 | 2.48 | 3.90 | 4.12 | 🟢 |
| Motorizados - Q58 | 4.26 | 2.73 | 3.34 | 3.95 | 3.07 | 2.99 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.86 | 3.83 | 3.85 | 4.77 | 4.10 | 5.55 | 🟢 |
| TEST Creativos - API | 6.27 | 6.74 | 6.72 | 6.70 | 6.18 | 7.14 | 🟢 |
| Domiciliarios VIDEO - API | 7.93 | 7.25 | 6.23 | 9.44 | 9.54 | 9.21 | 🟡 |
| Motorizados - API | 9.32 | 7.22 | 7.69 | 7.75 | 7.86 | 9.85 | 🟢 |
| Domiciliarios INTER - API | 12.61 | 7.07 | 9.66 | 9.56 | 9.66 | 10.17 | 🟢 |
| RADIO - Fincas | 4.17 | 4.36 | 3.29 | 6.60 | 4.89 | 2.60 | 🔴 |
| RADIO - Broad | 6.67 | 5.10 | 7.73 | 5.87 | 3.58 | 5.00 | 🟢 |

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
| 2026-11-05 | $512,795 | 868 | $591 | $3,496 | 5.92 | $880,566 |

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
