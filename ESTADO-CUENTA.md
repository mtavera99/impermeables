# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 19:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$74,392** |
| gastado hoy (hasta las 19h) | $110,558 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $136,074 |
| saldo proyectado a medianoche | $48,876 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,700 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $153,992 | 129 | **$1,194** | $3,971 | 3.33 |
| 2026-09-22 | $156,883 | 146 | **$1,075** | $4,690 | 4.36 |
| 2026-09-23 | $112,095 | 119 | **$942** | $5,102 | 5.42 |
| 2026-09-24 | $155,944 | 175 | **$891** | $4,237 | 4.75 |
| 2026-09-25 **HOY** | $110,558 | 135 | **$819** | $4,890 | 5.97 |

🟢 **Hoy va mejor que ayer a la misma hora** ($819 vs $891).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   819  =  $ 4,890  ÷  5.97
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,890 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.97 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $31,966 | 80% | 39 | $820 | 4.64 |
| TEST Creativos - API | $40,000 | $26,940 | 67% | 33 | $816 | 8.68 |
| Domiciliarios - API | $35,000 | $23,751 | 68% | 22 | $1,080 | 4.97 |
| Motorizados - API | $20,000 | $15,134 | 76% | 22 | $688 | 7.04 |
| Domiciliarios VIDEO - API | $20,000 | $12,767 | 64% | 19 | $672 | 6.68 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $110,558 | 135 | **$819** | $2,402 | **34%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,749**/pedido |
| utilidad estimada de lo que va del día | **$159,607** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,140 | $820 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $816 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,108 | $1,080 | 🟡 |
| Motorizados - API | — | — | $1,265 | $745 | $701 | $688 | 🟡 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $672 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.81 | 4.64 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.09 | 8.68 | 🟡 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.04 | 4.97 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.39 | 7.04 | 🟢 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.86 | 6.68 | 🟡 |

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
| 2026-09-24 | $177,155 | 202 | $877 | $4,351 | 4.96 | $227,092 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
