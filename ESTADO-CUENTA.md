# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 06:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$168,050** |
| gastado hoy (hasta las 6h) | $16,188 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $147,020 |
| saldo proyectado a medianoche | $37,218 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $57,412 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $9,466 | 7 | **$1,352** | $5,523 | 4.08 |
| 2026-09-19 | $6,385 | 5 | **$1,277** | $5,490 | 4.30 |
| 2026-09-20 | $20,967 | 16 | **$1,310** | $4,211 | 3.21 |
| 2026-09-21 | $15,007 | 12 | **$1,251** | $5,416 | 4.33 |
| 2026-09-22 **HOY** | $16,188 | 17 | **$952** | $3,160 | 3.32 |

🟢 **Hoy va mejor que ayer a la misma hora** ($952 vs $1,251).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   952  =  $ 3,160  ÷  3.32
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,160 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.32 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $6,294 | 18% | 8 | $787 | 3.36 |
| Domiciliarios VIDEO - API | $20,000 | $4,502 | 23% | 5 | $900 | 4.18 |
| Motorizados - API | $20,000 | $2,839 | 14% | 1 | $2,839 | 0.99 |
| TEST Creativos - API | $40,000 | $2,312 | 6% | 2 | $1,156 | 4.23 |
| Domiciliarios - Expancion - API | $40,000 | $241 | 1% | 0 | — | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |
| Domiciliarios VIDEO | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $16,188 | 17 | **$952** | $2,402 | **40%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,336**/pedido |
| utilidad estimada de lo que va del día | **$17,833** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | — | — | $787 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | $900 |  |
| Motorizados - API | — | — | — | — | — | $2,839 |  |
| TEST Creativos - API | — | — | — | — | — | $1,156 |  |
| Domiciliarios - Expancion - API | — | — | — | — | — | — |  |
| Motorizados | $1,438 | $1,848 | $924 | $633 | $1,058 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $872 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $708 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,519 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,286 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,013 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | — | — | — | — | — | 3.36 |  |
| Domiciliarios VIDEO - API | — | — | — | — | — | 4.18 |  |
| Motorizados - API | — | — | — | — | — | 0.99 |  |
| TEST Creativos - API | — | — | — | — | — | 4.23 |  |
| Domiciliarios - Expancion - API | — | — | — | — | — | — |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.47 | 3.98 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.67 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 10.00 | — | 🟡 |
| Domiciliarios VIDEO | 3.68 | 4.22 | 4.23 | 3.76 | 2.31 | — | 🔴 |
| Publico ABIERTO video | 6.53 | 4.62 | 3.76 | 8.70 | 2.93 | — | 🔴 |
| Domiciliarios - Expancion | 2.48 | 5.30 | 4.58 | 3.59 | 4.00 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,934 | 110 | $1,099 | $4,936 | 4.49 | $99,200 |
| 2026-09-21 | $160,063 | 146 | $1,096 | $3,931 | 3.59 | $132,116 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
