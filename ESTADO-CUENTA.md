# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 14:08 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$75,335** |
| gastado hoy (hasta las 14h) | $121,733 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $204,186 |
| saldo proyectado a medianoche | $-7,118 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $158,982 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $83,178 | 97 | **$858** | $4,692 | 5.47 |
| 2026-09-26 | $63,334 | 87 | **$728** | $5,861 | 8.05 |
| 2026-09-27 | $88,176 | 123 | **$717** | $4,782 | 6.67 |
| 2026-09-28 | $139,329 | 268 | **$520** | $5,170 | 9.95 |
| 2026-09-29 **HOY** | $121,733 | 264 | **$461** | $4,982 | 10.80 |

🟢 **Hoy va mejor que ayer a la misma hora** ($461 vs $520).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   461  =  $ 4,982  ÷  10.80
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,982 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.80 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $20,000 | $18,950 | 95% | 64 | $296 | 14.32 |
| Domiciliarios - Expancion - INTER | $20,000 | $18,916 | 95% | 42 | $450 | 11.25 |
| Motorizados - INTER | $20,000 | $17,072 | 85% | 43 | $397 | 13.33 |
| Domiciliarios - API | $35,000 | $15,744 | 45% | 32 | $492 | 9.59 |
| Domiciliarios - Expancion - API | $40,000 | $14,815 | 37% | 26 | $570 | 7.37 |
| TEST Creativos - API | $40,000 | $14,284 | 36% | 14 | $1,020 | 7.40 |
| Domiciliarios VIDEO INTER - API | $20,000 | $12,421 | 62% | 25 | $497 | 12.74 |
| Motorizados - API | $20,000 | $6,743 | 34% | 14 | $482 | 8.24 |
| Domiciliarios VIDEO - API | $20,000 | $2,788 | 14% | 4 | $697 | 6.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $121,733 | 264 | **$461** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,489**/pedido |
| utilidad estimada de lo que va del día | **$406,590** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | $296 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $450 |  |
| Motorizados - INTER | — | — | — | — | — | $397 |  |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $433 | $492 | 🟡 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $570 | 🔴 |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $588 | $1,020 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $497 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $310 | $482 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $697 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | 14.32 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 11.25 |  |
| Motorizados - INTER | — | — | — | — | — | 13.33 |  |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.59 | 9.59 | 🔴 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.43 | 7.37 | 🔴 |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 7.40 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 12.74 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.65 | 8.24 | 🔴 |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.66 | 6.78 | 🟡 |

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
| 2026-09-28 | $195,109 | 426 | $458 | $5,064 | 11.06 | $657,412 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
