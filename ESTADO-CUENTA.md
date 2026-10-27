# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-27 18:24 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$104,675** |
| gastado hoy (hasta las 18h) | $251,428 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $366,052 |
| saldo proyectado a medianoche | $-9,948 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $275,937 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-23 | $201,286 | 426 | **$473** | $3,575 | 7.57 |
| 2026-10-24 | $315,636 | 579 | **$545** | $3,581 | 6.57 |
| 2026-10-25 | $287,217 | 629 | **$457** | $3,577 | 7.83 |
| 2026-10-26 | $372,544 | 734 | **$508** | $3,304 | 6.51 |
| 2026-10-27 **HOY** | $251,374 | 557 | **$451** | $3,839 | 8.51 |

🟢 **Hoy va mejor que ayer a la misma hora** ($451 vs $508).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   451  =  $ 3,839  ÷  8.51
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,839 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.51 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $24,383 | 70% | 70 | $348 | 14.12 |
| Domiciliarios - Expancion - API | $30,000 | $24,065 | 80% | 35 | $688 | 6.69 |
| RADIO - Broad | $40,000 | $19,202 | 48% | 12 | $1,600 | 4.53 |
| Domiciliarios INTER - API | $20,000 | $16,391 | 82% | 52 | $315 | 8.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,386 | 66% | 23 | $712 | 5.29 |
| Domiciliarios - Expancion - INTER | $25,000 | $15,914 | 64% | 31 | $513 | 5.13 |
| Motorizados - INTER | $25,000 | $15,631 | 63% | 35 | $447 | 15.35 |
| Domiciliarios Q58 - | $25,000 | $14,375 | 57% | 58 | $248 | 8.76 |
| TEST Creativos - API | $20,000 | $13,546 | 68% | 31 | $437 | 12.24 |
| Domiciliarios - Expancion - Q58 | $24,000 | $13,373 | 56% | 54 | $248 | 10.53 |
| Motorizados - API | $20,000 | $13,236 | 66% | 41 | $323 | 13.67 |
| Motorizados - Q58 | $24,000 | $12,524 | 52% | 23 | $545 | 5.75 |
| Domiciliarios VIDEO - API | $20,000 | $12,137 | 61% | 45 | $270 | 14.17 |
| RADIO - Seguridad / Negocios | $25,000 | $11,558 | 46% | 11 | $1,051 | 4.83 |
| Domiciliarios VIDEO INTER - API | $30,000 | $10,918 | 36% | 16 | $682 | 7.24 |
| RADIO - Fincas | $20,000 | $9,241 | 46% | 12 | $770 | 5.14 |
| RADIO - Moteros | $20,000 | $8,188 | 41% | 8 | $1,024 | 3.73 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $251,068 | 557 | **$451** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,286**/pedido |
| utilidad estimada de lo que va del día | **$643,059** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $370 | $417 | $489 | $434 | $459 | $348 | 🟢 |
| Domiciliarios - Expancion - API | $444 | $517 | $691 | $518 | $576 | $688 | 🔴 |
| RADIO - Broad | — | — | — | — | — | $1,620 |  |
| Domiciliarios INTER - API | $314 | $332 | $462 | $366 | $332 | $315 | 🟢 |
| Domiciliarios VIDEO Q58 - | $1,091 | $679 | $795 | $829 | $870 | $712 | 🟢 |
| Domiciliarios - Expancion - INTER | $721 | $662 | $594 | $526 | $747 | $513 | 🟢 |
| Motorizados - INTER | $545 | $714 | $595 | $838 | $543 | $447 | 🟢 |
| Domiciliarios Q58 - | $159 | $217 | $204 | $185 | $211 | $248 | 🔴 |
| TEST Creativos - API | $379 | $480 | $395 | $526 | $490 | $437 | 🟢 |
| Domiciliarios - Expancion - Q58 | $892 | $1,117 | $876 | $286 | $241 | $248 | 🟡 |
| Motorizados - API | $379 | $456 | $436 | $431 | $426 | $324 | 🟢 |
| Motorizados - Q58 | $599 | $514 | $547 | $836 | $769 | $545 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $337 | $383 | $332 | $389 | $271 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | $1,170 | $750 | $1,000 | $1,051 | 🟡 |
| Domiciliarios VIDEO INTER - API | $742 | $646 | $490 | $661 | $519 | $682 | 🔴 |
| RADIO - Fincas | — | — | $630 | $434 | $707 | $770 | 🟡 |
| RADIO - Moteros | — | — | $919 | $926 | $1,068 | $1,024 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 12.13 | 9.61 | 8.16 | 10.50 | 9.11 | 14.12 | 🟢 |
| Domiciliarios - Expancion - API | 10.38 | 8.14 | 5.47 | 8.50 | 7.03 | 6.69 | 🟡 |
| RADIO - Broad | — | — | — | — | — | 4.46 |  |
| Domiciliarios INTER - API | 9.39 | 7.57 | 6.56 | 8.11 | 7.76 | 8.00 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.96 | 4.98 | 4.11 | 4.81 | 3.70 | 5.29 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.21 | 4.83 | 4.70 | 5.97 | 3.66 | 5.13 | 🟢 |
| Motorizados - INTER | 11.01 | 8.00 | 8.89 | 6.52 | 10.17 | 15.35 | 🟢 |
| Domiciliarios Q58 - | 12.89 | 10.68 | 10.24 | 11.43 | 9.12 | 8.76 | 🟡 |
| TEST Creativos - API | 14.31 | 8.92 | 8.50 | 6.95 | 9.25 | 12.24 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.52 | 3.93 | 4.47 | 8.73 | 9.37 | 10.53 | 🟢 |
| Motorizados - API | 10.45 | 8.59 | 8.65 | 9.54 | 8.77 | 13.61 | 🟢 |
| Motorizados - Q58 | 5.14 | 5.82 | 5.28 | 3.66 | 4.17 | 5.75 | 🟢 |
| Domiciliarios VIDEO - API | 10.98 | 9.18 | 7.54 | 9.93 | 7.54 | 14.10 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | 4.13 | 5.50 | 4.36 | 4.83 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.52 | 6.43 | 8.56 | 6.02 | 8.13 | 7.24 | 🟡 |
| RADIO - Fincas | — | — | 8.62 | 9.35 | 5.17 | 5.14 | 🟡 |
| RADIO - Moteros | — | — | 5.63 | 4.15 | 3.02 | 3.73 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,195 | 1022 | $475 | $3,300 | 6.95 | $1,155,375 |

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
