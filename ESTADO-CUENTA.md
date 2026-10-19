# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 16:38 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$61,716** |
| gastado hoy (hasta las 16h) | $204,494 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $351,610 |
| saldo proyectado a medianoche | $-85,400 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $204,240 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $113,201 | 292 | **$388** | $3,038 | 7.84 |
| 2026-10-16 | $183,053 | 429 | **$427** | $3,286 | 7.70 |
| 2026-10-17 | $207,107 | 463 | **$447** | $3,236 | 7.24 |
| 2026-10-18 | $196,842 | 429 | **$459** | $3,253 | 7.09 |
| 2026-10-19 **HOY** | $204,494 | 494 | **$414** | $2,894 | 6.99 |

🟢 **Hoy va mejor que ayer a la misma hora** ($414 vs $459).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   414  =  $ 2,894  ÷  6.99
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,894 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.99 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $27,169 | 68% | 64 | $425 | 9.03 |
| TEST Creativos - API | $40,000 | $27,070 | 68% | 65 | $416 | 10.42 |
| Domiciliarios - API | $35,000 | $21,826 | 62% | 47 | $464 | 7.55 |
| Domiciliarios Q58 - | $20,000 | $14,942 | 75% | 91 | $164 | 13.99 |
| Domiciliarios - Expancion - Q58 | $20,000 | $13,649 | 68% | 6 | $2,275 | 1.28 |
| Motorizados - Q58 | $20,000 | $13,359 | 67% | 21 | $636 | 4.78 |
| Domiciliarios VIDEO - API | $20,000 | $13,227 | 66% | 27 | $490 | 5.48 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,046 | 65% | 27 | $483 | 6.61 |
| Motorizados - API | $20,000 | $12,842 | 64% | 21 | $612 | 5.42 |
| Domiciliarios INTER - API | $20,000 | $12,175 | 61% | 56 | $217 | 5.27 |
| Motorizados - INTER | $20,000 | $12,111 | 61% | 25 | $484 | 7.30 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,690 | 58% | 20 | $584 | 4.46 |
| Domiciliarios VIDEO Q58 - | $20,000 | $11,388 | 57% | 24 | $474 | 5.84 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $204,494 | 494 | **$414** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,609**/pedido |
| utilidad estimada de lo que va del día | **$588,502** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $556 | $425 | 🟢 |
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $416 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $464 | 🟡 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $164 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $751 | $2,275 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $636 | 🟡 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $357 | $490 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $483 | 🟡 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $612 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $217 | 🟢 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $521 | $484 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $584 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $874 | $474 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.93 | 9.03 | 🟢 |
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.79 | 10.42 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.54 | 7.55 | 🟡 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.94 | 13.99 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.12 | 1.28 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.25 | 4.78 | 🟡 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.96 | 5.48 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.71 | 6.61 | 🟡 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.50 | 5.42 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.07 | 5.27 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.34 | 7.30 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.48 | 4.46 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.07 | 5.84 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,093 | 6.95 | $1,009,281 |

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
