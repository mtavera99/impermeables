# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 19:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$193,044** |
| gastado hoy (hasta las 19h) | $149,302 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $191,086 |
| saldo proyectado a medianoche | $151,260 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $13,704 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $198,154 | 414 | **$479** | $4,808 | 10.05 |
| 2026-09-30 | $203,989 | 441 | **$463** | $4,132 | 8.93 |
| 2026-10-01 | $165,337 | 416 | **$397** | $3,253 | 8.18 |
| 2026-10-02 | $166,655 | 441 | **$378** | $3,447 | 9.12 |
| 2026-10-03 **HOY** | $149,302 | 439 | **$340** | $3,222 | 9.47 |

🟢 **Hoy va mejor que ayer a la misma hora** ($340 vs $378).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   340  =  $ 3,222  ÷  9.47
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,222 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.47 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $26,773 | 67% | 56 | $478 | 10.85 |
| Domiciliarios - Expancion - API | $40,000 | $25,530 | 64% | 58 | $440 | 7.86 |
| Domiciliarios - API | $35,000 | $25,189 | 72% | 51 | $494 | 6.51 |
| Domiciliarios VIDEO - API | $20,000 | $15,611 | 78% | 52 | $300 | 9.25 |
| Motorizados - API | $20,000 | $13,875 | 69% | 47 | $295 | 9.62 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,679 | 58% | 39 | $299 | 9.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,346 | 57% | 24 | $473 | 7.12 |
| Domiciliarios INTER - API | $20,000 | $10,030 | 50% | 79 | $127 | 16.21 |
| Motorizados - INTER | $20,000 | $9,269 | 46% | 32 | $290 | 11.17 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $149,302 | 438 | **$341** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,058**/pedido |
| utilidad estimada de lo que va del día | **$727,234** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $588 | $735 | $555 | $679 | $503 | $478 | 🟡 |
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $456 | $440 | 🟡 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $433 | $484 | 🟡 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $345 | $300 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $597 | $382 | $295 | 🟢 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $462 | $299 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $431 | $473 | 🟡 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $127 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $260 | $290 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.02 | 10.85 | 🟡 |
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.83 | 7.86 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 7.98 | 6.63 | 🔴 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.25 | 9.25 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.11 | 9.62 | 🟢 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.59 | 9.00 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 7.96 | 7.12 | 🟡 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 12.98 | 16.21 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.45 | 11.17 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,116 | 523 | $398 | $3,272 | 8.22 | $838,523 |
| 2026-10-02 | $207,444 | 549 | $378 | $3,362 | 8.90 | $891,227 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
