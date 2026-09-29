# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 16:09 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$55,482** |
| gastado hoy (hasta las 16h) | $141,758 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $203,044 |
| saldo proyectado a medianoche | $-5,804 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $158,810 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $93,780 | 113 | **$830** | $4,823 | 5.81 |
| 2026-09-26 | $78,584 | 107 | **$734** | $5,815 | 7.92 |
| 2026-09-27 | $118,276 | 156 | **$758** | $4,424 | 5.84 |
| 2026-09-28 | $151,607 | 306 | **$495** | $5,217 | 10.53 |
| 2026-09-29 **HOY** | $141,758 | 299 | **$474** | $4,967 | 10.48 |

🟢 **Hoy va mejor que ayer a la misma hora** ($474 vs $495).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   474  =  $ 4,967  ÷  10.48
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,967 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.48 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $20,000 | $21,042 | 105% | 46 | $457 | 11.33 |
| Domiciliarios INTER - API | $20,000 | $20,812 | 104% | 68 | $306 | 13.73 |
| Motorizados - INTER | $20,000 | $19,890 | 99% | 52 | $382 | 13.76 |
| Domiciliarios - API | $35,000 | $19,102 | 55% | 40 | $478 | 9.56 |
| Domiciliarios - Expancion - API | $40,000 | $18,510 | 46% | 30 | $617 | 7.00 |
| TEST Creativos - API | $40,000 | $17,248 | 43% | 15 | $1,150 | 6.47 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,642 | 68% | 28 | $487 | 13.00 |
| Motorizados - API | $20,000 | $8,048 | 40% | 14 | $575 | 6.70 |
| Domiciliarios VIDEO - API | $20,000 | $3,464 | 17% | 6 | $577 | 8.39 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $141,758 | 299 | **$474** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,644**/pedido |
| utilidad estimada de lo que va del día | **$456,608** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $457 |  |
| Domiciliarios INTER - API | — | — | — | — | — | $306 |  |
| Motorizados - INTER | — | — | — | — | — | $382 |  |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $433 | $478 | 🟡 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $617 | 🔴 |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $588 | $1,150 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $487 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $310 | $575 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $577 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 11.33 |  |
| Domiciliarios INTER - API | — | — | — | — | — | 13.73 |  |
| Motorizados - INTER | — | — | — | — | — | 13.76 |  |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.59 | 9.56 | 🔴 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.43 | 7.00 | 🔴 |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 6.47 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 13.00 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.64 | 6.70 | 🔴 |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.66 | 8.39 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,154 | 426 | $458 | $5,064 | 11.05 | $657,367 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
