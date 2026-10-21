# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 21:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$128,534** |
| gastado hoy (hasta las 21h) | $346,681 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $369,646 |
| saldo proyectado a medianoche | $105,569 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $52,435 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $299,464 | 686 | **$437** | $3,120 | 7.15 |
| 2026-10-17 | $308,312 | 726 | **$425** | $3,095 | 7.29 |
| 2026-10-18 | $358,635 | 804 | **$446** | $3,120 | 7.00 |
| 2026-10-19 | $326,113 | 757 | **$431** | $3,047 | 7.07 |
| 2026-10-20 **HOY** | $346,681 | 746 | **$465** | $3,529 | 7.59 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($465 vs $431).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   465  =  $ 3,529  ÷  7.59
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,529 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.59 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $34,684 | 87% | 55 | $631 | 8.51 |
| Domiciliarios - Expancion - API | $40,000 | $31,583 | 79% | 52 | $607 | 7.27 |
| Domiciliarios Q58 - | $25,000 | $31,156 | 125% | 169 | $184 | 13.20 |
| Domiciliarios INTER - API | $25,000 | $29,411 | 118% | 90 | $327 | 10.95 |
| Domiciliarios VIDEO INTER - API | $25,000 | $29,114 | 116% | 50 | $582 | 7.44 |
| Domiciliarios VIDEO Q58 - | $25,000 | $28,798 | 115% | 48 | $600 | 3.95 |
| Motorizados - INTER | $25,000 | $28,263 | 113% | 45 | $628 | 8.25 |
| Motorizados - Q58 | $25,000 | $26,538 | 106% | 51 | $520 | 6.16 |
| Domiciliarios - API | $35,000 | $26,377 | 75% | 47 | $561 | 8.21 |
| Domiciliarios - Expancion - INTER | $25,000 | $25,967 | 104% | 38 | $683 | 4.17 |
| Domiciliarios - Expancion - Q58 | $25,000 | $25,731 | 103% | 22 | $1,170 | 2.59 |
| Domiciliarios VIDEO - API | $20,000 | $14,813 | 74% | 48 | $309 | 12.26 |
| Motorizados - API | $20,000 | $14,246 | 71% | 30 | $475 | 8.04 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $346,681 | 745 | **$465** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,554**/pedido |
| utilidad estimada de lo que va del día | **$849,233** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $631 | 🔴 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $485 | $607 | 🔴 |
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $184 | 🟡 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $240 | $327 | 🔴 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $534 | $582 | 🟡 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $600 | 🟡 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $479 | $628 | 🔴 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $732 | $520 | 🟢 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $464 | $561 | 🔴 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $683 | 🔴 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,462 | $1,170 | 🟢 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $430 | $309 | 🟢 |
| Motorizados - API | $380 | $344 | $349 | $419 | $579 | $475 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.85 | 8.51 | 🟡 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.80 | 7.27 | 🟡 |
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.71 | 13.20 | 🟡 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.33 | 10.95 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.43 | 7.44 | 🟢 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.02 | 3.95 | 🔴 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.02 | 8.25 | 🟡 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.15 | 6.16 | 🟢 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.58 | 8.21 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 4.17 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 2.59 | 🟢 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.55 | 12.26 | 🟢 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.69 | 8.04 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,388 | 796 | $431 | $3,066 | 7.11 | $934,394 |

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
