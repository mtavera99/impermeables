# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 12:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$79,202** |
| gastado hoy (hasta las 12h) | $82,310 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $173,656 |
| saldo proyectado a medianoche | $-12,144 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $80,138 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $70,929 | 49 | **$1,448** | $4,715 | 3.26 |
| 2026-09-21 | $102,763 | 82 | **$1,253** | $4,285 | 3.42 |
| 2026-09-22 | $75,419 | 73 | **$1,033** | $3,876 | 3.75 |
| 2026-09-23 | $63,318 | 61 | **$1,038** | $4,738 | 4.56 |
| 2026-09-24 **HOY** | $82,310 | 81 | **$1,016** | $4,074 | 4.01 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,016 vs $1,038).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,016  =  $ 4,074  ÷  4.01
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,074 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.01 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $24,040 | 60% | 19 | $1,265 | 2.40 |
| Domiciliarios - API | $35,000 | $19,232 | 55% | 13 | $1,479 | 2.96 |
| TEST Creativos - API | $40,000 | $17,144 | 43% | 20 | $857 | 8.57 |
| Motorizados - API | $20,000 | $11,498 | 57% | 14 | $821 | 4.31 |
| Domiciliarios VIDEO - API | $20,000 | $10,396 | 52% | 15 | $693 | 6.47 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $82,310 | 81 | **$1,016** | $2,402 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,097**/pedido |
| utilidad estimada de lo que va del día | **$79,789** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $776 | $1,265 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $888 | $1,479 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $734 | $857 | 🔴 |
| Motorizados - API | — | — | — | $1,265 | $742 | $821 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,252 | $693 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.67 | 2.40 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.86 | 2.96 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.11 | 8.57 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.38 | 4.31 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.38 | 6.47 | 🟢 |

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
| 2026-09-23 | $141,623 | 173 | $819 | $5,021 | 6.13 | $204,589 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
