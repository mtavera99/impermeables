# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-15 23:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$172,367** |
| gastado hoy (hasta las 23h) | $210,736 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $210,736 |
| saldo proyectado a medianoche | $172,367 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $87,347 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-11 | $235,745 | 555 | **$425** | $3,167 | 7.46 |
| 2026-10-12 | $264,255 | 759 | **$348** | $2,947 | 8.46 |
| 2026-10-13 | $246,905 | 791 | **$312** | $3,492 | 11.19 |
| 2026-10-14 | $233,531 | 645 | **$362** | $3,192 | 8.82 |
| 2026-10-15 **HOY** | $210,942 | 549 | **$384** | $3,069 | 7.99 |

🟠 Hoy va 6% más caro que ayer a la misma hora ($384 vs $362).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   384  =  $ 3,069  ÷  7.99
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,069 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.99 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $33,829 | 85% | 89 | $380 | 10.37 |
| Domiciliarios - Expancion - API | $40,000 | $30,502 | 76% | 45 | $678 | 4.54 |
| Domiciliarios - API | $35,000 | $26,260 | 75% | 75 | $350 | 9.54 |
| Domiciliarios VIDEO INTER - API | $20,000 | $18,306 | 92% | 40 | $458 | 7.06 |
| Domiciliarios - Expancion - INTER | $20,000 | $18,035 | 90% | 48 | $376 | 6.32 |
| Motorizados - INTER | $20,000 | $17,076 | 85% | 51 | $335 | 11.36 |
| Domiciliarios VIDEO - API | $20,000 | $15,929 | 80% | 55 | $290 | 7.69 |
| Motorizados - API | $20,000 | $15,532 | 78% | 42 | $370 | 8.25 |
| Domiciliarios INTER - API | $20,000 | $14,659 | 73% | 53 | $277 | 8.49 |
| Domiciliarios Q58 - | $20,000 | $6,957 | 35% | 25 | $278 | 14.38 |
| Domiciliarios VIDEO Q58 - | $20,000 | $4,987 | 25% | 13 | $384 | 7.93 |
| Motorizados - Q58 | $20,000 | $4,895 | 24% | 9 | $544 | 6.09 |
| Domiciliarios - Expancion - Q58 | $20,000 | $4,044 | 20% | 4 | $1,011 | 3.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $211,011 | 549 | **$384** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,065**/pedido |
| utilidad estimada de lo que va del día | **$670,274** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $433 | $510 | $509 | $412 | $377 | $380 | 🟡 |
| Domiciliarios - Expancion - API | $509 | $550 | $400 | $345 | $447 | $678 | 🔴 |
| Domiciliarios - API | $366 | $451 | $361 | $243 | $295 | $350 | 🔴 |
| Domiciliarios VIDEO INTER - API | $514 | $515 | $373 | $518 | $530 | $458 | 🟢 |
| Domiciliarios - Expancion - INTER | $442 | $603 | $436 | $428 | $569 | $376 | 🟢 |
| Motorizados - INTER | $343 | $365 | $389 | $418 | $410 | $335 | 🟢 |
| Domiciliarios VIDEO - API | $282 | $276 | $269 | $254 | $257 | $290 | 🟡 |
| Motorizados - API | $312 | $447 | $265 | $284 | $278 | $370 | 🔴 |
| Domiciliarios INTER - API | $242 | $242 | $206 | $184 | $291 | $271 | 🟢 |
| Domiciliarios Q58 - | — | — | — | — | — | $278 |  |
| Domiciliarios VIDEO Q58 - | — | — | — | — | — | $384 |  |
| Motorizados - Q58 | — | — | — | — | — | $547 |  |
| Domiciliarios - Expancion - Q58 | — | — | — | — | — | $1,011 |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.76 | 8.95 | 9.47 | 14.12 | 12.49 | 10.37 | 🔴 |
| Domiciliarios - Expancion - API | 6.92 | 6.36 | 7.99 | 10.87 | 7.43 | 4.54 | 🔴 |
| Domiciliarios - API | 9.70 | 7.58 | 9.25 | 16.04 | 12.23 | 9.54 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.82 | 6.48 | 7.58 | 6.42 | 5.73 | 7.06 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.65 | 3.35 | 4.53 | 5.44 | 4.17 | 6.32 | 🟢 |
| Motorizados - INTER | 11.54 | 10.05 | 7.90 | 8.70 | 9.36 | 11.36 | 🟢 |
| Domiciliarios VIDEO - API | 10.90 | 9.99 | 9.30 | 10.74 | 10.15 | 7.69 | 🔴 |
| Motorizados - API | 10.22 | 6.89 | 11.48 | 12.90 | 11.42 | 8.25 | 🔴 |
| Domiciliarios INTER - API | 10.51 | 9.48 | 9.32 | 11.97 | 7.92 | 8.65 | 🟢 |
| Domiciliarios Q58 - | — | — | — | — | — | 14.38 |  |
| Domiciliarios VIDEO Q58 - | — | — | — | — | — | 7.93 |  |
| Motorizados - Q58 | — | — | — | — | — | 6.05 |  |
| Domiciliarios - Expancion - Q58 | — | — | — | — | — | 3.00 |  |

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
| 2026-10-14 | $233,531 | 645 | $362 | $3,192 | 8.82 | $801,858 |

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
