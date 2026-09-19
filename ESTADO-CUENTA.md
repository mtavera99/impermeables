# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 16:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$88,910** |
| gastado hoy (hasta las 16h) | $75,143 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $126,755 |
| saldo proyectado a medianoche | $37,298 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,317 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $121,720 | 63 | **$1,932** | $5,663 | 2.93 |
| 2026-09-16 | $109,354 | 93 | **$1,176** | $3,646 | 3.10 |
| 2026-09-17 | $82,291 | 61 | **$1,349** | $3,686 | 2.73 |
| 2026-09-18 | $70,015 | 66 | **$1,061** | $5,122 | 4.83 |
| 2026-09-19 **HOY** | $68,056 | 57 | **$1,194** | $4,604 | 3.86 |

🟠 Hoy va 13% más caro que ayer a la misma hora ($1,194 vs $1,061).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,194  =  $ 4,604  ÷  3.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,604 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.86 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $30,582 | 56% | 26 | $1,176 | 3.46 |
| TEST Creativos | $25,000 | $15,155 | 61% | 13 | $1,166 | 6.45 |
| Domiciliarios - Expancion | $15,000 | $8,710 | 58% | 8 | $1,089 | 3.40 |
| Domiciliarios | $45,000 | $8,196 | 18% | 5 | $1,639 | 2.70 |
| Publico ABIERTO video | $10,000 | $7,087 | 71% | 3 | $2,362 | 3.90 |
| Motorizados | $9,000 | $5,413 | 60% | 5 | $1,083 | 4.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $68,056 | 57 | **$1,194** | $2,402 | **50%** 🟢 |
| **COLMENA** | $7,087 | 3 | **$2,362** | $3,322 | **71%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$14,214**/pedido |
| utilidad estimada de lo que va del día | **$46,014** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,060 | $1,176 | 🟡 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $759 | $1,166 | 🔴 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $866 | $1,089 | 🔴 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | 🔴 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $2,367 | 🟡 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,842 | $1,083 | 🟢 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.23 | 3.46 | 🔴 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.66 | 6.45 | 🔴 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.30 | 3.40 | 🔴 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.91 | 2.70 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 3.89 | 🔴 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.00 | 4.78 | 🟢 |
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
| 2026-09-18 | $113,692 | 110 | $1,034 | $5,016 | 4.85 | $106,442 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
