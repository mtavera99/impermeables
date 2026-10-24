# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 06:14 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$129,667** |
| gastado hoy (hasta las 6h) | $21,026 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $297,204 |
| saldo proyectado a medianoche | $-146,511 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $441,307 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $26,191 | 50 | **$524** | $3,292 | 6.28 |
| 2026-10-21 | $42,951 | 95 | **$452** | $3,641 | 8.05 |
| 2026-10-22 | $34,294 | 91 | **$377** | $3,788 | 10.05 |
| 2026-10-23 | $25,661 | 63 | **$407** | $3,308 | 8.12 |
| 2026-10-24 **HOY** | $21,026 | 33 | **$637** | $3,360 | 5.27 |

🟠 Hoy va 56% más caro que ayer a la misma hora ($637 vs $407).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   637  =  $ 3,360  ÷  5.27
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,360 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.27 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $2,139 | 5% | 2 | $1,070 | 3.28 |
| Domiciliarios - API | $35,000 | $2,110 | 6% | 2 | $1,055 | 3.62 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,606 | 6% | 4 | $402 | 7.39 |
| RADIO - Moteros | $20,000 | $1,598 | 8% | 3 | $533 | 8.20 |
| Domiciliarios VIDEO - API | $20,000 | $1,490 | 7% | 4 | $372 | 6.68 |
| Domiciliarios INTER - API | $25,000 | $1,415 | 6% | 1 | $1,415 | 2.68 |
| Domiciliarios - Expancion - Q58 | $20,000 | $1,356 | 7% | 2 | $678 | 6.37 |
| TEST Creativos - API | $30,000 | $1,342 | 4% | 1 | $1,342 | 2.35 |
| Motorizados - API | $20,000 | $1,277 | 6% | 1 | $1,277 | 2.67 |
| Motorizados - Q58 | $20,000 | $1,261 | 6% | 3 | $420 | 6.12 |
| RADIO - Fincas | $20,000 | $1,197 | 6% | 2 | $598 | 8.70 |
| Domiciliarios Q58 - | $25,000 | $1,129 | 5% | 5 | $226 | 9.12 |
| RADIO - Seguridad / Negocios | $25,000 | $1,036 | 4% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $25,000 | $861 | 3% | 2 | $430 | 9.09 |
| Domiciliarios VIDEO Q58 - | $25,000 | $647 | 3% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $562 | 2% | 1 | $562 | 7.87 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $21,026 | 33 | **$637** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,712**/pedido |
| utilidad estimada de lo que va del día | **$31,947** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $512 | $1,070 | 🔴 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $413 | $1,055 | 🔴 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $658 | $402 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | $533 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $335 | $372 | 🟡 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $329 | $1,415 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,111 | $678 | 🟢 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $479 | $1,342 | 🔴 |
| Motorizados - API | $579 | $470 | $446 | $379 | $453 | $1,277 | 🔴 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $511 | $420 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $598 |  |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $215 | $226 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | — |  |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $643 | $430 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $676 | — | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $706 | $562 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.20 | 3.28 | 🔴 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.69 | 3.62 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.86 | 7.39 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | 8.20 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.25 | 6.68 | 🔴 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.63 | 2.68 | 🔴 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.96 | 6.37 | 🟢 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.94 | 2.35 | 🔴 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.66 | 2.67 | 🔴 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.85 | 6.12 | 🟡 |
| RADIO - Fincas | — | — | — | — | — | 8.70 |  |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.78 | 9.12 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | — |  |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.47 | 9.09 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 5.00 | — | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.07 | 7.87 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $295,035 | 630 | $468 | $3,551 | 7.58 | $716,275 |

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
