# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-11 11:05 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$164,499** |
| gastado hoy (hasta las 11h) | $35,567 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $170,520 |
| saldo proyectado a medianoche | $29,546 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $155,984 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-07 | $78,040 | 181 | **$431** | $3,942 | 9.14 |
| 2026-10-08 | $86,261 | 219 | **$394** | $4,080 | 10.36 |
| 2026-10-09 | $70,192 | 193 | **$364** | $3,281 | 9.02 |
| 2026-10-10 | $66,162 | 166 | **$399** | $3,620 | 9.08 |
| 2026-10-11 **HOY** | $35,192 | 62 | **$568** | $3,361 | 5.92 |

🟠 Hoy va 42% más caro que ayer a la misma hora ($568 vs $399).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   568  =  $ 3,361  ÷  5.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,361 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.92 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $7,159 | 18% | 9 | $795 | 4.68 |
| TEST Creativos - API | $40,000 | $5,919 | 15% | 9 | $658 | 8.01 |
| Domiciliarios - API | $35,000 | $5,403 | 15% | 10 | $540 | 6.29 |
| Motorizados - INTER | $20,000 | $3,437 | 17% | 7 | $491 | 7.14 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,221 | 16% | 9 | $358 | 8.91 |
| Motorizados - API | $20,000 | $2,811 | 14% | 1 | $2,811 | 1.10 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,651 | 13% | 2 | $1,326 | 1.81 |
| Domiciliarios VIDEO - API | $20,000 | $2,526 | 13% | 11 | $230 | 11.98 |
| Domiciliarios INTER - API | $20,000 | $2,204 | 11% | 4 | $551 | 4.24 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $35,331 | 62 | **$570** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,475**/pedido |
| utilidad estimada de lo que va del día | **$64,195** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $515 | $542 | $597 | $558 | $509 | $795 | 🔴 |
| TEST Creativos - API | $531 | $460 | $425 | $440 | $433 | $658 | 🔴 |
| Domiciliarios - API | $366 | $340 | $362 | $365 | $366 | $540 | 🔴 |
| Motorizados - INTER | $303 | $344 | $314 | $353 | $343 | $491 | 🔴 |
| Domiciliarios VIDEO INTER - API | $380 | $390 | $417 | $391 | $514 | $358 | 🟢 |
| Motorizados - API | $538 | $414 | $331 | $433 | $312 | $2,811 | 🔴 |
| Domiciliarios - Expancion - INTER | $626 | $540 | $438 | $483 | $442 | $1,326 | 🔴 |
| Domiciliarios VIDEO - API | $365 | $400 | $297 | $250 | $282 | $230 | 🟢 |
| Domiciliarios INTER - API | $218 | $192 | $218 | $192 | $242 | $551 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.83 | 6.61 | 6.11 | 5.63 | 6.93 | 4.68 | 🔴 |
| TEST Creativos - API | 9.35 | 11.97 | 14.18 | 11.97 | 12.76 | 8.01 | 🔴 |
| Domiciliarios - API | 10.93 | 11.81 | 11.79 | 9.23 | 9.73 | 6.29 | 🔴 |
| Motorizados - INTER | 13.48 | 11.75 | 11.80 | 10.09 | 11.57 | 7.14 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.95 | 7.63 | 8.15 | 8.36 | 6.83 | 8.91 | 🟢 |
| Motorizados - API | 5.95 | 8.67 | 11.74 | 7.01 | 10.23 | 1.10 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.84 | 5.48 | 6.52 | 4.17 | 5.66 | 1.81 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 8.65 | 12.37 | 11.67 | 10.91 | 11.98 | 🟢 |
| Domiciliarios INTER - API | 10.35 | 12.63 | 11.12 | 12.12 | 10.54 | 4.24 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,448 | 9.23 | $610,922 |

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
