# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 17:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$144,905** |
| gastado hoy (hasta las 17h) | $175,945 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $250,768 |
| saldo proyectado a medianoche | $70,082 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $35,200 para cubrir un día malo

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
| 2026-10-04 | $185,662 | 447 | **$415** | $2,885 | 6.95 |
| 2026-10-05 **HOY** | $175,945 | 432 | **$407** | $2,575 | 6.32 |

🟢 **Hoy va mejor que ayer a la misma hora** ($407 vs $415).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   407  =  $ 2,575  ÷  6.32
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,575 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.32 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $30,437 | 76% | 53 | $574 | 5.92 |
| Domiciliarios - Expancion - API | $40,000 | $29,335 | 73% | 61 | $481 | 5.99 |
| Domiciliarios - API | $35,000 | $26,731 | 76% | 37 | $722 | 3.91 |
| Motorizados - API | $20,000 | $15,900 | 80% | 37 | $430 | 5.79 |
| Motorizados - INTER | $20,000 | $15,689 | 78% | 44 | $357 | 7.87 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,455 | 77% | 40 | $386 | 5.70 |
| Domiciliarios VIDEO - API | $20,000 | $14,521 | 73% | 39 | $372 | 5.71 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,270 | 71% | 52 | $274 | 9.51 |
| Domiciliarios INTER - API | $20,000 | $13,607 | 68% | 67 | $203 | 7.95 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $175,945 | 430 | **$409** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,871**/pedido |
| utilidad estimada de lo que va del día | **$684,581** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $555 | $679 | $503 | $482 | $478 | $574 | 🔴 |
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $478 | $481 | 🟡 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $463 | $722 | 🔴 |
| Motorizados - API | $519 | $597 | $382 | $276 | $403 | $430 | 🟡 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $339 | $357 | 🟡 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $419 | $386 | 🟢 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $322 | $372 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $342 | $274 | 🟢 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $223 | $203 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.92 | 5.92 | 🔴 |
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.36 | 5.99 | 🟡 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.43 | 3.91 | 🔴 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.37 | 5.79 | 🟡 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.05 | 7.87 | 🟡 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.61 | 5.70 | 🟡 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.11 | 5.71 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.70 | 9.51 | 🟢 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.83 | 7.95 | 🟡 |

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
| 2026-10-04 | $289,318 | 748 | $387 | $2,741 | 7.09 | $1,207,597 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
