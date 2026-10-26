# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 09:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$52,839** |
| gastado hoy (hasta las 9h) | $89,730 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $384,206 |
| saldo proyectado a medianoche | $-241,636 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $435,131 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $85,398 | 202 | **$423** | $3,841 | 9.08 |
| 2026-10-23 | $61,762 | 135 | **$457** | $3,321 | 7.26 |
| 2026-10-24 | $99,858 | 177 | **$564** | $3,493 | 6.19 |
| 2026-10-25 | $98,452 | 232 | **$424** | $3,323 | 7.83 |
| 2026-10-26 **HOY** | $89,730 | 186 | **$482** | $3,292 | 6.82 |

🟠 Hoy va 14% más caro que ayer a la misma hora ($482 vs $424).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   482  =  $ 3,292  ÷  6.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,292 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $10,083 | 25% | 18 | $560 | 6.76 |
| Domiciliarios - API | $35,000 | $8,595 | 25% | 19 | $452 | 9.01 |
| Domiciliarios INTER - API | $25,000 | $7,577 | 30% | 20 | $379 | 8.24 |
| Domiciliarios - Expancion - INTER | $25,000 | $6,581 | 26% | 3 | $2,194 | 1.40 |
| Domiciliarios VIDEO - API | $20,000 | $6,068 | 30% | 21 | $289 | 9.33 |
| Domiciliarios VIDEO Q58 - | $25,000 | $6,068 | 24% | 9 | $674 | 5.82 |
| TEST Creativos - API | $20,000 | $5,841 | 29% | 12 | $487 | 7.79 |
| Domiciliarios VIDEO INTER - API | $25,000 | $5,621 | 22% | 14 | $402 | 8.91 |
| Motorizados - API | $20,000 | $5,600 | 28% | 8 | $700 | 4.89 |
| Domiciliarios Q58 - | $25,000 | $5,231 | 21% | 20 | $262 | 6.85 |
| Motorizados - Q58 | $20,000 | $5,176 | 26% | 7 | $739 | 4.08 |
| RADIO - Seguridad / Negocios | $25,000 | $4,738 | 19% | 6 | $790 | 4.95 |
| RADIO - Fincas | $20,000 | $4,521 | 23% | 6 | $754 | 4.83 |
| Motorizados - INTER | $25,000 | $3,041 | 12% | 6 | $507 | 10.03 |
| Domiciliarios - Expancion - Q58 | $20,000 | $2,713 | 14% | 10 | $271 | 9.24 |
| RADIO - Moteros | $20,000 | $2,276 | 11% | 4 | $569 | 6.57 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $89,730 | 183 | **$490** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,013**/pedido |
| utilidad estimada de lo que va del día | **$204,032** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $517 | $560 | 🟡 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $433 | $452 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $362 | $379 | 🟡 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $525 | $2,194 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $289 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $827 | $674 | 🟢 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $487 | 🟢 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $660 | $402 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $430 | $700 | 🔴 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $184 | $262 | 🔴 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $835 | $739 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $747 | $790 | 🟡 |
| RADIO - Fincas | — | — | — | $630 | $431 | $754 | 🔴 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $834 | $507 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $285 | $271 | 🟡 |
| RADIO - Moteros | — | — | — | $919 | $923 | $569 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.53 | 6.76 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.55 | 9.01 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.16 | 8.24 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.99 | 1.40 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.97 | 9.33 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.82 | 5.82 | 🟢 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 7.79 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.04 | 8.91 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.58 | 4.89 | 🔴 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.49 | 6.85 | 🔴 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.08 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.53 | 4.95 | 🟡 |
| RADIO - Fincas | — | — | — | 8.62 | 9.43 | 4.83 | 🔴 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.57 | 10.03 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.75 | 9.24 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.16 | 6.57 | 🟢 |

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
| 2026-10-25 | $402,405 | 884 | $455 | $3,560 | 7.82 | $1,016,640 |

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
