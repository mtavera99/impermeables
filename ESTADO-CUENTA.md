# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 16:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$157,695** |
| gastado hoy (hasta las 16h) | $152,568 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $225,562 |
| saldo proyectado a medianoche | $84,702 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $45,787 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $152,411 | 331 | **$460** | $4,262 | 9.26 |
| 2026-10-01 | $125,390 | 313 | **$401** | $3,344 | 8.35 |
| 2026-10-02 | $119,547 | 308 | **$388** | $3,549 | 9.14 |
| 2026-10-03 | $123,939 | 352 | **$352** | $3,273 | 9.30 |
| 2026-10-04 **HOY** | $153,158 | 384 | **$399** | $2,945 | 7.38 |

🟠 Hoy va 13% más caro que ayer a la misma hora ($399 vs $352).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   399  =  $ 2,945  ÷  7.38
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,945 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.38 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $28,196 | 70% | 51 | $553 | 7.82 |
| Domiciliarios - Expancion - API | $40,000 | $27,391 | 68% | 60 | $457 | 6.99 |
| Domiciliarios - API | $35,000 | $22,261 | 64% | 39 | $571 | 5.66 |
| Domiciliarios - Expancion - INTER | $20,000 | $14,061 | 70% | 41 | $343 | 7.18 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,334 | 67% | 45 | $296 | 10.35 |
| Motorizados - API | $20,000 | $12,777 | 64% | 27 | $473 | 5.90 |
| Domiciliarios VIDEO - API | $20,000 | $12,607 | 63% | 35 | $360 | 6.69 |
| Motorizados - INTER | $20,000 | $11,426 | 57% | 34 | $336 | 8.49 |
| Domiciliarios INTER - API | $20,000 | $10,987 | 55% | 48 | $229 | 7.84 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $153,040 | 380 | **$403** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,794**/pedido |
| utilidad estimada de lo que va del día | **$607,425** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $556 | 🔴 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $457 | 🟡 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $571 | 🔴 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $343 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $510 | $296 | 🟢 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $473 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $362 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $336 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $141 | $229 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.41 | 7.77 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.84 | 6.99 | 🟡 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.51 | 5.66 | 🟡 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.94 | 7.18 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.45 | 10.35 | 🟢 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.08 | 5.90 | 🔴 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.14 | 6.65 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.39 | 8.49 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.56 | 7.84 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $891,199 |
| 2026-10-03 | $182,001 | 541 | $336 | $3,101 | 9.22 | $900,660 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
