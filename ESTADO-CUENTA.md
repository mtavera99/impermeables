# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-10 06:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$169,901** |
| gastado hoy (hasta las 6h) | $17,255 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $219,953 |
| saldo proyectado a medianoche | $-32,797 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $168,894 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-06 | $23,485 | 65 | **$361** | $3,388 | 9.38 |
| 2026-10-07 | $20,149 | 51 | **$395** | $3,710 | 9.39 |
| 2026-10-08 | $22,788 | 57 | **$400** | $3,847 | 9.62 |
| 2026-10-09 | $22,056 | 63 | **$350** | $3,185 | 9.10 |
| 2026-10-10 **HOY** | $17,255 | 47 | **$367** | $3,310 | 9.02 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($367 vs $350).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   367  =  $ 3,310  ÷  9.02
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,310 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.02 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $3,046 | 8% | 5 | $609 | 8.55 |
| Domiciliarios - API | $35,000 | $2,849 | 8% | 7 | $407 | 8.56 |
| Domiciliarios - Expancion - API | $40,000 | $2,670 | 7% | 4 | $668 | 5.08 |
| Domiciliarios VIDEO - API | $20,000 | $2,050 | 10% | 9 | $228 | 11.87 |
| Motorizados - API | $20,000 | $1,796 | 9% | 4 | $449 | 6.35 |
| Domiciliarios INTER - API | $20,000 | $1,580 | 8% | 9 | $176 | 13.98 |
| Motorizados - INTER | $20,000 | $1,264 | 6% | 4 | $316 | 13.75 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,190 | 6% | 3 | $397 | 8.52 |
| Domiciliarios - Expancion - INTER | $20,000 | $810 | 4% | 2 | $405 | 5.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,255 | 47 | **$367** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,749**/pedido |
| utilidad estimada de lo que va del día | **$58,192** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $519 | $531 | $460 | $425 | $439 | $609 | 🔴 |
| Domiciliarios - API | $563 | $366 | $340 | $362 | $362 | $407 | 🟡 |
| Domiciliarios - Expancion - API | $463 | $515 | $542 | $597 | $554 | $668 | 🔴 |
| Domiciliarios VIDEO - API | $351 | $365 | $400 | $297 | $249 | $228 | 🟢 |
| Motorizados - API | $361 | $538 | $414 | $331 | $431 | $449 | 🟡 |
| Domiciliarios INTER - API | $207 | $218 | $192 | $218 | $190 | $176 | 🟢 |
| Motorizados - INTER | $339 | $303 | $344 | $314 | $350 | $316 | 🟢 |
| Domiciliarios VIDEO INTER - API | $307 | $380 | $390 | $416 | $388 | $397 | 🟡 |
| Domiciliarios - Expancion - INTER | $416 | $626 | $540 | $438 | $481 | $405 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-05 | 10-06 | 10-07 | 10-08 | 10-09 | 10-10 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 6.93 | 9.35 | 11.97 | 14.18 | 12.03 | 8.55 | 🔴 |
| Domiciliarios - API | 5.33 | 10.93 | 11.81 | 11.79 | 9.29 | 8.56 | 🟡 |
| Domiciliarios - Expancion - API | 6.29 | 6.83 | 6.61 | 6.11 | 5.68 | 5.08 | 🟡 |
| Domiciliarios VIDEO - API | 6.43 | 9.18 | 8.65 | 12.37 | 11.74 | 11.87 | 🟡 |
| Motorizados - API | 7.31 | 5.95 | 8.67 | 11.74 | 7.04 | 6.35 | 🟡 |
| Domiciliarios INTER - API | 8.22 | 10.35 | 12.63 | 11.12 | 12.23 | 13.98 | 🟢 |
| Motorizados - INTER | 8.50 | 13.48 | 11.75 | 11.80 | 10.17 | 13.75 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.45 | 7.95 | 7.63 | 8.15 | 8.43 | 8.52 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.43 | 4.84 | 5.48 | 6.52 | 4.18 | 5.75 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,653 | 624 | $370 | $3,731 | 10.09 | $771,026 |
| 2026-10-09 | $219,587 | 606 | $362 | $3,141 | 8.67 | $753,197 |

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
