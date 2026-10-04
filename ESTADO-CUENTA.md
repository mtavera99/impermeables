# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 14:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$38,147** |
| gastado hoy (hasta las 14h) | $122,907 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $217,284 |
| saldo proyectado a medianoche | $-56,230 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $194,996 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $132,422 | 294 | **$450** | $4,274 | 9.49 |
| 2026-10-01 | $107,112 | 261 | **$410** | $3,370 | 8.21 |
| 2026-10-02 | $99,459 | 250 | **$398** | $3,523 | 8.85 |
| 2026-10-03 | $101,251 | 298 | **$340** | $3,350 | 9.86 |
| 2026-10-04 **HOY** | $122,907 | 307 | **$400** | $2,945 | 7.36 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($400 vs $340).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   400  =  $ 2,945  ÷  7.36
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,945 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.36 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $24,009 | 60% | 42 | $572 | 7.69 |
| Domiciliarios - Expancion - API | $40,000 | $21,634 | 54% | 50 | $433 | 7.17 |
| Domiciliarios - API | $35,000 | $17,802 | 51% | 35 | $509 | 6.30 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,886 | 54% | 32 | $340 | 7.21 |
| Domiciliarios VIDEO - API | $20,000 | $10,725 | 54% | 26 | $412 | 5.77 |
| Domiciliarios VIDEO INTER - API | $20,000 | $10,619 | 53% | 41 | $259 | 11.81 |
| Motorizados - API | $20,000 | $10,491 | 52% | 17 | $617 | 4.57 |
| Motorizados - INTER | $20,000 | $8,439 | 42% | 21 | $402 | 7.04 |
| Domiciliarios INTER - API | $20,000 | $8,302 | 42% | 43 | $193 | 9.29 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $122,907 | 307 | **$400** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,766**/pedido |
| utilidad estimada de lo que va del día | **$491,468** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $572 | 🔴 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $433 | 🟡 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $509 | 🟡 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $340 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $412 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $510 | $259 | 🟢 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $617 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $402 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $141 | $193 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.42 | 7.69 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.85 | 7.17 | 🟡 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.52 | 6.30 | 🟡 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.94 | 7.21 | 🔴 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.14 | 5.77 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.45 | 11.81 | 🟢 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.09 | 4.57 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.39 | 7.04 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.57 | 9.29 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,472 | 549 | $378 | $3,362 | 8.90 | $891,199 |
| 2026-10-03 | $181,993 | 541 | $336 | $3,102 | 9.22 | $900,668 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
