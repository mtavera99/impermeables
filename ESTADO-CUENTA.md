# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 03:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$182,197** |
| gastado hoy (hasta las 2h) | $10,094 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $363,925 |
| saldo proyectado a medianoche | $-171,634 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $335,359 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $8,926 | 33 | **$270** | $3,046 | 11.26 |
| 2026-10-18 | $9,377 | 26 | **$361** | $2,437 | 6.76 |
| 2026-10-19 | $11,829 | 26 | **$455** | $3,054 | 6.71 |
| 2026-10-20 | $5,372 | 18 | **$298** | $3,364 | 11.27 |
| 2026-10-21 **HOY** | $10,094 | 26 | **$388** | $4,034 | 10.39 |

🟠 Hoy va 30% más caro que ayer a la misma hora ($388 vs $298).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   388  =  $ 4,034  ÷  10.39
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,034 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.39 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $25,000 | $1,111 | 4% | 2 | $556 | 10.00 |
| Motorizados - INTER | $25,000 | $1,083 | 4% | 1 | $1,083 | 9.09 |
| Domiciliarios Q58 - | $25,000 | $1,053 | 4% | 3 | $351 | 7.43 |
| Domiciliarios - Expancion - API | $40,000 | $951 | 2% | 1 | $951 | 5.41 |
| Domiciliarios - API | $35,000 | $912 | 3% | 4 | $228 | 28.17 |
| Domiciliarios INTER - API | $25,000 | $857 | 3% | 4 | $214 | 22.86 |
| Domiciliarios - Expancion - INTER | $25,000 | $765 | 3% | 1 | $765 | 4.52 |
| Motorizados - Q58 | $25,000 | $707 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $674 | 3% | 1 | $674 | 3.06 |
| Domiciliarios VIDEO - API | $20,000 | $620 | 3% | 5 | $124 | 26.88 |
| Domiciliarios - Expancion - Q58 | $25,000 | $503 | 2% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $435 | 2% | 1 | $435 | 8.47 |
| TEST Creativos - API | $40,000 | $423 | 1% | 3 | $141 | 37.04 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $10,094 | 26 | **$388** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,137**/pedido |
| utilidad estimada de lo que va del día | **$31,643** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $573 | $556 | 🟡 |
| Motorizados - INTER | $463 | $529 | $521 | $479 | $586 | $1,083 | 🔴 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $183 | $351 | 🔴 |
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $576 | $951 | 🔴 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $478 | $228 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $321 | $214 | 🟢 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $626 | $765 | 🔴 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $541 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $640 | $674 | 🟡 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $314 | $124 | 🟢 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,108 | — | 🟢 |
| Motorizados - API | $344 | $349 | $419 | $579 | $467 | $435 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $605 | $141 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.52 | 10.00 | 🟢 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.86 | 9.09 | 🟡 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.29 | 7.43 | 🔴 |
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.68 | 5.41 | 🔴 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.65 | 28.17 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.20 | 22.86 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.49 | 4.52 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.81 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.63 | 3.06 | 🔴 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 12.00 | 26.88 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.74 | — | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.12 | 8.47 | 🟡 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.86 | 37.04 | 🟢 |

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
| 2026-10-20 | $381,475 | 837 | $456 | $3,528 | 7.74 | $962,123 |

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
