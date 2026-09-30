# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 03:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$206,776** |
| gastado hoy (hasta las 3h) | $7,762 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $197,593 |
| saldo proyectado a medianoche | $16,945 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $141,512 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $2,874 | 3 | **$958** | $5,725 | 5.98 |
| 2026-09-27 | $2,136 | 7 | **$305** | $5,122 | 16.79 |
| 2026-09-28 | $43,233 | 24 | **$1,801** | $6,256 | 3.47 |
| 2026-09-29 | $5,040 | 12 | **$420** | $5,833 | 13.89 |
| 2026-09-30 **HOY** | $7,762 | 24 | **$323** | $4,322 | 13.36 |

🟢 **Hoy va mejor que ayer a la misma hora** ($323 vs $420).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   323  =  $ 4,322  ÷  13.36
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,322 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 13.36 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - INTER | $20,000 | $2,014 | 10% | 7 | $288 | 15.25 |
| Domiciliarios INTER - API | $20,000 | $1,880 | 9% | 8 | $235 | 15.33 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,139 | 6% | 1 | $1,139 | 3.68 |
| Domiciliarios - Expancion - INTER | $20,000 | $811 | 4% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $724 | 2% | 2 | $362 | 27.40 |
| Domiciliarios - Expancion - API | $40,000 | $401 | 1% | 3 | $134 | 33.33 |
| Domiciliarios - API | $35,000 | $269 | 1% | 1 | $269 | 14.93 |
| Domiciliarios VIDEO - API | $20,000 | $268 | 1% | 1 | $268 | 17.54 |
| Motorizados - API | $20,000 | $256 | 1% | 1 | $256 | 15.15 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,762 | 24 | **$323** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,850**/pedido |
| utilidad estimada de lo que va del día | **$40,267** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | $398 | $288 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $270 | $235 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $445 | $1,139 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $439 | — |  |
| TEST Creativos - API | $820 | $831 | $861 | $588 | $729 | $362 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $543 | $134 | 🟢 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $478 | $269 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $387 | $268 | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $505 | $256 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| Motorizados - INTER | — | — | — | — | 13.19 | 15.25 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | 14.90 | 15.33 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.85 | 3.68 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.32 | — |  |
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 10.07 | 27.40 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.39 | 33.33 | 🟢 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.68 | 14.93 | 🟢 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.49 | 17.54 | 🟢 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.61 | 15.15 | 🟢 |

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
| 2026-09-29 | $232,715 | 525 | $443 | $4,783 | 10.79 | $817,927 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
