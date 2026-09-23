# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-23 06:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,577** |
| gastado hoy (hasta las 6h) | $16,989 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $172,506 |
| saldo proyectado a medianoche | $-67,940 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $137,084 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-19 | $6,385 | 5 | **$1,277** | $5,490 | 4.30 |
| 2026-09-20 | $20,967 | 16 | **$1,310** | $4,211 | 3.21 |
| 2026-09-21 | $15,021 | 12 | **$1,252** | $5,417 | 4.33 |
| 2026-09-22 | $21,404 | 21 | **$1,019** | $3,211 | 3.15 |
| 2026-09-23 **HOY** | $17,425 | 16 | **$1,089** | $4,322 | 3.97 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($1,089 vs $1,019).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,089  =  $ 4,322  ÷  3.97
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,322 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.97 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $6,446 | 16% | 7 | $921 | 8.70 |
| Domiciliarios - Expancion - API | $40,000 | $4,191 | 10% | 2 | $2,096 | 1.45 |
| Domiciliarios - API | $35,000 | $2,746 | 8% | 2 | $1,373 | 2.31 |
| Domiciliarios VIDEO - API | $20,000 | $2,141 | 11% | 1 | $2,141 | 2.37 |
| Motorizados - API | $20,000 | $1,616 | 8% | 4 | $404 | 7.53 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,140 | 16 | **$1,071** | $2,402 | **45%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,753**/pedido |
| utilidad estimada de lo que va del día | **$14,880** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | $1,080 | $921 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | $1,098 | $2,096 | 🔴 |
| Domiciliarios - API | — | — | — | — | $939 | $1,373 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | — | $968 | $2,141 | 🔴 |
| Motorizados - API | — | — | — | — | $1,245 | $404 | 🟢 |
| Motorizados | $1,848 | $924 | $634 | $1,071 | — | — | 🔴 |
| Domiciliarios | $1,185 | $1,639 | $1,738 | $878 | — | — | 🟢 |
| TEST Creativos | $760 | $987 | $730 | $711 | — | — | 🟡 |
| Domiciliarios VIDEO | $1,062 | $899 | $1,148 | $1,527 | — | — | 🔴 |
| Publico ABIERTO video | $2,224 | $2,550 | $1,111 | $4,298 | — | — | 🔴 |
| Domiciliarios - Expancion | $866 | $841 | $1,223 | $1,017 | — | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | 8.48 | 8.70 | 🟡 |
| Domiciliarios - Expancion - API | — | — | — | — | 3.44 | 1.45 | 🔴 |
| Domiciliarios - API | — | — | — | — | 4.25 | 2.31 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | — | 5.13 | 2.37 | 🔴 |
| Motorizados - API | — | — | — | — | 3.18 | 7.53 | 🟢 |
| Motorizados | 2.99 | 4.93 | 9.46 | 3.93 | — | — | 🔴 |
| Domiciliarios | 3.91 | 2.66 | 2.74 | 4.62 | — | — | 🟢 |
| TEST Creativos | 11.64 | 7.77 | 11.20 | 9.96 | — | — | 🟡 |
| Domiciliarios VIDEO | 4.22 | 4.23 | 3.76 | 2.30 | — | — | 🔴 |
| Publico ABIERTO video | 4.62 | 3.76 | 8.70 | 2.92 | — | — | 🔴 |
| Domiciliarios - Expancion | 5.30 | 4.58 | 3.59 | 3.98 | — | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $178,728 | 175 | $1,021 | $4,757 | 4.66 | $171,486 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
