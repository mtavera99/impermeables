# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-12 23:37 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$0** |
| gastado hoy (hasta las 21h) | $264,255 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $272,110 |
| saldo proyectado a medianoche | $-7,855 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $91,795 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-08 | $218,262 | 583 | **$374** | $3,762 | 10.05 |
| 2026-10-09 | $209,889 | 568 | **$370** | $3,163 | 8.56 |
| 2026-10-10 | $185,284 | 494 | **$375** | $3,444 | 9.18 |
| 2026-10-11 | $220,035 | 506 | **$435** | $3,195 | 7.35 |
| 2026-10-12 **HOY** | $264,255 | 754 | **$350** | $2,982 | 8.51 |

🟢 **Hoy va mejor que ayer a la misma hora** ($350 vs $435).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   350  =  $ 2,982  ÷  8.51
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,982 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.51 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $46,366 | 116% | 116 | $400 | 8.08 |
| TEST Creativos - API | $40,000 | $44,759 | 112% | 87 | $514 | 9.46 |
| Domiciliarios - API | $35,000 | $39,329 | 112% | 109 | $361 | 9.35 |
| Domiciliarios VIDEO - API | $20,000 | $24,488 | 122% | 91 | $269 | 9.42 |
| Motorizados - API | $20,000 | $23,096 | 115% | 87 | $265 | 11.58 |
| Domiciliarios VIDEO INTER - API | $20,000 | $22,397 | 112% | 60 | $373 | 7.68 |
| Domiciliarios INTER - API | $20,000 | $21,871 | 109% | 106 | $206 | 9.47 |
| Motorizados - INTER | $20,000 | $21,001 | 105% | 54 | $389 | 8.03 |
| Domiciliarios - Expancion - INTER | $20,000 | $20,948 | 105% | 48 | $436 | 4.56 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $264,255 | 758 | **$349** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,408**/pedido |
| utilidad estimada de lo que va del día | **$952,528** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $542 | $597 | $558 | $509 | $550 | $400 | 🟢 |
| TEST Creativos - API | $460 | $425 | $440 | $433 | $510 | $514 | 🟡 |
| Domiciliarios - API | $340 | $362 | $365 | $366 | $451 | $361 | 🟢 |
| Domiciliarios VIDEO - API | $400 | $297 | $250 | $282 | $276 | $269 | 🟡 |
| Motorizados - API | $414 | $331 | $433 | $312 | $447 | $265 | 🟢 |
| Domiciliarios VIDEO INTER - API | $390 | $417 | $391 | $514 | $515 | $373 | 🟢 |
| Domiciliarios INTER - API | $192 | $218 | $192 | $242 | $242 | $206 | 🟢 |
| Motorizados - INTER | $344 | $314 | $353 | $343 | $365 | $389 | 🟡 |
| Domiciliarios - Expancion - INTER | $540 | $438 | $483 | $442 | $603 | $436 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-07 | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.61 | 6.11 | 5.63 | 6.92 | 6.36 | 8.08 | 🟢 |
| TEST Creativos - API | 11.97 | 14.18 | 11.97 | 12.76 | 8.95 | 9.46 | 🟢 |
| Domiciliarios - API | 11.81 | 11.79 | 9.23 | 9.70 | 7.58 | 9.35 | 🟢 |
| Domiciliarios VIDEO - API | 8.65 | 12.37 | 11.67 | 10.90 | 9.99 | 9.42 | 🟡 |
| Motorizados - API | 8.67 | 11.74 | 7.01 | 10.22 | 6.89 | 11.58 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.63 | 8.15 | 8.36 | 6.82 | 6.48 | 7.68 | 🟢 |
| Domiciliarios INTER - API | 12.63 | 11.12 | 12.12 | 10.51 | 9.48 | 9.47 | 🟡 |
| Motorizados - INTER | 11.75 | 11.80 | 10.09 | 11.54 | 10.05 | 8.03 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.48 | 6.52 | 4.17 | 5.65 | 3.35 | 4.56 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-06 | $208,224 | 515 | $404 | $3,499 | 8.65 | $618,482 |
| 2026-10-07 | $232,604 | 600 | $388 | $3,641 | 9.39 | $730,548 |
| 2026-10-08 | $230,663 | 624 | $370 | $3,731 | 10.09 | $771,016 |
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |

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
