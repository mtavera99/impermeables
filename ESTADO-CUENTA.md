# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 09:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$150,084** |
| gastado hoy (hasta las 9h) | $62,513 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $192,171 |
| saldo proyectado a medianoche | $20,426 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $143,453 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $29,379 | 44 | **$668** | $5,522 | 8.27 |
| 2026-09-27 | $37,599 | 55 | **$684** | $5,665 | 8.29 |
| 2026-09-28 | $100,571 | 155 | **$649** | $5,090 | 7.84 |
| 2026-09-29 | $69,332 | 163 | **$425** | $5,051 | 11.88 |
| 2026-09-30 **HOY** | $62,513 | 147 | **$425** | $4,181 | 9.83 |

🟢 **Hoy va mejor que ayer a la misma hora** ($425 vs $425).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   425  =  $ 4,181  ÷  9.83
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,181 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.83 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $11,130 | 28% | 16 | $696 | 10.24 |
| Motorizados - INTER | $20,000 | $8,929 | 45% | 28 | $319 | 15.27 |
| Domiciliarios INTER - API | $20,000 | $7,800 | 39% | 27 | $289 | 10.45 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,763 | 39% | 14 | $554 | 8.46 |
| Domiciliarios - Expancion - API | $40,000 | $7,088 | 18% | 14 | $506 | 7.46 |
| Domiciliarios - Expancion - INTER | $20,000 | $6,950 | 35% | 20 | $348 | 10.26 |
| Domiciliarios VIDEO - API | $20,000 | $5,343 | 27% | 13 | $411 | 9.33 |
| Domiciliarios - API | $35,000 | $4,313 | 12% | 9 | $479 | 7.19 |
| Motorizados - API | $20,000 | $3,197 | 16% | 5 | $639 | 5.90 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $62,513 | 146 | **$428** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,097**/pedido |
| utilidad estimada de lo que va del día | **$229,666** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $733 | $696 | 🟢 |
| Motorizados - INTER | — | — | — | — | $402 | $319 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $289 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $554 | 🔴 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $546 | $506 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $348 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $388 | $411 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $482 | $479 | 🟡 |
| Motorizados - API | $675 | $465 | $522 | $311 | $509 | $639 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.99 | 10.24 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.12 | 15.27 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | 14.84 | 10.45 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.77 | 8.46 | 🔴 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.34 | 7.46 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.28 | 10.26 | 🟡 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.44 | 9.33 | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.63 | 7.19 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.57 | 5.90 | 🔴 |

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
| 2026-09-29 | $233,999 | 525 | $446 | $4,784 | 10.73 | $816,643 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
