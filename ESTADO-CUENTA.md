# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-25 00:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$141,719** |
| gastado hoy (hasta las 0h) | $4,766 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $341,986 |
| saldo proyectado a medianoche | $-195,500 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $431,215 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-21 | $5,925 | 18 | **$329** | $4,360 | 13.25 |
| 2026-10-22 | $3,144 | 5 | **$629** | $3,945 | 6.27 |
| 2026-10-23 | $2,832 | 8 | **$354** | $3,966 | 11.20 |
| 2026-10-24 | $3,085 | 9 | **$343** | $3,562 | 10.39 |
| 2026-10-25 **HOY** | $4,766 | 9 | **$530** | $2,917 | 5.51 |

🟠 Hoy va 54% más caro que ayer a la misma hora ($530 vs $343).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   530  =  $ 2,917  ÷  5.51
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,917 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.51 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | $20,000 | $1,603 | 8% | 4 | $401 | 6.05 |
| Domiciliarios - Expancion - API | $40,000 | $525 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $391 | 1% | 1 | $391 | 11.90 |
| Domiciliarios - Expancion - INTER | $25,000 | $314 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $283 | 1% | 1 | $283 | 19.23 |
| Domiciliarios INTER - API | $25,000 | $271 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $270 | 1% | 1 | $270 | 12.66 |
| Motorizados - Q58 | $20,000 | $269 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $242 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $25,000 | $146 | 1% | 0 | — | 0.00 |
| RADIO - Moteros | $20,000 | $138 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $88 | 0% | 1 | $88 | 30.30 |
| Motorizados - INTER | $25,000 | $70 | 0% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $63 | 0% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $25,000 | $48 | 0% | 1 | $48 | 41.67 |
| Domiciliarios Q58 - | $25,000 | $45 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $4,766 | 9 | **$530** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,734**/pedido |
| utilidad estimada de lo que va del día | **$9,681** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | $1,121 | $1,077 | $892 | $1,117 | $876 | $401 | 🟢 |
| Domiciliarios - Expancion - API | $583 | $424 | $444 | $517 | $691 | — | 🔴 |
| Domiciliarios - API | $484 | $348 | $370 | $417 | $489 | $391 | 🟢 |
| Domiciliarios - Expancion - INTER | $629 | $604 | $721 | $662 | $589 | — | 🟢 |
| TEST Creativos - API | $609 | $535 | $379 | $480 | $395 | $283 | 🟢 |
| Domiciliarios INTER - API | $324 | $304 | $314 | $332 | $458 | — | 🔴 |
| Motorizados - API | $470 | $446 | $379 | $456 | $436 | $270 | 🟢 |
| Motorizados - Q58 | $545 | $1,025 | $599 | $514 | $545 | — | 🟡 |
| Domiciliarios VIDEO - API | $319 | $269 | $292 | $337 | $383 | — | 🟡 |
| Domiciliarios VIDEO INTER - API | $576 | $701 | $742 | $646 | $488 | — | 🟢 |
| RADIO - Moteros | — | — | — | — | $908 | — |  |
| Domiciliarios VIDEO Q58 - | $642 | $995 | $1,091 | $679 | $791 | $88 | 🟢 |
| Motorizados - INTER | $591 | $460 | $545 | $714 | $588 | — | 🟢 |
| RADIO - Fincas | — | — | — | — | $625 | — |  |
| RADIO - Seguridad / Negocios | — | — | — | — | $1,163 | $48 | 🟢 |
| Domiciliarios Q58 - | $185 | $197 | $159 | $217 | $202 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | 2.71 | 3.65 | 4.52 | 3.93 | 4.49 | 6.05 | 🟢 |
| Domiciliarios - Expancion - API | 7.58 | 11.99 | 10.38 | 8.14 | 5.50 | — | 🔴 |
| Domiciliarios - API | 9.53 | 14.10 | 12.13 | 9.61 | 8.24 | 11.90 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.46 | 5.33 | 4.21 | 4.83 | 4.72 | — | 🟡 |
| TEST Creativos - API | 8.80 | 11.03 | 14.31 | 8.92 | 8.50 | 19.23 | 🟢 |
| Domiciliarios INTER - API | 11.02 | 12.17 | 9.39 | 7.57 | 6.60 | — | 🟡 |
| Motorizados - API | 8.05 | 9.31 | 10.45 | 8.59 | 8.74 | 12.66 | 🟢 |
| Motorizados - Q58 | 5.75 | 3.32 | 5.14 | 5.82 | 5.31 | — | 🟡 |
| Domiciliarios VIDEO - API | 11.78 | 14.69 | 10.98 | 9.18 | 7.61 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.46 | 5.98 | 5.52 | 6.43 | 8.61 | — | 🟢 |
| RADIO - Moteros | — | — | — | — | 5.71 | — |  |
| Domiciliarios VIDEO Q58 - | 3.62 | 3.19 | 2.96 | 4.98 | 4.13 | 30.30 | 🟢 |
| Motorizados - INTER | 8.76 | 13.59 | 11.01 | 8.00 | 9.00 | — | 🟢 |
| RADIO - Fincas | — | — | — | — | 8.73 | — |  |
| RADIO - Seguridad / Negocios | — | — | — | — | 4.16 | 41.67 | 🟢 |
| Domiciliarios Q58 - | 13.11 | 11.07 | 12.89 | 10.68 | 10.34 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $383,167 | 750 | $511 | $3,534 | 6.92 | $820,774 |

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
