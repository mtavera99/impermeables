# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 15:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$95,302** |
| gastado hoy (hasta las 14h) | $88,081 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $135,833 |
| saldo proyectado a medianoche | $47,550 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $58,267 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $58,108 | 58 | **$1,002** | $5,096 | 5.09 |
| 2026-09-19 | $60,694 | 53 | **$1,145** | $4,594 | 4.01 |
| 2026-09-20 | $84,919 | 58 | **$1,464** | $4,642 | 3.17 |
| 2026-09-21 | $108,064 | 91 | **$1,188** | $4,288 | 3.61 |
| 2026-09-22 **HOY** | $88,081 | 93 | **$947** | $4,049 | 4.27 |

🟢 **Hoy va mejor que ayer a la misma hora** ($947 vs $1,188).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   947  =  $ 4,049  ÷  4.27
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,049 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.27 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $22,831 | 57% | 17 | $1,343 | 2.53 |
| Domiciliarios - API | $35,000 | $20,721 | 59% | 24 | $863 | 3.97 |
| TEST Creativos - API | $40,000 | $20,633 | 52% | 21 | $983 | 7.80 |
| Domiciliarios VIDEO - API | $20,000 | $12,980 | 65% | 17 | $764 | 5.75 |
| Motorizados - API | $20,000 | $10,916 | 55% | 10 | $1,092 | 2.99 |
| Motorizados | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios | $0 | $0 | — | 2 | $0 | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 1 | $0 | 0.00 |
| Publico ABIERTO video | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $88,081 | 93 | **$947** | $2,402 | **39%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,275**/pedido |
| utilidad estimada de lo que va del día | **$98,033** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | $1,343 |  |
| Domiciliarios - API | — | — | — | — | — | $863 |  |
| TEST Creativos - API | — | — | — | — | — | $983 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $764 |  |
| Motorizados - API | — | — | — | — | — | $1,092 |  |
| Motorizados | $1,438 | $1,848 | $924 | $634 | $1,067 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $877 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $711 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,526 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,296 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,015 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | — | — | 2.53 |  |
| Domiciliarios - API | — | — | — | — | — | 3.97 |  |
| TEST Creativos - API | — | — | — | — | — | 7.80 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 5.75 |  |
| Motorizados - API | — | — | — | — | — | 2.99 |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.46 | 3.94 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.63 | — | 🟢 |
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
| 2026-09-20 | $120,970 | 110 | $1,100 | $4,937 | 4.49 | $99,164 |
| 2026-09-21 | $160,841 | 146 | $1,102 | $3,926 | 3.56 | $131,338 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
