# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 01:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$109,370** |
| gastado hoy (hasta las 1h) | $1,004 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $135,907 |
| saldo proyectado a medianoche | $-25,533 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $131,276 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $1,765 | 2 | **$882** | $4,889 | 5.54 |
| 2026-09-24 | $2,146 | 5 | **$429** | $5,738 | 13.37 |
| 2026-09-25 | $2,396 | 4 | **$599** | $8,713 | 14.55 |
| 2026-09-26 | $2,008 | 1 | **$2,008** | $5,906 | 2.94 |
| 2026-09-27 **HOY** | $1,004 | 2 | **$502** | $4,922 | 9.80 |

🟢 **Hoy va mejor que ayer a la misma hora** ($502 vs $2,008).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   502  =  $ 4,922  ÷  9.80
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,922 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.80 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $326 | 1% | 1 | $326 | 12.20 |
| TEST Creativos - API | $40,000 | $318 | 1% | 1 | $318 | 40.00 |
| Motorizados - API | $20,000 | $142 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $130 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $88 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $1,004 | 2 | **$502** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,976**/pedido |
| utilidad estimada de lo que va del día | **$2,998** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $640 | $326 | 🟢 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $829 | $318 | 🟢 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $463 | — | 🟢 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $984 | — | 🟡 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $697 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.62 | 12.20 | 🟢 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 10.01 | 40.00 | 🟢 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.45 | — | 🟢 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.77 | — | 🟢 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.37 | — | 🟢 |

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
| 2026-09-26 | $133,707 | 186 | $719 | $5,423 | 7.54 | $238,520 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
