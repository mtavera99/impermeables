# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-10 12:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$225,943** |
| gastado hoy (hasta las 11h) | $71,014 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $377,560 |
| saldo proyectado a medianoche | $-80,604 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $357,963 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-06 | $147,234 | 264 | **$558** | $3,255 | 5.84 |
| 2026-11-07 | $128,037 | 215 | **$596** | $3,498 | 5.87 |
| 2026-11-08 | $195,323 | 364 | **$537** | $2,889 | 5.38 |
| 2026-11-09 | $138,580 | 264 | **$525** | $3,115 | 5.93 |
| 2026-11-10 **HOY** | $71,014 | 126 | **$564** | $4,211 | 7.47 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($564 vs $525).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   564  =  $ 4,211  ÷  7.47
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,211 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.47 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $7,123 | 20% | 13 | $548 | 11.54 |
| RADIO - Seguridad / Negocios | $40,000 | $6,672 | 17% | 6 | $1,112 | 4.42 |
| Domiciliarios - API | $35,000 | $6,432 | 18% | 16 | $402 | 11.54 |
| Motorizados - Q58 | $29,000 | $5,906 | 20% | 9 | $656 | 4.44 |
| Domiciliarios - Expancion - API | $30,000 | $5,330 | 18% | 5 | $1,066 | 4.85 |
| Domiciliarios Q58 - | $25,000 | $4,992 | 20% | 4 | $1,248 | 3.07 |
| RADIO - Moteros | $35,000 | $4,576 | 13% | 4 | $1,144 | 4.67 |
| Motorizados - API | $20,000 | $4,417 | 22% | 6 | $736 | 5.59 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,290 | 17% | 11 | $390 | 6.98 |
| Domiciliarios VIDEO Q58 - | $25,000 | $3,786 | 15% | 3 | $1,262 | 2.89 |
| Domiciliarios INTER - API | $20,000 | $3,733 | 19% | 16 | $233 | 14.90 |
| Domiciliarios VIDEO - API | $20,000 | $3,513 | 18% | 11 | $319 | 13.25 |
| Motorizados - INTER | $25,000 | $3,012 | 12% | 10 | $301 | 18.80 |
| TEST Creativos - API | $20,000 | $2,446 | 12% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $2,272 | 8% | 8 | $284 | 9.95 |
| RADIO - Broad | $10,000 | $1,294 | 13% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $1,220 | 6% | 3 | $407 | 13.27 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $71,014 | 125 | **$568** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,443**/pedido |
| utilidad estimada de lo que va del día | **$129,643** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $701 | $685 | $528 | $565 | $640 | $548 | 🟢 |
| RADIO - Seguridad / Negocios | $831 | $976 | $1,003 | $914 | $867 | $1,112 | 🔴 |
| Domiciliarios - API | $495 | $449 | $453 | $430 | $499 | $402 | 🟢 |
| Motorizados - Q58 | $738 | $646 | $441 | $683 | $852 | $656 | 🟢 |
| Domiciliarios - Expancion - API | $555 | $536 | $641 | $543 | $548 | $1,066 | 🔴 |
| Domiciliarios Q58 - | $975 | $919 | $1,059 | $773 | $1,153 | $1,248 | 🟡 |
| RADIO - Moteros | $1,835 | $3,195 | $1,572 | $1,178 | $1,688 | $1,144 | 🟢 |
| Motorizados - API | $477 | $377 | $351 | $390 | $540 | $736 | 🔴 |
| Domiciliarios - Expancion - INTER | $618 | $432 | $621 | $512 | $682 | $390 | 🟢 |
| Domiciliarios VIDEO Q58 - | $701 | $619 | $741 | $581 | $696 | $1,262 | 🔴 |
| Domiciliarios INTER - API | $319 | $301 | $317 | $288 | $314 | $233 | 🟢 |
| Domiciliarios VIDEO - API | $326 | $327 | $363 | $344 | $411 | $319 | 🟢 |
| Motorizados - INTER | $524 | $540 | $517 | $460 | $556 | $301 | 🟢 |
| TEST Creativos - API | $780 | $662 | $425 | $629 | $680 | — | 🟡 |
| Domiciliarios - Expancion - Q58 | $307 | $258 | $295 | $265 | $313 | $284 | 🟢 |
| RADIO - Broad | $1,997 | $942 | $1,435 | $1,184 | $1,461 | — | 🔴 |
| RADIO - Fincas | $801 | $1,231 | $752 | $725 | $1,384 | $407 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 | 11-10 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 6.93 | 6.95 | 8.11 | 6.57 | 6.49 | 11.54 | 🟢 |
| RADIO - Seguridad / Negocios | 4.32 | 3.19 | 3.41 | 3.05 | 4.28 | 4.42 | 🟡 |
| Domiciliarios - API | 8.64 | 8.77 | 8.32 | 8.43 | 7.61 | 11.54 | 🟢 |
| Motorizados - Q58 | 3.07 | 2.94 | 4.45 | 2.40 | 2.64 | 4.44 | 🟢 |
| Domiciliarios - Expancion - API | 7.98 | 7.65 | 6.44 | 6.71 | 6.73 | 4.85 | 🔴 |
| Domiciliarios Q58 - | 4.32 | 3.03 | 2.54 | 3.14 | 2.67 | 3.07 | 🟢 |
| RADIO - Moteros | 1.94 | 1.13 | 2.45 | 2.63 | 2.38 | 4.67 | 🟢 |
| Motorizados - API | 7.85 | 9.51 | 8.93 | 7.88 | 5.66 | 5.59 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.10 | 4.91 | 3.36 | 3.65 | 3.59 | 6.98 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.90 | 4.63 | 3.43 | 3.96 | 3.28 | 2.89 | 🟡 |
| Domiciliarios INTER - API | 9.65 | 10.36 | 8.21 | 8.60 | 9.44 | 14.90 | 🟢 |
| Domiciliarios VIDEO - API | 9.54 | 9.47 | 8.74 | 7.31 | 7.68 | 13.25 | 🟢 |
| Motorizados - INTER | 11.50 | 10.43 | 9.79 | 8.69 | 8.43 | 18.80 | 🟢 |
| TEST Creativos - API | 6.18 | 6.64 | 11.59 | 7.61 | 8.46 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.54 | 8.12 | 7.82 | 7.28 | 6.48 | 9.95 | 🟢 |
| RADIO - Broad | 3.58 | 6.44 | 3.79 | 5.20 | 4.49 | — | 🟡 |
| RADIO - Fincas | 4.89 | 2.79 | 4.91 | 4.90 | 3.24 | 13.27 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,041 | 911 | $524 | $2,764 | 5.28 | $985,346 |
| 2026-11-09 | $469,955 | 752 | $625 | $3,266 | 5.23 | $737,196 |

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
