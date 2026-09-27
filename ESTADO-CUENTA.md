# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 20:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$127,761** |
| gastado hoy (hasta las 20h) | $116,788 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $129,134 |
| saldo proyectado a medianoche | $115,416 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $165,104 | 152 | **$1,086** | $4,727 | 4.35 |
| 2026-09-23 | $122,959 | 135 | **$911** | $4,999 | 5.49 |
| 2026-09-24 | $164,653 | 185 | **$890** | $4,271 | 4.80 |
| 2026-09-25 | $128,523 | 167 | **$770** | $4,999 | 6.50 |
| 2026-09-26 **HOY** | $116,788 | 158 | **$739** | $5,404 | 7.31 |

🟢 **Hoy va mejor que ayer a la misma hora** ($739 vs $770).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   739  =  $ 5,404  ÷  7.31
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,404 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.31 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $30,884 | 88% | 31 | $996 | 5.68 |
| Domiciliarios - Expancion - API | $40,000 | $29,661 | 74% | 42 | $706 | 5.95 |
| TEST Creativos - API | $40,000 | $27,284 | 68% | 33 | $827 | 10.13 |
| Domiciliarios VIDEO - API | $20,000 | $15,181 | 76% | 21 | $723 | 7.00 |
| Motorizados - API | $20,000 | $13,778 | 69% | 31 | $444 | 10.95 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $116,788 | 158 | **$739** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,800**/pedido |
| utilidad estimada de lo que va del día | **$199,405** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,005 | $996 | 🟡 |
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $733 | $706 | 🟡 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $820 | $827 | 🟡 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $698 | $723 | 🟡 |
| Motorizados - API | — | $1,265 | $745 | $701 | $675 | $444 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.46 | 5.68 | 🟡 |
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.38 | 5.95 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 8.98 | 10.13 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.85 | 7.00 | 🟡 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.40 | 10.95 | 🟢 |

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
