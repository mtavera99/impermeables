# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-11 09:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$191,889** |
| gastado hoy (hasta las 8h) | $7,837 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $170,396 |
| saldo proyectado a medianoche | $29,330 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $156,324 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-07 | $43,961 | 102 | **$431** | $3,747 | 8.69 |
| 2026-10-08 | $48,619 | 118 | **$412** | $3,943 | 9.57 |
| 2026-10-09 | $42,307 | 117 | **$362** | $3,143 | 8.69 |
| 2026-10-10 | $38,836 | 102 | **$381** | $3,544 | 9.31 |
| 2026-10-11 **HOY** | $8,093 | 8 | **$1,012** | $3,735 | 3.69 |

🟠 Hoy va 166% más caro que ayer a la misma hora ($1,012 vs $381).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,012  =  $ 3,735  ÷  3.69
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,735 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.69 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $1,542 | 4% | 3 | $514 | 7.63 |
| Domiciliarios - API | $35,000 | $1,348 | 4% | 1 | $1,348 | 2.73 |
| TEST Creativos - API | $40,000 | $1,143 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $843 | 4% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $780 | 4% | 1 | $780 | 4.95 |
| Motorizados - API | $20,000 | $688 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $634 | 3% | 2 | $317 | 11.05 |
| Domiciliarios INTER - API | $20,000 | $573 | 3% | 1 | $573 | 5.41 |
| Domiciliarios - Expancion - INTER | $20,000 | $552 | 3% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,103 | 8 | **$1,013** | $2,402 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$18,619**/pedido |
| utilidad estimada de lo que va del día | **$4,739** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $515 | $542 | $597 | $558 | $509 | $545 | 🟡 |
| Domiciliarios - API | $366 | $340 | $362 | $365 | $366 | $1,348 | 🔴 |
| TEST Creativos - API | $531 | $460 | $425 | $440 | $433 | — | 🟡 |
| Domiciliarios VIDEO INTER - API | $380 | $390 | $417 | $391 | $514 | — | 🔴 |
| Motorizados - INTER | $303 | $344 | $314 | $353 | $343 | $780 | 🔴 |
| Motorizados - API | $538 | $414 | $331 | $433 | $312 | — | 🟢 |
| Domiciliarios VIDEO - API | $365 | $400 | $297 | $250 | $282 | $317 | 🟡 |
| Domiciliarios INTER - API | $218 | $192 | $218 | $192 | $242 | $573 | 🔴 |
| Domiciliarios - Expancion - INTER | $626 | $540 | $438 | $483 | $442 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.83 | 6.61 | 6.11 | 5.63 | 6.93 | 7.11 | 🟡 |
| Domiciliarios - API | 10.93 | 11.81 | 11.79 | 9.23 | 9.73 | 2.73 | 🔴 |
| TEST Creativos - API | 9.35 | 11.97 | 14.18 | 11.97 | 12.78 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.95 | 7.63 | 8.15 | 8.36 | 6.83 | — | 🔴 |
| Motorizados - INTER | 13.48 | 11.75 | 11.80 | 10.09 | 11.58 | 4.95 | 🔴 |
| Motorizados - API | 5.95 | 8.67 | 11.74 | 7.01 | 10.24 | — | 🟢 |
| Domiciliarios VIDEO - API | 9.18 | 8.65 | 12.37 | 11.67 | 10.93 | 11.05 | 🟡 |
| Domiciliarios INTER - API | 10.35 | 12.63 | 11.12 | 12.12 | 10.56 | 5.41 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.84 | 5.48 | 6.52 | 4.17 | 5.66 | — | 🟢 |

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
| 2026-10-10 | $185,284 | 496 | $374 | $3,451 | 9.24 | $610,922 |

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
