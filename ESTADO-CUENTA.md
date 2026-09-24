# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 18:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$126,937** |
| gastado hoy (hasta las 18h) | $135,370 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $176,422 |
| saldo proyectado a medianoche | $85,884 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $105,152 | 84 | **$1,252** | $4,838 | 3.87 |
| 2026-09-21 | $127,678 | 107 | **$1,193** | $4,293 | 3.60 |
| 2026-09-22 | $140,213 | 127 | **$1,104** | $4,640 | 4.20 |
| 2026-09-23 | $99,342 | 102 | **$974** | $5,099 | 5.24 |
| 2026-09-24 **HOY** | $135,370 | 150 | **$902** | $4,181 | 4.63 |

🟢 **Hoy va mejor que ayer a la misma hora** ($902 vs $974).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   902  =  $ 4,181  ÷  4.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,181 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $38,398 | 96% | 32 | $1,200 | 2.58 |
| TEST Creativos - API | $40,000 | $31,469 | 79% | 40 | $787 | 9.44 |
| Domiciliarios - API | $35,000 | $30,966 | 88% | 30 | $1,032 | 4.28 |
| Motorizados - API | $20,000 | $18,630 | 93% | 22 | $847 | 4.23 |
| Domiciliarios VIDEO - API | $20,000 | $15,907 | 80% | 26 | $612 | 7.34 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| TEST Creativos | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $135,370 | 150 | **$902** | $2,402 | **38%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$10,744**/pedido |
| utilidad estimada de lo que va del día | **$164,813** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $777 | $1,200 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $735 | $787 | 🟡 |
| Domiciliarios - API | — | — | — | $942 | $889 | $1,032 | 🔴 |
| Motorizados - API | — | — | — | $1,265 | $745 | $847 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,254 | $612 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.66 | 2.58 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.10 | 9.44 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.84 | 4.28 | 🟡 |
| Motorizados - API | — | — | — | 3.17 | 5.37 | 4.23 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.36 | 7.34 | 🟢 |

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
| 2026-09-23 | $141,854 | 173 | $820 | $5,019 | 6.12 | $204,358 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
