# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 15:43 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$231,497** |
| gastado hoy (hasta las 15h) | $168,457 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $298,530 |
| saldo proyectado a medianoche | $101,424 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $70,496 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $157,475 | 470 | **$335** | $3,486 | 10.40 |
| 2026-10-14 | $134,348 | 329 | **$408** | $3,390 | 8.30 |
| 2026-10-15 | $104,229 | 267 | **$390** | $3,031 | 7.76 |
| 2026-10-16 | $167,972 | 398 | **$422** | $3,287 | 7.79 |
| 2026-10-17 **HOY** | $168,457 | 388 | **$434** | $3,288 | 7.57 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($434 vs $422).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   434  =  $ 3,288  ÷  7.57
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,288 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.57 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $22,815 | 57% | 48 | $475 | 7.88 |
| TEST Creativos - API | $40,000 | $22,699 | 57% | 37 | $613 | 6.95 |
| Domiciliarios - API | $35,000 | $21,220 | 61% | 55 | $386 | 10.03 |
| Motorizados - INTER | $20,000 | $11,596 | 58% | 23 | $504 | 8.61 |
| Motorizados - API | $20,000 | $11,208 | 56% | 29 | $386 | 8.73 |
| Domiciliarios VIDEO - API | $20,000 | $11,120 | 56% | 24 | $463 | 6.71 |
| Domiciliarios - Expancion - Q58 | $20,000 | $10,481 | 52% | 18 | $582 | 5.34 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,398 | 52% | 25 | $416 | 4.65 |
| Motorizados - Q58 | $20,000 | $10,387 | 52% | 22 | $472 | 6.74 |
| Domiciliarios INTER - API | $20,000 | $10,111 | 51% | 39 | $259 | 10.71 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,952 | 50% | 22 | $452 | 7.98 |
| Domiciliarios VIDEO Q58 - | $20,000 | $9,242 | 46% | 16 | $578 | 4.57 |
| Domiciliarios Q58 - | $20,000 | $7,228 | 36% | 30 | $241 | 10.52 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $168,457 | 388 | **$434** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,981**/pedido |
| utilidad estimada de lo que va del día | **$454,382** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $475 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $613 | 🔴 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $386 | 🟡 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $504 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $386 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $463 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $582 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $416 | 🟢 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $472 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $259 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $452 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $578 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $241 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.56 | 7.88 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.69 | 6.95 | 🟡 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.73 | 10.03 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.28 | 8.61 | 🟡 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.36 | 8.73 | 🟡 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.79 | 6.71 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.76 | 5.34 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.65 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.74 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.05 | 10.71 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 7.98 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.03 | 4.57 | 🔴 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.87 | 10.52 | 🔴 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,101 | 7.29 | $876,670 |

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
