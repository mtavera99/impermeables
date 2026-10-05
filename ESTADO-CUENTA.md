# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 02:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$216,652** |
| gastado hoy (hasta las 2h) | $6,664 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $235,698 |
| saldo proyectado a medianoche | $-12,382 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $132,734 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-01 | $5,936 | 13 | **$457** | $3,984 | 8.72 |
| 2026-10-02 | $4,151 | 14 | **$296** | $3,946 | 13.31 |
| 2026-10-03 | $4,200 | 13 | **$323** | $3,072 | 9.51 |
| 2026-10-04 | $7,009 | 18 | **$389** | $2,858 | 7.34 |
| 2026-10-05 **HOY** | $6,664 | 23 | **$290** | $2,562 | 8.84 |

🟢 **Hoy va mejor que ayer a la misma hora** ($290 vs $389).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   290  =  $ 2,562  ÷  8.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,562 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.84 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $1,116 | 3% | 2 | $558 | 5.01 |
| Domiciliarios - Expancion - API | $40,000 | $946 | 2% | 4 | $236 | 12.38 |
| Domiciliarios - API | $35,000 | $920 | 3% | 3 | $307 | 8.20 |
| Domiciliarios VIDEO INTER - API | $20,000 | $872 | 4% | 4 | $218 | 13.51 |
| Domiciliarios - Expancion - INTER | $20,000 | $843 | 4% | 3 | $281 | 9.32 |
| Motorizados - API | $20,000 | $690 | 3% | 2 | $345 | 6.76 |
| Motorizados - INTER | $20,000 | $466 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $446 | 2% | 3 | $149 | 13.76 |
| Domiciliarios INTER - API | $20,000 | $365 | 2% | 2 | $182 | 8.44 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $6,664 | 23 | **$290** | $2,402 | **12%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,449**/pedido |
| utilidad estimada de lo que va del día | **$39,364** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $555 | $679 | $503 | $482 | $475 | $558 | 🔴 |
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $475 | $236 | 🟢 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $459 | $307 | 🟢 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $341 | $218 | 🟢 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $417 | $281 | 🟢 |
| Motorizados - API | $519 | $597 | $382 | $276 | $400 | $345 | 🟢 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $336 | — | 🔴 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $320 | $149 | 🟢 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $220 | $182 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.96 | 5.01 | 🔴 |
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.40 | 12.38 | 🟢 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.48 | 8.20 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.76 | 13.51 | 🟢 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.65 | 9.32 | 🟢 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.42 | 6.76 | 🟢 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.15 | — | 🔴 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.17 | 13.76 | 🟢 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.92 | 8.44 | 🟢 |

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
| 2026-10-04 | $287,258 | 748 | $384 | $2,744 | 7.15 | $1,209,657 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
