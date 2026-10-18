# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 19:13 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$149,240** |
| gastado hoy (hasta las 19h) | $251,222 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $311,893 |
| saldo proyectado a medianoche | $88,569 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $69,988 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $205,086 | 640 | **$320** | $3,549 | 11.08 |
| 2026-10-14 | $190,633 | 486 | **$392** | $3,303 | 8.42 |
| 2026-10-15 | $156,094 | 391 | **$399** | $3,075 | 7.70 |
| 2026-10-16 | $254,911 | 556 | **$458** | $3,225 | 7.03 |
| 2026-10-17 **HOY** | $251,922 | 583 | **$432** | $3,226 | 7.47 |

🟢 **Hoy va mejor que ayer a la misma hora** ($432 vs $458).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   432  =  $ 3,226  ÷  7.47
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,226 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.47 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $35,487 | 89% | 54 | $657 | 6.23 |
| Domiciliarios - Expancion - API | $40,000 | $34,541 | 86% | 74 | $467 | 7.68 |
| Domiciliarios - API | $35,000 | $31,749 | 91% | 74 | $429 | 8.57 |
| Motorizados - API | $20,000 | $17,143 | 86% | 48 | $357 | 8.83 |
| Motorizados - INTER | $20,000 | $16,992 | 85% | 33 | $515 | 8.06 |
| Domiciliarios VIDEO - API | $20,000 | $16,913 | 85% | 45 | $376 | 8.16 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,237 | 81% | 39 | $416 | 4.69 |
| Domiciliarios INTER - API | $20,000 | $16,085 | 80% | 66 | $244 | 11.08 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,189 | 76% | 30 | $506 | 7.16 |
| Motorizados - Q58 | $20,000 | $14,398 | 72% | 29 | $496 | 6.48 |
| Domiciliarios - Expancion - Q58 | $20,000 | $14,055 | 70% | 19 | $740 | 4.25 |
| Domiciliarios VIDEO Q58 - | $20,000 | $12,835 | 64% | 25 | $513 | 5.28 |
| Domiciliarios Q58 - | $20,000 | $9,919 | 50% | 48 | $207 | 12.44 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $251,543 | 584 | **$431** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,918**/pedido |
| utilidad estimada de lo que va del día | **$685,925** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $660 | 🔴 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $467 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $429 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $360 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $380 | 🟡 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $515 | 🟡 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $416 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $244 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $506 | 🟢 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $498 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $743 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $513 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $207 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.69 | 6.19 | 🔴 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.55 | 7.68 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.72 | 8.57 | 🟡 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.35 | 8.76 | 🟡 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.78 | 8.09 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.27 | 8.06 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.69 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.03 | 11.08 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 7.16 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.46 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.76 | 4.24 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.02 | 5.28 | 🔴 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.87 | 12.44 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,099 | 7.29 | $876,670 |

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
