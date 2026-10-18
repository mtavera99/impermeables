# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 09:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$169,109** |
| gastado hoy (hasta las 9h) | $52,139 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $290,387 |
| saldo proyectado a medianoche | $-69,139 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $249,202 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $51,284 | 140 | **$366** | $3,336 | 9.11 |
| 2026-10-15 | $45,432 | 132 | **$344** | $3,038 | 8.83 |
| 2026-10-16 | $71,989 | 199 | **$362** | $3,138 | 8.67 |
| 2026-10-17 | $78,311 | 172 | **$455** | $3,114 | 6.84 |
| 2026-10-18 **HOY** | $52,139 | 124 | **$420** | $3,222 | 7.66 |

🟢 **Hoy va mejor que ayer a la misma hora** ($420 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   420  =  $ 3,222  ÷  7.66
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,222 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.66 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $6,621 | 17% | 12 | $552 | 6.50 |
| TEST Creativos - API | $40,000 | $5,949 | 15% | 10 | $595 | 6.51 |
| Domiciliarios - API | $35,000 | $5,627 | 16% | 15 | $375 | 10.65 |
| Motorizados - Q58 | $20,000 | $4,637 | 23% | 10 | $464 | 6.67 |
| Domiciliarios - Expancion - Q58 | $20,000 | $3,804 | 19% | 6 | $634 | 5.25 |
| Domiciliarios INTER - API | $20,000 | $3,610 | 18% | 12 | $301 | 9.20 |
| Motorizados - INTER | $20,000 | $3,577 | 18% | 9 | $397 | 10.03 |
| Domiciliarios VIDEO - API | $20,000 | $3,565 | 18% | 10 | $356 | 9.38 |
| Domiciliarios VIDEO Q58 - | $20,000 | $3,389 | 17% | 6 | $565 | 5.55 |
| Motorizados - API | $20,000 | $3,353 | 17% | 6 | $559 | 6.08 |
| Domiciliarios VIDEO INTER - API | $20,000 | $2,945 | 15% | 4 | $736 | 4.62 |
| Domiciliarios Q58 - | $20,000 | $2,624 | 13% | 16 | $164 | 12.69 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,438 | 12% | 8 | $305 | 6.21 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $52,139 | 124 | **$420** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,729**/pedido |
| utilidad estimada de lo que va del día | **$146,913** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $552 | 🔴 |
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $595 | 🟡 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $375 | 🟡 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $464 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $772 | $634 | 🟢 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $301 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $397 | 🟢 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $356 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $565 | $565 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $559 | 🔴 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $736 | 🔴 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $164 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $305 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.27 | 6.50 | 🟡 |
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.14 | 6.51 | 🟡 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 9.02 | 10.65 | 🟢 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.78 | 6.67 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.01 | 5.25 | 🟢 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.08 | 9.20 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.20 | 10.03 | 🟢 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.28 | 9.38 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.83 | 5.55 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.93 | 6.08 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.74 | 4.62 | 🔴 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.20 | 12.69 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 6.21 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,762 | 743 | $418 | $3,086 | 7.38 | $881,942 |

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
