# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 16:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$83,326** |
| gastado hoy (hasta las 16h) | $100,924 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $139,402 |
| saldo proyectado a medianoche | $44,848 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,400 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $70,084 | 66 | **$1,062** | $5,126 | 4.83 |
| 2026-09-19 | $71,226 | 62 | **$1,149** | $4,616 | 4.02 |
| 2026-09-20 | $95,732 | 73 | **$1,311** | $4,745 | 3.62 |
| 2026-09-21 | $113,631 | 96 | **$1,184** | $4,328 | 3.66 |
| 2026-09-22 **HOY** | $100,924 | 100 | **$1,009** | $4,229 | 4.19 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,009 vs $1,184).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,009  =  $ 4,229  ÷  4.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,229 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.19 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $26,114 | 65% | 21 | $1,244 | 2.84 |
| TEST Creativos - API | $40,000 | $25,211 | 63% | 23 | $1,096 | 7.41 |
| Domiciliarios - API | $35,000 | $22,615 | 65% | 24 | $942 | 3.69 |
| Domiciliarios VIDEO - API | $20,000 | $14,750 | 74% | 17 | $868 | 5.24 |
| Motorizados - API | $20,000 | $12,234 | 61% | 10 | $1,223 | 2.76 |
| Motorizados | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios | $0 | $0 | — | 3 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 1 | $0 | 0.00 |
| Publico ABIERTO video | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $100,924 | 100 | **$1,009** | $2,402 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,015**/pedido |
| utilidad estimada de lo que va del día | **$99,198** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | $1,244 |  |
| TEST Creativos - API | — | — | — | — | — | $1,096 |  |
| Domiciliarios - API | — | — | — | — | — | $942 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $868 |  |
| Motorizados - API | — | — | — | — | — | $1,223 |  |
| Motorizados | $1,438 | $1,848 | $924 | $634 | $1,070 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $877 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $711 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,526 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,015 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | 2.84 |  |
| TEST Creativos - API | — | — | — | — | — | 7.41 |  |
| Domiciliarios - API | — | — | — | — | — | 3.69 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 5.24 |  |
| Motorizados - API | — | — | — | — | — | 2.76 |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.46 | 3.94 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.62 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 9.96 | — | 🟡 |
| Domiciliarios VIDEO | 3.68 | 4.22 | 4.23 | 3.76 | 2.30 | — | 🔴 |
| Publico ABIERTO video | 6.53 | 4.62 | 3.76 | 8.70 | 2.92 | — | 🔴 |
| Domiciliarios - Expancion | 2.48 | 5.30 | 4.58 | 3.59 | 3.98 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,970 | 110 | $1,100 | $4,937 | 4.49 | $99,164 |
| 2026-09-21 | $160,879 | 146 | $1,102 | $3,926 | 3.56 | $131,300 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
