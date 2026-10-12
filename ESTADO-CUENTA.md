# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-11 21:37 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$90,864** |
| gastado hoy (hasta las 21h) | $209,264 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,808 |
| saldo proyectado a medianoche | $85,320 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $55,922 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-07 | $218,065 | 570 | **$383** | $3,649 | 9.54 |
| 2026-10-08 | $218,262 | 583 | **$374** | $3,762 | 10.05 |
| 2026-10-09 | $209,889 | 568 | **$370** | $3,163 | 8.56 |
| 2026-10-10 | $185,284 | 494 | **$375** | $3,445 | 9.18 |
| 2026-10-11 **HOY** | $209,264 | 484 | **$432** | $3,215 | 7.44 |

🟠 Hoy va 15% más caro que ayer a la misma hora ($432 vs $375).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   432  =  $ 3,215  ÷  7.44
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,215 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.44 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $36,682 | 92% | 68 | $539 | 8.63 |
| Domiciliarios - Expancion - API | $40,000 | $36,526 | 91% | 63 | $580 | 6.02 |
| Domiciliarios - API | $35,000 | $30,925 | 88% | 69 | $448 | 7.62 |
| Motorizados - INTER | $20,000 | $20,397 | 102% | 57 | $358 | 10.36 |
| Domiciliarios - Expancion - INTER | $20,000 | $17,900 | 90% | 26 | $688 | 3.08 |
| Domiciliarios INTER - API | $20,000 | $17,510 | 88% | 74 | $237 | 9.79 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,254 | 86% | 34 | $507 | 6.56 |
| Motorizados - API | $20,000 | $16,547 | 83% | 32 | $517 | 5.95 |
| Domiciliarios VIDEO - API | $20,000 | $15,523 | 78% | 62 | $250 | 11.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $209,264 | 485 | **$431** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,931**/pedido |
| utilidad estimada de lo que va del día | **$569,284** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $531 | $460 | $425 | $440 | $433 | $539 | 🔴 |
| Domiciliarios - Expancion - API | $515 | $542 | $597 | $558 | $509 | $580 | 🟡 |
| Domiciliarios - API | $366 | $340 | $362 | $365 | $366 | $448 | 🔴 |
| Motorizados - INTER | $303 | $344 | $314 | $353 | $343 | $358 | 🟡 |
| Domiciliarios - Expancion - INTER | $626 | $540 | $438 | $483 | $442 | $688 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $218 | $192 | $242 | $237 | 🟡 |
| Domiciliarios VIDEO INTER - API | $380 | $390 | $417 | $391 | $514 | $507 | 🟡 |
| Motorizados - API | $538 | $414 | $331 | $433 | $312 | $517 | 🔴 |
| Domiciliarios VIDEO - API | $365 | $400 | $297 | $250 | $282 | $250 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.35 | 11.97 | 14.18 | 11.97 | 12.76 | 8.63 | 🔴 |
| Domiciliarios - Expancion - API | 6.83 | 6.61 | 6.11 | 5.63 | 6.92 | 6.02 | 🟡 |
| Domiciliarios - API | 10.93 | 11.81 | 11.79 | 9.23 | 9.70 | 7.62 | 🔴 |
| Motorizados - INTER | 13.48 | 11.75 | 11.80 | 10.09 | 11.54 | 10.36 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.84 | 5.48 | 6.52 | 4.17 | 5.65 | 3.08 | 🔴 |
| Domiciliarios INTER - API | 10.35 | 12.63 | 11.12 | 12.12 | 10.51 | 9.79 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.95 | 7.63 | 8.15 | 8.36 | 6.82 | 6.56 | 🟡 |
| Motorizados - API | 5.95 | 8.67 | 11.74 | 7.01 | 10.22 | 5.95 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 8.65 | 12.37 | 11.67 | 10.90 | 11.05 | 🟡 |

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
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |

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
