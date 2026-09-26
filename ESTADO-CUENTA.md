# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-26 03:09 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$143,347** |
| gastado hoy (hasta las 3h) | $2,304 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $156,736 |
| saldo proyectado a medianoche | $-11,085 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $95,999 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-22 | $2,485 | 4 | **$621** | $4,233 | 6.81 |
| 2026-09-23 | $3,031 | 2 | **$1,516** | $4,431 | 2.92 |
| 2026-09-24 | $4,021 | 8 | **$503** | $5,736 | 11.41 |
| 2026-09-25 | $3,509 | 5 | **$702** | $7,132 | 10.16 |
| 2026-09-26 **HOY** | $2,304 | 3 | **$768** | $5,661 | 7.37 |

🟠 Hoy va 9% más caro que ayer a la misma hora ($768 vs $702).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   768  =  $ 5,661  ÷  7.37
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,661 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.37 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $743 | 2% | 0 | — | 0.00 |
| TEST Creativos - API | $40,000 | $596 | 1% | 2 | $298 | 28.99 |
| Motorizados - API | $20,000 | $401 | 2% | 1 | $401 | 10.42 |
| Domiciliarios - API | $35,000 | $349 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $215 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,304 | 3 | **$768** | $2,402 | **32%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,143**/pedido |
| utilidad estimada de lo que va del día | **$3,700** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | $1,103 | $778 | $1,140 | $723 | — | 🟢 |
| TEST Creativos - API | — | $1,086 | $735 | $757 | $814 | $298 | 🟢 |
| Motorizados - API | — | $1,265 | $745 | $701 | $669 | $401 | 🟢 |
| Domiciliarios - API | — | $942 | $889 | $1,108 | $996 | — | 🟢 |
| Domiciliarios VIDEO - API | — | $972 | $1,254 | $681 | $691 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | 3.42 | 4.66 | 2.81 | 5.43 | — | 🟢 |
| TEST Creativos - API | — | 8.43 | 13.10 | 10.08 | 9.03 | 28.99 | 🟢 |
| Motorizados - API | — | 3.17 | 5.36 | 5.39 | 7.45 | 10.42 | 🟢 |
| Domiciliarios - API | — | 4.24 | 4.84 | 4.04 | 5.52 | — | 🟢 |
| Domiciliarios VIDEO - API | — | 5.10 | 4.36 | 6.86 | 6.91 | — | 🟡 |

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
| 2026-09-25 | $138,982 | 179 | $776 | $5,058 | 6.51 | $219,237 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
