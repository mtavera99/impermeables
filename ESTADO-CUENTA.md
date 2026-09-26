# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 14:31 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,459** |
| gastado hoy (hasta las 14h) | $56,462 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $117,510 |
| saldo proyectado a medianoche | $26,411 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $97,729 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $92,274 | 94 | **$982** | $4,085 | 4.16 |
| 2026-09-23 | $73,755 | 73 | **$1,010** | $4,909 | 4.86 |
| 2026-09-24 | $112,407 | 116 | **$969** | $4,069 | 4.20 |
| 2026-09-25 | $83,178 | 97 | **$858** | $4,692 | 5.47 |
| 2026-09-26 **HOY** | $56,462 | 82 | **$689** | $5,777 | 8.39 |

🟢 **Hoy va mejor que ayer a la misma hora** ($689 vs $858).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   689  =  $ 5,777  ÷  8.39
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,777 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.39 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,700 | 37% | 26 | $565 | 7.98 |
| TEST Creativos - API | $40,000 | $14,314 | 36% | 14 | $1,022 | 8.48 |
| Domiciliarios - API | $35,000 | $13,064 | 37% | 13 | $1,005 | 5.81 |
| Motorizados - API | $20,000 | $7,640 | 38% | 19 | $402 | 13.18 |
| Domiciliarios VIDEO - API | $20,000 | $6,744 | 34% | 10 | $674 | 8.44 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $56,462 | 82 | **$689** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,197**/pedido |
| utilidad estimada de lo que va del día | **$107,638** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $733 | $565 | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $1,022 | 🔴 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,004 | $1,005 | 🟡 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $402 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $695 | $674 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.39 | 7.98 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 8.48 | 🟡 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.47 | 5.81 | 🟢 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.41 | 13.18 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.87 | 8.44 | 🟢 |

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
| 2026-09-25 | $140,269 | 179 | $784 | $5,071 | 6.47 | $217,950 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
