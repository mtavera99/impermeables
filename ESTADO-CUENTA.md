# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 20:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$17,540** |
| gastado hoy (hasta las 20h) | $116,715 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $135,747 |
| saldo proyectado a medianoche | $-1,492 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $113,115 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $148,629 | 131 | **$1,135** | $3,425 | 3.02 |
| 2026-09-17 | $126,855 | 104 | **$1,220** | $3,654 | 3.00 |
| 2026-09-18 | $102,096 | 93 | **$1,098** | $4,997 | 4.55 |
| 2026-09-19 | $94,853 | 95 | **$998** | $4,672 | 4.68 |
| 2026-09-20 **HOY** | $108,079 | 92 | **$1,175** | $4,861 | 4.14 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($1,175 vs $998).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,175  =  $ 4,861  ÷  4.14
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,861 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.14 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $41,234 | 75% | 30 | $1,374 | 3.12 |
| Domiciliarios | $45,000 | $30,758 | 68% | 15 | $2,051 | 2.26 |
| TEST Creativos | $25,000 | $18,579 | 74% | 27 | $688 | 11.56 |
| Domiciliarios - Expancion | $15,000 | $10,810 | 72% | 8 | $1,351 | 3.18 |
| Publico ABIERTO video | $10,000 | $8,636 | 86% | 6 | $1,439 | 6.73 |
| Motorizados | $9,000 | $6,698 | 74% | 12 | $558 | 10.74 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $108,079 | 92 | **$1,175** | $2,402 | **49%** 🟢 |
| **COLMENA** | $8,636 | 6 | **$1,439** | $3,322 | **43%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,985**/pedido |
| utilidad estimada de lo que va del día | **$76,033** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,374 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $2,051 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $688 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $838 | $1,351 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,550 | $1,439 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $922 | $558 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.23 | 3.12 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 2.26 | 🔴 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.77 | 11.56 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.59 | 3.18 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 6.73 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.93 | 10.74 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,360 | 127 | $940 | $4,370 | 4.65 | $134,795 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
