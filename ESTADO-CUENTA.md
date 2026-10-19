# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 19:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$116,279** |
| gastado hoy (hasta las 19h) | $249,158 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $294,087 |
| saldo proyectado a medianoche | $71,350 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $105,013 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $190,633 | 486 | **$392** | $3,303 | 8.42 |
| 2026-10-15 | $156,094 | 391 | **$399** | $3,075 | 7.70 |
| 2026-10-16 | $254,911 | 556 | **$458** | $3,224 | 7.03 |
| 2026-10-17 | $282,150 | 633 | **$446** | $3,160 | 7.09 |
| 2026-10-18 **HOY** | $249,158 | 545 | **$457** | $3,242 | 7.09 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($457 vs $446).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   457  =  $ 3,242  ÷  7.09
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,242 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.09 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $33,161 | 83% | 64 | $518 | 7.62 |
| Domiciliarios - Expancion - API | $40,000 | $31,248 | 78% | 55 | $568 | 5.94 |
| Domiciliarios - API | $35,000 | $27,572 | 79% | 57 | $484 | 7.74 |
| Domiciliarios - Expancion - Q58 | $20,000 | $18,922 | 95% | 23 | $823 | 3.87 |
| Motorizados - Q58 | $20,000 | $17,564 | 88% | 33 | $532 | 5.82 |
| Motorizados - INTER | $20,000 | $17,407 | 87% | 34 | $512 | 9.02 |
| Domiciliarios Q58 - | $20,000 | $15,212 | 76% | 82 | $186 | 14.12 |
| Motorizados - API | $20,000 | $14,992 | 75% | 35 | $428 | 7.69 |
| Domiciliarios VIDEO Q58 - | $20,000 | $14,976 | 75% | 18 | $832 | 3.37 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,868 | 74% | 35 | $425 | 8.14 |
| Domiciliarios INTER - API | $20,000 | $14,687 | 73% | 54 | $272 | 9.94 |
| Domiciliarios VIDEO - API | $20,000 | $14,447 | 72% | 37 | $390 | 7.98 |
| Domiciliarios - Expancion - INTER | $20,000 | $14,102 | 71% | 22 | $641 | 3.45 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $249,158 | 549 | **$454** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,343**/pedido |
| utilidad estimada de lo que va del día | **$632,127** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $518 | 🟡 |
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $568 | 🔴 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $484 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $773 | $823 | 🟡 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $532 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $512 | 🟡 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $186 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $428 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $567 | $832 | 🔴 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $425 | 🟡 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $272 | 🟡 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $390 | 🟡 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $641 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.13 | 7.62 | 🟢 |
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.26 | 5.94 | 🔴 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 8.99 | 7.74 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.00 | 3.87 | 🟡 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.76 | 5.82 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.18 | 9.02 | 🟢 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.17 | 14.12 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.90 | 7.69 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.81 | 3.37 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.72 | 8.14 | 🟢 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.04 | 9.94 | 🟢 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.25 | 7.98 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 3.45 | 🔴 |

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
| 2026-10-17 | $310,885 | 743 | $418 | $3,080 | 7.36 | $881,819 |

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
