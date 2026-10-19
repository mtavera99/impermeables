# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 01:53 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$124,504** |
| gastado hoy (hasta las 1h) | $8,767 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $348,430 |
| saldo proyectado a medianoche | $-215,160 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $337,179 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $2,707 | 7 | **$387** | $3,035 | 7.85 |
| 2026-10-16 | $5,050 | 13 | **$388** | $2,997 | 7.72 |
| 2026-10-17 | $7,383 | 28 | **$264** | $3,090 | 11.72 |
| 2026-10-18 | $7,898 | 23 | **$343** | $2,491 | 7.25 |
| 2026-10-19 **HOY** | $8,767 | 18 | **$487** | $3,005 | 6.17 |

🟠 Hoy va 42% más caro que ayer a la misma hora ($487 vs $343).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   487  =  $ 3,005  ÷  6.17
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,005 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.17 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $1,085 | 3% | 2 | $542 | 8.66 |
| Domiciliarios - API | $35,000 | $1,042 | 3% | 3 | $347 | 10.79 |
| Domiciliarios - Expancion - API | $40,000 | $1,036 | 3% | 4 | $259 | 11.30 |
| Motorizados - API | $20,000 | $739 | 4% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $673 | 3% | 2 | $336 | 6.97 |
| Domiciliarios VIDEO INTER - API | $20,000 | $629 | 3% | 2 | $314 | 9.39 |
| Domiciliarios - Expancion - Q58 | $20,000 | $627 | 3% | 1 | $627 | 4.78 |
| Domiciliarios - Expancion - INTER | $20,000 | $584 | 3% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $558 | 3% | 1 | $558 | 7.14 |
| Domiciliarios Q58 - | $20,000 | $554 | 3% | 2 | $277 | 9.71 |
| Motorizados - Q58 | $20,000 | $509 | 3% | 1 | $509 | 4.67 |
| Domiciliarios VIDEO Q58 - | $20,000 | $382 | 2% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $349 | 2% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,767 | 18 | **$487** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,953**/pedido |
| utilidad estimada de lo que va del día | **$20,128** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $501 | $542 | 🟡 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $466 | $347 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $551 | $259 | 🟢 |
| Motorizados - API | $278 | $380 | $344 | $349 | $416 | — | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $352 | $336 | 🟡 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $428 | $314 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $744 | $627 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $582 | — | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $515 | $558 | 🟡 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $184 | $277 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $564 | $509 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $864 | — | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $281 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.86 | 8.66 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.67 | 10.79 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 6.00 | 11.30 | 🟢 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.60 | — | 🟡 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 8.12 | 6.97 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.79 | 9.39 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.18 | 4.78 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.49 | — | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.47 | 7.14 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 14.17 | 9.71 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.30 | 4.67 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.13 | — | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.04 | 9.23 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $383,718 | 870 | $441 | $3,105 | 7.04 | $1,012,853 |

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
