# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 13:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$185,719** |
| gastado hoy (hasta las 13h) | $130,741 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $257,631 |
| saldo proyectado a medianoche | $58,829 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🟠 Recargar $153,990 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $119,600 | 292 | **$410** | $3,151 | 7.69 |
| 2026-10-13 | $137,812 | 402 | **$343** | $3,426 | 9.99 |
| 2026-10-14 | $110,376 | 273 | **$404** | $3,365 | 8.32 |
| 2026-10-15 | $85,593 | 224 | **$382** | $3,035 | 7.94 |
| 2026-10-16 **HOY** | $130,679 | 331 | **$395** | $3,269 | 8.28 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($395 vs $382).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   395  =  $ 3,269  ÷  8.28
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,269 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.28 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $16,654 | 83% | 71 | $235 | 13.98 |
| Domiciliarios - Expancion - API | $40,000 | $15,251 | 38% | 23 | $663 | 5.57 |
| Domiciliarios VIDEO Q58 - | $20,000 | $12,844 | 64% | 41 | $313 | 8.70 |
| Domiciliarios - API | $35,000 | $12,743 | 36% | 35 | $364 | 9.97 |
| TEST Creativos - API | $40,000 | $12,333 | 31% | 29 | $425 | 9.71 |
| Motorizados - Q58 | $20,000 | $10,403 | 52% | 13 | $800 | 5.22 |
| Domiciliarios - Expancion - Q58 | $20,000 | $8,676 | 43% | 7 | $1,239 | 2.87 |
| Domiciliarios VIDEO - API | $20,000 | $7,535 | 38% | 23 | $328 | 7.98 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,369 | 37% | 9 | $819 | 4.35 |
| Motorizados - API | $20,000 | $7,132 | 36% | 23 | $310 | 11.21 |
| Domiciliarios - Expancion - INTER | $20,000 | $7,049 | 35% | 10 | $705 | 3.05 |
| Domiciliarios INTER - API | $20,000 | $6,852 | 34% | 28 | $245 | 9.97 |
| Motorizados - INTER | $20,000 | $5,856 | 29% | 19 | $308 | 12.39 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $130,697 | 331 | **$395** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,258**/pedido |
| utilidad estimada de lo que va del día | **$400,642** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $263 | $235 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $689 | $663 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $354 | $313 | 🟢 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $356 | $364 | 🟡 |
| TEST Creativos - API | $510 | $509 | $412 | $378 | $386 | $425 | 🟡 |
| Motorizados - Q58 | — | — | — | — | $581 | $800 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $857 | $1,239 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $289 | $328 | 🟡 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $444 | $819 | 🔴 |
| Motorizados - API | $447 | $265 | $284 | $278 | $379 | $310 | 🟢 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $387 | $705 | 🔴 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $279 | $245 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $330 | $308 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.09 | 13.98 | 🟡 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.46 | 5.57 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.55 | 8.70 | 🟡 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.37 | 9.97 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.48 | 10.17 | 9.71 | 🟡 |
| Motorizados - Q58 | — | — | — | — | 5.70 | 5.22 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.50 | 2.87 | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.68 | 7.98 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.27 | 4.35 | 🔴 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.09 | 11.21 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.08 | 3.05 | 🔴 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.43 | 9.97 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.53 | 12.39 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,071 | 561 | $385 | $3,060 | 7.94 | $684,477 |

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
