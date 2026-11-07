# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 17:30 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$264,023** |
| gastado hoy (hasta las 17h) | $246,918 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $425,910 |
| saldo proyectado a medianoche | $85,031 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $143,979 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $259,342 | 465 | **$558** | $2,859 | 5.13 |
| 2026-11-04 | $211,824 | 313 | **$677** | $4,307 | 6.36 |
| 2026-11-05 | $296,637 | 457 | **$649** | $3,887 | 5.99 |
| 2026-11-06 | $290,124 | 501 | **$579** | $3,274 | 5.65 |
| 2026-11-07 **HOY** | $247,543 | 425 | **$582** | $3,480 | 5.98 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($582 vs $579).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   582  =  $ 3,480  ÷  5.98
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,480 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.98 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Moteros | $35,000 | $21,430 | 61% | 9 | $2,381 | 1.88 |
| RADIO - Seguridad / Negocios | $40,000 | $21,029 | 53% | 19 | $1,107 | 3.50 |
| Domiciliarios VIDEO INTER - API | $36,000 | $20,583 | 57% | 38 | $542 | 8.01 |
| Domiciliarios - API | $35,000 | $19,750 | 56% | 39 | $506 | 8.04 |
| Domiciliarios - Expancion - API | $30,000 | $16,953 | 57% | 22 | $771 | 5.70 |
| Domiciliarios - Expancion - Q58 | $29,000 | $16,627 | 57% | 44 | $378 | 6.45 |
| Motorizados - Q58 | $29,000 | $15,492 | 53% | 38 | $408 | 5.47 |
| Domiciliarios VIDEO Q58 - | $25,000 | $15,192 | 61% | 20 | $760 | 3.75 |
| Motorizados - INTER | $25,000 | $14,537 | 58% | 27 | $538 | 10.27 |
| Domiciliarios Q58 - | $25,000 | $13,796 | 55% | 12 | $1,150 | 2.74 |
| Domiciliarios - Expancion - INTER | $25,000 | $13,148 | 53% | 22 | $598 | 4.09 |
| Domiciliarios VIDEO - API | $20,000 | $11,627 | 58% | 29 | $401 | 8.42 |
| TEST Creativos - API | $20,000 | $11,532 | 58% | 24 | $480 | 11.61 |
| Motorizados - API | $20,000 | $11,086 | 55% | 29 | $382 | 8.46 |
| Domiciliarios INTER - API | $20,000 | $10,589 | 53% | 34 | $311 | 9.14 |
| RADIO - Fincas | $20,000 | $9,858 | 49% | 14 | $704 | 5.61 |
| RADIO - Broad | $10,000 | $4,302 | 43% | 5 | $860 | 6.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $247,531 | 425 | **$582** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,706**/pedido |
| utilidad estimada de lo que va del día | **$434,702** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,193 | $2,381 | 🟢 |
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $975 | $1,107 | 🟡 |
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $685 | $542 | 🟢 |
| Domiciliarios - API | $597 | $511 | $426 | $495 | $449 | $509 | 🟡 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $536 | $771 | 🔴 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $258 | $378 | 🔴 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $646 | $410 | 🟢 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $619 | $760 | 🔴 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $540 | $538 | 🟡 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $918 | $1,156 | 🔴 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $432 | $598 | 🔴 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $327 | $403 | 🔴 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $481 | 🟢 |
| Motorizados - API | $526 | $390 | $582 | $477 | $377 | $385 | 🟡 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $301 | $312 | 🟡 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,231 | $704 | 🟢 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $941 | $861 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.13 | 1.88 | 🟢 |
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.20 | 3.50 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.96 | 8.01 | 🟢 |
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.78 | 8.00 | 🟡 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.66 | 5.70 | 🔴 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.13 | 6.45 | 🔴 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 5.43 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 3.75 | 🔴 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.43 | 10.27 | 🟡 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 2.72 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.92 | 4.09 | 🔴 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.47 | 8.35 | 🟡 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 11.57 | 🟢 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.52 | 8.39 | 🟡 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.36 | 9.12 | 🟡 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.79 | 5.61 | 🟢 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.46 | 6.40 | 🟡 |

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
| 2026-11-06 | $431,786 | 793 | $544 | $3,186 | 5.85 | $841,181 |

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
