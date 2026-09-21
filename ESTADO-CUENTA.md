# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 07:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$132,666** |
| gastado hoy (hasta las 7h) | $21,532 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $129,405 |
| saldo proyectado a medianoche | $24,793 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $93,172 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $23,213 | 20 | **$1,161** | $3,545 | 3.05 |
| 2026-09-18 | $26,280 | 22 | **$1,195** | $4,610 | 3.86 |
| 2026-09-19 | $13,577 | 10 | **$1,358** | $5,008 | 3.69 |
| 2026-09-20 | $27,491 | 29 | **$948** | $4,389 | 4.63 |
| 2026-09-21 **HOY** | $20,027 | 18 | **$1,113** | $5,110 | 4.59 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($1,113 vs $948).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,113  =  $ 5,110  ÷  4.59
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,110 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.59 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $11,712 | 21% | 9 | $1,301 | 3.92 |
| Domiciliarios | $45,000 | $3,825 | 8% | 4 | $956 | 5.37 |
| TEST Creativos | $25,000 | $1,741 | 7% | 1 | $1,741 | 3.44 |
| Domiciliarios - Expancion | $15,000 | $1,625 | 11% | 3 | $542 | 8.00 |
| Publico ABIERTO video | $10,000 | $1,154 | 12% | 0 | — | 0.00 |
| Motorizados | $9,000 | $818 | 9% | 1 | $818 | 5.52 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $19,721 | 18 | **$1,096** | $2,402 | **46%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,043**/pedido |
| utilidad estimada de lo que va del día | **$16,301** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,142 | $1,332 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,734 | $956 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $729 | $1,741 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,220 | $552 | 🟢 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,106 | — | 🟢 |
| Motorizados | $1,342 | $1,438 | $1,848 | $922 | $626 | $818 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.77 | 3.88 | 🟡 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.75 | 5.37 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.22 | 3.44 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.60 | 7.81 | 🟢 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.72 | — | 🟢 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.52 | 5.52 | 🔴 |

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
| 2026-09-20 | $120,475 | 110 | $1,095 | $4,932 | 4.50 | $99,659 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
