# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 13:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$268,426** |
| gastado hoy (hasta las 13h) | $131,331 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $283,809 |
| saldo proyectado a medianoche | $115,948 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $70,693 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $137,812 | 402 | **$343** | $3,426 | 9.99 |
| 2026-10-14 | $110,376 | 273 | **$404** | $3,365 | 8.32 |
| 2026-10-15 | $85,593 | 224 | **$382** | $3,035 | 7.94 |
| 2026-10-16 | $141,798 | 345 | **$411** | $3,262 | 7.94 |
| 2026-10-17 **HOY** | $131,331 | 311 | **$422** | $3,272 | 7.75 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($422 vs $411).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   422  =  $ 3,272  ÷  7.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,272 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $17,308 | 43% | 41 | $422 | 8.94 |
| TEST Creativos - API | $40,000 | $17,027 | 43% | 24 | $709 | 6.09 |
| Domiciliarios - API | $35,000 | $16,495 | 47% | 51 | $323 | 12.24 |
| Domiciliarios - Expancion - Q58 | $20,000 | $8,855 | 44% | 14 | $632 | 4.87 |
| Motorizados - API | $20,000 | $8,719 | 44% | 18 | $484 | 7.03 |
| Motorizados - Q58 | $20,000 | $8,556 | 43% | 18 | $475 | 6.52 |
| Domiciliarios VIDEO - API | $20,000 | $8,510 | 43% | 20 | $426 | 7.31 |
| Motorizados - INTER | $20,000 | $8,415 | 42% | 18 | $468 | 9.47 |
| Domiciliarios VIDEO Q58 - | $20,000 | $8,102 | 41% | 14 | $579 | 4.51 |
| Domiciliarios - Expancion - INTER | $20,000 | $7,906 | 40% | 20 | $395 | 4.76 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,617 | 38% | 17 | $448 | 8.23 |
| Domiciliarios INTER - API | $20,000 | $7,526 | 38% | 29 | $260 | 10.59 |
| Domiciliarios Q58 - | $20,000 | $6,295 | 31% | 27 | $233 | 10.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $131,331 | 311 | **$422** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,763**/pedido |
| utilidad estimada de lo que va del día | **$367,903** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $422 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $709 | 🔴 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $323 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $632 | 🟢 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $484 | 🔴 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $475 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $426 | 🔴 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $468 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $579 | 🔴 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $395 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $448 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $260 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $233 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.56 | 8.94 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.70 | 6.09 | 🔴 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.73 | 12.24 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.77 | 4.87 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.37 | 7.03 | 🔴 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.52 | 🟢 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.79 | 7.31 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.29 | 9.47 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.03 | 4.51 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.76 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 8.23 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.06 | 10.59 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.88 | 10.78 | 🔴 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,103 | 7.29 | $876,670 |

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
