# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 17:20 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$131,510** |
| gastado hoy (hasta las 17h) | $118,302 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $198,032 |
| saldo proyectado a medianoche | $51,780 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $106,238 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $158,850 | 322 | **$493** | $5,221 | 10.58 |
| 2026-09-29 | $169,589 | 353 | **$480** | $4,924 | 10.25 |
| 2026-09-30 | $167,253 | 360 | **$465** | $4,234 | 9.11 |
| 2026-10-01 | $135,739 | 344 | **$395** | $3,311 | 8.39 |
| 2026-10-02 **HOY** | $118,302 | 308 | **$384** | $3,530 | 9.19 |

🟢 **Hoy va mejor que ayer a la misma hora** ($384 vs $395).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   384  =  $ 3,530  ÷  9.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,530 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.19 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $20,882 | 52% | 39 | $535 | 6.70 |
| Domiciliarios - API | $35,000 | $20,106 | 57% | 46 | $437 | 8.35 |
| TEST Creativos - API | $40,000 | $17,885 | 45% | 37 | $483 | 13.33 |
| Domiciliarios VIDEO - API | $20,000 | $13,384 | 67% | 43 | $311 | 9.10 |
| Motorizados - API | $20,000 | $10,537 | 53% | 28 | $376 | 7.61 |
| Domiciliarios INTER - API | $20,000 | $9,964 | 50% | 51 | $195 | 13.91 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,654 | 48% | 23 | $420 | 8.87 |
| Motorizados - INTER | $20,000 | $8,431 | 42% | 29 | $291 | 13.12 |
| Domiciliarios - Expancion - INTER | $20,000 | $7,459 | 37% | 12 | $622 | 4.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $118,302 | 308 | **$384** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,573**/pedido |
| utilidad estimada de lo que va del día | **$498,075** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $535 | 🔴 |
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $437 | 🟡 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $483 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $400 | $311 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $596 | $376 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $195 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $420 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $291 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $622 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.73 | 6.70 | 🟡 |
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.23 | 8.35 | 🟡 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.37 | 13.33 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.77 | 9.10 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.85 | 7.61 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 13.91 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.02 | 8.87 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.18 | 13.12 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.24 | 4.75 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,450 | 568 | $448 | $4,027 | 8.99 | $882,245 |
| 2026-10-01 | $208,002 | 523 | $398 | $3,272 | 8.23 | $838,637 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
