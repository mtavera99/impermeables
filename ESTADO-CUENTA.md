# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 05:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$134,703** |
| gastado hoy (hasta las 5h) | $13,300 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $177,958 |
| saldo proyectado a medianoche | $-29,954 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $208,047 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–5:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $12,060 | 10 | **$1,206** | $5,432 | 4.50 |
| 2026-09-26 | $6,133 | 12 | **$511** | $6,001 | 11.74 |
| 2026-09-27 | $4,484 | 14 | **$320** | $5,892 | 18.40 |
| 2026-09-28 | $57,878 | 49 | **$1,181** | $5,011 | 4.24 |
| 2026-09-29 **HOY** | $13,300 | 30 | **$443** | $5,329 | 12.02 |

🟢 **Hoy va mejor que ayer a la misma hora** ($443 vs $1,181).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   443  =  $ 5,329  ÷  12.02
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,329 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 12.02 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $20,000 | $3,337 | 17% | 7 | $477 | 11.95 |
| Domiciliarios INTER - API | $20,000 | $1,942 | 10% | 4 | $486 | 10.05 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,712 | 9% | 7 | $245 | 25.83 |
| Motorizados - INTER | $20,000 | $1,620 | 8% | 3 | $540 | 11.49 |
| TEST Creativos - API | $40,000 | $1,382 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $1,326 | 3% | 5 | $265 | 17.01 |
| Motorizados - API | $20,000 | $1,108 | 6% | 3 | $369 | 11.03 |
| Domiciliarios - API | $35,000 | $796 | 2% | 1 | $796 | 5.05 |
| Domiciliarios VIDEO - API | $20,000 | $77 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $13,300 | 30 | **$443** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,278**/pedido |
| utilidad estimada de lo que va del día | **$46,737** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $477 |  |
| Domiciliarios INTER - API | — | — | — | — | — | $486 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $245 |  |
| Motorizados - INTER | — | — | — | — | — | $540 |  |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $585 | — | 🟢 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $406 | $265 | 🟢 |
| Motorizados - API | $701 | $675 | $465 | $522 | $309 | $369 | 🔴 |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $431 | $796 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $879 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 11.95 |  |
| Domiciliarios INTER - API | — | — | — | — | — | 10.05 |  |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 25.83 |  |
| Motorizados - INTER | — | — | — | — | — | 11.49 |  |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.27 | — | 🟢 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.47 | 17.01 | 🟢 |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.69 | 11.03 | 🔴 |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.65 | 5.05 | 🔴 |
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
| 2026-09-28 | $194,375 | 426 | $456 | $5,064 | 11.10 | $658,146 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
