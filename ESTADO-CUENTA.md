# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 10:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$26,693** |
| gastado hoy (hasta las 10h) | $115,374 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $390,252 |
| saldo proyectado a medianoche | $-248,184 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $435,633 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $102,878 | 244 | **$422** | $3,820 | 9.06 |
| 2026-10-23 | $76,658 | 158 | **$485** | $3,367 | 6.94 |
| 2026-10-24 | $119,483 | 215 | **$556** | $3,545 | 6.38 |
| 2026-10-25 | $118,315 | 267 | **$443** | $3,363 | 7.59 |
| 2026-10-26 **HOY** | $116,275 | 249 | **$467** | $3,347 | 7.17 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($467 vs $443).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   467  =  $ 3,347  ÷  7.17
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,347 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.17 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $13,056 | 33% | 22 | $593 | 6.47 |
| Domiciliarios - API | $35,000 | $11,173 | 32% | 24 | $466 | 8.87 |
| Domiciliarios INTER - API | $25,000 | $9,370 | 37% | 28 | $335 | 9.23 |
| Domiciliarios - Expancion - INTER | $25,000 | $8,620 | 34% | 10 | $862 | 3.68 |
| Domiciliarios VIDEO Q58 - | $25,000 | $8,613 | 34% | 11 | $783 | 4.91 |
| TEST Creativos - API | $20,000 | $7,931 | 40% | 20 | $397 | 9.90 |
| Domiciliarios VIDEO - API | $20,000 | $7,239 | 36% | 21 | $345 | 7.77 |
| Domiciliarios Q58 - | $25,000 | $7,235 | 29% | 30 | $241 | 7.80 |
| Domiciliarios VIDEO INTER - API | $25,000 | $7,214 | 29% | 15 | $481 | 7.64 |
| Motorizados - API | $20,000 | $6,760 | 34% | 11 | $615 | 5.58 |
| Motorizados - Q58 | $20,000 | $6,665 | 33% | 10 | $666 | 4.66 |
| RADIO - Seguridad / Negocios | $25,000 | $6,295 | 25% | 10 | $630 | 6.74 |
| RADIO - Fincas | $20,000 | $5,468 | 27% | 8 | $684 | 5.40 |
| Motorizados - INTER | $25,000 | $4,279 | 17% | 9 | $475 | 11.19 |
| Domiciliarios - Expancion - Q58 | $20,000 | $3,686 | 18% | 15 | $246 | 10.10 |
| RADIO - Moteros | $20,000 | $2,532 | 13% | 4 | $633 | 5.81 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $116,136 | 248 | **$468** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,608**/pedido |
| utilidad estimada de lo que va del día | **$281,967** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $517 | $593 | 🟡 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $433 | $471 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $362 | $339 | 🟢 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $525 | $862 | 🔴 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $827 | $783 | 🟢 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $397 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $346 | 🟡 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $184 | $241 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $660 | $481 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $430 | $617 | 🔴 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $835 | $666 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $748 | $630 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $431 | $684 | 🔴 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $834 | $475 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $285 | $248 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $924 | $633 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.52 | 6.47 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.54 | 8.79 | 🔴 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.16 | 9.09 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.98 | 3.68 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.82 | 4.91 | 🟡 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.90 | 🟢 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.97 | 7.72 | 🔴 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.48 | 7.80 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.04 | 7.64 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.57 | 5.54 | 🔴 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.66 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.53 | 6.74 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.41 | 5.40 | 🔴 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.56 | 11.19 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.75 | 9.93 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.16 | 5.81 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,856 | 750 | $513 | $3,525 | 6.87 | $819,085 |
| 2026-10-25 | $402,712 | 884 | $456 | $3,560 | 7.82 | $1,016,333 |

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
