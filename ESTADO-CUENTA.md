# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 17:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$36,740** |
| gastado hoy (hasta las 16h) | $116,244 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $155,863 |
| saldo proyectado a medianoche | $-2,879 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $94,386 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–16:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-17 | $82,291 | 61 | **$1,349** | $3,686 | 2.73 |
| 2026-09-18 | $70,084 | 66 | **$1,062** | $5,126 | 4.83 |
| 2026-09-19 | $71,226 | 62 | **$1,149** | $4,616 | 4.02 |
| 2026-09-20 | $95,621 | 73 | **$1,310** | $4,741 | 3.62 |
| 2026-09-21 **HOY** | $109,343 | 96 | **$1,139** | $4,315 | 3.79 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,139 vs $1,310).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,139  =  $ 4,315  ÷  3.79
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,315 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 3.79 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $57,689 | 105% | 39 | $1,479 | 2.62 |
| Domiciliarios | $45,000 | $28,305 | 63% | 33 | $858 | 5.57 |
| TEST Creativos | $25,000 | $10,831 | 43% | 11 | $985 | 6.84 |
| Domiciliarios - Expancion | $15,000 | $7,998 | 53% | 7 | $1,143 | 3.65 |
| Publico ABIERTO video | $10,000 | $6,901 | 69% | 1 | $6,901 | 1.70 |
| Motorizados | $9,000 | $4,520 | 50% | 6 | $753 | 5.99 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $109,343 | 96 | **$1,139** | $2,402 | **47%** 🟢 |
| **COLMENA** | $6,901 | 1 | **$6,901** | $3,322 | **208%** 🔴 PIERDE |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,559**/pedido |
| utilidad estimada de lo que va del día | **$82,774** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,146 | $1,479 | 🔴 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,737 | $858 | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $730 | $985 | 🔴 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $841 | $1,223 | $1,143 | 🟢 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,111 | $6,901 | 🔴 |
| Motorizados | $1,342 | $1,438 | $1,848 | $923 | $633 | $753 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.76 | 2.62 | 🔴 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.74 | 5.57 | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.21 | 6.84 | 🔴 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.58 | 3.59 | 3.65 | 🟡 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.70 | 1.70 | 🔴 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.47 | 5.99 | 🔴 |

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
| 2026-09-20 | $120,839 | 110 | $1,099 | $4,934 | 4.49 | $99,295 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
