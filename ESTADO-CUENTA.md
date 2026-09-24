# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 06:56 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$138,172** |
| gastado hoy (hasta las 6h) | $23,242 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $162,040 |
| saldo proyectado a medianoche | $-626 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $80,236 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $20,967 | 16 | **$1,310** | $4,211 | 3.21 |
| 2026-09-21 | $15,021 | 12 | **$1,252** | $5,417 | 4.33 |
| 2026-09-22 | $21,404 | 21 | **$1,019** | $3,211 | 3.15 |
| 2026-09-23 | $22,072 | 18 | **$1,226** | $4,264 | 3.48 |
| 2026-09-24 **HOY** | $23,242 | 27 | **$861** | $4,515 | 5.24 |

🟢 **Hoy va mejor que ayer a la misma hora** ($861 vs $1,226).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   861  =  $ 4,515  ÷  5.24
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,515 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.24 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $6,779 | 19% | 5 | $1,356 | 3.62 |
| Domiciliarios - Expancion - API | $40,000 | $5,341 | 13% | 5 | $1,068 | 3.03 |
| TEST Creativos - API | $40,000 | $4,979 | 12% | 6 | $830 | 9.45 |
| Motorizados - API | $20,000 | $3,452 | 17% | 6 | $575 | 7.05 |
| Domiciliarios VIDEO - API | $20,000 | $2,691 | 13% | 5 | $538 | 7.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $23,242 | 27 | **$861** | $2,402 | **36%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$10,248**/pedido |
| utilidad estimada de lo que va del día | **$30,791** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | $942 | $885 | $1,356 | 🔴 |
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $773 | $1,068 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $734 | $830 | 🟡 |
| Motorizados - API | — | — | — | $1,265 | $740 | $575 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,250 | $538 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | 4.24 | 4.88 | 3.62 | 🔴 |
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.69 | 3.03 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.13 | 9.45 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.39 | 7.05 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.39 | 7.92 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,267 | 173 | $817 | $5,026 | 6.15 | $204,945 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
