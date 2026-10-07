# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-07 02:10 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$168,548** |
| gastado hoy (hasta las 2h) | $3,734 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $236,470 |
| saldo proyectado a medianoche | $-64,188 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $183,768 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-03 | $4,200 | 13 | **$323** | $3,072 | 9.51 |
| 2026-10-04 | $7,009 | 18 | **$389** | $2,858 | 7.34 |
| 2026-10-05 | $7,506 | 25 | **$300** | $2,608 | 8.69 |
| 2026-10-06 | $6,138 | 21 | **$292** | $3,707 | 12.68 |
| 2026-10-07 **HOY** | $3,734 | 13 | **$287** | $4,006 | 13.95 |

🟢 **Hoy va mejor que ayer a la misma hora** ($287 vs $292).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   287  =  $ 4,006  ÷  13.95
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,006 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 13.95 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $606 | 2% | 2 | $303 | 12.50 |
| TEST Creativos - API | $40,000 | $522 | 1% | 1 | $522 | 11.24 |
| Domiciliarios - Expancion - INTER | $20,000 | $509 | 3% | 1 | $509 | 8.33 |
| Domiciliarios VIDEO INTER - API | $20,000 | $503 | 3% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $490 | 1% | 1 | $490 | 8.55 |
| Motorizados - INTER | $20,000 | $388 | 2% | 2 | $194 | 25.64 |
| Motorizados - API | $20,000 | $304 | 2% | 1 | $304 | 12.20 |
| Domiciliarios INTER - API | $20,000 | $226 | 1% | 4 | $56 | 43.48 |
| Domiciliarios VIDEO - API | $20,000 | $186 | 1% | 1 | $186 | 20.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $3,734 | 13 | **$287** | $2,402 | **12%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,280**/pedido |
| utilidad estimada de lo que va del día | **$17,134** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $456 | $416 | $479 | $463 | $510 | $303 | 🟢 |
| TEST Creativos - API | $503 | $482 | $478 | $519 | $526 | $522 | 🟡 |
| Domiciliarios - Expancion - INTER | $462 | $295 | $419 | $416 | $623 | $509 | 🟢 |
| Domiciliarios VIDEO INTER - API | $431 | $510 | $343 | $307 | $376 | — | 🔴 |
| Domiciliarios - API | $433 | $476 | $463 | $563 | $364 | $490 | 🔴 |
| Motorizados - INTER | $260 | $280 | $339 | $339 | $297 | $194 | 🟢 |
| Motorizados - API | $382 | $276 | $403 | $361 | $533 | $304 | 🟢 |
| Domiciliarios INTER - API | $183 | $141 | $223 | $207 | $215 | $56 | 🟢 |
| Domiciliarios VIDEO - API | $345 | $292 | $322 | $351 | $363 | $186 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-02 | 10-03 | 10-04 | 10-05 | 10-06 | 10-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.83 | 7.84 | 6.35 | 6.29 | 6.89 | 12.50 | 🟢 |
| TEST Creativos - API | 12.02 | 10.41 | 7.92 | 6.93 | 9.38 | 11.24 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.59 | 8.93 | 5.60 | 5.43 | 4.88 | 8.33 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.96 | 6.44 | 8.69 | 8.45 | 8.07 | — | 🟡 |
| Domiciliarios - API | 7.98 | 6.51 | 6.42 | 5.33 | 11.03 | 8.55 | 🔴 |
| Motorizados - INTER | 13.45 | 11.38 | 8.04 | 8.50 | 13.65 | 25.64 | 🟢 |
| Motorizados - API | 7.11 | 10.08 | 6.37 | 7.31 | 5.99 | 12.20 | 🟢 |
| Domiciliarios INTER - API | 12.98 | 14.55 | 7.82 | 8.22 | 10.49 | 43.48 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 9.14 | 7.11 | 6.43 | 9.26 | 20.00 | 🟢 |

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
| 2026-10-06 | $206,186 | 515 | $400 | $3,497 | 8.74 | $620,520 |

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
