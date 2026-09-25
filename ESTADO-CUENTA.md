# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 15:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$104,305** |
| gastado hoy (hasta las 15h) | $80,715 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $142,106 |
| saldo proyectado a medianoche | $42,914 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,630 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $111,044 | 95 | **$1,169** | $4,313 | 3.69 |
| 2026-09-22 | $102,699 | 100 | **$1,027** | $4,243 | 4.13 |
| 2026-09-23 | $78,336 | 76 | **$1,031** | $4,940 | 4.79 |
| 2026-09-24 | $117,854 | 128 | **$921** | $4,087 | 4.44 |
| 2026-09-25 **HOY** | $80,715 | 97 | **$832** | $4,712 | 5.66 |

🟢 **Hoy va mejor que ayer a la misma hora** ($832 vs $921).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   832  =  $ 4,712  ÷  5.66
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,712 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.66 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $23,100 | 58% | 27 | $856 | 4.22 |
| TEST Creativos - API | $40,000 | $20,842 | 52% | 27 | $772 | 8.86 |
| Domiciliarios - API | $35,000 | $16,446 | 47% | 16 | $1,028 | 4.92 |
| Motorizados - API | $20,000 | $11,061 | 55% | 13 | $851 | 5.66 |
| Domiciliarios VIDEO - API | $20,000 | $9,266 | 46% | 14 | $662 | 6.55 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $80,715 | 97 | **$832** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,906**/pedido |
| utilidad estimada de lo que va del día | **$113,404** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,139 | $856 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $772 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,108 | $1,028 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $700 | $851 | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $662 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.81 | 4.22 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.09 | 8.86 | 🟡 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.04 | 4.92 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.39 | 5.66 | 🟡 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.86 | 6.55 | 🟡 |

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
| 2026-09-24 | $177,057 | 202 | $877 | $4,352 | 4.96 | $227,190 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
