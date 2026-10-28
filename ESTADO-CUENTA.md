# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 16:22 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$142,814** |
| gastado hoy (hasta las 16h) | $214,275 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $389,756 |
| saldo proyectado a medianoche | $-32,666 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $274,951 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $265,312 | 465 | **$571** | $3,604 | 6.32 |
| 2026-10-25 | $240,586 | 532 | **$452** | $3,529 | 7.80 |
| 2026-10-26 | $302,780 | 620 | **$488** | $3,360 | 6.88 |
| 2026-10-27 | $229,501 | 504 | **$455** | $3,812 | 8.37 |
| 2026-10-28 **HOY** | $214,275 | 404 | **$530** | $3,733 | 7.04 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($530 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   530  =  $ 3,733  ÷  7.04
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,733 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.04 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $27,280 | 68% | 18 | $1,516 | 3.79 |
| Domiciliarios - API | $35,000 | $17,434 | 50% | 45 | $387 | 12.35 |
| Domiciliarios VIDEO INTER - API | $30,000 | $17,139 | 57% | 28 | $612 | 7.86 |
| Domiciliarios - Expancion - API | $30,000 | $15,323 | 51% | 17 | $901 | 4.66 |
| Domiciliarios - Expancion - Q58 | $24,000 | $13,924 | 58% | 46 | $303 | 7.81 |
| Motorizados - Q58 | $24,000 | $12,890 | 54% | 23 | $560 | 4.01 |
| RADIO - Seguridad / Negocios | $25,000 | $11,953 | 48% | 9 | $1,328 | 3.43 |
| Domiciliarios VIDEO Q58 - | $25,000 | $11,145 | 45% | 13 | $857 | 4.67 |
| RADIO - Moteros | $20,000 | $10,793 | 54% | 5 | $2,159 | 1.98 |
| Motorizados - INTER | $25,000 | $10,599 | 42% | 23 | $461 | 14.81 |
| RADIO - Fincas | $20,000 | $10,336 | 52% | 13 | $795 | 4.54 |
| Motorizados - API | $20,000 | $9,635 | 48% | 22 | $438 | 9.88 |
| TEST Creativos - API | $20,000 | $9,510 | 48% | 17 | $559 | 6.05 |
| Domiciliarios - Expancion - INTER | $25,000 | $9,448 | 38% | 14 | $675 | 4.62 |
| Domiciliarios VIDEO - API | $20,000 | $9,190 | 46% | 28 | $328 | 10.63 |
| Domiciliarios Q58 - | $25,000 | $9,174 | 37% | 50 | $183 | 11.21 |
| Domiciliarios INTER - API | $20,000 | $8,502 | 43% | 32 | $266 | 12.01 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $214,275 | 403 | **$532** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,774**/pedido |
| utilidad estimada de lo que va del día | **$432,642** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,437 | $1,436 | 🟡 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $387 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $642 | $612 | 🟡 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $671 | $901 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $249 | $303 | 🔴 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $560 | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $995 | $1,328 | 🔴 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $690 | $857 | 🔴 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,161 | $2,159 | 🔴 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $531 | $461 | 🟢 |
| RADIO - Fincas | — | $630 | $434 | $707 | $750 | $795 | 🟡 |
| Motorizados - API | $456 | $436 | $431 | $426 | $358 | $438 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | $559 | 🔴 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $675 | 🔴 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $328 | 🟡 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $202 | $183 | 🟢 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $319 | $266 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.77 | 4.00 | 🔴 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.29 | 12.35 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.84 | 7.86 | 🟡 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.89 | 4.66 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.70 | 7.81 | 🔴 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 4.01 | 🟡 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.11 | 3.43 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 4.67 | 🟡 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.39 | 1.98 | 🔴 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.23 | 14.81 | 🟢 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.51 | 4.54 | 🔴 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.18 | 9.88 | 🔴 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 6.05 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.15 | 4.62 | 🟡 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.63 | 10.63 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.00 | 11.21 | 🟡 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.53 | 12.01 | 🟢 |

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
| 2026-10-27 | $397,981 | 865 | $460 | $3,864 | 8.40 | $990,564 |

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
