# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 18:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$150,171** |
| gastado hoy (hasta las 18h) | $217,796 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $288,394 |
| saldo proyectado a medianoche | $79,572 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $102,483 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $174,501 | 449 | **$389** | $3,341 | 8.60 |
| 2026-10-15 | $137,097 | 344 | **$399** | $3,037 | 7.62 |
| 2026-10-16 | $229,473 | 509 | **$451** | $3,267 | 7.25 |
| 2026-10-17 | $256,249 | 586 | **$437** | $3,186 | 7.28 |
| 2026-10-18 **HOY** | $217,796 | 480 | **$454** | $3,265 | 7.20 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($454 vs $437).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   454  =  $ 3,265  ÷  7.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,265 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.20 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $27,738 | 69% | 56 | $495 | 7.97 |
| Domiciliarios - Expancion - API | $40,000 | $27,436 | 69% | 47 | $584 | 5.85 |
| Domiciliarios - API | $35,000 | $24,176 | 69% | 48 | $504 | 7.46 |
| Domiciliarios - Expancion - Q58 | $20,000 | $16,948 | 85% | 21 | $807 | 4.05 |
| Motorizados - Q58 | $20,000 | $15,682 | 78% | 29 | $541 | 5.80 |
| Motorizados - INTER | $20,000 | $15,082 | 75% | 31 | $487 | 9.49 |
| Domiciliarios Q58 - | $20,000 | $13,457 | 67% | 72 | $187 | 14.03 |
| Domiciliarios VIDEO Q58 - | $20,000 | $13,337 | 67% | 16 | $834 | 3.38 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,155 | 66% | 32 | $411 | 8.48 |
| Motorizados - API | $20,000 | $13,026 | 65% | 32 | $407 | 8.05 |
| Domiciliarios VIDEO - API | $20,000 | $12,629 | 63% | 35 | $361 | 8.79 |
| Domiciliarios INTER - API | $20,000 | $12,604 | 63% | 44 | $286 | 9.48 |
| Domiciliarios - Expancion - INTER | $20,000 | $12,526 | 63% | 17 | $737 | 3.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $217,796 | 480 | **$454** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,341**/pedido |
| utilidad estimada de lo que va del día | **$552,726** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $495 | 🟢 |
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $584 | 🔴 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $504 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $773 | $807 | 🟡 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $541 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $487 | 🟢 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $187 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $567 | $834 | 🔴 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $411 | 🟢 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $407 | 🔴 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $361 | 🟡 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $286 | 🟡 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $737 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.13 | 7.97 | 🟢 |
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.26 | 5.85 | 🔴 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 8.99 | 7.46 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.00 | 4.05 | 🟡 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.76 | 5.80 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.18 | 9.49 | 🟢 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.17 | 14.03 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.81 | 3.38 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.73 | 8.48 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.90 | 8.05 | 🟡 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.25 | 8.79 | 🟢 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.04 | 9.48 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 3.07 | 🔴 |

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
