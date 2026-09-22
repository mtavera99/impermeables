# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 09:50 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$143,449** |
| gastado hoy (hasta las 9h) | $40,509 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,044 |
| saldo proyectado a medianoche | $42,914 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,692 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $38,326 | 36 | **$1,065** | $4,716 | 4.43 |
| 2026-09-19 | $29,497 | 26 | **$1,134** | $4,699 | 4.14 |
| 2026-09-20 | $48,753 | 43 | **$1,134** | $4,606 | 4.06 |
| 2026-09-21 | $44,234 | 38 | **$1,164** | $5,136 | 4.41 |
| 2026-09-22 **HOY** | $40,661 | 40 | **$1,017** | $3,590 | 3.53 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,017 vs $1,164).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,017  =  $ 3,590  ÷  3.53
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,590 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.53 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $11,328 | 32% | 15 | $755 | 3.82 |
| Domiciliarios - Expancion - API | $40,000 | $7,918 | 20% | 2 | $3,959 | 0.92 |
| TEST Creativos - API | $40,000 | $7,865 | 20% | 7 | $1,124 | 5.33 |
| Domiciliarios VIDEO - API | $20,000 | $7,630 | 38% | 10 | $763 | 5.32 |
| Motorizados - API | $20,000 | $5,768 | 29% | 4 | $1,442 | 2.00 |
| Domiciliarios | $0 | $0 | — | 1 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $40,509 | 40 | **$1,013** | $2,402 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,056**/pedido |
| utilidad estimada de lo que va del día | **$39,540** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | — | — | $755 |  |
| Domiciliarios - Expancion - API | — | — | — | — | — | $3,959 |  |
| TEST Creativos - API | — | — | — | — | — | $1,124 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $763 |  |
| Motorizados - API | — | — | — | — | — | $1,442 |  |
| Motorizados | $1,438 | $1,848 | $924 | $633 | $1,063 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $874 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $710 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,523 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,015 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | — | — | 3.82 |  |
| Domiciliarios - Expancion - API | — | — | — | — | — | 0.92 |  |
| TEST Creativos - API | — | — | — | — | — | 5.33 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 5.32 |  |
| Motorizados - API | — | — | — | — | — | 2.00 |  |
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
| 2026-09-21 | $160,515 | 146 | $1,099 | $3,928 | 3.57 | $131,664 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
