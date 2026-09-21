# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 16:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$40,688** |
| gastado hoy (hasta las 15h) | $112,529 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $157,467 |
| saldo proyectado a medianoche | $-4,250 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $94,153 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $73,204 | 56 | **$1,307** | $3,644 | 2.79 |
| 2026-09-18 | $63,360 | 62 | **$1,022** | $5,153 | 5.04 |
| 2026-09-19 | $66,133 | 55 | **$1,202** | $4,605 | 3.83 |
| 2026-09-20 | $90,832 | 65 | **$1,397** | $4,703 | 3.37 |
| 2026-09-21 **HOY** | $106,158 | 94 | **$1,129** | $4,304 | 3.81 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,129 vs $1,397).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,129  =  $ 4,304  ÷  3.81
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,304 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.81 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $57,056 | 104% | 38 | $1,501 | 2.59 |
| Domiciliarios | $45,000 | $27,117 | 60% | 33 | $822 | 5.77 |
| TEST Creativos | $25,000 | $10,170 | 41% | 11 | $925 | 7.35 |
| Domiciliarios - Expancion | $15,000 | $7,559 | 50% | 7 | $1,080 | 3.87 |
| Publico ABIERTO video | $10,000 | $6,371 | 64% | 1 | $6,371 | 1.86 |
| Motorizados | $9,000 | $4,256 | 47% | 5 | $851 | 5.32 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $106,158 | 94 | **$1,129** | $2,402 | **47%** 🟢 |
| **COLMENA** | $6,371 | 1 | **$6,371** | $3,322 | **192%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,445**/pedido |
| utilidad estimada de lo que va del día | **$81,957** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,146 | $1,501 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,737 | $822 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $925 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,223 | $1,080 | 🟢 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,111 | $6,371 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $923 | $633 | $851 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.76 | 2.59 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 5.77 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.21 | 7.35 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 3.87 | 🟢 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.70 | 1.86 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.47 | 5.32 | 🔴 |

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
| 2026-09-20 | $120,830 | 110 | $1,098 | $4,934 | 4.49 | $99,304 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
