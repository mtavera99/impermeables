# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 18:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$129,411** |
| gastado hoy (hasta las 18h) | $192,564 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $248,534 |
| saldo proyectado a medianoche | $73,440 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $34,075 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-01 | $150,395 | 380 | **$396** | $3,296 | 8.33 |
| 2026-10-02 | $150,827 | 378 | **$399** | $3,496 | 8.76 |
| 2026-10-03 | $148,890 | 433 | **$344** | $3,216 | 9.35 |
| 2026-10-04 | $210,554 | 511 | **$412** | $2,840 | 6.89 |
| 2026-10-05 **HOY** | $192,564 | 472 | **$408** | $2,588 | 6.34 |

🟢 **Hoy va mejor que ayer a la misma hora** ($408 vs $412).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   408  =  $ 2,588  ÷  6.34
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,588 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.34 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $32,955 | 82% | 60 | $549 | 6.26 |
| Domiciliarios - Expancion - API | $40,000 | $31,960 | 80% | 68 | $470 | 6.13 |
| Domiciliarios - API | $35,000 | $28,660 | 82% | 38 | $754 | 3.76 |
| Motorizados - INTER | $20,000 | $17,443 | 87% | 48 | $363 | 7.78 |
| Motorizados - API | $20,000 | $17,355 | 87% | 42 | $413 | 6.13 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,928 | 85% | 41 | $413 | 5.35 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,860 | 79% | 53 | $299 | 8.66 |
| Domiciliarios VIDEO - API | $20,000 | $15,853 | 79% | 42 | $377 | 5.76 |
| Domiciliarios INTER - API | $20,000 | $15,550 | 78% | 80 | $194 | 8.40 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $192,564 | 472 | **$408** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,500**/pedido |
| utilidad estimada de lo que va del día | **$565,116** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $555 | $679 | $503 | $482 | $478 | $549 | 🟡 |
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $478 | $470 | 🟡 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $463 | $754 | 🔴 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $339 | $363 | 🟡 |
| Motorizados - API | $519 | $597 | $382 | $276 | $403 | $413 | 🟡 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $419 | $413 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $342 | $299 | 🟢 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $322 | $377 | 🔴 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $223 | $194 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.92 | 6.26 | 🔴 |
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.35 | 6.13 | 🟡 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.43 | 3.76 | 🔴 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.04 | 7.78 | 🟡 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.37 | 6.13 | 🟡 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.61 | 5.35 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.70 | 8.66 | 🟡 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.11 | 5.76 | 🔴 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.82 | 8.40 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $608,308 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $657,304 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $631,432 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,365 | 748 | $387 | $2,740 | 7.08 | $911,365 |

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
