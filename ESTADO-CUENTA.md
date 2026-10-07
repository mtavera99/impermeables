# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-07 11:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$101,805** |
| gastado hoy (hasta las 11h) | $68,496 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $215,584 |
| saldo proyectado a medianoche | $-45,284 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $185,749 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-03 | $69,893 | 212 | **$330** | $3,463 | 10.50 |
| 2026-10-04 | $87,657 | 212 | **$413** | $3,054 | 7.38 |
| 2026-10-05 | $113,677 | 267 | **$426** | $2,510 | 5.90 |
| 2026-10-06 | $72,740 | 181 | **$402** | $3,560 | 8.86 |
| 2026-10-07 **HOY** | $68,367 | 164 | **$417** | $3,851 | 9.24 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($417 vs $402).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   417  =  $ 3,851  ÷  9.24
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,851 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.24 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $12,210 | 31% | 28 | $436 | 8.71 |
| TEST Creativos - API | $40,000 | $11,810 | 30% | 27 | $437 | 14.42 |
| Domiciliarios - API | $35,000 | $10,964 | 31% | 24 | $457 | 9.33 |
| Domiciliarios VIDEO - API | $20,000 | $7,144 | 36% | 20 | $357 | 9.90 |
| Motorizados - API | $20,000 | $5,918 | 30% | 13 | $455 | 8.28 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,761 | 29% | 8 | $720 | 4.41 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,512 | 28% | 9 | $612 | 4.84 |
| Domiciliarios INTER - API | $20,000 | $4,948 | 25% | 20 | $247 | 10.08 |
| Motorizados - INTER | $20,000 | $4,229 | 21% | 15 | $282 | 17.20 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $68,496 | 164 | **$418** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,678**/pedido |
| utilidad estimada de lo que va del día | **$194,766** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $456 | $416 | $479 | $463 | $514 | $436 | 🟢 |
| TEST Creativos - API | $503 | $482 | $478 | $519 | $530 | $437 | 🟢 |
| Domiciliarios - API | $433 | $476 | $463 | $563 | $365 | $457 | 🔴 |
| Domiciliarios VIDEO - API | $345 | $292 | $322 | $351 | $365 | $357 | 🟡 |
| Motorizados - API | $382 | $276 | $403 | $361 | $537 | $455 | 🟢 |
| Domiciliarios - Expancion - INTER | $462 | $295 | $419 | $416 | $625 | $720 | 🔴 |
| Domiciliarios VIDEO INTER - API | $431 | $510 | $343 | $307 | $379 | $612 | 🔴 |
| Domiciliarios INTER - API | $183 | $141 | $223 | $207 | $217 | $247 | 🟡 |
| Motorizados - INTER | $260 | $280 | $339 | $339 | $301 | $282 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.83 | 7.84 | 6.35 | 6.29 | 6.85 | 8.71 | 🟢 |
| TEST Creativos - API | 12.02 | 10.41 | 7.92 | 6.93 | 9.35 | 14.42 | 🟢 |
| Domiciliarios - API | 7.98 | 6.51 | 6.42 | 5.33 | 10.97 | 9.33 | 🟡 |
| Domiciliarios VIDEO - API | 8.25 | 9.14 | 7.11 | 6.43 | 9.20 | 9.90 | 🟢 |
| Motorizados - API | 7.11 | 10.08 | 6.37 | 7.31 | 5.96 | 8.28 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.59 | 8.93 | 5.60 | 5.43 | 4.85 | 4.41 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.96 | 6.44 | 8.69 | 8.45 | 7.99 | 4.84 | 🔴 |
| Domiciliarios INTER - API | 12.98 | 14.55 | 7.82 | 8.22 | 10.39 | 10.08 | 🟡 |
| Motorizados - INTER | 13.45 | 11.38 | 8.04 | 8.50 | 13.53 | 17.20 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $631,432 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $673,813 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $686,422 |
| 2026-10-04 | $289,497 | 748 | $387 | $2,741 | 7.08 | $911,233 |
| 2026-10-05 | $272,931 | 704 | $388 | $2,669 | 6.89 | $857,168 |
| 2026-10-06 | $207,663 | 515 | $403 | $3,500 | 8.68 | $619,043 |

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
