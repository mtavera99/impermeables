# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 01:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$210,081** |
| gastado hoy (hasta las 1h) | $4,808 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $214,314 |
| saldo proyectado a medianoche | $574 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $141,161 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $2,008 | 1 | **$2,008** | $5,906 | 2.94 |
| 2026-09-27 | $1,244 | 5 | **$249** | $4,803 | 19.31 |
| 2026-09-28 | $7,183 | 9 | **$798** | $4,063 | 5.09 |
| 2026-09-29 | $1,429 | 4 | **$357** | $4,928 | 13.79 |
| 2026-09-30 **HOY** | $4,808 | 14 | **$343** | $4,383 | 12.76 |

🟢 **Hoy va mejor que ayer a la misma hora** ($343 vs $357).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   343  =  $ 4,383  ÷  12.76
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,383 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 12.76 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - INTER | $20,000 | $1,390 | 7% | 4 | $348 | 12.74 |
| Domiciliarios INTER - API | $20,000 | $1,242 | 6% | 6 | $207 | 18.18 |
| Domiciliarios VIDEO INTER - API | $20,000 | $627 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $480 | 2% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $304 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $286 | 1% | 1 | $286 | 17.24 |
| Domiciliarios - API | $35,000 | $188 | 1% | 1 | $188 | 23.26 |
| Motorizados - API | $20,000 | $162 | 1% | 1 | $162 | 27.03 |
| Domiciliarios VIDEO - API | $20,000 | $129 | 1% | 1 | $129 | 33.33 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $4,808 | 14 | **$343** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,088**/pedido |
| utilidad estimada de lo que va del día | **$23,209** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | $397 | $348 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $270 | $207 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $445 | — |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | $439 | — |  |
| TEST Creativos - API | $820 | $831 | $861 | $588 | $727 | — | 🔴 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $542 | $286 | 🟢 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $477 | $188 | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $504 | $162 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $386 | $129 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | 13.21 | 12.74 | 🟡 |
| Domiciliarios INTER - API | — | — | — | — | 14.90 | 18.18 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.86 | — |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.33 | — |  |
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 10.09 | — | 🔴 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.40 | 17.24 | 🟢 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.69 | 23.26 | 🟢 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.62 | 27.03 | 🟢 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.51 | 33.33 | 🟢 |

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
| 2026-09-29 | $232,405 | 525 | $443 | $4,782 | 10.80 | $818,237 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
