# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 09:11 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,094** |
| gastado hoy (hasta las 9h) | $70,621 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $408,818 |
| saldo proyectado a medianoche | $-251,104 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $474,325 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $99,858 | 177 | **$564** | $3,493 | 6.19 |
| 2026-10-25 | $98,463 | 232 | **$424** | $3,323 | 7.83 |
| 2026-10-26 | $117,602 | 244 | **$482** | $3,309 | 6.87 |
| 2026-10-27 | $88,296 | 208 | **$424** | $3,622 | 8.53 |
| 2026-10-28 **HOY** | $70,621 | 136 | **$519** | $3,712 | 7.15 |

🟠 Hoy va 22% más caro que ayer a la misma hora ($519 vs $424).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   519  =  $ 3,712  ÷  7.15
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,712 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.15 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $8,686 | 22% | 8 | $1,086 | 6.39 |
| Domiciliarios - API | $35,000 | $6,681 | 19% | 12 | $557 | 8.15 |
| Domiciliarios - Expancion - API | $30,000 | $5,734 | 19% | 3 | $1,911 | 2.06 |
| Domiciliarios VIDEO INTER - API | $30,000 | $5,418 | 18% | 10 | $542 | 8.80 |
| RADIO - Seguridad / Negocios | $25,000 | $4,307 | 17% | 2 | $2,154 | 1.98 |
| Motorizados - API | $20,000 | $4,100 | 20% | 13 | $315 | 13.08 |
| TEST Creativos - API | $20,000 | $4,095 | 20% | 10 | $410 | 8.36 |
| Motorizados - Q58 | $24,000 | $4,056 | 17% | 7 | $579 | 3.42 |
| Domiciliarios VIDEO - API | $20,000 | $3,815 | 19% | 12 | $318 | 10.54 |
| Domiciliarios - Expancion - Q58 | $24,000 | $3,696 | 15% | 14 | $264 | 9.30 |
| Motorizados - INTER | $25,000 | $3,564 | 14% | 11 | $324 | 21.24 |
| Domiciliarios VIDEO Q58 - | $25,000 | $3,159 | 13% | 1 | $3,159 | 1.18 |
| RADIO - Moteros | $20,000 | $2,896 | 14% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $2,866 | 14% | 2 | $1,433 | 2.70 |
| Domiciliarios - Expancion - INTER | $25,000 | $2,678 | 11% | 3 | $893 | 3.23 |
| Domiciliarios INTER - API | $20,000 | $2,594 | 13% | 11 | $236 | 12.82 |
| Domiciliarios Q58 - | $25,000 | $2,276 | 9% | 17 | $134 | 14.39 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $70,621 | 136 | **$519** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,545**/pedido |
| utilidad estimada de lo que va del día | **$147,694** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,433 | $1,086 | 🟢 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $370 | $557 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $669 | $1,911 | 🔴 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $640 | $542 | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $991 | $2,154 | 🔴 |
| Motorizados - API | $456 | $436 | $431 | $426 | $358 | $315 | 🟢 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | $410 | 🟡 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $579 | 🟡 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $307 | $318 | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $248 | $264 | 🟡 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $530 | $324 | 🟢 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $690 | $3,159 | 🔴 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,158 | — | 🟡 |
| RADIO - Fincas | — | $630 | $434 | $707 | $743 | $1,433 | 🔴 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $893 | 🔴 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $318 | $236 | 🟢 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $201 | $134 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.79 | 6.39 | 🟢 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.31 | 8.15 | 🔴 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.91 | 2.06 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.87 | 8.80 | 🟢 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.15 | 1.98 | 🔴 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.21 | 13.08 | 🟢 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.48 | 8.36 | 🔴 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.50 | 3.42 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.68 | 10.54 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.74 | 9.30 | 🟡 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.27 | 21.24 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 1.18 | 🔴 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.41 | — | 🟢 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.57 | 2.70 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.16 | 3.23 | 🔴 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.53 | 12.82 | 🟢 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.05 | 14.39 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $397,032 | 865 | $459 | $3,866 | 8.42 | $991,513 |

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
