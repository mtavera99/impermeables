# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 11:12 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$50,004** |
| gastado hoy (hasta las 11h) | $107,065 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $402,054 |
| saldo proyectado a medianoche | $-244,984 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $474,971 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $141,345 | 260 | **$544** | $3,605 | 6.63 |
| 2026-10-25 | $139,235 | 321 | **$434** | $3,390 | 7.82 |
| 2026-10-26 | $169,596 | 365 | **$465** | $3,331 | 7.17 |
| 2026-10-27 | $123,074 | 288 | **$427** | $3,612 | 8.45 |
| 2026-10-28 **HOY** | $107,065 | 206 | **$520** | $3,732 | 7.18 |

🟠 Hoy va 22% más caro que ayer a la misma hora ($520 vs $427).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   520  =  $ 3,732  ÷  7.18
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,732 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.18 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $13,468 | 34% | 11 | $1,224 | 5.27 |
| Domiciliarios - API | $35,000 | $9,735 | 28% | 21 | $464 | 10.02 |
| Domiciliarios VIDEO INTER - API | $30,000 | $8,970 | 30% | 19 | $472 | 10.66 |
| Domiciliarios - Expancion - API | $30,000 | $8,424 | 28% | 8 | $1,053 | 3.80 |
| Motorizados - Q58 | $24,000 | $6,971 | 29% | 11 | $634 | 3.50 |
| Domiciliarios - Expancion - Q58 | $24,000 | $6,093 | 25% | 20 | $305 | 7.80 |
| RADIO - Seguridad / Negocios | $25,000 | $5,985 | 24% | 3 | $1,995 | 2.03 |
| Motorizados - API | $20,000 | $5,730 | 29% | 16 | $358 | 11.85 |
| TEST Creativos - API | $20,000 | $5,390 | 27% | 13 | $415 | 8.16 |
| Domiciliarios VIDEO - API | $20,000 | $5,371 | 27% | 18 | $298 | 11.62 |
| Domiciliarios VIDEO Q58 - | $25,000 | $5,322 | 21% | 5 | $1,064 | 3.68 |
| Motorizados - INTER | $25,000 | $5,310 | 21% | 15 | $354 | 19.82 |
| RADIO - Moteros | $20,000 | $4,555 | 23% | 1 | $4,555 | 0.85 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,189 | 17% | 5 | $838 | 3.59 |
| RADIO - Fincas | $20,000 | $4,185 | 21% | 3 | $1,395 | 2.59 |
| Domiciliarios Q58 - | $25,000 | $3,702 | 15% | 24 | $154 | 12.85 |
| Domiciliarios INTER - API | $20,000 | $3,665 | 18% | 13 | $282 | 10.59 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $107,065 | 206 | **$520** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,554**/pedido |
| utilidad estimada de lo que va del día | **$223,617** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,434 | $1,224 | 🟢 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $464 | 🔴 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $641 | $472 | 🟢 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $670 | $1,053 | 🔴 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $634 | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $249 | $305 | 🔴 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $993 | $1,995 | 🔴 |
| Motorizados - API | $456 | $436 | $431 | $426 | $358 | $358 | 🟡 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | $415 | 🟡 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $298 | 🟡 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $690 | $1,064 | 🔴 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $531 | $354 | 🟢 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,160 | $4,555 | 🔴 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $838 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $744 | $1,395 | 🔴 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $201 | $154 | 🟢 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $318 | $282 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.79 | 5.27 | 🟢 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.31 | 10.02 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.85 | 10.66 | 🟢 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.90 | 3.80 | 🔴 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 3.50 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.72 | 7.80 | 🔴 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.14 | 2.03 | 🔴 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.20 | 11.85 | 🟡 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 8.16 | 🔴 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.67 | 11.62 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 3.68 | 🔴 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.25 | 19.82 | 🟢 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.40 | 0.85 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.16 | 3.59 | 🔴 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.55 | 2.59 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.03 | 12.85 | 🟢 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.53 | 10.59 | 🟢 |

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
| 2026-10-27 | $397,386 | 865 | $459 | $3,865 | 8.41 | $991,159 |

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
