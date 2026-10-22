# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 18:43 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$188,938** |
| gastado hoy (hasta las 18h) | $227,149 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $328,918 |
| saldo proyectado a medianoche | $87,170 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🟠 Recargar $82,963 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $248,791 | 535 | **$465** | $3,231 | 6.95 |
| 2026-10-19 | $259,204 | 601 | **$431** | $2,969 | 6.88 |
| 2026-10-20 | $258,042 | 512 | **$504** | $3,470 | 6.88 |
| 2026-10-21 | $266,602 | 598 | **$446** | $3,974 | 8.91 |
| 2026-10-22 **HOY** | $227,149 | 528 | **$430** | $3,741 | 8.70 |

🟢 **Hoy va mejor que ayer a la misma hora** ($430 vs $446).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   430  =  $ 3,741  ÷  8.70
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,741 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.70 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $25,605 | 64% | 58 | $441 | 10.47 |
| Domiciliarios - API | $35,000 | $25,434 | 73% | 74 | $344 | 13.16 |
| TEST Creativos - API | $30,000 | $25,381 | 85% | 67 | $379 | 14.99 |
| Domiciliarios - Expancion - INTER | $25,000 | $17,906 | 72% | 24 | $746 | 4.03 |
| Domiciliarios - Expancion - Q58 | $20,000 | $17,661 | 88% | 19 | $930 | 4.34 |
| Domiciliarios VIDEO INTER - API | $25,000 | $16,038 | 64% | 22 | $729 | 5.79 |
| Domiciliarios VIDEO Q58 - | $25,000 | $15,410 | 62% | 12 | $1,284 | 2.52 |
| Domiciliarios INTER - API | $25,000 | $15,169 | 61% | 50 | $303 | 9.83 |
| Motorizados - Q58 | $20,000 | $15,115 | 76% | 31 | $488 | 6.24 |
| Motorizados - INTER | $25,000 | $14,806 | 59% | 21 | $705 | 8.88 |
| Domiciliarios VIDEO - API | $20,000 | $13,393 | 67% | 39 | $343 | 9.14 |
| Motorizados - API | $20,000 | $13,163 | 66% | 37 | $356 | 10.72 |
| Domiciliarios Q58 - | $25,000 | $12,068 | 48% | 74 | $163 | 12.22 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $227,149 | 528 | **$430** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,908**/pedido |
| utilidad estimada de lo que va del día | **$620,425** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $424 | $441 | 🟡 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $348 | $344 | 🟡 |
| TEST Creativos - API | $538 | $504 | $475 | $609 | $535 | $379 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $604 | $746 | 🔴 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,077 | $930 | 🟢 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $700 | $729 | 🟡 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $995 | $1,284 | 🔴 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $304 | $303 | 🟡 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,025 | $488 | 🟢 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $460 | $705 | 🔴 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $269 | $343 | 🔴 |
| Motorizados - API | $349 | $419 | $579 | $470 | $445 | $356 | 🟢 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $197 | $163 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.00 | 10.47 | 🟡 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.11 | 13.16 | 🟡 |
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.03 | 14.99 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.33 | 4.03 | 🔴 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.65 | 4.34 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 5.98 | 5.79 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.19 | 2.52 | 🔴 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.17 | 9.83 | 🔴 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.32 | 6.24 | 🟢 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.60 | 8.88 | 🔴 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.69 | 9.14 | 🔴 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.31 | 10.72 | 🟢 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.07 | 12.22 | 🟢 |

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
| 2026-10-21 | $343,321 | 802 | $428 | $3,984 | 9.31 | $944,093 |

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
