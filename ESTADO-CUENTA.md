# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 21:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$190,292** |
| gastado hoy (hasta las 20h) | $365,609 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $409,778 |
| saldo proyectado a medianoche | $146,123 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🟠 Recargar $76,139 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $363,809 | 699 | **$520** | $3,553 | 6.83 |
| 2026-10-25 | $345,382 | 757 | **$456** | $3,565 | 7.81 |
| 2026-10-26 | $439,932 | 895 | **$492** | $3,264 | 6.64 |
| 2026-10-27 | $355,277 | 760 | **$467** | $3,885 | 8.31 |
| 2026-10-28 **HOY** | $365,609 | 669 | **$547** | $3,716 | 6.80 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($547 vs $467).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   547  =  $ 3,716  ÷  6.80
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,716 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.80 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $48,226 | 121% | 30 | $1,608 | 3.44 |
| Domiciliarios - API | $35,000 | $26,593 | 76% | 67 | $397 | 12.04 |
| Domiciliarios VIDEO INTER - API | $30,000 | $26,310 | 88% | 50 | $526 | 8.97 |
| Domiciliarios - Expancion - Q58 | $24,000 | $25,278 | 105% | 81 | $312 | 7.78 |
| Domiciliarios - Expancion - API | $30,000 | $24,601 | 82% | 28 | $879 | 4.96 |
| RADIO - Seguridad / Negocios | $25,000 | $22,013 | 88% | 23 | $957 | 4.82 |
| Motorizados - Q58 | $24,000 | $20,962 | 87% | 34 | $617 | 3.64 |
| Domiciliarios Q58 - | $25,000 | $19,335 | 77% | 92 | $210 | 10.18 |
| RADIO - Moteros | $20,000 | $19,335 | 97% | 11 | $1,758 | 2.54 |
| Motorizados - INTER | $25,000 | $18,870 | 75% | 32 | $590 | 10.80 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,635 | 75% | 20 | $932 | 4.30 |
| RADIO - Fincas | $20,000 | $18,431 | 92% | 26 | $709 | 5.06 |
| Domiciliarios - Expancion - INTER | $25,000 | $16,744 | 67% | 25 | $670 | 4.67 |
| TEST Creativos - API | $20,000 | $16,193 | 81% | 27 | $600 | 5.79 |
| Domiciliarios INTER - API | $20,000 | $15,669 | 78% | 48 | $326 | 9.95 |
| Motorizados - API | $20,000 | $14,235 | 71% | 33 | $431 | 9.62 |
| Domiciliarios VIDEO - API | $20,000 | $14,179 | 71% | 42 | $338 | 10.57 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $365,609 | 669 | **$547** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,046**/pedido |
| utilidad estimada de lo que va del día | **$708,306** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,439 | $1,608 | 🟡 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $397 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $642 | $526 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $250 | $312 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $671 | $879 | 🔴 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $1,001 | $957 | 🟡 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $617 | 🟡 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $202 | $210 | 🟡 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,162 | $1,758 | 🔴 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $532 | $590 | 🟡 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $691 | $932 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $750 | $709 | 🟢 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $670 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $387 | $600 | 🔴 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $319 | $326 | 🟡 |
| Motorizados - API | $456 | $436 | $431 | $426 | $359 | $431 | 🔴 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $338 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.76 | 3.44 | 🔴 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.28 | 12.04 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.83 | 8.97 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.69 | 7.78 | 🔴 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.89 | 4.96 | 🔴 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.10 | 4.82 | 🟡 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 3.64 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 10.98 | 10.18 | 🟡 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.39 | 2.54 | 🔴 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.22 | 10.80 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 4.30 | 🔴 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.51 | 5.06 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.15 | 4.67 | 🟡 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 5.79 | 🔴 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.52 | 9.95 | 🟢 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.17 | 9.62 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.62 | 10.57 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,286 | 865 | $460 | $3,864 | 8.39 | $990,259 |

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
