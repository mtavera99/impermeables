# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 14:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$261,144** |
| gastado hoy (hasta las 14h) | $153,899 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $339,108 |
| saldo proyectado a medianoche | $75,934 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $112,607 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $154,302 | 337 | **$458** | $3,257 | 7.11 |
| 2026-10-19 | $183,909 | 429 | **$429** | $2,828 | 6.60 |
| 2026-10-20 | $161,493 | 323 | **$500** | $3,300 | 6.60 |
| 2026-10-21 | $196,020 | 421 | **$466** | $3,957 | 8.50 |
| 2026-10-22 **HOY** | $153,899 | 362 | **$425** | $3,777 | 8.88 |

🟢 **Hoy va mejor que ayer a la misma hora** ($425 vs $466).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   425  =  $ 3,777  ÷  8.88
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,777 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.88 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $19,866 | 50% | 50 | $397 | 14.27 |
| Domiciliarios - Expancion - API | $40,000 | $18,890 | 47% | 48 | $394 | 11.29 |
| Domiciliarios - API | $35,000 | $18,465 | 53% | 63 | $293 | 15.19 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,772 | 47% | 11 | $1,070 | 2.74 |
| Domiciliarios - Expancion - Q58 | $25,000 | $10,836 | 43% | 12 | $903 | 4.44 |
| Motorizados - Q58 | $25,000 | $10,265 | 41% | 21 | $489 | 6.22 |
| Domiciliarios VIDEO - API | $20,000 | $10,196 | 51% | 31 | $329 | 9.24 |
| Domiciliarios VIDEO INTER - API | $25,000 | $10,084 | 40% | 15 | $672 | 6.24 |
| Domiciliarios INTER - API | $25,000 | $9,909 | 40% | 29 | $342 | 8.69 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,883 | 40% | 9 | $1,098 | 3.01 |
| Motorizados - API | $20,000 | $9,514 | 48% | 21 | $453 | 8.16 |
| Motorizados - INTER | $25,000 | $8,477 | 34% | 11 | $771 | 9.07 |
| Domiciliarios Q58 - | $25,000 | $5,742 | 23% | 41 | $140 | 14.22 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $153,899 | 362 | **$425** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,815**/pedido |
| utilidad estimada de lo que va del día | **$427,203** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $538 | $504 | $475 | $609 | $535 | $397 | 🟢 |
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $423 | $394 | 🟢 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $348 | $293 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $603 | $1,070 | 🔴 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,077 | $903 | 🟢 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,025 | $489 | 🟢 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $269 | $329 | 🔴 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $700 | $672 | 🟡 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $304 | $342 | 🟡 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $993 | $1,098 | 🟡 |
| Motorizados - API | $349 | $419 | $579 | $470 | $445 | $453 | 🟡 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $460 | $771 | 🔴 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $197 | $140 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.03 | 14.27 | 🟢 |
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.01 | 11.29 | 🟡 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.11 | 15.19 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.33 | 2.74 | 🔴 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.65 | 4.44 | 🟢 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.32 | 6.22 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.70 | 9.24 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 5.99 | 6.24 | 🟡 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.18 | 8.69 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.19 | 3.01 | 🟡 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.32 | 8.16 | 🟡 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.60 | 9.07 | 🔴 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.08 | 14.22 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,072 | 802 | $428 | $3,983 | 9.31 | $944,342 |

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
