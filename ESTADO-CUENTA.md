# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 09:09 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$79,078** |
| gastado hoy (hasta las 9h) | $83,625 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $215,604 |
| saldo proyectado a medianoche | $-52,902 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $78,947 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $69,603 | 64 | **$1,088** | $4,073 | 3.75 |
| 2026-09-25 | $50,319 | 53 | **$949** | $4,726 | 4.98 |
| 2026-09-26 | $29,379 | 44 | **$668** | $5,522 | 8.27 |
| 2026-09-27 | $37,549 | 55 | **$683** | $5,660 | 8.29 |
| 2026-09-28 **HOY** | $83,625 | 120 | **$697** | $4,987 | 7.16 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($697 vs $683).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   697  =  $ 4,987  ÷  7.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,987 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.16 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $21,145 | 60% | 20 | $1,057 | 5.91 |
| Domiciliarios - Expancion - API | $40,000 | $18,446 | 46% | 37 | $499 | 7.02 |
| TEST Creativos - API | $40,000 | $18,243 | 46% | 28 | $652 | 9.21 |
| Domiciliarios VIDEO - API | $20,000 | $16,171 | 81% | 7 | $2,310 | 2.70 |
| Motorizados - API | $20,000 | $9,620 | 48% | 28 | $344 | 11.31 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $83,625 | 120 | **$697** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,296**/pedido |
| utilidad estimada de lo que va del día | **$156,522** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $673 | $1,057 | 🔴 |
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $645 | $499 | 🟢 |
| TEST Creativos - API | $735 | $757 | $820 | $831 | $858 | $652 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $494 | $2,310 | 🔴 |
| Motorizados - API | $745 | $701 | $675 | $465 | $518 | $344 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.39 | 5.91 | 🟡 |
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.29 | 7.02 | 🟢 |
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 8.95 | 9.21 | 🟡 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.51 | 2.70 | 🔴 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.80 | 11.31 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $196,409 | 302 | $650 | $4,445 | 6.83 | $407,960 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
