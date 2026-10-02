# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 12:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$175,606** |
| gastado hoy (hasta las 12h) | $74,698 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $205,316 |
| saldo proyectado a medianoche | $44,988 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $105,746 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $122,865 | 213 | **$577** | $5,143 | 8.92 |
| 2026-09-29 | $116,215 | 244 | **$476** | $5,006 | 10.51 |
| 2026-09-30 | $109,737 | 257 | **$427** | $4,268 | 10.00 |
| 2026-10-01 | $91,210 | 217 | **$420** | $3,392 | 8.07 |
| 2026-10-02 **HOY** | $74,698 | 197 | **$379** | $3,466 | 9.14 |

🟢 **Hoy va mejor que ayer a la misma hora** ($379 vs $420).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   379  =  $ 3,466  ÷  9.14
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,466 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.14 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $13,455 | 38% | 25 | $538 | 6.77 |
| Domiciliarios - Expancion - API | $40,000 | $12,795 | 32% | 21 | $609 | 5.67 |
| Domiciliarios VIDEO - API | $20,000 | $9,679 | 48% | 32 | $302 | 9.25 |
| TEST Creativos - API | $40,000 | $9,556 | 24% | 25 | $382 | 15.23 |
| Motorizados - API | $20,000 | $7,647 | 38% | 20 | $382 | 7.58 |
| Domiciliarios INTER - API | $20,000 | $6,997 | 35% | 37 | $189 | 15.16 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,096 | 25% | 15 | $340 | 12.22 |
| Motorizados - INTER | $20,000 | $4,804 | 24% | 14 | $343 | 11.96 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,669 | 23% | 8 | $584 | 5.08 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $74,698 | 197 | **$379** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,514**/pedido |
| utilidad estimada de lo que va del día | **$319,543** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $538 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $609 | 🔴 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $398 | $302 | 🟢 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $677 | $382 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $595 | $382 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $189 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $340 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $343 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $584 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.24 | 6.77 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.74 | 5.67 | 🔴 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.79 | 9.25 | 🟢 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.37 | 15.23 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.86 | 7.58 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 15.16 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.02 | 12.22 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.19 | 11.96 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.25 | 5.08 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,435 | 568 | $448 | $4,026 | 8.99 | $882,260 |
| 2026-10-01 | $207,747 | 523 | $397 | $3,272 | 8.24 | $838,892 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
