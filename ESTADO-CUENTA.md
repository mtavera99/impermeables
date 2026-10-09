# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-08 23:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$113,467** |
| gastado hoy (hasta las 23h) | $224,552 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $224,552 |
| saldo proyectado a medianoche | $113,467 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $18,031 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-04 | $289,497 | 748 | **$387** | $2,741 | 7.08 |
| 2026-10-05 | $272,931 | 704 | **$388** | $2,669 | 6.89 |
| 2026-10-06 | $208,224 | 515 | **$404** | $3,499 | 8.65 |
| 2026-10-07 | $232,561 | 600 | **$388** | $3,641 | 9.39 |
| 2026-10-08 **HOY** | $224,552 | 614 | **$366** | $3,745 | 10.24 |

🟢 **Hoy va mejor que ayer a la misma hora** ($366 vs $388).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   366  =  $ 3,745  ÷  10.24
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,745 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.24 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $38,341 | 96% | 64 | $599 | 6.07 |
| TEST Creativos - API | $40,000 | $38,144 | 95% | 91 | $419 | 14.45 |
| Domiciliarios - API | $35,000 | $33,311 | 95% | 93 | $358 | 11.95 |
| Domiciliarios VIDEO INTER - API | $20,000 | $19,563 | 98% | 46 | $425 | 8.00 |
| Motorizados - API | $20,000 | $19,501 | 98% | 59 | $331 | 11.82 |
| Motorizados - INTER | $20,000 | $19,444 | 97% | 64 | $304 | 12.21 |
| Domiciliarios INTER - API | $20,000 | $19,354 | 97% | 91 | $213 | 11.44 |
| Domiciliarios VIDEO - API | $20,000 | $18,746 | 94% | 63 | $298 | 12.42 |
| Domiciliarios - Expancion - INTER | $20,000 | $18,148 | 91% | 43 | $422 | 6.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $224,552 | 614 | **$366** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,723**/pedido |
| utilidad estimada de lo que va del día | **$761,074** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $416 | $479 | $463 | $515 | $541 | $599 | 🟡 |
| TEST Creativos - API | $482 | $478 | $519 | $531 | $460 | $419 | 🟢 |
| Domiciliarios - API | $476 | $463 | $563 | $366 | $340 | $358 | 🟡 |
| Domiciliarios VIDEO INTER - API | $510 | $343 | $307 | $380 | $390 | $425 | 🟡 |
| Motorizados - API | $276 | $403 | $361 | $538 | $414 | $331 | 🟢 |
| Motorizados - INTER | $280 | $339 | $339 | $303 | $344 | $304 | 🟢 |
| Domiciliarios INTER - API | $141 | $223 | $207 | $218 | $192 | $213 | 🟡 |
| Domiciliarios VIDEO - API | $292 | $322 | $351 | $365 | $400 | $298 | 🟢 |
| Domiciliarios - Expancion - INTER | $295 | $419 | $416 | $626 | $540 | $422 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.84 | 6.35 | 6.29 | 6.83 | 6.61 | 6.07 | 🟡 |
| TEST Creativos - API | 10.41 | 7.92 | 6.93 | 9.35 | 11.97 | 14.45 | 🟢 |
| Domiciliarios - API | 6.51 | 6.42 | 5.33 | 10.93 | 11.81 | 11.95 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.44 | 8.69 | 8.45 | 7.95 | 7.63 | 8.00 | 🟡 |
| Motorizados - API | 10.08 | 6.37 | 7.31 | 5.95 | 8.67 | 11.82 | 🟢 |
| Motorizados - INTER | 11.38 | 8.04 | 8.50 | 13.48 | 11.75 | 12.21 | 🟡 |
| Domiciliarios INTER - API | 14.55 | 7.82 | 8.22 | 10.35 | 12.63 | 11.44 | 🟡 |
| Domiciliarios VIDEO - API | 9.14 | 7.11 | 6.43 | 9.18 | 8.65 | 12.42 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.93 | 5.60 | 5.43 | 4.84 | 5.48 | 6.78 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,561 | 600 | $388 | $3,641 | 9.39 | $730,591 |

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
