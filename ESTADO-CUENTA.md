# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 18:08 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$200,152** |
| gastado hoy (hasta las 18h) | $162,215 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $202,326 |
| saldo proyectado a medianoche | $160,040 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $101,508 | 133 | **$763** | $5,503 | 7.21 |
| 2026-09-27 | $150,734 | 206 | **$732** | $4,378 | 5.98 |
| 2026-09-28 | $167,047 | 343 | **$487** | $5,188 | 10.65 |
| 2026-09-29 | $182,357 | 377 | **$484** | $4,863 | 10.05 |
| 2026-09-30 **HOY** | $162,215 | 356 | **$456** | $4,229 | 9.28 |

🟢 **Hoy va mejor que ayer a la misma hora** ($456 vs $484).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   456  =  $ 4,229  ÷  9.28
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,229 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.28 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $29,611 | 74% | 48 | $617 | 11.05 |
| Domiciliarios - Expancion - API | $40,000 | $21,977 | 55% | 41 | $536 | 7.12 |
| Motorizados - INTER | $20,000 | $18,870 | 94% | 55 | $343 | 14.82 |
| Domiciliarios - API | $35,000 | $17,706 | 51% | 34 | $521 | 7.91 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,958 | 85% | 44 | $385 | 9.11 |
| Domiciliarios INTER - API | $20,000 | $15,956 | 80% | 56 | $285 | 10.85 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,583 | 78% | 21 | $742 | 6.48 |
| Domiciliarios VIDEO - API | $20,000 | $14,786 | 74% | 34 | $435 | 8.71 |
| Motorizados - API | $20,000 | $10,768 | 54% | 22 | $489 | 7.10 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $162,215 | 355 | **$457** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,440**/pedido |
| utilidad estimada de lo que va del día | **$548,219** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $617 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $536 | 🟡 |
| Motorizados - INTER | — | — | — | — | $403 | $343 | 🟢 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $521 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $385 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $285 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $742 | 🔴 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $435 | 🟡 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $489 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 11.05 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.32 | 7.12 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 14.82 | 🟢 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 7.91 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.28 | 9.11 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.82 | 10.85 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 6.48 | 🔴 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.40 | 8.71 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 7.10 | 🟡 |

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
| 2026-09-29 | $234,407 | 525 | $446 | $4,782 | 10.71 | $816,235 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
