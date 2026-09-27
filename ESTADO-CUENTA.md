# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 13:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$44,469** |
| gastado hoy (hasta las 12h) | $65,386 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,492 |
| saldo proyectado a medianoche | $-31,638 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $131,795 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $63,323 | 61 | **$1,038** | $4,738 | 4.56 |
| 2026-09-24 | $96,522 | 94 | **$1,027** | $4,090 | 3.98 |
| 2026-09-25 | $71,698 | 86 | **$834** | $4,673 | 5.60 |
| 2026-09-26 | $50,890 | 71 | **$717** | $5,646 | 7.88 |
| 2026-09-27 **HOY** | $65,386 | 94 | **$696** | $5,393 | 7.75 |

🟢 **Hoy va mejor que ayer a la misma hora** ($696 vs $717).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   696  =  $ 5,393  ÷  7.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,393 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.75 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $18,828 | 47% | 27 | $697 | 5.49 |
| TEST Creativos - API | $40,000 | $18,138 | 45% | 21 | $864 | 11.33 |
| Domiciliarios - API | $35,000 | $12,201 | 35% | 15 | $813 | 6.69 |
| Motorizados - API | $20,000 | $9,113 | 46% | 18 | $506 | 10.07 |
| Domiciliarios VIDEO - API | $20,000 | $7,106 | 36% | 13 | $547 | 9.81 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $65,386 | 94 | **$696** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,281**/pedido |
| utilidad estimada de lo que va del día | **$122,729** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $642 | $697 | 🟡 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $831 | $864 | 🟡 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $990 | $813 | 🟢 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $465 | $506 | 🟡 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $700 | $547 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.57 | 5.49 | 🔴 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.94 | 11.33 | 🟢 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.72 | 6.69 | 🟢 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.40 | 10.07 | 🟡 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.32 | 9.81 | 🟢 |

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
| 2026-09-26 | $134,298 | 186 | $722 | $5,409 | 7.49 | $237,929 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
