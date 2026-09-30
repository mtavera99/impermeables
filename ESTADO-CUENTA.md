# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 10:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$138,984** |
| gastado hoy (hasta las 10h) | $73,601 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $190,349 |
| saldo proyectado a medianoche | $22,236 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $143,465 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $36,434 | 51 | **$714** | $5,535 | 7.75 |
| 2026-09-27 | $46,297 | 68 | **$681** | $5,582 | 8.20 |
| 2026-09-28 | $107,868 | 173 | **$624** | $5,116 | 8.21 |
| 2026-09-29 | $87,899 | 197 | **$446** | $5,058 | 11.34 |
| 2026-09-30 **HOY** | $73,601 | 177 | **$416** | $4,161 | 10.01 |

🟢 **Hoy va mejor que ayer a la misma hora** ($416 vs $446).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   416  =  $ 4,161  ÷  10.01
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,161 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.01 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $12,896 | 32% | 21 | $614 | 11.39 |
| Motorizados - INTER | $20,000 | $10,281 | 51% | 33 | $312 | 15.54 |
| Domiciliarios INTER - API | $20,000 | $8,857 | 44% | 31 | $286 | 10.61 |
| Domiciliarios VIDEO INTER - API | $20,000 | $8,625 | 43% | 16 | $539 | 8.81 |
| Domiciliarios - Expancion - API | $40,000 | $8,600 | 22% | 17 | $506 | 7.45 |
| Domiciliarios - Expancion - INTER | $20,000 | $8,390 | 42% | 23 | $365 | 9.61 |
| Domiciliarios VIDEO - API | $20,000 | $6,465 | 32% | 15 | $431 | 8.91 |
| Domiciliarios - API | $35,000 | $5,457 | 16% | 13 | $420 | 8.41 |
| Motorizados - API | $20,000 | $4,030 | 20% | 8 | $504 | 7.42 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $73,601 | 177 | **$416** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,950**/pedido |
| utilidad estimada de lo que va del día | **$280,615** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $734 | $614 | 🟢 |
| Motorizados - INTER | — | — | — | — | $402 | $312 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $286 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $539 | 🔴 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $546 | $506 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $365 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $388 | $431 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $482 | $420 | 🟢 |
| Motorizados - API | $675 | $465 | $522 | $311 | $509 | $504 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.99 | 11.39 | 🟢 |
| Motorizados - INTER | — | — | — | — | 13.12 | 15.54 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | 14.84 | 10.61 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.76 | 8.81 | 🔴 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.34 | 7.45 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.28 | 9.61 | 🟡 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.44 | 8.91 | 🔴 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.63 | 8.41 | 🟡 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.56 | 7.42 | 🟡 |

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
| 2026-09-29 | $234,043 | 525 | $446 | $4,783 | 10.73 | $816,599 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
