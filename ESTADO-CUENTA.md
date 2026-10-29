# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 20:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$225,057** |
| gastado hoy (hasta las 19h) | $330,636 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $406,297 |
| saldo proyectado a medianoche | $149,396 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🟠 Recargar $76,347 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $342,467 | 649 | **$528** | $3,560 | 6.75 |
| 2026-10-25 | $314,606 | 692 | **$455** | $3,573 | 7.86 |
| 2026-10-26 | $411,593 | 818 | **$503** | $3,272 | 6.50 |
| 2026-10-27 | $320,525 | 699 | **$459** | $3,876 | 8.45 |
| 2026-10-28 **HOY** | $330,636 | 608 | **$544** | $3,708 | 6.82 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($544 vs $459).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   544  =  $ 3,708  ÷  6.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,708 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $42,934 | 107% | 27 | $1,590 | 3.40 |
| Domiciliarios - API | $35,000 | $24,457 | 70% | 65 | $376 | 12.65 |
| Domiciliarios VIDEO INTER - API | $30,000 | $23,929 | 80% | 42 | $570 | 8.23 |
| Domiciliarios - Expancion - Q58 | $24,000 | $23,096 | 96% | 72 | $321 | 7.54 |
| Domiciliarios - Expancion - API | $30,000 | $22,346 | 74% | 24 | $931 | 4.64 |
| RADIO - Seguridad / Negocios | $25,000 | $19,583 | 78% | 21 | $933 | 5.00 |
| Motorizados - Q58 | $24,000 | $19,218 | 80% | 29 | $663 | 3.39 |
| RADIO - Moteros | $20,000 | $17,674 | 88% | 10 | $1,767 | 2.52 |
| Domiciliarios Q58 - | $25,000 | $16,905 | 68% | 86 | $197 | 10.87 |
| Motorizados - INTER | $25,000 | $16,741 | 67% | 30 | $558 | 11.66 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,645 | 67% | 17 | $979 | 4.06 |
| RADIO - Fincas | $20,000 | $16,632 | 83% | 24 | $693 | 5.19 |
| Domiciliarios - Expancion - INTER | $25,000 | $15,174 | 61% | 23 | $660 | 4.74 |
| TEST Creativos - API | $20,000 | $14,853 | 74% | 24 | $619 | 5.64 |
| Domiciliarios INTER - API | $20,000 | $14,159 | 71% | 47 | $301 | 10.97 |
| Motorizados - API | $20,000 | $13,149 | 66% | 26 | $506 | 8.26 |
| Domiciliarios VIDEO - API | $20,000 | $13,141 | 66% | 41 | $321 | 11.16 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $330,636 | 608 | **$544** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,996**/pedido |
| utilidad estimada de lo que va del día | **$645,359** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,439 | $1,590 | 🟡 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $376 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $642 | $570 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $250 | $321 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $671 | $931 | 🔴 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $996 | $933 | 🟢 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $663 | 🟡 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,162 | $1,767 | 🔴 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $202 | $197 | 🟡 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $532 | $558 | 🟡 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $691 | $979 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $750 | $693 | 🟢 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $660 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $387 | $619 | 🔴 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $319 | $301 | 🟢 |
| Motorizados - API | $456 | $436 | $431 | $426 | $359 | $506 | 🔴 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $321 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.76 | 3.40 | 🔴 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.28 | 12.65 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.83 | 8.23 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.69 | 7.54 | 🔴 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.89 | 4.64 | 🔴 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.10 | 5.00 | 🟡 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 3.39 | 🔴 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.39 | 2.52 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 10.99 | 10.87 | 🟡 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.22 | 11.66 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 4.06 | 🔴 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.51 | 5.19 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.15 | 4.74 | 🟡 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 5.64 | 🔴 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.52 | 10.97 | 🟢 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.17 | 8.26 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.62 | 11.16 | 🟡 |

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
| 2026-10-27 | $398,179 | 865 | $460 | $3,863 | 8.39 | $990,366 |

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
