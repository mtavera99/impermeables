# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 07:45 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$174,841** |
| gastado hoy (hasta las 7h) | $38,160 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $190,732 |
| saldo proyectado a medianoche | $22,270 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $143,049 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $15,426 | 25 | **$617** | $5,743 | 9.31 |
| 2026-09-27 | $16,273 | 22 | **$740** | $6,113 | 8.26 |
| 2026-09-28 | $81,590 | 98 | **$833** | $5,006 | 6.01 |
| 2026-09-29 | $42,111 | 97 | **$434** | $5,051 | 11.63 |
| 2026-09-30 **HOY** | $38,160 | 87 | **$439** | $4,240 | 9.67 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($439 vs $434).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   439  =  $ 4,240  ÷  9.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,240 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.67 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $6,877 | 17% | 10 | $688 | 10.95 |
| Motorizados - INTER | $20,000 | $5,876 | 29% | 19 | $309 | 16.06 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,572 | 28% | 8 | $696 | 6.36 |
| Domiciliarios INTER - API | $20,000 | $5,500 | 28% | 19 | $289 | 10.60 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,008 | 20% | 8 | $501 | 7.16 |
| Domiciliarios - Expancion - API | $40,000 | $3,216 | 8% | 8 | $402 | 8.94 |
| Domiciliarios VIDEO - API | $20,000 | $2,949 | 15% | 6 | $492 | 7.81 |
| Domiciliarios - API | $35,000 | $2,387 | 7% | 6 | $398 | 9.26 |
| Motorizados - API | $20,000 | $1,775 | 9% | 3 | $592 | 7.04 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $38,160 | 87 | **$439** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,222**/pedido |
| utilidad estimada de lo que va del día | **$135,946** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $732 | $688 | 🟢 |
| Motorizados - INTER | — | — | — | — | $400 | $309 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $446 | $696 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $289 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $501 | 🟡 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $545 | $402 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $387 | $492 | 🔴 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $482 | $398 | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $508 | $592 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 10.00 | 10.95 | 🟢 |
| Motorizados - INTER | — | — | — | — | 13.14 | 16.06 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.79 | 6.36 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.85 | 10.60 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.29 | 7.16 | 🔴 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.35 | 8.94 | 🟢 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.47 | 7.81 | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.64 | 9.26 | 🟢 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.59 | 7.04 | 🟡 |

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
| 2026-09-29 | $233,624 | 525 | $445 | $4,783 | 10.75 | $817,018 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
