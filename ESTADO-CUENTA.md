# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 14:28 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$109,766** |
| gastado hoy (hasta las 14h) | $99,027 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $208,540 |
| saldo proyectado a medianoche | $252 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $147,257 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $88,176 | 123 | **$717** | $4,782 | 6.67 |
| 2026-09-28 | $139,340 | 268 | **$520** | $5,171 | 9.95 |
| 2026-09-29 | $137,148 | 282 | **$486** | $4,971 | 10.22 |
| 2026-09-30 | $132,399 | 294 | **$450** | $4,274 | 9.49 |
| 2026-10-01 **HOY** | $99,027 | 246 | **$403** | $3,362 | 8.35 |

🟢 **Hoy va mejor que ayer a la misma hora** ($403 vs $450).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   403  =  $ 3,362  ÷  8.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,362 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.35 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $15,122 | 38% | 20 | $756 | 8.00 |
| Domiciliarios - Expancion - API | $40,000 | $13,255 | 33% | 29 | $457 | 8.46 |
| Domiciliarios - API | $35,000 | $12,901 | 37% | 38 | $340 | 11.89 |
| Domiciliarios VIDEO - API | $20,000 | $11,823 | 59% | 32 | $369 | 9.15 |
| Domiciliarios INTER - API | $20,000 | $10,013 | 50% | 46 | $218 | 10.11 |
| Motorizados - INTER | $20,000 | $9,825 | 49% | 35 | $281 | 11.99 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,763 | 49% | 17 | $574 | 5.21 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,328 | 47% | 19 | $491 | 4.93 |
| Motorizados - API | $20,000 | $6,997 | 35% | 10 | $700 | 4.45 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $99,027 | 246 | **$403** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,792**/pedido |
| utilidad estimada de lo que va del día | **$393,274** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $831 | $861 | $588 | $735 | $554 | $756 | 🔴 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $546 | $457 | 🟢 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $507 | $340 | 🟢 |
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $423 | $369 | 🟢 |
| Domiciliarios INTER - API | — | — | — | $271 | $254 | $218 | 🟢 |
| Motorizados - INTER | — | — | — | $403 | $333 | $281 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $700 | $574 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $393 | $491 | 🔴 |
| Motorizados - API | $465 | $522 | $311 | $510 | $517 | $700 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.66 | 8.00 | 🔴 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.62 | 8.46 | 🟢 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.48 | 11.89 | 🟢 |
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.34 | 9.15 | 🟢 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.24 | 10.11 | 🔴 |
| Motorizados - INTER | — | — | — | 13.10 | 15.51 | 11.99 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.81 | 5.21 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.85 | 4.93 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.41 | 4.45 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,124 | 568 | $447 | $4,027 | 9.00 | $882,571 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
