# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-29 14:32 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$132,166** |
| gastado hoy (hasta las 14h) | $236,625 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $462,116 |
| saldo proyectado a medianoche | $-93,324 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $263,249 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-25 | $203,500 | 451 | **$451** | $3,479 | 7.71 |
| 2026-10-26 | $254,093 | 529 | **$480** | $3,344 | 6.96 |
| 2026-10-27 | $190,008 | 420 | **$452** | $3,715 | 8.21 |
| 2026-10-28 | $195,094 | 354 | **$551** | $3,719 | 6.75 |
| 2026-10-29 **HOY** | $236,625 | 455 | **$520** | $3,504 | 6.74 |

🟢 **Hoy va mejor que ayer a la misma hora** ($520 vs $551).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   520  =  $ 3,504  ÷  6.74
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,504 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.74 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $21,908 | 55% | 19 | $1,153 | 5.20 |
| Domiciliarios - API | $35,000 | $19,517 | 56% | 34 | $574 | 7.22 |
| Domiciliarios - Expancion - API | $30,000 | $17,395 | 58% | 34 | $512 | 7.48 |
| Domiciliarios VIDEO INTER - API | $30,000 | $16,863 | 56% | 24 | $703 | 5.53 |
| Domiciliarios VIDEO Q58 - | $25,000 | $15,823 | 63% | 20 | $791 | 4.68 |
| Domiciliarios - Expancion - INTER | $25,000 | $15,672 | 63% | 23 | $681 | 4.44 |
| Domiciliarios Q58 - | $25,000 | $14,454 | 58% | 75 | $193 | 9.65 |
| Motorizados - INTER | $25,000 | $13,993 | 56% | 29 | $483 | 10.05 |
| RADIO - Seguridad / Negocios | $25,000 | $13,730 | 55% | 22 | $624 | 7.79 |
| Domiciliarios - Expancion - Q58 | $24,000 | $13,126 | 55% | 41 | $320 | 6.77 |
| Domiciliarios INTER - API | $20,000 | $11,737 | 59% | 36 | $326 | 10.40 |
| Domiciliarios VIDEO - API | $20,000 | $11,611 | 58% | 28 | $415 | 8.00 |
| Motorizados - Q58 | $24,000 | $11,205 | 47% | 19 | $590 | 4.84 |
| Motorizados - API | $20,000 | $10,995 | 55% | 21 | $524 | 7.34 |
| TEST Creativos - API | $20,000 | $10,178 | 51% | 16 | $636 | 5.85 |
| RADIO - Moteros | $20,000 | $9,819 | 49% | 9 | $1,091 | 3.99 |
| RADIO - Fincas | $20,000 | $8,599 | 43% | 6 | $1,433 | 2.33 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $236,625 | 456 | **$519** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,539**/pedido |
| utilidad estimada de lo que va del día | **$495,371** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | $1,440 | $1,607 | $1,153 | 🟢 |
| Domiciliarios - API | $489 | $434 | $459 | $371 | $379 | $574 | 🔴 |
| Domiciliarios - Expancion - API | $691 | $518 | $576 | $671 | $745 | $512 | 🟢 |
| Domiciliarios VIDEO INTER - API | $490 | $661 | $519 | $642 | $546 | $703 | 🔴 |
| Domiciliarios VIDEO Q58 - | $795 | $829 | $870 | $691 | $912 | $791 | 🟢 |
| Domiciliarios - Expancion - INTER | $594 | $526 | $747 | $499 | $643 | $681 | 🟡 |
| Domiciliarios Q58 - | $204 | $185 | $211 | $202 | $199 | $193 | 🟡 |
| Motorizados - INTER | $595 | $838 | $543 | $532 | $546 | $483 | 🟢 |
| RADIO - Seguridad / Negocios | $1,170 | $750 | $1,000 | $1,001 | $735 | $624 | 🟢 |
| Domiciliarios - Expancion - Q58 | $876 | $286 | $241 | $250 | $325 | $320 | 🟡 |
| Domiciliarios INTER - API | $462 | $366 | $332 | $319 | $322 | $326 | 🟡 |
| Domiciliarios VIDEO - API | $383 | $332 | $389 | $308 | $355 | $415 | 🔴 |
| Motorizados - Q58 | $547 | $836 | $769 | $607 | $631 | $590 | 🟢 |
| Motorizados - API | $436 | $431 | $426 | $359 | $459 | $524 | 🟡 |
| TEST Creativos - API | $395 | $526 | $490 | $387 | $574 | $636 | 🟡 |
| RADIO - Moteros | $919 | $926 | $1,068 | $1,162 | $1,511 | $1,091 | 🟢 |
| RADIO - Fincas | $630 | $434 | $707 | $751 | $746 | $1,433 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | 4.76 | 3.51 | 5.20 | 🟢 |
| Domiciliarios - API | 8.16 | 10.50 | 9.11 | 13.28 | 12.76 | 7.22 | 🔴 |
| Domiciliarios - Expancion - API | 5.47 | 8.50 | 7.03 | 6.89 | 5.98 | 7.48 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.56 | 6.02 | 8.12 | 7.83 | 8.49 | 5.53 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.11 | 4.81 | 3.70 | 5.31 | 4.29 | 4.68 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.70 | 5.97 | 3.66 | 5.15 | 4.81 | 4.44 | 🟡 |
| Domiciliarios Q58 - | 10.24 | 11.43 | 9.12 | 10.98 | 10.85 | 9.65 | 🟡 |
| Motorizados - INTER | 8.89 | 6.52 | 10.17 | 13.22 | 11.24 | 10.05 | 🟡 |
| RADIO - Seguridad / Negocios | 4.13 | 5.50 | 4.36 | 5.10 | 6.41 | 7.79 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.47 | 8.73 | 9.37 | 10.69 | 7.53 | 6.77 | 🟡 |
| Domiciliarios INTER - API | 6.56 | 8.11 | 7.76 | 8.52 | 10.00 | 10.40 | 🟡 |
| Domiciliarios VIDEO - API | 7.54 | 9.93 | 7.54 | 12.62 | 10.11 | 8.00 | 🔴 |
| Motorizados - Q58 | 5.28 | 3.66 | 4.17 | 4.49 | 3.48 | 4.84 | 🟢 |
| Motorizados - API | 8.65 | 9.54 | 8.76 | 12.17 | 9.23 | 7.34 | 🔴 |
| TEST Creativos - API | 8.50 | 6.95 | 9.25 | 12.47 | 6.05 | 5.85 | 🟡 |
| RADIO - Moteros | 5.63 | 4.15 | 3.02 | 3.39 | 2.81 | 3.99 | 🟢 |
| RADIO - Fincas | 8.62 | 9.35 | 5.16 | 5.51 | 4.87 | 2.33 | 🔴 |

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
| 2026-10-28 | $437,761 | 819 | $535 | $3,719 | 6.96 | $876,942 |

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
