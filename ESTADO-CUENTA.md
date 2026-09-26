# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 16:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$76,040** |
| gastado hoy (hasta las 16h) | $68,624 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $117,486 |
| saldo proyectado a medianoche | $27,178 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $96,986 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $111,826 | 104 | **$1,075** | $4,390 | 4.08 |
| 2026-09-23 | $83,985 | 83 | **$1,012** | $4,992 | 4.93 |
| 2026-09-24 | $126,279 | 134 | **$942** | $4,158 | 4.41 |
| 2026-09-25 | $93,780 | 113 | **$830** | $4,823 | 5.81 |
| 2026-09-26 **HOY** | $68,624 | 97 | **$707** | $5,863 | 8.29 |

🟢 **Hoy va mejor que ayer a la misma hora** ($707 vs $830).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   707  =  $ 5,863  ÷  8.29
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,863 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.29 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $17,991 | 45% | 29 | $620 | 7.32 |
| TEST Creativos - API | $40,000 | $17,149 | 43% | 18 | $953 | 9.38 |
| Domiciliarios - API | $35,000 | $16,393 | 47% | 17 | $964 | 6.24 |
| Motorizados - API | $20,000 | $8,900 | 44% | 22 | $405 | 12.93 |
| Domiciliarios VIDEO - API | $20,000 | $8,191 | 41% | 11 | $745 | 7.86 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $68,624 | 97 | **$707** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,422**/pedido |
| utilidad estimada de lo que va del día | **$125,495** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $733 | $620 | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $953 | 🔴 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,005 | $964 | 🟡 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $405 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $696 | $745 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.38 | 7.32 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 9.38 | 🟡 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.47 | 6.24 | 🟢 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.41 | 12.93 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.86 | 7.86 | 🟢 |

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
| 2026-09-25 | $140,370 | 179 | $784 | $5,071 | 6.47 | $217,849 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
