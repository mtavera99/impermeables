# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 11:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$88,835** |
| gastado hoy (hasta las 11h) | $85,262 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $337,046 |
| saldo proyectado a medianoche | $-162,948 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $353,553 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $102,189 | 271 | **$377** | $3,201 | 8.49 |
| 2026-10-17 | $111,691 | 253 | **$441** | $3,242 | 7.34 |
| 2026-10-18 | $97,664 | 223 | **$438** | $3,317 | 7.57 |
| 2026-10-19 | $128,836 | 291 | **$443** | $2,663 | 6.01 |
| 2026-10-20 **HOY** | $85,262 | 172 | **$496** | $3,269 | 6.59 |

🟠 Hoy va 12% más caro que ayer a la misma hora ($496 vs $443).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   496  =  $ 3,269  ÷  6.59
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,269 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.59 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $25,000 | $8,530 | 34% | 49 | $174 | 13.92 |
| TEST Creativos - API | $40,000 | $8,015 | 20% | 15 | $534 | 8.82 |
| Domiciliarios VIDEO Q58 - | $25,000 | $7,829 | 31% | 13 | $602 | 4.58 |
| Domiciliarios - Expancion - Q58 | $25,000 | $7,782 | 31% | 5 | $1,556 | 1.69 |
| Domiciliarios INTER - API | $25,000 | $7,631 | 31% | 25 | $305 | 9.98 |
| Domiciliarios VIDEO INTER - API | $25,000 | $7,564 | 30% | 9 | $840 | 4.78 |
| Domiciliarios - Expancion - INTER | $25,000 | $7,435 | 30% | 12 | $620 | 4.19 |
| Motorizados - INTER | $25,000 | $7,387 | 30% | 4 | $1,847 | 2.65 |
| Motorizados - Q58 | $25,000 | $7,375 | 30% | 13 | $567 | 5.82 |
| Domiciliarios - Expancion - API | $40,000 | $5,525 | 14% | 7 | $789 | 5.24 |
| Domiciliarios - API | $35,000 | $5,133 | 15% | 9 | $570 | 7.18 |
| Motorizados - API | $20,000 | $3,056 | 15% | 5 | $611 | 5.70 |
| Domiciliarios VIDEO - API | $20,000 | $2,000 | 10% | 6 | $333 | 9.97 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $85,262 | 172 | **$496** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,112**/pedido |
| utilidad estimada de lo que va del día | **$190,842** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $174 | 🟡 |
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $534 | 🟡 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $602 | 🟡 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,460 | $1,556 | 🟡 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $239 | $305 | 🔴 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $533 | $840 | 🔴 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $620 | 🔴 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $478 | $1,847 | 🔴 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $729 | $567 | 🟢 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $484 | $789 | 🔴 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $463 | $570 | 🔴 |
| Motorizados - API | $380 | $344 | $349 | $419 | $577 | $611 | 🟡 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $429 | $333 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.74 | 13.92 | 🟡 |
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.86 | 8.82 | 🟡 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.03 | 4.58 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 1.69 | 🔴 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.34 | 9.98 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.44 | 4.78 | 🔴 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 4.19 | 🔴 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.05 | 2.65 | 🔴 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.16 | 5.82 | 🟢 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.82 | 5.24 | 🔴 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.59 | 7.18 | 🟡 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.71 | 5.70 | 🟡 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.56 | 9.97 | 🟢 |

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
| 2026-10-19 | $342,777 | 796 | $431 | $3,067 | 7.12 | $935,005 |

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
