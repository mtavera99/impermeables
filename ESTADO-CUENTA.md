# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 18:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$30,981** |
| gastado hoy (hasta las 17h) | $122,359 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $156,306 |
| saldo proyectado a medianoche | $-2,966 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $94,030 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $99,234 | 73 | **$1,359** | $3,661 | 2.69 |
| 2026-09-18 | $77,374 | 73 | **$1,060** | $5,117 | 4.83 |
| 2026-09-19 | $76,540 | 65 | **$1,178** | $4,663 | 3.96 |
| 2026-09-20 | $100,554 | 78 | **$1,289** | $4,785 | 3.71 |
| 2026-09-21 **HOY** | $114,435 | 99 | **$1,156** | $4,326 | 3.74 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,156 vs $1,289).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,156  =  $ 4,326  ÷  3.74
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,326 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.74 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $59,204 | 108% | 41 | $1,444 | 2.68 |
| Domiciliarios | $45,000 | $30,374 | 67% | 34 | $893 | 5.34 |
| TEST Creativos | $25,000 | $11,691 | 47% | 11 | $1,063 | 6.45 |
| Domiciliarios - Expancion | $15,000 | $8,336 | 56% | 7 | $1,191 | 3.46 |
| Publico ABIERTO video | $10,000 | $7,924 | 79% | 2 | $3,962 | 3.14 |
| Motorizados | $9,000 | $4,830 | 54% | 6 | $805 | 5.64 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $114,435 | 99 | **$1,156** | $2,402 | **48%** 🟢 |
| **COLMENA** | $7,924 | 2 | **$3,962** | $3,322 | **119%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,761**/pedido |
| utilidad estimada de lo que va del día | **$83,686** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,148 | $1,444 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,737 | $893 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $1,063 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,223 | $1,191 | 🟡 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,111 | $3,962 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $923 | $633 | $805 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.76 | 2.68 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 5.34 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.20 | 6.45 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 3.46 | 🟡 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.70 | 3.14 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.47 | 5.64 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,430 | 127 | $940 | $4,371 | 4.65 | $134,725 |
| 2026-09-20 | $120,918 | 110 | $1,099 | $4,936 | 4.49 | $99,216 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
