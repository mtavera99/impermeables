# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 14:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$20,664** |
| gastado hoy (hasta las 14h) | $116,844 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $228,330 |
| saldo proyectado a medianoche | $-90,822 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $218,542 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $134,751 | 327 | **$412** | $2,939 | 7.13 |
| 2026-10-05 | $157,643 | 377 | **$418** | $2,518 | 6.02 |
| 2026-10-06 | $103,371 | 257 | **$402** | $3,646 | 9.06 |
| 2026-10-07 | $114,135 | 268 | **$426** | $3,985 | 9.36 |
| 2026-10-08 **HOY** | $116,844 | 317 | **$369** | $4,027 | 10.93 |

🟢 **Hoy va mejor que ayer a la misma hora** ($369 vs $426).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   369  =  $ 4,027  ÷  10.93
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,027 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.93 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $21,746 | 54% | 50 | $435 | 15.23 |
| Domiciliarios - Expancion - API | $40,000 | $20,149 | 50% | 32 | $630 | 5.97 |
| Domiciliarios - API | $35,000 | $19,165 | 55% | 51 | $376 | 11.80 |
| Motorizados - API | $20,000 | $10,543 | 53% | 34 | $310 | 13.63 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,498 | 52% | 23 | $456 | 7.42 |
| Domiciliarios VIDEO - API | $20,000 | $9,557 | 48% | 43 | $222 | 17.72 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,556 | 48% | 22 | $434 | 7.04 |
| Motorizados - INTER | $20,000 | $8,131 | 41% | 22 | $370 | 10.53 |
| Domiciliarios INTER - API | $20,000 | $7,410 | 37% | 40 | $185 | 14.30 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $116,755 | 317 | **$368** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,770**/pedido |
| utilidad estimada de lo que va del día | **$392,111** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $435 | 🟢 |
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $540 | $630 | 🔴 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $376 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $310 | 🟢 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $389 | $456 | 🔴 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $224 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $434 | 🟢 |
| Motorizados - INTER | $280 | $339 | $339 | $302 | $343 | $370 | 🟡 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $185 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.98 | 15.23 | 🟢 |
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.62 | 5.97 | 🟡 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.84 | 11.80 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.68 | 13.63 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.64 | 7.42 | 🟡 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.66 | 17.63 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.49 | 7.04 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.49 | 11.76 | 10.53 | 🟡 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.65 | 14.30 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,180 | 515 | $404 | $3,498 | 8.65 | $618,526 |
| 2026-10-07 | $232,297 | 600 | $387 | $3,641 | 9.41 | $730,855 |

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
