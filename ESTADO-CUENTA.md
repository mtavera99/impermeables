# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-30 20:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$107,161** |
| gastado hoy (hasta las 20h) | $322,509 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $378,240 |
| saldo proyectado a medianoche | $51,430 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $225,250 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-26 | $439,932 | 895 | **$492** | $3,264 | 6.64 |
| 2026-10-27 | $355,301 | 760 | **$468** | $3,885 | 8.31 |
| 2026-10-28 | $378,212 | 678 | **$558** | $3,709 | 6.65 |
| 2026-10-29 | $387,536 | 759 | **$511** | $3,629 | 7.11 |
| 2026-10-30 **HOY** | $322,509 | 591 | **$546** | $4,122 | 7.55 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($546 vs $511).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   546  =  $ 4,122  ÷  7.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,122 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.55 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $10,000 | $29,900 | 299% | 18 | $1,661 | 4.74 |
| RADIO - Seguridad / Negocios | $40,000 | $25,931 | 65% | 24 | $1,080 | 4.17 |
| Domiciliarios VIDEO INTER - API | $36,000 | $24,969 | 69% | 37 | $675 | 7.65 |
| RADIO - Moteros | $35,000 | $23,743 | 68% | 22 | $1,079 | 3.63 |
| Domiciliarios - API | $35,000 | $23,408 | 67% | 57 | $411 | 11.89 |
| Domiciliarios - Expancion - API | $30,000 | $21,301 | 71% | 35 | $609 | 7.99 |
| Motorizados - Q58 | $29,000 | $20,039 | 69% | 33 | $607 | 5.18 |
| Domiciliarios - Expancion - Q58 | $29,000 | $19,008 | 66% | 69 | $275 | 10.17 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,040 | 72% | 32 | $564 | 7.30 |
| Domiciliarios - Expancion - INTER | $25,000 | $17,389 | 70% | 34 | $511 | 6.83 |
| Motorizados - INTER | $25,000 | $16,714 | 67% | 20 | $836 | 8.57 |
| RADIO - Fincas | $20,000 | $16,712 | 84% | 15 | $1,114 | 3.68 |
| Domiciliarios INTER - API | $20,000 | $14,542 | 73% | 54 | $269 | 14.56 |
| Domiciliarios Q58 - | $25,000 | $13,796 | 55% | 77 | $179 | 13.53 |
| Motorizados - API | $20,000 | $13,467 | 67% | 21 | $641 | 6.59 |
| Domiciliarios VIDEO - API | $20,000 | $12,178 | 61% | 27 | $451 | 7.78 |
| TEST Creativos - API | $20,000 | $11,372 | 57% | 16 | $711 | 4.38 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $322,509 | 591 | **$546** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,031**/pedido |
| utilidad estimada de lo que va del día | **$626,196** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | $1,440 | $1,612 | $1,309 | $1,661 | 🔴 |
| RADIO - Seguridad / Negocios | $750 | $1,000 | $1,001 | $736 | $770 | $1,080 | 🔴 |
| Domiciliarios VIDEO INTER - API | $661 | $519 | $642 | $547 | $500 | $675 | 🔴 |
| RADIO - Moteros | $926 | $1,068 | $1,162 | $1,514 | $1,349 | $1,079 | 🟢 |
| Domiciliarios - API | $434 | $459 | $371 | $379 | $543 | $411 | 🟢 |
| Domiciliarios - Expancion - API | $518 | $576 | $671 | $746 | $465 | $609 | 🔴 |
| Motorizados - Q58 | $836 | $769 | $607 | $631 | $633 | $607 | 🟡 |
| Domiciliarios - Expancion - Q58 | $286 | $241 | $250 | $326 | $252 | $275 | 🟡 |
| Domiciliarios VIDEO Q58 - | $829 | $870 | $691 | $913 | $733 | $564 | 🟢 |
| Domiciliarios - Expancion - INTER | $526 | $747 | $499 | $643 | $685 | $511 | 🟢 |
| Motorizados - INTER | $838 | $543 | $532 | $547 | $496 | $836 | 🔴 |
| RADIO - Fincas | $434 | $707 | $751 | $752 | $1,545 | $1,114 | 🟢 |
| Domiciliarios INTER - API | $366 | $332 | $319 | $322 | $322 | $269 | 🟢 |
| Domiciliarios Q58 - | $185 | $211 | $202 | $199 | $193 | $179 | 🟢 |
| Motorizados - API | $431 | $426 | $359 | $459 | $524 | $641 | 🔴 |
| Domiciliarios VIDEO - API | $332 | $389 | $308 | $355 | $423 | $451 | 🟡 |
| TEST Creativos - API | $526 | $490 | $387 | $574 | $508 | $711 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | 4.76 | 3.50 | 5.18 | 4.74 | 🟡 |
| RADIO - Seguridad / Negocios | 5.50 | 4.36 | 5.10 | 6.39 | 6.46 | 4.17 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.02 | 8.12 | 7.83 | 8.47 | 8.21 | 7.65 | 🟡 |
| RADIO - Moteros | 4.15 | 3.02 | 3.39 | 2.80 | 3.09 | 3.63 | 🟢 |
| Domiciliarios - API | 10.50 | 9.11 | 13.28 | 12.74 | 7.95 | 11.89 | 🟢 |
| Domiciliarios - Expancion - API | 8.50 | 7.03 | 6.89 | 5.97 | 8.78 | 7.99 | 🟡 |
| Motorizados - Q58 | 3.66 | 4.17 | 4.49 | 3.47 | 4.69 | 5.18 | 🟢 |
| Domiciliarios - Expancion - Q58 | 8.73 | 9.37 | 10.69 | 7.51 | 9.44 | 10.17 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.70 | 5.31 | 4.28 | 5.08 | 7.30 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.97 | 3.66 | 5.15 | 4.81 | 4.37 | 6.83 | 🟢 |
| Motorizados - INTER | 6.52 | 10.17 | 13.22 | 11.22 | 10.87 | 8.57 | 🔴 |
| RADIO - Fincas | 9.35 | 5.16 | 5.51 | 4.83 | 2.47 | 3.68 | 🟢 |
| Domiciliarios INTER - API | 8.11 | 7.76 | 8.52 | 9.99 | 10.96 | 14.56 | 🟢 |
| Domiciliarios Q58 - | 11.43 | 9.12 | 10.98 | 10.83 | 10.39 | 13.53 | 🟢 |
| Motorizados - API | 9.54 | 8.76 | 12.17 | 9.23 | 7.42 | 6.59 | 🟡 |
| Domiciliarios VIDEO - API | 9.93 | 7.54 | 12.62 | 10.10 | 7.78 | 7.78 | 🟡 |
| TEST Creativos - API | 6.95 | 9.25 | 12.47 | 6.05 | 6.13 | 4.38 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,535 | 819 | $535 | $3,719 | 6.95 | $876,168 |
| 2026-10-29 | $438,676 | 870 | $504 | $3,673 | 7.28 | $957,895 |

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
