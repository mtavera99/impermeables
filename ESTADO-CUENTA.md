# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 19:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$38,219** |
| gastado hoy (hasta las 19h) | $105,351 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $126,553 |
| saldo proyectado a medianoche | $17,017 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $98,080 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $156,883 | 146 | **$1,075** | $4,690 | 4.36 |
| 2026-09-23 | $112,095 | 119 | **$942** | $5,102 | 5.42 |
| 2026-09-24 | $156,057 | 175 | **$892** | $4,240 | 4.75 |
| 2026-09-25 | $119,406 | 151 | **$791** | $4,962 | 6.28 |
| 2026-09-26 **HOY** | $105,351 | 142 | **$742** | $5,463 | 7.36 |

🟢 **Hoy va mejor que ayer a la misma hora** ($742 vs $791).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   742  =  $ 5,463  ÷  7.36
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,463 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.36 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $27,640 | 79% | 26 | $1,063 | 5.40 |
| Domiciliarios - Expancion - API | $40,000 | $27,169 | 68% | 40 | $679 | 6.23 |
| TEST Creativos - API | $40,000 | $24,859 | 62% | 30 | $829 | 10.18 |
| Domiciliarios VIDEO - API | $20,000 | $13,200 | 66% | 16 | $825 | 6.20 |
| Motorizados - API | $20,000 | $12,483 | 62% | 29 | $430 | 11.52 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $105,351 | 141 | **$747** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,895**/pedido |
| utilidad estimada de lo que va del día | **$176,821** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,005 | $1,063 | 🟡 |
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $733 | $679 | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $829 | 🟡 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $698 | $825 | 🔴 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $430 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.46 | 5.40 | 🟡 |
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.38 | 6.23 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 10.18 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.85 | 6.20 | 🟡 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.40 | 11.52 | 🟢 |

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
| 2026-09-25 | $140,455 | 179 | $785 | $5,070 | 6.46 | $217,764 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
