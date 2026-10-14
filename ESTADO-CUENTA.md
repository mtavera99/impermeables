# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-14 15:20 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$33,465** |
| gastado hoy (hasta las 15h) | $120,794 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $222,244 |
| saldo proyectado a medianoche | $-67,984 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $201,791 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-10 | $111,418 | 273 | **$408** | $3,626 | 8.88 |
| 2026-10-11 | $120,641 | 263 | **$459** | $3,249 | 7.08 |
| 2026-10-12 | $150,580 | 387 | **$389** | $3,148 | 8.09 |
| 2026-10-13 | $157,469 | 470 | **$335** | $3,486 | 10.40 |
| 2026-10-14 **HOY** | $120,794 | 308 | **$392** | $3,393 | 8.65 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($392 vs $335).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   392  =  $ 3,393  ÷  8.65
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,393 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.65 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $21,980 | 55% | 45 | $488 | 6.95 |
| TEST Creativos - API | $40,000 | $19,612 | 49% | 45 | $436 | 11.38 |
| Domiciliarios - API | $35,000 | $19,209 | 55% | 65 | $296 | 12.65 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,875 | 54% | 18 | $604 | 5.32 |
| Motorizados - API | $20,000 | $10,861 | 54% | 34 | $319 | 10.19 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,630 | 53% | 18 | $591 | 4.50 |
| Domiciliarios VIDEO - API | $20,000 | $10,338 | 52% | 42 | $246 | 10.79 |
| Motorizados - INTER | $20,000 | $9,274 | 46% | 22 | $422 | 9.62 |
| Domiciliarios INTER - API | $20,000 | $8,015 | 40% | 20 | $401 | 6.40 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $120,794 | 309 | **$391** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,186**/pedido |
| utilidad estimada de lo que va del día | **$375,230** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $558 | $509 | $550 | $400 | $345 | $488 | 🔴 |
| TEST Creativos - API | $440 | $433 | $510 | $509 | $411 | $436 | 🟡 |
| Domiciliarios - API | $365 | $366 | $451 | $361 | $243 | $296 | 🔴 |
| Domiciliarios VIDEO INTER - API | $391 | $514 | $515 | $373 | $518 | $604 | 🔴 |
| Motorizados - API | $433 | $312 | $447 | $265 | $284 | $319 | 🟡 |
| Domiciliarios - Expancion - INTER | $483 | $442 | $603 | $436 | $428 | $591 | 🔴 |
| Domiciliarios VIDEO - API | $250 | $282 | $276 | $269 | $253 | $246 | 🟡 |
| Motorizados - INTER | $353 | $343 | $365 | $389 | $417 | $422 | 🟡 |
| Domiciliarios INTER - API | $192 | $242 | $242 | $206 | $184 | $401 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.63 | 6.92 | 6.36 | 7.99 | 10.88 | 6.95 | 🔴 |
| TEST Creativos - API | 11.97 | 12.76 | 8.95 | 9.47 | 14.13 | 11.38 | 🔴 |
| Domiciliarios - API | 9.23 | 9.70 | 7.58 | 9.25 | 16.06 | 12.65 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.36 | 6.82 | 6.48 | 7.58 | 6.42 | 5.32 | 🔴 |
| Motorizados - API | 7.01 | 10.22 | 6.89 | 11.48 | 12.91 | 10.19 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.17 | 5.65 | 3.35 | 4.53 | 5.44 | 4.50 | 🔴 |
| Domiciliarios VIDEO - API | 11.67 | 10.90 | 9.99 | 9.30 | 10.75 | 10.79 | 🟡 |
| Motorizados - INTER | 10.09 | 11.54 | 10.05 | 7.90 | 8.71 | 9.62 | 🟢 |
| Domiciliarios INTER - API | 12.12 | 10.51 | 9.48 | 9.32 | 11.99 | 6.40 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,693 | 791 | $312 | $3,492 | 11.20 | $1,023,063 |

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
