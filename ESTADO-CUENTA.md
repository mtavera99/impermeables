# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-22 01:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$185,137** |
| gastado hoy (hasta las 1h) | $285 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $144,711 |
| saldo proyectado a medianoche | $40,711 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $56,228 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $8,864 | 6 | **$1,477** | $4,098 | 2.77 |
| 2026-09-22 **HOY** | $285 | 1 | **$285** | $4,750 | 16.67 |

🟢 **Hoy va mejor que ayer a la misma hora** ($285 vs $1,477).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   285  =  $ 4,750  ÷  16.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,750 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 16.67 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | $20,000 | $263 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $21 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $1 | 0% | 0 | — | 0.00 |
| TEST Creativos | $0 | $0 | — | 1 | $0 | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $285 | 1 | **$285** | $2,402 | **12%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$3,393**/pedido |
| utilidad estimada de lo que va del día | **$1,716** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | — | — | — | — | — | — |  |
| Motorizados | $1,438 | $1,848 | $924 | $633 | $1,051 | — | 🔴 |
| Domiciliarios | $1,323 | $1,185 | $1,639 | $1,738 | $865 | — | 🟢 |
| TEST Creativos | $1,090 | $760 | $987 | $730 | $705 | — | 🟡 |
| Domiciliarios VIDEO | $963 | $1,062 | $899 | $1,148 | $1,514 | — | 🔴 |
| Publico ABIERTO video | $1,552 | $2,224 | $2,550 | $1,111 | $4,278 | — | 🔴 |
| Domiciliarios - Expancion | $1,418 | $866 | $841 | $1,223 | $1,010 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO - API | — | — | — | — | — | — |  |
| Motorizados | 2.54 | 2.99 | 4.93 | 9.47 | 4.00 | — | 🔴 |
| Domiciliarios | 2.71 | 3.91 | 2.66 | 2.74 | 4.71 | — | 🟢 |
| TEST Creativos | 5.61 | 11.64 | 7.77 | 11.20 | 10.05 | — | 🟡 |
| Domiciliarios VIDEO | 3.68 | 4.22 | 4.23 | 3.76 | 2.33 | — | 🔴 |
| Publico ABIERTO video | 6.53 | 4.62 | 3.76 | 8.70 | 2.93 | — | 🔴 |
| Domiciliarios - Expancion | 2.48 | 5.30 | 4.58 | 3.59 | 4.01 | — | 🟢 |

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
| 2026-09-21 | $159,282 | 146 | $1,091 | $3,937 | 3.61 | $132,897 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
