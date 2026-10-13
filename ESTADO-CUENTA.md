# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 08:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$40,390** |
| gastado hoy (hasta las 8h) | $59,519 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $284,738 |
| saldo proyectado a medianoche | $-184,829 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $256,141 — entra en zona de freno a las 10:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $42,307 | 117 | **$362** | $3,143 | 8.69 |
| 2026-10-10 | $38,836 | 102 | **$381** | $3,544 | 9.31 |
| 2026-10-11 | $9,585 | 15 | **$639** | $3,631 | 5.68 |
| 2026-10-12 | $39,977 | 111 | **$360** | $3,144 | 8.73 |
| 2026-10-13 **HOY** | $59,867 | 162 | **$370** | $3,183 | 8.61 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($370 vs $360).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   370  =  $ 3,183  ÷  8.61
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,183 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.61 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $11,325 | 28% | 19 | $596 | 8.40 |
| Domiciliarios - Expancion - API | $40,000 | $10,840 | 27% | 30 | $361 | 9.92 |
| Domiciliarios - API | $35,000 | $9,953 | 28% | 37 | $269 | 13.10 |
| Domiciliarios VIDEO - API | $20,000 | $6,548 | 33% | 26 | $252 | 9.51 |
| Motorizados - API | $20,000 | $5,677 | 28% | 15 | $378 | 9.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,404 | 22% | 7 | $629 | 4.52 |
| Domiciliarios INTER - API | $20,000 | $4,391 | 22% | 23 | $191 | 11.14 |
| Motorizados - INTER | $20,000 | $3,822 | 19% | 3 | $1,274 | 2.65 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,984 | 15% | 2 | $1,492 | 1.27 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $59,944 | 162 | **$370** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,802**/pedido |
| utilidad estimada de lo que va del día | **$200,107** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $596 | 🔴 |
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $361 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $275 | 🟢 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $252 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $378 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $192 | 🟢 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $629 | 🔴 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $1,274 | 🔴 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $1,492 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.50 | 8.40 | 🟡 |
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 8.02 | 9.92 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.28 | 12.87 | 🟢 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.32 | 9.51 | 🟡 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.51 | 9.00 | 🔴 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.38 | 11.04 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.61 | 4.52 | 🔴 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.93 | 2.65 | 🔴 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.54 | 1.27 | 🔴 |

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
| 2026-10-12 | $264,255 | 759 | $348 | $2,957 | 8.49 | $954,133 |

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
