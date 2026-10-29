# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 22:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$160,541** |
| gastado hoy (hasta las 22h) | $396,149 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $403,126 |
| saldo proyectado a medianoche | $153,564 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🟠 Recargar $75,350 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $383,912 | 745 | **$515** | $3,528 | 6.85 |
| 2026-10-25 | $392,941 | 852 | **$461** | $3,555 | 7.71 |
| 2026-10-26 | $478,058 | 998 | **$479** | $3,296 | 6.88 |
| 2026-10-27 | $391,544 | 850 | **$461** | $3,870 | 8.40 |
| 2026-10-28 **HOY** | $396,149 | 727 | **$545** | $3,715 | 6.82 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($545 vs $461).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   545  =  $ 3,715  ÷  6.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,715 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $51,625 | 129% | 33 | $1,564 | 3.53 |
| Domiciliarios VIDEO INTER - API | $30,000 | $28,438 | 95% | 54 | $527 | 8.86 |
| Domiciliarios - API | $35,000 | $28,387 | 81% | 73 | $389 | 12.30 |
| Domiciliarios - Expancion - Q58 | $24,000 | $26,836 | 112% | 84 | $319 | 7.67 |
| Domiciliarios - Expancion - API | $30,000 | $26,555 | 89% | 32 | $830 | 5.29 |
| RADIO - Seguridad / Negocios | $25,000 | $24,602 | 98% | 29 | $848 | 5.53 |
| Motorizados - Q58 | $24,000 | $22,671 | 94% | 36 | $630 | 3.55 |
| Domiciliarios Q58 - | $25,000 | $21,236 | 85% | 97 | $219 | 9.81 |
| Motorizados - INTER | $25,000 | $20,959 | 84% | 35 | $599 | 10.52 |
| RADIO - Moteros | $20,000 | $20,778 | 104% | 13 | $1,598 | 2.75 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,217 | 81% | 24 | $842 | 4.71 |
| RADIO - Fincas | $20,000 | $20,057 | 100% | 27 | $743 | 4.83 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,341 | 73% | 28 | $655 | 4.76 |
| TEST Creativos - API | $20,000 | $17,336 | 87% | 30 | $578 | 5.98 |
| Domiciliarios INTER - API | $20,000 | $17,158 | 86% | 51 | $336 | 9.61 |
| Motorizados - API | $20,000 | $15,591 | 78% | 35 | $445 | 9.36 |
| Domiciliarios VIDEO - API | $20,000 | $15,362 | 77% | 44 | $349 | 10.20 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $396,149 | 725 | **$546** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,044**/pedido |
| utilidad estimada de lo que va del día | **$767,660** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,439 | $1,564 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $642 | $527 | 🟢 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $389 | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $250 | $319 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $671 | $830 | 🔴 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $1,001 | $848 | 🟢 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $630 | 🟡 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $202 | $219 | 🟡 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $532 | $599 | 🟡 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,162 | $1,598 | 🔴 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $691 | $842 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $751 | $743 | 🟡 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $655 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $387 | $578 | 🔴 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $319 | $336 | 🟡 |
| Motorizados - API | $456 | $436 | $431 | $426 | $359 | $445 | 🔴 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $349 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.76 | 3.53 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.83 | 8.86 | 🟢 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.28 | 12.30 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.69 | 7.67 | 🔴 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.89 | 5.29 | 🔴 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.10 | 5.53 | 🟢 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 3.55 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 10.98 | 9.81 | 🟡 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.22 | 10.52 | 🔴 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.39 | 2.75 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 4.71 | 🟡 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.51 | 4.83 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.15 | 4.76 | 🟡 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 5.98 | 🔴 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.52 | 9.61 | 🟢 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.17 | 9.36 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.62 | 10.20 | 🔴 |

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
| 2026-10-27 | $398,296 | 865 | $460 | $3,864 | 8.39 | $990,249 |

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
