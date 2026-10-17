# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 16:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$208,409** |
| gastado hoy (hasta las 16h) | $191,628 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $309,674 |
| saldo proyectado a medianoche | $90,362 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $70,413 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $167,323 | 505 | **$331** | $3,514 | 10.61 |
| 2026-10-14 | $145,450 | 359 | **$405** | $3,391 | 8.37 |
| 2026-10-15 | $113,201 | 292 | **$388** | $3,038 | 7.84 |
| 2026-10-16 | $183,053 | 429 | **$427** | $3,287 | 7.70 |
| 2026-10-17 **HOY** | $191,628 | 440 | **$436** | $3,280 | 7.53 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($436 vs $427).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   436  =  $ 3,280  ÷  7.53
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,280 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.53 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $26,539 | 66% | 38 | $698 | 6.07 |
| Domiciliarios - Expancion - API | $40,000 | $26,049 | 65% | 55 | $474 | 7.81 |
| Domiciliarios - API | $35,000 | $24,143 | 69% | 62 | $389 | 9.81 |
| Motorizados - INTER | $20,000 | $13,263 | 66% | 25 | $531 | 7.94 |
| Motorizados - API | $20,000 | $12,757 | 64% | 35 | $364 | 9.17 |
| Domiciliarios VIDEO - API | $20,000 | $12,521 | 63% | 33 | $379 | 8.19 |
| Domiciliarios - Expancion - INTER | $20,000 | $12,096 | 60% | 29 | $417 | 4.70 |
| Domiciliarios INTER - API | $20,000 | $11,887 | 59% | 42 | $283 | 9.74 |
| Domiciliarios - Expancion - Q58 | $20,000 | $11,622 | 58% | 19 | $612 | 5.13 |
| Motorizados - Q58 | $20,000 | $11,421 | 57% | 24 | $476 | 6.67 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,299 | 56% | 24 | $471 | 7.56 |
| Domiciliarios VIDEO Q58 - | $20,000 | $10,322 | 52% | 19 | $543 | 5.00 |
| Domiciliarios Q58 - | $20,000 | $7,709 | 39% | 35 | $220 | 11.46 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $191,628 | 440 | **$436** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,006**/pedido |
| utilidad estimada de lo que va del día | **$514,684** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $698 | 🔴 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $474 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $389 | 🟡 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $531 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $364 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $379 | 🟡 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $417 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $283 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $612 | 🟢 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $476 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $471 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $543 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $220 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.69 | 6.07 | 🔴 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.56 | 7.81 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.73 | 9.81 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.28 | 7.94 | 🟡 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.36 | 9.17 | 🟡 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.78 | 8.19 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.70 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.04 | 9.74 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.76 | 5.13 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.67 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 7.56 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.03 | 5.00 | 🔴 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.87 | 11.46 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,100 | 7.29 | $876,670 |

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
