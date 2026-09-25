# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 03:06 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$184,397** |
| gastado hoy (hasta las 3h) | $1,998 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $157,233 |
| saldo proyectado a medianoche | $29,162 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $55,255 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $1,330 | 3 | **$443** | $4,700 | 10.60 |
| 2026-09-22 | $2,485 | 4 | **$621** | $4,233 | 6.81 |
| 2026-09-23 | $3,031 | 2 | **$1,516** | $4,431 | 2.92 |
| 2026-09-24 | $4,021 | 8 | **$503** | $5,736 | 11.41 |
| 2026-09-25 **HOY** | $1,998 | 4 | **$500** | $5,946 | 11.90 |

🟢 **Hoy va mejor que ayer a la misma hora** ($500 vs $503).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   500  =  $ 5,946  ÷  11.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,946 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 11.90 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $956 | 2% | 3 | $319 | 37.50 |
| Motorizados - API | $20,000 | $407 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $346 | 1% | 1 | $346 | 10.53 |
| Domiciliarios - API | $35,000 | $225 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $64 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $1,998 | 4 | **$500** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,946**/pedido |
| utilidad estimada de lo que va del día | **$6,007** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | $1,086 | $735 | $745 | $319 | 🟢 |
| Motorizados - API | — | — | $1,265 | $745 | $695 | — | 🟢 |
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,131 | $346 | 🟢 |
| Domiciliarios - API | — | — | $942 | $889 | $1,098 | — | 🔴 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $677 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.22 | 37.50 | 🟢 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.42 | — | 🟡 |
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.83 | 10.53 | 🟢 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.07 | — | 🔴 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.91 | — | 🟢 |

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
| 2026-09-24 | $175,612 | 202 | $869 | $4,348 | 5.00 | $228,635 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
