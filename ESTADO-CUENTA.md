# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 16:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$174,487** |
| gastado hoy (hasta las 16h) | $213,946 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $368,490 |
| saldo proyectado a medianoche | $19,942 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $139,217 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $207,107 | 463 | **$447** | $3,236 | 7.24 |
| 2026-10-18 | $196,842 | 429 | **$459** | $3,253 | 7.09 |
| 2026-10-19 | $218,336 | 516 | **$423** | $2,897 | 6.85 |
| 2026-10-20 | $200,753 | 396 | **$507** | $3,333 | 6.57 |
| 2026-10-21 **HOY** | $213,946 | 468 | **$457** | $3,962 | 8.67 |

🟢 **Hoy va mejor que ayer a la misma hora** ($457 vs $507).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   457  =  $ 3,962  ÷  8.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,962 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.67 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $27,955 | 70% | 49 | $571 | 8.84 |
| Domiciliarios - API | $35,000 | $23,605 | 67% | 67 | $352 | 14.15 |
| TEST Creativos - API | $40,000 | $17,602 | 44% | 34 | $518 | 11.36 |
| Domiciliarios Q58 - | $25,000 | $17,106 | 68% | 78 | $219 | 9.89 |
| Domiciliarios VIDEO INTER - API | $25,000 | $16,453 | 66% | 24 | $686 | 6.11 |
| Motorizados - INTER | $25,000 | $16,345 | 65% | 33 | $495 | 12.67 |
| Domiciliarios INTER - API | $25,000 | $16,007 | 64% | 50 | $320 | 11.72 |
| Motorizados - API | $20,000 | $13,891 | 69% | 28 | $496 | 8.13 |
| Motorizados - Q58 | $25,000 | $13,834 | 55% | 14 | $988 | 3.46 |
| Domiciliarios VIDEO - API | $20,000 | $13,833 | 69% | 48 | $288 | 14.16 |
| Domiciliarios - Expancion - INTER | $25,000 | $12,849 | 51% | 19 | $676 | 4.78 |
| Domiciliarios VIDEO Q58 - | $25,000 | $12,772 | 51% | 15 | $851 | 3.53 |
| Domiciliarios - Expancion - Q58 | $25,000 | $11,699 | 47% | 10 | $1,170 | 3.40 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $213,951 | 469 | **$456** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,386**/pedido |
| utilidad estimada de lo que va del día | **$538,913** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $583 | $571 | 🟡 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $484 | $352 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $609 | $518 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $185 | $219 | 🔴 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $576 | $686 | 🔴 |
| Motorizados - INTER | $463 | $529 | $521 | $480 | $591 | $495 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $324 | $320 | 🟡 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $496 | 🟡 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $545 | $865 | 🔴 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $319 | $288 | 🟢 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $536 | $629 | $676 | 🟡 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $642 | $852 | 🔴 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,120 | $1,170 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.59 | 8.84 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.54 | 14.15 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.80 | 11.36 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.13 | 9.89 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.47 | 6.10 | 🔴 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.76 | 12.67 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.03 | 11.72 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.05 | 8.13 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.75 | 3.96 | 🔴 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.80 | 14.16 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.46 | 4.78 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.53 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.71 | 3.40 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,714 | 837 | $460 | $3,524 | 7.67 | $958,884 |

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
