# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 13:15 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$63,788** |
| gastado hoy (hasta las 13h) | $70,969 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $137,354 |
| saldo proyectado a medianoche | $-2,597 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $112,613 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $85,941 | 65 | **$1,322** | $3,834 | 2.90 |
| 2026-09-17 | $61,024 | 47 | **$1,298** | $3,605 | 2.78 |
| 2026-09-18 | $53,339 | 51 | **$1,046** | $5,011 | 4.79 |
| 2026-09-19 | $55,732 | 51 | **$1,093** | $4,552 | 4.17 |
| 2026-09-20 **HOY** | $66,305 | 49 | **$1,353** | $4,663 | 3.45 |

🟠 Hoy va 24% más caro que ayer a la misma hora ($1,353 vs $1,093).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,353  =  $ 4,663  ÷  3.45
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,663 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.45 | 5,33 | 🔴 bajo |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $26,718 | 49% | 19 | $1,406 | 3.06 |
| Domiciliarios | $45,000 | $19,077 | 42% | 6 | $3,180 | 1.36 |
| TEST Creativos | $25,000 | $10,411 | 42% | 14 | $744 | 9.98 |
| Domiciliarios - Expancion | $15,000 | $6,494 | 43% | 5 | $1,299 | 3.24 |
| Publico ABIERTO video | $10,000 | $4,766 | 48% | 3 | $1,589 | 6.82 |
| Motorizados | $9,000 | $3,594 | 40% | 5 | $719 | 7.95 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $66,294 | 49 | **$1,353** | $2,402 | **56%** 🟢 |
| **COLMENA** | $4,766 | 3 | **$1,589** | $3,322 | **48%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$16,106**/pedido |
| utilidad estimada de lo que va del día | **$31,766** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,406 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $3,180 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $744 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $837 | $1,299 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,533 | $1,589 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $919 | $719 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.24 | 3.06 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 1.36 | 🔴 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.79 | 9.98 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.60 | 3.24 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 6.82 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.97 | 7.95 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,018 | 4.85 | $106,312 |
| 2026-09-19 | $119,294 | 127 | $939 | $4,383 | 4.67 | $134,861 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
