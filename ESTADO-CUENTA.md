# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 20:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$231,914** |
| gastado hoy (hasta las 20h) | $284,746 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $320,600 |
| saldo proyectado a medianoche | $196,060 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $177,024 | 444 | **$399** | $3,087 | 7.74 |
| 2026-10-16 | $280,423 | 635 | **$442** | $3,167 | 7.17 |
| 2026-10-17 | $298,588 | 685 | **$436** | $3,120 | 7.16 |
| 2026-10-18 | $327,883 | 709 | **$462** | $3,142 | 6.79 |
| 2026-10-19 **HOY** | $284,746 | 664 | **$429** | $2,999 | 6.99 |

🟢 **Hoy va mejor que ayer a la misma hora** ($429 vs $462).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   429  =  $ 2,999  ÷  6.99
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,999 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.99 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $37,348 | 93% | 84 | $445 | 10.31 |
| Domiciliarios - Expancion - API | $40,000 | $36,242 | 91% | 79 | $459 | 8.23 |
| Domiciliarios - API | $35,000 | $30,306 | 87% | 64 | $474 | 7.42 |
| Domiciliarios Q58 - | $20,000 | $21,340 | 107% | 129 | $165 | 13.77 |
| Motorizados - Q58 | $20,000 | $18,444 | 92% | 25 | $738 | 4.17 |
| Domiciliarios - Expancion - Q58 | $20,000 | $18,363 | 92% | 10 | $1,836 | 1.57 |
| Domiciliarios VIDEO INTER - API | $20,000 | $18,326 | 92% | 35 | $524 | 6.47 |
| Motorizados - INTER | $20,000 | $18,172 | 91% | 35 | $519 | 7.18 |
| Domiciliarios INTER - API | $20,000 | $18,045 | 90% | 75 | $241 | 5.75 |
| Motorizados - API | $20,000 | $17,879 | 89% | 28 | $639 | 5.15 |
| Domiciliarios VIDEO - API | $20,000 | $17,526 | 88% | 39 | $449 | 6.15 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,645 | 83% | 33 | $504 | 5.42 |
| Domiciliarios VIDEO Q58 - | $20,000 | $16,110 | 81% | 28 | $575 | 4.95 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $284,746 | 664 | **$429** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,883**/pedido |
| utilidad estimada de lo que va del día | **$781,143** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $445 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $556 | $459 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $474 | 🟡 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $165 | 🟢 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $738 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $751 | $1,836 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $524 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $521 | $519 | 🟡 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $241 | 🟢 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $639 | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $357 | $449 | 🔴 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $504 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $874 | $575 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.79 | 10.31 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.92 | 8.23 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.53 | 7.42 | 🟡 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.92 | 13.77 | 🟡 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.24 | 4.17 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.12 | 1.57 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.70 | 6.47 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.33 | 7.18 | 🟡 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.06 | 5.75 | 🔴 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.50 | 5.15 | 🔴 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.95 | 6.15 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.47 | 5.42 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.07 | 4.95 | 🟢 |

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
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |

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
