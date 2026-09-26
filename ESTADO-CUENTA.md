# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 12:30 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$100,358** |
| gastado hoy (hasta las 12h) | $44,454 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $119,158 |
| saldo proyectado a medianoche | $25,654 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $96,838 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $75,419 | 73 | **$1,033** | $3,876 | 3.75 |
| 2026-09-23 | $63,323 | 61 | **$1,038** | $4,738 | 4.56 |
| 2026-09-24 | $96,522 | 94 | **$1,027** | $4,090 | 3.98 |
| 2026-09-25 | $71,698 | 86 | **$834** | $4,673 | 5.60 |
| 2026-09-26 **HOY** | $44,372 | 63 | **$704** | $5,591 | 7.94 |

🟢 **Hoy va mejor que ayer a la misma hora** ($704 vs $834).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   704  =  $ 5,591  ÷  7.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,591 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.94 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $12,135 | 30% | 17 | $714 | 6.42 |
| TEST Creativos - API | $40,000 | $11,320 | 28% | 11 | $1,029 | 8.04 |
| Domiciliarios - API | $35,000 | $9,644 | 28% | 8 | $1,206 | 4.52 |
| Motorizados - API | $20,000 | $6,127 | 31% | 18 | $340 | 15.11 |
| Domiciliarios VIDEO - API | $20,000 | $5,228 | 26% | 8 | $654 | 8.25 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $44,454 | 62 | **$717** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,536**/pedido |
| utilidad estimada de lo que va del día | **$79,622** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $732 | $714 | 🟡 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $1,029 | 🔴 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,003 | $1,206 | 🔴 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $340 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $694 | $654 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.39 | 6.42 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 8.04 | 🟡 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.48 | 4.52 | 🔴 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.41 | 15.11 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.87 | 8.25 | 🟢 |

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
| 2026-09-25 | $140,216 | 179 | $783 | $5,071 | 6.47 | $218,003 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
