# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 01:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$162,385** |
| gastado hoy (hasta las 0h) | $1,093 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $160,666 |
| saldo proyectado a medianoche | $2,812 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $78,172 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $5,370 | 2 | **$2,685** | $4,150 | 1.55 |
| 2026-09-23 | $1,100 | 1 | **$1,100** | $4,846 | 4.41 |
| 2026-09-24 **HOY** | $1,093 | 2 | **$546** | $5,634 | 10.31 |

🟢 **Hoy va mejor que ayer a la misma hora** ($546 vs $1,100).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   546  =  $ 5,634  ÷  10.31
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,634 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.31 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $302 | 1% | 1 | $302 | 16.13 |
| Motorizados - API | $20,000 | $257 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $235 | 1% | 1 | $235 | 33.33 |
| Domiciliarios - API | $35,000 | $192 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $107 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $1,093 | 2 | **$546** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$6,506**/pedido |
| utilidad estimada de lo que va del día | **$2,909** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,102 | $769 | $302 | 🟢 |
| Motorizados - API | — | — | — | $1,265 | $738 | — | 🟢 |
| TEST Creativos - API | — | — | — | $1,086 | $729 | $235 | 🟢 |
| Domiciliarios - API | — | — | — | $942 | $879 | — | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,241 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.71 | 16.13 | 🟢 |
| Motorizados - API | — | — | — | 3.17 | 5.41 | — | 🟢 |
| TEST Creativos - API | — | — | — | 8.43 | 13.20 | 33.33 | 🟢 |
| Domiciliarios - API | — | — | — | 4.24 | 4.90 | — | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.41 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,798 | 175 | $1,027 | $4,763 | 4.64 | $170,416 |
| 2026-09-23 | $140,449 | 173 | $812 | $5,020 | 6.18 | $205,763 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
