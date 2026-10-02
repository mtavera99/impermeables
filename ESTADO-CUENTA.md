# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 20:53 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$135,339** |
| gastado hoy (hasta las 20h) | $173,001 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $198,818 |
| saldo proyectado a medianoche | $109,522 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $47,710 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $178,805 | 260 | **$688** | $4,403 | 6.40 |
| 2026-09-28 | $183,320 | 384 | **$477** | $5,089 | 10.66 |
| 2026-09-29 | $212,242 | 446 | **$476** | $4,771 | 10.03 |
| 2026-09-30 | $224,969 | 492 | **$457** | $4,092 | 8.95 |
| 2026-10-01 **HOY** | $173,001 | 437 | **$396** | $3,249 | 8.21 |

🟢 **Hoy va mejor que ayer a la misma hora** ($396 vs $457).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   396  =  $ 3,249  ÷  8.21
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,249 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.21 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $27,892 | 70% | 38 | $734 | 7.62 |
| Domiciliarios - Expancion - API | $40,000 | $24,469 | 61% | 53 | $462 | 7.56 |
| Domiciliarios - API | $35,000 | $23,369 | 67% | 60 | $389 | 9.40 |
| Domiciliarios VIDEO - API | $20,000 | $20,324 | 102% | 51 | $399 | 7.93 |
| Domiciliarios INTER - API | $20,000 | $16,840 | 84% | 95 | $177 | 12.74 |
| Domiciliarios VIDEO INTER - API | $20,000 | $16,404 | 82% | 29 | $566 | 5.40 |
| Motorizados - INTER | $20,000 | $15,666 | 78% | 55 | $285 | 11.49 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,214 | 76% | 35 | $435 | 5.42 |
| Motorizados - API | $20,000 | $12,823 | 64% | 21 | $611 | 4.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $173,001 | 437 | **$396** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,713**/pedido |
| utilidad estimada de lo que va del día | **$701,533** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $831 | $861 | $588 | $735 | $555 | $734 | 🔴 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $547 | $462 | 🟢 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $508 | $389 | 🟢 |
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $423 | $399 | 🟢 |
| Domiciliarios INTER - API | — | — | — | $271 | $254 | $177 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $701 | $566 | 🟢 |
| Motorizados - INTER | — | — | — | $403 | $333 | $285 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $393 | $435 | 🟡 |
| Motorizados - API | $465 | $522 | $311 | $510 | $518 | $611 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.64 | 7.62 | 🔴 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.61 | 7.56 | 🟢 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.46 | 9.40 | 🟢 |
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.32 | 7.93 | 🟡 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.23 | 12.74 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.80 | 5.40 | 🔴 |
| Motorizados - INTER | — | — | — | 13.10 | 15.50 | 11.49 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.84 | 5.42 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.40 | 4.80 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,395 | 568 | $448 | $4,026 | 8.99 | $882,300 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
