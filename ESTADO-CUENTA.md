# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-09 16:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$96,556** |
| gastado hoy (hasta las 16h) | $110,607 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $205,452 |
| saldo proyectado a medianoche | $1,710 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $148,887 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-05 | $182,030 | 437 | **$417** | $2,580 | 6.19 |
| 2026-10-06 | $122,131 | 303 | **$403** | $3,659 | 9.08 |
| 2026-10-07 | $131,460 | 331 | **$397** | $3,997 | 10.06 |
| 2026-10-08 | $141,912 | 370 | **$384** | $4,024 | 10.49 |
| 2026-10-09 **HOY** | $110,607 | 296 | **$374** | $3,340 | 8.94 |

🟢 **Hoy va mejor que ayer a la misma hora** ($374 vs $384).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   374  =  $ 3,340  ÷  8.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,340 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.94 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $19,292 | 48% | 35 | $551 | 6.17 |
| Domiciliarios - API | $35,000 | $17,084 | 49% | 46 | $371 | 9.38 |
| TEST Creativos - API | $40,000 | $16,204 | 41% | 33 | $491 | 12.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,127 | 56% | 22 | $506 | 4.19 |
| Domiciliarios VIDEO - API | $20,000 | $10,226 | 51% | 49 | $209 | 15.31 |
| Motorizados - INTER | $20,000 | $9,436 | 47% | 26 | $363 | 10.66 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,376 | 47% | 26 | $361 | 9.73 |
| Motorizados - API | $20,000 | $9,205 | 46% | 17 | $541 | 6.12 |
| Domiciliarios INTER - API | $20,000 | $8,657 | 43% | 42 | $206 | 12.19 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $110,607 | 296 | **$374** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,869**/pedido |
| utilidad estimada de lo que va del día | **$364,548** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $479 | $463 | $515 | $541 | $596 | $551 | 🟢 |
| Domiciliarios - API | $463 | $563 | $366 | $340 | $361 | $371 | 🟡 |
| TEST Creativos - API | $478 | $519 | $531 | $460 | $425 | $491 | 🔴 |
| Domiciliarios - Expancion - INTER | $419 | $416 | $626 | $540 | $438 | $506 | 🔴 |
| Domiciliarios VIDEO - API | $322 | $351 | $365 | $400 | $297 | $209 | 🟢 |
| Motorizados - INTER | $339 | $339 | $303 | $344 | $314 | $363 | 🔴 |
| Domiciliarios VIDEO INTER - API | $343 | $307 | $380 | $390 | $416 | $361 | 🟢 |
| Motorizados - API | $403 | $361 | $538 | $414 | $331 | $541 | 🔴 |
| Domiciliarios INTER - API | $223 | $207 | $218 | $192 | $218 | $206 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.35 | 6.29 | 6.83 | 6.61 | 6.12 | 6.17 | 🟡 |
| Domiciliarios - API | 6.42 | 5.33 | 10.93 | 11.81 | 11.80 | 9.38 | 🔴 |
| TEST Creativos - API | 7.92 | 6.93 | 9.35 | 11.97 | 14.18 | 12.00 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.60 | 5.43 | 4.84 | 5.48 | 6.52 | 4.19 | 🔴 |
| Domiciliarios VIDEO - API | 7.11 | 6.43 | 9.18 | 8.65 | 12.37 | 15.31 | 🟢 |
| Motorizados - INTER | 8.04 | 8.50 | 13.48 | 11.75 | 11.81 | 10.66 | 🟡 |
| Domiciliarios VIDEO INTER - API | 8.69 | 8.45 | 7.95 | 7.63 | 8.16 | 9.73 | 🟢 |
| Motorizados - API | 6.37 | 7.31 | 5.95 | 8.67 | 11.74 | 6.12 | 🔴 |
| Domiciliarios INTER - API | 7.82 | 8.22 | 10.35 | 12.63 | 11.14 | 12.19 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,561 | 600 | $388 | $3,641 | 9.39 | $730,591 |
| 2026-10-08 | $230,502 | 624 | $369 | $3,731 | 10.10 | $771,177 |

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
