# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 05:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$240,606** |
| gastado hoy (hasta las 5h) | $10,599 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $222,224 |
| saldo proyectado a medianoche | $28,982 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $104,845 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–5:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $57,900 | 49 | **$1,182** | $5,012 | 4.24 |
| 2026-09-29 | $16,524 | 38 | **$435** | $5,353 | 12.31 |
| 2026-09-30 | $20,146 | 47 | **$429** | $4,407 | 10.28 |
| 2026-10-01 | $17,793 | 35 | **$508** | $3,209 | 6.31 |
| 2026-10-02 **HOY** | $10,599 | 26 | **$408** | $3,496 | 8.58 |

🟢 **Hoy va mejor que ayer a la misma hora** ($408 vs $508).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   408  =  $ 3,496  ÷  8.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,496 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.58 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $1,717 | 4% | 3 | $572 | 11.45 |
| Domiciliarios - API | $35,000 | $1,569 | 4% | 2 | $784 | 4.34 |
| Domiciliarios - Expancion - API | $40,000 | $1,546 | 4% | 2 | $773 | 4.47 |
| Domiciliarios VIDEO - API | $20,000 | $1,452 | 7% | 4 | $363 | 7.72 |
| Domiciliarios INTER - API | $20,000 | $1,438 | 7% | 7 | $205 | 16.71 |
| Motorizados - API | $20,000 | $1,259 | 6% | 3 | $420 | 6.47 |
| Motorizados - INTER | $20,000 | $632 | 3% | 3 | $211 | 16.95 |
| Domiciliarios VIDEO INTER - API | $20,000 | $557 | 3% | 2 | $278 | 15.04 |
| Domiciliarios - Expancion - INTER | $20,000 | $429 | 2% | 1 | $429 | 6.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $10,599 | 27 | **$393** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,673**/pedido |
| utilidad estimada de lo que va del día | **$43,434** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $861 | $588 | $735 | $555 | $674 | $572 | 🟢 |
| Domiciliarios - API | $676 | $433 | $483 | $508 | $387 | $784 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $442 | $773 | 🔴 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $397 | $363 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $177 | $205 | 🔴 |
| Motorizados - API | $522 | $311 | $510 | $518 | $592 | $420 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $291 | $211 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $510 | $278 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $452 | $429 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.43 | 11.45 | 🟢 |
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.28 | 4.34 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.78 | 4.47 | 🔴 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.83 | 7.72 | 🟡 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.86 | 16.71 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.89 | 6.47 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.24 | 16.95 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.04 | 15.04 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.27 | 6.62 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,425 | 568 | $448 | $4,026 | 8.99 | $882,270 |
| 2026-10-01 | $206,763 | 523 | $395 | $3,273 | 8.28 | $839,876 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
