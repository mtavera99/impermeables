# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 00:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$144,981** |
| gastado hoy (hasta las 0h) | $795 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $204,887 |
| saldo proyectado a medianoche | $-59,111 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $210,274 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $954 | 2 | **$477** | $5,300 | 11.11 |
| 2026-09-30 | $3,803 | 6 | **$634** | $4,417 | 6.97 |
| 2026-10-01 | $2,851 | 4 | **$713** | $4,090 | 5.74 |
| 2026-10-02 | $1,793 | 6 | **$299** | $3,615 | 12.10 |
| 2026-10-03 **HOY** | $795 | 3 | **$265** | $3,081 | 11.63 |

🟢 **Hoy va mejor que ayer a la misma hora** ($265 vs $299).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   265  =  $ 3,081  ÷  11.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,081 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $138 | 0% | 1 | $138 | 19.61 |
| TEST Creativos - API | $40,000 | $138 | 0% | 1 | $138 | 37.04 |
| Domiciliarios - API | $35,000 | $116 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $104 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $84 | 0% | 1 | $84 | 41.67 |
| Domiciliarios VIDEO INTER - API | $20,000 | $69 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $65 | 0% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $41 | 0% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $40 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $795 | 3 | **$265** | $2,402 | **11%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,155**/pedido |
| utilidad estimada de lo que va del día | **$5,209** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $450 | $138 | 🟢 |
| TEST Creativos - API | $588 | $735 | $555 | $679 | $496 | $138 | 🟢 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $427 | — | 🟡 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $454 | — | 🟡 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $341 | $84 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $425 | — | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $596 | $377 | — | 🟢 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $182 | — | 🟡 |
| Motorizados - INTER | — | $403 | $333 | $292 | $256 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.91 | 19.61 | 🟢 |
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.20 | 37.04 | 🟢 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.07 | — | 🟡 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.71 | — | 🟢 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.35 | 41.67 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 8.07 | — | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.19 | — | 🟢 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 13.12 | — | 🟡 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.73 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-27 | $197,302 | 302 | $653 | $4,445 | 6.80 | $407,067 |
| 2026-09-28 | $195,220 | 426 | $458 | $5,064 | 11.05 | $657,301 |
| 2026-09-29 | $234,450 | 525 | $447 | $4,782 | 10.71 | $816,192 |
| 2026-09-30 | $254,480 | 568 | $448 | $4,027 | 8.99 | $882,215 |
| 2026-10-01 | $208,089 | 523 | $398 | $3,272 | 8.22 | $838,550 |
| 2026-10-02 | $204,739 | 549 | $373 | $3,362 | 9.02 | $893,932 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
