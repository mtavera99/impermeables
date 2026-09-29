# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 04:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$141,184** |
| gastado hoy (hasta las 4h) | $7,054 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $176,224 |
| saldo proyectado a medianoche | $-27,986 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $207,812 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–4:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $5,475 | 8 | **$684** | $6,193 | 9.05 |
| 2026-09-26 | $4,114 | 8 | **$514** | $6,086 | 11.83 |
| 2026-09-27 | $2,811 | 9 | **$312** | $5,427 | 17.37 |
| 2026-09-28 | $50,405 | 38 | **$1,326** | $5,445 | 4.11 |
| 2026-09-29 **HOY** | $7,054 | 19 | **$371** | $5,873 | 15.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($371 vs $1,326).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   371  =  $ 5,873  ÷  15.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,873 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 15.82 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $20,000 | $1,673 | 8% | 3 | $558 | 12.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,077 | 5% | 4 | $269 | 23.67 |
| TEST Creativos - API | $40,000 | $1,007 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $881 | 2% | 3 | $294 | 18.18 |
| Domiciliarios INTER - API | $20,000 | $875 | 4% | 4 | $219 | 24.24 |
| Motorizados - API | $20,000 | $746 | 4% | 3 | $249 | 17.44 |
| Domiciliarios - API | $35,000 | $375 | 1% | 1 | $375 | 11.49 |
| Motorizados - INTER | $20,000 | $364 | 2% | 1 | $364 | 15.38 |
| Domiciliarios VIDEO - API | $20,000 | $56 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,054 | 19 | **$371** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,420**/pedido |
| utilidad estimada de lo que va del día | **$30,969** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $558 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $269 |  |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $585 | — | 🟢 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $406 | $294 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | — | $219 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $309 | $249 | 🟢 |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $430 | $375 | 🟢 |
| Motorizados - INTER | — | — | — | — | — | $364 |  |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $879 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 12.00 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 23.67 |  |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.28 | — | 🟢 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.48 | 18.18 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | — | 24.24 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.70 | 17.44 | 🟢 |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.66 | 11.49 | 🟡 |
| Motorizados - INTER | — | — | — | — | — | 15.38 |  |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.68 | — | 🔴 |

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
| 2026-09-28 | $194,255 | 426 | $456 | $5,065 | 11.11 | $658,266 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
