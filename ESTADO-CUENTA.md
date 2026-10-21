# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 02:00 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$184,358** |
| gastado hoy (hasta las 1h) | $8,222 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $363,527 |
| saldo proyectado a medianoche | $-170,947 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $335,070 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $7,383 | 28 | **$264** | $3,090 | 11.72 |
| 2026-10-18 | $7,898 | 23 | **$343** | $2,491 | 7.25 |
| 2026-10-19 | $9,747 | 18 | **$542** | $2,974 | 5.49 |
| 2026-10-20 | $4,380 | 15 | **$292** | $3,387 | 11.60 |
| 2026-10-21 **HOY** | $8,222 | 23 | **$357** | $4,159 | 11.63 |

🟠 Hoy va 22% más caro que ayer a la misma hora ($357 vs $292).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   357  =  $ 4,159  ÷  11.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,159 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - INTER | $25,000 | $1,016 | 4% | 1 | $1,016 | 10.00 |
| Domiciliarios Q58 - | $25,000 | $856 | 3% | 3 | $285 | 9.62 |
| Domiciliarios VIDEO INTER - API | $25,000 | $852 | 3% | 2 | $426 | 12.50 |
| Domiciliarios - Expancion - API | $40,000 | $805 | 2% | 1 | $805 | 6.67 |
| Domiciliarios - API | $35,000 | $736 | 2% | 4 | $184 | 34.78 |
| Domiciliarios INTER - API | $25,000 | $663 | 3% | 2 | $332 | 14.71 |
| Domiciliarios - Expancion - INTER | $25,000 | $634 | 3% | 1 | $634 | 5.59 |
| Domiciliarios VIDEO Q58 - | $25,000 | $568 | 2% | 1 | $568 | 3.73 |
| Motorizados - Q58 | $25,000 | $556 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $463 | 2% | 4 | $116 | 29.41 |
| Domiciliarios - Expancion - Q58 | $25,000 | $447 | 2% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $333 | 2% | 1 | $333 | 11.76 |
| TEST Creativos - API | $40,000 | $293 | 1% | 3 | $98 | 52.63 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,222 | 23 | **$357** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,571**/pedido |
| utilidad estimada de lo que va del día | **$28,699** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | $463 | $529 | $521 | $479 | $586 | $1,016 | 🔴 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $183 | $285 | 🔴 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $573 | $426 | 🟢 |
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $575 | $805 | 🔴 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $478 | $184 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $321 | $332 | 🟡 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $626 | $634 | 🟡 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $640 | $568 | 🟢 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $540 | — | 🟢 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $314 | $116 | 🟢 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,108 | — | 🟢 |
| Motorizados - API | $344 | $349 | $419 | $579 | $467 | $333 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $604 | $98 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.87 | 10.00 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.29 | 9.62 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.53 | 12.50 | 🟢 |
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.68 | 6.67 | 🟡 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.65 | 34.78 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.21 | 14.71 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.49 | 5.59 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.63 | 3.73 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.81 | — | 🟢 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 12.01 | 29.41 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.74 | — | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.12 | 11.76 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.87 | 52.63 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,388 | 796 | $431 | $3,066 | 7.11 | $934,394 |
| 2026-10-20 | $381,349 | 837 | $456 | $3,528 | 7.74 | $962,249 |

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
