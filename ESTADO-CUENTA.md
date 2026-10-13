# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 14:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$65,734** |
| gastado hoy (hasta las 14h) | $134,548 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $264,832 |
| saldo proyectado a medianoche | $-64,550 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $155,768 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $101,403 | 269 | **$377** | $3,346 | 8.88 |
| 2026-10-10 | $100,359 | 244 | **$411** | $3,617 | 8.80 |
| 2026-10-11 | $104,810 | 229 | **$458** | $3,259 | 7.12 |
| 2026-10-12 | $134,622 | 341 | **$395** | $3,155 | 7.99 |
| 2026-10-13 **HOY** | $134,548 | 406 | **$331** | $3,426 | 10.34 |

🟢 **Hoy va mejor que ayer a la misma hora** ($331 vs $395).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   331  =  $ 3,426  ÷  10.34
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,426 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.34 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $24,681 | 62% | 70 | $353 | 10.56 |
| TEST Creativos - API | $40,000 | $24,166 | 60% | 53 | $456 | 12.39 |
| Domiciliarios - API | $35,000 | $23,124 | 66% | 92 | $251 | 15.69 |
| Motorizados - API | $20,000 | $12,417 | 62% | 40 | $310 | 11.85 |
| Domiciliarios VIDEO - API | $20,000 | $12,345 | 62% | 45 | $274 | 9.70 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,415 | 52% | 12 | $868 | 3.53 |
| Domiciliarios INTER - API | $20,000 | $9,779 | 49% | 57 | $172 | 12.56 |
| Motorizados - INTER | $20,000 | $9,601 | 48% | 20 | $480 | 6.89 |
| Domiciliarios - Expancion - INTER | $20,000 | $8,020 | 40% | 17 | $472 | 4.65 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $134,548 | 406 | **$331** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,092**/pedido |
| utilidad estimada de lo que va del día | **$517,185** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $353 | 🟢 |
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $456 | 🟢 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $251 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $310 | 🔴 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $274 | 🟡 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $868 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $172 | 🟢 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $480 | 🔴 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | $472 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 8.00 | 10.56 | 🟢 |
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.48 | 12.39 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.26 | 15.69 | 🟢 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.49 | 11.85 | 🟡 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.30 | 9.70 | 🟡 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.59 | 3.53 | 🔴 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.34 | 12.56 | 🟢 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.91 | 6.89 | 🟡 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.53 | 4.65 | 🟡 |

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
| 2026-10-12 | $264,255 | 759 | $348 | $2,950 | 8.47 | $954,133 |

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
