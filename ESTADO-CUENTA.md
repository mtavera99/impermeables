# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-25 20:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$230,929** |
| gastado hoy (hasta las 20h) | $313,448 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $342,240 |
| saldo proyectado a medianoche | $202,137 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $33,323 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-21 | $307,419 | 707 | **$435** | $3,999 | 9.20 |
| 2026-10-22 | $283,896 | 669 | **$424** | $3,722 | 8.77 |
| 2026-10-23 | $260,649 | 528 | **$494** | $3,559 | 7.21 |
| 2026-10-24 | $363,788 | 699 | **$520** | $3,553 | 6.83 |
| 2026-10-25 **HOY** | $313,448 | 697 | **$450** | $3,580 | 7.96 |

🟢 **Hoy va mejor que ayer a la misma hora** ($450 vs $520).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   450  =  $ 3,580  ÷  7.96
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,580 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.96 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $34,708 | 87% | 69 | $503 | 8.98 |
| Domiciliarios - API | $35,000 | $28,151 | 80% | 62 | $454 | 10.27 |
| Domiciliarios - Expancion - Q58 | $20,000 | $25,735 | 129% | 88 | $292 | 8.43 |
| Motorizados - INTER | $25,000 | $21,975 | 88% | 27 | $814 | 6.78 |
| Domiciliarios VIDEO INTER - API | $25,000 | $21,687 | 87% | 30 | $723 | 5.58 |
| Domiciliarios INTER - API | $25,000 | $19,541 | 78% | 53 | $369 | 8.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,450 | 78% | 36 | $540 | 6.00 |
| Domiciliarios Q58 - | $25,000 | $19,093 | 76% | 103 | $185 | 11.38 |
| RADIO - Moteros | $20,000 | $18,387 | 92% | 23 | $799 | 5.04 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,809 | 67% | 20 | $840 | 4.76 |
| TEST Creativos - API | $20,000 | $16,535 | 83% | 34 | $486 | 7.55 |
| Motorizados - API | $20,000 | $16,353 | 82% | 40 | $409 | 10.24 |
| Domiciliarios VIDEO - API | $20,000 | $15,924 | 80% | 44 | $362 | 9.54 |
| RADIO - Seguridad / Negocios | $25,000 | $14,743 | 59% | 24 | $614 | 6.46 |
| Motorizados - Q58 | $20,000 | $13,655 | 68% | 18 | $759 | 4.15 |
| RADIO - Fincas | $20,000 | $10,702 | 54% | 26 | $412 | 10.30 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $313,448 | 697 | **$450** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,267**/pedido |
| utilidad estimada de lo que va del día | **$805,414** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $583 | $424 | $444 | $517 | $691 | $503 | 🟢 |
| Domiciliarios - API | $484 | $348 | $370 | $417 | $489 | $454 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,121 | $1,077 | $892 | $1,117 | $876 | $292 | 🟢 |
| Motorizados - INTER | $591 | $460 | $545 | $714 | $595 | $814 | 🔴 |
| Domiciliarios VIDEO INTER - API | $576 | $701 | $742 | $646 | $490 | $723 | 🔴 |
| Domiciliarios INTER - API | $324 | $304 | $314 | $332 | $461 | $369 | 🟢 |
| Domiciliarios - Expancion - INTER | $629 | $604 | $721 | $662 | $594 | $540 | 🟢 |
| Domiciliarios Q58 - | $185 | $197 | $159 | $217 | $204 | $185 | 🟢 |
| RADIO - Moteros | — | — | — | — | $919 | $799 | 🟢 |
| Domiciliarios VIDEO Q58 - | $642 | $995 | $1,091 | $679 | $795 | $840 | 🟡 |
| TEST Creativos - API | $609 | $535 | $379 | $480 | $395 | $486 | 🔴 |
| Motorizados - API | $470 | $446 | $379 | $456 | $436 | $409 | 🟢 |
| Domiciliarios VIDEO - API | $319 | $269 | $292 | $337 | $383 | $362 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | $1,169 | $614 | 🟢 |
| Motorizados - Q58 | $545 | $1,025 | $599 | $514 | $547 | $759 | 🔴 |
| RADIO - Fincas | — | — | — | — | $630 | $412 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.58 | 11.99 | 10.38 | 8.14 | 5.47 | 8.98 | 🟢 |
| Domiciliarios - API | 9.53 | 14.10 | 12.13 | 9.61 | 8.16 | 10.27 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.71 | 3.65 | 4.52 | 3.93 | 4.47 | 8.43 | 🟢 |
| Motorizados - INTER | 8.76 | 13.59 | 11.01 | 8.00 | 8.89 | 6.78 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.46 | 5.98 | 5.52 | 6.43 | 8.56 | 5.58 | 🔴 |
| Domiciliarios INTER - API | 11.02 | 12.17 | 9.39 | 7.57 | 6.56 | 8.00 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.46 | 5.33 | 4.21 | 4.83 | 4.70 | 6.00 | 🟢 |
| Domiciliarios Q58 - | 13.11 | 11.07 | 12.89 | 10.68 | 10.24 | 11.38 | 🟢 |
| RADIO - Moteros | — | — | — | — | 5.63 | 5.04 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.62 | 3.19 | 2.96 | 4.98 | 4.11 | 4.76 | 🟢 |
| TEST Creativos - API | 8.80 | 11.03 | 14.31 | 8.92 | 8.50 | 7.55 | 🟡 |
| Motorizados - API | 8.05 | 9.31 | 10.45 | 8.59 | 8.66 | 10.24 | 🟢 |
| Domiciliarios VIDEO - API | 11.78 | 14.69 | 10.98 | 9.18 | 7.54 | 9.54 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | 4.13 | 6.46 | 🟢 |
| Motorizados - Q58 | 5.75 | 3.32 | 5.14 | 5.82 | 5.28 | 4.15 | 🔴 |
| RADIO - Fincas | — | — | — | — | 8.63 | 10.30 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,832 | 750 | $513 | $3,525 | 6.87 | $819,109 |

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
