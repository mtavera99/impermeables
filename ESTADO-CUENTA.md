# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 06:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$122,040** |
| gastado hoy (hasta las 6h) | $17,191 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,955 |
| saldo proyectado a medianoche | $-75,724 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $216,819 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $21,641 | 55 | **$393** | $2,890 | 7.35 |
| 2026-10-05 | $33,949 | 84 | **$404** | $2,495 | 6.17 |
| 2026-10-06 | $23,485 | 65 | **$361** | $3,388 | 9.38 |
| 2026-10-07 | $20,149 | 51 | **$395** | $3,710 | 9.39 |
| 2026-10-08 **HOY** | $17,638 | 43 | **$410** | $3,758 | 9.16 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($410 vs $395).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   410  =  $ 3,758  ÷  9.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,758 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.16 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $4,255 | 11% | 12 | $355 | 15.69 |
| Domiciliarios - API | $35,000 | $3,272 | 9% | 4 | $818 | 4.96 |
| Domiciliarios - Expancion - API | $40,000 | $2,509 | 6% | 4 | $627 | 5.24 |
| Motorizados - API | $20,000 | $1,841 | 9% | 7 | $263 | 13.86 |
| Domiciliarios VIDEO - API | $20,000 | $1,821 | 9% | 2 | $910 | 3.54 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,233 | 6% | 8 | $154 | 20.46 |
| Domiciliarios - Expancion - INTER | $20,000 | $970 | 5% | 1 | $970 | 3.06 |
| Motorizados - INTER | $20,000 | $886 | 4% | 3 | $295 | 12.35 |
| Domiciliarios INTER - API | $20,000 | $827 | 4% | 2 | $414 | 6.29 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,614 | 43 | **$410** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,530**/pedido |
| utilidad estimada de lo que va del día | **$51,412** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $482 | $478 | $519 | $531 | $457 | $355 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $338 | $818 | 🔴 |
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $538 | $627 | 🔴 |
| Motorizados - API | $276 | $403 | $361 | $538 | $411 | $263 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $397 | $910 | 🔴 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $387 | $157 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $537 | $970 | 🔴 |
| Motorizados - INTER | $280 | $339 | $339 | $302 | $342 | $295 | 🟢 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $191 | $414 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 12.02 | 15.69 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.91 | 4.96 | 🔴 |
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.65 | 5.24 | 🔴 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.74 | 13.86 | 🟢 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.72 | 3.54 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.69 | 20.00 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.51 | 3.06 | 🔴 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.49 | 11.84 | 12.35 | 🟡 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.72 | 6.29 | 🔴 |

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
| 2026-10-07 | $231,013 | 600 | $385 | $3,642 | 9.46 | $732,139 |

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
