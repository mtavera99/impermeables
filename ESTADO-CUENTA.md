# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 16:07 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$75,410** |
| gastado hoy (hasta las 16h) | $137,138 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $197,467 |
| saldo proyectado a medianoche | $15,081 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $143,502 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $78,584 | 107 | **$734** | $5,815 | 7.92 |
| 2026-09-27 | $118,276 | 156 | **$758** | $4,424 | 5.84 |
| 2026-09-28 | $151,607 | 306 | **$495** | $5,217 | 10.53 |
| 2026-09-29 | $157,328 | 330 | **$477** | $4,946 | 10.37 |
| 2026-09-30 **HOY** | $137,138 | 310 | **$442** | $4,252 | 9.61 |

🟢 **Hoy va mejor que ayer a la misma hora** ($442 vs $477).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   442  =  $ 4,252  ÷  9.61
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,252 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.61 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $24,875 | 62% | 44 | $565 | 12.11 |
| Domiciliarios - Expancion - API | $40,000 | $17,869 | 45% | 30 | $596 | 6.51 |
| Motorizados - INTER | $20,000 | $16,780 | 84% | 48 | $350 | 14.19 |
| Domiciliarios - Expancion - INTER | $20,000 | $15,182 | 76% | 42 | $361 | 9.79 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,979 | 70% | 20 | $699 | 6.91 |
| Domiciliarios INTER - API | $20,000 | $13,954 | 70% | 50 | $279 | 11.06 |
| Domiciliarios - API | $35,000 | $13,555 | 39% | 27 | $502 | 8.16 |
| Domiciliarios VIDEO - API | $20,000 | $12,288 | 61% | 30 | $410 | 9.33 |
| Motorizados - API | $20,000 | $8,656 | 43% | 19 | $456 | 7.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $137,138 | 310 | **$442** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,266**/pedido |
| utilidad estimada de lo que va del día | **$483,241** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $565 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $596 | 🟡 |
| Motorizados - INTER | — | — | — | — | $403 | $350 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $361 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $699 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $279 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $502 | 🟡 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $410 | 🟡 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $456 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 12.11 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.33 | 6.51 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 14.19 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.28 | 9.79 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 6.91 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.82 | 11.06 | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 8.16 | 🟡 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.40 | 9.33 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 7.92 | 🟢 |

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
| 2026-09-29 | $234,373 | 525 | $446 | $4,783 | 10.71 | $816,269 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
