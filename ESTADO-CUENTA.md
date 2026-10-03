# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 20:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$185,138** |
| gastado hoy (hasta las 20h) | $164,822 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $192,834 |
| saldo proyectado a medianoche | $157,126 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $6,090 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $183,320 | 384 | **$477** | $5,089 | 10.66 |
| 2026-09-29 | $212,242 | 446 | **$476** | $4,771 | 10.03 |
| 2026-09-30 | $225,001 | 492 | **$457** | $4,092 | 8.95 |
| 2026-10-01 | $181,506 | 452 | **$402** | $3,254 | 8.10 |
| 2026-10-02 **HOY** | $164,822 | 444 | **$371** | $3,435 | 9.25 |

🟢 **Hoy va mejor que ayer a la misma hora** ($371 vs $402).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   371  =  $ 3,435  ÷  9.25
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,435 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.25 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $29,755 | 74% | 65 | $458 | 7.96 |
| Domiciliarios - API | $35,000 | $27,361 | 78% | 66 | $415 | 8.53 |
| TEST Creativos - API | $40,000 | $25,236 | 63% | 51 | $495 | 13.07 |
| Domiciliarios VIDEO - API | $20,000 | $17,904 | 90% | 51 | $351 | 8.13 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,508 | 78% | 39 | $398 | 8.77 |
| Motorizados - API | $20,000 | $13,376 | 67% | 38 | $352 | 7.81 |
| Domiciliarios INTER - API | $20,000 | $12,343 | 62% | 64 | $193 | 13.10 |
| Motorizados - INTER | $20,000 | $11,931 | 60% | 47 | $254 | 13.92 |
| Domiciliarios - Expancion - INTER | $20,000 | $11,408 | 57% | 23 | $496 | 5.32 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $164,822 | 444 | **$371** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,419**/pedido |
| utilidad estimada de lo que va del día | **$723,721** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $444 | $458 | 🟡 |
| Domiciliarios - API | $676 | $433 | $483 | $508 | $390 | $415 | 🟡 |
| TEST Creativos - API | $861 | $588 | $735 | $555 | $678 | $495 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $400 | $351 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $512 | $398 | 🟢 |
| Motorizados - API | $522 | $311 | $510 | $519 | $596 | $352 | 🟢 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $178 | $193 | 🟡 |
| Motorizados - INTER | — | — | $403 | $333 | $292 | $254 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $455 | $496 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.72 | 7.96 | 🟡 |
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.23 | 8.53 | 🟡 |
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.36 | 13.07 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.77 | 8.13 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.01 | 8.77 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.39 | 4.84 | 7.81 | 🟢 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.79 | 13.10 | 🟡 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.18 | 13.92 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.24 | 5.32 | 🟡 |

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
| 2026-10-01 | $208,058 | 523 | $398 | $3,272 | 8.22 | $838,581 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
