# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-03 08:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$105,720** |
| gastado hoy (hasta las 8h) | $37,166 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $195,773 |
| saldo proyectado a medianoche | $-52,887 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $213,164 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-29 | $55,163 | 127 | **$434** | $5,053 | 11.63 |
| 2026-09-30 | $58,862 | 132 | **$446** | $4,197 | 9.41 |
| 2026-10-01 | $51,838 | 124 | **$418** | $3,219 | 7.70 |
| 2026-10-02 | $45,583 | 112 | **$407** | $3,430 | 8.43 |
| 2026-10-03 **HOY** | $37,408 | 106 | **$353** | $3,429 | 9.72 |

🟢 **Hoy va mejor que ayer a la misma hora** ($353 vs $407).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   353  =  $ 3,429  ÷  9.72
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,429 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.72 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $7,150 | 18% | 12 | $596 | 6.36 |
| TEST Creativos - API | $40,000 | $6,894 | 17% | 14 | $492 | 10.26 |
| Domiciliarios - API | $35,000 | $6,190 | 18% | 11 | $563 | 6.01 |
| Domiciliarios VIDEO - API | $20,000 | $4,706 | 24% | 19 | $248 | 11.74 |
| Motorizados - API | $20,000 | $3,454 | 17% | 13 | $266 | 12.25 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,331 | 17% | 6 | $555 | 6.42 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,301 | 12% | 9 | $256 | 9.83 |
| Domiciliarios INTER - API | $20,000 | $1,804 | 9% | 18 | $100 | 21.33 |
| Motorizados - INTER | $20,000 | $1,364 | 7% | 4 | $341 | 9.85 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $37,194 | 106 | **$351** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$4,177**/pedido |
| utilidad estimada de lo que va del día | **$174,936** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $408 | $548 | $547 | $444 | $454 | $596 | 🔴 |
| TEST Creativos - API | $588 | $735 | $555 | $679 | $501 | $492 | 🟡 |
| Domiciliarios - API | $433 | $483 | $508 | $390 | $430 | $580 | 🔴 |
| Domiciliarios VIDEO - API | $881 | $389 | $423 | $400 | $344 | $251 | 🟢 |
| Motorizados - API | $311 | $510 | $519 | $596 | $381 | $268 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | $447 | $701 | $512 | $430 | $555 | 🔴 |
| Domiciliarios - Expancion - INTER | — | $440 | $394 | $456 | $460 | $256 | 🟢 |
| Domiciliarios INTER - API | — | $271 | $254 | $178 | $183 | $100 | 🟢 |
| Motorizados - INTER | — | $403 | $333 | $292 | $259 | $341 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-28 | 09-29 | 09-30 | 10-01 | 10-02 | 10-03 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 9.43 | 7.32 | 6.61 | 7.72 | 7.86 | 6.36 | 🔴 |
| TEST Creativos - API | 12.22 | 9.96 | 11.64 | 8.36 | 12.05 | 10.26 | 🟡 |
| Domiciliarios - API | 12.59 | 8.61 | 7.46 | 9.23 | 8.03 | 5.91 | 🔴 |
| Domiciliarios VIDEO - API | 6.66 | 11.39 | 8.32 | 7.77 | 8.29 | 11.55 | 🟢 |
| Motorizados - API | 13.63 | 7.54 | 6.39 | 4.84 | 7.14 | 12.07 | 🟢 |
| Domiciliarios VIDEO INTER - API | — | 13.75 | 6.80 | 6.01 | 8.00 | 6.42 | 🔴 |
| Domiciliarios - Expancion - INTER | — | 11.27 | 8.84 | 5.24 | 5.63 | 9.83 | 🟢 |
| Domiciliarios INTER - API | — | 14.81 | 12.23 | 12.79 | 13.02 | 21.33 | 🟢 |
| Motorizados - INTER | — | 13.10 | 15.50 | 11.18 | 13.53 | 9.85 | 🔴 |

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
| 2026-10-02 | $206,546 | 549 | $376 | $3,362 | 8.94 | $892,125 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
