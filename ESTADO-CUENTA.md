# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-18 23:44 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$66,076** |
| gastado hoy (hasta las 23h) | $120,635 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $120,635 |
| saldo proyectado a medianoche | $66,076 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $60,659 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-14 | $225,766 | 120 | **$1,881** | $5,148 | 2.74 |
| 2026-09-15 | $185,055 | 122 | **$1,517** | $4,920 | 3.24 |
| 2026-09-16 | $153,504 | 137 | **$1,120** | $3,403 | 3.04 |
| 2026-09-17 | $133,580 | 118 | **$1,132** | $3,689 | 3.26 |
| 2026-09-18 **HOY** | $111,803 | 109 | **$1,026** | $5,014 | 4.89 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,026 vs $1,132).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,026  =  $ 5,014  ÷  4.89
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,014 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.89 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $42,659 | 78% | 41 | $1,040 | 4.30 |
| Domiciliarios | $45,000 | $33,963 | 75% | 29 | $1,171 | 3.97 |
| TEST Creativos | $25,000 | $18,683 | 75% | 24 | $778 | 11.32 |
| Domiciliarios - Expancion | $15,000 | $9,362 | 62% | 11 | $851 | 5.38 |
| Publico ABIERTO video | $10,000 | $8,832 | 88% | 4 | $2,208 | 4.67 |
| Motorizados | $9,000 | $7,136 | 79% | 4 | $1,784 | 3.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $111,803 | 109 | **$1,026** | $2,402 | **43%** 🟢 |
| **COLMENA** | $8,832 | 4 | **$2,208** | $3,322 | **66%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,211**/pedido |
| utilidad estimada de lo que va del día | **$106,330** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,385 | $2,026 | $1,498 | $1,208 | $963 | $1,040 | 🟡 |
| Domiciliarios | $944 | $2,087 | $1,856 | $1,060 | $1,323 | $1,171 | 🟢 |
| TEST Creativos | $695 | $1,372 | $618 | $869 | $1,090 | $778 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | $1,418 | $851 | 🟢 |
| Publico ABIERTO video | — | $2,225 | $7,737 | $2,334 | $1,552 | $2,208 | 🔴 |
| Motorizados | $938 | $914 | $1,194 | $1,342 | $1,438 | $1,784 | 🔴 |
| Domiciliarios \| Valle del cauca | — | — | — | $884 | — | — |  |
| Domiciliarios \| Santander | — | — | — | $297 | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 4.35 | 2.23 | 3.06 | 2.79 | 3.68 | 4.30 | 🟢 |
| Domiciliarios | 6.96 | 2.67 | 2.68 | 3.01 | 2.71 | 3.97 | 🟢 |
| TEST Creativos | 18.98 | 5.09 | 11.18 | 7.23 | 5.61 | 11.32 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | 2.48 | 5.38 | 🟢 |
| Publico ABIERTO video | — | 7.29 | 1.39 | 4.47 | 6.53 | 4.67 | 🔴 |
| Motorizados | 8.76 | 8.57 | 5.75 | 2.83 | 2.54 | 3.07 | 🟢 |
| Domiciliarios \| Valle del cauca | — | — | — | 3.69 | — | — |  |
| Domiciliarios \| Santander | — | — | — | 12.99 | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-12 | $87,262 | 94 | $928 | $4,374 | 4.71 | $100,853 |
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,580 | 118 | $1,132 | $3,689 | 3.26 | $102,564 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
