# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 12:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$121,809** |
| gastado hoy (hasta las 11h) | $61,673 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $128,188 |
| saldo proyectado a medianoche | $55,294 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $58,168 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $46,079 | 43 | **$1,072** | $4,851 | 4.53 |
| 2026-09-19 | $44,960 | 40 | **$1,124** | $4,491 | 4.00 |
| 2026-09-20 | $59,655 | 47 | **$1,269** | $4,701 | 3.70 |
| 2026-09-21 | $98,720 | 75 | **$1,316** | $4,291 | 3.26 |
| 2026-09-22 **HOY** | $61,890 | 59 | **$1,049** | $3,754 | 3.58 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,049 vs $1,316).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,049  =  $ 3,754  ÷  3.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,754 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.58 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $15,583 | 39% | 8 | $1,948 | 1.70 |
| Domiciliarios - API | $35,000 | $15,569 | 44% | 19 | $819 | 3.91 |
| TEST Creativos - API | $40,000 | $12,971 | 32% | 11 | $1,179 | 5.80 |
| Domiciliarios VIDEO - API | $20,000 | $9,607 | 48% | 11 | $873 | 4.67 |
| Motorizados - API | $20,000 | $8,173 | 41% | 8 | $1,022 | 2.99 |
| Domiciliarios | $0 | $0 | — | 1 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |
| Publico ABIERTO video | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $61,903 | 59 | **$1,049** | $2,402 | **44%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,491**/pedido |
| utilidad estimada de lo que va del día | **$56,169** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | $1,948 |  |
| Domiciliarios - API | — | — | — | — | — | $819 |  |
| TEST Creativos - API | — | — | — | — | — | $1,179 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $873 |  |
| Motorizados - API | — | — | — | — | — | $1,022 |  |
| Motorizados | $1,438 | $1,848 | $924 | $633 | $1,064 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $876 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $710 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,525 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,015 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | 1.70 |  |
| Domiciliarios - API | — | — | — | — | — | 3.91 |  |
| TEST Creativos - API | — | — | — | — | — | 5.80 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 4.67 |  |
| Motorizados - API | — | — | — | — | — | 2.99 |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.47 | 3.95 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.64 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 9.98 | — | 🟡 |
| Domiciliarios VIDEO | 3.68 | 4.22 | 4.23 | 3.76 | 2.31 | — | 🔴 |
| Publico ABIERTO video | 6.53 | 4.62 | 3.76 | 8.70 | 2.92 | — | 🔴 |
| Domiciliarios - Expancion | 2.48 | 5.30 | 4.58 | 3.59 | 3.99 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,951 | 110 | $1,100 | $4,937 | 4.49 | $99,183 |
| 2026-09-21 | $160,666 | 146 | $1,100 | $3,927 | 3.57 | $131,513 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
