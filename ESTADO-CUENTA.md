# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 03:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$155,359** |
| gastado hoy (hasta las 3h) | $9,185 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $171,523 |
| saldo proyectado a medianoche | $-6,979 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $77,106 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $4,021 | 8 | **$503** | $5,736 | 11.41 |
| 2026-09-25 | $3,509 | 5 | **$702** | $7,132 | 10.16 |
| 2026-09-26 | $2,874 | 3 | **$958** | $5,725 | 5.98 |
| 2026-09-27 | $2,136 | 7 | **$305** | $5,122 | 16.79 |
| 2026-09-28 **HOY** | $9,185 | 14 | **$656** | $3,971 | 6.05 |

🟠 Hoy va 115% más caro que ayer a la misma hora ($656 vs $305).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   656  =  $ 3,971  ÷  6.05
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,971 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.05 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $2,982 | 7% | 4 | $746 | 4.87 |
| TEST Creativos - API | $40,000 | $2,601 | 7% | 3 | $867 | 6.67 |
| Domiciliarios - API | $35,000 | $1,481 | 4% | 3 | $494 | 7.28 |
| Motorizados - API | $20,000 | $1,416 | 7% | 3 | $472 | 7.01 |
| Domiciliarios VIDEO - API | $20,000 | $705 | 4% | 1 | $705 | 4.98 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $9,185 | 14 | **$656** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$7,810**/pedido |
| utilidad estimada de lo que va del día | **$18,832** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $642 | $746 | 🔴 |
| TEST Creativos - API | $735 | $757 | $820 | $831 | $853 | $867 | 🟡 |
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $669 | $494 | 🟢 |
| Motorizados - API | $745 | $701 | $675 | $465 | $514 | $472 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $490 | $705 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.32 | 4.87 | 🟡 |
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 9.02 | 6.67 | 🔴 |
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.44 | 7.28 | 🟢 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.84 | 7.01 | 🟡 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.56 | 4.98 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $177,412 | 202 | $878 | $4,357 | 4.96 | $226,835 |
| 2026-09-25 | $140,503 | 179 | $785 | $5,071 | 6.46 | $217,716 |
| 2026-09-26 | $134,478 | 186 | $723 | $5,407 | 7.48 | $237,749 |
| 2026-09-27 | $195,208 | 302 | $646 | $4,445 | 6.88 | $409,161 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
