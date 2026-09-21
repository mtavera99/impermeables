# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 21:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$10,937** |
| gastado hoy (hasta las 21h) | $122,777 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $132,084 |
| saldo proyectado a medianoche | $1,630 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $113,656 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $152,952 | 135 | **$1,133** | $3,402 | 3.00 |
| 2026-09-17 | $130,567 | 114 | **$1,145** | $3,670 | 3.20 |
| 2026-09-18 | $108,220 | 101 | **$1,071** | $5,006 | 4.67 |
| 2026-09-19 | $107,509 | 110 | **$977** | $4,497 | 4.60 |
| 2026-09-20 **HOY** | $113,620 | 98 | **$1,159** | $4,899 | 4.23 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($1,159 vs $977).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,159  =  $ 4,899  ÷  4.23
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,899 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.23 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $43,368 | 79% | 33 | $1,314 | 3.28 |
| Domiciliarios | $45,000 | $32,580 | 72% | 17 | $1,916 | 2.45 |
| TEST Creativos | $25,000 | $19,386 | 78% | 27 | $718 | 11.23 |
| Domiciliarios - Expancion | $15,000 | $11,502 | 77% | 9 | $1,278 | 3.39 |
| Publico ABIERTO video | $10,000 | $9,280 | 93% | 7 | $1,326 | 7.19 |
| Motorizados | $9,000 | $6,984 | 78% | 12 | $582 | 10.26 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $113,820 | 98 | **$1,161** | $2,402 | **48%** 🟢 |
| **COLMENA** | $9,280 | 7 | **$1,326** | $3,322 | **40%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,827**/pedido |
| utilidad estimada de lo que va del día | **$82,300** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,314 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $1,916 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $718 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $838 | $1,278 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,550 | $1,326 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $922 | $582 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.23 | 3.28 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 2.45 | 🟡 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.77 | 11.23 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.59 | 3.39 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 7.19 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.93 | 10.26 | 🟢 |

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
