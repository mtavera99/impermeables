# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 16:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$157,423** |
| gastado hoy (hasta las 16h) | $283,273 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $424,626 |
| saldo proyectado a medianoche | $16,070 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $137,004 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $205,327 | 469 | **$438** | $3,754 | 8.57 |
| 2026-10-23 | $156,811 | 347 | **$452** | $3,527 | 7.80 |
| 2026-10-24 | $265,312 | 465 | **$571** | $3,604 | 6.32 |
| 2026-10-25 | $240,586 | 532 | **$452** | $3,529 | 7.80 |
| 2026-10-26 **HOY** | $282,777 | 596 | **$474** | $3,426 | 7.22 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($474 vs $452).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   474  =  $ 3,426  ÷  7.22
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,426 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.22 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $31,327 | 78% | 49 | $639 | 6.32 |
| Domiciliarios - API | $35,000 | $25,794 | 74% | 63 | $409 | 10.19 |
| Domiciliarios INTER - API | $25,000 | $21,303 | 85% | 65 | $328 | 8.89 |
| Domiciliarios VIDEO Q58 - | $25,000 | $21,212 | 85% | 29 | $731 | 4.93 |
| Domiciliarios Q58 - | $25,000 | $20,450 | 82% | 84 | $243 | 8.10 |
| TEST Creativos - API | $20,000 | $18,865 | 94% | 43 | $439 | 9.80 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,339 | 73% | 24 | $764 | 4.10 |
| Domiciliarios VIDEO INTER - API | $25,000 | $17,727 | 71% | 33 | $537 | 7.79 |
| Motorizados - Q58 | $20,000 | $17,516 | 88% | 21 | $834 | 3.93 |
| RADIO - Seguridad / Negocios | $25,000 | $15,029 | 60% | 19 | $791 | 5.79 |
| Motorizados - API | $20,000 | $14,765 | 74% | 31 | $476 | 7.91 |
| Domiciliarios VIDEO - API | $20,000 | $14,643 | 73% | 40 | $366 | 7.76 |
| Motorizados - INTER | $25,000 | $14,354 | 57% | 24 | $598 | 9.62 |
| RADIO - Fincas | $20,000 | $12,480 | 62% | 20 | $624 | 6.03 |
| Domiciliarios - Expancion - Q58 | $20,000 | $11,628 | 58% | 45 | $258 | 9.25 |
| RADIO - Moteros | $20,000 | $7,437 | 37% | 6 | $1,240 | 2.70 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $282,869 | 596 | **$475** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,724**/pedido |
| utilidad estimada de lo que va del día | **$673,862** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $639 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $412 | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $328 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $731 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $244 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $439 | 🟢 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $764 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $537 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $834 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $791 | 🟡 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $476 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $366 | 🟡 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $602 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $434 | $628 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $258 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $925 | $1,242 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 6.32 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 10.12 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.12 | 8.89 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 4.93 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.44 | 8.07 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.80 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 4.10 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.03 | 7.79 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 3.93 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.51 | 5.79 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 7.91 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.76 | 🔴 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.53 | 9.57 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.36 | 5.99 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.25 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 2.69 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,740 | 884 | $457 | $3,560 | 7.79 | $1,015,305 |

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
