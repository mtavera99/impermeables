# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-05 10:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,059** |
| gastado hoy (hasta las 10h) | $88,376 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $256,538 |
| saldo proyectado a medianoche | $-35,102 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $134,615 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-01 | $70,745 | 171 | **$414** | $3,332 | 8.05 |
| 2026-10-02 | $63,114 | 160 | **$394** | $3,457 | 8.76 |
| 2026-10-03 | $61,798 | 187 | **$330** | $3,493 | 10.57 |
| 2026-10-04 | $72,750 | 177 | **$411** | $3,054 | 7.43 |
| 2026-10-05 **HOY** | $88,376 | 224 | **$395** | $2,527 | 6.40 |

🟢 **Hoy va mejor que ayer a la misma hora** ($395 vs $411).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   395  =  $ 2,527  ÷  6.40
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,527 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.40 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,916 | 37% | 35 | $426 | 6.76 |
| TEST Creativos - API | $40,000 | $14,893 | 37% | 31 | $480 | 6.65 |
| Domiciliarios - API | $35,000 | $14,546 | 42% | 20 | $727 | 3.69 |
| Motorizados - API | $20,000 | $8,613 | 43% | 18 | $478 | 5.07 |
| Domiciliarios - Expancion - INTER | $20,000 | $8,292 | 41% | 20 | $415 | 5.26 |
| Domiciliarios VIDEO - API | $20,000 | $7,829 | 39% | 22 | $356 | 5.75 |
| Domiciliarios VIDEO INTER - API | $20,000 | $7,614 | 38% | 32 | $238 | 11.25 |
| Motorizados - INTER | $20,000 | $6,285 | 31% | 20 | $314 | 8.59 |
| Domiciliarios INTER - API | $20,000 | $5,388 | 27% | 26 | $207 | 7.73 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $88,376 | 224 | **$395** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,697**/pedido |
| utilidad estimada de lo que va del día | **$359,898** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $547 | $444 | $456 | $416 | $478 | $426 | 🟢 |
| TEST Creativos - API | $555 | $679 | $503 | $482 | $477 | $480 | 🟡 |
| Domiciliarios - API | $508 | $390 | $433 | $476 | $461 | $727 | 🔴 |
| Motorizados - API | $519 | $597 | $382 | $276 | $402 | $478 | 🔴 |
| Domiciliarios - Expancion - INTER | $394 | $456 | $462 | $295 | $419 | $415 | 🟡 |
| Domiciliarios VIDEO - API | $423 | $400 | $345 | $292 | $322 | $356 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $512 | $431 | $510 | $342 | $238 | 🟢 |
| Motorizados - INTER | $333 | $292 | $260 | $280 | $338 | $314 | 🟢 |
| Domiciliarios INTER - API | $254 | $178 | $183 | $141 | $222 | $207 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | 10-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.61 | 7.72 | 7.83 | 7.84 | 6.37 | 6.76 | 🟢 |
| TEST Creativos - API | 11.64 | 8.36 | 12.02 | 10.41 | 7.92 | 6.65 | 🔴 |
| Domiciliarios - API | 7.46 | 9.23 | 7.98 | 6.51 | 6.44 | 3.69 | 🔴 |
| Motorizados - API | 6.39 | 4.84 | 7.11 | 10.08 | 6.39 | 5.07 | 🔴 |
| Domiciliarios - Expancion - INTER | 8.84 | 5.24 | 5.59 | 8.93 | 5.61 | 5.26 | 🟡 |
| Domiciliarios VIDEO - API | 8.32 | 7.77 | 8.25 | 9.14 | 7.12 | 5.75 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.80 | 6.01 | 7.96 | 6.44 | 8.72 | 11.25 | 🟢 |
| Motorizados - INTER | 15.50 | 11.18 | 13.45 | 11.38 | 8.07 | 8.59 | 🟢 |
| Domiciliarios INTER - API | 12.23 | 12.79 | 12.98 | 14.55 | 7.85 | 7.73 | 🟡 |

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
| 2026-10-04 | $288,851 | 748 | $386 | $2,742 | 7.10 | $1,208,064 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
