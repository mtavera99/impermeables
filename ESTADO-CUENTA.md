# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 20:45 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$165,843** |
| gastado hoy (hasta las 20h) | $344,697 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $396,986 |
| saldo proyectado a medianoche | $113,554 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $144,380 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $375,673 | 665 | **$565** | $2,917 | 5.16 |
| 2026-11-04 | $307,954 | 475 | **$648** | $4,038 | 6.23 |
| 2026-11-05 | $455,991 | 711 | **$641** | $3,570 | 5.57 |
| 2026-11-06 | $384,359 | 687 | **$559** | $3,234 | 5.78 |
| 2026-11-07 **HOY** | $344,697 | 615 | **$560** | $3,302 | 5.89 |

🟠 Hoy va 0% más caro que ayer a la misma hora ($560 vs $559).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   560  =  $ 3,302  ÷  5.89
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,302 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.89 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $31,647 | 79% | 28 | $1,130 | 3.18 |
| RADIO - Moteros | $35,000 | $30,211 | 86% | 18 | $1,678 | 2.45 |
| Domiciliarios - API | $35,000 | $28,574 | 82% | 63 | $454 | 8.53 |
| Domiciliarios VIDEO INTER - API | $36,000 | $28,188 | 78% | 50 | $564 | 7.72 |
| Domiciliarios - Expancion - API | $30,000 | $24,171 | 81% | 36 | $671 | 6.28 |
| Motorizados - Q58 | $29,000 | $22,870 | 79% | 50 | $457 | 4.50 |
| Domiciliarios - Expancion - Q58 | $29,000 | $22,416 | 77% | 74 | $303 | 7.86 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,737 | 79% | 24 | $822 | 3.29 |
| Motorizados - INTER | $25,000 | $18,735 | 75% | 36 | $520 | 10.09 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,095 | 72% | 28 | $646 | 3.40 |
| Domiciliarios Q58 - | $25,000 | $17,599 | 70% | 17 | $1,035 | 2.82 |
| Domiciliarios VIDEO - API | $20,000 | $16,521 | 83% | 44 | $375 | 8.68 |
| Motorizados - API | $20,000 | $15,780 | 79% | 45 | $351 | 9.05 |
| TEST Creativos - API | $20,000 | $15,003 | 75% | 35 | $429 | 12.38 |
| Domiciliarios INTER - API | $20,000 | $14,465 | 72% | 44 | $329 | 8.26 |
| RADIO - Fincas | $20,000 | $14,023 | 70% | 18 | $779 | 5.03 |
| RADIO - Broad | $10,000 | $6,662 | 67% | 5 | $1,332 | 4.16 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $344,697 | 615 | **$560** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,303**/pedido |
| utilidad estimada de lo que va del día | **$642,534** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $976 | $1,130 | 🔴 |
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,195 | $1,678 | 🟢 |
| Domiciliarios - API | $597 | $511 | $426 | $495 | $449 | $454 | 🟡 |
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $685 | $564 | 🟢 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $536 | $671 | 🔴 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $646 | $457 | 🟢 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $258 | $303 | 🔴 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $619 | $822 | 🔴 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $540 | $520 | 🟡 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $432 | $646 | 🔴 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $919 | $1,035 | 🟡 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $327 | $375 | 🟡 |
| Motorizados - API | $526 | $390 | $582 | $477 | $377 | $351 | 🟢 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $429 | 🟢 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $301 | $329 | 🟡 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,231 | $779 | 🟢 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $941 | $1,332 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.19 | 3.18 | 🟡 |
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.13 | 2.45 | 🟢 |
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.77 | 8.53 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.96 | 7.72 | 🟢 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.65 | 6.28 | 🔴 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 4.50 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.12 | 7.86 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 3.29 | 🔴 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.43 | 10.09 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.91 | 3.40 | 🔴 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 2.82 | 🟡 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.47 | 8.68 | 🟡 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.51 | 9.05 | 🟡 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 12.38 | 🟢 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.36 | 8.26 | 🔴 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.79 | 5.03 | 🟢 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.46 | 4.16 | 🔴 |

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
| 2026-11-06 | $431,961 | 793 | $545 | $3,186 | 5.85 | $841,006 |

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
