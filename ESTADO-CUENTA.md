# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-14 01:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,512** |
| gastado hoy (hasta las 1h) | $2,001 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $246,219 |
| saldo proyectado a medianoche | $-90,706 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $200,537 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-10 | $4,237 | 14 | **$303** | $3,088 | 10.20 |
| 2026-10-11 | $0 | 1 | **$0** | $0 | 0.00 |
| 2026-10-12 | $5,528 | 18 | **$307** | $2,730 | 8.89 |
| 2026-10-13 | $15,104 | 35 | **$432** | $2,831 | 6.56 |
| 2026-10-14 **HOY** | $2,001 | 5 | **$400** | $3,719 | 9.29 |

🟢 **Hoy va mejor que ayer a la misma hora** ($400 vs $432).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   400  =  $ 3,719  ÷  9.29
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,719 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.29 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $376 | 1% | 1 | $376 | 12.20 |
| Domiciliarios - API | $35,000 | $368 | 1% | 1 | $368 | 11.90 |
| Motorizados - API | $20,000 | $336 | 2% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $220 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $199 | 1% | 2 | $100 | 29.41 |
| Domiciliarios - Expancion - INTER | $20,000 | $154 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $148 | 0% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $122 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $78 | 0% | 1 | $78 | 47.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,001 | 5 | **$400** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,357**/pedido |
| utilidad estimada de lo que va del día | **$6,025** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $558 | $509 | $550 | $400 | $343 | $376 | 🟡 |
| Domiciliarios - API | $365 | $366 | $451 | $361 | $241 | $368 | 🔴 |
| Motorizados - API | $433 | $312 | $447 | $265 | $281 | — | 🟡 |
| Motorizados - INTER | $353 | $343 | $365 | $389 | $413 | — | 🟡 |
| Domiciliarios VIDEO - API | $250 | $282 | $276 | $269 | $251 | $100 | 🟢 |
| Domiciliarios - Expancion - INTER | $483 | $442 | $603 | $436 | $427 | — | 🟡 |
| TEST Creativos - API | $440 | $433 | $510 | $509 | $408 | — | 🟢 |
| Domiciliarios INTER - API | $192 | $242 | $242 | $206 | $181 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | $391 | $514 | $515 | $373 | $515 | $78 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.63 | 6.92 | 6.36 | 7.99 | 10.95 | 12.20 | 🟢 |
| Domiciliarios - API | 9.23 | 9.70 | 7.58 | 9.25 | 16.20 | 11.90 | 🔴 |
| Motorizados - API | 7.01 | 10.22 | 6.89 | 11.48 | 13.02 | — | 🟢 |
| Motorizados - INTER | 10.09 | 11.54 | 10.05 | 7.90 | 8.79 | — | 🟢 |
| Domiciliarios VIDEO - API | 11.67 | 10.90 | 9.99 | 9.30 | 10.86 | 29.41 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.17 | 5.65 | 3.35 | 4.53 | 5.47 | — | 🟢 |
| TEST Creativos - API | 11.97 | 12.76 | 8.95 | 9.47 | 14.23 | — | 🟢 |
| Domiciliarios INTER - API | 12.12 | 10.51 | 9.48 | 9.32 | 12.10 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.36 | 6.82 | 6.48 | 7.58 | 6.47 | 47.62 | 🟢 |

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
| 2026-10-13 | $244,813 | 791 | $309 | $3,493 | 11.29 | $1,024,943 |

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
