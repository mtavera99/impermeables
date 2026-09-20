# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 17:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$32,029** |
| gastado hoy (hasta las 17h) | $102,567 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $144,868 |
| saldo proyectado a medianoche | $-10,272 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $112,774 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $120,312 | 98 | **$1,228** | $3,575 | 2.91 |
| 2026-09-17 | $99,234 | 73 | **$1,359** | $3,661 | 2.69 |
| 2026-09-18 | $77,374 | 73 | **$1,060** | $5,117 | 4.83 |
| 2026-09-19 | $76,495 | 65 | **$1,177** | $4,661 | 3.96 |
| 2026-09-20 **HOY** | $95,507 | 75 | **$1,273** | $4,742 | 3.72 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($1,273 vs $1,177).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,273  =  $ 4,742  ÷  3.72
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,742 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.72 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $38,185 | 69% | 27 | $1,414 | 2.99 |
| Domiciliarios | $45,000 | $26,204 | 58% | 10 | $2,620 | 1.71 |
| TEST Creativos | $25,000 | $16,506 | 66% | 24 | $688 | 11.15 |
| Domiciliarios - Expancion | $15,000 | $9,208 | 61% | 7 | $1,315 | 3.22 |
| Publico ABIERTO video | $10,000 | $7,060 | 71% | 5 | $1,412 | 6.95 |
| Motorizados | $9,000 | $5,404 | 60% | 7 | $772 | 7.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $95,507 | 75 | **$1,273** | $2,402 | **53%** 🟢 |
| **COLMENA** | $7,060 | 5 | **$1,412** | $3,322 | **43%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$15,160**/pedido |
| utilidad estimada de lo que va del día | **$54,585** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,414 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $2,620 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $688 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $838 | $1,315 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,550 | $1,412 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $921 | $772 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.23 | 2.99 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 1.71 | 🔴 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.77 | 11.15 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.59 | 3.22 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 6.95 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.94 | 7.36 | 🟢 |

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
| 2026-09-19 | $119,341 | 127 | $940 | $4,372 | 4.65 | $134,814 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
