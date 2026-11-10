# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-09 23:38 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$106,012** |
| gastado hoy (hasta las 23h) | $460,718 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $460,718 |
| saldo proyectado a medianoche | $106,012 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $88,190 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-05 | $512,966 | 868 | **$591** | $3,497 | 5.92 |
| 2026-11-06 | $432,002 | 793 | **$545** | $3,186 | 5.85 |
| 2026-11-07 | $367,724 | 678 | **$542** | $3,153 | 5.81 |
| 2026-11-08 | $477,036 | 911 | **$524** | $2,764 | 5.28 |
| 2026-11-09 **HOY** | $460,718 | 741 | **$622** | $3,270 | 5.26 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($622 vs $524).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   622  =  $ 3,270  ÷  5.26
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,270 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.26 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $38,224 | 96% | 45 | $849 | 4.42 |
| Domiciliarios VIDEO INTER - API | $36,000 | $37,601 | 104% | 58 | $648 | 6.42 |
| RADIO - Moteros | $35,000 | $36,436 | 104% | 21 | $1,735 | 2.33 |
| Domiciliarios - API | $35,000 | $34,854 | 100% | 71 | $491 | 7.74 |
| Domiciliarios - Expancion - API | $30,000 | $30,180 | 101% | 54 | $559 | 6.61 |
| Domiciliarios - Expancion - Q58 | $29,000 | $30,095 | 104% | 98 | $307 | 6.61 |
| Domiciliarios Q58 - | $25,000 | $29,427 | 118% | 26 | $1,132 | 2.69 |
| Domiciliarios VIDEO Q58 - | $25,000 | $28,767 | 115% | 41 | $702 | 3.26 |
| Motorizados - INTER | $25,000 | $28,434 | 114% | 53 | $536 | 8.62 |
| Motorizados - Q58 | $29,000 | $27,695 | 96% | 33 | $839 | 2.69 |
| Domiciliarios - Expancion - INTER | $25,000 | $24,588 | 98% | 36 | $683 | 3.58 |
| RADIO - Fincas | $20,000 | $21,725 | 109% | 16 | $1,358 | 3.33 |
| TEST Creativos - API | $20,000 | $21,591 | 108% | 31 | $696 | 8.25 |
| Domiciliarios INTER - API | $20,000 | $20,916 | 105% | 68 | $308 | 9.70 |
| Motorizados - API | $20,000 | $19,595 | 98% | 35 | $560 | 5.46 |
| Domiciliarios VIDEO - API | $20,000 | $19,177 | 96% | 47 | $408 | 7.72 |
| RADIO - Broad | $10,000 | $11,413 | 114% | 8 | $1,427 | 4.61 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $460,718 | 741 | **$622** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,429**/pedido |
| utilidad estimada de lo que va del día | **$728,775** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,325 | $831 | $976 | $1,003 | $914 | $849 | 🟢 |
| Domiciliarios VIDEO INTER - API | $657 | $701 | $685 | $528 | $565 | $648 | 🟡 |
| RADIO - Moteros | $1,800 | $1,835 | $3,195 | $1,572 | $1,178 | $1,735 | 🔴 |
| Domiciliarios - API | $426 | $495 | $449 | $453 | $430 | $491 | 🟡 |
| Domiciliarios - Expancion - API | $662 | $555 | $536 | $641 | $543 | $559 | 🟡 |
| Domiciliarios - Expancion - Q58 | $238 | $307 | $258 | $295 | $265 | $307 | 🔴 |
| Domiciliarios Q58 - | $1,766 | $975 | $919 | $1,059 | $773 | $1,132 | 🔴 |
| Domiciliarios VIDEO Q58 - | $1,507 | $701 | $619 | $741 | $581 | $702 | 🔴 |
| Motorizados - INTER | $629 | $524 | $540 | $517 | $460 | $536 | 🔴 |
| Motorizados - Q58 | $621 | $738 | $646 | $441 | $683 | $839 | 🔴 |
| Domiciliarios - Expancion - INTER | $623 | $618 | $432 | $621 | $512 | $683 | 🔴 |
| RADIO - Fincas | $669 | $801 | $1,231 | $752 | $725 | $1,358 | 🔴 |
| TEST Creativos - API | $490 | $780 | $662 | $425 | $629 | $696 | 🟡 |
| Domiciliarios INTER - API | $380 | $319 | $301 | $317 | $288 | $308 | 🟡 |
| Motorizados - API | $582 | $477 | $377 | $351 | $390 | $560 | 🔴 |
| Domiciliarios VIDEO - API | $375 | $326 | $327 | $363 | $344 | $408 | 🔴 |
| RADIO - Broad | $1,342 | $1,997 | $942 | $1,435 | $1,184 | $1,427 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.96 | 4.32 | 3.19 | 3.41 | 3.05 | 4.42 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.30 | 6.93 | 6.95 | 8.11 | 6.57 | 6.42 | 🟡 |
| RADIO - Moteros | 2.00 | 1.94 | 1.13 | 2.45 | 2.63 | 2.33 | 🟡 |
| Domiciliarios - API | 12.34 | 8.64 | 8.77 | 8.32 | 8.43 | 7.74 | 🟡 |
| Domiciliarios - Expancion - API | 7.44 | 7.98 | 7.65 | 6.44 | 6.71 | 6.61 | 🟡 |
| Domiciliarios - Expancion - Q58 | 10.09 | 7.54 | 8.12 | 7.82 | 7.28 | 6.61 | 🟡 |
| Domiciliarios Q58 - | 3.11 | 4.32 | 3.03 | 2.54 | 3.14 | 2.69 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.48 | 3.90 | 4.63 | 3.43 | 3.96 | 3.26 | 🔴 |
| Motorizados - INTER | 11.09 | 11.50 | 10.43 | 9.79 | 8.69 | 8.62 | 🟡 |
| Motorizados - Q58 | 3.95 | 3.07 | 2.94 | 4.45 | 2.40 | 2.69 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.77 | 4.10 | 4.91 | 3.36 | 3.65 | 3.58 | 🟡 |
| RADIO - Fincas | 6.60 | 4.89 | 2.79 | 4.91 | 4.90 | 3.33 | 🔴 |
| TEST Creativos - API | 6.70 | 6.18 | 6.64 | 11.59 | 7.61 | 8.25 | 🟢 |
| Domiciliarios INTER - API | 9.56 | 9.65 | 10.36 | 8.21 | 8.60 | 9.70 | 🟢 |
| Motorizados - API | 7.75 | 7.85 | 9.51 | 8.93 | 7.88 | 5.46 | 🔴 |
| Domiciliarios VIDEO - API | 9.44 | 9.54 | 9.47 | 8.74 | 7.31 | 7.72 | 🟢 |
| RADIO - Broad | 5.87 | 3.58 | 6.44 | 3.79 | 5.20 | 4.61 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,036 | 911 | $524 | $2,764 | 5.28 | $985,351 |

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
