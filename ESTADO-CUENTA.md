# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 09:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$120,815** |
| gastado hoy (hasta las 9h) | $24,061 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $122,774 |
| saldo proyectado a medianoche | $22,102 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $96,774 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $48,132 | 47 | **$1,024** | $3,691 | 3.60 |
| 2026-09-23 | $46,328 | 38 | **$1,219** | $4,479 | 3.67 |
| 2026-09-24 | $69,603 | 64 | **$1,088** | $4,073 | 3.75 |
| 2026-09-25 | $50,319 | 53 | **$949** | $4,726 | 4.98 |
| 2026-09-26 **HOY** | $24,061 | 37 | **$650** | $5,554 | 8.54 |

🟢 **Hoy va mejor que ayer a la misma hora** ($650 vs $949).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   650  =  $ 5,554  ÷  8.54
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,554 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.54 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $6,830 | 17% | 12 | $569 | 8.07 |
| TEST Creativos - API | $40,000 | $6,192 | 15% | 6 | $1,032 | 8.11 |
| Domiciliarios - API | $35,000 | $4,084 | 12% | 3 | $1,361 | 3.92 |
| Motorizados - API | $20,000 | $3,690 | 18% | 10 | $369 | 14.43 |
| Domiciliarios VIDEO - API | $20,000 | $3,265 | 16% | 6 | $544 | 9.29 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $24,061 | 37 | **$650** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$7,742**/pedido |
| utilidad estimada de lo que va del día | **$49,984** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $730 | $569 | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $819 | $1,032 | 🔴 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,002 | $1,361 | 🔴 |
| Motorizados - API | — | $1,265 | $745 | $701 | $674 | $369 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $693 | $544 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.40 | 8.07 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 9.00 | 8.11 | 🟡 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.49 | 3.92 | 🔴 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.42 | 14.43 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.89 | 9.29 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $139,937 | 179 | $782 | $5,069 | 6.48 | $218,282 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
