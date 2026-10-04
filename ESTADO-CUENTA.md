# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 07:31 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$136,441** |
| gastado hoy (hasta las 7h) | $24,373 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $184,892 |
| saldo proyectado a medianoche | $-24,078 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $195,236 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $46,321 | 103 | **$450** | $4,263 | 9.48 |
| 2026-10-01 | $41,026 | 102 | **$402** | $3,153 | 7.84 |
| 2026-10-02 | $35,110 | 88 | **$399** | $3,407 | 8.54 |
| 2026-10-03 | $33,208 | 91 | **$365** | $3,454 | 9.46 |
| 2026-10-04 **HOY** | $24,373 | 66 | **$369** | $2,875 | 7.79 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($369 vs $365).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   369  =  $ 2,875  ÷  7.79
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,875 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.79 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $4,879 | 12% | 9 | $542 | 7.38 |
| Domiciliarios - Expancion - API | $40,000 | $3,969 | 10% | 8 | $496 | 5.95 |
| Domiciliarios - API | $35,000 | $3,628 | 10% | 4 | $907 | 3.54 |
| Domiciliarios VIDEO - API | $20,000 | $2,824 | 14% | 7 | $403 | 5.93 |
| Motorizados - API | $20,000 | $2,344 | 12% | 6 | $391 | 7.40 |
| Domiciliarios VIDEO INTER - API | $20,000 | $2,188 | 11% | 11 | $199 | 15.28 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,001 | 10% | 8 | $250 | 9.98 |
| Domiciliarios INTER - API | $20,000 | $1,382 | 7% | 10 | $138 | 12.41 |
| Motorizados - INTER | $20,000 | $1,158 | 6% | 3 | $386 | 6.47 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $24,373 | 66 | **$369** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,396**/pedido |
| utilidad estimada de lo que va del día | **$107,708** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $542 | 🟡 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $496 | 🔴 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $907 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $403 | 🔴 |
| Motorizados - API | $510 | $519 | $597 | $382 | $275 | $391 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $509 | $199 | 🟢 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $250 | 🟢 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $140 | $138 | 🟡 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $386 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.43 | 7.38 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.87 | 5.95 | 🔴 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.54 | 3.54 | 🔴 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.17 | 5.93 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.12 | 7.40 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.47 | 15.28 | 🟢 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.95 | 9.98 | 🟢 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.62 | 12.41 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.42 | 6.47 | 🔴 |

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
| 2026-10-03 | $181,883 | 541 | $336 | $3,108 | 9.25 | $900,778 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
