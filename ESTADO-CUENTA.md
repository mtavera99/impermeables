# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 13:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$115,304** |
| gastado hoy (hasta las 13h) | $69,290 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,064 |
| saldo proyectado a medianoche | $43,530 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,056 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $105,645 | 86 | **$1,228** | $4,291 | 3.49 |
| 2026-09-22 | $84,500 | 86 | **$983** | $3,986 | 4.06 |
| 2026-09-23 | $69,006 | 69 | **$1,000** | $4,843 | 4.84 |
| 2026-09-24 | $106,360 | 109 | **$976** | $4,074 | 4.18 |
| 2026-09-25 **HOY** | $69,290 | 86 | **$806** | $4,686 | 5.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($806 vs $976).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   806  =  $ 4,686  ÷  5.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,686 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.82 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $19,619 | 49% | 24 | $817 | 4.38 |
| TEST Creativos - API | $40,000 | $18,743 | 47% | 23 | $815 | 8.25 |
| Domiciliarios - API | $35,000 | $13,449 | 38% | 15 | $897 | 5.53 |
| Motorizados - API | $20,000 | $9,536 | 48% | 12 | $795 | 6.09 |
| Domiciliarios VIDEO - API | $20,000 | $7,943 | 40% | 12 | $662 | 6.51 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $69,290 | 86 | **$806** | $2,402 | **34%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,592**/pedido |
| utilidad estimada de lo que va del día | **$102,815** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,138 | $817 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $815 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,107 | $897 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $700 | $795 | 🟡 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $662 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.82 | 4.38 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.10 | 8.25 | 🔴 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.05 | 5.53 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.40 | 6.09 | 🟢 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.87 | 6.51 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $176,999 | 202 | $876 | $4,353 | 4.97 | $227,248 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
