# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 15:06 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$85,785** |
| gastado hoy (hasta las 15h) | $127,314 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $196,040 |
| saldo proyectado a medianoche | $17,058 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $142,951 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $69,875 | 96 | **$728** | $5,861 | 8.05 |
| 2026-09-27 | $98,031 | 133 | **$737** | $4,611 | 6.26 |
| 2026-09-28 | $145,168 | 287 | **$506** | $5,193 | 10.27 |
| 2026-09-29 | $146,919 | 300 | **$490** | $4,967 | 10.14 |
| 2026-09-30 **HOY** | $127,314 | 292 | **$436** | $4,266 | 9.78 |

🟢 **Hoy va mejor que ayer a la misma hora** ($436 vs $490).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   436  =  $ 4,266  ÷  9.78
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,266 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.78 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $22,895 | 57% | 41 | $558 | 12.51 |
| Domiciliarios - Expancion - API | $40,000 | $16,241 | 41% | 26 | $625 | 6.24 |
| Motorizados - INTER | $20,000 | $16,105 | 81% | 47 | $343 | 14.44 |
| Domiciliarios - Expancion - INTER | $20,000 | $14,403 | 72% | 40 | $360 | 9.87 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,478 | 67% | 20 | $674 | 7.21 |
| Domiciliarios INTER - API | $20,000 | $13,286 | 66% | 49 | $271 | 11.31 |
| Domiciliarios - API | $35,000 | $11,980 | 34% | 26 | $461 | 8.96 |
| Domiciliarios VIDEO - API | $20,000 | $11,278 | 56% | 26 | $434 | 8.79 |
| Motorizados - API | $20,000 | $7,648 | 38% | 17 | $450 | 8.02 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $127,314 | 292 | **$436** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,191**/pedido |
| utilidad estimada de lo que va del día | **$457,043** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $558 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $625 | 🟡 |
| Motorizados - INTER | — | — | — | — | $402 | $343 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $360 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $674 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $271 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $461 | 🟡 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $434 | 🟡 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $450 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 12.51 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.33 | 6.24 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 14.44 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.28 | 9.87 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 7.21 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.82 | 11.31 | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.62 | 8.96 | 🟡 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.40 | 8.79 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.55 | 8.02 | 🟢 |

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
| 2026-09-29 | $234,320 | 525 | $446 | $4,782 | 10.72 | $816,322 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
