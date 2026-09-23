# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-23 15:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,079** |
| gastado hoy (hasta las 15h) | $71,078 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $135,514 |
| saldo proyectado a medianoche | $68,644 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $37,493 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-19 | $66,133 | 55 | **$1,202** | $4,605 | 3.83 |
| 2026-09-20 | $90,934 | 65 | **$1,399** | $4,708 | 3.37 |
| 2026-09-21 | $111,044 | 95 | **$1,169** | $4,313 | 3.69 |
| 2026-09-22 | $102,691 | 100 | **$1,027** | $4,243 | 4.13 |
| 2026-09-23 **HOY** | $71,169 | 74 | **$962** | $4,861 | 5.05 |

🟢 **Hoy va mejor que ayer a la misma hora** ($962 vs $1,027).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   962  =  $ 4,861  ÷  5.05
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,861 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.05 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $24,156 | 60% | 29 | $833 | 11.04 |
| Domiciliarios - Expancion - API | $40,000 | $16,266 | 41% | 14 | $1,162 | 2.90 |
| Domiciliarios - API | $35,000 | $14,493 | 41% | 16 | $906 | 4.49 |
| Domiciliarios VIDEO - API | $20,000 | $8,474 | 42% | 5 | $1,695 | 3.24 |
| Motorizados - API | $20,000 | $7,742 | 39% | 10 | $774 | 4.84 |
| Motorizados | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $71,131 | 74 | **$961** | $2,402 | **40%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,443**/pedido |
| utilidad estimada de lo que va del día | **$76,959** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | $1,085 | $835 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | $1,101 | $1,162 | 🟡 |
| Domiciliarios - API | — | — | — | — | $942 | $906 | 🟡 |
| Domiciliarios VIDEO - API | — | — | — | — | $972 | $1,695 | 🔴 |
| Motorizados - API | — | — | — | — | $1,265 | $774 | 🟢 |
| Motorizados | $1,848 | $924 | $634 | $1,071 | — | — | 🔴 |
| Domiciliarios | $1,185 | $1,639 | $1,738 | $878 | — | — | 🟢 |
| TEST Creativos | $760 | $987 | $730 | $711 | — | — | 🟡 |
| Domiciliarios VIDEO | $1,062 | $899 | $1,148 | $1,527 | — | — | 🔴 |
| Publico ABIERTO video | $2,224 | $2,550 | $1,111 | $4,298 | — | — | 🔴 |
| Domiciliarios - Expancion | $866 | $841 | $1,223 | $1,017 | — | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | 8.44 | 11.00 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | 3.43 | 2.90 | 🔴 |
| Domiciliarios - API | — | — | — | — | 4.24 | 4.49 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | 5.10 | 3.24 | 🔴 |
| Motorizados - API | — | — | — | — | 3.17 | 4.84 | 🟢 |
| Motorizados | 2.99 | 4.93 | 9.46 | 3.93 | — | — | 🔴 |
| Domiciliarios | 3.91 | 2.66 | 2.74 | 4.62 | — | — | 🟢 |
| TEST Creativos | 11.64 | 7.77 | 11.20 | 9.96 | — | — | 🟡 |
| Domiciliarios VIDEO | 4.22 | 4.23 | 3.76 | 2.30 | — | — | 🔴 |
| Publico ABIERTO video | 4.62 | 3.76 | 8.70 | 2.92 | — | — | 🔴 |
| Domiciliarios - Expancion | 5.30 | 4.58 | 3.59 | 3.98 | — | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,688 | 175 | $1,027 | $4,763 | 4.64 | $170,526 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
