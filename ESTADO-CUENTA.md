# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 01:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$218,397** |
| gastado hoy (hasta las 1h) | $5,171 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $235,186 |
| saldo proyectado a medianoche | $-11,618 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $132,482 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-01 | $4,661 | 10 | **$466** | $4,060 | 8.71 |
| 2026-10-02 | $3,342 | 11 | **$304** | $4,061 | 13.37 |
| 2026-10-03 | $3,375 | 8 | **$422** | $3,027 | 7.17 |
| 2026-10-04 | $5,732 | 14 | **$409** | $2,843 | 6.94 |
| 2026-10-05 **HOY** | $5,171 | 14 | **$369** | $2,587 | 7.00 |

🟢 **Hoy va mejor que ayer a la misma hora** ($369 vs $409).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   369  =  $ 2,587  ÷  7.00
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,587 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.00 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $887 | 2% | 1 | $887 | 3.33 |
| Domiciliarios - Expancion - API | $40,000 | $728 | 2% | 2 | $364 | 8.00 |
| Domiciliarios - API | $35,000 | $711 | 2% | 2 | $356 | 7.12 |
| Domiciliarios VIDEO INTER - API | $20,000 | $692 | 3% | 3 | $231 | 12.82 |
| Domiciliarios - Expancion - INTER | $20,000 | $690 | 3% | 1 | $690 | 3.95 |
| Motorizados - API | $20,000 | $479 | 2% | 1 | $479 | 4.52 |
| Motorizados - INTER | $20,000 | $376 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $324 | 2% | 3 | $108 | 17.96 |
| Domiciliarios INTER - API | $20,000 | $284 | 1% | 1 | $284 | 5.43 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $5,171 | 14 | **$369** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,397**/pedido |
| utilidad estimada de lo que va del día | **$22,846** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $555 | $679 | $503 | $482 | $475 | $887 | 🔴 |
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $475 | $364 | 🟢 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $459 | $356 | 🟢 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $341 | $231 | 🟢 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $417 | $690 | 🔴 |
| Motorizados - API | $519 | $597 | $382 | $276 | $400 | $479 | 🔴 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $335 | — | 🔴 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $320 | $108 | 🟢 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $220 | $284 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.96 | 3.33 | 🔴 |
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.40 | 8.00 | 🟢 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.48 | 7.12 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.76 | 12.82 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.66 | 3.95 | 🔴 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.42 | 4.52 | 🔴 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.16 | — | 🔴 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.18 | 17.96 | 🟢 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.93 | 5.43 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $891,199 |
| 2026-10-03 | $182,020 | 541 | $336 | $3,100 | 9.21 | $900,641 |
| 2026-10-04 | $287,118 | 748 | $384 | $2,744 | 7.15 | $1,209,797 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
