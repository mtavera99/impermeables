# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 10:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$95,467** |
| gastado hoy (hasta las 9h) | $93,644 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $371,102 |
| saldo proyectado a medianoche | $-181,990 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $338,539 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $78,311 | 172 | **$455** | $3,114 | 6.84 |
| 2026-10-18 | $66,760 | 159 | **$420** | $3,263 | 7.77 |
| 2026-10-19 | $101,877 | 211 | **$483** | $2,573 | 5.33 |
| 2026-10-20 | $70,563 | 144 | **$490** | $3,191 | 6.51 |
| 2026-10-21 **HOY** | $93,644 | 217 | **$432** | $3,868 | 8.96 |

🟢 **Hoy va mejor que ayer a la misma hora** ($432 vs $490).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   432  =  $ 3,868  ÷  8.96
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,868 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.96 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $12,888 | 32% | 25 | $516 | 9.71 |
| Domiciliarios - API | $35,000 | $11,284 | 32% | 38 | $297 | 17.23 |
| Domiciliarios Q58 - | $25,000 | $7,707 | 31% | 34 | $227 | 9.55 |
| Domiciliarios VIDEO INTER - API | $25,000 | $7,613 | 30% | 11 | $692 | 5.97 |
| Domiciliarios VIDEO - API | $20,000 | $7,524 | 38% | 25 | $301 | 13.25 |
| TEST Creativos - API | $40,000 | $6,881 | 17% | 18 | $382 | 14.32 |
| Motorizados - API | $20,000 | $6,636 | 33% | 14 | $474 | 8.30 |
| Domiciliarios INTER - API | $25,000 | $6,484 | 26% | 17 | $381 | 10.82 |
| Motorizados - INTER | $25,000 | $6,034 | 24% | 11 | $549 | 12.72 |
| Motorizados - Q58 | $25,000 | $5,970 | 24% | 1 | $5,970 | 0.56 |
| Domiciliarios VIDEO Q58 - | $25,000 | $5,952 | 24% | 8 | $744 | 3.27 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,990 | 20% | 11 | $454 | 6.69 |
| Domiciliarios - Expancion - Q58 | $25,000 | $3,681 | 15% | 3 | $1,227 | 3.45 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $93,644 | 216 | **$434** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,969**/pedido |
| utilidad estimada de lo que va del día | **$253,091** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $580 | $516 | 🟢 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $483 | $297 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $184 | $227 | 🔴 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $575 | $692 | 🔴 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $318 | $301 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $608 | $382 | 🟢 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $474 | 🟡 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $323 | $381 | 🔴 |
| Motorizados - INTER | $463 | $529 | $521 | $479 | $590 | $549 | 🟢 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $544 | $5,970 | 🔴 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $641 | $744 | 🔴 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $628 | $454 | 🟢 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,118 | $1,227 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.61 | 9.71 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.56 | 17.23 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.17 | 9.55 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.49 | 5.97 | 🔴 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.86 | 13.25 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.82 | 14.32 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.08 | 8.30 | 🟡 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.08 | 10.82 | 🟡 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.79 | 12.72 | 🟢 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.77 | 0.56 | 🔴 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.27 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.47 | 6.69 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.72 | 3.45 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,422 | 796 | $431 | $3,066 | 7.11 | $934,360 |
| 2026-10-20 | $383,933 | 837 | $459 | $3,526 | 7.69 | $959,665 |

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
