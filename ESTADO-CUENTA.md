# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-29 16:33 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$97,671** |
| gastado hoy (hasta las 16h) | $270,925 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $452,978 |
| saldo proyectado a medianoche | $-84,382 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $263,444 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-25 | $240,586 | 532 | **$452** | $3,529 | 7.80 |
| 2026-10-26 | $302,780 | 620 | **$488** | $3,360 | 6.88 |
| 2026-10-27 | $229,556 | 504 | **$455** | $3,812 | 8.37 |
| 2026-10-28 | $242,772 | 439 | **$553** | $3,724 | 6.73 |
| 2026-10-29 **HOY** | $270,925 | 531 | **$510** | $3,531 | 6.92 |

🟢 **Hoy va mejor que ayer a la misma hora** ($510 vs $553).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   510  =  $ 3,531  ÷  6.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,531 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.92 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $24,567 | 61% | 19 | $1,293 | 4.74 |
| Domiciliarios - API | $35,000 | $22,098 | 63% | 41 | $539 | 7.73 |
| Domiciliarios - Expancion - API | $30,000 | $20,119 | 67% | 37 | $544 | 7.19 |
| Domiciliarios VIDEO INTER - API | $30,000 | $18,984 | 63% | 33 | $575 | 6.76 |
| Domiciliarios VIDEO Q58 - | $25,000 | $17,461 | 70% | 23 | $759 | 4.86 |
| Domiciliarios - Expancion - INTER | $25,000 | $17,311 | 69% | 26 | $666 | 4.59 |
| Domiciliarios Q58 - | $25,000 | $16,787 | 67% | 84 | $200 | 9.56 |
| Motorizados - INTER | $25,000 | $16,506 | 66% | 35 | $472 | 10.70 |
| RADIO - Seguridad / Negocios | $25,000 | $16,433 | 66% | 28 | $587 | 8.28 |
| Domiciliarios - Expancion - Q58 | $24,000 | $15,345 | 64% | 56 | $274 | 8.07 |
| Domiciliarios INTER - API | $20,000 | $13,311 | 67% | 39 | $341 | 9.92 |
| Domiciliarios VIDEO - API | $20,000 | $13,069 | 65% | 32 | $408 | 8.07 |
| Motorizados - Q58 | $24,000 | $12,720 | 53% | 21 | $606 | 4.73 |
| Motorizados - API | $20,000 | $12,714 | 64% | 23 | $553 | 7.09 |
| TEST Creativos - API | $20,000 | $11,778 | 59% | 19 | $620 | 5.81 |
| RADIO - Moteros | $20,000 | $11,672 | 58% | 9 | $1,297 | 3.30 |
| RADIO - Fincas | $20,000 | $10,050 | 50% | 6 | $1,675 | 1.99 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $270,925 | 531 | **$510** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,379**/pedido |
| utilidad estimada de lo que va del día | **$581,465** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | $1,440 | $1,610 | $1,293 | 🟢 |
| Domiciliarios - API | $489 | $434 | $459 | $371 | $379 | $539 | 🔴 |
| Domiciliarios - Expancion - API | $691 | $518 | $576 | $671 | $746 | $544 | 🟢 |
| Domiciliarios VIDEO INTER - API | $490 | $661 | $519 | $642 | $546 | $575 | 🟡 |
| Domiciliarios VIDEO Q58 - | $795 | $829 | $870 | $691 | $912 | $759 | 🟢 |
| Domiciliarios - Expancion - INTER | $594 | $526 | $747 | $499 | $643 | $666 | 🟡 |
| Domiciliarios Q58 - | $204 | $185 | $211 | $202 | $199 | $200 | 🟡 |
| Motorizados - INTER | $595 | $838 | $543 | $532 | $547 | $472 | 🟢 |
| RADIO - Seguridad / Negocios | $1,170 | $750 | $1,000 | $1,001 | $735 | $587 | 🟢 |
| Domiciliarios - Expancion - Q58 | $876 | $286 | $241 | $250 | $326 | $274 | 🟢 |
| Domiciliarios INTER - API | $462 | $366 | $332 | $319 | $322 | $341 | 🟡 |
| Domiciliarios VIDEO - API | $383 | $332 | $389 | $308 | $355 | $408 | 🔴 |
| Motorizados - Q58 | $547 | $836 | $769 | $607 | $631 | $606 | 🟡 |
| Motorizados - API | $436 | $431 | $426 | $359 | $459 | $553 | 🔴 |
| TEST Creativos - API | $395 | $526 | $490 | $387 | $574 | $620 | 🟡 |
| RADIO - Moteros | $919 | $926 | $1,068 | $1,162 | $1,512 | $1,297 | 🟢 |
| RADIO - Fincas | $630 | $434 | $707 | $751 | $749 | $1,675 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | 4.76 | 3.50 | 4.74 | 🟢 |
| Domiciliarios - API | 8.16 | 10.50 | 9.11 | 13.28 | 12.75 | 7.73 | 🔴 |
| Domiciliarios - Expancion - API | 5.47 | 8.50 | 7.03 | 6.89 | 5.97 | 7.19 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.56 | 6.02 | 8.12 | 7.83 | 8.48 | 6.76 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.11 | 4.81 | 3.70 | 5.31 | 4.29 | 4.86 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.70 | 5.97 | 3.66 | 5.15 | 4.81 | 4.59 | 🟡 |
| Domiciliarios Q58 - | 10.24 | 11.43 | 9.12 | 10.98 | 10.84 | 9.56 | 🟡 |
| Motorizados - INTER | 8.89 | 6.52 | 10.17 | 13.22 | 11.23 | 10.70 | 🟡 |
| RADIO - Seguridad / Negocios | 4.13 | 5.50 | 4.36 | 5.10 | 6.40 | 8.28 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.47 | 8.73 | 9.37 | 10.69 | 7.52 | 8.07 | 🟢 |
| Domiciliarios INTER - API | 6.56 | 8.11 | 7.76 | 8.52 | 10.00 | 9.92 | 🟡 |
| Domiciliarios VIDEO - API | 7.54 | 9.93 | 7.54 | 12.62 | 10.10 | 8.07 | 🔴 |
| Motorizados - Q58 | 5.28 | 3.66 | 4.17 | 4.49 | 3.47 | 4.73 | 🟢 |
| Motorizados - API | 8.65 | 9.54 | 8.76 | 12.17 | 9.23 | 7.09 | 🔴 |
| TEST Creativos - API | 8.50 | 6.95 | 9.25 | 12.47 | 6.05 | 5.81 | 🟡 |
| RADIO - Moteros | 5.63 | 4.15 | 3.02 | 3.39 | 2.81 | 3.30 | 🟢 |
| RADIO - Fincas | 8.62 | 9.35 | 5.16 | 5.51 | 4.85 | 1.99 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,112 | 819 | $535 | $3,719 | 6.95 | $876,591 |

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
