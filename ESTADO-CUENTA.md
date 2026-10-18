# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 01:45 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$113,630** |
| gastado hoy (hasta las 1h) | $6,383 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $313,494 |
| saldo proyectado a medianoche | $-193,481 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $350,437 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $3,434 | 11 | **$312** | $3,681 | 11.79 |
| 2026-10-15 | $2,707 | 7 | **$387** | $3,035 | 7.85 |
| 2026-10-16 | $5,050 | 13 | **$388** | $2,997 | 7.72 |
| 2026-10-17 | $7,383 | 28 | **$264** | $3,090 | 11.72 |
| 2026-10-18 **HOY** | $6,383 | 18 | **$355** | $2,552 | 7.20 |

🟠 Hoy va 34% más caro que ayer a la misma hora ($355 vs $264).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   355  =  $ 2,552  ÷  7.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,552 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.20 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $20,000 | $771 | 4% | 1 | $771 | 3.08 |
| Domiciliarios - Expancion - API | $40,000 | $657 | 2% | 2 | $328 | 12.27 |
| Domiciliarios - Expancion - INTER | $20,000 | $632 | 3% | 1 | $632 | 2.53 |
| Domiciliarios - API | $35,000 | $617 | 2% | 1 | $617 | 6.37 |
| Motorizados - INTER | $20,000 | $594 | 3% | 2 | $297 | 9.90 |
| Domiciliarios - Expancion - Q58 | $20,000 | $533 | 3% | 1 | $533 | 4.22 |
| Domiciliarios INTER - API | $20,000 | $529 | 3% | 6 | $88 | 29.85 |
| Motorizados - API | $20,000 | $432 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $20,000 | $363 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $355 | 2% | 1 | $355 | 11.24 |
| TEST Creativos - API | $40,000 | $352 | 1% | 1 | $352 | 7.30 |
| Domiciliarios VIDEO - API | $20,000 | $312 | 2% | 1 | $312 | 10.31 |
| Domiciliarios Q58 - | $20,000 | $236 | 1% | 1 | $236 | 5.68 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $6,383 | 18 | **$355** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,519**/pedido |
| utilidad estimada de lo que va del día | **$22,512** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | $584 | $690 | $545 | $771 | 🔴 |
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $328 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $632 | 🔴 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $617 | 🔴 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $297 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $771 | $533 | 🟢 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $88 | 🟢 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $564 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $355 | 🟢 |
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $352 | 🟢 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $312 | 🟢 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $191 | $236 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.79 | 3.08 | 🔴 |
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.30 | 12.27 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 2.53 | 🔴 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 9.05 | 6.37 | 🔴 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.23 | 9.90 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.02 | 4.22 | 🟢 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.12 | 29.85 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.95 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.84 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.76 | 11.24 | 🟢 |
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.15 | 7.30 | 🟡 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.30 | 10.31 | 🟢 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.24 | 5.68 | 🔴 |

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
| 2026-10-17 | $310,621 | 743 | $418 | $3,093 | 7.40 | $882,083 |

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
