# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 21:45 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$151,412** |
| gastado hoy (hasta las 21h) | $359,677 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $384,320 |
| saldo proyectado a medianoche | $126,769 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $143,831 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $406,188 | 726 | **$559** | $2,915 | 5.21 |
| 2026-11-04 | $335,895 | 531 | **$633** | $3,981 | 6.29 |
| 2026-11-05 | $486,933 | 803 | **$606** | $3,520 | 5.80 |
| 2026-11-06 | $408,736 | 732 | **$558** | $3,206 | 5.74 |
| 2026-11-07 **HOY** | $359,677 | 651 | **$552** | $3,244 | 5.87 |

🟢 **Hoy va mejor que ayer a la misma hora** ($552 vs $558).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   552  =  $ 3,244  ÷  5.87
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,244 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.87 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $32,769 | 82% | 30 | $1,092 | 3.22 |
| RADIO - Moteros | $35,000 | $31,312 | 89% | 18 | $1,740 | 2.28 |
| Domiciliarios VIDEO INTER - API | $36,000 | $30,109 | 84% | 56 | $538 | 8.16 |
| Domiciliarios - API | $35,000 | $29,281 | 84% | 65 | $450 | 8.50 |
| Domiciliarios - Expancion - API | $30,000 | $24,883 | 83% | 37 | $673 | 6.25 |
| Motorizados - Q58 | $29,000 | $24,643 | 85% | 55 | $448 | 4.50 |
| Domiciliarios - Expancion - Q58 | $29,000 | $22,682 | 78% | 75 | $302 | 7.81 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,746 | 83% | 26 | $798 | 3.31 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,347 | 77% | 30 | $645 | 3.35 |
| Motorizados - INTER | $25,000 | $19,312 | 77% | 37 | $522 | 9.95 |
| Domiciliarios Q58 - | $25,000 | $18,587 | 74% | 18 | $1,033 | 2.71 |
| Domiciliarios VIDEO - API | $20,000 | $17,125 | 86% | 48 | $357 | 9.05 |
| Motorizados - API | $20,000 | $16,513 | 83% | 48 | $344 | 9.19 |
| TEST Creativos - API | $20,000 | $15,401 | 77% | 37 | $416 | 12.62 |
| Domiciliarios INTER - API | $20,000 | $15,117 | 76% | 46 | $329 | 8.19 |
| RADIO - Fincas | $20,000 | $14,979 | 75% | 19 | $788 | 4.88 |
| RADIO - Broad | $10,000 | $6,871 | 69% | 5 | $1,374 | 4.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $359,677 | 650 | **$553** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,172**/pedido |
| utilidad estimada de lo que va del día | **$683,738** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $976 | $1,092 | 🟡 |
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,195 | $1,740 | 🟢 |
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $685 | $538 | 🟢 |
| Domiciliarios - API | $597 | $511 | $426 | $495 | $449 | $450 | 🟡 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $536 | $673 | 🔴 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $646 | $448 | 🟢 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $258 | $302 | 🔴 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $619 | $798 | 🔴 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $432 | $645 | 🔴 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $540 | $522 | 🟡 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $919 | $1,033 | 🟡 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $327 | $357 | 🟡 |
| Motorizados - API | $526 | $390 | $582 | $477 | $377 | $344 | 🟢 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $416 | 🟢 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $301 | $329 | 🟡 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,231 | $788 | 🟢 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $942 | $1,374 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.19 | 3.22 | 🟡 |
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.13 | 2.28 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.95 | 8.16 | 🟢 |
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.77 | 8.50 | 🟡 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.65 | 6.25 | 🔴 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 4.50 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.12 | 7.81 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 3.31 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.91 | 3.35 | 🔴 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.43 | 9.95 | 🟡 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 2.71 | 🟡 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.47 | 9.05 | 🟡 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.51 | 9.19 | 🟡 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 12.62 | 🟢 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.36 | 8.19 | 🔴 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.79 | 4.88 | 🟢 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.44 | 4.03 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $431,989 | 793 | $545 | $3,186 | 5.85 | $840,978 |

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
