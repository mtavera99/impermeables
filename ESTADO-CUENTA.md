# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-12 17:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$93,163** |
| gastado hoy (hasta las 17h) | $170,183 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $237,529 |
| saldo proyectado a medianoche | $25,817 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $92,704 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-08 | $153,949 | 406 | **$379** | $3,995 | 10.54 |
| 2026-10-09 | $139,065 | 375 | **$371** | $3,285 | 8.86 |
| 2026-10-10 | $137,499 | 341 | **$403** | $3,593 | 8.91 |
| 2026-10-11 | $148,838 | 332 | **$448** | $3,239 | 7.23 |
| 2026-10-12 **HOY** | $170,183 | 435 | **$391** | $3,207 | 8.20 |

🟢 **Hoy va mejor que ayer a la misma hora** ($391 vs $448).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   391  =  $ 3,207  ÷  8.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,207 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.20 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $29,989 | 75% | 54 | $555 | 9.24 |
| Domiciliarios - Expancion - API | $40,000 | $28,835 | 72% | 58 | $497 | 6.95 |
| Domiciliarios - API | $35,000 | $24,686 | 71% | 63 | $392 | 9.30 |
| Domiciliarios VIDEO - API | $20,000 | $17,584 | 88% | 62 | $284 | 9.76 |
| Motorizados - API | $20,000 | $14,378 | 72% | 54 | $266 | 12.68 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,078 | 70% | 23 | $612 | 5.13 |
| Domiciliarios INTER - API | $20,000 | $13,994 | 70% | 62 | $226 | 9.33 |
| Domiciliarios - Expancion - INTER | $20,000 | $13,826 | 69% | 31 | $446 | 4.63 |
| Motorizados - INTER | $20,000 | $12,813 | 64% | 28 | $458 | 7.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $170,183 | 435 | **$391** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,192**/pedido |
| utilidad estimada de lo que va del día | **$528,103** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $460 | $425 | $440 | $433 | $510 | $555 | 🟡 |
| Domiciliarios - Expancion - API | $542 | $597 | $558 | $509 | $550 | $497 | 🟢 |
| Domiciliarios - API | $340 | $362 | $365 | $366 | $451 | $392 | 🟢 |
| Domiciliarios VIDEO - API | $400 | $297 | $250 | $282 | $276 | $284 | 🟡 |
| Motorizados - API | $414 | $331 | $433 | $312 | $447 | $266 | 🟢 |
| Domiciliarios VIDEO INTER - API | $390 | $417 | $391 | $514 | $515 | $612 | 🔴 |
| Domiciliarios INTER - API | $192 | $218 | $192 | $242 | $242 | $226 | 🟢 |
| Domiciliarios - Expancion - INTER | $540 | $438 | $483 | $442 | $603 | $446 | 🟢 |
| Motorizados - INTER | $344 | $314 | $353 | $343 | $365 | $458 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.97 | 14.18 | 11.97 | 12.76 | 8.95 | 9.24 | 🟡 |
| Domiciliarios - Expancion - API | 6.61 | 6.11 | 5.63 | 6.92 | 6.36 | 6.95 | 🟢 |
| Domiciliarios - API | 11.81 | 11.79 | 9.23 | 9.70 | 7.59 | 9.30 | 🟢 |
| Domiciliarios VIDEO - API | 8.65 | 12.37 | 11.67 | 10.90 | 10.01 | 9.76 | 🟡 |
| Motorizados - API | 8.67 | 11.74 | 7.01 | 10.22 | 6.90 | 12.68 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.63 | 8.15 | 8.36 | 6.82 | 6.49 | 5.13 | 🔴 |
| Domiciliarios INTER - API | 12.63 | 11.12 | 12.12 | 10.51 | 9.48 | 9.33 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.48 | 6.52 | 4.17 | 5.65 | 3.35 | 4.63 | 🟢 |
| Motorizados - INTER | 11.75 | 11.80 | 10.09 | 11.54 | 10.05 | 7.62 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,169 | 7.46 | $655,171 |

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
