# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 13:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$226,827** |
| gastado hoy (hasta las 13h) | $162,123 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $371,766 |
| saldo proyectado a medianoche | $17,184 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $138,700 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $143,447 | 335 | **$428** | $3,256 | 7.60 |
| 2026-10-18 | $135,419 | 296 | **$457** | $3,297 | 7.21 |
| 2026-10-19 | $164,966 | 388 | **$425** | $2,774 | 6.53 |
| 2026-10-20 | $143,583 | 289 | **$497** | $3,277 | 6.60 |
| 2026-10-21 **HOY** | $162,123 | 360 | **$450** | $3,949 | 8.77 |

🟢 **Hoy va mejor que ayer a la misma hora** ($450 vs $497).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   450  =  $ 3,949  ÷  8.77
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,949 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.77 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $21,080 | 53% | 42 | $502 | 10.14 |
| Domiciliarios - API | $35,000 | $18,005 | 51% | 54 | $333 | 15.30 |
| Domiciliarios Q58 - | $25,000 | $13,211 | 53% | 64 | $206 | 10.56 |
| Domiciliarios VIDEO INTER - API | $25,000 | $12,765 | 51% | 20 | $638 | 6.43 |
| TEST Creativos - API | $40,000 | $12,675 | 32% | 25 | $507 | 11.44 |
| Domiciliarios INTER - API | $25,000 | $12,002 | 48% | 36 | $333 | 11.55 |
| Motorizados - INTER | $25,000 | $11,910 | 48% | 24 | $496 | 12.81 |
| Domiciliarios VIDEO - API | $20,000 | $10,754 | 54% | 32 | $336 | 12.13 |
| Motorizados - API | $20,000 | $10,724 | 54% | 19 | $564 | 7.17 |
| Motorizados - Q58 | $25,000 | $10,686 | 43% | 8 | $1,336 | 2.56 |
| Domiciliarios - Expancion - INTER | $25,000 | $9,948 | 40% | 15 | $663 | 4.93 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,907 | 40% | 13 | $762 | 3.73 |
| Domiciliarios - Expancion - Q58 | $25,000 | $8,188 | 33% | 6 | $1,365 | 2.93 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $161,855 | 358 | **$452** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,311**/pedido |
| utilidad estimada de lo que va del día | **$412,826** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $581 | $507 | 🟢 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $484 | $333 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $184 | $206 | 🟡 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $576 | $638 | 🟡 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $609 | $507 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $324 | $333 | 🟡 |
| Motorizados - INTER | $463 | $529 | $521 | $480 | $590 | $496 | 🟢 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $318 | $336 | 🟡 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $564 | 🔴 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $544 | $1,336 | 🔴 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $628 | $663 | 🟡 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $642 | $762 | 🔴 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,119 | $1,365 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.60 | 10.08 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.55 | 15.30 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.15 | 10.56 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.48 | 6.43 | 🟡 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.80 | 11.44 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.04 | 11.55 | 🟡 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.77 | 12.81 | 🟢 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.82 | 12.13 | 🟡 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.07 | 7.17 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.76 | 2.56 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.47 | 4.93 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.73 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.71 | 2.93 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,458 | 796 | $431 | $3,067 | 7.11 | $934,324 |
| 2026-10-20 | $384,378 | 837 | $459 | $3,525 | 7.68 | $959,220 |

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
