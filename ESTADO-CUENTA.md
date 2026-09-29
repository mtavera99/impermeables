# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 21:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$112,169** |
| gastado hoy (hasta las 21h) | $180,209 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $186,002 |
| saldo proyectado a medianoche | $106,376 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $171,680 | 194 | **$885** | $4,312 | 4.87 |
| 2026-09-25 | $134,771 | 171 | **$788** | $5,020 | 6.37 |
| 2026-09-26 | $131,363 | 180 | **$730** | $5,399 | 7.40 |
| 2026-09-27 | $188,826 | 285 | **$663** | $4,420 | 6.67 |
| 2026-09-28 **HOY** | $180,209 | 379 | **$475** | $5,094 | 10.71 |

🟢 **Hoy va mejor que ayer a la misma hora** ($475 vs $663).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   475  =  $ 5,094  ÷  10.71
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,094 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.71 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $47,313 | 118% | 111 | $426 | 9.03 |
| TEST Creativos - API | $40,000 | $45,941 | 115% | 77 | $597 | 12.00 |
| Domiciliarios - API | $35,000 | $43,292 | 124% | 94 | $461 | 12.02 |
| Motorizados - API | $20,000 | $23,742 | 119% | 77 | $308 | 13.88 |
| Domiciliarios VIDEO - API | $20,000 | $19,921 | 100% | 20 | $996 | 6.07 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $180,209 | 379 | **$475** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,661**/pedido |
| utilidad estimada de lo que va del día | **$578,254** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $648 | $426 | 🟢 |
| TEST Creativos - API | $735 | $757 | $820 | $831 | $861 | $597 | 🟢 |
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $676 | $461 | 🟢 |
| Motorizados - API | $745 | $701 | $675 | $465 | $522 | $308 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $496 | $996 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.27 | 9.03 | 🟢 |
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 8.91 | 12.00 | 🟢 |
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.36 | 12.02 | 🟢 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.75 | 13.88 | 🟢 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.47 | 6.07 | 🔴 |

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
| 2026-09-27 | $197,298 | 302 | $653 | $4,445 | 6.80 | $407,071 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
