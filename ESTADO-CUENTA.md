# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 18:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$131,436** |
| gastado hoy (hasta las 17h) | $189,046 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $263,884 |
| saldo proyectado a medianoche | $56,598 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $35,568 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-01 | $135,756 | 344 | **$395** | $3,311 | 8.39 |
| 2026-10-02 | $134,111 | 344 | **$390** | $3,530 | 9.05 |
| 2026-10-03 | $136,031 | 402 | **$338** | $3,238 | 9.57 |
| 2026-10-04 | $185,665 | 447 | **$415** | $2,885 | 6.95 |
| 2026-10-05 **HOY** | $189,167 | 464 | **$408** | $2,589 | 6.35 |

🟢 **Hoy va mejor que ayer a la misma hora** ($408 vs $415).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   408  =  $ 2,589  ÷  6.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,589 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.35 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $32,471 | 81% | 57 | $570 | 6.04 |
| Domiciliarios - Expancion - API | $40,000 | $31,306 | 78% | 66 | $474 | 6.06 |
| Domiciliarios - API | $35,000 | $28,243 | 81% | 38 | $743 | 3.83 |
| Motorizados - API | $20,000 | $17,122 | 86% | 42 | $408 | 6.20 |
| Motorizados - INTER | $20,000 | $16,955 | 85% | 47 | $361 | 7.81 |
| Domiciliarios - Expancion - INTER | $20,000 | $16,654 | 83% | 41 | $406 | 5.43 |
| Domiciliarios VIDEO - API | $20,000 | $15,582 | 78% | 42 | $371 | 5.84 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,559 | 78% | 53 | $294 | 8.86 |
| Domiciliarios INTER - API | $20,000 | $15,202 | 76% | 78 | $195 | 8.39 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $189,094 | 464 | **$408** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,852**/pedido |
| utilidad estimada de lo que va del día | **$739,473** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $555 | $679 | $503 | $482 | $478 | $570 | 🔴 |
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $478 | $474 | 🟡 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $463 | $746 | 🔴 |
| Motorizados - API | $519 | $597 | $382 | $276 | $403 | $408 | 🟡 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $339 | $363 | 🟡 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $419 | $406 | 🟡 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $322 | $371 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $342 | $294 | 🟢 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $223 | $195 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.92 | 6.04 | 🔴 |
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.35 | 6.06 | 🟡 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.43 | 3.81 | 🔴 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.37 | 6.20 | 🟡 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.04 | 7.76 | 🟡 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.61 | 5.43 | 🟡 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.11 | 5.84 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.70 | 8.86 | 🟡 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.82 | 8.39 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $891,199 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $900,641 |
| 2026-10-04 | $289,354 | 748 | $387 | $2,741 | 7.08 | $1,207,561 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
