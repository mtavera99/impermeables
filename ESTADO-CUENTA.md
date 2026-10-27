# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 19:33 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$58,941** |
| gastado hoy (hasta las 19h) | $380,519 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $446,321 |
| saldo proyectado a medianoche | $-6,861 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $138,240 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $265,457 | 611 | **$434** | $3,731 | 8.59 |
| 2026-10-23 | $232,506 | 484 | **$480** | $3,554 | 7.40 |
| 2026-10-24 | $342,467 | 649 | **$528** | $3,560 | 6.75 |
| 2026-10-25 | $314,606 | 692 | **$455** | $3,573 | 7.86 |
| 2026-10-26 **HOY** | $380,519 | 757 | **$503** | $3,366 | 6.70 |

🟠 Hoy va 11% más caro que ayer a la misma hora ($503 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   503  =  $ 3,366  ÷  6.70
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,366 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.70 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $39,777 | 99% | 61 | $652 | 6.16 |
| Domiciliarios - API | $35,000 | $33,857 | 97% | 73 | $464 | 9.09 |
| Domiciliarios VIDEO Q58 - | $25,000 | $29,435 | 118% | 37 | $796 | 4.32 |
| Domiciliarios Q58 - | $25,000 | $27,130 | 109% | 112 | $242 | 8.00 |
| Domiciliarios INTER - API | $25,000 | $26,917 | 108% | 74 | $364 | 7.53 |
| Domiciliarios - Expancion - INTER | $25,000 | $26,551 | 106% | 31 | $856 | 3.46 |
| Domiciliarios VIDEO INTER - API | $25,000 | $22,633 | 91% | 43 | $526 | 8.03 |
| Motorizados - Q58 | $20,000 | $22,497 | 112% | 29 | $776 | 4.26 |
| TEST Creativos - API | $20,000 | $22,293 | 111% | 47 | $474 | 9.15 |
| Motorizados - INTER | $25,000 | $21,617 | 86% | 36 | $600 | 9.42 |
| RADIO - Seguridad / Negocios | $25,000 | $20,713 | 83% | 23 | $901 | 4.94 |
| RADIO - Fincas | $20,000 | $19,040 | 95% | 23 | $828 | 4.57 |
| Motorizados - API | $20,000 | $18,932 | 95% | 40 | $473 | 7.96 |
| Domiciliarios VIDEO - API | $20,000 | $18,361 | 92% | 46 | $399 | 7.29 |
| Domiciliarios - Expancion - Q58 | $20,000 | $18,271 | 91% | 72 | $254 | 9.07 |
| RADIO - Moteros | $20,000 | $12,495 | 62% | 11 | $1,136 | 2.98 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $380,519 | 758 | **$502** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,228**/pedido |
| utilidad estimada de lo que va del día | **$836,264** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $652 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $464 | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $796 | 🟡 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $242 | 🔴 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $364 | 🟡 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $856 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $526 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $776 | 🟢 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $474 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $600 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $901 | 🔴 |
| RADIO - Fincas | — | — | — | $630 | $434 | $828 | 🔴 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $473 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $399 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $254 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $926 | $1,136 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 6.16 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 9.09 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 4.32 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.43 | 8.00 | 🔴 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.11 | 7.53 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 3.46 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.03 | 8.03 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.26 | 🟢 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.15 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.52 | 9.42 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.50 | 4.94 | 🟡 |
| RADIO - Fincas | — | — | — | 8.62 | 9.35 | 4.57 | 🔴 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 7.96 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.29 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.07 | 🟡 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 2.98 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,559 | 7.79 | $1,015,232 |

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
