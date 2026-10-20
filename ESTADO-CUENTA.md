# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 14:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$131,383** |
| gastado hoy (hasta las 14h) | $142,538 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $338,624 |
| saldo proyectado a medianoche | $-64,704 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $253,729 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $153,584 | 375 | **$410** | $3,267 | 7.98 |
| 2026-10-17 | $160,819 | 370 | **$435** | $3,257 | 7.49 |
| 2026-10-18 | $154,302 | 337 | **$458** | $3,257 | 7.11 |
| 2026-10-19 | $183,909 | 429 | **$429** | $2,828 | 6.60 |
| 2026-10-20 **HOY** | $142,538 | 293 | **$486** | $3,321 | 6.83 |

🟠 Hoy va 13% más caro que ayer a la misma hora ($486 vs $429).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   486  =  $ 3,321  ÷  6.83
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,321 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.83 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO Q58 - | $25,000 | $15,281 | 61% | 26 | $588 | 4.41 |
| Domiciliarios Q58 - | $25,000 | $13,852 | 55% | 75 | $185 | 12.95 |
| Domiciliarios VIDEO INTER - API | $25,000 | $13,193 | 53% | 18 | $733 | 5.42 |
| Domiciliarios - Expancion - Q58 | $25,000 | $13,188 | 53% | 13 | $1,014 | 2.79 |
| TEST Creativos - API | $40,000 | $12,810 | 32% | 23 | $557 | 8.83 |
| Motorizados - INTER | $25,000 | $12,170 | 49% | 11 | $1,106 | 4.57 |
| Domiciliarios INTER - API | $25,000 | $12,162 | 49% | 38 | $320 | 9.90 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,657 | 47% | 18 | $648 | 4.11 |
| Motorizados - Q58 | $25,000 | $10,916 | 44% | 21 | $520 | 6.33 |
| Domiciliarios - Expancion - API | $40,000 | $9,367 | 23% | 17 | $551 | 7.51 |
| Domiciliarios - API | $35,000 | $9,349 | 27% | 15 | $623 | 7.10 |
| Motorizados - API | $20,000 | $4,856 | 24% | 8 | $607 | 6.23 |
| Domiciliarios VIDEO - API | $20,000 | $3,737 | 19% | 10 | $374 | 9.57 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $142,538 | 293 | **$486** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,943**/pedido |
| utilidad estimada de lo que va del día | **$327,801** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $588 | 🟡 |
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $185 | 🟡 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $533 | $733 | 🔴 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,462 | $1,014 | 🟢 |
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $557 | 🔴 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $478 | $1,106 | 🔴 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $240 | $320 | 🔴 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $648 | 🔴 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $730 | $520 | 🟢 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $484 | $551 | 🟡 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $464 | $623 | 🔴 |
| Motorizados - API | $380 | $344 | $349 | $419 | $578 | $607 | 🟡 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $430 | $374 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.02 | 4.41 | 🟡 |
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.72 | 12.95 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.43 | 5.42 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 2.79 | 🟢 |
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.85 | 8.83 | 🟡 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.04 | 4.57 | 🔴 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.33 | 9.90 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 4.11 | 🔴 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.16 | 6.33 | 🟢 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.81 | 7.51 | 🟡 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.58 | 7.10 | 🟡 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.70 | 6.23 | 🟢 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.55 | 9.57 | 🟢 |

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
| 2026-10-19 | $343,094 | 796 | $431 | $3,066 | 7.11 | $934,688 |

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
