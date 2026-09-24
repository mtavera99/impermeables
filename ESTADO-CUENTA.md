# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 15:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,544** |
| gastado hoy (hasta las 15h) | $108,545 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $178,822 |
| saldo proyectado a medianoche | $83,268 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $90,934 | 65 | **$1,399** | $4,708 | 3.37 |
| 2026-09-21 | $111,044 | 95 | **$1,169** | $4,313 | 3.69 |
| 2026-09-22 | $102,699 | 100 | **$1,027** | $4,243 | 4.13 |
| 2026-09-23 | $78,331 | 76 | **$1,031** | $4,940 | 4.79 |
| 2026-09-24 **HOY** | $108,545 | 116 | **$936** | $4,071 | 4.35 |

🟢 **Hoy va mejor que ayer a la misma hora** ($936 vs $1,031).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   936  =  $ 4,071  ÷  4.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,071 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.35 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $31,271 | 78% | 27 | $1,158 | 2.62 |
| Domiciliarios - API | $35,000 | $25,390 | 73% | 21 | $1,209 | 3.65 |
| TEST Creativos - API | $40,000 | $23,515 | 59% | 29 | $811 | 8.83 |
| Motorizados - API | $20,000 | $15,391 | 77% | 19 | $810 | 4.32 |
| Domiciliarios VIDEO - API | $20,000 | $12,978 | 65% | 20 | $649 | 6.85 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $108,545 | 116 | **$936** | $2,402 | **39%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,140**/pedido |
| utilidad estimada de lo que va del día | **$123,597** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $777 | $1,158 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $888 | $1,209 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $735 | $811 | 🟡 |
| Motorizados - API | — | — | — | $1,265 | $744 | $810 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,253 | $649 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.66 | 2.62 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.85 | 3.65 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.11 | 8.83 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.37 | 4.32 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.37 | 6.85 | 🟢 |

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
| 2026-09-23 | $141,777 | 173 | $820 | $5,021 | 6.13 | $204,435 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
