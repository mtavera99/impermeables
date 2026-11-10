# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-09 22:38 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$121,081** |
| gastado hoy (hasta las 22h) | $444,514 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $451,322 |
| saldo proyectado a medianoche | $114,274 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $89,325 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-05 | $503,149 | 835 | **$603** | $3,499 | 5.81 |
| 2026-11-06 | $423,673 | 774 | **$547** | $3,191 | 5.83 |
| 2026-11-07 | $366,880 | 670 | **$548** | $3,160 | 5.77 |
| 2026-11-08 | $464,265 | 872 | **$532** | $2,766 | 5.20 |
| 2026-11-09 **HOY** | $444,514 | 721 | **$617** | $3,270 | 5.30 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($617 vs $532).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   617  =  $ 3,270  ÷  5.30
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,270 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.30 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $36,996 | 92% | 44 | $841 | 4.46 |
| Domiciliarios VIDEO INTER - API | $36,000 | $35,909 | 100% | 54 | $665 | 6.24 |
| RADIO - Moteros | $35,000 | $34,961 | 100% | 21 | $1,665 | 2.41 |
| Domiciliarios - API | $35,000 | $33,761 | 96% | 71 | $476 | 7.98 |
| Domiciliarios - Expancion - Q58 | $29,000 | $29,275 | 101% | 96 | $305 | 6.63 |
| Domiciliarios - Expancion - API | $30,000 | $28,906 | 96% | 54 | $535 | 6.86 |
| Domiciliarios Q58 - | $25,000 | $28,617 | 114% | 26 | $1,101 | 2.77 |
| Motorizados - INTER | $25,000 | $27,820 | 111% | 48 | $580 | 8.01 |
| Domiciliarios VIDEO Q58 - | $25,000 | $27,692 | 111% | 41 | $675 | 3.37 |
| Motorizados - Q58 | $29,000 | $26,584 | 92% | 31 | $858 | 2.64 |
| Domiciliarios - Expancion - INTER | $25,000 | $23,350 | 93% | 35 | $667 | 3.69 |
| RADIO - Fincas | $20,000 | $21,097 | 105% | 16 | $1,319 | 3.45 |
| TEST Creativos - API | $20,000 | $20,596 | 103% | 31 | $664 | 8.59 |
| Domiciliarios INTER - API | $20,000 | $20,264 | 101% | 64 | $317 | 9.49 |
| Motorizados - API | $20,000 | $18,958 | 95% | 35 | $542 | 5.65 |
| Domiciliarios VIDEO - API | $20,000 | $18,651 | 93% | 46 | $405 | 7.84 |
| RADIO - Broad | $10,000 | $11,127 | 111% | 8 | $1,391 | 4.76 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $444,564 | 721 | **$617** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,334**/pedido |
| utilidad estimada de lo que va del día | **$712,824** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,325 | $831 | $976 | $1,003 | $914 | $841 | 🟢 |
| Domiciliarios VIDEO INTER - API | $657 | $701 | $685 | $528 | $565 | $665 | 🔴 |
| RADIO - Moteros | $1,800 | $1,835 | $3,195 | $1,572 | $1,178 | $1,665 | 🔴 |
| Domiciliarios - API | $426 | $495 | $449 | $453 | $430 | $476 | 🟡 |
| Domiciliarios - Expancion - Q58 | $238 | $307 | $258 | $295 | $265 | $305 | 🔴 |
| Domiciliarios - Expancion - API | $662 | $555 | $536 | $641 | $543 | $535 | 🟡 |
| Domiciliarios Q58 - | $1,766 | $975 | $919 | $1,059 | $773 | $1,101 | 🔴 |
| Motorizados - INTER | $629 | $524 | $540 | $517 | $460 | $580 | 🔴 |
| Domiciliarios VIDEO Q58 - | $1,507 | $701 | $619 | $741 | $581 | $675 | 🔴 |
| Motorizados - Q58 | $621 | $738 | $646 | $441 | $683 | $858 | 🔴 |
| Domiciliarios - Expancion - INTER | $623 | $618 | $432 | $621 | $512 | $667 | 🔴 |
| RADIO - Fincas | $669 | $801 | $1,231 | $752 | $725 | $1,319 | 🔴 |
| TEST Creativos - API | $490 | $780 | $662 | $425 | $629 | $664 | 🟡 |
| Domiciliarios INTER - API | $380 | $319 | $301 | $317 | $288 | $317 | 🟡 |
| Motorizados - API | $582 | $477 | $377 | $351 | $390 | $542 | 🔴 |
| Domiciliarios VIDEO - API | $375 | $326 | $327 | $363 | $344 | $405 | 🔴 |
| RADIO - Broad | $1,342 | $1,997 | $942 | $1,435 | $1,184 | $1,391 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.96 | 4.32 | 3.19 | 3.41 | 3.05 | 4.46 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.30 | 6.93 | 6.95 | 8.11 | 6.57 | 6.24 | 🟡 |
| RADIO - Moteros | 2.00 | 1.94 | 1.13 | 2.45 | 2.63 | 2.41 | 🟡 |
| Domiciliarios - API | 12.34 | 8.64 | 8.77 | 8.32 | 8.43 | 7.98 | 🟡 |
| Domiciliarios - Expancion - Q58 | 10.09 | 7.54 | 8.12 | 7.82 | 7.28 | 6.63 | 🟡 |
| Domiciliarios - Expancion - API | 7.44 | 7.98 | 7.65 | 6.44 | 6.71 | 6.86 | 🟡 |
| Domiciliarios Q58 - | 3.11 | 4.32 | 3.03 | 2.54 | 3.14 | 2.77 | 🟡 |
| Motorizados - INTER | 11.09 | 11.50 | 10.43 | 9.79 | 8.69 | 8.00 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.48 | 3.90 | 4.63 | 3.43 | 3.96 | 3.37 | 🟡 |
| Motorizados - Q58 | 3.95 | 3.07 | 2.94 | 4.45 | 2.40 | 2.64 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.77 | 4.10 | 4.91 | 3.36 | 3.65 | 3.69 | 🟡 |
| RADIO - Fincas | 6.60 | 4.89 | 2.79 | 4.91 | 4.90 | 3.45 | 🔴 |
| TEST Creativos - API | 6.70 | 6.18 | 6.64 | 11.59 | 7.61 | 8.59 | 🟢 |
| Domiciliarios INTER - API | 9.56 | 9.65 | 10.36 | 8.21 | 8.60 | 9.49 | 🟢 |
| Motorizados - API | 7.75 | 7.85 | 9.51 | 8.93 | 7.88 | 5.65 | 🔴 |
| Domiciliarios VIDEO - API | 9.44 | 9.54 | 9.47 | 8.74 | 7.31 | 7.84 | 🟢 |
| RADIO - Broad | 5.87 | 3.58 | 6.44 | 3.79 | 5.20 | 4.76 | 🟡 |

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
