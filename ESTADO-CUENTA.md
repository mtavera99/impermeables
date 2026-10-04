# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 09:31 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$111,853** |
| gastado hoy (hasta las 9h) | $48,450 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $189,214 |
| saldo proyectado a medianoche | $-28,912 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $195,747 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $70,459 | 158 | **$446** | $4,182 | 9.38 |
| 2026-10-01 | $61,538 | 151 | **$408** | $3,269 | 8.02 |
| 2026-10-02 | $55,067 | 135 | **$408** | $3,424 | 8.39 |
| 2026-10-03 | $52,792 | 159 | **$332** | $3,474 | 10.46 |
| 2026-10-04 **HOY** | $48,602 | 122 | **$398** | $3,013 | 7.56 |

🟠 Hoy va 20% más caro que ayer a la misma hora ($398 vs $332).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   398  =  $ 3,013  ÷  7.56
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,013 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.56 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $10,204 | 26% | 20 | $510 | 8.21 |
| Domiciliarios - Expancion - API | $40,000 | $8,687 | 22% | 17 | $511 | 6.00 |
| Domiciliarios - API | $35,000 | $7,184 | 21% | 13 | $553 | 5.99 |
| Domiciliarios VIDEO - API | $20,000 | $5,167 | 26% | 12 | $431 | 5.46 |
| Motorizados - API | $20,000 | $4,586 | 23% | 8 | $573 | 5.41 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,061 | 20% | 16 | $254 | 12.11 |
| Domiciliarios - Expancion - INTER | $20,000 | $3,690 | 18% | 10 | $369 | 7.06 |
| Domiciliarios INTER - API | $20,000 | $2,786 | 14% | 17 | $164 | 11.17 |
| Motorizados - INTER | $20,000 | $2,280 | 11% | 9 | $253 | 11.64 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $48,645 | 122 | **$399** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,747**/pedido |
| utilidad estimada de lo que va del día | **$195,504** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $510 | 🟡 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $511 | 🔴 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $553 | 🔴 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $431 | 🔴 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $573 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $509 | $254 | 🟢 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $369 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $140 | $164 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $253 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.43 | 8.21 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.86 | 6.00 | 🔴 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.53 | 5.99 | 🟡 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.16 | 5.46 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.10 | 5.41 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.46 | 12.11 | 🟢 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.94 | 7.06 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.59 | 11.17 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.42 | 11.64 | 🟡 |

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
| 2026-10-03 | $181,916 | 541 | $336 | $3,106 | 9.24 | $900,745 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
