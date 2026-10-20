# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 06:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$155,994** |
| gastado hoy (hasta las 6h) | $18,768 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $350,910 |
| saldo proyectado a medianoche | $-176,148 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $352,888 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $25,496 | 82 | **$311** | $2,872 | 9.24 |
| 2026-10-17 | $29,596 | 75 | **$395** | $2,829 | 7.17 |
| 2026-10-18 | $21,889 | 60 | **$365** | $2,810 | 7.70 |
| 2026-10-19 | $42,615 | 86 | **$496** | $2,897 | 5.85 |
| 2026-10-20 **HOY** | $19,403 | 38 | **$511** | $3,438 | 6.73 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($511 vs $496).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   511  =  $ 3,438  ÷  6.73
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,438 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.73 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $2,132 | 5% | 4 | $533 | 8.15 |
| Domiciliarios - Expancion - API | $40,000 | $1,929 | 5% | 1 | $1,929 | 2.03 |
| Domiciliarios - Expancion - Q58 | $25,000 | $1,875 | 8% | 1 | $1,875 | 1.48 |
| Domiciliarios Q58 - | $25,000 | $1,827 | 7% | 14 | $130 | 20.38 |
| Motorizados - Q58 | $25,000 | $1,778 | 7% | 7 | $254 | 14.06 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,710 | 7% | 1 | $1,710 | 1.62 |
| Domiciliarios - API | $35,000 | $1,583 | 5% | 1 | $1,583 | 2.45 |
| Domiciliarios VIDEO INTER - API | $25,000 | $1,580 | 6% | 2 | $790 | 6.99 |
| Domiciliarios INTER - API | $25,000 | $1,470 | 6% | 2 | $735 | 4.42 |
| Motorizados - API | $20,000 | $1,127 | 6% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $975 | 4% | 2 | $488 | 5.81 |
| Motorizados - INTER | $25,000 | $734 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $683 | 3% | 3 | $228 | 14.42 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $19,403 | 38 | **$511** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,386**/pedido |
| utilidad estimada de lo que va del día | **$41,597** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $386 | $488 | $538 | $504 | $473 | $533 | 🟡 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $482 | $1,929 | 🔴 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,458 | $1,875 | 🔴 |
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $165 | $130 | 🟢 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $724 | $254 | 🟢 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $533 | $1,710 | 🔴 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $462 | $1,583 | 🔴 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $532 | $790 | 🔴 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $238 | $735 | 🔴 |
| Motorizados - API | $380 | $344 | $349 | $419 | $576 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $584 | $488 | 🟢 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $475 | — | 🟢 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $427 | $228 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.88 | 8.15 | 🔴 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.84 | 2.03 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.03 | 1.48 | 🔴 |
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.81 | 20.38 | 🟢 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.18 | 14.06 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.29 | 1.62 | 🔴 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.61 | 2.45 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.45 | 6.99 | 🟢 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.35 | 4.42 | 🔴 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.73 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.05 | 5.81 | 🟢 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.09 | — | 🟡 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.60 | 14.42 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $341,518 | 796 | $429 | $3,065 | 7.14 | $936,264 |

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
