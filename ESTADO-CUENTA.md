# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 08:10 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$149,396** |
| gastado hoy (hasta las 8h) | $14,579 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $114,946 |
| saldo proyectado a medianoche | $49,030 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,395 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $36,938 | 18 | **$2,052** | $6,044 | 2.95 |
| 2026-09-16 | $43,292 | 35 | **$1,237** | $4,220 | 3.41 |
| 2026-09-17 | $30,241 | 24 | **$1,260** | $3,501 | 2.78 |
| 2026-09-18 | $30,685 | 30 | **$1,023** | $4,615 | 4.51 |
| 2026-09-19 **HOY** | $13,182 | 9 | **$1,465** | $4,999 | 3.41 |

🟠 Hoy va 43% más caro que ayer a la misma hora ($1,465 vs $1,023).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,465  =  $ 4,999  ÷  3.41
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,999 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.41 | 5,33 | 🔴 bajo |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $6,535 | 12% | 5 | $1,307 | 3.42 |
| Domiciliarios | $45,000 | $2,503 | 6% | 1 | $2,503 | 2.00 |
| TEST Creativos | $25,000 | $2,267 | 9% | 2 | $1,134 | 7.63 |
| Publico ABIERTO video | $10,000 | $1,397 | 14% | 1 | $1,397 | 5.99 |
| Domiciliarios - Expancion | $15,000 | $1,042 | 7% | 1 | $1,042 | 3.77 |
| Motorizados | $9,000 | $835 | 9% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $13,182 | 9 | **$1,465** | $2,402 | **61%** 🟢 |
| **COLMENA** | $1,397 | 1 | **$1,397** | $3,322 | **42%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$17,437**/pedido |
| utilidad estimada de lo que va del día | **$4,829** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,055 | $1,307 | 🔴 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,184 | $2,503 | 🔴 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $757 | $1,134 | 🔴 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,223 | $1,397 | 🟢 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $860 | $1,042 | 🔴 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,829 | — | 🔴 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.25 | 3.42 | 🔴 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.93 | 2.00 | 🔴 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.68 | 7.63 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.63 | 5.99 | 🟢 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.32 | 3.77 | 🔴 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.03 | — | 🟢 |
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
| 2026-09-18 | $113,302 | 110 | $1,030 | $5,024 | 4.88 | $106,832 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
