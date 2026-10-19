# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 17:38 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$45,590** |
| gastado hoy (hasta las 17h) | $222,130 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $346,996 |
| saldo proyectado a medianoche | $-79,276 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $202,730 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $122,834 | 322 | **$381** | $3,036 | 7.96 |
| 2026-10-16 | $204,148 | 465 | **$439** | $3,287 | 7.49 |
| 2026-10-17 | $229,991 | 515 | **$447** | $3,219 | 7.21 |
| 2026-10-18 | $218,457 | 475 | **$460** | $3,249 | 7.07 |
| 2026-10-19 **HOY** | $222,130 | 528 | **$421** | $2,928 | 6.96 |

🟢 **Hoy va mejor que ayer a la misma hora** ($421 vs $460).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   421  =  $ 2,928  ÷  6.96
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,928 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.96 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $29,360 | 73% | 70 | $419 | 10.49 |
| Domiciliarios - Expancion - API | $40,000 | $28,693 | 72% | 65 | $441 | 8.71 |
| Domiciliarios - API | $35,000 | $23,582 | 67% | 50 | $472 | 7.46 |
| Domiciliarios Q58 - | $20,000 | $16,652 | 83% | 99 | $168 | 13.74 |
| Domiciliarios - Expancion - Q58 | $20,000 | $14,792 | 74% | 8 | $1,849 | 1.57 |
| Motorizados - Q58 | $20,000 | $14,659 | 73% | 21 | $698 | 4.36 |
| Domiciliarios VIDEO - API | $20,000 | $14,026 | 70% | 28 | $501 | 5.37 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,956 | 70% | 27 | $517 | 6.22 |
| Motorizados - API | $20,000 | $13,696 | 68% | 25 | $548 | 6.06 |
| Motorizados - INTER | $20,000 | $13,667 | 68% | 29 | $471 | 7.64 |
| Domiciliarios INTER - API | $20,000 | $13,464 | 67% | 60 | $224 | 5.40 |
| Domiciliarios - Expancion - INTER | $20,000 | $13,120 | 66% | 23 | $570 | 4.75 |
| Domiciliarios VIDEO Q58 - | $20,000 | $12,463 | 62% | 24 | $519 | 5.38 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $222,130 | 529 | **$420** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,719**/pedido |
| utilidad estimada de lo que va del día | **$627,049** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $419 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $556 | $441 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $472 | 🟡 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $168 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $751 | $1,849 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $698 | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $357 | $501 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $517 | 🔴 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $548 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $521 | $471 | 🟢 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $224 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $570 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $874 | $519 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.79 | 10.49 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.93 | 8.71 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.53 | 7.46 | 🟡 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.94 | 13.74 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.12 | 1.57 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.25 | 4.36 | 🔴 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.96 | 5.37 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.71 | 6.22 | 🔴 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.50 | 6.06 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.34 | 7.64 | 🟡 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.06 | 5.40 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.47 | 4.75 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.07 | 5.38 | 🟢 |

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
| 2026-10-18 | $387,290 | 870 | $445 | $3,092 | 6.95 | $1,009,281 |

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
