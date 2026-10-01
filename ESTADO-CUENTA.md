# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 22:37 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$120,292** |
| gastado hoy (hasta las 22h) | $241,965 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $244,560 |
| saldo proyectado a medianoche | $117,697 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $133,695 | 185 | **$723** | $5,406 | 7.48 |
| 2026-09-27 | $194,562 | 293 | **$664** | $4,436 | 6.68 |
| 2026-09-28 | $193,530 | 419 | **$462** | $5,065 | 10.96 |
| 2026-09-29 | $230,941 | 515 | **$448** | $4,778 | 10.66 |
| 2026-09-30 **HOY** | $241,965 | 536 | **$451** | $4,050 | 8.97 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($451 vs $448).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   451  =  $ 4,050  ÷  8.97
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,050 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.97 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $40,168 | 100% | 72 | $558 | 11.71 |
| Domiciliarios - Expancion - API | $40,000 | $37,202 | 93% | 69 | $539 | 6.72 |
| Domiciliarios - API | $35,000 | $33,760 | 96% | 65 | $519 | 7.34 |
| Domiciliarios VIDEO - API | $20,000 | $24,289 | 121% | 54 | $450 | 7.85 |
| Motorizados - INTER | $20,000 | $24,118 | 121% | 72 | $335 | 15.38 |
| Domiciliarios - Expancion - INTER | $20,000 | $21,766 | 109% | 55 | $396 | 8.83 |
| Domiciliarios VIDEO INTER - API | $20,000 | $21,426 | 107% | 31 | $691 | 6.95 |
| Domiciliarios INTER - API | $20,000 | $21,231 | 106% | 83 | $256 | 12.16 |
| Motorizados - API | $20,000 | $18,005 | 90% | 34 | $530 | 6.31 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $241,965 | 535 | **$452** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,384**/pedido |
| utilidad estimada de lo que va del día | **$828,689** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $558 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $539 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $519 | 🟡 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $450 | 🔴 |
| Motorizados - INTER | — | — | — | — | $403 | $335 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $396 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $691 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $256 | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $530 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 11.71 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.32 | 6.72 | 🟡 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 7.34 | 🟡 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.39 | 7.85 | 🔴 |
| Motorizados - INTER | — | — | — | — | 13.10 | 15.38 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.27 | 8.83 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 6.95 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.81 | 12.16 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 6.31 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,441 | 525 | $447 | $4,782 | 10.71 | $816,201 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
