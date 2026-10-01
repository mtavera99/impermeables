# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 19:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$174,793** |
| gastado hoy (hasta las 19h) | $187,063 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,628 |
| saldo proyectado a medianoche | $147,228 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $114,240 | 153 | **$747** | $5,408 | 7.24 |
| 2026-09-27 | $164,299 | 229 | **$717** | $4,398 | 6.13 |
| 2026-09-28 | $176,362 | 367 | **$481** | $5,132 | 10.68 |
| 2026-09-29 | $198,145 | 414 | **$479** | $4,808 | 10.05 |
| 2026-09-30 **HOY** | $187,063 | 410 | **$456** | $4,151 | 9.10 |

🟢 **Hoy va mejor que ayer a la misma hora** ($456 vs $479).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   456  =  $ 4,151  ÷  9.10
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,151 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.10 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $33,434 | 84% | 55 | $608 | 11.04 |
| Domiciliarios - Expancion - API | $40,000 | $26,331 | 66% | 53 | $497 | 7.48 |
| Domiciliarios - API | $35,000 | $21,949 | 63% | 42 | $523 | 7.52 |
| Motorizados - INTER | $20,000 | $20,555 | 103% | 59 | $348 | 14.53 |
| Domiciliarios - Expancion - INTER | $20,000 | $18,559 | 93% | 49 | $379 | 9.17 |
| Domiciliarios VIDEO INTER - API | $20,000 | $17,768 | 89% | 26 | $683 | 7.08 |
| Domiciliarios INTER - API | $20,000 | $17,754 | 89% | 61 | $291 | 10.61 |
| Domiciliarios VIDEO - API | $20,000 | $17,497 | 87% | 40 | $437 | 8.45 |
| Motorizados - API | $20,000 | $13,216 | 66% | 26 | $508 | 6.74 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $187,063 | 411 | **$455** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,418**/pedido |
| utilidad estimada de lo que va del día | **$635,440** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $608 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $497 | 🟢 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $523 | 🟡 |
| Motorizados - INTER | — | — | — | — | $403 | $348 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $379 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $683 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $291 | 🟡 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $441 | 🟡 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $508 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 11.04 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.32 | 7.48 | 🟡 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 7.52 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 14.53 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.27 | 9.17 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 7.08 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.81 | 10.61 | 🔴 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.39 | 8.36 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 6.74 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,418 | 525 | $447 | $4,782 | 10.71 | $816,224 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
