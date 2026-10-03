# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 13:30 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$262,896** |
| gastado hoy (hasta las 13h) | $78,143 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $190,214 |
| saldo proyectado a medianoche | $150,826 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $15,011 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $127,683 | 266 | **$480** | $4,976 | 10.37 |
| 2026-09-30 | $122,377 | 280 | **$437** | $4,269 | 9.77 |
| 2026-10-01 | $99,967 | 242 | **$413** | $3,374 | 8.17 |
| 2026-10-02 | $91,217 | 230 | **$397** | $3,520 | 8.88 |
| 2026-10-03 **HOY** | $78,143 | 254 | **$308** | $3,398 | 11.05 |

🟢 **Hoy va mejor que ayer a la misma hora** ($308 vs $397).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   308  =  $ 3,398  ÷  11.05
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,398 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.05 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,276 | 36% | 36 | $397 | 9.66 |
| TEST Creativos - API | $40,000 | $14,136 | 35% | 29 | $487 | 11.18 |
| Domiciliarios - API | $35,000 | $13,659 | 39% | 34 | $402 | 8.43 |
| Domiciliarios VIDEO - API | $20,000 | $9,098 | 45% | 38 | $239 | 12.25 |
| Motorizados - API | $20,000 | $7,191 | 36% | 26 | $277 | 11.02 |
| Domiciliarios - Expancion - INTER | $20,000 | $6,077 | 30% | 24 | $253 | 10.26 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,799 | 29% | 12 | $483 | 7.10 |
| Domiciliarios INTER - API | $20,000 | $4,432 | 22% | 41 | $108 | 19.50 |
| Motorizados - INTER | $20,000 | $3,475 | 17% | 14 | $248 | 13.33 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $78,143 | 254 | **$308** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,662**/pedido |
| utilidad estimada de lo que va del día | **$430,168** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $455 | $397 | 🟢 |
| TEST Creativos - API | $588 | $735 | $555 | $679 | $502 | $487 | 🟡 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $433 | $402 | 🟢 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $344 | $239 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $597 | $382 | $277 | 🟢 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $461 | $253 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $431 | $483 | 🟡 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $108 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $260 | $248 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.84 | 9.66 | 🟢 |
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.03 | 11.18 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.00 | 8.43 | 🟢 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.27 | 12.25 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.12 | 11.02 | 🟢 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.61 | 10.26 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 7.97 | 7.10 | 🟡 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 12.98 | 19.50 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.48 | 13.33 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,209 | 549 | $377 | $3,363 | 8.91 | $891,462 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
