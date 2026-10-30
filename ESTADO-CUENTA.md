# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-29 23:08 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$143,606** |
| gastado hoy (hasta las 23h) | $423,861 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $423,861 |
| saldo proyectado a medianoche | $143,606 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🟠 Recargar $64,573 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-25 | $403,813 | 884 | **$457** | $3,558 | 7.79 |
| 2026-10-26 | $485,261 | 1022 | **$475** | $3,300 | 6.95 |
| 2026-10-27 | $398,322 | 865 | **$460** | $3,864 | 8.39 |
| 2026-10-28 | $438,516 | 819 | **$535** | $3,719 | 6.95 |
| 2026-10-29 **HOY** | $423,861 | 849 | **$499** | $3,658 | 7.33 |

🟢 **Hoy va mejor que ayer a la misma hora** ($499 vs $535).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   499  =  $ 3,658  ÷  7.33
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,658 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.33 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $47,422 | 119% | 38 | $1,248 | 5.39 |
| Domiciliarios - API | $35,000 | $31,900 | 91% | 58 | $550 | 7.78 |
| Domiciliarios VIDEO INTER - API | $30,000 | $30,678 | 102% | 60 | $511 | 8.05 |
| Domiciliarios - Expancion - API | $30,000 | $29,210 | 97% | 62 | $471 | 8.58 |
| Domiciliarios Q58 - | $25,000 | $26,289 | 105% | 138 | $190 | 10.52 |
| RADIO - Seguridad / Negocios | $25,000 | $26,108 | 104% | 35 | $746 | 6.64 |
| Domiciliarios VIDEO Q58 - | $25,000 | $25,138 | 101% | 35 | $718 | 5.17 |
| Domiciliarios - Expancion - Q58 | $24,000 | $24,615 | 103% | 100 | $246 | 9.63 |
| Motorizados - INTER | $25,000 | $24,355 | 97% | 49 | $497 | 10.88 |
| Domiciliarios - Expancion - INTER | $25,000 | $24,340 | 97% | 36 | $676 | 4.43 |
| Domiciliarios VIDEO - API | $20,000 | $19,903 | 100% | 47 | $423 | 7.74 |
| Motorizados - Q58 | $24,000 | $19,672 | 82% | 32 | $615 | 4.82 |
| TEST Creativos - API | $20,000 | $19,548 | 98% | 38 | $514 | 6.06 |
| Domiciliarios INTER - API | $20,000 | $19,520 | 98% | 60 | $325 | 10.79 |
| RADIO - Moteros | $20,000 | $19,224 | 96% | 15 | $1,282 | 3.25 |
| Motorizados - API | $20,000 | $18,256 | 91% | 34 | $537 | 7.26 |
| RADIO - Fincas | $20,000 | $17,683 | 88% | 12 | $1,474 | 2.57 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $423,861 | 849 | **$499** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,177**/pedido |
| utilidad estimada de lo que va del día | **$939,000** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | $1,440 | $1,612 | $1,248 | 🟢 |
| Domiciliarios - API | $489 | $434 | $459 | $371 | $379 | $550 | 🔴 |
| Domiciliarios VIDEO INTER - API | $490 | $661 | $519 | $642 | $547 | $511 | 🟢 |
| Domiciliarios - Expancion - API | $691 | $518 | $576 | $671 | $746 | $471 | 🟢 |
| Domiciliarios Q58 - | $204 | $185 | $211 | $202 | $199 | $190 | 🟡 |
| RADIO - Seguridad / Negocios | $1,170 | $750 | $1,000 | $1,001 | $736 | $746 | 🟡 |
| Domiciliarios VIDEO Q58 - | $795 | $829 | $870 | $691 | $913 | $718 | 🟢 |
| Domiciliarios - Expancion - Q58 | $876 | $286 | $241 | $250 | $326 | $246 | 🟢 |
| Motorizados - INTER | $595 | $838 | $543 | $532 | $547 | $497 | 🟢 |
| Domiciliarios - Expancion - INTER | $594 | $526 | $747 | $499 | $643 | $676 | 🟡 |
| Domiciliarios VIDEO - API | $383 | $332 | $389 | $308 | $355 | $423 | 🔴 |
| Motorizados - Q58 | $547 | $836 | $769 | $607 | $631 | $615 | 🟡 |
| TEST Creativos - API | $395 | $526 | $490 | $387 | $574 | $514 | 🟢 |
| Domiciliarios INTER - API | $462 | $366 | $332 | $319 | $322 | $325 | 🟡 |
| RADIO - Moteros | $919 | $926 | $1,068 | $1,162 | $1,514 | $1,282 | 🟢 |
| Motorizados - API | $436 | $431 | $426 | $359 | $459 | $537 | 🔴 |
| RADIO - Fincas | $630 | $434 | $707 | $751 | $752 | $1,474 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | 4.76 | 3.50 | 5.39 | 🟢 |
| Domiciliarios - API | 8.16 | 10.50 | 9.11 | 13.28 | 12.74 | 7.78 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.56 | 6.02 | 8.12 | 7.83 | 8.47 | 8.05 | 🟡 |
| Domiciliarios - Expancion - API | 5.47 | 8.50 | 7.03 | 6.89 | 5.97 | 8.58 | 🟢 |
| Domiciliarios Q58 - | 10.24 | 11.43 | 9.12 | 10.98 | 10.83 | 10.52 | 🟡 |
| RADIO - Seguridad / Negocios | 4.13 | 5.50 | 4.36 | 5.10 | 6.39 | 6.64 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.11 | 4.81 | 3.70 | 5.31 | 4.28 | 5.17 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.47 | 8.73 | 9.37 | 10.69 | 7.51 | 9.63 | 🟢 |
| Motorizados - INTER | 8.89 | 6.52 | 10.17 | 13.22 | 11.22 | 10.88 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.70 | 5.97 | 3.66 | 5.15 | 4.81 | 4.43 | 🟡 |
| Domiciliarios VIDEO - API | 7.54 | 9.93 | 7.54 | 12.62 | 10.10 | 7.74 | 🔴 |
| Motorizados - Q58 | 5.28 | 3.66 | 4.17 | 4.49 | 3.47 | 4.82 | 🟢 |
| TEST Creativos - API | 8.50 | 6.95 | 9.25 | 12.47 | 6.05 | 6.06 | 🟡 |
| Domiciliarios INTER - API | 6.56 | 8.11 | 7.76 | 8.52 | 9.99 | 10.79 | 🟢 |
| RADIO - Moteros | 5.63 | 4.15 | 3.02 | 3.39 | 2.80 | 3.25 | 🟢 |
| Motorizados - API | 8.65 | 9.54 | 8.76 | 12.17 | 9.23 | 7.26 | 🔴 |
| RADIO - Fincas | 8.62 | 9.35 | 5.16 | 5.51 | 4.83 | 2.57 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,516 | 819 | $535 | $3,719 | 6.95 | $876,187 |

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
