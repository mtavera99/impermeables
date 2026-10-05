# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 19:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$83,688** |
| gastado hoy (hasta las 19h) | $225,385 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $255,712 |
| saldo proyectado a medianoche | $53,361 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $46,977 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $203,989 | 441 | **$463** | $4,132 | 8.93 |
| 2026-10-01 | $165,337 | 416 | **$397** | $3,253 | 8.18 |
| 2026-10-02 | $166,659 | 441 | **$378** | $3,447 | 9.12 |
| 2026-10-03 | $162,177 | 472 | **$344** | $3,172 | 9.23 |
| 2026-10-04 **HOY** | $225,432 | 576 | **$391** | $2,817 | 7.20 |

🟠 Hoy va 14% más caro que ayer a la misma hora ($391 vs $344).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   391  =  $ 2,817  ÷  7.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,817 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.20 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $40,593 | 101% | 85 | $478 | 8.32 |
| Domiciliarios - Expancion - API | $40,000 | $39,177 | 98% | 78 | $502 | 6.13 |
| Domiciliarios - API | $35,000 | $32,501 | 93% | 66 | $492 | 6.29 |
| Domiciliarios VIDEO INTER - API | $20,000 | $21,716 | 109% | 64 | $339 | 8.82 |
| Domiciliarios - Expancion - INTER | $20,000 | $21,395 | 107% | 57 | $375 | 6.25 |
| Motorizados - API | $20,000 | $17,887 | 89% | 45 | $397 | 6.61 |
| Motorizados - INTER | $20,000 | $17,858 | 89% | 51 | $350 | 8.08 |
| Domiciliarios VIDEO - API | $20,000 | $17,387 | 87% | 50 | $348 | 6.83 |
| Domiciliarios INTER - API | $20,000 | $17,194 | 86% | 80 | $215 | 8.13 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $225,708 | 576 | **$392** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,665**/pedido |
| utilidad estimada de lo que va del día | **$926,996** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $478 | 🟡 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $502 | 🔴 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $492 | 🟡 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $510 | $339 | 🟢 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $375 | 🔴 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $397 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $350 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $348 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $141 | $215 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.41 | 8.32 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.84 | 6.13 | 🔴 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.51 | 6.29 | 🟡 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.44 | 8.82 | 🟢 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.93 | 6.25 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.08 | 6.61 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.39 | 8.08 | 🔴 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.14 | 6.83 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.55 | 8.13 | 🔴 |

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
| 2026-10-03 | $182,018 | 541 | $336 | $3,100 | 9.22 | $900,643 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
