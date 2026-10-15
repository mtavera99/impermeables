# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-15 00:51 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$60,407** |
| gastado hoy (hasta las 0h) | $1,354 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $234,395 |
| saldo proyectado a medianoche | $-172,634 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $294,289 — entra en zona de freno a las 8:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-11 | $0 | 1 | **$0** | $0 | 0.00 |
| 2026-10-12 | $3,387 | 8 | **$423** | $2,758 | 6.51 |
| 2026-10-13 | $10,417 | 18 | **$579** | $2,867 | 4.95 |
| 2026-10-14 | $2,133 | 5 | **$427** | $3,634 | 8.52 |
| 2026-10-15 **HOY** | $1,354 | 5 | **$271** | $3,134 | 11.57 |

🟢 **Hoy va mejor que ayer a la misma hora** ($271 vs $427).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   271  =  $ 3,134  ÷  11.57
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,134 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.57 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $249 | 1% | 1 | $249 | 16.39 |
| Motorizados - INTER | $20,000 | $183 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $165 | 1% | 2 | $82 | 25.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $159 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $158 | 0% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $137 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $128 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $88 | 0% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $87 | 0% | 2 | $44 | 48.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $1,354 | 5 | **$271** | $2,402 | **11%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$4,978**/pedido |
| utilidad estimada de lo que va del día | **$6,672** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $366 | $451 | $361 | $243 | $293 | $249 | 🟢 |
| Motorizados - INTER | $343 | $365 | $389 | $418 | $407 | — | 🟡 |
| Domiciliarios - Expancion - INTER | $442 | $603 | $436 | $428 | $566 | $82 | 🟢 |
| Domiciliarios VIDEO INTER - API | $514 | $515 | $373 | $518 | $526 | — | 🟡 |
| Domiciliarios - Expancion - API | $509 | $550 | $400 | $345 | $443 | — | 🔴 |
| TEST Creativos - API | $433 | $510 | $509 | $412 | $375 | — | 🟢 |
| Domiciliarios VIDEO - API | $282 | $276 | $269 | $254 | $254 | — | 🟡 |
| Motorizados - API | $312 | $447 | $265 | $284 | $276 | — | 🟡 |
| Domiciliarios INTER - API | $242 | $242 | $206 | $184 | $287 | $44 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.70 | 7.58 | 9.25 | 16.04 | 12.34 | 16.39 | 🟢 |
| Motorizados - INTER | 11.54 | 10.05 | 7.90 | 8.70 | 9.47 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 5.65 | 3.35 | 4.53 | 5.44 | 4.20 | 25.00 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.82 | 6.48 | 7.58 | 6.42 | 5.79 | — | 🟡 |
| Domiciliarios - Expancion - API | 6.92 | 6.36 | 7.99 | 10.87 | 7.51 | — | 🔴 |
| TEST Creativos - API | 12.76 | 8.95 | 9.47 | 14.12 | 12.62 | — | 🟡 |
| Domiciliarios VIDEO - API | 10.90 | 9.99 | 9.30 | 10.74 | 10.26 | — | 🟡 |
| Motorizados - API | 10.22 | 6.89 | 11.48 | 12.90 | 11.53 | — | 🟡 |
| Domiciliarios INTER - API | 10.51 | 9.48 | 9.32 | 11.97 | 8.06 | 48.78 | 🟢 |

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
| 2026-10-14 | $231,727 | 645 | $359 | $3,201 | 8.91 | $803,662 |

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
