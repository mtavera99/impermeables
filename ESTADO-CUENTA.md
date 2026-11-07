# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 09:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$296,696** |
| gastado hoy (hasta las 9h) | $65,566 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $439,423 |
| saldo proyectado a medianoche | $-77,161 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $292,658 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $116,915 | 195 | **$600** | $2,587 | 4.31 |
| 2026-11-04 | $51,417 | 86 | **$598** | $4,758 | 7.96 |
| 2026-11-05 | $88,137 | 132 | **$668** | $3,611 | 5.41 |
| 2026-11-06 | $107,700 | 187 | **$576** | $3,248 | 5.64 |
| 2026-11-07 **HOY** | $65,566 | 140 | **$468** | $3,279 | 7.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($468 vs $576).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   468  =  $ 3,279  ÷  7.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,279 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.00 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $6,668 | 19% | 16 | $417 | 9.50 |
| Domiciliarios - Expancion - API | $30,000 | $6,068 | 20% | 9 | $674 | 6.57 |
| Domiciliarios VIDEO INTER - API | $36,000 | $5,979 | 17% | 18 | $332 | 12.22 |
| RADIO - Seguridad / Negocios | $40,000 | $4,903 | 12% | 8 | $613 | 6.16 |
| Domiciliarios VIDEO - API | $20,000 | $4,440 | 22% | 12 | $370 | 8.87 |
| Motorizados - Q58 | $29,000 | $3,960 | 14% | 15 | $264 | 7.50 |
| Motorizados - API | $20,000 | $3,935 | 20% | 8 | $492 | 6.27 |
| RADIO - Moteros | $35,000 | $3,891 | 11% | 4 | $973 | 3.39 |
| Domiciliarios Q58 - | $25,000 | $3,840 | 15% | 2 | $1,920 | 1.53 |
| Domiciliarios - Expancion - INTER | $25,000 | $3,489 | 14% | 5 | $698 | 3.06 |
| Domiciliarios INTER - API | $20,000 | $3,283 | 16% | 11 | $298 | 8.79 |
| Motorizados - INTER | $25,000 | $3,225 | 13% | 4 | $806 | 6.19 |
| TEST Creativos - API | $20,000 | $3,021 | 15% | 10 | $302 | 17.92 |
| RADIO - Fincas | $20,000 | $2,567 | 13% | 4 | $642 | 6.18 |
| Domiciliarios - Expancion - Q58 | $29,000 | $2,461 | 8% | 10 | $246 | 8.87 |
| Domiciliarios VIDEO Q58 - | $25,000 | $2,460 | 10% | 2 | $1,230 | 2.09 |
| RADIO - Broad | $10,000 | $1,376 | 14% | 2 | $688 | 8.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $65,566 | 140 | **$468** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,609**/pedido |
| utilidad estimada de lo que va del día | **$159,170** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $597 | $511 | $426 | $495 | $448 | $417 | 🟢 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $534 | $674 | 🔴 |
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $684 | $332 | 🟢 |
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $969 | $613 | 🟢 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $326 | $370 | 🟡 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $645 | $264 | 🟢 |
| Motorizados - API | $526 | $390 | $582 | $477 | $375 | $492 | 🔴 |
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,170 | $973 | 🟢 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $918 | $1,920 | 🔴 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $431 | $698 | 🔴 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $300 | $298 | 🟡 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $539 | $806 | 🔴 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $302 | 🟢 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,227 | $642 | 🟢 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $256 | $246 | 🟡 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $618 | $1,230 | 🔴 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $937 | $688 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.81 | 9.50 | 🟢 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.68 | 6.57 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.97 | 12.22 | 🟢 |
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.21 | 6.16 | 🟢 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.49 | 8.87 | 🟡 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 7.50 | 🟢 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.55 | 6.27 | 🔴 |
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.14 | 3.39 | 🟢 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 1.53 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.92 | 3.06 | 🔴 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.39 | 8.79 | 🔴 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.47 | 6.19 | 🔴 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 17.92 | 🟢 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.81 | 6.18 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.17 | 8.87 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 2.09 | 🔴 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.49 | 8.62 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,959 | 868 | $591 | $3,497 | 5.92 | $880,402 |
| 2026-11-06 | $430,592 | 793 | $543 | $3,186 | 5.87 | $842,375 |

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
