# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 18:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$123,234** |
| gastado hoy (hasta las 18h) | $135,882 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $168,053 |
| saldo proyectado a medianoche | $91,063 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $99,342 | 102 | **$974** | $5,099 | 5.24 |
| 2026-09-24 | $145,524 | 161 | **$904** | $4,208 | 4.66 |
| 2026-09-25 | $109,130 | 134 | **$814** | $4,902 | 6.02 |
| 2026-09-26 | $101,499 | 133 | **$763** | $5,503 | 7.21 |
| 2026-09-27 **HOY** | $135,882 | 184 | **$738** | $4,434 | 6.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($738 vs $763).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   738  =  $ 4,434  ÷  6.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,434 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 6.00 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $42,411 | 106% | 64 | $663 | 5.10 |
| TEST Creativos - API | $40,000 | $35,997 | 90% | 36 | $1,000 | 8.16 |
| Domiciliarios - API | $35,000 | $24,241 | 69% | 24 | $1,010 | 4.32 |
| Motorizados - API | $20,000 | $19,969 | 100% | 35 | $571 | 7.16 |
| Domiciliarios VIDEO - API | $20,000 | $13,264 | 66% | 25 | $531 | 7.70 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $135,882 | 184 | **$738** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,792**/pedido |
| utilidad estimada de lo que va del día | **$232,343** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $643 | $663 | 🟡 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $831 | $1,000 | 🔴 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $992 | $1,010 | 🟡 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $465 | $571 | 🔴 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $701 | $531 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.56 | 5.10 | 🔴 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.92 | 8.16 | 🔴 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.71 | 4.32 | 🔴 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.39 | 7.16 | 🔴 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.30 | 7.70 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,468 | 186 | $723 | $5,407 | 7.48 | $237,759 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
