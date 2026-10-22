# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 13:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$78,232** |
| gastado hoy (hasta las 13h) | $137,396 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $338,212 |
| saldo proyectado a medianoche | $-122,584 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $312,022 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $135,419 | 296 | **$457** | $3,297 | 7.21 |
| 2026-10-19 | $164,966 | 388 | **$425** | $2,774 | 6.53 |
| 2026-10-20 | $143,583 | 289 | **$497** | $3,277 | 6.60 |
| 2026-10-21 | $182,538 | 397 | **$460** | $3,940 | 8.57 |
| 2026-10-22 **HOY** | $137,396 | 320 | **$429** | $3,788 | 8.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($429 vs $460).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   429  =  $ 3,788  ÷  8.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,788 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $18,122 | 45% | 45 | $403 | 13.92 |
| Domiciliarios - Expancion - API | $40,000 | $17,311 | 43% | 44 | $393 | 11.26 |
| Domiciliarios - API | $35,000 | $17,100 | 49% | 59 | $290 | 15.34 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,342 | 41% | 8 | $1,293 | 2.29 |
| Domiciliarios VIDEO - API | $20,000 | $9,506 | 48% | 29 | $328 | 9.21 |
| Domiciliarios - Expancion - Q58 | $25,000 | $9,033 | 36% | 10 | $903 | 4.34 |
| Motorizados - API | $20,000 | $8,854 | 44% | 21 | $422 | 8.82 |
| Domiciliarios INTER - API | $25,000 | $8,810 | 35% | 26 | $339 | 8.64 |
| Motorizados - Q58 | $25,000 | $8,791 | 35% | 16 | $549 | 5.49 |
| Domiciliarios VIDEO INTER - API | $25,000 | $8,746 | 35% | 12 | $729 | 5.89 |
| Domiciliarios VIDEO Q58 - | $25,000 | $8,384 | 34% | 9 | $932 | 3.55 |
| Motorizados - INTER | $25,000 | $7,579 | 30% | 9 | $842 | 8.53 |
| Domiciliarios Q58 - | $25,000 | $4,818 | 19% | 32 | $151 | 13.27 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $137,396 | 320 | **$429** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,893**/pedido |
| utilidad estimada de lo que va del día | **$376,285** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $538 | $504 | $475 | $609 | $535 | $403 | 🟢 |
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $422 | $393 | 🟢 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $348 | $290 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $603 | $1,293 | 🔴 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $269 | $328 | 🔴 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,077 | $903 | 🟢 |
| Motorizados - API | $349 | $419 | $579 | $470 | $445 | $422 | 🟢 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $304 | $339 | 🟡 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,024 | $549 | 🟢 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $700 | $729 | 🟡 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $992 | $932 | 🟢 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $460 | $842 | 🔴 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $197 | $151 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.03 | 13.92 | 🟢 |
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.01 | 11.26 | 🟡 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.12 | 15.34 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.34 | 2.29 | 🔴 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.71 | 9.21 | 🔴 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.65 | 4.34 | 🟢 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.32 | 8.82 | 🟡 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.18 | 8.64 | 🔴 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.32 | 5.49 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 5.99 | 5.89 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.19 | 3.55 | 🟢 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.61 | 8.53 | 🔴 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.08 | 13.27 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $342,892 | 802 | $428 | $3,982 | 9.31 | $944,522 |

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
