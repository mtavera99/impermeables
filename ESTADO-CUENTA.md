# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-29 17:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$192,001** |
| gastado hoy (hasta las 17h) | $155,211 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $203,982 |
| saldo proyectado a medianoche | $143,230 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $8,838 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-25 | $100,150 | 119 | **$842** | $4,860 | 5.77 |
| 2026-09-26 | $89,090 | 115 | **$775** | $5,733 | 7.40 |
| 2026-09-27 | $136,074 | 179 | **$760** | $4,358 | 5.73 |
| 2026-09-28 | $158,850 | 322 | **$493** | $5,221 | 10.58 |
| 2026-09-29 **HOY** | $155,211 | 332 | **$468** | $4,946 | 10.58 |

🟢 **Hoy va mejor que ayer a la misma hora** ($468 vs $493).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   468  =  $ 4,946  ÷  10.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,946 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.58 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $20,000 | $22,113 | 111% | 76 | $291 | 14.46 |
| Domiciliarios - Expancion - INTER | $20,000 | $21,976 | 110% | 47 | $468 | 11.06 |
| Motorizados - INTER | $20,000 | $21,332 | 107% | 55 | $388 | 13.49 |
| Domiciliarios - API | $35,000 | $21,300 | 61% | 46 | $463 | 9.61 |
| Domiciliarios - Expancion - API | $40,000 | $20,547 | 51% | 33 | $623 | 6.83 |
| TEST Creativos - API | $40,000 | $20,482 | 51% | 19 | $1,078 | 7.12 |
| Domiciliarios VIDEO INTER - API | $20,000 | $14,648 | 73% | 32 | $458 | 13.72 |
| Motorizados - API | $20,000 | $9,047 | 45% | 18 | $503 | 7.53 |
| Domiciliarios VIDEO - API | $20,000 | $3,766 | 19% | 6 | $628 | 7.55 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $155,211 | 332 | **$468** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,566**/pedido |
| utilidad estimada de lo que va del día | **$509,195** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | $291 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | $468 |  |
| Motorizados - INTER | — | — | — | — | — | $388 |  |
| Domiciliarios - API | $1,108 | $1,005 | $992 | $676 | $433 | $463 | 🟡 |
| Domiciliarios - Expancion - API | $1,140 | $734 | $643 | $648 | $408 | $623 | 🔴 |
| TEST Creativos - API | $757 | $820 | $831 | $861 | $588 | $1,078 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | $458 |  |
| Motorizados - API | $701 | $675 | $465 | $522 | $310 | $503 | 🔴 |
| Domiciliarios VIDEO - API | $681 | $698 | $701 | $496 | $881 | $628 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | — | — | — | — | — | 14.46 |  |
| Domiciliarios - Expancion - INTER | — | — | — | — | — | 11.06 |  |
| Motorizados - INTER | — | — | — | — | — | 13.49 |  |
| Domiciliarios - API | 4.04 | 5.46 | 5.71 | 6.36 | 12.59 | 9.61 | 🔴 |
| Domiciliarios - Expancion - API | 2.81 | 5.38 | 6.56 | 5.27 | 9.43 | 6.83 | 🔴 |
| TEST Creativos - API | 10.08 | 8.98 | 9.92 | 8.91 | 12.22 | 7.12 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | — | 13.72 |  |
| Motorizados - API | 5.39 | 7.40 | 10.38 | 7.75 | 13.64 | 7.53 | 🔴 |
| Domiciliarios VIDEO - API | 6.86 | 6.85 | 7.30 | 8.47 | 6.66 | 7.55 | 🟢 |

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
| 2026-09-28 | $195,165 | 426 | $458 | $5,064 | 11.05 | $657,356 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
