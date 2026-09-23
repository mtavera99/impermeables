# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-23 07:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$78,410** |
| gastado hoy (hasta las 7h) | $26,309 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $173,994 |
| saldo proyectado a medianoche | $-69,275 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $136,931 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-19 | $13,577 | 10 | **$1,358** | $5,008 | 3.69 |
| 2026-09-20 | $27,546 | 29 | **$950** | $4,397 | 4.63 |
| 2026-09-21 | $23,227 | 19 | **$1,222** | $5,249 | 4.29 |
| 2026-09-22 | $28,767 | 27 | **$1,065** | $3,400 | 3.19 |
| 2026-09-23 **HOY** | $26,309 | 23 | **$1,144** | $4,245 | 3.71 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($1,144 vs $1,065).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,144  =  $ 4,245  ÷  3.71
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,245 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.71 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $9,324 | 23% | 9 | $1,036 | 7.85 |
| Domiciliarios - Expancion - API | $40,000 | $6,381 | 16% | 3 | $2,127 | 1.36 |
| Domiciliarios - API | $35,000 | $4,874 | 14% | 6 | $812 | 4.32 |
| Domiciliarios VIDEO - API | $20,000 | $3,248 | 16% | 1 | $3,248 | 1.53 |
| Motorizados - API | $20,000 | $2,482 | 12% | 4 | $620 | 4.91 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $26,309 | 23 | **$1,144** | $2,402 | **48%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,617**/pedido |
| utilidad estimada de lo que va del día | **$19,719** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | $1,080 | $1,036 | 🟡 |
| Domiciliarios - Expancion - API | — | — | — | — | $1,098 | $2,127 | 🔴 |
| Domiciliarios - API | — | — | — | — | $940 | $812 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | $970 | $3,248 | 🔴 |
| Motorizados - API | — | — | — | — | $1,257 | $620 | 🟢 |
| Motorizados | $1,848 | $924 | $634 | $1,071 | — | — | 🔴 |
| Domiciliarios | $1,185 | $1,639 | $1,738 | $878 | — | — | 🟢 |
| TEST Creativos | $760 | $987 | $730 | $711 | — | — | 🟡 |
| Domiciliarios VIDEO | $1,062 | $899 | $1,148 | $1,527 | — | — | 🔴 |
| Publico ABIERTO video | $2,224 | $2,550 | $1,111 | $4,298 | — | — | 🔴 |
| Domiciliarios - Expancion | $866 | $841 | $1,223 | $1,017 | — | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | 8.47 | 7.85 | 🟡 |
| Domiciliarios - Expancion - API | — | — | — | — | 3.44 | 1.36 | 🔴 |
| Domiciliarios - API | — | — | — | — | 4.25 | 4.32 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | — | 5.12 | 1.53 | 🔴 |
| Motorizados - API | — | — | — | — | 3.18 | 4.91 | 🟢 |
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
| 2026-09-22 | $179,077 | 175 | $1,023 | $4,762 | 4.65 | $171,137 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
