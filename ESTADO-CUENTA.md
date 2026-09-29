# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 18:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$179,377** |
| gastado hoy (hasta las 18h) | $167,681 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $205,042 |
| saldo proyectado a medianoche | $142,016 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $8,992 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $109,130 | 134 | **$814** | $4,902 | 6.02 |
| 2026-09-26 | $101,508 | 133 | **$763** | $5,503 | 7.21 |
| 2026-09-27 | $150,734 | 206 | **$732** | $4,378 | 5.98 |
| 2026-09-28 | $167,047 | 343 | **$487** | $5,188 | 10.65 |
| 2026-09-29 **HOY** | $167,681 | 360 | **$466** | $4,916 | 10.55 |

🟢 **Hoy va mejor que ayer a la misma hora** ($466 vs $487).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   466  =  $ 4,916  ÷  10.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,916 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.55 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $20,000 | $23,621 | 118% | 83 | $285 | 14.71 |
| Domiciliarios - API | $35,000 | $23,335 | 67% | 50 | $467 | 9.30 |
| Motorizados - INTER | $20,000 | $22,820 | 114% | 61 | $374 | 14.05 |
| Domiciliarios - Expancion - INTER | $20,000 | $22,695 | 113% | 47 | $483 | 10.65 |
| TEST Creativos - API | $40,000 | $22,580 | 56% | 20 | $1,129 | 6.75 |
| Domiciliarios - Expancion - API | $40,000 | $22,560 | 56% | 38 | $594 | 7.09 |
| Domiciliarios VIDEO INTER - API | $20,000 | $16,028 | 80% | 33 | $486 | 13.11 |
| Motorizados - API | $20,000 | $10,010 | 50% | 20 | $500 | 7.63 |
| Domiciliarios VIDEO - API | $20,000 | $4,032 | 20% | 7 | $576 | 8.06 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $167,681 | 359 | **$467** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,560**/pedido |
| utilidad estimada de lo que va del día | **$550,758** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | $285 |  |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $433 | $467 | 🟡 |
| Motorizados - INTER | — | — | — | — | — | $374 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $483 |  |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $588 | $1,129 | 🔴 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $594 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $486 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $311 | $500 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $576 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | 14.71 |  |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.59 | 9.30 | 🔴 |
| Motorizados - INTER | — | — | — | — | — | 14.05 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 10.65 |  |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 6.75 | 🔴 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.43 | 7.09 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 13.11 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.63 | 7.63 | 🔴 |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.66 | 8.06 | 🟢 |

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
| 2026-09-28 | $195,202 | 426 | $458 | $5,065 | 11.05 | $657,319 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
