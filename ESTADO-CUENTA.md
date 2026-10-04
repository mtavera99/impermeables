# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 13:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$52,590** |
| gastado hoy (hasta las 13h) | $108,225 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $212,315 |
| saldo proyectado a medianoche | $-51,500 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $195,235 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $122,377 | 280 | **$437** | $4,269 | 9.77 |
| 2026-10-01 | $99,967 | 242 | **$413** | $3,374 | 8.17 |
| 2026-10-02 | $91,217 | 230 | **$397** | $3,520 | 8.88 |
| 2026-10-03 | $90,056 | 273 | **$330** | $3,368 | 10.21 |
| 2026-10-04 **HOY** | $108,225 | 266 | **$407** | $2,989 | 7.35 |

🟠 Hoy va 23% más caro que ayer a la misma hora ($407 vs $330).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   407  =  $ 2,989  ÷  7.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,989 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.35 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $21,623 | 54% | 36 | $601 | 7.45 |
| Domiciliarios - Expancion - API | $40,000 | $18,926 | 47% | 39 | $485 | 6.42 |
| Domiciliarios - API | $35,000 | $15,983 | 46% | 33 | $484 | 6.81 |
| Domiciliarios VIDEO - API | $20,000 | $9,771 | 49% | 24 | $407 | 5.85 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,410 | 47% | 37 | $254 | 12.08 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,363 | 47% | 30 | $312 | 7.91 |
| Motorizados - API | $20,000 | $9,281 | 46% | 14 | $663 | 4.30 |
| Motorizados - INTER | $20,000 | $7,001 | 35% | 16 | $438 | 6.57 |
| Domiciliarios INTER - API | $20,000 | $6,867 | 34% | 37 | $186 | 9.71 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $108,225 | 266 | **$407** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,844**/pedido |
| utilidad estimada de lo que va del día | **$424,100** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $601 | 🔴 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $485 | 🔴 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $484 | 🟡 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $407 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $510 | $254 | 🟢 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $312 | 🟡 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $663 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $438 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $141 | $186 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.42 | 7.45 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.85 | 6.42 | 🔴 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.52 | 6.81 | 🟡 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.15 | 5.85 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.45 | 12.08 | 🟢 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.94 | 7.91 | 🟡 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.09 | 4.30 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.40 | 6.57 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.57 | 9.71 | 🔴 |

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
| 2026-10-03 | $181,981 | 541 | $336 | $3,103 | 9.22 | $900,680 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
