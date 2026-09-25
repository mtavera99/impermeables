# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-25 12:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$123,387** |
| gastado hoy (hasta las 12h) | $61,597 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $141,110 |
| saldo proyectado a medianoche | $43,874 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,666 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-21 | $102,763 | 82 | **$1,253** | $4,285 | 3.42 |
| 2026-09-22 | $75,419 | 73 | **$1,033** | $3,876 | 3.75 |
| 2026-09-23 | $63,323 | 61 | **$1,038** | $4,738 | 4.56 |
| 2026-09-24 | $96,522 | 94 | **$1,027** | $4,090 | 3.98 |
| 2026-09-25 **HOY** | $61,597 | 74 | **$832** | $4,718 | 5.67 |

🟢 **Hoy va mejor que ayer a la misma hora** ($832 vs $1,027).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   832  =  $ 4,718  ÷  5.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,718 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.67 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $17,545 | 44% | 22 | $798 | 8.44 |
| Domiciliarios - Expancion - API | $40,000 | $16,711 | 42% | 20 | $836 | 4.30 |
| Domiciliarios - API | $35,000 | $11,511 | 33% | 10 | $1,151 | 4.24 |
| Motorizados - API | $20,000 | $8,693 | 43% | 11 | $790 | 6.13 |
| Domiciliarios VIDEO - API | $20,000 | $7,137 | 36% | 11 | $649 | 6.67 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $61,597 | 74 | **$832** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$9,909**/pedido |
| utilidad estimada de lo que va del día | **$86,493** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | $1,086 | $735 | $753 | $798 | 🟡 |
| Domiciliarios - Expancion - API | — | — | $1,103 | $778 | $1,138 | $836 | 🟢 |
| Domiciliarios - API | — | — | $942 | $889 | $1,107 | $1,151 | 🟡 |
| Motorizados - API | — | — | $1,265 | $745 | $700 | $790 | 🟡 |
| Domiciliarios VIDEO - API | — | — | $972 | $1,254 | $681 | $649 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | 8.43 | 13.10 | 10.11 | 8.44 | 🔴 |
| Domiciliarios - Expancion - API | — | — | 3.42 | 4.66 | 2.82 | 4.30 | 🟢 |
| Domiciliarios - API | — | — | 4.24 | 4.84 | 4.05 | 4.24 | 🟡 |
| Motorizados - API | — | — | 3.17 | 5.36 | 5.40 | 6.13 | 🟢 |
| Domiciliarios VIDEO - API | — | — | 5.10 | 4.36 | 6.87 | 6.67 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,915 | 173 | $820 | $5,018 | 6.12 | $204,297 |
| 2026-09-24 | $176,956 | 202 | $876 | $4,353 | 4.97 | $227,291 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
