# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 17:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$254,456** |
| gastado hoy (hasta las 17h) | $274,431 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $382,710 |
| saldo proyectado a medianoche | $146,176 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $48,813 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $226,908 | 448 | **$506** | $3,399 | 6.71 |
| 2026-10-21 | $245,984 | 545 | **$451** | $3,977 | 8.81 |
| 2026-10-22 | $223,570 | 503 | **$444** | $3,741 | 8.42 |
| 2026-10-23 | $174,197 | 383 | **$455** | $3,542 | 7.79 |
| 2026-10-24 **HOY** | $274,431 | 518 | **$530** | $3,626 | 6.84 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($530 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   530  =  $ 3,626  ÷  6.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,626 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.84 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $24,777 | 62% | 34 | $729 | 5.32 |
| Domiciliarios - API | $35,000 | $23,846 | 68% | 44 | $542 | 7.68 |
| Domiciliarios - Expancion - Q58 | $20,000 | $23,238 | 116% | 25 | $930 | 4.34 |
| TEST Creativos - API | $20,000 | $21,476 | 107% | 52 | $413 | 8.27 |
| Domiciliarios VIDEO Q58 - | $25,000 | $17,858 | 71% | 21 | $850 | 3.87 |
| Motorizados - INTER | $25,000 | $17,472 | 70% | 31 | $564 | 9.65 |
| Domiciliarios - Expancion - INTER | $25,000 | $16,788 | 67% | 36 | $466 | 6.18 |
| Domiciliarios Q58 - | $25,000 | $16,630 | 67% | 72 | $231 | 8.84 |
| RADIO - Seguridad / Negocios | $25,000 | $16,395 | 66% | 13 | $1,261 | 4.01 |
| Domiciliarios INTER - API | $25,000 | $15,806 | 63% | 37 | $427 | 7.09 |
| Domiciliarios VIDEO INTER - API | $25,000 | $15,238 | 61% | 34 | $448 | 9.00 |
| RADIO - Moteros | $20,000 | $13,651 | 68% | 11 | $1,241 | 4.29 |
| Motorizados - API | $20,000 | $13,385 | 67% | 31 | $432 | 9.09 |
| RADIO - Fincas | $20,000 | $13,299 | 66% | 19 | $700 | 7.87 |
| Domiciliarios VIDEO - API | $20,000 | $12,948 | 65% | 38 | $341 | 8.35 |
| Motorizados - Q58 | $20,000 | $11,624 | 58% | 22 | $528 | 5.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $274,431 | 520 | **$528** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,701**/pedido |
| utilidad estimada de lo que va del día | **$560,301** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $516 | $729 | 🔴 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $417 | $542 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,117 | $930 | 🟢 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $413 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $679 | $850 | 🔴 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $714 | $564 | 🟢 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $662 | $466 | 🟢 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $217 | $231 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $1,261 |  |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $331 | $427 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $645 | $448 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | $1,241 |  |
| Motorizados - API | $579 | $470 | $446 | $379 | $456 | $432 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $700 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $341 | 🟡 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $513 | $528 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.14 | 5.32 | 🔴 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.61 | 7.68 | 🔴 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.93 | 4.34 | 🟢 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 8.27 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.98 | 3.87 | 🔴 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.00 | 9.65 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.83 | 6.18 | 🟢 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.69 | 8.84 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 4.01 |  |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.57 | 7.09 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.44 | 9.00 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | 4.29 |  |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.59 | 9.09 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | 7.87 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.18 | 8.35 | 🟡 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.82 | 5.89 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,050 | 630 | $472 | $3,552 | 7.53 | $714,260 |

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
