# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-28 18:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$37,220** |
| gastado hoy (hasta las 17h) | $147,726 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $200,974 |
| saldo proyectado a medianoche | $-16,028 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $56,704 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-24 | $134,173 | 141 | **$952** | $4,169 | 4.38 |
| 2026-09-25 | $100,150 | 119 | **$842** | $4,860 | 5.77 |
| 2026-09-26 | $89,090 | 115 | **$775** | $5,733 | 7.40 |
| 2026-09-27 | $136,074 | 179 | **$760** | $4,358 | 5.73 |
| 2026-09-28 **HOY** | $147,726 | 322 | **$459** | $5,193 | 11.32 |

🟢 **Hoy va mejor que ayer a la misma hora** ($459 vs $760).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   459  =  $ 5,193  ÷  11.32
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,193 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 11.32 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $37,801 | 95% | 67 | $564 | 12.62 |
| Domiciliarios - Expancion - API | $40,000 | $37,374 | 93% | 96 | $389 | 9.87 |
| Domiciliarios - API | $35,000 | $35,777 | 102% | 78 | $459 | 12.63 |
| Motorizados - API | $20,000 | $18,973 | 95% | 69 | $275 | 15.77 |
| Domiciliarios VIDEO - API | $20,000 | $17,801 | 89% | 13 | $1,369 | 4.55 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $147,726 | 323 | **$457** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$5,445**/pedido |
| utilidad estimada de lo que va del día | **$498,669** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $735 | $757 | $820 | $831 | $861 | $564 | 🟢 |
| Domiciliarios - Expancion - API | $778 | $1,140 | $734 | $643 | $648 | $389 | 🟢 |
| Domiciliarios - API | $889 | $1,108 | $1,005 | $992 | $676 | $459 | 🟢 |
| Motorizados - API | $745 | $701 | $675 | $465 | $521 | $275 | 🟢 |
| Domiciliarios VIDEO - API | $1,254 | $681 | $698 | $701 | $495 | $1,369 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-23 | 09-24 | 09-25 | 09-26 | 09-27 | 09-28 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 13.10 | 10.08 | 8.98 | 9.92 | 8.92 | 12.62 | 🟢 |
| Domiciliarios - Expancion - API | 4.66 | 2.81 | 5.38 | 6.56 | 5.27 | 9.87 | 🟢 |
| Domiciliarios - API | 4.84 | 4.04 | 5.46 | 5.71 | 6.36 | 12.63 | 🟢 |
| Motorizados - API | 5.36 | 5.39 | 7.40 | 10.38 | 7.76 | 15.77 | 🟢 |
| Domiciliarios VIDEO - API | 4.36 | 6.86 | 6.85 | 7.30 | 8.47 | 4.55 | 🔴 |

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
| 2026-09-27 | $197,182 | 302 | $653 | $4,446 | 6.81 | $407,187 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
