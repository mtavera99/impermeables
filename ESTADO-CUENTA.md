# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 14:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$109,482** |
| gastado hoy (hasta las 14h) | $75,519 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,917 |
| saldo proyectado a medianoche | $43,084 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,649 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $108,072 | 91 | **$1,188** | $4,288 | 3.61 |
| 2026-09-22 | $92,274 | 94 | **$982** | $4,085 | 4.16 |
| 2026-09-23 | $73,755 | 73 | **$1,010** | $4,909 | 4.86 |
| 2026-09-24 | $112,407 | 116 | **$969** | $4,069 | 4.20 |
| 2026-09-25 **HOY** | $75,590 | 91 | **$831** | $4,682 | 5.64 |

🟢 **Hoy va mejor que ayer a la misma hora** ($831 vs $969).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   831  =  $ 4,682  ÷  5.64
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,682 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.64 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $21,458 | 54% | 26 | $825 | 4.33 |
| TEST Creativos - API | $40,000 | $19,904 | 50% | 25 | $796 | 8.53 |
| Domiciliarios - API | $35,000 | $15,117 | 43% | 15 | $1,008 | 4.93 |
| Motorizados - API | $20,000 | $10,304 | 52% | 12 | $859 | 5.60 |
| Domiciliarios VIDEO - API | $20,000 | $8,813 | 44% | 13 | $678 | 6.43 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $75,596 | 91 | **$831** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,890**/pedido |
| utilidad estimada de lo que va del día | **$106,515** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,139 | $825 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $797 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,108 | $1,008 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $700 | $861 | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $678 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.81 | 4.33 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.09 | 8.51 | 🔴 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.04 | 4.93 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.39 | 5.59 | 🟡 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.86 | 6.43 | 🟡 |

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
| 2026-09-24 | $177,043 | 202 | $876 | $4,352 | 4.97 | $227,204 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
