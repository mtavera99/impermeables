# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 19:10 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$119,054** |
| gastado hoy (hasta las 19h) | $133,409 |
| presupuesto activo | $149,000/día |
| cierre proyectado del día | $156,325 |
| saldo proyectado a medianoche | $96,138 |
| objetivo (cubrir un día de 143% + colchón) | $233,070 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $111,647 | 82 | **$1,362** | $3,657 | 2.69 |
| 2026-09-18 | $94,697 | 87 | **$1,088** | $5,055 | 4.64 |
| 2026-09-19 | $87,512 | 82 | **$1,067** | $4,698 | 4.40 |
| 2026-09-20 | $109,754 | 92 | **$1,193** | $4,872 | 4.08 |
| 2026-09-21 **HOY** | $125,065 | 107 | **$1,169** | $4,257 | 3.64 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,169 vs $1,193).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,169  =  $ 4,257  ÷  3.64
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,257 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.64 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $62,894 | 114% | 43 | $1,463 | 2.60 |
| Domiciliarios | $45,000 | $34,301 | 76% | 38 | $903 | 5.12 |
| TEST Creativos | $25,000 | $13,057 | 52% | 13 | $1,004 | 6.82 |
| Domiciliarios - Expancion | $15,000 | $9,235 | 62% | 7 | $1,319 | 3.13 |
| Publico ABIERTO video | $0 | $8,344 | — | 2 | $4,172 | 3.01 |
| Motorizados | $9,000 | $5,578 | 62% | 6 | $930 | 4.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $125,065 | 107 | **$1,169** | $2,402 | **49%** 🟢 |
| **COLMENA** | $8,344 | 2 | **$4,172** | $3,322 | **126%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,915**/pedido |
| utilidad estimada de lo que va del día | **$89,066** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,148 | $1,463 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,738 | $903 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $1,004 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,223 | $1,319 | 🟡 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,111 | $4,172 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $924 | $633 | $930 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.76 | 2.60 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 5.12 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.20 | 6.82 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 3.13 | 🟡 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.70 | 3.01 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.47 | 4.75 | 🔴 |

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
| 2026-09-20 | $120,929 | 110 | $1,099 | $4,936 | 4.49 | $99,205 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
