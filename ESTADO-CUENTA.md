# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-02 04:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$245,189** |
| gastado hoy (hasta las 4h) | $6,414 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $225,278 |
| saldo proyectado a medianoche | $26,325 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟠 Recargar $104,447 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–4:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-28 | $50,416 | 38 | **$1,327** | $5,446 | 4.10 |
| 2026-09-29 | $8,295 | 23 | **$361** | $5,737 | 15.91 |
| 2026-09-30 | $12,880 | 32 | **$402** | $4,631 | 11.51 |
| 2026-10-01 | $10,319 | 23 | **$449** | $3,489 | 7.78 |
| 2026-10-02 **HOY** | $6,414 | 17 | **$377** | $3,885 | 10.30 |

🟢 **Hoy va mejor que ayer a la misma hora** ($377 vs $449).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   377  =  $ 3,885  ÷  10.30
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,885 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.30 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $1,178 | 3% | 1 | $1,178 | 6.58 |
| Domiciliarios - Expancion - API | $40,000 | $949 | 2% | 1 | $949 | 3.91 |
| Domiciliarios - API | $35,000 | $931 | 3% | 2 | $466 | 7.81 |
| Domiciliarios INTER - API | $20,000 | $883 | 4% | 4 | $221 | 17.17 |
| Motorizados - API | $20,000 | $723 | 4% | 3 | $241 | 11.76 |
| Domiciliarios VIDEO - API | $20,000 | $701 | 4% | 2 | $350 | 8.81 |
| Motorizados - INTER | $20,000 | $394 | 2% | 2 | $197 | 19.42 |
| Domiciliarios VIDEO INTER - API | $20,000 | $352 | 2% | 1 | $352 | 14.71 |
| Domiciliarios - Expancion - INTER | $20,000 | $284 | 1% | 1 | $284 | 10.99 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $6,395 | 17 | **$376** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,478**/pedido |
| utilidad estimada de lo que va del día | **$27,626** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $861 | $588 | $735 | $555 | $673 | $1,178 | 🔴 |
| Domiciliarios - API | $676 | $433 | $483 | $508 | $387 | $475 | 🔴 |
| Domiciliarios - Expancion - API | $648 | $408 | $548 | $547 | $440 | $949 | 🔴 |
| Domiciliarios INTER - API | — | — | $271 | $254 | $177 | $221 | 🔴 |
| Motorizados - API | $522 | $311 | $510 | $518 | $591 | $241 | 🟢 |
| Domiciliarios VIDEO - API | $496 | $881 | $389 | $423 | $397 | $350 | 🟢 |
| Motorizados - INTER | — | — | $403 | $333 | $291 | $197 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | $447 | $701 | $510 | $352 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | $440 | $394 | $452 | $284 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.91 | 12.22 | 9.96 | 11.64 | 8.44 | 6.58 | 🔴 |
| Domiciliarios - API | 6.36 | 12.59 | 8.61 | 7.46 | 9.30 | 7.52 | 🔴 |
| Domiciliarios - Expancion - API | 5.27 | 9.43 | 7.32 | 6.61 | 7.80 | 3.91 | 🔴 |
| Domiciliarios INTER - API | — | — | 14.81 | 12.23 | 12.87 | 17.17 | 🟢 |
| Motorizados - API | 7.75 | 13.63 | 7.54 | 6.40 | 4.90 | 11.76 | 🟢 |
| Domiciliarios VIDEO - API | 8.47 | 6.66 | 11.39 | 8.32 | 7.84 | 8.81 | 🟢 |
| Motorizados - INTER | — | — | 13.10 | 15.50 | 11.25 | 19.42 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | 13.75 | 6.80 | 6.05 | 14.71 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | 11.27 | 8.84 | 5.27 | 10.99 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,425 | 568 | $448 | $4,026 | 8.99 | $882,270 |
| 2026-10-01 | $206,502 | 523 | $395 | $3,273 | 8.29 | $840,137 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
