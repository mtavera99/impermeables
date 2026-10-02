# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 06:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$231,410** |
| gastado hoy (hasta las 6h) | $19,671 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $219,229 |
| saldo proyectado a medianoche | $31,852 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $104,969 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $69,358 | 72 | **$963** | $4,958 | 5.15 |
| 2026-09-29 | $29,736 | 66 | **$451** | $5,228 | 11.60 |
| 2026-09-30 | $33,588 | 70 | **$480** | $4,318 | 9.00 |
| 2026-10-01 | $28,778 | 60 | **$480** | $3,106 | 6.48 |
| 2026-10-02 **HOY** | $19,671 | 53 | **$371** | $3,432 | 9.25 |

🟢 **Hoy va mejor que ayer a la misma hora** ($371 vs $480).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   371  =  $ 3,432  ÷  9.25
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,432 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.25 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $3,306 | 9% | 8 | $413 | 8.39 |
| Domiciliarios - Expancion - API | $40,000 | $3,259 | 8% | 4 | $815 | 4.62 |
| Domiciliarios VIDEO - API | $20,000 | $2,934 | 15% | 10 | $293 | 9.22 |
| TEST Creativos - API | $40,000 | $2,646 | 7% | 6 | $441 | 13.22 |
| Domiciliarios INTER - API | $20,000 | $2,193 | 11% | 13 | $169 | 18.23 |
| Motorizados - API | $20,000 | $2,067 | 10% | 6 | $344 | 7.85 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,172 | 6% | 2 | $586 | 6.58 |
| Motorizados - INTER | $20,000 | $1,148 | 6% | 4 | $287 | 13.25 |
| Domiciliarios - Expancion - INTER | $20,000 | $946 | 5% | 1 | $946 | 3.42 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $19,671 | 54 | **$364** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,337**/pedido |
| utilidad estimada de lo que va del día | **$88,395** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $676 | $433 | $483 | $508 | $388 | $413 | 🟡 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $442 | $815 | 🔴 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $398 | $293 | 🟢 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $674 | $441 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $169 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $593 | $344 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $511 | $586 | 🟡 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $287 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $453 | $946 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.27 | 8.39 | 🟡 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.77 | 4.62 | 🔴 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.82 | 9.22 | 🟢 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.42 | 13.22 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.84 | 18.23 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.88 | 7.85 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.04 | 6.58 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.22 | 13.25 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.27 | 3.42 | 🔴 |

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
| 2026-10-01 | $207,057 | 523 | $396 | $3,274 | 8.27 | $839,582 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
