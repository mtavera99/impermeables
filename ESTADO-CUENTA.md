# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 16:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$97,415** |
| gastado hoy (hasta las 16h) | $87,580 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,946 |
| saldo proyectado a medianoche | $43,048 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,655 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $113,639 | 96 | **$1,184** | $4,328 | 3.66 |
| 2026-09-22 | $111,826 | 104 | **$1,075** | $4,390 | 4.08 |
| 2026-09-23 | $83,985 | 83 | **$1,012** | $4,992 | 4.93 |
| 2026-09-24 | $126,279 | 134 | **$942** | $4,158 | 4.41 |
| 2026-09-25 **HOY** | $87,664 | 110 | **$797** | $4,781 | 6.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($797 vs $942).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   797  =  $ 4,781  ÷  6.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,781 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 6.00 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $25,383 | 63% | 30 | $846 | 4.38 |
| TEST Creativos - API | $40,000 | $22,139 | 55% | 30 | $738 | 9.34 |
| Domiciliarios - API | $35,000 | $18,258 | 52% | 18 | $1,014 | 5.12 |
| Motorizados - API | $20,000 | $11,808 | 59% | 16 | $738 | 6.53 |
| Domiciliarios VIDEO - API | $20,000 | $10,107 | 51% | 16 | $632 | 6.97 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $87,695 | 110 | **$797** | $2,402 | **33%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,491**/pedido |
| utilidad estimada de lo que va del día | **$132,439** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,139 | $846 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $739 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,108 | $1,014 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $701 | $740 | 🟡 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $632 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.81 | 4.38 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.09 | 9.33 | 🟡 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.04 | 5.12 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.39 | 6.50 | 🟢 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.86 | 6.97 | 🟡 |

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
| 2026-09-24 | $177,082 | 202 | $877 | $4,351 | 4.96 | $227,165 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
