# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 22:11 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$87,106** |
| gastado hoy (hasta las 20h) | $166,155 |
| presupuesto activo | $0/día |
| cierre proyectado del día | $182,170 |
| saldo proyectado a medianoche | $71,092 |
| objetivo (cubrir un día de 143% + colchón) | $20,000 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $126,855 | 104 | **$1,220** | $3,654 | 3.00 |
| 2026-09-18 | $102,096 | 93 | **$1,098** | $4,997 | 4.55 |
| 2026-09-19 | $94,921 | 95 | **$999** | $4,674 | 4.68 |
| 2026-09-20 | $114,748 | 97 | **$1,183** | $4,915 | 4.16 |
| 2026-09-21 **HOY** | $157,611 | 141 | **$1,118** | $3,940 | 3.52 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,118 vs $1,183).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,118  =  $ 3,940  ÷  3.52
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,940 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.52 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $0 | $78,193 | — | 52 | $1,504 | 2.35 |
| Domiciliarios | $0 | $46,943 | — | 54 | $869 | 4.69 |
| TEST Creativos | $0 | $15,226 | — | 22 | $692 | 10.19 |
| Domiciliarios - Expancion | $0 | $10,006 | — | 10 | $1,001 | 4.05 |
| Publico ABIERTO video | $0 | $8,544 | — | 2 | $4,272 | 2.95 |
| Motorizados | $0 | $7,243 | — | 7 | $1,035 | 4.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $157,611 | 145 | **$1,087** | $2,402 | **45%** 🟢 |
| **COLMENA** | $8,544 | 2 | **$4,272** | $3,322 | **129%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$12,940**/pedido |
| utilidad estimada de lo que va del día | **$132,566** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,148 | $1,504 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,738 | $869 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $692 | 🟢 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,223 | $1,001 | 🟢 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,111 | $4,272 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $924 | $633 | $1,035 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.76 | 2.35 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 4.69 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.20 | 10.19 | 🟡 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 4.05 | 🟢 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.70 | 2.95 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.47 | 4.07 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,934 | 110 | $1,099 | $4,936 | 4.49 | $99,200 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
