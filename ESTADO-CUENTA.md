# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 04:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,316** |
| gastado hoy (hasta las 3h) | $7,606 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $196,752 |
| saldo proyectado a medianoche | $-35,830 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $195,128 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $9,155 | 25 | **$366** | $4,431 | 12.10 |
| 2026-10-01 | $7,286 | 14 | **$520** | $3,845 | 7.39 |
| 2026-10-02 | $5,350 | 16 | **$334** | $4,062 | 12.15 |
| 2026-10-03 | $5,628 | 16 | **$352** | $3,318 | 9.43 |
| 2026-10-04 **HOY** | $7,606 | 20 | **$380** | $2,781 | 7.31 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($380 vs $352).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   380  =  $ 2,781  ÷  7.31
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,781 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.31 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $1,364 | 3% | 3 | $455 | 8.67 |
| Domiciliarios - Expancion - API | $40,000 | $1,279 | 3% | 2 | $640 | 4.56 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,008 | 5% | 2 | $504 | 4.87 |
| Motorizados - API | $20,000 | $947 | 5% | 3 | $316 | 10.14 |
| Domiciliarios - API | $35,000 | $938 | 3% | 2 | $469 | 6.02 |
| Domiciliarios VIDEO INTER - API | $20,000 | $710 | 4% | 4 | $178 | 16.53 |
| Domiciliarios VIDEO - API | $20,000 | $610 | 3% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $385 | 2% | 1 | $385 | 5.88 |
| Domiciliarios INTER - API | $20,000 | $365 | 2% | 3 | $122 | 13.16 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,606 | 20 | **$380** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,527**/pedido |
| utilidad estimada de lo que va del día | **$32,418** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $455 | 🟢 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $640 | 🔴 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $294 | $504 | 🔴 |
| Motorizados - API | $510 | $519 | $597 | $382 | $275 | $316 | 🟡 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $469 | 🟡 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $508 | $178 | 🟢 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | — | 🟢 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $279 | $385 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $140 | $122 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.44 | 8.67 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.88 | 4.56 | 🔴 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.96 | 4.87 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.12 | 10.14 | 🟡 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.54 | 6.02 | 🟡 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.48 | 16.53 | 🟢 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.18 | — | 🟢 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.45 | 5.88 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.65 | 13.16 | 🟡 |

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
| 2026-10-03 | $181,797 | 541 | $336 | $3,111 | 9.26 | $900,864 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
