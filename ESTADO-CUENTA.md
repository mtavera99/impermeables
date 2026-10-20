# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 10:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$104,001** |
| gastado hoy (hasta las 10h) | $70,220 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $334,232 |
| saldo proyectado a medianoche | $-160,011 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $353,429 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $86,596 | 243 | **$356** | $3,167 | 8.89 |
| 2026-10-17 | $94,924 | 203 | **$468** | $3,174 | 6.79 |
| 2026-10-18 | $83,113 | 192 | **$433** | $3,318 | 7.66 |
| 2026-10-19 | $118,826 | 261 | **$455** | $2,635 | 5.79 |
| 2026-10-20 **HOY** | $70,403 | 147 | **$479** | $3,233 | 6.75 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($479 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   479  =  $ 3,233  ÷  6.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,233 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $25,000 | $7,079 | 28% | 44 | $161 | 15.12 |
| TEST Creativos - API | $40,000 | $6,871 | 17% | 13 | $529 | 8.76 |
| Motorizados - Q58 | $25,000 | $6,540 | 26% | 10 | $654 | 5.09 |
| Domiciliarios VIDEO INTER - API | $25,000 | $6,295 | 25% | 9 | $699 | 5.72 |
| Domiciliarios INTER - API | $25,000 | $6,289 | 25% | 19 | $331 | 8.91 |
| Domiciliarios - Expancion - Q58 | $25,000 | $6,185 | 25% | 3 | $2,062 | 1.25 |
| Domiciliarios VIDEO Q58 - | $25,000 | $6,026 | 24% | 13 | $464 | 5.96 |
| Domiciliarios - Expancion - INTER | $25,000 | $5,913 | 24% | 9 | $657 | 3.85 |
| Motorizados - INTER | $25,000 | $5,703 | 23% | 3 | $1,901 | 2.48 |
| Domiciliarios - Expancion - API | $40,000 | $4,780 | 12% | 6 | $797 | 5.08 |
| Domiciliarios - API | $35,000 | $4,336 | 12% | 8 | $542 | 7.33 |
| Motorizados - API | $20,000 | $2,689 | 13% | 5 | $538 | 6.26 |
| Domiciliarios VIDEO - API | $20,000 | $1,675 | 8% | 5 | $335 | 9.52 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $70,381 | 147 | **$479** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,801**/pedido |
| utilidad estimada de lo que va del día | **$165,591** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $161 | 🟡 |
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $529 | 🟡 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $729 | $654 | 🟢 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $239 | $334 | 🔴 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $533 | $699 | 🔴 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,460 | $2,062 | 🔴 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $464 | 🟢 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $663 | 🔴 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $477 | $1,901 | 🔴 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $484 | $797 | 🔴 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $463 | $542 | 🔴 |
| Motorizados - API | $380 | $344 | $349 | $419 | $577 | $538 | 🟢 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $429 | $335 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.75 | 15.12 | 🟢 |
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.86 | 8.76 | 🟡 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.17 | 5.09 | 🟢 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.34 | 8.84 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.44 | 5.72 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 1.25 | 🔴 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.03 | 5.96 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 3.80 | 🔴 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.06 | 2.48 | 🔴 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.82 | 5.08 | 🔴 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.60 | 7.33 | 🟡 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.71 | 6.26 | 🟢 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.56 | 9.52 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $342,675 | 796 | $430 | $3,067 | 7.12 | $935,107 |

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
