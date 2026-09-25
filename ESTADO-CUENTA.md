# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 06:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$167,936** |
| gastado hoy (hasta las 6h) | $17,904 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $151,376 |
| saldo proyectado a medianoche | $34,464 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $55,810 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $15,021 | 12 | **$1,252** | $5,417 | 4.33 |
| 2026-09-22 | $21,404 | 21 | **$1,019** | $3,211 | 3.15 |
| 2026-09-23 | $22,072 | 18 | **$1,226** | $4,264 | 3.48 |
| 2026-09-24 | $29,100 | 31 | **$939** | $4,503 | 4.80 |
| 2026-09-25 **HOY** | $18,071 | 21 | **$861** | $4,753 | 5.52 |

🟢 **Hoy va mejor que ayer a la misma hora** ($861 vs $939).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   861  =  $ 4,753  ÷  5.52
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,753 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.52 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $6,437 | 16% | 10 | $644 | 9.83 |
| Domiciliarios - Expancion - API | $40,000 | $4,011 | 10% | 4 | $1,003 | 3.67 |
| Domiciliarios - API | $35,000 | $2,989 | 9% | 2 | $1,494 | 3.17 |
| Domiciliarios VIDEO - API | $20,000 | $2,261 | 11% | 4 | $565 | 7.74 |
| Motorizados - API | $20,000 | $2,220 | 11% | 1 | $2,220 | 2.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,918 | 21 | **$853** | $2,402 | **36%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$10,158**/pedido |
| utilidad estimada de lo que va del día | **$24,108** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | $1,086 | $735 | $749 | $644 | 🟢 |
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,134 | $1,003 | 🟢 |
| Domiciliarios - API | — | — | $942 | $889 | $1,102 | $1,494 | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $678 | $565 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $697 | $2,220 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.15 | 9.83 | 🟡 |
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.83 | 3.67 | 🟢 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.06 | 3.17 | 🔴 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.89 | 7.74 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.41 | 2.00 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,910 | 173 | $820 | $5,018 | 6.12 | $204,302 |
| 2026-09-24 | $176,211 | 202 | $872 | $4,350 | 4.99 | $228,036 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
