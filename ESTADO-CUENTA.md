# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 12:15 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$72,881** |
| gastado hoy (hasta las 12h) | $61,411 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $132,878 |
| saldo proyectado a medianoche | $1,414 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $113,078 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $78,294 | 57 | **$1,374** | $3,894 | 2.84 |
| 2026-09-17 | $52,846 | 38 | **$1,391** | $3,613 | 2.60 |
| 2026-09-18 | $49,238 | 46 | **$1,070** | $4,911 | 4.59 |
| 2026-09-19 | $50,852 | 48 | **$1,059** | $4,511 | 4.26 |
| 2026-09-20 **HOY** | $57,054 | 47 | **$1,214** | $4,656 | 3.84 |

🟠 Hoy va 15% más caro que ayer a la misma hora ($1,214 vs $1,059).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,214  =  $ 4,656  ÷  3.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,656 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.84 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $22,507 | 41% | 18 | $1,250 | 3.44 |
| Domiciliarios | $45,000 | $15,516 | 34% | 6 | $2,586 | 1.62 |
| TEST Creativos | $25,000 | $9,945 | 40% | 13 | $765 | 9.74 |
| Domiciliarios - Expancion | $15,000 | $5,821 | 39% | 5 | $1,164 | 3.54 |
| Publico ABIERTO video | $10,000 | $4,357 | 44% | 2 | $2,178 | 5.15 |
| Motorizados | $9,000 | $3,265 | 36% | 5 | $653 | 8.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $57,054 | 47 | **$1,214** | $2,402 | **51%** 🟢 |
| **COLMENA** | $4,357 | 2 | **$2,178** | $3,322 | **66%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$14,451**/pedido |
| utilidad estimada de lo que va del día | **$37,003** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,250 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $2,586 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $765 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $837 | $1,164 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,533 | $2,178 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $918 | $653 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.25 | 3.44 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 1.62 | 🔴 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.79 | 9.74 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.60 | 3.54 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 5.15 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.97 | 8.80 | 🟢 |

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
| 2026-09-19 | $119,261 | 127 | $939 | $4,385 | 4.67 | $134,894 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
