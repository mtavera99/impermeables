# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 12:10 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$55,376** |
| gastado hoy (hasta las 12h) | $107,695 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $213,720 |
| saldo proyectado a medianoche | $-50,650 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $78,579 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $96,522 | 94 | **$1,027** | $4,090 | 3.98 |
| 2026-09-25 | $71,698 | 86 | **$834** | $4,673 | 5.60 |
| 2026-09-26 | $50,899 | 71 | **$717** | $5,646 | 7.88 |
| 2026-09-27 | $68,433 | 95 | **$720** | $5,250 | 7.29 |
| 2026-09-28 **HOY** | $107,695 | 188 | **$573** | $5,127 | 8.95 |

🟢 **Hoy va mejor que ayer a la misma hora** ($573 vs $720).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   573  =  $ 5,127  ÷  8.95
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,127 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 8.95 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $26,553 | 76% | 38 | $699 | 8.80 |
| Domiciliarios - Expancion - API | $40,000 | $25,752 | 64% | 57 | $452 | 8.18 |
| TEST Creativos - API | $40,000 | $25,505 | 64% | 41 | $622 | 10.56 |
| Domiciliarios VIDEO - API | $20,000 | $16,705 | 84% | 8 | $2,088 | 2.96 |
| Motorizados - API | $20,000 | $13,180 | 66% | 44 | $300 | 14.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $107,695 | 188 | **$573** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$6,820**/pedido |
| utilidad estimada de lo que va del día | **$268,535** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $675 | $699 | 🟡 |
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $647 | $452 | 🟢 |
| TEST Creativos - API | $735 | $757 | $820 | $831 | $860 | $622 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $495 | $2,088 | 🔴 |
| Motorizados - API | $745 | $701 | $675 | $465 | $521 | $300 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.37 | 8.80 | 🟢 |
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.28 | 8.18 | 🟢 |
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 8.93 | 10.56 | 🟢 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.49 | 2.96 | 🔴 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.78 | 14.03 | 🟢 |

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
| 2026-09-27 | $196,905 | 302 | $652 | $4,447 | 6.82 | $407,464 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
