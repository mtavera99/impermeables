# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 13:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$104,673** |
| gastado hoy (hasta las 13h) | $59,488 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $130,960 |
| saldo proyectado a medianoche | $33,201 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,209 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $60,390 | 38 | **$1,589** | $6,134 | 3.86 |
| 2026-09-16 | $85,941 | 65 | **$1,322** | $3,834 | 2.90 |
| 2026-09-17 | $61,024 | 47 | **$1,298** | $3,605 | 2.78 |
| 2026-09-18 | $53,275 | 51 | **$1,045** | $5,006 | 4.79 |
| 2026-09-19 **HOY** | $53,620 | 50 | **$1,072** | $4,539 | 4.23 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($1,072 vs $1,045).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,072  =  $ 4,539  ÷  4.23
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,539 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.23 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $23,707 | 43% | 23 | $1,031 | 3.92 |
| TEST Creativos | $25,000 | $11,117 | 44% | 12 | $926 | 8.16 |
| Domiciliarios | $45,000 | $8,196 | 18% | 5 | $1,639 | 2.72 |
| Domiciliarios - Expancion | $15,000 | $6,437 | 43% | 8 | $805 | 4.50 |
| Publico ABIERTO video | $10,000 | $5,850 | 58% | 2 | $2,925 | 3.15 |
| Motorizados | $9,000 | $4,056 | 45% | 2 | $2,028 | 2.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $53,513 | 50 | **$1,070** | $2,402 | **45%** 🟢 |
| **COLMENA** | $5,850 | 2 | **$2,925** | $3,322 | **88%** 🟠 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,741**/pedido |
| utilidad estimada de lo que va del día | **$46,548** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,059 | $1,031 | 🟡 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $759 | $926 | 🔴 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | 🔴 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $865 | $805 | 🟢 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $2,925 | 🔴 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,836 | $2,040 | 🟡 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.23 | 3.92 | 🟡 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.66 | 8.16 | 🔴 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.92 | 2.72 | 🔴 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.30 | 4.50 | 🟡 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 3.15 | 🔴 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.01 | 2.34 | 🔴 |
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
| 2026-09-18 | $113,652 | 110 | $1,033 | $5,019 | 4.86 | $106,482 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
