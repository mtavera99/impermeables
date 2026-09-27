# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-27 03:26 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$108,469** |
| gastado hoy (hasta las 3h) | $1,865 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $135,813 |
| saldo proyectado a medianoche | $-25,479 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $131,316 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-23 | $3,031 | 2 | **$1,516** | $4,431 | 2.92 |
| 2026-09-24 | $4,021 | 8 | **$503** | $5,736 | 11.41 |
| 2026-09-25 | $3,509 | 5 | **$702** | $7,132 | 10.16 |
| 2026-09-26 | $2,874 | 3 | **$958** | $5,725 | 5.98 |
| 2026-09-27 **HOY** | $1,865 | 7 | **$266** | $5,041 | 18.92 |

🟢 **Hoy va mejor que ayer a la misma hora** ($266 vs $958).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   266  =  $ 5,041  ÷  18.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,041 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 18.92 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $589 | 1% | 1 | $589 | 6.80 |
| TEST Creativos - API | $40,000 | $519 | 1% | 4 | $130 | 74.07 |
| Motorizados - API | $20,000 | $305 | 2% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $273 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $179 | 1% | 2 | $90 | 54.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $1,865 | 7 | **$266** | $2,402 | **11%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,172**/pedido |
| utilidad estimada de lo que va del día | **$12,144** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $1,103 | $778 | $1,140 | $734 | $640 | $589 | 🟢 |
| TEST Creativos - API | $1,086 | $735 | $757 | $820 | $829 | $130 | 🟢 |
| Motorizados - API | $1,265 | $745 | $701 | $675 | $463 | — | 🟢 |
| Domiciliarios - API | $942 | $889 | $1,108 | $1,005 | $985 | — | 🟡 |
| Domiciliarios VIDEO - API | $972 | $1,254 | $681 | $698 | $697 | $90 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-22 | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 3.42 | 4.66 | 2.81 | 5.38 | 6.62 | 6.80 | 🟡 |
| TEST Creativos - API | 8.43 | 13.10 | 10.08 | 8.98 | 10.01 | 74.07 | 🟢 |
| Motorizados - API | 3.17 | 5.36 | 5.39 | 7.40 | 10.44 | — | 🟢 |
| Domiciliarios - API | 4.24 | 4.84 | 4.04 | 5.46 | 5.76 | — | 🟢 |
| Domiciliarios VIDEO - API | 5.10 | 4.36 | 6.86 | 6.85 | 7.36 | 54.05 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $133,776 | 186 | $719 | $5,422 | 7.54 | $238,451 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
