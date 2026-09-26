# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 17:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$66,819** |
| gastado hoy (hasta las 17h) | $76,923 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $118,665 |
| saldo proyectado a medianoche | $25,077 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $97,908 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $123,769 | 113 | **$1,095** | $4,539 | 4.14 |
| 2026-09-23 | $90,235 | 92 | **$981** | $5,026 | 5.12 |
| 2026-09-24 | $134,173 | 141 | **$952** | $4,169 | 4.38 |
| 2026-09-25 | $100,150 | 119 | **$842** | $4,860 | 5.77 |
| 2026-09-26 **HOY** | $77,209 | 107 | **$722** | $5,801 | 8.04 |

🟢 **Hoy va mejor que ayer a la misma hora** ($722 vs $842).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   722  =  $ 5,801  ÷  8.04
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,801 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.04 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $20,439 | 51% | 33 | $619 | 7.26 |
| Domiciliarios - API | $35,000 | $19,079 | 55% | 18 | $1,060 | 5.66 |
| TEST Creativos - API | $40,000 | $18,326 | 46% | 21 | $873 | 10.06 |
| Motorizados - API | $20,000 | $9,898 | 49% | 23 | $430 | 12.20 |
| Domiciliarios VIDEO - API | $20,000 | $9,511 | 48% | 12 | $793 | 7.43 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $77,253 | 107 | **$722** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,595**/pedido |
| utilidad estimada de lo que va del día | **$136,878** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $733 | $619 | 🟢 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,005 | $1,060 | 🟡 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $874 | 🟡 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $430 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $697 | $793 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.38 | 7.26 | 🟢 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.47 | 5.66 | 🟡 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 10.04 | 🟢 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.41 | 12.20 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.85 | 7.43 | 🟢 |

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
| 2026-09-25 | $140,396 | 179 | $784 | $5,070 | 6.46 | $217,823 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
