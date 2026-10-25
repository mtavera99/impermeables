# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 19:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$216,552** |
| gastado hoy (hasta las 19h) | $313,022 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $371,256 |
| saldo proyectado a medianoche | $158,318 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $48,126 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $295,793 | 598 | **$495** | $3,507 | 7.09 |
| 2026-10-21 | $287,512 | 656 | **$438** | $4,001 | 9.13 |
| 2026-10-22 | $265,457 | 611 | **$434** | $3,731 | 8.59 |
| 2026-10-23 | $232,506 | 484 | **$480** | $3,554 | 7.40 |
| 2026-10-24 **HOY** | $313,022 | 589 | **$531** | $3,604 | 6.78 |

🟠 Hoy va 11% más caro que ayer a la misma hora ($531 vs $480).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   531  =  $ 3,604  ÷  6.78
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,604 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.78 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $29,313 | 73% | 37 | $792 | 4.84 |
| Domiciliarios - API | $35,000 | $27,849 | 80% | 57 | $489 | 8.43 |
| Domiciliarios - Expancion - Q58 | $20,000 | $23,447 | 117% | 25 | $938 | 4.27 |
| TEST Creativos - API | $20,000 | $23,038 | 115% | 59 | $390 | 8.76 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,770 | 83% | 24 | $865 | 3.75 |
| Motorizados - INTER | $25,000 | $20,358 | 81% | 34 | $599 | 8.96 |
| Domiciliarios Q58 - | $25,000 | $19,566 | 78% | 84 | $233 | 8.89 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,336 | 77% | 36 | $537 | 5.34 |
| Domiciliarios INTER - API | $25,000 | $18,566 | 74% | 41 | $453 | 6.68 |
| Domiciliarios VIDEO INTER - API | $25,000 | $17,842 | 71% | 37 | $482 | 8.49 |
| RADIO - Seguridad / Negocios | $25,000 | $17,527 | 70% | 15 | $1,168 | 4.31 |
| Motorizados - API | $20,000 | $15,968 | 80% | 33 | $484 | 8.14 |
| RADIO - Moteros | $20,000 | $15,774 | 79% | 17 | $928 | 5.77 |
| Domiciliarios VIDEO - API | $20,000 | $15,024 | 75% | 45 | $334 | 8.56 |
| RADIO - Fincas | $20,000 | $14,346 | 72% | 21 | $683 | 8.14 |
| Motorizados - Q58 | $20,000 | $14,298 | 71% | 25 | $572 | 5.38 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $313,022 | 590 | **$531** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,753**/pedido |
| utilidad estimada de lo que va del día | **$634,078** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $516 | $792 | 🔴 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $417 | $489 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,117 | $938 | 🟢 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $390 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $679 | $865 | 🔴 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $714 | $599 | 🟢 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $217 | $233 | 🟡 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $662 | $537 | 🟢 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $332 | $453 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $646 | $482 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $1,168 |  |
| Motorizados - API | $579 | $470 | $446 | $379 | $456 | $484 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $928 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $334 | 🟡 |
| RADIO - Fincas | — | — | — | — | — | $683 |  |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $514 | $572 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.14 | 4.84 | 🔴 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.61 | 8.43 | 🟡 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.93 | 4.27 | 🟢 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 8.76 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.98 | 3.75 | 🔴 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.00 | 8.96 | 🟢 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.68 | 8.89 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.83 | 5.34 | 🟢 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.57 | 6.68 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.43 | 8.49 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 4.31 |  |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.59 | 8.14 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | 5.77 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.18 | 8.56 | 🟡 |
| RADIO - Fincas | — | — | — | — | — | 8.14 |  |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.82 | 5.38 | 🟡 |

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
| 2026-10-23 | $297,156 | 630 | $472 | $3,553 | 7.53 | $714,154 |

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
