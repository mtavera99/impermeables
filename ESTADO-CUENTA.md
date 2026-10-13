# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 16:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$46,757** |
| gastado hoy (hasta las 16h) | $154,376 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $255,259 |
| saldo proyectado a medianoche | $-54,126 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $154,917 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $122,891 | 344 | **$357** | $3,318 | 9.29 |
| 2026-10-10 | $122,845 | 301 | **$408** | $3,611 | 8.85 |
| 2026-10-11 | $133,979 | 298 | **$450** | $3,252 | 7.23 |
| 2026-10-12 | $164,255 | 432 | **$380** | $3,106 | 8.17 |
| 2026-10-13 **HOY** | $154,529 | 476 | **$325** | $3,488 | 10.75 |

🟢 **Hoy va mejor que ayer a la misma hora** ($325 vs $380).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   325  =  $ 3,488  ÷  10.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,488 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $27,949 | 70% | 82 | $341 | 11.01 |
| TEST Creativos - API | $40,000 | $27,886 | 70% | 62 | $450 | 12.97 |
| Domiciliarios - API | $35,000 | $26,093 | 75% | 107 | $244 | 16.31 |
| Motorizados - API | $20,000 | $14,390 | 72% | 45 | $320 | 11.76 |
| Domiciliarios VIDEO - API | $20,000 | $13,921 | 70% | 52 | $268 | 10.12 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,818 | 59% | 17 | $695 | 4.55 |
| Motorizados - INTER | $20,000 | $11,712 | 59% | 24 | $488 | 7.05 |
| Domiciliarios INTER - API | $20,000 | $11,618 | 58% | 65 | $179 | 12.11 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,305 | 47% | 22 | $423 | 5.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $154,692 | 476 | **$325** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,974**/pedido |
| utilidad estimada de lo que va del día | **$609,409** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $451 | 🟢 |
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $341 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $244 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $320 | 🔴 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $268 | 🟡 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $695 | 🔴 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $488 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $179 | 🟢 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $423 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.47 | 12.93 | 🟢 |
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 8.00 | 11.01 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.25 | 16.31 | 🟢 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.49 | 11.76 | 🟡 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.30 | 10.12 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.59 | 4.55 | 🔴 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.90 | 7.05 | 🟡 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.33 | 12.11 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.53 | 5.41 | 🟢 |

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
| 2026-10-12 | $264,255 | 759 | $348 | $2,949 | 8.47 | $954,133 |

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
