# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 14:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$156,650** |
| gastado hoy (hasta las 14h) | $93,542 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $204,925 |
| saldo proyectado a medianoche | $45,267 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $105,858 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $139,340 | 268 | **$520** | $5,171 | 9.95 |
| 2026-09-29 | $137,148 | 282 | **$486** | $4,971 | 10.22 |
| 2026-09-30 | $132,422 | 294 | **$450** | $4,274 | 9.49 |
| 2026-10-01 | $107,085 | 261 | **$410** | $3,370 | 8.21 |
| 2026-10-02 **HOY** | $93,542 | 241 | **$388** | $3,495 | 9.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($388 vs $410).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   388  =  $ 3,495  ÷  9.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,495 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.00 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $16,557 | 47% | 34 | $487 | 7.52 |
| Domiciliarios - Expancion - API | $40,000 | $16,032 | 40% | 25 | $641 | 5.49 |
| TEST Creativos - API | $40,000 | $13,018 | 33% | 31 | $420 | 14.00 |
| Domiciliarios VIDEO - API | $20,000 | $11,328 | 57% | 37 | $306 | 9.22 |
| Motorizados - API | $20,000 | $9,090 | 45% | 22 | $413 | 7.00 |
| Domiciliarios INTER - API | $20,000 | $8,493 | 42% | 42 | $202 | 13.85 |
| Domiciliarios VIDEO INTER - API | $20,000 | $6,840 | 34% | 19 | $360 | 11.07 |
| Motorizados - INTER | $20,000 | $6,399 | 32% | 23 | $278 | 14.19 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,785 | 29% | 8 | $723 | 4.09 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $93,542 | 241 | **$388** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,621**/pedido |
| utilidad estimada de lo que va del día | **$388,753** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $487 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $641 | 🔴 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $420 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $399 | $306 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $595 | $413 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $202 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $360 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $278 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $723 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.24 | 7.52 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.73 | 5.49 | 🔴 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.37 | 14.00 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.78 | 9.22 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.85 | 7.00 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 13.85 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.02 | 11.07 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.18 | 14.19 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.25 | 4.09 | 🔴 |

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
| 2026-10-01 | $207,838 | 523 | $397 | $3,271 | 8.23 | $838,801 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
