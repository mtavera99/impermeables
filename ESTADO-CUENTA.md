# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 17:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$139,240** |
| gastado hoy (hasta las 17h) | $120,317 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $163,187 |
| saldo proyectado a medianoche | $96,370 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $90,235 | 92 | **$981** | $5,026 | 5.12 |
| 2026-09-24 | $134,173 | 141 | **$952** | $4,169 | 4.38 |
| 2026-09-25 | $100,150 | 119 | **$842** | $4,860 | 5.77 |
| 2026-09-26 | $89,081 | 115 | **$775** | $5,733 | 7.40 |
| 2026-09-27 **HOY** | $120,317 | 161 | **$747** | $4,482 | 6.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($747 vs $775).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   747  =  $ 4,482  ÷  6.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,482 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 6.00 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $38,558 | 96% | 56 | $689 | 4.94 |
| TEST Creativos - API | $40,000 | $31,013 | 78% | 32 | $969 | 8.66 |
| Domiciliarios - API | $35,000 | $21,461 | 61% | 22 | $976 | 4.50 |
| Motorizados - API | $20,000 | $17,693 | 88% | 31 | $571 | 7.29 |
| Domiciliarios VIDEO - API | $20,000 | $11,592 | 58% | 20 | $580 | 7.44 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $120,317 | 161 | **$747** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,897**/pedido |
| utilidad estimada de lo que va del día | **$201,880** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $643 | $689 | 🟡 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $831 | $969 | 🔴 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $992 | $976 | 🟡 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $465 | $571 | 🔴 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $701 | $580 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.56 | 4.94 | 🔴 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.92 | 8.66 | 🟡 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.71 | 4.50 | 🔴 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.39 | 7.29 | 🔴 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.30 | 7.44 | 🟡 |

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
