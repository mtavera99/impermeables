# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 03:07 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,381** |
| gastado hoy (hasta las 2h) | $1,057 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $123,774 |
| saldo proyectado a medianoche | $30,664 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $92,932 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-18 | $584 | 1 | **$584** | $8,848 | 15.15 |
| 2026-09-20 | $13,066 | 9 | **$1,452** | $3,815 | 2.63 |
| 2026-09-21 **HOY** | $945 | 1 | **$945** | $5,221 | 5.52 |

🟢 **Hoy va mejor que ayer a la misma hora** ($945 vs $1,452).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   945  =  $ 5,221  ÷  5.52
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $5,221 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.52 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $353 | 1% | 1 | $353 | 11.11 |
| Domiciliarios | $45,000 | $237 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion | $15,000 | $175 | 1% | 0 | — | 0.00 |
| Publico ABIERTO video | $10,000 | $112 | 1% | 0 | — | 0.00 |
| TEST Creativos | $25,000 | $96 | 0% | 0 | — | 0.00 |
| Motorizados | $9,000 | $84 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $945 | 1 | **$945** | $2,402 | **39%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,250**/pedido |
| utilidad estimada de lo que va del día | **$1,056** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,138 | $353 | 🟢 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,725 | — | 🟡 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $838 | $1,219 | — | 🔴 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,101 | — | 🟢 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $724 | — | 🟢 |
| Motorizados | $1,342 | $1,438 | $1,848 | $922 | $620 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.78 | 11.11 | 🟢 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.75 | — | 🟡 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.59 | 3.60 | — | 🔴 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.73 | — | 🟢 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.25 | — | 🟢 |
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.58 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,362 | 127 | $940 | $4,369 | 4.65 | $134,793 |
| 2026-09-20 | $119,943 | 110 | $1,090 | $4,924 | 4.52 | $100,191 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
