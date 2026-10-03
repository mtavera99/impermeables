# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 19:20 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$101,373** |
| gastado hoy (hasta las 19h) | $147,742 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $194,343 |
| saldo proyectado a medianoche | $54,772 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $106,935 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $176,362 | 367 | **$481** | $5,132 | 10.68 |
| 2026-09-29 | $198,154 | 414 | **$479** | $4,808 | 10.05 |
| 2026-09-30 | $203,989 | 441 | **$463** | $4,132 | 8.93 |
| 2026-10-01 | $165,320 | 416 | **$397** | $3,253 | 8.18 |
| 2026-10-02 **HOY** | $147,742 | 385 | **$384** | $3,482 | 9.07 |

🟢 **Hoy va mejor que ayer a la misma hora** ($384 vs $397).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   384  =  $ 3,482  ÷  9.07
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,482 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.07 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $26,356 | 66% | 56 | $471 | 7.71 |
| Domiciliarios - API | $35,000 | $24,354 | 70% | 59 | $413 | 8.67 |
| TEST Creativos - API | $40,000 | $22,901 | 57% | 45 | $509 | 12.96 |
| Domiciliarios VIDEO - API | $20,000 | $16,058 | 80% | 47 | $342 | 8.36 |
| Domiciliarios VIDEO INTER - API | $20,000 | $13,838 | 69% | 32 | $432 | 8.14 |
| Motorizados - API | $20,000 | $12,403 | 62% | 33 | $376 | 7.49 |
| Domiciliarios INTER - API | $20,000 | $11,398 | 57% | 57 | $200 | 13.12 |
| Motorizados - INTER | $20,000 | $10,708 | 54% | 38 | $282 | 12.88 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,993 | 50% | 18 | $555 | 4.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $148,009 | 385 | **$384** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,577**/pedido |
| utilidad estimada de lo que va del día | **$622,462** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $471 | 🟡 |
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $413 | 🟡 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $509 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $400 | $342 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $432 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $519 | $596 | $376 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $201 | 🟡 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $286 | 🟡 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $555 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.72 | 7.71 | 🟡 |
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.23 | 8.67 | 🟡 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.36 | 12.96 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.77 | 8.36 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.01 | 8.14 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.39 | 4.84 | 7.49 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 13.01 | 🟡 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.18 | 12.69 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.24 | 4.89 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,473 | 568 | $448 | $4,027 | 8.99 | $882,222 |
| 2026-10-01 | $208,038 | 523 | $398 | $3,272 | 8.23 | $838,601 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
