# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 11:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$117,766** |
| gastado hoy (hasta las 11h) | $46,128 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $130,356 |
| saldo proyectado a medianoche | $33,538 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,476 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $51,661 | 30 | **$1,722** | $6,071 | 3.53 |
| 2026-09-16 | $68,063 | 52 | **$1,309** | $3,979 | 3.04 |
| 2026-09-17 | $44,245 | 35 | **$1,264** | $3,596 | 2.84 |
| 2026-09-18 | $46,073 | 43 | **$1,071** | $4,851 | 4.53 |
| 2026-09-19 **HOY** | $42,387 | 39 | **$1,087** | $4,519 | 4.16 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($1,087 vs $1,071).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,087  =  $ 4,519  ÷  4.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,519 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.16 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $18,768 | 34% | 17 | $1,104 | 3.66 |
| TEST Creativos | $25,000 | $8,445 | 34% | 12 | $704 | 10.70 |
| Domiciliarios | $45,000 | $7,446 | 17% | 4 | $1,862 | 2.37 |
| Domiciliarios - Expancion | $15,000 | $4,688 | 31% | 4 | $1,172 | 3.14 |
| Publico ABIERTO video | $10,000 | $3,741 | 37% | 1 | $3,741 | 2.32 |
| Motorizados | $9,000 | $3,040 | 34% | 2 | $1,520 | 3.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $42,387 | 39 | **$1,087** | $2,402 | **45%** 🟢 |
| **COLMENA** | $3,741 | 1 | **$3,741** | $3,322 | **113%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,939**/pedido |
| utilidad estimada de lo que va del día | **$35,661** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,058 | $1,104 | 🟡 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $758 | $704 | 🟢 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $1,862 | 🔴 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $862 | $1,172 | 🔴 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $3,741 | 🔴 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,834 | $1,520 | 🟢 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.24 | 3.66 | 🟡 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.66 | 10.70 | 🟡 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.92 | 2.37 | 🔴 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.31 | 3.14 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 2.32 | 🔴 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.01 | 3.05 | 🟡 |
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
| 2026-09-18 | $113,533 | 110 | $1,032 | $5,021 | 4.86 | $106,601 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
