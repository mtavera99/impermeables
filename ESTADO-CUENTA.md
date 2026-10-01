# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 06:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$192,408** |
| gastado hoy (hasta las 6h) | $17,648 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $229,461 |
| saldo proyectado a medianoche | $-19,405 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $145,994 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $8,306 | 19 | **$437** | $6,072 | 13.89 |
| 2026-09-28 | $69,358 | 72 | **$963** | $4,958 | 5.15 |
| 2026-09-29 | $29,736 | 66 | **$451** | $5,228 | 11.60 |
| 2026-09-30 | $33,587 | 70 | **$480** | $4,318 | 9.00 |
| 2026-10-01 **HOY** | $17,648 | 35 | **$504** | $3,171 | 6.29 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($504 vs $480).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   504  =  $ 3,171  ÷  6.29
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,171 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.29 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | $20,000 | $2,578 | 13% | 8 | $322 | 10.38 |
| Domiciliarios INTER - API | $20,000 | $2,553 | 13% | 9 | $284 | 7.85 |
| TEST Creativos - API | $40,000 | $2,191 | 5% | 2 | $1,096 | 5.75 |
| Motorizados - INTER | $20,000 | $2,053 | 10% | 7 | $293 | 13.31 |
| Domiciliarios - Expancion - API | $40,000 | $1,935 | 5% | 2 | $968 | 3.75 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,796 | 9% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $1,681 | 5% | 5 | $336 | 10.78 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,652 | 8% | 1 | $1,652 | 1.50 |
| Motorizados - API | $20,000 | $1,209 | 6% | 1 | $1,209 | 2.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,648 | 35 | **$504** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$6,003**/pedido |
| utilidad estimada de lo que va del día | **$52,395** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $418 | $322 | 🟢 |
| Domiciliarios INTER - API | — | — | — | $271 | $252 | $284 | 🟡 |
| TEST Creativos - API | $831 | $861 | $588 | $735 | $553 | $1,096 | 🔴 |
| Motorizados - INTER | — | — | — | $403 | $331 | $293 | 🟢 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $542 | $968 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $698 | — | 🔴 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $502 | $336 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $392 | $1,652 | 🔴 |
| Motorizados - API | $465 | $522 | $311 | $510 | $514 | $1,209 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.43 | 10.38 | 🟢 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.32 | 7.85 | 🔴 |
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.75 | 5.75 | 🔴 |
| Motorizados - INTER | — | — | — | 13.10 | 15.58 | 13.31 | 🟡 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.67 | 3.75 | 🔴 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.83 | — | 🔴 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.57 | 10.78 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.88 | 1.50 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.45 | 2.36 | 🔴 |

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
| 2026-09-30 | $252,499 | 568 | $445 | $4,032 | 9.07 | $884,196 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
