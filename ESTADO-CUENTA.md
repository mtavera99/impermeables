# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-20 20:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$155,563** |
| gastado hoy (hasta las 20h) | $317,319 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $364,718 |
| saldo proyectado a medianoche | $108,164 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🟠 Recargar $54,768 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-16 | $280,423 | 635 | **$442** | $3,167 | 7.17 |
| 2026-10-17 | $298,588 | 685 | **$436** | $3,120 | 7.16 |
| 2026-10-18 | $327,883 | 709 | **$462** | $3,142 | 6.79 |
| 2026-10-19 | $307,974 | 718 | **$429** | $3,026 | 7.05 |
| 2026-10-20 **HOY** | $317,319 | 659 | **$482** | $3,527 | 7.32 |

🟠 Hoy va 12% más caro que ayer a la misma hora ($482 vs $429).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   482  =  $ 3,527  ÷  7.32
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,527 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.32 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $30,557 | 76% | 50 | $611 | 8.81 |
| Domiciliarios Q58 - | $25,000 | $29,547 | 118% | 153 | $193 | 12.65 |
| Domiciliarios - Expancion - API | $40,000 | $27,859 | 70% | 46 | $606 | 7.35 |
| Domiciliarios INTER - API | $25,000 | $27,430 | 110% | 83 | $330 | 10.84 |
| Domiciliarios VIDEO Q58 - | $25,000 | $27,150 | 109% | 44 | $617 | 3.88 |
| Domiciliarios VIDEO INTER - API | $25,000 | $27,062 | 108% | 43 | $629 | 6.86 |
| Motorizados - INTER | $25,000 | $26,237 | 105% | 33 | $795 | 6.57 |
| Motorizados - Q58 | $25,000 | $24,586 | 98% | 45 | $546 | 5.92 |
| Domiciliarios - Expancion - Q58 | $25,000 | $24,028 | 96% | 21 | $1,144 | 2.63 |
| Domiciliarios - Expancion - INTER | $25,000 | $23,735 | 95% | 35 | $678 | 4.24 |
| Domiciliarios - API | $35,000 | $23,612 | 67% | 43 | $549 | 8.39 |
| Domiciliarios VIDEO - API | $20,000 | $12,777 | 64% | 41 | $312 | 12.29 |
| Motorizados - API | $20,000 | $12,739 | 64% | 23 | $554 | 6.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $317,319 | 660 | **$481** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,838**/pedido |
| utilidad estimada de lo que va del día | **$742,149** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $386 | $488 | $538 | $504 | $475 | $611 | 🔴 |
| Domiciliarios Q58 - | $263 | $217 | $192 | $186 | $166 | $193 | 🔴 |
| Domiciliarios - Expancion - API | $690 | $525 | $478 | $556 | $485 | $606 | 🔴 |
| Domiciliarios INTER - API | $280 | $275 | $276 | $284 | $240 | $330 | 🔴 |
| Domiciliarios VIDEO Q58 - | $354 | $380 | $567 | $874 | $586 | $617 | 🟡 |
| Domiciliarios VIDEO INTER - API | $445 | $709 | $442 | $430 | $534 | $629 | 🔴 |
| Motorizados - INTER | $330 | $463 | $529 | $521 | $479 | $795 | 🔴 |
| Motorizados - Q58 | $584 | $690 | $546 | $569 | $731 | $546 | 🟢 |
| Domiciliarios - Expancion - Q58 | $859 | $936 | $773 | $751 | $1,462 | $1,144 | 🟢 |
| Domiciliarios - Expancion - INTER | $387 | $567 | $428 | $586 | $535 | $678 | 🔴 |
| Domiciliarios - API | $356 | $402 | $395 | $472 | $464 | $549 | 🔴 |
| Domiciliarios VIDEO - API | $289 | $366 | $356 | $357 | $430 | $312 | 🟢 |
| Motorizados - API | $380 | $344 | $349 | $419 | $579 | $554 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.16 | 7.69 | 7.13 | 7.79 | 9.85 | 8.81 | 🟡 |
| Domiciliarios Q58 - | 15.07 | 14.87 | 13.17 | 13.92 | 13.71 | 12.65 | 🟡 |
| Domiciliarios - Expancion - API | 4.46 | 6.55 | 7.26 | 5.92 | 7.80 | 7.35 | 🟡 |
| Domiciliarios INTER - API | 8.40 | 9.03 | 9.03 | 9.05 | 6.33 | 10.84 | 🟢 |
| Domiciliarios VIDEO Q58 - | 8.53 | 7.02 | 4.81 | 3.07 | 5.02 | 3.88 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.26 | 4.79 | 7.72 | 7.70 | 6.43 | 6.86 | 🟢 |
| Motorizados - INTER | 11.53 | 8.26 | 7.18 | 8.33 | 8.02 | 6.57 | 🔴 |
| Motorizados - Q58 | 5.67 | 5.78 | 5.76 | 5.24 | 4.15 | 5.92 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.50 | 3.76 | 4.00 | 4.12 | 2.02 | 2.63 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.07 | 3.16 | 4.23 | 3.47 | 5.28 | 4.24 | 🔴 |
| Domiciliarios - API | 9.35 | 8.72 | 8.99 | 7.52 | 7.58 | 8.39 | 🟢 |
| Domiciliarios VIDEO - API | 7.68 | 6.78 | 8.25 | 7.95 | 6.55 | 12.29 | 🟢 |
| Motorizados - API | 8.08 | 9.35 | 8.90 | 7.49 | 5.69 | 6.89 | 🟢 |

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
| 2026-10-19 | $343,366 | 796 | $431 | $3,066 | 7.11 | $934,416 |

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
