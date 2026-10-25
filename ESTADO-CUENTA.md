# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-25 01:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$137,978** |
| gastado hoy (hasta las 1h) | $8,077 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $343,470 |
| saldo proyectado a medianoche | $-197,416 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $431,645 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-21 | $8,871 | 23 | **$386** | $4,120 | 10.68 |
| 2026-10-22 | $4,913 | 14 | **$351** | $4,007 | 11.42 |
| 2026-10-23 | $4,624 | 11 | **$420** | $3,831 | 9.11 |
| 2026-10-24 | $5,034 | 11 | **$458** | $3,774 | 8.25 |
| 2026-10-25 **HOY** | $8,077 | 19 | **$425** | $3,006 | 7.07 |

🟢 **Hoy va mejor que ayer a la misma hora** ($425 vs $458).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   425  =  $ 3,006  ÷  7.07
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,006 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.07 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | $20,000 | $2,197 | 11% | 8 | $275 | 9.17 |
| Domiciliarios - Expancion - API | $40,000 | $1,092 | 3% | 2 | $546 | 9.48 |
| Domiciliarios - API | $35,000 | $560 | 2% | 2 | $280 | 14.93 |
| Motorizados - API | $20,000 | $530 | 3% | 1 | $530 | 6.58 |
| Domiciliarios - Expancion - INTER | $25,000 | $525 | 2% | 1 | $525 | 4.76 |
| TEST Creativos - API | $20,000 | $497 | 2% | 2 | $248 | 17.09 |
| Domiciliarios INTER - API | $25,000 | $481 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $471 | 2% | 0 | — | 0.00 |
| Motorizados - Q58 | $20,000 | $458 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $25,000 | $311 | 1% | 0 | — | 0.00 |
| RADIO - Moteros | $20,000 | $307 | 2% | 1 | $307 | 7.94 |
| Domiciliarios VIDEO Q58 - | $25,000 | $158 | 1% | 1 | $158 | 14.29 |
| Motorizados - INTER | $25,000 | $151 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $117 | 0% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $25,000 | $115 | 0% | 1 | $115 | 18.52 |
| RADIO - Fincas | $20,000 | $107 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,077 | 19 | **$425** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,814**/pedido |
| utilidad estimada de lo que va del día | **$22,423** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | $1,121 | $1,077 | $892 | $1,117 | $876 | $275 | 🟢 |
| Domiciliarios - Expancion - API | $583 | $424 | $444 | $517 | $691 | $546 | 🟢 |
| Domiciliarios - API | $484 | $348 | $370 | $417 | $489 | $280 | 🟢 |
| Motorizados - API | $470 | $446 | $379 | $456 | $436 | $530 | 🔴 |
| Domiciliarios - Expancion - INTER | $629 | $604 | $721 | $662 | $590 | $525 | 🟢 |
| TEST Creativos - API | $609 | $535 | $379 | $480 | $395 | $248 | 🟢 |
| Domiciliarios INTER - API | $324 | $304 | $314 | $332 | $458 | — | 🔴 |
| Domiciliarios VIDEO - API | $319 | $269 | $292 | $337 | $383 | — | 🟡 |
| Motorizados - Q58 | $545 | $1,025 | $599 | $514 | $545 | — | 🟡 |
| Domiciliarios VIDEO INTER - API | $576 | $701 | $742 | $646 | $488 | — | 🟢 |
| RADIO - Moteros | — | — | — | — | $909 | $307 | 🟢 |
| Domiciliarios VIDEO Q58 - | $642 | $995 | $1,091 | $679 | $791 | $158 | 🟢 |
| Motorizados - INTER | $591 | $460 | $545 | $714 | $588 | — | 🟢 |
| Domiciliarios Q58 - | $185 | $197 | $159 | $217 | $202 | — | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | $1,165 | $115 | 🟢 |
| RADIO - Fincas | — | — | — | — | $626 | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | 2.71 | 3.65 | 4.52 | 3.93 | 4.49 | 9.17 | 🟢 |
| Domiciliarios - Expancion - API | 7.58 | 11.99 | 10.38 | 8.14 | 5.50 | 9.48 | 🟢 |
| Domiciliarios - API | 9.53 | 14.10 | 12.13 | 9.61 | 8.23 | 14.93 | 🟢 |
| Motorizados - API | 8.05 | 9.31 | 10.45 | 8.59 | 8.73 | 6.58 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.46 | 5.33 | 4.21 | 4.83 | 4.72 | 4.76 | 🟡 |
| TEST Creativos - API | 8.80 | 11.03 | 14.31 | 8.92 | 8.50 | 17.09 | 🟢 |
| Domiciliarios INTER - API | 11.02 | 12.17 | 9.39 | 7.57 | 6.60 | — | 🟡 |
| Domiciliarios VIDEO - API | 11.78 | 14.69 | 10.98 | 9.18 | 7.61 | — | 🔴 |
| Motorizados - Q58 | 5.75 | 3.32 | 5.14 | 5.82 | 5.31 | — | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.46 | 5.98 | 5.52 | 6.43 | 8.61 | — | 🟢 |
| RADIO - Moteros | — | — | — | — | 5.70 | 7.94 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.62 | 3.19 | 2.96 | 4.98 | 4.13 | 14.29 | 🟢 |
| Motorizados - INTER | 8.76 | 13.59 | 11.01 | 8.00 | 9.00 | — | 🟢 |
| Domiciliarios Q58 - | 13.11 | 11.07 | 12.89 | 10.68 | 10.33 | — | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | — | 4.16 | 18.52 | 🟢 |
| RADIO - Fincas | — | — | — | — | 8.72 | — |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $383,256 | 750 | $511 | $3,534 | 6.92 | $820,685 |

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
