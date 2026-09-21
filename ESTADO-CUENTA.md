# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 11:00 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$75,246** |
| gastado hoy (hasta las 10h) | $77,335 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $158,040 |
| saldo proyectado a medianoche | $-5,460 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $94,789 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $39,930 | 31 | **$1,288** | $3,557 | 2.76 |
| 2026-09-18 | $42,781 | 40 | **$1,070** | $4,761 | 4.45 |
| 2026-09-19 | $37,194 | 36 | **$1,033** | $4,594 | 4.45 |
| 2026-09-20 | $54,470 | 43 | **$1,267** | $4,586 | 3.62 |
| 2026-09-21 **HOY** | $73,913 | 56 | **$1,320** | $4,417 | 3.35 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($1,320 vs $1,267).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,320  =  $ 4,417  ÷  3.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,417 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.35 | 5,33 | 🔴 bajo |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $41,735 | 76% | 27 | $1,546 | 2.65 |
| Domiciliarios | $45,000 | $20,230 | 45% | 19 | $1,065 | 4.56 |
| TEST Creativos | $25,000 | $5,104 | 20% | 4 | $1,276 | 5.28 |
| Domiciliarios - Expancion | $15,000 | $4,304 | 29% | 5 | $861 | 4.95 |
| Publico ABIERTO video | $10,000 | $3,422 | 34% | 1 | $3,422 | 3.31 |
| Motorizados | $9,000 | $2,540 | 28% | 2 | $1,270 | 3.38 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $73,913 | 57 | **$1,297** | $2,402 | **54%** 🟢 |
| **COLMENA** | $3,422 | 1 | **$3,422** | $3,322 | **103%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$15,437**/pedido |
| utilidad estimada de lo que va del día | **$40,157** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,144 | $1,546 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,736 | $1,065 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $1,276 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,221 | $861 | 🟢 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,106 | $3,422 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $922 | $630 | $1,270 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.77 | 2.65 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 4.56 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.21 | 5.28 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 4.95 | 🟢 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.71 | 3.31 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.49 | 3.38 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,407 | 127 | $940 | $4,370 | 4.65 | $134,748 |
| 2026-09-20 | $120,647 | 110 | $1,097 | $4,933 | 4.50 | $99,487 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
