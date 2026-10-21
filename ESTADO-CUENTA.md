# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 23:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$94,682** |
| gastado hoy (hasta las 23h) | $379,482 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $379,482 |
| saldo proyectado a medianoche | $94,682 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $53,486 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $316,034 | 743 | **$425** | $3,098 | 7.28 |
| 2026-10-17 | $310,890 | 743 | **$418** | $3,079 | 7.36 |
| 2026-10-18 | $387,290 | 870 | **$445** | $3,090 | 6.94 |
| 2026-10-19 | $343,388 | 796 | **$431** | $3,066 | 7.11 |
| 2026-10-20 **HOY** | $379,482 | 832 | **$456** | $3,530 | 7.74 |

🟠 Hoy va 6% más caro que ayer a la misma hora ($456 vs $431).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   456  =  $ 3,530  ÷  7.74
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,530 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.74 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $39,539 | 99% | 66 | $599 | 8.94 |
| Domiciliarios - Expancion - API | $40,000 | $36,108 | 90% | 62 | $582 | 7.59 |
| Domiciliarios Q58 - | $25,000 | $32,704 | 131% | 179 | $183 | 13.33 |
| Domiciliarios INTER - API | $25,000 | $31,030 | 124% | 97 | $320 | 11.25 |
| Domiciliarios VIDEO INTER - API | $25,000 | $30,871 | 123% | 54 | $572 | 7.55 |
| Domiciliarios VIDEO Q58 - | $25,000 | $30,587 | 122% | 48 | $637 | 3.65 |
| Motorizados - INTER | $25,000 | $30,325 | 121% | 51 | $595 | 8.73 |
| Domiciliarios - API | $35,000 | $29,476 | 84% | 61 | $483 | 9.56 |
| Motorizados - Q58 | $25,000 | $29,033 | 116% | 54 | $538 | 5.85 |
| Domiciliarios - Expancion - INTER | $25,000 | $28,632 | 115% | 45 | $636 | 4.43 |
| Domiciliarios - Expancion - Q58 | $25,000 | $27,559 | 110% | 24 | $1,148 | 2.64 |
| Domiciliarios VIDEO - API | $20,000 | $17,358 | 87% | 56 | $310 | 12.13 |
| Motorizados - API | $20,000 | $16,260 | 81% | 34 | $478 | 7.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $379,482 | 831 | **$457** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,394**/pedido |
| utilidad estimada de lo que va del día | **$954,484** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $599 | 🔴 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $485 | $582 | 🔴 |
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $183 | 🟡 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $240 | $320 | 🔴 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $534 | $572 | 🟡 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $637 | 🟡 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $479 | $595 | 🔴 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $464 | $483 | 🟡 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $732 | $538 | 🟢 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $636 | 🔴 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,462 | $1,148 | 🟢 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $430 | $310 | 🟢 |
| Motorizados - API | $380 | $344 | $349 | $419 | $579 | $478 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.85 | 8.94 | 🟡 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.80 | 7.59 | 🟡 |
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.71 | 13.33 | 🟡 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.33 | 11.25 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.43 | 7.55 | 🟢 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.02 | 3.65 | 🔴 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.02 | 8.73 | 🟢 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.58 | 9.56 | 🟢 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.15 | 5.85 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 4.43 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 2.64 | 🟢 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.55 | 12.13 | 🟢 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.69 | 7.92 | 🟢 |

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
| 2026-10-19 | $343,388 | 796 | $431 | $3,066 | 7.11 | $934,394 |

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
