# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 13:08 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,055** |
| gastado hoy (hasta las 13h) | $110,235 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $201,045 |
| saldo proyectado a medianoche | $-3,755 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $158,760 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $78,357 | 91 | **$861** | $4,676 | 5.43 |
| 2026-09-26 | $56,120 | 77 | **$729** | $5,710 | 7.83 |
| 2026-09-27 | $78,707 | 111 | **$709** | $4,980 | 7.02 |
| 2026-09-28 | $132,010 | 242 | **$545** | $5,146 | 9.43 |
| 2026-09-29 **HOY** | $110,235 | 241 | **$457** | $5,005 | 10.94 |

🟢 **Hoy va mejor que ayer a la misma hora** ($457 vs $545).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   457  =  $ 5,005  ÷  10.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,005 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.94 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $20,000 | $17,876 | 89% | 40 | $447 | 11.40 |
| Domiciliarios INTER - API | $20,000 | $17,765 | 89% | 56 | $317 | 13.44 |
| Motorizados - INTER | $20,000 | $15,637 | 78% | 37 | $423 | 12.71 |
| Domiciliarios - API | $35,000 | $13,704 | 39% | 31 | $442 | 10.84 |
| Domiciliarios - Expancion - API | $40,000 | $12,677 | 32% | 23 | $551 | 7.50 |
| TEST Creativos - API | $40,000 | $12,531 | 31% | 13 | $964 | 7.90 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,584 | 58% | 23 | $504 | 12.43 |
| Motorizados - API | $20,000 | $6,108 | 31% | 14 | $436 | 9.22 |
| Domiciliarios VIDEO - API | $20,000 | $2,353 | 12% | 4 | $588 | 8.06 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $110,235 | 241 | **$457** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,445**/pedido |
| utilidad estimada de lo que va del día | **$372,060** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $447 |  |
| Domiciliarios INTER - API | — | — | — | — | — | $317 |  |
| Motorizados - INTER | — | — | — | — | — | $423 |  |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $432 | $442 | 🟡 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $551 | 🔴 |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $587 | $964 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $504 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $310 | $436 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $588 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 11.40 |  |
| Domiciliarios INTER - API | — | — | — | — | — | 13.44 |  |
| Motorizados - INTER | — | — | — | — | — | 12.71 |  |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.60 | 10.84 | 🟡 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.44 | 7.50 | 🔴 |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 7.90 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 12.43 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.65 | 9.22 | 🔴 |
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
| 2026-09-28 | $195,035 | 426 | $458 | $5,063 | 11.06 | $657,486 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
