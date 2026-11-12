# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-12 15:05 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$293,965** |
| gastado hoy (hasta las 15h) | $176,642 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $399,489 |
| saldo proyectado a medianoche | $71,118 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $184,313 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-08 | $310,480 | 559 | **$555** | $2,910 | 5.24 |
| 2026-11-09 | $250,047 | 407 | **$614** | $3,263 | 5.31 |
| 2026-11-10 | $155,929 | 244 | **$639** | $4,231 | 6.62 |
| 2026-11-11 | $223,670 | 330 | **$678** | $3,893 | 5.74 |
| 2026-11-12 **HOY** | $176,642 | 253 | **$698** | $4,063 | 5.82 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($698 vs $678).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   698  =  $ 4,063  ÷  5.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,063 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $16,281 | 47% | 22 | $740 | 6.35 |
| Domiciliarios VIDEO INTER - API | $36,000 | $15,917 | 44% | 18 | $884 | 5.36 |
| RADIO - Seguridad / Negocios | $40,000 | $14,687 | 37% | 14 | $1,049 | 4.11 |
| Domiciliarios - Expancion - Q58 | $29,000 | $14,575 | 50% | 39 | $374 | 8.71 |
| Motorizados - INTER | $25,000 | $13,103 | 52% | 20 | $655 | 10.92 |
| Motorizados - Q58 | $29,000 | $12,976 | 45% | 9 | $1,442 | 1.91 |
| Domiciliarios - Expancion - API | $30,000 | $12,236 | 41% | 17 | $720 | 7.35 |
| RADIO - Moteros | $35,000 | $11,639 | 33% | 6 | $1,940 | 3.12 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,424 | 42% | 21 | $496 | 5.16 |
| Domiciliarios VIDEO Q58 - | $25,000 | $8,638 | 35% | 15 | $576 | 6.15 |
| Motorizados - API | $20,000 | $8,542 | 43% | 10 | $854 | 4.76 |
| Domiciliarios VIDEO - API | $20,000 | $7,836 | 39% | 9 | $871 | 4.20 |
| Domiciliarios INTER - API | $20,000 | $7,776 | 39% | 26 | $299 | 12.14 |
| TEST Creativos - API | $20,000 | $6,635 | 33% | 8 | $829 | 7.02 |
| RADIO - Fincas | $20,000 | $6,400 | 32% | 10 | $640 | 7.68 |
| Domiciliarios Q58 - | $25,000 | $6,352 | 25% | 6 | $1,059 | 2.52 |
| RADIO - Broad | $10,000 | $2,625 | 26% | 3 | $875 | 10.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $176,642 | 253 | **$698** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,834**/pedido |
| utilidad estimada de lo que va del día | **$229,487** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $453 | $430 | $500 | $489 | $853 | $740 | 🟢 |
| Domiciliarios VIDEO INTER - API | $528 | $565 | $641 | $601 | $712 | $884 | 🔴 |
| RADIO - Seguridad / Negocios | $1,003 | $914 | $873 | $1,417 | $1,137 | $1,049 | 🟢 |
| Domiciliarios - Expancion - Q58 | $295 | $265 | $314 | $290 | $295 | $374 | 🔴 |
| Motorizados - INTER | $517 | $460 | $558 | $639 | $482 | $655 | 🔴 |
| Motorizados - Q58 | $441 | $683 | $853 | $646 | $643 | $1,442 | 🔴 |
| Domiciliarios - Expancion - API | $641 | $543 | $550 | $711 | $839 | $720 | 🟢 |
| RADIO - Moteros | $1,572 | $1,178 | $1,702 | $2,246 | $1,744 | $1,940 | 🟡 |
| Domiciliarios - Expancion - INTER | $621 | $512 | $682 | $700 | $623 | $496 | 🟢 |
| Domiciliarios VIDEO Q58 - | $741 | $581 | $697 | $798 | $602 | $576 | 🟡 |
| Motorizados - API | $351 | $390 | $543 | $597 | $835 | $854 | 🟡 |
| Domiciliarios VIDEO - API | $363 | $344 | $411 | $532 | $634 | $871 | 🔴 |
| Domiciliarios INTER - API | $317 | $288 | $315 | $306 | $284 | $299 | 🟡 |
| TEST Creativos - API | $425 | $629 | $680 | $797 | $739 | $829 | 🟡 |
| RADIO - Fincas | $752 | $725 | $1,388 | $639 | $1,251 | $640 | 🟢 |
| Domiciliarios Q58 - | $1,059 | $773 | $1,156 | $1,066 | $877 | $1,059 | 🔴 |
| RADIO - Broad | $1,435 | $1,184 | $1,465 | — | $967 | $875 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 8.32 | 8.43 | 7.59 | 8.23 | 5.31 | 6.35 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.11 | 6.57 | 6.48 | 8.46 | 6.65 | 5.36 | 🔴 |
| RADIO - Seguridad / Negocios | 3.41 | 3.05 | 4.26 | 2.80 | 3.49 | 4.11 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.82 | 7.28 | 6.45 | 8.82 | 8.01 | 8.71 | 🟢 |
| Motorizados - INTER | 9.79 | 8.69 | 8.39 | 8.52 | 11.35 | 10.92 | 🟡 |
| Motorizados - Q58 | 4.45 | 2.40 | 2.64 | 4.43 | 4.00 | 1.91 | 🔴 |
| Domiciliarios - Expancion - API | 6.44 | 6.71 | 6.71 | 6.23 | 5.78 | 7.35 | 🟢 |
| RADIO - Moteros | 2.45 | 2.63 | 2.37 | 2.45 | 3.36 | 3.12 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.36 | 3.65 | 3.59 | 3.66 | 3.69 | 5.16 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.43 | 3.96 | 3.27 | 3.69 | 4.55 | 6.15 | 🟢 |
| Motorizados - API | 8.93 | 7.88 | 5.65 | 5.91 | 4.32 | 4.76 | 🟢 |
| Domiciliarios VIDEO - API | 8.74 | 7.31 | 7.66 | 6.74 | 6.41 | 4.20 | 🔴 |
| Domiciliarios INTER - API | 8.21 | 8.60 | 9.41 | 10.54 | 11.05 | 12.14 | 🟢 |
| TEST Creativos - API | 11.59 | 7.61 | 8.46 | 7.45 | 7.40 | 7.02 | 🟡 |
| RADIO - Fincas | 4.91 | 4.90 | 3.22 | 7.62 | 3.69 | 7.68 | 🟢 |
| Domiciliarios Q58 - | 2.54 | 3.14 | 2.67 | 3.41 | 3.18 | 2.52 | 🔴 |
| RADIO - Broad | 3.79 | 5.20 | 4.47 | — | 8.36 | 10.75 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,291 | 577 | $654 | $3,781 | 5.78 | $548,941 |
| 2026-11-11 | $448,002 | 687 | $652 | $3,659 | 5.61 | $654,808 |

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
