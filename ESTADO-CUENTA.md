# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-09 19:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,084** |
| gastado hoy (hasta las 19h) | $169,373 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,334 |
| saldo proyectado a medianoche | $42,124 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $99,593 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-05 | $229,606 | 571 | **$402** | $2,625 | 6.53 |
| 2026-10-06 | $161,198 | 394 | **$409** | $3,575 | 8.74 |
| 2026-10-07 | $184,556 | 462 | **$399** | $3,803 | 9.52 |
| 2026-10-08 | $188,754 | 512 | **$369** | $3,871 | 10.50 |
| 2026-10-09 **HOY** | $169,373 | 475 | **$357** | $3,205 | 8.99 |

🟢 **Hoy va mejor que ayer a la misma hora** ($357 vs $369).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   357  =  $ 3,205  ÷  8.99
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,205 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.99 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $28,519 | 71% | 55 | $519 | 6.17 |
| TEST Creativos - API | $40,000 | $26,706 | 67% | 56 | $477 | 11.37 |
| Domiciliarios - API | $35,000 | $25,478 | 73% | 69 | $369 | 8.98 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,295 | 76% | 33 | $463 | 4.50 |
| Domiciliarios VIDEO - API | $20,000 | $15,127 | 76% | 63 | $240 | 12.52 |
| Motorizados - INTER | $20,000 | $15,107 | 76% | 44 | $343 | 10.75 |
| Domiciliarios INTER - API | $20,000 | $14,794 | 74% | 83 | $178 | 13.69 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,653 | 73% | 40 | $366 | 9.06 |
| Motorizados - API | $20,000 | $13,694 | 68% | 32 | $428 | 7.28 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $169,373 | 475 | **$357** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,555**/pedido |
| utilidad estimada de lo que va del día | **$593,123** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $479 | $463 | $515 | $542 | $597 | $519 | 🟢 |
| TEST Creativos - API | $478 | $519 | $531 | $460 | $425 | $477 | 🟡 |
| Domiciliarios - API | $463 | $563 | $366 | $340 | $362 | $369 | 🟡 |
| Domiciliarios - Expancion - INTER | $419 | $416 | $626 | $540 | $438 | $463 | 🟡 |
| Domiciliarios VIDEO - API | $322 | $351 | $365 | $400 | $297 | $240 | 🟢 |
| Motorizados - INTER | $339 | $339 | $303 | $344 | $314 | $343 | 🟡 |
| Domiciliarios INTER - API | $223 | $207 | $218 | $192 | $218 | $178 | 🟢 |
| Domiciliarios VIDEO INTER - API | $343 | $307 | $380 | $390 | $416 | $366 | 🟢 |
| Motorizados - API | $403 | $361 | $538 | $414 | $331 | $428 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-04 | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.35 | 6.29 | 6.83 | 6.61 | 6.11 | 6.17 | 🟡 |
| TEST Creativos - API | 7.92 | 6.93 | 9.35 | 11.97 | 14.18 | 11.37 | 🔴 |
| Domiciliarios - API | 6.42 | 5.33 | 10.93 | 11.81 | 11.79 | 8.98 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.60 | 5.43 | 4.84 | 5.48 | 6.52 | 4.50 | 🔴 |
| Domiciliarios VIDEO - API | 7.11 | 6.43 | 9.18 | 8.65 | 12.37 | 12.52 | 🟡 |
| Motorizados - INTER | 8.04 | 8.50 | 13.48 | 11.75 | 11.80 | 10.75 | 🟡 |
| Domiciliarios INTER - API | 7.82 | 8.22 | 10.35 | 12.63 | 11.12 | 13.69 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.69 | 8.45 | 7.95 | 7.63 | 8.15 | 9.06 | 🟢 |
| Motorizados - API | 6.37 | 7.31 | 5.95 | 8.67 | 11.74 | 7.28 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,627 | 624 | $370 | $3,731 | 10.09 | $771,052 |

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
