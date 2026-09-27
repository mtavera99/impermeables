# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 16:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$159,939** |
| gastado hoy (hasta las 16h) | $100,425 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $151,730 |
| saldo proyectado a medianoche | $108,634 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $83,985 | 83 | **$1,012** | $4,992 | 4.93 |
| 2026-09-24 | $126,279 | 134 | **$942** | $4,158 | 4.41 |
| 2026-09-25 | $93,780 | 113 | **$830** | $4,823 | 5.81 |
| 2026-09-26 | $78,575 | 107 | **$734** | $5,815 | 7.92 |
| 2026-09-27 **HOY** | $100,425 | 135 | **$744** | $4,690 | 6.31 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($744 vs $734).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   744  =  $ 4,690  ÷  6.31
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,690 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 6.31 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $32,737 | 82% | 44 | $744 | 4.74 |
| TEST Creativos - API | $40,000 | $25,355 | 63% | 26 | $975 | 8.97 |
| Domiciliarios - API | $35,000 | $18,077 | 52% | 22 | $822 | 5.65 |
| Motorizados - API | $20,000 | $14,664 | 73% | 26 | $564 | 7.85 |
| Domiciliarios VIDEO - API | $20,000 | $9,592 | 48% | 17 | $564 | 8.37 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $100,425 | 135 | **$744** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,856**/pedido |
| utilidad estimada de lo que va del día | **$169,740** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $643 | $744 | 🔴 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $831 | $975 | 🔴 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $992 | $822 | 🟢 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $465 | $564 | 🔴 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $701 | $564 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.56 | 4.74 | 🔴 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.93 | 8.97 | 🟡 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.71 | 5.65 | 🟡 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.39 | 7.85 | 🔴 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.30 | 8.37 | 🟢 |

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
| 2026-09-26 | $134,461 | 186 | $723 | $5,408 | 7.48 | $237,766 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
