# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 06:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$126,713** |
| gastado hoy (hasta las 6h) | $17,516 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $198,248 |
| saldo proyectado a medianoche | $-54,019 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $211,821 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $29,736 | 66 | **$451** | $5,228 | 11.60 |
| 2026-09-30 | $33,588 | 70 | **$480** | $4,318 | 9.00 |
| 2026-10-01 | $28,793 | 60 | **$480** | $3,107 | 6.47 |
| 2026-10-02 | $23,946 | 67 | **$357** | $3,430 | 9.60 |
| 2026-10-03 **HOY** | $17,446 | 52 | **$336** | $3,475 | 10.36 |

🟢 **Hoy va mejor que ayer a la misma hora** ($336 vs $357).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   336  =  $ 3,475  ÷  10.36
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,475 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.36 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $3,623 | 9% | 6 | $604 | 6.29 |
| TEST Creativos - API | $40,000 | $3,162 | 8% | 7 | $452 | 11.69 |
| Domiciliarios - API | $35,000 | $2,865 | 8% | 7 | $409 | 8.09 |
| Domiciliarios VIDEO - API | $20,000 | $2,230 | 11% | 8 | $279 | 10.60 |
| Motorizados - API | $20,000 | $1,632 | 8% | 4 | $408 | 8.37 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,605 | 8% | 3 | $535 | 6.21 |
| Domiciliarios - Expancion - INTER | $20,000 | $988 | 5% | 6 | $165 | 16.53 |
| Domiciliarios INTER - API | $20,000 | $731 | 4% | 10 | $73 | 29.50 |
| Motorizados - INTER | $20,000 | $680 | 3% | 1 | $680 | 4.69 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $17,516 | 52 | **$337** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,010**/pedido |
| utilidad estimada de lo que va del día | **$86,548** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $453 | $604 | 🔴 |
| TEST Creativos - API | $588 | $735 | $555 | $679 | $500 | $452 | 🟢 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $429 | $409 | 🟡 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $343 | $279 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $596 | $379 | $408 | 🟡 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $429 | $535 | 🔴 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $458 | $165 | 🟢 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $182 | $73 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $259 | $680 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.87 | 6.29 | 🔴 |
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.08 | 11.69 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.04 | 8.09 | 🟡 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.30 | 10.60 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.16 | 8.37 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 8.03 | 6.21 | 🔴 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.66 | 16.53 | 🟢 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 13.04 | 29.50 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.57 | 4.69 | 🔴 |

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
| 2026-10-02 | $206,114 | 549 | $375 | $3,363 | 8.96 | $892,557 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
