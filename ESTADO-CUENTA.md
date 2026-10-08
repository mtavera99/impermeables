# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 15:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$11,456** |
| gastado hoy (hasta las 15h) | $126,801 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $230,176 |
| saldo proyectado a medianoche | $-91,920 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $217,793 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $149,407 | 359 | **$416** | $2,946 | 7.08 |
| 2026-10-05 | $169,638 | 406 | **$418** | $2,552 | 6.11 |
| 2026-10-06 | $111,889 | 286 | **$391** | $3,660 | 9.36 |
| 2026-10-07 | $121,887 | 295 | **$413** | $3,974 | 9.62 |
| 2026-10-08 **HOY** | $126,801 | 344 | **$369** | $4,032 | 10.94 |

🟢 **Hoy va mejor que ayer a la misma hora** ($369 vs $413).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   369  =  $ 4,032  ÷  10.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,032 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.94 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $22,743 | 57% | 52 | $437 | 15.13 |
| Domiciliarios - Expancion - API | $40,000 | $22,081 | 55% | 34 | $649 | 5.89 |
| Domiciliarios - API | $35,000 | $20,457 | 58% | 51 | $401 | 11.19 |
| Motorizados - API | $20,000 | $11,487 | 57% | 35 | $328 | 12.93 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,314 | 57% | 25 | $453 | 7.49 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,512 | 53% | 24 | $438 | 6.96 |
| Domiciliarios VIDEO - API | $20,000 | $10,350 | 52% | 45 | $230 | 17.18 |
| Motorizados - INTER | $20,000 | $9,595 | 48% | 28 | $343 | 11.37 |
| Domiciliarios INTER - API | $20,000 | $8,262 | 41% | 46 | $180 | 14.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $126,801 | 340 | **$373** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,856**/pedido |
| utilidad estimada de lo que va del día | **$418,985** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $437 | 🟡 |
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $540 | $649 | 🔴 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $401 | 🔴 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $328 | 🟢 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $389 | $453 | 🔴 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $438 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $230 | 🟢 |
| Motorizados - INTER | $280 | $339 | $339 | $303 | $343 | $343 | 🟡 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $180 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.97 | 15.13 | 🟢 |
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.62 | 5.89 | 🟡 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.83 | 11.19 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.68 | 12.93 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.64 | 7.49 | 🟡 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.49 | 6.96 | 🟢 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.66 | 17.18 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.48 | 11.76 | 11.37 | 🟡 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.65 | 14.78 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,209 | 515 | $404 | $3,499 | 8.65 | $618,497 |
| 2026-10-07 | $232,318 | 600 | $387 | $3,641 | 9.40 | $730,834 |

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
