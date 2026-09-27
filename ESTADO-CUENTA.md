# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 07:12 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$101,439** |
| gastado hoy (hasta las 7h) | $8,226 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $120,810 |
| saldo proyectado a medianoche | $-11,145 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $131,985 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $31,907 | 26 | **$1,227** | $4,340 | 3.54 |
| 2026-09-24 | $45,216 | 35 | **$1,292** | $4,277 | 3.31 |
| 2026-09-25 | $33,910 | 38 | **$892** | $4,638 | 5.20 |
| 2026-09-26 | $15,426 | 25 | **$617** | $5,743 | 9.31 |
| 2026-09-27 **HOY** | $8,226 | 19 | **$433** | $6,013 | 13.89 |

🟢 **Hoy va mejor que ayer a la misma hora** ($433 vs $617).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   433  =  $ 6,013  ÷  13.89
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $6,013 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 13.89 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $2,105 | 5% | 5 | $421 | 9.78 |
| Domiciliarios - API | $35,000 | $1,885 | 5% | 2 | $942 | 7.69 |
| TEST Creativos - API | $40,000 | $1,848 | 5% | 6 | $308 | 32.61 |
| Domiciliarios VIDEO - API | $20,000 | $1,235 | 6% | 6 | $206 | 29.85 |
| Motorizados - API | $20,000 | $1,153 | 6% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,226 | 19 | **$433** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,154**/pedido |
| utilidad estimada de lo que va del día | **$29,797** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $641 | $421 | 🟢 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $987 | $942 | 🟡 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $830 | $308 | 🟢 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $698 | $206 | 🟢 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $464 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.60 | 9.78 | 🟢 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.75 | 7.69 | 🟢 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 9.98 | 32.61 | 🟢 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.35 | 29.85 | 🟢 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.43 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,001 | 186 | $720 | $5,418 | 7.52 | $238,226 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
