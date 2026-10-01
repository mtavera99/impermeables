# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 20:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,474** |
| gastado hoy (hasta las 20h) | $208,468 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $225,520 |
| saldo proyectado a medianoche | $136,422 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $124,518 | 166 | **$750** | $5,380 | 7.17 |
| 2026-09-27 | $178,805 | 260 | **$688** | $4,403 | 6.40 |
| 2026-09-28 | $183,320 | 384 | **$477** | $5,089 | 10.66 |
| 2026-09-29 | $212,233 | 446 | **$476** | $4,771 | 10.03 |
| 2026-09-30 **HOY** | $208,468 | 459 | **$454** | $4,116 | 9.06 |

🟢 **Hoy va mejor que ayer a la misma hora** ($454 vs $476).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   454  =  $ 4,116  ÷  9.06
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,116 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.06 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $36,354 | 91% | 64 | $568 | 11.61 |
| Domiciliarios - Expancion - API | $40,000 | $30,737 | 77% | 57 | $539 | 6.82 |
| Domiciliarios - API | $35,000 | $26,272 | 75% | 55 | $478 | 8.06 |
| Motorizados - INTER | $20,000 | $22,101 | 111% | 65 | $340 | 15.16 |
| Domiciliarios VIDEO - API | $20,000 | $19,924 | 100% | 44 | $453 | 8.04 |
| Domiciliarios - Expancion - INTER | $20,000 | $19,912 | 100% | 51 | $390 | 8.93 |
| Domiciliarios INTER - API | $20,000 | $19,158 | 96% | 70 | $274 | 11.37 |
| Domiciliarios VIDEO INTER - API | $20,000 | $18,967 | 95% | 26 | $730 | 6.62 |
| Motorizados - API | $20,000 | $15,043 | 75% | 27 | $557 | 6.13 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $208,468 | 459 | **$454** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,407**/pedido |
| utilidad estimada de lo que va del día | **$710,093** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $568 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $539 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $478 | 🟡 |
| Motorizados - INTER | — | — | — | — | $403 | $340 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $453 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $390 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $274 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $730 | 🔴 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $557 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 11.61 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.32 | 6.82 | 🟡 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 8.06 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 15.16 | 🟢 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.39 | 8.04 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.27 | 8.93 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.81 | 11.37 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 6.62 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 6.13 | 🔴 |

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
| 2026-09-29 | $234,437 | 525 | $447 | $4,782 | 10.71 | $816,205 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
