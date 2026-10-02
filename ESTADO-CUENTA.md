# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 15:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$147,386** |
| gastado hoy (hasta las 15h) | $103,426 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $205,810 |
| saldo proyectado a medianoche | $45,002 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $105,238 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $145,168 | 287 | **$506** | $5,193 | 10.27 |
| 2026-09-29 | $146,920 | 300 | **$490** | $4,967 | 10.14 |
| 2026-09-30 | $142,136 | 312 | **$456** | $4,265 | 9.36 |
| 2026-10-01 | $115,433 | 283 | **$408** | $3,361 | 8.24 |
| 2026-10-02 **HOY** | $103,426 | 268 | **$386** | $3,541 | 9.18 |

🟢 **Hoy va mejor que ayer a la misma hora** ($386 vs $408).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   386  =  $ 3,541  ÷  9.18
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,541 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.18 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $18,055 | 52% | 38 | $475 | 7.79 |
| Domiciliarios - Expancion - API | $40,000 | $17,744 | 44% | 29 | $612 | 5.82 |
| TEST Creativos - API | $40,000 | $15,596 | 39% | 35 | $446 | 14.30 |
| Domiciliarios VIDEO - API | $20,000 | $12,209 | 61% | 39 | $313 | 9.10 |
| Motorizados - API | $20,000 | $9,606 | 48% | 23 | $418 | 6.89 |
| Domiciliarios INTER - API | $20,000 | $9,104 | 46% | 46 | $198 | 14.03 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,734 | 39% | 20 | $387 | 9.90 |
| Motorizados - INTER | $20,000 | $7,186 | 36% | 28 | $257 | 15.30 |
| Domiciliarios - Expancion - INTER | $20,000 | $6,192 | 31% | 10 | $619 | 4.68 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $103,426 | 268 | **$386** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,594**/pedido |
| utilidad estimada de lo que va del día | **$432,902** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $475 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $612 | 🔴 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $446 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $399 | $313 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $518 | $595 | $418 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $198 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $387 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $257 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $619 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.24 | 7.79 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.73 | 5.82 | 🔴 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.37 | 14.30 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.78 | 9.10 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.85 | 6.89 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 14.03 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.02 | 9.90 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.18 | 15.30 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.25 | 4.68 | 🟡 |

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
| 2026-10-01 | $207,888 | 523 | $397 | $3,272 | 8.23 | $838,751 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
