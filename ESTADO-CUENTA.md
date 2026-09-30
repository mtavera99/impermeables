# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 20:24 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$149,538** |
| gastado hoy (hasta las 20h) | $197,145 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $212,339 |
| saldo proyectado a medianoche | $134,344 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $9,367 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $128,534 | 167 | **$770** | $5,000 | 6.50 |
| 2026-09-26 | $124,518 | 166 | **$750** | $5,380 | 7.17 |
| 2026-09-27 | $178,805 | 260 | **$688** | $4,403 | 6.40 |
| 2026-09-28 | $183,320 | 384 | **$477** | $5,089 | 10.66 |
| 2026-09-29 **HOY** | $197,145 | 419 | **$471** | $4,795 | 10.19 |

🟢 **Hoy va mejor que ayer a la misma hora** ($471 vs $477).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   471  =  $ 4,795  ÷  10.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,795 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.19 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $27,810 | 70% | 30 | $927 | 7.86 |
| Domiciliarios - Expancion - API | $40,000 | $27,526 | 69% | 53 | $519 | 7.84 |
| Domiciliarios - API | $35,000 | $27,347 | 78% | 52 | $526 | 7.96 |
| Domiciliarios INTER - API | $20,000 | $27,084 | 135% | 97 | $279 | 14.43 |
| Motorizados - INTER | $20,000 | $26,228 | 131% | 66 | $397 | 13.25 |
| Domiciliarios - Expancion - INTER | $20,000 | $25,504 | 128% | 55 | $464 | 10.82 |
| Domiciliarios VIDEO INTER - API | $20,000 | $18,963 | 95% | 36 | $527 | 12.03 |
| Motorizados - API | $20,000 | $11,962 | 60% | 23 | $520 | 7.22 |
| Domiciliarios VIDEO - API | $20,000 | $4,721 | 24% | 7 | $674 | 6.74 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $197,145 | 419 | **$471** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,601**/pedido |
| utilidad estimada de lo que va del día | **$641,367** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $757 | $820 | $831 | $861 | $588 | $927 | 🔴 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $519 | 🔴 |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $433 | $526 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | — | $279 |  |
| Motorizados - INTER | — | — | — | — | — | $397 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $464 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $527 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $311 | $520 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $674 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 7.86 | 🔴 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.43 | 7.84 | 🔴 |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.59 | 7.96 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | — | 14.43 |  |
| Motorizados - INTER | — | — | — | — | — | 13.25 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 10.82 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 12.03 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.63 | 7.22 | 🔴 |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.66 | 6.74 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,211 | 426 | $458 | $5,065 | 11.05 | $657,310 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
