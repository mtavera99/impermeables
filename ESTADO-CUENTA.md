# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 15:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$55,604** |
| gastado hoy (hasta las 15h) | $144,720 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $259,110 |
| saldo proyectado a medianoche | $-58,786 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $155,726 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $111,179 | 291 | **$382** | $3,352 | 8.77 |
| 2026-10-10 | $111,418 | 273 | **$408** | $3,626 | 8.88 |
| 2026-10-11 | $120,641 | 263 | **$459** | $3,249 | 7.08 |
| 2026-10-12 | $150,580 | 387 | **$389** | $3,148 | 8.09 |
| 2026-10-13 **HOY** | $144,720 | 448 | **$323** | $3,460 | 10.71 |

🟢 **Hoy va mejor que ayer a la misma hora** ($323 vs $389).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   323  =  $ 3,460  ÷  10.71
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,460 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.71 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $26,143 | 65% | 77 | $340 | 10.96 |
| TEST Creativos - API | $40,000 | $26,104 | 65% | 57 | $458 | 12.54 |
| Domiciliarios - API | $35,000 | $24,855 | 71% | 102 | $244 | 16.34 |
| Motorizados - API | $20,000 | $13,523 | 68% | 43 | $314 | 11.91 |
| Domiciliarios VIDEO - API | $20,000 | $13,114 | 66% | 49 | $268 | 10.04 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,109 | 56% | 17 | $653 | 4.75 |
| Motorizados - INTER | $20,000 | $10,755 | 54% | 23 | $468 | 7.28 |
| Domiciliarios INTER - API | $20,000 | $10,487 | 52% | 59 | $178 | 12.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $8,630 | 43% | 21 | $411 | 5.43 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $144,720 | 448 | **$323** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,938**/pedido |
| utilidad estimada de lo que va del día | **$574,434** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $340 | 🟢 |
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $458 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $244 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $314 | 🔴 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $268 | 🟡 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $653 | 🔴 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $468 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $178 | 🟢 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $411 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 8.00 | 10.96 | 🟢 |
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.48 | 12.54 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.25 | 16.34 | 🟢 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.49 | 11.91 | 🟡 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.30 | 10.04 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.59 | 4.75 | 🔴 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.91 | 7.28 | 🟡 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.33 | 12.00 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.53 | 5.43 | 🟢 |

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
