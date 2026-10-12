# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-12 18:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$61,229** |
| gastado hoy (hasta las 18h) | $201,561 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $251,101 |
| saldo proyectado a medianoche | $11,689 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $93,260 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-08 | $170,006 | 457 | **$372** | $3,939 | 10.59 |
| 2026-10-09 | $158,854 | 435 | **$365** | $3,248 | 8.89 |
| 2026-10-10 | $154,380 | 383 | **$403** | $3,562 | 8.84 |
| 2026-10-11 | $167,569 | 371 | **$452** | $3,235 | 7.16 |
| 2026-10-12 **HOY** | $201,561 | 542 | **$372** | $3,121 | 8.39 |

🟢 **Hoy va mejor que ayer a la misma hora** ($372 vs $452).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   372  =  $ 3,121  ÷  8.39
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,121 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.39 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $35,001 | 88% | 76 | $461 | 7.36 |
| TEST Creativos - API | $40,000 | $34,958 | 87% | 68 | $514 | 9.95 |
| Domiciliarios - API | $35,000 | $29,693 | 85% | 79 | $376 | 9.35 |
| Domiciliarios VIDEO - API | $20,000 | $19,604 | 98% | 69 | $284 | 9.41 |
| Motorizados - API | $20,000 | $17,417 | 87% | 66 | $264 | 12.09 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,071 | 85% | 38 | $449 | 6.68 |
| Domiciliarios INTER - API | $20,000 | $16,587 | 83% | 77 | $215 | 9.47 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,287 | 81% | 37 | $440 | 4.71 |
| Motorizados - INTER | $20,000 | $14,943 | 75% | 32 | $467 | 7.11 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $201,561 | 542 | **$372** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,836**/pedido |
| utilidad estimada de lo que va del día | **$668,487** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $542 | $597 | $558 | $509 | $550 | $461 | 🟢 |
| TEST Creativos - API | $460 | $425 | $440 | $433 | $510 | $514 | 🟡 |
| Domiciliarios - API | $340 | $362 | $365 | $366 | $451 | $376 | 🟢 |
| Domiciliarios VIDEO - API | $400 | $297 | $250 | $282 | $276 | $284 | 🟡 |
| Motorizados - API | $414 | $331 | $433 | $312 | $447 | $264 | 🟢 |
| Domiciliarios VIDEO INTER - API | $390 | $417 | $391 | $514 | $515 | $449 | 🟢 |
| Domiciliarios INTER - API | $192 | $218 | $192 | $242 | $242 | $215 | 🟢 |
| Domiciliarios - Expancion - INTER | $540 | $438 | $483 | $442 | $603 | $440 | 🟢 |
| Motorizados - INTER | $344 | $314 | $353 | $343 | $365 | $467 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.61 | 6.11 | 5.63 | 6.92 | 6.36 | 7.36 | 🟢 |
| TEST Creativos - API | 11.97 | 14.18 | 11.97 | 12.76 | 8.95 | 9.95 | 🟢 |
| Domiciliarios - API | 11.81 | 11.79 | 9.23 | 9.70 | 7.58 | 9.35 | 🟢 |
| Domiciliarios VIDEO - API | 8.65 | 12.37 | 11.67 | 10.90 | 10.00 | 9.41 | 🟡 |
| Motorizados - API | 8.67 | 11.74 | 7.01 | 10.22 | 6.89 | 12.09 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.63 | 8.15 | 8.36 | 6.82 | 6.49 | 6.68 | 🟡 |
| Domiciliarios INTER - API | 12.63 | 11.12 | 12.12 | 10.51 | 9.48 | 9.47 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.48 | 6.52 | 4.17 | 5.65 | 3.35 | 4.71 | 🟢 |
| Motorizados - INTER | 11.75 | 11.80 | 10.09 | 11.54 | 10.05 | 7.11 | 🔴 |

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
| 2026-10-11 | $235,745 | 555 | $425 | $3,168 | 7.46 | $655,171 |

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
