# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 08:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$147,791** |
| gastado hoy (hasta las 8h) | $36,718 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $146,908 |
| saldo proyectado a medianoche | $37,601 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,141 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $31,345 | 30 | **$1,045** | $5,288 | 5.06 |
| 2026-09-22 | $37,216 | 37 | **$1,006** | $3,531 | 3.51 |
| 2026-09-23 | $40,010 | 31 | **$1,291** | $4,424 | 3.43 |
| 2026-09-24 | $58,063 | 49 | **$1,185** | $4,085 | 3.45 |
| 2026-09-25 **HOY** | $36,718 | 47 | **$781** | $4,547 | 5.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($781 vs $1,185).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   781  =  $ 4,547  ÷  5.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,547 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.82 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $11,571 | 29% | 18 | $643 | 9.45 |
| Domiciliarios - Expancion - API | $40,000 | $9,882 | 25% | 12 | $824 | 4.40 |
| Domiciliarios - API | $35,000 | $6,198 | 18% | 6 | $1,033 | 4.64 |
| Motorizados - API | $20,000 | $4,573 | 23% | 3 | $1,524 | 2.71 |
| Domiciliarios VIDEO - API | $20,000 | $4,494 | 22% | 8 | $562 | 7.67 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $36,718 | 47 | **$781** | $2,402 | **33%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,300**/pedido |
| utilidad estimada de lo que va del día | **$57,339** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | $1,086 | $735 | $750 | $643 | 🟢 |
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,137 | $824 | 🟢 |
| Domiciliarios - API | — | — | $942 | $889 | $1,104 | $1,033 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $698 | $1,524 | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $680 | $562 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.13 | 9.45 | 🟡 |
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.82 | 4.40 | 🟢 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.06 | 4.64 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.41 | 2.71 | 🔴 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.88 | 7.67 | 🟢 |

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
| 2026-09-24 | $176,538 | 202 | $874 | $4,350 | 4.98 | $227,709 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
