# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-13 07:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$55,385** |
| gastado hoy (hasta las 7h) | $44,758 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $281,274 |
| saldo proyectado a medianoche | $-181,131 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $255,907 — entra en zona de freno a las 10:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-09 | $32,874 | 88 | **$374** | $3,152 | 8.44 |
| 2026-10-10 | $28,698 | 81 | **$354** | $3,461 | 9.77 |
| 2026-10-11 | $0 | 1 | **$0** | $0 | 0.00 |
| 2026-10-12 | $26,968 | 75 | **$360** | $3,095 | 8.61 |
| 2026-10-13 **HOY** | $44,758 | 107 | **$418** | $3,100 | 7.41 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($418 vs $360).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   418  =  $ 3,100  ÷  7.41
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,100 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.41 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $8,473 | 21% | 13 | $652 | 7.50 |
| Domiciliarios - Expancion - API | $40,000 | $8,320 | 21% | 20 | $416 | 8.75 |
| Domiciliarios - API | $35,000 | $7,084 | 20% | 24 | $295 | 11.29 |
| Domiciliarios VIDEO - API | $20,000 | $5,102 | 26% | 20 | $255 | 9.03 |
| Motorizados - API | $20,000 | $3,878 | 19% | 6 | $646 | 4.95 |
| Domiciliarios INTER - API | $20,000 | $3,521 | 18% | 18 | $196 | 10.96 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,219 | 16% | 3 | $1,073 | 2.75 |
| Motorizados - INTER | $20,000 | $2,871 | 14% | 3 | $957 | 3.29 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,290 | 11% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $44,758 | 107 | **$418** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,689**/pedido |
| utilidad estimada de lo que va del día | **$127,004** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $425 | $440 | $433 | $510 | $509 | $652 | 🔴 |
| Domiciliarios - Expancion - API | $597 | $558 | $509 | $550 | $400 | $416 | 🟡 |
| Domiciliarios - API | $362 | $365 | $366 | $451 | $361 | $295 | 🟢 |
| Domiciliarios VIDEO - API | $297 | $250 | $282 | $276 | $269 | $255 | 🟢 |
| Motorizados - API | $331 | $433 | $312 | $447 | $265 | $646 | 🔴 |
| Domiciliarios INTER - API | $218 | $192 | $242 | $242 | $206 | $196 | 🟢 |
| Domiciliarios VIDEO INTER - API | $417 | $391 | $514 | $515 | $373 | $1,073 | 🔴 |
| Motorizados - INTER | $314 | $353 | $343 | $365 | $389 | $957 | 🔴 |
| Domiciliarios - Expancion - INTER | $438 | $483 | $442 | $603 | $436 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-08 | 10-09 | 10-10 | 10-11 | 10-12 | 10-13 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 14.18 | 11.97 | 12.76 | 8.95 | 9.51 | 7.50 | 🔴 |
| Domiciliarios - Expancion - API | 6.11 | 5.63 | 6.92 | 6.36 | 8.03 | 8.75 | 🟢 |
| Domiciliarios - API | 11.79 | 9.23 | 9.70 | 7.58 | 9.29 | 11.29 | 🟢 |
| Domiciliarios VIDEO - API | 12.37 | 11.67 | 10.90 | 9.99 | 9.33 | 9.03 | 🟡 |
| Motorizados - API | 11.74 | 7.01 | 10.22 | 6.89 | 11.52 | 4.95 | 🔴 |
| Domiciliarios INTER - API | 11.12 | 12.12 | 10.51 | 9.48 | 9.39 | 10.96 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.15 | 8.36 | 6.82 | 6.48 | 7.62 | 2.75 | 🔴 |
| Motorizados - INTER | 11.80 | 10.09 | 11.54 | 10.05 | 7.94 | 3.29 | 🔴 |
| Domiciliarios - Expancion - INTER | 6.52 | 4.17 | 5.65 | 3.35 | 4.54 | — | 🟢 |

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
| 2026-10-12 | $264,255 | 759 | $348 | $2,961 | 8.50 | $954,133 |

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
