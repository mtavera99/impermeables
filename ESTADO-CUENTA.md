# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-20 16:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$38,366** |
| gastado hoy (hasta las 16h) | $96,252 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $145,570 |
| saldo proyectado a medianoche | $-10,952 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $112,752 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-16 | $109,354 | 93 | **$1,176** | $3,646 | 3.10 |
| 2026-09-17 | $82,291 | 61 | **$1,349** | $3,686 | 2.73 |
| 2026-09-18 | $70,084 | 66 | **$1,062** | $5,126 | 4.83 |
| 2026-09-19 | $71,181 | 62 | **$1,148** | $4,615 | 4.02 |
| 2026-09-20 **HOY** | $89,737 | 69 | **$1,301** | $4,687 | 3.60 |

🟠 Hoy va 13% más caro que ayer a la misma hora ($1,301 vs $1,148).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,301  =  $ 4,687  ÷  3.60
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,687 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.60 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $35,843 | 65% | 24 | $1,493 | 2.79 |
| Domiciliarios | $45,000 | $24,713 | 55% | 9 | $2,746 | 1.62 |
| TEST Creativos | $25,000 | $15,618 | 62% | 22 | $710 | 10.65 |
| Domiciliarios - Expancion | $15,000 | $8,556 | 57% | 7 | $1,222 | 3.43 |
| Publico ABIERTO video | $10,000 | $6,515 | 65% | 4 | $1,629 | 6.25 |
| Motorizados | $9,000 | $5,007 | 56% | 7 | $715 | 7.90 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $89,737 | 69 | **$1,301** | $2,402 | **54%** 🟢 |
| **COLMENA** | $6,515 | 4 | **$1,629** | $3,322 | **49%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$15,483**/pedido |
| utilidad estimada de lo que va del día | **$48,347** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,498 | $1,208 | $963 | $1,062 | $899 | $1,493 | 🔴 |
| Domiciliarios | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | $2,746 | 🔴 |
| TEST Creativos | $618 | $869 | $1,090 | $760 | $987 | $710 | 🟢 |
| Domiciliarios - Expancion | — | — | $1,418 | $866 | $838 | $1,222 | 🔴 |
| Publico ABIERTO video | $7,737 | $2,334 | $1,552 | $2,224 | $2,550 | $1,629 | 🟢 |
| Motorizados | $1,194 | $1,342 | $1,438 | $1,848 | $921 | $715 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 3.06 | 2.79 | 3.68 | 4.22 | 4.23 | 2.79 | 🔴 |
| Domiciliarios | 2.68 | 3.01 | 2.71 | 3.91 | 2.66 | 1.62 | 🔴 |
| TEST Creativos | 11.18 | 7.23 | 5.61 | 11.64 | 7.77 | 10.65 | 🟢 |
| Domiciliarios - Expancion | — | — | 2.48 | 5.30 | 4.59 | 3.43 | 🔴 |
| Publico ABIERTO video | 1.39 | 4.47 | 6.53 | 4.62 | 3.76 | 6.25 | 🟢 |
| Motorizados | 5.75 | 2.83 | 2.54 | 2.99 | 4.94 | 7.90 | 🟢 |

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
| 2026-09-19 | $119,340 | 127 | $940 | $4,374 | 4.65 | $134,815 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
