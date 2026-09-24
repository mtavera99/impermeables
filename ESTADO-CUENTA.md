# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 16:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$145,005** |
| gastado hoy (hasta las 16h) | $117,302 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $180,202 |
| saldo proyectado a medianoche | $82,105 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $95,732 | 73 | **$1,311** | $4,745 | 3.62 |
| 2026-09-21 | $113,639 | 96 | **$1,184** | $4,328 | 3.66 |
| 2026-09-22 | $111,826 | 104 | **$1,075** | $4,390 | 4.08 |
| 2026-09-23 | $83,985 | 83 | **$1,012** | $4,992 | 4.93 |
| 2026-09-24 **HOY** | $117,302 | 129 | **$909** | $4,113 | 4.52 |

🟢 **Hoy va mejor que ayer a la misma hora** ($909 vs $1,012).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   909  =  $ 4,113  ÷  4.52
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,113 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.52 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $33,616 | 84% | 29 | $1,159 | 2.64 |
| Domiciliarios - API | $35,000 | $27,331 | 78% | 25 | $1,093 | 4.05 |
| TEST Creativos - API | $40,000 | $26,219 | 66% | 35 | $749 | 9.73 |
| Motorizados - API | $20,000 | $16,468 | 82% | 20 | $823 | 4.28 |
| Domiciliarios VIDEO - API | $20,000 | $13,668 | 68% | 20 | $683 | 6.49 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $117,302 | 129 | **$909** | $2,402 | **38%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$10,825**/pedido |
| utilidad estimada de lo que va del día | **$140,856** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $777 | $1,159 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $888 | $1,093 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $735 | $749 | 🟡 |
| Motorizados - API | — | — | — | $1,265 | $744 | $823 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,253 | $683 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.66 | 2.64 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.85 | 4.05 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.10 | 9.73 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.37 | 4.28 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.37 | 6.49 | 🟢 |

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
| 2026-09-23 | $141,805 | 173 | $820 | $5,020 | 6.12 | $204,407 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
