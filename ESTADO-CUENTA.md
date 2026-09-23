# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-23 11:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$52,275** |
| gastado hoy (hasta las 11h) | $52,071 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,770 |
| saldo proyectado a medianoche | $-37,424 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $137,304 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-19 | $44,960 | 40 | **$1,124** | $4,491 | 4.00 |
| 2026-09-20 | $59,655 | 47 | **$1,269** | $4,701 | 3.70 |
| 2026-09-21 | $98,737 | 75 | **$1,316** | $4,291 | 3.26 |
| 2026-09-22 | $66,362 | 60 | **$1,106** | $3,765 | 3.40 |
| 2026-09-23 **HOY** | $51,975 | 53 | **$981** | $4,577 | 4.67 |

🟢 **Hoy va mejor que ayer a la misma hora** ($981 vs $1,106).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   981  =  $ 4,577  ÷  4.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,577 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.67 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $16,997 | 42% | 20 | $850 | 10.16 |
| Domiciliarios - Expancion - API | $40,000 | $12,329 | 31% | 9 | $1,370 | 2.35 |
| Domiciliarios - API | $35,000 | $10,257 | 29% | 13 | $789 | 4.73 |
| Domiciliarios VIDEO - API | $20,000 | $6,688 | 33% | 3 | $2,229 | 2.45 |
| Motorizados - API | $20,000 | $5,800 | 29% | 8 | $725 | 4.94 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $52,071 | 53 | **$982** | $2,402 | **41%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,696**/pedido |
| utilidad estimada de lo que va del día | **$53,994** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | $1,082 | $850 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | $1,100 | $1,370 | 🔴 |
| Domiciliarios - API | — | — | — | — | $942 | $789 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | $971 | $2,229 | 🔴 |
| Motorizados - API | — | — | — | — | $1,264 | $725 | 🟢 |
| Motorizados | $1,848 | $924 | $634 | $1,071 | — | — | 🔴 |
| Domiciliarios | $1,185 | $1,639 | $1,738 | $878 | — | — | 🟢 |
| TEST Creativos | $760 | $987 | $730 | $711 | — | — | 🟡 |
| Domiciliarios VIDEO | $1,062 | $899 | $1,148 | $1,527 | — | — | 🔴 |
| Publico ABIERTO video | $2,224 | $2,550 | $1,111 | $4,298 | — | — | 🔴 |
| Domiciliarios - Expancion | $866 | $841 | $1,223 | $1,017 | — | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | 8.45 | 10.16 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | 3.43 | 2.35 | 🔴 |
| Domiciliarios - API | — | — | — | — | 4.24 | 4.73 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | 5.11 | 2.45 | 🔴 |
| Motorizados - API | — | — | — | — | 3.17 | 4.94 | 🟢 |
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
| 2026-09-22 | $179,455 | 175 | $1,025 | $4,762 | 4.64 | $170,759 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
