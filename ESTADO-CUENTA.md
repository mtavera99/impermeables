# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 23:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$146,561** |
| gastado hoy (hasta las 23h) | $382,745 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $382,745 |
| saldo proyectado a medianoche | $146,561 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟠 Recargar $48,394 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | **$460** | $3,523 | 7.66 |
| 2026-10-21 | $343,403 | 802 | **$428** | $3,984 | 9.30 |
| 2026-10-22 | $317,276 | 759 | **$418** | $3,709 | 8.87 |
| 2026-10-23 | $297,189 | 630 | **$472** | $3,553 | 7.53 |
| 2026-10-24 **HOY** | $382,745 | 749 | **$511** | $3,538 | 6.92 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($511 vs $472).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   511  =  $ 3,538  ÷  6.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,538 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.92 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $36,618 | 92% | 53 | $691 | 5.51 |
| Domiciliarios - API | $35,000 | $34,682 | 99% | 71 | $488 | 8.24 |
| TEST Creativos - API | $20,000 | $26,455 | 132% | 67 | $395 | 8.51 |
| Domiciliarios VIDEO Q58 - | $25,000 | $26,051 | 104% | 33 | $789 | 4.13 |
| Domiciliarios - Expancion - INTER | $25,000 | $25,855 | 103% | 44 | $588 | 4.74 |
| Domiciliarios VIDEO INTER - API | $25,000 | $23,880 | 96% | 49 | $487 | 8.62 |
| Domiciliarios - Expancion - Q58 | $20,000 | $23,639 | 118% | 27 | $876 | 4.50 |
| Domiciliarios Q58 - | $25,000 | $23,611 | 94% | 117 | $202 | 10.34 |
| Motorizados - INTER | $25,000 | $23,518 | 94% | 40 | $588 | 9.01 |
| Domiciliarios INTER - API | $25,000 | $22,881 | 92% | 50 | $458 | 6.61 |
| RADIO - Seguridad / Negocios | $25,000 | $20,824 | 83% | 18 | $1,157 | 4.19 |
| Motorizados - Q58 | $20,000 | $20,106 | 101% | 37 | $543 | 5.34 |
| Motorizados - API | $20,000 | $20,055 | 100% | 45 | $446 | 8.56 |
| Domiciliarios VIDEO - API | $20,000 | $19,893 | 99% | 52 | $383 | 7.65 |
| RADIO - Moteros | $20,000 | $19,052 | 95% | 21 | $907 | 5.73 |
| RADIO - Fincas | $20,000 | $15,625 | 78% | 25 | $625 | 8.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $382,745 | 749 | **$511** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,394**/pedido |
| utilidad estimada de lo que va del día | **$819,590** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $517 | $691 | 🔴 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $417 | $488 | 🔴 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $395 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $679 | $789 | 🔴 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $662 | $588 | 🟢 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $646 | $487 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,117 | $876 | 🟢 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $217 | $202 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $714 | $588 | 🟢 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $332 | $458 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $1,157 |  |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $514 | $543 | 🟡 |
| Motorizados - API | $579 | $470 | $446 | $379 | $456 | $446 | 🟡 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $383 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $907 |  |
| RADIO - Fincas | — | — | — | — | — | $625 |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.14 | 5.51 | 🔴 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.61 | 8.24 | 🟡 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 8.51 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.98 | 4.13 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.83 | 4.74 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.43 | 8.62 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.93 | 4.50 | 🟢 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.68 | 10.34 | 🟡 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.00 | 9.01 | 🟢 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.57 | 6.61 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 4.19 |  |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.82 | 5.34 | 🟡 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.59 | 8.56 | 🟡 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.18 | 7.65 | 🔴 |
| RADIO - Moteros | — | — | — | — | — | 5.73 |  |
| RADIO - Fincas | — | — | — | — | — | 8.75 |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |

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
