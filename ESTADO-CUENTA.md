# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 20:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$96,862** |
| gastado hoy (hasta las 20h) | $204,591 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $219,366 |
| saldo proyectado a medianoche | $82,086 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $54,597 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $195,322 | 527 | **$371** | $3,170 | 8.55 |
| 2026-10-10 | $181,143 | 478 | **$379** | $3,477 | 9.18 |
| 2026-10-11 | $206,254 | 463 | **$445** | $3,208 | 7.20 |
| 2026-10-12 | $264,195 | 746 | **$354** | $2,947 | 8.32 |
| 2026-10-13 **HOY** | $204,591 | 644 | **$318** | $3,545 | 11.16 |

🟢 **Hoy va mejor que ayer a la misma hora** ($318 vs $354).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   318  =  $ 3,545  ÷  11.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,545 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.16 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $37,401 | 94% | 87 | $430 | 13.79 |
| Domiciliarios - Expancion - API | $40,000 | $37,204 | 93% | 105 | $354 | 10.72 |
| Domiciliarios - API | $35,000 | $33,846 | 97% | 139 | $243 | 16.34 |
| Motorizados - API | $20,000 | $18,893 | 94% | 65 | $291 | 12.93 |
| Domiciliarios VIDEO - API | $20,000 | $17,351 | 87% | 68 | $255 | 10.79 |
| Motorizados - INTER | $20,000 | $15,958 | 80% | 37 | $431 | 8.26 |
| Domiciliarios INTER - API | $20,000 | $15,906 | 80% | 87 | $183 | 12.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,984 | 75% | 26 | $576 | 5.72 |
| Domiciliarios - Expancion - INTER | $20,000 | $13,048 | 65% | 30 | $435 | 5.46 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $204,591 | 644 | **$318** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,840**/pedido |
| utilidad estimada de lo que va del día | **$829,193** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $430 | 🟢 |
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $354 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $243 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $291 | 🟡 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $255 | 🟢 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $431 | 🟡 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $183 | 🟢 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $576 | 🔴 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $435 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.47 | 13.79 | 🟢 |
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 7.99 | 10.72 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.25 | 16.34 | 🟢 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.48 | 12.93 | 🟢 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.30 | 10.79 | 🟢 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.90 | 8.26 | 🟡 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.32 | 12.00 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.58 | 5.72 | 🔴 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.53 | 5.46 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |

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
