# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-01 16:28 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$93,699** |
| gastado hoy (hasta las 16h) | $115,196 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $204,680 |
| saldo proyectado a medianoche | $4,214 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $147,155 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-27 | $118,276 | 156 | **$758** | $4,424 | 5.84 |
| 2026-09-28 | $151,607 | 306 | **$495** | $5,217 | 10.53 |
| 2026-09-29 | $157,328 | 330 | **$477** | $4,946 | 10.37 |
| 2026-09-30 | $152,381 | 331 | **$460** | $4,262 | 9.26 |
| 2026-10-01 **HOY** | $115,196 | 289 | **$399** | $3,350 | 8.40 |

🟢 **Hoy va mejor que ayer a la misma hora** ($399 vs $460).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   399  =  $ 3,350  ÷  8.40
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,350 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.40 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $17,656 | 44% | 21 | $841 | 7.29 |
| Domiciliarios - Expancion - API | $40,000 | $15,206 | 38% | 37 | $411 | 9.23 |
| Domiciliarios - API | $35,000 | $14,791 | 42% | 40 | $370 | 10.85 |
| Domiciliarios VIDEO - API | $20,000 | $13,512 | 68% | 32 | $422 | 8.03 |
| Domiciliarios INTER - API | $20,000 | $11,838 | 59% | 60 | $197 | 11.19 |
| Domiciliarios VIDEO INTER - API | $20,000 | $11,538 | 58% | 20 | $577 | 5.21 |
| Motorizados - INTER | $20,000 | $11,515 | 58% | 42 | $274 | 12.25 |
| Domiciliarios - Expancion - INTER | $20,000 | $10,899 | 54% | 24 | $454 | 5.29 |
| Motorizados - API | $20,000 | $8,241 | 41% | 11 | $749 | 4.13 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $115,196 | 287 | **$401** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,778**/pedido |
| utilidad estimada de lo que va del día | **$459,155** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $831 | $861 | $588 | $735 | $555 | $841 | 🔴 |
| Domiciliarios - Expancion - API | $643 | $648 | $408 | $548 | $547 | $411 | 🟢 |
| Domiciliarios - API | $992 | $676 | $433 | $483 | $507 | $370 | 🟢 |
| Domiciliarios VIDEO - API | $701 | $496 | $881 | $389 | $423 | $422 | 🟡 |
| Domiciliarios INTER - API | — | — | — | $271 | $254 | $197 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | — | — | $447 | $701 | $577 | 🟢 |
| Motorizados - INTER | — | — | — | $403 | $333 | $274 | 🟢 |
| Domiciliarios - Expancion - INTER | — | — | — | $440 | $393 | $454 | 🔴 |
| Motorizados - API | $465 | $522 | $311 | $510 | $518 | $749 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-26 | 09-27 | 09-28 | 09-29 | 09-30 | 10-01 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.92 | 8.91 | 12.22 | 9.96 | 11.65 | 7.29 | 🔴 |
| Domiciliarios - Expancion - API | 6.56 | 5.27 | 9.43 | 7.32 | 6.62 | 9.23 | 🟢 |
| Domiciliarios - API | 5.71 | 6.36 | 12.59 | 8.61 | 7.47 | 10.85 | 🟢 |
| Domiciliarios VIDEO - API | 7.30 | 8.47 | 6.66 | 11.39 | 8.33 | 8.03 | 🟡 |
| Domiciliarios INTER - API | — | — | — | 14.81 | 12.24 | 11.19 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | — | — | 13.75 | 6.80 | 5.21 | 🔴 |
| Motorizados - INTER | — | — | — | 13.10 | 15.51 | 12.25 | 🔴 |
| Domiciliarios - Expancion - INTER | — | — | — | 11.27 | 8.84 | 5.29 | 🔴 |
| Motorizados - API | 10.38 | 7.75 | 13.63 | 7.54 | 6.40 | 4.13 | 🔴 |

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
| 2026-09-30 | $254,228 | 568 | $448 | $4,027 | 9.00 | $882,467 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
