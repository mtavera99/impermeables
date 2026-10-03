# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 11:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$281,638** |
| gastado hoy (hasta las 11h) | $61,362 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $193,125 |
| saldo proyectado a medianoche | $149,875 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $13,050 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $101,603 | 219 | **$464** | $5,036 | 10.85 |
| 2026-09-30 | $94,861 | 217 | **$437** | $4,240 | 9.70 |
| 2026-10-01 | $80,605 | 185 | **$436** | $3,393 | 7.79 |
| 2026-10-02 | $70,985 | 181 | **$392** | $3,482 | 8.88 |
| 2026-10-03 **HOY** | $61,362 | 191 | **$321** | $3,455 | 10.76 |

🟢 **Hoy va mejor que ayer a la misma hora** ($321 vs $392).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   321  =  $ 3,455  ÷  10.76
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,455 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.76 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $11,347 | 28% | 22 | $516 | 10.33 |
| Domiciliarios - Expancion - API | $40,000 | $11,201 | 28% | 24 | $467 | 8.24 |
| Domiciliarios - API | $35,000 | $10,627 | 30% | 27 | $394 | 8.70 |
| Domiciliarios VIDEO - API | $20,000 | $7,428 | 37% | 29 | $256 | 11.71 |
| Motorizados - API | $20,000 | $5,715 | 29% | 22 | $260 | 12.22 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,654 | 23% | 10 | $465 | 7.47 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,465 | 22% | 19 | $235 | 10.81 |
| Domiciliarios INTER - API | $20,000 | $3,188 | 16% | 28 | $114 | 19.23 |
| Motorizados - INTER | $20,000 | $2,737 | 14% | 10 | $274 | 12.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $61,362 | 191 | **$321** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,825**/pedido |
| utilidad estimada de lo que va del día | **$320,872** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $588 | $735 | $555 | $679 | $501 | $516 | 🟡 |
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $455 | $467 | 🟡 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $432 | $394 | 🟢 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $344 | $256 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $596 | $381 | $260 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $431 | $465 | 🟡 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $461 | $235 | 🟢 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $114 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $259 | $274 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.05 | 10.33 | 🟡 |
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.84 | 8.24 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.00 | 8.70 | 🟢 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.27 | 11.71 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.13 | 12.22 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 7.98 | 7.47 | 🟡 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.62 | 10.81 | 🟢 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 13.00 | 19.23 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.50 | 12.80 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,089 | 523 | $398 | $3,272 | 8.22 | $838,550 |
| 2026-10-02 | $207,027 | 549 | $377 | $3,363 | 8.92 | $891,644 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
