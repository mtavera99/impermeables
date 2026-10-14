# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-14 14:20 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$44,354** |
| gastado hoy (hasta las 14h) | $108,398 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $222,244 |
| saldo proyectado a medianoche | $-69,492 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $203,298 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-10 | $100,359 | 244 | **$411** | $3,617 | 8.80 |
| 2026-10-11 | $104,810 | 229 | **$458** | $3,259 | 7.12 |
| 2026-10-12 | $134,622 | 341 | **$395** | $3,155 | 7.99 |
| 2026-10-13 | $148,574 | 442 | **$336** | $3,469 | 10.32 |
| 2026-10-14 **HOY** | $108,398 | 273 | **$397** | $3,395 | 8.55 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($397 vs $336).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   397  =  $ 3,395  ÷  8.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,395 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.55 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $20,043 | 50% | 38 | $527 | 6.35 |
| TEST Creativos - API | $40,000 | $17,765 | 44% | 41 | $433 | 11.28 |
| Domiciliarios - API | $35,000 | $17,586 | 50% | 58 | $303 | 12.27 |
| Motorizados - API | $20,000 | $9,797 | 49% | 30 | $327 | 9.83 |
| Domiciliarios VIDEO - API | $20,000 | $9,415 | 47% | 38 | $248 | 10.63 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,410 | 47% | 17 | $554 | 5.86 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,407 | 47% | 15 | $627 | 4.32 |
| Motorizados - INTER | $20,000 | $7,991 | 40% | 19 | $421 | 9.93 |
| Domiciliarios INTER - API | $20,000 | $6,984 | 35% | 17 | $411 | 6.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $108,398 | 273 | **$397** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,299**/pedido |
| utilidad estimada de lo que va del día | **$329,836** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $558 | $509 | $550 | $400 | $345 | $527 | 🔴 |
| TEST Creativos - API | $440 | $433 | $510 | $509 | $411 | $433 | 🟡 |
| Domiciliarios - API | $365 | $366 | $451 | $361 | $243 | $303 | 🔴 |
| Motorizados - API | $433 | $312 | $447 | $265 | $284 | $327 | 🟡 |
| Domiciliarios - Expancion - INTER | $483 | $442 | $603 | $436 | $428 | $632 | 🔴 |
| Domiciliarios VIDEO - API | $250 | $282 | $276 | $269 | $253 | $248 | 🟡 |
| Domiciliarios VIDEO INTER - API | $391 | $514 | $515 | $373 | $518 | $554 | 🟡 |
| Motorizados - INTER | $353 | $343 | $365 | $389 | $417 | $421 | 🟡 |
| Domiciliarios INTER - API | $192 | $242 | $242 | $206 | $183 | $411 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.63 | 6.92 | 6.36 | 7.99 | 10.88 | 6.35 | 🔴 |
| TEST Creativos - API | 11.97 | 12.76 | 8.95 | 9.47 | 14.13 | 11.28 | 🔴 |
| Domiciliarios - API | 9.23 | 9.70 | 7.58 | 9.25 | 16.06 | 12.27 | 🔴 |
| Motorizados - API | 7.01 | 10.22 | 6.89 | 11.48 | 12.91 | 9.83 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.17 | 5.65 | 3.35 | 4.53 | 5.45 | 4.28 | 🔴 |
| Domiciliarios VIDEO - API | 11.67 | 10.90 | 9.99 | 9.30 | 10.75 | 10.63 | 🟡 |
| Domiciliarios VIDEO INTER - API | 8.36 | 6.82 | 6.48 | 7.58 | 6.42 | 5.86 | 🟡 |
| Motorizados - INTER | 10.09 | 11.54 | 10.05 | 7.90 | 8.71 | 9.93 | 🟢 |
| Domiciliarios INTER - API | 12.12 | 10.51 | 9.48 | 9.32 | 11.99 | 6.36 | 🔴 |

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
| 2026-10-13 | $246,633 | 791 | $312 | $3,492 | 11.20 | $1,023,123 |

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
