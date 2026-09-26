# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 07:33 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,951** |
| gastado hoy (hasta las 7h) | $11,041 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $129,980 |
| saldo proyectado a medianoche | $15,012 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $96,658 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $28,774 | 27 | **$1,066** | $3,400 | 3.19 |
| 2026-09-23 | $31,907 | 26 | **$1,227** | $4,340 | 3.54 |
| 2026-09-24 | $45,216 | 35 | **$1,292** | $4,277 | 3.31 |
| 2026-09-25 | $33,910 | 38 | **$892** | $4,638 | 5.20 |
| 2026-09-26 **HOY** | $11,041 | 18 | **$613** | $5,613 | 9.15 |

🟢 **Hoy va mejor que ayer a la misma hora** ($613 vs $892).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   613  =  $ 5,613  ÷  9.15
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,613 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 9.15 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $3,257 | 8% | 5 | $651 | 7.47 |
| TEST Creativos - API | $40,000 | $2,907 | 7% | 4 | $727 | 12.54 |
| Domiciliarios VIDEO - API | $20,000 | $1,837 | 9% | 4 | $459 | 11.59 |
| Motorizados - API | $20,000 | $1,666 | 8% | 4 | $416 | 11.53 |
| Domiciliarios - API | $35,000 | $1,374 | 4% | 1 | $1,374 | 3.48 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $11,041 | 18 | **$613** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$7,302**/pedido |
| utilidad estimada de lo que va del día | **$24,981** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $726 | $651 | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $817 | $727 | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $693 | $459 | 🟢 |
| Motorizados - API | — | $1,265 | $745 | $701 | $673 | $416 | 🟢 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $1,001 | $1,374 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.41 | 7.47 | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 9.00 | 12.54 | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.89 | 11.59 | 🟢 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.43 | 11.53 | 🟢 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.49 | 3.48 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $139,591 | 179 | $780 | $5,062 | 6.49 | $218,628 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
