# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 01:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$158,188** |
| gastado hoy (hasta las 0h) | $2,996 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $195,640 |
| saldo proyectado a medianoche | $-34,456 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $194,866 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $3,803 | 6 | **$634** | $4,417 | 6.97 |
| 2026-10-01 | $2,851 | 4 | **$713** | $4,090 | 5.74 |
| 2026-10-02 | $1,793 | 6 | **$299** | $3,615 | 12.10 |
| 2026-10-03 | $2,104 | 5 | **$421** | $3,032 | 7.20 |
| 2026-10-04 **HOY** | $3,160 | 8 | **$395** | $2,717 | 6.88 |

🟢 **Hoy va mejor que ayer a la misma hora** ($395 vs $421).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   395  =  $ 2,717  ÷  6.88
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,717 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.88 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $20,000 | $595 | 3% | 1 | $595 | 4.02 |
| Domiciliarios - Expancion - API | $40,000 | $548 | 1% | 1 | $548 | 5.85 |
| TEST Creativos - API | $40,000 | $430 | 1% | 1 | $430 | 8.62 |
| Motorizados - API | $20,000 | $360 | 2% | 1 | $360 | 7.94 |
| Domiciliarios - API | $35,000 | $339 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $323 | 2% | 2 | $162 | 20.83 |
| Domiciliarios VIDEO - API | $20,000 | $194 | 1% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $188 | 1% | 1 | $188 | 11.49 |
| Domiciliarios INTER - API | $20,000 | $177 | 1% | 1 | $177 | 8.33 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $3,154 | 8 | **$394** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,693**/pedido |
| utilidad estimada de lo que va del día | **$12,856** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $294 | $595 | 🔴 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $592 | 🔴 |
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $430 | 🟢 |
| Motorizados - API | $510 | $519 | $597 | $382 | $275 | $360 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $508 | $175 | 🟢 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | — | 🟡 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | — | 🟢 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $278 | $188 | 🟢 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $140 | $177 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.97 | 4.02 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.89 | 5.59 | 🔴 |
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.45 | 8.62 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.13 | 7.94 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.49 | 19.80 | 🟢 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.55 | — | 🔴 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.19 | — | 🟢 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.47 | 11.49 | 🟡 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.67 | 8.33 | 🔴 |

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
| 2026-10-03 | $181,712 | 541 | $336 | $3,113 | 9.27 | $900,949 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
