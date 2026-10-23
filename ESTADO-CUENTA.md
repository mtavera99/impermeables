# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-23 12:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$209,568** |
| gastado hoy (hasta las 12h) | $88,328 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $265,834 |
| saldo proyectado a medianoche | $32,062 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🟠 Recargar $201,154 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-19 | $144,708 | 335 | **$432** | $2,710 | 6.27 |
| 2026-10-20 | $123,581 | 246 | **$502** | $3,283 | 6.54 |
| 2026-10-21 | $164,982 | 353 | **$467** | $3,952 | 8.46 |
| 2026-10-22 | $140,034 | 318 | **$440** | $3,785 | 8.60 |
| 2026-10-23 **HOY** | $88,328 | 197 | **$448** | $3,399 | 7.58 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($448 vs $440).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   448  =  $ 3,399  ÷  7.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,399 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.58 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $10,835 | 27% | 28 | $387 | 11.04 |
| TEST Creativos - API | $30,000 | $10,061 | 34% | 26 | $387 | 10.51 |
| Domiciliarios - API | $35,000 | $9,779 | 28% | 27 | $362 | 11.13 |
| Domiciliarios - Expancion - INTER | $25,000 | $7,629 | 31% | 12 | $636 | 4.72 |
| Domiciliarios VIDEO Q58 - | $25,000 | $7,214 | 29% | 9 | $802 | 4.20 |
| Domiciliarios INTER - API | $25,000 | $6,400 | 26% | 15 | $427 | 4.91 |
| Domiciliarios Q58 - | $25,000 | $5,711 | 23% | 29 | $197 | 10.87 |
| Domiciliarios - Expancion - Q58 | $20,000 | $5,389 | 27% | 7 | $770 | 6.05 |
| Domiciliarios VIDEO INTER - API | $25,000 | $5,262 | 21% | 3 | $1,754 | 2.18 |
| Motorizados - API | $20,000 | $5,240 | 26% | 8 | $655 | 5.86 |
| Motorizados - INTER | $25,000 | $5,201 | 21% | 8 | $650 | 7.42 |
| Domiciliarios VIDEO - API | $20,000 | $4,970 | 25% | 12 | $414 | 7.25 |
| Motorizados - Q58 | $20,000 | $4,637 | 23% | 13 | $357 | 8.60 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $88,328 | 197 | **$448** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,242**/pedido |
| utilidad estimada de lo que va del día | **$227,907** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $556 | $485 | $583 | $424 | $443 | $387 | 🟢 |
| TEST Creativos - API | $504 | $475 | $609 | $535 | $379 | $387 | 🟡 |
| Domiciliarios - API | $472 | $464 | $484 | $348 | $370 | $362 | 🟡 |
| Domiciliarios - Expancion - INTER | $586 | $536 | $629 | $604 | $720 | $636 | 🟢 |
| Domiciliarios VIDEO Q58 - | $874 | $586 | $642 | $995 | $1,091 | $802 | 🟢 |
| Domiciliarios INTER - API | $284 | $240 | $324 | $304 | $313 | $427 | 🔴 |
| Domiciliarios Q58 - | $186 | $166 | $185 | $197 | $159 | $197 | 🔴 |
| Domiciliarios - Expancion - Q58 | $751 | $1,462 | $1,121 | $1,077 | $890 | $770 | 🟢 |
| Domiciliarios VIDEO INTER - API | $430 | $534 | $576 | $701 | $741 | $1,754 | 🔴 |
| Motorizados - API | $419 | $579 | $470 | $446 | $375 | $655 | 🔴 |
| Motorizados - INTER | $521 | $480 | $591 | $460 | $544 | $650 | 🔴 |
| Domiciliarios VIDEO - API | $357 | $430 | $319 | $269 | $291 | $414 | 🔴 |
| Motorizados - Q58 | $569 | $732 | $545 | $1,025 | $597 | $357 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.92 | 7.80 | 7.58 | 11.99 | 10.40 | 11.04 | 🟢 |
| TEST Creativos - API | 7.79 | 9.85 | 8.80 | 11.03 | 14.32 | 10.51 | 🔴 |
| Domiciliarios - API | 7.52 | 7.58 | 9.53 | 14.10 | 12.14 | 11.13 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.47 | 5.28 | 4.46 | 5.33 | 4.21 | 4.72 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.07 | 5.02 | 3.62 | 3.19 | 2.96 | 4.20 | 🟢 |
| Domiciliarios INTER - API | 9.05 | 6.33 | 11.02 | 12.17 | 9.42 | 4.91 | 🔴 |
| Domiciliarios Q58 - | 13.92 | 13.71 | 13.11 | 11.07 | 12.94 | 10.87 | 🔴 |
| Domiciliarios - Expancion - Q58 | 4.12 | 2.02 | 2.71 | 3.65 | 4.52 | 6.05 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.70 | 6.43 | 7.46 | 5.98 | 5.52 | 2.18 | 🔴 |
| Motorizados - API | 7.49 | 5.69 | 8.05 | 9.31 | 10.47 | 5.86 | 🔴 |
| Motorizados - INTER | 8.33 | 8.02 | 8.76 | 13.59 | 11.05 | 7.42 | 🔴 |
| Domiciliarios VIDEO - API | 7.95 | 6.55 | 11.78 | 14.69 | 10.99 | 7.25 | 🔴 |
| Motorizados - Q58 | 5.24 | 4.15 | 5.75 | 3.32 | 5.15 | 8.60 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $316,625 | 759 | $417 | $3,708 | 8.89 | $901,763 |

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
