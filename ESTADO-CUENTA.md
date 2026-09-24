# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 09:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$99,185** |
| gastado hoy (hasta las 9h) | $62,784 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $176,216 |
| saldo proyectado a medianoche | $-14,247 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $79,681 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $48,753 | 43 | **$1,134** | $4,606 | 4.06 |
| 2026-09-21 | $44,265 | 38 | **$1,165** | $5,138 | 4.41 |
| 2026-09-22 | $48,132 | 47 | **$1,024** | $3,691 | 3.60 |
| 2026-09-23 | $46,328 | 38 | **$1,219** | $4,479 | 3.67 |
| 2026-09-24 **HOY** | $62,784 | 59 | **$1,064** | $4,069 | 3.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,064 vs $1,219).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,064  =  $ 4,069  ÷  3.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,069 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.82 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $17,849 | 45% | 14 | $1,275 | 2.34 |
| Domiciliarios - API | $35,000 | $15,529 | 44% | 8 | $1,941 | 2.35 |
| TEST Creativos - API | $40,000 | $12,621 | 32% | 13 | $971 | 7.57 |
| Motorizados - API | $20,000 | $8,886 | 44% | 11 | $808 | 4.44 |
| Domiciliarios VIDEO - API | $20,000 | $7,899 | 39% | 13 | $608 | 7.00 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $62,784 | 59 | **$1,064** | $2,402 | **44%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,668**/pedido |
| utilidad estimada de lo que va del día | **$55,288** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $775 | $1,275 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $887 | $1,941 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $734 | $971 | 🔴 |
| Motorizados - API | — | — | — | $1,265 | $741 | $808 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,252 | $608 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.68 | 2.34 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.86 | 2.35 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.12 | 7.57 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.38 | 4.44 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.38 | 7.00 | 🟢 |

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
| 2026-09-23 | $141,518 | 173 | $818 | $5,023 | 6.14 | $204,694 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
