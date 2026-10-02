# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 13:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$164,569** |
| gastado hoy (hasta las 13h) | $85,528 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $205,497 |
| saldo proyectado a medianoche | $44,600 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $105,953 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $132,021 | 242 | **$546** | $5,146 | 9.43 |
| 2026-09-29 | $127,683 | 266 | **$480** | $4,976 | 10.37 |
| 2026-09-30 | $122,377 | 280 | **$437** | $4,269 | 9.77 |
| 2026-10-01 | $99,940 | 242 | **$413** | $3,373 | 8.17 |
| 2026-10-02 **HOY** | $85,528 | 223 | **$384** | $3,501 | 9.13 |

🟢 **Hoy va mejor que ayer a la misma hora** ($384 vs $413).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   384  =  $ 3,501  ÷  9.13
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,501 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.13 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $15,333 | 44% | 29 | $529 | 6.97 |
| Domiciliarios - Expancion - API | $40,000 | $14,824 | 37% | 24 | $618 | 5.75 |
| TEST Creativos - API | $40,000 | $11,329 | 28% | 29 | $391 | 14.89 |
| Domiciliarios VIDEO - API | $20,000 | $10,527 | 53% | 35 | $301 | 9.34 |
| Motorizados - API | $20,000 | $8,474 | 42% | 22 | $385 | 7.51 |
| Domiciliarios INTER - API | $20,000 | $7,906 | 40% | 42 | $188 | 15.16 |
| Domiciliarios VIDEO INTER - API | $20,000 | $6,214 | 31% | 15 | $414 | 9.87 |
| Motorizados - INTER | $20,000 | $5,677 | 28% | 19 | $299 | 13.42 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,244 | 26% | 8 | $656 | 4.52 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $85,528 | 223 | **$384** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,566**/pedido |
| utilidad estimada de lo que va del día | **$360,745** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $529 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $618 | 🔴 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $391 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $399 | $301 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $595 | $385 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $188 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $414 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $299 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $656 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.24 | 6.97 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.73 | 5.75 | 🔴 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.37 | 14.89 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.78 | 9.34 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.85 | 7.51 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 15.16 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.02 | 9.87 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.19 | 13.42 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.25 | 4.52 | 🟡 |

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
| 2026-10-01 | $207,820 | 523 | $397 | $3,272 | 8.23 | $838,819 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
