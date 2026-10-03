# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 12:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$272,762** |
| gastado hoy (hasta las 12h) | $70,155 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $191,554 |
| saldo proyectado a medianoche | $151,362 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $13,133 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $116,215 | 244 | **$476** | $5,006 | 10.51 |
| 2026-09-30 | $109,737 | 257 | **$427** | $4,268 | 10.00 |
| 2026-10-01 | $91,237 | 217 | **$420** | $3,393 | 8.07 |
| 2026-10-02 | $81,239 | 203 | **$400** | $3,504 | 8.76 |
| 2026-10-03 **HOY** | $70,155 | 225 | **$312** | $3,440 | 11.03 |

🟢 **Hoy va mejor que ayer a la misma hora** ($312 vs $400).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   312  =  $ 3,440  ÷  11.03
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,440 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.03 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $12,960 | 32% | 25 | $518 | 10.57 |
| Domiciliarios - Expancion - API | $40,000 | $12,560 | 31% | 32 | $392 | 9.68 |
| Domiciliarios - API | $35,000 | $12,335 | 35% | 31 | $398 | 8.67 |
| Domiciliarios VIDEO - API | $20,000 | $8,294 | 41% | 35 | $237 | 12.56 |
| Motorizados - API | $20,000 | $6,386 | 32% | 24 | $266 | 11.74 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,378 | 27% | 22 | $244 | 10.56 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,268 | 26% | 11 | $479 | 7.24 |
| Domiciliarios INTER - API | $20,000 | $3,750 | 19% | 31 | $121 | 17.70 |
| Motorizados - INTER | $20,000 | $3,178 | 16% | 13 | $244 | 13.77 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $70,109 | 224 | **$313** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,726**/pedido |
| utilidad estimada de lo que va del día | **$378,165** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $588 | $735 | $555 | $679 | $502 | $518 | 🟡 |
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $455 | $392 | 🟢 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $433 | $399 | 🟢 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $344 | $237 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $597 | $381 | $266 | 🟢 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $461 | $244 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $431 | $479 | 🟡 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $121 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $260 | $244 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.04 | 10.57 | 🟡 |
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.84 | 9.68 | 🟢 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.00 | 8.63 | 🟢 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.27 | 12.56 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.13 | 11.74 | 🟢 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.61 | 10.56 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 7.97 | 7.24 | 🟡 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 12.98 | 17.70 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.48 | 13.77 | 🟡 |

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
| 2026-10-02 | $207,159 | 549 | $377 | $3,363 | 8.91 | $891,512 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
