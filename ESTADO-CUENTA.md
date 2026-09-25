# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 07:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$156,891** |
| gastado hoy (hasta las 7h) | $28,498 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $149,062 |
| saldo proyectado a medianoche | $36,328 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,261 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $23,227 | 19 | **$1,222** | $5,249 | 4.29 |
| 2026-09-22 | $28,774 | 27 | **$1,066** | $3,400 | 3.19 |
| 2026-09-23 | $31,907 | 26 | **$1,227** | $4,340 | 3.54 |
| 2026-09-24 | $45,216 | 35 | **$1,292** | $4,277 | 3.31 |
| 2026-09-25 **HOY** | $28,498 | 32 | **$891** | $4,530 | 5.09 |

🟢 **Hoy va mejor que ayer a la misma hora** ($891 vs $1,292).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   891  =  $ 4,530  ÷  5.09
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,530 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.09 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $9,656 | 24% | 13 | $743 | 8.10 |
| Domiciliarios - Expancion - API | $40,000 | $7,467 | 19% | 9 | $830 | 4.40 |
| Domiciliarios - API | $35,000 | $4,454 | 13% | 3 | $1,485 | 3.08 |
| Domiciliarios VIDEO - API | $20,000 | $3,538 | 18% | 5 | $708 | 5.99 |
| Motorizados - API | $20,000 | $3,383 | 17% | 2 | $1,692 | 2.40 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $28,498 | 32 | **$891** | $2,402 | **37%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$10,602**/pedido |
| utilidad estimada de lo que va del día | **$35,541** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | $1,086 | $735 | $749 | $743 | 🟡 |
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,136 | $830 | 🟢 |
| Domiciliarios - API | — | — | $942 | $889 | $1,103 | $1,485 | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $679 | $708 | 🟡 |
| Motorizados - API | — | — | $1,265 | $745 | $697 | $1,692 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.15 | 8.10 | 🔴 |
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.82 | 4.40 | 🟢 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.06 | 3.08 | 🔴 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.88 | 5.99 | 🟡 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.41 | 2.40 | 🔴 |

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
| 2026-09-24 | $176,335 | 202 | $873 | $4,349 | 4.98 | $227,912 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
