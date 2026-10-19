# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 02:53 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$121,790** |
| gastado hoy (hasta las 2h) | $11,061 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $349,304 |
| saldo proyectado a medianoche | $-216,453 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $337,599 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $3,294 | 9 | **$366** | $2,984 | 8.15 |
| 2026-10-16 | $6,165 | 16 | **$385** | $2,926 | 7.59 |
| 2026-10-17 | $8,926 | 33 | **$270** | $3,046 | 11.26 |
| 2026-10-18 | $9,377 | 26 | **$361** | $2,437 | 6.76 |
| 2026-10-19 **HOY** | $11,061 | 26 | **$425** | $3,092 | 7.27 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($425 vs $361).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   425  =  $ 3,092  ÷  7.27
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,092 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.27 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $1,424 | 4% | 4 | $356 | 11.87 |
| Domiciliarios - Expancion - API | $40,000 | $1,293 | 3% | 5 | $259 | 11.68 |
| TEST Creativos - API | $40,000 | $1,248 | 3% | 2 | $624 | 7.38 |
| Motorizados - API | $20,000 | $892 | 4% | 1 | $892 | 3.65 |
| Domiciliarios VIDEO - API | $20,000 | $864 | 4% | 2 | $432 | 5.51 |
| Domiciliarios - Expancion - Q58 | $20,000 | $827 | 4% | 2 | $414 | 7.41 |
| Domiciliarios - Expancion - INTER | $20,000 | $764 | 4% | 0 | — | 0.00 |
| Motorizados - Q58 | $20,000 | $718 | 4% | 1 | $718 | 3.57 |
| Domiciliarios Q58 - | $20,000 | $703 | 4% | 3 | $234 | 11.41 |
| Motorizados - INTER | $20,000 | $662 | 3% | 2 | $331 | 11.98 |
| Domiciliarios VIDEO INTER - API | $20,000 | $659 | 3% | 3 | $220 | 13.33 |
| Domiciliarios VIDEO Q58 - | $20,000 | $535 | 3% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $472 | 2% | 1 | $472 | 5.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $11,061 | 26 | **$425** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,820**/pedido |
| utilidad estimada de lo que va del día | **$30,676** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $295 | $356 | $402 | $395 | $467 | $356 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $551 | $259 | 🟢 |
| TEST Creativos - API | $378 | $386 | $488 | $538 | $501 | $624 | 🔴 |
| Motorizados - API | $278 | $380 | $344 | $349 | $417 | $892 | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $352 | $432 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $745 | $414 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $583 | — | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $564 | $718 | 🔴 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $184 | $234 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $516 | $331 | 🟢 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $428 | $220 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $865 | — | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $281 | $472 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.66 | 11.87 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 6.00 | 11.68 | 🟢 |
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.86 | 7.38 | 🟡 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.59 | 3.65 | 🔴 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 8.12 | 5.51 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.17 | 7.41 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.49 | — | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.29 | 3.57 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 14.16 | 11.41 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.46 | 11.98 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.79 | 13.33 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.12 | — | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.04 | 9.23 | 5.03 | 🔴 |

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
| 2026-10-18 | $383,899 | 870 | $441 | $3,105 | 7.04 | $1,012,672 |

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
