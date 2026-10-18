# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 12:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$111,373** |
| gastado hoy (hasta las 12h) | $107,464 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $295,023 |
| saldo proyectado a medianoche | $-76,186 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $251,613 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $94,953 | 242 | **$392** | $3,394 | 8.65 |
| 2026-10-15 | $76,170 | 199 | **$383** | $3,054 | 7.98 |
| 2026-10-16 | $124,086 | 318 | **$390** | $3,243 | 8.31 |
| 2026-10-17 | $127,649 | 298 | **$428** | $3,260 | 7.61 |
| 2026-10-18 **HOY** | $107,464 | 243 | **$442** | $3,312 | 7.49 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($442 vs $428).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   442  =  $ 3,312  ÷  7.49
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,312 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.49 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,301 | 36% | 27 | $530 | 6.81 |
| TEST Creativos - API | $40,000 | $12,599 | 31% | 31 | $406 | 9.79 |
| Domiciliarios - API | $35,000 | $12,401 | 35% | 24 | $517 | 7.62 |
| Motorizados - Q58 | $20,000 | $8,468 | 42% | 17 | $498 | 6.54 |
| Domiciliarios - Expancion - Q58 | $20,000 | $7,868 | 39% | 11 | $715 | 4.74 |
| Domiciliarios VIDEO INTER - API | $20,000 | $6,942 | 35% | 19 | $365 | 9.26 |
| Domiciliarios VIDEO Q58 - | $20,000 | $6,918 | 35% | 7 | $988 | 3.00 |
| Domiciliarios INTER - API | $20,000 | $6,898 | 34% | 23 | $300 | 9.45 |
| Motorizados - INTER | $20,000 | $6,798 | 34% | 13 | $523 | 8.32 |
| Motorizados - API | $20,000 | $6,661 | 33% | 12 | $555 | 6.11 |
| Domiciliarios VIDEO - API | $20,000 | $6,576 | 33% | 19 | $346 | 9.77 |
| Domiciliarios Q58 - | $20,000 | $5,524 | 28% | 28 | $197 | 11.52 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,510 | 28% | 12 | $459 | 4.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $107,464 | 243 | **$442** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,129**/pedido |
| utilidad estimada de lo que va del día | **$282,613** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $530 | 🟡 |
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $406 | 🟢 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $517 | 🔴 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $498 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $772 | $715 | 🟢 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $365 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $566 | $988 | 🔴 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $300 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $523 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $555 | 🔴 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $346 | 🟡 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $197 | 🟡 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $459 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.27 | 6.81 | 🟡 |
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.14 | 9.79 | 🟢 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 9.00 | 7.62 | 🔴 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.77 | 6.54 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.01 | 4.74 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.73 | 9.26 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.82 | 3.00 | 🔴 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.05 | 9.45 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.19 | 8.32 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.91 | 6.11 | 🔴 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.26 | 9.77 | 🟢 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.18 | 11.52 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 4.75 | 🟢 |

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
| 2026-10-17 | $310,819 | 743 | $418 | $3,082 | 7.37 | $881,885 |

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
