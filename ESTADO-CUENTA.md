# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 09:12 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$82,849** |
| gastado hoy (hasta las 9h) | $25,883 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $123,361 |
| saldo proyectado a medianoche | $-14,629 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $132,918 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $46,328 | 38 | **$1,219** | $4,479 | 3.67 |
| 2026-09-24 | $69,603 | 64 | **$1,088** | $4,073 | 3.75 |
| 2026-09-25 | $50,319 | 53 | **$949** | $4,726 | 4.98 |
| 2026-09-26 | $29,379 | 44 | **$668** | $5,522 | 8.27 |
| 2026-09-27 **HOY** | $25,931 | 36 | **$720** | $5,693 | 7.90 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($720 vs $668).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   720  =  $ 5,693  ÷  7.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,693 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.90 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $6,908 | 17% | 10 | $691 | 14.22 |
| Domiciliarios - Expancion - API | $40,000 | $6,860 | 17% | 10 | $686 | 5.82 |
| Domiciliarios - API | $35,000 | $4,929 | 14% | 3 | $1,643 | 3.57 |
| Motorizados - API | $20,000 | $3,695 | 18% | 6 | $616 | 9.15 |
| Domiciliarios VIDEO - API | $20,000 | $3,580 | 18% | 7 | $511 | 10.94 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $25,972 | 36 | **$721** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,589**/pedido |
| utilidad estimada de lo que va del día | **$46,072** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $831 | $691 | 🟢 |
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $642 | $686 | 🟡 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $989 | $1,643 | 🔴 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $464 | $616 | 🔴 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $699 | $511 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.95 | 14.22 | 🟢 |
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.59 | 5.82 | 🟡 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.73 | 3.57 | 🔴 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.42 | 9.15 | 🟡 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.34 | 10.94 | 🟢 |

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
| 2026-09-26 | $134,151 | 186 | $721 | $5,414 | 7.51 | $238,076 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
