# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 20:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$76,057** |
| gastado hoy (hasta las 20h) | $291,466 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $315,422 |
| saldo proyectado a medianoche | $52,100 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $102,927 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $206,757 | 545 | **$379** | $3,256 | 8.58 |
| 2026-10-15 | $177,024 | 444 | **$399** | $3,087 | 7.74 |
| 2026-10-16 | $280,423 | 635 | **$442** | $3,167 | 7.17 |
| 2026-10-17 | $298,588 | 685 | **$436** | $3,120 | 7.16 |
| 2026-10-18 **HOY** | $291,466 | 627 | **$465** | $3,199 | 6.88 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($465 vs $436).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   465  =  $ 3,199  ÷  6.88
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,199 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.88 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $39,459 | 99% | 76 | $519 | 7.62 |
| Domiciliarios - Expancion - API | $40,000 | $36,523 | 91% | 60 | $609 | 5.45 |
| Domiciliarios - API | $35,000 | $32,145 | 92% | 71 | $453 | 8.19 |
| Domiciliarios - Expancion - Q58 | $20,000 | $22,435 | 112% | 26 | $863 | 3.67 |
| Motorizados - INTER | $20,000 | $20,121 | 101% | 40 | $503 | 9.04 |
| Motorizados - Q58 | $20,000 | $19,972 | 100% | 34 | $587 | 5.23 |
| Domiciliarios INTER - API | $20,000 | $17,780 | 89% | 58 | $307 | 8.67 |
| Motorizados - API | $20,000 | $17,648 | 88% | 41 | $430 | 7.51 |
| Domiciliarios Q58 - | $20,000 | $17,525 | 88% | 93 | $188 | 13.87 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,478 | 87% | 39 | $448 | 7.50 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,924 | 85% | 26 | $651 | 3.35 |
| Domiciliarios VIDEO - API | $20,000 | $16,786 | 84% | 42 | $400 | 7.48 |
| Domiciliarios VIDEO Q58 - | $20,000 | $16,670 | 83% | 21 | $794 | 3.49 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $291,466 | 627 | **$465** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,545**/pedido |
| utilidad estimada de lo que va del día | **$715,028** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $519 | 🟡 |
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $609 | 🔴 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $453 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $773 | $863 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $503 | 🟡 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $587 | 🟡 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $307 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $430 | 🔴 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $188 | 🟡 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $448 | 🟡 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $651 | 🔴 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $400 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $567 | $794 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.13 | 7.62 | 🟢 |
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.26 | 5.45 | 🔴 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 8.99 | 8.19 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.00 | 3.67 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.18 | 9.04 | 🟢 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.76 | 5.23 | 🟡 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.04 | 8.67 | 🟡 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.90 | 7.51 | 🔴 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.17 | 13.87 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.72 | 7.50 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.23 | 3.35 | 🔴 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.25 | 7.48 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.81 | 3.49 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,080 | 7.36 | $881,814 |

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
