# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 13:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$113,057** |
| gastado hoy (hasta las 12h) | $70,711 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $128,892 |
| saldo proyectado a medianoche | $54,876 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,882 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $49,238 | 46 | **$1,070** | $4,911 | 4.59 |
| 2026-09-19 | $50,897 | 48 | **$1,060** | $4,512 | 4.26 |
| 2026-09-20 | $70,929 | 49 | **$1,448** | $4,715 | 3.26 |
| 2026-09-21 | $102,746 | 82 | **$1,253** | $4,284 | 3.42 |
| 2026-09-22 **HOY** | $70,711 | 70 | **$1,010** | $3,830 | 3.79 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,010 vs $1,253).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,010  =  $ 3,830  ÷  3.79
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,830 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.79 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $18,323 | 46% | 10 | $1,832 | 1.81 |
| Domiciliarios - API | $35,000 | $17,369 | 50% | 21 | $827 | 3.98 |
| TEST Creativos - API | $40,000 | $15,313 | 38% | 14 | $1,094 | 6.45 |
| Domiciliarios VIDEO - API | $20,000 | $10,666 | 53% | 13 | $820 | 5.02 |
| Motorizados - API | $20,000 | $9,040 | 45% | 9 | $1,004 | 3.11 |
| Domiciliarios | $0 | $0 | — | 2 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |
| Publico ABIERTO video | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $70,711 | 70 | **$1,010** | $2,402 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,026**/pedido |
| utilidad estimada de lo que va del día | **$69,375** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | $1,832 |  |
| Domiciliarios - API | — | — | — | — | — | $827 |  |
| TEST Creativos - API | — | — | — | — | — | $1,094 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $820 |  |
| Motorizados - API | — | — | — | — | — | $1,004 |  |
| Motorizados | $1,438 | $1,848 | $924 | $634 | $1,067 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $876 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $710 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,525 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,015 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | 1.81 |  |
| Domiciliarios - API | — | — | — | — | — | 3.98 |  |
| TEST Creativos - API | — | — | — | — | — | 6.45 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 5.02 |  |
| Motorizados - API | — | — | — | — | — | 3.11 |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.46 | 3.95 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.63 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 9.97 | — | 🟡 |
| Domiciliarios VIDEO | 3.68 | 4.22 | 4.23 | 3.76 | 2.30 | — | 🔴 |
| Publico ABIERTO video | 6.53 | 4.62 | 3.76 | 8.70 | 2.92 | — | 🔴 |
| Domiciliarios - Expancion | 2.48 | 5.30 | 4.58 | 3.59 | 3.98 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,970 | 110 | $1,100 | $4,937 | 4.49 | $99,164 |
| 2026-09-21 | $160,736 | 146 | $1,101 | $3,927 | 3.57 | $131,443 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
