# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 13:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$69,540** |
| gastado hoy (hasta las 13h) | $93,302 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $177,318 |
| saldo proyectado a medianoche | $-14,476 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $78,808 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $79,174 | 53 | **$1,494** | $4,604 | 3.08 |
| 2026-09-21 | $105,645 | 86 | **$1,228** | $4,291 | 3.49 |
| 2026-09-22 | $84,500 | 86 | **$983** | $3,986 | 4.06 |
| 2026-09-23 | $69,001 | 69 | **$1,000** | $4,843 | 4.84 |
| 2026-09-24 **HOY** | $93,302 | 94 | **$993** | $4,061 | 4.09 |

🟢 **Hoy va mejor que ayer a la misma hora** ($993 vs $1,000).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   993  =  $ 4,061  ÷  4.09
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,061 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.09 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $27,222 | 68% | 21 | $1,296 | 2.35 |
| Domiciliarios - API | $35,000 | $21,851 | 62% | 16 | $1,366 | 3.19 |
| TEST Creativos - API | $40,000 | $19,612 | 49% | 23 | $853 | 8.51 |
| Motorizados - API | $20,000 | $13,095 | 65% | 17 | $770 | 4.56 |
| Domiciliarios VIDEO - API | $20,000 | $11,522 | 58% | 17 | $678 | 6.58 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $93,302 | 94 | **$993** | $2,402 | **41%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,816**/pedido |
| utilidad estimada de lo que va del día | **$94,813** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $777 | $1,296 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $888 | $1,366 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $735 | $853 | 🔴 |
| Motorizados - API | — | — | — | $1,265 | $744 | $770 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,253 | $678 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.67 | 2.35 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.85 | 3.19 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.11 | 8.51 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.37 | 4.56 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.37 | 6.58 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,728 | 173 | $819 | $5,022 | 6.13 | $204,484 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
