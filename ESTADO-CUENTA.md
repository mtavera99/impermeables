# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 07:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$110,815** |
| gastado hoy (hasta las 7h) | $27,870 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $215,636 |
| saldo proyectado a medianoche | $-76,950 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $217,365 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $33,723 | 89 | **$379** | $2,973 | 7.85 |
| 2026-10-05 | $48,452 | 119 | **$407** | $2,485 | 6.10 |
| 2026-10-06 | $33,034 | 93 | **$355** | $3,402 | 9.58 |
| 2026-10-07 | $30,918 | 80 | **$386** | $3,666 | 9.49 |
| 2026-10-08 **HOY** | $27,870 | 74 | **$377** | $3,818 | 10.14 |

🟢 **Hoy va mejor que ayer a la misma hora** ($377 vs $386).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   377  =  $ 3,818  ÷  10.14
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,818 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.14 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $6,257 | 16% | 17 | $368 | 15.48 |
| Domiciliarios - API | $35,000 | $4,933 | 14% | 11 | $448 | 8.96 |
| Domiciliarios - Expancion - API | $40,000 | $4,373 | 11% | 8 | $547 | 6.23 |
| Motorizados - API | $20,000 | $2,949 | 15% | 12 | $246 | 16.13 |
| Domiciliarios VIDEO - API | $20,000 | $2,853 | 14% | 7 | $408 | 8.54 |
| Domiciliarios VIDEO INTER - API | $20,000 | $2,095 | 10% | 11 | $190 | 15.97 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,591 | 8% | 2 | $796 | 3.71 |
| Motorizados - INTER | $20,000 | $1,448 | 7% | 3 | $483 | 8.04 |
| Domiciliarios INTER - API | $20,000 | $1,371 | 7% | 3 | $457 | 5.71 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $27,870 | 74 | **$377** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,923**/pedido |
| utilidad estimada de lo que va del día | **$90,919** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $482 | $478 | $519 | $531 | $458 | $368 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $338 | $448 | 🔴 |
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $539 | $547 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $411 | $246 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $398 | $408 | 🟡 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $388 | $190 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $538 | $796 | 🔴 |
| Motorizados - INTER | $280 | $339 | $339 | $302 | $342 | $483 | 🔴 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $191 | $457 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 12.01 | 15.48 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.90 | 8.96 | 🔴 |
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.65 | 6.23 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.72 | 16.13 | 🟢 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.70 | 8.54 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.68 | 15.97 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.51 | 3.71 | 🔴 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.49 | 11.83 | 8.04 | 🔴 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.70 | 5.71 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,173 | 515 | $404 | $3,498 | 8.65 | $618,533 |
| 2026-10-07 | $231,310 | 600 | $386 | $3,642 | 9.45 | $731,842 |

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
