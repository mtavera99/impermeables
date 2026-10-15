# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-15 18:31 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$59,574** |
| gastado hoy (hasta las 18h) | $124,262 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $181,936 |
| saldo proyectado a medianoche | $1,900 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $172,214 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-11 | $167,569 | 371 | **$452** | $3,235 | 7.16 |
| 2026-10-12 | $224,570 | 617 | **$364** | $2,996 | 8.23 |
| 2026-10-13 | $190,713 | 594 | **$321** | $3,559 | 11.08 |
| 2026-10-14 | $174,354 | 449 | **$388** | $3,338 | 8.60 |
| 2026-10-15 **HOY** | $124,262 | 329 | **$378** | $3,052 | 8.08 |

🟢 **Hoy va mejor que ayer a la misma hora** ($378 vs $388).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   378  =  $ 3,052  ÷  8.08
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,052 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.08 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $22,208 | 56% | 61 | $364 | 11.09 |
| Domiciliarios - Expancion - API | $40,000 | $20,154 | 50% | 33 | $611 | 4.92 |
| Domiciliarios - API | $35,000 | $18,821 | 54% | 52 | $362 | 9.18 |
| Motorizados - INTER | $20,000 | $11,348 | 57% | 35 | $324 | 11.95 |
| Domiciliarios VIDEO - API | $20,000 | $11,102 | 56% | 40 | $278 | 7.72 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,900 | 55% | 31 | $352 | 6.91 |
| Motorizados - API | $20,000 | $10,751 | 54% | 27 | $398 | 7.70 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,405 | 52% | 21 | $495 | 6.51 |
| Domiciliarios INTER - API | $20,000 | $8,573 | 43% | 29 | $296 | 8.23 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $124,262 | 329 | **$378** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,943**/pedido |
| utilidad estimada de lo que va del día | **$403,867** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $433 | $510 | $509 | $412 | $377 | $364 | 🟡 |
| Domiciliarios - Expancion - API | $509 | $550 | $400 | $345 | $447 | $611 | 🔴 |
| Domiciliarios - API | $366 | $451 | $361 | $243 | $295 | $362 | 🔴 |
| Motorizados - INTER | $343 | $365 | $389 | $418 | $410 | $324 | 🟢 |
| Domiciliarios VIDEO - API | $282 | $276 | $269 | $254 | $257 | $278 | 🟡 |
| Domiciliarios - Expancion - INTER | $442 | $603 | $436 | $428 | $569 | $352 | 🟢 |
| Motorizados - API | $312 | $447 | $265 | $284 | $278 | $398 | 🔴 |
| Domiciliarios VIDEO INTER - API | $514 | $515 | $373 | $518 | $530 | $495 | 🟢 |
| Domiciliarios INTER - API | $242 | $242 | $206 | $184 | $291 | $296 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.76 | 8.95 | 9.47 | 14.12 | 12.49 | 11.09 | 🟡 |
| Domiciliarios - Expancion - API | 6.92 | 6.36 | 7.99 | 10.87 | 7.44 | 4.92 | 🔴 |
| Domiciliarios - API | 9.70 | 7.58 | 9.25 | 16.04 | 12.23 | 9.18 | 🔴 |
| Motorizados - INTER | 11.54 | 10.05 | 7.90 | 8.70 | 9.36 | 11.95 | 🟢 |
| Domiciliarios VIDEO - API | 10.90 | 9.99 | 9.30 | 10.74 | 10.15 | 7.72 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.65 | 3.35 | 4.53 | 5.44 | 4.17 | 6.91 | 🟢 |
| Motorizados - API | 10.22 | 6.89 | 11.48 | 12.90 | 11.42 | 7.70 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.82 | 6.48 | 7.58 | 6.42 | 5.73 | 6.51 | 🟢 |
| Domiciliarios INTER - API | 10.51 | 9.48 | 9.32 | 11.97 | 7.93 | 8.23 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,510 | 645 | $362 | $3,192 | 8.82 | $801,879 |

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
