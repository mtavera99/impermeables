# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 18:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$205,970** |
| gastado hoy (hasta las 18h) | $136,140 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $193,300 |
| saldo proyectado a medianoche | $148,810 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $13,940 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $182,357 | 377 | **$484** | $4,863 | 10.05 |
| 2026-09-30 | $184,247 | 393 | **$469** | $4,184 | 8.92 |
| 2026-10-01 | $150,395 | 380 | **$396** | $3,296 | 8.33 |
| 2026-10-02 | $150,823 | 378 | **$399** | $3,496 | 8.76 |
| 2026-10-03 **HOY** | $136,140 | 405 | **$336** | $3,251 | 9.67 |

🟢 **Hoy va mejor que ayer a la misma hora** ($336 vs $399).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   336  =  $ 3,251  ÷  9.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,251 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.67 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $24,961 | 62% | 54 | $462 | 11.36 |
| Domiciliarios - Expancion - API | $40,000 | $23,340 | 58% | 52 | $449 | 7.79 |
| Domiciliarios - API | $35,000 | $23,159 | 66% | 48 | $482 | 6.68 |
| Domiciliarios VIDEO - API | $20,000 | $14,219 | 71% | 48 | $296 | 9.47 |
| Motorizados - API | $20,000 | $12,629 | 63% | 43 | $294 | 9.76 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,691 | 53% | 38 | $281 | 9.57 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,042 | 50% | 19 | $529 | 6.32 |
| Domiciliarios INTER - API | $20,000 | $8,875 | 44% | 76 | $117 | 17.57 |
| Motorizados - INTER | $20,000 | $8,224 | 41% | 27 | $305 | 10.82 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $136,140 | 405 | **$336** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,002**/pedido |
| utilidad estimada de lo que va del día | **$674,355** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $588 | $735 | $555 | $679 | $503 | $462 | 🟢 |
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $456 | $449 | 🟡 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $433 | $482 | 🟡 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $345 | $296 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $597 | $382 | $294 | 🟢 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $462 | $281 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $431 | $529 | 🔴 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $117 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $260 | $305 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.02 | 11.36 | 🟡 |
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.83 | 7.79 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 7.99 | 6.68 | 🔴 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.26 | 9.47 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.12 | 9.76 | 🟢 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.59 | 9.57 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 7.97 | 6.32 | 🔴 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 12.98 | 17.57 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.45 | 10.82 | 🔴 |

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
| 2026-10-02 | $207,422 | 549 | $378 | $3,363 | 8.90 | $891,249 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
