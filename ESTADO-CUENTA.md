# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 08:45 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$97,521** |
| gastado hoy (hasta las 8h) | $40,347 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $216,852 |
| saldo proyectado a medianoche | $-78,984 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $218,182 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $46,463 | 115 | **$404** | $2,998 | 7.42 |
| 2026-10-05 | $64,655 | 158 | **$409** | $2,506 | 6.12 |
| 2026-10-06 | $42,782 | 108 | **$396** | $3,437 | 8.68 |
| 2026-10-07 | $43,961 | 102 | **$431** | $3,747 | 8.69 |
| 2026-10-08 **HOY** | $40,347 | 100 | **$403** | $3,859 | 9.57 |

🟢 **Hoy va mejor que ayer a la misma hora** ($403 vs $431).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   403  =  $ 3,859  ÷  9.57
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,859 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.57 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $8,507 | 21% | 20 | $425 | 13.71 |
| Domiciliarios - API | $35,000 | $6,888 | 20% | 15 | $459 | 8.75 |
| Domiciliarios - Expancion - API | $40,000 | $6,704 | 17% | 11 | $609 | 5.87 |
| Motorizados - API | $20,000 | $4,217 | 21% | 15 | $281 | 14.81 |
| Domiciliarios VIDEO - API | $20,000 | $3,909 | 20% | 10 | $391 | 9.03 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,420 | 17% | 13 | $263 | 11.75 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,492 | 12% | 5 | $498 | 5.91 |
| Motorizados - INTER | $20,000 | $2,125 | 11% | 4 | $531 | 7.29 |
| Domiciliarios INTER - API | $20,000 | $2,085 | 10% | 7 | $298 | 8.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $40,347 | 100 | **$403** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,417**/pedido |
| utilidad estimada de lo que va del día | **$120,178** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $482 | $478 | $519 | $531 | $458 | $425 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $339 | $459 | 🔴 |
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $539 | $609 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $412 | $281 | 🟢 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $398 | $391 | 🟡 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $388 | $263 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $539 | $498 | 🟢 |
| Motorizados - INTER | $280 | $339 | $339 | $302 | $343 | $531 | 🔴 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $191 | $298 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 12.00 | 13.71 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.88 | 8.75 | 🔴 |
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.64 | 5.87 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.71 | 14.81 | 🟢 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.70 | 9.03 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.68 | 11.75 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.50 | 5.91 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.49 | 11.80 | 7.29 | 🔴 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.69 | 8.92 | 🔴 |

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
| 2026-10-07 | $231,580 | 600 | $386 | $3,642 | 9.44 | $731,572 |

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
