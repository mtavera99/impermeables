# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 08:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$169,925** |
| gastado hoy (hasta las 8h) | $39,677 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $226,534 |
| saldo proyectado a medianoche | $-16,932 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $146,448 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $26,493 | 38 | **$697** | $5,608 | 8.04 |
| 2026-09-28 | $90,917 | 120 | **$758** | $5,018 | 6.62 |
| 2026-09-29 | $55,163 | 127 | **$434** | $5,053 | 11.63 |
| 2026-09-30 | $58,862 | 132 | **$446** | $4,197 | 9.41 |
| 2026-10-01 **HOY** | $39,677 | 103 | **$385** | $3,162 | 8.21 |

🟢 **Hoy va mejor que ayer a la misma hora** ($385 vs $446).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   385  =  $ 3,162  ÷  8.21
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,162 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.21 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $5,966 | 15% | 9 | $663 | 8.90 |
| Domiciliarios VIDEO - API | $20,000 | $5,774 | 29% | 18 | $321 | 10.47 |
| Domiciliarios INTER - API | $20,000 | $4,979 | 25% | 23 | $216 | 9.70 |
| Domiciliarios - Expancion - API | $40,000 | $4,812 | 12% | 12 | $401 | 9.47 |
| Domiciliarios - API | $35,000 | $4,006 | 11% | 13 | $308 | 11.27 |
| Motorizados - INTER | $20,000 | $3,874 | 19% | 13 | $298 | 11.55 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,753 | 19% | 6 | $626 | 4.27 |
| Domiciliarios - Expancion - INTER | $20,000 | $3,680 | 18% | 5 | $736 | 3.19 |
| Motorizados - API | $20,000 | $2,833 | 14% | 4 | $708 | 4.31 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $39,677 | 103 | **$385** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,586**/pedido |
| utilidad estimada de lo que va del día | **$166,449** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $831 | $861 | $588 | $735 | $553 | $663 | 🔴 |
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $420 | $321 | 🟢 |
| Domiciliarios INTER - API | — | — | — | $271 | $253 | $216 | 🟢 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $544 | $401 | 🟢 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $505 | $308 | 🟢 |
| Motorizados - INTER | — | — | — | $403 | $332 | $298 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $699 | $626 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $393 | $736 | 🔴 |
| Motorizados - API | $465 | $522 | $311 | $510 | $515 | $708 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.71 | 8.90 | 🔴 |
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.38 | 10.47 | 🟢 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.28 | 9.70 | 🔴 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.65 | 9.47 | 🟢 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.53 | 11.27 | 🟢 |
| Motorizados - INTER | — | — | — | 13.10 | 15.54 | 11.55 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.82 | 4.27 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.87 | 3.19 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.43 | 4.31 | 🔴 |

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
| 2026-09-30 | $253,288 | 568 | $446 | $4,030 | 9.04 | $883,407 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
