# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 19:27 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$42,612** |
| gastado hoy (hasta las 19h) | $140,087 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $149,862 |
| saldo proyectado a medianoche | $32,837 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $58,951 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $94,697 | 87 | **$1,088** | $5,055 | 4.64 |
| 2026-09-19 | $87,512 | 82 | **$1,067** | $4,698 | 4.40 |
| 2026-09-20 | $109,790 | 92 | **$1,193** | $4,873 | 4.08 |
| 2026-09-21 | $153,979 | 129 | **$1,194** | $3,971 | 3.33 |
| 2026-09-22 **HOY** | $140,772 | 129 | **$1,091** | $4,617 | 4.23 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,091 vs $1,194).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,091  =  $ 4,617  ÷  4.23
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,617 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.23 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $35,996 | 90% | 28 | $1,286 | 2.89 |
| TEST Creativos - API | $40,000 | $35,710 | 89% | 31 | $1,152 | 7.79 |
| Domiciliarios - API | $35,000 | $31,956 | 91% | 34 | $940 | 4.13 |
| Domiciliarios VIDEO - API | $20,000 | $19,746 | 99% | 19 | $1,039 | 4.66 |
| Motorizados - API | $20,000 | $17,055 | 85% | 12 | $1,421 | 2.67 |
| Motorizados | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios | $0 | $0 | — | 3 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 1 | $0 | 0.00 |
| Publico ABIERTO video | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $140,463 | 129 | **$1,089** | $2,402 | **45%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,963**/pedido |
| utilidad estimada de lo que va del día | **$117,695** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | $1,286 |  |
| TEST Creativos - API | — | — | — | — | — | $1,152 |  |
| Domiciliarios - API | — | — | — | — | — | $940 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $1,039 |  |
| Motorizados - API | — | — | — | — | — | $1,421 |  |
| Motorizados | $1,438 | $1,848 | $924 | $634 | $1,071 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $878 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $711 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,526 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,017 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | 2.89 |  |
| TEST Creativos - API | — | — | — | — | — | 7.79 |  |
| Domiciliarios - API | — | — | — | — | — | 4.13 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 4.66 |  |
| Motorizados - API | — | — | — | — | — | 2.67 |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.46 | 3.93 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.62 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 9.96 | — | 🟡 |
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
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,959 | 146 | $1,102 | $3,926 | 3.56 | $131,220 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
