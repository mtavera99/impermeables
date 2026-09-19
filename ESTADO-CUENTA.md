# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 09:10 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$141,365** |
| gastado hoy (hasta las 9h) | $22,835 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $115,864 |
| saldo proyectado a medianoche | $48,336 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,170 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $42,237 | 20 | **$2,112** | $5,888 | 2.79 |
| 2026-09-16 | $50,753 | 44 | **$1,153** | $4,153 | 3.60 |
| 2026-09-17 | $36,258 | 26 | **$1,395** | $3,535 | 2.53 |
| 2026-09-18 | $38,320 | 36 | **$1,064** | $4,716 | 4.43 |
| 2026-09-19 **HOY** | $20,874 | 19 | **$1,099** | $4,867 | 4.43 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($1,099 vs $1,064).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,099  =  $ 4,867  ÷  4.43
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,867 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.43 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $9,491 | 17% | 11 | $863 | 5.02 |
| Domiciliarios | $45,000 | $4,399 | 10% | 2 | $2,200 | 2.21 |
| TEST Creativos | $25,000 | $4,016 | 16% | 4 | $1,004 | 8.08 |
| Publico ABIERTO video | $10,000 | $1,961 | 20% | 1 | $1,961 | 4.03 |
| Domiciliarios - Expancion | $15,000 | $1,751 | 12% | 2 | $876 | 4.48 |
| Motorizados | $9,000 | $1,217 | 14% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $20,874 | 19 | **$1,099** | $2,402 | **46%** 🟢 |
| **COLMENA** | $1,961 | 1 | **$1,961** | $3,322 | **59%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,079**/pedido |
| utilidad estimada de lo que va del día | **$17,149** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,056 | $863 | 🟢 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $2,200 | 🔴 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $757 | $1,004 | 🔴 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $1,961 | 🟢 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $861 | $876 | 🟡 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,831 | — | 🔴 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.24 | 5.02 | 🟢 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.93 | 2.21 | 🔴 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.68 | 8.08 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 4.03 | 🟡 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.31 | 4.48 | 🔴 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.02 | — | 🟢 |
| Domiciliarios \| Valle del cauca | — | — | 3.69 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,596 | 118 | $1,132 | $3,689 | 3.26 | $102,548 |
| 2026-09-18 | $113,379 | 110 | $1,031 | $5,023 | 4.87 | $106,755 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
