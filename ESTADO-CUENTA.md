# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-04 10:32 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$99,526** |
| gastado hoy (hasta las 10h) | $61,419 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $193,670 |
| saldo proyectado a medianoche | $-32,726 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $195,105 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-30 | $83,064 | 189 | **$439** | $4,215 | 9.59 |
| 2026-10-01 | $70,745 | 171 | **$414** | $3,332 | 8.05 |
| 2026-10-02 | $63,114 | 160 | **$394** | $3,457 | 8.76 |
| 2026-10-03 | $61,798 | 187 | **$330** | $3,493 | 10.57 |
| 2026-10-04 **HOY** | $61,419 | 148 | **$415** | $3,023 | 7.29 |

🟠 Hoy va 26% más caro que ayer a la misma hora ($415 vs $330).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   415  =  $ 3,023  ÷  7.29
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,023 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.29 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $12,483 | 31% | 24 | $520 | 8.09 |
| Domiciliarios - Expancion - API | $40,000 | $11,064 | 28% | 20 | $553 | 5.61 |
| Domiciliarios - API | $35,000 | $9,327 | 27% | 18 | $518 | 6.51 |
| Domiciliarios VIDEO - API | $20,000 | $6,289 | 31% | 16 | $393 | 5.98 |
| Motorizados - API | $20,000 | $5,452 | 27% | 9 | $606 | 4.86 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,921 | 25% | 18 | $273 | 11.17 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,894 | 24% | 13 | $376 | 6.95 |
| Domiciliarios INTER - API | $20,000 | $3,679 | 18% | 21 | $175 | 10.80 |
| Motorizados - INTER | $20,000 | $3,310 | 17% | 9 | $368 | 8.43 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $61,419 | 148 | **$415** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,940**/pedido |
| utilidad estimada de lo que va del día | **$234,762** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $555 | $679 | $503 | $482 | $520 | 🟡 |
| Domiciliarios - Expancion - API | $548 | $547 | $444 | $456 | $416 | $553 | 🔴 |
| Domiciliarios - API | $483 | $508 | $390 | $433 | $476 | $518 | 🟡 |
| Domiciliarios VIDEO - API | $389 | $423 | $400 | $345 | $292 | $393 | 🔴 |
| Motorizados - API | $510 | $519 | $597 | $382 | $276 | $606 | 🔴 |
| Domiciliarios VIDEO INTER - API | $447 | $701 | $512 | $431 | $510 | $273 | 🟢 |
| Domiciliarios - Expancion - INTER | $440 | $394 | $456 | $462 | $295 | $376 | 🔴 |
| Domiciliarios INTER - API | $271 | $254 | $178 | $183 | $140 | $175 | 🔴 |
| Motorizados - INTER | $403 | $333 | $292 | $260 | $280 | $368 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | 10-04 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.96 | 11.64 | 8.36 | 12.02 | 10.42 | 8.09 | 🔴 |
| Domiciliarios - Expancion - API | 7.32 | 6.61 | 7.72 | 7.83 | 7.86 | 5.61 | 🔴 |
| Domiciliarios - API | 8.61 | 7.46 | 9.23 | 7.98 | 6.53 | 6.51 | 🟡 |
| Domiciliarios VIDEO - API | 11.39 | 8.32 | 7.77 | 8.25 | 9.15 | 5.98 | 🔴 |
| Motorizados - API | 7.54 | 6.39 | 4.84 | 7.11 | 10.10 | 4.86 | 🔴 |
| Domiciliarios VIDEO INTER - API | 13.75 | 6.80 | 6.01 | 7.96 | 6.45 | 11.17 | 🟢 |
| Domiciliarios - Expancion - INTER | 11.27 | 8.84 | 5.24 | 5.59 | 8.94 | 6.95 | 🔴 |
| Domiciliarios INTER - API | 14.81 | 12.23 | 12.79 | 12.98 | 14.59 | 10.80 | 🔴 |
| Motorizados - INTER | 13.10 | 15.50 | 11.18 | 13.45 | 11.41 | 8.43 | 🔴 |

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
| 2026-10-03 | $181,943 | 541 | $336 | $3,105 | 9.23 | $900,718 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
