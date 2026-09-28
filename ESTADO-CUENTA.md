# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 16:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$51,704** |
| gastado hoy (hasta las 16h) | $140,753 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $208,134 |
| saldo proyectado a medianoche | $-15,677 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $49,193 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $126,279 | 134 | **$942** | $4,158 | 4.41 |
| 2026-09-25 | $93,780 | 113 | **$830** | $4,823 | 5.81 |
| 2026-09-26 | $78,584 | 107 | **$734** | $5,815 | 7.92 |
| 2026-09-27 | $118,276 | 156 | **$758** | $4,424 | 5.84 |
| 2026-09-28 **HOY** | $140,753 | 290 | **$485** | $5,166 | 10.64 |

🟢 **Hoy va mejor que ayer a la misma hora** ($485 vs $758).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   485  =  $ 5,166  ÷  10.64
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,166 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 10.64 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $35,789 | 89% | 59 | $607 | 11.59 |
| Domiciliarios - Expancion - API | $40,000 | $35,367 | 88% | 87 | $407 | 9.36 |
| Domiciliarios - API | $35,000 | $33,953 | 97% | 68 | $499 | 11.61 |
| Motorizados - API | $20,000 | $18,056 | 90% | 64 | $282 | 15.31 |
| Domiciliarios VIDEO - API | $20,000 | $17,588 | 88% | 12 | $1,466 | 4.26 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $140,753 | 290 | **$485** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,778**/pedido |
| utilidad estimada de lo que va del día | **$439,602** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $757 | $820 | $831 | $860 | $607 | 🟢 |
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $648 | $407 | 🟢 |
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $676 | $499 | 🟢 |
| Motorizados - API | $745 | $701 | $675 | $465 | $521 | $282 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $495 | $1,466 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 8.92 | 11.59 | 🟢 |
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.27 | 9.36 | 🟢 |
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.36 | 11.61 | 🟢 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.76 | 15.31 | 🟢 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.47 | 4.26 | 🔴 |

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
| 2026-09-27 | $197,144 | 302 | $653 | $4,446 | 6.81 | $407,225 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
