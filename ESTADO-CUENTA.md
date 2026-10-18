# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 23:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$120,068** |
| gastado hoy (hasta las 23h) | $310,356 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $310,356 |
| saldo proyectado a medianoche | $120,068 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $40,026 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $246,905 | 791 | **$312** | $3,492 | 11.19 |
| 2026-10-14 | $233,678 | 645 | **$362** | $3,194 | 8.82 |
| 2026-10-15 | $216,313 | 561 | **$386** | $3,059 | 7.93 |
| 2026-10-16 | $316,034 | 743 | **$425** | $3,098 | 7.28 |
| 2026-10-17 **HOY** | $310,379 | 742 | **$418** | $3,099 | 7.41 |

🟢 **Hoy va mejor que ayer a la misma hora** ($418 vs $425).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   418  =  $ 3,099  ÷  7.41
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,099 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.41 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $43,078 | 108% | 80 | $538 | 7.17 |
| Domiciliarios - Expancion - API | $40,000 | $42,557 | 106% | 89 | $478 | 7.32 |
| Domiciliarios - API | $35,000 | $38,665 | 110% | 98 | $395 | 9.07 |
| Domiciliarios VIDEO - API | $20,000 | $22,804 | 114% | 63 | $362 | 8.20 |
| Motorizados - API | $20,000 | $21,641 | 108% | 62 | $349 | 8.97 |
| Domiciliarios INTER - API | $20,000 | $21,496 | 107% | 78 | $276 | 9.16 |
| Domiciliarios - Expancion - INTER | $20,000 | $19,682 | 98% | 46 | $428 | 4.24 |
| Motorizados - INTER | $20,000 | $19,567 | 98% | 37 | $529 | 7.24 |
| Domiciliarios VIDEO INTER - API | $20,000 | $19,434 | 97% | 44 | $442 | 7.83 |
| Motorizados - Q58 | $20,000 | $16,837 | 84% | 31 | $543 | 5.80 |
| Domiciliarios VIDEO Q58 - | $20,000 | $16,243 | 81% | 29 | $560 | 4.86 |
| Domiciliarios - Expancion - Q58 | $20,000 | $16,166 | 81% | 21 | $770 | 4.02 |
| Domiciliarios Q58 - | $20,000 | $12,214 | 61% | 64 | $191 | 13.26 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $310,384 | 742 | **$418** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,689**/pedido |
| utilidad estimada de lo que va del día | **$880,715** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $538 | 🟡 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $478 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $395 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $362 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $349 | 🟡 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $276 | 🟡 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $428 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $529 | 🟡 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $442 | 🟢 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $543 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $560 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $770 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $191 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.69 | 7.17 | 🟡 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.55 | 7.32 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.72 | 9.07 | 🟡 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.78 | 8.20 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.35 | 8.97 | 🟡 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.03 | 9.16 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.26 | 7.24 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 7.83 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 5.80 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.02 | 4.86 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.76 | 4.02 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.87 | 13.26 | 🟡 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |

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
