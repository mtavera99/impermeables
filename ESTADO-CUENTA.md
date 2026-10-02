# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 19:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$150,857** |
| gastado hoy (hasta las 19h) | $157,359 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $200,722 |
| saldo proyectado a medianoche | $107,494 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $47,834 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $164,299 | 229 | **$717** | $4,398 | 6.13 |
| 2026-09-28 | $176,362 | 367 | **$481** | $5,132 | 10.68 |
| 2026-09-29 | $198,154 | 414 | **$479** | $4,808 | 10.05 |
| 2026-09-30 | $203,957 | 441 | **$462** | $4,131 | 8.93 |
| 2026-10-01 **HOY** | $157,359 | 403 | **$390** | $3,263 | 8.36 |

🟢 **Hoy va mejor que ayer a la misma hora** ($390 vs $462).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   390  =  $ 3,263  ÷  8.36
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,263 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.36 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $24,538 | 61% | 33 | $744 | 7.59 |
| Domiciliarios - Expancion - API | $40,000 | $21,745 | 54% | 49 | $444 | 8.02 |
| Domiciliarios - API | $35,000 | $21,025 | 60% | 56 | $375 | 10.04 |
| Domiciliarios VIDEO - API | $20,000 | $18,400 | 92% | 45 | $409 | 7.89 |
| Domiciliarios INTER - API | $20,000 | $15,817 | 79% | 88 | $180 | 12.45 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,559 | 78% | 28 | $556 | 5.48 |
| Motorizados - INTER | $20,000 | $14,689 | 73% | 54 | $272 | 12.07 |
| Domiciliarios - Expancion - INTER | $20,000 | $14,189 | 71% | 32 | $443 | 5.31 |
| Motorizados - API | $20,000 | $11,397 | 57% | 18 | $633 | 4.72 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $157,359 | 403 | **$390** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,648**/pedido |
| utilidad estimada de lo que va del día | **$649,134** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $831 | $861 | $588 | $735 | $555 | $748 | 🔴 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $547 | $444 | 🟢 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $508 | $375 | 🟢 |
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $423 | $409 | 🟡 |
| Domiciliarios INTER - API | — | — | — | $271 | $254 | $180 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $701 | $556 | 🟢 |
| Motorizados - INTER | — | — | — | $403 | $333 | $272 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $393 | $443 | 🟡 |
| Motorizados - API | $465 | $522 | $311 | $510 | $518 | $633 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.64 | 7.53 | 🔴 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.61 | 8.02 | 🟢 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.46 | 10.04 | 🟢 |
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.32 | 7.89 | 🟡 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.23 | 12.45 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.80 | 5.48 | 🔴 |
| Motorizados - INTER | — | — | — | 13.10 | 15.50 | 12.07 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.84 | 5.31 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.40 | 4.72 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,386 | 568 | $448 | $4,026 | 8.99 | $882,309 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
