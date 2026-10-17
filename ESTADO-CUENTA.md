# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 20:43 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$51,715** |
| gastado hoy (hasta las 20h) | $265,265 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $298,363 |
| saldo proyectado a medianoche | $18,617 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $153,470 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $264,195 | 746 | **$354** | $2,947 | 8.32 |
| 2026-10-13 | $220,275 | 694 | **$317** | $3,523 | 11.10 |
| 2026-10-14 | $206,757 | 545 | **$379** | $3,256 | 8.58 |
| 2026-10-15 | $177,010 | 444 | **$399** | $3,087 | 7.74 |
| 2026-10-16 **HOY** | $265,265 | 593 | **$447** | $3,244 | 7.25 |

🟠 Hoy va 12% más caro que ayer a la misma hora ($447 vs $399).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   447  =  $ 3,244  ÷  7.25
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,244 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.25 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $31,677 | 79% | 58 | $546 | 6.42 |
| TEST Creativos - API | $40,000 | $27,697 | 69% | 51 | $543 | 7.19 |
| Domiciliarios - API | $35,000 | $26,819 | 77% | 60 | $447 | 8.00 |
| Domiciliarios Q58 - | $20,000 | $23,452 | 117% | 97 | $242 | 13.54 |
| Domiciliarios - Expancion - Q58 | $20,000 | $21,099 | 105% | 23 | $917 | 3.92 |
| Domiciliarios VIDEO Q58 - | $20,000 | $20,693 | 103% | 54 | $383 | 7.18 |
| Motorizados - Q58 | $20,000 | $20,538 | 103% | 30 | $685 | 5.97 |
| Domiciliarios INTER - API | $20,000 | $17,017 | 85% | 61 | $279 | 9.26 |
| Motorizados - INTER | $20,000 | $16,374 | 82% | 33 | $496 | 8.12 |
| Domiciliarios VIDEO - API | $20,000 | $15,292 | 76% | 36 | $425 | 6.05 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,222 | 76% | 26 | $585 | 3.57 |
| Motorizados - API | $20,000 | $14,742 | 74% | 42 | $351 | 9.30 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,643 | 73% | 22 | $666 | 5.30 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $265,265 | 593 | **$447** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,223**/pedido |
| utilidad estimada de lo que va del día | **$686,651** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $690 | $546 | 🟢 |
| TEST Creativos - API | $510 | $509 | $412 | $378 | $386 | $543 | 🔴 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $356 | $447 | 🔴 |
| Domiciliarios Q58 - | — | — | — | — | $263 | $242 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $859 | $917 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $354 | $383 | 🟡 |
| Motorizados - Q58 | — | — | — | — | $582 | $685 | 🔴 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $280 | $279 | 🟡 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $330 | $496 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $289 | $425 | 🔴 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $387 | $585 | 🔴 |
| Motorizados - API | $447 | $265 | $284 | $278 | $380 | $351 | 🟢 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $445 | $666 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.46 | 6.42 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.48 | 10.16 | 7.19 | 🔴 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.35 | 8.00 | 🟡 |
| Domiciliarios Q58 - | — | — | — | — | 15.07 | 13.54 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.50 | 3.92 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.53 | 7.18 | 🔴 |
| Motorizados - Q58 | — | — | — | — | 5.67 | 5.97 | 🟢 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.40 | 9.26 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.53 | 8.12 | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.68 | 6.05 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.07 | 3.57 | 🔴 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.08 | 9.30 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.26 | 5.30 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,285 | 561 | $386 | $3,059 | 7.93 | $684,263 |

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
