# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 17:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$91,498** |
| gastado hoy (hasta las 17h) | $93,658 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $140,956 |
| saldo proyectado a medianoche | $44,200 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,494 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $118,739 | 103 | **$1,153** | $4,327 | 3.75 |
| 2026-09-22 | $123,769 | 113 | **$1,095** | $4,539 | 4.14 |
| 2026-09-23 | $90,235 | 92 | **$981** | $5,026 | 5.12 |
| 2026-09-24 | $134,173 | 141 | **$952** | $4,169 | 4.38 |
| 2026-09-25 **HOY** | $93,658 | 116 | **$807** | $4,832 | 5.99 |

🟢 **Hoy va mejor que ayer a la misma hora** ($807 vs $952).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   807  =  $ 4,832  ÷  5.99
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,832 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.99 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $27,342 | 68% | 33 | $829 | 4.56 |
| TEST Creativos - API | $40,000 | $23,469 | 59% | 30 | $782 | 8.92 |
| Domiciliarios - API | $35,000 | $19,376 | 55% | 18 | $1,076 | 4.84 |
| Motorizados - API | $20,000 | $12,781 | 64% | 18 | $710 | 6.83 |
| Domiciliarios VIDEO - API | $20,000 | $10,690 | 53% | 17 | $629 | 7.01 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $93,658 | 116 | **$807** | $2,402 | **34%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,612**/pedido |
| utilidad estimada de lo que va del día | **$138,484** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,139 | $829 | 🟢 |
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $782 | 🟡 |
| Domiciliarios - API | — | — | $942 | $889 | $1,108 | $1,076 | 🟡 |
| Motorizados - API | — | — | $1,265 | $745 | $701 | $710 | 🟡 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $629 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.81 | 4.56 | 🟢 |
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.09 | 8.92 | 🟡 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.04 | 4.84 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.39 | 6.83 | 🟢 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.86 | 7.01 | 🟡 |

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
| 2026-09-24 | $177,089 | 202 | $877 | $4,351 | 4.96 | $227,158 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
