# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-30 21:37 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,778** |
| gastado hoy (hasta las 21h) | $228,731 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $236,795 |
| saldo proyectado a medianoche | $125,714 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-26 | $131,363 | 180 | **$730** | $5,399 | 7.40 |
| 2026-09-27 | $188,826 | 285 | **$663** | $4,420 | 6.67 |
| 2026-09-28 | $189,235 | 410 | **$462** | $5,056 | 10.95 |
| 2026-09-29 | $224,295 | 486 | **$462** | $4,776 | 10.35 |
| 2026-09-30 **HOY** | $228,036 | 509 | **$448** | $4,083 | 9.11 |

🟢 **Hoy va mejor que ayer a la misma hora** ($448 vs $462).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   448  =  $ 4,083  ÷  9.11
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,083 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.11 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $38,644 | 97% | 71 | $544 | 12.04 |
| Domiciliarios - Expancion - API | $40,000 | $34,875 | 87% | 64 | $545 | 6.68 |
| Domiciliarios - API | $35,000 | $30,815 | 88% | 62 | $497 | 7.77 |
| Motorizados - INTER | $20,000 | $23,097 | 115% | 69 | $335 | 15.36 |
| Domiciliarios VIDEO - API | $20,000 | $22,316 | 112% | 49 | $455 | 7.87 |
| Domiciliarios - Expancion - INTER | $20,000 | $21,000 | 105% | 54 | $389 | 8.97 |
| Domiciliarios INTER - API | $20,000 | $20,454 | 102% | 78 | $262 | 11.91 |
| Domiciliarios VIDEO INTER - API | $20,000 | $20,364 | 102% | 30 | $679 | 7.12 |
| Motorizados - API | $20,000 | $16,796 | 84% | 32 | $525 | 6.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $228,361 | 509 | **$449** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,341**/pedido |
| utilidad estimada de lo que va del día | **$790,261** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $820 | $831 | $861 | $588 | $735 | $544 | 🟢 |
| Domiciliarios - Expancion - API | $734 | $643 | $648 | $408 | $547 | $545 | 🟡 |
| Domiciliarios - API | $1,005 | $992 | $676 | $433 | $483 | $497 | 🟡 |
| Motorizados - INTER | — | — | — | — | $403 | $335 | 🟢 |
| Domiciliarios VIDEO - API | $698 | $701 | $496 | $881 | $389 | $455 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | $440 | $390 | 🟢 |
| Domiciliarios INTER - API | — | — | — | — | $271 | $262 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | $447 | $679 | 🔴 |
| Motorizados - API | $675 | $465 | $522 | $311 | $510 | $525 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-25 | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 8.98 | 9.92 | 8.91 | 12.22 | 9.96 | 12.04 | 🟢 |
| Domiciliarios - Expancion - API | 5.38 | 6.56 | 5.27 | 9.43 | 7.32 | 6.68 | 🟡 |
| Domiciliarios - API | 5.46 | 5.71 | 6.36 | 12.59 | 8.61 | 7.77 | 🟡 |
| Motorizados - INTER | — | — | — | — | 13.10 | 15.36 | 🟢 |
| Domiciliarios VIDEO - API | 6.85 | 7.30 | 8.47 | 6.66 | 11.39 | 7.87 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | — | 11.27 | 8.95 | 🔴 |
| Domiciliarios INTER - API | — | — | — | — | 14.81 | 11.91 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | — | 13.75 | 7.12 | 🔴 |
| Motorizados - API | 7.40 | 10.38 | 7.75 | 13.63 | 7.54 | 6.41 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,438 | 525 | $447 | $4,782 | 10.71 | $816,204 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
