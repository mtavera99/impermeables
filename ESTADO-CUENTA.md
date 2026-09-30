# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 00:41 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$112,369** |
| gastado hoy (hasta las 0h) | $2,162 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $213,212 |
| saldo proyectado a medianoche | $-98,680 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $241,519 — entra en zona de freno a las 10:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $1,273 | 1 | **$1,273** | $6,210 | 4.88 |
| 2026-09-27 | $872 | 2 | **$436** | $4,791 | 10.99 |
| 2026-09-28 | $4,408 | 6 | **$735** | $4,190 | 5.70 |
| 2026-09-29 | $954 | 2 | **$477** | $5,300 | 11.11 |
| 2026-09-30 **HOY** | $2,162 | 3 | **$721** | $4,731 | 6.56 |

🟠 Hoy va 51% más caro que ayer a la misma hora ($721 vs $477).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   721  =  $ 4,731  ÷  6.56
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,731 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 6.56 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - INTER | $20,000 | $721 | 4% | 2 | $360 | 14.81 |
| Domiciliarios INTER - API | $20,000 | $638 | 3% | 1 | $638 | 6.41 |
| Domiciliarios VIDEO INTER - API | $20,000 | $179 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $142 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $134 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $126 | 0% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $108 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $70 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $44 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,162 | 3 | **$721** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$8,579**/pedido |
| utilidad estimada de lo que va del día | **$3,842** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | $397 | $360 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $270 | $638 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $445 | — |  |
| TEST Creativos - API | $820 | $831 | $861 | $588 | $726 | — | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $439 | — |  |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $542 | — | 🔴 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $477 | — | 🟡 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $385 | — | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $504 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | 13.22 | 14.81 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | 14.91 | 6.41 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.87 | — |  |
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 10.10 | — | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.33 | — |  |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.41 | — | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.70 | — | 🔴 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.54 | — | 🟢 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.63 | — | 🔴 |

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
| 2026-09-29 | $232,241 | 525 | $442 | $4,783 | 10.81 | $818,401 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
