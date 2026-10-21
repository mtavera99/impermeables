# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 15:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$195,317** |
| gastado hoy (hasta las 15h) | $193,012 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $367,286 |
| saldo proyectado a medianoche | $21,044 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $139,321 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $184,086 | 412 | **$447** | $3,247 | 7.27 |
| 2026-10-18 | $174,730 | 383 | **$456** | $3,253 | 7.13 |
| 2026-10-19 | $200,836 | 479 | **$419** | $2,863 | 6.83 |
| 2026-10-20 | $178,680 | 357 | **$501** | $3,310 | 6.61 |
| 2026-10-21 **HOY** | $193,012 | 423 | **$456** | $3,960 | 8.68 |

🟢 **Hoy va mejor que ayer a la misma hora** ($456 vs $501).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   456  =  $ 3,960  ÷  8.68
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,960 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.68 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $24,925 | 62% | 46 | $542 | 9.13 |
| Domiciliarios - API | $35,000 | $21,626 | 62% | 62 | $349 | 14.53 |
| TEST Creativos - API | $40,000 | $15,632 | 39% | 31 | $504 | 11.52 |
| Domiciliarios Q58 - | $25,000 | $15,353 | 61% | 73 | $210 | 10.40 |
| Domiciliarios VIDEO INTER - API | $25,000 | $14,880 | 60% | 24 | $620 | 6.71 |
| Motorizados - INTER | $25,000 | $14,430 | 58% | 30 | $481 | 13.04 |
| Domiciliarios INTER - API | $25,000 | $14,328 | 57% | 41 | $349 | 10.95 |
| Domiciliarios VIDEO - API | $20,000 | $12,647 | 63% | 41 | $308 | 13.26 |
| Motorizados - API | $20,000 | $12,645 | 63% | 24 | $527 | 7.63 |
| Motorizados - Q58 | $25,000 | $12,639 | 51% | 11 | $1,149 | 2.98 |
| Domiciliarios VIDEO Q58 - | $25,000 | $11,904 | 48% | 15 | $794 | 3.77 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,620 | 46% | 18 | $646 | 4.98 |
| Domiciliarios - Expancion - Q58 | $25,000 | $10,383 | 42% | 7 | $1,483 | 2.72 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $193,012 | 423 | **$456** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,388**/pedido |
| utilidad estimada de lo que va del día | **$486,010** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $582 | $542 | 🟢 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $484 | $349 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $609 | $504 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $185 | $210 | 🟡 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $576 | $620 | 🟡 |
| Motorizados - INTER | $463 | $529 | $521 | $480 | $591 | $481 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $324 | $349 | 🟡 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $319 | $308 | 🟡 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $527 | 🟡 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $545 | $1,149 | 🔴 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $642 | $794 | 🔴 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $536 | $629 | $646 | 🟡 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,120 | $1,483 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.60 | 9.13 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.54 | 14.53 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.80 | 11.52 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.14 | 10.40 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.47 | 6.71 | 🟡 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.76 | 13.04 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.04 | 10.95 | 🟡 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.80 | 13.26 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.06 | 7.63 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.75 | 2.98 | 🔴 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.77 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.46 | 4.98 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.71 | 2.72 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,597 | 837 | $459 | $3,524 | 7.67 | $959,001 |

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
