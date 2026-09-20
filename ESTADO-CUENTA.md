# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 21:14 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$59,045** |
| gastado hoy (hasta las 21h) | $104,185 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $109,046 |
| saldo proyectado a medianoche | $54,184 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $84,140 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $179,652 | 112 | **$1,604** | $4,970 | 3.10 |
| 2026-09-16 | $152,952 | 135 | **$1,133** | $3,402 | 3.00 |
| 2026-09-17 | $130,567 | 114 | **$1,145** | $3,670 | 3.20 |
| 2026-09-18 | $108,214 | 101 | **$1,071** | $5,007 | 4.67 |
| 2026-09-19 **HOY** | $95,093 | 95 | **$1,001** | $4,694 | 4.69 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,001 vs $1,071).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,001  =  $ 4,694  ÷  4.69
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,694 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.69 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $45,952 | 84% | 49 | $938 | 4.42 |
| TEST Creativos | $25,000 | $20,306 | 81% | 20 | $1,015 | 7.90 |
| Domiciliarios - Expancion | $15,000 | $12,017 | 80% | 11 | $1,092 | 3.50 |
| Publico ABIERTO video | $10,000 | $9,092 | 91% | 4 | $2,273 | 4.09 |
| Motorizados | $9,000 | $8,622 | 96% | 10 | $862 | 6.09 |
| Domiciliarios | $45,000 | $8,196 | 18% | 5 | $1,639 | 2.68 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $95,093 | 95 | **$1,001** | $2,402 | **42%** 🟢 |
| **COLMENA** | $9,092 | 4 | **$2,273** | $3,322 | **68%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,916**/pedido |
| utilidad estimada de lo que va del día | **$95,023** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,062 | $938 | 🟢 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $759 | $1,015 | 🔴 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $866 | $1,092 | 🔴 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $2,273 | 🟡 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,848 | $862 | 🟢 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | 🔴 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.22 | 4.42 | 🟡 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.65 | 7.90 | 🔴 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.30 | 3.50 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 4.09 | 🟡 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 2.99 | 6.09 | 🟢 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.91 | 2.68 | 🔴 |
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
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,816 | 110 | $1,035 | $5,018 | 4.85 | $106,318 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
