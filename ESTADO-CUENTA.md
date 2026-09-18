# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-18 13:32 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$133,743** |
| gastado hoy (hasta las 13h) | $53,408 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $128,450 |
| saldo proyectado a medianoche | $58,702 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $60,219 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-14 | $135,193 | 76 | **$1,779** | $5,684 | 3.20 |
| 2026-09-15 | $60,390 | 38 | **$1,589** | $6,134 | 3.86 |
| 2026-09-16 | $85,941 | 65 | **$1,322** | $3,834 | 2.90 |
| 2026-09-17 | $60,971 | 47 | **$1,297** | $3,603 | 2.78 |
| 2026-09-18 **HOY** | $49,848 | 49 | **$1,017** | $4,966 | 4.88 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,017 vs $1,297).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,017  =  $ 4,966  ÷  4.88
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,966 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.88 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $18,198 | 33% | 18 | $1,011 | 4.47 |
| Domiciliarios | $45,000 | $16,215 | 36% | 14 | $1,158 | 3.82 |
| TEST Creativos | $25,000 | $8,556 | 34% | 10 | $856 | 9.43 |
| Domiciliarios - Expancion | $15,000 | $3,774 | 25% | 6 | $629 | 7.91 |
| Publico ABIERTO video | $10,000 | $3,560 | 36% | 1 | $3,560 | 2.64 |
| Motorizados | $9,000 | $3,105 | 34% | 1 | $3,105 | 1.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $49,848 | 49 | **$1,017** | $2,402 | **42%** 🟢 |
| **COLMENA** | $3,560 | 1 | **$3,560** | $3,322 | **107%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,111**/pedido |
| utilidad estimada de lo que va del día | **$48,212** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,385 | $2,026 | $1,498 | $1,207 | $961 | $1,011 | 🟡 |
| Domiciliarios | $944 | $2,087 | $1,856 | $1,060 | $1,322 | $1,158 | 🟢 |
| TEST Creativos | $695 | $1,372 | $618 | $869 | $1,088 | $856 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | $1,413 | $629 | 🟢 |
| Publico ABIERTO video | — | $2,225 | $7,737 | $2,334 | $1,550 | $3,560 | 🔴 |
| Motorizados | $938 | $914 | $1,194 | $1,342 | $1,436 | $3,105 | 🔴 |
| Domiciliarios \| Valle del cauca | — | — | — | $884 | — | — |  |
| Domiciliarios \| Santander | — | — | — | $297 | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 4.35 | 2.23 | 3.06 | 2.79 | 3.69 | 4.47 | 🟢 |
| Domiciliarios | 6.96 | 2.67 | 2.68 | 3.01 | 2.71 | 3.82 | 🟢 |
| TEST Creativos | 18.98 | 5.09 | 11.18 | 7.23 | 5.62 | 9.43 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | 2.49 | 7.91 | 🟢 |
| Publico ABIERTO video | — | 7.29 | 1.39 | 4.47 | 6.55 | 2.64 | 🔴 |
| Motorizados | 8.76 | 8.57 | 5.75 | 2.83 | 2.55 | 1.92 | 🔴 |
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
| 2026-09-16 | $153,488 | 137 | $1,120 | $3,402 | 3.04 | $120,680 |
| 2026-09-17 | $133,364 | 118 | $1,130 | $3,690 | 3.26 | $102,780 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
